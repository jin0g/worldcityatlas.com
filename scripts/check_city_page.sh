#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "usage: $0 CITY_SLUG" >&2
  exit 2
fi

slug="$1"
html="$slug/index.html"

if [ ! -f "$html" ]; then
  echo "not found: $html" >&2
  exit 2
fi

"$(dirname "$0")/count_city_sections.sh" "$slug"

python3 - "$html" <<'PY'
from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path

path = Path(sys.argv[1])
JP_RE = re.compile(r"[\u3040-\u30ff\u3400-\u9fff々〆〤ぁ-んァ-ヶー、。！？「」・]+")


class PageCheck(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_stat = False
        self.stat_label = ""
        self.stat_value = ""
        self.in_story = False
        self.story_title = ""
        self.capture: str | None = None
        self.buf: list[str] = []
        self.stats: list[tuple[str, str]] = []
        self.stories: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs_raw) -> None:
        attrs = dict(attrs_raw)
        cls = set(attrs.get("class", "").split())
        if tag == "div" and "stat" in cls:
            self.in_stat = True
            self.stat_label = ""
            self.stat_value = ""
        elif self.in_stat and tag in {"span", "strong"}:
            self.capture = f"stat-{tag}"
            self.buf = []
        elif tag == "article" and "story-block" in cls:
            self.in_story = True
            self.story_title = ""
        elif self.in_story and tag in {"h2", "p"}:
            self.capture = f"story-{tag}"
            self.buf = []

    def handle_endtag(self, tag: str) -> None:
        if self.capture:
            text = "".join(self.buf).strip()
            if self.capture == "stat-span":
                self.stat_label = text
            elif self.capture == "stat-strong":
                self.stat_value = text
            elif self.capture == "story-h2":
                self.story_title = text
            elif self.capture == "story-p":
                self.stories.append((self.story_title, text))
            self.capture = None
            self.buf = []

        if tag == "div" and self.in_stat:
            self.stats.append((self.stat_label, self.stat_value))
            self.in_stat = False
        elif tag == "article" and self.in_story:
            self.in_story = False

    def handle_data(self, data: str) -> None:
        if self.capture:
            self.buf.append(data)


parser = PageCheck()
parser.feed(path.read_text(encoding="utf-8"))

failed = False

print("STAT_24")
for label, value in parser.stats:
    if label in {"気候", "主な産業", "主な観光"}:
        status = "OK" if len(value) == 24 else "NG"
        failed = failed or status == "NG"
        print(f"{label}\t{len(value)}\t{status}\t{value}")

print("MINI_SECTIONS")
for title, text in parser.stories:
    count = sum(len(match) for match in JP_RE.findall(text))
    status = "OK" if 170 <= count <= 230 else "NG"
    failed = failed or status == "NG"
    print(f"{title}\t{count}\t{status}")

raise SystemExit(1 if failed else 0)
PY
