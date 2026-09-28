# O8.15 finish route — bounded closeout

## Correction

“Open” is a current status, not a conclusion that O8.15 cannot finish. The release route is to either reduce the ruler
below target or produce the required exhaustive unreachable certificate for the residual fixed mass, then freeze one
accepted S1 candidate and move through S2 and S3 without reopening the same question.

## Finish sequence

### Gate 1 — S1-B: convert or classify the remaining fixed mass

Use the current S1-A-fixed census as the starting point. The remaining concentration is in buckets 15–16, dominated by
large function declarations/bodies.

Implement one bounded body-splitting pass with explicit rejection reasons for:

- escaping return/break/continue,
- label crossing,
- `this`, `arguments`, `super`, or `new.target` capture,
- binding/initialisation escape,
- async/generator and exception timing,
- private/directive/parameter constraints.

Every statement must end in exactly one of: safely split, safely placed whole, or rejected with a recorded semantic
reason. No silent refusal is admissible.

### Gate 2 — S1-C: distribute the accepted units

Run the existing reader-window/deal placement against the accepted split units. Exhaust the bounded parameter space:

- body split boundaries,
- helper grouping,
- run-wrap size,
- declaration placement,
- deterministic placement seed.

Retain the best candidate and a machine-readable search ledger. Stop searching when either:

1. `windows_above_target = 0`; or
2. every remaining fixed byte is covered by a rejection class whose safety condition proves it cannot cross the
   required helper/window boundary.

The second result is the formal unreachable closure path already required by the checklist; it is not a failure.

### Gate 3 — S1-D: freeze and integrate

Take the accepted candidate, rebuild the carrier, and run the complete S1 battery:

- parse,
- conservation,
- statement identity,
- relative order,
- relocation,
- 5/5 independent constraints,
- permutation/order checks,
- decoder-failure continuity,
- carrier hash and reproducibility.

Freeze the candidate. No further exploratory S1 changes after this gate.

### Gate 4 — Segment 2

Run S2 against the frozen S1 candidate, in this order:

1. integrate into the piece pipeline;
2. perform source-level e-shard/control-flow rebalance;
3. rerun Scorecard;
4. resolve the seven Texture Audit outliers;
5. rerun Mirror Widening;
6. verify hashes, shard cardinality, decoder-failure continuity, and exactly one e1 guard/token path;
7. freeze the integrated piece bundle.

S2 closes on the integrated battery, not on an intermediate S1 artifact.

### Gate 5 — Segment 3

Run the six claim-surface repairs against the frozen S2 bundle:

1. integrate Verb Receipts into the real claim path;
2. print queue or exactly one reason for every view call;
3. add e4-roster ledger fallback;
4. implement bounded early-stop notice/re-arm without duplicate workers;
5. validate paste → finish → repaste;
6. audit token, pins, lex mode, and level with no persistent writes;
7. rerun runner self-test and 17/17 fidelity;
8. run the two-pass live protocol through the second completion;
9. prove no silent claim path and no duplicate worker.

### Gate 6 — final release

Freeze S1–S3, rebuild chain A, record hashes, run the full offline/carrier/decoder-failure/piece/live evidence batteries,
trim derived artifacts, and only then request removal of any remaining local release workspace.

## Operating rule

Do not report “S1/S2/S3 remain open” as the end state. At each turn, execute the next gate or produce the evidence
that closes its fallback branch. The release state advances monotonically:

```text
exploration → accepted S1 → frozen S2 bundle → frozen S3 bundle → final 8.15 release
```
