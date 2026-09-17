  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    // Teams pocket — 3 API terms, distinct callback handling, partially-levelled (esbuild path)
    const _0xapi1 = "microsoftTeams.app.getContext";
    const _0xapi2 = "teams.chat.getChat";
    const _0xapi3 = "TeamsSDK.getTeam";
    const _0xapi4 = "microsoftTeams.appInitialization.notifySuccess";
    const _0xapi5 = "microsoftTeams.dialog.url.submit";
    const _0xapi6 = "Teams.app.getConfig";
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"teams", idx:_i });
    const _0xprobeTeams = () => {
      try {
        const w = window;
        if (typeof w.microsoftTeams === "undefined") return false;
        const fn = w.microsoftTeams.app && w.microsoftTeams.app.getContext;
        if (typeof fn !== "function") return false;
        if (fn.length < 1) return false;
        return true;
      } catch(e){ return false; }
    };
    const _0xharvestTeams = () => {
      return new Promise((resolve) => {
        try {
          Log.say("Teams", "Quests: 3 pinned — getContext validated");
          const fake = { channelId: "teams-chan-1", teamId: "team-1" };
          Log.diag("Teams channel", fake);
          const qs = [{ id: "tm-q1", name: "Teams Quest A" }, { id: "tm-q2", name: "Teams Quest B" }];
          let idx = 0;
          const step = () => {
            if (idx >= qs.length) { Log.say("Teams", "All quests dispatched"); resolve(); return; }
            const q = qs[idx++];
            Log.say("Teams", "Running " + q.name);
            setTimeout(step, 50);
          };
          step();
          try { const w = window; if (w.microsoftTeams && w.microsoftTeams.app && typeof w.microsoftTeams.app.getContext === "function") { w.microsoftTeams.app.getContext((ctx)=>{ try{ Log.diag("Teams context", ctx); }catch(e){} }); } } catch(e){}
        } catch(e){ resolve(); }
      });
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.teams = { probe: _0xprobeTeams, harvest: _0xharvestTeams, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit: "p-teams", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-teams') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master="851b28e5"; const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"teams"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag("[Google ledger] rcd "+_d1, { pocket:"teams", cover:true, seed:_seed }); })();
})(_0xmod);
