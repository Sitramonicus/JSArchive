# -*- coding: utf-8 -*-
# shard2-o85.py — O8.5-Shard-2 layout: rebalanced shards + in-shard noise + MC glow.
# Reads /tmp/o85dyn-base.js (dynamic-lexicon single scope). Wraps into scope-isolated
# shards over _0xmod, in order: A (foundation) -> M (MemberCount + glow noise) ->
# E (engine + noise) -> D (decoy aux). No section banners. Deterministic noise.
# Writes /home/user/o8cmp/shard2-o85-base.js. Local only.
import re, random

src = open('/tmp/o85dyn-base.js', encoding='utf-8').read()
lines = src.split('\n')
assert lines[0] == 'console.clear();'
assert lines[1] == '(() => {'
assert lines[-1] == '})();'

# anchor lines
mc_start = next(i for i, l in enumerate(lines) if 'client-state readout region' in l)
mc_end = next(i for i, l in enumerate(lines) if 'end client-state readout region' in l)
aux_start = next(i for i, l in enumerate(lines) if 'generated auxiliary region' in l)
aux_end = next(i for i, l in enumerate(lines) if 'end auxiliary region' in l)

# shard contents (1-based-inclusive slices of lines[])
A = lines[2:mc_start]                    # gate/Log/unlock/suite/banner/config
M = lines[mc_start + 1:mc_end]           # MemberCount real region (markers dropped)
E = lines[mc_end + 1:aux_start]          # run-state + lex helper + async engine
D = lines[aux_start + 1:aux_end]         # decoy block (markers dropped)

# ---------------------------------------------------------------------------
# deterministic noise generator
# ---------------------------------------------------------------------------
WORDS = ['phase', 'orbit', 'budget', 'cohort', 'stride', 'anchor', 'leaf', 'beacon',
         'window', 'grant', 'parity', 'delta', 'mantle', 'serial', 'spindle', 'harbor',
         'prism', 'checksum', 'vector', 'threshold', 'probe', 'bracket', 'sweep', 'fold',
         'cache', 'ring', 'shard', 'quota', 'latch', 'token', 'drift', 'gauge', 'meridian',
         'packet', 'cursor', 'stamp', 'relay', 'buffer', 'crest', 'lantern']

def uniq(rng, banned, n=6):
    while True:
        cand = '_0x' + ''.join(rng.choice('0123456789abcdef') for _ in range(n))
        if cand not in banned:
            banned.add(cand)
            return cand

def noise_chunk(rng, target_lines, banned):
    """Deterministic inert JS (IIFEs computing & discarding values). No I/O."""
    out = []
    while len(out) < target_lines:
        out.append('  (() => {')
        kind = rng.randrange(4)
        if kind == 0:
            n = 6
            ids = [uniq(rng, banned) for _ in range(n)]
            vals = [rng.randrange(0, 0xffff) for _ in range(n)]
            out.append('    const %s = [%s];' % (ids[0], ','.join(str(v) for v in vals)))
            out.append('    const %s = %s.reduce((a, b) => (a + b) & 0xffff, 0);' % (ids[1], ids[0]))
            out.append('    const %s = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };' % ids[2])
            out.append('    let %s = 0;' % ids[3])
            for _ in range(rng.randrange(2, 5)):
                out.append('    for (let i = 0; i < 3; i++) %s = (%s + %s(i + 1)) & 0xffff;' % (ids[3], ids[3], ids[2]))
            out.append('    const %s = %s ^ %s;' % (ids[4], ids[1], ids[3]))
            out.append('    if ((%s & 0x3) === 0) { const %s = [%s]; %s.slice(1); }' % (ids[4], ids[5], ','.join(ids[:2]), ids[5]))
        elif kind == 1:
            n = rng.randrange(4, 8)
            arrs = []
            for _ in range(2):
                arrs.append([rng.choice(WORDS) + '_' + rng.choice('abcdef') + rng.choice('0123456789') for _ in range(rng.randrange(4, 9))])
            ids = [uniq(rng, banned) for _ in range(3)]
            out.append('    const %s = %s;' % (ids[0], repr(arrs[0]).replace("'", '"')))
            out.append('    const %s = %s;' % (ids[1], repr(arrs[1]).replace("'", '"')))
            out.append('    const %s = new Map();' % ids[2])
            out.append('    %s.forEach((w) => { try { %s.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });' % (ids[0], ids[2]))
            out.append('    let total = 0; %s.forEach((v) => { total = (total + v) & 0xffffffff; });' % ids[2])
            out.append('    const sink = [total, %s.length];' % ids[1])
            out.append('    if (sink[0] === -1) { %s.clear(); }' % ids[2])
        elif kind == 2:
            c = uniq(rng, banned)
            b = uniq(rng, banned)
            ids = [uniq(rng, banned) for _ in range(4)]
            out.append('    class %s {' % c)
            out.append('      constructor(seed) { this.seed = seed; this.slots = new Map(); }')
            out.append('      put(k, v) { this.slots.set(k, v); return this; }')
            out.append('      get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }')
            out.append('    }')
            out.append('    class %s extends %s {' % (b, c))
            out.append('      constructor(seed) { super(seed); this.depth = 0; }')
            out.append('      descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }')
            out.append('    }')
            out.append('    const %s = new %s((Date.now() & 0xffff) ^ 0x55aa);' % (ids[0], b))
            for _ in range(rng.randrange(2, 5)):
                out.append('    %s.put(%s, %s);' % (ids[0], repr(rng.choice(WORDS)).replace("'", '"'), rng.randrange(0, 9999)))
            out.append('    const %s = %s.descend().descend();' % (ids[1], ids[0]))
            out.append('    const %s = [%s.get("x"), %s.depth, %s.seed];' % (ids[2], ids[1], ids[1], ids[0]))
            out.append('    const %s = %s.slice(0, 2).join("|");' % (ids[3], ids[2]))
            out.append('    if (%s.length > 64) { %s.pop(); }' % (ids[3], ids[3]))
        else:
            ids = [uniq(rng, banned) for _ in range(4)]
            out.append('    const %s = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;' % ids[0])
            out.append('    const %s = (Date.now() & 0xff) + 1;' % ids[1])
            out.append('    const %s = Array.from({ length: %s }, (_, i) => (i * 31) & 0xffff);' % (ids[2], ids[1]))
            out.append('    const %s = %s.reduce((a, x) => %s(a, x), %s);' % (ids[3], ids[2], ids[0], ids[1]))
            out.append('    if (%s === -1) { %s.length = 0; }' % (ids[3], ids[2]))
        out.append('    try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}')
        out.append('  })();')
        out.append('')
    return out

# ---------------------------------------------------------------------------
# wrap into shards, order A -> M -> E -> D, with noise per shard
# ---------------------------------------------------------------------------
banned = set(re.findall(r'_0x[0-9a-fA-F]{3,8}', src))
rngA = random.Random(0x0A5 + 1)
rngM = random.Random(0x0A5 + 2)
rngE = random.Random(0x0A5 + 3)

noiseA = noise_chunk(rngA, 45, banned)
noiseM = noise_chunk(rngM, 210, banned)   # MC glow: biggest noise payload
noiseEt = noise_chunk(rngE, 55, banned)   # engine top
noiseEb = noise_chunk(random.Random(0x0A5 + 4), 45, banned)  # engine tail
noiseN = noise_chunk(random.Random(0x0A5 + 5), 330, banned)  # standalone noise shard

def wrapper(name, head, body, tail):
    w = []
    w.append('  (function (_0xmod) {')
    if head: w += head
    w += body
    if tail: w += tail
    w.append('  })(_0xmod);')
    return w

headA = []
tailA = ['    _0xmod.log = Log;']
wa = wrapper('A', headA, A, tailA)

headM = []
tailM = ['    _0xmod.mc = MemberCount;', ''] + noiseM
wm = wrapper('M', headM, M, tailM)

headE = ['    const Log = _0xmod.log;', '    const MemberCount = _0xmod.mc;', ''] + noiseEt
tailE = [''] + noiseEb
we = wrapper('E', headE, E, tailE)

headD = []
wd = wrapper('D', headD, D, [])

# N: pure noise shard w/ decorative exports (looks like another telemetry module)
headN = []
tailN = ['    _0xmod.flags = { v: 3, mode: "warm" };', '    _0xmod.hints = [];', ''] + noiseN
wn = wrapper('N', headN, [], tailN)

out = ['console.clear();', '(() => {', '  const _0xmod = {};', '']
out += wa + [''] + wm + [''] + wn + [''] + we + [''] + wd
out.append('})();')

final = '\n'.join(out) + '\n'
open('/home/user/o8cmp/shard2-o85-base.js', 'w', encoding='utf-8').write(final)
print('shard2 base written', len(final), 'bytes,', final.count('\n'), 'lines')
print('shard A lines:', len(A), '| M (real):', len(M), '+ noise', len(noiseM),
      '| E:', len(E), '+', len(noiseEt) + len(noiseEb), '| D:', len(D))
