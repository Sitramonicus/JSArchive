# O8.14-14r1 live-test runner

**Status:** diagnostic candidate-only; not a release or promotion artifact  
**Base:** CC-05 candidate  
**Frozen baseline:** O8.13-r3

`O8.14-14r1-runner.js` is the synchronous paste runner for the CC-05 candidate. It embeds the
candidate bundle and has no external file or CDN dependency. It is intended only for the bounded
operator live test; it must not be treated as a shipped O8.14 release. The non-working Alt+Shift+R
reload path is removed; the completion log now says `F5 whilst in console`. Alt+Shift+X remains the
abort path.

## Preflight

- Use a disposable/test account and preserve the clean-control comparison.
- Start with a clean Discord reload and clear/close persisted DevTools console history.
- Use capped external capture; do not use DevTools console history as the measurement store.
- Stop immediately on a generic crash screen, repeated long-task cascade, overlay churn, or storage
  quota error.
- After completion or abort, reload/quit Discord and verify no synthetic activity, listeners, timers,
  hooks, or overlay-facing records remain.

## Verification already completed

The embedded CC-05 candidate passed the bounded S1 simulated test: desktop/stream primary behavior,
activity dispatch, and completion all remained functional. That simulation is not a substitute for
the real-host control comparison.

## Files

- `O8.14-14r1-runner.js` — canonical synchronous paste runner.
- `BUILD.json` — candidate identity and provenance.
- `SHA256SUMS.txt` — local runner/manifest hashes.

No O8.13-r3 payload, runner, bundle, cover, carrier, manifest, or verification bytes were changed.
