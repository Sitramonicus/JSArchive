# JSArchive — Workspace Handoff (O8.12-r4 FROZEN 1e03f48/f36e79/a206aa; O8.13 BENCH 851b28e5 SCOPED; O8.11/O8.10/O8.9/O8.8 frozen) — NIL-READY

Date: 2026-09-17 · Status: **O8.12-r4 FROZEN** (`1e03f48`/`f36e79`/`a206aa` 1024×768, paste-proven `Host config 32319` `GoogleUblock true`), **O8.13 BENCH** (`851b28e5` 2026-09-16T07:44:00+08:00, copy of R4, collated Discord-stealth experiments, no bytes changed yet). `O8.11` `fb32c3a8` + `O8.10` `8b9f310b` + `O8.9` `2b7d1eab` + `O8.8` `31fe03e1` stay frozen.

> **If you start from nil (fresh clone), read this file top-to-bottom, then `DIR-MAP-@~8.10-@~8.12.md`, `PROGRESSION-A-N-O.md`, `INSTRUCTION-PROMPT.md`, and `CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` before any build.** This doc alone is sufficient to resume, but the companions give you the why.

Conventions: paths here are written **as if `@~8.12/` is the repo root** (Arena workspace `/home/user`). In GitHub after the 2026-09-17 move, repo root contains `@~8.10/` (history) and `@~8.12/` (live). All `Active/`, `Handoff/`, `tools/` paths below mean `@~8.12/Active/` etc. when at GitHub root, or just `Active/` when you `cd @~8.12`. The same tree exists in Arena at `/home/user/` (no prefix). See `Handoff/DIR-MAP-@~8.10-@~8.12.md` for the `git mv` you will have done.

User mirror (private, you maintain): `https://github.com/Sitramonicus/JSArchive`. Download package for `@~8.12` is `DOWNLOAD-@~8.12-2026-09-17.tar.gz` (68M) at workspace root; it expands to `@~8.12/`.

---

## 0. TL;DR — how to resume (5 commands)

1. **Live line is O8.12-r4 FROZEN** — `Active/O8.12-r4/final-package/O8.6-Final-final-bundle.js` `1,660,881B` `1e03f483c12f1132e154d3a4400a35341c777dd637ec07b935ea8bd6fd2b4868` + stego `Active/Stego/stego-r4/output/O8.12-runner.js` `3,362,896B` `f36e792fd04475608f6af3b67555b7ae1c4d28fe4dfa24e7053ce2a68559b6cc` `O8.12-cover.bmp` `2,359,350B` `a206aaa39297d1ec48d8179a9a5b730bd456fcb5d75df1f43f72ccc2dc541706` `1024×768` `salt 3f72a1ec` `53.92%` `1219188/2260896` `seed 0x6d7f0c87` `G8 2a8969a6→6521c470` — `S15 ALL PASS` on both bundle and `stego11p-real.min.js` (`1307510→609582`), hostile `rhXB/tUK` both `0 evals` `NM 44754>24600` reel guard. Paste-proven 2026-09-16 Discord `Host config {flags:32319}` `GoogleUblock("ripcord") === true`. **Do not edit `O8.12-r4/`; all experiments go in `O8.13/`.**

2. **Next is O8.13 BENCH** — `Active/O8.13/` copy of R4 (`BUILD-SEED 851b28e5`, branch `2026-09-16T07:44:00+08:00`) with `Handoff_O8.13_2026-09-16.md` §4 + `AVENUES-O8.13-COLLATED.md` checklist (Discord-uniformity `A1 O→real 1.8KB`, `A2 e 98400/4→R*K*3/4`, `B1 OTO raise p-* to v1`, bulk `K+L+P+N+X+Y` `-60KB` net). Nothing live yet; `O8.13` is the bench. See `Handoff/PROGRESSION-A-N-O.md` for Script A→N→O lineage.

3. **Verify health in seconds (no engines needed):**
   ```bash
   bash tools/auto-trim.sh  # expect Active-eng 42.12M + _COMP 37.55M = 79M under 95
   node Active/O8.12-r4/oto/scripts/run-25pass-battery.mjs  # 25/25
   node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp  # S15 ALL PASS
   # also: node Active/O8.12-r4/oto/scripts/run-16point-verification.mjs with CS_BUNDLE
   ```

4. **To rebuild anything obfuscated, first `cd Active/engines && npm install`** (`node_modules/` gitignored, 245M, excluded from snapshot). Scripts resolve engines with `NODE_PATH`/global fallback.

5. **New agent after token-limit death or fresh clone: read §0b FIRST, then `Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` (5.5M, 111k nodes) if you need full trace.**

History frozen: `@~8.10/` (`Pre-O8.7` 768 files compressed to `_COMPRESSED-HISTORY/`, `Archives/packages/O8.7-*` `O8.8` `O8.9` `O8.11`); `Working-Stable/` holds ONLY live-test-confirmed builds (O8.11 not there yet, pending explicit `go live`). Snapshot `89.80MB` excl. `node_modules` (`Active-eng 42.12MB + _COMP 37.55MB + Docs/Handoff/Uploads ~8M`); last trim `98.69→81.64MB` (now `89.80` with `O8.13` copy) via `stego-r3` archive + `output-1024 → symlink` (see `_ARCHIVE_TRIM/README.md`).

---

## 0b. Agent recovery protocol (context death / fresh clone / GitHub @~8.10/@~8.12)

You are a new agent. The prior agent may have died mid-turn. Do this in order:

**A. ORIENT (no builds):**

- Read `Handoff/DIR-MAP-@~8.10-@~8.12.md` (where `@~8.10` vs `@~8.12` live)
- Read `Handoff/HANDOFF.md` (this file) §0 + §1 + §4 + §6 — if at GitHub root, paths below are ` @~8.12/`-prefixed; `cd @~8.12` first to avoid prefix.
- Read `Handoff/PROGRESSION-A-N-O.md` (§0 ELI5 through O8.13 table) — Script A→N→O is the context you need to not re-ask the user
- Read `Handoff/HONEY-BIBLE.md` (trap doctrine) + `Handoff/TRAP-CORRECTION-2026-09-14.md` (K-walk crypto framing is VOID, pasted designs are evaluation material only)
- Read `Handoff/INSTRUCTION-PROMPT.md` (the full Tasks + FaCs/CCs + operator constraints + ELI5 + `gate→FaC` rename)
- If you need the full deleted trace: `Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` (5.5M, `NODE 1..14422`) — this is the sanitized Arena export from nil recovery (O8.10) through `R4` trim to `O8.13` scoping. Also compressed as `.gz` 1.7M. **Tell the operator you have read it** before asking for context they already gave.
- Then run §0 item 3 health checks. If green, tree is at frozen `O8.12-r4` + scoped `O8.13` — resume from `Handoff/CHANGELOG.md` head and `Active/O8.13/AVENUES-O8.13-COLLATED.md` checklist. Do not rebuild just to prove you can; rebuild only to land an experiment.

**B. CREDENTIALS (standing operator rule, no exceptions):** operator passwords are ephemeral-only via `ask_user` argv — **NEVER** write them to files, docs, logs, or handoff. Stress scenarios take `node Active/O8.13/tools/chore-stress.mjs <SCN> 7 <pwDbg> <pwRes> <pwAK> <pwView>` (SCN like `S8`; order is `pwDbg pwRes pwAK pwView`). Ask the operator with explicit slot order; verify by `S8 PASS` on bundle+min, never by guessing. Pre-push sweep: ask operator for a distinctive fragment of each credential **via chat only**, then `grep -rl "<fragment>" --exclude-dir=node_modules --exclude-dir=.git .` per fragment — expect zero hits. Command-line use is ephemeral (never snapshotted). File persistence is forbidden. The debug password plaintext was scrubbed from working tree 2026-09-14 but REMAINS IN GIT HISTORY (`20d1bab 51ca851 2b682cf`) — operator must rewrite history before first push involving those commits (or rotate via `shard-a` digest repin). Agents do not rewrite history or push without explicit operator approval.

**C. FROM-SCRATCH REBUILD (fresh clone):** `git clone <mirror> && cd JSArchive && ls @~8.10 @~8.12` — live is `@~8.12`. `cd @~8.12 && cd Active/engines && npm install && cd ../..`, then §0 health checks (they run on committed bytes, no rebuild needed). To regenerate `O8.13` bench after an edit:

```bash
cd @~8.12/Active/O8.13/oto/scripts   # or Active/O8.13/oto/scripts if already in @~8.12
# if you touched dictionaries/alphabets:
node obf-strings-g7.js              # G7 census/rotation — self-tests round-trips, check census.json
# if you touched OTO family mapping (B1):
node obf-v1-s3matrix.js && node obf-minify-family.js  # family = v4–v8 + u-canon / per-type
node obf-u-canon.js && node obf-u-per-type.js
node build-s4-final-package.js      # stitch + S4 JSO final bundle + G8 pins + gzip/deflate
node run-25pass-battery.mjs         # expect 25/25
CS_BUNDLE=../final-package/O8.6-Final-final-bundle.js node run-16point-verification.mjs  # S15 ALL PASS
# if bundle changed: rebuild stego 1024 (BMP embedded, no fetch)
node ../../Stego/build-stego12-r2.mjs --cover 1024 --salt 3f72a1ec  # pins recalibrate G8 a029… etc.
node ../../Stego/test-stego11-tiers.mjs ../../Stego/stego-r4/output/O8.12-runner.js ../../Stego/stego-r4/output/O8.12-cover.bmp
```

Snapshots go to `Archives/packages/O8.13/` inside `@~8.12` (rolling rule: overwrite, document superseded bytes in `Archives/RETIRED.md`, never mint `-rN` dirs). `Working-Stable/` ONLY on explicit operator say-so after live-test. `BUILD-SEED.txt` (`851b28e5` now) drives deterministic seeds via `oto/scripts/seed-lib.js`; respin via `tools/respin-seed.mjs` then **FULL cascade**; record master in `BUILD.json` at freeze. `v2-jsc` stays frozen-pinned (repin `EXPECTED_V2_M` only).

**D. GITHUB HYGIENE + @~8.10/@~8.12 DISCIPLINE:**

- Remote is the operator's private mirror. `node_modules/` is gitignored. **NEVER** push credentials (see B).
- After the 2026-09-17 move, `git log` will show top-level ` @~8.10/` and `@~8.12/` folders. Do not write at repo root; write **inside `@~8.12/`**. `@~8.10/` is read-only history (frozen).
- `Handoff/README.md` discipline still holds: update `Handoff/HANDOFF.md` whenever live line moves, prepend `CHANGELOG.md` per change, freeze chatlogs to `Handoff/CHAT-HISTORY/` (next freeze: `CHATLOG-O8.13.txt`).

---

## 1. Live deliverables (under `@~8.12/Active/` — prefix omitted here, see §0)

### `@~8.12/Active/O8.12-r4/final-package/` — the 3 single-paste deliverables (S15 15/15)

| file | bytes | sha256 | note |
|---|---|---|---|
| `O8.6-Final-final-bundle.js` | 1,660,881 | `1e03f483c12f1132e154d3a4400a35341c777dd637ec07b935ea8bd6fd2b4868` | `slice 600` quota guard, deterministic stitch, `Uint8Array(320KB)` scratch + `DICT_SPLIT 780×3` + `0x9A7F` + `String.fromCharCode` + `8→1` globals |
| `O8.6-Final-compressed-gzip.js` | 867,039 | `328cbde79581ee9671b3c9c97dbd11833db56c03a523f19b1d8441a4aa86d022` | |
| `O8.6-Final-compressed-deflateraw.js` | 867,033 | `0e58728a6721c3233a3f382c64e6e8df643dd7db05f8012e33db10a38f0fd390` | |
| `selected-shards/` (7+5 pockets) | — | — | same picks as bundle |

### `@~8.12/Active/Stego/stego-r4/output/` — the **sole live** stego pair (everything else archived or symlink)

| file | bytes | sha256 | note |
|---|---|---|---|
| `O8.12-cover.bmp` | 2,359,350 | `a206aaa39297d1ec48d8179a9a5b730bd456fcb5d75df1f43f72ccc2dc541706` | `1024×768` `salt 3f72a1ec` `53.92%` `1219188/2260896` `minReal 1307510→609582` `seed 0x6d7f0c87` |
| `O8.12-runner.js` | 3,362,896 | `f36e792fd04475608f6af3b67555b7ae1c4d28fe4dfa24e7053ce2a68559b6cc` | **embedded BMP, no fetch**, `G8 2a8969a6→6521c470` |
| `stego11p-real.min.js` | 1,307,510 | `b1ba013b...` etc. | minReal |

`output-1024` is `→ symlink` to `output` (byte-identical, saved 13M). `stego-r3` (`output` `a206aa/f36e79` + `output-1024` `53732f/9e165c`) archived to `_COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz` (8.8M gz) + stub `README.md` at `Active/Stego/stego-r3/` — restorable `tar -xzf _COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz`.

### Frozen tiers (all `Archives/packages/` now under `@~8.12/Archives/` after move; before move they were at root — now `@~8.10/Archives/`)

- `O8.11` `fb32c3a8` `3a82764d` (9 files `SHA256 OK`), `O8.10` `8b9f310b`/`4042991c` `6967eebc`/`c98d1d8e`, `O8.9` `2b7d1eab`, `O8.8` `31fe03e1` — all frozen, superseded record in `Archives/RETIRED.md`. Current live `O8.12-r4` not yet archived to `Archives/packages/O8.13/` until you freeze — it lives in `Active/` now.

---

## 2. Pipeline map (where each stage lives — inside `@~8.12/`)

```text
Uploads/cover ─┐
               ├─► Active/O8.13/shards/  (12 shards: a/m/n1/n2/aux/e/u + 5 pockets p-discord/slack/telegram/teams/zoom)
               │     │  oto/scripts/obf-v1-s3matrix.js, obf-v2-jsc.js (frozen/pinned), obf-minify-family.js (v4–v8), obf-u-canon/per-type
               │     ▼
               ├─► Active/O8.13/oto/     (43-file engine matrix + 3 dictionaries 5288/3400 split + census.json)
               │     │  obf picks: a=v1 m=v2 u=canon n1=v6 e=v1 n2=v7 aux=v5  + p-discord v8 / p-telegram v4 / p-teams v6 / p-zoom v2 / p-slack v8  (B1 will raise to equal e)
               │     ▼
               ├─► Active/O8.13/tools/stitch-o85.py + oto/scripts/build-s4-final-package.js
               │     ▼
               ├─► Active/O8.13/final-package/  (bundle + gzip/deflateraw runners, Line 1 header)
               │     │  Active/Stego/build-stego12-r2.mjs (utf8 minify → gzip → 4-bit grain + PG3 strip → Player loader, BMP 1024 embedded)
               │     ▼
               └─► Active/Stego/stego-r4/output/  (photo cover + Player runner)
```

- `build-entangled-stego.js` (Stego-1/S5 frozen) + `output/` pair kept for lineage; Stego-2 superseded.
- `pack-stego-bmp.js`/`bmp-to-js.js` are generic packer/extractor — superseded for delivery, kept as tools.
- OTO pick sequence `[v1,v2,v4,v6,v1,v7,v5]` + `p-*` — 0 adjacent duplicates (battery pass 15).
- Dictionaries: `oto/identifiers-dictionary-{jso,5k,runner-5k}.csv` = 11k words 0 overlap before split; now `5k.csv` live 5288, `5k.csv3400` ready swap, `5k.csv5288.bak` backup; split `DICT_SPLIT 780×3` + `getDictForTag(tag%3)` rotation.

---

## 3. How to …

**Verify:** `node Active/O8.12-r4/oto/scripts/run-25pass-battery.mjs` (`25/25`) and `node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp` (`S15 ALL PASS` 15/15, `1 skipped`). No engines needed.

**Rebuild matrix + package** (needs `Active/engines`): `cd @~8.12/Active/O8.13/oto/scripts && node obf-strings-g7.js && node obf-v1-s3matrix.js && node obf-minify-family.js && node obf-u-canon.js && node obf-u-per-type.js && node build-s4-final-package.js && node run-25pass-battery.mjs` — O8.9 G1 `BUILD-SEED.txt` (`851b28e5`, lib `oto/scripts/seed-lib.js`, respin `tools/respin-seed.mjs`) then **FULL** cascade; record master in `BUILD.json`.

**Rebuild stego pair:** `node Active/Stego/build-stego12-r2.mjs [--cover 1024 --salt 3f72a1ec]` (points at live bundle + photo cover; needs `terser`), then tier suite above. Unlike entangled runner, stego-12_r2 is byte-reproducible (`cmp`-identical) — do not accept hash drift.

**Freeze (ROLLING rule):** overwrite `@~8.12/Archives/packages/O8.13/` in place (payload files + intermediates + `ARCHIVE.txt` + `BUILD.json` + relative-path `SHA256SUMS.txt` no self-line, `sha256sum -c`, then document superseded bytes in `Archives/RETIRED.md` before delete, prepend `Handoff/CHANGELOG.md`, update this doc). `Working-Stable/` ONLY on explicit operator `go live`.

**Recover old generations:** `Archives/shards-history/RECONSTRUCT.md` (scrub1–4 diffs); retired builds/tarballs per `Archives/RETIRED.md`.

---

## 4. Frozen hash record (O8.12-r4 live — older revs in `@~8.10/Archives/RETIRED.md` before move, now `@~8.10` there and `@~8.12/Archives/RETIRED.md` after)

**O8.12-r4 live (FROZEN 2026-09-16, instance `851b28e5`, runner `f36e79`):**
```text
1e03f483c12f1132e154d3a4400a35341c777dd637ec07b935ea8bd6fd2b4868  O8.6-Final-final-bundle.js  1660881B
328cbde79581ee9671b3c9c97dbd11833db56c03a523f19b1d8441a4aa86d022  O8.6-Final-compressed-gzip.js  867039B
0e58728a6721c3233a3f382c64e6e8df643dd7db05f8012e33db10a38f0fd390  O8.6-Final-compressed-deflateraw.js  867033B
f36e792fd04475608f6af3b67555b7ae1c4d28fe4dfa24e7053ce2a68559b6cc  ../Stego/stego-r4/output/O8.12-runner.js  3362896B
a206aaa39297d1ec48d8179a9a5b730bd456fcb5d75df1f43f72ccc2dc541706  ../Stego/stego-r4/output/O8.12-cover.bmp  2359350B  1024×768 salt 3f72a1ec 53.92% seed 0x6d7f0c87 G8 2a8969a6→6521c470
```

**Previous frozen (O8.11 `fb32c3a8` now in `@~8.10/Archives/packages/O8.11/`):**
```text
fb32c3a8...  O8.11 runner  9 files SHA OK  instance 3a82764d
# full block in @~8.10/Archives/packages/O8.11/SHA256SUMS.txt
```

Pristine cover (`Uploads/image_…-Copy.txt`): `f68fee1fa5ae921f8154ad053199bfec847794080fec60065e0ca987c5f50c57`. Stego-2 cover (`Uploads/stego2-cover.bmp`): `b1590ea3…` (`stego2-cover-source.png`: `cb5dd70a…`).

---

## 5. Known warts (don't "fix" blindly)

- `js-confuser` outputs are never reproducible — `v2-jsc` frozen since Stego-3 G4 (`shard-m-out.js` pinned in `build-s4-final-package.js`; refresh = run `obf-v2-jsc.js` + re-green `25/25` + re-pin). Minify camo RNG seeded; engines exact-pinned.
- `Active/engines/node_modules/` is intentionally absent from git; reinstall after any workspace restore.
- `build-entangled-stego.js` reserves `会員/名` as plain names while OTO scripts use `^…$` — both work; leave alone.
- `Uploads/*.txt` cover is a binary BMP despite extension. Don't rename.
- Stego-3 RENAMED pastes run garden everywhere (wrong seed → garden fallthrough) — tripwire, pinned by tests.
- `@~8.10/` before move had `HANDOFF.md` frozen at O8.11 (2026-09-15) — that doc is now `HANDOFF-LEGACY-O8.11-2026-09-15.md` here; the live handoff is this file.

---

## 6. Open threads / next (DONEs + TODO)

- **DONE (2026-09-16): O8.12-r4 FROZEN** — 9 lanes bulk `Q(320KB scratch)+O(3×780)+R(0x9A7F)+S+T+U+V(8→1)+W(6+1)+A(8+order)` + quota `slice 600` + 1024 embedded. `S15 ALL PASS`, paste-proven, hostile `0 evals`.
- **DONE (2026-09-17): Trim & @~8.12 staging** — `98.69→89.80MB` (`stego-r3` 14M → 8.8M tar + `output-1024 → symlink` 13M saved), `tools/auto-trim.sh` `79MB` under `95`, `Handoff/CHAT-HISTORY/` added (5.5M full trace), `DIR-MAP` + `PROGRESSION-A-N-O.md` + `INSTRUCTION-PROMPT.md` created for nil-start.
- **TODO (O8.13 bench, in `Active/O8.13/`):** land Discord-stealth `A1+A2+W+B1` + bulk `K(104→12 alphabets -80KB) + L(TextDecoder Map 179k→1.2k) + P(split"|" trampoline) + N(slack 1k random) + X(live-read mimicry) + Y(anti-harness __DUMP)` — one bulk rebuild, then `S15` + trim. See `Active/O8.13/Handoff_O8.13_2026-09-16.md` §4 + `AVENUES-O8.13-COLLATED.md` checklist. Deferred: `O-full 3400 swap`, `M 4b→2b dither`, `H split e 780K→390+390`, `R true 4-way R9R0..3` (breaks `ctxt.io`), `wasm`.
- **TODO (Handoff rotation):** prepend `Handoff/CHANGELOG.md` with `O8.12-r4` frozen entry + `O8.13` scoped entry; archive will move to `@~8.12/Archives/packages/O8.13/` on freeze.

---

## 7. Quick-verify from nil (copy-paste)

```bash
# GitHub after move (repo root has @~8.10/ @~8.12/)
cd "@~8.12"
bash tools/auto-trim.sh
node Active/O8.12-r4/oto/scripts/run-25pass-battery.mjs
node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp
cat Active/O8.12-r4/final-package/SHA256SUMS.txt
sha256sum -c Active/O8.12-r4/final-package/SHA256SUMS.txt

# Arena before upload (already in @~8.12 context)
bash tools/auto-trim.sh
node Active/O8.13/oto/scripts/run-25pass-battery.mjs  # 25/25 after rebuild
CS_BUNDLE=Active/O8.13/final-package/O8.6-Final-final-bundle.js node Active/O8.13/oto/scripts/run-16point-verification.mjs
```

*This handoff replaces all earlier ones. The progression is `Script A (o8cmp/O8.6) → N14/N15 stress har-ness → O1–O8 → O8.9 12-gate → O8.10 rotation → O8.11 frozen → O8.12 RIPCORD (r2 31ba1eae → r3 bfaa3f2f → r4 1e03f48) → O8.13 bench` — see `PROGRESSION-A-N-O.md`.*

