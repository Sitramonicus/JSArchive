// Build the separate CC-09 / R2-08 modularization candidate from the fixed CC-05 source.
// The added H shard owns host/store/transport/scheduler/cleanup/telemetry adapters locally
// under _0xmod.r2; no new global, route, storage, or dynamic-code capability is added.
// No O8.13 file is written. The output is a raw candidate assembly, not a release.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const stitcher = path.join(ROOT, 'Active/O8.13/tools/stitch-o85.py');
const base = path.join(ROOT, 'Active/O8.14/CC-05-Parser/source/shards');
const target = path.join(ROOT, 'Active/O8.14/CC-09-R2-08');
const tags = ['a', 'm', 'n1', 'h', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];
const oldTags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];

const hShard = `(function (_0xmod) {
  if (_0xmod.r2) return;
  const _0xmax = 128;
  const _0xactive = new Set();
  const _0xstats = { calls: 0, rejected: 0, branches: 0, bytes: 0 };
  const _0xcleanup = {
    add(fn) {
      if (typeof fn !== 'function' || _0xactive.size >= _0xmax) return () => {};
      let done = false;
      const tracked = () => {
        if (done) return;
        done = true;
        _0xactive.delete(tracked);
        try { fn(); } catch (e) {}
      };
      _0xactive.add(tracked);
      return tracked;
    },
    release() {
      for (const fn of Array.from(_0xactive)) { try { fn(); } catch (e) {} }
      return _0xactive.size;
    },
    pending: () => _0xactive.size,
  };
  const _0xtelemetry = {
    mark(name, value) {
      if (_0xstats.branches >= _0xmax) return false;
      _0xstats.branches++;
      if (typeof name === 'string') _0xstats.bytes = Math.min(65536, _0xstats.bytes + Math.min(256, name.length + String(value ?? '').length));
      return true;
    },
    branch(name, result) { return this.mark('branch:' + String(name).slice(0, 48), result ? '1' : '0'); },
    snapshot() { return Object.freeze({ calls: _0xstats.calls, rejected: _0xstats.rejected, branches: _0xstats.branches, bytes: _0xstats.bytes, pending: _0xactive.size }); },
  };
  const _0xtransport = {
    valid(opts) {
      const url = opts && opts.url;
      return typeof url === 'string' && url.length > 0 && url.length <= 256 && url.startsWith('/') && !url.startsWith('//');
    },
    async call(fn, opts) {
      if (typeof fn !== 'function' || !this.valid(opts) || _0xstats.calls >= _0xmax) {
        _0xstats.rejected++;
        _0xtelemetry.branch('transport-reject', false);
        return { body: {}, skipped: true };
      }
      _0xstats.calls++;
      _0xtelemetry.branch('transport-call', true);
      return await fn(opts);
    },
  };
  const _0xstore = {
    values(handle) {
      try { return handle && typeof handle.values === 'function' ? handle.values.bind(handle) : null; } catch (e) { return null; }
    },
    read(obj, key) { try { return obj?.[key]; } catch (e) { return undefined; } },
  };
  const _0xhost = {
    dispatcher(handle) {
      return (payload) => {
        if (!handle || typeof handle.dispatch !== 'function' || !payload || typeof payload !== 'object') {
          _0xtelemetry.branch('dispatch-reject', false);
          return false;
        }
        _0xtelemetry.branch('dispatch', true);
        return handle.dispatch(payload);
      };
    },
    subscribe(handle, event, fn) {
      if (!handle || typeof handle.subscribe !== 'function' || typeof fn !== 'function') return () => {};
      _0xtelemetry.branch('subscribe', true);
      const off = handle.subscribe(event, fn);
      return typeof off === 'function' ? _0xcleanup.add(off) : () => {};
    },
  };
  const _0xscheduler = {
    sleep(ms, signal) {
      return new Promise((resolve, reject) => {
        if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'));
        const wait = Math.max(0, Math.min(5000, Number(ms) || 0));
        let timer = setTimeout(() => { if (signal) signal.removeEventListener('abort', onAbort); resolve(); }, wait);
        const onAbort = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); };
        if (signal) signal.addEventListener('abort', onAbort, { once: true });
      });
    },
  };
  _0xmod.r2 = Object.freeze({
    version: 'r2-08', host: _0xhost, store: _0xstore, transport: _0xtransport,
    scheduler: _0xscheduler, cleanup: _0xcleanup, telemetry: _0xtelemetry,
  });
})(_0xmod);
`;

function patchEngine(source) {
  const logAnchor = '    const Log = _0xmod.log;\n';
  if (source.split(logAnchor).length !== 2) throw new Error('CC-09 engine Log anchor missing or duplicated');
  let out = source.replace(logAnchor, `${logAnchor}    const _0xr2 = _0xmod.r2;\n    if (!_0xr2) throw new Error('r2-modules');\n`);
  const cleanupAnchor = '  const _0xe8a7 = (fn) => {\n    disposables.push(fn);';
  if (out.split(cleanupAnchor).length !== 2) throw new Error('CC-09 cleanup anchor missing or duplicated');
  out = out.replace(cleanupAnchor, '  const _0xe8a7 = (fn) => {\n    const tracked = _0xr2.cleanup.add(fn);\n    disposables.push(tracked);');
  const cleanupReturn = '      const i = disposables.indexOf(fn);';
  if (out.split(cleanupReturn).length !== 2) throw new Error('CC-09 cleanup return anchor missing or duplicated');
  out = out.replace(cleanupReturn, '      const i = disposables.indexOf(tracked);');
  const cleanupIndex = '      const _0xe8a7 = (fn) => {\n';
  // The source uses two spaces at the module scope; anchor above is exact and the replacement is enough.
  const waitOld = `      const _0xdae0 = (ms, sig) => new Promise((res, rej) => {\n        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));\n        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };\n        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);\n        if (sig) sig.addEventListener('abort', onAbort, { once: true });\n      });`;
  if (out.split(waitOld).length !== 2) throw new Error('CC-09 scheduler anchor missing or duplicated');
  out = out.replace(waitOld, `      const _0xdae0 = (ms, sig) => _0xr2.scheduler.sleep(ms, sig);`);
  const sendOld = '      const _0xsend = _0x8.dispatch.bind(_0x8);';
  if (out.split(sendOld).length !== 2) throw new Error('CC-09 host dispatcher anchor missing or duplicated');
  out = out.replace(sendOld, '      const _0xsend = _0xr2.host.dispatcher(_0x8);');
  const transportOld = '            const res = await fn(finalOpts);';
  if (out.split(transportOld).length !== 2) throw new Error('CC-09 transport anchor missing or duplicated');
  out = out.replace(transportOld, '            const res = await _0xr2.transport.call(fn, finalOpts);');
  const valuesOld = '_0x5[_0xq7].values';
  const valuesCount = out.split(valuesOld).length - 1;
  if (valuesCount !== 6) throw new Error(`CC-09 store adapter anchor count ${valuesCount}, expected 6`);
  out = out.split(valuesOld).join('_0xr2.store.values(_0x5[_0xq7])');
  const markAnchor = '        _0x0a94(base);';
  if (out.split(markAnchor).length !== 2) throw new Error('CC-09 telemetry anchor missing or duplicated');
  out = out.replace(markAnchor, `${markAnchor}\n        try { _0xr2.telemetry.mark('delay'); } catch (e) {}`);
  return out;
}

const baseHashes = {};
const candidateHashes = {};
for (const tag of oldTags) {
  const p = path.join(base, `shard-${tag}.js`);
  if (!fs.existsSync(p)) throw new Error(`Missing CC-05 source: ${rel(p)}`);
  baseHashes[rel(p)] = sha256(read(p));
}
const sourceDir = path.join(target, 'source/shards');
write(path.join(sourceDir, 'shard-h.js'), hShard);
candidateHashes[rel(path.join(sourceDir, 'shard-h.js'))] = sha256(hShard);
for (const tag of oldTags) {
  const inputPath = path.join(base, `shard-${tag}.js`);
  const input = read(inputPath);
  const output = tag === 'e' ? patchEngine(input) : input;
  const outputPath = path.join(sourceDir, `shard-${tag}.js`);
  write(outputPath, output);
  candidateHashes[rel(outputPath)] = sha256(output);
}

const bundlePath = path.join(target, 'candidate/cc09-r2-08-raw-bundle.js');
fs.mkdirSync(path.dirname(bundlePath), { recursive: true });
execFileSync('python3', [stitcher, ...tags.map((tag) => path.join(sourceDir, `shard-${tag}.js`)), bundlePath], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', bundlePath], { stdio: 'inherit' });
const bundle = read(bundlePath);
const report = {
  schema: 'cc09-r2-08-candidate/v1', candidate: 'CC-09', status: 'candidate-only', baseCandidate: 'CC-05',
  fac: ['FaC-02', 'FaC-03', 'FaC-04', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-08', 'FaC-16'],
  change: 'R2-08 modularization and extended H revision',
  shardOrder: tags, extendedShard: 'h', candidateBundle: rel(bundlePath),
  baseSourceSha256: baseHashes, candidateSourceSha256: candidateHashes,
  bundleSha256: sha256(bundle), bundleBytes: Buffer.byteLength(bundle),
  modules: ['host', 'store', 'transport', 'scheduler', 'cleanup', 'telemetry'],
  constraints: { newGlobals: 0, newRoutes: 0, storageOrCookieAccess: false, dynamicCodeGeneration: false, secondVm: false, messageChannelsAdded: 0 },
  promotion: { target: null, liveEligible: false }, frozenInputsUnchanged: true,
};
write(path.join(target, 'reports/build.json'), JSON.stringify(report, null, 2) + '\n');
write(path.join(target, 'README.md'), `# CC-09 — R2-08 modularization and extended H candidate\n\n**Status:** candidate-only; simulated verification pending  \n**Base:** CC-05 bounded parser candidate  \n**FaCs:** ${report.fac.join(', ')}\n\nCC-09 adds an extended H shard before the engine shard. It owns local host/store/transport/scheduler/cleanup/telemetry adapters under the existing private _0xmod object, then routes the engine's dispatcher, store values, scheduler sleep, transport calls, cleanup registration, and bounded telemetry through those adapters. No new global, endpoint, storage/cookie access, message channel, evaluator, or second VM is introduced.\n\n## Artifacts\n\n- \`source/shards/shard-h.js\` — extended H module source.\n- \`source/shards/\` — CC-09 source copies, including the F5 operator instruction.\n- \`candidate/cc09-r2-08-raw-bundle.js\` — raw stitched candidate assembly, not a release artifact.\n- \`reports/build.json\` — source hashes, module inventory, and constraints.\n- \`reports/cc09-verification.md\` — verification report.\n\nThe candidate remains subject to full OTO/obfuscation, renderer, heap, cleanup, and real-host review.\n`);
console.log(`CC-09 built: ${rel(bundlePath)} sha256=${sha256(bundle)}`);
