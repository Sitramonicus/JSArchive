# SUPERSEDED — deal-soundness defect (2026-09-28)

The candidate in this directory (`weave-out-S1-D.js` = `44a8dc146cce…`, and the earlier `a56a1bf1…`) is
**UNSOUND**. It passes every static gate (5/5 weave self-checks, constraint-pass C1–C5, share-sweep,
dangling-refs 61/0, carrier battery matrix/tiers/hold/flip/detector) but FAILS the functional gate:
`tools/decoy-parity.mjs` boots it in a VM and it breaks at load (placement-order defects — see
`../../reports/S1-D-DEAL-SOUNDNESS-2026-09-28.md`).

Nothing may be released, published, or built on these bytes. They are kept as the measurement record for
the S1-C search. The tool (`tools/weave-payload.mjs`) has since been patched (six fixes, 2026-09-28);
re-freeze only after the VM smoke + decoy-parity are green end-to-end and the grid/certificate are
re-derived on the sound tool.
