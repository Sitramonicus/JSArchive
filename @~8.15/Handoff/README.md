# Handoff directory — current O8.14 entry point

Read in this order:

1. `../Working-Stable/O8.14/FROZEN-2026-09-22.md` — **the freeze**: frozen identity, digests, how to verify,
   what is accepted, and the provenance chain. O8.14 is closed at build 23.
2. `O8.15-CHARTER-2026-09-25.md` — **the 8.15 charter**: premise, the no-regression law, the residual ledger
   (D1–D9, E1–E8, R1–R5), and what 8.15 is not.
3. `O8.15-BUILD-25-HANDOFF-2026-09-26.md` — **latest: the live test.** What to paste, what to expect, what
   the offline gates already prove. Build 25 = the complete 8.15 build; the D-ledger is closed.
4. `O8.15-PREP-AND-ARM-A-2026-09-26.md` — the earlier prep record (line opened, arm A built and verified,
   b24 = arm A + split, gated); superseded by build 25.
5. `O8.15-BACKLOG.md` — everything carried forward; B22–B28 record what landed in build 25 and what the next
   levers are (B27 level-2 weave, B23 held split classes).
6. `GITHUB-EXPORT-2026-09-22.md` — the export plan: what is tracked, what was redacted, naming caveat.
7. `AGENT-OPERATING-RULES.md` — execution and time limits.
8. `HANDOFF.md` — current O8.14 status, retained/retires classification, O8.13-r3 baseline, and the next gate.
9. `HANDOFF-NEXT.md` — cold-start reconstruction checklist.
10. `R3-SECURITY-AUDIT-2026-09-18.md` — the frozen-line security boundary and findings.
11. `../8.14-SF/README.md`, `CONTEXT-MAP.md`, and `CHAT-HISTORY/README.md` — spring-cleaning proof and historical context.
12. `../Active/O8.15/README.md` — the 8.15 working line (layout, build, evidence, snapshot budget).
13. `../Active/O8.14/O8.14-FAC-CC-PLAN.md` — the only current O8.14 implementation plan.

The former large changelog and older handoff documents are preserved in
`8.14-SF/archives/handoff-history-through-2026-09-19.tar.gz`; they are not silently deleted.
The former `Handoff/CHAT-HISTORY/` is now collated under `8.14-SF/CHAT-HISTORY/`.

**Gate:** 8.14 is frozen at build 23 (verify: `cd Working-Stable/O8.14 && sha256sum -c SHA256SUMS.txt` = 8/8).
**8.15 build 25 is complete** (arm A + normaliser + split + weave + constraint pass), all gates green and
the D-ledger closed (`Active/O8.15/DECISIONS.md`); the next gate is the operator's live paste of
`Active/O8.15/CC-34/final-package/O8.15-CC-34-runner-802c4763.js` with its cover. Never modify the frozen 8.14 / O8.13-r3 release bytes, and never edit the 8.14
toolchain — 8.15 changes live as copies under `Active/O8.15/`.
