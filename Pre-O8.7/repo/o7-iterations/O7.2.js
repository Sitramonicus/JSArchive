(() => {
  /* O.7 reliability release. Preserves O.4 behavior; no new telemetry countermeasures. */
  /* Local-only console utility. It reads data already resident in the client and never requests,
     changes, or reports member data. It is intentionally kept separate from quest processing. */
  const MemberCount = (() => {
    const number = v => Number.isFinite(v) ? v : null;
    const pick = (o, keys) => {
      if (!o || typeof o !== "object") return null;
      for (const k of keys) { const n = number(o[k]); if (n !== null) return n; }
      return null;
    };
    const inspect = source => {
      const entries = source instanceof Map
        ? Array.from(source.values())
        : source && typeof source === "object" ? Object.values(source) : [];
      let total = null, online = null;
      for (const item of entries) {
        if (!item || typeof item !== "object") continue;
        total ??= pick(item, ["memberCount", "approximateMemberCount", "member_count"]);
        online ??= pick(item, ["onlineCount", "presenceCount", "approximatePresenceCount", "online_count"]);
        const guildLike = item.memberCount != null || item.approximateMemberCount != null || item.member_count != null || item.members;
        if (guildLike && total === null && item.members && typeof item.members === "object") total = item.members instanceof Map ? item.members.size : Object.keys(item.members).length;
        if (guildLike && total !== null && online !== null) break;
      }
      return { total, online };
    };
    return {
      report: (...sources) => {
        try {
          let result = { total: null, online: null };
          for (const source of sources) {
            const found = inspect(source);
            result.total ??= found.total;
            result.online ??= found.online;
            if (result.total !== null && result.online !== null) break;
          }
          if (result.total === null && result.online === null) {
            console.log("[MemberCount] No member statistics are currently available in local client state.");
            return result;
          }
          const suffix = result.online === null ? "" : ` | Online: ${result.online}`;
          console.log(`[MemberCount] Members: ${result.total ?? "unavailable"}${suffix}`);
          return result;
        } catch (e) {
          console.log("[MemberCount] Local member data could not be read.");
          return { total: null, online: null };
        }
      }
    };
  })();

  const _0xrunKey = Symbol.for("quest-suite:o4:active");
  if (window[_0xrunKey]) {
    console.warn("[Quest O4] An O.4 run is already active; no second run was started.");
    return;
  }
  const _0xrunOwner = { released: false };
  window[_0xrunKey] = _0xrunOwner;
  const GoogleRelease = () => {
    if (_0xrunOwner.released) return;
    _0xrunOwner.released = true;
    try { if (window[_0xrunKey] === _0xrunOwner) delete window[_0xrunKey]; } catch (e) {}
  };

  const GoogleChatter = false;
  const GoogleSay = (d, m) => console.log(`[Google ${d}] ${m}`);

  let _0xwatch = null, _0xchord = null;
  const GoogleScuttle = () => {
    try { if (_0xwatch !== null) { clearInterval(_0xwatch); _0xwatch = null; } } catch (e) {}
    try { if (_0xchord !== null) { document.removeEventListener("keydown", _0xchord, true); _0xchord = null; } } catch (e) {}
  };

  try {
  const _0xK = 0x2A;
  const _0xD = a => String.fromCharCode(...a.map(c => c ^ _0xK));

  let _0xq0 = _0xD([93,79,72,90,75,73,65,105,66,95,68,65,78,67,89,73,69,88,78,117,75,90,90]);
  let _0xq1 = _0xD([110,67,89,73,69,88,78,100,75,94,67,92,79]);
  let _0xq2 = _0xD([5,91,95,79,89,94,89,5]);
  let _0xq3 = _0xD([5,92,67,78,79,69,7,90,88,69,77,88,79,89,89]);
  let _0xq4 = _0xD([5,66,79,75,88,94,72,79,75,94]);
  let _0xq5 = _0xD([5,75,90,90,70,67,73,75,94,67,69,68,89,5,90,95,72,70,67,73,21,75,90,90,70,67,73,75,94,67,69,68,117,67,78,89,23]);
  let _0xt0 = _0xD([125,107,126,105,98,117,124,99,110,111,101]);
  let _0xt1 = _0xD([122,102,107,115,117,101,100,117,110,111,121,97,126,101,122]);
  let _0xt2 = _0xD([121,126,120,111,107,103,117,101,100,117,110,111,121,97,126,101,122]);
  let _0xt3 = _0xD([122,102,107,115,117,107,105,126,99,124,99,126,115]);
  let _0xt4 = _0xD([125,107,126,105,98,117,124,99,110,111,101,117,101,100,117,103,101,104,99,102,111]);
  let _0xe0 = _0xD([120,127,100,100,99,100,109,117,109,107,103,111,121,117,105,98,107,100,109,111]);
  let _0xe1 = _0xD([123,127,111,121,126,121,117,121,111,100,110,117,98,111,107,120,126,104,111,107,126,117,121,127,105,105,111,121,121]);
  let _0xm0 = _0xD([77,79,94,121,94,88,79,75,71,79,88,107,73,94,67,92,79,121,94,88,79,75,71,103,79,94,75,78,75,94,75]);
  let _0xm1 = _0xD([77,79,94,120,95,68,68,67,68,77,109,75,71,79,89]);
  let _0xm2 = _0xD([77,79,94,109,75,71,79,108,69,88,122,99,110]);
  let _0xm3 = _0xD([77,79,94,123,95,79,89,94]);
  let _0xm4 = _0xD([77,79,94,107,70,70,126,66,88,79,75,78,89,108,69,88,122,75,88,79,68,94]);
  let _0xm5 = _0xD([77,79,94,121,108,125,110,79,76,75,95,70,94,105,66,75,68,68,79,70]);
  let _0xm6 = _0xD([76,70,95,89,66,125,75,67,94,123,95,79,95,79]);
  let _0xm7 = _0xD([77,79,94]);
  let _0xm8 = _0xD([77,79,94,121,69,88,94,79,78,122,88,67,92,75,94,79,105,66,75,68,68,79,70,89]);
  let _0xm9 = _0xD([77,79,94,107,70,70,109,95,67,70,78,89]);

  let _0xlag = (Date.now() % 97) / 97;

  let _0x1 = window[_0xq0], _0x2;
  _0x2 = _0x1.push([[Symbol()], {}, r => r]);
  _0x1.pop();

  const _0xDeep = (o, k) => {
    let hops = 0;
    for (; o && hops < 4; o = Object.getPrototypeOf(o), hops++) if (k in o) return true;
    return false;
  };

  const GoogleRead = (obj, key) => {
    try { return obj?.[key]; } catch (e) { return undefined; }
  };
  const GoogleHas = (obj, key) => {
    try { return !!obj && _0xDeep(obj, key); } catch (e) { return false; }
  };
  let _0x3, _0x4, _0x5, _0x6, _0x7, _0x8, _0x9;
  let _0xmodules = [];
  try { _0xmodules = Object.values(_0x2?.c ?? {}); } catch (e) { _0xmodules = []; }
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

  GoogleSay("Satchel", "Pockets checked: " + JSON.stringify({ lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9 }));
  if (!_0x3 || !_0x4 || !_0x5 || !_0x8 || !_0x9) { GoogleSay("Puddle", "Satchel's missing pockets — heading home."); GoogleRelease(); return; }
  try {
    const localGuilds = _0x7 && typeof _0x7.getAllGuilds === "function" ? _0x7.getAllGuilds() : null;
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

  const _0xeligible = [..._0x5.quests.values()].filter(q => {
    if (!q.userStatus?.enrolledAt || q.userStatus?.completedAt) return false;
    const exp = new Date(q.config?.expiresAt).getTime();
    if (Number.isFinite(exp) && exp <= Date.now() - 5 * 60 * 1000) return false;
    return true;
  });
  let _0xb = _0xeligible.filter(q => GoogleRoutes.tasks.find(t => Object.keys((q.config?.taskConfig ?? q.config?.taskConfigV2 ?? {}).tasks ?? {}).includes(t)));
  for (let i = _0xb.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_0xb[i], _0xb[j]] = [_0xb[j], _0xb[i]];
  }
  GoogleSay("Ledger", `${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board.`);
  const _0xlost = _0xeligible.length - _0xb.length;
  if (_0xlost > 0) GoogleSay("Ledger", `${_0xlost} left off — shape we can't fold.`);
  if (!_0xb.length) { GoogleSay("Orchard", "Nothing ripe on the trees today."); GoogleRelease(); return; }

  let _0xc = typeof window[_0xq1] !== "undefined";

  let _0xkill = false, _0xpaus = false, _0xarmed = false, _0xheat = 1;
  const _0xrestores = [];
  const _0xpending = new Set();
  const _0xroute0 = location.pathname;
  const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);

  let _0xlastHidden = null;
  let GoogleDelay = async (d = 1) => {
    const jitterBuckets = [950, 1120, 1340, 980, 1450, 1020];
    const _0xgrit = jitterBuckets.reduce((a, b) => a ^ b, 0);
    if (document.hidden !== _0xlastHidden) {
      _0xlastHidden = document.hidden;
      GoogleSay("Blinds", document.hidden ? "Curtains drawn — taking the long hallway." : "Curtains open — back on the main road.");
    }
    let base = d * 1000 + jitterBuckets[Math.floor(Math.random() * jitterBuckets.length)];
    if (document.hidden) base += Math.random() * 4000 + 2000;
    if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
    base *= _0xheat;
    let end = Date.now() + base;
    do {
      await new Promise(r => setTimeout(r, 900));
      if (_0xpaus) end += 900 + (_0xgrit & 3);
    } while (!_0xkill && Date.now() < end);
  };

  _0xchord = (e) => {
    if (!(e.altKey && e.shiftKey)) return;
    if (e.code === "KeyX" && !_0xkill && !_0xarmed) {
      _0xkill = true;
      GoogleSay("Taps", "Wrapping up after this chore.");
    }
    if (e.code === "KeyR" && _0xarmed) {
      GoogleSay("Doormat", "Shaking out the rug — see you on the other side.");
      try { document.removeEventListener("keydown", _0xchord, true); } catch (x) {}
      _0xchord = null;
      GoogleRelease();
      setTimeout(() => location.reload(), 1500);
    }
  };
  document.addEventListener("keydown", _0xchord, true);

  const GooglePost = _0x9.post.bind(_0x9);
  const GoogleGet = _0x9.get.bind(_0x9);
  const _0xsend = _0x8.dispatch.bind(_0x8);
  const _0xon = _0x8.subscribe.bind(_0x8);
  const _0xoff = _0x8.unsubscribe.bind(_0x8);

  let _0x401 = false;
  const GoogleCall = (fn) => async (opts, tries = 0) => {
    try {
      const res = await fn(opts);
      if (_0xheat > 1) _0xheat = Math.max(1, _0xheat - 0.1);
      return res;
    }
    catch (e) {
      const st = e?.status ?? e?.body?.status ?? 0;
      if (st === 401) {
        if (!_0x401) { _0x401 = true; GoogleSay("Puddle", "Key stopped fitting — packing up."); }
        _0xkill = true;
        throw e;
      }
      if (st === 429 && tries < 2) {
        _0xheat = Math.min(4, _0xheat * 1.5);
        const s = Math.ceil(e?.body?.retry_after ?? e?.retry_after ?? 4) + 1;
        GoogleSay("Porch", `Knock came back throttled — knocking again in ~${s}s.`);
        await GoogleDelay(s);
        return GoogleCall(fn)(opts, tries + 1);
      }
      if (st >= 500 && st < 600 && tries < 2) { await GoogleDelay(5); return GoogleCall(fn)(opts, tries + 1); }
      throw e;
    }
  };
  const GooglePostSafe = GoogleCall(GooglePost);
  const GoogleGetSafe = GoogleCall(GoogleGet);

  const shuffleObject = (obj) => {
    let entries = Object.entries(obj);
    for (let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entries[i], entries[j]] = [entries[j], entries[i]];
    }
    return Object.fromEntries(entries);
  };

  const GoogleHook = (obj, key, fn) => {
    const own = Object.getOwnPropertyDescriptor(obj, key);
    let cur = Object.getPrototypeOf(obj), d = null;
    while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
    const flags = d && !d.get
      ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable }
      : { writable: false, configurable: true, enumerable: false };
    Object.defineProperty(obj, key, { value: fn, ...flags });
    return () => {
      try {
        if (own) Object.defineProperty(obj, key, own);
        else delete obj[key];
      } catch (e) {}
    };
  };

  const GoogleNative = (fn, nativeStr, nameStr, lenNum) => new Proxy(fn, {
    get(target, prop, receiver) {
      if (prop === 'toString') return () => nativeStr;
      if (prop === 'name' && nameStr != null) return nameStr;
      if (prop === 'length' && lenNum != null) return lenNum;
      return Reflect.get(target, prop, receiver);
    },
    getOwnPropertyDescriptor(target, prop) {
      if (prop === 'toString') return Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    apply(target, thisArg, args) {
      try {
        return Reflect.apply(target, thisArg, args);
      } catch (err) {
        if (err && err.stack) {
          err.stack = err.stack.replace(/VM\d+:\d+|\(anonymous\)/g, '[native]');
        }
        throw err;
      }
    },
    has(target, prop) {
      return prop === 'toString' || Reflect.has(target, prop);
    },
    deleteProperty() { return false; },
    defineProperty() { return false; }
  });

  const GoogleProgress = (data, task, cfgv) => {
    try {
      const candidates = cfgv === 1
        ? [data?.userStatus?.streamProgressSeconds, data?.userStatus?.progress?.[task]?.value]
        : [data?.userStatus?.progress?.[task]?.value, data?.userStatus?.streamProgressSeconds, data?.progress?.[task]?.value];
      const valid = candidates.find(n => {
        if (n === null || n === undefined || n === "" || typeof n === "boolean") return false;
        const value = Number(n);
        return Number.isFinite(value) && value >= 0;
      });
      return valid === undefined ? null : Number(valid);
    } catch (e) { return null; }
  };

  const _0xvideo = async (v) => {
    GoogleSay("Picturebook", `Fiddling the picturebook for ${v.name}.`);
    let firstTick = true, tick = 0;
    let _0xpacing = [4, 6, 9].map(n => n + 3);
    while (v.cur < v.goal && !_0xkill) {
      let _0x1c = Math.min(v.goal - v.cur, 4 + Math.floor(Math.random() * 8));
      if (_0xch.length === 1) v.drift ^= _0x1c;
      await GoogleDelay(_0x1c);
      if (_0xkill) break;
      if (Math.random() < 0.06) {
        GoogleSay("Kettle", "Letting the kettle whistle — brief steep.");
        await GoogleDelay(18 + Math.random() * 24);
        if (_0xkill) break;
      }
      const lastBeat = v.cur + _0x1c >= v.goal;
      let ts = (lastBeat ? v.goal + Math.random() * 1.4 : Math.min(v.goal, v.cur + _0x1c + Math.random())) | 0;
      if (firstTick || GoogleChatter) GoogleSay("Hourglass", `Grains landing whole: ${Number.isInteger(ts)} — grain #${ts}`);
      let _0x1d = await GooglePostSafe({ url: GoogleRoutes.videoProgress(v.q.id), body: { timestamp: ts } });
      v.cur = Math.min(v.goal, v.cur + _0x1c);
      firstTick = false;
      if (++tick % 3 === 1 || GoogleChatter || v.cur >= v.goal) GoogleSay("Abacus", `Random fraction: ${v.cur}/${v.goal}`);
      if (_0x1d?.body?.completed_at) break;
    }
    if (v.cur >= v.goal) GoogleSay("Trophy", `Polished: ${v.name}.`);
  };

  const _0xplay = async (v) => {
    if (!_0xc) { GoogleSay("Puddle", `That chore (${v.name}) needs the big workshop — skipping.`); return; }
    let _0x1e = await GoogleGetSafe({ url: GoogleRoutes.applications + v.app });
    let _0x1f = _0x1e?.body?.[0];
    if (!_0x1f) { GoogleSay("Puddle", "Chore note came back blank — skipping."); return; }
    let _0x20 = _0x1f.executables?.find(x => x && GoogleOS.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name.replace(/[\/\\:*?"<>|]/g, "");
    let running = [];
    try { running = Array.isArray(_0x4?.getRunningGames?.()) ? _0x4.getRunningGames() : []; } catch (e) { running = []; }
    let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : v.pid;
    GoogleSay("Tiles", `Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`);
    let _0xskew = (v.drift ^ (v.goal & 15)) >>> 0;
    let _0x21 = shuffleObject({ cmdLine: `C:\\Program Files\\${_0x1f.name}\\${_0x20}`, exeName: _0x20, exePath: `c:/program files/${_0x1f.name.toLowerCase()}/${_0x20}`, hidden: false, isLauncher: false, id: v.app, name: _0x1f.name, pid: _0x1bReal, pidPath: [_0x1bReal], processName: _0x1f.name, start: Date.now() - (60 + Math.floor(Math.random() * 180)) * 1000 });
    GoogleSay("Cutlery", "Drawer reshuffled: " + Object.keys(_0x21).join(", "));
    let _0x23 = [_0x21];
    let undo1 = null, undo2 = null;
    try {
      undo1 = GoogleHook(_0x4, _0xm1, GoogleNative(() => _0x23, "function getRunningGames() { [native code] }", _0xm1, 0));
      undo2 = GoogleHook(_0x4, _0xm2, GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }", _0xm2, 1));
    } catch (e) {
      try { undo2?.(); } catch (x) {}
      try { undo1?.(); } catch (x) {}
      GoogleSay("Puddle", "The desktop doorway could not be prepared — skipping.");
      return;
    }
    _0xsend({ type: _0xe0, removed: running, added: [_0x21], games: _0x23 });
    let done = false, stick = 0;
    const cleanup = () => {
      if (done) return; done = true;
      try { undo1?.(); undo2?.(); } catch (e) {}
      try { _0xsend({ type: _0xe0, removed: [_0x21], added: [], games: [] }); } catch (e) {}
      try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {}
      _0xpending.delete(cleanup);
      const i = _0xrestores.indexOf(cleanup); if (i > -1) _0xrestores.splice(i, 1);
      if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; }
    };
    let watchdog = null;
    const GoogleDesktopHandler = data => {
      if (_0xpaus || _0xkill) return;
      let _0x26 = GoogleProgress(data, GoogleTasks.play, v.cfgv);
      if (_0x26 === null) return;
      if (++stick % 3 === 1 || GoogleChatter || _0x26 >= v.goal) GoogleSay("Abacus", `Random fraction: ${_0x26}/${v.goal}`);
      if (_0x26 >= v.goal) GoogleSay("Trophy", `Polished: ${v.name}.`);
      if (_0x26 >= v.goal || _0xkill) cleanup();
    };
    _0xpending.add(cleanup);
    _0xrestores.push(cleanup);
    try { _0xon(_0xe1, GoogleDesktopHandler); }
    catch (e) { cleanup(); GoogleSay("Puddle", "Desktop progress subscription failed — skipping."); return; }
    watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
    GoogleSay("Tidbits", `Fiddling tidbits for ${_0x1f.name} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
  };

  const _0xstream = async (v) => {
    if (!_0xc) { GoogleSay("Puddle", `That chore (${v.name}) needs the big workshop — skipping.`); return; }
    GoogleSay("Tiles", `Floor tiles line up in fours: ${v.pid % 4 === 0} — tile #${v.pid}`);
    let undo = null;
    try {
      undo = GoogleHook(_0x3, _0xm0, GoogleNative(() => ({ id: v.app, pid: v.pid, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }", _0xm0, 0));
    } catch (e) {
      GoogleSay("Puddle", "The stream doorway could not be prepared — skipping.");
      return;
    }
    let done = false, stick = 0;
    const cleanup = () => {
      if (done) return; done = true;
      try { undo?.(); } catch (e) {}
      try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {}
      _0xpending.delete(cleanup);
      const i = _0xrestores.indexOf(cleanup); if (i > -1) _0xrestores.splice(i, 1);
      if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; }
    };
    let watchdog = null;
    const GoogleStreamHandler = data => {
      if (_0xpaus || _0xkill) return;
      let _0x28 = GoogleProgress(data, GoogleTasks.stream, v.cfgv);
      if (_0x28 === null) return;
      if (++stick % 3 === 1 || GoogleChatter || _0x28 >= v.goal) GoogleSay("Abacus", `Random fraction: ${_0x28}/${v.goal}`);
      if (_0x28 >= v.goal) GoogleSay("Trophy", `Polished: ${v.name}.`);
      if (_0x28 >= v.goal || _0xkill) cleanup();
    };
    _0xpending.add(cleanup);
    _0xrestores.push(cleanup);
    try { _0xon(_0xe1, GoogleStreamHandler); }
    catch (e) { cleanup(); GoogleSay("Puddle", "Stream progress subscription failed — skipping."); return; }
    watchdog = setTimeout(() => cleanup(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
    GoogleSay("Stage", `Fiddling tidbits onstage — keep any window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`);
  };

  const _0xact = async (v) => {
    if (!_0x6 || !_0x7) { GoogleSay("Puddle", "No doorway found for the arcade cabinet — skipping."); return; }
    let _0x29;
    try { _0x29 = _0x6[_0xm8]()[0]?.id; } catch (e) {}
    if (!_0x29) {
      try {
        const guilds = Object.values(_0x7[_0xm9]());
        const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length);
        if (voiceGuild) _0x29 = voiceGuild.VOCAL[0].channel.id;
      } catch (e) {}
      if (!_0x29) { GoogleSay("Puddle", "No doorway found for the arcade cabinet — skipping."); return; }
    }
    let _0x2a = `call:${_0x29}:${Math.floor(Math.random() * 3) + 1}`;
    GoogleSay("Arcade", `Feeding coins to the cabinet (~${Math.ceil((v.goal - v.cur) / 60)} min).`);
    const _0xactivityDeadline = Date.now() + Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000);
    let firstCoin = true, tick = 0;
    while (v.cur < v.goal && !_0xkill && Date.now() < _0xactivityDeadline) {
      if (_0xpaus) { await GoogleDelay(3); continue; }
      let _0x2b = await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: false } });
      v.cur = _0x2b?.body?.progress?.[GoogleTasks.activity]?.value ?? v.cur;
      firstCoin = false;
      if (++tick % 3 === 1 || GoogleChatter || v.cur >= v.goal) GoogleSay("Abacus", `Random fraction: ${v.cur}/${v.goal}`);
      await GoogleDelay(20);
      if (v.cur >= v.goal) {
        await GoogleDelay(2);
        if (_0xkill) break;
        await GooglePostSafe({ url: GoogleRoutes.heartbeat(v.q.id), body: { stream_key: _0x2a, terminal: true } });
        break;
      }
    }
    if (v.cur >= v.goal) GoogleSay("Trophy", `Polished: ${v.name}.`);
    else if (!_0xkill && Date.now() >= _0xactivityDeadline) GoogleSay("Puddle", `Activity ${v.name} stopped after no confirmed progress.`);
  };

  const GoogleHandlers = {
    [GoogleTasks.video]: _0xvideo,
    [GoogleTasks.videoMobile]: _0xvideo,
    [GoogleTasks.play]: _0xplay,
    [GoogleTasks.stream]: _0xstream,
    [GoogleTasks.activity]: _0xact
  };

  const _0x10 = async (_0x11) => {
    let _0x15 = _0x11.config?.taskConfig ?? _0x11.config?.taskConfigV2;
    if (!_0x15?.tasks) { GoogleSay("Puddle", "Chore list was blank — skipping this one."); return; }
    let _0x16 = GoogleRoutes.tasks.find(t => _0x15.tasks[t]);
    let _0x17 = _0x16 ? _0x15.tasks[_0x16] : null;
    let _0x19 = Number(_0x17?.target);
    if (!Number.isFinite(_0x19) || _0x19 <= 0) { GoogleSay("Puddle", "Chore target was invalid — skipping this one."); return; }
    let _0x18 = _0x11.config?.application?.id ?? _0x17?.applications?.[0]?.id;
    if ((_0x16 === GoogleTasks.play || _0x16 === GoogleTasks.stream) && !_0x18) {
      GoogleSay("Puddle", "Chore had no application identifier — skipping.");
      return;
    }
    let _0x1a = _0x11.userStatus?.progress?.[_0x16]?.value ?? 0;
    let _0x1b = (Math.floor(Math.random() * 3584) + 512) * 4;
    let _0xdrift = _0x1b % 24;
    const fn = GoogleHandlers[_0x16];
    if (fn) await fn({ q: _0x11, name: _0x11.config?.messages?.questName ?? "that quest", app: _0x18, goal: _0x19, cur: _0x1a, pid: _0x1b, cfgv: _0x11.config?.configVersion, drift: _0xdrift });
  };

  const _0x2c = async () => {
    let didWork = false;
    try {
      _0xwatch = setInterval(() => {
        if (_0xkill && _0xrestores.length) _0xrestores.splice(0).forEach(f => { try { f(); } catch (e) {} });
        const p = location.pathname;
        if (!_0xpaus && p !== _0xroute0) { _0xpaus = true; GoogleSay("Map", "Trail marker moved — holding position."); }
        else if (_0xpaus && p === _0xroute0) { _0xpaus = false; GoogleSay("Map", "Back on the trail — resuming."); }
      }, 2500);
      while (_0xb.length && !_0xkill) {
        let _0x2d = _0xb.pop();
        if (!_0x2d) continue;
        try { didWork = true; await _0x10(_0x2d); }
        catch (err) { GoogleSay("Puddle", `Stubbed a toe on one chore (moving on): ${err?.message ?? err}`); }
        if (_0xb.length && !_0xkill) await GoogleDelay(10 + Math.random() * 38);
      }
      while (_0xpending.size && !_0xkill) await GoogleDelay(3);
      if (_0xkill) GoogleSay("Taps", "Last call — shift ended early.");
      else if (didWork) GoogleSay("Trophy", "Shelf polished — nothing left on the list.");
    } catch (err) {
      GoogleSay("Puddle", `Stubbed a toe: ${err?.message ?? err}`);
    } finally {
      while (_0xrestores.length) { try { _0xrestores.shift()(); } catch (e) {} }
      try { if (_0xwatch !== null) { clearInterval(_0xwatch); _0xwatch = null; } } catch (e) {}
      _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null;
      GoogleRelease();
    }
    if (didWork || _0xkill) {
      _0xarmed = true;
      GoogleSay("Doormat", (didWork && !_0xkill)
        ? "All polished — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so."
        : "Rug's half-shaken — press Alt+Shift+R to finish the job (refresh) whenever you're ready.");
    } else {
      GoogleScuttle();
      GoogleRelease();
    }
  };

  let _0xbootTimer = null;
  const _0xboot = async (ev) => {
    if (ev.source === window && ev.origin === location.origin && ev.data === _0xch) {
      window.removeEventListener("message", _0xboot);
      clearTimeout(_0xbootTimer);
      _0xbootTimer = null;
      GoogleSay("Mailroom", "Memo slipped under the door — shift started.");
      await GoogleDelay(2.5 + Math.random() * 5.5);
      if (!_0xkill) _0x2c();
    }
  };
  try {
    window.addEventListener("message", _0xboot);
    _0xbootTimer = setTimeout(() => {
      try { window.removeEventListener("message", _0xboot); } catch (e) {}
      GoogleScuttle();
    }, 15000);
    window.postMessage(_0xch, location.origin);
  } catch (err) {
    try { window.removeEventListener("message", _0xboot); } catch (e) {}
    try { if (_0xbootTimer !== null) clearTimeout(_0xbootTimer); _0xbootTimer = null; } catch (e) {}
    GoogleSay("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`);
    GoogleScuttle();
  }

  } catch (err) {
    GoogleSay("Puddle", `Knocked the shelf over setting up: ${err?.message ?? err}`);
    GoogleScuttle();
    GoogleRelease();
  }
})();
