# Phase 0 — clean rebuild reproducibility proof (2026-09-28)

Box: "Reproducible build command runs from a clean checkout without manually restoring retired inputs."
Exit: "clean rebuild reproduces the canonical input/output hashes." — **MET**.

## The command (documented; no manual input restoration)

```bash
ALL='fﾎﾽﾜｸ744,prairieѧ떚뾃728,bloom398,maシワザ911,Vi떚톚780,P磆airie悚492,S欞roudқ103,oRbit824,m濎Ssё虣虣1073,cInde826,cAirn6045,ON333,BI713,PLasmaь386'
TMPDIR=<kept> OUT=<build-dir> \
EXTRACT_ONLY="$ALL" DEEPWEAVE=1 SPLIT_EXTRA=1 SPLIT_OBJECTS=1 SPLIT_ARRAYS_I=1 \
  bash Active/O8.15/tools/cc34-build.sh carrier
```

(Names verbatim from `DEEP-WEAVE-REPORT-2026-09-27.md` §6; the levers pin `reports/weave-levers-2026-09-27.json`
→ `chain_pin` records this as "chain A (the documented one)", 2,535,176 B / 2,219,300 chars.)

The only inputs are workspace files that persist in the checkout:
`Working-Stable/O8.14/O8.14-bundle-820f06c2.js` (frozen digest `820f06c2`) and
`Uploads/stego2-cover-1024-scaled.bmp`. `cc34-build.sh` self-installs `Active/engines` (`npm ci`) when
`node_modules` is absent — the known snapshot gap is handled inside the command, not by hand.
No `8.15-SF`, no `Archives/retired` unpacking, no `/tmp` restore.

## Result (run 2026-09-28, node v20.20.2)

| artifact | rebuilt | canonical | verdict |
|---|---|---|---|
| chain-A input `cc34-weave-in.js` | `bf5f21163727850caa03ead3913f0f5f19da0e99a2797a7bebfb33d7093726d3` (2,535,176 B) | same (`provisional/S1-A-fixed-2026-09-28/weave-in-chainA.js`) | **byte-identical (`cmp` ok)** |
| woven output (`weave-payload --apply --seed=2648369387`, landed flags) | `37d824d305ba183f5f6de3fae266cd74853200d18ab1ea960c9e080ab42db1e8` | `weave-out-S1-A-fixed.js` | **byte-identical (`cmp` ok)** |
| weave map | `90c752261faa57564e4d4e6c8a30224087f5a41611a8dbd8c38c6776c0037a85` | `weave-map.json` | **byte-identical (`cmp` ok)** |

Landed weave flags: `WEAVE_DISSOLVE=1 WEAVE_SHELL_LABEL=1 WEAVE_SCOPED=1 WEAVE_FN_HOIST=1 WEAVE_RUN_WRAP=1
WEAVE_RUN_WRAP_KB=28 WEAVE_PURE_LITERAL_CALLS=1 WEAVE_INDEX_FREE=1 WEAVE_DECL_RELOC=1`; all five weave
self-checks PASS (conservation · re-parse · permutation-only · order · relocation read-freedom).

Carrier identity gates inside the same build also green: `staged payload == shipped payload (byte-identical)`,
frag-derive check, wire probe. Built carrier (informational, not the S1 candidate):
runner `32bb3764…` (3,278,609 chars) · cover `2165b66c…` · payload `7be88098…` (staged 2,223,890 chars).

## Notes

- The rebuild was run twice today (transcript + this proof); both runs produced the same digests — the
  pipeline is deterministic as documented ("Fully deterministic", build-stego13-r2.mjs header).
- `node_modules` never survives a workspace snapshot; the build command's self-install step is the
  mitigation. A truly clean-machine run needs network for `npm ci` — recorded as the only environmental
  dependency of the command.
- Full build log kept at `provisional/PHASE0-rebuild-2026-09-28/build.log` (stage output incl. `[NORM]`,
  `[SPLIT p1]`, `[DEEP]`, `[WEAVE]`, `[CONSTR]` lines).
