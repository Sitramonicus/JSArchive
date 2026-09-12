# O.8.5-S4 — Final 11K Multi-Dictionary Heavy-Obfuscated Package

This directory contains the finalized, stress-tested, heavy 11,000-word 3-dictionary suite O.8.5-S4 deliverables.

---

## 🚀 Deliverables (11K 3-Dictionary Suite + Heterogeneous OTO Matrix)

| Artifact | Size | SHA-256 Checksum | Description |
|---|---|---|---|
| **`O8.5-S4-compressed-gzip.js`** | **686.5 KB** | `a6bd97c3fbe7fa1758cbf816d41facd389c194a5b594e2c6a31001182c608bc7` | **PRIMARY:** Heavy 5K dictionary obfuscated bundle & loader. Searchable `会員` and `名` on Line 1. |
| **`O8.5-S4-compressed-deflateraw.js`** | **686.5 KB** | `3dc1ac2e83ea94086ba628bf18024af54d4fdbd2b56b2348a8e7c8f3b845e8ad` | Alternative `deflate-raw` self-extracting transport loader with identical heavy obfuscation. |
| **`O8.5-S4-final-bundle.js`** | **1.35 MB** | `8719aca8abf92e4cc5ffdebee2066e5a461558961e3694c6570194b876e70cdb` | Uncompressed master payload (5,000-word dictionary + CFF 0.40). |
| **`selected-shards/`** | — | — | The 7 individual selected shard outputs (`v1`, `v2`, `u-canon`, `v6`, `v1`, `v7`, `v5`). |
| **`SHA256SUMS.txt`** | — | — | Cryptographic SHA-256 checksums for all package deliverables. |

---

## 🔍 How to Configure (Line 1 of Compressed Loaders)

The header at Line 1 exposes clean, searchable configuration variables:

```javascript
var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); (async () => { ... })();
```

### 1. Setting Your Unlock Passphrase (`名`)
* Search for `佐藤 結衣` and replace it with your passphrase (e.g. `var 名 = "your_secret_passphrase";`).
* When pasted into console, the loader dynamically inflates the payload in memory, swaps `"佐藤 結衣"` for `名`, and unlocks all diagnostics and queues.

### 2. Changing Log Level (`会員`)
* Search for `会員 = 2` (or `会員`) and adjust the value:
  * **`会員 = 2`** (Default): Full diagnostics mode. Flushes all 6 `[O8-DIAG]` queues and store telemetry upon unlock.
  * **`会員 = 1`**: Operational mode. Normal quest notices print (`Pacing shift`, `(est. resume in ~20s)`); detailed `[O8-DIAG]` telemetry is suppressed.
  * **`会員 = 0`**: Stealth mode. Internal quest and diag traces are silenced, while **MemberCount logs still output to console as red herrings**.

---

## 🛡️ Key Architecture & Safety Features

1. **11,000-Word 3-Dictionary Suite**:
   - `identifiers-dictionary-jso.csv` (1,000 words, length 5-11): Shard-level obfuscation.
   - `identifiers-dictionary-5k.csv` (5,000 words, length 5-11): Master bundle obfuscation.
   - `identifiers-dictionary-runner-5k.csv` (5,000 words, length 5-11): Outer compressed runner obfuscation.
   - **Zero dictionary overlap** across all three sets.
2. **Route Stall Auto-Recovery & Telemetry**:
   - Navigation away in Discord triggers route pause with `(est. resume in ~20s)` logging under Log Level 1.
   - Route watcher counter auto-recovers after 8 ticks (~20s) if the client stays on an alternate route.
3. **16-Point Verification Battery**:
   - 16/16 automated test points passed (syntax, hygiene, coverage, non-overlap, config headers, execution modes, single-pass unlock, salted SHA-256 digest, compression self-extraction, and SHA-256 parity).
