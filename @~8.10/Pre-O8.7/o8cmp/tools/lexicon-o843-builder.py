# -*- coding: utf-8 -*-
# lexicon-o843-builder.py — builds the O.8.4.3 phrase-pool region: every phrase key gets
# exactly 15 variants (uniform with the 15-word term pools), composed from curated
# synonym slots, deterministic (random.Random(key) sample). Writes phrase region text
# to /tmp/o843-phrase-region.txt for splicing into lexicon-o843.py.
import random, json
import re
_LEX842 = open('lexicon-o842.py', encoding='utf-8').read()
_842S = _LEX842.index('# Crumb/Puddle family messages'); _842E = _LEX842.index('# apply phrase pools')
_842NS = {}; _842P = {}; _842NS['P_'] = lambda key, *vs: _842P.__setitem__(key, list(vs))
exec(_LEX842[_842S:_842E], _842NS)
_842_SRC = open('/tmp/o842-lex.js', encoding='utf-8').read()
SHIPPED842 = {}
for _k, _items in _842P.items():
    _occ = []
    for _t in _items:
        for _m in re.finditer(re.escape(_t), _842_SRC):
            _occ.append(_t[1:-1])
    SHIPPED842[_k] = set(_occ)
OLD_ALIASES = ['Crumb', 'Bindle', 'Docket', 'Garland', 'Sundial', 'Mosaic', 'Chime', 'Veranda',
               'Signpost', 'Wreath', 'Scraps', 'Marquee', 'Storybook', 'Greenhouse', 'Cubby',
               'Whistle', 'Chronometer', 'Flatware', 'Drapes', 'Fairground']

# Each key: first-clause synonyms x second-clause synonyms (meaning-preserving in every
# combination). Keys marked 'single' use a plain 15-item list (no slots).
D = {}

def S(key, firsts, seconds, join=' — '):
    D[key] = ('slots', firsts, seconds, join)

def L(key, items):
    D[key] = ('list', items, None, None)

# ---------------- failure / fatal family ----------------
S('mod-door',
  ['The module doorway is unavailable', 'The module doorway is not there',
   'The module doorway refused to open', 'The module doorway is missing',
   'The module doorway could not be found', 'The module entrance did not respond'],
  ['heading home.', 'clocking out.', 'calling it a day.', 'ending the run here.',
   'stopping before anything starts.', 'not starting this shift.'])
S('mod-noruntime',
  ['The module doorway returned no usable runtime', 'The module doorway came back with no runtime',
   'The module doorway gave back an empty runtime', 'The module doorway provided nothing runnable',
   'The module doorway handed back nothing usable'],
  ['heading home.', 'clocking out.', 'calling it a day.', 'ending the run here.',
   'stopping before anything starts.'])
S('iface-invalid',
  ['Pocket interfaces invalid', 'The pocket interfaces are invalid',
   'Pocket bindings came back invalid', 'The pocket interface layer is invalid',
   'Pocket surfaces are unusable'],
  ['heading home.', 'clocking out.', 'ending the run here.', 'stopping before anything starts.',
   'not starting this shift.'])
S('key-401',
  ['Key stopped fitting', 'The key no longer fits', 'Session key turned stale',
   'The key came back rejected', 'Auth stopped holding', 'Our key stopped unlocking'],
  ['packing up.', 'folding up shop.', 'ending the run.', 'calling it here.',
   'stopping cleanly.', 'wrapping the gear.'])
S('hook-immutable',
  ['Target ${key} is immutable', 'Target ${key} is sealed', 'Target ${key} is frozen',
   'Target ${key} is read-only', 'Target ${key} rejects hooks'],
  ['hook failed.', 'skipping the hook.', 'cannot be hooked.', 'no hook was installed.',
   'leaving it untouched.'])
L('hook-fail',
  ['Hook installation failed for ${key}', 'Hook install failed on ${key}',
   'Could not mount the hook on ${key}', 'The hook for ${key} did not install',
   'Setting up the hook on ${key} threw', 'Hook wiring error on ${key}',
   'The hook could not be attached to ${key}', 'Attaching hooks to ${key} failed',
   'Hook setup for ${key} failed', 'Installing the hook on ${key} errored',
   'The ${key} hook refused to install', 'Could not wire ${key}',
   'Hook attempt on ${key} failed', 'Mounting a hook on ${key} failed',
   'Patching ${key} failed'])
S('big-workshop',
  ['That chore (${v.name}) needs the big workshop', 'That chore (${v.name}) needs the main hall',
   'That chore (${v.name}) needs a bigger rig', 'This task (${v.name}) needs the full workshop',
   'Chore ${v.name} needs the heavy bench'],
  ['skipping.', 'skipping it for now.', 'leaving it for a bigger session.',
   'not taking it this shift.', 'moving past it.'])
S('blank-note',
  ['Chore note came back blank', 'The chore note was blank',
   'The note for the chore came back empty', 'The chore returned a blank note',
   'Note for the chore was empty'],
  ['skipping.', 'skipping this one.', 'moving on.', 'leaving it be.', 'not starting it.'])
S('desk-door',
  ['The desktop doorway could not be prepared', 'The desktop doorway would not open',
   'The desktop doorway refused to be set up', 'The desktop route could not be armed',
   'The desktop doorway failed to come up', 'The desktop entry could not be opened'],
  ['skipping.', 'skipping this one.', 'moving on.', 'not taking it this shift.',
   'leaving it for later.'])
S('desk-dispatch',
  ['Initial state dispatch failed', 'Sending the initial state failed',
   'The initial dispatch went wrong', 'First state push failed',
   'The initial state could not be dispatched'],
  ['skipping.', 'moving on.', 'skipping this one.', 'leaving it be.', 'not starting it.'])
S('desk-sub',
  ['Desktop progress subscription failed', 'Subscribing to desktop progress failed',
   'The desktop progress feed would not subscribe', 'Desktop progress updates could not be subscribed',
   'The desktop feed subscription failed'],
  ['skipping.', 'moving on.', 'skipping this one.', 'leaving it be.', 'not starting it.'])
S('stream-door',
  ['The stream doorway could not be prepared', 'The stream doorway would not open',
   'The stream doorway refused to be set up', 'The stream route could not be armed',
   'The stream doorway failed to come up', 'The stream entry could not be opened'],
  ['skipping.', 'skipping this one.', 'moving on.', 'not taking it this shift.',
   'leaving it for later.'])
S('stream-sub',
  ['Stream progress subscription failed', 'Subscribing to stream progress failed',
   'The stream progress feed would not subscribe', 'Stream progress updates could not be subscribed',
   'The stream feed subscription failed'],
  ['skipping.', 'moving on.', 'skipping this one.', 'leaving it be.', 'not starting it.'])
S('no-arcade-door',
  ['No doorway found for the arcade cabinet', 'No doorway found for the cabinet',
   'The arcade cabinet had no doorway', 'No arcade doorway could be found',
   "The cabinet's doorway was not found"],
  ['skipping.', 'skipping this one.', 'moving on.', 'leaving it for later.',
   'not taking it this shift.'])
S('activity-stall',
  ['Activity ${v.name} stopped after no confirmed progress',
   'Activity ${v.name} stalled with no confirmed progress',
   'Activity ${v.name} went quiet without progress',
   'Activity ${v.name} ended without confirmed progress',
   'Activity ${v.name} produced no progress before stopping'],
  ['assuming it stalled.', 'marking it down as stalled.', 'counting it as stalled.',
   'treating it as a stall.', 'flagging no progress.'])
S('blank-list',
  ['Chore list was blank', 'The chore list came back blank', 'The list of chores was empty',
   'Chore list came back empty', 'No chores were on the list'],
  ['skipping this one.', 'skipping the round.', 'moving on.', 'nothing to do this pass.',
   'leaving it for next time.'])
S('bad-target',
  ['Chore target was invalid', 'The chore target was malformed', 'Chore target came back unusable',
   'The target for the chore was bad', 'Chore target did not parse'],
  ['skipping this one.', 'skipping it.', 'moving on.', 'leaving it be.', 'not starting it.'])
S('no-appid',
  ['Chore had no application identifier', 'The chore lacked an application id',
   'Chore had no app identifier', 'No application id on the chore',
   'Chore came without an application id'],
  ['skipping.', 'skipping this one.', 'moving on.', 'leaving it be.', 'not starting it.'])

# ---------------- runtime error carriers ----------------
E_ERR = '${err?.message ?? err}'
L('toe-moveon',
  ['Snagged a nail on one chore', 'Fumbled one chore', 'Caught an edge on one chore',
   'Hit a snag on one chore', 'Dropped one chore', 'A chore threw an error',
   'One chore slipped', 'One chore came back sideways', 'One chore kicked back',
   'One chore went sideways', 'Ran into trouble on one chore', 'One chore misbehaved',
   'One chore fell over', 'One chore threw a fit', 'Rough patch on one chore'])
L('toe-top',
  ['Snagged a nail', 'Fumbled a step', 'Caught an edge', 'Hit a snag', 'Dropped the tray',
   'Ran into trouble', 'Went sideways', 'Slipped up top', 'Kicked back an error',
   'Threw an error at the top', 'Hit a wall up top', 'Broke stride', 'Fouled a step',
   'Caught a snag', 'Ran aground'])
L('shelf-setup',
  ['Knocked the shelf over setting up', 'Knocked the shelf over while setting up',
   'Spilled the board during setup', 'Dropped everything while setting up',
   'Broke a shelf during setup', 'Mangled the setup step', 'Knocked the setup over',
   'Botched the setup step', 'Fumbled the setup', 'Tripped during setup',
   'Upended the board during setup', 'Shelf setup fell apart', 'Setup crashed',
   'Setting up went sideways', 'Setup threw'])

# ---------------- ledger family ----------------
E_L = '${_0xb.length} chore${_0xb.length === 1 ? "" : "s"}'
L('pinned',
  [E_L + ' pinned to the board.', E_L + ' pinned to the board for tonight.',
   E_L + ' pinned to the board for this shift.', E_L + ' up and pinned to the board.',
   E_L + ' on the docket today.', E_L + ' on the docket today, ready to go.',
   E_L + ' on the docket today and counting.', E_L + ' queued up.',
   E_L + ' queued up for the shift.', E_L + ' queued up and ready.',
   E_L + ' queued up for tonight.', E_L + ' queued up; board pinned.',
   E_L + ' pinned to the board and queued up.', E_L + ' queued up and pinned to the board.',
   E_L + ' on the docket today, queued up.'])
E_L2 = '${_0xlost}'
S('leftoff',
  [E_L2 + ' left off', E_L2 + ' set aside'],
  [" — shape we can't fold.", " — shape we can't fold today.",
   " — shape we can't fold this pass.", " — shape we can't work with.",
   " — shape we can't fold into the run.", " — shape we can't take on.",
   " — shape we can't fold this shift.", " — shape we can't fold this time."])
E_L3 = '${_0new} more chore${_0new === 1 ? "" : "s"}'
L('joined',
  [E_L3 + ' joined the board.', E_L3 + ' joined the board late.',
   E_L3 + ' joined the board after start.', E_L3 + ' came in after the bell.',
   E_L3 + ' came in after the bell and joined up.',
   E_L3 + ' came in after the bell was rung.', E_L3 + ' joined the board mid-shift.',
   E_L3 + ' joined the board before the end.', E_L3 + ' joined the board while we worked.',
   E_L3 + ' came in after the bell; joining the board.', E_L3 + ' joined the board, refilled.',
   E_L3 + ' came in after the bell, refilled.', E_L3 + ' joined the board and counted.',
   E_L3 + ' came in after the bell to help.', E_L3 + ' joined the board for the next pass.'])

# ---------------- empty / wrap-up ----------------
HINT = '(Press Alt+Shift+R to flush and restart)'
S('orchard-none',
  ['Nothing ripe on the trees today', 'Nothing on the vines today', 'Nothing ripe yet',
   'Nothing ripe on the trees today, not yet', 'Nothing on the vines today, not yet'],
  [' ' + HINT, ' — press Alt+Shift+R to flush and restart.',
   ' ' + HINT + ' when ready.', ' — flush with Alt+Shift+R and restart.',
   ' ' + HINT + ' later.'])
S('wrapping',
  ['Wrapping up after this chore', 'Winding down after this chore',
   'Closing out after this chore', 'Packing up after this chore',
   'Ending the shift after this chore'],
  ['stopping at the checkpoint.', 'stopping at the next checkpoint.',
   'checking out at the boundary.', 'pausing at the checkpoint.',
   'cutting out after the checkpoint.'])
E_LC = '${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}'
S('lastcall',
  ['Last call — shift ended early', 'Last call — shift cut short',
   'Last call — run ended early', 'Last call — stopping early',
   'Last call — the shift stopped early'],
  [' (' + E_LC + ').', ' — (' + E_LC + ') logged.', ' with ' + E_LC + '.',
   ' (' + E_LC + ') in hand.', ' — ' + E_LC + ' recorded.'])

# ---------------- reload-chord family (must keep "press Alt+Shift+R") ----------------
S('shake-rug',
  ['Shaking out the rug', 'Shaking out the mat', 'Giving the rug a shake',
   'Rolling up the rug', 'Shaking things out'],
  ['see you on the other side.', 'see you after the refresh.', 'back in a moment.',
   'catch you on the reload.', 'see you on the flip side.'])
S('armed-all',
  ['All polished', "Everything's polished", 'All polished up',
   "Everything's polished, all of it", 'All polished, done for now'],
  [' — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so.',
   ' — press Alt+Shift+R to shake out the rug (refresh) when ready; nothing runs until then.',
   ' — press Alt+Shift+R to flush and restart (refresh) whenever; the run stays parked.',
   ' — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.',
   ' — press Alt+Shift+R when you are done; the run sits idle until you do.'])
S('armed-half',
  ["Rug's half-shaken", "Mat's half-shaken", 'Half the run is done',
   'The rug is half-shaken', 'Halfway through the shake'],
  [" — press Alt+Shift+R to finish the job (refresh) whenever you're ready.",
   ' — press Alt+Shift+R (refresh) to finish when you like.',
   ' — hit Alt+Shift+R to finish the job (refresh).',
   ' — press Alt+Shift+R to wrap it up (refresh) any time.',
   ' — press Alt+Shift+R to finish the shake (refresh) when ready.'])

# ---------------- server paths ----------------
E_TH = '${Math.ceil(s)}'
S('throttle',
  ['Knock came back throttled', 'The knock got throttled', 'Request came back throttled',
   'The call was throttled', 'Our knock was throttled'],
  [' — knocking again in ~' + E_TH + 's.', ' — retrying in ~' + E_TH + 's.',
   ' — trying again in ~' + E_TH + 's.', ' — next attempt in ~' + E_TH + 's.',
   ' — backing off ~' + E_TH + 's, then knocking again.'])
S('server-err',
  ['Server error ${st}', 'Server fault ${st}', 'Server error ${st} on that knock',
   'Server fault ${st} on that knock', 'Server error ${st} there', 'Server fault ${st} there'],
  [' — backing off for ${backoff.toFixed(1)}s.', ' — cooling off for ${backoff.toFixed(1)}s.',
   ' — backing off ${backoff.toFixed(1)}s.', ' — pausing for ${backoff.toFixed(1)}s.',
   ' — resting ${backoff.toFixed(1)}s before retry.'])

# ---------------- flavor / progress ----------------
L('story-open',
  ['Opening the picture book for ${v.name}.', 'Opening the reading book for ${v.name}.',
   'Turning to ${v.name} in the book.', 'Starting ${v.name} from the shelf.',
   'Opening ${v.name} in the reader.', 'Taking down ${v.name} from the shelf.',
   "Getting ${v.name} going.", "Opening ${v.name}'s chapter.",
   'Picking up the book at ${v.name}.', 'Starting up ${v.name}.',
   'Settling in with ${v.name}.', 'Pulling ${v.name} off the shelf.',
   "Flipping to ${v.name}.", 'Launching ${v.name} from the shelf.',
   'Bringing out ${v.name} from the stack.'])
L('kettle',
  ["Kettle's on — brief steep.", "Pot's on — quick steep.",
   "Water's heating — brief steep.", "Steep's on — brief pause.",
   'Kettle singing — quick pause.', "Teapot's on — quick steep.",
   'Brief steep while the pot goes.', "Kettle's up — short pause.",
   "Pot's singing — brief pause.", "Quick steep — kettle's on.",
   "Kettle's coming to the boil — short wait.", 'Kettle on — stepping away briefly.',
   'Steeping briefly — kettle is up.', "Pot's on the boil — brief pause.",
   "Kettle's on — just a steep."])
E_SAND = '${Number.isInteger(ts)}'
S('sand',
  ['Sands landing whole', 'Grains landing whole', 'Tock landing whole',
   'Pebbles landing whole', 'Seconds landing whole'],
  [': ' + E_SAND + ' — sand #${ts}', ': ' + E_SAND + ' — grain #${ts}',
   ': ' + E_SAND + ' — tock #${ts}', ': ' + E_SAND + ' — pebble #${ts}',
   ': ' + E_SAND + ' — tick #${ts}'], '')
FRAC_LEADS = ['Random fraction: ', 'Running tally: ', 'Progress line: ',
               'Current beat: ', 'Now reading: ']
def frac(key, expr):
    S(key, FRAC_LEADS, [expr, expr + '.', expr + ' so far.', expr + ' logged.',
                        expr + ' in the books.', expr + ' to date.'], '')
frac('frac-video', '${v.cur.toFixed(2)}/${v.goal}')
frac('frac-i26', '${_0x26}/${v.goal}')
frac('frac-i28', '${_0x28}/${v.goal}')
frac('frac-act', '${v.cur}/${v.goal}')

L('polished',
  ['Finished: ${v.name}.', 'Completed: ${v.name}.', 'Checked off: ${v.name}.',
   'Cleared: ${v.name}.', 'Knocked out: ${v.name}.', 'Wrapped up: ${v.name}.',
   'Sealed: ${v.name}.', 'Delivered: ${v.name}.', 'Concluded: ${v.name}.',
   'Boxed up: ${v.name}.', 'Settled: ${v.name}.', 'Handed off: ${v.name}.',
   'Put to bed: ${v.name}.', 'Cashed out: ${v.name}.', 'Closed out: ${v.name}.'])
E_SD = '${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}'
S('shelf-done',
  ['Shelf polished', 'Shelf gleaming', 'Shelf polished completely',
   'Shelf gleaming completely', 'Shelf polished, all of it', 'Shelf fully cleared'],
  [' — nothing left (' + E_SD + '). ' + HINT,
   ' — nothing left (' + E_SD + '). Press Alt+Shift+R to flush and restart.',
   ' — nothing left (' + E_SD + ') recorded. ' + HINT,
   ' — nothing remains (' + E_SD + '). ' + HINT,
   ' — done and clear (' + E_SD + '). ' + HINT,
   ' — clear board (' + E_SD + '). Press Alt+Shift+R to flush and restart.'])

def tiles(key, expr, ident):
    S(key,
      ['Floor patterns line up in fours', 'Floor tiles line up in fours',
       'The floor grid lines up in fours', 'The tiled floor lines up in fours',
       'Floor checks line up in fours'],
      [': ' + expr + ' — tile #' + ident, ': ' + expr + ' — block #' + ident,
       ': ' + expr + ' — stone #' + ident, ': ' + expr + ' — slab #' + ident,
       ': ' + expr + ' — square #' + ident, ': ' + expr + ' — pane #' + ident], '')
tiles('tile-real', '${_0x1bReal % 4 === 0}', '${_0x1bReal}')
tiles('tile-pid', '${_0xpid % 4 === 0}', '${_0xpid}')

L('drawer',
  ['The drawer was reshuffled: ', 'The drawer got re-sorted: ',
   'The flatware drawer was reshuffled: ', 'Drawer contents were reordered: ',
   'The cutlery drawer was re-sorted: ', 'Drawer order was redrawn: ',
   'The drawer was mixed up again: ', 'Silverware in the drawer was reordered: ',
   'The drawer layout changed: ', 'Drawer slots were reshuffled: ',
   'The drawer was given a new order: ', 'Drawer items were rearranged: ',
   'The drawer contents were re-sorted: ', 'Drawer arrangement was refreshed: ',
   'The drawer got a reshuffle: '])
E_D = '${Math.ceil((v.goal - v.cur) / 60)}'
S('tidbits',
  ['Mulling over notes for ${safeName}', 'Checking on ${safeName}',
   'Watching the oven for ${safeName}', 'Peeking at ${safeName}',
   'Keeping an eye on ${safeName}', 'Notes for ${safeName}'],
  [' — dough needs ~' + E_D + ' more minutes.', ' — ~' + E_D + ' minutes left on the dough.',
   " — dough's got ~" + E_D + ' to go.', ' — bread needs ~' + E_D + ' more minutes.'])
S('stage',
  ['Backstage lights on', "Curtain's up", 'Lights are on backstage',
   'The stage is set', "Show's about to start"],
  [' — keep a window live in vc for ~' + E_D + ' more minutes.',
   ' — keep a window open in vc ~' + E_D + ' more minutes.',
   ' — keep vc live for ~' + E_D + ' more minutes.',
   ' — keep a window live in vc ~' + E_D + ' min to go.'])
S('coins',
  ['Feeding coins to the cabinet', 'Dropping coins in the cabinet',
   'Feeding the cabinet coins', 'Coins into the cabinet', 'Running the cabinet'],
  [' (~' + E_D + ' min).', ' — ~' + E_D + ' min left.', ' (~' + E_D + ' more min).',
   ' — about ' + E_D + ' min to go.'])

L('memo',
  ['Note slid under the door — shift started.', 'Memo slipped under the door — shift started.',
   'A note went under the door — running.', 'Shift started — note under the door.',
   'Door note dropped — shift is on.', 'Under the door: note in — shift started.',
   "Memo under the door — shift's going.", "Note's under the door — shift underway.",
   'Shift started (note under the door).', 'Dropped the memo — shift started.',
   'The note is in — shift started.', 'Note through the slot — shift started.',
   'Shift started — memo delivered.', 'Under the door it went — shift started.',
   'Started the shift (memo under door).'])
S('trail-moved',
  ['Trail marker moved', 'Trail marker shifted', 'Moved off the main trail',
   'Stepped off the trail', 'Paused on the trail'],
  [' — holding position.', ' — holding still.', ' — staying put.', ' — parked here.',
   ' — holding for now.'])
S('trail-back',
  ['Back on the trail', 'Back on the main trail', 'On the trail again', 'Back to the trail',
   'Returned to the trail'],
  [' — resuming.', ' — picking up again.', ' — moving again.', ' — resuming the run.',
   ' — on the move again.'])
S('drawn',
  ['Curtains drawn', 'Shades drawn', 'Blinds drawn', 'Panels drawn', 'Coverings drawn'],
  [' — taking the long hallway.', ' — going the slow way.', ' — taking the long road.',
   ' — easing off for now.', ' — keeping quiet for a bit.'])
S('open',
  ['Curtains open', 'Shades open', 'Blinds open', 'Panels open', 'Coverings open'],
  [' — back on the main road.', ' — back at full speed.', ' — resuming at pace.',
   ' — back to normal.', ' — back on it.'])
S('gate-missing',
  ['A pocket came up empty', 'The pockets came up empty', 'Pockets checked out empty',
   'A pocket was missing', 'The pocket check failed', "Pockets didn't check out"],
  [' — heading home.', ' — clocking out.', ' — ending the run.', ' — stopping here.',
   ' — shutting down.', ' — calling it a day.'])

# ---------------- compose & validate ----------------
ORDER = ['mod-door', 'mod-noruntime', 'iface-invalid', 'key-401', 'hook-immutable', 'hook-fail',
         'big-workshop', 'blank-note', 'desk-door', 'desk-dispatch', 'desk-sub', 'stream-door',
         'stream-sub', 'no-arcade-door', 'activity-stall', 'blank-list', 'bad-target', 'no-appid',
         'toe-moveon', 'toe-top', 'shelf-setup', 'pinned', 'leftoff', 'joined', 'orchard-none',
         'wrapping', 'lastcall', 'shake-rug', 'armed-all', 'armed-half', 'throttle', 'server-err',
         'story-open', 'kettle', 'sand', 'frac-video', 'frac-i26', 'frac-i28', 'frac-act',
         'polished', 'shelf-done', 'tile-real', 'tile-pid', 'drawer', 'tidbits', 'stage', 'coins',
         'memo', 'trail-moved', 'trail-back', 'drawn', 'open', 'gate-missing']
assert set(ORDER) == set(D), (set(ORDER) ^ set(D))

SUFFIX = {
    'hook-fail': ' ${e.message}',
    'toe-moveon': ': ${err?.message ?? err}',
    'toe-top': ': ${err?.message ?? err}',
    'shelf-setup': ': ${err?.message ?? err}',
}
LIST_EXTRA = {
    'polished': 'Rounded out: ${v.name}.',
    'kettle': "A quick steep — then back to it.",
    'memo': 'The memo went under the door — shift started.',
    'story-open': 'Opening the book to ${v.name}.',
    'pinned': E_L + ' on the docket today for the run.',
    'joined': E_L3 + ' came in after the bell to join the board.',
    'shelf-setup': 'Knocked the shelf over mid-setup',
    'hook-fail': 'Hook mounting for ${key} errored',
}
out = {}
for key in ORDER:
    kind, a, b, join = D[key]
    banned = SHIPPED842.get(key, set())
    if kind == 'list':
        if key in SUFFIX:
            items = [x for x in a if (x + SUFFIX[key]) not in banned]
        else:
            items = [x for x in a if x not in banned]
        extras = LIST_EXTRA.get(key, [])
        if not isinstance(extras, list):
            extras = [extras]
        chosen = []
        rnd2 = random.Random(key + '|o843-2')
        for ex in extras:
            if len(chosen) < 15:
                chosen.append(ex)
        rest = [x for x in items if x not in chosen]
        chosen += rnd2.sample(rest, 15 - len(chosen))
        items = chosen
        assert len(items) == 15 and len(set(items)) == 15, (key, len(items))
    else:
        firsts, seconds = a, b
        assert len(set(firsts)) == len(firsts) and len(set(seconds)) == len(seconds), key
        if join == ' — ':
            seconds = [re.sub(r'^\s*—\s*', '', s2).strip() for s2 in seconds]
        combos = [f + join + s for f in firsts for s in seconds]
        if key in SUFFIX:
            combos = [c for c in combos if (c + SUFFIX[key]) not in banned]
        else:
            combos = [c for c in combos if c not in banned]
        assert len(combos) >= 15, (key, len(combos))
        rnd = random.Random(key + '|o843')
        items = rnd.sample(combos, 15)
    if key in SUFFIX:
        items = [i + SUFFIX[key] for i in items]
    out[key] = items

# extra guards: no old alias words at token boundaries
for key, items in out.items():
    for it in items:
        for oa in OLD_ALIASES:
            assert not re.search(r'(?<![A-Za-z0-9_$])' + re.escape(oa) + r'(?![A-Za-z0-9_$])', it), (key, oa, it)

json.dump(out, open('/tmp/o843-phrases.json', 'w'))

# emit region text
lines = ['# phrase pools — generated by lexicon-o843-builder.py (do not hand-edit below; edit the builder)']
for key in ORDER:
    lines.append("P_('%s'," % key)
    for v in out[key]:
        q = '"' if ('\n' not in v and "'" not in v) else ("'" if '"' not in v and '\n' not in v else '`')
        if q == '"':
            lines.append(' "%s",' % v.replace('"', '\\"'))
        elif q == "'":
            lines.append(" '%s'," % v.replace("'", "\\'"))
        else:
            lines.append(' `%s`, ' % v)
    lines[-1] = lines[-1].rstrip(',') + ')'
    lines.append('')
open('/tmp/o843-phrase-region.txt', 'w', encoding='utf-8').write('\n'.join(lines))
print('region emitted:', sum(len(out[k]) for k in ORDER), 'variants across', len(ORDER), 'keys')
for k in ('polished', 'pinned', 'leftoff', 'orchard-none', 'armed-all', 'gate-missing', 'frac-video'):
    print('---', k)
    for v in out[k]:
        print('   ', v[:100])
