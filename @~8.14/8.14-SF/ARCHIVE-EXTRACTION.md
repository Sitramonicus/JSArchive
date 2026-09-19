# Archive extraction quick reference

Run from the `@~8.14` root. Verify a sidecar before extraction:

```bash
(cd 8.14-SF/archives && sha256sum -c O8.13-generated-outputs-2026-09-19.tar.gz.sha256)
mkdir -p /tmp/o814-context
 tar -xzf 8.14-SF/archives/O8.13-generated-outputs-2026-09-19.tar.gz -C /tmp/o814-context
```

Archive member paths are root-relative (`Active/...`, `Archives/...`, `Handoff/...`, or `Uploads/...`). Scratch extraction therefore gives an old-layout view at `/tmp/o814-context/` without changing the live workspace. Use `tar -tzf` and the matching `.manifest.txt` to inspect without extracting.

Never extract a historical package over `Working-Stable/O8.13/` or `Archives/packages/O8.13/`. If a reproduction needs an old generated bundle, use it from the scratch path and write output to another scratch directory.
