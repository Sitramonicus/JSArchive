#!/usr/bin/env node
// sim.mjs — ceiling simulation: permute statements and measure, WITHOUT soundness analysis.
// Modes:
//   master : shuffle the statements of the biggest function body (the 101-statement master body)
//   all    : shuffle the top-level statements of EVERY function body with >=2 statements
// Emits (chunk list with original spans), writes a map, and prints intact-run / coarse / fine metrics.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const [mode, inPath, outPath, mapPath, seedArg] = process.argv.slice(2);
let seed = Number(seedArg || 12345) >>> 0;
const rnd = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const src = fs.readFileSync(inPath, 'utf8');
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
const isFn = (n) => n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression' || n.type === 'ObjectMethod' || n.type === 'ClassMethod');
const bodies = [];
(function walk(n) { if (!n || typeof n.type !== 'string') return; if (isFn(n) && n.body && n.body.type === 'BlockStatement') bodies.push(n.body); for (const k of Object.keys(n)) { if (k === 'loc' || k === 'start' || k === 'end') continue; const v = n[k]; if (Array.isArray(v)) for (const c of v) walk(c); else if (v && typeof v.type === 'string') walk(v); } })(ast);
let master = null;
for (const b of bodies) { const s = b.body.reduce((a, x) => a + (x.end - x.start), 0); if (!master || s > master.s) master = { s, b }; }
const plans = new Map();
function addPlan(body) {
  const stmts = body.body; let d = 0; while (d < stmts.length && stmts[d].type === 'ExpressionStatement' && stmts[d].directive) d++;
  const region = stmts.slice(d); if (region.length < 2) return;
  const order = region.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  plans.set(body, { d, region, order });
}
if (mode === 'master') addPlan(master.b);
if (mode === 'all') for (const b of bodies) addPlan(b);
const chunks = [];
const push = (text, o0 = null, o1 = null) => chunks.push({ text, o0, o1 });
const endCh = (t) => t[t.length - 1];
const sep = (prev) => (prev === null ? '' : (endCh(prev) === ';' ? '' : ';'));
const woven = [...plans.keys()];
function maximalInside(start, end, self) {
  return woven.filter((b) => b !== self && b.start >= start && b.end <= end &&
    !woven.some((c) => c !== b && c !== self && c.start >= start && c.end <= end && c.start <= b.start && c.end >= b.end && (c.start < b.start || c.end > b.end)));
}
function emitNode(node) { if (plans.has(node)) return emitBody(node); let cur = node.start; for (const b of maximalInside(node.start, node.end, node)) { if (b.start > cur) push(src.slice(cur, b.start), cur, b.start); emitBody(b); cur = b.end; } if (node.end > cur) push(src.slice(cur, node.end), cur, node.end); }
function emitBody(block) {
  const p = plans.get(block); const parts = []; push('{');
  for (let i = 0; i < p.d; i++) { const t = src.slice(block.body.body[i].start, block.body.body[i].end); push(t, block.body.body[i].start, block.body.body[i].end); parts.push(t); }
  for (const idx of p.order) {
    const st = p.region[idx]; const prev = parts.length ? parts[parts.length - 1] : null; const s = parts.length ? sep(prev) : '';
    if (s) push(s);
    const at = chunks.length; emitNode(st);
    let tail = ''; for (let k = at; k < chunks.length; k++) tail = chunks[k].text.slice(-1) || tail;
    parts.push(tail || 'x');
  }
  push('}');
}
{ let cur = 0; for (const b of maximalInside(0, src.length, null)) { const before = src.slice(cur, b.start); if (before) push(before, cur, b.start); emitBody(b); cur = b.end; } const tail = src.slice(cur); if (tail) push(tail, cur, src.length); }
const out = chunks.map((c) => c.text).join('');
fs.writeFileSync(outPath, out);
let p = 0; const rows = chunks.map((c) => { const r = { o0: c.o0, o1: c.o1, out: p, len: c.text.length }; p += c.text.length; return r; });
fs.writeFileSync(mapPath, JSON.stringify({ src_len: src.length, out_len: out.length, chunks: rows }));
// sanity: does the output re-parse?
let parses = true, msg = '';
try { parser.parse(out, { sourceType: 'script', allowReturnOutsideFunction: true }); } catch (e) { parses = false; msg = String(e.message).slice(0, 120); }
console.log(`mode=${mode} seed=${seed} bytes ${src.length} -> ${out.length} re-parses=${parses} ${msg}`);
console.log(`plans: ${plans.size} bodies`);
