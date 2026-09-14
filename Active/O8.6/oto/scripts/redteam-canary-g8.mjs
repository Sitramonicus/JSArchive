// redteam-canary-g8.mjs — O8.9 G8 gate: babel-regenerated copies provably flip to
// honey; pristine bytes never do; nothing ever crashes/throws.
// (1) bundle: run pristine vs babel-reprint in the discordlike-shaped global;
//     pristine logs contain ZERO fiction strings, reprint logs contain >=1.
// (2) runner: run pristine vs babel-reprint T2-default; pristine yields the
//     bundle, reprint yields the courtesy (honey) board.
// Usage: node redteam-canary-g8.mjs  (fails loud on any gate miss)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import '../../tools/discordlike.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const O86 = path.resolve(HERE, '..', '..');
const REPO = path.resolve(O86, '..', '..');
const require = createRequire(import.meta.url);
const ENG = path.resolve(O86, '..', 'engines', 'node_modules');
function needEngine(name) {
  try { return require(path.join(ENG, name)); } catch (e) { /* fall through */ }
  return require(name);
}
const parser = needEngine('@babel/parser');
const generate = needEngine('@babel/generator').default;

let failures = 0;
const gate = (name, cond, extra = '') => {
  console.log(`[${cond ? 'GATE-PASS' : 'GATE-FAIL'}] ${name}${extra ? ' — ' + extra : ''}`);
  if (!cond) failures++;
};

const bundle = fs.readFileSync(path.join(O86, 'final-package', 'O8.6-Final-final-bundle.js'), 'utf8');
const census = JSON.parse(fs.readFileSync(path.join(O86, 'oto', 'g7-strings', 'census.json'), 'utf8'));
const fictions = census.fictionTexts;
const reprint = generate(parser.parse(bundle, { sourceType: 'script' }), { compact: false }).code;
console.log(`bundle ${(bundle.length / 1024).toFixed(0)}KB -> reprint ${(reprint.length / 1024).toFixed(0)}KB, ${fictions.length} fiction markers`);

function runBundle(src) {
  const logs = [];
  const cap = (...a) => logs.push(a.join(' '));
  const save = [console.debug, console.log, console.info, console.warn];
  console.debug = cap; console.log = cap; console.info = cap; console.warn = cap;
  let threw = null;
  try {
    vm.runInThisContext(src.replace(/会員\s*=\s*(0x2|2|1|0)/, '会員=2'));
  } catch (e) { threw = e; }
  [console.debug, console.log, console.info, console.warn] = save;
  return { logs, threw };
}
const countFic = (logs) => {
  const text = logs.join('\n');
  return fictions.filter((f) => text.includes(f)).length;
};
{
  const p = runBundle(bundle);
  gate('pristine stays canon', p.threw === null && globalThis.lexMode === 0,
    `threw=${p.threw ? p.threw.message.slice(0, 50) : 'no'} flag=${globalThis.lexMode} logs=${p.logs.length}`);
}
{
  const r = runBundle(reprint);
  gate('reprint flips to honey', r.threw === null && globalThis.lexMode === 1,
    `threw=${r.threw ? r.threw.message.slice(0, 50) : 'no'} flag=${globalThis.lexMode}`);
}
// mechanism unit proof: the shipped dec() branch flips canon->fiction on the flag
// (exercised on the pre-JSO g7 namespace: identical logic, reachable binding)
{
  const g7a = fs.readFileSync(path.join(O86, 'oto', 'g7-strings', 'shard-a.js'), 'utf8');
  const nsSrc = g7a.slice(0, g7a.indexOf('var textCacheA = (function') >= 0 ? g7a.indexOf('\n', g7a.indexOf('})();')) + 1 : 0);
  const ctx = { atob: (s) => Buffer.from(s, 'base64').toString('latin1') };
  vm.createContext(ctx);
  vm.runInContext(nsSrc, ctx);
  // find two d1 call sites in the g7 body and flip the flag between evals
  const argRe = /textCacheA\.d1\((\d+)\)/g;
  const args = [];
  let m;
  while ((m = argRe.exec(g7a)) && args.length < 4) args.push(m[1]);
  let flipped = 0, tested = 0;
  for (const a of args) {
    const c = vm.runInContext(`(typeof lexMode !== 'undefined' ? lexMode = 0 : 0, textCacheA.d1(${a}))`, ctx);
    const h = vm.runInContext(`(lexMode = 1, textCacheA.d1(${a}))`, ctx);
    vm.runInContext('lexMode = 0', ctx);
    tested++;
    if (typeof c === 'string' && typeof h === 'string' && c !== h && fictions.includes(h)) flipped++;
  }
  gate('flag flips decodes canon->fiction', tested > 0 && flipped === tested, `${flipped}/${tested} flipped to fiction pool`);
}

// ---- runner half (harness COPIED from test-stego10-tiers.mjs — keep in sync) ----
function fakeWindow({ tileFeed = false, thin = 0, noReel = false, noNative = false, noVenue = false, dead = [], deadHost = null } = {}) {
  const w = {};
  if (thin < 1) w.document = { body: {} };
  if (thin < 2) {
    w.atob = globalThis.atob;
    w.DecompressionStream = globalThis.DecompressionStream;
    w.TextDecoder = globalThis.TextDecoder;
  }
  w.eval = (code) => { w.__captured = code; };
  if (tileFeed && !noReel) { w.tileChunks = []; w.tileChunks.push = function () {}; }
  if (tileFeed && !noNative) { w.DiscordNative = {}; }
  if (tileFeed && !noVenue) {
    w.location = { hostname: 'discord.com' };
    w.navigator = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120' };
  }
  if (dead.includes('tg')) w.Telegram = { WebApp: {} };
  if (dead.includes('teams')) w.microsoftTeams = {};
  if (dead.includes('zoom')) w.ZoomMtg = {};
  if (dead.includes('slack')) {
    const ua0 = (w.navigator && w.navigator.userAgent) || '';
    w.navigator = { userAgent: ua0 + ' Slack/4.36' };
    if (!w.location) w.location = { hostname: 'example.com' };
  }
  if (deadHost) {
    w.location = { hostname: deadHost };
    if (!w.navigator) w.navigator = { userAgent: 'Mozilla/5.0' };
  }
  return w;
}
async function runWindow(source, opts) {
  const w = fakeWindow(opts);
  const budget = opts.budgetMs || 20000;
  const logs = [];
  const sandbox = {
    window: w,
    console: { log: (...a) => logs.push(a.join(' ')), clear() {} },
    Array, Uint8Array, String, Math,
  };
  const ctx = vm.createContext(sandbox);
  w.eval = (code) => {
    // Protocol: the reel step is a side-effect-free function expression — really
    // evaluate it (real indirect eval returns the function); payloads capture.
    if (typeof code === 'string' && code.includes('(function legacyReel(')) {
      return vm.runInContext(code, ctx);
    }
    w.__captured = code;
  };
  vm.runInContext(source, ctx, { filename: 'runner.js' });
  const t0 = Date.now();
  let lastChange = 0;
  for (;;) {
    await new Promise(r => setTimeout(r, 50));
    if (w.__captured !== undefined) {
      if (w.__capLen !== w.__captured.length) { w.__capLen = w.__captured.length; lastChange = Date.now(); }
      if (Date.now() - lastChange >= 400) break; // settled on the final payload
    }
    if (Date.now() - t0 >= budget) break;
  }
  const captured = w.__captured ?? null;
  console.log(`  [run] ms=${Date.now() - t0} cap=${captured === null ? 'NONE' : captured.length + 'B sha8=' + crypto.createHash('sha256').update(captured).digest('hex').slice(0, 8)}`);
  return { captured, logs };
}
function personalize(src, kaiin, namae) {
  if (kaiin !== undefined) src = src.replace(/会員\s*=\s*(0x2|2|1|0)/, '会員=' + kaiin);
  if (namae !== undefined && namae !== DEFAULT_NAME) src = src.split(DEFAULT_NAME).join(namae);
  return src;
}
const MINREAL = fs.readFileSync(path.join(REPO, 'Active', 'Stego', 'output-stego10', 'stego10-real.min.js'), 'utf8');
const MINTUBE = fs.readFileSync(path.join(REPO, 'Active', 'Stego', 'output-stego10', 'stego10-tube.min.js'), 'utf8');
const DEFNAME = '佐藤 結衣';
const DEFAULT_NAME = DEFNAME;
async function runRunner(src) { const { captured } = await runWindow(src, { tileFeed: true }); return captured; }
function sha8(s) { return crypto.createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 8); }

{
  const runnerPath = path.join(REPO, 'Active', 'Stego', 'output-stego10', 'O8.10-runner.js');
  if (!fs.existsSync(runnerPath)) {
    gate('runner pristine quiet', false, 'no stego10 output yet — run build-stego10 first');
  } else {
    const runner = fs.readFileSync(runnerPath, 'utf8');
    const capP = await runRunner(runner);
    gate('runner pristine serves real byte-exact', capP === personalize(MINREAL, 2, DEFNAME),
      (capP === null ? '(no capture)' : 'len=' + capP.length + ' sha8=' + sha8(capP)) + ' want len=' + personalize(MINREAL, 2, DEFNAME).length);
    const runnerReprint = generate(parser.parse(runner, { sourceType: 'script' }), { compact: false }).code;
    const capR = await runRunner(runnerReprint);
    gate('runner reprint serves tube byte-exact', capR === personalize(MINTUBE, 2, DEFNAME),
      (capR === null ? '(no capture)' : 'len=' + capR.length + ' sha8=' + sha8(capR)) + ' want len=' + personalize(MINTUBE, 2, DEFNAME).length);
  }
}

if (failures) { console.error(`REDTEAM-G8: ${failures} GATE(S) MISSED`); process.exit(1); }
console.log('REDTEAM-G8: ALL GATES PASS');
