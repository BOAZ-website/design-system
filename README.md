# BOAZ Design System

BOAZ 공개 홈페이지와 관리자 콘솔이 함께 쓰는 디자인 언어입니다. 디자인 토큰과 컴포넌트·패턴 명세를 단일 원천(Single Source of Truth)으로 관리하고, Style Dictionary로 빌드해 CSS 변수와 Tailwind 테마로 배포합니다.

## Architecture

```text
tokens/ (DTCG JSON)  ──  npm run build  ──▶  dist/ (build artifacts)
                                              ├── tokens.css          CSS 변수 --boaz-*
                                              ├── tokens.ts           CSS 변수 참조 객체
                                              └── tailwind-theme.css  Tailwind v4 @theme
```

## Foundations

- [`tokens/`](./tokens) — Primitive(팔레트)·Semantic 토큰. 색, 타이포그래피, radius, spacing

## Components & Patterns

- `components/` — 컴포넌트 명세 (작성 예정)
- `patterns/` — 패턴·가이드라인: feedback, form, accessibility, voice & tone (작성 예정)

## Installation

git 태그로 설치합니다.

```bash
npm install github:BOAZ-website/design-system#v0.1.0
```

## Usage

```css
@import "@boaz/design-system/tokens.css";          /* CSS 변수 */
@import "@boaz/design-system/tailwind-theme.css";  /* Tailwind v4 (tokens.css 포함) */
```

```ts
import { vars } from '@boaz/design-system/tokens';

vars.color.palette.purple[100]; // "var(--boaz-color-palette-purple-100)"
```

## Documentation

- [`docs/wbs/`](./docs/wbs) — 구축 로드맵 (WBS·명세서)
- [`AGENTS.md`](./AGENTS.md) — 토큰 명명 규칙, 작업 절차, breaking change 정책
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — 개발 환경, 협업 규약

## License

[Apache-2.0](./LICENSE)
