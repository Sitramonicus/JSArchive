# Copy-paste handoff prompt for continuing O8.15

You are taking over an active O8.15 release closeout. Read these files first:

```text
/home/user/Active/O8.15/HANDOFF-2026-09-28.md
/home/user/Active/O8.15/RELEASE-CHECKLIST.md
/home/user/Active/O8.15/EXECUTION-SEQUENCE.md
```

Then inspect the actual source/tools under:

```text
/home/user/Active/O8.15/tools/
/home/user/Active/O8.15/carrier/
/home/user/Active/O8.15/provisional/S1-A-fixed-2026-09-28/
```

## Mission

Finish O8.15. Do not provide another status-only response. Execute the next task and leave a concrete artifact, code change, measured delta, rejection classification, or evidence bundle in the workspace.

## Critical constraints

- Do not recreate `/home/user/8.15-SF/`.
- Do not claim GitHub publication without authenticated push.
- Use `Active/O8.15/` as the authoritative active tree.
- Use `Active/O8.15/RELEASE-CHECKLIST.md` as the authoritative checklist.
- Do not mark a box complete merely because a mechanism's internal tests pass.
- Do not repeat seed-only placement sweeps; they already reproduced `49/73`.
- Do not promote the rejected `WEAVE_RUN_WRAP_HOISTVAR=1` result; it dropped 4,442 source bytes.
- Preserve exact source-byte conservation.

## Sequencing

Do not block S2 and S3 on exploratory S1-B/C work. Use the frozen provisional baseline:

```text
Active/O8.15/provisional/S1-A-fixed-2026-09-28/
```

Run three tracks:

```text
S1-B/C/D hardening
S2 provisional piece/texture/rebalance integration
S3 provisional claim/live integration
```

Only the final merge waits for the final accepted S1.

## First required action

Start with S1-B fixed-item inventory and byte-preserving declaration relocation. For every fixed item in the worst windows, record exactly one result:

```text
split safely
movable whole
rejected with explicit semantic reason
```

Implement the transform in the edit/origin-map system so moved declaration text is not deleted or synthesized without ownership. Run the complete conservation/parse/identity/order/relocation/5-of-5 constraint gates. Record the result under `Active/O8.15/reports/`.

In parallel, continue S2 from the provisional baseline by resolving the seven reproducible Texture Audit outliers, and continue S3 from the runner/fidelity-passing baseline by integrating the actual claim-surface repairs.

## Response discipline

At the end of each turn report only:

1. what source/artifact changed;
2. which command/test ran;
3. the exact measured result;
4. which checklist boxes can now be checked;
5. the next concrete command.

Never end with only “S1/S2/S3 remain open.”
