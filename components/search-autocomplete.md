---
id: search-autocomplete
name_ko: 검색 자동완성
ticket: COMPONENT-11
tier: P1
status: review
figma:
  - "3613:7592"
  - "5980:12236"
  - "5980:12235"
  - "5875:6266"
  - "5713:6963"
  - "5713:7026"
  - "7091:5763"
  - "7091:5772"
  - "7091:5782"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 검색 자동완성 (search-autocomplete)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 검색어를 자유롭게 입력하고, 입력에 따라 걸러진 결과 목록(제안)에서 하나를 고르거나 입력값 그대로 검색하는 입력
- 구성: 검색 입력(search-field) + 결과 패널(results). 결과 패널은 결과 목록(listbox)·빈 결과·로딩·실패 4가지 내용 중 하나를 보임
- 사용 화면: 아카이빙(프로젝트·블로그·활동사진 탭의 검색·필터 막대)
- 관련 명세
  - `components/select.md`(COMPONENT-03): 목록 패널·항목 상태·`aria-activedescendant` 규칙의 원본. 이 명세는 같은 규칙을 쓰고 차이만 정의함
  - `components/text-field.md`(COMPONENT-02): 입력 규칙(접근 이름, placeholder만으로 이름을 주지 않음, `:focus-within`)의 원본
  - `components/pagination.md`(COMPONENT-12): 검색 결과 카드 목록의 페이지 이동
  - `patterns/feedback.md`(PATTERN-01): 빈 결과·로딩·실패 문구
  - `patterns/accessibility.md`(PATTERN-03): 포커스 링, 색만으로 구분하지 않음
- select와의 차이(이 명세가 새로 정의하는 것)
  - 자유 입력: 포커스가 텍스트 입력에 있고, 입력값이 곧 검색어임. 목록에 없는 값도 검색할 수 있음
  - 필터링: 입력할 때마다 결과가 다시 걸러짐. 선택 상태(selected)가 없음
  - 일치 글자 강조: 결과 제목에서 검색어와 일치하는 글자만 밝게 표시함
  - 빈 결과·로딩·실패 상태
- 범위 밖: 검색·필터 막대 전체 레이아웃(아래쪽 그라데이션 보더, 필터 chip 배치)은 페이지 조각이라 다루지 않음. 필터 chip은 `components/filter-chip.md`(칩 본체)와 `components/select.md` chip(목록·키보드)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | 검색 입력과 결과 패널을 묶는 상대 위치 컨테이너. 패널 위치의 기준 | — |
| search-icon | ○ | 입력 앞 돋보기 아이콘 28px. 장식 | `color.fg.default` (#FFFFFF) |
| input | ○ | `<input type="search">`. `role="combobox"` 요소이며 DOM 포커스를 계속 가짐. 빈 값이면 placeholder "검색" | `typography.body-1`, 값 `color.fg.default` (#FFFFFF), placeholder `color.fg.muted` (#999999) |
| panel | × | 입력 아래 결과 패널. 입력값이 1자 이상일 때만 보임. 보더 1px, 모서리 둥글게, 넘침 자름 | `color.stroke.weak` (#333333), `radius.md` (20px) |
| listbox | × | 결과가 있을 때 panel 안의 목록. `role="listbox"` | `color.bg.layer` (#1A1A1A) |
| option | × | 결과 한 건. 한 줄, 넘치면 말줄임 | `typography.body-1`, 4절 |
| match | × | option 글자 중 검색어와 일치하는 부분. `<mark>`로 감쌈. 바탕 없음 | `color.fg.default` (#FFFFFF). 일치하지 않는 부분은 `color.fg.muted` (#999999) |
| status-row | × | 빈 결과·로딩·실패 문구 한 줄. listbox 대신 panel 안에 보임. 선택할 수 없음 | `color.bg.layer` (#1A1A1A), `color.fg.muted` (#999999), `typography.body-4` / 모바일 `raw:10px/400` |
| live-region | ○ | 화면에 보이지 않는 `role="status"` 영역. 결과 수를 알림 | — |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | 아카이빙 검색. variant는 하나뿐임 | Figma 5713:6963, Figma 5713:7026, Figma 5980:12235 |

| 패널 내용 | 보이는 조건 | 근거 |
| --- | --- | --- |
| results | 입력값 1자 이상, 결과 1건 이상 | Figma 5713:7026, Figma 5980:12235 |
| empty | 입력값 1자 이상, 응답 결과 0건 | Figma 없음(추정) |
| loading | 입력값 1자 이상, 응답 대기 중이고 이전 결과가 없음 | Figma 없음(추정) |
| error | 결과 요청 실패 | Figma 없음(추정) |

- Figma는 두 벌이 있음
  - 3613:7592(710×225): 첫 시안. 행 45, 행 바탕 없음, 활성 행만 #1A1A1A radius 12
  - 5980:12235·5713:7026(720×250): 인터랙션 세트. 행 50, 행 바탕 #1A1A1A, hover #333333, 패널 보더 1px #333333 radius 20
  - 명세는 노드 번호가 뒤이고 hover 상호작용이 연결된 인터랙션 세트를 따름. 일치 글자 강조 색은 두 벌이 같음. 11절 참조

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| search-field(입력 줄) | 아이콘 + 입력 771×29(막대 안) | 부모 폭, 입력 글자 높이 16 | — | `raw:25px` / `spacing.3` (12px), 모바일 `spacing.3` (12px) / `spacing.2` (8px). 아이콘·입력 gap `spacing.2` (8px) | `typography.body-1` / 모바일 `typography.body-5` | 코드 `src/widgets/archive/ui/search-overlay/search-overlay.css.ts` |
| panel | 720 × 행 수×50(최대 250) | 342 × 행 수×28(최대 140) | `radius.md` (20px) / 모바일 `radius.xs` (8px) | 0 | — | Figma 5980:12235, Figma 7091:5772 |
| option·status-row | 패널 폭 × 50 | 패널 폭 × 28 | — | 왼쪽 `raw:36px`, 오른쪽 `raw:36px` / 모바일 왼쪽 `raw:32px`, 오른쪽 `raw:32px` | `typography.body-1` / 모바일 `raw:12px Regular` | Figma 5875:6265, Figma 5875:6267, Figma 7091:5762 |

- 값 기준(2026-10-22 라이브 기준으로 정정): search-field와 빈 결과 문구는 아카이빙 라이브 값, 결과 패널(option·로딩·실패 행)은 라이브에 없어 Figma 값·추정값을 씀
- 높이: 표의 값으로 고정함. 글자는 행 안에서 세로 가운데
- status-row 글자: 라이브 빈 결과 문구 스타일(18/400 #999999, 모바일 10/400)을 따름. option 글자(`typography.body-1`)와 다름
- padding 값 순서: 2개는 세로 / 가로
- 패널 위치
  - 왼쪽 끝: 검색 아이콘 왼쪽 끝과 맞춤(Figma 5713:7026 x=12)
  - 세로: 막대 아래. 막대 위 끝에서 101px(막대 80 + 보더 1 + 간격 20). 간격은 `spacing.5` (20px)로 맞춤(Figma 18~19, 이 경우 99~100px)
  - 폭: 데스크톱 720(검색 입력 영역 폭, 필터 영역은 덮지 않음), 모바일 342(막대 폭)
- 최대 높이: 5행. 넘치면 세로 스크롤(select field-list와 같음)
- option 오른쪽 padding: Figma는 글자 상자 폭을 540으로 고정해 오른쪽 여백이 없음. 명세는 왼쪽과 같은 값으로 대칭(추정)
- 그림자: 없음(Figma 5980:12235). select chip-list와 다름

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임.

### search-field

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(빈 값) | — / placeholder `color.fg.muted` (#999999), 아이콘 `color.fg.default` (#FFFFFF) / — | rest 유지 | — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px(입력 줄 기준) | Figma 5713:6963, Figma 없음(추정, focus-visible) |
| completed(값 있음) | — / 값 `color.fg.default` (#FFFFFF) / — | rest 유지 | — | 같은 outline | Figma 5713:7026, Figma 없음(추정, focus-visible) |

- 포커스 트리거: `:focus-within`(입력 줄 기준). text-field와 같이 텍스트 입력은 포인터 클릭에도 키보드 입력이 필요하므로 `:focus-visible`과 구분하지 않음
- 포커스 표시: text-field는 아래쪽 보더 색으로 표시하지만, 검색 입력에는 자체 보더가 없어(막대 보더는 막대 전체 장식) outline으로 표시함
- 패널이 열려 있는 동안에도 outline 유지(포커스는 입력에 있음)
- invalid·disabled·selected 행은 두지 않음
  - invalid: 검색어에 형식 제한이 없음
  - disabled: 사용처 없음
  - selected: 고른 결과는 입력값으로 들어가고 패널이 닫힘. 목록에 남는 선택 상태가 없음
- press 열은 `—`: 입력에 누름 상태가 없음

### option

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / match `color.fg.default` (#FFFFFF), 나머지 `color.fg.muted` (#999999) / — | `color.palette.gray.800` (#333333) / rest 글자색 유지 / — | hover 값 유지 | hover 값과 같음(활성 항목 표시) | Figma 5875:6265, Figma 5875:6267, Figma 3613:7552, Figma 없음(추정, press·focus-visible) |

- option의 focus-visible은 select와 같이 실제 DOM 포커스가 아님
  - DOM 포커스는 input에 남고 `aria-activedescendant`가 가리키는 활성 항목을 hover와 같은 바탕으로 표시함
  - 활성 항목에는 outline을 그리지 않음
- 일치 글자 강조(match)
  - 검색어와 일치하는 부분만 `color.fg.default`, 나머지는 `color.fg.muted`. 굵기·크기는 같음(Figma 3613:7552 "Real" 흰색 + "-time …" 회색, 모두 24 Regular)
  - 대소문자를 무시함: 검색어 "Real"이 "REALLY"의 "REAL"과 일치(Figma 3613:7563)
  - 한 제목 안의 모든 일치 위치를 강조함: "REALLY REALLY"의 두 "REAL"(Figma 3613:7563)
  - 제목에 일치 글자가 없는 결과(다른 필드로 걸린 결과)는 전체를 `color.fg.muted`로 보임(Figma 3613:7556 "ㄹㅇㄹㅇ")
- 일치 판정: 공백·대소문자를 그대로 둔 부분 문자열 포함(대소문자만 무시). Figma 예시는 모두 단어 앞 일치이나 포함 일치로 정함(11절)

### status-row(빈 결과·로딩·실패)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / `color.fg.muted` (#999999), `typography.body-4` / — | rest 유지 | — | — | 코드 `src/pages/archive-page.css.ts`(글자 색·크기), Figma 없음(추정, 패널 안 위치·바탕) |

- 문구
  - empty: "검색 결과가 없습니다."(라이브 문구. 라이브는 결과 패널 없이 카드 목록 자리에 위아래 여백 100(모바일 40)으로 가운데 표시함, 코드 `src/pages/archive-page.css.ts` `emptyState`)(2026-10-22 라이브 기준으로 정정)
  - loading: "검색 중입니다."
  - error: "검색 결과를 불러오지 못했습니다."
  - 최종 문구는 PATTERN-01(피드백)·PATTERN-04(문구 규칙)를 따름
- 선택·활성 대상이 아님. hover 색 변화 없음
- 비동기 상태(loading)
  - 입력이 멈추고 300ms 뒤 요청함(코드 `src/shared/hooks/use-debounce.ts`, `src/pages/archive-page.tsx`의 300)
  - 이전 결과가 있으면 새 응답이 올 때까지 이전 결과를 유지하고 loading 행을 보이지 않음(목록 깜빡임 방지)
  - 이전 결과가 없을 때만 loading 행을 보임
  - `aria-busy` 등 나머지 규칙은 5절

## 5. Behavior

- 요소 선택: ARIA APG "목록 자동완성 combobox(Combobox With List Autocomplete)" 패턴
  - input: `<input type="search" role="combobox">`. `enterkeyhint="search"`(모바일 키보드에 "검색" 키)
  - 브라우저 기본 지우기 버튼(`::-webkit-search-cancel-button`)은 숨김. Figma에 지우기 버튼이 없음(11절)
  - 자동 선택 없음(`aria-autocomplete="list"`): 입력해도 첫 결과를 활성으로 만들지 않고 입력값을 바꾸지 않음
- 패널 열림·닫힘
  - 열림: 입력값이 1자 이상이고 input에 포커스가 있을 때
  - 닫힘: 입력값이 빈 값이 됨, 결과 선택, Esc, 패널 밖 클릭, input에서 포커스가 떠남
  - 열고 닫을 때 입력값은 바뀌지 않음(결과 선택 제외)
- 필터링
  - 입력이 멈추고 300ms 뒤 결과를 다시 요청함. 입력할 때마다 활성 항목을 없앰
  - 결과 제목의 일치 글자를 4절 규칙으로 강조함
  - 한글 입력기 조합 중(`compositionstart`~`compositionend`)에도 조합 중 글자로 걸러냄. 단, 조합 중 Enter(`isComposing`)는 무시함(조합 확정 Enter가 검색 확정으로 처리되지 않게)
- 클릭·탭
  - option을 누르면 그 결과의 제목을 입력값으로 넣고 패널을 닫은 뒤 그 값으로 검색을 적용함. 포커스는 input
  - status-row를 눌러도 아무 일도 없음
  - 패널 밖을 누르면 입력값 유지, 패널만 닫힘
  - 터치에서는 hover 색을 적용하지 않음
- 키보드(포커스는 input에 있음). select와 같은 점
  - ↓: 닫혀 있고 값이 있으면 열면서 첫 항목 활성. 열려 있으면 다음 항목 활성(활성 항목이 없으면 첫 항목)
  - ↑: 열려 있으면 이전 항목 활성(활성 항목이 없으면 마지막 항목)
  - 끝에서 멈춤, 순환하지 않음
  - Alt+↓: 활성 항목 없이 열기
  - Esc: 열려 있으면 입력값을 바꾸지 않고 닫음
  - 활성 항목이 목록 밖이면 보이도록 스크롤함
- 키보드: select와 다른 점(자유 입력이기 때문)
  - Enter: 활성 항목이 있으면 그 항목 선택(클릭과 같음). 없으면 입력값 그대로 검색을 적용하고 닫음
  - Esc: 이미 닫혀 있으면 입력값을 지움(APG 권장 동작)
  - Tab: 활성 항목을 선택하지 않고 닫은 뒤 다음 요소로 이동. 입력값 유지(select는 Tab으로 선택함. 자유 입력에서는 사용자가 친 검색어를 덮지 않기 위해 다름)
  - Home·End·←·→: input 안 커서 이동(목록 이동 아님). 커서를 움직이면 활성 항목을 없앰
  - PageUp·PageDown·타이핑 검색: 없음. 글자 입력은 input 값이 됨
- 포커스 이동·복귀
  - 포커스는 항상 input에 둠. option에 DOM 포커스를 주지 않음
  - 닫힌 뒤에도 포커스는 input에 남음(Tab으로 닫은 경우 제외)
- 결과 수 알림
  - 응답이 온 뒤 live-region 문구를 바꿈: "검색 결과 N건" / "검색 결과가 없습니다." / 실패 문구
  - 글자 하나마다 알리지 않음(300ms 묶음 후 응답 시점에만)
  - loading 시작은 알리지 않음(알림이 너무 잦아짐)
- 비동기 중 동작(`aria-busy`)
  - 응답 대기 중 panel에 `aria-busy="true"`, 응답 후 제거
  - 대기 중에도 입력은 막지 않음. 새 입력이 오면 앞 요청 결과는 버림(마지막 입력의 응답만 반영)
  - 실패 시 error 행을 보이고 live-region으로 알림. 다시 입력하면 재요청

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color(option) | 0.2s | ease-in-out | design-reference 4.3 |
| 패널 열림·닫힘 | 없음 | — | design-reference 5.6 |

- Figma 프로토타입의 Default→Hover 연결은 전환 없음(즉시)(Figma 5875:6265). select option과 맞춰 0.2s를 씀
- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 입력 줄: 패딩 `spacing.3` / `spacing.2`, 아이콘 28 유지, 글자 `typography.body-5` (16/400)(라이브, 2026-10-22 라이브 기준으로 정정)
  - 패널: 폭 342, 행 높이 28, radius `radius.xs` (8px), 행 왼쪽 패딩 `raw:32px`, 글자 `raw:12px Regular`(select 모바일 chip-list와 같은 값)
  - 패널과 막대 사이 간격: Figma 모바일 프레임에서 위치 관계가 없어 `spacing.2` (8px)로 둠(추정)
  - hover: 적용하지 않음(터치). Figma 모바일 세트도 Default 변형만 있음(Figma 7091:5763)
- Figma 모바일 노드
  - 검색·필터 막대: Figma 7091:5782(입력 줄 7091:5817)
  - 결과 패널: Figma 7091:5772
  - 결과 행 세트: Figma 7091:5763(Default만)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | input: `role="combobox"`(편집 가능한 `<input type="search">`)<br>목록: `role="listbox"`, 결과: `role="option"`<br>status-row: 일반 요소(option 아님). 결과가 0건이면 listbox를 그리지 않음<br>live-region: `role="status"`(화면에서 숨김, `aria-live="polite"` 내장) | Figma 없음(추정) |
| 키보드 | ↓·↑ 이동, Alt+↓ 열기, Enter 선택 또는 검색 확정, Esc 닫기(닫혀 있으면 지움), Tab 선택 없이 이동, Home·End·←·→ 커서 이동(5절) | Figma 없음(추정) |
| aria | input: `aria-autocomplete="list"`, `aria-expanded`(listbox가 보일 때 `true`, 결과 0건·닫힘이면 `false`), `aria-controls`(listbox id), `aria-activedescendant`(활성 option id, 활성 없음·닫힘이면 제거)<br>이름: 보이는 label이 없어 `aria-label`로 줌. 탭에 따라 "프로젝트 검색"·"블로그 검색"·"활동사진 검색". placeholder만으로 이름을 주지 않음(text-field 명세와 같음)<br>listbox: `aria-label="검색 결과"`<br>option: 활성 항목에 `aria-selected="true"`(APG 목록 자동완성 규칙. 이 컴포넌트에는 선택 상태가 따로 없음)<br>match: `<mark>`. 화면 읽기 프로그램은 제목 전체를 읽음<br>panel: 응답 대기 중 `aria-busy="true"`<br>search-icon: `aria-hidden="true"` | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자(24px 이상)·UI 요소 3:1<br>입력값 #FFFFFF / 검정 캔버스: 21.00, placeholder #999999 / 검정: 7.37<br>option rest: match #FFFFFF / #1A1A1A 17.40, 나머지 #999999 / #1A1A1A 6.11<br>option hover·활성: match #FFFFFF / #333333 12.63, 나머지 #999999 / #333333 4.43. 24px Regular는 큰 글자라 3:1 기준으로 통과. 모바일 12px에 활성 바탕이 오면 미달(11절)<br>status-row #999999 / #1A1A1A: 6.11. 라이브 빈 결과 문구 #999999 / 검정 캔버스: 7.37(모바일 10px도 통과)<br>match와 나머지 글자 사이 #FFFFFF / #999999: 2.85. 3:1 미만이라 강조는 색 차이로만 구분됨. 강조는 보조 정보(검색어는 사용자가 이미 앎)라 기준 대상에서 뺌(11절)<br>패널 보더 `color.stroke.weak` / 검정 캔버스: 1.66. 패널은 행 글자로 식별되므로 보더는 장식으로 봄(select chip 보더와 같은 판단) | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: 데스크톱 행 50, 모바일 행 28·입력 줄 28 모두 통과<br>모바일 권장 44×44: 모바일 결과 행(높이 28) 미달. 입력은 막대 342×44 전체를 누르면 input에 포커스가 가도록 해 44 확보 | WCAG 2.2 2.5.8 |
| 포커스 링 | input 줄: `color.stroke.focus` (#68CBEC) outline 2px, offset 2px. 검정 캔버스 위 11.34:1<br>option: 링 없음, 활성 바탕(`color.palette.gray.800`)으로 표시 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음(4절, disabled 행 없음) | Figma 없음(추정) |
| 상태 알림 | 결과 수·빈 결과·실패를 `role="status"`로 알림. 색이나 패널 모양만으로 알리지 않음 | PATTERN-03-03 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 포커스는 input에 두고 `aria-activedescendant`로 활성 결과를 가리킴 | 방향키로 option에 DOM 포커스를 옮겨 입력이 끊김 |
| 입력해도 활성 항목을 만들지 않음(`aria-autocomplete="list"`) | 첫 결과를 자동 활성으로 만들어 Enter가 사용자가 친 검색어 대신 첫 결과를 고름 |
| Enter는 활성 항목이 없으면 입력값 그대로 검색 | 결과에 없는 검색어를 막음 |
| Tab은 선택 없이 닫고 이동 | Tab으로 활성 결과가 입력값을 덮음(select와 다른 점) |
| 일치 글자는 `<mark>` + 색만 바꾸고 굵기·크기는 같게 | 일치 글자를 굵게 해 글자 폭이 바뀌어 줄이 흔들림 |
| 결과 수는 응답 후 `role="status"`로 한 번 알림 | 글자를 칠 때마다 결과 수를 낭독 |
| 빈 결과는 선택할 수 없는 status-row로 보이고 `aria-expanded="false"` | "검색 결과가 없습니다."를 `role="option"`으로 넣음 |
| 한글 조합 중 Enter(`isComposing`)는 무시 | 조합 확정 Enter로 검색이 두 번 실행됨 |
| 보이는 label이 없으니 `aria-label`로 이름을 줌 | placeholder "검색"만으로 이름을 대신함 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/archive/ui/search-overlay/search-overlay.tsx`, `src/widgets/archive/ui/search-overlay/search-overlay.css.ts` | search-field만 있음. 결과 패널(자동완성) 코드는 없음<br>`SearchOverlay`: 돋보기 아이콘 + `<input type="text">`, props `value`·`onChange`·`placeholder`(기본 "검색")<br>사용처: `src/pages/archive-page.tsx`의 `filterBar`. 입력값을 `src/shared/hooks/use-debounce.ts`로 300ms 묶어 카드 목록 조회의 `keyword`로 넘김(입력하면 카드 목록이 바로 걸러짐)<br>빈 결과: 같은 화면 카드 영역의 "검색 결과가 없습니다."(`emptyState`) |
| frontend 차이 | 위와 같음 | ADOPT-03-16에서 고침. 명세와 다른 점<br>- 결과 패널·일치 글자 강조·status-row 없음<br>- `role="combobox"`·`aria-expanded`·`aria-controls`·`aria-activedescendant` 없음<br>- 접근 이름: placeholder만 있음(`aria-label` 없음)<br>- 결과 수 알림(`role="status"`) 없음<br>- 포커스 표시: 없음(전역 `outline: none`)<br>- `type="text"`(명세 `type="search"` + `enterkeyhint="search"`)<br>- 막대 클릭 시 input 포커스: 컨테이너 `<div onClick>`으로 구현됨(동작은 명세와 같음)<br>- 같은 값: 데스크톱 글자 24 Regular, 패딩 2.5rem 1.2rem, gap 0.8rem, 아이콘 2.8rem |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트·날짜 입력), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/widgets/archive/ui/search-overlay/search-overlay.tsx` | `SearchOverlay` ↔ search-field. `styles.container` ↔ 입력 줄, `styles.icon` ↔ search-icon, `styles.input` ↔ input. 결과 패널 대응 이름 없음 |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:25px` | 검색·필터 막대 안 입력 줄 위아래 여백(막대 80 - 입력 줄 29의 절반에 가까운 값) | Figma 5713:6947, 코드 `src/widgets/archive/ui/search-overlay/search-overlay.css.ts` | 불필요(막대 높이 80에서 나오는 값) |
| `raw:36px` | 데스크톱 option·status-row 좌우 패딩 | Figma 5875:6265 | 불필요(1곳) |
| `raw:32px` | 모바일 option·status-row 좌우 패딩 | Figma 7091:5762 | 불필요(1곳) |
| `raw:10px/400` | 모바일 status-row·빈 결과 문구 글자 | 코드 `src/pages/archive-page.css.ts` | 필요 여부 별도 이슈(10px 글자 토큰 없음) |
| `raw:12px Regular` | 모바일 option 글자 | Figma 7091:5766 | select 명세 10절과 같은 항목(12 Regular 토큰 없음) |
| 28px | 검색 아이콘 크기(데스크톱·모바일) | Figma 5713:6948, Figma 7091:5819 | 불필요 |
| 50px, 28px | option 행 높이(데스크톱, 모바일) | Figma 5875:6265, Figma 7091:5762 | 불필요 |
| 5행(250px, 모바일 140px) | 패널 최대 높이 | Figma 5980:12235, Figma 7091:5772 | 불필요 |
| 300ms | 입력 묶음(debounce) 시간 | 코드 `src/shared/hooks/use-debounce.ts` | 불필요 |
| z-index 100 | 열린 패널 | design-reference 5.6 | 불필요(design-reference 4.7 z-index 표와 함께 관리) |
| 2px, offset 2px | 입력 줄 focus outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | option 바탕 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- Figma 두 벌의 차이: 첫 시안(Figma 3613:7592, 710×225, 행 45, 행 바탕 없음, 활성 행 #1A1A1A radius 12)과 인터랙션 세트(Figma 5980:12235, 720×250, 행 50, 행 바탕 #1A1A1A, hover #333333, 패널 보더·radius 20). 명세는 인터랙션 세트를 따름. 디자이너 확인 필요
  - Figma 추정(약·색 / 디자이너·치수): 최신 화면(Figma 4817:9008)은 detach된 프레임 Figma 4817:9392를 씀. 색은 세트와 같음(패널 #1A1A1A·보더 #333333, 활성 행 #333333), 치수는 첫 시안과 같음(710 폭, 행 45, radius 12). 질문 범위는 치수(행 45/50, 폭 710/720, radius 12/20). 인터랙션 세트 권고
- 로딩·실패 상태: Figma·라이브 모두 없음. status-row 모양과 문구는 추정. 빈 결과 문구·글자는 라이브 값으로 해소됨(2026-10-22 라이브 기준으로 정정). PATTERN-01·PATTERN-04 확정 시 문구 맞춤
  - Figma 추정(디자이너): Figma에 없음. 패널 행 하나에 #999999 문구 권고
- 일치 판정 방식: Figma 예시는 모두 단어 앞 일치("Real" → "Really", "Reality"). 명세는 포함 일치(대소문자 무시)로 정함. 단어 앞 일치만 할지 디자이너 확인 필요
  - Figma 추정(약): 대소문자 무시와 한 제목 안 모든 일치 부분 강조는 Figma에서 확인(Figma 4817:9397, 3613:7562, 7091:5776). 단어 앞·포함 일치는 판정 불가라 포함 일치 유지
- "ㄹㅇㄹㅇ" 결과 행(Figma 3613:7556, 전체 회색): 제목에 일치 글자가 없는 결과로 해석함. 초성 검색 등 다른 의도인지 확인 필요
  - Figma 추정(약): 세 곳 모두 강조 없음(Figma 4817:9401, 3613:7556, 7091:5769). 초성 검색은 도입하지 않는 쪽 권고
- 결과 선택 시 동작: 아카이빙에 상세 페이지가 없어 "제목을 입력값으로 넣고 검색 적용"으로 정함. 외부 링크(GitHub·Medium 등)로 바로 이동할지 확인 필요
  - Figma 추정(디자이너): 화면 프로토타입 연결 0개(Figma 4817:9008). 명세 결정 유지
- 결과 제안 데이터 출처: 자동완성 전용 API가 없음. 현재 탭 목록 API(`keyword`) 첫 페이지 앞 5건을 쓸지, 별도 API를 둘지 backend와 결정 필요
  - Figma 추정(디자이너): Figma 범위 밖. backend 결정 사항
- 강조 대비: match #FFFFFF와 나머지 #999999 사이 2.85:1로 색 차이만으로 구분됨. 강조는 보조 정보로 보아 기준 대상에서 뺐음. 밑줄 등 색 외 표시를 더할지 디자이너 확인 필요
  - Figma 추정(디자이너): 세 시안 모두 색으로만 강조(굵기·밑줄 없음, Figma 4817:9393). 밑줄 추가 여부 질문
- 모바일 활성 바탕 대비: 하드웨어 키보드로 모바일 결과를 활성화하면 12px #999999 / #333333 4.43:1로 미달. 모바일 Figma에 hover 변형이 없음(Figma 7091:5763)
  - Figma 추정(디자이너): 모바일 세트는 Default 변형 하나뿐이고 reactions 없음. 활성 행 바탕 대신 포커스 링만 쓰거나 나머지 글자를 #CCCCCC로 올리는 안 권고
- 입력 줄 포커스 표시: Figma에 Focus 상태 없고 라이브도 전역 `outline: none`으로 없음. outline은 추정
  - Figma 추정(디자이너): Figma 전체에 Focus 변형 없음. 접근성 결정이라 명세 outline 유지 권고
- 지우기(X) 버튼: Figma 없음. 브라우저 기본 버튼을 숨기고 Esc 두 번으로 지우게 함. 버튼 추가 여부 확인 필요
  - Figma 추정(약): 입력이 들어간 최신 화면(Figma 4817:9342, 모바일 7091:5782)에도 ✕ 없음
- 모바일 패널과 막대 사이 간격: Figma 모바일 프레임에 패널이 막대와 떨어져 있어 미확인(Figma 7091:5772)
  - Figma 추정(약): 8px(`spacing.2`). 입력 상태 막대(Figma 7091:5782) 아래 끝에서 패널(Figma 7091:5772)까지 8. 모바일 패널은 radius 8, 보더 #333333, 행 28
- option 오른쪽 패딩: Figma 글자 상자 폭 540 고정. 대칭 `raw:36px`은 추정
  - Figma 추정(약): 행 패딩 8·10·8·36이라 오른쪽은 10(Figma 4817:9393, 3613:7554). 말줄임 처리가 있으면 차이는 작음
