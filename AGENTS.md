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

- 작업 기준은 노션 WBS입니다(티켓 키 `DS-`, `FND-`, `CMP-`, `PAT-`, `ADP-`). GitHub 이슈는 티켓과 1:1입니다.
- Milestone과 이슈는 Phase를 시작할 때 사용자 승인을 받고 그 Phase 것만 만듭니다.
