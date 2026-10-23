---
id: checkbox
name_ko: 체크박스
ticket: COMPONENT-04
tier: P0
status: review
figma:
  - "5946:10027"
  - "7578:14600"
  - "5799:10193"
  - "4266:7630"
  - "4266:7631"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-23
---

# 체크박스 (checkbox)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 여러 항목 중 0개 이상 선택, 또는 동의 여부 하나를 켜고 끄는 입력
- 구성: variant 2종(단독 체크박스, 약관 동의형)
- 사용 화면
  - 지원서 동의 단계: 개인정보 필수항목 수집 및 이용 동의(약관 동의형)
  - 지원서 표 문항(복수 선택): 행·열 칸마다 단독 체크박스
  - 면접 가능 시간 표(Figma 8812:5893, 지원 폼 안 사본 8812:5894): 제목 "면접 가능 시간 (복수 선택)"의 다중 선택 표. 무응답 허용(안내문 "응답이 없을 경우, 모든 면접 시간이 불가능한 것으로 간주")이라 누락 오류 문구 없음. Figma는 칸을 16×16 원(라디오 모양)으로 그림. 모양은 3절 table-cell
- 관련 명세: `components/button.md`(동의 후 "지원서 작성" 버튼 disabled 규칙, COMPONENT-01), `components/radio.md`(라디오, COMPONENT-05), `components/card.md`(카드 바탕, COMPONENT-08)

## 2. Anatomy

### 단독 체크박스

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<label>`. 상자와 라벨을 감싸 클릭 영역을 넓힘 | — |
| input | ○ | 네이티브 `<input type="checkbox">`. `appearance: none`으로 상자 모양을 직접 그림. 숨기지 않음(포커스 링을 input에 그림) | 3·4절 |
| box | ○ | 24×24(모바일 20×20) 상자. radius `raw:5px` | `color.stroke.neutral` (#999999), `color.bg.brand-solid` (#7A64F9) |
| glyph | × | checked 체크 표시, indeterminate 가로 막대. 상자 안에 그림. Figma는 보라 상자에 체크 모양 구멍을 뚫은 한 벡터라 아래 바탕(검정 캔버스)이 보임. 명세는 캔버스 색으로 칠함 | `color.bg.canvas` (#000000) |
| label | × | 보이는 라벨. 없으면 `aria-label` 필수(7절) | `typography.body-4` (18/400), `color.fg.default` (#FFFFFF) |

### 약관 동의형

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| row | ○ | 체크박스 + 라벨 + 전문 버튼 가로 배치. 높이 24. 상자–라벨 gap 10(모바일 16), 라벨–전문 버튼 16 | `raw:10px`, `spacing.4` (16px) |
| checkbox | ○ | 단독 체크박스 24×24 | 위 표 |
| label | ○ | "개인정보 필수항목 수집 및 이용 동의". `<label for>`로 input과 연결 | `typography.body-3` (18/700), `color.fg.default` (#FFFFFF) |
| toggle | ○ | 전문 보기·접기 버튼. radius `radius.xs` (8px), 1px 보더, 바탕 없음 | `color.stroke.neutral` (#999999), `raw:14px/400`, `color.palette.gray.100` (#E6E6E6), padding `spacing.1` (4px) / `spacing.3` (12px) |
| detail | ○ | 펼침 카드(수집 항목 표 + 안내 문단). row 아래 16px. 폭 부모 100% | `color.bg.layer` (#1A1A1A), `radius.sm` (12px), 펼침 보더 `color.palette.gray.600` (#666666) 1px, 안내 문단 `typography.body-5` (16/400) `color.fg.neutral` (#CCCCCC), row와의 간격 `spacing.4` (16px) |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| standalone | 단독 체크박스. 라벨 있음·없음 모두 가능(표 문항 칸은 라벨 없음) | Figma 5946:10027, Figma 7578:14600 |
| table-cell | 표 문항(면접 가능 시간 등 복수 선택) 칸. 16×16 원 모양 | 코드 `src/shared/components/radio-button/radio-button.css.ts`, Figma 8812:5893 |
| agreement | 약관 동의형. 체크박스 + 라벨 + 전문 보기·접기 토글 + 펼침 카드. 접힘(Default)·펼침 2상태 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts`, Figma 5799:10193, Figma 5799:10186, Figma 5799:10194 |

- agreement의 접힘·펼침은 기본 상태가 아니라 토글 버튼의 열림 상태임. 4절 표에 넣지 않고 5절에 적음

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| box | 24×24 | 20×20 | `raw:5px` | — | — | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts`(크기), Figma 5946:10028(radius·보더, 라이브 없음) |
| table-cell | 16×16 원, 테두리 1px | 같음 | `radius.full` (40px) | — | — | 코드 `src/shared/components/radio-button/radio-button.css.ts` |
| agreement row | 글자 폭 × 24 | 부모 폭 × 24(상자 20×20) | — | 상자–라벨 gap `raw:10px` / 모바일 `spacing.4` (16px) | `typography.body-3` / 모바일 `typography.body-5` | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` |
| toggle | 글자 폭 × 22(패딩 4×2 + 글자 14), 누르는 영역 높이 24 | 글자 폭 × 18, 누르는 영역 높이 24 | `radius.xs` (8px) | `spacing.1` (4px) / `spacing.3` (12px) / 모바일 `spacing.1` (4px) / `spacing.2` (8px) | `raw:14px/400` / 모바일 `raw:10px/400` | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` |
| detail | 부모 폭 × 내용 높이 | 부모 폭 × 내용 높이 | `radius.sm` (12px) | `spacing.5` (20px) / 모바일 `raw:14px` / `spacing.3` (12px) | 안내 문단 `typography.body-5` / 모바일 `raw:10px/400` | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` |

- 값 기준(2026-10-22 라이브 기준으로 정정): 지원서 화면은 모집 기간이 아니라 라이브에서 볼 수 없어 frontend 코드 값을 라이브 값으로 씀(상자 크기, 표 칸 원 모양, row 간격, 라벨·toggle·detail 글자, toggle 문구, detail 보더·패딩·간격). 코드가 브라우저 기본 모양에 맡긴 상자 모양(radius·보더·체크 표시)과 코드에 없는 상태(hover·press·indeterminate·disabled·focus-visible)는 Figma 값·추정값
- padding 값 순서: 2개는 세로 / 가로, 4개는 위 / 오른쪽 / 아래 / 왼쪽
- radius 5: Radius 토큰(12·20·40)에 없어 `raw:5px`로 적음(10절)
- table-cell: 라이브(코드)·Figma(8812:5893) 모두 16×16 원. 이전 명세의 네모 24×24는 쓰지 않음(2026-10-22 라이브 기준으로 정정). 색·상태는 `components/radio.md` 4절 circle·dot과 같음(selected 테두리·점 `color.bg.brand-solid` #7A64F9)
- detail 높이: 내용 높이에 맞춤(잘림 없음). Figma 카드 800×300·342×193 고정(4266:8063, 6773:8723)은 기록용
- detail 바탕·보더: `color.bg.layer` (#1A1A1A), 펼침 때 보더 `color.palette.gray.600` (#666666) 1px(데스크톱·모바일), `radius.sm`(코드). Figma 데스크톱 보더 없음에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)
- detail 내용: 코드 기준(수집 항목 표 + 안내 문단). 안내 문단 16/400 #CCCCCC 행간 `raw:1.6`, 모바일 10/400. 표 스타일은 이 명세 범위 밖
- detail padding: 사방 `spacing.5` (20px), 모바일 `raw:14px` / `spacing.3` (12px)(코드)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / glyph / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### box

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(unchecked) | 투명 / — / `color.stroke.neutral` (#999999) 1px | 투명 / — / `color.palette.gray.200` (#CCCCCC) 1px | 투명 / — / `color.stroke.brand` (#7A64F9) 1px | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5946:10029, Figma 없음(추정, hover·press·focus-visible) |
| selected(checked) | `color.bg.brand-solid` (#7A64F9) / 체크 `color.bg.canvas` (#000000) / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5946:10032, Figma 7578:14605, Figma 5799:10178, Figma 없음(추정, hover·press·focus-visible) |
| indeterminate | `color.bg.brand-solid` (#7A64F9) / 가로 막대 `color.bg.canvas` (#000000) / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 없음(추정) |
| disabled | unchecked: 투명 / — / `color.stroke.weak` (#333333) 1px<br>checked·indeterminate: `color.bg.disabled` (#666666) / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

### toggle(전문 보기·접기)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.palette.gray.100` (#E6E6E6) / `color.stroke.neutral` (#999999) 1px | — / `color.fg.default` (#FFFFFF) / `color.palette.gray.200` (#CCCCCC) 1px | — / `color.fg.muted` (#999999) / `color.stroke.neutral` (#999999) 1px | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts`(rest), Figma 없음(추정, hover·press·focus-visible, 라이브 없음) |

- 포커스 트리거: `:focus-visible`(input과 toggle 각각에 그림)
- 포커스 링
  - 결정: 체크박스 포커스는 `color.stroke.focus` (#68CBEC) 2px outline. Figma·라이브 모두 Focus 상태가 없음. (2026-10-23 결정) 모든 focus-visible은 `color.stroke.focus` 정책(ADOPT-01-03)으로 확정함. 근거 `patterns/accessibility.md` 2.2 "ADOPT에서 고칠 항목"
  - 흰 표면(모달) 위 체크박스: `color.stroke.focus-inverse` (#7A64F9)
- checked 체크 표시 색
  - Figma 세 세트(5946:10032 데스크톱, 7578:14605 모바일, 5799:10178)와 이전 판 4266:7303 모두 상자에 체크 모양 구멍을 뚫은 벡터임. 칠이 없어 검정 캔버스가 비침
  - 명세는 구멍 대신 `color.bg.canvas` (#000000)로 칠함. 흰 표면(모달) 위 체크박스도 같은 색으로 칠함(구멍 방식이면 흰색으로 보이나 사용처 없음)
- checked hover·press
  - 바탕 색을 바꾸지 않음
  - `color.bg.brand-solid-hover` (#493C95)는 검정 캔버스 대비 2.36:1로 UI 요소 기준(3:1) 미달이라 쓰지 않음
- disabled
  - 체크박스가 비활성인 화면은 현재 없음. 추가에 대비해 정의함
  - unchecked 보더 #333333은 검정 대비 1.66:1. WCAG 1.4.11 비활성 예외
- invalid·completed 행은 두지 않음
  - 미동의: 체크박스를 에러 표시하지 않고 다음 버튼을 disabled로 두고 사유를 표시함(`components/button.md` 5절)
  - 완료: 체크박스의 상태가 아님
- 비동기 상태(pending·loading): 해당 없음. 선택은 즉시 로컬 상태에 반영되고 서버 요청이 없음

## 5. Behavior

- 클릭·탭
  - 상자와 라벨 어디를 눌러도 checked가 바뀜(`<label>` 연결)
  - 약관 동의형의 toggle을 눌러도 checked는 바뀌지 않음. toggle은 label 밖에 둠
  - 터치에서는 hover 색을 적용하지 않음
- 키보드
  - Tab으로 input에 포커스, Space로 checked 전환(네이티브 동작)
  - Enter는 체크박스를 바꾸지 않음(네이티브 동작 유지, 폼 제출과 충돌 방지)
  - toggle은 `<button type="button">`. Enter·Space로 펼침·접힘
- indeterminate
  - HTML 속성이 없어 스크립트로 `input.indeterminate = true` 설정
  - 누르면 checked로 바뀌고 indeterminate가 풀림
  - 사용처: 하위 항목 일부만 선택된 "전체 선택" 체크박스. 현재 화면에는 없음
- 약관 동의형 펼침·접힘
  - 접힘: toggle 문구 "전문 보기", `aria-expanded="false"`, detail에 `hidden`
  - 펼침: toggle 문구 "접기"(라이브 코드. Figma "전문 닫기"에서 바꿈, 2026-10-22 라이브 기준으로 정정), `aria-expanded="true"`, detail 표시
  - toggle의 `aria-controls`는 detail의 `id`
  - 접힘 상태 detail은 `hidden`으로 접근성 트리에서도 뺌(높이 0만으로 숨기지 않음)
  - 동의 여부와 펼침 여부는 서로 독립임. 펼치지 않고 동의 가능
- 포커스 이동·복귀
  - 펼친 뒤 포커스는 toggle에 유지함. detail로 옮기지 않음
  - detail 안 링크(개인정보처리방침)는 펼침 상태에서만 Tab 순서에 들어감
- 비동기 중 동작(중복 제출 방지, `aria-busy`): 해당 없음(서버 요청 없음)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color | 0.2s | ease-in-out | design-reference 4.3 |
| detail 펼침·접힘(max-height, padding) | `raw:0.35s` | ease | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` |

- detail 전환은 `hidden` 전환과 함께 쓸 때 펼친 뒤에만 높이 전환을 적용함. 접힘 끝에 `hidden`을 설정함
- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - box: 24×24 → 20×20. radius `raw:5px` 유지
  - box 터치 영역: 20×20 상자 둘레에 투명 영역 `raw:2px`를 더해 24×24 이상 확보(label로 감싸 라벨까지 클릭 영역이면 불필요)
  - agreement 라벨: `typography.body-3` → `typography.body-5` (16/400)(코드, 2026-10-22 라이브 기준으로 정정)
  - agreement 상자–라벨 간격: `raw:10px` → `spacing.4` (16px)
  - toggle: 글자 `raw:10px/400`, 패딩 `spacing.1` / `spacing.2`, 오른쪽 끝으로 붙임(`margin-left: auto`)
  - detail: 패딩 `raw:14px` / `spacing.3`, 안내 문단 `raw:10px/400`(3절)
- Figma 모바일 노드
  - 체크박스 세트: Figma 7578:14600(unchecked 7578:14601, checked 7578:14603)
  - 약관 동의형: Figma Mobile 7578:14554(checked 7578:14628, toggle "전문 닫기" 7578:14623), Figma 6773:8596(unchecked 7578:14609, toggle "전문 보기" 6773:8624)
  - detail: Figma 6773:8723

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 네이티브 `<input type="checkbox">`. `<div role="checkbox">` 금지. input을 화면 밖으로 숨기고 다른 요소를 그리는 방식 금지(`appearance: none`으로 input 자체를 꾸밈) | design-reference 5.8.1 |
| 키보드 | Tab으로 포커스, Space로 전환. toggle은 Enter·Space | Figma 없음(추정) |
| aria | 이름: `<label for>` 또는 감싸는 `<label>`. 라벨 텍스트에 toggle 문구가 섞이지 않게 toggle을 label 밖에 둠<br>라벨이 없는 표 칸: `aria-label="<행 이름> <열 이름>"`<br>indeterminate: 스크립트 속성으로 설정(`aria-checked="mixed"`는 네이티브가 자동 노출)<br>toggle: `aria-expanded`, `aria-controls="<detail id>"` | Figma 없음(추정) |
| 대비 | 기준: UI 요소 3:1, 글자 4.5:1<br>unchecked 보더 #999999 대 검정 7.37<br>checked 상자 #7A64F9 대 검정 5.02, 체크 #000000 대 #7A64F9 5.02<br>hover 보더 #CCCCCC 대 검정 13.08, press 보더 #7A64F9 대 검정 5.02<br>약관 라벨 #FFFFFF 대 검정 21.00<br>toggle 글자 #E6E6E6 대 검정 16.83, 보더 #999999 7.37, press 글자 #999999 7.37<br>detail 안내 문단 #CCCCCC 대 #1A1A1A 10.84, detail 보더 #666666 대 #1A1A1A 3.03<br>disabled: #333333 대 검정 1.66, #999999 대 #666666 2.02. WCAG 1.4.11·1.4.3 비활성 예외 | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: 데스크톱 상자 24×24 통과. 모바일 상자 20×20은 label 또는 투명 영역으로 24×24 이상 확보. table-cell 16×16은 칸 전체를 `<label>`로 감싸 24×24 이상 확보. toggle은 겉 높이 22(모바일 18)를 유지하고 `::before`(투명, 위아래로 확장)로 누르는 영역 높이를 24로 넓힘. 데스크톱 위아래 `raw:1px`, 모바일 `raw:3px`(2026-10-23 결정, ADOPT-03-12)<br>모바일 권장 44×44: 약관 동의 row는 높이 24로 미달. 라벨까지 클릭 영역이라 가로는 충분함 | WCAG 2.2 2.5.8 |
| 포커스 링 | 굵기 2px, offset 2px<br>검정 캔버스 위: `color.stroke.focus` (#68CBEC) 11.34:1<br>흰 표면 위: `color.stroke.focus-inverse` (#7A64F9) 4.18:1 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 네이티브 `disabled`. 색만으로 구분하지 않고 비활성 사유를 화면에 표시 | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 네이티브 `<input type="checkbox">`에 `appearance: none`으로 상자를 그림 | input을 1px로 숨기고 `<div>`로 상자를 그려 포커스 링을 잃음 |
| toggle을 `<label>` 밖 형제 요소로 둠 | `<label>` 안에 `<button>`을 넣어 체크박스 이름에 "전문 보기"가 섞임 |
| toggle에 `aria-expanded`·`aria-controls`, 접힌 detail에 `hidden` | max-height 0으로만 숨겨 화면 읽기 프로그램이 접힌 전문을 읽음 |
| 라벨 없는 표 칸 체크박스에 `aria-label` | 이름이 빈 체크박스 |
| 미동의 시 다음 버튼 disabled + 사유 표시 | 체크박스 보더를 빨강으로 바꿔 에러 표시 |
| 약관 동의 등 단독 체크박스는 네모(radius `raw:5px`), 표 문항 칸만 16×16 원(3절 table-cell) | 표 칸이 아닌 체크박스를 라디오와 같은 원형으로 그림 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/apply/ui/agreement-step/agreement-step.tsx`, `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 약관 동의형. 네이티브 `<input type="checkbox">` + `accentColor: '#7964F9'`(브라우저 기본 상자). 공용 체크박스 컴포넌트 없음 |
| frontend | `src/shared/components/radio-button/radio-button.tsx`, `src/widgets/apply/ui/table-question.tsx` | 단독 체크박스. `RadioButton`에 `type="checkbox"`를 넘겨 사용(표 문항 `multiple`). 모양은 라디오 원형 16px |
| frontend 차이 | 위와 같음 | 수정 예정(ADOPT-03). 명세와 다른 점(라이브 값을 명세로 채택한 표 칸 원 모양·toggle 문구·detail 보더·모바일 글자 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- 상자: 브라우저 기본 모양(accent-color). 명세는 Figma radius 5, 1px #999999 보더<br>- checked 색: #7964F9(#7A64F9 오타. 명세 `color.bg.brand-solid`, ADOPT-03-05)<br>- 표 문항: `label=""`로 이름 없음(명세 `aria-label`)<br>- 표 문항: input을 1px로 숨겨 포커스 표시 없음<br>- toggle: `<label>` 안의 `<button>`이라 체크박스 이름에 "전문 보기"가 포함됨<br>- toggle: `aria-expanded`·`aria-controls` 없음<br>- detail: max-height 0으로만 숨겨 접힌 상태에서도 화면 읽기 프로그램이 읽음<br>- 포커스: 전역 `outline: none`, `:focus-visible` 없음<br>- toggle: 누르는 영역이 겉 크기와 같음(높이 22, 모바일 18) → `::before`로 높이 24(2026-10-23 결정) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트·날짜 입력), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/radio-button/radio-button.tsx` | `RadioButton type="checkbox"` ↔ standalone. 공용 체크박스 컴포넌트를 따로 만들 때 이름은 `Checkbox` |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:5px` | box radius | Figma 5946:10028, Figma 7578:14601 | 불필요(체크박스 1곳). 두 번째 사용처가 생기면 제안 |
| `raw:2px` | 모바일 box 터치 영역 확장 | Figma 없음(추정) | 불필요 |
| `raw:0.35s` ease | detail 펼침·접힘 전환 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 불필요(모션 토큰 범위 밖) |
| 체크 표시·가로 막대 모양 | glyph. Figma 벡터(상자 + 체크 구멍) 24×24 / 20×20 | Figma 5946:10032, Figma 7578:14605 | 불필요(아이콘 자산) |
| `raw:10px` | 데스크톱 상자–라벨 간격 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 불필요 |
| `raw:14px/400`, `raw:10px/400` | toggle 글자(데스크톱 / 모바일), 모바일 detail 안내 문단. `typography.text-1`은 14/300 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 필요 여부 별도 이슈(10px 글자 토큰 없음) |
| `raw:14px` | 모바일 detail 위아래 패딩 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 불필요 |
| `raw:1.6` | detail 안내 문단 행간 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 필요 여부 별도 이슈 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| `raw:1px`, `raw:3px` | toggle 누르는 영역 위아래 확장(데스크톱·모바일, `::before`) | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 상태 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- 해당 없음.
