// Remove the non-working Alt+Shift+R path from the CC-05 live-test candidate and
// replace its end-of-run instruction with the operator's actual workflow.
// This is an O8.14 candidate-only edit; O8.13-r3 is never written.
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

const cc05 = path.join(ROOT, 'Active/O8.14/CC-05-Parser');
const sourceDir = path.join(cc05, 'source/shards');
const sourcePath = path.join(sourceDir, 'shard-e.js');
const bundlePath = path.join(cc05, 'candidate/cc05-parser-raw-bundle.js');
const runnerDir = path.join(ROOT, 'Active/O8.14/14r1');
const runnerPath = path.join(runnerDir, 'O8.14-14r1-runner.js');
const stitcher = path.join(ROOT, 'Active/O8.13/tools/stitch-o85.py');
const tags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];

let source = read(sourcePath);
const oldArmed = 'let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;';
if (source.split(oldArmed).length !== 2) throw new Error('operator-state anchor missing or duplicated');
source = source.replace(oldArmed, 'let _0xkill = false, _0xpaus = false, _0xheat = 1;');

const chordStart = '      _0xchord = (e) => {\n';
const chordEnd = '      _0xe8a7(() => document.removeEventListener("keydown", _0xchord, true));';
const a = source.indexOf(chordStart);
const b = source.indexOf(chordEnd, a);
if (a < 0 || b < 0) throw new Error('operator chord block anchors missing');
const xOnlyChord = `      _0xchord = (e) => {
        if (!(e.altKey && e.shiftKey)) return;
        const key = String(e?.key ?? '').toLowerCase();
        if (key === 'x' && !_0xkill) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(6), _0xlex.P(25,[_0xed(7115),_0xed(7175),_0xed(7246),_0xed(7312),_0xed(7375),_0xed(7436),_0xed(7500),_0xed(7565),_0xed(7631),_0xed(7690),_0xed(7750),_0xed(7814),_0xed(7875),_0xed(7935),_0xed(7994)])); }
      };
      document.addEventListener("keydown", _0xchord, true);
`;
source = source.slice(0, a) + xOnlyChord + source.slice(b + chordEnd.length);

const finishStart = '        if (didWork || _0xkill || signal.aborted) { _0xarmed = true;';
const finishEnd = '\n        else { GoogleScuttle(); GoogleRelease();';
const c = source.indexOf(finishStart);
const d = source.indexOf(finishEnd, c);
if (c < 0 || d < 0) throw new Error('operator finish block anchors missing');
source = source.slice(0, c) + '        if (didWork || _0xkill || signal.aborted) { Log.say(_0xlex.C(9), "F5 whilst in console"); }' + source.slice(d);

write(sourcePath, source);
const shardPaths = tags.map((tag) => path.join(sourceDir, `shard-${tag}.js`));
execFileSync('python3', [stitcher, ...shardPaths, bundlePath], { stdio: 'inherit' });
execFileSync(process.execPath, ['--check', bundlePath], { stdio: 'inherit' });

const bundle = read(bundlePath);
const runner = `/* O8.14-14r1 diagnostic candidate — CC-02+03+04+05; candidate-only */\n(()=>{const _s=${JSON.stringify(bundle)};(0,eval)(_s);})();\n`;
write(runnerPath, runner);
const buildPath = path.join(runnerDir, 'BUILD.json');
const build = JSON.parse(read(buildPath));
build.operatorRefresh = {
  removed: 'Alt+Shift+R reload chord and its listener branch',
  retained: 'Alt+Shift+X abort chord',
  completionInstruction: 'F5 whilst in console',
  source: rel(sourcePath),
};
build.sourceBundleSha256 = sha256(bundle);
build.sourceBundleBytes = Buffer.byteLength(bundle);
build.runnerBytes = Buffer.byteLength(runner);
build.runnerSha256 = sha256(runner);
write(buildPath, JSON.stringify(build, null, 2) + '\n');
const buildBytes = read(buildPath);
write(path.join(runnerDir, 'SHA256SUMS.txt'), `${sha256(runner)}  O8.14-14r1-runner.js\n${sha256(buildBytes)}  BUILD.json\n`);
console.log(`patched ${rel(sourcePath)}`);
console.log(`rebuilt ${rel(bundlePath)} sha256=${sha256(bundle)}`);
console.log(`rebuilt ${rel(runnerPath)} sha256=${sha256(runner)}`);
