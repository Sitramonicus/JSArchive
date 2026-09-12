console.clear();
(() => {
  // --- LOGGING MODULE ---
  // 0 = Logging disabled, 1 = Default operational logging, 2 = Extensive diagnostics
  const LOG_LEVEL = 2; 
  const Log = (() => {
    const noop = () => {};
    if (LOG_LEVEL === 0) return { say: noop, diag: noop, warn: noop, info: noop };
    return {
      say: (c, m) => console.debug(`[Google ${c}] ${m}`),
      diag: (m, d) => { if (LOG_LEVEL >= 2) d !== undefined ? console.debug(`[O8-DIAG] ${m}`, d) : console.debug(`[O8-DIAG] ${m}`); },
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m)
    };
  })();

  const SUITE_VERSION = "O.8.2-Juggler-5";
  const INSTANCE_ID = "5605b891";
  Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);
  Log.diag(`Baseline O8.2 — metamorphic decode, Lazy Forcer after decode, URL guard.`);
  
  // [RESTORED] Experimental configuration summary
  Log.diag("Experimental configuration", {
    delayModel: "poisson",
    lazyForcer: true,
    lazyForceLimit: 50,
    timestampModel: "monotonic-five-decimal",
    promiseHandoff: true,
    randomizedIdentityFallback: true,
    randomizedActivityKey: true
  });

  // ── client-state readout region ──
  const MemberCount = (() => {
    const _0xk = 107;
    const _0xds = a => String.fromCharCode(...a.map(c => c ^ _0xk));
    const S = {
      mc: _0xds([6,14,6,9,14,25,40,4,30,5,31]), amc: _0xds([10,27,27,25,4,19,2,6,10,31,14,38,14,6,9,14,25,40,4,30,5,31]), mcu: _0xds([6,14,6,9,14,25,52,8,4,30,5,31]), mem: _0xds([6,14,6,9,14,25,24]),
      oc: _0xds([4,5,7,2,5,14,40,4,30,5,31]), pc: _0xds([27,25,14,24,14,5,8,14,40,4,30,5,31]), apc: _0xds([10,27,27,25,4,19,2,6,10,31,14,59,25,14,24,14,5,8,14,40,4,30,5,31]), ocu: _0xds([4,5,7,2,5,14,52,8,4,30,5,31]),
      n0: _0xds([48,38,14,6,9,14,25,40,4,30,5,31,54,75,37,4,75,6,14,6,9,14,25,75,24,31,10,31,2,24,31,2,8,24,75,10,25,14,75,8,30,25,25,14,5,31,7,18,75,10,29,10,2,7,10,9,7,14,75,2,5,75,7,4,8,10,7,75,8,7,2,14,5,31,75,24,31,10,31,14,69]), n1: _0xds([48,38,14,6,9,14,25,40,4,30,5,31,54,75,38,14,6,9,14,25,24,81,75]), n2: _0xds([75,23,75,36,5,7,2,5,14,81,75]), n3: _0xds([48,38,14,6,9,14,25,40,4,30,5,31,54,75,39,4,8,10,7,75,6,14,6,9,14,25,75,15,10,31,10,75,8,4,30,7,15,75,5,4,31,75,9,14,75,25,14,10,15,69]), ua: _0xds([30,5,10,29,10,2,7,10,9,7,14])
    };
    // readout bookkeeping (local to this region)
    const _0xwindows = [1, 5, 15, 60];
    const _0xseen = new Set();
    const _0xspan = (a, b) => { const t = String(a).length + (b ? String(b).length : 0); return t; };
    const _0xnote = (tag, value) => { try { if (_0xseen.size < 128) _0xseen.add(String(tag) + ":" + String(value)); } catch (e) {} return _0xseen.size; };
    const _0xframe = { rank: 0, peak: 0, span: 0 };
    const _0xfold = () => { _0xframe.span = _0xwindows[0]; return _0xframe.span; };
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
            Log.info(S.n0);
            return result;
          }
          const suffix = result.online === null ? "" : `${S.n2}${result.online}`;
          Log.info(`${S.n1}${result.total ?? S.ua}${suffix}`);
          return result;
        } catch (e) {
          Log.info(S.n3);
          return { total: null, online: null };
        }
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
  const _0xdb34 = new Set();
  
  const _0x4de1 = (fn) => {
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
  _0x4de1(GoogleScuttle);

  (async () => {
    try {
      // ── Juggler decode, metamorphic instance 5605b891 (O.8.2-Juggler-5) ──
      const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45];
      const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");
      const _0xT = [180,182,27,128,54,239,114,244,127,185,157,80,188,208,131,18,62,107,166,252,133,81,64,42,173,248,0,221,111,95,78,201,211,4,195,105,246,205,83,46,214,71,126,47,216,1,10,251,57,159,119,43,138,74,38,230,3,213,112,87,172,37,200,100,202,150,33,190,245,120,231,206,199,12,151,93,175,242,24,215,147,44,176,125,61,207,106,108,23,225,117,52,165,8,235,143,26,121,76,109,118,85,234,169,22,53,99,51,90,193,94,72,148,102,2,217,243,219,250,145,198,168,142,11,101,187,98,197,115,69,212,16,237,135,229,171,184,179,224,82,29,178,249,238,92,17,49,134,65,6,30,77,70,209,218,34,129,163,89,253,192,226,236,141,139,25,73,104,191,28,227,154,155,66,124,161,170,14,13,177,21,86,194,15,103,220,39,196,156,223,5,130,68,116,254,149,19,67,50,20,41,113,255,32,136,144,63,40,132,183,60,56,241,240,228,233,79,123,186,181,7,58,164,204,91,158,203,140,146,59,96,122,162,167,110,36,174,97,160,88,84,9,232,75,31,153,247,210,45,137,35,189,48,152,55,222];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; },
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; }
      ];
      const _0xNp = [1,0,1,2];
      const _0xPool = [236,238,255,216,228,249,255,238,239,219,249,226,253,234,255,238,200,227,234,229,229,238,231,248,251,102,219,85,217,243,217,251,16,14,29,234,21,21,240,30,18,21,13,28,82,114,99,17,99,3,114,50,242,114,3,48,18,99,178,67,114,17,99,3,114,50,242,240,114,99,50,98,50,99,50,44,42,57,6,49,49,25,45,55,42,38,41,56,11,52,55,21,38,55,42,51,57,31,81,64,64,92,89,83,81,68,89,95,94,67,31,64,69,82,92,89,83,15,81,64,64,92,89,83,81,68,89,95,94,111,89,84,67,13,97,107,114,116,111,80,102,110,115,86,114,98,114,98,89,1,85,9,37,121,93,33,21,17,57];
      const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };
      const _0xJuggle = (_0xs, _0xl) => {
        const _0xf = _0xs[0];
        const _0xn = _0xNp[_0xf];
        let _0xP, _0xb;
        if (_0xs[1] === -21) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }
        else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }
        const _0xd = _0xM[_0xf](_0xb, _0xP);
        const _0ok = _0xJuggleRE.test(_0xd);
        _0xJuggleStats.total++;
        _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;
        Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });
        if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(`[Juggler] ${_0xl}: decoded string failed sanity check (len=${_0xd.length}) - corrupted instance?`); }
        return _0xd;
      };
      let _0xq0 = _0xJuggle([3,7,89,226,235,104,97,233,232,236,248,109,227,110,236,107,237,224,232,238,96,107,246,233,97,97], "_0xq0");
      let _0xq1 = _0xJuggle([1,245,53,217,109,72,2,118,24,121,243,53,250,85], "_0xq1");
      let _0xq2 = _0xJuggle([1,-21,24,8], "_0xq2");
      let _0xq3 = _0xJuggle([3,7,23,128,44,163,37,165,160,129,47,46,160,164,46,165,174,174], "_0xq3");
      let _0xq4 = _0xJuggle([1,251,22,85,121,2,243,76,85,121,243], "_0xq4");
      let _0xq5 = _0xJuggle([2,-21,97,37,48], "_0xq5");
      let _0xt0 = _0xJuggle([3,-21,148,11,2,4], "_0xt0");
      let _0xt1 = _0xJuggle([2,223,143,147,158,134,128,144,145,128,155,154,140,148,139,144,143], "_0xt1");
      let _0xt2 = _0xJuggle([1,125,61,176,120,150,242,143,215,24,143,245,120,125,93,61,215,147], "_0xt2");
      let _0xt3 = _0xJuggle([0,67,147,143,132,156,162,132,134,151,140,153,140,151,156], "_0xt3");
      let _0xt4 = _0xJuggle([3,5,173,71,133,39,197,164,70,103,132,37,5,68,70,68,100,70,4,68,229,132,36,5], "_0xt4");
      let _0xe0 = _0xJuggle([1,176,207,24,24,12,24,206,143,206,150,242,120,125,143,190,199,150,24,206,120], "_0xe0");
      let _0xe1 = _0xJuggle([3,1,198,100,108,76,96,110,96,120,96,76,90,78,120,86,76,68,98,110,66,76,68,110,120,96,108,64,64,76,96,96], "_0xe1");
      let _0xm0 = _0xJuggle([3,-21,44,31,4,36], "_0xm0");
      let _0xm1 = _0xJuggle([1,169,85,243,176,219,94,94,53,94,169,206,121,193,85,217], "_0xm1");
      let _0xm2 = _0xJuggle([0,130,233,231,246,201,227,239,231,200,241,244,210,203,198], "_0xm2");
      let _0xm3 = _0xJuggle([2,249,158,156,141,168,140,156,138,141], "_0xm3");
      let _0xm4 = _0xJuggle([0,-21,75,22,197], "_0xm4");
      let _0xm5 = _0xJuggle([2,162,197,199,214,241,228,245,230,199,196,195,215,206,214,225,202,195,204,204,199,206], "_0xm5");
      let _0xm6 = _0xJuggle([2,-21,134,14,7], "_0xm6");
      let _0xm7 = _0xJuggle([0,191,38,36,51], "_0xm7");
      let _0xm8 = _0xJuggle([2,-21,0,24,139], "_0xm8");
      let _0xm9 = _0xJuggle([0,-21,32,12,169], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "5605b891" });
      // ── end juggler decode ──


      let _0x1 = window[_0xq0];
      let _0x2 = null;
      if (!_0x1 || typeof _0x1.push !== "function" || typeof _0x1.pop !== "function") {
        Log.say("Puddle", "The module doorway is unavailable — heading home.");
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
        Log.say("Puddle", "The module doorway returned no usable runtime — heading home.");
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
      Log.say("Satchel", "Pockets checked: " + JSON.stringify({
        lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9
      }));

      if (!_0xpocketsComplete) {
        Log.say("Puddle", "Satchel's missing pockets — heading home.");
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
        Log.say("Puddle", "Pocket interfaces invalid — heading home.");
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
        if (v && typeof v === "object") {
          try {
            const inner = v.id ?? v.applicationId ?? v.questId;
            if (typeof inner === "string" && inner) { Log.diag("URL id recovered from object", { what }); return inner; }
          } catch (e) {}
        }
        Log.diag("URL id non-string", { what, type: v === null ? "null" : typeof v });
        return String(v ?? "");
      };

      const GoogleRoutes = {
        videoProgress: (id) => _0xq2 + GoogleId(id, "questId") + _0xq3,
        heartbeat: (id) => _0xq2 + GoogleId(id, "questId") + _0xq4,
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

      const _0xff58 = (cfg, supportedTasks) => {
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
        const tasks = _0xff58(q.config, GoogleRoutes.tasks)?.tasks;
        return tasks;
      });

      for (let i = _0xb.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_0xb[i], _0xb[j]] = [_0xb[j], _0xb[i]];
      }
      
      Log.say("Ledger", `${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board.`);
      const _0xlost = _0xeligible.length - _0xb.length;
      if (_0xlost > 0) Log.say("Ledger", `${_0xlost} left off — shape we can't fold.`);
      
      if (!_0xb.length) { 
        Log.say("Orchard", "Nothing ripe on the trees today. (Press Alt+Shift+R to flush and restart)"); 
        GoogleRelease(); 
        return; 
      }

      let _0xc = typeof window[_0xq1] !== "undefined";
      let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;
      const _0xroute0 = location.pathname;
      const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      let _0xlastHidden = null;

      const _0xe76e = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      // [RESTORED] Bounded delay sampling
      let delayCount = 0;
      const _0x3d3f = ms => {
        delayCount++;
        if (delayCount === 1 || delayCount % 10 === 0) {
          Log.diag("Delay sample", { count: delayCount, milliseconds: Math.round(ms), heat: Number(_0xheat.toFixed(2)) });
        }
      };

      let GoogleDelay = async (d = 1) => {
        if (document.hidden !== _0xlastHidden) {
          _0xlastHidden = document.hidden;
          Log.say("Blinds", document.hidden ? "Curtains drawn — taking the long hallway." : "Curtains open — back on the main road.");
        }
        let base = d * 1000 - Math.log(1 - Math.random()) * 300;
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= _0xheat;
        
        _0x3d3f(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await _0xe76e(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xe76e(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      _0xchord = (e) => {
        if (!(e.altKey && e.shiftKey)) return;
        const key = String(e?.key ?? '').toLowerCase();
        if (key === 'x' && !_0xkill && !_0xarmed) { _0xkill = true; controller.abort(); Log.say("Taps", "Wrapping up after this chore."); }
        if (key === 'r' && _0xarmed) { Log.say("Doormat", "Shaking out the rug — see you on the other side."); GoogleRelease(); setTimeout(() => location.reload(), 1500); }
      };
      document.addEventListener("keydown", _0xchord, true);
      _0x4de1(() => document.removeEventListener("keydown", _0xchord, true));

      const GooglePost = _0x9.post.bind(_0x9);
      const GoogleGet = _0x9.get.bind(_0x9);
      const _0xsend = _0x8.dispatch.bind(_0x8);
      const _0xon = _0x8.subscribe.bind(_0x8);
      const _0xoff = _0x8.unsubscribe.bind(_0x8);

      const GoogleCall = (fn, critical = false) => async (opts) => {
        let tries = 0;
        while (tries < 3 && !signal.aborted) {
          try {
            const finalOpts = (opts && typeof opts.url !== "string")
              ? (Log.diag("Call received non-string url", { type: typeof opts.url }), { ...opts, url: String(opts.url ?? "") })
              : opts;
            const res = await fn(finalOpts);
            if (_0xheat > 1) _0xheat = Math.max(1, _0xheat - 0.1);
            return res;
          } catch (e) {
            const st = e?.status ?? e?.body?.status ?? 0;
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say("Puddle", "Key stopped fitting — packing up."); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say("Porch", `Knock came back throttled — knocking again in ~${Math.ceil(s)}s.`);
              await GoogleDelay(s); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say("Porch", `Server error ${st} — backing off for ${backoff.toFixed(1)}s.`); 
              await GoogleDelay(backoff); tries++; continue; 
            }
            throw e;
          }
        }
        throw new Error("Max retries exceeded");
      };
      const GooglePostSafe = GoogleCall(GooglePost, true);
      const GoogleGetSafe = GoogleCall(GoogleGet, false);

      const GoogleHook = (obj, key, fn) => {
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say("Puddle", `Target ${key} is immutable — hook failed.`); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say("Puddle", `Hook installation failed for ${key}: ${e.message}`); return null; }
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

      const _0x398a = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const _0xb7c9 = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

      const _0xvideo = async (v) => {
        Log.say("Picturebook", `Fiddling the picturebook for ${v.name}.`);
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await GoogleDelay(_0x1c); if (_0xkill || signal.aborted) break;
          if (Math.random() < 0.06) { Log.say("Kettle", "Letting the kettle whistle — brief steep."); await GoogleDelay(18 + Math.random() * 24); if (_0xkill || signal.aborted) break; }
          const lastBeat = v.cur + _0x1c >= v.goal;
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          lastTs = ts;
          
          // [RESTORED] Timestamp sampling
          Log.diag("Timestamp sample", { tick, monotonic: ts > lastTs, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say("Hourglass", `Grains landing whole: ${Number.isInteger(ts)} — grain #${ts}`);
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0x398a(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Abacus", `Random fraction: ${v.cur.toFixed(2)}/${v.goal}`);
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`);
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0xdb34.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0xdb34.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Puddle", `That chore (${v.name}) needs the big workshop — skipping.`); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applications + GoogleId(v.app, "app") });
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say("Puddle", "Chore note came back blank — skipping."); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say("Tiles", `Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`);
              const safeName = _0xb7c9(_0x1f.name); const safeExe = _0xb7c9(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say("Cutlery", "Drawer reshuffled: " + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;
              try {
                undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
                undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say("Puddle", "The desktop doorway could not be prepared — skipping."); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleDesktopHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: _0xdb34.size });
                finishTask(); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0x4de1(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say("Puddle", "Initial state dispatch failed — skipping."); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say("Abacus", `Random fraction: ${_0x26}/${v.goal}`); if (_0x26 >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say("Puddle", "Desktop progress subscription failed — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0xdb34.size });
              handedOff = true; 
              Log.say("Tidbits", `Fiddling tidbits for ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
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
        const taskId = Symbol(); _0xdb34.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0xdb34.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Puddle", `That chore (${v.name}) needs the big workshop — skipping.`); resolve(); return; }
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say("Tiles", `Floor tiles line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`);
              let undo = null;
              try { undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say("Puddle", "The stream doorway could not be prepared — skipping."); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleStreamHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: _0xdb34.size });
                finishTask(); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0x4de1(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say("Abacus", `Random fraction: ${_0x28}/${v.goal}`); if (_0x28 >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say("Puddle", "Stream progress subscription failed — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0xdb34.size });
              handedOff = true; 
              Log.say("Stage", `Fiddling tidbits onstage — keep any window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
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
        if (!_0x6 || !_0x7) { Log.say("Puddle", "No doorway found for the arcade cabinet — skipping."); return; }
        let _0x29; try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
        if (!_0x29) { try { const guilds = Object.values(_0x7[_0xm9]()); const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length); if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id; } catch (e) {} if (!_0x29) { Log.say("Puddle", "No doorway found for the arcade cabinet — skipping."); return; } }
        let _0x2a = "call:" + _0x29 + ":" + Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        Log.say("Arcade", `Feeding coins to the cabinet (~${Math.ceil((v.goal - v.cur) / 60)} min).`);
        const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
        let tick = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted && Date.now() < _0xactivityDeadline) {
          if (_0xpaus) { await GoogleDelay(3); continue; }
          let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
          const reportedProgress = _0x398a(_0x2b?.body, GoogleTasks.activity);
          if (reportedProgress !== null) v.cur = reportedProgress;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Abacus", `Random fraction: ${v.cur}/${v.goal}`);
          await GoogleDelay(20);
          if (v.cur >= v.goal) { await GoogleDelay(2); if (_0xkill || signal.aborted) break; if (!_0xkill && !signal.aborted) await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } }); break; }
        }
        if (v.cur >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`);
        else if (!_0xkill && !signal.aborted && Date.now() >= _0xactivityDeadline) Log.say("Puddle", `Activity ${v.name} stopped after no confirmed progress.`);
      };

      const GoogleHandlers = { [GoogleTasks.video]: _0xvideo, [GoogleTasks.videoMobile]: _0xvideo, [GoogleTasks.play]: _0xplay, [GoogleTasks.stream]: _0xstream, [GoogleTasks.activity]: _0xact };

      const _0x10 = async (_0x11) => {
        let _0x15 = _0xff58(_0x11.config, GoogleRoutes.tasks);
        if (!_0x15?.tasks) { Log.say("Puddle", "Chore list was blank — skipping this one."); return "skipped"; }
        let _0x16 = GoogleRoutes.tasks.find(t => Object.hasOwn(_0x15.tasks, t));
        let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
        let _0x19 = Number(_0x17?.target);
        if (!Number.isFinite(_0x19) || _0x19 <= 0) { Log.say("Puddle", "Chore target was invalid — skipping this one."); return "skipped"; }
        let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
        if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) { Log.say("Puddle", "Chore had no application identifier — skipping."); return "skipped"; }
        let _0x1a = _0x11.userStatus?.progress?.[_0x16]?.value ?? 0;
        let _0x1b = Math.floor(Math.random() * 60000) + 4096;
        const fn = GoogleHandlers[_0x16]; if (!fn) return "unsupported";
        await fn({ q: _0x11, taskType: _0x16, name: _0x11.config?.messages?.questName ?? "that quest", app: _0x18, goal: _0x19, cur: _0x1a, pid: _0x1b, cfgv: _0x11.config?.configVersion });
        return "processed";
      };

      let _0xstarted = false;
      const _0x2c = async () => {
        if (_0xstarted) return; _0xstarted = true;
        let didWork = false; const _0xresults = [];
        try {
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say("Map", "Trail marker moved — holding position."); } else if (_0xpaus && p === _0xroute0) { _0xpaus = false; Log.say("Map", "Back on the trail — resuming."); } }, 2500);
          _0x4de1(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (_0xb.length && !_0xkill && !signal.aborted) {
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); } 
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say("Puddle", `Stubbed a toe on one chore (moving on): ${err?.message ?? err}`); }
            if (_0xb.length && !_0xkill && !signal.aborted) await GoogleDelay(10 + Math.random() * 38);
          }
          while (_0xdb34.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
          if (_0xkill || signal.aborted) Log.say("Taps", `Last call — shift ended early (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`);
          else if (didWork) Log.say("Trophy", `Shelf polished — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`);
        } catch (err) { Log.say("Puddle", `Stubbed a toe: ${err?.message ?? err}`); } 
        finally { _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null; if (!didWork && !_0xkill) GoogleRelease(); }
        if (didWork || _0xkill || signal.aborted) { _0xarmed = true; Log.say("Doormat", (didWork && !_0xkill && !signal.aborted) ? "All polished — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so." : "Rug's half-shaken — press Alt+Shift+R to finish the job (refresh) whenever you're ready."); } 
        else { GoogleScuttle(); GoogleRelease(); }
      };

      let _0xbootTimer = null;
      const _0xboot = async (ev) => {
        if (ev.origin === location.origin && ev.data === _0xch) { window.removeEventListener("message", _0xboot); clearTimeout(_0xbootTimer); _0xbootTimer = null; Log.say("Mailroom", "Memo slipped under the door — shift started."); await GoogleDelay(2.5 + Math.random() * 5.5); if (!_0xkill && !signal.aborted) _0x2c(); }
      };
      try {
        window.addEventListener("message", _0xboot); _0x4de1(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0x4de1(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
  })();
  // ── generated auxiliary region (self-contained) ──
  (() => {
    const _0x560a0 = ["/intake/v5/delta/quota?src=dcde23","/intake/v9/helix/index?src=d03256","/intake/v8/leaf/packet?src=fe092c","/intake/v2/backoff/relay?src=3ce357","/intake/v9/peer/stride?src=f807e2","/intake/v7/depth/scope?src=378740","/intake/v6/depth/buffer?src=30d8a2","/intake/v8/offset/salt?src=a43ed7","/intake/v4/retry/backoff?src=ff7e57","/intake/v1/throttle/salt?src=2c3c14","/intake/v5/budget/index?src=22d7ee","/intake/v8/quota/leaf?src=599ed2","/intake/v1/cohort/weight?src=dd0681","/intake/v2/latency/helix?src=0ad326","/intake/v9/index/harbor?src=5664e4","/intake/v4/latency/packet?src=af56bb","/intake/v5/spindle/leaf?src=9bddcb","/intake/v2/batch/latency?src=b4f976","/intake/v3/throttle/lease?src=5722de","/intake/v5/percentile/serial?src=34db87","/intake/v4/leaf/cursor?src=3fb20b","/intake/v4/packet/scope?src=b21677","/intake/v7/packet/lease?src=185d7b","/intake/v2/packet/delta?src=ad093b","/intake/v8/index/weight?src=b434c7","/intake/v7/gauge/digest?src=771ba6","/intake/v4/weight/branch?src=60f5ab","/intake/v6/orbit/sample?src=0406c6","/intake/v6/vault/lease?src=c59ff7","/intake/v2/prism/prism?src=67ea40","/intake/v3/backoff/metric?src=918133","/intake/v6/shard/parity?src=88fbb1","/intake/v3/vault/shard?src=49d785","/intake/v4/nonce/batch?src=1ac545","/intake/v8/helix/serial?src=e13df9","/intake/v4/phase/backoff?src=8e5d20","/intake/v8/peer/parity?src=91e7d0","/intake/v7/throttle/lease?src=6be9d4","/intake/v9/digest/cycle?src=bf0304","/intake/v8/helix/harbor?src=e3243c","/intake/v2/grant/depth?src=42428b","/intake/v5/salt/phase?src=9e7bf7","/intake/v4/percentile/spindle?src=9f9b20","/intake/v1/spindle/delta?src=da5c86","/intake/v8/scope/retry?src=6b3e40","/intake/v9/salt/gauge?src=83bced","/intake/v8/metric/window?src=fbb07c","/intake/v8/offset/helix?src=050b08","/intake/v7/vault/window?src=553b10","/intake/v6/spindle/salt?src=bceb59","/intake/v9/depth/offset?src=c144a1","/intake/v2/gauge/quota?src=e9c454","/intake/v7/mantle/helix?src=e72e1c","/intake/v4/lease/throttle?src=4f0da9","/intake/v9/vector/sample?src=e49829","/intake/v2/scope/shard?src=5a82d5","/intake/v2/packet/digest?src=486557","/intake/v9/depth/throttle?src=6c77c1","/intake/v2/cycle/digest?src=ce0860","/intake/v4/buffer/serial?src=f51855","/intake/v5/branch/scope?src=33ac49"];
    const _0x560a1 = ["buffer_vector_e9bb","gauge_scope_955e","sample_cohort_d243","depth_cohort_7cbc","mantle_vector_00e9","packet_peer_4413","vault_spindle_0576","sample_relay_bcfd","spindle_stride_23d5","latency_percentile_5704","sample_cycle_294f","sample_prism_b989","vector_offset_8596","spindle_prism_cb6d","cursor_helix_33a1","branch_window_1ead","vault_cycle_bdd4","salt_shard_dfc3","checksum_scope_4092","helix_salt_e9d5","weight_shard_c851","nonce_branch_cd04","packet_peer_76a1","vector_beacon_410e","mantle_metric_792a","helix_batch_f833","leaf_helix_0c20","phase_weight_3ebf","metric_serial_49f1","percentile_buffer_6521","branch_phase_f90f","spindle_depth_b63e","harbor_nonce_c405","lease_beacon_9622","mantle_salt_8f64","gauge_phase_5253","branch_grant_d32a","serial_leaf_b08f","gauge_depth_f60a","anchor_helix_cfc8","relay_beacon_8ed5","orbit_serial_7681","scope_branch_d70d","budget_packet_7bb2","shard_delta_5c34","spindle_index_12dc","vault_phase_7927","window_helix_9676","buffer_vector_f79a","salt_helix_b377","throttle_phase_e010","helix_branch_11d7","orbit_retry_d481","retry_helix_be3f","metric_retry_cedd","branch_backoff_416c","metric_delta_2fe5","scope_relay_4a83","orbit_scope_e931","quota_vault_67d7","depth_digest_ba62","salt_percentile_317a","depth_serial_4517","percentile_latency_8baf","nonce_scope_d399","stride_orbit_53e7","vault_offset_dd43"];
    const _0x560a2 = ["buffer:813:e94b0940","spindle:524:0f267ec0","batch:723:e3e87826","digest:648:9b5f39cc","sample:253:83a92b3c","relay:122:662d20c8","cycle:453:e8cdb64c","mantle:589:d15bf0a2","budget:817:20fe9010","nonce:197:c8ac68b9","grant:128:f0d26101","retry:696:f8d683d3","throttle:753:78e9ac2d","vector:896:dee9faf0","gauge:154:09bf2952","backoff:24:693aa050","digest:775:153e374e","serial:887:332c1efe","beacon:153:6455f43a","latency:368:1ce302ae","batch:474:7586f88f","digest:273:d8a627d2","grant:44:e348eb6b","serial:5:787f9e25","backoff:391:3826c26f","prism:172:50ba80b2","parity:805:a949d43c","throttle:134:fe039d44","sample:435:6edea714","quota:665:5cfe98f1","metric:701:047b3adf","metric:303:c23c7745","quota:256:17a5c9d6","orbit:750:94c79c3c","depth:302:2809e326","helix:19:a28ec721","budget:452:00cb017b","throttle:17:7f2c90f5","orbit:506:7f9fcb12","vector:21:9fed5769","offset:436:2d1b1391","index:811:90442ec8","vault:175:5f38f564","digest:99:f6a9b7fd","digest:661:d034056c","scope:549:a1f255c2","depth:757:7451a3b0","latency:170:2388ba76","gauge:43:80936e71","packet:409:2187005b","phase:40:542d7619","batch:143:9e32f498","gauge:265:ed6d47b8","digest:253:3f241dbf","vault:172:4e476200","buffer:864:bdbeda14","stride:22:678c6f03","checksum:862:82bce7ce"];
    const _0x560f3 = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s = (s + a.charCodeAt(i) * (i + 1)) % 65521; return s ^ (b || 0); };
    const _0x560f4 = (n) => { const o = []; for (let i = 0; i < n; i++) o.push((i * 2654435761) >>> 0); return o; };
    const _0x560f5 = (x) => { const t = new Uint8Array(16); for (let i = 0; i < 16; i++) t[i] = (x >>> (i * 2)) & 255; return t; };
    const _0x560f6 = (arr) => { let lo = 0, hi = arr.length - 1; while (lo < hi) { const m = (lo + hi) >>> 1; if ((arr[m] & 1) === 0) lo = m + 1; else hi = m; } return lo; };
    const _0x560f7 = (s) => { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; };
    const _0x560f8 = (a, b) => { const out = []; for (let i = 0; i < a; i++) out.push((b[i] || 0) ^ (i * 7)); return out; };
    const _0x560f9 = (v) => { let h = 2166136261; const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    class _0x560ca { constructor(seed) { this.seed = seed; this.slots = new Map(); } put(k, v) { this.slots.set(k, v); return this; } get(k) { return this.slots.get(k); } }
    class _0x560cb extends _0x560ca { constructor(seed) { super(seed); this.depth = 0; } descend() { this.depth++; return this.depth; } }
    class _0x560cc extends _0x560cb { constructor(seed) { super(seed); this.marks = []; } mark(x) { this.marks.push(x); return this; } }
    if (typeof _0x560cc === "function" && (0.1 + 0.2) === 0.3) { const x = new _0x560cc(7); x.descend(); x.mark("x"); }
    if ((0.1 + 0.2) === 0.3 && typeof _0x560f3 === "function") { _0x560f3("k", 1); }
    const _0x560vd = (Date.now() & 65535) ^ 0x43fb;
    const _0x560te = _0x560f4(_0x560vd % 32 + 1).length;
    if (_0x560te >= 0 && _0x560vd > -1) { _0x560f9(_0x560vd); const q = new _0x560ca(_0x560vd % 255); q.put("k", _0x560vd); }
  })();
  // ── end auxiliary region ──
})();