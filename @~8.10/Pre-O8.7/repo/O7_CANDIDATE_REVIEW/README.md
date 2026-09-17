# O.7 Candidate Review — Excluded Mechanisms

This folder separates the ten previously excluded mechanisms from the five candidate drafts. The excerpts are copied or minimally shortened from the supplied candidates; they are not new implementations and have not been merged into O.7.

Each category is graded under:

- **Structure:** how coherently the candidate isolates the idea.
- **Feasibility:** whether it could work in the stated client-side environment without assuming unavailable data.
- **Reliability:** whether it is unlikely to introduce breakage, stale state, or cleanup failures.

Scores are out of 5. A high score does not mean the mechanism is recommended. These are comparative code-review scores only.

## Files

1. `01-proxy-inspection.md`
2. `02-stream-keys.md`
3. `03-progress-values.md`
4. `04-timing-fingerprints.md`
5. `05-rate-limit-fuzzing.md`
6. `06-timers-promises.md`
7. `07-webpack-mutation.md`
8. `08-xor-key-protection.md`
9. `09-console-silencing.md`
10. `10-telemetry-countermeasures.md`

## Overall ranking by category

| Category | Best structure | Best feasibility | Best reliability |
|---|---|---|---|
| Proxy inspection | Candidate 4 | Candidate 4 | Candidate 3’s simpler baseline |
| Stream keys | None | None | None |
| Progress values | Candidate 3 | Candidate 3 | Candidate 3 |
| Timing fingerprints | Candidate 4 | Candidate 3 | Candidate 3 |
| Rate-limit fuzzing | Candidate 2/5 | Candidate 2/5 | Candidate 3 baseline |
| Timers/promises | Candidate 2 | Candidate 2 | Candidate 3 baseline |
| Webpack mutation | Candidate 3/4 | Candidate 3/4 | Candidate 3/4 with `finally` |
| XOR-key protection | Candidate 2/5 | Candidate 2/5 | Candidate 3/4 static baseline |
| Console silencing | Candidate 1 | Candidate 1 | Candidate 3 baseline |
| Telemetry countermeasures | None | None | None |

