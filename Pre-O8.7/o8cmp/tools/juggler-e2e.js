// End-to-end: builder (mock env) -> dual arrays -> O8.2-Juggler-4 decoder -> 23/23 env hits.
const fs = require("fs");
const assert = require("assert");

// 1) mock env (must match builder sampling)
global.window = {
  DiscordNative: { app: { getVersion: () => "1.0.9999" } },
  GLOBAL_ENV: { RELEASE_CHANNEL: "stable", API_VERSION: "10" }
};
global.navigator = {
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0",
  language: "en-US"
};

// 2) run the builder with captured console
const captured = [];
const origLog = console.log, origWarn = console.warn;
console.log = (...a) => captured.push(a.map(String).join(" "));
console.warn = (...a) => captured.push("WARN " + a.map(String).join(" "));
const builderSrc = fs.readFileSync(__dirname + "/juggler-dual-builder.js", "utf8");
new Function(builderSrc)();
console.log = origLog; console.warn = origWarn;

const flat = captured.flatMap(l => l.split("\n"));
const arrayLines = flat.filter(l => /^let _0x\w+ = _0xJuggle\(\[/.test(l));
assert.strictEqual(arrayLines.length, 23, "builder should emit 23 lines");
console.log("builder emitted 23 array lines");

// 3) extract decoder from J-4 and decode each armed array
const src = fs.readFileSync(__dirname + "/../builds/O8.2-Juggler-4.js", "utf8");
const start = src.indexOf("const _0xJuggleRE");
const end = src.indexOf("      let _0xq0 = _0xJuggle(");
const code = src.slice(start, end) + "\nreturn { decode: _0xJuggle, stats: _0xJuggleStats };";
const logs = [];
const Log = { diag: (m, d) => logs.push(d), warn: (m) => logs.push({ warn: m }) };
const { decode, stats } = new Function("Log", code)(Log);

const plain = {
  _0xq0: "webpackChunkdiscord_app", _0xq1: "DiscordNative", _0xq2: "/quests/", _0xq3: "/video-progress",
  _0xq4: "/heartbeat", _0xq5: "/applications/public?application_ids=", _0xt0: "WATCH_VIDEO",
  _0xt1: "PLAY_ON_DESKTOP", _0xt2: "STREAM_ON_DESKTOP", _0xt3: "PLAY_ACTIVITY", _0xt4: "WATCH_VIDEO_ON_MOBILE",
  _0xe0: "RUNNING_GAMES_CHANGE", _0xe1: "QUESTS_SEND_HEARTBEAT_SUCCESS", _0xm0: "getStreamerActiveStreamMetadata",
  _0xm1: "getRunningGames", _0xm2: "getGameForPID", _0xm3: "getQuest", _0xm4: "getAllThreadsForParent",
  _0xm5: "getSFWDefaultChannel", _0xm6: "flushWaitQueue", _0xm7: "get", _0xm8: "getSortedPrivateChannels",
  _0xm9: "getAllGuilds"
};

let envHits = 0, modeEnv = 0, before = logs.length;
for (const line of arrayLines) {
  const m = line.match(/let (_0x\w+) = _0xJuggle\(\[([0-9, ]+)\], \[([0-9, ]+)\], "_0x\w+"\);/);
  const ep = m[2].split(",").map(Number), fp = m[3].split(",").map(Number);
  const got = decode(ep, fp, m[1]);
  assert.strictEqual(got, plain[m[1]], `${m[1]} mismatch`);
}
const decodeLogs = logs.slice(before).filter(d => d.mode);
modeEnv = decodeLogs.filter(d => d.mode === "env").length;

console.log(`decoded 23/23 correctly | env-mode logs: ${modeEnv}/23`);
console.log("coverage:", JSON.stringify({
  total: stats.total, embedded: stats.embedded, envArmed: stats.envArmed,
  envHit: stats.envHit, envMiss: stats.envMiss, sanityWarnings: stats.sanityWarnings,
  sourcesUsed: stats.sourcesUsed, hashesUsed: stats.hashesUsed
}));
assert.strictEqual(stats.envHit, 23, "all 23 should decode via env when armed with matching env key");
assert.strictEqual(stats.envMiss, 0);
assert.ok(stats.sourcesUsed["DiscordNative.app.getVersion"] >= 1);
console.log("\nE2E PASSED: builder + armed arrays + decoder agree on all 23 constants");
