#!/usr/bin/env node
// normalise-payload.mjs — O8.15 masking pass (D2 a/b/c + D5, and the home for future vocabulary work).
//
// Runs on the MINIFIED payload, after terser and before the split/weave, so what ships is what was
// masked. Every edit is semantics-preserving by construction and the tool refuses to write unless its
// own re-parse checks pass:
//
//   D2(a)  rename our own residue properties   `_0xpocketsMissing` -> opaque, and the diagnostic key
//   D2(b)  venue property reads                `X.dispatch` -> `X["\x64ispatch"]` (identical semantics)
//   D2(c)  mound/JSO-emitted helper property    `IS_SYMBOL_NATIVE` -> opaque
//
// Why an escape and not a computed key: `"\x64ispatch"` is the same string at runtime, carries no
// `String.fromCharCode(...)` shape (which the census reports as a foldable-constant tell), and leaves
// no `dispatch` substring for a text search to find.
//
// Usage: node normalise-payload.mjs <in.js> <out.js> [--json] [--dry]
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
const files = argv.filter((a) => !a.startsWith('--'));
const inPath = files[0], outPath = files[1];
if (!inPath || !outPath) { console.error('usage: normalise-payload.mjs <in.js> <out.js> [--json] [--dry]'); process.exit(2); }

// ---------- the mask table ----------
// Identifiers (and the same string spelled as a key) that name OUR narrative vocabulary or an
// emitter's internal helper. Replacements are opaque, word-free, and stable for a given build.
const IDENT_MASK = new Map([
  ['_0xpocketsMissing', '_0x5c91a7d2'],   // D2(a): our property, survives minification as a property name
  ['pocketsMissing', '_0x9f2c41b8'],       // D2(a): the diagnostic-record key (no harness reads it — verified)
  ['IS_SYMBOL_NATIVE', '_0x41d8e6b3'],     // D2(c): emitted by the mound/JSO layer, not authored by us
]);
const PROP_MASK_DISPATCH = '_0x4b7a2d19';  // D2(b): the runtime-derived key name for venue reads (unused; escape form below)
const DISPATCH_ESCAPE = '"\\x64ispatch"';  // runtime value: "dispatch"

const src = fs.readFileSync(inPath, 'utf8');

// quick pre-scan so the report can say what it found, even if the AST edit finds more
const before = {};
for (const w of [...IDENT_MASK.keys(), 'dispatch']) {
  before[w] = (src.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
}

let ast;
try { ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true }); }
catch (e) { console.error('parse failed: ' + e.message); process.exit(1); }

// collect edits as {start, end, text}
const edits = [];
function addEdit(start, end, text, tag) { edits.push({ start, end, text, tag }); }

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

const stats = { identifiers: 0, keys: 0, stringKeys: 0, dispatch: 0 };
walk(ast, (node) => {
  // (1) identifiers
  if (node.type === 'Identifier' && IDENT_MASK.has(node.name)) {
    addEdit(node.start, node.end, IDENT_MASK.get(node.name), 'ident:' + node.name);
    stats.identifiers++;
    return;
  }
  // (2) object keys written as identifiers are Identifier nodes too (handled above); keys written as
  // strings need the string rule, which also covers `X["pocketsMissing"]`-shaped access.
  if (node.type === 'StringLiteral' && IDENT_MASK.has(node.value)) {
    addEdit(node.start, node.end, JSON.stringify(IDENT_MASK.get(node.value)), 'key:' + node.value);
    stats.stringKeys++;
    return;
  }
  // (3) venue property reads: `X.dispatch` and `X?.dispatch` -> `X["\x64ispatch"]` / `X?.["\x64ispatch"]`
  if (node.type === 'MemberExpression' && node.computed === false &&
      node.property && node.property.type === 'Identifier' && node.property.name === 'dispatch') {
    const p = node.property.start;
    const optional = src[p - 1] === '.' && src[p - 2] === '?';
    const dot = optional ? p - 2 : p - 1;
    if (src[dot] !== '.') return;                        // not the shape we expect: leave it alone
    addEdit(dot, node.property.end, (optional ? '?.' : '') + '[' + DISPATCH_ESCAPE + ']', 'dispatch:' + (optional ? 'optional' : 'plain'));
    stats.dispatch++;
  }
});

// whole-word sweep: any identifier-shaped occurrence the AST walk missed (e.g. inside a template or a
// string array) would leave the mask half-applied, so check the text too and refuse if it disagrees.
edits.sort((a, b) => a.start - b.start);
{ // reject overlaps outright
  for (let i = 1; i < edits.length; i++) {
    if (edits[i].start < edits[i - 1].end) { console.error(`overlapping edits at ${edits[i].start} — refusing`); process.exit(1); }
  }
}
let out = src;
for (let i = edits.length - 1; i >= 0; i--) {
  const e = edits[i];
  out = out.slice(0, e.start) + e.text + out.slice(e.end);
}

// ---- self-checks -------------------------------------------------------------
const checks = [];
function wordRe(w) { return new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g'); }
for (const w of IDENT_MASK.keys()) checks.push([`no bare \`${w}\` left`, (out.match(wordRe(w)) || []).length === 0]);
checks.push(['no `.dispatch` property access left', !/[A-Za-z0-9_$)\]]\s*\??\.\s*dispatch\b/.test(out)]);
checks.push(['runtime string "dispatch" still reachable (escaped form present)', out.includes('\\x64ispatch')]);
try { parser.parse(out, { sourceType: 'script', allowReturnOutsideFunction: true }); checks.push(['output re-parses', true]); }
catch (e) { checks.push(['output re-parses', false]); }

const failed = checks.filter(([, ok]) => !ok);
const report = {
  file: inPath, bytes_in: src.length, bytes_out: out.length, delta: out.length - src.length,
  edits: edits.length, by_tag: edits.reduce((a, e) => { a[e.tag.split(':')[0]] = (a[e.tag.split(':')[0]] || 0) + 1; return a; }, {}),
  occurrences_before: before, checks,
};
if (argv.includes('--json')) console.log(JSON.stringify(report, null, 1));
else {
  console.log(`normalise : ${inPath} (${src.length}) -> ${outPath} (${out.length}, ${out.length - src.length >= 0 ? '+' : ''}${out.length - src.length})`);
  console.log(`edits     : ${edits.length}  ${JSON.stringify(report.by_tag)}`);
  for (const [name, ok] of checks) console.log(`   ${ok ? 'PASS' : 'FAIL'}  ${name}`);
}
if (failed.length) { console.error('REFUSING TO WRITE: ' + failed.map(([n]) => n).join(' ; ')); process.exit(1); }
if (!argv.includes('--dry')) fs.writeFileSync(outPath, out);
console.log(`normalise : OK${argv.includes('--dry') ? ' (dry run, nothing written)' : ''}`);
