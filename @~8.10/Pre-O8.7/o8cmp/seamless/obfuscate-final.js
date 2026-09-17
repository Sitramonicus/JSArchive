// obfuscate-final.js — LAST-MILE whole-file obfuscation for the O8.5 product.
// Verdict of the seamless trial (2026-09-09): javascript-obfuscator uniform pass
// over the entire stitched body, run ONCE per final instance after all feature
// work is done. Hides all six shard seams (single line, zero _0xmod markers).
//
// Determinism: fixed seed -> byte-identical output for the same input, so a
// canonical sha256 can be pinned per instance and the artifact re-verified.
//
// Usage:
//   node obfuscate-final.js [input.js] [output.js]
//   defaults: input  = clean stitched product (must be the LAST clean build,
//                      e.g. O8.5-Shard-N.js with console.clear() first line)
//             output = <input basename>-obf-final.js
//
// Requires: /home/user/o8cmp/seamless/jso/node_modules (javascript-obfuscator
// 5.6.0; reinstall with: cd /home/user/o8cmp/seamless/jso && npm install
// javascript-obfuscator@5.6.0 --no-audit --no-fund)
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const JO = require('/home/user/o8cmp/seamless/jso/node_modules/javascript-obfuscator');

const input = process.argv[2] || '/home/user/o8cmp/O8.5-Shard-3.js';
const output = process.argv[3] || input.replace(/\.js$/, '-obf-final.js');

const raw = fs.readFileSync(input, 'utf8');

// console.clear() must stay the very first statement (wipes the pasted source) —
// obfuscate the body after it, then re-prepend it verbatim.
const lines = raw.split('\n');
let prefix = '';
let src = raw;
if (lines[0].trim() === 'console.clear();') {
  prefix = 'console.clear();\n';
  src = lines.slice(1).join('\n');
}

const t0 = Date.now();
const res = JO.obfuscate(src, {
  compact: true,
  target: 'browser',
  seed: 0x76da265c,
  identifierNamesGenerator: 'hexadecimal',
  identifiersPrefix: '',
  renameGlobals: false,
  renameProperties: false,
  renameLabels: false,
  disableConsoleOutput: false,
  selfDefending: false,
  debugProtection: false,
  debugProtectionInterval: 0,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  numbersToExpressions: false,
  simplify: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.9,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayIndexesType: ['hexadecimal-number'],
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersType: 'variable',
  splitStrings: false,          // source has template literals
  controlFlowFlattening: false, // standing invariant (async engine, signature)
  deadCodeInjection: false,
  sourceMap: false,
});
const ms = Date.now() - t0;
const out = prefix + res.getObfuscatedCode();
fs.writeFileSync(output, out);
execFileSync(process.execPath, ['--check', output]); // syntax gate
console.log(`OK  ${input} -> ${output}`);
console.log(`    ${out.length} B in ${ms} ms | sha256 ${require('crypto')
  .createHash('sha256').update(out).digest('hex')}`);
console.log(`    lines: ${out.split('\n').length - (prefix ? 1 : 0)} (body) | seam markers: 0`);
