// Stego-3 legacy-reel extractor SOURCE (G2). Shipped ENCRYPTED inside the loader
// (builder XORs these chars; loader decrypts post-gate and evals to a function).
// MUST mirror stego3-codec.mjs extractReal exactly - tiers arbitrate. Keep ASCII,
// keep compact (1 char = 1 code in the blob). Must be a function EXPRESSION.
(function legacyReel(pigment, head, seed, pixelOff) {
var RS = pixelOff + 98400, RL = pigment.length - RS, i, j, t, k;
function R(s) { return function () { s |= 0; s = (s + 0x6d2b79f5) | 0; var q = Math.imul(s ^ (s >>> 15), 1 | s); q = (q + Math.imul(q ^ (q >>> 7), 61 | q)) ^ q; return ((q ^ (q >>> 14)) >>> 0) / 4294967296; }; }
var P = new Uint32Array(RL), rr = R(seed);
for (i = 0; i < RL; i++) P[i] = i;
for (i = RL - 1; i > 0; i--) { j = (rr() * (i + 1)) | 0; t = P[i]; P[i] = P[j]; P[j] = t; }
function K(o) { return (head[o % 54] ^ ((seed + 41 * o) & 255) ^ ((17 * o) & 255)) & 255; }
function KH(o) { var e = (seed ^ 0x5033) >>> 0; return (head[o % 54] ^ ((e + 41 * o) & 255) ^ ((17 * o) & 255)) & 255; }
var hb = [0,0,0,0,0,0,0,0,0,0,0,0], nb;
for (j = 0; j < 24; j++) { nb = pigment[RS + P[j]] & 15; if (j & 1) hb[j >> 1] |= nb; else hb[j >> 1] = nb << 4; }
for (i = 0; i < 12; i++) hb[i] ^= KH(i);
if (hb[0] !== 0x50 || hb[1] !== 0x33) return null;
var L = (hb[2] | (hb[3] << 8) | (hb[4] << 16) | (hb[5] << 24)) >>> 0;
if ((12 + L) * 2 > RL) return null;
var TC = new Uint32Array(256);
for (i = 0; i < 256; i++) { var c = i; for (k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1); TC[i] = c >>> 0; }
var out = new Uint8Array(L), v, sl;
for (i = 0; i < L; i++) { v = 0; for (k = 0; k < 2; k++) { sl = 24 + i * 2 + k; v = (v << 4) | (pigment[RS + P[sl]] & 15); } out[i] = v ^ K(i); }
var cc = 0xffffffff;
for (i = 0; i < L; i++) cc = TC[(cc ^ out[i]) & 255] ^ (cc >>> 8);
cc = (cc ^ 0xffffffff) >>> 0;
var want = (hb[6] | (hb[7] << 8) | (hb[8] << 16) | (hb[9] << 24)) >>> 0;
if (cc !== want || out[0] !== 0x1f || out[1] !== 0x8b) return null;
return out;
})
