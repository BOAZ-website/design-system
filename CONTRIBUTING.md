# Contributing

BOAZ Design System에 기여하는 방법입니다. 토큰 이름 규칙, 명세 작업 절차, 컴포넌트 구현 절차, breaking 변경 규칙은 [`AGENTS.md`](./AGENTS.md)를 따릅니다.

## 처음 합류했다면

첫 PR까지 아래 순서로 진행합니다. 권한 부여에 시간이 걸릴 수 있어 요청을 가장 먼저 합니다.

1. 디자인 시스템 리드에게 아래 "합류 체크리스트"의 권한과 맡을 티켓의 GitHub 이슈 번호를 요청합니다.
2. [`README.md`](./README.md)로 저장소 구성(`tokens/` → `dist/`, `components/`·`patterns/` 명세, `src/` 컴포넌트 코드)을 봅니다.
3. [`AGENTS.md`](./AGENTS.md)의 원칙, 토큰 이름 규칙, 컴포넌트 구현 절차, 문서 작성 규칙을 읽습니다.
4. [`docs/wbs/00-wbs.md`](./docs/wbs/00-wbs.md)의 "읽는 법"·"Phase"·"인수인계"를 읽습니다. 이어서 맡은 티켓이 있는 작업 정의서(명세·구현 모두 `docs/wbs/30-component.md`)와 그 티켓의 명세(`components/<id>.md`)를 읽습니다.
5. 값의 근거는 [`docs/design-reference.md`](./docs/design-reference.md)와 `docs/wbs/20-token.md`의 대비표에서 찾습니다.
6. 아래 "개발 환경"의 커밋 훅을 켜고 `npm ci`를 실행합니다.
7. `dev`에서 브랜치를 만들고 맡은 티켓을 구현합니다. Phase 2 구현은 COMPONENT-17(패키지 빌드 구성) → COMPONENT-18(Storybook) → COMPONENT-19(button, 구현 양식 확정) 순서로 시작합니다.
8. "컴포넌트 PR 점검"(명세를 고쳤으면 "명세 PR 점검")을 확인한 뒤 base를 `dev`로 PR을 내고 리뷰어를 지정합니다.
9. 리뷰어 승인 후 머지하고 "머지 후"의 세 가지를 처리합니다.

이 저장소에서 쓰는 역할은 세 가지입니다.

| 역할 | 하는 일 |
| --- | --- |
| 디자인 시스템 리드(현재 인프라 담당) | Phase 시작 승인, 이슈·Milestone 생성, 릴리스 태그, 서버 설정(권한·ruleset), 노션 WBS 반영, 결정 충돌 판정 |
| 구현 담당 | 맡은 구현 티켓(COMPONENT-17~33)의 컴포넌트 구현과 PR. 명세와 다른 점을 발견하면 명세 수정 이슈를 냄 |
| 명세 담당 | 명세 수정 이슈의 명세 작성과 PR(현재 디자인 시스템 리드) |
| 리뷰어 | 구현·명세 PR 검토·승인(작성자와 다른 사람) |

## 합류 체크리스트

| 항목 | 필요한 때 | 요청처 | 확인 방법 |
| --- | --- | --- | --- |
| GitHub 조직 가입과 `2nd-frontend` 팀 소속(저장소 push 권한) | 첫 브랜치 push | 디자인 시스템 리드 | 브랜치를 push할 수 있음 |
| 담당 티켓의 GitHub 이슈 배정 | 첫 커밋 | 디자인 시스템 리드 | 이슈에 담당자로 표시됨 |
| 노션 WBS 열람·편집 권한 | 티켓 상태 갱신 | 디자인 시스템 리드. 노션 링크도 여기서 받음. 이 저장소에는 링크를 적지 않음 | 노션에서 티켓 상태를 바꿀 수 있음 |
| Figma 원본(TF팀 디자인 파일) 열람 | 명세 작성 | 디자인 시스템 리드를 통해 디자인팀에 요청(파일 소유는 디자인팀) | 명세의 Figma 노드 ID를 열어 볼 수 있음 |
| `frontend` 저장소 읽기 | 명세의 "코드 대응" 절 작성 | 공개 저장소라 권한 불필요. 별도로 클론함(읽기만 하고 이 저장소 PR에서 고치지 않음) | 경로를 확인할 수 있음 |
| `frontend`·`frontend_admin` 쓰기 권한 | Phase 4(ADOPT) 티켓을 맡을 때만 | 디자인 시스템 리드 | 해당 저장소에 브랜치 push |
| Node 24와 npm | 컴포넌트를 구현하거나 토큰을 고칠 때(명세만 고치면 불필요) | 본인 | `node -v`가 24, `npm run build` 성공 |

- 라벨은 이슈·PR 제목의 `[Type]`으로 자동 붙으므로 라벨·Milestone을 만들 권한은 필요하지 않습니다.
- Figma 접근이 늦어지면 `docs/design-reference.md`와 `docs/wbs/20-token.md`만으로 `status: draft`까지 쓸 수 있습니다. Figma 확인이 필요한 칸은 "미확인" 절에 남기고, Figma를 본 뒤 `review`로 올립니다.

## 개발 환경

Node 24(`.nvmrc`)와 npm을 씁니다.

```bash
git config core.hooksPath .githooks   # 커밋 메시지 훅 활성화 (클론 후 1회)
npm ci
npm run build                          # tokens/ + src/ → dist/ (토큰, 컴포넌트 JS·타입·CSS)
npm run typecheck                      # tsc --noEmit
npm test                               # Vitest (한 번 실행)
npm run storybook                      # Storybook 개발 서버 (6006)
npm run build-storybook                # Storybook 정적 빌드 → storybook-static/ (커밋하지 않음)
```

명세(`components/`, `patterns/`)만 고치는 작업은 `npm ci`·빌드가 필요 없습니다.

## 토큰 변경

1. `tokens/**/*.json`을 수정합니다.
2. `npm run build`로 `dist/`를 다시 만듭니다.
3. `tokens/`와 `dist/`를 같은 커밋에 넣습니다.

CI `Tokens Build`는 커밋된 `dist/`가 빌드 결과와 다르면 실패합니다. `dist/`는 직접 고치지 않습니다.

## 브랜치

- `dev` → `main` 모델입니다. 기능 PR의 base는 `dev`입니다.
- `dev`·`main`에 직접 push하지 않습니다. 서버가 막지 않으므로 사람이 지킵니다.
- 브랜치 이름은 `type/이슈번호-짧은-설명`입니다. type은 커밋 type과 같습니다. (예: `docs/52-component-button`)
- base가 `main`이면 워크플로가 경고 코멘트를 남깁니다. (`hotfix/*`, `release/*`, `dev` → `main`은 예외)
- 머지는 merge commit으로 합니다.

## 이슈 / PR

- 제목은 `[Type] 내용` 양식입니다. 티켓이 있으면 티켓 키를 앞에 둡니다. (예: `[Docs] COMPONENT-01 button 명세`)
- 허용 Type: `[Feat]` `[Fix]` `[Docs]` `[Style]` `[Refactor]` `[Test]` `[Chore]` `[Hotfix]`
- `[Hotfix]`는 PR 제목·`hotfix/*` 브랜치에만 씁니다. 커밋 훅에는 `hotfix` type이 없으므로 커밋 메시지는 `fix: 설명 (#번호)`로 씁니다.
- 작업 기준은 노션 WBS([`docs/wbs/`](./docs/wbs)는 사본)이고, GitHub 이슈는 노션 티켓과 1:1입니다.
- 이슈·Milestone은 디자인 시스템 리드가 Phase를 시작할 때 그 Phase 것만 만들고 담당자를 배정합니다. 명세 담당과 AI 도구는 이슈·Milestone·라벨을 만들지 않습니다.
- 배정받은 이슈 번호를 커밋 메시지 `(#번호)`, PR 본문 `Issue Number`, 브랜치 이름에 씁니다. 번호가 없으면 커밋하지 말고 디자인 시스템 리드에게 요청합니다.
- `components/`·`patterns/` 명세 추가·수정은 `docs`(제목 `[Docs]`)입니다. 토큰 이름·값이 함께 바뀌면 그 부분은 `feat`/`fix`로 따로 커밋합니다.

### 리뷰와 머지

- 리뷰어는 PR 작성자가 직접 지정합니다. 후보는 `2nd-frontend` 팀원(작성자 제외)이고, 없으면 디자인 시스템 리드가 리뷰어가 됩니다.
- 명세 PR은 작성자가 아닌 리뷰어 1명 이상의 승인(Approve)을 받은 뒤 머지합니다. 서버는 승인·CI 통과 없이도 머지할 수 있게 열려 있습니다. 작성자가 승인과 CI 통과를 확인한 뒤 직접 머지합니다.
- 영업일 2일 안에 리뷰어가 없으면 작성자가 CodeRabbit(자동 리뷰 도구) 코멘트를 해소하고 아래 "명세 PR 점검"을 PR 본문에 적습니다. 이 경우 `status: review`까지만 올려 머지할 수 있습니다.
- `stable`은 작성자가 아닌 사람의 승인 없이 올리지 않습니다.
- GitHub의 draft PR은 CodeRabbit이 리뷰하지 않으므로 명세 검토 목적에는 쓰지 않습니다. 명세의 `status: draft`와는 다른 것입니다.

### 컴포넌트 PR 점검

PR 본문 "상세 내용"에 아래를 확인했다고 적습니다.

- [ ] 명세 `components/<id>.md`의 Variants·States·Behavior·Accessibility 절을 모두 구현했다(구현하지 않은 항목은 이유).
- [ ] 값은 `var(--boaz-*)` 토큰 변수로만 썼다(명세의 `raw:` 값 제외).
- [ ] 상태 조합별 story가 있고 Storybook 접근성 패널 위반이 없다.
- [ ] 키보드·aria 동작 테스트가 있고 `npm test`가 통과했다.
- [ ] `npm run build` 후 `dist/`를 같은 커밋에 넣었다.
- [ ] 티켓의 "완료 확인 방법" 항목을 하나씩 대조했다.
- [ ] `docs/wbs/00-wbs.md`의 티켓 상태를 `완료(#이슈번호)`로 바꿨다.

### 명세 PR 점검

PR 본문 "상세 내용"에 아래를 확인했다고 적습니다.

- [ ] `components/_template.md`의 절이 모두 있다(해당 없는 절은 "해당 없음"과 이유).
- [ ] 쓴 토큰 이름이 모두 `tokens/`에 있다(`dist/tokens.d.ts`와 대조). CI `Tokens Build`가 통과했다.
- [ ] Figma에 없는 상태·값에 `Figma 없음(추정)`을 표시했다.
- [ ] 글자·배경 조합의 대비를 계산해 근거를 적었다(본문 4.5:1, 큰 글자·UI 3:1).
- [ ] 티켓의 "완료 확인 방법" 항목을 하나씩 대조했다.
- [ ] Figma 링크·캡처·개인 정보가 없다(노드 ID만 적는다).
- [ ] `docs/wbs/00-wbs.md`의 티켓 상태를 `완료(#이슈번호)`로 바꿨다. 이 변경은 명세 PR에 같이 넣는다.

### 머지 후

1. 이슈가 닫혔는지, 작업 정의서(`docs/wbs/30-component.md` 등)의 "GitHub 이슈" 칸에 번호가 있는지 확인합니다.
2. 노션 티켓 상태를 완료로 바꾸고 PR 링크를 적습니다. 노션 편집 권한이 없으면 디자인 시스템 리드에게 요청합니다.
3. `docs/wbs/00-wbs.md`의 티켓 상태가 `완료(#이슈번호)`인지 확인합니다. 빠졌으면 별도 PR로 넣습니다. 노션을 먼저 고치고 사본을 맞춥니다.

## 커밋 메시지

`type: 내용 (#이슈번호)` 양식을 훅이 강제합니다. (예: `feat: color 토큰 추가 (#2)`)

- 허용 type(소문자): `feat` `fix` `docs` `style` `refactor` `test` `chore`
- 끝에 `(#이슈번호)`가 없으면 커밋이 거부됩니다. `--no-verify`는 쓰지 않습니다.
- 토큰 **값** 변경은 `feat`/`fix`입니다. `style`은 포맷·공백 변경에만 씁니다.

## 언어

커밋 메시지·문서·PR 설명은 한국어, 토큰 이름·식별자는 영어로 씁니다.

## 라이선스

기여한 내용은 [Apache-2.0](./LICENSE)으로 배포됩니다.
