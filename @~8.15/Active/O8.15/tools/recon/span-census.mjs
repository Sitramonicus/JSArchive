// span-census.mjs — what a source range is made of, by statement class and bytes.
//   node tools/recon/span-census.mjs <start> <end> [pre.js]
// Used 2026-09-27 to name the material behind a concentrated bucket (e.g. bucket 12 = one 175,426 B
// comma-sequence statement whose first part is a 172,924 B function expression).
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const src = fs.readFileSync('/tmp/cc34-weave-in.js', 'utf8');
const [a, b] = process.argv.slice(2).map(Number);
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
const isFn = (n) => n && ['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(n.type);
// collect the statements of the big body (the one with the most statements)
let big = null, bigN = 0;
const walk = (n) => { if (isFn(n) && n.body && n.body.type === 'BlockStatement' && n.body.body.length > bigN) { bigN = n.body.body.length; big = n.body; } for (const k of Object.keys(n)) { if (['loc','start','end'].includes(k)) continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c); } else if (v && typeof v.type === 'string') walk(v); } };
walk(ast);
const rows = big.body.filter((s) => s.end > a && s.start < b);
const cls = (s) => {
  const e = s.expression;
  if (s.type === 'FunctionDeclaration') return 'fn decl (movable now)';
  if (e && e.type === 'AssignmentExpression' && e.operator === '=' && e.left.type === 'Identifier' && isFn(e.right)) return 'var X = function (NOT movable)';
  if (e && e.type === 'CallExpression' && isFn(e.callee)) return 'IIFE shell (NOT movable)';
  if (e && e.type === 'CallExpression' && e.callee.type === 'SequenceExpression') return 'IIFE shell via sequence (NOT movable)';
  if (s.type === 'VariableDeclaration') return 'var decl ' + (s.declarations.some((d) => d.init && ['ArrayExpression','ObjectExpression'].includes(d.init.type)) ? '(literal tables)' : '(other)');
  if (e && e.type === 'AssignmentExpression' && e.left.type === 'MemberExpression') return 'member write (run)';
  if (e && e.type === 'CallExpression' && e.callee.type === 'MemberExpression' && e.callee.property.name === 'push') return 'push (run)';
  if (e && e.type === 'CallExpression') return 'call statement (NOT movable)';
  if (e && e.type === 'SequenceExpression') return 'comma sequence (NOT movable)';
  return s.type + ' (NOT movable)';
};
const agg = new Map();
for (const s of rows) { const k = cls(s); const e = agg.get(k) || { n: 0, bytes: 0 }; e.n++; e.bytes += s.end - s.start; agg.set(k, e); }
const tot = rows.reduce((x, s) => x + (s.end - s.start), 0);
console.log('source span ' + a + '..' + b + ' (' + (b - a) + ' B) holds ' + rows.length + ' statements of the big body, ' + tot + ' B:');
for (const [k, v] of [...agg.entries()].sort((x, y) => y[1].bytes - x[1].bytes)) console.log('  ' + String(v.n).padStart(5) + ' stmts ' + String(v.bytes).padStart(8) + ' B  ' + k);
console.log('  biggest single statements:');
for (const s of rows.slice().sort((x, y) => (y.end - y.start) - (x.end - x.start)).slice(0, 6)) console.log('    ' + String(s.end - s.start).padStart(7) + ' B @' + s.start + '  ' + cls(s) + '  ' + JSON.stringify(src.slice(s.start, s.start + 60)));
