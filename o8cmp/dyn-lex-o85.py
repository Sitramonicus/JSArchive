# -*- coding: utf-8 -*-
# dyn-lex-o85.py — O8.5-Shard-2 dynamic lexicon transform.
# Reads /tmp/o843-base.js (final O.8.4.3 base with baked per-site lexicon),
# replaces every codename literal with _0xlex.C(<termIdx>) and every phrase literal
# with _0xlex.P(<keyIdx>, [ ...15 site-local literals... ]), and injects the _0xlex
# helper (central codename word arrays + no-immediate-repeat picker).
# Writes /tmp/o85dyn-base.js. Deterministic. Local only.
import re, json, sys

src = open('/tmp/o843-base.js', encoding='utf-8').read()

# ---------------------------------------------------------------------------
# 1) codename site map: every Log.say("Word", …) first arg
# ---------------------------------------------------------------------------
POOLS = {}   # semantic term -> [15 words]
import importlib.util
spec = importlib.util.spec_from_file_location('lex', '/home/user/o8cmp/lexicon-o842.py')
# lexicon-o842.py executes its reassign logic on import; instead parse pools only
lex_txt = open('/home/user/o8cmp/lexicon-o842.py', encoding='utf-8').read()
POOLS_SEC = lex_txt[lex_txt.index("POOLS = {"):lex_txt.index("# current (O.8.4.1) alias")]
ns = {}
exec(POOLS_SEC, ns)
POOLS = ns['POOLS']
TERMS = list(POOLS.keys())
assert len(TERMS) == 20 and all(len(POOLS[t]) == 15 for t in TERMS)

say_re = re.compile(r'Log\.say\(\s*"([^"]+)"')
sites = [m for m in say_re.finditer(src)]
print('Log.say sites:', len(sites))

# resolve term per site via o842 formula: occurrence k of term t used word pool[t][(7k)%15]
counters = {t: 0 for t in TERMS}
term_of_site = []
for m in sites:
    w = m.group(1)
    cands = []
    for t in TERMS:
        if w in POOLS[t]:
            k = counters[t]
            if POOLS[t][(7 * k) % 15] == w:
                cands.append(t)
    if len(cands) == 1:
        term_of_site.append(cands[0])
        counters[cands[0]] += 1
    else:
        # try all terms' next-expected words
        alt = []
        for t in TERMS:
            if w in POOLS[t] and POOLS[t][(7 * counters[t]) % 15] == w:
                alt.append(t)
        if len(alt) == 1:
            term_of_site.append(alt[0]); counters[alt[0]] += 1
        else:
            print('AMBIGUOUS site word:', w, 'cands', cands, 'alt', alt, 'at', m.start())
            term_of_site.append('Puddle')  # marker; will assert below
print('resolved terms:', {t: counters[t] for t in TERMS if counters[t]})

# ---------------------------------------------------------------------------
# 2) phrase site map: find each pool variant's quoted literal in the file
# ---------------------------------------------------------------------------
PHRASES = json.load(open('/tmp/o843-phrases.json'))
PK_ORDER = list(PHRASES.keys())  # 53 keys, stable order

def expand_quoted(text, pos, length, quote):
    """pos..pos+length sits inside a JS string/template opened with `quote`.
    Returns (start,end) of the full quoted literal if the inner text matches exactly."""
    s = text.rfind(quote, 0, pos)
    if s < 0: return None
    # find closing quote after literal, respecting backslash escapes
    e = pos + length
    while e < len(text):
        if text[e] == '\\': e += 2; continue
        if text[e] == quote: break
        e += 1
    if e >= len(text): return None
    inner = text[s + 1:e]
    if inner.replace('\\"', '"') != text[pos:pos + length] and inner != text[pos:pos + length]:
        # tolerate backslash-escaped content mismatch by exact compare only
        if inner != text[pos:pos + length]:
            return None
    return (s, e + 1)

ph_sites = []   # (start,end,keyIdx)
for ki, key in enumerate(PK_ORDER):
    for variant in PHRASES[key]:
        pos = 0
        while True:
            i = src.find(variant, pos)
            if i < 0: break
            q = '`' if '${' in variant else '"'
            span = expand_quoted(src, i, len(variant), q)
            if span:
                inner = src[span[0] + 1:span[1] - 1]
                if inner == variant or inner.replace('\\"', '"') == variant:
                    ph_sites.append((span[0], span[1], ki, variant))
            pos = i + len(variant)

ph_sites.sort()
# overlap check
for a, b in zip(ph_sites, ph_sites[1:]):
    if b[0] < a[1]:
        print('OVERLAP:', a, b)
        sys.exit(2)
print('phrase sites:', len(ph_sites))
from collections import Counter
occ_by_key = Counter(k for _, _, k, _ in ph_sites)
for ki, key in enumerate(PK_ORDER):
    if occ_by_key[ki]:
        print(f'  {key:14s} x{occ_by_key[ki]}')

# expected totals sanity (baked occurrences from 843 pipeline)
EXPECT = {'polished': 4, 'big-workshop': 2, 'no-arcade-door': 2, 'shelf-setup': 2}
for key, n in EXPECT.items():
    got = occ_by_key[PK_ORDER.index(key)]
    assert got == n, (key, got)

# pockets prefix (single site, not in phrase pools)
PK_ORDER_W = PK_ORDER + ['pockets']
POCKETS = ['Pockets checked: ', 'Loadout scanned: ', 'Kit inspected: ',
           'Supplies counted: ', 'Inventory readout: ', 'Pouch contents: ',
           'Gear box opened: ', 'Pack reviewed: ', 'Bags inventoried: ',
           'Cargo listed: ', 'Stock checked: ', 'Hold inspected: ',
           'Stores counted: ', 'Locker contents: ', 'Vault scanned: ']
ppos = src.find('"Pockets checked: "')
assert ppos >= 0 and src.count('"Pockets checked: "') == 1
pockets_span = (ppos, ppos + len('"Pockets checked: "'))

# ---------------------------------------------------------------------------
# 3) literal->literal escaping helpers
# ---------------------------------------------------------------------------
def lit_js(text):
    if '${' in text:
        return '`' + text.replace('\\', '\\\\').replace('`', '\\`') + '`'
    return '"' + text.replace('\\', '\\\\').replace('"', '\\"') + '"'

def phrase_expr(keyIdx, texts):
    arr = '[' + ','.join(lit_js(t) for t in texts) + ']'
    return '_0xlex.P(' + str(keyIdx) + ',' + arr + ')'

# ---------------------------------------------------------------------------
# 4) apply replacements backwards
# ---------------------------------------------------------------------------
repl = []
# codename spans: from Log.say site match -> quoted literal span
for (m, ti) in zip(sites, term_of_site):
    ws, we = m.start(1) - 1, m.end(1) + 1   # include surrounding quotes
    assert src[ws] == '"' and src[we - 1] == '"'
    repl.append((ws, we, '_0xlex.C(' + str(TERMS.index(ti)) + ')'))
# phrase sites
for (s0, e0, ki, variant) in ph_sites:
    repl.append((s0, e0, phrase_expr(ki, PHRASES[PK_ORDER[ki]])))
# pockets
repl.append((pockets_span[0], pockets_span[1], phrase_expr(len(PK_ORDER), POCKETS)))

repl.sort(key=lambda r: r[0])
# no overlap between codename & phrase spans
for a, b in zip(repl, repl[1:]):
    if b[0] < a[1]:
        print('REPL OVERLAP', a, b); sys.exit(3)
# assert no Log.say literal first-arg remains after we are done conceptually
body = src
for s0, e0, txt in sorted(repl, reverse=True):
    body = body[:s0] + txt + body[e0:]
print('after-replace Log.say(" occurrences:', len(say_re.findall(body)))

# ---------------------------------------------------------------------------
# 5) inject _0xlex helper (after MemberCount region, before run-key guard)
# ---------------------------------------------------------------------------
anchor = '// ── end client-state readout region ──'
ai = body.index(anchor) + len(anchor)
lexdef = []

def cname(seed='x'):
    return '_0xlex'  # fixed names are fine; helper lives at outer scope

lexdef.append("""
  const _0xlex = (() => {
    const C = [""")
for t in TERMS:
    lexdef.append('      [' + ', '.join('"' + w + '"' for w in POOLS[t]) + '],')
lexdef.append("""    ];
    const _last = {};
    const pick = (i, arr) => {
      if (!arr || arr.length === 0) return '';
      if (arr.length === 1) return arr[0];
      let j = Math.floor(Math.random() * arr.length);
      if (j === _last[i] && arr.length > 1) j = (j + 1) % arr.length;
      _last[i] = j;
      return arr[j];
    };
    return {
      C: i => pick(i, C[i]),
      P: (i, arr) => pick(i, arr)
    };
  })();
""")
body = body[:ai] + ''.join(lexdef) + body[ai:]

open('/tmp/o85dyn-base.js', 'w', encoding='utf-8').write(body)
print('dyn base written', len(body))
