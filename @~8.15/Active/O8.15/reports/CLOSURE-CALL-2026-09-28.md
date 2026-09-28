# O8.15 closure call — 2026-09-28

## Decision

The only completed S1 subsection is **S1-A — the 169,612-byte shell conflict**. It is fully checked because its reproduction,
root-cause diagnosis, one-owner fix, regression record, semantic gates, and post-fix measurement all exist.

**S1-B, S1-C, and S1-D remain open.** Segments 1, 2, and 3 remain open.

## Why this is the correct boundary

### S1-A — close

Closed evidence:

- exact canonical chain-A reproduction,
- exact shell/call/return ranges,
- transformation-order overlap diagnosis,
- nested-return ownership fix,
- regression diagnostic,
- conservation 0 holes / 0 duplicated,
- parse, identity, order, relocation, and constraint 5/5 gates,
- post-fix ruler result recorded.

### S1-B — do not close

The run-wrap mechanism exists and passes its semantic gates, but it has not converted enough fixed/control-flow
material into movable units. The current S1-A-fixed result remains 49/73 windows above target. The remaining mass is
large function declarations/bodies in buckets 15–16. A green mechanism test is not the S1-B acceptance target.

### S1-C — do not close

The reader-window machinery and declaration relocation pass their own checks, but reader-window placement cannot move
a fixed function body until a safe body splitter converts that body into movable units. More reader-window widening
alone cannot close the target.

### S1-D — do not close

No accepted integrated S1 candidate exists. Without S1-B/C closure, there is no candidate to freeze, rebuild into the
carrier, and run through the final battery.

## Next mechanism call

Stop spending passes on seed variation and isolated placement sweeps. The next implementation is one combined S1
mechanism:

1. split large function declaration bodies in buckets 15–16 into helper declarations;
2. prove no escaping control flow, scope capture, label crossing, or `this`/`arguments`/`super`/`new.target` change;
3. preserve exact source-byte conservation;
4. let the existing reader-window/deal machinery place the resulting helpers;
5. run the integrated S1-D gates immediately.

The body splitter must be implemented as an admissible semantic transform. If a body cannot be split safely, classify
it and include it in the unreachable proof; do not mark S1-B/C complete merely because all current checks are green.

## Sections that can currently be closed

- Shared preparation/archive/runner-evidence subsections: closed individually where their checklist boxes are checked.
- S1-A: **closed**.

No complete Segment 1, Segment 2, Segment 3, or final O8.15 release closure is authorized yet.
