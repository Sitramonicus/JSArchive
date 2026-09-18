// obf-v1-s3matrix.js — VARIANT 1: javascript-obfuscator per-piece with user overrides:
// - identifiersPrefix: 'google' (all shards)
// - transformObjectKeys: true (all shards)
// - Increased stringArrayWrappersCount (a:5, m:8, n1:8, e:15, n2:8)
// - dictionary applied via npm identifiersDictionary array — per-lane rotated slice of
//   identifiers-dictionary-5k.csv (was the 340-word -jso.csv; see DICT_SPLIT note below)
//
// Input : Active/O8.6/shards/shard-{a,m,n1,e,n2,aux}.js
// Output: Active/O8.6/oto/v1-jso-s3matrix/shard-<tag>-out.js
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const O86 = path.resolve(__dirname, '..', '..');
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  try { return require(name); } catch (e) { /* fall through */ }
  throw new Error(`Missing engine "${name}" — run: cd ${path.resolve(__dirname, '..', '..')} && npm install`);
}
const JS = needEngine('javascript-obfuscator');
const { derive: SEED, deriveInt: SEEDINT } = require('./seed-lib.js'); // O8.9 G1 + O8.11 S1

const SRC = path.join(O86, 'oto', 'g7-strings'); // O8.9 G7: consume pre-encoded shards
const OUT = path.join(O86, 'oto', 'v1-jso-s3matrix');
// ---------------------------------------------------------------------------------------------
// Identifier-safety filter (2026-09-17). A dictionary word may be used as an identifier NAME, and
// a name that begins on the supplementary plane (Gothic U+10330-1034F, and anything else above
// U+FFFF) is a surrogate pair. The S4 re-obfuscation renames references to such a function but can
// lose its declaration: measured on shard-p-teams-out.js, `𐌲𐌼278` had 1 declaration and 13 uses
// in the shard, and 0 declarations with 6 uses in the bundle — a ReferenceError at default
// execution (16-point Points 07/08/09). build-s4 already carries keyword-spacing fixups for the
// same surrogate class; this removes the cause instead of patching the symptom. Gothic stays in
// the dictionaries for STRING content (the operator's 20-script spec) — it just never leads a name.
const noSupLead = (arr) => arr.filter(w => {
  const c = w.codePointAt(0);
  return !(c >= 0x10000 && c <= 0x10FFFD);
});

const DICT_RAW = noSupLead(fs.readFileSync(path.join(O86, 'oto', 'identifiers-dictionary-jso.csv'), 'utf8')
  .split(',').map(s => s.trim()).filter(Boolean));
// S1 JSO-seed rotation (O8.11): shuffle dictionary order via SEED('jso') — determinism is seed-keyed, kills static skeleton (L2 pipeline ports)
const DICT = (() => { const a = DICT_RAW.slice(); let s = SEEDINT('jso') >>> 0; const rnd = () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; })();

// ---------------------------------------------------------------------------------------
// DICT_SPLIT (r3 avenue O) — WIRED 2026-09-17. This was defined in build-s4-final-package.js
// with the comment "per-shard uses DICT_SPLIT[tag%3]" and then never referenced: the lane loop
// lives here, not there, so the split never took effect. Meanwhile all eight dictionary-mode
// lanes (e, n1, n2 and the five pockets) shared identifiers-dictionary-jso.csv, which holds only
// 340 words. Each lane needs thousands of identifiers, so the pool was exhausted and the
// generator fell back to mangled names. Measured effect: the per-shard outputs contribute
// 72% of the bundle's scripted characters and were 3.51x skewed off an even script share
// (Cyrillic 18.5%, Full-Width 14.7%, Armenian 14.3%), while an isolated run of the S4 pass on
// the balanced 5k list measured 1.91x. Swapping the lanes onto per-lane rotated slices of the
// balanced 5k removes the exhaustion at source. jso is still read (kept for reference/rollback).
const DICT_BAL = noSupLead(fs.readFileSync(path.join(O86, 'oto', 'identifiers-dictionary-5k.csv'), 'utf8')
  .split(',').map(x => x.trim()).filter(Boolean));
// Proportional thirds, not the original hard-coded 780s: dict-augment.mjs grows the balanced
// list (Georgian / Katakana / the three unused homoglyphs), and fixed 780-word slices would have
// silently dropped everything appended past word 2340.
const _T = Math.floor(DICT_BAL.length / 3);
const DICT_SPLIT = [DICT_BAL.slice(0, _T), DICT_BAL.slice(_T, 2 * _T), DICT_BAL.slice(2 * _T)];
const LANE_ORDER = ['e', 'n1', 'n2', 'p-telegram', 'p-zoom', 'p-slack', 'p-teams', 'p-discord'];
const dictFor = (tag) => {
  const lane = LANE_ORDER.indexOf(tag);
  const base = DICT_SPLIT[lane < 0 ? 0 : lane % DICT_SPLIT.length];
  let s = SEEDINT('jso') >>> 0;
  const rnd = () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const a = base.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

const BASE = {
  compact: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,
  renameProperties: false,
  reservedNames: ["^会員$", "^lexMode$", "^lexProbeA$", "^lexProbeU$", "^lexProbeX$", "^lexSetPins$"], // O8.9 G8
  transformObjectKeys: true,       // OVERRIDE: Enabled
  unicodeEscapeSequence: false,
  simplify: true,
  identifiersPrefix: 'google',     // OVERRIDE: 'google'
};

const PIECES = {
  a: {
    identifierNamesGenerator: 'mangled-shuffled',
    seed: SEED('v1-a'),
    stringArray: true, stringArrayThreshold: 0.55,
    rotateStringArray: true, shuffleStringArray: true,
    stringArrayEncoding: ['base64'], stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'variable', stringArrayWrappersCount: 5,  // INCREASED: 5 (was 3)
    stringArrayWrappersParametersCount: 2, stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: false, deadCodeInjection: false,
    splitStrings: false, numbersToExpressions: false,
  },
  m: {
    identifierNamesGenerator: 'hexadecimal',
    seed: SEED('v1-m'),
    stringArray: true, stringArrayThreshold: 0.9,
    rotateStringArray: true, shuffleStringArray: false,
    stringArrayEncoding: ['base64'], stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'variable', stringArrayWrappersCount: 8,  // INCREASED: 8 (was 5)
    stringArrayWrappersParametersCount: 2, stringArrayWrappersChainedCalls: false,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.45,
    deadCodeInjection: false, splitStrings: false, numbersToExpressions: false,
  },
  n1: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: dictFor('n1'), seed: SEED('v1-n1'),
    stringArray: true, stringArrayThreshold: 0.75,
    rotateStringArray: true, shuffleStringArray: true,
    stringArrayEncoding: ['rc4'], stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'function', stringArrayWrappersCount: 8,  // INCREASED: 8 (was 5)
    stringArrayWrappersParametersCount: 3, stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.6,
    deadCodeInjection: true, deadCodeInjectionThreshold: 0.08,
    splitStrings: true, splitStringsChunkLength: 6, numbersToExpressions: false,
  },
  e: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: dictFor('e'), seed: SEED('v1-e'),
    stringArray: true, stringArrayThreshold: 1.0,
    rotateStringArray: true, shuffleStringArray: true,
    stringArrayEncoding: ['rc4'], stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'function', stringArrayWrappersCount: 8, // R2-STEGO-FIT2: 8 saves ~260KB
    stringArrayWrappersParametersCount: 2, stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.55,
    deadCodeInjection: true, deadCodeInjectionThreshold: 0.04,
    splitStrings: false, numbersToExpressions: false,
  },
  n2: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: dictFor('n2'), seed: SEED('v1-n2'),
    stringArray: true, stringArrayThreshold: 0.85,
    rotateStringArray: true, shuffleStringArray: true,
    stringArrayEncoding: ['base64'], stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'variable', stringArrayWrappersCount: 8,  // INCREASED: 8 (was 6)
    stringArrayWrappersParametersCount: 2, stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,
    splitStrings: true, splitStringsChunkLength: 8, numbersToExpressions: false,
  },
  aux: {
    identifierNamesGenerator: 'mangled',
    seed: SEED('v1-aux'),
    stringArray: false,
    controlFlowFlattening: false, deadCodeInjection: false,
    splitStrings: true, splitStringsChunkLength: 5, numbersToExpressions: true,
  },
};

// ---- OTO-1 (was B1): raise the pockets into the string-hiding tier -------------------
// FaC-04 wants the pockets at or above `e`'s difficulty, with 1-2 mounded higher, and `e`
// still the one that cannot be decoded. The pockets used to sit on the STRUCTURAL engines
// (v4-closure / v6-esbuild / v8-uglify), which — per obf-minify-family.js's own honest tier
// note — "rename and reshape but do NOT hide strings". That left every pocket except zoom
// trivially greppable next to an rc4'd `e`, which is exactly the gateway FaC-04 forbids.
//
// All five now use `e`'s recipe (dictionary identifiers + rc4 string array + control-flow
// flattening + dead-code injection). Three sit just UNDER `e` on the two thresholds that
// drive analyst cost (CFF 0.40 vs 0.55, DCI 0.02 vs 0.04) so they read as slightly easier
// without being a stepping stone; discord and teams are mounded ABOVE `e` (CFF 0.75,
// DCI 0.12, 12 wrappers) because discord is the thinnest pocket and the one whose shape
// gives the venue away fastest. `e` itself is untouched and still the largest by 8x.
const POCKET_BASE = {
  identifierNamesGenerator: 'dictionary',
  stringArray: true, stringArrayThreshold: 1.0,
  rotateStringArray: true, shuffleStringArray: true,
  stringArrayEncoding: ['rc4'], stringArrayIndexShift: true,
  stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
  stringArrayCallsTransform: true,
  stringArrayWrappersType: 'function', stringArrayWrappersCount: 8,
  stringArrayWrappersParametersCount: 2, stringArrayWrappersChainedCalls: true,
  splitStrings: false, numbersToExpressions: false,
};
Object.assign(PIECES, {
  'p-telegram': { ...POCKET_BASE, identifiersDictionary: dictFor('p-telegram'), seed: SEED('v1-p-telegram'), controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.40, deadCodeInjection: true, deadCodeInjectionThreshold: 0.02 },
  'p-zoom':     { ...POCKET_BASE, identifiersDictionary: dictFor('p-zoom'), seed: SEED('v1-p-zoom'),     controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.40, deadCodeInjection: true, deadCodeInjectionThreshold: 0.02 },
  'p-slack':    { ...POCKET_BASE, identifiersDictionary: dictFor('p-slack'), seed: SEED('v1-p-slack'),    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.40, deadCodeInjection: true, deadCodeInjectionThreshold: 0.02 },
  // mounded above `e`
  'p-discord':  { ...POCKET_BASE, identifiersDictionary: dictFor('p-discord'), seed: SEED('v1-p-discord'), stringArrayWrappersCount: 12, controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.75, deadCodeInjection: true, deadCodeInjectionThreshold: 0.12 },
  'p-teams':    { ...POCKET_BASE, identifiersDictionary: dictFor('p-teams'), seed: SEED('v1-p-teams'),   stringArrayWrappersCount: 12, controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.75, deadCodeInjection: true, deadCodeInjectionThreshold: 0.12 },
});

fs.mkdirSync(OUT, { recursive: true });
for (const [tag, cfg] of Object.entries(PIECES)) {
  const src = fs.readFileSync(path.join(SRC, `shard-${tag}.js`), 'utf8');
  const opts = { ...BASE, ...cfg };
  const t0 = Date.now();
  const out = JS.obfuscate(src, opts).getObfuscatedCode();
  fs.writeFileSync(path.join(OUT, `shard-${tag}-out.js`), out);
  console.log(`shard-${tag}: ${(src.length / 1024).toFixed(1)}KB -> ${(out.length / 1024).toFixed(1)}KB  (${((Date.now() - t0) / 1000).toFixed(1)}s)  [${cfg.identifierNamesGenerator}]`);
}
console.log('v1 done ->', OUT);
