# BOAZ 디자인 시스템 WBS

| 기준일 | 근거 | 성격 |
| --- | --- | --- |
| 2026-09-28 | Figma 원본(TF팀 디자인 파일, Components·FE 회의용 페이지) MCP 조회, `frontend`·`frontend_admin` 코드 조사, daangn/seed-design 참고 | 실행 계획. 일정은 다른 우선순위보다 낮아 적지 않음. 담당자는 노션에서 배정 |

> BOAZ 공개 홈페이지(`frontend`)와 관리자 콘솔(`frontend_admin`)이 함께 쓰는 디자인 토큰과 컴포넌트·패턴 명세를 이 저장소 하나에 모으는 작업 전체를 명세서(Epic) 5개, 티켓 38개로 나눈 문서.
> 목표는 **기준을 만드는 것**이며 앱 코드 수정은 ADP 명세서에서 각 앱 저장소 이슈로 따로 진행함

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
| 명세서(Epic) | 영문 대문자 2~3글자 접두사 | 문서 1개 | `FND` 파운데이션 명세서 |
| 티켓 키 | `접두사-두 자리` | 명세서의 절 | `FND-01` |
| 기능 ID | `티켓 키-두 자리` | 절 안의 표 행 | `FND-01-01` |

- 티켓 1개 = GitHub 이슈 1개 = 노션 엔지니어링 작업 1개. PR 1개 정도로 닫을 수 있는 단위
- 기능 ID마다 "완료 확인 방법"이 있음. 명령 결과나 파일로 확인할 수 있어야 완료로 봄
- Milestone과 이슈는 Phase를 시작할 때 승인 후 그 Phase 것만 만듦

### 문서 역할

| 문서 | 역할 |
| --- | --- |
| 노션 WBS·명세서 | 기준 문서. 티켓 완료 조건과 GitHub 이슈 연결 |
| `docs/wbs/*.md`(이 폴더) | 노션 원본 마크다운 사본. 노션과 다르면 노션 기준으로 맞춤 |
| `AGENTS.md` | 토큰 작업 절차·이름 규칙·breaking 규칙 |

### 명세서(Epic) 목록

| 접두사 | 명세서 | 범위 | Phase | 티켓 | 페이지 |
| --- | --- | --- | --- | --- | --- |
| DS | 저장소·규칙 | 저장소 생성, 협업 규칙, CI, 릴리스 | 0, 1, 3 | 8 | 10-ds.md |
| FND | 파운데이션 | 색(팔레트·시맨틱), 타이포, radius, spacing, 빌드 | 1 | 6 | 20-fnd.md |
| CMP | 컴포넌트 명세 | P0 8종, P1 8종 | 2, 3 | 16 | 30-cmp.md |
| PAT | 패턴·가이드라인 | 피드백, 폼, 접근성, 보이스 앤 톤 | 3 | 4 | 40-pat.md |
| ADP | 앱 적용 | frontend·frontend_admin 토큰 연결, 불일치 정리 | 4 | 4 | 50-adp.md |

- 티켓 38개 중 DS-00~05 6개는 완료

### 용어

| 용어 | 뜻 |
| --- | --- |
| 토큰 | 색·글자 크기·간격 같은 디자인 값에 붙인 이름. 코드에서는 CSS 변수(`--boaz-*`)로 씀 |
| 팔레트 토큰 | 원래 색 값 그 자체(`color.palette.purple.100` = #7A64F9) |
| 시맨틱 토큰 | 용도로 붙인 이름(`color.bg.brand-solid`). 값은 팔레트를 참조함 |
| DTCG | 디자인 토큰 JSON 표준 형식(`$value`, `$type`) |
| dist | `npm run build`로 만든 생성물(`tokens.css`, `tokens.ts`, `tailwind-theme.css`). 앱은 이 파일을 가져감 |
| breaking | 토큰 이름을 지우거나 바꿔 앱이 깨지는 변경 |

---

## Phase

| Phase | 목표 | 완료 기준 | 티켓 |
| --- | --- | --- | --- |
| Phase 0 저장소·규칙 | 공개 저장소와 협업 규칙 | CI `Tokens Build` 통과, 이슈 #1 종료 | DS-00~05 (완료) |
| Phase 1 파운데이션 | 토큰 v0.1 | 팔레트·시맨틱·타이포·radius·spacing 토큰과 dist 3종, `v0.1.0` 태그 | FND-01~06, DS-06 |
| Phase 2 핵심 컴포넌트 | P0 명세 8종 | `components/*.md` 8개 `status: review` 이상 | CMP-01~08 |
| Phase 3 패턴·확장 | 패턴 4종, P1 명세 8종, v0.2 | `patterns/*.md` 4개, P1 8개 `draft` 이상, `v0.2.0` 태그 | PAT-01~04, CMP-09~16, DS-07 |
| Phase 4 앱 적용 | 두 앱이 토큰 사용 | 각 앱 저장소 PR 머지 | ADP-01~04 |

- Phase 4는 Phase 1(v0.1)만 끝나면 시작할 수 있음. 관리자 콘솔 적용(ADP-02)은 컴포넌트 명세를 기다리지 않음

---

## 진행 현황 (2026-09-28 기준)

| 구분 | 내용 | 근거 | 상태 |
| --- | --- | --- | --- |
| 저장소 초기 구성 | 공개 저장소(Apache-2.0), 커밋 훅, 가드·라벨·배정 워크플로, CI, CodeRabbit, AGENTS.md, Style Dictionary 최소 빌드 | #1 | 완료 |
| 브랜치 규칙 삭제·리뷰어 수동 지정 | ruleset 삭제, CODEOWNERS 삭제 | #2, PR #3 | 진행 중 |
| Figma 원본 조사 | 색 스타일 17종·텍스트 스타일 12종·버튼 상태값·radius 실측 | 이 문서 | 완료 |

---

## 전체 티켓

| 티켓 | 제목 | 명세서 | Phase | 규모 | 선행 | 상태 |
| --- | --- | --- | --- | --- | --- | --- |
| DS-00 | 저장소 생성·브랜치 구성 | DS | 0 | 몇 시간 | 없음 | 완료 |
| DS-01 | 커밋 훅·템플릿 이식 | DS | 0 | 몇 시간 | DS-00 | 완료 |
| DS-02 | 라벨·자동 라벨·자동 배정 | DS | 0 | 몇 시간 | DS-00 | 완료 |
| DS-03 | 저장소 서버 설정 | DS | 0 | 몇 시간 | DS-00 | 완료(ruleset은 #2에서 삭제) |
| DS-04 | CI `Tokens Build` | DS | 0 | 몇 시간 | DS-00 | 완료 |
| DS-05 | CodeRabbit·AGENTS.md·README | DS | 0 | 몇 시간 | DS-00 | 완료 |
| FND-01 | 팔레트 토큰 확정 | FND | 1 | 몇 시간 | DS-04 | 대기 |
| FND-02 | 타이포 토큰 12종 | FND | 1 | 하루이틀 | DS-04 | 대기 |
| FND-03 | radius 토큰 | FND | 1 | 몇 시간 | DS-04 | 대기 |
| FND-04 | spacing 토큰 | FND | 1 | 몇 시간 | DS-04 | 대기 |
| FND-05 | 시맨틱 색 토큰 | FND | 1 | 하루이틀 | FND-01 | 대기 |
| FND-06 | 빌드 보강(타이포·spacing 출력) | FND | 1 | 하루이틀 | FND-02, FND-04 | 대기 |
| DS-06 | `v0.1.0` 릴리스 | DS | 1 | 몇 시간 | FND-01~06 | 대기 |
| CMP-01 | button | CMP | 2 | 하루이틀 | DS-06 | 대기 |
| CMP-02 | text-field | CMP | 2 | 하루이틀 | DS-06 | 대기 |
| CMP-03 | select(dropdown) | CMP | 2 | 몇 시간 | DS-06 | 대기 |
| CMP-04 | checkbox | CMP | 2 | 몇 시간 | DS-06 | 대기 |
| CMP-05 | radio | CMP | 2 | 몇 시간 | DS-06 | 대기 |
| CMP-06 | tab | CMP | 2 | 하루이틀 | DS-06 | 대기 |
| CMP-07 | modal | CMP | 2 | 하루이틀 | DS-06 | 대기 |
| CMP-08 | card | CMP | 2 | 하루이틀 | DS-06 | 대기 |
| PAT-01 | feedback | PAT | 3 | 하루이틀 | CMP-07 | 대기 |
| PAT-02 | form | PAT | 3 | 하루이틀 | CMP-02 | 대기 |
| PAT-03 | accessibility | PAT | 3 | 하루이틀 | FND-05 | 대기 |
| PAT-04 | voice & tone | PAT | 3 | 하루이틀 | 없음 | 대기 |
| CMP-09 | filter-chip | CMP | 3 | 몇 시간 | CMP-06 | 대기 |
| CMP-10 | tag-chip | CMP | 3 | 몇 시간 | CMP-09 | 대기 |
| CMP-11 | search-autocomplete | CMP | 3 | 몇 시간 | CMP-02 | 대기 |
| CMP-12 | pagination | CMP | 3 | 몇 시간 | DS-06 | 대기 |
| CMP-13 | tag | CMP | 3 | 몇 시간 | DS-06 | 대기 |
| CMP-14 | progress-bar | CMP | 3 | 몇 시간 | DS-06 | 대기 |
| CMP-15 | selection-card | CMP | 3 | 몇 시간 | CMP-05 | 대기 |
| CMP-16 | form-add-button | CMP | 3 | 몇 시간 | CMP-02 | 대기 |
| DS-07 | `v0.2.0` 릴리스 | DS | 3 | 몇 시간 | PAT-01~04, CMP-09~16 | 대기 |
| ADP-01 | frontend 토큰 연결 | ADP | 4 | 하루이틀 | DS-06 | 대기 |
| ADP-02 | frontend_admin 토큰 연결 | ADP | 4 | 몇 시간 | DS-06 | 대기 |
| ADP-03 | frontend 값 불일치 정리 | ADP | 4 | 하루이틀 | ADP-01, CMP-01 | 대기 |
| ADP-04 | frontend `alert()` → 모달 교체 | ADP | 4 | 하루이틀 | CMP-07, PAT-01 | 대기 |

---

## 원천 자료

- Figma: 사용자 소유가 아닌 TF팀 디자인 파일. 링크는 노션에만 적음(공개 저장소에 적지 않음)
  - Components 페이지: 컴포넌트·인터렉션 시트, 색·텍스트 스타일 사용처
  - FE 회의용 페이지: 코드 variant 이름 라벨(`large-round`, `medium-primary` 등), 11단계 색 스케일 초안(스타일 미등록), 간격 메모(gap 20·22·25·34·36)
  - Page: 무드보드·IA·화면 시안. `Typo` 프레임은 Esamanru 폰트 템플릿 초안으로 폐기본
- 코드: `frontend/src/shared/styles/*.css.ts`, `frontend_admin/src/app/styles/theme.css`
- 레퍼런스: [daangn/seed-design](https://github.com/daangn/seed-design)
