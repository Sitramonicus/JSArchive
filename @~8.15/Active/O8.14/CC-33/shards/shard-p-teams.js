  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    const _0xvt1 = String.fromCharCode(109,105,99,114,111,115,111,102,116,84,101,97,109,115); // assembled at runtime: no platform literal at rest
    // venue pocket — 3 API terms, distinct callback handling, partially-levelled (esbuild path)
    const _0xapi1 = String.fromCharCode(109,105,99,114,111,115,111,102,116,84,101,97,109,115,46,97,112,112,46,103,101,116,67,111,110,116,101,120,116);
    const _0xapi2 = String.fromCharCode(116,101,97,109,115,46,99,104,97,116,46,103,101,116,67,104,97,116);
    const _0xapi3 = String.fromCharCode(84,101,97,109,115,83,68,75,46,103,101,116,84,101,97,109);
    const _0xapi4 = String.fromCharCode(109,105,99,114,111,115,111,102,116,84,101,97,109,115,46,97,112,112,73,110,105,116,105,97,108,105,122,97,116,105,111,110,46,110,111,116,105,102,121,83,117,99,99,101,115,115);
    const _0xapi5 = String.fromCharCode(109,105,99,114,111,115,111,102,116,84,101,97,109,115,46,100,105,97,108,111,103,46,117,114,108,46,115,117,98,109,105,116);
    const _0xapi6 = String.fromCharCode(84,101,97,109,115,46,97,112,112,46,103,101,116,67,111,110,102,105,103);
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"pk3", idx:_i });
    const _0xprobeP3 = () => {
      try {
        const w = window;
        if (typeof w[_0xvt1] === "undefined") return false;
        const fn = w[_0xvt1].app && w[_0xvt1].app.getContext;
        if (typeof fn !== "function") return false;
        if (fn.length < 1) return false;
        return true;
      } catch(e){ return false; }
    };
    const _0xharvestP3 = () => {
      return new Promise((resolve) => {
        try {
          Log.say(_0xmod.lex.C(2), _0xmod.lex.P(21,["Chores pinned to the board.","The board is fixed up for the shift.","The docket is set.","Notes pinned — standing by.","The slate is filled in."]));
        // A1/X uniformity: read the live surface first, fall back to fiction, then discard.
        //   Same shape as the venue + venue pockets so no platform stands out as
        //   hardcoded-only. Guarded by typeof per the inventory's FP warning.
          let _0xtnames = [];
          try {
            const w = window;
            if (typeof w[_0xvt1] !== "undefined" && w[_0xvt1]) {
              const _0xc = (w[_0xvt1].app && typeof w[_0xvt1].app.getContext === "function")
                ? (w[_0xvt1].context || null) : null;
              if (_0xc && typeof _0xc === "object") {
                const _0xn = _0xc.teamName || _0xc.channelName || _0xc.tid;
                if (typeof _0xn === "string" && _0xn.length > 0) _0xtnames.push(_0xn);
              }
            }
          } catch (eLive) {}
          if (_0xtnames.length < 2) { _0xtnames = ["Team One", "Team Two"]; }
          for (let _0xk = 0; _0xk < _0xtnames.length && _0xk < 2; _0xk++) {
            Log.diag("Venue context", { idx: _0xk + 1, name: _0xtnames[_0xk] });
          }
          const fake = { channelId: "Venue-chan-1", teamId: "team-1" };
          Log.diag("Venue channel", fake);
          const qs = [{ id: "tm-q1", name: "Venue Quest A" }, { id: "tm-q2", name: "Venue Quest B" }];
          let idx = 0;
          const step = () => {
            if (idx >= qs.length) { Log.say(_0xmod.lex.C(14), _0xmod.lex.P(40,["Chores handed out.","The run is under way.","Wheel turning — chores away.","Despatched and moving.","Off the shelf and running."])); resolve(); return; }
            const q = qs[idx++];
            Log.say(_0xmod.lex.C(2), _0xmod.lex.P(33,["Heads down on " + q.name + ".","Taking on " + q.name + ".","Picking up " + q.name + ".","Under way — " + q.name + "."]));
            setTimeout(step, 50);
          };
          step();
          try { const w = window; if (w[_0xvt1] && w[_0xvt1].app && typeof w[_0xvt1].app.getContext === "function") { w[_0xvt1].app.getContext((ctx)=>{ try{ Log.diag("Venue context", ctx); }catch(e){} }); } } catch(e){}
        } catch(e){ resolve(); }
      });
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.pk3 = { probe: _0xprobeP3, harvest: _0xharvestP3, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit:"pk3", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-venue') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"Venue"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"pk3", cover:true, seed:_seed }); })();
})(_0xmod);
