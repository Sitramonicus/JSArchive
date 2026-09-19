# O8.14 context map

This file explains how historical layouts informed the cleanup without importing their staging trees into the active line.

## Reference lines

| historical line | useful layout lesson | O8.14 decision |
|---|---|---|
| `@~8.10` | Separates `Active`, `Archives`, `Docs`, `Handoff`, `Uploads`, and `Working-Stable`; older era material is not mixed with the live line. | Keep active O8.14 source small and point to explicit context/archives rather than copying old era trees. |
| `@~8.12` | Adds explicit `_ARCHIVE-TRIM`, `_COMPRESSED-HISTORY`, and tools conventions; historical material remains extractable and indexed. | Use `8.14-SF/archives/` plus manifests and a context map. Do not rehydrate old packages raw. |
| `@~8.13` | Establishes the `8.13-SF` pattern, a self-identifying frozen release, and a cold-start handoff. | Use the same discoverable staging idea at `@~8.14/8.14-SF`, but classify O8.13 generated output and retired tools instead of copying the old staging folder. |

The historical pages consulted were the GitHub trees for `@~8.10`, `@~8.12`, and `@~8.13`, plus the local `Handoff/DIR-MAP-@~8.10-@~8.12.md` before it was preserved in `archives/handoff-history-through-2026-09-19.tar.gz`.

## Active versus context-only

**Active O8.14:** `Active/O8.14/O8.14-FAC-CC-PLAN.md`.  
**Retained baseline source:** the O8.13 source shards, build scripts, dictionaries, and current stego-12/r2 source that are still useful for the regression or for measured O8.14 work.  
**Immutable baseline:** `Working-Stable/O8.13/`, `Archives/packages/O8.13/`, and `Archives/packages/O8.13-r3/`.  
**Context-only:** generated OTO outputs, the old O8.13 `final-package/`, old candidate package, superseded plans, old Uploads, old stego tools, and trace exports.

The distinction is deliberate: a file can be historically important without being an active build input. The archive manifests make restoration possible; the active path should not make a future agent guess which of several similarly named generated files is current.

## O8.13-r3 invariant

The cleanup must not alter the frozen release or its verification evidence. The release is still identified by the self-hashing Working-Stable files:

- runner `O8.13-runner-d4de42af.js`, SHA-256 prefix `d4de42af`;
- bundle `O8.13-bundle-604f4434.js`, SHA-256 prefix `604f4434`;
- cover `O8.13-cover-3bbe7345.bmp`, SHA-256 prefix `3bbe7345`;
- release manifests in both `Working-Stable/O8.13/` and `Archives/packages/O8.13/`.

## O8.14 terminology correction

FaC means **Feature and Change**; CC means **Compiled Change**. CC-01 / O8.14-B0 is the baseline-instrumentation change set, not an additional VM. VM-S is the one planned custom shard/core VM. FaC-10 is a bounded parser/codec, not a second VM. The current plan is the authority.
