#!/usr/bin/env node
/**
 * O8.8 builder (G2/G3 carrier; v3.2.0 multi-board loader).
 *
 * Inputs: S6 bundle + Pixel Garden v2 decoy + photo cover + plaque base + hand loader.
 * Output: valid 24-bit BMP (photo grain + snapshot strip) + single-paste runner.
 *
 * Carrier layout (800x620x24, pixelOff=54, no row padding):
 *   [54, 54+98400)  snapshot strip — plaque base + PG3 documented LSB-2 layout
 *                     (magic + u16 len + cipher + zero pad). Gallery tooling reads this.
 *   [54+98400, EOF) R=1,389,600 — 4-bit nibbles at mulberry32(seed) FY positions:
 *                     first 24 slots = header (magic P3 + u32 len + u32 crc + u16 0),
 *                     rest = header^salt-keystream cipher (the S6 bundle).
 *   seed = slowChain(SALT ^ FNVn(名) ^ bits*GOLDEN); SALT derived from the BMP
 *   header (no literal anywhere); the provisioned debug name normalizes by hash;
 *   renamed pastes fail the header-magic/crc confirms and fall to the garden.
 *
 * Minify rules (inherited from Stego-2, still asserted — do not "simplify"):
 *   UTF-8 output always; real payload reduce_vars:false; mangle:false everywhere
 *   (loader narrative identifiers MUST survive); banner comment preserved.
 * Crypto/KDF below is a VERBATIM transliteration of stego3-loader.js — any drift
 * breaks extraction. Tier tests pin byte-exact round-trips. Fully deterministic.
 *
 * Usage: node build-stego3.mjs [bundle.js] [cover.bmp] [out-dir] [--line1=N]
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { PIXOFF, STRIP_LEN, R_START, embedReal, embedDecoy } from './stego3-codec.mjs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const REPO = path.resolve(__dirname, '..', '..');
const ENG = path.join(REPO, 'Active', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch { try { return require(name); } catch { throw new Error(`Missing engine "${name}" — run: cd ${path.join(REPO, 'Active', 'engines')} && npm install`); } }
}
const Terser = needEngine('terser');

const PWHASH_DEBUG = 0xe79dbcf6, FNV_SHIPPED = 0xb16a887e, CANON_BITS = 7, GOLDEN = 0x9E3779B9, SLOW_ROUNDS = 32768;
const DEFAULT_NAME = '佐藤 結衣';
const EXPECT = {
  coverSha: 'b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283',
  coverLen: 1488054, w: 800, h: 620, bpp: 24,
  salt: '6251c72a',
  minReal: 1255535, gzReal: 510264,
  minDecoy: 3066, gzDecoy: 1658,
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
const outDir = args[2] || path.join(__dirname, 'output-stego8');
fs.mkdirSync(outDir, { recursive: true });

// ---- verbatim loader semantics (tiers arbitrate drift) ----
function fnv1a(s) {
  var h = 0x811c9dc5;
  for (var i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i) & 255;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function slowChain(x) {
  var i; x >>>= 0;
  for (i = 0; i < SLOW_ROUNDS; i++) {
    x = (x ^ ((x << 13) >>> 0)) >>> 0;
    x = (x ^ (x >>> 17)) >>> 0;
    x = Math.imul(x, 0x5bd1e995) >>> 0;
    x = (x ^ (x >>> 15)) >>> 0;
  }
  return x >>> 0;
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
const MINIFY_REAL = { compress: { passes: 2, dead_code: true, reduce_vars: false }, mangle: false };
const MINIFY_DECOY = { compress: { passes: 2, dead_code: true }, mangle: false };
const MINIFY_LOADER = { compress: { passes: 2, inline: false, collapse_vars: false, reduce_vars: false }, mangle: false, output: { comments: /^!/ } };

(async () => {
  console.log('=== [1] Cover (+ house salt) ===');
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
  const head = cover.subarray(0, 54);
  let hs = '';
  for (let hi = 0; hi < 54; hi++) hs += String.fromCharCode(head[hi]);
  const SALT = fnv1a(hs);
  const saltHex = SALT.toString(16).padStart(8, '0');
  if (saltHex !== EXPECT.salt) throw new Error(`salt ${saltHex} != ${EXPECT.salt}`);
  console.log(`[+] cover OK ${w}x${h}x${bpp} salt=0x${saltHex}`);

  console.log('=== [2] Payloads (minify -> gzip) ===');
  const rawBundle = fs.readFileSync(bundlePath, 'utf8');
  const minReal = (await Terser.minify(rawBundle, MINIFY_REAL)).code;
  if (minReal.length !== EXPECT.minReal) throw new Error(`minReal ${minReal.length} != ${EXPECT.minReal}`);
  assertAnchors(minReal, 'minReal');
  const gzReal = zlib.gzipSync(Buffer.from(minReal, 'utf8'), { level: 9 });
  if (gzReal.length !== EXPECT.gzReal) throw new Error(`gzReal ${gzReal.length} != ${EXPECT.gzReal}`);
  console.log(`[+] real: min ${minReal.length} -> gzip ${gzReal.length}`);
  const rawDecoy = fs.readFileSync(path.join(__dirname, 'decoy-garden-v2.js'), 'utf8');
  const minDecoy = (await Terser.minify(rawDecoy, MINIFY_DECOY)).code;
  if (minDecoy.length !== EXPECT.minDecoy) throw new Error(`minDecoy ${minDecoy.length} != ${EXPECT.minDecoy}`);
  assertAnchors(minDecoy, 'minDecoy');
  const gzDecoy = zlib.gzipSync(Buffer.from(minDecoy, 'utf8'), { level: 9 });
  if (gzDecoy.length !== EXPECT.gzDecoy) throw new Error(`gzDecoy ${gzDecoy.length} != ${EXPECT.gzDecoy}`);
  console.log(`[+] decoy: min ${minDecoy.length} -> gzip ${gzDecoy.length}`);
  fs.writeFileSync(path.join(outDir, 'stego8-real.min.js'), minReal);
  fs.writeFileSync(path.join(outDir, 'stego8-decoy.min.js'), minDecoy);

  console.log('=== [3] Real embed (scattered 4-bit) ===');
  const seed = slowChain((SALT ^ FNV_SHIPPED ^ (((CANON_BITS * GOLDEN) >>> 0))) >>> 0);
  console.log(`[+] seed=0x${seed.toString(16)} (canon bits ${CANON_BITS})`);
  const stego = Buffer.from(cover);
  const plaque = fs.readFileSync(path.join(__dirname, 'stego3-strip-base.bin'));
  if (plaque.length !== STRIP_LEN) throw new Error(`plaque ${plaque.length}`);
  plaque.copy(stego, PIXOFF);
  const shead = stego.subarray(0, 54);
  const nR = embedReal(stego, shead, seed, gzReal);
  const nD = embedDecoy(stego, shead, gzDecoy);
  const R = stego.length - R_START;
  console.log(`[+] real ${nR}/${R} slots (${(100 * nR / R).toFixed(2)}%), decoy ${nD}/${STRIP_LEN} symbols`);

  const bmpName = 'O8.8-cover.bmp';
  fs.writeFileSync(path.join(outDir, bmpName), stego);

  console.log('=== [4] Runner ===');
  const reelSrc = fs.readFileSync(path.join(__dirname, 'stego3-legacyreel-src.js'), 'utf8');
  if (!/^[\x00-\x7F]*$/.test(reelSrc)) throw new Error('reel src must be ASCII');
  const KGb = fnv1a(CANON_BITS + ':' + SALT.toString(16));
  const codes = [];
  for (let i = 0; i < reelSrc.length; i++) {
    codes.push(reelSrc.charCodeAt(i) ^ ((((KGb >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
  }
  console.log(`[+] reel blob: ${codes.length} codes`);
  const loaderSrc = fs.readFileSync(path.join(__dirname, 'stego8-loader.js'), 'utf8');
  const minLoader = (await Terser.minify(loaderSrc, MINIFY_LOADER)).code;
  if (!minLoader || minLoader.length < 2000) throw new Error(`loader min too small: ${minLoader && minLoader.length}`);
  if (!minLoader.includes('Pixel Garden Player v3.2.0')) throw new Error('banner lost in minify');
  for (const s of ['loadSnapshot', 'tryLegacyReel', 'tryBoardReel', 'venueBits', 'slowChain', 'PG3']) {
    if (!minLoader.includes(s)) throw new Error(`narrative name lost: ${s}`);
  }
  for (const s of ['crc32', '0xedb88320', 'permFY', 'Uint32Array', 'discord', 'Discord', 'webpack', 'Webpack', 'Electron', 'Telegram', 'Teams', 'Zoom', 'Slack', 'WebApp', 'telegram.org', 'teams.microsoft.com', 'zoom.us', 'slack.com', '0x5033', '0x57E602A1', '1474691745']) {
    if (minLoader.includes(s)) throw new Error(`banned literal survived: ${s}`);
  }
  const snapHits = (minLoader.match(/__STEGO3_SNAPSHOT__/g) || []).length;
  const reelHits = (minLoader.match(/__STEGO3_REEL__/g) || []).length;
  if (snapHits !== 1 || reelHits !== 1) throw new Error(`placeholder hits snap=${snapHits} reel=${reelHits}`);
  const b64 = stego.toString('base64');
  let runner = minLoader.replace(/(['"])__STEGO3_SNAPSHOT__\1/, JSON.stringify(b64));
  runner = runner.replace(/(['"])__STEGO3_REEL__\1/, codes.join(','));
  if (runner.includes('__STEGO3_SNAPSHOT__') || runner.includes('__STEGO3_REEL__')) throw new Error('placeholder survived');
  runner = LINE1[line1Variant] + runner;
  const runName = 'O8.8-runner.js';
  fs.writeFileSync(path.join(outDir, runName), runner);
  console.log(`[+] line1 variant ${line1Variant}: ${JSON.stringify(LINE1[line1Variant])}`);
  console.log(`[+] ${bmpName}: ${stego.length} B sha=${sha256(stego)}`);
  console.log(`[+] ${runName}: ${runner.length} chars sha=${sha256(runner)}`);
  console.log('[✓] Stego-8 build complete:', outDir);
})().catch(err => { console.error('[!] Build failed:', err); process.exit(1); });
