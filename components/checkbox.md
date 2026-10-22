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
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
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
- 관련 명세: `components/button.md`(동의 후 "지원서 작성" 버튼 disabled 규칙, COMPONENT-01), `components/radio.md`(라디오, COMPONENT-05), `components/card.md`(카드 바탕, COMPONENT-08)

## 2. Anatomy

### 단독 체크박스

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<label>`. 상자와 라벨을 감싸 클릭 영역을 넓힘 | — |
| input | ○ | 네이티브 `<input type="checkbox">`. `appearance: none`으로 상자 모양을 직접 그림. 숨기지 않음(포커스 링을 input에 그림) | 3·4절 |
| box | ○ | 24×24(모바일 20×20) 상자. radius `raw:5px` | `color.stroke.neutral` (#999999), `color.bg.brand-solid` (#7A64F9) |
| glyph | × | checked 체크 표시, indeterminate 가로 막대. 상자 안에 그림 | `color.fg.on-brand` (#FFFFFF) |
| label | × | 보이는 라벨. 없으면 `aria-label` 필수(7절) | `typography.body-4` (18/400), `color.fg.default` (#FFFFFF) |

### 약관 동의형

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| row | ○ | 체크박스 + 라벨 + 전문 버튼 가로 배치. 387×24, gap 16 | `spacing.4` (16px) |
| checkbox | ○ | 단독 체크박스 24×24 | 위 표 |
| label | ○ | "개인정보 필수항목 수집 및 이용 동의". `<label for>`로 input과 연결 | `typography.body-3` (18/700), `color.fg.default` (#FFFFFF) |
| toggle | ○ | 전문 보기·전문 닫기 버튼. 76×24, radius `raw:8px`, 1px 보더, 바탕 없음 | `color.stroke.neutral` (#999999), `typography.text-1` (14/300), `color.palette.gray.100` (#E6E6E6), padding `spacing.1` (4px) / `spacing.3` (12px) |
| detail | ○ | 펼침 카드 `지원폼_전문 카드`. row 아래 20px. 폭 800 | `color.bg.layer` (#1A1A1A), `radius.sm` (12px), `typography.body-4` (18/400), `color.fg.default` (#FFFFFF), row와의 간격 `spacing.5` (20px) |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| standalone | 단독 체크박스. 라벨 있음·없음 모두 가능(표 문항 칸은 라벨 없음) | Figma 5946:10027, Figma 7578:14600 |
| agreement | 약관 동의형. 체크박스 + 라벨 + 전문 보기·전문 닫기 토글 + 펼침 카드. 접힘(Default)·펼침 2상태 | Figma 5799:10193, Figma 5799:10186, Figma 5799:10194, Figma 4266:7630, Figma 4266:7631 |

- agreement의 접힘·펼침은 기본 상태가 아니라 토글 버튼의 열림 상태임. 4절 표에 넣지 않고 5절에 적음

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| box | 24×24 | 20×20 | `raw:5px` | — | — | Figma 5946:10028, Figma 7578:14601 |
| agreement row | 387×24 | 미확인 | — | gap `spacing.4` (16px) | `typography.body-3` / 모바일 `typography.body-5` | Figma 5799:10186, 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` |
| toggle | 76×24 | 80×24 | `raw:8px` | `spacing.1` (4px) / `spacing.3` (12px) | `typography.text-1` / 모바일 미확인 | Figma 4266:7630, design-reference 5.8.1 |
| detail | 800×내용 높이 | 부모 폭 100% | `radius.sm` (12px) | `spacing.5` (20px) | `typography.body-4` / 모바일 `typography.body-4-mobile` | Figma 5799:10200, 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` |

- padding 값 순서: 2개는 세로 / 가로
- radius 5: Radius 토큰(12·20·40)에 없어 `raw:5px`로 적음(10절)
- detail 높이
  - Figma 카드는 800×300 고정이고 안쪽 글자 330px가 넘쳐 잘림
  - 명세는 내용 높이에 맞춤(잘림 없음). 11절 참조
- detail padding
  - Figma 안쪽 프레임은 왼쪽 16만 있음(위·오른쪽·아래 0)
  - 명세는 사방 `spacing.5` (20px)로 맞춤(코드 값과 같음). 11절 참조

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / glyph / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### box

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(unchecked) | 투명 / — / `color.stroke.neutral` (#999999) 1px | 투명 / — / `color.palette.gray.200` (#CCCCCC) 1px | 투명 / — / `color.stroke.brand` (#7A64F9) 1px | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5946:10029, Figma 없음(추정, hover·press·focus-visible) |
| selected(checked) | `color.bg.brand-solid` (#7A64F9) / 체크 `color.fg.on-brand` (#FFFFFF) / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5946:10032, Figma 없음(추정, glyph 색·hover·press·focus-visible) |
| indeterminate | `color.bg.brand-solid` (#7A64F9) / 가로 막대 `color.fg.on-brand` (#FFFFFF) / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 없음(추정) |
| disabled | unchecked: 투명 / — / `color.stroke.weak` (#333333) 1px<br>checked·indeterminate: `color.bg.disabled` (#666666) / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

### toggle(전문 보기·전문 닫기)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.palette.gray.100` (#E6E6E6) / `color.stroke.neutral` (#999999) 1px | — / `color.fg.default` (#FFFFFF) / `color.palette.gray.200` (#CCCCCC) 1px | — / `color.fg.muted` (#999999) / `color.stroke.neutral` (#999999) 1px | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 4266:7630, Figma 4266:7631, Figma 없음(추정, hover·press·focus-visible) |

- 포커스 트리거: `:focus-visible`(input과 toggle 각각에 그림)
- 포커스 링
  - 결정: 체크박스 포커스는 `color.stroke.focus` (#68CBEC) 2px outline
  - 흰 표면(모달) 위 체크박스: `color.stroke.focus-inverse` (#7A64F9)
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
  - 펼침: toggle 문구 "전문 닫기", `aria-expanded="true"`, detail 표시
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
  - agreement 라벨: `typography.body-3` → `typography.body-5` (16/400, 코드 값. Figma 모바일 노드 미확인)
  - toggle: 76×24 → 80×24. 오른쪽 끝으로 붙임(`margin-left: auto`)
  - detail 글자: `typography.body-4` → `typography.body-4-mobile` (15/400)
- Figma 모바일 노드
  - 체크박스 세트: Figma 7578:14600(unchecked 7578:14601, checked 7578:14603)
  - 약관 동의형 모바일 노드: 미확인(11절)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 네이티브 `<input type="checkbox">`. `<div role="checkbox">` 금지. input을 화면 밖으로 숨기고 다른 요소를 그리는 방식 금지(`appearance: none`으로 input 자체를 꾸밈) | design-reference 5.8.1 |
| 키보드 | Tab으로 포커스, Space로 전환. toggle은 Enter·Space | Figma 없음(추정) |
| aria | 이름: `<label for>` 또는 감싸는 `<label>`. 라벨 텍스트에 toggle 문구가 섞이지 않게 toggle을 label 밖에 둠<br>라벨이 없는 표 칸: `aria-label="<행 이름> <열 이름>"`<br>indeterminate: 스크립트 속성으로 설정(`aria-checked="mixed"`는 네이티브가 자동 노출)<br>toggle: `aria-expanded`, `aria-controls="<detail id>"` | Figma 없음(추정) |
| 대비 | 기준: UI 요소 3:1, 글자 4.5:1<br>unchecked 보더 #999999 대 검정 7.37<br>checked 상자 #7A64F9 대 검정 5.02, 체크 #FFFFFF 대 #7A64F9 4.18<br>hover 보더 #CCCCCC 대 검정 13.08, press 보더 #7A64F9 대 검정 5.02<br>약관 라벨 #FFFFFF 대 검정 21.00<br>toggle 글자 #E6E6E6 대 검정 16.83, 보더 #999999 7.37, press 글자 #999999 7.37<br>detail 글자 #FFFFFF 대 #1A1A1A 17.40<br>disabled: #333333 대 검정 1.66, #999999 대 #666666 2.02. WCAG 1.4.11·1.4.3 비활성 예외 | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: 데스크톱 상자 24×24 통과. 모바일 상자 20×20은 label 또는 투명 영역으로 24×24 이상 확보<br>모바일 권장 44×44: 약관 동의 row는 높이 24로 미달. 라벨까지 클릭 영역이라 가로는 충분함 | WCAG 2.2 2.5.8 |
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
| 체크박스는 네모(radius `raw:5px`) | 체크박스를 라디오와 같은 원형으로 그림 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/apply/ui/agreement-step/agreement-step.tsx`, `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 약관 동의형. 네이티브 `<input type="checkbox">` + `accentColor: '#7964F9'`(브라우저 기본 상자). 공용 체크박스 컴포넌트 없음 |
| frontend | `src/shared/components/radio-button/radio-button.tsx`, `src/widgets/apply/ui/table-question.tsx` | 단독 체크박스. `RadioButton`에 `type="checkbox"`를 넘겨 사용(표 문항 `multiple`). 모양은 라디오 원형 16px |
| frontend 차이 | 위와 같음 | 수정 예정(ADOPT-03). 명세와 다른 점<br>- 상자: 브라우저 기본 모양(accent-color). 명세는 radius 5, 1px #999999 보더<br>- checked 색: #7964F9(명세 `color.bg.brand-solid` #7A64F9)<br>- 표 문항: 원형 16px 라디오 모양(명세 네모 24×24 / 모바일 20×20)<br>- 표 문항: `label=""`로 이름 없음(명세 `aria-label`)<br>- 표 문항: input을 1px로 숨겨 포커스 표시 없음<br>- toggle 문구: 펼침 시 "접기"(Figma "전문 닫기")<br>- toggle: `<label>` 안의 `<button>`이라 체크박스 이름에 "전문 보기"가 포함됨<br>- toggle: `aria-expanded`·`aria-controls` 없음<br>- detail: max-height 0으로만 숨겨 접힌 상태에서도 화면 읽기 프로그램이 읽음<br>- detail: 펼침 시 1px #666666 보더(Figma 보더 없음)<br>- 모바일 toggle 글자: 10 Regular(Figma 14 Light, 모바일 값 미확인)<br>- 포커스: 전역 `outline: none`, `:focus-visible` 없음 |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트·날짜 입력), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/radio-button/radio-button.tsx` | `RadioButton type="checkbox"` ↔ standalone. 공용 체크박스 컴포넌트를 따로 만들 때 이름은 `Checkbox` |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:5px` | box radius | Figma 5946:10028, Figma 7578:14601 | 불필요(체크박스 1곳). 두 번째 사용처가 생기면 제안 |
| `raw:8px` | toggle radius | Figma 4266:7630 | 불필요. 버튼 모바일 neutral-md(`components/button.md`)와 같은 값. 사용처 3곳이 되면 제안 |
| `raw:2px` | 모바일 box 터치 영역 확장 | Figma 없음(추정) | 불필요 |
| `raw:0.35s` ease | detail 펼침·접힘 전환 | 코드 `src/widgets/apply/ui/agreement-step/agreement-step.css.ts` | 불필요(모션 토큰 범위 밖) |
| 체크 표시·가로 막대 모양 | glyph. Figma 벡터(상자 + 체크 구멍) 24×24 / 20×20 | Figma 5946:10032, Figma 7578:14605 | 불필요(아이콘 자산) |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 상태 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- checked 체크 표시 색
  - Figma: 보라 상자에 체크 모양 구멍을 뚫은 벡터(Figma 5946:10032). 흰 프레임 위에서는 흰색, 검정 캔버스 위에서는 검정으로 보임
  - 명세: `color.fg.on-brand` (#FFFFFF)로 정함(4.18:1, UI 요소 3:1 통과). 디자이너 확인 필요
- hover·press·disabled·indeterminate·focus-visible: Figma 없음. 추정값(Figma 5946:10027 세트에 Unchecked·Checked 2개만 있음)
- toggle hover·press·focus-visible: Figma 없음. 추정값(Figma 4266:7630, Figma 4266:7631)
- 약관 동의형 모바일 노드: Figma 모바일 프레임에서 찾지 못함. 모바일 라벨 글자(코드 16 Regular)·toggle 글자(코드 10 Regular) 미확인
- detail 크기·여백
  - Figma 5799:10200: 800×300 고정, 안쪽 글자 330px로 넘침, 안쪽 프레임 padding 왼쪽 16만 있음
  - 명세: 내용 높이, padding `spacing.5` (20px). 디자이너 확인 필요
- detail 내용: Figma 카드 글자는 모집 안내 문구 반복(자리 채움 문구로 보임). 코드는 수집 항목 표 + 안내 문단. 표 스타일은 이 명세 범위 밖
- toggle 문구: Figma "전문 닫기", 코드 "접기". 명세는 Figma "전문 닫기"를 따름
