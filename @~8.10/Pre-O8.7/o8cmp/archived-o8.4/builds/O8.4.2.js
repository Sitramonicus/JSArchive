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
      const SUITE_VERSION = "O.8.4.2";
  const INSTANCE_ID = "08e2e953";
  Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);
  Log.diag(`O8.4.2 core — lexicon v2, log-lock, studio gaps, refill queue, metamorphic decode.`);
  
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
  const _0x2c8a = new Set();
  
  const _0x4dd8 = (fn) => {
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
  _0x4dd8(GoogleScuttle);

  (async () => {
    try {
      // ── Juggler decode, metamorphic instance 08e2e953 (O.8.4.2) ──
      const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45];
      const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");
      const _0xT = [171,243,4,207,94,91,85,15,109,172,104,51,6,173,27,117,60,17,246,217,7,216,8,88,0,248,143,26,241,89,74,132,187,96,178,61,191,125,250,112,9,106,36,160,165,41,239,235,206,151,188,18,186,234,232,156,222,127,110,103,183,11,229,115,13,30,47,124,227,142,159,157,203,121,253,128,219,20,233,56,189,136,138,144,79,19,231,116,140,80,87,23,249,64,197,135,170,228,163,238,68,255,161,212,76,167,43,134,31,152,201,166,66,98,175,55,153,77,28,254,67,34,44,107,123,48,198,113,1,199,35,16,118,57,169,24,223,122,78,196,53,214,220,211,209,240,190,162,133,154,195,58,40,49,38,244,101,99,221,225,65,75,25,185,37,52,247,137,59,126,50,2,200,86,39,141,12,204,181,93,176,102,21,145,120,119,10,237,147,90,168,111,100,193,179,252,251,146,174,81,180,177,22,82,69,192,73,148,236,242,97,14,205,63,208,70,71,46,5,105,213,62,164,184,42,54,72,130,32,155,230,114,224,158,95,29,45,33,131,139,92,210,149,83,182,245,202,3,150,226,84,218,108,129,194,215];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; },
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; }
      ];
      const _0xNp = [1,2,0,1];
      const _0xPool = [35,13,32,15,20,43,34,21,16,17,27,43,27,26,43,25,27,14,21,24,17,70,141,128,123,124,134,68,135,137,134,126,137,124,138,138,185,187,170,153,191,179,187,152,177,172,142,151,154,107,83,73,121,117,73,77,99,89,103,89,99,121,212,255,153,30,31,31,79,76,175,255,228,68,55,159,166,175,189,228,175,255,201,153,64,30,26,10,28,27,28,64,31,88,85,81,98,100,82,85,81,100,58,42,162,155,162,146,42,10,106,42,146,11,26,162,74,178,42,155,162,146,42,10,106,107,42,162,10,34,10,162,10,161,170,32,171,46,165,33,174,40,168,173,178,160,157,171,156,158,166,126,163,176,169,166,159,164,174,158,170,173,159,154,156,171,171,157,155,170,137,124,141,122,155,156,151,171,162,170,121,158,151,164,164,155,162,5,1,35,111,33,23,23,25,23,5,69,9,17,1,45,19,20,18,5,1,13,31,15,14,31,4,5,19,11,20,15,16,5,3,18,223,10,10,229,19,7,10,2,17];
      const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };
      const _0xJuggle = (_0xs, _0xl) => {
        const _0xf = _0xs[0];
        const _0xn = _0xNp[_0xf];
        let _0xP, _0xb;
        if (_0xs[1] === -4) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }
        else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }
        const _0xd = _0xM[_0xf](_0xb, _0xP);
        const _0ok = _0xJuggleRE.test(_0xd);
        _0xJuggleStats.total++;
        _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;
        Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });
        if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(`[Juggler] ${_0xl}: decoded string failed sanity check (len=${_0xd.length}) - corrupted instance?`); }
        return _0xd;
      };
      let _0xq0 = _0xJuggle([3,-4,144,23,59], "_0xq0");
      let _0xq1 = _0xJuggle([3,166,234,15,25,9,21,24,10,244,7,26,15,28,11], "_0xq1");
      let _0xq2 = _0xJuggle([0,-4,84,8,111], "_0xq2");
      let _0xq3 = _0xJuggle([3,-4,21,15,23], "_0xq3");
      let _0xq4 = _0xJuggle([3,-4,92,10,240], "_0xq4");
      let _0xq5 = _0xJuggle([3,34,81,131,146,146,142,139,133,131,150,139,145,144,149,81,146,151,132,142,139,133,97,131,146,146,142,139,133,131,150,139,145,144,129,139,134,149,95], "_0xq5");
      let _0xt0 = _0xJuggle([1,-4,133,11,7,10], "_0xt0");
      let _0xt1 = _0xJuggle([1,3,244,118,150,254,62,14,142,134,14,214,222,110,174,86,142,118], "_0xt1");
      let _0xt2 = _0xJuggle([0,-4,202,17,64], "_0xt2");
      let _0xt3 = _0xJuggle([1,-4,49,13,1,203], "_0xt3");
      let _0xt4 = _0xJuggle([3,-4,0,21,204], "_0xt4");
      let _0xe0 = _0xJuggle([1,7,179,154,25,148,148,23,148,16,28,16,19,21,17,26,28,18,151,19,148,16,17], "_0xe0");
      let _0xe1 = _0xJuggle([0,170,251,255,239,249,254,249,245,249,239,228,238,245,226,239,235,248,254,232,239,235,254,245,249,255,233,233,239,249,249], "_0xe1");
      let _0xm0 = _0xJuggle([1,-4,102,31,3,1], "_0xm0");
      let _0xm1 = _0xJuggle([1,-4,187,15,1,203], "_0xm1");
      let _0xm2 = _0xJuggle([0,-4,36,13,222], "_0xm2");
      let _0xm3 = _0xJuggle([1,3,43,16,0,136,161,128,0,176,136], "_0xm3");
      let _0xm4 = _0xJuggle([2,-4,62,22], "_0xm4");
      let _0xm5 = _0xJuggle([3,-4,167,20,54], "_0xm5");
      let _0xm6 = _0xJuggle([3,129,231,237,246,244,233,216,226,234,245,210,246,230,246,230], "_0xm6");
      let _0xm7 = _0xJuggle([0,134,225,227,242], "_0xm7");
      let _0xm8 = _0xJuggle([2,212,255,153,144,166,175,153,255,68,189,175,167,28,228,153,255,124,76,228,201,201,255,31,55], "_0xm8");
      let _0xm9 = _0xJuggle([3,-4,219,12,158], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "08e2e953" });
      // ── end juggler decode ──








      let _0x1 = window[_0xq0];
      let _0x2 = null;
      if (!_0x1 || typeof _0x1.push !== "function" || typeof _0x1.pop !== "function") {
        Log.say("Mishap", "The module doorway is unavailable — clocking out.");
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
        Log.say("Blunder", "The module doorway returned no usable runtime — clocking out.");
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
        Log.say("Bungle", "Missing pockets — heading home.");
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
        Log.say("Stumble", "Pocket interfaces invalid — clocking out.");
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

      const _0xd3bb = (cfg, supportedTasks) => {
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
        const tasks = _0xd3bb(q.config, GoogleRoutes.tasks)?.tasks;
        return tasks;
      });

      for (let i = _0xb.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_0xb[i], _0xb[j]] = [_0xb[j], _0xb[i]];
      }
      
      Log.say("Tally", `${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today.`);
      const _0xlost = _0xeligible.length - _0xb.length;
      if (_0xlost > 0) Log.say("Agenda", `${_0xlost} set aside — shape we can't fold.`);
      
      if (!_0xb.length) { 
        Log.say("Grove", "Nothing on the vines today. (Press Alt+Shift+R to flush and restart)"); 
        GoogleRelease(); 
        return; 
      }

      let _0xc = typeof window[_0xq1] !== "undefined";
      let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;
      const _0xroute0 = ((1 / 3) * 3) === 1 ? location.pathname : location.pathname.slice(0);
      const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      let _0xlastHidden = null;

      const _0xba04 = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      // [RESTORED] Bounded delay sampling
      let delayCount = 0;
      const _0x7fdc = ms => {
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
          Log.say("Shade", document.hidden ? "Curtains drawn — taking the long hallway." : "Curtains open — back on the main road.");
        }
        let base = _0xln(d * 1000);
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= _0xheat;
        
        _0x7fdc(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await _0xba04(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xba04(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      // Server-compliance wait: raw ms, no humanization (429 retry_after / 5xx backoff).
      const GoogleDelayRaw = async (ms) => {
        let remaining = Math.max(0, ms);
        while (remaining > 0 && !signal.aborted) {
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xba04(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      _0xchord = (e) => {
        if (!(e.altKey && e.shiftKey)) return;
        const key = String(e?.key ?? '').toLowerCase();
        if (key === 'x' && !_0xkill && !_0xarmed) { _0xkill = true; controller.abort(); Log.say("Bell", "Winding down after this chore."); }
        if (key === 'r' && _0xarmed) { Log.say("Welcome", "Shaking out the mat — see you on the other side."); GoogleRelease(); setTimeout(() => location.reload(), 1500); }
      };
      document.addEventListener("keydown", _0xchord, true);
      _0x4dd8(() => document.removeEventListener("keydown", _0xchord, true));

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
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say("Tripup", "Key stopped fitting — folding up shop."); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say("Vestibule", `Knock got throttled — trying again in ~${Math.ceil(s)}s.`);
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say("Loggia", `Server fault ${st} — backing off for ${backoff.toFixed(1)}s.`); 
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
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say("Kink", `Target ${key} is sealed — hook failed.`); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say("Sputter", `Hook install failed on ${key}: ${e.message}`); return null; }
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

      const _0x2c84 = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const _0x8ee3 = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

      const _0xvideo = async (v) => {
        Log.say("Novel", `Opening the picture book for ${v.name}.`);
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await GoogleDelay(_0x1c); if (_0xkill || signal.aborted) break;
          if (Math.random() < 0.06) { Log.say("Stove", "Steep's on — brief pause."); await GoogleDelay(18 + Math.random() * 24); if (_0xkill || signal.aborted) break; }
          const lastBeat = v.cur + _0x1c >= v.goal;
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          // [RESTORED] Timestamp sampling
          Log.diag("Timestamp sample", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say("Metronome", `Grains falling whole: ${Number.isInteger(ts)} — grain #${ts}`);
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0x2c84(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Meter", `Running tally: ${v.cur.toFixed(2)}/${v.goal}`);
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say("Medal", `Finished: ${v.name}.`);
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0x2c8a.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x2c8a.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Falter", `That chore (${v.name}) needs the main hall — skipping.`); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applicationsUrl(v.app) });
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say("Mischance", "Chore note came back empty — skipping."); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say("Pavement", `Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`);
              const safeName = _0x8ee3(_0x1f.name); const safeExe = _0x8ee3(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say("Utensils", "Utensil drawer reshuffled: " + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;
              try {
                undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
                undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say("Wrinkle", "The desktop doorway would not open — skipping."); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleDesktopHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                finishTask();
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: _0x2c8a.size }); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0x4dd8(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say("Glitch", "Initial state dispatch failed — moving on."); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say("Astrolabe", `Running tally: ${_0x26}/${v.goal}`); if (_0x26 >= v.goal) Log.say("Ribbon", `Spruced up: ${v.name}.`); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say("Snag", "Desktop progress subscription failed — moving on."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0x2c8a.size });
              handedOff = true; 
              Log.say("Morsels", `Checking on ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
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
        const taskId = Symbol(); _0x2c8a.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x2c8a.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Hiccup", `That chore (${v.name}) needs a bigger rig — skipping.`); resolve(); return; }
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say("Walkway", `Floor tiles line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`);
              let undo = null;
              try { undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say("Grumble", "The stream doorway would not open — skipping."); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleStreamHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                finishTask();
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: _0x2c8a.size }); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0x4dd8(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say("Pulse", `Running tally: ${_0x28}/${v.goal}`); if (_0x28 >= v.goal) Log.say("Banner", `Done and dusted: ${v.name}.`); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say("Tangle", "Stream progress subscription failed — moving on."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0x2c8a.size });
              handedOff = true; 
              Log.say("Platform", `Curtain's up — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
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
        if (!_0x6 || !_0x7) { Log.say("Mishap", "No doorway found for the cabinet — skipping."); return; }
        let _0x29; try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
        if (!_0x29) { try { const guilds = Object.values(_0x7[_0xm9]()); const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length); if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id; } catch (e) {} if (!_0x29) { Log.say("Blunder", "No doorway found for the cabinet — skipping."); return; } }
        let _0x2a = "call:" + _0x29 + ":" + Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        Log.say("Midway", `Dropping coins in the cabinet (~${Math.ceil((v.goal - v.cur) / 60)} min).`);
        const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
        let tick = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted && Date.now() < _0xactivityDeadline) {
          if (_0xpaus) { await GoogleDelay(3); continue; }
          let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
          const reportedProgress = _0x2c84(_0x2b?.body, GoogleTasks.activity);
          if (reportedProgress !== null) v.cur = reportedProgress;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Sextant", `Running tally: ${v.cur}/${v.goal}`);
          await GoogleDelay(20);
          if (v.cur >= v.goal) { await GoogleDelay(2); if (_0xkill || signal.aborted) break; if (!_0xkill && !signal.aborted) await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } }); break; }
        }
        if (v.cur >= v.goal) Log.say("Star", `Finished: ${v.name}.`);
        else if (!_0xkill && !signal.aborted && Date.now() >= _0xactivityDeadline) Log.say("Bungle", `Activity ${v.name} stalled with no confirmed progress.`);
      };

      const GoogleHandlers = { [GoogleTasks.video]: _0xvideo, [GoogleTasks.videoMobile]: _0xvideo, [GoogleTasks.play]: _0xplay, [GoogleTasks.stream]: _0xstream, [GoogleTasks.activity]: _0xact };

      const _0x10 = async (_0x11) => {
        let _0x15 = _0xd3bb(_0x11.config, GoogleRoutes.tasks);
        if (!_0x15?.tasks) { Log.say("Stumble", "Chore list came back blank — skipping this one."); return "skipped"; }
        let _0x16 = GoogleRoutes.tasks.find(t => Object.hasOwn(_0x15.tasks, t));
        let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
        let _0x19 = Number(_0x17?.target);
        if (!Number.isFinite(_0x19) || _0x19 <= 0) { Log.say("Tripup", "Chore target was malformed — skipping this one."); return "skipped"; }
        let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
        if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) { Log.say("Kink", "Chore had no app identifier — skipping."); return "skipped"; }
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
              if (!_0xd3bb(q.config, GoogleRoutes.tasks)?.tasks) continue;
              _0xb.push(q); _0xdone.add(q.id); _0added++;
            }
            return _0added;
          } catch (e) { return 0; }
        };
        try {
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say("Compass", "Trail marker moved — holding still."); } else if (_0xpaus && p === _0route0) { _0xpaus = false; Log.say("Fork", "Back on the trail — picking up again."); } }, 2500);
          _0x4dd8(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (!_0xkill && !signal.aborted) {
            if (!_0xb.length) {
              const _0new = _0xrefill();
              if (_0new > 0) { Log.say("Muster", `${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell.`); continue; }
              break;
            }
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            _0xdone.add(_0x2d.id);
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); }
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say("Sputter", `Tripped over one chore (moving on): ${err?.message ?? err}`); }
            if (_0xb.length && !_0xkill && !signal.aborted) {
              let _0xgn = false;
              try {
                const _0xnq = _0xb[_0xb.length - 1];
                const _0nt = _0xd3bb(_0xnq.config, GoogleRoutes.tasks)?.tasks;
                if (_0nt) { const _0nf = GoogleRoutes.tasks.find(t => Object.hasOwn(_0nt, t)); _0xgn = (_0nf === GoogleTasks.play || _0nf === GoogleTasks.stream); }
              } catch (e) {}
              await GoogleDelay(_0xgn ? 60 + Math.random() * 240 : 10 + Math.random() * 38);
            }
          }
while (_0x2c8a.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
try { MemberCount.summary(); } catch (e) {}
          if (_0xkill || signal.aborted) Log.say("Tocsin", `Last call — shift cut short (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`);
          else if (didWork) Log.say("Flag", `Shelf gleaming — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`);
        } catch (err) { Log.say("Falter", `Tripped up top: ${err?.message ?? err}`); } 
        finally { _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null; if (!didWork && !_0xkill) GoogleRelease(); }
        if (didWork || _0xkill || signal.aborted) { _0xarmed = true; Log.say("Runner", (didWork && !_0xkill && !signal.aborted) ? "Everything's polished — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so." : "Mat's half-shaken — press Alt+Shift+R to finish the job (refresh) whenever you're ready."); } 
        else { GoogleScuttle(); GoogleRelease(); }
      };

      let _0xbootTimer = null;
      const _0xboot = async (ev) => {
        if (ev.origin === location.origin && ev.data === _0xch) { window.removeEventListener("message", _0xboot); clearTimeout(_0xbootTimer); _0xbootTimer = null; Log.say("Postroom", "Memo slipped under the door — shift started."); await GoogleDelay(2.5 + Math.random() * 5.5); if (!_0xkill && !signal.aborted) _0x2c(); }
      };
      try {
        window.addEventListener("message", _0xboot); _0x4dd8(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0x4dd8(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say("Mischance", `Knocked the shelf over while setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say("Wrinkle", `Knocked the shelf over while setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
  })();
  // ── generated auxiliary region (self-contained) ──
  (() => {
    const _0x08ea0 = ["/intake/v7/anchor/checksum?src=63f67d","/intake/v3/phase/relay?src=36d42e","/intake/v2/sample/metric?src=2e70f9","/intake/v3/beacon/lease?src=b4e561","/intake/v2/cycle/retry?src=6e7480","/intake/v1/helix/helix?src=ff650d","/intake/v2/batch/relay?src=cd5fe2","/intake/v5/spindle/nonce?src=ccd85a","/intake/v8/branch/retry?src=8c5667","/intake/v3/mantle/prism?src=9e3e5a","/intake/v6/metric/parity?src=dc59a2","/intake/v5/helix/scope?src=6a2b80","/intake/v5/helix/harbor?src=52dddf","/intake/v4/grant/depth?src=5a493f","/intake/v5/gauge/throttle?src=0c168e","/intake/v5/lease/budget?src=c7266b","/intake/v1/cursor/lease?src=25567b","/intake/v4/shard/vector?src=64680b","/intake/v5/orbit/offset?src=40bf47","/intake/v2/parity/batch?src=45b29a","/intake/v2/cohort/shard?src=12bbab","/intake/v7/vector/sample?src=d6f5dd","/intake/v1/peer/sample?src=b87c16","/intake/v7/scope/mantle?src=dafeae","/intake/v2/cursor/backoff?src=26a127","/intake/v9/throttle/leaf?src=91bfe0","/intake/v2/spindle/beacon?src=1fbe88","/intake/v4/digest/retry?src=a0bf25","/intake/v3/retry/relay?src=fb3c1f","/intake/v1/grant/cursor?src=1fd14a","/intake/v3/lease/grant?src=d28828","/intake/v3/delta/relay?src=72327c","/intake/v6/cycle/spindle?src=7d1820","/intake/v9/gauge/offset?src=69b79d","/intake/v6/lease/window?src=2f480b","/intake/v7/beacon/backoff?src=0ed496","/intake/v5/peer/throttle?src=9386d9","/intake/v2/quota/packet?src=6e9f14","/intake/v7/grant/latency?src=c4e298","/intake/v7/metric/leaf?src=ae4515","/intake/v9/delta/cohort?src=0628eb","/intake/v7/throttle/branch?src=e869af","/intake/v2/spindle/budget?src=49f92a","/intake/v8/salt/anchor?src=bb6d2a","/intake/v1/offset/lease?src=a4d4c3","/intake/v8/orbit/index?src=a0dad0","/intake/v3/mantle/peer?src=d07753","/intake/v2/leaf/checksum?src=a6ce8f","/intake/v5/gauge/cohort?src=0f96e6","/intake/v4/gauge/helix?src=c07c40","/intake/v3/cohort/budget?src=58462f","/intake/v1/depth/delta?src=2444a8","/intake/v2/cohort/grant?src=563df5","/intake/v9/cursor/batch?src=7eb83a","/intake/v3/delta/cycle?src=1af889","/intake/v3/serial/relay?src=38a76f","/intake/v5/gauge/beacon?src=b880de","/intake/v6/budget/metric?src=80e9aa","/intake/v4/beacon/salt?src=e51829","/intake/v2/shard/percentile?src=20f0a2","/intake/v9/index/shard?src=3f0a7e","/intake/v3/shard/grant?src=0ee977","/intake/v5/retry/delta?src=29a5fc","/intake/v7/metric/index?src=7f0736","/intake/v8/nonce/phase?src=54b7af","/intake/v6/checksum/weight?src=ba86c2","/intake/v2/checksum/metric?src=8d8495","/intake/v3/cycle/cohort?src=a84cb1"];
    const _0x08ea1 = ["index_backoff_6f17","window_orbit_389e","index_digest_7305","peer_percentile_265e","buffer_packet_d313","backoff_metric_a6d6","budget_offset_ac8f","beacon_gauge_2c23","window_digest_8faf","leaf_backoff_6a4f","packet_cohort_c952","cohort_gauge_641a","metric_salt_e02e","serial_latency_c458","orbit_packet_9f90","spindle_latency_acce","shard_spindle_4fbc","depth_cursor_dbeb","cycle_scope_50a8","quota_offset_db46","mantle_vault_a47f","budget_sample_3600","percentile_scope_7038","retry_lease_0890","percentile_budget_21fb","packet_throttle_6f5e","metric_delta_4e4b","phase_helix_3460","cycle_helix_eb33","mantle_helix_9f6b","cohort_vector_dc1e","cycle_offset_619f","grant_buffer_faa0","percentile_retry_2506","digest_mantle_c4d2","phase_quota_9d14","cohort_cursor_5b3c","vault_batch_e32f","cycle_shard_20c3","quota_vector_817a","buffer_scope_1a2b","digest_cursor_100b","budget_batch_1e3b","prism_vector_296e","offset_weight_4c2b","peer_index_e09b","latency_delta_785c","metric_vault_af3c","buffer_backoff_0ec8","lease_lease_7e13","throttle_scope_e6ef","serial_harbor_53dc","grant_grant_b651","peer_batch_2bb9","cycle_batch_32cb","throttle_index_4a2f","peer_latency_95f8","vector_quota_0120","metric_harbor_9b31","packet_batch_1072","beacon_index_a382","stride_retry_d66d","leaf_orbit_8207","cohort_vault_bf32"];
    const _0x08ea2 = ["cursor:214:db17dab7","stride:537:c0149a24","anchor:442:5dde3844","grant:46:b78b3b26","cursor:795:1b5c44ca","grant:440:457f79aa","phase:552:1c9ffe4b","vault:727:78f7809d","vault:446:044e8d17","checksum:746:206d5b96","digest:833:5e7eadb0","vault:87:d2541be3","cycle:9:c0de2a34","throttle:561:1fad308a","peer:398:84b2f9b9","orbit:844:3bc25392","scope:484:54cdc415","phase:899:c88f4a4d","buffer:223:baa64f96","metric:369:98666cda","parity:510:78dd619c","percentile:323:763f2da8","weight:36:cb3d90a5","cursor:498:8b2c49eb","lease:139:80fe27d1","budget:800:c812b5bd","spindle:642:b7d6ac25","relay:314:38ca9a46","percentile:708:18770884","digest:553:d3c47b85","batch:493:a177249d","window:693:246edd9b","stride:154:810589ef","grant:130:2a1863d0","gauge:225:f0d22aab","stride:839:091e05b8","prism:174:3a23dfb0","retry:190:246a716c","phase:181:c0ae0c6d","packet:2:52b995b8","cycle:498:81a9ab10","cursor:34:bdfcd385","vault:840:aa15dc09","budget:693:c928bb89","gauge:136:f5fa7eae","checksum:530:fb024ccb","spindle:838:69f7917c","nonce:712:061709b5","orbit:109:6e05638e","backoff:286:6c609296","gauge:130:8a19de04","vault:328:f323ba1d","spindle:423:fd1c75e5","orbit:877:36d67a73","backoff:482:1ec697a7","buffer:356:a1f712cb","sample:851:4636308e","weight:856:e1d33ef2","batch:274:35b48727","mantle:362:fc457e19","buffer:701:4c0386fc","offset:606:226a9e0a","helix:645:13970dcb"];
    const _0x08ef3 = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s = (s + a.charCodeAt(i) * (i + 1)) % 65521; return s ^ (b || 0); };
    const _0x08ef4 = (n) => { const o = []; for (let i = 0; i < n; i++) o.push((i * 2654435761) >>> 0); return o; };
    const _0x08ef5 = (x) => { const t = new Uint8Array(16); for (let i = 0; i < 16; i++) t[i] = (x >>> (i * 2)) & 255; return t; };
    const _0x08ef6 = (arr) => { let lo = 0, hi = arr.length - 1; while (lo < hi) { const m = (lo + hi) >>> 1; if ((arr[m] & 1) === 0) lo = m + 1; else hi = m; } return lo; };
    const _0x08ef7 = (s) => { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; };
    const _0x08ef8 = (a, b) => { const out = []; for (let i = 0; i < a; i++) out.push((b[i] || 0) ^ (i * 7)); return out; };
    const _0x08ef9 = (v) => { let h = 2166136261; const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    class _0x08eca { constructor(seed) { this.seed = seed; this.slots = new Map(); } put(k, v) { this.slots.set(k, v); return this; } get(k) { return this.slots.get(k); } }
    class _0x08ecb extends _0x08eca { constructor(seed) { super(seed); this.depth = 0; } descend() { this.depth++; return this.depth; } }
    class _0x08ecc extends _0x08ecb { constructor(seed) { super(seed); this.marks = []; } mark(x) { this.marks.push(x); return this; } }
    if (typeof _0x08ecc === "function" && (0.1 + 0.2) === 0.3) { const x = new _0x08ecc(7); x.descend(); x.mark("x"); }
    if ((0.1 + 0.2) === 0.3 && typeof _0x08ef3 === "function") { _0x08ef3("k", 1); }
    const _0x08evd = (Date.now() & 65535) ^ 0x4328;
    const _0x08ete = _0x08ef4(_0x08evd % 32 + 1).length;
    if (_0x08ete >= 0 && _0x08evd > -1) { _0x08ef9(_0x08evd); const q = new _0x08eca(_0x08evd % 255); q.put("k", _0x08evd); }
  })();
  // ── end auxiliary region ──
})();