#!/usr/bin/env node
// obf-all.js — obfuscate the six O8.5-Shard-3 pieces with DELIBERATELY
// DIFFERENT per-piece settings. Reverse-engineering one shard must not
// transfer to the others: distinct naming schemes, encodings, wrapper
// machinery, seeds, and feature mixes per piece.
// Usage:
//   npm install javascript-obfuscator@5.6.0   (once, in this folder)
//   node obf-all.js
// Reads:  shards/shard-*.js  +  identifiers-dictionary.txt
// Writes: obf/shard-*-out.js   (then stitch: python3 stitch-o85.py ...)
'use strict';
const fs = require('fs');
const path = require('path');
const JS = require('javascript-obfuscator');

const ROOT = __dirname;
const DICT = fs.readFileSync(path.join(ROOT, 'identifiers-dictionary.txt'), 'utf8')
  .split(/\s+/).map(s => s.trim()).filter(Boolean);

// Hard invariants — identical on every shard, non-negotiable (see README):
const BASE = {
  compact: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,        // window.GoogleUnlock must survive
  renameProperties: false,     // _0xmod.{log,mc,lex} seam + real Discord field names
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  simplify: true,
};

const PIECES = {
  // ── a: foundation (gate/Log/unlock/suite banner) — small, looks "normal"
  a: {
    identifierNamesGenerator: 'mangled-shuffled',
    identifiersPrefix: '',
    seed: '1f7a2c0e',
    stringArray: true,
    stringArrayThreshold: 0.55,
    rotateStringArray: true,
    shuffleStringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'variable',
    stringArrayWrappersCount: 3,
    stringArrayWrappersParametersCount: 2,
    stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    splitStrings: false,        // has ${} templates
    numbersToExpressions: false,
  },
  // ── m: MemberCount + lexicon helper — USER: hexadecimal naming
  m: {
    identifierNamesGenerator: 'hexadecimal',
    identifiersPrefix: '',   // generator already emits _0x<hex>; doubling looks wrong
    seed: '9c4b7d3a',
    stringArray: true,
    stringArrayThreshold: 0.9,
    rotateStringArray: true,
    shuffleStringArray: false,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'variable',
    stringArrayWrappersCount: 5,
    stringArrayWrappersParametersCount: 2,
    stringArrayWrappersChainedCalls: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.45,
    deadCodeInjection: false,
    splitStrings: false,        // has ${} templates
    numbersToExpressions: false,
  },
  // ── n1: camo noise module — dictionary, rc4, split
  n1: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: DICT,
    identifiersPrefix: '',
    seed: 'e5d2b8f1',
    stringArray: true,
    stringArrayThreshold: 0.75,
    rotateStringArray: true,
    shuffleStringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'function',
    stringArrayWrappersCount: 5,
    stringArrayWrappersParametersCount: 3,
    stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.6,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.08,
    splitStrings: true,         // no templates here
    splitStringsChunkLength: 6,
    numbersToExpressions: false,
  },
  // ── e: ENGINE — the crown jewels: dictionary + rc4 @1.0 + max wrappers
  e: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: DICT,
    identifiersPrefix: '',
    seed: '2de579ef',
    stringArray: true,
    stringArrayThreshold: 1.0,
    rotateStringArray: true,
    shuffleStringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'function',
    stringArrayWrappersCount: 12,
    stringArrayWrappersParametersCount: 2,
    stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.12,
    splitStrings: false,        // has ${} templates — never split
    numbersToExpressions: false, // decode tables are int arrays — never explode
  },
  // ── n2: camo noise module — dictionary but base64/other seed so names differ
  n2: {
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: DICT,
    identifiersPrefix: '',
    seed: '6b3a9f14',
    stringArray: true,
    stringArrayThreshold: 0.85,
    rotateStringArray: true,
    shuffleStringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayIndexesType: ['hexadecimal-number', 'hexadecimal-numeric-string'],
    stringArrayCallsTransform: true,
    stringArrayWrappersType: 'variable',
    stringArrayWrappersCount: 6,
    stringArrayWrappersParametersCount: 2,
    stringArrayWrappersChainedCalls: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,
    splitStrings: true,         // no templates here
    splitStringsChunkLength: 8,
    numbersToExpressions: false,
  },
  // ── aux: decoy block — the "plain-looking" shard: mangled names, NO string
  //    array, no CFF; split + numbers explode instead. Deliberate contrast.
  aux: {
    identifierNamesGenerator: 'mangled',
    identifiersPrefix: '',
    seed: 'c8f4a25d',
    stringArray: false,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    splitStrings: true,         // no templates here
    splitStringsChunkLength: 5,
    numbersToExpressions: true,
  },
};

fs.mkdirSync(path.join(ROOT, 'obf'), { recursive: true });
for (const [tag, cfg] of Object.entries(PIECES)) {
  const src = fs.readFileSync(path.join(ROOT, 'shards', `shard-${tag}.js`), 'utf8');
  const opts = { ...BASE, ...cfg };
  const t0 = Date.now();
  const out = JS.obfuscate(src, opts).getObfuscatedCode();
  const outPath = path.join(ROOT, 'obf', `shard-${tag}-out.js`);
  fs.writeFileSync(outPath, out);
  console.log(`shard-${tag}: ${(src.length / 1024).toFixed(1)}KB -> ${(out.length / 1024).toFixed(1)}KB  (${((Date.now() - t0) / 1000).toFixed(1)}s)  [${cfg.identifierNamesGenerator}]`);
}
console.log('done -> obf/');
