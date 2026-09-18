#!/usr/bin/env node
/**
 * O8.7-Stego-2 dual-carrier builder (G5.4).
 *
 * Inputs: S6 bundle + Pixel Garden decoy + photo cover + hand loader.
 * Output: valid 24-bit BMP + single-paste runner (Line 1 + minified loader).
 *
 * Carrier layout (800x620x24, pixelOff=54, no row padding):
 *   [54, 54+98304)  decoy band — u32 dLen + Stego-1-formula cipher + chaff.
 *                       The Stego-1 extractor recovers exactly this (the garden).
 *   [54+98304, EOF) scatter range R=1,389,696 — mulberry32(seed) Fisher-Yates
 *                       perm: positions [0..3] hold the salt-XOR'd length u32,
 *                       [4..4+L) hold the header^salt-keystream cipher (the S6 bundle).
 *   seed = SALT ^ FNV-1a(default 名), computed over the RUNTIME 名 by the loader,
 *   so renamed pastes fail the gzip-magic confirm and fall through to T1.
 *
 * Minify rules (both hard-won, both asserted below — do not "simplify"):
 *   1. UTF-8 output, NEVER ascii_only: ascii_only escapes 会員/名/佐藤 結衣 to
 *      \uXXXX, so the loader's literal-anchor substitution silently no-ops
 *      (T1-rename caught this: identical sha8 both sides, includes() false).
 *   2. Real payload uses reduce_vars:false: default Terser constant-folds
 *      `var 会員=0x2` + all its reads and ERASES the mode switch (zero 会員
 *      left in the min) — hardcoding mode 2 in every paste. Costs +50 KB gz
 *      (budget 38.3%). The hand-written decoy keeps full compress (its anchor
 *      survives — verified by assertion, not by hope).
 *
 * Crypto below is a VERBATIM transliteration of stego2-loader.js — any drift
 * breaks extraction. Tier tests pin byte-exact round-trips. Fully deterministic:
 * consecutive builds are byte-identical (asserted at freeze).
 *
 * Usage: node build-stego2.js [bundle.js] [cover.bmp] [out-dir] [--line1=N]
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');
const REPO = path.resolve(__dirname, '..', '..');
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  try { return require(name); } catch (e) { /* fall through */ }
  throw new Error(`Missing engine "${name}" — run: cd ${path.join(REPO, 'Active', 'engines')} && npm install`);
}
const Terser = needEngine('terser');

// ---- frozen constants (see Handoff/S6-STEGO2-PLAN.md §2) ----
const SALT = 0x57E602A1;
const CHAFF_SEED = 0xC4AFF1E;
const DECOY_BAND = 98304;
const DEFAULT_NAME = '佐藤 結衣';
const EXPECT = {
  coverSha: 'b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283',
  coverLen: 1488054, w: 800, h: 620, bpp: 24,
  minReal: 1159470, gzReal: 469340,
  minDecoy: 1443, gzDecoy: 792,
};
const LINE1 = [
  'var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); ',
  'var 名="佐藤 結衣",会員=0x2;console.clear();',
  'var 会員=2,名=\'佐藤 結衣\';console.clear();',
];

const args = process.argv.slice(2).filter(a => !a.startsWith('--line1'));
const line1opt = process.argv.slice(2).find(a => a.startsWith('--line1'));
const line1Variant = line1opt ? parseInt(line1opt.split('=')[1], 10) : 0;
if (!(line1Variant in LINE1)) throw new Error('bad --line1 (want 0/1/2)');
const bundlePath = args[0] || path.join(REPO, 'Active', 'O8.6', 'final-package', 'O8.6-Final-final-bundle.js');
const coverPath = args[1] || path.join(REPO, 'Uploads', 'stego2-cover.bmp');
const outDir = args[2] || path.join(__dirname, 'output-stego2');
fs.mkdirSync(outDir, { recursive: true });

// ---- crypto (verbatim loader semantics) ----
function fnv1a(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i) & 255;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function rng32(s) {
  return function () {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    var t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0);
  };
}
function sha256(b) { return crypto.createHash('sha256').update(b).digest('hex'); }
function assertAnchors(code, what) {
  if (!code.includes(DEFAULT_NAME)) {
    throw new Error(`${what}: literal default name missing (ascii_only would kill substitution)`);
  }
  if (!/会員\s*=\s*(0x2|2|1|0)/.test(code)) {
    throw new Error(`${what}: 会員 assignment anchor missing (reduce_vars would fold it away)`);
  }
}
// Real: reduce_vars OFF (preserves the 会員 mode switch — see header).
// Decoy: full S5-identical compress (hand code, anchor survives — asserted).
// Both: UTF-8 output (ascii_only would escape the anchors — asserted).
const MINIFY_REAL = { compress: { passes: 2, dead_code: true, reduce_vars: false }, mangle: false };
const MINIFY_DECOY = { compress: { passes: 2, dead_code: true }, mangle: false };

(async () => {
  console.log('=== [1] Cover ===');
  const cover = fs.readFileSync(coverPath);
  const coverSha = sha256(cover);
  if (coverSha !== EXPECT.coverSha) throw new Error(`cover hash drift: ${coverSha}`);
  if (cover.length !== EXPECT.coverLen) throw new Error(`cover len ${cover.length}`);
  if (cover.slice(0, 2).toString('ascii') !== 'BM') throw new Error('not a BMP');
  const pixelOff = cover.readUInt32LE(10);
  const w = cover.readInt32LE(18), h = cover.readInt32LE(22);
  const bpp = cover.readUInt16LE(28), comp = cover.readUInt32LE(30);
  if (pixelOff !== 54 || w !== EXPECT.w || h !== EXPECT.h || bpp !== EXPECT.bpp || comp !== 0) {
    throw new Error(`cover dims ${w}x${h}x${bpp} comp=${comp} off=${pixelOff}`);
  }
  console.log(`[+] cover OK ${w}x${h}x${bpp} sha=${coverSha.slice(0, 12)}…`);

  console.log('=== [2] Payloads (minify -> gzip) ===');
  const rawBundle = fs.readFileSync(bundlePath, 'utf8');
  const minReal = (await Terser.minify(rawBundle, MINIFY_REAL)).code;
  if (minReal.length !== EXPECT.minReal) throw new Error(`minReal ${minReal.length} != ${EXPECT.minReal}`);
  assertAnchors(minReal, 'minReal');
  const gzReal = zlib.gzipSync(Buffer.from(minReal, 'utf8'), { level: 9 });
  if (gzReal.length !== EXPECT.gzReal) throw new Error(`gzReal ${gzReal.length} != ${EXPECT.gzReal}`);
  console.log(`[+] real: min ${minReal.length} -> gzip ${gzReal.length}`);

  const rawDecoy = fs.readFileSync(path.join(__dirname, 'decoy-garden.js'), 'utf8');
  const minDecoy = (await Terser.minify(rawDecoy, MINIFY_DECOY)).code;
  if (minDecoy.length !== EXPECT.minDecoy) throw new Error(`minDecoy ${minDecoy.length} != ${EXPECT.minDecoy}`);
  assertAnchors(minDecoy, 'minDecoy');
  const gzDecoy = zlib.gzipSync(Buffer.from(minDecoy, 'utf8'), { level: 9 });
  if (gzDecoy.length !== EXPECT.gzDecoy) throw new Error(`gzDecoy ${gzDecoy.length} != ${EXPECT.gzDecoy}`);
  console.log(`[+] decoy: min ${minDecoy.length} -> gzip ${gzDecoy.length}`);
  fs.writeFileSync(path.join(outDir, 'stego2-real.min.js'), minReal);
  fs.writeFileSync(path.join(outDir, 'stego2-decoy.min.js'), minDecoy);

  console.log('=== [3] Scatter (real) ===');
  const seed = (SALT ^ fnv1a(DEFAULT_NAME)) >>> 0;
  console.log(`[+] SALT=0x${SALT.toString(16)} seed=0x${seed.toString(16)}`);
  const stego = Buffer.from(cover);
  const bandEnd = pixelOff + DECOY_BAND;
  const R = stego.length - bandEnd;
  const L = gzReal.length;
  if (!(L >= 2 && (4 + L) <= R)) throw new Error(`scatter overflow L=${L} R=${R}`);
  const order = new Uint32Array(R);
  for (let a = 0; a < R; a++) order[a] = a;
  const rnd = rng32(seed);
  for (let a = R - 1; a > 0; a--) {
    const b = rnd() % (a + 1);
    const t = order[a]; order[a] = order[b]; order[b] = t;
  }
  for (let a = 0; a < 4; a++) {
    stego[bandEnd + order[a]] = ((L >>> (8 * a)) & 255) ^ ((SALT >>> ((a % 4) * 8)) & 255);
  }
  for (let a = 0; a < L; a++) {
    const hb = cover[a % 54];
    stego[bandEnd + order[4 + a]] = gzReal[a] ^ ((hb ^ ((seed + a * 37) & 255) ^ ((a * 13) & 255)) & 255);
  }
  console.log(`[+] scattered ${L} + 4 over R=${R} (${(100 * (L + 4) / R).toFixed(2)}%)`);

  console.log('=== [4] Decoy band (Stego-1 layout) ===');
  const bytesPerPixel = bpp / 8;
  const rowSize = Math.floor((w * bytesPerPixel + 3) / 4) * 4;
  const dLen = gzDecoy.length;
  const seedD = (w * 31 + h * 17 + bpp * 7) & 65535;
  const dCipher = Buffer.alloc(dLen);
  for (let i = 0; i < dLen; i++) {
    const hb = cover[i % 54];
    dCipher[i] = gzDecoy[i] ^ ((hb ^ ((seedD + i * 37) & 255) ^ ((i * 13) & 255)) & 255);
  }
  stego.writeUInt32LE(dLen, pixelOff);
  let written = 0, yy = 0, cursor = 4;
  while (written < dLen) {
    const rowStart = pixelOff + yy * rowSize;
    const take = Math.min(w * bytesPerPixel - cursor, dLen - written);
    dCipher.copy(stego, rowStart + cursor, written, written + take);
    written += take; cursor = 0; yy++;
  }
  const chaffRnd = rng32(CHAFF_SEED);
  const chaffStart = pixelOff + 4 + dLen;
  for (let o = chaffStart; o < bandEnd; o++) stego[o] = chaffRnd() & 255;
  console.log(`[+] decoy u32+${dLen}B cipher + ${bandEnd - chaffStart}B chaff (rows used: ${yy})`);

  const bmpName = 'O8.7-Stego-2-cover.bmp';
  fs.writeFileSync(path.join(outDir, bmpName), stego);

  console.log('=== [5] Runner ===');
  const loaderSrc = fs.readFileSync(path.join(__dirname, 'stego2-loader.js'), 'utf8');
  const minLoader = (await Terser.minify(loaderSrc, { compress: { passes: 2 }, mangle: false })).code;
  if (!minLoader || minLoader.length < 2000) throw new Error(`loader min too small: ${minLoader && minLoader.length}`);
  const phMatches = minLoader.match(/__STEGO2_BLOB__/g) || [];
  if (phMatches.length !== 1) throw new Error(`placeholder hits=${phMatches.length}`);
  const b64 = stego.toString('base64');
  const runner = LINE1[line1Variant] + minLoader.replace(/(['"])__STEGO2_BLOB__\1/, JSON.stringify(b64));
  if (runner.includes('__STEGO2_BLOB__')) throw new Error('placeholder survived');
  const runName = 'O8.7-Stego-2-runner.js';
  fs.writeFileSync(path.join(outDir, runName), runner);
  console.log(`[+] line1 variant ${line1Variant}: ${JSON.stringify(LINE1[line1Variant])}`);
  console.log(`[+] ${bmpName}: ${stego.length} B sha=${sha256(stego)}`);
  console.log(`[+] ${runName}: ${runner.length} chars sha=${sha256(runner)}`);
  console.log('[✓] Stego-2 build complete:', outDir);
})().catch(err => { console.error('[!] Build failed:', err); process.exit(1); });
