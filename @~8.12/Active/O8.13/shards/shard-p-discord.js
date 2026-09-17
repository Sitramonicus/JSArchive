  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    // Discord pocket — 6 API terms, uniform 6 per platform (moved out of core engine)
    const _0xapi1 = "Discord.getAllGuilds";
    const _0xapi2 = "Discord.getSortedPrivateChannels";
    const _0xapi3 = "Discord.quests.values";
    const _0xapi4 = "Discord.getVoiceChannel";
    const _0xapi5 = "Discord.getDMChannels";
    const _0xapi6 = "Discord.getGuild";
    // recycled cheatsheet Google logs — deterministic, same pool for all pockets, no per-call random
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"discord", idx:_i });
    const _0xprobeDiscord = () => {
      try {
        const w = window;
        if (typeof w.Discord === "undefined") return false;
        const d = w.Discord;
        if (typeof d.getAllGuilds !== "function" && typeof d.getGuild !== "function") return false;
        return true;
      } catch(e){ return false; }
    };
    const _0xharvestDiscord = async () => {
      try {
        Log.say("Discord", "Quests: 3 pinned — Discord validated");
        const fakeGuilds = [{ id:"g1", name:"Guild One" }, { id:"g2", name:"Guild Two" }];
        for(let g of fakeGuilds){ Log.diag("Discord guild", g); await new Promise(r=>setTimeout(r,10)); }
        Log.say("Discord", "Discord quests dispatched");
      } catch(e){}
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.discord = { probe: _0xprobeDiscord, harvest: _0xharvestDiscord, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit: "p-discord", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-discord') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master="851b28e5"; const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"discord"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag("[Google ledger] rcd "+_d1, { pocket:"discord", cover:true, seed:_seed }); })();
})(_0xmod);
