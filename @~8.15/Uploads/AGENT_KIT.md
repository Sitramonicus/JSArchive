# AGENT KIT: attach this file to any new Arena chat

## For you (the human): how to use this
1. Start a new chat and attach this file.
2. Type: **"Read AGENT_KIT.md and follow it."**
3. If you have a handoff from an older chat, paste it in or attach it too.

That's it. The agent does the rest.

---

## For the agent: instructions

You are continuing work that may span several chats. Your memory is limited, so follow these rules.

### Step 1: Set up (do this first, silently)
Save the Python script at the bottom of this file to `agent/s1.py`. Then run:
```bash
mkdir -p agent && pip install -q fastembed numpy && python3 agent/s1.py index
```
If a `MEMORY.md` or `HANDOFF.md` was provided (pasted or attached), save them into `agent/`. Then run
`python3 agent/s1.py boot` and read the output before doing anything else.
If the setup fails (for example, no bash tool), skip the script and still follow Steps 2–4 by hand.

### Step 2: Save memory while working
- **Before opening big files**, run `python3 agent/s1.py recall "what you need"` and read only the sections it returns.
- **For simple pick-one decisions**, run `python3 agent/s1.py choose "situation" -o "option A" "option B"`.
  If it abstains or the margin is below 0.2, think it through yourself instead.
- **Before risky commands** (deleting files, force-pushing, sudo), run `python3 agent/s1.py guard "command"`.
  If it says CONFIRM, ask the user first. If it says BLOCK, don't run it.
- **When you learn something lasting** (a user preference, a key decision, a gotcha), run `python3 agent/s1.py remember "fact"`.

### Step 3: Keep a handoff up to date
After each major milestone, and whenever the chat is getting long, overwrite `agent/HANDOFF.md` using this template:

```markdown
# Handoff
**Goal:**
**Decisions made (and why):**
**Files and their current state:**
**Done:**
**Remaining:**
**Dead ends (don't retry):**
**Next 3 steps:**
```

### Step 4: Before the chat runs out
When the conversation is long, or the user asks for a handoff:
1. Update `agent/HANDOFF.md`.
2. **Print the full contents of MEMORY.md and HANDOFF.md in the chat** so the user can copy them.
3. Tell the user: "Start a new chat, attach AGENT_KIT.md, paste the text above, and say 'continue from this.'"

---

## The script: save as `agent/s1.py`

```python
#!/usr/bin/env python3
"""
s1.py - a tiny CPU "System One" helper for agents working in this workspace.

Same primitive as CLM (embed state + candidates, dot product, softmax), but using a
small off-the-shelf embedding model (bge-small, 33M params) instead of a trained
state/action encoder. Probabilities are NOT calibrated like Jev's; treat them as
rankings with a rough confidence signal.

Commands
  boot                      Compact brief for a fresh agent: memory + handoff + index stats
  index                     (Re)index workspace text files (incremental, by mtime)
  recall "query" [-k N]     Return only the most relevant chunks (context triage)
  choose "state" -o A B C   Rank options for a decision; abstains if nothing fits
  guard "shell command"     Rule-based risk check before running a command
  remember "fact"           Append a durable fact to MEMORY.md
"""
import argparse, json, os, re, sys, time, hashlib
from pathlib import Path

ROOT = Path("/home/user")
AGENT = ROOT / "agent"
IDX = AGENT / "index"
MEMORY = AGENT / "MEMORY.md"
HANDOFF = AGENT / "HANDOFF.md"
MODEL = "BAAI/bge-small-en-v1.5"
CACHE = "/tmp/fastembed"          # model weights (re-downloaded per session, ~65MB)

SKIP_DIRS = {".git", "node_modules", ".venv", "venv", "__pycache__", "dist", "build",
             ".next", ".cache", "Unselected files", "index", "target", "out", "coverage"}
TEXT_EXT = {".md", ".txt", ".py", ".js", ".ts", ".tsx", ".jsx", ".html", ".css", ".json",
            ".yaml", ".yml", ".toml", ".sh", ".csv", ".sql", ".go", ".rs", ".java", ".c",
            ".cpp", ".h", ".rb", ".php", ".svelte", ".vue", ".ini", ".cfg"}
CHUNK_LINES, OVERLAP, MAX_FILE_BYTES = 40, 8, 400_000

_model = None
def model():
    global _model
    if _model is None:
        try:
            from fastembed import TextEmbedding
        except ImportError:
            sys.exit("fastembed not installed. Run: pip install fastembed numpy")
        _model = TextEmbedding(MODEL, cache_dir=CACHE)
    return _model

def np():
    import numpy
    return numpy

def emb_passages(texts):
    return np().array(list(model().passage_embed(texts)), dtype="float32")

def emb_query(text):
    return np().array(list(model().query_embed([text]))[0], dtype="float32")

def softmax(x, t):
    n = np(); z = (x - x.max()) / t; e = n.exp(z); return e / e.sum()

# ---------------------------------------------------------------- index / recall
def iter_files():
    for dp, dns, fns in os.walk(ROOT):
        dns[:] = [d for d in dns if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in fns:
            p = Path(dp) / fn
            if p.suffix.lower() in TEXT_EXT and p.stat().st_size <= MAX_FILE_BYTES:
                yield p

def chunk(path):
    try:
        lines = path.read_text(errors="ignore").splitlines()
    except Exception:
        return []
    out, step = [], CHUNK_LINES - OVERLAP
    for s in range(0, max(len(lines), 1), step):
        body = "\n".join(lines[s:s + CHUNK_LINES]).strip()
        if body:
            out.append((s + 1, min(s + CHUNK_LINES, len(lines)), body))
        if s + CHUNK_LINES >= len(lines):
            break
    return out

def load_index():
    meta_p, vec_p = IDX / "meta.json", IDX / "vecs.npy"
    if meta_p.exists() and vec_p.exists():
        return json.loads(meta_p.read_text()), np().load(vec_p)
    return {"files": {}, "chunks": []}, np().zeros((0, 384), dtype="float32")

def cmd_index(quiet=False):
    n = np(); IDX.mkdir(parents=True, exist_ok=True)
    meta, vecs = load_index()
    current = {str(p.relative_to(ROOT)): p.stat().st_mtime for p in iter_files()}
    keep = [i for i, c in enumerate(meta["chunks"])
            if c["file"] in current and meta["files"].get(c["file"]) == current[c["file"]]]
    fresh_files = [f for f, m in current.items() if meta["files"].get(f) != m]
    new_chunks = []
    for f in fresh_files:
        for a, b, body in chunk(ROOT / f):
            new_chunks.append({"file": f, "start": a, "end": b, "text": body})
    chunks = [meta["chunks"][i] for i in keep] + new_chunks
    base = vecs[keep] if len(keep) else n.zeros((0, 384), dtype="float32")
    if new_chunks:
        texts = [f"{c['file']} L{c['start']}-{c['end']}\n{c['text']}" for c in new_chunks]
        base = n.vstack([base, emb_passages(texts)])
    meta = {"files": current, "chunks": chunks, "built": time.strftime("%Y-%m-%d %H:%M")}
    (IDX / "meta.json").write_text(json.dumps(meta))
    n.save(IDX / "vecs.npy", base)
    if not quiet:
        print(f"indexed {len(current)} files, {len(chunks)} chunks "
              f"({len(fresh_files)} files re-embedded)")

def cmd_recall(query, k=5, max_chars=900):
    cmd_index(quiet=True)
    meta, vecs = load_index()
    if not len(vecs):
        print("index empty"); return
    sims = vecs @ emb_query(query)
    order = sims.argsort()[::-1]
    shown, seen = 0, set()
    for i in order:
        c = meta["chunks"][i]
        key = (c["file"], c["start"] // CHUNK_LINES)
        if key in seen:
            continue
        seen.add(key)
        txt = c["text"] if len(c["text"]) <= max_chars else c["text"][:max_chars] + " …"
        print(f"── {c['file']}  L{c['start']}-{c['end']}  (sim {sims[i]:.3f})\n{txt}\n")
        shown += 1
        if shown >= k:
            break

# ---------------------------------------------------------------- choose
def cmd_choose(state, options, temp=0.05, abstain_below=0.45):
    qs = emb_query(state)
    ov = emb_passages(options)
    sims = ov @ qs
    probs = softmax(sims, temp)
    order = probs.argsort()[::-1]
    top, second = order[0], order[1] if len(order) > 1 else order[0]
    margin = float(probs[top] - probs[second])
    abstain = float(sims[top]) < abstain_below
    result = {
        "choice": None if abstain else options[top],
        "abstained": abstain,
        "confidence": round(float(probs[top]), 3),
        "margin": round(margin, 3),
        "ranking": [{"option": options[i], "p": round(float(probs[i]), 3),
                     "sim": round(float(sims[i]), 3)} for i in order],
        "note": "uncalibrated; low margin (<0.2) => escalate to full reasoning",
    }
    print(json.dumps(result, indent=2))

# ---------------------------------------------------------------- guard
RULES = [  # (pattern, level, reason)
    (r"\brm\s+(-[a-z]*r[a-z]*f|-[a-z]*f[a-z]*r)\b.*(\s/|\s~|\s\*|\s\.\s*$|\$HOME)", "BLOCK", "recursive force delete of broad path"),
    (r"\brm\s+-[a-z]*r", "CONFIRM", "recursive delete"),
    (r"\bmkfs\b|\bdd\s+if=.*of=/dev/", "BLOCK", "disk-level write"),
    (r"git\s+push\s+.*(--force|-f\b)", "CONFIRM", "force push rewrites remote history"),
    (r"git\s+(reset\s+--hard|clean\s+-[a-z]*f)", "CONFIRM", "discards local changes"),
    (r"(curl|wget)[^|]*\|\s*(sudo\s+)?(ba|z)?sh", "CONFIRM", "pipes remote script into shell"),
    (r"\bchmod\s+(-R\s+)?777\b", "CONFIRM", "world-writable permissions"),
    (r"\b(DROP|TRUNCATE)\s+(TABLE|DATABASE)\b|\bDELETE\s+FROM\s+\w+\s*;?\s*$", "CONFIRM", "destructive SQL"),
    (r">\s*(/home/user/)?agent/(MEMORY|HANDOFF)\.md", "CONFIRM", "overwrites agent memory (use >>)"),
    (r"\b(printenv|env)\b.*\|\s*(curl|nc)|\.git/config|\.netrc|id_rsa", "BLOCK", "possible credential exfiltration"),
    (r"\bsudo\b", "CONFIRM", "elevated privileges"),
    (r":\(\)\s*\{\s*:\|:&\s*\};:", "BLOCK", "fork bomb"),
]
def cmd_guard(command):
    hits = [(lvl, why) for pat, lvl, why in RULES if re.search(pat, command, re.I)]
    level = "BLOCK" if any(l == "BLOCK" for l, _ in hits) else "CONFIRM" if hits else "ALLOW"
    print(json.dumps({"decision": level, "reasons": [w for _, w in hits]}, indent=2))
    sys.exit({"ALLOW": 0, "CONFIRM": 10, "BLOCK": 20}[level])

# ---------------------------------------------------------------- memory / boot
def cmd_remember(fact):
    with MEMORY.open("a") as f:
        f.write(f"- [{time.strftime('%Y-%m-%d')}] {fact.strip()}\n")
    print("saved to agent/MEMORY.md")

def cmd_boot():
    print("=== MEMORY.md ===")
    print(MEMORY.read_text() if MEMORY.exists() else "(none)")
    print("\n=== HANDOFF.md ===")
    print(HANDOFF.read_text() if HANDOFF.exists() else "(none)")
    meta, vecs = load_index() if (IDX / "meta.json").exists() else ({"files": {}, "chunks": []}, [])
    print(f"\n=== index: {len(meta['files'])} files, {len(meta['chunks'])} chunks, "
          f"built {meta.get('built', 'never')} ===")
    print("Use `recall` before opening large files.")

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    sp.add_parser("boot"); sp.add_parser("index")
    r = sp.add_parser("recall"); r.add_argument("query"); r.add_argument("-k", type=int, default=5)
    c = sp.add_parser("choose"); c.add_argument("state"); c.add_argument("-o", "--options", nargs="+", required=True)
    c.add_argument("--temp", type=float, default=0.05); c.add_argument("--abstain-below", type=float, default=0.45)
    g = sp.add_parser("guard"); g.add_argument("command")
    m = sp.add_parser("remember"); m.add_argument("fact")
    a = ap.parse_args()
    {"boot": cmd_boot, "index": cmd_index,
     "recall": lambda: cmd_recall(a.query, a.k),
     "choose": lambda: cmd_choose(a.state, a.options, a.temp, a.abstain_below),
     "guard": lambda: cmd_guard(a.command),
     "remember": lambda: cmd_remember(a.fact)}[a.cmd]()

if __name__ == "__main__":
    main()
```
