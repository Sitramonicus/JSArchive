// run-jso.js — one uniform javascript-obfuscator pass over the WHOLE stitched body.
// Invariants carried from OBFUSCATION_SETTINGS.md: renameGlobals off, renameProperties
// off, disableConsoleOutput off, selfDefending off, debugProtection off,
// transformObjectKeys off, unicodeEscapeSequence off, no nested passes, fixed seed.
'use strict';
const fs = require('fs');
const JO = require('/home/user/o8cmp/seamless/jso/node_modules/javascript-obfuscator');

const src = fs.readFileSync('/home/user/o8cmp/seamless/body.js', 'utf8');
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
  controlFlowFlattening: false,
  deadCodeInjection: false,
  sourceMap: false,
});
const ms = Date.now() - t0;
const out = 'console.clear();\n' + res.getObfuscatedCode();
fs.writeFileSync('/home/user/o8cmp/seamless/out-jso.js', out);
console.log(`jso done in ${ms} ms, output ${out.length} B`);
