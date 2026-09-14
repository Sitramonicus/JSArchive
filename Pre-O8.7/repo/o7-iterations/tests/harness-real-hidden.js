// Headless smoke test — stubs Discord's webpack surface, runs the WATCH_VIDEO path,
// then simulates Alt+Shift+R to test the armed reload path. Usage: node dev/harness.js ../O1.js
const fs = require("fs");
const target = process.argv[2] || "/home/user/quest-suite/O1.js";

global.PointerEvent = class PointerEvent { constructor(type, opts) { this.type = type; } };
const listeners = {};
global.document = {
  hidden: true,
  addEventListener: (t, h) => { listeners[t] = h; },
  removeEventListener: (t, h) => { if (listeners[t] === h) delete listeners[t]; },
  dispatchEvent: () => true
};
global.location = {
  pathname: "/channels/@me",
  origin: "https://discord.com",
  reload: () => console.log("<<RELOAD CALLED>>")
};
global.confirm = (msg) => { console.log("<<CONFIRM (LEGACY, SHOULD NOT APPEAR)>> " + msg); return false; };

let postCount = 0;
class MetaStore { getStreamerActiveStreamMetadata() { return {}; } }
class QuestStore {
  getQuest() {}
  constructor() {
    this.quests = new Map([["q1", {
      id: "q1",
      config: {
        expiresAt: new Date(Date.now() + 864e5).toISOString(),
        messages: { questName: "Test Quest Zero" },
        taskConfig: { tasks: { WATCH_VIDEO: { target: 5 } } },
        application: { id: "1234" }
      },
      userStatus: { enrolledAt: "now", completedAt: null, progress: { WATCH_VIDEO: { value: 0 } } }
    }], ["q2", {
      id: "q2",
      config: {
        expiresAt: new Date(Date.now() + 864e5).toISOString(),
        messages: { questName: "Fancy Unsupported Quest" },
        taskConfig: { tasks: { SOME_FUTURE_TASK: { target: 60 } } }
      },
      userStatus: { enrolledAt: "now", completedAt: null, progress: {} }
    }]]);
  }
}
class ThreadStore { getAllThreadsForParent() {} getSortedPrivateChannels() { return []; } }
class FluxProto { flushWaitQueue() {} }
const flux = Object.assign(Object.create(FluxProto.prototype), { dispatch() {}, subscribe() {}, unsubscribe() {} });
const http = { get: async () => ({ body: [] }), post: async () => { postCount++; return { body: {} }; } };

const chunk = [];
const webpackRuntime = { c: {
  m1: { exports: { A: new MetaStore() } },
  m2: { exports: { Ay: { getRunningGames: () => [], getGameForPID: () => null } } },
  m3: { exports: { A: new QuestStore() } },
  m4: { exports: { A: new ThreadStore() } },
  m5: { exports: { Ay: { getSFWDefaultChannel() {}, getAllGuilds: () => ({}) } } },
  m6: { exports: { h: flux } },
  m7: { exports: { Bo: http } }
} };
chunk.push = function (entry) {
  Array.prototype.push.call(this, entry);
  if (entry?.[2]) entry[2](webpackRuntime);
  return this.length;
};

global.window = {
  webpackChunkdiscord_app: chunk,
  addEventListener: (t, h) => { listeners["msg"] = h; },
  removeEventListener: (t, h) => { if (listeners["msg"] === h) delete listeners["msg"]; },
  postMessage: (data, origin) => { listeners["msg"]({ source: global.window, data, origin }); }
};

eval(fs.readFileSync(target, "utf8"));

setTimeout(() => { console.log(`<<WATCHDOG>> posts=${postCount} — still ticking`); }, 30000).unref();
// fire the chord as soon as the arm message appears (event-driven, not timer-driven)
const _log = console.log;
const _debug = console.debug;
const _watchLog = (...a) => {
  _log(...a);
  _debug(...a);
  if (String(a[0]).includes("press Alt+Shift+R")) {
    _log("<<SIMULATING Alt+Shift+R>>");
    setTimeout(() => listeners["keydown"]?.({ altKey: true, shiftKey: true, key: "r", code: "KeyR" }), 250);
  }
};
console.log = _watchLog;
console.debug = _watchLog;
