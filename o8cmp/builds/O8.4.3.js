console.clear();
(() => {
  let _0xopen = false; // diagnostics gate (log-lock)
  // --- LOGGING MODULE ---
  // 0 = Logging disabled, 1 = Default operational logging, 2 = Extensive diagnostics
  const LOG_LEVEL = 2; 
  const Log = (() => {
    const noop = () => {};
    if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop };
    return {
      say: (c, m) => console.debug(`[Google ${c}] ${m}`),
      diag: (m, d) => { if (LOG_LEVEL >= 2 && _0xopen) d !== undefined ? console.debug(`[O8-DIAG] ${m}`, d) : console.debug(`[O8-DIAG] ${m}`); },
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m)
    };
  })();

  
      // Diagnostics unlock (log-lock): salted digest only, never the passphrase.
      const _0xsalt = String.fromCharCode(...[82,66,97,97,43,44,103,112,35,86,37,119,38,37,84,109,124,42,103,56,86,95,123,64,49,67,33,81]);
      const _0xwant = "201f1688cc9ac88301d578cfa6d1e6408dde219cd7b11dda70a184945b917204";
      const GoogleUnlock = async (pw) => {
        try {
          if (!(window.crypto && window.crypto.subtle)) { Log.warn("[Quest] Diagnostics unlock unavailable in this context."); return false; }
          const _0buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(_0xsalt + String(pw ?? "")));
          const _0hex = Array.from(new Uint8Array(_0buf)).map(b => b.toString(16).padStart(2, "0")).join("");
          if (_0hex === _0xwant) { _0xopen = true; Log.info("[Quest] Diagnostics unlocked for this session."); return true; }
          Log.warn("[Quest] Unlock passphrase rejected.");
          return false;
        } catch (e) { Log.warn("[Quest] Unlock failed: " + (e && e.message ? e.message : e)); return false; }
      };
      try { window.GoogleUnlock = GoogleUnlock; } catch (e) {}
      const SUITE_VERSION = "O.8.4.3";
  const INSTANCE_ID = "4df602e0";
  Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);
  Log.diag(`O8.4.3 core — uniform phrase pools, log-lock, studio gaps, refill queue, metamorphic decode.`);
  
  // [RESTORED] Experimental configuration summary
  Log.diag("Experimental configuration", {
    delayModel: "lognormal",
    lazyForcer: true,
    lazyForceLimit: 50,
    timestampModel: "monotonic-five-decimal",
    promiseHandoff: true,
    randomizedIdentityFallback: true,
    randomizedActivityKey: true,
    studioGaps: true,
  });

  // ── client-state readout region ──
  const MemberCount = (() => {
    const _0xk = 113;
    const _0xds = a => String.fromCharCode(...a.map(c => c ^ _0xk));
    const S = {
      mc: _0xds([28,20,28,19,20,3,50,30,4,31,5]), amc: _0xds([16,1,1,3,30,9,24,28,16,5,20,60,20,28,19,20,3,50,30,4,31,5]), mcu: _0xds([28,20,28,19,20,3,46,18,30,4,31,5]), mem: _0xds([28,20,28,19,20,3,2]),
      oc: _0xds([30,31,29,24,31,20,50,30,4,31,5]), pc: _0xds([1,3,20,2,20,31,18,20,50,30,4,31,5]), apc: _0xds([16,1,1,3,30,9,24,28,16,5,20,33,3,20,2,20,31,18,20,50,30,4,31,5]), ocu: _0xds([30,31,29,24,31,20,46,18,30,4,31,5]),
      n0: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,63,30,81,28,20,28,19,20,3,81,2,5,16,5,24,2,5,24,18,2,81,16,3,20,81,18,4,3,3,20,31,5,29,8,81,16,7,16,24,29,16,19,29,20,81,24,31,81,29,30,18,16,29,81,18,29,24,20,31,5,81,2,5,16,5,20,95]), n1: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,60,20,28,19,20,3,2,75,81]), n2: _0xds([81,13,81,62,31,29,24,31,20,75,81]), n3: _0xds([42,60,20,28,19,20,3,50,30,4,31,5,44,81,61,30,18,16,29,81,28,20,28,19,20,3,81,21,16,5,16,81,18,30,4,29,21,81,31,30,5,81,19,20,81,3,20,16,21,95]), ua: _0xds([4,31,16,7,16,24,29,16,19,29,20])
    };
    // readout bookkeeping (local to this region)
    const _0xwindows = [1, 5, 15, 60];
    const _0xseen = new Set();
    const _0xspan = (a, b) => { const t = String(a).length + (b ? String(b).length : 0); return t; };
    const _0xnote = (tag, value) => { try { if (_0xseen.size < 128) _0xseen.add(String(tag) + ":" + String(value)); } catch (e) {} return _0xseen.size; };
    const _0xframe = { rank: 0, peak: 0, span: 0 };
    const _0xfold = () => { _0xframe.span = _0xwindows[0]; return _0xframe.span; };
    const _0xlog = { samples: 0, lastAt: 0, total: null };
    const _0xemit = s => { try { console.debug(s); } catch (e) {} };
    const number = v => Number.isFinite(v) ? v : null;
    const pick = (o, keys) => {
      if (!o || typeof o !== "object") return null;
      for (const kk of keys) { const n = number(o[kk]); if (n !== null) return n; }
      return null;
    };
    const inspect = source => {
      let total = null, online = null;
      const processItem = item => {
        if (!item || typeof item !== "object") return;
        const itemTotal = pick(item, [S.mc, S.amc, S.mcu]);
        const itemOnline = pick(item, [S.oc, S.pc, S.apc, S.ocu]);
        if (itemTotal !== null) total = (total ?? 0) + itemTotal;
        if (itemOnline !== null) online = (online ?? 0) + itemOnline;
        const guildLike = item[S.mc] != null || item[S.amc] != null || item[S.mcu] != null || item[S.mem];
        if (guildLike && itemTotal === null && item[S.mem] && typeof item[S.mem] === "object") {
          if (item[S.mem] instanceof Map) total = (total ?? 0) + item[S.mem].size;
          else { let count = 0; for (const kk in item[S.mem]) { if (Object.hasOwn(item[S.mem], kk)) count++; } total = (total ?? 0) + count; }
        }
      };
      if (source instanceof Map) source.forEach(processItem);
      else if (source && typeof source === "object") { for (const kk in source) { if (Object.hasOwn(source, kk)) processItem(source[kk]); } }
      return { total, online };
    };
    return {
      report: (...sources) => {
        try {
          let result = { total: null, online: null };
          for (const source of sources) {
            const found = inspect(source);
            if (result.total === null && found.total !== null) result.total = found.total;
            if (result.online === null && found.online !== null) result.online = found.online;
            if (result.total !== null && result.online !== null) break;
          }
          if (result.total === null && result.online === null) {
            _0xemit(S.n0);
            return result;
          }
          const suffix = result.online === null ? "" : `${S.n2}${result.online}`;
          _0xlog.samples++;
          _0xlog.lastAt = Date.now();
          _0xlog.total = result.total;
          _0xemit(`${S.n1}${result.total ?? S.ua}${suffix}`);
          return result;
        } catch (e) {
          _0xemit(S.n3);
          return { total: null, online: null };
        }
      },
      summary: () => {
        try {
          if (_0xlog.total === null || _0xlog.samples === 0) return;
          if (Date.now() - _0xlog.lastAt < 60000) return;
          const t = _0xlog.total;
          _0xemit(`[MemberCount] Still watching ${t} server${t === 1 ? "" : "s"} — nothing unusual.`);
        } catch (e) {}
      }
    };
  })();
  // ── end client-state readout region ──
  const _0xrunKey = Symbol.for("quest-suite:o8:active");
  if (window[_0xrunKey]) {
    Log.warn("[Quest O8] An O.8 run is already active; no second run was started.");
    return;
  }
  
  const controller = new AbortController();
  const signal = controller.signal;
  const disposables = [];
  const _0x4ad3 = new Set();
  
  const _0xcb43 = (fn) => {
    disposables.push(fn);
    return () => {
      const i = disposables.indexOf(fn);
      if (i > -1) disposables.splice(i, 1);
    };
  };

  const _0xrunOwner = { released: false };
  window[_0xrunKey] = _0xrunOwner;
  
  const GoogleRelease = () => {
    if (_0xrunOwner.released) return;
    _0xrunOwner.released = true;
    const toDispose = disposables.splice(0, disposables.length);
    try { controller.abort(); } catch (e) {}
    while (toDispose.length) { try { toDispose.pop()(); } catch (e) {} }
    while (disposables.length) { try { disposables.pop()(); } catch (e) {} }
    try { if (window[_0xrunKey] === _0xrunOwner) delete window[_0xrunKey]; } catch (e) {}
  };

  let _0xwatch = null, _0xchord = null;
  const GoogleScuttle = () => {
    try { if (_0xwatch !== null) { clearInterval(_0xwatch); _0xwatch = null; } } catch (e) {}
    try { if (_0xchord !== null) { document.removeEventListener("keydown", _0xchord, true); _0xchord = null; } } catch (e) {}
  };
  _0xcb43(GoogleScuttle);

  (async () => {
    try {
      // ── Juggler decode, metamorphic instance 4df602e0 (O.8.4.3) ──
      const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45];
      const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");
      const _0xT = [211,214,112,86,114,6,129,168,16,93,185,33,82,134,180,91,186,181,171,46,30,209,148,32,24,0,29,57,141,233,50,252,166,146,118,220,25,142,51,248,98,165,188,223,156,145,221,101,108,182,196,9,15,218,40,161,76,61,133,240,219,49,21,160,195,144,62,155,7,26,39,58,110,127,2,167,73,90,53,246,241,119,224,239,48,232,79,92,104,34,120,225,244,189,150,228,12,121,163,38,47,85,204,125,253,147,123,54,242,201,158,255,117,102,136,105,176,226,175,36,66,200,154,231,234,97,193,238,230,250,60,8,3,37,11,153,19,83,194,215,216,13,43,217,96,4,203,14,172,31,159,20,27,192,139,190,10,187,229,132,164,197,17,87,81,199,115,137,191,251,1,245,80,78,18,42,202,67,151,75,84,247,198,65,77,59,28,71,177,157,109,143,162,236,45,35,63,70,116,88,126,227,210,184,103,135,183,56,52,131,140,106,178,23,64,68,89,124,99,213,55,174,94,22,208,206,72,152,179,235,205,173,95,149,170,222,100,254,138,212,237,111,207,41,169,122,128,113,44,249,69,243,130,74,5,107];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; },
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; }
      ];
      const _0xNp = [1,1,0,2];
      const _0xPool = [68,69,65,196,5,196,199,196,65,131,1,199,2,65,64,132,5,128,65,64,5,199,196,69,192,192,65,196,196,125,85,176,144,242,242,48,253,136,85,121,47,105,39,255,136,241,121,136,85,158,176,191,207,251,155,131,251,243,175,219,167,219,175,155,239,48,224,26,144,90,228,246,53,228,7,26,239,167,48,246,241,92,144,48,155,110,228,79,127,7,26,246,228,246,53,228,90,246,62,127,73,26,32,34,51,20,1,16,3,34,33,38,50,43,51,4,47,38,41,41,34,43,191,194,187,187,182,187,180,204,180,174,186,178,192,204,176,181,174,187,180,178,25,64,95,82,83,89,27,70,68,89,81,68,83,69,69,95,145,160,160,156,153,147,145,164,153,159,158,163,95,160,165,146,156,153,147,111,145,160,160,156,153,147,145,164,153,159,158,143,153,148,163,109,101,253,85,121,136,176,163,85,121,176,245,247,230,195,231,247,225,230,224,196,202,238,204,200,216,136,222,228,210,216,198,220,232,200,208,234,198,176,204,238,238,180,182,167,143,141,156,123,151,154,156,141,140,120,154,145,158,137,156,141,107,144,137,150,150,141,148,155];
      const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };
      const _0xJuggle = (_0xs, _0xl) => {
        const _0xf = _0xs[0];
        const _0xn = _0xNp[_0xf];
        let _0xP, _0xb;
        if (_0xs[1] === -7) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }
        else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }
        const _0xd = _0xM[_0xf](_0xb, _0xP);
        const _0ok = _0xJuggleRE.test(_0xd);
        _0xJuggleStats.total++;
        _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;
        Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });
        if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(`[Juggler] ${_0xl}: decoded string failed sanity check (len=${_0xd.length}) - corrupted instance?`); }
        return _0xd;
      };
      let _0xq0 = _0xJuggle([3,-7,212,23,1,14], "_0xq0");
      let _0xq1 = _0xJuggle([1,1,69,106,116,100,112,115,101,79,98,117,106,119,102], "_0xq1");
      let _0xq2 = _0xJuggle([2,101,102,226,85,105,176,105,101], "_0xq2");
      let _0xq3 = _0xJuggle([0,-7,142,15,54], "_0xq3");
      let _0xq4 = _0xJuggle([2,-7,194,10], "_0xq4");
      let _0xq5 = _0xJuggle([1,-7,157,37,48], "_0xq5");
      let _0xt0 = _0xJuggle([1,185,16,250,13,252,1,24,15,2,253,254,8], "_0xt0");
      let _0xt1 = _0xJuggle([3,7,190,150,152,30,18,17,25,153,17,156,28,23,27,148,25,150], "_0xt1");
      let _0xt2 = _0xJuggle([2,-7,64,17], "_0xt2");
      let _0xt3 = _0xJuggle([3,-7,51,13,2,254], "_0xt3");
      let _0xt4 = _0xJuggle([2,-7,81,21], "_0xt4");
      let _0xe0 = _0xJuggle([1,-7,122,20,109], "_0xe0");
      let _0xe1 = _0xJuggle([3,-7,0,29,6,16], "_0xe1");
      let _0xm0 = _0xJuggle([1,143,246,244,3,226,3,1,244,240,252,244,1,208,242,3,248,5,244,226,3,1,244,240,252,220,244,3,240,243,240,3,240], "_0xm0");
      let _0xm1 = _0xJuggle([1,5,108,106,121,87,122,115,115,110,115,108,76,102,114,106,120], "_0xm1");
      let _0xm2 = _0xJuggle([2,125,85,176,58,121,201,85,39,255,136,241,127,7], "_0xm2");
      let _0xm3 = _0xJuggle([0,-7,204,8,146], "_0xm3");
      let _0xm4 = _0xJuggle([2,-7,29,22], "_0xm4");
      let _0xm5 = _0xJuggle([0,-7,102,20,71], "_0xm5");
      let _0xm6 = _0xJuggle([0,171,205,199,222,216,195,252,202,194,223,250,222,206,222,206], "_0xm6");
      let _0xm7 = _0xJuggle([0,-7,235,3,211], "_0xm7");
      let _0xm8 = _0xJuggle([1,-7,238,24,40], "_0xm8");
      let _0xm9 = _0xJuggle([1,219,66,64,79,28,71,71,34,80,68,71,63,78], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "4df602e0" });
      // ── end juggler decode ──








      let _0x1 = window[_0xq0];
      let _0x2 = null;
      if (!_0x1 || typeof _0x1.push !== "function" || typeof _0x1.pop !== "function") {
        Log.say("Mishap", "The module doorway is not there — ending the run here.");
        GoogleRelease();
        return;
      }

      const _0xlengthBefore = _0x1.length;
      let _0xpushResult;

      try {
        _0xpushResult = _0x1.push([[Symbol()], {}, r => r]);
      } finally {
        if (_0x1.length > _0xlengthBefore) _0x1.pop();
      }

      if (_0xpushResult && typeof _0xpushResult.c === "object") {
        _0x2 = _0xpushResult;
      } else if (typeof _0x1.c === "object") {
        _0x2 = _0x1;
      }

      if (!_0x2 || typeof _0x2.c !== "object") {
        Log.say("Blunder", "The module doorway returned no usable runtime — calling it a day.");
        GoogleRelease();
        return;
      }

      // [RESTORED] Runtime selection diagnostics
      Log.diag("Runtime selected", {
        isPushReturn: _0x2 === _0xpushResult,
        isChunkArray: _0x2 === _0x1,
        cacheCount: (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })(),
        definitionCount: (() => { try { return Object.keys(_0x2.m ?? {}).length; } catch (_) { return -1; } })()
      });

      // [IMPROVED] Lazy Forcer with cache delta tracking
      if (_0x2.m) {
        const targets = [_0xm0, _0xm1, _0xm2, _0xm3, _0xm4, _0xm5, _0xm6, _0xm7, _0xm8, _0xm9];
        let forcedCount = 0;
        const cacheBefore = (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })();
        
        for (const id in _0x2.m) {
          if (forcedCount >= 50) break;
          if (_0x2.c[id]) continue;
          let text = "";
          try { text = _0x2.m[id].toString(); } catch (e) {}
          if (targets.some(t => text.includes(t))) { 
            try { _0x2(id); forcedCount++; } catch (e) {} 
          }
        }
        
        const cacheAfter = (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })();
        Log.diag("Lazy Force", { forcedCount, cacheBefore, cacheAfter, cacheDelta: cacheAfter - cacheBefore });
      }

      const _0xDeep = (o, k) => {
        let hops = 0;
        const seen = new WeakSet();
        for (; o && hops < 20; o = Object.getPrototypeOf(o), hops++) {
          if (typeof o !== "object" && typeof o !== "function") break;
          if (seen.has(o)) break;
          seen.add(o);
          if (k in o) return true;
        }
        return false;
      };

      const GoogleRead = (obj, key) => { try { return obj?.[key]; } catch (e) { return undefined; } };
      const GoogleHas = (obj, key) => { try { return !!obj && _0xDeep(obj, key); } catch (e) { return false; } };
      
      let _0x3, _0x4, _0x5, _0x6, _0x7, _0x8, _0x9;
      let _0xmodules = [];

      try { _0xmodules = Object.values(_0x2.c); } catch (e) { _0xmodules = []; }
      
      // [RESTORED] Scan count diagnostic
      Log.diag("Scanning modules", { cacheCount: _0xmodules.length });

      for (const m of _0xmodules) {
        const ex = GoogleRead(m, "exports"); if (!ex) continue;
        const exA = GoogleRead(ex, "A"), exAy = GoogleRead(ex, "Ay"), exh = GoogleRead(ex, "h"), exBo = GoogleRead(ex, "Bo");
        if (!_0x3 && GoogleHas(exA, _0xm0)) _0x3 = exA;
        if (!_0x4 && GoogleHas(exAy, _0xm1)) _0x4 = exAy;
        if (!_0x5 && GoogleHas(exA, _0xm3)) _0x5 = exA;
        if (!_0x6 && GoogleHas(exA, _0xm4)) _0x6 = exA;
        if (!_0x7 && GoogleHas(exAy, _0xm5)) _0x7 = exAy;
        if (!_0x8 && GoogleHas(exh, _0xm6)) _0x8 = exh;
        if (!_0x9 && GoogleHas(exBo, _0xm7)) _0x9 = exBo;
        if (_0x3 && _0x4 && _0x5 && _0x6 && _0x7 && _0x8 && _0x9) break;
      }

      const _0xpocketsComplete = !!_0x3 && !!_0x4 && !!_0x5 && !!_0x6 && !!_0x7 && !!_0x8 && !!_0x9;
      
      // [RESTORED] Satchel success/failure diagnostics
      Log.say("Kitbag", "Pockets checked: " + JSON.stringify({
        lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9
      }));

      if (!_0xpocketsComplete) {
        Log.say("Bungle", "A pocket came up empty — stopping here.");
        GoogleRelease();
        return;
      }

      // Comprehensive Pocket Interface Validation
      if (
        typeof _0x3?.[_0xm0] !== 'function' ||
        typeof _0x4?.[_0xm1] !== 'function' ||
        typeof _0x4?.[_0xm2] !== 'function' ||
        typeof _0x5?.quests?.values !== 'function' ||
        typeof _0x6?.[_0xm8] !== 'function' ||
        typeof _0x7?.getAllGuilds !== 'function' ||
        typeof _0x7?.[_0xm9] !== 'function' ||
        typeof _0x8?.dispatch !== 'function' ||
        typeof _0x8?.subscribe !== 'function' ||
        typeof _0x8?.unsubscribe !== 'function' ||
        typeof _0x9?.post !== 'function' ||
        typeof _0x9?.get !== 'function'
      ) {
        Log.say("Stumble", "The pocket interface layer is invalid — ending the run here.");
        GoogleRelease();
        return;
      }
      
      // [RESTORED] Interface validation success diagnostic
      Log.diag("Pocket interfaces validated", { stream: true, desktop: true, quests: true, activity: true, guilds: true, dispatcher: true, http: true });

      // readout call
      try {
        const localGuilds = _0x7.getAllGuilds();
        MemberCount.report(localGuilds);
      } catch (e) { MemberCount.report(); }

      // [O.8.2-Juggler-3] URL-id hardening: recover string ids from wrapper objects,
      // never concatenate an object into a request URL (observed "[object Object]" 404 class).
      const GoogleId = (v, what) => {
        if (typeof v === "string") return v;
        if (typeof v === "number" && Number.isFinite(v)) return String(v);
        if (v && typeof v === "object") {
          try {
            const cands = [v.id, v.applicationId, v.questId, v.application?.id, v.quest?.id, v.guildId, v.activityId];
            for (const _0xc of cands) { if (typeof _0xc === "string" && _0xc) { Log.diag("URL id recovered from object", { what }); return _0xc; } }
          } catch (e) {}
        }
        Log.warn(`[Google] URL id unresolvable (${what}: ${v === null ? "null" : typeof v}) — request will be skipped.`);
        return null;
      };

      const GoogleRoutes = {
        videoProgress: (id) => { const s = GoogleId(id, "questId"); return s ? _0xq2 + s + _0xq3 : null; },
        heartbeat: (id) => { const s = GoogleId(id, "questId"); return s ? _0xq2 + s + _0xq4 : null; },
        applicationsUrl: (id) => { const s = GoogleId(id, "app"); return s ? _0xq5 + s : null; },
        applications: _0xq5,
        tasks: [_0xt0, _0xt1, _0xt2, _0xt3, _0xt4]
      };
      const GoogleTasks = { video: _0xt0, play: _0xt1, stream: _0xt2, activity: _0xt3, videoMobile: _0xt4 };
      
      const GoogleOS = (() => {
        try {
          const p = String(navigator?.platform ?? "").toLowerCase();
          if (p.includes("mac")) return ["darwin", "macos", "win32"];
          if (p.includes("linux")) return ["linux", "win32"];
        } catch (e) {}
        return ["win32", "darwin", "linux"];
      })();
      const _0xplat = (() => {
        try { return String(navigator?.platform ?? "").toLowerCase(); } catch (e) { return ""; }
      })();
      const _0xisMac = _0xplat.includes("mac");
      const _0xisLinux = _0xplat.includes("linux");

      const _0xquestValues = (() => {
        try {
          const values = _0x5.quests.values;
          return typeof values === "function" ? Array.from(values.call(_0x5.quests)) : [];
        } catch (e) { return []; }
      })();
      
      const _0xeligible = _0xquestValues.filter(q => {
        if (!q.userStatus?.enrolledAt || q.userStatus?.completedAt) return false;
        const exp = new Date(q.config?.expiresAt).getTime();
        if (Number.isFinite(exp) && exp <= Date.now() - 5 * 60 * 1000) return false;
        return true;
      });

      const _0x6968 = (cfg, supportedTasks) => {
        if (!cfg || typeof cfg !== "object") return null;
        for (const k of Object.keys(cfg)) {
          if (k.startsWith("taskConfig")) {
            const val = cfg[k];
            if (val && typeof val === "object" && val.tasks && typeof val.tasks === "object") {
              if (supportedTasks.some(t => Object.hasOwn(val.tasks, t))) return val;
            }
          }
        }
        return null;
      };

      let _0xb = _0xeligible.filter(q => {
        const tasks = _0x6968(q.config, GoogleRoutes.tasks)?.tasks;
        return tasks;
      });

      for (let i = _0xb.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_0xb[i], _0xb[j]] = [_0xb[j], _0xb[i]];
      }
      
      Log.say("Tally", `${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today for the run.`);
      const _0xlost = _0xeligible.length - _0xb.length;
      if (_0xlost > 0) Log.say("Agenda", `${_0xlost} left off — shape we can't fold this shift.`);
      
      if (!_0xb.length) { 
        Log.say("Grove", "Nothing on the vines today, not yet — (Press Alt+Shift+R to flush and restart) when ready."); 
        GoogleRelease(); 
        return; 
      }

      let _0xc = typeof window[_0xq1] !== "undefined";
      let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;
      const _0xroute0 = ((1 / 3) * 3) === 1 ? location.pathname : location.pathname.slice(0);
      const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      let _0xlastHidden = null;

      const _0x8cb8 = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      // [RESTORED] Bounded delay sampling
      let delayCount = 0;
      const _0xe768 = ms => {
        delayCount++;
        if (delayCount === 1 || delayCount % 10 === 0) {
          Log.diag("Delay sample", { count: delayCount, milliseconds: Math.round(ms), heat: Number(_0xheat.toFixed(2)) });
        }
      };

      // Human-paced wait: log-normal, median = target, tails clamped (O8.4).
      const _0xln = (ms) => {
        const _0u1 = Math.random() || 1e-9, _0u2 = Math.random() || 1e-9;
        const _0z = Math.sqrt(-2.0 * Math.log(_0u1)) * Math.cos(2.0 * Math.PI * _0u2);
        return Math.min(Math.max(Math.exp(Math.log(ms) + _0z * 0.35), ms * 0.3), ms * 4.0);
      };
      let GoogleDelay = async (d = 1) => {
        if (document.hidden !== _0xlastHidden) {
          _0xlastHidden = document.hidden;
          Log.say("Shade", document.hidden ? "Blinds drawn — taking the long road." : "Blinds open — back to normal.");
        }
        let base = _0xln(d * 1000);
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= _0xheat;
        
        _0xe768(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await _0x8cb8(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0x8cb8(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      // Server-compliance wait: raw ms, no humanization (429 retry_after / 5xx backoff).
      const GoogleDelayRaw = async (ms) => {
        let remaining = Math.max(0, ms);
        while (remaining > 0 && !signal.aborted) {
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0x8cb8(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      _0xchord = (e) => {
        if (!(e.altKey && e.shiftKey)) return;
        const key = String(e?.key ?? '').toLowerCase();
        if (key === 'x' && !_0xkill && !_0xarmed) { _0xkill = true; controller.abort(); Log.say("Bell", "Winding down after this chore — pausing at the checkpoint."); }
        if (key === 'r' && _0xarmed) { Log.say("Welcome", "Giving the rug a shake — see you on the other side."); GoogleRelease(); setTimeout(() => location.reload(), 1500); }
      };
      document.addEventListener("keydown", _0xchord, true);
      _0xcb43(() => document.removeEventListener("keydown", _0xchord, true));

      const GooglePost = _0x9.post.bind(_0x9);
      const GoogleGet = _0x9.get.bind(_0x9);
      const _0xsend = _0x8.dispatch.bind(_0x8);
      const _0xon = _0x8.subscribe.bind(_0x8);
      const _0xoff = _0x8.unsubscribe.bind(_0x8);

      const GoogleCall = (fn, critical = false) => async (opts) => {
        let tries = 0;
        while (tries < 3 && !signal.aborted) {
          try {
            const finalOpts = (opts && typeof opts.url === "string") ? opts : null;
            if (!finalOpts || finalOpts.url === "" || !finalOpts.url.startsWith("/")) {
              Log.warn(`[Google] Request skipped — unusable URL (${opts && opts.url !== null && opts.url !== undefined ? typeof opts.url : "none"}).`);
              return { body: {}, skipped: true };
            }
            const res = await fn(finalOpts);
            if (_0xheat > 1) _0xheat = Math.max(1, _0xheat - 0.1);
            return res;
          } catch (e) {
            const st = e?.status ?? e?.body?.status ?? 0;
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say("Tripup", "Auth stopped holding — packing up."); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say("Vestibule", `The call was throttled — backing off ~${Math.ceil(s)}s, then knocking again.`);
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say("Loggia", `Server error ${st} there — backing off for ${backoff.toFixed(1)}s.`); 
              await GoogleDelayRaw(backoff * 1000); tries++; continue; 
            }
            throw e;
          }
        }
        throw new Error("Max retries exceeded");
      };
      const GooglePostSafe = GoogleCall(GooglePost, true);
      const GoogleGetSafe = GoogleCall(GoogleGet, false);

      const GoogleHook = (obj, key, fn) => {
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say("Kink", `Target ${key} rejects hooks — leaving it untouched.`); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say("Sputter", `Hook mounting for ${key} errored ${e.message}`); return null; }
      };

      const GoogleNative = (fn, nativeStr, nameStr, lenNum) => new Proxy(fn, {
        get(target, prop, receiver) { if (prop === 'toString') return () => nativeStr; if (prop === 'name' && nameStr != null) return nameStr; if (prop === 'length' && lenNum != null) return lenNum; return Reflect.get(target, prop, receiver); },
        getOwnPropertyDescriptor(target, prop) { if (prop === 'toString') return Object.getOwnPropertyDescriptor(Function.prototype, 'toString'); return Reflect.getOwnPropertyDescriptor(target, prop); },
        apply(target, thisArg, args) { return Reflect.apply(target, thisArg, args); },
        has(target, prop) { return prop === 'toString' || Reflect.has(target, prop); },
        deleteProperty() { return false; }, defineProperty() { return false; }
      });

      const GoogleProgress = (data, task, cfgv) => {
        try {
          const candidates = cfgv === 1 ? [data?.userStatus?.streamProgressSeconds, data?.userStatus?.progress?.[task]?.value] : [data?.userStatus?.progress?.[task]?.value, data?.userStatus?.streamProgressSeconds, data?.progress?.[task]?.value];
          const valid = candidates.find(n => { if (n === null || n === undefined || n === "" || typeof n === "boolean") return false; const value = Number(n); return Number.isFinite(value) && value >= 0; });
          return valid === undefined ? null : Number(valid);
        } catch (e) { return null; }
      };

      const _0xee32 = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const _0xa710 = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

      const _0xvideo = async (v) => {
        Log.say("Novel", `Opening the book to ${v.name}.`);
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await GoogleDelay(_0x1c); if (_0xkill || signal.aborted) break;
          if (Math.random() < 0.06) { Log.say("Stove", "A quick steep — then back to it."); await GoogleDelay(18 + Math.random() * 24); if (_0xkill || signal.aborted) break; }
          const lastBeat = v.cur + _0x1c >= v.goal;
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          // [RESTORED] Timestamp sampling
          Log.diag("Timestamp sample", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say("Metronome", `Tock landing whole: ${Number.isInteger(ts)} — grain #${ts}`);
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0xee32(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Meter", `Running tally: ${v.cur.toFixed(2)}/${v.goal}.`);
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say("Medal", `Rounded out: ${v.name}.`);
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0x4ad3.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x4ad3.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Falter", `That chore (${v.name}) needs the main hall — skipping it for now.`); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applicationsUrl(v.app) });
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say("Mischance", "The note for the chore came back empty — skipping."); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say("Pavement", `Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — pane #${_0x1bReal}`);
              const safeName = _0xa710(_0x1f.name); const safeExe = _0xa710(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say("Utensils", "The cutlery drawer was re-sorted: " + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;
              try {
                undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
                undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say("Wrinkle", "The desktop doorway would not open — leaving it for later."); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleDesktopHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                finishTask();
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: _0x4ad3.size }); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0xcb43(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say("Glitch", "Initial state dispatch failed — skipping this one."); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say("Astrolabe", `Current beat: ${_0x26}/${v.goal}`); if (_0x26 >= v.goal) Log.say("Ribbon", `Wrapped up: ${v.name}.`); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say("Snag", "Desktop progress subscription failed — skipping this one."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0x4ad3.size });
              handedOff = true; 
              Log.say("Morsels", `Notes for ${safeName} — dough's got ~${Math.ceil((v.goal - v.cur) / 60)} to go.`);
            } catch (err) {
              finishTask();
              reject(err);
            } finally {
              if (!handedOff) finishTask();
            }
          })();
        });
      };

      const _0xstream = async (v) => {
        const taskId = Symbol(); _0x4ad3.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x4ad3.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Hiccup", `That chore (${v.name}) needs a bigger rig — skipping it for now.`); resolve(); return; }
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say("Walkway", `The floor grid lines up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}`);
              let undo = null;
              try { undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say("Grumble", "The stream doorway would not open — skipping this one."); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleStreamHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                finishTask();
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: _0x4ad3.size }); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0xcb43(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say("Pulse", `Random fraction: ${_0x28}/${v.goal} so far.`); if (_0x28 >= v.goal) Log.say("Banner", `Boxed up: ${v.name}.`); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say("Tangle", "The stream progress feed would not subscribe — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0x4ad3.size });
              handedOff = true; 
              Log.say("Platform", `Show's about to start — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
            } catch (err) {
              finishTask();
              reject(err);
            } finally {
              if (!handedOff) finishTask();
            }
          })();
        });
      };

      const _0xact = async (v) => {
        if (!_0x6 || !_0x7) { Log.say("Mishap", "No arcade doorway could be found — not taking it this shift."); return; }
        let _0x29; try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
        if (!_0x29) { try { const guilds = Object.values(_0x7[_0xm9]()); const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length); if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id; } catch (e) {} if (!_0x29) { Log.say("Blunder", "The arcade cabinet had no doorway — moving on."); return; } }
        let _0x2a = "call:" + _0x29 + ":" + Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        Log.say("Midway", `Dropping coins in the cabinet — (~${Math.ceil((v.goal - v.cur) / 60)} min).`);
        const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
        let tick = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted && Date.now() < _0xactivityDeadline) {
          if (_0xpaus) { await GoogleDelay(3); continue; }
          let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
          const reportedProgress = _0xee32(_0x2b?.body, GoogleTasks.activity);
          if (reportedProgress !== null) v.cur = reportedProgress;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Sextant", `Random fraction: ${v.cur}/${v.goal} so far.`);
          await GoogleDelay(20);
          if (v.cur >= v.goal) { await GoogleDelay(2); if (_0xkill || signal.aborted) break; if (!_0xkill && !signal.aborted) await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } }); break; }
        }
        if (v.cur >= v.goal) Log.say("Star", `Knocked out: ${v.name}.`);
        else if (!_0xkill && !signal.aborted && Date.now() >= _0xactivityDeadline) Log.say("Bungle", `Activity ${v.name} produced no progress before stopping — counting it as stalled.`);
      };

      const GoogleHandlers = { [GoogleTasks.video]: _0xvideo, [GoogleTasks.videoMobile]: _0xvideo, [GoogleTasks.play]: _0xplay, [GoogleTasks.stream]: _0xstream, [GoogleTasks.activity]: _0xact };

      const _0x10 = async (_0x11) => {
        let _0x15 = _0x6968(_0x11.config, GoogleRoutes.tasks);
        if (!_0x15?.tasks) { Log.say("Stumble", "No chores were on the list — leaving it for next time."); return "skipped"; }
        let _0x16 = GoogleRoutes.tasks.find(t => Object.hasOwn(_0x15.tasks, t));
        let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
        let _0x19 = Number(_0x17?.target);
        if (!Number.isFinite(_0x19) || _0x19 <= 0) { Log.say("Tripup", "Chore target did not parse — moving on."); return "skipped"; }
        let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
        if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) { Log.say("Kink", "Chore came without an application id — skipping."); return "skipped"; }
        let _0x1a = _0x11.userStatus?.progress?.[_0x16]?.value ?? 0;
        let _0x1b = Math.floor(Math.random() * 60000) + 4096;
        const fn = GoogleHandlers[_0x16]; if (!fn) return "unsupported";
        await fn({ q: _0x11, taskType: _0x16, name: _0x11.config?.messages?.questName ?? "that quest", app: _0x18, goal: _0x19, cur: _0x1a, pid: _0x1b, cfgv: _0x11.config?.configVersion });
        return "processed";
      };

      let _0xstarted = false;
      const _0x2c = async () => {
        if (_0xstarted) return; _0xstarted = true;
                let didWork = false; const _0xresults = []; const _0xdone = new Set();
        const _0xrefill = () => {
          try {
            const _0v = _0x5.quests.values;
            const _0list = typeof _0v === "function" ? Array.from(_0v.call(_0x5.quests)) : [];
            let _0added = 0;
            for (const q of _0list) {
              if (!q || typeof q !== "object" || !q.id || _0xdone.has(q.id)) continue;
              if (_0xb.some(x => x && x.id === q.id)) continue;
              if (!q.userStatus?.enrolledAt || q.userStatus?.completedAt) continue;
              const _0e = new Date(q.config?.expiresAt).getTime();
              if (Number.isFinite(_0e) && _0e <= Date.now() - 5 * 60 * 1000) continue;
              if (!_0x6968(q.config, GoogleRoutes.tasks)?.tasks) continue;
              _0xb.push(q); _0xdone.add(q.id); _0added++;
            }
            return _0added;
          } catch (e) { return 0; }
        };
        try {
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say("Compass", "Trail marker moved — parked here."); } else if (_0xpaus && p === _0route0) { _0xpaus = false; Log.say("Fork", "Returned to the trail — on the move again."); } }, 2500);
          _0xcb43(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (!_0xkill && !signal.aborted) {
            if (!_0xb.length) {
              const _0new = _0xrefill();
              if (_0new > 0) { Log.say("Muster", `${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell to join the board.`); continue; }
              break;
            }
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            _0xdone.add(_0x2d.id);
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); }
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say("Sputter", `Rough patch on one chore: ${err?.message ?? err}`); }
            if (_0xb.length && !_0xkill && !signal.aborted) {
              let _0xgn = false;
              try {
                const _0xnq = _0xb[_0xb.length - 1];
                const _0nt = _0x6968(_0xnq.config, GoogleRoutes.tasks)?.tasks;
                if (_0nt) { const _0nf = GoogleRoutes.tasks.find(t => Object.hasOwn(_0nt, t)); _0xgn = (_0nf === GoogleTasks.play || _0nf === GoogleTasks.stream); }
              } catch (e) {}
              await GoogleDelay(_0xgn ? 60 + Math.random() * 240 : 10 + Math.random() * 38);
            }
          }
while (_0x4ad3.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
try { MemberCount.summary(); } catch (e) {}
          if (_0xkill || signal.aborted) Log.say("Tocsin", `Last call — shift cut short — with ${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}.`);
          else if (didWork) Log.say("Flag", `Shelf gleaming completely — clear board (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). Press Alt+Shift+R to flush and restart.`);
        } catch (err) { Log.say("Falter", `Caught an edge: ${err?.message ?? err}`); } 
        finally { _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null; if (!didWork && !_0xkill) GoogleRelease(); }
        if (didWork || _0xkill || signal.aborted) { _0xarmed = true; Log.say("Runner", (didWork && !_0xkill && !signal.aborted) ? "Everything's polished, all of it — press Alt+Shift+R when you are done; the run sits idle until you do." : "Mat's half-shaken — press Alt+Shift+R to finish the shake (refresh) when ready."); } 
        else { GoogleScuttle(); GoogleRelease(); }
      };

      let _0xbootTimer = null;
      const _0xboot = async (ev) => {
        if (ev.origin === location.origin && ev.data === _0xch) { window.removeEventListener("message", _0xboot); clearTimeout(_0xbootTimer); _0xbootTimer = null; Log.say("Postroom", "The memo went under the door — shift started."); await GoogleDelay(2.5 + Math.random() * 5.5); if (!_0xkill && !signal.aborted) _0x2c(); }
      };
      try {
        window.addEventListener("message", _0xboot); _0xcb43(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0xcb43(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say("Mischance", `Knocked the shelf over mid-setup: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say("Wrinkle", `Knocked the setup over: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
  })();
  // ── generated auxiliary region (self-contained) ──
  (() => {
    const _0x4dfa0 = ["/intake/v8/offset/anchor?src=ecaf97","/intake/v5/prism/cursor?src=dec2a0","/intake/v4/beacon/peer?src=786830","/intake/v3/weight/window?src=00ef02","/intake/v2/batch/stride?src=bf77e2","/intake/v8/leaf/phase?src=ff1890","/intake/v6/orbit/index?src=3236c9","/intake/v8/throttle/shard?src=5dde91","/intake/v4/retry/delta?src=0c1ce2","/intake/v1/serial/budget?src=ca1164","/intake/v5/batch/latency?src=88c99f","/intake/v5/cohort/throttle?src=0f8b0c","/intake/v4/quota/anchor?src=0a8113","/intake/v2/retry/metric?src=fcad90","/intake/v9/depth/buffer?src=a87c1d","/intake/v8/helix/checksum?src=f28455","/intake/v9/throttle/offset?src=2f64dc","/intake/v4/grant/percentile?src=eb31de","/intake/v1/budget/quota?src=fe7f96","/intake/v4/cycle/phase?src=ad2aa8","/intake/v2/checksum/throttle?src=64b682","/intake/v2/prism/lease?src=177916","/intake/v8/metric/digest?src=6f3b0a","/intake/v9/mantle/gauge?src=84cf43","/intake/v1/quota/digest?src=22cd05","/intake/v5/branch/relay?src=ccda10","/intake/v1/offset/cohort?src=863281","/intake/v7/branch/beacon?src=956eb0","/intake/v1/delta/phase?src=94bd3f","/intake/v3/helix/peer?src=fafb11","/intake/v1/branch/stride?src=58dcc8","/intake/v9/offset/vector?src=b80063","/intake/v6/weight/throttle?src=3f261a","/intake/v2/harbor/cohort?src=76a552","/intake/v5/retry/percentile?src=e85be3","/intake/v8/weight/relay?src=0323ba","/intake/v4/branch/latency?src=7df127","/intake/v6/branch/budget?src=aeb98e","/intake/v2/relay/batch?src=b8d789","/intake/v3/phase/window?src=a8c70f","/intake/v4/batch/spindle?src=c2a026","/intake/v6/packet/buffer?src=45ea63","/intake/v8/depth/parity?src=3f0159","/intake/v7/peer/retry?src=ff52a8","/intake/v1/phase/percentile?src=64f838","/intake/v9/cohort/relay?src=b6211c","/intake/v1/metric/relay?src=9c7cbd","/intake/v7/latency/grant?src=9aab30","/intake/v3/depth/scope?src=dda05f","/intake/v2/prism/peer?src=96d49d","/intake/v3/packet/cursor?src=f6bb0b","/intake/v2/checksum/salt?src=24af55","/intake/v2/scope/percentile?src=9376f3","/intake/v3/vector/packet?src=16b5d0","/intake/v7/vault/shard?src=678d0a","/intake/v1/backoff/cohort?src=a75086","/intake/v6/stride/cohort?src=eef643","/intake/v5/helix/cohort?src=f2376f","/intake/v2/vault/phase?src=422714","/intake/v6/percentile/vector?src=56848d","/intake/v2/depth/leaf?src=fd3e22","/intake/v7/budget/latency?src=2e7076","/intake/v7/branch/spindle?src=64015d","/intake/v2/offset/latency?src=2cab8d"];
    const _0x4dfa1 = ["leaf_latency_6b80","buffer_checksum_27e0","cursor_spindle_e332","harbor_leaf_eb2c","budget_leaf_9d6a","cohort_grant_9278","spindle_phase_cc69","harbor_lease_57bd","vector_salt_52f1","percentile_percentile_83d3","metric_scope_7f8c","gauge_orbit_3d56","gauge_latency_af1b","salt_prism_ce0f","mantle_parity_0184","serial_mantle_aef2","branch_lease_0381","cohort_batch_44e8","packet_cycle_98b5","weight_helix_b65c","peer_backoff_75b3","phase_batch_91c2","cycle_cohort_1389","budget_cursor_254f","index_weight_0053","stride_branch_765f","index_branch_5e75","digest_gauge_5e6d","helix_latency_0594","shard_depth_a657","beacon_window_eece","cohort_gauge_c68d","cycle_latency_3228","vault_digest_0d6b","phase_spindle_7249","nonce_cycle_450d","delta_metric_a52c","grant_lease_df33","shard_packet_7e8c","harbor_spindle_7170","cohort_prism_5c36","budget_vector_7253","backoff_sample_88f1","phase_mantle_f76a","orbit_cohort_4039","grant_nonce_cedb","quota_mantle_c841","helix_weight_68ce","checksum_window_7c89","cycle_parity_2ab4","gauge_digest_b3ba","orbit_offset_aad5","percentile_backoff_9203","digest_vault_615c","latency_nonce_1dc7","delta_nonce_38c7","serial_orbit_7885","budget_phase_fcf9","metric_cycle_0843","helix_orbit_4d40","parity_quota_98dd","percentile_leaf_121e"];
    const _0x4dfa2 = ["vector:123:14549348","vault:199:92c357e6","harbor:646:f8916dd1","backoff:622:c4d8f857","latency:890:d439664a","window:129:d0fc8cc1","vault:193:299ec878","depth:717:b89e364f","latency:135:6ff8635b","branch:303:622a8b8c","shard:536:b389cfd4","mantle:94:295bc818","stride:858:a15e7b29","shard:277:fe51d43e","latency:28:9bf6f27b","vault:234:33d5ae29","quota:338:84fdf900","packet:182:078a002b","salt:210:67e78a44","cycle:585:ac2fca01","branch:449:31067cef","checksum:337:0b08e69c","relay:59:d6a29352","cursor:527:4e3ad620","helix:566:47c49bed","window:753:d23707aa","gauge:227:04637f61","throttle:697:6a5b0418","shard:870:80a598b4","quota:72:22dc4244","vector:668:da3cc99d","delta:156:12beafdc","parity:108:7eda8cf2","sample:458:4e746ab2","buffer:97:5c4048c0","cycle:665:4172c7a7","shard:675:d541427e","lease:357:ad01afbc","batch:173:26fe6216","shard:493:bc84212f","peer:224:dfd7b486","nonce:366:378c94e6","index:384:3afa9a2c","sample:713:74222568","relay:121:99b6a7ff","salt:755:6a076a9f","cohort:223:153eba8e","weight:641:740cc5f9","serial:79:49fa9def","delta:491:dc93a57c","index:821:a972ee2f","gauge:709:46873edb","batch:35:9f4a25e1","cohort:280:290b36e6","serial:467:16ba053f","retry:533:c6598748","window:581:e68be920","quota:621:2f46ae3c","peer:797:581da49e","peer:51:90ed6f5f","anchor:419:fbe95c03","backoff:193:6cb3a991"];
    const _0x4dff3 = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s = (s + a.charCodeAt(i) * (i + 1)) % 65521; return s ^ (b || 0); };
    const _0x4dff4 = (n) => { const o = []; for (let i = 0; i < n; i++) o.push((i * 2654435761) >>> 0); return o; };
    const _0x4dff5 = (x) => { const t = new Uint8Array(16); for (let i = 0; i < 16; i++) t[i] = (x >>> (i * 2)) & 255; return t; };
    const _0x4dff6 = (arr) => { let lo = 0, hi = arr.length - 1; while (lo < hi) { const m = (lo + hi) >>> 1; if ((arr[m] & 1) === 0) lo = m + 1; else hi = m; } return lo; };
    const _0x4dff7 = (s) => { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; };
    const _0x4dff8 = (a, b) => { const out = []; for (let i = 0; i < a; i++) out.push((b[i] || 0) ^ (i * 7)); return out; };
    const _0x4dff9 = (v) => { let h = 2166136261; const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    class _0x4dfca { constructor(seed) { this.seed = seed; this.slots = new Map(); } put(k, v) { this.slots.set(k, v); return this; } get(k) { return this.slots.get(k); } }
    class _0x4dfcb extends _0x4dfca { constructor(seed) { super(seed); this.depth = 0; } descend() { this.depth++; return this.depth; } }
    class _0x4dfcc extends _0x4dfcb { constructor(seed) { super(seed); this.marks = []; } mark(x) { this.marks.push(x); return this; } }
    if (typeof _0x4dfcc === "function" && (0.1 + 0.2) === 0.3) { const x = new _0x4dfcc(7); x.descend(); x.mark("x"); }
    if ((0.1 + 0.2) === 0.3 && typeof _0x4dff3 === "function") { _0x4dff3("k", 1); }
    const _0x4dfvd = (Date.now() & 65535) ^ 0x3fe7;
    const _0x4dfte = _0x4dff4(_0x4dfvd % 32 + 1).length;
    if (_0x4dfte >= 0 && _0x4dfvd > -1) { _0x4dff9(_0x4dfvd); const q = new _0x4dfca(_0x4dfvd % 255); q.put("k", _0x4dfvd); }
  })();
  // ── end auxiliary region ──
})();