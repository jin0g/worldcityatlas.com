# Project Instructions

## Goal

Build a static visual city atlas under this directory. The site uses an editorial importance ranking rather than pure GDP order, while still treating economic power as one major dimension. Each page must explain more than economics: geopolitics, industry, labor, culture, religion, everyday life, tourism, heritage, conflict, social problems, and urban form should all be visible.

## Persistent Instructions

- When the user writes an instruction beginning with `永続：`, append or incorporate that instruction into this `AGENTS.md`.
- This rule is itself persistent: future `永続：` instructions must also be recorded in `AGENTS.md`.
- When committing, make sure junk files such as `.DS_Store` and the `_ai/` directory are not included.
- Include Google Analytics / Google tag `G-90EK6260ZV` on every page. It may be injected from `common.js` so future pages inherit it automatically.

## Architecture

- Use ordinary static HTML for page content.
- Do not render city page body content with JavaScript.
- `common.css` is allowed and should hold shared visual styles.
- `common.js` is allowed for the shared header, footer, and the Google tag injection.
- The shared header should be hierarchical and interactive, for example `アジア -> 日本 -> 東京`.
- The shared footer should be centered and read `© WORLD CITY ATLAS 2026`.
- City-specific statistics, prose, sections, and layout belong directly in each city page HTML.
- Keep each city at `slug/index.html`.
- City images belong inside the same city directory, for example:
  - `tokyo/header.png`
  - `tokyo/street.png`
- Do not create an `assets/` directory.

## City Set And Order

- Implement cities in the editorial importance order tracked in `TODO.md`.
- The editorial order starts with New York, Tokyo, London, and Paris, then mixes economic gravity with religion, politics, conflict, culture, world heritage, regional representation, everyday life, and social importance.
- The GDP ranking remains reference material, not the implementation order.
- Use simple readable city names and slugs based on the most representative city, not the full metropolitan-area label. Examples:
  - `Greater Tokyo Area` -> `tokyo`
  - `New York-Newark-Jersey City, NY-NJ-PA` -> `new-york`
  - `Los Angeles-Long Beach-Anaheim` -> `los-angeles`
  - `Kyoto–Osaka–Kobe` -> `osaka`
  - `Washington-Arlington-Alexandria` -> `washington-dc`
- Visible page titles should say `大阪`, not `京阪神`; `東京`, not `Greater Tokyo Area`; `ニューヨーク`, not the full MSA name.
- The final atlas target is 200 cities: the initial 100-city set plus 100 additional editorially selected cities important for tourism, culture, religion, daily life, conflict, world heritage, indigenous or minority history, climate risk, and social understanding.

## Page Requirements

Each city page should include:

- A strong first-viewport hero using `header.png`.
- Common statistics near the top:
  - population
  - area
  - climate
  - main industries
  - country or region and flag where applicable
  - rank or national role
  - GDP and GDP per capita where available from the supplied list
- Multiple distinct content sections, not one oversized long-read section.
- Sections should be adapted to the city. Good section types include:
  - geography and strategic position
  - political role
  - industry and labor
  - port, rail, airport, or logistics
  - religion and ritual life
  - culture, media, food, and education
  - housing and daily life
  - tourism, landmarks, and heritage
- Use visual rhythm: stats strips, split image/text sections, wide image bands, compact fact blocks, and varied section layouts.
- Avoid dumping all explanation into a single "deep read" or "long read" block.
- Pay attention to Japanese line breaks. Avoid awkward one-character splits inside important heading words such as `景観`.
- Mobile layout is required. Headings, navigation, stats, and cards must remain readable on small screens.

## Writing Rules

- Do not quote prose from websites.
- Explanatory text must be original writing.
- Statistical values may be based on the user-provided GDP ranking list and other checked data when needed.
- The GDP ranking is economic, but pages must not become only business or finance pages.
- Write in Japanese unless the user asks otherwise.
- The prose should be detailed and useful, but divided into readable sections.
- For city pages, target at least 4000 Japanese characters in the main explanatory body text, counted from normal prose paragraphs only. Do not count scripts, navigation, labels, stats, metadata, or footer text toward this target.
- Before finalizing generated city prose, run a local script to verify each main prose section is 950-1050 Japanese characters where that section is intended to carry body text. Check only the Japanese prose itself, not scripts, navigation, labels, stats, metadata, or footer text.
- Tokyo is the template city page. Prefer a 10000 Japanese character target for full city pages where the city has enough topics.
- A full city page should normally have 10 prose sections: four common sections for geopolitics, industry and labor, culture and religion, and daily life and tourism, plus six city-specific sections. Use fewer only when the city truly lacks enough distinct topics; use more when the city needs them.
- Each main prose section should be around 1000 Japanese characters and should avoid creating large empty visual gaps. Prefer one continuous prose paragraph per counted section unless the layout clearly benefits from subdivision.
- Each main prose section should ideally include one small representative image. Images may be temporary Python-generated placeholders until the local AI image pipeline produces final assets.
- Top mini sections such as geopolitics, industry and labor, culture and religion, and daily life and tourism should be concise, 100 Japanese characters plus or minus 2 characters each. Do not count these mini sections toward the 950-1050 character main-section check.
- The short stat texts for climate, main industries, and main tourism must be exactly 24 Japanese-visible characters each, including punctuation. Apply this to every city.
- Record layout and content instructions in this file as they are given, and periodically re-read this file while working.
- Tokyo's page layout is the current template: shared site header, large hero city image with city name, overview stats, short city catchphrase, four mini sections, then main prose sections.
- Main prose sections should not use a vertical split with a separate heading/caption column. Instead, each section starts with one wide horizontal image. Overlay the section eyebrow and title on the image, then place the prose body below it.
- Do not include a standalone "Image Plan" gallery on city pages. Planned or generated images should be used directly in the relevant sections, exactly one section image per main prose section where possible.
- Remove small catchcopy paragraphs from main section headings when using the wide image overlay style; the prose should flow from the image/title into the body text.
- City page body text must not mention that the page, images, prose, or site are generated by AI. Avoid production-side meta commentary such as "this page", "future pages", "this template", "we will use this as a standard", or other explanations about how the site is being made.
- Main section image headers should be wide but not overly tall. Use roughly three-fifths of the previous tall image-band height, slightly more than half the viewport feel.

## Image Rules

- Do not use images downloaded from the web.
- Images should be generated locally with open-source AI where possible.
- `_ai/` contains the local generation environment.
- Prefer high-quality open-source image generation on the local NVIDIA GPUs.
- Current primary target: `black-forest-labs/FLUX.2-dev` via Hugging Face Diffusers after Hugging Face login and model terms acceptance.
- Default generation strategy is one GPU first; retry with multi-GPU `device_map` only when memory is insufficient.
- If FLUX is unavailable or too slow, use a local open-source fallback such as SDXL.
- Generate multiple candidates for important assets.
- Visually inspect generated candidates before adopting them.
- Final adopted images must be copied into each city directory as `header.png`, `street.png`, or another simple role name.
- `street.png` should be a Python-generated geometric illustration representing the city's character, not an AI photo.
- No image may contain embedded text, lettering, labels, logos, captions, or readable signs. This applies to both Python-generated images and AI-generated images. Section titles and labels must be HTML overlay text, not pixels inside the image.

## Current Implementation State

- `index.html` and city pages use `common.js` only for header/footer.
- City body content is static HTML in each page.
- `common.css` includes shared header, footer, hero, stat, card, split, section, and route styles.
- Other city pages may still need conversion from older JS-rendered placeholders to static HTML.
- `TODO.md` tracks the editorial implementation ranking and keeps GDP ranking as reference material.
