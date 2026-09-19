// Build separate CC-04 and CC-05 candidate trees from the verified CC-02+03 source.
// No O8.13 file is written. The outputs are raw candidate assemblies, not releases.
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
const tags = ['a', 'm', 'n1', 'e', 'n2', 'aux', 'u', 'p-telegram', 'p-teams', 'p-zoom', 'p-slack', 'p-discord'];
const stitcher = path.join(ROOT, 'Active/O8.13/tools/stitch-o85.py');
const base = path.join(ROOT, 'Active/O8.14/CC-02-03/source/shards');
const cc04 = path.join(ROOT, 'Active/O8.14/CC-04-VM-S');
const cc05 = path.join(ROOT, 'Active/O8.14/CC-05-Parser');

for (const p of [stitcher, base, ...tags.map((t) => path.join(base, `shard-${t}.js`))]) {
  if (!fs.existsSync(p)) throw new Error(`Missing input: ${rel(p)}`);
}

const vmStart = '      const _0xvmExec = (prog, vars) => {';
const vmEnd = '\n      };';
const oldVm = (source) => {
  const a = source.indexOf(vmStart);
  if (a < 0) throw new Error('VM-S source anchor missing');
  const b = source.indexOf(vmEnd, a);
  if (b < 0) throw new Error('VM-S source end missing');
  return source.slice(a, b + vmEnd.length);
};

const boundedVm = `      const _0xvmCaps = Object.freeze({ maxProgram: 64, maxOps: 128, maxStack: 32, maxVars: 32, maxMs: 25 });
      const _0xvmExec = (prog, vars) => {
        if (!Array.isArray(prog) || prog.length === 0 || prog.length > _0xvmCaps.maxProgram) throw new Error('vm-length');
        if (!vars || typeof vars !== 'object' || Array.isArray(vars)) throw new Error('vm-vars');
        const st = [], vs = Object.create(null), table = Object.create(null);
        const keys = Object.keys(vars);
        if (keys.length > _0xvmCaps.maxVars) throw new Error('vm-vars');
        for (const key of keys) {
          const value = vars[key];
          if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('vm-value');
          vs[key] = value;
        }
        const k = _0xruntimeKeyReady ? _0xruntimeKey : 0x6d7f0c87;
        const slot = op => ((op ^ (k & 255)) + ((k >>> 8) & 31)) & 255;
        const push = value => {
          if (st.length >= _0xvmCaps.maxStack) throw new Error('vm-stack');
          if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error('vm-value');
          st.push(value);
        };
        const pop = () => { if (!st.length) throw new Error('vm-stack'); return st.pop(); };
        const keyAt = (pc) => {
          const key = prog[pc + 1];
          if (typeof key !== 'string' || key.length === 0 || key.length > 32) throw new Error('vm-key');
          return key;
        };
        const bind = (op, fn) => { table[slot(op)] = fn; };
        bind(0x01, (pc) => push(prog[pc + 1]));
        bind(0x02, (pc) => { const key = keyAt(pc); if (!Object.hasOwn(vs, key)) throw new Error('vm-key'); push(vs[key]); });
        bind(0x03, () => { const b = pop(), a = pop(); push(a + b); });
        bind(0x04, () => { const b = pop(), a = pop(); push(a - b); });
        bind(0x05, () => { const b = pop(), a = pop(); push(a * b); });
        bind(0x09, (pc) => { const key = keyAt(pc), value = pop(); if (!Object.hasOwn(vs, key) && Object.keys(vs).length >= _0xvmCaps.maxVars) throw new Error('vm-vars'); vs[key] = value; });
        bind(0x0D, () => { const b = pop(), a = pop(); push(Math.max(a, b)); });
        bind(0x0F, () => pop());
        const started = Date.now();
        let pc = 0, ops = 0;
        for (;;) {
          if (++ops > _0xvmCaps.maxOps || Date.now() - started > _0xvmCaps.maxMs) throw new Error('vm-budget');
          if (pc < 0 || pc >= prog.length || !Number.isInteger(prog[pc])) throw new Error('vm-op');
          const op = prog[pc], width = (op === 0x01 || op === 0x02 || op === 0x09) ? 2 : 1;
          if (pc + width > prog.length) throw new Error('vm-length');
          const fn = table[slot(op)];
          if (typeof fn !== 'function') throw new Error('vm-op');
          const out = fn(pc);
          if (op === 0x0F) return out;
          pc += width;
        }
      };`;

const boundedParserVm = `      const _0xparseData = (text) => {
        if (typeof text !== 'string' || text.length === 0 || text.length > 128) throw new Error('data-length');
        const names = { p: 'maxProgram', o: 'maxOps', s: 'maxStack', v: 'maxVars', t: 'maxMs' };
        const out = Object.create(null), fields = text.split(';');
        if (fields.length !== 5) throw new Error('data-fields');
        for (const field of fields) {
          const eq = field.indexOf('=');
          if (eq <= 0 || eq !== field.lastIndexOf('=') || eq === field.length - 1) throw new Error('data-field');
          const key = field.slice(0, eq), raw = field.slice(eq + 1);
          if (!Object.hasOwn(names, key) || Object.hasOwn(out, key) || !/^(?:0|[1-9][0-9]*)$/.test(raw)) throw new Error('data-field');
          const value = Number(raw);
          if (!Number.isSafeInteger(value) || value <= 0 || value > 100000) throw new Error('data-value');
          out[key] = value;
        }
        return Object.freeze({ maxProgram: out.p, maxOps: out.o, maxStack: out.s, maxVars: out.v, maxMs: out.t });
      };
      const _0xvmCaps = _0xparseData('p=64;o=128;s=32;v=32;t=25');
${boundedVm.slice(boundedVm.indexOf(vmStart))}`;

function patchVm(source, withParser) {
  let working = source;
  if (withParser) {
    const oldCaps = '      const _0xvmCaps = Object.freeze({ maxProgram: 64, maxOps: 128, maxStack: 32, maxVars: 32, maxMs: 25 });\n';
    if (working.split(oldCaps).length !== 2) throw new Error('CC-05 old VM caps anchor missing or duplicated');
    working = working.replace(oldCaps, '');
  }
  const prior = oldVm(working);
  const next = withParser ? boundedParserVm : boundedVm;
  return working.replace(prior, next);
}

function makeCandidate(target, baseDir, withParser) {
  const sourceDir = path.join(target, 'source/shards');
  const candidatePath = path.join(target, 'candidate', withParser ? 'cc05-parser-raw-bundle.js' : 'cc04-vm-s-raw-bundle.js');
  const frozenInputSha256 = {};
  const candidateSourceSha256 = {};
  for (const tag of tags) {
    const srcPath = path.join(baseDir, `shard-${tag}.js`);
    const source = read(srcPath);
    frozenInputSha256[rel(srcPath)] = sha256(source);
    const next = tag === 'e' ? patchVm(source, withParser) : source;
    const outPath = path.join(sourceDir, `shard-${tag}.js`);
    write(outPath, next);
    candidateSourceSha256[rel(outPath)] = sha256(next);
  }
  fs.mkdirSync(path.dirname(candidatePath), { recursive: true });
  execFileSync('python3', [stitcher, ...tags.map((tag) => path.join(sourceDir, `shard-${tag}.js`)), candidatePath], { stdio: 'inherit' });
  execFileSync(process.execPath, ['--check', candidatePath], { stdio: 'inherit' });
  const report = {
    schema: withParser ? 'cc05-candidate/v1' : 'cc04-candidate/v1',
    candidate: withParser ? 'CC-05' : 'CC-04',
    status: 'candidate-only',
    baseCandidate: withParser ? 'CC-04' : 'CC-02+03',
    fac: withParser ? ['FaC-02', 'FaC-06', 'FaC-09', 'FaC-10', 'FaC-16'] : ['FaC-02', 'FaC-05', 'FaC-06', 'FaC-09', 'FaC-16'],
    candidateBundle: rel(candidatePath),
    frozenInputSha256,
    candidateSourceSha256,
    frozenInputsUnchanged: true,
    promotion: { target: null, liveEligible: false },
  };
  write(path.join(target, 'reports/build.json'), JSON.stringify(report, null, 2) + '\n');
}

makeCandidate(cc04, base, false);
makeCandidate(cc05, path.join(cc04, 'source/shards'), true);
console.log('CC-04 and CC-05 candidate trees built; no frozen O8.13 files written.');
