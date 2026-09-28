#!/usr/bin/env node
// explain.mjs — why is fine_share what it is? Prints the composition of the worst 10 % window:
// which origin buckets fill it, the longest runs from the dominant bucket, and the pre-file
// master-body statement that owns each run. Usage: explain.mjs <map.json> <pre.js> <post.js>
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const [mapPath, prePath, postPath] = process.argv.slice(2);
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const pre = fs.readFileSync(prePath, 'utf8');
const post = fs.readFileSync(postPath, 'utf8');
const N = 23, preLen = map.src_len, postLen = post.length;
const bucket = (o) => Math.floor((o / preLen) * N);
const origin = new Int32Array(postLen).fill(-1);
for (const c of map.chunks) { if (c.o0 === null) continue; const n = Math.min(c.len, c.o1 - c.o0); for (let k = 0; k < n; k++) origin[c.out + k] = c.o0 + k; }

const win = Math.floor(postLen * 0.10), step = Math.max(500, Math.floor(postLen * 0.01));
let worst = 0, worstStart = 0;
const cnt = new Int32Array(N);
for (let start = 0; start + win <= postLen; start += step) {
  cnt.fill(0);
  for (let i = start; i < start + win; i++) { const o = origin[i]; if (o >= 0) cnt[bucket(o)]++; }
  let mx = 0; for (let b = 0; b < N; b++) if (cnt[b] > mx) mx = cnt[b];
  if (mx / win > worst) { worst = mx / win; worstStart = start; }
}
console.log(`post ${postLen} B · window ${win} B @${worstStart} · worst share ${worst.toFixed(3)}`);
cnt.fill(0);
for (let i = worstStart; i < worstStart + win; i++) { const o = origin[i]; if (o >= 0) cnt[bucket(o)]++; }
const ranked = [...cnt].map((v, b) => ({ b, v })).sort((a, z) => z.v - a.v);
console.log('bucket composition (top 6): ' + ranked.slice(0, 6).map((r) => `${r.b}:${r.v}`).join('  '));
const dom = ranked[0].b;

// runs from the dominant bucket inside the window
function runsOf(b) {
  const runs = [];
  let i = worstStart;
  while (i < worstStart + win) {
    const o = origin[i];
    if (o >= 0 && bucket(o) === b) {
      const o0 = o, start = i;
      while (i < worstStart + win && origin[i] >= 0 && bucket(origin[i]) === b) i++;
      runs.push({ out: start, len: i - start, o: o0 });
    } else i++;
  }
  return runs.sort((a, z) => z.len - a.len);
}
const runs = runsOf(dom);
console.log(`dominant bucket ${dom}: ${runs.length} run(s), top 12:`);
// pre-file AST: master body statements + literal spans
const ast = parser.parse(pre, { sourceType: 'script', allowReturnOutsideFunction: true });
function kids(n) { const out = []; for (const k of Object.keys(n)) { if (k === 'loc' || k === 'start' || k === 'end') continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) { if (c && typeof c.type === 'string') out.push(c); } } else if (v && typeof v.type === 'string') out.push(v); } return out; }
const isFn = (n) => n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression');
let master = null;
(function w(n) { if (isFn(n) && n.body && n.body.type === 'BlockStatement') { const s = n.body.end - n.body.start; if (!master || s > master.s) master = { s, b: n.body }; } for (const c of kids(n)) w(c); })(ast);
const stmts = master.b.body;
const owner = (o) => { for (const [k, s] of stmts.entries()) if (s.start <= o && o < s.end) return { k, s }; return null; };
const lit = [];  // literals >= 4 KB in pre
(function w(n) { if (n.type === 'ArrayExpression' || n.type === 'ObjectExpression' || n.type === 'StringLiteral') { if (n.end - n.start >= 4000) lit.push({ start: n.start, end: n.end, type: n.type }); } for (const c of kids(n)) w(c); })(ast);
for (const r of runs.slice(0, 12)) {
  const ow = owner(r.o);
  const l = lit.find((x) => x.start <= r.o && r.o < x.end);
  const head = pre.slice(r.o, r.o + 60).replace(/\n/g, ' ');
  console.log(`  ${String(r.len).padStart(7)} B  out@${r.out}  origin@${r.o}  stmt#${ow ? ow.k : '-'} ${ow ? ow.s.type : ''}` +
    `${l ? '  [inside ' + l.type + ' ' + (l.end - l.start) + ' B]' : ''}  ${JSON.stringify(head)}`);
}
for (const r2 of ranked.slice(1, 4)) {
  if (r2.v < 25000) continue;
  const rr = runsOf(r2.b);
  console.log(`bucket ${r2.b} (${r2.v} B): top runs — ` + rr.slice(0, 4).map((x) => {
    const ow = owner(x.o);
    return `${x.len} B @${x.o} stmt#${ow ? ow.k : '-'} ${JSON.stringify(pre.slice(x.o, x.o + 42).replace(/\n/g, ' '))}`;
  }).join(' | '));
}
// composition by placement kind (fixed / hoisted function / run statement) when the dump carries it
if (map.stmts) {
  // The dump carries statements of nested woven bodies too (a statement can contain others). Keep only the
  // OUTERMOST rows — leftmost, longest first — so every output byte is attributed exactly once.
  const rowsAll = map.stmts.slice().sort((a, b) => (a.out - b.out) || (b.len - a.len));
  const outermost = [];
  let cover = -1;
  for (const r of rowsAll) if (r.out >= cover) { outermost.push(r); cover = r.out + r.len; }
  const kinds = new Map();
  const inside = new Map();
  for (const r of outermost) {
    if (r.out + r.len <= worstStart || r.out >= worstStart + win) continue;
    const from = Math.max(r.out, worstStart), to = Math.min(r.out + r.len, worstStart + win);
    const e = kinds.get(r.kind) || { n: 0, bytes: 0, keys: new Map() };
    e.n++; e.bytes += to - from;
    if (r.key) e.keys.set(r.key, (e.keys.get(r.key) || 0) + (to - from));
    kinds.set(r.kind, e);
    const b = bucket(r.o0);
    inside.set(b, (inside.get(b) || 0) + (to - from));
  }
  for (const [k, e] of [...kinds.entries()].sort((a, z) => z[1].bytes - a[1].bytes)) {
    const top = [...e.keys.entries()].sort((a, z) => z[1] - a[1]).slice(0, 3).map(([kk, v]) => kk + ':' + v).join(' ');
    console.log(`placement ${k}: ${e.n} statement(s), ${e.bytes} B in the window${top ? '  (top: ' + top + ')' : ''}`);
  }
}
// biggest intact spans inside the window and overall
let intact = 0, cur = 0, at0 = 0;
for (let k = worstStart; k < worstStart + win; k++) {
  const o = origin[k];
  if (o >= 0 && k > worstStart && origin[k - 1] >= 0 && o === origin[k - 1] + 1) cur++;
  else { cur = o >= 0 ? 1 : 0; at0 = k; }
  if (cur > intact) intact = cur;
}
console.log(`largest intact (order-preserved) span inside the window: ${intact} B`);
