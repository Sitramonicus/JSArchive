# O8.15-SF — move-ready record

This directory is the complete saved-files/context folder for the O8.15 line. Move this entire directory as one
unit to the repository destination:

```text
@~8.15/8.15-SF/
```

Do not move only `Reports/` or only the small text files. The required bulk context is in `archives/`:

- `archives/O8.15-CC34-generated-2026-09-28.tar.gz` — generated CC-34 package and reports
- `archives/O8.15-pinned-chainA-2026-09-28.tar.gz` — canonical chain-A input/output and pin notes

Every archive has a SHA-256 sidecar and a member manifest. Verify after moving:

```bash
cd @~8.15/8.15-SF
sha256sum -c archives/O8.15-CC34-generated-2026-09-28.tar.gz.sha256
sha256sum -c archives/O8.15-pinned-chainA-2026-09-28.tar.gz.sha256
```

The local active workspace has already removed the archived CC-34 and pinned copies. Do not delete this folder
until the GitHub copy is present and both archive checksums pass there.

Current local inventory: 57 files, approximately 7.1 MB. The full source/tool context, reports, plans, runner,
capture, manifests, extraction instructions, operating ledger, and unfinished-segment checklist are included.
