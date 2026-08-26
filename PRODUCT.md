# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

주 독자는 한국의 영화 애호가다. 시네필 입문자부터 영화를 조금 더 깊이 즐기는 애호가까지를 함께 상정한다. 대부분 인스타그램에서 컬러즈의 카드뉴스를 보고 넘어오며, 출퇴근길이나 밤 시간에 휴대폰으로 읽는다. 이들이 하러 오는 일은 **읽기**다 — 오늘 무슨 일이 있었는지 확인하는 소비가 아니라, 한 편의 영화를 다르게 보게 만드는 글을 끝까지 읽는 것.

부차적으로, 읽다가 창간호를 사는 독자가 있다. 구매는 읽기의 결과이지 홈의 1순위 목표가 아니다 (2026-08-18 사용자 확정).

## Product Purpose

컬러즈(colours)는 매 호 하나의 키워드를 정해 영화를 중심으로 음악·미술·공간·문화를 잇는 독립 영화 잡지다. 이 웹사이트는 두 가지를 한다: (1) 종이 잡지 사이의 공백을 메우는 영화 뉴스·자체 기획 기사를 발행하고, (2) 발행한 호(號)를 소개하고 주문받는다. 성공은 방문자가 기사를 **끝까지 읽고** 다음 글로 넘어가는 것이다.

## Positioning

영화 뉴스 매체는 많고 잡지 소개 페이지도 많지만, 컬러즈는 **한 키워드 아래 서로 다른 매체와 문화가 어떻게 이어지는지를 따라가는 편집 관점**을 매체의 정체성으로 삼는다. 웹 기사도 이 관점을 따른다 — 속보 요약이 아니라 하나의 논지를 끝까지 밀고 가는 비평문이다 (실제 기사 `src/articles/dreamcore.md`는 약 3,000자 분량의 단일 논지 비평).

기사는 두 층위로 나뉜다:
- **NEWS** — 업계 소식. 짧고 사실 중심. 인스타그램 게시물과 연동됨.
- **ARTICLE (자체 기획)** — 컬러즈가 직접 기획한 장문 비평·큐레이션. `type: feature`로 표시.

## Operating Context

- 정적 사이트. 방문자가 계정을 만들거나 로그인하는 개념이 없다. 상태를 가진 UI는 없다.
- 유입은 주로 인스타그램 링크 → 개별 기사. 홈은 두 번째로 도달하는 화면인 경우가 많다.
- 편집자(1인)는 Decap CMS(`/admin`) 또는 마크다운 직접 편집으로 기사를 올린다.
- 주문은 결제 시스템 없이 신청서 작성 → 계좌 입금 → 순차 발송으로 처리된다.

## Capabilities and Constraints

- **스택:** Eleventy 3.1 + Nunjucks, 정적 빌드(`_site`), Netlify 배포. 빌드 스텝·번들러·JS 프레임워크 없음.
- **보존 필수 (2026-08-18 사용자 확정):** `src/articles/*.md`와 `src/issues/*.md`의 프론트매터 필드명·데이터 구조. 기존 글을 다시 손보지 않고도 리빌드가 성립해야 한다. 이는 `src/admin/config.yml`의 CMS 스키마도 함께 보존한다는 뜻이다.
  - 기사 필드: `title, dek, eyebrow, category, type, badge, date, image, imageAlt, imageCaption, instagram, igTitle, igText, photoCredit, keywords, featured, thisWeek, featureNo, featureNote, items, author`
  - 호 필드: `volume, volumeNo, keyword, status, onSale, soldOut, date, cover, preview, poster, summary, dek, price, shipping, pages, size, binding, isbn, extra, season, buyUrl, bank, bankHolder, about, about2, designNote, toc`
- **본문 안 커스텀 마크업:** 기사 마크다운이 `<div class="pull">` 같은 인라인 HTML을 쓴다. 새 스타일시트가 이 클래스를 계속 지원해야 한다.
- **카테고리(고정):** FILM, CULTURE, STYLE, TREND, PEOPLE, PLACE. 현재 STYLE·PLACE에는 기사가 0편이다 — 빈 카테고리를 견디는 홈이어야 한다.
- **콘텐츠 규모(현재):** 기사 10편(그중 자체 기획 2편), 발행한 호 1호. 소량 콘텐츠에서도 빈약해 보이지 않아야 한다.
- **미정:** 인스타그램 계정 URL(`site.instagram`)과 주문 신청서 URL(`site.orderForm`, `buyUrl`)이 모두 빈 문자열이다. 지어내지 말 것.

## Brand Commitments

- 매체명 **colours / 컬러즈**.
- 발행 사실: Volume 1. «리미널 스페이스», 창간호, 2026년 여름, 60쪽, 180×240mm, 중철제본, ISBN 9791122022100, 15,000원 + 배송비 3,500원, A2 포스터(표지 겉싸개 겸용) 동봉.
- 입금 계좌: 국민은행 7607-02-0408-7589 (예금주 서형우).
- 라벨 어휘: THIS WEEK / WHAT'S NEW / ARTICLE / MAGAZINE.
- 워드마크 표기·비주얼 언어는 이번 리빌딩에서 **확정 사항이 아니다** — 사용자가 보존 대상으로 지정하지 않았다.

## Evidence on Hand

- 기사 10편의 실제 본문과 사진(`src/assets/`), 전부 실제 발행물.
- 창간호 표지·내지 미리보기·A2 포스터 이미지 3종(`issue1-cover.jpg`, `issue1-preview.jpg`, `issue1-poster.jpg`) — 잡지의 실제 디자인 언어를 보여주는 유일한 1차 자료.
- 창간호 목차 22편 전문.
- **없는 것 (지어내면 안 됨):** 판매 수량, 독자 수, 리뷰·추천사, 입점 서점, 언론 보도, 트래픽 수치.

## Product Principles

1. **읽기가 1순위다.** 홈의 모든 위계는 "이 방문자를 한 편의 글 안으로 들여보내는가"로 판정한다. 구매는 읽기의 결과다.
2. **글의 밀도를 숨기지 않는다.** 컬러즈의 기사는 길고 논지가 있다. 짧은 카드 요약으로 균질화하는 순간 매체의 차별점이 사라진다.
3. **NEWS와 ARTICLE은 다른 물건이다.** 같은 카드 틀에 담지 않는다.
4. **콘텐츠가 적어도 성립해야 한다.** 기사 10편, 호 1개, 빈 카테고리 2개에서 이미 완결돼 보여야 한다.
5. **편집자 1인이 유지할 수 있어야 한다.** 새 기사를 올릴 때 프론트매터만 채우면 제자리를 찾아가야 하고, 손으로 배치를 조정할 일이 없어야 한다.

## Accessibility & Inclusion

한국어 본문. 긴 한글 문장을 휴대폰에서 오래 읽는 것이 주 사용 상황이므로 본문 가독성(자간·행간·측정폭·대비)이 제품 요구사항이다. 키보드 접근과 건너뛰기 링크는 현행 구현에 이미 존재하며 유지한다.
