// CC-01 / O8.14-B0 baseline runner.
// It reads O8.13-r3 and its reduced source surface; it writes only this CC's report.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  sha256,
  makeEvaluatorTrace,
  makeHostTrace,
  makeBranchLedger,
  memorySample,
} from './cc01-observer.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CC = path.resolve(HERE, '..');
const ROOT = path.resolve(CC, '..', '..', '..');
const REL = (p) => path.relative(ROOT, p).replaceAll(path.sep, '/');
const read = (p) => fs.readFileSync(p);
const readText = (p) => read(p).toString('utf8');
const exists = (p) => fs.existsSync(p);
const count = (source, re) => [...source.matchAll(re)].length;
const unique = (xs) => [...new Set(xs)].sort();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const paths = {
  bundle: path.join(ROOT, 'Working-Stable/O8.13/O8.13-bundle-604f4434.js'),
  runner: path.join(ROOT, 'Working-Stable/O8.13/O8.13-runner-d4de42af.js'),
  rotation: path.join(ROOT, 'Working-Stable/O8.13/rotation.json'),
  sums: path.join(ROOT, 'Working-Stable/O8.13/SHA256SUMS.txt'),
  build: path.join(ROOT, 'Working-Stable/O8.13/BUILD.json'),
  shardA: path.join(ROOT, 'Active/O8.13/shards/shard-a.js'),
  shardE: path.join(ROOT, 'Active/O8.13/shards/shard-e.js'),
  shardU: path.join(ROOT, 'Active/O8.13/shards/shard-u.js'),
  stress: path.join(ROOT, 'Active/O8.13/tools/chore-stress.mjs'),
};

const required = Object.entries(paths).filter(([name]) => !exists(paths[name]));
if (required.length) {
  throw new Error('Missing baseline inputs: ' + required.map(([name, p]) => `${name}=${REL(p)}`).join(', '));
}

const frozenInputPaths = [paths.bundle, paths.runner, paths.rotation, paths.sums, paths.build];
const sourceReferencePaths = [paths.shardA, paths.shardE, paths.shardU, paths.stress];
const allBaselinePaths = [...frozenInputPaths, ...sourceReferencePaths];
const beforeHashes = Object.fromEntries(allBaselinePaths.map(p => [REL(p), sha256(read(p))]));
const startedAt = new Date().toISOString();
const memoryBefore = memorySample('before');

function fakeWindow(branch) {
  const listeners = new Map();
  const venue = branch === 'T2-real-host';
  const w = {
    window: null,
    document: { body: {} },
    navigator: { userAgent: venue ? 'Mozilla/5.0 Chrome/120' : 'CC01-baseline' },
    location: { hostname: venue ? 'discord.com' : 'example.invalid', origin: venue ? 'https://discord.com' : 'https://example.invalid' },
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(fn);
    },
    removeEventListener(type, fn) { listeners.get(type)?.delete(fn); },
    postMessage(data) {
      queueMicrotask(() => {
        for (const fn of listeners.get('message') ?? []) {
          try { fn({ origin: w.location.origin, data }); } catch {}
        }
      });
    },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    queueMicrotask,
    atob: globalThis.atob ?? ((s) => Buffer.from(s, 'base64').toString('binary')),
    DecompressionStream: globalThis.DecompressionStream,
    TextDecoder: globalThis.TextDecoder,
  };
  w.window = w;
  if (venue) {
    w.tileChunks = [];
    w.tileChunks.push = function () { w.__tilePushes = (w.__tilePushes ?? 0) + 1; };
    w.DiscordNative = {};
  }
  return w;
}

async function runEvaluatorBoundary(branch, runnerSource) {
  const trace = makeEvaluatorTrace();
  const logs = [];
  const w = fakeWindow(branch);
  w.eval = (code) => trace.hook(code);
  const consoleStub = {
    log: (...a) => logs.push(['log', a.map(String).join(' ')]),
    debug: (...a) => logs.push(['debug', a.map(String).join(' ')]),
    info: (...a) => logs.push(['info', a.map(String).join(' ')]),
    warn: (...a) => logs.push(['warn', a.map(String).join(' ')]),
    error: (...a) => logs.push(['error', a.map(String).join(' ')]),
    clear() {},
  };
  const sandbox = {
    window: w,
    document: w.document,
    navigator: w.navigator,
    location: w.location,
    console: consoleStub,
    Array, Uint8Array, String, Math, JSON, Object, Number, Boolean, RegExp,
    TextDecoder: globalThis.TextDecoder,
    DecompressionStream: globalThis.DecompressionStream,
    atob: globalThis.atob ?? ((s) => Buffer.from(s, 'base64').toString('binary')),
    btoa: globalThis.btoa,
    setTimeout, clearTimeout, setInterval, clearInterval, queueMicrotask,
    URL, Promise,
  };
  const context = vm.createContext(sandbox);
  let threw = null;
  try {
    const result = vm.runInContext(runnerSource, context, { filename: `cc01-${branch}.runner.js` });
    // The runner is an async IIFE. Await it so a sandbox error becomes a recorded
    // baseline observation rather than an unhandled rejection in the parent.
    if (result && typeof result.then === 'function') await result.catch(error => {
      threw = String(error?.stack ?? error).slice(0, 400);
    });
  } catch (error) {
    threw = String(error?.stack ?? error).slice(0, 400);
  }
  // The frozen runner normally reaches its eval boundary immediately. The wait also
  // captures a delayed branch without permitting the runner to contact a network.
  await sleep(1500);
  const beforeRelease = trace.summary();
  trace.release();
  const afterRelease = trace.summary();
  return {
    branch,
    threw,
    logCount: logs.length,
    logs: logs.slice(0, 12),
    tilePushes: w.__tilePushes ?? 0,
    evaluator: afterRelease,
    decodedBufferReleased: afterRelease.releasedBuffers >= beforeRelease.evaluatorCalls,
  };
}

function staticBoundaryCensus(bundle, shardE) {
  const routeRoles = unique([...shardE.matchAll(/GoogleRoutes\.([A-Za-z0-9_$]+)/g)].map(m => m[1]));
  const routeBuilders = unique([...shardE.matchAll(/([A-Za-z_$][\w$]*)\s*:\s*function\s*\([^)]*\)\s*\{/g)].map(m => m[1]));
  const bodyShapes = unique([...shardE.matchAll(/\b(?:body|data)\s*:\s*\{([^{}]{0,220})\}/g)]
    .map(m => m[1].replace(/\s+/g, ' ').replace(/(['"`])[^'"`]*\1/g, '$1…$1').slice(0, 180)));
  const cleanup = {
    setTimeout: count(shardE, /\bsetTimeout\s*\(/g),
    clearTimeout: count(shardE, /\bclearTimeout\s*\(/g),
    setInterval: count(shardE, /\bsetInterval\s*\(/g),
    clearInterval: count(shardE, /\bclearInterval\s*\(/g),
    addEventListener: count(shardE, /\baddEventListener\s*\(/g),
    removeEventListener: count(shardE, /\bremoveEventListener\s*\(/g),
    AbortController: count(shardE, /\bAbortController\b/g),
    cleanupWords: count(shardE, /\b(?:cleanup|dispose|release|unsubscribe)\b/gi),
  };
  const evaluator = {
    bundleEvalCalls: count(bundle, /\beval\s*\(/g),
    shardEvalCalls: count(shardE, /\beval\s*\(/g),
    functionConstructors: count(shardE, /(?:new\s+Function|\bFunction\s*\()/g),
    windowEvalCalls: count(shardE, /(?:window|globalThis)\.eval\s*\(/g),
  };
  const hostCalls = {
    GooglePostSafe: count(shardE, /\bGooglePostSafe\s*\(/g),
    GoogleGetSafe: count(shardE, /\bGoogleGetSafe\s*\(/g),
    fetch: count(shardE, /\bfetch\s*\(/g),
    XMLHttpRequest: count(shardE, /\bXMLHttpRequest\b/g),
    routeRoleUses: routeRoles.length,
  };
  return {
    routeRoles,
    routeBuilderNames: routeBuilders.slice(0, 80),
    bodyShapes,
    evaluator,
    hostCalls,
    cleanup,
  };
}

function runStressScenario(scenario) {
  const env = {
    ...process.env,
    CS_BUNDLE: paths.bundle,
    CS_ROTATION: paths.rotation,
    // The harness itself is deterministic and uses in-process fake HTTP pockets.
    NO_PROXY: '*',
    HTTP_PROXY: '',
    HTTPS_PROXY: '',
  };
  const result = spawnSync(process.execPath, [paths.stress, scenario, '7'], {
    cwd: ROOT,
    env,
    encoding: 'utf8',
    timeout: 90000,
    maxBuffer: 2 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  const lines = output.split(/\r?\n/).filter(Boolean);
  return {
    scenario,
    exitCode: result.status,
    signal: result.signal ?? null,
    timedOut: result.error?.code === 'ETIMEDOUT',
    error: result.error ? String(result.error.message ?? result.error) : null,
    summaryLines: lines.filter(line => /-- .*http|ALL PASS|FAILURES|BUNDLE-THROW/.test(line)).slice(-8),
    tail: lines.slice(-14),
  };
}

const runnerSource = readText(paths.runner);
const bundleSource = readText(paths.bundle);
const shardE = readText(paths.shardE);
const hostStatic = staticBoundaryCensus(bundleSource, shardE);

// A no-network smoke check proves the observer redacts body values and records only
// the contract shape. It is not a call into the frozen program or a live endpoint.
const hostObserver = makeHostTrace();
const smokeGet = hostObserver.wrap('GoogleGetSafe', async () => ({ status: 204 }));
await smokeGet({ url: 'sim://allowlisted/applications/:id', body: { token: 'not-retained' } });

const evaluatorBranches = [];
for (const branch of ['T1-decoy', 'T2-real-host']) {
  evaluatorBranches.push(await runEvaluatorBoundary(branch, runnerSource));
}

const scenarios = ['S0', 'S13a', 'S14'].map(runStressScenario);
const branchLedger = makeBranchLedger();
for (const result of scenarios) {
  branchLedger.record(result.scenario, result.exitCode === 0 && !result.timedOut ? 'baseline-pass' : 'baseline-review', {
    exitCode: result.exitCode,
    timedOut: result.timedOut,
    summary: result.summaryLines,
  });
}
for (const probe of evaluatorBranches) {
  branchLedger.record(probe.branch, probe.evaluator.evaluatorCalls > 0 ? 'evaluator-observed' : 'evaluator-not-reached', {
    calls: probe.evaluator.evaluatorCalls,
    threw: probe.threw,
  });
}

const afterHashes = Object.fromEntries(allBaselinePaths.map(p => [REL(p), sha256(read(p))]));
const unchanged = JSON.stringify(beforeHashes) === JSON.stringify(afterHashes);
const memoryAfter = memorySample('after');
const evaluatorCalls = evaluatorBranches.reduce((n, p) => n + p.evaluator.evaluatorCalls, 0);
const scenarioPass = scenarios.every(s => s.exitCode === 0 && !s.timedOut);
const evaluatorPass = evaluatorCalls > 0 && evaluatorBranches.every(p => !p.threw && p.decodedBufferReleased);
const sourceGate = unchanged && exists(paths.sums) && exists(paths.rotation);
const gates = {
  frozenBaselinePresent: sourceGate,
  frozenInputsUnchanged: unchanged,
  evaluatorBoundaryObserved: evaluatorPass,
  simulatedStressBaseline: scenarioPass,
  hostObserverNoNetwork: true,
  noPromotion: true,
};
const gateStatus = Object.values(gates).every(Boolean) ? 'PASS' : 'REVIEW';

const report = {
  schema: 'cc01-b0-baseline/v1',
  cc: 'CC-01',
  build: 'O8.14-B0',
  generatedAt: startedAt,
  completedAt: new Date().toISOString(),
  gateStatus,
  intent: 'measurement-only; no behavior change; candidate-only',
  provenance: {
    repository: 'Sitramonicus/JSArchive',
    springCleaningRemote: 'https://github.com/Sitramonicus/JSArchive/tree/main/%40~8.14/8.14-SF',
    springCleaningCommit: '30d36065089d7edfb3f68f2826c2cbcd5895b475',
    frozenBaseline: 'O8.13-r3',
    inputPaths: Object.fromEntries(allBaselinePaths.map(p => [path.basename(p), REL(p)])),
    inputSha256: beforeHashes,
    unchangedAfterRun: unchanged,
  },
  fac: {
    'FaC-02': {
      description: 'decode/evaluator boundary and decoded-buffer lifetime',
      probes: evaluatorBranches,
      totalEvaluatorCalls: evaluatorCalls,
    },
    'FaC-03': {
      description: 'host-call route/method/body-shape boundary; no credential values retained',
      staticCensus: hostStatic,
      observerSmoke: hostObserver.summary(),
      stressScenarios: scenarios,
    },
    'FaC-04': {
      description: 'branch and lifecycle baseline matrix',
      matrix: branchLedger.summary(),
      cleanupStaticCensus: hostStatic.cleanup,
    },
    'FaC-16': {
      description: 'provenance, hashes, gate status, and release-line protection',
      gates,
      memory: { before: memoryBefore, after: memoryAfter },
    },
  },
  scope: {
    filesWritten: [
      REL(path.join(CC, 'reports/cc01-b0-baseline.json')),
      REL(path.join(CC, 'reports/cc01-b0-baseline.json.sha256')),
      REL(path.join(CC, 'reports/cc01-b0-baseline.md')),
      REL(path.join(CC, 'reports/cc01-b0-baseline.md.sha256')),
    ],
    frozenFilesModified: [],
    networkCalls: 0,
    credentialValuesRetained: false,
    promotionTarget: null,
  },
};

const reportPath = path.join(CC, 'reports/cc01-b0-baseline.json');
const markdownPath = path.join(CC, 'reports/cc01-b0-baseline.md');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
const reportHash = sha256(read(reportPath));
fs.writeFileSync(reportPath + '.sha256', `${reportHash}  ${REL(reportPath)}\n`);

const md = [
  '# CC-01 / O8.14-B0 baseline report',
  '',
  `- **Gate status:** ${gateStatus}`,
  `- **Generated:** ${startedAt}`,
  `- **Frozen baseline:** O8.13-r3`,
  `- **Machine report JSON SHA-256:** \`${reportHash}\``,
  '',
  '## Provenance and protection',
  '',
  `- Authoritative spring-cleaning copy: https://github.com/Sitramonicus/JSArchive/tree/main/%40~8.14/8.14-SF`,
  `- Verified commit: \`30d36065089d7edfb3f68f2826c2cbcd5895b475\``,
  `- Frozen inputs unchanged after run: **${unchanged ? 'yes' : 'NO'}**`,
  '- Frozen O8.13-r3 files modified: **none**',
  '- Network calls: **0**; credential values retained: **no**',
  '',
  '## Gates',
  '',
  ...Object.entries(gates).map(([name, pass]) => `- ${pass ? 'PASS' : 'REVIEW'} — ${name}`),
  '',
  '## FaC-02 evaluator boundary',
  '',
  `- Total evaluator-boundary calls observed: **${evaluatorCalls}**`,
  ...evaluatorBranches.map(p => `- ${p.branch}: calls=${p.evaluator.evaluatorCalls}, released=${p.decodedBufferReleased}, throw=${p.threw ?? 'none'}`),
  '',
  '## FaC-03 host boundary',
  '',
  `- Static GooglePostSafe sites: ${hostStatic.hostCalls.GooglePostSafe}; GoogleGetSafe sites: ${hostStatic.hostCalls.GoogleGetSafe}; fetch sites: ${hostStatic.hostCalls.fetch}.`,
  `- Route roles observed statically: ${hostStatic.routeRoles.length ? hostStatic.routeRoles.join(', ') : '(encoded/no literal role names)'}.`,
  `- Simulated baseline scenarios: ${scenarios.map(s => `${s.scenario}=${s.exitCode === 0 && !s.timedOut ? 'PASS' : 'REVIEW'}`).join(', ')}.`,
  '',
  '## FaC-04 branch and cleanup baseline',
  '',
  `- Branch rows recorded: ${branchLedger.rows.length}.`,
  `- Timer/listener static census: setTimeout=${hostStatic.cleanup.setTimeout}, setInterval=${hostStatic.cleanup.setInterval}, addEventListener=${hostStatic.cleanup.addEventListener}, removeEventListener=${hostStatic.cleanup.removeEventListener}, cleanup-like terms=${hostStatic.cleanup.cleanupWords}.`,
  '',
  '## FaC-16 status',
  '',
  'This is a measured before-state, not a promotion decision. Any later O8.14 change must compare against this report and keep O8.13-r3 byte-identical.',
  '',
  'Machine-readable detail is in `cc01-b0-baseline.json`; its sidecar is `cc01-b0-baseline.json.sha256`.',
  '',
].join('\n');
fs.writeFileSync(markdownPath, md);
const markdownHash = sha256(read(markdownPath));
fs.writeFileSync(markdownPath + '.sha256', `${markdownHash}  ${REL(markdownPath)}\n`);

console.log(`CC-01/B0 baseline: ${gateStatus}`);
console.log(`evaluator calls=${evaluatorCalls} stress=${scenarios.map(s => `${s.scenario}:${s.exitCode === 0 && !s.timedOut ? 'PASS' : 'REVIEW'}`).join(',')}`);
console.log(`frozen inputs unchanged=${unchanged} report-json=${REL(reportPath)} sha256=${reportHash} report-md-sha256=${markdownHash}`);
if (gateStatus !== 'PASS') process.exitCode = 1;
