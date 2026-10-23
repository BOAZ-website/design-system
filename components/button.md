---
id: button
name_ko: 버튼
ticket: COMPONENT-01
tier: P0
status: review
figma:
  - "5875:9827"
  - "2897:6164"
  - "2682:2297"
  - "7064:14053"
  - "8103:17024"
  - "8103:17107"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-23
---

# 버튼 (button)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 동작 실행(제출·이동·신청)을 일으키는 클릭 요소
- 구성: variant 5종(brand·neutral·glass·text-link·outlined)
- 사용 화면: 전 화면(지원서 제출·약관 동의, 리크루팅 히어로, 트랙 카드, FAQ 문의, 사전 알림 신청, 컨퍼런스 상세, 탭바)
- 관련 명세: `components/modal.md`(모달 안 버튼, COMPONENT-07), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<button>` 또는 `<a href>`. 바탕·radius·패딩·크기 | 3·4절 |
| label | ○ | 한 줄 글자. 라벨은 보이는 이름과 같음 | `typography.body-2`, `typography.body-3`, `typography.body-2-mobile`, `typography.headline-3`, 3절 `raw:` 값 |
| icon-start | × | 아이콘. 카카오톡 문의(brand-small + 아이콘) 20px·모바일 16px, outlined 임시저장 20px(라이브·코드, 2026-10-22 라이브 기준으로 정정). brand-pill-lg 250×56은 Figma 24px | `color.fg.on-brand` (#FFFFFF), `color.fg.default` (#FFFFFF) |
| icon-end | × | 화살표. neutral-md(자세히 보기), text-link에 사용 | `color.fg.on-inverse` (#000000), `color.fg.default` (#FFFFFF) |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| brand | 주 동작(제출·신청·지원하기). 보라 바탕 | Figma 5188:8826, Figma 5875:9828, Figma 5252:5632, Figma 5639:10028 |
| neutral | 보조 큰 동작(자세히 보기 등). 흰 바탕, 검정 글자 | Figma 5152:9048, Figma 5915:9776 |
| glass | 탭바 지원하기. 반투명 바탕 | Figma 5239:3922, Figma 7064:9879 |
| text-link | 이전·다음 이동. 바탕 없음. 24px Bold 글자 + 화살표 | Figma 5152:8869, Figma 5411:9043 |
| outlined | 보조 동작(지원서 임시저장). 바탕 없음, 회색 1px 보더 | Figma 8103:17024, Figma 8103:17107 |

- outlined: Figma 버튼 세트에는 없고 login&save 페이지의 임시저장 버튼 프레임(컴포넌트 아님)에 있음. 시안 프레임 Figma 8103:17027, Figma 8103:17028

### Sizes

- size 이름은 이 명세가 붙인 이름임: variant 이름 + 형태 또는 크기 단계
- wide: 가로로 긴 버튼. pill: 모서리가 완전히 둥근 알약형
- lg·md·small: 크기 단계
- frontend 코드 이름과의 대응은 9절

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| brand-wide | 부모 폭 100% × 65 | 데스크톱과 같음 | `raw:10px` | `raw:19.5px` / 0 | `typography.headline-3` | 코드 `src/shared/components/button/button.css.ts` |
| brand-pill-lg | 250×56 | — | `radius.full` (40px) | `spacing.5` (20px) / `raw:28px`, gap `raw:10px` | `typography.body-2` | Figma 5252:5632, Figma 5252:5631, Figma 5252:5630, Figma 5252:5629 |
| brand-pill-md | 191×54 | 91×28 | `radius.full` (40px) | `spacing.4` (16px) / `raw:38px`, 모바일 `spacing.2` (8px) / `spacing.4` (16px) | `typography.body-2` / 모바일 `raw:10px/400` | 코드 `src/shared/components/button/button.css.ts` |
| brand-small | 131×42 | 115×36 | `radius.full` (40px) | `raw:11px` / `raw:33.5px`, 모바일 `raw:9px` / `raw:29px` | `typography.body-3` / 모바일 `raw:16px/700` | 코드 `src/shared/components/button/button.css.ts` |
| brand-small + 아이콘 | 226×44 | 198×40 | `radius.full` (40px) | `raw:11px` / `raw:33.5px`, 아이콘 20px(모바일 16px) | `typography.body-3`(모바일 같음) | 코드 `src/shared/components/button/button.css.ts`, 코드 `src/widgets/faq/ui/faq-title-section.tsx` |
| neutral-lg | 250×68 | — | `radius.sm` (12px) | `raw:21px` / `raw:33px`, gap `spacing.5` (20px) | `typography.body-2` | Figma 5152:9048 |
| neutral-md | 부모 폭 × 70(측정 458×70) | 부모 폭 100% × 28(측정 350×28) | `raw:10px` / 모바일 `raw:4px` | `raw:22px` / `raw:37px`, 모바일 `raw:9px` / `raw:22px`, gap `raw:10px` | `typography.body-2` / 모바일 `raw:8px/700` | 코드 `src/shared/components/button/button.css.ts` |
| glass | 154×44 | 132×40 | `radius.full` (40px) | `raw:13px` / `raw:51px` / `raw:12px` / `raw:47px` / 모바일 0(고정 크기, 가운데 정렬) | `typography.body-2-mobile` | Figma 5239:3922, Figma 7064:9879(라이브 없음) |
| text-link | 글자 폭 × 24 | 글자 폭 × 16, 누르는 영역 높이 24 | — | gap `spacing.2` (8px) | `typography.headline-3` / 모바일 `typography.body-5` | 코드 `src/widgets/apply/ui/question-section/question-section.css.ts` |
| neutral-md-wide | — | 160×52 | `radius.sm` (12px) | `raw:21px` / `raw:33px` | 모바일 `typography.body-2-mobile` | Figma 7225:13942(라이브 없음) |
| outlined | 고정 없음(높이 41 = 패딩 10×2 + 아이콘 20 + 보더 0.5×2) | 데스크톱과 같음 | `radius.full` (40px) | `raw:10px` / `spacing.4` (16px), gap `raw:10px`, 아이콘 20px | `typography.body-3` | 코드 `src/shared/components/button/button.css.ts`, 코드 `src/widgets/apply/ui/apply-title-section.tsx` |

- 값 기준(2026-10-22 라이브 기준으로 정정): 라이브 사이트에 있는 버튼은 라이브 값(= frontend 코드 값), 라이브에 없는 버튼(brand-pill-lg·neutral-lg·glass·neutral-md-wide)은 Figma 값. 지원서 화면(brand-wide·text-link·outlined)은 모집 기간이 아니라 라이브에서 볼 수 없어 frontend 코드 값을 라이브 값으로 씀
- 높이: 표의 값으로 고정함. 코드 높이 = 위아래 패딩 + 글자 크기(행간 `raw:1.0`) + 투명 보더 1px×2. 측정값과 같음
- 행간: 코드 글자 스타일은 모두 행간 `raw:1.0`(글자 크기와 같음). 표의 typography 토큰은 크기·굵기만 같고 행간은 다름(10절)
- padding 값 순서: 2개는 세로 / 가로, 4개는 위 / 오른쪽 / 아래 / 왼쪽(CSS 순서)
- 라이브 사용처(2026-10-22 측정, 데스크톱 1200px / 모바일 390px)
  - brand-small: 리크루팅 히어로·트랙 카드 "지원하기"(모집 기간 아님, disabled 표시)
  - brand-small + 아이콘: FAQ "카카오톡 문의하기". 모바일 크기 옵션(`responsive`)을 쓰지 않아 모바일도 18/700
  - brand-pill-md: "사전 알림 신청"
  - neutral-md: 컨퍼런스 "자세히 보기"(아이콘 포함). 모바일 8/700은 코드 값
- 사각 radius: 라이브 10px. `radius.sm` (12px)과 달라 `raw:10px`으로 적음(2026-10-22 라이브 기준으로 정정. 이전에는 design-reference 3.1 결정으로 12 통일)
- brand-small 글자: 라이브 18 Bold(`typography.body-3`). 이전 결정(COMPONENT-01-03, 대비 근거로 20 Bold)은 되돌림. 흰 글자 4.18:1로 큰 글자 기준(18.67px) 미달, 7절 알려진 미달(2026-10-22 라이브 기준으로 정정)
- glass 154×44의 radius: 5239:3921과 design-reference 5.2에 따라 `radius.full` (40px)
- 검색 Tag 버튼 mini(97×43): 옛 시안 요소라 size로 두지 않음(`components/tag.md` 3절 끝)
- glass(탭바 지원하기): 라이브 화면에 없어 Figma 값을 씀. 글자 Figma 16 SemiBold(Figma 5239:3921, Figma 5239:3923, 헤더 탭바 Figma 1866:4188). 데스크톱 전용 16/600 토큰이 없어 `typography.body-2-mobile` (16/600)을 씀
  - 라이브 glass 효과(어두운 그라데이션 + 테두리 하이라이트, 코드 `src/shared/styles/glass.css.ts`)는 커리큘럼 박스(코드 `src/shared/components/curriculum-box/curriculum-box.tsx`)용이며 탭바 glass 버튼과 다른 값임. 커리큘럼 박스는 이 저장소 컴포넌트 명세 대상이 아님(`docs/wbs/30-component.md` 범위 밖 페이지 전용 조각)
- glass 모바일 132×40: auto layout 패딩 0·gap 0, 고정 크기에 글자 가운데 정렬(Figma 7064:9879)
- neutral-lg 250×68: 아이콘 없음. 세 변형(Default·Variant2·Variant3) 모두 글자 하나뿐(Figma 5152:9048)
- 최종 리크루팅 하단 링크(커리큘럼 보러가기): 라이브 226×62(모바일 146×49), radius 10, 흰 바탕, 20/700 검정(모바일 16/600). 버튼 컴포넌트가 아니라 탭 box 스타일 재사용(`components/tab.md`)
- outlined 보더: 라이브 0.5px #FFFFFF(아이콘 있는 small-round 조합 값). Figma는 0.5px #999999(2026-10-22 라이브 기준으로 정정)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### brand

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.brand-solid` (#7A64F9) / `color.fg.on-brand` (#FFFFFF) / — | `color.bg.brand-solid-hover` (#493C95) / `color.fg.on-brand` (#FFFFFF) / — | `color.bg.brand-solid-press` (#2C2459) / `color.fg.muted` (#999999) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/shared/components/button/button.css.ts`(rest·hover), Figma 5875:9833(press, 라이브 없음), Figma 없음(추정, focus-visible, 라이브 없음) |
| disabled | `color.palette.gray.400` (#999999) / `color.fg.on-brand` (#FFFFFF) / — | — | — | — | 코드 `src/shared/components/button/button.css.ts` |

- "지원하기" 활성 조건(라이브): `GET /api/v1/recruitment/status` 응답 `is_active`가 true면 brand, false면 disabled. 마감일은 `GET /api/v1/recruitment/deadline`으로 받음. 근거 코드 `src/widgets/recruiting/ui/apply-section/apply-section.tsx`(트랙 카드에 `isActive` 전달), 코드 `src/widgets/recruiting/ui/recruiting-hero-section/recruiting-hero-section.tsx`
- brand disabled: 라이브 회색 #999999 바탕 + 흰 글자(리크루팅 "지원하기", 모집 기간 아님). Figma `color.bg.disabled` (#666666) / `color.fg.disabled` (#999999)에서 라이브 값으로 바꿈(2026-10-22 라이브 기준으로 정정)

### neutral

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.neutral-solid` (#FFFFFF) / `color.fg.on-inverse` (#000000) / — | `color.palette.gray.100` (#E6E6E6) / `color.fg.on-inverse` (#000000) / — | `color.bg.neutral-solid-press` (#666666) / `color.fg.on-inverse` (#000000) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px<br>흰 표면 위: `color.stroke.focus-inverse` (#7A64F9) | 코드 `src/shared/components/button/button.css.ts`(rest·hover), Figma 5164:8774(press, 라이브 없음), Figma 없음(추정, focus-visible, 라이브 없음) |
| disabled | `color.palette.gray.800` (#333333) / `color.fg.on-inverse` (#000000) / — | — | — | — | 코드 `src/shared/components/button/button.css.ts` |

- neutral hover: 라이브 #E6E6E6. Figma `color.bg.neutral-solid-hover` (#999999)에서 라이브 값으로 바꿈(2026-10-22 라이브 기준으로 정정)

### glass

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `raw:rgba(208,207,249,0.1)` / `color.fg.default` (#FFFFFF) / — | rest 바탕 + 그라데이션 2겹 `raw:linear-gradient`(10절) / `color.fg.default` (#FFFFFF) / — | hover 값 유지 / `color.fg.default` (#FFFFFF) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5239:3921, Figma 5239:3923, Figma 없음(추정, press·focus-visible). 탭바 glass 버튼은 라이브 없음 |
| disabled | rest 바탕 유지 / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

### text-link

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.default` (#FFFFFF) / — | — / `color.fg.default` (#FFFFFF), 불투명도 `raw:0.7` / — | — / `color.palette.gray.600` (#666666) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/widgets/apply/ui/question-section/question-section.css.ts`(rest·hover), Figma 5411:9049(press, 라이브 없음), Figma 없음(추정, focus-visible, 라이브 없음) |
| disabled | — / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정, 라이브 없음) |

- text-link hover: 코드 불투명도 0.7(검정 위 #B3B3B3로 보임). Figma `color.fg.muted` (#999999)에서 코드 값으로 바꿈(2026-10-22 라이브 기준으로 정정)

### outlined

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.default` (#FFFFFF) / `color.palette.gray.0` (#FFFFFF) 0.5px | `color.palette.gray.900` (#1A1A1A) / `color.fg.default` (#FFFFFF) / `color.palette.gray.0` (#FFFFFF) 0.5px | hover 값 유지 | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | 코드 `src/shared/components/button/button.css.ts`(rest·hover), Figma 없음(추정, press·focus-visible, 라이브 없음) |
| disabled | rest 유지 | — | — | — | 코드 `src/shared/components/button/button.css.ts` |

- outlined disabled: 코드는 저장 중·저장 완료 동안 `disabled`를 걸지만 비활성 스타일이 없어 rest와 같게 보임. 라벨이 "저장 중..."·"저장 완료 ✓"로 바뀌어 상태를 알림(2026-10-22 라이브 기준으로 정정)

- 포커스 링
  - 흰 표면(모달) 위 모든 variant: `color.stroke.focus-inverse` (#7A64F9)
  - 트리거: `:focus-visible`
  - outline은 요소 밖(offset 2px)에 그림
  - 버튼 안쪽 링은 보라 바탕 위 2.26:1로 기준 미달이라 쓰지 않음
  - 라이브는 전역 `outline: none`으로 포커스 표시가 없음(코드 `src/shared/styles/global.css.ts`). Figma에도 Focus 상태가 없음. (2026-10-23 결정) 모든 focus-visible은 `color.stroke.focus` 정책(ADOPT-01-03)으로 확정함. 근거 `patterns/accessibility.md` 2.2 "ADOPT에서 고칠 항목"
- 비동기 상태(pending, 요청 처리 중): `Figma 없음(추정)`
  - 바탕: `color.bg.brand-solid-hover` (#493C95) 고정
  - hover·press 색 변화 없음
  - 커서: `cursor: progress`
  - 라벨 유지. 나머지 규칙은 5절
- selected·invalid·completed 행은 두지 않음. 버튼의 상태가 아니기 때문임
  - 선택: 탭·라디오가 담당
  - 유효성: 입력 필드가 담당
  - 완료: 결과 메시지가 담당

## 5. Behavior

- 요소 선택
  - 같은 페이지 동작: `<button>`
  - URL 이동: `<a href>`(버튼 스타일 적용)
  - 지원서 단계의 이전·다음: 같은 페이지 동작이므로 `<button>`
- 클릭·탭
  - 포인터 up에서 실행(WCAG 2.5.2)
  - 터치에서는 hover 색을 적용하지 않음
- 키보드: `<button>`은 Enter·Space, `<a>`는 Enter로 실행
- 포커스 이동·복귀
  - 실행 후 포커스를 버튼에 유지함
  - 흰 표면(모달) 위 버튼의 포커스 링: `color.stroke.focus-inverse` (#7A64F9)
- 비동기 중 동작(중복 제출 방지, `aria-busy`)
  - `aria-busy="true"`를 설정함
  - 클릭 처리 함수(핸들러)에서 중복 실행을 막음
  - disabled로 바꾸지 않음(포커스 소실 방지)
  - 라벨을 바꾸지 않음
  - 버튼 밖 `role="status"` 영역에 "제출 중"·"완료"를 알림
  - 실패 시 rest로 돌아가고 `role="alert"`로 알림
- 비활성
  - 네이티브 `disabled` 사용
  - 비활성 사유를 화면에 표시

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color | 0.2s | ease-in-out | design-reference 4.3 |
| opacity(text-link) | 0.2s | ease | 코드 `src/widgets/apply/ui/question-section/question-section.css.ts` |
| background(glass) | 0.2s | ease-in-out | design-reference 4.3 |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성(코드 `responsive` 옵션을 켠 버튼만. 2026-10-22 라이브 기준으로 정정)
  - 크기·글자: 3절 Sizes의 모바일 열
  - brand-small: 16/700, 패딩 9 / 29
  - brand-pill-md: 10/400, 패딩 8 / 16
  - neutral-md: 8/700, 패딩 9 / 22, radius `raw:4px`, 폭 100%
  - 카카오 문의(brand-small + 아이콘)는 옵션을 켜지 않아 18/700 유지, 아이콘만 16px
  - text-link: 16/400(`typography.body-5`). 겉 높이 16은 유지하고 위아래 `raw:4px` 투명 `padding` + 같은 크기 음수 margin으로 누르는 영역 높이를 24로 넓힘(2026-10-23 결정, ADOPT-03-09)
- Figma 모바일 노드(라이브에 없는 버튼의 기준)
  - 프레임: Figma 7064:14053
  - glass 132×40: Figma 7064:9879
  - neutral 160×52: Figma 7225:13942
  - 라이브 값으로 바뀐 Figma 노드(기록용): brand 112×36 Figma 7142:13884, brand 342×52 Figma 7578:9582, neutral 160×44 Figma 7289:14366

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 동작은 `<button>`, URL 이동은 `<a href>`. `<div onClick>`·`<a role="button">` 금지 | design-reference 5.1 |
| 키보드 | Tab으로 포커스, Enter·Space(button) / Enter(a)로 실행 | Figma 없음(추정) |
| aria | 이름은 보이는 라벨과 같음. 아이콘 전용은 `aria-label`. 장식 아이콘·화살표는 `aria-hidden="true"`. pending은 `aria-busy="true"` | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자(Bold 18.67px 이상 또는 Regular 24px 이상)·UI 요소 3:1<br>brand: rest 흰 글자 4.18, hover 8.88, press 4.90. 큰 글자 통과는 brand-wide(24/700)·brand-pill-md 데스크톱(20/700)뿐<br>brand 알려진 미달(4.18 < 4.5): brand-small 18/700(데스크톱·카카오 모바일), brand-small 모바일 16/700, brand-pill-md 모바일 10/400<br>neutral: rest 21.00, hover 16.83, press 3.66(큰 글자만 해당). 모바일 neutral-md 8/700 press 3.66 미달<br>glass: rest 흰 글자 약 18.2(검정 캔버스에 합성한 #151519 기준), hover 그라데이션 위는 미계산<br>text-link: rest 21.00, hover 10.02(불투명도 0.7, #B3B3B3 상당), press 3.66(데스크톱 24px Bold 큰 글자 통과, 모바일 16/400 미달)<br>outlined: 흰 글자·흰 보더 대 검정 캔버스 21.00, hover #1A1A1A 위 흰 글자 17.40<br>disabled: brand #999999 위 흰 글자 2.85, neutral #333333 위 검정 글자 1.66. WCAG 1.4.3 비활성 예외<br>알려진 미달은 `patterns/accessibility.md` 2.2 표에 모음(2026-10-22 라이브 기준으로 정정) | 직접 계산(2026-10-22), `docs/wbs/20-token.md` 대비표 |
| 터치 영역 | 최소 24×24: 모바일 text-link는 겉 높이 16에 위아래 `raw:4px` padding + 음수 margin으로 누르는 영역 24 확보(2026-10-23 결정), 그 외 통과<br>모바일 권장 44×44: brand-small 115×36, 카카오 198×40, brand-pill-md 91×28, neutral-md 높이 28, glass 132×40이 미달 | WCAG 2.2 2.5.8 |
| 포커스 링 | 굵기 2px, offset 2px<br>검정 캔버스 위: `color.stroke.focus` (#68CBEC) 11.34:1<br>흰 표면 위: `color.stroke.focus-inverse` (#7A64F9) 4.18:1<br>보라 버튼 안쪽 링: 2.26:1로 기준 미달 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 네이티브 `disabled`. 색만으로 구분하지 않고 비활성 사유를 화면에 표시 | Figma 5188:8718 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| brand 글자는 3절 표의 크기·굵기 그대로 씀. 18px 이하는 대비 미달로 기록(7절) | 표에 없는 글자 스타일(`typography.body-2-regular` 등)을 brand에 사용 |
| 포커스 링 offset 2px, 흰 표면 위는 `color.stroke.focus-inverse` | 보라 버튼 안쪽에 링 그리기, 흰 표면 위에 `color.stroke.focus` 사용 |
| URL 이동은 `<a href>`, 동작은 `<button>` | `<div onClick>`, `<a role="button">` |
| 제출 중: `aria-busy` 설정, 중복 실행 방지, 라벨 유지 | disabled로 바꿔 포커스를 잃게 함, 라벨을 "신청 중..."으로 교체 |
| 아이콘 전용 버튼에 `aria-label` | 이름이 빈 버튼 |
| 비활성은 `disabled` + 사유 표시 | 색만 회색으로 바꿈 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/button/button.tsx`, `src/shared/components/button/button.css.ts` | 네이티브 `<button>` 사용<br>`preset="<variant>_<color>"` 11종. 앞 값 variant: wide, large, large-round, medium, medium-round, small-round, mini. 뒤 값 color: primary, outlined, white, glass<br>`hasIcon`: 아이콘 표시<br>`responsive`: 모바일 크기 적용(기본값 꺼짐)<br>사용 중 preset<br>- `wide_primary`: 지원서 제출·약관 동의 다음<br>- `small-round_primary`: 리크루팅 히어로·트랙 카드·FAQ 문의<br>- `small-round_outlined`: 지원서 임시저장<br>- `medium-round_primary`: 사전 알림 신청<br>- `medium_white`: 컨퍼런스 자세히 보기<br>`medium-icon_white`: 타입에만 있고 css·호출부 없음 |
| frontend 차이 | 위와 같음 | 수정 예정(ADOPT-03). 명세와 다른 점(라이브 값을 명세로 채택한 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- 포커스: `:focus-visible` 없음, 전역 `outline: none`<br>- press: `:active` 없음<br>- disabled: glass 없음<br>- glass 바탕: 검정 그라데이션(명세는 Figma rgba 0.1. 탭바 glass 버튼은 라이브에 없음)<br>- text-link: `widgets/apply/ui/question-section/`의 `<div onClick>`<br>- pending: notice-form이 disabled + 라벨 교체("신청 중...")<br>- text-link 모바일: 누르는 영역 높이 16 → 위아래 `raw:4px` padding + 음수 margin으로 24(2026-10-23 결정, ADOPT-03-09) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-02(버튼), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/button/button.tsx` | wide ↔ brand-wide(부모 폭 100%). large-white(large+white) ↔ neutral-lg 250×68. medium-white ↔ neutral-md(`hasIcon`으로 아이콘 표시). medium-icon_white ↔ neutral-md + 아이콘(타입에만 있음). medium-primary ↔ brand 사각(Figma 없음, 추정). large-round ↔ brand-pill-lg 250×56. medium-round ↔ brand-pill-md 191×54. small-round ↔ brand-small 131×42 / glass 154×44(`small-round_glass`). mini ↔ 명세에 없음(옛 검색 Tag 버튼, `components/tag.md` 3절 끝). small-round_outlined ↔ outlined |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:10px` | 사각 버튼 radius(brand-wide·neutral-md), 아이콘·화살표 gap | 코드 `src/shared/components/button/button.css.ts` | 필요 여부 별도 이슈(`radius.sm` 12px과 다름. 2026-10-22 라이브 기준으로 정정) |
| `raw:4px` | neutral-md 모바일 radius | 코드 `src/shared/components/button/button.css.ts` | 불필요(1곳) |
| `raw:19.5px` | brand-wide 위아래 패딩 | 코드 `src/shared/components/button/button.css.ts` | 불필요 |
| `raw:38px` | brand-pill-md 좌우 패딩 | 코드 `src/shared/components/button/button.css.ts` | 불필요 |
| `raw:11px`, `raw:33.5px`, `raw:9px`, `raw:29px` | brand-small 패딩(데스크톱·모바일) | 코드 `src/shared/components/button/button.css.ts` | 불필요 |
| `raw:22px`, `raw:37px`, `raw:9px` | neutral-md 패딩(데스크톱·모바일) | 코드 `src/shared/components/button/button.css.ts` | 불필요 |
| `raw:28px` | brand-pill-lg 좌우 패딩 | Figma 5252:5632 | 불필요 |
| `raw:21px`, `raw:33px` | neutral-lg·neutral-md-wide 패딩 | Figma 5152:9048 | 불필요 |
| `raw:13px`, `raw:12px`, `raw:51px`, `raw:47px` | glass 패딩 | Figma 5239:3921 | 불필요 |
| `raw:16px/700` | brand-small 모바일 글자(`typography.body-2-mobile`은 16/600) | 코드 `src/shared/components/button/button.css.ts` | 필요 여부 별도 이슈 |
| `raw:10px/400` | brand-pill-md 모바일 글자 | 코드 `src/shared/components/button/button.css.ts` | 필요 여부 별도 이슈(10px 글자 토큰 없음) |
| `raw:8px/700` | neutral-md 모바일 글자 | 코드 `src/shared/components/button/button.css.ts` | 필요 여부 별도 이슈(8px 글자 토큰 없음) |
| `raw:1.0` | 버튼 글자 행간(글자 크기와 같음). typography 토큰 행간과 다름 | 코드 `src/shared/styles/font.css.ts` | 필요 여부 별도 이슈 |
| `raw:0.7` | text-link hover 불투명도 | 코드 `src/widgets/apply/ui/question-section/question-section.css.ts` | 불필요 |
| `raw:0.5px` | outlined 보더 굵기 | 코드 `src/shared/components/button/button.css.ts` | 불필요 |
| `raw:rgba(208,207,249,0.1)` | glass rest 바탕 | Figma 5239:3921 | 필요(탭바 COMPONENT-07 등과 함께 판단) |
| `raw:linear-gradient`(#7A64F9 → 투명 #999999, 투명 #666666 → #6498F9, 각 불투명도 0.2) | glass hover 오버레이 2겹 | Figma 5239:3923 | 필요(glass 값과 함께 판단) |
| 20px, 16px | 카카오 문의·outlined 아이콘 크기 | 코드 `src/widgets/faq/ui/faq-title-section.tsx`, 코드 `src/widgets/apply/ui/apply-title-section.tsx` | 불필요 |
| 24px | brand-pill-lg 아이콘 크기 | Figma 5252:5632 | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| `raw:4px` | text-link 모바일 누르는 영역 위아래 확장(padding + 음수 margin) | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |
| 0.2s ease | text-link 불투명도 전환 | 코드 `src/widgets/apply/ui/question-section/question-section.css.ts` | 불필요 |
| `cursor: progress` | pending | Figma 없음(추정) | 불필요 |

## 11. 미확인

- 해당 없음.
