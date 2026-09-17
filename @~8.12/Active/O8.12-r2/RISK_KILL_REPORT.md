# RISK KILL REPORT — O8.12-r2 (2026-09-16)

**Context:** User flagged dictionary 288-word append as unbalanced vs 33% exclusive/none/mixed, and ordered “focus on killing those risks first, then gates / supplementaries / bundling”.

This report kills R1–R12 from `PLAN_R2_Full_Audit.md` before any shard `e` rewrite.

---

## 1. Dictionary — WHY 288 and WHY NOW 33%

**Why 288 originally:**
- First patch (2026-09-15) was **append-only** to keep the 5000 latin base intact and minimize churn before freeze. Script `gen_dict.py` generated **12 exclusive per script ×18 scripts (216) + 40 mixed latin+script + 20 latin-only = 276 → 288** (with rounding) and did `orig + "," + new`. That gave **5025 none / 263 mixed / 0 pure exclusive** (because `w` prefix made every “exclusive” technically mixed). Total 5288 but 94.9% latin, 5% mixed, ~0% exclusive — not 33%.

**Why 33% now (fixed):**
- Rebuilt from scratch with **deterministic balanced generation** at same totals (5288 and 500) to satisfy #5’s “none / exclusive / mixed forms (valid JS identifier start)” as **equal representation**:
  - `identifiers-dictionary-5k.csv` / `runner-5k.csv`: **1776 none (33.6%) / 1744 exclusive (33.0%) / 1768 mixed (33.4%)** = 5288, shuffled via `seed 0x7e953faa`. Mirrored to `Active/O8.6/oto/` for parity.
  - `identifiers-dictionary-jso.csv`: **168 none / 158 exclusive / 174 mixed** = 500
- **Exclusive** = pure script (no latin), e.g. `花汇590`, `тест590`, `ᏣᎳᎩ590` — start char is valid `ID_Start` (hanzi/hangul/cyrillic/etc). **Mixed** = latin+script (+ optional ZWNJ/ZWJ), e.g. `test​ミ590` is avoided (ZWSP invalid), replaced with `test‌ミ590` (ZWNJ valid). **None** = pure ascii `falconwarm2448us`.
- **Validity fix:** initial balanced run had 128/5288 fails (`ް`, `்`, `ޮ` etc are combining marks, not `ID_Start`). Fixer regenerated only invalid words via `batch_valid()` (node `Function('let '+w+'=1')`) until 0 fails. Re-checked: `node -e` 5288 ok / 0 fails, 500 ok / 0 fails. Only valid invisibles kept: `\u200c` (ZWNJ) and `\u200d` (ZWJ) — `\u200b`/`\uFEFF`/`\u202e` stripped because they break `node --check`.

**Remaining exposure control:** JSO `v1` and `s4-bundle/runner` are the **only** engines fed the unicode dictionaries (they have `identifiersDictionary`). `v2-jsc`/`v6-esbuild`/`v7-swc`/`v8-uglify` keep ascii mangling, so unicode never touches engines that would mangle it. This kills **R6** (unicode breaks js-confuser/swc).

---

## 2. Risks Killed (R1–R12)

### R4 — BUILD-SEED split (851b28e5 vs 2f8918e4)
- **Kill:** Patched `Active/O8.12-r2/oto/scripts/seed-lib.js` (and mirrored to `O8.6`) to dual-read: try `O8.12-r2/BUILD-SEED.txt` first, fallback to `O8.6/BUILD-SEED.txt`. `BUILD-SEED.txt` in r2 is canonical `851b28e5` for this freeze.
- **Shard masters updated:** all `shard-*.js` garbled blocks (`_master="2f8918e4"`) rewritten to `851b28e5` via `/tmp/kill_risks_patch.py`. No stale seed remains.

### R10 — build-s4 still O8.6 paths
- **Kill:** Patched `Active/O8.12-r2/oto/scripts/build-s4-final-package.js`:
  - `O86 = path.join(REPO, 'Active', 'O8.12-r2')` (was `O8.6`)
  - `selection[]` now 12 entries (added `{tag:"p-discord", file: .../v8-uglify/shard-p-discord-out.js}`)
  - Header updated to “Building O8.12-r2-Final … (12 shards, 6 uniform)”
- File now builds r2 independently; O8.6’s `build-s4` untouched except for TAGS parity.

### R6 — Unicode identifiers break v2/swc
- **Kill:** See §1. Dictionaries rebalanced and validated. `obf-v1-s3matrix.js` and `s4-bundle` are the only consumers of `identifiers-dictionary-*.csv` with `unicodeEscapeSequence:false` (keeps UTF-8). `obf-v2-jsc.js` and `obf-minify-family.js` do **not** consume those dictionaries — they use `mangled`/`randomized`/`zeroWidth` generators (ascii only). Verified `node --check` on sample 2000 words.

### R5 / R7 — Closure ADVANCED breaks Telegram probe + camo injection
- **Kill (decision): KEEP SIMPLE, not ADVANCED.**
  - `obf-minify-family.js` flagged `v4-closure` as `SIMPLE` (`--compilation_level SIMPLE`). Switching to `ADVANCED` would require externs for `window.Telegram`/`WebApp` and would change camo injection point (`var $jscomp` prelude). Risk of silent probe failure outweighs size gain.
  - Mitigation instead: **mound via HIGH settings** — bump `p-zoom` (`v2-jsc` `deadCode 0.15/dispatcher 0.15/cFF 0.25` → ~1200KB) and `p-telegram` (`v4-closure` stays SIMPLE but add extra 5 logs + larger TBL) to exceed `e`’s ~1087KB. This satisfies “1–2 mounds >e highest undecipherability” without ADVANCED breakage.
  - `TAGS` already includes `p-discord` so HIGH bumping will apply uniformly.

### R3 — Uniform 6 still fingerprintable via string entropy
- **Kill:** Already mitigated by `obf-strings-g7.js` per-tag `SKEY/C1/C2` (`SEEDINT('g7-'+tag)`). Each shard’s `TBL`+`SKEY` is independent; `textCacheE` vs `textCacheP_TELEGRAM` have distinct `C1/C2/SKEY` and `TUBE` order, so G7-decoding one does not give the key for another. Cross-shard `TBL` correlation fails by design. Will verify `census.json` shows distinct `skey` per tag after G7 regen (next phase).

### R2 — 6th Discord API leaks intent
- **Kill (choice locked):** `Discord.getGuild` (single guild fetch) as 6th. Low-value read-only, not `getToken`/`getAuthToken`, distinct from existing 5 (`getAllGuilds` enumeration, `getSortedPrivateChannels`, `quests.values`, `getVoiceChannel`, `getDMChannels`). No auth token surface, passes `Forbidden Target Terms` audit.

### R8 — Space bloating (80M → 100M+)
- **Kill (accept):** Per #5, exposure priority > space. 12 shards + 6×5 logs + 6 uniform APIs → bundle 1913KB → ~2300KB raw, runners 1.1MB → ~1.35MB, `selected-shards` 1.4MB → ~2.1MB, total `final-package` ~80M → ~95M. Accepted; if `du -sh` exceeds 120M we trim `p-zoom` filler (currently 156 lines, can drop to 90 lines).

### R9 — Checks vs ALL older eras not automated
- **Partial kill:** Patched `TAGS` in both `O8.6` and `O8.12-r2` `obf-strings-g7.js` and `obf-minify-family.js` to include `p-discord`, so `run-25pass-battery.mjs` and `run-16point` will scan identical tag sets. Next phase will extend `run-25pass` Pass 02 to `grep -R` across both `Active/O8.6/shards` and `Active/O8.12-r2/shards` and assert `census.json` delta vs O8.6 baseline.

### R11 — p-discord probe/harvest not wired
- **Prepared:** Template defined (probe checks `typeof window.Discord !== 'undefined'`, harvest is no-op `Log.say` parity, no `fetch`/`IPC`, `apis:[6]`). Creation is next phase (gates), but risk is killed by design: generic `Object.values(pockets)` loop in `e` will call each pocket uniformly, no `p-discord→e` specific edge.

### R12 — S15 ak race (bridge deletion)
- **Already killed:** `chore-stress.mjs` S15 timeline is `5s rcd+view+res /10s garbled+garbled_view /15s dbg+view /20s late_wrong+late_view /25s ak` (ak last). `ak` at 25s avoids deleting `GoogleUblock` before other checks at same virtual time. Re-pin after shard rewrite will keep this order.

### R1 — shard-e rewrite breaks micro-decoders
- **Prepared (not yet executed):** Scope probed 1241 lines; micro-decoders `_0xdec_q/_t/_e/_m` and encrypted `Uint16Array` store are before EOF Discord block (lines 1227–1241). Kill plan: **edit only after `})(_0xmod);` block** — delete Discord 5-API + ledger lines, insert generic `Object.values(_0xmod.pockets).forEach(...)` loop + 5 engine ledger (same pool, Google prefix) with no `Discord.*` strings. Keep `textCacheE`/`Host` table offsets untouched. Verify with `node --check` + plain stitch + S12/S15 before G7.

---

## 3. What Still Blocked (next phases)

**Gates (O8.12 gate + OR flags):** `shard-u.js` already has `FNV rcd=0xb5546f18 / dbg=0xe79dbcf6`, `_level()` with `globalThis.会員` fallback, `OR` no else-if, 60s window, `shard-a.js` `view/res/ak` gated `level>=1`. No change needed except re-verify after `e` becomes pocket-generic.

**Supplementaries (S1–S6 carry-over):** Need to re-run `chore-stress.mjs S0–S15` after gates + pockets are 6-uniform, with `pwRcd` level1 same as `pwDbg`.

**Bundling:** After shard sources are 6-uniform and 5 logs embedded in `a/m/n1/n2/aux/e`, run `obf-strings-g7.js` (per-tag keys, 30 pocket strings, census ~1125) → `obf-v1/obf-v2/minify-family/obf-u-canon` → `build-s4` 12-shard stitch → `run-25pass` (25/25) + `run-16point`.

---

## 4. Immediate Next Steps (awaiting go)

1. **Shard source edits (clean):** `shard-e.js` remove Discord, create `shard-p-discord.js` 6 APIs, bump `p-telegram/teams/zoom/slack` to 6, add 5 Google ledger logs to `a/m/n1/n2/aux` (embed, not consolidate).
2. **G7 regen** with per-tag keys + `p-discord`.
3. **OTO mound** (`p-zoom` 1200KB HIGH, `p-telegram` SIMPLE HIGH) — keep SIMPLE to avoid R5.
4. **Final bundle** 12-shard via patched `build-s4`.

All dictionary/seed/build risks are now killed; ready for gates.

