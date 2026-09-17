# Investigation Loop and Validation Instructions

## Safe continuation loop

### 1. Establish a baseline

- Start from the latest known working deterministic push-return version.
- Keep a copy of the candidate under a new versioned filename.
- Do not combine capture changes with lifecycle changes in the same experiment.
- Record the exact client build and test date when live validation is performed.

### 2. Make one change at a time

For each revision:

1. State the hypothesis.
2. Change the smallest relevant block.
3. Run syntax validation.
4. Run the harness matrix.
5. Run repeated live or integration validation where authorized.
6. Record exact output and interpretation.
7. Either retain the change or revert it before the next hypothesis.

### 3. Discovery checks

Verify:

- chunk array exists;
- `push()` return is callable and has a usable `.c`;
- selected runtime is the push-return candidate when available;
- cache extraction does not throw;
- all seven pockets are found;
- no definition forcer is present;
- failure releases ownership and disposables.

Bound diagnostics to types, booleans, counts, short key samples, and match summaries. Do not dump request data or full module/member contents.

### 4. Lifecycle checks

Verify:

- duplicate run is rejected;
- release is idempotent;
- timers and event listeners are removed;
- registered desktop/stream cleanup runs once;
- hooks are restored after completion, cancellation, timeout, and setup failure;
- active task tokens remain until handed-off work cleans up;
- route changes pause and resume correctly;
- document visibility affects delays without breaking cancellation;
- manual refresh behavior is explicit and consistent.

### 5. Network/progress checks

Verify:

- retry count is bounded;
- 401 handling aborts critical work as designed;
- 429 handling honors bounded retry timing;
- 5xx handling uses bounded backoff;
- nonretryable errors reach task-level handling;
- progress values are finite and nonnegative;
- completion uses confirmed server progress or completion responses;
- timestamps/progress never regress due to local arithmetic.

## Suggested harness matrix

Run varied repeated cases covering:

1. unavailable module doorway;
2. unusable push-return candidate;
3. valid fallback runtime;
4. missing one pocket;
5. all seven pockets found;
6. no eligible tasks;
7. unsupported task shape;
8. invalid target;
9. video progress response with confirmed progress;
10. video response without progress;
11. desktop task setup failure;
12. desktop task handoff and cleanup;
13. stream task setup failure;
14. stream task handoff and cleanup;
15. activity timeout;
16. cancellation during delay;
17. cancellation during retry;
18. route change pause/resume;
19. hidden/visible document transitions;
20. 401 critical response;
21. 429 retry and exhaustion;
22. 5xx retry and exhaustion;
23. duplicate-run ownership;
24. release idempotence;
25. manual refresh arming;
26. cleanup after partial setup.

## Syntax validation

For a standalone JavaScript file:

```bash
node --check path/to/candidate.js
```

For browser-console source, first save the exact source to a file without changing it, then run `node --check` against that file. Do not validate a shortened or placeholder version.

## Versioning and records

For each candidate, record:

- version identifier;
- source checksum;
- parent version;
- one-line hypothesis;
- exact changed sections;
- syntax result;
- harness result;
- live result if applicable;
- decision and reason.

Keep failed diagnostics as findings; do not erase them or relabel them as production failures.

## Completion criteria

Do not call the maintained line complete until:

- push-return capture works;
- all-seven gate works;
- syntax passes;
- the varied harness matrix passes;
- lifecycle cleanup passes;
- retries are bounded;
- no arbitrary definition execution is required;
- progression and feature parity remain intact.
