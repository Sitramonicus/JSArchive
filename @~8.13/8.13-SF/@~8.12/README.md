# @~8.12 — O8.12 RIPCORD line (R4 frozen + O8.13 bench) — placeholder for GitHub

This folder exists inside the Arena workspace (`/home/user/@~8.12/`) as documentation.
The **payload** for GitHub `@~8.12/` is the **workspace root itself** (`/home/user/`).

To create the upload tar (68M, 79MB trimmed):
  bash @~8.12/PACK-@~8.12.sh   # creates /tmp/DOWNLOAD-@~8.12-2026-09-17.tar.gz
  # then in your local JSArchive clone:
  mkdir -p @~8.12 && tar -xzf /tmp/DOWNLOAD-@~8.12-2026-09-17.tar.gz -C @~8.12
See `Handoff/DIR-MAP-@~8.10-@~8.12.md` for the `git mv` that turns current root into `@~8.10/`.

Snapshot now 102.28MB (Active-eng 42.12 + _COMP 37.55), auto-trim 79MB under 95.
