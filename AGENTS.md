# AGENTS.md

사람과 AI 에이전트가 이 저장소에서 작업할 때 지키는 규칙입니다. 개발 환경과 협업 규약(브랜치·제목·커밋)은 CONTRIBUTING.md를 따릅니다.

## 원칙

- 이 저장소는 **기준(토큰·명세)과 두 앱이 함께 쓰는 React 컴포넌트**를 만듭니다. 소비 앱(`frontend`, `frontend_admin`) 코드는 여기서 고치지 않고, 각 앱 저장소에 이슈를 따로 냅니다.
- 원천은 `tokens/`, `components/`·`patterns/`(명세), `src/`(컴포넌트 코드)입니다. `dist/`는 생성물이므로 직접 고치지 않습니다.
- 공개 저장소입니다. 개인 정보(지원자 이름·이메일 등)·시크릿을 문서나 이미지에 넣지 않습니다. 외부 자료는 출처와 라이선스를 적습니다.

## 토큰 작업 절차

1. `tokens/**/*.json`을 DTCG 형식(`$value`, `$type`)으로 수정합니다.
2. `npm run build`로 `dist/`를 다시 만듭니다.
3. `tokens/`와 `dist/`를 같은 커밋에 넣습니다. CI `Tokens Build`가 둘이 다르면 실패시킵니다.
4. 토큰을 참조하는 명세(`components/`, `patterns/`)가 있으면 함께 고칩니다.
5. 컴포넌트 명세 작업 중 토큰에 없는 값이 나오면 명세에는 `raw:` 값으로 적고, 토큰 추가는 별도 이슈로 냅니다. 이름 삭제·변경도 별도 이슈로 디자인 시스템 리드 승인을 받습니다.

## 명세 작업 절차

`components/<id>.md` 컴포넌트 명세를 새로 쓸 때의 절차입니다.

값의 우선순위: 라이브 사이트(`www.bigdataboaz.com`)에 있는 UI는 라이브 값, 라이브에 없는 UI는 Figma 값을 씁니다. 토큰과 다르면 토큰 이름이 아니라 `raw:` 값으로 적고 토큰 추가는 별도 이슈로 냅니다. 라이브에서 볼 수 없는 화면(모집 기간 밖 지원서 등)은 frontend 코드 값을 라이브 값으로 봅니다.

1. 배정받은 이슈 번호를 확인합니다. 없으면 커밋하지 않습니다(CONTRIBUTING.md "이슈 / PR").
2. `components/_template.md`를 `components/<id>.md`로 복사해 채웁니다. 절 구성·표 열·표기 규칙은 템플릿을 그대로 둡니다.
3. 쓰는 토큰 이름이 모두 `tokens/`에 있는지 `dist/tokens.d.ts`와 대조합니다. CI `Tokens Build`도 백틱 안 토큰 이름을 `dist/tokens.css`와 대조해, 없는 이름·짧은 표기(`bg.layer`)·Figma 링크가 있으면 실패시킵니다. 같은 PR에서 토큰을 추가했다면 `npm run build`로 만든 `dist/`도 함께 커밋해야 통과합니다. 토큰에 없는 값은 `radius.8`처럼 지어 쓰지 않고 `raw:8px`로 적습니다. "이런 토큰은 없음"을 설명할 때도 이름을 백틱에 넣지 않습니다.
4. `docs/wbs/30-component.md`의 해당 티켓 "완료 확인 방법"을 하나씩 대조합니다.
5. PR 제목은 `[Docs] COMPONENT-01 button 명세` 꼴, 커밋 type은 `docs`입니다. 머지 전 status 전이 조건은 `docs/wbs/30-component.md` "status 전이"입니다.

## 컴포넌트 구현 절차

`src/components/<id>/` 컴포넌트를 구현할 때의 절차입니다. 파일 구성·스타일·접근성 규칙은 `docs/wbs/45-ui.md` "구현 규칙"을 따릅니다.

1. 배정받은 UI 티켓 이슈 번호를 확인합니다. 없으면 커밋하지 않습니다.
2. `components/<id>.md` 명세를 먼저 읽습니다. 값·상태·동작·접근성은 명세가 기준입니다. 명세와 다르게 구현해야 할 이유가 생기면 구현 PR에서 바꾸지 말고 명세 수정 이슈를 먼저 냅니다.
3. 값은 `var(--boaz-*)` 토큰 변수로만 씁니다. 명세의 `raw:` 값만 CSS에 직접 적습니다.
4. 상태 조합별 story와 키보드·aria 테스트를 함께 씁니다.
5. `npm run build`로 만든 `dist/`를 같은 커밋에 넣습니다. `npm test`와 Storybook 빌드가 통과해야 합니다.
6. `docs/wbs/45-ui.md`의 해당 티켓 "완료 확인 방법"을 하나씩 대조합니다. PR 제목은 `[Feat] UI-03 Button` 꼴, 커밋 type은 `feat`입니다.

## 토큰 이름 규칙

| 계층 | 경로 | 예 | CSS 변수 |
| --- | --- | --- | --- |
| 팔레트(원시) | `color.palette.{group}.{step}` | `color.palette.purple.100` | `--boaz-color-palette-purple-100` |
| 시맨틱 | `color.{fg\|bg\|stroke}.{role}[-state]` | `color.bg.brand-solid-hover` | `--boaz-color-bg-brand-solid-hover` |
| 글꼴 원시 | `font.{size\|weight\|line-height\|family}.{scale}` | `font.size.18` | `--boaz-font-size-18` |
| 타이포 스타일 | `typography.{style}.{size\|weight\|line-height}` | `typography.body-3.size` | `--boaz-typography-body-3-size` |
| 그 외 | `{radius\|spacing}.{scale}` | `radius.md` | `--boaz-radius-md` |

- 원시 → 용도 2계층만 둡니다. 색은 팔레트 → 시맨틱, 글꼴은 `font.*` → `typography.*`입니다. 컴포넌트 전용 토큰 계층은 만들지 않습니다.
- 앱 코드는 용도 계층(시맨틱·`typography.*`)을 우선 참조합니다. 원시 계층 직접 참조는 용도 토큰이 없을 때만 씁니다.
- 팔레트 `{step}`은 숫자만 씁니다. 숫자가 클수록 어둡고, 결번(예: gray 500·700)은 허용합니다. 흰색·검정은 `gray.0`·`gray.1000`입니다.
- state: `hover`, `press`, `focus`, `disabled`, `selected`. 경로의 마지막 조각이 이 목록에 있으면 state로 봅니다(`brand-solid-hover`의 state는 `hover`, role은 `brand-solid`).
- state 단어를 role 자리에 단독으로 쓸 수 있습니다: `stroke.focus`(포커스 링), `bg.disabled`·`fg.disabled`(비활성). 이때는 기본 상태의 색이 따로 없다는 뜻입니다.
- 흰 표면(`bg.surface-inverse`) 위에서 쓰는 변형은 같은 용도의 기존 role 뒤에 `-inverse`를 붙입니다(`stroke.focus-inverse`). 흰 표면 위 글자 기본색만 `fg.on-inverse`입니다.
- 명세·문서에서는 토큰을 전체 경로를 백틱으로 감싸 적습니다(`color.stroke.focus`, `typography.body-2`, `radius.md`). CSS 변수(`--boaz-*`)와 Tailwind 이름은 코드 대응 절에서만 씁니다. `docs/wbs/`의 기존 문서는 시맨틱 색을 `color.` 없이 `bg.layer` 꼴로 적어 두었고 그대로 둡니다.

## breaking 변경

- 토큰 이름 삭제·변경, 컴포넌트 export 이름·prop 이름 삭제·변경은 소비 앱을 깨뜨립니다. PR 본문에 대체 이름과 영향 앱을 적고, 버전의 minor(0.x) 또는 major를 올립니다.
- 값만 바뀌는 변경은 patch입니다.
- 토큰 추가는 breaking이 아니며 patch입니다(0.x에서 minor는 breaking 전용). 추가한 토큰을 앱이 쓰려면 릴리스가 필요하므로 PR 본문에 쓸 앱과 티켓을 적습니다.
- 이름 삭제·변경 여부는 `git diff dev -- dist/tokens.d.ts`로 확인합니다. 소비 앱에서는 새 버전 설치 후 타입 검사(frontend `pnpm check-types`, frontend_admin `npm run check-types`)로 깨지는 곳을 찾습니다.

## 릴리스

- `dev` → `main` 머지 후 `package.json`의 `version`을 올리고 `vX.Y.Z` 태그를 겁니다. 소비 앱은 이 태그로 설치합니다. 릴리스는 디자인 시스템 리드가 합니다.
- `v*` 태그는 한 번 걸면 삭제·이동할 수 없습니다(태그 보호 규칙). 태그 push 때 `Release Check`가 빌드·`dist/` 일치·version 일치를 검사하며, 실패하면 고친 뒤 patch 버전을 올려 새 태그를 겁니다.

## 이슈 / Milestone

- 작업 기준은 노션 WBS입니다(티켓 키 `REPO-`, `TOKEN-`, `COMPONENT-`, `PATTERN-`, `UI-`, `ADOPT-`). GitHub 이슈는 티켓과 1:1입니다.
- Milestone과 이슈는 Phase를 시작할 때 디자인 시스템 리드(현재 인프라 담당)의 승인을 받고 그 Phase 것만 만듭니다. 구현 담당과 AI 도구는 직접 만들지 않습니다.

## 문서 작성 규칙

Notion 문서, PR·이슈 본문, 저장소 안 문서(`docs/`, `components/`, `patterns/` 명세 포함)를 쓰거나 고칠 때 적용합니다. AI 도구에 문서 작성을 맡길 때도 이 절을 따르게 합니다.

- 문서만 읽고 이해할 수 있게 씁니다. 작성 당시 맥락(회의, 대화)을 모르는 팀원이 처음 읽어도 뜻이 통해야 합니다.
- 비유 표현을 쓰지 않습니다. 뜻 그대로의 말로 씁니다.
- 팀에서 만들어 붙인 말은 쓰지 않습니다. 써야 하면 무엇인지 풀어 씁니다. BOAZ 도메인 용어(기수, 트랙, BASE·ADV·스터디, HOST 계정 등)와 WBS 티켓 ID는 그대로 씁니다.
- 업계 표준 기술 용어는 그대로 씁니다(API, 스키마, 토큰, PR 등). 과하게 풀어 써서 산출물 이름이 사라지게 하지 않습니다.
- 작성자만 뜻을 아는 식별자를 쓰지 않습니다: 커밋 해시, 워크플로 실행 번호, 개인 GitHub 계정명. 팀원이 찾아갈 수 있는 대상(저장소·브랜치 이름, 파일 경로, PR·이슈 번호와 링크)은 써도 됩니다. 단, CI 장애·검증 기록처럼 추적이 목적인 기록에는 커밋 해시와 워크플로 실행 URL을 적을 수 있습니다.
- 담당은 실명 대신 역할로 씁니다. 예: 프론트엔드 담당, 운영진
- 날짜는 `2026-09-30` 형식의 절대 날짜로 씁니다. "다음 주", "금일" 같은 상대 표현을 쓰지 않습니다.
- 영어 설정 이름은 무엇을 하는 설정인지 한국어로 풀고, 필요하면 괄호에 원래 이름을 적습니다. 예: 관리자에게도 규칙 적용(enforce admins)
- PR·이슈 본문은 저장소 템플릿(`.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/`)의 섹션 이름과 순서를 그대로 지킵니다. 템플릿이 내용이 없으면 삭제하라고 안내한 섹션만 지울 수 있습니다. 템플릿에 없는 섹션을 만들지 않고, 문서 작업 중에 템플릿 파일 자체를 고치지 않습니다.
- 이 저장소는 공개이므로 Notion·Figma 링크는 적지 않습니다. 템플릿의 티켓 키 칸에 티켓 키(예: `COMPONENT-01`)만 적고, Figma는 노드 ID만 적습니다. 명세 PR의 "스크린샷 / 근거" 절에는 Figma 노드 ID와 대비 계산 결과만 적고 캡처는 넣지 않습니다.
- 고치지 않는 것: 회의 발언 기록 원문, 외부 자료 인용, 코드 블록, 다른 문서가 링크하는 파일·폴더 이름
- `docs/wbs/` 문서와 `components/`·`patterns/` 명세는 개조식 명사형 종결(`~함`, `~됨`)을 씁니다.
