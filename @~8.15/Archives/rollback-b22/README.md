# O8.14 rollback — build 22 (superseded by build 23)

Kept because the v2-jsc (js-confuser) stage is **not seed-reproducible**: these bytes cannot be
regenerated from source, so this is the only bit-exact rollback point for the trace-#5-era build.

Use only if a b23 paste misbehaves: paste `O8.14-runner-71b73a15.js` instead. Its payload is the
pre-fix payload, so it will show the two trace-#5 defects again (duplicate session + `[Google ]`
blank labels) — that is expected, not a new fault.

| artifact | sha256 (first 8) |
| --- | --- |
| `O8.14-runner-71b73a15.js` | `71b73a15` |
| `O8.14-cover-d1c3ce21.bmp` | `d1c3ce21` |
| `O8.14-bundle-99327099.js` | `99327099` |
| `stego11p-real.min.js` | `9ee49896` |
