// Which pinned blocks hold fine_share? For each bucket: longest run of consecutive output bytes that are
// FIXED (non-literal) in the shipped L1 order, and the master-body statement that owns it.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
// usage: fixed-run-census.mjs [post.js] [map.json] [pre.js]   (defaults: the 2026-09-26 L1 line)
const post = fs.readFileSync(process.argv[2] || '/tmp/deep/l1.js', 'utf8');
const map = JSON.parse(fs.readFileSync(process.argv[3] || '/tmp/deep/l1.map.json', 'utf8'));
const pre = fs.readFileSync(process.argv[4] || '/tmp/deep/preweave.js', 'utf8');
const N = 23, preLen = map.src_len, postLen = post.length;
const bucket = (o) => Math.floor((o / preLen) * N);
const origin = new Int32Array(postLen).fill(-1);
for (const c of map.chunks) { if (c.o0 === null) continue; const n = Math.min(c.len, c.o1 - c.o0); for (let k = 0; k < n; k++) origin[c.out + k] = c.o0 + k; }
const ast = parser.parse(pre, { sourceType: 'script', allowReturnOutsideFunction: true });
function kids(n) { const out = []; for (const k of Object.keys(n)) { if (k === 'loc' || k === 'start' || k === 'end') continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) { if (c && typeof c.type === 'string') out.push(c); } } else if (v && typeof v.type === 'string') { out.push(v); } } return out; }
const relo = new Uint8Array(preLen);
(function w(n) {
  if (n.type === 'ArrayExpression' || n.type === 'ObjectExpression' || n.type === 'StringLiteral') { const s = n.end - n.start; if (s >= 4000) { for (let i = n.start; i < n.end; i++) relo[i] = 1; } }
  for (const c of kids(n)) { w(c); }
})(ast);
// master body
const isFn = (n) => n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression');
let master = null;
(function w(n) { if (isFn(n) && n.body && n.body.type === 'BlockStatement') { const s = n.body.end - n.body.start; if (!master || s > master.s) master = { s, b: n.body }; } for (const c of kids(n)) { w(c); } })(ast);
const stmts = master.b.body;
const owner = (o) => { for (const [i, s] of stmts.entries()) { if (s.start <= o && o < s.end) return { i, s }; } return null; };
// per bucket: longest consecutive output run of FIXED bytes of that bucket
const per = new Map();
let curB = -2, curLen = 0, curStart = 0, curFixed = 0;
for (let i = 0; i <= postLen; i++) {
  const o = i < postLen ? origin[i] : -1;
  const b = o < 0 ? -1 : bucket(o);
  const isFixed = o >= 0 && !relo[o];
  if (b === curB && isFixed && curFixed > 0 && o >= 0 && origin[i - 1] >= 0 && true) { curLen++; curFixed++; }
  else {
    if (curLen > 20000) { const rec = per.get(curB) || []; rec.push({ len: curLen, o0: origin[curStart] }); per.set(curB, rec); }
    curB = b; curLen = isFixed ? 1 : 0; curFixed = isFixed ? 1 : 0; curStart = i;
  }
}
const rows = [...per.entries()].flatMap(([b, list]) => list.map((r) => ({ b, ...r }))).sort((a, x) => x.len - a.len);
console.log('longest FIXED same-bucket runs (>20 KB):');
for (const r of rows.slice(0, 14)) {
  const own = owner(r.o0);
  const head = own ? JSON.stringify(pre.slice(own.s.start, own.s.start + 58)) : '?';
  console.log(' ', String(r.len).padStart(7), 'bucket', String(r.b).padStart(2), 'origin@' + r.o0, '| master stmt idx', own ? own.i : '-', own ? own.s.type : '', (own ? own.s.end - own.s.start : 0) + 'B', head);
}
// bucket totals
console.log('\nper-bucket totals (origin bytes) with fixed share:');
const tot = new Int32Array(N), fx = new Int32Array(N);
for (let i = 0; i < postLen; i++) { const o = origin[i]; if (o < 0) continue; tot[bucket(o)]++; if (!relo[o]) fx[bucket(o)]++; }
let line = '';
for (let b = 0; b < N; b++) { line += b + ':' + Math.round(fx[b] / 1024) + '/' + Math.round(tot[b] / 1024) + 'K  '; }
console.log(line);
