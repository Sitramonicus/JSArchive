#!/usr/bin/env node
/**
 * O8.9 builder (frag carrier; v3.3.0 JSO-lite loader; 7 reel tables + Telegram honey).
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
import vm from 'node:vm';
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
const JS = needEngine('javascript-obfuscator');
const { derive: SEED, deriveInt: SEEDINT } = require(path.join(REPO, 'Active', 'O8.6', 'oto', 'scripts', 'seed-lib.js'));

const PWHASH_DEBUG = 0xe79dbcf6, FNV_SHIPPED = 0xb16a887e, CANON_BITS = 7, GOLDEN = 0x9E3779B9, SLOW_ROUNDS = 32768;
const DEFAULT_NAME = '佐藤 結衣';
const EXPECT = {
  coverSha: 'b1590ea3bdc6c49c3799b477b4539bb0a625552765feae129ac51da7cf96f283',
  coverLen: 1488054, w: 800, h: 620, bpp: 24,
  salt: '6251c72a',
  minReal: 1567235, gzReal: 684721,
  minDecoy: 3066, gzDecoy: 1658,
  minHoney: 1184, gzHoney: 727,
  minTube: 2196, gzTube: 1191, // calibrated on first build with tube
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
const outDir = args[2] || path.join(__dirname, 'output-stego9');
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
const MINIFY_HONEY = { compress: { passes: 2, dead_code: true }, mangle: false };
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
  let minReal = (await Terser.minify(rawBundle, MINIFY_REAL)).code;
  // [2b] O8.9 G8 repin: minification reprints probe texts, invalidating S4's pins
  // (lexVerify hashes fn.toString — stale pins fail closed into fiction and kill
  // the shipped bundle). Strip the raw tail, re-slice probes from MINIFIED bytes
  // (decimal const forms — terser reprints hex), re-hash, append fresh pins.
  // Pin what ships (same model as V2 pins). Bug: tG7HexxSM live log 2026-09-14.
  {
    const tailRe = /[,;]?lexSetPins\(\[[^\]]*\]\);?\s*$/; // leading [,;]: terser sequences-joins the tail with a comma
    if (!tailRe.test(minReal)) throw new Error('G8 repin: raw tail not found');
    const stripped = minReal.replace(tailRe, '');
    const fnv = (s) => { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); };
    const sliceFn = (name, constIds) => {
      let cpos = -1, hits = 0;
      for (const cid of constIds) { let i = -1; while ((i = stripped.indexOf(cid, i + 1)) !== -1) { cpos = i; hits++; } }
      if (hits !== 1) throw new Error('G8 repin const not unique: ' + name);
      const a = stripped.lastIndexOf('function', cpos);
      if (a < 0) throw new Error('G8 repin probe missing: ' + name);
      let i = stripped.indexOf('{', a), d = 0, q = null;
      for (; i < stripped.length; i++) {
        const c = stripped[i];
        if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
        if (c === '"' || c === "'" || c === '`') { q = c; continue; }
        if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return stripped.slice(a, i + 1); }
      }
      throw new Error('G8 repin probe unterminated: ' + name);
    };
    const probes = [['lexProbeA', ['0x51ab3c09', '1370176521']], ['lexProbeU', ['0x6f2c9d4e', '1865194830']], ['lexProbeX', ['0x1b3c51ab', '456937899']]];
    const pins = probes.map(([n, c]) => { const body = sliceFn(n, c); if (!c.some((x) => body.includes(x))) throw new Error('G8 repin probe mangled: ' + n); return fnv(body); });
    if (new Set(pins).size !== 3) throw new Error('G8 repin pins degenerate');
    minReal = stripped + ';lexSetPins(' + JSON.stringify(pins) + ');';
    console.log('[G8] repinned for minReal:', pins.join(','));
  }
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
  fs.writeFileSync(path.join(outDir, 'stego9-real.min.js'), minReal);
  fs.writeFileSync(path.join(outDir, 'stego9-decoy.min.js'), minDecoy);
  const rawHoney = fs.readFileSync(path.join(__dirname, 'honey-board-src.js'), 'utf8');
  const minHoney = (await Terser.minify(rawHoney, MINIFY_HONEY)).code;
  if (minHoney.length !== EXPECT.minHoney) throw new Error(`minHoney ${minHoney.length} != ${EXPECT.minHoney}`);
  assertAnchors(minHoney, 'minHoney');
  const gzHoney = zlib.gzipSync(Buffer.from(minHoney, 'utf8'), { level: 9 });
  if (gzHoney.length !== EXPECT.gzHoney) throw new Error(`gzHoney ${gzHoney.length} != ${EXPECT.gzHoney}`);
  console.log(`[+] honey: min ${minHoney.length} -> gzip ${gzHoney.length}`);
  fs.writeFileSync(path.join(outDir, 'stego9-honey.min.js'), minHoney);
  const rawTube = fs.readFileSync(path.join(__dirname, 'tube-vault-src.js'), 'utf8');
  const minTube = (await Terser.minify(rawTube, MINIFY_HONEY)).code;
  if (minTube.length !== EXPECT.minTube) throw new Error(`minTube ${minTube.length} != ${EXPECT.minTube}`);
  assertAnchors(minTube, 'minTube');
  const gzTube = zlib.gzipSync(Buffer.from(minTube, 'utf8'), { level: 9 });
  if (gzTube.length !== EXPECT.gzTube) throw new Error(`gzTube ${gzTube.length} != ${EXPECT.gzTube}`);
  console.log(`[+] tube: min ${minTube.length} -> gzip ${gzTube.length}`);
  fs.writeFileSync(path.join(outDir, 'stego9-tube.min.js'), minTube);

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

  const bmpName = 'O8.9-cover.bmp';
  fs.writeFileSync(path.join(outDir, bmpName), stego);

  console.log('=== [4] Runner ===');
  // ---- G4: 7 reel tables (bits 1..7), seed-coupled keys, 6 honey ----
  const reelSrcReal = fs.readFileSync(path.join(__dirname, 'stego3-legacyreel-src.js'), 'utf8');
  function mulberry(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function honeyReelSrc(bits, rng) {
    const hx = (n, w) => '0x' + (n >>> 0).toString(16).padStart(w, '0');
    let m0 = 0x40 + Math.floor(rng() * 0x30), m1 = 0x30 + Math.floor(rng() * 0x40);
    if (m0 === 0x50 && m1 === 0x33) m0 ^= 0x01;
    const rsBase = 98400 + 64 + Math.floor(rng() * 512);
    const a1 = 33 + 2 * Math.floor(rng() * 16), a2 = 11 + 2 * Math.floor(rng() * 16);
    const khx = Math.floor(rng() * 0x10000), add = Math.floor(rng() * 0x100000000);
    const poly = Math.floor(rng() * 0x100000000);
    return (
'// Studio reel extractor (G4 rev ' + bits + '). Shipped ENCRYPTED inside the loader\n' +
'// (builder XORs these chars; loader decrypts post-gate and evals to a function).\n' +
'// Must be a function EXPRESSION. Keep ASCII.\n' +
'(function legacyReel(pigment, head, seed, pixelOff) {\n' +
'var RS = pixelOff + ' + rsBase + ', RL = pigment.length - RS, i, j, t, k;\n' +
'function R(s) { return function () { s |= 0; s = (s + ' + hx(add, 8) + ') | 0; var q = Math.imul(s ^ (s >>> 15), 1 | s); q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q; return ((q ^ (q >>> 14)) >>> 0) / 4294967296; }; }\n' +
'var P = new Uint32Array(RL), rr = R(seed);\n' +
'for (i = 0; i < RL; i++) P[i] = i;\n' +
'for (i = RL - 1; i > 0; i--) { j = (rr() * (i + 1)) | 0; t = P[i]; P[i] = P[j]; P[j] = t; }\n' +
'function K(o) { return (head[o % 54] ^ ((seed + ' + a1 + ' * o) & 255) ^ ((' + a2 + ' * o) & 255)) & 255; }\n' +
'function KH(o) { var e = (seed ^ ' + hx(khx, 4) + ') >>> 0; return (head[o % 54] ^ ((e + ' + a1 + ' * o) & 255) ^ ((' + a2 + ' * o) & 255)) & 255; }\n' +
'var hb = [0,0,0,0,0,0,0,0,0,0,0,0], nb;\n' +
'for (j = 0; j < 24; j++) { nb = pigment[RS + P[j]] & 15; if (j & 1) hb[j >> 1] |= nb; else hb[j >> 1] = nb << 4; }\n' +
'for (i = 0; i < 12; i++) hb[i] ^= KH(i);\n' +
'if (hb[0] !== ' + hx(m0, 2) + ' || hb[1] !== ' + hx(m1, 2) + ') return null;\n' +
'var L = (hb[2] | (hb[3] << 8) | (hb[4] << 16) | (hb[5] << 24)) >>> 0;\n' +
'if ((12 + L) * 2 > RL) return null;\n' +
'var TC = new Uint32Array(256);\n' +
'for (i = 0; i < 256; i++) { var c = i; for (k = 0; k < 8; k++) c = (c & 1) ? (' + hx(poly, 8) + ' ^ (c >>> 1)) : (c >>> 1); TC[i] = c >>> 0; }\n' +
'var out = new Uint8Array(L), v, sl;\n' +
'for (i = 0; i < L; i++) { v = 0; for (k = 0; k < 2; k++) { sl = 24 + i * 2 + k; v = (v << 4) | (pigment[RS + P[sl]] & 15); } out[i] = v ^ K(i); }\n' +
'var cc = 0xffffffff;\n' +
'for (i = 0; i < L; i++) cc = TC[(cc ^ out[i]) & 255] ^ (cc >>> 8);\n' +
'cc = (cc ^ 0xffffffff) >>> 0;\n' +
'var want = (hb[6] | (hb[7] << 8) | (hb[8] << 16) | (hb[9] << 24)) >>> 0;\n' +
'if (cc !== want || out[0] !== 0x1f || out[1] !== 0x8b) return null;\n' +
'return out;\n})');
  }
  const hrng = mulberry(SEEDINT('stego9-honeyreel'));
  const reelSrcs = [null];
  for (let b = 1; b <= 7; b++) reelSrcs[b] = (b === CANON_BITS) ? reelSrcReal : honeyReelSrc(b, hrng);
  const printable = s => {
    let n = 0;
    for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); if ((c >= 32 && c <= 126) || c === 10 || c === 13 || c === 9) n++; }
    return n / s.length;
  };
  const reelBlobs = [0];
  for (let b = 1; b <= 7; b++) {
    const src = reelSrcs[b];
    if (!/^[\x00-\x7F]*$/.test(src)) throw new Error(`reel src ${b} must be ASCII`);
    new vm.Script(src); // must parse as a function expression
    const pr = printable(src);
    if (pr < 0.8) throw new Error(`reel src ${b} printability ${pr.toFixed(3)} (oracle gate)`);
    const seedB = slowChain((SALT ^ FNV_SHIPPED ^ (((b * GOLDEN) >>> 0))) >>> 0);
    const K = fnv1a(seedB.toString(16) + ':' + SALT.toString(16));
    const codes = [];
    for (let i = 0; i < src.length; i++) codes.push(src.charCodeAt(i) ^ ((((K >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
    reelBlobs[b] = codes;
  }
  console.log(`[+] reel tables: 7 (real=${reelBlobs[7].length}, honey~${reelBlobs[1].length})`);
  // ---- G10: Telegram courtesy reel blob ----
  const K8 = fnv1a('board8:' + SALT.toString(16));
  const codes8 = [];
  for (let i = 0; i < gzHoney.length; i++) codes8.push(gzHoney[i] ^ ((((K8 >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
  console.log(`[+] board8 blob: ${codes8.length} codes`);
  // ---- G6: sealed studio cache blob (tube payload; tamper/enumeration only) ----
  const KT = fnv1a(SALT.toString(16) + 'board8:');
  const codesT = [];
  for (let i = 0; i < gzTube.length; i++) codesT.push(gzTube[i] ^ ((((KT >>> ((i % 4) * 8)) & 255) ^ ((41 * i) & 255))));
  console.log(`[+] tube blob: ${codesT.length} codes`);
  // ---- G3: JSO-lite the loader, then terser ----
  const loaderSrc = fs.readFileSync(path.join(__dirname, 'stego9-loader.js'), 'utf8');
  const jsoLoader = JS.obfuscate(loaderSrc, {
    compact: true, simplify: true,
    selfDefending: false, debugProtection: false, disableConsoleOutput: false,
    renameGlobals: false, renameProperties: false, transformObjectKeys: false,
    unicodeEscapeSequence: false,
    identifierNamesGenerator: 'mangled-shuffled',
    seed: SEED('stego9-loader'),
    reservedNames: ['^会員$', '^名$', '^lexMode$', '^lexPinsB$', '^lexProbeL', '^lexVerifyL$'],
    reservedStrings: ['佐藤 結衣'],
    stringArray: false,
    controlFlowFlattening: true, controlFlowFlatteningThreshold: 0.3,
    deadCodeInjection: false, splitStrings: false, numbersToExpressions: false,
  }).getObfuscatedCode();
  const BANNER9 = '/*! Pixel Garden Player v3.3.0 — loads .pgsnapshot gallery files (24-bit BMP + PG3 snapshot strip).\n * Community edition: plays the embedded garden plot. Studio board reels\n * (provisioned separately per venue board) fall back to the garden\n * when unprovisioned. Paste-and-watch. */\n';
  let minLoader = (await Terser.minify(BANNER9 + jsoLoader, MINIFY_LOADER)).code;
  // ---- G8: loader pins (probes sliced from shipped loader text) ----
  {
    const sliceFn = (name) => {
      const a = minLoader.indexOf('function ' + name);
      if (a < 0) throw new Error('G8 loader probe missing: ' + name);
      let i = minLoader.indexOf('{', a), d = 0, q = null;
      for (; i < minLoader.length; i++) {
        const c = minLoader[i];
        if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
        if (c === '"' || c === "'" || c === '`') { q = c; continue; }
        if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return minLoader.slice(a, i + 1); }
      }
      throw new Error('G8 loader probe unterminated: ' + name);
    };
    const lp = [['lexProbeL1', 'Math.imul'], ['lexProbeL2', 'Math.imul']].map(([n, c]) => {
      const body = sliceFn(n);
      if (!body.includes(c)) throw new Error('G8 loader probe mangled: ' + n);
      return fnv1a(body).toString(16);
    });
    if (minLoader.split('lexPinsB=[0,0]').length - 1 !== 1) throw new Error('G8 loader pins anchor missing/dup');
    minLoader = minLoader.replace('lexPinsB=[0,0]', 'lexPinsB=' + JSON.stringify(lp));
    console.log('[+] loader pins:', lp.join(','));
  }

  if (!minLoader || minLoader.length < 2000) throw new Error(`loader min too small: ${minLoader && minLoader.length}`);
  if (!minLoader.includes('Pixel Garden Player v3.3.0')) throw new Error('banner lost in minify');
  if (!minLoader.includes(DEFAULT_NAME)) throw new Error('minLoader: default name missing (JSO ate it)');
  if (!minLoader.includes('会員') || !minLoader.includes('名')) throw new Error('minLoader: 会員/名 missing (JSO ate them)');
  for (const s of ['venueBits', 'tryBoardReel', 'tryTubeReel', 'loadSnapshot', 'tryLegacyReel', 'slowChain', 'personalize', 'gunzipToCode']) {
    if (minLoader.includes(s)) throw new Error(`narrative name survived JSO (G3 gate): ${s}`);
  }
  for (const s of ['crc32', '0xedb88320', 'permFY', 'Uint32Array', 'discord', 'Discord', 'webpack', 'Webpack', 'Electron', 'Telegram', 'Teams', 'Zoom', 'Slack', 'WebApp', 'telegram.org', 'teams.microsoft.com', 'zoom.us', 'slack.com', '0x5033', '0x57E602A1', '1474691745', 'legacyReel', 'TG-DEMO', 'brm/2']) {
    if (minLoader.includes(s)) throw new Error(`banned literal survived: ${s}`);
  }
  const fragHits = (minLoader.match(/__STEGO9_FRAG__/g) || []).length;
  const reelsHits = (minLoader.match(/__STEGO9_REELS__/g) || []).length;
  const boardHits = (minLoader.match(/__STEGO9_BOARD8__/g) || []).length;
  const tubeHits = (minLoader.match(/__STEGO9_TUBE__/g) || []).length;
  if (fragHits !== 1 || reelsHits !== 1 || boardHits !== 1 || tubeHits !== 1) throw new Error(`placeholder hits frag=${fragHits} reels=${reelsHits} board=${boardHits}`);
  // ---- G2: fragment the snapshot ----
  const b64 = stego.toString('base64');
  const chunks = [b64.slice(0, 5)];
  for (let p = 5; p < b64.length; p += 173) chunks.push(b64.slice(p, p + 173));
  const frng = mulberry(SEEDINT('stego9-frag'));
  const order = chunks.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(frng() * (i + 1)); const tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  const fragObj = { c: order.map(i => chunks[i]), o: order };
  let runner = minLoader.replace(/(['"])__STEGO9_FRAG__\1/, '/*R9F*/' + JSON.stringify(fragObj));
  runner = runner.replace(/(['"])__STEGO9_REELS__\1/, '/*R9R*/[0,' + reelBlobs.slice(1).map(b => '[' + b.join(',') + ']').join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_BOARD8__\1/, '/*R9B*/[' + codes8.join(',') + ']');
  runner = runner.replace(/(['"])__STEGO9_TUBE__\1/, '/*R9T*/[' + codesT.join(',') + ']');
  if (runner.includes('__STEGO9_')) throw new Error('placeholder survived');
  for (const s of ['/*R9F*/', '/*R9R*/', '/*R9B*/', '/*R9T*/']) {
    if ((runner.match(new RegExp(s.replace(/[*/]/g, '\\$&'), 'g')) || []).length !== 1) throw new Error(`anchor ${s} missing/dup`);
  }
  runner = LINE1[line1Variant] + runner;
  const runName = 'O8.9-runner.js';
  fs.writeFileSync(path.join(outDir, runName), runner);
  console.log(`[+] line1 variant ${line1Variant}: ${JSON.stringify(LINE1[line1Variant])}`);
  console.log(`[+] ${bmpName}: ${stego.length} B sha=${sha256(stego)}`);
  console.log(`[+] ${runName}: ${runner.length} chars sha=${sha256(runner)}`);
  console.log('[✓] Stego-9 build complete:', outDir);
})().catch(err => { console.error('[!] Build failed:', err); process.exit(1); });
