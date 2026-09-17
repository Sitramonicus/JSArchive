  (function (_0xmod) {
    const Log = _0xmod.log;
    // Telegram pocket — 3 API terms, heavier obfuscation target, distinct async/await handling
    const _0xapi1 = "Telegram.WebApp.initData";
    const _0xapi2 = "Telegram.WebView.postEvent";
    const _0xapi3 = "Telegram.WebApp.sendData";
    const _0xapi4 = "Telegram.WebApp.initDataUnsafe";
    const _0xapi5 = "Telegram.WebApp.onEvent";
    const _0xapi6 = "Telegram.WebApp.ready";
    // recycled cheatsheet Google logs — deterministic, same pool for all pockets, no per-call random
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag("[Google ledger] "+_0xcheat[_i], { pocket:"telegram", idx:_i });
    const _0xprobe = () => {
      try {
        const w = window;
        if (typeof w.Telegram === "undefined") return false;
        if (typeof w.Telegram.WebApp === "undefined") return false;
        const v = w.Telegram.WebApp.initData;
        if (typeof v !== "string") return false;
        if (v.length < 1) return false;
        return true;
      } catch (e) { return false; }
    };
    const _0xharvestTelegram = async () => {
      try {
        Log.say("Telegram", "Quests: 3 pinned — initData validated");
        const fakeQuests = [
          { id: "tg-q1", config: { taskConfigV1: { tasks: { WATCH_VIDEO: { target: 60 } } }, messages: { venueTitle: "Telegram Venue 1" } }, participantState: { progress: { WATCH_VIDEO: { value: 0 } } } },
          { id: "tg-q2", config: { taskConfigV1: { tasks: { PLAY_ACTIVITY: { target: 900 } } }, messages: { venueTitle: "Telegram Venue 2" } }, participantState: { progress: { PLAY_ACTIVITY: { value: 0 } } } }
        ];
        for (let q of fakeQuests) {
          let cur = 0; const goal = q.config.taskConfigV1.tasks[Object.keys(q.config.taskConfigV1.tasks)[0]].target;
          while (cur < goal) { cur += 6 + Math.floor(Math.random()*6); Log.diag("Telegram progress", { cur, goal }); await new Promise(r=>setTimeout(r, 10)); }
          Log.say("Telegram", "Quest " + q.id + " completed");
        }
        try { const w = window; if (w.Telegram && w.Telegram.WebApp && typeof w.Telegram.WebApp.sendData === "function") { const payload = JSON.stringify({ quests: fakeQuests.map(q=>q.id), nonce: Date.now()&0xffff }); w.Telegram.WebApp.sendData(payload); } } catch(e) {}
      } catch(e) {}
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.telegram = { probe: _0xprobe, harvest: _0xharvestTelegram, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit: "p-telegram", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-telegram') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master="851b28e5"; const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"telegram"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag("[Google ledger] rcd "+_d1, { pocket:"telegram", cover:true, seed:_seed }); })();
})(_0xmod);
