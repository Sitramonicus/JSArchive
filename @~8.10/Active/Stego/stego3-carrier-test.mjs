// stego3-carrier-test.mjs — G1 harness: round-trip + determinism + grain metrics + negatives.
import fs from 'node:fs';
import zlib from 'node:zlib';
import { PIXOFF, STRIP_LEN, R_START, permFY, embedReal, extractReal, embedDecoy, extractDecoy } from './stego3-codec.mjs';
const A = (c, m) => { if (!c) { console.error('FAIL:', m); process.exit(1); } console.log('ok:', m); };
const TEST_SEED = 0xe68c8adf; // r2 seed as G1 test vector (G2 sets the real KDF)
const cover = fs.readFileSync('../../Uploads/stego2-cover.bmp');
const plaque = fs.readFileSync('./stego3-strip-base.bin');
const realMin = fs.readFileSync('./output-stego2/stego2-real.min.js');
const decoyMin = fs.readFileSync('./output-stego2/stego2-decoy.min.js'); // v1.3 stand-in; v2 lands in G3
A(cover.length === 1488054 && plaque.length === STRIP_LEN, 'inputs sized');
A(cover.readUInt32LE(10) === PIXOFF, 'pixelOff 54');
const gzR1 = zlib.gzipSync(realMin, { level: 9 });
const gzR2 = zlib.gzipSync(realMin, { level: 9 });
A(gzR1.equals(gzR2), `gzip deterministic (${gzR1.length} B)`);
const gzD = zlib.gzipSync(decoyMin, { level: 9 });
console.log(`payloads: real gz ${gzR1.length} B, decoy gz ${gzD.length} B`);
function build() {
  const px = Buffer.from(cover);
  plaque.copy(px, PIXOFF);
  const head = px.subarray(0, 54);
  const nR = embedReal(px, head, TEST_SEED, gzR1);
  const nD = embedDecoy(px, head, gzD);
  return { px, nR, nD };
}
const b1 = build(), b2 = build();
A(b1.px.equals(b2.px), 'embed deterministic (byte-identical)');
const px = b1.px, head = px.subarray(0, 54);
console.log(`util: real ${(b1.nR / (px.length - R_START) * 100).toFixed(1)}% of R, decoy ${(b1.nD / STRIP_LEN * 100).toFixed(1)}% of strip`);
const rR = extractReal(px, head, TEST_SEED);
A(rR && rR.equals(gzR1), 'real round-trip byte-exact');
const rD = extractDecoy(px, head);
A(rD && rD.equals(gzD), 'decoy round-trip byte-exact');
A(extractReal(px, head, TEST_SEED ^ 1) === null, 'wrong seed -> null (garden fallthrough relies on this)');
A(extractDecoy(cover, cover.subarray(0, 54)) === null, 'clean cover decoy -> null');
const p0 = permFY(px.length - R_START, TEST_SEED)[0];
const mut = Buffer.from(px); mut[R_START + p0] ^= 1;
A(extractReal(mut, head, TEST_SEED) === null, 'corrupted header slot -> null');
let mPh = 0, sPh = 0, chPh = 0, nPh = 0;
for (let i = R_START; i < px.length; i++) {
  const d = Math.abs(px[i] - cover[i]);
  if (d > mPh) mPh = d;
  if (d) chPh++;
  sPh += d * d; nPh++;
}
const psnr = 10 * Math.log10(65025 / (sPh / nPh));
let mSt = 0;
for (let j = 0; j < STRIP_LEN; j++) {
  const d = Math.abs(px[PIXOFF + j] - plaque[j]);
  if (d > mSt) mSt = d;
}
console.log(`photo: maxΔ=${mPh} PSNR=${psnr.toFixed(1)}dB changed=${(chPh / nPh * 100).toFixed(1)}%`);
console.log(`strip: maxΔ=${mSt} vs plaque`);
A(mPh <= 15, 'photo maxΔ ≤ 15');
A(psnr >= 32.0, 'photo PSNR ≥ 32.0 (PINNED)');
A(mSt <= 3, 'strip maxΔ ≤ 3');
fs.writeFileSync('/home/user/stego3-g1-proof.bmp', px);
console.log('proof written: /home/user/stego3-g1-proof.bmp');
console.log('G1 CARRIER GREEN');
