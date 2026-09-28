  (function (_0xmod) {
  _0xmod._e = _0xmod._e || { v: 'h32' };
  _0xmod._e.S = _0xmod._e.S || {};
  _0xmod._e.C = _0xmod._e.C || {};
  _0xmod._e.step3 = async (S) => {
    _0xmod._e.lat.t[2] = _0xmod._e.now();
  const Log = _0xmod.log;
  const _0x5c1f = _0xmod._e.flag;
  const _0x8844 = _0xmod._e.tasks;
  const _0xe8a7 = _0xmod._e.track;
  const _0xed = _0xmod._e.ed;
  const _0xlex = _0xmod.lex;
  const _0xr2 = _0xmod.v814quartzѕａ8863;
  const signal = _0xmod._e.signal;
  const pk34 = _0xmod._e.S.pk34;
  const pk37 = _0xmod._e.S.pk37;
  const pk36 = _0xmod._e.S.pk36;
  const pk31 = _0xmod._e.S.pk31;
  const pk39 = _0xmod._e.S.pk39;
  const pk32 = _0xmod._e.S.pk32;
  const pk33 = _0xmod._e.S.pk33;
  const _0x8d20 = _0xmod._e.S._0x8d20;
  const _0xc = _0xmod._e.S._0xc;
  const _0xdg8n = _0xmod._e.S._0xdg8n;
  const _0xe1 = _0xmod._e.S._0xe1;
  const _0xisLinux = _0xmod._e.S._0xisLinux;
  const _0xisMac = _0xmod._e.S._0xisMac;
  const _0xm0 = _0xmod._e.S._0xm0;
  const _0xm1 = _0xmod._e.S._0xm1;
  const _0xm2 = _0xmod._e.S._0xm2;
  const _0xoff = _0xmod._e.S._0xoff;
  const _0xon = _0xmod._e.S._0xon;
  const _0xprimaryActivity = _0xmod._e.S._0xprimaryActivity;
  const _0xq7 = _0xmod._e.S._0xq7;
  const _0xqa = _0xmod._e.S._0xqa;
  const _0xqb = _0xmod._e.S._0xqb;
  const _0xqc = _0xmod._e.S._0xqc;
    const _0xverifyDone = (v, _0xk9) => { // silence backstop: play/stream are event-only; verify completion via _0xk6
        try {
          const _0v = _0xr2.v814sproutpz454il.values(S._0x5[_0xq7]);
          if (typeof _0v !== "function") return; // handle not ready: retry next cycle, never settle blind
          const _0list = Array.from(_0v.call(S._0x5[_0xq7]));
          const q = _0list.find(x => x && x.id === v.q.id);
          let _0vdone = false, _0vline = false, _0vvia = '';
          if (!q || !q[_0xqa]?.[_0xqb]) {
            v._0xvmiss = (v._0xvmiss || 0) + 1;
            if (v._0xvmiss >= 2) { _0vdone = true; _0vline = true; _0vvia = 'gone'; }
          } else {
            v._0xvmiss = 0;
            const pv = q[_0xqa]?.progress?.[v.taskType]?.value;
            if (q[_0xqa]?.[_0xqc]) { _0vdone = true; _0vline = true; _0vvia = 'flag'; }
            else if (Number.isFinite(pv) && pv >= v.goal) { _0vdone = true; _0vline = true; _0vvia = 'value'; }
            else {
              const _0e = new Date(q.config?.expiresAt).getTime();
              if (Number.isFinite(_0e) && _0e <= Date.now() - 5 * 60 * 1000) { _0vdone = true; _0vline = false; _0vvia = 'expired'; }
            }
          }
          if (_0vline) { try { Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(18954)}${v.name}${_0xed(18969)}`,`${_0xed(18972)}${v.name}${_0xed(18986)}`,`${_0xed(18989)}${v.name}${_0xed(19001)}`,`${_0xed(19004)}${v.name}${_0xed(19019)}`,`${_0xed(19022)}${v.name}${_0xed(19036)}`,`${_0xed(19039)}${v.name}${_0xed(19052)}`,`${_0xed(19055)}${v.name}${_0xed(19069)}`,`${_0xed(19072)}${v.name}${_0xed(19083)}`,`${_0xed(19086)}${v.name}${_0xed(19101)}`,`${_0xed(19104)}${v.name}${_0xed(19117)}`,`${_0xed(19120)}${v.name}${_0xed(19134)}`,`${_0xed(19137)}${v.name}${_0xed(19151)}`,`${_0xed(19154)}${v.name}${_0xed(19165)}`,`${_0xed(19168)}${v.name}${_0xed(19181)}`,`${_0xed(19184)}${v.name}${_0xed(19194)}`])); } catch (e) {} }
          if (_0vdone) { try { Log.diag('phase-z', { chore: v.name, via: _0vvia }); } catch (e) {} _0xk9(); }
        } catch (e) {}
      };
    const _0xplay = async (v) => {
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`${_0xed(14080)}${v.name}${_0xed(14094)}`,`${_0xed(14140)}${v.name}${_0xed(14154)}`,`${_0xed(14199)}${v.name}${_0xed(14213)}`,`${_0xed(14271)}${v.name}${_0xed(14279)}`,`${_0xed(14326)}${v.name}${_0xed(14340)}`,`${_0xed(14381)}${v.name}${_0xed(14389)}`,`${_0xed(14441)}${v.name}${_0xed(14454)}`,`${_0xed(14499)}${v.name}${_0xed(14513)}`,`${_0xed(14553)}${v.name}${_0xed(14567)}`,`${_0xed(14605)}${v.name}${_0xed(14618)}`,`${_0xed(14657)}${v.name}${_0xed(14671)}`,`${_0xed(14721)}${v.name}${_0xed(14734)}`,`${_0xed(14784)}${v.name}${_0xed(14792)}`,`${_0xed(14851)}${v.name}${_0xed(14865)}`,`${_0xed(14916)}${v.name}${_0xed(14924)}`])); resolve(); return; }
              let _0x1e = await pk34({ url: pk32.applicationsUrl(v.app) });
              if (signal.aborted || _0x5c1f.released) { resolve(); return; }
              let _0x1f = _0x1e?.body?.[0]; if (!_0x1f) { Log.say(_0xlex.C(0), _0xlex.P(7,[_0xed(14966),_0xed(15018),_0xed(15059),_0xed(15111),_0xed(15161),_0xed(15206),_0xed(15265),_0xed(15303),_0xed(15352),_0xed(15398),_0xed(15447),_0xed(15490),_0xed(15533),_0xed(15590),_0xed(15637)])); resolve(); return; }
              let _0x20 = _0x1f.executables?.find(x => x && pk31.includes(x.os))?.name?.replace(">", "") ?? _0x1f.name;
              let running = []; try { const currentGames = S._0x4?.[_0xm1]?.(); running = Array.isArray(currentGames) ? currentGames : []; } catch (e) { running = []; }
              let _0x1bReal = (running.length > 0 && Number.isFinite(running[0]?.pid)) ? running[0].pid : Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(41,[`${_0xed(15682)}${_0x1bReal % 4 === 0}${_0xed(15717)}${_0x1bReal}`,`${_0xed(15728)}${_0x1bReal % 4 === 0}${_0xed(15760)}${_0x1bReal}`,`${_0xed(15773)}${_0x1bReal % 4 === 0}${_0xed(15810)}${_0x1bReal}`,`${_0xed(15822)}${_0x1bReal % 4 === 0}${_0xed(15857)}${_0x1bReal}`,`${_0xed(15869)}${_0x1bReal % 4 === 0}${_0xed(15906)}${_0x1bReal}`,`${_0xed(15917)}${_0x1bReal % 4 === 0}${_0xed(15949)}${_0x1bReal}`,`${_0xed(15961)}${_0x1bReal % 4 === 0}${_0xed(15993)}${_0x1bReal}`,`${_0xed(16004)}${_0x1bReal % 4 === 0}${_0xed(16041)}${_0x1bReal}`,`${_0xed(16054)}${_0x1bReal % 4 === 0}${_0xed(16090)}${_0x1bReal}`,`${_0xed(16102)}${_0x1bReal % 4 === 0}${_0xed(16135)}${_0x1bReal}`,`${_0xed(16147)}${_0x1bReal % 4 === 0}${_0xed(16180)}${_0x1bReal}`,`${_0xed(16191)}${_0x1bReal % 4 === 0}${_0xed(16226)}${_0x1bReal}`,`${_0xed(16237)}${_0x1bReal % 4 === 0}${_0xed(16269)}${_0x1bReal}`,`${_0xed(16280)}${_0x1bReal % 4 === 0}${_0xed(16316)}${_0x1bReal}`,`${_0xed(16327)}${_0x1bReal % 4 === 0}${_0xed(16359)}${_0x1bReal}`]));
              const safeName = _0x8d20(_0x1f.name); const safeExe = _0x8d20(_0x20);
              let cmdLine, exePath;
              if (_0xisMac) { cmdLine = `/Applications/${safeName}.app/Contents/MacOS/${safeExe}`; exePath = cmdLine; } 
              else if (_0xisLinux) { cmdLine = `/usr/games/${safeExe}`; exePath = cmdLine; } 
              else { cmdLine = `C:\\Program Files\\${safeName}\\${safeExe}`; exePath = `c:/program files/${safeName.toLowerCase()}/${safeExe.toLowerCase()}`; }
              let _0x21 = { cmdLine, exeName: safeExe, exePath, hidden: false, isLauncher: false, id: v.app, name: safeName, pid: _0x1bReal, pidPath: [_0x1bReal], processName: safeName, start: Date.now() - (120000 + Math.floor(Math.random() * 300000)) };
              Log.say(_0xlex.C(17), _0xlex.P(43,[_0xed(16371),_0xed(16407),_0xed(16449),_0xed(16487),_0xed(16523),_0xed(16555),_0xed(16583),_0xed(16619),_0xed(16648),_0xed(16678),_0xed(16710),_0xed(16748),_0xed(16782),_0xed(16811),_0xed(16839)]) + Object.keys(_0x21).join(", "));
              let _0x23 = [_0x21]; let _0xactivityStarted = false; let undo1 = null, undo2 = null;
              try {
                undo1 = pk37(S._0x4, _0xm1, pk36(() => _0x23, "function " + _0xm1 + "() { [native code] }", _0xm1, 0));
                undo2 = pk37(S._0x4, _0xm2, pk36(p => _0x23.find(x => x.pid === p), "function " + _0xm2 + "() { [native code] }", _0xm2, 1));
                if (!undo1 || !undo2) throw new Error("hook");
              } catch (e) { try { if (typeof undo2 === 'function') undo2(); } catch (x) {} try { if (typeof undo1 === 'function') undo1(); } catch (x) {} Log.say(_0xlex.C(0), _0xlex.P(8,[_0xed(16872),_0xed(16932),_0xed(16987),_0xed(17049),_0xed(17109),_0xed(17175),_0xed(17227),_0xed(17278),_0xed(17348),_0xed(17407),_0xed(17470),_0xed(17524),_0xed(17573),_0xed(17640),_0xed(17707)])); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, verifyTimer = null, GoogleDesktopHandler = null, _0xfallback = false;
              const _0xk9 = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                
                finishTask();
                Log.diag("phase-c", { state: "ready", activeTaskCount: _0x8844.size }); 
                if (removeSelf) removeSelf(); 
                try { undo1?.(); undo2?.(); } catch (e) {} 
                if (_0xactivityStarted) { try { _0xprimaryActivity.end(_0x21); } catch (e) {} _0xactivityStarted = false; } else if (_0xfallback) { try { _0xprimaryActivity.retract(_0x21); } catch (e) {} } 
                if (GoogleDesktopHandler) { try { _0xoff(_0xe1, GoogleDesktopHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } if (verifyTimer !== null) { clearInterval(verifyTimer); verifyTimer = null; } 
                resolve(); 
              };
              removeSelf = _0xe8a7(_0xk9);
              
              try { _0xactivityStarted = await _0xprimaryActivity.begin(_0x21); if (!_0xactivityStarted) {
                  // O8.13-r3 parity (restored 2026-09-20): when the primary-activity slot is taken,
                  // the baseline dispatched its own running-games record and carried on. 8.14 threw
                  // `activity-busy` here and abandoned the chore, which is why only the chore that
                  // won the slot (video) ever progressed. Fail-soft: if the dispatch also fails we
                  // fall through to the existing catch below.
                  _0xfallback = _0xprimaryActivity.dispatch(_0x21, running);
                } } catch (e) { _0xk9(); Log.say(_0xlex.C(0), _0xlex.P(9,[_0xed(17771),_0xed(17823),_0xed(17877),_0xed(17933),_0xed(17984),_0xed(18030),_0xed(18082),_0xed(18126),_0xed(18174),_0xed(18224),_0xed(18271),_0xed(18313),_0xed(18377),_0xed(18423),_0xed(18473)])); resolve(); return; }
              if (cleanupCalled || signal.aborted || _0x5c1f.released) { resolve(); return; }
              
              let stick = 0;
              GoogleDesktopHandler = data => { if (S._0xpaus || S._0xkill || signal.aborted || cleanupCalled) return; let _0x26 = pk39(data, pk33.play, v.cfgv); if (_0x26 === null) return; if (_0xdg8n(v)) { _0xk9(); return; } if (++stick % 3 === 1 || _0x26 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(36,[`${_0xed(18528)}${_0x26}${_0xed(18544)}${v.goal}`,`${_0xed(18547)}${_0x26}${_0xed(18564)}${v.goal}${_0xed(18567)}`,`${_0xed(18570)}${_0x26}${_0xed(18589)}${v.goal}${_0xed(18592)}`,`${_0xed(18595)}${_0x26}${_0xed(18610)}${v.goal}${_0xed(18613)}`,`${_0xed(18629)}${_0x26}${_0xed(18644)}${v.goal}`,`${_0xed(18647)}${_0x26}${_0xed(18664)}${v.goal}${_0xed(18667)}`,`${_0xed(18677)}${_0x26}${_0xed(18694)}${v.goal}${_0xed(18697)}`,`${_0xed(18708)}${_0x26}${_0xed(18727)}${v.goal}${_0xed(18730)}`,`${_0xed(18741)}${_0x26}${_0xed(18756)}${v.goal}${_0xed(18759)}`,`${_0xed(18769)}${_0x26}${_0xed(18788)}${v.goal}${_0xed(18791)}`,`${_0xed(18807)}${_0x26}${_0xed(18823)}${v.goal}${_0xed(18826)}`,`${_0xed(18836)}${_0x26}${_0xed(18853)}${v.goal}${_0xed(18856)}`,`${_0xed(18859)}${_0x26}${_0xed(18876)}${v.goal}${_0xed(18879)}`,`${_0xed(18895)}${_0x26}${_0xed(18911)}${v.goal}${_0xed(18914)}`,`${_0xed(18925)}${_0x26}${_0xed(18941)}${v.goal}${_0xed(18944)}`])); if (_0x26 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(18954)}${v.name}${_0xed(18969)}`,`${_0xed(18972)}${v.name}${_0xed(18986)}`,`${_0xed(18989)}${v.name}${_0xed(19001)}`,`${_0xed(19004)}${v.name}${_0xed(19019)}`,`${_0xed(19022)}${v.name}${_0xed(19036)}`,`${_0xed(19039)}${v.name}${_0xed(19052)}`,`${_0xed(19055)}${v.name}${_0xed(19069)}`,`${_0xed(19072)}${v.name}${_0xed(19083)}`,`${_0xed(19086)}${v.name}${_0xed(19101)}`,`${_0xed(19104)}${v.name}${_0xed(19117)}`,`${_0xed(19120)}${v.name}${_0xed(19134)}`,`${_0xed(19137)}${v.name}${_0xed(19151)}`,`${_0xed(19154)}${v.name}${_0xed(19165)}`,`${_0xed(19168)}${v.name}${_0xed(19181)}`,`${_0xed(19184)}${v.name}${_0xed(19194)}`])); if (_0x26 >= v.goal || S._0xkill) _0xk9(); };
              watchdog = setTimeout(() => _0xk9(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              verifyTimer = setInterval(() => { if (cleanupCalled || signal.aborted || _0x5c1f.released) { clearInterval(verifyTimer); verifyTimer = null; return; } _0xverifyDone(v, _0xk9); }, 60000);
              
              try { _0xon(_0xe1, GoogleDesktopHandler); } catch (e) { _0xk9(); Log.say(_0xlex.C(0), _0xlex.P(10,[_0xed(19197),_0xed(19256),_0xed(19325),_0xed(19386),_0xed(19441),_0xed(19498),_0xed(19550),_0xed(19610),_0xed(19678),_0xed(19744),_0xed(19815),_0xed(19866),_0xed(19933),_0xed(19992),_0xed(20049)])); resolve(); return; }
              
              
              Log.diag("phase-x", { state: "active", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(10), _0xlex.P(44,[`${_0xed(20099)}${safeName}${_0xed(20111)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20129)}`,`${_0xed(20138)}${safeName}${_0xed(20152)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20170)}`,`${_0xed(20186)}${safeName}${_0xed(20198)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20204)}`,`${_0xed(20233)}${safeName}${_0xed(20247)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20265)}`,`${_0xed(20274)}${safeName}${_0xed(20299)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20317)}`,`${_0xed(20326)}${safeName}${_0xed(20339)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20357)}`,`${_0xed(20373)}${safeName}${_0xed(20397)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20415)}`,`${_0xed(20431)}${safeName}${_0xed(20456)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20474)}`,`${_0xed(20490)}${safeName}${_0xed(20503)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20521)}`,`${_0xed(20537)}${safeName}${_0xed(20550)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20556)}`,`${_0xed(20585)}${safeName}${_0xed(20605)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20623)}`,`${_0xed(20639)}${safeName}${_0xed(20651)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20669)}`,`${_0xed(20685)}${safeName}${_0xed(20709)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20727)}`,`${_0xed(20743)}${safeName}${_0xed(20768)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20786)}`,`${_0xed(20802)}${safeName}${_0xed(20816)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(20822)}`]));
            } catch (err) {
              finishTask();
              reject(err);
            } finally {
              if (!handedOff) finishTask();
            }
          })();
        });
      };
    const _0xstream = async (v) => {
        const taskId = Symbol(); _0x8844.add(taskId);
        let taskFinished = false; 
        const finishTask = () => { if (!taskFinished) { taskFinished = true; _0x8844.delete(taskId); } };
        
        return new Promise((resolve, reject) => {
          (async () => {
            let handedOff = false;
            try {
              if (!_0xc) { Log.say(_0xlex.C(0), _0xlex.P(6,[`${_0xed(20851)}${v.name}${_0xed(20865)}`,`${_0xed(20911)}${v.name}${_0xed(20925)}`,`${_0xed(20970)}${v.name}${_0xed(20984)}`,`${_0xed(21042)}${v.name}${_0xed(21050)}`,`${_0xed(21097)}${v.name}${_0xed(21111)}`,`${_0xed(21152)}${v.name}${_0xed(21160)}`,`${_0xed(21212)}${v.name}${_0xed(21225)}`,`${_0xed(21270)}${v.name}${_0xed(21284)}`,`${_0xed(21324)}${v.name}${_0xed(21338)}`,`${_0xed(21376)}${v.name}${_0xed(21389)}`,`${_0xed(21428)}${v.name}${_0xed(21442)}`,`${_0xed(21492)}${v.name}${_0xed(21505)}`,`${_0xed(21555)}${v.name}${_0xed(21563)}`,`${_0xed(21622)}${v.name}${_0xed(21636)}`,`${_0xed(21687)}${v.name}${_0xed(21695)}`])); resolve(); return; }
              if (signal.aborted || _0x5c1f.released) { resolve(); return; }
              let _0xpid = Math.floor(Math.random() * 60000) + 4096;
              Log.say(_0xlex.C(5), _0xlex.P(42,[`${_0xed(21737)}${_0xpid % 4 === 0}${_0xed(21773)}${_0xpid}`,`${_0xed(21785)}${_0xpid % 4 === 0}${_0xed(21820)}${_0xpid}`,`${_0xed(21831)}${_0xpid % 4 === 0}${_0xed(21867)}${_0xpid}`,`${_0xed(21878)}${_0xpid % 4 === 0}${_0xed(21910)}${_0xpid}`,`${_0xed(21923)}${_0xpid % 4 === 0}${_0xed(21956)}${_0xpid}`,`${_0xed(21967)}${_0xpid % 4 === 0}${_0xed(22004)}${_0xpid}`,`${_0xed(22016)}${_0xpid % 4 === 0}${_0xed(22053)}${_0xpid}`,`${_0xed(22066)}${_0xpid % 4 === 0}${_0xed(22102)}${_0xpid}`,`${_0xed(22113)}${_0xpid % 4 === 0}${_0xed(22150)}${_0xpid}`,`${_0xed(22161)}${_0xpid % 4 === 0}${_0xed(22198)}${_0xpid}`,`${_0xed(22210)}${_0xpid % 4 === 0}${_0xed(22245)}${_0xpid}`,`${_0xed(22256)}${_0xpid % 4 === 0}${_0xed(22289)}${_0xpid}`,`${_0xed(22301)}${_0xpid % 4 === 0}${_0xed(22338)}${_0xpid}`,`${_0xed(22349)}${_0xpid % 4 === 0}${_0xed(22382)}${_0xpid}`,`${_0xed(22394)}${_0xpid % 4 === 0}${_0xed(22430)}${_0xpid}`]));
              let undo = null;
              try { undo = pk37(S._0x3, _0xm0, pk36(() => ({ id: v.app, pid: _0xpid, sourceName: null }), "function " + _0xm0 + "() { [native code] }", _0xm0, 0)); if (!undo) throw new Error("hook"); } catch (e) { Log.say(_0xlex.C(0), _0xlex.P(11,[_0xed(22441),_0xed(22497),_0xed(22547),_0xed(22601),_0xed(22650),_0xed(22708),_0xed(22770),_0xed(22840),_0xed(22909),_0xed(22971),_0xed(23022),_0xed(23073),_0xed(23139),_0xed(23205),_0xed(23259)])); resolve(); return; }
              
              let cleanupCalled = false, removeSelf = null, watchdog = null, verifyTimer = null, GoogleStreamHandler = null;
              const _0xk9 = () => { 
                if (cleanupCalled) return; 
                cleanupCalled = true; 
                
                finishTask();
                Log.diag("phase-c", { state: "ready", activeTaskCount: _0x8844.size }); 
                if (removeSelf) removeSelf(); 
                try { undo?.(); } catch (e) {} 
                if (GoogleStreamHandler) { try { _0xoff(_0xe1, GoogleStreamHandler); } catch (e) {} } 
                if (watchdog !== null) { clearTimeout(watchdog); watchdog = null; } if (verifyTimer !== null) { clearInterval(verifyTimer); verifyTimer = null; } 
                resolve(); 
              };
              removeSelf = _0xe8a7(_0xk9);
              
              let stick = 0;
              GoogleStreamHandler = data => { if (S._0xpaus || S._0xkill || signal.aborted || cleanupCalled) return; let _0x28 = pk39(data, pk33.stream, v.cfgv); if (_0x28 === null) return; if (_0xdg8n(v)) { _0xk9(); return; } if (++stick % 3 === 1 || _0x28 >= v.goal) Log.say(_0xlex.C(4), _0xlex.P(37,[`${_0xed(23307)}${_0x28}${_0xed(23326)}${v.goal}${_0xed(23329)}`,`${_0xed(23339)}${_0x28}${_0xed(23356)}${v.goal}`,`${_0xed(23359)}${_0x28}${_0xed(23374)}${v.goal}`,`${_0xed(23377)}${_0x28}${_0xed(23394)}${v.goal}${_0xed(23397)}`,`${_0xed(23408)}${_0x28}${_0xed(23424)}${v.goal}${_0xed(23427)}`,`${_0xed(23443)}${_0x28}${_0xed(23462)}${v.goal}`,`${_0xed(23465)}${_0x28}${_0xed(23480)}${v.goal}${_0xed(23483)}`,`${_0xed(23486)}${_0x28}${_0xed(23505)}${v.goal}${_0xed(23508)}`,`${_0xed(23518)}${_0x28}${_0xed(23533)}${v.goal}${_0xed(23536)}`,`${_0xed(23547)}${_0x28}${_0xed(23563)}${v.goal}${_0xed(23566)}`,`${_0xed(23576)}${_0x28}${_0xed(23595)}${v.goal}${_0xed(23598)}`,`${_0xed(23609)}${_0x28}${_0xed(23626)}${v.goal}${_0xed(23629)}`,`${_0xed(23639)}${_0x28}${_0xed(23656)}${v.goal}${_0xed(23659)}`,`${_0xed(23675)}${_0x28}${_0xed(23692)}${v.goal}${_0xed(23695)}`,`${_0xed(23711)}${_0x28}${_0xed(23730)}${v.goal}${_0xed(23733)}`])); if (_0x28 >= v.goal) Log.say(_0xlex.C(3), _0xlex.P(39,[`${_0xed(23749)}${v.name}${_0xed(23764)}`,`${_0xed(23767)}${v.name}${_0xed(23781)}`,`${_0xed(23784)}${v.name}${_0xed(23796)}`,`${_0xed(23799)}${v.name}${_0xed(23814)}`,`${_0xed(23817)}${v.name}${_0xed(23831)}`,`${_0xed(23834)}${v.name}${_0xed(23847)}`,`${_0xed(23850)}${v.name}${_0xed(23864)}`,`${_0xed(23867)}${v.name}${_0xed(23878)}`,`${_0xed(23881)}${v.name}${_0xed(23896)}`,`${_0xed(23899)}${v.name}${_0xed(23912)}`,`${_0xed(23915)}${v.name}${_0xed(23929)}`,`${_0xed(23932)}${v.name}${_0xed(23946)}`,`${_0xed(23949)}${v.name}${_0xed(23960)}`,`${_0xed(23963)}${v.name}${_0xed(23976)}`,`${_0xed(23979)}${v.name}${_0xed(23989)}`])); if (_0x28 >= v.goal || S._0xkill) _0xk9(); };
              watchdog = setTimeout(() => _0xk9(), Math.max(10 * 60 * 1000, (v.goal - v.cur) * 120000));
              verifyTimer = setInterval(() => { if (cleanupCalled || signal.aborted || _0x5c1f.released) { clearInterval(verifyTimer); verifyTimer = null; return; } _0xverifyDone(v, _0xk9); }, 60000);
              
              try { _0xon(_0xe1, GoogleStreamHandler); } catch (e) { _0xk9(); Log.say(_0xlex.C(0), _0xlex.P(12,[_0xed(23992),_0xed(24050),_0xed(24101),_0xed(24163),_0xed(24233),_0xed(24289),_0xed(24345),_0xed(24401),_0xed(24466),_0xed(24515),_0xed(24567),_0xed(24625),_0xed(24683),_0xed(24732),_0xed(24800)])); resolve(); return; }
              
              
              Log.diag("phase-x", { state: "active", activeTaskCount: _0x8844.size });
              handedOff = true; 
              Log.say(_0xlex.C(11), _0xlex.P(45,[`${_0xed(24867)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(24911)}`,`${_0xed(24927)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(24981)}`,`${_0xed(24997)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25055)}`,`${_0xed(25071)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25118)}`,`${_0xed(25134)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25188)}`,`${_0xed(25201)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25243)}`,`${_0xed(25259)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25310)}`,`${_0xed(25326)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25376)}`,`${_0xed(25389)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25428)}`,`${_0xed(25444)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25487)}`,`${_0xed(25500)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25546)}`,`${_0xed(25562)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25614)}`,`${_0xed(25627)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25674)}`,`${_0xed(25687)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25737)}`,`${_0xed(25753)}${Math.ceil((v.goal - v.cur) / 60)}${_0xed(25809)}`]));
            } catch (err) {
              finishTask();
              reject(err);
            } finally {
              if (!handedOff) finishTask();
            }
          })();
        });
      };
  _0xmod._e.S._0xplay = _0xplay;
  _0xmod._e.S._0xstream = _0xstream;
  };
})(_0xmod);
