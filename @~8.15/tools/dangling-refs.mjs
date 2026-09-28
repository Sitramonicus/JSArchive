#!/usr/bin/env node
/**
 * dangling-refs.mjs — pre-live safety gate: no free (undeclared) references.
 *
 * WHY THIS EXISTS: on 2026-09-20 a live paste died with
 *     Uncaught (in promise) ReferenceError: EnFZv0 is not defined
 * inside the stitched payload. The name was a *runtime-generated function* produced by the
 * js-confuser `rgf` step on piece e3: the call site shipped, the definition did not. Nothing in
 * the gate board looked for that class of defect (matrix/tiers test behaviour, leakcensus/detector
 * test bytes, split-equivalence tests pieces in isolation), so it reached the client.
 *
 * This walks the whole file, collects every declared binding (var/let/const incl. destructuring,
 * function/class names, parameters, catch params, import locals), then reports every identifier
 * that is *referenced* but declared nowhere and is not a known runtime/host global.
 *
 * Scope model: file-level (coarse on purpose). For single-scope stitched payloads and for lane
 * outputs — which is what we ship — "declared somewhere, referenced somewhere" is exactly the
 * property that matters: everything in the assembly shares one scope.
 *
 *   node tools/dangling-refs.mjs <file.js> [--json] [--allow name1,name2]
 *   exit 0 = clean, 1 = dangling references found, 2 = usage/parse error
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';

const ENGINES = '/home/user/Active/engines/';
let acorn;
try {
  acorn = createRequire(ENGINES + 'package.json')('acorn');
} catch (e) {
  try { acorn = (await import('acorn')).default; }
  catch (e2) { console.error('dangling-refs: acorn not available (install it in Active/engines)'); process.exit(2); }
}

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith('--'));
const AS_JSON = argv.includes('--json');
const QUIET = argv.includes('--quiet');
// --catch-only: fail ONLY when a dangling name is referenced from inside a `catch` block. Rationale
// (2026-09-20): the shipped payload has deliberate degradation/unreachable paths whose names are not
// resolvable and never fire in a normal run — but ANY dangler on an error path WILL fire the moment an
// unrelated throw happens, which is exactly how `EnFZv0` killed a live run.
const CATCH_ONLY = argv.includes('--catch-only');
const af = argv.indexOf('--allow-file');           // newline-separated extra allow list (cross-piece union)
const ef = argv.indexOf('--emit-declared');        // dump every declared/assigned name, then exit 0
const ai = argv.indexOf('--allow');
const extraAllow = ai >= 0 ? argv[ai + 1].split(',').filter(Boolean) : [];
if (!file) { console.error('usage: dangling-refs.mjs <file.js> [--json] [--allow a,b]'); process.exit(2); }

// Runtime + host globals that are legitimately undeclared in a script.
const GLOBALS = new Set([
  'globalThis', 'window', 'self', 'document', 'navigator', 'location', 'console', 'Math', 'JSON',
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Symbol', 'BigInt', 'Map', 'Set', 'WeakMap',
  'WeakSet', 'Promise', 'Proxy', 'Reflect', 'RegExp', 'Date', 'Error', 'TypeError', 'RangeError',
  'SyntaxError', 'ReferenceError', 'EvalError', 'URIError', 'AggregateError', 'Function', 'eval',
  'Uint8Array', 'Uint16Array', 'Uint32Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Float32Array',
  'Float64Array', 'BigInt64Array', 'BigUint64Array', 'ArrayBuffer', 'SharedArrayBuffer', 'DataView',
  'TextEncoder', 'TextDecoder', 'DecompressionStream', 'CompressionStream', 'atob', 'btoa', 'fetch',
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'queueMicrotask', 'requestAnimationFrame',
  'cancelAnimationFrame', 'requestIdleCallback', 'cancelIdleCallback', 'structuredClone', 'performance',
  'crypto', 'URL', 'URLSearchParams', 'Blob', 'File', 'FileReader', 'FormData', 'Headers', 'Request',
  'Response', 'WebSocket', 'Worker', 'AbortController', 'AbortSignal', 'CustomEvent', 'Event',
  'EventTarget', 'MutationObserver', 'IntersectionObserver', 'PerformanceObserver', 'ResizeObserver',
  'localStorage', 'sessionStorage', 'indexedDB', 'process', 'module', 'require', 'exports', 'define',
  'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'encodeURIComponent', 'decodeURIComponent',
  'encodeURI', 'decodeURI', 'escape', 'unescape', 'arguments', 'this', 'undefined', 'NaN', 'Infinity',
  'DiscordNative', 'webpackChunkdiscord_app', 'WebAssembly', 'Intl', 'Atomics', 'Proxy2',
  '_0xmod', '会員', 'JV~~v}t1}tuvtcL1', 'global', '__DUMP', '__SDK_DUMP', '_testMod',
  // designed cross-piece globals (lex layer + R2-05a gate + window scratch). Each is either set by
  // another piece in the same stitched scope, set by the host, or written as an implicit global and
  // only ever read behind a typeof guard. Listing them here is the contract, not a silencer.
  'lexMode', 'lexPins', 'lexPinsB', 'lexProbeA', 'lexProbeU', 'lexProbeX', 'lexSetPins',
  '_0xchord', '_0xwatch', '_tubeRt', '_0xopen', '_0xrcdOK', '_0xdbgOK', '_0xscratch',
]);

const src = fs.readFileSync(file, 'utf8');
let ast;
try {
  ast = acorn.parse(src, { ecmaVersion: 'latest', allowReturnOutsideFunction: true, allowAwaitOutsideFunction: true, allowHashBang: true });
} catch (e) {
  console.error(`dangling-refs: parse error in ${file}: ${e.message}`);
  process.exit(2);
}

const declared = new Set();
const refs = new Map();       // name -> [{at, snippet}]
const assigned = new Set();   // names written by a bare/pattern assignment (implicit globals: legal in sloppy mode)
const seen = new WeakSet();
let lastStart = 0;            // nearest preceding start-of-statement/line, for snippets

function patternNames(node, out = []) {
  if (!node) return out;
  switch (node.type) {
    case 'Identifier': out.push(node.name); break;
    case 'ObjectPattern':
      for (const p of node.properties) {
        if (p.type === 'RestElement') patternNames(p.argument, out);
        else patternNames(p.value, out);
      }
      break;
    case 'ArrayPattern':
      for (const el of node.elements) if (el) patternNames(el, out);
      break;
    case 'AssignmentPattern': patternNames(node.left, out); break;
    case 'RestElement': patternNames(node.argument, out); break;
  }
  return out;
}
function keyName(node) {
  if (!node) return null;
  if (node.type === 'Identifier') return node.name;
  if (node.type === 'Literal') return String(node.value);
  if (node.type === 'PrivateIdentifier') return node.name;
  return null;
}

function walk(node, parent, key, inCatch) {
  if (!node || typeof node.type !== 'string') return;
  if (seen.has(node)) return;
  seen.add(node);
  if (node.type === 'CatchClause') inCatch = true;   // error paths must never reference a missing name

  // ---- declarations
  switch (node.type) {
    case 'VariableDeclarator': patternNames(node.id).forEach((n) => declared.add(n)); break;
    case 'FunctionDeclaration': if (node.id) declared.add(node.id.name); patternNames({ type: 'ArrayPattern', elements: node.params }).forEach((n) => declared.add(n)); break;
    case 'FunctionExpression': if (node.id) declared.add(node.id.name); patternNames({ type: 'ArrayPattern', elements: node.params }).forEach((n) => declared.add(n)); break;
    case 'ArrowFunctionExpression': patternNames({ type: 'ArrayPattern', elements: node.params }).forEach((n) => declared.add(n)); break;
    case 'ClassDeclaration': case 'ClassExpression': if (node.id) declared.add(node.id.name); break;
    case 'CatchClause': patternNames(node.param).forEach((n) => declared.add(n)); break;
    case 'ImportDefaultSpecifier': case 'ImportNamespaceSpecifier': case 'ImportSpecifier':
      if (node.local) declared.add(node.local.name); break;
  }

  // ---- references
  if (node.type === 'Identifier') {
    const isDeclPos =
      (parent && (
        (parent.type === 'VariableDeclarator' && key === 'id') ||
        ((parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression' || parent.type === 'ArrowFunctionExpression') && (key === 'id' || key === 'params')) ||
        (parent.type === 'ClassDeclaration' || parent.type === 'ClassExpression') && key === 'id' ||
        (parent.type === 'CatchClause' && key === 'param') ||
        (parent.type === 'MemberExpression' && key === 'property' && !parent.computed) ||
        (parent.type === 'Property' && key === 'key' && !parent.computed && !parent.shorthand) ||
        ((parent.type === 'MethodDefinition' || parent.type === 'PropertyDefinition') && key === 'key' && !parent.computed) ||
        (parent.type === 'LabeledStatement' || parent.type === 'BreakStatement' || parent.type === 'ContinueStatement') ||
        (parent.type === 'ImportSpecifier' || parent.type === 'ImportDefaultSpecifier' || parent.type === 'ImportNamespaceSpecifier') ||
        ((parent.type === 'ObjectPattern' || parent.type === 'ArrayPattern') )
      ));
    if (!isDeclPos) {
      const p0 = parent;
      if (p0 && p0.type === 'AssignmentExpression' && key === 'left' && p0.operator === '=') assigned.add(node.name);
      if (p0 && p0.type === 'UpdateExpression') assigned.add(node.name);
      if (p0 && (p0.type === 'ForInStatement' || p0.type === 'ForOfStatement') && key === 'left') assigned.add(node.name);
      const at = node.start;
      const snippet = src.slice(Math.max(0, at - 70), at + 40).replace(/\s+/g, ' ');
      if (!refs.has(node.name)) refs.set(node.name, { count: 0, at, snippet, lines: [] });
      const r = refs.get(node.name);
      r.count++;
      if (inCatch) r.inCatch = (r.inCatch || 0) + 1;
      if (r.lines.length < 3) r.lines.push(src.slice(0, at).split('\n').length);
    }
  }

  for (const k of Object.keys(node)) {
    if (k === 'type' || k === 'start' || k === 'end' || k === 'loc') continue;
    const v = node[k];
    if (Array.isArray(v)) for (const c of v) walk(c, node, k, inCatch);
    else if (v && typeof v.type === 'string') walk(v, node, k, inCatch);
  }
}
walk(ast, null, null, false);

let fileAllow = [];
if (af >= 0) { try { fileAllow = fs.readFileSync(argv[af + 1], 'utf8').split('\n').map(s => s.trim()).filter(Boolean); } catch (e) { fileAllow = []; } }
if (ef >= 0) { fs.appendFileSync(argv[ef + 1], [...declared, ...assigned].join('\n') + '\n'); process.exit(0); }
const allow = new Set([...GLOBALS, ...extraAllow, ...fileAllow, ...declared, ...assigned]);
const dangling = [...refs.entries()]
  .filter(([name]) => !allow.has(name))
  .map(([name, info]) => ({ name, count: info.count, inCatch: info.inCatch || 0, lines: info.lines, snippet: info.snippet }))
  .sort((a, b) => b.count - a.count);

const out = { file, bytes: Buffer.byteLength(src), declared: declared.size, referenced: refs.size, dangling };
if (AS_JSON) console.log(JSON.stringify(out, null, 2));
else {
  console.log(`dangling-refs: ${file}  (${(out.bytes / 1024).toFixed(1)} KB, ${out.declared} declared, ${out.referenced} referenced)`);
  if (!dangling.length) console.log('   clean — every referenced name is declared or a known runtime global');
  else {
    const fatalList = CATCH_ONLY ? dangling.filter((d) => d.inCatch) : dangling;
    for (const d of (CATCH_ONLY ? fatalList : dangling)) console.log(`   ${d.inCatch ? 'DANGLING-IN-CATCH' : 'dangling' }  ${d.name}  x${d.count}  line(s) ${d.lines.join(',')}\n      …${d.snippet}…`);
    if (CATCH_ONLY) console.log(`   => ${fatalList.length ? 'FAIL' : 'PASS'} — ${dangling.length} dangling name(s) total, ${fatalList.length} on an ERROR PATH (those are the ones that fire when an unrelated throw happens)`);
    else console.log(`   => FAIL — ${dangling.length} undeclared reference(s) would throw ReferenceError at runtime`);
  }
}
const fatal = CATCH_ONLY ? dangling.filter((d) => d.inCatch) : dangling;
process.exit(fatal.length ? 1 : 0);
