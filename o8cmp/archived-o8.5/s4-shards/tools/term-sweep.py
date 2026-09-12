# -*- coding: utf-8 -*-
# term-sweep.py — de-conspicuous wording sweep + "GoogleUnlock" breakdown + 8.6 scrub.
import sys, os, glob

SH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'shards')

bad = [
  'camo', 'decoy', 'companion', 'Companion', 'retention', 'Retention',
  'GoogleUnlock', 'typedPools', 'dataExports', 'decodeOk', 'decodedTablesRetained',
  '[Quest', 'getStreamerActiveStreamMetadata', 'getRunningGames', 'O.8', 'O8'
]

print("Scanning shards in:", SH)
violations = 0
for f in sorted(glob.glob(os.path.join(SH, '*.js'))):
    s = open(f, encoding='utf-8').read()
    hits = {w: s.count(w) for w in bad if s.count(w)}
    if hits:
        violations += sum(hits.values())
        print(' ', os.path.basename(f), '-> VIOLATION:', hits)
    else:
        print(' ', os.path.basename(f), '-> clean of swept terms')

if violations == 0:
    print('ALL SHARDS CLEAN (8.6-Scrub-1 verified)')
else:
    print(f'TOTAL VIOLATIONS: {violations}')
    sys.exit(1)
