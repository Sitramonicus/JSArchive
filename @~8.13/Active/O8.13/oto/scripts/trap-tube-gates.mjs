// trap-tube-gates.mjs — O8.9 G6 gates: the tube fires on sweep, poisons valid
// calls post-trip, terminates into plausible garbage, never throws/hangs.
// Bundle half (this file, part 1): pre-JSO g7 namespace sweep simulation.
// Loader half (part 2: enum→tube route + vault behavior): appended when the
// tube blob ships (stego rebuild); gate fails loud until then if missing.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const O86 = path.resolve(HERE, '..', '..');
const REPO2 = path.resolve(O86, '..', '..');
const DEFNAME2 = '佐藤 結衣';
const DEFAULT_NAME = DEFNAME2;
let failures = 0;
const gate = (name, cond, extra = '') => {
  console.log(`[${cond ? 'GATE-PASS' : 'GATE-FAIL'}] ${name}${extra ? ' — ' + extra : ''}`);
  if (!cond) failures++;
};
const norm = (s) => s.replace(/\b[0-9a-f]{8}\b/g, '\0').replace(/\d+/g, '\0'); // keep in sync with trap-fp-harness.mjs
const census = JSON.parse(fs.readFileSync(path.join(O86, 'oto', 'g7-strings', 'census.json'), 'utf8'));
const SKEL = new Set(census.tubeSkeletons);
const isTube = (s) => SKEL.has(norm(s));

// ---- part 1: namespace sweep sim (shard-e, largest) ----
{
  const g7e = fs.readFileSync(path.join(O86, 'oto', 'g7-strings', 'shard-e.js'), 'utf8');
  const nsSrc = g7e.slice(0, g7e.indexOf('\n', g7e.indexOf('})();')) + 1);
  const ctx = { atob: (s) => Buffer.from(s, 'base64').toString('latin1') };
  vm.createContext(ctx);
  vm.runInContext(nsSrc, ctx);
  const argRe = /textCacheE\.d1\((\d+)\)/g;
  const validArgs = [];
  let m;
  while ((m = argRe.exec(g7e)) && validArgs.length < 4) validArgs.push(m[1]);
  gate('sweep sim has valid args', validArgs.length === 4, validArgs.join(','));
  const call = (a) => vm.runInContext(`textCacheE.d1(${a})`, ctx);
  // phase A: valid pre-trip serve canon (stable, non-tube)
  const canon = validArgs.map(call);
  gate('pre-trip valid serves canon', canon.every((c) => typeof c === 'string' && !isTube(c) && !census.fictionTexts.includes(c)));
  // phase B: 30 invalid calls (huge args, out-of-table w.h.p. 1-2e-7 each)
  let threw = null, ficPre = 0, tubePost = 0;
  const t0 = Date.now();
  try {
    for (let i = 0; i < 30; i++) {
      const r = call(4000000000 + i * 7919);
      if (typeof r !== 'string') throw new Error('non-string serve');
      if (census.fictionTexts.includes(r)) ficPre++;
      if (isTube(r)) tubePost++;
    }
  } catch (e) { threw = e; }
  gate('sweep never throws', threw === null, threw ? String(threw).slice(0, 60) : `30 calls in ${Date.now() - t0}ms`);
  gate('pre-tube invalids serve fiction (confusion)', ficPre >= 20, `fiction=${ficPre}/30`);
  gate('post-24-invalid tube serves', tubePost >= 5, `tube=${tubePost}/30 (24th invalid flips)`);
  // phase C: valid args post-trip are POISONED (serve tube, not canon)
  const post = validArgs.map(call);
  gate('valid-post-trip poisoned to tube', post.every((s, i) => isTube(s) && s !== canon[i]), post.map(norm).join(' | ').slice(0, 120));
  // phase D: terminal garbage reached, bounded, never throws
  let term = 0, threw2 = null;
  const t1 = Date.now();
  try {
    for (let i = 0; i < 220; i++) { if (norm(call(4000000000 + i)) === 'vault seal \0 -- lattice quiet') term++; } // SW_END<=119: 220 visits guarantees >=100 terminal
  } catch (e) { threw2 = e; }
  gate('tube terminates into vault-seal garbage', threw2 === null && term > 100, `terminal=${term}/220 in ${Date.now() - t1}ms`);
}
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

// ---- part 2: loader enum->tube route + vault behavior (shared page ctx) ----
async function runSharedCtx(src, w) {
  const logs = [];
  w.__captured = undefined; w.__capLen = undefined;
  const sandbox = { window: w, console: { log: (...a) => logs.push(a.join(' ')), clear() {} }, Array, Uint8Array, String, Math };
  const ctx = vm.createContext(sandbox);
  w.eval = (code) => {
    if (typeof code === 'string' && code.includes('(function legacyReel(')) return vm.runInContext(code, ctx);
    w.__captured = code;
  };
  vm.runInContext(src, ctx, { filename: 'runner.js' });
  const t0 = Date.now();
  let lastChange = 0;
  for (;;) {
    await new Promise(r => setTimeout(r, 50));
    if (w.__captured !== undefined) {
      if (w.__capLen !== w.__captured.length) { w.__capLen = w.__captured.length; lastChange = Date.now(); }
      if (Date.now() - lastChange >= 400) break;
    }
    if (Date.now() - t0 >= 20000) break;
  }
  return { captured: w.__captured ?? null, logs };
}
const RUNNER2 = fs.readFileSync(path.join(REPO2, 'Active', 'Stego', 'output-stego10', 'O8.10-runner.js'), 'utf8');
const MINREAL2 = fs.readFileSync(path.join(REPO2, 'Active', 'Stego', 'output-stego10', 'stego10-real.min.js'), 'utf8');
const MINTUBE2 = fs.readFileSync(path.join(REPO2, 'Active', 'Stego', 'output-stego10', 'stego10-tube.min.js'), 'utf8');
const MINHONEY2 = fs.readFileSync(path.join(REPO2, 'Active', 'Stego', 'output-stego10', 'stego10-honey.min.js'), 'utf8');
const MINDECOY2 = fs.readFileSync(path.join(REPO2, 'Active', 'Stego', 'output-stego10', 'stego10-decoy.min.js'), 'utf8');
const withName = (src, nm) => {
  const i = src.indexOf(DEFNAME2);
  if (i < 0 || i > 200) throw new Error('Line-1 name anchor not first');
  return src.replace(DEFNAME2, nm);
};
const TUBE_MARKERS = ['vault seal', 'deriving layer key', 'cache row '];
{
  // name-enumeration across 5 pastes, one page: 5th diverts (4 changes >= 4)
  const w = fakeWindow({ tileFeed: true });
  const names = ['田中 花子', '鈴木 一郎', '高橋 次郎', '渡辺 三郎', '山本 四郎'];
  const caps = [];
  for (const nm of names) caps.push(await runSharedCtx(withName(RUNNER2, nm), w));
  gate('enum: first 4 pastes serve decoy byte-exact (renamed Line1)',
    caps.slice(0, 4).every((c, i) => c.captured === personalize(MINDECOY2, 2, names[i])), caps.map(c => c.captured === null ? 'NONE' : c.captured.length + 'B').join(','));
  gate('enum: 5th paste diverts to tube byte-exact',
    caps[4].captured === personalize(MINTUBE2, 2, names[4]), (caps[4].captured === null ? 'NONE' : caps[4].captured.length + 'B') + ' want ' + personalize(MINTUBE2, 2, names[4]).length + 'B');
  gate('enum: pre-diversion serves no tube markers',
    caps.slice(0, 4).every((c) => c.captured !== null && !TUBE_MARKERS.some((mk) => c.captured.includes(mk))));
}
{
  // venue-enum on ONE clean page: decoy -> tg -> teams -> slack -> zoom(tube)
  const w = fakeWindow({});
  const caps = [];
  caps.push(await runSharedCtx(RUNNER2, w)); // clean baseline: decoy
  w.Telegram = { WebApp: {} };
  caps.push(await runSharedCtx(RUNNER2, w)); // tg: courtesy (nVen 1)
  delete w.Telegram; w.microsoftTeams = {};
  caps.push(await runSharedCtx(RUNNER2, w)); // teams: courtesy (nVen 2)
  delete w.microsoftTeams;
  w.navigator = { userAgent: 'Mozilla/5.0 Slack/4.36' }; w.location = { hostname: 'example.com' };
  caps.push(await runSharedCtx(RUNNER2, w)); // slack: courtesy (nVen 3)
  delete w.navigator; delete w.location; w.ZoomMtg = {};
  caps.push(await runSharedCtx(RUNNER2, w)); // zoom: 4th change -> tube
  gate('venue-enum: decoy/honey, switch fail-open, then tube',
    caps[0].captured === personalize(MINDECOY2, 2, DEFNAME2) && caps[1].captured === personalize(MINHONEY2, 2, DEFNAME2) && caps[2].captured === personalize(MINDECOY2, 2, DEFNAME2) && caps[3].captured === personalize(MINDECOY2, 2, DEFNAME2),
    caps.map(c => c.captured === null ? 'NONE' : c.captured.length + 'B').join(',') + ' (switch->decoy is pre-existing fail-open)');
  gate('venue-enum: 5th diverts to tube byte-exact',
    caps[4].captured === personalize(MINTUBE2, 2, DEFNAME2), (caps[4].captured === null ? 'NONE' : caps[4].captured.length + 'B'));
}
{
  // vault behavior: progress without reject, same-PIN stable, garbage only
  const vctx = { console: { log: () => {} } };
  vm.createContext(vctx);
  const vlogs = [];
  vctx.console.log = (s) => vlogs.push(String(s));
  vm.runInContext(MINTUBE2, vctx);
  const t1 = vm.runInContext('vaultTry("1234")', vctx);
  const t2 = vm.runInContext('vaultTry("1234")', vctx);
  const t3 = vm.runInContext('vaultTry("9999")', vctx);
  gate('vault: same-PIN stable, distinct-PIN distinct', t1 === t2 && t1 !== t3);
  gate('vault: progress without reject', (t1.match(/deriving layer key/g) || []).length >= 5 && !/wrong|invalid|denied|fail|error/i.test(t1 + t3), (t1.match(/deriving layer key/g) || []).length + ' progress lines');
  gate('vault: garbage only (no real markers)', !['rehearsal v2 sealed', 'ledger closed', 'GoogleUnlock', 'Pixel Garden v2.0'].some((mk) => (t1 + t3).includes(mk)));
  gate('vault: auto-demo on load', vlogs.length >= 6 && vlogs.some((l) => l.includes('deriving layer key')), vlogs.length + ' logs');
  let threw = null;
  const t0 = Date.now();
  try { for (let i = 0; i < 50; i++) vm.runInContext(`vaultTry("pin${i}")`, vctx); } catch (e) { threw = e; }
  gate('vault: 50 PINs bounded, never throws', threw === null && Date.now() - t0 < 5000, `${Date.now() - t0}ms`);
}

console.log(failures ? `TRAP-TUBE: ${failures} GATE(S) MISSED` : 'TRAP-TUBE: ALL GATES PASS');
process.exit(failures ? 1 : 0);
