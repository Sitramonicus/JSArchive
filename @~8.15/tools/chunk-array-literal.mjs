#!/usr/bin/env node
/**
 * chunk-array-literal.mjs — PLAN-H transform for the `e-str` string table (2026-09-20).
 *
 * shard-e-str.js is 46,729 B of which ONE statement is 44,994 B, holding a single 44,850 B array
 * literal (the string table) that `["…"].join("")` feeds to the Uint16Array decoder. Statement
 * splitting cannot get at it, so it needs its own transform:
 *
 *   const _0xeb = (s => { … })(([ "a", "b", … "z" ].join("")));
 *          becomes
 *   const _0xeb_c0 = [ "a", … ];            // four plain statements, split only at element
 *   const _0xeb_c1 = [ … ];                 // boundaries (semantics are untouched: concat of
 *   const _0xeb_c2 = [ … ];                 // arrays, then the same .join(""))
 *   const _0xeb_c3 = [ … ];
 *   const _0xeb = (s => { … })(( [].concat(_0xeb_c0, _0xeb_c1, _0xeb_c2, _0xeb_c3).join("")));
 *
 * After this the shard is a normal flat statement list again and tools/split-flat.mjs can split it.
 *
 * Usage: node tools/chunk-array-literal.mjs --in <shard.js> --chunks 4 [--min 20000] [--write]
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ACORN = (() => { for (const p of ['/home/user/Active/engines/node_modules/acorn', 'acorn']) { try { return require(p); } catch (e) { /* next */ } } throw new Error('acorn not found'); })();

const argv = process.argv.slice(2);
const opt = (k, d = null) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const IN = opt('in'), CHUNKS = Number(opt('chunks', 4)), MIN = Number(opt('min', 20000));
const WRITE = argv.includes('--write');
if (!IN) { console.error('usage: chunk-array-literal.mjs --in <file> [--chunks N] [--min bytes] [--write]'); process.exit(2); }
const src = fs.readFileSync(IN, 'utf8');
const ast = ACORN.parse(src, { ecmaVersion: 2022, locations: true });

// ---- find the biggest ArrayExpression in the file ----------------------------------------------
const SKIP = ['start', 'end', 'loc', 'type', '__parent'];
let best = null;
(function walk(n) {
  if (!n || typeof n.type !== 'string') return;
  if (n.type === 'ArrayExpression') {
    const size = n.end - n.start;
    if (!best || size > best.size) best = { size, node: n };
  }
  for (const k of Object.keys(n)) {
    if (SKIP.includes(k)) continue;
    const v = n[k];
    if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c); }
    else if (v && typeof v.type === 'string') walk(v);
  }
})(ast);
if (!best) throw new Error('no array literal found');
if (best.size < MIN) { console.log(`${IN}: largest array literal is ${best.size} B (< --min ${MIN}) — nothing to do`); process.exit(0); }
const els = best.node.elements;
if (els.some((e) => !e)) throw new Error('array literal has holes — refusing to chunk');
console.log(`${IN}: ${src.length} B, largest array literal ${best.size} B, ${els.length} elements`);

// ---- split at element boundaries, balanced by bytes --------------------------------------------
const total = els.reduce((a, e) => a + (e.end - e.start), 0);
const target = total / CHUNKS;
const groups = [];
let cur = [], curBytes = 0;
for (let i = 0; i < els.length; i++) {
  cur.push(i); curBytes += els[i].end - els[i].start;
  const left = CHUNKS - groups.length - 1;
  if (left > 0 && curBytes >= target && i < els.length - 1) { groups.push(cur); cur = []; curBytes = 0; }
}
groups.push(cur);

// ---- find the enclosing variable declaration (for the chunk base name) -------------------------
let declName = null;
(function find(n) {
  if (!n || typeof n.type !== 'string') return;
  if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.start <= best.node.start && n.init.end >= best.node.end) declName = n.id.name;
  for (const k of Object.keys(n)) {
    if (SKIP.includes(k)) continue;
    const v = n[k];
    if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') find(c); }
    else if (v && typeof v.type === 'string') find(v);
  }
})(ast);
if (!declName) throw new Error('could not resolve the owning declaration name');
const base = `${declName}_c`;

// ---- emit ---------------------------------------------------------------------------------------
const chunkStmts = groups.map((g, i) => `  const ${base}${i} = [${g.map((j) => src.slice(els[j].start, els[j].end)).join(', ')}];`);
const replacement = `[].concat(${groups.map((_, i) => `${base}${i}`).join(', ')})`;
const before = src.slice(0, best.node.start);
const after = src.slice(best.node.end);
// place the chunk statements immediately before the line that owns the array literal
const lineStart = before.lastIndexOf('\n') + 1;
const indent = /^\s*/.exec(before.slice(lineStart))[0] || '  ';
const out = before.slice(0, lineStart) + chunkStmts.map((s) => indent + s.trim()).join('\n') + '\n' + before.slice(lineStart) + replacement + after;

ACORN.parse(out, { ecmaVersion: 2022 });   // validate before writing anything
console.log('   chunks: ' + groups.map((g, i) => `c${i}=${g.length}el/${(g.reduce((a, j) => a + (els[j].end - els[j].start), 0) / 1024).toFixed(1)}KB`).join(' '));
console.log(`   ${src.length} -> ${out.length} B`);
if (WRITE) { fs.writeFileSync(IN, out); console.log('   written (in place)'); } else console.log('   (dry run — re-run with --write)');
