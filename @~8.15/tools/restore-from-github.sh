#!/usr/bin/env bash
# restore-from-github.sh — pull back anything trimmed out of the workspace.
#
# Everything this restores is byte-identical to what is on
#   https://github.com/Sitramonicus/JSArchive  (branch main)
# Verified 2026-09-17 against the upstream tree at commit 6b96620 using the
# manifests in _COMPRESSED-HISTORY/*.MANIFEST.sha256.
#
# Usage:
#   bash tools/restore-from-github.sh lines      # Active/{O8-legacy,O8.12-r2,O8.12-r3}
#   bash tools/restore-from-github.sh 810        # all of @~8.10/ (153.85 MB, 1073 files)
#   bash tools/restore-from-github.sh 810-pre    # @~8.10/Pre-O8.7 only (768 files)
#   bash tools/restore-from-github.sh check      # verify restored files vs the manifests
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP="${TMPDIR:-/tmp}/jsarchive-restore"
WHAT="${1:-}"

[ -n "$WHAT" ] || { sed -n '2,14p' "${BASH_SOURCE[0]}"; exit 2; }

clone() {
  rm -rf "$TMP"; mkdir -p "$TMP"
  echo "[*] shallow clone -> $TMP"
  git clone --depth 1 --filter=blob:none --sparse \
    https://github.com/Sitramonicus/JSArchive.git "$TMP/repo" >/dev/null 2>&1
  git -C "$TMP/repo" sparse-checkout init --cone >/dev/null 2>&1
}

case "$WHAT" in
  lines)
    clone
    git -C "$TMP/repo" sparse-checkout set "@~8.12/Active/O8-legacy" "@~8.12/Active/O8.12-r2" "@~8.12/Active/O8.12-r3" >/dev/null 2>&1
    for d in O8-legacy O8.12-r2 O8.12-r3; do
      rm -rf "$ROOT/Active/$d"
      cp -a "$TMP/repo/@~8.12/Active/$d" "$ROOT/Active/$d"
      echo "[+] restored Active/$d"
    done
    echo "[i] scripts come back GZIPPED. Un-gzip the tooling with:"
    echo "      python3 _ARCHIVE_TRIM/decompress.py"
    ;;
  810|810-pre)
    clone
    if [ "$WHAT" = "810-pre" ]; then
      git -C "$TMP/repo" sparse-checkout set "@~8.10/Pre-O8.7" >/dev/null 2>&1
    else
      git -C "$TMP/repo" sparse-checkout set "@~8.10" >/dev/null 2>&1
    fi
    mkdir -p "$ROOT/_RESTORED"
    cp -a "$TMP/repo/@~8.10" "$ROOT/_RESTORED/@~8.10"
    echo "[+] restored into _RESTORED/@~8.10 (not merged into the live tree on purpose)"
    ;;
  check)
    python3 - "$ROOT" <<'PY'
import os,re,sys,json,hashlib,subprocess
root=sys.argv[1]
man=os.path.join(root,'_COMPRESSED-HISTORY/Active-lines-legacy-r2-r3.MANIFEST.sha256')
if not os.path.exists(man): sys.exit('manifest missing')
ok=miss=bad=gz=0
for line in open(man):
    m=re.match(r'^([0-9a-f]{64})\s+(\d+)\s+(.+)$', line.rstrip('\n'))
    if not m: continue
    sha,size,path=m.group(1),int(m.group(2)),m.group(3)
    p=os.path.join(root,path)
    if not os.path.exists(p):
        if os.path.exists(p+'.gz'): gz+=1
        else: miss+=1
        continue
    h=hashlib.sha256()
    with open(p,'rb') as f:
        for c in iter(lambda:f.read(1<<20),b''): h.update(c)
    if h.hexdigest()==sha and os.path.getsize(p)==size: ok+=1
    else: bad+=1; print('  MISMATCH',path)
print(f'line dirs: exact {ok}, still-gzipped {gz}, missing {miss}, mismatch {bad}')
PY
    ;;
  *)
    sed -n '2,14p' "${BASH_SOURCE[0]}"; exit 2 ;;
esac

rm -rf "$TMP"
echo "[*] done"
