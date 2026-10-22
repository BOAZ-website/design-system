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
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-23
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
  - add 행: 바탕 없는 글자 버튼. "+" 표시 + 라벨("복수/부전공", "프로젝트 추가하기")
  - 추가된 항목 행: 한 줄 텍스트 필드 + "삭제" 글자 버튼. Figma 이름 Active 계열이 이 행임
- 사용 화면: 지원서 작성(지원자 정보 단계 복수/부전공, 질문 단계 링크·프로젝트 추가)
- 관련 명세: `components/text-field.md`(COMPONENT-02, 추가된 항목의 입력 본체), `components/button.md`(COMPONENT-01), `patterns/form.md`(PATTERN-02, "(선택)" 표시·검증), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| add-root | ○ | `<button type="button">`. 글자 폭, 바탕 없음, 왼쪽 정렬 | 색은 4절 |
| add-icon | ○ | "+" 표시. 라벨과 같은 글자 크기·색. 장식이라 `aria-hidden="true"`(글자로 넣으면 `<span aria-hidden="true">`) | 라벨과 같음(4절) |
| add-label | ○ | 보이는 이름(예: "복수/부전공", "프로젝트 추가하기") | `raw:14px/400` |
| item-field | ○ | 추가된 입력. `components/text-field.md` single-line full을 그대로 씀(모양·상태·라벨 축소·오류) | `components/text-field.md` 2·4절 |
| remove-button | ○ | `<button type="button">` 글자 버튼 "삭제". 입력 필드 오른쪽, 간격 `spacing.3` (12px) | `raw:14px/400`, 색은 4절 |

- 위치: add 행은 위 필드 아래 왼쪽, remove-button은 추가된 입력 필드 오른쪽(데스크톱·모바일 같음)

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| default | add 행 + 추가된 항목 행 | 코드 `src/widgets/apply/ui/personal-info-section.tsx`, Figma 5188:454 |

- 두 Figma 세트의 관계
  - 5188:454(텍스트 필드 인터렉션 안, Default·Hover·Active·Active_Hover·Active_Focus 5종, 아이콘 사용): 인터랙션 정의. 라이브(코드)에 없는 상태·삭제 버튼 위치의 기준
  - 2009:4216(지원 폼 안, Default·Variant2 2종, "+ " 글자 사용, 화면 인스턴스 20곳)과 2007:3438: 이전 판. 글자색 #999999만 이 명세에 반영함(4절)
  - 새 세트로 교체됨: 최신 지원 폼 화면(Figma 8801:6105 "복수/부전공")이 새 세트 5188:453을 쓰고, 같은 화면의 이전 판(8801:6037)만 2007:3438을 씀. 모바일 화면 4곳(6454:7341 등)은 아직 구 세트로 미갱신

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| add 행 | 글자 폭 × 14, 누르는 영역 높이 24 | 데스크톱과 같음 | — | 0 | `raw:14px/400` | 코드 `src/widgets/apply/ui/personal-info-section.css.ts`, 코드 `src/widgets/apply/ui/question-section/question-section.css.ts` |
| 추가된 항목 행 | 부모 폭 | 부모 폭 | — | `components/text-field.md` full과 같음, 입력–삭제 gap `spacing.3` (12px) | `components/text-field.md` full과 같음 | 코드 `src/widgets/apply/ui/personal-info-section.css.ts` |
| remove-button | 글자 폭 × 14, 누르는 영역 24×24 이상 | 데스크톱과 같음 | — | 0 | `raw:14px/400` | 코드 `src/widgets/apply/ui/personal-info-section.css.ts` |

- 값 기준(2026-10-22 라이브 기준으로 정정): 지원서 화면은 모집 기간이 아니라 라이브에서 볼 수 없어 frontend 코드 값을 라이브 값으로 씀(add 행·삭제 버튼의 모양·글자·색·hover). 코드에 없는 것(프로젝트 행 삭제, 포커스 이동, press·focus-visible)은 Figma 값·추정값. 이전 Figma 값(행 800×60·342×56, 18 Regular, 아이콘 24px, hover 바탕 #0D0D0D)은 기록용
- 행 사이 간격: 위 필드와 add 행 `spacing.5` (20px)(코드 section gap 32 − 위 여백 12), 추가된 항목 행끼리 `spacing.8` (32px)(코드 section gap)
- 최대 개수: 화면이 정함(복수/부전공 3개). 최대에 도달하면 add 행을 숨김(4절)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임. fg는 글자·아이콘 색.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### add 행

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / label·icon `color.fg.muted` (#999999) / — | — / label·icon `color.fg.default` (#FFFFFF) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/widgets/apply/ui/personal-info-section.css.ts`(rest·hover), Figma 없음(추정, press·focus-visible, 라이브 없음) |

- rest 라벨색: 라이브(코드) `color.fg.muted` (#999999). Figma 새 세트 #666666(5188:452)·아이콘 #333333(5773:9630)은 기록용
- hover: 라이브(코드)는 글자색만 흰색으로 바뀌고 바탕 없음. Figma hover 바탕 #0D0D0D(5775:9656)에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)
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
| default | — / `color.fg.muted` (#999999) / — | — / `color.palette.gray.100` (#E6E6E6) / — | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/widgets/apply/ui/personal-info-section.css.ts`(rest·hover), Figma 없음(추정, press·focus-visible, 라이브 없음) |

- 삭제: 라이브(코드) "삭제" 글자 버튼 #999999, hover #E6E6E6. Figma 빼기 아이콘 #666666·hover 빨강(5755:10061, 5755:10063)에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)
- 추가된 모든 행에 remove-button을 둠. 프로젝트 추가 행은 코드에 삭제 버튼이 없어 Figma(5188:454 Active 계열 모두 삭제 포함)를 따름

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
- 최대 개수: 화면이 정함(복수/부전공 3개). 최대에 도달하면 add 행을 숨김
- 비동기 중 동작: 해당 없음(4절)

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| color(add 행) | 0.2s | ease-in-out | design-reference 4.3 |
| color(remove-button) | 0.2s | ease-in-out | design-reference 4.3 |
| 추가된 항목 행 | `components/text-field.md` 5절과 같음 | — | Figma 없음(추정) |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)
- 행이 생기고 지워질 때 높이 애니메이션은 두지 않음(Figma 없음(추정))

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 크기·글자·위치: 데스크톱과 같음(코드에 모바일 변경 없음, 2026-10-22 라이브 기준으로 정정)
  - 추가된 항목 행: `components/text-field.md` 6절
- Figma 모바일 노드(기록용. 라이브 값과 다름): 세트 Figma 7578:14703(Default 7578:14704, Hover 7578:14707, Active 7578:14710, Active_Hover 7578:14714, Active_Focus 7578:14718)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | add 행·remove-button은 `<button type="button">`. 추가된 입력은 `<input>` + `<label>`(text-field 명세) | Figma 없음(추정) |
| 키보드 | Tab으로 각 버튼·입력 이동, Enter·Space 실행. 추가 후 새 입력으로, 삭제 후 5절 순서로 포커스 이동 | Figma 없음(추정) |
| aria | add 행 이름은 보이는 라벨("복수/부전공"). "+" 표시는 `aria-hidden="true"`. remove-button은 보이는 글자 "삭제"에 더해 `aria-label="{항목 이름} {번호} 삭제"`(예: "복수/부전공 2 삭제"). 삭제 결과는 `role="status"`로 알림 | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, UI 요소 3:1(배경 검정 캔버스 #000000)<br>add 라벨·"+": rest #999999 7.37, hover #FFFFFF 21.00<br>remove-button 글자: rest #999999 7.37, hover #E6E6E6 16.83<br>추가된 항목 행: `components/text-field.md` 7절 대비 행 | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 최소 24×24: add 행·remove-button은 겉 높이 14(글자 높이)를 유지하고 위아래 `raw:5px` 투명 `padding` + 같은 크기 음수 margin으로 누르는 영역 높이를 24로 넓힘. remove-button 글자 "삭제"가 24보다 좁으면 좌우도 같은 방식으로 24까지 넓힘(2026-10-23 결정, ADOPT-03-21)<br>모바일 권장 44×44: 모두 미달 | WCAG 2.2 2.5.8 |
| 포커스 링 | add 행·remove-button: outline 2px, offset 2px, `color.stroke.focus` (#68CBEC) 11.34:1. 추가된 입력은 text-field 규칙(보더·label 색, outline 없음) | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음. 최대 개수 도달 시 add 행을 숨김(4절) | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| add 행·삭제는 `<button type="button">` | `<div onClick>`, `type` 없는 `<button>`(폼 제출 발생) |
| 삭제 버튼에 `aria-label="{항목 이름} {번호} 삭제"` | 아이콘만 두고 이름 없음, 모든 삭제 버튼 이름을 "삭제"로 같게 둠 |
| 추가 후 새 입력으로, 삭제 후 이웃 입력으로 포커스 이동 | 삭제 후 포커스를 문서 처음으로 잃음 |
| add 라벨 rest `color.fg.muted` | 검정 위 #666666 14 Regular 글자(3.66:1) |
| 삭제 hover는 글자색만 `color.palette.gray.100`으로 | 행 전체를 빨강으로 바꿔 오류처럼 보이게 함 |
| "+" 표시는 `aria-hidden="true"`로 이름에서 뺌 | 라벨 글자에 "+ " 기호를 그대로 넣어 화면 읽기 프로그램이 "더하기"로 읽음 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/apply/ui/personal-info-section.tsx`, `src/widgets/apply/ui/personal-info-section.css.ts`, `src/widgets/apply/ui/question-section/question-section.tsx`, `src/widgets/apply/ui/question-section/question-section.css.ts` | 공용 컴포넌트 없음. 화면마다 직접 구현<br>- 복수/부전공: `addDegree`(add 행, 최대 3개), `degreeRow` + `removeDegreeButton`("삭제" 글자 버튼)<br>- 프로젝트: `addProject`("+ 프로젝트 추가하기"), 추가된 행 삭제 없음 |
| frontend 차이 | 위와 같음 | ADOPT-03-21에서 고침. 명세와 다른 점(라이브 값을 명세로 채택한 add 글자·크기·hover, 삭제 글자 버튼·hover 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- add 행: `<div onClick>`(명세 `<button type="button">`), 키보드로 실행 불가<br>- add 글자: "+ " 기호가 이름에 포함됨(명세 `aria-hidden="true"`)<br>- 삭제: `aria-label` 없음(모든 삭제 버튼 이름이 "삭제")<br>- 프로젝트 추가 행: 삭제 버튼 없음<br>- 포커스: 추가·삭제 후 이동 없음, 전역 `outline: none`(ADOPT-01-03)<br>- 누르는 영역 높이 14(글자 높이) → 위아래 `raw:5px` padding + 음수 margin으로 24(2026-10-23 결정) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. 관리자 콘솔 출석 이벤트 빠른 추가는 형태가 달라 이 명세 대상 아님. 입력은 ADOPT-07-03(2026-10-22 확인) |
| FE 이름 ↔ 명세 이름 | 위와 같음 | `addDegree`·`addProject` ↔ add 행. `degreeRow` ↔ 추가된 항목 행. `removeDegreeButton` ↔ remove-button |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:14px/400` | add 라벨·remove-button 글자. `typography.text-1`은 14/300 | 코드 `src/widgets/apply/ui/personal-info-section.css.ts` | 필요 여부 별도 이슈 |
| `raw:5px` | add 행·remove-button 누르는 영역 위아래 확장(padding + 음수 margin) | Figma 없음(추정) | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- add 행·remove-button의 press, 모든 focus-visible: Figma 없음(추정)
  - Figma 추정(약): press 없음. 추가된 행 입력 포커스는 Active_Focus(5775:9707, 보라 아래 보더, label 14 Light 보라). close 세트 5755:10062는 Default·Hover(5755:10063, #F96466)만 있음
- 삭제 확인 없음·삭제 후 포커스 순서·`role="status"` 알림: Figma 없음(추정)
  - Figma 추정(약): Active 5775:9680의 close 클릭 → 바로 Default(5188:453)로 돌아가 삭제 확인 없음. 포커스·알림은 추정 유지
