---
id: tag-chip
name_ko: 태그 칩(선택값 지우기)
ticket: COMPONENT-10
tier: P1
status: review
figma:
  - "5980:11571"
  - "3496:6197"
  - "3723:9262"
  - "3723:9270"
  - "5980:11538"
  - "5980:11541"
  - "5980:11544"
  - "7091:5127"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 태그 칩(선택값 지우기) (tag-chip)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 이미 선택된 값을 보여 주고 ✕ 버튼으로 그 값을 지우는 칩
- 구성: 값 label + ✕ 버튼. variant 1종
- 사용 화면: 아카이빙 프로젝트·블로그·활동사진의 부문·기수 필터가 적용된 상태(selected)
- 관련 명세: `components/filter-chip.md`(칩 본체·selected 상태, COMPONENT-09), `components/select.md`(chip 트리거의 clear, COMPONENT-03), `components/tag.md`(읽기 전용 태그, COMPONENT-13), `patterns/accessibility.md`(PATTERN-03)
- 경계(2026-10-22 Figma 확인)
  - Figma Components 페이지에서 "값 + ✕" 구성은 필터 칩 selected 변형(Figma 3723:9262~9264, Figma 3723:9270)뿐임. 따로 떨어진 태그 칩 컴포넌트는 없음
  - 칩 바탕·보더·크기·label은 `components/filter-chip.md`(값은 select.md)를 따름
  - 이 명세는 ✕ 버튼의 상태·이름·동작을 정함. select.md 2절의 clear 슬롯과 같은 대상임
  - tag는 ✕가 없는 읽기 전용 라벨, filter-chip은 값을 고르는 트리거, tag-chip은 고른 값을 지우는 부분

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | filter-chip selected의 알약형 바탕. 값은 `components/filter-chip.md` 2절 root | `color.bg.layer` (#1A1A1A), `color.stroke.weak` (#333333), `radius.md` (20px) |
| label | ○ | 선택된 값("분석", "25기"). filter-chip trigger 안 글자 | `typography.body-4` / 모바일 `raw:12px/400`, `color.fg.default` (#FFFFFF) |
| clear | ○ | ✕ `<button>`. 아이콘 24px(모바일 16px). trigger `<button>` 밖 형제 요소 | 4절 |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | 선택된 필터 값 + ✕ | Figma 3723:9262, Figma 3723:9270 |

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| 칩 | filter-chip selected와 같음(글자 폭 × 48) | filter-chip selected와 같음(높이 32) | `components/filter-chip.md` 3절 | `components/filter-chip.md` 3절 | `components/filter-chip.md` 3절 | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` |
| ✕ 아이콘 | 24×24(선 13×13) | 16×16 | — | — | — | Figma 3496:6197, Figma 7091:5127 |
| ✕ 누르는 영역 | 24×24 | 24×24(아이콘 16 + 사방 4 확장) | — | — | — | Figma 없음(추정) |

- 값 기준(2026-10-22 라이브 기준으로 정정): 칩 본체는 아카이빙 라이브 값(`components/filter-chip.md` 3절). ✕는 라이브에 없어 Figma 값을 씀
- ✕ 위치: 칩 오른쪽 끝, label 뒤. chevron이 있던 자리(Figma 3723:9262)
- label과 ✕ 사이 gap: filter-chip gap과 같음(select.md 3절)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서이며 ✕ 버튼 기준임. 칩 바탕 상태는 `components/filter-chip.md` 4절 selected 행.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.default` (#FFFFFF) / — | — / `color.fg.critical` (#F96466) / — | — / `color.fg.critical` (#F96466) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5980:11570, Figma 5980:11572, Figma 없음(추정, press·focus-visible) |
| disabled | — / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

- ✕ hover·press: 아이콘 선 색만 빨강으로 바뀜. 바탕 원을 따로 그리지 않음
- ✕ press: Figma close 세트(Figma 5980:11571)에는 Default·Hover 2종뿐임. WBS COMPONENT-10-01에 따라 hover와 같은 빨강으로 정함
- 칩 hover와 함께: 포인터가 ✕ 위에 있으면 칩 root도 hover 바탕 `color.palette.gray.800` (#333333)이 됨. ✕는 빨강
- 칩 trigger를 hover할 때 ✕는 rest 색 유지
- 칩 trigger를 press할 때 ✕는 칩 글자와 같은 `color.fg.muted` (#999999)(Figma 5980:11544, filter-chip.md 4절 press 칸)
- 포커스 트리거: ✕ `<button>`에 `:focus-visible`. outline은 아이콘 누르는 영역(24×24) 바깥에 그림
- 비동기 상태: 해당 없음. 지우기는 화면 안 필터 상태만 바꿈
- selected·invalid·completed 행은 두지 않음. ✕ 버튼에는 해당 상태가 없음

## 5. Behavior

- 클릭·탭
  - ✕를 누르면 해당 필터 값을 "전체"로 되돌림(select.md 5절). 목록은 열지 않음
  - 칩은 default로 돌아가 label이 필터 이름("전체 부문", "기수"), ✕ 자리가 chevron으로 바뀜
  - 목록은 바로 다시 걸러짐
  - 포인터 up에서 실행. 터치에서는 hover 색을 적용하지 않음
- 키보드
  - Tab으로 trigger 다음에 ✕로 이동
  - Enter·Space로 실행
- 포커스 이동·복귀
  - 지운 뒤 ✕가 사라지므로 포커스를 같은 칩의 trigger로 옮김(포커스가 문서 처음으로 가지 않게 함)
- 알림: 지운 결과는 목록 결과 수를 알리는 `role="status"` 영역이 있으면 그곳에서 알림. 없으면 trigger 이름("부문 필터")과 label("전체 부문")로 상태가 전달됨
- 비동기 중 동작: 해당 없음

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| color(✕ 아이콘) | 0.2s | ease-in-out | design-reference 4.3 |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - ✕ 아이콘 24 → 16. 누르는 영역은 24×24 유지
  - 칩 크기·글자는 `components/filter-chip.md` 6절
- Figma 모바일 노드: Figma 7091:5127(기수 selected, ✕ 16×16)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | ✕는 `<button type="button">`. trigger `<button>` 안에 중첩하지 않고 형제로 둠 | Figma 없음(추정) |
| 키보드 | Tab으로 포커스, Enter·Space로 실행 | Figma 없음(추정) |
| aria | `aria-label="{값} 선택 해제"`(예: "분석 선택 해제", "25기 선택 해제"). 값이 바뀌면 함께 갱신<br>✕ 아이콘 SVG는 `aria-hidden="true"` | Figma 없음(추정) |
| 대비 | 기준: UI 요소(아이콘) 3:1<br>rest `color.fg.default` / `color.bg.layer`: 17.40, hover 바탕 위 12.63<br>hover·press `color.fg.critical` / `color.bg.layer`: 5.84, hover 바탕 `color.palette.gray.800` 위 4.24<br>칩 press 중 ✕ `color.fg.muted` / `color.bg.layer`: 6.11<br>focus 링 `color.stroke.focus` / 검정 캔버스: 11.34 | 계산값(WCAG 상대 휘도), `docs/wbs/20-token.md` 대비표 |
| 터치 영역 | 최소 24×24: 데스크톱 24×24 통과. 모바일 아이콘 16×16은 누르는 영역을 24×24로 넓혀 통과<br>모바일 권장 44×44: 미달(칩 높이 32 안에 있음) | WCAG 2.2 2.5.8 |
| 포커스 링 | `color.stroke.focus` (#68CBEC) 2px, offset 2px. `color.bg.layer` 위 9.40:1 | `docs/wbs/20-token.md` 대비표, 계산값 |
| 비활성 표시 | 칩이 disabled면 ✕도 네이티브 `disabled` | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| ✕는 trigger 밖 별도 `<button>` | trigger `<button>` 안에 ✕ 버튼 중첩 |
| `aria-label="{값} 선택 해제"` | 이름 없는 ✕, "닫기"·"X" 같은 이름 |
| hover·press는 ✕ 아이콘만 `color.fg.critical` | 칩 전체를 빨갛게 바꿈 |
| 지운 뒤 포커스를 같은 칩 trigger로 옮김 | 사라진 ✕와 함께 포커스를 잃음 |
| 모바일 ✕ 누르는 영역 24×24 | 16×16 아이콘 크기만큼만 누를 수 있게 함 |
| 읽기 전용 분류 표시는 `components/tag.md` | 카드 안 태그에 ✕를 붙임 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | 없음 | 부문·기수 필터(`src/widgets/archive/ui/track-filter/track-filter.tsx`, `src/widgets/archive/ui/generation-filter/generation-filter.tsx`)에 ✕가 없음. selected에도 chevron이 그대로임. 추가는 ADOPT-03-11("selected에 clear 아이콘") |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-06(카드·태그·배지), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | — | — |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| 24px / 16px | ✕ 아이콘(데스크톱 / 모바일) | Figma 3496:6197, Figma 7091:5127 | 불필요 |
| `raw:12px/400` | 모바일 label 글자 | 코드 `src/widgets/archive/ui/track-filter/track-filter.css.ts` | `components/select.md` 10절과 같음 |
| 24×24 | ✕ 누르는 영역(모바일 사방 4px 확장) | Figma 없음(추정) | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- ✕ press 색: Figma close 세트(Figma 5980:11571)에 Press 변형 없음. WBS 기준 빨강으로 정함. 디자이너 확인 필요
  - Figma 추정(약): 데스크톱·모바일 모두 Press 변형 없음. hover 빨강만 ON_HOVER로 연결됨(Figma 5980:11570 → 5980:11572, 모바일 Figma 7078:4925 → 7078:4928 #F96466). hover와 같은 빨강 유지
- 필터 밖 사용처(검색어·다중 선택 칩 등): Figma에 없음. 다른 화면에 쓸 때 크기·색 재확인 필요
  - Figma 추정(약): ✕ 칩은 옛 태그 검색 시안(Figma 1110:1261, 1110:1564, 1635:2574)에만 있고 최신 화면(4817:*)에는 없음
