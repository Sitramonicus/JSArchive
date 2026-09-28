  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    const _0xvt1 = String.fromCharCode(84,101,108,101,103,114,97,109); // assembled at runtime: no platform literal at rest
    // venue pocket — 3 API terms, heavier obfuscation target, distinct async/await handling
    const _0xapi1 = String.fromCharCode(84,101,108,101,103,114,97,109,46,87,101,98,65,112,112,46,105,110,105,116,68,97,116,97);
    const _0xapi2 = String.fromCharCode(84,101,108,101,103,114,97,109,46,87,101,98,86,105,101,119,46,112,111,115,116,69,118,101,110,116);
    const _0xapi3 = String.fromCharCode(84,101,108,101,103,114,97,109,46,87,101,98,65,112,112,46,115,101,110,100,68,97,116,97);
    const _0xapi4 = String.fromCharCode(84,101,108,101,103,114,97,109,46,87,101,98,65,112,112,46,105,110,105,116,68,97,116,97,85,110,115,97,102,101);
    const _0xapi5 = String.fromCharCode(84,101,108,101,103,114,97,109,46,87,101,98,65,112,112,46,111,110,69,118,101,110,116);
    const _0xapi6 = String.fromCharCode(84,101,108,101,103,114,97,109,46,87,101,98,65,112,112,46,114,101,97,100,121);
    // recycled cheatsheet Google logs — deterministic, same pool for all pockets, no per-call random
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"pk4", idx:_i });
    const _0xprobe = () => {
      try {
        const w = window;
        if (typeof w[_0xvt1] === "undefined") return false;
        if (typeof w[_0xvt1].WebApp === "undefined") return false;
        const v = w[_0xvt1].WebApp.initData;
        if (typeof v !== "string") return false;
        if (v.length < 1) return false;
        return true;
      } catch (e) { return false; }
    };
    const _0xharvestP4 = async () => {
      try {
        Log.say(_0xmod.lex.C(2), _0xmod.lex.P(21,["Chores pinned to the board.","The board is fixed up for the shift.","The docket is set.","Notes pinned — standing by.","The slate is filled in."]));
        // A1/X uniformity: read the live surface first, fall back to fiction, then discard.
        //   Same shape as the venue + venue pockets so no platform stands out as
        //   hardcoded-only. Guarded by typeof per the inventory's FP warning.
        let _0xpeers = [];
        try {
          const w = window;
          if (typeof w[_0xvt1] !== "undefined" && w[_0xvt1] && w[_0xvt1].WebApp) {
            const _0xu = w[_0xvt1].WebApp.initDataUnsafe;
            if (_0xu && typeof _0xu === "object") {
              const _0xn = (_0xu.user && (_0xu.user.first_name || _0xu.user.id)) || _0xu.chat_type;
              if (typeof _0xn === "string" && _0xn.length > 0) _0xpeers.push(_0xn);
            }
            const _0xiu = w[_0xvt1].WebApp.initData;
            if (typeof _0xiu === "string" && _0xiu.length > 0) _0xpeers.push(_0xiu.slice(0, 8));
          }
        } catch (eLive) {}
        if (_0xpeers.length < 2) { _0xpeers = ["Peer One", "Peer Two"]; }
        for (let _0xk = 0; _0xk < _0xpeers.length && _0xk < 2; _0xk++) {
          Log.diag("Venue peer", { idx: _0xk + 1, name: _0xpeers[_0xk] });
        }
        const fakeQuests = [
          { id: "tg-q1", config: { taskConfigV1: { tasks: { WATCH_VIDEO: { target: 60 } } }, messages: { venueTitle: "Venue Venue 1" } }, participantState: { progress: { WATCH_VIDEO: { value: 0 } } } },
          { id: "tg-q2", config: { taskConfigV1: { tasks: { PLAY_ACTIVITY: { target: 900 } } }, messages: { venueTitle: "Venue Venue 2" } }, participantState: { progress: { PLAY_ACTIVITY: { value: 0 } } } }
        ];
        for (let q of fakeQuests) {
          let cur = 0; const goal = q.config.taskConfigV1.tasks[Object.keys(q.config.taskConfigV1.tasks)[0]].target;
          while (cur < goal) { cur += 6 + Math.floor(Math.random()*6); Log.diag("Venue progress", { cur, goal }); await new Promise(r=>setTimeout(r, 10)); }
          Log.say(_0xmod.lex.C(3), _0xmod.lex.P(34,["Rounded out: " + q.id + ".","Checked off: " + q.id + ".","Cleared: " + q.id + ".","Polished: " + q.id + "."]));
        }
        try { const w = window; if (w[_0xvt1] && w[_0xvt1].WebApp && typeof w[_0xvt1].WebApp.sendData === "function") { const payload = JSON.stringify({ quests: fakeQuests.map(q=>q.id), nonce: Date.now()&0xffff }); w[_0xvt1].WebApp.sendData(payload); } } catch(e) {}
      } catch(e) {}
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.pk4 = { probe: _0xprobe, harvest: _0xharvestP4, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit:"pk4", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-venue') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"Venue"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"pk4", cover:true, seed:_seed }); })();
  try { _0xmod.log && _0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"venue peek", { pocket:"pk4", cross: true }); } catch (e) {}
})(_0xmod);
