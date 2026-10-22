# COMPONENT 컴포넌트 명세서

기준일 2026-09-28, 2026-10-22 인수인계 준비로 양식·티켓 정정 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- Figma Components 페이지의 컴포넌트를 `components/<id>.md` 명세로 옮김
- 상태를 한 가지 방식으로 정의함: **기본 상태**(default · disabled · selected · invalid · completed 중 하나) × **상호작용**(rest · hover · press · focus-visible). `hover-selected`처럼 두 상태를 합친 이름을 만들지 않고 selected 행의 hover 칸에 적음
- 코드는 만들지 않음. 명세마다 frontend 구현 위치를 적음. 관리자 콘솔은 이 명세를 따르지 않으므로 대응하는 ADOPT-07 티켓만 적음

**범위:** 공개 홈페이지 컴포넌트(Figma 기준). 관리자 콘솔은 이 명세를 따르지 않음. 관리자 콘솔은 shadcn 방식 CSS 변수(`--background`·`--primary` 등)에 팔레트 토큰 값을 연결해 씀(ADOPT-05). shadcn 컴포넌트·Radix는 설치돼 있지 않아 공용 컴포넌트는 ADOPT-07에서 직접 만듦
**범위 밖:** 페이지 전용 조각(커리큘럼 주차 행, 리크루팅 섹션, 탭바·푸터 레이아웃), 컴포넌트 코드 패키지

### 명세 파일 양식

| 절 | 내용 |
| --- | --- |
| frontmatter | `id`(파일명), `name_ko`, `ticket`, `tier`(P0·P1), `status`(draft → review → stable), `figma`(노드 ID 목록), `figma_verified`, `tokens_version`, `owner`(역할명), `last_updated` |
| 개요 | 용도, 사용 화면, 관련 명세 |
| Anatomy | 슬롯(root·label·icon 등)과 필수 여부, 적용 토큰 |
| Variants·Sizes | 종류, 크기(px, 데스크톱·모바일), radius·padding·글자 토큰 |
| States | 기본 상태 × 상호작용 표, 셀은 bg·fg·stroke 토큰, 근거 열 |
| Behavior | 클릭·키보드 동작, 비동기 중 동작, 전환(시간·easing) |
| 반응형 | 기준 폭, 모바일에서 바뀌는 속성 |
| Accessibility | role, 키보드, aria, 대비, 터치 영역, 포커스 링, 비활성 표시 |
| Do / Don't | 사용 규칙 |
| 코드 대응 | frontend 파일 위치, ADOPT-07 티켓, FE 이름 대응 |
| 비토큰 값 | `raw:` 값과 토큰 범위 밖 값(모션·z-index·아이콘 크기) 모음 |
| 미확인 | Figma 확인이 필요해 비워 둔 칸 |

- 복사 원본은 `components/_template.md`. 절 구성·표 열·표기 규칙은 템플릿을 그대로 따름
- 표기 규칙: 토큰은 전체 경로를 백틱으로 적음. "근거" 열은 `Figma <노드ID>`·`Figma 없음(추정)`·`코드 <경로>`·`design-reference <절>` 네 가지만 씀(7절 "대비" 행만 `docs/wbs/20-token.md` 대비표 행 또는 계산값)
- 시맨틱이 없는 색은 팔레트 경로(`color.palette.gray.100`)로 적음
- 팔레트에도 없는 값(glass rgba, radius 10·8 등)은 `raw:` 값으로 적고 "비토큰 값" 절에 근거를 둠. 두 번째 사용처가 생기면 토큰 추가를 별도 이슈로 제안함
- 모든 명세는 쓰는 토큰이 `tokens/`에 실제로 있어야 함. `dist/tokens.d.ts`와 대조함. CI `Tokens Build`가 명세의 백틱 안 토큰 이름을 `dist/tokens.css`와 대조해 없는 이름·짧은 표기·Figma 링크를 실패 처리함(2026-10-22 추가). CodeRabbit(자동 리뷰 도구) 지침 5번은 보조 수단임
- Figma 캡처는 넣지 않고 노드 ID만 적음(원본 링크는 노션에만)
- Figma 접근이 없어도 `docs/design-reference.md`·`docs/wbs/20-token.md`만으로 `draft`까지 쓸 수 있음. Figma 확인이 필요한 칸은 "미확인" 절에 남김
- 값의 근거가 Figma와 토큰에서 다르면 토큰을 따름(`docs/design-reference.md` 머리말)
- COMPONENT-01~08은 서로 선행이 없음. COMPONENT-01(button)을 먼저 끝내 양식을 확정하고 나머지는 그 양식으로 씀. 첫 PR 리뷰가 양식 확정 리뷰를 겸함

### status 전이

| status | 조건 | 올리는 사람 |
| --- | --- | --- |
| draft | 파일 생성. 빈 칸은 "미확인" 절에 둠 | 작성자 |
| review | 템플릿의 절이 모두 채워짐(해당 없는 절은 "해당 없음"과 이유). 참조 토큰이 모두 `tokens/`에 있음. frontmatter의 `figma_verified`가 `true`. 티켓의 "완료 확인 방법"을 전부 충족 | 작성자가 PR에서 올림. 작성자가 아닌 리뷰어가 승인한 뒤 머지함. 리뷰어가 없을 때의 절차는 CONTRIBUTING.md "리뷰와 머지" |
| stable | `review` 상태로 `dev`에 머지된 뒤, 이 명세를 쓰는 앱 PR(ADOPT-03·04 등)이 명세대로 구현·확인됨 | 작성자가 아닌 리뷰어가 별도 PR로 올림 |

- Phase 2 완료 기준은 `review`까지. `stable`은 앱 구현이 끝난 뒤 올림
- 선행 티켓이 COMPONENT·PATTERN이면 해당 명세가 `review` 이상일 때 선행이 풀린 것으로 봄. `stable` 전에 값이 바뀌면 명세 PR 본문에 영향 ADOPT 티켓을 적음

---

## COMPONENT-01 button

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-01-01 | variant: brand(보라), neutral(흰색), glass(탭바 `rgba(208,207,249,0.1)`), text-link(이전·다음 페이지 + 화살표) | `components/button.md` Variants 표 |
| COMPONENT-01-02 | size: 800×68(폼 제출), 250×68·200×68(사각), 250×56(pill), 180×56(pill, Figma에 예외로 표시된 사전 알림 신청 전용), 130×44(소형, radius 20 `radius.md`), 154×44(glass, radius 40 `radius.full`), mini 97×43(검색 Tag). 모바일 112×36·342×52·132×40·160×52·160×44는 Sizes 표 모바일 열에 적음. Figma radius 10(250×68·160×52)은 `radius.sm`(12) 설명의 결정대로 12로 통일하고, radius 8은 토큰이 없어 `raw:` 값으로 적음(TOKEN-03, 2026-10-22 정정) | Sizes 표(`docs/design-reference.md` 5.1·3.1) |
| COMPONENT-01-03 | **상태값 색**<br>brand: `bg.brand-solid` #7A64F9 → `bg.brand-solid-hover` #493C95 → `bg.brand-solid-press` #2C2459. 글자는 `fg.on-brand` → `fg.on-brand` → `fg.muted` #999999(press 글자 대비 4.9:1).<br>neutral: `bg.neutral-solid` #FFFFFF → `-hover` #999999 → `-press` #666666. 글자는 `fg.on-inverse`.<br>disabled: `bg.disabled` #666666, `fg.disabled` #999999.<br>glass: hover는 Figma에 있음(그라데이션 오버레이, `raw:` 값). press·disabled는 Figma에 없어 `Figma 없음(추정)`으로 새로 정의함.<br>text-link: hover #999999·press #666666은 Figma에 있음. disabled만 `Figma 없음(추정)`(2026-10-22 Figma 재확인으로 정정).<br>모달 안 버튼(닫기 #E6E6E6, 신청 검정): COMPONENT-07에서 정의함.<br>**brand 버튼 글자 크기(대비 근거)**<br>brand 위 흰 글자는 4.18:1이라 큰 글자 기준(Bold 18.67px 이상 또는 Regular 24px 이상)으로만 통과함.<br>데스크톱 brand 버튼 글자는 `typography.body-2`(20 Bold) 이상(`body-2`·`headline-*`·`body-1`)을 씀.<br>`body-2-regular`(20/400)는 쓰지 않음.<br>`body-3`(18 Bold)은 기준보다 0.67px 작아 쓰지 않음.<br>모바일 `typography.body-2-mobile`(16, 600)은 큰 글자가 아니라 AA 미달이지만 Figma 값이라 유지함(2026-10-22 결정, TOKEN-05 대비표) | States 표(Figma 5875:9829·9831·9833, 5152:9047·9049, 5164:8774, 5188:8718) |
| COMPONENT-01-04 | focus-visible: `stroke.focus` 2px outline, offset 2px(Figma에 버튼 Focus 없음, TOKEN-05-03 근거). offset 없이 버튼 안쪽에 그리면 보라 위 2.26:1로 미달. 흰 표면(모달) 위 버튼은 `stroke.focus-inverse` | States 표 |
| COMPONENT-01-05 | FE 합의 이름(`large-round`, `medium-primary`, `medium-white`, `small-round`, `mini` 등)과 명세 variant·size 대응표 | 코드 대응 절 |

## COMPONENT-02 text-field

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-02-01 | 하단 보더형 입력. 폭 800·390·252(데스크톱), 342·164·108(모바일)<br>모바일 252는 Figma에 없음(7578:14671은 이름만 252, 실제 폭 108)<br>높이: 모바일 56, 드롭다운 결합형만 60(2026-10-22 Figma 재확인으로 정정) | Sizes 표 |
| COMPONENT-02-02 | 상태: 입력 없음, 입력 중·완료, focus(보더·라벨 #7A64F9, 라벨 18 Regular → Text 1 14 Light), 필수 항목 누락, 입력 에러, 글자 수 초과(문단형) | States 표(Figma 5239:3993, 5946:10316, 지원 폼 섹션 1981:4329) |
| COMPONENT-02-03 | 변형: 한 줄, 문단(Body 4 - Paragraph), 드롭다운 결합형 | Variants 표 |
| COMPONENT-02-04 | 에러 메시지와 입력을 `aria-describedby`로 연결, `aria-invalid` | Accessibility 절 |

## COMPONENT-03 select(dropdown)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-03-01 | 트리거 2종(필드형, 칩형 "전체 부문·기수"), 열림·닫힘 | Variants 표 |
| COMPONENT-03-02 | 옵션 상태: default, hover, selected, selected의 hover(Figma 이름은 hover-selected. 명세에서는 selected 행의 hover 칸에 적음) | States 표(아카이빙 Dropdown 3496:6379~6393) |
| COMPONENT-03-03 | 키보드: 방향키 이동, Home/End, Enter·Space 선택, Esc 닫기, 타이핑 검색<br>포커스는 trigger에 두고 `aria-expanded`·`aria-activedescendant`로 활성 항목을 알림(2026-10-22 Figma 재확인으로 정정) | Accessibility 절(지원폼 목록 항목 5393:997) |

## COMPONENT-04 checkbox

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-04-01 | 상태: unchecked, checked(보라 #7A64F9). Figma에 hover·disabled·indeterminate 없음 → 명세에서 새로 정의하고 `Figma 없음(추정)` 표시. 노드·크기·모서리는 `docs/design-reference.md` 5.8.1(데스크톱 `5946:10027` 24×24, 모바일 `7578:14600` 20×20, radius 5)<br>focus-visible: `stroke.focus` 2px outline, offset 2px(Figma 없음, 결정). 흰 표면(모달) 위는 `stroke.focus-inverse` | States 표 |
| COMPONENT-04-02 | 약관 동의형(체크박스 + 라벨 + 전문 보기·전문 닫기 버튼) 조합. 세트 `5799:10193`, 버튼 `4266:7630`·`4266:7631`(design-reference 5.8.1) | Variants 표 |

## COMPONENT-05 radio

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-05-01 | 원형 16px + 라벨, 상태 default·hover·selected. hover는 Radio Button 세트 5188:409에서 정의됨<br>2391:5869(흰색)·5870(보라)은 라디오가 아니라 표형 질문 행 이름(24 Bold)으로 radio-group의 legend에 해당함(2026-10-22 Figma 재확인으로 정정) | States 표(지원폼 Radio 2007:3436·3437, 세트 5188:409), Group 표(행 이름 2391:5869·5870) |
| COMPONENT-05-02 | 숨긴 input에 포커스 표시가 없는 문제를 focus-visible로 해결 | Accessibility 절 |

## COMPONENT-06 tab

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-06-01 | variant: text(탭바 메뉴 항목, 페이지 이동이라 링크 내비게이션), box(커리큘럼 트랙, hover·selected 흰 배경. 모바일 7249:14310)(2026-10-22 Figma 재확인으로 정정), underline(프로젝트, 모바일에서 확인), category(FAQ 세로 목록) | Variants 표(탭 인터렉션 5915:7015, FAQ Category 2416:3726·3727, 2417:3731) |
| COMPONENT-06-02 | 상태 default·hover·selected, selected의 hover(selected 행의 hover 칸) | States 표 |
| COMPONENT-06-03 | `role="tablist"`·`tab`, 방향키 이동 | Accessibility 절 |

## COMPONENT-07 modal

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-07-01 | 구조: 441×235, radius 40(`radius.full`), 흰 표면(`bg.surface-inverse`)·2px 보더 `color.palette.gray.200` #CCCCCC, 아이콘 48(! · ✓ · 스피너) + 제목(`typography.body-2`, `fg.on-inverse`) + 설명(`typography.body-4` 18 Regular, `color.palette.gray.600` #666666. 흰 위 `fg.muted` #999999는 2.85:1이라 쓰지 않음) + 버튼 130×44(radius 40 `radius.full`, 18 Regular, Figma 4243:4439 `팝업창 버튼`(2026-10-22 Figma 재확인으로 정정). 닫기 바탕 `color.palette.gray.100` #E6E6E6·글자 `fg.on-inverse`, 신청 바탕 `color.palette.gray.1000`·글자 `fg.default`). 시맨틱이 없는 색은 TOKEN-05 "시맨틱으로 만들지 않는 색"대로 팔레트를 직접 참조함<br>신청 버튼 hover: Figma #7A64F9는 18 Regular 흰 글자와 4.18:1로 미달이라 `bg.brand-solid-hover` #493C95로 바꿈(디자이너 확인 대기) | Anatomy 절(모달 창 4412:7387) |
| COMPONENT-07-02 | 종류 7개: 안내 2(지원 기간 아님·모집 마감), 입력 오류 2(이메일 재입력·이메일 중복), 성공, 로딩, 실패. 종류별 노드 ID와 문구는 `docs/design-reference.md` 5.8 표 | Variants 표 |
| COMPONENT-07-03 | 버튼 규칙: 안내형 2개(닫기·신청), 나머지 1개(닫기). 로딩 모달도 닫기 버튼 있음(Figma 5164:5587) | Variants 표 |
| COMPONENT-07-04 | `role="alertdialog"`, 포커스 가두기·반환, Esc 닫기. 모달 안 버튼의 포커스 링은 `stroke.focus-inverse`(흰 표면 위 4.18:1) | Accessibility 절 |

## COMPONENT-08 card

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-08-01 | 공통 anatomy: `bg.layer` #1A1A1A, `stroke.weak` #333333 1px, radius 20(`radius.md`). 썸네일 radius는 종류별로 다름: 프로젝트 20(`radius.md`), 블로그 16 `raw:`, 활동사진은 위쪽 두 모서리만 20<br>후기 카드 Figma 10은 `radius.sm`(12)으로 통일(2026-10-22 Figma 재확인으로 정정) | Anatomy 절(Radius 시트 Project Block 1728:3724) |
| COMPONENT-08-02 | 종류 7개(프로젝트·블로그·활동사진·대상·모집·FAQ·후기, `docs/design-reference.md` 5.4 기준. 2026-10-22 정정, 이전 6개 목록의 "분야"는 Figma에 없음)와 각 hover 동작. 대상 카드 바탕 #333333은 `color.palette.gray.800`, 활동사진 썸네일 자리 채움 rgba(255,255,255,0.6)은 `raw:` 값(hover 오버레이 아님, Figma 5236:915)<br>프로젝트·블로그·활동사진 hover는 그라데이션 바탕·보더(Figma 5236:823)(2026-10-22 Figma 재확인으로 정정) | Variants 표(카드 인터렉션 5875:9878) |
| COMPONENT-08-03 | 카드 전체가 링크일 때 포커스·키보드 동작 | Accessibility 절 |

---

## COMPONENT-09 filter-chip (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-06 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-09-01 | 부문·기수 필터 칩, 상태 default·hover·press·selected, selected의 hover(selected 행의 hover 칸)<br>토글이 아니라 select chip 트리거와 같은 노드. 목록·키보드는 COMPONENT-03(2026-10-22 Figma 재확인으로 정정) | `components/filter-chip.md`(아카이빙 부문·기수 필터 3723:9261~9270) |

## COMPONENT-10 tag-chip (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-09 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-10-01 | 선택한 값을 ✕로 지우는 칩, ✕ hover·press 빨강 | `components/tag-chip.md` |
| COMPONENT-10-02 | ✕ 버튼 `aria-label="{값} 선택 해제"` | Accessibility 절 |

## COMPONENT-11 search-autocomplete (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-02 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-11-01 | 검색 입력 + 결과 목록(일치 글자 강조), 빈 결과·로딩 상태 새로 정의 | `components/search-autocomplete.md`(검색 Dropdown 3613:7592) |
| COMPONENT-11-02 | `role="combobox"`, `aria-activedescendant` | Accessibility 절 |

## COMPONENT-12 pagination (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-12-01 | 도트형(화살표 + 점 5개), 화살표 default·hover·press, 점 default·selected | `components/pagination.md` |

## COMPONENT-13 tag (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-13-01 | 읽기 전용 라벨(부문·기수 태그): 1px #999999 보더, radius 20, Text 1 14 Light #E6E6E6, 패딩 세로 4·가로 12(모바일 4·8)(2026-10-22 Figma 재확인으로 정정) | `components/tag.md`(3723:9271·9272) |
| COMPONENT-13-02 | 검색 Tag 버튼(mini·small)과 구분 | Do / Don't 절 |

## COMPONENT-14 progress-bar (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-14-01 | 지원 폼 단계 표시 800×10, `role="progressbar"`·`aria-valuenow` | `components/progress-bar.md`(2009:3442) |

## COMPONENT-15 selection-card (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-05 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-15-01 | 부문 선택 버튼 253×80, radius 8, 1px #666666, selected 보라 배경. 라디오 그룹 의미 | `components/selection-card.md`(4266:7628·7629) |
| COMPONENT-15-02 | radius 8은 radius 토큰에 없어 명세에 수치로 기재 | `components/selection-card.md` |

## COMPONENT-16 form-add-button (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-02 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-16-01 | "+ 항목 추가"·"− 삭제(빼기 아이콘 버튼)" 행, 기본 상태 default의 상호작용 rest·hover·press·focus-visible(Figma 이름 Active_Focus는 focus-visible 칸에 적음), 삭제 hover 빨강 | `components/form-add-button.md`(인터랙션 세트 5188:454 중 Active_Focus 5775:9707, close 5755:10062, 모바일 7578:14703. 2009:4216은 이전 판)(2026-10-22 Figma 재확인으로 정정) |
