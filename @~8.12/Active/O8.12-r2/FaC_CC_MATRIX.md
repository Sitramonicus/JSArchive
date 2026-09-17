# FaC (Features and Changes) ↔ CC (Change Compilations) — O8.12-r2

**Terminology switch (per 2026-09-16):** `gate` → **FaC**, `bundle` → **CC**.  
**Legacy naming fix:** `Active/O8.6` is a bad name (it holds the `O8.12 Final-2026-09-15-#3` freeze, not 8.6). Proposal below to rename folder + files.

---

## 1. Folder / file rename proposal

| Current (bad) | Proposed (clear) | Reason |
|---|---|---|
| `Active/O8.6/` | `Active/O8-legacy/` or `Active/base-8.12/` | Holds `O8.12 Final #3` (1914KB), not 8.6. `O8.6` was the version before 8.11/8.12. Keeping `O8.6` confuses freeze vs version. |
| `Active/O8.6/final-package/O8.6-Final-final-bundle.js` | `Active/O8-legacy/final-package/O8.12-Final-#3-bundle.js` | File is 8.12 #3, not 8.6. |
| `Active/O8.6/final-package/O8.6-Final-compressed-*.js` | `Active/O8-legacy/final-package/O8.12-Final-#3-*.js` | Same. |
| `Active/O8.6/shards/` `Active/O8.6/oto/` | `Active/O8-legacy/shards/` `Active/O8-legacy/oto/` | Follow folder. |
| `Active/O8.12-r2/` | keep (correct: `r2` is the ripcord-2 work) | Will become `O8.12-r2 Final` on freeze. |
| `Active/O8.12-r2/final-package/O8.6-Final-*.js` | `Active/O8.12-r2/final-package/O8.12-r2-Final-bundle.js` | Currently writes `O8.6-Final` due to legacy `build-s4` template; should be `O8.12-r2`. |

**Action:** after you confirm, run:

```bash
mv Active/O8.6 Active/O8-legacy
# and patch all scripts: s/Active\/O8\.6/Active\/O8-legacy/g
# plus rename final files inside final-package
```

No code change besides paths; `seed-lib.js` already dual-reads both.

---

## 2. Version lineage — what changed when (8.6 → 8.9 → 8.12 → r2)

| Vers | Date | FaCs introduced | CCs shipped | Measurable / Bundle |
|---|---|---|---|---|
| **8.6** | — (base) | FaC-00 base engine (`shift/roster/extend/close`, `MemberCount`, `Host` 8.6/8.11) | CC-0 (plain) | — |
| **8.9** | ~2026-09-12 | FaC-01a dictionary 5k (5000 latin), FaC-04 G7 (per-shard `SKEY/C1/C2`, `TBL`, fiction, honey `SW_H=8/T=24`), FaC-05 OTO matrix (7 engines) | CC-G7 (oto/g7-strings), CC-OTO (v1/v2/v4/v5/v6/v7/v8) | 5 pockets ×1? first decoys |
| **8.11** | 2026-09-15 | FaC-05 OTO S1 rotation (`SEED('jso')` shuffle), FaC-03 ledger (`[Google ledger]` cheatsheet, same pool) | CC-OTO refresh | |
| **8.12 #3** | 2026-09-15 #3 | **FaC-06 RIPCORD** (OR `rcd`+`dbg`, `FNV 0xb5546f18/0xe79dbcf6`, `level 0→0,1→either?1:0,2→dbg?2:rcd?1:0`, `globalThis.会員`, 60s window, `view/res/ak` gated `level>=1`), FaC-02 pockets uniform **5** (`getAllGuilds`…`getDMChannels` etc, no `getAuthToken`), FaC-03 ledger 5 per pocket, FaC-07 S15 `ak@25s` last | **CC1 plain** (259KB stitched), **CC2 G7+OTO**, **CC3 Final** 1914KB (1378 raw→1913, 5k dict, G8 pins 7e6b2261…) — **25/25 PASS**, S12/S15 ALL PASS | 25 G7 (5×5), 1001 meas, 11 shards, dict 5000 |
| **r2 (now)** | 2026-09-16 | **FaC-01b balanced dict** (5288, 33% none/exclusive/mixed, hanzi/kanji/kana/hangul/hindi/tamil/khmer/cyrillic/greek/gothic/thai/cherokee/armenian/hebrew/ethiopic/thaana/IPA/full-width/invisibles valid, 0 fails), **FaC-02b uniform 6** (Discord moved out of `e` → new `p-discord` + `getGuild`, others +`WebApp.ready`/`app.getConfig`/`getCurrentUser`/`chat.postMessage` → 30 G7), **FaC-03b ledger everywhere** (5 logs in `a/m/n1/n2/aux/e/p-*`, not just pockets, same pool), **FaC-04 per-site** (adds `p-discord` 12th tag), **FaC-05b mound** (e stays `v1` hardest 1212KB, `p-zoom`/`p-telegram` intended >e via logic, `p-discord` now `v6` to break `v8,v8` dup), **FaC-01b fix** JSO `return`/`typeof` unicode space for supplementary-plane `𐌹` | **CC1 plain** 264KB (vs 256KB), **CC2 G7+OTO** 1070 meas (vs 1001), **CC3 Final** 2055KB (1508 raw, 1165 gzip, pins `d3d54777…`) — S0/S1/S3/S6/S11 PASS, S12/S15 boot but dummy pw fail (same as old) | 30 G7, 1070 meas, 12 shards, dict 5288 |

---

## 3. FaCs (Features and Changes) — r2 inventory

| FaC | Name | What it does | Files touched | Status |
|---|---|---|---|---|
| **FaC-01** | Dictionary — balanced unicode | 5288 (5k+runner) + 500 jso, 33% none (latin) / exclusive (pure script) / mixed (latin+script+ZWNJ/ZWJ), 18 scripts valid `ID_Start`, 0 `node --check` fails | `oto/identifiers-dictionary-*.csv` (both `O8-legacy` + `r2`) | **DONE** |
| **FaC-02** | Pocket uniformity 6 + Discord extraction | `e` generic `Object.values(pockets)` sweep, no `Discord.*`; new `p-discord` 6, others 6 (see table), 30 G7 | `shards/shard-e.js`, `shard-p-*.js` (12) | **DONE** (6/6, `node --check` OK) |
| **FaC-03** | Ledger — embed everywhere | 5 `Log.diag("[Google ledger] "+cheat)` same pool `ember ridge…` + `SEED('rcd-'+tag)` garbled via `FNV(851b28e5:rcd-tag→:decoy)` + `cover:true`, Google prefix, no per-call random, embedded not consolidated | `shards/shard-a/m/n1/n2/aux/e/p-*` (each 2–3 occurrences) | **DONE** |
| **FaC-04** | G7 per-site keys | `SEEDINT('g7-'+tag)` → distinct `SKEY/C1/C2`, `TBL`+`NREAL`, fiction `169`, `TUBE` order, `SW_H/T` honey | `oto/scripts/obf-strings-g7.js`, `oto/g7-strings/` 12 files, `census.json` 1070 | **DONE** |
| **FaC-05** | OTO mound & rotation | `e` stays `v1 JSO` 1212KB hardest, `p-zoom` `v2 JSC`, `p-telegram` `v4 closure SIMPLE`, rest `v5/v6/v7/v8` HIGH; heterogeneity 0 dups after `p-discord→v6` | `oto/v1-jso-s3matrix`, `v2-jsc`, `v4-closure`…`v8-uglify`, `oto/u`, `build-s4` | **DONE** (v1 1212, v2 93, v4 6.6 etc; size mound via logic, not raw KB) |
| **FaC-06** | RIPCORD gate — OR, 会員, upgrade | `shard-u.js` `FNV rcd/dbg`, `OR` no else-if, `globalThis.会員`, `60s` first mainOK, `level 0/1/2`, `shard-a.js` `main` via `OR`, `res/ak/view` `level>=1` | `shards/shard-u.js`, `shard-a.js`, `oto/g7-strings/shard-u/a.js` | **DONE** (from 8.12 #3, carried) |
| **FaC-07** | Supplementary gates S1–S6 | `Host` 8.12, `shift`, pacing, refill, etc. carry-over | `shards/shard-a/e/m/n1/n2/aux` | **DONE** (S0/S1/S3/S6/S11 PASS) |
| **FaC-08** | Build hardening | Dual `seed-lib` (`O8-legacy`/`r2` `851b28e5`), `build-s4` 12 shards, `return`/`typeof` unicode space fix, `EXPECTED_V2_M` repin `347e...`, `G8` pins | `oto/scripts/*`, `tools/stitch-o85.py` | **DONE** |

---

## 4. CCs (Change Compilations) — how FaCs ship

| CC | Name (old “bundle”) | FaCs compiled | Input → Output | Size / Check | Status |
|---|---|---|---|---|---|
| **CC-A** | Plain stitched (was Bundle1 G1+G2) | FaC-02 + FaC-03 + FaC-06 + FaC-07 (plain, no obfuscation) | `shards/*.js` (12) → `python tools/stitch-o85.py` → `/tmp/stitched-r2.js` | 264KB clean, 394KB g7, `node --check` 12/12 | **DONE** |
| **CC-B** | G7 + OTO (was Bundle2 G3+G4) | FaC-01 + FaC-04 + FaC-05 | `shards` → `obf-strings-g7.js` (1070) → `obf-v1` (e 1212KB) + `obf-v2` (p-zoom 93KB) + `minify-family` (v4/v5/v6/v7/v8) + `obf-u-canon` (u 10KB) | 60/60 OTO OK, `census.json` | **DONE** |
| **CC-C** | Final (was Bundle3 G5+G6+G7+G8) + S1–S6 | **All FaCs** + FaC-08 | `oto/*/shard-*-out.js` (12) → `build-s4-final-package.js` (S4 bundle 5k dict 5288, `controlFlowFlattening 0.25`, `return` fix) → `final-package/O8.12-r2-Final-bundle.js` + gzip/deflate + `SHA256SUMS` + `G8` pins `d3d54777,bb3c3a1c,2548f5b2` + `S1–S6` carry-over | 1508 raw → 2055 obf → 1165 gzip, `S0/S1/S3/S6/S11 PASS` (S12/S15 boot, dummy pw fail = same as old) | **DONE** |

**Single-command to finish r2 (after FaC/CC are green):**

```bash
# CC-A..C already built above. Re-green full battery vs ALL eras:
node Active/O8-legacy/oto/scripts/run-25pass-battery.mjs  # 25/25 old
node Active/O8.12-r2/oto/scripts/run-25pass-battery.mjs   # patch to check r2 (or run manual: node --check, grep forbidden, census)
CS_BUNDLE=Active/O8.12-r2/final-package/O8.12-r2-Final-bundle.js node Active/O8.12-r2/tools/chore-stress.mjs S0 7
# ... S1,S3,S6,S11 (all PASS below) then live test with real passwords:
CS_BUNDLE=Active/O8.12-r2/final-package/O8.12-r2-Final-bundle.js node Active/O8.12-r2/tools/chore-stress.mjs S12 7 <dbg> <res> <ak> <view> ripcord
CS_BUNDLE=... node ... S15 7 <dbg> <res> <ak> <view> ripcord
```

---

## 5. What remains to “finish r2” + live test

1. **Confirm folder rename** (`O8.6 → O8-legacy`) — you ok?
2. **CC-B tweak (optional, not blocking):** if strict “1–2 mounds >e by KB” needed, inflate `p-zoom` raw filler (add 40 `TranscriptionPhrases` → g7 20→80KB) or bump `obf-v2-jsc.js` `p-zoom` `deadCode/dispatcher/cFF` 0.01→0.2 to reach >1212KB. Current is **logic mound** (92 meas) — acceptable per #5.
3. **Re-pin checks vs ALL older eras:** `run-25pass` + `run-16point` should scan both `O8-legacy` and `r2` (currently `run-25pass` only scans `O8.6`). Patch to scan both.
4. **Live test:** run the two `chore-stress` lines above with real 5 passwords (dbg = FNV `e79dbcf6` unknown string, rcd=`ripcord`, res/ak/view = SHA poly). If you give me the 5 passwords I’ll run S12/S15 and show `ALL PASS`.

Say “rename ok” and whether you want the `p-zoom` KB mound, and I’ll finish CC-B/C and hand you the `O8.12-r2-Final-bundle.js` for live test.

