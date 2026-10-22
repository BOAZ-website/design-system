# BOAZ 디자인 시스템 WBS

| 기준일 | 근거 | 성격 |
| --- | --- | --- |
| 2026-10-11, 2026-10-22 인수인계 준비로 현행화 | Figma 원본(TF팀 디자인 파일, Components·FE 회의용 페이지) MCP 조회, `frontend`·`frontend_admin` 코드 조사(관리자 콘솔 화면별 값 조사 2026-10-11), daangn/seed-design 참고 | 실행 계획. 일정은 다른 우선순위보다 낮아 적지 않음(관리자 콘솔 2026-12 오픈만 제약). 담당자는 노션에서 배정 |

> BOAZ 공개 홈페이지(`frontend`)와 관리자 콘솔(`frontend_admin`)이 함께 쓰는 디자인 토큰과 컴포넌트·패턴 명세를 이 저장소 하나에 모으는 작업 전체를 명세서(Epic) 5개, 티켓 42개로 나눈 문서.
> 목표는 **기준을 만드는 것**이며 앱 코드 수정은 ADOPT 명세서에서 각 앱 저장소 이슈로 따로 진행함

---

## 읽는 법

### 규모

| 규모 | 뜻 |
| --- | --- |
| 몇 시간 | 반나절 안에 끝나는 작업 |
| 하루이틀 | 1~2일 안에 끝나는 작업 |
| 한 주 | 1주 정도 걸리는 작업 |

### 번호 규칙

| 구분 | 형식 | 위치 | 예시 |
| --- | --- | --- | --- |
| 명세서(Epic) | 명세서 범위를 나타내는 영문 대문자 단어 | 문서 1개 | `TOKEN` 파운데이션 토큰 명세서 |
| 티켓 키 | `접두사-두 자리` | 명세서의 절 | `TOKEN-01` |
| 기능 ID | `티켓 키-두 자리` | 절 안의 표 행 | `TOKEN-01-01` |

- 티켓 1개 = GitHub 이슈 1개 = 노션 엔지니어링 작업 1개. PR 1개 정도로 닫을 수 있는 단위
- 기능 ID마다 "완료 확인 방법"이 있음. 명령 결과나 파일로 확인할 수 있어야 완료로 봄
- Milestone과 이슈는 Phase를 시작할 때 디자인 시스템 리드(현재 인프라 담당)가 승인 후 그 Phase 것만 만듦. 명세 담당은 만들지 않음
- 선행 티켓이 COMPONENT·PATTERN이면 해당 명세가 `status: review` 이상일 때 선행이 풀린 것으로 봄

### 문서 역할

| 문서 | 역할 |
| --- | --- |
| 노션 WBS·명세서 | 기준 문서. 티켓 완료 조건과 GitHub 이슈 연결 |
| `docs/wbs/*.md`(이 폴더) | 노션 원본 마크다운 사본. 노션과 다르면 노션 기준으로 맞춤. 티켓 상태·완료 기록은 노션에서 먼저 고치고 같은 내용을 사본에 옮겨 같은 PR에 넣음. 노션 반영은 디자인 시스템 리드가 함 |
| `AGENTS.md` | 토큰 작업 절차·명세 작업 절차·이름 규칙·breaking 규칙 |
| `CONTRIBUTING.md` | 처음 합류했을 때 읽는 순서, 권한 체크리스트, 브랜치·리뷰·머지 규칙 |
| `components/_template.md` | 컴포넌트 명세 양식 |

### 명세서(Epic) 목록

| 접두사 | 명세서 | 범위 | Phase | 티켓 | 남은 규모 | 페이지 |
| --- | --- | --- | --- | --- | --- | --- |
| REPO | 저장소·규칙 | 저장소 생성, 협업 규칙, CI, 릴리스 | 0, 1, 3 | 9 | 약 0.5일(릴리스 1개) | 10-repo.md |
| TOKEN | 파운데이션 | 색(팔레트·시맨틱), 타이포, radius, spacing, 빌드 | 1 | 6 | 완료 | 20-token.md |
| COMPONENT | 컴포넌트 명세 | P0 8종, P1 8종 | 2, 3 | 16 | 약 10~14일(P0 6~10, P1 4) | 30-component.md |
| PATTERN | 패턴·가이드라인 | 피드백, 폼, 접근성, 보이스 앤 톤 | 3 | 4 | 약 3~5일 | 40-pattern.md |
| ADOPT | 앱 적용 | frontend·frontend_admin 토큰 연결, 불일치 정리, 관리자 콘솔 값·공용 컴포넌트 통일 | 4 | 7 | 약 14.5~18.5일 | 50-adopt.md |

- 티켓 42개 중 Phase 0·1의 14개는 완료. 남은 28개 규모 합계 약 28~38일(1인 기준)
- 남은 규모 환산: 몇 시간 = 0.5일, 하루이틀 = 1~2일, 한 주 = 5일. 작업량이며 일정이 아님
- 이 저장소를 처음 보는 담당자는 첫 티켓에 읽기·권한 준비 1~2일을 더함
- ADOPT-06·07의 "한 주"는 앱 저장소에서 화면·컴포넌트 단위 이슈로 나눈 뒤 다시 셈

### 용어

| 용어 | 뜻 |
| --- | --- |
| 토큰 | 색·글자 크기·간격 같은 디자인 값에 붙인 이름. 코드에서는 CSS 변수(`--boaz-*`)로 씀 |
| 팔레트 토큰 | 원래 색 값 그 자체(`color.palette.purple.100` = #7A64F9) |
| 시맨틱 토큰 | 용도로 붙인 이름(`color.bg.brand-solid`). 값은 팔레트를 참조함 |
| DTCG | 디자인 토큰 JSON 표준 형식(`$value`, `$type`) |
| dist | `npm run build`로 만든 생성물(`tokens.css`, `tokens.js`·`tokens.d.ts`, `tailwind-theme.css`). 앱은 이 파일을 가져감 |
| breaking | 토큰 이름을 지우거나 바꿔 앱이 깨지는 변경 |

---

## Phase

| Phase | 목표 | 완료 기준 | 티켓 |
| --- | --- | --- | --- |
| Phase 0 저장소·규칙 | 공개 저장소와 협업 규칙 | CI `Tokens Build` 통과, 이슈 #1·#4·#17~#21 종료 | REPO-00~05, REPO-08 (완료) |
| Phase 1 파운데이션 | 토큰 v0.1 | 팔레트·시맨틱·타이포·radius·spacing 토큰과 dist 4종, `v0.1.0` 태그 | TOKEN-01~06, REPO-06 |
| Phase 2 핵심 컴포넌트 | P0 명세 8종 | `components/*.md` 8개 `status: review` 이상. 토큰을 추가했으면 `v0.1.x` patch 릴리스 | COMPONENT-01~08 |
| Phase 3 패턴·확장 | 패턴 4종, P1 명세 8종, v0.2 | `patterns/*.md` 4개, P1 8개 `draft` 이상, `v0.2.0` 태그 | PATTERN-01~04, COMPONENT-09~16, REPO-07 |
| Phase 4 앱 적용 | 두 앱이 토큰 사용, 관리자 콘솔 화면 통일 | 각 앱 저장소 PR 머지 | ADOPT-01~07 |

- Phase 4는 Phase 1(v0.1)만 끝나면 시작할 수 있음. 관리자 콘솔 적용(ADOPT-02)은 컴포넌트 명세를 기다리지 않음
- 관리자 콘솔 티켓은 ADOPT-02 → 05 → 06 → 07 순서로 컴포넌트 명세(Phase 2)를 기다리지 않고 바로 시작함. 관리자 콘솔이 개발 중이라 화면이 늘기 전에 기준을 맞추기 위함(2026-10-11 결정)
- `v0.1.0` 발행 후 ADOPT-05는 토큰 설치(ADOPT-02)를 선행으로 두게 됨(2026-10-21 정정)
- 관리자 콘솔은 2026년 12월 오픈이 목표이고 오픈일은 미정. 그래서 ADOPT-02·05는 오픈 전에 끝냄. ADOPT-06·07은 오픈 전 완료를 목표로 하되 오픈 뒤로 넘길 수 있음
- Phase 2(COMPONENT-01~08)는 디자인 시스템 명세 담당, ADOPT-02·05~07은 관리자 콘솔 담당이 맡음. 한 사람이 둘 다 맡으면 ADOPT-02·05를 먼저 하고 Phase 2를 진행함
- COMPONENT-01~08은 서로 선행이 없음. COMPONENT-01(button)을 먼저 끝내 양식을 확정하고 나머지는 그 양식으로 씀

### 인수인계(Phase 2부터)

Phase 0·1은 디자인 시스템 리드(현재 인프라 담당)가 끝냈고, Phase 2부터는 새로 합류하는 프론트엔드 담당자(명세 담당 역할)가 맡음. 처음 읽는 순서와 권한은 `CONTRIBUTING.md` "처음 합류했다면"·"합류 체크리스트"에 있음

명세 담당으로 배정받으면 다음과 같음.

- 준비돼 있는 것: 명세 양식(`components/_template.md`), 작업 절차(`AGENTS.md`), 협업 규칙(`CONTRIBUTING.md`), 정정이 끝난 티켓(#48 완료)
- 리드가 배정 전에 처리하는 것: 저장소 쓰기·Figma 열람·노션 편집 권한, Phase 2 Milestone, COMPONENT-01~08의 GitHub 이슈
- 명세 담당이 하는 것: 이슈 번호를 받아 COMPONENT-01(button)을 작성하고 PR을 냄. 이 명세가 나머지 7개의 양식이 됨
- 리드가 배정 후에 하는 것: PR 리뷰, status 변경 승인, `docs/wbs` 변경의 노션 반영, 릴리스 태그

| 구분 | 할 일 | 담당 |
| --- | --- | --- |
| 배정 전 | Phase 1 Milestone 닫기, Phase 2 Milestone과 COMPONENT-01~08 이슈 생성, `30-component.md` "GitHub 이슈" 칸 채우기 | 디자인 시스템 리드 |
| 배정 전 | 관리자 콘솔 경로(ADOPT-02·05)를 병행하면 Phase 4 Milestone과 해당 앱 저장소 이슈 생성 | 디자인 시스템 리드 |
| 배정 전 | 저장소 쓰기·Figma 열람·노션 편집 권한 부여 | 디자인 시스템 리드 |
| 배정 후 | COMPONENT-01 작성. 첫 명세가 나머지 7개의 양식이 됨 | 명세 담당 |
| 배정 후 | 명세 PR 리뷰·status 변경 승인 | 리뷰어(`2nd-frontend` 팀원. 없으면 디자인 시스템 리드, CONTRIBUTING.md "리뷰와 머지") |
| 배정 후 | `docs/wbs` 변경의 노션 반영, 릴리스 태그 | 디자인 시스템 리드 |
| 배정 후 첫 주 | ADOPT-06·07 규모 재산정, `frontend_admin/CLAUDE.md` 린트·공용 컴포넌트 설명 정정(앱 저장소 이슈) | 디자인 시스템 리드 |

---

## 진행 현황 (2026-10-22 기준)

| 구분 | 내용 | 근거 | 상태 |
| --- | --- | --- | --- |
| 저장소 초기 구성 | 공개 저장소(Apache-2.0), 커밋 훅, 가드·라벨·배정 워크플로, CI, CodeRabbit, AGENTS.md, Style Dictionary 최소 빌드 | #1 | 완료 |
| 브랜치 규칙 삭제·리뷰어 수동 지정 | 브랜치 ruleset 삭제, CODEOWNERS 삭제 | #17·#19, PR #3 | 완료 |
| Figma 원본 조사 | 색 스타일 17종·텍스트 스타일 13종·버튼 상태값·radius 실측 | 이 문서 | 완료 |
| Phase 1 착수 전 토큰 명세 보강 | 크기 단위 px, `tokens.js`·`tokens.d.ts` 출력, 대비표, 팔레트 이름 규칙 | #25, PR #26 | 완료 |
| 관리자 콘솔 화면 조사 | 주 버튼 배경 5종, 모달 오버레이 14종, `bg-primary` 사용 0건, `text-slate-400` 244곳 대비 미달. Figma에 관리자 디자인이 없음을 확인하고 정식 색 사용·Figma 밖 값 7개 임시 결정 → ADOPT-05~07 추가 | #27 | 완료 |
| Phase 1 파운데이션 | 팔레트·시맨틱·타이포·radius·spacing 토큰, dist 4종, `v0.1.0` 태그·Release(2026-10-11) | #29~#34, #16 | 완료 |
| 릴리스 안전장치·빌드 보강 | 태그 push 때 `Release Check`, `v*` 태그 보호 규칙, 빌드 실패 시 `dist/` 유지, README·WBS 현행화 | #44 | 완료 |
| ADOPT 명세 정정 | 앱 코드 대조 후 ADOPT-01·02·05·06 정정 | #45 | 완료 |
| Phase 2 인수인계 준비 | 온보딩 규칙(CONTRIBUTING.md), 명세 작업 절차(AGENTS.md), `components/_template.md`, 티켓 정정 | #48 | 완료 |

---

## 전체 티켓

| 티켓 | 제목 | 명세서 | Phase | 규모 | 선행 | 상태 |
| --- | --- | --- | --- | --- | --- | --- |
| REPO-00 | 저장소 생성·브랜치 구성 | 저장소·규칙 | 0 | 몇 시간 | 없음 | 완료 |
| REPO-01 | 커밋 훅·템플릿 이식 | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-02 | 라벨·자동 라벨·자동 배정 | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-03 | 저장소 서버 설정 | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료(브랜치 ruleset은 PR #3에서 삭제, 태그 ruleset은 #44에서 추가) |
| REPO-04 | CI `Tokens Build` | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-05 | CodeRabbit·AGENTS.md·README | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-08 | WBS·명세서 작성 | 저장소·규칙 | 0 | 하루이틀 | REPO-00 | 완료 |
| TOKEN-01 | 팔레트 토큰 확정 | 파운데이션 | 1 | 몇 시간 | REPO-04 | 완료(#29) |
| TOKEN-02 | 타이포 토큰 | 파운데이션 | 1 | 하루이틀 | REPO-04 | 완료(#30) |
| TOKEN-03 | radius 토큰 | 파운데이션 | 1 | 몇 시간 | REPO-04 | 완료(#31) |
| TOKEN-04 | spacing 토큰 | 파운데이션 | 1 | 몇 시간 | REPO-04 | 완료(#32) |
| TOKEN-05 | 시맨틱 색 토큰 | 파운데이션 | 1 | 하루이틀 | TOKEN-01 | 완료(#33) |
| TOKEN-06 | 빌드 보강(타이포·spacing 출력) | 파운데이션 | 1 | 하루이틀 | TOKEN-02, TOKEN-04 | 완료(#34) |
| REPO-06 | `v0.1.0` 릴리스 | 저장소·규칙 | 1 | 몇 시간 | TOKEN-01~06 | 완료(#16, 2026-10-11 `v0.1.0` 태그·Release) |
| COMPONENT-01 | button | 컴포넌트 명세 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| COMPONENT-02 | text-field | 컴포넌트 명세 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| COMPONENT-03 | select(dropdown) | 컴포넌트 명세 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-04 | checkbox | 컴포넌트 명세 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-05 | radio | 컴포넌트 명세 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-06 | tab | 컴포넌트 명세 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| COMPONENT-07 | modal | 컴포넌트 명세 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-08 | card | 컴포넌트 명세 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| PATTERN-01 | feedback | 패턴·가이드라인 | 3 | 몇 시간 | COMPONENT-07 | 대기 |
| PATTERN-02 | form | 패턴·가이드라인 | 3 | 하루이틀 | COMPONENT-02 | 대기 |
| PATTERN-03 | accessibility | 패턴·가이드라인 | 3 | 하루이틀 | TOKEN-05 | 대기 |
| PATTERN-04 | voice & tone | 패턴·가이드라인 | 3 | 몇 시간 | 없음 | 대기 |
| COMPONENT-09 | filter-chip | 컴포넌트 명세 | 3 | 몇 시간 | COMPONENT-06 | 대기 |
| COMPONENT-10 | tag-chip | 컴포넌트 명세 | 3 | 몇 시간 | COMPONENT-09 | 대기 |
| COMPONENT-11 | search-autocomplete | 컴포넌트 명세 | 3 | 몇 시간 | COMPONENT-02 | 대기 |
| COMPONENT-12 | pagination | 컴포넌트 명세 | 3 | 몇 시간 | REPO-06 | 대기 |
| COMPONENT-13 | tag | 컴포넌트 명세 | 3 | 몇 시간 | REPO-06 | 대기 |
| COMPONENT-14 | progress-bar | 컴포넌트 명세 | 3 | 몇 시간 | REPO-06 | 대기 |
| COMPONENT-15 | selection-card | 컴포넌트 명세 | 3 | 몇 시간 | COMPONENT-05 | 대기 |
| COMPONENT-16 | form-add-button | 컴포넌트 명세 | 3 | 몇 시간 | COMPONENT-02 | 대기 |
| REPO-07 | `v0.2.0` 릴리스 | 저장소·규칙 | 3 | 몇 시간 | PATTERN-01~04, COMPONENT-09~16 | 대기 |
| ADOPT-01 | frontend 토큰 연결 | 앱 적용 | 4 | 하루이틀 | REPO-06 | 대기 |
| ADOPT-02 | frontend_admin 토큰 연결 | 앱 적용 | 4 | 몇 시간 | REPO-06 | 대기 |
| ADOPT-03 | frontend 값 불일치 정리 | 앱 적용 | 4 | 한 주 | ADOPT-01, COMPONENT-01~08 | 대기 |
| ADOPT-04 | frontend `alert()` → 모달 교체 | 앱 적용 | 4 | 하루이틀 | COMPONENT-07, PATTERN-01 | 대기 |
| ADOPT-05 | frontend_admin 값 기준 확정 | 앱 적용 | 4 | 하루이틀 | ADOPT-02 | 대기 |
| ADOPT-06 | frontend_admin 화면 값 통일 | 앱 적용 | 4 | 한 주 | ADOPT-05 | 대기 |
| ADOPT-07 | frontend_admin 공용 컴포넌트 | 앱 적용 | 4 | 한 주 | ADOPT-06 | 대기 |

---

## 원천 자료

- Figma: 사용자 소유가 아닌 TF팀 디자인 파일. 링크는 노션에만 적음(공개 저장소에 적지 않음)
  - Components 페이지: 컴포넌트·인터렉션 시트, 색·텍스트 스타일 사용처
  - FE 회의용 페이지: 코드 variant 이름 라벨(`large-round`, `medium-primary` 등), 11단계 색 스케일 초안(스타일 미등록), 간격 메모(gap 20·22·25·34·36)
  - Page: 무드보드·IA·화면 시안. `Typo` 프레임은 Esamanru 폰트 템플릿 초안으로 폐기본
- 코드: `frontend/src/shared/styles/*.css.ts`, `frontend_admin/src/app/styles/theme.css`
- 레퍼런스: [daangn/seed-design](https://github.com/daangn/seed-design)
