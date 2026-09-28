#!/usr/bin/env node
// share-sweep.mjs — the continuous version of the acceptance metric.
//
// `fine_share` is a MAXIMUM: the worst 10 %-wide window's largest single-bucket share. While any window still
// contains a whole origin bucket it reads the ceiling (0.4348) no matter how much progress is made underneath,
// so it is useless as a progress signal. This tool reports the distribution behind it:
//
//   worst / 2nd / … / 10th window share   (how saturated the file is)
//   windows above 0.25                    (how many windows still fail the acceptance target)
//   mean max-share · total excess over 0.25 (Σ max(0, share_w − 0.25), in window-share units)
//
// All four fall monotonically as concentration falls — and "windows above 0.25" hits 0 exactly when the
// acceptance target is met.
//
// Usage: node share-sweep.mjs <map.json|identity> <pre.js> <post.js> [--json]
import fs from 'node:fs';
const argv = process.argv.slice(2);
const [mapPath, prePath, postPath] = argv.filter((a) => !a.startsWith('--'));
const asJson = argv.includes('--json');
const identity = mapPath === 'identity';
const map = identity ? null : JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const post = fs.readFileSync(postPath, 'utf8');
const preLen = identity ? post.length : map.src_len;
const postLen = post.length;
const N = 23, bucketOf = (o) => Math.floor((o / preLen) * N);
const origin = new Int32Array(postLen).fill(-1);
if (identity) { for (let i = 0; i < postLen; i++) origin[i] = i; }
else for (const c of map.chunks) {
  if (c.o0 === null) continue;
  const n = Math.min(c.len, c.o1 - c.o0);
  for (let k = 0; k < n; k++) origin[c.out + k] = c.o0 + k;
}
const W = Math.max(1, Math.floor(postLen * 0.10));
const shares = [];
for (let s = 0; s + W <= postLen; s += Math.max(1, Math.floor(W / 8))) {      // sliding, 1/8-window step
  const counts = new Map();
  for (let i = s; i < s + W; i++) { const o = origin[i]; if (o < 0) continue; const b = bucketOf(o); counts.set(b, (counts.get(b) || 0) + 1); }
  let best = 0, bestB = -1;
  for (const [b, n] of counts) if (n > best) { best = n; bestB = b; }
  shares.push({ at: s, share: best / W, bucket: bestB });
}
shares.sort((a, b) => b.share - a.share);
const top10 = shares.slice(0, 10).map((x) => +x.share.toFixed(4));
const worse = shares.filter((x) => x.share > 0.25).length;
const mean = shares.reduce((a, x) => a + x.share, 0) / shares.length;
const excess = shares.reduce((a, x) => a + Math.max(0, x.share - 0.25), 0);
const out = {
  windows: shares.length, window_bytes: W,
  worst: +shares[0].share.toFixed(4), worst_at: shares[0].at, worst_bucket: shares[0].bucket,
  top10, windows_above_target: worse,
  mean_max_share: +mean.toFixed(4), excess_over_0_25: +excess.toFixed(3),
  first_window_below_target: (shares.find((x) => x.share <= 0.25) || {}).at ?? null,
};
if (asJson) console.log(JSON.stringify(out, null, 1));
else console.log(`${postPath.split('/').pop().padEnd(12)} worst ${out.worst} (bucket ${out.worst_bucket}) · top10 ${top10.map((x) => x.toFixed(3)).join(' ')} · >0.25: ${worse}/${shares.length} · mean ${out.mean_max_share} · excess ${out.excess_over_0_25}`);
