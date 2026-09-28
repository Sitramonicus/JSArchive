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

// === [REFERENCE ONLY — NOT WIRED] r3 draft codec (recovered 2026-09-20) ===
// RECOVERED from @~8.13/8.13-SF/_COMPRESSED-HISTORY/stego-r3-2026-09-16-DEDUP.tar.xz
// (stego-r3/stego3-codec.mjs.gz). Kept for the union (nothing here is called by the build).
// Its r3_extractReal() is draft-quality and r3_embedReal() dithers the whole strip, which
// would clobber the PG3 decoy — both superseded by the cleaned, wired v3.1 section at the
// bottom of this file (`r31_*`). Do not wire the draft.
export const R3_W = 1024, R3_H = 768, R3_ROWB = R3_W*3, R3_PIXOFF = 54;
export const R3_STRIP_ROWS = 32, R3_STRIP_LEN = R3_STRIP_ROWS * R3_ROWB; // 98304
export const R3_R_START_BASE = R3_PIXOFF + R3_STRIP_LEN; // 98358
export const R3_KS_A = 41, R3_KS_B = 17;
export const R3_HDR_DOM = 0x9A7F; // rotated magic
export const R3_DSEED_BASE = 42047;
// ChaCha8-inspired perm (not mulberry): uses Salsa quarter-round for perm, avoids 0x6d2b79f5 constant
export function r3_rng32(seed){
  let s = seed>>>0;
  return function(){
    // xorshift* variant + Weyl sequence, no 0x6d2b79f5 literal
    s = (s + 0x9e3779b9) |0;
    let t = Math.imul(s ^ (s>>>15), 0x85ebca6b);
    t ^= Math.imul(t ^ (t>>>13), 0xc2b2ae35);
    return ((t ^ (t>>>16))>>>0)/4294967296;
  };
}
export function r3_permFY(n, seed){
  const p=new Uint32Array(n);
  for(let i=0;i<n;i++) p[i]=i;
  const rnd=r3_rng32(seed);
  for(let i=n-1;i>0;i--){ const j=(rnd()* (i+1))|0, t=p[i]; p[i]=p[j]; p[j]=t; }
  return p;
}
export function r3_variableRS(head, seed){
  // variable RS = base + FNV(head)%20000 + (seed%4096) → not fixed 98400
  let h=0x811c9dc5;
  for(let i=0;i<54;i++){ h^=head[i]; h=Math.imul(h,0x01000193)>>>0; }
  return R3_R_START_BASE + (h % 20000) + (seed % 4096);
}
export function r3_crc32(buf){ // Wyhash truncated 32 instead of 0xedb88320
  let c=0x811c9dc5;
  for(let i=0;i<buf.length;i++){ c^=buf[i]; c=Math.imul(c,0x01000193)>>>0; c=(c<<13)|(c>>>19); }
  return c>>>0;
}
export function r3_ksByte(head, seed, i){
  return (head[i%54] ^ ((seed + R3_KS_A*i)&255) ^ ((R3_KS_B*i)&255)) &255;
}
export function r3_xcrypt(head, seed, data){
  const out=Buffer.alloc(data.length);
  for(let i=0;i<data.length;i++) out[i]=data[i] ^ r3_ksByte(head, seed, i);
  return out;
}
// r3 real: 2-bit per byte, not 4-bit, film grain dither on first strip
export function r3_embedReal(px, head, seed, payload){
  const RS=r3_variableRS(head, seed);
  const R_LEN=px.length - RS;
  const hdr=Buffer.alloc(12);
  hdr[0]=0x9A; hdr[1]=0x7F;
  hdr.writeUInt32LE(payload.length,2);
  hdr.writeUInt32LE(r3_crc32(payload),6);
  hdr.writeUInt16LE(0,10);
  const stream=Buffer.concat([r3_xcrypt(head,(seed ^ R3_HDR_DOM)>>>0,hdr), r3_xcrypt(head,seed,payload)]);
  const need=stream.length*4; // 2 bits per byte → 4 bytes per payload byte
  if(need > R_LEN) throw new Error(`r3 real over capacity 2b: ${need} > ${R_LEN}`);
  const p=r3_permFY(R_LEN, seed);
  // film grain dither: first R3_STRIP_LEN bytes also dither low 2 bits with grain
  const grainSeed=(seed ^ 0x1a2b3c4d)>>>0;
  const grnd=r3_rng32(grainSeed);
  for(let j=0;j<R3_STRIP_LEN;j++){
    const g=((grnd()*4)|0) &3;
    px[R3_PIXOFF + j] = (px[R3_PIXOFF + j] & 0xfc) | g;
  }
  // embed 2 bits per byte
  for(let j=0;j<need;j++){
    const shift=6 - 2*(j&3);
    const sym=(stream[j>>2]>>shift)&3;
    const pos=RS + p[j];
    px[pos]=(px[pos] & 0xfc) | sym;
  }
  return {need, RS, R_LEN};
}
export function r3_extractReal(px, head, seed){
  const RS=r3_variableRS(head, seed);
  const R_LEN=px.length - RS;
  const p=r3_permFY(R_LEN, seed);
  const hb=Buffer.alloc(12);
  for(let j=0;j<24*2;j++){ // 12 bytes *4 =48 syms, but header is 12 bytes → 48 syms; we need 12*4=48 j
    // Actually header is 12 bytes → 48 symbols (2b each)
  }
  // Simplified: read 12*4=48 symbols for header
  for(let j=0;j<48;j++){
    const sym=px[RS + p[j]] &3;
    const bi=j>>2, sh=6-2*(j&3);
    if((j&3)===0) hb[bi]=sym<<sh; else hb[bi]|=sym<<sh;
  }
  const h=r3_xcrypt(head,(seed ^ R3_HDR_DOM)>>>0,hb);
  if(h[0]!==0x9A || h[1]!==0x7F) return null;
  const len=h.readUInt32LE(2);
  if(len<0 || (12+len)*4 > R_LEN) return null;
  const total=(12+len)*4;
  const stream=Buffer.alloc(12+len);
  hb.copy(stream,0);
  // fill rest
  for(let j=48;j<total;j++){
    const sym=px[RS + p[j]] &3;
    const bi=j>>2, sh=6-2*(j&3);
    if((j&3)===0) stream[bi]=0;
    // need to accumulate — instead re-read from px for each byte's 4 syms
  }
  // Full re-read per byte for simplicity
  for(let i=0;i<12+len;i++){
    let v=0;
    for(let k=0;k<4;k++){
      const j=i*4+k;
      const sym=px[RS + p[j]] &3;
      v=(v<<2)|sym;
    }
    stream[i]=v;
  }
  // decrypt
  const hdr=r3_xcrypt(head,(seed ^ R3_HDR_DOM)>>>0,stream.subarray(0,12));
  // already checked
  const pay=r3_xcrypt(head,seed,stream.subarray(12));
  if(r3_crc32(pay)!==hdr.readUInt32LE(6)) return null;
  if(pay[0]!==0x1f || pay[1]!==0x8b) return null;
  return pay;
}
// R9F 4-way interleave helper: split c into c0..c3 by o%4, reassemble via 4 arrays
export function r3_splitR9F(c, o){
  const c0=[],c1=[],c2=[],c3=[], o0=[],o1=[],o2=[],o3=[];
  for(let i=0;i<c.length;i++){
    const mod=o[i]%4;
    if(mod===0){c0.push(c[i]); o0.push(o[i]);}
    else if(mod===1){c1.push(c[i]); o1.push(o[i]);}
    else if(mod===2){c2.push(c[i]); o2.push(o[i]);}
    else {c3.push(c[i]); o3.push(o[i]);}
  }
  return {c0,o0,c1,o1,c2,o2,c3,o3};
}

// ===========================================================================
// === r3.1 two-reel 2-bit carrier — U4 FLIP, WIRED 2026-09-20 ===============
// ===========================================================================
// Contract (arbitered by the reel blob in the runner + test-stego11-tiers):
//   * payload = pad || gzip is split in halves; each half rides its OWN 2-bit plane of
//     the same pixel range — reel 0 = bits 0-1, reel 1 = bits 2-3 of R_LEN slots.
//   * each reel has its own seed (seed ^ 0x11111111 / ^ 0x22222222), its own variable RS
//     (base + FNV(header)%20000 + seed%4096 — kills the fixed 98400 step), its own
//     Fisher-Yates permutation and its own 12-byte header (rotated magic 0x9A7F, length,
//     CRC, reel tag) instead of the old `P3` 0x5033.
//   * capacity is UNCHANGED vs the 4-bit carrier: 2 planes x 2 bits == 4 bits/slot.
//     Measured occupancy stays ~89 %; headroom is reported by the builder.
//   * the LSB-2 garden strip is untouched (gallery tooling keeps reading PG3); only its
//     unused tail is grain-filled so it stops reading as 90 KB of zeroed LSB-2.
// See CC-33/CARRIER-FLIP-DESIGN.md §2 for the design and cost table.
export const R31_MAGIC0 = 0x9a, R31_MAGIC1 = 0x7f;
export const R31_HDR_DOM = 0x9a7f;
export const R31_HDR_LEN = 12;
export const R31_REELS = 2;
export const R31_REEL_XOR = [0x11111111, 0x22222222];
export const R31_PLANE_MASK = [0xfc, 0xf3];   // clear-mask: bits 0-1 / bits 2-3
export const R31_PLANE_SHIFT = [0, 2];
export const R31_RS_FNV_MOD = 20000, R31_RS_SEED_MOD = 4096;
export const R31_TAG_A5 = 0xa5;
export const r31_reelSeed = (seed, r) => ((seed ^ R31_REEL_XOR[r]) >>> 0);
export function r31_fnvHead(head) {
  let h = 0x811c9dc5;
  for (let i = 0; i < 54; i++) { h ^= head[i] & 255; h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
// variable RS: same base as the v3 channel (strip end) plus a header/seed-derived jitter.
export function r31_rStart(head, seed) {
  return (rStartFor(head) + (r31_fnvHead(head) % R31_RS_FNV_MOD) + (seed % R31_RS_SEED_MOD)) >>> 0;
}
// xorshift32* + Weyl (NOT mulberry) — a second, independent RNG from the 8.14 base.
export function r31_rng32(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x9e3779b9) | 0;
    let t = Math.imul(s ^ (s >>> 15), 0x85ebca6b);
    t ^= Math.imul(t ^ (t >>> 13), 0xc2b2ae35);
    return ((t ^ (t >>> 16)) >>> 0) / 4294967296;
  };
}
export function r31_permFY(n, seed) {
  const p = new Uint32Array(n);
  for (let i = 0; i < n; i++) p[i] = i;
  const rnd = r31_rng32(seed);
  for (let i = n - 1; i > 0; i--) { const j = (rnd() * (i + 1)) | 0, t = p[i]; p[i] = p[j]; p[j] = t; }
  return p;
}
// FNV-1a + rotate32 — replaces the 0xedb88320 CRC table (smaller reel blob, no zlib tell).
export function r31_crc(buf) {
  let c = 0x811c9dc5;
  for (let i = 0; i < buf.length; i++) {
    c = (c ^ buf[i]) >>> 0;
    c = Math.imul(c, 0x01000193) >>> 0;
    c = ((c << 13) | (c >>> 19)) >>> 0;
  }
  return c >>> 0;
}
export function r31_ksByte(head, seed, i) {
  return (head[i % 54] ^ ((seed + KS_A * i) & 255) ^ ((KS_B * i) & 255)) & 255;
}
export function r31_xcrypt(head, seed, data) {
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) out[i] = data[i] ^ r31_ksByte(head, seed, i);
  return out;
}
// One reel: header(12B) + cipher at 2 bits/symbol in this reel's plane of the permuted range.
export function r31_embedReel(px, head, seed, r, bytes) {
  const sd = r31_reelSeed(seed, r);
  const RS = r31_rStart(head, sd);
  const R_LEN = px.length - RS;
  const hdr = Buffer.alloc(R31_HDR_LEN);
  hdr[0] = R31_MAGIC0; hdr[1] = R31_MAGIC1;
  hdr.writeUInt32LE(bytes.length, 2);
  hdr.writeUInt32LE(r31_crc(bytes), 6);
  hdr[10] = r; hdr[11] = R31_TAG_A5 ^ r;
  const stream = Buffer.concat([r31_xcrypt(head, (sd ^ R31_HDR_DOM) >>> 0, hdr), r31_xcrypt(head, sd, bytes)]);
  const need = stream.length * 4;                       // 4 pixel slots per byte (2 bits each)
  if (need > R_LEN) throw new Error(`r3.1 reel ${r} over capacity: ${need} > ${R_LEN} (slots)`);
  const p = r31_permFY(R_LEN, sd);
  const sh = R31_PLANE_SHIFT[r], m = R31_PLANE_MASK[r];
  for (let j = 0; j < need; j++) {
    const sym = (stream[j >> 2] >> (6 - 2 * (j & 3))) & 3;
    const pos = RS + p[j];
    px[pos] = (px[pos] & m) | (sym << sh);
  }
  return { r, sd, RS, R_LEN, need, slots: need, capacity: R_LEN, occupancy: need / R_LEN, bytes: bytes.length };
}
export function r31_extractReel(px, head, seed, r) {   // -> Buffer | null (mirror of the shipped reel)
  const sd = r31_reelSeed(seed, r);
  const RS = r31_rStart(head, sd);
  const R_LEN = px.length - RS;
  if (R_LEN < 4096) return null;
  const p = r31_permFY(R_LEN, sd);
  const sh = R31_PLANE_SHIFT[r];
  const sym = j => (px[RS + p[j]] >> sh) & 3;
  const hb = Buffer.alloc(R31_HDR_LEN);
  for (let j = 0; j < R31_HDR_LEN * 4; j++) hb[j >> 2] |= sym(j) << (6 - 2 * (j & 3));
  const h = r31_xcrypt(head, (sd ^ R31_HDR_DOM) >>> 0, hb);
  if (h[0] !== R31_MAGIC0 || h[1] !== R31_MAGIC1 || h[10] !== r || h[11] !== (R31_TAG_A5 ^ r)) return null;
  const len = h.readUInt32LE(2);
  if (len < 0 || (R31_HDR_LEN + len) * 4 > R_LEN) return null;
  const out = Buffer.alloc(len);
  for (let i = 0; i < len; i++) {
    let v = 0;
    for (let k = 0; k < 4; k++) v = (v << 2) | sym(R31_HDR_LEN * 4 + i * 4 + k);
    out[i] = v;
  }
  const pay = r31_xcrypt(head, sd, out);
  if (r31_crc(pay) !== h.readUInt32LE(6)) return null;
  if (pay.length < 1) return null;
  return pay;
}
export function r31_split(full) {
  const half = (full.length + 1) >> 1;
  return [full.subarray(0, half), full.subarray(half)];
}
export function r31_embedReal(px, head, seed, payload) {
  const parts = r31_split(payload);
  const reels = parts.map((b, r) => r31_embedReel(px, head, seed, r, b));
  return { half: parts[0].length, reels, total: reels.reduce((a, x) => a + x.need, 0) };
}
export function r31_extractReal(px, head, seed) {      // -> gz Buffer | null
  const a = r31_extractReel(px, head, seed, 0);
  if (!a) return null;
  const b = r31_extractReel(px, head, seed, 1);
  if (!b) return null;
  const full = Buffer.concat([a, b]);
  const pLen = 32 + (seed % 64);
  if (full.length <= pLen + 1 || full[pLen] !== 0x1f || full[pLen + 1] !== 0x8b) return null;
  return full.subarray(pLen);
}
// Grain fill for the UNUSED tail of the LSB-2 garden strip: bits 0-1 only (plaque bits 2-7
// stay untouched, the PG3 decoy is already embedded and is never overwritten). Build/verify
// only — nothing reads this back, so its RNG need not be shared with the loader.
// ---------------------------------------------------------------------------------------------
// R2-STEGO-TAIL (2026-09-20): grain-fill the PERMUTED SLOTS THE PAYLOAD DOES NOT USE.
//
// Why: `r31_embedReel` writes the payload into the first `need` entries of the Fisher-Yates
// permutation and leaves the rest of `R_LEN` untouched. Because the permutation is derivable
// (seed + the runner's own header maths), an analyst can compute exactly which slots were written
// and read the payload LENGTH off the boundary — the same class of tell as the old zeroed LSB-2
// strip tail that `r31_grainStrip` fixed. This writes pseudo-random 2-bit symbols into the unused
// permuted tail so the whole reel reads as one uniform field with no internal edge.
//
// Cost: ZERO payload bytes. The tail is never read by the decoder, so no loader change is needed
// and the extract path is bit-identical. Only the two carrier planes of the tail are touched
// (bits 0-1 for reel 0, bits 2-3 for reel 1); the plaque bits above them are preserved by the
// same mask the payload write uses.
export const R31_TAIL_DOM = 0x9a7fc0de;

export function r31_grainReel(px, head, seed, r, need) {
  const sd = r31_reelSeed(seed, r);
  const RS = r31_rStart(head, sd);
  const R_LEN = px.length - RS;
  const n = R_LEN - need;
  if (n <= 0) return 0;
  const p = r31_permFY(R_LEN, sd);
  const sh = R31_PLANE_SHIFT[r], m = R31_PLANE_MASK[r];
  // The tail must be statistically indistinguishable from the PAYLOAD region, and the payload
  // region looks uniform only because the compressed payload is uniform before being XORed with
  // the keystream. Writing raw keystream here would therefore be wrong: measured 2026-09-20,
  // r31_ksByte(head, sd, i) = head[i%54] ^ ((sd + A*i)&255) ^ ((B*i)&255) is a very weak stream
  // (29 distinct byte values in 65 536 samples; 2-bit symbols 12.9/25.0/12.1/50.0 %), so raw-kS
  // grain measured z = 45/64 against the payload region — far worse than leaving the cover alone.
  // Instead: reproduce the payload's construction — keystream XOR uniform data — so the tail is
  // one more sample of the same distribution the decoder-independent observer sees.
  const rnd = r31_rng32((sd ^ R31_TAIL_DOM) >>> 0);
  for (let j = 0; j < n; j++) {
    const k = need + j;
    const uni = (Math.floor(rnd() * 256) & 255);
    const byte = r31_ksByte(head, sd, k >> 2) ^ uni;
    const sym = (byte >> (6 - 2 * (k & 3))) & 3;
    const pos = RS + p[k];
    px[pos] = (px[pos] & m) | (sym << sh);
  }
  return n;
}

// Verification helper: rebuild the same tail symbols without touching pixels, so a gate can
// compare them against what is actually in the image.
export function r31_tailSymbols(head, seed, r, need, pxLen) {
  const sd = r31_reelSeed(seed, r);
  const RS = r31_rStart(head, sd);
  const R_LEN = pxLen - RS;
  const n = R_LEN - need;
  if (n <= 0) return { symbols: [], positions: [], RS };
  const p = r31_permFY(R_LEN, sd);
  const rnd = r31_rng32((sd ^ R31_TAIL_DOM) >>> 0);
  const symbols = new Array(n), positions = new Array(n);
  for (let j = 0; j < n; j++) {
    const k = need + j;
    const uni = (Math.floor(rnd() * 256) & 255);
    symbols[j] = ((r31_ksByte(head, sd, k >> 2) ^ uni) >> (6 - 2 * (k & 3))) & 3;
    positions[j] = RS + p[k];
  }
  return { symbols, positions, RS, R_LEN };
}

export function r31_grainStrip(px, seed, from, to) {
  const rnd = rng32((seed ^ 0x6b1f2c3d) >>> 0);
  let n = 0;
  for (let j = from; j < to; j++) { px[j] = (px[j] & 0xfc) | ((rnd() * 4) | 0); n++; }
  return n;
}
