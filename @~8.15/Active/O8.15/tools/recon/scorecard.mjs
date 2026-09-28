#!/usr/bin/env node
// scorecard.mjs — Segment 2's honest metric: does bundle-splitting cost the analyst work?
//
//   node Active/O8.15/tools/recon/scorecard.mjs <map.json> <post.js> [--bucket=4096] [--json out.json]
//
// The directive's real question is not "is the payload obfuscated" but "does the analyst pay a price to
// put the pieces back together". Two independent answers, both measured:
//
//   A. RECOVERY COST (from the placement map; needs no source text).
//      Source space is cut into fixed buckets (default 4 KB) -- a bucket stands for a "thing the analyst
//      wants to recover": a table, a function, a run of statements. For each bucket we count how many
//      separate output pieces its bytes land in, and how big the largest one is.
//        * interleaving index  = bytes-weighted mean pieces per bucket. 1.0 = the bucket arrives whole.
//        * gift coverage       = % of mapped bytes sitting inside pieces >= 4 KB (what an analyst can lift
//                                in one grab, no joining).
//        * largest piece       = the single biggest contiguous gift in the file.
//      The PRE payload is the baseline: a pre-weave payload is a 1:1 mapping, so its index is 1.00 and its
//      gift coverage is 100 % -- printed below for contrast, so the scorecard reads as "what the weave
//      bought", not as an absolute.
//
//   B. SEAM DETECTABILITY (from the post text; the "boundary-recovery test").
//      Knowing a boundary exists only helps the analyst if the boundary is visible. At every true seam
//      (a point where the output jumps from one source bucket to another) we compare the identifier
//      palettes on either side and measure their Jaccard similarity; we do the same at random positions as
//      a control. If seam similarity is no lower than the control, the seams are invisible from the text
//      alone -- which is the property the weave is supposed to have.
//
// Neither number is a gate on taste: they are published, and the trend across builds is the score.
import fs from 'node:fs';

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const pos = argv.filter((a) => !a.startsWith('--') && a !== arg('--bucket') && a !== arg('--json'));
const [mapPath, postPath] = pos;
const BUCKET = Number(arg('--bucket', '4096'));
const JSONOUT = arg('--json', null);
if (!mapPath || !postPath) { console.error('usage: scorecard.mjs <map.json> <post.js> [--bucket=4096] [--json out.json]'); process.exit(2); }

const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const post = fs.readFileSync(postPath, 'utf8');
const preLen = map.src_len, postLen = post.length;
if (postLen !== map.out_len) { console.error(`post length ${postLen} != map out_len ${map.out_len} — wrong file?`); process.exit(2); }

// ---------------------------------------------------------------- A. recovery cost
const origin = new Int32Array(postLen).fill(-1);
for (const c of map.chunks) {
  if (c.o0 === null) continue;
  const n = Math.min(c.len, c.o1 - c.o0);
  for (let k = 0; k < n; k++) { const o = c.out + k; if (o < postLen) origin[o] = c.o0 + k; }
}
const nb = Math.ceil(preLen / BUCKET);
const pieces = [];                    // {bucket, out, len}
let i = 0;
while (i < postLen) {
  if (origin[i] < 0) { i++; continue; }
  const start = i, s0 = origin[i];
  while (i + 1 < postLen && origin[i + 1] === origin[i] + 1) i++;
  const len = i - start + 1;
  pieces.push({ bucket: Math.floor(s0 / BUCKET), out: start, len });
  i++;
}
const perBucket = new Map();
for (const p of pieces) {
  const e = perBucket.get(p.bucket) || { pieces: 0, bytes: 0, largest: 0, largestAt: 0 };
  e.pieces++; e.bytes += p.len;
  if (p.len > e.largest) { e.largest = p.len; e.largestAt = p.out; }
  perBucket.set(p.bucket, e);
}
const mappedBytes = pieces.reduce((a, p) => a + p.len, 0);
const giftBytes = pieces.filter((p) => p.len >= 4096).reduce((a, p) => a + p.len, 0);
const biggest = pieces.reduce((a, p) => (p.len > a.len ? p : a), { len: 0, out: 0, bucket: 0 });
const interleaving = mappedBytes ? [...perBucket.values()].reduce((a, e) => a + e.pieces * e.bytes, 0) / mappedBytes : 0;
const bucketsSeen = perBucket.size;
const pieceLens = pieces.map((p) => p.len).sort((a, b) => a - b);
const pct = (q) => pieceLens.length ? pieceLens[Math.min(pieceLens.length - 1, Math.floor(pieceLens.length * q))] : 0;

// ---------------------------------------------------------------- B. seam detectability
// The honest test is a DISCRIMINATION test, not "seam vs random position": a random position sits inside
// one piece, where the text is trivially self-similar, so it is not a fair control. The question is
// whether a TRUE seam (the source bucket changes) can be told apart from a CONTINUATION break (the source
// was interrupted by injected material and resumes -- the same bucket on both sides). Both are visible
// breaks in the output; only the first is a real origin jump. If a classifier cannot separate them,
// boundaries stay hidden. Reported as AUC per feature + a combined score.
const IDRE = /[\p{L}\p{N}_$]{2,}/gu;
const feat = (from, to) => {
  const seg = post.slice(Math.max(0, from), Math.min(postLen, to));
  let toks = 0, toksLen = 0, uni = 0, uw = 0, dig = 0;
  const pal = new Set();
  for (const m of seg.matchAll(IDRE)) { pal.add(m[0]); toks++; toksLen += m[0].length; if (/[^\x00-\x7f]/.test(m[0])) uni++; if (/\d/.test(m[0])) dig++; }
  for (const ch of seg) { const c = ch.codePointAt(0); if (c === 0x200b || c === 0x200c || c === 0x200d || c === 0xfeff) uw++; }
  return { pal, toks, meanLen: toks ? toksLen / toks : 0, uniShare: toks ? uni / toks : 0, digShare: toks ? dig / toks : 0, uwShare: seg.length ? uw / seg.length : 0 };
};
const jaccard = (a, b) => { let inter = 0; for (const x of a) if (b.has(x)) inter++; const u = a.size + b.size - inter; return u ? inter / u : 1; };
const W = 2048;
const seamPts = [], contPts = [];
for (let k = 1; k < pieces.length; k++) {
  const a = pieces[k - 1], b = pieces[k];
  if (b.out <= W || b.out >= postLen - W) continue;
  const gap = b.out - (a.out + a.len);
  if (gap > 4096) continue;                          // too far apart to be a readable break
  if (a.bucket !== b.bucket) seamPts.push(b.out);
  else contPts.push(b.out);
}
const sample = (arr, n) => { if (arr.length <= n) return arr; const step = arr.length / n; const out = []; for (let i = 0; i < n; i++) out.push(arr[Math.floor(i * step)]); return out; };
const rows = [];
for (const [label, pts] of [['seam', sample(seamPts, 400)], ['cont', sample(contPts, 400)]]) {
  for (const p of pts) {
    const L = feat(p - W, p), R = feat(p, p + W);
    rows.push({ label, dPal: 1 - jaccard(L.pal, R.pal), dLen: Math.abs(L.meanLen - R.meanLen), dUni: Math.abs(L.uniShare - R.uniShare), dDig: Math.abs(L.digShare - R.digShare), dUw: Math.abs(L.uwShare - R.uwShare) });
  }
}
const auc = (rows, key) => {
  const a = rows.filter((r) => r.label === 'seam').map((r) => r[key]).sort((x, y) => x - y);
  const b = rows.filter((r) => r.label === 'cont').map((r) => r[key]).sort((x, y) => x - y);
  if (!a.length || !b.length) return 0.5;
  let gt = 0;                                             // P(seam score > cont score)
  let j = 0;
  for (const x of a) { while (j < b.length && b[j] < x) j++; gt += j; }
  return gt / (a.length * b.length);
};
const keys = [['dPal', 'palette shift'], ['dLen', 'token-length shift'], ['dUni', 'unicode-share shift'], ['dDig', 'digit-share shift'], ['dUw', 'zero-width shift']];
const scored = rows.map((r) => ({ ...r, comb: (r.dPal + r.dLen / 4 + r.dUni * 2 + r.dDig * 2 + r.dUw * 200) }));
const aucs = keys.map(([k, name]) => ({ k, name, v: auc(rows, k) }));
const aucComb = auc(scored, 'comb');
const groupMean = (label, k) => { const g = rows.filter((r) => r.label === label); return g.length ? g.reduce((a, x) => a + x[k], 0) / g.length : 0; };
// the analyst-facing number: at a 10 % false-positive rate on continuation breaks, what share of true
// seams does the best single feature catch?
const tprAtFpr = (key, fpr) => {
  const a = scored.map((r) => ({ l: r.label, v: r[key] })).sort((x, y) => y.v - x.v);
  const conts = a.filter((r) => r.l === 'cont');
  const seams = a.filter((r) => r.l === 'seam');
  if (!conts.length || !seams.length) return 0;
  const thr = conts[Math.min(conts.length - 1, Math.floor(conts.length * fpr))].v;
  return seams.filter((r) => r.v > thr).length / seams.length;
};

// ---------------------------------------------------------------- report
const out = [];
const p = (s) => out.push(s);
p('===== WEAVE SCORECARD =====');
p(`map ${mapPath}`);
p(`post ${postPath}  (${postLen} chars, ${(postLen / 1024).toFixed(0)} KB)  vs pre ${preLen} chars`);
p('');
p('-- A. RECOVERY COST (source buckets of ' + BUCKET + ' B) --');
p(`  pieces (contiguous source runs in the output) : ${pieces.length}`);
p(`  piece size  p50 ${pct(0.5)} B · p90 ${pct(0.9)} B · max ${pieceLens[pieceLens.length - 1] || 0} B`);
p(`  interleaving index   (pieces per bucket)      : ${interleaving.toFixed(2)}   [pre-weave baseline 1.00]`);
p(`  gift coverage        (bytes in pieces >= 4 KB): ${(100 * giftBytes / Math.max(1, mappedBytes)).toFixed(1)} %   [pre-weave baseline 100 %]`);
p(`  largest single piece                          : ${biggest.len} B @${biggest.out} (source bucket ${biggest.bucket})`);
p(`  source buckets present in the output          : ${bucketsSeen} / ${nb} (${(100 * bucketsSeen / nb).toFixed(1)} %)`);
const worst = [...perBucket.entries()].map(([b, e]) => ({ b, ...e })).sort((a, z) => z.pieces - a.pieces).slice(0, 5);
p('  most-fragmented buckets: ' + worst.map((w) => `#${w.b} ${w.pieces} pc/${(w.bytes / 1024).toFixed(1)} KB, biggest ${w.largest} B`).join('  |  '));
p('');
p('-- B. SEAM DETECTABILITY (true seam vs continuation break, +-' + W + ' chars) --');
p(`  true seams (bucket changes)                   : ${seamPts.length}`);
p(`  continuation breaks (same bucket resumes)     : ${contPts.length}`);
p(`  sampled for scoring                           : ${rows.filter((r) => r.label === 'seam').length} seams vs ${rows.filter((r) => r.label === 'cont').length} continuations`);
for (const { k, name, v } of aucs) { p(`  AUC ${name.padEnd(22)} : ${v.toFixed(3)}   (mean shift: seam ${groupMean('seam', k).toFixed(4)} vs continuation ${groupMean('cont', k).toFixed(4)})`); }
p(`  best single feature                          : palette shift, catching ${(100 * tprAtFpr('dPal', 0.10)).toFixed(1)} % of true seams at a 10 % false-positive rate (combined score: ${(100 * tprAtFpr('comb', 0.10)).toFixed(1)} %)`);
p(`  AUC combined score                            : ${aucComb.toFixed(3)}`);
p(`  verdict                                       : ${Math.abs(aucComb - 0.5) < 0.08 ? 'seams and continuation breaks are NOT separable — a boundary-finder gets noise, not a map' : (aucComb > 0.5 ? 'seams are separable from continuation breaks (AUC ' + aucComb.toFixed(2) + ') — a boundary-finder could exploit this' : 'continuation breaks read as MORE discontinuous than true seams (AUC ' + aucComb.toFixed(2) + ') — the signal points the wrong way for an analyst')}`);
p('');
p('-- summary --');
p(`  interleaving ${interleaving.toFixed(2)} · gift coverage ${(100 * giftBytes / Math.max(1, mappedBytes)).toFixed(1)} % · largest piece ${biggest.len} B · seam-vs-continuation AUC ${aucComb.toFixed(3)}`);
console.log(out.join('\n'));
if (JSONOUT) {
  fs.writeFileSync(JSONOUT, JSON.stringify({
    postLen, preLen, bucket: BUCKET, pieces: pieces.length, pieceLens: { p50: pct(0.5), p90: pct(0.9), max: pieceLens[pieceLens.length - 1] || 0 },
    interleaving, giftCoverage: giftBytes / Math.max(1, mappedBytes), largestPiece: { len: biggest.len, at: biggest.out, bucket: biggest.bucket },
    bucketsSeen, bucketsTotal: nb, seams: seamPts.length, continuationBreaks: contPts.length, auc: Object.fromEntries(aucs.map((a) => [a.k, a.v])), aucCombined: aucComb,
    mostFragmented: worst,
  }, null, 2));
  console.log(`[scorecard] json -> ${JSONOUT}`);
}
