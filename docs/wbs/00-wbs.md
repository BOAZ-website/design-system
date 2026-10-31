# BOAZ 디자인 시스템 WBS

| 기준일 | 근거 | 성격 |
| --- | --- | --- |
| 2026-10-11, 2026-10-22 인수인계 준비, 2026-10-30 컴포넌트 구현 추가로 현행화 | Figma 원본(TF팀 디자인 파일, Components·FE 회의용 페이지) MCP 조회, `frontend`·`frontend_admin` 코드 조사(관리자 콘솔 화면별 값 조사 2026-10-11), daangn/seed-design 참고 | 실행 계획. 일정은 다른 우선순위보다 낮아 적지 않음(관리자 콘솔 2026-12 오픈만 제약). 담당자는 노션에서 배정 |

> BOAZ 공개 홈페이지(`frontend`)와 관리자 콘솔(`frontend_admin`)이 함께 쓰는 디자인 토큰, 컴포넌트·패턴 명세, React 컴포넌트를 이 저장소 하나에 모으는 작업 전체를 작업 정의서(Epic) 5개, 티켓 60개로 나눈 문서.
> 목표는 **기준(토큰·명세)과 두 앱이 함께 쓰는 컴포넌트를 만드는 것**이며 앱 코드 수정은 ADOPT 작업 정의서에서 각 앱 저장소 이슈로 따로 진행함
> 명세(COMPONENT·PATTERN)는 구현(COMPONENT-17~33)의 입력으로 먼저 작성함. 컴포넌트 코드 구현은 2026-10-30 결정으로 범위에 들어옴
> 작업 정의서는 할 일과 완료 조건을 정함. 결과물의 정의는 `components/`·`patterns/`의 명세서에 있음

---

## 읽는 법

### 규모

| 규모 | 뜻 |
| --- | --- |
| 몇 시간 | 반나절 안에 끝나는 작업 |
| 하루이틀 | 1~2일 안에 끝나는 작업 |
| 한 주 | 1주 정도 걸리는 작업 |
| 두 주 | 2주 정도 걸리는 작업. 앱 저장소에서 컴포넌트 단위 이슈로 나눠 진행함 |

### 번호 규칙

| 구분 | 형식 | 위치 | 예시 |
| --- | --- | --- | --- |
| 작업 정의서(Epic) | 작업 정의서 범위를 나타내는 영문 대문자 단어 | 문서 1개 | `TOKEN` 파운데이션 토큰 작업 정의서 |
| 티켓 키 | `접두사-두 자리` | 작업 정의서의 절 | `TOKEN-01` |
| 기능 ID | `티켓 키-두 자리` | 절 안의 표 행 | `TOKEN-01-01` |

- 티켓 1개 = GitHub 이슈 1개 = 노션 엔지니어링 작업 1개. PR 1개 정도로 닫을 수 있는 단위
- 기능 ID마다 "완료 확인 방법"이 있음. 명령 결과나 파일로 확인할 수 있어야 완료로 봄
- Milestone과 이슈는 Phase를 시작할 때 디자인 시스템 리드(현재 인프라 담당)가 승인 후 그 Phase 것만 만듦. 구현 담당은 만들지 않음
- 선행 티켓이 COMPONENT·PATTERN이면 해당 명세가 `status: review` 이상일 때 선행이 풀린 것으로 봄
- 선행 티켓이 구현 티켓(COMPONENT-17~33)이면 해당 컴포넌트가 `dev`에 머지되고 그 컴포넌트가 들어간 버전 태그가 있을 때 앱에서 쓸 수 있음

### 문서 역할

| 문서 | 역할 |
| --- | --- |
| 노션 WBS·작업 정의서 | 기준 문서. 티켓 완료 조건과 GitHub 이슈 연결 |
| `docs/wbs/*.md`(이 폴더) | 노션 원본 마크다운 사본. 노션과 다르면 노션 기준으로 맞춤. 티켓 상태·완료 기록은 노션에서 먼저 고치고 같은 내용을 사본에 옮겨 같은 PR에 넣음. 노션 반영은 디자인 시스템 리드가 함 |
| `AGENTS.md` | 토큰 작업 절차·명세 작업 절차·컴포넌트 구현 절차·이름 규칙·breaking 규칙 |
| `CONTRIBUTING.md` | 처음 합류했을 때 읽는 순서, 권한 체크리스트, 브랜치·리뷰·머지 규칙 |
| `components/_template.md` | 컴포넌트 명세 양식 |
| `docs/wbs/30-component.md` "구현 규칙" | 컴포넌트 코드의 파일 구성·스타일·접근성 규칙 |

### 작업 정의서(Epic) 목록

| 접두사 | 작업 정의서 | 범위 | Phase | 티켓 | 남은 규모 | 페이지 |
| --- | --- | --- | --- | --- | --- | --- |
| REPO | 저장소·규칙 | 저장소 생성, 협업 규칙, CI, 릴리스 | 0, 1, 2, 3 | 10 | 약 1일(릴리스 2개) | 10-repo.md |
| TOKEN | 파운데이션 | 색(팔레트·시맨틱), 타이포, radius, spacing, 빌드 | 1 | 6 | 완료 | 20-token.md |
| COMPONENT | 컴포넌트 명세·구현 | P0 8종·P1 8종 명세, 패키지 빌드 구성, Storybook, P0 8종·P1 7종 React 컴포넌트 | 2, 3 | 33 | 약 17~25일(명세 16개 완료, #50) | 30-component.md |
| PATTERN | 패턴·가이드라인 | 피드백, 폼, 접근성, 보이스 앤 톤 | 3 | 4 | 완료(#71) | 40-pattern.md |
| ADOPT | 앱 적용 | frontend·frontend_admin 토큰 연결, 불일치 정리, 관리자 콘솔 값·공용 컴포넌트 통일 | 4 | 7 | 약 23.5~26.5일(ADOPT-03이 명세 작성으로 두 주로 늘어남) | 50-adopt.md |

- 티켓 60개 중 Phase 0·1의 14개, COMPONENT 명세 16개, PATTERN 4개는 완료. 남은 26개 규모 합계 약 42~53일(1인 기준, 2026-10-30 재산정). COMPONENT 구현 17~25일, REPO 1일, ADOPT 23.5~26.5일
- ADOPT-03·07은 패키지 컴포넌트로 교체하는 방식으로 바뀌어 규모가 줄 수 있음. COMPONENT-26(card) 머지 후 다시 셈
- 남은 규모 환산: 몇 시간 = 0.5일, 하루이틀 = 1~2일, 한 주 = 5일, 두 주 = 10일. 작업량이며 일정이 아님
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
| breaking | 토큰 이름을 지우거나 바꿔 앱이 깨지는 변경. 컴포넌트는 export 이름·prop 이름을 지우거나 바꾸는 변경 |
| story | Storybook에서 컴포넌트 하나를 특정 상태로 보여 주는 화면 단위 |

---

## Phase

| Phase | 목표 | 완료 기준 | 티켓 |
| --- | --- | --- | --- |
| Phase 0 저장소·규칙 | 공개 저장소와 협업 규칙 | CI `Tokens Build` 통과, 이슈 #1·#4·#17~#21 종료 | REPO-00~05, REPO-08 (완료) |
| Phase 1 파운데이션 | 토큰 v0.1 | 팔레트·시맨틱·타이포·radius·spacing 토큰과 dist 4종, `v0.1.0` 태그 | TOKEN-01~06, REPO-06 |
| Phase 2 핵심 컴포넌트 | P0 명세 8종과 구현, v0.2 | `components/*.md` 8개 `status: review` 이상(완료, #50). 패키지 빌드·Storybook, P0 8종 컴포넌트 `dev` 머지, `v0.2.0` 태그 | COMPONENT-01~08(완료), COMPONENT-17~26, REPO-07 |
| Phase 3 패턴·확장 | 패턴 4종, P1 명세 8종과 구현 7종 | `patterns/*.md` 4개, P1 8개 `review`(완료, #50·#71). P1 7종 컴포넌트 `dev` 머지, `v0.2.x` patch 태그 | PATTERN-01~04, COMPONENT-09~16(완료), COMPONENT-27~33, REPO-09 |
| Phase 4 앱 적용 | 두 앱이 토큰·컴포넌트 사용, 관리자 콘솔 화면 통일 | 각 앱 저장소 PR 머지 | ADOPT-01~07 |

- Phase 2·3의 명세(COMPONENT·PATTERN)는 디자인 시스템 리드가 2026-10-22에 먼저 작성함. 남은 Phase 2·3 작업은 이 명세를 입력으로 한 컴포넌트 구현(COMPONENT-17~33)이고 새로 합류한 프론트엔드 담당(구현 담당)이 맡음(2026-10-30 결정)
- Phase 4 중 토큰·값 작업(ADOPT-01·02·05·06)은 Phase 1(v0.1)만 끝나면 시작할 수 있음. 컴포넌트 교체 작업(ADOPT-03-09~21·04·07)은 해당 구현 티켓이 들어간 버전 태그를 기다림
- 관리자 콘솔 티켓은 ADOPT-02 → 05 → 06 → 07 순서로 컴포넌트 명세(Phase 2)를 기다리지 않고 바로 시작함. 관리자 콘솔이 개발 중이라 화면이 늘기 전에 기준을 맞추기 위함(2026-10-11 결정)
- `v0.1.0` 발행 후 ADOPT-05는 토큰 설치(ADOPT-02)를 선행으로 두게 됨(2026-10-21 정정)
- 관리자 콘솔은 2026년 12월 오픈이 목표이고 오픈일은 미정. 그래서 ADOPT-02·05는 오픈 전에 끝냄. ADOPT-06·07은 오픈 전 완료를 목표로 하되 오픈 뒤로 넘길 수 있음
- Phase 4(ADOPT-01~07)는 FE 팀이 맡음(2026-10-23 결정). frontend(ADOPT-01·03·04)와 frontend_admin(ADOPT-02·05~07) 모두 해당 앱 저장소에서 진행함
- COMPONENT-19(button)을 먼저 끝내 구현 양식을 확정하고 나머지는 그 양식으로 씀(`docs/wbs/30-component.md` 구현 규칙)

### 인수인계(Phase 2 구현부터)

Phase 0·1(토큰)과 Phase 2·3의 명세(컴포넌트 16종·패턴 4종)는 디자인 시스템 리드(현재 인프라 담당)가 끝냄. 명세는 모두 `status: review`이고 미확인 절에 남은 질문 없음(검색 결과 패널 보류 한 줄만 있음, 2026-10-23). Phase 2·3의 컴포넌트 구현(COMPONENT-17~33)은 구현 담당, Phase 4 앱 적용은 FE 팀이 맡음(2026-10-30 결정)

- 준비돼 있는 것: 토큰 `v0.1.1`, 명세 `components/`·`patterns/`, 명세·구현 할 일 `docs/wbs/30-component.md`, 앱별 할 일 `docs/wbs/50-adopt.md`, 작업 절차(`AGENTS.md`), 협업 규칙(`CONTRIBUTING.md`)
- 리드가 시작 전에 처리하는 것: Phase 2 Milestone과 구현 티켓 이슈 생성·담당자 배정, Figma 열람·노션 편집 권한
- 구현 담당이 하는 것: 구현 티켓별 브랜치·PR. 명세와 다른 점을 발견하면 명세 수정 이슈를 먼저 냄
- FE 팀이 하는 것: 앱 저장소에서 ADOPT 티켓별 이슈·PR
- 리드가 하는 것: 명세 질문 응답, 명세 수정, 릴리스 태그, 앱 적용 후 해당 명세 `status: stable` 전환, `docs/wbs` 변경의 노션 반영

| 구분 | 할 일 | 담당 |
| --- | --- | --- |
| 시작 전 | Phase 2 Milestone과 COMPONENT-17~26·REPO-07 이슈 생성, 담당자 배정, 권한 부여 | 디자인 시스템 리드 |
| 진행 | COMPONENT-17 → COMPONENT-18 → COMPONENT-19(양식 확정) → COMPONENT-20~26 | 구현 담당 |
| 진행 | 관리자 콘솔 토큰·값(ADOPT-02 → 05 → 06)은 2026-12 오픈 전 ADOPT-02·05 완료 | FE 팀 |
| 진행 | frontend 토큰 연결(ADOPT-01) | FE 팀 |
| 컴포넌트 릴리스 후 | 컴포넌트 교체(ADOPT-03·04·07), ADOPT-03·07 규모 재산정 | FE 팀 |
| 완료 후 | 적용된 명세 `status: stable` 전환 | 디자인 시스템 리드 |

---

## 진행 현황 (2026-10-30 기준)

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
| Phase 2·3 명세 | 컴포넌트 16종·패턴 4종 명세 `review`, `radius.xs` 토큰 추가, 라이브·Figma 기준 정정, `v0.1.1` 릴리스 | #50·#71·#73·#75·#76 | 완료 |
| 컴포넌트 구현 범위 추가 | 명세를 토대로 React 컴포넌트를 이 저장소에서 구현하기로 결정. 구현 티켓(COMPONENT-17~33) 추가, Phase 2·3 재구성, ADOPT-03·04·07을 컴포넌트 교체로 정정 | #79 | 완료 |

---

## 전체 티켓

| 티켓 | 제목 | 작업 정의서 | Phase | 규모 | 선행 | 상태 |
| --- | --- | --- | --- | --- | --- | --- |
| REPO-00 | 저장소 생성·브랜치 구성 | 저장소·규칙 | 0 | 몇 시간 | 없음 | 완료 |
| REPO-01 | 커밋 훅·템플릿 이식 | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-02 | 라벨·자동 라벨·자동 배정 | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-03 | 저장소 서버 설정 | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료(브랜치 ruleset은 PR #3에서 삭제, 태그 ruleset은 #44에서 추가) |
| REPO-04 | CI `Tokens Build` | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-05 | CodeRabbit·AGENTS.md·README | 저장소·규칙 | 0 | 몇 시간 | REPO-00 | 완료 |
| REPO-08 | WBS·작업 정의서 작성 | 저장소·규칙 | 0 | 하루이틀 | REPO-00 | 완료 |
| TOKEN-01 | 팔레트 토큰 확정 | 파운데이션 | 1 | 몇 시간 | REPO-04 | 완료(#29) |
| TOKEN-02 | 타이포 토큰 | 파운데이션 | 1 | 하루이틀 | REPO-04 | 완료(#30) |
| TOKEN-03 | radius 토큰 | 파운데이션 | 1 | 몇 시간 | REPO-04 | 완료(#31) |
| TOKEN-04 | spacing 토큰 | 파운데이션 | 1 | 몇 시간 | REPO-04 | 완료(#32) |
| TOKEN-05 | 시맨틱 색 토큰 | 파운데이션 | 1 | 하루이틀 | TOKEN-01 | 완료(#33) |
| TOKEN-06 | 빌드 보강(타이포·spacing 출력) | 파운데이션 | 1 | 하루이틀 | TOKEN-02, TOKEN-04 | 완료(#34) |
| REPO-06 | `v0.1.0` 릴리스 | 저장소·규칙 | 1 | 몇 시간 | TOKEN-01~06 | 완료(#16, 2026-10-11 `v0.1.0` 태그·Release) |
| COMPONENT-01 | button | 컴포넌트 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| COMPONENT-02 | text-field | 컴포넌트 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| COMPONENT-03 | select(dropdown) | 컴포넌트 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-04 | checkbox | 컴포넌트 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-05 | radio | 컴포넌트 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-06 | tab | 컴포넌트 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| COMPONENT-07 | modal | 컴포넌트 | 2 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-08 | card | 컴포넌트 | 2 | 하루이틀 | REPO-06 | 완료(#50) |
| PATTERN-01 | feedback | 패턴·가이드라인 | 3 | 몇 시간 | COMPONENT-07 | 완료(#71) |
| PATTERN-02 | form | 패턴·가이드라인 | 3 | 하루이틀 | COMPONENT-02 | 완료(#71) |
| PATTERN-03 | accessibility | 패턴·가이드라인 | 3 | 하루이틀 | TOKEN-05 | 완료(#71) |
| PATTERN-04 | voice & tone | 패턴·가이드라인 | 3 | 몇 시간 | 없음 | 완료(#71) |
| COMPONENT-09 | filter-chip | 컴포넌트 | 3 | 몇 시간 | COMPONENT-06 | 완료(#50) |
| COMPONENT-10 | tag-chip | 컴포넌트 | 3 | 몇 시간 | COMPONENT-09 | 완료(#50) |
| COMPONENT-11 | search-autocomplete | 컴포넌트 | 3 | 몇 시간 | COMPONENT-02 | 완료(#50) |
| COMPONENT-12 | pagination | 컴포넌트 | 3 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-13 | tag | 컴포넌트 | 3 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-14 | progress-bar | 컴포넌트 | 3 | 몇 시간 | REPO-06 | 완료(#50) |
| COMPONENT-15 | selection-card(사용처 없음, 2026-10-23 결정) | 컴포넌트 | 3 | 몇 시간 | COMPONENT-05 | 완료(#50) |
| COMPONENT-16 | form-add-button | 컴포넌트 | 3 | 몇 시간 | COMPONENT-02 | 완료(#50) |
| COMPONENT-17 | 패키지 빌드 구성 | 컴포넌트 | 2 | 하루이틀 | REPO-06 | 대기(#83) |
| COMPONENT-18 | Storybook | 컴포넌트 | 2 | 하루이틀 | COMPONENT-17 | 대기(#84) |
| COMPONENT-19 | Button | 컴포넌트 | 2 | 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-01 | 대기(#85) |
| COMPONENT-20 | TextField | 컴포넌트 | 2 | 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-02 | 대기(#86) |
| COMPONENT-21 | Select | 컴포넌트 | 2 | 한 주 | COMPONENT-17, COMPONENT-18, COMPONENT-03 | 대기(#87) |
| COMPONENT-22 | Checkbox | 컴포넌트 | 2 | 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-04 | 대기(#88) |
| COMPONENT-23 | Radio | 컴포넌트 | 2 | 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-05 | 대기(#89) |
| COMPONENT-24 | Tab | 컴포넌트 | 2 | 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-06 | 대기(#90) |
| COMPONENT-25 | Modal | 컴포넌트 | 2 | 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-19, COMPONENT-07 | 대기(#91) |
| COMPONENT-26 | Card | 컴포넌트 | 2 | 하루이틀 | COMPONENT-17, COMPONENT-18, COMPONENT-08 | 대기(#92) |
| REPO-07 | `v0.2.0` 릴리스 | 저장소·규칙 | 2 | 몇 시간 | COMPONENT-17~26 | 대기(#93) |
| COMPONENT-27 | FilterChip | 컴포넌트 | 3 | 몇 시간 | COMPONENT-19, COMPONENT-09 | 대기 |
| COMPONENT-28 | TagChip | 컴포넌트 | 3 | 몇 시간 | COMPONENT-27, COMPONENT-10 | 대기 |
| COMPONENT-29 | SearchAutocomplete | 컴포넌트 | 3 | 몇 시간 | COMPONENT-20, COMPONENT-11 | 대기 |
| COMPONENT-30 | Pagination | 컴포넌트 | 3 | 하루이틀 | COMPONENT-19, COMPONENT-12 | 대기 |
| COMPONENT-31 | Tag | 컴포넌트 | 3 | 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-13 | 대기 |
| COMPONENT-32 | ProgressBar | 컴포넌트 | 3 | 몇 시간 | COMPONENT-17, COMPONENT-18, COMPONENT-14 | 대기 |
| COMPONENT-33 | FormAddButton | 컴포넌트 | 3 | 몇 시간 | COMPONENT-19, COMPONENT-20, COMPONENT-16 | 대기 |
| REPO-09 | Phase 3 릴리스(`v0.2.x`) | 저장소·규칙 | 3 | 몇 시간 | COMPONENT-27~33 | 대기 |
| ADOPT-01 | frontend 토큰 연결 | 앱 적용 | 4 | 하루이틀 | REPO-06 | 대기 |
| ADOPT-02 | frontend_admin 토큰 연결 | 앱 적용 | 4 | 몇 시간 | REPO-06 | 대기 |
| ADOPT-03 | frontend 값 불일치 정리·컴포넌트 교체 | 앱 적용 | 4 | 두 주 | ADOPT-01, COMPONENT-19~33(03-09~21) | 대기 |
| ADOPT-04 | frontend `alert()` → 모달 교체 | 앱 적용 | 4 | 하루이틀 | COMPONENT-25, PATTERN-01 | 대기 |
| ADOPT-05 | frontend_admin 값 기준 확정 | 앱 적용 | 4 | 하루이틀 | ADOPT-02 | 대기 |
| ADOPT-06 | frontend_admin 화면 값 통일 | 앱 적용 | 4 | 한 주 | ADOPT-05 | 대기 |
| ADOPT-07 | frontend_admin 공용 컴포넌트 | 앱 적용 | 4 | 한 주 | ADOPT-06, COMPONENT-19~26·30 | 대기 |

---

## 원천 자료

- Figma: 사용자 소유가 아닌 TF팀 디자인 파일. 링크는 노션에만 적음(공개 저장소에 적지 않음)
  - Components 페이지: 컴포넌트·인터렉션 시트, 색·텍스트 스타일 사용처
  - FE 회의용 페이지: 코드 variant 이름 라벨(`large-round`, `medium-primary` 등), 11단계 색 스케일 초안(스타일 미등록), 간격 메모(gap 20·22·25·34·36)
  - Page: 무드보드·IA·화면 시안. `Typo` 프레임은 Esamanru 폰트 템플릿 초안으로 폐기본
- 코드: `frontend/src/shared/styles/*.css.ts`, `frontend_admin/src/app/styles/theme.css`
- 레퍼런스: [daangn/seed-design](https://github.com/daangn/seed-design)
