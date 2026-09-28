#!/usr/bin/env node
/**
 * weave-probe.mjs — PROTOTYPE (2026-09-25). Not wired into the board; changes no frozen bytes.
 *
 * Question it answers: can the assembled bundle be *woven* — units from every piece physically mixed —
 * without changing what it does?
 *
 * The primitive is JavaScript's own hoisting rule: a `function` declaration at the top of a scope is
 * installed before any statement in that scope runs, so its *position* carries no meaning at all. That
 * makes it the one thing in the file that can be relocated for free.
 *
 * What this does:
 *   1. parse the bundle, find the one scope that holds everything (the big arrow IIFE),
 *   2. classify its statements: function declarations (free to move) vs everything else (order-keeping),
 *   3. re-order: the order-keeping spine stays in relative order; the free units are dealt into seeded
 *      gaps around it, so units from every piece end up interleaved,
 *   4. re-emit by splicing the ORIGINAL text spans — nothing is reprinted, so no minifier can introduce a
 *      semantic drift. Only `;` separators are added between moved units (143 bytes).
 *
 *   node weave-probe.mjs <bundle.js> <out.js> [--seed=N] [--report]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let parser;
for (const p of ['/tmp/parse/node_modules/@babel/parser', 'Active/engines/node_modules/@babel/parser']) {
  try { parser = require(p); break; } catch (e) {}
}
if (!parser) { console.error('weave-probe: @babel/parser not found (npm i @babel/parser in /tmp/parse)'); process.exit(2); }

const argv = process.argv.slice(2);
const src_path = argv[0], out_path = argv[1];
const seed = Number((argv.find((a) => a.startsWith('--seed=')) || '--seed=1').slice(7));
const REPORT = argv.includes('--report');
if (!src_path || !out_path) { console.error('usage: weave-probe.mjs <bundle.js> <out.js> [--seed=N] [--report]'); process.exit(2); }

// deterministic PRNG so a weave is reproducible from its seed (mulberry32)
const rng = (s) => () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const rand = rng(seed);

const src = fs.readFileSync(src_path, 'utf8');
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true, errorRecovery: true });

// ---- locate the scope that holds everything -------------------------------------------------------
const fnOf = (call) => {
  const c = call && call.callee;
  if (!c) return null;
  if (c.type === 'FunctionExpression' || c.type === 'ArrowFunctionExpression') return c;
  if (c.type === 'MemberExpression' && c.object && (c.object.type === 'FunctionExpression' || c.object.type === 'ArrowFunctionExpression')) return c.object;
  return null;
};
const top = ast.program.body.reduce((a, b) => (b.end - b.start) > (a.end - a.start) ? b : a);
let scope = null;
if (top.type === 'ExpressionStatement' && top.expression.type === 'SequenceExpression') {
  for (const e of top.expression.expressions) {
    const f = fnOf(e);
    if (f && f.body && f.body.body && (!scope || (e.end - e.start) > (scope.end - scope.start))) scope = f;
  }
} else if (top.type === 'ExpressionStatement') {
  const f = fnOf(top.expression);
  if (f) scope = f;
}
if (!scope) { console.error('weave-probe: could not find the main scope'); process.exit(3); }

const units = scope.body.body;                      // 143 statements in build 23
const span = { start: units[0].start, end: units[units.length - 1].end };

// ---- classify --------------------------------------------------------------------------------------
const free = [], spine = [];
units.forEach((n, i) => {
  if (n.type === 'FunctionDeclaration' && n.id && n.id.name) free.push({ i, n, name: n.id.name });
  else spine.push({ i, n });
});

// A duplicate declared name makes position meaningful (`function f` twice: the last one wins), and a
// name shared with a `var` can make the initialiser order matter. Any such unit is pinned instead of free.
const seen = new Map();
for (const u of free) seen.set(u.name, (seen.get(u.name) || 0) + 1);
const varNames = new Set();
for (const s of spine) {
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclaration') for (const d of node.declarations) if (d.id && d.id.name) varNames.add(d.id.name);
    for (const k of Object.keys(node)) {
      const v = node[k];
      if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object' && v.type) walk(v);
    }
  };
  walk(s.n);
}
const pinned = new Set();
for (const u of free) if (seen.get(u.name) > 1 || varNames.has(u.name)) pinned.add(u.i);
const movable = free.filter((u) => !pinned.has(u.i)).map((u) => u.i);
const pinnedFree = free.filter((u) => pinned.has(u.i)).map((u) => u.i);

// ---- deal the movable units into gaps around the order-keeping spine --------------------------------
const keepOrder = units.map((n, i) => i).filter((i) => !movable.includes(i));   // spine + pinned, in source order
const gaps = new Array(keepOrder.length + 1).fill(0).map(() => []);
for (const i of movable) gaps[Math.floor(rand() * gaps.length)].push(i);

const order = [];
for (let g = 0; g < gaps.length; g++) { for (const i of gaps[g]) order.push(i); if (g < keepOrder.length) order.push(keepOrder[g]); }

// ---- emit by splicing ORIGINAL spans (no reprint) ----------------------------------------------------
const text = order.map((i) => src.slice(units[i].start, units[i].end)).join(';');
const woven = src.slice(0, span.start) + text + src.slice(span.end);

// ---- report -----------------------------------------------------------------------------------------
const moved = order.filter((i, pos) => i !== keepOrder.filter((k) => keepOrder.indexOf(k) <= keepOrder.indexOf(i)).length - 1 + 1 && i !== order[pos]).length;
const movableBytes = movable.reduce((a, i) => a + (units[i].end - units[i].start), 0);
const totalBytes = span.end - span.start;
// adjacency: how often two neighbours came from the same original region (a piece-free proxy)
let sameRegionBefore = 0, sameRegionAfter = 0;
for (let k = 1; k < units.length; k++) if (units[k].i !== undefined) {}
for (let k = 1; k < order.length; k++) if (Math.abs(order[k] - order[k - 1]) === 1) sameRegionAfter++;
for (let k = 1; k < units.length; k++) sameRegionBefore++;

if (REPORT) {
  console.log(JSON.stringify({
    seed, units: units.length, movable: movable.length, pinned: pinnedFree.length, spineUnits: keepOrder.length - pinnedFree.length,
    movableBytes, totalBytes, movablePct: +(100 * movableBytes / totalBytes).toFixed(1),
    srcBytes: src.length, wovenBytes: woven.length,
    adjacency_before: 100, adjacency_after: +(100 * sameRegionAfter / (order.length - 1)).toFixed(1),
  }, null, 1));
}
fs.writeFileSync(out_path, woven);
console.error(`weave-probe: ${units.length} units · ${movable.length} free (${(100 * movableBytes / totalBytes).toFixed(1)}% of ${totalBytes.toLocaleString()} B) · ${pinnedFree.length} pinned · wrote ${out_path} (${woven.length.toLocaleString()} B)`);
