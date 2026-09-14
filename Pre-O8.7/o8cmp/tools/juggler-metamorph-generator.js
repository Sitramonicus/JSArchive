#!/usr/bin/env node
/*
 * juggler-metamorph-generator.js
 * O.8.2-Juggler line — metamorphic instance generator.
 *
 * Produces a structurally-unique quest payload: the 23 plaintext strings in
 * juggler-strings.json are re-encoded per instance with:
 *   layer 1  per-string keys (no global key)
 *   layer 2  per-string mechanisms (xor / add / rot / table) chosen per instance
 *   layer 3  instance-shuffled 256-byte alphabet (table mechanism)
 *   layer 4  pool blob: a random subset of strings merged into one byte blob
 *   layer 5  generator randomness: everything re-rolled per seed
 *
 * Everything outside the decode region (quest logic, gate, forcer, guards,
 * codenames) is copied from the template file untouched.
 *
 * USAGE:
 *   node juggler-metamorph-generator.js \
 *        --template O8.2-Juggler-4.js \
 *        --out O8.2-Juggler-5.js \
 *        [--suite O.8.2-Juggler-5] \
 *        [--seed 8hexchars] \
 *        [--plain]          # skip flagship mix constraints
 *
 * The seed makes an instance reproducible byte-for-byte: same template +
 * same seed => same output file. Default seed is fresh randomness.
 * A printed "seed" line is the record line for the round doc.
 *
 * LOCAL ONLY. Never upload: this file + juggler-strings.json can mint
 * exact copies of any shipped instance (given its seed).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Config / CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const a = {};
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith('--')) {
      const v = argv[i + 1];
      if (v !== undefined && !v.startsWith('--')) { a[k.slice(2)] = v; i++; }
      else a[k.slice(2)] = true;
    }
  }
  return a;
}

const args = parseArgs(process.argv);
const TPL = args.template || 'O8.2-Juggler-4.js';
const OUT = args.out || null;
const SUITE = args.suite || null; // default: bump number from template suite
const SEED = args.seed || crypto.randomBytes(4).toString('hex');
const PLAIN = !!args.plain;

// ---------------------------------------------------------------------------
// Deterministic PRNG (mulberry32)
// ---------------------------------------------------------------------------

function mulberry32(seedInt) {
  let s = seedInt >>> 0;
  return function () {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(parseInt(SEED, 16));

const randInt = n => Math.floor(rng() * n);
const pick = arr => arr[randInt(arr.length)];

// ---------------------------------------------------------------------------
// Load inputs
// ---------------------------------------------------------------------------

const template = fs.readFileSync(TPL, 'utf8');
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(path.join(path.dirname(path.resolve(TPL)), 'juggler-strings.json'), 'utf8'));
} catch (e) {
  manifest = JSON.parse(fs.readFileSync('juggler-strings.json', 'utf8'));
}

const NAMES = Object.keys(manifest); // insertion order from manifest = q0..m9
if (NAMES.length !== 23) throw new Error(`manifest has ${NAMES.length} names, expected 23`);

// ---------------------------------------------------------------------------
// Derive suite version
// ---------------------------------------------------------------------------

const suiteM = template.match(/const SUITE_VERSION = "([^"]+)";/);
if (!suiteM) throw new Error('template: SUITE_VERSION line not found');
const nextSuite = SUITE || suiteM[1].replace(/(\d+)([^0-9]*)$/, (_, n, suf) => (Number(n) + 1) + suf);

// ---------------------------------------------------------------------------
// Mechanisms
//   0 xor   key k          c = p ^ k
//   1 add   key k          c = (p + k) & 255
//   2 rot   keys r,k       c = (rotl(p,r)) ^ k
//   3 tbl   table T        c = T[p]
// ---------------------------------------------------------------------------

const FN = [
  // xor
  `function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; }`,
  // add
  `function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; }`,
  // rot (r = P[0], k = P[1])
  `function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; }`,
  // tbl
  `function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; }`
];
const NP = [1, 1, 2, 0]; // param counts per mechanism index
const KIND = ['xor', 'add', 'rot', 'tbl'];

function encode(m, plain, T) {
  if (!/^[a-zA-Z0-9_\/\-\.=\?]{3,50}$/.test(plain)) throw new Error('plaintext outside sanity charset: ' + JSON.stringify(plain.slice(0, 24)));
  const p = [];
  for (let i = 0; i < plain.length; i++) p.push(plain.charCodeAt(i));
  const ks = [];
  if (m === 0) { const k = 1 + randInt(254); ks.push(k); return { c: p.map(x => (x ^ k) & 255), ks }; }
  if (m === 1) { const k = 1 + randInt(254); ks.push(k); return { c: p.map(x => (x + k) & 255), ks }; }
  if (m === 2) { const r = 1 + randInt(7); const k = 1 + randInt(254); ks.push(r, k);
    return { c: p.map(x => ((((x << r) | (x >>> (8 - r))) & 255) ^ k) & 255), ks }; }
  // tbl
  return { c: p.map(x => T[x]), ks };
}

// ---------------------------------------------------------------------------
// Instance plan
// ---------------------------------------------------------------------------

function planInstance() {
  // Instance alphabet (layer 3) — full 0..255 permutation.
  const T = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { const j = randInt(i + 1); [T[i], T[j]] = [T[j], T[i]]; }

  // Method order shuffle (layer 5): index meaning differs per instance.
  const order = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) { const j = randInt(i + 1); [order[i], order[j]] = [order[j], order[i]]; }

  // Mechanism per string (layer 2) with flagship mix constraints.
  const mech = new Array(23);
  const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
  const pickMech = () => pick(order);
  const dec = (mm) => { mech[mm] = pickMech(); counts[mech[mm]]++; };

  if (!PLAIN) {
    // guarantee: xor,add,tbl >=2 ; rot >=3 ; table always present
    const guarantee = [0, 0, 1, 1, 3, 3, 3];
    guarantee.forEach(mm => dec(mm));
  }
  for (let i = 0; i < 23; i++) if (mech[i] === undefined) dec(i);

  if (!PLAIN) {
    const need = { 0: 2, 1: 2, 2: 3, 3: 2 };
    for (const [m, min] of Object.entries(need)) {
      let guard = 0;
      while (counts[m] < min && guard++ < 100) {
        // swap a surplus string onto this mechanism (never swap m onto itself)
        const surpluses = [];
        for (const [o, cnt] of Object.entries(counts)) {
          if (Number(o) !== Number(m) && cnt > need[o]) surpluses.push(Number(o));
        }
        if (!surpluses.length) break;
        const from = pick(surpluses);
        for (let i = 0; i < 23; i++) if (mech[i] === from) { mech[i] = Number(m); counts[from]--; counts[Number(m)]++; break; }
      }
    }
  }

  // Pool membership (layer 4): each string independently, target band.
  let inPool = new Array(23).fill(false);
  const poolTarget = PLAIN ? 0 : 8 + randInt(8); // 8..15
  const perm = Array.from({ length: 23 }, (_, i) => i);
  for (let i = 22; i > 0; i--) { const j = randInt(i + 1); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let k = 0; k < poolTarget; k++) inPool[perm[k]] = true;
  if (PLAIN) { // plain mode: random pool too, 0..23
    inPool = new Array(23).fill(false);
    for (let i = 0; i < 23; i++) if (randInt(2)) inPool[i] = true;
  }

  // Encode each string.
  const entries = NAMES.map((name, i) => {
    const m = mech[i];
    const { c, ks } = encode(m, manifest[name], T);
    return { name, m, ks, c, pool: inPool[i] };
  });

  // Build pool blob in shuffled order.
  const poolOrder = entries.map((e, i) => i).filter(i => entries[i].pool);
  for (let i = poolOrder.length - 1; i > 0; i--) { const j = randInt(i + 1); [poolOrder[i], poolOrder[j]] = [poolOrder[j], poolOrder[i]]; }
  const poolBytes = [];
  const offsets = {};
  for (const i of poolOrder) {
    offsets[i] = poolBytes.length;
    poolBytes.push(...entries[i].c);
  }

  return { T, order, mech, entries, poolBytes, offsets };
}

// ---------------------------------------------------------------------------
// Emit decode region
// ---------------------------------------------------------------------------

function emitRegion(plan, id) {
  const { T, order, entries, poolBytes, offsets } = plan;
  const mark = -(2 + randInt(25));
  const L = [];
  const I = '      '; // 6-space indent (matches template)
  const arr = a => '[' + a.join(',') + ']';

  L.push(`${I}// ── Juggler decode, metamorphic instance ${id} (${nextSuite}) ──`);
  // O8.4: regex built from char codes (no plaintext pattern literal)
  const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45]; // a-z A-Z 0-9 _ / . = ? -
  L.push(`${I}const _0xJRe = ${arr(_0xJRe)};`);
  L.push(`${I}const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");`);
  L.push(`${I}const _0xT = ${arr(T)};`);
  L.push(`${I}const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();`);
  L.push(`${I}const _0xM = [`);
  order.forEach((m, i) => L.push(`${I}  ${FN[m]}${i === 3 ? '' : ','}`));
  L.push(`${I}];`);
  L.push(`${I}const _0xNp = ${arr(order.map(m => NP[m]))};`);
  if (poolBytes.length) {
    L.push(`${I}const _0xPool = ${arr(poolBytes)};`);
  } else {
    L.push(`${I}const _0xPool = [];`);
  }
  L.push(`${I}const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };`);
  L.push(`${I}const _0xJuggle = (_0xs, _0xl) => {`);
  L.push(`${I}  const _0xf = _0xs[0];`);
  L.push(`${I}  const _0xn = _0xNp[_0xf];`);
  L.push(`${I}  let _0xP, _0xb;`);
  L.push(`${I}  if (_0xs[1] === ${mark}) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }`);
  L.push(`${I}  else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }`);
  L.push(`${I}  const _0xd = _0xM[_0xf](_0xb, _0xP);`);
  L.push(`${I}  const _0ok = _0xJuggleRE.test(_0xd);`);
  L.push(`${I}  _0xJuggleStats.total++;`);
  L.push(`${I}  _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;`);
  L.push(`${I}  Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });`);
  L.push(`${I}  if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(\`[Juggler] \${_0xl}: decoded string failed sanity check (len=\${_0xd.length}) - corrupted instance?\`); }`);
  L.push(`${I}  return _0xd;`);
  L.push(`${I}};`);

  // 23 declarations, original order & names preserved.
  for (const e of entries) {
    const fIdx = order.indexOf(e.m);
    const specBody = e.pool
      ? `${fIdx},${mark},${offsets[entries.indexOf(e)]},${e.c.length}${e.ks.length ? ',' + e.ks.join(',') : ''}`
      : `${fIdx},${e.ks.length ? e.ks.join(',') + ',' : ''}${e.c.join(',')}`;
    L.push(`${I}let ${e.name} = _0xJuggle([${specBody}], "${e.name}");`);
  }

  L.push(`${I}Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "${id}" });`);
  L.push(`${I}// ── end juggler decode ──`);
  return L.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Region surgery on template
// ---------------------------------------------------------------------------

function cutRegion(template) {
  const startMark = '// ── Juggler decode';
  const endMark = '// ── end juggler decode ──';
  const si = template.indexOf(startMark);
  if (si < 0) throw new Error('template: decode region start marker not found');
  const lineStart = template.lastIndexOf('\n', si) + 1;

  let ei = template.indexOf(endMark, si);
  let endExclusive;
  if (ei >= 0) {
    endExclusive = template.indexOf('\n', ei); // drop marker line
    if (endExclusive < 0) endExclusive = template.length;
  } else {
    // Fallback (J-4 template, no end marker): balanced scan of the coverage block.
    const cov = template.indexOf('Log.diag("Juggler coverage"', si);
    if (cov < 0) throw new Error('template: coverage call not found for fallback cut');
    const body = template.indexOf('(() => {', cov);
    if (body < 0) throw new Error('template: coverage IIFE not found');
    let depth = 0, i = body + 7, state = 'seek';
    // walk to matching close of the arrow body (the `{` at body+7 IS the body brace)
    for (; i < template.length; i++) {
      const ch = template[i];
      if (ch === '{') depth++;
      else if (ch === '}') { depth--; if (depth === 0) { state = 'end'; break; } }
    }
    if (state !== 'end') throw new Error('template: coverage block unbalanced');
    const tail = template.slice(i + 1, i + 6);
    if (tail !== ')());') throw new Error('template: unexpected coverage tail ' + JSON.stringify(tail));
    endExclusive = i + 6;
  }
  return { head: template.slice(0, lineStart), tail: template.slice(endExclusive) };
}

// ---------------------------------------------------------------------------
// Head invariants (QoL): console.clear first, INSTANCE_ID const, version-first log
// ---------------------------------------------------------------------------

function applyHead(out, id) {
  // 1) console.clear() as the very first statement — wipes the giant pasted-source
  //    entry (and pre-quest noise) from devtools at paste time, before any of our
  //    logs exist, so nothing of ours is swallowed. No-op under Node (non-TTY).
  if (!/^\s*console\.clear\(\);/.test(out)) out = 'console.clear();\n' + out;

  const hasNew = /const INSTANCE_ID = "/.test(out);
  if (!hasNew) {
    // Convert the old 2-line head (SUITE_VERSION + single Log.info banner) into:
    //   SUITE_VERSION const, INSTANCE_ID const,
    //   Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`)  <- first log (levels 1+2)
    //   Log.diag(`Baseline O8.2 — metamorphic decode, ...`)                                  <- detail (level 2 only)
    const bannerRe = /const SUITE_VERSION = "([^"]+)";\n(\s*)Log\.info\(`\[Quest \$\{SUITE_VERSION\}\] initialized[^\n]*\);\n/;
    const m = out.match(bannerRe);
    if (!m) throw new Error('head: cannot locate banner for QoL rewrite');
    const ver = m[1], ind = m[2];
    const repl =
      'const SUITE_VERSION = "' + ver + '";\n' +
      ind + 'const INSTANCE_ID = "' + id + '";\n' +
      ind + 'Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);\n' +
      ind + 'Log.diag(`Baseline O8.2 — metamorphic decode, Lazy Forcer after decode, URL guard.`);\n';
    out = out.replace(m[0], repl);
  } else {
    // New-form template: refresh the instance id only.
    out = out.replace(/const INSTANCE_ID = "[0-9a-f]{8}";/, 'const INSTANCE_ID = "' + id + '";');
  }
  return out;
}


// ---------------------------------------------------------------------------
// MemberCount red-herring region (J-7+): self-contained, reversible.
// Original strings are re-encoded with a local region key + local decoder;
// inert scaffolding added for plausibility. Runtime behavior unchanged.
// ---------------------------------------------------------------------------

const MC_STR = {
  mc: 'memberCount', amc: 'approximateMemberCount', mcu: 'member_count', mem: 'members',
  oc: 'onlineCount', pc: 'presenceCount', apc: 'approximatePresenceCount', ocu: 'online_count',
  n0: '[MemberCount] No member statistics are currently available in local client state.',
  n1: '[MemberCount] Members: ',
  n2: ' | Online: ',
  n3: '[MemberCount] Local member data could not be read.',
  ua: 'unavailable'
};

function buildMCRegion() {
  const k = 1 + randInt(254);
  const enc = s => '[' + Array.from(s, c => c.charCodeAt(0) ^ k).join(',') + ']';
  const L = [];
  L.push('  // ── client-state readout region ──');
  L.push('  const MemberCount = (() => {');
  L.push('    const _0xk = ' + k + ';');
  L.push('    const _0xds = a => String.fromCharCode(...a.map(c => c ^ _0xk));');
  L.push('    const S = {');
  L.push('      mc: _0xds(' + enc(MC_STR.mc) + '), amc: _0xds(' + enc(MC_STR.amc) + '), mcu: _0xds(' + enc(MC_STR.mcu) + '), mem: _0xds(' + enc(MC_STR.mem) + '),');
  L.push('      oc: _0xds(' + enc(MC_STR.oc) + '), pc: _0xds(' + enc(MC_STR.pc) + '), apc: _0xds(' + enc(MC_STR.apc) + '), ocu: _0xds(' + enc(MC_STR.ocu) + '),');
  L.push('      n0: _0xds(' + enc(MC_STR.n0) + '), n1: _0xds(' + enc(MC_STR.n1) + '), n2: _0xds(' + enc(MC_STR.n2) + '), n3: _0xds(' + enc(MC_STR.n3) + '), ua: _0xds(' + enc(MC_STR.ua) + ')');
  L.push('    };');
  L.push('    // readout bookkeeping (local to this region)');
  L.push('    const _0xwindows = [1, 5, 15, 60];');
  L.push('    const _0xseen = new Set();');
  L.push('    const _0xspan = (a, b) => { const t = String(a).length + (b ? String(b).length : 0); return t; };');
  L.push('    const _0xnote = (tag, value) => { try { if (_0xseen.size < 128) _0xseen.add(String(tag) + ":" + String(value)); } catch (e) {} return _0xseen.size; };');
  L.push('    const _0xframe = { rank: 0, peak: 0, span: 0 };');
  L.push('    const _0xfold = () => { _0xframe.span = _0xwindows[0]; return _0xframe.span; };');
  L.push('    const number = v => Number.isFinite(v) ? v : null;');
  L.push('    const pick = (o, keys) => {');
  L.push('      if (!o || typeof o !== "object") return null;');
  L.push('      for (const kk of keys) { const n = number(o[kk]); if (n !== null) return n; }');
  L.push('      return null;');
  L.push('    };');
  L.push('    const inspect = source => {');
  L.push('      let total = null, online = null;');
  L.push('      const processItem = item => {');
  L.push('        if (!item || typeof item !== "object") return;');
  L.push('        const itemTotal = pick(item, [S.mc, S.amc, S.mcu]);');
  L.push('        const itemOnline = pick(item, [S.oc, S.pc, S.apc, S.ocu]);');
  L.push('        if (itemTotal !== null) total = (total ?? 0) + itemTotal;');
  L.push('        if (itemOnline !== null) online = (online ?? 0) + itemOnline;');
  L.push('        const guildLike = item[S.mc] != null || item[S.amc] != null || item[S.mcu] != null || item[S.mem];');
  L.push('        if (guildLike && itemTotal === null && item[S.mem] && typeof item[S.mem] === "object") {');
  L.push('          if (item[S.mem] instanceof Map) total = (total ?? 0) + item[S.mem].size;');
  L.push('          else { let count = 0; for (const kk in item[S.mem]) { if (Object.hasOwn(item[S.mem], kk)) count++; } total = (total ?? 0) + count; }');
  L.push('        }');
  L.push('      };');
  L.push('      if (source instanceof Map) source.forEach(processItem);');
  L.push('      else if (source && typeof source === "object") { for (const kk in source) { if (Object.hasOwn(source, kk)) processItem(source[kk]); } }');
  L.push('      return { total, online };');
  L.push('    };');
  L.push('    return {');
  L.push('      report: (...sources) => {');
  L.push('        try {');
  L.push('          let result = { total: null, online: null };');
  L.push('          for (const source of sources) {');
  L.push('            const found = inspect(source);');
  L.push('            if (result.total === null && found.total !== null) result.total = found.total;');
  L.push('            if (result.online === null && found.online !== null) result.online = found.online;');
  L.push('            if (result.total !== null && result.online !== null) break;');
  L.push('          }');
  L.push('          if (result.total === null && result.online === null) {');
  L.push('            Log.info(S.n0);');
  L.push('            return result;');
  L.push('          }');
  L.push('          const suffix = result.online === null ? "" : `${S.n2}${result.online}`;');
  L.push('          Log.info(`${S.n1}${result.total ?? S.ua}${suffix}`);');
  L.push('          return result;');
  L.push('        } catch (e) {');
  L.push('          Log.info(S.n3);');
  L.push('          return { total: null, online: null };');
  L.push('        }');
  L.push('      }');
  L.push('    };');
  L.push('  })();');
  L.push('  // ── end client-state readout region ──');
  return L.join('\n');
}

function encapsulateMemberCount(out) {
  if (out.includes('// ── client-state readout region')) return out;
  const start = out.indexOf('\n  const MemberCount = (() => {');
  const anchor = '  const _0xrunKey = Symbol.for("quest-suite:o8:active");';
  const aEnd = out.indexOf(anchor);
  if (start < 0 || aEnd < 0) throw new Error('MC anchors not found');
  out = out.slice(0, start + 1) + buildMCRegion() + '\n' + out.slice(aEnd);
  const callOld =
    '      try {\n' +
    '        const localGuilds = _0x7.getAllGuilds();\n' +
    '        MemberCount.report(localGuilds);\n' +
    '      } catch (e) { MemberCount.report(); }';
  if (!out.includes(callOld)) throw new Error('MC call site not found');
  out = out.split(callOld).join('      // readout call\n' + callOld);
  return out;
}

// ---------------------------------------------------------------------------
// Decoy noise block (J-7+): per-instance generated junk. Pure declarations +
// never-true guards + one harmless lifeline call. Never touches real logic.
// ---------------------------------------------------------------------------

let DECOY_BYTES = 0;

function emitDecoys() {
  const L = [];
  const nm = (tag, i) => '_0x' + id.slice(0, 3) + tag + i.toString(36);
  const rhex = (n) => { let s = ''; for (let i = 0; i < n; i++) s += '0123456789abcdef'[randInt(16)]; return s; };
  const W = [
    'sample','batch','relay','buffer','packet','retry','backoff','quota','budget','weight',
    'offset','delta','phase','cycle','metric','gauge','percentile','latency','parity','digest',
    'nonce','salt','scope','lease','grant','peer','leaf','branch','depth','stride',
    'cursor','anchor','beacon','harbor','orbit','vector','prism','vault','helix','mantle',
    'shard','stride','throttle','window','index','serial','checksum','cohort','spindle','relay'
  ].filter((w, i, a) => a.indexOf(w) === i);
  const pickW = () => W[randInt(W.length)];

  L.push('  // ── generated auxiliary region (self-contained) ──');
  L.push('  (() => {');
  let c = 0;

  // Tier A: three plausible-looking tables (fake route labels, keys, meta rows).
  for (let t = 0; t < 3; t++) {
    const rows = [];
    const n = 58 + randInt(12);
    for (let i = 0; i < n; i++) {
      if (t === 0) rows.push('"/intake/v' + (1 + randInt(9)) + '/' + pickW() + '/' + pickW() + '?src=' + rhex(6) + '"');
      else if (t === 1) rows.push('"' + pickW() + '_' + pickW() + '_' + rhex(4) + '"');
      else rows.push('"' + pickW() + ':' + (1 + randInt(900)) + ':' + rhex(8) + '"');
    }
    const name = nm('a', c++);
    L.push('    const ' + name + ' = [' + rows.join(',') + '];');
  }

  // Tier B: dead pure functions (safe for any input).
  const fns = [
    'const {N} = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s = (s + a.charCodeAt(i) * (i + 1)) % 65521; return s ^ (b || 0); };',
    'const {N} = (n) => { const o = []; for (let i = 0; i < n; i++) o.push((i * 2654435761) >>> 0); return o; };',
    'const {N} = (x) => { const t = new Uint8Array(16); for (let i = 0; i < 16; i++) t[i] = (x >>> (i * 2)) & 255; return t; };',
    'const {N} = (arr) => { let lo = 0, hi = arr.length - 1; while (lo < hi) { const m = (lo + hi) >>> 1; if ((arr[m] & 1) === 0) lo = m + 1; else hi = m; } return lo; };',
    'const {N} = (s) => { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; };',
    'const {N} = (a, b) => { const out = []; for (let i = 0; i < a; i++) out.push((b[i] || 0) ^ (i * 7)); return out; };',
    'const {N} = (v) => { let h = 2166136261; const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };'
  ];
  const fnNames = [];
  for (let i = 0; i < fns.length; i++) {
    const name = nm('f', c++);
    fnNames.push(name);
    L.push('    ' + fns[i].split('{N}').join(name));
  }

  // Tier C: lookalike classes with inheritance.
  const cn = (i) => nm('c', c++);
  const c0 = cn(), c1 = cn(), c2 = cn();
  L.push('    class ' + c0 + ' { constructor(seed) { this.seed = seed; this.slots = new Map(); } put(k, v) { this.slots.set(k, v); return this; } get(k) { return this.slots.get(k); } }');
  L.push('    class ' + c1 + ' extends ' + c0 + ' { constructor(seed) { super(seed); this.depth = 0; } descend() { this.depth++; return this.depth; } }');
  L.push('    class ' + c2 + ' extends ' + c1 + ' { constructor(seed) { super(seed); this.marks = []; } mark(x) { this.marks.push(x); return this; } }');

  // Opaque guards: never true, but look computational.
  L.push('    if (typeof ' + c2 + ' === "function" && (0.1 + 0.2) === 0.3) { const x = new ' + c2 + '(7); x.descend(); x.mark("x"); }');
  L.push('    if ((0.1 + 0.2) === 0.3 && typeof ' + fnNames[0] + ' === "function") { ' + fnNames[0] + '("k", 1); }');

  // One lifeline that actually runs (harmless pure math) so the block has life.
  const seedv = nm('v', c++);
  const tick = nm('t', c++);
  L.push('    const ' + seedv + ' = (Date.now() & 65535) ^ 0x' + rhex(4) + ';');
  L.push('    const ' + tick + ' = ' + fnNames[1] + '(' + seedv + ' % 32 + 1).length;');
  L.push('    if (' + tick + ' >= 0 && ' + seedv + ' > -1) { ' + fnNames[6] + '(' + seedv + '); const q = new ' + c0 + '(' + seedv + ' % 255); q.put("k", ' + seedv + '); }');

  L.push('  })();');
  L.push('  // ── end auxiliary region ──');
  const block = L.join('\n');
  DECOY_BYTES = Buffer.byteLength(block);
  return block;
}

function replaceDecoys(out) {
  const DS = out.indexOf('  // ── generated auxiliary region');
  if (DS >= 0) {
    const DE = out.indexOf('  // ── end auxiliary region ──', DS);
    if (DE < 0) throw new Error('decoy end marker missing');
    const deEnd = out.indexOf('\n', DE);
    if (deEnd < 0) throw new Error('decoy end marker not on its own line');
    out = out.slice(0, DS) + out.slice(deEnd + 1);
  }
  const block = emitDecoys();
  const m = out.match(/(\n\}\)\(\);\s*)$/);
  if (!m) throw new Error('cannot locate final IIFE close for decoy insertion');
  out = out.slice(0, out.length - m[1].length) + '\n' + block + m[1];
  return out;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const id = SEED; // 8 hex chars doubles as instance id
let plan = planInstance();

// Flagship constraints on output shape
if (!PLAIN) {
  const guard = { tries: 0 };
  while (guard.tries++ < 500) {
    const c = {};
    plan.mech.forEach(m => { c[m] = (c[m] || 0) + 1; });
    const ok = c[0] >= 2 && c[1] >= 2 && c[2] >= 3 && c[3] >= 2;
    const poolN = plan.entries.filter(e => e.pool).length;
    if (ok && poolN >= 8 && poolN <= 15) break;
    plan = planInstance();
  }
  if (guard.tries >= 500) throw new Error('could not satisfy flagship constraints');
}

const region = emitRegion(plan, id);
const { head, tail } = cutRegion(template);

// Bump the template's suite token in head/tail only — the emitted region is
// already stamped with nextSuite (whole-string bump would double it, e.g.
// O.8.4.1 -> O.8.4.1.1 inside the region's own header comment).
let out = head.split(suiteM[1]).join(nextSuite) + region + tail.split(suiteM[1]).join(nextSuite);

// Head invariants (QoL): console.clear first, INSTANCE_ID const, version-first log.
out = applyHead(out, id);

// Legacy banner phrase (J-4-era templates only): tolerant swap, no throw.
out = out.split('Juggler decode (env-matrix + embedded fallback, coverage-logged)')
         .join(`Juggler decode (metamorphic instance ${id})`);

// [J-7] Diagnostic prefix: O7-era logger tag -> current era.
out = out.split('[O7-DIAG]').join('[O8-DIAG]');

// [J-7] MemberCount red-herring encapsulation (idempotent; skipped once marked).
out = encapsulateMemberCount(out);

// [J-7] Decoy noise block: strip any previous block, emit a fresh one.
out = replaceDecoys(out);

// sanity: no env-matrix residue, no stale version token
if (/env|GLOBAL_ENV|embedded fallback/i.test(out.replace(/\/\/.*$/gm, ''))) {
  const lines = out.split('\n').filter((l, i) => /env|GLOBAL_ENV|embedded fallback/i.test(l.replace(/\/\/.*$/, '')) && !/\/\/ ── end juggler decode/.test(l));
  if (lines.length) throw new Error('env residue remains:\n' + lines.slice(0, 5).join('\n'));
}

// [O8.4] Output-only per-instance identifier rotation (neutral helper tokens only;
// the Google* codename/cheat-code layer is never rotated). Global word-boundary
// replace (lookbehind/ahead, no \b escapes). Verified safe: none of the tokens
// occur inside string literals or comments in the template payload.
function rotateIdentifiers(o) {
  const TOKENS = ['recordDelay', 'sanitizePath', 'extractHttpProgress', 'findTaskConfig', 'registerCleanup', 'activeTasks', 'sleep', 'maybeRest'];
  const map = {};
  for (const t of TOKENS) {
    let c;
    do { c = '_0x' + randInt(0x10000).toString(16).padStart(4, '0'); } while (o.includes(c) || Object.values(map).includes(c));
    map[t] = c;
  }
  const re = new RegExp('(?<![A-Za-z0-9_$])(' + TOKENS.join('|') + ')(?![A-Za-z0-9_$])', 'g');
  const out2 = o.replace(re, m => map[m]);
  ROTATED = map;
  return out2;
}
let ROTATED = null;

const finalName = OUT || nextSuite.replace('.', '') + '.js';
out = rotateIdentifiers(out);
fs.writeFileSync(finalName, out);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const mechNames = plan.order.map(m => KIND[m]);
const counts = {};
plan.mech.forEach(m => { counts[KIND[m]] = (counts[KIND[m]] || 0) + 1; });
const poolNames = plan.entries.filter(e => e.pool).map(e => e.name);
console.log('--- instance report ---');
console.log('suite      :', nextSuite);
console.log('file       :', finalName);
console.log('seed       :', id);
console.log('template   :', TPL);
console.log('bytes      :', Buffer.byteLength(out), 'raw  -> deflate', require('zlib').deflateRawSync(Buffer.from(out)).length);
console.log('method idx order (xor/add/rot/tbl):', JSON.stringify(mechNames));
console.log('mechanism counts:', JSON.stringify(counts));
console.log('pool strings :', poolNames.length, JSON.stringify(poolNames));
console.log('pool bytes   :', plan.poolBytes.length);
console.log('decoy bytes  :', DECOY_BYTES);
console.log('mc region    :', out.includes('// ── client-state readout region') ? 'marked/encoded' : 'UNMARKED');
console.log('rotated idents:', ROTATED ? Object.keys(ROTATED).length + ' (' + JSON.stringify(Object.values(ROTATED)) + ')' : 'none');
