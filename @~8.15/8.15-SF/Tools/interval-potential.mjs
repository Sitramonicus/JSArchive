#!/usr/bin/env node
// interval-potential.mjs — how much of the payload could legally be relocated, if a statement were allowed to
// move to any position where (a) nothing that reads what it writes runs in between and (b) nothing that writes
// what it reads runs in between? That is the complete safety condition for relocating a statement (the current
// purity gate is the special case where the statement reads nothing).
//
//   node tools/recon/interval-potential.mjs [pre.js]
//
// For every statement of the payload's master body it computes the legal interval [lo, hi] and reports the
// distribution of interval widths and the bytes that could move further than a given distance. This is a
// FEASIBILITY MEASUREMENT — it changes nothing; it says whether building the relaxed rule is worth it.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const srcPath = process.argv[2] || '/tmp/cc34-weave-in.js';
const src = fs.readFileSync(srcPath, 'utf8');
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
const isFn = (n) => n && ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(n.type);
const walk = (n, cb) => { cb(n); for (const k of Object.keys(n)) { if (['loc', 'start', 'end', 'leadingComments', 'trailingComments'].includes(k)) continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, cb); } else if (v && typeof v.type === 'string') walk(v, cb); } };

// the master body = the function body with the most statements
let big = null, bigN = 0;
walk(ast, (n) => { if (isFn(n) && n.body && n.body.type === 'BlockStatement' && n.body.body.length > bigN) { bigN = n.body.body.length; big = n.body; } });
let d = 0; while (d < big.body.length && big.body[d].type === 'ExpressionStatement' && big.body[d].directive) d++;
const region = big.body.filter((s, i) => i >= d && s.type !== 'EmptyStatement');
console.log(`${srcPath}: master body ${region.length} statements, ${(region.reduce((a, s) => a + (s.end - s.start), 0) / 1024).toFixed(0)} KB`);

// named functions, for the transitive sets
const namedFuncs = new Map();
walk(ast, (n) => {
  if (n.type === 'FunctionDeclaration' && n.id) namedFuncs.set(n.id.name, n);
  if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.type === 'FunctionExpression') namedFuncs.set(n.id.name, n.init);
});
const callsOf = (node) => { const out = new Set(); walk(node, (n) => { if (n.type === 'CallExpression' && n.callee.type === 'Identifier') out.add(n.callee.name); }); return out; };

// direct write set: member writes / pushes to a named root, plus assignments to bare identifiers
function writeSet(node) {
  const w = new Set();
  const visit = (n, parent) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'AssignmentExpression' && n.left) {
      const L = n.left;
      if (L.type === 'Identifier') w.add(L.name);
      else if (L.type === 'MemberExpression' && L.object.type === 'Identifier') w.add(L.object.name);
    }
    if (n.type === 'CallExpression' && n.callee.type === 'MemberExpression' && !n.callee.computed &&
        n.callee.property.type === 'Identifier' && (n.callee.property.name === 'push' || n.callee.property.name === 'unshift') &&
        n.callee.object.type === 'Identifier') w.add(n.callee.object.name);
    if (n.type === 'UpdateExpression' && n.argument.type === 'Identifier') w.add(n.argument.name);
    for (const k of Object.keys(n)) { if (['loc', 'start', 'end'].includes(k)) continue; const v = n[k]; if (Array.isArray(v)) for (const c of v) if (c && typeof c.type === 'string') visit(c, n); else if (v && typeof v.type === 'string') visit(v, n); }
  };
  visit(node, null);
  return w;
}
// direct read set: every identifier mention that is not a pure write target
function readSet(node) {
  const r = new Set();
  const isWriteTarget = (id) => false;   // conservative: count everything as a read, minus obvious write roots
  const visit = (n, parent, gp) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'Identifier') {
      const isTarget = parent && ((parent.type === 'MemberExpression' && parent.object === n && gp && ((gp.type === 'AssignmentExpression' && gp.left === parent) ||
        (gp.type === 'UnaryExpression' && gp.operator === 'delete'))) ||
        (parent.type === 'AssignmentExpression' && parent.left === n) ||
        (parent.type === 'MemberExpression' && parent.object === n && gp && gp.type === 'CallExpression' && gp.callee === parent));
      if (!isTarget) r.add(n.name);
      return;
    }
    for (const k of Object.keys(n)) { if (['loc', 'start', 'end'].includes(k)) continue; const v = n[k]; if (Array.isArray(v)) for (const c of v) if (c && typeof c.type === 'string') visit(c, n, parent); else if (v && typeof v.type === 'string') visit(v, n, parent); }
  };
  visit(node, null, null);
  return r;
}
// transitive closure over calls for both directions (fixpoint)
const directRead = new Map(), directWrite = new Map();
for (const [name, node] of namedFuncs) { directRead.set(name, readSet(node)); directWrite.set(name, writeSet(node)); }
function expand(set, table) {
  const out = new Set(set);
  let grew = true;
  while (grew) {
    grew = false;
    for (const n of [...out]) {
      if (!table.has(n)) continue;
      for (const m of table.get(n)) if (!out.has(m)) { out.add(m); grew = true; }
    }
  }
  return out;
}
function setsFor(stmt) {
  const R = expand(readSet(stmt), directRead);
  // a call to a named function also drags in that function's reads and writes
  let W = writeSet(stmt);
  const called = expand(callsOf(stmt), directWrite);
  for (const c of called) for (const w of (directWrite.get(c) || [])) W.add(w);
  return { R, W };
}

const rows = region.map((st, i) => ({ i, st, size: st.end - st.start }));
const R = new Array(rows.length), W = new Array(rows.length);
for (const r of rows) { const s = setsFor(r.st); R[r.i] = s.R; W[r.i] = s.W; }
const writesOf = (nm) => [], readsOf = (nm) => [];
// first/last index (gap space) of a statement that writes any name in `names`, and of one that reads any name
const hasWrite = (st, names) => { const w = writeSet(st); for (const n of names) if (w.has(n)) return true; const called = callsOf(st); for (const c of called) { const cw = directWrite.get(c); if (cw) for (const n of names) if (cw.has(n)) return true; } return false; };
const hasRead = (st, names) => { const r = readSet(st); for (const n of names) if (r.has(n)) return true; const called = callsOf(st); for (const c of called) { const cr = directRead.get(c); if (cr) for (const n of names) if (cr.has(n)) return true; } return false; };

let movableBytes = 0, wideBytes = 0, tight = 0;
const widths = [];
for (const r of rows) {
  const { R: rr, W: ww } = setsFor(r.st);
  const names = new Set([...rr, ...ww]);
  let lo = r.i, hi = r.i;
  for (let k = r.i - 1; k >= 0; k--) { const st = region[k]; if (hasRead(st, ww) || hasWrite(st, rr)) { lo = k + 1; break; } lo = k; }
  for (let k = r.i + 1; k < region.length; k++) { const st = region[k]; if (hasRead(st, ww) || hasWrite(st, rr)) { hi = k - 1; break; } hi = k; }
  const widthB = region.slice(Math.max(0, lo), Math.min(region.length, hi + 1)).reduce((a, s) => a + (s.end - s.start), 0);
  widths.push(widthB);
  if (widthB > 262144) wideBytes += r.size;                    // could move across > ~114 gap slots
  if (widthB >= r.size) movableBytes += r.size; else tight++;
}
widths.sort((a, b) => b - a);
const total = rows.reduce((a, r) => a + r.size, 0);
console.log(`statements: ${rows.length} · ${(total / 1024).toFixed(0)} KB`);
console.log(`median legal-interval width: ${(widths[Math.floor(widths.length / 2)] / 1024).toFixed(1)} KB · widest ${(widths[0] / 1024).toFixed(0)} KB`);
console.log(`bytes whose legal interval is wider than 256 KB (can be relocated across a whole bucket): ${(wideBytes / 1024).toFixed(0)} KB = ${(100 * wideBytes / total).toFixed(1)} %`);
console.log(`statements with no room at all (width 0): ${widths.filter((w) => w === 0).length}`);
const band = [0, 8192, 65536, 262144, Infinity];
for (let b = 0; b + 1 < band.length; b++) {
  const inside = rows.filter((r, i) => widths[i] > band[b] && widths[i] <= band[b + 1]);
  const bytes = inside.reduce((a, r) => a + r.size, 0);
  console.log(`   interval ${(band[b] / 1024).toFixed(0)}–${band[b + 1] === Infinity ? '∞' : (band[b + 1] / 1024).toFixed(0)} KB: ${inside.length} stmts, ${(bytes / 1024).toFixed(0)} KB (${(100 * bytes / total).toFixed(1)} %)`);
}
