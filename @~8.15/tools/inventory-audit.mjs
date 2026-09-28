#!/usr/bin/env node
// inventory-audit.mjs — what is actually inside Uploads/unicode_list.csv, and what can a JS
// identifier legally use? Written to answer the operator's question ("did we really use only 2 %
// of the inventory?") with numbers instead of impressions.
import fs from 'node:fs';
const CSV = process.argv[2] || '/home/user/Uploads/unicode_list.csv';
const IS_START = /^[\p{ID_Start}_$]$/u, IS_CONT = /^[\p{ID_Continue}$]$/u;
const raw = fs.readFileSync(CSV, 'utf8').split(/\r?\n/);
const rows = [], bad = [];
for (const line of raw.slice(1)) {
  if (!line.trim()) continue;
  const m = line.match(/^([^,]*),([^,]*),(U\+[0-9A-Fa-f]{4,6})$/);
  if (!m) { bad.push(line); continue; }
  const cp = parseInt(m[3].slice(2), 16);
  rows.push({ block: m[1].trim(), ch: m[2] || String.fromCharCode(cp), cp });
}
const uniq = new Map();
for (const r of rows) uniq.set(r.cp, r);
const all = [...uniq.values()];
const bucket = { ascii: 0, bmp: 0, sup: 0 };
const okStart = { ascii: 0, bmp: 0, sup: 0 };
const okCont = { ascii: 0, bmp: 0, sup: 0 };
for (const r of all) {
  const k = r.cp < 0x80 ? 'ascii' : r.cp <= 0xffff ? 'bmp' : 'sup';
  bucket[k]++;
  if (IS_CONT.test(r.ch)) okCont[k]++;
  if (IS_START.test(r.ch)) okStart[k]++;
}
const blocks = new Map();
for (const r of all) {
  if (r.cp < 0x80) continue;
  if (!blocks.has(r.block)) blocks.set(r.block, { total: 0, cont: 0, start: 0, sup: 0 });
  const b = blocks.get(r.block);
  b.total++; if (r.cp > 0xffff) b.sup++;
  if (IS_CONT.test(r.ch)) b.cont++;
  if (IS_START.test(r.ch)) b.start++;
}
const usableBlocks = [...blocks.entries()].filter(([, b]) => b.start >= 8).sort((a, b) => b[1].cont - a[1].cont);
const pct = (n, d) => (100 * n / d).toFixed(1) + '%';
console.log(`== ${CSV}`);
console.log(`lines=${raw.length - 1}  parsed=${rows.length}  unparsed=${bad.length}  distinct code points=${all.length}  distinct blocks=${blocks.size}`);
if (bad.length) console.log('  first unparsed:', JSON.stringify(bad[0]).slice(0, 90));
console.log(`\n-- code points by plane --`);
console.log(`  ASCII (<U+0080)        ${String(bucket.ascii).padStart(6)}   identifier-safe: cont ${okCont.ascii}, start ${okStart.ascii}`);
console.log(`  BMP (U+0080-U+FFFF)    ${String(bucket.bmp).padStart(6)}   identifier-safe: cont ${okCont.bmp} (${pct(okCont.bmp, bucket.bmp)}), start ${okStart.bmp}`);
console.log(`  supplementary (>U+FFFF)${String(bucket.sup).padStart(6)}   identifier-safe: cont ${okCont.sup} (${pct(okCont.sup, bucket.sup)}), start ${okStart.sup}`);
console.log(`\n-- why the rest is not available to a JS identifier --`);
const notCont = all.filter((r) => !IS_CONT.test(r.ch));
console.log(`  ${notCont.length} code points are not ID_Continue (symbols, punctuation, marks, separators...)`);
console.log(`  the CSV is a character INVENTORY (mixed scripts + symbols + marks), not a name list:`);
console.log(`  sample non-identifier entries: ${notCont.slice(0, 12).map((r) => r.block + ':' + r.ch).join(' ')}`);
console.log(`\n-- what dict-gen can draw from (blocks with >= 8 ID_Start chars) --`);
let tStart = 0, tCont = 0, tSup = 0;
for (const [name, b] of usableBlocks) { tStart += b.start; tCont += b.cont; tSup += b.sup; }
console.log(`  usable blocks: ${usableBlocks.length} of ${blocks.size}   chars usable in an identifier: ${tCont}`);
console.log(`    of which leading-capable (ID_Start): ${tStart}`);
console.log(`    of which supplementary-plane (usable only in NON-leading positions, the noSupLead rule): ${tSup}`);
console.log(`  top blocks by usable chars:`);
for (const [name, b] of usableBlocks.slice(0, 12)) console.log(`    ${name.padEnd(26)} ${String(b.cont).padStart(5)} usable (${b.sup} supplementary)`);
