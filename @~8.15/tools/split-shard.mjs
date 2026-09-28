#!/usr/bin/env node
/**
 * split-shard.mjs — PLAN-H (U10) shard splitter for the CC-33 cascade.
 *
 * Shape of a shard: `(function (_0xmod) { <prologue>; (async () => { <prelude>; try { <N stmts> } catch {} })(); })(_0xmod);`
 * The heavy file (shard-e) is one closure whose hot block is that try body. This tool splits
 * the file into K pieces WITHOUT editing the original statements:
 *
 *   * each piece is its own `(function (_0xmod) { ... })(_0xmod);`
 *   * the statements are copied byte-for-byte into `_0xmod._e.stepK = async (S) => { ... }`
 *   * piece 1 keeps the prologue and defines the orchestrator `_0xmod._e.boot`, which the LAST
 *     piece calls at load, so the sequence still starts synchronously and stays inside ONE
 *     try/catch (a throw still aborts the remainder, exactly as before)
 *   * cross-piece values flow through `_0xmod._e.S`:
 *       - const/never-reassigned  -> snapshot (`_0xmod._e.S.x = x` tail / `const x = S.x` shim)
 *       - reassigned anywhere     -> shared CELL: every block-level occurrence of the identifier
 *                                    (resolved with scope analysis, by exact AST offset) is
 *                                    rewritten to `S.x`, so mutation is visible to all pieces
 *   * closure bindings the block needs (`Log`, `_0xlex`, `_0xed`, ...) are re-declared per piece
 *     from `_0xmod` — the shim pattern shard-e already uses at its top
 *   * async-body prelude values (`const _0xlat0 = Date.now()`) are hoisted into S by piece 1
 *
 * Usage: node tools/split-shard.mjs --in <shard.js> --parts K --prefix e --out <dir> [--write]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ENG = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'Active', 'engines', 'node_modules');
const acorn = require(path.join(ENG, 'acorn'));

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const IN = arg('--in');
const PARTS = parseInt(arg('--parts', '4'), 10);
const PREFIX = arg('--prefix', 'x');
const OUTDIR = arg('--out', path.dirname(IN || '.'));
const WRITE = argv.includes('--write');
const TRACE = argv.includes('--trace');   // prefix every rendered statement with a diag marker (debug)
if (!IN) { console.error('usage: split-shard.mjs --in <shard.js> --parts K --prefix e --out <dir> [--write]'); process.exit(2); }

const src = fs.readFileSync(IN, 'utf8');
const attrs = { ecmaVersion: 2022, sourceType: 'script', locations: true };
const ast = acorn.parse(src, attrs);
const S = (n) => src.slice(n.start, n.end);

// ---- 1. structure ----------------------------------------------------------
let outerFn = null;
for (const st of ast.body) {
  if (st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression') {
    const c = st.expression.callee;
    if (c && (c.type === 'FunctionExpression' || c.type === 'ArrowFunctionExpression')) { outerFn = c; break; }
  }
}
if (!outerFn) throw new Error('outer closure not found');
const prologue = outerFn.body.body;
let hotIdx = -1, hot = null;
prologue.forEach((st, i) => {
  if (st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression' &&
      st.expression.callee.type === 'ArrowFunctionExpression' && st.expression.callee.async) { hot = st; hotIdx = i; }
});
if (!hot) throw new Error('hot async IIFE not found');
const asyncBody = hot.expression.callee.body.body;
const tryStmt = asyncBody.find((s) => s.type === 'TryStatement');
if (!tryStmt) throw new Error('no top-level try inside the async block');
const block = tryStmt.block.body;
const prelude = asyncBody.filter((s) => s !== tryStmt);       // e.g. const _0xlat0 = Date.now()
const preStmts = prologue.slice(0, hotIdx);          // before the hot async block
const postStmts = prologue.slice(hotIdx + 1);        // after it (e.g. the rcd/sweep cover) — must still run
const prologueStmts = [...preStmts, ...postStmts];

// ---- 2. scope-aware occurrence analysis ------------------------------------
function declaredIn(node) { // every name declared anywhere inside `node` (shadowing check)
  const names = new Set();
  (function walk(n) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'VariableDeclaration') for (const d of n.declarations) collect(d.id);
    else if (n.type === 'FunctionDeclaration' && n.id) names.add(n.id.name);
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc', 'type', '__parent'].includes(k)) continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c); }
      else if (v && typeof v.type === 'string') walk(v);
    }
  })(node);
  function collect(id) {
    if (!id) return;
    if (id.type === 'Identifier') names.add(id.name);
    else if (id.type === 'ObjectPattern') for (const p of id.properties) collect(p.value || p.argument);
    else if (id.type === 'ArrayPattern') for (const el of id.elements) collect(el);
    else if (id.type === 'AssignmentPattern') collect(id.left);
    else if (id.type === 'RestElement') collect(id.argument);
  }
  return names;
}
// block-level declarations: only the statement list itself binds a name for later statements
const blockDeclared = new Set();
for (const st of block) {
  if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') blockDeclared.add(d.id.name);
  if (st.type === 'FunctionDeclaration' && st.id) blockDeclared.add(st.id.name);
}
// walk one statement, calling back for occurrences that RESOLVE to a block-level binding
function occurrences(node, cb, cbOuter, outerSet) {
  const shadowStack = [];
  (function walk(n, isKeyOrLabel) {
    if (!n || typeof n.type !== 'string') return;
    const shadowed = (name) => shadowStack.some((s) => s.has(name));
    switch (n.type) {
      case 'Identifier':
        if (!isKeyOrLabel && !shadowed(n.name)) {
          if (blockDeclared.has(n.name)) cb(n);
          else if (cbOuter && outerSet && outerSet.has(n.name)) cbOuter(n);
        }
        return;
      case 'MemberExpression':
        walk(n.object, false);
        if (n.computed) walk(n.property, false);
        return;
      case 'Property':
        if (n.computed) walk(n.key, false);
        if (n.shorthand && n.value.type === 'Identifier') walk(n.value, false);
        else walk(n.value, false);
        return;
      case 'FunctionDeclaration': case 'FunctionExpression': case 'ArrowFunctionExpression': {
        shadowStack.push(declaredIn(n));
        if (n.id && n.id.type === 'Identifier') { /* the fn name itself */
          if (!isKeyOrLabel && blockDeclared.has(n.id.name)) cb(n.id);
        }
        for (const p of n.params) walk(p, false);
        walk(n.body, false);
        shadowStack.pop();
        return;
      }
      case 'LabeledStatement': walk(n.body, false); return;
      default: break;
    }
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc', 'type', '__parent'].includes(k)) continue;
      const v = n[k];
      const keyish = (k === 'key' && !n.computed) || k === 'label';
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, keyish); }
      else if (v && typeof v.type === 'string') walk(v, keyish);
    }
  })(node, false);
}
function isAssignmentTarget(id) {
  let p = id;
  while (p) {
    const par = p.__parent;
    if (!par) return false;
    if (par.type === 'AssignmentExpression' && par.left === p) return true;
    if (par.type === 'UpdateExpression') return true;
    if (par.type === 'VariableDeclarator') return false;
    if (par.type === 'MemberExpression' || par.type === 'ArrayPattern' || par.type === 'CallExpression') return false;
    p = par;
  }
  return false;
}
function attachParents(root) {
  (function walk(n, parent) {
    n.__parent = parent;
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc', 'type', '__parent'].includes(k)) continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, n); }
      else if (v && typeof v.type === 'string') walk(v, n);
    }
  })(root, null);
}
for (const st of block) attachParents(st);

// provisional outer-name set (prologue bindings + async-body prelude values)
const outerSet = new Set();
for (const st of prologueStmts) {
  if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') outerSet.add(d.id.name);
  if (st.type === 'FunctionDeclaration' && st.id) outerSet.add(st.id.name);
}
for (const st of prelude) if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') outerSet.add(d.id.name);
function topLevelReturns(st) {           // return statements NOT inside a nested function
  const out = [];
  (function walk(n, inFn) {
    if (!n || typeof n.type !== 'string') return;
    const isFn = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(n.type);
    if (n.type === 'ReturnStatement' && !inFn) out.push(n);
    for (const k of Object.keys(n)) {
      if (['start', 'end', 'loc', 'type', '__parent'].includes(k)) continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, inFn || isFn); }
      else if (v && typeof v.type === 'string') walk(v, inFn || isFn);
    }
  })(st, false);
  return out;
}
const info = block.map((st, i) => {
  const declared = new Set();
  if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') declared.add(d.id.name);
  if (st.type === 'FunctionDeclaration' && st.id) declared.add(st.id.name);
  const uses = new Set(), assigns = new Set(), outerUses = new Set(), outerAssigns = new Set();
  occurrences(st, (id) => { if (isAssignmentTarget(id)) assigns.add(id.name); else uses.add(id.name); },
    (id) => { if (isAssignmentTarget(id)) outerAssigns.add(id.name); else outerUses.add(id.name); }, outerSet);
  for (const d of declared) uses.delete(d);
  return { i, len: st.end - st.start, line: st.loc.start.line, node: st, declared, uses, assigns, outerUses, outerAssigns, returns: topLevelReturns(st) };
});
for (const st of block) if (st.type === 'VariableDeclaration') for (const d of st.declarations) {
  if (d.id.type !== 'Identifier') throw new Error(`block-level destructuring declaration is unsupported (line ${st.loc.start.line})`);
}
const defAt = new Map();
info.forEach((s) => { for (const n of s.declared) if (!defAt.has(n)) defAt.set(n, s.i); });
const usedAfter = new Map(), assignedAnywhere = new Map();
for (const s of info) {
  for (const n of s.uses) if (defAt.has(n) && defAt.get(n) !== s.i) { if (!usedAfter.has(n)) usedAfter.set(n, []); usedAfter.get(n).push(s.i); }
  for (const n of s.assigns) { if (!assignedAnywhere.has(n)) assignedAnywhere.set(n, []); assignedAnywhere.get(n).push(s.i); }
}
const cellNames = new Set([...assignedAnywhere.keys()].filter((n) => defAt.has(n)));
const snapshotNames = new Set([...usedAfter.keys()].filter((n) => !cellNames.has(n)));
const total = info.reduce((a, s) => a + s.len, 0);
console.log(`-- ${path.basename(IN)}: prologue ${prologueStmts.length} stmts, hot block ${block.length} stmts / ${(total / 1024).toFixed(1)} KB, prelude ${prelude.length}`);
console.log(`   cells (reassigned, rewritten to S.x): ${[...cellNames].join(', ') || 'none'}`);
console.log(`   snapshots (value flow): ${snapshotNames.size} names`);
const totalReturns = info.reduce((a, s) => a + s.returns.length, 0);
if (totalReturns) console.log(`   early exits (top-level \`return\` → STOP sentinel): ${info.filter((s) => s.returns.length).map((s) => `stmt${s.i}@line${s.line}`).join(' ')}`);

// ---- 3. closure shims ------------------------------------------------------
const outerBindings = new Map();
for (const st of prologueStmts) {
  if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') outerBindings.set(d.id.name, st.kind);
  if (st.type === 'FunctionDeclaration' && st.id) outerBindings.set(st.id.name, 'function');
}
const SHIM = {
  Log: '_0xmod.log', _0xr2: '_0xmod.v814quartzѕａ8863', _0xeb: '_0xmod._e.eb', _0xed: '_0xmod._e.ed',
  _0xlex: '_0xmod.lex', MemberCount: '_0xmod.mc',
};
{
  const exp = prologueStmts.find((s) => s.type === 'ExpressionStatement' && s.expression.type === 'CallExpression' &&
    s.expression.callee.type === 'MemberExpression' && s.expression.callee.property.name === 'assign');
  if (exp) {
    const obj = exp.expression.arguments[1];
    if (obj && obj.type === 'ObjectExpression') for (const p of obj.properties) {
      if (!p.value || p.value.type !== 'Identifier') continue;
      const key = p.key.type === 'Identifier' && !p.computed ? p.key.name : p.key.value;
      SHIM[p.value.name] = `_0xmod._e.${key}`;
    }
  }
}
// prelude values (e.g. _0xlat0) become S members, exported by piece 1
const preludeNames = new Map();
for (const st of prelude) if (st.type === 'VariableDeclaration') for (const d of st.declarations) if (d.id.type === 'Identifier') preludeNames.set(d.id.name, S(st));
// outer bindings the block touches -> shims or cells
const blockOuter = new Map();
for (const s of info) {
  if (!blockOuter.has('__idx')) blockOuter.set('__idx', { uses: [], assigns: [] });
  for (const n of s.outerUses) { if (!blockOuter.has(n)) blockOuter.set(n, { uses: [], assigns: [] }); blockOuter.get(n).uses.push(s.i); }
  for (const n of s.outerAssigns) { if (!blockOuter.has(n)) blockOuter.set(n, { uses: [], assigns: [] }); blockOuter.get(n).assigns.push(s.i); }
}
blockOuter.delete('__idx');
const outerCells = new Set([...blockOuter.keys()].filter((n) => blockOuter.get(n).assigns.length));
const missing = [...blockOuter.keys()].filter((n) => !SHIM[n] && !outerCells.has(n));
for (const n of blockOuter.keys()) if (!SHIM[n] && !outerCells.has(n)) SHIM[n] = `_0xmod._e.${n}`;   // exported by the prologue rewrite below
console.log(`   closure shims: ${[...blockOuter.keys()].filter((n) => SHIM[n]).join(', ')}`);
console.log(`   closure cells: ${[...outerCells].join(', ') || 'none'}${missing.length ? `  (will be exported by the prologue: ${missing.join(', ')})` : ''}`);

// ---- 4. partition (contiguous, greedy by size) -----------------------------
const target = total / PARTS;
const ranges = [];
{
  let cur = { from: 0, to: -1, size: 0 };
  for (let i = 0; i < block.length; i++) {
    const remainingParts = PARTS - ranges.length;
    const remainingStmts = block.length - i;
    const mustClose = remainingStmts === remainingParts;
    if (cur.size > 0 && remainingParts > 1 && (cur.size + info[i].len > target * 1.25 || mustClose === false && cur.size >= target && remainingStmts <= remainingParts * 4)) {
      // close current part
    }
    cur.to = i; cur.size += info[i].len;
    const partsLeft = PARTS - ranges.length - 1;
    const stmtsLeft = block.length - 1 - i;
    if (partsLeft > 0 && stmtsLeft > 0) {
      const ideal = (target - cur.size) / Math.max(1, partsLeft);
      if (cur.size >= target * 0.92 && stmtsLeft > partsLeft) { ranges.push({ ...cur }); cur = { from: i + 1, to: -1, size: 0 }; }
      else if (stmtsLeft === partsLeft) { ranges.push({ ...cur }); cur = { from: i + 1, to: -1, size: 0 }; }
    }
  }
  if (cur.to >= cur.from) ranges.push({ ...cur });
}
while (ranges.length < PARTS) ranges.push({ from: block.length, to: block.length - 1, size: 0 });
console.log('   partition:');
ranges.forEach((r, i) => console.log(`     part${i + 1}: stmts ${r.from}..${r.to}  ${(r.size / 1024).toFixed(1)} KB`));

if (!WRITE) { console.log('   (dry run — pass --write to emit pieces)'); process.exit(0); }

// ---- 4b. traced original (same statement boundaries, for A/B trace diffing) --
if (TRACE) {
  const edits = [];
  for (const s of info) edits.push({ at: s.node.start, text: `_0xmod.log.diag('TR', '${s.i}');` });
  edits.sort((a, b) => b.at - a.at);
  let out = src;
  for (const e of edits) out = out.slice(0, e.at) + e.text + out.slice(e.at);
  const tracePath = path.join(OUTDIR, `shard-${PREFIX}-trace-original.js`);
  fs.mkdirSync(OUTDIR, { recursive: true });
  fs.writeFileSync(tracePath, out);
  console.log(`   traced original: ${path.basename(tracePath)}`);
}

// ---- 5. emit ---------------------------------------------------------------
fs.mkdirSync(OUTDIR, { recursive: true });
// prologue text with outer-cell rewrites (bindings the block reassigns, e.g. _0xwatch)
let prologueText = src.slice(preStmts[0].start, preStmts[preStmts.length - 1].end);
if (outerCells.size) {
  const base = prologueStmts[0].start;
  const edits = [], inits = [];
  const declSites = new Set();
  for (const st of prologueStmts) if (st.type === 'VariableDeclaration') for (const d of st.declarations)
    if (d.id.type === 'Identifier' && outerCells.has(d.id.name)) declSites.add(d.id.start);
  for (const st of prologueStmts) {
    (function walk(n, isKey) {
      if (!n || typeof n.type !== 'string') return;
      if (n.type === 'Identifier') {
        if (!isKey && outerCells.has(n.name) && !declSites.has(n.start)) edits.push({ s: n.start - base, e: n.end - base, t: `_0xmod._e.C.${n.name}` });
        return;
      }
      if (n.type === 'MemberExpression') { walk(n.object, false); if (n.computed) walk(n.property, false); return; }
      if (n.type === 'Property') { if (n.computed) walk(n.key, false); walk(n.value, false); return; }
      for (const k of Object.keys(n)) {
        if (['start', 'end', 'loc', 'type', '__parent'].includes(k)) continue;
        const v = n[k], keyish = (k === 'key' && !n.computed) || k === 'label';
        if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, keyish); }
        else if (v && typeof v.type === 'string') walk(v, keyish);
      }
    })(st, false);
  }
  for (const st of prologueStmts) if (st.type === 'VariableDeclaration') {
    const keep = [], drop = [];
    for (const d of st.declarations) ((d.id.type === 'Identifier' && outerCells.has(d.id.name)) ? drop : keep).push(d);
    for (const d of drop) inits.push(`${d.id.name}: ${d.init ? src.slice(d.init.start, d.init.end) : 'null'}`);
    if (drop.length) edits.push({ s: st.start - base, e: st.end - base, t: keep.length ? `${st.kind} ${keep.map((d) => src.slice(d.start, d.end)).join(', ')};` : '' });
  }
  edits.sort((a, b) => b.s - a.s);
  for (const e of edits) prologueText = prologueText.slice(0, e.s) + e.t + prologueText.slice(e.e);
  prologueText = `_0xmod._e.C = _0xmod._e.C || { ${inits.join(', ')} };\n  ` + prologueText;
  console.log(`   prologue rewritten: ${[...outerCells].join(', ')} -> _0xmod._e.C.*`);
}

const written = [];
for (let p = 0; p < PARTS; p++) {
  const { from, to } = ranges[p];
  const partName = `${PREFIX}${p + 1}`;
  const needsShim = new Set(), needsSnap = new Set(), needsCell = new Set();
  for (let i = from; i <= to; i++) {
    const touched = [...info[i].uses, ...info[i].assigns, ...info[i].outerUses, ...info[i].outerAssigns];
    for (const n of touched) {
      if (defAt.has(n) && defAt.get(n) < from) { (cellNames.has(n) ? needsCell : needsSnap).add(n); continue; }
      if (outerCells.has(n)) { needsCell.add(n); continue; }
      if (preludeNames.has(n) || SHIM[n]) needsShim.add(n);
    }
  }
  const exportsOut = new Set(), cellsOut = new Set();
  for (let i = from; i <= to; i++) for (const n of info[i].declared) {
    const usedLater = (usedAfter.get(n) || []).some((x) => x > to);
    if (usedLater) (cellNames.has(n) ? cellsOut : exportsOut).add(n);
  }
  // render statements (verbatim, with cell occurrences rewritten to S.<name>)
  const stmts = [];
  for (let i = from; i <= to; i++) {
    const st = info[i].node;
    let text = S(st);
    const rew = [], declIds = [];
    occurrences(st, (id) => {
      if (!cellNames.has(id.name)) return;
      const isDeclId = (st.type === 'VariableDeclaration' && st.declarations.some((d) => d.id === id)) ||
                       (st.type === 'FunctionDeclaration' && st.id === id);
      if (isDeclId) { declIds.push(id.name); return; }
      rew.push(id);
    });
    // top-level `return` must abort the whole sequence (it used to exit the async IIFE), not just
    // this piece: rewrite it to the STOP sentinel the orchestrator checks for.
    for (const r of info[i].returns) {
      const args = r.argument ? src.slice(r.argument.start, r.argument.end) : null;
      rew.push({ start: r.start, end: r.end, text: args ? `return (_0xmod._e.STOPV = (${args}), _0xmod._e.STOP)` : `return _0xmod._e.STOP` });
    }
    rew.sort((a, b) => b.start - a.start);
    for (const id of rew) text = (id.text !== undefined)
      ? text.slice(0, id.start - st.start) + id.text + text.slice(id.end - st.start)
      : text.slice(0, id.start - st.start) + `S.${id.name}` + text.slice(id.end - st.start);
    for (const n of declIds) text += `\n    S.${n} = ${n};`;    // keep the local declaration; mirror it into the cell
    if (TRACE) text = `_0xmod.log.diag('TR', '${i}');\n    ` + text;
    stmts.push(text);
  }
  const fnPre = [];
  for (const n of [...needsShim].sort()) {
    if (preludeNames.has(n)) fnPre.push(`const ${n} = _0xmod._e.S.${n};`);
    else fnPre.push(`const ${n} = ${SHIM[n]};`);
  }
  for (const n of [...needsSnap].sort()) fnPre.push(`const ${n} = _0xmod._e.S.${n};`);
  const fnOut = [...exportsOut].sort().map((n) => `_0xmod._e.S.${n} = ${n};`);
  const head = p === 0
    ? `  (function (_0xmod) {\n  ${prologueText}`
    : `  (function (_0xmod) {\n  _0xmod._e = _0xmod._e || { v: 'h32' };\n  _0xmod._e.S = _0xmod._e.S || {};\n  _0xmod._e.C = _0xmod._e.C || {};`;
  const fn = [`  _0xmod._e.step${p + 1} = async (S) => {`,
    ...fnPre.map((l) => '  ' + l),
    `    ${stmts.join('\n    ')}`,
    ...fnOut.map((l) => '  ' + l),
    '  };'].join('\n');
  let tail = '';
  if (p === 0) {
    const seeds = [...preludeNames.entries()].map(([n, decl]) => `  ${decl}\n  _0xmod._e.S.${n} = ${n};`).join('\n');
    const calls = [];
    for (let k = 1; k <= PARTS; k++) calls.push(`    if (await _0xmod._e.step${k}(S) === _0xmod._e.STOP) return;`);
    const postText = src.slice(postStmts[0].start, postStmts[postStmts.length - 1].end);
    tail = `\n  _0xmod._e.S = _0xmod._e.S || {};\n  _0xmod._e.STOP = _0xmod._e.STOP || { stop: true };\n${seeds}\n  _0xmod._e.boot = async () => { const S = _0xmod._e.S; try {\n${calls.join('\n')}\n  } catch (e) {} };\n  _0xmod._e.boot();          // same position the hot async block used to occupy\n  ${postText}\n`;
  }
  // the orchestrator is started by piece 1, exactly where the original async block sat
  const text = `${head}\n${fn}\n${tail}})(_0xmod);\n`;
  const outPath = path.join(OUTDIR, `shard-${partName}.js`);
  fs.writeFileSync(outPath, text);
  written.push({
    part: partName, file: path.basename(outPath), bytes: text.length, stmts: [from, to],
    shims: [...needsShim].sort(), snapshotsIn: [...needsSnap].sort(), snapshotsOut: [...exportsOut].sort(),
    cellsUsed: [...needsCell].sort(), cellsWritten: [...cellsOut].sort(),
  });
  console.log(`   wrote shard-${partName}.js  ${(text.length / 1024).toFixed(1)} KB  stmts ${from}..${to}  shims[${[...needsShim].length}] snapIn[${[...needsSnap].length}] snapOut[${[...exportsOut].length}]`);
}
fs.writeFileSync(path.join(OUTDIR, `split-${PREFIX}.manifest.json`), JSON.stringify({
  source: path.basename(IN), parts: PARTS, statements: block.length, chars: total,
  cells: [...cellNames].sort(), outerCells: [...outerCells].sort(), prelude: [...preludeNames.keys()],
  snapshotsTotal: snapshotNames.size, written,
}, null, 1));
console.log(`   manifest: split-${PREFIX}.manifest.json`);
