// Community gallery reel SOURCE - O8.14 r3.1 two-reel 2-bit carrier (U4 flip).
// Carried in the player bundle, selected per venue board at load; unprovisioned boards
// fall back to the garden reel. MUST mirror stego3-codec.mjs r31_extractReal() exactly.
// Keep ASCII, keep compact (1 char = 1 code in the blob), keep the literal below intact.
(function legacyReel(pigment, head, seed, pixelOff) {
// Reel 0 = pixel bits 0-1, reel 1 = bits 2-3 of the same range. Per-reel seed, per-reel
// variable RS (base + FNV(header)%20000 + seed%4096), per-reel permutation and a 12-byte
// header (rotated magic 9A 7F + len + CRC + reel tag). Halves concat to pad||gzip.
var SL = 0, FH = 0x811c9dc5, i, j, k, t, r, rs, RL, P, rr, hb, out, cc, L, v;
for (i = 0; i < 54; i++) {
  SL = (SL + (head[i] ^ ((SL >>> 3) & 255))) >>> 0;
  FH = Math.imul(FH ^ (head[i] & 255), 0x01000193) >>> 0;
}
var BASE = pixelOff + (SL & 1023) + 98400 + (FH % 20000);
function R(sd) {
  return function () {
    sd = (sd + 0x9e3779b9) | 0;
    var q = Math.imul(sd ^ (sd >>> 15), 0x85ebca6b);
    q ^= Math.imul(q ^ (q >>> 13), 0xc2b2ae35);
    return ((q ^ (q >>> 16)) >>> 0) / 4294967296;
  };
}
function K(sd, o) { return (head[o % 54] ^ ((sd + 41 * o) & 255) ^ ((17 * o) & 255)) & 255; }
var parts = [], total = 0;
for (r = 0; r < 2; r++) {
  var SD = (seed ^ (r ? 0x22222222 : 0x11111111)) >>> 0, SH = r << 1;
  rs = BASE + (SD % 4096); RL = pigment.length - rs;
  if (RL < 4096) return null;
  P = new Uint32Array(RL); rr = R(SD);
  for (i = 0; i < RL; i++) P[i] = i;
  for (i = RL - 1; i > 0; i--) { j = (rr() * (i + 1)) | 0; t = P[i]; P[i] = P[j]; P[j] = t; }
  hb = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (j = 0; j < 48; j++) {
    t = (pigment[rs + P[j]] >>> SH) & 3;
    hb[j >> 2] |= t << (6 - 2 * (j & 3));
  }
  for (i = 0; i < 12; i++) hb[i] ^= K((SD ^ 0x9a7f) >>> 0, i);
  if (hb[0] !== 0x9a || hb[1] !== 0x7f || hb[10] !== r || hb[11] !== (0xa5 ^ r)) return null;
  L = (hb[2] | (hb[3] << 8) | (hb[4] << 16) | (hb[5] << 24)) >>> 0;
  if ((12 + L) * 4 > RL) return null;
  out = new Uint8Array(L);
  for (i = 0; i < L; i++) {
    v = 0;
    for (k = 0; k < 4; k++) { t = (pigment[rs + P[48 + i * 4 + k]] >>> SH) & 3; v = (v << 2) | t; }
    out[i] = v ^ K(SD, i);
  }
  cc = 0x811c9dc5;
  for (i = 0; i < L; i++) {
    cc = (cc ^ out[i]) >>> 0;
    cc = Math.imul(cc, 0x01000193) >>> 0;
    cc = ((cc << 13) | (cc >>> 19)) >>> 0;
  }
  if (cc !== ((hb[6] | (hb[7] << 8) | (hb[8] << 16) | (hb[9] << 24)) >>> 0)) return null;
  parts[r] = out; total += L;
}
var full = new Uint8Array(total), at = 0;
for (r = 0; r < 2; r++) { full.set(parts[r], at); at += parts[r].length; }
var pLen = 32 + (seed % 64);
if (full.length <= pLen + 1 || full[pLen] !== 0x1f || full[pLen + 1] !== 0x8b) return null;
return full.subarray(pLen);
})
