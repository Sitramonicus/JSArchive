#!/usr/bin/env node
/**
 * split-flat.mjs — PLAN-H splitter for FLAT shards (2026-09-20).
 *
 * `tools/split-shard.mjs` handles shards built around one hot async block (the `e` family). The
 * remaining PLAN-H targets (`m`, `aux`, `e-str`) are flat: a single IIFE whose body is a plain
 * statement list. This tool splits such a shard into N pieces that stay executable in order:
 *
 *   piece 1 : (function (_0xmod) { ...stmts[0..k]...; mirror cells })();
 *   piece 2 : (function (_0xmod) { read cells; ...stmts[k+1..j]...; mirror cells })();
 *
 * Cross-piece values travel through `_0xmod._<ns>.S` (cells), mirrored at the end of each piece and
 * read at the start of the next. A top-level `return` (one that exits the original IIFE) becomes a
 * stop flag the following pieces check, so an early exit still means "stop here", not "carry on".
 *
 * Usage:
 *   node tools/split-flat.mjs --in shards/shard-aux.js --parts 2 --ns aux --prefix aux --out /tmp/x [--write] [--trace]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ACORN = (() => {
  for (const p of ['/home/user/Active/engines/node_modules/acorn', 'acorn']) {
    try { return require(p); } catch (e) { /* next */ }
  }
  throw new Error('acorn not found — run: cd Active/engines && npm i acorn@8 --no-save');
})();

const argv = process.argv.slice(2);
const opt = (k, d = null) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const IN = opt('in'), PARTS = Number(opt('parts', 2)), NS = opt('ns'), PREFIX = opt('prefix'), OUTDIR = opt('out');
const CELLS = opt('cells', null);   // override: JS expression for the shared cell object
const WRITE = argv.includes('--write'), TRACE = argv.includes('--trace');
if (!IN || !NS || !PREFIX || !OUTDIR) { console.error('usage: split-flat.mjs --in <file> --parts N --ns <ns> --prefix <p> --out <dir> [--write] [--trace]'); process.exit(2); }
const src = fs.readFileSync(IN, 'utf8');
const ast = ACORN.parse(src, { ecmaVersion: 2022, locations: true });

// ---- locate the outer IIFE ---------------------------------------------------------------------
let fn = null, argText = '_0xmod';
for (const st of ast.body) {
  if (st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression') {
    const c = st.expression.callee;
    if (c && (c.type === 'FunctionExpression' || c.type === 'ArrowFunctionExpression')) {
      fn = c;
      if (st.expression.arguments.length) argText = src.slice(st.expression.arguments[0].start, st.expression.arguments[0].end);
      break;
    }
  }
}
if (!fn) throw new Error('no outer IIFE found (use tools/split-shard.mjs for the async-block shards)');
const block = fn.body.body;
// Top-level statements OUTSIDE the IIFE: a shard may carry a trailing block (aux has a 6 KB
// fingerprint ledger after its IIFE) or a leading one. They are NOT part of the split — they are
// carried verbatim so nothing is dropped: leading -> before the first piece, trailing -> after the
// last piece, keeping their original order and the file-level hoisting they rely on.
const iifeStmt = ast.body.find((s) => s.type === 'ExpressionStatement' && s.expression === ast.body.find((x) => x.type === 'ExpressionStatement' && x.expression.type === 'CallExpression' && (x.expression.callee.type === 'FunctionExpression' || x.expression.callee.type === 'ArrowFunctionExpression'))?.expression);
const iifeIdx = ast.body.findIndex((s) => s.type === 'ExpressionStatement' && s.expression.type === 'CallExpression' && (s.expression.callee.type === 'FunctionExpression' || s.expression.callee.type === 'ArrowFunctionExpression') && s.expression.callee === fn);
if (iifeIdx < 0) throw new Error('could not locate the IIFE statement in the file body');
const leading = ast.body.slice(0, iifeIdx);
const trailing = ast.body.slice(iifeIdx + 1);
const declNames = (sts) => sts.flatMap((s) => {
  const out = [];
  if (s.type === 'FunctionDeclaration' && s.id) out.push(s.id.name);
  if (s.type === 'VariableDeclaration') for (const d of s.declarations) if (d.id.type === 'Identifier') out.push(d.id.name);
  return out;
});
const bodyText = src.slice(fn.body.start, fn.body.end);
const leaky = [...declNames(leading), ...declNames(trailing)].filter((n) => new RegExp('\\b' + n + '\\b').test(bodyText));
if (leaky.length && !argv.includes('--allow-cross-top')) {
  throw new Error(`top-level declarations outside the IIFE are referenced inside it (${leaky.join(',')}) — splitting would change hoisting; re-run with --allow-cross-top to override`);
}
console.log(`${path.basename(IN)}: ${src.length} B, ${block.length} statements in the IIFE, ${leading.length} leading + ${trailing.length} trailing top-level statements carried verbatim`);

// ---- analyse -----------------------------------------------------------------------------------
const SKIP = ['start', 'end', 'loc', 'type', '__parent'];
function walk(n, cb, inFn = false) {
  if (!n || typeof n.type !== 'string') return;
  const isFn = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(n.type);
  cb(n, inFn || isFn);
  for (const k of Object.keys(n)) {
    if (SKIP.includes(k)) continue;
    const v = n[k];
    if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, cb, inFn || isFn); }
    else if (v && typeof v.type === 'string') walk(v, cb, inFn || isFn);
  }
}
const declaredOf = (st) => {
  const out = [];
  const push = (d) => {
    if (d.id && d.id.type === 'Identifier') out.push(d.id.name);
    else if (d.id && d.id.type === 'ObjectPattern') walk(d.id, (n) => { if (n.type === 'Identifier') out.push(n.name); });
  };
  if (st.type === 'VariableDeclaration') st.declarations.forEach(push);
  if (st.type === 'FunctionDeclaration' && st.id) out.push(st.id.name);
  return out;
};
const usesOf = (st) => {
  const out = new Set();
  walk(st, (n) => { if (n.type === 'Identifier') out.add(n.name); });
  return out;
};
const topReturns = (st) => {
  const out = [];
  walk(st, (n, inFn) => { if (n.type === 'ReturnStatement' && !inFn) out.push(n); });
  return out;
};
const info = block.map((st, i) => ({ i, node: st, len: st.end - st.start, declared: declaredOf(st), uses: usesOf(st), returns: topReturns(st) }));

// split points: greedily balance bytes, never split between a declaration and its first use of the
// SAME statement (we split only at statement boundaries, so that is automatic).
const total = info.reduce((a, s) => a + s.len, 0);
const target = total / PARTS;
const cum = [];
{ let a = 0; for (const s of info) { a += s.len; cum.push(a); } }
const cuts = [];
let prev = -1;
for (let c = 1; c <= PARTS - 1; c++) {
  // pick the statement boundary closest to this share of the total (balances better than
  // "first index past the target", which can leave the last piece a stub)
  let bestI = -1, bestD = Infinity;
  for (let i = prev + 1; i < info.length - 1; i++) {
    const d = Math.abs(cum[i] - target * c);
    if (d < bestD) { bestD = d; bestI = i; }
  }
  if (bestI < 0) bestI = Math.min(prev + 1, info.length - 2);
  cuts.push(bestI); prev = bestI;
}
const ranges = [];
let from = 0;
for (const c of cuts) { ranges.push([from, c]); from = c + 1; }
ranges.push([from, info.length - 1]);

// which names must cross each boundary?
const cross = ranges.slice(0, -1).map((_, ri) => {
  const end = ranges[ri][1];
  const seen = new Set();
  for (let i = 0; i <= end; i++) info[i].declared.forEach((n) => seen.add(n));
  const need = new Set();
  for (let i = end + 1; i <= ranges[ri + 1][1]; i++) info[i].uses.forEach((n) => { if (seen.has(n)) need.add(n); });
  return [...need].sort();
});

console.log('   partition:');
ranges.forEach(([a, b], i) => console.log(`     part${i + 1}: stmts ${a}..${b}  ${(info.slice(a, b + 1).reduce((x, s) => x + s.len, 0) / 1024).toFixed(1)} KB  cellsIn=[${i ? cross[i - 1].length : 0}] cellsOut=[${cross[i] ? cross[i].length : 0}]`));
const rets = info.filter((s) => s.returns.length);
if (rets.length) console.log(`   early exits (top-level \`return\` -> stop flag): ${rets.map((s) => `stmt${s.i}@${s.node.loc.start.line}`).join(' ')}`);

// ---- emit --------------------------------------------------------------------------------------
const CELLS_EXPR = CELLS || `_0xmod._${NS}.S`;
const pieces = ranges.map(([a, b], pi) => {
  const lines = [];
  lines.push(`  (function (_0xmod) {`);
  lines.push(`  _0xmod._${NS} = _0xmod._${NS} || {};`);
  if (!CELLS) lines.push(`  _0xmod._${NS}.S = _0xmod._${NS}.S || {};`);
  else lines.push(`  ${CELLS_EXPR} = ${CELLS_EXPR} || {};`);
  if (pi === 0 && leading.length) for (const s of leading) lines.push(src.slice(s.start, s.end));
  if (pi > 0) {
    lines.push(`  if (_0xmod._${NS}._stop) return;`);
    for (const n of cross[pi - 1]) lines.push(`  const ${n} = ${CELLS_EXPR}.${n};`);
  }
  for (let i = a; i <= b; i++) {
    let text = src.slice(info[i].node.start, info[i].node.end);
    // top-level `return` -> set the stop flag so later pieces do not run
    const rs = info[i].returns.slice().sort((x, y) => y.start - x.start);
    for (const r of rs) {
      const inner = text.slice(r.start - info[i].node.start, r.end - info[i].node.start);
      const repl = r.argument ? `{ _0xmod._${NS}._stop = true; return ${src.slice(r.argument.start, r.argument.end)}; }` : `{ _0xmod._${NS}._stop = true; return; }`;
      text = text.slice(0, r.start - info[i].node.start) + repl + text.slice(r.end - info[i].node.start);
    }
    if (TRACE) lines.push(`  _0xmod.log && _0xmod.log.diag && _0xmod.log.diag('TRFLAT', '${i}');`);
    lines.push('  ' + text);
  }
  if (cross[pi]) for (const n of cross[pi]) lines.push(`  ${CELLS_EXPR}.${n} = ${n};`);
  lines.push(`  })(_0xmod);`);
  if (pi === ranges.length - 1 && trailing.length) for (const s of trailing) lines.push(src.slice(s.start, s.end));
  return lines.join('\n') + '\n';
});

fs.mkdirSync(OUTDIR, { recursive: true });
pieces.forEach((p, i) => {
  const f = path.join(OUTDIR, `shard-${PREFIX}${i + 1}.js`);
  if (WRITE) fs.writeFileSync(f, p);
  console.log(`   wrote ${path.basename(f)}  ${(p.length / 1024).toFixed(1)} KB`);
});
if (TRACE) {   // traced copy of the original at the same statement boundaries, for A/B trace diffing
  let out = src;
  for (const s of info.slice().reverse()) out = out.slice(0, s.node.start) + `_0xmod.log.diag('TRFLAT', '${s.i}');` + out.slice(s.node.start);
  const f = path.join(OUTDIR, `shard-${PREFIX}-trace-original.js`);
  if (WRITE) fs.writeFileSync(f, out);
  console.log(`   traced original: ${path.basename(f)}`);
}
if (!WRITE) console.log('   (dry run — re-run with --write)');
