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
  const current = document.body.dataset.city || "";
  const menu = WORLD_CITY_NAV.map(group => `
    <div class="nav-region">
      <button type="button" class="nav-region-button">${group.region}</button>
      <div class="nav-panel">
        ${group.countries.map(country => `
          <div class="nav-country">
            <div class="nav-country-name">${country.name}</div>
            <div class="nav-city-list">
              ${country.cities.map(([slug, label]) => `<a class="${slug === current ? "is-current" : ""}" href="/${slug}/">${label}</a>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  return `<header class="site-header">
    <a href="/" class="brand">World City Atlas</a>
    <nav class="hier-nav" aria-label="都市ナビゲーション">${menu}</nav>
  </header>`;
}

function renderSiteFooter() {
  return `<footer class="site-footer"><p>© WORLD CITY ATLAS 2026</p></footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  injectGoogleTag();

  const headerTarget = document.querySelector("[data-site-header]");
  const footerTarget = document.querySelector("[data-site-footer]");
  if (headerTarget) headerTarget.outerHTML = renderSiteHeader();
  if (footerTarget) footerTarget.outerHTML = renderSiteFooter();

  document.querySelectorAll(".nav-region-button").forEach(button => {
    button.addEventListener("click", () => {
      const region = button.closest(".nav-region");
      document.querySelectorAll(".nav-region.is-open").forEach(openRegion => {
        if (openRegion !== region) openRegion.classList.remove("is-open");
      });
      region.classList.toggle("is-open");
    });
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".hier-nav")) {
      document.querySelectorAll(".nav-region.is-open").forEach(region => region.classList.remove("is-open"));
    }
  });
});
