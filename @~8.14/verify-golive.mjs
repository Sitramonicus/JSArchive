#!/usr/bin/env node
/* verify-golive.mjs — verify the frozen O8.13-r3 deliverable.
 *
 * This is an integrity check only. It does not execute the payload or rebuild anything.
 * The archive manifest is authoritative; live and archive mirrors must contain the same
 * named bytes. Compatibility aliases are listed explicitly in the manifest and are not
 * silently substituted for the self-identifying canonical names.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const LIVE = 'Working-Stable/O8.13';
const FROZEN = 'Archives/packages/O8.13';
const SUMS = path.join(FROZEN, 'SHA256SUMS.txt');
const CANONICAL = {
  runner: 'O8.13-runner-d4de42af.js',
  bundle: 'O8.13-bundle-604f4434.js',
  cover: 'O8.13-cover-3bbe7345.bmp',
};
const PINS = [
  [CANONICAL.runner, ['681f66ff', 'c755a5f8']],
  [CANONICAL.bundle, ['b27f4d8f', '7e277c9d', 'eabb8a67']],
];
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

function readManifest(file) {
  if (!fs.existsSync(file)) throw new Error(`FATAL: no manifest at ${file}`);
  const out = new Map();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([0-9a-f]{64})\s+(\S+)$/);
    if (m) out.set(m[2], m[1]);
  }
  if (!out.size) throw new Error(`FATAL: manifest has no checksum entries: ${file}`);
  return out;
}

let bad = 0;
let ref;
try { ref = readManifest(SUMS); } catch (e) { console.error(e.message); process.exit(1); }
console.log(`Reference: ${FROZEN} — ${ref.size} checksum entries\n`);

const allowedExtras = new Set(['ARCHIVE.txt', 'BUILD.json', 'SHA256SUMS.txt']);
for (const dir of [LIVE, FROZEN]) {
  const lines = [];
  for (const [file, want] of ref) {
    const p = path.join(dir, file);
    if (!fs.existsSync(p)) {
      lines.push(`  MISSING  ${file}`); bad++; continue;
    }
    const got = sha(p);
    if (got !== want) {
      lines.push(`  MISMATCH ${file}\n           want ${want.slice(0, 16)}\n           got  ${got.slice(0, 16)}`);
      bad++;
    } else {
      lines.push(`  ok       ${file}  ${got.slice(0, 12)}`);
    }
    const m = file.match(/-([0-9a-f]{8})\.(?:js|bmp)$/);
    if (m && m[1] !== got.slice(0, 8)) {
      lines.push(`  !! ${file} claims ${m[1]} but bytes hash to ${got.slice(0, 8)}`);
      bad++;
    }
  }
  const present = new Set(fs.readdirSync(dir));
  const extras = [...present].filter(name => !ref.has(name) && !allowedExtras.has(name));
  console.log(`${dir}:`);
  console.log(lines.join('\n'));
  if (extras.length) console.log(`  (not in release manifest: ${extras.sort().join(', ')})`);
  console.log();
}

for (const [file, pins] of PINS) {
  const p = path.join(LIVE, file);
  for (const pin of pins) {
    const hit = fs.existsSync(p) && fs.readFileSync(p, 'utf8').includes(pin);
    console.log(`${hit ? '  ok  ' : '  MISS'} ${pin} in ${file}`);
    if (!hit) bad++;
  }
}
console.log();

const link = path.join(ROOT, 'Active/O8.13/live');
try {
  const target = fs.readlinkSync(link);
  const resolves = fs.realpathSync(link) === fs.realpathSync(path.join(ROOT, LIVE));
  console.log(`${resolves ? '  ok  ' : '  MISS'} Active/O8.13/live -> ${target}`);
  if (!resolves) bad++;
} catch {
  console.log('  MISS Active/O8.13/live directory link');
  bad++;
}

const SKIP = new Set(['node_modules', '.git', 'Working-Stable', 'Archives']);
const PAT = /(runner.*\.js$)|(-cover.*\.bmp$)|(bundle.*\.js$)|(stego11p?-.*\.min\.js$)/;
const found = [];
(function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (PAT.test(entry.name)) found.push(p);
  }
})(ROOT);
const byHash = new Map([...ref].map(([f, h]) => [h, f]));
console.log(`\nOther lookalike artifacts (${found.length}) — not the paste target:`);
for (const file of found.sort()) {
  const h = sha(file);
  console.log(`  ${path.relative(ROOT, file)}  ${fs.statSync(file).size} B  ${h.slice(0, 12)}  ${byHash.get(h) ? `same as ${byHash.get(h)}` : 'different bytes'}`);
}

console.log();
console.log(bad === 0
  ? `✅ r3 freeze intact. Paste ${LIVE}/${CANONICAL.runner}.`
  : `❌ ${bad} problem(s) above — do not paste until resolved.`);
process.exit(bad === 0 ? 0 : 1);
