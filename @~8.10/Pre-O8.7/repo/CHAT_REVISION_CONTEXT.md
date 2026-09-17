# O7.34–O7.41 Revision Context

This document fills in the revision context after the workspace’s O7.33 artifacts and before the later O7.42 experiment.

## O7.34 — definitions versus instantiated cache

O7.34 removed the invalid `modules.length > 1000` scan gate and compared the runtime’s module definitions with its instantiated cache.

Observed live diagnostics:

- approximately 8,397 definitions in `_0x2.m`;
- approximately 951 definition-source hits for decoded target strings;
- only 102 instantiated entries in `_0x2.c`;
- no expected seven-pocket matches in the selected cache.

Interpretation:

- the client uses lazy module definitions;
- `_0x2.m` and `_0x2.c` must not be treated as equivalent;
- source-string hits do not prove that a definition exports the expected object;
- module definitions should not be executed solely for ordinary diagnostics.

O7.34 did not prove that the callback runtime and push-return runtime had different scopes. It only proved that the selected instantiated cache was small relative to the definition table.

## O7.35 — lazy-module execution experiment

O7.35 scanned `_0x2.m` for target-string hits and called `_0x2(id)` for matching uninstantiated definitions.

Observed result:

```text
[O7-DIAG] Forced instantiation of 232 lazy modules.
[Google Puddle] Satchel missing pockets after forcing. Cache size: 2112.
```

Interpretation:

- 232 candidate definitions were executed;
- the cache grew from 102 to 2,112;
- all seven pockets still failed discovery;
- executing definitions was not the repair.

The forcer was diagnostic-only and must not be included in the maintained line because module execution can have side effects and does not establish that a definition is safe or relevant.

## O7.36–O7.37 — push-return repair hypothesis

The working comparison baseline O7.12 captured the runtime using the return value of `push()`:

```js
_0x2 = _0x1.push([[Symbol()], {}, r => r]);
```

Later versions primarily captured the callback argument:

```js
const entry = [[Symbol()], {}, r => { _0x2 = r; }];
_0x1.push(entry);
```

The O7.36/O7.37 hypothesis was that the callback candidate could expose a limited runtime while the O7.12 push-return candidate exposed the runtime needed for complete discovery.

The first controlled repair therefore:

- restored the O7.12 push-return form;
- retained O7.30’s `try...finally` chunk-array cleanup;
- prioritized the push return only when it had a usable `.c`;
- removed the lazy-module forcer;
- left progression, retry, cancellation, and lifecycle code unchanged.

Correct selection shape:

```js
let runtime = null;
if (pushResult && typeof pushResult.c === "object") {
  runtime = pushResult;
} else if (chunkArray && typeof chunkArray.c === "object") {
  runtime = chunkArray;
}
```

## O7.38 — confirmed working repair

O7.38 was the first live revision reported by the user as working.

Its relevant capture path was:

```js
let callbackArg = null;
const entry = [[Symbol()], {}, r => {
  callbackArg = r;
  return r;
}];

const lengthBefore = chunkArray.length;
let pushResult;
try {
  pushResult = chunkArray.push(entry);
} finally {
  if (chunkArray.length > lengthBefore) chunkArray.pop();
}

let runtime = null;
if (pushResult && typeof pushResult.c === "object") {
  runtime = pushResult;
} else if (typeof chunkArray.c === "object") {
  runtime = chunkArray;
}
```

It also added:

- candidate diagnostics for push-return and callback runtimes;
- bounded export samples;
- primitive match diagnostics;
- read-only brute-force diagnostics;
- no lazy-module forcer;
- a mandatory seven-pocket gate.

The user reported that O7.38 worked in the live client. This is the decisive result that confirms the runtime-candidate selection regression.

Confirmed root cause:

> O7.16–O7.35 could select the callback-provided runtime merely because it exposed `.c`. O7.12-compatible push-return priority restored the runtime needed for pocket discovery. The lifecycle/progression changes were not the cause of the immediate Satchel failure.

## O7.39 — diagnostic/logging refinement

O7.39 retained the working O7.38 capture and added a logging module:

```js
const LOG_LEVEL = 2;
```

It added explicit relation diagnostics:

- whether push-return and callback candidates were the same object;
- whether each had `.c` and `.m`;
- bounded cache/definition counts;
- bounded own-key samples;
- bounded export samples;
- match primitive counts;
- bounded brute-force locations.

It corrected the gate to require all seven pockets:

```js
const pocketsComplete =
  !!_0x3 && !!_0x4 && !!_0x5 &&
  !!_0x6 && !!_0x7 && !!_0x8 && !!_0x9;
```

O7.39 was a diagnostic/maintenance refinement, not a new capture hypothesis.

## O7.40 — operational logging refinement

O7.40 changed the logging level to normal operational logging:

```js
const LOG_LEVEL = 1;
```

It retained:

- push-return capture;
- seven-pocket gate;
- no forcer;
- O7.30 lifecycle/progression architecture;
- bounded retry logic;
- cleanup registration;
- manual refresh lifecycle.

The diagnostic module supports:

- level 0: logging disabled;
- level 1: operational messages;
- level 2: extensive diagnostics.

The exact source comment correctly notes that level 0 disables output but does not remove the logging code unless the script is later minified or stripped.

## O7.41 — deterministic maintenance baseline before O7.42

O7.41 retained the deterministic fixed-key decoder used by the working line:

```js
const _0xK = 0x2A;
const _0xD = a => String.fromCharCode(...a.map(c => c ^ _0xK));
```

It retained the working host capture path:

```js
const lengthBefore = chunkArray.length;
let pushResult;
try {
  pushResult = chunkArray.push([[Symbol()], {}, r => r]);
} finally {
  if (chunkArray.length > lengthBefore) chunkArray.pop();
}

if (pushResult && typeof pushResult.c === "object") {
  runtime = pushResult;
} else if (typeof chunkArray.c === "object") {
  runtime = chunkArray;
}
```

It retained the seven-pocket fail-closed condition:

```js
const pocketsComplete =
  !!_0x3 && !!_0x4 && !!_0x5 &&
  !!_0x6 && !!_0x7 && !!_0x8 && !!_0x9;

if (!pocketsComplete) {
  release();
  return;
}
```

O7.41 also removed small unused variables such as the activity `drift` value and the unused first-coin flag. These were cleanup changes and did not alter the capture repair.

## O7.41 is the pre-O7.42 baseline

For a clean handoff before the later obfuscation/evasion experiment, use this ordering:

1. O7.12 — working comparison baseline.
2. O7.30 — maintained hardened lifecycle/progression line with capture regression.
3. O7.34 — definitions/cache diagnosis.
4. O7.35 — lazy-definition execution experiment; diagnostic only.
5. O7.36/O7.37 — push-return repair hypothesis.
6. O7.38 — live-confirmed push-return repair.
7. O7.39 — extensive diagnostics and seven-pocket gate.
8. O7.40 — operational logging.
9. O7.41 — deterministic maintenance baseline.
10. O7.42 — later experiment, not part of the deterministic pre-obfuscation baseline.

## Important distinction for future maintainers

The following are separate:

- **Confirmed repair:** selecting the O7.12-compatible push-return runtime.
- **Diagnostic observation:** the client has many lazy definitions and a smaller instantiated cache.
- **Rejected production approach:** executing many module definitions to force population.
- **Pre-O7.42 baseline:** deterministic fixed-key decoding, exact routes/method names, real runtime discovery, seven-pocket fail-closed behavior, and preserved lifecycle/progression architecture.

Do not conflate the successful O7.38 capture repair with later experiments that changed timing, identity, request behavior, or obfuscation.
