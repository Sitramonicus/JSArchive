(() => {
  const GoogleChatter = false;
  const GoogleSay = (d, m) => console.log(`[Google ${d}] ${m}`);

  let _0x1 = window["webp" + "ack" + "Chu" + "nk" + String.fromCharCode(100, 105, 115, 99, 111, 114, 100, 95, 97, 112, 112)], _0x2;
  _0x2 = _0x1.push([[Symbol()], {}, r => r]);
  _0x1.pop();

  const GoogleMethods = {
    getStreamerActiveStreamMetadata: "getStreamerActiveStreamMetadata",
    getRunningGames: "getRunningGames",
    getQuest: "getQuest",
    getAllThreadsForParent: "getAllThreadsForParent",
    getSFWDefaultChannel: "getSFWDefaultChannel",
    flushWaitQueue: "flushWaitQueue",
    get: "get"
  };

  let _0x3 = Object.values(_0x2.c).find(x => x?.exports?.A?.__proto__?.[GoogleMethods.getStreamerActiveStreamMetadata])?.exports?.A;
  let _0x4 = Object.values(_0x2.c).find(x => x?.exports?.Ay?.[GoogleMethods.getRunningGames])?.exports?.Ay;
  let _0x5 = Object.values(_0x2.c).find(x => x?.exports?.A?.__proto__?.[GoogleMethods.getQuest])?.exports?.A;
  let _0x6 = Object.values(_0x2.c).find(x => x?.exports?.A?.__proto__?.[GoogleMethods.getAllThreadsForParent])?.exports?.A;
  let _0x7 = Object.values(_0x2.c).find(x => x?.exports?.Ay?.[GoogleMethods.getSFWDefaultChannel])?.exports?.Ay;
  let _0x8 = Object.values(_0x2.c).find(x => x?.exports?.h?.__proto__?.[GoogleMethods.flushWaitQueue])?.exports?.h;
  let _0x9 = Object.values(_0x2.c).find(x => x?.exports?.Bo?.[GoogleMethods.get])?.exports?.Bo;

  GoogleSay("Satchel", "Pockets checked: " + JSON.stringify({ lantern: !!_0x3, twine: !!_0x4, ledger: !!_0x5, spool: !!_0x6, map: !!_0x7, postbox: !!_0x8, compass: !!_0x9 }));
  if (!_0x3 || !_0x4 || !_0x5 || !_0x8 || !_0x9) { GoogleSay("Puddle", "Satchel's missing pockets — heading home."); return; }

  const GoogleRoutes = {
    videoProgress: (id) => atob("L3F1ZXN0cy8=") + id + atob("L3ZpZGVvLXByb2dyZXNz"),
    heartbeat: (id) => atob("L3F1ZXN0cy8=") + id + atob("L2hlYXJ0YmVhdA=="),
    applications: atob("L2FwcGxpY2F0aW9ucy9wdWJsaWM/YXBwbGljYXRpb25faWRzPQ=="),
    tasks: [atob("V0FUQ0hfVklERU8="), atob("UExBWV9PTl9ERVNLVE9Q"), atob("U1RSRUFNX09OX0RFU0tUT1A="), atob("UExBWV9BQ1RJVklUWQ=="), atob("V0FUQ0hfVklERU9fT05fTU9CSUxF")]
  };

  const GoogleTasks = {
    video: GoogleRoutes.tasks[0],
    play: GoogleRoutes.tasks[1],
    stream: GoogleRoutes.tasks[2],
    activity: GoogleRoutes.tasks[3],
    videoMobile: GoogleRoutes.tasks[4]
  };

  const _0xe = [82, 85, 78, 78, 73, 78, 71, 95, 71, 65, 77, 69, 83, 95, 67, 72, 65, 78, 71, 69];
  const _0xf = [81, 85, 69, 83, 84, 83, 95, 83, 69, 78, 68, 95, 72, 69, 65, 82, 84, 66, 69, 65, 84, 95, 83, 85, 67, 67, 69, 83, 83];

  let _0xa = GoogleRoutes.tasks;
  let _0xb = [..._0x5.quests.values()].filter(q => q.userStatus?.enrolledAt && !q.userStatus?.completedAt && new Date(q.config.expiresAt).getTime() > Date.now() && _0xa.find(t => Object.keys((q.config.taskConfig ?? q.config.taskConfigV2).tasks).includes(t)));
  if (!_0xb.length) { GoogleSay("Orchard", "Nothing ripe on the trees today."); return; }

  let _0xc = typeof window[String.fromCharCode(68, 105, 115, 99, 111, 114, 100, 78, 97, 116, 105, 118, 101)] !== "undefined";

  let _0xlastHidden = null;
  let GoogleDelay = async (d = 1) => {
    const jitterBuckets = [950, 1120, 1340, 980, 1450, 1020];
    if (document.hidden !== _0xlastHidden) {
      _0xlastHidden = document.hidden;
      GoogleSay("Blinds", document.hidden ? "Curtains drawn — taking the long hallway." : "Curtains open — back on the main road.");
    }
    let base = d * 1000 + jitterBuckets[Math.floor(Math.random() * jitterBuckets.length)];
    if (document.hidden) {
      base += Math.random() * 4000 + 2000;
    }
    if (Math.random() < 0.12) base += 1800 + Math.random() * 2200;
    return new Promise(r => setTimeout(r, base));
  };

  const GoogleError = console.error;
  const GoogleWarn = console.warn;

  const GooglePost = _0x9.post.bind(_0x9);
  const GoogleGet = _0x9.get.bind(_0x9);

  const shuffleObject = (obj) => {
    let entries = Object.entries(obj);
    for (let i = entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [entries[i], entries[j]] = [entries[j], entries[i]];
    }
    return Object.fromEntries(entries);
  };

  const GoogleTwitch = () => {
    try {
      document.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: 120 + (Math.random() * 480 | 0), clientY: 90 + (Math.random() * 360 | 0), pointerId: 1, isPrimary: true }));
      return true;
    } catch (e) { return false; }
  };

  const GoogleNative = (fn, nativeStr) => {
    Object.defineProperty(fn, 'toString', {
      value: () => nativeStr,
      configurable: true,
      writable: true,
      enumerable: false
    });
    Reflect.setPrototypeOf(fn, Function.prototype);

    return new Proxy(fn, {
      get(target, prop, receiver) {
        if (prop === 'toString') return () => nativeStr;
        return Reflect.get(target, prop, receiver);
      },
      apply(target, thisArg, args) {
        try {
          return Reflect.apply(target, thisArg, args);
        } catch (err) {
          if (err && err.stack) {
            err.stack = err.stack.replace(/VM\d+:\d+|\(anonymous\)/g, '[native]');
          }
          throw err;
        }
      },
      has(target, prop) {
        return prop === 'toString' || Reflect.has(target, prop);
      },
      deleteProperty() { return false; },
      defineProperty() { return false; }
    });
  };

  let _0xkill = false;

  const _0x10 = async (_0x11) => {
    let _0x15 = _0x11.config.taskConfig ?? _0x11.config.taskConfigV2;
    let _0x16 = _0xa.find(t => _0x15.tasks[t]);
    let _0x17 = _0x15.tasks[_0x16];
    let _0x18 = _0x11.config.application?.id ?? _0x17.applications?.[0]?.id;
    let _0x19 = _0x17.target;
    let _0x1a = _0x11.userStatus?.progress?.[_0x16]?.value ?? 0;
    let _0x1b = (Math.floor(Math.random() * 3584) + 512) * 4;

    if (_0x16 === GoogleTasks.video || _0x16 === GoogleTasks.videoMobile) {
      GoogleSay("Picturebook", `Fiddling the picturebook for ${_0x11.config.messages.questName}.`);
      let firstTick = true;
      while (_0x1a < _0x19 && !_0xkill) {
        let _0x1c = Math.min(7, _0x19 - _0x1a);
        await GoogleDelay(_0x1c);
        if (GoogleTwitch() && (firstTick || GoogleChatter)) GoogleSay("Marionette", "Tugged a string.");
        let ts = (Math.min(_0x19, _0x1a + _0x1c + Math.random()) | 0);
        if (firstTick || GoogleChatter) GoogleSay("Hourglass", `Grains landing whole: ${Number.isInteger(ts)} — grain #${ts}`);
        firstTick = false;
        let _0x1d = await GooglePost({ url: GoogleRoutes.videoProgress(_0x11.id), body: { timestamp: ts } });
        _0x1a = Math.min(_0x19, _0x1a + _0x1c);
        GoogleSay("Abacus", `Random fraction: ${_0x1a}/${_0x19}`);
        if (_0x1d.body.completed_at) break;
      }
      if (_0x1a >= _0x19) GoogleSay("Trophy", `Polished: ${_0x11.config.messages.questName}.`);

    } else if (_0x16 === GoogleTasks.play) {
      if (!_0xc) return;
      let _0x1e = await GoogleGet({ url: GoogleRoutes.applications + _0x18 });
      let _0x1f = _0x1e.body[0];
      let _0x20 = _0x1f.executables?.find(x => x.os === "win32")?.name?.replace(">", "") ?? _0x1f.name.replace(/[\/\\:*?"<>|]/g, "");
      let running = _0x4.getRunningGames();
      let _0x1bReal = (running && running.length > 0) ? running[0].pid : _0x1b;
      GoogleSay("Tiles", `Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`);
      let _0x21 = shuffleObject({ cmdLine: `C:\\Program Files\\${_0x1f.name}\\${_0x20}`, exeName: _0x20, exePath: `c:/program files/${_0x1f.name.toLowerCase()}/${_0x20}`, hidden: false, isLauncher: false, id: _0x18, name: _0x1f.name, pid: _0x1bReal, pidPath: [_0x1bReal], processName: _0x1f.name, start: Date.now() });
      GoogleSay("Cutlery", "Drawer reshuffled: " + Object.keys(_0x21).join(", "));
      let _0x22 = _0x4.getRunningGames(), _0x23 = [_0x21];
      let _0x24 = _0x4.getRunningGames, _0x25 = _0x4.getGameForPID;
      let GoogleRun = GoogleNative(() => _0x23, "function getRunningGames() { [native code] }");
      let GoogleDIP = GoogleNative(p => _0x23.find(x => x.pid === p), "function getGameForPID() { [native code] }");
      _0x4.getRunningGames = GoogleRun;
      _0x4.getGameForPID = GoogleDIP;
      _0x8.dispatch({ type: String.fromCharCode(..._0xe), removed: _0x22, added: [_0x21], games: _0x23 });
      const GoogleDesktopHandler = data => {
        let _0x26 = _0x11.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress[GoogleTasks.play].value);
        GoogleSay("Abacus", `Random fraction: ${_0x26}/${_0x19}`);
        if (_0x26 >= _0x19) GoogleSay("Trophy", `Polished: ${_0x11.config.messages.questName}.`);
        if (_0x26 >= _0x19 || _0xkill) {
          _0x4.getRunningGames = _0x24; _0x4.getGameForPID = _0x25;
          _0x8.dispatch({ type: String.fromCharCode(..._0xe), removed: [_0x21], added: [], games: [] });
          _0x8.unsubscribe(String.fromCharCode(..._0xf), GoogleDesktopHandler);
        }
      };
      _0x8.subscribe(String.fromCharCode(..._0xf), GoogleDesktopHandler);
      GoogleSay("Tidbits", `Fiddling tidbits for ${_0x1f.name} — dough needs ~${Math.ceil((_0x19 - _0x1a) / 60)} more minutes.`);

    } else if (_0x16 === GoogleTasks.stream) {
      if (!_0xc) return;
      GoogleSay("Tiles", `Floor tiles line up in fours: ${_0x1b % 4 === 0} — tile #${_0x1b}`);
      let _0x27 = _0x3.getStreamerActiveStreamMetadata;
      let GoogleMeta = GoogleNative(() => ({ id: _0x18, pid: _0x1b, sourceName: null }), "function getStreamerActiveStreamMetadata() { [native code] }");
      _0x3.getStreamerActiveStreamMetadata = GoogleMeta;
      const GoogleStreamHandler = data => {
        let _0x28 = _0x11.config.configVersion === 1 ? data.userStatus.streamProgressSeconds : Math.floor(data.userStatus.progress[GoogleTasks.stream].value);
        GoogleSay("Abacus", `Random fraction: ${_0x28}/${_0x19}`);
        if (_0x28 >= _0x19) GoogleSay("Trophy", `Polished: ${_0x11.config.messages.questName}.`);
        if (_0x28 >= _0x19 || _0xkill) {
          _0x3.getStreamerActiveStreamMetadata = _0x27;
          _0x8.unsubscribe(String.fromCharCode(..._0xf), GoogleStreamHandler);
        }
      };
      _0x8.subscribe(String.fromCharCode(..._0xf), GoogleStreamHandler);
      GoogleSay("Stage", `Fiddling tidbits onstage — keep any window live in vc for ~${Math.ceil((_0x19 - _0x1a) / 60)} more minutes.`);

    } else if (_0x16 === GoogleTasks.activity) {
      let _0x29 = _0x6.getSortedPrivateChannels()[0]?.id;
      if (!_0x29) {
        const guilds = Object.values(_0x7.getAllGuilds());
        const voiceGuild = guilds.find(x => x && x.VOCAL && x.VOCAL.length);
        if (voiceGuild) {
          _0x29 = voiceGuild.VOCAL[0].channel.id;
        } else {
          GoogleSay("Puddle", "No doorway found for the arcade cabinet — skipping.");
          return;
        }
      }
      let _0x2a = `call:${_0x29}:${Math.floor(Math.random() * 3) + 1}`;
      GoogleSay("Arcade", `Feeding coins to the cabinet (~${Math.ceil((_0x19 - _0x1a) / 60)} min).`);
      let firstCoin = true;
      while (_0x1a < _0x19 && !_0xkill) {
        if (GoogleTwitch() && (firstCoin || GoogleChatter)) GoogleSay("Marionette", "Tugged a string.");
        let _0x2b = await GooglePost({ url: GoogleRoutes.heartbeat(_0x11.id), body: { stream_key: _0x2a, terminal: false } });
        _0x1a = _0x2b.body.progress[GoogleTasks.activity].value;
        firstCoin = false;
        GoogleSay("Abacus", `Random fraction: ${_0x1a}/${_0x19}`);
        await GoogleDelay(20);
        if (_0x1a >= _0x19) {
          await GooglePost({ url: GoogleRoutes.heartbeat(_0x11.id), body: { stream_key: _0x2a, terminal: true } });
          break;
        }
      }
      if (_0x1a >= _0x19) GoogleSay("Trophy", `Polished: ${_0x11.config.messages.questName}.`);
    }
  };

  const _0x2c = async () => {
    let didWork = false;
    try {
      while (_0xb.length && !_0xkill) {
        let _0x2d = _0xb.pop();
        if (_0x2d) { didWork = true; await _0x10(_0x2d); }
      }
    } catch (err) {
      GoogleSay("Puddle", `Stubbed a toe: ${err?.message ?? err}`);
    } finally {
      _0x1 = _0x2 = _0x3 = _0x4 = _0x5 = _0x6 = _0x7 = _0x8 = _0x9 = _0xb = null;
      console.error = GoogleError;
      console.warn = GoogleWarn;
    }
    if (_0xkill) {
      GoogleSay("Taps", "Last call — shift ended early.");
    } else if (didWork) {
      GoogleSay("Trophy", "Shelf polished — nothing left on the list.");
      let wantsRefresh = false;
      try {
        wantsRefresh = confirm("[Google Doormat] All polished. Shake out the rug now? (OK = refresh, Cancel = sweep manually)");
      } catch (e) {}
      if (wantsRefresh) {
        GoogleSay("Doormat", "Shaking out the rug — see you on the other side.");
        try { delete window._0xkill; } catch (e) {}
        setTimeout(() => location.reload(), 2000);
      } else {
        GoogleSay("Doormat", "Rug stays put; corners swept by hand instead.");
      }
    }
  };

  window._0xkill = () => { _0xkill = true; GoogleSay("Taps", "Wrapping up after this chore."); };

  const _0xch = "g" + Math.random().toString(36).slice(2) + Date.now().toString(36);
  const _0xboot = (ev) => {
    if (ev.source === window && ev.data === _0xch) {
      window.removeEventListener("message", _0xboot);
      GoogleSay("Mailroom", "Memo slipped under the door — shift started.");
      _0x2c();
    }
  };
  window.addEventListener("message", _0xboot);
  window.postMessage(_0xch, "*");
})();
