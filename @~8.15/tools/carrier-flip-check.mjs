#!/usr/bin/env node
/**
 * carrier-flip-check.mjs — U4 cover-level verifier for the r3.1 two-reel 2-bit carrier.
 *
 * test-stego11-matrix checks the runner's structure; test-stego11-tiers runs the pasted
 * runner end-to-end. Neither states, in one place, that the CARRIER ITSELF is the flipped
 * one. This gate does that, from the cover bytes only (plus the clean cover as reference):
 *
 *   F1  the runner's own reel blob (bit 7 table, decrypted + eval'd) round-trips the payload
 *   F2  variable RS: the channel does not start at the old fixed base, and the old
 *       fixed-offset probe returns nothing
 *   F3  plane discipline: reel 0 never touches pixel bits 2-7, reel 1 never touches bits 0-1
 *       or 4-7 (proved slot-by-slot against the clean cover)
 *   F4  grain: the strip tail and the strip->channel gap carry LSB-2 grain (no multi-KB
 *       all-zero LSB-2 run, all four symbols present, ~2.0 bits of entropy)
 *   F5  the PG3 garden decoy still decodes byte-exact to the shipped decoy (grain did not
 *       clobber it, gallery tooling still works)
 *
 * Usage: node tools/carrier-flip-check.mjs <stego.bmp> <clean.bmp> <real.min.js> <runner.js>
 *        [--plaque Active/Stego/stego3-strip-base.bin] [--out <report.txt>] [--json]
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import {
  STRIP_LEN, slackFor, stripOff, dseedFor,
  r31_rStart, r31_reelSeed, r31_extractReel, r31_fnvHead, r31_permFY, r31_split,
} from '../Active/Stego/stego3-codec.mjs';

const argv = process.argv.slice(2);
const [stegoPath, cleanPath, realPath, runnerPath] = argv.filter((a) => !a.startsWith('--'));
const flag = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const outPath = flag('--out', null);
const asJson = argv.includes('--json');
if (!stegoPath || !cleanPath || !realPath || !runnerPath) {
  console.error('usage: carrier-flip-check.mjs <stego.bmp> <clean.bmp> <real.min.js> <runner.js> [--out report] [--json]');
  process.exit(2);
}
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const plaquePath = flag('--plaque', path.join(REPO, 'Active/Stego/stego3-strip-base.bin'));

const stego = fs.readFileSync(stegoPath);
const clean = fs.readFileSync(cleanPath);
const minReal = fs.readFileSync(realPath, 'utf8');
const runnerSrc = fs.readFileSync(runnerPath, 'utf8');
const plaque = fs.readFileSync(plaquePath);
const minDecoy = path.join(path.dirname(path.resolve(realPath)));
const decoyFile = ['stego11p-decoy.min.js', 'stego11-decoy.min.js'].map((n) => path.join(minDecoy, n)).find(fs.existsSync);
const minDecoySrc = decoyFile ? fs.readFileSync(decoyFile, 'utf8') : null;
const gzReal = zlib.gzipSync(Buffer.from(minReal, 'utf8'), { level: 9 });
const gzDecoy = minDecoySrc ? zlib.gzipSync(Buffer.from(minDecoySrc, 'utf8'), { level: 9 }) : null;

let pass = 0, fail = 0;
const rows = [];
function ok(name, cond, detail = '') {
  if (cond) { pass++; rows.push(`  PASS ${name}${detail ? '  [' + detail + ']' : ''}`); }
  else { fail++; rows.push(`  FAIL ${name}  ${detail}`); }
}
function fnv1a(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return h >>> 0; }
function slowChain(x) { x >>>= 0; for (let i = 0; i < 32768; i++) { x = (x ^ ((x << 13) >>> 0)) >>> 0; x = (x ^ (x >>> 17)) >>> 0; x = Math.imul(x, 0x5bd1e995) >>> 0; x = (x ^ (x >>> 15)) >>> 0; } return x >>> 0; }
function bracketed(src, open, close, from) {
  const s = src.indexOf(open, from); if (s < 0) return null;
  let d = 0;
  for (let i = s; i < src.length; i++) { if (src[i] === open) d++; else if (src[i] === close) { d--; if (d === 0) return src.slice(s, i + 1); } }
  return null;
}

const head = stego.subarray(0, 54);
let hs = ''; for (let i = 0; i < 54; i++) hs += String.fromCharCode(head[i]);
const SALT = fnv1a(hs);
const pixelOff = stego.readUInt32LE(10);
const w = stego.readInt32LE(18), h = stego.readInt32LE(22), bpp = stego.readUInt16LE(28);
const S0 = stripOff(head);
const base = S0 + STRIP_LEN;
const DEFAULT_NAME = '佐藤 結衣';
const hhShipped = fnv1a(DEFAULT_NAME);
const seed = slowChain((SALT ^ hhShipped ^ ((7 * 0x9E3779B9) >>> 0)) >>> 0);
const RS0 = r31_rStart(head, r31_reelSeed(seed, 0));
const RS1 = r31_rStart(head, r31_reelSeed(seed, 1));

// ---- F1: the runner's own reel round-trips the payload ----------------------
let reelOut = null, reelErr = '';
{
  try {
    const r3of = (b) => { // matrix/probe KDF for reel table b (7 = real channel)
      const seedB = slowChain((SALT ^ 0xb16a887e ^ (((b * 0x9E3779B9) >>> 0))) >>> 0);
      const K = fnv1a(seedB.toString(16) + ':' + SALT.toString(16));
      const enc = JSON.parse(bracketed(runnerSrc, '[', ']', runnerSrc.indexOf('/*R9R*/')))[b];
      let src = '';
      for (let i = 0; i < enc.length; i++) src += String.fromCharCode(enc[i] ^ ((((K >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
      return src;
    };
    const src = r3of(7);
    if (!src.includes('(function legacyReel(')) throw new Error('reel 7 source has no legacyReel signature');
    const fn = vm.runInNewContext(src, {});
    reelOut = fn(new Uint8Array(stego), head, seed, pixelOff);
  } catch (e) { reelErr = e.message.slice(0, 90); }
}
ok('F1-shipped-reel round-trips the payload', !!(reelOut && Buffer.from(reelOut).equals(gzReal)),
  reelOut ? `reel=${reelOut.length} gz=${gzReal.length}${reelErr ? ' ' + reelErr : ''}` : reelErr);

// ---- F4b: the unused permuted tail of each reel is grained (R2-STEGO-TAIL) -----
// The payload occupies the first `need` entries of each reel's Fisher-Yates permutation and the
// rest of R_LEN used to keep cover bits, which makes the payload LENGTH readable off the boundary.
// The builder now continues the payload's own keystream into the tail; this asserts the two
// regions are statistically indistinguishable (and, when ungrained, that they are not).
{
  const halves = r31_split(gzReal);                       // exact: the same split the embedder used
  const need0 = (12 + halves[0].length) * 4;              // 12-byte reel header + half, 4 slots per byte
  const reels = [0, 1];
  for (const r of reels) {
    const sd = r31_reelSeed(seed, r);
    const RS = r31_rStart(head, sd);
    const R_LEN = stego.length - RS;
    const need = Math.min(need0, R_LEN);
    const perm = r31_permFY(R_LEN, sd);
    const sh = r * 2;
    const cw = [0, 0, 0, 0], ct = [0, 0, 0, 0];
    for (let j = 0; j < need; j++) cw[(stego[RS + perm[j]] >> sh) & 3]++;
    for (let j = need; j < R_LEN; j++) ct[(stego[RS + perm[j]] >> sh) & 3]++;
    const nw = need, nt = R_LEN - need;
    const p1 = cw[0] / nw, p2 = ct[0] / nt, pb = (cw[0] + ct[0]) / (nw + nt);
    const se = Math.sqrt(pb * (1 - pb) * (1 / nw + 1 / nt));
    const z = se ? Math.abs(p1 - p2) / se : 0;
    const H = (c, n) => -c.reduce((acc, x) => { const q = x / n; return q > 0 ? acc + q * Math.log2(q) : acc; }, 0);
    ok(`F4b-reel${r} tail is grained (no written/unwritten edge)`,
      nt === 0 || z < 3.0,
      `written n=${nw} H=${H(cw, nw).toFixed(5)} | tail n=${nt} H=${H(ct, nt).toFixed(5)} | z(sym0)=${z.toFixed(2)} (threshold 3.0)`);
  }
}

// codec mirror (independent of the shipped reel) for the structural checks below
const a = r31_extractReel(stego, head, seed, 0);
const b = r31_extractReel(stego, head, seed, 1);
ok('F1b-codec mirror decodes both reels', !!(a && b), `reel0=${a ? a.length : 'null'} reel1=${b ? b.length : 'null'}`);

// ---- F2: variable RS -------------------------------------------------------
ok('F2-RS is jittered off the fixed base', RS0 !== base && RS1 !== base && (RS0 - base) > 0 && (RS0 - base) <= 24096,
  `base=${base} RS0=${RS0} (+${RS0 - base}) RS1=${RS1} (+${RS1 - base})`);
{
  // the pre-flip 4-bit probe: P3 magic at base + fixed permutation -> must find nothing
  let hit = false;
  const RL = stego.length - base;
  for (const s of [seed, (seed ^ 0x11111111) >>> 0]) {
    const p = r31_permFY(RL, s);
    let hb = [0, 0];
    for (let j = 0; j < 24; j++) { const nb = stego[base + p[j]] & 15; if (j & 1) hb[j >> 1] |= nb; else hb[j >> 1] = nb << 4; }
    for (let i = 0; i < 2; i++) hb[i] ^= (head[i % 54] ^ (((s ^ 0x5033) + 41 * i) & 255) ^ ((17 * i) & 255)) & 255;
    if (hb[0] === 0x50 && hb[1] === 0x33) hit = true;
  }
  ok('F2b-old P3 header absent at the fixed base', !hit, `probed base=${base}`);
}

// ---- F3: plane discipline (slot-by-slot vs the clean cover) ----------------
{
  const slots0 = new Set(), slots1 = new Set();
  const P0 = r31_permFY(stego.length - RS0, r31_reelSeed(seed, 0));
  const P1 = r31_permFY(stego.length - RS1, r31_reelSeed(seed, 1));
  const need0 = (12 + a.length) * 4, need1 = (12 + b.length) * 4;
  // Payload footprints (for the overlap report) vs full written ranges (for plane discipline):
  // after R2-STEGO-TAIL a reel writes its ENTIRE permuted range, so the full ranges coincide and
  // only the payload footprints still describe "the two reels overlap here".
  const foot0 = new Set(), foot1 = new Set();
  for (let j = 0; j < need0; j++) foot0.add(RS0 + P0[j]);
  for (let j = 0; j < need1; j++) foot1.add(RS1 + P1[j]);
  for (let j = 0; j < stego.length - RS0; j++) slots0.add(RS0 + P0[j]);
  for (let j = 0; j < stego.length - RS1; j++) slots1.add(RS1 + P1[j]);
  // Plane discipline is a property of BITS, not of positions. Since R2-STEGO-TAIL the tail of each
  // reel is grained as well, and a reel's grain may land on a slot the OTHER reel uses for payload —
  // that is harmless because the two reels own different planes (reel0 = bits 0-1, reel1 = bits 2-3)
  // and neither decoder reads the other's plane. So the assertion is:
  //   every position reel0 uses (payload OR grain) must keep bits 2-7 exactly as the clean cover has
  //   them, and every position reel1 uses must keep bits 0-1 and 4-7.
  let bad0 = 0, bad1 = 0, badHi = 0, bothCount = 0, only0 = 0, only1 = 0;
  for (const pos of slots0) {
    const d = (stego[pos] ^ clean[pos]) & 255;
    if (d & 0xf0) badHi++;                                    // bits 4-7 must never move
    if (!foot1.has(pos)) only0++;
    else bothCount++;
    // reel0 owns bits 0-1. It must never move bits 4-7 anywhere, and must never move bits 2-3
    // outside reel1's range (inside it, bits 2-3 belong to reel1).
    if (d & 0xf0) bad0++;
    if ((d & 0x0c) && !slots1.has(pos)) bad0++;
  }
  for (const pos of slots1) {
    const d = (stego[pos] ^ clean[pos]) & 255;
    if (d & 0xf0) badHi++;                                    // same high-nibble rule
    if (!foot0.has(pos)) only1++;
    // reel1 owns bits 2-3: bits 4-7 never move; bits 0-1 only move where reel0 owns them.
    if (d & 0xf0) bad1++;
    if ((d & 0x03) && !slots0.has(pos)) bad1++;
  }
  ok('F3-reel0 touches bits 0-1 only', bad0 === 0 && badHi === 0, `slips=${bad0} hi-nibble slips=${badHi} (positions=${slots0.size})`);
  ok('F3-reel1 touches bits 2-3 only', bad1 === 0, `slips=${bad1} (positions=${slots1.size})`);
  ok('F3-reels overlap as designed', bothCount > 0 && only0 > 0 && only1 > 0,   // payload footprints
    `both=${bothCount} only0=${only0} only1=${only1}`);
  rows.push(`  INFO planes: reel0 slots=${slots0.size} reel1 slots=${slots1.size} union=${new Set([...slots0, ...slots1]).size}`);
}

// ---- F4: grain on the strip tail + gap -------------------------------------
{
  const nD = gzDecoy ? (5 + gzDecoy.length) * 4 : 0;
  const from = S0 + nD, to = Math.min(RS0, RS1);
  const syms = [0, 0, 0, 0];
  let zeros = 0, run = 0, maxRun = 0, sameAsClean = 0;
  for (let j = from; j < to; j++) {
    const s = stego[j] & 3;
    syms[s]++;
    if (s === 0) { zeros++; run++; if (run > maxRun) maxRun = run; } else run = 0;
    if ((stego[j] & 3) === (clean[j] & 3)) sameAsClean++;
  }
  const n = to - from;
  const H = -syms.reduce((acc, c) => { const p = c / n; return acc + (p > 0 ? p * Math.log2(p) : 0); }, 0);
  // plaque bits 2-7 must be untouched inside the strip; the gap is outside the strip
  let plaqueBad = 0;
  for (let j = S0 + nD; j < S0 + STRIP_LEN; j++) if (((stego[j] ^ plaque[j - S0]) & 0xfc) !== 0) plaqueBad++;
  ok('F4-grain covers strip tail + gap', n > 100000 && maxRun < 24 && zeros / n < 0.35,
    `range=[${from},${to}) n=${n} maxZeroRun=${maxRun} zeros=${(100 * zeros / n).toFixed(1)}%`);
  ok('F4-grain entropy ~2.0 bits over 4 symbols', H > 1.90 && H < 2.01, `H=${H.toFixed(4)} syms=${syms.join('/')}`);
  ok('F4-grain is not the clean cover\'s LSBs', sameAsClean / n < 0.35, `matchClean=${(100 * sameAsClean / n).toFixed(1)}%`);
  ok('F4-plaque bits 2-7 preserved under grain', plaqueBad === 0, `slips=${plaqueBad}`);
}

// ---- F5: decoy still decodes byte-exact ------------------------------------
{
  let got = null, err = '';
  try {
    const ds = dseedFor(w, h, bpp);
    const dk = (j) => head[j % 54] ^ ((ds + 41 * j) & 255) ^ ((17 * j) & 255);
    const byteAt = (bi) => { let v = 0; for (let k = 0; k < 4; k++) v = (v << 2) | (stego[S0 + bi * 4 + k] & 3); return v; };
    if (byteAt(0) === 0x50 && byteAt(1) === 0x47 && byteAt(2) === 0x33) {
      const len = (byteAt(3) ^ (dk(0) & 255)) | ((byteAt(4) ^ (dk(1) & 255)) << 8);
      const out = Buffer.alloc(len);
      for (let i = 0; i < len; i++) { let v = 0; for (let k = 0; k < 4; k++) v = (v << 2) | (stego[S0 + 20 + i * 4 + k] & 3); out[i] = v ^ (dk(2 + i) & 255); }
      got = out;
    }
  } catch (e) { err = e.message.slice(0, 80); }
  ok('F5-PG3 garden decoy intact', !!(got && gzDecoy && got.equals(gzDecoy)),
    got ? `decoy=${got.length}B gz=${gzDecoy ? gzDecoy.length : '?'}B${err ? ' ' + err : ''}` : err);
}

const header = [
  `== r3.1 carrier flip check: ${path.basename(stegoPath)}`,
  `   cover ${stego.length} B  sha256=${(await import('node:crypto')).createHash('sha256').update(stego).digest('hex').slice(0, 16)}`,
  `   payload gz=${gzReal.length} B  strip@${S0} (slack ${slackFor(head)})  base=${base}  RS0=${RS0} RS1=${RS1}  fh=${r31_fnvHead(head)}`,
];
const report = header.concat(rows, [`== ${pass} passed, ${fail} failed`]).join('\n');
if (asJson) {
  console.log(JSON.stringify({ pass, fail, RS0, RS1, base, gzReal: gzReal.length, rows }, null, 2));
} else {
  console.log(report);
}
if (outPath) { fs.writeFileSync(outPath, report + '\n'); console.log(`[report] ${outPath}`); }
process.exit(fail ? 1 : 0);
