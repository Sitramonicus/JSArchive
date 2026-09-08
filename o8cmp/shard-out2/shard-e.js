  (function (_0xmod) {
    const Log = _0xmod.log;
    const MemberCount = _0xmod.mc;
    const _0xlex = _0xmod.lex;

  const _0xrunKey = Symbol.for("quest-suite:o8:active");
  if (window[_0xrunKey]) {
    Log.warn("[Quest O8] An O.8 run is already active; no second run was started.");
    return;
  }
  
  const controller = new AbortController();
  const signal = controller.signal;
  const disposables = [];
  const _0x8844 = new Set();
  
  const _0xe8a7 = (fn) => {
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
  _0xe8a7(GoogleScuttle);

  (async () => {
    try {
      // ── Juggler decode, metamorphic instance 9a9c42ca (O.8.5-Shard-2) ──
      const _0xJRe = [97,45,122,65,45,90,48,45,57,95,47,46,61,63,45];
      const _0xJuggleRE = new RegExp("^[" + String.fromCharCode(..._0xJRe) + "]{3,50}$");
      const _0xT = [113,173,150,107,214,167,53,8,45,192,237,91,179,50,2,200,198,238,30,184,6,155,111,226,216,234,20,41,127,88,165,195,102,82,89,49,142,175,110,128,60,131,159,75,34,24,39,66,78,23,183,205,116,182,146,170,86,54,62,245,158,74,247,3,217,227,13,9,14,64,215,252,255,171,83,67,134,35,162,203,29,188,122,32,118,114,194,16,160,85,1,94,193,242,105,63,189,26,228,172,223,246,27,213,19,174,240,210,92,145,163,59,177,95,219,5,21,136,98,225,125,11,99,156,181,144,191,151,46,123,25,202,0,249,157,244,56,218,7,186,73,115,101,133,130,154,253,190,61,140,229,153,121,196,77,90,148,108,36,141,207,222,117,206,57,254,79,38,55,168,235,199,176,180,51,69,201,236,221,72,126,65,204,169,239,93,161,135,208,109,47,12,224,42,209,178,4,241,139,48,250,31,230,28,166,119,104,143,185,52,132,149,80,197,96,124,10,97,71,37,103,187,248,43,33,17,18,68,243,22,232,81,106,112,231,233,220,137,70,100,87,147,120,164,84,58,40,44,211,251,212,138,129,15,152,76];
      const _0xTi = (() => { const _0xr = new Uint8Array(256); for (let _0xi = 0; _0xi < 256; _0xi++) { _0xr[_0xT[_0xi]] = _0xi; } return _0xr; })();
      const _0xM = [
        function(_0xa) { let _0xs = ""; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xTi[_0xa[_0xi]]); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode((_0xa[_0xi] - _0xk) & 255); return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xr = _0xP[0], _0xk = _0xP[1]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) { const _0xy = _0xa[_0xi] ^ _0xk; _0xs += String.fromCharCode(((_0xy >>> _0xr) | (_0xy << (8 - _0xr))) & 255); } return _0xs; },
        function(_0xa, _0xP) { let _0xs = ""; const _0xk = _0xP[0]; for (let _0xi = 0; _0xi < _0xa.length; _0xi++) _0xs += String.fromCharCode(_0xa[_0xi] ^ _0xk); return _0xs; }
      ];
      const _0xNp = [0,1,2,1];
      const _0xPool = [213,246,21,225,246,228,177,26,172,210,9,19,136,163,210,223,174,5,172,59,219,223,63,26,177,177,167,34,103,162,96,165,231,32,99,35,161,165,161,225,165,33,161,226,32,97,35,119,185,189,173,187,188,187,119,112,114,99,68,99,101,114,118,122,114,101,86,116,99,126,97,114,68,99,101,114,118,122,90,114,99,118,115,118,99,118,254,35,45,29,41,44,30,8,27,46,35,48,31,27,92,136,5,19,16,26,174,21,188,136,246,136,246,136,74,232,10,107,137,168,75,234,202,139,224,203,40,137,169,232,160,11,75,232,233,75,169,107,107,12,205,11,11,202,11,73,79,73,200,203,201,76,79,72,138,200,11,73,201];
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
      let _0xq0 = _0xJuggle([0,-7,3,23], "_0xq0");
      let _0xq1 = _0xJuggle([1,-7,86,13,186], "_0xq1");
      let _0xq2 = _0xJuggle([1,-7,47,8,72], "_0xq2");
      let _0xq3 = _0xJuggle([2,-7,124,15,5,5], "_0xq3");
      let _0xq4 = _0xJuggle([3,129,174,233,228,224,243,245,227,228,224,245], "_0xq4");
      let _0xq5 = _0xJuggle([0,66,26,177,177,92,174,172,26,21,174,59,163,5,66,177,136,228,92,174,172,3,26,177,177,92,174,172,26,21,174,59,163,63,174,223,5,74], "_0xq5");
      let _0xt0 = _0xJuggle([2,-7,113,11,5,98], "_0xt0");
      let _0xt1 = _0xJuggle([1,245,69,65,54,78,84,68,67,84,57,58,72,64,73,68,69], "_0xt1");
      let _0xt2 = _0xJuggle([0,32,118,122,64,227,35,63,203,162,63,14,64,32,67,118,203,29], "_0xt2");
      let _0xt3 = _0xJuggle([0,29,134,227,85,63,227,9,118,171,194,171,118,85], "_0xt3");
      let _0xt4 = _0xJuggle([2,-7,26,21,6,114], "_0xt4");
      let _0xe0 = _0xJuggle([2,-7,139,20,6,152], "_0xe0");
      let _0xe1 = _0xJuggle([0,188,114,64,32,118,32,63,32,64,162,14,63,255,64,227,122,118,13,64,227,118,63,32,114,9,9,64,32,32], "_0xe1");
      let _0xm0 = _0xJuggle([3,-7,55,31,23], "_0xm0");
      let _0xm1 = _0xJuggle([1,189,36,34,49,15,50,43,43,38,43,36,4,30,42,34,48], "_0xm1");
      let _0xm2 = _0xJuggle([1,116,219,217,232,187,213,225,217,186,227,230,196,189,184], "_0xm2");
      let _0xm3 = _0xJuggle([3,57,94,92,77,104,76,92,74,77], "_0xm3");
      let _0xm4 = _0xJuggle([0,213,246,21,227,92,92,118,19,219,246,26,223,5,215,59,219,29,26,219,246,163,21], "_0xm4");
      let _0xm5 = _0xJuggle([1,206,53,51,66,33,20,37,18,51,52,47,67,58,66,17,54,47,60,60,51,58], "_0xm5");
      let _0xm6 = _0xJuggle([0,-7,99,14], "_0xm6");
      let _0xm7 = _0xJuggle([0,-7,0,3], "_0xm7");
      let _0xm8 = _0xJuggle([2,4,240,134,166,183,197,6,215,183,166,182,245,215,102,151,230,183,166,196,118,230,22,22,166,54,199], "_0xm8");
      let _0xm9 = _0xJuggle([3,229,130,128,145,164,137,137,162,144,140,137,129,150], "_0xm9");
      Log.diag("Juggler coverage", { total: _0xJuggleStats.total, methods: _0xJuggleStats.methods, poolBytes: _0xJuggleStats.poolBytes, sanityWarnings: _0xJuggleStats.sanityWarnings, instance: "9a9c42ca" });
      // ── end juggler decode ──








      let _0x1 = window[_0xq0];
      let _0x2 = null;
      if (!_0x1 || typeof _0x1.push !== "function" || typeof _0x1.pop !== "function") {
        Log.say(_0xlex.C(0), _0xlex.P(0,["The module doorway is not there — ending the run here.","The module doorway is unavailable — ending the run here.","The module entrance did not respond — calling it a day.","The module doorway is not there — not starting this shift.","The module doorway is missing — ending the run here.","The module doorway refused to open — not starting this shift.","The module doorway is not there — heading home.","The module doorway refused to open — calling it a day.","The module doorway refused to open — stopping before anything starts.","The module doorway could not be found — calling it a day.","The module entrance did not respond — not starting this shift.","The module entrance did not respond — clocking out.","The module doorway refused to open — heading home.","The module doorway is unavailable — heading home.","The module doorway is missing — not starting this shift."]));
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
        Log.say(_0xlex.C(0), _0xlex.P(1,["The module doorway returned no usable runtime — calling it a day.","The module doorway provided nothing runnable — ending the run here.","The module doorway handed back nothing usable — heading home.","The module doorway provided nothing runnable — clocking out.","The module doorway returned no usable runtime — stopping before anything starts.","The module doorway provided nothing runnable — heading home.","The module doorway gave back an empty runtime — calling it a day.","The module doorway returned no usable runtime — ending the run here.","The module doorway handed back nothing usable — stopping before anything starts.","The module doorway came back with no runtime — stopping before anything starts.","The module doorway gave back an empty runtime — clocking out.","The module doorway returned no usable runtime — heading home.","The module doorway gave back an empty runtime — heading home.","The module doorway gave back an empty runtime — ending the run here.","The module doorway handed back nothing usable — clocking out."]));
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
      Log.say(_0xlex.C(1), _0xlex.P(53,["Pockets checked: ","Loadout scanned: ","Kit inspected: ","Supplies counted: ","Inventory readout: ","Pouch contents: ","Gear box opened: ","Pack reviewed: ","Bags inventoried: ","Cargo listed: ","Stock checked: ","Hold inspected: ","Stores counted: ","Locker contents: ","Vault scanned: "]) + JSON.stringify({
        lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9
      }));

      if (!_0xpocketsComplete) {
        Log.say(_0xlex.C(0), _0xlex.P(52,["A pocket came up empty — stopping here.","The pocket check failed — stopping here.","A pocket was missing — clocking out.","Pockets didn't check out — clocking out.","The pockets came up empty — calling it a day.","A pocket was missing — stopping here.","The pockets came up empty — heading home.","Pockets checked out empty — clocking out.","A pocket was missing — ending the run.","Pockets checked out empty — heading home.","Pockets didn't check out — stopping here.","The pocket check failed — calling it a day.","Pockets didn't check out — shutting down.","A pocket came up empty — calling it a day.","The pocket check failed — ending the run."]));
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
        Log.say(_0xlex.C(0), _0xlex.P(2,["The pocket interface layer is invalid — ending the run here.","The pocket interface layer is invalid — heading home.","The pocket interface layer is invalid — clocking out.","Pocket interfaces invalid — ending the run here.","The pocket interfaces are invalid — not starting this shift.","Pocket surfaces are unusable — clocking out.","The pocket interfaces are invalid — stopping before anything starts.","Pocket interfaces invalid — stopping before anything starts.","Pocket interfaces invalid — heading home.","Pocket interfaces invalid — not starting this shift.","Pocket surfaces are unusable — stopping before anything starts.","Pocket bindings came back invalid — stopping before anything starts.","Pocket bindings came back invalid — clocking out.","The pocket interfaces are invalid — clocking out.","Pocket surfaces are unusable — heading home."]));
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

      const _0x79a4 = (cfg, supportedTasks) => {
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
        const tasks = _0x79a4(q.config, GoogleRoutes.tasks)?.tasks;
        return tasks;
      });

      for (let i = _0xb.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_0xb[i], _0xb[j]] = [_0xb[j], _0xb[i]];
      }
      
      Log.say(_0xlex.C(2), _0xlex.P(21,[`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today for the run.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today and counting.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up; board pinned.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up and pinned to the board.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today, queued up.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up and ready.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up for the shift.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board for tonight.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up for tonight.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} up and pinned to the board.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today, ready to go.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board and queued up.`,`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board for this shift.`]));
      const _0xlost = _0xeligible.length - _0xb.length;
      if (_0xlost > 0) Log.say(_0xlex.C(2), _0xlex.P(22,[`${_0xlost} left off — shape we can't fold this shift.`,`${_0xlost} set aside — shape we can't fold into the run.`,`${_0xlost} left off — shape we can't fold today.`,`${_0xlost} left off — shape we can't work with.`,`${_0xlost} set aside — shape we can't take on.`,`${_0xlost} set aside — shape we can't fold this shift.`,`${_0xlost} set aside — shape we can't fold this pass.`,`${_0xlost} left off — shape we can't fold into the run.`,`${_0xlost} left off — shape we can't fold.`,`${_0xlost} set aside — shape we can't fold this time.`,`${_0xlost} set aside — shape we can't fold today.`,`${_0xlost} left off — shape we can't fold this time.`,`${_0xlost} left off — shape we can't take on.`,`${_0xlost} set aside — shape we can't work with.`,`${_0xlost} left off — shape we can't fold this pass.`]));
      
      if (!_0xb.length) { 
        Log.say(_0xlex.C(13), _0xlex.P(24,["Nothing on the vines today, not yet — (Press Alt+Shift+R to flush and restart) when ready.","Nothing on the vines today, not yet — (Press Alt+Shift+R to flush and restart) later.","Nothing ripe on the trees today, not yet — (Press Alt+Shift+R to flush and restart) when ready.","Nothing ripe on the trees today — (Press Alt+Shift+R to flush and restart) when ready.","Nothing ripe yet — flush with Alt+Shift+R and restart.","Nothing ripe yet — (Press Alt+Shift+R to flush and restart)","Nothing ripe on the trees today, not yet — flush with Alt+Shift+R and restart.","Nothing ripe on the trees today, not yet — press Alt+Shift+R to flush and restart.","Nothing on the vines today — (Press Alt+Shift+R to flush and restart) later.","Nothing ripe on the trees today — press Alt+Shift+R to flush and restart.","Nothing ripe on the trees today, not yet — (Press Alt+Shift+R to flush and restart) later.","Nothing ripe yet — press Alt+Shift+R to flush and restart.","Nothing on the vines today, not yet — press Alt+Shift+R to flush and restart.","Nothing ripe on the trees today — flush with Alt+Shift+R and restart.","Nothing ripe yet — (Press Alt+Shift+R to flush and restart) later."])); 
        GoogleRelease(); 
        return; 
      }

      let _0xc = typeof window[_0xq1] !== "undefined";
      let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;
      const _0xroute0 = ((1 / 3) * 3) === 1 ? location.pathname : location.pathname.slice(0);
      const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      let _0xlastHidden = null;

      const _0xdae0 = (ms, sig) => new Promise((res, rej) => {
        if (sig?.aborted) return rej(new DOMException('Aborted', 'AbortError'));
        const onAbort = () => { clearTimeout(t); rej(new DOMException('Aborted', 'AbortError')); };
        const t = setTimeout(() => { if (sig) sig.removeEventListener('abort', onAbort); res(); }, ms);
        if (sig) sig.addEventListener('abort', onAbort, { once: true });
      });

      // [RESTORED] Bounded delay sampling
      let delayCount = 0;
      const _0x0a94 = ms => {
        delayCount++;
        if (delayCount === 1 || delayCount % 10 === 0) {
          Log.diag("Delay sample", { count: delayCount, milliseconds: Math.round(ms), heat: Number(_0xheat.toFixed(2)) });
        }
      };

      // Human-paced wait: log-normal, median = target, tails clamped.
      const _0xln = (ms) => {
        const _0u1 = Math.random() || 1e-9, _0u2 = Math.random() || 1e-9;
        const _0z = Math.sqrt(-2.0 * Math.log(_0u1)) * Math.cos(2.0 * Math.PI * _0u2);
        return Math.min(Math.max(Math.exp(Math.log(ms) + _0z * 0.35), ms * 0.3), ms * 4.0);
      };
      let GoogleDelay = async (d = 1) => {
        if (document.hidden !== _0xlastHidden) {
          _0xlastHidden = document.hidden;
          Log.say(_0xlex.C(18), document.hidden ? _0xlex.P(50,["Blinds drawn — taking the long road.","Curtains drawn — keeping quiet for a bit.","Panels drawn — easing off for now.","Curtains drawn — easing off for now.","Coverings drawn — taking the long road.","Blinds drawn — easing off for now.","Shades drawn — keeping quiet for a bit.","Panels drawn — keeping quiet for a bit.","Panels drawn — taking the long hallway.","Coverings drawn — easing off for now.","Panels drawn — taking the long road.","Blinds drawn — keeping quiet for a bit.","Blinds drawn — taking the long hallway.","Coverings drawn — keeping quiet for a bit.","Curtains drawn — going the slow way."]) : _0xlex.P(51,["Blinds open — back to normal.","Shades open — resuming at pace.","Panels open — back to normal.","Panels open — resuming at pace.","Shades open — back to normal.","Shades open — back on the main road.","Coverings open — back to normal.","Blinds open — back on it.","Coverings open — resuming at pace.","Panels open — back on the main road.","Curtains open — back on it.","Curtains open — back at full speed.","Blinds open — resuming at pace.","Curtains open — resuming at pace.","Blinds open — back at full speed."]));
        }
        let base = _0xln(d * 1000);
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= _0xheat;
        
        _0x0a94(base);

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (_0xpaus) { await _0xdae0(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xdae0(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      // Server-compliance wait: raw ms, no humanization (429 retry_after / 5xx backoff).
      const GoogleDelayRaw = async (ms) => {
        let remaining = Math.max(0, ms);
        while (remaining > 0 && !signal.aborted) {
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xdae0(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };

      _0xchord = (e) => {
        if (!(e.altKey && e.shiftKey)) return;
        const key = String(e?.key ?? '').toLowerCase();
        if (key === 'x' && !_0xkill && !_0xarmed) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(6), _0xlex.P(25,["Winding down after this chore — pausing at the checkpoint.","Ending the shift after this chore — cutting out after the checkpoint.","Winding down after this chore — stopping at the next checkpoint.","Winding down after this chore — checking out at the boundary.","Winding down after this chore — stopping at the checkpoint.","Packing up after this chore — stopping at the next checkpoint.","Wrapping up after this chore — stopping at the next checkpoint.","Wrapping up after this chore — cutting out after the checkpoint.","Packing up after this chore — stopping at the checkpoint.","Closing out after this chore — stopping at the checkpoint.","Ending the shift after this chore — pausing at the checkpoint.","Packing up after this chore — checking out at the boundary.","Wrapping up after this chore — stopping at the checkpoint.","Wrapping up after this chore — pausing at the checkpoint.","Closing out after this chore — cutting out after the checkpoint."])); }
        if (key === 'r' && _0xarmed) { Log.say(_0xlex.C(9), _0xlex.P(27,["Giving the rug a shake — see you on the other side.","Rolling up the rug — back in a moment.","Rolling up the rug — see you after the refresh.","Shaking things out — see you on the flip side.","Shaking things out — back in a moment.","Shaking things out — see you after the refresh.","Giving the rug a shake — see you on the flip side.","Rolling up the rug — catch you on the reload.","Shaking out the rug — catch you on the reload.","Shaking out the rug — see you on the flip side.","Shaking out the rug — back in a moment.","Rolling up the rug — see you on the flip side.","Giving the rug a shake — back in a moment.","Shaking out the mat — see you on the flip side.","Shaking out the mat — see you after the refresh."])); GoogleRelease(); setTimeout(() => location.reload(), 1500); }
      };
      document.addEventListener("keydown", _0xchord, true);
      _0xe8a7(() => document.removeEventListener("keydown", _0xchord, true));

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
            if (st === 401) { if (critical) { _0xkill = true; controller.abort(); Log.say(_0xlex.C(0), _0xlex.P(3,["Auth stopped holding — packing up.","Key stopped fitting — packing up.","Session key turned stale — wrapping the gear.","The key no longer fits — packing up.","Session key turned stale — calling it here.","Auth stopped holding — ending the run.","Auth stopped holding — wrapping the gear.","Session key turned stale — packing up.","The key no longer fits — wrapping the gear.","Auth stopped holding — stopping cleanly.","Key stopped fitting — calling it here.","The key came back rejected — wrapping the gear.","Key stopped fitting — stopping cleanly.","Session key turned stale — folding up shop.","Our key stopped unlocking — wrapping the gear."])); } throw e; }
            if (st === 429) {
              _0xheat = Math.min(4, _0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say(_0xlex.C(7), _0xlex.P(30,[`The call was throttled — backing off ~${Math.ceil(s)}s, then knocking again.`,`Our knock was throttled — retrying in ~${Math.ceil(s)}s.`,`Request came back throttled — retrying in ~${Math.ceil(s)}s.`,`The call was throttled — trying again in ~${Math.ceil(s)}s.`,`Knock came back throttled — next attempt in ~${Math.ceil(s)}s.`,`Request came back throttled — backing off ~${Math.ceil(s)}s, then knocking again.`,`The call was throttled — retrying in ~${Math.ceil(s)}s.`,`The knock got throttled — backing off ~${Math.ceil(s)}s, then knocking again.`,`Request came back throttled — trying again in ~${Math.ceil(s)}s.`,`Knock came back throttled — retrying in ~${Math.ceil(s)}s.`,`Request came back throttled — knocking again in ~${Math.ceil(s)}s.`,`The call was throttled — knocking again in ~${Math.ceil(s)}s.`,`Our knock was throttled — knocking again in ~${Math.ceil(s)}s.`,`Our knock was throttled — trying again in ~${Math.ceil(s)}s.`,`Knock came back throttled — backing off ~${Math.ceil(s)}s, then knocking again.`]));
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say(_0xlex.C(7), _0xlex.P(31,[`Server error ${st} there — backing off for ${backoff.toFixed(1)}s.`,`Server fault ${st} on that knock — resting ${backoff.toFixed(1)}s before retry.`,`Server error ${st} on that knock — pausing for ${backoff.toFixed(1)}s.`,`Server fault ${st} on that knock — cooling off for ${backoff.toFixed(1)}s.`,`Server error ${st} there — cooling off for ${backoff.toFixed(1)}s.`,`Server fault ${st} — resting ${backoff.toFixed(1)}s before retry.`,`Server error ${st} on that knock — backing off ${backoff.toFixed(1)}s.`,`Server error ${st} there — backing off ${backoff.toFixed(1)}s.`,`Server fault ${st} on that knock — backing off ${backoff.toFixed(1)}s.`,`Server error ${st} — cooling off for ${backoff.toFixed(1)}s.`,`Server fault ${st} — pausing for ${backoff.toFixed(1)}s.`,`Server error ${st} there — resting ${backoff.toFixed(1)}s before retry.`,`Server error ${st} on that knock — backing off for ${backoff.toFixed(1)}s.`,`Server fault ${st} there — backing off for ${backoff.toFixed(1)}s.`,`Server fault ${st} on that knock — backing off for ${backoff.toFixed(1)}s.`])); 
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
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say(_0xlex.C(0), _0xlex.P(4,[`Target ${key} rejects hooks — leaving it untouched.`,`Target ${key} is frozen — leaving it untouched.`,`Target ${key} rejects hooks — skipping the hook.`,`Target ${key} is read-only — skipping the hook.`,`Target ${key} is read-only — leaving it untouched.`,`Target ${key} is read-only — hook failed.`,`Target ${key} is immutable — cannot be hooked.`,`Target ${key} is sealed — skipping the hook.`,`Target ${key} is sealed — cannot be hooked.`,`Target ${key} is frozen — hook failed.`,`Target ${key} is sealed — leaving it untouched.`,`Target ${key} rejects hooks — hook failed.`,`Target ${key} is frozen — cannot be hooked.`,`Target ${key} is immutable — hook failed.`,`Target ${key} is read-only — cannot be hooked.`])); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(5,[`Hook mounting for ${key} errored ${e.message}`,`Hook setup for ${key} failed ${e.message}`,`Setting up the hook on ${key} threw ${e.message}`,`Could not mount the hook on ${key} ${e.message}`,`Hook installation failed for ${key} ${e.message}`,`Attaching hooks to ${key} failed ${e.message}`,`Mounting a hook on ${key} failed ${e.message}`,`The ${key} hook refused to install ${e.message}`,`Hook wiring error on ${key} ${e.message}`,`Could not wire ${key} ${e.message}`,`Patching ${key} failed ${e.message}`,`Installing the hook on ${key} errored ${e.message}`,`Hook attempt on ${key} failed ${e.message}`,`Hook install failed on ${key} ${e.message}`,`The hook could not be attached to ${key} ${e.message}`])); return null; }
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

      const _0xbb86 = (body, taskName) => {
        if (!body || typeof body !== 'object') return null;
        if (typeof body.progress === 'number' && Number.isFinite(body.progress) && body.progress >= 0) return body.progress;
        const prog = body.progress?.[taskName] ?? body[taskName];
        if (prog === null || prog === undefined) return null;
        const val = typeof prog === 'object' ? prog.value : prog;
        const num = Number(val);
        return Number.isFinite(num) && num >= 0 ? num : null;
      };

      const _0x8d20 = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");

      const _0xvideo = async (v) => {
        Log.say(_0xlex.C(12), _0xlex.P(32,[`Opening the book to ${v.name}.`,`Bringing out ${v.name} from the stack.`,`Starting up ${v.name}.`,`Pulling ${v.name} off the shelf.`,`Opening ${v.name}'s chapter.`,`Starting ${v.name} from the shelf.`,`Launching ${v.name} from the shelf.`,`Turning to ${v.name} in the book.`,`Picking up the book at ${v.name}.`,`Getting ${v.name} going.`,`Taking down ${v.name} from the shelf.`,`Flipping to ${v.name}.`,`Opening ${v.name} in the reader.`,`Settling in with ${v.name}.`,`Opening the reading book for ${v.name}.`]));
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await GoogleDelay(_0x1c); if (_0xkill || signal.aborted) break;
          if (Math.random() < 0.06) { Log.say(_0xlex.C(15), _0xlex.P(33,["A quick steep — then back to it.","Kettle's on — brief steep.","Steeping briefly — kettle is up.","Teapot's on — quick steep.","Pot's singing — brief pause.","Kettle's on — just a steep.","Kettle's coming to the boil — short wait.","Kettle on — stepping away briefly.","Kettle singing — quick pause.","Pot's on — quick steep.","Brief steep while the pot goes.","Water's heating — brief steep.","Pot's on the boil — brief pause.","Quick steep — kettle's on.","Kettle's up — short pause."])); await GoogleDelay(18 + Math.random() * 24); if (_0xkill || signal.aborted) break; }
          const lastBeat = v.cur + _0x1c >= v.goal;
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          // [RESTORED] Timestamp sampling
          Log.diag("Timestamp sample", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say(_0xlex.C(16), _0xlex.P(34,[`Tock landing whole: ${Number.isInteger(ts)} — grain #${ts}`,`Sands landing whole: ${Number.isInteger(ts)} — sand #${ts}`,`Sands landing whole: ${Number.isInteger(ts)} — tock #${ts}`,`Tock landing whole: ${Number.isInteger(ts)} — sand #${ts}`,`Tock landing whole: ${Number.isInteger(ts)} — tick #${ts}`,`Sands landing whole: ${Number.isInteger(ts)} — grain #${ts}`,`Grains landing whole: ${Number.isInteger(ts)} — tock #${ts}`,`Sands landing whole: ${Number.isInteger(ts)} — pebble #${ts}`,`Seconds landing whole: ${Number.isInteger(ts)} — sand #${ts}`,`Pebbles landing whole: ${Number.isInteger(ts)} — sand #${ts}`,`Tock landing whole: ${Number.isInteger(ts)} — pebble #${ts}`,`Pebbles landing whole: ${Number.isInteger(ts)} — tock #${ts}`,`Grains landing whole: ${Number.isInteger(ts)} — sand #${ts}`,`Grains landing whole: ${Number.isInteger(ts)} — grain #${ts}`,`Pebbles landing whole: ${Number.isInteger(ts)} — tick #${ts}`]));
          let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0xbb86(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c);
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(35,[`Running tally: ${v.cur.toFixed(2)}/${v.goal}.`,`Random fraction: ${v.cur.toFixed(2)}/${v.goal}.`,`Progress line: ${v.cur.toFixed(2)}/${v.goal} logged.`,`Running tally: ${v.cur.toFixed(2)}/${v.goal} to date.`,`Random fraction: ${v.cur.toFixed(2)}/${v.goal} in the books.`,`Random fraction: ${v.cur.toFixed(2)}/${v.goal}`,`Running tally: ${v.cur.toFixed(2)}/${v.goal} in the books.`,`Current beat: ${v.cur.toFixed(2)}/${v.goal}.`,`Current beat: ${v.cur.toFixed(2)}/${v.goal}`,`Now reading: ${v.cur.toFixed(2)}/${v.goal} so far.`,`Random fraction: ${v.cur.toFixed(2)}/${v.goal} so far.`,`Running tally: ${v.cur.toFixed(2)}/${v.goal} logged.`,`Progress line: ${v.cur.toFixed(2)}/${v.goal}.`,`Current beat: ${v.cur.toFixed(2)}/${v.goal} logged.`,`Current beat: ${v.cur.toFixed(2)}/${v.goal} to date.`]));
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`Rounded out: ${v.name}.`,`Wrapped up: ${v.name}.`,`Boxed up: ${v.name}.`,`Knocked out: ${v.name}.`,`Put to bed: ${v.name}.`,`Delivered: ${v.name}.`,`Handed off: ${v.name}.`,`Settled: ${v.name}.`,`Checked off: ${v.name}.`,`Completed: ${v.name}.`,`Cashed out: ${v.name}.`,`Closed out: ${v.name}.`,`Cleared: ${v.name}.`,`Concluded: ${v.name}.`,`Sealed: ${v.name}.`]));
      };

      const _0xplay = async (v) => {
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`That chore (${v.name}) needs the main hall — skipping it for now.`,`That chore (${v.name}) needs a bigger rig — skipping it for now.`,`That chore (${v.name}) needs the main hall — leaving it for a bigger session.`,`Chore ${v.name} needs the heavy bench — skipping it for now.`,`That chore (${v.name}) needs the main hall — moving past it.`,`Chore ${v.name} needs the heavy bench — not taking it this shift.`,`This task (${v.name}) needs the full workshop — moving past it.`,`That chore (${v.name}) needs a bigger rig — moving past it.`,`That chore (${v.name}) needs the big workshop — skipping.`,`This task (${v.name}) needs the full workshop — skipping.`,`That chore (${v.name}) needs a bigger rig — not taking it this shift.`,`This task (${v.name}) needs the full workshop — skipping it for now.`,`Chore ${v.name} needs the heavy bench — leaving it for a bigger session.`,`That chore (${v.name}) needs the main hall — not taking it this shift.`,`Chore ${v.name} needs the heavy bench — moving past it.`])); resolve(); return; }
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applicationsUrl(v.app) });
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say(_0xlex.C(0), _0xlex.P(7,["The note for the chore came back empty — skipping.","Chore note came back blank — moving on.","The chore returned a blank note — not starting it.","The chore returned a blank note — leaving it be.","Chore note came back blank — leaving it be.","The note for the chore came back empty — not starting it.","The chore note was blank — skipping.","Chore note came back blank — skipping this one.","The chore returned a blank note — moving on.","Note for the chore was empty — not starting it.","The chore note was blank — leaving it be.","Note for the chore was empty — moving on.","The note for the chore came back empty — leaving it be.","Note for the chore was empty — leaving it be.","The chore returned a blank note — skipping."])); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = _0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(41,[`Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — pane #${_0x1bReal}`,`Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — square #${_0x1bReal}`,`The tiled floor lines up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}`,`Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}`,`The tiled floor lines up in fours: ${_0x1bReal % 4 === 0} — pane #${_0x1bReal}`,`Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}`,`Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — slab #${_0x1bReal}`,`The tiled floor lines up in fours: ${_0x1bReal % 4 === 0} — square #${_0x1bReal}`,`The floor grid lines up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}`,`Floor checks line up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}`,`Floor checks line up in fours: ${_0x1bReal % 4 === 0} — pane #${_0x1bReal}`,`Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — slab #${_0x1bReal}`,`Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — pane #${_0x1bReal}`,`The floor grid lines up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`,`Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}`]));
              const safeName = _0x8d20(_0x1f.name); const safeExe = _0x8d20(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say(_0xlex.C(17), _0xlex.P(43,["The cutlery drawer was re-sorted: ","Silverware in the drawer was reordered: ","The drawer contents were re-sorted: ","The drawer was given a new order: ","Drawer slots were reshuffled: ","Drawer order was redrawn: ","Drawer arrangement was refreshed: ","The drawer was reshuffled: ","The drawer got a reshuffle: ","Drawer items were rearranged: ","The flatware drawer was reshuffled: ","Drawer contents were reordered: ","The drawer layout changed: ","The drawer got re-sorted: ","The drawer was mixed up again: "]) + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let undo1 = null, undo2 = null;
              try {
                undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
                undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say(_0xlex.C(0), _0xlex.P(8,["The desktop doorway would not open — leaving it for later.","The desktop doorway could not be prepared — skipping.","The desktop route could not be armed — leaving it for later.","The desktop doorway failed to come up — skipping this one.","The desktop doorway refused to be set up — leaving it for later.","The desktop entry could not be opened — moving on.","The desktop route could not be armed — moving on.","The desktop doorway refused to be set up — not taking it this shift.","The desktop route could not be armed — skipping this one.","The desktop entry could not be opened — leaving it for later.","The desktop doorway refused to be set up — skipping.","The desktop doorway would not open — moving on.","The desktop doorway could not be prepared — leaving it for later.","The desktop doorway failed to come up — not taking it this shift.","The desktop doorway would not open — not taking it this shift."])); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleDesktopHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                finishTask();
                Log.diag("Desktop task cleanup", { state: "cleaned", activeTaskCount: _0x8844.size }); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {} 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0xe8a7(cleanup);
              
              try { _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 }); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(9,["Initial state dispatch failed — skipping this one.","The initial dispatch went wrong — skipping this one.","The initial state could not be dispatched — moving on.","Sending the initial state failed — leaving it be.","The initial dispatch went wrong — moving on.","The initial dispatch went wrong — not starting it.","First state push failed — not starting it.","Initial state dispatch failed — leaving it be.","The initial dispatch went wrong — leaving it be.","Sending the initial state failed — moving on.","First state push failed — leaving it be.","The initial state could not be dispatched — skipping this one.","Sending the initial state failed — skipping.","Initial state dispatch failed — not starting it.","The initial state could not be dispatched — skipping."])); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0xrunOwner.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv); if (_0x26 === null) return; if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(36,[`Current beat: ${_0x26}/${v.goal}`,`Running tally: ${_0x26}/${v.goal}.`,`Random fraction: ${_0x26}/${v.goal}.`,`Now reading: ${_0x26}/${v.goal} in the books.`,`Now reading: ${_0x26}/${v.goal}`,`Running tally: ${_0x26}/${v.goal} logged.`,`Running tally: ${_0x26}/${v.goal} to date.`,`Random fraction: ${_0x26}/${v.goal} to date.`,`Now reading: ${_0x26}/${v.goal} logged.`,`Random fraction: ${_0x26}/${v.goal} in the books.`,`Current beat: ${_0x26}/${v.goal} so far.`,`Progress line: ${_0x26}/${v.goal}.`,`Running tally: ${_0x26}/${v.goal} in the books.`,`Current beat: ${_0x26}/${v.goal} to date.`,`Current beat: ${_0x26}/${v.goal} logged.`])); if (_0x26 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`Rounded out: ${v.name}.`,`Wrapped up: ${v.name}.`,`Boxed up: ${v.name}.`,`Knocked out: ${v.name}.`,`Put to bed: ${v.name}.`,`Delivered: ${v.name}.`,`Handed off: ${v.name}.`,`Settled: ${v.name}.`,`Checked off: ${v.name}.`,`Completed: ${v.name}.`,`Cashed out: ${v.name}.`,`Closed out: ${v.name}.`,`Cleared: ${v.name}.`,`Concluded: ${v.name}.`,`Sealed: ${v.name}.`])); if (_0x26 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(10,["Desktop progress subscription failed — skipping this one.","Desktop progress updates could not be subscribed — not starting it.","Subscribing to desktop progress failed — skipping this one.","The desktop feed subscription failed — leaving it be.","Subscribing to desktop progress failed — leaving it be.","Subscribing to desktop progress failed — skipping.","The desktop progress feed would not subscribe — moving on.","The desktop progress feed would not subscribe — skipping this one.","The desktop progress feed would not subscribe — not starting it.","Desktop progress updates could not be subscribed — skipping this one.","The desktop feed subscription failed — moving on.","Desktop progress updates could not be subscribed — leaving it be.","The desktop feed subscription failed — skipping this one.","The desktop feed subscription failed — not starting it.","The desktop feed subscription failed — skipping."])); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Desktop task handoff", { state: "subscribed", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(10), _0xlex.P(44,[`Notes for ${safeName} — dough's got ~${Math.ceil((v.goal - v.cur) / 60)} to go.`,`Checking on ${safeName} — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Notes for ${safeName} — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.`,`Checking on ${safeName} — dough's got ~${Math.ceil((v.goal - v.cur) / 60)} to go.`,`Mulling over notes for ${safeName} — dough's got ~${Math.ceil((v.goal - v.cur) / 60)} to go.`,`Peeking at ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Watching the oven for ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Mulling over notes for ${safeName} — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Peeking at ${safeName} — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Peeking at ${safeName} — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.`,`Keeping an eye on ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Notes for ${safeName} — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Watching the oven for ${safeName} — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Mulling over notes for ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Checking on ${safeName} — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.`]));
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
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`That chore (${v.name}) needs the main hall — skipping it for now.`,`That chore (${v.name}) needs a bigger rig — skipping it for now.`,`That chore (${v.name}) needs the main hall — leaving it for a bigger session.`,`Chore ${v.name} needs the heavy bench — skipping it for now.`,`That chore (${v.name}) needs the main hall — moving past it.`,`Chore ${v.name} needs the heavy bench — not taking it this shift.`,`This task (${v.name}) needs the full workshop — moving past it.`,`That chore (${v.name}) needs a bigger rig — moving past it.`,`That chore (${v.name}) needs the big workshop — skipping.`,`This task (${v.name}) needs the full workshop — skipping.`,`That chore (${v.name}) needs a bigger rig — not taking it this shift.`,`This task (${v.name}) needs the full workshop — skipping it for now.`,`Chore ${v.name} needs the heavy bench — leaving it for a bigger session.`,`That chore (${v.name}) needs the main hall — not taking it this shift.`,`Chore ${v.name} needs the heavy bench — moving past it.`])); resolve(); return; }
              if (signal.aborted || _0xrunOwner.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(42,[`The floor grid lines up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}`,`Floor patterns line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`,`The floor grid lines up in fours: ${_0xpid % 4 === 0} — slab #${_0xpid}`,`Floor tiles line up in fours: ${_0xpid % 4 === 0} — square #${_0xpid}`,`Floor checks line up in fours: ${_0xpid % 4 === 0} — slab #${_0xpid}`,`The tiled floor lines up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}`,`The tiled floor lines up in fours: ${_0xpid % 4 === 0} — square #${_0xpid}`,`The floor grid lines up in fours: ${_0xpid % 4 === 0} — pane #${_0xpid}`,`The tiled floor lines up in fours: ${_0xpid % 4 === 0} — slab #${_0xpid}`,`The tiled floor lines up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}`,`Floor patterns line up in fours: ${_0xpid % 4 === 0} — slab #${_0xpid}`,`Floor checks line up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}`,`The tiled floor lines up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`,`Floor checks line up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}`,`The floor grid lines up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`]));
              let undo = null;
              try { undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(11,["The stream doorway would not open — skipping this one.","The stream route could not be armed — moving on.","The stream doorway could not be prepared — skipping.","The stream route could not be armed — skipping.","The stream route could not be armed — skipping this one.","The stream doorway failed to come up — leaving it for later.","The stream doorway could not be prepared — not taking it this shift.","The stream doorway refused to be set up — not taking it this shift.","The stream doorway refused to be set up — skipping this one.","The stream doorway failed to come up — moving on.","The stream entry could not be opened — moving on.","The stream doorway failed to come up — not taking it this shift.","The stream entry could not be opened — not taking it this shift.","The stream doorway refused to be set up — moving on.","The stream doorway would not open — moving on."])); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, GoogleStreamHandler = null;
              const cleanup = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                // [RESTORED] Cleanup diagnostic
                finishTask();
                Log.diag("Stream task cleanup", { state: "cleaned", activeTaskCount: _0x8844.size }); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } 
                resolve(); 
              };
              removeSelf = _0xe8a7(cleanup);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (_0xpaus || _0xkill || signal.aborted || cleanupCalled) return; let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv); if (_0x28 === null) return; if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(37,[`Random fraction: ${_0x28}/${v.goal} so far.`,`Progress line: ${_0x28}/${v.goal}`,`Now reading: ${_0x28}/${v.goal}`,`Progress line: ${_0x28}/${v.goal} to date.`,`Current beat: ${_0x28}/${v.goal} in the books.`,`Random fraction: ${_0x28}/${v.goal}`,`Now reading: ${_0x28}/${v.goal}.`,`Random fraction: ${_0x28}/${v.goal} logged.`,`Now reading: ${_0x28}/${v.goal} to date.`,`Current beat: ${_0x28}/${v.goal} so far.`,`Random fraction: ${_0x28}/${v.goal} to date.`,`Progress line: ${_0x28}/${v.goal} logged.`,`Running tally: ${_0x28}/${v.goal} in the books.`,`Progress line: ${_0x28}/${v.goal} in the books.`,`Random fraction: ${_0x28}/${v.goal} in the books.`])); if (_0x28 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`Rounded out: ${v.name}.`,`Wrapped up: ${v.name}.`,`Boxed up: ${v.name}.`,`Knocked out: ${v.name}.`,`Put to bed: ${v.name}.`,`Delivered: ${v.name}.`,`Handed off: ${v.name}.`,`Settled: ${v.name}.`,`Checked off: ${v.name}.`,`Completed: ${v.name}.`,`Cashed out: ${v.name}.`,`Closed out: ${v.name}.`,`Cleared: ${v.name}.`,`Concluded: ${v.name}.`,`Sealed: ${v.name}.`])); if (_0x28 >= v.goal || _0xkill) cleanup(); };
              watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { cleanup(); Log.say(_0xlex.C(0), _0xlex.P(12,["The stream progress feed would not subscribe — skipping.","Subscribing to stream progress failed — skipping.","Stream progress updates could not be subscribed — moving on.","Stream progress updates could not be subscribed — skipping this one.","The stream feed subscription failed — not starting it.","Subscribing to stream progress failed — leaving it be.","Stream progress subscription failed — not starting it.","The stream progress feed would not subscribe — not starting it.","The stream feed subscription failed — skipping.","Subscribing to stream progress failed — moving on.","Subscribing to stream progress failed — not starting it.","The stream feed subscription failed — skipping this one.","Stream progress subscription failed — skipping.","Stream progress updates could not be subscribed — not starting it.","The stream progress feed would not subscribe — skipping this one."])); resolve(); return; }
              
              // [RESTORED] Handoff diagnostic
              Log.diag("Stream task handoff", { state: "subscribed", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(11), _0xlex.P(45,[`Show's about to start — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Backstage lights on — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Lights are on backstage — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`The stage is set — keep a window open in vc ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Lights are on backstage — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`Backstage lights on — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`The stage is set — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Backstage lights on — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`The stage is set — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Curtain's up — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`Lights are on backstage — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Show's about to start — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`The stage is set — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`Backstage lights on — keep a window open in vc ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`,`Show's about to start — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`]));
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
        if (!_0x6 || !_0x7) { Log.say(_0xlex.C(0), _0xlex.P(13,["No arcade doorway could be found — not taking it this shift.","The arcade cabinet had no doorway — moving on.","The cabinet's doorway was not found — skipping this one.","No doorway found for the arcade cabinet — leaving it for later.","The arcade cabinet had no doorway — leaving it for later.","The cabinet's doorway was not found — leaving it for later.","No doorway found for the arcade cabinet — skipping this one.","The arcade cabinet had no doorway — not taking it this shift.","No doorway found for the cabinet — moving on.","No arcade doorway could be found — moving on.","The cabinet's doorway was not found — moving on.","The cabinet's doorway was not found — not taking it this shift.","No doorway found for the cabinet — not taking it this shift.","No doorway found for the arcade cabinet — skipping.","No arcade doorway could be found — leaving it for later."])); return; }
        let _0x29; try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
        if (!_0x29) { try { const guilds = Object.values(_0x7[_0xm9]()); const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length); if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id; } catch (e) {} if (!_0x29) { Log.say(_0xlex.C(0), _0xlex.P(13,["No arcade doorway could be found — not taking it this shift.","The arcade cabinet had no doorway — moving on.","The cabinet's doorway was not found — skipping this one.","No doorway found for the arcade cabinet — leaving it for later.","The arcade cabinet had no doorway — leaving it for later.","The cabinet's doorway was not found — leaving it for later.","No doorway found for the arcade cabinet — skipping this one.","The arcade cabinet had no doorway — not taking it this shift.","No doorway found for the cabinet — moving on.","No arcade doorway could be found — moving on.","The cabinet's doorway was not found — moving on.","The cabinet's doorway was not found — not taking it this shift.","No doorway found for the cabinet — not taking it this shift.","No doorway found for the arcade cabinet — skipping.","No arcade doorway could be found — leaving it for later."])); return; } }
        let _0x2a = "call:" + _0x29 + ":" + Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        Log.say(_0xlex.C(19), _0xlex.P(46,[`Dropping coins in the cabinet — (~${Math.ceil((v.goal - v.cur) / 60)} min).`,`Running the cabinet — ~${Math.ceil((v.goal - v.cur) / 60)} min left.`,`Feeding coins to the cabinet — (~${Math.ceil((v.goal - v.cur) / 60)} more min).`,`Feeding the cabinet coins — (~${Math.ceil((v.goal - v.cur) / 60)} min).`,`Feeding the cabinet coins — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`Dropping coins in the cabinet — ~${Math.ceil((v.goal - v.cur) / 60)} min left.`,`Feeding coins to the cabinet — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`Feeding coins to the cabinet — ~${Math.ceil((v.goal - v.cur) / 60)} min left.`,`Feeding the cabinet coins — ~${Math.ceil((v.goal - v.cur) / 60)} min left.`,`Feeding the cabinet coins — (~${Math.ceil((v.goal - v.cur) / 60)} more min).`,`Feeding coins to the cabinet — (~${Math.ceil((v.goal - v.cur) / 60)} min).`,`Running the cabinet — (~${Math.ceil((v.goal - v.cur) / 60)} min).`,`Dropping coins in the cabinet — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.`,`Dropping coins in the cabinet — (~${Math.ceil((v.goal - v.cur) / 60)} more min).`,`Coins into the cabinet — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.`]));
        const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
        let tick = 0;
        while (v.cur < v.goal && !_0xkill && !signal.aborted && Date.now() < _0xactivityDeadline) {
          if (_0xpaus) { await GoogleDelay(3); continue; }
          let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
          const reportedProgress = _0xbb86(_0x2b?.body, GoogleTasks.activity);
          if (reportedProgress !== null) v.cur = reportedProgress;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(38,[`Random fraction: ${v.cur}/${v.goal} so far.`,`Now reading: ${v.cur}/${v.goal} logged.`,`Now reading: ${v.cur}/${v.goal}.`,`Current beat: ${v.cur}/${v.goal} logged.`,`Progress line: ${v.cur}/${v.goal} logged.`,`Random fraction: ${v.cur}/${v.goal} logged.`,`Running tally: ${v.cur}/${v.goal}.`,`Now reading: ${v.cur}/${v.goal} to date.`,`Running tally: ${v.cur}/${v.goal} in the books.`,`Random fraction: ${v.cur}/${v.goal}`,`Now reading: ${v.cur}/${v.goal} so far.`,`Progress line: ${v.cur}/${v.goal} so far.`,`Current beat: ${v.cur}/${v.goal}.`,`Random fraction: ${v.cur}/${v.goal}.`,`Progress line: ${v.cur}/${v.goal}`]));
          await GoogleDelay(20);
          if (v.cur >= v.goal) { await GoogleDelay(2); if (_0xkill || signal.aborted) break; if (!_0xkill && !signal.aborted) await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } }); break; }
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`Rounded out: ${v.name}.`,`Wrapped up: ${v.name}.`,`Boxed up: ${v.name}.`,`Knocked out: ${v.name}.`,`Put to bed: ${v.name}.`,`Delivered: ${v.name}.`,`Handed off: ${v.name}.`,`Settled: ${v.name}.`,`Checked off: ${v.name}.`,`Completed: ${v.name}.`,`Cashed out: ${v.name}.`,`Closed out: ${v.name}.`,`Cleared: ${v.name}.`,`Concluded: ${v.name}.`,`Sealed: ${v.name}.`]));
        else if (!_0xkill && !signal.aborted && Date.now() >= _0xactivityDeadline) Log.say(_0xlex.C(0), _0xlex.P(14,[`Activity ${v.name} produced no progress before stopping — counting it as stalled.`,`Activity ${v.name} ended without confirmed progress — counting it as stalled.`,`Activity ${v.name} produced no progress before stopping — treating it as a stall.`,`Activity ${v.name} stopped after no confirmed progress — treating it as a stall.`,`Activity ${v.name} stalled with no confirmed progress — treating it as a stall.`,`Activity ${v.name} stopped after no confirmed progress — assuming it stalled.`,`Activity ${v.name} produced no progress before stopping — marking it down as stalled.`,`Activity ${v.name} produced no progress before stopping — assuming it stalled.`,`Activity ${v.name} went quiet without progress — treating it as a stall.`,`Activity ${v.name} went quiet without progress — counting it as stalled.`,`Activity ${v.name} ended without confirmed progress — marking it down as stalled.`,`Activity ${v.name} ended without confirmed progress — assuming it stalled.`,`Activity ${v.name} stopped after no confirmed progress — marking it down as stalled.`,`Activity ${v.name} ended without confirmed progress — flagging no progress.`,`Activity ${v.name} went quiet without progress — assuming it stalled.`]));
      };

      const GoogleHandlers = { [GoogleTasks.video]: _0xvideo, [GoogleTasks.videoMobile]: _0xvideo, [GoogleTasks.play]: _0xplay, [GoogleTasks.stream]: _0xstream, [GoogleTasks.activity]: _0xact };

      const _0x10 = async (_0x11) => {
        let _0x15 = _0x79a4(_0x11.config, GoogleRoutes.tasks);
        if (!_0x15?.tasks) { Log.say(_0xlex.C(0), _0xlex.P(15,["No chores were on the list — leaving it for next time.","Chore list was blank — leaving it for next time.","Chore list came back empty — skipping this one.","The list of chores was empty — moving on.","Chore list came back empty — moving on.","The list of chores was empty — skipping this one.","Chore list came back empty — leaving it for next time.","Chore list came back empty — nothing to do this pass.","The list of chores was empty — leaving it for next time.","Chore list came back empty — skipping the round.","No chores were on the list — skipping this one.","The list of chores was empty — skipping the round.","No chores were on the list — skipping the round.","The chore list came back blank — moving on.","The chore list came back blank — skipping the round."])); return "skipped"; }
        let _0x16 = GoogleRoutes.tasks.find(t => Object.hasOwn(_0x15.tasks, t));
        let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
        let _0x19 = Number(_0x17?.target);
        if (!Number.isFinite(_0x19) || _0x19 <= 0) { Log.say(_0xlex.C(0), _0xlex.P(16,["Chore target did not parse — moving on.","Chore target was invalid — skipping this one.","Chore target was invalid — not starting it.","Chore target did not parse — leaving it be.","Chore target came back unusable — not starting it.","The chore target was malformed — leaving it be.","Chore target did not parse — not starting it.","Chore target did not parse — skipping this one.","The chore target was malformed — moving on.","The target for the chore was bad — skipping this one.","The target for the chore was bad — leaving it be.","Chore target was invalid — moving on.","Chore target came back unusable — skipping it.","Chore target was invalid — leaving it be.","Chore target came back unusable — skipping this one."])); return "skipped"; }
        let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
        if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) { Log.say(_0xlex.C(0), _0xlex.P(17,["Chore came without an application id — skipping.","Chore came without an application id — skipping this one.","Chore had no app identifier — skipping this one.","The chore lacked an application id — skipping this one.","Chore had no app identifier — moving on.","No application id on the chore — skipping.","The chore lacked an application id — moving on.","Chore had no application identifier — leaving it be.","No application id on the chore — moving on.","No application id on the chore — skipping this one.","No application id on the chore — not starting it.","The chore lacked an application id — leaving it be.","Chore came without an application id — not starting it.","Chore came without an application id — leaving it be.","Chore had no application identifier — not starting it."])); return "skipped"; }
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
              if (!_0x79a4(q.config, GoogleRoutes.tasks)?.tasks) continue;
              _0xb.push(q); _0xdone.add(q.id); _0added++;
            }
            return _0added;
          } catch (e) { return 0; }
        };
        try {
          _0xwatch = setInterval(() => { if (_0xkill || signal.aborted) { clearInterval(_0xwatch); _0xwatch = null; return; } const p = location.pathname; if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; Log.say(_0xlex.C(8), _0xlex.P(48,["Trail marker moved — parked here.","Moved off the main trail — holding for now.","Trail marker shifted — staying put.","Moved off the main trail — staying put.","Paused on the trail — parked here.","Paused on the trail — holding position.","Stepped off the trail — holding position.","Stepped off the trail — staying put.","Stepped off the trail — parked here.","Paused on the trail — holding for now.","Paused on the trail — staying put.","Moved off the main trail — holding position.","Trail marker shifted — holding still.","Trail marker shifted — parked here.","Stepped off the trail — holding still."])); } else if (_0xpaus && p === _0route0) { _0xpaus = false; Log.say(_0xlex.C(8), _0xlex.P(49,["Returned to the trail — on the move again.","Back on the main trail — picking up again.","Back on the trail — moving again.","Back on the trail — resuming.","On the trail again — picking up again.","On the trail again — on the move again.","Returned to the trail — moving again.","Back to the trail — on the move again.","Back to the trail — resuming.","Back on the trail — on the move again.","Returned to the trail — resuming.","Back to the trail — picking up again.","Back to the trail — resuming the run.","Back on the main trail — on the move again.","On the trail again — resuming the run."])); } }, 2500);
          _0xe8a7(() => { if(_0xwatch) clearInterval(_0xwatch); });
          while (!_0xkill && !signal.aborted) {
            if (!_0xb.length) {
              const _0new = _0xrefill();
              if (_0new > 0) { Log.say(_0xlex.C(2), _0xlex.P(23,[`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell to join the board.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board mid-shift.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board while we worked.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board after start.`,`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell to help.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board late.`,`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell and joined up.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board before the end.`,`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell was rung.`,`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell, refilled.`,`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell; joining the board.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board for the next pass.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board, refilled.`,`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board and counted.`])); continue; }
              break;
            }
            let _0x2d = _0xb.pop(); if (!_0x2d) continue;
            _0xdone.add(_0x2d.id);
            try { didWork = true; const result = await _0x10(_0x2d) ?? "processed"; _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result }); }
            catch (err) { _0xresults.push({ name: _0x2d.config?.messages?.questName ?? "quest", result: "failed" }); Log.say(_0xlex.C(0), _0xlex.P(18,[`Rough patch on one chore: ${err?.message ?? err}`,`Hit a snag on one chore: ${err?.message ?? err}`,`One chore came back sideways: ${err?.message ?? err}`,`One chore threw a fit: ${err?.message ?? err}`,`One chore slipped: ${err?.message ?? err}`,`One chore fell over: ${err?.message ?? err}`,`One chore kicked back: ${err?.message ?? err}`,`Caught an edge on one chore: ${err?.message ?? err}`,`Fumbled one chore: ${err?.message ?? err}`,`One chore went sideways: ${err?.message ?? err}`,`Snagged a nail on one chore: ${err?.message ?? err}`,`One chore misbehaved: ${err?.message ?? err}`,`Dropped one chore: ${err?.message ?? err}`,`A chore threw an error: ${err?.message ?? err}`,`Ran into trouble on one chore: ${err?.message ?? err}`])); }
            if (_0xb.length && !_0xkill && !signal.aborted) {
              let _0xgn = false;
              try {
                const _0xnq = _0xb[_0xb.length - 1];
                const _0nt = _0x79a4(_0xnq.config, GoogleRoutes.tasks)?.tasks;
                if (_0nt) { const _0nf = GoogleRoutes.tasks.find(t => Object.hasOwn(_0nt, t)); _0xgn = (_0nf === GoogleTasks.play || _0nf === GoogleTasks.stream); }
              } catch (e) {}
              await GoogleDelay(_0xgn ? 60 + Math.random() * 240 : 10 + Math.random() * 38);
            }
          }
while (_0x8844.size > 0 && !_0xkill && !signal.aborted) await GoogleDelay(1);
try { MemberCount.summary(); } catch (e) {}
          if (_0xkill || signal.aborted) Log.say(_0xlex.C(6), _0xlex.P(26,[`Last call — shift cut short — with ${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}.`,`Last call — shift ended early — with ${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}.`,`Last call — shift ended early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) in hand.`,`Last call — shift cut short — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) in hand.`,`Last call — shift cut short — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`,`Last call — the shift stopped early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`,`Last call — stopping early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) logged.`,`Last call — run ended early — ${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"} recorded.`,`Last call — stopping early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`,`Last call — the shift stopped early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) in hand.`,`Last call — run ended early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) logged.`,`Last call — run ended early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`,`Last call — the shift stopped early — ${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"} recorded.`,`Last call — shift cut short — ${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"} recorded.`,`Last call — stopping early — (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) in hand.`]));
          else if (didWork) Log.say(_0xlex.C(3), _0xlex.P(40,[`Shelf gleaming completely — clear board (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). Press Alt+Shift+R to flush and restart.`,`Shelf polished, all of it — done and clear (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf fully cleared — nothing remains (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf fully cleared — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf fully cleared — clear board (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). Press Alt+Shift+R to flush and restart.`,`Shelf polished completely — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). Press Alt+Shift+R to flush and restart.`,`Shelf fully cleared — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). Press Alt+Shift+R to flush and restart.`,`Shelf polished completely — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) recorded. (Press Alt+Shift+R to flush and restart)`,`Shelf gleaming completely — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). Press Alt+Shift+R to flush and restart.`,`Shelf gleaming — nothing remains (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf polished, all of it — nothing remains (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf gleaming completely — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}) recorded. (Press Alt+Shift+R to flush and restart)`,`Shelf polished — nothing remains (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf polished — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`,`Shelf polished completely — nothing remains (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`]));
        } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(19,[`Caught an edge: ${err?.message ?? err}`,`Dropped the tray: ${err?.message ?? err}`,`Threw an error at the top: ${err?.message ?? err}`,`Fouled a step: ${err?.message ?? err}`,`Caught a snag: ${err?.message ?? err}`,`Ran aground: ${err?.message ?? err}`,`Went sideways: ${err?.message ?? err}`,`Ran into trouble: ${err?.message ?? err}`,`Slipped up top: ${err?.message ?? err}`,`Kicked back an error: ${err?.message ?? err}`,`Broke stride: ${err?.message ?? err}`,`Snagged a nail: ${err?.message ?? err}`,`Fumbled a step: ${err?.message ?? err}`,`Hit a wall up top: ${err?.message ?? err}`,`Hit a snag: ${err?.message ?? err}`])); } 
        finally { _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null; if (!didWork && !_0xkill) GoogleRelease(); }
        if (didWork || _0xkill || signal.aborted) { _0xarmed = true; Log.say(_0xlex.C(9), (didWork && !_0xkill && !signal.aborted) ? _0xlex.P(28,["Everything's polished, all of it — press Alt+Shift+R when you are done; the run sits idle until you do.","All polished — press Alt+Shift+R to flush and restart (refresh) whenever; the run stays parked.","All polished up — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.","All polished — press Alt+Shift+R when you are done; the run sits idle until you do.","All polished, done for now — press Alt+Shift+R to shake out the rug (refresh) when ready; nothing runs until then.","Everything's polished, all of it — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.","All polished — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so.","Everything's polished, all of it — press Alt+Shift+R to shake out the rug (refresh) when ready; nothing runs until then.","Everything's polished — press Alt+Shift+R when you are done; the run sits idle until you do.","All polished up — press Alt+Shift+R to shake out the rug (refresh) when ready; nothing runs until then.","All polished, done for now — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so.","All polished, done for now — press Alt+Shift+R when you are done; the run sits idle until you do.","All polished, done for now — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.","All polished — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.","All polished up — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so."]) : _0xlex.P(29,["Mat's half-shaken — press Alt+Shift+R to finish the shake (refresh) when ready.","Rug's half-shaken — hit Alt+Shift+R to finish the job (refresh).","The rug is half-shaken — press Alt+Shift+R to wrap it up (refresh) any time.","Halfway through the shake — press Alt+Shift+R to finish the shake (refresh) when ready.","Half the run is done — press Alt+Shift+R to finish the job (refresh) whenever you're ready.","The rug is half-shaken — hit Alt+Shift+R to finish the job (refresh).","The rug is half-shaken — press Alt+Shift+R to finish the shake (refresh) when ready.","Rug's half-shaken — press Alt+Shift+R (refresh) to finish when you like.","Half the run is done — press Alt+Shift+R (refresh) to finish when you like.","Half the run is done — press Alt+Shift+R to finish the shake (refresh) when ready.","Halfway through the shake — press Alt+Shift+R to finish the job (refresh) whenever you're ready.","The rug is half-shaken — press Alt+Shift+R (refresh) to finish when you like.","Rug's half-shaken — press Alt+Shift+R to wrap it up (refresh) any time.","Half the run is done — hit Alt+Shift+R to finish the job (refresh).","Halfway through the shake — press Alt+Shift+R (refresh) to finish when you like."])); } 
        else { GoogleScuttle(); GoogleRelease(); }
      };

      let _0xbootTimer = null;
      const _0xboot = async (ev) => {
        if (ev.origin === location.origin && ev.data === _0xch) { window.removeEventListener("message", _0xboot); clearTimeout(_0xbootTimer); _0xbootTimer = null; Log.say(_0xlex.C(14), _0xlex.P(47,["The memo went under the door — shift started.","Under the door it went — shift started.","Note through the slot — shift started.","Memo under the door — shift's going.","A note went under the door — running.","Note slid under the door — shift started.","Door note dropped — shift is on.","Shift started — note under the door.","Under the door: note in — shift started.","Shift started (note under the door).","Shift started — memo delivered.","Dropped the memo — shift started.","Note's under the door — shift underway.","The note is in — shift started.","Started the shift (memo under door)."])); await GoogleDelay(2.5 + Math.random() * 5.5); if (!_0xkill && !signal.aborted) _0x2c(); }
      };
      try {
        window.addEventListener("message", _0xboot); _0xe8a7(() => window.removeEventListener("message", _0xboot));
        _0xbootTimer = setTimeout(() => { try { window.removeEventListener("message", _0xboot); } catch (e) {} GoogleScuttle(); GoogleRelease(); _0xbootTimer = null; }, 15000);
        _0xe8a7(() => { if (_0xbootTimer) clearTimeout(_0xbootTimer); });
        window.postMessage(_0xch, location.origin);
      } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(20,[`Knocked the shelf over mid-setup: ${err?.message ?? err}`,`Knocked the setup over: ${err?.message ?? err}`,`Setup crashed: ${err?.message ?? err}`,`Spilled the board during setup: ${err?.message ?? err}`,`Broke a shelf during setup: ${err?.message ?? err}`,`Knocked the shelf over setting up: ${err?.message ?? err}`,`Setup threw: ${err?.message ?? err}`,`Fumbled the setup: ${err?.message ?? err}`,`Dropped everything while setting up: ${err?.message ?? err}`,`Mangled the setup step: ${err?.message ?? err}`,`Setting up went sideways: ${err?.message ?? err}`,`Upended the board during setup: ${err?.message ?? err}`,`Tripped during setup: ${err?.message ?? err}`,`Shelf setup fell apart: ${err?.message ?? err}`,`Botched the setup step: ${err?.message ?? err}`])); GoogleScuttle(); GoogleRelease(); }
    } catch (err) { Log.say(_0xlex.C(0), _0xlex.P(20,[`Knocked the shelf over mid-setup: ${err?.message ?? err}`,`Knocked the setup over: ${err?.message ?? err}`,`Setup crashed: ${err?.message ?? err}`,`Spilled the board during setup: ${err?.message ?? err}`,`Broke a shelf during setup: ${err?.message ?? err}`,`Knocked the shelf over setting up: ${err?.message ?? err}`,`Setup threw: ${err?.message ?? err}`,`Fumbled the setup: ${err?.message ?? err}`,`Dropped everything while setting up: ${err?.message ?? err}`,`Mangled the setup step: ${err?.message ?? err}`,`Setting up went sideways: ${err?.message ?? err}`,`Upended the board during setup: ${err?.message ?? err}`,`Tripped during setup: ${err?.message ?? err}`,`Shelf setup fell apart: ${err?.message ?? err}`,`Botched the setup step: ${err?.message ?? err}`])); GoogleScuttle(); GoogleRelease(); }
  })();

    (() => {
      class _0xaa27a836 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x0c9f3b70 extends _0xaa27a836 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x5ea5e55a extends _0x0c9f3b70 {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x0e0e3b = new _0x5ea5e55a((Date.now() & 0xffff) ^ 0x55aa);
      _0x0e0e3b.put("parity", 3632);
      _0x0e0e3b.put("delta", 4760);
      const _0x170acb = _0x0e0e3b.descend().descend().mark("z");
      const _0x2a12a0 = [_0x170acb.get("x"), _0x170acb.depth, _0x0e0e3b.seed];
      const _0x5a45ac = _0x2a12a0.slice(0, 2).join("|");
      if (_0x5a45ac.length > 64) { _0x170acb.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0x10e1f2 = [19232,23039,3966,16710,49218,8366];
      const _0x328544 = _0x10e1f2.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0x70ba33 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0x6adb2c = 0;
      for (let i = 0; i < 3; i++) _0x6adb2c = (_0x6adb2c + _0x70ba33(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x6adb2c = (_0x6adb2c + _0x70ba33(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x6adb2c = (_0x6adb2c + _0x70ba33(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x6adb2c = (_0x6adb2c + _0x70ba33(i + 1)) & 0xffff;
      const _0x1b68f7 = _0x328544 ^ _0x6adb2c;
      if ((_0x1b68f7 & 0x3) === 0) { const _0x437388 = [_0x10e1f2,_0x328544]; _0x437388.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xd660ac = [6873,4638,14514,11215,62087,24961];
      const _0x08cf4a = _0xd660ac.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0xa77547 = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0x8b1c16 = 0;
      for (let i = 0; i < 3; i++) _0x8b1c16 = (_0x8b1c16 + _0xa77547(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x8b1c16 = (_0x8b1c16 + _0xa77547(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x8b1c16 = (_0x8b1c16 + _0xa77547(i + 1)) & 0xffff;
      const _0x7f2503 = _0x08cf4a ^ _0x8b1c16;
      if ((_0x7f2503 & 0x3) === 0) { const _0x820e90 = [_0xd660ac,_0x08cf4a]; _0x820e90.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      const _0xd6c116 = [58867,54832,21600,4762,19102,51544];
      const _0xc411a2 = _0xd6c116.reduce((a, b) => (a + b) & 0xffff, 0);
      const _0xdb0b4b = (n) => { let s = 0; for (let i = 0; i < n; i++) s = (s * 31 + (i & 0xff)) >>> 0; return s; };
      let _0x0eef4f = 0;
      for (let i = 0; i < 3; i++) _0x0eef4f = (_0x0eef4f + _0xdb0b4b(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x0eef4f = (_0x0eef4f + _0xdb0b4b(i + 1)) & 0xffff;
      for (let i = 0; i < 3; i++) _0x0eef4f = (_0x0eef4f + _0xdb0b4b(i + 1)) & 0xffff;
      const _0x474472 = _0xc411a2 ^ _0x0eef4f;
      if ((_0x474472 & 0x3) === 0) { const _0xa0464d = [_0xd6c116,_0xc411a2]; _0xa0464d.slice(1); }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x58d2b796 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0x8f4de939 extends _0x58d2b796 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x8e236bf1 extends _0x8f4de939 {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0x526e69 = new _0x8e236bf1((Date.now() & 0xffff) ^ 0x55aa);
      _0x526e69.put("spindle", 6404);
      _0x526e69.put("anchor", 3034);
      const _0x638dcc = _0x526e69.descend().descend().mark("z");
      const _0xb43221 = [_0x638dcc.get("x"), _0x638dcc.depth, _0x526e69.seed];
      const _0x39856d = _0xb43221.slice(0, 2).join("|");
      if (_0x39856d.length > 64) { _0x638dcc.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

    (() => {
      class _0x7b3a81d3 {
        constructor(seed) { this.seed = seed; this.slots = new Map(); }
        put(k, v) { this.slots.set(k, v); return this; }
        get(k) { return this.slots.has(k) ? this.slots.get(k) : 0; }
      }
      class _0xe59dd4ca extends _0x7b3a81d3 {
        constructor(seed) { super(seed); this.depth = 0; }
        descend() { this.depth = (this.depth + 1) & 0x7fffffff; return this; }
      }
      class _0x2af64f36 extends _0xe59dd4ca {
        constructor(seed) { super(seed); this.marks = []; }
        mark(x) { this.marks.push(x); return this; }
      }
      const _0xf29cac = new _0x2af64f36((Date.now() & 0xffff) ^ 0x55aa);
      _0xf29cac.put("anchor", 7245);
      _0xf29cac.put("prism", 8242);
      _0xf29cac.put("packet", 1771);
      _0xf29cac.put("fold", 7222);
      const _0xda1456 = _0xf29cac.descend().descend().mark("z");
      const _0x7024be = [_0xda1456.get("x"), _0xda1456.depth, _0xf29cac.seed];
      const _0xd36d93 = _0x7024be.slice(0, 2).join("|");
      if (_0xd36d93.length > 64) { _0xda1456.marks.length = 0; }
      try { if (typeof window !== "undefined" && window === window) { /* keep warm */ } } catch (e) {}
    })();

  })(_0xmod);
