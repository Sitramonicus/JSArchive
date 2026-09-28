// dict-gen.mjs — CC-33 feasibility prototype (2026-09-20): GENERATE the identifier pools per build
// seed instead of curating CSVs on disk. Writes a parallel artifact (never touches the curated
// originals) so an A/B run is possible:
//     oto/generated/identifiers-dictionary-5k.csv
//     oto/generated/identifiers-dictionary-jso.csv
//     oto/generated/identifiers-dictionary-runner-5k.csv
//
// Inputs: BUILD-SEED.txt (seed), Uploads/unicode_list.csv (the operator's 20-script inventory),
//         the shard sources (collision check), the curated pools (shape + size reference).
//
// Hard constraints encoded here (each one cost a build failure at some point):
//   * every word must be a valid JS identifier  [\p{ID_Start}_$][\p{ID_Continue}$]*      (JSO schema)
//   * no leading supplementary-plane character   (breaks JSO/S4 — see noSupLead)
//   * elements must be UNIQUE per list           (JSO: "All identifiersDictionary's elements must be unique")
//   * no release-surface vocabulary              (tools/leakcensus.mjs G3 + dict-scrub)
//   * no reserved names / no token that already exists in the shard sources
//   * deterministic: same seed => byte-identical pools
//
// U11 flip (2026-09-20, operator-approved): the generated pools ARE the build's pools.
// tools/cc33-build.sh runs this script first and exports CC33_DICT_DIR=oto/generated, so
// every pool consumer (v1-s3matrix, mound-e, S4) reads generated vocabulary. Two properties
// were added for the flip, because a pool drawn uniformly at random is *more* regular than a
// curated one (that was the open caveat in the feasibility note):
//   * BLOCK-FREQUENCY WEIGHTING — blocks are not sampled uniformly. Each block's weight is
//     (usable chars)^alpha with a per-build alpha, a per-build "hot" subset at 2.5-5x, and
//     deliberate holes (~22 % of blocks at 0.15x). The result is a heavy, lumpy distribution
//     with rare scripts rather than a flat one.
//   * RECYCLING — a word may be built by reusing an already-established (fragment, block,
//     shape) stem instead of minting a new one, including stems whose word was rejected on a
//     collision. Reuse is constrained to stems already in play, so the pool grows families of
//     related identifiers (what a real codebase looks like) without inventing new vocabulary.
//     Shape itself is deliberately non-uniform (62 / 23 / 15 %).
//
// Usage: node oto/scripts/dict-gen.mjs [--check] [--seed=X] [--report]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OTO = path.resolve(HERE, '..');
const ROOT = path.resolve(OTO, '..', '..', '..', '..');  // /home/user
const OUT = path.join(OTO, 'generated');
const CHECK = process.argv.includes('--check');
const REPORT = process.argv.includes('--report');
const seedArg = (process.argv.find((a) => a.startsWith('--seed=')) || '').split('=')[1];
const SEED = seedArg || String(fs.readFileSync(path.join(OTO, '..', 'BUILD-SEED.txt'), 'utf8')).trim();

// ---- 1. seed → deterministic stream -------------------------------------------------------------
const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };
function rng(seedStr) {                     // splitmix32: same shape the cascade already uses
  let s = fnv(seedStr) >>> 0;
  return () => { s = (s + 0x9e3779b9) >>> 0; let t = Math.imul(s ^ (s >>> 16), 0x21f0aaad) >>> 0; t = Math.imul(t ^ (t >>> 15), 0x735a2d97) >>> 0; return ((t ^ (t >>> 15)) >>> 0) / 4294967296; };
}

// ---- 2. script inventory from the operator's own list -------------------------------------------
const csv = fs.readFileSync(path.join(ROOT, 'Uploads', 'unicode_list.csv'), 'utf8').split(/\r?\n/).slice(1);
const IS_START = /^[\p{ID_Start}_$]$/u, IS_CONT = /^[\p{ID_Continue}$]$/u;
const blocks = new Map();
for (const line of csv) {
  const m = line.match(/^([^,]*),([^,]*),(U\+[0-9A-Fa-f]{4,6})$/);
  if (!m) continue;
  const [, block, ch, hex] = m;
  const cp = parseInt(hex.slice(2), 16);
  if (cp < 0x80 || cp > 0xffff) continue;                       // BMP only: noSupLead rule
  const c = ch || String.fromCharCode(cp);
  if (!IS_CONT.test(c)) continue;
  if (!blocks.has(block)) blocks.set(block, { start: [], cont: [] });
  const b = blocks.get(block);
  (IS_START.test(c) ? b.start : b.cont).push(c);
  if (IS_START.test(c)) b.cont.push(c);
}
// Blocks that can LEAD an identifier need >= 8 ID_Start characters. The "Invisible & Control" block
// is special: its identifier-safe characters (ZWJ U+200D, ZWNJ U+200C — both ID_Continue per UCD)
// can never lead, but they are exactly the homoglyph material the operator's inventory list calls
// for, and javascript-obfuscator already injects them on its own (measured in the shipped bundle:
// 93 ZWJ + 83 ZWNJ before this change). They are therefore kept in a separate non-leading pool
// instead of being filtered away with the block.
const allBlocks = [...blocks.entries()].map(([name, b]) => ({ name, start: [...new Set(b.start)], cont: [...new Set(b.cont)] }));
const usable = allBlocks.filter((b) => b.start.length >= 8).sort((a, b) => a.name.localeCompare(b.name));
const INVIS_BLOCK = allBlocks.find((b) => /invisible/i.test(b.name));
const INVIS = INVIS_BLOCK ? INVIS_BLOCK.cont.filter((c) => !INVIS_BLOCK.start.includes(c)) : [];
if (INVIS.length) console.log(`[dict-gen] invisible-block ingredient: ${INVIS.length} non-leading characters (${INVIS.map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ')})`);

// ---- 3. generators ---------------------------------------------------------------------------------
const FRAG = ['birch', 'plot', 'quill', 'owl', 'ridge', 'kelp', 'sedge', 'onyx', 'cairn', 'pine', 'moss',
  'ember', 'lattice', 'prairie', 'quartz', 'shroud', 'reel', 'spire', 'hollow', 'brine', 'cinder', 'delta',
  'flint', 'grove', 'marsh', 'nexus', 'orbit', 'plume', 'quay', 'harbor', 'summit', 'crest', 'vivid',
  'pixel', 'matrix', 'vector', 'plasma', 'engine', 'signal', 'module', 'stream', 'bloom', 'haven', 'forest'];
const BAN = ['transport', 'scheduler', 'cleanup', 'telemetry', 'honey', 'carrier', 'pockets', 'dispatch',
  'probe', 'harvest', 'quest', 'running', 'stream', 'native', 'hook', 'vault', 'gate', 'shift', 'leases',
  'budget', 'store', 'host', 'relay', 'flush'];
const RESERVED = ['会員', 'lexMode', 'lexProbeA', 'lexProbeU', 'lexProbeX', 'lexSetPins'];
// A word may not START with a JS keyword/reserved word in its ASCII run. Found the hard way
// (2026-09-20): a fragment sliced down to 3 chars produced `for썚묶뜣667`, and the S4 keyword-space
// repair — which exists because JSO compact joins a keyword to a following non-ASCII identifier —
// then split that legitimate parameter name into `for 썚묶뜣667`, killing the build with
// `Unexpected token 'for'`. Keeping keyword-prefixed words out of the pools makes the repair exact.
const KEYWORDY = ['await','break','case','catch','class','const','continue','debugger','default','delete',
  'do','else','enum','export','extends','false','finally','for','function','if','import','in',
  'instanceof','let','new','null','of','return','static','super','switch','this','throw','true','try',
  'typeof','var','void','while','with','yield'];

// ---- 2c. footprint reference + per-build alphabet ------------------------------------------------
// U11's condition is "no footprint increase". A name's cost is its UTF-8 byte length (times the
// number of times the obfuscator emits it), so the shape of generated words is fitted to the
// CURATED pool instead of invented: the distribution of non-Latin characters per word is measured
// off the pool being replaced. Measured before the fit (2026-09-20): curated 12.0 bytes/word,
// 1.81 non-Latin/word; an unconstrained generator produced 15.0 bytes/word, which pushed carrier
// occupancy from 88.3 % to 99.3 % and left only 4 KB of headroom. The fit puts it back.
const REF_FILE = path.join(OTO, 'identifiers-dictionary-5k.csv');
const SHAPE_REF = (() => {
  const fallback = [0.29, 0.12, 0.22, 0.24, 0.12, 0.01];
  try {
    const words = fs.readFileSync(REF_FILE, 'utf8').split(',').map((s) => s.trim()).filter(Boolean);
    const buckets = new Array(6).fill(0);
    for (const w of words) {
      const n = [...w].filter((c) => c.charCodeAt(0) > 127).length;
      buckets[Math.min(n, 5)]++;
    }
    const total = buckets.reduce((a, b) => a + b, 0);
    return total ? buckets.map((b) => b / total) : fallback;
  } catch { return fallback; }
})();

// ...and the length of the ASCII part (letters + digits) of each curated word. Fitting only the
// script-character count was not enough: fragments + suffix ran ~1.9 chars longer than the curated
// pool, which still cost ~25 % more bytes per name. Both halves are fitted now.
const ASCII_REF = (() => {
  const fallback = [0, 0, 0.04, 0.08, 0.14, 0.17, 0.17, 0.16, 0.12, 0.08, 0.04];
  try {
    const words = fs.readFileSync(REF_FILE, 'utf8').split(',').map((s) => s.trim()).filter(Boolean);
    const buckets = new Array(fallback.length).fill(0);
    for (const w of words) {
      const n = [...w].filter((c) => c.charCodeAt(0) <= 127).length;
      buckets[Math.min(n, buckets.length - 1)]++;
    }
    const total = buckets.reduce((a, b) => a + b, 0);
    return total ? buckets.map((b) => b / total) : fallback;
  } catch { return fallback; }
})();
const walk = (ref, r) => { let x = r(), k = 0; while (k < ref.length - 1 && x > ref[k]) { x -= ref[k]; k++; } return k; };
// pick a fragment as close as possible to a wanted ASCII length (fragments are the fixed vocabulary)
const FRAG_BY_LEN = [...FRAG].sort((a, b) => a.length - b.length);
const fragFor = (want, r) => {
  const fit = FRAG_BY_LEN.filter((f) => f.length >= Math.max(2, want));
  const pick = (fit.length ? fit : FRAG_BY_LEN)[Math.floor(r() * (fit.length ? fit.length : FRAG_BY_LEN.length))];
  return pick.slice(0, Math.max(2, Math.min(want, pick.length)));
};

// Per-build block weighting: blocks are NOT sampled uniformly. weight = (chars)^alpha with a
// per-build alpha, a per-build "hot" subset at 2.5-5x, and deliberate holes (~22 % at 0.15x).
// Block FLOOR. Found 2026-09-20 by auditing what the generated pool actually contains: with pure
// weight-proportional picking plus a 2-byte "cheap" pool, the pool came out as Cyrillic/Greek/Hebrew
// + Hanzi/Hangul and NOTHING else. Devanagari and Tamil had 0 characters in the pool, Thai 6
// occurrences, Hiragana 4, and the Invisible block was gone entirely — while the operator's
// inventory list names Devanagari, Tamil, Thai, Kana and Invisible & Control explicitly.
// So: a share of picks ignores the weights and takes a uniformly random block. Every block then has
// a guaranteed presence in every build, while the weights still decide the overall mix.
const FLOOR_SHARE = 0.35;
const BLOCK_WEIGHTS = (() => {
  const rw = rng(`${SEED}:blockweights`);
  const hot = new Set();
  const hotCount = Math.max(2, Math.round(usable.length * 0.25));
  while (hot.size < hotCount) hot.add(Math.floor(rw() * usable.length));
  const alpha = 0.6 + rw() * 0.8;
  return usable.map((b, i) => {
    let w = Math.pow(b.start.length, alpha);
    if (hot.has(i)) w *= 2.5 + rw() * 2.5;
    if (rw() < 0.22) w *= 0.15;
    return w;
  });
})();
const BLOCK_CUM = (() => { const c = []; let s = 0; for (const w of BLOCK_WEIGHTS) { s += w; c.push(s); } return { c, s }; })();

// Per-build ACTIVE ALPHABET. The curated pool uses 680 distinct non-Latin characters across 5,706
// words; drawing from all 2,070 available characters produced 8,861, which costs real bytes once
// the number is repeated in the bundle (and compresses worse, because nothing repeats). Each build
// now narrows to its own subset — in effect the build picks its own naming alphabet, which is both
// the "deliberate irregularity" and the reason the pools stop looking alike across builds.
const ALPHABET_TARGET = 300;
// Byte cost is driven by 2-byte vs 3-byte script characters, and most blocks have no 2-byte
// characters at all (Hangul syllables start at U+AC00, Devanagari at U+0900). Measured: a
// per-block quota left the 2-byte share at 1.1 % against the curated pool's 33.3 %, worth
// +0.53 bytes per name and +2 % on the shipped payload. So the cheap characters are pooled
// build-wide and mixed in per character at a fitted rate.
const CHEAP_SHARE = 0.42;
// share of words carrying one invisible (ZWJ/ZWNJ) character in a non-leading position
const INVIS_RATE = 0.05;
const CHEAP = [...new Set(usable.flatMap((b) => b.cont.filter((c) => c.charCodeAt(0) < 0x800)))];
const CHEAP_START = [...new Set(usable.flatMap((b) => b.start.filter((c) => c.charCodeAt(0) < 0x800)))];
const ALPHABET = (() => {
  const ra = rng(`${SEED}:alphabet`);
  const budget = Math.max(usable.length * 8, ALPHABET_TARGET);
  const per = Math.max(8, Math.round(budget / usable.length));
  // characters cost 2 or 3 UTF-8 bytes; the curated pool averages 2.71, so each build's alphabet
  // is drawn to the same ratio instead of taking whatever the block contains
  return usable.map((b) => {
    const pickFrom = (arr, n) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const k = Math.floor(ra() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; } return a.slice(0, Math.min(n, a.length)); };
    const cont = [...new Set(pickFrom(b.cont, Math.max(12, per)))];   // floor 12: a small block must still be able to make words
    const start = [...new Set([...pickFrom(b.start, Math.max(8, Math.round(per / 2))), ...cont.slice(0, Math.round(per / 4))])];
    return { name: b.name, start, cont, two: cont.filter((c) => c.charCodeAt(0) < 0x800) };
  });
})();

function generate({ tag, count, lanes, seedStr }) {
  const r = rng(seedStr);
  const pickBlock = () => {
    if (r() < FLOOR_SHARE) return usable[Math.floor(r() * usable.length)];   // floor: uniform block
    const x = r() * BLOCK_CUM.s;
    let lo = 0, hi = BLOCK_CUM.c.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (BLOCK_CUM.c[mid] < x) lo = mid + 1; else hi = mid; }
    return usable[lo];
  };
  const stems = [];                                   // recycling pool (see header)
  const sources = fs.readdirSync(path.join(ROOT, 'Active', 'O8.14', 'CC-33', 'shards'))
    .filter((f) => f.endsWith('.js')).map((f) => fs.readFileSync(path.join(ROOT, 'Active', 'O8.14', 'CC-33', 'shards', f), 'utf8')).join('\n');
  const out = new Set(), rejected = { bad: 0, dup: 0, banned: 0, reserved: 0, collision: 0 };
  let guard = 0;
  while (out.size < count && guard++ < count * 60) {
    // reuse an established stem ~35 % of the time; otherwise mint one and add it to the pool
    let stem;
    if (stems.length >= 12 && r() < 0.6) stem = stems[Math.floor(r() * stems.length)];
    else {
      const b = pickBlock();
      const k = walk(SHAPE_REF, r);                 // script chars per word, from the curated pool
      const ascii = walk(ASCII_REF, r);             // ASCII chars per word, likewise
      const digits = ascii >= 7 && r() < 0.15 ? 4 : 3;   // 4-digit suffixes are rare in the curated pool
      const lane = lanes[Math.floor(r() * lanes.length)];
      const mix = k > 0 && r() < lane.mix;          // mixing a script char INTO the fragment spends
      stem = { b, k: mix ? k - 1 : k, digits, mix, frag: fragFor(ascii - digits, r) };   // one of the k, not an extra
      stems.push(stem);
    }
    const b = ALPHABET[usable.indexOf(stem.b)] || { start: stem.b.start, cont: stem.b.cont };
    const k = stem.k;
    const lo = Math.pow(10, stem.digits - 1), hi = Math.pow(10, stem.digits) - 1;
    let w = stem.frag;
    if (stem.mix) w = w.slice(0, 1) + b.cont[Math.floor(r() * b.cont.length)] + w.slice(2); // intra-word mix
    for (let i = 0; i < k; i++) {
      const cheap = r() < CHEAP_SHARE;
      const from = cheap ? (i === 0 && CHEAP_START.length ? CHEAP_START : CHEAP) : (i === 0 && r() < 0.5 ? b.start : b.cont);
      w += from[Math.floor(r() * from.length)] ?? '';
    }
    if (INVIS.length && k > 0 && r() < INVIS_RATE) {
      // one invisible character, inserted after the first character so it can never lead the name
      const at = 1;
      w = w.slice(0, at) + INVIS[Math.floor(r() * INVIS.length)] + w.slice(at);
    }
    w += String(lo + Math.floor(r() * (hi - lo + 1)));
    // length guard: 5 characters. It used to be 7, which silently discarded every short draw and
    // biased the surviving population long (measured: +0.6 ASCII chars/word, +2 bytes, and the
    // carrier ran out of headroom). Anything a JS identifier can legally be is long enough here.
    if (w.length < 5 || w.length > 24) { rejected.bad++; continue; }
    if (!IS_START.test(w[0]) || ![...w].every((c) => IS_CONT.test(c)) || /^[\p{ID_Continue}]*$/u.test(w) === false) { rejected.bad++; continue; }
    if (RESERVED.includes(w)) { rejected.reserved++; continue; }
    const asciiRun = (w.match(/^[A-Za-z_$]+/) || [''])[0];
    if (asciiRun && KEYWORDY.includes(asciiRun)) { rejected.reserved++; continue; }
    const low = w.toLowerCase();
    if (BAN.some((x) => low.includes(x))) { rejected.banned++; continue; }
    if (out.has(w)) { rejected.dup++; continue; }
    if (sources.includes(w)) { rejected.collision++; continue; }
    out.add(w);
  }
  const shapes = out.size ? { one: 0, two: 0, three: 0 } : { one: 0, two: 0, three: 0 };
  for (const w of out) { const n = [...w].filter((c) => c.charCodeAt(0) > 127).length; if (n <= 1) shapes.one++; else if (n === 2) shapes.two++; else shapes.three++; }
  return { words: [...out], rejected, stems: stems.length,
    scripts: [...new Set([...out].map((w) => [...w].find((c) => c.charCodeAt(0) > 127) || ''))].filter(Boolean).length, shapes };
}

const PLAN = {
  'identifiers-dictionary-5k.csv': { count: 5706, tag: 'main' },
  'identifiers-dictionary-jso.csv': { count: 335, tag: 'jso' },
  'identifiers-dictionary-runner-5k.csv': { count: 3859, tag: 'runner' },
};
const LANES = [
  { name: 'none', mix: 0 }, { name: 'mixed', mix: 0.55 }, { name: 'exclusive', mix: 0.85 },
];

const t0 = Date.now();
if (!CHECK) fs.mkdirSync(OUT, { recursive: true });
const report = { seed: SEED, generatedAt: new Date().toISOString(), blocks: usable.length, pools: {} };
for (const [file, plan] of Object.entries(PLAN)) {
  const res = generate({ count: plan.count, lanes: LANES, seedStr: `${SEED}:${plan.tag}` });
  const csvOut = res.words.join(',') + '\n';
  if (!CHECK) fs.writeFileSync(path.join(OUT, file), csvOut);
  const uniq = new Set(res.words).size === res.words.length;
  const startOk = res.words.every((w) => IS_START.test([...w][0]));
  report.pools[file] = { words: res.words.length, unique: uniq, idStartOk: startOk, scripts: res.scripts,
    bytes: csvOut.length, rejected: res.rejected, stems: res.stems, shapes: res.shapes, ms: Date.now() - t0 };
  console.log(`[${CHECK ? 'check' : 'gen  '}] ${file.padEnd(38)} ${res.words.length} words  ${(csvOut.length / 1024).toFixed(0)} KB  unique=${uniq} idStart=${startOk} scripts=${res.scripts} stems=${res.stems} shapes=${res.shapes.one}/${res.shapes.two}/${res.shapes.three}  rejected=${JSON.stringify(res.rejected)}`);
}
report.totalMs = Date.now() - t0;
console.log(`=== ${usable.length} identifier-safe blocks from unicode_list.csv · active alphabet ${ALPHABET.reduce((a, b) => a + b.cont.length, 0)} chars · shape ref ${SHAPE_REF.map((v) => (v * 100).toFixed(0)).join('/')} % · ${report.totalMs} ms total${CHECK ? ' (no writes)' : ' -> oto/generated/'} ===`);
if (REPORT) console.log(JSON.stringify(report, null, 1));
if (!CHECK) fs.writeFileSync(path.join(OUT, 'dict-gen-report.json'), JSON.stringify(report, null, 1) + '\n');
