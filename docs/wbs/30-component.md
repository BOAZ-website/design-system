# COMPONENT 컴포넌트 명세·구현 작업 정의서

기준일 2026-09-28, 2026-10-22 인수인계 준비로 양식·티켓 정정, 2026-10-30 구현 범위 추가·구현 티켓 통합으로 정정 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 작업 정의서 목적

- Figma Components 페이지의 컴포넌트를 `components/<id>.md` 명세로 옮김
- 값 우선순위: 라이브에 있는 UI는 라이브 값, 없는 UI는 Figma 값. 토큰과 다르면 토큰 이름이 아니라 raw 값으로 적고 토큰 추가는 별도 이슈(2026-10-22 결정). 라이브에서 볼 수 없는 지원서 화면은 frontend 코드 값을 라이브 값으로 봄
- 상태를 한 가지 방식으로 정의함: **기본 상태**(default · disabled · selected · invalid · completed 중 하나) × **상호작용**(rest · hover · press · focus-visible). `hover-selected`처럼 두 상태를 합친 이름을 만들지 않고 selected 행의 hover 칸에 적음
- 명세(COMPONENT-01~16)를 먼저 만들고, 명세를 입력으로 React 컴포넌트를 구현함(COMPONENT-17~33, 아래 "구현" 절. 2026-10-30 결정). 명세마다 frontend 현재 구현 위치와 대응하는 ADOPT 티켓을 적음

**범위:** 공개 홈페이지 컴포넌트(라이브·Figma 기준). 명세의 값(색·크기)은 홈페이지 기준이고, 관리자 콘솔은 같은 컴포넌트를 쓰되 색·크기를 관리자 값으로 바꿔 씀(방식은 아래 "관리자 콘솔 적용 방식"). 동작·접근성은 두 앱 모두 명세를 따름
**범위 밖:** 페이지 전용 조각(커리큘럼 주차 행, 리크루팅 섹션, 탭바·푸터 레이아웃), 관리자 전용 컴포넌트(ADOPT-07)

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
- COMPONENT-01~08은 서로 선행이 없음. COMPONENT-01(button)을 먼저 끝내 양식을 확정하고 나머지는 그 양식으로 씀. 첫 PR 리뷰가 양식 확정 리뷰를 겸함

### status 전이

| status | 조건 | 올리는 사람 |
| --- | --- | --- |
| draft | 파일 생성. 빈 칸은 "미확인" 절에 둠 | 작성자 |
| review | 템플릿의 절이 모두 채워짐(해당 없는 절은 "해당 없음"과 이유). 참조 토큰이 모두 `tokens/`에 있음. frontmatter의 `figma_verified`가 `true`. 티켓의 "완료 확인 방법"을 전부 충족 | 작성자가 PR에서 올림. 작성자가 아닌 리뷰어가 승인한 뒤 머지함. 리뷰어가 없을 때의 절차는 CONTRIBUTING.md "리뷰와 머지" |
| stable | `review` 상태로 `dev`에 머지된 뒤, 이 명세의 컴포넌트(COMPONENT-17~33)가 구현되고 앱 PR(ADOPT-03·04·07)에서 명세대로 확인됨 | 작성자가 아닌 리뷰어가 별도 PR로 올림 |

- 명세의 완료 기준은 `review`까지. `stable`은 컴포넌트 구현과 앱 적용이 끝난 뒤 올림
- 선행 티켓이 COMPONENT·PATTERN이면 해당 명세가 `review` 이상일 때 선행이 풀린 것으로 봄. `stable` 전에 값이 바뀌면 명세 PR 본문에 영향 구현·ADOPT 티켓을 적음

---

## COMPONENT-01 button

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-01-01 | variant: brand(보라), neutral(흰색), glass(탭바 `rgba(208,207,249,0.1)`), text-link(이전·다음 페이지 + 화살표), outlined(지원서 임시저장, 회색 1px 보더)(2026-10-22 Figma 재확인으로 정정) | `components/button.md` Variants 표 |
| COMPONENT-01-02 | size: 800×68(폼 제출), 250×68·200×68(사각), 250×56(pill), 180×56(pill, Figma에 예외로 표시된 사전 알림 신청 전용), 130×44(소형, radius 20 `radius.md`), 154×44(glass, radius 40 `radius.full`). 검색 Tag mini 97×43은 옛 시안 요소라 두지 않음(2026-10-22 Figma 재확인으로 정정). 모바일 112×36·342×52·132×40·160×52·160×44는 Sizes 표 모바일 열에 적음. Figma radius 10(250×68·160×52)은 `radius.sm`(12) 설명의 결정대로 12로 통일하고, radius 8은 토큰이 없어 `raw:` 값으로 적음(TOKEN-03, 2026-10-22 정정) | Sizes 표(`docs/design-reference.md` 5.1·3.1) |
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
| COMPONENT-06-01 | variant: text(탭바 메뉴 항목, 페이지 이동이라 링크 내비게이션), box(커리큘럼 트랙, selected 흰 바탕, hover #666666. 모바일 7249:14310)(2026-10-22 Figma 재확인으로 정정), underline(프로젝트, 모바일에서 확인), category(FAQ 세로 목록) | Variants 표(탭 인터렉션 5915:7015, FAQ Category 2416:3726·3727, 2417:3731) |
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

- 사용처 없음(2026-10-23 결정). 지원 부문 선택은 라이브·최신 Figma 모두 라디오 목록이라 `components/radio.md`를 씀. 명세는 이전 Figma 기록용으로 남김

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-05 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-15-01 | 부문 선택 버튼 253×80, radius 8, 1px #666666, selected 보라 배경. 라디오 그룹 의미 | `components/selection-card.md`(4266:7628·7629) |
| COMPONENT-15-02 | radius 8은 `radius.xs` 토큰으로 씀(2026-10-22 사용처 4곳 확인으로 토큰 추가, #73. 이전 결정은 수치 기재) | `components/selection-card.md` |

## COMPONENT-16 form-add-button (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-02 | 3 | #50 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-16-01 | "+ 항목 추가"·"− 삭제(빼기 아이콘 버튼)" 행, 기본 상태 default의 상호작용 rest·hover·press·focus-visible(Figma 이름 Active_Focus는 focus-visible 칸에 적음), 삭제 hover 빨강 | `components/form-add-button.md`(인터랙션 세트 5188:454 중 Active_Focus 5775:9707, close 5755:10062, 모바일 7578:14703. 2009:4216은 이전 판)(2026-10-22 Figma 재확인으로 정정) |

---

## 구현(COMPONENT-17~33)

- `components/<id>.md` 명세(COMPONENT-01~16)를 React 컴포넌트로 구현해 이 저장소 패키지(`@boaz/design-system`)로 배포함(2026-10-30 결정)
- 공개 홈페이지(`frontend`)와 관리자 콘솔(`frontend_admin`)이 같은 컴포넌트를 씀. 앱은 git 태그로 설치하고 화면의 직접 마크업을 패키지 컴포넌트로 바꿈(ADOPT-03·04·07)
- 명세가 결과물의 정의임. 값·상태·동작·접근성은 명세를 따르고, 구현 중 명세와 다른 점을 발견하면 명세 수정 이슈를 먼저 냄

**범위:** 패키지 빌드 구성, Storybook, P0 8종(button, text-field, select, checkbox, radio, tab, modal, card), P1 7종(filter-chip, tag-chip, search-autocomplete, pagination, tag, progress-bar, form-add-button)
**범위 밖:** selection-card(사용처 없음, 2026-10-23 결정), search-autocomplete 결과 패널(2026-10-23 보류), 관리자 전용 컴포넌트(표, 빈 상태·불러오기 실패 안내, 날짜 입력. ADOPT-07에서 `frontend_admin`에 만듦), npm 레지스트리 배포, Storybook 사이트 배포

### 구현 규칙

| 항목 | 규칙 |
| --- | --- |
| 위치 | `src/components/<id>/`에 `<Name>.tsx`, `<Name>.module.css`, `<Name>.stories.tsx`, `<Name>.test.tsx`. `<id>`는 명세 파일 이름과 같음 |
| 스타일 | 컴포넌트별 CSS Modules 파일. 값은 `var(--boaz-*)` 토큰 변수로만 씀. 명세의 `raw:` 값만 CSS에 직접 적고 "비토큰 값" 절을 주석으로 가리킴 |
| 색 참조 | 시맨틱 색 변수(`--boaz-color-bg-*`·`--boaz-color-fg-*`·`--boaz-color-stroke-*`)를 씀. 팔레트 변수 직접 참조는 명세가 팔레트 경로로 적은 칸만 씀. 관리자 콘솔이 시맨틱 변수를 덮어써 색을 바꿀 수 있게 하기 위함 |
| 스타일 방식 | 앱의 스타일 도구(Vanilla Extract·Tailwind)에 의존하지 않음. 앱은 `tokens.css`와 패키지 CSS를 import만 하면 됨 |
| React | `react`·`react-dom`은 peer 의존성(두 앱 모두 19). 패키지에 React를 넣지 않음 |
| 상태 | 명세 4절 States의 기본 상태(default · disabled · selected · invalid · completed) × 상호작용(rest · hover · press · focus-visible)을 모두 구현함. 상태 이름은 명세 그대로 prop·data 속성 이름에 씀 |
| 접근성 | 명세 7절 Accessibility의 role·키보드·aria·포커스 링·터치 영역을 모두 구현함. 키보드 동작은 테스트로 확인함 |
| 이름 | 컴포넌트 이름은 PascalCase(`Button`, `TextField`). variant·size 값은 명세 3절 이름 그대로 씀. FE 합의 이름(`large-round` 등)은 명세 9절 대응표로만 찾음 |
| 크기 | 높이·패딩·글자 크기·행간·모서리는 컴포넌트 CSS 변수 `--boaz-<id>-<속성>`(예: `--boaz-button-height`)으로 읽고 명세 3절 값을 fallback으로 둠(`height: var(--boaz-button-height, 42px)`). 패키지는 이 변수를 선언하지 않음. 관리자 콘솔이 `theme.css`에서 덮어써 ADOPT-05 크기를 적용함. 패키지는 관리자 크기 값을 갖지 않음(2026-10-30 결정) |
| 확인 | 티켓마다 story(상태 조합별)와 테스트(키보드·aria). `npm run build`·`npm test`·Storybook 빌드가 CI에서 통과해야 머지함 |

- COMPONENT-19(button)을 먼저 끝내 구현 양식(파일 구성, prop 이름 방식, story·테스트 구성)을 확정하고 나머지는 그 양식으로 씀. 첫 PR 리뷰가 양식 확정 리뷰를 겸함
- COMPONENT-19~26은 COMPONENT-17·18 뒤에 서로 선행 없이 진행할 수 있음. 단, text-field를 쓰는 컴포넌트(search-autocomplete, form-add-button)는 COMPONENT-20 뒤에 함

### 관리자 콘솔 적용 방식 (2026-10-30 결정)

- 색: 관리자 `theme.css`에서 시맨틱 색 변수(`--boaz-color-bg-*` 등)를 덮어씀
- 크기: 위 "크기" 행의 컴포넌트 CSS 변수를 관리자 `theme.css`의 `:root`에서 덮어씀. 한 컴포넌트에 크기가 두 가지 이상 필요하면(예: 표 행·툴바 버튼 32px) 그 자리에만 클래스로 변수 값을 지정함
- 접근성 값(포커스 링 굵기·간격, 누르는 영역 24×24 이상)은 변수로 열지 않고 컴포넌트 CSS에 고정함. 포커스 링 색은 시맨틱 색 덮어쓰기로 바꿀 수 있음
- 근거: 관리자 크기는 관리자 콘솔이 정함(ADOPT-05). 관리자 값이 패키지에 있으면 값을 바꿀 때마다 릴리스가 필요해 2026-12 오픈 일정에 병목이 됨. 밀도 모드(`data-density`)·관리자용 size 값은 같은 이유로 채택하지 않음
- 크기가 아니라 모양이 다른 경우는 변수로 처리하지 않고 명세에 variant를 추가함: text-field 상자형(#81, COMPONENT-20 착수 전), button destructive(#82, COMPONENT-19 착수 전)
- 컴포넌트 CSS 변수 규칙
  - `tokens/` JSON과 `dist/tokens.css`에 넣지 않음. `AGENTS.md` "토큰 이름 규칙"의 컴포넌트 전용 토큰 계층에 해당하지 않음
  - 컴포넌트 루트·size 클래스에서 변수에 값을 선언하지 않음. 선언하면 앱이 덮어쓴 값이 적용되지 않음
  - 컴포넌트마다 변수 목록을 story 문서 설명에 적음. 변수 이름 삭제·변경은 prop 이름 삭제·변경과 같은 breaking 변경으로 봄
  - Storybook 관리자 배경(COMPONENT-18-02)에 관리자 크기 덮어쓰기 예시를 함께 넣어 관리자 크기에서 화면이 깨지지 않는지 확인함

---

## COMPONENT-17 패키지 빌드 구성

**목적:** 토큰만 배포하던 패키지에 React 컴포넌트 빌드를 추가함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | #83 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-17-01 | TypeScript·Vite 라이브러리 빌드 구성. `react`·`react-dom`을 peer 의존성과 빌드 제외(external)로 둠 | `npm run build` 후 `dist/`에 컴포넌트 JS·타입·CSS 생성, 번들에 React 코드 없음 |
| COMPONENT-17-02 | `npm run build` 하나로 토큰 빌드(Style Dictionary)와 컴포넌트 빌드를 함께 실행. 기존 `dist/` 토큰 파일 4종의 경로·내용은 바꾸지 않음 | 빌드 전후 `git diff -- dist/tokens.css dist/tokens.js dist/tokens.d.ts dist/tailwind-theme.css` 변경 없음 |
| COMPONENT-17-03 | `package.json` `exports`에 컴포넌트 진입점(`.`)과 컴포넌트 CSS(`./styles.css`) 추가. 기존 `./tokens.css`·`./tokens`·`./tailwind-theme.css` 유지 | 빈 Vite + React 19 프로젝트에서 git 태그 설치 후 `import { Button } from '@boaz/design-system'` 타입 검사·빌드 통과 |
| COMPONENT-17-04 | 키보드·aria 동작 테스트 환경(Vitest, Testing Library, jsdom). `npm test` 스크립트 | 예시 테스트 1개 통과 |
| COMPONENT-17-05 | CI에 타입 검사·테스트 추가. `dist/` 일치 검사 대상에 컴포넌트 빌드 결과 포함 | 일부러 `dist/`를 빼고 push한 PR에서 CI 실패 |
| COMPONENT-17-06 | `AGENTS.md`에 컴포넌트 구현 절차, `CONTRIBUTING.md`에 개발 명령(`npm test`, Storybook) 반영 | 두 문서의 해당 절 |

## COMPONENT-18 Storybook

**목적:** 컴포넌트를 앱 없이 상태별로 확인하고 리뷰할 수 있게 함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-17 | 2 | #84 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-18-01 | Storybook(React + Vite) 설치, `npm run storybook`·`npm run build-storybook` 스크립트. `tokens.css`를 전역으로 불러옴 | 로컬에서 Storybook 실행, story 화면에 `--boaz-*` 변수 적용 |
| COMPONENT-18-02 | 배경 전환: 홈페이지(검정 바탕 `color.bg.canvas`)와 관리자 콘솔(흰 바탕, 시맨틱 색·크기 변수 덮어쓰기 예시 포함) 두 가지 | 툴바에서 전환 시 관리자 색·크기로 바뀜 |
| COMPONENT-18-03 | 접근성 검사 애드온(a11y) 추가 | story마다 접근성 패널 표시 |
| COMPONENT-18-04 | CI에서 Storybook 빌드 실행 | Storybook 빌드 실패 시 CI 실패 |

## COMPONENT-19 Button 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-01(#82 반영) | 2 | #85 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-19-01 | variant(brand, neutral, glass, text-link, outlined, #82에서 추가하는 destructive)와 size를 `components/button.md` 3절대로 구현 | variant·size별 story |
| COMPONENT-19-02 | 4절 States 전부(disabled, hover·press·focus-visible). focus-visible은 `stroke.focus` 2px, offset 2px. 흰 표면 위는 `stroke.focus-inverse` | 상태별 story, 접근성 패널 위반 0건 |
| COMPONENT-19-03 | 5절 Behavior의 pending(비동기 중) 표시와 중복 클릭 방지 | pending story, 테스트 |
| COMPONENT-19-04 | 7절 Accessibility: `<button>` 요소, `type` 기본값 `button`, 아이콘만 있는 버튼의 `aria-label` | 테스트(Enter·Space 동작, 이름) |

## COMPONENT-20 TextField 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-02(#81 반영) | 2 | #86 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-20-01 | 한 줄 입력(`<input>`)과 여러 줄 입력(`<textarea>`), #81에서 추가하는 상자형 variant를 `components/text-field.md` 3절대로 구현 | variant별 story |
| COMPONENT-20-02 | 라벨 요소와 입력칸 연결, 라벨 축소 동작 | 테스트(라벨로 입력칸 찾기) |
| COMPONENT-20-03 | 4절 States(hover, focus-visible, invalid, disabled). 오류 문구를 `aria-invalid`·`aria-describedby`로 연결 | 상태별 story, 테스트 |

## COMPONENT-21 Select 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 한 주 | COMPONENT-17, COMPONENT-18, COMPONENT-03 | 2 | #87 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-21-01 | field와 목록을 `components/select.md` 3·4절대로 구현(check 아이콘, field hover·focus·열림 상태) | 상태별 story |
| COMPONENT-21-02 | `role="combobox"`·`listbox`·`option`, `aria-expanded`·`aria-activedescendant`·`aria-selected` | 테스트(role·aria 값) |
| COMPONENT-21-03 | 키보드: 방향키·Home/End·Esc·타이핑 검색. 목록 항목은 Tab 대상이 아님 | 테스트(키 입력별 선택 항목) |
| COMPONENT-21-04 | 다중 선택일 때 선택값 칩 표시는 COMPONENT-27(filter-chip)이 생기면 연결함. 그 전에는 명세 기본 표시를 씀 | story |

## COMPONENT-22 Checkbox 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-04 | 2 | #88 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-22-01 | `components/checkbox.md`의 상자(radius 5, 1px 보더, checked `color.bg.brand-solid`)와 표 문항용 원 모양 | variant·상태별 story |
| COMPONENT-22-02 | 숨긴 `<input type="checkbox">`의 포커스를 보이는 상자에 표시, 라벨 연결 | 테스트(Space로 체크, 라벨 클릭) |

## COMPONENT-23 Radio 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-05 | 2 | #89 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-23-01 | `components/radio.md`의 원과 상태(hover 흰 테두리, disabled) | 상태별 story |
| COMPONENT-23-02 | 묶음 컴포넌트: `<fieldset>`·`<legend>` 또는 `role="radiogroup"` + 제목 연결. 방향키 이동 | 테스트(방향키 이동, 묶음 이름) |

## COMPONENT-24 Tab 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-06 | 2 | #90 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-24-01 | `components/tab.md` 3절의 variant(category 등)와 4절 상태 | variant·상태별 story |
| COMPONENT-24-02 | `role="tablist"`·`tab`·`tabpanel`, `aria-selected`, 방향키 이동 | 테스트(방향키 이동, 선택 시 패널 전환) |

## COMPONENT-25 Modal 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-19, COMPONENT-07 | 2 | #91 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-25-01 | `components/modal.md`의 오버레이·본문·버튼 영역(모달 안 버튼은 COMPONENT-19 Button 사용) | 종류별 story |
| COMPONENT-25-02 | role은 명세대로 `alertdialog`. 관리자 콘솔용 확인·입력 모달을 위해 `dialog`도 고를 수 있게 함(ADOPT-07 관리자 모달 규칙) | 테스트(role 값) |
| COMPONENT-25-03 | 열 때 포커스 이동, 포커스 가두기, Esc 닫기, 닫은 뒤 연 요소로 포커스 복귀, 뒤 화면 스크롤 막기 | 테스트(Tab 순환, Esc, 포커스 복귀) |
| COMPONENT-25-04 | `patterns/feedback.md`의 모달 사용처(확인, loading, 안내)를 story로 둠 | 사용처별 story |

## COMPONENT-26 Card 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-08 | 2 | #92 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-26-01 | `components/card.md` 3절의 variant(project, photo, blog 등)와 hover | variant별 story |
| COMPONENT-26-02 | 링크 카드: 제목 링크 + 클릭 영역 확장(stretched-link). 카드 전체를 `<a>`로 감싸지 않음 | 테스트(링크 이름이 제목) |

## COMPONENT-27 FilterChip 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-19, COMPONENT-09 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-27-01 | `components/filter-chip.md`의 칩과 상태 | 상태별 story |
| COMPONENT-27-02 | ✕ 버튼에 `aria-label="{값} 선택 해제"` | 테스트(버튼 이름) |

## COMPONENT-28 TagChip 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-27, COMPONENT-10 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-28-01 | `components/tag-chip.md`의 칩과 상태, ✕ 버튼 이름 | 상태별 story, 테스트 |

## COMPONENT-29 SearchAutocomplete 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-20, COMPONENT-11 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-29-01 | `components/search-autocomplete.md`의 검색 입력(`<input type="search">`, `aria-label`). 결과 패널은 보류 범위라 구현하지 않음 | story |
| COMPONENT-29-02 | 결과 수 안내 영역(`role="status"`): 앱이 넘긴 결과 수로 "검색 결과 N건"·"검색 결과가 없습니다." | 테스트(안내 문구) |

## COMPONENT-30 Pagination 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-19, COMPONENT-12 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-30-01 | `components/pagination.md`의 점·번호형, 화살표, 데스크톱·모바일 크기 | 형태·폭별 story |
| COMPONENT-30-02 | `<nav aria-label>`, 현재 페이지 `aria-current="page"`, 처음·끝 화살표 `aria-disabled`, 누르는 영역 24×24 이상 | 테스트(aria 값) |

## COMPONENT-31 Tag 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-13 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-31-01 | `components/tag.md`의 variant. 누를 수 없는 표시용이라 `<span>`으로 만듦 | variant별 story |

## COMPONENT-32 ProgressBar 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-14 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-32-01 | `components/progress-bar.md`의 segment(`<span aria-hidden="true">`)와 단계 표시 | 단계별 story |
| COMPONENT-32-02 | root에 `role="progressbar"`·`aria-valuenow`·`aria-valuemin`·`aria-valuemax`·`aria-valuetext` | 테스트(aria 값) |

## COMPONENT-33 FormAddButton 구현

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-19, COMPONENT-20, COMPONENT-16 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-33-01 | `components/form-add-button.md`의 add 행(`<button type="button">`, "+"는 `aria-hidden="true"`)과 삭제 버튼(`aria-label="{항목 이름} {번호} 삭제"`) | story, 테스트(버튼 이름) |
| COMPONENT-33-02 | 추가 후 새 입력칸, 삭제 후 이웃 행으로 포커스 이동 | 테스트(포커스 위치) |
