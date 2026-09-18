# _COMPRESSED-HISTORY — what is here, what was dropped, how to get it back

Rule this folder follows: **GitHub is the archive; the workspace holds only what GitHub does not have,
plus small readable indexes.** Verified 2026-09-17 against the upstream tree at commit `6b96620`
(`git/trees/main?recursive=1`, 2087 blobs).

## KEEP — these bytes exist NOWHERE else

| File | Size | Why it must stay |
|---|---|---|
| `Archives-packages.tar.xz` | 8.51 MB | Frozen packages `Archives/packages/O8.8`, `O8.9`, **`O8.11`**. Upstream `@~8.12/Archives/packages/` has **0 blobs** — `O8.11/` (cover BMP, runner, SHA256SUMS, 4 × `min.js`) exists **only here**. Upstream has just the O8.11 *bundle* `.gz` under `O8-legacy`, not the frozen package. Restore: `tar -xJf … -C /home/user` |
| `old-stego-outputs-0208-09.tar.xz` | 10.34 MB | `Active/Stego/output-stego2,3,8,9`. Upstream `@~8.12/Active/Stego/output-stego*` has **0 blobs**. |
| `stego-r3-2026-09-16-DEDUP.tar.xz` | 3.91 MB | `stego-r3/output-1024/` (old lite `53732f`/`9e165c`). Upstream keeps only `stego-r3/README.md` + `rotation.json`. Its `output/` half was byte-identical to live `stego-r4/output/` so it was dropped. |
| `Docs-large.tar.xz` | 0.48 MB | `Docs/obfuscator-manual.pdf` — **0 blobs upstream**. |

## KEEP — readable indexes (small, this is the context coverage)

| File | Size | Covers |
|---|---|---|
| `@~8.10-HISTORY-COMPRESSED.md` | 1.56 MB | All of `@~8.10/` except `Pre-O8.7`: tree + sha256, **116 files inlined verbatim**, 30 previewed, 5 binary hash-only, 154 dup-pointers into `@~8.12`. Read this instead of restoring. |
| `@~8.10-HISTORY.MANIFEST.sha256` | — | 1073 blobs / 153.85 MB as `<git-blob-sha1> <bytes> <path>`. Verify a restored file with `git hash-object`. |
| `Active-lines-legacy-r2-r3.MANIFEST.sha256` | — | 486 files of `Active/{O8-legacy,O8.12-r2,O8.12-r3}` as `<sha256> <bytes> <path>`. |
| `Pre-O8.7-COMPRESSED.md.xz` | 0.52 MB | `Pre-O8.7/` — 768 files. **Verified complete 2026-09-17: 768/768, 0 hash/size mismatches.** Read with `xz -dc Pre-O8.7-COMPRESSED.md.xz \| less` |
| `Archives-pre-O8.8-COMPRESSED.md` | 0.02 MB | `Archives/packages/O8.7-Stego-2` + `O8.7-Stego-3` (the pre-O8.8 packages). |

## DROPPED 2026-09-17 — fully present upstream, restore on demand

| Dropped | Was | Upstream proof | Restore |
|---|---|---|---|
| `@~8.10-HISTORY-2026-09-17.tar.xz` | 21.33 MB | all 1073 `@~8.10/` blobs present | `bash tools/restore-from-github.sh 810` |
| `Active-lines-legacy-r2-r3.tar.xz` | 13.22 MB | 486 files: **417 byte-identical upstream, 69 present as `.gz`** (scripts this workspace had un-gzipped), **0 unrecoverable** | `bash tools/restore-from-github.sh lines` then `python3 _ARCHIVE_TRIM/decompress.py` |

Superseded earlier: `stego-r3-2026-09-16.tar.gz` (8.8 MB, its `output/` half duplicated live `stego-r4/output/`),
and the three `.tar.gz` re-compressed to `.tar.xz` (−3.0 MB total).

## Also compressed, elsewhere

`_ARCHIVE_TRIM/manifest.json` (555 entries) + `decompress.py` track `.js/.mjs/.py` left gzipped **in place**
— generated intermediates and superseded bundles, not tooling. `python3 _ARCHIVE_TRIM/decompress.py` restores all.

Un-gzipped on 2026-09-17 because gzipping them had broken every documented command: 141 tooling + shard
scripts (+1.6 MB), plus `Active/O8.13/oto/{v1,v2,v4,v5,v6,v7,v8,u}` (+2.17 MB) since battery pass 11 needs the
43 matrix files on disk.

## Budget

Workspace **119.43 → 64.47 MB** (524 files) after this trim. Cap 128 MB → **63.5 MB headroom**.
