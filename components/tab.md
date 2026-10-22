---
id: tab
name_ko: 탭
ticket: COMPONENT-06
tier: P0
status: review
figma:
  - "5915:7015"
  - "5239:3950"
  - "5639:10002"
  - "5202:3686"
  - "5925:9861"
  - "2416:3726"
  - "2416:3727"
  - "2417:3731"
  - "7064:14044"
  - "7064:14045"
  - "7071:14124"
  - "7249:14310"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 탭 (tab)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 같은 영역 안에서 여러 내용 묶음 중 하나를 골라 보여 주는 선택 요소. 단, text variant는 페이지 이동 메뉴 항목이라 링크 내비게이션으로 처리함(5절·7절)
- 구성: variant 4종(text·box·underline·category)
- 사용 화면
  - text: 탭바(상단 메뉴바) 메뉴 항목(커리큘럼·아카이빙·FAQ 등 페이지 이동)
  - box: 커리큘럼 트랙 선택(분석·시각화·엔지니어링)
  - underline: 아카이빙(프로젝트·블로그·활동사진)
  - category: FAQ 분류(지원·활동·기타), 데스크톱 세로 목록
- 범위 경계
  - 탭바(상단 메뉴바) 자체의 레이아웃(1440×64, 로고 위치, 메뉴 간격 100, 지원하기 버튼)은 페이지 전용 조각이라 범위 밖(design-reference 5.2). 이 명세는 메뉴 항목 한 개의 글자·상태만 정함
  - 지원 폼 탭(Figma 5188:8869, 모바일 7578:9510 342×56)은 부문 선택 카드라 이 명세에 넣지 않음. `components/selection-card.md`(COMPONENT-15, 라디오 그룹)에서 정함
- 관련 명세: `components/button.md`(COMPONENT-01, 탭바 지원하기 glass 버튼), `components/selection-card.md`(COMPONENT-15), `components/filter-chip.md`(COMPONENT-09, 아카이빙 부문·기수 필터), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| list | ○ | 탭 항목을 묶는 컨테이너. box·underline·category는 `role="tablist"`, text는 `<nav>` 안 `<ul>` | underline 목록 아래 구분선 `color.stroke.weak` (#333333) 1px(코드 기준, 4절) |
| tab(root) | ○ | 항목 한 개. box·underline·category는 `<button role="tab">`, text는 `<a href>` | 3·4절 |
| label | ○ | 한 줄 글자. 보이는 이름과 접근 이름이 같음 | `typography.body-4`, `typography.body-3`, `typography.body-2`, `typography.headline-3`, `typography.body-4-mobile` |
| indicator | × | underline variant의 selected 아래 선 | `color.fg.default` (#FFFFFF) 1px |
| panel | ○(text 제외) | 선택된 탭이 보여 주는 내용 영역. `role="tabpanel"` | — |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| text | 탭바 메뉴 항목. 바탕 없음. 선택은 글자 굵기와 색으로 표시. 페이지 이동(URL 변경) | Figma 5239:3950, Figma 7064:14045, design-reference 5.2 |
| box | 커리큘럼 트랙 전환. 면이 있는 사각 탭. hover 흰 바탕 | Figma 5639:10002, Figma 7249:14310 |
| underline | 아카이빙 종류 전환. 바탕 없음. selected 아래 선 | Figma 5202:3686, Figma 7071:14124 |
| category | FAQ 분류 전환. 데스크톱 세로 목록. hover 시 `color.bg.layer` 바탕 | Figma 5925:9861, Figma 2416:3726, Figma 2416:3727, Figma 2417:3731 |

- Figma 인터랙션 시트(5915:7015)의 상태 열 이름은 Default·Hover·Selected이고, FAQ만 Hover-Selected 열이 더 있음. 이 명세는 Hover-Selected를 selected 행의 hover 칸에 적음
- box의 Figma 변형 이름은 Default·Active 두 개이나, 인터랙션 시트에서 Active 변형(5639:10003) 옆 라벨은 Hover임. 이 명세는 흰 바탕을 hover와 selected 모두에 씀(4절, 11절)

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| text | 63×21(글자 폭) | 63×21(글자 폭) | — | — | `typography.body-4` / selected `typography.body-3` | Figma 5239:3949, Figma 5239:3951, Figma 7064:14046, Figma 7064:14048 |
| box | 200×68 | 100×40 | 데스크톱 `radius.sm` (12px) / 모바일 `raw:5px` | 데스크톱 `raw:21px` / `raw:33px`, gap `raw:10px` / 모바일 가운데 정렬 | `typography.body-2` / 모바일 `typography.body-4-mobile` | Figma 5639:10001, Figma 7249:14311 |
| underline | 100×60 | 80×52 | — | 데스크톱 `spacing.4` (16px) / `raw:10px` / 모바일 가운데 정렬 | `typography.headline-3` / 모바일 `typography.body-3` | Figma 5202:3685, Figma 7071:14123 |
| category | 200×87 | Figma 없음 | — | `raw:29px` / `raw:132px` / `raw:29px` / `raw:15px` | `typography.headline-3` | Figma 5925:9862, Figma 2416:3726 |

- 높이: 표의 값으로 고정함(패딩 합으로 정하지 않음). 폭은 글자 길이에 따라 늘어남(box·category는 표의 폭을 최소 폭으로 씀)
- padding 값 순서: 2개는 세로 / 가로, 4개는 위 / 오른쪽 / 아래 / 왼쪽(CSS 순서)
- box 데스크톱 radius: Figma 10은 토큰에 없음. `radius.sm` 토큰 설명의 결정(사각 요소 10 → 12 통일)에 따라 12로 적음
- box 모바일 radius: Figma 약 4.8(소수점 값). `raw:5px`로 반올림함
- category 2416:3726의 폭은 191, 인터랙션 시트 5925:9862는 200. 나중 시트인 200을 씀
- 항목 사이 간격: Figma 페이지 프레임에서 확인하지 않음. 코드 값은 9절, 미확인은 11절

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.
press는 Figma에 없어 hover 값을 유지함(추정).

### text

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.palette.gray.300` (#B3B3B3), `typography.body-4` / — | — / `color.fg.default` (#FFFFFF), `typography.body-4` / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5239:3949, Figma 5875:9854, Figma 없음(추정, press·focus-visible) |
| selected | — / `color.fg.default` (#FFFFFF), `typography.body-3` / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5239:3951, Figma 없음(추정, hover·press·focus-visible) |

### box

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.palette.gray.800` (#333333) / `color.fg.default` (#FFFFFF) / — | `color.bg.neutral-solid` (#FFFFFF) / `color.fg.on-inverse` (#000000) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5639:10001, Figma 5639:10003, Figma 없음(추정, press·focus-visible) |
| selected | `color.bg.neutral-solid` (#FFFFFF) / `color.fg.on-inverse` (#000000) / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5639:10003, 코드 `src/shared/components/fixed-tab/fixed-tab.css.ts` |

- default rest 글자
  - Figma: #000000(검정 위 #333333 바탕, 1.66:1로 읽기 어려움)
  - 명세: `color.fg.default` (#FFFFFF, 12.63:1)로 바꿈. 11절 참조
- 모바일 box(Figma 7249:14310)는 데스크톱과 색이 다름

| 기본 상태(모바일) | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / `color.fg.muted` (#999999) / — | — | — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 7249:14311, Figma 없음(추정, focus-visible) |
| selected | `color.palette.purple.200` (#6250C7) / `color.fg.default` (#FFFFFF) / — | — | — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 7249:14309, Figma 없음(추정, focus-visible) |

- 모바일 default 글자: Figma #666666(`color.bg.layer` 위 3.03:1, 15 Regular라 미달). 명세는 `color.fg.muted` (#999999, 6.11:1)로 바꿈. 11절 참조
- 모바일은 터치 환경이라 hover·press 색을 두지 않음

### underline

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.muted` (#999999) / — | — / `color.fg.default` (#FFFFFF) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5202:3685, Figma 5202:3689, Figma 7071:14123, Figma 없음(추정, press·focus-visible) |
| selected | — / `color.fg.default` (#FFFFFF) / 아래 선 `color.fg.default` (#FFFFFF) 1px | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5202:3687, Figma 7071:14127, Figma 없음(추정, hover·press·focus-visible) |

- 아래 선 색: 선 전용 흰색 시맨틱 토큰이 없어 `color.fg.default`를 선 색으로 씀(값 #FFFFFF)
- 목록 아래 구분선 `color.stroke.weak` (#333333) 1px은 Figma 컴포넌트에 없고 코드에만 있음. 유지하되 selected 아래 선이 구분선 위에 겹치게 함(코드 `margin-bottom: -1px` 방식)

### category

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.canvas` (#000000) / `color.fg.muted` (#999999) / — | `color.bg.layer` (#1A1A1A) / `color.fg.neutral` (#CCCCCC) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5925:9862, Figma 5925:9864, Figma 2416:3727, Figma 없음(추정, press·focus-visible) |
| selected | `color.bg.canvas` (#000000) / `color.fg.default` (#FFFFFF) / — | `color.bg.layer` (#1A1A1A) / `color.fg.default` (#FFFFFF) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5925:9866, Figma 5925:9868, Figma 2416:3726, Figma 없음(추정, press·focus-visible) |

- default hover 글자: 이전 컴포넌트 2417:3731은 #FFFFFF, 인터랙션 시트 5925:9864는 #CCCCCC. 나중 시트를 따라 `color.fg.neutral` (#CCCCCC)를 씀
- category 모바일: Figma 없음. 코드는 가로 줄 + selected 아래 2px 선. 모바일에서는 underline variant 모바일 값(80×52 기준, `typography.body-3`)을 씀(추정, 6절)

- 포커스 링
  - 트리거: `:focus-visible`
  - outline은 요소 밖(offset 2px)에 그림. 모든 variant가 검정 캔버스 위에 놓이므로 `color.stroke.focus` (#68CBEC)를 씀
- 비동기 상태: 해당 없음. 탭 전환 후 패널 내용 불러오기 중 표시는 패널 쪽 책임(5절)
- disabled·invalid·completed 행은 두지 않음
  - disabled: Figma에 없고 사용 화면에 비활성 탭이 없음
  - invalid·completed: 탭의 상태가 아님

## 5. Behavior

- 요소 선택(탭 의미 vs 링크 내비게이션)
  - 같은 페이지 안에서 패널 내용만 바꿈(URL 경로가 바뀌지 않음): box·underline·category. `role="tablist"`/`tab`/`tabpanel` 사용
  - 다른 페이지로 이동(URL 경로가 바뀜): text. 탭 role을 쓰지 않고 `<nav>` 안 `<a href>` 목록으로 만듦. 현재 페이지 항목에 `aria-current="page"`. 방향키 이동 없음, Tab 키로 항목마다 이동
  - box·underline·category를 나중에 URL로 바꾸는 경우(예: `?tab=blog` 쿼리, `/archive/blog` 경로): 쿼리만 바꾸고 페이지가 그대로면 탭 의미 유지. 경로가 바뀌어 다른 페이지로 이동하면 링크 내비게이션으로 바꿈
- 클릭·탭
  - 포인터 up에서 선택 변경
  - 이미 선택된 탭을 다시 누르면 아무 동작도 하지 않음(아카이빙 코드의 검색·필터 초기화가 다시 일어나지 않게 함)
  - 터치에서는 hover 색을 적용하지 않음
- 키보드(box·underline·category)
  - Tab: 탭 목록으로 들어오면 selected 탭에 포커스. 다시 Tab이면 패널로 이동
  - 방향키: 가로 목록은 ←·→, 세로 목록(category 데스크톱)은 ↑·↓로 이전·다음 탭에 포커스. 끝에서 처음으로 순환함
  - Home·End: 처음·마지막 탭에 포커스
  - Enter·Space: 포커스된 탭을 선택(패널 전환)
- 활성화 방식: 수동 활성화(포커스 이동과 선택을 분리)
  - 근거: 세 화면 모두 탭을 바꾸면 서버 요청(TanStack Query)이 일어나고, 아카이빙은 검색어·필터·페이지 번호를 초기화함. 방향키로 지나가기만 해도 요청과 초기화가 일어나면 안 되므로 WAI-ARIA Authoring Practices의 "패널 표시에 지연이 있으면 수동 활성화" 기준을 따름
  - 세 화면 모두 같은 방식으로 통일함(화면마다 키 동작이 달라지지 않게 함)
- 포커스 이동·복귀
  - roving tabindex: selected 탭만 `tabindex="0"`, 나머지 `tabindex="-1"`
  - 선택 후 포커스는 탭에 유지함(패널로 옮기지 않음)
- 비동기 중 동작
  - 탭은 바로 selected로 바뀜. 중복 요청 방지는 데이터 계층(쿼리 키)이 담당함
  - 패널에 불러오기 중 표시가 필요하면 패널에 `aria-busy="true"`(탭에는 두지 않음)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, color(box·category) | 0.2s | ease | design-reference 4.3 |
| color, border-color(underline·text) | 0.2s | ease | 코드 `src/pages/archive-page.css.ts` |

- text variant의 글자 굵기 변화(Regular → Bold)는 전환하지 않음. 굵기 변화로 폭이 흔들리지 않도록 항목 폭을 Bold 기준으로 잡음
- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - text: 크기·글자 동일. hover 없음
  - box: 100×40, `color.bg.layer` / `color.palette.purple.200` 색 체계, `typography.body-4-mobile`, radius `raw:5px`
  - underline: 80×52, `typography.body-3`. 코드는 3칸 균등 그리드
  - category: 세로 목록 → 가로 줄로 바뀜. 모양은 underline 모바일 값을 씀(Figma 없음, 추정). `aria-orientation`도 `horizontal`로 바뀌고 방향키는 ←·→
  - 가로 줄이 화면 폭을 넘으면 가로 스크롤함(줄바꿈하지 않음). 선택된 탭이 보이도록 스크롤 위치를 맞춤
- Figma 모바일 노드
  - 프레임: Figma 7064:14044
  - text: Figma 7064:14045
  - underline: Figma 7071:14124
  - box: Figma 7249:14310

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | box·underline·category: 컨테이너 `role="tablist"`, 항목 `<button type="button" role="tab">`, 내용 `role="tabpanel"`<br>text: `<nav aria-label="주 메뉴">` 안 `<ul>`·`<li>`·`<a href>`. tab role 금지 | Figma 없음(추정) |
| 키보드 | 탭 목록: ←·→(가로) / ↑·↓(세로), Home·End, Enter·Space로 선택, 수동 활성화. 패널은 Tab으로 진입<br>text: Tab으로 이동, Enter로 이동 | Figma 없음(추정) |
| aria | 탭: `aria-selected="true"` 또는 `"false"`, `aria-controls="{패널 id}"`, `id` 지정<br>탭 목록: 보이는 제목이 없으면 `aria-label`(예: "트랙", "자료 종류", "질문 분류"). category 데스크톱은 `aria-orientation="vertical"`<br>패널: `aria-labelledby="{탭 id}"`, 패널 안 첫 요소가 포커스 대상이 아니면 `tabindex="0"`. 선택되지 않은 패널은 `hidden`<br>text: 현재 페이지 링크에 `aria-current="page"`. 접근 이름은 보이는 글자와 같게 둠("~으로 이동" 같은 `aria-label` 덧붙이지 않음) | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자·UI 요소 3:1<br>text: default #B3B3B3/#000000 10.02, hover·selected 21.00<br>box: default #FFFFFF/#333333 12.63, hover·selected #000000/#FFFFFF 21.00, 바탕 #333333/캔버스 1.66(글자 대비로 구분)<br>box 모바일: default #999999/#1A1A1A 6.11, selected #FFFFFF/#6250C7 6.01, selected 바탕/캔버스 3.49<br>underline: default #999999/#000000 7.37, selected 21.00, 아래 선 #FFFFFF/#000000 21.00<br>category: default 7.37, default hover #CCCCCC/#1A1A1A 10.84, selected 21.00, selected hover #FFFFFF/#1A1A1A 17.40<br>category default와 selected는 글자색만 다름(#FFFFFF 대 #999999 2.85). 11절 | `docs/wbs/20-token.md` 대비표, 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: 전 variant 통과(text는 글자 높이 21이라 링크 영역에 위아래 `raw:2px` 이상을 더해 24 이상 확보. Figma 없음(추정))<br>모바일 권장 44×44: box 100×40, text 63×21 미달 | WCAG 2.2 2.5.8 |
| 포커스 링 | `color.stroke.focus` (#68CBEC), 2px, offset 2px. 검정 캔버스 위 11.34:1. box selected(흰 바탕)도 링은 바탕 밖 캔버스 위에 놓임 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음. 비활성 탭을 두지 않음. 필요해지면 `aria-disabled="true"`로 포커스는 유지(WAI-ARIA 탭 패턴 권고: 비활성 탭도 방향키 이동 대상에 남겨 존재를 알림. 버튼의 네이티브 `disabled` 규칙과 다른 예외) | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 같은 페이지 패널 전환은 `role="tab"` + `aria-selected` | `<div onClick>`로 탭 만들기, 선택을 클래스 이름으로만 표시 |
| 페이지 이동 메뉴는 `<a href>` + `aria-current="page"` | 페이지 이동 링크에 `role="tab"`을 붙이기 |
| 방향키는 포커스만 옮기고 Enter·Space로 선택(수동 활성화) | 방향키로 지나가기만 해도 서버 요청·필터 초기화 실행 |
| roving tabindex로 탭 목록을 Tab 한 번에 통과 | 모든 탭을 `tabindex="0"`으로 두어 Tab을 여러 번 누르게 함 |
| 이미 선택된 탭 재선택은 무시 | 재선택 때 검색어·필터를 다시 초기화 |
| 탭 스타일은 탭에만 씀 | 링크 버튼(리크루팅 "커리큘럼 보러가기")에 탭 selected 스타일 재사용. 버튼 명세(neutral)를 씀 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/fixed-tab/fixed-tab.tsx`, `src/shared/components/fixed-tab/fixed-tab.css.ts` | box에 해당. 컴포넌트 이름 `FixedButton`, `isActive`로 선택 표시<br>사용처: `src/features/track/ui/track-select-button/track-tab-group.tsx`(커리큘럼 트랙). 목록 간격 데스크톱 50px·모바일 22px(`track-tab-group.css.ts`), `fixed-tab.css.ts`의 `container` 80px은 사용처 없음<br>`src/widgets/recruiting/ui/recruiting-bottom-section/recruiting-bottom-section.tsx`가 링크 두 개에 `fixedTab({ isActive: true })` 스타일만 가져다 씀 |
| frontend(underline) | `src/pages/archive-page.tsx`, `src/pages/archive-page.css.ts` | 공용 컴포넌트 없이 페이지에서 직접 `tab`·`tabRow` 스타일. 목록 간격 40px(`spacing.10`), 목록 아래 1px #333333 |
| frontend(category) | `src/widgets/faq/ui/faq-content-section.tsx`, `src/widgets/faq/ui/faq-content-section.css.ts` | `<nav>` 안 `<button>`, `tabVariants` |
| frontend(text) | `src/widgets/common/ui/tab-bar/tab-bar.tsx`, `src/widgets/common/ui/tab-bar/tab-bar.css.ts` | `NavLink`(현재 페이지에 `aria-current="page"` 자동 부여)와 `navItem`·`navItemActive`. 탭바 레이아웃은 범위 밖 |
| frontend 차이 | 위 파일 | 수정 예정(ADOPT-03·04). 명세와 다른 점<br>- 네 곳 모두 `role="tablist"`·`tab`·`tabpanel`·`aria-selected`·방향키 없음<br>- FAQ: 탭 목록을 `<nav>`로 감쌈(페이지 이동이 아니므로 tablist여야 함)<br>- box: default 글자 검정(#333333 위 1.66:1), hover #666666(명세 흰 바탕), radius 10(명세 `radius.sm`), 폭 226(명세 200), 모바일 #333333/#FFFFFF 체계(명세 `color.bg.layer`/`color.palette.purple.200`)<br>- underline: selected 선 2px(명세 1px)<br>- category: hover 바탕·글자 변화 없음(명세 `color.bg.layer` / `color.fg.neutral`)<br>- text: default 글자 흰색(명세 `color.palette.gray.300`), hover에서 Bold로 바뀜(명세 색만 흰색, 굵기 유지), `aria-label="{메뉴}으로 이동"`<br>- 포커스: 전역 `outline: none`, `:focus-visible` 없음<br>- 리크루팅 링크에 탭 스타일 재사용(8절) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-08(탭), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/fixed-tab/fixed-tab.tsx` | fixed-tab(`FixedButton`) ↔ box. `isActive` ↔ selected. archive `tab.active` ↔ underline selected. faq `tabVariants.active` ↔ category selected. tab-bar `navItemActive` ↔ text selected |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:21px`, `raw:33px` | box 데스크톱 패딩 | Figma 5639:10001 | 불필요(button neutral과 같은 값) |
| `raw:10px` | box gap, underline 좌우 패딩 | Figma 5639:10001, Figma 5202:3685 | 불필요 |
| `raw:5px` | box 모바일 radius(Figma 약 4.8) | Figma 7249:14309 | 불필요(모바일 1곳) |
| `raw:29px`, `raw:132px`, `raw:15px` | category 패딩 | Figma 5925:9863 | 불필요 |
| 1px | underline selected 아래 선, 목록 구분선 | Figma 5202:3687, 코드 `src/pages/archive-page.css.ts` | 불필요 |
| 200×68, 100×40, 100×60, 80×52, 200×87 | 탭 크기 | Figma 5639:10001, Figma 7249:14311, Figma 5202:3685, Figma 7071:14123, Figma 5925:9862 | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- box hover와 selected가 같은 흰 바탕
  - Figma 5639:10002에는 Default·Active 두 변형뿐이고, 인터랙션 시트 라벨은 Active 변형 옆에 Hover로 적힘
  - 티켓(COMPONENT-06-01)은 "hover 흰 배경", 코드는 selected 흰 바탕·hover #666666
  - 명세: hover·selected 모두 `color.bg.neutral-solid`. hover 중인 비선택 탭과 선택 탭이 같아 보임. 디자이너 확인 필요(Figma 5639:10003)
- box default 글자: Figma #000000(#333333 위 1.66:1). 명세는 `color.fg.default`로 바꿈. 디자이너 확인 필요(Figma 5639:10000)
- box 모바일 default 글자: Figma #666666(`color.bg.layer` 위 3.03:1). 명세는 `color.fg.muted`로 바꿈. 디자이너 확인 필요(Figma 7249:14312)
- box 모바일 색 체계(`color.bg.layer` / `color.palette.purple.200`)가 데스크톱(#333333 / 흰색)과 다름. 의도 여부 디자이너 확인 필요(Figma 7249:14310)
- category default와 selected가 글자색으로만 구분됨(#FFFFFF 대 #999999 2.85:1, WCAG 1.4.1 색 이외 단서 없음). 굵기·아래 선 등 추가 단서 여부 디자이너 확인 필요(Figma 5925:9866)
- category 모바일: Figma 없음. underline 모바일 값을 쓰는 것으로 추정
- text variant default 색: Figma 컴포넌트는 #B3B3B3, design-reference 5.2는 "18 Regular, 불투명도 0.8"(흰색 0.8이면 약 #CCCCCC). 컴포넌트 값 `color.palette.gray.300`을 씀(Figma 5239:3949, Figma 1866:4188)
- 모든 variant의 press·focus-visible, selected의 hover(category 제외): Figma 없음. 추정값
- 항목 사이 간격(text 100, box·underline·category): Figma 페이지 프레임에서 확인하지 않음. 코드 값만 9절에 기록
- 터치 영역 미달: 모바일 box 100×40, text 63×21(모바일 메뉴 Figma 7064:14045)
- underline selected 아래 선 굵기: Figma 1px, 코드 2px. 명세는 Figma 1px. 디자이너 확인 필요(Figma 5202:3687)
