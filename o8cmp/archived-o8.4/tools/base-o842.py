# -*- coding: utf-8 -*-
# base-o842.py — O.8.4.2 base deltas on top of lexicon output.
# Reads /tmp/o842-lex.js, writes /tmp/o842-base.js. Local only.
import re

src = open('/tmp/o842-lex.js', encoding='utf-8').read()

# ---------- A) MemberCount region v3 (alive: cache + summary flavor; level-0 direct) ----------
seg_s = src.index('  // ── client-state readout region ──')
seg_e = src.index('  // ── end client-state readout region ──', seg_s)
seg = src[seg_s:seg_e]

assert 'const number = v =>' in seg
seg = seg.replace('const number = v =>',
                  'const _0xlog = { samples: 0, lastAt: 0, total: null };\n'
                  '    const _0xemit = s => { try { console.debug(s); } catch (e) {} };\n'
                  '    const number = v =>')
# MemberCount prints bypass Log entirely (silent level must still show MC lines)
assert 'Log.info(S.n0);' in seg
seg = seg.replace('Log.info(S.n0);', '_0xemit(S.n0);')
assert 'Log.info(`${S.n1}${result.total ?? S.ua}${suffix}`);' in seg
seg = seg.replace('Log.info(`${S.n1}${result.total ?? S.ua}${suffix}`);',
                  '_0xlog.samples++;\n'
                  '          _0xlog.lastAt = Date.now();\n'
                  '          _0xlog.total = result.total;\n'
                  '          _0xemit(`${S.n1}${result.total ?? S.ua}${suffix}`);')
assert 'Log.info(S.n3);' in seg
seg = seg.replace('Log.info(S.n3);', '_0xemit(S.n3);')
# append summary() before module close
close_marker = '\n    };\n  })();'
assert seg.count(close_marker) == 1
seg = seg.replace(close_marker, ''',\n      summary: () => {
        try {
          if (_0xlog.total === null || _0xlog.samples === 0) return;
          if (Date.now() - _0xlog.lastAt < 60000) return;
          const t = _0xlog.total;
          _0xemit(`[MemberCount] Still watching ${t} server${t === 1 ? "" : "s"} — nothing unusual.`);
        } catch (e) {}
      }
    };
  })();''', 1)
src = src[:seg_s] + seg + src[seg_e:]

# summary call site after the activeTasks drain (whitespace-flexible anchor; keep tail)
m = re.search(r'\n( *)while \(activeTasks\.size > 0[^\n]*await GoogleDelay\(1\);\n', src)
assert m, 'drain anchor not found'
ins = m.group(1) + 'try { MemberCount.summary(); } catch (e) {}\n'
src = src[:m.end()] + ins + src[m.end():]

# ---------- B) unlock credential swap (salt = short, password = long) ----------
salt = 'RBaa+,gp#V%w&%Tm|*g8V_{@1C!Q'
password = 'thisisjustfordebuggingwhyinthehelldoyouneedtoknowthecontents'
import hashlib
digest = hashlib.sha256((salt + password).encode()).hexdigest()
codes = ','.join(str(ord(c)) for c in salt)
src = re.sub(r'const _0xsalt = String\.fromCharCode\(\.\.\.\[\d+(?:,\d+)*\]\);',
             'const _0xsalt = String.fromCharCode(...[' + codes + ']);', src)
src = re.sub(r'const _0xwant = "[0-9a-f]{64}";', 'const _0xwant = "' + digest + '";', src)

# ---------- C) head diag ----------
src = src.replace('O8.4.1 core — static lexicon, log-lock, studio gaps, refill queue, metamorphic decode.',
                  'O8.4.2 core — lexicon v2, log-lock, studio gaps, refill queue, metamorphic decode.')

open('/tmp/o842-base.js', 'w', encoding='utf-8').write(src)
print('digest', digest)
print('base written', len(src))
