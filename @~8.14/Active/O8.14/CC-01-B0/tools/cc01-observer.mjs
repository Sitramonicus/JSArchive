// CC-01/B0 measurement-only observers. No host capability is created here.
import crypto from 'node:crypto';

const monoMs = () => Number(process.hrtime.bigint() / 1000000n);

export function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export function summarizeValue(value, depth = 0) {
  if (depth > 2) return { type: typeof value };
  if (value === null) return { type: 'null' };
  if (Array.isArray(value)) return { type: 'array', length: value.length };
  if (typeof value === 'string') return { type: 'string', length: value.length };
  if (typeof value === 'number') return { type: 'number', finite: Number.isFinite(value) };
  if (typeof value === 'boolean') return { type: 'boolean' };
  if (typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return { type: 'object', keys: keys.slice(0, 32), keyCount: keys.length };
  }
  return { type: typeof value };
}

export function makeEvaluatorTrace() {
  const events = [];
  let sequence = 0;
  const held = [];
  const hook = (code, evaluator = () => undefined) => {
    const text = String(code);
    const id = ++sequence;
    const opened = monoMs();
    const event = {
      id,
      kind: 'decode-evaluator-boundary',
      phase: 'open',
      atMs: opened,
      codeLength: text.length,
      codeSha256: sha256(text),
    };
    events.push(event);
    held.push({ id, text, opened });
    try {
      return evaluator(text);
    } finally {
      const closed = monoMs();
      events.push({
        id,
        kind: 'decode-evaluator-boundary',
        phase: 'close',
        atMs: closed,
        elapsedMs: Math.max(0, closed - opened),
        released: false,
      });
    }
  };
  const release = () => {
    const releasedAtMs = monoMs();
    while (held.length) {
      const item = held.shift();
      events.push({
        id: item.id,
        kind: 'decoded-buffer-lifetime',
        phase: 'release',
        atMs: releasedAtMs,
        heldMs: Math.max(0, releasedAtMs - item.opened),
        codeLength: item.text.length,
        codeSha256: sha256(item.text),
        released: true,
      });
    }
  };
  return {
    hook,
    release,
    events,
    summary() {
      const opens = events.filter(e => e.phase === 'open');
      const releases = events.filter(e => e.phase === 'release');
      return {
        evaluatorCalls: opens.length,
        codeLengths: opens.map(e => e.codeLength),
        codeSha256: opens.map(e => e.codeSha256),
        releasedBuffers: releases.length,
        events,
      };
    },
  };
}

export function makeHostTrace() {
  const calls = [];
  const wrap = (role, fn) => async (options = {}) => {
    const started = monoMs();
    const record = {
      role,
      method: role.toLowerCase().includes('get') ? 'GET' : 'POST',
      startedAtMs: started,
      urlShape: typeof options.url === 'string' ? options.url.replace(/[0-9a-f]{8,}/gi, ':id') : null,
      body: summarizeValue(options.body),
    };
    try {
      const result = await fn(options);
      record.status = result?.status ?? 200;
      record.ok = true;
      record.finishedAtMs = monoMs();
      calls.push(record);
      return result;
    } catch (error) {
      record.status = error?.status ?? 0;
      record.ok = false;
      record.errorType = error?.name ?? 'Error';
      record.finishedAtMs = monoMs();
      calls.push(record);
      throw error;
    }
  };
  return {
    calls,
    wrap,
    summary() {
      const byMethod = {};
      for (const call of calls) byMethod[call.method] = (byMethod[call.method] ?? 0) + 1;
      return { callCount: calls.length, byMethod, calls };
    },
  };
}

export function makeBranchLedger() {
  const rows = [];
  return {
    record(id, branch, detail = {}) { rows.push({ id, branch, detail }); },
    rows,
    summary() {
      const byBranch = {};
      for (const row of rows) byBranch[row.branch] = (byBranch[row.branch] ?? 0) + 1;
      return { scenarioCount: rows.length, byBranch, rows };
    },
  };
}

export function memorySample(label) {
  const m = process.memoryUsage();
  return {
    label,
    rss: m.rss,
    heapTotal: m.heapTotal,
    heapUsed: m.heapUsed,
    external: m.external,
    arrayBuffers: m.arrayBuffers,
  };
}
