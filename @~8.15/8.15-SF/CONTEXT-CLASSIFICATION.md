# O8.15-SF classification

| class | examples | treatment |
|---|---|---|
| frozen | O8.14 Working-Stable, O8.14 package mirror, rollback-b22 | never edit or rebuild in place |
| active source | `Active/O8.15/carrier`, `Active/O8.15/tools`, current reports/plans | keep available for the active line |
| saved generated | CC-34 package, chain-A pins, measurement outputs | archive with manifest and checksum in SF |
| operator evidence | v4 runner, capture, run card, system map | keep in SF context and active capture reference |
| retired | Active O8.13 laboratory tree | compressed under `Archives/retired/`, restore only for a measured reproduction |
| disposable | `/tmp`, node_modules, candidate sweep outputs | never rely on persistence; remove after measurement |
