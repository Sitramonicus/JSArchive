# Active stego tooling — O8.14 retained surface

This directory contains the current stego-12/r2 path retained for O8.14 baseline work. It is not a catalog of every historical builder.

## Retained current files

- `build-stego12-r2.mjs` — current carrier builder used by the O8.13-r3-era path.
- `build-stego12.mjs` — adjacent current builder retained for comparison.
- `stego3-codec.mjs`, `stego3-loader.js`, `stego11-loader.js` — current codec/loader sources.
- `stego10-legacyreel-src.js`, `stego3-legacyreel-src.js`, `honey-board-src.js`, `tube-vault-src.js`, `decoy-garden.js`, and `decoy-garden-v2.js` — current source fragments used by the retained path.
- `test-stego11-tiers.mjs`, `test-stego11-matrix.mjs`, and `stego3-carrier-test.mjs` — current verification tools.
- `output-stego12/` — retained O8.13-r3-era output baseline; it is not an O8.14 release.

## Historical tools

Older builders, loaders, matrix/tier tests, and `Active/Stego/tools/` were retired into:

```text
8.14-SF/archives/legacy-stego-tools-2026-09-19.tar.gz
```

The archive has a member manifest and SHA-256 sidecar. They remain extractable for archaeology, but are not active build choices.

## Reproducing against the old generated package

The old active `Active/O8.13/final-package/` was generated output, not current source. If a historical reproduction requires it, extract the generated-output archive into scratch first:

```bash
mkdir -p /tmp/o814-o813-context
 tar -xzf 8.14-SF/archives/O8.13-generated-outputs-2026-09-19.tar.gz -C /tmp/o814-o813-context
node Active/Stego/build-stego12-r2.mjs \
  /tmp/o814-o813-context/Active/O8.13/final-package/O8.6-Final-final-bundle.js \
  Uploads/stego2-cover-1024-scaled.bmp \
  /tmp/o814-stego-repro --line1=0
```

Do not write that reproduction into `Working-Stable/O8.13/` or `Archives/packages/O8.13/`. Use a scratch output and record its identity separately.
