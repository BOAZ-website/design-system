---
id: select
name_ko: 셀렉트(드롭다운)
ticket: COMPONENT-03
tier: P0
status: review
figma:
  - "3496:6379"
  - "3496:6393"
  - "3723:9261"
  - "3723:9269"
  - "5393:997"
  - "5395:565"
  - "5395:3803"
  - "5393:950"
  - "7078:5049"
  - "7091:5127"
  - "7091:5390"
  - "7091:5644"
  - "7885:15196"
  - "7885:15246"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 셀렉트(드롭다운) (select)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 정해진 목록에서 값 하나를 고르는 입력. 닫힌 트리거와 펼친 목록(listbox)으로 구성됨
- 구성: 트리거 2종(field·chip) × 목록 2종(field-list·chip-list)
- 사용 화면
  - 지원서 인적 사항(출생 연·월·일, 학년, 학기 등): field
  - 아카이빙 프로젝트·블로그·활동사진 필터("전체 부문", "기수"): chip
- 관련 명세: `components/text-field.md`(필드 본체, COMPONENT-02), `components/search-autocomplete.md`(검색 Dropdown 3613:7592·7091:5766, COMPONENT-11), `components/button.md`(COMPONENT-01), `patterns/form.md`(PATTERN-02), `patterns/accessibility.md`(PATTERN-03)
- 범위 밖: 입력하면서 고르는 검색 자동완성은 COMPONENT-11에서 정의함

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| trigger | ○ | 닫힌 상태의 선택 영역. `role="combobox"` 요소. field는 하단 보더형, chip은 알약형 | 3·4절 |
| label | ○ | field: 필드 이름. 값이 없으면 자리 표시 글자로 보이고, 값이 있거나 열리면 위로 작아짐. chip: 현재 값 또는 필터 이름("전체 부문", "기수") | `typography.body-4`, `typography.text-1` |
| value | × | field에서 고른 값. chip은 label이 값을 겸함 | `typography.body-4`, `color.fg.default` (#FFFFFF) |
| icon-start | × | chip 부문 필터의 부문 아이콘 24px(모바일 16px) | — |
| chevron | × | 펼침 화살표 24px(모바일 16px). 열리면 위 방향. chip 필수, field는 없음(Figma 드롭다운 세트 9개 모두 없음, `components/text-field.md` 3절). field 추가 여부만 11절 | `color.fg.default` (#FFFFFF) |
| clear | × | chip에 값이 선택됐을 때 chevron 자리에 오는 닫기(X) 아이콘. 필터 해제. trigger와 별도 `<button>` | `color.fg.default` (#FFFFFF) |
| listbox | ○ | 펼친 목록 패널. `role="listbox"` | `color.bg.layer` (#1A1A1A), `radius.sm`, `radius.md` |
| option | ○ | 목록 항목. `role="option"` | `typography.body-4`, 4절 |
| check | × | selected 항목 끝의 체크 아이콘 20px. 색만으로 선택을 구분하지 않기 위해 둠(7절) | `color.fg.brand` (#7A64F9) |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| field | 지원서 입력. text-field와 같은 하단 보더형 트리거 + field-list. 열림·닫힘 2상태 | Figma 5395:3803, Figma 5395:3848, Figma 5393:950, Figma 5395:647 |
| chip | 아카이빙 필터. 알약형 트리거("전체 부문"·"기수") + chip-list. 열림·닫힘 2상태 | Figma 3723:9261, Figma 3723:9269, Figma 3496:6393 |

| 목록 | 모양 | 근거 |
| --- | --- | --- |
| field-list | trigger 바로 아래, 위 모서리 직각·아래 모서리 `radius.sm`, 보더·그림자 없음. 행 높이 50 | Figma 5395:565, Figma 5393:997 |
| chip-list(기수) | 세로 패널, `radius.md`, 보더 1px, 그림자 없음. 행 높이 42(2026-10-22 라이브 기준으로 정정) | Figma 3496:6393 |
| chip-list(부문) | 알약형 항목을 세로로 쌓음(항목마다 바탕·보더·radius). 아이콘 + 글자 | Figma 3496:6379, Figma 3496:6380, Figma 3496:6381 |

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| field-390 | 390×60 | — | — | text-field 명세와 같음 | `typography.body-4` / 위로 간 label `typography.text-1` | Figma 5395:3804, Figma 5393:954 |
| field-252 | 252×60 | — | — | text-field 명세와 같음 | 같음 | Figma 5946:10452, Figma 5395:651 |
| field-164·field-108 | — | 164×60, 108×60(목록 항목은 field-list 항목 행) | — | text-field 명세와 같음 | 트리거 빈 값·값 `typography.body-4` (18/400, 코드에 모바일 글자 변경 없음), 값 있음 위로 간 label `typography.text-1-mobile` (12/300, 코드에 label 없어 Figma), 목록 항목 `typography.body-5` | 코드 `src/shared/components/dropdown/dropdown.css.ts`(글자, 2026-10-22 라이브 기준으로 정정), Figma 7885:15196, Figma 7885:15246, Figma 7885:15299(크기) |
| field-list 항목 | 트리거 폭 × 46 | 트리거 폭 × 46 | 목록 네 모서리 `radius.sm` (12px) | `raw:15px` / `raw:10px`, 글자 가운데 정렬 | `typography.body-5` | 코드 `src/shared/components/dropdown/dropdown.css.ts` |
| chip(부문) | 글자 폭 × 48 | 아이콘 + chevron × 32(label 숨김) | `radius.md` (20px) | 0 / `raw:14px`, gap `spacing.2` (8px) / 모바일 0 / `raw:4px` / 0 / `spacing.2` (8px), gap `spacing.1` (4px) | `typography.body-4` / 모바일 `raw:12px/400` | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` |
| chip(기수) | 글자 폭 × 48 | 글자 폭 × 32 | `radius.md` (20px) | 0 / `raw:14px`, gap `raw:6px` / 모바일 0 / `raw:4px` / 0 / `spacing.2` (8px), gap `spacing.1` (4px) | `typography.body-4` / 모바일 `raw:12px/400` | 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` |
| chip-list(기수) 항목 | 패널 폭 × 42 | 패널 폭 × 28 | 패널 `radius.md` (20px) | `spacing.3` (12px) / `spacing.4` (16px) / 모바일 `spacing.2` (8px) / `spacing.3` (12px) | `typography.body-4` / 모바일 `raw:12px/400` | 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` |
| chip-list(부문) 항목 | 글자 폭 × 48 | 글자 폭 × 32 | `raw:30px` | `raw:10px` / `spacing.4` (16px), gap `raw:10px` / 모바일 0 / `spacing.3` (12px) | `typography.body-4` / 모바일 `raw:12px/400` | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` |

- 값 기준(2026-10-22 라이브 기준으로 정정): chip·chip-list는 아카이빙 라이브 값, field는 지원서 화면 frontend 코드 값(모집 기간이 아니라 라이브에서 볼 수 없음)을 씀. 이전 Figma 값(chip 155×44·92×44·모바일 28, field-list 50 높이 등)은 기록용
- 높이: 표의 값으로 고정함. 코드 글자 행간은 `raw:1.0`
- chip 아이콘: 부문 아이콘 28px(모바일 16px), chevron 16px(데스크톱·모바일)
- padding 값 순서: 1개는 네 방향, 2개는 세로 / 가로, 4개는 위 / 오른쪽 / 아래 / 왼쪽(CSS 순서)
- field 트리거 본체(보더 굵기, label 이동, 간격)는 text-field 명세와 같음. 이 명세는 값만 옮겨 적고 정의는 text-field 명세를 따름
- field-list 폭: 트리거 폭과 같음. Figma 7885:15332(164 → 목록 164), 7885:15367(108 → 108), 5395:3848(252 → 252)
  - 390 트리거 아래 252 목록(Figma 5395:3847)만 예외이며 명세는 따르지 않음
- field-list 글자 정렬: 가운데. Figma 옵션 5393:998·2057:4176의 자동 배치가 가로·세로 가운데(CENTER)임
- field-list 최대 높이: 245px. 넘치면 세로 스크롤
- chip-list(기수) 최대 높이: 240px. 넘치면 세로 스크롤
- chip-list 위치: 트리거 오른쪽 끝에 맞춤
- 목록과 트리거 사이 간격(2026-10-22 라이브 기준으로 정정)
  - field-list: `spacing.2` (8px)(코드 `src/shared/components/dropdown/dropdown.css.ts`)
  - chip-list(기수): `raw:38px`, 모바일 `raw:10px`(코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts`)
  - chip-list(부문) 항목 사이: `spacing.2` (8px)
- chip을 열면 화면 전체에 반투명 막 `raw:rgba(0,0,0,0.5)`을 깔고, 막을 누르면 닫힘(라이브 값, 2026-10-22 라이브 기준으로 정정)
- 그림자: field-list에만 있음(`raw:10px 10px 20px 0 rgba(0,0,0,0.25)`). chip-list는 그림자 없음(라이브)
- 부문 chip-list에는 현재 선택된 부문을 빼고 나머지만 보임(Figma 3496:6379~6381에 "전체" 없음, 코드 같음)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임.

### trigger: field

- field 트리거의 상태·색은 `components/text-field.md` 4절(dropdown-trigger)을 따름. 값이 선택된 트리거는 text-field의 completed 행임
- 이 명세는 표를 따로 두지 않음. selected는 option 행 전용 이름이며 트리거 상태 이름으로 쓰지 않음
- select만의 차이
  - 열림(`aria-expanded="true"`) 동안 text-field의 focus 표시(하단 `color.stroke.brand` (#7A64F9), label `color.fg.brand` (#7A64F9))를 유지함(Figma 5395:3847, Figma 5395:646)
  - 목록이 닫히고 포커스가 trigger에 남으면 focus 표시 유지, 포커스가 떠나면 text-field의 해당 행으로 돌아감
  - invalid 상태에서 열면 열림 동안 focus 표시가 우선함(닫히면 invalid 표시로 돌아감)
- field 트리거 disabled: 정의하지 않음. Figma 드롭다운 세트 전부에 disabled가 없고(확인됨) text-field에도 disabled 행이 없음. chip 트리거와 option의 disabled는 아래 표에서 정의함

### trigger: chip

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default("전체 부문"·"기수") | `color.bg.layer` (#1A1A1A) / `color.fg.default` (#FFFFFF) / `color.stroke.weak` (#333333) | `color.palette.gray.800` (#333333) / `color.fg.default` (#FFFFFF) / `color.stroke.weak` (#333333) | `color.bg.layer` (#1A1A1A) / `color.fg.muted` (#999999) / `color.stroke.weak` (#333333) | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts`, 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts`(rest·hover), Figma 5980:11379, Figma 5212:3699(press, 라이브 없음), Figma 없음(추정, focus-visible, 라이브 없음) |
| selected(필터 적용) | default와 같음. label이 값("분석", "25기"), chevron 대신 clear 아이콘 | default와 같음 | default와 같음 | default와 같음 | Figma 3723:9262, Figma 3723:9270, Figma 7091:5127 |
| disabled | `color.bg.layer` (#1A1A1A) / `color.fg.disabled` (#999999) / `color.stroke.weak` (#333333) | — | — | — | Figma 없음(추정) |

- 부문 아이콘 원 색(#999999)은 아이콘 에셋 값임. 토큰을 따로 두지 않음
- invalid 행은 두지 않음. 필터는 필수 입력이 아니기 때문임

### option

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / `color.fg.default` (#FFFFFF) / — | `color.palette.gray.800` (#333333) / `color.fg.default` (#FFFFFF) / — | hover 값 유지 | hover 값과 같음(활성 항목 표시) | Figma 5393:998, Figma 5393:1000, Figma 3496:6387, Figma 없음(추정, press·focus-visible) |
| selected | `color.bg.layer` (#1A1A1A) / `color.fg.brand` (#7A64F9) + check / — | rest 유지 | rest 유지 | `color.palette.gray.800` (#333333) / `color.fg.brand` (#7A64F9) + check / —(활성 항목 표시) | 코드 `src/shared/components/dropdown/dropdown.css.ts`, 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts`(rest·hover), Figma 5980:11087(활성 항목 바탕), Figma 없음(추정, check·press, 라이브 없음) |
| disabled | `color.bg.layer` (#1A1A1A) / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

- selected의 hover 칸: 라이브는 바탕 변화 없음(코드가 hover 바탕을 투명으로 지정). Figma "Hover-Selected"(Figma 5980:11087) #333333 바탕은 키보드 활성 항목 표시에만 씀(2026-10-22 라이브 기준으로 정정)
- option의 focus-visible은 실제 DOM 포커스가 아님
  - DOM 포커스는 trigger에 남고 `aria-activedescendant`가 가리키는 활성 항목을 hover와 같은 바탕으로 표시함
  - 활성 항목에는 outline을 그리지 않음
- chip-list(부문) 항목은 default 항목마다 `color.stroke.weak` (#333333) 1px 보더와 `raw:30px` radius를 가짐. selected 항목은 보더 없음(라이브, 2026-10-22 라이브 기준으로 정정)
- 포커스 트리거: trigger에 `:focus-visible`. field는 하단 보더·label 색으로 표시(text-field 명세와 같음), chip은 outline
- 비동기 상태: 해당 없음. 목록 값은 화면을 그릴 때 이미 있음(기수 목록 조회 중에는 trigger를 disabled로 둠)
- completed 행은 두지 않음. 선택 결과는 selected가 담당함

## 5. Behavior

- 요소 선택: 커스텀 listbox(ARIA APG "select-only combobox" 패턴)를 씀
  - 이유: Figma 목록 모양(검정 패널, hover·selected 색)을 네이티브 `<select>`의 펼친 목록으로는 그릴 수 없음
  - 네이티브 `<select>`는 쓰지 않음. 예외는 11절
- 클릭·탭
  - trigger를 누르면 열림·닫힘 전환
  - option을 누르면 값 선택 후 닫힘. 포커스는 trigger
  - 목록 밖을 누르면 값 변경 없이 닫힘
  - chip의 clear를 누르면 값을 "전체"로 되돌림. 목록은 열지 않음
  - 터치에서는 hover 색을 적용하지 않음
- 키보드(포커스는 trigger에 있음)
  - 닫힘: ↓·↑·Enter·Space로 열림. 열릴 때 활성 항목은 선택된 항목, 없으면 첫 항목
  - 닫힘: Home·End로 열면서 첫·끝 항목 활성
  - 열림: ↓·↑로 활성 항목 이동(끝에서 멈춤, 순환하지 않음)
  - 열림: Home·End로 첫·끝 항목, PageUp·PageDown으로 10개씩 이동
  - 열림: Enter·Space로 활성 항목 선택 후 닫힘
  - 열림: Esc로 값 변경 없이 닫힘
  - 열림: Tab은 활성 항목을 선택하고 닫은 뒤 다음 요소로 이동(APG 동작)
  - 열림: Alt+↑로 활성 항목 선택 후 닫힘
  - 타이핑 검색: 글자를 치면 그 글자로 시작하는 다음 항목을 활성. 0.5초 안의 연속 입력은 이어 붙여 검색("2", "25" → "25기"). 닫힌 상태에서 치면 열면서 이동
  - 활성 항목이 목록 밖이면 보이도록 스크롤함
- 포커스 이동·복귀
  - 포커스는 항상 trigger에 둠. option에 DOM 포커스를 주지 않음
  - 닫힌 뒤 포커스는 trigger에 남음
- 값 변경 알림: field는 `onChange`로 폼 상태 갱신. chip은 선택 즉시 목록 필터링
- 비동기 중 동작: 해당 없음(4절)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color(trigger) | 0.2s | ease-in-out | design-reference 4.3 |
| background-color(option) | field-list 0.2s, chip-list 0.15s | ease | 코드 `src/shared/components/dropdown/dropdown.css.ts`, 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` |
| 목록 열림·닫힘 | 없음 | — | design-reference 5.6 |
| chevron 회전 | 없음(아이콘 교체) | — | 코드 `src/widgets/archive/ui/track-filter/track-filter.tsx` |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - field: 폭 164·108(text-field 명세의 dropdown-trigger 모바일 폭과 같음. 모바일 252는 Figma에 없음). 목록 항목은 높이 50·`typography.body-4` 유지
  - chip: 높이 48 → 32, 부문 아이콘 28 → 16(chevron 16 유지), 글자 `typography.body-4` → `raw:12px/400`, 패딩 0 / `raw:4px` / 0 / `spacing.2`, gap `spacing.1`. 부문 chip은 label 숨김(2026-10-22 라이브 기준으로 정정)
  - chip-list 항목: 높이 28(기수)·32(부문), 글자 `raw:12px/400`
  - chip 보더: 데스크톱과 같은 `color.stroke.weak` 1px(불투명도 없음)
- Figma 모바일 노드(기록용)
  - field 목록 항목: Figma 7885:15196(164), Figma 7885:15246(108)
  - chip 트리거: Figma 7078:5049(부문 닫힘), Figma 7091:5127(기수 선택됨)
  - chip-list 항목: Figma 7091:5390, Figma 7091:5396, Figma 7091:5402(부문), Figma 7091:5644(기수)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 권장: 커스텀 listbox(select-only combobox)<br>trigger: `role="combobox"`(`<button>` 대신 `tabindex="0"`인 `<div>`에 부여, 또는 `<button role="combobox">`)<br>목록: `role="listbox"`, 항목: `role="option"`<br>clear: trigger 밖 별도 `<button>`(trigger 안에 버튼을 중첩하지 않음) | Figma 없음(추정) |
| 키보드 | ↓·↑·Home·End·PageUp·PageDown 이동, Enter·Space·Alt+↑ 선택, Esc 닫기, Tab 선택 후 이동, 타이핑 검색(5절) | Figma 없음(추정) |
| aria | trigger: `aria-expanded`(열림 `true`/닫힘 `false`), `aria-controls`(listbox id), `aria-haspopup="listbox"`, `aria-activedescendant`(열렸을 때 활성 option id, 닫히면 제거)<br>이름: field는 `<label>` 또는 `aria-labelledby`로 필드 이름, chip은 `aria-label`("부문 필터", "기수 필터")<br>option: `aria-selected="true"`는 선택된 항목에만, 비활성은 `aria-disabled="true"`<br>field invalid: `aria-invalid="true"` + `aria-describedby`(에러 메시지 id), 필수는 `aria-required="true"`<br>clear: `aria-label`("{값} 선택 해제(COMPONENT-10-02, `components/tag-chip.md`)")<br>아이콘(부문·chevron·check)은 `aria-hidden="true"` | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자·UI 요소 3:1<br>option default 흰 글자 / `color.bg.layer`: 17.40, hover 바탕 위 12.63<br>option selected `color.fg.brand` / `color.bg.layer`: 4.16, 키보드 활성 바탕 #333333 위 3.02. field-list 16 Regular·chip-list 18 Regular 모두 큰 글자가 아니라 **알려진 미달**(라이브 값 유지, 2026-10-22 라이브 기준으로 정정). check 아이콘(UI 요소)은 3:1 기준으로 rest 통과, 활성 3.02로 통과<br>field placeholder `color.fg.muted` / 검정 캔버스: 7.37<br>field 하단 보더: `color.stroke.neutral` 7.37, `color.stroke.brand` 5.02, `color.stroke.critical` 7.04<br>chip 보더 `color.stroke.weak` / 검정 캔버스: 1.66. 트리거는 글자로 식별되므로 보더는 장식으로 봄<br>disabled: WCAG 1.4.3 비활성 예외 | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: 전 size 통과(모바일 chip 높이 32, chip-list 항목 28·32)<br>모바일 권장 44×44: 모바일 chip(높이 32), chip-list 모바일 항목(높이 28·32), 모바일 clear 아이콘(16×16) 미달. clear는 누르는 영역을 24×24 이상으로 넓힘 | WCAG 2.2 2.5.8 |
| 포커스 링 | chip: `color.stroke.focus` (#68CBEC) outline 2px, offset 2px. 검정 캔버스 위 11.34:1, `color.bg.layer` 위 9.40:1<br>field: text-field 명세와 같음(하단 `color.stroke.brand` + label `color.fg.brand`)<br>option: 링 없음, 활성 바탕으로 표시 | `docs/wbs/20-token.md` 대비표, 계산값 |
| 비활성 표시 | trigger는 `aria-disabled="true"`(포커스 가능 유지)로 표시하고 열지 않음. 비활성 사유를 화면에 표시<br>option은 `aria-disabled="true"`, 활성 이동 시 건너뛰지 않고 선택만 막음 | Figma 없음(추정) |
| 선택 표시 | 색만으로 구분하지 않음: selected option에 check 아이콘 + `aria-selected` | PATTERN-03-03 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 포커스는 trigger에 두고 `aria-activedescendant`로 활성 항목을 가리킴 | option마다 DOM 포커스를 옮겨 스크린 리더가 trigger 맥락을 잃게 함 |
| trigger에 `aria-expanded`를 열림·닫힘마다 갱신 | 목록 표시 여부만 바꾸고 aria 값을 그대로 둠 |
| selected option에 check 아이콘 + `aria-selected` | 보라 글자색만으로 선택 표시 |
| Esc는 값을 바꾸지 않고 닫음 | Esc로 활성 항목을 선택함 |
| chip clear는 trigger 밖 별도 `<button>`, `aria-label` 부여 | trigger `<button>` 안에 X 버튼 중첩 |
| field 본체 값은 text-field 명세를 따름 | select에서 하단 보더 색·굵기를 따로 정의 |
| field-list 폭은 트리거 폭과 같게 | 390 트리거 아래 252 목록 |
| 화면 전체 반투명 막(backdrop) 없이 목록만 띄움 | 필터를 열 때 화면 전체를 어둡게 덮음(Figma에 없음) |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend(field) | `src/shared/components/dropdown/dropdown.tsx`, `src/shared/components/dropdown/dropdown.css.ts`, `src/shared/components/dropdown/dropdownField.tsx`, `src/shared/components/dropdown/dropdownField.css.ts` | `Dropdown`: 트리거 `<button>` + 목록 `<button>` 나열. props `options`·`value`·`placeholder`·`onChange`·`isError`<br>`DropdownField`: `Dropdown`에 내부 상태(`defaultValue`)를 더한 래퍼. `dropdownField.css.ts`의 `overlay`는 쓰는 곳 없음<br>사용처: `src/widgets/apply/ui/personal-info-section.tsx`(출생 연·월·일, 학년, 학기 등 7곳) |
| frontend(chip) | `src/widgets/archive/ui/track-filter/track-filter.tsx`, `src/widgets/archive/ui/generation-filter/generation-filter.tsx` 및 각 `.css.ts` | 공용 컴포넌트가 아니라 위젯 안에 따로 구현됨. 부문(track)은 `createPortal`로 body에 목록을 띄움 |
| frontend 차이 | 위와 같음 | 수정 예정(ADOPT-03). 명세와 다른 점(라이브 값을 명세로 채택한 글자·패딩·목록 간격·모서리·그림자·backdrop·chip 높이·전환 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- role·aria: `role="combobox"`·`listbox`·`option`, `aria-expanded`·`aria-activedescendant`·`aria-selected` 모두 없음<br>- 키보드: 방향키·Home/End·Esc·타이핑 검색 없음(목록 항목이 각각 Tab 대상)<br>- check 아이콘 없음<br>- field hover: 보더·label 변화 없음<br>- field focus·열림: label 이동·보라 보더 없음<br>- chip selected: chevron 유지, clear 아이콘 없음<br>- 부문 chevron: 열림·닫힘 아이콘 이름이 반대로 import됨(`ic_expand_more`를 `ChevronUpIcon`으로 씀)
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트·날짜 입력), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | 위와 같음 | `Dropdown`·`DropdownField` ↔ field. `TrackFilterOverlay` ↔ chip(부문). `GenerationFilterOverlay` ↔ chip(기수). `itemVariants.default`·`selected` ↔ option default·selected. `isError` ↔ invalid |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:14px`, `raw:4px`, `raw:6px` | chip 좌우 패딩(데스크톱·모바일 오른쪽), 기수 chip gap | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts`, 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` | 불필요 |
| `raw:10px` | chip-list(부문) 항목 위아래 패딩·gap, field-list 항목 좌우 패딩 | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts`, 코드 `src/shared/components/dropdown/dropdown.css.ts` | 불필요 |
| `raw:15px` | field-list 항목 위아래 패딩 | 코드 `src/shared/components/dropdown/dropdown.css.ts` | 불필요 |
| `raw:30px` | chip-list(부문) 항목 radius | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | 불필요(높이 48·32에서 알약형) |
| `raw:12px/400` | 모바일 chip·chip-list 글자 | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | 필요 여부 별도 이슈. `typography.text-1-mobile`은 12/300 |
| `raw:38px`, `raw:10px` | chip-list(기수)와 트리거 사이 간격(데스크톱·모바일) | 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` | 불필요 |
| `raw:rgba(0,0,0,0.5)` | chip 열림 때 화면 전체 반투명 막 | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | 필요 여부 별도 이슈(모달 COMPONENT-07 막과 함께 판단) |
| `raw:10px 10px 20px 0 rgba(0,0,0,0.25)` | field-list 그림자 | 코드 `src/shared/components/dropdown/dropdown.css.ts` | 필요(그림자 토큰 없음. 모달 COMPONENT-07과 함께 판단) |
| 28px / 16px | 부문 아이콘(데스크톱 / 모바일) | 코드 `src/widgets/archive/ui/track-filter/track-filter.tsx` | 불필요 |
| 16px | chevron(데스크톱·모바일) | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | 불필요 |
| 245px, 240px | field-list·chip-list(기수) 최대 높이 | 코드 `src/shared/components/dropdown/dropdown.css.ts`, 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` | 불필요 |
| 6px, 4px | 목록 스크롤바 폭(field-list·chip-list) | 코드 `src/shared/components/dropdown/dropdown.css.ts`, 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` | 불필요 |
| 24px / 16px | chip clear(데스크톱 / 모바일, 라이브 없음) | Figma 3723:9262, Figma 7089:5086 | 불필요 |
| 20px | selected check 아이콘 | Figma 없음(추정) | 불필요 |
| z-index 100 | 열린 목록 | design-reference 5.6 | 불필요(design-reference 4.7 z-index 표와 함께 관리) |
| 0.5s | 타이핑 검색 연속 입력 묶음 시간 | Figma 없음(추정) | 불필요 |
| 2px, offset 2px | chip focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- selected check 아이콘: Figma에 없음. PATTERN-03-03(색만으로 구분하지 않음) 때문에 추정으로 추가함. 디자이너 확인 필요
  - Figma 추정(디자이너): 옵션 세트 5393:997 4변형, 2057:4208 모두 아이콘 없음. 권고 추가 유지(WCAG 1.4.1)
- field 트리거 chevron(펼침 화살표): Figma 드롭다운 세트 9개와 최신 화면 4곳 모두 없음 확인(`components/text-field.md` 3절). 추가 여부만 디자이너 선택 사항
- chip 트리거·option disabled: Figma 없음. 추정값
  - Figma 추정(디자이너): Figma 없음. 쓰는 곳이 없어 정의하지 않는 방안 권고
- 네이티브 `<select>` 예외: 출생 연도처럼 항목이 많은 모바일 목록은 OS 선택기가 더 쓰기 쉬움. 네이티브 허용 여부는 PATTERN-02(폼 패턴)에서 결정 필요
  - Figma 추정(디자이너): Figma 근거 없음(정책 판단). 권고 모바일에서 항목 10개가 넘는 목록(연도)만 허용
