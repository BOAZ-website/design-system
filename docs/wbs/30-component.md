# COMPONENT 컴포넌트 명세서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- Figma Components 페이지의 컴포넌트를 `components/<id>.md` 명세로 옮김
- 상태를 한 가지 방식으로 정의함: **기본 상태**(default · disabled · selected · invalid · completed 중 하나) × **상호작용**(hover · press · focus-visible)
- 코드는 만들지 않음. 명세마다 frontend 구현 위치와 관리자 콘솔(shadcn) 대응을 적음

**범위:** 공개 홈페이지 컴포넌트(Figma 기준). 관리자 콘솔은 shadcn을 그대로 쓰고 토큰만 공유
**범위 밖:** 페이지 전용 조각(커리큘럼 주차 행, 리크루팅 섹션, 탭바·푸터 레이아웃), 컴포넌트 코드 패키지

### 명세 파일 양식

| 절 | 내용 |
| --- | --- |
| frontmatter | `id`, `name_ko`, `tier`(P0·P1), `status`(draft → review → stable), `figma`(노드 ID), `owner`, `last_updated` |
| 개요 | 용도, 사용 화면 |
| Anatomy | 슬롯(root·label·icon 등)과 필수 여부 |
| Variants·Sizes | 종류, 크기(px), radius·padding 토큰 |
| States | 상태별 bg·fg·stroke 토큰, Figma 근거 유무 |
| Behavior | 클릭·키보드 동작, 전환 |
| Accessibility | role, 키보드, aria, 대비 |
| Do / Don't | 사용 규칙 |
| 코드 대응 | frontend 파일 위치, shadcn 컴포넌트 |

- 공통 기능: 모든 명세는 위 양식을 따르고, 쓰는 토큰이 `tokens/`에 실제로 있어야 함(CodeRabbit 지침 5번)
- Figma 캡처는 넣지 않고 노드 ID만 적음(원본 링크는 노션에만)

---

## COMPONENT-01 button

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-01-01 | variant: brand(보라), neutral(흰색), glass(탭바 `rgba(208,207,249,0.1)`), text-link(이전·다음 페이지 + 화살표) | `components/button.md` Variants 표 |
| COMPONENT-01-02 | size: 800×68(폼 제출), 250×68·200×68(사각), 250×56·180×56(pill), 154×44·130×44(소형), mini(검색 Tag) | Sizes 표 |
| COMPONENT-01-03 | 상태값: brand #7A64F9 → hover #493C95 → press #2C2459(글자 #999999, 대비 4.9:1로 AA 통과), neutral #FFFFFF → #999999 → #666666, disabled 배경 #666666·글자 #999999. brand 기본 상태의 흰 글자는 4.18:1이라 큰 글자 기준(Bold 18.67px 이상)으로만 통과하므로 버튼 글자는 Body 2(20 Bold) 이상을 씀(TOKEN-05 대비표). Figma 버튼의 Body 3(18 Bold)은 0.5px 부족 | States 표(Figma 5875:9829·9831·9833, 5152:9047·9049, 5164:8774, 5188:8718) |
| COMPONENT-01-04 | focus-visible: `stroke.focus` 2px outline, offset 2px(Figma에 버튼 Focus 없음, TOKEN-05-03 근거). offset 없이 버튼 안쪽에 그리면 보라 위 2.26:1로 미달. 흰 표면(모달) 위 버튼은 `stroke.focus-inverse` | States 표 |
| COMPONENT-01-05 | FE 합의 이름(`large-round`, `medium-primary`, `medium-white`, `small-round`, `mini` 등)과 명세 variant·size 대응표 | 코드 대응 절 |

## COMPONENT-02 text-field

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-02-01 | 하단 보더형 입력. 폭 800·390·252(데스크톱), 342·252·164·108(모바일) | Sizes 표 |
| COMPONENT-02-02 | 상태: 입력 없음, 입력 중·완료, focus(보더·라벨 #7A64F9, 라벨 18 Regular → Text 1 14 Light), 필수 항목 누락, 입력 에러, 글자 수 초과(문단형) | States 표(Figma 5239:3993, 지원 폼 섹션 1981:4329) |
| COMPONENT-02-03 | 변형: 한 줄, 문단(Body 4 - Paragraph), 드롭다운 결합형 | Variants 표 |
| COMPONENT-02-04 | 에러 메시지와 입력을 `aria-describedby`로 연결, `aria-invalid` | Accessibility 절 |

## COMPONENT-03 select(dropdown)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-03-01 | 트리거 2종(필드형, 칩형 "전체 부문·기수"), 열림·닫힘 | Variants 표 |
| COMPONENT-03-02 | 옵션 상태: default, hover, selected, hover-selected(= selected + hover) | States 표(아카이빙 Dropdown 3496:6379~6393) |
| COMPONENT-03-03 | 키보드: 방향키 이동, Enter 선택, Esc 닫기 | Accessibility 절 |

## COMPONENT-04 checkbox

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-04-01 | 상태: unchecked, checked(보라). Figma에 hover·disabled·indeterminate 없음 → 명세에서 새로 정의하고 "Figma 없음" 표시 | States 표 |
| COMPONENT-04-02 | 약관 동의형(체크박스 + 전문 보기·닫기 버튼) 조합 | Variants 표 |

## COMPONENT-05 radio

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-05-01 | 원형 16px + 라벨, 상태 default·hover·selected | States 표(지원폼 Radio 2007:3436·3437, 2391:5869·5870) |
| COMPONENT-05-02 | 숨긴 input에 포커스 표시가 없는 문제를 focus-visible로 해결 | Accessibility 절 |

## COMPONENT-06 tab

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-06-01 | variant: text(커리큘럼 메뉴), box(분석·시각화, hover 흰 배경), underline(프로젝트, 모바일에서 확인), category(FAQ 세로 목록) | Variants 표(탭 인터렉션 5915:7015, FAQ Category 2416:3726·3727, 2417:3731) |
| COMPONENT-06-02 | 상태 default·hover·selected(·hover-selected) | States 표 |
| COMPONENT-06-03 | `role="tablist"`·`tab`, 방향키 이동 | Accessibility 절 |

## COMPONENT-07 modal

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-07-01 | 구조: 441×235, radius 40, 흰 표면(`bg.surface-inverse`)·2px #CCCCCC 보더, 아이콘 48(! · ✓ · 스피너) + 제목(Body 2 20 Bold, 검정) + 설명(18 Regular, #666666) + 버튼 130×44 pill(닫기 #E6E6E6·검정 글자, 신청 검정·흰 글자) | Anatomy 절(모달 창 4412:7387) |
| COMPONENT-07-02 | 종류 7개: 안내 2(지원 기간 아님·모집 마감), 입력 오류 2(이메일 재입력·이메일 중복), 성공, 로딩, 실패 | Variants 표 |
| COMPONENT-07-03 | 버튼 규칙: 안내형 2개(닫기·신청), 나머지 1개(닫기). 로딩 모달도 닫기 버튼 있음(Figma 5164:5587) | Variants 표 |
| COMPONENT-07-04 | `role="alertdialog"`, 포커스 가두기·반환, Esc 닫기. 모달 안 버튼의 포커스 링은 `stroke.focus-inverse`(흰 표면 위 4.18:1) | Accessibility 절 |

## COMPONENT-08 card

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 2 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-08-01 | 공통 anatomy: `bg.layer` #1A1A1A, `stroke.weak` #333333 1px, radius 20, 썸네일 radius 20 | Anatomy 절(Radius 시트 Project Block 1728:3724) |
| COMPONENT-08-02 | 종류 6개(대상·분야·FAQ·활동사진·프로젝트·블로그)와 각 hover 동작 | Variants 표(카드 인터렉션 5875:9878) |
| COMPONENT-08-03 | 카드 전체가 링크일 때 포커스·키보드 동작 | Accessibility 절 |

---

## COMPONENT-09 filter-chip (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-06 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-09-01 | 부문·기수 필터 칩, 상태 default·hover·press·selected·hover-selected | `components/filter-chip.md`(아카이빙 부문·기수 필터 3723:9261~9270) |

## COMPONENT-10 tag-chip (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-09 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-10-01 | 선택한 값을 ✕로 지우는 칩, ✕ hover·press 빨강 | `components/tag-chip.md` |
| COMPONENT-10-02 | ✕ 버튼 `aria-label="{값} 선택 해제"` | Accessibility 절 |

## COMPONENT-11 search-autocomplete (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-02 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-11-01 | 검색 입력 + 결과 목록(일치 글자 강조), 빈 결과·로딩 상태 새로 정의 | `components/search-autocomplete.md`(검색 Dropdown 3613:7592) |
| COMPONENT-11-02 | `role="combobox"`, `aria-activedescendant` | Accessibility 절 |

## COMPONENT-12 pagination (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-12-01 | 도트형(화살표 + 점 5개), 화살표 default·hover·press, 점 default·selected | `components/pagination.md` |

## COMPONENT-13 tag (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-13-01 | 읽기 전용 라벨(부문·기수 태그): 1px #999999 보더, radius 20, Text 1 #E6E6E6, 패딩 12·3 | `components/tag.md`(3723:9271·9272) |
| COMPONENT-13-02 | 검색 Tag 버튼(mini·small)과 구분 | Do / Don't 절 |

## COMPONENT-14 progress-bar (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-14-01 | 지원 폼 단계 표시 800×10, `role="progressbar"`·`aria-valuenow` | `components/progress-bar.md`(2009:3442) |

## COMPONENT-15 selection-card (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-05 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-15-01 | 부문 선택 버튼 253×80, radius 8, 1px #666666, selected 보라 배경. 라디오 그룹 의미 | `components/selection-card.md`(4266:7628·7629) |
| COMPONENT-15-02 | radius 8은 radius 토큰에 없어 명세에 수치로 기재 | `components/selection-card.md` |

## COMPONENT-16 form-add-button (P1)

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-02 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| COMPONENT-16-01 | "+ 항목 추가"·"− 삭제" 행, 상태 default·hover·active_focus, 삭제 hover 빨강 | `components/form-add-button.md`(2009:4216, 5775:9707) |
