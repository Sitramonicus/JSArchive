# -*- coding: utf-8 -*-
# lexicon-o842.py — O.8.4.2 build patch. Reads /tmp/o842-unrot.js, writes /tmp/o842-base.js.
import re

src = open('/tmp/o842-unrot.js', encoding='utf-8').read()

# ---------------------------------------------------------------------------
# 1) CODENAME ALIAS POOLS (static; ~15 per semantic term; exclude the O.8.4.1 aliases)
# ---------------------------------------------------------------------------
POOLS = {
 'Puddle': ['Mishap','Grumble','Snag','Wrinkle','Falter','Kink','Stumble','Blunder','Tangle','Hiccup','Glitch','Mischance','Sputter','Tripup','Bungle'],
 'Satchel': ['Kitbag','Haversack','Rucksack','Carryall','Duffle','Valise','Portmanteau','Knapsack','Holdall','Saddlebag','Mailbag','Wallet','Case','Grip','Pannier'],
 'Ledger': ['Tally','Roster','Register','Manifest','Roll','Census','Logbook','Agenda','Index','Catalog','Inventory','Chart','Draft','Slate','Muster'],
 'Trophy': ['Medal','Laurel','Plaque','Cup','Honor','Badge','Star','Ribbon','Seal','Crown','Crest','Torch','Spire','Flag','Banner'],
 'Abacus': ['Meter','Gauge','Dial','Scale','Balance','Divider','Sextant','Astrolabe','Quadrant','Rule','Mark','Stroke','Tick','Beat','Pulse'],
 'Tiles': ['Pavement','Parquet','Plaza','Patio','Cobble','Flagstone','Terrace','Walkway','Courtyard','Grid','Foyer','Corridor','Stoop','Passage','Promenade'],
 'Taps': ['Bell','Gong','Knocker','Ring','Rattle','Clapper','Carillon','Tocsin','Signal','Alarum','Hooter','Beacon','Siren','Klaxon','Alarm'],
 'Porch': ['Vestibule','Landing','Entry','Threshold','Portal','Gateway','Portico','Loggia','Sill','Reception','Entrance','Doorstep','Welcome','Gate','Lobby'],
 'Map': ['Compass','Atlas','Waypoint','Landmark','Guidepost','Milestone','Crossroad','Fork','Route','Path','Heading','Latitude','Longitude','Bearing','Trek'],
 'Doormat': ['Welcome','Mat','Hearth','Sill','Entryway','Gatehouse','Carpet','Runner','Tread','Lintel','Doorway','Sweep','Broom','Hall','Doorplate'],
 'Tidbits': ['Morsels','Fragments','Snippets','Drops','Curios','Trivia','Leftovers','Jottings','Gleanings','Outtakes','Bits','Zest','Dash','Smidgen','Notes'],
 'Stage': ['Platform','Boards','Soapbox','Podium','Dais','Rostrum','Forum','Soundstage','Theater','Auditorium','Footlights','Spotlight','Limelight','Playbill','Backdrop'],
 'Picturebook': ['Novel','Folio','Reader','Comic','Almanac','Tome','Zine','Journal','Magazine','Pamphlet','Chapter','Fable','Tale','Ballad','Anthology'],
 'Orchard': ['Grove','Arboretum','Vineyard','Meadow','Plot','Nursery','Hothouse','Conservatory','Patch','Grange','Farm','Bower','Orangerie','Allotment','Garden'],
 'Mailroom': ['Postroom','Depot','Hub','Slot','Mailbox','Letterbox','Inbox','Outbox','Station','Terminal','Exchange','Relay','Courier','Dispatch','Desk'],
 'Kettle': ['Stove','Boiler','Samovar','Teapot','Steamer','Cauldron','Hob','Griddle','Skillet','Burner','Copper','Chimney','Funnel','Valve','Brewer'],
 'Hourglass': ['Metronome','Pendulum','Timer','Stopwatch','Tempo','Cadence','Moment','Instant','Second','Minute','Tock','Sandglass','Clepsydra','Gnomon','Dial'],
 'Cutlery': ['Utensils','Silverware','Tableware','Crockery','Tray','Drawer','Dresser','Bureau','Caddy','Holder','Bin','Rack','Organizer','Tidier','Larder'],
 'Blinds': ['Shade','Shutter','Louver','Venetian','Roller','Valance','Swag','Cornice','Awning','Canopy','Curtain','Sash','Pane','Screen','Lattice'],
 'Arcade': ['Midway','Carnival','Boardwalk','Funhouse','Carousel','Bazaar','Pier','Esplanade','Expo','Festival','Jamboree','Gala','Fete','Kiosk','Pavilion'],
}
# 15 per pool assert
for k, v in POOLS.items():
    assert len(v) == 15 and len(set(v)) == 15, k

# current (O.8.4.1) alias -> semantic term
CUR = {'Crumb':'Puddle','Bindle':'Satchel','Docket':'Ledger','Garland':'Trophy','Sundial':'Abacus',
 'Mosaic':'Tiles','Chime':'Taps','Veranda':'Porch','Signpost':'Map','Wreath':'Doormat',
 'Scraps':'Tidbits','Marquee':'Stage','Storybook':'Picturebook','Greenhouse':'Orchard',
 'Cubby':'Mailroom','Whistle':'Kettle','Chronometer':'Hourglass','Flatware':'Cutlery',
 'Drapes':'Blinds','Fairground':'Arcade'}

# collision guard: none of the new alias words may already exist in the file
bad = []
for term, pool in POOLS.items():
    for w in pool:
        if re.search(r'(?<![A-Za-z0-9_$])' + re.escape(w) + r'(?![A-Za-z0-9_$])', src):
            bad.append(w)
if bad:
    raise SystemExit('COLLISIONS: ' + repr(bad))

# reassign codenames: occurrence order, pool[(k*7) % 15]
for term in list(dict.fromkeys(CUR.values())):
    cur = next(a for a,t in CUR.items() if t == term)
    pat = re.compile(r'"' + re.escape(cur) + r'"')
    occ = list(pat.finditer(src))
    # walk backwards to keep indices stable
    for k in range(len(occ) - 1, -1, -1):
        alias = POOLS[term][(k * 7) % 15]
        src = src[:occ[k].start()] + '"' + alias + '"' + src[occ[k].end():]
    print(f'{term:12s} {cur:12s} -> {len(occ):3d} sites distributed over {len(set((k*7)%15 for k in range(len(occ))))} aliases')

# ---------------------------------------------------------------------------
# 2) PHRASE POOLS (static; site shape preserved; occurrences cycle)
# ---------------------------------------------------------------------------
P = {}

def P_(key, *variants):
    P[key] = list(variants)

# Crumb/Puddle family messages
P_('mod-door', 
 '"The module doorway is unavailable — clocking out."',
 '"No module doorway here — calling it a day."')
P_('mod-noruntime',
 '"The module doorway returned no usable runtime — clocking out."')
P_('gate-missing',   # SATCHEL gate tell
 '"Missing pockets — heading home."',
 '"A pocket came up empty — heading home."',
 '"Satchel\'s not full — heading home."')  # one nostalgic variant
P_('iface-invalid',
 '"Pocket interfaces invalid — clocking out."')
P_('key-401',
 '"Key stopped fitting — folding up shop."')
P_('hook-immutable',
 '`Target ${key} is sealed — hook failed.`',
 '`Target ${key} cannot be hooked.`')
P_('hook-fail',
 '`Hook install failed on ${key}: ${e.message}`')
P_('big-workshop',
 '`That chore (${v.name}) needs the main hall — skipping.`',
 '`That chore (${v.name}) needs a bigger rig — skipping.`')
P_('blank-note',
 '"Chore note came back empty — skipping."')
P_('desk-door',
 '"The desktop doorway would not open — skipping."')
P_('desk-dispatch',
 '"Initial state dispatch failed — moving on."')
P_('desk-sub',
 '"Desktop progress subscription failed — moving on."')
P_('stream-door',
 '"The stream doorway would not open — skipping."')
P_('stream-sub',
 '"Stream progress subscription failed — moving on."')
P_('no-arcade-door',
 '"No doorway found for the cabinet — skipping."')
P_('activity-stall',
 '`Activity ${v.name} stalled with no confirmed progress.`')
P_('blank-list',
 '"Chore list came back blank — skipping this one."')
P_('bad-target',
 '"Chore target was malformed — skipping this one."')
P_('no-appid',
 '"Chore had no app identifier — skipping."')
P_('toe-moveon',
 '`Tripped over one chore (moving on): ${err?.message ?? err}`',
 '`Bumped a knee on one chore (moving on): ${err?.message ?? err}`')
P_('toe-top',
 '`Tripped up top: ${err?.message ?? err}`')
P_('shelf-setup',
 '`Knocked the shelf over while setting up: ${err?.message ?? err}`')

# Satchel pockets line (message after codename): keep same (it is data print)
# Ledger/Docket
P_('pinned',
 '`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} on the docket today.`',
 '`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} queued up.`')
P_('leftoff',
 '`${_0xlost} set aside — shape we can\'t fold.`')
P_('joined',
 '`${_0new} more chore${_0new === 1 ? "" : "s"} came in after the bell.`')
# Greenhouse
P_('orchard-none',
 '"Nothing on the vines today. (Press Alt+Shift+R to flush and restart)"',
 '"Nothing ripe yet. (Press Alt+Shift+R to flush and restart)"')
# Chime/Taps
P_('wrapping',
 '"Winding down after this chore."')
P_('lastcall',
 '`Last call — shift cut short (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`')
# Wreath/Doormat
P_('shake-rug',
 '"Shaking out the mat — see you on the other side."')
P_('armed-all',
 '"Everything\'s polished — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so."')
P_('armed-half',
 '"Mat\'s half-shaken — press Alt+Shift+R to finish the job (refresh) whenever you\'re ready."')
# Veranda/Porch (server paths)
P_('throttle',
 '`Knock got throttled — trying again in ~${Math.ceil(s)}s.`')
P_('server-err',
 '`Server fault ${st} — backing off for ${backoff.toFixed(1)}s.`')
# Storybook
P_('story-open',
 '`Opening the picture book for ${v.name}.`',
 '`Turning to ${v.name}\'s chapter.`')
# Whistle/Kettle
P_('kettle',
 '"Steep\'s on — brief pause."',
 '"Pot\'s on — quick steep."',
 '"Steeping — brief pause."')
# Chronometer/Hourglass + sand
P_('sand',
 '`Grains falling whole: ${Number.isInteger(ts)} — grain #${ts}`',
 '`Tock landing whole: ${Number.isInteger(ts)} — tock #${ts}`')
# Sundial/Abacus progress shapes (distinct token shapes, distinct keys)
P_('frac-video',
 '`Running tally: ${v.cur.toFixed(2)}/${v.goal}`',
 '`Progress line: ${v.cur.toFixed(2)}/${v.goal}`')
P_('frac-i26',
 '`Running tally: ${_0x26}/${v.goal}`')
P_('frac-i28',
 '`Running tally: ${_0x28}/${v.goal}`')
P_('frac-act',
 '`Running tally: ${v.cur}/${v.goal}`',
 '`Progress line: ${v.cur}/${v.goal}`')
# Garland/Trophy
P_('polished',   # repeated shape across handlers -> cycles
 '`Finished: ${v.name}.`',
 '`Spruced up: ${v.name}.`',
 '`Done and dusted: ${v.name}.`')
P_('shelf-done',
 '`Shelf gleaming — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`')
# Mosaic/Tiles
P_('tile-real',
 '`Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`')
P_('tile-pid',
 '`Floor tiles line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`')
# Flatware/Cutlery (leading quoted part only)
P_('drawer',
 '"Utensil drawer reshuffled: "')
# Scraps/Tidbits
P_('tidbits',
 '`Checking on ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`',
 '`Watching the oven for ${safeName} — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left.`')
# Marquee/Stage
P_('stage',
 '`Curtain\'s up — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`')
# Fairground/Arcade
P_('coins',
 '`Dropping coins in the cabinet (~${Math.ceil((v.goal - v.cur) / 60)} min).`')
# Cubby/Mailroom
P_('memo',
 '"Memo slipped under the door — shift started."')
# Signpost/Map
P_('trail-moved',
 '"Trail marker moved — holding still."')
P_('trail-back',
 '"Back on the trail — picking up again."')
# Drapes/Blinds
P_('drawn',
 '"Curtains drawn — taking the long hallway."',
 '"Shades drawn — taking the long hallway."')
P_('open',
 '"Curtains open — back on the main road."',
 '"Shades open — back on the main road."')

# apply phrase pools: for each key, find occurrences in order and cycle
for key, variants in P.items():
    old = variants[0] if False else None
    # old literal = first variant? no — need current literal. We map by key->old via convention:
# we instead use an explicit old->variants map by detecting: each pool's FIRST variant is the NEW v0, not old.
# To keep this simple: below we build OLD = the *current file* literal by locating it via a registration table.
# Simpler robust approach: register old literals explicitly.
OLDMAP = {}
def REG_OLD(key, old_lit):
    OLDMAP[key] = old_lit
REG_OLD('mod-door', '"The module doorway is unavailable — heading home."')
REG_OLD('mod-noruntime', '"The module doorway returned no usable runtime — heading home."')
REG_OLD('iface-invalid', '"Pocket interfaces invalid — heading home."')
REG_OLD('key-401', '"Key stopped fitting — packing up."')
REG_OLD('hook-immutable', '`Target ${key} is immutable — hook failed.`')
REG_OLD('hook-fail', '`Hook installation failed for ${key}: ${e.message}`')
REG_OLD('big-workshop', '`That chore (${v.name}) needs the big workshop — skipping.`')
REG_OLD('blank-note', '"Chore note came back blank — skipping."')
REG_OLD('desk-door', '"The desktop doorway could not be prepared — skipping."')
REG_OLD('desk-dispatch', '"Initial state dispatch failed — skipping."')
REG_OLD('desk-sub', '"Desktop progress subscription failed — skipping."')
REG_OLD('stream-door', '"The stream doorway could not be prepared — skipping."')
REG_OLD('stream-sub', '"Stream progress subscription failed — skipping."')
REG_OLD('no-arcade-door', '"No doorway found for the arcade cabinet — skipping."')
REG_OLD('activity-stall', '`Activity ${v.name} stopped after no confirmed progress.`')
REG_OLD('blank-list', '"Chore list was blank — skipping this one."')
REG_OLD('bad-target', '"Chore target was invalid — skipping this one."')
REG_OLD('no-appid', '"Chore had no application identifier — skipping."')
REG_OLD('toe-moveon', '`Stubbed a toe on one chore (moving on): ${err?.message ?? err}`')
REG_OLD('toe-top', '`Stubbed a toe: ${err?.message ?? err}`')
REG_OLD('shelf-setup', '`Knocked the shelf over setting up: ${err?.message ?? err}`')
REG_OLD('pinned', '`${_0xb.length} chore${_0xb.length === 1 ? "" : "s"} pinned to the board.`')
REG_OLD('leftoff', '`${_0xlost} left off — shape we can\'t fold.`')
REG_OLD('joined', '`${_0new} more chore${_0new === 1 ? "" : "s"} joined the board.`')
REG_OLD('orchard-none', '"Nothing ripe on the trees today. (Press Alt+Shift+R to flush and restart)"')
REG_OLD('wrapping', '"Wrapping up after this chore."')
REG_OLD('lastcall', '`Last call — shift ended early (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}).`')
REG_OLD('shake-rug', '"Shaking out the rug — see you on the other side."')
REG_OLD('armed-all', '"All polished — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so."')
REG_OLD('armed-half', '"Rug\'s half-shaken — press Alt+Shift+R to finish the job (refresh) whenever you\'re ready."')
REG_OLD('throttle', '`Knock came back throttled — knocking again in ~${Math.ceil(s)}s.`')
REG_OLD('server-err', '`Server error ${st} — backing off for ${backoff.toFixed(1)}s.`')
REG_OLD('story-open', '`Opening the storybook for ${v.name}.`')
REG_OLD('kettle', '"Whistle\'s on — brief steep."')
REG_OLD('sand', '`Sands landing whole: ${Number.isInteger(ts)} — sand #${ts}`')
REG_OLD('frac-video', '`Random fraction: ${v.cur.toFixed(2)}/${v.goal}`')
REG_OLD('frac-i26', '`Random fraction: ${_0x26}/${v.goal}`')
REG_OLD('frac-i28', '`Random fraction: ${_0x28}/${v.goal}`')
REG_OLD('frac-act', '`Random fraction: ${v.cur}/${v.goal}`')
REG_OLD('polished', '`Polished: ${v.name}.`')
REG_OLD('shelf-done', '`Shelf polished — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? "" : "s"}). (Press Alt+Shift+R to flush and restart)`')
REG_OLD('tile-real', '`Floor mosaic lines up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}`')
REG_OLD('tile-pid', '`Floor mosaic lines up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}`')
REG_OLD('drawer', '"Flatware drawer reshuffled: "')
REG_OLD('tidbits', '`Mulling over notes for ${safeName} — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`')
REG_OLD('stage', '`Backstage lights on — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.`')
REG_OLD('coins', '`Feeding coins to the cabinet (~${Math.ceil((v.goal - v.cur) / 60)} min).`')
REG_OLD('memo', '"Note slid under the door — shift started."')
REG_OLD('trail-moved', '"Trail marker moved — holding position."')
REG_OLD('trail-back', '"Back on the trail — resuming."')
REG_OLD('drawn', '"Drapes drawn — taking the long hallway."')
REG_OLD('open', '"Drapes open — back on the main road."')
# the gate line in the current file still embeds the old alias name:
GATE_CURRENT = '"Bindle\'s missing pockets — heading home."'

# sanity: every old literal present the expected number of times
from collections import Counter
cnt = Counter()
for key, old in OLDMAP.items():
    c = src.count(old)
    if c == 0:
        raise SystemExit('OLD MISSING: ' + key + ' -> ' + old[:70])
    cnt[key] = c
# gate special (old embedded form present once after codename rename? codename rename doesn't touch message text)
if src.count(GATE_CURRENT) != 1:
    raise SystemExit('gate current literal count != 1: %d' % src.count(GATE_CURRENT))

# apply: replace occurrences cycling variants, walking backwards per key
for key, old in OLDMAP.items():
    variants = P[key]
    occ = [m.start() for m in re.finditer(re.escape(old), src)]
    for j in range(len(occ) - 1, -1, -1):
        rep = variants[j % len(variants)]
        src = src[:occ[j]] + rep + src[occ[j] + len(old):]
    print(f'{key:14s} old x{len(occ):2d} -> v0: {variants[0][:58]}')

# gate special: replace old embedded line with pool (no alias embedding)
occ_g = [m.start() for m in re.finditer(re.escape(GATE_CURRENT), src)]
gate_v = P['gate-missing']
for j in range(len(occ_g) - 1, -1, -1):
    rep = gate_v[j % len(gate_v)]
    src = src[:occ_g[j]] + rep + src[occ_g[j] + len(GATE_CURRENT):]
print('gate-missing replaced x%d' % len(occ_g))

open('/tmp/o842-lex.js', 'w', encoding='utf-8').write(src)
print('lexicon pass written; bytes', len(src))
