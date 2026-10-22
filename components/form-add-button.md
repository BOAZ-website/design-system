---
id: form-add-button
name_ko: 폼 항목 추가 버튼
ticket: COMPONENT-16
tier: P1
status: review
figma:
  - "5188:454"
  - "5775:9707"
  - "5755:10062"
  - "7578:14703"
  - "2009:4216"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 폼 항목 추가 버튼 (form-add-button)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 지원서에서 같은 종류의 입력 필드를 하나 더 만드는 "+ 항목 추가" 행과, 추가된 필드를 지우는 "− 삭제" 버튼
- 구성: 두 부분
  - add 행: 바탕 없는 넓은 버튼. 더하기 아이콘 + 라벨("복수/부전공 추가")
  - 추가된 항목 행: 한 줄 텍스트 필드 + 빼기 아이콘 삭제 버튼. Figma 이름 Active 계열이 이 행임
- 사용 화면: 지원서 작성(지원자 정보 단계 복수/부전공, 질문 단계 링크·프로젝트 추가)
- 관련 명세: `components/text-field.md`(COMPONENT-02, 추가된 항목의 입력 본체), `components/button.md`(COMPONENT-01), `patterns/form.md`(PATTERN-02, "(선택)" 표시·검증), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| add-root | ○ | `<button type="button">`. 폭 100%, 높이 고정, 바탕 없음, 글자 왼쪽 정렬 | 색은 4절 |
| add-icon | ○ | 24px 더하기 아이콘(그림 16×16). 장식이라 `aria-hidden="true"` | `color.palette.gray.800` (#333333) |
| add-label | ○ | 보이는 이름. "{항목 이름} 추가" 꼴(예: "복수/부전공 추가", "링크 추가"). "+" 기호는 글자로 넣지 않고 add-icon으로 표시 | `typography.body-4` / 모바일 `typography.body-4-mobile` |
| item-field | ○ | 추가된 입력. `components/text-field.md` single-line full을 그대로 씀(모양·상태·라벨 축소·오류) | `components/text-field.md` 2·4절 |
| remove-button | ○ | `<button type="button">` 아이콘 전용. 24px 빼기 아이콘(그림 16×2) | 색은 4절 |

- 아이콘 위치
  - 데스크톱: 행 왼쪽 바깥에 둠. 아이콘 오른쪽 끝과 행 왼쪽 끝 사이 `spacing.4` (16px). 아이콘은 행 세로 가운데. 글자 시작선은 위 텍스트 필드와 맞춤
  - 모바일: 행 안 오른쪽 끝에 둠(바깥 여백이 없음)

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | add 행 + 추가된 항목 행 | Figma 5188:454, Figma 7578:14703 |

- 두 Figma 세트의 관계
  - 5188:454(텍스트 필드 인터렉션 안, Default·Hover·Active·Active_Hover·Active_Focus 5종, 아이콘 사용): 인터랙션 정의. 이 명세의 기준
  - 2009:4216(지원 폼 안, Default·Variant2 2종, "+ " 글자 사용, 화면 인스턴스 20곳): 이전 판. 글자색 #999999만 이 명세에 반영함(4절)

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| add 행 | 800×60(폭 100%) | 342×56(폭 100%) | — | `spacing.5` (20px) / 0 | `typography.body-4` / 모바일 `typography.body-4-mobile` | Figma 5188:453, Figma 7578:14704 |
| 추가된 항목 행 | 800×60 | 342×56 | — | `components/text-field.md` full과 같음 | `components/text-field.md` full과 같음 | Figma 5775:9661, Figma 7578:14710 |
| add-icon, remove-button | 24×24(그림 16×16 / 16×2) | 24×24 | — | — | — | Figma 5773:9630, Figma 5755:10061 |

- 높이 고정. 상태가 바뀌어도 같음
  - 모바일 Hover(7578:14707)는 342×50, 패딩 13이라 Default 56과 다름. 명세는 56 고정(11절)
- padding 순서: 세로 / 가로
- 행 사이 간격: 위 필드와 add 행, 추가된 항목 행끼리 모두 `spacing.2` (8px)(Figma 지원 폼 2391:6049의 10 → `docs/wbs/20-token.md` 텍스트 필드 gap 단계 표에 따라 8)
- 최대 개수: 화면이 정함(복수/부전공 3개). 최대에 도달하면 add 행을 숨김(4절)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임. fg는 글자·아이콘 색.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### add 행

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / label `color.fg.muted` (#999999), icon `color.palette.gray.800` (#333333) / — | `color.palette.gray.950` (#0D0D0D) / label `color.fg.default` (#FFFFFF), icon `color.palette.gray.0` (#FFFFFF) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5188:453, Figma 5775:9656, Figma 2009:4216, Figma 없음(추정, press·focus-visible) |

- rest 라벨색: 5188:452는 #666666(검정 위 3.66:1, 18 Regular라 미달). 이전 판 2009:4216과 frontend가 쓰는 `color.fg.muted` (#999999, 7.37:1)를 씀(11절)
- 데스크톱 hover 바탕은 add-root 영역(800×60)에만 칠함. 바깥 아이콘 자리는 칠하지 않음(Figma 5775:9656)
- disabled 행을 두지 않음: 최대 개수에 도달하면 add 행을 숨김. 숨기기 직전 포커스는 5절 규칙으로 옮김
- 비동기 상태: 해당 없음. 추가·삭제는 화면 상태만 바꾸고 서버 요청을 하지 않음

### 추가된 항목 행(Figma Active 계열)

항목이 추가된 뒤의 행임. 입력 본체는 `components/text-field.md` 4절 single-line 표를 그대로 따르며, 아래는 Figma 이름과의 대응만 적음.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default(빈 값) | text-field default rest: — / label `color.fg.muted` (#999999) / `color.stroke.neutral` (#999999) | text-field default hover: — / label `color.fg.default` (#FFFFFF) / `color.palette.gray.0` (#FFFFFF) | — | text-field default focus: — / label `color.fg.brand` (#7A64F9), 위로 축소 `typography.text-1` / `color.stroke.brand` (#7A64F9) | Figma 5775:9661(Active), Figma 5775:9701(Active_Hover), Figma 5775:9707(Active_Focus) |
| completed(값 있음) | `components/text-field.md` 4절 completed 행 | 같음 | — | 같음 | Figma 없음(추정) |
| invalid | `components/text-field.md` 4절 invalid 행(형식 오류만. 선택 항목이라 누락 오류 없음) | 같음 | — | 같음 | Figma 없음(추정) |

- Figma 이름 대응: Active = 추가된 항목 행 default의 rest, Active_Hover = 같은 행 hover 칸, Active_Focus = 같은 행 focus-visible 칸. 합친 상태 이름을 만들지 않음(COMPONENT-16-01)
- 포커스 트리거: text-field와 같은 `:focus-within`

### remove-button

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.palette.gray.600` (#666666) / — | — / `color.fg.critical` (#F96466) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5755:10061, Figma 5755:10063, Figma 없음(추정, press·focus-visible) |

- 삭제 hover 빨강은 아이콘에만 적용. 행 보더·바탕은 바꾸지 않음
- Figma Active_Hover(5775:9701)에서 아이콘은 #666666 그대로임. 행 hover와 아이콘 hover는 따로 일어남(아이콘 위에 포인터가 있을 때만 빨강)

## 5. Behavior

- 요소 선택: add 행·remove-button 모두 `<button type="button">`(폼 제출 방지). `<div onClick>` 금지
- 추가
  - add 행을 누르면 add 행 바로 위에 빈 추가된 항목 행이 생기고 포커스가 새 입력으로 이동함
  - 새 입력의 접근 이름: "{항목 이름} {번호}"(예: "복수/부전공 2"). 보이는 label도 같은 글자
  - 최대 개수에 도달하면 add 행을 숨김. 이때 포커스는 방금 만든 입력에 있으므로 잃지 않음
- 삭제
  - remove-button을 누르면 확인 없이 그 행을 지움(값이 있어도 같음. 선택 항목이라 되돌릴 필요가 적음)
  - 포커스 복귀: 다음 추가된 항목 행의 입력 → 없으면 이전 행의 입력 → 없으면 add 행
  - 삭제 후 `role="status"` 영역에 "{항목 이름} {번호} 삭제됨"을 알림
  - 지운 뒤 남은 행 번호를 다시 매김
- 키보드: Tab 순서는 입력 → remove-button → 다음 행 → add 행. Enter·Space로 실행
- 터치에서는 hover 색을 적용하지 않음(`@media (hover: hover)`에서만)
- 비동기 중 동작: 해당 없음(4절)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, color(add 행) | 0.2s | ease-in-out | design-reference 4.3 |
| color(remove-button 아이콘) | 0.2s | ease-in-out | design-reference 4.3 |
| 추가된 항목 행 | `components/text-field.md` 5절과 같음 | — | Figma 없음(추정) |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)
- 행이 생기고 지워질 때 높이 애니메이션은 두지 않음(Figma 없음(추정))

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 크기: 행 342×56(폭 100%), 높이 모든 상태 56 고정
  - 글자: `typography.body-4-mobile` (15/400). 추가된 항목 행 축소 label은 `typography.text-1-mobile`(text-field 모바일과 같음, Figma 7578:14720)
  - 아이콘 위치: 행 안 오른쪽 끝(add-icon·remove-button 모두)
  - hover 패딩: Figma 13 → `spacing.3` (12px)(`docs/wbs/20-token.md` 실측 → 단계 표). 높이는 56 고정이라 글자 위치에만 영향
- 769~1365px: 데스크톱 값. 행 왼쪽 바깥 아이콘 자리(40px)가 화면 밖으로 나가면 모바일 배치(오른쪽 안쪽)를 씀(추정)
- Figma 모바일 노드: 세트 Figma 7578:14703(Default 7578:14704, Hover 7578:14707, Active 7578:14710, Active_Hover 7578:14714, Active_Focus 7578:14718)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | add 행·remove-button은 `<button type="button">`. 추가된 입력은 `<input>` + `<label>`(text-field 명세) | Figma 없음(추정) |
| 키보드 | Tab으로 각 버튼·입력 이동, Enter·Space 실행. 추가 후 새 입력으로, 삭제 후 5절 순서로 포커스 이동 | Figma 없음(추정) |
| aria | add 행 이름은 보이는 라벨("복수/부전공 추가"). remove-button은 `aria-label="{항목 이름} {번호} 삭제"`(예: "복수/부전공 2 삭제"). 아이콘은 `aria-hidden="true"`. 삭제 결과는 `role="status"`로 알림 | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, UI 요소 3:1(배경 검정 캔버스 #000000)<br>add 라벨: rest #999999 7.37(Figma #666666은 3.66으로 미달이라 쓰지 않음), hover #FFFFFF / #0D0D0D 19.44<br>add-icon rest #333333 1.66: 라벨과 함께 있는 장식이라 기준 대상 아님. hover #FFFFFF 19.44<br>remove-button 아이콘(유일한 식별 수단이라 UI 요소 3:1 적용): rest #666666 3.66 통과, hover `color.fg.critical` #F96466 7.04 통과<br>추가된 항목 행: `components/text-field.md` 7절 대비 행 | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: add 행 800×60·342×56 통과, remove-button 24×24 통과<br>모바일 권장 44×44: remove-button 미달. 버튼 누를 영역을 행 높이(56)×44로 늘리고 아이콘은 가운데 둠(추정) | WCAG 2.2 2.5.8 |
| 포커스 링 | add 행·remove-button: outline 2px, offset 2px, `color.stroke.focus` (#68CBEC) 11.34:1. 추가된 입력은 text-field 규칙(보더·label 색, outline 없음) | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음. 최대 개수 도달 시 add 행을 숨김(4절) | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| add 행·삭제는 `<button type="button">` | `<div onClick>`, `type` 없는 `<button>`(폼 제출 발생) |
| 삭제 버튼에 `aria-label="{항목 이름} {번호} 삭제"` | 아이콘만 두고 이름 없음, 모든 삭제 버튼 이름을 "삭제"로 같게 둠 |
| 추가 후 새 입력으로, 삭제 후 이웃 입력으로 포커스 이동 | 삭제 후 포커스를 문서 처음으로 잃음 |
| add 라벨 rest `color.fg.muted` | 검정 위 #666666 18 Regular 글자(3.66:1) |
| 삭제 hover 빨강은 아이콘에만 | 행 전체를 빨강으로 바꿔 오류처럼 보이게 함 |
| 상태가 바뀌어도 행 높이 고정 | 모바일 hover에서 높이 56 → 50으로 바뀜 |
| "+"는 아이콘으로 표시 | 라벨 글자에 "+ " 기호를 넣어 화면 읽기 프로그램이 "더하기"로 읽음 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/apply/ui/personal-info-section.tsx`, `src/widgets/apply/ui/personal-info-section.css.ts`, `src/widgets/apply/ui/question-section/question-section.tsx`, `src/widgets/apply/ui/question-section/question-section.css.ts` | 공용 컴포넌트 없음. 화면마다 직접 구현<br>- 복수/부전공: `addDegree`(add 행, 최대 3개), `degreeRow` + `removeDegreeButton`("삭제" 글자 버튼)<br>- 프로젝트: `addProject`("+ 프로젝트 추가하기"), 추가된 행 삭제 없음 |
| frontend 차이 | 위와 같음 | ADOPT-03-21에서 고침. 명세와 다른 점<br>- add 행: `<div onClick>`(명세 `<button type="button">`), 키보드로 실행 불가<br>- add 글자: "+ " 기호를 글자로 씀, 14 Regular(명세 `typography.body-4` 18, 아이콘)<br>- add 높이·hover 바탕: 없음(명세 60 고정, hover `color.palette.gray.950`)<br>- 삭제: "삭제" 글자 버튼, hover #E6E6E6(명세 빼기 아이콘, hover `color.fg.critical`), `aria-label` 없음<br>- 프로젝트 추가 행: 삭제 버튼 없음<br>- 포커스: 추가·삭제 후 이동 없음, 전역 `outline: none`(ADOPT-01-03) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. 대응 ADOPT-07 기능 ID 없음, 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | 위와 같음 | `addDegree`·`addProject` ↔ add 행. `degreeRow` ↔ 추가된 항목 행. `removeDegreeButton` ↔ remove-button |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| 24px(그림 16×16, 16×2) | add-icon, remove-button 아이콘 | Figma 5773:9630, Figma 5755:10061 | 불필요 |
| 40px(24 + `spacing.4`) | 데스크톱 아이콘의 행 왼쪽 바깥 위치 | Figma 5188:453 | 불필요 |
| 800×60, 342×56 | 행 크기 | Figma 5188:453, Figma 7578:14704 | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- add 라벨 rest 색: Figma 5188:452는 #666666(3.66:1, 미달). 명세는 이전 판 2009:4216·frontend와 같은 `color.fg.muted` (#999999). 디자이너 확인 필요
- add-icon rest #333333(1.66:1): 장식으로 처리. 라벨과 같은 색으로 맞출지 디자이너 확인 필요(Figma 5773:9630)
- 모바일 Hover 높이 50·패딩 13(Figma 7578:14707): Default 56과 달라 명세는 56 고정. 디자이너 확인 필요
- add 행·remove-button의 press, 모든 focus-visible: Figma 없음(추정)
- 이전 판 2009:4216("+ Additional foam", Variant2 하단 보더 #999999 + 바탕 #0D0D0D)이 화면 20곳에 남아 있음. 새 세트 5188:454로 교체할지 확인 필요
- 삭제 확인 없음·삭제 후 포커스 순서·`role="status"` 알림: Figma 없음(추정)
- 모바일 remove-button 44×44 확장 방식: 추정
- 769~1365px에서 아이콘을 오른쪽 안쪽으로 옮기는 기준: 추정
- 프로젝트 추가 행 삭제: frontend에 없음. Figma는 모든 추가된 항목 행에 삭제 아이콘이 있어 명세는 삭제를 둠
