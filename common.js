const WORLD_CITY_NAV = [
  {
    region: "アジア",
    countries: [
      { name: "日本", cities: [["tokyo", "東京"], ["osaka", "大阪"], ["nagoya", "名古屋"]] },
      { name: "中国", cities: [["shanghai", "上海"], ["beijing", "北京"]] },
      { name: "韓国", cities: [["seoul", "ソウル"]] },
      { name: "シンガポール", cities: [["singapore", "シンガポール"]] },
      { name: "インド", cities: [["delhi", "デリー"]] },
      { name: "インドネシア", cities: [["jakarta", "ジャカルタ"]] },
      { name: "トルコ", cities: [["istanbul", "イスタンブール"]] },
      { name: "アラブ首長国連邦", cities: [["dubai", "ドバイ"]] }
    ]
  },
  {
    region: "北米",
    countries: [
      { name: "アメリカ合衆国", cities: [["new-york", "ニューヨーク"], ["los-angeles", "ロサンゼルス"], ["chicago", "シカゴ"], ["san-francisco", "サンフランシスコ"], ["houston", "ヒューストン"], ["dallas", "ダラス"], ["washington-dc", "ワシントンDC"], ["boston", "ボストン"], ["atlanta", "アトランタ"], ["seattle", "シアトル"], ["philadelphia", "フィラデルフィア"]] },
      { name: "メキシコ", cities: [["mexico-city", "メキシコシティ"]] }
    ]
  },
  {
    region: "ヨーロッパ",
    countries: [
      { name: "フランス", cities: [["paris", "パリ"]] },
      { name: "イギリス", cities: [["london", "ロンドン"]] },
      { name: "ドイツ", cities: [["rhine-ruhr", "デュッセルドルフ"]] },
      { name: "ロシア", cities: [["moscow", "モスクワ"]] }
    ]
  }
];

function injectGoogleTag() {
  const measurementId = "G-90EK6260ZV";
  if (document.querySelector(`script[src*="${measurementId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

function renderSiteHeader() {
  return `<header class="site-header">
    <a href="/" class="brand">World City Atlas</a>
    <nav class="site-actions" aria-label="Site">
      <a href="/visited/" aria-label="訪問済みマップ">☆</a>
    </nav>
  </header>`;
}

function renderSiteFooter() {
  return `<footer class="site-footer"><p>© WORLD CITY ATLAS 2026</p><p>100% Generated AI</p></footer>`;
}

const VISITED_STORAGE_KEY = "worldcityatlas.visited";

function readVisitedCities() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VISITED_STORAGE_KEY) || "[]"));
  } catch (error) {
    return new Set();
  }
}

function writeVisitedCities(visitedCities) {
  try {
    localStorage.setItem(VISITED_STORAGE_KEY, JSON.stringify([...visitedCities]));
  } catch (error) {
    // The visible star state still updates for the current page if storage is unavailable.
  }
}

function cityIdFromCard(card) {
  const href = card.getAttribute("href") || "";
  const match = href.match(/^\/([^/]+)\/?$/);
  return match ? match[1] : "";
}

function syncVisitStars(visitedCities) {
  document.querySelectorAll("[data-visit-star]").forEach((star) => {
    const cityId = star.dataset.cityId;
    const panel = star.closest(".city-card-panel");
    const card = panel?.querySelector(".city-card");
    const hero = star.closest(".city-hero");
    const isVisited = visitedCities.has(cityId);
    const cityName = star.dataset.cityName || cityId;
    star.classList.toggle("is-visited", isVisited);
    star.setAttribute("aria-pressed", String(isVisited));
    star.setAttribute("aria-label", isVisited ? `${cityName}の訪問済みを解除` : `${cityName}を訪問済みにする`);
    star.textContent = isVisited ? "⭐" : "☆";
    if (card) card.classList.toggle("is-visited", isVisited);
    if (hero) hero.classList.toggle("is-visited", isVisited);
  });
}

function refreshVisitStars() {
  syncVisitStars(readVisitedCities());
}

function createVisitStar(cityId, cityName) {
  const star = document.createElement("button");
  star.type = "button";
  star.className = "visit-star";
  star.dataset.visitStar = "";
  star.dataset.cityId = cityId;
  star.dataset.cityName = cityName;
  star.setAttribute("aria-label", `${cityName}を訪問済みにする`);
  star.setAttribute("aria-pressed", "false");
  star.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const visitedCities = readVisitedCities();
    if (visitedCities.has(cityId)) visitedCities.delete(cityId);
    else visitedCities.add(cityId);

    writeVisitedCities(visitedCities);
    syncVisitStars(visitedCities);
  });
  return star;
}

function initVisitStars() {
  const cards = document.querySelectorAll(".world-grid .city-card[href]");
  const cityHero = document.querySelector(".city-hero");
  const cityId = document.body.dataset.city || "";
  if (!cards.length && (!cityHero || !cityId)) return;

  const visitedCities = readVisitedCities();

  cards.forEach((card) => {
    const cityId = cityIdFromCard(card);
    if (!cityId) return;

    let panel = card.closest(".city-card-panel");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "city-card-panel";
      card.parentNode.insertBefore(panel, card);
      panel.appendChild(card);
    }

    if (panel.querySelector("[data-visit-star]")) return;

    const cityName = card.querySelector("h2")?.childNodes[0]?.textContent?.trim() || cityId;
    panel.appendChild(createVisitStar(cityId, cityName));
  });

  if (cityHero && cityId && !cityHero.querySelector("[data-visit-star]")) {
    const cityName = cityHero.querySelector("h1")?.childNodes[0]?.textContent?.trim() || cityId;
    cityHero.appendChild(createVisitStar(cityId, cityName));
  }

  syncVisitStars(visitedCities);

  window.addEventListener("storage", (event) => {
    if (event.key === VISITED_STORAGE_KEY) refreshVisitStars();
  });
}

function markCurrentHeaderLink() {
  document.querySelectorAll(".site-actions a").forEach((link) => {
    link.classList.toggle("is-current", link.pathname === window.location.pathname);
  });
}

window.addEventListener("pageshow", refreshVisitStars);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") refreshVisitStars();
});

document.addEventListener("DOMContentLoaded", () => {
  injectGoogleTag();

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");
  if (headerTarget) headerTarget.outerHTML = renderSiteHeader();
  if (footerTarget) footerTarget.outerHTML = renderSiteFooter();

  markCurrentHeaderLink();
  initVisitStars();
});
