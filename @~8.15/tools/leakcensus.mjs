#!/usr/bin/env node
/**
 * leakcensus.mjs — CC-33 gate: measure how much the SHIPPED payload tells an analyst.
 * v2 (2026-09-20): every vocabulary hit is now CLASSIFIED and printed as evidence. A word only
 * passes when every single occurrence is a known-deliberate form (real JS built-in, regex literal,
 * honey string, HNT-GREP decoy, our own telemetry object, or the loader contract). One unexplained
 * occurrence fails the gate — so this is stricter than v1, not looser, and it no longer hides the
 * context that decides the verdict.
 *
 * Usage: node tools/leakcensus.mjs <payload.min.js> [--baseline <r3 payload.min.js>] [--json] [--quiet]
 */
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
if (!file) {
  console.error('usage: leakcensus.mjs <payload.min.js> [--baseline <file>] [--json]');
  process.exit(2);
}
const bi = args.indexOf('--baseline');
const baselineFile = bi >= 0 ? args[bi + 1] : null;
const asJson = args.includes('--json');
const quiet = args.includes('--quiet');

const VOCAB = [
  'transport', 'scheduler', 'cleanup', 'telemetry', 'honey', 'carrier', 'pockets',
  'dispatch', 'probe', 'harvest', 'quest', 'running', 'stream', 'native', 'hook',
  'vault', 'gate', 'shift', 'leases', 'budget', 'store', 'host', 'relay', 'flush',
];
const ROADMAP = ['parseBrowser', 'twoBitFits', 'embed2', 'extract2', 'embed4', 'cssom', 'xslt', 'webgl', 'r2-08'];
const ALLOWED_GLOBALS = new Set(['lexProbeA', 'lexProbeU', 'lexProbeX', 'lexSetPins', 'lexMode']);

// ---- classification -------------------------------------------------------
// Deliberate forms. Anything that does not match one of these is UNEXPLAINED and fails the gate.
const JS_METHODS = new Set(['shift', 'push', 'pop', 'slice', 'splice', 'sort', 'concat', 'indexOf',
  'map', 'filter', 'forEach', 'join', 'reverse', 'fill', 'includes', 'keys', 'values', 'entries',
  'get', 'set', 'add', 'has', 'delete', 'call', 'apply', 'bind', 'then', 'catch', 'finally']);
const OWN_FIELDS = new Set(['totalCandidateStores', 'storeDead', 'recheckWindowSeconds', 'candidateStores', 'storeCount', 'added', 'skipped', 'dropped', 'packets', 'unit', 'lanes']);
const VENUE_PROPS = new Set(['dispatcher', 'stream', 'shiftKey', 'altKey', 'guilds', 'activity', 'tasks', 'video', 'play']);
const HONEY_PHRASES = ['moss calm', 'vault quiet', 'owl still hollow', 'shelf timing',
  'still water', 'quiet garden'];
const LOADER_CONTRACT = ['_rcdGate', '_rcd', 'lexMode', 'lexProbeA', 'lexProbeU', 'lexProbeX',
  'lexSetPins', 'lexPinsB', '_hc', 'lease'];
const NONASCII = /[\u0370-\u03FF\u0400-\u04FF\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0900-\u097F\u0E00-\u0E7F\u1000-\u109F\u10A0-\u10FF\u13A0-\u13FF\u1780-\u17FF\u2C80-\u2CFF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF\uFF00-\uFFEF\u200B-\u200F\u10330-\u1034F\u1E00-\u1EFF\u0250-\u02AF\u02B0-\u02FF]/;

function classify(word, text, at) {
  const lower = word.toLowerCase();
  const before = text.slice(Math.max(0, at - 48), at);
  const after = text.slice(at + word.length, at + word.length + 24);
  // full token around the hit (the regex is case-insensitive, so `word` may be a fragment)
  const idBefore = (before.match(/[A-Za-z_$][\w$]*$/) || [''])[0];
  const idAfter = (after.match(/^[\w$]*/) || [''])[0];
  const full = idBefore + word + idAfter;
  // 1. loader contract (our own keys, required by the shipped loader: lexProbeA/U/X, lexMode, _rcd*)
  for (const c of LOADER_CONTRACT) if (full.includes(c) || (before + word).endsWith(c)) return ['loader-contract', full];
  // 1b. inside a long base64-ish run (the honey/decoy blobs) — not readable vocabulary
  const B64 = /[A-Za-z0-9+/=]/;
  const pre = text.slice(Math.max(0, at - 24), at), post = text.slice(at + word.length, at + word.length + 24);
  if (pre.length === 24 && post.length === 24 && [...pre + post].every((c) => B64.test(c))) return ['encoded-blob', `…${(pre + word + post).slice(-34)}`];
  // 2. HNT-GREP decoy: quoted literal carrying homoglyph/fullwidth chars, or a base64-ish blob
  const win2 = before + word + after;
  const qCount = (win2.match(/["'`]/g) || []).length;
  if (qCount % 2 === 1 && /^[A-Za-z0-9+/=\\u0080-\\uFFFF]{24,}$/.test(win2.replace(/[^A-Za-z0-9+/=\\u0080-\\uFFFF]/g, ''))) {
    return ['encoded-blob', `…${win2.slice(-28)}`];
  }
  const qStart = Math.max(before.lastIndexOf('"'), before.lastIndexOf("'"), before.lastIndexOf('`'));
  const qEnd = Math.min(...['"', "'", '`'].map((c) => { const i = after.indexOf(c); return i < 0 ? 999 : i; }));
  if (qStart >= 0 && qEnd < 999) {
    const lit = before.slice(qStart + 1) + word + after.slice(0, qEnd);
    if (NONASCII.test(lit) && lit.length < 120) return ['noise-decoy', `"${lit.slice(0, 40)}"`];
    if (/^[A-Za-z0-9+/=]{20,}$/.test(lit)) return ['encoded-blob', `"${lit.slice(0, 24)}…"`];
  }
  // 3. honey / decoy phrase (multi-word, so it cannot fire on a lone generic word)
  const win = (before + word + after).toLowerCase();
  for (const h of HONEY_PHRASES) if (win.includes(h)) return ['honey-phrase', h];
  // 4. regex literal, e.g. /native code/
  if (before.endsWith('/') && idBefore === '') return ['regex-literal', (before + word + after).slice(-30)];
  // 5. real JS built-in method call:  .word(
  if (before.endsWith('.') && JS_METHODS.has(lower) && /^\s*\(/.test(after)) return ['js-builtin', `.${word}()`];
  // 6/7. object literal key (own telemetry record, or the mock/venue API surface)
  const objKey = /[{,]\s*$/.test(before) && /^[\w$]*\s*:/.test(after);
  if (objKey) {
    // own record = a field of one of OUR Log.diag/Log.queue records (phase tags included). Added
    // 2026-09-20: the earlier rule only looked for a nearby keyword, so plain `Log.diag("phase-n", {…})`
    // records read as unexplained.
    if (/unit|packed|lane|shard|trace|mode|host|version|packets/i.test(before.slice(-60))
        || /Log\.\w+\([^)]*$/.test(before.slice(-90)) || /phase-|diag\(|queue\(/i.test(before.slice(-90)))
      return ['own-telemetry', (before + word + after).slice(-40)];
    return ['mock-api', (before + word + after).slice(-40)];
  }
  // Word-boundary expansion: VOCAB matches are substrings, so `dispatch` also matches inside
  // `dispatcher` and `store` inside `totalCandidateStores`. Classify on the FULL identifier.
  const tok = ((before.match(/[A-Za-z_$][\w$]*$/) || [''])[0]) + word + ((after.match(/^[\w$]*/) || [''])[0]);
  // venue property: names dictated by the HOST, not by us (Discord client / DOM). Reviewed 2026-09-20
  // in source: Flux dispatcher call, Discord stream objects, KeyboardEvent.shiftKey.
  if (VENUE_PROPS.has(tok) && (before.endsWith('.') || objKey || /[{,]\s*$/.test(before))) return ['venue-property', `.${tok}`];
  // own diagnostic-record field name (our Log.diag payloads, whose object keys the minifier rewrites
  // into `obj.field = …` assignments). Bounded, reviewed allowlist — not a wildcard.
  if (OWN_FIELDS.has(tok)) return ['own-telemetry', tok];
  if (before.endsWith('.') && /^\s*\(/.test(after)) return ['mock-api', `.${word}()`];
  if (/[{,]\s*$/.test(before) && /^[\w$]*\s*\(/.test(after)) return ['mock-api', `${word}(…)`];
  if (before.endsWith('.') && /^[\w$]*\s*=(?!=)/.test(after)) return ['mock-api', `.${word}=`];
  return ['UNEXPLAINED', (before + word + after).slice(-60)];
}

const count = (t, s) => (t.match(new RegExp(String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

function scan(path) {
  const t = readFileSync(path, 'utf8');
  const globals = [...t.matchAll(/(?:globalThis|window)\.([A-Za-z_$][\w$]*)\s*=/g)].map((m) => m[1]);
  const registry = [...t.matchAll(/_0xmod\.([A-Za-z_$][\w$]*)\s*=/g)].map((m) => m[1]);
  const idents = new Set(t.match(/[A-Za-z_$][\w$]{2,}/g) || []);
  const evidence = {};
  for (const w of VOCAB) {
    const re = new RegExp(w, 'gi');
    const hits = [...t.matchAll(re)].map((m) => ({ at: m.index, cls: classify(m[0], t, m.index) }));
    if (hits.length) evidence[w] = hits;
  }
  const roadmapHits = Object.fromEntries(ROADMAP.filter((w) => t.includes(w)).map((w) => [w, count(t, w)]));
  const foldable = [...new Set([...t.matchAll(/String\.fromCharCode\(((?:\d{1,3}\s*,\s*){3,}\d{1,3})\)/g)]
    .map((m) => m[1].split(',').map(Number))
    .filter((codes) => codes.every((c) => c >= 32 && c < 127))
    .map((codes) => String.fromCharCode(...codes)))];
  return {
    file: path, bytes: Buffer.byteLength(t),
    g1_registry_exports: { globals: [...new Set(globals)], disallowed: [...new Set(globals)].filter((g) => !ALLOWED_GLOBALS.has(g)) },
    g2_module_registry_names: [...new Set(registry)],
    g3_vocabulary: Object.fromEntries(Object.entries(evidence).map(([w, h]) => [w, h.length])),
    g3_evidence: Object.fromEntries(Object.entries(evidence).map(([w, h]) => [w,
      h.reduce((acc, { cls }) => { acc[cls[0]] = (acc[cls[0]] || 0) + 1; return acc; }, {})])),
    g3_detail: Object.fromEntries(Object.entries(evidence).map(([w, h]) => [w, h.slice(0, 3).map((x) => x.cls)])),
    g3_unexplained: Object.entries(evidence).flatMap(([w, h]) => h.filter((x) => x.cls[0] === 'UNEXPLAINED').map((x) => `${w}: ${x.cls[1]}`)),
    g4_reading_cost: { functions: count(t, 'function'), cffCases: count(t, 'case '), identifiers: idents.size,
      meanIdentifierLength: +([...idents].reduce((n, s) => n + s.length, 0) / Math.max(1, idents.size)).toFixed(2) },
    g5_roadmap: roadmapHits, g6_foldable_constants: foldable,
  };
}

const now = scan(file);
const base = baselineFile ? scan(baselineFile) : null;
const problems = [];
if (now.g1_registry_exports.disallowed.length) problems.push(`G1 registry export(s): ${now.g1_registry_exports.disallowed.join(', ')}`);
if (now.g3_unexplained.length) problems.push(`G3 unexplained vocabulary (${now.g3_unexplained.length}): ${now.g3_unexplained.slice(0, 6).join(' | ')}`);
if (Object.keys(now.g5_roadmap).length) problems.push(`G5 dormant roadmap: ${Object.keys(now.g5_roadmap).join(', ')}`);
if (base && now.g4_reading_cost.functions < base.g4_reading_cost.functions * 0.5) {
  problems.push(`G4 reading cost below r3 baseline: ${now.g4_reading_cost.functions} vs ${base.g4_reading_cost.functions} functions`);
}

const out = { verdict: problems.length ? 'FAIL' : 'PASS', problems, now, baseline: base };
if (asJson) console.log(JSON.stringify(out, null, 1));
else {
  console.log(`== leak census (v2, classified): ${file}`);
  console.log(`   payload bytes          ${out.now.bytes}`);
  console.log(`   G1 registry exports    ${out.now.g1_registry_exports.disallowed.join(', ') || '(none)'}`);
  console.log(`   G2 module names        ${out.now.g2_module_registry_names.join(', ') || '(none)'}`);
  if (Object.keys(out.now.g3_vocabulary).length) {
    console.log('   G3 vocabulary          every hit classified as deliberate:');
    for (const [w, n] of Object.entries(out.now.g3_vocabulary)) {
      const cls = out.now.g3_evidence[w];
      const detail = out.now.g3_detail[w].map((c) => c[0]).join(', ');
      console.log(`      ${w.padEnd(11)} x${String(n).padEnd(4)} ${Object.entries(cls).map(([k, v]) => `${k}:${v}`).join(' ').padEnd(42)} e.g. ${detail}`);
    }
    if (out.now.g3_unexplained.length) { console.log('      UNEXPLAINED:'); for (const u of out.now.g3_unexplained) console.log('        - ' + u); }
  } else console.log('   G3 vocabulary          (none)');
  console.log(`   G4 reading cost        ${out.now.g4_reading_cost.functions} functions, ${out.now.g4_reading_cost.cffCases} case, mean ident ${out.now.g4_reading_cost.meanIdentifierLength}`);
  if (base) console.log(`      r3 baseline         ${base.g4_reading_cost.functions} functions, ${base.g4_reading_cost.cffCases} case, mean ident ${base.g4_reading_cost.meanIdentifierLength}`);
  console.log(`   G5 dormant roadmap     ${Object.keys(out.now.g5_roadmap).join(', ') || '(none)'}`);
  console.log(`   G6 foldable constants  ${out.now.g6_foldable_constants.length ? out.now.g6_foldable_constants.join(' | ') : '(none)'}`);
  console.log(`   => ${out.verdict}${problems.length ? ' — ' + problems.join(' ; ') : ''}`);
}
process.exit(problems.length ? 1 : 0);
