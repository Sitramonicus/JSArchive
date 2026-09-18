# 8.13-SF (Saved Files / Superfluous Files)

**Date:** 2026-09-18  
**Target Repository Path:** `<repo>/@~8.13/8.13-SF`

---

## Notice for Future Agents & Operators

This folder aggregates archived, historical, backup, and superfluous files moved out of the active sandbox root to optimize workspace footprint (reducing sandbox size from **102.11 MB** down to **52.76 MB**, well clear of the ~128 MB snapshot cap).

**These files are NOT needed for live builds, active tests, or go-live operations:**
- Active source code lives in `Active/O8.13/` and `Active/Stego/`.
- Shipped paste artifacts live in `Working-Stable/O8.13/` (verified via `node verify-golive.mjs`).
- Frozen packages live in `Archives/packages/`.
- Active handoff documentation and passwords live in `Handoff/` (`CHANGELOG.md`, `HANDOFF-NEXT.md`, and `Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt`).

### Safe Removal from Sandbox Workspace
Once the operator commits/pushes this directory to GitHub under `<repo>/@~8.13/8.13-SF/`, this entire `8.13-SF/` directory can be safely removed from `/home/user/` via:
```bash
rm -rf /home/user/8.13-SF
```
Future agents needing historical context, old carrier tarballs, or past era notes can inspect them directly in the GitHub repository at `@~8.13/8.13-SF/` or restore specific items via Git.

---

## Contents Inventory

| Subdirectory / File | Size | Description |
|---|---|---|
| `_COMPRESSED-HISTORY/` | ~49 MB | Compressed tarballs of retired lines (`Archives-packages-O8.8-O8.9-O8.11-2026-09-18.tar.xz`, `Active-O8.12-r4-FROZEN-2026-09-17.tar.xz`, `ARCHIVE_TRIM-2026-09-18.tar.xz`, `superseded-carriers-stego-r5-r6-2026-09-18.tar.xz`), historical manifests, and era summaries. |
| `_BACKUPS/` | ~292 KB | Historical pre-r3 shard backups from 2026-09-16 (`O8.13-g7-strings-pre-r3-20260916`, `O8.13-pre-strict-20260916`). |
| `Docs/` | ~920 KB | Historical architectural documentation across past generations (`O7-ERA.md`, `O8.2-O8.4-ERA.md`, `O8.5-ERA.md`, `O8.6-S3-S4.md`, `PIPELINE-GUIDE.md`, `TECHNIQUES.md`, `CHEATSHEET.md`). |
| `shards-history/` | ~252 KB | Historical shard reconstruction documentation (`RECONSTRUCT.md`) and diff scrubs 1 through 5. |
| `@~8.12/` | ~8 KB | Historical 8.12 packaging helper script (`PACK-@~8.12.sh`) and stub README. |
| `stego-r3/` | ~12 KB | Historical stego-r3 stub notes and old `rotation.json`. |
| `README.md.old` | ~2 KB | Previous workspace root README prior to the go-live restructuring. |
| `WORKSPACE-STATUS.md` | ~7 KB | Historical status document from the O8.12-r4 freeze (2026-09-16). Superseded by root `README.md`, `GO-LIVE.md`, and `Handoff/HANDOFF-NEXT.md`. |
| `test-stego11-tiers.mjs.bak` | ~14 KB | Historical backup copy of the stego tier test harness. |
