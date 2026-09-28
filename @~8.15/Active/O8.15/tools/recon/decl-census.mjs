// decl-census.mjs — declarations >=4 KB with a literal init: count, bytes, member counts.
//   node tools/recon/decl-census.mjs [pre.js]
// The census the malformed tool call failed to run on 2026-09-27: 15 declarations, 114 KB total, biggest
// 28,860 B — which is how the declaration-material hypothesis was sized down and superseded by §20.
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const parser = require('/home/user/Active/engines/node_modules/@babel/parser');
const src = fs.readFileSync(process.argv[2] || '/tmp/cc34-weave-in.js', 'utf8');
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });
const walk = (n, cb) => { cb(n); for (const k of Object.keys(n)) { if (['loc','start','end','leadingComments','trailingComments'].includes(k)) continue; const v = n[k]; if (Array.isArray(v)) { for (const c of v) if (c && typeof c.type === 'string') walk(c, cb); } else if (v && typeof v.type === 'string') walk(v, cb); } };
const rows = [];
walk(ast, (n) => {
  if (n.type !== 'VariableDeclaration') return;
  const size = n.end - n.start;
  if (size < 4000) return;
  const decl = n.declarations[0];
  if (!decl || !decl.init) return;
  const t = decl.init.type;
  if (t !== 'ObjectExpression' && t !== 'ArrayExpression') return;
  rows.push({ name: decl.id && decl.id.type === 'Identifier' ? decl.id.name : '(pattern)', size, type: t, members: t === 'ObjectExpression' ? decl.init.properties.length : decl.init.elements.length, multi: n.declarations.length });
});
rows.sort((a, b) => b.size - a.size);
const kb = (n) => (n / 1024).toFixed(0);
console.log('declarations >=4 KB with object/array literal init: ' + rows.length + ' · total ' + kb(rows.reduce((a, r) => a + r.size, 0)) + ' KB');
console.log('  >=10 KB: ' + rows.filter((r) => r.size >= 10000).length + ' (' + kb(rows.filter((r) => r.size >= 10000).reduce((a, r) => a + r.size, 0)) + ' KB)');
for (const r of rows.slice(0, 12)) console.log('   ' + String(r.size).padStart(7) + ' B  ' + r.type.padEnd(15) + ' members ' + String(r.members).padStart(5) + '  declarators ' + r.multi + '  ' + r.name);
const byType = {}; for (const r of rows) byType[r.type] = (byType[r.type] || 0) + r.size;
console.log('  bytes by kind: ' + JSON.stringify(byType));
