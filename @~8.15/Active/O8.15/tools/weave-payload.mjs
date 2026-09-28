#!/usr/bin/env node
// weave-payload.mjs — O8.15 step 3 (the weave) + step 4 (the constraint pass), on the SHIPPED payload.
//
// Idea: inside every function body, take the code whose textual position is free and deal it through
// the rest of that body, so that no contiguous region of the file carries one origin's code. Two kinds
// of unit are movable:
//
//   * hoisted `function` declarations at the body's top level — hoisting makes their textual position
//     irrelevant (relative order between same-named ones is preserved, so "last wins" cannot change);
//   * the order-fixed runs produced by step 2 (`A.push(...)`, `S+="..."`) — each group must stay in
//     order and inside the window in which its binding is still private. That window is the constraint
//     pass: after the declaration, before the first statement that could observe a half-built value
//     (a reference to the binding, a call, an assignment, an await/return).
//
// Nothing is rewritten: units are ORIGINAL byte spans, re-ordered, so every unit's text is byte-identical
// to what it was. Bodies nest, so the emitter works as a recursive splice (innermost bodies first) rather
// than as a flat edit list.
//
// Usage:
//   node weave-payload.mjs --measure <file> [--seed=N] [--json]
//   node weave-payload.mjs --apply <in.js> <out.js> --seed=N
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
const mode = argv.includes('--apply') ? 'apply' : argv.includes('--measure') ? 'measure' : null;
if (!mode) { console.error('usage: weave-payload.mjs --measure <file> | --apply <in> <out> --seed=N'); process.exit(2); }
const seedArg = argv.find((a) => a.startsWith('--seed='));
const SEED = seedArg ? (Number(seedArg.split('=')[1]) >>> 0) : 0x51ded;
const asJson = argv.includes('--json');
const files = argv.filter((a) => !a.startsWith('--'));
const inPath = files[0];
const outPath = mode === 'apply' ? files[1] : null;
if (!inPath || (mode === 'apply' && !outPath)) { console.error('usage: weave-payload.mjs --measure <file> | --apply <in> <out>'); process.exit(2); }

const src = fs.readFileSync(inPath, 'utf8');
const debug = process.env.WEAVE_DEBUG === '1' || process.env.WEAVE_DEBUG === '2';
const loud = process.env.WEAVE_DEBUG === '2';
function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function walk(node, cb) {
  if (!node || typeof node.type !== 'string') return;
  cb(node);
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
    const v = node[k];
    if (Array.isArray(v)) { for (const c of v) walk(c, cb); }
    else if (v && typeof v.type === 'string') walk(v, cb);
  }
}
const isFn = (n) => n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' ||
  n.type === 'ArrowFunctionExpression' || n.type === 'ObjectMethod' || n.type === 'ClassMethod');
const namesUsed = (node) => { const s = new Set(); walk(node, (n) => { if (n.type === 'Identifier') s.add(n.name); }); return s; };
function isBarrier(node) {
  let hit = false;
  walk(node, (n) => {
    if (n.type === 'CallExpression' || n.type === 'NewExpression' || n.type === 'AwaitExpression' ||
      n.type === 'YieldExpression' || n.type === 'AssignmentExpression' || n.type === 'UpdateExpression' ||
      n.type === 'ReturnStatement' || n.type === 'ThrowStatement') hit = true;
  });
  return hit;
}
function runOf(stmt) {
  if (stmt.type !== 'ExpressionStatement' || !stmt.expression) return null;
  const e = stmt.expression;
  if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && e.callee.computed === false &&
      e.callee.property.type === 'Identifier' && e.callee.property.name === 'push' && e.callee.object.type === 'Identifier') return { name: e.callee.object.name };
  if (e.type === 'AssignmentExpression' && e.operator === '+=' && e.left.type === 'Identifier' && e.right.type === 'StringLiteral') return { name: e.left.name };
  // `T.prop = v` / `T["prop"] = v` — the shape an object table becomes when it is split. Grouped like pushes:
  // one binding, order-fixed, and only movable while the window (reader map) is open.
  if (e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'MemberExpression' && e.left.object.type === 'Identifier') return { name: e.left.object.name };
  return null;
}

const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
// every function body with its statement list
const bodyList = [];
walk(ast, (n) => { if (isFn(n) && n.body && n.body.type === 'BlockStatement' && Array.isArray(n.body.body)) bodyList.push(n.body); });

const helperCounts = [];          // statement counts of synthetic helper bodies (count check)
const plans = new Map();          // block node -> plan
// ---- reader map (Deep Weave) ----------------------------------------------------------------
// A run group's window used to end at the first statement the old rule called a "barrier" — any call at
// all — which left a measured 256 B of room across the whole payload. The real condition is narrower: a
// statement may sit between a binding's pushes as long as it cannot REACH A READ of that binding. A
// statement reaches a read when it mentions the binding, or calls a function that (transitively) mentions
// it. Definition statements (`function f(){…}`) do not execute where they sit, so a mention inside one does
// not count. Measured room with this rule: 0.5–1.7 MB per table (reader-room.mjs).
const namedFuncs = new Map();
walk(ast, (n) => {
  if (n.type === 'FunctionDeclaration' && n.id && n.id.type === 'Identifier') namedFuncs.set(n.id.name, n);
  if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && (n.init.type === 'FunctionExpression')) namedFuncs.set(n.id.name, n.init);
});
const mentionsName = (node, name) => { let hit = false; walk(node, (n) => { if (n.type === 'Identifier' && n.name === name) hit = true; }); return hit; };
// ---- readsName (landed 2026-09-27) ------------------------------------------------------------------
// The window rule asked "can this statement reach a MENTION of the binding?", and a mention includes a
// pure write: `X[i] = v`, `X.p = v`, `X.push(v)`. A statement that only writes X cannot OBSERVE what X
// held, so it cannot make moving a write past it observable. Counting writes as reads is what pinned the
// 123-write string table `Fびήぜ137` into an 89,886-byte window (measured): nearly every function in the
// 2.2 MB body writes that table at some point, so "a call to any function that mentions it" was true almost
// everywhere and the window could not be widened.
// A mention counts as a READ unless the identifier is: the object of an assignment target (`X[…] = …`,
// `X.p = …`), or the receiver of a `.push`/`.unshift` call. Everything else — `X[i]` in a value position,
// `X.length`, `for (const v of X)`, passing X to a call, `typeof X` — is a read.
const isWriteUse = (parent, gp) => {
  if (!parent || !gp) return false;
  if (parent.type === 'MemberExpression') {
    if (gp.type === 'AssignmentExpression' && gp.left === parent && gp.operator === '=') return true;
    if (gp.type === 'CallExpression' && gp.callee === parent && parent.computed === false &&
        parent.property && parent.property.type === 'Identifier' && (parent.property.name === 'push' || parent.property.name === 'unshift')) return true;
  }
  return false;
};
// parent/grandparent are threaded as arguments — nothing is written onto the AST (an earlier version set a
// `__gp` field and the shared walker followed it straight into an infinite loop).
const readsName = (node, name) => {
  let hit = false;
  const visit = (n, parent, gp) => {
    if (hit) return;
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) {
        for (const c of v) {
          if (!c || typeof c.type !== 'string') continue;
          if (c.type === 'Identifier' && c.name === name && !isWriteUse(n, gp)) { hit = true; return; }
          visit(c, n, parent);
          if (hit) return;
        }
      } else if (v && typeof v.type === 'string') {
        if (v.type === 'Identifier' && v.name === name && !isWriteUse(n, gp)) { hit = true; return; }
        visit(v, n, parent);
        if (hit) return;
      }
    }
  };
  if (node.type === 'Identifier' && node.name === name) return true;   // bare `X;`
  visit(node, null, null);
  return hit;
};

const callsOf = (node) => { const out = new Set(); walk(node, (n) => { if (n.type === 'CallExpression' && n.callee.type === 'Identifier') out.add(n.callee.name); }); return out; };
const readerCache = new Map();
function readerFns(name) {
  if (readerCache.has(name)) return readerCache.get(name);
  const set = new Set();
  for (const [fn, node] of namedFuncs) if (readsName(node, name)) set.add(fn);
  let grew = true;
  while (grew) { grew = false; for (const [fn, node] of namedFuncs) { if (set.has(fn)) continue; for (const c of callsOf(node)) if (set.has(c)) { set.add(fn); grew = true; break; } } }
  readerCache.set(name, set);
  return set;
}
// does statement S (executing at its own position) reach a READ of `name`? A call counts only when the
// callee can actually read the binding (the closure above is built from readsName, not from mentions).
function reachesRead(S, name) {
  if (S.type === 'FunctionDeclaration') return false;                 // definition, does not execute here
  if (readsName(S, name)) return true;
  const readers = readerFns(name);
  for (const c of callsOf(S)) if (readers.has(c)) return true;
  return false;
}

function windowEnd(region, start, name, runIdx) {
  for (let i = start; i < region.length; i++) {
    if (runIdx && runIdx.has(i)) continue;
    if (reachesRead(region[i], name)) return i;
  }
  return region.length;
}

// ---- purity of a run statement --------------------------------------------------------------
// A push or a property write may only be DEALT AWAY from its position when evaluating it later cannot be
// observed: its arguments must be values (literals, arrays/objects of literals, function expressions), not
// calls or reads of other bindings. Measured on the 8.15-r2 chain: spreading an object write whose value is
// a call (`T.x = make()`), or a push whose argument reads another table, changes when the call runs — the
// decoy-parity gate caught exactly that as a 20 s hang.
// Literal-method calls (landed 2026-09-27). The 123-write string table `Fびήぜ137` refuses the purity gate on
// 43 members that look like calls but are not: `T[i] = "…".split(" ")`. The receiver is a string LITERAL, the
// argument is a literal, and the method is a non-mutating String/Array builtin, so the expression is a pure
// value — it reads no binding and writes nothing. Measured: those 43 members are 56,600 B of the group's
// 82,246 B (68.8 %), which is why the group could not be spread. Checked on the payload before landing: no
// `…prototype.<name> =` assignment exists anywhere in the 2.2 MB (so the builtins cannot have been patched),
// and `String.prototype` is never referenced as a value.
const PURE_METHODS = new Set(['split', 'toUpperCase', 'toLowerCase', 'trim', 'trimStart', 'trimEnd', 'charAt',
  'slice', 'substring', 'substr', 'concat', 'replace', 'replaceAll', 'repeat', 'padStart', 'padEnd',
  'join', 'fromCharCode', 'at', 'includes', 'startsWith', 'endsWith', 'indexOf', 'lastIndexOf']);
function pureValue(node) {
  if (!node || typeof node.type !== 'string') return false;
  switch (node.type) {
    case 'CallExpression': {
      const c = node.callee;
      if (!c || c.type !== 'MemberExpression' || c.computed || !c.property || c.property.type !== 'Identifier') return false;
      if (!PURE_METHODS.has(c.property.name)) return false;
      // receiver must itself be a pure value and must not be a function expression (an IIFE is a different,
      // timing-observable question and is NOT covered by this rule)
      if (c.object.type === 'FunctionExpression' || c.object.type === 'ArrowFunctionExpression') return false;
      if (!pureValue(c.object)) return false;
      if (process.env.WEAVE_PURE_LITERAL_CALLS !== '1') return false;    // default OFF (see the flag block)
      return node.arguments.every((a) => a && a.type !== 'SpreadElement' && pureValue(a));
    }
    case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': case 'BigIntLiteral': case 'RegExpLiteral': return true;
    case 'TemplateLiteral': return node.expressions.length === 0;
    case 'UnaryExpression': return (node.operator === '-' || node.operator === '+') && pureValue(node.argument);
    case 'FunctionExpression': case 'ArrowFunctionExpression': return true;
    case 'ArrayExpression': return node.elements.every((e) => e === null || pureValue(e));
    case 'ObjectExpression': return node.properties.every((p) => p.type === 'ObjectProperty' && !p.computed && pureValue(p.value));
    default: return false;
  }
}
function pureRunStmt(stmt) {
  const e = stmt.expression;
  if (!e) return false;
  if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && e.callee.property && e.callee.property.name === 'push') {
    return e.arguments.every((a) => (a.type === 'SpreadElement' ? pureValue(a.argument) : pureValue(a)));
  }
  if (e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'MemberExpression') return pureValue(e.right);
  if (e.type === 'AssignmentExpression' && e.operator === '+=' && e.right.type === 'StringLiteral') return true;
  return false;
}

// ---- SEQUENCE SPLIT (WEAVE_SEQ_SPLIT=1) ------------------------------------------------------------
// MEASURED 2026-09-27 on the pre payload: the whole bundle is ONE body of 11,520 statements, and 42 of
// those statements are comma-sequences (`a=1,b=2,c=3;`) that together hold 720 KB — 32 % of the payload —
// as single, unmovable units. The worst 10 %-window (share 0.434) sits inside one of them: a 120,675 B
// contiguous source span is emitted contiguously because nothing inside a statement can be woven.
// Splitting a sequence into its parts as separate statements preserves evaluation order exactly (a comma
// sequence evaluates left to right, and so does a run of statements), and it hands the weave thousands of
// individual statements that can then be classified: the pure member writes join their tables' run groups
// and become dealable, while the rest stay fixed — but now as many SMALL fixed statements instead of one
// giant block, which is what gives the deal room between them.
// Safety: the statement is only split when every part may legally begin a statement (no `{`, no
// function/class expression — those would be re-parsed as a block or a declaration), and the split parts
// carry their own source spans, so the order is the only thing the arrangement may change about them, and
// only for parts the existing purity gate (no calls, no reads of other bindings) already allows to move.
const SEQ_SPLIT_HAZARD = new Set(['FunctionExpression', 'ClassExpression', 'FunctionDeclaration', 'ClassDeclaration']);
function flattenSeq(e) {
  const out = [];
  const rec = (x) => { if (x && x.type === 'SequenceExpression') { for (const p of x.expressions) rec(p); } else if (x) out.push(x); };
  rec(e);
  return out;
}
function splitSequence(stmt) {
  if (process.env.WEAVE_SEQ_SPLIT !== '1') return [stmt];
  if (stmt.type !== 'ExpressionStatement' || !stmt.expression || stmt.expression.type !== 'SequenceExpression') return [stmt];
  const parts = flattenSeq(stmt.expression);
  if (parts.length < 2) return [stmt];
  for (const p of parts) {
    if (SEQ_SPLIT_HAZARD.has(p.type)) return [stmt];
    const head = src.slice(p.start, Math.min(p.end, p.start + 12)).trimStart();
    if (head[0] === '{') return [stmt];                        // would become a block, not an expression
    if (/^(function|class)\b/.test(head)) return [stmt];
  }
  return parts.map((p) => ({ type: 'ExpressionStatement', expression: p, start: p.start, end: p.end, split: true }));
}
const seqStats = { stmts: 0, parts: 0, bytes: 0, refused: 0 };
const splitExtra = new Map();      // block -> statements ADDED by sequence splitting (the count check below expects them)

// ---- BODY RUN EXPORT (WEAVE_RUN_EXPORT=1) ----------------------------------------------------------
// WHY. The ruler's worst 10 %-window kept coming back at exactly 0.434 whatever the arrangement, because
// 0.434 = one bucket over the window = (preLen/23)/(0.10 * postLen). Measured cause: material that sits
// INSIDE a nested function body travels as one unit. A nested body is emitted where its function is, and the
// deal can only interleave a body with itself, so a 170 KB function (measured: bucket 12) drags a whole
// bucket into a single window, and no amount of re-ordering inside it helps.
//
// WHAT. Lift maximal runs of PURE writes out of a body into helper functions, and call the helper from the
// exact position the run occupied:
//
//     function F(){ … a; X[1]="p"; X[2]="q"; b; … }   →   function F(){ … a; w7(); b; … }
//                                                          function w7(){ X[1]="p"; X[2]="q"; }
//
// The helper is a hoisted declaration in the PARENT body, where the existing arrangement already scatters
// every function across the parent's whole gap space — so the run's bytes leave the body and spread. The
// call sits exactly where the run was, so nothing about WHEN the statements execute changes: not their
// order, not the point in F's execution, not once per call. This is a text-level move, not a timing change,
// which is why it needs far fewer assumptions than moving statements between bodies.
//
// SAFETY:
//   * the run's statements are already pure (the same gate the deal uses: no calls, no reads of other
//     bindings, literal values only) — they assign constants and observe nothing;
//   * no name in the run may be bound inside F (params, var/let/const, nested declarations): the helper is
//     declared in the parent, so it sees what F sees from the outside, and nothing else;
//   * no `this`, `arguments`, `super` or `new.target` anywhere in the run — a helper has its own, and an
//     arrow body moved into it would capture the wrong one;
//   * the call replaces the run in place, so write ORDER (including two writes to the same slot) is
//     untouched, and the surrounding statements keep their own positions.
// The exported statements are emitted from their original source spans, so the byte-origin map stays exact.
const exportStats = { bodies: 0, runs: 0, statements: 0, bytes: 0, noParent: 0 };

const bodyInfo = new Map();                 // function body -> {ownerFn, parentBody, ownerStmt}
const ownerStmtOf = (parentBody, fnNode) => parentBody.body.find((st) => st.start <= fnNode.start && st.end >= fnNode.end) || null;
(function visit(node, stack) {
  if (node && typeof node.type === 'string') {
    if (isFn(node) && node.body && node.body.type === 'BlockStatement') {
      const parentBody = stack.length ? stack[stack.length - 1] : null;
      bodyInfo.set(node.body, { ownerFn: node, parentBody, ownerStmt: parentBody ? ownerStmtOf(parentBody, node) : null });
      stack.push(node.body);
      visit(node.body, stack);
      stack.pop();
      return;
    }
    for (const k of Object.keys(node)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = node[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') visit(c, stack); }
      else if (v && typeof v.type === 'string') visit(v, stack);
    }
  }
})(ast, []);

const allIdentifiers = new Set();
walk(ast, (n) => { if (n.type === 'Identifier' && n.name) allIdentifiers.add(n.name); });
const NAME_CHARS = (() => {
  const pool = [];
  for (const nm of allIdentifiers) for (const ch of nm) if (ch.charCodeAt(0) > 127 && !pool.includes(ch)) pool.push(ch);
  return pool.length ? pool : ['\u044a'];
})();
const NAME_BASES = [...allIdentifiers].filter((n) => /^[A-Za-z]{4,9}\d{2,4}$/.test(n));
function freshName(rand) {
  for (let tries = 0; tries < 200; tries++) {
    const seed = NAME_BASES.length ? NAME_BASES[Math.floor(rand() * NAME_BASES.length)] : 'Lattice000';
    let out = seed.replace(/\d+$/, '');
    const extra = 1 + Math.floor(rand() * 3);
    for (let k = 0; k < extra; k++) out += NAME_CHARS[Math.floor(rand() * NAME_CHARS.length)];
    out += String(100 + Math.floor(rand() * 9000));
    if (!allIdentifiers.has(out)) { allIdentifiers.add(out); return out; }
  }
  throw new Error('freshName: no free name found');
}

const patternNames = (pat, out) => {
  if (!pat) return out;
  if (pat.type === 'Identifier') out.add(pat.name);
  else if (pat.type === 'ObjectPattern') for (const pr of pat.properties) patternNames(pr.type === 'RestElement' ? pr.argument : pr.value, out);
  else if (pat.type === 'ArrayPattern') for (const el of pat.elements) patternNames(el, out);
  else if (pat.type === 'AssignmentPattern') patternNames(pat.left, out);
  else if (pat.type === 'RestElement') patternNames(pat.argument, out);
  return out;
};

// walk a node but do NOT descend into nested (non-arrow) function bodies: they have their own `this`,
// `arguments` and scope, none of which a statement moved out of THIS body can affect.
function ownWalk(node, cb) {
  const rec = (n) => {
    cb(n);
    if (n !== node && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression')) return;
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c); }
      else if (v && typeof v.type === 'string') rec(v);
    }
  };
  rec(node);
}

const exportedHelpers = [];                 // {parent, ownerStmt, node} — checked after the plan exists
if (process.env.WEAVE_RUN_EXPORT === '1' || process.env.WEAVE_BODY_CHUNK === '1') {
  const rand = rng((SEED ^ 0x5f3759d) >>> 0);
  const MIN_RUN_STMTS = 2, MIN_RUN_BYTES = 2048;
  for (const B of bodyList) {
    const info = bodyInfo.get(B);
    // the helpers are declared in the parent, so the parent must be a body the arrangement will actually
    // plan (a body that is emitted verbatim could not carry a synthetic declaration); 20 statements is a
    // generous threshold, and the post-plan assertion below refuses the build if the assumption ever fails
    if (!info || !info.parentBody || !info.ownerStmt || info.parentBody.body.length < 20) { exportStats.noParent++; continue; }
    const stmts = B.body;
    let d = 0;
    while (d < stmts.length && stmts[d].type === 'ExpressionStatement' && stmts[d].directive) d++;
    const locals = new Set();
    for (const prm of info.ownerFn.params || []) patternNames(prm, locals);
    for (let k = d; k < stmts.length; k++) ownWalk(stmts[k], (n) => {
      if (n.type === 'VariableDeclarator') patternNames(n.id, locals);
      else if ((n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') && n.id) locals.add(n.id.name);
    });
    const runs = [];
    let cur = [];
    const flush = () => { if (cur.length >= MIN_RUN_STMTS && cur.reduce((a, st) => a + (st.end - st.start), 0) >= MIN_RUN_BYTES) runs.push(cur); cur = []; };
    for (let k = d; k < stmts.length; k++) {
      const st = stmts[k];
      let ok = pureRunStmt(st);
      if (ok) walk(st, (n) => {
        if (n.type === 'Identifier' && locals.has(n.name)) ok = false;
        if (n.type === 'ThisExpression' || n.type === 'Super' || n.type === 'MetaProperty') ok = false;
        if (n.type === 'Identifier' && n.name === 'arguments') ok = false;
      });
      if (ok) cur.push(st); else flush();
    }
    flush();
    if (!runs.length) continue;
    const helpers = [];
    for (const run of runs) {
      const name = freshName(rand);
      const first = run[0], last = run[run.length - 1];
      const node = { type: 'FunctionDeclaration', id: { type: 'Identifier', name }, params: [], start: first.start, end: last.end, __wrap: { pre: `function ${name}(){`, post: '}' } };
      const call = { type: 'ExpressionStatement', expression: { type: 'CallExpression', callee: { type: 'Identifier', name }, arguments: [] }, start: first.start, end: last.end, __text: `${name}();` };
      const at = stmts.indexOf(first);
      stmts.splice(at, run.length, call);
      helpers.push(node);
      helperCounts.push(run.length);
      exportStats.runs++; exportStats.statements += run.length;
      exportStats.bytes += run.reduce((a, st) => a + (st.end - st.start), 0);
    }
    const pat = info.parentBody.body.indexOf(info.ownerStmt);
    if (pat < 0) throw new Error('RUN EXPORT: owning statement not found in the parent body');
    info.parentBody.body.splice(pat, 0, ...helpers);
    for (const h of helpers) exportedHelpers.push({ parent: info.parentBody, ownerStmt: info.ownerStmt, node: h });
    exportStats.bodies++;
  }
}

// ---- SHELL DISSOLUTION (WEAVE_DISSOLVE=1) ----------------------------------------------------------
// THE MEASUREMENT THAT FORCED THIS LEVER (2026-09-27, report §20d). The master body's 11,520 statements
// were permuted with TOTAL freedom (each run group's internal order kept, every other rule deliberately
// broken) as an upper-bound experiment. The ruler still read **0.434** and three buckets were still >=90 %
// concentrated. That is a proof, not a reading: the metric saturates whenever ONE STATEMENT is at least one
// bucket (97,995 B), because a statement is the deal's atom and no permutation can break it. The payload has
// seven statements >= 32 KB (462 KB) and the largest is 175,426 B — larger than a bucket. They are all the
// same shape: an immediately-invoked inline function expression, `!function (p1, p2) { …body… } (x, y)`,
// with zero return statements at its own level, zero nested returns, and no `this`/`arguments`/`new.target`
// (measured), either as a statement of the master body or as the first part of a comma sequence.
//
// WHAT. Inline the shell where it stands:
//
//     !function (p1, p2) { A; B; C } (x, y);      →     var p1 = x, p2 = y;   A;   B;   C;
//
// Arguments are evaluated in the same order at the same point; the body's statements run in the same order
// at the same point; nothing else about the program changes. What changes is the weave's REACH: those
// statements are now statements of the enclosing body, so pure writes join their run groups and become
// dealable, function declarations become hoisted movable items — the 175 KB atom stops being one atom.
// A comma sequence is handled at the same time: it is split into its parts (order preserved), each part is
// inlined if it is a shell, and a part that may not begin a statement (`function(){…}()`, `{…}`) is wrapped
// in parentheses, which is transparent in expression position.
//
// SAFETY (every condition is checked per shell, here, before it is dissolved):
//   * statement-level or sequence-element IIFE only: an inline function expression called at its own
//     position, so the call site IS the position and there is no other caller;
//   * no `ReturnStatement` outside nested functions (a return would leave the shell early; inlining would
//     change control flow);
//   * no `this`, `arguments`, `new.target`, `super` outside nested functions;
//   * no directive prologue inside the shell body;
//   * every parameter is a plain identifier — no patterns, no defaults — and the argument count matches;
//   * PRIVACY: no name the shell declares (params, and var/let/const/class/function at its own level) may
//     appear as an identifier anywhere in the enclosing body outside the shell, and two dissolved shells may
//     not introduce the same name. Inlining moves those declarations into the enclosing function scope; this
//     is the check that proves nothing can observe the move.
const textEditList = [];                    // text edits (sorted by start) — see registerEdit near the emitter
const labelRand = rng((SEED ^ 0x9e3779b9) >>> 0);
const dissolveStats = { shells: 0, labelled: 0, scoped: 0, renamed: 0, bytes: 0, statements: 0, seqs: 0, parts: 0, refused: { shape: 0, returns: 0, thisArgs: 0, directive: 0, params: 0, privacy: 0, async: 0 } };
const introducedNames = new Map();          // block -> names introduced by dissolution in that body
const dissolveDelta = new Map();            // block -> statements ADDED by dissolution (count check)
const dissolvedNodes = new Set();            // a shell reachable from two parents must be inlined ONCE
const inlinedShellFns = new Set();           // and a shell whose body is inside a COMMA SEQUENCE is not marked by
                                            // that guard at all (the sequence path has no statement node to mark),
                                            // so it needs its own once-only key — without it the same shell was
                                            // inlined twice with two different labels and two conflicting rewrites
                                            // of the same `return`, which the edit list refuses as a duplicate.
const dissolvedShells = [];
const dissolvedInto = new Map();              // shell body block -> the body it was inlined INTO                 // { parent, bodyCount } — a dissolved shell's own function body
                                            // disappears from the output (its statements now live in the parent)


// an inline function expression called right here, optionally under `!`
function shellOf(e) {
  if (!e) return null;
  let x = e;
  if (x.type === 'UnaryExpression' && x.operator === '!') x = x.argument;
  if (x.type !== 'CallExpression') return null;
  const callee = x.callee;
  if (!callee || (callee.type !== 'FunctionExpression' && callee.type !== 'ArrowFunctionExpression')) return null;
  if (!callee.body || callee.body.type !== 'BlockStatement') return null;
  // An async or generator callee cannot be inlined into a sync context: its `await`/`yield` would stop
  // parsing (measured: the FIRST attempt at this pass inlined the page-level async shell that carries
  // `await window[GoogleUblock](…)` and produced "parse error at 1662758: 'await' is only allowed within
  // async functions"). That shell is exactly the page-level guard path, so it must stay a shell.
  if (callee.async || callee.generator) return { bad: 'async' };
  const params = [];
  for (const prm of callee.params || []) { if (prm.type !== 'Identifier') return { bad: 'params' }; params.push(prm.name); }
  if (params.length !== (x.arguments || []).length) return { bad: 'params' };
  return { fn: callee, call: x, params, args: x.arguments || [] };
}

// A node that carries its own `this`/`arguments`/`return`: a nested function OR a method. This was a real
// defect (26th pass): an object getter (`get dbgOK(){ … return … }`, node type ObjectMethod) was not skipped
// by a `/Function|Arrow/` test, so the labelled-shell lift rewrote a GETTER's return into a `break` of a label
// that does not enclose it, and the output stopped parsing ("Unsyntactic break").
const isOwnScope = (n) => !!n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' ||
  n.type === 'ArrowFunctionExpression' || n.type === 'ObjectMethod' || n.type === 'ClassMethod' ||
  n.type === 'ClassPrivateMethod' || n.type === 'StaticBlock');

function scanShellBody(fn) {
  let returns = 0, thisArgs = 0, awaitYield = 0;
  const scan = (n, isRoot) => {
    if (!isRoot && isOwnScope(n)) return;
    if (n.type === 'ReturnStatement') returns++;
    if (n.type === 'ThisExpression' || n.type === 'MetaProperty' || n.type === 'Super') thisArgs++;
    if (n.type === 'Identifier' && n.name === 'arguments') thisArgs++;
    if (n.type === 'AwaitExpression' || n.type === 'YieldExpression') awaitYield++;
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') scan(c, false); }
      else if (v && typeof v.type === 'string') scan(v, false);
    }
  };
  scan(fn.body, true);
  return { returns, thisArgs, awaitYield };
}

function declaredInShell(fn, params) {
  const declared = new Set(params);
  const pat = (x) => {
    if (!x) return;
    if (x.type === 'Identifier') declared.add(x.name);
    else if (x.type === 'ObjectPattern') for (const q of x.properties) pat(q.type === 'RestElement' ? q.argument : q.value);
    else if (x.type === 'ArrayPattern') for (const el of x.elements) pat(el);
    else if (x.type === 'AssignmentPattern') pat(x.left);
    else if (x.type === 'RestElement') pat(x.argument);
  };
  const collect = (n, isRoot) => {
    if (!isRoot && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression')) {
      if (n.type === 'FunctionDeclaration' && n.id) declared.add(n.id.name);
      return;
    }
    if (n.type === 'VariableDeclarator') pat(n.id);
    else if (n.type === 'ClassDeclaration' && n.id) declared.add(n.id.name);
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') collect(c, false); }
      else if (v && typeof v.type === 'string') collect(v, false);
    }
  };
  collect(fn.body, true);
  return declared;
}

// Every `return` that would leave the shell itself (a nested function's returns are its own business), in
// source order. Used only by the labelled-shell lift.
function collectOwnReturns(fn, out) {
  (function w(n, depth) {
    if (!n || typeof n !== 'object') return;
    if (depth > 0 && isOwnScope(n)) return;
    if (n.type === 'ReturnStatement') { out.push(n); return; }
    for (const k of Object.keys(n)) { if (k === 'loc') continue; const v = n[k];
      if (Array.isArray(v)) v.forEach((c) => w(c, depth + 1)); else if (v && typeof v === 'object' && v.type) w(v, depth + 1); }
  })(fn, 0);
  return out;
}

// ---- SCOPED-NAME DISSOLVE (WEAVE_SCOPED=1) ------------------------------------------------------------
// WHAT THIS FIXES (report §22.6). The biggest atoms left are refused for `privacy`: their names collide with
// names in the enclosing master body (the 169,612 B shell declares 119 names, 20 of which also appear in the
// 8,621-statement enclosing body). Plain dissolution introduces those names into the enclosing scope, which is
// why it must refuse. The fix is to NOT introduce them: bind them inside the block that the shell becomes.
//
//   * parameters      -> `let` bindings inside the labelled block (block-scoped: shadows, never captures);
//   * own-level `var` -> converted to `let` by a 3-char text edit on the keyword, so the enclosing body's own
//                        binding of that name is untouched — legal unless the name is read textually before its
//                        declaration inside the shell (with `var` that read yields undefined; with `let` it
//                        would be a TDZ ReferenceError), or read inside its own initialiser;
//   * `let`/`const`/`class` are already block-scoped: collisions with them were never actually a hazard;
//   * `function` declarations cannot take this route (Annex B gives them a function-level binding), so a
//                        colliding function name still refuses;
//   * a `var` inside a nested block keeps its `var` (converting it would change its scope) and must simply
//                        not collide;
//   * the call's arguments are spilled to fresh temporaries first (`var <fresh> = <arg>; let p = <fresh>;`)
//                        so a SELF-NAMED argument (`!function(Cinde826){…}(Cinde826)`) cannot make the binding
//                        read itself — the trap found while dissecting this very shell.
// Everything else about the dissolve is unchanged; with WEAVE_SCOPED unset the pass refuses exactly as before.
function describeShellBindings(fn, params) {
  const out = { params: new Set(params), vars: [], lexical: new Set(), funcs: new Set(), funcDecls: new Map() };
  const addPat = (x, into) => {
    if (!x) return;
    if (x.type === 'Identifier') into.add(x.name);
    else if (x.type === 'ObjectPattern') for (const q of x.properties) addPat(q.type === 'RestElement' ? q.argument : q.value, into);
    else if (x.type === 'ArrayPattern') for (const el of x.elements) addPat(el, into);
    else if (x.type === 'AssignmentPattern') addPat(x.left, into);
    else if (x.type === 'RestElement') addPat(x.argument, into);
  };
  const rec = (n, isRoot) => {
    if (!isRoot && isOwnScope(n)) {
      if (n.type === 'FunctionDeclaration' && n.id) {
        out.funcs.add(n.id.name);
        if (!out.funcDecls.has(n.id.name)) out.funcDecls.set(n.id.name, { declStart: n.start, nameStart: n.id.start, nameEnd: n.id.end, hoistable: !n.async && !n.generator });
      }
      return;
    }
    if (n.type === 'VariableDeclaration') {
      for (const d of n.declarations) {
        const names = new Set(); addPat(d.id, names);
        for (const nm of names) {
          if (n.kind === 'var') out.vars.push({ name: nm, declStart: n.start, idStart: d.id.start,
            initStart: d.init ? d.init.start : null, initEnd: d.init ? d.init.end : null, topLevel: isRoot });
          else out.lexical.add(nm);
        }
      }
    } else if (n.type === 'ClassDeclaration' && n.id) out.lexical.add(n.id.name);
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c, false); }
      else if (v && typeof v.type === 'string') rec(v, false);
    }
  };
  rec(fn.body, true);
  return out;
}
// every identifier TOKEN of a given name inside the shell, with property keys, member names, labels and
// meta-properties left out — a rename may only touch things that resolve to the binding
function shellNameOccurrences(fn, name) {
  const out = [];
  const rec = (n, parent) => {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'Identifier' && n.name === name) {
      const p = parent;
      const inert = p && ((p.type === 'MemberExpression' && p.property === n && !p.computed) ||
        (p.type === 'Property' && p.key === n && !p.computed) ||
        ((p.type === 'ObjectMethod' || p.type === 'ClassMethod' || p.type === 'ClassPrivateMethod') && p.key === n && !p.computed) ||
        (p.type === 'LabeledStatement' && p.label === n) ||
        (p.type === 'BreakStatement' && p.label === n) || (p.type === 'ContinueStatement' && p.label === n) ||
        p.type === 'MetaProperty');
      if (!inert) out.push(n.start);
    }
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c, n); }
      else if (v && typeof v.type === 'string') rec(v, n);
    }
  };
  rec(fn, null);
  return out;
}

// every own-level (not inside a nested function) identifier use, by name — conservative: property names count
function shellUsesByName(fn) {
  const uses = new Map();
  const rec = (n, isRoot) => {
    if (!isRoot && isOwnScope(n)) return;
    if (n.type === 'Identifier') { if (!uses.has(n.name)) uses.set(n.name, []); uses.get(n.name).push(n.start); }
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c, false); }
      else if (v && typeof v.type === 'string') rec(v, false);
    }
  };
  rec(fn.body, true);
  return uses;
}

// returns { out: [statements] } when the shell may be inlined, null when it may not (reason counted)
function inlineShell(shape, others, at) {
  const note = (r) => { if (at && at.end - at.start >= 20000) refusedBig.push({ reason: r, len: at.end - at.start, at: at.start, head: src.slice(at.start, at.start + 70) }); };
  const { fn, call, params, args } = shape;
  let dd = 0;
  const body = fn.body.body;
  while (dd < body.length && body[dd].type === 'ExpressionStatement' && body[dd].directive) dd++;
  if (dd > 0) { dissolveStats.refused.directive++; note('directive'); return null; }
  const sc = scanShellBody(fn);
  // ---- LABELLED SHELL LIFT (WEAVE_SHELL_LABEL=1) --------------------------------------------------------
  // A shell whose body contains `return` is normally refused, and those refusals are what is left holding the
  // acceptance number: measured on the landed configuration, five of the worst window's 430 fixed statements
  // carry 91,635 B of its 182,193 B fixed mass and every one of them is a shell refused for `returns`.
  //
  // At the positions this pass touches, the shell's VALUE IS DISCARDED: the pass only rewrites
  // ExpressionStatement roots, so the call's result is thrown away by construction. That makes `return`
  // exactly equivalent to breaking out of a labelled block:
  //
  //     !function(p){ A; if (x) return; B; return v; C }(arg)
  //  == L:{ var p = arg; A; if (x) break L; B; (v); break L; C }        (L is a fresh label per shell)
  //
  // `return v` evaluates v (for its effects) and leaves; `(v); break L` evaluates v and leaves. The label
  // encloses the whole body, so every break lands where the return did, and `try`/`finally` behaves
  // identically (finally runs, then control leaves the block). Nothing outside the block changes: the same
  // names are introduced (the privacy check below still runs, unchanged), `var` still hoists to the enclosing
  // function, and a nested function's own returns are untouched.
  let labelName = null, ownReturns = null;
  if (sc.returns) {
    const canLabel = process.env.WEAVE_SHELL_LABEL === '1' && !sc.awaitYield && !fn.async && !fn.generator &&
      others.self && others.self.type === 'ExpressionStatement';
    if (!canLabel) { dissolveStats.refused.returns++; note('returns'); return null; }
    ownReturns = collectOwnReturns(fn, []);
    labelName = freshName(labelRand);
    dissolveStats.labelled++;
  }
  if (sc.thisArgs) { dissolveStats.refused.thisArgs++; note('thisArgs'); return null; }
  if (sc.awaitYield) { dissolveStats.refused.async++; note('async'); return null; }
  const shellKey = fn && fn.body ? fn.body.start + ':' + fn.body.end : String(fn);
  if (inlinedShellFns.has(shellKey)) return null;      // already inlined through another path this run
  const declared = declaredInShell(fn, params);
  let scopedInfo = null, scoped = false;
  for (const nm of declared) {
    if (introducedNames.get(others.block).has(nm)) { dissolveStats.refused.privacy++; note('privacy'); return null; }
    let clash = false;
    for (const st of others.stmts) { if (st === others.self) continue; walk(st, (n) => { if (n.type === 'Identifier' && n.name === nm) clash = true; }); if (clash) break; }
    if (!clash) continue;
    // a collision. Plain dissolution refuses; the scoped path (WEAVE_SCOPED=1) may still be able to lift it
    if (process.env.WEAVE_SCOPED !== '1') { dissolveStats.refused.privacy++; note('privacy'); return null; }
    if (!scopedInfo) { scopedInfo = describeShellBindings(fn, params); scopedInfo.uses = shellUsesByName(fn); scopedInfo.renames = []; scopedInfo.renamed = new Set(); }
    if (scopedInfo.funcDecls.has(nm)) {
      // A function declaration cannot be block-scoped: it hoists. So give it a FRESH NAME instead and rename
      // every reference to it inside the shell. This is safe because a function declaration at the shell's own
      // level shadows the outer name for the whole shell body — so every occurrence of that name inside the
      // shell (unless shadowed by a still-deeper declaration, which is renamed along with it) belongs to this
      // declaration. The outer body's own binding keeps its name and its references, and the fresh name is
      // chosen from identifiers that appear nowhere in the input, so dissolving cannot capture anything.
      const fresh = freshName(labelRand);
      const occ = shellNameOccurrences(fn, nm);
      if (!occ.length) { dissolveStats.refused.privacy++; note('privacy'); return null; }
      for (const at of occ) registerEdit(at, at + nm.length, fresh);
      scopedInfo.renames.push({ from: nm, to: fresh, occ: occ.length });
      scopedInfo.renamed.add(nm);
      continue;
    }
    const unsafe = (() => {
      const v = scopedInfo.vars.find((x) => x.name === nm);
      if (!v) return false;                               // a parameter or a lexical binding: block-scoped
      if (!v.topLevel) return true;                       // an inner-block var cannot be re-scoped safely
      const u = scopedInfo.uses.get(nm) || [];
      if (u.some((at) => at < v.idStart)) return true;    // read before its declaration: `var` gave undefined
      if (v.initStart != null && u.some((at) => at >= v.initStart && at < v.initEnd)) return true;   // `var a = a`
      return false;
    })();
    if (unsafe) { dissolveStats.refused.privacy++; note('privacy'); return null; }
    scoped = true;
  }
  // With scoped bindings the shell's names live in its own block, so they are not introduced into the enclosing
  // scope at all — only names that keep function-level reach (declared functions, inner-block vars left alone)
  // have to stay unique per body.
  if (scoped || (scopedInfo && scopedInfo.renames.length)) {
    for (const nm of scopedInfo.funcs) introducedNames.get(others.block).add(scopedInfo.renamed.has(nm) ? scopedInfo.renames.find((r) => r.from === nm).to : nm);
    for (const v of scopedInfo.vars) if (!v.topLevel) introducedNames.get(others.block).add(v.name);
    if (scoped) dissolveStats.scoped++;
    dissolveStats.renamed += scopedInfo.renames.length;
  } else {
    for (const nm of declared) introducedNames.get(others.block).add(nm);
  }
  // every return now becomes a break of the label; the argument (if any) is still evaluated, for its effects
  if (labelName) {
    // A statement some other shell already rewrites is a conflict, not a crash: refuse this shell and leave the
    // rewrite in the hands of whoever got there first. (Measured 28th pass: the same shell can be reached
    // through two paths — a comma-sequence part is not a statement node, so the `dissolvedNodes` guard does not
    // see it — and the second `return` rewrite then differed from the first only in its label name.)
    const ownedNested = ownReturns.filter((r) => textEditList.some((e) => e.start === r.start));
    if (ownedNested.length && process.env.WEAVE_DEBUG === '1') {
      for (const r of ownedNested) {
        const prior = textEditList.find((e) => e.start === r.start);
        console.error(`   [shell-overlap] source=${r.start}:${r.end} enclosing=${shellKey} enclosingCall=${call.start}:${call.end} prior=${prior.start}:${prior.end} — nested return already owned; excluding from enclosing return set`);
      }
    }
    ownReturns = ownReturns.filter((r) => !textEditList.some((e) => e.start === r.start));
    for (const r of ownReturns) {
      const argTxt = r.argument ? '(' + src.slice(r.argument.start, r.argument.end) + ');' : '';
      registerEdit(r.start, r.end, '{' + argTxt + 'break ' + labelName + ';}');
    }
  }
  inlinedShellFns.add(shellKey);                    // from here on this call cannot refuse, so the shell is spent
  const out = [];
  if (labelName) out.push({ type: 'ExpressionStatement', start: call.start, end: call.end, __text: labelName + ':{', __noReloc: true });
  if (params.length) {
    // The binding text is synthetic (`var p=` / `;`), but the ARGUMENT is the original expression: it is
    // pushed with its real coordinates so the content-conservation check can see that its bytes were kept.
    const parts = [{ t: 'var ' }];
    const temps = params.map(() => freshName(labelRand));
    params.forEach((nm, k) => { parts.push({ t: (k ? ',' : '') + temps[k] + '=' }, { t: src.slice(args[k].start, args[k].end), o0: args[k].start, o1: args[k].end }); });
    if (scoped) {
      // spill the arguments first, then bind: `!function(X){...}(X)` would otherwise make a `let X = X` binding
      // read itself
      parts.push({ t: ';let ' });
      params.forEach((nm, k) => { parts.push({ t: (k ? ',' : '') + nm + '=' + temps[k] }); });
    }
    parts.push({ t: ';' });
    out.push({ type: 'VariableDeclaration', kind: 'var', declarations: [], start: call.start, end: call.end, __textParts: parts, __noReloc: true });
  }
  // a scoped shell's own-level `var`s become block-scoped `let`s (the keyword edit is the same width, so the
  // content-conservation coverage is unchanged)
  if (scoped) {
    const seenVar = new Set();
    for (const v of scopedInfo.vars) {
      if (!v.topLevel || seenVar.has(v.declStart)) continue;
      seenVar.add(v.declStart);
      registerEdit(v.declStart, v.declStart + 3, 'let');
    }
  }
  for (const bs of body) out.push(bs);
  if (labelName) out.push({ type: 'ExpressionStatement', start: call.start, end: call.end, __text: 'break ' + labelName + ';}', __noReloc: true });
  if (out.length && body.length) { out[0] = Object.assign({}, out[0], { __shellBody: true, __shellBodyCount: body.filter((x) => x.type !== 'EmptyStatement').length }); }
  return out;
}

// ---- CONTENT INVENTORY (taken BEFORE any transform mutates the tree) ---------------------------------
// Every statement span of the original file. After emission each of these spans must be covered, byte for
// byte, exactly once, by chunks that carry original coordinates. This is what replaces the body-by-body
// statement count now that dissolution legitimately moves statements between bodies.
const stmtInventory = [];
if (process.env.WEAVE_DISSOLVE === '1' || process.env.WEAVE_SEQ_SPLIT === '1') {
  const invAst = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
  walk(invAst, (n) => {
    if (!n.start || !n.end || n.start >= n.end) return;
    if (!/Statement$/.test(n.type) && !/Declaration$/.test(n.type)) return;
    stmtInventory.push([n.start, n.end]);
  });
}
const dissolveRewritten = [];                 // shell statements that were inlined (their wrapper bytes leave)
const refusedBig = [];                        // { reason, len, at, head } — the atoms each refusal leaves behind
const noteRefusal = (reason, st) => { const L = st.end - st.start; if (L < 20000) return; refusedBig.push({ reason, len: L, at: st.start, head: src.slice(st.start, st.start + 70) }); };                 // shell statements that were inlined (their wrapper bytes leave)
const seqRewritten = [];                      // comma sequences split into separate statements (the commas leave)

if (process.env.WEAVE_DISSOLVE === '1') {
  // DEEPEST FIRST. bodyList is AST pre-order, so reversing it processes every descendant before its
  // ancestor: when a shell is inlined into its parent, any shell inside IT has already been inlined, and no
  // dissolve is ever attributed to a body that has stopped being emitted (that mismatch showed up as a
  // body-count histogram that summed correctly but disagreed body by body).
  for (const block of [...bodyList].reverse()) {
    const stmts = block.body;
    let d = 0;
    while (d < stmts.length && stmts[d].type === 'ExpressionStatement' && stmts[d].directive) d++;
    introducedNames.set(block, new Set());
    for (let i = stmts.length - 1; i >= d; i--) {
      const st = stmts[i];
      if (dissolvedNodes.has(st)) { continue; }        // already inlined through another parent
      if (st.type !== 'ExpressionStatement' || !st.expression) { continue; }
      const others = { block, stmts, self: st };
      let replacement = null;
      const seq = st.expression.type === 'SequenceExpression' ? flattenSeq(st.expression) : null;
      if (seq) {
        replacement = [];
        for (const part of seq) {
          const shape = shellOf(part);
          if (shape && shape.bad) dissolveStats.refused[shape.bad === 'async' ? 'async' : 'params']++;
          if (shape && !shape.bad) {
            const inlined = inlineShell(shape, others, part);
            if (inlined) {
              for (const x of inlined) replacement.push(x);
              if (shape.fn && shape.fn.body) dissolvedInto.set(shape.fn.body, block);
              dissolveRewritten.push([part.start, part.end]);
              dissolveStats.shells++; dissolveStats.bytes += part.end - part.start; continue;
            }
          }
          const head = src.slice(part.start, Math.min(part.start + 12, part.end)).trimStart();
          const hazard = part.type === 'FunctionExpression' || part.type === 'ClassExpression' || head[0] === '{' || /^(function|class)\b/.test(head);
          replacement.push(hazard
            ? { type: 'ExpressionStatement', expression: part, start: part.start, end: part.end, __wrap: { pre: '(', post: ')' } }
            : { type: 'ExpressionStatement', expression: part, start: part.start, end: part.end });
        }
        dissolveRewritten.push([st.start, st.end]);      // the whole statement is rewritten; its commas leave
        dissolveStats.seqs++; dissolveStats.parts += seq.length;
      } else {
        const shape = shellOf(st.expression);
        if (shape && shape.bad) dissolveStats.refused[shape.bad === 'async' ? 'async' : 'params']++;
        if (shape && !shape.bad) {
          const inlined = inlineShell(shape, others, st);
          if (inlined) {
            replacement = inlined;
            if (shape.fn && shape.fn.body) dissolvedInto.set(shape.fn.body, block);
            dissolveRewritten.push([st.start, st.end]);
            dissolveStats.shells++; dissolveStats.bytes += st.end - st.start;
          }
        }
      }
      if (!replacement) { dissolveStats.refused.shape++; noteRefusal('shape', st); continue; }
      dissolveDelta.set(block, (dissolveDelta.get(block) || 0) + (replacement.length - 1));
      for (const x of replacement) if (x.__shellBody) { dissolvedShells.push({ parent: block, bodyCount: x.__shellBodyCount }); dissolvedNodes.add(st); }
      stmts.splice(i, 1, ...replacement);
      dissolveStats.statements += replacement.length;
    }
  }
}

// ---- FUNCTION-EXPRESSION HOIST (WEAVE_FN_HOIST=1) ----------------------------------------------------
// The atoms that survive dissolution are overwhelmingly *function values*: `X.y[Lit(…)] = async a => {…}`
// (46 KB … 87 KB) and bare `(function(X){…})` expressions. A function expression is not a placement unit, so
// its whole body stays one contiguous run of the file; a FunctionDeclaration is (the planner's `fns` class),
// and its body gets its own weave plan. So: give the body a name and a declaration in the same scope and
// leave a reference where the value was —
//
//     X.y = async a => { BODY }      ->      async function NAME(a){ BODY }   (declared in this body)
//                                            X.y = NAME;                     (same statement position)
//
// Semantics: the closure is created in the scope it was created in, is only reachable through the same
// assignment, and is called at exactly the same points; the declaration is hoisted but a declaration is not
// a call. Refused when the body touches `this`, `arguments`, `super`, `new.target`, or when the value is
// consumed anywhere but as the whole right-hand side (a call, a tag, a `new`).
const hoistRand = rng((SEED ^ 0x2545f49) >>> 0);
const fnHoistStats = { hoisted: 0, bound: 0, bytes: 0, sequences: 0, refused: { this: 0, args: 0, super: 0, newTarget: 0, named: 0, shape: 0, small: 0 } };
const fnHoistRewritten = [];                   // statements whose right-hand side was replaced
const ISSUE_ORDER = ['args', 'super', 'newTarget', 'this'];
function hoistIssues(fn) {
  const bad = new Set();
  (function w(n, depth) {
    if (!n || typeof n !== 'object') return;
    if (depth > 0 && (isOwnScope(n) || n.type === 'ClassExpression' || n.type === 'ClassDeclaration')) return;   // its own this/arguments are its own
    if (n.type === 'ThisExpression') bad.add('this');
    else if (n.type === 'Super') bad.add('super');
    else if (n.type === 'MetaProperty' && n.meta && n.meta.name === 'new') bad.add('newTarget');
    else if (n.type === 'Identifier' && n.name === 'arguments') bad.add('args');
    for (const k of Object.keys(n)) { if (k === 'loc') continue; const v = n[k];
      if (Array.isArray(v)) v.forEach((c) => w(c, depth + 1)); else if (v && typeof v === 'object' && v.type) w(v, depth + 1); }
  })(fn, 0);
  return bad;
}
function makeHelper(fn) {
  const name = freshName(hoistRand);
  const params = [];                                  // textual span of the parameter list, if any
  if (fn.params && fn.params.length) params.push(src.slice(fn.params[0].start, fn.params[fn.params.length - 1].end));
  const pre = (fn.async ? 'async ' : '') + 'function ' + name + '(' + (params[0] || '') + '){';
  return { node: { type: 'FunctionDeclaration', id: { type: 'Identifier', name }, params: [], start: fn.start, end: fn.end, __wrap: { pre, post: '}' } },
    name, paramsText: params[0] || '' };
}
function hoistPart(part) {                                  // `X = <big fn>` (or a bare big fn expression)
  if (!part) return null;
  const isFn = (n) => n && (n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression');
  let assign = null, fn = null;
  if (part.type === 'AssignmentExpression' && part.operator === '=' && isFn(part.right)) { assign = part; fn = part.right; }
  else if (isFn(part)) fn = part;
  if (!fn) return null;
  if (fn.id) { fnHoistStats.refused.named++; return null; }             // a named function expression binds its own name
  if (fn.end - fn.start < (Number(process.env.WEAVE_HOIST_MIN) || 16384)) { fnHoistStats.refused.small++; return null; }
  const issues = hoistIssues(fn);
  // `this` inside an arrow is the LEXICAL this of the creation site, and a bound function reproduces exactly
  // that: `.bind(this)` at the creation site captures the same value the arrow captured. Nothing else is
  // rewritable (an own `arguments`/`super`/`new.target` has no equivalent after the move).
  const fatal = ISSUE_ORDER.find((k) => issues.has(k) && k !== 'this');
  if (fatal) { fnHoistStats.refused[fatal]++; return null; }
  const bindThis = issues.has('this');
  const boundText = bindThis ? '.bind(this)' : '';
  const h = makeHelper(fn);
  const parts = assign
    ? [{ t: src.slice(assign.left.start, assign.left.end), o0: assign.left.start, o1: assign.left.end }, { t: '=' + h.name + boundText + ';' }]
    : [{ t: h.name + boundText + ';' }];
  if (bindThis) fnHoistStats.bound++;
  return { helper: h.node, parts, bytes: fn.end - fn.start };
}
// One statement in, zero or more statements out. A comma sequence is split first (order preserved) so that a
// qualifying part can be hoisted, and only when at least one part IS hoisted: otherwise the statement is left
// exactly as it was, so the pass cannot churn the file on its own.
function hoistStatement(st) {
  if (!st || st.type !== 'ExpressionStatement' || !st.expression) return null;
  const e = st.expression;
  if (e.type !== 'SequenceExpression') {
    const made = hoistPart(e);
    if (!made) return null;
    return { helpers: [made.helper], stmts: [{ type: 'ExpressionStatement', expression: e, start: st.start, end: st.end, __textParts: made.parts }], whole: [st.start, st.end], bytes: made.bytes };
  }
  const parts = flattenSeq(e);
  if (parts.length < 2) return null;
  const out = []; const helpers = []; let bytes = 0;
  for (const part of parts) {
    const made = hoistPart(part);
    if (made) {
      helpers.push(made.helper); bytes += made.bytes;
      out.push({ type: 'ExpressionStatement', expression: part, start: part.start, end: part.end, __textParts: made.parts });
      continue;
    }
    const head = src.slice(part.start, Math.min(part.start + 12, part.end)).trimStart();
    const hazard = part.type === 'FunctionExpression' || part.type === 'ClassExpression' || head[0] === '{' || /^(function|class)\b/.test(head);
    out.push(hazard
      ? { type: 'ExpressionStatement', expression: part, start: part.start, end: part.end, __wrap: { pre: '(', post: ')' } }
      : { type: 'ExpressionStatement', expression: part, start: part.start, end: part.end });
  }
  if (!helpers.length) return null;                       // nothing to hoist: leave the sequence alone
  return { helpers, stmts: out, whole: [st.start, st.end], bytes };
}
if (process.env.WEAVE_FN_HOIST === '1') {
  for (const block of [...bodyList].reverse()) {                        // innermost first: helpers land in the body they came from
    const stmts = block.body;
    for (let i = stmts.length - 1; i >= 0; i--) {
      const st = stmts[i];
      const made = hoistStatement(st);
      if (!made) continue;
      fnHoistRewritten.push(made.whole);
      stmts.splice(i, 1, ...made.stmts);
      stmts.splice(i, 0, ...made.helpers);
      fnHoistStats.hoisted += made.helpers.length; fnHoistStats.bytes += made.bytes;
      fnHoistStats.sequences += made.stmts.length > 1 ? 1 : 0;
    }
  }
  if (debug) console.error(`   [hoist] ${fnHoistStats.hoisted} function value(s) given a declaration (${Math.round(fnHoistStats.bytes / 1024)} KB), refused ${JSON.stringify(fnHoistStats.refused)}`);
}

// ---- RUN WRAP (WEAVE_RUN_WRAP=1) -------------------------------------------------------------------
// WHY. §22.5/§23.3, twice measured: the deal moves function declarations, run-group members and relocated
// declarations, and nothing else. Everything the deal cannot move is FIXED IN PLACE, and the worst 10 %-window
// is ~135 KB of such statements — so no arrangement of the movable class can bring the window's single-origin
// share under 0.25. Dissolving (WEAVE_SCOPED) changes the SHAPE of atoms but not the POSITION of mass, and
// measured share-negative. The missing mechanism is one that makes fixed mass movable WITHOUT changing when it
// runs. This pass is that mechanism, and it is the generalization of RUN_EXPORT (which only takes pure runs
// inside nested bodies) to arbitrary runs anywhere, including the master body.
//
// WHAT. Replace a run of consecutive statements with a helper CALL, and put the statements inside a helper
// function declaration in the same body:
//
//     A; B; C; D;            →      function w7(){ A; B; C; D; }   …      w7();
//
// A function declaration is exactly what the deal already scatters (as a movable item) and the call is ~10
// bytes sitting where the run was, so the run's bytes leave the window and spread over the whole gap space.
// Execution is unchanged: the statements run in the same order, once, at the same point in the body (the
// helper is hoisted, but hoisting only creates the function object early — it has no side effects), and the
// call sits exactly where the first statement of the run was. No statement's bytes are rewritten: the helper
// is emitted as `function w(){` + the ORIGINAL source slice + `}`, and the call is synthetic but anchored to
// the run's span, so the origin map stays exact.
//
// CHUNKING. A helper has to be small enough that ONE helper is under the per-window budget (weave-levers:
// <=0.25 needs no single source run above ~56 KB in a window), so runs are cut at WEAVE_RUN_WRAP_KB (24 KB
// default) — many moderate helpers, each landing in a different gap, is the whole point; one giant helper
// would just move the clump.
//
// SAFETY (checked per statement, and per run as a whole):
//   * a `return` anywhere in the run at the run's own function level would return from the HELPER instead of
//     the body → the run is refused (returns inside a nested function are its own and are skipped);
//   * `this`, `arguments`, `super`, `new.target` at the run's own level bind to the enclosing function and a
//     helper has its own → refused (arrows do not rebind them, so the check descends into arrows; a nested
//     non-arrow function is opaque and safe);
//   * a name the run BINDS must not be referenced anywhere in the body outside the run's span — that is the
//     whole scope change: `var`/function declarations hoist to the body and `let`/`const`/`class` at the run's
//     own level are visible after it, so any read outside the run (before OR after it) proves the move would
//     be observable. A statement that fails this test is a BARRIER: it ends the run and stays fixed;
//   * a statement that the existing deal can already place at finer granularity (a pure run-group member) is
//     left alone, so the pass does not take material away from the machinery that already spreads it.
const runWrapStats = { bodies: 0, runs: 0, statements: 0, bytes: 0, barriers: 0, unsafe: 0, hoistedVars: 0, chunkKB: Number(process.env.WEAVE_RUN_WRAP_KB || 24), keepDealable: process.env.WEAVE_RUN_WRAP_ALL !== '1' };
if (process.env.WEAVE_RUN_WRAP === '1') {
  const CHUNK = Math.max(1024, Math.round(runWrapStats.chunkKB * 1024));
  const MIN_STMTS = 4, MIN_BYTES = 2048;
  const wrapRand = rng((SEED ^ 0x85ebca6b) >>> 0);
  // names a statement would carry into a different scope if it moved
  const boundNames = (st) => {
    const out = new Set();
    const rec = (n, top) => {
      if (!n || typeof n.type !== 'string') return;
      if (!top && (isFn(n) || n.type === 'ObjectMethod' || n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod' || n.type === 'StaticBlock')) {
        if (n.type === 'FunctionDeclaration' && n.id) out.add(n.id.name);   // Annex B: still function-scoped
        return;
      }
      if (n.type === 'VariableDeclarator') patternNames(n.id, out);
      else if (n.type === 'ClassDeclaration' && n.id) out.add(n.id.name);
      else if (n.type === 'FunctionDeclaration' && n.id) out.add(n.id.name);
      for (const k of Object.keys(n)) {
        if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
        const v = n[k];
        if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c, false); }
        else if (v && typeof v.type === 'string') rec(v, false);
      }
    };
    rec(st, true);
    return out;
  };
  // control-flow / this-binding hazards, relative to the body the run lives in
  const wrapHazard = (st) => {
    let hz = false;
    const rec = (n, top, inArrow) => {
      if (hz || !n || typeof n.type !== 'string') return;
      const boundary = !top && (isFn(n) || n.type === 'ObjectMethod' || n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod' || n.type === 'StaticBlock');
      if (boundary) {
        if (n.type !== 'ArrowFunctionExpression') return;             // its own this/arguments/return: opaque
        for (const k of Object.keys(n)) {                            // an arrow keeps the RUN's this/arguments
          if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
          const v = n[k];
          if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c, true, true); }
          else if (v && typeof v.type === 'string') rec(v, true, true);
        }
        return;
      }
      const t = n.type;
      if (t === 'ReturnStatement' && !inArrow && !top) { hz = true; return; }   // returns from the BODY
      if (t === 'ThisExpression' || t === 'Super' || t === 'MetaProperty') { hz = true; return; }
      if (t === 'Identifier' && n.name === 'arguments') { hz = true; return; }
      for (const k of Object.keys(n)) {
        if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
        const v = n[k];
        if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') rec(c, false, inArrow); }
        else if (v && typeof v.type === 'string') rec(v, false, inArrow);
      }
    };
    // statement root: a bare `return X;` IS a hazard, so start it as if inside
    if (st.type === 'ReturnStatement') return true;
    rec(st, true, false);
    return hz;
  };
  for (const block of bodyList.slice()) {
    const stmts = block.body;
    if (stmts.length < MIN_STMTS + 1) continue;
    let d = 0;
    while (d < stmts.length && stmts[d].type === 'ExpressionStatement' && stmts[d].directive) d++;
    const list = stmts.slice(d);
    if (list.length < MIN_STMTS) continue;
    const occ = new Map();
    for (const st of list) walk(st, (n) => { if (n.type === 'Identifier' && n.name) { if (!occ.has(n.name)) occ.set(n.name, []); occ.get(n.name).push(n.start); } });
    const outside = (name, a, b) => { const l = occ.get(name); if (!l) return false; for (const q of l) if (q < a || q >= b) return true; return false; };
    const spanOf = (arr) => { let a = Infinity, b = -Infinity; const names = new Set(); for (const st of arr) { a = Math.min(a, st.start); b = Math.max(b, st.end); for (const nm of boundNames(st)) names.add(nm); } return { a, b, names }; };
    const clean = (arr, sp) => { for (const nm of sp.names) if (outside(nm, sp.a, sp.b)) return false; return true; };
    // HOISTABLE DECLARATION (WEAVE_RUN_WRAP_HOISTVAR=1). A `var X = …;` statement is the most common barrier:
    // its binding would move into the helper, where the body's own reads of X can no longer see it. But the
    // declaration does not have to move: `var` is function-scoped and hoisted, so declaring `var X;` at the
    // body level and leaving only the ASSIGNMENT inside the helper is exactly the same program — the binding
    // is the same object, assigned at the same moment, read at the same moment. The statement is emitted as
    // `X = …;` (the four bytes of the keyword deleted) and the names it declares are hoisted to the call site.
    const hoistable = (st) => {
      if (st.type !== 'VariableDeclaration' || st.kind !== 'var' || st.__noReloc || st.__text) return null;
      const names = [];
      for (const d of st.declarations) { if (!d.id || d.id.type !== 'Identifier') return null; names.push(d.id.name); }
      if (!names.length) return null;
      return names;
    };
    const lockedOut = (arr, sp) => { for (const nm of sp.names) if (outside(nm, sp.a, sp.b)) return true; return false; };
    const helpers = [];
    let cur = [];
    const flush = () => {
      if (!cur.length) return;
      const bytes = cur.reduce((s, st) => s + (st.end - st.start), 0);
      if (cur.length >= MIN_STMTS && bytes >= MIN_BYTES) {
        const name = freshName(wrapRand);
        const first = cur[0], last = cur[cur.length - 1];
        const node = { type: 'FunctionDeclaration', id: { type: 'Identifier', name }, params: [], start: first.start, end: last.end, __wrap: { pre: `function ${name}(){`, post: '}' } };
        const hoisted = [];
        for (const nm of cur.__hoisted || []) hoisted.push(nm);
        const callText = (hoisted.length ? 'var ' + hoisted.join(',') + ';' : '') + name + '();';
        const call = { type: 'ExpressionStatement', expression: { type: 'CallExpression', callee: { type: 'Identifier', name }, arguments: [] }, start: first.start, end: last.end, __text: callText };
        const at = stmts.indexOf(first);
        if (at >= 0) {
          stmts.splice(at, cur.length, call);
          helperCounts.push(cur.length);
          helpers.push(node);
          runWrapStats.runs++; runWrapStats.statements += cur.length; runWrapStats.bytes += bytes;
        }
      } else runWrapStats.barriers++;
      cur = [];
    };
    // SLICE SAFETY (the defect that made the first cut of this pass write a broken output): the helper body is
    // emitted as the run's ORIGINAL source slice, so a statement whose text the emitter would rewrite (a
    // dissolved-shell binding with its own parts, a parenthesised sequence part, an inlined shell whose
    // wrapper text was dropped) must stay a barrier — the slice would re-emit text that is no longer there.
    // The same goes for a statement the labelled lift has registered a text edit in (a `return` rewritten to
    // `break L`): a raw slice would keep the `return` and drop the rewrite.
    const edited = (st) => { for (const e of textEditList) if (e.start < st.end && e.end > st.start) return true; return false; };
    const sliceSafe = (st) => !st.__text && !st.__textParts && !st.__wrap && !edited(st);
    const adjacent = (a, b) => /^[\s;]*$/.test(src.slice(a.end, b.start));
    for (const st of list) {
      if (!sliceSafe(st)) { flush(); runWrapStats.barriers++; runWrapStats.unsafe++; continue; }
      if (wrapHazard(st)) { flush(); runWrapStats.barriers++; continue; }
      if (runWrapStats.keepDealable && runOf(st) && pureRunStmt(st)) { flush(); continue; }   // the deal already spreads it
      if (cur.length && !adjacent(cur[cur.length - 1], st)) { flush(); }                      // dropped wrapper text in between
      let cand = cur.concat([st]);
      let sp = spanOf(cand);
      if (!clean(cand, sp) && process.env.WEAVE_RUN_WRAP_HOISTVAR === '1') {
        const hn = hoistable(st);
        if (hn && hn.every((nm) => !cur.__hoisted || !cur.__hoisted.includes(nm))) {
          // admit it with its declaration hoisted OUT of the helper
          const spNoDecl = { a: sp.a, b: sp.b, names: new Set(sp.names) };
          for (const nm of hn) spNoDecl.names.delete(nm);
          // the names it binds must not be read inside the run before this statement (a `var` read is fine, it
          // is the same binding) -- the only thing that may not happen is a SECOND declaration of the same name
          // inside the run, which the per-name dedup above already excludes
          if (clean(cand, spNoDecl) && !lockedOut(cand, spNoDecl)) {
            registerEdit(st.start, st.start + 4, '');       // drop `var ` — the statement becomes an assignment
            cur = cand;
            cur.__hoisted = (cur.__hoisted || []).concat(hn);
            runWrapStats.hoistedVars += hn.length;
            if (sp.b - sp.a >= CHUNK) flush();
            continue;
          }
        }
      }
      if (!clean(cand, sp)) {
        flush();
        const one = spanOf([st]);
        if (clean([st], one)) cur = [st]; else runWrapStats.barriers++;
        continue;
      }
      cur = cand;
      if (sp.b - sp.a >= CHUNK) flush();
    }
    flush();
    if (helpers.length) { stmts.splice(d, 0, ...helpers); runWrapStats.bodies++; }
  }
  if (process.env.WEAVE_DEBUG === '1') console.error(`   [runwrap] ${runWrapStats.runs} run(s) wrapped in ${runWrapStats.bodies} body(ies) — ${runWrapStats.statements} statements, ${Math.round(runWrapStats.bytes / 1024)} KB moved into helpers; chunk ${runWrapStats.chunkKB} KB; barriers ${runWrapStats.barriers} (of which not slice-safe ${runWrapStats.unsafe}); declarations hoisted out ${runWrapStats.hoistedVars}`);
}

const stats = { bodies: 0, bodiesTotal: bodyList.length, statements: 0, fns: 0, runs: 0, groups: 0, blocked: 0, impure: 0 };
for (const block of bodyList) {
  const stmts = block.body;
  if (stmts.length < 3) continue;
  let d = 0;
  while (d < stmts.length && stmts[d].type === 'ExpressionStatement' && stmts[d].directive) d++;
  let extra = 0;
  const region = stmts.slice(d).flatMap((s) => {
    const out = splitSequence(s);
    if (out.length > 1 || out[0] !== s) {
      seqStats.stmts++; seqStats.parts += out.length; seqStats.bytes += s.end - s.start; extra += out.length - 1;
      if (out.length > 1) seqRewritten.push([s.start, s.end]);
    }
    return out;
  });
  if (region.length < 3) continue;

  const fns = [];
  const runsBy = new Map();
  region.forEach((s, i) => {
    if (s.type === 'FunctionDeclaration' && s.id && s.id.name) { fns.push(i); return; }
    const r = runOf(s);
    if (r) { if (!runsBy.has(r.name)) runsBy.set(r.name, []); runsBy.get(r.name).push(i); }
  });

  const groups = [];
  for (const [name, list] of runsBy) {
    const runIdx = new Set(list);
    const declIdx = region.findIndex((s, i) => i < list[0] && s.type === 'VariableDeclaration' &&
      s.declarations.some((dd) => dd.id && dd.id.type === 'Identifier' && dd.id.name === name));
    const barrier = windowEnd(region, (declIdx >= 0 ? declIdx + 1 : 0), name, runIdx);
    const lo = declIdx >= 0 ? declIdx + 1 : 0;
    if (declIdx < 0 || barrier <= lo) { stats.blocked++; continue; }
    // A push group may only be dealt when every statement in it is position-independent: a push's slot IS
    // its execution order, and a call that moves moves its timing with it.
    // An INDEX-FORM group (`T[<literal>]=v`, the shape the indexed array split writes) is different: every
    // statement names its own slot, so the table's CONTENT does not depend on the group's order at all —
    // only on every slot being written before the first read, which is exactly what the window rule (and
    // C2) enforces. Such a group may be dealt even when it carries calls: the deal preserves the group's
    // internal order (gaps are ordered), so those calls keep their order among themselves.
    const indexForm = list.every((i) => {
      const st = region[i];
      if (st.type !== 'ExpressionStatement' || !st.expression) return false;
      const e = st.expression;
      return e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'MemberExpression' &&
        e.left.computed === true && (e.left.property.type === 'NumericLiteral' || e.left.property.type === 'StringLiteral');
    });
    // MEASURED 2026-09-27: dealing index-form groups (even with calls) moved 55 groups instead of 32 and
    // made the ruler WORSE on both numbers (fine_run 25,911 -> 92,131; the worst window stayed 0.434 and
    // simply relocated to the tail). Default OFF; the flag exists so the experiment stays reproducible.
    const indexDeal = process.env.WEAVE_INDEX_DEAL === '1';
    // ---- INDEX-FREE (landed 2026-09-27, in combination with declaration relocation) ----------------
    // An index-form member names its own slot, so the binding's CONTENT does not depend on the order of its
    // members. Members that are PURE (no calls, no reads of other bindings — the same gate a push group must
    // pass) are therefore order-free, and a group that would otherwise be refused for carrying calls can be
    // formed with just those members freed; the impure ones stay an ordered run inside the same window
    // (which is exactly what WEAVE_INDEX_DEAL=1 already permitted when it was measured, so this is strictly
    // less aggressive than that experiment). On its own this is neutral-to-harmful — measured 2026-09-27,
    // fine_run 25,910 -> 97,995 — because the freed members could only spread inside a 90 KB window; it earns
    // its place only together with declaration relocation, which is what widens that window.
    const allPure = list.every((i) => pureRunStmt(region[i]));
    const freeSet = new Set();
    // MEASURED 2026-09-27 — all four new levers are green and SHARE-NEUTRAL, and the landed configuration
    // is still the best on the cost metric, so every one of them defaults OFF:
    //   landed (all off)             : fine_run 25,910 · share 0.434 · intact 22,678
    //   literal-call purity alone    : fine_run 96,311 · share 0.434 · intact 42,385
    //   + index-free + decl relocation: fine_run 27,537 · share 0.434 · intact 22,678
    // They stay in the tree behind flags because they are the prerequisites for the next lever (making
    // DECLARATION material movable), not because they help on their own.
    const indexFreeOn = process.env.WEAVE_INDEX_FREE === '1';
    const relocOn = process.env.WEAVE_DECL_RELOC === '1';
    if (indexForm && indexFreeOn && relocOn) list.forEach((i) => { if (pureRunStmt(region[i])) freeSet.add(i); });
    // Refuse only when the old rule refuses AND no index-free rescue exists. (The first version of this
    // block wrote `freeSet.size === 0` in place of the all-pure test — since freeSet only fills for
    // index-form groups, that unconditionally refused all 25 push groups; caught by the group count falling
    // 37 -> 12 with 68 -> 93 refusals, all four levers green. Keep the all-pure term explicit.)
    if ((!indexForm || !indexDeal) && !allPure && freeSet.size === 0) { stats.impure++; continue; }
    if (indexForm && indexDeal) stats.indexGroups = (stats.indexGroups || 0) + 1;
    if (freeSet.size) stats.indexFree = (stats.indexFree || 0) + freeSet.size;
    groups.push({ name, runs: list, lo, hi: barrier, declIdx: declIdx >= 0 ? declIdx : null, free: freeSet.size ? freeSet : null });
    if (process.env.WEAVE_DEBUG === '1') console.error(`   [group] ${name}: ${list.length} runs, window gaps ${barrier - lo}, window bytes ${(region[Math.min(barrier, region.length) - 1] || region[region.length - 1]).end - region[lo].start}`);
    stats.groups++;
  }
  if (!fns.length && !groups.length) continue;
  // the split extras are recorded HERE, not at split time: a body that never reaches a plan is emitted
  // verbatim (its sequences stay intact), so its count does not change and must not be expected to.
  if (extra) splitExtra.set(block, extra);
  plans.set(block, { d, region, fns, groups, stmts });
  stats.bodies++;
  stats.statements += region.length;
  stats.fns += fns.length;
  stats.runs += [...runsBy.values()].reduce((a, l) => a + l.length, 0);
}

// ---- DECL RELOCATION (landed 2026-09-27) ----------------------------------------------------------
// A run group may only be dealt inside its READER WINDOW: from the binding's declaration to the first
// statement that can reach a read of it. Measured on the landed payload, that window — not the deal's
// evenness — is what bounds the worst 10 %-window: the biggest clump (`Fびήぜ137`, 123 index writes) has a
// window of only 89,886 bytes, so no placement of its members can put them further apart, and the metric's
// floor for that region is that window's bytes over the metric window (~40 %).
//
// So: move the DECLARATION earlier. `var X=[]` may be relocated to any position at which nothing between the
// new position and the old one can reach a read of X — statements in that span either do not mention X or
// cannot call into anything that does (the same `reachesRead` relation the window rule uses). Because a
// `var` binding is hoisted anyway, a program that never touched X in the span cannot observe whether X was
// assigned `[]` there or not; the array's contents and every read are unchanged, and every read still
// happens after the writes. The window then becomes [new position, the same first reader) — larger, so the
// group's members can spread over more of the output.
function declRelocatable(region, declIdx) {
  const st = region[declIdx];
  if (!st || st.type !== 'VariableDeclaration') return null;
  if (st.__noReloc || st.__text) return null;      // synthetic (dissolved shell bindings) never move: moving one would move when its ARGUMENT is evaluated
  // Every declarator must be a plain binding whose initialiser is a pure value: a literal, an empty
  // array/object, or a literal-method call. Measured 2026-09-27: the four tables that stay perfectly clumped
  // (`ci852`, `onyx751`, `l끸ttice끸낥322`, `M鷑υ枚158` — 300-803 members at 85-100 % density in the output) all
  // sit in MULTI-DECLARATOR statements like `…, engine조륜ϲ974=8, birch9829=12, ci852=[];`, which the
  // single-declarator version of this check refused. Moving such a statement earlier is safe for the same
  // reason as before — it assigns constants, and the no-touch rule below covers every name it declares.
  const names = [];
  for (const d of st.declarations) {
    if (!d.id || d.id.type !== 'Identifier') return null;
    if (d.init !== null) {
      const t = d.init.type;
      const lit = t === 'NumericLiteral' || t === 'StringLiteral' || t === 'BooleanLiteral' || t === 'NullLiteral' ||
        (t === 'ArrayExpression' && d.init.elements.length === 0) ||
        (t === 'ObjectExpression' && d.init.properties.length === 0) ||
        (t === 'UnaryExpression' && (d.init.operator === '-' || d.init.operator === '+') && d.init.argument.type === 'NumericLiteral');
      if (!lit) return null;
    }
    names.push(d.id.name);
  }
  if (!names.length) return null;
  // the earliest position this declaration may move to: just after the LAST statement before it that can
  // reach a read of ANY of the names it declares (or the body start if there is none)
  let lastTouch = -1;
  for (let i = 0; i < declIdx; i++) for (const n of names) if (reachesRead(region[i], n)) { lastTouch = i; break; }
  return { names, lastTouch, blocker: lastTouch >= 0 ? region[lastTouch] : null };
}

// ---- the deal ----
const rnd = rng(SEED);
const arrangement = new Map();     // block -> [region indices in their new order, or {gap items}]
const relocations = [];             // declared relocations, for the check and the report
for (const [block, p] of plans) {
  const movable = new Set(p.fns);
  for (const g of p.groups) for (const i of g.runs) movable.add(i);
  // relocation plan (see above): only when it buys room, and never past a statement that can touch the binding
  for (const g of p.groups) {
    if (g.declIdx == null || process.env.WEAVE_DECL_RELOC !== '1') continue;
    const rel = declRelocatable(p.region, g.declIdx);
    if (!rel) continue;
    const oldWindow = p.region[Math.min(g.hi, p.region.length) - 1].end - p.region[g.lo - 1].start;
    const newWindow = p.region[Math.min(g.hi, p.region.length) - 1].end - p.region[rel.lastTouch + 1].start;
    if (process.env.WEAVE_DEBUG === '1' && newWindow <= oldWindow * 1.5) {
      const bt = rel.blocker ? src.slice(rel.blocker.start, Math.min(rel.blocker.end, rel.blocker.start + 80)).replace(/\s+/g, ' ') : '(none)';
      console.error(`   [reloc-block] ${g.name}: window ${(oldWindow / 1024).toFixed(0)} KB, would be ${(newWindow / 1024).toFixed(0)} KB — blocked by ${JSON.stringify(bt)}`);
    }
    if (newWindow > oldWindow * 1.5) {            // only when it is a real widening, not a nudge
      g.reloc = { from: g.declIdx, to: rel.lastTouch + 1, oldWindow, newWindow, names: rel.names };
      movable.add(g.declIdx);                      // the declaration becomes a placed item
    }
  }
  p.movableAll = movable;                     // the check below must see exactly this set (relocations included)
  const fixed = p.region.map((_, i) => i).filter((i) => !movable.has(i));
  const slotOf = new Map(fixed.map((idx, k) => [idx, k]));
  const gaps = fixed.length + 1;
  const items = Array.from({ length: gaps }, () => []);      // gap -> [{idx, key, pos}]
  let minGap = 0;
  // Two declarations of the SAME name in one body are observable ("last one wins"), so they travel as an
  // ordered group exactly like a run group: the constraint pass (step 4) refuses the build if it ever sees
  // a duplicate name that the arrangement could invert. Measured on the shipped payload: zero duplicates.
  const seenName = new Map();
  // Even-with-jitter, not "uniform in what is left": picking uniformly from the remaining span piles the
  // tail of every deal against the far end of the window (measured: runs bunched at hiGap, fns clumped).
  // Each item gets its own slice of the window, then jitters inside it; order stays monotone.
  const placeEven = (count, lo, hi) => {
    const out = [];
    const span = Math.max(0, hi - lo);
    let prev = lo;
    for (let k = 0; k < count; k++) {
      const centre = lo + (span * (k + 0.5)) / count;
      const jitter = (rnd() - 0.5) * (span / Math.max(1, count));
      let g = Math.round(centre + jitter);
      g = Math.max(prev, Math.min(hi, g));
      out.push(g); prev = g;
    }
    return out;
  };
  const fnGaps = placeEven(p.fns.length, minGap, gaps - 1);
  p.fns.forEach((fidx, k) => {
    const st = p.stmts[fidx] || p.region[fidx];
    const name = (st && st.id && st.id.name) || null;
    const pos = name ? (seenName.get(name) || 0) : 0;
    if (name) seenName.set(name, pos + 1);
    items[fnGaps[k]].push({ idx: fidx, key: name ? 'fn@' + name : 'fn#' + fidx, pos });
  });
  // gap index of a region index = how many FIXED statements precede it (monotone, and defined even
  // when the bound itself is a movable statement — which is what the old slotOf lookup got wrong).
  const gapOf = (regionIdx) => { let n = 0; for (const f of fixed) { if (f < regionIdx) n++; else break; } return n; };
  for (const g of p.groups) {
    let loGap = gapOf(g.lo);
    if (g.reloc) {
      // the declaration now sits immediately after the last statement that can touch the binding, so the
      // window opens there — as early as the no-touch rule allows
      const declGap = gapOf(g.reloc.to);
      loGap = Math.min(loGap, declGap);
      items[declGap].push({ idx: g.reloc.from, key: 'decl@' + g.name, pos: 0 });
      relocations.push({ body: block.start, name: g.name, from: g.reloc.from, to: g.reloc.to, oldWindow: g.reloc.oldWindow, newWindow: g.reloc.newWindow });
    }
    const hiGap = Math.max(loGap, gapOf(g.hi));
    // Runs of one binding keep their relative order but take the WHOLE window: each push gets its own
    // slice, so a 20-push table spreads across its full room instead of clustering at the barrier.
    const ordered = g.free ? g.runs.filter((ri) => !g.free.has(ri)) : g.runs;
    const freeRuns = g.free ? g.runs.filter((ri) => g.free.has(ri)) : [];
    const gapsForRuns = placeEven(ordered.length, loGap, hiGap);
    ordered.forEach((ri, k) => { items[gapsForRuns[k]].push({ idx: ri, key: g.name, pos: k }); });
    if (freeRuns.length) {
      const gapsForFree = placeEven(freeRuns.length, loGap, hiGap);
      freeRuns.forEach((ri, k) => { items[gapsForFree[k]].push({ idx: ri, key: g.name + '\u0000' + ri, pos: 0 }); });
    }
  }
  // Within a gap: shuffle the GROUPS (so different origins stop sitting next to each other) but never
  // the order inside one group — a run group's order is what keeps its binding correct.
  for (const list of items) {
    const keys = [...new Set(list.map((x) => x.key))];
    for (let i = keys.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [keys[i], keys[j]] = [keys[j], keys[i]]; }
    const rank = new Map(keys.map((k, i) => [k, i]));
    list.sort((a, b) => (rank.get(a.key) - rank.get(b.key)) || (a.pos - b.pos));
  }
  let order = [];
  for (let g = 0; g < gaps; g++) { for (const it of items[g]) order.push(it.idx); if (g < fixed.length) order.push(fixed[g]); }
  // ---- UPPER-BOUND EXPERIMENT (WEAVE_SCRAMBLE=1): measurement only, NEVER shippable -----------------
  // What does the ruler read if placement had TOTAL freedom inside this body? A uniformly random
  // permutation of the region (seeded), with only each run group's internal order preserved. This is not a
  // candidate arrangement — it breaks the reader windows and the dataflow rules on purpose; it exists to
  // answer one question with a number: can ANY placement of these statements reach the 0.25 target, or does
  // the material itself (statements that are the deal's atom) cap the metric? If this experiment cannot
  // reach 0.25, no placement can, and the target belongs to the source (Segment 2's Rebalance).
  if (process.env.WEAVE_SCRAMBLE === '1') {
    const groups = new Map();
    for (const g of p.groups) { const seq = g.runs.slice(); groups.set(g.name, seq); }
    const chains = [], singles = [];
    const inGroup = new Set();
    for (const g of p.groups) for (const ri of g.runs) inGroup.add(ri);
    for (const [nm, seq] of groups) chains.push(seq);
    for (const idx of order) if (!inGroup.has(idx)) singles.push(idx);
    // Fisher-Yates on the singles, then interleave the chains' heads randomly
    for (let i = singles.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [singles[i], singles[j]] = [singles[j], singles[i]]; }
    const atomic = [];
    for (const ch of chains) { atomic.push(ch); }
    for (let i = atomic.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [atomic[i], atomic[j]] = [atomic[j], atomic[i]]; }
    const outOrder = [];
    let si = 0;
    for (const ch of atomic) { for (const ri of ch) outOrder.push(ri); }
    for (const ri of singles) outOrder.push(ri);
    // keep the fixed statements' relative order is NOT required for the experiment
    order = outOrder;
  }
  arrangement.set(block, order);
  // classification for the placement dump: which region statements are functions / runs / fixed
  const kindOf = new Map();
  for (const f of p.fns) { const st = p.region[f]; kindOf.set(f, { kind: 'fn', key: (st && st.id && st.id.name) || 'fn#' + f }); }
  for (const g of p.groups) for (const ri of g.runs) kindOf.set(ri, { kind: 'run', key: g.name });
  p.kindOf = kindOf;
}

// ---- diagnostics: what the weave CANNOT move (WEAVE_DEBUG=2) ----
if (debug) {
  const fixedRows = [];
  for (const [block, p] of plans) {
    const movable = new Set(p.fns);
    for (const g of p.groups) for (const i of g.runs) movable.add(i);
    p.region.forEach((st, i) => { if (!movable.has(i)) fixedRows.push({ n: st.end - st.start, at: st.start, txt: src.slice(st.start, st.start + 70).replace(/\n/g, ' ') }); });
  }
  fixedRows.sort((a, b) => b.n - a.n);
  let inBodies = 0;
  let movedHere = 0;
  for (const [block, p] of plans) {
    const mv = new Set(p.fns);
    for (const g of p.groups) for (const i of g.runs) mv.add(i);
    p.region.forEach((st, i) => { if (mv.has(i)) movedHere += st.end - st.start; });
  }
  {
    const iv = [...plans.keys()].map((b) => [b.start, b.end]).sort((a, b) => a[0] - b[0]);
    let cur = null;
    for (const [a, b] of iv) { if (cur && a <= cur[1]) cur[1] = Math.max(cur[1], b); else { if (cur) inBodies += cur[1] - cur[0]; cur = [a, b]; } }
    if (cur) inBodies += cur[1] - cur[0];
  }
  if (process.env.WEAVE_DISSOLVE === '1') {
    const R = dissolveStats.refused;
    if (refusedBig.length) {
    refusedBig.sort((a, b) => b.len - a.len);
    console.error(`   [dissolve] biggest atoms left behind by a refusal (${refusedBig.length} >= 20 KB):`);
    for (const r of refusedBig.slice(0, 8)) console.error(`      ${String(r.len).padStart(7)} B @${r.at}  ${r.reason.padEnd(10)} ${JSON.stringify(r.head.slice(0, 60))}`);
  }
  console.error(`   [dissolve] ${dissolveStats.shells} shell(s) inlined (${(dissolveStats.bytes / 1024).toFixed(0)} KB of atom), ${dissolveStats.seqs} sequence(s) split into ${dissolveStats.parts} parts, ${dissolveStats.statements} statements placed; refused shape=${R.shape} returns=${R.returns} this/args=${R.thisArgs} async=${R.async || 0} labelled=${dissolveStats.labelled} scoped=${dissolveStats.scoped} renamed=${dissolveStats.renamed} directive=${R.directive} params=${R.params} privacy=${R.privacy}`);
  }
  if (process.env.WEAVE_RUN_EXPORT === '1' || process.env.WEAVE_BODY_CHUNK === '1') {
    console.error(`   [export] ${exportStats.runs} pure run(s) lifted out of ${exportStats.bodies} body(ies) into helpers: ${exportStats.statements} statements, ${(exportStats.bytes / 1024).toFixed(0)} KB (no parent to host them: ${exportStats.noParent})`);
  }
  if (seqStats.stmts) console.error(`   [seq] ${seqStats.stmts} comma-sequences split into ${seqStats.parts} statements (${(seqStats.bytes / 1024).toFixed(0)} KB of formerly atomic material)`);
  console.error(`   [mass] woven bodies cover ${inBodies} B of ${src.length} B (${(100 * inBodies / src.length).toFixed(1)}%); the rest is top-level code and non-woven function bodies`);
  console.error(`   [mass] movable inside those bodies ${movedHere} B; fixed inside them ${inBodies - movedHere} B`);
  if (relocations.length) { const wid = relocations.reduce((a, r) => a + (r.newWindow - r.oldWindow), 0); console.error(`   [reloc] ${relocations.length} declaration(s) moved earlier: window widened by ${(wid / 1024).toFixed(0)} KB total (biggest ${(Math.max(...relocations.map(r => r.newWindow)) / 1024).toFixed(0)} KB)`); for (const r of relocations.sort((a, b) => (b.newWindow - b.oldWindow) - (a.newWindow - a.oldWindow)).slice(0, 5)) console.error(`     ${r.name}: window ${(r.oldWindow / 1024).toFixed(0)} KB -> ${(r.newWindow / 1024).toFixed(0)} KB`); }
  console.error('   [fixed] biggest statements the weave leaves in place:');
  for (const r of fixedRows.slice(0, 8)) console.error(`     ${String(r.n).padStart(7)} B @${r.at}  ${r.txt}`);
}

// ---- recursive emitter: original spans, re-ordered; nested bodies first ----
// The output is built as a chunk list, and every chunk that came from the source keeps its ORIGINAL
// span, so the metric below can say where each byte of the output originally lived.
const chunks = [];                                  // {text, o0, o1} (o0/o1 null for separators)
let outLen = 0;
const push = (text, o0 = null, o1 = null) => { chunks.push({ text, o0, o1 }); outLen += text.length; };
const wovenBlocks = [...plans.keys()];
function maximalInside(start, end, self) {
  return wovenBlocks.filter((b) => b !== self && b.start >= start && b.end <= end &&
    !wovenBlocks.some((c) => c !== b && c !== self && c.start >= start && c.end <= end && c.start <= b.start && c.end >= b.end && (c.start < b.start || c.end > b.end)));
}
// Separator rule at statement boundaries. A statement ending in `}` is ambiguous to the parser's eye:
// `return{...}` + a following `function`/`(`/`[`… cannot be split by ASI, and a block-like statement
// (`function f(){}`) does not need one. An empty statement is always legal, so the rule is simply:
// terminate unless the previous statement already ends in `;`. Costs one byte per statement that
// changed position; buys "no ASI hazard was introduced by the re-ordering".
const endCh = (t) => t[t.length - 1];
function sepBetween(prev) {
  if (prev === null) return '';
  return endCh(prev) === ';' ? '' : ';';
}
function emitNode(node) {                            // push a node's text, splicing its woven bodies
  // NB: no separators here — this runs INSIDE a statement (splitting it around a woven body), and a
  // `;` inserted mid-expression would be a syntax error. Separators are a statement-boundary concern
  // and live in emitBody().
  if (node.__textParts) {                                                      // synthetic statement built
    for (const q of node.__textParts) push(q.t, q.o0 === undefined ? null : q.o0, q.o1 === undefined ? null : q.o1);
    return;                                                                    // from parts that keep real
  }
  if (node.__text !== undefined) { push(node.__text, null, null); return; }   // synthetic statement
  if (plans.has(node)) return emitBody(node);
  if (node.__wrap) {                                                           // synthetic declaration
    push(node.__wrap.pre, null, null);
    let wcur = node.start;
    for (const b of maximalInside(node.start, node.end, node)) {
      if (b.start > wcur) slicePush(wcur, b.start);
      emitBody(b);
      wcur = b.end;
    }
    if (node.end > wcur) slicePush(wcur, node.end);
    push(node.__wrap.post, null, null);
    return;
  }
  let cur = node.start;
  for (const b of maximalInside(node.start, node.end, node)) {
    if (b.start > cur) slicePush(cur, b.start);
    emitBody(b);
    cur = b.end;
  }
  if (node.end > cur) slicePush(cur, node.end);
}
// ---- TEXT EDITS: statements that must be emitted with one sub-span replaced --------------------------
// Used by the labelled-shell lift: a shell body's own-level `return` has to become `break L`, and the bytes of
// that return sit INSIDE a statement that is otherwise emitted verbatim. Each edit is registered against a
// span inside a statement already recorded as rewritten, so the content-conservation check knows those bytes
// are allowed to leave the output.
function registerEdit(start, end, text) {
  if (textEditList.some((e) => e.start === start)) throw new Error('duplicate text edit at ' + start + ': existing ' + JSON.stringify(textEditList.find((e) => e.start === start)) + ' new ' + JSON.stringify({ start, end, text }) + ' :: ' + JSON.stringify(src.slice(start - 40, start + 40)));
  textEditList.push({ start, end, text });
  textEditList.sort((a, b) => a.start - b.start);
}
function slicePush(a, b) {                  // push src[a,b) with any registered edits applied
  let cur = a;
  let lo = 0, hi = textEditList.length;
  while (lo < hi) { const m = (lo + hi) >> 1; if (textEditList[m].start < a) lo = m + 1; else hi = m; }
  for (let k = lo; k < textEditList.length && textEditList[k].start < b; k++) {
    const e = textEditList[k];
    if (e.start > cur) push(src.slice(cur, e.start), cur, e.start);
    push(e.text, null, null);
    cur = Math.max(cur, e.end);
  }
  if (b > cur) push(src.slice(cur, b), cur, b);
}
const stmtRows = [];                               // placement dump: one row per emitted region statement
function emitBody(block) {
  const p = plans.get(block);
  const order = arrangement.get(block);
  const parts = [];
  // The braces are real bytes of the original body, so they are pushed with their own coordinates: that keeps
  // the content-conservation check exact (an earlier cut pushed them as synthetics, which showed up as 2 B of
  // "dropped" text in every one of ~3,700 woven bodies).
  push(src.slice(block.start, block.start + 1), block.start, block.start + 1);
  for (let i = 0; i < p.d; i++) { const t = src.slice(p.stmts[i].start, p.stmts[i].end); push(t, p.stmts[i].start, p.stmts[i].end); parts.push(t); }
  for (const idx of order) {
    const st = p.region[idx];
    const prev = parts.length ? parts[parts.length - 1] : null;
    const first = src[st.start];
    const sep = parts.length ? sepBetween(prev) : '';
    if (sep) push(sep);
    const at = chunks.length;
    const outStart = outLen;
    emitNode(st);
    if (stmtRows) { const k = (p.kindOf && p.kindOf.get(idx)) || { kind: 'fixed', key: null }; stmtRows.push({ out: outStart, len: outLen - outStart, o0: st.start, block: block.start, kind: k.kind, key: k.key }); }
    // remember the *first* chunk of this statement for the separator bookkeeping
    let tailText = '';
    for (let k = at; k < chunks.length; k++) tailText = chunks[k].text.slice(-1) || tailText;
    parts.push(tailText || 'x');
  }
  push(src.slice(block.end - 1, block.end), block.end - 1, block.end);
}
// top level
{
  let cur = 0;
  for (const b of maximalInside(0, src.length, null)) {
    const before = src.slice(cur, b.start);
    if (before) push(before, cur, b.start);
    emitBody(b);
    cur = b.end;
  }
  const tail = src.slice(cur);
  if (tail) push(tail, cur, src.length);
}
const out = chunks.map((c) => c.text).join('');

// ---- RUN EXPORT assertion: a helper must live in a body whose arrangement will place it --------------
// A helper is a synthetic declaration; a parent body that never reaches a plan is emitted verbatim, and the
// helper's text would simply not exist in the output while its call still pointed at it. Refuse the build
// instead of shipping that (the flag is off by default, so this can only fire in an experiment).
if (exportedHelpers.length) {
  const homeless = exportedHelpers.filter((h) => !plans.has(h.parent));
  if (homeless.length) throw new Error(`RUN EXPORT: ${homeless.length} helper(s) were declared in a body the arrangement never planned`);
}

// ---- [debug] optional chunk map dump (WEAVE_MAP=path): {o0,o1,out,len} per chunk -----
if (process.env.WEAVE_MAP) {
  let p = 0;
  const rows = chunks.map((c) => { const r = { o0: c.o0, o1: c.o1, out: p, len: c.text.length }; p += c.text.length; return r; });
  fs.writeFileSync(process.env.WEAVE_MAP, JSON.stringify({ src_len: src.length, out_len: out.length, chunks: rows, stmts: stmtRows }));
}

// ---- CONTENT CONSERVATION ---------------------------------------------------------------------------
// Two questions, answered on the emitted chunks rather than on a body correspondence:
//   dropped   : is any byte of any original statement missing from the output?
//   duplicated: was any byte of the original emitted twice?
// A chunk that carries coordinates must be an exact slice of the original (asserted), so coverage is exact.
// The only legal holes are the wrapper bytes of a shell dissolution inlined (`!function(p){` … `}(x)`), whose
// contents are emitted with their own coordinates.
function contentConservation() {
  const iv = [];
  for (const c of chunks) {
    if (c.o0 === null) continue;
    if (src.slice(c.o0, c.o1) !== c.text) return { ok: false, why: `chunk text does not match its coordinates @${c.o0}` };
    iv.push([c.o0, c.o1]);
  }
  iv.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let dup = 0, prevEnd = -1;
  const merged = [];
  for (const [a, b] of iv) {
    if (a < prevEnd) dup += Math.min(prevEnd, b) - a;
    if (a <= prevEnd) { if (b > prevEnd) { merged[merged.length - 1][1] = b; prevEnd = b; } continue; }
    merged.push([a, b]); prevEnd = b;
  }
  const rw = dissolveRewritten.concat(seqRewritten, fnHoistRewritten).sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const insideRewritten = (h0, h1) => rw.some(([a, b]) => h0 >= a && h1 <= b);
  const spans = stmtInventory.slice().sort((x, y) => x[0] - y[0] || y[1] - x[1]);
  let holes = 0, holeBytes = 0, firstHole = null, mi = 0;
  for (const [s0, s1] of spans) {
    while (mi < merged.length && merged[mi][1] <= s0) mi++;
    let cur = s0;
    for (let k = mi; k < merged.length && merged[k][0] < s1; k++) {
      const [a, b] = merged[k];
      if (a > cur) { const h1 = Math.min(a, s1); if (!insideRewritten(cur, h1)) { holes++; holeBytes += h1 - cur; if (!firstHole) firstHole = [cur, h1]; } }
      cur = Math.max(cur, Math.min(b, s1));
      if (cur >= s1) break;
    }
    if (cur < s1 && !insideRewritten(cur, s1)) { holes++; holeBytes += s1 - cur; if (!firstHole) firstHole = [cur, s1]; }
  }
  const real = iv.reduce((x, [a, b]) => x + (b - a), 0);
  const why = holes ? `dropped ${holeBytes} B in ${holes} span(s), first @${firstHole[0]} ("${src.slice(firstHole[0], firstHole[0] + 60)}")` : (dup ? `duplicated ${dup} B` : '');
  return { ok: !holes && !dup, holes, holeBytes, dup, real, merged: merged.length, why };
}

// ---- self-gates ----
const checks = [];
if (stmtInventory.length) {
  const cc = contentConservation();
  if (debug || !cc.ok) console.error(`   [content] original statements ${stmtInventory.length} · ${cc.real} B of statement text kept · merged chunks ${cc.merged} · holes ${cc.holes}/${cc.holeBytes} B · duplicated ${cc.dup} B${cc.why ? ' — ' + cc.why : ''}`);
  checks.push(['no statement text is dropped or duplicated (content conservation)', cc.ok]);
}
let outBodyCounts = [];
globalThis.__outBodies = [];                       // debug: spans of the output's function bodies
const inBodyCounts = bodyList.map((b) => b.body.filter((x) => x.type !== 'EmptyStatement').length);
try {
  const outAst = parser.parse(out, { sourceType: 'script', allowReturnOutsideFunction: true });
  checks.push(['output re-parses', true]);
  const outBodies = [];
  walk(outAst, (n) => { if (isFn(n) && n.body && n.body.type === 'BlockStatement') outBodies.push(n.body); });
  outBodyCounts = outBodies.map((b) => b.body.filter((x) => x.type !== 'EmptyStatement').length);
  if (globalThis.__outBodies) globalThis.__outBodies.splice(0, globalThis.__outBodies.length, ...outBodies.map((b) => ({ start: b.start, end: b.end })));
} catch (e) {
  checks.push(['output re-parses', false]);
  const at = (e && e.pos) || 0;
  console.error(`   parse error at ${at}: ${String(e.message).slice(0, 120)}`);
  console.error(`   … ${JSON.stringify(out.slice(Math.max(0, at - 160), at + 80))}`);
  if (argv.includes('--force')) { fs.writeFileSync(outPath + '.broken', out); console.error(`   wrote ${outPath}.broken for inspection`); }
}
// Sequence splitting ADDS statements on purpose, so the expected count is the input count plus the split
// extras the planner recorded for that same body. Everything else must still be count-for-count identical.
// A body that reaches a plan is emitted statement-by-statement, so every statement the transforms ADDED is
// in the output. A body that never reaches a plan is emitted as a verbatim source slice, so a dissolution
// inside it is invisible in the output — its delta must NOT be expected there.
// The expectation is read off the PLAN, not reconstructed: for a body that is planned, the emitter writes
// exactly `d` directive statements plus the region, and the region is the post-transform statement list — so
// counting it (minus empty statements, which the output parse also ignores) is exact. For a body that is not
// planned the emitter writes the source slice verbatim, whose statement count is the input count minus the
// dissolution delta (a mutation inside a verbatim body never reaches the output).
let expectedCounts = bodyList.map((b, i) => {
  // A planned body is emitted statement by statement from `stmts.slice(d)`; `region` is that same list with
  // sequences exploded into parts, so the STATEMENT count is the mutated statement count (do NOT add up
  // region entries — an early cut of this expectation did, and came out 745 too high).
  if (plans.has(b)) return inBodyCounts[i];
  // An unplanned body is pushed as one verbatim source slice: the ORIGINAL text, so a dissolution that
  // mutated its statement list does not show up in the output.
  return inBodyCounts[i] - (dissolveDelta.get(b) || 0);
}).concat(helperCounts);
{
  // A dissolved shell's own body disappears from the output ONLY if the chain of parents it was inlined
  // into ends in a body that is planned (emitted statement by statement). If the chain ends in a body that
  // is emitted as a verbatim source slice, the shell is still in the text, nested as it always was — which
  // is how an earlier cut of this accounting came up 38 statements short.
  const gone = new Map();
  for (const [shellBody] of dissolvedInto) {
    let root = shellBody, guard = 0;
    while (dissolvedInto.has(root) && guard++ < 64) root = dissolvedInto.get(root);
    if (!plans.has(root)) continue;                     // the whole chain sits inside a verbatim body
    const si = bodyList.indexOf(shellBody);
    if (si < 0) continue;
    const n = inBodyCounts[si] - (dissolveDelta.get(shellBody) || 0);   // the shell's ORIGINAL statement count
    if (n <= 0) continue;
    gone.set(n, (gone.get(n) || 0) + 1);
  }
  if (gone.size) {
    const kept = [];
    for (const n of expectedCounts) {
      const k = gone.get(n);
      if (k > 0) { gone.set(n, k - 1); continue; }
      kept.push(n);
    }
    expectedCounts = kept;
  }
}
{
  if (process.env.WEAVE_COUNT_DEBUG === '1') {
    for (const [i, n] of outBodyCounts.entries()) {
      const exp = expectedCounts[i];
      if (exp === undefined || n === exp) continue;
      const b = globalThis.__outBodies[i];
      const inb = bodyList[i];
      console.error(`--- body #${i}: out ${n} vs exp ${exp}`);
      if (b) console.error('    OUT:', JSON.stringify(out.slice(b.start, Math.min(b.end, b.start + 400))));
      if (inb) console.error('    IN :', JSON.stringify(src.slice(inb.start, Math.min(inb.end, inb.start + 400))));
    }
  }
  const a = outBodyCounts.slice().sort((x, y) => x - y);
  const b = expectedCounts.slice().sort((x, y) => x - y);
  const same = JSON.stringify(a) === JSON.stringify(b);
  if (!same && debug) {
    console.error(`   [count] output bodies ${a.length}, expected ${b.length}`);
    for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) { console.error(`   [count] first divergence at #${i}: output ${a[i]} vs expected ${b[i]}`); break; }
    const sumIn = inBodyCounts.reduce((x, y) => x + y, 0);
    const plannedIn = bodyList.reduce((x, b) => x + (plans.has(b) ? inBodyCounts[bodyList.indexOf(b)] : 0), 0);
    const deltaSum = [...dissolveDelta.values()].reduce((x, y) => x + y, 0);
    console.error(`   [count] terms: bodies_in_ast ${bodyList.length} · stmts_in_ast ${sumIn} · of which planned ${plannedIn} · helpers ${helperCounts.length}/${helperCounts.reduce((x, y) => x + y, 0)} · splitExtra ${[...splitExtra.values()].reduce((x, y) => x + y, 0)} · dissolveDelta ${deltaSum} · dissolvedShells ${dissolvedShells.length} · chains ${dissolvedInto.size}`);
    console.error(`   [count] statement totals: output ${a.reduce((x, y) => x + y, 0)} vs expected ${b.reduce((x, y) => x + y, 0)}`);
    const hist = (arr) => { const m = new Map(); for (const v of arr) m.set(v, (m.get(v) || 0) + 1); return m; };
    const ha = hist(a), hb = hist(b);
    const keys = [...new Set([...ha.keys(), ...hb.keys()])].sort((x, y) => x - y);
    console.error('   [count] histogram diff (count: out/exp): ' + keys.filter((k) => ha.get(k) !== hb.get(k)).map((k) => `${k}:${ha.get(k) || 0}/${hb.get(k) || 0}`).join(' · '));
  }
  // Under dissolution bodies stop corresponding one to one BY DESIGN (a shell's statements move into its
  // parent and the shell's own body leaves the output), so this comparison is reported, not gated: the
  // content-conservation check is what proves nothing was lost or duplicated.
  if (process.env.WEAVE_DISSOLVE === '1') console.error(`   [count] (diagnostic, not gated under dissolution) body-count sets ${same ? 'match' : 'differ'}`);
  else checks.push(['every body keeps its statement count (split-aware)', same]);
}
{
  let sameUnits = true, orderOk = true, relocOk = true;
  for (const [block, p] of plans) {
    const order = arrangement.get(block);
    if (order.slice().sort((a, b) => a - b).join(',') !== p.region.map((_, i) => i).join(',')) sameUnits = false;
    const movable = p.movableAll || (() => { const m = new Set(p.fns); for (const g of p.groups) for (const i of g.runs) m.add(i); return m; })();
    for (const g of p.groups) if (g.reloc) for (let i = g.reloc.to; i < g.reloc.from; i++) {
      for (const nm of (g.reloc.names || [g.name])) if (reachesRead(p.region[i], nm)) {
        relocOk = false;
        if (debug) console.error(`   [reloc] body@${block.start} ${g.name}: statement ${i} can reach a read of ${nm} inside the widened span`);
      }
    }
    const beforeFixed = p.region.map((_, i) => i).filter((i) => !movable.has(i)).join(',');
    const afterFixed = order.filter((i) => !movable.has(i)).join(',');
    if (beforeFixed !== afterFixed) {
      orderOk = false;
      if (debug) console.error(`   [order] body@${block.start} FIXED differs\n     before ${beforeFixed.slice(0, 120)}\n     after  ${afterFixed.slice(0, 120)}`);
    }
    for (const g of p.groups) {
      const want = g.free ? g.runs.filter((i) => !g.free.has(i)) : g.runs;
      const seq = order.filter((i) => want.includes(i)).join(',');
      if (seq !== want.join(',')) {
        orderOk = false;
        if (debug) console.error(`   [order] body@${block.start} group ${g.name} differs\n     want ${want.join(',')}\n     got  ${seq}`);
      }
    }
  }
  checks.push(['the same statements are present (permutation only)', sameUnits]);
  checks.push(['fixed statements and every run group keep their relative order', orderOk]);
  checks.push([`relocated declarations widen the window without crossing a reachable read (${relocations.length} relocated)`, relocOk]);
}

// ---- metrics ------------------------------------------------------------------
// The question the weave answers is "is a piece still a contiguous region?". Origin is read off the
// ORIGINAL position: the source is cut into 23 equal byte ranges (the build carries 23 pieces).
//
//   contiguous_run : the longest stretch of the output whose bytes all come from ONE origin range.
//                    Before the weave this is the size of a whole range (~1/23 of the file, i.e. a
//                    piece laid out end to end); after it should collapse to a few KB.
//   window_share   : inside the worst 10%-wide window of the file, the largest share of bytes from one
//                    origin range (the roadmap's §4.2 metric; target ≤ 0.25).
function metrics(useOutput) {
  const tracked = chunks.filter((c) => c.o0 !== null);
  let run = 0;
  const posOf = new Map();
  for (const c of chunks) { posOf.set(c, run); run += c.text.length; }
  const ordered = tracked.slice().sort((a, b) => (useOutput ? posOf.get(a) - posOf.get(b) : a.o0 - b.o0));
  const bucketOf = new Map(tracked.map((c) => [c, Math.floor((c.o0 / src.length) * 23)]));
  // contiguous single-origin run
  let best = 0, cur = 0, curBucket = null, startPos = 0;
  const runs = [];
  for (const c of ordered) {
    const p0 = useOutput ? posOf.get(c) : c.o0;
    const b = bucketOf.get(c);
    if (b !== curBucket) {
      if (cur > 0) runs.push({ at: startPos, len: cur, bucket: curBucket });
      if (cur > best) best = cur;
      curBucket = b;
      startPos = p0;
    }
    cur = (p0 + c.text.length) - startPos;
  }
  if (cur > best) best = cur;
  if (process.env.WEAVE_DEBUG === '1') {
    runs.sort((a, b) => b.len - a.len);
    for (const r of runs.slice(0, 5))
      console.error(`   [run] ${useOutput ? 'out' : 'in'}@${r.at} len=${r.len} origin-bucket=${r.bucket}${useOutput ? '  src~' + r.bucket * Math.floor(src.length / 23) : ''}`);
  }
  // worst 10% window
  const total = useOutput ? out.length : src.length;
  const win = Math.floor(total * 0.10), step = Math.max(500, Math.floor(total * 0.01));
  let worst = 0;
  for (let start = 0; start + win <= total; start += step) {
    const share = new Map();
    for (const c of tracked) {
      const a = useOutput ? posOf.get(c) : c.o0;
      const b2 = useOutput ? a + c.text.length : c.o1;
      if (b2 <= start || a >= start + win) continue;
      const ov = Math.min(b2, start + win) - Math.max(a, start);
      if (ov <= 0) continue;
      const kb = bucketOf.get(c);
      share.set(kb, (share.get(kb) || 0) + ov);
    }
    for (const [, v] of share) worst = Math.max(worst, v / win);
  }
  return { contiguous_run: best, window_share: +worst.toFixed(3) };
}
const mBefore = metrics(false);
const mAfter = metrics(true);

// how many bytes of the file are code that changed position (the "woven mass")
const movedBytes = (() => {
  let n = 0;
  for (const [block, p] of plans) {
    const order = arrangement.get(block);
    const movable = new Set(p.fns);
    for (const g of p.groups) for (const i of g.runs) movable.add(i);
    p.region.forEach((st, i) => { if (movable.has(i)) n += st.end - st.start; });
  }
  return n;
})();

const report = {
  file: inPath, seed: SEED >>> 0, bytes_in: src.length, bytes_out: out.length, delta: out.length - src.length,
  woven_bytes: movedBytes, woven_share: +(100 * movedBytes / src.length).toFixed(1),
  bodies_woven: stats.bodies, bodies_total: stats.bodiesTotal, statements_in_woven_bodies: stats.statements,
  function_declarations_moved: stats.fns, run_statements_moved: stats.runs, run_groups: stats.groups, run_groups_blocked: stats.blocked,
  metric_before: mBefore, metric_after: mAfter,
  checks,
};
if (asJson) console.log(JSON.stringify(report, null, 1));
else {
  console.log(`weave     : ${inPath} seed=${SEED >>> 0}`);
  console.log(`bodies    : ${stats.bodies} woven of ${stats.bodiesTotal} function bodies (${stats.statements} statements)`);
  console.log(`moved     : ${stats.fns} hoisted functions · ${stats.runs} split runs over ${stats.groups} groups (${stats.blocked} group(s) had no private window, ${stats.impure} group(s) carry a call/read and stayed put)`);
  console.log(`woven mass: ${movedBytes} B = ${report.woven_share}% of the file changed position`);
  console.log(`bytes     : ${src.length} -> ${out.length} (${out.length - src.length >= 0 ? '+' : ''}${out.length - src.length})`);
  console.log(`metric    : longest single-origin run  before ${mBefore.contiguous_run} B  after ${mAfter.contiguous_run} B`);
  console.log(`            worst 10%-window single-origin share  before ${mBefore.window_share}  after ${mAfter.window_share}`);
  for (const [name, ok] of checks) console.log(`   ${ok ? 'PASS' : 'FAIL'}  ${name}`);
}
// A failed self-check normally refuses the build. `--force` is for MEASUREMENT ONLY (e.g. the
// WEAVE_SCRAMBLE upper-bound experiment, which breaks the order rules on purpose): the output is written
// with a `.broken` suffix so it can never be mistaken for a candidate, and the failure is repeated.
if (checks.some(([, ok]) => !ok)) {
  if (argv.includes('--force') && mode === 'apply') {
    fs.writeFileSync(outPath + '.broken', out);
    console.error(`REFUSING TO SHIP: a self-check failed — measurement copy written to ${outPath}.broken (never a candidate)`);
    process.exit(1);
  }
  console.error('REFUSING TO WRITE: a self-check failed'); process.exit(1);
}
if (mode === 'apply') { fs.writeFileSync(outPath, out); console.log(`weave     : written ${outPath}`); }
