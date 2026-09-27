# FND 파운데이션 명세서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- Figma에 등록된 색 스타일 17종·텍스트 스타일 12종을 DTCG 토큰으로 옮김
- 팔레트 → 시맨틱 2계층으로 두고, 앱은 시맨틱을 우선 참조하게 함
- Figma에 없거나 Figma 안에서 서로 다른 값(radius, spacing, focus, 모바일 타이포)은 기능 행에 근거를 적고 정한 값을 씀

**범위:** `tokens/**/*.json`, `build/build.mjs`, `dist/` 3종
**범위 밖:** z-index·breakpoint·glass(Figma에 대응 개념 없음, 앱 로컬 유지), 라이트 모드 시맨틱(관리자 콘솔은 팔레트만 사용), elevation·motion(근거 없음, 필요할 때 추가)

### Figma 원본 값

| Figma 색 스타일 | 값 | 토큰 경로 |
| --- | --- | --- |
| Primary-Purple | #7A64F9 | `color.palette.purple.100` |
| Primary-subtle-Purple | #6250C7 | `color.palette.purple.200` |
| Primary-hover-Purple | #493C95 | `color.palette.purple.300` |
| Primary-press-Purple | #2C2459 | `color.palette.purple.400`(신규) |
| Sub-Lightblue | #68CBEC | `color.palette.lightblue.100` |
| White · Gray100~950 · Black | #FFFFFF, #E6E6E6, #CCCCCC, #B3B3B3, #999999, #666666, #333333, #1A1A1A, #0D0D0D, #000000 | `color.palette.gray.{white,100,200,300,400,600,800,900,950,black}` |
| Error-Red · Error-bg-Red | #F96466, #190A0A | `color.palette.red.{100,200}` |

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

## FND-01 팔레트 토큰 확정

**목적:** Figma 색 스타일 17종과 팔레트 토큰을 1:1로 맞춤

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | DS-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| FND-01-01 | `color.palette.purple.400` = #2C2459 추가 | `dist/tokens.css`에 `--boaz-color-palette-purple-400: #2c2459` |
| FND-01-02 | 토큰마다 `$description`에 Figma 스타일 이름 기재 | `tokens/color/palette.json` |
| FND-01-03 | Figma 스타일 17종과 토큰 17개가 모두 대응 | 위 표와 토큰 개수 일치 |

## FND-02 타이포 토큰 12종

**목적:** Figma 텍스트 스타일 12종을 토큰으로 옮김

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | DS-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| FND-02-01 | 원시 스케일: `font.size.*`, `font.weight.*`, `font.line-height.*`, `font.family.base`(Pretendard) | `tokens/typography.json` |
| FND-02-02 | 12종을 `typography.{display, headline-1, headline-2, headline-3, body-1, body-2, body-2-regular, body-3, body-4, body-4-paragraph, body-5, text-1}.{size,weight,line-height}`로 정의하고 원시 스케일을 참조 | `dist/tokens.css`에 `--boaz-typography-headline-3-size` 등 36개 |
| FND-02-03 | DTCG 복합 `typography` 타입은 쓰지 않음(Style Dictionary css 변환이 `font` 단축 문자열로 합치고 자간을 버림) | 토큰 파일에 `"$type": "typography"` 없음 |
| FND-02-04 | 크기 단위는 rem, frontend 기준(html 62.5%, 1rem = 10px)을 README에 명시 | `dist/tokens.css`의 size 값이 rem |
| FND-02-05 | 코드 전용 17종(8·10·12·22·28·32·36·38·80px, 굵기 500·600 등)은 토큰에 넣지 않음. 앱 로컬 예외로 두고 화면을 고칠 때 12종으로 옮김 | 토큰에 12종만 존재 |
| FND-02-06 | 모바일 전용 3종: `typography.body-2-mobile`(16, 600), `typography.body-4-mobile`(15, 400), `typography.text-1-mobile`(12, 300). 나머지는 데스크톱과 같음. 근거: Figma 모바일 버튼·텍스트필드·카드 실측(7064:14053, 7578:14642, 7091:10966). 600은 Figma 정식 스타일이 아니지만 모바일 버튼에 일관되게 쓰임 | `dist/tokens.css`에 `-mobile` 토큰 3종 |

## FND-03 radius 토큰

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | DS-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| FND-03-01 | `radius.sm` 12(사각 버튼·입력), `radius.md` 20(태그·카드·소형 버튼), `radius.full` 40(pill) | `dist/tokens.css`의 `--boaz-radius-*` 3개 |
| FND-03-02 | Figma 실측 근거를 `$description`에 기재(Radius 시트 1728:3710의 12·20·40. 흰 250 버튼의 10은 다른 사각 버튼·Radius 시트와 달라 12로 통일, 카드 라벨 "24 (20)"은 실측 20) | `tokens/radius.json` |
| FND-03-03 | Tailwind 출력 `--radius-boaz-*` | `dist/tailwind-theme.css` |

## FND-04 spacing 토큰

**목적:** Figma에 체계가 없는 간격(패딩 33·21, 28·20, 47·13 등)을 4px 배수 스케일로 정함

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | DS-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| FND-04-01 | `spacing.{1,2,3,4,5,6,8,10,12,16}` = 4·8·12·16·20·24·32·40·48·64px(rem) | `dist/tokens.css`의 `--boaz-spacing-*` 10개 |
| FND-04-02 | Figma 실측값과 가장 가까운 단계 대응표를 명세에 기재. 근거: Figma 패딩이 33·21, 28·20, 47·13 등 체계 없이 쓰여 가장 가까운 4px 단계로 맞춤(8px 배수는 12·20을 표현하지 못함) | 대응표 존재 |

## FND-05 시맨틱 색 토큰

**목적:** 앱이 용도 이름으로 색을 쓰게 함. 다크 테마 전용

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | FND-01 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| FND-05-01 | 배경: `bg.canvas`(#000000), `bg.layer`(#1A1A1A), `bg.surface-inverse`(#FFFFFF, 모달), `bg.brand-solid`·`-hover`·`-press`(purple 100·300·400), `bg.neutral-solid`·`-hover`·`-press`(white·gray 400·600), `bg.disabled`(gray 600) | `tokens/color/semantic.json` |
| FND-05-02 | 글자: `fg.default`(white), `fg.neutral`(gray 200), `fg.muted`(gray 400), `fg.disabled`(gray 400), `fg.on-brand`(white), `fg.on-inverse`(black), `fg.brand`(purple 100), `fg.accent`(lightblue 100), `fg.critical`(red 100) | 같은 파일 |
| FND-05-03 | 선: `stroke.neutral`(gray 400), `stroke.weak`(gray 800), `stroke.brand`(purple 100), `stroke.focus`(lightblue 100. 보라 버튼 위 보라 outline은 대비 1:1이라 쓰지 않음, 검정 배경 11.3:1), `stroke.critical`(red 100) | 같은 파일 |
| FND-05-04 | 모든 시맨틱은 팔레트 참조(hex 직접 기재 없음), `tokens.css`에 `var()` 참조로 출력 | `--boaz-color-bg-brand-solid: var(--boaz-color-palette-purple-100)` |
| FND-05-05 | 주요 글자·배경 조합 대비표(WCAG AA) 기재. `fg.brand` #7A64F9는 #1A1A1A 위 4.16:1로 큰 글자 전용 | 명세의 대비표 |
| FND-05-06 | 브랜드 색은 Figma `Primary-Purple`(보라). 로고의 파랑은 로고 파일 전용이라 토큰으로 두지 않음(Figma의 "블루계열(보아즈 공식 색상)" 메모는 무드보드 단계 레퍼런스 설명) | `color.bg.brand-solid`가 purple 100 참조 |

## FND-06 빌드 보강

**목적:** 타이포·spacing을 세 가지 출력에 모두 내보냄

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | FND-02, FND-04 | 1 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| FND-06-01 | `tailwind-theme.css`: 색 `--color-boaz-*`, radius `--radius-boaz-*`, spacing `--spacing-boaz-*`, 글자 크기 `--text-boaz-*`(행간 `--text-boaz-*--line-height`) | frontend_admin에서 `bg-boaz-palette-purple-100`, `text-boaz-body-3` 유틸 생성 |
| FND-06-02 | `tokens.ts`: `vars` 객체에 모든 토큰의 `var()` 참조 | `vars.typography['headline-3'].size` 존재 |
| FND-06-03 | 참조 깨짐·중복 이름이 있으면 빌드 실패 | 잘못된 참조를 넣으면 `npm run build` 실패 |
