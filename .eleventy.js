/* Eleventy 설정
   src/ 안의 파일을 읽어서 _site/ 에 완성된 사이트를 만듭니다.
   기사는 src/articles/*.md 에 마크다운으로 들어가고,
   레이아웃(src/_includes/*.njk)을 입혀 HTML로 바뀝니다. */

module.exports = function (eleventyConfig) {
  // 사이트 주소 — Netlify가 빌드할 때 URL 환경변수를 넣어줍니다.
  // 내 컴퓨터에서 볼 때는 localhost 로 떨어집니다.
  eleventyConfig.addGlobalData('siteUrl',
    (process.env.URL || process.env.DEPLOY_PRIME_URL || 'http://localhost:8080').replace(/\/$/, ''));

  // 사이트맵·RSS에 쓰는 ISO 날짜
  eleventyConfig.addFilter('isoDate', (d) => new Date(d).toISOString());
  // 본문에서 태그를 걷어낸 요약
  eleventyConfig.addFilter('plain', (html) =>
    String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

  // 그대로 복사할 것들
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/admin");

  // 날짜를 2026.07.30 형태로
  eleventyConfig.addFilter("krDate", (d) => {
    if (!d) return "";
    const dt = new Date(d);
    const p = (n) => String(n).padStart(2, "0");
    return `${dt.getUTCFullYear()}.${p(dt.getUTCMonth() + 1)}.${p(dt.getUTCDate())}`;
  });

  // 15000 → 15,000
  eleventyConfig.addFilter("won", (n) => Number(n || 0).toLocaleString("ko-KR"));

  // 목록 다루는 필터
  eleventyConfig.addFilter("take", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("without", (arr, url) =>
    (arr || []).filter((i) => i.url !== url)
  );

  // 전체 기사 — 최신순
  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );

  // 카테고리별 기사 — {{ collections.byCategory.FILM }} 처럼 씁니다
  eleventyConfig.addCollection("byCategory", (api) => {
    const out = {};
    api
      .getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => b.date - a.date)
      .forEach((item) => {
        const c = item.data.category;
        if (!c) return;
        (out[c] = out[c] || []).push(item);
      });
    return out;
  });

  // 자체 기획(ARTICLE)만
  eleventyConfig.addCollection("features", (api) =>
    api
      .getFilteredByGlob("src/articles/*.md")
      .filter((i) => i.data.type === "feature")
      .sort((a, b) => b.date - a.date)
  );

  // 뉴스만 (자체 기획 제외)
  eleventyConfig.addCollection("news", (api) =>
    api
      .getFilteredByGlob("src/articles/*.md")
      .filter((i) => i.data.type !== "feature")
      .sort((a, b) => b.date - a.date)
  );

  // SHOP 상품 — 최신호가 맨 앞
  eleventyConfig.addCollection("products", (api) =>
    api
      .getFilteredByGlob("src/products/*.md")
      .sort((a, b) => (b.data.volumeNo || 0) - (a.data.volumeNo || 0))
  );

  // 홈 헤드라인 — '헤드라인으로 쓰기'를 켠 기사, 없으면 가장 최신 기사
  eleventyConfig.addCollection("headline", (api) => {
    const all = api
      .getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => b.date - a.date);
    const picked = all.filter((i) => i.data.featured);
    return picked.length ? [picked[0]] : all.slice(0, 1);
  });

  // THIS WEEK 패널 — 체크한 기사 4개, 모자라면 최신순으로 채웁니다
  eleventyConfig.addCollection("thisWeek", (api) => {
    const all = api
      .getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => b.date - a.date);
    const picked = all.filter((i) => i.data.thisWeek);
    const rest = all.filter((i) => !i.data.thisWeek);
    return picked.concat(rest).slice(0, 4);
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
