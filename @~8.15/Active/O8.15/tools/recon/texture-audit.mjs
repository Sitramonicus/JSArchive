#!/usr/bin/env node
// texture-audit.mjs — Segment 2's style gate: do the pieces look like they came from one hand?
//
//   node Active/O8.15/tools/recon/texture-audit.mjs [--dir <shards dir>] [--json out.json]
//
// Why it exists: an analyst who cannot read the code can still cluster the *style*. If one piece is full
// of short plain identifiers while its neighbours are dense `_0x…` soup, the odd one out is a fingerprint
// -- and so is the boundary next to it (the scorecard measures exactly that leak: identifier-length shift
// at true seams is ~10x the shift at continuation breaks). This tool measures the texture of every piece,
// reports it, and fails only on outliers -- deliberately NOT on legitimate size differences.
//
// Features per piece (all normalised, size-independent except byte/line counts which are reported only):
//   meanIdLen / medIdLen   mean and median identifier length
//   id0xShare              share of identifiers carrying the `_0x` prefix family
//   uniShare               share of identifiers containing non-ASCII
//   zwCount                zero-width characters per KB
//   strShare               bytes inside string literals / total
//   cmtShare               bytes inside comments / total
//   avgLine                average line length
// Gate: robust z (median + 1.4826*MAD) per feature; any piece beyond |z| > 3.5 on two or more features, or
// beyond |z| > 5 on one, is an outlier and fails the gate. Byte size is excluded from the gate on purpose
// (the pieces are allowed to differ in size -- that is the point of splitting).
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const DIR = arg('--dir', '/home/user/Active/O8.14/CC-33/shards');
const JSONOUT = arg('--json', null);
const files = fs.readdirSync(DIR).filter((f) => /^shard-.*\.js$/.test(f)).sort();
if (!files.length) { console.error('no shard-*.js in ' + DIR); process.exit(2); }

const IDRE = /[\p{L}\p{N}_$][\p{L}\p{N}_$]*/gu;   // unicode-aware: the payload renames into CJK/hangul/astral ranges
const measure = (src) => {
  const ids = [];
  for (const m of src.matchAll(IDRE)) ids.push(m[0]);
  const lens = ids.map((s) => s.length).sort((a, b) => a - b);
  const med = lens.length ? lens[Math.floor(lens.length / 2)] : 0;
  const mean = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
  const id0x = ids.filter((s) => /_0x/.test(s)).length;
  const uni = ids.filter((s) => /[^\x00-\x7f]/.test(s)).length;
  let zw = 0;
  for (const ch of src) { const c = ch.codePointAt(0); if (c === 0x200b || c === 0x200c || c === 0x200d || c === 0xfeff) zw++; }
  let strBytes = 0;
  for (const m of src.matchAll(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g)) strBytes += m[0].length;
  let cmtBytes = 0;
  for (const m of src.matchAll(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g)) cmtBytes += m[0].length;
  const lines = src.split('\n');
  return {
    bytes: Buffer.byteLength(src), lines: lines.length,
    ids: ids.length, meanIdLen: mean, medIdLen: med,
    id0xShare: ids.length ? id0x / ids.length : 0,
    uniShare: ids.length ? uni / ids.length : 0,
    zwPerKB: src.length ? (zw / src.length) * 1024 : 0,
    strShare: src.length ? strBytes / src.length : 0,
    cmtShare: src.length ? cmtBytes / src.length : 0,
    avgLine: lines.length ? src.length / lines.length : 0,
  };
};

const rows = files.map((f) => ({ file: f.replace(/^shard-|\.js$/g, ''), ...measure(fs.readFileSync(path.join(DIR, f), 'utf8')) }));
const GATED = ['meanIdLen', 'medIdLen', 'id0xShare', 'uniShare', 'zwPerKB', 'strShare', 'cmtShare', 'avgLine'];
const WINDOW_GATED = ['meanIdLen', 'medIdLen', 'id0xShare', 'uniShare', 'zwPerKB', 'strShare', 'cmtShare'];   // avgLine is a window-size artefact in window mode
const stats = {};
for (const k of GATED) {
  const v = rows.map((r) => r[k]).sort((a, b) => a - b);
  const med = v[Math.floor(v.length / 2)];
  const mad = [...v].map((x) => Math.abs(x - med)).sort((a, b) => a - b)[Math.floor(v.length / 2)];
  const q1 = v[Math.floor(v.length * 0.25)], q3 = v[Math.floor(v.length * 0.75)];
  // Robust scale with two fallbacks: MAD, then IQR/1.349. A feature whose spread is degenerate (e.g. every
  // piece has zero zero-width characters, so MAD = 0) is REPORTED but not gated — a divide-by-zero here
  // produced z values of +/-6.7e8 on the first run and flagged 17 of 23 pieces for nothing.
  const scaleCandidates = [1.4826 * mad, (q3 - q1) / 1.349].filter((x) => x > 1e-9);
  const scale = scaleCandidates.length ? Math.max(...scaleCandidates) : 0;
  stats[k] = { med, mad, q1, q3, scale, degenerate: scale === 0 };
}
for (const r of rows) {
  r.z = {}; r.flags = [];
  for (const k of GATED) {
    if (stats[k].degenerate) { r.z[k] = 0; if (Math.abs(r[k] - stats[k].med) > 1e-9) r.flags.push(`${k}=nonzero(${r[k].toFixed(3)})`); continue; }
    const z = (r[k] - stats[k].med) / stats[k].scale; r.z[k] = z; if (Math.abs(z) > 3.5) r.flags.push(`${k}=${z > 0 ? '+' : ''}${z.toFixed(1)}`);
  }
  r.outlier = r.flags.length >= 2 || Object.values(r.z).some((z) => Math.abs(z) > 5);
}

const p = (s) => console.log(s);
// ---------------------------------------------------------------- payload-side view
// The shard audit above measures the INPUT pieces. What an analyst actually samples is the assembled,
// obfuscated payload: they take windows of it and ask "does this look like one hand wrote it?".
// With --post <file> we measure evenly spaced windows of the shipped artifact and report the spread.
const POST = arg('--post', null);
if (POST) {
  const src = fs.readFileSync(POST, 'utf8');
  const W = Number(arg('--win', '8192'));
  const n = Math.max(8, Math.floor(src.length / W));
  const step = Math.floor(src.length / n);
  const wrows = [];
  for (let i = 0; i < n; i++) wrows.push({ at: i * step, ...measure(src.slice(i * step, i * step + W)) });
  const sum = {};
  for (const k of WINDOW_GATED) { const v = wrows.map((r) => r[k]).sort((a, b) => a - b); sum[k] = { med: v[Math.floor(v.length / 2)], min: v[0], max: v[v.length - 1] }; }
  const mad = (k) => { const m = sum[k].med; const d = wrows.map((r) => Math.abs(r[k] - m)).sort((a, b) => a - b); return 1.4826 * d[Math.floor(d.length / 2)]; };
  console.log('');
  console.log('===== TEXTURE, PAYLOAD SIDE =====');
  console.log(`post ${POST} · ${(src.length / 1024).toFixed(0)} KB · ${n} windows of ${W} B`);
  console.log('  feature      median     min      max   robust-sigma   spread');
  const outliers = [];
  for (const k of WINDOW_GATED) {
    const sd = mad(k); const spread = sd / Math.max(1e-9, Math.abs(sum[k].med));
    console.log(`  ${k.padEnd(10)} ${sum[k].med.toFixed(4).padStart(8)} ${sum[k].min.toFixed(4).padStart(8)} ${sum[k].max.toFixed(4).padStart(8)} ${sd.toFixed(4).padStart(12)} ${(spread * 100).toFixed(1).padStart(7)} %`);
    if (sd > 1e-9) { const far = wrows.filter((r) => Math.abs(r[k] - sum[k].med) / sd > 4); if (far.length) outliers.push(`${k}: ${far.length} window(s), worst z ${Math.max(...far.map((r) => Math.abs(r[k] - sum[k].med) / sd)).toFixed(1)}`); }
  }
  console.log('  verdict: ' + (outliers.length ? 'windows are NOT uniform — a sampler can cluster them: ' + outliers.join(' · ') : 'windows are uniform — sampling gives no style clusters'));
}

p('===== TEXTURE AUDIT =====');
p(`dir ${DIR} · ${rows.length} pieces`);
p('');
const hdr = ['piece'.padEnd(10), 'KB'.padStart(6), 'ids'.padStart(6), 'meanId'.padStart(7), 'medId'.padStart(6), '_0x%'.padStart(6), 'uni%'.padStart(6), 'zw/KB'.padStart(7), 'str%'.padStart(6), 'cmt%'.padStart(6), 'avgLn'.padStart(7), 'flags'];
p('  ' + hdr.join(' '));
for (const r of rows.sort((a, b) => b.bytes - a.bytes)) {
  p('  ' + [
    r.file.padEnd(10), (r.bytes / 1024).toFixed(0).padStart(6), String(r.ids).padStart(6),
    r.meanIdLen.toFixed(2).padStart(7), r.medIdLen.toFixed(0).padStart(6),
    (100 * r.id0xShare).toFixed(1).padStart(6), (100 * r.uniShare).toFixed(1).padStart(6),
    r.zwPerKB.toFixed(2).padStart(7), (100 * r.strShare).toFixed(1).padStart(6), (100 * r.cmtShare).toFixed(1).padStart(6),
    r.avgLine.toFixed(0).padStart(7), r.flags.length ? '!! ' + r.flags.join(' ') : '',
  ].join(' '));
}
p('');
p('-- band (median ± robust sigma) --');
for (const k of GATED) p(`  ${k.padEnd(10)} median ${stats[k].med.toFixed(4)}  sigma ${stats[k].scale.toFixed(4)}${stats[k].degenerate ? '  (degenerate — reported, not gated)' : ''}`);
// Calibration caveat, printed so the verdict is read correctly: a feature whose pack-wide spread is
// near-degenerate (most pieces share one value) produces very large z for the few pieces that differ.
// Those flags are TRUE statements ("this piece is the only one with unicode identifiers in this region")
// but their z magnitudes are not comparable to the well-spread features.
const flat = GATED.filter((k) => stats[k].degenerate || stats[k].scale / Math.max(1e-9, Math.abs(stats[k].med) || 1) < 0.05);
p('');
p('-- calibration --');
p(flat.length ? `  near-degenerate feature(s): ${flat.join(', ')} — flags are real but their z magnitudes are not comparable to the well-spread features` : '  all features well spread; z magnitudes comparable');
const out = rows.filter((r) => r.outlier);
p('');
p('-- verdict --');
p(out.length ? `  FAIL — ${out.length} outlier piece(s): ${out.map((r) => r.file + ' [' + r.flags.join(' ') + ']').join(', ')}` : '  PASS — no piece is a style outlier; size differences are reported but not gated');
p(`  spread (meanIdLen): min ${Math.min(...rows.map((r) => r.meanIdLen)).toFixed(2)} · max ${Math.max(...rows.map((r) => r.meanIdLen)).toFixed(2)} · sigma/median ${(stats.meanIdLen.scale / Math.max(1e-9, stats.meanIdLen.med)).toFixed(3)}`);
if (JSONOUT) { fs.writeFileSync(JSONOUT, JSON.stringify({ dir: DIR, pieces: rows.length, stats, rows: rows.map(({ z, ...r }) => r), outliers: out.map((r) => r.file), verdict: out.length ? 'FAIL' : 'PASS', nearDegenerate: flat }, null, 2)); console.log(`[texture] json -> ${JSONOUT}`); }
process.exit(out.length ? 1 : 0);
