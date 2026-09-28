#!/usr/bin/env node
/**
 * script-coverage.mjs (U13) — audit the SHIPPED payload against the operator's own script inventory.
 * Reads Uploads/unicode_list.csv (block, char, U+xxxx) and counts, per block, how many characters of
 * that block actually appear in the payload. Reports totals and calls out requested-but-absent blocks.
 *
 * Usage: node tools/script-coverage.mjs <payload.js> [--csv Uploads/unicode_list.csv] [--json]
 */
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const ci = args.indexOf('--csv');
const csvPath = ci >= 0 ? args[ci + 1] : 'Uploads/unicode_list.csv';
if (!file) { console.error('usage: script-coverage.mjs <payload.js> [--csv <unicode_list.csv>]'); process.exit(2); }

const payload = readFileSync(file, 'utf8');

// block -> codepoint index from the operator's inventory
const blocksByChar = new Map();
for (const line of readFileSync(csvPath, 'utf8').split(/\r?\n/).slice(1)) {
  const m = line.match(/^([^,]*),([^,]*),(U\+[0-9A-Fa-f]{4,6})$/);
  if (!m) continue;
  const block = m[1].trim();
  const cp = parseInt(m[3].slice(2), 16);
  if (!blocksByChar.has(block)) blocksByChar.set(block, new Set());
  blocksByChar.get(block).add(cp);
}
// single pass: count occurrences and distinct chars per block
const counts = new Map(), distinct = new Map();
for (const ch of payload) {
  const cp = ch.codePointAt(0);
  if (cp < 0x80) continue;
  for (const [block, set] of blocksByChar) {
    if (set.has(cp)) {
      counts.set(block, (counts.get(block) || 0) + 1);
      if (!distinct.has(block)) distinct.set(block, new Set());
      distinct.get(block).add(cp);
      break;
    }
  }
}

const out = { file, bytes: Buffer.byteLength(payload), blocks: {}, absent: [], missing: [] };
for (const [block, set] of blocksByChar) {
  const n = counts.get(block) || 0;
  const covered = (distinct.get(block) || new Set()).size;
  out.blocks[block] = { occurrences: n, distinctChars: covered, inventoryChars: set.size, coverage: +(covered / set.size).toFixed(4) };
  if (n === 0) out.absent.push(block);
}
for (const [block, v] of Object.entries(out.blocks)) if (v.occurrences && v.coverage < 0.02) out.missing.push(`${block} (${(v.coverage * 100).toFixed(1)}%)`);

if (args.includes('--json')) console.log(JSON.stringify(out, null, 1));
else {
  console.log(`== script coverage: ${file} (${out.bytes} bytes)`);
  for (const [block, v] of Object.entries(out.blocks).sort((a, b) => b[1].occurrences - a[1].occurrences))
    console.log(`   ${block.padEnd(22)} ${String(v.occurrences).padStart(7)} chars  ${String(v.distinctChars).padStart(5)}/${String(v.inventoryChars).padEnd(6)} distinct (${(v.coverage * 100).toFixed(1)}%)`);
  console.log(`   absent blocks          ${out.absent.join(', ') || '(none)'}`);
  if (out.missing.length) console.log(`   thin coverage (<2%)    ${out.missing.join(', ')}`);
}
process.exit(out.absent.length ? 1 : 0);
