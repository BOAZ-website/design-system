# REPO 저장소·규칙 명세서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- 디자인 시스템 공개 저장소를 만들고 BOAZ 공통 협업 규칙을 이식함
- 토큰 원천(`tokens/`)과 생성물(`dist/`)이 항상 같도록 CI로 검사함
- 앱이 git 태그로 설치할 수 있게 버전을 발행함

**범위:** 저장소 설정, 커밋 훅, 워크플로, 템플릿, CI, 문서(README·AGENTS.md·WBS), 릴리스 태그
**범위 밖:** npm 배포, Storybook, 문서 사이트

---

## REPO-00 저장소 생성·브랜치 구성

**목적:** 공개 저장소와 `dev`·`main` 브랜치를 만듦

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | 없음 | 0 | #1 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-00-01 | `BOAZ-website/design-system` 공개 저장소, Apache-2.0 | 저장소 visibility public, LICENSE 존재 |
| REPO-00-02 | 기본 브랜치 `dev`, `main` 병행 | `gh api repos/BOAZ-website/design-system --jq .default_branch` = dev |
| REPO-00-03 | 머지 방식 merge commit만, 머지 후 브랜치 자동 삭제, Wiki·Projects 끔 | 저장소 설정 값 |

## REPO-01 커밋 훅·템플릿 이식

**목적:** backend·product-infra와 같은 커밋·이슈·PR 양식을 씀

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-00 | 0 | #17 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-01-01 | `.githooks/commit-msg`: `type: 설명 (#이슈)` 강제(product-infra 원본) | 대문자 type·이슈 번호 누락·설명 누락 메시지가 거부됨 |
| REPO-01-02 | 이슈·PR 템플릿: 영향 토큰·dist 재생성·breaking·소비 앱 영향 체크 | `.github/` 파일 존재 |
| REPO-01-03 | `.editorconfig`(frontend), `.gitattributes`(LF, dist 생성물 표시), `.gitignore` | 파일 존재 |
| REPO-01-04 | CODEOWNERS는 두지 않음. 리뷰어는 PR 담당자가 지정 | `.github/CODEOWNERS` 없음(PR #3) |

## REPO-02 라벨·자동 라벨·자동 배정

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-00 | 0 | #18 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-02-01 | 라벨 7종(FEAT·FIX·DOCS·STYLE·REFACTOR·TEST·CHORE), 기본 라벨 삭제 | `gh label list` 7개 |
| REPO-02-02 | auto-label: 제목 맨 앞 `[Type]`으로만 라벨 부착(본문 단어로 오분류하지 않음) | `[Docs] design 문서` 제목에 DOCS만 붙음 |
| REPO-02-03 | auto-assign, title-guard, pr-base-guard(product-infra 원본) | 이슈·PR 생성 시 작성자 배정, 양식 위반 시 안내 코멘트 |

## REPO-03 저장소 서버 설정

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-00 | 0 | #19 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-03-01 | 팀 권한: `2nd-frontend`·`2nd-pm` write | `gh api repos/BOAZ-website/design-system/teams` |
| REPO-03-02 | Actions 기본 토큰 read, secret scanning·push protection·Dependabot alerts 켬 | 저장소 보안 설정 |
| REPO-03-03 | 서버 브랜치 규칙(ruleset) 없음 | `gh api repos/BOAZ-website/design-system/rulesets` = `[]`(PR #3) |

## REPO-04 CI `Tokens Build`

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-00 | 0 | #20 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-04-01 | Node 24(`.nvmrc`), `npm ci` → `npm run build` | CI 로그 |
| REPO-04-02 | `dist/`가 빌드 결과와 다르면 실패 | `dist/` 한 줄 수정 후 push 시 CI 실패 |
| REPO-04-03 | 빌드 결과가 매번 같음(파일 헤더 날짜 없음) | 두 번 빌드 후 `diff -r` 차이 없음 |

## REPO-05 CodeRabbit·AGENTS.md·README·CONTRIBUTING

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-00 | 0 | #21 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-05-01 | `.coderabbit.yaml`: 한국어, `dist/` 제외, DTCG·이름 규칙·breaking·대비·공개 저장소 지침 | 첫 PR에 CodeRabbit 리뷰 코멘트 |
| REPO-05-02 | `AGENTS.md`: 토큰 작업 절차, 이름 규칙, breaking·릴리스 규칙. `CLAUDE.md`는 `@AGENTS.md` | 파일 존재 |
| REPO-05-03 | README: 소개, 구성(폴더·문서 색인), 사용, 라이선스(seed-design 방식) | 파일 존재 |
| REPO-05-04 | CONTRIBUTING.md: 개발 환경, 토큰 변경 절차, 브랜치·이슈·PR·커밋 규약, 언어 | 파일 존재(PR #7) |

## REPO-06 `v0.1.0` 릴리스

**목적:** 파운데이션 토큰을 앱이 설치할 수 있는 첫 버전으로 발행함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | TOKEN-01~06 | 1 | #16 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-06-01 | `dev` → `main` 머지, `package.json` version `0.1.0`. `engines` 필드 삭제(소비 앱 설치에 불필요하고 frontend CI의 Node 20에서 설치 경고를 냄. 빌드용 Node 24는 `.nvmrc`로 유지) | `main`의 package.json에 version `0.1.0`, `engines` 없음 |
| REPO-06-02 | `v0.1.0` 태그와 GitHub Release(변경 토큰 목록) | `gh release view v0.1.0` |
| REPO-06-03 | 빈 프로젝트에서 git 태그 설치 확인 | `npm install github:BOAZ-website/design-system#v0.1.0` 후 `node_modules/@boaz/design-system/dist/tokens.css` 존재 |

## REPO-07 `v0.2.0` 릴리스

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | PATTERN-01~04, COMPONENT-09~16 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-07-01 | `dev` → `main` 머지, version `0.2.0`, `v0.2.0` 태그·Release | `gh release view v0.2.0` |

## REPO-08 WBS·명세서 작성

**목적:** 디자인 시스템 구축 작업 전체를 명세서(Epic)와 티켓으로 나누고, 결정 사항과 규모를 정리함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-00 | 0 | #4 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| REPO-08-01 | WBS·명세서 v2: 읽는 법, 명세서 5개, Phase 0~4, 기능 ID별 완료 확인 방법, Figma 원본 조사 결과 | `docs/wbs/` 파일 6개(PR #5) |
| REPO-08-02 | 결정 D-01·D-02·D-03·D-04·D-08 확정 반영 | 명세서 본문의 확정값(PR #9) |
| REPO-08-03 | 남은 결정 5건 확정과 결정 섹션 정리 | `00-wbs.md`에 결정 대기 섹션 없음(PR #11) |
| REPO-08-04 | 명세서의 확인 필요 사항 절 삭제 | 명세서에 "확인 필요 사항" 절 없음(PR #13) |
| REPO-08-05 | 티켓 규모 재산정과 Epic 규모 합계 | `00-wbs.md` Epic 표의 "남은 규모" 열(PR #15) |
| REPO-08-06 | Phase 1 착수 전 토큰 명세 보강: 크기 단위 px 확정, `tokens.js`·`tokens.d.ts` 출력, 이름 규칙 표에 `font`·`typography` 행과 state 예외 추가, Tailwind 타이포 변환 규칙, 중복 이름 빌드 실패 설정, 대비표, 팔레트 이름 정리, 완료 확인 방법 수치 수정 | `20-token.md`에 "대비표" 절, AGENTS.md 표에 `typography.{style}` 행 |
