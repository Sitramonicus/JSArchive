# JSArchive — O8.6-S6 + O8.7-Stego-2 line

Obfuscated JS payload pipeline: 7 clean shards → multi-engine OTO matrix →
stitched bundle → compressed runners → BMP-stego entangled deliverable.

**Current line:** `O8.6-S6` + `O8.7-Stego-2` dual carrier. Live deliverables
in `Active/`; latest freezes `Archives/packages/O8.7-Stego-2-r2/` (pair) +
`Archives/o8.7-Stego-2-r2-live.tar.gz` (rollback). Retired builds: `Archives/RETIRED.md`.

## Layout

- `Active/` — everything live:
  - `Active/O8.6/` — `shards/` (clean scrub5), `oto/` (43-file engine matrix + build/verify scripts), `final-package/` (3 deliverables + selected shards), `tools/` (stitcher, harness, micro-passes)
  - `Active/Stego/` — Stego-2 pipeline (`build-stego2.js`, `stego2-loader.js`, `decoy-garden.js`) + live pair in `output-stego2/`; superseded Stego-1 pair in `output/`
  - `Active/engines/` — `npm install` target for the obfuscator engines (not committed)
- `Archives/` — frozen history: S6 tarball, Stego-2 r1, shard diff-chain, trim record (`INDEX.md` is the catalog)
- `Docs/` — merged era records + pipeline guide + techniques + cheatsheet + vendor PDF
- `Handoff/` — `HANDOFF.md` (resume-from-zero), `CHANGELOG.md`, legacy changelog, S5/stego chatlog
- `Uploads/` — frozen user-supplied inputs (cover BMP, trace, reference sample)

## Quick commands

```sh
# verify everything (no engines needed, ~seconds)
node Active/O8.6/oto/scripts/run-25pass-battery.mjs

# install obfuscator engines (once per machine)
cd Active/engines && npm install

# rebuild deliverables (needs engines): matrix -> shards -> bundle -> runners
node Active/O8.6/oto/scripts/obf-v1-s3matrix.js   # + obf-v2, obf-minify-family, obf-u-*
node Active/O8.6/oto/scripts/build-s4-final-package.js

# rebuild Stego-2 pair (needs engines: terser) + run tier suite (no engines)
node Active/Stego/build-stego2.js
node Active/Stego/test-stego2-tiers.mjs Active/Stego/output-stego2/O8.7-Stego-2-runner.js Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp
```

Details: `Handoff/HANDOFF.md` to resume, `Docs/PIPELINE-GUIDE.md` for the full
pipeline, `Archives/INDEX.md` for frozen history.
