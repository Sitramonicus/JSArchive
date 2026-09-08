# Quest Suite / O7 GitHub Handoff

This folder is the complete workspace handoff for continuing the O7 investigation and maintenance work.

## Start here

1. Read `CURRENT_STATE.md`.
2. Read `o7-iterations/O7.CONTEXT_HANDOFF.md`.
3. Compare `o7-iterations/O7.12.js` with `o7-iterations/O7.30.js`.
4. Read `o7-iterations/O7.30_module-capture-investigation.md` and `O7.33_module-capture-findings.md`.
5. Read `O7.39-41_COMPLETE_CHANGE_CHECKLIST.md`.
6. Follow `LOOP_AND_VALIDATION.md` before changing the maintained line.

## Current technical result

The immediate all-pockets-missing regression was repaired by restoring O.7.12-compatible push-return runtime capture while retaining O.7.30’s lifecycle and progression architecture.

The working capture pattern is:

```js
const before = chunkArray.length;
let pushResult;
try {
  pushResult = chunkArray.push([[Symbol()], {}, r => r]);
} finally {
  if (chunkArray.length > before) chunkArray.pop();
}

const runtime = pushResult && typeof pushResult.c === "object"
  ? pushResult
  : chunkArray && typeof chunkArray.c === "object"
    ? chunkArray
    : null;
```

The maintained discovery path requires all seven pockets and fails closed if any are absent. Do not reintroduce the old callback-first selection or arbitrary lazy-module execution.

## Directory guide

- `o7-iterations/` — chronological O7 scripts, audits, reviews, diagnostics, and tests.
- `o7-iterations/O7.CONTEXT_HANDOFF.md` — detailed investigation history and evidence.
- `o7-iterations/tests/` — harnesses and lifecycle regression tests.
- `dev/all_scripts.txt` — archived historical script versions.
- `dev/harness.js` — harness entry point.
- `O7_CANDIDATE_REVIEW/` — candidate reviews and excluded-mechanism notes.
- `compiled-scripts-A-to-O8.js` — compiled historical collection.
- `HANDOFF_SHA256SUMS.txt` — checksums for the package contents.

## Later chat-only revisions

O7.38 through O7.42 were exchanged later in chat. O7.38 was reported working live; O7.39–O7.41 refined logging and packaging. The complete pasted O7.41/O7.42 source was not previously saved as a workspace file, so it is not silently represented as a checked-in artifact here. If needed, save the exact selected source as a new file and record its checksum before continuing.

The recommended continuation baseline is the deterministic push-return/seven-pocket design represented by the earlier workspace history and the handoff findings.
