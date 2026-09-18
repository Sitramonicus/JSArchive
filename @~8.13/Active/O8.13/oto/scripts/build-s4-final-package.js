const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const REPO = path.resolve(__dirname, "..", "..", "..", "..");
const O86 = path.resolve(__dirname, '..', '..') // r3 O both;
const ENG = path.join(REPO, "Active", "engines", "node_modules");
// Engines live in Active/engines (npm install there); fall back to NODE_PATH/global.
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  try { return require(name); } catch (e) { /* fall through */ }
  throw new Error(`Missing engine "${name}" — run: cd ${path.resolve(__dirname, '..', '..')} && npm install`);
}
const JS = needEngine("javascript-obfuscator");
const { derive: SEED, deriveInt: SEEDINT } = require("./seed-lib.js"); // O8.9 G1 (deriveInt added for HNT-GREP)
const { execFileSync } = require("child_process");

console.log("=== Building O8.13 S6 Deliverables (12 shards, 6 uniform) ===");

const OTO_ROOT = path.join(O86, "oto");
const PKG_DIR = path.join(O86, "final-package");
const SHARDS_DIR = path.join(PKG_DIR, "selected-shards");
fs.mkdirSync(SHARDS_DIR, { recursive: true });

// 1. Copy selected shards
const selection = [
  { tag: "a", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-a-out.js"), out: "shard-a-v1.js" },
  { tag: "m", file: path.join(OTO_ROOT, "v2-jsc/shard-m-out.js"), out: "shard-m-v2.js" },
  { tag: "u", file: path.join(OTO_ROOT, "u/shard-u-out.js"), out: "shard-u-v4.js" },
  { tag: "n1", file: path.join(OTO_ROOT, "v6-esbuild/shard-n1-out.js"), out: "shard-n1-v6.js" },
  { tag: "e", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-e-out.js"), out: "shard-e-v1.js" },
  { tag: "n2", file: path.join(OTO_ROOT, "v7-swc/shard-n2-out.js"), out: "shard-n2-v7.js" },
  { tag: "aux", file: path.join(OTO_ROOT, "v5-terser/shard-aux-out.js"), out: "shard-aux-v5.js" },
  { tag: "p-telegram", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-p-telegram-out.js"), out: "shard-p-telegram-v1.js" },
  { tag: "p-teams", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-p-teams-out.js"), out: "shard-p-teams-v1.js" },
  { tag: "p-zoom", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-p-zoom-out.js"), out: "shard-p-zoom-v1.js" },
  { tag: "p-slack", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-p-slack-out.js"), out: "shard-p-slack-v1.js" },
  { tag: "p-discord", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-p-discord-out.js"), out: "shard-p-discord-v1.js" },
];

// 1b. Frozen v2 pin (Stego-3 G4): js-confuser is unseedable, so the consumed v2
// piece is PINNED, not rebuilt (obf-v2-jsc.js runs manually only). Refresh flow:
// run obf-v2-jsc.js, re-green battery, update EXPECTED_V2_M below.
const EXPECTED_V2_M = "7082ce98adcef5df5a1a7d107bf8360908ac187ecbfcce059f3d159a62bed70f"; // R2-03 shatter + R2-04/05a/05b source refresh
{
  const _v2m = fs.readFileSync(path.join(OTO_ROOT, "v2-jsc/shard-m-out.js"));
  const _h = require("crypto").createHash("sha256").update(_v2m).digest("hex");
  if (_h !== EXPECTED_V2_M) throw new Error(`v2 frozen pin mismatch: ${_h} != ${EXPECTED_V2_M} (refresh deliberately, see above)`);
}

for (const s of selection) {
  const content = fs.readFileSync(s.file, "utf8");
  fs.writeFileSync(path.join(SHARDS_DIR, s.out), content);
  console.log(`[Copied] ${s.out} (${(content.length / 1024).toFixed(1)} KB)`);
}

// 2. Stitch shards
const stitchedRawPath = "/tmp/stitched-raw.js";
const shardPaths = selection.map(s => path.join(SHARDS_DIR, s.out));
execFileSync("python3", [path.join(O86, "tools", "stitch-o85.py"), ...shardPaths, stitchedRawPath]);
const rawStitched = fs.readFileSync(stitchedRawPath, "utf8");
console.log(`[Stitched] Raw bundle size: ${(rawStitched.length / 1024).toFixed(1)} KB`);

// 3. Obfuscate master bundle with 5k Dictionary 2
const noSupLead = (a) => a.filter(w => { const c = w.codePointAt(0); return !(c >= 0x10000 && c <= 0x10FFFD); }); // see obf-v1-s3matrix.js note
const DICT_ALL = noSupLead(fs.readFileSync(path.join(OTO_ROOT, "identifiers-dictionary-5k.csv"), "utf8").split(",").map(s=>s.trim()).filter(Boolean));
const DICT_SPLIT = [DICT_ALL.slice(0,780), DICT_ALL.slice(780,1560), DICT_ALL.slice(1560,2340)]; // r3 O: 3x780 split (both P trampoline + O split decoy)
const DICT_5K_BUNDLE = DICT_ALL; // keep compat, per-shard uses DICT_SPLIT[tag%3]

console.log(`[Obfuscating Bundle] Using 5k dictionary (${DICT_5K_BUNDLE.length} words)...`);
const t0 = Date.now();
const bundleObfResult = JS.obfuscate(rawStitched, {
  compact: true,
  simplify: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,
  renameProperties: false,
  transformObjectKeys: true,
  identifierNamesGenerator: "dictionary",
  identifiersDictionary: DICT_5K_BUNDLE,
  identifiersPrefix: "google",
  seed: SEED("s4-bundle"),
  reservedNames: ["^会員$", "^名$", "^lexMode$", "^lexProbeA$", "^lexProbeU$", "^lexProbeX$", "^lexSetPins$"], // O8.9 G8
  reservedStrings: ["佐藤 結衣", "kcolbUelgooG"],
  stringArray: false,
  controlFlowFlattening: false, // r3 P avenue: trampoline instead of split("|"),
  controlFlowFlatteningThreshold: 0.25,
  deadCodeInjection: false,
  numbersToExpressions: false
}).getObfuscatedCode();

// FIX: JSO compact mode omits space after `return` when next identifier starts with supplementary-plane unicode (e.g. gothic 𐌹 U+10339 surrogate pair)
// `return𐌹` is parsed as identifier `return𐌹`, not `return`+identifier -> SyntaxError. Old dict had no supplementary-plane starts, so it passed.
// Add space after `return` when next char is not whitespace/;/( — safe for all: `return"` -> `return "`, `return(` -> `return (` remain valid.
// FIX: JSO compact omits space after keywords when next identifier starts with supplementary-plane unicode (e.g. gothic 𐌹 U+10339)
// Affects `return`, `typeof`, `throw`, `delete`, `void`, `instanceof`, `in`, `of`, `new`, `case`, `yield`, `await`, `import`, `export`, `extends`, `super`, `function`, `class`, `const`, `let`, `var`, `if`, `while`, `for`, `switch`, `catch`, `with`, `debugger`, `continue`, `break`
let _fixedBundle = bundleObfResult;
const _kw = ['return','typeof','throw','delete','void','instanceof','in','of','new','case','yield','await','import','export','extends','super','function','class','const','let','var','if','while','for','switch','catch','with','debugger','continue','break'];
for (const k of _kw) {
  const re = new RegExp('\\b' + k + '\\b(?=[^\\s;\\(\\[\\{])', 'g');
  _fixedBundle = _fixedBundle.replace(re, k + ' ');
}
_fixedBundle = _fixedBundle.replace(/\breturn(?=[^\s;\(])/g, 'return '); // legacy, kept for safety
// Also handle `typeof` specifically for surrogate pair start (high surrogate)
_fixedBundle = _fixedBundle.replace(/typeof(?=[\uD800-\uDBFF])/g, 'typeof ');
if (_fixedBundle !== bundleObfResult) {
  console.log(`[Fix] return<->space inserted: ${bundleObfResult.length} -> ${_fixedBundle.length}`);
  // sanity: ensure still valid JS
  try { require('vm').compileFunction(_fixedBundle, []); } catch(e) { console.warn('[Fix] bundle still invalid after return fix:', e.message.slice(0,120)); }
}
// O8.12-r3 "Q guard": cap level-2 (console.debug) log payloads at 600 chars.
// R4's committed bundle carried this as a HAND patch — no source emitted it, so a fresh
// build silently lost it and the level-2 logs the operator asked for could dump 56 MB
// straight into console-history (quota death). Emitting it here makes it survive rebuilds.
// NOTE: R4's hand patch capped the OBJECT branch with
//   JSON.parse(JSON.stringify(a[1]).slice(0,600))
// which slices the JSON *text* to 600 chars and then JSON.parse's a fragment. That throws on
// every payload longer than 600 chars, the catch swallows it, and the log goes out UNCAPPED
// (measured: a 5,028-char payload still printed at 5,025). Only R4's *string* branch worked.
// This version truncates per top-level key (collapsing any nested value to its JSON text first),
// so the cap holds: ~600 chars per key, ~625 for a typical single-blob level-2 log.
const Q_GUARD = "console['clear'](),(()=>{try{let _d=console.debug;console.debug=function(...a){try{if(a.length>1&&a[1]&&typeof a[1]==='object'){let _s=JSON.stringify(a[1]);if(_s&&_s.length>600){let _o=Array.isArray(a[1])?[]:{};for(let _k in a[1]){let _v=a[1][_k],_t=(_v&&typeof _v==='object')?JSON.stringify(_v):_v;if(typeof _t==='string'&&_t.length>600)_t=_t.slice(0,600);_o[_k]=_t;}a[1]=_o;}}else if(a.length>1&&typeof a[1]==='string'&&a[1].length>600) a[1]=a[1].slice(0,600);}catch(e){} return _d.apply(console,a);} }catch(e){}})(),";
if (!_fixedBundle.startsWith("console['clear'](),")) throw new Error('Q guard anchor missing: bundle no longer opens with console[\'clear\'](),');
_fixedBundle = _fixedBundle.slice(0, "console['clear'](),".length) + Q_GUARD.slice("console['clear'](),".length) + _fixedBundle.slice("console['clear'](),".length);
try { require('vm').compileFunction(_fixedBundle, []); } catch (e) { throw new Error('Q guard broke bundle syntax: ' + e.message.slice(0, 120)); }
console.log(`[Q guard] level-2 log cap installed (+${Q_GUARD.length - "console['clear'](),".length} B)`);

// ---- OTO-1 / DS-3 / HNT-X / HNT-Y level-2 trace -----------------------------
// One console.debug line so a live run can be traced back to the build that produced it and
// the lanes the pockets were on. Two constraints found the hard way:
//   * it must sit INSIDE the bundle's IIFE, next to `var 会員=0x2` — the level variable is
//     function-scoped, so a probe outside it sees `typeof 会員 === 'undefined'` (verified:
//     front-of-bundle and end-of-bundle probes both fired 0 times);
//   * it must be gated to 会員 === 1 — PASS 20 requires strict silence at 会員 = 0.
// It goes through the Q guard above, so it can never grow. No carrier facts, no venue
// names, no payload sizes: just the lane map and a build tag.
const LANE_TAG = 'oto1-a1e2f3';
const _laneMap = {};
for (const s of selection) _laneMap[s.tag] = (s.file.match(/oto\/([a-z0-9-]+)\//) || [, '?'])[1];
const TRACE2 = "typeof \u4f1a\u54e1!=='undefined'&&\u4f1a\u54e1===1&&console['debug']('Garden check',{tag:'" + LANE_TAG + "',lanes:JSON.stringify(" + JSON.stringify(_laneMap) + "),cap:600});";
{
  const DECL = 'var \u4f1a\u54e1=0x2;';
  const hits = _fixedBundle.split(DECL).length - 1;
  if (hits !== 1) throw new Error(`level-2 trace: expected exactly 1 '${DECL}' declaration, found ${hits}`);
  _fixedBundle = _fixedBundle.replace(DECL, DECL + TRACE2);
}
try { require('vm').compileFunction(_fixedBundle, []); } catch (e) { throw new Error('level-2 trace broke bundle syntax: ' + e.message.slice(0, 120)); }
console.log(`[L2 trace] '${LANE_TAG}' lanes ${JSON.stringify(_laneMap)}`);
const finalBundlePath = path.join(PKG_DIR, "O8.6-Final-final-bundle.js");

// 5. Outer-runner dictionary — hoisted above the HNT-GREP pass, which uses the
//    runner list's unused words as decoy fuel. (Was declared down by buildRunner.)
const DICT_5K_RUNNER = noSupLead(fs.readFileSync(path.join(OTO_ROOT, "identifiers-dictionary-runner-5k.csv"), "utf8")
  .split(",").map(s => s.trim()).filter(Boolean));

// ---------------------------------------------------------------------------------------------
// HNT-GREP (operator 2026-09-17): put the dictionary's unused words to work as anti-grep noise.
//
// Measured: identifiers-dictionary-runner-5k.csv is 99% unused — only 34 of its 3,920 words ever
// reach the bundle, because the runner pass emits a handful of identifiers for the loader IIFE.
// Those unused words are the fuel here. For every greppable ASCII token that SURVIVES into the
// bundle, emit a cloud of homoglyph variants built from the operator's substitution table
// (a -> U+0430/U+FF41/U+0251, e -> U+0435/U+FF45, o -> U+043E/U+03BF/U+FF4F, ...) plus unused
// dictionary words as decoy strings. A grep for the literal then returns a field of near-misses
// instead of one clean hit, and the unused vocabulary stops being dead weight.
//
// Tokens that are already absent from the bundle are deliberately NOT given variants: adding a
// lookalike of a clean token would create a tell where none existed.
const GREP_HOMO = {
  a: ['\u0430', '\uFF41', '\u0251'], c: ['\u0441', '\uFF43'], e: ['\u0435', '\uFF45'],
  i: ['\u0456', '\uFF49', '\u0269'], o: ['\u043E', '\u03BF', '\uFF4F'], p: ['\u0440', '\u03C1', '\uFF50'],
  s: ['\u0455', '\uFF53'], x: ['\u0445', '\uFF58'], y: ['\u0443', '\uFF59'],
};
{
  const _noiseRng = (() => { let s = SEEDINT('grepnoise') >>> 0;
    return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();
  // Candidate greppable tokens, taken from the RAW stitched source rather than the obfuscated
  // bundle. Three dead ends recorded so this is not re-litigated:
  //   (a) scanning the bundle for mixed-case runs selects obfuscated IDENTIFIERS — the dictionary
  //       words carry capitals too (pRairie, lAttice), so length-sorting just picks more of them;
  //   (b) quoted-literal extraction misses the real targets, because taskConfigV1 / venueTitle /
  //       quests are object KEYS inside the payload string the runner evals, not standalone literals;
  //   (c) scanning the bundle at all means competing with ~100k generated names.
  // The raw source has only the genuine names, so filter there and then keep the ones that
  // actually SURVIVED into the bundle — a token G7 already encoded is clean and must not be given
  // a lookalike, or we would create a tell where none existed.
  const _cands = new Set();
  // Object keys harvested from the SHARD sources, before g7 and before any OTO pass. Four dead
  // ends are recorded here so this is not re-litigated:
  //   (a) mixed-case runs in the bundle -> selects obfuscated identifiers (dictionary words carry
  //       capitals too, so length-sorting just picks more of them);
  //   (b) quoted-literal extraction -> misses the targets, which are object KEYS inside the
  //       payload string the runner evals, not standalone literals;
  //   (c) rawStitched (the pre-S4 stitch) -> the pocket payloads are still rc4 string-array
  //       entries there, so `taskConfigV1:` is not visible yet;
  //   (d) key position in the final bundle -> 1,961 candidates, dominated by names the obfuscator
  //       itself minted via transformObjectKeys (MvDtf, RUNP8_nhZSBxP, q0IS54).
  // The shards are the only place with just the genuine names. Keep only those that SURVIVED into
  // the bundle: a token g7 already encoded is clean and must not be handed a lookalike, or we
  // would manufacture a tell where none existed.
  for (const f of fs.readdirSync(path.join(O86, 'shards'))) {
    if (!f.endsWith('.js')) continue;
    const src = fs.readFileSync(path.join(O86, 'shards', f), 'utf8');
    for (const m of src.matchAll(/(?:'([^'\\\n]{4,24})'|"([^"\\\n]{4,24})"|([A-Za-z_$][A-Za-z0-9_$]{3,23}))\s*:/g)) {
      const t = m[1] || m[2] || m[3];
      if (!t || !/^[A-Za-z][A-Za-z0-9_]*$/.test(t)) continue;
      _cands.add(t);
    }
  }
  // Longest first: `taskConfigV1` and `participantState` are the greppable tells, while the short
  // generic keys (info, warn, length, flags) are not worth varianting and were eating the budget
  // when insertion order decided it.
  const _targets = [..._cands].filter(t => _fixedBundle.includes(t))
    .sort((a, b) => b.length - a.length).slice(0, 40);
  console.log(`[HNT-GREP] ${_cands.size} object keys in the shards, ${_targets.length} survived into the bundle: ${_targets.join(', ')}`);
  const _variant = (t) => {
    const cs = t.split('');
    const idx = cs.map((c, i) => GREP_HOMO[c.toLowerCase()] ? i : -1).filter(i => i >= 0);
    if (!idx.length) return null;
    for (let n = 0; n < 1 + Math.floor(_noiseRng() * 2); n++) {
      const i = idx[Math.floor(_noiseRng() * idx.length)];
      const alt = GREP_HOMO[cs[i].toLowerCase()];   // must match the toLowerCase() used to build idx
      if (!alt) continue;
      cs[i] = alt[Math.floor(_noiseRng() * alt.length)];
    }
    const v = cs.join('');
    return v === t ? null : v;
  };
  const _pool = DICT_5K_RUNNER.filter(w => !_fixedBundle.includes(w));
  const _items = [];
  for (const t of _targets) {
    const seen = new Set();
    for (let k = 0; k < 3; k++) {
      const v = _variant(t);
      if (v && !seen.has(v) && !_fixedBundle.includes('"' + v + '"')) { seen.add(v); _items.push(v); }
    }
  }
  for (let k = 0; k < 60 && _pool.length; k++) {
    _items.push(_pool[Math.floor(_noiseRng() * _pool.length)]);
  }
  if (_items.length) {
    // The bundle is one comma-expression chain (the Q guard is spliced into it the same way),
    // so the noise has to be an EXPRESSION, not a `var` statement. An immediately-invoked
    // function that does nothing is valid there and executes harmlessly once; its literal
    // array is the point — it exists in the bytes so grep finds it, and it is never read.
    const _arr = '[' + [...new Set(_items)].map(x => JSON.stringify(x)).join(',') + ']';
    const _block = '(()=>{' + _arr + '})(),';
    // inject immediately after the Q guard's own closing `})(),`
    const _qEnd = _fixedBundle.indexOf('})(),', Q_GUARD.length - 6);
    if (_qEnd > 0) {
      const _at = _qEnd + '})(),'.length;
      const _cand = _fixedBundle.slice(0, _at) + _block + _fixedBundle.slice(_at);
      try { require('vm').compileFunction(_cand, []); _fixedBundle = _cand;
        // Sidecar: the stego builder minifies the bundle with terser, and terser's DCE removes an
        // unreferenced array in a side-effect-free IIFE (measured: the block reached the bundle but
        // not stego11p-real.min.js, so the carrier shipped no noise at all). Handing the list over
        // as data lets the builder re-append it AFTER minification, where nothing strips it.
        fs.writeFileSync(path.join(OTO_ROOT, 'grep-noise.json'), JSON.stringify([...new Set(_items)]));
        console.log(`[HNT-GREP] ${new Set(_items).size} noise strings from ${_targets.length} surviving tokens (+${_block.length} B) + sidecar grep-noise.json`);
      } catch (e) { console.warn('[HNT-GREP] injection rejected, skipped: ' + e.message.slice(0, 120)); }
    } else { console.warn('[HNT-GREP] Q guard tail not found, skipped'); }
  }
}

fs.writeFileSync(finalBundlePath, _fixedBundle);
// Also write with correct r2 name
// 2026-09-17 (operator: "a lot of duplicate files... worse I run a stale build"):
// the builder used to ALSO write O8.12-r2-Final-bundle.js with identical bytes, which
// is how a 1,873,274 B near-miss of the real 1,873,322 B bundle ended up sitting next to
// it. Nothing reads that name. SHA256SUMS.txt is the authoritative set; one name only.
// Same cleanup was done for O8.12-r3 ("keep only O8.6-Final-final-bundle.js").
console.log(`[Single-name] bundle written once: ${finalBundlePath}`);

let bundleObfResultFixed = _fixedBundle;
console.log(`[Final Bundle] Written to ${finalBundlePath} (${(bundleObfResult.length / 1024).toFixed(1)} KB in ${((Date.now() - t0)/1000).toFixed(1)}s)`);
// 3b. O8.9 G8 pins: slice shipped probe texts (string-aware), hash, append setter.
// Pins cover the probes only (never themselves); lexSetPins triggers the real verify.
{
  const bundleSrc = fs.readFileSync(finalBundlePath, 'utf8');
  const fnv = (s) => { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); };
  const sliceFn = (name, constId) => {
    // JSO stringArray encodes the globalThis[..] property names, so anchor on the
    // probe's unique arithmetic const (numbersToExpressions is off in all passes),
    // then back up to the nearest preceding 'function' (probe bodies nest none).
    if (bundleSrc.split(constId).length - 1 !== 1) throw new Error('G8 probe const not unique: ' + name);
    const cpos = bundleSrc.indexOf(constId);
    const a = bundleSrc.lastIndexOf('function', cpos);
    if (a < 0) throw new Error('G8 probe missing: ' + name);
    let i = bundleSrc.indexOf('{', a), d = 0, q = null;
    for (; i < bundleSrc.length; i++) {
      const c = bundleSrc[i];
      if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
      if (c === '"' || c === "'" || c === '`') { q = c; continue; }
      if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return bundleSrc.slice(a, i + 1); }
    }
    throw new Error('G8 probe unterminated: ' + name);
  };
  const probes = [['lexProbeA', '0x51ab3c09'], ['lexProbeU', '0x6f2c9d4e'], ['lexProbeX', '0x1b3c51ab']];
  const pins = probes.map(([n, c]) => { const body = sliceFn(n, c); if (!body.includes(c)) throw new Error('G8 probe mangled beyond recognition: ' + n); return fnv(body); });
  if (new Set(pins).size !== 3) throw new Error('G8 pins degenerate');
  fs.writeFileSync(finalBundlePath, bundleSrc + ';lexSetPins(' + JSON.stringify(pins) + ');');
  console.log('[G8] pins appended:', pins.join(','));
}


// 4. Transport Compression
const gzipBuffer = zlib.gzipSync(Buffer.from(bundleObfResultFixed || bundleObfResult, "utf8"), { level: 9 });
const deflateRawBuffer = zlib.deflateRawSync(Buffer.from(bundleObfResultFixed || bundleObfResult, "utf8"), { level: 9 });
const gzipB64 = gzipBuffer.toString("base64");
const deflateRawB64 = deflateRawBuffer.toString("base64");

console.log(`[Compressed] Gzip: ${(gzipB64.length / 1024).toFixed(1)} KB base64 | DeflateRaw: ${(deflateRawB64.length / 1024).toFixed(1)} KB base64`);

// 5. Build Outer Runners with 5k Dictionary 3


function buildRunner(b64, format) {
  const innerLoader = `(async () => {
  const _b = "${b64}";
  const _u = Uint8Array.from(atob(_b), c => c.charCodeAt(0));
  const _d = new DecompressionStream("${format}");
  const _w = _d.writable.getWriter();
  _w.write(_u);
  _w.close();
  const _r = _d.readable.getReader();
  const _c = [];
  while (true) {
    const { done, value } = await _r.read();
    if (done) break;
    _c.push(value);
  }
  let _l = 0;
  for (const x of _c) _l += x.length;
  const _a = new Uint8Array(_l);
  let _p = 0;
  for (const x of _c) { _a.set(x, _p); _p += x.length; }
  let _s = new TextDecoder().decode(_a);
  if (typeof 会員 !== "undefined") {
    _s = _s.replace(/会員\\s*=\\s*(0x2|2|1|0)/, "会員=" + 会員);
  }
  if (typeof 名 !== "undefined" && 名 !== "佐藤 結衣") {
    _s = _s.replace("佐藤 結衣", 名);
  }
  (0, eval)(_s);
})();`;

  const obfLoader = JS.obfuscate(innerLoader, {
    compact: true,
    simplify: true,
    selfDefending: false,
    debugProtection: false,
    disableConsoleOutput: false,
    renameGlobals: false,
    renameProperties: false,
    transformObjectKeys: true,
    identifierNamesGenerator: "dictionary",
    identifiersDictionary: DICT_5K_RUNNER,
    identifiersPrefix: "google",
    seed: SEED("s4-runner"),
    reservedNames: ["^会員$", "^名$"],
    reservedStrings: ["佐藤 結衣", format],
    stringArray: false,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    numbersToExpressions: false
  }).getObfuscatedCode();

  return `var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); ` + obfLoader;
}

const gzipRunner = buildRunner(gzipB64, "gzip");
const deflateRawRunner = buildRunner(deflateRawB64, "deflate-raw");

fs.writeFileSync(path.join(PKG_DIR, "O8.6-Final-compressed-gzip.js"), gzipRunner);
fs.writeFileSync(path.join(PKG_DIR, "O8.6-Final-compressed-deflateraw.js"), deflateRawRunner);
// O8.12-r2-Final-gzip.js / -deflateraw.js were byte-identical copies of the two lines above
// (md5 85b2ce40 / 2a1f8dd3). Deleted 2026-09-17; SHA256SUMS.txt names the only canonical files.

console.log(`[Deliverable] O8.6-Final-compressed-gzip.js: ${(gzipRunner.length / 1024).toFixed(1)} KB`);
console.log(`[Deliverable] O8.6-Final-compressed-deflateraw.js: ${(deflateRawRunner.length / 1024).toFixed(1)} KB`);

// 6. Update SHA256SUMS.txt
const crypto = require("crypto");
const files = [
  "O8.6-Final-compressed-gzip.js",
  "O8.6-Final-compressed-deflateraw.js",
  "O8.6-Final-final-bundle.js"
];
const sums = [];
for (const f of files) {
  const buf = fs.readFileSync(path.join(PKG_DIR, f));
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  sums.push(`${hash}  ${f}`);
  console.log(`SHA256 (${f}): ${hash}`);
}
fs.writeFileSync(path.join(PKG_DIR, "SHA256SUMS.txt"), sums.join("\n") + "\n");
console.log("=== Build Finished Successfully ===");
