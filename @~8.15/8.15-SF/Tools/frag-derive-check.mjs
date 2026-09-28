#!/usr/bin/env node
// frag-derive-check.mjs — 8.15 / ARM A audit of a built runner's /*R9F*/ fragment.
//
// What it proves, in order:
//   1. the fragment does NOT publish the deal any more (`o0`..`o3` absent) — the vulnerability patch
//   2. the deal regenerated from `s` (mulberry32 + Fisher-Yates, same code path as the loader)
//      reassembles the chunk groups back into the exact base64 of the embedded snapshot
//   3. that snapshot is byte-identical to the expected cover (sha256), i.e. arm A moved the map and
//      nothing else
// A legacy fragment (`o0..o3` present) is accepted and decoded the legacy way, so the tool also
// audits 8.14-era runners for comparison.
//
// Usage: node frag-derive-check.mjs <runner.js> [--cover-sha=<hex>] [--json]
import fs from 'node:fs';
import crypto from 'node:crypto';

const runnerPath = process.argv[2];
if (!runnerPath) { console.error('usage: frag-derive-check.mjs <runner.js> [--cover-sha=<hex>]'); process.exit(2); }
const shaArg = process.argv.find((a) => a.startsWith('--cover-sha='));
const want = shaArg ? shaArg.split('=')[1] : null;
const asJson = process.argv.includes('--json');
const src = fs.readFileSync(runnerPath, 'utf8');

function bracketed(s, open, close, from) {
  const s0 = s.indexOf(open, from);
  if (s0 < 0) return null;
  let d = 0, q = null;
  for (let i = s0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === open) d++;
    else if (c === close) { d--; if (d === 0) return s.slice(s0, i + 1); }
  }
  return null;
}

const out = { runner: runnerPath, bytes: src.length };
const fragJson = bracketed(src, '{', '}', src.indexOf('/*R9F*/'));
if (!fragJson) { console.log('R9F fragment: NOT FOUND'); process.exit(1); }
const frag = JSON.parse(fragJson);
out.published_deal = frag.o0 !== undefined;
out.seed = frag.s === undefined ? null : frag.s;

let card = null;
if (frag.o0 !== undefined) {
  // legacy shape: the deal ships in the file
  const c = [], o = [];
  for (let g = 0; g < 4; g++) {
    const gc = frag['c' + g], go = frag['o' + g];
    if (!gc || !go || gc.length !== go.length) { console.log('legacy fragment malformed'); process.exit(1); }
    for (let i = 0; i < gc.length; i++) { c.push(gc[i]); o.push(go[i]); }
  }
  const parts = new Array(o.length);
  for (let i = 0; i < o.length; i++) parts[o[i]] = c[i];
  card = parts.join('');
  out.chunks = o.length;
} else {
  if (typeof frag.s !== 'number') { console.log('fragment has neither o0..o3 nor s'); process.exit(1); }
  const groups = [frag.c0, frag.c1, frag.c2, frag.c3];
  const N = groups.reduce((a, g) => a + (g ? g.length : 0), 0);
  // the deal, regenerated exactly as the loader regenerates it
  const r = (function (a) {
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  })(frag.s >>> 0);
  const perm = new Array(N);
  for (let i = 0; i < N; i++) perm[i] = i;
  for (let i = N - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
  const cur = [0, 0, 0, 0], list = new Array(N);
  for (let i = 0; i < N; i++) {
    const g = perm[i] & 3;
    if (cur[g] >= groups[g].length) { console.log(`group ${g} exhausted at i=${i} — deal/groups disagree`); process.exit(1); }
    list[i] = groups[g][cur[g]++];
  }
  const parts = new Array(N);
  for (let i = 0; i < N; i++) parts[perm[i]] = list[i];
  card = parts.join('');
  out.chunks = N;
}

const buf = Buffer.from(card, 'base64');
const sha = crypto.createHash('sha256').update(buf).digest('hex');
out.snapshot_bytes = buf.length;
out.snapshot_sha256 = sha;
out.matches_expected = want ? (sha === want) : null;

if (asJson) { console.log(JSON.stringify(out, null, 1)); }
else {
  console.log(`runner            : ${runnerPath} (${src.length} chars)`);
  console.log(`published deal    : ${out.published_deal ? 'YES — o0..o3 present (8.14-era shape)' : 'no — regenerated from s=0x' + (out.seed >>> 0).toString(16)}`);
  console.log(`chunks            : ${out.chunks}`);
  console.log(`snapshot          : ${buf.length} B sha256=${sha}`);
  if (want) console.log(`expected cover    : ${want}  -> ${sha === want ? 'MATCH' : 'MISMATCH'}`);
}
process.exit(want && sha !== want ? 1 : 0);
