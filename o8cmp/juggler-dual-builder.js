// ─────────────────────────────────────────────────────────────────────────────
// O8.2-Juggler-4 companion: dual-array builder (run THIS in the Discord client
// console, NOT in node — it must sample YOUR live environment values).
//
// What it does:
//   1. Samples the same 5 env sources x 4 hashes the runtime decoder uses.
//   2. Picks the source+hash combo whose key encrypts every plaintext with a
//      NONZERO first ciphertext byte (ep[0] === 0 would be read as "not armed").
//   3. Builds, for each of the 23 constants, an env-armed array
//      ([key, ...bytes]) plus a random-key embedded fallback ([rK, ...bytes]).
//   4. Prints ready-to-paste replacement lines for O8.2-Juggler-4.
//
// After replacing the 23 "let _0x… = _0xJuggle([0], …)" lines, the coverage log
// will show envDecoded: 23 (or envMiss counts if the client changed).
// ─────────────────────────────────────────────────────────────────────────────
(() => {
  const plain = {
    _0xq0: "webpackChunkdiscord_app",
    _0xq1: "DiscordNative",
    _0xq2: "/quests/",
    _0xq3: "/video-progress",
    _0xq4: "/heartbeat",
    _0xq5: "/applications/public?application_ids=",
    _0xt0: "WATCH_VIDEO",
    _0xt1: "PLAY_ON_DESKTOP",
    _0xt2: "STREAM_ON_DESKTOP",
    _0xt3: "PLAY_ACTIVITY",
    _0xt4: "WATCH_VIDEO_ON_MOBILE",
    _0xe0: "RUNNING_GAMES_CHANGE",
    _0xe1: "QUESTS_SEND_HEARTBEAT_SUCCESS",
    _0xm0: "getStreamerActiveStreamMetadata",
    _0xm1: "getRunningGames",
    _0xm2: "getGameForPID",
    _0xm3: "getQuest",
    _0xm4: "getAllThreadsForParent",
    _0xm5: "getSFWDefaultChannel",
    _0xm6: "flushWaitQueue",
    _0xm7: "get",
    _0xm8: "getSortedPrivateChannels",
    _0xm9: "getAllGuilds"
  };
  const entries = Object.entries(plain);

  const sources = [
    ["DiscordNative.app.getVersion", () => { try { return window.DiscordNative?.app?.getVersion?.() || ""; } catch (e) { return ""; } }],
    ["GLOBAL_ENV.RELEASE_CHANNEL", () => { try { return window.GLOBAL_ENV?.RELEASE_CHANNEL || ""; } catch (e) { return ""; } }],
    ["GLOBAL_ENV.API_VERSION", () => { try { return window.GLOBAL_ENV?.API_VERSION || ""; } catch (e) { return ""; } }],
    ["navigator.userAgent", () => { try { return navigator.userAgent || ""; } catch (e) { return ""; } }],
    ["navigator.language", () => { try { return navigator.language || ""; } catch (e) { return ""; } }]
  ];
  const hashes = [
    ["djb2-ish", s => { let h=0; for(let i=0;i<s.length;i++) h=((h<<5)-h)+s.charCodeAt(i); return Math.abs(h%255)+1; }],
    ["fnv1a-ish", s => { let h=0; for(let i=0;i<s.length;i++) h=((h<<4)+h)^s.charCodeAt(i); return Math.abs(h%255)+1; }],
    ["rev31", s => { let h=0; for(let i=s.length-1;i>=0;i--) h=(h*31)+s.charCodeAt(i); return Math.abs(h%255)+1; }],
    ["xor-sum", s => { let h=0; for(let i=0;i<s.length;i++) h^=s.charCodeAt(i); return Math.abs(h%255)+1; }]
  ];

  const enc = (text, key) => Array.from(text, ch => ch.charCodeAt(0) ^ key);
  const rnd = n => Math.floor(Math.random() * n) + 1;

  // Find combos that produce a key usable for every string (ep[0] !== 0 and sane range)
  const usable = [];
  for (let i = 0; i < sources.length; i++) {
    let v = "";
    try { v = sources[i][1](); } catch (e) {}
    if (!v) continue;
    for (let j = 0; j < hashes.length; j++) {
      const k = hashes[j][1](v);
      if (!(k > 0)) continue;
      const ok = entries.every(([, text]) => (text.charCodeAt(0) ^ k) !== 0);
      usable.push({ i, j, k, ok, sample: v });
    }
  }
  console.log("[Juggler-builder] env combos:", usable.map(u => `${sources[u.i][0]}+${hashes[u.j][0]} key=${u.k} usable=${u.ok}`).join("\n  "));

  const pick = usable.find(u => u.ok) || usable.find(u => u.i === 0 && u.j === 0);
  if (!pick) { console.error("[Juggler-builder] no env source available — env matrix cannot be armed."); return; }
  if (!pick.ok) console.warn("[Juggler-builder] WARNING: chosen combo has a leading-zero ciphertext byte for some string; that string will fall back (visible in coverage log).");

  const key = pick.k;
  console.log(`[Juggler-builder] using env key ${key} (${sources[pick.i][0]} + ${hashes[pick.j][0]})`);

  const out = entries.map(([name, text]) => {
    const ep = enc(text, key);
    const rK = rnd(255);
    const fp = [rK, ...enc(text, rK)];
    return `let ${name} = _0xJuggle([${ep.join(", ")}], [${fp.join(", ")}], "${name}");`;
  });

  console.log("[Juggler-builder] paste the following 23 lines over the existing array block in O8.2-Juggler-4.js:\n");
  console.log(out.join("\n"));
})();
