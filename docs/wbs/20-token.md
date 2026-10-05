# TOKEN 파운데이션 명세서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- Figma에 등록된 색 스타일 17종·텍스트 스타일 12종을 DTCG 토큰으로 옮김
- 팔레트 → 시맨틱 2계층으로 두고, 앱은 시맨틱을 우선 참조하게 함
- Figma에 없거나 Figma 안에서 서로 다른 값(radius, spacing, focus, 모바일 타이포)은 기능 행에 근거를 적고 정한 값을 씀

**범위:** `tokens/**/*.json`, `build/build.mjs`, `dist/` 4종(`tokens.css`, `tokens.js`, `tokens.d.ts`, `tailwind-theme.css`)
**범위 밖:** z-index·breakpoint·glass(Figma에 대응 개념 없음, 앱 로컬 유지), 라이트 모드 시맨틱(관리자 콘솔은 팔레트만 사용), elevation·motion(근거 없음, 필요할 때 추가)

### Figma 원본 값

| Figma 색 스타일 | 값 | 토큰 경로 |
| --- | --- | --- |
| Primary-Purple | #7A64F9 | `color.palette.purple.100` |
| Primary-subtle-Purple | #6250C7 | `color.palette.purple.200` |
| Primary-hover-Purple | #493C95 | `color.palette.purple.300` |
| Primary-press-Purple | #2C2459 | `color.palette.purple.400`(신규) |
| Sub-Lightblue | #68CBEC | `color.palette.lightblue.100` |
| White · Gray100~950 · Black | #FFFFFF, #E6E6E6, #CCCCCC, #B3B3B3, #999999, #666666, #333333, #1A1A1A, #0D0D0D, #000000 | `color.palette.gray.{0,100,200,300,400,600,800,900,950,1000}` |
| Error-Red · Error-bg-Red | #F96466, #190A0A | `color.palette.red.{100,900}` |

| Figma 텍스트 스타일 | 크기 | 굵기 | 행간 |
| --- | --- | --- | --- |
| Display | 72 | 700 | 100% |
| Headline1-Bold | 40 | 700 | 100% |
| Headline 2 | 30 | 700 | 100% |
| Headline 3 | 24 | 700 | 100% |
| Body 1 | 24 | 400 | 100% |
| Body 2 | 20 | 700 | 100% |
| Body2 - Regular | 20 | 400 | 100% |
| Body 3 | 18 | 700 | 100% |
| Body 4 | 18 | 400 | 100% |
| Body 4 - Paragraph | 18 | 400 | 30px |
| Body 5 | 16 | 400 | 100% |
| Text 1 | 14 | 300 | 100% |

- 글꼴은 모두 Pretendard, 자간 0
- Figma 11단계 색 스케일(FE 회의용 페이지)은 스타일로 등록되지 않은 초안이라 팔레트에 넣지 않음
- 다크 pill hover #2A2647은 스타일이 아닌 로컬 값이라 팔레트에 넣지 않음

---

## TOKEN-01 팔레트 토큰 확정

**목적:** Figma 색 스타일 17종과 팔레트 토큰을 1:1로 맞춤

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-01-01 | `color.palette.purple.400` = #2C2459 추가 | `dist/tokens.css`에 `--boaz-color-palette-purple-400: #2c2459` |
| TOKEN-01-02 | 토큰마다 `$description`에 Figma 스타일 이름 기재 | `grep -c '\$description' tokens/color/palette.json` = 17 |
| TOKEN-01-03 | Figma 스타일 17종과 토큰 17개가 모두 대응 | `grep -c '\$value' tokens/color/palette.json` = 17 |
| TOKEN-01-04 | 이름을 AGENTS.md 규칙(step은 숫자, 클수록 어두움)에 맞춤: `gray.white` → `gray.0`, `gray.black` → `gray.1000`, `red.200` → `red.900`(#190A0A는 gray 900대 어둡기). v0.1.0 태그 전이라 소비 앱 영향 없음 | `dist/tokens.css`에 `-gray-white`·`-gray-black`·`-red-200` 없음 |

## TOKEN-02 타이포 토큰 12종

**목적:** Figma 텍스트 스타일 12종을 토큰으로 옮김

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-02-01 | 원시 스케일: `font.size.*`, `font.weight.*`, `font.line-height.*`, `font.family.base`(Pretendard) | `tokens/typography.json` |
| TOKEN-02-02 | 12종을 `typography.{display, headline-1, headline-2, headline-3, body-1, body-2, body-2-regular, body-3, body-4, body-4-paragraph, body-5, text-1}.{size,weight,line-height}`로 정의하고 원시 스케일을 참조 | `grep -c -- '--boaz-typography-' dist/tokens.css` = 45(데스크톱 12종 + TOKEN-02-06 모바일 3종, 각 3개) |
| TOKEN-02-03 | DTCG 복합 `typography` 타입은 쓰지 않음(Style Dictionary css 변환이 `font` 단축 문자열로 합치고 자간을 버림) | 토큰 파일에 `"$type": "typography"` 없음 |
| TOKEN-02-04 | 크기·행간·spacing·radius 단위는 px. rem을 쓰지 않는 이유: 두 앱의 루트 글꼴 기준이 달라(frontend `html 62.5%`로 1rem = 10px, frontend_admin `html 14px`) 같은 rem 값이 다른 크기로 렌더됨. 브라우저 확대는 px에도 적용되므로 확대 기능은 유지됨. 이 결정을 README 사용 절에 명시 | `dist/tokens.css`의 size·line-height·spacing·radius 값이 모두 px |
| TOKEN-02-05 | 코드 전용 17종(8·10·12·22·28·32·36·38·80px, 굵기 500·600 등)은 토큰에 넣지 않음. 앱 로컬 예외로 두고 화면을 고칠 때 12종으로 옮김 | 토큰에 데스크톱 12종 + 모바일 3종(TOKEN-02-06)만 존재 |
| TOKEN-02-06 | 모바일 전용 3종: `typography.body-2-mobile`(16, 600), `typography.body-4-mobile`(15, 400), `typography.text-1-mobile`(12, 300). 나머지는 데스크톱과 같음. 근거: Figma 모바일 버튼·텍스트필드·카드 실측(7064:14053, 7578:14642, 7091:10966). 600은 Figma 정식 스타일이 아니지만 모바일 버튼에 일관되게 쓰임 | `dist/tokens.css`에 `-mobile` 토큰 3종 |

## TOKEN-03 radius 토큰

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-03-01 | `radius.sm` 12(사각 버튼·입력), `radius.md` 20(태그·카드·소형 버튼), `radius.full` 40(pill) | `dist/tokens.css`의 `--boaz-radius-*` 3개 |
| TOKEN-03-02 | Figma 실측 근거를 `$description`에 기재(Radius 시트 1728:3710의 12·20·40. 흰 250 버튼의 10은 다른 사각 버튼·Radius 시트와 달라 12로 통일, 카드 라벨 "24 (20)"은 실측 20) | `tokens/radius.json` |
| TOKEN-03-03 | Tailwind 출력 `--radius-boaz-*` | `dist/tailwind-theme.css` |

## TOKEN-04 spacing 토큰

**목적:** Figma에 체계가 없는 간격(패딩 33·21, 28·20, 47·13 등)을 4px 배수 스케일로 정함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-04-01 | `spacing.{1,2,3,4,5,6,8,10,12,16}` = 4·8·12·16·20·24·32·40·48·64px(단위는 TOKEN-02-04와 같이 px) | `dist/tokens.css`의 `--boaz-spacing-*` 10개 |
| TOKEN-04-02 | Figma 실측값과 가장 가까운 단계 대응표를 이 문서의 TOKEN-04 절 아래에 "실측 → 단계" 표로 기재. 거리가 같으면 작은 단계를 택함. 근거: Figma 패딩이 33·21, 28·20, 47·13 등 체계 없이 쓰여 가장 가까운 4px 단계로 맞춤(8px 배수는 12·20을 표현하지 못함) | 이 문서 TOKEN-04 절에 "실측 → 단계" 표 존재 |

## TOKEN-05 시맨틱 색 토큰

**목적:** 앱이 용도 이름으로 색을 쓰게 함. 다크 테마 전용

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | TOKEN-01 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-05-01 | 배경: `bg.canvas`(gray 1000), `bg.layer`(gray 900), `bg.surface-inverse`(gray 0, 모달), `bg.brand-solid`·`-hover`·`-press`(purple 100·300·400), `bg.neutral-solid`·`-hover`·`-press`(gray 0·400·600), `bg.disabled`(gray 600) | `tokens/color/semantic.json` |
| TOKEN-05-02 | 글자: `fg.default`(gray 0), `fg.neutral`(gray 200), `fg.muted`(gray 400), `fg.disabled`(gray 400), `fg.on-brand`(gray 0), `fg.on-inverse`(gray 1000), `fg.brand`(purple 100), `fg.accent`(lightblue 100), `fg.critical`(red 100). `fg.muted`와 `fg.disabled`는 값이 같으므로 비활성 상태는 색이 아니라 `disabled` 속성으로 구분함(PATTERN-03-03) | 같은 파일 |
| TOKEN-05-03 | 선: `stroke.neutral`(gray 400), `stroke.weak`(gray 800), `stroke.brand`(purple 100), `stroke.focus`(lightblue 100. 검정 캔버스 위 포커스 링용. 보라 버튼 위 보라 outline은 대비 1:1이라 쓰지 않음), `stroke.focus-inverse`(purple 100. 흰 표면(`bg.surface-inverse`) 위 포커스 링용. lightblue는 흰색 위 1.85:1로 보이지 않음), `stroke.critical`(red 100) | 같은 파일 |
| TOKEN-05-04 | 모든 시맨틱은 팔레트 참조(hex 직접 기재 없음), `tokens.css`에 `var()` 참조로 출력 | `--boaz-color-bg-brand-solid: var(--boaz-color-palette-purple-100)` |
| TOKEN-05-05 | 아래 "대비표"의 조합이 실제 토큰 값과 일치하는지 확인하고, 시맨틱 토큰을 추가·변경할 때 표를 함께 고침 | 대비표의 모든 행이 `tokens/color/semantic.json`의 값과 일치 |
| TOKEN-05-06 | 브랜드 색은 Figma `Primary-Purple`(보라). 로고의 파랑은 로고 파일 전용이라 토큰으로 두지 않음(Figma의 "블루계열(보아즈 공식 색상)" 메모는 무드보드 단계 레퍼런스 설명) | `color.bg.brand-solid`가 purple 100 참조 |

### 대비표(WCAG 2.2 AA)

기준: 본문 글자 4.5:1, 큰 글자(Bold 18.67px 이상 또는 Regular 24px 이상)·UI 요소·포커스 링 3:1. 비활성 요소는 WCAG 적용 제외. 2026-10-05 계산.

| 전경 | 배경 | 대비 | 판정 | 사용 규칙 |
| --- | --- | --- | --- | --- |
| `fg.default` #FFFFFF | `bg.canvas` #000000 | 21.00 | 통과 | 제한 없음 |
| `fg.neutral` #CCCCCC | `bg.layer` #1A1A1A | 10.84 | 통과 | 제한 없음 |
| `fg.muted` #999999 | `bg.layer` #1A1A1A | 6.11 | 통과 | 제한 없음 |
| `fg.muted` #999999 | `bg.canvas` #000000 | 7.37 | 통과 | 제한 없음 |
| `fg.brand` #7A64F9 | `bg.layer` #1A1A1A | 4.16 | 큰 글자만 통과 | 큰 글자 전용 |
| `fg.brand` #7A64F9 | `bg.canvas` #000000 | 5.02 | 통과 | 제한 없음(text-field 라벨 14px 포함) |
| `fg.critical` #F96466 | `bg.layer` #1A1A1A | 5.84 | 통과 | 제한 없음 |
| `fg.on-brand` #FFFFFF | `bg.brand-solid` #7A64F9 | 4.18 | 큰 글자만 통과 | 보라 버튼 글자는 Bold 18.67px 이상. Body 3(18 Bold)은 0.5px 부족하므로 버튼 글자는 Body 2(20 Bold)를 씀. COMPONENT-01-03에 반영 |
| `fg.on-brand` #FFFFFF | `bg.brand-solid-hover` #493C95 | 8.88 | 통과 | 제한 없음 |
| `fg.muted` #999999 | `bg.brand-solid-press` #2C2459 | 4.90 | 통과 | 보라 버튼 press 글자 |
| `fg.on-inverse` #000000 | `bg.neutral-solid` #FFFFFF | 21.00 | 통과 | 제한 없음 |
| `fg.on-inverse` #000000 | `bg.neutral-solid-hover` #999999 | 7.37 | 통과 | 제한 없음 |
| `fg.on-inverse` #000000 | `bg.neutral-solid-press` #666666 | 3.66 | 큰 글자만 통과 | 일시 상태(누르는 동안). Figma 값 유지 |
| `fg.disabled` #999999 | `bg.disabled` #666666 | 2.02 | 적용 제외 | 비활성. 기록용 |
| `stroke.focus` #68CBEC | `bg.canvas` #000000 | 11.34 | 통과 | 포커스 링은 offset 2px로 캔버스 위에 놓임 |
| `stroke.focus` #68CBEC | `bg.brand-solid` #7A64F9 | 2.26 | 미달 | 보라 버튼 안쪽에 링을 그리지 않음(offset 2px 필수) |
| `stroke.focus` #68CBEC | `bg.surface-inverse` #FFFFFF | 1.85 | 미달 | 흰 표면 위에서는 `stroke.focus-inverse` 사용 |
| `stroke.focus-inverse` #7A64F9 | `bg.surface-inverse` #FFFFFF | 4.18 | 통과 | 모달 안 버튼 포커스 링 |
| 모달 설명 글자 #666666 | `bg.surface-inverse` #FFFFFF | 5.74 | 통과 | COMPONENT-07-01 |
| `stroke.weak` #333333 | `bg.layer` #1A1A1A | 1.38 | 장식 | 카드 경계를 보더에만 의존하지 않음(배경색 차이로 구분) |

## TOKEN-06 빌드 보강

**목적:** 타이포·spacing을 세 가지 출력에 모두 내보내고, 소비 앱이 그대로 import할 수 있는 형식으로 맞춤

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | TOKEN-02, TOKEN-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-06-01 | `tailwind-theme.css` 출력 규칙. 색 `color.*` → `--color-boaz-*`, radius → `--radius-boaz-*`, spacing → `--spacing-boaz-*`. 타이포는 경로를 그대로 잇지 않고 다음과 같이 바꿔 씀: `typography.{style}.size` → `--text-boaz-{style}`, `typography.{style}.line-height` → `--text-boaz-{style}--line-height`, `typography.{style}.weight` → `--text-boaz-{style}--font-weight`(Body 2와 Body2 - Regular처럼 크기가 같고 굵기만 다른 스타일을 유틸 하나로 구분하기 위함). `font.family.base` → `--font-boaz-base`. 원시 스케일 `font.size.*`·`font.weight.*`·`font.line-height.*`는 Tailwind에 내보내지 않음 | `grep -- '--text-boaz-body-3:' dist/tailwind-theme.css`, `grep -- '--text-boaz-body-3--line-height' dist/tailwind-theme.css`, `grep -- '--text-boaz-body-3--font-weight' dist/tailwind-theme.css` 모두 1건 |
| TOKEN-06-02 | `tokens.js`(ESM)와 `tokens.d.ts`를 출력하고 `package.json`의 `exports["./tokens"]`를 `{ "types": "./dist/tokens.d.ts", "default": "./dist/tokens.js" }`로 바꿈. `vars` 객체에 모든 토큰의 `var()` 참조를 담음. 이유: Node는 `node_modules` 안의 `.ts` 파일을 import하지 못함(`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`). frontend의 Vanilla Extract 컴파일러가 `theme.css.ts`에서 이 모듈을 Node로 평가하므로 `.ts` 그대로는 쓸 수 없음. 기존 `dist/tokens.ts`는 삭제(v0.1.0 전이라 breaking 아님) | `node -e "import('./dist/tokens.js').then(m => console.log(m.vars.typography['headline-3'].size))"`가 `var(--boaz-typography-headline-3-size)` 출력, `dist/tokens.d.ts` 존재 |
| TOKEN-06-03 | 참조 깨짐·중복 이름이 있으면 빌드 실패. Style Dictionary 기본값은 중복 이름을 경고만 내고 나중 값으로 덮어쓰므로, 빌드 설정에 경고를 오류로 올리는 옵션(`log: { warnings: 'error' }`)을 둠 | 잘못된 참조를 넣으면 `npm run build` 실패. 같은 이름 토큰을 두 파일에 넣으면 `npm run build` 실패 |
