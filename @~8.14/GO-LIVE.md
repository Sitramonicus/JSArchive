# O8.13-r3 — frozen release

**Canonical paste target:**

```text
Working-Stable/O8.13/O8.13-runner-d4de42af.js
```

The filename carries the first eight hexadecimal characters of the runner's SHA-256. The
runner embeds the cover and payload; the BMP is not fetched separately.

## Frozen identity

- release: `O8.13-r3`
- runner: 3,372,856 bytes · `d4de42af1a0f…`
- bundle: 2,321,708 bytes · `604f4434955b…`
- cover: 2,359,350 bytes · `3bbe73455937…`
- instance: `7e953faa`
- build seed: `851b28e5`
- rotation: `o812`

The archive mirror is `Archives/packages/O8.13/`. The r3 candidate is
`Archives/packages/O8.13-r3/`. `Active/O8.13/live` is a directory link to this live mirror.

## Verify the exact bytes

From the repository root:

```bash
node verify-golive.mjs
```

Or verify the live directory directly:

```bash
cd Working-Stable/O8.13
sha256sum -c SHA256SUMS.txt
```

The old `O8.12-*` and `O8.6-Final-*` names that remain in the mirror are compatibility
symlinks, not additional builds. Use the self-identifying `O8.13-*` names.

## Freeze verification

| check | result |
|---|---:|
| 16-point release verification | **16/16** |
| 25-pass battery | **25/25** |
| stego tier suite | **43 passed, 0 failed** |
| live/archive SHA-256 parity | **14/14 manifest entries** |
| safe S0 smoke test | **ALL PASS** |

The historical 14/16 report came from stale test assumptions and retired filenames. The
Point-16 manifest assertion and release naming were corrected without changing r3 payload
bytes.

## Security warning

This is a functional freeze, not a security certification. The payload contains dynamic
execution and host-task HTTP interfaces. A safe harness observes simulated video-progress
POSTs. Do not describe this build as network-free, and do not paste it into an account or
workspace without authorization.

The supplied audit logs document password-like debug material in prior history/snapshots/chat.
Classify those values before distribution: if any are actual privileged credentials, keep them out
of release/history and rotate as appropriate; if they are disposable test commands, they are not
production secrets. Do not store replacement values in files, logs, or handoff notes.

See:

- `Handoff/R3-SECURITY-AUDIT-2026-09-18.md`
- `Active/O8.13/CAR-M-R2-08-R4-PLAN.md`
- `Working-Stable/O8.13/BUILD.json`
- `Working-Stable/O8.13/ARCHIVE.txt`

## R4 hold

CAR-M and R2-08 are planning-only. G5/G6 remain a separate held CC. `Working-Stable/` must
not be overwritten until an explicit new go-live decision.
