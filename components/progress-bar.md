---
id: progress-bar
name_ko: 진행 표시줄
ticket: COMPONENT-14
tier: P1
status: review
figma:
  - "2009:3442"
  - "4852:9891"
  - "2158:4498"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 진행 표시줄 (progress-bar)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 지원서 작성 중 지금 몇 번째 단계인지 보여 주는 표시 요소. 누를 수 없음
- 구성: 단계 수만큼 같은 폭의 막대(segment)를 가로로 나열하고 현재 단계 막대만 채움
- 사용 화면: 지원서 작성(약관 동의 다음 단계부터)
- 관련 명세: `components/button.md`(이전·다음 text-link, 제출 brand-wide), `components/text-field.md`(같은 800 폭 폼), `patterns/form.md`(단계 진행, PATTERN-02-03), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<div role="progressbar">`. 막대를 가로로 나열 | 3절 |
| segment | ○ | 단계 하나를 뜻하는 막대. `<span aria-hidden="true">`. 1px 테두리, 끝이 둥근 모양 | `color.stroke.weak` (#333333), `radius.md` (20px) |
| segment(현재) | ○ | 현재 단계 막대. 바탕을 채움 | `color.palette.gray.100` (#E6E6E6) |

- segment 개수 = 단계 수(N). Figma는 3단계, frontend 지원서는 4단계(지원자 정보 입력·공통 질문·부문 질문·추가 정보)
- 단계 이름 글자는 이 컴포넌트에 없음. 단계 이름은 바로 아래 페이지 제목(`<h1>`)이 보여 줌

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | 지원서 단계 표시. variant 하나뿐임 | Figma 2009:3442 |

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| root | 800×10 | 폼 폭 100%×10 | — | 0, segment gap `raw:22px` | — | Figma 2009:3442, Figma 없음(추정, 모바일) |
| segment | (800 − 22×(N−1)) / N × 10. 3단계 252×10, 4단계 183.5×10 | 같은 식(root 폭 기준) | `radius.md` (20px) | — | — | Figma 1821:3852 |

- 폭: segment는 `flex: 1`로 같은 폭을 나눔. 단계 수가 바뀌어도 root 800은 유지함
- 높이 10px 고정. 10px 높이에 `radius.md` (20px)를 주면 양 끝이 반원이 됨
- 3단계일 때 segment 252는 폼 폭 규칙 1/3(800·390·252, PATTERN-02-03)과 같음

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임. 상태는 segment 단위임.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | 투명 / — / `color.stroke.weak` (#333333) 1px | — | — | — | Figma 1821:3853 |
| selected | `color.palette.gray.100` (#E6E6E6) / — / `color.stroke.weak` (#333333) 1px | — | — | — | Figma 4852:9891 |
| completed | default와 같음(투명 / — / `color.stroke.weak` (#333333) 1px) | — | — | — | 코드 `src/shared/components/progress-bar/progress-bar.css.ts`, Figma 없음(추정) |

- selected: 현재 단계. Figma 화면 인스턴스(4852:9891)는 첫 단계 막대를 채움
- completed: 지난 단계. Figma 시안은 모두 1단계 화면이라 지난 단계 모습이 없음. 코드와 같이 채우지 않음. 11절 참조
- hover·press·focus-visible 열이 모두 `—`: 누를 수 없고 Tab 대상이 아님
- 포커스 트리거: 해당 없음
- disabled·invalid 행 없음: 입력이 아니라 표시만 하기 때문임
- 비동기 상태(pending·loading): 해당 없음

## 5. Behavior

- 클릭·탭: 해당 없음. 막대를 눌러 단계로 이동하지 않음. 단계 이동은 이전·다음 버튼(`components/button.md` text-link·brand-wide)이 담당함
- 키보드: 해당 없음. Tab 대상이 아님
- 포커스 이동·복귀
  - 이 컴포넌트는 포커스를 받지 않음
  - 단계가 바뀌면 포커스를 새 단계의 페이지 제목(`<h1 tabindex="-1">`)으로 옮김. 그래야 화면 읽기 프로그램이 새 단계 이름을 읽음. 규칙 정본은 PATTERN-02-03
- 단계 변경 시 `aria-valuenow`·`aria-valuetext`를 함께 갱신함(7절)
- 비동기 중 동작: 해당 없음

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color | 0.1s | ease | design-reference 4.3 |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 폭: 폼 폭 100%(최대 800). segment는 같은 비율로 줄어듦
  - 높이 10px·gap `raw:22px`·radius·색: 그대로
- Figma 모바일 노드: 없음. Mobile 페이지 인스턴스(6439:12303)는 1440 프레임 안의 데스크톱 시안임

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | root `role="progressbar"`. segment는 `<span aria-hidden="true">`. `<button>` 금지(누를 수 없는 요소가 Tab 대상이 되고 이름 없는 버튼으로 읽힘) | Figma 없음(추정) |
| 키보드 | 해당 없음. Tab 대상이 아님 | Figma 없음(추정) |
| aria | `aria-label="지원서 작성 단계"`<br>`aria-valuemin="1"`, `aria-valuemax="N"`(단계 수), `aria-valuenow="k"`(현재 단계, 1부터)<br>`aria-valuetext="k/N단계, <단계 이름>"`(예: "2/4단계, 공통 질문"). 숫자 대신 단계 수와 이름을 읽게 함 | Figma 없음(추정) |
| 대비 | 기준: UI 요소 3:1<br>selected 바탕 #E6E6E6 대 검정 16.83<br>default 테두리 #333333 대 검정 1.66으로 기준 미달(11절)<br>selected 바탕 대 default 테두리 10.12 | 계산값(검정 캔버스 #000000 기준) |
| 터치 영역 | 해당 없음. 누를 수 없음 | — |
| 포커스 링 | 해당 없음. 포커스를 받지 않음 | — |
| 비활성 표시 | 해당 없음. 비활성 상태가 없음 | — |

- `role="progressbar"`를 고른 이유(단계 목록 `<ol>` + `aria-current="step"`과 비교)
  - 막대에 보이는 단계 이름이 없음. `<ol>`로 만들면 항목마다 숨긴 글자를 따로 넣어야 하고, 화면 읽기 프로그램이 항목 N개를 하나씩 읽음
  - 막대를 눌러 이동하지 않음. 단계 목록 방식은 단계 이름을 보여 주거나 단계로 이동할 수 있을 때 맞음
  - progressbar 하나에 `aria-valuetext`로 "2/4단계, 공통 질문"을 한 번에 읽힘
  - 티켓 COMPONENT-14-01이 `role="progressbar"`·`aria-valuenow`를 요구함
  - 단계 이름을 막대 위에 보여 주거나 단계 이동 기능을 넣게 되면 `<ol>` + `aria-current="step"`으로 바꿈

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| root 하나에 `role="progressbar"`와 `aria-valuenow`·`aria-valuemin`·`aria-valuemax`·`aria-valuetext` | segment마다 `<button type="button">`을 둠 |
| segment는 `aria-hidden="true"` `<span>` | segment에 클릭 동작을 붙여 단계 이동 |
| segment 개수를 단계 상수 하나에서 가져옴 | 페이지와 컴포넌트에 단계 목록을 따로 둠 |
| 단계가 바뀌면 포커스를 페이지 제목으로 옮김 | 단계가 바뀌어도 포커스를 이전 단계의 버튼에 둠 |
| 현재 단계는 바탕 채움으로 표시 | 색만 살짝 바꿔 현재 단계를 구분 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/progress-bar/progress-bar.tsx`, `src/shared/components/progress-bar/progress-bar.css.ts`, `src/shared/components/progress-bar/progress-bar-section.tsx`, `src/shared/components/progress-bar/progress-bar-section.css.ts` | `ProgressBar`: segment 하나(`isCurrentStep`)<br>`ProgressBarSection`: `currentStep`(0부터)을 받아 4개를 나열<br>사용: `src/widgets/apply/ui/apply-title-section.tsx`(`showProgressBar`), 호출은 `src/pages/apply-page.tsx` |
| frontend 차이 | 위와 같음 | ADOPT-03-18에서 고침. 명세와 다른 점<br>- segment가 `<button type="button">`(명세 `<span aria-hidden="true">`)<br>- root에 `role="progressbar"`·`aria-value*` 없음<br>- gap 20px(명세 `raw:22px`)<br>- 단계 이름 목록이 `progress-bar-section.tsx`와 `apply-page.tsx`에 따로 있음(값도 "지원자 정보"·"지원자 정보 입력"으로 다름)<br>- 단계 변경 시 제목으로 포커스 이동 없음 |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. 관리자 콘솔에 단계 진행 화면이 없어 대응 ADOPT 없음(2026-10-22 확인) |
| FE 이름 ↔ 명세 이름 | `src/shared/components/progress-bar/progress-bar.tsx` | `ProgressBarSection` ↔ root, `ProgressBar` ↔ segment, `isCurrentStep` ↔ selected |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:22px` | segment 사이 gap | Figma 2009:3442 | 불필요(1곳. 800 = 252×3 + 22×2에 맞춘 값) |
| 10px | root·segment 높이 | Figma 2009:3442 | 불필요 |
| 1px | segment 테두리 굵기 | Figma 1821:3852 | 불필요 |
| 0.1s ease | 전환 | design-reference 4.3 | 불필요 |
| #666666 테두리 | Figma 화면 인스턴스의 셋째 segment(명세는 `color.stroke.weak` #333333) | Figma 4852:9891 | 불필요(인스턴스 덮어쓰기로 봄, 11절) |

## 11. 미확인

- default segment 테두리 대비: #333333 대 검정 1.66으로 WCAG 1.4.11(UI 요소 3:1) 미달. 단계 수·위치를 알려면 빈 막대가 보여야 함. `color.stroke.neutral` (#999999, 7.37)로 올릴지 디자이너 확인 필요(Figma 2009:3442)
- completed(지난 단계) 표시: Figma 시안이 1단계 화면뿐이라 없음. 명세는 코드와 같이 채우지 않음. 지난 단계도 채울지 디자이너 확인 필요
- 단계 수: Figma 3단계, frontend 4단계. 명세는 N단계 공식으로 둠. Figma 갱신 필요 여부 확인
- Figma 인스턴스 덮어쓰기: 2158:4498은 첫째·셋째 막대를 모두 채움, 4852:9891 등은 셋째 막대 테두리 #666666, 둘째 막대 흰색 불투명도 0.4. 컴포넌트 원본(2009:3442)을 기준으로 함
- 모바일 시안: Figma 없음(추정)
