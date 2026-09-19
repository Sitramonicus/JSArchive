(function (_0xmod) {
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
