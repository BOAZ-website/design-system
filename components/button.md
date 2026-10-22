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
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
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
- 구성: variant 4종(brand·neutral·glass·text-link)
- 사용 화면: 전 화면(지원서 제출·약관 동의, 리크루팅 히어로, 트랙 카드, FAQ 문의, 사전 알림 신청, 컨퍼런스 상세, 탭바)
- 관련 명세: `components/modal.md`(모달 안 버튼, COMPONENT-07), `components/tag.md`(검색 Tag 97×43, COMPONENT-13), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<button>` 또는 `<a href>`. 바탕·radius·패딩·크기 | 3·4절 |
| label | ○ | 한 줄 글자. 라벨은 보이는 이름과 같음 | `typography.body-2`, `typography.body-2-mobile`, `typography.headline-3` |
| icon-start | × | 24px 아이콘(카카오톡). brand-pill-lg 250×56에 사용 | `color.fg.on-brand` (#FFFFFF) |
| icon-end | × | 24px 화살표. neutral-md 200×68, text-link에 사용 | `color.fg.on-inverse` (#000000), `color.fg.default` (#FFFFFF) |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| brand | 주 동작(제출·신청·지원하기). 보라 바탕 | Figma 5188:8826, Figma 5875:9828, Figma 5252:5632, Figma 5639:10028 |
| neutral | 보조 큰 동작(자세히 보기 등). 흰 바탕, 검정 글자 | Figma 5152:9048, Figma 5915:9776 |
| glass | 탭바 지원하기. 반투명 바탕 | Figma 5239:3922, Figma 7064:9879 |
| text-link | 이전·다음 이동. 바탕 없음. 24px Bold 글자 + 화살표 | Figma 5152:8869, Figma 5411:9043 |

- outlined(투명 바탕 + 흰 1px 보더)는 Figma 버튼 세트에 없어 variant에 두지 않음. 11절 참조

### Sizes

- size 이름은 이 명세가 붙인 이름임: variant 이름 + 형태 또는 크기 단계
- wide: 가로로 긴 버튼. pill: 모서리가 완전히 둥근 알약형
- lg·md·small: 크기 단계. mini: 검색 Tag용 소형
- frontend 코드 이름과의 대응은 9절

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| brand-wide | 800×68 | 342×52 | `radius.sm` (12px) | `spacing.5` (20px) / `raw:30px` | `typography.body-2` / 모바일 `typography.body-2-mobile` | Figma 5188:8826, Figma 7578:9582 |
| brand-pill-lg | 250×56 | — | `radius.full` (40px) | `spacing.5` (20px) / `raw:28px`, gap `raw:10px` | `typography.body-2` | Figma 5252:5632, Figma 5252:5631, Figma 5252:5630, Figma 5252:5629 |
| brand-pill-md | 180×56 | — | `radius.full` (40px) | `spacing.4` (16px) / `raw:29px` / `spacing.4` / `raw:28px` | `typography.body-2` | Figma 5875:9828 |
| brand-small | 130×44 | 112×36 | `radius.md` (20px) | `raw:10px` | `typography.body-2` / 모바일 `typography.body-2-mobile` | Figma 5639:10028, Figma 7142:13884 |
| neutral-lg | 250×68 | — | `radius.sm` (12px) | `raw:21px` / `raw:33px`, gap `spacing.5` (20px) | `typography.body-2` | Figma 5152:9048 |
| neutral-md | 200×68 | 160×44 | 데스크톱 `radius.sm` (12px) / 모바일 `raw:8px` | `raw:21px` / `raw:33px`, gap `raw:10px` | `typography.body-2` / 모바일 `typography.body-2-mobile` | Figma 5915:9776, Figma 7289:14366 |
| glass | 154×44 | 132×40 | `radius.full` (40px) | `raw:13px` / `raw:51px` / `raw:12px` / `raw:47px` | `typography.body-2-mobile` | Figma 5239:3922, Figma 7064:9879 |
| text-link | 144×29 | — | — | gap `raw:10px` | `typography.headline-3` | Figma 5152:8869, Figma 5411:9043 |
| mini(검색 Tag) | 97×43 | — | — | — | — | design-reference 5.1 |
| neutral-md-wide | — | 160×52 | `radius.sm` (12px) | `raw:21px` / `raw:33px` | 모바일 `typography.body-2-mobile` | Figma 7225:13942 |

- 높이: 표의 값으로 고정함(패딩 합으로 정하지 않음)
- padding 값 순서: 2개는 세로 / 가로, 4개는 위 / 오른쪽 / 아래 / 왼쪽(CSS 순서)
- brand-wide 모바일 글자
  - Figma는 15 Bold이나 해당 토큰이 없음
  - `typography.body-2-mobile` (16/600)로 맞춤. 11절 참조
- Figma 250×68·모바일 160×52의 radius 10
  - `radius.sm` 토큰 설명의 결정에 따라 12로 통일함(design-reference 3.1)
- glass 154×44의 radius
  - 5239:3921과 design-reference 5.2에 따라 `radius.full` (40px)로 적음
  - 티켓의 소형 radius 20은 brand-small 130×44에만 해당함
- brand-small 글자
  - Figma는 18 Bold
  - 데스크톱 brand는 `typography.body-2` 이상이라는 결정(COMPONENT-01-03)에 따라 20 Bold를 씀
- mini: Tag 컴포넌트 명세(COMPONENT-13)에서 정의함. 이 명세에는 값을 두지 않음

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### brand

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.brand-solid` (#7A64F9) / `color.fg.on-brand` (#FFFFFF) / — | `color.bg.brand-solid-hover` (#493C95) / `color.fg.on-brand` (#FFFFFF) / — | `color.bg.brand-solid-press` (#2C2459) / `color.fg.muted` (#999999) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5875:9829, Figma 5875:9831, Figma 5875:9833, Figma 없음(추정, focus-visible) |
| disabled | `color.bg.disabled` (#666666) / `color.fg.disabled` (#999999) / — | — | — | — | Figma 5188:8718, Figma 7578:9587 |

### neutral

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.neutral-solid` (#FFFFFF) / `color.fg.on-inverse` (#000000) / — | `color.bg.neutral-solid-hover` (#999999) / `color.fg.on-inverse` (#000000) / — | `color.bg.neutral-solid-press` (#666666) / `color.fg.on-inverse` (#000000) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px<br>흰 표면 위: `color.stroke.focus-inverse` (#7A64F9) | Figma 5152:9047, Figma 5152:9049, Figma 5164:8774, Figma 없음(추정, focus-visible) |
| disabled | `color.bg.disabled` (#666666) / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

### glass

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `raw:rgba(208,207,249,0.1)` / `color.fg.default` (#FFFFFF) / — | rest 바탕 + 그라데이션 2겹 `raw:linear-gradient`(10절) / `color.fg.default` (#FFFFFF) / — | hover 값 유지 / `color.fg.default` (#FFFFFF) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5239:3921, Figma 5239:3923, Figma 없음(추정, press·focus-visible) |
| disabled | rest 바탕 유지 / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

### text-link

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.fg.default` (#FFFFFF) / — | — / `color.fg.muted` (#999999) / — | — / `color.palette.gray.600` (#666666) / — | rest 유지 / outline `color.stroke.focus` (#68CBEC) 2px, offset 2px | Figma 5411:9042, Figma 5411:9044, Figma 5411:9049, Figma 없음(추정, focus-visible) |
| disabled | — / `color.fg.disabled` (#999999) / — | — | — | — | Figma 없음(추정) |

- 포커스 링
  - 흰 표면(모달) 위 모든 variant: `color.stroke.focus-inverse` (#7A64F9)
  - 트리거: `:focus-visible`
  - outline은 요소 밖(offset 2px)에 그림
  - 버튼 안쪽 링은 보라 바탕 위 2.26:1로 기준 미달이라 쓰지 않음
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
| color(text-link) | 0.2s | ease-in-out | design-reference 4.3 |
| background(glass) | 0.2s | ease-in-out | design-reference 4.3 |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성
  - 크기: 3절 Sizes의 모바일 열
  - 글자: `typography.body-2-mobile` (16/600)
  - brand-small radius: `radius.md` 유지
  - neutral-md(160×44) radius: `raw:8px`
- Figma 모바일 노드
  - 프레임: Figma 7064:14053
  - brand 112×36: Figma 7142:13884
  - brand 342×52: Figma 7578:9582
  - glass 132×40: Figma 7064:9879
  - neutral 160×44: Figma 7289:14366
  - neutral 160×52: Figma 7225:13942

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | 동작은 `<button>`, URL 이동은 `<a href>`. `<div onClick>`·`<a role="button">` 금지 | design-reference 5.1 |
| 키보드 | Tab으로 포커스, Enter·Space(button) / Enter(a)로 실행 | Figma 없음(추정) |
| aria | 이름은 보이는 라벨과 같음. 아이콘 전용은 `aria-label`. 장식 아이콘·화살표는 `aria-hidden="true"`. pending은 `aria-busy="true"` | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자·UI 요소 3:1<br>brand: rest 흰 글자 4.18(큰 글자만 해당, 글자 `typography.body-2` 이상), hover 8.88, press 4.90<br>neutral: rest 21.00, hover 7.37, press 3.66(큰 글자만 해당)<br>glass: rest 흰 글자 약 18.2(검정 캔버스에 합성한 #151519 기준), hover 그라데이션 위는 미계산<br>text-link: rest 21.00, hover 7.37, press 3.66(24px Bold 큰 글자)<br>disabled: 2.02, WCAG 1.4.3 비활성 예외<br>모바일 neutral 160×44의 16 SemiBold press: 3.66으로 기준 미달(11절) | `docs/wbs/20-token.md` 대비표 |
| 터치 영역 | 최소 24×24: 전 size 통과<br>모바일 권장 44×44: 112×36, 132×40이 미달 | WCAG 2.2 2.5.8 |
| 포커스 링 | 굵기 2px, offset 2px<br>검정 캔버스 위: `color.stroke.focus` (#68CBEC) 11.34:1<br>흰 표면 위: `color.stroke.focus-inverse` (#7A64F9) 4.18:1<br>보라 버튼 안쪽 링: 2.26:1로 기준 미달 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 네이티브 `disabled`. 색만으로 구분하지 않고 비활성 사유를 화면에 표시 | Figma 5188:8718 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| brand 글자는 `typography.body-2` 이상 | brand에 `typography.body-3`·`typography.body-2-regular` 사용 |
| 포커스 링 offset 2px, 흰 표면 위는 `color.stroke.focus-inverse` | 보라 버튼 안쪽에 링 그리기, 흰 표면 위에 `color.stroke.focus` 사용 |
| URL 이동은 `<a href>`, 동작은 `<button>` | `<div onClick>`, `<a role="button">` |
| 제출 중: `aria-busy` 설정, 중복 실행 방지, 라벨 유지 | disabled로 바꿔 포커스를 잃게 함, 라벨을 "신청 중..."으로 교체 |
| 아이콘 전용 버튼에 `aria-label` | 이름이 빈 버튼 |
| 비활성은 `disabled` + 사유 표시 | 색만 회색으로 바꿈 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/button/button.tsx`, `src/shared/components/button/button.css.ts` | 네이티브 `<button>` 사용<br>`preset="<variant>_<color>"` 11종. 앞 값 variant: wide, large, large-round, medium, medium-round, small-round, mini. 뒤 값 color: primary, outlined, white, glass<br>`hasIcon`: 아이콘 표시<br>`responsive`: 모바일 크기 적용(기본값 꺼짐)<br>사용 중 preset<br>- `wide_primary`: 지원서 제출·약관 동의 다음<br>- `small-round_primary`: 리크루팅 히어로·트랙 카드·FAQ 문의<br>- `small-round_outlined`: 지원서 임시저장<br>- `medium-round_primary`: 사전 알림 신청<br>- `medium_white`: 컨퍼런스 자세히 보기<br>`medium-icon_white`: 타입에만 있고 css·호출부 없음 |
| frontend 차이 | 위와 같음 | 수정 예정(ADOPT-03). 명세와 다른 점<br>- 포커스: `:focus-visible` 없음, 전역 `outline: none`<br>- press: `:active` 없음<br>- neutral hover: #E6E6E6(명세 #999999)<br>- disabled 색: primary #999999, white #333333(명세 `color.bg.disabled`)<br>- disabled: outlined·glass 없음<br>- small-round 글자: 18 Bold(명세 `typography.body-2` 20 Bold)<br>- small-round radius: 40(명세 소형 `radius.md`)<br>- 사각 radius: 10(명세 `radius.sm`)<br>- 높이: 고정 없음(2~3px 작음)<br>- `wide` 글자: 24 Bold(명세 `typography.body-2` 20 Bold)<br>- glass 바탕: 검정 그라데이션(명세 rgba 0.1)<br>- text-link: `widgets/apply/ui/question-section/`의 `<div onClick>`<br>- pending: notice-form이 disabled + 라벨 교체("신청 중...") |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-02(버튼), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/button/button.tsx` | wide ↔ brand-wide 800×68. large-white(large+white) ↔ neutral-lg 250×68. medium-white ↔ neutral-md 200×68. medium-icon_white ↔ neutral-md 200×68 + 아이콘(타입에만 있음). medium-primary ↔ brand 사각(Figma 없음, 추정). large-round ↔ brand-pill-lg 250×56. medium-round ↔ brand-pill-md 180×56(사전 알림 신청 예외). small-round ↔ brand-small 130×44 / glass 154×44(`small-round_glass`). mini ↔ 검색 Tag 97×43(COMPONENT-13). outlined ↔ 명세에 없음 |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:8px` | 모바일 neutral-md radius | Figma 7289:14366 | 검토 필요. checkbox 전문 토글·selection-card와 함께 사용처 3곳(별도 이슈로 결정) |
| `raw:30px` | brand-wide 좌우 패딩 | Figma 5188:8826 | 불필요 |
| `raw:28px`, `raw:29px` | brand-pill 패딩 | Figma 5252:5632, Figma 5875:9828 | 불필요 |
| `raw:10px` | brand-small 패딩, 아이콘·화살표 gap | Figma 5639:10028, Figma 5152:8869 | 불필요. spacing 4·8·12 사이 값 |
| `raw:21px`, `raw:33px` | neutral 패딩 | Figma 5152:9048 | 불필요 |
| `raw:13px`, `raw:12px`, `raw:51px`, `raw:47px` | glass 패딩 | Figma 5239:3921 | 불필요 |
| `raw:rgba(208,207,249,0.1)` | glass rest 바탕 | Figma 5239:3921 | 필요(탭바 COMPONENT-07 등과 함께 판단) |
| `raw:linear-gradient`(#7A64F9 → 투명 #999999, 투명 #666666 → #6498F9, 각 불투명도 0.2) | glass hover 오버레이 2겹 | Figma 5239:3923 | 필요(glass 값과 함께 판단) |
| 15px Bold | brand-wide 모바일 Figma 글자(명세는 `typography.body-2-mobile` 16/600) | Figma 7578:9581 | 필요 여부 디자이너 확인(11절) |
| Figma 342×52 글자색 #E6E6E6, 15 Bold | brand-wide 모바일 Default·Disabled(명세는 `color.fg.on-brand` / `typography.body-2-mobile`). #E6E6E6 대 #7A64F9 3.35, #E6E6E6 대 #666666 4.60 | Figma 7578:9581, Figma 7578:9587 | 필요 여부 디자이너 확인(11절) |
| 18px Bold | brand-small Figma 글자(명세는 `typography.body-2` 20 Bold) | Figma 5639:10024 | 불필요(결정으로 20 Bold) |
| 24px | 아이콘·화살표 크기 | Figma 5252:5632, Figma 5152:8869 | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 전환 | design-reference 4.3 | 불필요 |
| `cursor: progress` | pending | Figma 없음(추정) | 불필요 |

## 11. 미확인

- brand-small 130×44 글자: Figma 18 Bold, 명세 `typography.body-2` (20 Bold, 결정 COMPONENT-01-03). 디자이너 확인 필요(Figma 5639:10024)
- brand-wide 모바일 342×52 글자: Figma 15 Bold, 명세 `typography.body-2-mobile` (16/600). 디자이너 확인 필요(Figma 7578:9581)
- 모바일 neutral 160×44 press: 16 SemiBold 글자(#666666 위 검정, 3.66:1)는 큰 글자가 아니라 기준 미달. 디자이너 확인 필요(Figma 7289:14366)
- glass 데스크톱 글자: 16 SemiBold에 맞는 데스크톱 전용 토큰이 없어 `typography.body-2-mobile` (16/600)로 적음
- glass press·disabled: Figma 없음(Figma 5239:3922 세트)
- brand-small·neutral·text-link의 disabled: Figma 없음. 추정값
- text-link 모바일 크기: Figma 모바일 프레임에 없음
- 모든 variant의 focus-visible: Figma에 Focus 상태가 없음(추정)
- outlined(투명 바탕 + 흰 1px 보더)
  - Figma 버튼 세트에 없음
  - frontend는 `small-round_outlined`(지원서 임시저장)로 사용 중
  - variant 추가 여부 디자이너 확인 필요
- 모바일 glass 132×40 패딩: 미확인(Figma 7064:9879)
- brand-wide 모바일 342×52 글자색
  - Figma: Default·Disabled 모두 #E6E6E6(대 #7A64F9 3.35:1, 대 #666666 4.60:1)
  - 명세: 대비가 더 높은 `color.fg.on-brand` (#FFFFFF)를 씀
  - 디자이너 확인 필요(Figma 7578:9581, Figma 7578:9587)
- brand-wide 모바일 Disabled 글자
  - Figma: #E6E6E6
  - 명세: `color.fg.disabled` (#999999). 데스크톱 800×68 Disabled(Figma 5188:8718)와 맞춤
- neutral 250×68 아이콘 유무: gap 20만 확인됨. 재확인 필요(Figma 5152:9048)
