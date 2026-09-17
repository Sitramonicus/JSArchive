# Handoff discipline — updated 2026-09-17 for @~8.10 / @~8.12

Rule: a dead chat must never lose context again. After the 2026-09-17 move, repo root has `@~8.10/` (history, frozen) and `@~8.12/` (live line). **All new edits live in `@~8.12/`; paths in `HANDOFF.md` assume `cd @~8.12`.**

- `HANDOFF.md` is the **nil-ready resume doc** (2026-09-17, O8.12-r4 `1e03f48` frozen + O8.13 bench `851b28e5`). Update it whenever live line moves; it replaces all earlier handoffs. Legacy frozen at O8.11 is `HANDOFF-LEGACY-O8.11-2026-09-15.md`.
- `DIR-MAP-@~8.10-@~8.12.md` maps GitHub `@~8.10` vs `@~8.12` dirs and the `git mv` you will have done.
- `PROGRESSION-A-N-O.md` distills Script A → N (N14/N15) → O (O1–O8…O8.13) lineage so next agent doesn't re-ask.
- `INSTRUCTION-PROMPT.md` is the full Tasks spiel (FaCs/CCs, operator constraints, ELI5, `gate→FaC` rename) to paste at session start if reconstructing from nil.
- `CHAT-HISTORY/Agent-Run-2026-09-16-full.txt` (5.5M, also `.gz`) is the sanitized Arena trace `NODE 1..14422` you must tell the next agent to read. See its `README.md`.
- `CHANGELOG.md` newest first; `CHANGELOG-LEGACY.md` holds O7 legacy. `CHATLOG-S5-STEGO.txt.gz` is frozen S5/stego log; next session freezes as `CHATLOG-O8.13.txt` in `CHAT-HISTORY/`.
- Pacing: run **multiple gates/features per response** with multiple check/test/revision passes (user 2026-09-12). Every 5 messages update `Handoff/` or append `[TOKEN WARNING: Consider Exporting Now]` and flush.
- Also in `Active/O8.13/`: `Handoff_O8.13_2026-09-16.md` (trim+bench) + `AVENUES-O8.13-COLLATED.md` (tick-list for Discord-stealth).
- When downloading from Arena: workspace root `/home/user` is the payload for `@~8.12/` (tar `DOWNLOAD-@~8.12-2026-09-17.tar.gz` 68M at root).
