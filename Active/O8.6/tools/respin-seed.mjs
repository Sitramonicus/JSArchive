// respin-seed.mjs — O8.9 G1: mint a fresh BUILD-SEED master (default) or --show current.
// After respin: run the FULL cascade (obf-v1, minify-family, u-*, build-s4) + battery,
// because every derived seed changes. Record the master in BUILD.json at freeze.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const SEED_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'BUILD-SEED.txt');
if (process.argv.includes('--show')) {
  console.log('BUILD-SEED=' + fs.readFileSync(SEED_FILE, 'utf8').trim());
} else {
  const s = crypto.randomBytes(4).toString('hex');
  fs.writeFileSync(SEED_FILE, s + '\n');
  console.log('BUILD-SEED=' + s);
}
