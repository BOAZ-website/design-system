# TOKEN 파운데이션 작업 정의서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 작업 정의서 목적

- Figma에 등록된 색 스타일 17종·텍스트 스타일 13종을 DTCG 토큰으로 옮김
- 팔레트 → 시맨틱 2계층으로 두고, 앱은 시맨틱을 우선 참조하게 함
- Figma에 없거나 Figma 안에서 서로 다른 값(radius, spacing, focus, 모바일 타이포)은 기능 행에 근거를 적고 정한 값을 씀

**범위:** `tokens/**/*.json`, `build/build.mjs`, `dist/` 4종(`tokens.css`, `tokens.js`, `tokens.d.ts`, `tailwind-theme.css`)
**범위 밖:** z-index·breakpoint·glass(Figma에 대응 개념 없음, 앱 로컬 유지), 라이트 모드 시맨틱(Figma에 관리자 콘솔 디자인이 없음. 관리자 콘솔은 팔레트 토큰을 CSS 변수로 참조하고(2026-10-21 정정, 이전에는 값을 복사하기로 했었음), Figma에 없는 값 7개는 `frontend_admin`의 `theme.css`에 임시로 둠. ADOPT-05), elevation·motion(근거 없음, 필요할 때 추가)

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
| Headline1-Semibold | 40 | 600 | 100% |
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
- 행간 "100%"는 Figma 표기임. 토큰 행간은 TOKEN-02 "행간 규칙" 표가 기준
- Figma 11단계 색 스케일(FE 회의용 페이지)은 스타일로 등록되지 않은 초안이라 팔레트에 넣지 않음
- 다크 pill hover #2A2647은 스타일이 아닌 로컬 값이라 팔레트에 넣지 않음

---

## TOKEN-01 팔레트 토큰 확정

**목적:** Figma 색 스타일 17종과 팔레트 토큰을 1:1로 맞춤

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-04 | 1 | #29 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-01-01 | `color.palette.purple.400` = #2C2459 추가 | `dist/tokens.css`에 `--boaz-color-palette-purple-400: #2c2459` |
| TOKEN-01-02 | 토큰마다 `$description`에 Figma 스타일 이름 기재 | `grep -c '\$description' tokens/color/palette.json` = 17 |
| TOKEN-01-03 | Figma 스타일 17종과 토큰 17개가 모두 대응 | `grep -c '\$value' tokens/color/palette.json` = 17 |
| TOKEN-01-04 | 이름을 AGENTS.md 규칙(step은 숫자, 클수록 어두움)에 맞춤: `gray.white` → `gray.0`, `gray.black` → `gray.1000`, `red.200` → `red.900`(#190A0A는 gray 900대 어둡기). v0.1.0 태그 전이라 소비 앱 영향 없음 | `dist/tokens.css`에 `-gray-white`·`-gray-black`·`-red-200` 없음 |

## TOKEN-02 타이포 토큰

**목적:** Figma 텍스트 스타일 13종과 모바일 전용 3종을 토큰으로 옮김

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-04 | 1 | #30 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-02-01 | 원시 스케일: `font.size.*`, `font.weight.*`, `font.line-height.*`, `font.family.base`(Pretendard) | `tokens/typography.json` |
| TOKEN-02-02 | 13종을 `typography.{display, headline-1, headline-1-semibold, headline-2, headline-3, body-1, body-2, body-2-regular, body-3, body-4, body-4-paragraph, body-5, text-1}.{size,weight,line-height}`로 정의하고 원시 스케일을 참조 | `grep -c -- '--boaz-typography-' dist/tokens.css` = 48(데스크톱 13종 + TOKEN-02-06 모바일 3종, 각 3개) |
| TOKEN-02-03 | DTCG 복합 `typography` 타입은 쓰지 않음(Style Dictionary css 변환이 `font` 단축 문자열로 합치고 자간을 버림) | 토큰 파일에 `"$type": "typography"` 없음 |
| TOKEN-02-04 | 크기·행간·spacing·radius 단위는 px. rem을 쓰지 않는 이유: 두 앱의 루트 글꼴 기준이 달라(frontend `html 62.5%`로 1rem = 10px, frontend_admin `html 14px`) 같은 rem 값이 다른 크기로 렌더됨. 브라우저 확대는 px에도 적용되므로 확대 기능은 유지됨. 이 결정을 README 사용 절에 명시 | `dist/tokens.css`의 size·line-height·spacing·radius 값이 모두 px |
| TOKEN-02-05 | 코드 전용 17종(8·10·12·22·28·32·36·38·80px, 굵기 500 등)은 토큰에 넣지 않음. 앱 로컬 예외로 두고 화면을 고칠 때 토큰 스타일로 옮김 | 토큰에 데스크톱 13종 + 모바일 3종(TOKEN-02-06)만 존재 |
| TOKEN-02-06 | 모바일 전용 3종: `typography.body-2-mobile`(16, 600), `typography.body-4-mobile`(15, 400), `typography.text-1-mobile`(12, 300). 나머지는 데스크톱과 같음. 근거: Figma 모바일 버튼·텍스트필드·카드 실측(7064:14053, 7578:14642, 7091:10966). 16/600 조합은 Figma 텍스트 스타일로 등록되어 있지 않지만 모바일 버튼에 일관되게 쓰임 | `dist/tokens.css`에 `-mobile` 토큰 3종 |

### 행간 규칙(2026-10-11 결정)

- Figma 텍스트 스타일의 "100%"는 글자 크기와 같은 행간이 아니라 Auto(폰트가 정한 높이)임. 텍스트 레이어 높이가 글자 크기의 약 1.2배로 측정됨
- 토큰 행간은 Figma 레이어 높이를 px로 그대로 씀. 브라우저 `normal`은 글꼴 로딩·브라우저에 따라 값이 달라지고, 글자 크기와 같은 px는 Figma보다 줄이 좁아짐
- 측정하지 못한 스타일은 글자 크기 × 1.193을 반올림해 정함. 1.193은 실측 11건(데스크톱 8종, 모바일 3종)을 모두 만족하는 비율(1.1875 이상 1.1944 미만)이고, 이 범위 안 어느 값을 써도 계산 결과는 같음
- 원시 `font.size.*`·`font.line-height.*`의 키는 px 값임. 값이 바뀌면 키도 함께 바꿈
- Body 4 - Paragraph는 Figma 지정값 30px

| 토큰 | 크기 | 행간 | 근거 |
| --- | --- | --- | --- |
| `display` | 72 | 86 | 실측 1728:3700 |
| `headline-1` | 40 | 48 | 실측 1728:3699 |
| `headline-1-semibold` | 40 | 48 | 계산 |
| `headline-2` | 30 | 36 | 실측 1728:3703 |
| `headline-3` | 24 | 29 | 실측 1728:3705 |
| `body-1` | 24 | 29 | 계산 |
| `body-2` | 20 | 24 | 계산. 2441:5362의 29는 레이어에 고정 높이를 지정한 값이라 쓰지 않음 |
| `body-2-regular` | 20 | 24 | 계산 |
| `body-3` | 18 | 21 | 실측 1728:3704 |
| `body-4` | 18 | 21 | 실측 2009:4229 |
| `body-4-paragraph` | 18 | 30 | Figma 지정값 |
| `body-5` | 16 | 19 | 실측 1728:3701 |
| `text-1` | 14 | 17 | 실측 1728:3706 |
| `body-2-mobile` | 16 | 19 | 실측 7064:14053 |
| `body-4-mobile` | 15 | 18 | 실측 7578:14642 |
| `text-1-mobile` | 12 | 14 | 실측 7091:10966 |

- 글꼴 스택: `Pretendard, sans-serif`. 앱이 쓰는 추가 대체 글꼴(`-apple-system` 등)은 앱 로컬에 둠
- 모바일 장문 본문의 행간 지정 예외 2건(7142:13836 14/400에 24px, 7142:13894 15/400에 20px)은 단일 사용이라 토큰에 넣지 않음
- 모바일의 다른 조합(카드 14/400, 카드 본문 18/400)은 레이어 높이가 고정이라 행간 근거가 없어 넣지 않음

## TOKEN-03 radius 토큰

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-04 | 1 | #31 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-03-01 | `radius.sm` 12(사각 버튼·입력), `radius.md` 20(태그·카드·소형 버튼), `radius.full` 40(pill) | `dist/tokens.css`의 `--boaz-radius-*` 3개 |
| TOKEN-03-02 | Figma 실측 근거를 `$description`에 기재(Radius 시트 1728:3710의 12·20·40. 흰 250 버튼의 10은 다른 사각 버튼·Radius 시트와 달라 12로 통일, 카드 라벨 "24 (20)"은 실측 20) | `tokens/radius.json` |
| TOKEN-03-03 | Tailwind 출력 `--radius-boaz-*` | `dist/tailwind-theme.css` |

- `radius.full`(40) 이름 근거: Radius 시트의 가장 큰 단계이고, Figma pill 버튼(높이 44~68)에서 반원 끝을 만드는 값이라 `full`로 부름. 높이 80px을 넘는 요소에는 반원이 되지 않음
- 모달(COMPONENT-07-01, radius 40)도 `radius.full`을 씀. 모달 전용 radius 토큰은 만들지 않음
- 단위: 모든 값에 `px`를 붙임. Style Dictionary `css` 변환(`size/rem`)은 단위 없는 숫자를 rem으로 바꿈
- 토큰에 넣지 않는 값: 코드의 10·24·4, Figma 썸네일 16·후기 카드 10·선택 카드 8(`docs/design-reference.md` 3절, 7절), 모바일 흰 버튼 10(7225:13942)·`Button_White_200` 8(7289:14366)
- frontend `radius.css.ts`와 이름이 겹치지만 값이 다름. 옮길 때 frontend `xs`(12) → `radius.sm`, `sm`(20) → `radius.md`, `lg`(40) → `radius.full`. `md`(24)는 대응 토큰 없음(ADOPT-03)

## TOKEN-04 spacing 토큰

**목적:** Figma에 체계가 없는 간격(패딩 33·21, 28·20, 13 등)을 4px 배수 스케일로 정함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-04 | 1 | #32 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-04-01 | `spacing.{1,2,3,4,5,6,8,10,12,16}` = 4·8·12·16·20·24·32·40·48·64px(단위는 TOKEN-02-04와 같이 px) | `dist/tokens.css`의 `--boaz-spacing-*` 10개 |
| TOKEN-04-02 | Figma 실측값과 가장 가까운 단계 대응표를 이 문서의 TOKEN-04 절 아래에 "실측 → 단계" 표로 기재. 거리가 같으면 작은 단계를 택함. 근거: Figma 패딩이 33·21, 28·20, 13 등 체계 없이 쓰여 가장 가까운 4px 단계로 맞춤(8px 배수는 12·20을 표현하지 못함) | 이 문서 TOKEN-04 절에 "실측 → 단계" 표 존재 |

### 실측 → 단계

- 2026-10-11 Figma 실측(Components 페이지 모바일 컴포넌트). 거리가 같으면 작은 단계
- 2026-09-28 명세 초안이 예로 든 패딩 47px은 실측에서 찾지 못해 예시와 표에서 뺌(PR #37)
- 소수 값은 Figma가 자동 레이아웃·크기 조정으로 계산한 값을 그대로 적음. 탭·모달 패딩은 Figma에 패딩 지정이 없음(고정 크기만 있음)

| 노드 | 대상 | 실측(px) | 단계 | 토큰 |
| --- | --- | --- | --- | --- |
| `7225:13942` | 버튼 160×52 좌우 패딩 | 33 | 32 | `spacing.8` |
| `7225:13942` | 같은 버튼 상하 패딩 | 21 | 20 | `spacing.5` |
| `7289:14366` | 버튼 160×44 좌우 패딩 | 7.677 | 8 | `spacing.2` |
| `7289:14366` | 같은 버튼 상하 패딩 | 4.885 | 4 | `spacing.1` |
| `7289:14366` | 같은 버튼 아이콘 gap | 2.326 | 4 | `spacing.1` |
| `7142:13884` | 보라 pill 112×36 패딩 | 10 | 8 | `spacing.2` |
| `7142:13906` | 카드 280×376 위 패딩 | 28 | 24 | `spacing.6` |
| `7142:13906` | 같은 카드 아래·좌우 패딩 | 20 | 20 | `spacing.5` |
| `7142:13907` | 카드 내부 gap | 20 | 20 | `spacing.5` |
| `7098:8723` | 활동사진 카드 gap | 20 | 20 | `spacing.5` |
| `7098:8723` | 같은 카드 왼쪽 여백 | 15 | 16 | `spacing.4` |
| `7095:10986` | 프로젝트 카드 gap | 32 | 32 | `spacing.8` |
| `7095:10985` | 프로젝트 카드 안쪽 여백(이미지 x·y 위치) | 16 | 16 | `spacing.4` |
| `7095:10987` | 프로젝트 카드 제목 gap | 4 | 4 | `spacing.1` |
| `7142:13834` | 아이콘 카드 gap | 28 | 24 | `spacing.6` |
| `I7142:13837;6742:16532` | 아이콘 카드 내부 gap | 12 | 12 | `spacing.3` |
| `7289:14360` | 후기 카드 gap | 12 | 12 | `spacing.3` |
| `7289:14361` | 후기 카드 이름 gap | 4.821 | 4 | `spacing.1` |
| `7098:8712` | 태그 좌우 패딩 | 8 | 8 | `spacing.2` |
| `7098:8712` | 태그 상하 패딩 | 4 | 4 | `spacing.1` |
| `7095:10991` | 태그 gap | 3.135 | 4 | `spacing.1` |
| `7289:14464` | FAQ 열림 좌우 패딩 | 16 | 16 | `spacing.4` |
| `7289:14394` | FAQ 닫힘 왼쪽 패딩 | 8 | 8 | `spacing.2` |
| `7578:14707` | 항목 추가 버튼 hover 상하 패딩 | 13 | 12 | `spacing.3` |
| `7578:14679` | 텍스트 필드 gap | 10 | 8 | `spacing.2` |

## TOKEN-05 시맨틱 색 토큰

**목적:** 앱이 용도 이름으로 색을 쓰게 함. 다크 테마 전용

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | TOKEN-01 | 1 | #33 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-05-01 | 배경: `bg.canvas`(gray 1000), `bg.layer`(gray 900), `bg.surface-inverse`(gray 0, 모달), `bg.brand-solid`·`-hover`·`-press`(purple 100·300·400), `bg.neutral-solid`·`-hover`·`-press`(gray 0·400·600), `bg.disabled`(gray 600) | `tokens/color/semantic.json` |
| TOKEN-05-02 | 글자: `fg.default`(gray 0), `fg.neutral`(gray 200), `fg.muted`(gray 400), `fg.disabled`(gray 400), `fg.on-brand`(gray 0), `fg.on-inverse`(gray 1000), `fg.brand`(purple 100), `fg.accent`(lightblue 100), `fg.critical`(red 100). `fg.muted`와 `fg.disabled`는 값이 같으므로 비활성 상태는 색이 아니라 `disabled` 속성으로 구분함(대비표 `fg.disabled` 행, WCAG 비활성 예외. PATTERN-03-05) | 같은 파일 |
| TOKEN-05-03 | 선: `stroke.neutral`(gray 400), `stroke.weak`(gray 800), `stroke.brand`(purple 100), `stroke.focus`(lightblue 100. 검정 캔버스 위 포커스 링용. 보라 버튼 위 보라 outline은 대비 1:1이라 쓰지 않음), `stroke.focus-inverse`(purple 100. 흰 표면(`bg.surface-inverse`) 위 포커스 링용. lightblue는 흰색 위 1.85:1로 보이지 않음), `stroke.critical`(red 100) | 같은 파일 |
| TOKEN-05-04 | 모든 시맨틱은 팔레트 참조(hex 직접 기재 없음), `tokens.css`에 `var()` 참조로 출력 | `--boaz-color-bg-brand-solid: var(--boaz-color-palette-purple-100)` |
| TOKEN-05-05 | 아래 "대비표"의 조합이 실제 토큰 값과 일치하는지 확인하고, 시맨틱 토큰을 추가·변경할 때 표를 함께 고침 | 대비표의 모든 행이 `tokens/color/semantic.json`의 값과 일치 |
| TOKEN-05-06 | 브랜드 색은 Figma `Primary-Purple`(보라). 로고의 파랑은 로고 파일 전용이라 토큰으로 두지 않음(Figma의 "블루계열(보아즈 공식 색상)" 메모는 무드보드 단계 레퍼런스 설명) | `color.bg.brand-solid`가 purple 100 참조 |

- 시맨틱으로 만들지 않는 색(2026-10-11 결정, 2026-10-22 보강): 모달 보더 #CCCCCC(gray.200), 모달 설명 글자 #666666(gray.600), 모달 닫기 버튼 바탕 #E6E6E6(gray.100), 모달 신청 버튼 바탕 #000000(gray.1000), 태그 글자 #E6E6E6(gray.100), 선택 카드 보더 #666666(gray.600), 대상 카드 바탕 #333333(gray.800). 각각 한 컴포넌트에서만 쓰여 용도 이름을 정할 근거가 부족함. 해당 컴포넌트 명세(COMPONENT-07·08·13·15)에서 팔레트를 직접 참조하고, 두 번째 사용처가 생기면 시맨틱으로 올림. 올릴 때 이름은 AGENTS.md 규칙대로 기존 role 뒤에 `-inverse`를 붙임(후보 `stroke.weak-inverse` #CCCCCC, `fg.muted-inverse` #666666). 토큰 추가는 patch 릴리스
- 시맨틱에서 참조하지 않는 팔레트: gray.950(Figma 화면에 사용처 없음), red.900(Error-bg-Red. 오류 바탕을 쓰는 화면이 없어 대비 근거가 없음), purple.200(Primary-subtle-Purple. 홈페이지 화면에 사용처가 없고 관리자 콘솔 강조색으로만 씀, ADOPT-05)

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
| `fg.critical` #F96466 | `bg.canvas` #000000 | 7.04 | 통과 | 제한 없음 |
| `fg.accent` #68CBEC | `bg.layer` #1A1A1A | 9.40 | 통과 | 제한 없음 |
| `fg.accent` #68CBEC | `bg.canvas` #000000 | 11.34 | 통과 | 제한 없음 |
| `fg.on-brand` #FFFFFF | `bg.brand-solid` #7A64F9 | 4.18 | 큰 글자만 통과 | 보라 버튼 글자는 Bold 18.67px 이상. Body 3(18 Bold)은 0.67px 부족하므로 데스크톱 버튼 글자는 Body 2(20 Bold)를 씀. 모바일 버튼 글자 `typography.body-2-mobile`(16, 600)은 큰 글자가 아니라 미달이지만 Figma 값이라 유지함. COMPONENT-01-03에 반영 |
| `fg.on-brand` #FFFFFF | `bg.brand-solid-hover` #493C95 | 8.88 | 통과 | 제한 없음 |
| `fg.muted` #999999 | `bg.brand-solid-press` #2C2459 | 4.90 | 통과 | 보라 버튼 press 글자 |
| `fg.on-inverse` #000000 | `bg.neutral-solid` #FFFFFF | 21.00 | 통과 | 제한 없음 |
| `fg.on-inverse` #000000 | `bg.neutral-solid-hover` #999999 | 7.37 | 통과 | 제한 없음 |
| `fg.on-inverse` #000000 | `bg.neutral-solid-press` #666666 | 3.66 | 큰 글자만 통과 | 일시 상태(누르는 동안). Figma 값 유지 |
| `fg.disabled` #999999 | `bg.disabled` #666666 | 2.02 | 적용 제외 | 비활성. 기록용 |
| `stroke.focus` #68CBEC | `bg.canvas` #000000 | 11.34 | 통과 | 포커스 링은 offset 2px로 캔버스 위에 놓임 |
| `stroke.focus` #68CBEC | `bg.layer` #1A1A1A | 9.40 | 통과 | 카드 포커스 링 |
| `stroke.focus` #68CBEC | `bg.brand-solid` #7A64F9 | 2.26 | 미달 | 보라 버튼 안쪽에 링을 그리지 않음(offset 2px 필수) |
| `stroke.focus` #68CBEC | `bg.surface-inverse` #FFFFFF | 1.85 | 미달 | 흰 표면 위에서는 `stroke.focus-inverse` 사용 |
| `stroke.focus-inverse` #7A64F9 | `bg.surface-inverse` #FFFFFF | 4.18 | 통과 | 모달 안 버튼 포커스 링 |
| 모달 설명 글자 #666666 | `bg.surface-inverse` #FFFFFF | 5.74 | 통과 | COMPONENT-07-01 |
| `stroke.weak` #333333 | `bg.layer` #1A1A1A | 1.38 | 장식 | 카드 경계를 보더에만 의존하지 않음(배경색 차이로 구분) |

## TOKEN-06 빌드 보강

**목적:** 타이포·spacing을 세 가지 출력에 모두 내보내고, 소비 앱이 그대로 import할 수 있는 형식으로 맞춤

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | TOKEN-02, TOKEN-04 | 1 | #34 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| TOKEN-06-01 | `tailwind-theme.css` 출력 규칙. 색 `color.*` → `--color-boaz-*`, radius → `--radius-boaz-*`, spacing → `--spacing-boaz-*`. 타이포는 경로를 그대로 잇지 않고 다음과 같이 바꿔 씀: `typography.{style}.size` → `--text-boaz-{style}`, `typography.{style}.line-height` → `--text-boaz-{style}--line-height`, `typography.{style}.weight` → `--text-boaz-{style}--font-weight`(Body 2와 Body2 - Regular처럼 크기가 같고 굵기만 다른 스타일을 유틸 하나로 구분하기 위함). `font.family.base` → `--font-boaz-base`. 원시 스케일 `font.size.*`·`font.weight.*`·`font.line-height.*`는 Tailwind에 내보내지 않음 | `grep -- '--text-boaz-body-3:' dist/tailwind-theme.css`, `grep -- '--text-boaz-body-3--line-height' dist/tailwind-theme.css`, `grep -- '--text-boaz-body-3--font-weight' dist/tailwind-theme.css` 모두 1건 |
| TOKEN-06-02 | `tokens.js`(ESM)와 `tokens.d.ts`를 출력하고 `package.json`의 `exports["./tokens"]`를 `{ "types": "./dist/tokens.d.ts", "default": "./dist/tokens.js" }`로 바꿈. `vars` 객체에 모든 토큰의 `var()` 참조를 담음. 이유: Node는 `node_modules` 안의 `.ts` 파일을 import하지 못함(`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`). frontend의 Vanilla Extract 컴파일러가 `theme.css.ts`에서 이 모듈을 Node로 평가하므로 `.ts` 그대로는 쓸 수 없음. 기존 `dist/tokens.ts`는 삭제(v0.1.0 전이라 breaking 아님) | `node -e "import('./dist/tokens.js').then(m => console.log(m.vars.typography['headline-3'].size))"`가 `var(--boaz-typography-headline-3-size)` 출력, `dist/tokens.d.ts` 존재, `.d.ts`와 `.js`의 키·값 목록 일치, `.d.ts`를 import하는 파일이 `tsc --noEmit --strict` 통과 |
| TOKEN-06-03 | 참조 깨짐·중복 이름이 있으면 빌드 실패. Style Dictionary 기본값은 중복 이름을 경고만 내고 나중 값으로 덮어쓰므로, 빌드 설정에 경고를 오류로 올리는 옵션(`log: { warnings: 'error' }`)을 둠 | 잘못된 참조를 넣으면 `npm run build` 실패. 같은 이름 토큰을 두 파일에 넣으면 `npm run build` 실패 |

- `tokens.d.ts` 타입 규칙(2026-10-11 결정): 리프는 `readonly` 문자열 리터럴(예: `"var(--boaz-radius-sm)"`), 숫자 단계는 숫자 키(`vars.color.palette.gray[0]`), `-`가 든 이름은 따옴표 키(`vars.typography['headline-3']`). 시맨틱이 어느 팔레트를 참조하는지는 타입에 넣지 않음(값이 모두 `var()` 문자열이라 참조 관계가 소비 코드에 필요 없음)
- 빌드는 매번 `dist/`를 비우고 다시 만듦. 이름이 바뀐 생성물(예: 예전 `tokens.ts`)이 남지 않게 하기 위함
