---
id: modal
name_ko: 모달
ticket: COMPONENT-07
tier: P0
status: review
figma:
  - "4412:7387"
  - "4243:4479"
  - "5164:5542"
  - "5164:5587"
  - "5164:5621"
  - "4243:4439"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 모달 (modal)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 화면 흐름을 멈추고 결과·안내·오류를 알린 뒤 사용자의 확인(닫기) 또는 다음 동작(신청)을 받는 흰 표면 대화 상자
- 구성: 종류 7개(안내 2·입력 오류 2·성공·로딩·실패), 모달 전용 버튼 2종(닫기·신청)
- 사용 화면: 지원서 작성(제출 중·성공·실패), 리크루팅·지원 진입(지원 기간 아님·모집 마감), 사전 알림 신청(이메일 재입력·이메일 중복)
- 범위 밖
  - 소셜 로그인 팝업(Figma 8012:14485, 8046:6861, 8046:9450): 어두운 바탕 #1A1A1A·로그인 버튼 3개로 구조가 다른 별도 화면 조각. 이 명세의 모달이 아님. 현재 코드는 `src/features/auth/ui/login-overlay.tsx`
  - 확인형(예·아니오) 대화 상자: Figma에 없음. 11절 참조
- 관련 명세: `components/button.md`(일반 버튼, COMPONENT-01. 모달 안 버튼은 이 명세가 정의함), `patterns/accessibility.md`(PATTERN-03)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| backdrop | ○ | 화면 전체를 덮는 반투명 검정 막. 뒤 화면 조작 차단 | `raw:rgba(0,0,0,0.6)` |
| root | ○ | 흰 표면 상자. 데스크톱 441×235(최소 높이), 2px 보더, 내용을 가로·세로 가운데 정렬 | `color.bg.surface-inverse` (#FFFFFF), 보더 `color.palette.gray.200` (#CCCCCC) 2px, `radius.full` (40px) |
| icon | ○ | 종류 표시 아이콘. 느낌표 48(안내·입력 오류·실패), 체크 48(성공), 스피너 42(로딩) | 느낌표 `color.fg.on-inverse` (#000000) |
| title | ○ | 한 줄 제목. 가운데 정렬. `aria-labelledby` 대상 | `typography.body-2` (20/700), `color.fg.on-inverse` (#000000) |
| description | ○ | 한 줄 설명. 가운데 정렬. `aria-describedby` 대상 | `typography.body-4` (18/400), `color.palette.gray.600` (#666666) |
| actions | ○ | 버튼 줄. 1개(닫기) 또는 2개(닫기·신청). 가운데 정렬 | gap `raw:19px` |
| button-close | ○ | 닫기 버튼 130×44 | 4절 modal-close |
| button-primary | × | 신청 버튼 130×44. 안내형에만 있음 | 4절 modal-primary |

- 설명 글자색은 `color.fg.muted` (#999999)를 쓰지 않음. 흰 위 2.85:1로 미달(7절)
- 간격(위에서 아래)
  - icon → title: `raw:9px`
  - title → description: `raw:9px`
  - description → actions: `raw:15px`
- 안쪽 여백: `spacing.8` (32px). 내용 묶음 높이 170 + 위아래 32 ≒ 235

## 3. Variants·Sizes

### Variants

| variant | 종류 | 제목 / 설명 | 아이콘 | 버튼 | role | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| info-not-open | 안내: 지원 기간 아님 | 지금은 지원 기간이 아닙니다. / 사전 알림을 신청해보세요. | 느낌표 48 | 닫기·신청 | `alertdialog` | Figma 4243:4452 |
| info-closed | 안내: 모집 마감 | 모집이 마감되었습니다. / 사전 알림을 신청해보세요. | 느낌표 48 | 닫기·신청 | `alertdialog` | Figma 4243:4480 |
| error-email-invalid | 입력 오류: 이메일 재입력 | 이메일을 다시 입력해주시길 바랍니다. / 다시 한 번 확인해주세요. | 느낌표 48 | 닫기 | `alertdialog` | Figma 4243:4492 |
| error-email-duplicate | 입력 오류: 이메일 중복 | 이미 사전 알림이 신청된 이메일입니다. / 다시 한 번 확인해주세요. | 느낌표 48 | 닫기 | `alertdialog` | Figma 4243:4504 |
| success | 성공 | 지원서 제출이 성공적으로 완료되었습니다. / BOAZ에 지원해주셔서 감사합니다. | 체크 48 | 닫기 | `alertdialog` | Figma 5164:5542 |
| loading | 로딩 | 지원서를 제출 중입니다. / 잠시만 기다려주세요. | 스피너 42 | 닫기 | `dialog` + `aria-busy="true"` | Figma 5164:5587 |
| failure | 실패 | 제출에 실패하였습니다. / 다시 한 번 확인해주세요. | 느낌표 48 | 닫기 | `alertdialog` | Figma 5164:5621 |

- 버튼 규칙
  - 안내형 2종: 닫기(왼쪽)·신청(오른쪽) 2개
  - 나머지 5종: 닫기 1개. 로딩도 닫기 있음(Figma 5164:5587). 동작은 5절
- 제목·설명 문구는 Figma 원문 그대로 씀. 문구 변경은 이 표를 함께 고침
- Figma 구조 차이 정리
  - 성공(5164:5542): 설명이 아이콘·제목 묶음 밖에 있어 간격이 15
  - 로딩(5164:5587): 스피너가 제목 묶음 밖에 있어 간격이 15
  - 명세는 7종 모두 2절 간격(9 / 9 / 15)으로 통일함

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| modal | 441×235(최소 높이) | 너비 `calc(100% - 32px)`, 최대 441 | `radius.full` (40px) | `spacing.8` (32px) / 모바일 `spacing.6` (24px) | 제목 `typography.body-2` / 모바일 `typography.body-2-mobile`<br>설명 `typography.body-4` / 모바일 `typography.body-4-mobile` | Figma 4243:4452, Figma 없음(추정, 모바일) |
| modal-button | 130×44 | 130×44 | `radius.full` (40px) | `raw:10px` | `typography.body-4` (18/400) | Figma 4243:4439 |

- 높이: 235는 최소값. 문구가 길어 줄이 바뀌면 높이가 늘어남
- 모바일 두 버튼 줄 너비 279(130×2 + 19)
  - 내용 너비 = 화면 너비 - 32(바깥 여백) - 48(안쪽 여백)
  - 화면 359px 미만(내용 너비 279 미만)이면 버튼을 세로로 쌓음
- modal-button radius
  - Figma `팝업창 버튼` 3종 모두 40(Figma 4243:4438, 4243:4440, 4243:4442)
  - COMPONENT-07-01의 "radius 20 `radius.md`"는 Figma와 다름. 명세는 Figma 값 `radius.full`을 씀(정정 필요, 보고)
- modal-button 글자: Figma 18 Regular. button.md의 brand 글자 규칙(`typography.body-2` 이상)은 보라 바탕에만 해당하므로 여기는 적용하지 않음. 대신 hover 바탕을 바꿈(4절)

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.
rest는 상호작용이 없을 때의 모습임. focus-visible 칸은 rest 색을 유지하고 outline을 더함.

### modal(root)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.bg.surface-inverse` (#FFFFFF) / `color.fg.on-inverse` (#000000) / `color.palette.gray.200` (#CCCCCC) 2px | — | — | — | Figma 4243:4452 |

- root 자체는 상호작용 없음. 포커스는 안의 버튼이 받음

### modal-close(닫기)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.palette.gray.100` (#E6E6E6) / `color.fg.on-inverse` (#000000) / — | `color.palette.gray.200` (#CCCCCC) / `color.fg.on-inverse` (#000000) / — | `color.palette.gray.400` (#999999) / `color.fg.on-inverse` (#000000) / — | rest 유지 / outline `color.stroke.focus-inverse` (#7A64F9) 2px, offset 2px | Figma 4243:4442, Figma 없음(추정, hover·press·focus-visible) |

### modal-primary(신청)

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | `color.palette.gray.1000` (#000000) / `color.fg.default` (#FFFFFF) / — | `color.bg.brand-solid-hover` (#493C95) / `color.fg.default` (#FFFFFF) / — | `color.bg.brand-solid-press` (#2C2459) / `color.fg.default` (#FFFFFF) / — | rest 유지 / outline `color.stroke.focus-inverse` (#7A64F9) 2px, offset 2px | Figma 4243:4438, Figma 4243:4440, Figma 없음(추정, press·focus-visible) |

- modal-primary hover
  - Figma: `color.bg.brand-solid` (#7A64F9). 18 Regular 흰 글자와 4.18:1로 일반 글자 기준 4.5 미달
  - 명세: 보라 계열을 유지하면서 통과하는 `color.bg.brand-solid-hover` (#493C95, 8.88:1)를 씀. 디자이너 확인 필요(11절)
- 포커스 링: 모달 안 모든 버튼은 `color.stroke.focus-inverse` (#7A64F9). 트리거 `:focus-visible`. `color.stroke.focus`(하늘색)는 흰 위 대비가 낮아 쓰지 않음
- disabled 행은 두지 않음. 모달 버튼은 항상 누를 수 있음(로딩 모달의 닫기 포함)
- selected·invalid·completed 행은 두지 않음. 모달과 버튼의 상태가 아니기 때문임
- 비동기 상태: loading variant가 담당함. `aria-busy="true"`는 5절

## 5. Behavior

- 요소 선택
  - 네이티브 `<dialog>`를 `showModal()`로 엶. 뒤 화면 비활성(inert)·최상위 표시(top layer)·Esc 처리를 브라우저가 제공함
  - backdrop은 `::backdrop` 의사 요소로 그림
  - `showModal()`이 top layer에 올리므로 z-index를 정하지 않음(10절)
- 열기
  - 열기 직전 포커스를 가진 요소(트리거)를 기억함
  - 초기 포커스: 닫기 버튼(되돌리기 쉬운 동작). 안내형도 닫기에 둠
  - 열린 동안 페이지 스크롤 잠금(`body` `overflow: hidden`)
- 닫기 수단
  - 닫기 버튼, Esc(`cancel` 이벤트)
  - backdrop 클릭으로는 닫지 않음(`alertdialog`는 명시적 응답을 받음)
- 포커스 이동·복귀
  - Tab·Shift+Tab은 모달 안 버튼 사이에서만 순환함(뒤 화면은 inert)
  - 닫힌 뒤 기억한 트리거로 포커스를 돌려보냄. 트리거가 사라졌으면 `<main>`의 첫 제목으로 보냄
- 신청 버튼(안내형): 모달을 닫고 사전 알림 신청 영역으로 이동함. 포커스는 이메일 입력으로 보냄
- 로딩 모달
  - 제출 요청 시작과 함께 엶. `aria-busy="true"`
  - 닫기·Esc: 모달만 닫음. 요청은 취소하지 않음
  - 제출 버튼은 요청이 끝날 때까지 `aria-busy="true"`·중복 실행 방지 유지(button.md 5절)
  - 요청 완료 시 로딩 모달이 열려 있든 닫혀 있든 성공 또는 실패 모달을 엶. 로딩 모달은 먼저 닫음
  - 결과 모달을 닫으면 포커스는 원래 트리거(제출 버튼)로 돌아감
- 한 번에 모달 하나만 엶. 두 번째를 열 때는 앞 모달을 닫고 엶
- 클릭·탭: 버튼은 포인터 up에서 실행. 터치에서는 hover 색을 적용하지 않음
- 키보드: 버튼은 Enter·Space로 실행, Esc는 닫기와 같음

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color(모달 버튼) | 0.2s | ease-in-out | design-reference 4.3 |
| 모달 열기·닫기 | 없음 | — | Figma 없음(추정) |
| 스피너 회전 | `raw:1s` 1회전, 무한 반복 | linear | Figma 없음(추정) |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): PATTERN-03-04 확정 전까지 전환을 제거함. 스피너는 회전을 멈추고 정지 이미지로 표시함

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성(모두 `Figma 없음(추정)`)
  - 너비: `calc(100% - 32px)`(좌우 `spacing.4` 16px 여백), 최대 441
  - 안쪽 여백: `spacing.6` (24px)
  - 제목: `typography.body-2-mobile` (16/600). 20 Bold로는 "이메일을 다시 입력해주시길 바랍니다."(297px)가 한 줄에 들어가지 않음
  - 설명: `typography.body-4-mobile` (15/400)
  - 버튼: 130×44 유지(터치 44 충족). 두 버튼 줄이 들어가지 않으면 세로로 쌓고 신청을 위에 둠
  - radius·보더·간격: 데스크톱과 같음
- 769~1365px: 데스크톱 값 사용
- Figma 모바일 노드: 없음(Mobile 페이지에 모달 없음, 11절)

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | `<dialog>` + `showModal()`<br>안내·입력 오류·성공·실패: `role="alertdialog"`<br>로딩: 기본 `dialog` 역할 유지 | Figma 없음(추정) |
| 키보드 | 열면 닫기 버튼에 포커스. Tab 순환은 모달 안에서만. Esc = 닫기. 닫히면 트리거로 포커스 복귀 | Figma 없음(추정) |
| aria | `aria-modal="true"`, `aria-labelledby`=title id, `aria-describedby`=description id<br>로딩: `aria-busy="true"`<br>아이콘은 장식이므로 `aria-hidden="true"`(종류는 제목 문구가 전달함) | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1, 큰 글자·UI 요소 3:1<br>제목 #000000 / #FFFFFF: 21.00<br>설명 `color.palette.gray.600` / #FFFFFF: 5.74(참고 `color.fg.muted` 2.85 미달이라 안 씀)<br>닫기 rest #000000 / #E6E6E6: 16.83, hover / #CCCCCC: 13.08, press / #999999: 7.37<br>신청 rest #FFFFFF / #000000: 21.00, hover / #493C95: 8.88, press / #2C2459: 13.97<br>Figma 신청 hover #FFFFFF / #7A64F9: 4.18로 18 Regular 미달(4절에서 교체)<br>닫기 바탕 #E6E6E6 / 흰 표면: 1.25. 버튼 경계는 글자로 식별되므로 WCAG 1.4.11 대상 아님<br>느낌표 아이콘 #000000 / #FFFFFF: 21.00 | 계산값(WCAG 상대 휘도), `docs/wbs/20-token.md` 대비표 |
| 터치 영역 | 최소 24×24: 130×44 통과<br>모바일 권장 44×44: 130×44 통과 | WCAG 2.2 2.5.8 |
| 포커스 링 | `color.stroke.focus-inverse` (#7A64F9), 2px, offset 2px. 흰 표면 위 4.18:1 | `docs/wbs/20-token.md` 대비표 |
| 비활성 표시 | 해당 없음. 모달 버튼은 비활성 상태가 없음 | Figma 4243:4439 |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| `<dialog>` + `showModal()`, `aria-labelledby`·`aria-describedby` 연결 | `<div>`에 `role="dialog"`만 붙이고 뒤 화면을 그대로 둠 |
| 열면 닫기 버튼에 포커스, 닫으면 트리거로 복귀 | 닫은 뒤 포커스를 `<body>`에 남김 |
| 설명 글자 `color.palette.gray.600` | 흰 표면 위에 `color.fg.muted` |
| 모달 안 포커스 링 `color.stroke.focus-inverse` | 흰 표면 위에 `color.stroke.focus` |
| 로딩 모달 닫기는 모달만 닫고 요청은 유지, 결과는 결과 모달로 알림 | 로딩 모달 닫기로 결과 알림까지 생략 |
| 입력 형식 오류는 입력 필드 아래 문구(COMPONENT-02)가 우선, 모달은 Figma 7종 상황에만 | 모든 오류를 `alert()`·모달로 띄움 |
| 7종 문구를 3절 표와 같게 씀 | 화면마다 문구를 새로 지음 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | 없음 | 모달 컴포넌트 코드 없음. 브라우저 `alert()`·`confirm()`으로 대신함 |
| frontend 대체 지점(제출) | `src/widgets/apply/model/use-submit-application.ts` | 제출 성공 `alert` → success, 실패 `alert` → failure. 제출 중 표시 없음 → loading 추가 |
| frontend 대체 지점(제출 확인) | `src/pages/apply-page.tsx` | 제출 전 `window.confirm`("제출하면 중복 제출이 불가합니다…"): 확인형으로 Figma에 없음(11절)<br>이미 제출된 경우 `alert` 후 홈 이동: Figma에 없음<br>모집 기간 아님: 모달 없이 홈으로 이동(`Navigate`). Figma는 info-not-open·info-closed 모달 |
| frontend 대체 지점(지원서 입력) | `src/widgets/apply/ui/personal-info-section.tsx` | 부문 변경 `window.confirm`: 확인형으로 Figma에 없음<br>필수 항목 누락 `window.alert`: 입력 필드 오류 문구(COMPONENT-02) 대상 |
| frontend 대체 지점(사전 알림 신청) | `src/features/notice/notice-form.tsx` | 이메일 빈 값·형식 오류 `alert` → error-email-invalid<br>`DUPLICATE_EMAIL` → error-email-duplicate(코드 문구 "이미 구독 신청된 이메일입니다." → Figma 문구로 교체)<br>신청 완료 `alert`·서버 오류 `alert`: Figma에 해당 종류 없음(11절) |
| frontend 대체 지점(로그인 필요) | `src/shared/router/protected-route.tsx` | 로그인 필요 `alert`: Figma에 없음. 로그인 오버레이로 대체 여부는 범위 밖 |
| frontend 참고 | `src/shared/styles/zIndex.css.ts`, `src/features/auth/ui/login-overlay.css.ts` | `zIndex.modal` 3은 사용처 없음, 탭바(200)보다 낮아 쓸 수 없음<br>login-overlay backdrop `rgba(0, 0, 0, 0.6)`·z-index 1000: 이 명세 backdrop 색의 근거 |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-04(모달), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | — | FE 합의 이름 없음 |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| `raw:rgba(0,0,0,0.6)` | backdrop | Figma 없음(추정), 코드 `src/features/auth/ui/login-overlay.css.ts` | 필요(로그인 오버레이·탭바 드로어와 같은 값이면 두 번째 사용처. 별도 이슈로 제안) |
| 441px, 최소 높이 235px | 모달 크기 | Figma 4243:4452 | 불필요 |
| `raw:9px` | icon → title, title → description 간격 | Figma 4170:7425 | 불필요. spacing 8·12 사이 값 |
| `raw:15px` | description → actions 간격 | Figma 4170:7631 | 불필요 |
| `raw:19px` | 버튼 사이 간격 | Figma 4170:7582 | 불필요 |
| `raw:10px` | 모달 버튼 패딩 | Figma 4243:4438 | 불필요 |
| 130×44 | 모달 버튼 크기 | Figma 4243:4439 | 불필요 |
| 48px / 42px | 느낌표·체크 아이콘 / 스피너 크기 | Figma 4170:7422, Figma 5164:5570, Figma 5164:5617 | 불필요 |
| `calc(100% - 32px)` | 모바일 너비 | Figma 없음(추정) | 불필요 |
| z-index 없음(top layer) | `<dialog>` `showModal()` | Figma 없음(추정) | 불필요. `<dialog>`를 못 쓰는 경우에만 탭바 200·로그인 오버레이 1000보다 높은 값 필요(design-reference 4.7) |
| `raw:1s` linear 무한 | 스피너 회전 | Figma 없음(추정) | 불필요 |
| 2px, offset 2px | focus-visible outline | Figma 없음(추정) | 불필요 |
| 0.2s ease-in-out | 버튼 전환 | design-reference 4.3 | 불필요 |

## 11. 미확인

- 신청 버튼 hover
  - Figma: #7A64F9 바탕 + 18 Regular 흰 글자 4.18:1, 일반 글자 기준 미달(Figma 4243:4440)
  - 명세: `color.bg.brand-solid-hover` (#493C95, 8.88:1)
  - 대안: 바탕 유지 + 글자를 `typography.body-2`(20 Bold, 큰 글자)로 키움. 디자이너 확인 필요
- 닫기 hover·press, 신청 press, 모든 버튼 focus-visible: Figma 없음. 추정값(Figma 4243:4439 세트에 primary·hover·closed 3종만 있음)
- backdrop: Figma 모달 창(4412:7387)과 모든 페이지에 모달 인스턴스·배경 막이 없음. 색은 코드 login-overlay 값으로 추정
- 모바일 모달: Figma Mobile 페이지에 없음. 6절 값은 전부 추정
- 성공 아이콘(Figma 5164:5570)·스피너(Figma 5164:5617)는 래스터 이미지. 벡터 아이콘·색 지정 필요. 스피너 회전 속도 Figma 없음
- 확인형 대화 상자(예·아니오): 제출 전 확인, 부문 변경 확인이 코드에서 `confirm()`으로 쓰이나 Figma에 없음. 종류 추가 여부 디자이너 확인 필요
- 사전 알림 신청 완료·서버 오류 모달: 코드에는 있으나 Figma 7종에 없음. success·failure 문구는 지원서 제출 전용
- 성공 제목(Figma 5164:5546) 너비 367로 내용 묶음 279를 넘음. 명세는 안쪽 여백 32 기준 최대 377로 수용함
