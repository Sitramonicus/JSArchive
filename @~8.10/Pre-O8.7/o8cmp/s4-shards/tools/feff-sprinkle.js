#!/usr/bin/env node
// feff-sprinkle.js — B3 post-OTO micro-pass: insert U+FEFF (BOM char, valid JS
// WhiteSpace between tokens) at random token boundaries in an OBFUSCATED
// single-line JS file. Cosmetic scanner-noise only; no semantic effect.
//
// POST-OTO BY DESIGN: obfuscators/minifiers strip whitespace; sprinkle after the
// obfuscator pass. Token-boundary-only insertions (never inside identifiers,
// numbers, or strings) so syntax stays valid.
//
// Usage:
//   NODE_PATH=/home/user/o8cmp/seamless/jsc/node_modules \
//     node tools/feff-sprinkle.js <obfuscated.js> [out.js] [count] [seed]
//   (default count = 1 FEFF per ~140 chars, seed 0xB3)
'use strict';
const fs = require('fs');

const input = process.argv[2];
if (!input) { console.error('usage: feff-sprinkle.js <input.js> [out.js] [count] [seed]'); process.exit(1); }
const output = process.argv[3] || input.replace(/\.js$/, '.feff.js');
const count = Number(process.argv[4] || 0) || 0;
const seed = Number(process.argv[5] || 0xB3) >>> 0;

function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(seed);

const src = fs.readFileSync(input, 'utf8');
const FEFF = '\uFEFF';

// candidate positions = between two chars that are both token-safe:
//   left  ends a token: [A-Za-z0-9_$)\]"'`]  (identifiers/numbers/closers/strings)
//   right starts a token: [A-Za-z0-9_$("'`]  (but not continuing an identifier)
// We refine: only insert where left is one of [) ] } " ' ` 0-9 A-Za-z_$] and right
// is one of [( " ' ` 0-9 A-Za-z_$], and NOT both identifier chars (no id split).
function isIdChar(c) { return /[A-Za-z0-9_$]/.test(c); }

const candidates = [];
for (let i = 1; i < src.length; i++) {
  const L = src[i - 1], R = src[i];
  // must be at a real boundary (not inside an identifier)
  if (isIdChar(L) && isIdChar(R)) continue;
  if (isIdChar(L) && /[0-9a-fA-Fx]/.test(R) && /0x/.test(L + R)) continue;
  const lOk = /[A-Za-z0-9_$)\]}"'`]/.test(L);
  const rOk = /[A-Za-z0-9_$("'`]/.test(R);
  if (lOk && rOk) candidates.push(i);
}

const want = count > 0 ? Math.min(count, candidates.length)
  : Math.max(1, Math.floor(src.length / 140));
// seeded sample without replacement
const chosen = new Set();
while (chosen.size < want && chosen.size < candidates.length) {
  chosen.add(candidates[Math.floor(rand() * candidates.length)]);
}
const positions = [...chosen].sort((a, b) => a - b);
let out = '';
let last = 0;
for (const pos of positions) { out += src.slice(last, pos) + FEFF; last = pos; }
out += src.slice(last);

fs.writeFileSync(output, out);
console.log(`feff-sprinkle: ${positions.length} FEFF inserted (of ${candidates.length} safe boundaries) -> ${output}`);
console.log(`output FEFF count: ${(out.match(/\uFEFF/g) || []).length}`);
