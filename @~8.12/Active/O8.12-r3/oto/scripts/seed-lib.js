'use strict';
// seed-lib.js — BUILD-SEED master + per-label derivation (O8.9 G1).
// One master knob (Active/O8.6/BUILD-SEED.txt, 8 hex chars); every randomized
// build step derives its own seed as FNV-1a(master + ':' + label). Same
// (source + master) => byte-identical outputs; respin the master per freeze
// (tools/respin-seed.mjs) to rot cross-build diffs and analyst tooling.
// FAILS LOUD on missing/invalid master — no silent fallback (two behaviors = confusion).
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const SEED_FILE = (() => {
  const r3 = path.join(REPO, 'Active', 'O8.12-r3', 'BUILD-SEED.txt');
  try { if (require('fs').existsSync(r3) && require('fs').readFileSync(r3,'utf8').trim()) return r3; } catch(e){}
  const r2 = path.join(REPO, 'Active', 'O8.12-r2', 'BUILD-SEED.txt');
  const o86 = path.join(REPO, 'Active', 'O8.6', 'BUILD-SEED.txt');
  try { if (require('fs').existsSync(r2) && require('fs').readFileSync(r2,'utf8').trim()) return r2; } catch(e){}
  return o86;
})();
let _master = null;
function master() {
  if (_master) return _master;
  let raw;
  try { raw = fs.readFileSync(SEED_FILE, 'utf8'); }
  catch (e) { throw new Error(`BUILD-SEED missing: ${SEED_FILE} — run: node Active/O8.6/tools/respin-seed.mjs`); }
  const m = raw.trim().toLowerCase();
  if (!/^[0-9a-f]{8}$/.test(m)) throw new Error(`BUILD-SEED invalid (want 8 hex chars): ${JSON.stringify(raw.slice(0, 32))}`);
  _master = m;
  return _master;
}
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}
function derive(label) { return fnv1a(master() + ':' + label).toString(16).padStart(8, '0'); }
function deriveInt(label) { return fnv1a(master() + ':' + label); }
module.exports = { master, derive, deriveInt, SEED_FILE };
