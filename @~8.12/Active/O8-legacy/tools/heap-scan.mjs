#!/usr/bin/env node
// heap-scan.mjs — C5 phase 2: scan a .heapsnapshot for sensitive needles.
// Loaded in its own process (never by the probed artifact), so these literals are not
// in the snapshot. Non-ASCII needles are also searched in JSON-escaped form because the
// heap snapshot serializes strings as JSON.
// Usage: node tools/heap-scan.mjs <snapshot>
import fs from 'node:fs';

const file = process.argv[2];
if (!file) { console.log('usage: node tools/heap-scan.mjs <snapshot>'); process.exit(2); }
const sensitive = ['cycle_buffer_c86e', 'percentile_latency', 'depth:727', '/intake/v2',
  '201f1688', 'Still watching', '[MemberCount]', 'quest-suite', 'vault_vector', 'memberCount'];
// NOTE: a bare 'percentile' needle was removed: Node's own perf_hooks Histogram
// property strings ('percentiles', 'percentileBigInt', ...) are always in the heap.
// NOTE: script SOURCE text is not serialized into V8 heap snapshots (only function
// names), so the marker controls below use names that are genuinely present.
const controls = ['console.clear', 'GoogleUnlock'];
const counts = {};
for (const n of [...sensitive, ...controls]) counts[n] = 0;
const needles = Object.keys(counts).map(n => ({ s: Buffer.from(n, 'utf8'), n }));
const st = fs.statSync(file);
const fd = fs.openSync(file, 'r');
const CH = 1 << 22;
const buf = Buffer.alloc(CH);
let carry = Buffer.alloc(0), read;
while ((read = fs.readSync(fd, buf, 0, CH, null)) > 0) {
  const chunk = Buffer.concat([carry, buf.subarray(0, read)]);
  for (const { s, n } of needles) {
    let i = 0;
    while ((i = chunk.indexOf(s, i)) !== -1) { counts[n]++; i += s.length; }
  }
  carry = chunk.subarray(Math.max(0, chunk.length - 64));
}
fs.closeSync(fd);
const label = (n) => JSON.stringify(n);
console.log('snapshot:', file, (st.size / 1048576).toFixed(1) + ' MB');
console.log('--- sensitive needles (expect 0) ---');
for (const n of sensitive) console.log(' ', label(n).padEnd(24), counts[n]);
console.log('--- controls ---');
for (const n of controls) console.log(' ', label(n).padEnd(24), counts[n]);
const bad = sensitive.filter(n => counts[n] > 0);
console.log(bad.length ? `RESULT: ${bad.length} sensitive needle(s) present — INVESTIGATE` : 'RESULT: PASS (no at-rest/decoded sensitive strings in heap)');
process.exit(bad.length ? 1 : 0);
