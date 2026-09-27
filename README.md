# BOAZ Design System

BOAZ 공개 홈페이지와 관리자 콘솔이 함께 쓰는 디자인 언어입니다. 색·타이포·간격 같은 디자인 토큰과 컴포넌트·패턴 명세를 한곳에서 관리하고, 두 앱에 CSS 변수와 Tailwind 테마로 전달합니다.

## 구성

### 원천

- [`tokens/`](./tokens) — 디자인 토큰 (DTCG JSON)
- `components/` — 컴포넌트 명세 (Markdown, 작성 예정)
- `patterns/` — 패턴·가이드라인 (Markdown, 작성 예정)

### 생성물

- [`dist/tokens.css`](./dist/tokens.css) — `:root`의 CSS 변수 (`--boaz-*`)
- [`dist/tokens.ts`](./dist/tokens.ts) — CSS 변수 참조 객체 (Vanilla Extract 등)
- [`dist/tailwind-theme.css`](./dist/tailwind-theme.css) — Tailwind v4 `@theme` 별칭

### 문서

- [`docs/wbs/`](./docs/wbs) — 구축 계획 (WBS·명세서)
- [`AGENTS.md`](./AGENTS.md) — 토큰 이름 규칙, 작업 절차, breaking 변경 규칙
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — 개발 환경, 협업 규약

## 사용

git 태그로 설치합니다.

```bash
npm install github:BOAZ-website/design-system#v0.1.0
```

```css
@import "@boaz/design-system/tokens.css";          /* CSS 변수 */
@import "@boaz/design-system/tailwind-theme.css";  /* Tailwind v4 (tokens.css 포함) */
```

```ts
import { vars } from '@boaz/design-system/tokens';

vars.color.palette.purple[100]; // "var(--boaz-color-palette-purple-100)"
```

## License

[Apache-2.0](./LICENSE)
