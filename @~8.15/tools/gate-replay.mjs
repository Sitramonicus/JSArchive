#!/usr/bin/env node
/**
 * gate-replay.mjs — offline replay of the SHIPPED passphrase gate (shard-u + shard-a), with a
 * virtual clock AND virtual timers, so the 2-minute window and the cover-face fallback can be
 * exercised in milliseconds.
 *
 * Modes
 *   (default)        full slot matrix at chosen elapsed times        --times 5,180
 *   --seq            one session, five slots in order
 *   --spec           the operator's acceptance table (2026-09-21 scenario) with PASS/FAIL
 *
 * Secrets policy: the five slots are NEVER literals here. Pass them on argv:
 *   node tools/gate-replay.mjs <pwdRcd> <pwdDbg> <pwdRes> <pwdAK> <pwdView> [--spec]
 * Output prints slot names + verdicts only, never the passphrase text.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SHARD_DIR = path.join(ROOT, 'Active/O8.14/CC-33/shards');
const STAFF = '\u4f50\u85e4 \u7d50\u8863';           // staff name, as declared by the runner
const COVER = 'Pixel Garden v2.0';

const argv = process.argv.slice(2);
const timesIdx = argv.indexOf('--times');
const times = timesIdx >= 0 ? argv[timesIdx + 1].split(',').map(Number) : [5, 180];
const flags = argv.filter((a) => a.startsWith('--'));
const timesValIdx = timesIdx >= 0 ? timesIdx + 1 : -1;
const slots = argv.filter((a, i) => !a.startsWith('--') && i !== timesValIdx);
const NAMES = ['pwdRcd', 'pwdDbg', 'pwdRes', 'pwdAK', 'pwdView'];
if (slots.length < 5) {
  console.error('usage: node tools/gate-replay.mjs <pwdRcd> <pwdDbg> <pwdRes> <pwdAK> <pwdView> [--spec|--seq|--times 5,180]');
  process.exit(2);
}

/* ---------- virtual clock: Date + setTimeout both honour the offset ---------- */
function makeClock() {
  let offset = 0, seq = 1;
  const timers = [];
  class VDate extends Date {
    constructor(...a) { if (a.length === 0) super(Date.now() + offset); else super(...a); }
    static now() { return Date.now() + offset; }
  }
  const setTimeoutV = (fn, ms) => { const id = seq++; timers.push({ id, at: offset + (Number(ms) || 0), fn, dead: false }); return id; };
  const clearTimeoutV = (id) => { const t = timers.find((x) => x.id === id); if (t) t.dead = true; };
  const advance = (ms) => {
    offset += ms;
    for (;;) {
      const due = timers.filter((t) => !t.dead && t.at <= offset).sort((a, b) => a.at - b.at);
      if (!due.length) break;
      due[0].dead = true;
      try { due[0].fn(); } catch (e) { /* timer body guards itself */ }
    }
  };
  return { VDate, setTimeoutV, clearTimeoutV, advance };
}

/* ---------- boot one isolated instance of the real gate ---------- */
function boot(opts = {}) {
  const log = [];
  const clock = makeClock();
  const sandbox = {
    Date: clock.VDate, Math, JSON, String, Number, Array, Object, Promise, Uint8Array, Proxy, Reflect,
    TextEncoder, setTimeout: clock.setTimeoutV, clearTimeout: clock.clearTimeoutV,
    console: {
      debug: (...a) => log.push(a.join(' ')),
      warn: (...a) => log.push(a.join(' ')),
      log: (...a) => log.push(a.join(' ')),
      error: (...a) => log.push(a.join(' ')),
      info: (...a) => log.push(a.join(' ')),
    },
    crypto: { subtle: crypto.webcrypto.subtle },
  };
  sandbox.globalThis = sandbox;
  sandbox.window = sandbox;
  sandbox.navigator = { userAgent: 'gate-replay', languages: ['en'] };
  sandbox.document = { createElement: () => ({ style: {} }), addEventListener: () => {} };
  sandbox.location = { origin: 'https://example.invalid', href: 'https://example.invalid/' };
  if (opts.name !== undefined) sandbox['\u540d'] = opts.name;        // runner's 名
  if (opts.kaikan !== undefined) sandbox['\u4f1a\u54e1'] = opts.kaikan; // runner's 会員
  const ctx = vm.createContext(sandbox);

  const _0xmod = { log: { say() {}, diag() {}, warn() {}, info() {}, queue() {}, flush() {} } };
  sandbox._0xmod = _0xmod;
  for (const f of ['shard-a.js', 'shard-u.js']) {                    // stitch order
    vm.runInContext(fs.readFileSync(path.join(SHARD_DIR, f), 'utf8'), ctx, { filename: f, timeout: 10000 });
  }
  return { sandbox, _0xmod, log, clock };
}

const fnv = (s) => { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h >>> 0; };
const hx = (n) => n.toString(16).padStart(8, '0');
const RCD_HASH = 0xb5546f18, DBG_HASH = 0xe79dbcf6;

/* ---------- shared probes ---------- */
function probeSink(inst) {                 // diag lines only print at 会員>=2 && _0xopen && !cover
  const before = inst.log.length;
  try { inst._0xmod.log.diag('probe', {}); } catch (e) {}
  return inst.log.length > before;
}
function probeTag(inst) {                  // say is unconditional unless 会員===0 or cover is up
  const before = inst.log.length;
  try { inst._0xmod.log.say('Probe', 'tag check'); } catch (e) {}
  return inst.log.length > before;
}
const sawCover = (inst) => inst.log.some((l) => l.includes(COVER));
const gateOf = (inst) => inst._0xmod._rcdGate || {};

/* =========================== --stall-trace: what the console shows =========================== */
if (flags.includes('--stall-trace')) {
  const i = boot({ name: STAFF });
  i.clock.advance(0);
  console.log('--- t+0..2 s: what appears immediately ---');
  for (const l of i.log) console.log('   ' + l.slice(0, 150));
  i.log.length = 0;
  i.clock.advance(120000);
  console.log('--- window closes at t+120 s: what a decoder would have seen (all lines) ---');
  for (const l of i.log) console.log('   ' + l.slice(0, 150));
  console.log('--- after the window: entry point present? ---');
  console.log('   GoogleUblock: ' + ('GoogleUblock' in i.sandbox ? 'present' : 'gone'));
  process.exit(0);
}

/* =========================== --spec: the operator's table =========================== */
if (flags.includes('--spec')) {
  const [RCD, DBG, RES, AK, VIEW] = slots;
  const rows = [];
  const add = (id, desc, got, want) => rows.push({ id, desc, got, want, ok: got === want });

  // S1 — staff name, nobody unlocks: cover at the window, identity silent afterwards
  {
    const i = boot({ name: STAFF });
    i.clock.advance(119000);
    const tagBefore = probeTag(i), sinkBefore = probeSink(i);
    i.clock.advance(2000);                                   // crosses 120 s
    const cover = sawCover(i);
    const tagAfter = probeTag(i), sinkAfter = probeSink(i);
    // Under the stall the identity is hidden DURING the window too (that is the point: no two-minute
    // free trial), so `tagBefore` must now be false while the welcome is visible.
    const welcomed = i.log.some((l) => l.includes('Pixel Garden Player'));
    add('S1', '名=staff, no unlock → welcome during, cover+garden at 120 s, identity silent', `${cover}/${welcomed}/${tagBefore}→${tagAfter}`, 'true/true/false→false');
    add('S1b', '   …and the diag sink is closed after the flip', String(sinkAfter), 'false');
    add('S1c', '   …and the entry point is off `window` (teardown ran)', String(typeof i.sandbox.window.GoogleUblock !== 'function'), 'true');
    void sinkBefore;
  }
  // S2/S3 — pre-set slots: no cover, session stays unlocked past the window
  {
    const i2 = boot({ name: RCD });
    i2.clock.advance(121000);
    add('S2', '名=pwdRcd (pre-set) → no cover; level 1; sink OPEN', `${gateOf(i2).level?.()}/${!sawCover(i2)}/${probeSink(i2)}`, '1/true/true');
    const i3 = boot({ name: DBG });
    i3.clock.advance(121000);
    add('S3', '名=pwdDbg (pre-set) → no cover; level 2; sink OPEN', `${gateOf(i3).level?.()}/${!sawCover(i3)}/${probeSink(i3)}`, '2/true/true');
  }
  // S4 — a verb in 名 is not a key
  {
    const i4 = boot({ name: AK });
    i4.clock.advance(121000);
    add('S4', '名=pwdAK → cover (verbs never unlock)', `${sawCover(i4)}/lvl${gateOf(i4).level?.()}`, 'true/lvl0');
  }
  // S5 — unlock just inside the window
  {
    const i5 = boot({ name: STAFF });
    i5.clock.advance(119000);
    let ret = null; try { ret = await i5.sandbox.window.GoogleUblock(RCD); } catch (e) {}
    i5.clock.advance(3000);                                  // window passes; flags set in time
    add('S5', 'unlock at 119 s → no cover at 121 s', `${ret}/cover:${sawCover(i5)}`, 'true/cover:false');
  }
  // S6 — unlock after the window
  {
    const i6 = boot({ name: STAFF });
    i6.clock.advance(121000);
    let ret = 'gone';
    try { if (typeof i6.sandbox.window.GoogleUblock === 'function') ret = await i6.sandbox.window.GoogleUblock(RCD); } catch (e) { ret = 'gone'; }
    add('S6', 'unlock at 121 s → entry gone (torn down), cover shown', `${ret}/cover:${sawCover(i6)}`, 'gone/cover:true');
  }
  // S7 — verbs work once a slot is pre-set
  {
    const i7 = boot({ name: DBG });
    let r = [];
    for (const s of [RES, AK, VIEW]) { try { r.push(await i7.sandbox.window.GoogleUblock(s)); } catch (e) { r.push('ERR'); } }
    add('S7', 'pre-set pwdDbg → res/ak/view all true', r.join(','), 'true,true,true');
  }
  // S8 — 会員 = 0 silences everything, cover included
  {
    const i8 = boot({ name: STAFF, kaikan: 0 });
    i8.clock.advance(121000);
    probeTag(i8); probeSink(i8);
    add('S8', '会員=0 → total silence (no cover, no tags)', `${i8.log.length} line(s)`, '0 line(s)');
  }

  // S9 — a claimed session must NOT go dead after the window (operator 2026-09-21: "make sure that
  // normal users (normal or debugger) will not have that dead machine state given that they've provided
  // what's needed"). Level, sink, tags and the entry point must all still be there long after 120 s.
  {
    const i9 = boot({ name: DBG });
    i9.clock.advance(300000);                       // five minutes in
    const g = gateOf(i9);
    const tagsAlive = probeTag(i9), sinkAlive = probeSink(i9);
    const entryAlive = typeof i9.sandbox.window.GoogleUblock === 'function';
    let upgrade = null; try { upgrade = await i9.sandbox.window.GoogleUblock(RES); } catch (e) { upgrade = 'ERR'; }
    add('S9', 'claimed session at 300 s → alive (level/sink/tags/entry) + verbs work',
      `lvl${g.level ? g.level() : '?'}/${sinkAlive}/${tagsAlive}/${entryAlive}/${upgrade}`,
      'lvl2/true/true/true/true');
  }
  // S10 — the stall: unclaimed session shows the Player welcome and NOTHING else of ours, and the
  // garden appears only after the window.
  {
    const i10 = boot({ name: STAFF });
    i10.clock.advance(0);
    const welcome = i10.log.some((l) => l.includes('Pixel Garden Player'));
    const host = i10.log.some((l) => /\[Host 8\.14\] initialized/.test(l));   // emitter prefixes a timestamp

    const machineryDuringStall = i10.log.some((l) => /\[Google /.test(l) && !/\[Google diag\]/.test(l));
    const gardenBefore = sawCover(i10);
    i10.clock.advance(121000);
    const gardenAfter = sawCover(i10) && i10.log.some((l) => /^gen \d+ — \d+ sprouts/.test(l));
    add('S10', 'unclaimed: welcome + Host banner, no machinery during the window, garden after',
      `welcome:${welcome}/host:${host}/machinery:${machineryDuringStall}/before:${gardenBefore}/after:${gardenAfter}`,
      'welcome:true/host:true/machinery:false/before:false/after:true');
    // S10c -- the two lines the operator's own trace kept must survive the stall: the Host banner and
    // the MemberCount summary (which the machinery shards emit through this same sink).
    {
      const i10c = boot({ name: STAFF });
      i10c.clock.advance(0);
      const before10c = i10c.log.length;
      try { i10c._0xmod.log.info('[MemberCount] No member statistics available yet.'); } catch (e) {}
      const mcThrough = i10c.log.length > before10c && i10c.log.some((l) => /\[MemberCount\]/.test(l));
      const hostThrough = i10c.log.some((l) => /\[Host 8\.14\] initialized/.test(l));
      const otherBlocked = !i10c.log.some((l) => /\[Google Catalog\]/.test(l));
      try { i10c._0xmod.log.say('Catalog', 'should be held back'); } catch (e) {}
      const sayBlocked = !i10c.log.some((l) => /should be held back/.test(l));
      add('S10c', 'allowlist: Host + MemberCount pass the stall, machinery tags do not',
        `membercount:${mcThrough}/host:${hostThrough}/sayBlocked:${sayBlocked}/${otherBlocked}`,
        'membercount:true/host:true/sayBlocked:true/true');
    }
    // S11 -- the WORK HOLD key. The stall hides our logs; this is the other half of the same ruling
    // ("they shouldn't have any access at all to the services"): the venue-call wrapper in shard-e2
    // asks `_0xmod._stallHeld()` before every call, and it must be true exactly while no claim has
    // landed. Checked against the real shard-a code, in all four states that matter.
    {
      const i11a = boot({ name: STAFF });                       // unclaimed
      i11a.clock.advance(0);
      const heldUnclaimed = i11a._0xmod._stallHeld() === true;
      const i11b = boot({ name: STAFF });                       // claimed in-window
      i11b.clock.advance(1000);                                 // let the boot timers settle first
      let claimedRet = null; try { claimedRet = await i11b.sandbox.window.GoogleUblock(RCD); } catch (e) { claimedRet = 'ERR'; }
      // the claim must not leave a global behind: that was the symptom of the out-of-closure write
      const leaked = ('_0xstall' in i11b.sandbox) || ('_0xopen' in i11b.sandbox);
      const heldAfterClaim = i11b._0xmod._stallHeld() === true;
      const i11c = boot({ name: RCD });                         // pre-set claim
      i11c.clock.advance(0);
      const heldPreSet = i11c._0xmod._stallHeld() === true;
      const i11d = boot({ name: STAFF });                       // unclaimed, window over
      i11d.clock.advance(121000);
      const heldAfterWindow = i11d._0xmod._stallHeld() === true;
      add('S11', 'work hold: venue calls blocked exactly while unclaimed',
        `unclaimed:${heldUnclaimed}/afterClaim:${heldAfterClaim}/accepted:${claimedRet === true}/preSet:${heldPreSet}/afterWindow:${heldAfterWindow}/leak:${leaked}`,
        'unclaimed:true/afterClaim:false/accepted:true/preSet:false/afterWindow:true/leak:false');
    }
    // S12 -- the entry point's LIFETIME (operator report 2026-09-21). Two halves:
    //   a) a benign stand-down inside the machinery must NOT take the claim surface away: the entry
    //      point lives as long as the window does, so a paste after a console clear is not punished
    //      for the chain having nothing to do;
    //   b) a session must only ever remove ITS OWN entry point. Here a foreign entry is planted (the
    //      shape a newer paste leaves) and the window expiry is allowed to fire -- the foreign entry
    //      must survive, and the superseded session must stay silent instead of painting its garden.
    {
      const i12 = boot({ name: STAFF });
      i12.clock.advance(0);
      const before12 = typeof i12.sandbox.window.GoogleUblock === 'function';
      try { i12._0xmod._standDown('gate-test'); } catch (e) {}
      const afterStandDown = typeof i12.sandbox.window.GoogleUblock === 'function';
      add('S12a', 'benign stand-down keeps the entry point (claim surface lives with the window)',
        `before:${before12}/afterStandDown:${afterStandDown}`, 'before:true/afterStandDown:true');
      // plant a foreign entry point, exactly as a later paste would
      const FOREIGN = () => 'not-ours';
      i12.sandbox.window.GoogleUblock = FOREIGN;
      i12.log.length = 0;
      i12.clock.advance(121000);                    // the window expires for the OLD session
      const foreignSurvived = i12.sandbox.window.GoogleUblock === FOREIGN;
      const staleSilent = !i12.log.some((l) => /Pixel Garden v2\.0/.test(l));
      add('S12b', 'a superseded session neither deletes a newer entry point nor paints its garden',
        `foreignSurvived:${foreignSurvived}/staleSilent:${staleSilent}`, 'foreignSurvived:true/staleSilent:true');
    }
    // S10b -- the unclaimed session is not merely quiet, it is DEAD (operator ruling 2026-09-21):
    // after the window the entry point is off `window` and the gate has no claim on it.
    const entryGone10 = !('GoogleUblock' in i10.sandbox);
    add('S10b', 'unclaimed end: entry point off window (machinery torn down)',
      `entry:${entryGone10 ? 'gone' : 'present'}`, 'entry:gone');
  }

  console.log('gate-replay --spec  — operator acceptance table (2026-09-21 scenario)\n');
  let pass = 0;
  for (const r of rows) {
    console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.id.padEnd(4)} ${r.desc}`);
    if (!r.ok) console.log(`         got: ${r.got}   want: ${r.want}`);
    pass += r.ok ? 1 : 0;
  }
  console.log(`\n${pass}/${rows.length} checks pass`);
  process.exit(pass === rows.length ? 0 : 1);
}

/* =========================== default / --seq modes =========================== */
console.log('gate-replay  — real shard-u + shard-a, virtual clock');
console.log('slot     FNV-1a     FNV slot consumed by _0xcheckMain');
for (const [i, name] of NAMES.entries()) {
  const f = fnv(slots[i]);
  const hit = f === RCD_HASH ? 'rcd  (_0xRcdHash)' : f === DBG_HASH ? 'dbg  (_0xDbgHash)' : '-    (not an FNV slot; SHA-256 poly path only)';
  console.log(name.padEnd(8), hx(f), ' ', hit);
}
console.log();

if (flags.includes('--seq')) {
  const i = boot();
  console.log('  t(s)  slot     returned  level  dbgOK  rcdOK   diag-sink  cover');
  for (const t of times) {
    for (const [k, name] of NAMES.entries()) {
      i.clock.advance(k === 0 ? t * 1000 : 0);
      let ret = null;
      try { ret = await i.sandbox.window.GoogleUblock(slots[k]); } catch (e) { ret = 'ERR'; }
      const g = gateOf(i);
      console.log(String(t).padStart(5), ' ', name.padEnd(8), String(ret).padEnd(9), String(g.level?.()).padEnd(6),
        String(g.dbgOK).padEnd(6), String(g.rcdOK).padEnd(6), probeSink(i) ? 'OPEN      ' : 'closed    ', sawCover(i));
    }
  }
  process.exit(0);
}

const rows = [];
for (const t of times) {
  for (const [k, name] of NAMES.entries()) {
    const i = boot();
    i.clock.advance(t * 1000);
    let ret = null, err = null;
    try { ret = await i.sandbox.window.GoogleUblock(slots[k]); } catch (e) { err = String((e && e.message) || e); }
    const g = gateOf(i);
    rows.push({ t, name, ret, err, level: g.level ? g.level() : null, dbgOK: g.dbgOK, rcdOK: g.rcdOK, sink: probeSink(i), tag: probeTag(i), cover: sawCover(i) });
  }
}
console.log('  t(s)  slot     returned  level  dbgOK  rcdOK   diag-sink  tag');
for (const r of rows) {
  console.log(String(r.t).padStart(5), ' ', r.name.padEnd(8), String(r.ret).padEnd(9), String(r.level).padEnd(6),
    String(r.dbgOK).padEnd(6), String(r.rcdOK).padEnd(6), (r.sink ? 'OPEN' : 'closed').padEnd(10), r.tag ? 'shown' : 'hidden',
    r.err ? '  ERR:' + r.err : '');
}
console.log('\nlegend: diag-sink = [Google diag] lines reach the console (会員>=2 && _0xopen && face up);');
console.log('        tag = [Google <channel>] line from Log.say. Past the 2-minute window an unlocked-nothing');
console.log('        session flips to the cover face and both go quiet by design.');
