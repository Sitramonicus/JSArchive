// reader-room.mjs — the measurement behind the Deep Weave design (DEEP-WEAVE-MEASURE-2026-09-26.md §6.1).
// For a binding NAME in the payload: which master-body statements can *reach a read of it* — directly, or by
// calling a function (transitively) whose body mentions it. Everything before the first such statement is
// placement room for that binding's pieces (today's rule is blunter: any call ends the window).
// Usage: node reader-room.mjs <payload.js> <name> [--json]
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const [file, NAME, ...rest] = process.argv.slice(2);
const src = fs.readFileSync(file, 'utf8');
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
const isFn = (n) => n && (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression' || n.type === 'ObjectMethod' || n.type === 'ClassMethod');
function kids(n) { const out = []; for (const k of Object.keys(n)) { if (k === 'loc' || k === 'start' || k === 'end') continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) { if (c && typeof c.type === 'string') out.push(c); } } else if (v && typeof v.type === 'string') { out.push(v); } } return out; }
// named local functions: FunctionDeclaration, and `var NAME = function(){}` / `var NAME = () => {}`
const funcs = new Map();
(function w(n) {
  if (n.type === 'FunctionDeclaration' && n.id && n.id.type === 'Identifier') funcs.set(n.id.name, n);
  if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.init && n.init.type === 'FunctionExpression') {
    if (!funcs.has(n.id.name)) funcs.set(n.id.name, n.init);
  }
  for (const c of kids(n)) w(c);
})(ast);
const mentions = (node) => { let hit = false; (function w(n) { if (n.type === 'Identifier' && n.name === NAME) hit = true; for (const c of kids(n)) w(c); })(node); return hit; };
const callsIn = (node) => { const set = new Set(); (function w(n) { if (n.type === 'CallExpression' && n.callee.type === 'Identifier') set.add(n.callee.name); for (const c of kids(n)) w(c); })(node); return set; };
// reader closure: functions that read NAME, then functions that call a reader (transitively)
const readers = new Set();
for (const [name, node] of funcs) if (mentions(node)) readers.add(name);
let grew = true;
while (grew) { grew = false; for (const [name, node] of funcs) { if (readers.has(name)) continue; for (const c of callsIn(node)) { if (readers.has(c) && funcs.has(c)) { readers.add(name); grew = true; break; } } } }
// master body
let master = null;
(function w(n) { if (isFn(n) && n.body && n.body.type === 'BlockStatement') { const s = n.body.end - n.body.start; if (!master || s > master.s) master = { s, b: n.body }; } for (const c of kids(n)) w(c); })(ast);
const stmts = master.b.body;
// find the declaration statement of NAME inside the master body (or the carrier that declares it)
let declIdx = -1;
stmts.forEach((s, i) => { if (declIdx < 0 && new RegExp('(^|[^\\w$])' + NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*=').test(src.slice(s.start, Math.min(s.end, s.start + 200)))) declIdx = i; });
const canReach = (s) => { if (mentions(s)) return true; for (const c of callsIn(s)) { if (readers.has(c)) return true; } return false; };
// The pool may be built anywhere BEFORE the first statement that can reach a reader: a fresh unique
// binding of value-only data cannot be observed earlier, so the whole prefix is placement room.
let barrier = -1, roomBytes = 0, roomStmts = 0;
for (let i = 0; i < stmts.length; i++) {
  if (canReach(stmts[i])) { barrier = i; break; }
  roomBytes += stmts[i].end - stmts[i].start; roomStmts++;
}
const fnSizes = {};
for (const s of (barrier < 0 ? stmts : stmts.slice(barrier))) { if (s.type === 'FunctionDeclaration' && s.id) fnSizes[s.id.name] = s.end - s.start; }
const out = {
  file: file.split('/').pop(), name: NAME, master_statements: stmts.length,
  declaring_statement_index: declIdx,
  reader_functions: readers.size,
  barrier_statement_index: barrier,
  barrier_is_last: barrier < 0,
  room_statements: roomStmts, room_bytes: roomBytes,
  reader_functions_sample: [...readers].slice(0, 8),
};
if (rest.includes('--json')) { console.log(JSON.stringify(out, null, 1)); }
else { for (const [k, v] of Object.entries(out)) console.log(String(k).padEnd(26), typeof v === 'object' ? JSON.stringify(v) : v); }
