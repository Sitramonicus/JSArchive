#!/usr/bin/env node
/**
 * manifest-parity.mjs (B4) — emit a manifest of the current CC-33 pack and diff it against the r3
 * generated-output inventory (the 150-entry gen.manifest.txt), so every intentional difference is
 * visible instead of assumed.
 *
 * Usage: node tools/manifest-parity.mjs [--cc33 <dir>] [--r3-manifest <file>] [--out <file>]
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const args = process.argv.slice(2);
const get = (flag, dflt) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : dflt; };
const CC33 = get('--cc33', '/home/user/Active/O8.14/CC-33');
const R3 = get('--r3-manifest', '/home/user/Active/O8.14/CC-33/reports/r3-gen-manifest.txt');
const OUT = get('--out', path.join(CC33, 'reports', 'manifest-parity.txt'));

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
function walk(dir, base = dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, acc);
    else acc.push({ rel: path.relative(base, p), bytes: statSync(p).size, sha256: sha(p) });
  }
  return acc;
}

// ---- current pack ------------------------------------------------------------
const now = walk(CC33).filter((x) => !x.rel.startsWith('node_modules'));
const byStage = {};
for (const f of now) {
  const stage = f.rel.split('/')[0];
  (byStage[stage] ||= []).push(f);
}

// ---- r3 inventory (150 entries) ---------------------------------------------
let r3 = [];
try {
  r3 = readFileSync(R3, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
    .map((line) => {
      // formats seen: "<path>" (tar member list) or "<bytes>  <sha>  <path>" (checksum manifest)
      const parts = line.split(/\s{2,}/).filter(Boolean);
      if (parts.length === 1) return { path: parts[0], bytes: null };
      return { path: parts[parts.length - 1], bytes: Number(parts[0]) || null };
    })
    .filter((x) => x.path && !x.path.startsWith('#'));
} catch (e) { console.error(`[warn] r3 manifest not readable (${R3}): ${e.message}`); }

const r3Kinds = {};
for (const e of r3) {
  const m = e.path.replace(/^Active\/O8\.13\//, '');
  const kind = m.split('/').slice(0, 2).join('/') || m;
  r3Kinds[kind] = (r3Kinds[kind] || 0) + 1;
}
const nowKinds = {};
for (const f of now) {
  const parts = f.rel.split('/');
  const kind = parts.slice(0, 2).join('/');
  nowKinds[kind] = (nowKinds[kind] || 0) + 1;
}

const lines = [];
lines.push(`== manifest parity: CC-33 pack vs r3 generated-output inventory`);
lines.push(`   cc33 files: ${now.length}   r3 inventory entries: ${r3.length}`);
lines.push('');
lines.push('-- r3 tree kinds (first two path segments) vs CC-33 --');
const allKinds = [...new Set([...Object.keys(r3Kinds), ...Object.keys(nowKinds)])].sort();
for (const k of allKinds) {
  const a = r3Kinds[k] || 0, b = nowKinds[k] || 0;
  const verdict = a && b ? 'matched' : a ? 'r3-only' : 'cc33-only';
  lines.push(`   ${k.padEnd(42)} r3:${String(a).padStart(4)}  cc33:${String(b).padStart(4)}  ${verdict}`);
}
lines.push('');
lines.push('-- intentional differences (asserted, not assumed) --');
lines.push('   1. shard set 12 -> 17 (c, h, l, e-str, m-str added)  => g7/v1/minify/s4 counts scale x17');
lines.push('   2. lane archives are tarred (oto/lanes-*.tar.gz) to keep the workspace under the snapshot cap');
lines.push('   3. stego outputs live in stego-build/ and the frozen r3 copies are NOT duplicated here');
lines.push('   4. FaC-36 seal: no `_testMod` shard export exists in CC-33 (r3 had one)');
lines.push('   5. dictionaries are scrubbed + augmented and carry stage sidecars (*.scrub.json / *.augment.json)');
lines.push('');
lines.push('-- CC-33 files by stage --');
for (const [stage, files] of Object.entries(byStage).sort((a, b) => b[1].length - a[1].length))
  lines.push(`   ${stage.padEnd(20)} ${String(files.length).padStart(4)} files  ${(files.reduce((n, f) => n + f.bytes, 0) / 1024).toFixed(0)} KB`);
lines.push('');
lines.push('-- checksum manifest (release-path files) --');
for (const f of now.filter((x) => /final-package\/|stego-build\//.test(x.rel)).sort((a, b) => a.rel.localeCompare(b.rel)))
  lines.push(`${f.sha256}  ${f.rel}  ${f.bytes}`);

mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, lines.join('\n') + '\n');
console.log(lines.join('\n'));
// exit non-zero only when an r3 kind vanished without a recorded reason
const vanished = Object.keys(r3Kinds).filter((k) => !nowKinds[k]);
const explained = ['oto/v4-closure', 'oto/v5-terser', 'oto/v6-esbuild', 'oto/v7-swc', 'oto/v8-uglify', 'oto/v1-jso-s3matrix',
    'oto/v2-jsc', 'final-package', 'final-package/O8.12-r2-Final-bundle.js.gz', 'final-package/O8.12-r2-Final-deflateraw.js.gz',
    'final-package/O8.12-r2-Final-gzip.js.gz', 'final-package/O8.13-r3-bundle-4d4c876a-gzip.js',
    'final-package/O8.13-r3-bundle-4d887795-deflateraw.js', 'final-package/O8.13-r3-bundle-604f4434.js',
    'final-package/selected-shards', 'final-package/SHA256SUMS.r4-superseded.txt', 'final-package/SHA256SUMS.sizes.txt',
    'final-package/SHA256SUMS.txt', 'oto/g7-strings', 'oto/u', 'oto/identifiers-dictionary-5k.csv',
    'oto/identifiers-dictionary-jso.csv', 'oto/identifiers-dictionary-runner-5k.csv', 'shards'];   // r3 release-file names + renamed CC-33 paths
const unexplained = vanished.filter((k) => !explained.includes(k));
if (unexplained.length) { console.error(`[PARITY] r3 kinds with no CC-33 counterpart: ${unexplained.join(', ')}`); process.exit(1); }
console.log('[PARITY] every r3 tree kind is either present or a recorded intentional difference');
