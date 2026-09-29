# AGENTS.md

사람과 AI 에이전트가 이 저장소에서 작업할 때 지키는 규칙입니다. 개발 환경과 협업 규약(브랜치·제목·커밋)은 CONTRIBUTING.md를 따릅니다.

## 원칙

- 이 저장소는 **기준(토큰·명세)** 을 만듭니다. 소비 앱(`frontend`, `frontend_admin`) 코드는 여기서 고치지 않고, 각 앱 저장소에 이슈를 따로 냅니다.
- 원천은 `tokens/`, `components/`, `patterns/`입니다. `dist/`는 생성물이므로 직접 고치지 않습니다.
- 공개 저장소입니다. 개인 정보(지원자 이름·이메일 등)·시크릿을 문서나 이미지에 넣지 않습니다. 외부 자료는 출처와 라이선스를 적습니다.

## 토큰 작업 절차

1. `tokens/**/*.json`을 DTCG 형식(`$value`, `$type`)으로 수정합니다.
2. `npm run build`로 `dist/`를 다시 만듭니다.
3. `tokens/`와 `dist/`를 같은 커밋에 넣습니다. CI `Tokens Build`가 둘이 다르면 실패시킵니다.
4. 토큰을 참조하는 명세(`components/`, `patterns/`)가 있으면 함께 고칩니다.

## 토큰 이름 규칙

| 계층 | 경로 | 예 | CSS 변수 |
| --- | --- | --- | --- |
| 팔레트 | `color.palette.{group}.{step}` | `color.palette.purple.100` | `--boaz-color-palette-purple-100` |
| 시맨틱 | `color.{fg\|bg\|stroke}.{role}[-state]` | `color.bg.brand-solid-hover` | `--boaz-color-bg-brand-solid-hover` |
| 그 외 | `{radius\|spacing\|typography}.{scale}` | `radius.md` | `--boaz-radius-md` |

- 2계층(팔레트 → 시맨틱)만 둡니다. 컴포넌트 전용 토큰 계층은 만들지 않습니다.
- 앱 코드는 시맨틱 토큰을 우선 참조합니다. 팔레트 직접 참조는 시맨틱이 없을 때만 씁니다.
- state: `hover`, `press`, `focus`, `disabled`, `selected`.

## breaking 변경

- 토큰 이름 삭제·변경은 소비 앱을 깨뜨립니다. PR 본문에 대체 이름과 영향 앱을 적고, 버전의 minor(0.x) 또는 major를 올립니다.
- 값만 바뀌는 변경은 patch입니다.

## 릴리스

- `dev` → `main` 머지 후 `package.json`의 `version`을 올리고 `vX.Y.Z` 태그를 겁니다. 소비 앱은 이 태그로 설치합니다.

## 이슈 / Milestone

- 작업 기준은 노션 WBS입니다(티켓 키 `REPO-`, `TOKEN-`, `COMPONENT-`, `PATTERN-`, `ADOPT-`). GitHub 이슈는 티켓과 1:1입니다.
- Milestone과 이슈는 Phase를 시작할 때 사용자 승인을 받고 그 Phase 것만 만듭니다.

## 문서 작성 규칙

Notion 문서, PR·이슈 본문, 저장소 안 문서(`docs/`, `components/`, `patterns/` 명세 포함)를 쓰거나 고칠 때 적용합니다. AI 도구에 문서 작성을 맡길 때도 이 절을 따르게 합니다.

- 문서만 읽고 이해할 수 있게 씁니다. 작성 당시 맥락(회의, 대화)을 모르는 팀원이 처음 읽어도 뜻이 통해야 합니다.
- 비유 표현을 쓰지 않습니다. 뜻 그대로의 말로 씁니다.
- 팀에서 만들어 붙인 말은 쓰지 않습니다. 써야 하면 무엇인지 풀어 씁니다. BOAZ 도메인 용어(기수, 트랙, BASE·ADV·스터디, HOST 계정 등)와 WBS 티켓 ID는 그대로 씁니다.
- 업계 표준 기술 용어는 그대로 씁니다(API, 스키마, 토큰, PR 등). 과하게 풀어 써서 산출물 이름이 사라지게 하지 않습니다.
- 작성자만 뜻을 아는 식별자를 쓰지 않습니다: 커밋 해시, 워크플로 실행 번호, 개인 GitHub 계정명. 팀원이 찾아갈 수 있는 대상(저장소·브랜치 이름, 파일 경로, PR·이슈 번호와 링크)은 써도 됩니다.
- 담당은 실명 대신 역할로 씁니다. 예: 프론트엔드 담당, 운영진
- 날짜는 `2026-09-30` 형식의 절대 날짜로 씁니다. "다음 주", "금일" 같은 상대 표현을 쓰지 않습니다.
- 영어 설정 이름은 무엇을 하는 설정인지 한국어로 풀고, 필요하면 괄호에 원래 이름을 적습니다. 예: 관리자에게도 규칙 적용(enforce admins)
- PR·이슈 본문은 저장소 템플릿(`.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`)의 섹션 이름과 순서를 그대로 지킵니다. 템플릿에 없는 섹션을 만들지 않고, 문서 작업 중에 템플릿 파일 자체를 고치지 않습니다.
- 연결된 Notion 티켓이 있으면 템플릿의 첫 섹션(개요·목적 등) 안에 링크를 적습니다.
- 고치지 않는 것: 회의 발언 기록 원문, 외부 자료 인용, 코드 블록, 다른 문서가 링크하는 파일·폴더 이름
- `docs/wbs/` 문서는 개조식 명사형 종결(`~함`, `~됨`)을 씁니다.
