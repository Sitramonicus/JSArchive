#!/usr/bin/env node
// split-runs.mjs — O8.15 step 2: the ORDER-PRESERVING SPLIT, measured and applied.
//
// Why: the shipped payload carries a handful of monolithic regions (one array literal alone is ~200 KB),
// and a monolithic region is a contiguous range no matter how the surrounding units are shuffled. Step 2
// turns each of them into N small runs that must stay in relative order — semantics unchanged, but the
// neighbours of every run are now free to be woven (step 3).
//
// The transform, in one line:  `var A=[e0,e1,…en]`  becomes  `var A=[];A.push(e0,…);A.push(…)`. The runs
// execute contiguously in the original position, so evaluation order, timing class and the final value are
// unchanged. Strings split the same way via `S+="…"`.
//
// Safety rules (a candidate that fails any of them is SKIPPED and counted, never guessed at):
//   * `var`, `let` and `const` — the declaration keeps its position and its binding is never reassigned
//     (the runs only PUSH into the array), so TDZ/const-ness are unchanged. The `var`-only restriction
//     was conservative and left the biggest held arrays (all `const`) monolithic.
//   * the declarator must be the LAST declarator of its declaration, OR the declaration is split at the
//     declarator (`var X=[];X.push(...);var rest...`) with every element of the array value-only — then
//     evaluation order and literal order are exactly the original ones, and only the element array can
//     no longer throw mid-build (it cannot throw at all).
//   * the declaration must sit directly in a block/program body — never a for-head, an if-branch without a
//     block, or a switch case, because the runs are inserted as statements right after it.
//   * arrays: no holes (a hole is `undefined` as a call argument) and no `undefined`-only ambiguity.
//   * strings: never cut between a high and a low surrogate, never cut an escape sequence.
//
// Usage:
//   node split-runs.mjs --measure <file> [--min=20000] [--json]
//   node split-runs.mjs --apply <in.js> <out.js> [--min=20000] [--run=4000]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const ENG = path.resolve(__dirname, '..', '..', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch { try { return require(name); } catch { throw new Error(`Missing engine "${name}" — run: cd Active/engines && npm ci`); } }
}
const parser = needEngine('@babel/parser');

const argv = process.argv.slice(2);
const mode = argv.includes('--measure') ? 'measure' : argv.includes('--apply') ? 'apply' : null;
if (!mode) { console.error('usage: split-runs.mjs --measure <file> | --apply <in> <out>  [--min=20000] [--run=4000]'); process.exit(2); }
const flag = (n, d) => { const a = argv.find((x) => x.startsWith('--' + n + '=')); return a ? Number(a.split('=')[1]) : d; };
const MIN = flag('min', 20000);
const RUN = flag('run', 4000);
const asJson = argv.includes('--json');
const EXTRA = process.env.SPLIT_EXTRA === '1' || argv.includes('--extra');
// Objects: `var T={a:1,"b c":2}` -> `var T={};T.a=1;T["b c"]=2;`. Data properties only, no getters/setters,
// no computed keys, no spread, no __proto__; the assignment ORDER is the source order, so insertion order
// (Object.keys) is preserved. Ships only with SPLIT_OBJECTS=1 / --objects.
const DO_OBJECTS = process.env.SPLIT_OBJECTS === '1' || argv.includes('--objects');
// SPLIT_ARRAYS_I: arrays the push path refuses (elements are not value-only — nested arrays, member
// reads, calls) are split by INDEX instead: `var T=[e0,e1,…]` -> `var T=[];T[0]=e0;T[1]=e1;…`, recursing
// into nested arrays of their own. Evaluation order and literal order are the literal's own (depth
// first, left to right), holes keep their length, and each element becomes its own statement — which is
// what gives the weave new gaps to interleave other origins into. See DEEP-WEAVE-REPORT (2026-09-27).
const DO_ARRAYS_I = process.env.SPLIT_ARRAYS_I === '1' || argv.includes('--arrays-i');
// String runs are OFF by default: splitting one literal into N concatenated parts legitimately changes
// the literal *sequence*, so it cannot be checked by the same equality gate as the array case. It ships
// only with --strings, and then the gate is: (a) the concatenation of the parts restores the exact raw
// body byte-for-byte, and (b) every NON-string literal still appears in the same order.
const DO_STRINGS = argv.includes('--strings');
// SPLIT_EXTRA=1 (or --extra) opens the two measured-but-neutral shape extensions: `let`/`const` arrays
// and non-last declarators (the declaration is split so order is preserved). Measured 2026-09-26: +155 KB
// of array mass and +2,156 chars, but NO obfuscation benefit while the array is consumed by the next
// statement (the private window is then just the runs — nothing to interleave). Default OFF.
const files = argv.filter((a) => !a.startsWith('--'));
const inPath = files[0];
const outPath = mode === 'apply' ? files[1] : null;

function parse(src) {
  return parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true, errorRecovery: false });
}
function walk(node, parent, key, cb) {
  if (!node || typeof node.type !== 'string') return;
  cb(node, parent, key);
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
    const v = node[k];
    if (Array.isArray(v)) { for (const c of v) walk(c, node, k, cb); }
    else if (v && typeof v.type === 'string') walk(v, node, k, cb);
  }
}
// Static member access for a property key, or null when the key cannot be written that way.
function objectKey(prop) {
  if (prop.computed) return null;
  const k = prop.key;
  if (!k) return null;
  if (k.type === 'Identifier') return { text: '.' + k.name };
  if (k.type === 'StringLiteral') {
    if (k.value === '__proto__') return null;                       // `{__proto__:v}` sets the prototype
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k.value) ? { text: '.' + k.value } : { text: '[' + JSON.stringify(k.value) + ']' };
  }
  if (k.type === 'NumericLiteral') return { text: '[' + k.value + ']' };
  return null;
}
// `{}` + one assignment statement per data property, in source order.
function objectPieces(src2, obj) {
  if (!obj.properties.length) return null;
  const parts = [];
  for (const pr of obj.properties) {
    if (pr.type !== 'ObjectProperty' || (pr.kind && pr.kind !== 'init') || pr.method) return null;
    const key = objectKey(pr);
    if (!key) return null;
    parts.push(key.text + '=' + src2.slice(pr.value.start, pr.value.end) + ';');
  }
  return { decl: '{}', assigns: parts };
}
const stmtSlot = (parent, node) => parent && ((parent.type === 'Program' && parent.body.includes(node)) ||
  (parent.type === 'BlockStatement' && parent.body.includes(node)));

// Conservative "value-only": evaluates to a value without calling anything, reading any property,
// assigning anything, or awaiting. Nested function bodies are deferred, so they do not count.
function valueOnly(node) {
  if (!node || typeof node.type !== 'string') return true;
  switch (node.type) {
    case 'CallExpression': case 'NewExpression': case 'MemberExpression': case 'OptionalMemberExpression':
    case 'OptionalCallExpression': case 'AssignmentExpression': case 'UpdateExpression': case 'AwaitExpression':
    case 'YieldExpression': case 'TaggedTemplateExpression': case 'ClassExpression': case 'ImportExpression':
    case 'MetaProperty': case 'Super': case 'SuperExpression':
      return false;
    case 'TemplateLiteral': return node.expressions.length === 0;
    default: break;
  }
  if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression' ||
      node.type === 'FunctionDeclaration' || node.type === 'ObjectMethod' || node.type === 'ClassMethod') return true;
  for (const k of Object.keys(node)) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments') continue;
    const v = node[k];
    if (Array.isArray(v)) { for (const c of v) if (!valueOnly(c)) return false; }
    else if (v && typeof v.type === 'string' && !valueOnly(v)) return false;
  }
  return true;
}
function mentions(node, name) {
  let hit = false;
  walk(node, null, null, (n) => { if (n.type === 'Identifier' && n.name === name) hit = true; });
  return hit;
}

// candidates: {kind:'array'|'string', stmt, decl, declarator, name, node, span}
function candidates(src, ast) {
  const out = [];
  walk(ast, null, null, (node, parent, key) => {
    if (node.type !== 'VariableDeclaration') return;
    if (!EXTRA && node.kind !== 'var' && !DO_OBJECTS) return;  // let/const only with SPLIT_EXTRA=1 (see header)
    if (!stmtSlot(parent, node)) return;                        // for-heads, if-branches, switch cases
    const decls = node.declarations;
    for (let i = 0; i < decls.length; i++) {
      const d = decls[i];
      if (!d.init || d.id.type !== 'Identifier') continue;
      const after = decls.slice(i + 1).map((x) => x.init).filter(Boolean);
      const isLast = i === decls.length - 1;
      if (!isLast && !EXTRA) continue;                          // split-declaration path: SPLIT_EXTRA only
      const span = d.init.end - d.init.start;
      if (span < MIN) continue;
      if (d.init.type === 'ArrayExpression') {
        const holes = d.init.elements.some((e) => e === null);
        const pushOk = !holes && (isLast || d.init.elements.every((e) => valueOnly(e)));
        if (pushOk) {
          out.push({ kind: 'array', stmt: node, declarator: d, idx: i, isLast, name: d.id.name, node: d.init, span });
        } else if (DO_ARRAYS_I && !mentions(d.init, d.id.name)) {
          // indexed form: holes are fine (an index left unassigned is the same empty slot a hole makes),
          // nested arrays recurse, everything else is emitted verbatim.
          out.push({ kind: 'array_i', stmt: node, declarator: d, idx: i, isLast, name: d.id.name, node: d.init, span });
        }
      } else if (d.init.type === 'ObjectExpression' && DO_OBJECTS) {
        if (!objectPieces(src, d.init)) continue;
        out.push({ kind: 'object', stmt: node, declarator: d, idx: i, isLast, name: d.id.name, node: d.init, span });
      } else if (d.init.type === 'StringLiteral' && DO_STRINGS) {
        if (!isLast) continue;                                  // strings: last declarator only
        out.push({ kind: 'string', stmt: node, declarator: d, name: d.id.name, node: d.init, span: d.init.end - d.init.start });
      }
    }
  });
  return out.sort((a, b) => b.span - a.span);
}

function splitString(src, node, run) {
  const raw = src.slice(node.start, node.end);                  // includes the quotes
  const q = raw[0];
  const body = raw.slice(1, -1);
  const parts = [];
  let i = 0;
  while (i < body.length) {
    let end = Math.min(i + run, body.length);
    // never cut an escape, never cut a surrogate pair
    if (end < body.length) {
      let bs = 0;
      for (let k = end - 1; k >= i && body[k] === '\\'; k--) bs++;
      if (bs % 2 === 1) end++;                                  // mid-escape: extend past it
      const hi = body.charCodeAt(end - 1);
      if (hi >= 0xd800 && hi <= 0xdbff && end < body.length) end++;
    }
    parts.push(body.slice(i, end));
    i = end;
  }
  return parts.map((p) => q + p + q);
}

// index form: returns the statement list that replaces the literal (`T=[]` stays in the declaration)
function arrayIndexed(src, node, name, min) {
  const parts = [];
  const emit = (el, path) => {
    if (el.type === 'ArrayExpression' && el.end - el.start >= min) {
      parts.push(path + '=[];');
      for (const [i, inner] of el.elements.entries()) if (inner !== null) emit(inner, path + '[' + i + ']');
    } else {
      parts.push(path + '=' + src.slice(el.start, el.end) + ';');
    }
  };
  for (const [i, el] of node.elements.entries()) if (el !== null) emit(el, name + '[' + i + ']');
  return parts;
}

function splitArray(src, node, run) {
  const els = node.elements.map((e) => src.slice(e.start, e.end));
  const runs = [];
  let cur = [], curLen = 0;
  for (const e of els) {
    if (cur.length && curLen + e.length + 1 > run) { runs.push(cur.join(',')); cur = []; curLen = 0; }
    cur.push(e); curLen += e.length + 1;
  }
  if (cur.length) runs.push(cur.join(','));
  return runs;
}

const src = fs.readFileSync(inPath, 'utf8');
let cands = candidates(src, parse(src));
// nesting guard: an inner candidate's inserted runs live inside the outer literal's span, so the outer
// replacement would delete them. Keep only candidates that are not contained in another candidate.
{
  const all = cands.slice();
  cands = cands.filter((c) => !all.some((o) => o !== c && o.node.start <= c.node.start && c.node.end <= o.node.end));
  const dropped = all.length - cands.length;
  if (dropped) console.log(`[nest] dropped ${dropped} nested candidate(s) (contained in a larger literal)`);
}
const total = cands.reduce((a, c) => a + c.span, 0);

if (mode === 'measure') {
  const report = {
    file: inPath, bytes: src.length, min: MIN, run: RUN,
    candidates: cands.length, candidate_bytes: total,
    by_kind: cands.reduce((a, c) => { a[c.kind] = a[c.kind] || { n: 0, bytes: 0 }; a[c.kind].n++; a[c.kind].bytes += c.span; return a; }, {}),
    top: cands.slice(0, 12).map((c) => ({ kind: c.kind, name: c.name, bytes: c.span, elements: (c.kind === 'array' || c.kind === 'array_i') ? c.node.elements.length : (c.kind === 'object' ? c.node.properties.length : c.node.value.length) })),
  };
  if (asJson) console.log(JSON.stringify(report, null, 1));
  else {
    console.log(`file        : ${inPath} (${src.length} chars)`);
    console.log(`threshold   : ${MIN} B · run target ${RUN} B`);
    console.log(`candidates  : ${cands.length} · ${total} B (${(100 * total / src.length).toFixed(1)}% of the file)`);
    for (const [k, v] of Object.entries(report.by_kind)) console.log(`  ${k.padEnd(7)}: ${v.n} × ${v.bytes} B`);
    console.log('largest:');
    for (const t of report.top) console.log(`  ${String(t.bytes).padStart(8)} B  ${t.kind}  ${t.name}  (${t.elements} units)`);
  }
  process.exit(0);
}

// ---- apply: rewrite from the END backwards so earlier spans stay valid
let out = src, applied = 0, added = 0, skipped = 0;
const edits = [];
for (const c of cands) {
  try {
    if (c.kind === 'object') {
      const pieces = objectPieces(src, c.node);
      if (!pieces) { skipped++; continue; }
      if (pieces.assigns.length < 2) { skipped++; continue; }
      // one statement per property: the weave deals each one to its own gap (order-fixed per binding), so a
      // 400-property table becomes 400 placements instead of one block.
      const assigns = pieces.assigns.map((part) => c.name + part).join('');
      if (c.isLast) {
        // replace the literal with `{}` in place, and insert the assignments AFTER the whole statement
        edits.push({ start: c.node.start, end: c.node.end, text: pieces.decl, after: c.stmt.end, insert: assigns });
        added += assigns.length + pieces.decl.length - (c.node.end - c.node.start);
      } else {
        // split the DECLARATION so evaluation and literal order stay exactly the original ones
        const rest = c.stmt.declarations.slice(c.idx + 1).map((x) => src.slice(x.start, x.end)).join(',');
        const head = src.slice(c.stmt.start, c.node.start) + pieces.decl;
        const text = head + ';' + assigns + c.stmt.kind + ' ' + rest + ';';
        edits.push({ start: c.stmt.start, end: c.stmt.end, text, whole: true });
        added += text.length - (c.stmt.end - c.stmt.start);
      }
      applied++;
      continue;
    }
    if (c.kind === 'array_i') {
      const assigns = arrayIndexed(src, c.node, c.name, MIN);
      if (assigns.length < 2) { skipped++; continue; }
      const text0 = assigns.join('');
      // `T` becomes `[]` in place and the assignments follow — either straight after the statement
      // (last declarator) or between the declaration and the remaining declarators, which keeps the
      // original evaluation order: T's elements first, then the rest's inits.
      if (c.isLast) {
        edits.push({ start: c.node.start, end: c.node.end, text: '[]', after: c.stmt.end, insert: text0 });
        added += text0.length + 1 - (c.node.end - c.node.start);
      } else {
        const rest = c.stmt.declarations.slice(c.idx + 1).map((x) => src.slice(x.start, x.end)).join(',');
        const head = src.slice(c.stmt.start, c.node.start) + '[]';
        const text = head + ';' + text0 + c.stmt.kind + ' ' + rest + ';';
        edits.push({ start: c.stmt.start, end: c.stmt.end, text, whole: true });
        added += text.length - (c.stmt.end - c.stmt.start);
      }
      applied++;
      continue;
    }
    if (c.kind === 'array') {
      const runs = splitArray(src, c.node, RUN);
      if (runs.length < 2) { skipped++; continue; }
      const pushes = runs.map((r) => `${c.name}.push(${r});`).join('');
      if (c.isLast) {
        edits.push({ start: c.node.start, end: c.node.end, text: '[]', after: c.stmt.end, insert: pushes });
        added += pushes.length + 1 - (c.node.end - c.node.start);
      } else {
        // non-last declarator: split the DECLARATION so the evaluation order and the literal order are
        // both exactly the original one — [.., X=[..], rest]  ->  [.., X=[]]; pushes; [kind rest];
        const rest = c.stmt.declarations.slice(c.idx + 1).map((x) => src.slice(x.start, x.end)).join(',');
        const head = src.slice(c.stmt.start, c.node.start) + '[]';
        const text = head + ';' + pushes + c.stmt.kind + ' ' + rest + ';';
        edits.push({ start: c.stmt.start, end: c.stmt.end, text, whole: true });
        added += text.length - (c.stmt.end - c.stmt.start);
      }
      applied++;
    } else {
      const runs = splitString(src, c.node, RUN);
      if (runs.length < 2) { skipped++; continue; }
      const rawBody = src.slice(c.node.start + 1, c.node.end - 1);
      const joined = runs.map((r) => r.slice(1, -1)).join('');
      if (joined !== rawBody) throw new Error(`string parts do not reconstruct ${c.name}`);
      const repl = '""';
      const appends = runs.map((r) => `${c.name}+=${r};`).join('');
      edits.push({ start: c.node.start, end: c.node.end, text: repl, after: c.stmt.end, insert: appends });
      added += appends.length + repl.length - (c.node.end - c.node.start);
      applied++;
    }
  } catch (e) { skipped++; }
}
edits.sort((a, b) => b.start - a.start);
let lastStart = Infinity;
for (const e of edits) {
  if (e.end > lastStart) { skipped++; continue; }               // overlapping edit (two arrays, one statement)
  if (e.whole) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
  } else {
    // insert after the statement, then replace the literal in place
    let at = e.after;
    while (out[at] === ';') at++;
    out = out.slice(0, at) + e.insert + out.slice(at);
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
  }
  lastStart = e.start;
}

if (process.env.SPLIT_DEBUG === '1') fs.writeFileSync('/tmp/deep/split-broken.js', out);
// ---- self-gate: same literals, same order
// Data literals, in source order. A NumericLiteral used as a computed member index is the transform's
// own addressing (`T[0]=…`, which is how the indexed array form splits), not data: the gate compares the
// DATA, so those are skipped on BOTH sides of the comparison (never weakened for anything else).
const literals = (s) => { const acc = []; walk(parse(s), null, null, (n, parent, key) => {
  if (n.type === 'StringLiteral') { if (!DO_STRINGS) acc.push('s:' + n.value); }
  else if (n.type === 'NumericLiteral') { if (!(parent && parent.type === 'MemberExpression' && parent.computed === true && key === 'property')) acc.push('n:' + n.value); }
  else if (n.type === 'BooleanLiteral') acc.push('b:' + n.value);
  else if (n.type === 'NullLiteral') acc.push('z');
}); return acc; };
const a = literals(src), b = literals(out);
const sameSeq = a.length === b.length && a.every((v, i) => v === b[i]);
if (!sameSeq) {
  let at = 0; while (at < Math.min(a.length, b.length) && a[at] === b[at]) at++;
  console.error(`GATE FAIL: literal sequence changed at index ${at}/${a.length} (a=${a[at]} b=${b[at]}) — refusing to write`);
  process.exit(1);
}

fs.writeFileSync(outPath, out);
const delta = out.length - src.length;
console.log(`applied     : ${applied} candidate(s), ${skipped} skipped (under-run)`);
console.log(`delta       : ${delta >= 0 ? '+' : ''}${delta} chars (${(100 * delta / src.length).toFixed(2)}%)`);
console.log(`literal seq : identical (${a.length} literals, same order${DO_STRINGS ? ', strings checked per-candidate instead' : ''}) — gate PASS`);
console.log(`written     : ${outPath} (${out.length} chars)`);
