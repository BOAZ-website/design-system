# 디자인 참조

디자인팀 Figma(공개 홈페이지, 검정 바탕 기준)와 홈페이지·관리자 코드에서 확인한 디자인 값을 기록한 참조 문서임. 기준일 2026-10-11.
토큰으로 정식화된 값의 기준은 `tokens/`와 `docs/wbs/20-token.md`이고, 이 문서는 원본 기록임.
명세 값의 우선순위: 라이브에 있는 UI는 라이브 값, 없는 UI는 Figma 값. 토큰과 다르면 토큰 이름이 아니라 raw 값으로 적고 토큰 추가는 별도 이슈(2026-10-22 결정).
토큰 이름은 `tokens/`·`dist/`의 현재 이름 기준임.
각 값 옆에 출처(Figma 노드 ID 또는 저장소 루트 기준 코드 경로와 줄)를 적음. Figma 값과 코드 값이 다르면 둘 다 적고 어느 쪽인지 표시.
확인되지 않은 값은 "미확인"으로 표시.

## 1. Color System

### 1.1 정식 색 17종

- 출처: Components 페이지 색 시트 `2432:5247`
- 시트의 스와치는 16개. press 1개를 더한 17개가 `tokens/color/palette.json`의 팔레트 17개와 값이 동일함
- 17번째 Primary-press-Purple #2C2459는 시트에 없음. 20-token.md "Figma 원본 값" 절에 별도 색 스타일로 등록되어 있음
- Primary-press-Purple은 `purple.400`(사용처 COMPONENT-01-03)
- Gray950 #0D0D0D는 시트(`2433:5315`)에만 있고 사용처 없음
- Black 스와치(`2433:5330`)는 0.2px 흰 테두리 있음

| Figma 이름 | hex | 주 용도 |
| --- | --- | --- |
| White | #FFFFFF | 흰 버튼·모달·푸터 배경, 기본 글자 |
| Gray100 | #E6E6E6 | 관리자 구분선 |
| Gray200 | #CCCCCC | 보조 글자 |
| Gray300 | #B3B3B3 | 관리자 비활성 |
| Gray400 | #999999 | 흐린 글자, FAQ 보더 |
| Gray600 | #666666 | 모달 설명 글자, 비활성 배경 |
| Gray800 | #333333 | 대상 카드 배경, 약한 선 |
| Gray900 | #1A1A1A | 카드·레이어 배경, 후기 카드 |
| Gray950 | #0D0D0D | 사용처 없음 |
| Black | #000000 | 홈페이지 바탕 |
| Error-Red | #F96466 | 오류 글자·선 |
| Error-bg-Red | #190A0A | 오류 배경 |
| Primary-Purple | #7A64F9 | 브랜드, 주 버튼 |
| Primary-subtle-Purple | #6250C7 | 관리자 주 버튼 |
| Primary-hover-Purple | #493C95 | 버튼 hover |
| Primary-press-Purple | #2C2459 | 버튼 press |
| Sub-Lightblue | #68CBEC | 포커스 링, 강조 글자 |

### 1.2 팔레트 코드 참조

- 값 출처: `dist/tokens.css`, `dist/tokens.js`, `dist/tailwind-theme.css`(`@theme inline`)
- CSS 변수 규칙: `--boaz-color-palette-{group}-{step}`
- TS 경로 규칙: `vars.color.palette.{group}["{step}"]`. White·Black은 `gray["0"]`·`gray["1000"]`
- Tailwind 테마 변수 규칙: `--color-boaz-palette-{group}-{step}`
- 각 토큰의 `$description`에 Figma 스타일 이름이 있음

| Figma 이름 | hex | 토큰 경로 | CSS 변수 | TS 경로 | Tailwind 테마 변수 |
| --- | --- | --- | --- | --- | --- |
| White | #FFFFFF | `color.palette.gray.0` | `--boaz-color-palette-gray-0` | `vars.color.palette.gray["0"]` | `--color-boaz-palette-gray-0` |
| Gray100 | #E6E6E6 | `color.palette.gray.100` | `--boaz-color-palette-gray-100` | `vars.color.palette.gray["100"]` | `--color-boaz-palette-gray-100` |
| Gray200 | #CCCCCC | `color.palette.gray.200` | `--boaz-color-palette-gray-200` | `vars.color.palette.gray["200"]` | `--color-boaz-palette-gray-200` |
| Gray300 | #B3B3B3 | `color.palette.gray.300` | `--boaz-color-palette-gray-300` | `vars.color.palette.gray["300"]` | `--color-boaz-palette-gray-300` |
| Gray400 | #999999 | `color.palette.gray.400` | `--boaz-color-palette-gray-400` | `vars.color.palette.gray["400"]` | `--color-boaz-palette-gray-400` |
| Gray600 | #666666 | `color.palette.gray.600` | `--boaz-color-palette-gray-600` | `vars.color.palette.gray["600"]` | `--color-boaz-palette-gray-600` |
| Gray800 | #333333 | `color.palette.gray.800` | `--boaz-color-palette-gray-800` | `vars.color.palette.gray["800"]` | `--color-boaz-palette-gray-800` |
| Gray900 | #1A1A1A | `color.palette.gray.900` | `--boaz-color-palette-gray-900` | `vars.color.palette.gray["900"]` | `--color-boaz-palette-gray-900` |
| Gray950 | #0D0D0D | `color.palette.gray.950` | `--boaz-color-palette-gray-950` | `vars.color.palette.gray["950"]` | `--color-boaz-palette-gray-950` |
| Black | #000000 | `color.palette.gray.1000` | `--boaz-color-palette-gray-1000` | `vars.color.palette.gray["1000"]` | `--color-boaz-palette-gray-1000` |
| Error-Red | #F96466 | `color.palette.red.100` | `--boaz-color-palette-red-100` | `vars.color.palette.red["100"]` | `--color-boaz-palette-red-100` |
| Error-bg-Red | #190A0A | `color.palette.red.900` | `--boaz-color-palette-red-900` | `vars.color.palette.red["900"]` | `--color-boaz-palette-red-900` |
| Primary-Purple | #7A64F9 | `color.palette.purple.100` | `--boaz-color-palette-purple-100` | `vars.color.palette.purple["100"]` | `--color-boaz-palette-purple-100` |
| Primary-subtle-Purple | #6250C7 | `color.palette.purple.200` | `--boaz-color-palette-purple-200` | `vars.color.palette.purple["200"]` | `--color-boaz-palette-purple-200` |
| Primary-hover-Purple | #493C95 | `color.palette.purple.300` | `--boaz-color-palette-purple-300` | `vars.color.palette.purple["300"]` | `--color-boaz-palette-purple-300` |
| Primary-press-Purple | #2C2459 | `color.palette.purple.400` | `--boaz-color-palette-purple-400` | `vars.color.palette.purple["400"]` | `--color-boaz-palette-purple-400` |
| Sub-Lightblue | #68CBEC | `color.palette.lightblue.100` | `--boaz-color-palette-lightblue-100` | `vars.color.palette.lightblue["100"]` | `--color-boaz-palette-lightblue-100` |

- Tailwind 유틸 클래스 이름(`bg-boaz-palette-purple-100` 형태)은 Tailwind v4 규칙에 따른 추정이며 앱에서 확인하지 않았음

### 1.3 미등록 단계 초안

- 출처: FE 회의용 페이지 ColorToken 섹션 `2229:4392`
- 정식 스타일이 아니며 토큰에 넣지 않음
- 참고용 값이므로 step 번호를 붙이지 않음

| 항목 | 값 | 출처 |
| --- | --- | --- |
| 보라 11단계 | #000000, #070227, #100358, #190589, #2207BB, #2B09EC, #4E31F7, #7A64F9, #A293FB, #CCC4FD, #F7F5FF | `2229:4313`(Frame 1000001517). 검정 칸 테두리 #717171 |
| 파랑 11단계 | #000000, #020F27, #032158, #053489, #0746BB, #0958EC, #3176F7, #6498F9, #93B7FB, #C4D8FD, #F5F8FF | `2229:4307` 안 Rectangle 81~91 |
| 회색 11단계 | #000000, #1A1A1A, #333333, #4D4D4D, #666666, #808080, #999999, #B3B3B3, #CCCCCC, #E6E6E6, #FFFFFF | 아래 회색 노드 표 |
| 불투명도 단계 | 검정 1·0.8·0.6·0.4·0.2·0, 흰색 0.2·0.4·0.6·0.8·1 | `2229:4361`, `2229:4337` |
| 로고 배경 | #010413(팔레트에 없음, 재확인 필요) | 무드보드 `370:146`, `370:147` |

- `2229:4307`은 모든 스케일을 담은 상위 프레임(Frame 1000001608)
- 파랑 노드는 `2229:4373`~`2229:4383`(Rectangle 81~91)
- `2229:4361`은 보라 #7A64F9 바닥(`2229:4349`) 위 오버레이
- `2229:4337`은 파랑 #6498F9 바닥(`2229:4325`) 위 오버레이
- 회색 11단계 중 정식에 없는 값: #4D4D4D, #808080
- 로고의 파랑은 로고 파일 전용이라 토큰으로 두지 않음(20-token.md TOKEN-05-06)

| 회색 값 | 노드 | 비고 |
| --- | --- | --- |
| #000000 | `2229:4308` | 테두리 #717171 |
| #1A1A1A | `2229:4309` | 없음 |
| #333333 | `2229:4310` | 없음 |
| #4D4D4D | `2229:4311` | 없음 |
| #666666 | `2229:4312` | 없음 |
| #808080 | `2229:4384` | 없음 |
| #999999 | `2229:4385` | 없음 |
| #B3B3B3 | `2229:4386` | 없음 |
| #CCCCCC | `2229:4387` | 없음 |
| #E6E6E6 | `2229:4388` | 없음 |
| #FFFFFF | `2229:4389` | 테두리 #DCDCDC |

### 1.4 홈페이지 시맨틱 토큰 (검정 바탕)

- 출처: 20-token.md TOKEN-05-01~03
- `tokens/color/semantic.json`. CSS 변수는 `--boaz-color-{bg|fg|stroke}-{role}`(예: `--boaz-color-bg-brand-solid`)이고 값은 팔레트 변수 `var()` 참조
- 대비표: 20-token.md "대비표(WCAG 2.2 AA)" 절
- 팔레트 참조 값의 숫자는 토큰 이름 기준(gray 0 = White, gray 1000 = Black)

| 토큰 | 팔레트 참조 | 용도 |
| --- | --- | --- |
| `bg.canvas` | gray 1000 | 바탕 |
| `bg.layer` | gray 900 | 카드·레이어 |
| `bg.surface-inverse` | gray 0 | 모달 |
| `bg.brand-solid` | purple 100 | 주 버튼 |
| `bg.brand-solid-hover` | purple 300 | 주 버튼 hover |
| `bg.brand-solid-press` | purple 400 | 주 버튼 press |
| `bg.neutral-solid` | gray 0 | 흰 버튼 |
| `bg.neutral-solid-hover` | gray 400 | 흰 버튼 hover |
| `bg.neutral-solid-press` | gray 600 | 흰 버튼 press |
| `bg.disabled` | gray 600 | 비활성 배경 |
| `fg.default` | gray 0 | 기본 글자 |
| `fg.neutral` | gray 200 | 보조 글자 |
| `fg.muted` | gray 400 | 흐린 글자 |
| `fg.disabled` | gray 400 | 비활성 글자 |
| `fg.on-brand` | gray 0 | 보라 면 위 글자 |
| `fg.on-inverse` | gray 1000 | 흰 면 위 글자 |
| `fg.brand` | purple 100 | 브랜드 글자 |
| `fg.accent` | lightblue 100 | 강조 글자 |
| `fg.critical` | red 100 | 오류 글자 |
| `stroke.neutral` | gray 400 | 기본 선 |
| `stroke.weak` | gray 800 | 약한 선 |
| `stroke.brand` | purple 100 | 브랜드 선 |
| `stroke.focus` | lightblue 100 | 검정 캔버스 위 포커스 링 |
| `stroke.focus-inverse` | purple 100 | 흰 표면 위 포커스 링 |
| `stroke.critical` | red 100 | 오류 선 |

### 1.5 관리자 콘솔 색 역할 (흰 바탕)

- 출처: 50-adopt.md ADOPT-05(2026-10-11 결정)
- ADOPT-02 이후 `theme.css`는 `var(--boaz-color-palette-purple-200)` 같은 팔레트 변수를 참조함

| 용도 | 값 | 대비 | theme.css 변수 |
| --- | --- | --- | --- |
| 바탕·카드·팝업·입력 | #FFFFFF | 기준 | `--background` `--card` `--popover` `--input` |
| 구분선 | #E6E6E6 | 해당 없음 | `--border` |
| 본문 | #1A1A1A | 흰 17.40 | `--foreground` |
| 보조 글자·입력 테두리 | #666666 | 흰 5.74 | `--muted-foreground` |
| 비활성 | #B3B3B3 | 적용 제외 | 변수 없음(클래스·투명도로 처리) |
| 주 버튼 | #6250C7 | 흰 글자 6.01 | `--primary` `--sidebar-primary` |
| 주 버튼 hover | #493C95 | 흰 글자 8.88 | 변수 없음(ADOPT-05에서 이름 결정) |
| 포커스 링 | #6250C7 2px + 흰 간격 2px | 흰 위 6.01 | `--ring` `--sidebar-ring` |

#### Figma 밖 값 7개

- 관리자 `theme.css`에만 둠
- 디자인팀 값이 생기면 교체

| 용도 | 값 | 대비 | theme.css 변수 |
| --- | --- | --- | --- |
| 보조 면 바탕 | #F5F5F5 | 해당 없음 | `--muted` `--secondary` |
| 위험 글자·버튼 | #C92A2D | 흰 5.45 | `--destructive` |
| 위험 바탕 | #FFF3F3 | 해당 없음 | 변수 없음(ADOPT-05에서 이름 결정) |
| 성공 글자 | #047857 | 흰 5.48 | `--success` |
| 성공 바탕 | #ECFDF5 | 해당 없음 | 변수 없음(ADOPT-05에서 이름 결정) |
| 경고 글자 | #B45309 | 흰 5.02 | `--warning` |
| 경고 바탕 | #FFFBEB | 해당 없음 | 변수 없음(ADOPT-05에서 이름 결정) |

### 1.6 흰 바탕 대비표

기준: 일반 글자 4.5:1.

| 전경 | 흰 #FFFFFF | #F5F5F5 | 해당 색 바탕 | 판정 |
| --- | --- | --- | --- | --- |
| #666666 | 5.74 | 5.27 | 해당 없음 | 통과 |
| #999999 | 2.85 | 2.61 | 해당 없음 | 글자·입력 테두리 불가 |
| #F96466 | 2.98 | 2.74 | 해당 없음 | 불가 |
| #7A64F9 | 4.18 | 3.84 | 해당 없음 | 작은 글자 불가 |
| 흰 글자 | 해당 없음 | 해당 없음 | #7A64F9 위 4.18 | 큰 글자만 |
| #68CBEC | 1.85 | 1.70 | 해당 없음 | 장식만 |
| #C92A2D | 5.45 | 5.00 | #FFF3F3 위 5.03 | 통과 |
| #047857 | 5.48 | 5.03 | #ECFDF5 위 5.21 | 통과 |
| #B45309 | 5.02 | 4.61 | #FFFBEB 위 4.84 | 통과 |
| #6250C7 포커스 링 | 6.01 | 5.52 | #6250C7 버튼 위 1.00 | 흰 간격 2px 필수 |

### 1.7 상태 표시 규칙

- 상태는 색만으로 구분하지 않음
- 색각 이상 시뮬레이션에서 성공·위험·경고가 거의 같은 색으로 보임
- 아이콘과 문구를 함께 표시

## 2. Typography

### 2.1 Figma 텍스트 스타일 13종

- 출처: 20-token.md "Figma 원본 값" 절
- 글꼴 Pretendard, 자간 0
- Figma 행간 "100%"는 Auto(글자 크기의 약 1.19배)임. 토큰 행간(px)은 20-token.md TOKEN-02 "행간 규칙" 표를 따름

| 스타일 | 크기 | 굵기 | 행간(Figma 표기) | 토큰 행간(px) | 토큰 |
| --- | --- | --- | --- | --- | --- |
| Display | 72 | 700 | 100% | 86 | `typography.display` |
| Headline1-Bold | 40 | 700 | 100% | 48 | `typography.headline-1` |
| Headline1-Semibold | 40 | 600 | 100% | 48 | `typography.headline-1-semibold` |
| Headline 2 | 30 | 700 | 100% | 36 | `typography.headline-2` |
| Headline 3 | 24 | 700 | 100% | 29 | `typography.headline-3` |
| Body 1 | 24 | 400 | 100% | 29 | `typography.body-1` |
| Body 2 | 20 | 700 | 100% | 24 | `typography.body-2` |
| Body2 - Regular | 20 | 400 | 100% | 24 | `typography.body-2-regular` |
| Body 3 | 18 | 700 | 100% | 21 | `typography.body-3` |
| Body 4 | 18 | 400 | 100% | 21 | `typography.body-4` |
| Body 4 - Paragraph | 18 | 400 | 30px | 30 | `typography.body-4-paragraph` |
| Body 5 | 16 | 400 | 100% | 19 | `typography.body-5` |
| Text 1 | 14 | 300 | 100% | 17 | `typography.text-1` |

### 2.2 모바일 전용 3종

- 출처: 20-token.md TOKEN-02-06
- 나머지 10종은 데스크톱과 같음
- 행간은 Figma 텍스트 레이어 높이 실측
- 16/600 조합은 Figma 텍스트 스타일로 등록되어 있지 않으며 모바일 버튼에 일관되게 쓰임

| 토큰 | 크기 | 굵기 | 행간(px) |
| --- | --- | --- | --- |
| `typography.body-2-mobile` | 16 | 600 | 19 |
| `typography.body-4-mobile` | 15 | 400 | 18 |
| `typography.text-1-mobile` | 12 | 300 | 14 |

- 코드 이름과 토큰 이름의 대응표는 ADOPT-03에서 작성
- 코드 이름 `{역할}_{weight}_{size}`는 typography 스타일 이름(`frontend/src/shared/styles/typography.css.ts`)이고 fontSize 키는 숫자임

### 2.3 코드 글꼴

| 항목 | 값 | 출처 |
| --- | --- | --- |
| frontend 본문 글꼴 | `'Pretendard Variable', Pretendard, sans-serif`(Figma와 일치) | `frontend/src/shared/styles/global.css.ts:16` |
| frontend Paperlogy | `'Paperlogy', 'Pretendard Variable', Pretendard, sans-serif`. 모집 위젯에서만 사용. Figma 텍스트 스타일에 없음 | `frontend/src/shared/styles/font.css.ts:3` |
| Paperlogy 사용처 | dday-counter, count-down-timer, recruiting-hero, recruitment-status 등 | `frontend/src/widgets/recruiting/ui/*.css.ts` |
| Paperlogy 로딩 | 제3자 미러 `fonts-archive`를 jsdelivr로 로딩(`cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy.css`). 공식 출처·라이선스 미확인 | `frontend/index.html:26`(preload), `:32`(stylesheet) |
| frontend Pretendard 로딩 | jsdelivr v1.3.9 variable, CDN | `frontend/index.html:12`(preload), `:18`(stylesheet) |
| frontend_admin Pretendard | v1.3.9 static, CDN. 두 곳에서 중복 로딩 | `frontend_admin/src/app/styles/fonts.css:1`, `frontend_admin/index.html:13` |
| frontend_admin 추가 글꼴 | Plus Jakarta Sans 400~800, JetBrains Mono 400~700(Google Fonts) | `frontend_admin/src/app/styles/fonts.css:2`, `frontend_admin/index.html:18` |
| frontend_admin 자간 | `*` 선택자에 `letter-spacing: -0.015em` | `frontend_admin/src/app/styles/fonts.css:17` |
| frontend 랜딩 글꼴 | Anton | `frontend/public/landing.html:12` |
| 한글 줄바꿈 | `word-break: keep-all` | `frontend/src/shared/styles/global.css.ts:7` |

### 2.4 루트 글꼴 크기

| 앱 | 값 | 출처 |
| --- | --- | --- |
| frontend | `html 62.5%`(1rem = 10px) | `frontend/src/shared/styles/global.css.ts:5` |
| frontend_admin | 14px | `frontend_admin/src/app/styles/theme.css:4` |

- 루트 기준이 달라 토큰 단위는 px(TOKEN-02-04)

### 2.5 코드 전용 값

- 출처: `frontend/src/shared/styles/font.css.ts`
- 토큰에서 제외(TOKEN-02-05)
- rem 값 = px / 10

| 항목 | 값 | 줄 |
| --- | --- | --- |
| fontSize 17종(px) | 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 32, 36, 38, 40, 72, 80 | `:6-24` |
| lineHeight | tight 1.0, snug 1.2, normal 1.4, card 1.6 | `:33-38` |
| letterSpacing | tight -0.02em, normal 0em, wide 0.02em | `:40-44` |

- `frontend/src/shared/styles/typography.css.ts`는 letterSpacing에 normal만 사용
- ±0.02em은 쓰이지 않음

## 3. Radius, Spacing & Breakpoints

### 3.1 Radius

| 항목 | 값 | 출처 |
| --- | --- | --- |
| Figma Radius 시트 | 12·20·40 (TOKEN-03) | `1728:3710` |
| 보라 버튼 800×68 | 12 | `5875:9827` |
| 흰 버튼 200×68 | 12 | `5875:9827` |
| 흰 버튼 250×68 | 10(토큰에 없음) | `5875:9827` |
| pill | 40 | `5875:9827` |
| 버튼 130×44 | 20 | `5875:9827` |
| 텍스트 링크 | 10(토큰에 없음) | `5875:9827` |
| 프로젝트 카드 썸네일 | Figma 20 | 5절 Component Inventory 카드 |
| 블로그 카드 썸네일 | 16 | 5절 Component Inventory 카드 |
| 대상·모집 카드 | 12 | 대상 `5411:10347`, 모집 최종안 `8838:12513`(Figma 10, 명세 `radius.sm` 12)(2026-10-22 Figma 재확인으로 정정) |
| 후기 카드 | 10 | `1132:1299`, 모바일 `7289:14365`(2026-10-22 Figma 재확인으로 정정) |
| selection-card | 8 | COMPONENT-15-02 |
| frontend `radius.css.ts` | xs 12, sm 20, md 24(토큰에 없음), lg 40 | `frontend/src/shared/styles/radius.css.ts:1-6` |
| 버튼 코드 | base 10, round 계열 40, 모바일 medium 4 | `frontend/src/shared/components/button/button.css.ts:15,35,118` |
| 프로젝트 카드 코드 | 카드 20(2rem), 썸네일 16(1.6rem, 모바일 10px) | `frontend/src/shared/components/archive/project-card.css.ts:13,45,52` |
| 관리자 입력·버튼 | Tailwind `rounded-sm`(`--radius`에서 계산) | ADOPT-05 |
| 관리자 카드·표 | Tailwind `rounded-md`(`--radius`에서 계산) | ADOPT-05 |
| 관리자 팝업 | Tailwind `rounded-lg`(`--radius`에서 계산) | ADOPT-05 |
| 관리자 금지 | Tailwind `rounded-xl` 이상 | ADOPT-05 |

- 관리자 Tailwind `rounded-md`와 frontend `radius.css.ts` md 24는 다른 값임

### 3.2 Spacing

- 토큰: 20-token.md TOKEN-04
- FE 회의용 title 모음 `2229:4306`의 간격 메모: gap 20·22·25·34·36·"21/67..?"
- 간격 메모는 라벨만 있고 어느 요소 사이인지 미확인

### 3.3 Breakpoints

| 구분 | 값 | 출처 |
| --- | --- | --- |
| 모바일 | `max-width: 768px` | 값 `frontend/src/shared/styles/breakpoints.ts:1-4`, media `:6-9` |
| 데스크톱 | `min-width: 1366px` | 값 `frontend/src/shared/styles/breakpoints.ts:1-4`, media `:6-9` |

- 769~1365px는 어느 미디어 쿼리에도 해당하지 않아 기본 스타일 적용
- 토큰 범위 밖

## 4. Elevation, Motion & Layering

### 4.1 높이 표현

- 홈페이지는 그림자 대신 배경 명도 차이(#000000 → #1A1A1A)와 glass로 구분
- Figma에는 의미 있는 그림자·blur 없음
- 홈 시안 루트에만 `0 4 4 rgba(0,0,0,0.25)` 존재
- 코드 `#root` 그림자 `0 0 24px rgba(0,0,0,.12)`: `frontend/src/shared/styles/global.css.ts:29`
- 코드 드롭다운 메뉴 그림자 `1rem 1rem 2rem 0 rgba(0,0,0,.25)`: `frontend/src/shared/components/dropdown/dropdown.css.ts:43`

### 4.2 glass

| 구분 | 값 | 출처 |
| --- | --- | --- |
| Figma | 지원하기 버튼 배경 rgba(208,207,249,0.1)만 | 탭바(상단 메뉴바) `1866:4188` |
| 코드 | radial·linear 그라데이션 + 1px 마스크 보더, 그림자 2겹, `inset 0 -0.8px` 의사 요소 | `frontend/src/shared/styles/glass.css.ts:1-52` |

- 코드 값이 Figma보다 복잡함

### 4.3 전환

| 대상 | 값 | 출처 |
| --- | --- | --- |
| button | `background-color, border-color, color 0.2s ease-in-out` | `frontend/src/shared/components/button/button.css.ts:18-19` |
| blogcard | `all 0.3s ease-in-out` | `frontend/src/shared/components/archive/blogcard.css.ts:17` |
| active-card | `all 0.2s ease-in-out` | `frontend/src/shared/components/archive/active-card.css.ts:18` |
| project-card | `all 0.2s ease-in-out` | `frontend/src/shared/components/archive/project-card.css.ts:17` |
| project-card 아이콘 | `color 0.2s` | `frontend/src/shared/components/archive/project-card.css.ts:126` |
| dropdown 항목 hover | `all 0.2s ease`(메뉴 열림에는 전환 없음) | `frontend/src/shared/components/dropdown/dropdown.css.ts:60` |
| 테마 전환 | `0.3s ease` | `frontend/src/shared/styles/global.css.ts:23` |
| login-overlay | `opacity 0.2s ease-in-out` | `frontend/src/features/auth/ui/login-overlay.css.ts:6,28` |
| accordion | 질문 글자색·grid-template-rows `300ms ease` | `frontend/src/shared/components/accordion/accordion.css.ts:10,43,67` |
| accordion 상수 | `ACCORDION_DURATION_MS = 300` | `frontend/src/shared/hooks/use-accordion.ts:3` |
| radio | transform 0.2s cubic-bezier(0.4,0,0.2,1) | `frontend/src/shared/components/radio-button/radio-button.css.ts:32,42` |
| pagination | 0.2s ease | `frontend/src/shared/components/pagination/pagination.css.ts:67` |
| fixed-tab | 0.2s ease | `frontend/src/shared/components/fixed-tab/fixed-tab.css.ts:23` |
| progress-bar | 0.1s | `frontend/src/shared/components/progress-bar/progress-bar.css.ts:18` |

- easing 종류: ease, ease-in-out, linear, cubic-bezier(0.4,0,0.2,1)
- cubic-bezier는 radio 원 transform에만 사용
- 대부분 0.2s. 예외는 0.1s(progress-bar), 0.3s(blogcard·테마), 300ms(accordion)

### 4.4 배경 장식

- 파일: `frontend/src/shared/components/gradient-background/gradient-background.css.ts`

keyframes(`:3-19`)

| 이름 | 동작 |
| --- | --- |
| moveInCircle | rotate 0 → 180 → 360deg |
| moveVertical | translateY -50% → 50% → -50% |
| moveHorizontal | translateX -50% ↔ 50% + translateY -10% ↔ 10% |

레이어(`:91-122`). 모두 infinite

| 레이어 | 애니메이션 |
| --- | --- |
| g1 | moveVertical 30s ease |
| g2 | moveInCircle 20s reverse |
| g3 | moveInCircle 40s linear |
| g4 | moveHorizontal 40s ease(불투명도 0.7) |
| g5 | moveInCircle 20s ease |

기타(`:127-163`)

| 요소 | 값 |
| --- | --- |
| blur | 180px(z-index 5) |
| 그라데이션 wash | z-index 6, screen 혼합 |
| noise | z-index 10 |
| interactive | hard-light 혼합 |

### 4.5 reduced-motion

- `frontend/src`에 `prefers-reduced-motion` 0건
- 무한 애니메이션 5개가 항상 동작
- 코드 미대응, PATTERN-03-04에서 정의

### 4.6 무드보드 방향 메모

- 출처: Page `283:6`, `283:18`, `500:217`

| 항목 | 내용 |
| --- | --- |
| 참고 색·질감(`283:6`) | 그라데이션, 흰색·파란기 회색·파랑 계열 |
| 스크롤 효과·모션 | 랜딩 페이지만 허용 |
| 나머지 페이지 | 과한 효과 자제 |
| 탭바(상단 메뉴바) | 항상 노출 |
| 커리큘럼 | 모바일 때문에 세로 타임라인 |
| 탭바(상단 메뉴바) hover | 배경 흰색 |

### 4.7 z-index (frontend)

| 대상 | 값 | 출처 |
| --- | --- | --- |
| icon | 1 | `frontend/src/shared/styles/zIndex.css.ts` |
| button | 2 | `frontend/src/shared/styles/zIndex.css.ts` |
| modal | 3 | `frontend/src/shared/styles/zIndex.css.ts` |
| dropdown | 100 | `frontend/src/shared/components/dropdown/dropdown.css.ts:35` |
| dropdownField 오버레이 | 1 | `frontend/src/shared/components/dropdown/dropdownField.css.ts:16` |
| glass 의사 요소 | -1 | `frontend/src/shared/styles/glass.css.ts:35,49` |
| gradient | 0·4·5·6·10·12 | `frontend/src/shared/components/gradient-background/gradient-background.css.ts:26,33,45,140,149,163` |
| login-overlay | 1000 | `frontend/src/features/auth/ui/login-overlay.css.ts:6` |

- 체계 없이 흩어져 있음

## 5. Component Inventory

상태 규칙(brand·neutral 상태값, focus-visible)은 30-component.md 참조.
코드 경로는 저장소 루트 기준 전체 경로.

### 5.1 버튼

- 노드: `버튼` `2897:6164`, `최종_버튼UI` `2682:2297`, 인터렉션 `5875:9827`
- 코드: `frontend/src/shared/components/button/button.css.ts`. 기본 `:8-20`, variant `:21~`, 모바일 compound `:111-160`(파일 161줄)

| 항목 | 값 | 출처 |
| --- | --- | --- |
| Figma 크기 | 800×68, 250×68, 200×68, 250×56, 180×56, 154×44, 130×44, mini(검색 Tag 97×43, 옛 시안이라 명세에 두지 않음(2026-10-22 Figma 재확인으로 정정)) | `2682:2297`, `2897:6164` |
| 180×56 | "사전 알림 신청" 버튼. Figma에 "예외…" 라벨 | `2897:6164` |
| FE 회의 라벨(미확정) | large-round, large-white, medium-round, medium, medium-primary, medium-white, small-round, mini | FE 회의용 `2897:6164` 라벨 |
| 이전/다음 페이지 텍스트 버튼 | 24 Bold 흰 글자 + 24 화살표, 간격 10 | Figma |

- 이름과 크기의 대응은 Figma 라벨만으로 확정할 수 없어 COMPONENT-01-05에서 정함

모바일

| 항목 | Figma | 코드 |
| --- | --- | --- |
| 프레임 | `Button_Components_Mobile` `7064:14053` | 해당 없음 |
| Button_Purple_112_Mobile | `7142:13884` 112×36 | 해당 없음 |
| Default·Disabled | `7578:9581`·`7578:9587` 342×52 | 해당 없음 |
| Tab_Recruit_button_mobile | `7064:9879` 132×40 | 해당 없음 |
| medium | 해당 없음 | 18 Bold, 패딩 0.9rem 2.2rem, radius 4, 폭 100% |
| medium-round | 해당 없음 | 10 Regular, 패딩 0.8rem 1.6rem |
| small-round | 해당 없음 | 16 Bold, 패딩 0.9rem 2.9rem |

- 코드 출처: `frontend/src/shared/components/button/button.css.ts:111-160`

### 5.2 탭바(상단 메뉴바)

- 노드: `1866:4188`

| 항목 | 값 |
| --- | --- |
| 크기·배경 | 1440×64 검정 |
| 로고 | 63×20, 왼쪽 64 |
| 메뉴 간격 | 100 |
| 활성 글자 | 18 Bold |
| 비활성 글자 | 18 Regular, 불투명도 0.8 |
| 지원하기 | 154×44 pill, rgba(208,207,249,0.1), 16 SemiBold |

### 5.3 푸터

- 노드: `1132:1493`

| 항목 | 값 |
| --- | --- |
| 크기·배경 | 1440×110 흰색 |
| SNS 아이콘 | 4종(Instagram, Youtube, Medium, SlideShare), 16px |
| 기타 | 저작권 표기 |

### 5.4 카드

- 노드: 인터렉션 `5875:9878`, 후기 카드 홈 `1132:1994`
- 코드: `frontend/src/shared/components/archive/active-card.css.ts`, `project-card.css.ts`, `blogcard.css.ts`

| 카드 | Figma | 코드 |
| --- | --- | --- |
| 프로젝트 | 333×350, radius 20, 썸네일 radius 20 | 카드 20(2rem), 썸네일 16(1.6rem, 모바일 10px). `project-card.css.ts:13,45,52` |
| 블로그 | 929×278, 보더 2px, 썸네일 16 | 미확인 |
| 활동사진 | 인스턴스 `6363:11807` 333×350(바깥 프레임 `6363:11806` 373×410). 썸네일 자리 채움 rgba(255,255,255,0.6)(2026-10-22 Figma 재확인으로 정정) | 33.3×35rem, 이미지 높이 25rem(모바일 20rem), radius 20(`active-card.css.ts:11-12,47,52`). hover는 보더 #2C3F61 + 그라데이션 2겹(`active-card.css.ts:22-32`) |
| 대상 | `5411:10347` 300×270, #333333, radius 12 | 미확인 |
| 모집 | 최종안 rest `8838:12513`·hover `8796:5269` 310×404. rest #333333·제목 30 Bold 흰색·캐릭터 이미지, hover #1A1A1A·설명 글 #E6E6E6(제목·이미지 숨김), radius 10. 이전 컴포넌트 `5338:3599`(rest 흰색·hover #333333)는 쓰지 않음(2026-10-22 Figma 재확인으로 정정) | 미확인 |
| FAQ | 840×100, 하단 보더 0.5px #999999 | 5.9절 accordion |
| 후기 | `1132:1299`(모바일 `7289:14365`) 500×208, #1A1A1A, radius 10, 이름 20 Bold, 기수 18 Bold 보라 | 미확인 |

- 활동사진 썸네일 자리 채움 rgba(255,255,255,0.6)은 Figma 값이며 코드에 없음. hover 오버레이가 아님(`5236:915`). 프로젝트·블로그·활동사진 hover는 그라데이션 바탕·보더(`5236:823`)(2026-10-22 Figma 재확인으로 정정)
- 전환 값은 4절 Elevation, Motion & Layering 전환 참조

### 5.5 텍스트 필드

- 명세: 30-component.md COMPONENT-02
- 노드: 인터렉션 `5152:8908`, 모바일 `7578:14642`, 지원 폼 섹션 `1981:4329`
- 코드: `frontend/src/shared/components/textfield/textfield.css.ts:20,31`, 문단형 `frontend/src/shared/components/textfield-with-counter/`, 글자 수 표시 `frontend/src/shared/components/textfield/text-counter.css.ts`

### 5.6 드롭다운(select)

- 코드 이름 dropdown
- 노드: 지원폼 목록 항목 `5393:997`(행 50px), 목록 `5395:565`(5행 245px, 아래 모서리 12), 모바일 `7885:15196`·`7885:15246`, 트리거 `5395:3803`·`5395:3848`·`5393:950`·`5395:647`
- 아카이빙 기수 목록 `3496:6393`: radius 20, 보더 1px #333333, 그림자 10 10 20 rgba(0,0,0,0.25), 글자 #E6E6E6
- 코드: `frontend/src/shared/components/dropdown/dropdown.css.ts:32-62`, `dropdownField.css.ts:5-35`

| 항목 | 값 | 출처 |
| --- | --- | --- |
| 메뉴 그림자 | `1rem 1rem 2rem 0 rgba(0,0,0,.25)` | `dropdown.css.ts:43` |
| 메뉴 크기·모양 | maxHeight 24.5rem, radius 1.2rem, 배경 grayscale[900], 스크롤바 0.6rem | `dropdown.css.ts:32-62` |
| 메뉴 항목 | 패딩 1.5rem 1rem, 16 Regular, 중앙 정렬 | `dropdown.css.ts:32-62` |
| 항목 hover | 0.2s | `dropdown.css.ts:60` |
| 메뉴 열림 | 전환 없음 | `dropdown.css.ts:32-62` |
| z-index | 100 | `dropdown.css.ts:35` |
| dropdownField 구조 | relative 컨테이너 위 투명 버튼 오버레이(absolute 100%, z-index 1) | `frontend/src/shared/components/dropdown/dropdownField.css.ts:5-35` |
| dropdownField 메뉴 | top 100%, margin-top 0.4rem, 배경 grayscale[100] | `dropdownField.css.ts:5-35` |

모바일 칩 높이 28(Figma)

| 노드 | 이름 | 크기 |
| --- | --- | --- |
| `7091:5127` | 기수 필터 | 60×28 |
| `7078:5049` | 부문 필터 | 56×28 |
| `7091:5390` | Dropdown_Sector_Mobile | 57×28 |
| `7091:5396` | Dropdown_Sector_Mobile | 68×28 |
| `7091:5402` | Dropdown_Sector_Mobile | 88×28 |
| `7091:5644` | Dropdown_Generation_Mobile | 60×28 |
| `7091:5766` | Dropdown_Search_Mobile | 342×28 |

### 5.7 탭

- 코드 이름 fixed-tab
- 명세: 30-component.md COMPONENT-06
- 노드: 인터렉션 `5915:7015`, 모바일 `7064:14044`
- 코드: `frontend/src/shared/components/fixed-tab/fixed-tab.css.ts:23-26`

모바일(Figma)

| 노드 | 이름 | 크기 |
| --- | --- | --- |
| `7064:14044` | Tab_Components_Mobile | 741×842 |
| `7064:14045` | Tab_menu_button_mobile | 103×111 |
| `7071:14124` | Underline_Tab_모바일 | 항목 80×52 |
| `7578:9510` | 탭 | 342×56. 지원 폼 탭(부문 선택 카드) 모바일이라 COMPONENT-15 selection-card 대상 |
| `7249:14310` | 모바일 커리큘럼 탭(box) | 100×40 |

### 5.8 모달

- 명세: 30-component.md COMPONENT-07
- 노드: `4412:7387`(모달 창 프레임), 안내·입력 오류 4종 세트 `4243:4479`
- 7종 모두 441×235, radius 40, 흰 바탕(#FFFFFF), 테두리 2px #CCCCCC. 제목 20 Bold #000000, 설명 18 Regular #666666, 아이콘 48(로딩 42)(성공 체크·로딩 스피너는 래스터 이미지, 느낌표는 #000000 벡터)
- 버튼은 `팝업창 버튼` 130×44 radius 40, 18 Regular. variant `closed`(#E6E6E6 바탕)·`primary`. 버튼 세트 `4243:4439`

| 종류 | 노드 | 제목 | 설명 | 버튼 |
| --- | --- | --- | --- | --- |
| 안내: 지원 기간 아님 | `4243:4452` | 지금은 지원 기간이 아닙니다. | 사전 알림을 신청해보세요. | 닫기·신청 |
| 안내: 모집 마감 | `4243:4480` | 모집이 마감되었습니다. | 사전 알림을 신청해보세요. | 닫기·신청 |
| 입력 오류: 이메일 재입력 | `4243:4492` | 이메일을 다시 입력해주시길 바랍니다. | 다시 한 번 확인해주세요. | 닫기 |
| 입력 오류: 이메일 중복 | `4243:4504` | 이미 사전 알림이 신청된 이메일입니다. | 다시 한 번 확인해주세요. | 닫기 |
| 성공 | `5164:5542` | 지원서 제출이 성공적으로 완료되었습니다. | BOAZ에 지원해주셔서 감사합니다. | 닫기 |
| 로딩 | `5164:5587` | 지원서를 제출 중입니다. | 잠시만 기다려주세요. | 닫기 |
| 실패 | `5164:5621` | 제출에 실패하였습니다. | 다시 한 번 확인해주세요. | 닫기 |

- Figma에 배경 막(backdrop)·모바일 모달 없음
- frontend에 모달 컴포넌트 코드 없음(z-index 3만 존재)

### 5.8.1 체크박스·약관 동의

- 체크박스 세트: 데스크톱 `Check_box` `5946:10027`(24×24), 모바일 `Check_box_mobile` `7578:14600`(20×20)
- unchecked(`5946:10028`): 투명 바탕, 테두리 1px #999999, radius 5. checked(`5946:10030`): #7A64F9로 채운 상자에 체크 모양 구멍을 낸 벡터(`5946:10032`). 체크 색은 배경이 비쳐 보이는 색이며 별도 색 지정 없음(2026-10-22 Figma 재확인으로 정정)
- Figma에 hover·disabled·indeterminate 없음
- 약관 동의 조합 세트 `5799:10193`: 기본(`5799:10186`, 387×24)과 전문 펼침(`5799:10194`) 2종. 체크박스 + 라벨 "개인정보 필수항목 수집 및 이용 동의"(18 Bold #FFFFFF) + 전문 버튼
- 전문 펼침(`5799:10194`)은 행 아래 20px에 `지원폼_전문 카드`(`5799:10200`, 800×300, #1A1A1A, radius 12, 본문 18 Regular #FFFFFF). 안쪽 글자 높이 330으로 카드보다 넘침
- 전문 버튼: `전문 보기` `4266:7630`, `전문 닫기` `4266:7631`. 76×24(모바일 80×24), radius 8, 테두리 1px #999999, 바탕 없음, 14 Light #E6E6E6, 패딩 4·12
- 코드는 버튼 문구가 "접기"로 Figma "전문 닫기"와 다름(`frontend/src/widgets/apply/ui/agreement-step/agreement-step.tsx`)

### 5.9 코드 컴포넌트

기준 경로 `frontend/src/shared/components/`. 표의 경로는 저장소 루트 기준 전체 경로.

| 컴포넌트 | 값 | 출처 |
| --- | --- | --- |
| accordion(FAQ) | 하단 보더 0.5px grayscale[400], 질문 패딩 3.9rem 2.4rem 3.9rem 0(모바일 2.5rem 0), 18 Bold(모바일 16), 열림 색 primary[100], 300ms ease | `frontend/src/shared/components/accordion/accordion.css.ts` |
| tag | radius 20, 1px grayscale[400], 패딩 0.45rem 1.2rem, 14 Regular(모바일 12, 0.3rem 0.8rem). COMPONENT-13. Figma `3723:9271` 85×26, `3723:9272` 53×26 | `frontend/src/shared/components/tag/tag.css.ts` |
| text-counter | 14 Regular grayscale[400], focus primary[100], error red_100 | `frontend/src/shared/components/textfield/text-counter.css.ts` |
| textfield-with-counter | 문단형 필드. Figma `2009:3439`~`3441` 800×75~82 | `frontend/src/shared/components/textfield-with-counter/` |
| login-overlay | backdrop fixed rgba(0,0,0,.6), z-index 1000, 원형 버튼 6rem·간격 1.6rem, 네이버 #03C75A·구글 #FFFFFF·카카오 #FEE500, hover 불투명도 0.85 | `frontend/src/features/auth/ui/login-overlay.css.ts` |
| progress-bar | 높이 1rem, 1px grayscale[800], radius 20, 현재 단계 grayscale[100]. Figma `2009:3442` 800×10 | `frontend/src/shared/components/progress-bar/` |
| radio-group | radio-button과 함께 사용. Figma 라디오 `2007:3436`·`3437`(인터랙션 세트 `5188:409`), 표형 질문 행 이름 `2391:5869`·`5870`(2026-10-22 Figma 재확인으로 정정) | `frontend/src/shared/components/radio-button/radio-group.css.ts` |
| pagination | 명세 COMPONENT-12-01 도트형(화살표 + 점 5개)<br>Figma 데스크톱 `2653:6538`·`5239:823`, 모바일 `7078:3511`, 점 default 테두리 #999999(코드는 흰색) | `frontend/src/shared/components/pagination/pagination.css.ts:15-68` |
| 체크박스 | 컴포넌트 코드 없음. 동의 단계 체크박스는 `accentColor` 직접 지정 | `frontend/src/widgets/apply/ui/agreement-step/agreement-step.css.ts:78` |

폴더만 확인(값 미대조)

- curriculum-box
- apply-agreement-section
- form-header
- section
- section-header
- gradient-background(값은 4절 Elevation, Motion & Layering 배경 장식)

### 5.10 Figma만 있고 코드 없음

| 컴포넌트 | Figma 노드·크기 | 코드 |
| --- | --- | --- |
| filter-chip | 부문 `3723:9261` 155×44, `9262` 120×44, `9263` 135×44, `9264` 166×44. 기수 `3723:9269`·`9270` 92×44 | `frontend/src/widgets/archive/ui/track-filter/`, `generation-filter/`(select chip과 공유)(2026-10-22 Figma 재확인으로 정정) |
| tag-chip | COMPONENT-10. 필터 칩 selected 변형의 ✕(close 세트 `5980:11571`)(2026-10-22 Figma 재확인으로 정정) | 코드 없음 |
| search-autocomplete | `3613:7592` 710×225<br>인터랙션 세트 `5980:12235`(720×250, 행 50, hover `5875:6267`), 모바일 `7091:5772`(342×140, 행 28)(2026-10-22 Figma 재확인으로 정정) | 코드 없음 |
| selection-card | `4266:7628`·`7629` 253×80 | 코드 없음 |
| form-add-button | 인터랙션 `5188:454` 800×60, 모바일 `7578:14703` 342×56<br>`2009:4216` 840×180은 이전 판(2026-10-22 Figma 재확인으로 정정) | 코드 없음 |
| modal | 7종 441×235·radius 40(5.8) | 코드 없음 |
| checkbox | `5946:10027` 24×24, 모바일 `7578:14600` 20×20(5.8.1) | 코드 없음 |

### 5.11 관리자 콘솔 컴포넌트

- Figma 디자인 없음
- shadcn 방식 CSS 변수와 Figma 색·hover·press 순서만 따름
- 크기는 관리자 기준
- 명세: 50-adopt.md ADOPT-05, ADOPT-07

## 6. Iconography & Brand Assets

### 6.1 아이콘 (Figma)

- 노드: Components `아이콘` `2653:6680`, 정렬본 `아이콘_정렬` `8276:15881`
- 정렬본은 모든 아이콘을 24 프레임에 맞춘 것

| 구분 | 크기 | 노드 |
| --- | --- | --- |
| arrow, close, expand_more, check_box, Avatar | 24 | 미확인 |
| add | 24 | `5773:9619` |
| error | 16 | `2653:6682` |
| plus | 16 | `2653:6684` |
| minus | 16 | 미확인 |
| search | 28 | 미확인 |
| 카카오 | 30 | 미확인 |
| chevron | 48(정렬본에서 24로 맞춤) | 미확인 |
| 모바일 close | 16 | 미확인 |
| 모바일 remove, Plus | 24 | 미확인 |
| github | 24 | `4345:8132` |
| slideshare | 25 | 미확인 |

- add(24)는 plus(16)와 별개 아이콘

### 6.2 3D 보라 아이콘

- 노드: `2653:6680` 안 ig_ 1~6
- PNG 한 장을 잘라 씀
- 보라 유리 질감: 명함, 차트, 사람, 말풍선, 문서 돋보기, 막대 차트
- 용도 미확인

| 이름 | 크기 | 노드 |
| --- | --- | --- |
| ig_1 | 51×46 | `7859:13972` |
| ig_2 | 44×46 | `7859:13974` |
| ig_3 | 44×46 | `7859:13978` |
| ig_4 | 44×41 | `7859:13980` |
| ig_5 | 44×41 | `7859:13982` |
| ig_6 | 44×46 | `7859:13988` |

### 6.3 로고

- 노드: Page `370:110`, `370:115`, 무드보드 `370:146`, `370:147`
- 다크·라이트 시안 있음
- 형태: 하늘색 코끼리 + BOAZ 글자
- 로고 파랑은 팔레트에 없음

| 항목 | 크기 | 노드 |
| --- | --- | --- |
| Blog_W | 339×339, 339×122 | 미확인 |
| NoBG | 196×148 | 미확인 |
| TEXT | 251×81 | 미확인 |
| 탭바(상단 메뉴바)용 | 63×20 | `8001:14100` |

### 6.4 캐릭터

- 근거 노드: `283:18`(코끼리 캐릭터 제안), `357:11`(부문별 차별화 아이디어)
- 두 노드 모두 제안 단계
- 부문별 캐릭터 자리: 지름 132 원
- 완성 여부 미확인

### 6.5 무드보드

- 노드: `283:6`
- 참고 색·질감은 4절 Elevation, Motion & Layering 무드보드 방향 메모 참조

### 6.6 코드 에셋

| 항목 | 위치·내용 |
| --- | --- |
| frontend 아이콘 | `frontend/src/shared/assets/icons/*.svg` 약 45개(`ic_*`, 부문 아이콘, 로고 3종) |
| `BOAZ_logo.svg` | `frontend/public/assets/images/`와 `frontend/src/shared/assets/icons/` 두 곳. 동일 여부 미확인 |
| 이미지 | `frontend/src/shared/assets/banner-img`, `conference-banner-img`, `pabicon.webp` |
| 공개 이미지 | `frontend/public/assets/images/{activity,characters,footer,icons}`, `og.png` |
| 형식 | webp 위주 |
| 외부 업체 로고 | `hspace_logo.svg`, `crycheesebuger-logo.svg`. 사용 허락 근거 미확인 |
| frontend_admin 아이콘 | lucide-react 0.487.0(`frontend_admin/package.json:17`) |

### 6.7 Figma에 규정 없음

- 로고 최소 크기·여백
- 다크/라이트 로고 사용 규칙
- 아이콘 선 굵기
- 일러스트 사용 규칙

### 6.8 라이선스

- 글꼴·로고 라이선스 기록 파일이 어디에도 없음

## 7. Design–Code Drift

정리 작업은 50-adopt.md ADOPT-03 참조.

| 항목 | 코드 | 디자인 | 출처·티켓 |
| --- | --- | --- | --- |
| radius 24 | `radius.css.ts` md 24 | 토큰 없음 | `frontend/src/shared/styles/radius.css.ts` |
| 버튼 radius | base 10, round 40, 모바일 medium 4 | Figma 흰 250 버튼 10. 4는 Figma·토큰 모두 없음 | `frontend/src/shared/components/button/button.css.ts:15,35,118` |
| 글꼴 | 본문 Pretendard로 일치. Paperlogy는 모집 위젯만 사용 | Pretendard. Paperlogy는 Figma 텍스트 스타일에 없음 | `frontend/src/shared/styles/font.css.ts:3`, `global.css.ts:16` |
| glass | 그라데이션·마스크 보더·그림자 2겹 | 단색 rgba 하나 | `frontend/src/shared/styles/glass.css.ts:1-52` |
| frontend_admin `--primary` | #ef4444(빨강) | #6250C7(`purple.200`) | `frontend_admin/src/app/styles/theme.css:10`, ADOPT-05-02 |
| 버튼 press | `:active` 없음 | brand #2C2459, neutral #666666 | `frontend/src/shared/components/button/button.css.ts:59-89`, ADOPT-03-01 |
| 흰 버튼 hover | grayscale[100] #E6E6E6 | #999999 | `frontend/src/shared/components/button/button.css.ts:80`. 명세는 코드(라이브) 값 채택(2026-10-22), 정리 대상 아님 |
| disabled | primary 배경 #999999·글자 흰색, white 배경 #333333, outlined·glass는 disabled 없음 | 배경 #666666·글자 #999999 | `frontend/src/shared/components/button/button.css.ts:63-67,81-84`. 명세는 primary·white 코드(라이브) 값 채택(2026-10-22). glass disabled 추가만 ADOPT-03-03 |
| 박스 탭 hover | 비활성 hover 배경 grayscale[600] | Figma에 hover 없음(흰 바탕은 selected 전용, reactions ON_CLICK만 `5639:10001`). 명세는 코드와 같은 #666666 + 흰 글자(2026-10-22 Figma 재확인으로 정정) | `frontend/src/shared/components/fixed-tab/fixed-tab.css.ts:42-47`. 명세는 코드(라이브) 값 #666666 + 검정 글자 채택(2026-10-22), 정리 대상 아님 |
| 체크박스 색 | `accentColor: '#7964F9'`(오타) | #7A64F9 | `frontend/src/widgets/apply/ui/agreement-step/agreement-step.css.ts:78`, ADOPT-03-05 |
| Text 1 굵기 | `text_rg_14` 400(fontWeight에 300 없음, 약 28곳) | 300 | `frontend/src/shared/styles/typography.css.ts:168-173`, `font.css.ts:26-31`. 명세는 라이브 값 14/400을 `raw:14px/400`으로 채택(2026-10-22), 정리 대상 아님 |
| Body 4 Paragraph 행간 | lineHeight.card 1.6 = 28.8px | 30px | `frontend/src/shared/styles/typography.css.ts:119-124`, `font.css.ts:37`, ADOPT-03-08 |
| 쓰지 않는 스타일 | `display1_bd_80`, `h1_md_40`(참조 0건), `form-header` 폴더(참조 여부 미확인) | 해당 없음 | `frontend/src/shared/styles/typography.css.ts:7,39`, ADOPT-03-06 |
| 프로젝트 썸네일 radius | 16 | 20 | `frontend/src/shared/components/archive/project-card.css.ts:45,52` |
| 활동사진 hover | 보더 + 그라데이션 | 그라데이션 바탕·보더(`5236:823`). 0.6은 썸네일 자리 채움(2026-10-22 Figma 재확인으로 정정) | `frontend/src/shared/components/archive/active-card.css.ts:22-32` |
| reduced-motion | 코드 미대응 | PATTERN-03-04 요구 | `frontend/src` 전체 0건 |

## 확인되지 않은 사항

- Paperlogy 글꼴의 공식 출처와 라이선스
- 로고·외부 업체 로고 2종의 사용 허락 근거
- 3D 보라 아이콘의 용도
- 캐릭터 완성 여부
- 간격 메모(gap 20·22·25·34·36)가 가리키는 요소
- 로고 배경 #010413 재확인
- Tailwind 유틸 클래스 이름(`bg-boaz-palette-purple-100` 형태)의 앱 확인
