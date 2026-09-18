# Session 2026-09-17 — nil-start resume, workspace rebuild, and verification re-basing

**Agent:** resuming agent, started from an empty `/home/user` (only the uploaded chat trace).
**Read:** `DIR-MAP-@~8.10-@~8.12.md`, `HANDOFF.md` (full), `PROGRESSION-A-N-O.md`, `HONEY-BIBLE.md`,
`TRAP-CORRECTION-2026-09-14.md`, `HANDOFF-O8.13-ADDENDUM.md`, `WORKSPACE-STATUS.md`,
`Active/O8.13/Handoff_O8.13_2026-09-16.md`, `Active/O8.13/AVENUES-O8.13-COLLATED.md`,
`_ARCHIVE_TRIM/README.md`, plus the tail of `CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` (NODE ~14431–14480).

**Live hash confirmed on disk (recomputed, not quoted):**
`1e03f483c12f1132e154d3a4400a35341c777dd637ec07b935ea8bd6fd2b4868` — `O8.6-Final-final-bundle.js`, 1,660,881 B.
Runner `f36e792f…` 3,362,896 B. Cover `a206aaa3…` 2,359,350 B, **1024×768 24 bpp** (read from the BMP header).
`O8.13` seed `851b28e5`, branch tag `2026-09-16T07:44:00+08:00`.

---

## 1. Workspace rebuilt per operator instruction

Layout now at `/home/user` (= `@~8.12` payload, unprefixed paths as `DIR-MAP` prescribes):

| Path | Treatment |
|---|---|
| `Active/` (O8-legacy, O8.12-r2/r3/r4, O8.13, Stego, engines) | **as themselves** |
| `Archives/`, `Docs/`, `Handoff/`, `Uploads/`, `tools/`, `_ARCHIVE_TRIM/` | as themselves |
| `_COMPRESSED-HISTORY/Pre-O8.7-COMPRESSED.md` | pre-existing; **verified 768/768 files, 0 hash/size mismatches** |
| `_COMPRESSED-HISTORY/@~8.10-HISTORY-2026-09-17.tar.xz` | **NEW** — 21.3 MB xz, whole `@~8.10` minus `Pre-O8.7` |
| `_COMPRESSED-HISTORY/@~8.10-HISTORY-COMPRESSED.md` | **NEW** — 1.56 MB readable index (116 files inlined verbatim, 30 previewed, 5 binary hash-only, 154 dup-pointers) |

Archive round-trip **verified byte-exact: 305 files / 78.56 MB, 0 mismatches**.
Pre-O8.7 byte-exact stays on GitHub at `@~8.10/Pre-O8.7/` (readable copy is the MD above).

Dedup applied (all hash-verified identical before removal):
- `uploads/lmarena_…txt` → symlink to `Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` (−5.41 MB)
- `Uploads/stego2-cover*.gz`, `stego2-cover-source.png.gz` → dropped, plain kept (−2.96 MB)
- `Docs/*.md.gz` → dropped, plain kept (−0.20 MB)
- `Handoff/CHAT-HISTORY/Agent-Run-…txt.gz` → dropped, plain kept (−1.61 MB)
- `stego-r3-2026-09-16.tar.gz` 8.80 MB → `…-DEDUP.tar.xz` 3.91 MB. `stego-r3/output/` was **byte-identical to
  the live `stego-r4/output/`** (all 7 members matched) so it was dropped; the unique `output-1024/` half
  (old lite `53732f/9e165c`) is retained and round-trip-verified. (−4.89 MB)

**Result: 119.4 MB / ~1,080 files — under the 128 MB cap with ~8.6 MB headroom.**

---

## 2. SECURITY — plaintext credential file on a PUBLIC repo

`Uploads/Passwords so I dont have to paste them.txt` (117 B) contains all four credential slots in
plaintext, on `github.com/Sitramonicus/JSArchive` which the API reports as **`private = False`**.
This directly contradicts the standing rule ("never write passwords to files") and `HANDOFF.md` §0b B.
The first slot's value also appears verbatim in `Handoff/O8.12-PLAN.md`, `Handoff/CHAT-HISTORY/`,
`_COMPRESSED-HISTORY/Pre-O8.7-COMPRESSED.md` and 8 `Handoff_O8.12-r*` notes, and per §0b B the debug
password additionally survives in git history (`20d1bab 51ca851 2b682cf`).

**Action taken:** the file was **not** copied into the rebuilt workspace. It is still on GitHub at the
path above, so nothing is lost. Recommended: rotate all four slots via `shard-a` digest repin, make the
repo private, then rewrite history. Not done unilaterally — operator call.

---

## 3. Corrections to claims in the prior handoff

The `O8.12-r4` freeze record says `25/25` and `S15 ALL PASS`. **Neither was reproducible against the
committed bytes.** Every one of the three documented health-check commands failed on a fresh clone.
Root causes, all now traced:

### 3a. The whole toolchain hardcoded `Active/O8.6` — the rename was never finished
`WORKSPACE-STATUS.md` claims "hard-coded refs updated to `O8-legacy`". It was not. The references use
`path.join(REPO,'Active','O8.6')` — a string literal **without** a slash, so a `O8.6/` text sweep missed them.

Worse, the line dir was repointed by hand on every rebuild, and had drifted:

| script (in `Active/O8.13/oto/scripts/`) | pointed at |
|---|---|
| `run-25pass-battery.mjs`, `run-16point-verification.mjs`, `run-15pass-battery.mjs`, `seed-lib.js` | `Active/O8.6` — **gone** |
| `obf-strings-g7.js`, `obf-minify-family.js`, `obf-v1-s3matrix.js`, `build-s4-final-package.js` | `Active/O8.12-r3` |
| `obf-u-canon.js`, `obf-u-per-type.js`, `obf-v2-jsc.js` | `Active/O8.12-r4` — **the FROZEN live deliverable** |

Running the documented O8.13 cascade verbatim would have written into `O8.12-r3` and **overwritten frozen
R4 bytes**. That footgun is now closed.

**Fix (O8.13 only, 12 files):** every script resolves its own line dir —
`path.resolve(__dirname,'..','..')` (or `HERE` for the `.mjs` batteries), `path.resolve(__dirname,'..')`
in `tools/`. All 12 parse clean. `O8.12-r4/` untouched.

### 3b. `SHA256SUMS.txt` was unverifiable — three defects
1. A trailing byte-count field, so `sha256sum -c` (documented in §7) fails on every line.
2. `../Stego/…` is one level short from `final-package/`; it needs `../../Stego/…`.
3. Two `output-1024/O8.12-*-1024.*` entries reference filenames that stopped existing when
   `output-1024` became a symlink.

This same defect is what broke battery pass 24. **Fix (O8.13 only):** rewrote the manifest as
`hash␣␣path`, moved sizes to `SHA256SUMS.sizes.txt`, kept the original as `SHA256SUMS.r4-superseded.txt`.
`sha256sum -c` now returns **5× OK**. The 5 resolvable hashes were all correct — the payload was never wrong,
only its manifest.

### 3c. Battery pass 12 asserted a pre-r3 dictionary
Hardcoded `1k + 5k + 5k = 11,000`. R3 shipped `340 jso + 5288 5k + 3400 runner = 9,028` (8,688 unique).
`runPass` calls `process.exit(1)`, so **passes 13–25 never executed** — "25/25" was structurally impossible.
**Fix:** assertion re-based to 9028/8688 and the overlap is now *reported*, not hidden:
**`jso ∩ runner = 340` — the entire 340-word jso dictionary is a strict subset of runner-5k** (`jso∩5k = 0`,
`5k∩runner = 0`). The old zero-overlap invariant no longer holds. **Operator decision pending:** dedupe jso
out of runner-5k, or accept. Given "exposure over space" this deserves a decision, not a silence.

### 3d. `test-stego11-tiers.mjs` was never re-based to the O8.12 line
- Hardcoded `stego11-*.min.js`; the O8.12 build emits **`stego11p-*.min.js`** → `ENOENT` on line 28.
  **Fixed** by auto-detecting the prefix.
- `BMP valid` asserts `width === 800 && height === 660`. The live cover is **1024×768** → always fails.
- `PSNR/grain pinned` compares against `Uploads/stego2-cover.bmp`, which is **800×680** → dimension
  mismatch → `PSNR = NaN`.
- These are **not yet fixed** — see §4.

---

## 4. Verified state as of this session (actually run, output recorded)

| Check | Command | Result |
|---|---|---|
| 25-pass battery | `node Active/O8.13/oto/scripts/run-25pass-battery.mjs` | **25/25 PASSES VALIDATED** ✅ |
| Manifest | `cd Active/O8.13/final-package && sha256sum -c SHA256SUMS.txt` | **5× OK** ✅ |
| 16-point | `CS_BUNDLE=Active/O8.13/final-package/O8.6-Final-final-bundle.js node Active/O8.13/oto/scripts/run-16point-verification.mjs` | **13/16** — fails 05 (same dict quota + `Lengths 5-11: false`), 13 (digest — message reads "verified" yet is marked FAIL, needs reading), 16 (own copy of the manifest path bug) |
| S15 tier suite | `node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp` | **28 passed / 12 failed / 1 skipped** ❌ |

**Do not call R4 "S15 ALL PASS" until the tier suite is re-based.** The 12 tier failures group as:
- 4 × cover-geometry staleness: `BMP valid` (800×660 hardcoded), `PSNR/grain pinned` (NaN, wrong clean cover),
  `PG3-doc yields garden`, `T2-rename degrades to garden` (got a 2004 B capture instead).
- 6 × `T2-bitflip/*` and `T2-bits{1,2,4}` — each ran the full 20 s cap and produced **no capture**.
  Could be the same 1024-cover drift, could be a genuine reel-guard behaviour change at `NM 44754`.
  **Needs triage before trusting either answer.**
- Everything pocket/honey/mask related **passes**: all 4 `T2-dead/*`, all 4 `T2-mask/7+*`, `T2-deadhost/*`,
  `T2-honey`, `T2-mask/7+all-dead`, all 4 P-pocket G7 asserts, plus G2/G3 and banner.

---

## 5. Suggested order for the next turn

1. **Triage the 12 tier failures** — re-base `BMP valid` + `PSNR` to 1024×768 (needs a 1024 clean cover, or
   make PSNR dimension-aware), then re-run and see which of the 6 bitflip failures survive. This is the
   blocker on trusting the frozen deliverable.
2. **Fix 16-point 13/16** (16 is the same manifest bug; 13 needs its assertion read).
3. **Operator decision:** jso∩runner = 340 — dedupe or accept.
4. **Only then** land O8.13 experiments `A1+A2+W+B1` + `K+L+P+N+X+Y` in one bulk rebuild.
5. Mirror the §3a path fix into `O8.12-r2/r3` and `O8-legacy` if those lines are ever rebuilt — or leave
   them and record that they are non-buildable as committed.

**Unchanged:** `O8.12-r4/` frozen and untouched this session. No builds run. No `node_modules`
(`cd Active/engines && npm install` before any obfuscator rebuild).

---

## 6. Space levers if headroom is needed

Next cheapest: `Active/O8.12-r2` (5.15 MB) + `Active/O8.12-r3` (6.04 MB) are superseded lineage, not needed
for continuation — archiving them to `_COMPRESSED-HISTORY/` would free ~9 MB. Not done unilaterally because
`HANDOFF.md` says they are kept for lineage. Also still gzipped: 555 generated intermediates
(`_ARCHIVE_TRIM/manifest.json`, restore with `_ARCHIVE_TRIM/decompress.py`). 141 tooling + shard scripts
were un-gzipped this session (+1.6 MB) because gzipping them had broken every documented command;
`O8.13/oto/{v1,v2,v4,v5,v6,v7,v8,u}` were also restored (+2.17 MB) because battery pass 11 needs the
43 matrix files on disk.

---

## 7. Trim pass (same session, operator: "we're already crossing workspace limit")

**119.43 MB → 64.47 MB (524 files). auto-trim now reports 52 MB vs its 95 MB threshold. Headroom 63.5 MB.**

Method: GitHub is the archive; the workspace keeps only what GitHub does *not* have, plus small readable indexes.
Checked against the upstream tree at commit `6b96620` (2087 blobs) before deleting anything.

| Cut | MB | Safety proof |
|---|---|---|
| `@~8.10-HISTORY-2026-09-17.tar.xz` | −21.33 | all 1073 `@~8.10/` blobs present upstream |
| `Active-lines-legacy-r2-r3.tar.xz` | −13.22 | 486 files → **417 byte-identical upstream, 69 present as `.gz`, 0 unrecoverable** |
| `Uploads/lmarena_…txt` (3rd copy of the chat trace) | −5.41 | symlink to `Handoff/CHAT-HISTORY/…` |
| `Pre-O8.7-COMPRESSED.md` → `.xz` | −5.86 | 6.38 → 0.52 MB; already verified 768/768 |
| 3 archives gzip → xz −9e | −3.02 | lossless re-compress |
| `Active/{O8-legacy,O8.12-r2,O8.12-r3}` → archive then dropped | (in the −13.22) | superseded lineage |

**KEPT because the bytes exist nowhere else** (verified 0 blobs upstream for each):
`Archives-packages.tar.xz` 8.51 MB — frozen `O8.8`/`O8.9`/**`O8.11`** packages (`O8.11/` cover+runner+SHA256SUMS+4 min.js
is *only* here; upstream has just the O8.11 bundle `.gz` under `O8-legacy`) ·
`old-stego-outputs-0208-09.tar.xz` 10.34 MB · `stego-r3-…-DEDUP.tar.xz` 3.91 MB · `Docs-large.tar.xz` 0.48 MB.

Restore anything dropped: `bash tools/restore-from-github.sh {lines|810|810-pre|check}`.
Manifests for verification: `_COMPRESSED-HISTORY/*.MANIFEST.sha256`.

### Two things the trim exposed

- **`build-stego12-r2.mjs` had a hard dependency on `Active/O8.12-r3`** — `require(...O8.12-r3/oto/scripts/seed-lib.js)`
  with fallbacks to r2 then `O8-legacy`, and `fs.copyFileSync(...O8.12-r3/oto/rotation.json)` with **no fallback at all**.
  Since `O8-legacy` carries `BUILD-SEED 2f8918e4` while r2/r3/r4/O8.13 all carry `851b28e5`, falling through to it would
  have silently changed every derived seed and drifted the stego bytes — on a builder the handoff calls
  "byte-reproducible, do not accept hash drift". **Fixed:** explicit ordered chain
  `O8.13 → O8.12-r4 → O8.12-r3 → O8.12-r2 → O8-legacy` for both, throwing if none resolve. Verified both now
  resolve from `O8.13` (whose `rotation.json` is byte-identical to r3's).
- **`Active/O8.12-r4/oto/scripts/` (FROZEN) still hardcode `Active/O8.12-r3`** in 4 files. Left untouched per the
  freeze rule, so those scripts are non-runnable now that r3 is archived. Harmless while R4 stays frozen;
  restore with `bash tools/restore-from-github.sh lines` if R4 ever needs a rebuild.

### Battery re-verified after the trim
`node Active/O8.13/oto/scripts/run-25pass-battery.mjs` → **25/25 PASSES VALIDATED** (pass 11 43/43, pass 24 5 artifacts).

---

## 8. Where the previous conversation actually stopped

From the trace: the last real work was **NODE 14416–14421** — writing `Handoff/HANDOFF-O8.13-ADDENDUM.md` and
`_ARCHIVE_TRIM/README.md`, then running `tools/auto-trim.sh` and listing `Active/*`. **NODE 14422** closed it:
*"Trim + O8.13 collation done — 98.69MB → 89.80MB"*. **NODE 14423–14479** are the closing handoff message;
**NODE 14480** is the operator's cut-off *"Can you arrange the files properly…"*.

So: **the trim + O8.13 collation was the last task, and it was finished.** The task that was *never started* is the
one handed forward at NODE 14472 — landing the O8.13 experiments. No experiment code was ever written
("no bytes changed yet" is accurate for the bench payload; only test-harness paths have been touched, by me, this session).
