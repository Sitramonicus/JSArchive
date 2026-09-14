#!/usr/bin/env node
/*
 * stress-queue.js — headless queue/stress scenarios against a shipped payload.
 *
 * Replicates the harness-default module stubs, then runs one scenario:
 *   multi    : boot with 2 eligible video quests + 1 unsupported quest.
 *              Expects: "2 chores pinned", "1 left off", two Polished lines,
 *              Shelf polished (2 results), armed idle.
 *   midrun   : boot with 1 quest; a NEW eligible quest is injected into the
 *              store mid-run (while task 1 is progressing). Then a second boot
 *              (simulated refresh) with the first quest completed.
 *              Expects: task 1 undisturbed (progress continues past injection),
 *              new quest NOT processed in run 1 (1 result only), and picked up
 *              on the next boot.
 *   srvdone  : boot with 1 quest; server responses start returning completed_at
 *              mid-run. Expects: graceful early finish, no hang, armed idle.
 *   blip     : the very first POST returns a 502 server error once. Expects:
 *              designed retry path (Porch backoff log), both chores polished,
 *              no chore crash, queue continues.
 *
 * Usage: node stress-queue.js <scenario> [payload.js]
 * Exit 0 = assertions passed. Prints PASS/FAIL lines.
 */
'use strict';
const fs = require('fs');
const ORIG = { log: console.log.bind(console), error: console.error.bind(console) };
const scenario = process.argv[2];
const target = process.argv[3] || '/home/user/o8cmp/O8.2-Juggler-7.js';
if (!['multi', 'midrun', 'srvdone', 'blip'].includes(scenario)) { ORIG.error('unknown scenario'); process.exit(2); }

// ---------------------------------------------------------------- stubs -----
const LOGS = [];
let postCount = 0;
let srvdoneAfter = Infinity;      // srvdone: first beat index that returns completed_at
let blipOnce = false;             // blip: throw on the very first POST, then recover

function makeQuest(id, name, targetVal, opts = {}) {
  return {
    id,
    config: {
      expiresAt: new Date(Date.now() + 864e5).toISOString(),
      messages: { questName: name },
      taskConfig: { tasks: { WATCH_VIDEO: { target: targetVal, applications: [{ id: 'app-' + id }] } } },
      application: { id: 'app-' + id }
    },
    userStatus: {
      enrolledAt: opts.enrolledAt ?? 'now',
      completedAt: opts.completedAt ?? null,
      progress: { WATCH_VIDEO: { value: opts.progress ?? 0 } }
    }
  };
}

class MetaStore { getStreamerActiveStreamMetadata() { return {}; } }
class QuestStore {
  constructor(quests) { this.quests = new Map(quests.map(q => [q.id, q])); }
  getQuest(id) { return this.quests.get(id); }
}
class ThreadStore { getAllThreadsForParent() {} getSortedPrivateChannels() { return []; } }
class FluxProto { flushWaitQueue() {} }
const flux = Object.assign(Object.create(FluxProto.prototype), { dispatch() {}, subscribe() {}, unsubscribe() {} });

function makeHttp(quests) {
  return {
    get: async () => ({ body: [] }),
    post: async (opts) => {
      postCount++;
      if (blipOnce) { blipOnce = false; const e = new Error('server hiccup'); e.status = 502; throw e; }
      if (postCount >= srvdoneAfter) return { body: { completed_at: new Date().toISOString() } };
      return { body: {} };
    }
  };
}

function boot(quests, opts = {}) {
  LOGS.length = 0; postCount = 0;
  if (opts.srvdoneAfter !== undefined) srvdoneAfter = opts.srvdoneAfter; else srvdoneAfter = Infinity;
  blipOnce = !!opts.blipOnce;
  const listeners = {};
  const chunk = [];
  const qStore = new QuestStore(quests);
  chunk.push = function () { return { c: {
    m1: { exports: { A: new MetaStore() } },
    m2: { exports: { Ay: { getRunningGames: () => [], getGameForPID: () => null } } },
    m3: { exports: { A: qStore } },
    m4: { exports: { A: new ThreadStore() } },
    m5: { exports: { Ay: { getSFWDefaultChannel() {}, getAllGuilds: () => ({}) } } },
    m6: { exports: { h: flux } },
    m7: { exports: { Bo: makeHttp(quests) } }
  } }; };
  chunk.pop = function () {};
  global.PointerEvent = class PointerEvent { constructor(t, o) { this.type = t; } };
  global.document = {
    hidden: false,
    addEventListener: (t, h) => { listeners[t] = h; },
    removeEventListener: (t, h) => { if (listeners[t] === h) delete listeners[t]; },
    dispatchEvent: () => true
  };
  global.location = { pathname: '/channels/@me', origin: 'https://discord.com', reload: () => LOGS.push('<<RELOAD CALLED>>') };
  global.confirm = () => false;
  global.window = {
    webpackChunkdiscord_app: chunk,
    addEventListener: (t, h) => { listeners['msg'] = h; },
    removeEventListener: (t, h) => { if (listeners['msg'] === h) delete listeners['msg']; },
    postMessage: (data, origin) => { listeners['msg'] && listeners['msg']({ source: global.window, data, origin }); }
  };
  const _log = (...a) => LOGS.push(a.map(x => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join(' '));
  console.log = _log;
  console.debug = _log;
  console.warn = _log;
  // re-eval-safe: clear any leftover run key from a previous boot
  try { delete global.window[Symbol.for('quest-suite:o8:active')]; } catch (e) {}
  eval(fs.readFileSync(target, 'utf8'));
  return { listeners, LOGS, qs: qStore };
}

function waitFor(pred, ms, what) {
  return new Promise((res) => {
    const t0 = Date.now();
    const iv = setInterval(() => {
      if (pred()) { clearInterval(iv); res(true); }
      else if (Date.now() - t0 > ms) { clearInterval(iv); res(false); }
    }, 250);
  });
}

const has = (re) => LOGS.some(l => re.test(l));
const count = (re) => LOGS.filter(l => re.test(l)).length;

async function scenarioMulti() {
  const quests = [makeQuest('q1', 'First Quest', 6), makeQuest('q2', 'Second Quest', 6), makeQuest('q3', 'Unsupported Shape', 6)];
  // unsupported: give q3 only a future task type
  quests[2].config.taskConfig.tasks = { SOME_FUTURE_TASK: { target: 6 } };
  boot(quests);
  const ok = await waitFor(() => has(/Everything's polished|All polished|Anything else is gleaming/), 200000, 'multi');
  const checks = [
    ['two chores pinned (dynamic wording)', has(/\b2 chores?/)],
    ['one left off', has(/1 (?:left off|set aside) — shape we/)],
    ['First Quest completion tell', has(/: First Quest\.$/)],
    ['Second Quest completion tell', has(/: Second Quest\.$/)],
    ['shelf polished 2 results', has(/\(2 activity results?\)/)],
    ['NOT polishing unsupported', !has(/: Unsupported Shape\.$/)],
    ['armed idle reached', ok]
  ];
  return checks;
}

async function scenarioMidrun() {
  // O8.3 semantics: when the queue drains, the store is re-read and stragglers join.
  // Expect run1 to finish the in-flight quest, then pick up the late quest, then idle.
  const q1 = makeQuest('q1', 'Running Quest', 8);
  const quests = [q1];
  const h = boot(quests);
  const ready = await waitFor(() => has(/\d+ chores?/), 30000, 'midrun-boot');
  // inject a new eligible quest into the LIVE store while q1 is progressing
  const q2 = makeQuest('q2', 'Late Arrival', 5);
  setTimeout(() => { h.qs.quests.set('q2', q2); }, 2500);
  const progressSeen = await waitFor(() => has(/(?:Random fraction|Running tally|Progress line|Current beat|Now reading): \d/), 60000, 'midrun-firstbeat');
  const idle1 = await waitFor(() => has(/Everything's polished|All polished/), 240000, 'midrun-idle1');
  const checks1 = [
    ['boot ok', ready],
    ['in-flight task undisturbed (progress beats seen)', progressSeen],
    ['refill log when straggler joins', has(/1 more chore (?:joined the board|came in after the bell)/)],
    ['late quest polished in the SAME run', has(/: Late Arrival\.$/)],
    ['Running Quest polished exactly once', count(/: Running Quest\.$/) === 1],
    ['shelf reports 2 results', has(/\(2 activity results?\)/)],
    ['armed idle reached', idle1]
  ];
  // simulated refresh with both quests now server-complete
  q1.userStatus.completedAt = new Date().toISOString();
  q2.userStatus.completedAt = new Date().toISOString();
  q1.userStatus.progress.WATCH_VIDEO.value = 12; q2.userStatus.progress.WATCH_VIDEO.value = 6;
  boot(quests);
  const done2 = await waitFor(() => has(/Nothing (?:ripe on the trees today|on the vines today|ripe yet)/), 60000, 'midrun-boot2');
  const checks2 = [
    ['boot2 finds nothing left (both complete)', done2],
    ['boot2 did not reprocess anything', !has(/: (?:Running Quest|Late Arrival)\.$/)]
  ];
  return checks1.concat(checks2);
}

async function scenarioSrvdone() {
  const quests = [makeQuest('q1', 'Server Finish', 30)];
  boot(quests, { srvdoneAfter: 2 }); // from the 2nd POST onward the server says completed
  const ok = await waitFor(() => has(/Everything's polished|All polished/), 200000, 'srvdone');
  const checks = [
    ['finished without hang', ok],
    ['no crash line', !has(/Error: /)],
    ['shelf result recorded', has(/\(1 activity results?\)/)],
    ['posts stayed bounded (no runaway)', postCount < 12]
  ];
  return checks;
}

async function scenarioBlip() {
  const quests = [makeQuest('q1', 'Blip Quest', 6), makeQuest('q2', 'Survivor Quest', 6)];
  boot(quests, { blipOnce: true }); // the very first POST of the run fails once
  const ok = await waitFor(() => has(/Everything's polished|All polished/), 220000, 'blip');
  const checks = [
    ['5xx retry engaged (backoff logged)', has(/Server (?:error|fault) 502/)],
    ['no chore crash line', !has(/Error: /)],
    ['blip quest polished', has(/: Blip Quest\.$/)],
    ['queue continued to q2', has(/: Survivor Quest\.$/)],
    ['shelf polished with 2 results', has(/\(2 activity results?\)/)],
    ['armed idle reached', ok]
  ];
  return checks;
}

(async () => {
  const map = { multi: scenarioMulti, midrun: scenarioMidrun, srvdone: scenarioSrvdone, blip: scenarioBlip };
  let checks;
  if (process.env.LIVE) {
    const ticker = setInterval(() => { ORIG.log('@live ' + (Date.now() % 100000) + ' | ' + LOGS.slice(-2).map(x => x.slice(0, 110)).join(' || ')); }, 15000);
    try { checks = await map[scenario](); } finally { clearInterval(ticker); }
  } else {
    try { checks = await map[scenario](); }
    catch (e) { ORIG.error('SCENARIO ERROR', e); process.exit(1); }
  }
  let fails = 0;
  for (const [name, pass] of checks) { ORIG.log((pass ? 'PASS' : 'FAIL') + '  ' + name); if (!pass) fails++; }
  ORIG.log(`--- ${scenario}: ${checks.length - fails}/${checks.length} passed ---`);
  if (fails && process.env.DUMP) LOGS.slice(-50).forEach(l => ORIG.log('  | ' + l));
  process.exit(fails ? 1 : 0);
})();
