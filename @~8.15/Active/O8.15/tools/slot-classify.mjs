#!/usr/bin/env node
// slot-classify.mjs — which slot does a passphrase actually fire?
//
//   node Active/O8.15/tools/slot-classify.mjs <passphrase> [...more]
//
// Read from argv only; the passphrase is never written to a file and never echoed back — only the slot.
// Two independent mechanisms are checked, because 8.14 uses both:
//   1. the rcd/dbg GATE (shard-u): a 32-bit FNV hash compared against 0xb5546f18 (rcd) / 0xe79dbcf6 (dbg);
//   2. the four VERB slots (shard-a): SHA-256(salt_a + pw + salt_b + pepper) -> 32 bytes -> each byte
//      folded to (b*1337 + i*37 + 101) and XOR-accumulated against that slot's polynomial; a match is
//      acc === 0. This mirrors `_0xchk` exactly, so a hit here is a hit on the page.
import { createHash } from 'node:crypto';

const PP = '2f14d6c07492f5a7cf4ff1ae';   // shard-a: _0xpp1 + _0xpp2 + _0xpp3
const SLOTS = {
  'dbg (legacy poly, shard-a:327)': {
    sa: '3e5d7144aa933681', sb: 'e5beb09c5ac4c02c',
    poly: [57592, 268875, 50981, 263601, 329151, 188803, 103272, 128712, 83291, 337358, 207706, 88750, 227835, 237231, 194484, 206554, 46151, 106353, 258808, 332380, 149248, 236190, 190769, 46410, 158755, 87931, 260441, 186943, 160240, 279270, 294014, 80131]
  },
  'res / revive (shard-a:342)': {
    sa: '6b9501b476e92408', sb: '6fc42452150b9089',
    poly: [331677, 89717, 95102, 247557, 166037, 44407, 4334, 231661, 140782, 31185, 136845, 222450, 71406, 300070, 62121, 218587, 72891, 163844, 305603, 125145, 161281, 189395, 181410, 149359, 184158, 182858, 146796, 281870, 237786, 11870, 144270, 195113]
  },
  'ak / close+release (shard-a:343)': {
    sa: 'd9287e39e9b7bcb1', sb: 'af167c44c78443ec',
    poly: [125779, 216732, 258216, 151293, 75121, 142008, 319866, 60525, 85965, 127449, 150215, 41955, 107505, 144978, 201169, 194521, 240016, 56884, 262819, 36903, 301666, 266941, 275000, 264341, 168114, 230990, 172199, 219031, 130826, 225790, 19929, 64087]
  },
  'roster / view (shard-a:344)': {
    sa: '8b252c4f9bf8679b', sb: '145891c57797e80a',
    poly: [84332, 267538, 234150, 252905, 43033, 231587, 323, 83254, 43181, 273182, 158237, 159611, 13915, 270656, 175766, 273404, 80913, 70254, 35529, 194669, 206739, 297692, 57069, 182784, 30403, 332602, 333976, 205661, 130826, 336761, 81431, 76120]
  }
};
const GATE = { rcd: 0xb5546f18, dbg: 0xe79dbcf6 };
const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };

const polyHit = (pw, { sa, sb, poly }) => {
  const digest = createHash('sha256').update(sa + pw + sb + PP).digest();
  if (digest.length !== 32) return false;
  let acc = 0;
  for (let i = 0; i < 32; i++) acc |= ((((digest[i] * 1337 + i * 37 + 101) & 0xffffffff) >>> 0) ^ poly[i]);
  return acc === 0;
};

let any = false;
for (const pw of process.argv.slice(2)) {
  const h = fnv(String(pw));
  const hits = [];
  if (h === GATE.rcd) hits.push('GATE rcd (FNV 0xb5546f18)');
  if (h === GATE.dbg) hits.push('GATE dbg (FNV 0xe79dbcf6)');
  for (const [name, slot] of Object.entries(SLOTS)) if (polyHit(String(pw), slot)) hits.push(name);
  any = true;
  console.log(`len=${String(pw).length} fnv=0x${h.toString(16).padStart(8, '0')} -> ${hits.length ? hits.join(' + ') : 'NO SLOT (returns false on a healthy page)'}`);
}
if (!any) console.log('usage: node slot-classify.mjs <passphrase> [...]');
