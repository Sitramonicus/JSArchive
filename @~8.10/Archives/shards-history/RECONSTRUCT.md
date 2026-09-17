# Shard scrub history (scrub1–scrub4), stored as reverse diffs

Live clean shards (scrub5) live at `Active/O8.6/shards/`. Generations
scrub1–scrub4 are superseded but byte-recoverable from the diff chain below —
no full duplicate `.js` copies are kept.

## Layout

- `scrub5-to-scrub4/` — unified diffs: scrub5 → scrub4 (apply to scrub5 to get scrub4)
- `scrub4-to-scrub3/` — scrub4 → scrub3
- `scrub3-to-scrub2/` — scrub3 → scrub2
- `scrub2-to-scrub1/` — scrub2 → scrub1
- `O8.6-scrub2-loader-preview.js` — superseded standalone preview (kept as-is, was never part of the chain)

An empty (0-byte) `.diff` means that shard was byte-identical between those two
generations. In practice only `shard-e` changed materially between generations
(the phrase-table / decoder work); most other shards are identical across all five.

## Reconstruct any generation

```sh
# example: rebuild scrub1 from live scrub5
rm -rf /tmp/recon && mkdir -p /tmp/recon && cp Active/O8.6/shards/*.js /tmp/recon/
cd /tmp/recon
for d in scrub5-to-scrub4 scrub4-to-scrub3 scrub3-to-scrub2 scrub2-to-scrub1; do
  for t in a m n1 e n2 aux u; do
    patch -s -p0 --no-backup-if-mismatch -i "$REPO/Archives/shards-history/$d/shard-$t.diff" "shard-$t.js"
  done
done
# /tmp/recon now holds byte-identical scrub1 (stop the loop early for scrub2/3/4)
```

Chain verified 2026-09-12: full walk scrub5→scrub1 reproduces all 28 original
files byte-identically (sha256 match).

## Diff sizes (chars)

| transition | a | m | n1 | e | n2 | aux | u |
|---|---|---|---|---|---|---|---|
| scrub5→scrub4 | 0 | 0 | 0 | 97994 | 0 | 0 | 0 |
| scrub4→scrub3 | 0 | 0 | 0 | 7311 | 0 | 0 | 0 |
| scrub3→scrub2 | 1417 | 0 | 0 | 4104 | 0 | 0 | 623 |
| scrub2→scrub1 | 1742 | 0 | 0 | 100286 | 0 | 0 | 0 |
