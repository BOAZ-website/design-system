---
id: filter-chip
name_ko: 필터 칩
ticket: COMPONENT-09
tier: P1
status: review
figma:
  - "3723:9261"
  - "3723:9262"
  - "3723:9263"
  - "3723:9264"
  - "3723:9269"
  - "3723:9270"
  - "5212:758"
  - "5980:11451"
  - "5980:11373"
  - "5980:11537"
  - "7078:5049"
  - "7091:5127"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 필터 칩 (filter-chip)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 아카이빙 목록을 부문·기수로 거르는 알약형 칩. 누르면 값 목록이 열리고, 값을 고르면 칩에 그 값이 표시됨(selected)
- 구성: variant 2종(sector·generation) × 기본 상태 2종(default·selected)
- 사용 화면: 아카이빙 프로젝트·블로그·활동사진 검색·필터 줄
- 관련 명세: `components/select.md`(chip 트리거·chip-list, COMPONENT-03), `components/tag-chip.md`(selected 칩의 ✕ 지우기, COMPONENT-10), `components/tag.md`(읽기 전용 태그, COMPONENT-13), `components/tab.md`(COMPONENT-06), `patterns/accessibility.md`(PATTERN-03)
- select 명세와의 경계(2026-10-22 Figma 확인)
  - 이 명세의 Figma 노드 3723:9261~9270은 `components/select.md`의 chip 트리거와 같은 노드임
  - Figma에는 누를 때마다 선택·해제가 바뀌는 토글형 칩이 없음. selected는 "목록에서 값을 골라 필터가 적용된 상태"임
  - 역할 분담
    - select.md: role(`combobox`)·목록(chip-list)·키보드·값 선택 동작. 겹치는 값은 select.md가 기준이며 어긋나면 select.md를 따름
    - filter-chip.md(이 명세): 칩 본체의 Figma 변형 대응, variant별 구성, 상태 표, 칩 묶음 배치
    - tag-chip.md: selected 칩 안 ✕ 버튼의 상태·이름·동작
- tag와의 경계: tag는 카드 안 읽기 전용 라벨, filter-chip은 누르는 컨트롤

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | 트리거 `<button>`과 ✕ `<button>`을 감싸는 알약형 바탕. 바탕·보더·radius는 root에 그림 | `color.bg.layer` (#1A1A1A), `color.stroke.weak` (#333333) 1px, `radius.md` (20px) |
| trigger | ○ | `role="combobox"` `<button>`. 아이콘·label·chevron을 담음. 동작은 `components/select.md` 5절 | — |
| icon-start | × | sector만. 부문 아이콘 28px(모바일 16px, 라이브). 아이콘 에셋 색(#999999) 유지 | — |
| label | ○ | default: 필터 이름("전체 부문", "기수"). selected: sector는 "{값} 부문"("분석 부문"), generation은 고른 값("25기")(라이브, 2026-10-22 라이브 기준으로 정정) | `typography.body-4`, `color.fg.default` (#FFFFFF) |
| chevron | × | default에만. 펼침 화살표 16px(데스크톱·모바일, 라이브). 열리면 위 방향 | `color.fg.default` (#FFFFFF) |
| clear | × | selected에만. chevron 자리의 ✕ 버튼. 값과 상태는 `components/tag-chip.md` | `components/tag-chip.md` 4절 |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| sector | 부문 필터. 부문 아이콘 + label + chevron/✕. 폭은 값 길이에 맞춤 | Figma 3723:9261, Figma 3723:9262, Figma 3723:9263, Figma 3723:9264 |
| generation | 기수 필터. label + chevron/✕. 폭 고정 | Figma 3723:9269, Figma 3723:9270 |

### Sizes

- radius·padding·gap·글자는 `components/select.md` 3절 chip(부문)·chip(기수) 행과 같음
- 값 기준(2026-10-22 라이브 기준으로 정정): 아카이빙 라이브 값(= frontend 코드 값). 높이 48 / 모바일 32, 바탕 #1A1A1A, 보더 1px #333333, 흰 18/400, radius 20. 이전 Figma 값(155×44·92×44, 모바일 56×28·60×28)은 기록용

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| sector default·selected | 글자 폭 × 48 | 아이콘 + chevron × 32(label 숨김) | select.md 3절 chip(부문) | select.md 3절 chip(부문) | select.md 3절 chip(부문) | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` |
| generation default·selected | 글자 폭 × 48 | 글자 폭 × 32 | select.md 3절 chip(기수) | select.md 3절 chip(기수) | select.md 3절 chip(기수) | 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts` |

- 높이: 표의 값으로 고정함
- 칩 묶음 배치: sector 칩과 generation 칩을 가로로 나란히 둠. 칩 사이 gap `spacing.2` (8px)(코드 `src/pages/archive-page.css.ts`, 모바일 같음)
- 모바일 sector는 label을 숨기고 아이콘·chevron만 보임(라이브). 숨긴 이름은 7절 aria로 전달함
- selected의 ✕(clear): 라이브에 없어 Figma 값(Figma 3723:9262, Figma 7091:5133)을 씀. 라이브는 selected에도 chevron을 유지함

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임. fg는 label·chevron·부문 아이콘 바깥 원을 뺀 글자색임.
값은 `components/select.md` 4절 "trigger: chip" 표와 같음. 어긋나면 select.md를 따름.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.layer` (#1A1A1A) / `color.fg.default` (#FFFFFF) / `color.stroke.weak` (#333333) 1px | `color.palette.gray.800` (#333333) / `color.fg.default` (#FFFFFF) / `color.stroke.weak` (#333333) | `color.bg.layer` (#1A1A1A) / `color.fg.muted` (#999999) / `color.stroke.weak` (#333333) | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts`, 코드 `src/widgets/archive/ui/generation-filter/generation-filter.css.ts`(rest·hover), Figma 5980:11379, Figma 5212:3699(press, 라이브 없음), Figma 없음(추정, focus-visible, 라이브 없음) |
| selected | default rest와 같음. label이 값, chevron 대신 ✕(Figma) | `color.palette.gray.800` (#333333) / `color.fg.default` (#FFFFFF) / `color.stroke.weak` (#333333) | `color.bg.layer` (#1A1A1A) / `color.fg.muted` (#999999) / `color.stroke.weak` (#333333) | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5980:11538, Figma 5980:11541, Figma 5980:11456, Figma 5980:11544, Figma 없음(추정, focus-visible) |
| disabled | `color.bg.layer` (#1A1A1A) / `color.fg.disabled` (#999999) / `color.stroke.weak` (#333333) | — | — | — | Figma 없음(추정, select.md 4절) |

- selected의 hover 칸: Figma 변형 "Hover"(Figma 5980:11541, Figma 5980:11456) 값임. `hover-selected` 같은 별도 상태 이름은 두지 않음
- press 칸: Figma press 변형 값(바탕 #1A1A1A, 글자·아이콘 #999999. Figma 5980:11379, Figma 5980:11544, Figma 5212:3699)이며 select.md 4절 chip press와 같음. 글자 #999999 / #1A1A1A 6.11:1로 기준 통과
- Figma 변형 이름 주의
  - 부문 세트(Figma 5212:758, Figma 5980:11451)는 기본 모습 변형 이름이 "Press", press 모습 변형 이름이 "Variant3"임
  - 기수 세트(Figma 5980:11373, Figma 5980:11537)는 Default·Hover·Press로 이름과 모습이 맞음
- 열림 상태(목록 펼침)는 `aria-expanded="true"`이며 모습은 rest와 같고 chevron만 위 방향(Figma 5980:11402, Figma 5980:11511, select.md 4절)
- 포커스 트리거: trigger `<button>`에 `:focus-visible`. outline은 root 바깥에 그림
- 비동기 상태: 해당 없음. 기수 목록 조회 중에는 disabled로 둠(select.md 4절)
- invalid·completed 행은 두지 않음. 필터는 필수 입력이 아니고, 적용 결과는 selected가 나타냄

## 5. Behavior

- 클릭·탭
  - trigger: 목록 열림·닫힘. 값 선택·닫힘·바깥 클릭은 `components/select.md` 5절
  - 값을 고르면 칩이 selected가 되고 목록이 바로 걸러짐
  - ✕: 값을 "전체"로 되돌림. `components/tag-chip.md` 5절
  - 같은 값을 다시 골라도 해제되지 않음(토글 아님). 해제는 ✕로만 함
  - 터치에서는 hover 색을 적용하지 않음
- 키보드: `components/select.md` 5절(↓·↑·Enter·Space로 열기, Esc 닫기, 타이핑 검색)
- 포커스 이동·복귀
  - 값 선택 후 포커스는 trigger에 남음
  - Tab 순서: sector trigger → sector ✕(selected일 때) → generation trigger → generation ✕
- 비동기 중 동작: 해당 없음

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color | 0.2s | ease-in-out | design-reference 4.3 |
| chevron 방향 | 없음(아이콘 교체) | — | 코드 `src/widgets/archive/ui/track-filter/track-filter.tsx` |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성: `components/select.md` 6절 chip 항목과 같음(2026-10-22 라이브 기준으로 정정)
  - 높이 48 → 32, 부문 아이콘 28 → 16, chevron 16 유지, ✕ 24 → 16(Figma)
  - sector는 label을 숨김
- Figma 모바일 노드(기록용)
  - sector default: Figma 7078:5049
  - sector selected: Figma 7089:5086
  - generation selected: Figma 7091:5127

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | trigger: `role="combobox"` `<button>`(select.md 7절). root는 role 없음. ✕는 별도 `<button>`(tag-chip.md 7절) | Figma 없음(추정) |
| 키보드 | Tab으로 trigger·✕에 각각 포커스. 목록 키보드는 select.md 5절 | Figma 없음(추정) |
| aria | trigger 이름: `aria-label`("부문 필터", "기수 필터"). 현재 값은 label 글자로 읽힘<br>모바일 sector default처럼 label이 숨으면 `aria-label`로 이름 유지<br>`aria-expanded`·`aria-controls`·`aria-haspopup="listbox"`는 select.md 7절<br>부문 아이콘·chevron은 `aria-hidden="true"` | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, UI 요소 3:1<br>label `color.fg.default` / `color.bg.layer`: 17.40, hover 바탕 `color.palette.gray.800` 위 12.63<br>보더 `color.stroke.weak` / 검정 캔버스: 1.66. 바탕 #1A1A1A와 글자로 칩이 식별되어 보더는 장식으로 봄(select.md 7절) | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: 전 size 통과(모바일 높이 32)<br>모바일 권장 44×44: 모바일 칩(높이 32) 미달 | WCAG 2.2 2.5.8 |
| 포커스 링 | `color.stroke.focus` (#68CBEC) 2px, offset 2px. 검정 캔버스 위 11.34:1 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 네이티브 `disabled`. 기수 목록 조회 중이면 칩 옆에 사유 표시 | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 칩을 누르면 목록이 열리고, 값은 목록에서 고름 | 칩을 누를 때마다 selected를 켜고 끄는 토글로 구현 |
| 필터 해제는 ✕ 버튼(`components/tag-chip.md`) | 같은 값을 다시 골라 해제 |
| selected의 hover는 selected 행 hover 칸 값 사용 | `hover-selected` 같은 상태 이름을 새로 만듦 |
| 값·동작이 select.md와 어긋나면 select.md를 따름 | filter-chip 전용 목록·키보드 규칙을 따로 정의 |
| 카드 안 분류 표시는 `components/tag.md` | 카드 안에 filter-chip을 읽기 전용으로 사용 |
| 모바일에서 label을 숨겨도 `aria-label` 유지 | 아이콘만 남은 칩의 이름을 비움 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/archive/ui/track-filter/track-filter.tsx`, `src/widgets/archive/ui/generation-filter/generation-filter.tsx` 및 각 `.css.ts` | 공용 컴포넌트 없음. 위젯 안에 따로 구현됨 |
| frontend 차이 | 위와 같음 | `components/select.md` 9절 chip 항목과 같음(ADOPT-03-11). 이 명세 관점의 추가 차이(ADOPT-03-19). 높이·패딩·label 형식은 라이브 값을 명세로 채택해 삭제(2026-10-22 라이브 기준으로 정정)<br>- selected: chevron 유지, ✕ 없음 |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | 위와 같음 | `TrackFilterOverlay` ↔ sector. `GenerationFilterOverlay` ↔ generation |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| 48px / 32px | 칩 높이(데스크톱 / 모바일) | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | 불필요 |
| 28px / 16px | 부문 아이콘(데스크톱 / 모바일) | 코드 `src/widgets/archive/ui/track-filter/track-filter.tsx` | 불필요 |
| 16px | chevron(데스크톱·모바일) | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | 불필요 |
| 24px / 16px | ✕(데스크톱 / 모바일, 라이브 없음) | Figma 3723:9262, Figma 7091:5133 | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |
| radius·padding·모바일 글자 | select.md 10절 chip 행 | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | select.md 10절과 같음 |

## 11. 미확인

- 해당 없음. 칩 사이 간격은 라이브 값(데스크톱·모바일 8)으로 해소됨(2026-10-22 라이브 기준으로 정정)
