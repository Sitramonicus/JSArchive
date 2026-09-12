# -*- coding: utf-8 -*-
# shardify-o85.py — O8.5-Shard-2 post-generation sharding.
# Input : /tmp/o85core.js  (single-scope instance from juggler-metamorph-generator)
# Output: O8.5-Shard-2.js  (shipped artifact: balanced _0xmod pieces + in-shard noise)
#         shard-out2/*.js  (per-piece files for separate obfuscation)
# Deterministic: same core file -> same outputs.
#
# Piece layout (scope-safe seams at top-level statement boundaries only):
#   A   foundation  : logging module, unlock gate, suite banner/config   (exports Log)
#   M   MemberCount : client-state readout region + dynamic lexicon       (exports mc, lex; glow noise)
#   N1  camo        : standalone noise module w/ decorative export
#   E   engine      : run-key guard + run infra + whole async quest engine (imports Log/mc/lex; noise)
#   N2  camo        : standalone noise module w/ decorative export
#   AUX aux         : generated decoy block wrapped w/ noise (no standalone decoy shard)
import re, sys, random

core = open('/tmp/o85core.js', encoding='utf-8').read()
lines = core.split('\n')
assert lines[0].startswith('console.clear();'), lines[0]
assert lines[1].strip() == '(() => {', lines[1]
assert lines[-1].strip() == '})();'

# anchors
def idx_of(pred, label):
    for i, l in enumerate(lines):
        if pred(l):
            return i
    raise SystemExit(label + ' anchor not found')

i_mc = idx_of(lambda l: 'client-state readout region' in l, 'mc')
i_runkey = idx_of(lambda l: re.match(r'^  const _0xrunKey ', l), 'runkey')
i_aux = idx_of(lambda l: 'generated auxiliary region' in l, 'aux')
i_auxend = idx_of(lambda l: 'end auxiliary region' in l, 'auxend')
assert i_mc < i_runkey < i_aux < i_auxend

# brace-balance sanity per slice
def depthmap(sl):
    d = 0
    out = []
    for l in sl:
        code = re.sub(r'"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`|\'(?:[^\'\\]|\\.)*\'|//.*$', '', l)
        out.append(d)
        d += code.count('{') - code.count('}')
    return out, d

A  = lines[2:i_mc]
M  = lines[i_mc:i_runkey]          # MC region + _0xlex helper
E  = lines[i_runkey:i_aux]         # guard + infra + async engine
AUX = lines[i_aux:i_auxend + 1]

for nm, sl in [('A', A), ('M', M), ('E', E), ('AUX', AUX)]:
    dm, fin = depthmap(sl)
    assert min(dm) == 0, (nm, min(dm))
    assert fin == 0, (nm, fin)
print('slice lines:', len(A), len(M), len(E), len(AUX))

# ---------------------------------------------------------------------------
# deterministic inert noise
# ---------------------------------------------------------------------------
WORDS = ['phase', 'orbit', 'budget', 'cohort', 'stride', 'anchor', 'leaf', 'beacon',
         'window', 'grant', 'parity', 'delta', 'mantle', 'serial', 'spindle', 'harbor',
         'prism', 'checksum', 'vector', 'threshold', 'probe', 'bracket', 'sweep', 'fold',
         'cache', 'ring', 'shard', 'quota', 'latch', 'token', 'drift', 'gauge', 'meridian',
         'packet', 'cursor', 'stamp', 'relay', 'buffer', 'crest', 'lantern']
BANNED = set(re.findall(r'_0x[a-zA-Z0-9]{2,10}', core))

def uniq(rng, n=6):
    while True:
        c = '_0x' + ''.join(rng.choice('0123456789abcdef') for _ in range(n))
        if c not in BANNED:
            BANNED.add(c)
            return c

def chunk(rng, target):
    out = []
    while len(out) < target:
        out.append('    (() => {')
        k = rng.randrange(4)
        if k == 0:
            ids = [uniq(rng) for _ in range(6)]
            vals = [rng.randrange(0, 0xffff) for _ in range(6)]
            out.append('      const %s = [%s];' % (ids[0], ','.join(str(v) for v in vals)))
            out.append('      const %s = %s.reduce((a, b) => (a + b) & 0xffff, 0);' % (ids[1], ids[0]))
            out.append('      const %s = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };' % ids[2])
            out.append('      let %s = 0;' % ids[3])
            for _ in range(rng.randrange(2, 5)):
                out.append('      for (let i = 0; i < 3; i++) %s = (%s + %s(i + 1)) & 0xffff;' % (ids[3], ids[3], ids[2]))
            out.append('      const %s = %s ^ %s;' % (ids[4], ids[1], ids[3]))
            out.append('      if ((%s & 0x3) === 0) { const %s = [%s]; %s.slice(1); }' % (ids[4], ids[5], ','.join(ids[:2]), ids[5]))
        elif k == 1:
            ids = [uniq(rng) for _ in range(3)]
            arrs = [[rng.choice(WORDS) + '_' + rng.choice('abcdef') + rng.choice('0123456789') for _ in range(rng.randrange(4, 9))] for _ in range(2)]
            out.append('      const %s = %s;' % (ids[0], repr(arrs[0]).replace("'", '"')))
            out.append('      const %s = %s;' % (ids[1], repr(arrs[1]).replace("'", '"')))
            out.append('      const %s = new Map();' % ids[2])
            out.append('      %s.forEach((w) => { try { %s.set(w, (w.length * 2654435761) >>> 0); } catch (e) {} });' % (ids[0], ids[2]))
            out.append('      let total = 0; %s.forEach((v) => { total = (total + v) & 0xffffffff; });' % ids[2])
            out.append('      const sink = [total, %s.length];' % ids[1])
            out.append('      if (sink[0] === -1) { %s.clear(); }' % ids[2])
        elif k == 2:
            c0 = uniq(rng, 8); c1 = uniq(rng, 8); c2 = uniq(rng, 8)
            ids = [uniq(rng) for _ in range(4)]
            out.append('      class %s {' % c0)
            out.append('        constructor(seed) { this.seed = seed; this.slots = new Map(); }')
            out.append('        put(k, v) { this.slots.set(k, v); return this; }')
            out.append('        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }')
            out.append('      }')
            out.append('      class %s extends %s {' % (c1, c0))
            out.append('        constructor(seed) { super(seed); this.depth = 0; }')
            out.append('        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }')
            out.append('      }')
            out.append('      class %s extends %s {' % (c2, c1))
            out.append('        constructor(seed) { super(seed); this.marks = []; }')
            out.append('        mark(x) { this.marks.push(x); return this; }')
            out.append('      }')
            out.append('      const %s = new %s((Date.now() & 0xffff) ^ 0x55aa);' % (ids[0], c2))
            for _ in range(rng.randrange(2, 5)):
                out.append('      %s.put(%s, %s);' % (ids[0], repr(rng.choice(WORDS)).replace("'", '"'), rng.randrange(0, 9999)))
            out.append('      const %s = %s.descend().descend().mark("z");' % (ids[1], ids[0]))
            out.append('      const %s = [%s.get("x"), %s.depth, %s.seed];' % (ids[2], ids[1], ids[1], ids[0]))
            out.append('      const %s = %s.slice(0, 2).join("|");' % (ids[3], ids[2]))
            out.append('      if (%s.length > 64) { %s.marks.length = 0; }' % (ids[3], ids[1]))
        else:
            ids = [uniq(rng) for _ in range(4)]
            out.append('      const %s = (a, b) => ((a << 3) ^ (b >>> 1)) & 0xffffffff;' % ids[0])
            out.append('      const %s = (Date.now() & 0xff) + 1;' % ids[1])
            out.append('      const %s = Array.from({ length: %s }, (_, i) => (i * 31) & 0xffff);' % (ids[2], ids[1]))
            out.append('      const %s = %s.reduce((a, x) => %s(a, x), %s);' % (ids[3], ids[2], ids[0], ids[1]))
            out.append('      if (%s === -1) { %s.length = 0; }' % (ids[3], ids[2]))
        out.append('      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}')
        out.append('    })();')
        out.append('')
    return out

r1 = random.Random(0x0A5 + 1)
r2 = random.Random(0x0A5 + 2)
r3 = random.Random(0x0A5 + 3)
r4 = random.Random(0x0A5 + 4)
r5 = random.Random(0x0A5 + 5)
r6 = random.Random(0x0A5 + 6)
r7 = random.Random(0x0A5 + 7)

noise_A_tail = chunk(r1, 55)     # foundation bulk
noise_M_glow = chunk(r2, 205)    # MemberCount prominence (largest noise payload)
noise_N1     = chunk(r3, 300)    # camo module 1
noise_E_head = chunk(r4, 60)     # engine top
noise_E_tail = chunk(r5, 90)     # engine tail
noise_N2     = chunk(r6, 285)    # camo module 2
noise_AUX    = chunk(r7, 130)    # decoy-wrapper bulk

# ---------------------------------------------------------------------------
# decorative module export (deterministic, inert)
# ---------------------------------------------------------------------------
def camo_export(tag, seed):
    return [
        '    _0xmod["' + tag + '"] = (() => {',
        '      let _0xs = 0; for (let _0xi = 0; _0xi < 7; _0xi++) _0xs = (_0xs * 33 + ((_0xi * ' + str(seed) + ') & 0xff)) & 0xffff;',
        '      return { tag: "' + tag + '", state: (_0xs & 1) ? "open" : "hold", window: 60 + (_0xs % 240) };',
        '    })();',
    ]

def wrapper(head, body, tail):
    w = ['  (function (_0xmod) {']
    w += head
    w += body
    w += tail
    w.append('  })(_0xmod);')
    return w

wA = wrapper([], A, ['    _0xmod.log = Log;'] + [''] + noise_A_tail)
wM = wrapper(['    const Log = _0xmod.log;', ''],
             M,
             ['    _0xmod.mc = MemberCount;', '    _0xmod.lex = _0xlex;'] + [''] + noise_M_glow)
wN1 = wrapper([], [], camo_export('timings', 11) + [''] + noise_N1)
wE = wrapper(['    const Log = _0xmod.log;',
              '    const MemberCount = _0xmod.mc;',
              '    const _0xlex = _0xmod.lex;', ''],
             E,
             [''] + noise_E_tail)
wN2 = wrapper([], [], camo_export('leases', 23) + [''] + noise_N2)
wAUX = wrapper([], AUX, [''] + noise_AUX)

out = ['console.clear();', '(() => {', '  const _0xmod = {};', '']
out += wA + [''] + wM + [''] + wN1 + [''] + wE + [''] + wN2 + [''] + wAUX
out.append('})();')
final = '\n'.join(out) + '\n'
open('/home/user/o8cmp/builds/O8.5-Shard-2.js', 'w', encoding='utf-8').write(final)
print('artifact lines:', final.count('\n'))

# ---------------------------------------------------------------------------
# per-piece files for separate obfuscation
# ---------------------------------------------------------------------------
import os
os.makedirs('/home/user/o8cmp/attic/shard-out2', exist_ok=True)
pieces = {
    'a':   wA,   'm': wM,   'n1': wN1,
    'e':   wE,   'n2': wN2, 'aux': wAUX,
}
for tag, wl in pieces.items():
    with open('/home/user/o8cmp/attic/shard-out2/shard-%s.js' % tag, 'w', encoding='utf-8') as f:
        f.write('\n'.join(wl) + '\n')
    print('shard-%s.js lines:' % tag, len(wl))
