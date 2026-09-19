# Uploads — retained current inputs

This directory is intentionally small after the O8.14 spring cleaning. These are the current inputs retained in place:

| file | role |
|---|---|
| `stego2-cover-1024-scaled.bmp` | current 1024×768×24 cover used by the O8.13-r3 stego baseline and bounded carrier experiments; do not overwrite |
| `unicode_list.csv` | supplied Unicode/script inventory used for coverage measurement |

Verify identities before a build with:

```bash
sha256sum Uploads/stego2-cover-1024-scaled.bmp Uploads/unicode_list.csv
```

Historical covers, the old reference sample, old reports, and `TRACE.md` were not deleted. They are in `8.14-SF/archives/uploads-context-2026-09-19.tar.gz` with a member manifest and SHA-256 sidecar. The former lowercase `uploads/` directory contained trace exports; those are collated under `8.14-SF/CHAT-HISTORY/decoder-logs/`.

Do not add credentials or replacement secrets to this directory.
