# e-family golden trace — re-baseline, build 17 → build 18 (2026-09-21)

Frozen by `tools/split-equivalence.mjs --write-baseline reports/split-equivalence-e-golden.json`.
Previous reference kept as `split-equivalence-e-golden-b17.json`; the raw comparison that moved it is
kept as `split-equivalence-e-golden-delta-b17-b18.txt`.

## The delta, in full

    26 events -> 25 events
    first divergence at event 16
      ref (build 17):  [ lex.P|21:…, log.say|C2|P21, get|r2gate.v814mosஇsu65, log.diag|ember ridge — standing by ]
      run (build 18):  [ lex.P|21:…, log.say|C2|P21, log.diag|ember ridge — standing by, log.diag|moss tundra — lattice quiet ]

One event disappeared: the property read `get|r2gate.v814mosஇsu65` — i.e. the stand-down sites no
longer touch the hard deleter. Every other event, in order, is identical. That is exactly the edit:
the ten benign stand-down call sites moved from `_0xmod.v814дебдмл166?.v814mosஇsu65?.()` to
`_0xmod._standDown?.('<reason>')`, and the only observable in this host is the vanished read (the mock
`_0xmod` has no `_standDown`, so the optional call is a no-op there — same as the old stub call).

## Why re-baselining is the correct move here, not a cover-up

The golden trace exists to catch *unintended* movement (the LIVE-3 rule: the e family no longer has a
1:1 pre-split ancestor, so the honest reference is a frozen trace of the shipped pieces). A change
that is (a) intended, (b) reviewed event-by-event, and (c) recorded alongside the old reference is a
re-baseline, not a suppression. If a future run moves any event other than the ones a commit
declares, the diff is again a defect report.

Anchor for the next reader: build 17 golden = 26 events; build 18 golden = 25 events; the single
removed event is `get|r2gate.v814mosஇsu65`.
