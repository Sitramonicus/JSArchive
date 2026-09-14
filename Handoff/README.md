# Handoff discipline

Rule: a dead chat must never lose context again.

- `HANDOFF.md` is the resume-from-zero doc. Update it whenever the live line
  moves (new build, new milestone, layout change) — don't let it go stale.
- `CHANGELOG.md` gets one entry per meaningful change, newest first. Small,
  factual, dated. Legacy O7-era entries live in `CHANGELOG-LEGACY.md`.
- `CHATLOG-S5-STEGO.txt` is the frozen S5/stego working chatlog. When the next
  long working session ends, freeze its log the same way
  (`CHATLOG-<milestone>.txt`) and distill decisions into `HANDOFF.md` /
  `CHANGELOG.md` — don't accumulate live context in chat only.
- Pacing: one-gate-per-response is retired — run multiple gates/features per
  response with multiple check/test/revision passes (user 2026-09-12).
