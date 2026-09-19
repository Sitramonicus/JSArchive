# HANDOFF-NEXT — O8.14 after spring cleaning

**Written:** 2026-09-19 (Asia/Shanghai)  
**Current line:** O8.14  
**Gate:** cleanup and handoff complete; CC-01 / O8.14-B0 measured; CC-02+03, CC-04 through CC-14 candidates simulated PASS; candidate-only  
**No credentials are stored in this current handoff.**

## Cold-start sequence

1. Read `Handoff/AGENT-OPERATING-RULES.md`.
2. Read `Handoff/HANDOFF.md` and `Handoff/O8.14-SF-REMOTE.md`.
3. Use that remote pointer for `@~8.14/8.14-SF/CONTEXT-MAP.md` and `@~8.14/8.14-SF/CHAT-HISTORY/README.md`; read the full trace only when a historical detail is needed.
4. Read `Active/O8.14/O8.14-FAC-CC-PLAN.md`.
5. Verify the frozen baseline before any later CC work:

```bash
node verify-golive.mjs
(cd Working-Stable/O8.13 && sha256sum -c SHA256SUMS.txt)
```

## What the cleanup did

`@~8.14/8.14-SF/` is the intended GitHub staging path `@~8.14/8.14-SF/`. It contains a move log, archive hashes/member manifests, historical raw notes, and the collated chat histories.

- Generated O8.13 lane outputs, old selected shards, and old active `final-package/` were compressed into `archives/O8.13-generated-outputs-2026-09-19.tar.gz`.
- Obsolete stego builders/loaders/tests/tools were compressed into `archives/legacy-stego-tools-2026-09-19.tar.gz`.
- The superseded O8.13-r2 candidate was compressed into `archives/O8.13-r2-candidate-2026-09-19.tar.gz`.
- The old full changelog and superseded handoff/planning files were compressed into `archives/handoff-history-through-2026-09-19.tar.gz`.
- Old Uploads inputs/reports were compressed into `archives/uploads-context-2026-09-19.tar.gz`.
- O8.13 plans and useful human-readable notes are in `context/raw-docs/`.
- The old `Handoff/CHAT-HISTORY/`, two Handoff gzip histories, and lowercase `uploads/` trace exports are together under `CHAT-HISTORY/` with source identity preserved.

The active tree now contains source and current tests, not a choice of several generated release outputs. If an old generated file is needed, verify the archive hash, extract into `/tmp` or another scratch directory, and use it explicitly.

## What was not changed

`Working-Stable/O8.13/`, `Archives/packages/O8.13/`, and `Archives/packages/O8.13-r3/` remain frozen and recoverable. The release identity is runner `d4de42af`, bundle `604f4434`, cover `3bbe7345`; use their manifests for full hashes. `Active/O8.13/live` is a pointer only. CC-01/B0 is recorded under `Active/O8.14/CC-01-B0/` with a PASS baseline report.

## O8.14 acceptance vocabulary

- FaC = Feature and Change.
- CC = Compiled Change.
- CC-01 / O8.14-B0 = baseline instrumentation, no intended behavior change.
- VM-S = the one planned custom shard/core VM.
- FaC-10 = bounded parser/codec, not a second VM.
- FaC-17 = primary-preserving live-host activity and diagnostic-pressure containment; assigned to CC-03.

The regression baseline is 25/25, corrected 16/16, stego 43/0 where applicable, release manifest parity, self-identifying names, bounded malformed/abort behavior, and current host/memory/cleanup measurements. The detailed matrix is in the plan, not in this summary.

## Historical references

`@~8.10` establishes the separated active/archive/docs/handoff layout. `@~8.12` establishes explicit compressed-history and trim areas. `@~8.13` establishes the `8.13-SF` staging pattern and cold-start release handoff. Use them to understand layout and provenance; do not copy their old raw packages or staging folders into O8.14.

## Required next action

CC-01/B0 is measured in `Active/O8.14/CC-01-B0/`; its gate is PASS. The combined CC-02+03 candidate is under `Active/O8.14/CC-02-03/`; separate CC-04 and CC-05 candidates are under `Active/O8.14/CC-04-VM-S/` and `Active/O8.14/CC-05-Parser/`. Separate CC-06, CC-07, and CC-08 candidates are under `Active/O8.14/CC-06-CSS-HTML/`, `Active/O8.14/CC-07-XML-XSLT/`, and `Active/O8.14/CC-08-GLSL/`; CC-09 / R2-08 is under `Active/O8.14/CC-09-R2-08/`. The requested diagnostic runner is `Active/O8.14/14r1/O8.14-14r1-runner.js`; its completion instruction is now `F5 whilst in console`, and it is staged but not yet live-tested. All candidates have simulated PASS gates but are not live-eligible. The ready-pasteable public-history document is `Handoff/ODYSSEY-VERSION-TIMELINE-READY.md`. A live O8.13-r3 incident and its cause determination are recorded in `Handoff/O8.13-R3-LIVE-INCIDENT-2026-09-19.md`; preserve the O8.13-r3 mirrors and complete the bounded real-host diagnostic before promotion.
