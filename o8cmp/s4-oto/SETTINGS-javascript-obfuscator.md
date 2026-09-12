# O.8.5-S4 — javascript-obfuscator settings (per shard, as applied)

This is the exact configuration used for the **javascript-obfuscator** OTO types, so you
can replicate them on **obfuscator.io** (or directly via the npm API). Expect a *different
result* when running on the web vs npm — engine minor versions and preset drift differ —
but with the same inputs, seeds, dictionary, and options, the AST structure matches.

- Engine used: `javascript-obfuscator` **5.6.0** (via `seamless/jso`).
- Inputs: the clean pieces in `../s4-shards/shards/` (shard-a/m/n1/e/n2/aux).
- Dictionary: **`identifiers-dictionary-jso.csv`** — 1,000 names, **comma-separated on a single line**
  (in npm: passed as `identifiersDictionary: [...]` array; in web: pasted into *Identifiers Dictionary*).

## Shared BASE options (every shard)

| Option | Value | Notes |
|---|---|---|
| Compact | `true` | Single-line output |
| Self Defending | `false` | Disabled so stitched scopes do not freeze |
| Debug Protection | `false` | Disabled |
| Disable Console Output | `false` | Disabled so logs and unlock diags print |
| Rename Globals | `false` | Preserves cross-shard and environment hooks |
| Rename Properties | `false` | Preserves internal and external properties |
| **Transform Object Keys** | **`true`** | **User Override: Enabled for all shards** |
| **Identifiers Prefix** | **`"google"`** | **User Override: Set to `"google"` for all shards** |
| Unicode Escape Sequence | `false` | Identifiers retain clean ASCII look |
| Simplify | `true` | Constant/boolean simplification |

Target: default (browser). No `sourceMap`/`inputFileName` options set.

## Type 1 — `v1-jso-s3matrix/` (the O8.5-S3 matrix with user overrides)

| Option | shard-a | shard-m | shard-n1 | shard-e | shard-n2 | shard-aux |
|---|---|---|---|---|---|---|
| Identifier Names Generator | `mangled-shuffled` | `hexadecimal` | `dictionary` | `dictionary` | `dictionary` | `mangled` |
| **Identifiers Prefix** | **`google`** | **`google`** | **`google`** | **`google`** | **`google`** | **`google`** |
| Identifiers Dictionary | — | — | CSV (1,000) | CSV (1,000) | CSV (1,000) | — |
| **Seed** | `1f7a2c0e` | `9c4b7d3a` | `e5d2b8f1` | `2de579ef` | `6b3a9f14` | `c8f4a25d` |
| String Array | `true` | `true` | `true` | `true` | `true` | **`false`** |
| String Array Threshold | `0.55` | `0.90` | `0.75` | `1.00` | `0.85` | — |
| Rotate String Array | `true` | `true` | `true` | `true` | `true` | — |
| Shuffle String Array | `true` | `false` | `true` | `true` | `true` | — |
| String Array Encoding | `base64` | `base64` | `rc4` | `rc4` | `base64` | — |
| String Array Index Shift | `true` | `true` | `true` | `true` | `true` | — |
| String Array Indexes Type | `hexadecimal-number` | `hexadecimal-numeric-string` | `hexadecimal-number` + `hexadecimal-numeric-string` | same as n1 | same as n1 | — |
| String Array Calls Transform | `true` | `true` | `true` | `true` | `true` | — |
| SA Wrappers Type | `variable` | `variable` | `function` | `function` | `variable` | — |
| **SA Wrappers Count (Increased)** | **`5`** | **`8`** | **`8`** | **`15`** | **`8`** | — |
| SA Wrappers Parameters Count | `2` | `2` | `3` | `2` | `2` | — |
| SA Wrappers Chained Calls | `true` | `false` | `true` | `true` | `true` | — |
| Control Flow Flattening | `false` | `true` @ `0.45` | `true` @ `0.60` | `true` @ `0.75` | `true` @ `0.50` | `false` |
| Dead Code Injection | `false` | `false` | `true` @ `0.08` | `true` @ `0.12` | `false` | `false` |
| Split Strings | `false` | `false` | `true` @ `6` | `false` | `true` @ `8` | `true` @ `5` |
| Numbers To Expressions | `false` | `false` | `false` | `false` | `false` | `true` |
| **Transform Object Keys** | **`true`** | **`true`** | **`true`** | **`true`** | **`true`** | **`true`** |

## shard-u (Agent-only unlock shard)

* **String Array MUST BE OFF** so that the placeholder passphrase `佐藤 結衣` remains literal, contiguous, and searchable.
* Uses `seed: 'c8d4a17e'`, `identifierNamesGenerator: 'hexadecimal'`, `identifiersPrefix: 'google'`, and `transformObjectKeys: true`.
* Ships ready-to-use in `s4-oto/u/shard-u-out.js` and `s4-oto/v1-jso-s3matrix/shard-u-out.js`.
