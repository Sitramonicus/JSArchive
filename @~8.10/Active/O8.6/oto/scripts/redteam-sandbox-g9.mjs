// redteam-sandbox-g9.mjs — O8.9 G9 gates: sandbox honey.
// static: >=50 featQ reads in shard-aux, zero exfil surface in the annex.
// dynamic (runInThisContext, battery-consistent globals + targeted overrides):
// (1) Proxy-logged window sees >=50 distinct read keys;
// (2) sloppy fake (bare window, no navigator/document) runs the rehearsal sim;
// (3) wrapped-atob console yields honey strings but NOT the sim;
// (4) pristine discordlike run: no sim token, no fiction (false-positive proof).
// Per-trigger PROOFS-OF-IMPOSSIBILITY on real Discord live in O8.9-PLAN §6/G9.
// Usage: node redteam-sandbox-g9.mjs  (fails loud on any gate miss)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import '../../tools/discordlike.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const O86 = path.resolve(HERE, '..', '..');

let failures = 0;
const gate = (name, cond, extra = '') => {
  console.log(`[${cond ? 'GATE-PASS' : 'GATE-FAIL'}] ${name}${extra ? ' — ' + extra : ''}`);
  if (!cond) failures++;
};

const aux = fs.readFileSync(path.join(O86, 'shards', 'shard-aux.js'), 'utf8');
const bundle = fs.readFileSync(path.join(O86, 'final-package', 'O8.6-Final-final-bundle.js'), 'utf8');
const census = JSON.parse(fs.readFileSync(path.join(O86, 'oto', 'g7-strings', 'census.json'), 'utf8'));
const SIM_TOKEN = 'rehearsal v2 sealed';

gate('static >=50 sampler reads', (aux.match(/featQ\(/g) || []).length >= 50,
  `${(aux.match(/featQ\(/g) || []).length} reads`);
{
  const exfil = ['fetch(', 'XMLHttpRequest', 'WebSocket', 'sendBeacon', 'EventSource', 'importScripts']
    .filter((s) => aux.includes(s));
  gate('static zero exfil surface', exfil.length === 0, exfil.join(','));
}

function runWith(overrides) {
  const logs = [];
  const cap = (...a) => logs.push(a.join(' '));
  const saveConsole = [console.debug, console.log, console.info, console.warn];
  console.debug = cap; console.log = cap; console.info = cap; console.warn = cap;
  const save = {};
  for (const k of Object.keys(overrides)) { save[k] = globalThis[k]; globalThis[k] = overrides[k]; }
  // window-alias: discordlike sets window === old globalThis; rebind if overridden
  let threw = null;
  try {
    vm.runInThisContext(bundle.replace(/会員\s*=\s*(0x2|2|1|0)/, '会員=2'));
  } catch (e) { threw = e; }
  for (const k of Object.keys(overrides)) {
    if (save[k] === undefined) delete globalThis[k]; else globalThis[k] = save[k];
  }
  [console.debug, console.log, console.info, console.warn] = saveConsole;
  return { logs, threw };
}
const hasFic = (logs) => census.fictionTexts.some((f) => logs.join('\n').includes(f));

// (1) proxy-logged reads — logging facades on all four sampled surfaces
{
  const keys = new Set();
  const mkFacade = (target) => new Proxy({}, {
    get: (t, k) => { keys.add(String(k)); return target[k]; },
    has: (t, k) => k in target,
  });
  const save = { window: globalThis.window, navigator: globalThis.navigator, document: globalThis.document, location: globalThis.location };
  const wF = mkFacade(globalThis);
  wF.window = wF;
  globalThis.window = wF;
  globalThis.navigator = mkFacade(save.navigator);
  globalThis.document = mkFacade(save.document);
  globalThis.location = mkFacade(save.location);
  const logs = [];
  const saveD = console.debug;
  console.debug = (...a) => logs.push(a.join(' '));
  let threw = null;
  try {
    vm.runInThisContext(bundle.replace(/会員\s*=\s*(0x2|2|1|0)/, '会員=2'));
  } catch (e) { threw = e; }
  console.debug = saveD;
  globalThis.window = save.window; globalThis.navigator = save.navigator;
  globalThis.document = save.document; globalThis.location = save.location;
  gate('proxy sees >=50 read keys', threw === null && keys.size >= 50,
    `threw=${threw ? threw.message.slice(0, 40) : 'no'} keys=${keys.size}`);
}

// (2) sloppy fake: bare window object, no navigator/document/location
{
  const save = { window: globalThis.window, navigator: globalThis.navigator, document: globalThis.document, location: globalThis.location };
  globalThis.window = {};
  delete globalThis.navigator; delete globalThis.document; delete globalThis.location;
  const r = runWith({});
  globalThis.window = save.window; globalThis.navigator = save.navigator;
  globalThis.document = save.document; globalThis.location = save.location;
  const text = r.logs.join('\n');
  gate('sloppy fake runs rehearsal', r.threw === null && text.includes(SIM_TOKEN),
    `threw=${r.threw ? r.threw.message.slice(0, 50) : 'no'} logs=${r.logs.length}`);
}

// (3) wrapped atob is IGNORED (F4 dropped 2026-09-13: Node>=16 ships a JS-wrapper
// atob, so any [native code] heuristic false-positives in every harness; sticky
// poison on a heuristic trip is also unsafe for legit instrumented environments)
{
  const orig = globalThis.atob;
  const wrapped = (...a) => orig(...a);
  const r = runWith({ atob: wrapped });
  const text = r.logs.join('\n');
  gate('wrapped atob ignored (no flag, no sim)', r.threw === null && globalThis.lexMode === 0 && !text.includes(SIM_TOKEN),
    `threw=${r.threw ? r.threw.message.slice(0, 50) : 'no'} flag=${globalThis.lexMode}`);
}
// (3b) partial fake (window+document, no navigator): conservative canon
{
  const save = { navigator: globalThis.navigator };
  delete globalThis.navigator;
  const r = runWith({});
  globalThis.navigator = save.navigator;
  const text = r.logs.join('\n');
  gate('partial fake stays canon', r.threw === null && !text.includes(SIM_TOKEN),
    `threw=${r.threw ? r.threw.message.slice(0, 50) : 'no'} logs=${r.logs.length}`);
}

// (4) pristine: no sim, no fiction
{
  const r = runWith({});
  const text = r.logs.join('\n');
  gate('pristine discordlike silent-of-sim/fiction', r.threw === null && !text.includes(SIM_TOKEN) && !hasFic(r.logs),
    `threw=${r.threw ? r.threw.message.slice(0, 50) : 'no'} logs=${r.logs.length}`);
}

if (failures) { console.error(`REDTEAM-G9: ${failures} GATE(S) MISSED`); process.exit(1); }
console.log('REDTEAM-G9: ALL GATES PASS');
