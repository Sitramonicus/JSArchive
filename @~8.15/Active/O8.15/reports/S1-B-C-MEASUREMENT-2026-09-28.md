# Segment 1-B/C measurement — S1-A-fixed canonical chain

Input was recovered from the uploaded GitHub SF archive and verified:

```text
bf5f21163727850caa03ead3913f0f5f19da0e99a2797a7bebfb33d7093726d3
```

The first local rebuild after SF cleanup produced a different SHA because the builder still requires retired O8.13
seed inputs. That noncanonical result was rejected. This measurement uses the exact archived chain-A input.

Configuration:

```text
WEAVE_DISSOLVE=1
WEAVE_SHELL_LABEL=1
WEAVE_SCOPED=1
WEAVE_FN_HOIST=1
WEAVE_RUN_WRAP=1
WEAVE_RUN_WRAP_KB=28
WEAVE_PURE_LITERAL_CALLS=1
WEAVE_INDEX_FREE=1
WEAVE_DECL_RELOC=1
seed=2648369387
```

Results:

```text
125 shells inlined · 616 KB atom material
157 sequences split · 681 parts
run-wrap: 33 helpers · 3,703 statements · 290 KB
content conservation: 2,215,543 B kept · holes 0 · duplicated 0
parse: PASS
statement identity: PASS
relative order: PASS
relocation safety: PASS
constraint pass: 5/5 PASS
movable set: 1,115,998 B = 50.2%
share: worst 0.4025 · mean 0.2797 · excess 3.145
windows above 0.25: 49/73
concentrated buckets: 12, 13, 15
```

This measurement does **not** close S1-B or S1-C. The control-flow mechanism and reader-window machinery pass their
semantic gates, but the acceptance target is not met and fixed bucket-12/13/15 mass remains. S1-D cannot close
until an accepted integrated candidate or a formal unreachable proof exists.
