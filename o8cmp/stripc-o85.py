# -*- coding: utf-8 -*-
# stripc-o85.py — remove ALL comments from a shipped JS file, byte-preserving
# everything else. Token-aware: strings (' " ` incl. ${} expr nesting), regex
# literals (heuristic by preceding token), // line and /* */ block comments.
# Usage: python3 stripc-o85.py in.js out.js   (or --overwrite for piece files)
import sys

def is_regex_start(prev_code):
    if prev_code == '':
        return True
    ch = prev_code[-1]
    if ch.isspace():
        # look back through whitespace to last token char
        i = len(prev_code) - 1
        while i >= 0 and prev_code[i].isspace():
            i -= 1
        ch = prev_code[i]
        if ch.isalnum() or ch in '_$':
            # keyword check: token before ws
            j = i
            while j >= 0 and (prev_code[j].isalnum() or prev_code[j] in '_$'):
                j -= 1
            tok = prev_code[j + 1:i + 1]
            return tok in ('return', 'typeof', 'case', 'in', 'of', 'new', 'delete',
                           'void', 'do', 'else', 'instanceof', 'yield', 'await')
        return ch in '=([{,;:!?&|+-*%<>^~'
    if ch.isalnum() or ch in '_$)' or ch in '\'"`]':
        return False
    return True

def strip_comments(text):
    out = []
    i = 0
    n = len(text)
    line_start = True
    prev = []  # previous emitted significant code chars (for regex heuristic)
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ''
        if c == '/' and nxt == '/':
            # line comment
            j = text.find('\n', i)
            if j < 0:
                break
            out.append('\n')
            i = j + 1
            prev = []
            continue
        if c == '/' and nxt == '*':
            j = text.find('*/', i + 2)
            if j < 0:
                raise SystemExit('unterminated block comment')
            i = j + 2
            continue
        if c == '"' or c == "'":
            q = c
            j = i + 1
            while j < n:
                if text[j] == '\\':
                    j += 2
                    continue
                if text[j] == q:
                    break
                j += 1
            if j >= n:
                raise SystemExit('unterminated string at ' + str(i))
            seg = text[i:j + 1]
            out.append(seg)
            prev += seg
            i = j + 1
            continue
        if c == '`':
            j = i + 1
            while j < n:
                ch = text[j]
                if ch == '\\':
                    j += 2
                    continue
                if ch == '`':
                    break
                if ch == '$' and text[j + 1:j + 2] == '{':
                    # scan template expression (strings/braces aware; no nested templates)
                    j += 2
                    d = 1
                    while j < n and d:
                        cc = text[j]
                        if cc == '\\':
                            j += 2
                            continue
                        if cc == '"' or cc == "'":
                            qq = cc
                            j += 1
                            while j < n:
                                if text[j] == '\\':
                                    j += 2
                                    continue
                                if text[j] == qq:
                                    break
                                j += 1
                        elif cc == '{':
                            d += 1
                        elif cc == '}':
                            d -= 1
                        j += 1
                    if d:
                        raise SystemExit('unterminated template ${ at ' + str(j))
                    continue
                j += 1
            if j >= n:
                raise SystemExit('unterminated template at ' + str(i))
            seg = text[i:j + 1]
            out.append(seg)
            prev += seg
            i = j + 1
            continue
        if c == '/' and is_regex_start(''.join(prev)):
            j = i + 1
            in_class = False
            while j < n:
                ch = text[j]
                if ch == '\\':
                    j += 2
                    continue
                if ch == '[' and not in_class:
                    in_class = True
                elif ch == ']' and in_class:
                    in_class = False
                elif ch == '/' and not in_class:
                    break
                j += 1
            if j >= n:
                raise SystemExit('unterminated regex at ' + str(i))
            seg = text[i:j + 1]
            out.append(seg)
            prev += seg
            i = j + 1
            continue
        out.append(c)
        if not c.isspace():
            prev.append(c)
        i += 1
    return ''.join(out)

def main():
    args = sys.argv[1:]
    if not args:
        raise SystemExit('usage: stripc-o85.py in.js out.js')
    src = open(args[0], encoding='utf-8').read()
    res = strip_comments(src)
    open(args[1], 'w', encoding='utf-8').write(res)
    print('stripped %s -> %s (%d -> %d bytes)' % (args[0], args[1], len(src), len(res)))

if __name__ == '__main__':
    main()
