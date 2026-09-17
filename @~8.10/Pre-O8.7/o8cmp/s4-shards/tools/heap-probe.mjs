#!/usr/bin/env node
// heap-probe.mjs — C5 validation metric (phase 1): boot a stitched artifact in a
// Discord-like shim, force GC, write a V8 heap snapshot, then run the scanner
// (tools/heap-scan.mjs, a SEPARATE file the probe process never loads, so its needle
// literals cannot contaminate the snapshot).
//
// Usage: node --expose-gc tools/heap-probe.mjs <artifact.js> [snapshot-path]
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const target = process.argv[2];
const out = process.argv[3] || '/tmp/s4-heap.heapsnapshot';
if (!target) { console.log('usage: node --expose-gc tools/heap-probe.mjs <artifact.js> [snapshot]'); process.exit(2); }

await import('../../tools/harness/discordlike.mjs');
await import(pathToFileURL(resolve(target)).href);
await new Promise(r => setTimeout(r, 2500));
const gc = globalThis.gc || (() => {});
gc(); await new Promise(r => setTimeout(r, 250));
gc();
const v8 = await import('node:v8');
v8.writeHeapSnapshot(out);
console.log('phase 1: snapshot written ->', out);
const scan = resolve(fileURLToPath(import.meta.url), '..', 'heap-scan.mjs');
execFileSync(process.execPath, [scan, out], { stdio: 'inherit' });
