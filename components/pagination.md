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
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-23
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
| prev | ○ | 이전 페이지 `<button>`. chevron 왼쪽 아이콘(데스크톱 35×35, 모바일 16×16) | `color.fg.default` (#FFFFFF) |
| dots | ○ | 점 버튼 묶음. 현재 페이지를 포함한 최대 5개 페이지를 보여 줌 | 간격 3절 |
| dot | ○ | 페이지 하나로 이동하는 `<button>`. 안에 1px 테두리 원. 현재 페이지는 채운 원 | `color.palette.gray.0` (#FFFFFF) |
| next | ○ | 다음 페이지 `<button>`. chevron 오른쪽 아이콘 | `color.fg.default` (#FFFFFF) |

- 점 개수: 전체 페이지가 5 이하이면 전체 페이지 수만큼, 6 이상이면 5개. 후기 목록 모바일은 최대 7개(라이브 `maxDots={7}`, 2026-10-22 라이브 기준으로 정정)
- 보이는 범위: 현재 페이지가 가운데에 오도록 잡고, 처음·끝에서는 1~5 또는 끝 5개로 고정함(코드 `src/shared/components/pagination/pagination.tsx`의 계산과 같음)
- 전체 페이지가 0이면 그리지 않음. 1이면 그리되 화살표 둘 다 disabled

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| uniform | 점이 모두 같은 크기. 데스크톱 20px, 모바일 12px | 코드 `src/shared/components/pagination/pagination.css.ts` |

- 라이브는 모바일도 uniform(12px)임. Figma 모바일 scaled(현재 점에서 멀수록 20 → 15 → 10, Figma 7078:3511)는 라이브에 없어 쓰지 않음(2026-10-22 라이브 기준으로 정정)

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| root | 화살표 + 점 묶음(점 5개 데스크톱 310×35) | 화살표 + 점 묶음 | — | 0, 화살표–점 묶음 gap 데스크톱 `spacing.10` (40px) / 모바일 `spacing.5` (20px) | — | 코드 `src/shared/components/pagination/pagination.css.ts` |
| 화살표 버튼 | 35×35 | 보이는 아이콘 16×16, 누르는 영역 24×24 | — | 0 | — | 코드 `src/shared/components/pagination/pagination.css.ts`(아이콘), Figma 없음(추정, 누르는 영역) |
| 점(보이는 원) | 20×20 | 12×12 | 원형(`border-radius: 50%`) | — | — | 코드 `src/shared/components/pagination/pagination.css.ts` |
| 점 버튼(누르는 영역) | 24×24 | 24×24 | — | — | — | Figma 없음(추정) |
| 점 묶음 gap | `raw:15px` | `spacing.3` (12px) | — | — | — | 코드 `src/shared/components/pagination/pagination.css.ts`(데스크톱), Figma 없음(추정, 모바일) |

- 값 기준(2026-10-22 라이브 기준으로 정정): 아카이빙·후기 라이브 값(= frontend 코드 값). 이전 명세 값(화살표 48·50, 점 버튼 24×24, 묶음 gap 20·30, 모바일 scaled 점)은 Figma·추정 값으로 기록용
- 누르는 영역 24×24(2026-10-23 결정): 보이는 원·아이콘 크기는 그대로 두고 버튼의 `::before`(가운데 정렬 24×24, 투명)로 누르는 영역만 넓힘. 라이브는 원 크기와 같아 WCAG 2.5.8 최소 24×24에 못 미쳤음. frontend 수정은 ADOPT-03-17
  - 데스크톱: 점 20 + gap 15 = 간격 35라 24×24 영역이 겹치지 않음
  - 모바일: 점 12 + gap 10 = 간격 22라 24×24 영역이 2px 겹침. 점 사이 gap을 `raw:10px` → `spacing.3` (12px)로 넓혀 간격 24를 만듦(2026-10-23 결정). 점 크기는 그대로임
  - 모바일 화살표: 16×16 아이콘에 24×24 영역. 화살표–점 묶음 gap 20이라 겹치지 않음

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### 화살표(prev·next)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.default` (#FFFFFF) / — | — / `color.fg.default` (#FFFFFF) / — | — / `color.palette.gray.600` (#666666) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/shared/components/pagination/pagination.css.ts`(rest·hover), Figma 5317:8788(press, 라이브 없음), Figma 없음(추정, focus-visible, 라이브 없음) |
| disabled | — / `color.fg.default` (#FFFFFF) 불투명도 `raw:0.2`(검정 위 #333333) / — | — | — | — | 코드 `src/shared/components/pagination/pagination.css.ts` |

- hover: 색 변화 없이 `cursor: pointer`만 둠. 옛 세트 Hover 변형(5239:871·5239:913)은 ON_HOVER로 연결돼 있으나 Default와 같은 #FFFFFF이고, 새 세트(Figma 5317:8784, Figma 5317:8795)에는 Hover 변형 없이 ON_PRESS만 있음
- press: 새 세트 Press 변형(Figma 5317:8788) 화살표 #666666. Default → Press가 ON_PRESS로 연결됨(Figma 5317:8784)
- disabled: 라이브 흰색 불투명도 0.2(검정 위 #333333과 같은 색, Figma 화면 인스턴스도 같음)(2026-10-22 라이브 기준으로 정정)

### 점(dot)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | 투명 / — / `color.palette.gray.0` (#FFFFFF) 1px | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px(점 버튼 둘레) | 코드 `src/shared/components/pagination/pagination.css.ts`, Figma 5239:863(hover 흰 테두리, rest와 같음), Figma 없음(추정, press·focus-visible, 라이브 없음) |
| selected | `color.palette.gray.0` (#FFFFFF) / — / `color.palette.gray.0` (#FFFFFF) 1px | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/shared/components/pagination/pagination.css.ts`, Figma 없음(추정, focus-visible, 라이브 없음) |

- default 점 테두리: 라이브 흰색. Figma rest #999999(Figma 5239:861)에서 라이브 값으로 바꿈. hover(Figma 흰 테두리)는 rest와 같아짐(2026-10-22 라이브 기준으로 정정)
- 현재 페이지 점(selected): 라이브는 네이티브 `disabled`로 표시함(누를 수 없고 Tab 순서에서 빠짐). 명세 접근성 요구는 `aria-current="page"`이며 7절에 유지함

- 포커스 트리거: `:focus-visible`. outline은 버튼(점·화살표) 밖에 그림. 라이브는 전역 `outline: none`으로 포커스 표시 없음. Figma에도 Focus 변형 없음. (2026-10-23 결정) 모든 focus-visible은 `color.stroke.focus` 정책(ADOPT-01-03)으로 확정함. 근거 `patterns/accessibility.md` 2.2 "ADOPT에서 고칠 항목"
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
| 점 background-color, border-color | 0.2s | ease | 코드 `src/shared/components/pagination/pagination.css.ts` |
| 화살표 color | 0.2s | ease | Figma 없음(추정) |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 기본 스타일(769px 이상)은 데스크톱 uniform 값을 씀
- 모바일에서 바뀌는 속성(2026-10-22 라이브 기준으로 정정)
  - 점: 20 → 12(크기 균일)
  - 화살표: 35×35 → 아이콘 16×16(누르는 영역 24×24)
  - 화살표–점 묶음 gap: `spacing.10` (40px) → `spacing.5` (20px)
  - 점 버튼 사이 gap: `raw:15px` → `spacing.3` (12px)(라이브 10에서 2026-10-23 결정으로 넓힘)
  - 점 개수: 최대 5개. 후기 목록만 최대 7개
- Figma 모바일 노드(기록용. 라이브 값과 다름)
  - Components 페이지 모바일 세트: Figma 7078:3511, Figma 7091:5199
  - 아카이빙 활동사진: Figma 6459:12384, Figma 6459:14631
  - 아카이빙 검색·필터: Figma 6742:14205

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | root `<nav aria-label="페이지 이동">`(한 화면에 탭바 등 다른 `<nav>`가 있어 이름이 필요함). prev·next·점은 `<button type="button">` | 코드 `src/shared/components/pagination/pagination.tsx` |
| 키보드 | Tab으로 각 버튼 이동, Enter·Space로 실행. 현재 페이지 점도 Tab 대상에 남김 | Figma 없음(추정) |
| aria | prev `aria-label="이전 페이지"`, next `aria-label="다음 페이지"`<br>점 `aria-label="페이지 N"`(N은 페이지 번호)<br>현재 페이지 점 `aria-current="page"`(disabled로 만들지 않음)<br>처음·끝의 prev·next는 `aria-disabled="true"` + 클릭 처리 함수에서 무시<br>화살표 아이콘 `aria-hidden="true"` | 코드 `src/shared/components/pagination/pagination.tsx` |
| 대비 | 기준: UI 요소 3:1<br>화살표 rest·hover #FFFFFF 대 검정 21.00, press #666666 3.66(UI 3:1 통과)<br>점 default·selected 테두리 #FFFFFF 대 검정 21.00(2026-10-22 라이브 기준으로 정정)<br>default와 selected는 색이 아니라 채움 여부로 구분됨<br>화살표 disabled #333333 대 검정 1.66, WCAG 1.4.3 비활성 예외 | 계산값(검정 캔버스 #000000 기준) |
| 터치 영역 | 최소 24×24: 점 버튼(데스크톱·모바일)·모바일 화살표는 `::before`로 누르는 영역 24×24 확보(겉 크기 유지, 2026-10-23 결정). 데스크톱 화살표 35×35 통과. 모바일 점 사이 간격 24(점 12 + gap 12)라 영역이 겹치지 않음<br>모바일 권장 44×44: 화살표·점 모두 미달 | WCAG 2.2 2.5.8 |
| 포커스 링 | `color.stroke.focus` (#68CBEC) 2px, offset 2px. 검정 캔버스 위 11.34:1 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | prev·next는 `aria-disabled="true"`. 네이티브 `disabled`를 쓰지 않는 이유: 마지막 페이지로 가는 next를 누르는 순간 버튼이 disabled가 되어 포커스가 `<body>`로 사라짐. 색(#333333)과 함께 `cursor: default` | Figma 5239:854 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 점을 `<button>` + `aria-label="페이지 N"`으로 만들어 직접 이동 제공 | 점을 이름 없는 `<span>`·`<div onClick>`으로 만듦 |
| 현재 페이지 점에 `aria-current="page"` | 현재 페이지 점을 `disabled`로 만들어 Tab 순서·읽기에서 빠지게 함 |
| 처음·끝의 화살표는 `aria-disabled="true"`로 포커스 유지 | 네이티브 `disabled`로 바꿔 누른 직후 포커스를 잃게 함 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/pagination/pagination.tsx`, `src/shared/components/pagination/pagination.css.ts`, `src/shared/hooks/use-pagination.ts` | props: `currentPage`, `totalPages`, `onPageChange`, `maxDots`(기본 5)<br>사용 화면: `src/pages/archive-page.tsx`(아카이빙), `src/widgets/curriculum/ui/review-section/review-section.tsx`(후기, 모바일 `maxDots={7}`)<br>아이콘: `src/shared/assets/icons/ic_chevron_left.svg`·`ic_chevron_right.svg`(50 viewBox) |
| frontend 차이 | 위와 같음 | ADOPT-03-17에서 고침. 명세와 다른 점(라이브 값을 명세로 채택한 크기·간격·점 색·모바일 점·`maxDots` 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- 화살표 press 없음(명세는 Figma #666666)<br>- 현재 페이지 점: `disabled`(명세 `aria-current="page"`, Tab 대상 유지)<br>- 화살표 비활성: 네이티브 `disabled`(명세 `aria-disabled`)<br>- `<nav>`에 `aria-label` 없음<br>- `:focus-visible` 없음(전역 `outline: none`, ADOPT-01)<br>- 누르는 영역이 원·아이콘 크기와 같음(데스크톱 점 20×20, 모바일 점 12×12·화살표 16×16) → `::before`로 24×24, 모바일 점 gap 10 → 12(2026-10-23 결정)
| frontend_admin | `src/pages/content-archive/ui/ArchivingSection.tsx` | 관리자 콘솔은 이 명세의 값을 따르지 않음. ADOPT-07-09(동작·접근성만 이 명세), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/pagination/pagination.css.ts` | `dot.default` ↔ default, `dot.active` ↔ selected. `arrowButton:disabled` ↔ disabled |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:15px` | 점 버튼 사이 gap(데스크톱) | 코드 `src/shared/components/pagination/pagination.css.ts` | 불필요 |
| 24×24 | 점 버튼·모바일 화살표 누르는 영역(`::before`) | Figma 없음(추정) | 불필요 |
| 35×35, 16×16 | 화살표 아이콘 크기(데스크톱·모바일) | 코드 `src/shared/components/pagination/pagination.css.ts` | 불필요 |
| 20px, 12px | 점 지름(데스크톱·모바일) | 코드 `src/shared/components/pagination/pagination.css.ts` | 불필요 |
| `raw:0.2` | 화살표 disabled 불투명도 | 코드 `src/shared/components/pagination/pagination.css.ts` | 불필요 |
| 1px | 점 테두리 굵기 | 코드 `src/shared/components/pagination/pagination.css.ts` | 불필요 |
| `border-radius: 50%` | 점 원형 | Figma 5239:862 | 불필요(`radius.full` 40px은 20px 원에도 같은 결과지만 의미상 원형으로 적음) |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease | 전환 | 코드 `src/shared/components/pagination/pagination.css.ts` | 불필요 |

## 11. 미확인

- 해당 없음.
