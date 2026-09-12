// obf-u-canon.js — CANONICAL unlocker-shard obfuscation (the ONLY version of
// shard-u; user will not obfuscate this one).
// CRITICAL RULE (A3): stringArray OFF so the marker 佐藤 結衣 stays literal and
// searchable/replaceable in the obfuscated output. Hex naming keeps it reading as
// part of the membercount/hex cluster (m is hex). CFF/dead code OFF.
//
// Input : /home/user/o8cmp/O8.6/shards-scrub5/shard-u.js
// Output: /home/user/o8cmp/O8.6/oto/u/shard-u-out.js
'use strict';
const fs = require('fs');
const JS = require('/home/user/o8cmp/seamless/jso/node_modules/javascript-obfuscator');

const src = fs.readFileSync('/home/user/o8cmp/O8.6/shards-scrub5/shard-u.js', 'utf8');
let out = JS.obfuscate(src, {
  compact: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,
  renameProperties: false,
  transformObjectKeys: true,     // OVERRIDE: Enabled
  unicodeEscapeSequence: false,
  simplify: true,
  identifierNamesGenerator: 'hexadecimal',
  identifiersPrefix: 'google',   // OVERRIDE: 'google'
  seed: 'c8d4a17e',
  stringArray: false,            // A3: marker must stay searchable
  splitStrings: false,
  numbersToExpressions: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
}).getObfuscatedCode();

// A3/UX: restore the literal space inside the marker (the generator escapes it to
// \x20). Semantics identical; keeps the user's search->replace of 佐藤 結衣 working.
out = out.split('佐藤\\x20結衣').join('佐藤 結衣');
const p = '/home/user/o8cmp/O8.6/oto/u/shard-u-out.js';
fs.mkdirSync('/home/user/o8cmp/O8.6/oto/u', { recursive: true });
fs.writeFileSync(p, out);
console.log(`shard-u: ${(src.length / 1024).toFixed(1)}KB -> ${(out.length / 1024).toFixed(1)}KB`);
console.log('marker searchable (佐藤):', out.includes('佐藤'), '| (結衣):', out.includes('結衣'));
const termHits = ['GoogleUnlock', 'camo', 'decoy', 'Companion', 'Retention'].filter(t => out.includes(t));
console.log('conspicuous-term hits in output:', termHits.length ? termHits : 'none');
console.log('polynomial bridge synthesizer present:', out.includes('71, 111, 111, 103') || out.includes('String.fromCharCode'));
console.log('u done ->', p);
