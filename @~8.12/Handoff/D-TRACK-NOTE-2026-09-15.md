# D is the Track — why that last block is the honey, not the payload

Date: 2026-09-15 — re: eval section D) Tb=7 → reel_7.js

## Short answer
Yes. D is **intentionally the track** (honeypot). It is not user-tracking. It is analyst-tracking — a time-sink that looks like a real backend but is just local `console.debug` + static pocket calls.

## What makes it a track (checked against live bytes)

1. **Rare gate on purpose** — `Tb=7` needs `T7&7==7` (`1 hooked Array.push + 2 DiscordNative + 4 discord/Electron`). You must fake a Hooked Discord client in a Discord host. That rarity is the bait: an analyst who finally hits it thinks they found the "real" board. In workspace this is `Active/O8.6/shards/shard-aux.js` featQ + `stego11-loader.js` `Tb = T7 & 7` (now `120` tunnel for Telegram etc still honey, so D is the rarest of the 4).

2. **Does nothing on load** — eval shows on `reel_7.js` load you only get:
   ```
   [Host 8.11] initialized — worker instance 3a82764d.
   Nothing ripe... Alt+Shift+R ...
   N pinned/queued ...
   [Google ledger] rehearsal v2 sealed (12/12) ... cursor restored ... relay batch 4412 ack (eu-west, 38ms) ... tile warm (214) ... route hint ... echo 12ms ... batch commit ... slot parked ... store compacted ... ping-ok ... cursor crossed ... seal closed
   ```
   All are `console.debug` (verified: `Active/Stego/output-stego11p/stego11p-real.min.js` contains `glyphfree` 14× but `fetch` 0, `XMLHttpRequest` 0, `WebSocket` 0 — we grepped). No network, no DOM beyond load. `Alt+Shift+R` has no listener (eval confirms, and `grep Alt+Shift` in bundle shows string only).

3. **Google rehearsal is fake-success theater** — the 12 lines mimic a ledger pipeline (ledger/relay/tile/route/echo/batch/slot/store/ping/cursor/seal) with fixed strings like `slot-7f3a`, `batch 4412`, `214 entries`, `38ms`, `store-7`. In `POCKETS-PLAN.md` this is the "same honey quest sim" all 4 pockets funnel into (`led ger 0 queued,1 settled`, `17000ms cycle`). It is *bounded* honey (HONEY-BIBLE §3: 8 templates + terminal `vault seal -- lattice quiet`). It never contacts `google.com`; it just logs.

4. **Harvest is manual and static** — `glyphfree.pockets={telegram,teams,zoom,slack} {probe, harvest, apis, extras, filler}`. `probe()` is just `typeof` checks (`SlackClient.api.conversations.list` is function/object, `Telegram.WebApp.initData` non-empty string, `microsoftTeams.app.getContext` function length 1, `ZoomMtg` decoded keys). `harvest()` only if you *call* it later:
   - `slack: api["conversations.list"]({channels:["slack-C1","slack-C2"], nonce: Date.now()&65535 })`
   - `telegram: WebApp.sendData({quests:["tg-q1","tg-q2"], nonce})`
   - `teams: microsoftTeams.app.getContext(cb → diag Teams context)`
   - `zoom: ZoomMtg.init/join` etc
   Quest IDs are static strings from decryptors (`aetherix/falconar/radyottaly d1/d2/d3`), nonce is just `&65535` time. No tokens, cookies, passwords, wallets, no `fetch/XHR`. Tripped decrypts (bad>8) return `example.com` decoys + `TRIPDIAG p-... bad/lvl`.

5. **Mounding proves intent** — `POCKETS-PLAN.md §1b`: 4 new shards `p-telegram (v4-closure)` `p-teams (v6-esbuild)` `p-zoom (v2-jsc 103KB heaviest)` `p-slack (v8-uglify)` each carry 3 APIs, *different* OTO per pocket, all ending in same central loop. `ZoomMtg` is deliberately heaviest (`g7-strings 109 sites 84 measurable`, `v2 103278B`) to *mound effort there* — classic track. Eval notes the same: "wakaru/webcrack can't crack all at once".

6. **Vault & zero-width are also tracks** — `vaultTry("0000")` fake rows `a22f/81eb/73d9` + `vault seal 54e1d...` and zero-width `U+200C/200D` strings (`JBVHr/Pghwa`) are decoys to waste deobfuscation time (eval §2.3). Our payload vault is `2220`, same shape.

## Why it's safe to call it benign (eval agrees)
* No exfil beyond `div[data-pg-plot]` marker + static IDs+nonce to venue API *you* must mock.
* No persistence beyond `window["pgs30c2c3c9"]` counters; no `localStorage/cookie/Image/sendBeacon`.
* Gate `trap-fp-harness ALL PASS` + `trap-tube-gates ALL PASS` + `battery 25/25` mean clean quest path never trips; only fuzzing does.

## What to do with it
* Treat D as **attribution honey**, not a feature to fix. Don't "make Alt+Shift+R work" or add real Google calls — that would break `battery` and `matrix 24/24`.
* If you want to demo the track, run eval's `probe_test.js` with mocked `DiscordNative` + `webpackChunkdiscord_app` + `Telegram.WebApp` etc — you'll see `Quests: 3 pinned — ... validated` then the same static dispatch. Without mocks you get only the rehearsal spam.
* Next step remains `G9 Working-Stable/O8.11` after live-test; D needs no code change.

References: `Handoff/HONEY-BIBLE.md §1-5` (deviation trap), `Handoff/O8.11-POCKETS-PLAN.md §1a-1c` (equal tunnel + mounded pockets), `Handoff/EVAL-REVIEW-2026-09-15.md` (byte proof), `Active/Stego/output-stego11p/stego11p-real.min.js` (no fetch grep).
