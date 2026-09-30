#!/usr/bin/env node
// fixed-inventory.mjs — S1-B fixed-item census with exactly-one-classification per item.
//
// Answers the first two boxes of RELEASE-CHECKLIST 1B:
//   * inventory every fixed statement/body in the worst target windows (the windows above the 0.25
//     single-origin share target of the acceptance ruler);
//   * give every fixed item exactly one classification: `split`, `movable-whole`, or `rejected` with an
//     explicit semantic reason from the checklist vocabulary (return/break/continue, label, scope, binding,
//     async/generator, exception-timing, private, directive, parameter, this, arguments, super,
//     new.target, slice-rewrite).
//
// "fixed" is exactly the weave's own `kind: 'fixed'` from the WEAVE_MAP placement dump (not a hoisted
// function declaration, not an accepted run-group member). The predicates mirror weave-payload.mjs
// (wrapHazard / boundNames / clean / pureRunStmt / pureValue / declRelocatable / index-form / runOf), and the
// transform routing distinguishes:
//   * same-scope movers (declaration relocation, index-free freeing, span-decidable purity relaxation) —
//     these move a statement INSIDE its body, so control-flow/`this` hazards do not apply to them;
//   * scope-changing splitters (seq split, literal-table split, function-body split, run-wrap helpers) —
//     the helper boundary is where the checklist's hazard vocabulary applies.
//
// Usage:
//   node fixed-inventory.mjs <map.json> <pre.js> <post.js> [--json <out.json>] [--md <out.md>] [--top=N]
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');

const argv = process.argv.slice(2);
const files = argv.filter((a) => !a.startsWith('--'));
const [mapPath, prePath, postPath] = files;
const asJsonPath = argv.includes('--json') ? argv[argv.indexOf('--json') + 1] : null;
const asMdPath = argv.includes('--md') ? argv[argv.indexOf('--md') + 1] : null;
const topN = Number((argv.find((a) => a.startsWith('--top=')) || '--top=30').split('=')[1]);

const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const pre = fs.readFileSync(prePath, 'utf8');
const post = fs.readFileSync(postPath, 'utf8');

// ---- origin attribution (same as share-sweep.mjs, char space) ------------------------------------
const preLen = map.src_len, postLen = post.length;
const N = 23, bucketOf = (o) => Math.floor((o / preLen) * N);
const origin = new Int32Array(postLen).fill(-1);
for (const c of map.chunks) {
  if (c.o0 === null) continue;
  const n = Math.min(c.len, c.o1 - c.o0);
  for (let k = 0; k < n; k++) origin[c.out + k] = c.o0 + k;
}

// ---- target windows (same geometry as share-sweep.mjs) -------------------------------------------
const W = Math.max(1, Math.floor(postLen * 0.10));
const windows = [];
for (let s = 0; s + W <= postLen; s += Math.max(1, Math.floor(W / 8))) {
  const counts = new Map();
  for (let i = s; i < s + W; i++) { const o = origin[i]; if (o < 0) continue; const b = bucketOf(o); counts.set(b, (counts.get(b) || 0) + 1); }
  let best = 0, bestB = -1;
  for (const [b, n] of counts) if (n > best) { best = n; bestB = b; }
  windows.push({ at: s, share: best / W, bucket: bestB });
}
const targets = windows.filter((w) => w.share > 0.25);
const sortedW = windows.slice().sort((a, b) => b.share - a.share);

// ---- pre-AST statement index ----------------------------------------------------------------------
const ast = parser.parse(pre, { sourceType: 'script', allowReturnOutsideFunction: true });
const stmtTypes = new Set(['ExpressionStatement', 'VariableDeclaration', 'FunctionDeclaration', 'ReturnStatement',
  'IfStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement', 'WhileStatement', 'DoWhileStatement',
  'SwitchStatement', 'TryStatement', 'ThrowStatement', 'BreakStatement', 'ContinueStatement', 'LabeledStatement',
  'BlockStatement', 'EmptyStatement', 'DebuggerStatement', 'WithStatement']);
const stmtByStart = new Map();
const blockByStart = new Map();
const idOcc = new Map();
function walk(n, parent) {
  if (!n || typeof n.type !== 'string') return;
  if (stmtTypes.has(n.type) && !stmtByStart.has(n.start)) stmtByStart.set(n.start, n);
  if (n.type === 'BlockStatement') blockByStart.set(n.start, n);
  if (n.type === 'Identifier' && n.name) { if (!idOcc.has(n.name)) idOcc.set(n.name, []); idOcc.get(n.name).push(n.start); }
  for (const k of Object.keys(n)) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
    const v = n[k];
    if (Array.isArray(v)) { for (const c of v) walk(c, n); }
    else if (v && typeof v.type === 'string') walk(v, n);
  }
}
walk(ast, null);

// ---- predicates mirrored from weave-payload.mjs ----------------------------------------------------
const isFn = (n) => n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' ||
  n.type === 'ArrowFunctionExpression' || n.type === 'ObjectMethod' || n.type === 'ClassMethod');
function walkN(node, cb) {
  if (!node || typeof node.type !== 'string') return;
  cb(node);
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
    const v = node[k];
    if (Array.isArray(v)) { for (const c of v) walkN(c, cb); }
    else if (v && typeof v.type === 'string') walkN(v, cb);
  }
}
const patternNames = (pat, out) => {
  if (!pat || typeof pat.type !== 'string') return;
  if (pat.type === 'Identifier') out.add(pat.name);
  else if (pat.type === 'ObjectPattern') for (const pr of pat.properties) patternNames(pr.type === 'RestElement' ? pr.argument : pr.value, out);
  else if (pat.type === 'ArrayPattern') for (const el of pat.elements) patternNames(el, out);
  else if (pat.type === 'AssignmentPattern') patternNames(pat.left, out);
  else if (pat.type === 'RestElement') patternNames(pat.argument, out);
};
const boundNames = (st) => {
  const out = new Set();
  const rec = (n, top) => {
    if (!n || typeof n.type !== 'string') return;
    if (!top && (isFn(n) || n.type === 'ObjectMethod' || n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod' || n.type === 'StaticBlock')) {
      if (n.type === 'FunctionDeclaration' && n.id) out.add(n.id.name);
      return;
    }
    if (n.type === 'VariableDeclarator') patternNames(n.id, out);
    else if (n.type === 'ClassDeclaration' && n.id) out.add(n.id.name);
    else if (n.type === 'FunctionDeclaration' && n.id) out.add(n.id.name);
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) rec(c, false); }
      else if (v && typeof v.type === 'string') rec(v, false);
    }
  };
  rec(st, true);
  return out;
};
const namesUsedIn = (node) => {
  const s = new Set();
  walkN(node, (n) => { if (n.type === 'Identifier' && n.name) s.add(n.name); });
  return s;
};
// Hazard scan for the HELPER BOUNDARY (run-wrap legality) in the checklist's vocabulary.
// Depth precision matters (this is the audit the checklist asks for):
//   * `return` is a hazard only when it returns from the wrap-level function (arrows return from themselves
//     and are descended into; non-arrow functions are opaque);
//   * `break`/`continue` are hazards only when they cross the helper boundary — a break inside a loop or
//     switch that is itself inside the statement stays with the statement; a labeled break/continue is
//     safe when its label is defined inside the statement (labels cannot cross function boundaries, but
//     they do cross the wrap boundary);
//   * `await`/`yield` are hazards only at the wrap level (an async arrow's own await moves with the arrow);
//   * try/throw at the wrap level are recorded as `exception-timing` (conservative, checklist vocabulary —
//     a helper frame changes the stack a throw builds);
//   * the landed run-wrap hazard set itself checks only return/this/arguments/super/new.target — the extra
//     classes here are recorded deliberately so no refusal is silent.
function hazardOf(st) {
  let reason = null;
  const labels = new Set();
  (function collectLabels(n, depthFns) {
    if (!n || typeof n.type !== 'string') return;
    const boundary = depthFns > 0 && (isFn(n) || n.type === 'ObjectMethod' || n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod' || n.type === 'StaticBlock');
    if (boundary && n.type !== 'ArrowFunctionExpression') return;
    if (n.type === 'LabeledStatement' && n.label && n.label.name) labels.add(n.label.name);
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) collectLabels(c, boundary ? depthFns : depthFns + (isFn(n) ? 1 : 0)); }
      else if (v && typeof v.type === 'string') collectLabels(v, boundary ? depthFns : depthFns + (isFn(n) ? 1 : 0));
    }
  })(st, 0);
  const rec = (n, top, inArrow, loopDepth) => {
    if (reason || !n || typeof n.type !== 'string') return;
    const boundary = !top && (isFn(n) || n.type === 'ObjectMethod' || n.type === 'ClassMethod' || n.type === 'ClassPrivateMethod' || n.type === 'StaticBlock');
    if (boundary) {
      if (n.type !== 'ArrowFunctionExpression') return;
      for (const k of Object.keys(n)) {
        if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
        const v = n[k];
        if (Array.isArray(v)) { for (const c of v) rec(c, true, true, 0); }
        else if (v && typeof v.type === 'string') rec(v, true, true, 0);
      }
      return;
    }
    const t = n.type;
    if (t === 'ReturnStatement' && !inArrow && !top) { reason = 'return'; return; }
    if (t === 'BreakStatement' && !inArrow) {
      if (n.label) { if (!labels.has(n.label.name)) { reason = 'label'; return; } }
      else if (loopDepth === 0) { reason = 'break'; return; }
    }
    if (t === 'ContinueStatement' && !inArrow) {
      if (n.label) { if (!labels.has(n.label.name)) { reason = 'label'; return; } }
      else if (loopDepth === 0) { reason = 'continue'; return; }
    }
    if (t === 'ThisExpression') { reason = 'this'; return; }
    if (t === 'Super') { reason = 'super'; return; }
    if (t === 'MetaProperty') { reason = 'new.target'; return; }
    if (t === 'Identifier' && n.name === 'arguments') { reason = 'arguments'; return; }
    if ((t === 'AwaitExpression' || t === 'YieldExpression') && !inArrow) { reason = 'async/generator'; return; }
    if (t === 'ClassPrivateProperty' || t === 'ClassPrivateMethod' || t === 'PrivateName') { reason = 'private'; return; }
    if (t === 'WithStatement') { reason = 'scope'; return; }
    if ((t === 'TryStatement' || t === 'ThrowStatement') && !inArrow) { reason = 'exception-timing'; return; }
    const deeper = (t === 'ForStatement' || t === 'ForInStatement' || t === 'ForOfStatement' || t === 'WhileStatement' ||
      t === 'DoWhileStatement' || t === 'SwitchStatement') ? loopDepth + 1 : loopDepth;
    for (const k of Object.keys(n)) {
      if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
      const v = n[k];
      if (Array.isArray(v)) { for (const c of v) rec(c, false, inArrow, deeper); }
      else if (v && typeof v.type === 'string') rec(v, false, inArrow, deeper);
    }
  };
  if (st.type === 'ReturnStatement') return 'return';
  if (st.type === 'ThrowStatement') return 'exception-timing';
  if (st.type === 'ExpressionStatement' && st.directive) return 'directive';
  rec(st, true, false, 0);
  return reason;
}
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
      if (!pureValue(c.object) || c.object.type === 'FunctionExpression' || c.object.type === 'ArrowFunctionExpression') return false;
      return node.arguments.every((a) => a && a.type !== 'SpreadElement' && pureValue(a));
    }
    case 'StringLiteral': case 'NumericLiteral': case 'BooleanLiteral': case 'NullLiteral': return true;
    case 'UnaryExpression': return (node.operator === '-' || node.operator === '+') && pureValue(node.argument);
    case 'FunctionExpression': return true;
    case 'ArrayExpression': return node.elements.every((e) => e === null || pureValue(e));
    case 'ObjectExpression': return node.properties.every((p) => p.type === 'ObjectProperty' && !p.computed && pureValue(p.value));
    default: return false;
  }
}
function pureRunStmt(stmt) {
  const e = stmt.expression;
  if (!e) return false;
  if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && e.callee.object.type === 'Identifier' &&
    e.callee.property.name === 'push') return e.arguments.every((a) => (a.type === 'SpreadElement' ? pureValue(a.argument) : pureValue(a)));
  if (e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'MemberExpression') return pureValue(e.right);
  return false;
}
const runOf = (stmt) => {
  if (stmt.type !== 'ExpressionStatement' || !stmt.expression) return null;
  const e = stmt.expression;
  if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && e.callee.computed === false &&
    e.callee.property.type === 'Identifier' && e.callee.property.name === 'push' && e.callee.object.type === 'Identifier') return { name: e.callee.object.name };
  if (e.type === 'AssignmentExpression' && e.operator === '+=' && e.left.type === 'Identifier' && e.right.type === 'StringLiteral') return { name: e.left.name };
  if (e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'MemberExpression' && e.left.object.type === 'Identifier') return { name: e.left.object.name };
  return null;
};
const indexForm = (st) => {
  if (st.type !== 'ExpressionStatement' || !st.expression) return false;
  const e = st.expression;
  return e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'MemberExpression' &&
    e.left.computed === true && (e.left.property.type === 'NumericLiteral' || e.left.property.type === 'StringLiteral');
};
const declRelocatableShape = (st) => {
  if (!st || st.type !== 'VariableDeclaration') return false;
  const names = [];
  for (const d of st.declarations) {
    if (!d.id || d.id.type !== 'Identifier') return false;
    if (d.init !== null) {
      const t = d.init.type;
      const lit = t === 'NumericLiteral' || t === 'StringLiteral' || t === 'BooleanLiteral' || t === 'NullLiteral' ||
        (t === 'ArrayExpression' && d.init.elements.length === 0) ||
        (t === 'ObjectExpression' && d.init.properties.length === 0) ||
        (t === 'UnaryExpression' && (d.init.operator === '-' || d.init.operator === '+') && d.init.argument.type === 'NumericLiteral');
      if (!lit) return false;
    }
    names.push(d.id.name);
  }
  return names.length > 0;
};
const bigLiteralShape = (st) => {
  if (!st || st.type !== 'VariableDeclaration') return null;
  for (const d of st.declarations) {
    if (!d.init) continue;
    const t = d.init.type;
    if ((t === 'ArrayExpression' || t === 'ObjectExpression') && (d.init.end - d.init.start) >= 4000) {
      return { kind: t === 'ArrayExpression' ? 'array' : 'object', bytes: d.init.end - d.init.start };
    }
  }
  return null;
};
const SEQ_HEAD_BAD = (p) => {
  const head = pre.slice(p.start, Math.min(p.end, p.start + 12)).trimStart();
  return head[0] === '{' || /^(function|class)\b/.test(head);
};
const seqShape = (st) => st.type === 'ExpressionStatement' && st.expression && st.expression.type === 'SequenceExpression' &&
  st.expression.expressions.length >= 2 && !st.expression.expressions.some(SEQ_HEAD_BAD);

// ---- statement source-slice integrity (mirror of weave's `sliceSafe`, measured from the map) ---------
// A statement whose output-mapped source coverage is short of its span carries registered edits or dropped
// wrapper bytes; run-wrap cannot emit it as a raw helper slice.
function sliceIntactFn(node) {
  let covered = 0;
  for (const c of map.chunks) {
    if (c.o0 === null) continue;
    const a = Math.max(c.o0, node.start), b = Math.min(c.o1, node.end);
    if (b > a) covered += b - a;
  }
  return covered >= (node.end - node.start);
}

// ---- fixed rows inside target windows ---------------------------------------------------------------
const rowInTarget = new Map();
for (const r of map.stmts) {
  if (r.kind !== 'fixed') continue;
  let iw = 0;
  for (const w of targets) {
    const a = Math.max(r.out, w.at), b = Math.min(r.out + r.len, w.at + W);
    if (b > a) iw += b - a;
  }
  if (iw <= 0) continue;
  const prev = rowInTarget.get(r.o0) || { inWin: 0, len: 0, block: r.block, out: r.out };
  prev.inWin += iw; prev.len = Math.max(prev.len, r.len);
  rowInTarget.set(r.o0, prev);
}

// ---- classification (exactly one per item) -----------------------------------------------------------
const items = [];
const classBytes = new Map();
const viaBytes = new Map();
const hazardBytes = new Map();

// largest function body contained in [a,b) (for the body-split class)
function biggestBodyIn(node) {
  let best = 0;
  walkN(node, (n) => {
    if (n.body && n.body.type === 'BlockStatement' && isFn(n)) {
      const s = n.body.end - n.body.start;
      if (s > best) best = s;
    }
  });
  return best;
}

for (const [o0, w] of rowInTarget) {
  const direct = stmtByStart.get(o0) || null;
  // synthetic rows (seq-split parts, dissolve/hook artifacts) anchor at expression positions: recover their
  // real source extent from the map chunks so classification sees the actual material, not a wrong anchor
  let node = direct, span = null, synthetic = false;
  if (!node) {
    let a = Infinity, b = -Infinity, hasSynth = false;
    for (const c of map.chunks) {
      if (c.out >= (w.out ?? 0) && c.out < (w.out ?? 0) + w.len) {
        if (c.o0 === null) { hasSynth = true; continue; }
        a = Math.min(a, c.o0); b = Math.max(b, c.o1);
      }
    }
    if (!isFinite(a)) { a = o0; b = o0 + w.len; }
    span = [a, b];
    synthetic = hasSynth;
    // innermost statement-ish node covering the recovered span
    for (const [s, n] of stmtByStart) {
      if (s <= a && n.end >= b && (!node || s > node.start)) node = n;
    }
    if (!node) node = null;
  }
  const st = node;
  const blk = blockByStart.get(w.block) || null;
  const blkSpan = blk ? [blk.start, blk.end] : null;
  const srcBytes = span ? (span[1] - span[0]) : (st ? st.end - st.start : w.len);
  const head = st ? JSON.stringify(pre.slice(st.start, Math.min(st.end, st.start + 72))) : '(synthetic)';
  const shape = !st ? 'synthetic'
    : synthetic ? ('synthetic-row(' + st.type + ')')
    : st.type === 'FunctionDeclaration' ? 'function-declaration'
    : st.type === 'VariableDeclaration' ? `variable-declaration(${st.kind},${st.declarations.length})`
    : seqShape(st) ? 'comma-sequence'
    : st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression' && isFn(st.expression.callee) ? 'iife-shell'
    : st.type === 'ExpressionStatement' && st.expression.type === 'AssignmentExpression' && st.expression.left.type === 'MemberExpression' ? 'member-write'
    : st.type === 'ExpressionStatement' && st.expression.type === 'CallExpression' ? 'call-statement'
    : st.type;

  // binding escape inside the enclosing block (relevant only for scope-changing transforms)
  let escape = null;
  if (st && blkSpan) {
    for (const nm of boundNames(st)) {
      for (const q of (idOcc.get(nm) || [])) {
        if (q < blkSpan[0] || q >= blkSpan[1]) continue;
        if (q < st.start || q >= st.end) { escape = { name: nm, at: q }; break; }
      }
      if (escape) break;
    }
  }
  const sliceIntact = st ? sliceIntactFn(st) : false;
  const hz = st ? hazardOf(st) : 'slice-rewrite';

  let classification, via = null, reason = null, note = null;
  if (!st) {
    classification = 'rejected'; reason = 'slice-rewrite';
    note = 'synthetic/edited row with no recoverable source span — no admissible byte-preserving transform';
  } else if (!direct && synthetic) {
    // edited/re-emitted synthetic row: the statement slice is not intact, so helper-wrapping cannot take it,
    // but its interior may still be body-split material
    const bb = biggestBodyIn(st);
    if (bb >= 24 * 1024) {
      classification = 'split'; via = 'split:fnbody';
      note = `synthetic row containing a ${bb}-char function body; same-scope helper splitting applies inside the body`;
    } else {
      classification = 'rejected'; reason = 'slice-rewrite';
      note = 'edited/re-emitted synthetic row (registered text edits or dropped wrapper bytes) — raw helper slice would not reproduce it';
      hazardBytes.set('slice-rewrite', (hazardBytes.get('slice-rewrite') || 0) + w.inWin);
    }
  } else if (declRelocatableShape(st)) {
    classification = 'movable-whole'; via = 'movable:decl-reloc';
    note = 'pure-value declaration; byte-preserving declaration relocation moves it intact (same scope)';
  } else if (indexForm(st) && pureRunStmt(st)) {
    classification = 'movable-whole'; via = 'movable:index-free';
    note = 'pure index-form write: index-free freeing + declaration relocation deals it inside its reader window';
  } else if (runOf(st) && st.type === 'ExpressionStatement' && !pureRunStmt(st)) {
    classification = 'movable-whole'; via = 'movable:relax-span';
    note = `run-group member refused as impure (value reads/calls); span-decidable purity relaxation deals it when no crossed span writes what it reads`;
  } else if (runOf(st) && st.type === 'ExpressionStatement' && pureRunStmt(st)) {
    classification = 'movable-whole'; via = 'movable:relax-span';
    note = 'pure member of a refused impure group; partial-group dealing (index-free generalized to push groups) frees it';
  } else if (seqShape(st)) {
    classification = 'split'; via = 'split:seq';
    note = 'comma-sequence statement: parts can become separate statements in place (evaluation order identical)';
  } else if (bigLiteralShape(st)) {
    const bl = bigLiteralShape(st);
    classification = 'split'; via = 'split:literal';
    note = `large ${bl.kind} literal table (${bl.bytes} B): split into per-key/per-index writes (payload-level splitter), which run-group treatment can then deal`;
  } else {
    const bb = biggestBodyIn(st);
    if (bb >= 24 * 1024) {
      classification = 'split'; via = 'split:fnbody';
      note = `contains a ${bb}-char function body; same-scope helper splitting (run-wrap) converts inner runs into placeable declarations`;
    } else if (!hz && !escape && sliceIntact) {
      classification = 'split'; via = 'split:wrap';
      note = 'wrap-admissible: no hazard, no name escapes the statement, slice intact — consecutive runs become same-scope helpers (WEAVE_RUN_WRAP)';
    } else {
      classification = 'rejected';
      if (!sliceIntact) { reason = 'slice-rewrite'; note = 'statement text carries registered edits or dropped wrapper bytes; raw helper slice would not reproduce it'; }
      else if (hz) { reason = hz; note = escape ? `also binds \`${escape.name}\` read outside` : 'helper-boundary hazard (see vocabulary)'; }
      else if (escape) { reason = 'binding'; note = `binds \`${escape.name}\` read outside the statement in the same block; a helper's declarations do not escape it`; }
      else { reason = 'scope'; note = 'no admissible same-scope or helper transform identified'; }
      hazardBytes.set(reason, (hazardBytes.get(reason) || 0) + w.inWin);
    }
  }
  classBytes.set(classification, (classBytes.get(classification) || 0) + w.inWin);
  if (via) viaBytes.set(via, (viaBytes.get(via) || 0) + w.inWin);
  items.push({
    o0, out_len: w.len, src_bytes: srcBytes, in_target_windows: w.inWin, bucket: bucketOf(o0),
    block: w.block, shape, classification, via, reason, note, head,
    synthetic_row: !direct, slice_intact: st ? sliceIntactFn(st) : false,
  });
}

items.sort((a, b) => b.in_target_windows - a.in_target_windows);

// wrap-run aggregation: consecutive split:wrap items in the same block (the body-split material)
const byBlock = new Map();
for (const it of items) {
  if (it.via !== 'split:wrap') continue;
  if (!byBlock.has(it.block)) byBlock.set(it.block, []);
  byBlock.get(it.block).push(it);
}
const wrapRuns = [];
for (const [blk, list] of byBlock) {
  list.sort((a, b) => a.o0 - b.o0);
  let run = [];
  const flush = () => {
    if (!run.length) return;
    const bytes = run.reduce((s, r) => s + r.src_bytes, 0);
    wrapRuns.push({ block: blk, statements: run.length, bytes, o0: run[0].o0, o1: run[run.length - 1].o0 + run[run.length - 1].src_bytes });
    run = [];
  };
  for (const it of list) {
    if (run.length && it.o0 > run[run.length - 1].o0 + run[run.length - 1].src_bytes + 64) flush();
    run.push(it);
  }
  flush();
}
wrapRuns.sort((a, b) => b.bytes - a.bytes);

const totalFixedInTarget = items.reduce((s, i) => s + i.in_target_windows, 0);
const result = {
  generated: new Date().toISOString(),
  inputs: { map: mapPath, pre: prePath, post: postPath, pre_chars: preLen, post_chars: postLen },
  ruler: {
    window_bytes: W, windows: windows.length, windows_above_target: targets.length,
    worst: +sortedW[0].share.toFixed(4), worst_at: sortedW[0].at, worst_bucket: sortedW[0].bucket,
    top10: sortedW.slice(0, 10).map((x) => +x.share.toFixed(4)),
  },
  fixed_in_target_windows: { items: items.length, bytes_weighted_in_windows: totalFixedInTarget },
  by_classification: Object.fromEntries([...classBytes.entries()].map(([k, v]) => [k, Math.round(v)])),
  by_via: Object.fromEntries([...viaBytes.entries()].map(([k, v]) => [k, Math.round(v)])),
  rejected_hazards: Object.fromEntries([...hazardBytes.entries()].map(([k, v]) => [k, Math.round(v)])),
  wrap_runs_over_2kb: wrapRuns.filter((r) => r.bytes >= 2048).length,
  wrap_run_bytes_total: Math.round(wrapRuns.reduce((s, r) => s + r.bytes, 0)),
  items,
};

if (asJsonPath) fs.writeFileSync(asJsonPath, JSON.stringify(result, null, 1));

const md = [];
md.push('# S1-B fixed-item inventory — ' + result.generated.slice(0, 10));
md.push('');
md.push('Inputs: `' + prePath + '` (' + preLen + ' chars) → `' + postPath + '` (' + postLen + ' chars), map `' + mapPath + '`.');
md.push('');
md.push('Every fixed statement row intersecting a window above 0.25, weighted by its bytes inside those windows. Exactly one classification per item (`split` / `movable-whole` / `rejected:<reason>`).');
md.push('');
md.push('## Ruler state (acceptance: windows above 0.25 must reach 0)');
md.push('');
md.push('```text');
md.push(`windows ${windows.length} · above target ${targets.length}/${windows.length} · worst ${result.ruler.worst} (bucket ${result.ruler.worst_bucket} @ ${result.ruler.worst_at})`);
md.push(`top10 ${result.ruler.top10.join(' ')}`);
md.push('```');
md.push('');
md.push('## Classification totals');
md.push('');
md.push('| classification | in-window bytes | items |');
md.push('| --- | ---: | ---: |');
for (const [c, b] of [...classBytes.entries()].sort((a, b) => b[1] - a[1])) {
  md.push(`| ${c} | ${Math.round(b)} | ${items.filter((i) => i.classification === c).length} |`);
}
md.push(`| **total** | **${Math.round(totalFixedInTarget)}** | **${items.length}** |`);
md.push('');
md.push('## Transform unlock ranking (one mechanism per item, in-window bytes)');
md.push('');
md.push('| via | class | in-window bytes | items |');
md.push('| --- | --- | ---: | ---: |');
for (const [v, b] of [...viaBytes.entries()].sort((a, b) => b[1] - a[1])) {
  const cls = items.find((i) => i.via === v).classification;
  md.push(`| ${v} | ${cls} | ${Math.round(b)} | ${items.filter((i) => i.via === v).length} |`);
}
md.push('');
md.push('## Rejected-hazard histogram (checklist vocabulary)');
md.push('');
md.push('| reason | in-window bytes | items |');
md.push('| --- | ---: | ---: |');
for (const [r, b] of [...hazardBytes.entries()].sort((a, b) => b[1] - a[1])) {
  md.push(`| ${r} | ${Math.round(b)} | ${items.filter((i) => i.reason === r).length} |`);
}
md.push('');
md.push('## Wrap-run aggregation (consecutive `split:wrap` items, same block)');
md.push('');
md.push(`Runs ≥ 2 KB: **${result.wrap_runs_over_2kb}**, total **${result.wrap_run_bytes_total} B** (the byte-preserving body-split material).`);
md.push('');
md.push('```text');
for (const r of wrapRuns.slice(0, 12)) md.push(`${String(r.bytes).padStart(8)} B  ${String(r.statements).padStart(4)} stmts  block@${r.block}  span ${r.o0}..${r.o1}`);
md.push('```');
md.push('');
md.push(`## Top ${topN} fixed items by in-window bytes`);
md.push('');
md.push('| in-win B | src B | bucket | class | via / reason | shape | head |');
md.push('| ---: | ---: | ---: | --- | --- | --- | --- |');
for (const it of items.slice(0, topN)) {
  const why = it.via || ('rejected:' + it.reason);
  md.push(`| ${it.in_target_windows} | ${it.src_bytes} | ${it.bucket} | ${it.classification} | ${why} | ${it.shape} | ${it.head.slice(0, 60).replace(/\|/g, '\\|')} |`);
}
md.push('');
md.push('Authoritative per-item records: JSON `items[]` (`classification`, `via`, `reason`, `note`).');
if (asMdPath) fs.writeFileSync(asMdPath, md.join('\n') + '\n');

if (!asJsonPath && !asMdPath) {
  console.log(md.join('\n'));
} else {
  console.log(`fixed-inventory: ${items.length} fixed items in ${targets.length}/${windows.length} target windows, ${Math.round(totalFixedInTarget)} in-window bytes`);
  for (const [c, b] of [...classBytes.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${c.padEnd(14)} ${Math.round(b)} B`);
  for (const [v, b] of [...viaBytes.entries()].sort((a, b) => b[1] - a[1])) console.log(`  via ${v.padEnd(20)} ${Math.round(b)} B`);
}
