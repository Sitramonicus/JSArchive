# Workspace Status — O8.12-r4 FROZEN + O8.13 SCOPED — 2026-09-16 07:44 Asia/Shanghai

**Live line:** `O8.12-r4` **FROZEN** `1e03f48`/`f36e79` (`a206aa` cover) — paste-proven `Host config 32319` `GoogleUblock true`. `O8.13` **SCOPED** as experiment bench (copy of R4, branch `2026-09-16T07:44:00+08:00`, seed `851b28e5`).

**Snapshot:** `102.28 MB` excl. `node_modules` (`Active-eng 42.12MB + _COMP 37.55MB + Docs/Handoff/Uploads ~8M` + `@~8.12/` placeholder + `CHAT-HISTORY` 5.5M). Under `128MB` cap (`95MB` auto-trim threshold `79MB` Active-eng+_COMP). Last trim `98.69→81.64MB` (before O8.13) → `89.80MB` (with O8.13) → `102.28MB` (with CHAT-HISTORY) via:
- `Active/Stego/stego-r3` (14M) → `_COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz` (8.8M gz, restorable `tar -xzf ...`)
- `Active/Stego/stego-r4/output-1024` (13M duplicate) → `ln -s output output-1024` (byte-identical `a206aa/f36e79`)

## What changed since last WORKSPACE-STATUS (2026-09-14 O8.10)

- **O8.11** `fb32c3a8` frozen `Archives/packages/O8.11` (9 files) — superseded.
- **O8.12-r2** `31ba1eae` (97% cover) → **O8.12-r3** lite `bfaa3f2f` 1.49M quota-guard + 1024 50.25% `9e165c/53732f` → **O8.12-r4** `1e03f48` 1.66M bulk (Q/O/R/S/T/U/V/W/A all green, `S15 ALL PASS`).
- Naming: `Active/O8.6` → `Active/O8-legacy` (hard-coded refs updated to `O8-legacy` + `O8.12-r*`).
- Terminology: `gate→FaC`, `bundles→CC` per 2026-09-15 #5.
- Workspace `102MB → 81.6MB` after `_ARCHIVE_TRIM/*.tar 22M→_COMPRESSED-HISTORY` + gzips + deduplication symlinks.

## Live deliverables (R4 — the only paste you ship)

| file | bytes | sha256 | note |
|---|---|---|---|
| `Active/O8.12-r4/final-package/O8.6-Final-final-bundle.js` | 1,660,881 | `1e03f483c12f1132e154d3a4400a35341c777dd637ec07b935ea8bd6fd2b4868` | `slice 600` guard, deterministically stitched |
| `O8.6-Final-compressed-gzip.js` | 867,039 | `328cbde79581ee9671b3c9c97dbd11833db56c03a523f19b1d8441a4aa86d022` | |
| `O8.6-Final-compressed-deflateraw.js` | 867,033 | `0e58728a6721c3233a3f382c64e6e8df643dd7db05f8012e33db10a38f0fd390` | |
| `Active/Stego/stego-r4/output/O8.12-runner.js` | 3,362,896 | `f36e792fd04475608f6af3b67555b7ae1c4d28fe4dfa24e7053ce2a68559b6cc` | **sole live, 1024×768 embedded BMP, no fetch** |
| `Active/Stego/stego-r4/output/O8.12-cover.bmp` | 2,359,350 | `a206aaa39297d1ec48d8179a9a5b730bd456fcb5d75df1f43f72ccc2dc541706` | `salt 3f72a1ec 53.92% 1219188/2260896 seed 0x6d7f0c87` |

`Active/Stego/stego-r4/output-1024` is symlink to `output` (same bytes). `stego-r3` archived (identical to r4 output, see above).

**How to paste (R4):**
```js
localStorage.removeItem('console-history') // top, not VM
// paste Active/Stego/stego-r4/output/O8.12-runner.js → wait Host config {flags:32319}
await GoogleUblock("ripcord") // true (within 60s, also "wertyuiop...", "resurgence", "AKQJT")
```

Hostile reports `rhXBVTw08` + `tUKwwlkIM` both verdict *inert loader* (`0 evals`, `NM 44754>24600 reel guard`, `R9B 0x9cc64d97` GoL, `R9T 0xcf2a8773` vault) — framework works, skeleton is safe.

## O8.13 — experiment bench (collated, not yet live)

**Branch:** `Active/O8.13/` copy of `O8.12-r4` (`BUILD-SEED 851b28e5`, `BRANCH_TAG_O8.13_2026-09-16.txt`). All edits go here. `O8.12-r4/` stays frozen.

**Goal per your 2026-09-16:** move to `O8.13` and collate *everything* that can hide Discord poking out + ready experiments, without losing any FaC/CC.

**Root cause why Discord pokes out (dynamic mines):**
- Static already `6 measurable each + SEEDINT('g7-'+tag) distinct`, but dynamic `Y()&2 DiscordNative → u(...,2) 1,884B real decoder` vs `Telegram/Teams/Zoom/Slack → O() null/throw` (kaleidoscope punishment leaves Discord sole live). Also `e() 98400/4=24600` guard + `Guild` literal.

**Collated experiments — see `Active/O8.13/Handoff_O8.13_2026-09-16.md` §4 + `AVENUES-O8.13-COLLATED.md`:**

- **P0 Discord-uniformity (must do):** `A1 O()->real 1.8KB decoders (all 5 live)`, `A2 e guard 98400/4 → R*K*3/4 variable`, `A3 Guild literal offload`, `W jitter 5–7` + cross-decoy, `B1 OTO raise p-* to v1/v4/v8 equal e (1–2 mounded >e)`.
- **P1 hunter-first bulk (K+L+P+N+X+Y):** `K 104→12 alphabets -80KB`, `L TextDecoder Map 179k→1.2k`, `P split("|") trampoline`, `N slack 1k random`, `X live-read mimicry`, `Y anti-harness __DUMP` — net `-60KB`, fits 1024 `53%`.
- **P2 deferred:** `O-full 3400 swap`, `M 4b→2b dither (needs 2 reels)`, `H split e 780K→390+390`, `R true 4-way R9R0..3` (breaks ctxt.io), `wasm` (avoid inner).

**Next commands (when you green-light an experiment):**
```bash
bash tools/auto-trim.sh   # currently 79MB Active-eng+_COMP under 95
# edit Active/O8.13/shards/*.js or oto/scripts/* per collated list
cd Active/O8.13/oto/scripts && node obf-strings-g7.js && node obf-minify-family.js && node build-s4-final-package.js
node run-25pass-battery.mjs && CS_BUNDLE=Active/O8.13/final-package/O8.6-Final-final-bundle.js node run-16point-verification.mjs
node Active/Stego/build-stego12-r2.mjs --cover 1024 --salt 3f72a1ec
```

## Workspace layout now

```
Active/
  O8-legacy/          7.9M  (renamed from O8.6, final 2026-09-15-3)
  O8.12-r2/           5.6M  lineage
  O8.12-r3/           6.5M  lineage (FREEZE_TAG_R3)
  O8.12-r4/           8.6M  FROZEN live (1e03f48/f36e79)
  O8.13/              8.6M  SCOPED bench (copy of r4, Handoff_O8.13 + AVENUES-O8.13-COLLATED)
  Stego/              7.3M  (stego-r4/output live 6.9M + symlink; stego-r3 archived)
  engines/            208K  (+ node_modules 245M gitignored)
_COMPRESSED-HISTORY/ 37.55M (old-stego..., Archives-packages, Pre-O8.7, Docs-large, stego-r3-2026-09-16.tar.gz 8.8M)
_ARCHIVE_TRIM/         0.1M  manifest 569 + decompress.py
Handoff/              0.7M  (HANDOFF.md still O8.11 baseline — see addendum below)
```

## Handoff files — what is up to date / what is stale

- ✅ `Active/O8.12-r4/Handoff_O8.12-r4_2026-09-16-final.md` — R4 frozen truth (live hashes, S15).
- ✅ `Active/O8.13/Handoff_O8.13_2026-09-16.md` — this trim + O8.13 collation (source of truth for next).
- ✅ `Active/O8.13/AVENUES-O8.13-COLLATED.md` — tick-list for experiments.
- ⚠️ `Handoff/HANDOFF.md` — still at `O8.11 fb32c3a8` (2026-09-15). Needs rolling update to `O8.12-r4` then `O8.13` per protocol — **next action** after you approve `Handoff_O8.13` (copy §1–§4 into `Handoff/HANDOFF.md` + prepend `CHANGELOG.md`).
- ⚠️ `Handoff/CHANGELOG.md` — head still `O8.11`. Pending prepend for R4/R3.
- This file (`WORKSPACE-STATUS.md`) is now current — previous O8.10 recovery narrative retained below as archive.

---
*Archive: previous recovery narrative 2026-09-14 retained for lineage — see git log. For live resumption use sections above.*
