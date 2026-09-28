// concentration.mjs — per-bucket concentration, the instrument the saturated acceptance number cannot show.
//   node tools/recon/concentration.mjs <map.json>:<post.js>:<label> ...
// fine_share is the metric's CEILING (one whole bucket inside one window = 1/2.3 = 0.4348), so it reads the
// same for identity and for a half-spread payload. This tool reports, per bucket, the most of itself that
// still lands inside one 10 %-window, and how many buckets are >=90 % / >=75 % concentrated. Lower count =
// closer to the 0.25 target (no bucket may exceed ~56,393 B in any window).
import fs from 'node:fs';
// concentration summary: how many buckets put >=90%/>=75% of themselves inside one 10 %-window
const files = process.argv.slice(2);
for (const f of files) {
  const [mapPath, postPath, label] = f.split(':');
  const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const post = fs.readFileSync(postPath, 'utf8');
  const preLen = map.src_len, N = 23, B = preLen / N;
  const origin = new Int32Array(post.length).fill(-1);
  for (const c of map.chunks) { if (c.o0 === null) continue; const n = Math.min(c.len, c.o1 - c.o0); for (let k = 0; k < n; k++) { const o = c.out + k; if (o < post.length) origin[o] = c.o0 + k; } }
  const win = Math.floor(post.length * 0.10), step = Math.max(500, Math.floor(post.length * 0.01));
  const st = Array.from({ length: N }, () => ({ bytes: 0, worst: 0 }));
  for (let i = 0; i < post.length; i++) { const o = origin[i]; if (o >= 0) st[Math.floor(o / B)].bytes++; }
  for (let s0 = 0; s0 + win <= post.length; s0 += step) {
    const cnt = new Int32Array(N);
    for (let i = s0; i < s0 + win; i++) { const o = origin[i]; if (o >= 0) cnt[Math.floor(o / B)]++; }
    for (let b = 0; b < N; b++) if (cnt[b] > st[b].worst) st[b].worst = cnt[b];
  }
  const pct = st.map((s) => (s.bytes ? s.worst / s.bytes : 0));
  const c90 = pct.filter((v) => v >= 0.90).length, c75 = pct.filter((v) => v >= 0.75).length;
  const worstShare = Math.max(...st.map((s) => s.worst)) / win;
  console.log(label.padEnd(16) + ' max-share ' + worstShare.toFixed(3) + ' · buckets ≥90% concentrated: ' + String(c90).padStart(2) + ' · ≥75%: ' + String(c75).padStart(2) + '   [≥90: ' + pct.map((v, b) => (v >= 0.9 ? b : null)).filter((x) => x !== null).join(',') + ']');
}
