#!/usr/bin/env node
/**
 * decoy-parity.mjs — does the REAL payload, when nobody claims a profile, print exactly what the
 * DECOY artifact prints? That is the whole point of a decoy: an observer comparing "the file that
 * runs for me" against "the file that runs for someone who has a profile" must not be able to tell
 * which is which from the console.
 *
 *   node tools/decoy-parity.mjs <real.min.js> <decoy.min.js> [--name <gardener>] [--kaikan 0|1|2]
 *
 * Method: run each artifact in its own VM with virtual timers, capture every console line, then
 * compare the garden output. The real payload is advanced past the gate window (120 s) so its
 * fallback path is what executes. Our own identity lines (stamped `[HH:MM:SS.mmm +Ns] …`), the
 * `[Host …]` line, the Player welcome and the `[MemberCount …]` line are excluded: they are the
 * *stall*, not the garden, and the decoy has no equivalent (the decoy is pasted alone).
 * Exit 0 = identical garden, 1 = divergence (with the first differing line printed).
 */
import fs from 'node:fs';
import vm from 'node:vm';

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const [REAL, DECOY] = argv.filter((a) => !a.startsWith('--') && a !== arg('--name') && a !== arg('--kaikan'));
const NAME = arg('--name', '\u4f50\u85e4 \u7d50\u8863');
const KAIKAN = Number(arg('--kaikan', '2'));
if (!REAL || !DECOY) { console.error('usage: decoy-parity.mjs <real.min.js> <decoy.min.js> [--name X] [--kaikan 2]'); process.exit(2); }

function runOne(file, isReal) {
  const log = [];
  let offset = 0, seq = 1;
  const timers = [];
  class VDate extends Date {
    constructor(...a) { if (a.length === 0) super(Date.now() + offset); else super(...a); }
    static now() { return Date.now() + offset; }
  }
  const setT = (fn, ms) => { const id = seq++; timers.push({ id, at: offset + (Number(ms) || 0), fn, dead: false }); return id; };
  const clrT = (id) => { const t = timers.find((x) => x.id === id); if (t) t.dead = true; };
  const advance = (ms) => {
    offset += ms;
    for (;;) {
      const due = timers.filter((t) => !t.dead && t.at <= offset).sort((a, b) => a.at - b.at);
      if (!due.length) break;
      due[0].dead = true;
      try { due[0].fn(); } catch (e) {}
    }
  };
  const sandbox = {
    Date: VDate, Math, JSON, String, Number, Array, Object, Promise, Uint8Array, Uint16Array, Int32Array,
    Float64Array, Proxy, Reflect, Symbol, Map, Set, WeakMap, Error, TypeError, RangeError, RegExp,
    TextEncoder, TextDecoder, setTimeout: setT, clearTimeout: clrT, setInterval: setT, clearInterval: clrT,
    // the machinery uses AbortController; a bare sandbox without it made the REAL payload throw on
    // load, which silently hid the fallback from this gate (found 2026-09-21).
    AbortController: globalThis.AbortController, AbortSignal: globalThis.AbortSignal,
    performance: { now: () => Date.now() },
    // the real payload's string layer decodes with atob (the decoy never needs it)
    atob: (b64) => Buffer.from(String(b64), 'base64').toString('latin1'),
    btoa: (s) => Buffer.from(String(s), 'latin1').toString('base64'),
    console: { log: (...a) => log.push(a.join(' ')), debug: (...a) => log.push(a.join(' ')), warn: (...a) => log.push(a.join(' ')), error: (...a) => log.push(a.join(' ')), info: (...a) => log.push(a.join(' ')), clear: () => {} },
    crypto: { subtle: require0('node:crypto').webcrypto.subtle },
    document: { createElement: () => ({ setAttribute() {}, style: {}, appendChild() {} }), body: { appendChild() {} }, addEventListener: () => {} },
    location: { origin: 'https://example.invalid', href: 'https://example.invalid/', pathname: '/' },
  };
  function require0(m) { return globalThis.__req(m); }
  sandbox.globalThis = sandbox; sandbox.window = sandbox;
  sandbox.navigator = { userAgent: 'parity', languages: ['en'] };
  const ctx = vm.createContext(sandbox);
  ctx._0xmod = { log: { say() {}, diag() {}, warn() {}, info() {}, queue() {}, flush() {} } };
  // Faithful inputs: the operator edits the PROFILE TAG IN THE FILE (not a global). The runner carries
  // `var 会員 = K; var 名 = "X";` ahead of the payload; the decoy artifact carries its own copy of
  // those two declarations. So: prepend them for the real payload, and rewrite the decoy's own line —
  // otherwise the decoy's hard-coded defaults silently win and the comparison is meaningless.
  const DECL = 'var \u4f1a\u54e1 = ' + KAIKAN + '; var \u540d = ' + JSON.stringify(NAME) + ';\n';
  let src = fs.readFileSync(file, 'utf8');
  if (isReal) src = DECL + src;
  else src = src.replace(/^var \u4f1a\u54e1\s*=\s*\d+\s*,\s*\u540d\s*=\s*"[^"]*";/, DECL.trim());
  try { vm.runInContext(src, ctx, { filename: file, timeout: 20000 }); } catch (e) { log.push('THROW: ' + String(e && e.message || e)); if (process.env.DECOY_DEBUG === '1') console.error('[decoy-debug] ' + file + ' THROW: ' + String((e && e.stack) || e).split('\n').slice(0, 3).join(' | ')); }
  if (process.env.DECOY_DEBUG === '1') { console.error('[decoy-debug] ' + file + ' lines=' + log.length + (log.length ? ' | first: ' + log.slice(0, 6).map((x) => x.slice(0, 90)).join('  ||  ') : '')); }
  if (isReal) advance(121000);                       // cross the window so the fallback face is up
  else advance(1);
  return log;
}

// `require` inside a vm-less context: give the sandbox a minimal crypto via the host
globalThis.__req = (await import('node:module')).createRequire(import.meta.url);

const realAll = runOne(REAL, true);
const decoyAll = runOne(DECOY, false);

// The decoy's garden lines are unstamped and start with one of these signatures.
const GARDEN = /^(Pixel Garden v2\.0 — tended by |gen \d+ — \d+ sprouts|.*sprouts:|[.#]+$|Plot journal: |Garden settled\. )/;
const garden = (lines) => lines.filter((l) => GARDEN.test(l) || /^[.#]{5,}$/.test(l));
const header = (lines) => lines.find((l) => l.startsWith('Pixel Garden v2.0')) || '(no header)';
const real = garden(realAll);
const decoy = garden(decoyAll);

if (argv.includes('--dump')) {
  console.log('--- real payload, all console lines (tail 18) ---');
  for (const l of realAll.slice(-18)) console.log('   ' + JSON.stringify(l).slice(0, 160));
  console.log('--- decoy, all console lines (tail 4) ---');
  for (const l of decoyAll.slice(-4)) console.log('   ' + JSON.stringify(l).slice(0, 160));
}
console.log(`== decoy parity: ${REAL.split('/').pop()} vs ${DECOY.split('/').pop()}`);
console.log(`   profile=${JSON.stringify(NAME)}  会員=${KAIKAN}`);
console.log(`   real:  ${real.length} garden line(s)  [${header(realAll)}]`);
console.log(`   decoy: ${decoy.length} garden line(s)  [${header(decoyAll)}]`);
let diff = -1;
for (let i = 0; i < Math.max(real.length, decoy.length); i++) if (real[i] !== decoy[i]) { diff = i; break; }
if (diff === -1) {
  console.log('   PASS — the fallback garden and the decoy artifact print the identical output');
  process.exit(0);
}
console.log(`   FAIL — first divergence at line ${diff}:`);
console.log(`     real:  ${JSON.stringify(real[diff] ?? null)}`);
console.log(`     decoy: ${JSON.stringify(decoy[diff] ?? null)}`);
console.log('   real head:  ' + JSON.stringify(real.slice(0, 3), null, 1).slice(0, 300));
console.log('   decoy head: ' + JSON.stringify(decoy.slice(0, 3), null, 1).slice(0, 300));
process.exit(1);
