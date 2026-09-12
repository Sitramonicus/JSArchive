// obf-v1-s3matrix.js — VARIANT 1: javascript-obfuscator per-piece with user overrides:
// - identifiersPrefix: 'google' (all shards)
// - transformObjectKeys: true (all shards)
// - Increased stringArrayWrappersCount (a:5, m:8, n1:8, e:15, n2:8)
// - dictionary applied via npm identifiersDictionary array from identifiers-dictionary-jso.csv
//
// Input : /home/user/o8cmp/O8.6/shards-scrub5/shard-{a,m,n1,e,n2,aux}.js
// Output: /home/user/o8cmp/O8.6/oto/v1-jso-s3matrix/shard-<tag>-out.js
'use strict';
const fs = require('fs');
const path = require('path');
const JS = require('/home/user/o8cmp/seamless/jso/node_modules/javascript-obfuscator');

const SRC = '/home/user/o8cmp/O8.6/shards-scrub5';
const OUT = '/home/user/o8cmp/O8.6/oto/v1-jso-s3matrix';
const DICT = fs.readFileSync('/home/user/o8cmp/O8.6/oto/identifiers-dictionary-jso.csv', 'utf8')
  .split(',').map(s => s.trim()).filter(Boolean);

const BASE = {
  compact: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,
  renameProperties: false,
  reservedNames: ["^会員$"],
  transformObjectKeys: true,       // OVERRIDE: Enabled
  unicodeEscapeSequence: false,
  simplify: true,
  identifiersPrefix: 'google',     // OVERRIDE: 'google'
};

const PIECES = {
  a: {
    identifierNamesGenerator: 'mangled-shuffled',
    seed: '1f7a2c0e',
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
    seed: '9c4b7d3a',
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
    identifiersDictionary: DICT, seed: 'e5d2b8f1',
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
    identifiersDictionary: DICT, seed: '2de579ef',
    stringArray: true, stringArrayThreshold: 1.0,
    rotateStringArray: true, shuffleStringArray: true,
    stringArrayEncoding: ['rc4'], stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'function', stringArrayWrappersCount: 15, // INCREASED: 15 (was 12)
    stringArrayWrappersParametersCount: 2, stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true, deadCodeInjectionThreshold: 0.12,
    splitStrings: false, numbersToExpressions: false,
  },
  n2: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: DICT, seed: '6b3a9f14',
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
    seed: 'c8f4a25d',
    stringArray: false,
    controlFlowFlattening: false, deadCodeInjection: false,
    splitStrings: true, splitStringsChunkLength: 5, numbersToExpressions: true,
  },
};

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
