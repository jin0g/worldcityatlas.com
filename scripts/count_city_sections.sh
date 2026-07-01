#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "usage: $0 CITY_SLUG" >&2
  exit 2
fi

python3 - "$1" <<'PY'
from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path

slug = sys.argv[1]
path = Path(slug) / "index.html"
if not path.exists():
    raise SystemExit(f"not found: {path}")

JP_RE = re.compile(r"[\u3040-\u30ff\u3400-\u9fff々〆〤ぁ-んァ-ヶー、。！？「」・]+")
EXCLUDED = {"eyebrow", "tag-row", "stat", "fact-strip", "site-footer", "gallery-intro", "story-block"}


class SectionCounter(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.stack: list[tuple[str, set[str], str | None]] = []
        self.current: str | None = None
        self.capture = False
        self.buf: list[str] = []
        self.sections: dict[str, list[str]] = {}

    def handle_starttag(self, tag: str, attrs_raw) -> None:
        attrs = dict(attrs_raw)
        cls = set(attrs.get("class", "").split())
        name = attrs.get("data-count-section")
        if tag in {"section", "div", "article"}:
            self.stack.append((tag, cls, name))
            if name:
                self.current = name
        elif self.stack:
            self.stack.append((tag, cls, None))

        if tag == "p" and self.current:
            all_classes = set().union(*(classes for _, classes, _ in self.stack))
            if not (all_classes & EXCLUDED):
                self.capture = True
                self.buf = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "p" and self.capture:
            text = "".join(self.buf).strip()
            if text and self.current:
                self.sections.setdefault(self.current, []).append(text)
            self.capture = False
            self.buf = []

        if self.stack:
            popped = self.stack.pop()
            if popped[2] and popped[2] == self.current:
                self.current = next((name for _, _, name in reversed(self.stack) if name), None)

    def handle_data(self, data: str) -> None:
        if self.capture:
            self.buf.append(data)


parser = SectionCounter()
parser.feed(path.read_text(encoding="utf-8"))

total = 0
for name, parts in parser.sections.items():
    text = "".join(parts)
    count = sum(len(match) for match in JP_RE.findall(text))
    total += count
    status = "OK" if 950 <= count <= 1050 else "NG"
    print(f"{name}\t{count}\t{status}")

print(f"TOTAL\t{total}")
PY
