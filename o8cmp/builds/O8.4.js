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

  const SUITE_VERSION = "O.8.4";
  const INSTANCE_ID = "e448abd3";
  Log.info(`[Quest ${SUITE_VERSION}] started — metamorphic instance ${INSTANCE_ID}.`);
  Log.diag(`O8.4 core — refill queue, humanized pacing, rest cycles, metamorphic decode, fail-closed URL guard.`);
  
  // [RESTORED] Experimental configuration summary
  Log.diag("Experimental configuration", {
    delayModel: "lognormal",
    lazyForcer: true,
    lazyForceLimit: 50,
    timestampModel: "monotonic-five-decimal",
    promiseHandoff: true,
    randomizedIdentityFallback: true,
    randomizedActivityKey: true,
    sessionFatigue: true,
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
  const _0xf155 = new Set();
  
  const _0x6837 = (fn) => {
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
  _0x6837(GoogleScuttle);

  (async () => {
    try {
      // ── Juggler decode, metamorphic instance e448abd3 (O.8.4) ──
      const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45];
      const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");
      const _0xT = [174,19,145,39,107,149,108,142,175,129,111,150,81,251,248,40,49,28,110,90,131,33,103,85,0,102,135,222,181,148,247,136,250,173,10,121,223,80,128,77,168,210,154,239,179,187,71,48,51,195,53,78,89,134,243,199,117,157,201,232,43,214,16,125,156,169,60,155,212,249,180,93,127,34,11,254,183,185,190,36,104,100,119,130,146,20,55,76,224,206,229,106,166,216,84,57,5,211,62,35,167,15,196,165,105,151,213,152,177,197,160,242,88,143,42,30,189,67,193,32,191,120,47,17,45,13,61,231,188,203,31,164,54,198,65,96,219,41,220,86,83,9,205,56,228,240,147,226,113,184,72,99,132,162,126,244,46,218,122,7,236,82,186,235,227,202,158,123,18,101,73,12,44,24,170,159,95,194,200,172,38,237,114,75,69,58,74,217,50,176,141,116,238,68,138,144,27,209,59,133,26,234,22,109,204,8,140,192,178,3,6,66,137,29,98,23,230,112,153,21,64,241,94,4,225,215,252,246,14,245,233,207,182,87,253,92,208,63,255,1,221,79,171,70,124,97,115,91,37,25,161,52,163,118,2,139];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; }
      ];
      const _0xNp = [0,1,1,2];
      const _0xPool = [142,138,127,151,157,141,140,157,130,131,145,137,146,141,142,165,15,189,169,177,177,146,105,42,15,211,167,30,180,242,42,104,211,42,15,160,189,79,69,92,90,65,126,72,64,93,120,92,76,92,76,202,11,138,79,78,77,201,205,141,201,15,79,202,204,11,205,10,175,173,188,137,164,164,143,189,161,164,172,187,100,20,249,130,146,130,57,130,249,190,212,57,127,249,169,119,146,60,249,169,146,57,130,20,155,155,249,130,130,37,35,50,17,4,21,2,35,36,31,51,42,50,1,38,31,44,44,35,42,19,17,0,39,0,6,17,21,25,17,6,53,23,0,29,2,17,39,0,6,17,21,25,57,17,0,21,16,21,0,21,142,192,209,209,205,200,194,192,213,200,206,207,210,142,209,212,195,205,200,194,158,192,209,209,205,200,194,192,213,200,206,207,254,200,197,210,156];
      const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };
      const _0xJuggle = (_0xs, _0xl) => {
        const _0xf = _0xs[0];
        const _0xn = _0xNp[_0xf];
        let _0xP, _0xb;
        if (_0xs[1] === -20) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }
        else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }
        const _0xd = _0xM[_0xf](_0xb, _0xP);
        const _0ok = _0xJuggleRE.test(_0xd);
        _0xJuggleStats.total++;
        _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;
        Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });
        if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(`[Juggler] ${_0xl}: decoded string failed sanity check (len=${_0xd.length}) - corrupted instance?`); }
        return _0xd;
      };
      let _0xq0 = _0xJuggle([0,32,15,62,88,211,35,152,155,105,67,160,152,167,151,30,35,242,42,167,57,211,88,88], "_0xq0");
      let _0xq1 = _0xJuggle([0,212,151,30,35,242,42,167,190,211,189,151,193,15], "_0xq1");
      let _0xq2 = _0xJuggle([3,1,33,127,195,203,235,199,201,199,127], "_0xq2");
      let _0xq3 = _0xJuggle([1,109,156,227,214,209,210,220,154,221,223,220,212,223,210,224,224], "_0xq3");
      let _0xq4 = _0xJuggle([1,178,225,26,23,19,36,38,20,23,19,38], "_0xq4");
      let _0xq5 = _0xJuggle([2,-20,160,37,161], "_0xq5");
      let _0xt0 = _0xJuggle([3,4,215,162,195,146,227,83,34,178,67,147,131,35], "_0xt0");
      let _0xt1 = _0xJuggle([1,-20,0,15,62], "_0xt1");
      let _0xt2 = _0xJuggle([3,-20,51,17,6,30], "_0xt2");
      let _0xt3 = _0xJuggle([1,97,177,173,162,186,192,162,164,181,170,183,170,181,186], "_0xt3");
      let _0xt4 = _0xJuggle([1,214,45,23,42,25,30,53,44,31,26,27,37,53,37,36,53,35,37,24,31,34,27], "_0xt4");
      let _0xe0 = _0xJuggle([0,119,20,190,190,34,190,93,57,93,169,185,249,130,57,155,127,169,190,93,249], "_0xe0");
      let _0xe1 = _0xJuggle([0,-20,80,29], "_0xe1");
      let _0xm0 = _0xJuggle([2,-20,129,31,116], "_0xm0");
      let _0xm1 = _0xJuggle([1,180,27,25,40,6,41,34,34,29,34,27,251,21,33,25,39], "_0xm1");
      let _0xm2 = _0xJuggle([2,70,33,35,50,1,39,43,35,0,41,52,22,15,2], "_0xm2");
      let _0xm3 = _0xJuggle([0,165,15,189,100,67,15,30,189], "_0xm3");
      let _0xm4 = _0xJuggle([0,-20,15,22], "_0xm4");
      let _0xm5 = _0xJuggle([1,-20,109,20,190], "_0xm5");
      let _0xm6 = _0xJuggle([2,-20,37,14,41], "_0xm6");
      let _0xm7 = _0xJuggle([3,3,17,42,58,178], "_0xm7");
      let _0xm8 = _0xJuggle([3,2,153,4,12,72,212,36,80,72,12,8,216,80,60,64,28,72,12,148,56,28,32,32,12,40,84], "_0xm8");
      let _0xm9 = _0xJuggle([2,-20,68,12,200], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "e448abd3" });
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

      const _0x95a9 = (cfg, supportedTasks) => {
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
        const tasks = _0x95a9(q.config, GoogleRoutes.tasks)?.tasks;
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
      const _0xroute0 = ((1 / 3) * 3) === 1 ? location.pathname : location.pathname.slice(0);
      const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      let _0xlastHidden = null;

      const _0x172d = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      // [RESTORED] Bounded delay sampling
      let delayCount = 0;
      const _0x7c62 = ms => {
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
          Log.say("Blinds", document.hidden ? "Curtains drawn — taking the long hallway." : "Curtains open — back on the main road.");
        }
        let base = _0xln(d * 1000);
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= _0xheat;
        
        _0x7c62(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await _0x172d(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0x172d(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      // Server-compliance wait: raw ms, no humanization (429 retry_after / 5xx backoff).
      const GoogleDelayRaw = async (ms) => {
        let remaining = Math.max(0, ms);
        while (remaining > 0 && !signal.aborted) {
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0x172d(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
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
      _0x6837(() => document.removeEventListener("keydown", _0xchord, true));

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
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say("Puddle", "Key stopped fitting — packing up."); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say("Porch", `Knock came back throttled — knocking again in ~${Math.ceil(s)}s.`);
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say("Porch", `Server error ${st} — backing off for ${backoff.toFixed(1)}s.`); 
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

      const _0x8b24 = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const _0x819b = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

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
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          // [RESTORED] Timestamp sampling
          Log.diag("Timestamp sample", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say("Hourglass", `Grains landing whole: ${Number.isInteger(ts)} — grain #${ts}`);
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0x8b24(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Abacus", `Random fraction: ${v.cur.toFixed(2)}/${v.goal}`);
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`);
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0xf155.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0xf155.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say("Puddle", `That chore (${v.name}) needs the big workshop — skipping.`); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applicationsUrl(v.app) });
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say("Puddle", "Chore note came back blank — skipping."); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say("Tiles", `Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`);
              const safeName = _0x819b(_0x1f.name); const safeExe = _0x819b(_0x20);
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
                finishTask();
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: _0xf155.size }); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0x6837(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say("Puddle", "Initial state dispatch failed — skipping."); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say("Abacus", `Random fraction: ${_0x26}/${v.goal}`); if (_0x26 >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say("Puddle", "Desktop progress subscription failed — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0xf155.size });
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
        const taskId = Symbol(); _0xf155.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0xf155.delete(taskId); } };
        
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
                finishTask();
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: _0xf155.size }); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0x6837(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say("Abacus", `Random fraction: ${_0x28}/${v.goal}`); if (_0x28 >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say("Puddle", "Stream progress subscription failed — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0xf155.size });
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
          const reportedProgress = _0x8b24(_0x2b?.body, GoogleTasks.activity);
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
        let _0x15 = _0x95a9(_0x11.config, GoogleRoutes.tasks);
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
              if (!_0x95a9(q.config, GoogleRoutes.tasks)?.tasks) continue;
              _0xb.push(q); _0xdone.add(q.id); _0added++;
            }
            return _0added;
          } catch (e) { return 0; }
        };
        let _0xsession0 = Date.now();
        const _0xbudget = () => (35 + Math.random() * 15) * 60 * 1000;   // 35-50 min per session
        const _0xrestMs = () => (12 + Math.random() * 8) * 60 * 1000;    // 12-20 min rest
        let _0xresting = false;
        const _0xe025 = async () => {
          if (_0xresting || _0xpaus || _0xkill || signal.aborted) return false;
          if (Date.now() - _0xsession0 < _0xbudget()) return false;
          if (_0xb.length === 0 && _0xf155.size === 0) return false;
          _0xresting = true;
          Log.say("Siesta", "Resting the eyes — back on the trail shortly.");
          await GoogleDelayRaw(_0xrestMs());
          _0xresting = false;
          _0xsession0 = Date.now();
          return true;
        };
        try {
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say("Map", "Trail marker moved — holding position."); } else if (_0xpaus && p === _0route0) { _0xpaus = false; Log.say("Map", "Back on the trail — resuming."); } }, 2500);
          _0x6837(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (!_0xkill && !signal.aborted) {
            if (!_0xb.length) {
              const _0new = _0xrefill();
              if (_0new > 0) { Log.say("Ledger", `${_0new} more chore${_0new === 1 ? "" : "s"} joined the board.`); continue; }
              break;
            }
            if (await _0xe025()) continue;
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            _0xdone.add(_0x2d.id);
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); }
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say("Puddle", `Stubbed a toe on one chore (moving on): ${err?.message ?? err}`); }
            if (_0xb.length && !_0xkill && !signal.aborted) await GoogleDelay(10 + Math.random() * 38);
          }
while (_0xf155.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
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
        window.addEventListener("message", _0xboot); _0x6837(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0x6837(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
  })();
  // ── generated auxiliary region (self-contained) ──
  (() => {
    const _0xe44a0 = ["/intake/v1/parity/cycle?src=2f3096","/intake/v7/relay/throttle?src=f56ec5","/intake/v2/phase/delta?src=439ed7","/intake/v6/index/batch?src=a18ebf","/intake/v7/percentile/relay?src=e6050d","/intake/v8/backoff/prism?src=f011af","/intake/v7/nonce/nonce?src=15625b","/intake/v5/throttle/cursor?src=b3e3f8","/intake/v8/grant/throttle?src=c0a084","/intake/v9/prism/mantle?src=f6124e","/intake/v6/parity/grant?src=31cd13","/intake/v9/window/sample?src=7cd320","/intake/v1/beacon/vector?src=90797d","/intake/v7/digest/window?src=bd0bbe","/intake/v1/stride/retry?src=e30e22","/intake/v2/sample/leaf?src=b14446","/intake/v8/batch/branch?src=fa454d","/intake/v9/stride/checksum?src=1867fd","/intake/v8/phase/helix?src=48a926","/intake/v8/cohort/sample?src=e99302","/intake/v3/spindle/checksum?src=c9c870","/intake/v5/delta/phase?src=87d331","/intake/v3/scope/buffer?src=677dab","/intake/v8/peer/sample?src=51604a","/intake/v5/budget/salt?src=d7640b","/intake/v8/parity/sample?src=860757","/intake/v2/beacon/backoff?src=525a99","/intake/v6/lease/cohort?src=ee84f3","/intake/v6/branch/grant?src=d0291f","/intake/v8/shard/buffer?src=cf0490","/intake/v1/latency/anchor?src=b9f479","/intake/v8/checksum/nonce?src=982549","/intake/v9/lease/retry?src=94ce67","/intake/v2/weight/offset?src=d078ac","/intake/v1/salt/parity?src=30ec91","/intake/v5/cycle/weight?src=17458c","/intake/v2/delta/nonce?src=d2e287","/intake/v3/harbor/budget?src=44c83b","/intake/v5/helix/mantle?src=5c0231","/intake/v5/delta/buffer?src=843df7","/intake/v5/vector/backoff?src=5605c2","/intake/v3/backoff/latency?src=9deb38","/intake/v1/lease/stride?src=138ce9","/intake/v9/delta/harbor?src=e43ce6","/intake/v6/grant/vector?src=5e5d09","/intake/v4/spindle/window?src=4f8ddf","/intake/v8/weight/nonce?src=4cef6b","/intake/v5/throttle/window?src=df5932","/intake/v7/relay/relay?src=d33165","/intake/v3/buffer/sample?src=15ca15","/intake/v4/depth/retry?src=e993c3","/intake/v8/weight/scope?src=5c6c3f","/intake/v6/throttle/grant?src=030bc5","/intake/v4/gauge/batch?src=b2a5aa","/intake/v4/batch/latency?src=46b5f5","/intake/v8/packet/shard?src=6a8ec0","/intake/v6/grant/percentile?src=ffeae7","/intake/v2/grant/metric?src=7cc932","/intake/v5/orbit/anchor?src=23c6b8","/intake/v7/throttle/budget?src=7fc056","/intake/v9/branch/beacon?src=95a613","/intake/v9/nonce/offset?src=699057"];
    const _0xe44a1 = ["cycle_latency_ceb9","orbit_index_be63","lease_index_785d","relay_checksum_2a25","vault_backoff_b0a6","lease_nonce_1f6f","digest_sample_11d2","helix_sample_6011","depth_checksum_2e6a","stride_delta_99ff","delta_vector_7b93","beacon_serial_4e3b","vault_window_5c36","nonce_beacon_87f0","window_budget_26dd","mantle_anchor_a64e","grant_anchor_59ca","stride_serial_44c2","latency_batch_0fcb","offset_backoff_2939","cycle_spindle_f922","weight_prism_cdfb","batch_metric_d1f8","branch_batch_497c","orbit_budget_6d7f","depth_helix_322d","depth_cursor_9fa1","harbor_offset_fa0b","nonce_cycle_f7ee","gauge_percentile_996e","metric_prism_aa70","leaf_checksum_1ba6","shard_harbor_2011","quota_shard_ff50","cohort_lease_ebad","metric_metric_da06","digest_orbit_9b99","vector_budget_7ba0","prism_throttle_9106","percentile_lease_f276","quota_beacon_d05c","prism_percentile_3064","backoff_offset_75af","metric_serial_94e7","gauge_lease_e955","retry_orbit_1e8e","peer_prism_cf53","digest_metric_5712","index_gauge_3d59","scope_buffer_61bc","throttle_scope_4ccb","anchor_depth_93cb","index_gauge_5704","vault_anchor_e268","buffer_shard_87af","throttle_shard_1ece","buffer_checksum_c6e1","orbit_mantle_a399","grant_metric_b1bb","parity_budget_792d","budget_nonce_6a7b","buffer_scope_f151","retry_throttle_7e1e","delta_leaf_21a1","depth_scope_5932","vector_lease_174c","stride_budget_38eb"];
    const _0xe44a2 = ["nonce:653:47a440d8","batch:730:6366ab1a","gauge:287:a5ab3cbd","lease:521:de26abf5","sample:567:9e6addf3","digest:522:699a0059","metric:661:e45d44a5","nonce:508:6f360f6d","peer:360:83eb2da0","prism:218:3cc46267","vault:540:1d2bd176","helix:832:f7c2f64e","packet:255:a7008ace","harbor:753:c0d2ae54","index:622:483aa89b","vector:747:354536f7","orbit:595:9059002a","peer:339:ef64dbec","shard:333:5c611253","peer:325:e761e268","packet:819:7fbf75d3","cycle:588:abb73ab5","prism:122:20aca54e","offset:339:bf38a16b","scope:594:8b8073f6","cursor:637:1a24ce02","stride:544:e40eb363","phase:845:6225aceb","beacon:260:14e8068c","spindle:181:c210e5b1","stride:681:9e57db49","depth:528:7eebc9e0","scope:643:f63f40c5","helix:842:bf6382bb","serial:768:a4967f6c","vault:216:8aca1398","harbor:816:7b217ec0","peer:8:b000bd54","percentile:592:d07bd2bf","branch:491:484f0de6","mantle:291:93baba91","digest:12:f94c221f","window:468:3d956a20","packet:807:8d0cd708","packet:556:49cea938","parity:345:c0a1a2c2","vault:387:eaa285fc","budget:18:4be7579d","grant:162:2d6bae86","throttle:567:4a3fc087","percentile:22:e3c60dc1","nonce:168:b4276219","offset:404:ec502f8b","scope:753:da86ff22","serial:718:72750c68","grant:869:24e2f729","percentile:68:8d879f3c","sample:367:49f0f7f9","nonce:76:a60eb29d","serial:406:7fe921cd","depth:369:874d9181","prism:809:3c2a2c52","spindle:304:2545c419","metric:550:1ab94470","salt:328:c532b30a","cycle:611:b859662d"];
    const _0xe44f3 = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s = (s + a.charCodeAt(i) * (i + 1)) % 65521; return s ^ (b || 0); };
    const _0xe44f4 = (n) => { const o = []; for (let i = 0; i < n; i++) o.push((i * 2654435761) >>> 0); return o; };
    const _0xe44f5 = (x) => { const t = new Uint8Array(16); for (let i = 0; i < 16; i++) t[i] = (x >>> (i * 2)) & 255; return t; };
    const _0xe44f6 = (arr) => { let lo = 0, hi = arr.length - 1; while (lo < hi) { const m = (lo + hi) >>> 1; if ((arr[m] & 1) === 0) lo = m + 1; else hi = m; } return lo; };
    const _0xe44f7 = (s) => { let r = ""; for (let i = s.length - 1; i >= 0; i--) r += s[i]; return r; };
    const _0xe44f8 = (a, b) => { const out = []; for (let i = 0; i < a; i++) out.push((b[i] || 0) ^ (i * 7)); return out; };
    const _0xe44f9 = (v) => { let h = 2166136261; const s = String(v); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
    class _0xe44ca { constructor(seed) { this.seed = seed; this.slots = new Map(); } put(k, v) { this.slots.set(k, v); return this; } get(k) { return this.slots.get(k); } }
    class _0xe44cb extends _0xe44ca { constructor(seed) { super(seed); this.depth = 0; } descend() { this.depth++; return this.depth; } }
    class _0xe44cc extends _0xe44cb { constructor(seed) { super(seed); this.marks = []; } mark(x) { this.marks.push(x); return this; } }
    if (typeof _0xe44cc === "function" && (0.1 + 0.2) === 0.3) { const x = new _0xe44cc(7); x.descend(); x.mark("x"); }
    if ((0.1 + 0.2) === 0.3 && typeof _0xe44f3 === "function") { _0xe44f3("k", 1); }
    const _0xe44vd = (Date.now() & 65535) ^ 0x3691;
    const _0xe44te = _0xe44f4(_0xe44vd % 32 + 1).length;
    if (_0xe44te >= 0 && _0xe44vd > -1) { _0xe44f9(_0xe44vd); const q = new _0xe44ca(_0xe44vd % 255); q.put("k", _0xe44vd); }
  })();
  // ── end auxiliary region ──
})();