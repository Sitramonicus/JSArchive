#!/bin/bash
set -e
ROOT=/home/user
ACTIVE_SIZE=$(du -sb --exclude=engines $ROOT/Active | cut -f1)
ARCH_SIZE=$(du -sb $ROOT/_ARCHIVE_TRIM 2>/dev/null | cut -f1 || echo 0)
COMP_SIZE=$(du -sb $ROOT/_COMPRESSED-HISTORY 2>/dev/null | cut -f1 || echo 0)
TOTAL=$((ACTIVE_SIZE + ARCH_SIZE + COMP_SIZE))
MB=$((TOTAL/1024/1024))
echo "[auto-trim] Active-eng $(($ACTIVE_SIZE/1024/1024))MB + _ARCHIVE $(($ARCH_SIZE/1024/1024))MB + _COMP $(($COMP_SIZE/1024/1024))MB = ${MB}MB"
if [ $MB -gt 95 ]; then
  echo "[auto-trim] >95MB, trimming..."
  python3 /tmp/trim_102.py 2>&1 | tail -n 20
else
  echo "[auto-trim] under threshold"
fi
du -sh $ROOT/Active/* 2>&1 | sort -rh | head -n 10
