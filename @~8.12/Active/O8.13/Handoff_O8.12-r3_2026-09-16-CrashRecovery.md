# Handoff O8.12-r3 — 2026-09-16 03:50 Asia/Shanghai — Crash Recovery + Live-Test Prep

**Engine crash signs:** User reports signs similar to previous chat engine crash. Precaution: snapshot current state, ensure no stale live test, finish all prerequisites before live test, then evaluate improvement.

**Baseline:** O8.12-r2 `31ba1eae8645...` 1.9M bundle + 800×680 BMP → REPORT (7) 27-vector teardown. O8.12-r3 BUILD-SEED `851b28e5`, started 2026-09-16 02:25.

**What changed (sharding → oto → stego) — procedure flow intact:**

- **Shards (12):** Same 12 files, same pockets, same engine/shift/close semantics — no flow deviation, only content:
  - Dict 5288→3400 (13 `for` words fixed, now `node --check OK`), pcache 10%→65% (TextDecoder 179k→~1.2k), nFic 12%→18%, SWEEP 8/24→8/12 order-sensitive, honey 6→6+1 per pocket (+ engine honey), scratch 1.28MB dead→312KB functional (26KB×12, read during harvest), PINs `0xb554`→`parseInt("b554",16)`, ledger `"[Google ledger] "`→`fromCharCode`, 8 globals→1 indirect alias (kept compat), SHA len69→96-144 varPad, 60s jitter.

- **Oto (G7 + per-tag + build-s4):** Same flow `g7-strings → v1/v2/v4..v8 → u → stitch → obfuscate → gzip` — no deviation:
  - G7 rebuilt 12/12 OK (15.9KB-229KB, census 1082/254, was 1070/253), per-tag regenerated for r3 (v1 1.5M, v2 880K, v4-v8 11-34KB, 56/60 OK, 4 u CHECK expected), build-s4 rebuilt full hardened bundle **1.54MB** (`07b4a438...`) + gzip **838KB** (`38bb15...`) via 3400 dict + P trampoline (`controlFlowFlattening:false`, no `split("|")`) + O decoy `DICT_SPLIT 780×3`. Previous quick 319KB was a bypass — now replaced with proper 1.54MB hardened.

- **Stego:** Flow same `cover → embedReal → outer → target.md` — code ready, artifact pending:
  - Codec `stego-r3/stego3-codec.mjs` has `R3 1024×768` (2.3MB BMP, STRIP 98304, R_START 98358), `2-bit` + grain `H~2.0`, `RS` variable `base+FNV%20000`, ChaCha `r3_rng32` (no `0x6d2b79f5`), `r3_splitR9F` 4-way helper tested. BMP and outer still on 800/1-file — will flip to 1024 + 4-way for live test as user chose.

**Verification so far:**
- `node obf-strings-g7.js` 12/12 self-test OK, `vm OK`, `node --check OK`, `babel OK` after dict fix.
- `obf-minify-family.js` 56/60 OK, `obf-v1` 6/6 OK, `obf-v2` 7/7 OK, `obf-u-canon` OK.
- `build-s4-final-package.js` **PASS** 1.54MB in 5.1s, SHA `07b4a438...`, gzip 838KB.
- Quick stitch+obfuscate 319KB test also `vm/babel OK`.

**What was left out (intentionally, for after live test):**
- Experimentals C/H/X/Y/Z/G (5% conditional) and hurts D/E/F/I/J — parked per user.
- Stego artifact (BMP 1024 + 4-way outer) — code ready, not yet generated.
- Full battery patched to r3 paths — not yet run (battery scripts still point to `O8.6`).

**Next (live-test prerequisites, user approved 2026-09-16 03:4x):**
- Per-tag regen: **DONE** (this handoff)
- Stego: generate 1024 BMP + 4-way outer (next)
- Battery: full `25-pass` + `16-point` + `chore-stress S0-S15` + `redteam` patched to `O8.12-r3` (next)
- Then live test embed → browser check

**Backups for instant revert:**
- `oto/g7-strings-backup-pre-r3-20260916-025253` (12 files)
- `backups-pre-strict-20260916-030939` (shard-a, shard-u, build-s4, obf-strings-g7)
- Dict fix 13 words `for*` → `harbor*` etc., pinned `EXPECTED_V2_M 66c97257...` (was `347e...`)

**Seed:** `851b28e5` (kept).

**Files ready for live test:**
- `Active/O8.12-r3/shards/*.js` (12, with Q/T/U/W/V)
- `Active/O8.12-r3/oto/g7-strings/*.js` (12) + `census.json` 1082
- `Active/O8.12-r3/oto/v1-jso-s3matrix/` (6), `v2-jsc/` (7), `v4..v8/` etc.
- `Active/O8.12-r3/final-package/O8.12-r3-Final-bundle.js` 1.54MB + gzip 838KB
- `Active/Stego/stego-r3/stego3-codec.mjs` (R3)

**Procedure flow deviation?** Only the earlier quick 319KB test bypassed per-tag — now corrected, so **no deviation** from `shards → G7 → per-tag → stitch → obfuscate → gzip → stego → outer` for the live test.

---
*Teams sync note:* `microsoftTeams.getChannel` suggests replacing `getChannel` with `appInitialization.notifySuccess` per Teams SDK — run battery before changing, as you flagged.
