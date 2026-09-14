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
 'Doormat': ['Welcome','Mat','Hearth','Sill','Entryway','Gatehouse','Carpet','Runner','Tread','Lintel','Doorway','Sweep','Broom','Hall','Doormat'],
 'Tidbits': ['Morsels','Fragments','Snippets','Drops','Curios','Trivia','Leftovers','Jottings','Gleanings','Outtakes','Bits','Zest','Dash','Smidgen','Notes'],
 'Stage': ['Platform','Boards','Soapbox','Podium','Dais','Rostrum','Forum','Soundstage','Theater','Auditorium','Footlights','Spotlight','Limelight','Playbill','Backdrop'],
 'Picturebook': ['Novel','Folio','Reader','Comic','Almanac','Tome','Zine','Journal','Magazine','Pamphlet','Chapter','Fable','Tale','Ballad','Anthology'],
 'Orchard': ['Grove','Arboretum','Vineyard','Meadow','Plot','Nursery','Hothouse','Conservatory','Patch','Grange','Farm','Bower','Orangerie','Allotment','Garden'],
 'Mailroom': ['Postroom','Depot','Hub','Slot','Mailbox','Letterbox','Inbox','Outbox','Station','Terminal','Exchange','Relay','Courier','Dispatch','Desk'],
 'Kettle': ['Stove','Boiler','Samovar','Teapot','Steamer','Cauldron','Hob','Griddle','Skillet','Burner','Copper','Chimney','Funnel','Valve','Brewer'],
 'Hourglass': ['Metronome','Pendulum','Timer','Stopwatch','Tempo','Cadence','Moment','Instant','Second','Minute','Tock','Sandglass','Clepsydra','Gnomon','Dial'],
 'Cutlery': ['Utensils','Silverware','Tableware','Crockery','Tray','Drawer','Dresser','Bureau','Caddy','Holder','Bin','Rack','Organizer','Tidier','Larder'],
 'Blinds': ['Shade','Shutter','Louver','Venetian','Roller','Valance','Swag','Cornice','Awning','Canopy','Curtain','Sash','Pane','Screen','Lattice'],
 'Arcade': ['Midway','Carnival','Boardwalk','Funhouse','Carousel','Bazaar','Pier','Esplanade','Expo','Festival','Jamboree','Gala','Fete','Kiosk','Arcade'],
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

# phrase pools — generated by lexicon-o843-builder.py (do not hand-edit below; edit the builder)
P_('mod-door',
 "The module doorway is not there — calling it a day.",
 "The module doorway is unavailable — calling it a day.",
 "The module entrance did not respond — clocking out.",
 "The module doorway is not there — stopping before anything starts.",
 "The module doorway is not there — not starting this shift.",
 "The module doorway refused to open — clocking out.",
 "The module doorway refused to open — ending the run here.",
 "The module doorway could not be found — clocking out.",
 "The module entrance did not respond — not starting this shift.",
 "The module doorway is missing — calling it a day.",
 "The module entrance did not respond — ending the run here.",
 "The module doorway is unavailable — heading home.",
 "The module doorway could not be found — stopping before anything starts.",
 "The module entrance did not respond — calling it a day.",
 "The module doorway could not be found — not starting this shift.")

P_('mod-noruntime',
 "The module doorway returned no usable runtime — clocking out.",
 "The module doorway provided nothing runnable — calling it a day.",
 "The module doorway provided nothing runnable — stopping before anything starts.",
 "The module doorway provided nothing runnable — heading home.",
 "The module doorway returned no usable runtime — ending the run here.",
 "The module doorway gave back an empty runtime — stopping before anything starts.",
 "The module doorway gave back an empty runtime — clocking out.",
 "The module doorway returned no usable runtime — calling it a day.",
 "The module doorway handed back nothing usable — stopping before anything starts.",
 "The module doorway provided nothing runnable — clocking out.",
 "The module doorway came back with no runtime — stopping before anything starts.",
 "The module doorway returned no usable runtime — heading home.",
 "The module doorway gave back an empty runtime — heading home.",
 "The module doorway handed back nothing usable — clocking out.",
 "The module doorway returned no usable runtime — stopping before anything starts.")

P_('iface-invalid',
 "The pocket interface layer is invalid — clocking out.",
 "Pocket bindings came back invalid — not starting this shift.",
 "The pocket interface layer is invalid — heading home.",
 "Pocket interfaces invalid — clocking out.",
 "The pocket interfaces are invalid — stopping before anything starts.",
 "Pocket surfaces are unusable — clocking out.",
 "The pocket interfaces are invalid — ending the run here.",
 "Pocket interfaces invalid — ending the run here.",
 "Pocket surfaces are unusable — not starting this shift.",
 "Pocket interfaces invalid — heading home.",
 "Pocket interfaces invalid — stopping before anything starts.",
 "Pocket surfaces are unusable — stopping before anything starts.",
 "Pocket bindings came back invalid — ending the run here.",
 "Pocket bindings came back invalid — heading home.",
 "The pocket interfaces are invalid — heading home.")

P_('key-401',
 "The key came back rejected — wrapping the gear.",
 "Key stopped fitting — packing up.",
 "Session key turned stale — stopping cleanly.",
 "Key stopped fitting — wrapping the gear.",
 "Auth stopped holding — stopping cleanly.",
 "Auth stopped holding — folding up shop.",
 "Our key stopped unlocking — folding up shop.",
 "The key no longer fits — wrapping the gear.",
 "The key no longer fits — stopping cleanly.",
 "Auth stopped holding — wrapping the gear.",
 "Key stopped fitting — ending the run.",
 "The key came back rejected — stopping cleanly.",
 "Key stopped fitting — calling it here.",
 "Session key turned stale — packing up.",
 "The key came back rejected — calling it here.")

P_('hook-immutable',
 "Target ${key} rejects hooks — no hook was installed.",
 "Target ${key} is frozen — no hook was installed.",
 "Target ${key} rejects hooks — hook failed.",
 "Target ${key} is read-only — hook failed.",
 "Target ${key} is read-only — no hook was installed.",
 "Target ${key} is frozen — leaving it untouched.",
 "Target ${key} is immutable — cannot be hooked.",
 "Target ${key} is sealed — hook failed.",
 "Target ${key} is sealed — skipping the hook.",
 "Target ${key} is immutable — hook failed.",
 "Target ${key} is frozen — cannot be hooked.",
 "Target ${key} is read-only — cannot be hooked.",
 "Target ${key} is sealed — no hook was installed.",
 "Target ${key} is read-only — skipping the hook.",
 "Target ${key} is immutable — skipping the hook.")

P_('hook-fail',
 "Hook installation failed for ${key} ${e.message}",
 "Hook install failed on ${key} ${e.message}",
 "Could not mount the hook on ${key} ${e.message}",
 "The hook for ${key} did not install ${e.message}",
 "Setting up the hook on ${key} threw ${e.message}",
 "Hook wiring error on ${key} ${e.message}",
 "The hook could not be attached to ${key} ${e.message}",
 "Attaching hooks to ${key} failed ${e.message}",
 "Hook setup for ${key} failed ${e.message}",
 "Installing the hook on ${key} errored ${e.message}",
 "The ${key} hook refused to install ${e.message}",
 "Could not wire ${key} ${e.message}",
 "Hook attempt on ${key} failed ${e.message}",
 "Mounting a hook on ${key} failed ${e.message}",
 "Patching ${key} failed ${e.message}")

P_('big-workshop',
 "That chore (${v.name}) needs the main hall — skipping.",
 "That chore (${v.name}) needs the main hall — moving past it.",
 "That chore (${v.name}) needs the main hall — skipping it for now.",
 "This task (${v.name}) needs the full workshop — moving past it.",
 "That chore (${v.name}) needs the main hall — not taking it this shift.",
 "Chore ${v.name} needs the heavy bench — not taking it this shift.",
 "Chore ${v.name} needs the heavy bench — skipping it for now.",
 "That chore (${v.name}) needs a bigger rig — leaving it for a bigger session.",
 "That chore (${v.name}) needs the big workshop — skipping.",
 "This task (${v.name}) needs the full workshop — skipping it for now.",
 "Chore ${v.name} needs the heavy bench — leaving it for a bigger session.",
 "That chore (${v.name}) needs the main hall — leaving it for a bigger session.",
 "Chore ${v.name} needs the heavy bench — moving past it.",
 "That chore (${v.name}) needs the big workshop — leaving it for a bigger session.",
 "This task (${v.name}) needs the full workshop — not taking it this shift.")

P_('blank-note',
 "The note for the chore came back empty — skipping.",
 "Chore note came back blank — moving on.",
 "The chore returned a blank note — not starting it.",
 "The chore returned a blank note — leaving it be.",
 "Chore note came back blank — leaving it be.",
 "The note for the chore came back empty — not starting it.",
 "The chore note was blank — skipping.",
 "Chore note came back blank — skipping this one.",
 "The chore returned a blank note — moving on.",
 "Note for the chore was empty — not starting it.",
 "The chore note was blank — leaving it be.",
 "Note for the chore was empty — moving on.",
 "The note for the chore came back empty — leaving it be.",
 "Note for the chore was empty — leaving it be.",
 "The chore returned a blank note — skipping.")

P_('desk-door',
 "The desktop doorway would not open — not taking it this shift.",
 "The desktop doorway could not be prepared — skipping.",
 "The desktop route could not be armed — not taking it this shift.",
 "The desktop doorway failed to come up — skipping.",
 "The desktop doorway refused to be set up — not taking it this shift.",
 "The desktop entry could not be opened — moving on.",
 "The desktop route could not be armed — skipping this one.",
 "The desktop doorway refused to be set up — moving on.",
 "The desktop doorway failed to come up — skipping this one.",
 "The desktop route could not be armed — skipping.",
 "The desktop entry could not be opened — leaving it for later.",
 "The desktop doorway would not open — leaving it for later.",
 "The desktop doorway would not open — skipping this one.",
 "The desktop doorway could not be prepared — leaving it for later.",
 "The desktop doorway failed to come up — not taking it this shift.")

P_('desk-dispatch',
 "Initial state dispatch failed — moving on.",
 "The initial dispatch went wrong — moving on.",
 "The initial state could not be dispatched — skipping.",
 "Sending the initial state failed — skipping this one.",
 "The initial dispatch went wrong — skipping.",
 "The initial dispatch went wrong — leaving it be.",
 "First state push failed — not starting it.",
 "Initial state dispatch failed — skipping this one.",
 "The initial dispatch went wrong — skipping this one.",
 "The initial state could not be dispatched — skipping this one.",
 "First state push failed — leaving it be.",
 "The initial dispatch went wrong — not starting it.",
 "The initial state could not be dispatched — moving on.",
 "Initial state dispatch failed — not starting it.",
 "Initial state dispatch failed — leaving it be.")

P_('desk-sub',
 "Desktop progress subscription failed — moving on.",
 "Desktop progress updates could not be subscribed — leaving it be.",
 "Subscribing to desktop progress failed — moving on.",
 "The desktop feed subscription failed — leaving it be.",
 "Subscribing to desktop progress failed — skipping this one.",
 "Desktop progress subscription failed — not starting it.",
 "The desktop progress feed would not subscribe — skipping.",
 "The desktop progress feed would not subscribe — moving on.",
 "The desktop progress feed would not subscribe — leaving it be.",
 "Subscribing to desktop progress failed — leaving it be.",
 "The desktop feed subscription failed — moving on.",
 "The desktop progress feed would not subscribe — skipping this one.",
 "Desktop progress updates could not be subscribed — moving on.",
 "The desktop feed subscription failed — skipping this one.",
 "The desktop feed subscription failed — not starting it.")

P_('stream-door',
 "The stream doorway would not open — skipping.",
 "The stream route could not be armed — skipping this one.",
 "The stream doorway could not be prepared — skipping.",
 "The stream doorway refused to be set up — leaving it for later.",
 "The stream route could not be armed — skipping.",
 "The stream doorway failed to come up — not taking it this shift.",
 "The stream doorway could not be prepared — not taking it this shift.",
 "The stream doorway refused to be set up — moving on.",
 "The stream doorway refused to be set up — skipping.",
 "The stream doorway failed to come up — moving on.",
 "The stream entry could not be opened — moving on.",
 "The stream doorway failed to come up — leaving it for later.",
 "The stream entry could not be opened — not taking it this shift.",
 "The stream doorway refused to be set up — skipping this one.",
 "The stream doorway refused to be set up — not taking it this shift.")

P_('stream-sub',
 "Subscribing to stream progress failed — not starting it.",
 "Stream progress subscription failed — not starting it.",
 "Stream progress updates could not be subscribed — skipping.",
 "Stream progress updates could not be subscribed — moving on.",
 "The stream feed subscription failed — not starting it.",
 "Subscribing to stream progress failed — skipping this one.",
 "Stream progress subscription failed — leaving it be.",
 "The stream progress feed would not subscribe — leaving it be.",
 "The stream feed subscription failed — skipping.",
 "The stream progress feed would not subscribe — moving on.",
 "Subscribing to stream progress failed — leaving it be.",
 "The stream feed subscription failed — moving on.",
 "Stream progress subscription failed — skipping.",
 "Stream progress updates could not be subscribed — not starting it.",
 "The stream progress feed would not subscribe — skipping this one.")

P_('no-arcade-door',
 "No arcade doorway could be found — leaving it for later.",
 "The arcade cabinet had no doorway — skipping this one.",
 'The cabinet\'s doorway was not found — skipping.',
 "No doorway found for the arcade cabinet — leaving it for later.",
 "The arcade cabinet had no doorway — moving on.",
 'The cabinet\'s doorway was not found — leaving it for later.',
 "No doorway found for the arcade cabinet — skipping this one.",
 "The arcade cabinet had no doorway — leaving it for later.",
 "No doorway found for the cabinet — skipping this one.",
 "No doorway found for the cabinet — moving on.",
 "No arcade doorway could be found — not taking it this shift.",
 "No doorway found for the cabinet — leaving it for later.",
 'The cabinet\'s doorway was not found — moving on.',
 "No doorway found for the arcade cabinet — skipping.",
 'The cabinet\'s doorway was not found — not taking it this shift.')

P_('activity-stall',
 "Activity ${v.name} produced no progress before stopping — counting it as stalled.",
 "Activity ${v.name} ended without confirmed progress — counting it as stalled.",
 "Activity ${v.name} produced no progress before stopping — treating it as a stall.",
 "Activity ${v.name} stopped after no confirmed progress — treating it as a stall.",
 "Activity ${v.name} stalled with no confirmed progress — treating it as a stall.",
 "Activity ${v.name} stopped after no confirmed progress — assuming it stalled.",
 "Activity ${v.name} produced no progress before stopping — marking it down as stalled.",
 "Activity ${v.name} produced no progress before stopping — assuming it stalled.",
 "Activity ${v.name} went quiet without progress — treating it as a stall.",
 "Activity ${v.name} went quiet without progress — counting it as stalled.",
 "Activity ${v.name} ended without confirmed progress — marking it down as stalled.",
 "Activity ${v.name} ended without confirmed progress — assuming it stalled.",
 "Activity ${v.name} stopped after no confirmed progress — marking it down as stalled.",
 "Activity ${v.name} ended without confirmed progress — flagging no progress.",
 "Activity ${v.name} went quiet without progress — assuming it stalled.")

P_('blank-list',
 "No chores were on the list — leaving it for next time.",
 "Chore list was blank — leaving it for next time.",
 "Chore list came back empty — skipping this one.",
 "The list of chores was empty — moving on.",
 "Chore list came back empty — moving on.",
 "The list of chores was empty — skipping this one.",
 "Chore list came back empty — leaving it for next time.",
 "Chore list came back empty — nothing to do this pass.",
 "The list of chores was empty — leaving it for next time.",
 "Chore list came back empty — skipping the round.",
 "No chores were on the list — skipping this one.",
 "The list of chores was empty — skipping the round.",
 "No chores were on the list — skipping the round.",
 "The chore list came back blank — moving on.",
 "The chore list came back blank — skipping the round.")

P_('bad-target',
 "Chore target did not parse — moving on.",
 "Chore target was invalid — skipping this one.",
 "Chore target was invalid — not starting it.",
 "Chore target did not parse — leaving it be.",
 "Chore target came back unusable — not starting it.",
 "The chore target was malformed — leaving it be.",
 "Chore target did not parse — not starting it.",
 "Chore target did not parse — skipping this one.",
 "The chore target was malformed — moving on.",
 "The target for the chore was bad — skipping this one.",
 "The target for the chore was bad — leaving it be.",
 "Chore target was invalid — moving on.",
 "Chore target came back unusable — skipping it.",
 "Chore target was invalid — leaving it be.",
 "Chore target came back unusable — skipping this one.")

P_('no-appid',
 "No application id on the chore — not starting it.",
 "Chore came without an application id — skipping.",
 "Chore had no app identifier — skipping.",
 "The chore lacked an application id — skipping this one.",
 "Chore had no app identifier — skipping this one.",
 "Chore had no app identifier — not starting it.",
 "The chore lacked an application id — moving on.",
 "Chore had no application identifier — leaving it be.",
 "No application id on the chore — moving on.",
 "Chore came without an application id — skipping this one.",
 "No application id on the chore — skipping this one.",
 "The chore lacked an application id — leaving it be.",
 "Chore came without an application id — leaving it be.",
 "No application id on the chore — skipping.",
 "Chore had no application identifier — not starting it.")

P_('toe-moveon',
 "Snagged a nail on one chore: ${err?.message ?? err}",
 "Fumbled one chore: ${err?.message ?? err}",
 "Caught an edge on one chore: ${err?.message ?? err}",
 "Hit a snag on one chore: ${err?.message ?? err}",
 "Dropped one chore: ${err?.message ?? err}",
 "A chore threw an error: ${err?.message ?? err}",
 "One chore slipped: ${err?.message ?? err}",
 "One chore came back sideways: ${err?.message ?? err}",
 "One chore kicked back: ${err?.message ?? err}",
 "One chore went sideways: ${err?.message ?? err}",
 "Ran into trouble on one chore: ${err?.message ?? err}",
 "One chore misbehaved: ${err?.message ?? err}",
 "One chore fell over: ${err?.message ?? err}",
 "One chore threw a fit: ${err?.message ?? err}",
 "Rough patch on one chore: ${err?.message ?? err}")

P_('toe-top',
 "Snagged a nail: ${err?.message ?? err}",
 "Fumbled a step: ${err?.message ?? err}",
 "Caught an edge: ${err?.message ?? err}",
 "Hit a snag: ${err?.message ?? err}",
 "Dropped the tray: ${err?.message ?? err}",
 "Ran into trouble: ${err?.message ?? err}",
 "Went sideways: ${err?.message ?? err}",
 "Slipped up top: ${err?.message ?? err}",
 "Kicked back an error: ${err?.message ?? err}",
 "Threw an error at the top: ${err?.message ?? err}",
 "Hit a wall up top: ${err?.message ?? err}",
 "Broke stride: ${err?.message ?? err}",
 "Fouled a step: ${err?.message ?? err}",
 "Caught a snag: ${err?.message ?? err}",
 "Ran aground: ${err?.message ?? err}")

P_('shelf-setup',
 "Knocked the shelf over setting up: ${err?.message ?? err}",
 "Knocked the shelf over while setting up: ${err?.message ?? err}",
 "Spilled the board during setup: ${err?.message ?? err}",
 "Dropped everything while setting up: ${err?.message ?? err}",
 "Broke a shelf during setup: ${err?.message ?? err}",
 "Mangled the setup step: ${err?.message ?? err}",
 "Knocked the setup over: ${err?.message ?? err}",
 "Botched the setup step: ${err?.message ?? err}",
 "Fumbled the setup: ${err?.message ?? err}",
 "Tripped during setup: ${err?.message ?? err}",
 "Upended the board during setup: ${err?.message ?? err}",
 "Shelf setup fell apart: ${err?.message ?? err}",
 "Setup crashed: ${err?.message ?? err}",
 "Setting up went sideways: ${err?.message ?? err}",
 "Setup threw: ${err?.message ?? err}")

P_('pinned',
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} pinned to the board.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} pinned to the board for tonight.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} pinned to the board for this shift.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} up and pinned to the board.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} on the docket today.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} on the docket today, ready to go.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} on the docket today and counting.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} queued up.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} queued up for the shift.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} queued up and ready.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} queued up for tonight.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} queued up; board pinned.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} pinned to the board and queued up.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} queued up and pinned to the board.",
 "${_0xb.length} chore${_0xb.length === 1 ? \"\" : \"s\"} on the docket today, queued up.")

P_('leftoff',
 '${_0xlost} set aside —  — shape we can\'t take on.',
 '${_0xlost} set aside —  — shape we can\'t work with.',
 '${_0xlost} left off —  — shape we can\'t fold today.',
 '${_0xlost} left off —  — shape we can\'t work with.',
 '${_0xlost} set aside —  — shape we can\'t fold this time.',
 '${_0xlost} set aside —  — shape we can\'t fold into the run.',
 '${_0xlost} set aside —  — shape we can\'t fold today.',
 '${_0xlost} set aside —  — shape we can\'t fold this pass.',
 '${_0xlost} left off —  — shape we can\'t fold into the run.',
 '${_0xlost} left off —  — shape we can\'t fold.',
 '${_0xlost} left off —  — shape we can\'t fold this shift.',
 '${_0xlost} set aside —  — shape we can\'t fold.',
 '${_0xlost} left off —  — shape we can\'t fold this time.',
 '${_0xlost} left off —  — shape we can\'t take on.',
 '${_0xlost} set aside —  — shape we can\'t fold this shift.')

P_('joined',
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board late.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board after start.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} came in after the bell.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} came in after the bell and joined up.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} came in after the bell was rung.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board mid-shift.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board before the end.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board while we worked.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} came in after the bell; joining the board.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board, refilled.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} came in after the bell, refilled.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board and counted.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} came in after the bell to help.",
 "${_0new} more chore${_0new === 1 ? \"\" : \"s\"} joined the board for the next pass.")

P_('orchard-none',
 "Nothing on the vines today, not yet —  ((Press Alt+Shift+R to flush and restart)) when ready.",
 "Nothing on the vines today, not yet —  ((Press Alt+Shift+R to flush and restart)) later.",
 "Nothing ripe on the trees today, not yet —  ((Press Alt+Shift+R to flush and restart)) when ready.",
 "Nothing ripe on the trees today —  ((Press Alt+Shift+R to flush and restart)) when ready.",
 "Nothing ripe yet —  — flush with Alt+Shift+R and restart.",
 "Nothing ripe yet —  ((Press Alt+Shift+R to flush and restart))",
 "Nothing ripe on the trees today, not yet —  — flush with Alt+Shift+R and restart.",
 "Nothing ripe on the trees today, not yet —  — press Alt+Shift+R to flush and restart.",
 "Nothing on the vines today —  ((Press Alt+Shift+R to flush and restart)) later.",
 "Nothing ripe on the trees today —  — press Alt+Shift+R to flush and restart.",
 "Nothing ripe on the trees today, not yet —  ((Press Alt+Shift+R to flush and restart)) later.",
 "Nothing ripe yet —  — press Alt+Shift+R to flush and restart.",
 "Nothing on the vines today, not yet —  — press Alt+Shift+R to flush and restart.",
 "Nothing ripe on the trees today —  — flush with Alt+Shift+R and restart.",
 "Nothing ripe yet —  ((Press Alt+Shift+R to flush and restart)) later.")

P_('wrapping',
 "Winding down after this chore — pausing at the checkpoint.",
 "Ending the shift after this chore — cutting out after the checkpoint.",
 "Winding down after this chore — stopping at the next checkpoint.",
 "Winding down after this chore — checking out at the boundary.",
 "Winding down after this chore — stopping at the checkpoint.",
 "Packing up after this chore — stopping at the next checkpoint.",
 "Wrapping up after this chore — stopping at the next checkpoint.",
 "Wrapping up after this chore — cutting out after the checkpoint.",
 "Packing up after this chore — stopping at the checkpoint.",
 "Closing out after this chore — stopping at the checkpoint.",
 "Ending the shift after this chore — pausing at the checkpoint.",
 "Packing up after this chore — checking out at the boundary.",
 "Wrapping up after this chore — stopping at the checkpoint.",
 "Wrapping up after this chore — pausing at the checkpoint.",
 "Closing out after this chore — cutting out after the checkpoint.")

P_('lastcall',
 "Last call — shift cut short —  with ${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}.",
 "Last call — shift ended early —  with ${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}.",
 "Last call — shift ended early —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) in hand.",
 "Last call — shift cut short —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) in hand.",
 "Last call — shift cut short —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}).",
 "Last call — the shift stopped early —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}).",
 "Last call — stopping early —  — (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) logged.",
 "Last call — run ended early —  — ${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"} recorded.",
 "Last call — stopping early —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}).",
 "Last call — the shift stopped early —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) in hand.",
 "Last call — run ended early —  — (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) logged.",
 "Last call — run ended early —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}).",
 "Last call — the shift stopped early —  — ${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"} recorded.",
 "Last call — shift cut short —  — ${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"} recorded.",
 "Last call — stopping early —  (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) in hand.")

P_('shake-rug',
 "Shaking out the mat — see you on the flip side.",
 "Rolling up the rug — see you after the refresh.",
 "Rolling up the rug — see you on the other side.",
 "Shaking things out — see you on the flip side.",
 "Shaking things out — back in a moment.",
 "Shaking things out — see you after the refresh.",
 "Giving the rug a shake — catch you on the reload.",
 "Rolling up the rug — catch you on the reload.",
 "Shaking out the rug — catch you on the reload.",
 "Shaking out the mat — catch you on the reload.",
 "Shaking out the rug — back in a moment.",
 "Rolling up the rug — see you on the flip side.",
 "Giving the rug a shake — see you after the refresh.",
 "Shaking things out — see you on the other side.",
 "Shaking out the mat — see you on the other side.")

P_('armed-all',
 'Everything\'s polished, all of it —  — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.',
 "All polished —  — press Alt+Shift+R to flush and restart (refresh) whenever; the run stays parked.",
 "All polished up —  — press Alt+Shift+R to flush and restart (refresh) whenever; the run stays parked.",
 "All polished —  — press Alt+Shift+R when you are done; the run sits idle until you do.",
 "All polished, done for now —  — press Alt+Shift+R to shake out the rug (refresh) when ready; nothing runs until then.",
 'Everything\'s polished, all of it —  — press Alt+Shift+R to flush and restart (refresh) whenever; the run stays parked.',
 "All polished —  — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so.",
 'Everything\'s polished, all of it —  — press Alt+Shift+R to shake out the rug (refresh), or just keep browsing; nothing moves until you say so.',
 'Everything\'s polished —  — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.',
 'Everything\'s polished, all of it —  — press Alt+Shift+R to shake out the rug (refresh) when ready; nothing runs until then.',
 "All polished, done for now —  — press Alt+Shift+R when you are done; the run sits idle until you do.",
 "All polished, done for now —  — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.",
 "All polished —  — press Alt+Shift+R to shake out the rug (refresh) if you want a clean slate; otherwise nothing else happens.",
 'Everything\'s polished —  — press Alt+Shift+R when you are done; the run sits idle until you do.',
 'Everything\'s polished —  — press Alt+Shift+R to flush and restart (refresh) whenever; the run stays parked.')

P_('armed-half',
 'Mat\'s half-shaken —  — press Alt+Shift+R to wrap it up (refresh) any time.',
 'Rug\'s half-shaken —  — hit Alt+Shift+R to finish the job (refresh).',
 "The rug is half-shaken —  — hit Alt+Shift+R to finish the job (refresh).",
 "Halfway through the shake —  — press Alt+Shift+R to finish the shake (refresh) when ready.",
 'Mat\'s half-shaken —  — press Alt+Shift+R to finish the shake (refresh) when ready.',
 "The rug is half-shaken —  — press Alt+Shift+R (refresh) to finish when you like.",
 "The rug is half-shaken —  — press Alt+Shift+R to finish the shake (refresh) when ready.",
 'Rug\'s half-shaken —  — press Alt+Shift+R (refresh) to finish when you like.',
 'Half the run is done —  — press Alt+Shift+R to finish the job (refresh) whenever you\'re ready.',
 'Mat\'s half-shaken —  — hit Alt+Shift+R to finish the job (refresh).',
 'Rug\'s half-shaken —  — press Alt+Shift+R to wrap it up (refresh) any time.',
 "Halfway through the shake —  — press Alt+Shift+R (refresh) to finish when you like.",
 'Rug\'s half-shaken —  — press Alt+Shift+R to finish the shake (refresh) when ready.',
 "Half the run is done —  — press Alt+Shift+R (refresh) to finish when you like.",
 "Halfway through the shake —  — press Alt+Shift+R to wrap it up (refresh) any time.")

P_('throttle',
 "The call was throttled —  — backing off ~${Math.ceil(s)}s, then knocking again.",
 "Our knock was throttled —  — retrying in ~${Math.ceil(s)}s.",
 "Request came back throttled —  — retrying in ~${Math.ceil(s)}s.",
 "The call was throttled —  — trying again in ~${Math.ceil(s)}s.",
 "Knock came back throttled —  — next attempt in ~${Math.ceil(s)}s.",
 "Request came back throttled —  — backing off ~${Math.ceil(s)}s, then knocking again.",
 "The call was throttled —  — retrying in ~${Math.ceil(s)}s.",
 "The knock got throttled —  — backing off ~${Math.ceil(s)}s, then knocking again.",
 "Request came back throttled —  — trying again in ~${Math.ceil(s)}s.",
 "Knock came back throttled —  — retrying in ~${Math.ceil(s)}s.",
 "Request came back throttled —  — knocking again in ~${Math.ceil(s)}s.",
 "The call was throttled —  — knocking again in ~${Math.ceil(s)}s.",
 "Our knock was throttled —  — knocking again in ~${Math.ceil(s)}s.",
 "Our knock was throttled —  — trying again in ~${Math.ceil(s)}s.",
 "Knock came back throttled —  — backing off ~${Math.ceil(s)}s, then knocking again.")

P_('server-err',
 "Server fault ${st} on that knock —  — resting ${backoff.toFixed(1)}s before retry.",
 "Server fault ${st} on that knock —  — pausing for ${backoff.toFixed(1)}s.",
 "Server error ${st} on that knock —  — backing off ${backoff.toFixed(1)}s.",
 "Server fault ${st} on that knock —  — backing off for ${backoff.toFixed(1)}s.",
 "Server error ${st} there —  — backing off for ${backoff.toFixed(1)}s.",
 "Server fault ${st} —  — pausing for ${backoff.toFixed(1)}s.",
 "Server error ${st} on that knock —  — cooling off for ${backoff.toFixed(1)}s.",
 "Server error ${st} there —  — cooling off for ${backoff.toFixed(1)}s.",
 "Server fault ${st} on that knock —  — cooling off for ${backoff.toFixed(1)}s.",
 "Server error ${st} —  — cooling off for ${backoff.toFixed(1)}s.",
 "Server fault ${st} —  — backing off ${backoff.toFixed(1)}s.",
 "Server error ${st} there —  — resting ${backoff.toFixed(1)}s before retry.",
 "Server fault ${st} —  — resting ${backoff.toFixed(1)}s before retry.",
 "Server fault ${st} on that knock —  — backing off ${backoff.toFixed(1)}s.",
 "Server fault ${st} there —  — cooling off for ${backoff.toFixed(1)}s.")

P_('story-open',
 "Opening the picture book for ${v.name}.",
 "Opening the reading book for ${v.name}.",
 "Turning to ${v.name} in the book.",
 "Starting ${v.name} from the shelf.",
 "Opening ${v.name} in the reader.",
 "Taking down ${v.name} from the shelf.",
 "Getting ${v.name} going.",
 'Opening ${v.name}\'s chapter.',
 "Picking up the book at ${v.name}.",
 "Starting up ${v.name}.",
 "Settling in with ${v.name}.",
 "Pulling ${v.name} off the shelf.",
 "Flipping to ${v.name}.",
 "Launching ${v.name} from the shelf.",
 "Bringing out ${v.name} from the stack.")

P_('kettle',
 'Kettle\'s on — brief steep.',
 'Pot\'s on — quick steep.',
 'Water\'s heating — brief steep.',
 'Steep\'s on — brief pause.',
 "Kettle singing — quick pause.",
 'Teapot\'s on — quick steep.',
 "Brief steep while the pot goes.",
 'Kettle\'s up — short pause.',
 'Pot\'s singing — brief pause.',
 'Quick steep — kettle\'s on.',
 'Kettle\'s coming to the boil — short wait.',
 "Kettle on — stepping away briefly.",
 "Steeping briefly — kettle is up.",
 'Pot\'s on the boil — brief pause.',
 'Kettle\'s on — just a steep.')

P_('sand',
 "Tock landing whole — : ${Number.isInteger(ts)} — grain #${ts}",
 "Sands landing whole — : ${Number.isInteger(ts)} — sand #${ts}",
 "Sands landing whole — : ${Number.isInteger(ts)} — tock #${ts}",
 "Tock landing whole — : ${Number.isInteger(ts)} — sand #${ts}",
 "Tock landing whole — : ${Number.isInteger(ts)} — tick #${ts}",
 "Sands landing whole — : ${Number.isInteger(ts)} — grain #${ts}",
 "Grains landing whole — : ${Number.isInteger(ts)} — tock #${ts}",
 "Sands landing whole — : ${Number.isInteger(ts)} — pebble #${ts}",
 "Seconds landing whole — : ${Number.isInteger(ts)} — sand #${ts}",
 "Pebbles landing whole — : ${Number.isInteger(ts)} — sand #${ts}",
 "Tock landing whole — : ${Number.isInteger(ts)} — pebble #${ts}",
 "Pebbles landing whole — : ${Number.isInteger(ts)} — tock #${ts}",
 "Grains landing whole — : ${Number.isInteger(ts)} — sand #${ts}",
 "Grains landing whole — : ${Number.isInteger(ts)} — grain #${ts}",
 "Pebbles landing whole — : ${Number.isInteger(ts)} — tick #${ts}")

P_('frac-video',
 "Random fraction: ${v.cur.toFixed(2)}/${v.goal} logged.",
 "Random fraction: ${v.cur.toFixed(2)}/${v.goal}",
 "Running tally: ${v.cur.toFixed(2)}/${v.goal} so far.",
 "Running tally: ${v.cur.toFixed(2)}/${v.goal}",
 "Random fraction: ${v.cur.toFixed(2)}/${v.goal} so far.",
 "Progress line: ${v.cur.toFixed(2)}/${v.goal} logged.",
 "Random fraction: ${v.cur.toFixed(2)}/${v.goal} in the books.",
 "Progress line: ${v.cur.toFixed(2)}/${v.goal}.",
 "Running tally: ${v.cur.toFixed(2)}/${v.goal}.",
 "Running tally: ${v.cur.toFixed(2)}/${v.goal} logged.",
 "Running tally: ${v.cur.toFixed(2)}/${v.goal} in the books.",
 "Progress line: ${v.cur.toFixed(2)}/${v.goal}",
 "Random fraction: ${v.cur.toFixed(2)}/${v.goal}.",
 "Progress line: ${v.cur.toFixed(2)}/${v.goal} in the books.",
 "Progress line: ${v.cur.toFixed(2)}/${v.goal} so far.")

P_('frac-i26',
 "Running tally: ${_0x26}/${v.goal} logged.",
 "Random fraction: ${_0x26}/${v.goal} logged.",
 "Random fraction: ${_0x26}/${v.goal}",
 "Progress line: ${_0x26}/${v.goal} logged.",
 "Random fraction: ${_0x26}/${v.goal} in the books.",
 "Running tally: ${_0x26}/${v.goal}",
 "Random fraction: ${_0x26}/${v.goal} so far.",
 "Progress line: ${_0x26}/${v.goal} so far.",
 "Random fraction: ${_0x26}/${v.goal}.",
 "Running tally: ${_0x26}/${v.goal}.",
 "Progress line: ${_0x26}/${v.goal}.",
 "Progress line: ${_0x26}/${v.goal} in the books.",
 "Running tally: ${_0x26}/${v.goal} in the books.",
 "Running tally: ${_0x26}/${v.goal} so far.",
 "Progress line: ${_0x26}/${v.goal}")

P_('frac-i28',
 "Random fraction: ${_0x28}/${v.goal}.",
 "Running tally: ${_0x28}/${v.goal}",
 "Progress line: ${_0x28}/${v.goal}.",
 "Running tally: ${_0x28}/${v.goal} logged.",
 "Progress line: ${_0x28}/${v.goal}",
 "Random fraction: ${_0x28}/${v.goal}",
 "Progress line: ${_0x28}/${v.goal} in the books.",
 "Progress line: ${_0x28}/${v.goal} so far.",
 "Random fraction: ${_0x28}/${v.goal} in the books.",
 "Running tally: ${_0x28}/${v.goal} so far.",
 "Random fraction: ${_0x28}/${v.goal} logged.",
 "Random fraction: ${_0x28}/${v.goal} so far.",
 "Progress line: ${_0x28}/${v.goal} logged.",
 "Running tally: ${_0x28}/${v.goal}.",
 "Running tally: ${_0x28}/${v.goal} in the books.")

P_('frac-act',
 "Random fraction: ${v.cur}/${v.goal}.",
 "Progress line: ${v.cur}/${v.goal} logged.",
 "Progress line: ${v.cur}/${v.goal} so far.",
 "Progress line: ${v.cur}/${v.goal}",
 "Running tally: ${v.cur}/${v.goal} so far.",
 "Progress line: ${v.cur}/${v.goal} in the books.",
 "Random fraction: ${v.cur}/${v.goal} logged.",
 "Running tally: ${v.cur}/${v.goal} in the books.",
 "Random fraction: ${v.cur}/${v.goal} so far.",
 "Random fraction: ${v.cur}/${v.goal}",
 "Running tally: ${v.cur}/${v.goal}.",
 "Running tally: ${v.cur}/${v.goal} logged.",
 "Random fraction: ${v.cur}/${v.goal} in the books.",
 "Progress line: ${v.cur}/${v.goal}.",
 "Running tally: ${v.cur}/${v.goal}")

P_('polished',
 "Finished: ${v.name}.",
 "Completed: ${v.name}.",
 "Checked off: ${v.name}.",
 "Cleared: ${v.name}.",
 "Knocked out: ${v.name}.",
 "Wrapped up: ${v.name}.",
 "Sealed: ${v.name}.",
 "Delivered: ${v.name}.",
 "Concluded: ${v.name}.",
 "Boxed up: ${v.name}.",
 "Settled: ${v.name}.",
 "Handed off: ${v.name}.",
 "Put to bed: ${v.name}.",
 "Cashed out: ${v.name}.",
 "Closed out: ${v.name}.")

P_('shelf-done',
 "Shelf gleaming —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) recorded. ((Press Alt+Shift+R to flush and restart))",
 "Shelf polished completely —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). ((Press Alt+Shift+R to flush and restart))",
 "Shelf polished completely —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) recorded. ((Press Alt+Shift+R to flush and restart))",
 "Shelf gleaming completely —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) recorded. ((Press Alt+Shift+R to flush and restart))",
 "Shelf polished completely —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). Press Alt+Shift+R to flush and restart.",
 "Shelf polished, all of it —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). Press Alt+Shift+R to flush and restart.",
 "Shelf gleaming completely —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). ((Press Alt+Shift+R to flush and restart))",
 "Shelf gleaming —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). Press Alt+Shift+R to flush and restart.",
 "Shelf polished, all of it —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). ((Press Alt+Shift+R to flush and restart))",
 "Shelf gleaming completely —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). Press Alt+Shift+R to flush and restart.",
 "Shelf polished, all of it —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) recorded. ((Press Alt+Shift+R to flush and restart))",
 "Shelf polished —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). ((Press Alt+Shift+R to flush and restart))",
 "Shelf gleaming —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). ((Press Alt+Shift+R to flush and restart))",
 "Shelf polished —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}). Press Alt+Shift+R to flush and restart.",
 "Shelf polished —  — nothing left (${_0xresults.length} activity result${_0xresults.length === 1 ? \"\" : \"s\"}) recorded. ((Press Alt+Shift+R to flush and restart))")

P_('tile-real',
 "Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}",
 "Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}",
 "The tiled floor lines up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}",
 "Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}",
 "Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}",
 "Floor checks line up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}",
 "The floor grid lines up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}",
 "The tiled floor lines up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}",
 "Floor tiles line up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}",
 "The floor grid lines up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}",
 "Floor patterns line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}",
 "Floor checks line up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}",
 "The floor grid lines up in fours: ${_0x1bReal % 4 === 0} — stone #${_0x1bReal}",
 "The tiled floor lines up in fours: ${_0x1bReal % 4 === 0} — block #${_0x1bReal}",
 "Floor checks line up in fours: ${_0x1bReal % 4 === 0} — tile #${_0x1bReal}")

P_('tile-pid',
 "The floor grid lines up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}",
 "Floor patterns line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}",
 "The floor grid lines up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}",
 "Floor tiles line up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}",
 "Floor checks line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}",
 "The tiled floor lines up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}",
 "The floor grid lines up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}",
 "Floor patterns line up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}",
 "Floor tiles line up in fours: ${_0xpid % 4 === 0} — tile #${_0xpid}",
 "Floor checks line up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}",
 "Floor patterns line up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}",
 "The tiled floor lines up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}",
 "Floor checks line up in fours: ${_0xpid % 4 === 0} — block #${_0xpid}",
 "The tiled floor lines up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}",
 "Floor tiles line up in fours: ${_0xpid % 4 === 0} — stone #${_0xpid}")

P_('drawer',
 "The drawer was reshuffled: ",
 "The drawer got re-sorted: ",
 "The flatware drawer was reshuffled: ",
 "Drawer contents were reordered: ",
 "The cutlery drawer was re-sorted: ",
 "Drawer order was redrawn: ",
 "The drawer was mixed up again: ",
 "Silverware in the drawer was reordered: ",
 "The drawer layout changed: ",
 "Drawer slots were reshuffled: ",
 "The drawer was given a new order: ",
 "Drawer items were rearranged: ",
 "The drawer contents were re-sorted: ",
 "Drawer arrangement was refreshed: ",
 "The drawer got a reshuffle: ")

P_('tidbits',
 "Notes for ${safeName} —  — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.",
 'Checking on ${safeName} —  — dough\'s got ~${Math.ceil((v.goal - v.cur) / 60)} to go.',
 "Notes for ${safeName} —  — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 "Checking on ${safeName} —  — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.",
 'Mulling over notes for ${safeName} —  — dough\'s got ~${Math.ceil((v.goal - v.cur) / 60)} to go.',
 "Watching the oven for ${safeName} —  — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 "Checking on ${safeName} —  — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 "Mulling over notes for ${safeName} —  — bread needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 "Keeping an eye on ${safeName} —  — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.",
 'Notes for ${safeName} —  — dough\'s got ~${Math.ceil((v.goal - v.cur) / 60)} to go.',
 'Watching the oven for ${safeName} —  — dough\'s got ~${Math.ceil((v.goal - v.cur) / 60)} to go.',
 "Mulling over notes for ${safeName} —  — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 "Checking on ${safeName} —  — dough needs ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 "Watching the oven for ${safeName} —  — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.",
 "Mulling over notes for ${safeName} —  — ~${Math.ceil((v.goal - v.cur) / 60)} minutes left on the dough.")

P_('stage',
 'Show\'s about to start —  — keep a window open in vc ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.',
 "Backstage lights on —  — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 'Curtain\'s up —  — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.',
 "The stage is set —  — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 'Curtain\'s up —  — keep a window open in vc ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.',
 "Lights are on backstage —  — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.",
 "Backstage lights on —  — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.",
 "Backstage lights on —  — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 'Curtain\'s up —  — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.',
 "The stage is set —  — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 'Show\'s about to start —  — keep vc live for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.',
 'Curtain\'s up —  — keep a window live in vc for ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.',
 "The stage is set —  — keep a window open in vc ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.",
 'Show\'s about to start —  — keep a window live in vc ~${Math.ceil((v.goal - v.cur) / 60)} min to go.',
 "Lights are on backstage —  — keep a window open in vc ~${Math.ceil((v.goal - v.cur) / 60)} more minutes.")

P_('coins',
 "Dropping coins in the cabinet —  (~${Math.ceil((v.goal - v.cur) / 60)} min).",
 "Running the cabinet —  — ~${Math.ceil((v.goal - v.cur) / 60)} min left.",
 "Feeding coins to the cabinet —  (~${Math.ceil((v.goal - v.cur) / 60)} more min).",
 "Feeding the cabinet coins —  (~${Math.ceil((v.goal - v.cur) / 60)} min).",
 "Feeding the cabinet coins —  — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.",
 "Dropping coins in the cabinet —  — ~${Math.ceil((v.goal - v.cur) / 60)} min left.",
 "Feeding coins to the cabinet —  — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.",
 "Feeding coins to the cabinet —  — ~${Math.ceil((v.goal - v.cur) / 60)} min left.",
 "Feeding the cabinet coins —  — ~${Math.ceil((v.goal - v.cur) / 60)} min left.",
 "Feeding the cabinet coins —  (~${Math.ceil((v.goal - v.cur) / 60)} more min).",
 "Feeding coins to the cabinet —  (~${Math.ceil((v.goal - v.cur) / 60)} min).",
 "Running the cabinet —  (~${Math.ceil((v.goal - v.cur) / 60)} min).",
 "Dropping coins in the cabinet —  — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.",
 "Dropping coins in the cabinet —  (~${Math.ceil((v.goal - v.cur) / 60)} more min).",
 "Coins into the cabinet —  — about ${Math.ceil((v.goal - v.cur) / 60)} min to go.")

P_('memo',
 "Note slid under the door — shift started.",
 "Memo slipped under the door — shift started.",
 "A note went under the door — running.",
 "Shift started — note under the door.",
 "Door note dropped — shift is on.",
 "Under the door: note in — shift started.",
 'Memo under the door — shift\'s going.',
 'Note\'s under the door — shift underway.',
 "Shift started (note under the door).",
 "Dropped the memo — shift started.",
 "The note is in — shift started.",
 "Note through the slot — shift started.",
 "Shift started — memo delivered.",
 "Under the door it went — shift started.",
 "Started the shift (memo under door).")

P_('trail-moved',
 "Trail marker moved —  — staying put.",
 "Moved off the main trail —  — parked here.",
 "Trail marker shifted —  — holding still.",
 "Paused on the trail —  — holding still.",
 "Moved off the main trail —  — holding still.",
 "Paused on the trail —  — parked here.",
 "Stepped off the trail —  — holding for now.",
 "Moved off the main trail —  — holding for now.",
 "Stepped off the trail —  — holding still.",
 "Stepped off the trail —  — staying put.",
 "Paused on the trail —  — holding for now.",
 "Paused on the trail —  — staying put.",
 "Trail marker shifted —  — holding for now.",
 "Trail marker shifted —  — holding position.",
 "Trail marker shifted —  — staying put.")

P_('trail-back',
 "Returned to the trail —  — resuming the run.",
 "Back on the main trail —  — resuming.",
 "Back on the trail —  — picking up again.",
 "Returned to the trail —  — picking up again.",
 "Back on the trail —  — resuming.",
 "On the trail again —  — resuming.",
 "On the trail again —  — resuming the run.",
 "Returned to the trail —  — moving again.",
 "Back to the trail —  — resuming the run.",
 "On the trail again —  — on the move again.",
 "Back on the trail —  — resuming the run.",
 "Back to the trail —  — on the move again.",
 "Back to the trail —  — resuming.",
 "Back to the trail —  — moving again.",
 "Back on the main trail —  — resuming the run.")

P_('drawn',
 "Blinds drawn —  — going the slow way.",
 "Curtains drawn —  — easing off for now.",
 "Panels drawn —  — taking the long road.",
 "Curtains drawn —  — taking the long road.",
 "Coverings drawn —  — taking the long road.",
 "Blinds drawn —  — taking the long road.",
 "Shades drawn —  — easing off for now.",
 "Coverings drawn —  — taking the long hallway.",
 "Panels drawn —  — keeping quiet for a bit.",
 "Blinds drawn —  — keeping quiet for a bit.",
 "Coverings drawn —  — easing off for now.",
 "Panels drawn —  — going the slow way.",
 "Blinds drawn —  — easing off for now.",
 "Shades drawn —  — keeping quiet for a bit.",
 "Coverings drawn —  — keeping quiet for a bit.")

P_('open',
 "Blinds open —  — resuming at pace.",
 "Shades open —  — back at full speed.",
 "Panels open —  — resuming at pace.",
 "Panels open —  — back at full speed.",
 "Shades open —  — resuming at pace.",
 "Curtains open —  — back on it.",
 "Coverings open —  — back to normal.",
 "Blinds open —  — back to normal.",
 "Panels open —  — back to normal.",
 "Coverings open —  — back at full speed.",
 "Blinds open —  — back on it.",
 "Curtains open —  — back on the main road.",
 "Blinds open —  — back at full speed.",
 "Curtains open —  — back at full speed.",
 "Coverings open —  — back on it.")

P_('gate-missing',
 "A pocket came up empty —  — stopping here.",
 "The pocket check failed —  — stopping here.",
 "A pocket was missing —  — clocking out.",
 'Pockets didn\'t check out —  — clocking out.',
 "The pockets came up empty —  — calling it a day.",
 "A pocket was missing —  — stopping here.",
 "The pockets came up empty —  — heading home.",
 "Pockets checked out empty —  — clocking out.",
 "A pocket was missing —  — ending the run.",
 "Pockets checked out empty —  — heading home.",
 'Pockets didn\'t check out —  — stopping here.',
 "The pocket check failed —  — calling it a day.",
 'Pockets didn\'t check out —  — shutting down.',
 "A pocket came up empty —  — calling it a day.",
 "The pocket check failed —  — ending the run.")

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

open('/tmp/o843-lex.js', 'w', encoding='utf-8').write(src)
print('lexicon pass written; bytes', len(src))
