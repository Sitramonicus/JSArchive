// obf-v3-jso-lite.js — VARIANT 3: javascript-obfuscator uniform-LITE pass per
// piece. Deliberately the SAME settings on every piece except seeds (contrast to
// V1's differentiation): moderate string array (base64), modest wrappers, NO
// CFF / dead code / dictionary. Smallest outputs; for size-constrained builds or
// as a second fingerprint family. Respects all standing invariants.
//
// Input : /home/user/o8cmp/s4-shards/shards/shard-{a,m,n1,e,n2,aux}.js
// Output: /home/user/o8cmp/s4-oto/v3-jso-lite/shard-<tag>-out.js
'use strict';
const fs = require('fs');
const path = require('path');
const JS = require('/home/user/o8cmp/seamless/jso/node_modules/javascript-obfuscator');

const SRC = '/home/user/o8cmp/s4-shards/shards';
const OUT = '/home/user/o8cmp/s4-oto/v3-jso-lite';
const SEEDS = { a: 'aa01b2c3', m: 'bb02c3d4', n1: 'cc03d4e5', e: 'dd04e5f6', n2: 'ee05f607', aux: 'ff06a718' };

const CFG = {
  compact: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,
  renameProperties: false,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  simplify: true,
  identifierNamesGenerator: 'hexadecimal',
  identifiersPrefix: '',
  stringArray: true,
  stringArrayThreshold: 0.8,
  rotateStringArray: true,
  shuffleStringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayIndexesType: ['hexadecimal-number'],
  stringArrayCallsTransform: true,
  stringArrayWrappersType: 'variable',
  stringArrayWrappersCount: 4,
  stringArrayWrappersParametersCount: 2,
  stringArrayWrappersChainedCalls: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  splitStrings: false,
  numbersToExpressions: false,
};

fs.mkdirSync(OUT, { recursive: true });
for (const tag of Object.keys(SEEDS)) {
  const src = fs.readFileSync(path.join(SRC, `shard-${tag}.js`), 'utf8');
  const t0 = Date.now();
  const out = JS.obfuscate(src, { ...CFG, seed: SEEDS[tag] }).getObfuscatedCode();
  fs.writeFileSync(path.join(OUT, `shard-${tag}-out.js`), out);
  console.log(`shard-${tag}: ${(src.length / 1024).toFixed(1)}KB -> ${(out.length / 1024).toFixed(1)}KB  (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}
console.log('v3 done ->', OUT);
