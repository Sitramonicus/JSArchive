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
const OUT = '/tmp/mound-rerun';
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

const PLAN = [
  { tag: 'e3', src: 'v5-terser/shard-e3-out.js',     dict: 2, vm: true  },
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
      fs.writeFileSync('/tmp/mound-rerun/e3-jsc-intermediate.js', code);
      const ctors = (code.match(/Function\(/g) || []).length;
      steps.push(`jsc-rgf ${(code.length / 1024).toFixed(1)}KB/${ctors}ctor`);
      if (ctors === 0) throw new Error(`${tag}: rgf produced no runtime-generated function`);
      steps.push(`${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    {
      const t0 = Date.now();
      code = JS.obfuscate(code, { ...LIGHT, identifiersPrefix: 'google' + String(tag).replace(/[^A-Za-z0-9]/g, ''), identifiersDictionary: dictFor(tag, dict), seed: SEED('mound-' + tag) }).getObfuscatedCode();
      steps.push(`jso-light ${(code.length / 1024).toFixed(1)}KB`);
      steps.push(`${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    const outPath = path.join(OUT, `shard-${tag}-out.js`);
    fs.writeFileSync(outPath, code);
    console.log(`shard-${tag}: ${(start / 1024).toFixed(1)}KB -> ${(code.length / 1024).toFixed(1)}KB  (x${(code.length / start).toFixed(2)})  [${steps.join(' | ')}]`);
  }
  console.log('mound-e done ->', OUT);
})().catch((e) => { console.error('mound-e FAILED:', e.message); process.exit(1); });
