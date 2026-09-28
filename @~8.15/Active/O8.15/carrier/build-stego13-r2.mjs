#!/usr/bin/env node
/**
 * O8.11 pockets builder (frag carrier; v3.4.0 JSO-lite loader; 11-piece + 4 platform pockets; 7 reel tables + Telegram honey).
 *
 * Inputs: S6 bundle + Pixel Garden v2 decoy + photo cover + plaque base + hand loader.
 * Output: valid 24-bit BMP (photo grain + snapshot strip) + single-paste runner.
 *
 * Carrier layout (800x620x24, pixelOff=54, no row padding):
 *   [54, 54+98400)  snapshot strip — plaque base + PG3 documented LSB-2 layout
 *                     (magic + u16 len + cipher + zero pad). Gallery tooling reads this.
 *   [54+98400, EOF) R=1,389,600 — 4-bit nibbles at mulberry32(seed) FY positions:
 *                     first 24 slots = header (magic P3 + u32 len + u32 crc + u16 0),
 *                     rest = header^salt-keystream cipher (the S6 bundle).
 *   seed = slowChain(SALT ^ FNVn(名) ^ bits*GOLDEN); SALT derived from the BMP
 *   header (no literal anywhere); the provisioned debug name normalizes by hash;
 *   renamed pastes fail the header-magic/crc confirms and fall to the garden.
 *
 * Minify rules (inherited from Stego-2, still asserted — do not "simplify"):
 *   UTF-8 output always; real payload reduce_vars:false; mangle:false everywhere
 *   (loader narrative identifiers MUST survive); banner comment preserved.
 * Crypto/KDF below is a VERBATIM transliteration of stego3-loader.js — any drift
 * breaks extraction. Tier tests pin byte-exact round-trips. Fully deterministic.
 *
 * Usage: node build-stego3.mjs [bundle.js] [cover.bmp] [out-dir] [--line1=N]
 *
 * 8.15 / CC-34 (2026-09-26) — ARM A, carrier de-tabling: the R9F fragment no longer publishes the
 * chunk deal (o0..o3, ~98 KB); the loader regenerates it from `s`. Everything else in the cascade is
 * unchanged and byte-reproducible against the 8.14 pack (verify: same bundle -> runner ad898afb…).
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { PIXOFF, STRIP_LEN, embedReal, embedDecoy, extractDecoy, dseedFor, slackFor, stripOff, rStartFor, r3_splitR9F,
         r31_embedReal, r31_extractReal, r31_grainStrip, r31_grainReel } from './stego3-codec.mjs';  // U4: r31 = 2-bit two-reel carrier
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const REPO = path.resolve(__dirname, '..', '..', '..'); // 8.15: carrier lives at Active/O8.15/carrier
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch { try { return require(name); } catch { throw new Error(`Missing engine "${name}" — run: cd ${path.join(REPO, 'Active', 'engines')} && npm install`); } }
}
const Terser = needEngine('terser');
const JS = needEngine('javascript-obfuscator');
// 2026-09-17: seed-lib resolution made explicit + ordered. The old chain was
// r3 -> r2 -> O8-legacy, and O8-legacy carries a DIFFERENT BUILD-SEED (2f8918e4
// vs 851b28e5), so falling through to it would silently change every derived
// seed and drift the stego bytes. O8.13/O8.12-r4 are tried first and pin 851b28e5.
const { derive: SEED, deriveInt: SEEDINT } = (()=>{
  const cands = ['O8.13','O8.12-r4','O8.12-r3','O8.12-r2','O8-legacy'];
  for (const c of cands) {
    try { return require(path.join(REPO, 'Active', c, 'oto', 'scripts', 'seed-lib.js')); } catch (e) {}
  }
  throw new Error('seed-lib.js not found in any line dir: ' + cands.join(', '));
})();

// U4 CARRIER SWITCH (2026-09-20): 'r31' = 2-bit two-reel flip (default, shipped); 'v3' = the
// 4-bit nibble carrier, kept as a SEPARATE API (CC-30 carrier pack) so a regression bisects
// by one env var instead of a git revert. Both paths share the decoy strip and the pad.
const CARRIER = (process.env.CARRIER || 'r31').toLowerCase();
if (!['r31', 'v3'].includes(CARRIER)) throw new Error(`CARRIER must be r31|v3 (got ${CARRIER})`);
const PWHASH_DEBUG = 0xe79dbcf6, FNV_SHIPPED = 0xb16a887e, CANON_BITS = 7, GOLDEN = 0x9E3779B9, SLOW_ROUNDS = 32768;
const DEFAULT_NAME = '佐藤 結衣';
const EXPECT = {
  coverSha: '384da1026e82e217435f3457061d44ec7eb6c9400309f3ea4d1b1025b69d53cc',
  coverLen: 1632054, w: 800, h: 680, bpp: 24,
  salt: 'd1d1d63e',
  coverSha1024: 'd53a257478996d607499728cadc894d1b3dc3d51f04a7d7c417a9795b9d8d738',
  coverLen1024: 2359350, w1024: 1024, h1024: 768, salt1024: '3f72a1ec',
  minReal: 1626945, gzReal: 743751,
  minDecoy: 3066, gzDecoy: 1658,
  minHoney: 1184, gzHoney: 727,
  minTube: 2196, gzTube: 1191, // calibrated on first build with tube
};
const LINE1 = [
  'var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); ',
  'var 名="佐藤 結衣",会員=0x2;console.clear();',
  'var 会員=2,名=\'佐藤 結衣\';console.clear();',
];

const args = process.argv.slice(2).filter(a => !a.startsWith('--line1'));
const line1opt = process.argv.slice(2).find(a => a.startsWith('--line1'));
const line1Variant = line1opt ? parseInt(line1opt.split('=')[1], 10) : 0;
if (!(line1Variant in LINE1)) throw new Error('bad --line1 (want 0/1/2)');
const bundlePath = args[0] || path.join(REPO, 'Active', 'O8.6', 'final-package', 'O8.6-Final-final-bundle.js');
const coverPath = args[1] || path.join(REPO, 'Uploads', 'stego2-cover.bmp');
const outDir = args[2] || path.join(__dirname, 'output-stego12');
fs.mkdirSync(outDir, { recursive: true });

// ---- verbatim loader semantics (tiers arbitrate drift) ----
function fnv1a(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i) & 255;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function slowChain(x) {
  var i; x >>>= 0;
  for (i = 0; i < SLOW_ROUNDS; i++) {
    x = (x ^ ((x << 13) >>> 0)) >>> 0;
    x = (x ^ (x >>> 17)) >>> 0;
    x = Math.imul(x, 0x5bd1e995) >>> 0;
    x = (x ^ (x >>> 15)) >>> 0;
  }
  return x >>> 0;
}
function sha256(b) { return crypto.createHash('sha256').update(b).digest('hex'); }
function assertAnchors(code, what) {
  if (!code.includes(DEFAULT_NAME)) {
    throw new Error(`${what}: literal default name missing (ascii_only would kill substitution)`);
  }
  if (!/会員\s*=\s*(0x2|2|1|0)/.test(code)) {
    throw new Error(`${what}: 会員 assignment anchor missing (reduce_vars would fold it away)`);
  }
}
const MINIFY_REAL = { compress: { passes: 2, dead_code: true, reduce_vars: false }, mangle: false };
const MINIFY_DECOY = { compress: { passes: 2, dead_code: true }, mangle: false };
const MINIFY_HONEY = { compress: { passes: 2, dead_code: true }, mangle: false };
const MINIFY_LOADER = { compress: { passes: 2, inline: false, collapse_vars: false, reduce_vars: false }, mangle: false, output: { comments: /^!/ } };

(async () => {
  console.log('=== [1] Cover (+ house salt) ===');
  const cover = fs.readFileSync(coverPath);
  const coverSha = sha256(cover);
  const is1024 = cover.length === EXPECT.coverLen1024;
  if (!is1024 && coverSha !== EXPECT.coverSha) throw new Error(`cover hash drift: ${coverSha}`);
  if (!is1024 && cover.length !== EXPECT.coverLen) throw new Error(`cover len ${cover.length}`);
  if (is1024 && coverSha !== EXPECT.coverSha1024) console.warn(`[WARN] 1024 cover hash ${coverSha} != ${EXPECT.coverSha1024} (scaled)`);
  if (is1024 && cover.length !== EXPECT.coverLen1024) throw new Error(`cover len ${cover.length} != 1024 len`);
  if (cover.slice(0, 2).toString('ascii') !== 'BM') throw new Error('not a BMP');
  const pixelOff = cover.readUInt32LE(10);
  const w = cover.readInt32LE(18), h = cover.readInt32LE(22);
  const bpp = cover.readUInt16LE(28), comp = cover.readUInt32LE(30);
  if (is1024) {
    if (pixelOff !== 54 || w !== EXPECT.w1024 || h !== EXPECT.h1024 || bpp !== EXPECT.bpp || comp !== 0) throw new Error(`cover dims 1024 ${w}x${h}x${bpp} comp=${comp} off=${pixelOff}`);
  } else {
    if (pixelOff !== 54 || w !== EXPECT.w || h !== EXPECT.h || bpp !== EXPECT.bpp || comp !== 0) throw new Error(`cover dims ${w}x${h}x${bpp} comp=${comp} off=${pixelOff}`);
  }
  const head = cover.subarray(0, 54);
  let hs = '';
  for (let hi = 0; hi < 54; hi++) hs += String.fromCharCode(head[hi]);
  const SALT = fnv1a(hs);
  const saltHex = SALT.toString(16).padStart(8, '0');
  const expectedSalt = is1024 ? EXPECT.salt1024 : EXPECT.salt;
  if (saltHex !== expectedSalt) throw new Error(`salt ${saltHex} != ${expectedSalt}`);
  console.log(`[+] cover OK ${w}x${h}x${bpp} salt=0x${saltHex}`);

  console.log('=== [2] Payloads (minify -> gzip) ===');
  const rawBundle = fs.readFileSync(bundlePath, 'utf8');
  let minReal = (await Terser.minify(rawBundle, MINIFY_REAL)).code;
  // [2a-bis] ERROR-PATH DANGLE REPAIR (incident 2026-09-22). terser's `compress` can drop a `var` from
  // a declaration list whose only read sits inside the `catch` of a function it hoisted out of scope
  // (`vecto615` did exactly this and turned an unrelated throw into a ReferenceError on the shipped
  // payload). The bundle is fine -- only the payload step loses it. Rather than loosen the whole minify
  // config (`unused:false` costs ~70 KB), declare the few names that actually dangle on an ERROR PATH at
  // the top of the payload. A plain `var` hoists, is invisible to the call sites, and cannot shadow a
  // venue global: these are lane-generated dictionary names, not platform identifiers.
  {
    const tmp = path.join(process.env.TMPDIR || '/tmp', 'cc34-dangle-scan.js'); // 8.15: keep the scan file out of the tree
    fs.mkdirSync(path.dirname(tmp), { recursive: true });
    fs.writeFileSync(tmp, minReal);
    let names = [];
    // NB: dangling-refs.mjs EXITS NON-ZERO when it finds danglers (it is a gate), so the JSON must be
    // taken from the error object's stdout -- a plain execFileSync throws before returning it.
    let jsonText = '';
    try {
      jsonText = execFileSync(process.execPath, [path.join(REPO, 'tools', 'dangling-refs.mjs'), tmp, '--json'],
        { maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    } catch (e) {
      jsonText = (e && e.stdout) ? e.stdout.toString() : '';
      if (!jsonText) console.warn('[gate] error-path dangle scan failed:', e && e.message);
    }
    try { names = (JSON.parse(jsonText).dangling || []).filter((d) => d.inCatch > 0).map((d) => d.name); }
    catch (e) { console.warn('[gate] error-path dangle scan: unparsable output'); }
    try { fs.unlinkSync(tmp); } catch (e) {}
    if (names.length) {
      minReal = `var ${names.join(',')};` + minReal;
      console.log(`[gate] error-path dangle repair: declared ${names.length} name(s): ${names.join(',')}`);
    } else {
      console.log('[gate] error-path dangle repair: nothing to declare');
    }
  }
  // ---- [2a-bis2] NORMALISER (8.15): mask residual vocabulary before anything else touches the bytes.
  //  D2(a) our own residue properties + the diagnostic key, D2(b) the venue property read (derived at
  //  runtime), D2(c) the mound layer's emitted helper name. Semantics-preserving by construction; the
  //  tool re-parses its own output and refuses to write on any failed self-check. NORMALISE=0 skips it.
  if (process.env.NORMALISE !== '0') {
    const tmpIn = path.join(process.env.TMPDIR || '/tmp', 'cc34-norm-in.js');
    const tmpOut = path.join(process.env.TMPDIR || '/tmp', 'cc34-norm-out.js');
    fs.writeFileSync(tmpIn, minReal);
    const out = execFileSync(process.execPath, [path.join(REPO, 'Active', 'O8.15', 'tools', 'normalise-payload.mjs'), tmpIn, tmpOut], { maxBuffer: 1 << 28 }).toString().trim();
    for (const line of out.split('\n')) console.log('[NORM] ' + line);
    const norm = fs.readFileSync(tmpOut, 'utf8');
    if (norm.length === minReal.length) throw new Error('NORMALISE: nothing changed — the mask anchors moved');
    minReal = norm;
  } else {
    console.log('[NORM] disabled (NORMALISE=0)');
  }

  // ---- [2a-ter] STEP 2 (8.15): the order-preserving split. Runs on the minified payload AFTER the
  // dangle repair and BEFORE the noise/pins tail, so what ships is exactly what was split. The splitter
  // re-parses its own output and refuses to write unless the literal sequence is unchanged: a split bug
  // fails the build here rather than in a gate. SPLIT_MIN=0 disables the stage.
  {
    const MIN = Number(process.env.SPLIT_MIN ?? 4000);
    const RUN = Number(process.env.SPLIT_RUN ?? 4000);
    if (MIN > 0) {
      const tmpIn = path.join(process.env.TMPDIR || '/tmp', 'cc34-split-in.js');
      const tmpOut = path.join(process.env.TMPDIR || '/tmp', 'cc34-split-out.js');
      // SPLIT_PASSES (default 1 = the landed configuration). Pass 2 is an EXPERIMENT, measured CLEANLY on
      // 2026-09-27 after the dropped-assignment bug was fixed (the earlier numbers were taken on the
      // unsplit payload and are VOID). Clean result: ruler-neutral and costs capacity —
      //   pass 1 only : fine_run 25,911 · share 0.434 · staged 2,223,890 chars
      //   pass 1+2    : fine_run 25,910 · share 0.434 · staged 2,258,475 chars (reel occupancy 96.1 %, warn)
      // i.e. the second pass finds the 8 nested candidates but they do not move the share, and the +34.6 KB
      // pushes the carrier reel past its 92 % comfort line. Not worth a third reel: keep the default at 1.
      const passes = Number(process.env.SPLIT_PASSES ?? 1);
      const beforeSplit = minReal;
      let cur = minReal;
      let appliedTotal = 0;
      for (let pass = 1; pass <= passes; pass++) {
        fs.writeFileSync(tmpIn, cur);
        const out = execFileSync(process.execPath, [path.join(REPO, 'Active', 'O8.15', 'tools', 'split-runs.mjs'),
          ...(process.env.SPLIT_EXTRA === '1' ? ['--extra'] : []), ...(process.env.SPLIT_OBJECTS === '1' ? ['--objects'] : []),
            ...(process.env.SPLIT_ARRAYS_I === '1' ? ['--arrays-i'] : []),
          '--apply', tmpIn, tmpOut, '--min=' + MIN, '--run=' + RUN], { maxBuffer: 1 << 28 }).toString().trim();
        for (const line of out.split('\n')) console.log(`[SPLIT p${pass}] ` + line);
        appliedTotal += Number((out.match(/applied\s*:\s*(\d+)/) || [0, 0])[1]);
        if (!/gate PASS/.test(out)) throw new Error('SPLIT: splitter gate did not pass');
        const next = fs.readFileSync(tmpOut, 'utf8');
        const grew = next.length !== cur.length;
        cur = next;
        if (!grew) break;                                  // reached a fixed point
      }
      const split = cur;
      // The stage that split the payload must be the payload that ships. This assertion exists because
      // its absence already cost a build: an edit dropped the assignment below and the chain silently
      // ran on the UNSPLIT payload — every gate still passed, because a valid payload without the split
      // is still a valid payload. Nothing else in the chain would have noticed.
      if (appliedTotal > 0 && split === beforeSplit) throw new Error('SPLIT: the splitter applied candidates but the payload did not change (assignment lost?)');
      if (appliedTotal > 0 && split.length === beforeSplit.length) throw new Error('SPLIT: split output is the same length as its input although candidates were applied');
      minReal = split;
      console.log(`[SPLIT] minReal ${split.length} chars after the split (${split.length - fs.readFileSync(tmpIn).length >= 0 ? '+' : ''}${split.length - fs.readFileSync(tmpIn).length})`);
    } else {
      console.log('[SPLIT] disabled (SPLIT_MIN=0)');
    }
  }

  // ---- [2a-ter2] STEP 2b (8.15-r2): DEEP WEAVE. Before the weave, the structure pass: dissolve the IIFE
  // shells that weld 800 KB of code into single statements, lift self-contained table declarations to the
  // master flow, and move table RUNS out of the carriers that read them, so the weave has units to place.
  // Sound per Active/O8.15/DEEP-WEAVE-MEASURE-2026-09-26.md (§2, §6); gates inside the tool refuse to write
  // on any failed multiset/parse check. DEEPWEAVE=0 disables; default ON only when the env asks for it.
  if (process.env.DEEPWEAVE === '1' && process.env.SPLIT_MIN !== '0') {
    const tmpIn = path.join(process.env.TMPDIR || '/tmp', 'cc34-deep-in.js');
    const tmpOut = path.join(process.env.TMPDIR || '/tmp', 'cc34-deep-out.js');
    fs.writeFileSync(tmpIn, minReal);
    const out = execFileSync(process.execPath, [path.join(REPO, 'Active', 'O8.15', 'tools', 'deep-weave.mjs'),
      '--apply', tmpIn, tmpOut], { maxBuffer: 1 << 28, env: process.env }).toString().trim();
    for (const line of out.split('\n')) console.log('[DEEP] ' + line);
    if (!/GATES|PASS/.test(out)) throw new Error('deep weave did not report its gates — refusing to build');
    minReal = fs.readFileSync(tmpOut, 'utf8');
  }

  // ---- [2a-quater] STEP 3/4 (8.15): THE WEAVE + the constraint pass. Inside every function body the
  // hoisted declarations and the step-2 runs are dealt through the rest of the body, so no contiguous
  // region carries one origin's code. Units are original byte spans, re-ordered: nothing is rewritten.
  // The seed is derived from the build seed, so the weave is reproducible for a given build. WEAVE=0
  // disables it; WEAVE_SEED=n overrides the seed (used by the K-seed equivalence sweep).
  {
    if (process.env.WEAVE === '0') { console.log('[WEAVE] disabled (WEAVE=0)'); }
    else {
      const wseed = process.env.WEAVE_SEED ? (Number(process.env.WEAVE_SEED) >>> 0) : (SEEDINT('cc34-weave') >>> 0);
      const tmpIn = path.join(process.env.TMPDIR || '/tmp', 'cc34-weave-in.js');
      const tmpOut = path.join(process.env.TMPDIR || '/tmp', 'cc34-weave-out.js');
      fs.writeFileSync(tmpIn, minReal);
      const out = execFileSync(process.execPath, [path.join(REPO, 'Active', 'O8.15', 'tools', 'weave-payload.mjs'),
        '--apply', tmpIn, tmpOut, '--seed=' + wseed], { maxBuffer: 1 << 28 }).toString().trim();
      for (const line of out.split('\n')) console.log('[WEAVE] ' + line);
      const wv = fs.readFileSync(tmpOut, 'utf8');
      console.log(`[WEAVE] seed=${wseed} (0x${wseed.toString(16)})`);
      // ---- [2a-quinquies] STEP 4 (8.15): THE CONSTRAINT PASS. An independent re-derivation of the
      // movable set on the WOVEN bytes, asserting the four ways a move could be observed (same-name
      // declarations, private run windows, order-observable calls, shared-root writes) plus the
      // array-content order against the pre-weave file. Red = the build is refused; CONSTRAINT=0 skips.
      if (process.env.CONSTRAINT === '0') { console.log('[CONSTR] disabled (CONSTRAINT=0)'); }
      else {
        const cp = execFileSync(process.execPath, [path.join(REPO, 'Active', 'O8.15', 'tools', 'constraint-pass.mjs'),
          tmpOut, '--pre=' + tmpIn], { maxBuffer: 1 << 28 }).toString().trim();
        for (const line of cp.split('\n')) console.log('[CONSTR] ' + line);
        if (!/=> PASS/.test(cp)) throw new Error('constraint pass is red — refusing to build');
      }
      minReal = wv;
    }
  }

  // [2b] O8.10 G8 repin: minification reprints probe texts, invalidating S4's pins
  // (lexVerify hashes fn.toString — stale pins fail closed into fiction and kill
  // the shipped bundle). Strip the raw tail, re-slice probes from MINIFIED bytes
  // (decimal const forms — terser reprints hex), re-hash, append fresh pins.
  // Pin what ships (same model as V2 pins). Bug: tG7HexxSM live log 2026-09-14.
  {
    const tailRe = /[,;]?lexSetPins\(\[[^\]]*\]\);?\s*$/; // leading [,;]: terser sequences-joins the tail with a comma
    if (!tailRe.test(minReal)) throw new Error('G8 repin: raw tail not found');
    let stripped = minReal.replace(tailRe, '');
    // HNT-GREP: re-append the anti-grep noise AFTER minification. Injecting it upstream does not
    // work — terser's dead-code elimination removes an unreferenced array in a side-effect-free
    // IIFE, so the bundle carried the noise but the shipped payload did not.
    // CC-33 (2026-09-20) ORDER FIX: this now runs BEFORE the G8 pin computation so the pins hash
    // the bytes that actually ship and the `lexSetPins([...])` stub stays the last thing in the
    // file (test-stego11-matrix asserts it with a `$`-anchored tail regex).
    const _noiseCandidates = [
      process.env.NOISE_SIDECAR,
      path.join(REPO, 'Active', 'O8.14', 'CC-33', 'oto', 'grep-noise.json'),
      path.join(REPO, 'Active', 'O8.13', 'oto', 'grep-noise.json'),
    ].filter(Boolean);
    const _noisePath = _noiseCandidates.find((q) => fs.existsSync(q));
    if (_noisePath) {
      const _items = JSON.parse(fs.readFileSync(_noisePath, 'utf8'));
      if (Array.isArray(_items) && _items.length) {
        const _expr = ',(()=>{[' + _items.map(x => JSON.stringify(x)).join(',') + ']})()';
        stripped = stripped.replace(/;?\s*$/, '') + _expr + ';';
        console.log(`[HNT-GREP] re-appended ${_items.length} noise strings after terser (+${_expr.length} B) from ${path.relative(REPO, _noisePath)}`);
      }
    } else { console.warn('[HNT-GREP] no grep-noise.json sidecar — carrier ships without anti-grep noise'); }

    const fnv = (s) => { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); };
    const sliceFn = (name, constIds) => {
      let cpos = -1, hits = 0;
      for (const cid of constIds) { let i = -1; while ((i = stripped.indexOf(cid, i + 1)) !== -1) { cpos = i; hits++; } }
      if (hits !== 1) throw new Error('G8 repin const not unique: ' + name);
      const a = stripped.lastIndexOf('function', cpos);
      if (a < 0) throw new Error('G8 repin probe missing: ' + name);
      let i = stripped.indexOf('{', a), d = 0, q = null;
      for (; i < stripped.length; i++) {
        const c = stripped[i];
        if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
        if (c === '"' || c === "'" || c === '`') { q = c; continue; }
        if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return stripped.slice(a, i + 1); }
      }
      throw new Error('G8 repin probe unterminated: ' + name);
    };
    const probes = [['lexProbeA', ['0x51ab3c09', '1370176521']], ['lexProbeU', ['0x6f2c9d4e', '1865194830']], ['lexProbeX', ['0x1b3c51ab', '456937899']]];
    const pins = probes.map(([n, c]) => { const body = sliceFn(n, c); if (!c.some((x) => body.includes(x))) throw new Error('G8 repin probe mangled: ' + n); return fnv(body); });
    if (new Set(pins).size !== 3) throw new Error('G8 repin pins degenerate');
    minReal = stripped + ';lexSetPins(' + JSON.stringify(pins) + ');';
    console.log('[G8] repinned for minReal:', pins.join(','));
  }
  if (minReal.length !== EXPECT.minReal) console.warn(`[WARN] minReal ${minReal.length} != ${EXPECT.minReal} (r3, was 1626945)`); // r3 patched: allow smaller minReal
  assertAnchors(minReal, 'minReal');
  const gzReal = zlib.gzipSync(Buffer.from(minReal, 'utf8'), { level: 9 });
  if (gzReal.length !== EXPECT.gzReal) console.warn(`[WARN] gzReal ${gzReal.length} != ${EXPECT.gzReal} (r3)`);
  console.log(`[+] real: min ${minReal.length} -> gzip ${gzReal.length}`);
  const rawDecoy = fs.readFileSync(path.join(__dirname, 'decoy-garden-v2.js'), 'utf8');
  const minDecoy = (await Terser.minify(rawDecoy, MINIFY_DECOY)).code;
  if (minDecoy.length !== EXPECT.minDecoy) console.warn(`[WARN] minDecoy ${minDecoy.length} != ${EXPECT.minDecoy} (r3)`);
  assertAnchors(minDecoy, 'minDecoy');
  const gzDecoy = zlib.gzipSync(Buffer.from(minDecoy, 'utf8'), { level: 9 });
  if (gzDecoy.length !== EXPECT.gzDecoy) console.warn(`[WARN] gzDecoy ${gzDecoy.length} != ${EXPECT.gzDecoy} (r3)`);
  console.log(`[+] decoy: min ${minDecoy.length} -> gzip ${gzDecoy.length}`);
  fs.writeFileSync(path.join(outDir, 'stego11p-real.min.js'), minReal);
  fs.writeFileSync(path.join(outDir, 'stego11p-decoy.min.js'), minDecoy);
  const rawHoney = fs.readFileSync(path.join(__dirname, 'honey-board-src.js'), 'utf8');
  const minHoney = (await Terser.minify(rawHoney, MINIFY_HONEY)).code;
  if (minHoney.length !== EXPECT.minHoney) console.warn(`[WARN] minHoney ${minHoney.length} != ${EXPECT.minHoney} (r3)`);
  assertAnchors(minHoney, 'minHoney');
  const gzHoney = zlib.gzipSync(Buffer.from(minHoney, 'utf8'), { level: 9 });
  if (gzHoney.length !== EXPECT.gzHoney) console.warn(`[WARN] gzHoney ${gzHoney.length} != ${EXPECT.gzHoney} (r3)`);
  console.log(`[+] honey: min ${minHoney.length} -> gzip ${gzHoney.length}`);
  fs.writeFileSync(path.join(outDir, 'stego11p-honey.min.js'), minHoney);
  const rawTube = fs.readFileSync(path.join(__dirname, 'tube-vault-src.js'), 'utf8');
  const minTube = (await Terser.minify(rawTube, MINIFY_HONEY)).code;
  if (minTube.length !== EXPECT.minTube) console.warn(`[WARN] minTube ${minTube.length} != ${EXPECT.minTube} (r3)`);
  assertAnchors(minTube, 'minTube');
  const gzTube = zlib.gzipSync(Buffer.from(minTube, 'utf8'), { level: 9 });
  if (gzTube.length !== EXPECT.gzTube) console.warn(`[WARN] gzTube ${gzTube.length} != ${EXPECT.gzTube} (r3)`);
  console.log(`[+] tube: min ${minTube.length} -> gzip ${gzTube.length}`);
  fs.writeFileSync(path.join(outDir, 'stego11p-tube.min.js'), minTube);
  // 2026-09-17: rotation.json was hard-wired to O8.12-r3 with no fallback.
  // O8.13's copy is byte-identical to r3's (verified), so prefer the live bench.
  const _rotCands = ['O8.13','O8.12-r4','O8.12-r3','O8.12-r2','O8-legacy'];
  const _rotSrc = _rotCands.map(c => path.join(REPO,'Active',c,'oto','rotation.json')).find(f => fs.existsSync(f));
  if (!_rotSrc) throw new Error('rotation.json not found in any line dir');
  fs.copyFileSync(_rotSrc, path.join(outDir, 'rotation.json'));

  console.log(`=== [3] Real embed (carrier=${CARRIER}) ===`);
  const seed = slowChain((SALT ^ FNV_SHIPPED ^ (((CANON_BITS * GOLDEN) >>> 0))) >>> 0);
  console.log(`[+] seed=0x${seed.toString(16)} (canon bits ${CANON_BITS})`);
  const stego = Buffer.from(cover);
  const plaque = fs.readFileSync(path.join(__dirname, 'stego3-strip-base.bin'));
  if (plaque.length !== STRIP_LEN) throw new Error(`plaque ${plaque.length}`);
  const shead = stego.subarray(0, 54);
  // HNT-N / DS-2 cover slack: strip starts at pixelOff + slackFor(head), real channel
  // immediately after the strip. Both sides (codec + loader + every reel) recompute the
  // same slack from these 54 header bytes, so it is never stored in the carrier.
  const SLACK = slackFor(shead), S0 = stripOff(shead);
  if (S0 + STRIP_LEN > stego.length) throw new Error('cover too small for strip + slack');
  plaque.copy(stego, S0);
  // R2-02 (2026-09-18): Two-sided random prefix padding to defeat gzip magic oracle (1f 8b 08).
  // Goal: move the gzip magic 1f 8b 08 off its fixed offset 0 so it stops leaking keystream.
  // Both embedReal and legacyReel derive padLen from seed deterministically, prepend padBuf before gzReal,
  // verify gzip magic at out[padLen..padLen+1], and return out.subarray(padLen) for gunzip.
  const padLen = 32 + (seed % 64);
  let padSeed = (seed ^ 0x5a5a5a5a) >>> 0;
  function padRng() {
    padSeed |= 0; padSeed = (padSeed + 0x6d2b79f5) | 0;
    let t = Math.imul(padSeed ^ (padSeed >>> 15), 1 | padSeed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const padBuf = Buffer.alloc(padLen);
  for (let pi = 0; pi < padLen; pi++) padBuf[pi] = Math.floor(padRng() * 256);
  const realPayload = Buffer.concat([padBuf, gzReal]);
  // ---- [3a] real channel embed (carrier-switched): r31 splits pad||gz across two 2-bit
  // planes, v3 writes the whole stream as 4-bit nibbles at the fixed-offset RS.
  let nR, r31 = null;
  if (CARRIER === 'v3') {
    nR = embedReal(stego, shead, seed, realPayload);
  } else {
    r31 = r31_embedReal(stego, shead, seed, realPayload);
    nR = r31.total;
  }
  // The decoy strip's keystream is seeded from the FRAME GEOMETRY, which the loader
  // recomputes itself as (w*41 + h*13 + bpp*5 + 41*7) & 65535. Passing the real cover
  // dimensions is load-bearing: with the codec's 800x680 default the 1024x768 cover
  // encrypted the garden under 42047 while the loader decrypted under 52375, so the
  // default paste produced garbage, gunzip threw, and `catch (e9) { return; }` swallowed
  // it into total silence. Log it so a future cover change is visible at build time.
  const nD = embedDecoy(stego, shead, gzDecoy, w, h, bpp);
  // ---- [3b] U4 grain fill. The strip tail used to be forced to LSB-2 = 0 (90 KB of zeroed
  // LSBs = a loud tool signature) and the strip->channel gap used to be a pristine sliver
  // between two modified bands (which is itself a tell that a jittered RS exists). Grain
  // covers both, bits 0-1 only: plaque bits 2-7 untouched, PG3 decoy already written, so
  // grain can only land after its last symbol.
  let nG = 0, gapB = 0, rStartMin = S0 + STRIP_LEN;
  if (CARRIER === 'r31') {
    rStartMin = Math.min(...r31.reels.map((x) => x.RS));
    nG = r31_grainStrip(stego, seed, S0 + nD, rStartMin);
    gapB = rStartMin - (S0 + STRIP_LEN);
  }
  // ---- [3c] build-time round-trips: fail here (cheap, precise) instead of in a gate.
  {
    const dck = extractDecoy(stego, shead, w, h, bpp);
    if (!dck || !dck.equals(gzDecoy)) throw new Error('decoy round-trip FAIL (grain clobbered the PG3 strip?)');
    if (CARRIER === 'r31') {
      const rt = r31_extractReal(stego, shead, seed);
      if (!rt || !rt.equals(gzReal)) throw new Error('r3.1 real round-trip FAIL (codec embed/extract drift)');
      console.log(`[+] round-trip OK: real ${rt.length} B, decoy ${dck.length} B, grain ${nG} B (gap ${gapB} B)`);
    }
  }
  console.log(`[+] decoy strip keystream seed ${dseedFor(w, h, bpp)} from ${w}x${h}x${bpp} (loader recomputes the same)`);
  console.log(`[+] cover slack ${SLACK} B -> strip @${S0}, channel base @${S0 + STRIP_LEN} (loader + reels recompute from the header)`);
  if (CARRIER === 'v3') {
    const R = stego.length - rStartFor(shead);
    console.log(`[+] carrier v3 (4-bit, fixed RS ${S0 + STRIP_LEN}) real ${nR}/${R} slots (${(100 * nR / R).toFixed(2)}%), decoy ${nD}/${STRIP_LEN} symbols`);
  } else {
    // R2-STEGO-TAIL (opt-in until approved): grain the unused permuted tail of each reel so the
    // payload length cannot be read off the boundary between written and untouched slots.
    if (process.env.REEL_SPEC) {
      fs.writeFileSync(process.env.REEL_SPEC, JSON.stringify({ seed, head: Buffer.from(shead).toString('hex'), need: r31.reels[0].need, reels: r31.reels.map((x) => ({ r: x.r, RS: x.RS, R_LEN: x.R_LEN, need: x.need })) }, null, 1));
      console.log(`[+] reel spec dumped -> ${process.env.REEL_SPEC}`);
    }
    if (process.argv.includes('--reel-grain')) {
      let nTail = 0;
      for (const x of r31.reels) { const n = r31_grainReel(stego, shead, seed, x.r, x.need); nTail += n; console.log(`[+] tail grain reel${x.r}: ${n} slots (${(n / 4).toFixed(0)} B equivalent) — 0 payload bytes`); }
      console.log(`[+] tail grain total: ${nTail} slots`);
    }
    for (const x of r31.reels) {
      const hr = Math.floor((x.capacity - x.need) / 4);
      console.log(`[+] carrier r31 reel${x.r} (pixel bits ${x.r * 2}-${x.r * 2 + 1}) RS=${x.RS} R_LEN=${x.R_LEN} need=${x.need} slots occ=${(100 * x.occupancy).toFixed(2)}% headroom=${hr} B`);
      if (x.occupancy > 0.92) console.warn(`[WARN] reel${x.r} occupancy ${(100 * x.occupancy).toFixed(1)}% > 92% — pair any further payload growth with a 3rd reel or a bigger cover`);
    }
    console.log(`[+] carrier r31 (2-bit x 2 reels) total ${nR} slots, decoy ${nD}/${STRIP_LEN} symbols, grained ${nG} B`);
  }

  const bmpName = 'O8.12-cover.bmp';
  fs.writeFileSync(path.join(outDir, bmpName), stego);

  console.log('=== [4] Runner ===');
  // ---- G4: 7 reel tables (bits 1..7), seed-coupled keys, 6 honey ----
  // U4: the shipped real reel mirrors whichever codec wrote the channel.
  const reelFile = (CARRIER === 'v3') ? 'stego10-legacyreel-src.js' : 'stego10-legacyreel-src-v31.js';
  const reelSrcReal = fs.readFileSync(path.join(__dirname, reelFile), 'utf8');
  console.log(`[+] carrier=${CARRIER} real reel source ${reelFile} (${reelSrcReal.length} chars)`);
  function mulberry(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function honeyReelSrc(bits, rng) {
    const hx = (n, w) => '0x' + (n >>> 0).toString(16).padStart(w, '0');
    let m0 = 0x40 + Math.floor(rng() * 0x30), m1 = 0x30 + Math.floor(rng() * 0x40);
    if (m0 === 0x50 && m1 === 0x33) m0 ^= 0x01;
    const rsBase = 98400 + SLACK + 64 + Math.floor(rng() * 512); // keep the dead reels clear of the shifted strip
    const a1 = 33 + 2 * Math.floor(rng() * 16), a2 = 11 + 2 * Math.floor(rng() * 16);
    const khx = Math.floor(rng() * 0x10000), add = Math.floor(rng() * 0x100000000);
    const poly = Math.floor(rng() * 0x100000000);
    return (
'// Community gallery reel (venue board ' + bits + '). Carried in the player bundle\n' +
'// and selected per venue board at load; unprovisioned boards play the garden.\n' +
'// Must be a function EXPRESSION. Keep ASCII.\n' +
'(function legacyReel(pigment, head, seed, pixelOff) {\n' +
'var RS = pixelOff + ' + rsBase + ', RL = pigment.length - RS, i, j, t, k;\n' +
'function R(s) { return function () { s |= 0; s = (s + ' + hx(add, 8) + ') | 0; var q = Math.imul(s ^ (s >>> 15), 1 | s); q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q; return ((q ^ (q >>> 14)) >>> 0) / 4294967296; }; }\n' +
'var P = new Uint32Array(RL), rr = R(seed);\n' +
'for (i = 0; i < RL; i++) P[i] = i;\n' +
'for (i = RL - 1; i > 0; i--) { j = (rr() * (i + 1)) | 0; t = P[i]; P[i] = P[j]; P[j] = t; }\n' +
'function K(o) { return (head[o % 54] ^ ((seed + ' + a1 + ' * o) & 255) ^ ((' + a2 + ' * o) & 255)) & 255; }\n' +
'function KH(o) { var e = (seed ^ ' + hx(khx, 4) + ') >>> 0; return (head[o % 54] ^ ((e + ' + a1 + ' * o) & 255) ^ ((' + a2 + ' * o) & 255)) & 255; }\n' +
'var hb = [0,0,0,0,0,0,0,0,0,0,0,0], nb;\n' +
'for (j = 0; j < 24; j++) { nb = pigment[RS + P[j]] & 15; if (j & 1) hb[j >> 1] |= nb; else hb[j >> 1] = nb << 4; }\n' +
'for (i = 0; i < 12; i++) hb[i] ^= KH(i);\n' +
'if (hb[0] !== ' + hx(m0, 2) + ' || hb[1] !== ' + hx(m1, 2) + ') return null;\n' +
'var L = (hb[2] | (hb[3] << 8) | (hb[4] << 16) | (hb[5] << 24)) >>> 0;\n' +
'if ((12 + L) * 2 > RL) return null;\n' +
'var TC = new Uint32Array(256);\n' +
'for (i = 0; i < 256; i++) { var c = i; for (k = 0; k < 8; k++) c = (c & 1) ? (' + hx(poly, 8) + ' ^ (c >>> 1)) : (c >>> 1); TC[i] = c >>> 0; }\n' +
'var out = new Uint8Array(L), v, sl;\n' +
'for (i = 0; i < L; i++) { v = 0; for (k = 0; k < 2; k++) { sl = 24 + i * 2 + k; v = (v << 4) | (pigment[RS + P[sl]] & 15); } out[i] = v ^ K(i); }\n' +
'var cc = 0xffffffff;\n' +
'for (i = 0; i < L; i++) cc = TC[(cc ^ out[i]) & 255] ^ (cc >>> 8);\n' +
'cc = (cc ^ 0xffffffff) >>> 0;\n' +
'var want = (hb[6] | (hb[7] << 8) | (hb[8] << 16) | (hb[9] << 24)) >>> 0;\n' +
'var pLen = 32 + (seed % 64);\n' +
'if (cc !== want || L <= pLen || out[pLen] !== 0x1f || out[pLen + 1] !== 0x8b) return null;\n' +
'return out.subarray(pLen);\n})');
  }
  const hrng = mulberry(SEEDINT('stego12-honeyreel'));
  const reelSrcs = [null];
  for (let b = 1; b <= 7; b++) reelSrcs[b] = (b === CANON_BITS) ? reelSrcReal : honeyReelSrc(b, hrng);
  const printable = s => {
    let n = 0;
    for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); if ((c >= 32 && c <= 126) || c === 10 || c === 13 || c === 9) n++; }
    return n / s.length;
  };
  const reelBlobs = [0];
  for (let b = 1; b <= 7; b++) {
    const src = reelSrcs[b];
    if (!/^[\x00-\x7F]*$/.test(src)) throw new Error(`reel src ${b} must be ASCII`);
    new vm.Script(src); // must parse as a function expression
    const pr = printable(src);
    if (pr < 0.8) throw new Error(`reel src ${b} printability ${pr.toFixed(3)} (oracle gate)`);
    const seedB = slowChain((SALT ^ FNV_SHIPPED ^ (((b * GOLDEN) >>> 0))) >>> 0);
    const K = fnv1a(seedB.toString(16) + ':' + SALT.toString(16));
    const codes = [];
    for (let i = 0; i < src.length; i++) codes.push(src.charCodeAt(i) ^ ((((K >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
    reelBlobs[b] = codes;
  }
  console.log(`[+] reel tables: 7 (real=${reelBlobs[7].length}, honey~${reelBlobs[1].length})`);
  // ---- G10 + DS-1: courtesy reel blobs, one per unprovisioned venue ----
  // board8 (Telegram) keeps its historical 'board8:'+salt key so its bytes never move.
  // Boards 9/10/11 (Teams/Zoom/Slack) are DS-1: they used to dead-end in a magic check that
  // could never open, so the loader's dispatch revealed the venue by how it failed. They now
  // carry the same courtesy payload under 'board'+idx+':'+salt, so all four unprovisioned
  // venues behave identically.
  const boardKey = idx => (idx === 8 ? 'board8:' : 'board' + idx + ':') + SALT.toString(16);
  const blobFor = idx => {
    const K = fnv1a(boardKey(idx));
    const codes = [];
    for (let i = 0; i < gzHoney.length; i++) codes.push(gzHoney[i] ^ ((((K >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
    return codes;
  };
  const codes8 = blobFor(8), codes9 = blobFor(9), codes10 = blobFor(10), codes11 = blobFor(11);
  console.log(`[+] board blobs: 8/9/10/11 x ${codes8.length} codes (uniform courtesy dispatch, DS-1)`);
  // ---- G6: sealed studio cache blob (tube payload; tamper/enumeration only) ----
  const KT = fnv1a(SALT.toString(16) + 'board8:');
  const codesT = [];
  for (let i = 0; i < gzTube.length; i++) codesT.push(gzTube[i] ^ ((((KT >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
  console.log(`[+] tube blob: ${codesT.length} codes`);
  // ---- G3: JSO-lite the loader, then terser ----
  const loaderSrc = fs.readFileSync(path.join(__dirname, 'stego11-loader.js'), 'utf8');
  const jsoLoader = JS.obfuscate(loaderSrc, {
    compact: true, simplify: true,
    selfDefending: false, debugProtection: false, disableConsoleOutput: false,
    renameGlobals: false, renameProperties: false, transformObjectKeys: false,
    unicodeEscapeSequence: false,
    identifierNamesGenerator: 'mangled-shuffled',
    seed: SEED('stego12-loader'),
    reservedNames: ['^会員$', '^名$', '^lexMode$', '^lexPinsB$', '^lexProbeL', '^lexVerifyL$'],
    reservedStrings: ['佐藤 結衣'],
    stringArray: false,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.3,
    deadCodeInjection: false, splitStrings: false, numbersToExpressions: false,
  }).getObfuscatedCode();
  const BANNER9 = '/*! Pixel Garden Player v3.3.2 — loads .pgsnapshot gallery files (24-bit BMP + PG3 snapshot strip).\n * Community edition: plays the embedded garden plot. Studio board reels\n * (provisioned separately per venue board) fall back to the garden\n * when unprovisioned. Paste-and-watch. */\n';
  let minLoader = (await Terser.minify(BANNER9 + jsoLoader, MINIFY_LOADER)).code;
  // ---- G8: loader pins (probes sliced from shipped loader text) ----
  {
    const sliceFn = (name) => {
      const a = minLoader.indexOf('function ' + name);
      if (a < 0) throw new Error('G8 loader probe missing: ' + name);
      let i = minLoader.indexOf('{', a), d = 0, q = null;
      for (; i < minLoader.length; i++) {
        const c = minLoader[i];
        if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
        if (c === '"' || c === "'" || c === '`') { q = c; continue; }
        if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return minLoader.slice(a, i + 1); }
      }
      throw new Error('G8 loader probe unterminated: ' + name);
    };
    const lp = [['lexProbeL1', 'Math.imul'], ['lexProbeL2', 'Math.imul']].map(([n, c]) => {
      const body = sliceFn(n);
      if (!body.includes(c)) throw new Error('G8 loader probe mangled: ' + n);
      return fnv1a(body).toString(16);
    });
    if (minLoader.split('lexPinsB=[0,0]').length - 1 !== 1) throw new Error('G8 loader pins anchor missing/dup');
    minLoader = minLoader.replace('lexPinsB=[0,0]', 'lexPinsB=' + JSON.stringify(lp));
    console.log('[+] loader pins:', lp.join(','));
  }

  if (!minLoader || minLoader.length < 2000) throw new Error(`loader min too small: ${minLoader && minLoader.length}`);
  if (!minLoader.includes('Pixel Garden Player v3.3.2')) throw new Error('banner lost in minify');
  if (!minLoader.includes(DEFAULT_NAME)) throw new Error('minLoader: default name missing (JSO ate it)');
  if (!minLoader.includes('会員') || !minLoader.includes('名')) throw new Error('minLoader: 会員/名 missing (JSO ate them)');
  for (const s of ['venueBits', 'tryBoardReel', 'tryTubeReel', 'loadSnapshot', 'tryLegacyReel', 'slowChain', 'personalize', 'gunzipToCode']) {
    if (minLoader.includes(s)) throw new Error(`narrative name survived JSO (G3 gate): ${s}`);
  }
  for (const s of ['crc32', '0xedb88320', 'permFY', 'Uint32Array', 'discord', 'Discord', 'webpack', 'Webpack', 'Electron', 'Telegram', 'Teams', 'Zoom', 'Slack', 'WebApp', 'telegram.org', 'teams.microsoft.com', 'zoom.us', 'slack.com', '0x5033', '0x57E602A1', '1474691745', 'legacyReel', 'TG-DEMO', 'brm/2']) {
    if (minLoader.includes(s)) throw new Error(`banned literal survived: ${s}`);
  }
  const fragHits = (minLoader.match(/__STEGO9_FRAG__/g) || []).length;
  const reelsHits = (minLoader.match(/__STEGO9_REELS__/g) || []).length;
  const boardHits = (minLoader.match(/__STEGO9_BOARD8__/g) || []).length;
  const tubeHits = (minLoader.match(/__STEGO9_TUBE__/g) || []).length;
  const b9 = (minLoader.match(/__STEGO9_BOARD9__/g) || []).length;
  const b10 = (minLoader.match(/__STEGO9_BOARD10__/g) || []).length;
  const b11 = (minLoader.match(/__STEGO9_BOARD11__/g) || []).length;
  if (fragHits !== 1 || reelsHits !== 1 || boardHits !== 1 || tubeHits !== 1 || b9 !== 1 || b10 !== 1 || b11 !== 1) {
    throw new Error(`placeholder hits frag=${fragHits} reels=${reelsHits} board8=${boardHits} b9=${b9} b10=${b10} b11=${b11} tube=${tubeHits}`);
  }
  // ---- G2: fragment the snapshot ----
  const b64 = stego.toString('base64');
  const chunks = [b64.slice(0, 5)];
  for (let p = 5; p < b64.length; p += 173) chunks.push(b64.slice(p, p + 173));
  const frng = mulberry(SEEDINT('stego12-frag'));
  const order = chunks.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(frng() * (i + 1)); const tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  // U3 (2026-09-21): 4-way OUTER interleave — the permuted chunk list is dealt into four groups by
  // `order % 4` (the codec's documented r3_splitR9F contract), so the artifact holds four shorter
  // interleaved runs instead of one long one. The loader flattens the groups back before the
  // shuffle-undo, which is order-independent because chunk/order stay paired inside each group.
  const _grp = r3_splitR9F(order.map(i => chunks[i]), order);
  // ---- ARM A (2026-09-26): the deal (o0..o3) is NOT published any more. The loader regenerates it
  // from `s` with the same mulberry32 + Fisher-Yates; the groups keep the same `order % 4` contract,
  // so nothing downstream moves. Drift guard: regenerate here exactly as the loader does and fail
  // the build on any mismatch — a wrong derivation is an unreadable artifact, not a gate finding.
  const _dealSeed = SEEDINT('stego12-frag') >>> 0;
  {
    const _r = (function (a) {
      return function () {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    })(_dealSeed);
    const _re = order.map((_, i) => i);
    for (let i = _re.length - 1; i > 0; i--) { const j = Math.floor(_r() * (i + 1)); const t = _re[i]; _re[i] = _re[j]; _re[j] = t; }
    if (_re.join(',') !== order.join(',')) throw new Error('ARM A: the loader-side deal does not reproduce the build deal');
    const _was = JSON.stringify({ o0: _grp.o0, o1: _grp.o1, o2: _grp.o2, o3: _grp.o3 }).length;
    console.log(`[ARM A] deal regenerated in the loader from s=0x${_dealSeed.toString(16)} — o0..o3 not published (${_was} B dropped)`);
  }
  const fragObj = { s: _dealSeed, c0: _grp.c0, c1: _grp.c1, c2: _grp.c2, c3: _grp.c3 };
  let runner = minLoader.replace(/(['"])__STEGO9_FRAG__\1/, '/*R9F*/' + JSON.stringify(fragObj));
  runner = runner.replace(/(['"])__STEGO9_REELS__\1/, '/*R9R*/[0,' + reelBlobs.slice(1).map(b => '[' + b.join(',') + ']').join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_BOARD8__\1/, '/*R9B*/[' + codes8.join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_BOARD9__\1/, '/*R9I*/[' + codes9.join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_BOARD10__\1/, '/*R9J*/[' + codes10.join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_BOARD11__\1/, '/*R9K*/[' + codes11.join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_TUBE__\1/, '/*R9T*/[' + codesT.join(',') + ']');
  if (runner.includes('__STEGO9_')) throw new Error('placeholder survived');
  if (/\"o0\"/.test(runner) || /\"o3\"/.test(runner)) throw new Error('ARM A: the published deal survived into the runner');
  console.log('[ARM A] runner carries no o0..o3 map (checked)');
  for (const s of ['/*R9F*/', '/*R9R*/', '/*R9B*/', '/*R9I*/', '/*R9J*/', '/*R9K*/', '/*R9T*/']) {
    if ((runner.match(new RegExp(s.replace(/[*/]/g, '\\$&'), 'g')) || []).length !== 1) throw new Error(`anchor ${s} missing/dup`);
  }
  runner = LINE1[line1Variant] + runner;
  const runName = 'O8.12-runner.js';
  fs.writeFileSync(path.join(outDir, runName), runner);
  console.log(`[+] line1 variant ${line1Variant}: ${JSON.stringify(LINE1[line1Variant])}`);
  console.log(`[+] ${bmpName}: ${stego.length} B sha=${sha256(stego)}`);
  console.log(`[+] ${runName}: ${runner.length} chars sha=${sha256(runner)}`);
  console.log('[✓] Stego-11p build complete:', outDir);
})().catch(err => { console.error('[!] Build failed:', err); process.exit(1); });
