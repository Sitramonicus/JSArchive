#!/usr/bin/env node
// fine.mjs — byte-accurate origin-interleaving metric for the weave.
// Reads the chunk map dumped by weave-payload.mjs (WEAVE_MAP=...) plus the pre/post text and
// attributes EVERY output byte to the original byte it came from, then buckets origin by the
// 23 equal ranges of the ORIGINAL file. Two numbers:
//   fine_run   : longest run of consecutive output bytes whose origin lies in ONE bucket
//   fine_share : worst 10%-wide window's largest single-bucket share of bytes
// The tool's own metric works at chunk granularity (a chunk's bucket = its start's bucket); this
// one is per byte, so separators/no-ops are skipped and straddling chunks are counted honestly.
import fs from 'node:fs';
const [mapPath, prePath, postPath] = process.argv.slice(2);
const identity = mapPath === 'identity';
const map = identity ? null : JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const post = fs.readFileSync(postPath, 'utf8');
const preLen = identity ? post.length : map.src_len, postLen = post.length;
if (!identity && postLen !== map.out_len) throw new Error(`post length ${postLen} != map out_len ${map.out_len}`);
const N = 23, bucket = (o) => Math.floor((o / preLen) * N);

// output byte -> origin offset (or -1 for inserted separators)
const origin = new Int32Array(postLen).fill(-1);
if (identity) { for (let i = 0; i < postLen; i++) origin[i] = i; }
else for (const c of map.chunks) {
  if (c.o0 === null) continue;
  const n = Math.min(c.len, c.o1 - c.o0);
  for (let k = 0; k < n; k++) origin[c.out + k] = c.o0 + k;
  // if the chunk's text length differs from its span (should not happen), leave the tail at -1
}
let mapped = 0; for (let i = 0; i < postLen; i++) if (origin[i] >= 0) mapped++;

// longest run of consecutive bytes from one bucket (bytes without origin break a run)
let best = 0, cur = 0, curB = -2, bestAt = 0;
for (let i = 0; i < postLen; i++) {
  const o = origin[i];
  const b = o < 0 ? -1 : bucket(o);
  if (b !== curB) { if (cur > best) { best = cur; bestAt = i - cur; } curB = b; cur = 0; }
  if (b >= 0) cur++;
}
if (cur > best) { best = cur; bestAt = postLen - cur; }

// longest intact span: consecutive output bytes whose ORIGIN is also consecutive (a preserved
// original sub-span — what an analyst can cut out with one scissor move)
let intact = 0, intactCur = 0, intactAt = 0, intactBestAt = 0;
for (let i = 0; i < postLen; i++) {
  const o = origin[i];
  if (o < 0) { intactCur = 0; continue; }
  if (i > 0 && origin[i - 1] >= 0 && o === origin[i - 1] + 1) intactCur++;
  else { intactCur = 1; intactAt = i; }
  if (intactCur > intact) { intact = intactCur; intactBestAt = intactAt; }
}

// worst 10% window, byte-accurate, same window/step convention as the tool
const win = Math.floor(postLen * 0.10), step = Math.max(500, Math.floor(postLen * 0.01));
let worst = 0, worstStart = 0;
const cnt = new Int32Array(N);
for (let start = 0; start + win <= postLen; start += step) {
  cnt.fill(0);
  for (let i = start; i < start + win; i++) { const o = origin[i]; if (o >= 0) cnt[bucket(o)]++; }
  let mx = 0; for (let b = 0; b < N; b++) if (cnt[b] > mx) mx = cnt[b];
  if (mx / win > worst) { worst = mx / win; worstStart = start; }
}
console.log(JSON.stringify({ mapped_bytes: mapped, unmapped: postLen - mapped, fine_run: best, fine_run_at: bestAt, fine_share: +worst.toFixed(3), fine_share_at: worstStart, intact_run: intact, intact_run_at: intactBestAt }, null, 1));
