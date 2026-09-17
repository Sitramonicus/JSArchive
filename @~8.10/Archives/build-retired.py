#!/usr/bin/env python3
"""Build Archives/RETIRED.md from live bytes (dry run), then with --apply delete them.

Retired set (all superseded / duplicated / reproducible — nothing on the live line):
  - Active/Stego/output-stego2-{re,v1,v2}/   (deterministic rebuild evidence)
  - Archives/packages/O8.6-{S3-r1,S4-r1,S5-r1,S5-r2}.tar.gz + O8.6-S5-r4/
  - Archives/{o8.6-S5-live,stego-history,o8.5-era,o8.5-archived,o7-era,o8.4-era,attic}.tar.gz
  - /home/user/{cover-pristine,cover-stego,cover2-preview,cover3-preview,cover3-simulated,stego2-final}.png
For each: size, sha256, listing, embedded small-text context (SHA sums, manifests,
ARCHIVE notes), and the reproduce/supersede pointer. Review RETIRED.md, then --apply.
"""
import hashlib
import os
import shutil
import sys
import tarfile

REPO = '/home/user/JSArchive'
APPLY = '--apply' in sys.argv
out = []
saved = 0
warnings = []


def emit(s=''):
    out.append(s)


def sha(p):
    h = hashlib.sha256()
    with open(p, 'rb') as f:
        for ch in iter(lambda: f.read(1 << 20), b''):
            h.update(ch)
    return h.hexdigest()


def w(msg):
    warnings.append(msg)
    print('WARN:', msg)


def tarball_section(path, title, note=''):
    global saved
    rel = os.path.relpath(path, REPO)
    size = os.path.getsize(path)
    saved += size
    digest = sha(path)
    tf = tarfile.open(path)
    members = tf.getnames()
    emit(f'## {title}')
    emit()
    emit(f'- Was: `{rel}` — {size:,} B, sha256 `{digest}`')
    if note:
        emit(f'- {note}')
    emit(f'- Entries ({len(members)}):')
    emit('```')
    emit('\n'.join(members))
    emit('```')
    for m in members:
        if m.endswith(('SHA256SUMS.txt', 'ARCHIVE.txt', 'MANIFEST.txt')) and tf.getmember(m).size < 20000:
            text = tf.extractfile(m).read().decode('utf-8', errors='replace')
            emit(f'- Embedded `{m}`:')
            emit('```')
            emit(text.rstrip('\n'))
            emit('```')
    tf.close()
    emit()
    return digest


emit('# Retired bytes — context file (2026-09-12 trim)')
emit()
emit('Everything below was deleted to reclaim workspace space. Each entry keeps:')
emit('size, sha256, full listing, and the small-text context (checksums, manifests,')
emit('archive notes). Nothing here is on the live line (S6 + Stego-2 r1 at trim time; live is now r2 — see INDEX.md).')
emit('Regenerate/verify: `python3 Archives/build-retired.py` (dry run, asserts live bytes).')
emit()

# ---- 1. variant / rebuild evidence dirs ----
emit('## Stego-2 variant + rebuild evidence dirs (reproducible, deleted)')
emit()
v0bmp = sha(f'{REPO}/Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp')
for d in ['output-stego2-re', 'output-stego2-v1', 'output-stego2-v2']:
    p = f'{REPO}/Active/Stego/{d}'
    files = sorted(os.listdir(p))
    dsize = sum(os.path.getsize(f'{p}/{f}') for f in files)
    saved += dsize
    run = f'{p}/O8.7-Stego-2-runner.js'
    bmp = f'{p}/O8.7-Stego-2-cover.bmp'
    head = open(run, encoding='utf-8').read(90).replace('\n', '\\n')
    bh = sha(bmp)
    flag = 'SAME-BMP-AS-V0' if bh == v0bmp else 'BMP-DIFFERS-FROM-V0'
    if bh != v0bmp:
        w(f'{d} cover differs from v0!')
    emit(f'- Was: `Active/Stego/{d}/` — {dsize:,} B ({", ".join(files)})')
    emit(f'  runner sha256 `{sha(run)}`, {flag}')
    emit(f'  Line 1: `{head}`')
    flag = {'output-stego2-re': '(default variant 0)', 'output-stego2-v1': '--line1=1',
            'output-stego2-v2': '--line1=2'}[d]
    emit(f'  Reproduce: `node build-stego2.js … {flag}` + tier suite (see `Active/Stego/README.md` §6; v1/v2 smoked 4/4 quick at freeze).')
emit()

# ---- 2. old package freezes ----
for name, title in [('O8.6-S3-r1.tar.gz', 'S3 r1 frozen build'),
                    ('O8.6-S4-r1.tar.gz', 'S4 frozen build'),
                    ('O8.6-S5-r1.tar.gz', 'S5 r1 frozen build'),
                    ('O8.6-S5-r2.tar.gz', 'S5 r2 frozen build')]:
    tarball_section(f'{REPO}/Archives/packages/{name}', title,
                    note='Superseded by the S6 line; feature deltas live in `Handoff/CHANGELOG.md` + `Docs/O8.6-S3-S4.md`.')

# ---- 3. r4 dir ----
emit('## S5 r4 consolidated freeze (dir, superseded)')
emit()
r4 = f'{REPO}/Archives/packages/O8.6-S5-r4'
r4size = sum(os.path.getsize(f'{dp}/{f}') for dp, _, fs in os.walk(r4) for f in fs)
saved += r4size
emit(f'- Was: `Archives/packages/O8.6-S5-r4/` — {r4size:,} B, 15 files')
for f in ['O8.6-S5-entangled-cover.bmp', 'O8.6-S5-entangled-stego-runner.js']:
    a = f'{REPO}/Active/Stego/output/{f}'
    b = f'{r4}/{f}'
    same = sha(a) == sha(b)
    if not same:
        w(f'r4 {f} DIFFERS from Active/output!')
    emit(f'- Stego-1 `{f}`: {"IDENTICAL (`cmp` clean) — surviving copy at `Active/Stego/output/`" if same else "DIFFERS!"}')
for f in ['SHA256SUMS.txt', 'ARCHIVE.txt']:
    text = open(f'{r4}/{f}', encoding='utf-8').read()
    emit(f'- Embedded `{f}`:')
    emit('```')
    emit(text.rstrip('\n'))
    emit('```')
emit()

# ---- 4. old tarballs ----
tarball_section(f'{REPO}/Archives/o8.6-S5-live.tar.gz', 'Pre-S6 rollback freeze',
                note='Superseded by `Archives/o8.6-S6-live.tar.gz` (the rollback point).')
# ---- 4b. kept bytes (pointers, not deleted) ----
emit('## S6 r1 live tarball (kept — rollback point)')
emit()
p = f'{REPO}/Archives/o8.6-S6-live.tar.gz'
tf = tarfile.open(p)
members = tf.getnames(); tf.close()
emit(f'- KEEP: `Archives/o8.6-S6-live.tar.gz` — {os.path.getsize(p):,} B, sha256 `{sha(p)}`')
emit(f'- Entries ({len(members)}):')
emit('```')
for m in members:
    emit(m)
emit('```')
emit()
emit('## Stego-2 r1 frozen pair (kept)')
emit()
rp = f'{REPO}/Archives/packages/O8.7-Stego-2-r1'
fl = sorted(os.path.relpath(f'{dp}/{f}', rp) for dp, _, fs in os.walk(rp) for f in fs)
r1s = sum(os.path.getsize(f'{rp}/{f}') for f in fl)
emit(f'- KEEP: `Archives/packages/O8.7-Stego-2-r1/` — {r1s:,} B, {len(fl)} files, `sha256sum -c` 6/6 OK')
emit('- Live-sha cross-check (payload files):')
emit('```')
for f in fl:
    if f.endswith(('.js', '.bmp')):
        emit(f'{sha(f"{rp}/{f}")}  {f}')
emit('```')
emit()

tarball_section(f'{REPO}/Archives/stego-history.tar.gz', 'Dead stego experiments',
                note='pack-stego-bmp outputs + diagnosed-dead 6.3 MB `test2.js` fragment. Nothing live.')
for name, doc in [('o8.5-era.tar.gz', 'Docs/O8.5-ERA.md'), ('o8.5-archived.tar.gz', 'Docs/O8.5-ERA.md'),
                  ('o7-era.tar.gz', 'Docs/O7-ERA.md'), ('o8.4-era.tar.gz', 'Docs/O8.2-O8.4-ERA.md'),
                  ('attic.tar.gz', 'Docs/O8.5-ERA.md + O8.2-O8.4-ERA.md (attic notes merged at reorg)')]:
    tarball_section(f'{REPO}/Archives/{name}', f'Era material `{name}`',
                    note=f'Prose context merged losslessly into `{doc}` at reorg; tarball held only pre-reorg paths.')

# ---- 5. loose preview PNGs ----
emit('## Loose preview PNGs (`/home/user/*.png`, reproducible, deleted)')
emit()
png_cmd = {
    'cover-pristine.png': ('DUP of `Uploads/stego2-cover-source.png` (`cmp` clean). Reproduce: copy that file.',
                           '618×408 concert photo (Stego-1 pristine look, Stego-2 cover source).'),
    'cover-stego.png': ('Reproduce: `python3 -c "from PIL import Image;'
                        ' Image.open(\'Active/Stego/output/O8.6-S5-entangled-cover.bmp\').convert(\'RGB\')'
                        '.save(\'cover-stego.png\')"`.',
                        'Stego-1 fried carrier render (photo strip + static).'),
    'cover2-preview.png': ('Superseded synthetic v2 cover render. No reproduce — see v3 photo cover.',
                           'Dead iteration (rejected: washed-out, banded).'),
    'cover3-preview.png': ('Reproduce: `python3 -c "from PIL import Image;'
                           ' Image.open(\'Uploads/stego2-cover.bmp\').save(\'cover3-preview.png\')"`.',
                           'Stego-2 v3 clean cover render (800×620 photo).'),
    'cover3-simulated.png': ('Superseded simulation; the real thing is `stego2-final.png` below.',
                             'Pre-build 30% scatter prediction (confirmed by real bytes).'),
    'stego2-final.png': ('Reproduce: `python3 -c "from PIL import Image;'
                         ' Image.open(\'Active/Stego/output-stego2/O8.7-Stego-2-cover.bmp\')'
                         '.save(\'stego2-final.png\')"`.',
                         'Actual Stego-2 r1 fried carrier.'),
}
for name, (repro, what) in png_cmd.items():
    p = f'/home/user/{name}'
    size = os.path.getsize(p)
    saved += size
    emit(f'- Was: `{name}` — {size:,} B, sha256 `{sha(p)}` — {what}')
    emit(f'  {repro}')
emit()
if sha('/home/user/cover-pristine.png') != sha(f'{REPO}/Uploads/stego2-cover-source.png'):
    w('cover-pristine.png DIFFERS from repo source!')

emit(f'Total reclaimed by this trim: ~{saved / 1e6:.1f} MB of snapshot-persisted bytes.')
emit()

txt = '\n'.join(out)
open(f'{REPO}/Archives/RETIRED.md', 'w').write(txt)
print(f'RETIRED.md written ({len(txt.splitlines())} lines), covers ~{saved / 1e6:.1f} MB.')
print(f'warnings: {len(warnings)}')

if APPLY:
    rm = [f'{REPO}/Active/Stego/output-stego2-{d}' for d in ['re', 'v1', 'v2']]
    rm += [f'{REPO}/Archives/packages/{n}' for n in
           ['O8.6-S3-r1.tar.gz', 'O8.6-S4-r1.tar.gz', 'O8.6-S5-r1.tar.gz', 'O8.6-S5-r2.tar.gz', 'O8.6-S5-r4']]
    rm += [f'{REPO}/Archives/{n}' for n in
           ['o8.6-S5-live.tar.gz', 'stego-history.tar.gz', 'o8.5-era.tar.gz', 'o8.5-archived.tar.gz',
            'o7-era.tar.gz', 'o8.4-era.tar.gz', 'attic.tar.gz']]
    rm += [f'/home/user/{n}' for n in png_cmd]
    for p in rm:
        if os.path.isdir(p):
            shutil.rmtree(p)
        else:
            os.remove(p)
        print('deleted', p)
