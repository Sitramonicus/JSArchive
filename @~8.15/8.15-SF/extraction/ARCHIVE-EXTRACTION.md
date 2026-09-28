# O8.15-SF extraction quick reference

From the workspace root:

```bash
sha256sum -c 8.15-SF/archives/O8.15-CC34-generated-2026-09-28.tar.gz.sha256
mkdir -p /tmp/o815-cc34
 tar -xzf 8.15-SF/archives/O8.15-CC34-generated-2026-09-28.tar.gz -C /tmp/o815-cc34

sha256sum -c 8.15-SF/archives/O8.15-pinned-chainA-2026-09-28.tar.gz.sha256
mkdir -p /tmp/o815-pinned
 tar -xzf 8.15-SF/archives/O8.15-pinned-chainA-2026-09-28.tar.gz -C /tmp/o815-pinned
```

The archives preserve root-relative members. Do not overwrite frozen O8.14 files. The active O8.15 tools can
rebuild generated output from the frozen bundle; the pinned archive is the canonical chain-A evidence when exact
measurement reproduction is required.
