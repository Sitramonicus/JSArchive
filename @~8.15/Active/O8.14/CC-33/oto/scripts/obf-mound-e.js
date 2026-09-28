// obf-mound-e.js — PLAN-H "mound" stage (operator-approved 2026-09-20).
//
// Every `e` piece already rides its own designated OTO (v1-jso / v7-swc / v5-terser / v4-closure).
// This stage adds a SECOND layer on top, so the three minifier pieces stop looking like torn-off
// fragments and carry the same kinds of protection as e1:
//
//   e2  v7-swc      -> javascript-obfuscator (dictionary, light profile)
//   e3  v5-terser   -> js-confuser (rgf = runtime-generated functions, the VM-ish layer)
//                   -> javascript-obfuscator (dictionary, light profile)
//   e4  v4-closure  -> javascript-obfuscator (dictionary, light profile)
//
// Measured context (E-PIECE-PROTECTION-REVIEW.md Part 2):
//   * LIGHT JSO on the three pieces  ~ x3 on source  (27-36 KB -> 86-105 KB)
//   * rgf-only on e3                 ~ x3.9          (25 KB -> ~99 KB)
//   * the bundle's final pass renames identifiers anyway, so the second dictionary buys volume,
//     a second string-array indirection and a second CFG layer — not a visible vocabulary.
//
// Distinct dictionary slices per piece (no reused terms between them), same noSupLead rule as the
// lanes. js-confuser is NOT seedable; the mound output is therefore pinned in S4 like the v2 lane.
'use strict';
const fs = require('fs');
const path = require('path');
const O86 = path.resolve(__dirname, '..', '..');
const REPO = path.resolve(__dirname, '..', '..', '..', '..', '..');
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  try { return require(name); } catch (e) { /* fall through */ }
  throw new Error(`Missing engine "${name}" — run: cd Active/engines && npm ci`);
}
const JS = needEngine('javascript-obfuscator');
const JSC = needEngine('js-confuser');
const { derive: SEED, deriveInt: SEEDINT } = require('./seed-lib.js');

const DICT_DIR = process.env.CC33_DICT_DIR || path.join(__dirname, '..');
const OUT = path.join(O86, 'oto', 'mound-e');
fs.mkdirSync(OUT, { recursive: true });

// ---- dictionary slices (same construction as the lanes: parallel thirds, own shuffle) ---------
const DICT_BAL = fs.readFileSync(path.join(DICT_DIR, 'identifiers-dictionary-5k.csv'), 'utf8')
  .split(',').map((x) => x.trim()).filter(Boolean)
  .filter((w) => { const c = w.codePointAt(0); return c < 0x10000 && c !== undefined; });   // noSupLead
const T = Math.floor(DICT_BAL.length / 3);
const SLICES = [DICT_BAL.slice(0, T), DICT_BAL.slice(T, 2 * T), DICT_BAL.slice(2 * T)];
function dictFor(tag, slice) {
  let s = SEEDINT('mound-' + tag) >>> 0;
  const rnd = () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const a = SLICES[slice % 3].slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

const BASE = {
  compact: true, selfDefending: false, debugProtection: false, disableConsoleOutput: false,
  renameGlobals: false, identifiersPrefix: '', transformObjectKeys: true, unicodeEscapeSequence: false,   // prefix applied per piece below (stitch collision fix 2026-09-20)
};
// LIGHT: enough to add a real second layer without turning a 27 KB piece into a 200 KB one.
const LIGHT = {
  ...BASE,
  identifierNamesGenerator: 'dictionary',
  stringArray: true, stringArrayThreshold: 0.75,
  rotateStringArray: true, shuffleStringArray: true,
  stringArrayEncoding: ['base64'], stringArrayIndexShift: true,
  stringArrayWrappersType: 'function', stringArrayWrappersCount: 3,
  controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.30,
  deadCodeInjection: false, splitStrings: false, numbersToExpressions: false,
};

// js-confuser options: same vocabulary as the shipped v2 lane (obf-v2-jsc.js) + rgf.
const JSC_COMMON = {
  target: 'browser', compact: true, minify: false, renameVariables: true, renameGlobals: false,
  stringConcealing: true, stringEncoding: false, stringSplitting: false, duplicateLiteralsRemoval: false,
  deadCode: 0, dispatcher: 0, opaquePredicates: false, controlFlowFlattening: 0, astScrambler: false,
  pack: false, globalConcealing: false, variableMasking: false, objectExtraction: false,
  movedDeclarations: false, flatten: false,
};

// Opaque per-piece namespace. Derived from the tag, but the tag is NOT recoverable from the name:
// naming pieces 'google<tag>' (2026-09-20 fix #1) stopped the helper collision but let anyone group
// the stitched output by piece and read the lane map off the helper names. Fixed salt => stable names
// across builds; bump OPAQUE_SALT to re-roll every helper name in the build.
const OPAQUE_SALT = 'cc33/o8.14/prefix/v1';
const PREFIX = (() => {
  const seen = new Map();
  return (tag) => {
    if (seen.has(tag)) return seen.get(tag);
    let h = 0x811c9dc5;
    const s = OPAQUE_SALT + '|' + String(tag);
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    const A = 'abcdefghijklmnopqrstuvwxyz';
    let out = 'g', x = h;
    for (let i = 0; i < 7; i++) { out += A[x % 26]; x = Math.floor(x / 26); }
    for (const [t, p] of seen) if (p === out) throw new Error(`prefix collision: ${tag} vs ${t}`);
    seen.set(tag, out);
    return out;
  };
})();

const PLAN = [
  { tag: 'e2', src: 'v7-swc/shard-e2-out.js',        dict: 1, vm: false },
  // e3's js-confuser rgf layer is OFF as of 2026-09-20. Live incident: the rgf step's output went
  // through our JSO-light pass and JSO renamed a `let` binding while leaving call sites in `catch`
  // blocks untouched -> `ReferenceError: EnFZv0 is not defined` in the client (jsc's own output
  // lints clean; the imbalance appears across the JSO stage). Re-land only when the dangling-ref
  // gate stays clean over repeated rolls (tools/dangling-refs.mjs is wired into the build).
  // LIVE-12 campaign 2026-09-21: re-land was ATTEMPTED and FAILED. 10 rolls, 0 green — every single
  // roll produced DANGLING-IN-CATCH names (2 on error paths per roll), i.e. the same defect class as
  // the live `EnFZv0` incident, with rgf demonstrably active (ctors >= 1 per roll). The condition in
  // MASTER-CHECKLIST (gate green over >= 10 consecutive rolls) is therefore NOT met and rgf stays off.
  // Evidence: Handoff/O8.14-LIVE12-CAMPAIGN-2026-09-21.md (10/10 rolls with the gate output).
  { tag: 'e3', src: 'v5-terser/shard-e3-out.js',     dict: 2, vm: false },
  { tag: 'e4', src: 'v4-closure/shard-e4-out.js',    dict: 0, vm: false },
];

(async () => {
  for (const { tag, src, dict, vm } of PLAN) {
    const inPath = path.join(O86, 'oto', src);
    let code = fs.readFileSync(inPath, 'utf8');
    const start = code.length;
    const steps = [];
    if (vm) {
      const t0 = Date.now();
      const r = await JSC.obfuscate(code, { ...JSC_COMMON, identifierGenerator: 'randomized', rgf: true });
      code = r.code;
      const ctors = (code.match(/Function\(/g) || []).length;
      steps.push(`jsc-rgf ${(code.length / 1024).toFixed(1)}KB/${ctors}ctor`);
      if (ctors === 0) throw new Error(`${tag}: rgf produced no runtime-generated function`);
      steps.push(`${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    {
      const t0 = Date.now();
      code = JS.obfuscate(code, { ...LIGHT, identifiersPrefix: PREFIX(tag), identifiersDictionary: dictFor(tag, dict), seed: SEED('mound-' + tag) }).getObfuscatedCode();
      steps.push(`jso-light ${(code.length / 1024).toFixed(1)}KB`);
      steps.push(`${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    const outPath = path.join(OUT, `shard-${tag}-out.js`);
    fs.writeFileSync(outPath, code);
    console.log(`shard-${tag}: ${(start / 1024).toFixed(1)}KB -> ${(code.length / 1024).toFixed(1)}KB  (x${(code.length / start).toFixed(2)})  [${steps.join(' | ')}]`);
  }
  console.log('mound-e done ->', OUT);
})().catch((e) => { console.error('mound-e FAILED:', e.message); process.exit(1); });
