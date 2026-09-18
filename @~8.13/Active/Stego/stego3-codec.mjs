// stego3-codec.mjs — Stego-3 carrier codec (G1): scattered 4-bit real + LSB-2 strip decoy.
// Pure functions; builder embeds, loader re-implements extract (tiers arbitrate, as in Stego-2).
export const W = 800, H = 680, ROWB = W * 3, PIXOFF = 54;
export const STRIP_ROWS = 41, STRIP_LEN = STRIP_ROWS * ROWB; // 98400
export const R_START = PIXOFF + STRIP_LEN; // 98454 — legacy zero-slack start; see slackFor
export const SLACK_MAX = 1024;
export const KS_A = 41, KS_B = 17; // rotated multipliers (Stego-2 used 37/13)
export const HDR_DOM = 0x5033; // 'P3'
// Decoy-strip keystream seed. The loader does NOT read a constant — it recomputes this
// from the frame it was handed: `(w*41 + h*13 + bpp*5 + 41*7) & 65535` (stego11-loader.js
// loadSnapshot). This constant used to be frozen at the 800x680 value (42047), so the
// moment the cover moved to 1024x768 the loader derived 52375 and the garden strip could
// never decrypt — loadSnapshot returned garbage, gunzip threw, and the loader's
// `catch (e9) { return; }` swallowed it into total silence. Deriving it from the real
// dimensions keeps embed and loader in agreement for any cover size.
export const DSEED = (41 * W + 13 * H + 5 * 24 + 7 * STRIP_ROWS) & 0xffff; // 42047 — legacy 800x680 default
export const dseedFor = (w = W, h = H, bpp = 24) => (41 * w + 13 * h + 5 * bpp + 7 * STRIP_ROWS) & 0xffff;
// HNT-N / DS-2 (was A2) — cover slack. Until now the snapshot strip began at exactly
// `pixelOff` and the real channel at exactly `pixelOff + 98400`, so the carrier had ZERO
// slack: a hunter who knew the BMP header format could read the decoy strip with one
// hard-coded offset and no key at all. `slackFor` shifts the whole strip/real boundary by
// a small header-derived amount. Both sides derive it from the same 54 header bytes, so
// nothing is stored anywhere — it is recomputed by the embedder, the loader, the real
// reel and every generated board reel. The checksum is the loader's own `grainCal` form
// (already public in the shipped loader, so it adds no new tell). Cost is <=1024 bytes
// of real channel (~0.05% occupancy at 1024x768).
export function slackFor(head) {
  let acc = 0;
  for (let i = 0; i < 54; i++) acc = (acc + (head[i] ^ ((acc >>> 3) & 255))) >>> 0;
  return acc & (SLACK_MAX - 1);
}
export const stripOff = (head) => PIXOFF + slackFor(head);
export const rStartFor = (head) => stripOff(head) + STRIP_LEN;
export function rng32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function permFY(n, seed) {
  const p = new Uint32Array(n);
  for (let i = 0; i < n; i++) p[i] = i;
  const rnd = rng32(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = (rnd() * (i + 1)) | 0, t = p[i]; p[i] = p[j]; p[j] = t;
  }
  return p;
}
const CRC_T = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; } return t; })();
export function crc32(buf) { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = CRC_T[(c ^ buf[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
export function ksByte(head, seed, i) {
  return (head[i % 54] ^ ((seed + KS_A * i) & 255) ^ ((KS_B * i) & 255)) & 255;
}
export function xcrypt(head, seed, data) {
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) out[i] = data[i] ^ ksByte(head, seed, i);
  return out;
}
// --- real channel: header(12B magic+len+crc) + gz, nibbles @ permuted 4-bit slots ---
export function embedReal(px, head, seed, payload) {
  const RS = rStartFor(head);
  const R_LEN = px.length - RS;
  const hdr = Buffer.alloc(12);
  hdr[0] = 0x50; hdr[1] = 0x33;
  hdr.writeUInt32LE(payload.length, 2);
  hdr.writeUInt32LE(crc32(payload), 6);
  hdr.writeUInt16LE(0, 10);
  const stream = Buffer.concat([xcrypt(head, (seed ^ HDR_DOM) >>> 0, hdr), xcrypt(head, seed, payload)]);
  const need = stream.length * 2;
  if (need > R_LEN) throw new Error(`real over capacity: ${need} > ${R_LEN}`);
  const p = permFY(R_LEN, seed);
  for (let j = 0; j < need; j++) {
    const nib = (j & 1) ? (stream[j >> 1] & 15) : (stream[j >> 1] >> 4);
    const pos = RS + p[j];
    px[pos] = (px[pos] & 0xf0) | nib;
  }
  return need;
}
export function extractReal(px, head, seed) { // -> Buffer or null (clean reject)
  const RS = rStartFor(head);
  const R_LEN = px.length - RS;
  const p = permFY(R_LEN, seed);
  const hb = Buffer.alloc(12);
  for (let j = 0; j < 24; j++) {
    const nib = px[RS + p[j]] & 15;
    if (j & 1) hb[j >> 1] |= nib; else hb[j >> 1] = nib << 4;
  }
  const h = xcrypt(head, (seed ^ HDR_DOM) >>> 0, hb);
  if (h[0] !== 0x50 || h[1] !== 0x33) return null;
  const len = h.readUInt32LE(2);
  if (len < 0 || (12 + len) * 2 > R_LEN) return null;
  const stream = Buffer.alloc(12 + len);
  hb.copy(stream, 0);
  for (let j = 24; j < (12 + len) * 2; j++) {
    const nib = px[RS + p[j]] & 15, bi = j >> 1;
    if (j & 1) stream[bi] |= nib; else stream[bi] = nib << 4;
  }
  const pay = xcrypt(head, seed, stream.subarray(12));
  if (crc32(pay) !== h.readUInt32LE(6)) return null;
  const padLen = 32 + (seed % 64);
  if (pay.length <= padLen || pay[padLen] !== 0x1f || pay[padLen + 1] !== 0x8b) return null;
  return pay.subarray(padLen);
}
// --- decoy channel: strip LSB-2 sequential, DOCUMENTED gallery-format-v3 layout ---
// [magic 'PG3' plaintext][u16le len ciphered][payload ciphered][zero padding]
function dks(head, j, ds = DSEED) { return head[j % 54] ^ (((ds + KS_A * j) & 255)) ^ (((KS_B * j) & 255)); }
export function embedDecoy(px, head, payload, w = W, h = H, bpp = 24) {
  const ds = dseedFor(w, h, bpp), S0 = stripOff(head);
  const need = (5 + payload.length) * 4;
  if (need > STRIP_LEN) throw new Error(`decoy over capacity: ${need} > ${STRIP_LEN}`);
  const cs = Buffer.alloc(5 + payload.length);
  cs[0] = 0x50; cs[1] = 0x47; cs[2] = 0x33;
  cs.writeUInt16LE(payload.length, 3);
  payload.copy(cs, 5);
  for (let i = 3; i < cs.length; i++) cs[i] ^= dks(head, i - 3, ds) & 255;
  for (let j = 0; j < need; j++) {
    const sym = (cs[j >> 2] >> (2 * (3 - (j & 3)))) & 3;
    px[S0 + j] = (px[S0 + j] & 0xfc) | sym;
  }
  for (let j = need; j < STRIP_LEN; j++) px[S0 + j] &= 0xfc;
  return need;
}
export function extractDecoy(px, head, w = W, h = H, bpp = 24) { // -> Buffer or null
  const ds = dseedFor(w, h, bpp), S0 = stripOff(head);
  const sym = j => px[S0 + j] & 3;
  const byteAt = bi => { let v = 0; for (let k = 0; k < 4; k++) v = (v << 2) | sym(bi * 4 + k); return v; };
  if (byteAt(0) !== 0x50 || byteAt(1) !== 0x47 || byteAt(2) !== 0x33) return null;
  const len = (byteAt(3) ^ (dks(head, 0, ds) & 255)) | ((byteAt(4) ^ (dks(head, 1, ds) & 255)) << 8);
  if (5 + len > STRIP_LEN / 4) return null;
  const out = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    let v = 0; for (let k = 0; k < 4; k++) v = (v << 2) | sym(20 + i * 4 + k);
    out[i] = v ^ (dks(head, 2 + i, ds) & 255);
  }
  return out;
}
