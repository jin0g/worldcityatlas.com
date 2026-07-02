# Project Notes

## Visited Map

- The visited feature uses `localStorage` key `worldcityatlas.visited`, storing an array of city slugs.
- `common.js` injects visit stars into every `.world-grid .city-card[href]`, including `is-skeleton` cards, and into city detail `.city-hero` sections via `body[data-city]`.
- `visited/index.html` renders all 200 `index.html` city slugs on a latitude/longitude map.
- City coordinates are stored in `VISITED_CITIES` as `{ id, name, label, lat, lon }`. The current 200-city coordinate set was derived from GeoNames `cities15000`; special/ambiguous metro entries may use representative city coordinates.
- Land shapes are generated from Natural Earth 110m land GeoJSON and embedded as simplified SVG paths in `LAND_PATHS`.
- Do not replace the map with copied image/SVG artwork. If improving accuracy, regenerate coordinate-derived SVG paths from open geodata and keep the projection consistent with `project(lon, lat)`.
- Visited markers are drawn above unvisited markers by moving visited SVG marker groups to the end of `markerLayer` during `syncView()`.
- For cities that have `/<slug>/header.png`, visited markers show a circular thumbnail using an SVG `clipPath`. Skeleton cities without a header image still register and render as visited dots.
- The map intentionally shows no city text labels and no route/connection lines between visited cities.
