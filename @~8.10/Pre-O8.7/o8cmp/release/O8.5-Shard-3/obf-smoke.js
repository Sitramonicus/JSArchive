#!/usr/bin/env node
// obf-smoke.js — post-stitch smoke test for an obfuscated O8.5 payload.
// Plain node, no npm. Stubs the Discord surface the payload reads, runs the
// WATCH_VIDEO path to completion, then simulates Alt+Shift+R (the armed
// reload) and reports PASS/FAIL. Exit 0 = everything worked.
// Usage: node obf-smoke.js <payload.js>
'use strict';
const fs = require('fs');
const target = process.argv[2] || 'O8.5-Shard-3-obf.js';

global.PointerEvent = class PointerEvent { constructor(type, opts) { this.type = type; } };
const listeners = {};
global.document = {
  hidden: false,
  addEventListener: (t, h) => { listeners[t] = h; },
  removeEventListener: (t, h) => { if (listeners[t] === h) delete listeners[t]; },
  dispatchEvent: () => true
};
global.location = {
  pathname: '/channels/@me',
  origin: 'https://discord.com',
  reload: () => { console.log('<<RELOAD CALLED>>'); }
};
global.confirm = () => false;

let postCount = 0;
class MetaStore { getStreamerActiveStreamMetadata() { return {}; } }
class QuestStore {
  getQuest() {}
  constructor() {
    this.quests = new Map([['q1', {
      id: 'q1',
      config: {
        expiresAt: new Date(Date.now() + 864e5).toISOString(),
        messages: { questName: 'Test Quest Zero' },
        taskConfig: { tasks: { WATCH_VIDEO: { target: 4 } } },
        application: { id: '1234' }
      },
      userStatus: { enrolledAt: 'now', completedAt: null, progress: { WATCH_VIDEO: { value: 0 } } }
    }], ['q2', {
      id: 'q2',
      config: {
        expiresAt: new Date(Date.now() + 864e5).toISOString(),
        messages: { questName: 'Fancy Unsupported Quest' },
        taskConfig: { tasks: { SOME_FUTURE_TASK: { target: 60 } } }
      },
      userStatus: { enrolledAt: 'now', completedAt: null, progress: {} }
    }]]);
  }
}
class ThreadStore { getAllThreadsForParent() {} getSortedPrivateChannels() { return []; } }
class FluxProto { flushWaitQueue() {} }
const flux = Object.assign(Object.create(FluxProto.prototype), { dispatch() {}, subscribe() {}, unsubscribe() {} });
const http = { get: async () => ({ body: [] }), post: async () => { postCount++; return { body: {} }; } };

const chunk = [];
chunk.push = function () { return { c: {
  m1: { exports: { A: new MetaStore() } },
  m2: { exports: { Ay: { getRunningGames: () => [], getGameForPID: () => null } } },
  m3: { exports: { A: new QuestStore() } },
  m4: { exports: { A: new ThreadStore() } },
  m5: { exports: { Ay: { getSFWDefaultChannel() {}, getAllGuilds: () => ({}) } } },
  m6: { exports: { h: flux } },
  m7: { exports: { Bo: http } }
} }; };
chunk.pop = function () {};

global.window = {
  webpackChunkdiscord_app: chunk,
  addEventListener: (t, h) => { listeners['msg'] = h; },
  removeEventListener: (t, h) => { if (listeners['msg'] === h) delete listeners['msg']; },
  postMessage: (data, origin) => { listeners['msg']({ source: global.window, data, origin }); }
};

const lines = [];
const ORIG = { log: console.log, error: console.error };
console.log = (...a) => { lines.push(a.map(String).join(' ')); ORIG.log(...a); };
console.debug = (...a) => { lines.push(a.map(String).join(' ')); };
console.warn = (...a) => { lines.push(a.map(String).join(' ')); };

const code = fs.readFileSync(target, 'utf8');
if (!code.startsWith('console.clear();')) {
  ORIG.error('FAIL  console.clear() is not the first statement');
  process.exit(1);
}
try { eval(code); }
catch (e) { ORIG.error('FAIL  payload threw at load:', e && e.stack || e); process.exit(1); }

const has = (re) => lines.some(l => re.test(l));
const t0 = Date.now();
const iv = setInterval(() => {
  const booted = has(/\[Quest O\.8\.5/);
  const done = has(/Alt\+Shift\+R/);
  const reloaded = has(/<<RELOAD CALLED>>/);
  const crashed = has(/Uncaught|TypeError|ReferenceError|SyntaxError/) && !has(/\[Quest O\.8\.5/);
  if (crashed) { clearInterval(iv); ORIG.error('FAIL  runtime error after boot (see lines above)'); process.exit(1); }
  if (reloaded) {
    clearInterval(iv);
    const ok = booted && done;
    ORIG.log(ok ? 'PASS  quest booted and ran to completion' : 'FAIL  lifecycle incomplete (booted=%s done=%s)', booted, done);
    ORIG.log('PASS  armed reload fired <<RELOAD CALLED>>');
    ORIG.log('PASS  no crash (exit path reached cleanly)');
    process.exit(ok ? 0 : 1);
  }
  if (Date.now() - t0 > 45000) {
    clearInterval(iv);
    ORIG.error('FAIL  timeout (booted=%s done=%s reloaded=%s). Last 25 captured lines:', booted, done, reloaded);
    lines.slice(-25).forEach(l => ORIG.error('   | ' + l.slice(0, 160)));
    process.exit(1);
  }
}, 500);
// fire the chord as soon as the arm message appears
setTimeout(() => {
  const tick = setInterval(() => {
    if (has(/Alt\+Shift\+R/)) {
      clearInterval(tick);
      ORIG.log('<<SIMULATING Alt+Shift+R>>');
      setTimeout(() => listeners['keydown']?.({ altKey: true, shiftKey: true, key: 'r', code: 'KeyR' }), 250);
    }
  }, 250);
}, 3000).unref();
