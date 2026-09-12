const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const JS = require("/home/user/o8cmp/seamless/jso/node_modules/javascript-obfuscator");
const { execFileSync } = require("child_process");

console.log("=== Building O8.6-Final / S5 Deliverables ===");

const OTO_ROOT = "/home/user/o8cmp/O8.6/oto";
const PKG_DIR = "/home/user/o8cmp/O8.6/final-package";
const SHARDS_DIR = path.join(PKG_DIR, "selected-shards");
fs.mkdirSync(SHARDS_DIR, { recursive: true });

// 1. Copy selected shards
const selection = [
  { tag: "a", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-a-out.js"), out: "shard-a-v1.js" },
  { tag: "m", file: path.join(OTO_ROOT, "v2-jsc/shard-m-out.js"), out: "shard-m-v2.js" },
  { tag: "u", file: path.join(OTO_ROOT, "u/shard-u-out.js"), out: "shard-u-v4.js" },
  { tag: "n1", file: path.join(OTO_ROOT, "v6-esbuild/shard-n1-out.js"), out: "shard-n1-v6.js" },
  { tag: "e", file: path.join(OTO_ROOT, "v1-jso-s3matrix/shard-e-out.js"), out: "shard-e-v1.js" },
  { tag: "n2", file: path.join(OTO_ROOT, "v7-swc/shard-n2-out.js"), out: "shard-n2-v7.js" },
  { tag: "aux", file: path.join(OTO_ROOT, "v5-terser/shard-aux-out.js"), out: "shard-aux-v5.js" },
];

for (const s of selection) {
  const content = fs.readFileSync(s.file, "utf8");
  fs.writeFileSync(path.join(SHARDS_DIR, s.out), content);
  console.log(`[Copied] ${s.out} (${(content.length / 1024).toFixed(1)} KB)`);
}

// 2. Stitch shards
const stitchedRawPath = "/tmp/stitched-raw.js";
const shardPaths = selection.map(s => path.join(SHARDS_DIR, s.out));
execFileSync("python3", ["/home/user/o8cmp/s4-shards/stitch-o85.py", ...shardPaths, stitchedRawPath]);
const rawStitched = fs.readFileSync(stitchedRawPath, "utf8");
console.log(`[Stitched] Raw bundle size: ${(rawStitched.length / 1024).toFixed(1)} KB`);

// 3. Obfuscate master bundle with 5k Dictionary 2
const DICT_5K_BUNDLE = fs.readFileSync(path.join(OTO_ROOT, "identifiers-dictionary-5k.csv"), "utf8")
  .split(",").map(s => s.trim()).filter(Boolean);

console.log(`[Obfuscating Bundle] Using 5k dictionary (${DICT_5K_BUNDLE.length} words)...`);
const t0 = Date.now();
const bundleObfResult = JS.obfuscate(rawStitched, {
  compact: true,
  simplify: true,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  renameGlobals: false,
  renameProperties: false,
  transformObjectKeys: true,
  identifierNamesGenerator: "dictionary",
  identifiersDictionary: DICT_5K_BUNDLE,
  identifiersPrefix: "google",
  reservedNames: ["^会員$", "^名$"],
  reservedStrings: ["佐藤 結衣", "kcolbUelgooG"],
  stringArray: false,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.25,
  deadCodeInjection: false,
  numbersToExpressions: false
}).getObfuscatedCode();

const finalBundlePath = path.join(PKG_DIR, "O8.6-Final-final-bundle.js");
fs.writeFileSync(finalBundlePath, bundleObfResult);
console.log(`[Final Bundle] Written to ${finalBundlePath} (${(bundleObfResult.length / 1024).toFixed(1)} KB in ${((Date.now() - t0)/1000).toFixed(1)}s)`);

// 4. Transport Compression
const gzipBuffer = zlib.gzipSync(Buffer.from(bundleObfResult, "utf8"), { level: 9 });
const deflateRawBuffer = zlib.deflateRawSync(Buffer.from(bundleObfResult, "utf8"), { level: 9 });
const gzipB64 = gzipBuffer.toString("base64");
const deflateRawB64 = deflateRawBuffer.toString("base64");

console.log(`[Compressed] Gzip: ${(gzipB64.length / 1024).toFixed(1)} KB base64 | DeflateRaw: ${(deflateRawB64.length / 1024).toFixed(1)} KB base64`);

// 5. Build Outer Runners with 5k Dictionary 3
const DICT_5K_RUNNER = fs.readFileSync(path.join(OTO_ROOT, "identifiers-dictionary-runner-5k.csv"), "utf8")
  .split(",").map(s => s.trim()).filter(Boolean);

function buildRunner(b64, format) {
  const innerLoader = `(async () => {
  const _b = "${b64}";
  const _u = Uint8Array.from(atob(_b), c => c.charCodeAt(0));
  const _d = new DecompressionStream("${format}");
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
  if (typeof 会員 !== "undefined") {
    _s = _s.replace(/会員\\s*=\\s*(0x2|2|1|0)/, "会員=" + 会員);
  }
  if (typeof 名 !== "undefined" && 名 !== "佐藤 結衣") {
    _s = _s.replace("佐藤 結衣", 名);
  }
  (0, eval)(_s);
})();`;

  const obfLoader = JS.obfuscate(innerLoader, {
    compact: true,
    simplify: true,
    selfDefending: false,
    debugProtection: false,
    disableConsoleOutput: false,
    renameGlobals: false,
    renameProperties: false,
    transformObjectKeys: true,
    identifierNamesGenerator: "dictionary",
    identifiersDictionary: DICT_5K_RUNNER,
    identifiersPrefix: "google",
    reservedNames: ["^会員$", "^名$"],
    reservedStrings: ["佐藤 結衣", format],
    stringArray: false,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    numbersToExpressions: false
  }).getObfuscatedCode();

  return `var 会員 = 2; var 名 = "佐藤 結衣"; console.clear(); ` + obfLoader;
}

const gzipRunner = buildRunner(gzipB64, "gzip");
const deflateRawRunner = buildRunner(deflateRawB64, "deflate-raw");

fs.writeFileSync(path.join(PKG_DIR, "O8.6-Final-compressed-gzip.js"), gzipRunner);
fs.writeFileSync(path.join(PKG_DIR, "O8.6-Final-compressed-deflateraw.js"), deflateRawRunner);

console.log(`[Deliverable] O8.6-Final-compressed-gzip.js: ${(gzipRunner.length / 1024).toFixed(1)} KB`);
console.log(`[Deliverable] O8.6-Final-compressed-deflateraw.js: ${(deflateRawRunner.length / 1024).toFixed(1)} KB`);

// 6. Update SHA256SUMS.txt
const crypto = require("crypto");
const files = [
  "O8.6-Final-compressed-gzip.js",
  "O8.6-Final-compressed-deflateraw.js",
  "O8.6-Final-final-bundle.js"
];
const sums = [];
for (const f of files) {
  const buf = fs.readFileSync(path.join(PKG_DIR, f));
  const hash = crypto.createHash("sha256").update(buf).digest("hex");
  sums.push(`${hash}  ${f}`);
  console.log(`SHA256 (${f}): ${hash}`);
}
fs.writeFileSync(path.join(PKG_DIR, "SHA256SUMS.txt"), sums.join("\n") + "\n");
console.log("=== Build Finished Successfully ===");
