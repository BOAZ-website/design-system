---
id: radio
name_ko: 라디오
ticket: COMPONENT-05
tier: P0
status: review
figma:
  - "5188:409"
  - "2007:3436"
  - "2007:3437"
  - "2391:5869"
  - "2391:5870"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 라디오 (radio)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 보기 여러 개 중 하나만 고르는 입력. 원형 16px + 라벨 한 줄
- 구성: 라디오 한 개(radio)와 라디오 묶음(radio-group). 묶음 규칙은 3절 "Group" 표
- 사용 화면: 지원서 작성(지원 부문, 병역 이수 여부, 대학원 진학 여부, 표형 질문의 기술 경험 수준)
- 관련 명세: `components/checkbox.md`(여러 개 선택, COMPONENT-04), `components/text-field.md`(필수 항목 누락 메시지, COMPONENT-02), `components/selection-card.md`(부문 선택 카드, 라디오 그룹 의미, COMPONENT-15), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<label>`. 원과 라벨을 감싸 라벨 클릭으로도 선택됨. 가로 배치, gap 16px | `spacing.4` (16px) |
| input | ○ | 네이티브 `<input type="radio">`. 화면에서 숨기되 포커스는 받음(시각적 숨김, `display:none` 금지) | — |
| circle | ○ | 16×16 원. 테두리 1px. selected에서 안쪽 점 표시 | `radius.full` (40px), `color.stroke.neutral` (#999999), `color.stroke.brand` (#7A64F9) |
| dot | ○ | circle 안 8×8 점. selected에서만 보임. circle 테두리와 점 사이 3px | `color.bg.brand-solid` (#7A64F9) |
| label | × | 보기 글자 한 줄. label-hidden variant에서만 생략하고 `aria-label`로 이름을 줌 | `typography.body-4` / 모바일 `typography.body-4-mobile` |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | 원 + 라벨. 지원서 모든 단일 선택 질문 | Figma 2007:3436, Figma 2007:3437, Figma 5188:409 |
| label-hidden | 원만 보임. 표 형태 질문의 셀처럼 열 머리글이 라벨 역할을 할 때 | Figma 8812:5750 |

- Figma `Radio Button` 세트(5188:409, 인터랙션 정의)와 지원폼 라디오(2007:3436·3437, 화면 사용)는 같은 모양임. 세트는 Default·Hover·Selected 3종, 지원폼은 Default·Selected 2종
- 2391:5869·5870(24 Bold 라벨)은 라디오가 아니라 표형 질문의 행 이름임. 묶음의 제목이므로 아래 Group 표에 적음

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| circle | 16×16, 테두리 1px | 16×16, 테두리 1px | `radius.full` (40px) | `raw:3px`(selected 테두리 안쪽 → 점) | — | Figma 5188:424, Figma 2007:3436 |
| dot | `raw:8px` × `raw:8px` | 같음 | `radius.full` (40px) | — | — | Figma 5188:425 |
| root(한 행) | 높이 21, gap `spacing.4` (16px) | 높이 18, gap `spacing.4` (16px) | — | 0 | `typography.body-4` (18/400, 행 21) / 모바일 `typography.body-4-mobile` (15/400, 행 18) | Figma 2391:5944, Figma 6454:8279 |

- 원은 라벨 첫 줄 세로 가운데에 맞춤(데스크톱 위 3px, Figma 5188:406)
- 라벨 폭은 내용만큼(`width: fit-content`). Figma 라벨 상자 253px는 고정 폭이 아님
- 라벨이 줄바꿈되면 원은 첫 줄에 맞추고 위로 정렬함(Figma 없음(추정))

### Group

radio-group은 같은 질문에 속한 라디오 묶음임. 질문 제목이 묶음의 이름(legend)이 됨.

| 항목 | 데스크톱 | 모바일 | 근거 |
| --- | --- | --- | --- |
| 배치 | 세로 목록 | 세로 목록 | Figma 2391:5943, Figma 6454:8278 |
| 보기 사이 세로 간격 | `spacing.5` (20px) | `spacing.5` (20px) | Figma 2391:5943, Figma 6454:8278, Figma 8103:16395 |
| 질문 제목 글자 | `typography.headline-2` (30/700) `color.fg.default` (#FFFFFF) | `typography.body-3` (18/700) | Figma 2009:4225, Figma 8103:16394 |
| 질문 제목 → 첫 보기 | `spacing.12` (48px) | `spacing.5` (20px) | Figma 5980:10947, Figma 8103:16393 |
| 필수 표시 | 표시 기호 없음. 지원서 질문은 모두 필수이며 누락은 제출 시 메시지로 알림 | 같음 | Figma 2009:4228, Figma 없음(추정) |
| 누락 메시지 | 목록 아래. 글자·색은 text-field 명세의 필수 항목 누락 상태를 따름 | 같음 | 코드 `src/widgets/apply/ui/personal-info-section.tsx` |
| 표형 질문 행 이름 | `typography.headline-3` (24/700) `color.fg.brand` (#7A64F9) | `raw:16px Medium`(16/500) `color.fg.brand` (#7A64F9) | Figma 2391:5870, Figma 6454:8277 |
| 행 이름 상자 | 위아래 `raw:10px` 패딩, 아래 보기 목록과 `raw:10px` 간격 | 같음 | Figma 1672:4427, Figma 1672:4430 |
| 표형 질문 보기 목록 들여쓰기 | 좌우 `spacing.5` (20px) | 왼쪽 `raw:5px`, 오른쪽 `spacing.5` (20px) | Figma 1672:4419, Figma 6454:8278 |

- 표형 질문(예: "데이터 베이스(관계형 DB, NoSQL 등)" 행마다 경험 수준 4개 중 하나 선택)은 행 하나가 radio-group 하나임. 행 이름이 그 묶음의 legend
- 행 이름 Figma 2종: 흰색(2391:5869, 사용처 0곳)과 보라(2391:5870, 사용처 26곳). 명세는 보라 하나만 씀. 흰색의 의미는 11절

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 circle `stroke / dot / label` 토큰 순서임.
focus-visible 칸은 rest 색을 유지하고 circle에 outline을 더함.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.stroke.neutral` (#999999) / — / `color.fg.muted` (#999999) | `color.palette.gray.0` (#FFFFFF) / — / `color.fg.default` (#FFFFFF) | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5188:408, Figma 5188:410, Figma 2007:3437, Figma 없음(추정, press·focus-visible) |
| selected | `color.stroke.brand` (#7A64F9) / `color.bg.brand-solid` (#7A64F9) / `color.fg.default` (#FFFFFF) | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5188:427, Figma 2007:3436, Figma 없음(추정, hover·press·focus-visible) |
| disabled | 미선택: `color.palette.gray.600` (#666666) / — / `color.palette.gray.600` (#666666)<br>선택 값이 남은 경우: `color.palette.gray.600` (#666666) / `color.palette.gray.600` (#666666) / `color.palette.gray.600` (#666666) | — | — | — | Figma 없음(추정) |

- 라벨 색은 선택 여부를 함께 보여 줌: 미선택 회색, 선택 흰색(Figma 2007:3437 대 2007:3436)
- disabled: default 라벨이 이미 `color.fg.muted` (#999999)라 `color.fg.disabled` (#999999)로는 구분되지 않음. 한 단계 어두운 `color.palette.gray.600` (#666666)을 씀
  - disabled 행 둘째 줄은 비활성 묶음에 선택 값이 남아 있을 때의 표시임
- 포커스 트리거: 숨긴 input의 `:focus-visible`. 스타일은 형제 선택자로 circle에 그림(`input:focus-visible + circle`)
- 비동기 상태: 해당 없음. 선택은 즉시 화면 값만 바꾸고 서버 요청을 하지 않음(저장은 버튼이 담당)
- invalid 행은 두지 않음. 누락은 묶음 단위로 3절 Group의 누락 메시지로 보여 주고 원·라벨 색은 바꾸지 않음
- completed 행은 두지 않음. 선택 완료는 selected가 담당함

## 5. Behavior

- 클릭·탭
  - 원과 라벨 어느 쪽을 눌러도 선택됨(`<label>`이 감쌈)
  - 이미 선택된 보기를 다시 눌러도 해제되지 않음(네이티브 라디오 동작). "해당 없음"이 필요하면 보기로 추가함
  - 터치에서는 hover 색을 적용하지 않음(`@media (hover: hover)`에서만)
- 키보드(네이티브 라디오 동작을 그대로 씀)
  - Tab: 묶음에 한 번만 멈춤. 선택된 보기가 있으면 그 보기, 없으면 첫 보기
  - 방향키(↓·→ 다음, ↑·← 이전): 포커스 이동과 동시에 선택. 끝에서 처음으로 순환함
  - Space: 포커스된 보기가 선택되지 않았으면 선택함
- 포커스 이동·복귀: 선택 후 포커스를 그 보기에 유지함. 제출 시 누락이 있으면 첫 누락 묶음의 첫 보기로 포커스를 옮김(Figma 없음(추정))
- 비동기 중 동작: 해당 없음(4절)
- 같은 묶음은 모든 input에 같은 `name`을 줌. `name`이 다르면 방향키 이동과 한 개 선택이 깨짐

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| circle border-color | 0.2s | ease | 코드 `src/shared/components/radio-button/radio-button.css.ts` |
| dot transform(scale 0 → 1) | 0.2s | cubic-bezier(0.4,0,0.2,1) | design-reference 4.3 |
| label color | 0.2s | ease | Figma 없음(추정) |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): PATTERN-03-04 확정 전까지 전환을 제거함

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 라벨 글자: `typography.body-4-mobile` (15/400), 행 높이 18
  - circle·dot 크기, 원–라벨 gap, 보기 사이 간격은 그대로
  - 묶음 제목·행 이름·들여쓰기: 3절 Group 표 모바일 열
- Figma 모바일 노드
  - 표형 질문: Figma 6454:8278, Figma 6454:8358
  - 행 이름: Figma 6454:8277
  - 병역 이수 여부: Figma 8103:16395

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 보기마다 네이티브 `<input type="radio">`. 묶음은 `<fieldset>` + `<legend>`(질문 제목·행 이름)를 기본으로 함. 제목을 `<h2>`로 유지해야 하면 묶음 요소에 `role="radiogroup"` + `aria-labelledby`(제목 id) | Figma 없음(추정) |
| 키보드 | 묶음당 탭 정지 1곳. 방향키로 이동·선택하며 끝에서 순환. Space로 선택. 네이티브 라디오와 같은 `name`으로 얻음. 직접 `onKeyDown`을 만들지 않음 | Figma 없음(추정) |
| aria | 이름은 보이는 라벨. label-hidden은 `aria-label`(예: "Python 3점"). 필수 묶음은 input에 `required`(또는 radiogroup에 `aria-required="true"`). 누락 시 묶음에 `aria-invalid="true"`와 메시지 id를 `aria-describedby`로 연결 | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, UI 요소 3:1(배경 `color.bg.canvas` #000000)<br>라벨: 미선택 #999999 7.37, 선택·hover #FFFFFF 21.00<br>circle 테두리: default #999999 7.37, hover #FFFFFF 21.00, selected #7A64F9 5.02<br>행 이름 `color.fg.brand` #7A64F9 5.02(`color.bg.layer` #1A1A1A 위 4.16, 24 Bold 큰 글자라 통과)<br>disabled #666666 3.66, WCAG 1.4.3 비활성 예외 | python3 WCAG 상대 휘도 계산값 |
| 터치 영역 | 최소 24×24: 행 높이 21(모바일 18)로 단독은 미달이나 보기 사이 20px 간격으로 24px 원이 겹치지 않아 간격 예외로 통과. label-hidden 16×16은 셀 전체를 `<label>`로 감싸 24×24 이상 확보<br>모바일 권장 44×44: 미달. 행 위아래 `raw:10px` 패딩으로 누를 영역을 늘리고 같은 크기의 음수 margin으로 간격을 보정함 | WCAG 2.2 2.5.8 |
| 포커스 링 | 숨긴 input 대신 circle에 그림. `input:focus-visible + circle`에 outline 2px, offset 2px<br>검정 캔버스 위: `color.stroke.focus` (#68CBEC) 11.34:1<br>흰 표면 위: `color.stroke.focus-inverse` (#7A64F9) 4.18:1<br>전역 `outline: none`이 input에 걸려도 circle에 그리므로 영향 없음 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 네이티브 `disabled`(묶음 전체는 `<fieldset disabled>`). 사유를 묶음 아래 글자로 표시 | Figma 없음(추정) |

- COMPONENT-05-02 대응: 숨긴 input은 화면에 보이지 않아 자기 outline이 의미가 없음. focus-visible을 형제 circle에 옮겨 그려 키보드 위치를 보여 줌

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 묶음은 `<fieldset>` + `<legend>` 또는 `role="radiogroup"` + `aria-labelledby` | 제목과 보기를 의미 없는 `<div>`로만 묶음 |
| 같은 묶음 input에 같은 `name` | 보기마다 다른 `name`, 방향키를 직접 구현 |
| input은 시각적 숨김(clip) | `display:none`·`visibility:hidden`으로 숨겨 포커스·스크린리더에서 빠짐 |
| `input:focus-visible + circle`에 outline | 포커스 표시 없이 숨긴 input만 둠 |
| 여러 개 선택은 checkbox(COMPONENT-04) | 원형 라디오 모양에 `type="checkbox"`를 넣음 |
| 선택 해제가 필요하면 "해당 없음" 보기 추가 | 선택된 라디오를 다시 눌러 해제 |
| 미선택 라벨 `color.fg.muted`, 선택 라벨 `color.fg.default` | 선택 여부와 무관하게 라벨을 흰색으로 고정 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/radio-button/radio-button.tsx`, `src/shared/components/radio-button/radio-button.css.ts`, `src/shared/components/radio-button/radio-group.tsx`, `src/shared/components/radio-button/radio-group.css.ts` | `RadioButton`(label, value, name, checked, onChange, type)<br>`RadioGroup`(name, options, value, onChange, className)<br>사용처<br>- `src/widgets/apply/ui/personal-info-section.tsx`: 지원 부문·병역 이수 여부·대학원 진학 여부<br>- `src/widgets/apply/ui/table-question.tsx`: 표형 질문 행마다 `RadioGroup`, 다중 선택 표는 `RadioButton type="checkbox"`<br>묶음 간격은 호출부 css(`radioButton`: gap 20px, 모바일 16px, 위 8px)가 정함. `radio-group.css.ts`의 `container`(gap 20px)는 쓰이지 않음 |
| frontend 차이 | 위와 같음 | 수정 예정(ADOPT-03). 명세와 다른 점<br>- 묶음: `<div>`. `role="radiogroup"`·`<fieldset>` 없음, 제목 `<h2>`와 연결 없음<br>- 포커스: `:focus-visible` 없음, 전역 `outline: none`<br>- hover: 없음(명세 circle·라벨 흰색)<br>- 라벨 색: 항상 흰색(명세 미선택 `color.fg.muted`)<br>- 점 크기: 원의 62.5%(약 9px, 명세 `raw:8px`)<br>- 선택 해제: `RadioGroup`이 같은 값을 다시 받으면 null로 바꾸는 코드가 있음. 네이티브 라디오는 다시 눌러도 change가 일어나지 않아 실제로는 동작하지 않음. 명세는 해제 없음<br>- 모바일 보기 간격: 16px(명세 `spacing.5` 20px)<br>- 표형 행 이름 모바일: 18 Bold(Figma 16 Medium)<br>- 표형 다중 선택: 원형 모양에 `type="checkbox"`(명세는 checkbox 명세 사용)<br>- disabled: 없음 |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03, 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/radio-button/radio-button.tsx` | `RadioButton` ↔ radio default. `RadioButton label=""` ↔ label-hidden. `RadioGroup` ↔ radio-group. CSS `radioCircle` ↔ circle, `::after` ↔ dot, `hiddenInput` ↔ input, `labelText` ↔ label |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:3px` | selected circle 테두리 안쪽 → 점 | Figma 5188:424 | 불필요 |
| `raw:8px` | dot 지름 | Figma 5188:425 | 불필요 |
| 16px, 테두리 1px | circle 지름·테두리 | Figma 5188:406 | 불필요 |
| `raw:10px` | 표형 행 이름 상자 위아래 패딩·목록 간격, 모바일 터치 영역 확장 | Figma 1672:4427, Figma 1672:4430 | 불필요. spacing 8·12 사이 값 |
| `raw:5px` | 모바일 표형 보기 목록 왼쪽 들여쓰기 | Figma 6454:8278 | 불필요(모바일 1곳) |
| `raw:16px Medium`(16/500) | 모바일 표형 행 이름 | Figma 6454:8277 | 필요 여부 디자이너 확인(11절). 가까운 토큰 `typography.body-2-mobile`은 16/600 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease, 0.2s cubic-bezier(0.4,0,0.2,1) | circle 테두리·라벨 색, dot 확대 전환 | 코드 `src/shared/components/radio-button/radio-button.css.ts`, design-reference 4.3 | 불필요 |

## 11. 미확인

- 행 이름 흰색(Figma 2391:5869): 사용처 0곳. "아직 답하지 않은 행"을 뜻하는지 디자이너 확인 필요. 명세는 보라(2391:5870)만 씀
- 모바일 표형 행 이름: Figma 16 Medium(토큰 없음), 코드 18 Bold. 어느 쪽을 쓸지 디자이너 확인 필요(Figma 6454:8277)
- 모바일 묶음 제목: Figma 18 Bold(Figma 8103:16394), 코드 24 Bold. 명세는 Figma 값 `typography.body-3`으로 적음
- 모바일 질문 제목 → 첫 보기 20px: Figma 8103:16393이 자동 배치가 아닌 그룹이라 좌표로 잰 값
- selected의 hover·press, default의 press, 모든 focus-visible: Figma에 없음(추정)
- disabled: Figma에 없음. `color.palette.gray.600` (#666666) 추정값
- 필수 표시 기호: Figma 질문 컴포넌트(2009:4228)에 없음. 선택 질문이 생기면 표시 규칙을 다시 정해야 함
- 면접 시간 선택 표(Figma 8812:5792, 수정사항 페이지. 원만 있는 라디오 인스턴스는 그 안의 8812:5750): 라디오를 가로 격자로 배치하고 원만 둔 칸이 있음. 확정 화면인지 확인 필요. label-hidden variant의 근거로만 씀
- 모바일 터치 영역 44×44: Figma 간격(20px)으로는 미달. 패딩 확장 방식은 추정
