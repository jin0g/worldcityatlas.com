# Project Instructions

## Goal

Build a static visual city atlas under this directory. The site uses an editorial importance ranking rather than pure GDP order, while still treating economic power as one major dimension. Each page must explain more than economics: geopolitics, industry, labor, culture, religion, everyday life, tourism, heritage, conflict, social problems, and urban form should all be visible.

## Persistent Instructions

- When the user writes an instruction beginning with `永続：`, append or incorporate that instruction into this `AGENTS.md`.
- This rule is itself persistent: future `永続：` instructions must also be recorded in `AGENTS.md`.
- When committing, make sure junk files such as `.DS_Store` and the `_ai/` directory are not included.
- When preparing uploaded or published site files, do not include auxiliary project files or working directories: `_ai/`, `scripts/`, `.gitignore`, `AGENTS.md`, and `TODO.md`.
- Do not use `git add .`. Always stage files manually by naming every path explicitly.
- Update `TODO.md` continuously as implementation order, added cities, priority pruning, and progress change. Keep it as the local planning source of truth.
- Include Google Analytics / Google tag `G-90EK6260ZV` on every page. It may be injected from `common.js` so future pages inherit it automatically.
- Commit and push `AGENTS.md` and `TODO.md` whenever they are updated.
- Do not show `世界都市ランキング`, ranking numbers, or ranking labels on existing or future city pages. The editorial order may remain internal in `TODO.md` and index ordering, but city pages should not display it as a ranking.
- Starting at item 201 in `TODO.md`, include every sovereign country's capital that is not already present in the earlier editorial city list. Add missing national capitals progressively while preserving the current scored implementation order.
- Keep local AI image generation from becoming idle. Because GPU image generation is the bottleneck, keep image queues flowing continuously whenever possible, use both GPUs with parallel city batches, and do writing, implementation, validation, visual inspection, and sub-agent work in parallel while images generate. Aim to keep both GPUs as close to fully utilized as practical until the remaining city images are complete.
- For every current and future city page, source country/region, national, regional, and city statistics, population, area, GDP, and GDP per capita from searched current data rather than memory or old placeholder lists. Use the latest available public figures found at implementation or audit time, and calculate yen figures using the exchange rate for the working date. Display GDP in `兆円` and GDP per capita in `万円`. Re-audit already implemented pages progressively and correct older or weakly sourced statistics.
- National data, including country population, country area, national GDP, and national GDP per capita, must always use the latest data found by search at implementation or audit time. GDP values must be converted with the working-date exchange rate and displayed in `兆円`; per-capita GDP must be displayed in `万円`.
- City and national statistics must be searched and verified before publication: country/region data, population, area, GDP, and GDP per capita must use the latest data available on the working date, with the source and scope noted in the page comment where practical. GDP is always shown in `兆円`; GDP per capita is always shown in `万円`; both must be calculated from the same-day exchange rate. Already implemented pages must be audited once against this rule and corrected if older values, unclear scopes, or stale exchange rates remain.
- For country statistics and city statistics alike, population, area, GDP, and GDP per capita must be obtained from searched current sources rather than carried over from older placeholders. Use the newest figures available on the working date, convert GDP values using that day's exchange rate, show GDP in `兆円`, and show GDP per capita in `万円`. Existing implemented pages must be reviewed against this rule and corrected progressively.
- For national data specifically, country population, country area, national GDP, and national GDP per capita must always be searched and refreshed from the latest available data before use. Convert GDP values to yen using the exchange rate available for the working date, show GDP in `兆円`, show GDP per capita in `万円`, and progressively audit already implemented pages for the same standard.
- For national data specifically, country population, country area, national GDP, and national GDP per capita must use the latest figures found through search on the working day. GDP conversions must use the exchange rate as of that day whenever available; if the exact day is a weekend or market holiday, use the latest available official or credible rate and note the date/scope in the page comment. Display GDP in `兆円` and GDP per capita in `万円`. Audit already implemented pages once against this rule.
- For country, national, regional, and city statistics, population, area, GDP, and GDP per capita must be checked through search using the newest available data at implementation or audit time. GDP must be converted with the working-day exchange rate, or the latest available rate when the working day is a weekend or holiday, and displayed in `兆円`; GDP per capita must be displayed in `万円`. Existing implemented pages should be audited progressively against this rule.
- Country-level data used on any page, including population, area, GDP, and GDP per capita, must be searched and verified from the latest available sources before use. GDP must be converted using the exchange rate available on the working date and displayed in `兆円`; GDP per capita must be displayed in `万円`. Previously implemented pages must be audited once against this standard and corrected where the values, scope, units, or exchange-rate basis are unclear or stale.
- National statistics used on city pages or index-related metadata, including country population, area, GDP, and GDP per capita, must never be copied from stale placeholders. Search for the latest available source on the working date, use that day's exchange rate for yen conversion, show GDP in `兆円`, show GDP per capita in `万円`, and progressively re-check implemented pages against this rule.

## Architecture

- Use ordinary static HTML for page content.
- Do not render city page body content with JavaScript.
- `common.css` is allowed and should hold shared visual styles.
- `common.js` is allowed for the shared header, footer, Google tag injection, and visited/favorite UI.
- The shared header should be simple and should not show the old top-right region links.
- The shared footer should be centered and read `© WORLD CITY ATLAS 2026`.
- City-specific statistics, prose, sections, and layout belong directly in each city page HTML.
- Keep each city at `slug/index.html`.
- City images belong inside the same city directory, for example:
  - `tokyo/header.jpg`
  - `tokyo/street.jpg`
- Do not create an `assets/` directory.

## Visited Map

- The visited feature uses `localStorage` key `worldcityatlas.visited`, storing an array of city slugs.
- `common.js` injects visit stars into every `.world-grid .city-card[href]`, including `is-skeleton` cards, and into city detail `.city-hero` sections via `body[data-city]`.
- `visited/index.html` renders all 400 `index.html` city slugs on a latitude/longitude map.
- City coordinates are stored in `VISITED_CITIES` as `{ id, name, label, lat, lon }`. The current 400-city coordinate set was derived from the previous GeoNames-based set plus checked geocoding/manual representative coordinates for newly added capitals, regions, islands, and ambiguous metro entries.
- Land shapes are generated from Natural Earth 110m land GeoJSON and embedded as simplified SVG paths in `LAND_PATHS`.
- Do not replace the map with copied image/SVG artwork. If improving accuracy, regenerate coordinate-derived SVG paths from open geodata and keep the projection consistent with `project(lon, lat)`.
- Visited markers are drawn above unvisited markers by moving visited SVG marker groups to the end of `markerLayer` during `syncView()`.
- For cities that have `/<slug>/header.jpg`, visited markers show a circular thumbnail using an SVG `clipPath`. Skeleton cities without a header image still register and render as visited dots.
- The map intentionally shows no city text labels and no route/connection lines between visited cities.

## City Set And Order

- Implement cities in the editorial importance order tracked in `TODO.md`.
- The editorial order starts with New York, Tokyo, London, and Paris, then mixes economic gravity with religion, politics, conflict, culture, world heritage, regional representation, everyday life, and social importance.
- The GDP ranking remains reference material, not the implementation order.
- Use simple readable city names and slugs based on the most representative city, not the full metropolitan-area label. Examples:
  - `Greater Tokyo Area` -> `tokyo`
  - `New York-Newark-Jersey City, NY-NJ-PA` -> `new-york`
  - `Los Angeles-Long Beach-Anaheim` -> `los-angeles`
  - `Kyoto-Osaka-Kobe` -> `osaka`
  - `Washington-Arlington-Alexandria` -> `washington-dc`
- Visible page titles should say `大阪`, not `京阪神`; `東京`, not `Greater Tokyo Area`; `ニューヨーク`, not the full MSA name.
- The current atlas target is 400 cities, ordered by the scored editorial priority tracked in `TODO.md`.
- Items 201 onward in `TODO.md` are a capital-completion extension and should include missing national capitals plus explicitly requested regions such as Guam, Hawaii, Saipan, Bali, Macau, Kaohsiung, Phuket, Hokkaido, and Okinawa when not already listed.

## Page Requirements

Each city page should include:

- A strong first-viewport hero using `header.jpg`.
- Common statistics near the top:
  - population
  - area
  - climate
  - main industries
  - country or region and flag where applicable
  - national role where useful
  - GDP and GDP per capita where available from the supplied list
- Common statistics should be arranged as six `.stat` sections in this order: 1. `所属国`, 2. population and area, 3. GDP and GDP per capita, 4. `気候`, 5. `産業`, 6. `観光`.
- In the combined population/area card, do not use an outer `人口・面積` label. Use two visible `span` headings and `strong` values in this structure: `<div class="stat"><span>人口</span><strong>...</strong><span>面積</span><strong>...</strong></div>`.
- In the combined GDP/GDP-per-capita card, do not use an outer `GDP・一人当たりGDP` label. Use two visible `span` headings and `strong` values in this structure: `<div class="stat"><span>GDP</span><strong>...</strong><span>一人当たりGDP</span><strong>...</strong></div>`.
- Population, area, GDP, and GDP per capita must be checked by search for each city. Prefer official statistical offices, city/metropolitan authorities, national accounts, OECD/World Bank/IMF or other primary/credible statistical sources. If only local-currency GDP is available, convert to Japanese yen using the current same-day exchange rate and round for readability. If a city-level GDP is unavailable, use the most appropriate metropolitan, prefectural, provincial, county, or governorate figure and make the scope clear in the surrounding code/prose where useful.
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
- Every page, including index and city pages, must include appropriate OG/Twitter card metadata.
- Social card image URLs must be absolute URLs beginning with `https://www.worldcityatlas.com/`, for example `https://www.worldcityatlas.com/tokyo/header.jpg`.
- Improve SEO across the site, especially `index.html` and each city page: use clear unique page titles, useful meta descriptions, canonical URLs, social card metadata, semantic headings, descriptive image alt text, and index copy that helps search engines understand the atlas and the completed city pages.

## Writing Rules

- Do not quote prose from websites.
- Explanatory text must be original writing.
- Statistical values may be based on the user-provided GDP ranking list and other checked data when needed.
- Country, national, regional, and city data, including population, area, GDP, and GDP per capita values, must use the latest data obtained through search or checked primary/statistical sources at implementation time. National data must also be searched and checked when used on a page. GDP must be shown in `兆円`, GDP per capita in `万円`, and currency conversion must use the exchange rate for the current working date. Re-audit already implemented city pages against this rule as work proceeds, including older pages that were implemented before this sourcing rule was made explicit.
- For all future and existing city pages, the country or regional data, population, area, GDP, and GDP per capita must be verified by search/current statistical sources before publication. Convert GDP to `兆円` and GDP per capita to `万円` using the exchange rate available on the current working date, and do not reuse stale values without checking them again. Audit implemented pages progressively and correct any values, units, or source comments that do not meet this rule.
- The GDP ranking is economic, but pages must not become only business or finance pages.
- Write in Japanese unless the user asks otherwise.
- The prose should be detailed and useful, but divided into readable sections.
- For city pages, target around 6000 Japanese characters in the main explanatory body text, counted from normal prose paragraphs only. Do not count scripts, navigation, labels, stats, metadata, or footer text toward this target.
- Before finalizing generated city prose, run a local script to verify each main prose section is around 600 visible prose characters, normally 550-650 non-whitespace visible characters, where that section is intended to carry body text. Check only the prose itself, not scripts, navigation, labels, stats, metadata, or footer text.
- Tokyo is the template city page, but London and later pages should use the newer 600-character main-section target unless the user changes it again.
- A full city page should normally have 10 prose sections: four common sections for geopolitics, industry and labor, culture and religion, and daily life and tourism, plus six city-specific sections. Use fewer only when the city truly lacks enough distinct topics; use more when the city needs it.
- Each main prose section should be around 600 Japanese characters and should avoid creating large empty visual gaps. Prefer one continuous prose paragraph per counted section unless the layout clearly benefits from subdivision.
- Each main prose section should ideally include one small representative image. Images may be temporary Python-generated placeholders until the local AI image pipeline produces final assets.
- Top mini sections such as geopolitics, industry and labor, culture and religion, and daily life and tourism should be concise, 100 Japanese characters plus or minus 2 characters each. Do not count these mini sections toward the 550-650 character main-section check.
- The short stat texts for climate, main industries, and main tourism must be exactly 24 Japanese-visible characters each, including punctuation. Apply this to every city.
- The 24-character stat texts must still read as natural Japanese. Do not remove particles, punctuation, or sentence endings so aggressively that the result becomes an unnatural noun chain such as `金融港湾半導体...` or `湾岸庭園民族街...`. Prefer concise but grammatical Japanese with particles, commas, and a natural ending; if exact length and readability conflict, revise the wording until both are satisfied.
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
- Final adopted images must be copied into each city directory as JPEG files such as `header.jpg`, `street.jpg`, or another simple role name.
- PNG source images are too large for published pages. Existing and future adopted images should be converted to JPEG with moderate compression before committing. When copying from `_ai/`, either generate JPEG directly or convert to JPEG during adoption.
- Before converting or replacing an image, preserve the original source image under `_ai/orig/`, keeping a path that makes the original easy to trace back to the published image.
- The second image, normally `street.jpg`, should no longer be Python-generated. Generate it with the AI model as an abstract, hand-drawn illustration-style image that represents the city's character, similar in role to the older geometric Python illustrations.
- Replace existing Python-generated street images as well, not only future cities. Update them progressively with AI-generated abstract hand-drawn illustration-style images during city page work or dedicated image refresh batches.
- No image may contain embedded text, lettering, labels, logos, captions, or readable signs. This applies to both Python-generated images and AI-generated images. Section titles and labels must be HTML overlay text, not pixels inside the image.
- For each city implementation, start the AI image generation task first because it is slow. While the image batch runs in the background, implement the city HTML, prose, layout, and checks that do not depend on the final images. Use the generation wait time productively instead of writing all prose before starting image generation.
- Maintain a forward image-generation queue across multiple upcoming cities. Prefer two-GPU parallel generation for independent city batches, and start the next batch before finishing non-GPU work whenever doing so will keep GPU utilization high.

## Verification And Commit Rules

- Use `http://localhost:4173` as the confirmation server when possible.
- Before finalizing a city page, render it locally and check screenshots visually with Playwright for desktop and 393px mobile width.
- Confirm generated or adopted images visually before committing.
- Run the local city page checker, image reference checks, forbidden-meta checks, and any relevant layout checks before committing.
- Commit and push completed city pages one city at a time.
- Update `index.html` when a city becomes complete, replacing the skeleton card with the completed image card.
- Update and commit `TODO.md` as progress changes.
- Always stage files manually by naming every path explicitly. Do not use `git add .`.

## Current Implementation State

- `index.html` and city pages use `common.js` only for header/footer, Google tag injection, and visited/favorite UI.
- City body content is static HTML in each page.
- `common.css` includes shared header, footer, hero, stat, card, split, section, route, and visited/favorite styles.
- Other city pages may still need conversion from older JS-rendered placeholders to static HTML.
- `TODO.md` tracks the editorial implementation ranking, the capital-completion queue, and keeps GDP ranking as reference material.
