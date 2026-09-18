#!/bin/bash
# Run from workspace root /home/user  (which IS the @~8.12 payload)
# Creates DOWNLOAD-@~8.12-2026-09-17.tar.gz (68M, excluded from snapshot until you run)
set -e
ROOT=/home/user
OUT=/tmp/DOWNLOAD-@~8.12-2026-09-17.tar.gz
tar -czf "$OUT" -C "$ROOT" --exclude='Active/engines/node_modules' --exclude='.git' --exclude='@~8.12' \
  Active/O8.12-r4 Active/O8.13 Active/Stego/stego-r4 Active/O8-legacy Handoff Docs Uploads tools _COMPRESSED-HISTORY _ARCHIVE_TRIM WORKSPACE-STATUS.md
ls -lh "$OUT"
echo "Now move to GitHub:"
echo "  tar -xzf $OUT -C /path/to/JSArchive/@~8.12 --strip-components=0"
echo "Or: cp -a $ROOT/Handoff /path/to/JSArchive/@~8.12/Handoff  # etc."
