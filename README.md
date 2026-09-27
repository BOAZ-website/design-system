# BOAZ Design System

BOAZ 공개 홈페이지(`frontend`)와 관리자 콘솔(`frontend_admin`)이 함께 쓰는 **디자인 토큰**과 **컴포넌트·패턴 명세**의 단일 원천입니다.

- 토큰은 DTCG JSON(`tokens/`)으로 정의하고, Style Dictionary로 CSS 변수·TS·Tailwind 테마(`dist/`)를 생성합니다.
- 컴포넌트 코드는 두지 않습니다. 두 앱은 스타일 방식(Vanilla Extract / Tailwind + shadcn)이 달라 **파운데이션만 공유**합니다.
- 레퍼런스: [daangn/seed-design](https://github.com/daangn/seed-design)

## 구조

```text
design-system/
├── tokens/        # 원천: DTCG JSON (color, typography, radius …)
├── components/    # 컴포넌트 명세 (Markdown)
├── patterns/      # 패턴·가이드라인 (feedback, form, accessibility, voice-and-tone)
├── build/         # Style Dictionary 빌드 스크립트
└── dist/          # 생성물 (커밋 대상, 직접 수정 금지)
    ├── tokens.css          # :root { --boaz-* }
    ├── tokens.ts           # var() 참조 객체
    └── tailwind-theme.css  # Tailwind v4 @theme inline 별칭
```

## 개발

Node 24(`.nvmrc`), npm을 씁니다.

```bash
git config core.hooksPath .githooks   # 커밋 메시지 훅 활성화 (클론 후 1회)
npm ci
npm run build                          # tokens/ → dist/
```

`tokens/`를 바꾸면 반드시 `npm run build` 후 `dist/`를 함께 커밋합니다. CI(`Tokens Build`)가 `dist/`와 빌드 결과가 다르면 실패시킵니다.

## 사용 (소비 앱)

npm 배포 없이 git 태그로 설치합니다.

```bash
npm install github:BOAZ-website/design-system#v0.1.0
# pnpm add github:BOAZ-website/design-system#v0.1.0
```

```css
/* CSS 변수 */
@import "@boaz/design-system/tokens.css";

/* Tailwind v4 (tokens.css 포함) */
@import "@boaz/design-system/tailwind-theme.css";
```

```ts
import { vars } from '@boaz/design-system/tokens';
vars.color.palette.purple[100]; // "var(--boaz-color-palette-purple-100)"
```

## 협업 규약

BOAZ 공통 규약을 따릅니다.

### 브랜치

- `dev` → `main` 모델. 기능 PR의 base는 `dev`입니다.
- base가 `main`이면 워크플로가 경고 코멘트를 남깁니다. (`hotfix/*`, `release/*`, `dev` → `main`은 예외)
- 서버 쪽 브랜치 규칙(ruleset)은 두지 않습니다. 변경은 PR로 올리고, CI `Tokens Build`가 통과한 뒤 merge commit으로 머지합니다.
- 리뷰어는 PR 담당자(assignee)가 직접 지정합니다. 자동 지정(CODEOWNERS)은 쓰지 않습니다.

### 이슈 / PR 제목

`[Type] 내용` 양식을 사용합니다. (예: `[Feat] color 토큰 추가`)

- 허용 Type: `[Feat]` `[Fix]` `[Docs]` `[Style]` `[Refactor]` `[Test]` `[Chore]` `[Hotfix]`

### Milestone / 이슈 생성

작업 기준은 노션 WBS이고, GitHub 이슈는 노션 티켓과 1:1입니다. Milestone과 이슈는 Phase를 시작할 때 그 Phase 것만 만듭니다.

### 커밋 메시지

`type: 내용 (#이슈번호)` 양식을 훅이 강제합니다. (예: `feat: color 토큰 추가 (#2)`)

- 허용 type(소문자): `feat fix docs style refactor test chore`
- 끝에 `(#이슈번호)`가 없으면 커밋이 거부됩니다. `--no-verify`는 지양합니다.
- 토큰 **값** 변경은 `style`이 아니라 `feat`/`fix`로 씁니다. `style`은 포맷·공백 변경에만 씁니다.

### 언어

- 커밋 메시지·문서·PR 설명은 **한국어**, 토큰 이름·식별자는 **영어**

## 라이선스

[Apache-2.0](LICENSE)
