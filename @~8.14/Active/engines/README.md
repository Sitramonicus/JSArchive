# Active/engines — obfuscator/minifier engine install

All build scripts (`Active/O8.6/oto/scripts/*`, `Active/Stego/*.js`) resolve
their engines from `<repo>/Active/engines/node_modules/`, falling back to
`NODE_PATH` / global installs. **`node_modules/` is not committed**
(see root `.gitignore`) — install it once per machine:

```sh
cd Active/engines && npm install
```

## What uses what

| engine | used by |
|---|---|
| `javascript-obfuscator` | obf-v1, obf-u-canon, build-s4-final-package, build-entangled-stego |
| `js-confuser` | obf-v2, obf-u-per-type |
| `terser` | obf-minify-family (v5), build-entangled-stego (minify step) |
| `esbuild` | obf-minify-family (v6) |
| `@swc/core` | obf-minify-family (v7) |
| `uglify-js` | obf-minify-family (v8) |
| `google-closure-compiler-linux` | obf-minify-family (v4, native `compiler` binary) |

The validation batteries (`run-*-battery.mjs`, `run-16point-verification.mjs`)
need **no engines** — plain node only.

## Notes

- `orig-manifests/` holds the three original per-directory manifests
  (`engines-`, `jsc-`, `jso-` `package.json` + lockfiles) pre-reorg; they are
  provenance only. `package.json` here is their exact dependency union.
- `zw-suffix.js` needs `@babel/parser`, `@babel/traverse`, `@babel/generator`;
  these normally arrive transitively via `js-confuser` (run with
  `NODE_PATH=<repo>/Active/engines/node_modules`). If hoisting ever hides
  them, `npm i -D @babel/parser @babel/traverse @babel/generator` here.
- `js-confuser` is NOT seedable — its outputs differ every run. Pin result
  hashes after any regeneration run.
