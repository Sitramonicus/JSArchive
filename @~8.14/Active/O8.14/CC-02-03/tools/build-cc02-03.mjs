// CC-02+03 candidate builder.
// Reads O8.13 source as a frozen reference and writes only Active/O8.14/CC-02-03.
// This is a raw candidate assembly, not a promoted or obfuscated release build.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CC = path.resolve(HERE, '..');
const ROOT = path.resolve(HERE, '..', '..', '..', '..');
const rel = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const read = (p) => fs.readFileSync(p, 'utf8');
const write = (p, value) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, value); };

const sourceRoot = path.join(ROOT, 'Active/O8.13/shards');
const candidateRoot = path.join(CC, 'source/shards');
const candidateBundle = path.join(CC, 'candidate/cc02-03-raw-bundle.js');
const reportPath = path.join(CC, 'reports/build.json');
const stitcher = path.join(ROOT, 'Active/O8.13/tools/stitch-o85.py');
const tags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];

const baselinePaths = tags.map((tag) => path.join(sourceRoot, `shard-${tag}.js`));
for (const p of [...baselinePaths, stitcher]) {
  if (!fs.existsSync(p)) throw new Error(`Missing input: ${rel(p)}`);
}
const baselineHashes = Object.fromEntries(baselinePaths.map((p) => [rel(p), sha256(fs.readFileSync(p))]));

const labelMap = new Map([
  ['Host core — uniform phrase pools, log-lock, studio gaps, refill queue, metamorphic decode.', 'core-ready'],
  ['Worker buffer cleanup', 'phase-cleanup'],
  ['Worker channel dispatch', 'phase-dispatch'],
  ['Worker stream cleanup', 'phase-cleanup'],
  ['Worker stream dispatch', 'phase-dispatch'],
  ['Store timing profile', 'phase-store'],
  ['Queue refill evaluation', 'phase-queue'],
  ['Completion verified', 'phase-done'],
]);

const boundedLog = `  const Log = (() => {
    const noop = () => {};
    const _0xq = [];
    const _0xmaxEvents = 256;
    const _0xmaxBytes = 65536;
    let _0xevents = 0, _0xbytes = 0, _0xdropped = 0, _0xcapNoted = false;
    const _0xemit = (method, parts) => {
      try {
        const text = parts.map(x => String(x)).join(' ').slice(0, 300);
        const cost = Math.min(4096, text.length * 2);
        if (_0xevents >= _0xmaxEvents || _0xbytes + cost > _0xmaxBytes) {
          _0xdropped++;
          if (!_0xcapNoted) {
            _0xcapNoted = true;
            try { console.warn('[DIAG-CAP] bounded diagnostic sink active'); } catch (e) {}
          }
          return false;
        }
        _0xevents++;
        _0xbytes += cost;
        const fn = typeof console !== 'undefined' && typeof console[method] === 'function' ? console[method] : console.debug;
        fn.call(console, text);
        return true;
      } catch (e) { return false; }
    };
    const _0xdm = (m, d) => {
      if (会員 >= 2 && _0xopen) {
        let detail = '';
        try { detail = d === undefined ? '' : JSON.stringify(d).slice(0, 400); } catch (e) { detail = '[unserializable]'; }
        _0xemit('debug', ['[SYS-DIAG]', m, detail]);
      }
    };
    if (会員 === 0) return { say: noop, diag: noop, warn: noop, info: noop, queue: noop, flush: noop, stats: () => ({ events: 0, bytes: 0, dropped: 0 }) };
    return {
      say: (c, m) => { _0xemit('debug', (会員 >= 2 && _0xopen) ? ['[G:' + String(c).slice(0, 8) + ']', m] : [m]); },
      diag: _0xdm,
      warn: (m) => { _0xemit('warn', [m]); },
      info: (m) => { _0xemit('debug', [m]); },
      queue: (m, d) => { if (_0xq.length < 64) _0xq.push([m, d]); },
      flush: () => { while (_0xq.length) { const _0xi = _0xq.shift(); _0xdm(_0xi[0], _0xi[1]); } },
      stats: () => ({ events: _0xevents, bytes: _0xbytes, dropped: _0xdropped }),
    };
  })();`;

function patchShardA(source) {
  const start = source.indexOf('  const Log = (() => {');
  if (start < 0) throw new Error('shard-a Log block anchor missing');
  const endMarker = '\n  })();';
  const end = source.indexOf(endMarker, start);
  if (end < 0) throw new Error('shard-a Log block end missing');
  let out = source.slice(0, start) + boundedLog + source.slice(end + endMarker.length);
  for (const [from, to] of labelMap) out = out.split(from).join(to);
  return out;
}

const activityAdapter = `      const _0xprimaryActivity = (() => {
        let active = null;
        const begin = async (record) => {
          let spins = 0;
          while (active !== null && !signal.aborted && !_0xkill && spins++ < 5000) await GoogleDelay(1);
          if (active !== null || signal.aborted || _0xkill) return false;
          active = record;
          try {
            _0xsend({ type: _0xe0, removed: [], added: [record], games: [record] });
            return true;
          } catch (e) {
            active = null;
            throw e;
          }
        };
        const end = (record) => {
          if (active !== record) return;
          try { _0xsend({ type: _0xe0, removed: [record], added: [], games: [] }); }
          finally { active = null; }
        };
        return { begin, end, active: () => active !== null };
      })();
`;

function patchShardE(source) {
  const sendAnchor = `      const _0xoff = _0x8.unsubscribe.bind(_0x8);\n`;
  if (source.split(sendAnchor).length !== 2) throw new Error('shard-e dispatcher anchor is not unique');
  let out = source.replace(sendAnchor, sendAnchor + activityAdapter);
  const playRecord = '              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;\n';
  if (out.split(playRecord).length !== 2) throw new Error('shard-e play record anchor is not unique');
  out = out.replace(playRecord, '              let _0x23 = [_0x21]; let _0xactivityStarted = false; let undo1 = null, undo2 = null;\n');
  const oldDispatch = `try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); }`;
  if (out.split(oldDispatch).length !== 2) throw new Error('shard-e play dispatch anchor is not unique');
  out = out.replace(oldDispatch, 'try { _0xactivityStarted = await _0xprimaryActivity.begin(_0x21); if (!_0xactivityStarted) throw new Error("activity-busy"); }');
  const oldCleanup = `try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {}`;
  if (out.split(oldCleanup).length !== 2) throw new Error('shard-e play cleanup anchor is not unique');
  out = out.replace(oldCleanup, 'if (_0xactivityStarted) { try { _0xprimaryActivity.end(_0x21); } catch (e) {} _0xactivityStarted = false; }');
  for (const [from, to] of labelMap) out = out.split(from).join(to);
  return out;
}

const candidateHashes = {};
for (const tag of tags) {
  const original = read(path.join(sourceRoot, `shard-${tag}.js`));
  let candidate = original;
  if (tag === 'a') candidate = patchShardA(candidate);
  if (tag === 'e') candidate = patchShardE(candidate);
  const outPath = path.join(candidateRoot, `shard-${tag}.js`);
  write(outPath, candidate);
  candidateHashes[rel(outPath)] = sha256(candidate);
}

fs.mkdirSync(path.dirname(candidateBundle), { recursive: true });
execFileSync('python3', [stitcher, ...tags.map((tag) => path.join(candidateRoot, `shard-${tag}.js`)), candidateBundle], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', candidateBundle], { stdio: 'inherit' });

const afterHashes = Object.fromEntries(baselinePaths.map((p) => [rel(p), sha256(fs.readFileSync(p))]));
const frozenUnchanged = JSON.stringify(baselineHashes) === JSON.stringify(afterHashes);
if (!frozenUnchanged) throw new Error('Frozen O8.13 source changed during candidate build');

const report = {
  schema: 'cc02-03-candidate/v1',
  candidate: 'CC-02+03',
  status: 'candidate-only',
  compiledChanges: ['CC-02', 'CC-03'],
  fac: ['FaC-01', 'FaC-05', 'FaC-06', 'FaC-07', 'FaC-16', 'FaC-17'],
  intent: 'primary-preserving template neutralization, bounded diagnostics, and single-flight activity containment',
  sourceOfTruth: 'O8.13-r3 read-only reference plus candidate source copies',
  frozenReferenceSha256: baselineHashes,
  candidateSourceSha256: candidateHashes,
  candidateBundle: rel(candidateBundle),
  frozenReferenceUnchanged: frozenUnchanged,
  applied: {
    fac01: { labelReplacements: Object.fromEntries(labelMap), runtimeTagPrefix: '[G:<tag>]' },
    fac05: { newGlobals: 0, localAdapter: true },
    fac06: { boundedLogEvents: 256, boundedLogBytes: 65536, singleFlightActivityAdapter: true, teardownAdapter: true },
    fac07: { newMessageChannels: 0, existingBootHandshakePreserved: true },
    fac17: { primaryActivitySignalPreserved: true, broadRemovedListDispatch: false },
  },
  promotion: { target: null, liveEligible: false },
};
write(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`CC-02+03 candidate built: ${rel(candidateBundle)}`);
console.log(`frozen reference unchanged: ${frozenUnchanged}`);
console.log(`report: ${rel(reportPath)}`);
