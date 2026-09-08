// unlock-unit (O.8.4.2) — VM + WebCrypto probe for GoogleUnlock with the corrected
// credential order: salt = short string, passphrase = long string.
// Usage: node unlock-unit.js /home/user/o8cmp/O8.4.2.js
const fs = require("fs");
const target = process.argv[2] || "/home/user/o8cmp/O8.4.2.js";

global.PointerEvent = class PointerEvent {};
const listeners = {};
global.document = {
  hidden: false,
  addEventListener: (t, h) => { listeners[t] = h; },
  removeEventListener: (t, h) => { if (listeners[t] === h) delete listeners[t]; },
  dispatchEvent: () => true
};
global.location = { pathname: "/channels/@me", origin: "https://discord.com", reload: () => {} };
global.confirm = () => false;

class MetaStore { getStreamerActiveStreamMetadata() { return {}; } }
class QuestStore {
  getQuest() {}
  constructor() {
    this.quests = new Map([["q1", {
      id: "q1",
      config: {
        expiresAt: new Date(Date.now() + 864e5).toISOString(),
        messages: { questName: "Test Quest Zero" },
        taskConfig: { tasks: { WATCH_VIDEO: { target: 4 } } },
        application: { id: "1234" }
      },
      userStatus: { enrolledAt: "now", completedAt: null, progress: { WATCH_VIDEO: { value: 0 } } }
    }]]);
  }
  getQuestById() {}
  getUserStatus() {}
}
class ThreadStore {
  getActiveThreads() { return new Map(); }
}
const flux = {
  dispatcher: { dispatch: () => {} },
  store: () => ({ getState: () => ({}) }),
  stores: {}
};
const http = {
  get: async () => ({ ok: true, status: 200, text: async () => "{}" }),
  post: async () => ({ ok: true, status: 200, text: async () => "{}" }),
  patch: async () => ({ ok: true, status: 200, text: async () => "{}" }),
  put: async () => ({ ok: true, status: 200, text: async () => "{}" }),
  delete: async () => ({ ok: true, status: 200, text: async () => "{}" })
};
const chunk = () => {};
chunk.push = function () {};
chunk.push([["0"], {}, (require) => {
  const mm = { exports: {} };
  const def = (deps, fn) => { mm.exports = fn(require); return mm.exports; };
  def(["module"], () => ({ exports: { Ay: { getRunningGames: () => [], getGameForPID: () => null } } }));
  return { m2: { exports: { Ay: { getRunningGames: () => [], getGameForPID: () => null } } },
    m3: { exports: { A: new QuestStore() } },
    m4: { exports: { A: new ThreadStore() } },
    m5: { exports: { Ay: { getSFWDefaultChannel() {}, getAllGuilds: () => ({}) } } },
    m6: { exports: { h: flux } },
    m7: { exports: { Bo: http } } };
}]);
chunk.pop = function () {};

global.window = {
  webpackChunkdiscord_app: chunk,
  addEventListener: (t, h) => {},
  removeEventListener: () => {},
  postMessage: () => {},
  crypto: require("crypto").webcrypto
};

const seen = [];
const collect = (...a) => seen.push(String(a[0]));
const origLog = console.log;
console.log = collect;
console.debug = collect;
console.warn = collect;
console.info = collect;

eval(fs.readFileSync(target, "utf8"));

(async () => {
  const SALT = "RBaa+,gp#V%w&%Tm|*g8V_{@1C!Q";
  const PASS = "thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents";
  let ok = true;
  const ck = (cond, msg) => { origLog("  " + (cond ? "PASS" : "FAIL") + "  " + msg); if (!cond) ok = false; };

  const fn = window.GoogleUnlock;
  ck(typeof fn === "function", "window.GoogleUnlock is a function");

  const wrong = await fn("wrong-passphrase-" + Date.now());
  ck(wrong === false, "wrong passphrase rejected");
  ck(seen.some(l => l.includes("Unlock passphrase rejected")), "warn emitted for wrong pass");

  const right = await fn(PASS);
  ck(right === true, "correct passphrase accepted");
  ck(seen.some(l => l.includes("Diagnostics unlocked for this session")), "info emitted on unlock");

  // unlocked session now behaves: diag lines gate is open (level 2 compiled default)
  origLog(ok ? "UNLOCK-UNIT: ALL PASS" : "UNLOCK-UNIT: FAILURES");
  process.exit(ok ? 0 : 1);
})();
