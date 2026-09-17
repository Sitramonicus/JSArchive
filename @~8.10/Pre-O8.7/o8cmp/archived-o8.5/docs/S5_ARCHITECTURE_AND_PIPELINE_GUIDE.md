# O.8.5-S5 — Master Architecture, Obfuscation & Pipeline Specification Guide

This guide is the complete, self-contained, end-to-end engineering specification for building, obfuscating, stochastic-bundling, compressing, and verifying an O8.5 payload (from clean source shards to production single-paste deliverables). 

Use this guide whenever adding new features or creating a new major revision (e.g., **S5**).

---

## 1. System Architecture & Sharding Model

An O8.5 payload is partitioned into seven distinct, specialized functional units (shards) that execute inside a unified lexical environment:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           O8.5 Payload Lifecycle                        │
│                                                                         │
│  [shard-a]  ──> Entry, Log Controller, '会員' (0/1/2), 'GoogleUblock'   │
│  [shard-m]  ──> MemberCount Engine, Decoy State, Independent '_0xemit' │
│  [shard-u]  ──> Diagnostics Unlocker, Searchable Placeholder ('佐藤 結衣')│
│  [shard-n1] ──> Noise Shard 1 (Branch Dispersion & Decoy Padding)       │
│  [shard-e]  ──> Execution Core (7-Pocket Stores, PID Detector, Ticker)  │
│  [shard-n2] ──> Noise Shard 2 (Zero-Width Steganography & Divergence)   │
│  [shard-aux]──> Auxiliary Math Helpers & Store Typed-Pool Probes        │
└─────────────────────────────────────────────────────────────────────────┘
```

### Shard Specifications & Invariants:

1. **`shard-a.js` (Entry Gateway & Log Controller)**:
   * **`var 会員 = 2;`**: Searchable log level variable (`2` = Diag, `1` = Operational, `0` = Stealth).
   * **Logging Router (`Log`)**: Implements `say`, `diag`, `warn`, `info`, `queue`, `flush`. Gated by `会員` and `_0xopen`. When `会員 === 0`, all internal `Log` functions return `noop`.
   * **Unlock Interface (`GoogleUblock`)**: Salted SHA-256 digest verifier installed on `window` via `_0xgr` (strip-bidi + string reverse of `\u202ekcolbUelgooG\u202c`). Zero literal `"GoogleUnlock"` strings anywhere.
2. **`shard-m.js` (MemberCount & Red Herring Engine)**:
   * Contains the `MemberCount` telemetry engine and phrase pools (`_0xci`, `_0xpb`, `_0xmb`).
   * **Red Herring Invariant**: Exposes `_0xemit = s => { try { console.debug(s); } catch (e) {} }`. Calls to `MemberCount.report()` emit directly to `console.debug`, **completely bypassing `Log`**. This guarantees that MemberCount telemetry continues printing as red herrings even in `会員 = 0` (Stealth Mode).
3. **`shard-u.js` (Diagnostics Unlock Shard)**:
   * Contains the searchable literal marker **`佐藤 結衣`** (exactly 1× contiguous).
   * Calls `window[_0xgr('\u202ekcolbUelgooG\u202c')]('佐藤 結衣')`.
   * Obfuscated with **`stringArray: false` ALWAYS** to prevent the marker from being indexed.
4. **`shard-n1.js` & `shard-n2.js` (Noise & Camouflage Shards)**:
   * Provide AST padding, non-deterministic branch divergence, and zero-width sequence camouflage (`ZWJ \u200d`, `ZWNJ \u200c`).
5. **`shard-e.js` (Core Engine & Quest Task Controller)**:
   * Validates Discord Webpack 7-pocket stores (`lantern`, `twine`, `ledger`, `spool`, `map`, `postbox`, `compass`).
   * Inspects running game PIDs, applies metamorphic drawer sorting, attaches overlay hooks, and ticks progress (`0/900` ➔ `900/900`).
   * Implements multi-quest chaining (automatically picks up next game on quest completion).
6. **`shard-aux.js` (Auxiliary Engine & Typed-Pool Storage)**:
   * Houses arithmetic utilities and typed-pool storage arrays for state retention.

---

## 2. Pre-OTO Clean Code Invariants (Hard Rules)

Before any obfuscation is applied, the clean source shards in `s4-shards/shards/` must satisfy:

1. **`const` ➔ `let` / `var` Invariant**:
   * Never reassign `const` bindings in dead/noise blocks (violates strict mode and causes `JSC_REASSIGNED_CONSTANT` in Closure Compiler). All noise variables must use `let` or `var`.
2. **Zero `GoogleUnlock` Literals**:
   * Must use the `_0xgr` strip-bidi and reverse helper with `kcolbUelgooG`.
3. **Searchable Terms Plaintext Rule**:
   * `var 会員 = 2;` must be defined as a top-level `var` in `shard-a.js`.
   * `佐藤 結衣` must appear as a literal string in `shard-u.js` with standard space (`\u0020`), never escaped as `\x20` or `\u4f50...`.
4. **Term Hygiene Sweep**:
   * Zero occurrences of technique-descriptive words: `camo`, `decoy`, `Companion`, `Retention`, `typedPool`. Use neutral instrumentation terms (`auxUnit`, `entryCheck`, `Store check`, `Session check`).
5. **Comment Elimination**:
   * All shipped JS code must be 100% comment-free.

---

## 3. OTO (Obfuscation-Transformation Options) Engine Variations

We maintain seven distinct structural engine profiles. Every engine must preserve the `会員` variable and the `佐藤 結衣` marker:

| Engine Type | Library / Version | Primary Configuration & Flags | Safety Guards & Preservations |
|---|---|---|---|
| **`v1-jso-s3matrix`** | `javascript-obfuscator` ^5.6.0 | Differentiated per-shard matrix (Mangled, Hex, 5k Dictionary), CFF, Dead Code, RC4/Base64. | `reservedNames: ['^会員$', '^名$']`, `transformObjectKeys: true`, `identifiersPrefix: 'google'`, `stringArray: false` on `u`. |
| **`v2-jsc`** | `js-confuser` ^2.1.3 | Per-process child node isolation (`execFileSync`), AST mangling, calculator transforms. | `renameVariables: (name) => name !== '会員'`, post-restore Unicode escapes to raw marker `佐藤 結衣`. |
| **`v4-closure`** | Google Closure Compiler Native | `compilation_level: SIMPLE`, native Linux binary (`google-closure-compiler-linux/compiler`). | Injected camo block must be statement-prefixed with `;` past `$jscomp` prelude; post-restore `\u4f1a\u54e1` ➔ `会員`. |
| **`v5-terser`** | `terser` ^5.51.2 | `compress: { dead_code: false, unused: false }`, `mangle: { reserved: ['会員'] }`. | Preserves decoys and typed-pool arrays without dead-code elimination. |
| **`v6-esbuild`** | `esbuild` ^0.28.2 | `minifyWhitespace: true`, `minifySyntax: false` (avoids DCE), `target: 'es2020'`. | `minifyIdentifiers: false` on `shard-a` to preserve `会員`. |
| **`v7-swc`** | `@swc/core` ^1.16.2 | `compress: false`, `mangle: { reserved: ['会員'] }`. | Prevents SWC from removing unused decoy declarations. |
| **`v8-uglify`** | `uglify-js` ^3.19.3 | `compress: { dead_code: false, unused: false }`, `mangle: { reserved: ['会員'] }`. | Conservative structural transform. |

---

## 4. Stochastic Entropy Ranking & Multi-Engine Selection

To maximize reverse-engineering complexity, each shard is selected from a different OTO engine using a stochastic non-logical ranking algorithm:

### Ranking Table:
* **`shard-a`**: `v1` ➔ `v2` ➔ `v6` ➔ `v5` ➔ `v7` ➔ `v8` ➔ `v4`
* **`shard-m`**: `v1` ➔ `v2` ➔ `v6` ➔ `v4` ➔ `v7` ➔ `v5` ➔ `v8`
* **`shard-u`**: `v1` ➔ `v2` ➔ `v6` ➔ `v7` ➔ `v4` ➔ `v5` ➔ `v8`
* **`shard-n1`**: `v1` ➔ `v2` ➔ `v6` ➔ `v7` ➔ `v5` ➔ `v8` ➔ `v4`
* **`shard-e`**: `v1` ➔ `v2` ➔ `v6` ➔ `v4` ➔ `v7` ➔ `v5` ➔ `v8`
* **`shard-n2`**: `v2` ➔ `v1` ➔ `v6` ➔ `v7` ➔ `v5` ➔ `v8` ➔ `v4`
* **`shard-aux`**: `v2` ➔ `v1` ➔ `v6` ➔ `v7` ➔ `v5` ➔ `v4` ➔ `v8`

### Selection Constraints:
1. **No Adjacent Duplicates**: `comb[i] !== comb[i+1]` (at most 1 duplicate permitted strictly within the decoy/membercount group: `m, u, n1, n2, aux`).
2. **Anti-Alternation Guard**: No more than 1 two-type ping-pong alternation pair (e.g., A-B-A is allowed once; A-B-A-B is strictly rejected).
3. **High Entropy Injection**: Must utilize Rank 4 or Rank 5 options across at least 2 shards to inject structural entropy.
4. **Dictionary Core Bonus**: Shard `e` and at least one noise shard must utilize heavy dictionary obfuscation (`v1`).

---

## 5. G3 Seam Removal & Seamless Stitched Assembly

1. **Stitching Sequence**: Concatenate the selected shard outputs in exact order:
   ```bash
   python3 s4-shards/stitch-o85.py shard-a-out.js shard-m-out.js shard-u-out.js shard-n1-out.js shard-e-out.js shard-n2-out.js shard-aux-out.js /tmp/optimal-stitched-raw.js
   ```
2. **Seam Absorption**: The master bundle absorbs all intermediate `_0xmod` wrappers, nested closures, and per-shard boilerplate so that no visible seams or boundary markers remain.

---

## 6. Top-1 Whole-Bundle Re-Obfuscation (5K Dictionary)

The stitched raw bundle is fed into the Top-1 engine (**`javascript-obfuscator`**) for a whole-file maximum obfuscation pass:

* **5,000-Word Dictionary**: Load fresh, non-reused 5,000-word CSV (`s4-oto/identifiers-dictionary-5k.csv`).
* **Configuration**:
  ```javascript
  {
    compact: true,
    simplify: true,
    selfDefending: false,        // CRITICAL: Prevent timing freezes in browser/DevTools
    debugProtection: false,      // CRITICAL: Prevent infinite debugger pauses
    disableConsoleOutput: false, // CRITICAL: Allow logs and red herrings to print
    renameGlobals: false,        // CRITICAL: Preserve console.clear and outer scope
    renameProperties: false,     // CRITICAL: Preserve Discord store properties
    transformObjectKeys: true,
    identifierNamesGenerator: 'dictionary',
    identifiersDictionary: DICT_5K,
    identifiersPrefix: 'google',
    reservedNames: ['^会員$', '^名$'],
    reservedStrings: ['佐藤 結衣', 'kcolbUelgooG'],
    stringArray: false,          // CRITICAL: Keep passphrase slot and RLO reverse intact
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.40,
    deadCodeInjection: false,
    numbersToExpressions: false  // Preserve raw constants for logic stability
  }
  ```

---

## 7. Transport Compression vs. Minification (Technical Distinction)

### ⚠️ Critical Rule: NEVER Use AST-Minifiers for Compression

| Mechanism | Operating Level | Effect on Obfuscation & Decoys | Verdict |
|---|---|---|---|
| **AST Minification** (Terser / Uglify / Closure in `compress: true` mode) | **AST Syntax Tree** | **RUINS OBFUSCATION**: Strips unused variables, eliminates dead branches, folds constant calculations, collapses zero-width decoys. | **BANNED** |
| **Transport Compression** (`gzip` / `deflate-raw` via `zlib`) | **Lossless Byte Stream** (LZ77 + Huffman) | **100% PRESERVES OBFUSCATION**: Operates purely on raw bytes. Every zero-width character, dead branch, and mangled token is reconstructed byte-for-byte in memory. | **MANDATORY** |

---

## 8. Searchable Configuration Header on Compressed Deliverables

Because the payload is compressed into base64, a clean, un-obfuscated header is prepended to Line 1 of `O8.5-S4-compressed-gzip.js` and `O8.5-S4-compressed-deflateraw.js`:

```javascript
var 会員 = 2; var 名 = "佐藤 結衣"; console.clear();
(async () => {
  const _b = "<BASE64_GZIP_PAYLOAD>";
  const _u = Uint8Array.from(atob(_b), c => c.charCodeAt(0));
  const _d = new DecompressionStream("gzip");
  const _w = _d.writable.getWriter();
  _w.write(_u);
  _w.close();
  const _r = _d.readable.getReader();
  const _c = [];
  while (true) {
    const { done, value } = await _r.read();
    if (done) break;
    _c.push(value);
  }
  let _l = 0;
  for (const x of _c) _l += x.length;
  const _a = new Uint8Array(_l);
  let _p = 0;
  for (const x of _c) { _a.set(x, _p); _p += x.length; }
  let _s = new TextDecoder().decode(_a);

  // Dynamic In-Memory Configuration Injection
  if (typeof 会員 !== "undefined") {
    _s = _s.replace(/会員\s*=\s*(0x2|2|1|0)/, "会員=" + 会員);
  }
  if (typeof 名 !== "undefined" && 名 !== "佐藤 結衣") {
    _s = _s.replace("佐藤 結衣", 名);
  }
  (0, eval)(_s);
})();
```

* **Searchable `名`**: Replacing `"佐藤 結衣"` on Line 1 injects the passphrase into memory without needing manual decompression.
* **Searchable `会員`**: Changing `会員 = 2` to `0` enables Stealth Mode while keeping MemberCount red herrings active.
* **Obfuscated Loader Body**: The loader wrapper itself is obfuscated with the 5k dictionary.

---

## 9. Comprehensive 16-Point Logic & Stress Test Suite

Every deliverable build must pass all 16 verification tests:

```
[PASS] Logic:LogLevel :: Level 2 (Diagnostic Mode) — 6 [O8-DIAG] queues flushed
[PASS] Logic:LogLevel :: Level 1 (Operational Mode) — [O8-DIAG] count = 0, quest notices active
[PASS] Logic:LogLevel :: Level 0 (Stealth Mode) — [Quest]/[O8-DIAG] = 0, MemberCount red herrings active
[PASS] Logic:Unlock :: Valid Passphrase Unlock — Digest match & session check complete
[PASS] Logic:Unlock :: Placeholder Passphrase Fail-Open — Stderr reject line + clean no-throw
[PASS] Logic:Unlock :: Arbitrary Invalid Passphrase Fail-Open — Clean fail-open execution
[PASS] Logic:Unlock :: RLO-Reversed Unlock Property — window["GoogleUblock"] callable
[PASS] Stress:Stability :: 50x High-Frequency Boot Battery — 50/50 clean runs (avg ~2.8s/boot)
[PASS] Stress:Guards :: Duplicate Console Paste Guard — Ran twice in same global scope without freeze
[PASS] Stress:Memory :: Heap Memory Allocation — Net delta < 25MB (measured ~3.8MB)
[PASS] Stress:Compression :: Deflate-Raw Loader Execution — Inflates and boots byte-exact
[PASS] Stress:Compression :: Gzip Loader Execution — Inflates and boots byte-exact
[PASS] Hygiene:Audit :: Marker Contiguity (佐藤 結衣) — Exact count = 1
[PASS] Hygiene:Audit :: Log Level Variable (会員) — Plaintext preserved
[PASS] Hygiene:Audit :: GoogleUnlock Literal Elimination — Count = 0
[PASS] Hygiene:Audit :: Forbidden Term Elimination — Zero technique leaks
```

---

## 10. Checklist for Future Feature Additions (e.g. S5)

When adding a new feature or store interface:
1. **Implement on clean shards** in `s4-shards/shards/` (ensure `const` ➔ `let` rule is respected).
2. **Update dictionary files** (generate fresh 5k dictionary to prevent token reuse).
3. **Run OTO variations** (`obf-v1-s3matrix.js`, `obf-v2-jsc.js`, `obf-minify-family.js`, `obf-u-canon.js`).
4. **Execute stochastic entropy ranking script** to select the 7-shard mix.
5. **Stitch with `stitch-o85.py`** to absorb seams.
6. **Apply Top-1 5K whole-bundle obfuscation**.
7. **Generate Gzip & Deflate-raw compressed loaders** with Line 1 `会員` & `名` headers.
8. **Run the 16-Point automated test battery** (`run-full-logic-stress-battery.js`).
9. **Pin hashes in `SHA256SUMS.txt` and update `HANDOFF.md`**.
