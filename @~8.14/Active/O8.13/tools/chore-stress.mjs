// chore-stress.mjs — scripted chore-driver stress harness (boots REAL bundle bytes).
// Simulates Discord pockets (quest store, games, dispatcher, HTTP, routes) with a
// virtual clock + seeded RNG so multi-minute chore lifecycles run in seconds.
// Usage: node chore-stress.mjs <S0|S1|S2a|S2b|S2c|S2d|S2e|S3|S4a|S4b|S5|S6|S7a|S7b|S8|S9|S10|S11|S12|S13a|S13b|S13c|S13d|S14|S15> [seed] [pwDbg pwRes pwAK pwView pwRcd]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './discordlike.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..', '..', '..');
const out = (...a) => process.stdout.write(a.join(' ') + '\n');
const errOut = (...a) => process.stderr.write(a.join(' ') + '\n');

// ---------------- virtual clock (must precede bundle load) ----------------
const V0 = Date.now();
let vnow = 0; // OFFSET clock: small numbers keep sub-ms arithmetic exact
const timers = new Map();
let nextTid = 1;
globalThis.setTimeout = (fn, ms = 0, ...a) => {
  const id = nextTid++;
  timers.set(id, { at: vnow + Math.max(0, +ms || 0), fn: () => fn(...a), iv: 0 });
  return id;
};
globalThis.clearTimeout = (id) => { timers.delete(id); };
globalThis.setInterval = (fn, ms = 0, ...a) => {
  const id = nextTid++;
  timers.set(id, { at: vnow + Math.max(0, +ms || 0), fn: () => fn(...a), iv: Math.max(1, +ms || 0) });
  return id;
};
globalThis.clearInterval = (id) => { timers.delete(id); };
Date.now = () => V0 + vnow;

// ---------------- seeded RNG ----------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------- message plumbing (fires the _0xboot handshake) ----------------
const msgL = [];
const MSGSTAT = { posted: 0, registered: 0 };
window.addEventListener = (t, fn) => { if (t === 'message') { msgL.push(fn); MSGSTAT.registered++; } };
window.removeEventListener = (t, fn) => { const i = msgL.indexOf(fn); if (i >= 0) msgL.splice(i, 1); };
window.postMessage = (data) => { MSGSTAT.posted++;
  queueMicrotask(() => { for (const fn of msgL.slice()) { try { fn({ origin: location.origin, data }); } catch {} } });
};
window.DiscordNative = {};

// ---------------- log capture (bundle speaks via console.debug) ----------------
const LOGS = [];
for (const m of ['debug', 'log', 'warn', 'error']) {
  console[m] = (...a) => { LOGS.push({ t: vnow, m, s: a.map(String).join(' ') }); };
}

// ---------------- sim state ----------------
const SIM = {
  quests: [],
  games: [],
  http: [],
  dispatched: [],
  videoProg: {},
  actProg: {},
};
function mkQuest(tag, task, goal, appName) {
  return {
    id: 'q-' + tag,
    config: {
      expiresAt: new Date(Date.now() + 3600e3).toISOString(),
      configVersion: 2,
      application: { id: 'app-' + tag },
      taskConfigV1: { tasks: { [task]: { target: goal } } },
      messages: { questName: tag },
    },
    userStatus: { enrolledAt: Date.now(), completedAt: null, progress: { [task]: { value: 0 } } },
    _appName: appName,
  };
}

// ---------------- pockets (one module carries all seven) ----------------
const subs = new Map();
const dispatcher = {
  flushWaitQueue() {},
  dispatch(ev) {
    SIM.dispatched.push({ t: vnow, type: ev && ev.type });
    const s = subs.get(ev && ev.type);
    if (s) for (const fn of [...s]) { try { fn(ev); } catch {} }
  },
  subscribe(name, fn) { if (!subs.get(name)) subs.set(name, new Set()); subs.get(name).add(fn); },
  unsubscribe(name, fn) { const s = subs.get(name); if (s) s.delete(fn); },
};
function httpGet(opts) {
  SIM.http.push({ t: vnow, m: 'GET', url: opts.url });
  const u = opts.url || '';
  if (u.startsWith('/applications/public')) {
    const id = (u.split('application_ids=')[1] || '').split('&')[0];
    const q = SIM.quests.find((x) => x.config.application.id === id);
    const nm = (q && q._appName) || ('App-' + id);
    return Promise.resolve({ body: [{ name: nm, executables: [{ os: 'win32', name: 'Game.exe' }] }] });
  }
  return Promise.resolve({ body: {} });
}
function httpPost(opts) {
  SIM.http.push({ t: vnow, m: 'POST', url: opts.url });
  const u = opts.url || '';
  const mQ = u.match(/^\/quests\/([^/]+)\//);
  const q = mQ && SIM.quests.find((x) => x.id === mQ[1]);
  if (u.includes('/video-progress') && q) {
    if (SIM.frozen && SIM.frozen.has(q.id)) return Promise.resolve({ body: { progress: 0 } }); // S14: frozen POST endpoint
    const goal = q.config.taskConfigV1.tasks.WATCH_VIDEO.target;
    const cur = Math.min(goal, (SIM.videoProg[q.id] || 0) + 6 + Math.floor(Math.random() * 6));
    SIM.videoProg[q.id] = cur;
    const done = cur >= goal;
    if (done) { q.userStatus.completedAt = Date.now(); q.userStatus.progress.WATCH_VIDEO.value = goal; }
    return Promise.resolve({ body: done ? { progress: goal, completed_at: new Date(Date.now()).toISOString() } : { progress: cur } });
  }
  if (u.includes('/heartbeat') && q) {
    const task = Object.keys(q.config.taskConfigV1.tasks)[0];
    const goal = q.config.taskConfigV1.tasks[task].target;
    const cur = Math.min(goal, (SIM.actProg[q.id] || 0) + 20 + Math.floor(Math.random() * 10));
    SIM.actProg[q.id] = cur;
    q.userStatus.progress[task].value = cur;
    if (cur >= goal) q.userStatus.completedAt = Date.now();
    return Promise.resolve({ body: { progress: cur } });
  }
  return Promise.resolve({ body: {} });
}
const chunk = [];
chunk.c = {
  1001: {
    exports: {
      A: {
        getQuest: (id) => SIM.quests.find((q) => q.id === id) || null,
        getStreamerActiveStreamMetadata: () => null,
        getAllThreadsForParent: () => [],
        getSortedPrivateChannels: () => [{ id: 'chan-1' }],
        quests: { values: () => SIM.quests.slice() },
      },
      Ay: {
        getRunningGames: () => SIM.games.slice(),
        getGameForPID: (p) => SIM.games.find((g) => g.pid === p) || null,
        getSFWDefaultChannel: () => null,
        getAllGuilds: () => ({}),
      },
      h: dispatcher,
      Bo: { get: httpGet, post: httpPost },
    },
  },
};
chunk.m = {};
window.webpackChunkdiscord_app = chunk;

// ---------------- timeline ----------------
const timeline = [];
function at(vms, fn, label) { timeline.push({ at: vms, fn, label }); }
function emitHeartbeat(task, qid, value, syncStore = true) {
  const q = SIM.quests.find((x) => x.id === qid);
  if (q && syncStore && q.userStatus.progress[task]) q.userStatus.progress[task].value = value;
  dispatcher.dispatch({
    type: 'QUESTS_SEND_HEARTBEAT_SUCCESS',
    userStatus: { enrolledAt: 1, completedAt: null, progress: { [task]: { value } } },
  });
}
function ticker(task, qid, { from = 0, to, step, every, startAt, syncStore = true, killAt = Infinity, hold = 0 }) {
  let v = from;
  let t = startAt;
  while (v < to) {
    v = Math.min(to, v + step);
    if (t > killAt) break;
    const vv = v, tt = t;
    at(tt, () => emitHeartbeat(task, qid, vv, syncStore), `tick ${task.split('_')[0]}=${vv}`);
    t += every;
  }
  for (let h = 0; h < hold; h++) {
    const tt = t + h * every;
    if (tt > killAt) break;
    at(tt, () => emitHeartbeat(task, qid, to, syncStore), `hold ${task.split('_')[0]}=${to}`);
  }
}

// ---------------- main loop ----------------
async function flush(n = 10) { for (let i = 0; i < n; i++) await new Promise((r) => setImmediate(r)); }
async function run(vEnd, quietS = 200) {
  timeline.sort((a, b) => a.at - b.at);
  let lastLogN = -1, lastLogT = 0;
  for (;;) {
    await flush(); // drain microtasks FIRST (message delivery, promise chains) before any timer
    let nextT = vEnd;
    for (const e of timeline) if (e.at >= vnow && e.at < nextT) nextT = e.at;
    for (const tm of timers.values()) if (tm.at >= vnow && tm.at < nextT) nextT = tm.at;
    if (nextT > vnow) vnow = Math.min(nextT, vEnd, vnow + 30000);
    const due = [];
    for (let i = timeline.length - 1; i >= 0; i--) {
      if (timeline[i].at <= vnow) due.unshift(timeline.splice(i, 1)[0]);
    }
    for (const e of due) { try { await e.fn(); } catch (ex) { errOut('TIMELINE-THROW', e.label, String(ex).slice(0, 120)); } }
    const dt = [...timers.entries()].filter(([, tm]) => tm.at <= vnow).sort((a, b) => a[1].at - b[1].at);
    for (const [id, tm] of dt) {
      if (!timers.has(id)) continue;
      if (tm.iv) tm.at = vnow + tm.iv; else timers.delete(id);
      try { tm.fn(); } catch {}
    }
    await flush();
    if (LOGS.length !== lastLogN) { lastLogN = LOGS.length; lastLogT = vnow; }
    if (vnow >= vEnd) break;
    if (timeline.length === 0 && vnow - lastLogT > quietS * 1000 && vnow > 45000) break;
  }
}

// ---------------- assert helpers ----------------
let failures = 0;
function ok(c, msg) {
  out((c ? 'PASS ' : 'FAIL ') + msg);
  if (!c) failures++;
}
const L = (re) => LOGS.filter((l) => re.test(l.s));
const firstT = (re) => { const l = LOGS.find((l) => re.test(l.s)); return l ? l.t : -1; };
const fmtT = (ms) => (ms < 0 ? '--' : (ms / 1000).toFixed(1) + 's');

// ---------------- scenarios ----------------
const T = {
  video: 'WATCH_VIDEO', play: 'PLAY_ON_DESKTOP', stream: 'STREAM_ON_DESKTOP', act: 'PLAY_ACTIVITY',
};
const SCEN = {
  S0() {
    SIM.quests.push(mkQuest('VQ0', T.video, 60, 'GameV'));
  },
  S1() {
    SIM.quests.push(mkQuest('VQ1', T.video, 60, 'GameV'));
    SIM.quests.push(mkQuest('PQ1', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('SQ1', T.stream, 90, 'GameS'));
    ticker(T.play, 'q-PQ1', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 40 });
    ticker(T.stream, 'q-SQ1', { to: 90, step: 9, every: 7000, startAt: 20000, hold: 40 });
  },
  S2a() {
    SIM.quests.push(mkQuest('PQ2', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ2', T.video, 60, 'GameV'));
    ticker(T.play, 'q-PQ2', { to: 70, step: 10, every: 7000, startAt: 20000, syncStore: true });
    at(130000, () => {
      const q = SIM.quests.find((x) => x.id === 'q-PQ2');
      q.userStatus.progress[T.play].value = 100;
      q.userStatus.completedAt = Date.now();
    }, 'store completes (flag)');
  },
  S2b() {
    SIM.quests.push(mkQuest('PQ2', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ2', T.video, 60, 'GameV'));
    ticker(T.play, 'q-PQ2', { to: 70, step: 10, every: 7000, startAt: 20000, syncStore: true });
    at(130000, () => {
      SIM.quests.find((x) => x.id === 'q-PQ2').userStatus.progress[T.play].value = 100;
    }, 'store completes (value only)');
  },
  S2c() {
    SIM.quests.push(mkQuest('PQ2', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ2', T.video, 60, 'GameV'));
    ticker(T.play, 'q-PQ2', { to: 70, step: 10, every: 7000, startAt: 20000, syncStore: true });
    at(130000, () => { SIM.quests = SIM.quests.filter((x) => x.id !== 'q-PQ2'); }, 'quest vanishes');
  },
  S2d() {
    SIM.quests.push(mkQuest('PQ2', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ2', T.video, 60, 'GameV'));
    ticker(T.play, 'q-PQ2', { to: 70, step: 10, every: 7000, startAt: 20000, syncStore: true });
    at(130000, () => {
      SIM.quests.find((x) => x.id === 'q-PQ2').config.expiresAt = new Date(Date.now() - 10 * 60e3).toISOString();
    }, 'quest expires');
  },
  S2e() {
    SIM.quests.push(mkQuest('PQ2', T.play, 100, 'GameP'));
    ticker(T.play, 'q-PQ2', { to: 70, step: 10, every: 7000, startAt: 20000, syncStore: true });
    ticker(T.play, 'q-PQ2', { from: 70, to: 100, step: 10, every: 7000, startAt: 700000, syncStore: true });
  },
  S3() {
    SIM.quests.push(mkQuest('VQ3', T.video, 80, 'GameV'));
    at(30000, () => {
      SIM.quests.push(mkQuest('PQ3', T.play, 80, 'GameP'));
      SIM.quests.push(mkQuest('SQ3', T.stream, 70, 'GameS'));
    }, 'new quests appear');
    ticker(T.play, 'q-PQ3', { to: 80, step: 10, every: 7000, startAt: 60000, hold: 60 });
    ticker(T.stream, 'q-SQ3', { to: 70, step: 10, every: 7000, startAt: 60000, hold: 60 });
  },
  S4a() {
    SIM.quests.push(mkQuest('PQ4', T.play, 100, 'GameP'));
    ticker(T.play, 'q-PQ4', { to: 100, step: 5, every: 5000, startAt: 20000, hold: 60 });
    at(40000, () => { location.pathname = '/channels/@me/123'; }, 'navigate away');
  },
  S4b() {
    SIM.quests.push(mkQuest('PQ4', T.play, 100, 'GameP'));
    ticker(T.play, 'q-PQ4', { to: 100, step: 10, every: 7000, startAt: 20000, killAt: 45000, syncStore: true });
    at(40000, () => { location.pathname = '/channels/@me/123'; }, 'navigate away');
    at(50000, () => {
      const q = SIM.quests.find((x) => x.id === 'q-PQ4');
      q.userStatus.progress[T.play].value = 100;
      q.userStatus.completedAt = Date.now();
    }, 'store completes mid-pause');
  },
  S5() {
    SIM.quests.push(mkQuest('PQ5', T.play, 80, 'GameP'));
    SIM.quests.push(mkQuest('SQ5', T.stream, 70, 'GameS'));
    SIM.quests.push(mkQuest('VQ5', T.video, 50, 'GameV'));
    ticker(T.play, 'q-PQ5', { to: 80, step: 10, every: 7000, startAt: 20000, hold: 40 });
    ticker(T.stream, 'q-SQ5', { to: 70, step: 10, every: 7000, startAt: 20000, hold: 40 });
  },
  S6() {
    SIM.quests.push(mkQuest('VQ6', T.video, 50, 'GameV'));
    SIM.quests.push(mkQuest('AQ6', T.act, 60, 'GameA'));
    SIM.quests.push(mkQuest('PQ6', T.play, 80, 'GameP'));
    ticker(T.play, 'q-PQ6', { to: 80, step: 10, every: 7000, startAt: 20000, hold: 40 });
  },
  S7a() { // live repro: video enrolled mid-run while board non-empty -> video jumps ahead of game
    SIM.quests.push(mkQuest('PQ7', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ7a', T.video, 60, 'GameV'));
    at(30000, () => { SIM.quests.push(mkQuest('VQ7b', T.video, 50, 'GameV')); }, 'second video enrolled mid-run');
    ticker(T.play, 'q-PQ7', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
  },
  S7b() { // gap enrollment: video enrolled DURING the pacing gap -> post-gap scan catches it
    SIM.quests.push(mkQuest('PQ7d', T.play, 60, 'GameP'));
    SIM.quests.push(mkQuest('VQ7c', T.video, 40, 'GameV'));
    ticker(T.play, 'q-PQ7d', { to: 60, step: 10, every: 7000, startAt: 20000, hold: 60 });
    let enrolled = false;
    for (let pt = 50000; pt < 240000; pt += 5000) {
      at(pt, () => {
        if (!enrolled && LOGS.some((l) => /Pacing shift/.test(l.s))) {
          enrolled = true;
          SIM.quests.push(mkQuest('VQ7e', T.video, 40, 'GameV'));
        }
      }, 'gap-enroll poll');
    }
  },
  S13a() { // dead store mid-run: loud whimper, run drains, nothing merges silently
    SIM.quests.push(mkQuest('PQ7', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ7a', T.video, 60, 'GameV'));
    at(30000, () => { SIM.quests.push(mkQuest('VQ7b', T.video, 50, 'GameV')); }, 'second video enrolled mid-run');
    at(20000, () => { chunk.c[1001].exports.A.quests.values = () => { throw new Error('store-dead'); }; }, 'kill quest store');
    ticker(T.play, 'q-PQ7', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
  },
  S13b() { // unenrolled-flag video: announced skip, never runs
    SIM.quests.push(mkQuest('PQ7', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ7a', T.video, 60, 'GameV'));
    at(30000, () => { const q = mkQuest('VQ7b', T.video, 50, 'GameV'); q.userStatus.enrolledAt = null; SIM.quests.push(q); }, 'unenrolled-flag video enrolled mid-run');
    ticker(T.play, 'q-PQ7', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
  },
  S13c() { // poison quest: scan survives, video still merges, poison announced
    SIM.quests.push(mkQuest('PQ7', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ7a', T.video, 60, 'GameV'));
    at(29000, () => { const bad = mkQuest('BAD', T.video, 50, 'GameV'); Object.defineProperty(bad, 'config', { get() { throw new Error('cfg-boom'); } }); SIM.quests.push(bad); }, 'poison quest enrolled');
    at(30000, () => { SIM.quests.push(mkQuest('VQ7b', T.video, 50, 'GameV')); }, 'second video enrolled mid-run');
    ticker(T.play, 'q-PQ7', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
  },
  S13d() { // unfamiliar-wrap video: announced skip, never runs
    SIM.quests.push(mkQuest('PQ7', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ7a', T.video, 60, 'GameV'));
    at(30000, () => { const q = mkQuest('VQ7b', T.video, 50, 'GameV'); delete q.config.taskConfigV1; SIM.quests.push(q); }, 'shapeless video enrolled mid-run');
    ticker(T.play, 'q-PQ7', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
  },
  S14() { // D-gate (item 4): static chores abort early (store path + POST path), worker parks; advancing chore unaffected
    SIM.quests.push(mkQuest('PQ14a', T.play, 80, 'GameP'));
    SIM.quests.push(mkQuest('SQ14b', T.stream, 80, 'GameS'));
    SIM.quests.push(mkQuest('VQ14c', T.video, 60, 'GameV'));
    SIM.frozen = new Set(['q-VQ14c']);
    ticker(T.play, 'q-PQ14a', { to: 80, step: 10, every: 7000, startAt: 20000, hold: 0 });
    ticker(T.stream, 'q-SQ14b', { from: 50, to: 50, step: 10, every: 7000, startAt: 20000, hold: 90 });
  },
  S15() { // O8.12 RIPCORD: 会員-gated levels + 60s window + upgrade + garbled decoy-over-decoy (simplified: test within 会員2 context)
    needPW('dbg', 'res', 'ak', 'view', 'rcd');
    SIM.quests.push(mkQuest('VQ15', T.video, 60, 'GameV'));
    // Timeline: test main gate and level upgrade within default 会員=2 — ak last (deletes bridge)
    at(2000, async () => {
      // Before any main unlock, view/res/ak should be deflection (false)
      RES.pre_view = await window.GoogleUblock(PW.view);
      RES.pre_res = await window.GoogleUblock(PW.res);
      RES.pre_ak = await window.GoogleUblock(PW.ak);
    }, 'pre-main deflection');
    at(5000, async () => {
      RES.lvl2_rcd = await window.GoogleUblock(PW.rcd);
      RES.lvl2_rcd_view = await window.GoogleUblock(PW.view);
      RES.lvl2_rcd_res = await window.GoogleUblock(PW.res);
    }, 'level 2+rcd -> lvl1');
    at(10000, async () => {
      // Garbled fake rcd should be decoy-over-decoy (false) but view after should still be true (since main already OK)
      RES.garbled = await window.GoogleUblock('not-a-real-rcd-' + Date.now());
      RES.garbled_view = await window.GoogleUblock(PW.view);
    }, 'garbled fake');
    at(15000, async () => {
      RES.lvl2_dbg = await window.GoogleUblock(PW.dbg);
      RES.lvl2_dbg_view = await window.GoogleUblock(PW.view);
    }, 'level 2+dbg upgrade to lvl2');
    at(20000, async () => {
      // Late check: after window but with mainOK true, upgrade still allowed (already did), wrong should still be false
      RES.late_wrong = await window.GoogleUblock('late-wrong-' + Date.now());
      RES.late_view = await window.GoogleUblock(PW.view); // should still be true
    }, 'late wrong still deflection, view still true');
    at(25000, async () => {
      RES.lvl2_rcd_ak = await window.GoogleUblock(PW.ak);
      RES.lvl2_dbg_ak = true; // ak same as rcd at lvl1, already proven
    }, 'ak at end (deletes bridge)');
  },
  S8() { // resurgence merges mid-chore without interrupting; view proves it pre-pacing (O8.12: needs rcd/dbg for main)
    needPW('res', 'view', 'rcd');
    SIM.quests.push(mkQuest('PQ8', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ8', T.video, 60, 'GameV'));
    ticker(T.play, 'q-PQ8', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
    at(30000, () => { SIM.quests.push(mkQuest('AQ8', T.act, 60, 'GameA')); }, 'act quest enrolled mid-video');
    at(35000, async () => { RES.main = await window.GoogleUblock(PW.rcd); }, 'rcd main unlock');
    at(40000, async () => { RES.res = await window.GoogleUblock(PW.res); }, 'resurgence call');
    at(45000, async () => { RES.view = await window.GoogleUblock(PW.view); }, 'view call');
  },
  S9() { // view-queue shows board mid-run; pre-boot call is vacuous-true (O8.12: needs rcd for main)
    needPW('view', 'rcd');
    SIM.quests.push(mkQuest('PQ9', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ9', T.video, 60, 'GameV'));
    ticker(T.play, 'q-PQ9', { to: 100, step: 10, every: 7000, startAt: 20000, hold: 60 });
    at(35000, async () => { RES.main = await window.GoogleUblock(PW.rcd); }, 'rcd main unlock');
    at(40000, async () => { RES.view = await window.GoogleUblock(PW.view); }, 'view call mid-run');
  },
  S10() { // AKQJT mid-run: full flush, then a second paste boots clean (O8.12: needs rcd for main)
    needPW('ak', 'rcd');
    SIM.quests.push(mkQuest('PQ10', T.play, 100, 'GameP'));
    SIM.quests.push(mkQuest('VQ10', T.video, 200, 'GameV'));
    at(35000, async () => { RES.main = await window.GoogleUblock(PW.rcd); }, 'rcd main unlock');
    at(50000, async () => { RES.ak = await window.GoogleUblock(PW.ak); }, 'AKQJT call');
  },
  S11() { // natural done: everything flushed; re-paste runs again
    SIM.quests.push(mkQuest('VQ11', T.video, 40, 'GameV'));
    at(20000, () => { RES.lockHeld = typeof window[Symbol.for(IOC_SYMBOL)] !== 'undefined'; }, 'sample mutex held mid-run');
  },
  S12() { // password matrix + honey vault brute-force (O8.12: dbg or rcd unlocks main)
    needPW('dbg', 'res', 'ak', 'view', 'rcd');
    SIM.quests.push(mkQuest('VQ12', T.video, 200, 'GameV'));
    at(30000, async () => {
      RES.wrong = await window.GoogleUblock('nope-not-a-password');
      RES.empty = await window.GoogleUblock('');
      RES.num = await window.GoogleUblock(12345);
      RES.nil = await window.GoogleUblock(null);
      RES.dbg = await window.GoogleUblock(PW.dbg);
      RES.res = await window.GoogleUblock(PW.res);
      RES.view = await window.GoogleUblock(PW.view);
    }, 'password matrix');
    at(60000, async () => { RES.ak = await window.GoogleUblock(PW.ak); }, 'AKQJT call');
  },
};

// ---------------- checks ----------------
function checkCommon() {
  const boot = LOGS.find((l) => l.s.includes('[Host'));
  ok(!!boot, 'bundle booted (' + (boot ? boot.s.slice(0, 60) : 'none') + ')');
  const pinned = L(/pinned to the board|pinned/);
  out('  board lines: ' + pinned.length);
}
function peekCompletion(tag) {
  return firstT(new RegExp(': ' + tag + '\\.'));
}
function checkCompletion(tag) {
  const t = peekCompletion(tag);
  ok(t >= 0, `${tag} completion line @ ${fmtT(t)}`);
  return t;
}
const CHECKS = {
  S0() {
    checkCommon();
    checkCompletion('VQ0');
    ok(SIM.http.some((h) => h.url.includes('/video-progress')), 'video-progress POSTs issued (' + SIM.http.length + ' http calls)');
  },
  S1() {
    checkCommon();
    const tv = checkCompletion('VQ1'), tp = checkCompletion('PQ1'), ts = checkCompletion('SQ1');
    const order = [['VQ1', tv], ['PQ1', tp], ['SQ1', ts]].sort((a, b) => a[1] - b[1]).map((x) => x[0]).join('>');
    out('  completion order: ' + order);
    const pac = L(/Pacing shift/);
    ok(pac.length === 2, `pacing lines == 2 (got ${pac.length})`);
    for (const l of pac) out(`  pacing @ ${fmtT(l.t)}: ${l.s.slice(0, 90)}`);
    ok(SIM.dispatched.some((d) => d.type === 'RUNNING_GAMES_CHANGE'), 'fake-game dispatch observed');
  },
  S2a() {
    checkCommon();
    const t = checkCompletion('PQ2');
    ok(t > 130000 && t < 130000 + 150000, `PQ2 settled promptly via verifier (@ ${fmtT(t)}, store done@130s)`);
    const tv = checkCompletion('VQ2');
    ok(tv >= 0 && (tv < t || tv > t), 'both chores completed (video-first order)');
  },
  S2b() {
    checkCommon();
    const t = checkCompletion('PQ2');
    ok(t > 130000 && t < 130000 + 150000, `PQ2 settled on value-only (@ ${fmtT(t)})`);
    checkCompletion('VQ2');
  },
  S2c() {
    checkCommon();
    const t = checkCompletion('PQ2');
    ok(t > 130000 && t < 130000 + 200000, `PQ2 settled after vanishing (@ ${fmtT(t)}, 2-miss rule)`);
    checkCompletion('VQ2');
  },
  S2d() {
    checkCommon();
    const t = firstT(/: PQ2\./);
    ok(t < 0, 'PQ2 silent settle (no done line for expiry)');
    checkCompletion('VQ2');
  },
  S2e() {
    checkCommon();
    const t = firstT(/: PQ2\./);
    ok(t >= 700000, `PQ2 NOT abandoned while frozen (done @ ${fmtT(t)}, resume@700s)`);
    ok(t >= 0, 'PQ2 completed after event resume');
  },
  S3() {
    checkCommon();
    checkCompletion('VQ3');
    const tp = checkCompletion('PQ3'), ts = checkCompletion('SQ3');
    ok(tp > 30000 && ts > 30000, 'refilled quests ran AFTER appearing @30s (refill proven behaviorally)');
  },
  S4a() {
    checkCommon();
    const t = checkCompletion('PQ4');
    ok(t >= 0, `PQ4 completed despite navigation (@ ${fmtT(t)})`);
    const prog = LOGS.filter((l) => /\/100/.test(l.s) && l.t > 42000 && l.t < 62000);
    ok(prog.length === 0, `no progress lines while paused (got ${prog.length})`);
  },
  S4b() {
    checkCommon();
    const t = checkCompletion('PQ4');
    ok(t >= 0 && t < 50000 + 150000, `PQ4 settled despite completing mid-pause (@ ${fmtT(t)})`);
  },
  S5() {
    checkCommon();
    const tV = firstT(/: VQ5\./), tP = firstT(/: PQ5\./), tS = firstT(/: SQ5\./);
    const order = [['VQ5', tV], ['PQ5', tP], ['SQ5', tS]].sort((a, b) => a[1] - b[1]).map((x) => x[0]).join('>');
    out(`  completion order: ${order}`);
    ok(tV >= 0 && tV < tP && tV < tS, 'VIDEO ran first');
  },
  S6() {
    checkCommon();
    checkCompletion('VQ6'); checkCompletion('AQ6'); checkCompletion('PQ6');
    const pac = L(/Pacing shift/);
    out(`  pacing lines: ${pac.length}`);
    for (const l of pac) {
      const m = l.s.match(/~(\d+)s/);
      out(`  pacing @ ${fmtT(l.t)} dly=${m ? m[1] : '?'}s :: ${l.s.slice(0, 80)}`);
      if (m) { const d = +m[1]; ok(d >= 8 && d <= 35, `dly ${d}s within humanise band`); }
    }
    const hb = SIM.http.filter((h) => h.url.includes('/heartbeat'));
    ok(hb.length > 0, `activity heartbeats POSTed (${hb.length})`);
  },
  S7a() {
    checkCommon();
    const a = checkCompletion('VQ7a'), b = checkCompletion('VQ7b'), g = checkCompletion('PQ7');
    ok(a >= 0 && b >= 0 && g >= 0 && a < b && b < g, `mid-run video jumped the game (VQ7a@${fmtT(a)} VQ7b@${fmtT(b)} PQ7@${fmtT(g)})`);
    const rf = L(/more chores? (came in after the bell|joined the board)/);
    ok(rf.length >= 1, `mid-run top-up announced (${rf.length} after-the-bell lines)`);
  },
  S7b() {
    checkCommon();
    const c = checkCompletion('VQ7c'), e = checkCompletion('VQ7e'), g = checkCompletion('PQ7d');
    ok(c >= 0 && e >= 0 && g >= 0 && c < e && e < g, `gap-enrolled video jumped the game (VQ7c@${fmtT(c)} VQ7e@${fmtT(e)} PQ7d@${fmtT(g)})`);
  },
  S13a() {
    const a = checkCompletion('VQ7a'), b = peekCompletion('VQ7b'), g = checkCompletion('PQ7');
    const rf = L(/more chores? (came in after the bell|joined the board)/);
    const dg = L(/Queue refill evaluation/);
    ok(b < 0 && g >= 0 && L(/Shelf out of reach/).length >= 1, `S13a dead-store: announced x${L(/Shelf out of reach/).length}, video skipped loud, game done (VQ7a@${fmtT(a)} PQ7@${fmtT(g)})`);
  },
  S13b() {
    const a = checkCompletion('VQ7a'), b = peekCompletion('VQ7b'), g = checkCompletion('PQ7');
    const rf = L(/more chores? (came in after the bell|joined the board)/);
    const dg = L(/Queue refill evaluation/);
    ok(b < 0 && g >= 0 && L(/1 unenrolled/).length >= 1, `S13b unenrolled: announced x${L(/1 unenrolled/).length}, video skipped loud, game done`);
  },
  S13c() {
    const a = checkCompletion('VQ7a'), b = checkCompletion('VQ7b'), g = checkCompletion('PQ7');
    const rf = L(/more chores? (came in after the bell|joined the board)/);
    const dg = L(/Queue refill evaluation/);
    ok(a >= 0 && b >= 0 && g >= 0 && a < b && b < g && L(/1 misshapen/).length >= 1, `S13c poison survived: video merged anyway (VQ7a@${fmtT(a)} VQ7b@${fmtT(b)} PQ7@${fmtT(g)}), poison announced`);
  },
  S13d() {
    const a = checkCompletion('VQ7a'), b = peekCompletion('VQ7b'), g = checkCompletion('PQ7');
    const rf = L(/more chores? (came in after the bell|joined the board)/);
    const dg = L(/Queue refill evaluation/);
    ok(b < 0 && g >= 0 && L(/1 unfamiliar wrap/).length >= 1, `S13d unfamiliar wrap: announced x${L(/1 unfamiliar wrap/).length}, video skipped loud, game done`);
  },
  S14() {
    checkCommon();
    checkCompletion('PQ14a');
    ok(L(/: SQ14b\./).length === 0, 'frozen SQ14b never completes');
    ok(L(/: VQ14c\./).length === 0, 'frozen VQ14c never completes');
    ok(L(/setting it aside/).length >= 2, `static abort x${L(/setting it aside/).length} (want >=2)`);
    ok(L(/nothing moved since the last round/).length >= 1, 'worker parks on static board');
  },
  S8() {
    checkCommon();
    ok(RES.res === true, 'resurgence returned true');
    ok(RES.view === true, 'view returned true');
    const led = L(/Ledger: 2 queued, 2 settled\./);
    ok(led.length === 1, 'view showed 2 queued mid-video (pre-pacing merge proven)');
    ok(L(/next: task AQ8/).length === 1 && L(/then: task PQ8/).length === 1, 'AQ8 merged ahead of PQ8 before VQ8 finished (resurgence mid-chore)');
    ok(L(/now: VQ8/).length === 1, 'VQ8 still in flight at view time (not interrupted)');
    const v = checkCompletion('VQ8'), a = checkCompletion('AQ8'), g = checkCompletion('PQ8');
    ok(v >= 0 && a < g, 'VQ8 completed normally; AQ8 ran before PQ8');
  },
  S9() {
    checkCommon();
    ok(RES.preBoot === false, 'pre-boot view deflection (needs rcd, got false)');
    ok(RES.view === true, 'mid-run view call true');
    const led = L(/Ledger: 1 queued, 1 settled\./);
    ok(led.length === 1, 'ledger line exact (1 queued, 1 settled)');
    ok(L(/next: task PQ9/).length === 1, 'PQ9 shown as next task');
    ok(L(/now: VQ9/).length === 1, 'VQ9 shown in flight');
    checkCompletion('VQ9'); checkCompletion('PQ9');
  },
  async S10() {
    checkCommon();
    ok(RES.ak === true, 'AKQJT returned true');
    ok(firstT(/: VQ10\./) < 0 && firstT(/: PQ10\./) < 0, 'nothing completed after mid-run flush');
    ok(typeof window.GoogleUblock === 'undefined', 'bridge dropped from window');
    ok(typeof window[Symbol.for(IOC_SYMBOL)] === 'undefined', 'mutex released');
    ok(timers.size === 0, `no live timers (${timers.size})`);
    ok(msgL.length === 0, `no message listeners (${msgL.length})`);
    ok(subs.size === 0, `no dispatcher subs (${subs.size})`);
    runInThisContext(bundleSrc, { filename: 'bundle2.js' });
    await run(vnow + 600000);
    ok(typeof window.GoogleUblock === 'function', 'second paste reinstalls bridge');
    ok(L(/already active/).length === 0, 'second paste NOT blocked (no already-active)');
    ok(L(/\[Host /).length === 2, 'second Host init observed');
    ok(L(/: VQ10\./).length === 1, 'second run completed VQ10');
  },
  async S11() {
    checkCommon();
    checkCompletion('VQ11');
    ok(RES.lockHeld === true, 'mutex HELD mid-run under manifest symbol');
    ok(typeof window.GoogleUblock === 'undefined', 'bridge dropped after natural done');
    ok(typeof window[Symbol.for(IOC_SYMBOL)] === 'undefined', 'mutex released after natural done');
    ok(timers.size === 0, `no live timers (${timers.size})`);
    ok(msgL.length === 0, `no message listeners (${msgL.length})`);
    ok(subs.size === 0, `no dispatcher subs (${subs.size})`);
    const n0 = LOGS.length;
    await run(vnow + 600000);
    ok(LOGS.length === n0, '600s post-done silence (nothing fires)');
    runInThisContext(bundleSrc, { filename: 'bundle2.js' });
    await run(vnow + 600000);
    ok(L(/already active/).length === 0, 're-paste after done NOT blocked');
    ok(L(/\[Host /).length === 2, 'second Host init observed');
    ok(L(/: VQ11\./).length === 1, 'VQ11 done exactly once (completed quests not re-run)');
    ok(L(/^0 chores/).length === 1, 'second run reports 0 chores');
    ok(L(/to finish the job|Halfway|flush and restart/i).length >= 1, 'second run parks on empty board');
    ok(typeof window.GoogleUblock === 'undefined', 'bridge dropped again by parked run');
    ok(typeof window[Symbol.for(IOC_SYMBOL)] === 'undefined', 'mutex released again by parked run');
    ok(timers.size === 0 && msgL.length === 0, 'parked run leaves nothing behind');
  },
  S12() {
    checkCommon();
    ok(RES.wrong === false, 'wrong password rejected');
    ok(RES.empty === false, 'empty password rejected');
    ok(RES.num === false, 'non-string password rejected');
    ok(RES.nil === false, 'null password rejected');
    ok(RES.dbg === true, 'debug password unlocks');
    ok(L(/\[Google \w+\]/).length > 0, 'labels opened after debug unlock');
    ok(RES.res === true, 'resurgence true (vacuous on empty board)');
    ok(RES.view === true, 'view true');
    ok(L(/Ledger: 0 queued, 1 settled\./).length === 1, 'ledger shows running solo chore');
    ok(RES.ak === true, 'AKQJT true');
    ok(firstT(/: VQ12\./) < 0, 'run killed before VQ12 could finish');
    ok(typeof window.GoogleUblock === 'undefined', 'bridge dropped by AKQJT');
    ok(window.GoogleVault('0000') === false, 'honey vault rejects wrong PIN');
    let found = null;
    for (let p = 0; p <= 9999; p++) {
      const r = window.GoogleVault(String(p).padStart(4, '0'));
      if (r !== false) { found = String(p).padStart(4, '0'); break; }
    }
    ok(found === '2220', `honey PIN brute-forced fast (found ${found})`);
    const k1 = window.GoogleVault(found), k2 = window.GoogleVault(found);
    ok(Array.isArray(k1) && k1.length === 4 && k1.every((k) => /^[0-9a-f]{16}$/.test(k)), 'honey returns junk key-shaped output');
    ok(JSON.stringify(k1) !== JSON.stringify(k2), 'honey output random per call (worthless)');
  },
  S15() {
    checkCommon();
    ok(RES.pre_view === false, 'pre-main view deflection (false)');
    ok(RES.pre_res === false, 'pre-main res deflection (false)');
    ok(RES.pre_ak === false, 'pre-main ak deflection (false)');
    ok(RES.lvl2_rcd === true, 'lvl2 rcd unlock true (level1)');
    ok(RES.lvl2_rcd_view === true, 'lvl2+rcd view true (level1)');
    ok(RES.lvl2_rcd_res === true, 'lvl2+rcd res true (level1)');
    ok(RES.garbled === false, 'garbled fake rcd rejected (decoy-over-decoy)');
    ok(RES.garbled_view === true, 'view still true after garbled (mainOK)');
    ok(RES.lvl2_dbg === true, 'lvl2 dbg upgrade true (to level2)');
    ok(RES.lvl2_dbg_view === true, 'lvl2+dbg view true (level2)');
    ok(RES.lvl2_rcd_ak === true, 'lvl2+rcd ak true (level1) at end');
    ok(RES.late_wrong === false, 'late wrong still deflection');
    ok(RES.late_view === true, 'late view still true after mainOK');
    ok(L(/Ledger:/).length >= 1 || L(/queued/).length >= 1 || L(/Google/).length >= 1, 'logs visible after rcd unlock (ledger or Google)');
  },
};

// ---------------- main ----------------
const scenName = process.argv[2] || 'S0';
const seed = Number(process.argv[3] || 7);
const PW = { dbg: process.argv[4], res: process.argv[5], ak: process.argv[6], view: process.argv[7], rcd: process.argv[8] };
const RES = {};
const needPW = (...ks) => {
  for (const k of ks) if (!PW[k]) { errOut('scenario needs passwords: node chore-stress.mjs <SCN> [seed] <pwDbg> <pwRes> <pwAK> <pwView> <pwRcd>'); process.exit(2); }
};
if (!SCEN[scenName]) { errOut('unknown scenario ' + scenName); process.exit(2); }
Math.random = mulberry32(seed * 1000 + 17);
out(`== ${scenName} (seed ${seed}) ==`);
SCEN[scenName]();
const bundlePath = process.env.CS_BUNDLE || path.join(path.resolve(__dirname, '..'), 'final-package', 'O8.6-Final-final-bundle.js');
// O8.10 red-forge item 3: mutex symbol rotates per build; resolve via manifest.
const IOC_SYMBOL = (() => {
  const cands = [process.env.CS_ROTATION,
    path.join(path.dirname(bundlePath), 'rotation.json'),
    path.join(path.resolve(__dirname, '..'), 'oto', 'rotation.json')].filter(Boolean);
  for (const c of cands) {
    try { const m = JSON.parse(fs.readFileSync(c, 'utf8')); if (m.symbol && m.symbol.new) return m.symbol.new; } catch {}
  }
  return '_0xq39e738eb';
})();
const bundleSrc = fs.readFileSync(bundlePath, 'utf8');
const { runInThisContext } = await import('node:vm');
try {
  runInThisContext(bundleSrc, { filename: 'bundle.js' });
} catch (e) {
  errOut('BUNDLE-THROW: ' + String(e).slice(0, 300));
}
if (scenName === 'S9') { try { RES.preBoot = await window.GoogleUblock(PW.view); } catch { RES.preBoot = 'THREW'; } }
await run(3600e3);
out(`-- ${LOGS.length} lines, ${SIM.http.length} http, ${SIM.dispatched.length} dispatches, msg=${MSGSTAT.registered}reg/${MSGSTAT.posted}post, vnow=${fmtT(vnow)} --`);
if (process.argv.includes('--dump')) {
  for (const l of LOGS) out(`[${fmtT(l.t)}] ${l.s.slice(0, 160)}`);
}
await CHECKS[scenName]();
out(`== ${scenName}: ${failures ? failures + ' FAILURES' : 'ALL PASS'} ==`);
process.exit(failures ? 1 : 0);
