---
id: pagination
name_ko: 페이지네이션
ticket: COMPONENT-12
tier: P1
status: review
figma:
  - "2653:6538"
  - "5239:823"
  - "5239:855"
  - "5239:909"
  - "5239:862"
  - "7078:3511"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 페이지네이션 (pagination)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 목록을 페이지 단위로 나눠 보여 줄 때 이전·다음 이동과 특정 페이지 이동을 제공하는 도트형 이동 요소
- 구성: 이전 화살표 + 점 최대 5개 + 다음 화살표. 숫자는 표시하지 않음
- 사용 화면: 아카이빙(프로젝트·활동사진·블로그 목록), 커리큘럼 후기 목록
- 관련 명세: `components/button.md`(text-link 상태 색, COMPONENT-01), `components/card.md`(페이지로 나뉘는 카드 목록, COMPONENT-08), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<nav aria-label="페이지 이동">`. 가로 한 줄, 가운데 정렬 | 간격 3절 |
| prev | ○ | 이전 페이지 `<button>`. chevron 왼쪽 아이콘(데스크톱 48×48, 모바일 50×50) | `color.fg.default` (#FFFFFF) |
| dots | ○ | 점 버튼 묶음. 현재 페이지를 포함한 최대 5개 페이지를 보여 줌 | 간격 3절 |
| dot | ○ | 페이지 하나로 이동하는 `<button>`. 안에 1px 테두리 원. 현재 페이지는 채운 원 | `color.stroke.neutral` (#999999), `color.palette.gray.0` (#FFFFFF) |
| next | ○ | 다음 페이지 `<button>`. chevron 오른쪽 아이콘 | `color.fg.default` (#FFFFFF) |

- 점 개수: 전체 페이지가 5 이하이면 전체 페이지 수만큼, 6 이상이면 5개
- 보이는 범위: 현재 페이지가 가운데에 오도록 잡고, 처음·끝에서는 1~5 또는 끝 5개로 고정함(코드 `src/shared/components/pagination/pagination.tsx`의 계산과 같음)
- 전체 페이지가 0이면 그리지 않음. 1이면 그리되 화살표 둘 다 disabled

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| uniform | 데스크톱. 점 5개가 모두 20px | Figma 2653:6538, Figma 5239:823, Figma 3328:6385, Figma 4817:7572 |
| scaled | 모바일. 현재 점에서 멀수록 작아짐(20 → 15 → 10) | Figma 7078:3511, Figma 6459:12384, Figma 6742:14205 |

- variant는 화면 폭으로 정함. props로 고르지 않음(6절)

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| root | 296×50(점 5개) | 340×50(점 5개) | — | 0, 화살표–점 묶음 gap 데스크톱 `spacing.5` (20px) / 모바일 `raw:30px` | — | Figma 3328:6385, Figma 5239:823, Figma 7078:3511 |
| 화살표 버튼 | 48×48(글리프 13×22) | 50×50(글리프 14×23) | — | 0 | — | Figma 5239:855, Figma 5239:909, Figma 6459:12385 |
| 점(보이는 원) | 20×20 | 현재 20×20, 거리 1은 15×15, 거리 2 이상은 10×10 | 원형(`border-radius: 50%`) | — | — | Figma 5239:862, Figma 6459:12386 |
| 점 버튼(누르는 영역) | 24×24, 원은 가운데 | 24×24, 원은 가운데 | — | — | — | Figma 없음(추정) |
| 점 묶음 gap | 버튼 사이 `raw:11px`(원 사이 15px, 중심 간격 35px 유지) | 버튼 사이 `spacing.3` (12px)(원 사이 약 20~24px) | — | — | — | Figma 2653:6119, Figma 6459:12386 |

- "거리": 현재 페이지 점에서 몇 칸 떨어졌는지. 처음·끝 페이지라 현재 점이 가운데가 아닐 때도 같은 규칙을 씀
- 점 버튼 24×24: 원(20px 이하)만으로는 WCAG 2.5.8 최소 24×24를 채우지 못해 투명 영역을 둠. 원 사이 간격이 Figma와 같도록 버튼 사이 gap을 줄임
- 화살표–점 묶음 gap: Figma 컴포넌트 원본 2653:6538은 40, 실제 화면 인스턴스(3328:6385·4817:7572)와 Components 페이지 세트(5239:823)는 20. 화면에 놓인 값 20을 씀. 11절 참조

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### 화살표(prev·next)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.default` (#FFFFFF) / — | — / `color.fg.default` (#FFFFFF) / — | — / `color.fg.muted` (#999999) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5239:856, Figma 5239:871, Figma 5239:913, Figma 없음(추정, press·focus-visible) |
| disabled | — / `color.palette.gray.800` (#333333) / — | — | — | — | Figma 5239:854, Figma 5239:908 |

- hover: Figma Hover 변형(5239:871·5239:913)이 Default와 색·모양이 같음. 색 변화 없이 `cursor: pointer`만 둠. 11절 참조
- press: Figma에 없어 `components/button.md` text-link hover 값(`color.fg.muted`)을 씀
- disabled: Figma 화면 인스턴스는 흰색 불투명도 0.2(검정 위 #333333과 같은 색). 불투명도 대신 `color.palette.gray.800`으로 적음

### 점(dot)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | 투명 / — / `color.stroke.neutral` (#999999) 1px | 투명 / — / `color.palette.gray.0` (#FFFFFF) 1px | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px(24×24 버튼 둘레) | Figma 5239:861, Figma 5239:863, Figma 없음(추정, press·focus-visible) |
| selected | `color.palette.gray.0` (#FFFFFF) / — / `color.palette.gray.0` (#FFFFFF) 1px | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5239:865, Figma 없음(추정, focus-visible) |

- 포커스 트리거: `:focus-visible`. outline은 버튼(점 24×24, 화살표 48×48) 밖에 그림
- 비동기 상태(pending·loading): 해당 없음. 페이지 데이터 불러오기는 목록 쪽에서 표시함
- invalid·completed 행 없음: 입력·진행 결과가 없는 이동 요소이기 때문임
- 점 disabled 행 없음: 보이는 점은 모두 존재하는 페이지임

## 5. Behavior

- 클릭·탭
  - prev·next: 현재 페이지 −1·+1로 이동
  - 점: 그 페이지로 바로 이동
  - 현재 페이지 점: 눌러도 아무 일도 없음(`cursor: default`)
  - 이동하면 `onPageChange(page)` 호출. 목록 갱신·스크롤 위치는 사용하는 화면이 정함
  - 터치에서는 hover 색을 적용하지 않음
- 점을 버튼으로 둔 이유(점은 표시만이 아니라 페이지 직접 이동)
  - Figma 점 세트(5239:862)에 Hover 변형과 클릭 시 Selected로 바뀌는 프로토타입 연결이 있음
  - 코드도 점마다 `goToPage`를 호출하는 `<button>`임
  - 점 5개가 전체가 아니라 현재 주변만 보여 주므로, 화살표만 있으면 두세 칸 이동에 여러 번 눌러야 함
- 키보드
  - Tab으로 prev → 점(왼쪽부터) → next 순서로 이동. 방향키 이동은 두지 않음
  - Enter·Space로 실행(`<button>` 기본 동작)
- 포커스 이동·복귀
  - 실행 후 포커스를 누른 버튼에 유지함
  - 점을 눌러 보이는 범위가 바뀌면(예: 5 → 6) 같은 페이지 번호의 점으로 포커스를 옮김. 그 점이 범위 밖이면 현재 페이지 점으로 옮김
  - 처음·끝 페이지에서 prev·next가 disabled가 돼도 포커스를 잃지 않게 `aria-disabled="true"`를 씀(7절)
- 비동기 중 동작: 해당 없음. 이동 요청은 즉시 상태를 바꾸고, 목록 불러오기 표시는 목록이 담당함

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| 점 background-color, border-color | 0.2s | ease | design-reference 4.3 |
| 화살표 color | 0.2s | ease | Figma 없음(추정) |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 기본 스타일(769px 이상)은 데스크톱 uniform 값을 씀
- 모바일에서 바뀌는 속성
  - variant: uniform → scaled(점 크기 20·15·10)
  - 화살표: 48×48 → 50×50
  - 화살표–점 묶음 gap: `spacing.5` (20px) → `raw:30px`
  - 점 버튼 사이 gap: `raw:11px` → `spacing.3` (12px)
  - 점 개수: 데스크톱과 같이 최대 5개
- Figma 모바일 노드
  - Components 페이지 모바일 세트: Figma 7078:3511, Figma 7091:5199
  - 아카이빙 활동사진: Figma 6459:12384, Figma 6459:14631
  - 아카이빙 검색·필터: Figma 6742:14205

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | root `<nav aria-label="페이지 이동">`(한 화면에 탭바 등 다른 `<nav>`가 있어 이름이 필요함). prev·next·점은 `<button type="button">` | 코드 `src/shared/components/pagination/pagination.tsx` |
| 키보드 | Tab으로 각 버튼 이동, Enter·Space로 실행. 현재 페이지 점도 Tab 대상에 남김 | Figma 없음(추정) |
| aria | prev `aria-label="이전 페이지"`, next `aria-label="다음 페이지"`<br>점 `aria-label="페이지 N"`(N은 페이지 번호)<br>현재 페이지 점 `aria-current="page"`(disabled로 만들지 않음)<br>처음·끝의 prev·next는 `aria-disabled="true"` + 클릭 처리 함수에서 무시<br>화살표 아이콘 `aria-hidden="true"` | 코드 `src/shared/components/pagination/pagination.tsx` |
| 대비 | 기준: UI 요소 3:1<br>화살표 rest·hover #FFFFFF 대 검정 21.00, press #999999 7.37<br>점 default 테두리 #999999 대 검정 7.37, hover·selected #FFFFFF 21.00<br>default와 selected는 색이 아니라 채움 여부로도 구분됨<br>화살표 disabled #333333 대 검정 1.66, WCAG 1.4.3 비활성 예외 | 계산값(검정 캔버스 #000000 기준) |
| 터치 영역 | 최소 24×24: 화살표 48·50, 점 버튼 24로 통과<br>모바일 권장 44×44: 화살표 통과, 점 24×24는 미달(같은 동작을 화살표로도 할 수 있음) | WCAG 2.2 2.5.8 |
| 포커스 링 | `color.stroke.focus` (#68CBEC) 2px, offset 2px. 검정 캔버스 위 11.34:1 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | prev·next는 `aria-disabled="true"`. 네이티브 `disabled`를 쓰지 않는 이유: 마지막 페이지로 가는 next를 누르는 순간 버튼이 disabled가 되어 포커스가 `<body>`로 사라짐. 색(#333333)과 함께 `cursor: default` | Figma 5239:854 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 점을 `<button>` + `aria-label="페이지 N"`으로 만들어 직접 이동 제공 | 점을 이름 없는 `<span>`·`<div onClick>`으로 만듦 |
| 현재 페이지 점에 `aria-current="page"` | 현재 페이지 점을 `disabled`로 만들어 Tab 순서·읽기에서 빠지게 함 |
| 처음·끝의 화살표는 `aria-disabled="true"`로 포커스 유지 | 네이티브 `disabled`로 바꿔 누른 직후 포커스를 잃게 함 |
| 점 버튼 누르는 영역 24×24 이상 | 10~20px 원 자체를 누르는 영역으로 씀 |
| 점은 최대 5개, 모바일은 크기 20·15·10 | 모바일에서 점 개수를 7개로 늘림 |
| default 점 테두리는 `color.stroke.neutral` | default 점 테두리를 흰색으로 그려 hover와 구분이 사라짐 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/pagination/pagination.tsx`, `src/shared/components/pagination/pagination.css.ts`, `src/shared/hooks/use-pagination.ts` | props: `currentPage`, `totalPages`, `onPageChange`, `maxDots`(기본 5)<br>사용 화면: `src/pages/archive-page.tsx`(아카이빙), `src/widgets/curriculum/ui/review-section/review-section.tsx`(후기, 모바일 `maxDots={7}`)<br>아이콘: `src/shared/assets/icons/ic_chevron_left.svg`·`ic_chevron_right.svg`(50 viewBox) |
| frontend 차이 | 위와 같음 | ADOPT-03-17에서 고침. 명세와 다른 점<br>- default 점 테두리: 흰색(명세 `color.stroke.neutral` #999999)<br>- 점 hover·화살표 press 없음<br>- 현재 페이지 점: `disabled`(명세 `aria-current="page"`, Tab 대상 유지)<br>- 화살표 비활성: 네이티브 `disabled` + opacity 0.2(명세 `aria-disabled` + `color.palette.gray.800`)<br>- `<nav>`에 `aria-label` 없음<br>- 화살표 크기: 데스크톱 35px, 모바일 16px(명세 48·50px. 모바일 16px는 24×24 미달)<br>- 화살표–점 gap: 데스크톱 40px, 모바일 20px(명세 `spacing.5`·`raw:30px`)<br>- 모바일 점: 12px 균일(명세 scaled 20·15·10)<br>- 점 버튼 누르는 영역: 원 크기와 같음(명세 24×24)<br>- 후기 모바일 `maxDots={7}`(명세 5)<br>- `:focus-visible` 없음(전역 `outline: none`, ADOPT-01) |
| frontend_admin | `src/pages/content-archive/ui/ArchivingSection.tsx` | 관리자 콘솔은 이 명세의 값을 따르지 않음. ADOPT-07-09(동작·접근성만 이 명세), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/pagination/pagination.css.ts` | `dot.default` ↔ default, `dot.active` ↔ selected. `arrowButton:disabled` ↔ disabled |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:30px` | 모바일 화살표–점 묶음 gap | Figma 7078:3511 | 불필요(모바일 1곳) |
| `raw:11px` | 데스크톱 점 버튼 사이 gap(원 사이 15px를 24×24 버튼으로 환산) | Figma 2653:6119 | 불필요 |
| 15px | Figma 데스크톱 점 원 사이 간격 | Figma 2653:6119 | 불필요(버튼 gap `raw:11px`로 대체) |
| 48×48, 50×50 | 화살표 아이콘 크기(데스크톱·모바일) | Figma 5239:855, Figma 6459:12385 | 불필요 |
| 20·15·10px | 점 지름 | Figma 5239:862, Figma 6459:12386 | 불필요 |
| 24×24 | 점 버튼 누르는 영역 | Figma 없음(추정) | 불필요 |
| 1px | 점 테두리 굵기 | Figma 5239:859 | 불필요 |
| `border-radius: 50%` | 점 원형 | Figma 5239:862 | 불필요(`radius.full` 40px은 20px 원에도 같은 결과지만 의미상 원형으로 적음) |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- 화살표 hover: Figma Hover 변형(5239:871·5239:913)이 Default와 색·모양이 같음. 명세는 색 변화 없음으로 적음. hover 표시를 둘지 디자이너 확인 필요
- 화살표 press, 점 press: Figma 없음. 추정값
- 모든 focus-visible: Figma에 Focus 상태 없음(추정)
- 데스크톱 화살표–점 묶음 gap: 컴포넌트 원본 2653:6538은 40, 화면 인스턴스(3328:6385·4817:7572)와 Components 세트(5239:823)는 20. 명세는 20(`spacing.5`). 디자이너 확인 필요
- 옛 데스크톱 시안: 커리큘럼(1678:2469, 화살표 35·gap 40)과 아카이빙(1073:2209·1161:4329, scaled 점)에 다른 값이 남아 있음. 명세는 Components 페이지 세트를 기준으로 함
- 점 버튼 24×24와 gap `raw:11px`·`spacing.3`: Figma에 누르는 영역 정의 없음(추정)
