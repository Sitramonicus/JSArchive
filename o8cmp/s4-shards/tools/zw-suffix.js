#!/usr/bin/env node
// zw-suffix.js — B2 post-OTO micro-pass: append zero-width (ZWJ/ZWNJ) characters
// to a seeded subset of identifiers, making them display-identical but textually
// distinct. Cosmetic camouflage only (scanner/deobfuscator noise), NOT security.
//
// WHY POST-OTO: any rename-capable obfuscator (obfuscator.io, javascript-obfuscator,
// js-confuser) rewrites identifiers during its pass, so zero-width suffixes added
// to the CLEAN source would be wiped. Apply this to the OBFUSCATED output instead,
// per piece or on the final stitched artifact (single-line output is fine).
//
// SAFETY: uses scope-aware rename (all references updated together). Skips:
//   - bindings whose name already contains a zero-width char
//   - the shard contract param (_0xmod) and property keys (untouched by design)
//   - identifiers in string form are never touched (only real bindings)
// Run `node --check` + the battery on the result.
//
// Usage:
//   node tools/zw-suffix.js <input.js> [output.js] [seed]
//   (default output: <input>.zw.js ; default seed: 0x5EED)
//
// Requires @babel/* from the js-confuser install:
//   NODE_PATH=/home/user/o8cmp/seamless/jsc/node_modules node tools/zw-suffix.js ...
'use strict';
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const input = process.argv[2];
if (!input) { console.error('usage: zw-suffix.js <input.js> [output.js] [seed]'); process.exit(1); }
const output = process.argv[3] || input.replace(/\.js$/, '.zw.js');
const seed = Number(process.argv[4] || 0x5eed) >>> 0;

// mulberry32 seeded RNG
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
const ZW = ['\u200d', '\u200c']; // ZWJ / ZWNJ

const src = fs.readFileSync(input, 'utf8');
const ast = parser.parse(src, { sourceType: 'script' });

const zwSeen = new Set();
let chosen = 0;

// gather binding identifiers via scope
const programs = [];
traverse(ast, {
  Program(path) { programs.push(path); },
});

for (const prog of programs) {
  const scopes = [];
  (function collect(p) {
    scopes.push(p.scope);
    for (const c of p.get('body')) {
      if (c.isFunctionDeclaration() || c.isFunctionExpression() || c.isArrowFunctionExpression()) {
        try { collect(c); } catch (e) {}
      }
    }
  })(prog);
  // note: nested scopes are walked below via child traversal instead; this simple
  // walker handles Program + top-level fns; we ALSO do a full traverse for all scopes.
}

// Full scope walk is more reliable: rename via binding on each Identifier that is
// a binding identifier, but do it scope-by-scope using path.scope.bindings.
const renames = [];
traverse(ast, {
  Function(path) {
    const scope = path.scope;
    if (!scope || !scope.bindings) return;
    const names = Object.keys(scope.bindings);
    for (const name of names) {
      if (name.length < 2) continue;
      if (/[\u200d\u200c\u200b\u2060]/.test(name)) continue;
      if (name === '_0xmod' || name === 'Log' || name === 'MemberCount' || name.startsWith('_0xmod')) continue;
      if (rand() < 0.30) {
        // build suffix (1-3 zw chars), ensure unique
        let nName;
        do {
          const n = 1 + Math.floor(rand() * 3);
          let suf = '';
          for (let i = 0; i < n; i++) suf += ZW[Math.floor(rand() * ZW.length)];
          nName = name + suf;
        } while (zwSeen.has(nName));
        // rename only if binding belongs to a scope we can reach (not global-ish)
        if (scope.getBinding(name)) {
          zwSeen.add(nName);
          try { scope.rename(name, nName); chosen++; } catch (e) {}
        }
      }
    }
  },
});

const outCode = generate(ast, { jsescOption: { minimal: true }, compact: false }).code;
fs.writeFileSync(output, outCode);
console.log(`zw-suffix: renamed ${chosen} identifiers -> ${output}`);
console.log(`ZW chars in output: ${(outCode.match(/[\u200d\u200c]/g) || []).length}`);
