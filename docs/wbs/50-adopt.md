# ADOPT 앱 적용 작업 정의서

기준일 2026-10-11, 2026-10-21 앱 코드 대조 후 ADOPT-01·02·05·06 정정 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 작업 정의서 목적

- 두 앱이 `v0.1.1` 토큰(2026-10-22 `radius.xs` 추가)을 git 태그로 설치해 쓰게 함
- 관리자 콘솔의 화면별 값(색·모서리·그림자·글자 크기)과 공용 컴포넌트를 통일함(ADOPT-05~07)
  - 디자인팀 Figma는 공개 홈페이지(검정 바탕) 전용이라 관리자 콘솔 디자인이 없음
  - 색은 Figma 정식 색(팔레트 토큰과 같은 값)을 씀. Figma에 없는 값 7개만 관리자 `theme.css`에 임시로 정함(ADOPT-05-03)
  - 크기(모서리·글자·간격)는 관리자 콘솔에서 정함. 컴포넌트는 Figma의 색과 hover·press 순서만 따름
  - `v0.1.0`이 2026-10-11에 발행돼, ADOPT-02에서 토큰을 설치한 뒤 팔레트 변수를 참조함(2026-10-21 정정. 이전에는 값을 복사해 쓰기로 했었음)
- 이 저장소에서는 앱 코드를 고치지 않음. 티켓마다 **해당 앱 저장소에 이슈·PR**을 만듦. PR 1개로 닫히지 않는 티켓(ADOPT-03·06·07)은 앱 저장소에서 화면별·컴포넌트별 이슈로 나눔(2026-10-22 명세 작성으로 확장)

**범위:** frontend, frontend_admin
**범위 밖:** 화면 배치·흐름 재설계, frontend 컴포넌트 전면 교체

---

## ADOPT-01 frontend 토큰 연결

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 4 | `BOAZ-website/frontend` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-01-01 | `pnpm add github:BOAZ-website/design-system#v0.1.1`. 앱 진입점(`src/app` 전역 스타일)에서 `@boaz/design-system/tokens.css`를 한 번 import함. `tokens` 모듈의 `vars`는 `var(--boaz-*)` 문자열만 담고 있어 이 CSS가 없으면 모든 값이 정의되지 않은 변수가 됨(빌드·타입 검사는 통과하고 화면만 깨짐) | `package.json` 의존성, 브라우저에서 `:root`에 `--boaz-*` 변수 존재 |
| ADOPT-01-02 | `theme.css.ts`의 값 출처를 `@boaz/design-system/tokens`의 `vars`로 바꿈. 기존 키 이름은 유지하고 `color.css.ts`·`font.css.ts`·`radius.css.ts` 안에서 토큰으로 대응시킴. 호출부(`themeVars.color` 243곳, `fontSize`·`fontWeight`·`lineHeight`·`letterSpacing` 각 29~31곳, `radius` 2곳)는 그대로 둠. <br>**색 대응표:** `color.primary.100/200/300` → `palette.purple.100/200/300`, `grayscale.white/black` → `gray.0/1000`, `grayscale.100~950` → `gray.100~950`, `sub.lightblue_100` → `lightblue.100`, `error.red_100/red_200` → `red.100/900`. radius는 이름이 같은데 값이 다르므로(앱 `xs 12·sm 20·md 24·lg 40`, 토큰 `sm 12·md 20·full 40`) 키별로 지정함: `xs` → `radius.sm`, `sm` → `radius.md`, `lg` → `radius.full`, `md` 24는 토큰이 없어 로컬 값 유지. 토큰에 없는 값은 로컬 값 유지: `fontSize` 8·10·22·28·32·36·38·80, `fontWeight.medium`(500), `lineHeight`(비율), `letterSpacing`, `fontFamily`(토큰은 `Pretendard, sans-serif`라 `Pretendard Variable`·`Paperlogy` 지정이 사라짐) | 호출부 변경 0건, 화면 차이 없음, 로컬 유지 값마다 "토큰 없음" 주석 |
| ADOPT-01-03 | 전역 `outline: none`(`global.css.ts:49`) 제거, `:focus-visible` 적용 | 키보드 Tab 이동 시 버튼 포커스 표시 |
| ADOPT-01-04 | `prefers-reduced-motion: reduce`일 때 전환 제거, 배경 장식 무한 애니메이션 5개 정지, 스피너 정지 이미지. 2026-10-22 PATTERN-03 작성으로 추가 | `patterns/accessibility.md` 2.4 규칙대로 OS 동작 줄이기 설정 시 움직임 없음 |

## ADOPT-02 frontend_admin 토큰 연결

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-02-01 | `npm install git+https://github.com/BOAZ-website/design-system.git#v0.1.1`(https 명시. `github:` 축약은 lockfile에 ssh 주소로 기록될 수 있어 CI `npm ci`가 실패할 수 있음). `src/app/styles/index.css`에서 `./tailwind.css` import 바로 뒤, `./theme.css` 앞에 `@import '@boaz/design-system/tailwind-theme.css'`를 둠(`theme.css`의 `:root`가 `--boaz-*`를 참조하므로 그보다 앞이어야 하고, `theme.css` 안은 `@custom-variant`로 시작해 `@import`를 둘 수 없음) | `npm ci`·`npm run build` 성공, 브라우저에서 `:root`에 `--boaz-*` 변수 존재 |
| ADOPT-02-02 | 관리자 콘솔이 쓰는 토큰 범위를 `CLAUDE.md`에 적음. 쓰는 것: 팔레트 색 변수(`--boaz-color-palette-*`)를 `theme.css`의 shadcn 변수(`--primary` 등) 값으로만 참조. 쓰지 않는 것: 시맨틱 색(`bg-boaz-bg-*`·`text-boaz-fg-*` 등. 검정 바탕 홈페이지 값이라 흰 바탕에서 쓰면 흰 글자·검정 면이 됨), `--spacing-boaz-*`·`--text-boaz-*`(px라 루트 14px 기준 rem 단계와 섞임), `rounded-boaz-*`(관리자는 `--radius` 계산값 사용) | 규칙 문서, `grep -rE 'boaz-(bg|fg|stroke|spacing|text|radius)' src` 0건 |

- ADOPT-05는 이 티켓 뒤에 진행함. `theme.css` 값을 처음부터 팔레트 변수로 적어 같은 줄을 두 번 고치지 않음(2026-10-21 정정)
- 위 purple 변수 이름은 TOKEN-01에서 확정됨

## ADOPT-03 frontend 값 불일치 정리

**목적:** 조사에서 찾은 Figma와 다른 값과 접근성 결함을 고침. 각 컴포넌트 값의 기준은 `components/<id>.md`(COMPONENT-01~08)이며, 아래 표의 값은 명세 머지 후 같은지 확인하고 다르면 명세를 따름(2026-10-22 명세 작성으로 확장). 03-09부터는 컴포넌트별로 이슈·PR을 나눔. 03-16부터는 P1 명세(COMPONENT-09~16)의 9절 frontend 차이를 반영함(2026-10-22 P1 명세 작성으로 확장). 모달은 ADOPT-04, 전역 `outline: none`은 ADOPT-01-03에서 다룸

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 두 주 | ADOPT-01, COMPONENT-01~16(`review` 이상. 03-09~15는 COMPONENT-01~08, 03-16~21은 COMPONENT-09~16, 03-22·23은 PATTERN-02·04) | 4 | `BOAZ-website/frontend` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-03-01 | 버튼 press(`:active`) 추가: brand #2C2459, neutral #666666 | 버튼 누를 때 색 변화 |
| ADOPT-03-03 | `glass`에 disabled 스타일 추가(rest 바탕 + 글자 `--boaz-color-fg-disabled`). brand·neutral·outlined disabled는 라이브 값을 명세로 채택해 대상 아님(2026-10-22 라이브 기준으로 정정) | `button.css.ts` |
| ADOPT-03-05 | 체크박스 색 오타 `#7964F9` → 토큰 | `agreement-step.css.ts` |
| ADOPT-03-06 | 쓰지 않는 스타일·컴포넌트 삭제: `display1_bd_80`, `h1_md_40`, `form-header` | 참조 0건 확인 후 삭제 |
| ADOPT-03-08 | Body 4 - Paragraph 행간 1.6 → 30px(Figma 값. `lineHeight.card` 1.6 = 28.8px) | `typography.body-4-paragraph.line-height` 참조 |
| ADOPT-03-09 | 버튼(03-01·03 외): glass 바탕 검정 그라데이션 → rgba 0.1(탭바 glass 버튼, Figma 값)<br>text-link: `question-section`의 `<div onClick>`을 `<button>`으로 교체<br>pending: notice-form의 disabled + 라벨 교체("신청 중...")를 명세 pending 표시로 교체<br>text-link 모바일: 겉 높이 16 유지, 위아래 4px 투명 padding + 음수 margin으로 누르는 영역 높이 24(2026-10-23 결정) | `components/button.md` 9절 frontend 차이 항목 모두 해소, 키보드(Tab·Enter)로 text-link 실행 가능 |
| ADOPT-03-10 | 입력 필드: 한 줄 입력을 `<input>`으로 교체(현재 `<textarea>` + Enter 차단)<br>라벨 요소 추가·입력칸과 연결(현재 placeholder만), 라벨 축소 동작 추가<br>`aria-invalid`·`aria-describedby`로 오류 문구 연결<br>hover 추가, invalid 바탕 `color-mix` → `--boaz-color-palette-red-900`, 문단 상하 패딩 10px, focus 때 counter `--boaz-color-fg-brand`, 전환 0.15s ease-out 추가 | `components/text-field.md` 9절 frontend 차이 항목 모두 해소, 화면 읽기 프로그램이 입력칸 이름과 오류 문구를 읽음 |
| ADOPT-03-11 | 셀렉트: field에 `role="combobox"`·`listbox`·`option`과 `aria-expanded`·`aria-activedescendant`·`aria-selected` 추가<br>키보드: 방향키·Home/End·Esc·타이핑 검색 추가(현재 목록 항목마다 Tab 대상)<br>check 아이콘 추가<br>field hover·focus·열림 상태(보더·label 이동) 추가<br>chip(부문·기수 필터): selected에 clear 아이콘, 부문 chevron 열림·닫힘 아이콘 반대 import 수정 | `components/select.md` 9절 frontend 차이 항목 모두 해소, 키보드만으로 열기·이동·선택·닫기 가능 |
| ADOPT-03-12 | 체크박스(03-05 외): 약관 동의 상자(현재 브라우저 기본 상자)를 명세 상자(radius 5·1px #999999 보더, checked `--boaz-color-bg-brand-solid`)로 교체<br>표 문항(16px 원 모양 유지): `aria-label`로 이름 부여, 숨긴 input의 포커스를 원에 표시<br>toggle: `<label>` 밖으로 분리(현재 체크박스 이름에 "전문 보기"가 섞임), `aria-expanded`·`aria-controls` 추가<br>detail: 접힌 내용을 화면 읽기 프로그램에서도 숨김(현재 max-height 0만 적용)<br>toggle 누르는 영역: 겉 높이 22(모바일 18) 유지, `::before`로 높이 24(2026-10-23 결정) | `components/checkbox.md` 9절 frontend 차이 항목 모두 해소, 표 문항 체크박스에 이름이 있고 Tab 이동 시 포커스 표시 |
| ADOPT-03-13 | 라디오: 묶음을 `<fieldset>`·`<legend>` 또는 `role="radiogroup"` + 제목 연결로 교체(현재 `<div>`, 제목 `<h2>`와 연결 없음)<br>숨긴 input의 포커스를 원에 표시<br>hover(원 흰 테두리) 추가<br>동작하지 않는 선택 해제 코드 삭제, disabled 상태 추가<br>표형 다중 선택은 ADOPT-03-12에서 처리 | `components/radio.md` 9절 frontend 차이 항목 모두 해소, 화면 읽기 프로그램이 묶음 제목과 함께 보기를 읽음 |
| ADOPT-03-14 | 탭: `role="tablist"`·`tab`·`tabpanel`, `aria-selected`, 방향키 이동을 명세 Accessibility 절 기준으로 추가(현재 네 곳 모두 없음). FAQ 탭 목록의 `<nav>` 제거<br>category(FAQ): hover 바탕 `--boaz-color-bg-layer`·글자 `--boaz-color-fg-neutral`<br>text(탭바): `aria-label="{메뉴}으로 이동"`을 명세 이름으로 정리<br>리크루팅 하단 링크 두 개의 탭 스타일 재사용을 버튼 neutral로 교체<br>box default 글자: 검정 #000000 → `--boaz-color-fg-default` #FFFFFF(바탕 #333333 위 12.63, 2026-10-23 결정) | `components/tab.md` 9절 frontend 차이 항목 모두 해소, 방향키로 탭 이동 시 `aria-selected` 변경 |
| ADOPT-03-15 | 카드: 링크 카드(project·photo·blog)의 카드 전체 `<a>`를 제목 링크 + 클릭 영역 확장(stretched-link)으로 교체<br>blog: hover 추가(Figma 값), 전환 `all 0.3s` 정리<br>photo: 기수 태그 `<button>` → `<span>`, tag의 `cursor: pointer` 제거<br>target: hover #666666 추가<br>recruit: `:focus-within` 추가, 설명 글 opacity·`cursor: pointer` 명세 값으로<br>review: root를 `<article>`로 | `components/card.md`·`components/tag.md` 9절 frontend 차이 항목 모두 해소, Tab으로 카드 링크 이동 시 포커스 표시 |
| ADOPT-03-16 | 검색 입력: `SearchOverlay`에 `aria-label` 추가(현재 placeholder만, 탭별 "프로젝트 검색" 등)<br>결과 수 안내: `role="status"` 영역에 응답 후 "검색 결과 N건"·"검색 결과가 없습니다."<br>포커스 표시는 ADOPT-01-03에서 처리. 결과 패널은 2026-10-23 보류 | `components/search-autocomplete.md` 9절 frontend 차이 중 보류 범위 외 항목 모두 해소, 화면 읽기 프로그램이 입력 이름과 결과 수를 읽음 |
| ADOPT-03-17 | 페이지네이션: 화살표 press 추가<br>현재 점 `disabled` → `aria-current="page"`(Tab 대상 유지), 화살표 비활성 `disabled` → `aria-disabled`, `<nav>`에 `aria-label`<br>누르는 영역: 점 버튼(데스크톱·모바일)·모바일 화살표 겉 크기 유지, `::before`로 24×24. 모바일 점 사이 gap 10 → 12(2026-10-23 결정) | `components/pagination.md` 9절 frontend 차이 항목 모두 해소, 화면 읽기 프로그램이 현재 페이지를 읽음 |
| ADOPT-03-18 | 진행 표시줄: segment `<button>` → `<span aria-hidden="true">`, root에 `role="progressbar"`·`aria-value*` 추가<br>단계 이름 목록을 하나로 통합(현재 `progress-bar-section.tsx`·`apply-page.tsx` 두 곳, 값도 다름)<br>단계 전환 시 페이지 제목으로 포커스 이동<br>segment 테두리 #333333 → #666666(검정 위 3.66, 2026-10-23 결정) | `components/progress-bar.md` 9절 frontend 차이 항목 모두 해소, Tab 이동 대상에 segment 없음 |
| ADOPT-03-19 | 필터 칩·태그 칩(03-11 외): 03-11에서 추가하는 ✕에 `aria-label="{값} 선택 해제"` | `components/filter-chip.md`·`components/tag-chip.md` 9절 frontend 차이 항목 모두 해소 |
| ADOPT-03-20 | 지원 부문 변경 확인: `window.confirm` → 모달 confirm-track-change(COMPONENT-07), 취소 시 이전 선택 복원. 지원 부문은 라디오 목록 유지(2026-10-23 결정, 선택 카드는 사용처 없음이라 구현하지 않음). 묶음 role·포커스 표시는 ADOPT-03-13에서 처리 | `components/radio.md` 9절 frontend 차이의 부문 변경 확인 항목 해소, `rg "window.confirm" src` 0건 |
| ADOPT-03-21 | 항목 추가 버튼: add 행 `<div onClick>` → `<button type="button">`, "+" 표시는 `aria-hidden="true"`<br>삭제 버튼에 `aria-label="{항목 이름} {번호} 삭제"` 추가. 프로젝트 행에도 삭제 버튼 추가<br>추가 후 새 입력칸, 삭제 후 이웃 행으로 포커스 이동<br>누르는 영역: add 행·삭제 버튼 겉 높이 14 유지, 위아래 5px 투명 padding + 음수 margin으로 24(2026-10-23 결정) | `components/form-add-button.md` 9절 frontend 차이 항목 모두 해소, 키보드(Tab·Enter)로 항목 추가·삭제 가능 |
| ADOPT-03-22 | 지원서 폼 검증 동작(PATTERN-02): 다음 페이지 `window.alert` 제거 → 필드 아래 오류 문구 + 첫 오류 필드 포커스, 제출하기 비활성 해제, 빈 필드 blur 시 누락 오류 제거, 단계 이동 시 단계 제목 포커스, 선택 질문 "(선택)" 표시. 2026-10-22 PATTERN-02 작성으로 추가 | `patterns/form.md` 6절 frontend 차이 모두 해소 |
| ADOPT-03-23 | 문구 정리(PATTERN-04): "해 주세요" 띄어쓰기 5곳을 "해주세요"로(`login-widget.tsx`, `personal-info-section.tsx`, `question-section.tsx`), 사전 알림 신청 완료 문구 합쇼체·느낌표 제거, Figma 원문과 다른 문구 2곳 맞춤. 2026-10-22 PATTERN-04 작성으로 추가 | `patterns/voice-and-tone.md` 6절 frontend 차이 모두 해소 |

## ADOPT-04 frontend `alert()` → 모달 교체

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-07, PATTERN-01 | 4 | `BOAZ-website/frontend` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-04-01 | 공용 Modal 컴포넌트(`shared/components/modal`) | 컴포넌트 존재 |
| ADOPT-04-02 | `alert()` 10곳을 PATTERN-01-03 대응표대로 교체. Figma에 모달이 없는 알림(A3·A4 일부·A5·A6·A10)은 모달을 추가하지 않고 대응표 수단(상태 알림 영역·로그인 오버레이)을 씀(2026-10-23 결정) | `rg "alert\(" src` 0건 |
| ADOPT-04-03 | `alert()`가 아닌 모달 사용처 3건 적용: 지원서 제출 중 loading 모달, 지원 진입 시 지원 기간 아님·모집 마감 안내 모달(현재 `Navigate`로 홈 이동). 2026-10-22 PATTERN-01 작성으로 추가 | `patterns/feedback.md` 2.3 "alert가 아닌 모달 사용처" 표 3건 적용 |

## ADOPT-05 frontend_admin 값 기준 확정

**목적:** 관리자 콘솔 화면을 통일할 기준값을 정하고 `theme.css`와 규칙 문서에 반영함. 디자인팀에 관리자용 디자인을 요청할 수 없어 Figma 정식 색을 우선 쓰고, 없는 값만 대비 계산으로 정함(2026-10-11 결정). 2026-10-11 조사 기준 주 버튼 배경 5종(`bg-slate-900`·`bg-blue-600`·`bg-blue-500`·`bg-red-500`·`bg-purple-600`), `bg-primary` 사용 0건, `--primary`와 `--destructive`가 같은 값(`#ef4444`)

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | ADOPT-02 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-05-01 | 바탕·회색 역할(Figma 정식 회색): 바탕·카드·팝업·입력 #FFFFFF(`--background`·`--card`·`--popover`·`--input`), 구분선·카드 테두리 #E6E6E6(Gray100, `--border`), 본문 글자 #1A1A1A(Gray900, `--foreground`, 흰 바탕 17.40:1), 보조 글자 #666666(Gray600, `--muted-foreground`, 5.74:1), 입력칸 테두리 #666666, 비활성 #B3B3B3(Gray300) 또는 투명도. #999999 이상 밝은 회색은 글자·입력 테두리에 쓰지 않음(흰 바탕 2.85:1). Tailwind slate는 쓰지 않음 | `theme.css` 회색이 모두 `var(--boaz-color-palette-gray-*)` 참조. 팔레트와 같은 hex 직접 기재 0건 |
| ADOPT-05-02 | 강조색(Figma 보라): `--primary`·`--ring`·`--sidebar-primary`·`--sidebar-ring` #6250C7(Primary-subtle-purple, 팔레트 purple-200), hover #493C95(purple-300), `--primary-foreground` #FFFFFF. #7A64F9(purple-100)는 흰 글자 4.18:1로 일반 글자 AA(4.5:1) 미달이고 관리자 버튼은 `text-xs`·`text-sm`이라 큰 글자 예외가 적용되지 않음. #6250C7은 6.01:1, #493C95는 8.88:1. 포커스 링은 #6250C7 2px에 흰 간격 2px(`ring-offset-2`)를 둠(간격이 없으면 주 버튼 위에서 1.00:1). 전역 `outline-ring/50`은 반투명이라 불투명으로 바꿈 | `--primary`·`--ring`·`--sidebar-primary`·`--sidebar-ring`이 `var(--boaz-color-palette-purple-200)`, hover가 `var(--boaz-color-palette-purple-300)` 참조. `--primary`와 `--destructive` 값이 다름. `theme.css`에 `/50` 포커스 없음 |
| ADOPT-05-03 | Figma에 없는 값 7개를 `theme.css`에 정함. 주석에 "Figma 밖 값, 2026-10-11 결정, 디자인팀 값이 생기면 교체"를 적음. 보조 면(표 머리글·hover·배지 바탕) #F5F5F5(`--muted`·`--secondary`, 흰색과 Gray100 사이 단계가 없어 추가), 위험 글자·버튼 #C92A2D(`--destructive`, Error-red #F96466을 어둡게 함. #F96466은 흰 바탕 2.98:1로 미달)와 위험 바탕 #FFF3F3, 성공 글자 #047857(`--success`, Tailwind emerald-700)과 바탕 #ECFDF5, 경고 글자 #B45309(`--warning`, Tailwind amber-700)와 바탕 #FFFBEB. 각 글자색은 흰색·#F5F5F5·자기 바탕 위에서 4.5:1 이상(위험 5.45·5.00·5.03, 성공 5.48·5.03·5.21, 경고 5.02·4.61·4.84) | `theme.css`에 7개 값과 출처 주석 |
| ADOPT-05-04 | 상태는 색만으로 구분하지 않음. 배지·알림에 아이콘이나 문구("성공", "실패")를 함께 둠. 색각 이상 시뮬레이션에서 성공·위험·경고가 거의 같은 색으로 보임 | `CLAUDE.md` 규칙 |
| ADOPT-05-05 | 모서리 기준: 입력·버튼 `rounded-sm`, 카드·표 `rounded-md`, 팝업 `rounded-lg`, `rounded-xl` 이상 쓰지 않음(출결 화면 기준). `--radius`에서 계산되는 값과 맞는지 확인. 토큰의 `rounded-boaz-sm`(12px) 등은 관리자에서 쓰지 않음(ADOPT-02-02) | 기준과 `--radius` 대응표 |
| ADOPT-05-06 | 쓰지 않는 `.dark` 블록과 `@custom-variant dark` 줄 삭제(관리자 콘솔은 다크 모드를 켜는 코드가 없음) | `theme.css`에 `.dark` 없음 |
| ADOPT-05-07 | 새 코드·수정 파일은 Tailwind 기본 팔레트(`slate-*`·`emerald-*` 등)와 `bg-white` 대신 시맨틱 클래스(`bg-background`·`bg-card`·`text-muted-foreground`·`text-destructive` 등)를 쓴다는 규칙을 CLAUDE.md에 추가. `src/shared/ui` 사용 현황 설명을 실제 import 현황에 맞게 고침 | 규칙 문서 |

## ADOPT-06 frontend_admin 화면 값 통일

**목적:** ADOPT-05 기준값을 모든 화면에 적용함. 화면 단위로 이슈·PR을 나누고, 개발 중인 화면은 그 기능 PR이 머지된 뒤 진행함

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 한 주 | ADOPT-05 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-06-01 | 모서리를 ADOPT-05-05 기준으로 바꿈 | `grep -rE 'rounded-[23]?xl' src` 0건 |
| ADOPT-06-02 | 성공·위험·경고 색을 ADOPT-05-03의 `--success`·`--destructive`·`--warning`으로 바꾸고, 상태 배지에 아이콘·문구를 붙임(ADOPT-05-04) | `grep -rE -e 'red-[0-9]' -e 'rose-[0-9]' -e 'emerald-[0-9]' -e 'amber-[0-9]' -e 'orange-[0-9]' src` 0건 |
| ADOPT-06-03 | 주 버튼 배경 5종을 `bg-primary`로, 위험 버튼을 `bg-destructive`로 바꿈 | 주 버튼 용도의 `bg-slate-900`·`bg-blue-600`·`bg-blue-500`·`bg-purple-600` 0건 |
| ADOPT-06-04 | 입력 포커스 표시를 `--ring`(ADOPT-05-02) 한 가지로 통일. `CreateButton`의 `ring-slate-300`(흰 바탕 약 1.5:1) 포함 | `grep -rE -e 'focus:border-slate-400' -e 'focus:border-blue-500' src` 0건 |
| ADOPT-06-05 | 모달 오버레이 배경(현재 14종)과 폭을 `modalStyles` 정의값으로 통일 | 오버레이 배경 1종 |
| ADOPT-06-06 | 그림자: 팝업 `shadow-2xl`, 카드 `shadow-2xs` | 카드에 `shadow-xl`·`shadow-2xl` 0건 |
| ADOPT-06-07 | 임의 글자 크기(`text-[11px]` 등)를 `text-xs`·`text-sm` 등 기본 단계로 바꿈. 관리자 기본 글자 14px 기준이라 `text-base` 이상으로 키우지 않음 | `grep -rE 'text-\[[0-9]+px\]' src` 0건 |
| ADOPT-06-08 | 회색 직접 지정을 시맨틱 클래스로 바꿈: `bg-white` → `bg-card`, `bg-slate-50`·`bg-slate-100` → `bg-background` 또는 `bg-muted`(쓰인 자리에 따라 판단, 일괄 치환 금지), `text-slate-400`(244곳, 흰 바탕 2.56:1 미달)·`text-slate-500` → `text-muted-foreground`, 나머지 `slate-*` 글자·테두리 → `text-foreground`·`border-border` | `grep -rE 'slate-[0-9]' src` 0건 |
| ADOPT-06-09 | 하드코딩 hex를 시맨틱 클래스·CSS 변수로 바꿈(인라인 `style` 포함) | `grep -rE '#[0-9a-fA-F]{6}' src --include='*.tsx'` 0건 |
| ADOPT-06-10 | 치환이 끝난 뒤 Tailwind 기본 팔레트를 막음. `@theme { --color-*: initial; }`를 `index.css`의 `tailwind-theme.css` import보다 **앞**에 두고(뒤에 두면 `--color-boaz-*` 전체가 지워짐), `--color-white`·`--color-black`은 다시 선언함(`bg-white`·`bg-black/50` 오버레이가 사라지지 않게). 그 뒤 시맨틱 색을 선언함. 치환 전에 넣으면 클래스가 사라져 화면이 깨지므로 마지막에 넣음. ESLint(`eslint.config.js`, CI `lint.yml`)가 있으므로 `no-restricted-syntax`로 `slate-*` 클래스를 막는 방법도 검토함 | `bg-slate-100`을 새로 쓰면 스타일이 적용되지 않음, `bg-boaz-palette-purple-200`·`bg-white` 클래스는 생성됨, `npm run build` 성공 |

## ADOPT-07 frontend_admin 공용 컴포넌트

**목적:** 화면마다 직접 마크업한 버튼·입력·모달·표를 공용 컴포넌트로 바꿈. 컴포넌트 코드는 이 저장소 범위 밖이라 `frontend_admin`의 `src/shared/ui`에 만듦. 컴포넌트별로 이슈·PR을 나눔

- 색·크기: ADOPT-05 기준을 따르며 COMPONENT 명세를 따르지 않음
- 동작·접근성(키보드, 포커스, role): 같은 종류의 COMPONENT 명세가 `review` 이상이면 그 Accessibility 절을 따름
- 해당 COMPONENT 명세가 아직 없으면: ADOPT-07 이슈에 정한 동작을 그 COMPONENT 명세 작성 때 입력으로 씀
- 모달: 관리자 모달은 확인·입력용이라 `role="dialog"`를 씀. COMPONENT-07의 `alertdialog`를 따르지 않음
- 충돌: 이 저장소와 `frontend_admin`의 결정이 충돌하면 디자인 시스템 리드가 정함

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 한 주 | ADOPT-06 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-07-01 | `src/shared/ui` 전체를 다시 쓸지·고칠지·지울지 결정. 2026-10-22 기준 import 0곳 4개(`Btn`, `SectionCard`, `Tag`, `CardHeader`)와 사용 중 7개(`CreateButton`, `DataLoadFailedNotice`, `DateTextInput`, `SelectDropdown`, `Tooltip`, `PdfPreviewModal`, `modalStyles`) | 결정이 이슈에 기록됨 |
| ADOPT-07-02 | 버튼: 시맨틱 클래스 기반으로 다시 만들고 화면의 `<button>` 교체 | 화면 파일의 주 버튼 직접 마크업 0건 |
| ADOPT-07-03 | 입력·셀렉트·날짜 입력(현재 직접 `<input>` 약 90, `<select>` 약 32) | 화면 파일의 직접 `<input>`·`<select>` 0건 |
| ADOPT-07-04 | 모달: 오버레이, 닫기 버튼, Esc 닫기, 포커스 가두기 | 화면 파일의 모달 마크업이 공용 컴포넌트 호출로 바뀜 |
| ADOPT-07-05 | 표(현재 11개 화면이 직접 `<table>`) | 화면 파일의 직접 `<table>` 0건 |
| ADOPT-07-06 | 카드·태그·배지 | 화면 파일의 배지 직접 마크업 0건 |
| ADOPT-07-07 | 빈 상태·불러오기 실패 안내(현재 약 13개 파일이 각자 문구·모양을 씀) | 대상 파일이 공용 컴포넌트를 씀 |
| ADOPT-07-08 | 탭(현재 1개 화면) | 해당 화면이 공용 컴포넌트를 씀 |
| ADOPT-07-09 | 페이지 이동(현재 아카이빙 관리 1개 화면 `src/pages/content-archive/ui/ArchivingSection.tsx`). 동작·접근성은 `components/pagination.md`(번호형이면 `<nav aria-label>`, 현재 페이지 `aria-current="page"`, 처음·끝 화살표 `aria-disabled`)를 따르고 값은 ADOPT-05 기준. 2026-10-22 COMPONENT-12 작성으로 추가 | 해당 화면이 공용 컴포넌트를 씀 |
