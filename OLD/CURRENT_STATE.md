# Current State

## Task

Investigate and repair the O.7.16/O.7.30 all-pockets-missing regression without reverting O.7.30 progression, cleanup, cancellation, retry, and lifecycle work.

## Confirmed result

O.7.38 was reported working in the live client after switching back to O.7.12-style push-return capture. This confirms the immediate regression was runtime-candidate selection, not the progression loop or lifecycle architecture.

Earlier versions could use the callback argument because it exposed a `.c` object. The later working version prioritizes the return value of `push()` and only falls back to the chunk array if it has a usable cache.

## Required invariants

- Preserve O.7.30 lifecycle and progression changes.
- Use the push-return capture path.
- Require all seven pockets: `_0x3` through `_0x9`.
- Fail closed when the runtime or any pocket is unavailable.
- Do not execute all matching `_0x2.m` definitions in the maintained path.
- Keep retries bounded and progress server-confirmed.
- Keep cleanup idempotent.
- Keep varied validation rather than relying on one successful live run.

## Evidence timeline

- O.7.12 worked as the comparison baseline.
- O.7.30 failed immediately at Satchel discovery.
- O.7.32 found valid-looking callback and push-return candidates but only 102 cached modules.
- O.7.33 showed waiting did not increase the selected cache.
- O.7.34 found roughly 8,397 definitions and roughly 951 target-source hits, while the selected cache remained small.
- O.7.35 executed 232 candidate definitions and grew the cache to 2,112, but still found no pockets.
- O.7.38’s strict push-return experiment worked live.

## Known implementation details

The seven expected discovery assignments are:

```js
if (!_0x3 && GoogleHas(exA, _0xm0)) _0x3 = exA;
if (!_0x4 && GoogleHas(exAy, _0xm1)) _0x4 = exAy;
if (!_0x5 && GoogleHas(exA, _0xm3)) _0x5 = exA;
if (!_0x6 && GoogleHas(exA, _0xm4)) _0x6 = exA;
if (!_0x7 && GoogleHas(exAy, _0xm5)) _0x7 = exAy;
if (!_0x8 && GoogleHas(exh, _0xm6)) _0x8 = exh;
if (!_0x9 && GoogleHas(exBo, _0xm7)) _0x9 = exBo;
```

The gate must include all seven:

```js
const complete = !!_0x3 && !!_0x4 && !!_0x5 &&
  !!_0x6 && !!_0x7 && !!_0x8 && !!_0x9;
```

## Independent lifecycle item

The current cancellation path sets `_0xkill` and aborts the controller. Full registered cleanup is normally finalized through `GoogleRelease`, including the manual refresh path. This is separate from the repaired capture regression and must be tested before changing it.
