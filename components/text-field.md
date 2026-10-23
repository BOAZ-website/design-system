---
id: text-field
name_ko: 텍스트 필드
ticket: COMPONENT-02
tier: P0
status: review
figma:
  - "5152:8908"
  - "5239:3993"
  - "7578:14642"
  - "1981:4329"
  - "2009:3439"
  - "2009:3441"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-23
---

# 텍스트 필드 (text-field)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 지원서의 글자 입력. 바탕 없이 아래쪽 1px 보더만 있는 입력 필드
- 구성: variant 3종(single-line·paragraph·dropdown-trigger), 폭 3단계(full·half·third)
- 라벨 방식: 빈 필드에서는 라벨이 입력 자리(placeholder 위치)에 18px로 보임. focus 또는 값 입력 후 라벨이 위로 올라가 14px로 줄어듦(5절)
- 사용 화면: 지원서 작성(개인정보·연락처·학력사항 단계, 질문 단계 문단형 답변)
- 관련 명세
  - `components/select.md`(COMPONENT-03): 드롭다운 결합형의 펼친 목록·옵션·키보드
  - `components/button.md`(COMPONENT-01): 지원서 이전·다음 버튼
  - `patterns/form.md`(PATTERN-02): 제출 시 검증 시점·첫 오류로 포커스 이동
  - `components/form-add-button.md`(COMPONENT-16): 항목 추가 필드(Figma 5188:454)
- 경계: 드롭다운 결합형(Figma TextField_*_Dropdown)은 이 명세가 필드 본체(트리거)의 모양·상태·라벨만 정의함. 펼친 목록(Figma 252×245 옵션 5개)·옵션 상태·열고 닫는 키보드 동작은 COMPONENT-03에서 정의함

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | 필드 묶음. field·message·counter를 세로로 쌓음. 간격 single-line 12px, paragraph 8px(코드) | `spacing.3` (12px), `spacing.2` (8px) |
| field | ○ | 입력 영역. 바탕 없음, 아래쪽 보더 1px. 높이 고정(3절) | `color.stroke.neutral` (#999999), 상태별 색은 4절 |
| label | ○ | `<label>` 요소. 빈 필드에서는 입력 자리에 보이고 focus·값 입력 후 위로 축소됨. placeholder 속성으로 대신하지 않음 | `typography.body-4` → `typography.text-1`, 모바일 `typography.body-4` → `typography.text-1-mobile` |
| input | ○ | 한 줄은 `<input>`, 문단형은 `<textarea>`, 드롭다운 결합형은 트리거 요소(COMPONENT-03). label 아래 8px. 글자색 `color.palette.gray.100` (#E6E6E6) | `typography.body-4`(모바일 같음, 행간 `raw:1.0`) |
| message | × | 오류 문구 줄. 경고 아이콘 16px + 문구, 간격 `raw:5px`, 줄 높이 24px | `color.fg.critical` (#F96466), `raw:14px/400` |
| counter | × | 문단형 전용 글자 수 "현재/최대". 오른쪽 정렬, message와 같은 줄 | `raw:14px/400`, 색은 4절 |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| single-line | 이름·이메일·전화번호·학교명 등 한 줄 입력 | Figma 5152:8985, Figma 5946:10317, Figma 2007:3422, Figma 2007:3423 |
| paragraph | 질문 답변 등 여러 줄 입력. counter 포함, 입력에 따라 높이가 늘어남 | Figma 2009:3439, Figma 2009:3440, Figma 2009:3441 |
| dropdown-trigger | 생년월일·학년·졸업 시점 등 목록 선택. 필드 본체는 single-line과 같은 모양, 펼친 목록은 COMPONENT-03 | Figma 5395:3803, Figma 5393:950, Figma 5395:3848, Figma 5395:647 |

- 드롭다운 결합형 필드에 펼침 표시 아이콘(화살표) 없음. Figma 드롭다운 세트 9개(5395:3803·5395:3848·5393:950·5395:647·7604:13526·7885:15299·7885:15332·7885:15367 등)와 최신 지원 폼 화면 4곳(8801:6109·8801:6110·8801:6115·8801:6116) 모두 아이콘 없음. 열림은 `aria-expanded`와 목록 표시로 전달함(COMPONENT-03). 라이브 코드(`src/shared/components/dropdown/dropdown.tsx`)에도 없음(2026-10-22 값 규칙)
- 폼 항목 추가 필드(Figma 5188:454, 2009:4216)는 COMPONENT-16에서 정의함

### Sizes

- size 이름은 이 명세가 붙인 이름임. 지원 폼 그리드의 열 비율(Figma 이름 "(1/2)", "(1/3)")을 따름
- 폭은 그리드 열에 맞춰 `width: 100%`로 늘어나고 표의 값은 Figma 기준 폭임

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| full | 800×60 | 342×56 | — | 0 | label `typography.body-4` → `typography.text-1`, input `typography.body-4` / 모바일 label `typography.body-4` → `typography.text-1-mobile`, input `typography.body-4` | Figma 5152:8979, Figma 7578:14644, Figma 7578:14655, 코드 `src/shared/components/textfield/textfield.css.ts`(글자) |
| half | 390×60 | 164×56 | — | 0 | full과 같음 | Figma 5338:8777, Figma 7578:14665, Figma 7578:14679 |
| third | 252×60 | 108×56 | — | 0 | full과 같음 | Figma 5338:8760, Figma 7578:14672, Figma 7578:14686 |
| paragraph(full) | 800×입력 높이(입력에 따라 늘어남) | 342×입력 높이 | — | `raw:10px` / 0 | input `typography.body-4`(행간 `raw:1.0`), counter `raw:14px/400`(모바일 같음) | 코드 `src/shared/components/textfield-with-counter/textfield-with-counter.tsx`, Figma 2009:3439(padding) |
| dropdown-trigger half | 390×60 | 164×60 | — | 0 | single-line과 같음 | Figma 5395:3804, Figma 7885:15332 |
| dropdown-trigger third | 252×60 | 108×60 | — | 0 | single-line과 같음 | Figma 5946:10452, Figma 7885:15300 |

- 값 기준(2026-10-22 라이브 기준으로 정정): 지원서 화면은 모집 기간이 아니라 라이브에서 볼 수 없어 frontend 코드 값을 라이브 값으로 씀(글자 크기·굵기·행간, 글자색, completed 색, field–message 간격, counter 형식). 코드에 없는 값(field 높이·폭, label 요소와 축소 동작, hover, 문단 padding, 전환)은 Figma 값
- 높이: field 높이를 표의 값으로 고정함(문단형 제외). message 줄(24px)은 field 아래에 더해짐(Figma 2007:3426 전체 92 = 60 + 8 + 24. 명세 간격은 single-line 12)
- field–message 간격: single-line `spacing.3` (12px)(코드 `src/widgets/apply/ui/personal-info-section.css.ts` `groupContainer`), paragraph `spacing.2` (8px)(코드 `src/shared/components/textfield-with-counter/textfield-with-counter.css.ts`)
- label·input 간격: Figma 10px. `docs/wbs/20-token.md` 실측 → 단계 표(텍스트 필드 gap 10 → `spacing.2`)에 따라 `spacing.2` (8px)로 맞춤
- 빈 필드 label 세로 위치: field 안 세로 가운데. 축소된 label: field 위쪽 끝(y=0), input은 그 아래
- 좌우 padding 0: 텍스트가 보더 왼쪽 끝에서 시작함. invalid 바탕이 있어도 같음(Figma 2007:3426 왼쪽 0)
- 문단형 padding 순서: 세로 / 가로. 행간 `raw:1.0`(코드)이라 줄 높이 18. 이전 명세의 `typography.body-4-paragraph`(행간 30px)는 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)
- 모바일 폭은 342·164·108 세 가지임. 모바일 세트 중 이름만 252인 7578:14671·7578:14685·7885:15299·7885:15367은 실제 폭 108임(Figma 확인)
- 모바일 dropdown-trigger만 높이 60(single-line 모바일은 56). 글자는 빈 값·값 모두 `typography.body-4` (18/400)(코드 `src/shared/components/dropdown/dropdown.css.ts`), 값 있음 축소 label `typography.text-1-mobile` (12/300)(Figma 7885:15299). Figma 모바일 15/400은 기록용(2026-10-22 라이브 기준으로 정정)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임. fg는 label·input 글자색이며 다를 때 "label, input" 순서로 적음.
rest는 상호작용이 없을 때의 모습임. 텍스트 필드의 focus-visible 칸은 키보드·포인터 구분 없이 입력에 포커스가 있을 때(`:focus-within`)의 모습임.

### single-line·dropdown-trigger

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(빈 값) | — / label `color.fg.muted` (#999999), 입력 자리 18px / `color.stroke.neutral` (#999999) | — / label `color.fg.default` (#FFFFFF) / `color.palette.gray.0` (#FFFFFF) | — | — / label `color.fg.brand` (#7A64F9), 위로 축소 14px / `color.stroke.brand` (#7A64F9) | Figma 5152:8979, Figma 5152:8986, Figma 5239:3993 |
| completed(값 있음) | — / label `color.fg.default` (#FFFFFF) 14px, input `color.palette.gray.100` (#E6E6E6) / `color.stroke.brand` (#7A64F9) | rest 유지 | — | — / label `color.fg.brand` (#7A64F9), input `color.palette.gray.100` (#E6E6E6) / `color.stroke.brand` (#7A64F9) | 코드 `src/shared/components/textfield/textfield.css.ts`(input·보더), Figma 5946:10316(label, 라이브 없음), Figma 5946:10318 |
| invalid · 빈 값(필수 항목 누락) | `color.palette.red.900` (#190A0A) / label `color.fg.critical` (#F96466), 입력 자리 18px / `color.stroke.critical` (#F96466) | rest 유지 | — | rest 바탕·보더 유지 / label `color.fg.critical` (#F96466), 위로 축소 14px | Figma 2007:3426, 코드 `src/shared/components/textfield/textfield.css.ts`(focus-visible 보더 빨강 유지), Figma 없음(추정, hover·focus-visible label) |
| invalid · 값 있음(입력 에러) | `color.palette.red.900` (#190A0A) / label `color.fg.critical` (#F96466), input `color.palette.gray.100` (#E6E6E6) / `color.stroke.critical` (#F96466) | rest 유지 | — | rest 유지 | 코드 `src/shared/components/textfield/textfield.css.ts`(바탕·input·보더), Figma 2007:3425(label, 라이브 없음), 코드 `src/shared/components/textfield/textfield.css.ts`(focus-visible 보더 빨강 유지), Figma 없음(추정, hover) |

### paragraph

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(빈 값) | — / label `color.fg.muted` (#999999), counter `color.fg.muted` (#999999) / `color.stroke.neutral` (#999999) | — / label `color.fg.default` (#FFFFFF) / `color.palette.gray.0` (#FFFFFF) | — | — / counter `color.fg.brand` (#7A64F9) / `color.stroke.brand` (#7A64F9) | Figma 2009:3439, Figma 없음(추정, hover·focus-visible) |
| completed(값 있음) | — / input `color.palette.gray.100` (#E6E6E6), counter `color.fg.brand` (#7A64F9) / `color.stroke.brand` (#7A64F9) | rest 유지 | — | rest 유지 | 코드 `src/shared/components/textfield/textfield.css.ts`, 코드 `src/shared/components/textfield/text-counter.css.ts` |
| invalid(글자 수 초과) | `color.palette.red.900` (#190A0A) / input `color.palette.gray.100` (#E6E6E6), counter `color.fg.critical` (#F96466) / `color.stroke.critical` (#F96466) | rest 유지 | — | rest 유지 | 코드 `src/shared/components/textfield/textfield.css.ts`, 코드 `src/shared/components/textfield/text-counter.css.ts` |

- invalid 진입 조건
  - 필수 항목 누락: 제출(다음 페이지) 시 빈 필수 필드. message "필수 입력 항목입니다."
  - 입력 에러: 형식 검사 실패(이메일·전화번호). 검사 시점은 blur 후 또는 제출 시(PATTERN-02). message는 원인을 적음(예: "이메일 형식이 올바르지 않습니다.")
  - 글자 수 초과: 문단형에서 값 길이 > 최대. message "글자 수 제한을 초과했습니다", counter 예 "501/500"
- invalid에서 값을 고쳐 조건이 풀리면 즉시 default·completed로 돌아감
- invalid에 포커스가 들어와도 바탕·보더·label 빨강을 유지함. 라이브 코드가 error 상태의 `:focus` 보더를 빨강으로 둠(코드 `src/shared/components/textfield/textfield.css.ts`)
- 값 있음(completed) rest 보더: 라이브(코드) 보라 `color.stroke.brand` (#7A64F9). Figma Filled 세트 Default(5946:10316)의 흰 보더에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정). 코드에 label이 없어 label 색(흰색 14px)은 Figma 값
- 입력 글자색: 라이브(코드) 한 줄·문단 모두 `color.palette.gray.100` (#E6E6E6), invalid에서도 바뀌지 않음. Figma 한 줄 #FFFFFF·입력 에러 빨강에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)
- 값 있음·invalid의 hover 없음(rest 유지). Filled 세트 10개 모두 Hover 변형이 없고 reactions가 클릭(ON_CLICK) → Focus뿐임. 빈 값(Empty) 세트만 hover(ON_HOVER)가 있음. 입력 에러 2007:3425도 변형 없음
- 문단형 completed rest: 라이브(코드) 보라 보더·보라 counter(Figma 2009:3440과 같음)(2026-10-22 라이브 기준으로 정정)
- completed와 focus의 보더 색이 같음. focus는 label 색(`color.fg.brand`)으로 구분됨
- 문단형 label: Figma 문단형은 질문 제목이 필드 밖에 있어 필드 안 label이 placeholder 문구로만 쓰임(2009:3439 "Placeholder"). 축소 이동은 하지 않음. 접근 이름은 질문 제목 `<label>`로 줌(7절)
- 포커스 트리거: `:focus-within`(root 기준). 텍스트 입력은 포인터 클릭에도 키보드 입력이 필요하므로 `:focus-visible`과 구분하지 않음
- 포커스 표시: outline을 그리지 않고 아래쪽 보더 `color.stroke.brand` (#7A64F9) + label 색·위치 변화로 표시함. 드롭다운 결합형 트리거도 같음
- 비동기 상태(pending·loading): 해당 없음. 입력 필드는 요청을 일으키지 않음. 제출 중 표시는 버튼(COMPONENT-01)이 담당
- disabled 행을 두지 않음: Figma 텍스트 필드 세트 전부와 최신 지원 폼 화면(8801:6062)에 비활성 입력이 없음(확인됨). frontend에도 없고 지원서에 사용처가 없음. 필요해지면 그때 정의함
- selected 행을 두지 않음: 선택 상태는 드롭다운 옵션(COMPONENT-03)의 상태임. 값이 선택된 트리거는 completed 행을 씀
- press 열은 `—`: 입력 필드에 누름 상태가 없음

## 5. Behavior

- 요소 선택
  - single-line: `<input>`. `type`은 값에 맞춤(`email`, `tel`, `text`). Enter로 줄바꿈되지 않음
  - paragraph: `<textarea>`. 입력에 따라 높이가 늘어남(스크롤바 없음)
  - dropdown-trigger: COMPONENT-03의 트리거 요소. 이 명세는 모양·상태만 정함
- 라벨 축소(플로팅 라벨)
  - 조건: 빈 값이고 포커스 없음 → 입력 자리(세로 가운데, `typography.body-4`)
  - 조건: 포커스 있음 또는 값 있음 → field 위쪽 끝으로 이동, `typography.text-1`(모바일 `typography.text-1-mobile`)로 축소
  - 구현: `<label>`을 field 안에 겹쳐 두고 `:focus-within` 또는 값 있음(`:not(:placeholder-shown)`, placeholder 속성은 공백 한 칸)으로 위치·크기를 바꿈
  - 예시 값("01012345678" 등)이 필요하면 label 대신 쓰지 않고 축소된 뒤 입력 자리에 placeholder로 보이게 함(Figma 없음(추정))
- 클릭·탭: field 어디를 눌러도 input에 포커스가 감(label 클릭 포함)
- 키보드
  - Tab으로 필드 간 이동
  - single-line에서 Enter는 폼 제출을 일으키지 않음(지원서는 단계 버튼으로만 이동)
  - paragraph에서 Enter는 줄바꿈
- 포커스 이동·복귀: 제출 시 invalid가 있으면 첫 invalid 필드로 포커스 이동(PATTERN-02)
- 글자 수 제한(paragraph)
  - 최대를 넘어서도 입력을 막지 않음(`maxlength` 속성을 쓰지 않음). 초과 상태를 보여 주고 제출만 막음
  - counter 형식: "현재/최대"(라이브 코드 "8/500"). Figma "0 / 500자"(2009:3439)에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)
- 비동기 중 동작(중복 제출 방지, `aria-busy`): 해당 없음. 입력 필드는 요청을 보내지 않음

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| label transform·font-size·color(축소 이동) | 0.15s | ease-out | Figma 5152:8986, Figma 5239:3993(라이브 없음) |
| border-color, color, background-color | 0.15s | ease-out | Figma 5946:10316(라이브 없음) |

- Figma 프로토타입: 빈 필드 Default→Focus는 크기·위치 보간(Smart Animate) 0.15s ease-out, 값 있는 필드는 디졸브 0.15s ease-out. hover는 전환 없음
- 버튼의 0.2s ease-in-out(design-reference 4.3)과 다름. 10절 참조
- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 높이: 60 → 56(dropdown-trigger는 60 유지)
  - 폭: full 342, half 164, third 108
  - 글자: 입력 자리 label·input은 데스크톱과 같은 `typography.body-4` (18/400)(코드에 모바일 글자 변경 없음, 2026-10-22 라이브 기준으로 정정). 축소 label `typography.text-1-mobile` (12/300)(Figma, 코드에 label 없음)
  - hover: 적용하지 않음(터치)
  - message·counter: 데스크톱과 같은 `raw:14px/400`(코드)
  - invalid 바탕·보더·글자색: 데스크톱과 같음(코드 `src/shared/components/textfield/textfield.css.ts`에 모바일 변경 없음. Figma 모바일 invalid·message 노드 없음)
- Figma 모바일 노드
  - 프레임: Figma 7578:14642
  - full 342×56: Figma 7578:14643(빈 값), Figma 7578:14654(값 있음)
  - half 164×56: Figma 7578:14664, Figma 7578:14678
  - third 108×56: Figma 7578:14671, Figma 7578:14685
  - dropdown-trigger 164×60·108×60: Figma 7604:13526, Figma 7885:15299, Figma 7885:15332, Figma 7885:15367

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 네이티브 `<input>`·`<textarea>`. 접근 이름은 `<label for>`(문단형은 질문 제목 `<label>`). placeholder만으로 이름을 주지 않음 | Figma 없음(추정) |
| 키보드 | Tab 이동, 문단형 Enter 줄바꿈. 드롭다운 결합형 키보드는 COMPONENT-03 | Figma 없음(추정) |
| aria | invalid일 때 `aria-invalid="true"`. message·counter의 id를 `aria-describedby`로 연결. 필수는 `required`(또는 `aria-required="true"`). message 영역은 `aria-live="polite"`로 두어 나타날 때 읽힘. counter는 실시간 낭독하지 않음(초과 시 message로 알림). 경고 아이콘은 `aria-hidden="true"` | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, UI 요소 3:1<br>빈 값 label·보더 #999999 / #000000: 7.37<br>hover·값 있음 label #FFFFFF / #000000: 21.00<br>입력 글자 #E6E6E6 / #000000: 16.83, invalid 바탕 #190A0A 위 15.45<br>focus·completed 보더, focus label·counter #7A64F9 / #000000: 5.02(14px 포함 통과)<br>invalid label·message·보더 #F96466 / #190A0A: 6.47, 보더 / #000000: 7.04<br>focus 보더 대 빈 값 보더 색 차이 1.47:1로 작음. 라벨 위치·크기 변화가 함께 일어나 포커스가 구분됨 | `docs/wbs/20-token.md` 대비표, 계산값 |
| 터치 영역 | 최소 24×24: 통과(높이 56~60, 폭 108 이상)<br>모바일 권장 44×44: 통과 | WCAG 2.2 2.5.8 |
| 포커스 링 | outline 대신 아래쪽 보더 `color.stroke.brand` (#7A64F9) 1px + label 이동. 1px 유지(2026-10-23 결정. 보더 대 검정 5.02와 label 이동으로 SC 2.4.7·1.4.11 충족, 2px는 AA 범위 밖. `patterns/accessibility.md` 2.2 알려진 미달). 드롭다운 결합형도 같음. 흰 표면 위 필드는 없음 | Figma 5239:3993 |
| 비활성 표시 | 해당 없음(4절, disabled 행 없음) | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| `<label>`로 이름을 주고 빈 필드에서 입력 자리에 보이게 함 | placeholder 속성만으로 항목 이름 표시(입력하면 사라짐) |
| 한 줄 입력은 `<input>`, 문단은 `<textarea>` | 한 줄 입력에 `<textarea>` + Enter 차단 |
| invalid에 `aria-invalid`, message를 `aria-describedby`로 연결 | 빨간 색만으로 오류 표시 |
| 오류 문구는 원인을 적음("이메일 형식이 올바르지 않습니다.") | 모든 오류에 같은 문구 |
| 글자 수 초과 시 입력은 허용하고 초과 상태·제출 차단으로 알림 | `maxlength`로 입력을 잘라 사용자가 초과 사실을 모름 |
| 드롭다운 결합형의 목록·옵션은 COMPONENT-03을 따름 | 이 명세의 값으로 펼친 목록을 만듦 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/textfield/textfield.tsx`, `src/shared/components/textfield/textfield.css.ts` | single-line 대응. `isError` → invalid, `isCompleted` → completed<br>사용처: `src/widgets/apply/ui/personal-info-section.tsx`(이름·이메일·전화번호·학교명·학과) |
| frontend | `src/shared/components/textfield-with-counter/textfield-with-counter.tsx`, `src/shared/components/textfield/text-counter.tsx`, `src/shared/components/textfield/text-counter.css.ts` | paragraph·counter 대응. 사용처: `src/widgets/apply/ui/question-section/question-section.tsx` |
| frontend | `src/shared/components/dropdown/dropdownField.tsx` | dropdown-trigger 대응. 값·목록은 COMPONENT-03 |
| frontend 차이 | 위와 같음 | ADOPT-03-10에서 고침. 명세와 다른 점(라이브 값을 명세로 채택한 completed 색·글자·행간·간격·counter 형식·모바일 글자 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- 한 줄 입력도 `<textarea>` + Enter 차단(`preventEnter`)<br>- 라벨 요소 없음, placeholder 속성만 사용(라벨 축소 동작 없음)<br>- hover 없음(명세는 Figma hover)<br>- invalid 바탕: `color-mix(red_100 10%, transparent)`. 검정 위에서 #190A0A와 같으나 토큰 아님<br>- 문단 상하 패딩 없음(명세 Figma `raw:10px`)<br>- counter `:focus` 지정은 span이라 동작하지 않음(명세 focus counter `color.fg.brand`)<br>- `aria-invalid`·`aria-describedby` 없음. 오류 문구는 화면 파일의 `FieldError`가 그림<br>- 전환 없음(명세는 Figma 0.15s) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트·날짜 입력), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | 위 파일 | `TextField` ↔ single-line. `TextFieldWithCounter` ↔ paragraph. `TextCounter` ↔ counter 슬롯. `DropdownField` ↔ dropdown-trigger. `isError` ↔ invalid. `isCompleted` ↔ completed. size는 코드에 없음(부모 레이아웃의 `width: 100%`·`flex: 1`로 정함) |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:10px` | 문단형 field 상하 패딩 | Figma 2009:3439 | 불필요. spacing 8·12 사이 값 |
| 10px(명세 `spacing.2` 8px) | label·input 간격 | Figma 5946:10316, Figma 7578:14679 | 불필요(`docs/wbs/20-token.md` 실측 → 단계 표) |
| 60px, 56px | field 높이(데스크톱, 모바일) | Figma 5152:8979, Figma 7578:14644 | 불필요 |
| 1px | 아래쪽 보더 굵기 | Figma 5152:8979 | 불필요 |
| 24px | message 줄 높이 | Figma 2007:3426 | 불필요 |
| 16px | 경고 아이콘 크기 | Figma 2007:3426 | 불필요 |
| `raw:14px/400` | message·counter 글자(데스크톱·모바일). `typography.text-1`은 14/300. Figma counter는 14 ExtraLight(200) | 코드 `src/shared/components/textfield/text-counter.css.ts`, 코드 `src/widgets/apply/ui/personal-info-section.css.ts` | 필요 여부 별도 이슈 |
| `raw:5px` | 경고 아이콘–문구 간격 | 코드 `src/widgets/apply/ui/personal-info-section.css.ts` | 불필요 |
| `raw:1.0` | input 행간(글자 크기와 같음). `typography.body-4` 행간과 다름 | 코드 `src/shared/styles/font.css.ts` | 필요 여부 별도 이슈(`components/button.md` 10절과 함께) |
| 0.15s ease-out | label 축소·색 전환 | Figma 5152:8986, Figma 5946:10316 | 불필요. 모션 토큰 도입 시 함께 판단 |
| 빈 24×24 인스턴스(error_outline) | message 줄 문구 뒤 | Figma 2007:3426 | 불필요(내용이 없는 자리 표시, 구현하지 않음) |

## 11. 미확인

- 해당 없음.
