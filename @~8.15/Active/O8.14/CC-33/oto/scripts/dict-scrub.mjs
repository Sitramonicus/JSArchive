// dict-scrub.mjs — CC-33 (2026-09-20). Removes dictionary entries that carry release-surface
// vocabulary. Root cause measured on the shipped payload: the 17 words that `tools/leakcensus.mjs`
// flags do NOT survive as subsystem property names — they ride inside dictionary-mangled identifiers
// (`vaultタ1170`, `ደአgate22`, `gate4410il`, `pockets17`). A generator can only emit what is in its
// word list, so this is a data fix, not an engine fix (same conclusion as dict-augment.mjs, 2026-09-17).
//
// Measured blast radius before the scrub:
//   identifiers-dictionary-5k.csv        6068 entries, 362 affected (vault 187, gate 173, pockets 2)
//   identifiers-dictionary-jso.csv        340 entries,   0 affected
//   identifiers-dictionary-runner-5k.csv 3920 entries,  18 affected (vault 18)
//
// Idempotent (marker-guarded), deterministic, non-destructive: writes the removed entries to
// `<file>.scrapped.csv` so nothing is lost, then rewrites the CSV in the existing single-line form.
//
// Usage: node oto/scripts/dict-scrub.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OTO = path.resolve(HERE, '..');
const CHECK = process.argv.includes('--check');
const SIDECAR = (f) => path.join(OTO, f.replace(/\.csv$/, '') + '.scrub.json'); // no marker token inside the CSV: it is not a valid identifier

// The release-surface vocabulary (mirrors tools/leakcensus.mjs VOCAB, minus words that never occur
// in a dictionary position). Case-insensitive SUBSTRING match, deliberately as blunt as the gate.
const BAN = ['transport', 'scheduler', 'cleanup', 'telemetry', 'honey', 'carrier', 'pockets',
  'dispatch', 'probe', 'harvest', 'quest', 'running', 'stream', 'native', 'hook',
  'vault', 'gate', 'shift', 'leases', 'budget', 'store', 'host', 'relay', 'flush'];

const FILES = ['identifiers-dictionary-5k.csv', 'identifiers-dictionary-jso.csv',
  'identifiers-dictionary-runner-5k.csv'];

let totalRemoved = 0;
for (const f of FILES) {
  const p = path.join(OTO, f);
  const raw = fs.readFileSync(p, 'utf8');
  if (fs.existsSync(SIDECAR(f))) { console.log(`[=] ${f}: already scrubbed`); continue; }
  const entries = raw.trim().split(',').map((s) => s.trim()).filter(Boolean);
  const keep = [], drop = [];
  for (const e of entries) {
    const low = e.toLowerCase();
    (BAN.some((w) => low.includes(w)) ? drop : keep).push(e);
  }
  const perWord = {};
  for (const w of BAN) {
    const n = drop.filter((e) => e.toLowerCase().includes(w)).length;
    if (n) perWord[w] = n;
  }
  if (CHECK) { console.log(`[check] ${f}: ${keep.length} keep / ${drop.length} drop`, perWord); continue; }
  if (!drop.length) { console.log(`[=] ${f}: nothing to scrub`); continue; }
  if (drop.length > entries.length * 0.2) throw new Error(`${f}: scrub would drop ${drop.length}/${entries.length} — refusing (>20%)`);
  fs.writeFileSync(`${p}.scrapped.csv`, drop.join(',') + '\n');
  fs.writeFileSync(p, keep.join(',') + '\n');
  fs.writeFileSync(SIDECAR(f), JSON.stringify({ stage: 'dict-scrub-v1', removed: drop.length, perWord }, null, 1) + '\n');
  totalRemoved += drop.length;
  console.log(`[+] ${f}: ${entries.length} -> ${keep.length} (-${drop.length})`, perWord);
}
console.log(CHECK ? '[check] no writes' : `=== dict-scrub complete: ${totalRemoved} entries retired to *.scrapped.csv ===`);
