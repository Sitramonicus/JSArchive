# Archives — frozen history (trimmed 2026-09-12)

Live line is the ROLLING current: **`packages/O8.13/`** (frozen 2026-09-17 on operator go-live,
instance 7e953faa, `sha256sum -c` 9/9 OK). The header below this line is the 2026-09-12 text and
still names `O8.7-Stego-3` — that was the live line then, not now.
Rule (operator 2026-09-13): no more -rN freeze dirs — the rolling dir is
overwritten per change and superseded bytes are documented into `RETIRED.md`
then deleted. Trims: 2026-09-12 (~138 MB -> ~56 MB) and 2026-09-13 (~38 MB of
superseded freezes + rollback tarballs retired). `RETIRED.md` (2,423 lines:
sizes, sha256, full listings, embedded checksums/manifests/archive notes,
reproduce commands) is the single context file — read it before assuming
anything is lost. Generator: `build-retired.py` (do not re-run `--apply`
without reading it).

## Kept

| `packages/O8.13-r2-candidate/` | 9.3 MB, 9 files | **R2 candidate frozen in place 2026-09-18** after CC R2-03 + R2-04 + R2-05a + R2-05b. 43/0 stego tiers, 25/25 battery, gated S8/S9/S10/S12/S15 passed on bundle and real.min, 14/16 verification (Pt05 + Pt13 known backlog). Bundle `6886c39e…`, runner `c09004e4…`, real.min `516ec872…`, cover `28870fde…`; occupancy 75.13% (1,698,152/2,260,322). This is a candidate only; `Working-Stable/O8.13/` remains the live deliverable. |

| entry | size | notes |
|---|---|---|
| `packages/O8.13/` | 9.0 MB, 9 files | **LIVE LINE, frozen 2026-09-17 on operator go-live.** Discord-stealth line off O8.12-r4: cover slack (`slackFor`, 574 B), per-lane balanced dictionaries (20/20 scripts, top/even 2.36x), HNT-GREP anti-grep noise, all five pockets on v1. Bundle `ef1dac5e…`, runner `e008b377…`, cover `627ae142…`. Instance `7e953faa`, BUILD-SEED `851b28e5`, rotation `o812`. `sha256sum -c` 9/9 OK. Also mirrored to `Working-Stable/O8.13/`. |
| `packages/O8.11/` | 4.9 MB, 10 files | previous frozen line `fb32c3a8` / instance `3a82764d` — restored 2026-09-17 from `_COMPRESSED-HISTORY/Archives-packages.tar.xz` |
| `packages/O8.9/` | — | `2b7d1eab` — restored from the same tarball |
| `packages/O8.8/` | — | `31fe03e1` — restored from the same tarball |

### Pre-2026-09-17 entries

| entry | size | notes |
|---|---|---|
| `packages/O8.7-Stego-3/` | 4,756,605 B, 7 files | ROLLING current (post-stress-test: verifier + vmExec + video-first, instance a9e0ecca); `sha256sum -c` 6/6 OK |
| `packages/O8.7-Stego-2/` | 4,641,304 B, 7 files | ROLLING previous-line freeze (renamed r2, bytes untouched); `sha256sum -c` 6/6 OK |
| `shards-history/` | 316 KB | Reverse unified-diff chain rebuilding scrub1–scrub4 from live scrub5 (`Active/O8.6/shards/`); see `RECONSTRUCT.md`. Verified 2026-09-12: full walk reproduces all 28 originals byte-identically |
| `RETIRED.md` + `build-retired.py` | 1,572 lines + generator | The trim record + the script that built it |

## Retired 2026-09-12 (context in `RETIRED.md`)

- `Active/Stego/output-stego2-{re,v1,v2}/` — 13.5 MB deterministic-rebuild +
  Line-1-variant evidence (runner shas, Line-1 strings, reproduce flags kept).
- `packages/O8.6-{S3-r1,S4-r1,S5-r1,S5-r2}.tar.gz` — ~9 MB superseded freezes.
- `packages/O8.6-S5-r4/` — 4.9 MB; its stego pair was `cmp`-identical to the
  surviving `Active/Stego/output/` pair (`SHA256SUMS.txt` + `ARCHIVE.txt`
  embedded verbatim).
- `o8.6-S5-live.tar.gz` — 3.8 MB pre-S6 rollback point (superseded by S6 tarball).
- `stego-history.tar.gz` — 8.7 MB dead experiments (pack-stego outputs +
  diagnosed-dead 6.3 MB `test2.js` fragment).
- `o8.5-era.tar.gz` + `o8.5-archived.tar.gz` — 9.6 MB; `o7-era.tar.gz`,
  `o8.4-era.tar.gz`, `attic.tar.gz` — 0.9 MB. Prose context was already merged
  into `Docs/*-ERA.md` at reorg; tarballs held only pre-reorg paths.
- 6 loose `/home/user/*.png` — 5 MB (pristine was a `cmp` dup of
  `Uploads/stego2-cover-source.png`; renders reproducible via one PIL command
  each — commands in `RETIRED.md`).

## Retired 2026-09-13 (rolling rule — context in `RETIRED.md`, +850 lines)

- `packages/O8.7-Stego-3-r1/` — 4,678,382 B (live freeze; runner `4f2a489a…`,
  instance 952bf71b). Full sums + `ARCHIVE.txt` + `BUILD.json` embedded.
- `packages/O8.7-Stego-3-r2/` — 4,686,491 B (stall-verifier bugfix freeze,
  instance d237bb30, never promoted). Full sums + texts embedded.
- `packages/O8.7-Stego-2-r1/` — 4,642,969 B (superseded previous-line
  freeze). Full sums + texts embedded.
- `o8.7-Stego-3-r1-live.tar.gz` — 11,392,529 B, 140 members, sha256
  `612ad8aa…` (full hash + member listing in `RETIRED.md`).
- `o8.7-Stego-2-r2-live.tar.gz` — 7,220,892 B, 123 members (full hash +
  listing in `RETIRED.md`).
- `o8.6-S6-live.tar.gz` — 7,229,899 B, 123 members (full hash + listing in
  `RETIRED.md`).
- `.git` 54 → 26 MB: the retirement blobs were staged-new (0 paths in HEAD),
  so unstaging + `gc --prune=now` dropped them. Committed history untouched.

## Deleted without archive (verified redundant before removal)

Kept from the reorg record (still true):

- 4 O8.5 zip files (2 unique byte-streams): contents byte-compared against the
  extracted `release/` dirs — all matched, so only the extracted dirs were
  tarballed at reorg (era tarballs retired 2026-09-12; listings in `RETIRED.md`).
- `O8.6-S5-r3/` (live dir): all 5 payload files byte-identical to r4 (`cmp` clean).
- `shards-scrub1…4/` (live dirs): replaced by the verified diff chain above.
- `stego/output/` intermediates + `uploads/test2.js`: were in
  `stego-history.tar.gz` (retired; listing in `RETIRED.md`).
