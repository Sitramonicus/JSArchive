#!/usr/bin/env node
/* verify-golive.mjs — "am I about to paste a stale build?"
 *
 * Scans the whole workspace for anything that looks like a shippable artifact, hashes it,
 * and classifies it against the frozen O8.13 manifest. Run it any time:
 *
 *     node verify-golive.mjs
 *
 * Exit 0 = the go-live directory is intact. Exit 1 = something is wrong.
 * Nothing here is a re-implementation of the build; it only hashes files and compares
 * them to Archives/packages/O8.13/SHA256SUMS.txt, which is the authority.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const LIVE = 'Working-Stable/O8.13';
const FROZEN = 'Archives/packages/O8.13';
const SUMS = path.join(FROZEN, 'SHA256SUMS.txt');
const EXPECT_INSTANCE = '7e953faa';

// The frozen archive keeps the pipeline's canonical names. The live working copy is renamed to be
// self-identifying: O8.13-runner-<first 8 of its own sha256>.js. Same bytes, two names.
// A filename that carries its own hash prefix cannot be a stale copy of a different build.
const RENAME = {
  'O8.12-runner.js': 'O8.13-runner-',
  'O8.6-Final-final-bundle.js': 'O8.13-bundle-',
};
const liveName = (file, hash) => RENAME[file] ? `${RENAME[file]}${hash.slice(0, 8)}.js` : file;

const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

// ---------- 1. the frozen manifest is the reference ----------
if (!fs.existsSync(SUMS)) { console.error(`FATAL: no manifest at ${SUMS}`); process.exit(1); }
const ref = {};
for (const line of fs.readFileSync(SUMS, 'utf8').split('\n')) {
  const m = line.match(/^([0-9a-f]{64})\s+(\S+)$/);
  if (m) ref[m[2]] = m[1];
}
const refByHash = Object.fromEntries(Object.entries(ref).map(([f, h]) => [h, f]));
console.log(`Reference: ${FROZEN} — ${Object.keys(ref).length} files\n`);

// ---------- 2. verify both directories against it ----------
let bad = 0;
for (const dir of [LIVE, FROZEN]) {
  const lines = [];
  for (const [file, want] of Object.entries(ref)) {
    const name = dir === LIVE ? liveName(file, want) : file;
    const p = path.join(dir, name);
    if (!fs.existsSync(p)) { lines.push(`  MISSING  ${name}`); bad++; continue; }
    const got = sha(p);
    if (got !== want) { lines.push(`  MISMATCH ${name}\n           want ${want.slice(0, 16)}\n           got  ${got.slice(0, 16)}`); bad++; }
    else lines.push(`  ok       ${name}  ${got.slice(0, 12)}`);
    // the name must also agree with the bytes it claims to be
    const m = name.match(/-([0-9a-f]{8})\.js$/);
    if (m && m[1] !== got.slice(0, 8)) {
      lines.push(`  !! ${name} claims ${m[1]} but the bytes hash to ${got.slice(0, 8)} — STALE OR RENAMED WRONG`);
      bad++;
    }
  }
  const present = new Set(fs.readdirSync(dir));
  const expected = new Set(Object.keys(ref).map(f => dir === LIVE ? liveName(f, ref[f]) : f));
  const extras = [...present].filter(f => !expected.has(f) && f !== 'ARCHIVE.txt' && f !== 'SHA256SUMS.txt');
  console.log(`${dir}:`);
  console.log(lines.join('\n'));
  if (extras.length) console.log(`  (not in manifest, so not part of the build: ${extras.join(', ')})`);
  console.log();
}

// ---------- 3. walk the tree and flag every lookalike ----------
const SKIP = new Set(['node_modules', '.git', 'Working-Stable', 'Archives']);
const PAT = /(runner.*\.js$)|(-cover.*\.bmp$)|(final-bundle\.js$)|(stego11p?-.*\.min\.js$)/;
const found = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (PAT.test(e.name)) found.push(p);
  }
})(ROOT);

console.log(`Other artifacts in the tree (${found.length}) — none of these is what you paste:\n`);
const groups = {};
for (const f of found) {
  const h = sha(f);
  const role = refByHash[h] ? `SAME BYTES as the live ${refByHash[h]}` : 'different bytes — not the live build';
  (groups[role] ||= []).push(`${path.relative(ROOT, f)}  ${fs.statSync(f).size}  ${h.slice(0, 12)}`);
}
for (const [role, list] of Object.entries(groups)) {
  console.log(`  ${role}:`);
  for (const l of list.sort()) console.log(`    ${l}`);
  console.log();
}

// ---------- 4. static build pins ----------
// NOTE: this does NOT grep for the instance id or the seed/salt. Those are never stored as
// literals — the runner derives them at runtime via toString(16), and the runner is silent
// under node by design (stealth mode = strict silence outside Discord). A static grep for
// "7e953faa" returns 0 hits on a perfectly good build. An earlier version of this check
// claimed otherwise and was wrong.
// These four pins ARE literals and do survive into the shipped bytes.
const PINS = [
  ['O8.13-runner-e008b377.js', '681f66ff'], ['O8.13-runner-e008b377.js', 'c755a5f8'],
  ['O8.13-bundle-ef1dac5e.js', '2c5117b5'], ['O8.13-bundle-ef1dac5e.js', '248c1e0b'],
];
console.log('Static build pins present in the shipped bytes:');
for (const [file, pin] of PINS) {
  const p = path.join(LIVE, file);
  const hit = fs.existsSync(p) && fs.readFileSync(p, 'utf8').includes(pin);
  if (!hit) bad++;
  console.log(`  ${hit ? 'ok  ' : 'MISS'} ${pin}  in ${file}`);
}
console.log();
console.log(`Runtime identity (cannot be grepped — derived at boot):`);
console.log(`  instance ${EXPECT_INSTANCE} · seed 0x6d7f0c87 · salt 0x3f72a1ec · dseed 52375`);
console.log(`  In Discord the boot line must read:`);
console.log(`    [Host 8.12] initialized — worker instance ${EXPECT_INSTANCE}.`);
console.log(`  Under node the runner prints NOTHING. That is correct, not a failure.`);
console.log();
console.log(`Authoritative proof that these bytes are the build (43 assertions, ~30 s):`);
console.log(`  node Active/Stego/test-stego11-tiers.mjs \\`);
console.log(`    ${LIVE}/O8.12-runner.js ${LIVE}/O8.12-cover.bmp \\`);
console.log(`    Uploads/stego2-cover-1024-scaled.bmp --debug-name='佐藤 結衣'`);
console.log();

console.log(bad === 0
  ? `✅ ${LIVE}/ is intact. Paste ${LIVE}/O8.13-runner-${ref['O8.12-runner.js'].slice(0,8)}.js.`
  : `❌ ${bad} problem(s) above — do NOT paste until they are resolved.`);
process.exit(bad === 0 ? 0 : 1);
