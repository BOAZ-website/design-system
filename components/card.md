---
id: card
name_ko: 카드
ticket: COMPONENT-08
tier: P0
status: review
figma:
  - "5875:9878"
  - "5236:824"
  - "5236:878"
  - "5239:803"
  - "6363:11806"
  - "5411:10347"
  - "5338:3599"
  - "8838:12513"
  - "8796:5269"
  - "5317:8901"
  - "1132:1299"
  - "1132:1994"
  - "1728:3724"
  - "7091:10966"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 카드 (card)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 한 항목(프로젝트·글·사진·부문·질문·후기)을 한 덩어리로 묶어 목록으로 보여 주는 표면
- 구성: variant 7종(project·blog·photo·target·recruit·faq·review). 공통 구조(썸네일·제목·메타·태그) 위에 종류별 차이를 둠
- 사용 화면: 아카이빙(프로젝트·블로그·활동사진 탭), 리크루팅(대상·모집 부문), FAQ, 커리큘럼·홈(후기)
- 관련 명세: `components/tag.md`(카드 안 부문·기수 태그, COMPONENT-13), `components/button.md`(모집 카드 안 지원하기 버튼, COMPONENT-01), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

공통 슬롯. 종류별로 쓰는 슬롯은 3절 Variants 표의 "슬롯" 열을 따름.

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<article>`. 바탕·보더·radius. 그림자 없음(배경 명도 차이로 구분, design-reference 4.1) | 바탕 `color.bg.layer` (#1A1A1A), 보더 `color.stroke.weak` (#333333) 1px 안쪽, radius `radius.md` (20px). 종류별 예외는 3절 |
| thumbnail | × | `<img>`. `object-fit: cover`. 이미지가 없을 때 자리 채움 색을 둠 | radius 종류별(project `raw:16px`, blog `radius.md` (20px), photo 위쪽 두 모서리만 `radius.md`). 자리 채움 `raw:rgba(255,255,255,0.6)` |
| eyebrow | × | 제목 위 보조 글자(프로젝트 팀 이름) | `typography.body-4`, `color.palette.gray.100` (#E6E6E6) |
| title | ○ | 카드 이름. 클릭 가능한 카드는 이 안에 링크를 둠(5절) | 종류별(3절) |
| description | × | 요약 글. 줄 수 제한 후 말줄임 | 종류별(3절) |
| meta | × | 날짜(`<time>`) 또는 기수·부문 글자 | 종류별(3절) |
| tags | × | 부문·기수 라벨. 읽기 전용. 값은 `components/tag.md` | 보더 `color.stroke.neutral` (#999999) 1px, 글자 `color.palette.gray.100` (#E6E6E6) `raw:14px/400`, radius `radius.md` (20px). 태그 사이 gap `spacing.1` (4px) |
| actions | × | 카드 안 별도 링크(GitHub·SlideShare 아이콘 24px) 또는 버튼(지원하기) | 아이콘 rest `color.fg.muted` (#999999), hover `color.fg.default` (#FFFFFF). 아이콘 사이 gap `spacing.3` (12px) |
| stretched-link | × | 제목 링크의 가상 요소(`::after`)를 root 전체로 넓혀 카드 전체를 클릭 영역으로 만듦(5절) | 포커스 링 `color.stroke.focus` (#68CBEC) |

- 썸네일 radius는 종류별로 다름(COMPONENT-08-01). 라이브 project 16(모바일 10), blog 20(2026-10-22 라이브 기준으로 정정. Figma는 project 20·blog 16)
- 보더 `color.stroke.weak` 대 `color.bg.layer`는 1.38:1로 장식임. 카드 경계는 바탕 #1A1A1A 대 캔버스 #000000 명도 차이로도 구분됨(`docs/wbs/20-token.md` 대비표)

## 3. Variants·Sizes

### Variants

| variant | 용도 | 슬롯 | 클릭 | hover 동작 | 근거 |
| --- | --- | --- | --- | --- | --- |
| project | 아카이빙 프로젝트 | thumbnail, eyebrow, title, tags(부문·기수), actions(GitHub·SlideShare) | 카드 전체 링크 + 아이콘 링크 | 바탕 그라데이션·보더 #2C3F61(4절 hover 효과 A). 아이콘은 각자 hover | Figma 5236:822, Figma 5236:823, Figma 1728:3724 |
| blog | 아카이빙 블로그(Medium 글) | tags(부문), title, description, meta(날짜), thumbnail(오른쪽) | 카드 전체 링크 | hover 효과 A. 단 바탕에 #0A0A0A 층이 없음(11절) | Figma 5236:877, Figma 5236:879 |
| photo | 아카이빙 활동사진 | thumbnail(위), title, meta(날짜), tags(기수) | 카드 전체 링크 | hover 효과 A. 썸네일 자리 채움 `raw:rgba(255,255,255,0.6)`은 rest·hover 모두 같음 | Figma 5236:920, Figma 5980:12389, Figma 6363:11807 |
| target | 리크루팅 지원 대상 | 아이콘(97×97), 설명 글 | 없음 | 바탕 `color.palette.gray.800` (#333333) → `color.palette.gray.600` (#666666) | Figma 5411:10346, Figma 5411:10348 |
| recruit | 리크루팅 모집 부문 | title·캐릭터 이미지(rest), description(hover), actions(지원하기 버튼) | 카드는 없음. 안의 버튼만 | 바탕 `color.palette.gray.800` (#333333) → `color.bg.layer` (#1A1A1A). 제목·캐릭터 이미지 숨김, 설명 글 나타남. 버튼은 같은 자리 유지 | Figma 8838:12513, Figma 8796:5269, Figma 8796:5274, Figma 8796:5279 |
| faq | 자주 묻는 질문(펼침 목록) | 질문(title), 더하기·빼기 아이콘 16px, 답변(description) | 질문 줄이 펼침 버튼 | 하단 보더 #999999 → #FFFFFF. 클릭 시 펼침(Active) | Figma 5317:8886, Figma 5317:8902, Figma 5317:8914 |
| review | 활동 후기 | title(이름), meta(기수·부문), description(후기 글) | 없음 | 없음 | Figma 1132:1299, Figma 1132:1994, Figma 7289:14365 |

- 대상 카드 바탕 #333333은 `color.palette.gray.800`으로 적음(`docs/wbs/20-token.md` "시맨틱으로 만들지 않는 색")
- "분야" 카드는 Figma에 없어 두지 않음(2026-10-22 정정)
- 클릭이 없는 카드(target·recruit·review)에는 hover를 넣되 커서를 바꾸지 않음. recruit의 hover는 설명 글을 보여 주는 동작이라 키보드 포커스에도 같은 모습을 줌(5절)

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| project | 333×350 | 280×300 | 카드 `radius.md` (20px), 썸네일 `raw:16px` / 모바일 썸네일 `raw:10px` | `spacing.5` (20px) / `raw:21px` / `raw:21px` / `raw:21px`. 썸네일 291×165(radius `raw:16px`, 모바일 높이 140·radius `raw:10px`), 썸네일-글 gap `spacing.4` (16px), eyebrow-title gap `spacing.1` (4px), 글-태그 gap `spacing.5` (20px) | eyebrow `typography.body-4` / title `typography.body-1`(2줄) / 모바일 eyebrow `raw:14px/400`, title `typography.body-4` | Figma 5236:822, Figma 7098:8454 |
| blog | 929×278 | 280×300 | 카드 `radius.md` (20px), 썸네일 `radius.md` (20px) / 모바일 썸네일 0(카드 radius로 잘림), 보더 2px | `raw:17px` / `spacing.5` (20px) / `raw:17px` / `spacing.10` (40px). 썸네일 325×244, 글-썸네일 gap `spacing.10` (40px), title-description gap `spacing.4` (16px) | title `typography.headline-3`(3줄) / description `typography.body-5`, `color.fg.neutral` (#CCCCCC)(3줄) / 날짜 `typography.text-1`, `color.palette.gray.100` (#E6E6E6) / 모바일 title `typography.body-4`, 날짜 `typography.text-1-mobile` `color.fg.neutral`, description 숨김 | Figma 5236:877, Figma 7098:13687 |
| photo | 333×350 | 280×300 | 카드 `radius.md` (20px), 썸네일 위쪽 두 모서리 `radius.md` | 썸네일 333×250(가로 꽉 참). 글 영역 좌우 `spacing.3` (12px), 썸네일-글 gap `spacing.3` (12px), title-meta gap `spacing.1` (4px) / 모바일 썸네일 280×200, 좌우 `raw:15px`, gap `spacing.5` (20px) | title `typography.body-2-regular`(2줄) / 날짜 `raw:14px/400`, `color.fg.default` / 모바일 title `typography.body-4`, 날짜 `typography.text-1-mobile` `color.fg.neutral` | Figma 5236:920, Figma 6363:11807, Figma 7098:13688 |
| target | 300×270 | — | `radius.sm` (12px) | 아이콘 위 `raw:38px`, 글 좌우 `raw:20px`(폭 259) | `typography.body-4-paragraph`(2줄, 가운데 정렬), `color.fg.default` | Figma 5411:10346 |
| recruit | 310×404 | — | `radius.sm` (12px) | 제목·설명 글 위 `raw:42px`, 좌 `raw:27px`, 설명 글 폭 250. 버튼은 왼쪽 `raw:27px`, 아래 `spacing.10` (40px) | title `typography.headline-2` / description `typography.body-4-paragraph`(5줄) / 버튼은 `components/button.md` brand-small 130×44 | Figma 8838:12513, Figma 8796:5269 |
| faq | 840×100(펼침 시 840×208) | 342×68 | — | 질문 줄 `raw:39px` / `spacing.6` (24px) / `raw:39px` / `raw:2px`. 답변 줄 `raw:26px` / — / `raw:26px` / `spacing.5` (20px) | 질문 `typography.body-3` / 답변 `typography.body-5` | Figma 5317:8886, Figma 5317:8914, Figma 7289:14443 |
| review | 부모 폭 × 208 | 부모 폭 × 글 길이 | `raw:10px` | `raw:28.5px` / `raw:42px` / `raw:35px`, 이름 줄-글 gap `raw:13px`, 이름-기수 gap `raw:10px` / 모바일 `raw:21px` / `spacing.4` (16px) | 이름 `typography.body-2` / 기수·부문 `typography.body-3`, `color.fg.brand` / 글 `typography.body-5` / 모바일 이름 `raw:12px/700`, 기수·부문 `raw:10px/700`, 글 `raw:10px/400` | 코드 `src/widgets/curriculum/ui/review-card-list/review-card.css.ts` |

- padding 값 순서: 2개는 세로 / 가로, 4개는 위 / 오른쪽 / 아래 / 왼쪽(CSS 순서)
- 폭: 데스크톱은 표의 고정 폭. 목록 배치(열 수·간격)는 페이지 담당이며 이 명세 범위 밖
- 높이: project·photo·blog·target·recruit는 표의 고정 높이. review·faq 모바일은 글 길이에 따라 늘어남
- 줄 수 제한: 넘치는 글은 `-webkit-line-clamp`로 말줄임. 잘린 제목 전체는 `title` 속성이 아니라 링크 이름(보이는 글자 전체)으로 전달됨
- review: 라이브 사이트(커리큘럼 후기)에 있어 라이브 값(= frontend 코드 값)을 씀. radius 10(`radius.sm` 12px과 달라 `raw:10px`), 기수·부문 #7A64F9 18/700, 모바일 글자 10~12px(2026-10-22 라이브 기준으로 정정)
- recruit radius: 최종안 Figma 10. 위와 같은 결정으로 `radius.sm` (12px)로 적음
- recruit 크기·위치: 최종안 rest(Figma 8838:12513)·hover(Figma 8796:5269) 기준. 이전 컴포넌트(Figma 5338:3598, 제목 위 45·좌 24, 버튼 좌 16·아래 20)는 Components·WireFrame·Interaction 페이지에만 있어 쓰지 않음
- project eyebrow 색: 카드 인터렉션 원본(Figma 5236:822, 화면 인스턴스 7개)의 #E6E6E6(`color.palette.gray.100`)을 씀. Radius 시트 Project Block(Figma 1728:3724)의 #999999는 쓰지 않음
- faq 보더: 하단만 `raw:0.5px`. rest `color.stroke.neutral` (#999999), hover `color.palette.gray.0` (#FFFFFF), 펼친 답변 줄 하단 `color.stroke.brand` (#7A64F9)
- 모바일 project 280×300: 모바일 화면에 인스턴스 6개로 쓰인 값(Figma 7098:8454). 데스크톱 카드를 0.78배로 줄인 값이라 radius 15.68은 데스크톱과 같은 `radius.md` (20px)로 두고(16px 토큰 없음), 보더 0.78은 1px로 반올림함
- faq 모바일(Figma 7289:14443)
  - default(Figma 7289:14394): 342×68, 질문 줄 패딩 0 / `spacing.2` (8px), 질문 `typography.body-4-mobile`(15 Regular) `color.fg.default`, 하단 보더 `color.stroke.neutral` (#999999), 더하기 아이콘 24px
  - selected(Figma 7289:14449): 342×188(질문 줄 68 + 답변 묶음 100). 답변 묶음 보더 `color.stroke.brand` (#7A64F9), 패딩 0 / `spacing.4` (16px), gap `raw:10px`

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 모습을 유지하고 outline을 더함.

hover 효과 A(project·photo, 라이브 값. 2026-10-22 라이브 기준으로 정정)

- 바탕: `color.palette.gray.950` (#0D0D0D) 위에 세로 그라데이션 2겹
  - 1겹: 위 #68CBEC 불투명도 0 → 아래 #68CBEC 불투명도 0.2
  - 2겹: 위 #7A64F9 불투명도 0.2 → 아래 #7A64F9 불투명도 0
- 보더: 1px #2C3F61 + 안쪽 outline 1px #2C3F61(offset -2px). 보더 굵기가 바뀌지 않아 레이아웃 이동 없음
- 값은 10절 `raw:linear-gradient` 행
- blog: 라이브에 hover가 없어 Figma hover(Figma 5236:879. #7A64F9→#999999·#666666→#6498F9 그라데이션 각 0.2, 그라데이션 보더 2px)를 유지함

### project · blog · photo

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / `color.fg.default` (#FFFFFF) / `color.stroke.weak` (#333333) 1px(blog 2px) | project·photo: hover 효과 A / `color.fg.default` (#FFFFFF) / `raw:#2C3F61` 1px + outline 1px<br>blog: Figma hover(위 목록) | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px(root 바깥) | 코드 `src/shared/components/archive/project-card.css.ts`, 코드 `src/shared/components/archive/active-card.css.ts`, 코드 `src/shared/components/archive/blogcard.css.ts`, Figma 5236:879(blog hover, 라이브 없음), Figma 없음(추정, press·focus-visible, 라이브 없음) |

- blog의 rest 보더는 라이브 2px(`color.stroke.weak`)(2026-10-22 라이브 기준으로 정정)

### actions(project 아이콘 링크)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.muted` (#999999) / — | — / `color.fg.default` (#FFFFFF) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5411:10500, Figma 5411:10502, Figma 5713:10030, Figma 5713:10032, Figma 없음(추정, press·focus-visible) |

### target

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.palette.gray.800` (#333333) / `color.fg.default` (#FFFFFF) / — | `color.palette.gray.600` (#666666) / `color.fg.default` (#FFFFFF) / — | — | — | Figma 5411:10346, Figma 5411:10348 |

### recruit

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.palette.gray.800` (#333333) / 제목 `color.fg.default` (#FFFFFF) / — | `color.bg.layer` (#1A1A1A) / 설명 글 `color.palette.gray.100` (#E6E6E6) / — | — | 카드 안 버튼이 포커스되면(`:focus-within`) hover 모습을 보임. 링은 버튼에 그림(`components/button.md`) | Figma 8838:12513, Figma 8796:5269, Figma 8796:5274, Figma 8796:5279, Figma 없음(추정, focus-within) |

- rest: 제목·캐릭터 이미지 보임, 설명 글 숨김
- hover: 제목·캐릭터 이미지 숨김, 설명 글 보임. 설명 글과 이미지가 겹치지 않음(최종안 hover 3장 모두 이미지 없음)
- 지원하기 버튼은 rest·hover 모두 같은 자리

### faq

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(접힘) | `color.bg.canvas` (#000000) / 질문 `color.fg.default` (#FFFFFF) / 하단 `color.stroke.neutral` (#999999) `raw:0.5px` | 바탕·글자 유지 / 하단 `color.palette.gray.0` (#FFFFFF) | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px(질문 줄) | Figma 5317:8886, Figma 5317:8902, Figma 없음(추정, press·focus-visible) |
| selected(펼침) | `color.bg.canvas` (#000000) / 질문 `color.fg.brand` (#7A64F9), 답변 `color.fg.default` (#FFFFFF) / 답변 줄 하단 `color.stroke.brand` (#7A64F9) `raw:0.5px` | 질문 줄 하단 `color.palette.gray.0` (#FFFFFF) | hover 값 유지 | 위와 같음 | Figma 5317:8914, Figma 없음(추정, hover·press·focus-visible) |

### review

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / 이름·글 `color.fg.default` (#FFFFFF), 기수·부문 `color.fg.brand` (#7A64F9) / — | — | — | — | Figma 1132:1299, Figma 7289:14365 |

- 포커스 트리거: 클릭 가능한 카드는 제목 링크의 `:focus-visible`. 링은 stretched-link 가상 요소(`::after`)에 그려 카드 전체를 감쌈. recruit는 `:focus-within`. faq는 질문 버튼의 `:focus-visible`
- 비동기 상태(pending·loading): 해당 없음. 카드는 링크·펼침만 하고 요청을 보내지 않음. 목록 불러오기 중 표시는 페이지 담당
- disabled 행 없음: 카드는 비활성 상태가 없음. recruit 안 지원하기 버튼의 disabled는 `components/button.md`를 따름
- invalid·completed 행 없음: 입력·진행 상태가 없는 표면이기 때문임
- selected 행은 faq에만 둠(펼침 상태)

## 5. Behavior

- 카드 전체 링크 패턴(project·blog·photo)
  - root는 `<article>`, 링크는 제목 안 `<a href>` 하나만 둠
  - 링크의 `::after`를 `position: absolute; inset: 0`으로 root 전체에 펼침. root는 `position: relative`
  - 카드 전체를 `<a>`로 감싸지 않음. 링크 이름이 카드 안 글 전체가 되고, 안에 다른 링크(아이콘)를 둘 수 없기 때문임
  - 카드 안 다른 링크(project 아이콘)는 `position: relative; z-index: 1`로 `::after` 위에 올림
  - 태그는 읽기 전용 `<span>`. 클릭 대상으로 만들지 않음(`components/tag.md`)
  - 글자 선택은 포기함(넓힌 영역이 글 위를 덮음). 필요하면 description만 `position: relative`로 올림
- 이동 대상
  - project: 발표 자료(SlideShare) URL. GitHub는 아이콘 링크로 따로 둠
  - blog: Medium 글 URL
  - photo: Instagram URL, 없으면 웹 URL
  - 외부 사이트는 새 탭(`target="_blank" rel="noopener noreferrer"`)으로 열고, 링크 안에 "새 탭에서 열림"을 시각적으로 숨긴 글자로 둠
  - URL이 없는 카드는 링크·hover 효과 없이 rest만 보임(커서 기본값)
- 클릭·탭
  - 포인터 up에서 이동(WCAG 2.5.2)
  - 터치에서는 hover 효과를 적용하지 않음(`@media (hover: hover)` 안에서만 정의)
- 키보드
  - 링크: Tab으로 포커스, Enter로 이동. 카드 하나당 Tab 정지 1회(+ project 아이콘 링크)
  - faq 질문: `<button>`. Enter·Space로 펼침·접힘
  - recruit: 카드는 Tab 정지가 없고 안의 지원하기 버튼만 포커스됨
- 포커스 이동·복귀
  - 새 탭으로 열린 뒤 돌아오면 포커스는 누른 링크에 그대로 있음
  - faq를 펼쳐도 포커스는 질문 버튼에 유지됨
- hover로만 보이는 내용(recruit 설명 글)
  - 제목·설명 글·캐릭터 이미지는 항상 DOM에 두고 `opacity`로만 숨김(스크린 리더는 제목과 설명 글을 모두 읽음)
  - `:hover`와 `:focus-within`에 같은 모습을 줌(WCAG 1.4.13)
  - 터치 기기에서는 설명 글을 항상 보이게 함(`@media (hover: none)`)
- 비동기 중 동작(중복 제출 방지, `aria-busy`): 해당 없음(요청 없음)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background, box-shadow(보더), color | 0.2s | ease-in-out | design-reference 4.3 |
| 아이콘 color(project actions) | 0.2s | ease-in-out | design-reference 4.3 |
| recruit 제목·설명 글·이미지 opacity, 바탕 | 0.2s | ease-in-out | Figma 없음(추정) |
| faq 답변 높이(grid-template-rows) | 0.3s | ease | design-reference 4.3 |

- `transition: all`은 쓰지 않고 대상 속성을 적음(코드의 `all 0.2s`·blog `all 0.3s`는 0.2s로 맞춤)
- 그라데이션 바탕은 보간되지 않으므로 그라데이션 층을 `::before`에 두고 `opacity` 0 → 1로 전환함
- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 크기: 3절 Sizes의 모바일 열. 모바일 카드 폭은 목록 열 폭을 채움(`width: 100%`), 280은 Figma 기준 폭
  - blog: 가로 배치(글 왼쪽·썸네일 오른쪽) → 세로 배치(썸네일 위 280×200, 위쪽 두 모서리 `radius.md`). description 숨김. 날짜 오른쪽에 부문 태그
  - photo: 썸네일 280×200, 글 `typography.body-4`, 날짜 `typography.text-1-mobile` `color.fg.neutral` (#CCCCCC)
  - project: 썸네일 높이 140·radius `raw:10px`, title `typography.body-4`, eyebrow `raw:14px/400`
  - review: 부모 폭, 높이는 글 길이, radius `raw:10px`, 글자 3절(이름 12/700, 기수·부문 10/700, 글 10/400)(2026-10-22 라이브 기준으로 정정)
  - target: 높이 글 길이, 세로 배치, 패딩 `raw:28px`, 아이콘 88×88, 글 `raw:14px/400` 가운데 정렬(코드 `src/widgets/recruiting/ui/target-section/target-card/target-card.css.ts`, 2026-10-22 라이브 기준으로 정정)
  - recruit: 폭 280, 패딩 `raw:28px` / `raw:32px` / 0 / `spacing.5` (20px), 제목 `typography.body-2`, 설명 `typography.body-5`, 캐릭터 이미지 200×200(코드 `src/entities/track/ui/track-card/track-card.css.ts`, 2026-10-22 라이브 기준으로 정정)
  - 태그: 모바일 `raw:12px/400`, 높이 20, 패딩 `raw:3px` / `spacing.2` (8px)(`components/tag.md`, 2026-10-22 라이브 기준으로 정정)
- Figma 모바일 노드
  - 프레임: Figma 7091:10966
  - project 280×300: Figma 7098:8454
  - blog 280×300: Figma 7098:13687
  - photo 280×300: Figma 7098:13688
  - review 342×182(기록용, 라이브 값과 다름): Figma 7289:14365, Figma 8730:16036
  - faq 342×68: Figma 7289:14443
  - target·recruit: Figma 모바일 노드 없음. 라이브 값 사용

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | root `<article>`. 클릭 카드는 제목(`<h3>`) 안 `<a href>`. faq 질문은 `<h3>` 안 `<button>`, 답변은 그 버튼이 가리키는 영역. `<article onClick>`·카드 전체를 감싼 `<a>`·`<div role="link">` 금지 | Figma 없음(추정) |
| 키보드 | 클릭 카드는 Tab 1회 + Enter. project 아이콘 링크는 별도 Tab 정지. faq는 Enter·Space로 펼침. target·review는 Tab 정지 없음 | Figma 없음(추정) |
| aria | 링크 이름은 제목 글자(보이는 글과 같음). 새 탭은 시각적으로 숨긴 "새 탭에서 열림" 덧붙임. 아이콘 링크는 `aria-label`("GitHub 저장소", "발표 자료"), 아이콘 svg는 `aria-hidden="true"`. faq 버튼은 `aria-expanded`와 `aria-controls`. 썸네일 `alt`는 제목과 겹치면 `alt=""`(링크 이름 중복 방지) | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자·UI 요소 3:1<br>`color.bg.layer` (#1A1A1A) 위: `color.fg.default` 17.40, `color.palette.gray.100` 13.94, `color.fg.neutral` 10.84, `color.fg.muted` 6.11, `color.fg.brand` 4.16(큰 글자만)<br>hover 효과 A 위(`color.palette.gray.950` #0D0D0D에 합성 #231E3C~#1F333A, 라이브 값 기준 2026-10-22 재계산): 흰 글자 13.18 이상, `color.palette.gray.100` 10.56 이상, `color.fg.neutral` 8.21 이상<br>target: 흰 글자 대 #333333 12.63, 대 #666666 5.74<br>recruit: rest 흰 제목 대 #333333 12.63, hover 설명 글 #E6E6E6 대 #1A1A1A 13.94. 지원하기 버튼 바탕 #7A64F9 대 카드 바탕 rest #333333 3.02, hover #1A1A1A 4.16(UI 3:1 통과)<br>faq: 흰 글자 대 검정 21.00, 펼친 질문 `color.fg.brand` 대 검정 5.02<br>review 기수·부문: `color.fg.brand` 대 #1A1A1A 4.16. 데스크톱 18 Bold는 큰 글자 기준(18.67px)에 0.67px 모자라고 모바일 10 Bold도 작은 글자라 **알려진 미달**(라이브 값 유지, 2026-10-22 라이브 기준으로 정정)<br>project·photo hover 보더 #2C3F61 대 #1A1A1A 1.65, 장식(카드 경계를 보더에만 의존하지 않음)<br>보더 `color.stroke.weak` 대 #1A1A1A 1.38, 장식 | `docs/wbs/20-token.md` 대비표, 계산값(2026-10-22) |
| 터치 영역 | 최소 24×24: 카드 전체·faq 질문 줄 통과. project 아이콘 링크 24×24는 최소값과 같아 아이콘 사이 gap 12를 줄이지 않음<br>모바일 권장 44×44: 아이콘 링크 미달. 링크 영역을 `padding`으로 44까지 넓힘(겉 크기 유지, 음수 margin) | WCAG 2.2 2.5.8 |
| 포커스 링 | 굵기 2px, offset 2px. 카드는 검정 캔버스 위라 `color.stroke.focus` (#68CBEC). 대 #000000 11.34, 대 #1A1A1A 9.40. `::after`에 `border-radius: inherit`로 카드 모서리를 따라 그림. 제목 `<a>` 자체의 outline은 지움(링이 두 번 그려지지 않게) | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음(카드는 비활성 상태가 없음). recruit 안 버튼은 `components/button.md` | — |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 제목 `<a>` 하나 + `::after`로 카드 전체 클릭 영역 | 카드 전체를 `<a>`로 감싸기, `<article onClick>` |
| 카드 안 아이콘 링크는 `z-index: 1`로 올리고 `aria-label` | 링크 안에 링크·버튼 넣기 |
| 태그는 읽기 전용 `<span>` | 태그에 `cursor: pointer`, 태그를 `<button>`으로 마크업 |
| hover 효과는 `@media (hover: hover)` 안에서만 | 터치에서 hover 모습이 남게 둠 |
| recruit 설명 글은 `:hover`·`:focus-within` 모두에서 보이고 DOM에 항상 둠 | hover 때만 DOM에 넣기, `display: none`으로 숨기기 |
| 전환은 대상 속성만 적음(`background`, `box-shadow`, `color`) | `transition: all` |
| 포커스 링은 카드 바깥 offset 2px, `color.stroke.focus` | 전역 `outline: none`으로 링 제거 |
| 썸네일 radius는 종류별 값(project `raw:16px`, blog `radius.md`) | 모든 썸네일을 한 값으로 통일 |
| 클릭 없는 카드(target·review)는 커서 기본값 | 클릭 없는 카드에 `cursor: pointer` |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/archive/project-card.tsx`, `src/shared/components/archive/project-card.css.ts` | project. slideshare URL이 있으면 카드 전체를 `<a>`로 감쌈. GitHub 링크는 주석 처리됨 |
| frontend | `src/shared/components/archive/blogcard.tsx`, `src/shared/components/archive/blogcard.css.ts` | blog. 링크는 `src/pages/archive-page.tsx`가 카드 밖에서 `<a>`로 감쌈 |
| frontend | `src/shared/components/archive/active-card.tsx`, `src/shared/components/archive/active-card.css.ts` | photo. href가 있으면 카드 전체를 `<a>`로 감쌈 |
| frontend | `src/widgets/recruiting/ui/target-section/target-card/target-card.tsx`, `target-card.css.ts` | target |
| frontend | `src/entities/track/ui/track-card/track-card.tsx`, `track-card.css.ts` | recruit. 지원하기는 `Button` `small-round_primary` |
| frontend | `src/shared/components/accordion/accordion.tsx`, `accordion.css.ts` | faq. 호출부 `src/widgets/faq/ui/faq-content-section.tsx` |
| frontend | `src/widgets/curriculum/ui/review-card-list/review-card.tsx`, `review-card.css.ts` | review |
| frontend 차이 | 위와 같음 | ADOPT-03-15에서 고침. 명세와 다른 점(라이브 값을 명세로 채택한 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- 링크: 카드 전체를 `<a>`로 감쌈(stretched-link 아님), 포커스 링 없음(전역 `outline: none`)<br>- blog: hover 스타일 없음(`cursor: pointer`만. 명세는 Figma hover), 전환 `all 0.3s`<br>- photo: 기수 태그가 `<button>`(명세 읽기 전용 `<span>`)<br>- tag: `cursor: pointer`<br>- target: hover 없음(명세는 Figma #666666)<br>- recruit: 설명 글 hover 때만 opacity 1, `:focus-within` 없음, `cursor: pointer`<br>- review: 바깥이 `<div>`·글이 `<article>`(명세 root `<article>`)
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-06(카드·태그·배지), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | 위 파일 | ProjectCard ↔ project. BlogCard ↔ blog. ActiveCard ↔ photo. TargetCard ↔ target. TrackCard ↔ recruit. Accordion ↔ faq. ReviewCard ↔ review. ValueCard(`src/widgets/recruiting/ui/value-section/value-card/`) ↔ 명세에 없음(Figma 카드 인터렉션에 없음) |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:16px`, `raw:10px` | project 썸네일 radius(데스크톱·모바일) | 코드 `src/shared/components/archive/project-card.css.ts` | 불필요 |
| `raw:#2C3F61` | project·photo hover 보더·안쪽 outline | 코드 `src/shared/components/archive/project-card.css.ts` | 필요 여부 별도 이슈(팔레트에 없음) |
| `raw:rgba(255,255,255,0.6)` | photo 썸네일 자리 채움(이미지 없을 때) | Figma 5236:915, Figma 5980:12396, Figma 6363:11808 | 불필요. rest·hover 두 상태에 같은 값으로 있어 hover 오버레이가 아님 |
| `raw:linear-gradient(180deg, rgba(104,203,236,0), rgba(104,203,236,0.2))`, `raw:linear-gradient(180deg, rgba(122,100,249,0.2), rgba(122,100,249,0))` | hover 효과 A 바탕 2겹(project·photo) | 코드 `src/shared/components/archive/project-card.css.ts` | 필요 여부 별도 이슈 |
| `raw:linear-gradient(180deg, rgba(122,100,249,0.2), rgba(153,153,153,0))`, `raw:linear-gradient(180deg, rgba(102,102,102,0), rgba(100,152,249,0.2))` | blog hover 바탕 2겹(라이브 없음, Figma) | Figma 5236:879 | 필요(button glass hover와 같은 값. COMPONENT-01과 함께 판단) |
| `raw:linear-gradient(180deg, rgba(122,100,249,0.2), rgba(122,100,249,0))`, `raw:linear-gradient(180deg, rgba(59,90,147,0), rgba(100,152,249,0.2))` 2px | blog hover 보더 2겹(라이브 없음, Figma) | Figma 5236:879 | 필요 여부 위와 함께 판단 |
| `raw:21px`, `raw:17px`, `raw:15px`, `raw:38px`, `raw:42px`, `raw:27px`, `raw:39px`, `raw:26px`, `raw:35px`, `raw:2px` | 카드 패딩 | 3절 Sizes 근거 노드 | 불필요 |
| `raw:13px`, `raw:10px`, `raw:20px`(target 글 좌우) | review gap, target 글 여백, faq 모바일 답변 gap | 코드 `src/widgets/curriculum/ui/review-card-list/review-card.css.ts`, Figma 5411:10346, Figma 7289:14449 | 불필요 |
| `raw:10px`(radius), `raw:28.5px`, `raw:42px`, `raw:21px` | review radius·패딩 | 코드 `src/widgets/curriculum/ui/review-card-list/review-card.css.ts` | 불필요 |
| `raw:12px/700`, `raw:10px/700`, `raw:10px/400`, `raw:14px/400` | review 모바일 이름·기수·글, photo 날짜 | 코드 `src/widgets/curriculum/ui/review-card-list/review-card.css.ts`, 코드 `src/shared/components/archive/active-card.css.ts` | 필요 여부 별도 이슈(10·12px 글자 토큰 없음) |
| `raw:0.5px` | faq 하단 보더 | Figma 5317:8886 | 불필요 |
| `raw:14px/400` | 모바일 project eyebrow | Figma 7098:8454 | 필요 여부 디자이너 확인. `typography.text-1`은 14/300 |
| 10px | recruit Figma radius(명세 `radius.sm` 12px, 라이브 확인 전) | Figma 8838:12513 | 불필요(결정으로 12) |
| 24px, 16px | 아이콘 크기(project 링크 아이콘, faq 더하기·빼기) | Figma 5411:10500, Figma 5317:8884 | 불필요 |
| 97×97 | target 아이콘 영역 | Figma 5411:10344 | 불필요 |
| `z-index: 1` | 카드 안 아이콘 링크(stretched-link 위) | Figma 없음(추정) | 불필요. 카드 안 쌓임 순서라 전역 z-index 체계와 무관 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out, 0.3s ease | 전환 | design-reference 4.3 | 불필요 |


## 11. 미확인

- project 카드 자체 링크: Figma는 카드에 클릭 동작이 없고 아이콘에만 URL이 있음. 명세는 frontend 동작(발표 자료로 이동)을 따라 카드 전체 링크로 정함. 디자이너 확인 필요(Figma 5236:823)
  - Figma 추정(약): 원본에 ON_HOVER만 있고 ON_CLICK 없음. 클릭 대상은 동작 정책이라 카드 전체 링크 유지(Figma 5236:822)
- 모든 variant의 press·focus-visible: Figma·라이브 모두 없음(추정)
  - Figma 추정(약): 카드 세트 변형에 press·focus 없음. 포커스는 정책 값으로 확정 가능
