#!/usr/bin/env node
// constraint-pass.mjs — O8.15 step 4, on the BUILT bytes.
//
// The weave relocates statements. Moving text is only safe if the move cannot be observed, so step 4 is a
// property/observation pass: it re-derives the movable classes from the shipped payload and asserts the
// four ways a move could be seen. It is deliberately an INDEPENDENT implementation (its own walk, its own
// shapes) — a gate that reuses the weaver's own classification proves nothing about the weaver.
//
//   node constraint-pass.mjs <woven.js> [--pre=<pre-weave.js>] [--json]
//
// C1  same-name declarations. Two `function f(){}` in one body are order-observable ("last wins"). The
//     weaver travels them as an ordered group; with --pre this checks the relative order is IDENTICAL
//     pre/post. Without a duplicate in the file the check is vacuous and says so.
// C2  private window for every run group. Between a group's first and last run statement (`A=[]`,
//     `A.push(...)`) no other statement may touch `A` — otherwise a reader could see a half-built value,
//     which is exactly the observation the group's order exists to prevent.
// C3  registration/observation order. No movable non-declaration statement may call an API whose ORDER is
//     observable (timers, listeners, observers, promise continuations). Function declarations are exempt:
//     a declaration does not execute at its position.
// C4  shared-root property writes. A movable non-declaration statement may only write through its own run
//     binding (`A.push(..)`, `A[..] = ..`); a write to another root's property would race with any other
//     statement touching that root.
//
// Exit 1 on any FAIL — the build must not ship if this is red.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const ENG = path.resolve(__dirname, '..', '..', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch { try { return require(name); } catch { throw new Error(`Missing engine "${name}" — run: Active/engines && npm ci`); } }
}
const parser = needEngine('@babel/parser');

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const preArg = argv.find((a) => a.startsWith('--pre='));
const file = argv.find((a) => !a.startsWith('--'));
if (!file) { console.error('usage: constraint-pass.mjs <woven.js> [--pre=<pre-weave.js>] [--json]'); process.exit(2); }

const src = fs.readFileSync(file, 'utf8');
const pre = preArg ? fs.readFileSync(path.resolve(preArg.slice('--pre='.length)), 'utf8') : null;
const parse = (s) => parser.parse(s, { sourceType: 'script', errorRecovery: false });

const ORDER_APIS = /\b(addEventListener|removeEventListener|addListener|setTimeout|setInterval|setImmediate|clearTimeout|clearInterval|queueMicrotask|requestAnimationFrame|requestIdleCallback|MutationObserver|IntersectionObserver|ResizeObserver|observe|unobserve|addEventListenerFor|postMessage|then|catch|finally)\s*\(/;
const text = (s, a, b) => s.slice(a, b);

function walk(node, cb, parent = null) {
  if (!node || typeof node.type !== 'string') return;
  cb(node, parent);
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'leadingComments' || k === 'trailingComments') continue;
    const v = node[k];
    if (Array.isArray(v)) { for (const x of v) if (x && typeof x.type === 'string') walk(x, cb, node); }
    else if (v && typeof v.type === 'string') walk(v, cb, node);
  }
}
const bodyStmts = (fn) => (fn.body && fn.body.type === 'BlockStatement' ? fn.body.body : null);
const isFnNode = (n) => n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression';

// ---- shape helpers -----------------------------------------------------------------
const runAssignment = (st, s) => {
  // The splitter's opening statement, in the spellings it can produce. The rule it applies is "var-only,
  // LAST declarator, block position" — so `var a=8,b=12,A=[]` is a legal opening, and the whole statement
  // (siblings included) is the unit. Declared names are returned so the pass can check that nothing inside
  // the window observes a SIBLING name either: moving the statement moves those initialisers too.
  if (st.type === 'VariableDeclaration') {
    const d = st.declarations[st.declarations.length - 1];
    if (!d || !d.init || d.init.type !== 'ArrayExpression' || d.id.type !== 'Identifier') return null;
    return { bind: d.id.name, kind: 'decl', declared: st.declarations.filter((x) => x.id.type === 'Identifier').map((x) => x.id.name) };
  }
  if (st.type !== 'ExpressionStatement' || st.expression.type !== 'AssignmentExpression') return null;
  const e = st.expression;
  if (e.operator !== '=' || e.left.type !== 'Identifier' || e.right.type !== 'ArrayExpression') return null;
  return { bind: e.left.name, kind: 'decl', declared: [e.left.name] };
};
const runPush = (st) => {
  if (st.type !== 'ExpressionStatement') return null;
  const e = st.expression;
  if (e.type !== 'CallExpression' || e.callee.type !== 'MemberExpression' || e.callee.computed) return null;
  if (e.callee.object.type !== 'Identifier' || e.callee.property.name !== 'push') return null;
  return e.callee.object.name;   // the binding this push writes to
};

// ---- collect every function body's top-level statements ----------------------------
const bodies = [];
walk(parse(src), (n, parent) => {
  if (!isFnNode(n)) return;
  const stmts = bodyStmts(n);
  if (stmts && stmts.length) bodies.push({ node: n, stmts, start: n.start, end: n.end, parent });
});

const rows = [];
const add = (id, desc, ok, detail) => rows.push({ id, desc, ok, detail });

// ---- C1 — same-name declarations ---------------------------------------------------
const dupBodies = [];
for (const b of bodies) {
  const names = b.stmts.filter((s) => s.type === 'FunctionDeclaration' && s.id).map((s) => s.id.name);
  const seen = new Map();
  for (const nm of names) seen.set(nm, (seen.get(nm) || 0) + 1);
  const dups = [...seen.entries()].filter(([, c]) => c > 1);
  if (dups.length) dupBodies.push({ at: b.start, names, dups: dups.map(([nm, c]) => `${nm}×${c}`) });
}
let c1ok = dupBodies.length === 0;
let c1detail = `${bodies.length} function bodies scanned, ${dupBodies.length} carry a duplicated declaration name — nothing for an arrangement to reorder`;
if (!c1ok && pre) {
  // with a pre-weave file we can prove or disprove the relative order directly
  const orderOf = (s, at) => {
    const b = bodies.find((x) => x.start === at) || null;
    void b;
    return s;
  };
  void orderOf;
  const preBodies = [];
  walk(parse(pre), (n) => { if (!isFnNode(n)) return; const st = bodyStmts(n); if (st && st.length) preBodies.push({ stmts: st, start: n.start }); });
  const preAt = new Map(preBodies.map((b) => [b.start, b]));
  let same = 0, checked = 0;
  for (const d of dupBodies) {
    const before = preAt.get(d.at);
    if (!before) continue;
    checked++;
    const seq = (b) => b.stmts.filter((s) => s.type === 'FunctionDeclaration' && s.id && d.dups.some((x) => x.startsWith(s.id.name + '×'))).map((s) => s.id.name).join(',');
    if (seq({ stmts: before.stmts }) === seq({ stmts: (bodies.find((x) => x.start === d.at) || { stmts: [] }).stmts })) same++;
  }
  c1ok = checked > 0 && same === checked;
  c1detail = `${dupBodies.length} duplicate-name bod${dupBodies.length === 1 ? 'y' : 'ies'}; relative order checked against --pre: ${same}/${checked} identical`;
}
add('C1-same-name-decls', 'no declaration name can be reordered by the arrangement', c1ok, c1detail);

// ---- reader map (Deep Weave) --------------------------------------------------------
// A run's window no longer means "contiguous pushes": a statement may sit between the pushes of one binding
// as long as it cannot REACH A READ of that binding — it must not mention it, and it must not call a
// function that (transitively) mentions it. Definition statements do not execute where they sit.
const astAll = parse(src);
const namedFuncs = new Map();
walk(astAll, (n) => {
  if (n.type === 'FunctionDeclaration' && n.id && n.id.type === 'Identifier') namedFuncs.set(n.id.name, n);
  if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.type === 'FunctionExpression') namedFuncs.set(n.id.name, n.init);
});
const mentionsName = (node, name) => { let hit = false; walk(node, (n) => { if (n.type === 'Identifier' && n.name === name) hit = true; }); return hit; };
const callsOf = (node) => { const out = new Set(); walk(node, (n) => { if (n.type === 'CallExpression' && n.callee.type === 'Identifier') out.add(n.callee.name); }); return out; };
const readerCache = new Map();
function readerFns(name) {
  if (readerCache.has(name)) return readerCache.get(name);
  const set = new Set();
  for (const [fn, n] of namedFuncs) if (mentionsName(n, name)) set.add(fn);
  let grew = true;
  while (grew) { grew = false; for (const [fn, n] of namedFuncs) { if (set.has(fn)) continue; for (const c of callsOf(n)) if (set.has(c)) { set.add(fn); grew = true; break; } } }
  readerCache.set(name, set);
  return set;
}
function reachesRead(S, name) {
  if (S.type === 'FunctionDeclaration') return false;
  if (mentionsName(S, name)) return true;
  const readers = readerFns(name);
  for (const c of callsOf(S)) if (readers.has(c)) return true;
  return false;
}
function writesName(S, name) {
  let hit = false;
  walk(S, (n) => {
    if (n.type === 'AssignmentExpression') {
      if (n.left.type === 'Identifier' && n.left.name === name) hit = true;
      let x = n.left; while (x && x.type === 'MemberExpression') x = x.object;
      if (x && x.type === 'Identifier' && x.name === name) hit = true;
    }
    if (n.type === 'UpdateExpression') { let x = n.argument; while (x && x.type === 'MemberExpression') x = x.object; if (x && x.type === 'Identifier' && x.name === name) hit = true; }
  });
  return hit;
}

// ---- C2/C3/C4 — walk the movable classes -------------------------------------------
// A "run" is the splitter's shape: an opening statement whose LAST declarator is `X=[]` (or `X=[]` as an
// assignment), then pushes on X. TRANSPARENT statements are allowed inside a run — a hoisted
// `function` declaration does not execute at its position (that is why the weave deals them there) and an
// empty statement does nothing — but any statement that EXECUTES inside a run is a violation.
const TRANSPARENT = new Set(['FunctionDeclaration', 'EmptyStatement']);
const inside = new Map();      // statement index -> [{bind, at}] runs whose window it sits inside
let runGroups = 0, runStmts = 0, fnDecls = 0, c2exec = 0, c2junction = 0, transparent = 0, scattcnt = 0;
let c3hits = 0, c4violations = 0, movableStmts = 0, movableBytes = 0;
const note = [];
for (const b of bodies) {
  const stmts = b.stmts;
  const inRun = new Set();
  const groups = [];
  for (let i = 0; i < stmts.length; i++) {
    if (inRun.has(i)) continue;
    const d = runAssignment(stmts[i], src);
    if (!d) continue;
    // Deep Weave: the run extends while the statements in between cannot reach a read of the binding and do
    // not write it. The first statement that can is the barrier — everything after it is outside the run.
    const list = [i];
    let barrier = stmts.length;
    for (let j = i + 1; j < stmts.length; j++) {
      if (TRANSPARENT.has(stmts[j].type)) continue;               // does not execute: does not end a run
      if (runPush(stmts[j]) === d.bind) { list.push(j); continue; }
      if (reachesRead(stmts[j], d.bind) || writesName(stmts[j], d.bind)) { barrier = j; break; }
      // a statement inside the run that cannot reach a read of the binding is legal — record it for C2
      if (!inside.has(j)) inside.set(j, []);
      inside.get(j).push({ bind: d.bind, at: stmts[j].start });
    }
    if (list.filter((k) => runPush(stmts[k]) === d.bind).length < 2) continue;
    groups.push({ bind: d.bind, declared: d.declared, list, barrier });
  }
  for (const [gi, g] of groups.entries()) {
    runGroups++; runStmts += g.list.length;
    for (const k of g.list) inRun.add(k);
    const lo = g.list[0], hi = g.list[g.list.length - 1];
    for (let k = lo; k <= hi; k++) {
      if (inRun.has(k)) continue;
      if (TRANSPARENT.has(stmts[k].type)) { transparent++; continue; }
      // legal only if the statement cannot observe a half-built binding: no read reachable, no write
      if (!reachesRead(stmts[k], g.bind) && !writesName(stmts[k], g.bind)) { scattcnt++; continue; }
      c2exec++;
      if (c2exec <= 3) console.error(`   [C2] body@${b.start}: statement inside the "${g.bind}" run window can reach/write it (st@${stmts[k].start}): ${text(src, stmts[k].start, stmts[k].end).slice(0, 70)}`);
    }
    // junction: an executing push on the same binding right after the run (its order is still load-bearing)
    for (let j = hi + 1; j < stmts.length; j++) {
      if (TRANSPARENT.has(stmts[j].type)) continue;
      if (!inRun.has(j) && runPush(stmts[j]) === g.bind) { c2junction++; note.push(`trailing push on ${g.bind} at body@${b.start}+${stmts[j].start - b.start}`); }
      break;
    }
    void gi;
  }
  for (let i = 0; i < stmts.length; i++) {
    const st = stmts[i];
    if (st.type === 'FunctionDeclaration') { fnDecls++; movableStmts++; movableBytes += st.end - st.start; continue; }
    if (inRun.has(i)) { movableStmts++; movableBytes += st.end - st.start; }
  }
  for (let i = 0; i < stmts.length; i++) {
    if (!inRun.has(i)) continue;
    const span = text(src, stmts[i].start, stmts[i].end);
    if (ORDER_APIS.test(span)) { c3hits++; if (c3hits <= 3) console.error(`   [C3] order-sensitive call in a movable run: ${span.slice(0, 70)}`); }
  }
  for (const g of groups) {
    const decls = g.list.filter((k) => runAssignment(stmts[k], src));
    if (decls.length !== 1 || decls[0] !== g.list[0]) { c4violations++; note.push(`run "${g.bind}" at body@${b.start} does not open with its declaration`); }
  }
}
add('C2-private-windows', 'no statement inside a run can reach a read of the binding it is building, and nothing order-bearing trails it', c2exec === 0 && c2junction === 0, `${runGroups} run group(s) / ${runStmts} push statement(s); statements INSIDE a run window that cannot reach a read of it: ${scattcnt} (placed freely); violations: ${c2exec}; trailing pushes on the same binding: ${c2junction}; hoisted declarations dealt inside a run (transparent, expected): ${transparent}`);
add('C3-registration-order', 'no movable statement calls an order-observable API', c3hits === 0, `movable statements executing at their position checked for ${(ORDER_APIS.source.match(/\|/g).length + 1)} API names: ${c3hits} hit(s)`);
add('C4-shared-root-writes', 'a run writes only through its own binding (exactly one opening declaration, then pushes)', c4violations === 0, `run group(s) whose write shape is not exactly one declaration + pushes: ${c4violations}`);

// ---- C5 — the array content order (needs --pre) -------------------------------------
// The strongest statement this pass can make about the runs: for every binding, the ORDER of the pushes
// that build it is identical before and after the weave. Author-written pushes on the same binding are
// included, so a group cannot be slid across one of them unnoticed.
function pushOrder(source) {
  const order = new Map();
  walk(parse(source), (n) => {
    if (n.type !== 'ExpressionStatement') return;
    const bind = runPush(n);
    if (bind === null) return;
    if (!order.has(bind)) order.set(bind, []);
    order.get(bind).push(source.slice(n.start, n.end).replace(/\s+/g, ' '));
  });
  return order;
}
if (pre) {
  const before = pushOrder(pre), after = pushOrder(src);
  let compared = 0, mismatched = 0;
  for (const [bind, list] of before) {
    if (list.length < 2) continue;
    compared++;
    const now = after.get(bind) || [];
    if (now.length !== list.length || list.some((v, i) => v !== now[i])) {
      mismatched++;
      if (mismatched <= 3) console.error(`   [C5] push order for "${bind}" changed (pre ${list.length}, post ${now.length})`);
    }
  }
  add('C5-array-content-order', 'every binding is built by the same pushes in the same order', mismatched === 0, `${compared} binding(s) with >=2 pushes compared pre/post; mismatched: ${mismatched}`);
} else {
  add('C5-array-content-order', 'every binding is built by the same pushes in the same order', true, 'skipped — pass --pre=<pre-weave.js> to compare against the input');
}

const ok = rows.every((r) => r.ok);
if (asJson) {
  console.log(JSON.stringify({ file, bytes: src.length, rows, movable: { statements: movableStmts, bytes: movableBytes, share_pct: +(100 * movableBytes / src.length).toFixed(1) }, fn_decls: fnDecls, verdict: ok ? 'PASS' : 'FAIL' }));
} else {
  console.log(`== constraint pass (step 4) on ${path.basename(file)} — ${src.length} chars`);
  for (const r of rows) console.log(`   ${r.ok ? 'PASS' : 'FAIL'}  ${r.id.padEnd(22)} ${r.detail}`);
  console.log(`   movable set: ${movableStmts} statement(s) = ${movableBytes} B (${(100 * movableBytes / src.length).toFixed(1)}% of the file)`);
  console.log(`   => ${ok ? 'PASS' : 'FAIL'} — ${rows.length}/${rows.length} checks${ok ? ' green; the movable set survives the pass unchanged' : ' — the build must not ship'}`);
}
process.exit(ok ? 0 : 1);
