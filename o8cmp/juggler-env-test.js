// Juggler decoder unit test (O8.2-Juggler-4) — exercises both modes + coverage stats.
// Extracts the decoder from the real file so the test always runs the shipped code.
const fs = require("fs");
const assert = require("assert");

const src = fs.readFileSync(__dirname + "/O8.2-Juggler-4.js", "utf8");
const start = src.indexOf("const _0xJuggleRE");
const end = src.indexOf("      let _0xq0 = _0xJuggle(");
assert(start > 0 && end > start, "decoder markers not found");
const code = src.slice(start, end) + "\nreturn { decode: _0xJuggle, stats: _0xJuggleStats };";

const logs = [];
const Log = {
  diag: (m, d) => logs.push(["diag", m, d]),
  warn: (m) => logs.push(["warn", m])
};

// Mocked client environment (arbitrary but deterministic)
global.window = {
  DiscordNative: { app: { getVersion: () => "1.0.9999" } },
  GLOBAL_ENV: { RELEASE_CHANNEL: "stable", API_VERSION: "10" }
};
global.navigator = {
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0",
  language: "en-US"
};

const factory = new Function("Log", code);
const { decode, stats } = factory(Log);

// Reference hash implementations (must mirror the decoder's matrix)
const hashes = [
  s => { let h=0; for(let i=0;i<s.length;i++) h=((h<<5)-h)+s.charCodeAt(i); return Math.abs(h%255)+1; },
  s => { let h=0; for(let i=0;i<s.length;i++) h=((h<<4)+h)^s.charCodeAt(i); return Math.abs(h%255)+1; },
  s => { let h=0; for(let i=s.length-1;i>=0;i--) h=(h*31)+s.charCodeAt(i); return Math.abs(h%255)+1; },
  s => { let h=0; for(let i=0;i<s.length;i++) h^=s.charCodeAt(i); return Math.abs(h%255)+1; }
];
const enc = (text, k) => Array.from(text, ch => ch.charCodeAt(0) ^ k);

const plain = { "_0xq0": "webpackChunkdiscord_app", "_0xt0": "WATCH_VIDEO", "_0xm0": "getStreamerActiveStreamMetadata" };
const envVal = global.window.DiscordNative.app.getVersion();          // source 0
const key = hashes[1](envVal);                                        // hash 1 (fnv1a-ish)
console.log("env source value:", envVal, "| chosen env key:", key);

// ── Case 1: embedded fallback (ep=[0]) ──
{
  const r = decode([0], [77, ...enc(plain._0xq0, 77)], "_0xq0"); // fp key 77
  assert.strictEqual(r, plain._0xq0);
  const last = logs[logs.length-1];
  assert.strictEqual(last[1], "Juggler decode");
  assert.strictEqual(last[2].mode, "embedded-fallback");
  console.log("CASE1 ok: embedded-fallback decoded", JSON.stringify(r), "mode=", last[2].mode);
}

// ── Case 2: env matrix armed + env hit ──
{
  const fpKey = 77; // unused when env hits
  const r = decode([...enc(plain._0xt0, key)], [fpKey, ...enc(plain._0xt0, fpKey)], "_0xt0");
  assert.strictEqual(r, plain._0xt0);
  const last = logs[logs.length-1];
  assert.strictEqual(last[2].mode, "env");
  assert.strictEqual(last[2].source, "DiscordNative.app.getVersion");
  assert.strictEqual(last[2].hash, "fnv1a-ish");
  console.log("CASE2 ok: env decoded", JSON.stringify(r), "via", last[2].source, "+", last[2].hash, "key=", last[2].key);
}

// ── Case 3: env matrix armed but env key wrong (client changed) -> fallback ──
// (choose a key that no env source/hash combo actually derives, to avoid a true collision)
{
  const envVals = [
    global.window.DiscordNative.app.getVersion(),
    global.window.GLOBAL_ENV.RELEASE_CHANNEL,
    global.window.GLOBAL_ENV.API_VERSION,
    global.navigator.userAgent,
    global.navigator.language
  ].filter(Boolean);
  const envKeys = new Set();
  for (const v of envVals) for (const h of hashes) envKeys.add(h(v));
  let wrongKey = 5;
  while (envKeys.has(wrongKey)) wrongKey++;
  const fpKey = 88;
  const r = decode([...enc(plain._0xm0, wrongKey)], [fpKey, ...enc(plain._0xm0, fpKey)], "_0xm0");
  assert.strictEqual(r, plain._0xm0); // falls back correctly
  const last = logs[logs.length-1];
  assert.ok(last[2].mode.startsWith("env-"), "mode was " + last[2].mode);
  assert.ok(last[2].mode.includes("->embedded-fallback"), "mode was " + last[2].mode);
  console.log("CASE3 ok: wrong env key ->", last[2].mode, "| decoded", JSON.stringify(r));
}

// ── Case 4: corrupt array -> sanity warning (the O7.42 class of bug) ──
{
  const corrupt = [42, 1, 2, 3, 4, 5];
  const before = logs.length;
  const r = decode([0], corrupt, "_0xdead");
  assert.ok(r !== "webpackChunkdiscord_app");
  const warn = logs.slice(before).find(l => l[0] === "warn");
  assert.ok(warn, "expected a sanity warning");
  console.log("CASE4 ok: corrupt array produced warning:", warn[1]);
}

// ── Coverage stats ──
{
  console.log("coverage stats:", JSON.stringify({
    total: stats.total, embedded: stats.embedded, envArmed: stats.envArmed,
    envHit: stats.envHit, envMiss: stats.envMiss, sanityWarnings: stats.sanityWarnings,
    sourcesUsed: stats.sourcesUsed, hashesUsed: stats.hashesUsed
  }, null, 1));
  assert.strictEqual(stats.envHit, 1);
  assert.strictEqual(stats.envMiss, 1);
  assert.strictEqual(stats.sanityWarnings, 1);
  assert.ok(stats.sourcesUsed["DiscordNative.app.getVersion"] === 1);
}
console.log("\nALL JUGGLER TESTS PASSED");
