# Contributing

BOAZ Design System에 기여하는 방법입니다. 토큰 이름 규칙과 breaking 변경 규칙은 [`AGENTS.md`](./AGENTS.md)를 따릅니다.

## 개발 환경

Node 24(`.nvmrc`)와 npm을 씁니다.

```bash
git config core.hooksPath .githooks   # 커밋 메시지 훅 활성화 (클론 후 1회)
npm ci
npm run build                          # tokens/ → dist/
```

## 토큰 변경

1. `tokens/**/*.json`을 수정합니다.
2. `npm run build`로 `dist/`를 다시 만듭니다.
3. `tokens/`와 `dist/`를 같은 커밋에 넣습니다.

CI `Tokens Build`는 커밋된 `dist/`가 빌드 결과와 다르면 실패합니다. `dist/`는 직접 고치지 않습니다.

## 브랜치

- `dev` → `main` 모델입니다. 기능 PR의 base는 `dev`입니다.
- base가 `main`이면 워크플로가 경고 코멘트를 남깁니다. (`hotfix/*`, `release/*`, `dev` → `main`은 예외)
- 머지는 merge commit으로 합니다.

## 이슈 / PR

- 제목은 `[Type] 내용` 양식입니다. (예: `[Feat] color 토큰 추가`)
- 허용 Type: `[Feat]` `[Fix]` `[Docs]` `[Style]` `[Refactor]` `[Test]` `[Chore]` `[Hotfix]`
- 리뷰어는 PR 담당자가 직접 지정합니다.
- 작업 기준은 노션 WBS([`docs/wbs/`](./docs/wbs)는 사본)이고, GitHub 이슈는 노션 티켓과 1:1입니다. Milestone과 이슈는 Phase를 시작할 때 그 Phase 것만 만듭니다.

## 커밋 메시지

`type: 내용 (#이슈번호)` 양식을 훅이 강제합니다. (예: `feat: color 토큰 추가 (#2)`)

- 허용 type(소문자): `feat` `fix` `docs` `style` `refactor` `test` `chore`
- 끝에 `(#이슈번호)`가 없으면 커밋이 거부됩니다. `--no-verify`는 쓰지 않습니다.
- 토큰 **값** 변경은 `feat`/`fix`입니다. `style`은 포맷·공백 변경에만 씁니다.

## 언어

커밋 메시지·문서·PR 설명은 한국어, 토큰 이름·식별자는 영어로 씁니다.

## 라이선스

기여한 내용은 [Apache-2.0](./LICENSE)으로 배포됩니다.
