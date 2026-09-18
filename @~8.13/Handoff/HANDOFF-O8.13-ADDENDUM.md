# Addendum — O8.12-r4 FROZEN / O8.13 SCOPED — 2026-09-16 07:44 Asia/Shanghai

> This addendum supplements `Handoff/HANDOFF.md` (still frozen at O8.11 fb32c3a8 2026-09-15). It becomes §0 replacement on next Handoff rotation. Source of truth is `Active/O8.13/Handoff_O8.13_2026-09-16.md`.

## Live line update

- **O8.12-r4 FROZEN** `Active/O8.12-r4` `BUILD-SEED 851b28e5` — `1,660,881B 1e03f483...` / `f36e792...` / `a206aaa...` `1024×768 salt 3f72a1ec 53.92% seed 0x6d7f0c87 G8 2a8969a6→6521c470` — `S15 ALL PASS`, paste-proven `Host config 32319 GoogleUblock true`. Hostile `rhXB/tUK` `0 evals` reel guard `44754>24600`.
- **O8.13 SCOPED** `Active/O8.13` branch `2026-09-16T07:44:00+08:00` copy of R4. Goal: collate all Discord-stealth fixes (A1 O→real, A2 e guard variable, B1 OTO raise) + bulk hunter-first `K+L+P+N+X+Y` ready to land in one rebuild. No bytes changed yet — see `Active/O8.13/AVENUES-O8.13-COLLATED.md` checklist.
- **Trim** `98.69→81.64MB` (89.80 with O8.13) — `stego-r3` archived `8.8M gz`, `stego-r4/output-1024 → symlink`, `tools/auto-trim.sh` now `79MB` under `95`.
- **Rename** `Active/O8.6 → O8-legacy` done; `Stego/stego-r3` archived restorable `tar -xzf _COMPRESSED-HISTORY/stego-r3-2026-09-16.tar.gz`.

## Next handoff rotation (when you approve)

1. Copy `Active/O8.13/Handoff_O8.13_2026-09-16.md` §1–§6 into `Handoff/HANDOFF.md` §0–§1, update `Live deliverables` table with R4 hashes above.
2. Prepend `Handoff/CHANGELOG.md` with `O8.12-r4` entry (frozen) and `O8.13` entry (scoped).
3. On `O8.13` freeze: overwrite `Archives/packages/O8.13/` (rolling rule) with `final-package/* + Stego/stego-r4/output/* + BUILD.json/ARCHIVE.txt/SHA256SUMS.txt` (9 files), `sha256sum -c`.

## Verification stays

```bash
node Active/O8.12-r4/oto/scripts/run-25pass-battery.mjs  # 25/25
node Active/Stego/test-stego11-tiers.mjs Active/Stego/stego-r4/output/O8.12-runner.js Active/Stego/stego-r4/output/O8.12-cover.bmp
bash tools/auto-trim.sh
```
