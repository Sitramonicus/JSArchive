// test-var.mjs — top-level boot harness for a stitched quest artifact.
// Usage: node test-var.mjs <stitched.js>
// Boots the shim, then imports the artifact as a TOP-LEVEL module (client-console
// semantics: module-level let/const, no wrapping eval) and reports whether it threw.
// Waits briefly so async IIFEs (unlock / companion / boot) can log, then exits.
import './discordlike.mjs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const target = process.argv[2];
if (!target) { console.log('usage: node test-var.mjs <stitched.js>'); process.exit(2); }
try {
  await import(pathToFileURL(resolve(target)).href);
  console.log('TOP-LEVEL: module ran (no throw)');
} catch (e) {
  console.log('TOP-LEVEL THROW:', (e && e.stack) || e);
}
await new Promise((r) => setTimeout(r, 2500));
process.exit(0);
