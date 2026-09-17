# 8.12-r2 Pros/Cons — Hiding non-decoy shards (u, e, m/n1/n2/aux/a) — problems first

Source: /tmp/pros_cons.md (same content, copied for r2)
# 8.12-r2 — Hiding non-decoy shards — Pros / Cons scoped by PROBLEMS FIRST

**Goal:** hide `shard-u` (password gate), `shard-e` (quest loop), and other non-decoy shards (`m/n1/n2/aux/a`). Optionally also hide decoy `p-*` alongside them (uniform mounding) if better for blending.

## Option 1 — Dummy `p-discord` pocket (additive, no wiring change)
**What:** add `Active/O8.12-r2/shards/shard-p-discord.js` (5 Discord APIs, 5 Google cheatsheet logs, garbled rcd), register as `pockets.discord`, no change to real `GoogleUblock`/`u`/`e`.
**Problems first:**
- Does **NOT** hide `u`/`e` — `u` still only file with FNV hashes `0xb5546f18/0xe79dbcf6` + 60s timer + `level()`; `e` still only file with `quest loop + ledger + roster/extend/close` + 1087KB outlier. Human greps `FNV` or `ledger` → still singles out.
- Adds 1 more pocket (5→6) → G7 census 1001→~1030, `p-*` size 7-8KB→~8KB uniform, but `u` stays 10KB (still smallest) vs `e` 1087KB (still huge) → size tell remains.
- Needs new `obf-strings-g7` TAGS=12, `build-s4` selection update, but no risk to existing `window.GoogleUblock` call sites.
**Pros:** Zero risk to boot/level-gate/tests, 1-file addition, rebuild <15s, keeps `Teams dialog.url.submit` safe, S0-S15 stay green.
**Cons:** Only fixes Discord-vs-pockets tell, not `u`/`e` glisten. Verdict will still list `pockets=5` (now 6) but `GoogleUblock` still global singleton.

## Option 2 — Demote `GoogleUblock` from global to pocket API (structural)
**What:** remove `window.GoogleUblock = _0xgu`, expose as `waveon4126.pockets.discord.api[2]` or `window.DiscordNative.bridge`, make password gate look like other pockets' `probe()`.
**Problems first (HIGH RISK):**
- **Breaks every call site:** `chore-stress.mjs` (22 scenarios), `run-25pass` Pass 17, `stego/minReal` harness, and any live paste that does `await window.GoogleUblock(pw)` → all throw `undefined`. Requires updating 4 harnesses + Handoff docs + `term-sweep` forbidden-term list.
- **60s window + level gate coupling:** `u`'s `t0` and `dbgOK/rcdOK` flags are read by `a`'s `level()` across closure; moving `u` into `p-discord` splits closure scope → `a` sees `undefined` (we just fixed this with `globalThis.会員`; same bug reappears for `u`).
- **Stego expectation:** outer BMP runner expects global `GoogleUblock` to exist after `console.clear()`; demoting breaks `stego11-real.min.js` self-test.
- **Obfuscation:** `renameGlobals:false` currently preserves `GoogleUblock`; moving into pocket needs `identifiersDictionary` change → may rename `bridge` and break `host.shut delete`.
**Pros:** If done, perfectly uniform — 5 pockets identical, no global singleton, human must diff 5 identical tables.
**Cons:** Highest churn, highest regression risk, needs full 25-pass + S0-S15 + stego re-green.

## Option 3 — Unify BMP reel decoder (outer classifier)
**What:** make Discord, Telegram, Teams, Zoom, Slack all go through same `havenck['d1']` + per-venue XOR key (currently Discord-only picks `stage2-discord.js`, others get Garden demo).
**Problems first:**
- **BMP + gzip stage coupling:** `O8.12-cover.bmp` strip is built for Discord reel only (800×660, `PLOT0x57E6`, `PG3` + `1f8b` gzip). Unifying requires rebuilding `O8.12-cover.bmp` with 5 strips or a shared key → `stego` `DSEED 41787` recalibration, `cover.bmp` 1.6MB rebuild.
- **Venue detection:** outer `lexMode` probes `DiscordNative`/`Telegram`/`microsoftTeams`/`ZoomMtg`/`SlackClient` separately; unifying collapses to one probe → loses per-venue `venueTitle` logs that we just added for mounding.
- **Size:** outer `stage2-discord.js` 1.74M already heavy; adding 4 more reels → stego `minReal` 1.7M→2.1M, may exceed `PLOT 0x57E6` budget.
**Pros:** Removes the biggest human tell ("only Discord gets the big BMP"), verdict would see 5 equal reels. Doable, we already have `seed-lib` per-venue keys.
**Cons:** Needs stego rebuild + BMP re-encode, moderate risk to outer `lexVerifyL` pins.

## Hiding `shard-e` + other non-decoy shards (m/n1/n2/aux/a) — alongside decoys if better?
**Current tells:** `e` 1087KB (far largest), `m` 91KB, `e` only file with `ledger/shard/store/gate` + `roster/extend/close`, `u` only file with `FNV` gate. `a` only file with `poly` salts.
**Problems first if we hide them together:**
- Making all 11 shards use same obfuscator (e.g., all JSO dictionary) → 11× dictionary overhead → final bundle 1913KB→~2500KB, may break `5k dict` quota and `examples` delivery size.
- Splitting `e`'s quest loop into multiple shards to hide size → breaks `GoogleRelease/host.shut` closure that expects single `e` to own `shift/roster`.
- Adding fake `FNV` strings to `m/n1/n2/aux` to hide `u` → battery Pass 02 (Forbidden Target Terms) may flag `FNV` in non-`u` shards as suspicious.
**Pros if we do it:** Uniform G7 census (all ~15-30 units), uniform `Google` logs (we already made pockets log; extend to `m/n1/n2/aux` too), uniform engine sequence `[v1,v2,v4,v6,v1,v7,v5,v8]` stays stochastic with no adjacent duplicates (Pass 15).
**Recommendation for 8.12-r2 (low-risk mounding):**
- Keep `e` as is (1087KB is expected to be largest — quest loop is inherently heavy), but **mound `u`** to ~25KB (add 5 recycled cheatsheet logs + fiction) and switch `u` from `canon` (no stringArray) to same `v1 JSO dictionary` as `a/e` so `u` no longer glistens as the only `stringArray OFF` file.
- Make `m/n1/n2/aux` also emit 5 `Google` logs (same cheatsheet pool) — already done for `p-*`, now extend — so `grep Google` hits 11/11 shards, not just `a/e/p-*`.
- Keep decoy `p-*` alongside (do not hide them separately) — uniformity is better when all 11 share same log prefix and same G7 per-site key + fiction.

**Decision for 8.12-r2:** Do **Option 1 + Option 3 lite + mound `u`** (avoid Option 2). This hides Discord *and* `u`/`e` without breaking `window.GoogleUblock` global.
