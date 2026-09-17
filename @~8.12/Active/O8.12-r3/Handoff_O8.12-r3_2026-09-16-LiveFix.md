# Handoff O8.12-r3 — 2026-09-16 04:15 Asia/Shanghai — Live Fix Pass

## TL;DR ELI5
- **Before:** You pasted `O8.12-runner.js` → `[Host 8.12] initialized` ✅ but `await GoogleUblock("ripcord")→false` ❌ + `Storage quota exceeded console-history 52MB`.
- **Why:** The new R3 shards added a `312KB scratch` (26KB×12) that is read during harvest and logged via `Log.diag("scratch …")`. Combined with the 1.28MB `operationData` bulk, the obfuscator (JSO) mangled a `textCache` helper name into `��R0` (corrupted surrogate pair) → `TypeError: Cannot read properties of undefined (reading '��R0')` before the ripcord gate could ever set `_rcdOK`. So the gate stayed `false` even within 60s. The 52MB console-history was the same bulk being `JSON.stringify`'d to `console.debug` when `lexMode` was wrong.
- **Fix:** Rolled shards back to **R2's proven 12 files** (no per-shard scratch, direct `globalThis.lexMode`), kept the **new seed `851b28e5`** and **new per-tag pipeline** (v1/v2/v4..v8 rebuilt). Rebuilt final bundle `1.32M (bcf9f7d...)` + Terser-min `1.19M` → stego `800×680` 74% slots `b017979...` / `2ed2c37...`. Direct `chore-stress S15/S12` now **ALL PASS** (31/26 lines). Stego's `minReal` also passes via `CS_BUNDLE=stego11p-real.min.js`.
- **What changed vs R3 plan:** Dict stays `5288` (not 3400) for final bundle; `3400` already lives in `runner-5k.csv` for hunter. `V` (indirect lex) is still safe but we kept direct for this freeze to guarantee live. `Q` scratch, `W` honey, `U` ledger `fromCharCode` are still in plan but deferred to R3.1 after 1024 split is proven.
- **Live retest:** Paste **`/Active/Stego/stego-r3/output/O8.12-runner.js`** (2.3M chars) + drop **`O8.12-cover.bmp`** (1.6M, 800×680) via the usual `ctxt.io` loader. Within 60s: `await GoogleUblock("ripcord")` → `true` (level 1), `await GoogleUblock("wertyuiopasdfghjklzxcvbnm")` → `true`, `await GoogleUblock("thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents")` → `true` (level 2 upgrade). Console-history should be `<100KB`, not 52MB.

## Artifacts (live)
- `Active/O8.12-r3/final-package/O8.6-Final-final-bundle.js` — 1,359,? actually 1,328.4KB `bcf9f7d69530fe9fe974b1fc3ce4fbad887db3e80291bbb3a986de81e96f2fe8` + gzip 781.8KB
- `Active/O8.12-r3/final-package/O8.6-Final-compressed-gzip.js` 782.9KB
- `Active/Stego/stego-r3/output/O8.12-cover.bmp` — 1,632,054B `b0179799e967d05f0e6684d109f956dd22d66f7bb4631e3e13bc1b777148a11d` 800×680×24 (photo speck preserved, seed `0x996998a3`)
- `Active/Stego/stego-r3/output/O8.12-runner.js` — 2,342,598 chars `2ed2c37ea81b804b06f59b3b8219baa70419f7a824456b57caca110c699f026d` reel 7, pins `950ad74e,c3f4590b`, line1 `var 会員=2; var 名="佐藤 結衣"; console.clear();`
- `Active/Stego/stego-r3/output/stego11p-real.min.js` — 1,194,979 `minReal` (Terser, G8 repinned `a92938c0,24dcc67,a14b8ff3`) — this is what the runner extracts at `tileFeed:true`; also passes S15
- `Active/Stego/stego-r3/output/rotation.json` — `o812 7e953faa`

## Verification
```
CS_BUNDLE=Active/O8.12-r3/final-package/O8.6-Final-final-bundle.js node Active/O8.12-r3/tools/chore-stress.mjs S15 7 thisisjust... resurgence AKQJT werty... ripcord  → ALL PASS (31 lines)
CS_BUNDLE=Active/O8.12-r3/final-package/O8.6-Final-final-bundle.js node Active/O8.12-r3/tools/chore-stress.mjs S12 7 ... → ALL PASS (26 lines)
CS_BUNDLE=/tmp/stego-test-800/stego11p-real.min.js node Active/O8.12-r3/tools/chore-stress.mjs S15 7 ... → ALL PASS
node Active/Stego/build-stego12-r2.mjs Active/O8.12-r3/final-package/O8.6-Final-final-bundle.js Uploads/stego2-cover.bmp /tmp/stego-test-800  → 74.07% slots, PSNR pinned
```
Live gate math verified: `FNV1a("ripcord")=0xb5546f18`, `FNV1a("thisisjust...")=0xe79dbcf6`, `parseInt("b5546f18",16)===0xb5546f18`, jitter `2806` window `62806`. `window.GoogleUblock` now returns `true` at `会員=2`.

## Why not 1024 yet (exposure > space, per #5)
- 800×680 is the **photo you shipped** (`384da102...`) — analysts already fingerprinted it, but we preserve its speck exactly (FY perm, seed `996998a3`, no row-41 uniform). 1024×768 (`2.3M`) is larger (more space) but gives **film grain** (first 32 rows dithered) and **variable RS** (`base+FN+seed%4096`) breaking `H3.993` and `step 98400` tells. That's strictly better for hunter, but needs **2-bit split** (781K*4=3.1M >2.26M) → two reels `380KB+380KB` + new `R9F 4-way` outer. Code is ready (`r3_embedReal`, `r3_variableRS`, `r3_rng32`), but needs a second stego build + outer `target.md` split. For this live fix we kept **800 4-bit** to keep the chain `sharding→oto→stitch→obf→gzip→stego→outer` intact and verifiable in <5s. Next freeze will flip to `1024 2-bit + 4-way R9`.

## Next (after you confirm live `true`)
1. Re-introduce `V` (indirect lex) and `U` (ledger `fromCharCode`) one shard at a time, rebuild per-tag, re-run S15 — they were not the culprit, so they can return.
2. Re-introduce `Q` scratch **without** `Log.diag` flood (keep `Uint8Array` + `_sqSum` but don't `diag` the sum, or `diag` only when `lexMode===0` & `cover:true`).
3. Flip dict `5k 5288→3400` for final bundle (currently only runner is 3400) and rebuild `v1` (1.0M→ ~800K) — will drop token entropy `765→420`.
4. Build `1024×768` 2-bit + 4-way outer, generate `target.md` loader split `R9F[0..3]`.

## Files to paste for live
- `Active/Stego/stego-r3/output/O8.12-runner.js` — paste entire file in DevTools console (starts `var 会員=2; var 名="佐藤 結衣"; console.clear();`)
- `Active/Stego/stego-r3/output/O8.12-cover.bmp` — host at your `ctxt.io`/`githubusercontent` slot (or use `/Uploads/stego2-cover.bmp` if you keep single BMP URL — the runner fetches `O8.12-cover.bmp` relative, so host it next to runner or patch loader's `fetch('O8.12-cover.bmp')` to your URL)
- Within 60s: `await GoogleUblock("ripcord")` and `await GoogleUblock("wertyuiopasdfghjklzxcvbnm")` and `await GoogleUblock("thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents")`

## Backups
- Failing R3 shards + dict 3400 are in `Active/O8.12-r3/oto/g7-strings-backup-pre-r3-*` and `/home/user/Active/O8.12-r3/backups-pre-strict-*`; failing stego was `Active/Stego/stego-r3/output/O8.12-cover.bmp` `fa56f3ee...` (800 79% but with scratch). Current passing stego overwrote it; failing BMP is still in `/tmp/stego-test-800`? Actually old failing is in `Active/Stego/output-stego12-r2/O8.12-r2-cover.bmp` etc. Keep for diff.
