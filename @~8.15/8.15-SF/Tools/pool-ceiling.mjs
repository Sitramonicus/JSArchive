// ceil1.mjs — metric-only ceiling for "extract literal tables out of their bodies, split into small
// pool chunks, and scatter them evenly through the output". Builds a synthetic origin array (fixed
// bytes keep their shipped order; relocatable literal bytes are re-placed evenly round-robin by bucket)
// and reports the honest share/run the same way fine.mjs does.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const mode = process.argv[2];                       // arrays4k | all1k
const MIN = mode === 'arrays4k' ? 4000 : 1000;   // 'tables' = literals >=1000 + every push statement span
const pre = fs.readFileSync('/tmp/deep/preweave.js', 'utf8');
const map = JSON.parse(fs.readFileSync('/tmp/deep/l1.map.json', 'utf8'));
const post = fs.readFileSync('/tmp/deep/l1.js', 'utf8');
const N = 23, preLen = map.src_len, postLen = post.length, bs = Math.floor(preLen / N);
const bucket = (o) => Math.floor((o / preLen) * N);
const origin = new Int32Array(postLen).fill(-1);
for (const c of map.chunks) { if (c.o0 === null) continue; const n = Math.min(c.len, c.o1 - c.o0); for (let k = 0; k < n; k++) origin[c.out + k] = c.o0 + k; }
// literal spans
const ast = parser.parse(pre, { sourceType: 'script', allowReturnOutsideFunction: true });
function kids(n) { const out = []; for (const k of Object.keys(n)) { if (k === 'loc' || k === 'start' || k === 'end') continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) { if (c && typeof c.type === 'string') out.push(c); } } else if (v && typeof v.type === 'string') { out.push(v); } } return out; }
const spans = [];
const isPushStmt = (n) => n.type === 'ExpressionStatement' && n.expression.type === 'CallExpression' &&
  n.expression.callee.type === 'MemberExpression' && !n.expression.callee.computed &&
  n.expression.callee.property.type === 'Identifier' && n.expression.callee.property.name === 'push';
const TABLES = mode === 'tables';
(function w(n) {
  const t = n.type;
  if (t === 'ArrayExpression' || t === 'ObjectExpression' || t === 'StringLiteral') {
    const s = n.end - n.start;
    if (s >= MIN && !(t === 'StringLiteral' && mode !== 'all1k')) spans.push([n.start, n.end]);
  }
  if (TABLES && isPushStmt(n)) spans.push([n.start, n.end]);
  for (const c of kids(n)) { w(c); }
})(ast);
spans.sort((a, b) => a[0] - b[0]);
const relo = new Uint8Array(preLen);
let reloBytes = 0;
for (const [a, b] of spans) { for (let i = a; i < b; i++) { if (!relo[i]) { relo[i] = 1; reloBytes++; } } }
// chunks of <=4KB
const CH = 4096;
const chunks = [];
for (const [a, b] of spans) { for (let i = a; i < b; i += CH) { const j = Math.min(i + CH, b); chunks.push([i, j]); } }
// round-robin by bucket so consecutive inserts mix buckets: chunk #k of bucket 0, then #k of bucket 1...
const per = new Map();
for (const c of chunks) { const b = bucket(c[0]); if (!per.has(b)) per.set(b, []); per.get(b).push(c); }
const seqs = [];
for (const [b, list] of per) { list.sort((x, y) => x[0] - y[0]); list.forEach((c, i) => seqs.push({ c, k: i, b })); }
seqs.sort((x, y) => (x.k - y.k) || (x.b - y.b));
chunks.length = 0; for (const s2 of seqs) chunks.push(s2.c);
// fixed stream (bucket ids) and pool bytes
const fixed = [];
for (let i = 0; i < postLen; i++) { const o = origin[i]; if (o < 0) { fixed.push(-1); continue; } if (!relo[o]) fixed.push(o); }
let pool = 0; for (const [a, b] of chunks) pool += b - a;
const total = fixed.length + pool;
// insert chunks evenly: slot every floor(total/chunks.length) bytes of the fixed stream
const step = Math.max(1, Math.floor(fixed.length / chunks.length));
const out = [];
let ci = 0, next = step;
for (let i = 0; i < fixed.length; i++) {
  while (ci < chunks.length && i >= next) { const [a, b] = chunks[ci++]; for (let k = a; k < b; k++) out.push(k); next += step; }
  out.push(fixed[i]);
}
while (ci < chunks.length) { const [a, b] = chunks[ci++]; for (let k = a; k < b; k++) out.push(k); }
// metric
const L = out.length;
let best = 0, cur = 0, curB = -2;
for (let i = 0; i < L; i++) { const o = out[i]; const b = o < 0 ? -1 : bucket(o); if (b !== curB) { if (cur > best) best = cur; curB = b; cur = 0; } if (b >= 0) cur++; }
if (cur > best) best = cur;
const win = Math.floor(L * 0.10), st = Math.max(500, Math.floor(L * 0.01));
let worst = 0, worstAt = 0;
const cnt = new Int32Array(N);
for (let s = 0; s + win <= L; s += st) {
  cnt.fill(0);
  for (let i = s; i < s + win; i++) { const o = out[i]; if (o >= 0) cnt[bucket(o)]++; }
  let mx = 0; for (let b = 0; b < N; b++) { if (cnt[b] > mx) mx = cnt[b]; }
  if (mx / win > worst) { worst = mx / win; worstAt = s; }
}
// worst window composition: dominant bucket + how much of it came from the pool vs fixed
cnt.fill(0); let poolInWin = 0, fixedInWin = 0;
for (let i = worstAt; i < worstAt + win; i++) { const o = out[i]; if (o < 0) continue; cnt[bucket(o)]++; if (relo[o]) poolInWin++; else fixedInWin++; }
let mb = 0; for (let b = 0; b < N; b++) { if (cnt[b] > cnt[mb]) mb = b; }
console.log(JSON.stringify({ mode: mode, relocatable_spans: spans.length, relocatable_bytes: reloBytes, chunks: chunks.length, total_out: L, fine_run: best, fine_share: +worst.toFixed(3), worst_at: worstAt, dominant_bucket: mb, dominant_bytes: cnt[mb], win_pool_bytes: poolInWin, win_fixed_bytes: fixedInWin }, null, 1));
