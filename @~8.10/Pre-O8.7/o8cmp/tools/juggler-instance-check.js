#!/usr/bin/env node
/*
 * juggler-instance-check.js — verify a generated metamorphic instance.
 *
 * Extracts the decode region of a payload and runs it in a sandboxed VM,
 * then compares all 23 decoded constants against the plaintext manifest.
 *
 * USAGE: node juggler-instance-check.js <payload.js> [juggler-strings.json]
 * Exit 0 = all 23 match; exit 1 = any mismatch/error.
 */
'use strict';
const fs = require('fs');
const vm = require('vm');

const file = process.argv[2];
const manifestPath = process.argv[3] || 'juggler-strings.json';
if (!file) { console.error('usage: node juggler-instance-check.js <payload.js> [strings.json]'); process.exit(2); }

const src = fs.readFileSync(file, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const names = Object.keys(manifest);
if (names.length !== 23) { console.error('manifest names != 23'); process.exit(2); }

// --- cut the decode region (comment markers, or code anchors for comment-stripped files)
let ls = -1, le = -1;
const startMark = src.indexOf('// ── Juggler decode');
const endMark = startMark >= 0 ? src.indexOf('// ── end juggler decode ──', startMark) : -1;
if (startMark >= 0 && endMark >= 0) {
  ls = src.lastIndexOf('\n', startMark) + 1;
  le = src.lastIndexOf('\n', endMark);
} else {
  // comment-free artifact: region runs from the _0xJRe const line through the
  // single-line Juggler coverage diag call.
  const codeStart = src.indexOf('const _0xJRe = [');
  const cov = src.indexOf('Log.diag("Juggler coverage"');
  if (codeStart < 0 || cov < 0) { console.error('decode region anchors not found'); process.exit(2); }
  ls = src.lastIndexOf('\n', codeStart) + 1;
  le = src.indexOf('\n', cov);
  if (le < 0) le = src.length;
}
const region = src.slice(ls, le);

const logStub = 'const Log = { say: () => {}, diag: () => {}, warn: () => {}, info: () => {} };\n';
const context = vm.createContext({});
vm.runInContext(logStub + region, context, { filename: 'region.js' });

const dump = vm.runInContext('JSON.stringify({' + names.join(',') + '})', context);
const got = JSON.parse(dump);

let fail = 0;
for (const n of names) {
  const ok = got[n] === manifest[n];
  if (!ok) { fail++; console.log(`FAIL ${n}: got ${JSON.stringify(got[n])} want ${JSON.stringify(manifest[n])}`); }
}
if (fail) { console.error(`PARITY FAIL: ${fail}/${names.length} mismatched`); process.exit(1); }
console.log(`PARITY OK: ${names.length}/23 decoded constants identical to manifest`);
