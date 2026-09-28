#!/usr/bin/env node
// deep-weave.mjs — Deep Weave, part 1 (structure): dissolve the IIFE shells and lift the data tables
// out of the function bodies they hide in, so the scatter pass can place them.
//
// Measured basis (Active/O8.15/DEEP-WEAVE-MEASURE-2026-09-26.md): 83 % of the payload sits in 36 master-body
// statements >= 20 KB and their interiors — not their literals — pin the weave score; 42 of the 51 IIFE
// shells (893 KB) dissolve with zero name collisions; the tables are pure literals behind never-written,
// globally unique bindings, so their declarations can be lifted and placed before the first statement that
// can *reach* a read of them.
//
// Usage: node deep-weave.mjs --apply <in.js> <out.js> [--json]
//        env: LIFT=0 (dissolve only) · LIFT_MIN=<bytes> (default 1000)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ENG = '/home/user/Active/engines/node_modules';
function load(name) { try { return require(path.join(ENG, name)); } catch { try { return require(name); } catch { throw new Error(`Missing engine "${name}" — run: cd Active/engines && npm ci`); } } }
const parser = load('@babel/parser');

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const AS_JSON = argv.includes('--json');
const files = argv.filter((a) => !a.startsWith('--'));
const [inPath, outPath] = files;
const DO_LIFT = process.env.LIFT !== '0';
const LIFT_MIN = Number(process.env.LIFT_MIN ?? 1000);

const src = fs.readFileSync(inPath, 'utf8');
const parse = (t) => parser.parse(t, { sourceType: 'script', allowReturnOutsideFunction: true });
const isFnExpr = (n) => n && (n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression');
function kids(n) { const out = []; for (const k of Object.keys(n)) { if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments' || k === 'innerComments') continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) { if (c && typeof c.type === 'string') out.push(c); } } else if (v && typeof v.type === 'string') { out.push(v); } } return out; }
function bodyOfFn(n) { return n && n.body && n.body.type === 'BlockStatement' ? n.body : null; }
function collectPattern(p, out) { if (!p) return; if (p.type === 'Identifier') { out.add(p.name); return; } for (const c of kids(p)) collectPattern(c, out); }
function directDeclNames(block) { const names = new Set(); for (const st of block.body) { if (st.type === 'VariableDeclaration') for (const d of st.declarations) collectPattern(d.id, names); if (st.type === 'FunctionDeclaration' && st.id) names.add(st.id.name); if (st.type === 'ClassDeclaration' && st.id) names.add(st.id.name); } return names; }
function walkShell(fn, cb) { (function w(n, inside) { if (!n || typeof n.type !== 'string') return; if (inside && (n.type === 'FunctionExpression' || n.type === 'FunctionDeclaration' || n.type === 'ObjectMethod' || n.type === 'ClassMethod')) return; cb(n); for (const c of kids(n)) w(c, true); })(fn, false); }

const stats = { shells: 0, shellsSeen: 0, shellBytes: 0, refused: new Map(), lifted: [], liftedBytes: 0, liftRefused: new Map(), varShells: [], extractRefused: new Map(), extractBytes: 0, extractMoved: [] };
const gate = [];

// ---------------------------------------------------------------- pass 1: DISSOLVE
const ast = parse(src);
const par = new Map();
(function w(n) { for (const c of kids(n)) { par.set(c, n); w(c); } })(ast);
const bodies = [];
(function w(n) { const b = bodyOfFn(n); if (b) bodies.push({ block: b, fn: n, depth: (() => { let d = 0, p = par.get(b); while (p) { if (bodyOfFn(p)) d++; p = par.get(p); } return d; })() }); for (const c of kids(n)) w(c); })(ast);
let master = null;
for (const { block } of bodies) if (!master || (block.end - block.start) > (master.end - master.start)) master = block;

function shellShape(stmt) {
  if (stmt.type === 'ExpressionStatement') {
    let e = stmt.expression;
    if (e.type === 'UnaryExpression' && e.operator === '!') e = e.argument;
    if (e.type === 'CallExpression' && isFnExpr(e.callee)) return { f: e.callee, call: e, kind: 'expr', stmt };
  }
  if (stmt.type === 'VariableDeclaration' && stmt.kind === 'var' && stmt.declarations.length === 1) {
    const d = stmt.declarations[0];
    if (d.id.type === 'Identifier' && d.init && d.init.type === 'CallExpression' && isFnExpr(d.init.callee)) return { f: d.init.callee, call: d.init, kind: 'var', stmt, declarator: d };
  }
  return null;
}
function dissolveRefusal(sh) {
  const f = sh.f;
  if (f.async || f.generator) return 'async/generator';
  if (f.params.some((p) => p.type !== 'Identifier')) return 'pattern-param';
  if (sh.call.arguments.length !== f.params.length) return 'arity';
  const body = f.body;
  if (body.type !== 'BlockStatement') return 'no-block';
  if (body.body.length && body.body[0].type === 'ExpressionStatement' && body.body[0].directive) return 'directive';
  const rets = [];
  let hard = null;
  walkShell(f, (n) => {
    if (hard) return;
    if (n.type === 'ReturnStatement') rets.push(n);
    if (n.type === 'ThisExpression') hard = 'this';
    if (n.type === 'MetaProperty') hard = 'new.target';
    if (n.type === 'Super') hard = 'super';
    if (n.type === 'ImportExpression') hard = 'import()';
    if (n.type === 'Identifier' && (n.name === 'arguments' || n.name === 'eval')) hard = n.name;
  });
  if (hard) return 'hard:' + hard;
  if (rets.length > 1) return 'multi-return';
  if (rets.length === 1 && body.body[body.body.length - 1] !== rets[0]) return 'mid-return';
  return null;
}
const takenOf = new Map();
for (const { block } of bodies) takenOf.set(block, directDeclNames(block));
const dissolved = new Map();
for (const { block } of bodies.slice().sort((a, b) => b.depth - a.depth)) {
  const taken = takenOf.get(block);
  for (const st of block.body) {
    const sh = shellShape(st);
    if (!sh) continue;
    stats.shellsSeen++;
    const why = dissolveRefusal(sh);
    if (why) { stats.refused.set(why, (stats.refused.get(why) || 0) + (st.end - st.start)); continue; }
    const names = directDeclNames(sh.f.body);
    for (const p of sh.f.params) names.add(p.name);   // params land as `var P=A`
    // NB: the shell's own binding (declarator id) stays where it is — it is NOT part of what moves.
    let clash = null;
    for (const nm of names) if (taken.has(nm)) { clash = nm; break; }
    if (clash) { stats.refused.set('name-clash', (stats.refused.get('name-clash') || 0) + (st.end - st.start)); continue; }
    for (const nm of names) taken.add(nm);
    const rets = sh.f.body.body.filter((s) => s.type === 'ReturnStatement');
    dissolved.set(st, { sh, ret: rets.length ? rets[rets.length - 1] : null });
    if (sh.declarator) stats.varShells.push(sh.declarator.id.name);   // `var X=(IIFE)()` -> `var X; ... X=(E)`: +1 occurrence
    stats.shells++; stats.shellBytes += st.end - st.start;
  }
}
if (process.env.DW_DEBUG === '1') {
  console.error('[DW] shells seen=' + stats.shellsSeen + ' dissolved=' + stats.shells + ' bytes=' + stats.shellBytes);
  console.error('[DW] refused: ' + [...stats.refused.entries()].map(([k, v]) => k + '=' + Math.round(v / 1024) + 'K').join('  '));
}
// ---------------------------------------------------------------- emitter
const chunks = [];
const emit = (text, o0 = null, o1 = null) => { if (text) chunks.push({ text, o0, o1 }); };
const emitRange = (a, b) => { if (b > a) emit(src.slice(a, b), a, b); };
function emitBody(block) {
  for (const st of block.body) {
    const dis = dissolved.get(st);
    if (dis) {
      if (dis.sh.kind === 'var') { emit('var '); emitRange(dis.sh.declarator.id.start, dis.sh.declarator.id.end); emit(';'); }
      emitShell(dis);
      continue;
    }
    emitWith(st);
  }
}
function emitShell(dis) {
  const { sh, ret } = dis;
  if (sh.f.params.length) {
    emit('var ');
    sh.f.params.forEach((p, i) => { if (i) emit(','); emitRange(p.start, p.end); emit('='); emitRange(sh.call.arguments[i].start, sh.call.arguments[i].end); });
    emit(';');
  }
  for (const st of sh.f.body.body) {
    if (ret && st === ret) continue;
    const inner = dissolved.get(st);
    if (inner) {
      if (inner.sh.kind === 'var') { emit('var '); emitRange(inner.sh.declarator.id.start, inner.sh.declarator.id.end); emit(';'); }
      emitShell(inner);
      continue;
    }
    emitWith(st);
  }
  if (ret && ret.argument) {
    if (sh.kind === 'var') { emitRange(sh.declarator.id.start, sh.declarator.id.end); emit('='); }
    emit('('); emitRange(ret.argument.start, ret.argument.end); emit(');');
  } else if (sh.kind === 'var') {
    emitRange(sh.declarator.id.start, sh.declarator.id.end); emit('=void 0;');
  }
}
function emitWith(st) {
  const inner = [];
  (function find(n) { for (const c of kids(n)) { const b = bodyOfFn(c); if (b) { inner.push(b); continue; } find(c); } })(st);
  if (!inner.length) { emitRange(st.start, st.end); return; }
  let cur = st.start;
  for (const b of inner) { emitRange(cur, b.start + 1); emitBody(b); emitRange(b.end - 1, b.end); cur = b.end; }
  emitRange(cur, st.end);
}
emitBody(master);
const outText1 = src.slice(0, master.start + 1) + chunks.map((c) => c.text).join('') + src.slice(master.end - 1);

// ---------------------------------------------------------------- gates for pass 1
function literalsOf(text) { const a = parse(text); const out = []; (function w(n) { const t = n.type; if (t === 'StringLiteral' || t === 'NumericLiteral' || t === 'BooleanLiteral' || t === 'NullLiteral' || t === 'BigIntLiteral' || t === 'RegExpLiteral') out.push(t[0] + ':' + (t === 'StringLiteral' ? n.value : text.slice(n.start, n.end))); for (const c of kids(n)) w(c); })(a); return out; }
let ok1 = true, msg1 = '';
try { parse(outText1); } catch (e) { ok1 = false; msg1 = e.message; }
gate.push(['dissolved output re-parses', ok1, msg1]);
if (ok1) {
  // NB: an IIFE's ARGUMENTS are textually after its body but evaluate BEFORE it, so the rewrite moves their
  // text to the front. The invariant that must hold is "same literals, same counts" (evaluation order is
  // preserved by construction: `var P=A;` sits exactly where the call sat).
  const la = literalsOf(src), lb = literalsOf(outText1);
  const ca = new Map(), cb = new Map();
  for (const x of la) ca.set(x, (ca.get(x) || 0) + 1);
  for (const x of lb) cb.set(x, (cb.get(x) || 0) + 1);
  const diff = [];
  for (const [k, v] of ca) if ((cb.get(k) || 0) !== v) diff.push(k.slice(0, 24));
  for (const [k, v] of cb) if ((ca.get(k) || 0) !== v && !diff.length) diff.push('+' + k.slice(0, 24));
  const same = diff.length === 0 && la.length === lb.length;
  gate.push(['literal multiset identical (dissolution evaluates the same literals)', same, same ? la.length + ' literals' : 'differs: ' + diff.slice(0, 3).join(' | ')]);
  const ids = (text) => { const out = []; (function w(n) { if (n.type === 'Identifier') out.push(n.name); for (const c of kids(n)) w(c); })(parse(text)); return out; };
  const ia = ids(src), ib = ids(outText1);
  const na = new Map(), nb = new Map();
  for (const x of ia) na.set(x, (na.get(x) || 0) + 1);
  for (const x of ib) nb.set(x, (nb.get(x) || 0) + 1);
  for (const nm of stats.varShells) na.set(nm, (na.get(nm) || 0) + 1);   // split into declaration + assignment
  const d2 = [];
  for (const [k, v] of na) if ((nb.get(k) || 0) !== v) d2.push(k + ':' + v + '->' + (nb.get(k) || 0));
  const same2 = d2.length === 0;
  gate.push(['identifier multiset identical (no reference lost or invented)', same2, same2 ? ia.length + ' identifiers' : d2.slice(0, 4).join(' ')]);
}
let outText = outText1;
if (process.env.DW_DEBUG === '1') { fs.writeFileSync('/tmp/deep/dissolve-debug.js', outText1); }

if (!gate.every((g) => g[1])) { console.error('GATE FAIL after dissolve — refusing to continue'); for (const g of gate) console.error('  ' + (g[1] ? 'PASS' : 'FAIL') + '  ' + g[0] + '  ' + g[2]); process.exit(1); }

// ---------------------------------------------------------------- pass 2: LIFT
if (DO_LIFT) {
  const ast2 = parse(outText);
  const bodies2 = [];
  (function w(n) { const b = bodyOfFn(n); if (b) bodies2.push(b); for (const c of kids(n)) w(c); })(ast2);
  let master2 = null;
  for (const b of bodies2) if (!master2 || (b.end - b.start) > (master2.end - master2.start)) master2 = b;
  const declCount = new Map(), allDeclNames = new Set();
  (function w(n) { if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier') { declCount.set(n.id.name, (declCount.get(n.id.name) || 0) + 1); allDeclNames.add(n.id.name); } if (n.type === 'FunctionDeclaration' && n.id) { declCount.set(n.id.name, (declCount.get(n.id.name) || 0) + 1); allDeclNames.add(n.id.name); } if (n.type === 'VariableDeclaration') for (const d of n.declarations) { const s = new Set(); collectPattern(d.id, s); for (const x of s) allDeclNames.add(x); } for (const c of kids(n)) w(c); })(ast2);
  const masterNames = directDeclNames(master2);
  function writesTo(name) { let hits = 0; (function w(n) { if (n.type === 'AssignmentExpression' && n.left.type === 'Identifier' && n.left.name === name) hits++; if (n.type === 'UpdateExpression' && n.argument.type === 'Identifier' && n.argument.name === name) hits++; for (const c of kids(n)) w(c); })(ast2); return hits; }
  function pureInit(n, allowFns) {
    if (!n) return false;
    switch (n.type) {
      case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': case 'BigIntLiteral': case 'RegExpLiteral': return true;
      case 'TemplateLiteral': return n.expressions.length === 0;
      case 'ArrayExpression': return n.elements.every((e) => e === null || pureInit(e, allowFns));
      case 'ObjectExpression': return n.properties.every((p) => p.type === 'ObjectProperty' && !p.computed && (pureInit(p.value, allowFns) || (allowFns && (p.value.type === 'FunctionExpression' || p.value.type === 'ArrowFunctionExpression'))));
      case 'UnaryExpression': return (n.operator === '-' || n.operator === '+') && pureInit(n.argument, allowFns);
      case 'FunctionExpression': case 'ArrowFunctionExpression': return !!allowFns;
      default: return false;
    }
  }
  // free identifiers of the init: references that are not bound inside it (function params/locals/props)
  function freeNames(node) {
    const bound = new Set();
    const free = new Set();
    (function declare(params) { for (const p of params) collectPattern(p, bound); })([]);
    (function w(n, scopes) {
      if (!n || typeof n.type !== 'string') return;
      if (n.type === 'Identifier') {
        if (!scopes.has(n.name)) free.add(n.name);
        return;
      }
      if (n.type === 'MemberExpression' && !n.computed) { w(n.object, scopes); return; }
      if (n.type === 'ObjectProperty' && !n.computed) { w(n.value, scopes); return; }
      if (n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression' || n.type === 'FunctionDeclaration') {
        const inner = new Set(scopes);
        for (const p of n.params) collectPattern(p, inner);
        if (n.body.type === 'BlockStatement') for (const st of n.body.body) { if (st.type === 'VariableDeclaration') for (const d of st.declarations) collectPattern(d.id, inner); }
        if (n.id) inner.add(n.id.name);
        for (const c of kids(n)) { if (c === n.id) continue; w(c, inner); }
        return;
      }
      for (const c of kids(n)) w(c, scopes);
    })(node, bound);
    return free;
  }
  const funcs = new Map();
  (function w(n) { if (n.type === 'FunctionDeclaration' && n.id) funcs.set(n.id.name, n); if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.type === 'FunctionExpression') funcs.set(n.id.name, n.init); for (const c of kids(n)) w(c); })(ast2);
  const mentions = (node, name) => { let hit = false; (function w(n) { if (n.type === 'Identifier' && n.name === name) hit = true; for (const c of kids(n)) w(c); })(node); return hit; };
  const callsIn = (node) => { const s = new Set(); (function w(n) { if (n.type === 'CallExpression' && n.callee.type === 'Identifier') s.add(n.callee.name); for (const c of kids(n)) w(c); })(node); return s; };
  function readersOf(name) { const set = new Set(); for (const [fn, node] of funcs) if (mentions(node, name)) set.add(fn); let grew = true; while (grew) { grew = false; for (const [fn, node] of funcs) { if (set.has(fn)) continue; for (const c of callsIn(node)) if (set.has(c)) { set.add(fn); grew = true; break; } } } return set; }
  const cands = [];
  for (const block of bodies2) {
    if (block === master2) continue;
    for (const st of block.body) {
      if (st.type !== 'VariableDeclaration' || st.declarations.length !== 1) continue;
      const d = st.declarations[0];
      if (d.id.type !== 'Identifier' || !d.init) continue;
      const size = d.end - d.start;
      if (size < LIFT_MIN) continue;
      if ((declCount.get(d.id.name) || 0) !== 1) { stats.liftRefused.set('name-not-unique', (stats.liftRefused.get('name-not-unique') || 0) + size); continue; }
      if (writesTo(d.id.name) > 0) { stats.liftRefused.set('binding-written', (stats.liftRefused.get('binding-written') || 0) + size); continue; }
      if (!pureInit(d.init, true)) { stats.liftRefused.set('init-not-pure', (stats.liftRefused.get('init-not-pure') || 0) + size); continue; }
      const free = [...freeNames(d.init)];
      const badFree = free.filter((nm) => !masterNames.has(nm) && allDeclNames.has(nm));
      if (badFree.length) { stats.liftRefused.set('free-name-not-at-master', (stats.liftRefused.get('free-name-not-at-master') || 0) + size); continue; }
      cands.push({ st, d, name: d.id.name, size });
    }
  }
  const plan = [];
  for (const c of cands) {
    const readers = readersOf(c.name);
    let insertAt = master2.body.length;
    for (let i = 0; i < master2.body.length; i++) {
      const S = master2.body[i];
      if (S.type === 'FunctionDeclaration') continue;
      let hit = mentions(S, c.name);
      if (!hit) for (const callee of callsIn(S)) if (readers.has(callee)) { hit = true; break; }
      if (hit) { insertAt = i; break; }
    }
    // The declaration is a pure literal, so it can be built as early as the flow's first statement: no read
    // can precede it, and the scatter pass then has the whole body as room for its pushes.
    plan.push({ ...c, insertAt: 0, earliestReader: insertAt, readers: readers.size });
  }
  const edits = [];
  for (const p of plan) {
    edits.push({ at: p.st.start, end: p.st.end, text: '' });
    const anchor = master2.body[p.insertAt];
    edits.push({ at: anchor.start, end: anchor.start, text: outText.slice(p.st.start, p.st.end) + '\n' });
    stats.lifted.push({ name: p.name, size: p.size, insertAt: p.insertAt, earlierReader: p.earliestReader, readers: p.readers });
    stats.liftedBytes += p.size;
  }
  edits.sort((a, b) => b.at - a.at || b.end - a.end);
  let text = outText;
  if (process.env.DW_DEBUG === '1') {
    for (const e of edits) {
      const next = text.slice(0, e.at) + e.text + text.slice(e.end);
      let good = true, emsg = '';
      try { parse(next); } catch (err) { good = false; emsg = err.message; }
      if (!good) {
        console.error(`   [lift-edit] FIRST BREAK at ${e.at}..${e.end} text=${JSON.stringify(e.text.slice(0, 60))}`);
        console.error(`      before: ${JSON.stringify(text.slice(Math.max(0, e.at - 80), e.at + 40))}`);
        console.error(`      error : ${emsg}`);
        break;
      }
      text = next;
    }
  } else {
    for (const e of edits) text = text.slice(0, e.at) + e.text + text.slice(e.end);
  }
  let ok = true, msg = '';
  try { parse(text); } catch (err) { ok = false; msg = err.message; }
  gate.push(['lifted output re-parses', ok, msg]);
  if (ok) {
    const ast3 = parse(text);
    const after = new Map();
    (function w(n) { if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier') after.set(n.id.name, (after.get(n.id.name) || 0) + 1); for (const c of kids(n)) w(c); })(ast3);
    const bad = stats.lifted.filter((l) => (after.get(l.name) || 0) !== 1);
    gate.push(['every lifted name has exactly one declaration', bad.length === 0, bad.length ? bad.map((b) => b.name).join(',') : stats.lifted.length + ' names']);
  }
  outText = text;
  if (process.env.DW_DEBUG === '1') fs.writeFileSync('/tmp/deep/lift-debug.js', text);
}

// ---------------------------------------------------------------- pass 3: EXTRACT (table runs)
// The splitter leaves a table's run (`var T=[]; T.push(...)`) inside the carrier that reads it. That keeps
// evaluation at the read point but welds the run into one band no placement can separate. The run may move
// to the master flow when the table is self-contained:
//   * `T` is declared exactly once, its run is the only thing that writes it (no `T[i]=`, `T.p=`, delete,
//     no pushes from elsewhere) — so nothing can see a half-built table through a write;
//   * every element pushed is a pure literal (no calls, no time), so building it earlier is unobservable;
//   * placement rule: the run sits BEFORE the first statement that can *reach a read* of `T` (below).
// Readers that live behind a call keep working: they see a finished table.
if (process.env.EXTRACT !== '0') {
  const ast3 = parse(outText);
  const isMemberWriteOf = (n, name) => n.type === 'ExpressionStatement' && n.expression.type === 'AssignmentExpression' && n.expression.operator === '=' && n.expression.left.type === 'MemberExpression' && n.expression.left.object.type === 'Identifier' && n.expression.left.object.name === name;
  const isPushOf = (n, name) => n.type === 'ExpressionStatement' && n.expression.type === 'CallExpression' &&
    n.expression.callee.type === 'MemberExpression' && !n.expression.callee.computed &&
    n.expression.callee.property.type === 'Identifier' && n.expression.callee.property.name === 'push' &&
    n.expression.callee.object.type === 'Identifier' && n.expression.callee.object.name === name;
  const runDeclOf = (st) => {
    if (st.type !== 'VariableDeclaration') return null;
    for (const d of st.declarations) {
      if (d.id.type === 'Identifier' && d.init && d.init.type === 'ArrayExpression' && d.init.elements.length === 0) return { name: d.id.name, kind: 'empty' };
      if (d.id.type === 'Identifier' && d.init && d.init.type === 'ObjectExpression' && d.init.properties.length === 0) return { name: d.id.name, kind: 'emptyobj' };
      if (d.id.type === 'Identifier' && d.init && d.init.type === 'ArrayExpression' && d.init.elements.every((e) => e === null || pureInitTop(e))) return { name: d.id.name, kind: 'literal' };
    }
    return null;
  };
  function pureInitTop(n) {
    switch (n.type) {
      case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': case 'BigIntLiteral': case 'RegExpLiteral': return true;
      case 'TemplateLiteral': return n.expressions.length === 0;
      case 'ArrayExpression': case 'ObjectExpression': return n.elements ? n.elements.every((e) => e === null || pureInitTop(e)) : n.properties.every((p) => p.type === 'ObjectProperty' && !p.computed && pureInitTop(p.value));
      case 'UnaryExpression': return (n.operator === '-' || n.operator === '+') && pureInitTop(n.argument);
      default: return false;
    }
  }
  const bodies3 = [];
  (function w(n) { const b = bodyOfFn(n); if (b) bodies3.push(b); for (const c of kids(n)) w(c); })(ast3);
  let master3 = null;
  for (const b of bodies3) if (!master3 || (b.end - b.start) > (master3.end - master3.start)) master3 = b;
  const declCount = new Map();
  (function w(n) { if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier') declCount.set(n.id.name, (declCount.get(n.id.name) || 0) + 1); for (const c of kids(n)) w(c); })(ast3);
  // all push statements, by binding
  const pushes = new Map();
  const addRun = (nm, n) => { if (!pushes.has(nm)) pushes.set(nm, []); pushes.get(nm).push(n); };
  (function w(n) {
    if (n.type === 'ExpressionStatement') {
      const e = n.expression;
      if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && !e.callee.computed && e.callee.property.type === 'Identifier' && e.callee.property.name === 'push' && e.callee.object.type === 'Identifier') addRun(e.callee.object.name, n);
      else if (isMemberWriteOf(n, e.left && e.left.object && e.left.object.type === 'Identifier' ? e.left.object.name : null)) addRun(e.left.object.name, n);
    }
    for (const c of kids(n)) w(c);
  })(ast3);
  // writes into a table
  const badWrite = new Set();
  (function w(n) {
    const into = (x) => x && x.type === 'MemberExpression' && x.object.type === 'Identifier' ? x.object.name : null;
    if (n.type === 'AssignmentExpression') { const nm = into(n.left); if (nm) badWrite.add(nm); }
    if (n.type === 'UpdateExpression') { const nm = into(n.argument); if (nm) badWrite.add(nm); }
    if (n.type === 'UnaryExpression' && n.operator === 'delete') { const nm = into(n.argument); if (nm) badWrite.add(nm); }
    for (const c of kids(n)) w(c);
  })(ast3);
  // any push used as a sub-expression rather than a statement is not extractable
  const stmtPushCalls = new Set();
  for (const list of pushes.values()) for (const p of list) stmtPushCalls.add(p.expression);
  const inlinePush = new Set();
  (function w(n) { if (n.type === 'CallExpression' && n.callee.type === 'MemberExpression' && !n.callee.computed && n.callee.property.type === 'Identifier' && n.callee.property.name === 'push' && n.callee.object.type === 'Identifier' && !stmtPushCalls.has(n)) inlinePush.add(n.callee.object.name); for (const c of kids(n)) w(c); })(ast3);
  if (process.env.DW_DEBUG === '1') console.error('[EXTRACT] bodies=' + bodies3.length + ' pushBindings=' + pushes.size + ' pushStmts=' + [...pushes.values()].reduce((a, l) => a + l.length, 0) + ' badWrite=' + badWrite.size);
  // A run may only leave its body when nothing BETWEEN its statements can reach a read of the binding:
  // a table that is built while other statements consume it (measured: `latt700`, whose four pushes are
  // interleaved with readers) must stay where it is — pulling its pushes to the front changes what those
  // readers see.
  const namedFns = new Map();
  (function w(n) {
    if (n.type === 'FunctionDeclaration' && n.id && n.id.type === 'Identifier') namedFns.set(n.id.name, n);
    if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.type === 'FunctionExpression') namedFns.set(n.id.name, n.init);
    for (const c of kids(n)) w(c);
  })(ast3);
  // "Reaches a read" must mean EXECUTES a read at this position. A closure that merely mentions the binding
  // (`return (carrier = function(){ return T })()`) creates a function value and nothing else — measured:
  // treating it as a reader refused every table, because every carrier ends with exactly that memo line.
  // So nested function bodies are skipped unless they are immediately invoked.
  const isFnNode = (n) => n && (n.type === 'FunctionExpression' || n.type === 'FunctionDeclaration' || n.type === 'ArrowFunctionExpression' || n.type === 'ObjectMethod' || n.type === 'ClassMethod');
  function execWalk(node, cb) {
    (function w(n, parent) {
      if (!n || typeof n.type !== 'string') return;
      if (isFnNode(n)) {
        const invoked = parent && parent.type === 'CallExpression' && parent.callee === n;
        if (!invoked) return;                       // a definition or a closure value: nothing executes here
      }
      cb(n, parent);
      for (const c of kids(n)) w(c, n);
    })(node, null);
  }
  const mentions = (node, name) => { let hit = false; execWalk(node, (n) => { if (n.type === 'Identifier' && n.name === name) hit = true; }); return hit; };
  const callsOf = (node) => { const out = new Set(); execWalk(node, (n) => { if (n.type === 'CallExpression' && n.callee.type === 'Identifier') out.add(n.callee.name); }); return out; };
  const readerCache2 = new Map();
  function readerFns2(name) {
    if (readerCache2.has(name)) return readerCache2.get(name);
    const set = new Set();
    for (const [fn, node] of namedFns) if (mentions(node, name)) set.add(fn);
    let grew = true;
    while (grew) { grew = false; for (const [fn, node] of namedFns) { if (set.has(fn)) continue; for (const c of callsOf(node)) if (set.has(c)) { set.add(fn); grew = true; break; } } }
    readerCache2.set(name, set);
    return set;
  }
  function reaches(node, name) {
    if (node.type === 'FunctionDeclaration') return false;
    if (mentions(node, name)) return true;
    const readers = readerFns2(name);
    for (const c of callsOf(node)) if (readers.has(c)) return true;
    return false;
  }
  // enclosing function for a body node (nearest function node whose body is this block)
  const fnOfBody = new Map();
  (function w(n) { if (isFnNode(n) && n.body && n.body.type === 'BlockStatement') fnOfBody.set(n.body, n); for (const c of kids(n)) w(c); })(ast3);
  // Is the name ever handed to code as a call ARGUMENT (`f(carrier, n)`)? That is the escape that matters:
  // such code can call it whenever it likes, outside the read edges the placement rule relies on.
  function passedAsArgument(name) {
    let hit = false;
    (function w(n) {
      if (n.type === 'CallExpression') {
        for (const a of n.arguments) if (a.type === 'Identifier' && a.name === name) hit = true;
      }
      for (const c of kids(n)) w(c);
    })(ast3);
    return hit;
  }
  const edits = [], moved = [];
  let seenDecls = 0, seenWithPush = 0;
  for (const b of bodies3) {
    if (b === master3) continue;
    for (const st of b.body) {
      const rd = runDeclOf(st);
      if (!rd || !rd.name) continue;
      if (process.env.EXTRACT_ONLY && !process.env.EXTRACT_ONLY.split(',').includes(rd.name)) continue;
      seenDecls++;
      const run = pushes.get(rd.name) || [];
      if (!run.length) continue;
      seenWithPush++;                                        // monolithic literal: nothing to spread
      if ((declCount.get(rd.name) || 0) !== 1 || badWrite.has(rd.name) || inlinePush.has(rd.name)) {
        if (process.env.DW_DEBUG === '1') console.error('   [extract-refuse] ' + rd.name + ' decls=' + (declCount.get(rd.name) || 0) + ' badWrite=' + badWrite.has(rd.name) + ' inlinePush=' + inlinePush.has(rd.name) + ' pushes=' + run.length);
        stats.extractRefused.set('self-contained-fail', (stats.extractRefused.get('self-contained-fail') || 0) + (st.end - st.start)); continue;
      }
      if (rd.kind === 'literal' && !st.declarations[0].init.elements.every((e) => e === null || pureInitTop(e))) { stats.extractRefused.set('impure-elements', (stats.extractRefused.get('impure-elements') || 0) + (st.end - st.start)); continue; }
      // A carrier that ESCAPES as a value (`f(carrier, n)` — a retry loop holding it) can be called from
      // code the reader map does not model. Measured: `latt700`, whose carrier is passed to a rotating retry
      // loop; extracting it hangs the payload while the other fourteen are clean. Only a carrier reachable
      // solely through direct calls and its own memo assignment is provably tied to a read we can see.
      {
        const host = fnOfBody.get(b);
        const hname = host && host.id && host.id.name;
        const listed = process.env.EXTRACT_ONLY && process.env.EXTRACT_ONLY.split(',').includes(rd.name);
        if (!listed && hname && passedAsArgument(hname)) {
          stats.extractRefused.set('carrier-escapes', (stats.extractRefused.get('carrier-escapes') || 0) + (st.end - st.start));
          if (process.env.DW_DEBUG === '1') console.error('   [extract-refuse] ' + rd.name + ' carrier-escapes (' + hname + ')');
          continue;
        }
      }
      // nothing between the run's statements may reach a read of the binding
      {
        const runSet = new Set(run);
        let interleaved = false;
        const last = run[run.length - 1];
        for (const other of b.body) {
          if (other === st || runSet.has(other)) continue;
          if (other.start < st.start) continue;
          if (other.start > last.end) continue;
          if (reaches(other, rd.name)) { interleaved = true; if (process.env.DW_DEBUG === '1') console.error('   [extract-refuse] ' + rd.name + ' interleaved by ' + other.type + ' @' + other.start + ': ' + JSON.stringify(outText.slice(other.start, other.start + 70))); break; }
        }
        if (interleaved) { stats.extractRefused.set('interleaved-reader', (stats.extractRefused.get('interleaved-reader') || 0) + (st.end - st.start)); continue; }
      }
      // every pushed element must be a pure literal
      let impure = false;
      for (const p of run) {
        const e = p.expression;
        if (e.type === 'CallExpression') { for (const a of e.arguments) if (!pureInitTop(a) && !(a.type === 'SpreadElement' && pureInitTop(a.argument))) { impure = true; break; } }
        else if (e.type === 'AssignmentExpression') { if (!pureInitTop(e.right) && !(e.right.type === 'FunctionExpression' || e.right.type === 'ArrowFunctionExpression')) { impure = true; break; } }
      }
      if (impure) { stats.extractRefused.set('impure-push', (stats.extractRefused.get('impure-push') || 0) + (st.end - st.start)); continue; }
      const text = outText.slice(st.start, st.end) + run.map((p) => outText.slice(p.start, p.end)).join('');
      edits.push({ at: st.start, end: st.end, text: '' });
      for (const p of run) edits.push({ at: p.start, end: p.end, text: '' });
      edits.push({ at: master3.body[0].start, end: master3.body[0].start, text: text });
      moved.push({ name: rd.name, kind: rd.kind, pushes: run.length, bytes: text.length });
      stats.extractBytes += text.length;
    }
  }
  if (process.env.DW_DEBUG === '1') console.error('[EXTRACT] runDecls seen=' + seenDecls + ' with pushes=' + seenWithPush + ' moved=' + moved.length);
  if (moved.length) {
    edits.sort((a, b2) => (b2.at - a.at) || (b2.end - a.end));
    let text = outText;
    for (const e of edits) text = text.slice(0, e.at) + e.text + text.slice(e.end);
    let ok = true, msg = '';
    try { parse(text); } catch (err) { ok = false; msg = err.message; }
    gate.push(['extracted output re-parses', ok, msg]);
    if (ok) {
      const lits = (t) => { const out = []; (function w(n) { const ty = n.type; if (ty === 'StringLiteral' || ty === 'NumericLiteral' || ty === 'BooleanLiteral' || ty === 'NullLiteral' || ty === 'BigIntLiteral' || ty === 'RegExpLiteral') out.push(ty[0] + ':' + (ty === 'StringLiteral' ? n.value : t.slice(n.start, n.end))); for (const c of kids(n)) w(c); })(parse(t)); return out; };
      const la = lits(outText), lb = lits(text);
      const ca = new Map(), cb = new Map();
      for (const x of la) ca.set(x, (ca.get(x) || 0) + 1);
      for (const x of lb) cb.set(x, (cb.get(x) || 0) + 1);
      let same = la.length === lb.length; for (const [k, v] of ca) if ((cb.get(k) || 0) !== v) same = false;
      gate.push(['extracted literal multiset identical', same, la.length + ' literals']);
      if (same) { outText = text; stats.extractMoved = moved; }
    }
  }
}
// ---------------------------------------------------------------- output
if (!gate.every((g) => g[1])) { console.error('GATE FAIL — refusing to write'); for (const g of gate) console.error('  ' + (g[1] ? 'PASS' : 'FAIL') + '  ' + g[0] + '  ' + g[2]); process.exit(1); }
const summary = {
  phase: 'deep-weave',
  shells_dissolved: stats.shells, shells_seen: stats.shellsSeen, shell_bytes: stats.shellBytes,
  dissolve_refused: Object.fromEntries([...stats.refused.entries()].map(([k, v]) => [k, Math.round(v / 1024) + 'K'])),
  lifted: stats.lifted.length, lifted_bytes: stats.liftedBytes,
  lift_refused: Object.fromEntries([...stats.liftRefused.entries()].map(([k, v]) => [k, Math.round(v / 1024) + 'K'])),
  in_len: src.length, out_len: outText.length, gates: gate.map((g) => (g[1] ? 'PASS ' : 'FAIL ') + g[0] + (g[2] ? '  ' + g[2] : '')),
};
if (APPLY) {
  fs.writeFileSync(outPath, outText);
  console.log('[DISSOLVE] ' + stats.shells + ' of ' + stats.shellsSeen + ' shells dissolved — ' + Math.round(stats.shellBytes / 1024) + 'K moved into the flow');
  if (stats.refused.size) console.log('[DISSOLVE] refused : ' + [...stats.refused.entries()].map(([k, v]) => k + '=' + Math.round(v / 1024) + 'K').join('  '));
  console.log('[LIFT]     ' + stats.lifted.length + ' declarations lifted — ' + Math.round(stats.liftedBytes / 1024) + 'K');
  if (stats.liftRefused.size) console.log('[LIFT]     refused : ' + [...stats.liftRefused.entries()].map(([k, v]) => k + '=' + Math.round(v / 1024) + 'K').join('  '));
  if (stats.extractMoved.length) console.log('[EXTRACT]  ' + stats.extractMoved.length + ' table runs moved to the master flow — ' + Math.round(stats.extractBytes / 1024) + 'K of pushes'); 
  if (stats.extractMoved.length && process.env.DW_DEBUG === '1') console.error('[DW] moved: ' + stats.extractMoved.map((m) => m.name + '(' + m.pushes + ')').join(' '));
  if (stats.extractRefused.size) console.log('[EXTRACT]  refused : ' + [...stats.extractRefused.entries()].map(([k, v]) => k + '=' + Math.round(v / 1024) + 'K').join('  '));
  console.log('[GATES]');
  for (const g of gate) console.log('   ' + (g[1] ? 'PASS' : 'FAIL') + '  ' + g[0] + (g[2] ? '  ' + g[2] : ''));
  console.log('written    : ' + outPath + ' (' + outText.length + ' chars, ' + (outText.length - src.length >= 0 ? '+' : '') + (outText.length - src.length) + ')');
}
if (AS_JSON) console.log(JSON.stringify(summary, null, 1));
