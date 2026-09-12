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
      diag: (m, d) => { if (LOG_LEVEL >= 2) d !== undefined ? console.debug(`[O7-DIAG] ${m}`, d) : console.debug(`[O7-DIAG] ${m}`); },
      warn: (m) => console.warn(m),
      info: (m) => console.debug(m)
    };
  })();

  const SUITE_VERSION = "O.8.2-Juggler-6";
  const INSTANCE_ID = "406e505e";
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

  const MemberCount = (() => {
    const number = v => Number.isFinite(v) ? v : null;
    const pick = (o, keys) => {
      if (!o || typeof o !== "object") return null;
      for (const k of keys) { const n = number(o[k]); if (n !== null) return n; }
      return null;
    };
    
    const inspect = source => {
      let total = null, online = null;
      const processItem = item => {
        if (!item || typeof item !== "object") return;
        const itemTotal = pick(item, ["memberCount", "approximateMemberCount", "member_count"]);
        const itemOnline = pick(item, ["onlineCount", "presenceCount", "approximatePresenceCount", "online_count"]);
        if (itemTotal !== null) total = (total ?? 0) + itemTotal;
        if (itemOnline !== null) online = (online ?? 0) + itemOnline;
        const guildLike = item.memberCount != null || item.approximateMemberCount != null || item.member_count != null || item.members;
        if (guildLike && itemTotal === null && item.members && typeof item.members === "object") {
          if (item.members instanceof Map) total = (total ?? 0) + item.members.size;
          else { let count = 0; for (const k in item.members) { if (Object.hasOwn(item.members, k)) count++; } total = (total ?? 0) + count; }
        }
      };
      if (source instanceof Map) source.forEach(processItem);
      else if (source && typeof source === "object") { for (const k in source) { if (Object.hasOwn(source, k)) processItem(source[k]); } }
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
            Log.info("[MemberCount] No member statistics are currently available in local client state.");
            return result;
          }
          const suffix = result.online === null ? "" : ` | Online: ${result.online}`;
          Log.info(`[MemberCount] Members: ${result.total ?? "unavailable"}${suffix}`);
          return result;
        } catch (e) {
          Log.info("[MemberCount] Local member data could not be read.");
          return { total: null, online: null };
        }
      }
    };
  })();

  const _0xrunKey = Symbol.for("quest-suite:o8:active");
  if (window[_0xrunKey]) {
    Log.warn("[Quest O8] An O.8 run is already active; no second run was started.");
    return;
  }
  
  const controller = new AbortController();
  const signal = controller.signal;
  const disposables = [];
  const activeTasks = new Set();
  
  const registerCleanup = (fn) => {
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
  registerCleanup(GoogleScuttle);

  (async () => {
    try {
      // ── Juggler decode, metamorphic instance 406e505e (O.8.2-Juggler-6) ──
      const _0xJuggleRE = /^[a-zA-Z0-9_\/\-\.=\?]{3,50}$/;
      const _0xT = [102,246,130,148,184,41,107,6,142,177,195,9,54,198,26,76,191,72,185,19,61,200,108,247,113,211,171,240,154,201,178,175,227,25,98,85,59,223,209,163,84,39,47,120,111,173,93,74,119,193,236,97,147,244,70,37,215,196,32,179,220,5,125,109,10,138,180,169,57,88,170,135,73,188,243,172,15,110,132,118,45,14,166,60,214,176,134,114,90,136,53,221,83,253,231,203,82,112,206,116,127,55,42,149,230,222,143,218,1,182,99,238,216,197,207,241,235,17,89,75,48,94,131,0,153,255,43,233,210,80,251,239,152,22,105,237,66,103,213,58,228,8,31,23,157,146,168,248,249,225,181,100,21,123,192,224,56,190,226,11,186,18,67,205,137,126,155,95,3,167,28,78,16,13,194,254,204,87,79,165,29,129,44,81,183,162,33,92,208,77,140,133,232,40,139,229,49,121,63,50,62,252,144,91,158,64,115,71,250,96,156,212,51,24,35,101,245,46,234,69,27,68,65,12,34,20,2,117,141,217,159,30,4,164,7,128,242,160,38,219,104,151,202,150,106,86,36,52,187,199,161,122,174,124,189,145];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; },
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; }
      ];
      const _0xNp = [1,1,2,0];
      const _0xPool = [34,32,47,252,39,39,15,35,45,32,28,31,46,1,42,45,11,28,45,32,41,47,9,31,10,29,22,1,8,23,26,27,17,248,250,235,206,234,250,236,235,182,188,197,195,184,167,177,185,196,161,197,181,197,181,215,167,199,182,246,54,23,22,6,23,166,182,215,86,167,22,231,149,55,235,166,17,99,99,222,99,149,135,112,182,55,241,204,202,217,166,209,209,172,218,206,209,201,216,14,176,88,60,214,60,203,60,88,132,57,203,73,88,138,166,214,180,88,138,214,203,60,176,169,169,88,60,60,218,58,82,146,162,82,66,250,18,234,18,250,146,56,49,178,187,51,50,54,34,183,57,180,54,177,55,58,50,52,186,177,44,51,187,187,30,25,2,2,5,2,11,19,11,13,1,9,31,19,15,4,13,2,11,9];
      const _0xJuggleStats = { total: 0, methods: {}, sanityWarnings: 0, poolBytes: _0xPool.length };
      const _0xJuggle = (_0xs, _0xl) => {
        const _0xf = _0xs[0];
        const _0xn = _0xNp[_0xf];
        let _0xP, _0xb;
        if (_0xs[1] === -19) { _0xP = _0xs.slice(4, 4 + _0xn); _0xb = _0xPool.slice(_0xs[2], _0xs[2] + _0xs[3]); }
        else { _0xP = _0xs.slice(1, 1 + _0xn); _0xb = _0xs.slice(1 + _0xn); }
        const _0xd = _0xM[_0xf](_0xb, _0xP);
        const _0ok = _0xJuggleRE.test(_0xd);
        _0xJuggleStats.total++;
        _0xJuggleStats.methods[_0xf] = (_0xJuggleStats.methods[_0xf] || 0) + 1;
        Log.diag("Juggler decode", { name: _0xl, method: _0xf, len: _0xd.length, valid: _0ok });
        if (!_0ok) { _0xJuggleStats.sanityWarnings++; Log.warn(`[Juggler] ${_0xl}: decoded string failed sanity check (len=${_0xd.length}) - corrupted instance?`); }
        return _0xd;
      };
      let _0xq0 = _0xJuggle([2,-19,141,23,7,131], "_0xq0");
      let _0xq1 = _0xJuggle([0,180,240,221,199,215,219,198,208,250,213,192,221,194,209], "_0xq1");
      let _0xq2 = _0xJuggle([0,142,161,255,251,235,253,250,253,161], "_0xq2");
      let _0xq3 = _0xJuggle([2,5,127,154,177,82,243,211,146,218,113,49,146,147,49,211,17,17], "_0xq3");
      let _0xq4 = _0xJuggle([2,5,215,50,218,123,251,153,89,155,123,251,89], "_0xq4");
      let _0xq5 = _0xJuggle([2,7,161,54,17,153,153,151,21,16,17,155,21,22,150,24,54,153,27,144,151,21,16,62,17,153,153,151,21,16,17,155,21,22,150,14,21,147,24,63], "_0xq5");
      let _0xt0 = _0xJuggle([0,-19,22,11,94], "_0xt0");
      let _0xt1 = _0xJuggle([3,45,15,138,136,203,118,132,203,57,88,60,172,214,118,45], "_0xt1");
      let _0xt2 = _0xJuggle([2,-19,55,17,4,226], "_0xt2");
      let _0xt3 = _0xJuggle([2,-19,128,13,3,88], "_0xt3");
      let _0xt4 = _0xJuggle([3,114,138,214,169,73,203,134,188,57,88,118,203,118,132,203,110,118,180,188,15,88], "_0xt4");
      let _0xe0 = _0xJuggle([0,-19,164,20,76], "_0xe0");
      let _0xe1 = _0xJuggle([3,-19,99,29], "_0xe1");
      let _0xm0 = _0xJuggle([1,72,175,173,188,155,188,186,173,169,181,173,186,137,171,188,177,190,173,155,188,186,173,169,181,149,173,188,169,172,169,188,169], "_0xm0");
      let _0xm1 = _0xJuggle([3,-19,72,15], "_0xm1");
      let _0xm2 = _0xJuggle([1,136,239,237,252,207,233,245,237,206,247,250,216,209,204], "_0xm2");
      let _0xm3 = _0xJuggle([0,-19,33,8,159], "_0xm3");
      let _0xm4 = _0xJuggle([1,-19,0,22,187], "_0xm4");
      let _0xm5 = _0xJuggle([2,1,45,227,231,197,139,161,131,165,231,225,239,199,245,197,171,253,239,241,241,231,245], "_0xm5");
      let _0xm6 = _0xJuggle([1,-19,41,14,80], "_0xm6");
      let _0xm7 = _0xJuggle([1,72,175,173,188], "_0xm7");
      let _0xm8 = _0xJuggle([0,51,84,86,71,96,92,65,71,86,87,99,65,90,69,82,71,86,112,91,82,93,93,86,95,64], "_0xm8");
      let _0xm9 = _0xJuggle([1,-19,87,12,101], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "406e505e" });
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

      const findTaskConfig = (cfg, supportedTasks) => {
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
        const tasks = findTaskConfig(q.config, GoogleRoutes.tasks)?.tasks;
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

      const sleep = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      // [RESTORED] Bounded delay sampling
      let delayCount = 0;
      const recordDelay = ms => {
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
        
        recordDelay(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await sleep(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await sleep(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
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
      registerCleanup(() => document.removeEventListener("keydown", _0xchord, true));

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

      const extractHttpProgress = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const sanitizePath = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

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
          const reported = extractHttpProgress(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say("Abacus", `Random fraction: ${v.cur.toFixed(2)}/${v.goal}`);
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`);
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); activeTasks.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; activeTasks.delete(taskId); } };
        
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
              const safeName = sanitizePath(_0x1f.name); const safeExe = sanitizePath(_0x20);
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
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: activeTasks.size });
                finishTask(); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = registerCleanup(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say("Puddle", "Initial state dispatch failed — skipping."); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say("Abacus", `Random fraction: ${_0x26}/${v.goal}`); if (_0x26 >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say("Puddle", "Desktop progress subscription failed — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: activeTasks.size });
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
        const taskId = Symbol(); activeTasks.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; activeTasks.delete(taskId); } };
        
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
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: activeTasks.size });
                finishTask(); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = registerCleanup(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say("Abacus", `Random fraction: ${_0x28}/${v.goal}`); if (_0x28 >= v.goal) Log.say("Trophy", `Polished: ${v.name}.`); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say("Puddle", "Stream progress subscription failed — skipping."); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: activeTasks.size });
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
          const reportedProgress = extractHttpProgress(_0x2b?.body, GoogleTasks.activity);
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
        let _0x15 = findTaskConfig(_0x11.config, GoogleRoutes.tasks);
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
          registerCleanup(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (_0xb.length && !_0xkill && !signal.aborted) {
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); } 
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say("Puddle", `Stubbed a toe on one chore (moving on): ${err?.message ?? err}`); }
            if (_0xb.length && !_0xkill && !signal.aborted) await GoogleDelay(10 + Math.random() * 38);
          }
          while (activeTasks.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
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
        window.addEventListener("message", _0xboot); registerCleanup(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        registerCleanup(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`); GoogleScuttle(); GoogleRelease(); }
  })();
})();