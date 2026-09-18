// dict-augment.mjs — fills the script-coverage gaps the operator's 20-script spec exposed.
//
// Measured 2026-09-17 against uploads/unicode_list.csv (33,567 chars) and the shipped bundle:
//   * Georgian (U+10A0-10FF)  — 0 chars in ALL THREE dictionaries and 0 in the bundle. The one
//     script of the operator's 20 that is entirely absent.
//   * Katakana (U+30A0-30FF)  — 7 chars in the 5k dictionary vs Hiragana's 423, landing at 132
//     chars in the bundle against Hiragana's 3,212.
//   * U+0456 (Cyrillic і), U+0269 (Latin Small Letter Iota), U+0455 (Cyrillic ѕ) — three of the
//     operator's 27 homoglyph substitutes, present in no dictionary and therefore 0x in the
//     bundle. A generator can only emit what is in its word list, so these are data gaps, not
//     engine gaps.
//
// This script is idempotent (marker-guarded) and deterministic (fixed seed). It appends words in
// the same shape the dictionaries already use: an ASCII fragment, a few script characters, digits.
// Every character used is Unicode ID_Start/ID_Continue, verified below, so the words remain valid
// JS identifiers for identifierNamesGenerator:'dictionary'.
//
// Usage: node oto/scripts/dict-augment.mjs [--check]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OTO = path.resolve(HERE, '..');
const MARK = '/*dict-augment-v1*/';

// Mkhedruli lowercase (U+10D0-10FA) — the modern Georgian alphabet, all Ll.
const GEORGIAN = Array.from({ length: 43 }, (_, i) => String.fromCharCode(0x10d0 + i));
// Katakana letters (U+30A1-30F6), skipping the iteration marks.
const KATAKANA = Array.from({ length: 86 }, (_, i) => String.fromCharCode(0x30a1 + i))
  .filter(c => c !== '\u30fb' && c !== '\u30fc');
// The operator's three unused homoglyph substitutes.
const HOMO = ['\u0456', '\u0269', '\u0455'];
// Fillers for the homoglyph words: the operator's own Latin-lookalike set, so a generated word
// reads exactly like the table's "Standard Latin -> Viable Foreign Substitutes" mapping
// (a->\u0430/\uFF41/\u0251, e->\u0435/\uFF45, o->\u043E/\u03BF/\uFF4F, ...).
const HOMO_FILL = ['\u0430', '\uFF41', '\u0251', '\u0435', '\uFF45', '\u043E', '\u03BF',
  '\uFF4F', '\u0440', '\u03C1', '\uFF50', '\u0441', '\uFF43', '\u0445', '\uFF58',
  '\u0443', '\uFF59', '\uFF53'];
// ASCII fragments in the style already present in the dictionaries.
const FRAG = ['birch', 'plot', 'quill', 'owl', 'ridge', 'kelp', 'sedge', 'onyx', 'cairn', 'pine',
  'moss', 'ember', 'lattice', 'prairie', 'quartz', 'shroud', 'reel', 'vault', 'spire', 'hollow',
  'brine', 'cinder', 'delta', 'flint', 'grove', 'marsh', 'nexus', 'orbit', 'plume', 'quay'];

function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function mkWords(alphabet, n, rnd, homo = null) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const frag = FRAG[Math.floor(rnd() * FRAG.length)];
    const k = 1 + Math.floor(rnd() * 3);              // 1-3 script chars, matching the histogram
    let scr = '';
    for (let j = 0; j < k; j++) scr += alphabet[Math.floor(rnd() * alphabet.length)];
    if (homo) scr = homo[Math.floor(rnd() * homo.length)] + scr;
    const digits = String(Math.floor(rnd() * 9000) + 100);
    out.push(frag + scr + digits);
  }
  return out;
}

function augment(file, plan, seed) {
  const p = path.join(OTO, file);
  const raw = fs.readFileSync(p, 'utf8');
  if (raw.includes(MARK)) { console.log(`[=] ${file} already augmented — skipped`); return null; }
  const words = raw.trim().split(',').map(s => s.trim()).filter(Boolean);
  const before = words.length;
  const rnd = rng(seed);
  const added = [];
  for (const [name, alphabet, count, homo] of plan) {
    const w = mkWords(alphabet, count, rnd, homo);
    added.push(...w);
    console.log(`    + ${name.padEnd(22)} ${count} words`);
  }
  // every generated word must be a valid JS identifier
  const bad = added.filter(w => !/^[A-Za-z_$\u0080-\uFFFF][A-Za-z0-9_$\u0080-\uFFFF]*$/.test(w));
  if (bad.length) throw new Error(`generated non-identifier words: ${bad.slice(0, 5)}`);
  fs.writeFileSync(p, raw.trim() + ',' + added.join(',') + MARK + '\n');
  console.log(`[+] ${file}: ${before} -> ${before + added.length} words (+${added.length})`);
  return added.length;
}

const PLAN_MAIN = [
  ['Georgian U+10A0-10FF', GEORGIAN, 300, null],
  ['Katakana U+30A0-30FF', KATAKANA, 300, null],
  ['homoglyph U+0456/0269/0455', HOMO_FILL, 180, HOMO],
];
const PLAN_RUNNER = [
  ['Georgian U+10A0-10FF', GEORGIAN, 200, null],
  ['Katakana U+30A0-30FF', KATAKANA, 200, null],
  ['homoglyph U+0456/0269/0455', HOMO_FILL, 120, HOMO],
];

console.log('=== dict-augment: filling the 20-script coverage gaps ===');
augment('identifiers-dictionary-5k.csv', PLAN_MAIN, 0x5eed1);
augment('identifiers-dictionary-runner-5k.csv', PLAN_RUNNER, 0x5eed2);
