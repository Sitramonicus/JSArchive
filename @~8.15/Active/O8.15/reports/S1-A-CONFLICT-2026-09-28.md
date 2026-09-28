# Segment 1-A — 169,612-byte shell conflict: resolved

**Run date:** 2026-09-28
**Input:** canonical chain A extracted from `O8.15-pinned-chainA-2026-09-28.tar.gz`
**Input SHA:** `bf5f21163727850caa03ead3913f0f5f19da0e99a2797a7bebfb33d7093726d3`
**Seed:** `2648369387`

## Original reproduction

The target shell was the exact atom reported earlier:

```text
atom:             1,166,721–1,336,333
function body:    1,166,722–1,336,322
call:             1,166,722–1,336,333
return:           1,210,071–1,210,483
return argument:  1,210,078–1,210,482
```

The earlier `shape` refusal was caused by transformation order. A nested shell was labelled first. The enclosing
169 KB shell then scanned the already-rewritten nested return as if it were an own-level return and attempted to
claim the same edit range with its own label. The conflict guard correctly refused it, but the refusal was not the
underlying semantic reason.

The owner trace proved this directly:

```text
source 1198507:1198768
current/enclosing shell 1166740:1336322
current call 1166722:1336333
prior edit 1198507:1198768
```

A second nested return overlap was also found at `1198785:1198793`.

## Fix

The labelled-shell pass now excludes return ranges already owned by a nested shell edit from the enclosing shell's
own-return set. Nested return ownership remains with the nested labelled expansion; the enclosing shell owns only
its remaining own-level returns. The conflict is logged as `[shell-overlap]` in debug mode and is no longer counted
as a shape refusal.

The source-range shell identity guard remains in place, so a shell itself is still expanded at most once.

## Regression fixture/tool

`Active/O8.15/tools/diagnose-shell-conflict.mjs` parses the canonical input and asserts the large IIFE and return
ranges. The exact owner overlap is recorded here and is reproducible with `WEAVE_DEBUG=1`. This report is the
regression record: a future run must show the two `[shell-overlap]` lines and no `shape` refusal for the 169,612 B
atom.

## Post-fix gates

Full stack used:

```text
WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1
WEAVE_RUN_WRAP=1 WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1
WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1
```

Results:

```text
125 shells inlined · 616 KB atom material
shape refusals: 9774 (the target atom is absent from the >=20 KB refusal list)
privacy refusals: 17
scoped shells: 21
renamed function collisions: 28
run-wrap: 33 helpers / 3,703 statements / 290 KB
content conservation: 2,215,543 B kept · holes 0 · duplicated 0
output parses: PASS
statement identity: PASS
relative order: PASS
relocation safety: PASS
constraint pass: 5/5 PASS
movable set: 1,115,998 B = 50.2%
```

External ruler:

```text
worst share: 0.4025 (bucket 15)
mean max-share: 0.2797
excess over 0.25: 3.145
windows above target: 49/73
>=90% concentrated buckets: 12, 13, 15
```

## Segment status

This closes **S1-A — the 169,612-byte shell conflict**. It does not close Segment 1: the overall target remains
49/73 windows above target, so S1-B/S1-C/S1-D remain open.
