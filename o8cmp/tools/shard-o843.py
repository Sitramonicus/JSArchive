# -*- coding: utf-8 -*-
# shard-o843.py — O.8.5-Shard-1 transform. Reads /tmp/o843-base.js (O.8.4.3 base,
# literal form), wraps the file into scope-isolated shards over a tiny contract
# object (_0xmod), applies V1 (neutral Symbol.for run-key). Writes
# /home/user/o8cmp/attic/shard-o843-base.js. Local only.
src = open('/tmp/o843-base.js', encoding='utf-8').read()
lines = src.split('\n')
assert lines[0] == 'console.clear();', lines[0]
assert lines[1] == '(() => {', lines[1]
assert lines[-1] == '})();', lines[-1]

FOUND_A, FOUND_B = 3, 127    # 1-based inclusive: gate/Log/unlock/suite/banner/config/MC
ENG_A, ENG_B = 128, 851      # run-state + async quest engine (incl. decoder region)
DEC_A, DEC_B = 852, 873      # decoy noise block (standalone)

found = lines[FOUND_A - 1:FOUND_B]   # 3..127
eng = lines[ENG_A - 1:ENG_B]         # 128..851
decoy = lines[DEC_A - 1:DEC_B]       # 852..873

# V1: neutral run-key symbol (no semantic words); registry kept for dup-paste guard.
key_old = 'Symbol.for("quest-suite:o8:active")'
key_new = 'Symbol.for("_0x7c1e9f2a")'
assert sum(key_old in ln for ln in eng) == 1
eng = [ln.replace(key_old, key_new) for ln in eng]

head = [
 'console.clear();',
 '(() => {',
 '  // module-sharding seam (O8.5-Shard-1): the tiny explicit contract between shards.',
 '  // Shards are scope-isolated IIFEs; the ONLY shared surface is _0xmod below.',
 '  const _0xmod = {};',
 '',
 '  // ══ SHARD 0 — foundation: gate / Log / log-lock / suite head / readout ══',
 '  (function (_0xmod) {',
]
mid = [
 '    _0xmod.log = Log;',
 '    _0xmod.mc = MemberCount;',
 '  })(_0xmod);',
 '',
 '  // ══ SHARD 1 — engine: run-state + quest engine + decode region ══',
 '  (function (_0xmod) {',
 '    const Log = _0xmod.log;',
 '    const MemberCount = _0xmod.mc;',
]
tail = [
 '  })(_0xmod);',
 '',
 '  // ══ SHARD 2 — decoy noise (standalone; no shared state) ══',
]
out = head + found + mid + eng + tail + decoy + ['})();']
open('/home/user/o8cmp/attic/shard-o843-base.js', 'w', encoding='utf-8').write('\n'.join(out))
print('shard base written:', len(out), 'lines')
