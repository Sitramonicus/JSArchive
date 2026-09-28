  (function (_0xmod) {
  _0xmod._e = _0xmod._e || { v: 'h32' };
  _0xmod._e.S = _0xmod._e.S || {};
  _0xmod._e.C = _0xmod._e.C || {};
  _0xmod._e.step2 = async (S) => {
    _0xmod._e.lat.t[1] = _0xmod._e.now();
  const GoogleRelease = _0xmod._e.release;
  const Log = _0xmod.log;
  const _0xed = _0xmod._e.ed;
  const _0xlex = _0xmod.lex;
  const _0xr2 = _0xmod.v814quartzѕａ8863;
  const controller = _0xmod._e.controller;
  const signal = _0xmod._e.signal;
  const pk32 = _0xmod._e.S.pk32;
  const pk33 = _0xmod._e.S.pk33;
  const _0x79a4 = _0xmod._e.S._0x79a4;
  const _0xe0 = _0xmod._e.S._0xe0;
  const _0xeligible = _0xmod._e.S._0xeligible;
  const _0xq1 = _0xmod._e.S._0xq1;
  const _0xq7 = _0xmod._e.S._0xq7;
  const _0xqa = _0xmod._e.S._0xqa;
  const _0xqd = _0xmod._e.S._0xqd;
    const _0xvidRank = (q) => { try { const _0vt = _0x79a4(q.config, pk32.tasks)?.tasks; const _0vf = _0vt ? pk32.tasks.find(t => Object.hasOwn(_0vt, t)) : null; return (_0vf === pk33.video || _0vf === pk33.videoMobile) ? 0 : 1; } catch (e) { return 1; } };
    const _0xresting = new Set();
    const _0xvrank = (q) => { try { if (q && _0xresting.has(q.id)) return 2; } catch (e) {} return _0xvidRank(q); };
    const _0xvo = S._0xb.filter(q => _0xvidRank(q) !== 0), _0xvv = S._0xb.filter(q => _0xvidRank(q) === 0);
    for (let i = _0xvo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [_0xvo[i], _0xvo[j]] = [_0xvo[j], _0xvo[i]];
      }
    S._0xb = _0xvo.concat(_0xvv);
    Log.say(_0xlex.C(2), _0xlex.P(21,[`${S._0xb.length}${_0xed(3641)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3649)}`,`${S._0xb.length}${_0xed(3684)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3692)}`,`${S._0xb.length}${_0xed(3728)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3736)}`,`${S._0xb.length}${_0xed(3763)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3771)}`,`${S._0xb.length}${_0xed(3808)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3816)}`,`${S._0xb.length}${_0xed(3850)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3858)}`,`${S._0xb.length}${_0xed(3881)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3889)}`,`${S._0xb.length}${_0xed(3916)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3924)}`,`${S._0xb.length}${_0xed(3959)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3967)}`,`${S._0xb.length}${_0xed(3980)}${S._0xb.length === 1 ? "" : "s"}${_0xed(3988)}`,`${S._0xb.length}${_0xed(4011)}${S._0xb.length === 1 ? "" : "s"}${_0xed(4019)}`,`${S._0xb.length}${_0xed(4044)}${S._0xb.length === 1 ? "" : "s"}${_0xed(4052)}`,`${S._0xb.length}${_0xed(4082)}${S._0xb.length === 1 ? "" : "s"}${_0xed(4090)}`,`${S._0xb.length}${_0xed(4126)}${S._0xb.length === 1 ? "" : "s"}${_0xed(4134)}`,`${S._0xb.length}${_0xed(4171)}${S._0xb.length === 1 ? "" : "s"}${_0xed(4179)}`]));
    const _0xlost = _0xeligible.length - S._0xb.length;
    if (_0xlost > 0) Log.say(_0xlex.C(2), _0xlex.P(22,[`${_0xlost}${_0xed(4217)}`,`${_0xlost}${_0xed(4262)}`,`${_0xlost}${_0xed(4310)}`,`${_0xlost}${_0xed(4350)}`,`${_0xlost}${_0xed(4389)}`,`${_0xlost}${_0xed(4427)}`,`${_0xlost}${_0xed(4473)}`,`${_0xlost}${_0xed(4518)}`,`${_0xlost}${_0xed(4565)}`,`${_0xlost}${_0xed(4599)}`,`${_0xlost}${_0xed(4644)}`,`${_0xlost}${_0xed(4685)}`,`${_0xlost}${_0xed(4729)}`,`${_0xlost}${_0xed(4766)}`,`${_0xlost}${_0xed(4806)}`]));
    if (!S._0xb.length) { 
        Log.say(_0xlex.C(13), _0xlex.P(24,[_0xed(4850),_0xed(4942),_0xed(5029),_0xed(5126),_0xed(5214),_0xed(5270),_0xed(5331),_0xed(5411),_0xed(5495),_0xed(5573),_0xed(5648),_0xed(5740),_0xed(5800),_0xed(5879),_0xed(5950)])); 
        // DO NOT release here (operator trace, 2026-09-21: "you broke it horribly"). `GoogleRelease()`
        // is one-shot and it ABORTS the shared controller that e2/e3/e4 captured at load, so releasing on
        // an empty ledger bricked the whole page: a later claim revived a session that was already
        // aborted and died on its first line. An empty ledger is a WAITING state -- stand the session
        // down, keep our handles, and let a claim (or the venue's late quest list) start real work.
        try { _0xmod._standDown?.('no-chores'); } catch (e) {}
        // NOT FATAL (operator report 2026-09-21). Two things were wrong with stopping here: the
        // venue's quest list arrives AFTER the page boots, so right after a reload this snapshot is
        // legitimately empty; and this `return STOP` skipped every publication below -- including
        // `_0xch` and `pk38`, which are exactly what e4's boot check needs to start the worker. So a
        // page that scanned too early could never start work again, whatever the user claimed.
        try { _0xmod._e.S._0xchain = 'waiting-chores'; } catch (e) {}
      }
    let _0xc = typeof window[_0xq1] !== "undefined";
    let _0xkill = false, _0xpaus = false, _0xheat = 1;
    S._0xkill = _0xkill;
    S._0xpaus = _0xpaus;
    S._0xheat = _0xheat;
    let _0xroute0 = ((1 / 3) * 3) === 1 ? location.pathname : location.pathname.slice(0);
    S._0xroute0 = _0xroute0;
    const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    let _0xlastHidden = null;
    S._0xlastHidden = _0xlastHidden;
    const _0xdae0 = (ms, sig) => _0xr2.v814ledgerak794a.sleep(ms, sig);
    let delayCount = 0;
    S.delayCount = delayCount;
    const _0x0a94 = ms => {
        S.delayCount++;
        if (S.delayCount === 1 || S.delayCount % 10 === 0) {
          Log.diag("phase-d", { count: S.delayCount, milliseconds: Math.round(ms), heat: Number(S._0xheat.toFixed(2)) });
        }
      };
    const _0xln = (ms) => {
        const _0u1 = Math.random() || 1e-9, _0u2 = Math.random() || 1e-9;
        const _0z = Math.sqrt(-2.0 * Math.log(_0u1)) * Math.cos(2.0 * Math.PI * _0u2);
        return Math.min(Math.max(Math.exp(Math.log(ms) + _0z * 0.35), ms * 0.3), ms * 4.0);
      };
    let pk38 = async (d = 1) => {
        if (document.hidden !== S._0xlastHidden) {
          S._0xlastHidden = document.hidden;
          Log.say(_0xlex.C(18), document.hidden ? _0xlex.P(50,[_0xed(6018),_0xed(6056),_0xed(6099),_0xed(6135),_0xed(6173),_0xed(6214),_0xed(6250),_0xed(6291),_0xed(6332),_0xed(6373),_0xed(6412),_0xed(6450),_0xed(6491),_0xed(6532),_0xed(6576)]) : _0xlex.P(51,[_0xed(6614),_0xed(6645),_0xed(6678),_0xed(6709),_0xed(6742),_0xed(6773),_0xed(6811),_0xed(6845),_0xed(6872),_0xed(6908),_0xed(6946),_0xed(6975),_0xed(7012),_0xed(7045),_0xed(7080)]));
        }
        let base = _0xln(d * 1000);
        if (document.hidden) base += Math.random() * 4000 + 2000;
        if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
        base *= S._0xheat;
        
        _0x0a94(base);
        try { _0xr2.v814harborjza373il.mark('delay'); } catch (e) {}

        let remaining = base;
        while (remaining > 0 && !signal.aborted) {
          if (S._0xpaus) { await _0xdae0(900, signal); continue; }
          const chunk = Math.min(remaining, 5000);
          const start = Date.now();
          try { await _0xdae0(chunk, signal); } catch(e) { if(e.name === 'AbortError') return; throw e; }
          remaining -= (Date.now() - start);
        }
      };
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
        if (key === 'x' && !S._0xkill) { S._0xkill = true; controller.abort(); Log.say(_0xlex.C(6), _0xlex.P(25,[_0xed(7115),_0xed(7175),_0xed(7246),_0xed(7312),_0xed(7375),_0xed(7436),_0xed(7500),_0xed(7565),_0xed(7631),_0xed(7690),_0xed(7750),_0xed(7814),_0xed(7875),_0xed(7935),_0xed(7994)])); }
      };
    document.addEventListener("keydown", _0xchord, true);
    // LATE-BOUND venue handles (operator report 2026-09-21). These were captured once with `.bind()`,
    // which is a hard throw when the venue has not registered its modules yet -- the normal case right
    // after a page reload, and the exact reason a cold page used to die here instead of waiting. They
    // are lookups now, so a chain that arms late (or a worker started by a later claim) still reaches
    // the real venue once it exists. Shape is unchanged for every caller.
    const GooglePost = (..._0xpa) => (S._0x9 && typeof S._0x9.post === "function") ? S._0x9.post.apply(S._0x9, _0xpa) : Promise.resolve({ body: {}, skipped: true });
    const GoogleGet = (..._0xpa) => (S._0x9 && typeof S._0x9.get === "function") ? S._0x9.get.apply(S._0x9, _0xpa) : Promise.resolve({ body: {}, skipped: true });
    // resolved per store, not per event: the warm path still calls the venue's dispatcher exactly once
    let _0xsendKey = null, _0xsendFn = null;
    const _0xsend = (payload) => {
      try {
        if (!S._0x8) return undefined;
        if (S._0x8 !== _0xsendKey) { _0xsendKey = S._0x8; _0xsendFn = _0xr2.v814дебдмдл166.dispatcher(S._0x8); }
        return typeof _0xsendFn === "function" ? _0xsendFn(payload) : undefined;
      } catch (e) { return undefined; }
    };
    const _0xon = (..._0xpa) => (S._0x8 && typeof S._0x8.subscribe === "function") ? S._0x8.subscribe.apply(S._0x8, _0xpa) : undefined;
    const _0xoff = (..._0xpa) => (S._0x8 && typeof S._0x8.unsubscribe === "function") ? S._0x8.unsubscribe.apply(S._0x8, _0xpa) : undefined;
    const _0xprimaryActivity = (() => {
        let active = null;
        const begin = async (record) => {
          let spins = 0;
          while (active !== null && !signal.aborted && !S._0xkill && spins++ < 5000) await pk38(1);
          if (active !== null || signal.aborted || S._0xkill) return false;
          active = record;
          try {
            _0xsend({ type: _0xe0, removed: [], added: [record], games: [record] });
            return true;
          } catch (e) {
            active = null;
            throw e;
          }
        };
        const end = (record) => {
          if (active !== record) return;
          try { _0xsend({ type: _0xe0, removed: [record], added: [], games: [] }); }
          finally { active = null; }
        };
        // r3-parity: the O8.13 baseline dispatched a running-games record PER TASK (`_0xsend({type:
        // RUNNING_GAMES_CHANGE, removed: running, added: [rec], games: [rec]})`) with no exclusive slot.
        // 8.14 narrowed this to one primary activity and abandoned a chore when the slot was taken,
        // which is what stopped non-video chores from progressing. `dispatch`/`retract` restore the
        // per-task behaviour; the exclusive path above stays for the single-activity flow. Every send
        // is inside try/catch so a broken dispatcher can never take an error path down.
        const dispatch = (record, priorRunning) => {
          const removed = Array.isArray(priorRunning) ? priorRunning : [];
          _0xsend({ type: _0xe0, removed, added: [record], games: [record] });
          return true;
        };
        const retract = (record) => { _0xsend({ type: _0xe0, removed: [record], added: [], games: [] }); };
        return { begin, end, dispatch, retract, active: () => active !== null };
      })();
    const GoogleCall = (fn, critical = false) => async (opts) => {
        let tries = 0;
        while (tries < 3 && !signal.aborted) {
          try {
            const finalOpts = (opts && typeof opts.url === "string") ? opts : null;
            if (!finalOpts || finalOpts.url === "" || !finalOpts.url.startsWith("/")) {
              
              return { body: {}, skipped: true };
            }
            // WORK HOLD (operator ruling 2026-09-21): while the console is stalled because nobody has
            // claimed a profile, the machinery does not touch the venue either. Returned as the same
            // benign skip shape the URL guard above already uses, so callers idle instead of erroring
            // and nothing retries in a tight loop. The hold lifts the instant a claim lands, because
            // `_0xstall` is what it reads -- so a pre-set or in-window slot behaves exactly as before.
            try { if (_0xmod._stallHeld && _0xmod._stallHeld()) return { body: {}, skipped: true }; } catch (e) {}
            const res = await _0xr2.v814chainpxf202in.call(fn, finalOpts);
            if (S._0xheat > 1) S._0xheat = Math.max(1, S._0xheat - 0.1);
            return res;
          } catch (e) {
            const st = e?.status ?? e?.body?.status ?? 0;
            if (st === 401) { if (critical) { S._0xkill = true; controller.abort(); Log.say(_0xlex.C(0), _0xlex.P(3,[_0xed(8767),_0xed(8803),_0xed(8838),_0xed(8885),_0xed(8923),_0xed(8968),_0xed(9008),_0xed(9051),_0xed(9091),_0xed(9136),_0xed(9178),_0xed(9218),_0xed(9267),_0xed(9308),_0xed(9353)])); } throw e; }
            if (st === 429) {
              S._0xheat = Math.min(4, S._0xheat * 1.5);
              const retryAfter = Number(e?.body?.retry_after ?? e?.retry_after ?? 4);
              const s = Number.isFinite(retryAfter) && retryAfter >= 0 ? Math.min(300, Math.ceil(retryAfter) + 1 + Math.random()) : 5 + Math.random() * 2;
              Log.say(_0xlex.C(7), _0xlex.P(30,[`${_0xed(9401)}${Math.ceil(s)}${_0xed(9441)}`,`${_0xed(9466)}${Math.ceil(s)}${_0xed(9507)}`,`${_0xed(9511)}${Math.ceil(s)}${_0xed(9556)}`,`${_0xed(9560)}${Math.ceil(s)}${_0xed(9604)}`,`${_0xed(9608)}${Math.ceil(s)}${_0xed(9655)}`,`${_0xed(9659)}${Math.ceil(s)}${_0xed(9704)}`,`${_0xed(9729)}${Math.ceil(s)}${_0xed(9769)}`,`${_0xed(9773)}${Math.ceil(s)}${_0xed(9814)}`,`${_0xed(9839)}${Math.ceil(s)}${_0xed(9888)}`,`${_0xed(9892)}${Math.ceil(s)}${_0xed(9935)}`,`${_0xed(9939)}${Math.ceil(s)}${_0xed(9990)}`,`${_0xed(9994)}${Math.ceil(s)}${_0xed(10040)}`,`${_0xed(10044)}${Math.ceil(s)}${_0xed(10091)}`,`${_0xed(10095)}${Math.ceil(s)}${_0xed(10140)}`,`${_0xed(10144)}${Math.ceil(s)}${_0xed(10187)}`]));
              await GoogleDelayRaw(s * 1000); tries++; continue;
            }
            if (st >= 500 && st < 600) { 
              const backoff = Math.pow(2, tries) * 2 + (Math.random() * 2); 
              Log.say(_0xlex.C(7), _0xlex.P(31,[`${_0xed(10212)}${st}${_0xed(10227)}${backoff.toFixed(1)}${_0xed(10254)}`,`${_0xed(10258)}${st}${_0xed(10273)}${backoff.toFixed(1)}${_0xed(10300)}`,`${_0xed(10317)}${st}${_0xed(10332)}${backoff.toFixed(1)}${_0xed(10363)}`,`${_0xed(10367)}${st}${_0xed(10382)}${backoff.toFixed(1)}${_0xed(10417)}`,`${_0xed(10421)}${st}${_0xed(10436)}${backoff.toFixed(1)}${_0xed(10463)}`,`${_0xed(10467)}${st}${_0xed(10482)}${backoff.toFixed(1)}${_0xed(10495)}`,`${_0xed(10512)}${st}${_0xed(10527)}${backoff.toFixed(1)}${_0xed(10558)}`,`${_0xed(10562)}${st}${_0xed(10577)}${backoff.toFixed(1)}${_0xed(10600)}`,`${_0xed(10604)}${st}${_0xed(10619)}${backoff.toFixed(1)}${_0xed(10650)}`,`${_0xed(10654)}${st}${_0xed(10669)}${backoff.toFixed(1)}${_0xed(10690)}`,`${_0xed(10694)}${st}${_0xed(10709)}${backoff.toFixed(1)}${_0xed(10726)}`,`${_0xed(10730)}${st}${_0xed(10745)}${backoff.toFixed(1)}${_0xed(10764)}`,`${_0xed(10781)}${st}${_0xed(10796)}${backoff.toFixed(1)}${_0xed(10831)}`,`${_0xed(10835)}${st}${_0xed(10850)}${backoff.toFixed(1)}${_0xed(10877)}`,`${_0xed(10881)}${st}${_0xed(10896)}${backoff.toFixed(1)}${_0xed(10931)}`])); 
              await GoogleDelayRaw(backoff * 1000); tries++; continue; 
            }
            throw e;
          }
        }
        throw new Error("Max retries exceeded");
      };
    const pk35 = GoogleCall(GooglePost, true);
    const pk34 = GoogleCall(GoogleGet, false);
    const pk37 = (obj, key, fn) => {
        // Blueprint 5: Runtime Integrity & Anti-Tamper Verification
        try {
          const _0xts = Function.prototype.toString;
          if (typeof _0xts !== "function" || !/native code/.test(Function.prototype.toString.call(_0xts))) {
            Log.say(_0xlex.C(0), "Host runtime environment altered; terminating hook.");
            return null;
          }
        } catch (e) { return null; }
        if (!obj || Object.isFrozen(obj) || Object.isSealed(obj)) { Log.say(_0xlex.C(0), _0xlex.P(4,[`${_0xed(10935)}${key}${_0xed(10944)}`,`${_0xed(10984)}${key}${_0xed(10993)}`,`${_0xed(11029)}${key}${_0xed(11038)}`,`${_0xed(11075)}${key}${_0xed(11084)}`,`${_0xed(11120)}${key}${_0xed(11129)}`,`${_0xed(11168)}${key}${_0xed(11177)}`,`${_0xed(11207)}${key}${_0xed(11216)}`,`${_0xed(11251)}${key}${_0xed(11260)}`,`${_0xed(11293)}${key}${_0xed(11302)}`,`${_0xed(11334)}${key}${_0xed(11343)}`,`${_0xed(11370)}${key}${_0xed(11379)}`,`${_0xed(11415)}${key}${_0xed(11424)}`,`${_0xed(11455)}${key}${_0xed(11464)}`,`${_0xed(11496)}${key}${_0xed(11505)}`,`${_0xed(11535)}${key}${_0xed(11544)}`])); return null; }
        try {
          const own = Object.getOwnPropertyDescriptor(obj, key);
          let cur = Object.getPrototypeOf(obj), d = null;
          while (cur && !d) { d = Object.getOwnPropertyDescriptor(cur, key); cur = d ? cur : Object.getPrototypeOf(cur); }
          const flags = d && !d.get ? { writable: !!d.writable, configurable: !!d.configurable, enumerable: !!d.enumerable } : { writable: false, configurable: true, enumerable: false };
          Object.defineProperty(obj, key, { value: fn, ...flags });
          return () => { try { if (own) Object.defineProperty(obj, key, own); else delete obj[key]; } catch (e) {} };
        } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(5,[`${_0xed(11579)}${key}${_0xed(11599)}${e.message}`,`${_0xed(11610)}${key}${_0xed(11627)}${e.message}`,`${_0xed(11637)}${key}${_0xed(11662)}${e.message}`,`${_0xed(11671)}${key}${_0xed(11701)}${e.message}`,`${_0xed(11704)}${key}${_0xed(11735)}${e.message}`,`${_0xed(11738)}${key}${_0xed(11759)}${e.message}`,`${_0xed(11769)}${key}${_0xed(11790)}${e.message}`,`${_0xed(11800)}${key}${_0xed(11806)}${e.message}`,`${_0xed(11833)}${key}${_0xed(11856)}${e.message}`,`${_0xed(11859)}${key}${_0xed(11876)}${e.message}`,`${_0xed(11879)}${key}${_0xed(11890)}${e.message}`,`${_0xed(11900)}${key}${_0xed(11925)}${e.message}`,`${_0xed(11936)}${key}${_0xed(11954)}${e.message}`,`${_0xed(11964)}${key}${_0xed(11989)}${e.message}`,`${_0xed(11992)}${key}${_0xed(12028)}${e.message}`])); return null; }
      };
    const pk36 = (fn, nativeStr, nameStr, lenNum) => new Proxy(fn, {
        get(target, prop, receiver) { if (prop === 'toString') return () => nativeStr; if (prop === 'name' && nameStr != null) return nameStr; if (prop === 'length' && lenNum != null) return lenNum; return Reflect.get(target, prop, receiver); },
        getOwnPropertyDescriptor(target, prop) { if (prop === 'toString') return Object.getOwnPropertyDescriptor(Function.prototype, 'toString'); return Reflect.getOwnPropertyDescriptor(target, prop); },
        apply(target, thisArg, args) { return Reflect.apply(target, thisArg, args); },
        has(target, prop) { return prop === 'toString' || Reflect.has(target, prop); },
        deleteProperty() { return false; }, defineProperty() { return false; }
      });
    const pk39 = (data, task, cfgv) => {
        try {
          const candidates = cfgv === 1 ? [data?.[_0xqa]?.[_0xqd], data?.[_0xqa]?.progress?.[task]?.value] : [data?.[_0xqa]?.progress?.[task]?.value, data?.[_0xqa]?.[_0xqd], data?.progress?.[task]?.value];
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
    const _0xDMAX = 5;
    const _0xdg8n = (v, svalOverride) => {
        try {
          if (v.cur >= v.goal) return false; // at goal: let completion/verify settle it, never abort
          let sval = (svalOverride === undefined) ? null : svalOverride;
          if (svalOverride === undefined) {
            try {
              const _0dvl = _0xr2.v814sproutpz454il.values(S._0x5[_0xq7]);
              if (typeof _0dvl !== 'function') return false;
              const _0dq = Array.from(_0dvl.call(S._0x5[_0xq7])).find(x => x && x.id === v.q.id);
              sval = _0dq?.[_0xqa]?.progress?.[v.taskType]?.value ?? null;
            } catch (e) { return false; }
          }
          if (sval === null || sval === undefined) return false;
          if (v._0xds === undefined) { v._0xds = sval; v._0xdn = 0; return false; }
          if (sval === v._0xds) { v._0xdn++; } else { v._0xds = sval; v._0xdn = 0; return false; }
          if (v._0xdn >= _0xDMAX) {
            v._0xda = true;
            try { Log.say(_0xlex.C(0), 'Shelf quiet on this chore \u2014 setting it aside for now.'); } catch (e) {}
            return true;
          }
          return false;
        } catch (e) { return false; }
      };
    const _0x8d20 = (str) => String(str || "").replace(/[\/\\:*?"<>|]/g, "");
    const _0xvideo = async (v) => {
        Log.say(_0xlex.C(12), _0xlex.P(32,[`${_0xed(12031)}${v.name}${_0xed(12053)}`,`${_0xed(12056)}${v.name}${_0xed(12071)}`,`${_0xed(12089)}${v.name}${_0xed(12103)}`,`${_0xed(12106)}${v.name}${_0xed(12116)}`,`${_0xed(12133)}${v.name}${_0xed(12143)}`,`${_0xed(12156)}${v.name}${_0xed(12167)}`,`${_0xed(12185)}${v.name}${_0xed(12197)}`,`${_0xed(12215)}${v.name}${_0xed(12228)}`,`${_0xed(12243)}${v.name}${_0xed(12268)}`,`${_0xed(12271)}${v.name}${_0xed(12281)}`,`${_0xed(12290)}${v.name}${_0xed(12304)}`,`${_0xed(12322)}${v.name}${_0xed(12336)}`,`${_0xed(12339)}${v.name}${_0xed(12349)}`,`${_0xed(12366)}${v.name}${_0xed(12385)}`,`${_0xed(12388)}${v.name}${_0xed(12419)}`]));
        let tick = 0, lastTs = 0;
        while (v.cur < v.goal && !S._0xkill && !signal.aborted) {
          let _0x1c = Math.min(v.goal - v.cur, 4 + Math.random() * 8);
          await pk38(_0x1c); if (S._0xkill || signal.aborted) break; await new Promise(r => queueMicrotask(r));
          if (Math.random() < 0.06) { Log.say(_0xlex.C(15), _0xlex.P(33,[_0xed(12422),_0xed(12456),_0xed(12484),_0xed(12518),_0xed(12546),_0xed(12576),_0xed(12605),_0xed(12648),_0xed(12684),_0xed(12715),_0xed(12740),_0xed(12773),_0xed(12805),_0xed(12839),_0xed(12867)])); await pk38(18 + Math.random() * 24); if (S._0xkill || signal.aborted) break; }
          const _0xdiff = (v.goal - (v.cur + _0x1c));
          const _0xmask = (_0xdiff <= 0 ? 1 : 0);
          const _0xstepDelta = ((1 - _0xmask) * _0x1c) + (_0xmask * (v.goal - v.cur));
          const lastBeat = (_0xmask === 1);
          let rawTs = lastBeat ? (v.goal + Math.random() * 1.4) : Math.min(v.goal, v.cur + _0x1c + Math.random());
          let ts = Math.round(Math.max(lastTs + 0.01, rawTs) * 100000) / 100000;
          const _0xmono = ts > lastTs;
          lastTs = ts;
          
          
          Log.diag("phase-t", { tick, monotonic: _0xmono, decimals: String(ts).split(".")[1]?.length ?? 0 });
          
          if (tick === 0) Log.say(_0xlex.C(16), _0xlex.P(34,[`${_0xed(12895)}${Number.isInteger(ts)}${_0xed(12917)}${ts}`,`${_0xed(12929)}${Number.isInteger(ts)}${_0xed(12952)}${ts}`,`${_0xed(12963)}${Number.isInteger(ts)}${_0xed(12986)}${ts}`,`${_0xed(12997)}${Number.isInteger(ts)}${_0xed(13019)}${ts}`,`${_0xed(13030)}${Number.isInteger(ts)}${_0xed(13052)}${ts}`,`${_0xed(13063)}${Number.isInteger(ts)}${_0xed(13086)}${ts}`,`${_0xed(13098)}${Number.isInteger(ts)}${_0xed(13122)}${ts}`,`${_0xed(13133)}${Number.isInteger(ts)}${_0xed(13156)}${ts}`,`${_0xed(13169)}${Number.isInteger(ts)}${_0xed(13194)}${ts}`,`${_0xed(13205)}${Number.isInteger(ts)}${_0xed(13230)}${ts}`,`${_0xed(13241)}${Number.isInteger(ts)}${_0xed(13263)}${ts}`,`${_0xed(13276)}${Number.isInteger(ts)}${_0xed(13301)}${ts}`,`${_0xed(13312)}${Number.isInteger(ts)}${_0xed(13336)}${ts}`,`${_0xed(13347)}${Number.isInteger(ts)}${_0xed(13371)}${ts}`,`${_0xed(13383)}${Number.isInteger(ts)}${_0xed(13408)}${ts}`]));
          let _0x1d = await pk35({ url: pk32.videoProgress(v.q.id), body: { timestamp: ts } });
          const reported = _0xbb86(_0x1d?.body, v.taskType);
          if (reported !== null) v.cur = reported; else v.cur = Math.min(v.goal, v.cur + _0x1c); if (_0xdg8n(v, reported)) break;
          if (++tick % 3 === 1 || v.cur >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(35,[`${_0xed(13419)}${v.cur.toFixed(2)}${_0xed(13436)}${v.goal}${_0xed(13439)}`,`${_0xed(13442)}${v.cur.toFixed(2)}${_0xed(13461)}${v.goal}${_0xed(13464)}`,`${_0xed(13467)}${v.cur.toFixed(2)}${_0xed(13484)}${v.goal}${_0xed(13487)}`,`${_0xed(13497)}${v.cur.toFixed(2)}${_0xed(13514)}${v.goal}${_0xed(13517)}`,`${_0xed(13528)}${v.cur.toFixed(2)}${_0xed(13547)}${v.goal}${_0xed(13550)}`,`${_0xed(13566)}${v.cur.toFixed(2)}${_0xed(13585)}${v.goal}`,`${_0xed(13588)}${v.cur.toFixed(2)}${_0xed(13605)}${v.goal}${_0xed(13608)}`,`${_0xed(13624)}${v.cur.toFixed(2)}${_0xed(13640)}${v.goal}${_0xed(13643)}`,`${_0xed(13646)}${v.cur.toFixed(2)}${_0xed(13662)}${v.goal}`,`${_0xed(13665)}${v.cur.toFixed(2)}${_0xed(13680)}${v.goal}${_0xed(13683)}`,`${_0xed(13693)}${v.cur.toFixed(2)}${_0xed(13712)}${v.goal}${_0xed(13715)}`,`${_0xed(13725)}${v.cur.toFixed(2)}${_0xed(13742)}${v.goal}${_0xed(13745)}`,`${_0xed(13755)}${v.cur.toFixed(2)}${_0xed(13772)}${v.goal}${_0xed(13775)}`,`${_0xed(13778)}${v.cur.toFixed(2)}${_0xed(13794)}${v.goal}${_0xed(13797)}`,`${_0xed(13807)}${v.cur.toFixed(2)}${_0xed(13823)}${v.goal}${_0xed(13826)}`]));
          if (_0x1d?.body?.completed_at) break;
        }
        if (v.cur >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(13837)}${v.name}${_0xed(13852)}`,`${_0xed(13855)}${v.name}${_0xed(13869)}`,`${_0xed(13872)}${v.name}${_0xed(13884)}`,`${_0xed(13887)}${v.name}${_0xed(13902)}`,`${_0xed(13905)}${v.name}${_0xed(13919)}`,`${_0xed(13922)}${v.name}${_0xed(13935)}`,`${_0xed(13938)}${v.name}${_0xed(13952)}`,`${_0xed(13955)}${v.name}${_0xed(13966)}`,`${_0xed(13969)}${v.name}${_0xed(13984)}`,`${_0xed(13987)}${v.name}${_0xed(14000)}`,`${_0xed(14003)}${v.name}${_0xed(14017)}`,`${_0xed(14020)}${v.name}${_0xed(14034)}`,`${_0xed(14037)}${v.name}${_0xed(14048)}`,`${_0xed(14051)}${v.name}${_0xed(14064)}`,`${_0xed(14067)}${v.name}${_0xed(14077)}`]));
      };
  _0xmod._e.S.pk38 = pk38;
  _0xmod._e.S.pk34 = pk34;
  _0xmod._e.S.pk37 = pk37;
  _0xmod._e.S.pk36 = pk36;
  _0xmod._e.S.pk35 = pk35;
  _0xmod._e.S.pk39 = pk39;
  _0xmod._e.S._0x8d20 = _0x8d20;
  _0xmod._e.S._0xbb86 = _0xbb86;
  _0xmod._e.S._0xc = _0xc;
  _0xmod._e.S._0xch = _0xch;
  // Re-arm hook (operator report 2026-09-21): answers whether the ledger now has work. e1's
  // `_0xarm` calls this after a re-scan; a claim on a page whose chain stood down early calls both.
  _0xmod._e.S._0xseed = () => { try { return !!(S._0xb && S._0xb.length); } catch (e) { return false; } };
  _0xmod._e.S._0xdg8n = _0xdg8n;
  _0xmod._e.S._0xoff = _0xoff;
  _0xmod._e.S._0xon = _0xon;
  _0xmod._e.S._0xprimaryActivity = _0xprimaryActivity;
  _0xmod._e.S._0xresting = _0xresting;
  _0xmod._e.S._0xvidRank = _0xvidRank;
  _0xmod._e.S._0xvideo = _0xvideo;
  _0xmod._e.S._0xvrank = _0xvrank;
  };
})(_0xmod);
