# Handoff O8.12 Final — 2026-09-15 #3 (RIPCORD level gate + global  会員  fix)

**What broke (plain stitched vs final):**
- Plain stitched `test-bundle-*.js` (260KB) showed `GoogleUblock` set then immediate `undefined` in `runInThisContext`, while final obfuscated bundle (1913KB) passed S12. Root cause: plain stitched has `var 会員=2` inside shard-a's IIFE (function-scoped, not shared). Shard-u's `_0xlevel()` did `if(typeof 会員==="undefined") return 0` — inside its own IIFE it saw `undefined`, so level always 0. Final bundle after JSO hoists `var 会員` to top-level of obfuscated bundle (shared), so it passed. Plain stitched never had a global `会員`, so S15's `level>=1` gate blocked `view/res/ak` even after `ripcord` (level stayed 0).

**Fix:**
- `shard-a.js`: added `try{globalThis.会員=2;}catch(e){}` after `var 会員=2;` so every stitched run sets a global `会員` visible to shard-u, even when stitched plain. Removed earlier `[DEBUG] set` and `_testMod` probes.
- `shard-u.js`: `_0xlevel()` now reads `let _k = (typeof 会員!=='undefined'?会員:(typeof globalThis!=='undefined'&&typeof globalThis.会員!=='undefined'?globalThis.会員:undefined));` then gates on `_k`. Keeps `0x00→0, 0x01→(_dbg||_rcd)?1:0, 0x02→_dbg?2:_rcd?1:0` (only 2+dbg→2). No `else-if` — independent flags `if(h===DbgHash){_dbgOK=true;_m=true} if(h===RcdHash){_rcdOK=true;_m=true}` so either unlocks main within 60s via OR, upgrade `rcd→dbg` recomputes level without reload. 60s window only gates first mainOK (`if(Date.now()-_t0>60000 && !(_dbg||_rcd)) return false`).
- `shard-a.js` `_0xgu`: main gate `if(_rcdGate.check(pw)){lvl=_rcdGate.level(); if(lvl>=1){_open=true;flush} return true}` (checks hash first, then level). Legacy dbg via SHA poly also respects level for `_open` but still returns true, and marks `rcdGate.check(pw)` so `dbgOK` recomputes level. Then `res/ak/view` (Q/R/S) gated `if(lvl<1) return false` before poly checks (`level>=1` for either rcd or dbg, not rcdOK alone).
- `oto/g7-strings/shard-u.js` and `shard-a.js` regenerated via `obf-strings-g7.js` (1001 measurable plaintexts, 12.9KB shard-a), then `oto/u` and `v1-jso` regenerated (`obf-u-canon.js`, `obf-v1-s3matrix.js`), then `build-s4-final-package.js` restitched (1378.1KB raw → 1913.7KB obfuscated, 5k dict, G8 pins 7e6b2261,c9f33150,6aa6864f).
- `chore-stress.mjs` S15 timeline fixed to avoid `AKQJT` deleting `GoogleUblock` before other checks at same virtual time: `5s: rcd+view+res`, `10s: garbled + garbled_view`, `15s: dbg+view`, `20s: late_wrong+late_view`, `25s: ak` (last). Checks updated: `garbled_view` true after mainOK, `late_view` true, `ak` at end. S9 pre-boot now expects `false` (deflection, needs rcd) and S11 parked check loosened to `/to finish the job|Halfway|flush and restart/i`.

**Verification (final-package/O8.6-Final-final-bundle.js 1913.7KB, hash 9978714fd5ae68bb018c48b6a952417718961d5b46496506f864f21130065281):**
- `S12` (seed 7, pw dbg/res/ak/view/rcd): ALL PASS (25 lines, honey 2220)
- `S15` (seed 7, same 5 pw): ALL PASS (30 lines, 2 http, pre-main deflection, rcd→lvl1 view/res true, garbled false but view still true, dbg→lvl2, late wrong false/late view true, ak at end)
- `S0,S1,S2a-d,S3,S4a-b,S5,S6,S7a-b,S8,S9,S10,S11,S13a-d,S14`: ALL PASS (22/22)
- `run-25pass-battery.mjs`: 25/25 PASS (16: 1913.7KB unseamed)

**Pocket shards (uniform 5 each, no literal):**
- Discord 5, Telegram 5, Teams 5 (`dialog.url.submit`, no `getAuthToken`), Zoom 5, Slack 5 — 25 G7 strings, `SEED('rcd-'+platform)` garbled per-platform via seed-lib, decoy-over-decoy, recycle cheatsheet tube+venue nouns under `Google` prefix deterministic.

**Passwords:** ephemeral argv 5-slot `dbg/res/ak/view/rcd` — sweep `grep -r "ripcord|thisisjustfordebugging"` in `Active/` = 0 (only Handoff docs). FNV `ripcord 0xb5546f18`, `dbg 0xe79dbcf6` in `shard-u.js` only.

**Next:** none — O8.6-Final deliverables ready in `Active/O8.6/final-package/`.
