(() => {
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

  const SUITE_VERSION = "O.8.2-Juggle";
  Log.info(`[Quest ${SUITE_VERSION}] initialized — Experimental: Poisson, Lazy Forcer. Embedded: Polymorphic Juggler.`);
  
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
      const _0xJuggle = (ep, fp) => {
        if (!ep || ep.length <= 1 || ep[0] === 0) {
          const rK = fp[0]; 
          return String.fromCharCode(...fp.slice(1).map(c => c ^ rK));
        }

        const eS = [
          () => window.DiscordNative?.app?.getVersion()||"",
          () => window.GLOBAL_ENV?.RELEASE_CHANNEL||"",
          () => window.GLOBAL_ENV?.API_VERSION||"",
          () => navigator.userAgent,
          () => navigator.language
        ];
        const eA = [
          s => { let h=0; for(let i=0;i<s.length;i++) h=((h<<5)-h)+s.charCodeAt(i); return Math.abs(h%255)+1; },
          s => { let h=0; for(let i=0;i<s.length;i++) h=((h<<4)+h)^s.charCodeAt(i); return Math.abs(h%255)+1; },
          s => { let h=0; for(let i=s.length-1;i>=0;i--) h=(h*31)+s.charCodeAt(i); return Math.abs(h%255)+1; },
          s => { let h=0; for(let i=0;i<s.length;i++) h^=s.charCodeAt(i); return Math.abs(h%255)+1; }
        ];

        for (let i = 0; i < eS.length; i++) {
          for (let j = 0; j < eA.length; j++) {
            try {
              const v = eS[i]();
              if (!v) continue;
              const k = eA[j](v);
              if (k > 0) {
                const d = String.fromCharCode(...ep.map(c => c ^ k));
                if (/^[a-zA-Z0-9_\/\-\.=\?]{3,50}$/.test(d)) return d;
              }
            } catch(e) {}
          }
        }
        const rK = fp[0];
        return String.fromCharCode(...fp.slice(1).map(c => c ^ rK));
      };

      // O.8.2 arrays wrapped seamlessly into Juggler fallbacks (42 prepended to the array)
      let _0xq0 = _0xJuggle([0], [42, 93,79,72,90,75,73,65,105,66,95,68,65,78,67,89,73,69,88,78,117,75,90,90]);
      let _0xq1 = _0xJuggle([0], [42, 110,67,89,73,69,88,78,100,75,94,67,92,79]);
      let _0xq2 = _0xJuggle([0], [42, 5,91,95,79,89,94,89,5]);
      let _0xq3 = _0xJuggle([0], [42, 5,92,67,78,79,69,7,90,88,69,77,88,79,89,89]);
      let _0xq4 = _0xJuggle([0], [42, 5,66,79,75,88,94,72,79,75,94]);
      let _0xq5 = _0xJuggle([0], [42, 5,75,90,90,70,67,73,75,94,67,69,68,89,5,90,95,72,70,67,73,21,75,90,90,70,67,73,75,94,67,69,68,117,67,78,89,23]);
      let _0xt0 = _0xJuggle([0], [42, 125,107,126,105,98,117,124,99,110,111,101]);
      let _0xt1 = _0xJuggle([0], [42, 122,102,107,115,117,101,100,117,110,111,121,97,126,101,122]);
      let _0xt2 = _0xJuggle([0], [42, 121,126,120,111,107,103,117,101,100,117,110,111,121,97,126,101,122]);
      let _0xt3 = _0xJuggle([0], [42, 122,102,107,115,117,107,105,126,99,124,99,126,115]); 
      let _0xt4 = _0xJuggle([0], [42, 125,107,126,105,98,117,124,99,110,111,101,117,101,100,117,103,101,104,99,102,111]);
      let _0xe0 = _0xJuggle([0], [42, 120,127,100,100,99,100,109,117,109,107,103,111,121,117,105,98,107,100,109,111]);
      let _0xe1 = _0xJuggle([0], [42, 123,127,111,121,126,121,117,121,111,100,110,117,98,111,107,120,126,104,111,107,126,117,121,127,105,105,111,121,121]);
      let _0xm0 = _0xJuggle([0], [42, 77,79,94,121,94,88,79,75,71,79,88,107,73,94,67,92,79,121,94,88,79,75,71,103,79,94,75,78,75,94,75]);
      let _0xm1 = _0xJuggle([0], [42, 77,79,94,120,95,68,68,67,68,77,109,75,71,79,89]);
      let _0xm2 = _0xJuggle([0], [42, 77,79,94,109,75,71,79,108,69,88,122,99,110]);
      let _0xm3 = _0xJuggle([0], [42, 77,79,94,123,95,79,89,94]);
      let _0xm4 = _0xJuggle([0], [42, 77,79,94,107,70,70,126,66,88,79,75,78,89,108,69,88,122,75,88,79,68,94]);
      let _0xm5 = _0xJuggle([0], [42, 77,79,94,121,108,125,110,79,76,75,95,70,94,105,66,75,68,68,79,70]);
      let _0xm6 = _0xJuggle([0], [42, 76,70,95,89,66,125,75,67,94,123,95,79,95,79]);
      let _0xm7 = _0xJuggle([0], [42, 77,79,94]);
      let _0xm8 = _0xJuggle([0], [42, 77,79,94,121,69,88,94,79,78,122,88,67,92,75,94,79,105,66,75,68,68,79,70,89]);
      let _0xm9 = _0xJuggle([0], [42, 77,79,94,107,70,70,109,95,67,70,78,89]);

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

      Log.diag("Runtime selected", {
        isPushReturn: _0x2 === _0xpushResult,
        isChunkArray: _0x2 === _0x1,
        cacheCount: (() => { try { return Object.keys(_0x2.c).length; } catch (_) { return -1; } })(),
        definitionCount: (() => { try { return Object.keys(_0x2.m ?? {}).length; } catch (_) { return -1; } })()
      });

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
      
      Log.diag("Scanning modules", { cacheCount: _0xmodules.length });

      for (const m of _0xmodules) {
        const ex = GoogleRead(m, "exports"); if (!ex) continue;
        
        const inspect = (obj) => {
          if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) return;
          if (!_0x3 && GoogleHas(obj, _0xm0)) _0x3 = obj;
          if (!_0x4 && GoogleHas(obj, _0xm1)) _0x4 = obj;
          if (!_0x5 && GoogleHas(obj, _0xm3)) _0x5 = obj;
          if (!_0x6 && GoogleHas(obj, _0xm4)) _0x6 = obj;
          if (!_0x7 && GoogleHas(obj, _0xm5)) _0x7 = obj;
          if (!_0x8 && GoogleHas(obj, _0xm6) && GoogleHas(obj, "subscribe")) _0x8 = obj;
          if (!_0x9 && GoogleHas(obj, _0xm7) && GoogleHas(obj, "post")) _0x9 = obj;
        };

        inspect(ex);
        if (ex && typeof ex === 'object') {
          for (const key of Object.keys(ex)) {
            try { inspect(ex[key]); } catch (e) {}
          }
        }
        if (_0x3 && _0x4 && _0x5 && _0x6 && _0x7 && _0x8 && _0x9) break;
      }

      const _0xpocketsComplete = !!_0x3 && !!_0x4 && !!_0x5 && !!_0x6 && !!_0x7 && !!_0x8 && !!_0x9;
      
      Log.say("Satchel", "Pockets checked: " + JSON.stringify({
        lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9
      }));

      if (!_0xpocketsComplete) {
        Log.say("Puddle", "Satchel's missing pockets — heading home.");
        GoogleRelease();
        return;
      }

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
      
      Log.diag("Pocket interfaces validated", { stream: true, desktop: true, quests: true, activity: true, guilds: true, dispatcher: true, http: true });

      try {
        const localGuilds = _0x7.getAllGuilds();
        MemberCount.report(localGuilds);
      } catch (e) { MemberCount.report(); }

      const GoogleRoutes = {
        videoProgress: (id) => _0xq2 + id + _0xq3,
        heartbeat: (id) => _0xq2 + id + _0xq4,
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
            const res = await fn(opts);
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
              let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applications + v.app });
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