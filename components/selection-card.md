---
id: selection-card
name_ko: 선택 카드
ticket: COMPONENT-15
tier: P1
status: review
figma:
  - "4266:7628"
  - "4266:7629"
  - "5188:8869"
  - "7578:9509"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 선택 카드 (selection-card)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 보기 몇 개(지원 부문 3개) 중 하나를 고르는 큰 카드형 단일 선택. 아이콘 원 + 라벨 한 줄
- 의미: 라디오 묶음(radio-group)과 같음. 카드는 네이티브 `<input type="radio">`에 입힌 모양일 뿐이며 묶음·키보드·aria 규칙은 `components/radio.md` 3절 Group·5절·7절을 그대로 씀
- 사용 화면: 지원서 작성 지원 부문 선택(데이터 분석·데이터 시각화·데이터 엔지니어링)
- Figma 이름: "지원폼_부문 선택 버튼"(4266:7628·7629), "지원 폼 탭"(인터랙션 세트 5188:8869), "지원 폼 탭_모바일"(7578:9509). 이름에 버튼·탭이 들어가 있으나 동작은 단일 선택이라 이 명세에서 정함(`components/tab.md` 1절 경계)
- 관련 명세: `components/radio.md`(COMPONENT-05, 묶음·키보드·aria 규칙), `components/button.md`(COMPONENT-01, 보라 바탕 흰 글자 크기 결정 COMPONENT-01-03), `components/tab.md`(COMPONENT-06), `components/modal.md`(COMPONENT-07, 부문 변경 확인), `patterns/form.md`(PATTERN-02), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<label>`. 카드 전체가 누를 영역. 고정 크기, 내용 가로·세로 가운데 정렬. 보더 1px, radius 8 | `raw:8px`, 색은 4절 |
| input | ○ | 네이티브 `<input type="radio">`. 시각적 숨김(clip). `display:none` 금지(`components/radio.md` 2절과 같음) | — |
| icon | × | 지름 32 원(모바일 28). 부문 아이콘 자리. 장식이라 `aria-hidden="true"` | `color.palette.gray.400` (#999999) |
| label | ○ | 부문 이름 한 줄. icon과 gap 16px | `typography.body-2` / 모바일 `typography.body-2-mobile`, gap `spacing.4` (16px) |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | 아이콘 원 + 라벨. 지원 부문 선택 | Figma 4266:7628, Figma 4266:7629, Figma 5188:8869, Figma 7578:9509 |

- 두 세트의 관계: 4266:7628·7629(Default·Selected 2종, 화면 사용 20곳)와 5188:8869(Default·Hover·Active 3종, 인터랙션 정의)는 같은 모양임. Active는 selected와 같음
- 묶음 배치는 아래 Group 표

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| card | 253×80 | 342×56 | `raw:8px` | 0(고정 크기, 내용 가운데 정렬), icon–label gap `spacing.4` (16px) | `typography.body-2` / 모바일 `typography.body-2-mobile` | Figma 4266:7628, Figma 5188:8868, Figma 7578:9510 |
| icon | 32×32 | 28×28 | `radius.full` (40px) | — | — | Figma 4266:7487, Figma 7578:9511 |

- radius 8: radius 토큰(`radius.sm` 12, `radius.md` 20, `radius.full` 40)에 없어 `raw:8px`로 적음(COMPONENT-15-02, design-reference 3.1). 10절
- 높이 고정. 폭은 Group 행을 3등분(`flex: 1 1 0`)해 데스크톱 800 폭에서 253이 됨(3×253 + 2×20 = 799)
- 라벨 글자: Figma 18 Bold(데스크톱)·15 Bold(모바일). 보라 바탕 흰 글자 대비 때문에 `typography.body-2` (20/700)로 올림. 근거는 7절 대비 행
  - 상태가 바뀌어도 글자 크기는 같게 둠(선택 시 줄 길이가 변하지 않게). default 행도 `typography.body-2`
  - "데이터 엔지니어링" 20 Bold 폭 약 144 + icon 32 + gap 16 = 약 192로 253 안에 들어감
- Figma 4266:7629(Selected)의 패딩 30 / 49는 고정 크기·가운데 정렬이라 결과가 같아 쓰지 않음

### Group

카드 묶음은 radio-group임. 묶음 이름·누락 메시지·필수 규칙은 `components/radio.md` 3절 Group 표를 따르고, 배치·간격·묶음 제목은 아래 값으로 바꿈.

| 항목 | 데스크톱 | 모바일 | 근거 |
| --- | --- | --- | --- |
| 배치 | 가로 한 줄 3개 | 세로 목록 | Figma 4266:8038, Figma 없음(추정, 모바일) |
| 카드 사이 간격 | `spacing.5` (20px) | `spacing.3` (12px) | Figma 4266:8038, Figma 없음(추정, 모바일) |
| 묶음 제목 → 카드 | `spacing.10` (40px) | `spacing.5` (20px) | Figma 4266:8034, Figma 6714:13855, Figma 없음(추정, 모바일) |
| 묶음 제목 | "부문을 선택해주세요". 글자·왼쪽 세로 막대 모양은 화면 제목 스타일이라 이 명세 범위 밖 | 같음 | Figma 6714:13857 |

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임. fg는 label 색이며 icon 색은 모든 칸 `color.palette.gray.400` (#999999).
focus-visible 칸은 rest 색을 유지하고 root에 outline을 더함.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.palette.gray.100` (#E6E6E6) / `color.palette.gray.600` (#666666) 1px | — / `color.palette.gray.100` (#E6E6E6) / `color.palette.gray.100` (#E6E6E6) 1px | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5188:8868, Figma 5188:8870, Figma 4266:8040, Figma 없음(추정, press·focus-visible) |
| selected | `color.bg.brand-solid` (#7A64F9) / `color.fg.on-brand` (#FFFFFF) / — | rest 유지 | rest 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 4266:7629, Figma 5188:8873, Figma 없음(추정, hover·press·focus-visible) |

- default 라벨: 컴포넌트 원본(4266:7628)은 #999999, 화면 인스턴스(4266:8040)와 인터랙션 세트(5188:8868)는 #E6E6E6. 사용처가 쓰는 `color.palette.gray.100` (#E6E6E6)을 따름
- selected 라벨: 4266:7629는 #FFFFFF, 5188:8873은 #E6E6E6(보라 위 3.35:1로 미달). 대비가 높은 `color.fg.on-brand` (#FFFFFF)를 씀
- selected 보더: Figma에 없음. 바탕과 같은 색이라 보더 1px 자리는 `transparent`로 두어 크기가 변하지 않게 함
- selected의 hover·press: 다시 눌러도 바뀌는 것이 없어(네이티브 라디오는 해제되지 않음) rest 유지
- 포커스 트리거: 숨긴 input의 `:focus-visible`. 스타일은 root에 그림(`label:has(input:focus-visible)` 또는 input을 root 앞 형제로 두고 `input:focus-visible + root`)
- 비동기 상태(pending·loading): 해당 없음. 선택은 화면 값만 바꿈. 부문 변경 확인은 5절
- disabled 행을 두지 않음: Figma·frontend에 없고 모집 기간이 아닐 때는 지원서 진입 자체를 모달(COMPONENT-07 "지원 기간 아님")로 막음
- invalid 행을 두지 않음: 누락은 묶음 단위 메시지로 보여 줌(`components/radio.md` 4절과 같음). 카드 색은 바꾸지 않음
- completed 행을 두지 않음: 선택 완료는 selected가 담당

## 5. Behavior

- 클릭·탭: 카드 어디를 눌러도 선택(`<label>`이 input을 감쌈). 선택된 카드를 다시 눌러도 해제되지 않음. 터치에서는 hover 색을 적용하지 않음(`@media (hover: hover)`에서만)
- 키보드: `components/radio.md` 5절과 같음. 묶음에 Tab 정지 1곳, 방향키(↓·→ 다음, ↑·← 이전)로 이동과 동시에 선택, 끝에서 순환, Space로 선택. 세 input에 같은 `name`
- 포커스 이동·복귀: 선택 후 포커스는 그 카드에 남음. 제출 시 부문 누락이면 첫 카드로 포커스 이동(`patterns/form.md`)
- 부문 변경 확인(임시저장 내역이 있을 때)
  - 이미 선택된 부문을 다른 부문으로 바꾸면 기존 부문 임시저장 내역이 지워지므로 확인 모달(COMPONENT-07)을 띄움
  - 방향키 이동도 선택 변경이므로 같은 확인을 거침
  - 취소: 이전 부문 선택으로 되돌리고 포커스를 이전 카드에 둠. 확인: 새 부문 유지, 포커스는 새 카드로 돌아옴
  - `window.confirm` 사용 금지(PATTERN-01, ADOPT-04)
- 비동기 중 동작: 해당 없음(4절)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color | 0.2s | ease-in-out | design-reference 4.3 |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): PATTERN-03-04 확정 전까지 전환을 제거함

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 크기: 342×56(폭은 묶음 폭 100%)
  - icon: 28×28
  - 글자: `typography.body-2-mobile` (16/600). Figma 15 Bold는 토큰이 없어 가장 가까운 값으로 맞춤(button.md brand-wide 모바일과 같은 처리)
  - 배치: 세로 목록, 간격 `spacing.3` (12px)(추정)
  - radius `raw:8px`, 보더 1px, icon–label gap `spacing.4` 그대로
- 769~1365px: 데스크톱 값. 묶음 폭이 줄면 카드 폭도 3등분으로 줄어듦. 카드 폭이 200 아래로 내려가면 세로 목록으로 바꿈(추정)
- Figma 모바일 노드: 세트 Figma 7578:9509(Default 7578:9510, Active 7578:9516). 모바일 화면 인스턴스 없음(배치 값 추정)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 카드마다 네이티브 `<input type="radio">`. 묶음은 `<fieldset>` + `<legend>`("부문을 선택해주세요"). 제목을 화면 제목 요소로 유지해야 하면 `role="radiogroup"` + `aria-labelledby` | Figma 없음(추정) |
| 키보드 | 묶음당 Tab 정지 1곳, 방향키 이동·선택·순환, Space 선택. 네이티브 라디오와 같은 `name`으로 얻음. `onKeyDown` 직접 구현 금지 | Figma 없음(추정) |
| aria | 이름은 보이는 라벨(부문 이름). icon은 `aria-hidden="true"`. input에 `required`. 누락 시 묶음에 `aria-invalid="true"`와 메시지 id를 `aria-describedby`로 연결 | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자(Bold 18.67px 이상)·UI 요소 3:1<br>default 라벨 #E6E6E6 / 검정 캔버스: 16.83<br>default 보더 #666666 / 검정: 3.66, hover 보더 #E6E6E6: 16.83(UI 요소 통과)<br>selected 바탕 #7A64F9 / 검정: 5.02(선택 표시 UI 요소 통과)<br>selected 라벨 #FFFFFF / #7A64F9: 4.18. 큰 글자 기준으로만 통과 → 데스크톱 `typography.body-2` (20 Bold) 사용. Figma 18 Bold는 기준보다 0.67px 작아 미달(button.md COMPONENT-01-03과 같은 결정)<br>모바일 `typography.body-2-mobile` (16/600) 흰 글자 4.18: 큰 글자가 아니라 AA 미달. button.md 모바일 결정(COMPONENT-01-03)과 같이 Figma 값으로 유지하고 11절에 남김<br>Figma 5188:8873의 #E6E6E6 / #7A64F9: 3.35로 미달이라 쓰지 않음<br>icon #999999 / #7A64F9: 1.47. 장식이라 기준 대상 아님 | 계산값(WCAG 상대 휘도), `docs/wbs/20-token.md` 대비표 |
| 터치 영역 | 최소 24×24, 모바일 권장 44×44 모두 통과(카드 전체가 `<label>`, 253×80 / 342×56) | WCAG 2.2 2.5.8 |
| 포커스 링 | 숨긴 input 대신 root에 그림. outline 2px, offset 2px. 검정 캔버스 위 `color.stroke.focus` (#68CBEC) 11.34:1. 보라 카드 안쪽에 그리면 2.26:1로 미달이라 offset으로 카드 밖에 그림 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음(4절 disabled 행 없음). 필요해지면 `components/radio.md`처럼 `<fieldset disabled>`와 사유 글자 | Figma 없음(추정) |

- 선택 여부는 색만이 아니라 채움 여부(보더만 있는 카드 → 채운 카드)로도 구분됨(WCAG 1.4.1)

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 카드 안에 네이티브 `<input type="radio">`, 같은 `name` | `<button>`·`<div onClick>` 카드에 선택 상태를 직접 관리, `role="tab"` 사용 |
| 묶음은 `<fieldset>` + `<legend>` | 제목과 카드를 의미 없는 `<div>`로만 묶음 |
| 데스크톱 라벨 `typography.body-2` 이상, selected 라벨 `color.fg.on-brand` | 보라 바탕에 18 Bold 또는 #E6E6E6 글자 |
| 포커스 링은 카드 밖(offset 2px) | 보라 카드 안쪽에 링 그리기, 포커스 표시 없음 |
| 부문 변경 확인은 모달(COMPONENT-07), 취소 시 이전 선택 복원 | `window.confirm`, 취소 후에도 새 부문이 선택된 채로 남음 |
| 보기 2~4개의 짧은 단일 선택에 사용 | 여러 개 선택(checkbox 사용), 보기 5개 이상(radio 목록 사용) |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | 없음 | 선택 카드 컴포넌트 없음. 지원 부문은 `src/widgets/apply/ui/personal-info-section.tsx`에서 `RadioGroup`(`name="track"`, 세로 원형 라디오 목록)으로 구현됨 |
| frontend 차이 | `src/widgets/apply/ui/personal-info-section.tsx` | ADOPT-03-20에서 고침. 명세와 다른 점<br>- 모양: 원형 라디오 목록(명세 카드 253×80 가로 3개)<br>- 위치: 지원자 정보 단계 안 질문(Figma는 "지원 안내사항 및 동의" 화면, 4266:8034)<br>- 부문 변경 확인: `window.confirm`(명세 모달 COMPONENT-07, 취소 시 이전 선택 복원)<br>- 묶음 role·포커스 표시: `components/radio.md` 9절 frontend 차이와 같음(ADOPT-03-13) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. 대응 ADOPT-07 기능 ID 없음, 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | — | 해당 없음(컴포넌트 없음). Figma 이름 "지원 폼 탭"·"지원폼_부문 선택 버튼" ↔ selection-card |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:8px` | card radius | Figma 4266:7628, Figma 7578:9510 | 사용처 3곳째(button.md 모바일 neutral-md, checkbox.md toggle, 이 명세). checkbox.md 10절 기준("3곳이 되면 제안")에 따라 radius 8 토큰 추가를 별도 이슈로 제안 필요 |
| 253×80, 342×56 | card 크기 | Figma 4266:7628, Figma 7578:9510 | 불필요 |
| 32px, 28px | icon 원 지름 | Figma 4266:7487, Figma 7578:9511 | 불필요 |
| 1px | 보더 굵기 | Figma 4266:7628 | 불필요 |
| 18px Bold, 15px Bold | Figma 라벨 글자(명세는 `typography.body-2`, `typography.body-2-mobile`) | Figma 4266:7488, Figma 7578:9512 | 불필요(결정으로 대체). 디자이너 확인(11절) |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- 라벨 글자 크기: Figma 18 Bold, 명세 `typography.body-2` (20 Bold, 보라 바탕 흰 글자 4.18:1 대비 결정 COMPONENT-01-03 적용). 디자이너 확인 필요(Figma 4266:7492)
- 모바일 selected 라벨: `typography.body-2-mobile` (16/600) 흰 글자 4.18:1로 AA 미달. button.md 모바일과 같이 유지. 개선 방법(바탕을 `color.bg.brand-solid-hover` #493C95로 바꾸면 8.88:1 등) 디자이너 확인 필요(Figma 7578:9516)
- icon 원(#999999 "Ellipse 47"): 부문별 아이콘이 들어갈 자리인지, 원 그대로인지 확인 필요. 명세는 장식으로 처리(Figma 4266:7487)
- default 라벨 색: 원본 #999999, 인스턴스 #E6E6E6. 명세는 #E6E6E6(Figma 4266:7488, Figma 4266:8040)
- selected의 hover·press, default의 press, 모든 focus-visible: Figma 없음(추정)
- 모바일 배치(세로 목록, 간격 12, 제목 → 카드 20): 모바일 세트 인스턴스가 화면에 없어 추정(Figma 7578:9509)
- 769~1365px에서 세로 목록으로 바꾸는 폭 기준(카드 200 미만): 추정
- 화면 위치: Figma는 "지원 안내사항 및 동의" 화면, frontend는 지원자 정보 단계. 어느 단계에 둘지 확인 필요(Figma 4266:8034)
