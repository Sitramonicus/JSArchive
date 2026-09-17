# Dir Map — @~8.10 (history) vs @~8.12 (live line) — 2026-09-17

> **For GitHub `Sitramonicus/JSArchive` after you download.**
> The Arena workspace root (`/home/user`) is the **payload for `@~8.12`**. The repo's current root **becomes `@~8.10`** after you move it.

## What you will do in GitHub (one-time move)

```bash
# in local clone of JSArchive (github.com/Sitramonicus/JSArchive)
git mv Handoff Handoff-old-tmp  # or just create @~8.10
mkdir -p "@~8.10" "@~8.12"
# move everything that is currently at repo root INTO @~8.10
# (keep .git at root, move tracked files)
for f in Handoff Active Archives Docs Uploads Pre-O8.7 README.md; do
  [ -e "$f" ] && git mv "$f" "@~8.10/$f" 2>/dev/null || mv "$f" "@~8.10/$f"
done
# now unpack the download (DOWNLOAD-@~8.12-2026-09-17.tar.gz → @~8.12)
tar -xzf ~/Downloads/DOWNLOAD-@~8.12-2026-09-17.tar.gz -C "@~8.12" --strip-components=0
# or if download is a folder, cp -a ~/Downloads/@~8.12/* @~8.12/
git add "@~8.10" "@~8.12"
git commit -m "version @~8.10 (O8.10/O8.11 frozen) + @~8.12 (O8.12-r4 frozen + O8.13 bench)"
```

After this, **repo root contains nothing but `@~8.10/`, `@~8.12/`, `.git/`, and a top-level `README.md` that points to both.**

## What lives where

| Path in GitHub after move | What it is | Workspace path before upload (`/home/user`) |
|---|---|---|
| `@~8.10/Handoff/` | Handoff as of 2026-09-15 (O8.11 frozen `fb32c3a8`, O8.10 `8b9f310b`) — changelog, honey-bible, old plans | Old `Handoff/` before this session — now archived |
| `@~8.10/Active/O8.6/` (becomes `O8-legacy` in 8.12) | O8.6 lineage + O8.11 frozen bytes | Mirrors `Active/O8-legacy/` but older snapshot |
| `@~8.10/Archives/packages/O8.8, O8.9, O8.7-*` | Frozen rolling packages | — |
| `@~8.10/Pre-O8.7/` (compressed to `_COMPRESSED-HISTORY/Pre-O8.7-COMPRESSED.md` in 8.12) | 768 files pre-O8.7 (o8cmp, repo, uploads) | See `@~8.12/_COMPRESSED-HISTORY/` |
| `@~8.12/Handoff/` | **Current handoff** — this dir-map + `HANDOFF.md` (nil-ready) + `CHAT-HISTORY/` + `INSTRUCTION-PROMPT.md` + `PROGRESSION-A-N-O.md` | `/home/user/Handoff/` (as of 2026-09-17 03:48) |
| `@~8.12/Active/O8.12-r4/` | **FROZEN live** `1e03f48` 1.66M bundle `f36e79` stego `a206aa` 1024×768 | `/home/user/Active/O8.12-r4/` |
| `@~8.12/Active/O8.13/` | **Bench** copy of R4 + `Handoff_O8.13` + `AVENUES-O8.13-COLLATED.md` — all future edits go here | `/home/user/Active/O8.13/` |
| `@~8.12/Active/Stego/stego-r4/output/` | Sole live stego `O8.12-runner.js 3.36M f36e79` `O8.12-cover.bmp 2.35M a206aa` | `/home/user/Active/Stego/stego-r4/output/` (`output-1024 → symlink`) |
| `@~8.12/Active/O8-legacy/` | Renamed from `O8.6` (bad scheme `O8.6-Final-*` → `O8-legacy`) — keeps O8.11 frozen | `/home/user/Active/O8-legacy/` |
| `@~8.12/_COMPRESSED-HISTORY/` | `Pre-O8.7-COMPRESSED.md` 6.4M + `Archives-pre-O8.8…` + `stego-r3-2026-09-16.tar.gz` 8.8M + etc. | `/home/user/_COMPRESSED-HISTORY/` |
| `@~8.12/tools/` | `auto-trim.sh` (hook 95MB) | `/home/user/tools/` |

## How the next agent finds things

- **If starting from nil (fresh clone of JSArchive):**
  ```bash
  git clone https://github.com/Sitramonicus/JSArchive.git && cd JSArchive
  ls @~8.10 @~8.12  # both version folders exist
  # live work is in @~8.12 — cd there for all commands in HANDOFF.md §0 item 2
  cd "@~8.12"
  cat Handoff/HANDOFF.md  # nil-ready handoff (this file's companion)
  cat Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt  # 5.5M full trace if needed
  bash tools/auto-trim.sh  # expect 79MB under 95
  ```

- **If still in Arena workspace (`/home/user`) before upload:**
  ```bash
  # paths are without @~8.12 prefix
  cat Handoff/HANDOFF.md
  cat Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt
  ls Active/O8.12-r4/final-package/ | head
  ```

- **Path translation:** Every path in `@~8.12/Handoff/HANDOFF.md` is written **as if `@~8.12` is the repo root** (e.g., `Active/O8.12-r4/...`). If you are at GitHub root, prepend `@~8.12/` to those paths. The same file exists in Arena at `/home/user/Handoff/HANDOFF.md` (no prefix).

## Why two version folders

- `@~8.10` freezes the **stable line** you last pushed (O8.10 `8b9f310b` + O8.11 `fb32c3a8`, Reports 6 assessed). It stays untouched — reference for diffing, forensics, and `Archives/RETIRED.md` lineage.
- `@~8.12` holds the **RIPCORD line** (O8.12-r4 `1e03f48` + O8.13 bench `851b28e5`). All edits, rebuilds, and trims happen here. When O8.13 freezes, it becomes `@~8.12`'s rolling current; `@~8.10` still holds history.

**Freeze rule (unchanged):** overwriting `Archives/packages/<line>/` etc. Now means `@~8.12/Archives/packages/<line>/`.

## Download package

- `DOWNLOAD-@~8.12-2026-09-17.tar.gz` (68M) at workspace root (`/home/user/`) — contains exactly the tree that becomes `@~8.12/`. Extract with `tar -xzf ... -C "@~8.12"`.
- `Handoff/CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` (5.5M, also `.gz` 1.7M) — full sanitized Arena trace `NODE 1..14422` from nil recovery through R4→O8.13 trim. Place it at `@~8.12/Handoff/CHAT-HISTORY/` (already there in download).
