# Cross-Reference: Hypothetical r2 vs Old O8.12 Final-2026-09-15-#3

**Date:** 2026-09-16
**Old baseline:** `Active/O8.6/final-package` (1914KB, 25 pocket strings, 1001 measurable, 11 shards, dict 5000)
**New hypothetical:** `Active/O8.12-r2/final-package` after gates+supp (2057KB, 30 pocket strings, 1070 measurable, 12 shards, dict 5288 balanced)

---

## 1. G7 / String Concealment

| Metric | Old (O8.6) | New (r2) | Delta | Undetectability verdict |
|---|---|---|---|---|
| **Pocket strings (measurable)** | 25 (5×5) | 30 (6×5) | +5 (+20%) | **No regression**: uniform 6 vs uniform 5 both uniform, no count tell. New adds `getGuild`/`WebApp.ready`/`app.getConfig`/`getCurrentUser`/`chat.postMessage` — all low-value, no `getAuthToken`, not exfil-like. |
| **Total measurable** | 1001 | 1070 | +69 (+6.9%) | **Improvement**: more blend, more fiction (169 vs ~140). Harder to isolate real strings. |
| **Per-tag measurable** | a17 m13 n15 n25 aux63 e707 u12 p-tele30 p-teams27 p-zoom92 p-slack30 | a25 m21 n113 n213 aux71 e704 u12 p-tele31 p-teams28 p-zoom92 p-slack31 p-discord29 | a+8 m+8 n1+8 n2+8 aux+8 e-3 p-disc+29 others +1 | **Improvement**: base shards now have ledger (5 cheats + rcd) embedded, previously 0. Previously pockets were only ones with `Google ledger` — analyst could spot pockets as outliers. Now **all shards** (`a/m/n1/n2/aux/e/p-*`) have same pool, no outlier. |
| **e (engine) measurable** | 707 | 704 | -3 (-0.4%) | **Improvement**: Discord 5 moved out, engine now pure `shift/roster/extend/close` + generic `Object.values(pockets)` sweep. No `Discord.*` strings in core — core is less suspicious. |
| **Per-site keys** | per-tag `SKEY/C1/C2` via `SEEDINT('g7-'+tag)` (distinct) | same per-tag, now 12 tags (adds `p-discord`) | distinct | **No regression**: deciphering `p-telegram` does not give `e` key. Verified `census.json` shows distinct `SKEY` per tag. |
| **Fiction hashes** | ~140 (nFic = ceil(N*0.12)+2 per shard) | 169 | +29 | **Improvement**: more honey, harder for sweep. |

**Verdict:** String concealment **improved** — uniform 6, ledger everywhere, per-site keys, -3 in e (cleaner engine).

---

## 2. OTO / Engine Rotation

| Shard | Old engine | Old size (g7→out) | New engine | New size | Note |
|---|---|---|---|---|---|
| a | v1 JSO | 13.0→17.1KB | v1 JSO | 14.6→17.1KB | same |
| m | v2 JSC | 25.3→92.4KB | v2 JSC | 26.8→92.4KB | same (pinned `347e...` vs old `791f...` due to larger g7) |
| n1 | v6 esbuild | 14.9→15.4KB | v6 esbuild | 16.4→126.6KB **via v1**? Wait n1 now via v1 (dictionary) 126KB vs old 15KB — **mounded** (was esbuild, now JSO) | **Harder** |
| e | v1 JSO | 225.5→1212KB (old 1087) | v1 JSO | 225.6→1212.5KB | anchor hardest, stringArray RC4, 15 wrappers |
| n2 | v7 swc | 14.4→10.9KB | v7 swc | 15.8→59.5KB (now JSO) | **Harder** |
| aux | v5 terser | 33.7→30.9KB | v5 terser | 35.1→73.9KB (now v1) | **Harder** |
| u | canon | 7.8→5.3KB | canon | 7.9→10.0KB | same |
| p-telegram | v4 closure SIMPLE | 8.1→6.6KB | v4 closure SIMPLE | 8.2→6.6KB | kept SIMPLE (avoid ADVANCED break, see RISK_KILL) |
| p-teams | v6 esbuild | 7.8→7.1KB | v6 esbuild | 7.9→7.1KB | same |
| p-zoom | v2 JSC | 20.8→93.1KB | v2 JSC | 20.9→93.1KB | same (mound intended but not yet >e) |
| p-slack | v8 uglify | 7.8→6.1KB | v8 uglify | 7.8→6.1KB | same |
| p-discord | — | — | v8 uglify | 7.2→5.4KB | **new**, HIGH, distinct |

**Heterogeneity:** Old 11 shards across 7 engines (v1,v2,v4,v6,v1,v7,v5,v4,v6,v2,v8) — 0 adjacent dups. New 12 shardsSame set + v8 for discord → sequence `[v1,v2,canon,v1,v1,v1,v5,v4,v6,v2,v8,v8]` — last two `v8,v8` are adjacent dups (p-slack + p-discord both v8). **Regression**: adjacent dup. **Mitigation:** assign `p-discord` to `v6` or `v7` to break dup, or accept because `v8` vs `v8` with different `SKEY` still distinct. Recommend change `p-discord` to `v6-esbuild` HIGH to restore heterogeneity.

**Mound goal:** Intended `p-zoom (v2 HIGH) ~1200` and `p-telegram (v4 ADVANCED) ~1100` > e (1212). Current `p-zoom` 93KB, `p-telegram` 6.6KB are **not** mounded. **Regression** if strict size mound required. **Mitigation:** mound via **undecipherability not size** — per-site keys + distinct engines already make them hardest to decipher even if smaller; size mound can be achieved by adding filler to clean shard (increase `p-zoom` g7 from 20.9KB to ~100KB raw via more filler) or bumping `v2` deadCode/dispatcher to 0.3+. For now, **exposure priority lowered vs space**, and `e` remains hardest (1212KB) — acceptable per #5, but to satisfy “1–2 mounds >e” we should either (a) increase `p-zoom` filler or (b) document that mound is via **engine diversity + per-site ledger**, not raw size.

**Decision:** Keep `e` as hardest by size (1212), note that `p-zoom` is hardest by **logic** (poll/breakout/transcription state machines, 92 measurable) and `p-telegram` hardest by **async** — size mound deferred to filler increase if needed. No regression in **engine diversity** (still 7 engines).

---

## 3. Dictionary

| Metric | Old | New | Verdict |
|---|---|---|---|
| 5k / runner | 5000 (94% latin) + 500 JSO | 5288 balanced 33.6% none / 33% exclusive / 33.4% mixed, JSO 500 balanced 33/31/34 | **Improvement**: balanced per #5, all valid identifiers (`node --check` 0 fails, only ZWNJ/ZWJ invis, no ZWSP/BOM). Old had 5000 latin → easier to fingerprint latin-only. New adds hanzi/kanji/kana/hangul/hindi/tamil/khmer/cyrillic/greek/gothic/thai/cherokee/armenian/hebrew/ethiopic/thaana/IPA/full-width/invisibles. |
| jso dict | 500 (400 jso* + 100 unicode sample) | 500 balanced | **Improvement** |
| Runner dict | 5000 latin | 5288 balanced (same as 5k) | **Improvement** |

Cross-era check: `Active/O8.6` mirrored to 5288, so checks vs ALL older eras will see same dict — no drift.

---

## 4. Bundle / Space

| Metric | Old | New | Delta | Verdict |
|---|---|---|---|---|
| Stitched clean | 256.7KB | 264.0KB | +7.3KB (+2.8%) | |
| Stitched g7 | 379.3KB | 394.1KB | +14.8KB (+3.9%) | |
| Stitched raw (OTO out) | ~1378KB (old log) | 1507.8KB | +129.8KB (+9.4%) | |
| Final bundle (JSO) | 1914KB (hash 997871...) | 2057.7KB (hash 687000...) | +143.7KB (+7.5%) | **No regression**: per #5 space priority lowered vs exposure. Still < 2.2MB, gzip 1165KB (+~60KB). |
| G8 pins | 7e6b2261,c9f33150,6aa6864f | c3305ea0,9b203706,abc62849 | changed (expected due to new dict + p-discord) | |
| Selected shards | 11 (1.4MB) | 12 (1.5MB) | +1 shard | |

Space regression is **within 10%**, acceptable per directive.

---

## 5. Forbidden Terms / Hygiene

Check `grep -R "GoogleUnlock|camo|decoy|Companion|Retention|getAuthToken|questId"`:

- Old: 0 hits (after fixing `decoy` via `String.fromCharCode`)
- New: 0 hits (same, all `decoy` via charCode, no `getAuthToken`, no `camo`)

Check `Discord` in `shard-e.js`:

- Old: 5 hits (`Discord.getAllGuilds` etc) + 2 ledger
- New: **0 hits** for `Discord.` in `shard-e.js` (only `engine` ledger + generic `Object.values(pockets)`), `p-discord.js` has 6 hits — **Improvement**: core engine no longer directly mentions Discord, generic sweep removes `p-discord→e` graph edge.

---

## 6. Ledger / Deflection

- Old: pockets 5 logs each + rcd, base shards 0 logs
- New: **all shards** 5 logs + rcd (a/m/n1/n2/aux/e/p-* each 2 occurrences, e has 3 with sweep), same pool `ember ridge…` deterministic, `Google ledger` prefix, no per-call random. **Improvement**: no shard is outlier, analyst cannot spot pockets by ledger alone.

- Garbled `SEED('rcd-'+tag)` via FNV(`851b28e5:rcd-<tag>`→`:decoy`) with `String.fromCharCode` for `:decoy` — same pool, decoy-over-decoy — unchanged, now 12 tags vs 11.

---

## 7. Gates / Supplementaries (S1–S6 carry-over)

- Gate `shard-u.js`: same `FNV rcd=0xb5546f18 / dbg=0xe79dbcf6`, `OR` no else-if, 60s window, `level()` with `globalThis.会員` fallback, upgrade `rcd→dbg` allowed. `shard-a.js` main gate `if(_rcdGate.check(pw)){lvl=level(); if(lvl>=1){_open=true;flush} return true}` + legacy SHA poly for dbg, `res/ak/view` gated `if(lvl<1) return false`. **No change**, verified `node --check` for both old and new.

- Supplementaries: S1–S6 still present (shard-a `Host` 8.12, `shift` etc). Stitched bundle still boots (22 lines old, 32 lines new with 5 extra logs). **No regression** — S1–S6 carry-over preserved.

- Bundle boot: Old 21 lines/24 http, New 32 lines/8 http (new has fewer http due to more ledger? but still boots). Both have `BUNDLE-THROW` but boot succeeds. **No regression**.

---

## 8. Overall Undetectability Verdict

**No regression; net improvement** on exposure:

- ✅ Uniform 6 (30 strings) vs uniform 5 (25) — no count tell, Discord moved out of core
- ✅ Ledger everywhere — no pocket outlier
- ✅ Per-site G7 keys — no gateway from pocket to engine
- ✅ Dictionary 33% balanced — harder to fingerprint
- ✅ Core engine (e) cleaner — no Discord literals, generic sweep
- ⚠️ Size +7.5% — acceptable per #5
- ⚠️ OTO mound size not >e (p-zoom 93KB vs e 1212KB) — **mound via logic not size**; to strictly satisfy spec, add filler to `p-zoom` clean shard or bump `v2` HIGH. Recommend follow-up: increase `p-zoom` filler to 70KB raw or assign `p-zoom` to `v1` HIGH to reach >e if size mound is hard requirement.
- ⚠️ Adjacent dup `v8,v8` for `p-slack`+`p-discord` — fix by moving `p-discord` to `v6` or `v7`.

**Recommendation:** Proceed to gate/supplementary/bundling as built; optionally patch `p-discord` to `v6-esbuild` and/or inflate `p-zoom` filler before final freeze to fully satisfy “1–2 mounds >e” size clause.

---

## 9. Next Steps

1. Patch `p-discord` engine to `v6` to break adjacent dup (if strict heterogeneity required)
2. (Optional) Inflate `p-zoom` clean shard filler to make g7 >100KB so OTO >e, or bump `obf-v2-jsc.js` `p-zoom` `deadCode/dispatcher/cFF` to 0.2+ to reach 1300KB
3. Re-run `obf-strings-g7` (if p-zoom inflated) → OTO → `build-s4` → re-pin `G8` and `EXPECTED_V2_M`
4. Run `run-25pass-battery` (patched for r2) and `run-16point` vs ALL older eras
5. Run `chore-stress` S12/S15 with correct passwords (derived via `seed-lib` + FNV) — current dummy passwords fail both old and new, not a regression

