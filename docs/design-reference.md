# 디자인 참조

디자인팀 Figma(공개 홈페이지, 검정 바탕 기준)와 홈페이지·관리자 코드에서 확인한 디자인 값을 기록한 참조 문서임. 기준일 2026-10-11.
토큰으로 정식화된 값의 기준은 `tokens/`와 `docs/wbs/20-token.md`이고, 이 문서는 원본 기록임. 서로 다르면 토큰이 우선.
각 값 옆에 출처(Figma 노드 ID 또는 코드 `저장소/경로:줄`)를 적음. 확인되지 않은 값은 "미확인"으로 표시.

## 1. 색

### 1.1 정식 색 17종

- 출처: Components 페이지 색 시트 `2432:5247`
- 16종은 `tokens/color/palette.json`과 값이 동일함
- 17번째 Primary-press-Purple #2C2459는 Figma 색 스타일로 등록되어 있으나(20-token.md "Figma 원본 값" 절) palette.json에는 아직 없음(TOKEN-01-01에서 `purple.400`으로 추가 예정, 사용처 COMPONENT-01-03)
- 토큰 경로는 palette.json의 현재 이름 기준(TOKEN-01-04에서 `gray.white`→`gray.0`, `gray.black`→`gray.1000`, `red.200`→`red.900`로 변경 예정)

| Figma 이름 | hex | 토큰 경로(현재) | 주 용도 |
| --- | --- | --- | --- |
| White | #FFFFFF | `color.palette.gray.white` | 흰 버튼·모달·푸터 배경, 기본 글자 |
| Gray100 | #E6E6E6 | `color.palette.gray.100` | 관리자 구분선 |
| Gray200 | #CCCCCC | `color.palette.gray.200` | 보조 글자(`fg.neutral`) |
| Gray300 | #B3B3B3 | `color.palette.gray.300` | 관리자 비활성 |
| Gray400 | #999999 | `color.palette.gray.400` | 흐린 글자(`fg.muted`), FAQ 보더 |
| Gray600 | #666666 | `color.palette.gray.600` | 모달 설명 글자, 비활성 배경 |
| Gray800 | #333333 | `color.palette.gray.800` | 대상 카드 배경, 약한 선 |
| Gray900 | #1A1A1A | `color.palette.gray.900` | 카드·레이어 배경, 후기 카드 |
| Gray950 | #0D0D0D | `color.palette.gray.950` | 미확인 |
| Black | #000000 | `color.palette.gray.black` | 홈페이지 바탕 |
| Error-red | #F96466 | `color.palette.red.100` | 오류 글자·선 |
| Error-bg-red | #190A0A | `color.palette.red.200` | 오류 배경 |
| Primary-purple | #7A64F9 | `color.palette.purple.100` | 브랜드, 주 버튼 |
| Primary-subtle-purple | #6250C7 | `color.palette.purple.200` | 관리자 주 버튼 |
| Primary-hover-purple | #493C95 | `color.palette.purple.300` | 버튼 hover |
| Primary-press-purple | #2C2459 | 없음(`purple.400` 추가 예정) | 버튼 press |
| sub-lightblue | #68CBEC | `color.palette.lightblue.100` | 포커스 링, 강조 글자 |

### 1.2 미등록 단계 초안

- 출처: FE 회의용 페이지 ColorToken 섹션 `2229:4392`
- 정식 스타일이 아니며 토큰에 넣지 않음

| 항목 | 값 | 출처 |
| --- | --- | --- |
| 보라 11단계 | #000000, #070227, #100358, #190589, #2207BB, #2B09EC, #4E31F7, #7A64F9, #A293FB, #CCC4FD, #F7F5FF | `2229:4313` |
| 파랑 11단계 | #000000, #020F27, #032158, #053489, #0746BB, #0958EC, #3176F7, #6498F9, #93B7FB, #C4D8FD, #F5F8FF | `2229:4307` 안 사각형 80~91 |
| 회색 11단계 | #000000, #1A1A1A, #333333, #4D4D4D, #666666, #808080, #999999, #B3B3B3, #CCCCCC, #E6E6E6, #FFFFFF | 노드 미확인 |
| 불투명도 단계 | 검정 1·0.8·0.6·0.4·0.2·0, 흰색 0.2·0.4·0.6·0.8·1 | `2229:4337`, `2229:4361` |
| 로고 배경 | #010413(팔레트에 없음) | 무드보드 `370:146`, `370:147` |

- 회색 11단계 중 정식에 없는 값: #4D4D4D, #808080
- 로고의 파랑은 로고 파일 전용이라 토큰으로 두지 않음(20-token.md TOKEN-05-06)

### 1.3 홈페이지 색 역할 (검정 바탕)

- 시맨틱 토큰: 20-token.md TOKEN-05
- 대비표: 20-token.md "대비표(WCAG 2.2 AA)" 절

### 1.4 관리자 콘솔 색 역할 (흰 바탕)

- 출처: 50-adopt.md ADOPT-05(2026-10-11 결정)

| 용도 | 값 | 대비 |
| --- | --- | --- |
| 바탕·카드·팝업·입력 | #FFFFFF | 기준 |
| 구분선 | #E6E6E6 | 해당 없음 |
| 본문 | #1A1A1A | 흰 17.40 |
| 보조 글자·입력 테두리 | #666666 | 흰 5.74 |
| 비활성 | #B3B3B3 | 적용 제외 |
| 주 버튼 | #6250C7 | 흰 글자 6.01 |
| 주 버튼 hover | #493C95 | 흰 글자 8.88 |
| 포커스 링 | #6250C7 2px + 흰 간격 2px | 흰 위 6.01 |

#### Figma 밖 값 7개

- 관리자 `theme.css`에만 둠
- 디자인팀 값이 생기면 교체

| 용도 | 글자 | 바탕 |
| --- | --- | --- |
| 보조 면 | 해당 없음 | #F5F5F5 |
| 위험 | #C92A2D(흰 5.45) | #FFF3F3 |
| 성공 | #047857(흰 5.48) | #ECFDF5 |
| 경고 | #B45309(흰 5.02) | #FFFBEB |

### 1.5 흰 바탕 대비표

기준: 일반 글자 4.5:1.

| 전경 | 흰 #FFFFFF | #F5F5F5 | 해당 색 바탕 | 판정 |
| --- | --- | --- | --- | --- |
| #666666 | 5.74 | 5.27 | 해당 없음 | 통과 |
| #999999 | 2.85 | 미확인 | 해당 없음 | 글자·입력 테두리 불가 |
| #F96466 | 2.98 | 미확인 | 해당 없음 | 불가 |
| #7A64F9 | 4.18 | 미확인 | 해당 없음 | 작은 글자 불가 |
| 흰 글자 | 해당 없음 | 해당 없음 | #7A64F9 위 4.18 | 큰 글자만 |
| #68CBEC | 1.85 | 미확인 | 해당 없음 | 장식만 |
| #C92A2D | 5.45 | 5.00 | #FFF3F3 위 5.03 | 통과 |
| #047857 | 5.48 | 5.03 | #ECFDF5 위 5.21 | 통과 |
| #B45309 | 5.02 | 4.61 | #FFFBEB 위 4.84 | 통과 |
| #6250C7 포커스 링 | 6.01 | 미확인 | #6250C7 버튼 위 1.00 | 흰 간격 2px 필수 |

### 1.6 상태 표시 규칙

- 상태는 색만으로 구분하지 않음
- 색각 이상 시뮬레이션에서 성공·위험·경고가 거의 같은 색으로 보임
- 아이콘과 문구를 함께 표시

## 2. 타이포

### 2.1 Figma 기준

| 항목 | 값 | 출처 |
| --- | --- | --- |
| 글꼴 | Pretendard | 20-token.md "Figma 원본 값" 절 |
| 텍스트 스타일 12종·모바일 3종 | 표 복사 없음 | 20-token.md "Figma 원본 값" 절, TOKEN-02-06 |

### 2.2 코드 실제

| 항목 | 값 | 출처 |
| --- | --- | --- |
| frontend 글꼴 | `'Paperlogy', 'Pretendard Variable'` | `frontend/src/shared/styles/font.css.ts:3`, `frontend/index.html:26` |
| Paperlogy 로딩 | 제3자 미러 `fonts-archive`를 jsdelivr로 로딩. 공식 출처·라이선스 미확인 | `frontend/index.html:26` |
| frontend Pretendard | jsdelivr v1.3.9 variable, CDN | `frontend/index.html:12` |
| frontend_admin Pretendard | v1.3.9 static, CDN | `frontend_admin/src/app/styles/fonts.css:1` |
| frontend_admin 추가 글꼴 | Plus Jakarta Sans, JetBrains Mono(Google Fonts) | `frontend_admin/src/app/styles/fonts.css:2`, `frontend_admin/index.html:18` |
| frontend_admin 자간 | 전역 `letter-spacing: -0.015em` | 줄 미확인 |
| frontend 랜딩 글꼴 | Anton | `frontend/public/landing.html:11` |
| 한글 줄바꿈 | `word-break: keep-all` | `frontend/src/shared/styles/global.css.ts:7` |

### 2.3 루트 글꼴

| 앱 | 값 | 출처 |
| --- | --- | --- |
| frontend | `html 62.5%`(1rem = 10px) | `frontend/src/shared/styles/global.css.ts:4` |
| frontend_admin | 14px | `frontend_admin/src/app/styles/theme.css:4` |

- 루트 기준이 달라 토큰 단위는 px(TOKEN-02-04)

### 2.4 코드 전용 값

| 항목 | 값 | 출처 |
| --- | --- | --- |
| fontSize 17종 | 이름 `{역할}_{weight}_{size}` | `frontend/src/shared/styles/font.css.ts:6-24`, `typography.css.ts` |
| lineHeight | tight 1.0, snug 1.2, normal 1.4, card 1.6 | 같은 파일, 줄 미확인 |
| letterSpacing | ±0.02em | 같은 파일, 줄 미확인 |

- 토큰에서 제외(TOKEN-02-05)

## 3. 모양·간격·반응형

### 3.1 radius

| 항목 | 값 | 출처 |
| --- | --- | --- |
| Figma Radius 시트 | 12·20·40 (TOKEN-03) | `1728:3710` |
| 보라 버튼 800×68 | 12 | `5875:9827` |
| 흰 버튼 200×68 | 12 | `5875:9827` |
| 흰 버튼 250×68 | 10(토큰에 없음) | `5875:9827` |
| pill | 40 | `5875:9827` |
| 버튼 130×44 | 20 | `5875:9827` |
| 텍스트 링크 | 10(토큰에 없음) | `5875:9827` |
| 카드 썸네일 | 16 | 노드 미확인 |
| 대상·모집 카드 | 12 | 노드 미확인 |
| 후기 카드 | 10 | 노드 미확인 |
| selection-card | 8 | COMPONENT-15-02 |
| frontend 코드 | xs 12, sm 20, md 24(토큰에 없음), lg 40 | `frontend/src/shared/styles/radius.css.ts` |
| 관리자 입력·버튼 | `rounded-sm` | ADOPT-05 |
| 관리자 카드·표 | `rounded-md` | ADOPT-05 |
| 관리자 팝업 | `rounded-lg` | ADOPT-05 |
| 관리자 금지 | `rounded-xl` 이상 | ADOPT-05 |

### 3.2 spacing

- 토큰: 20-token.md TOKEN-04
- FE 회의용 title 모음 `2229:4306`의 간격 메모: gap 20·22·25·34·36·"21/67..?"
- 위 메모는 라벨만 있고 어느 요소 사이인지 미확인

### 3.3 브레이크포인트

| 구분 | 값 | 출처 |
| --- | --- | --- |
| 모바일 | 768px 이하 | `frontend/src/shared/styles/breakpoints.ts:1-9` |
| 데스크톱 | 1366px 이상 | `frontend/src/shared/styles/breakpoints.ts:1-9` |

- 토큰 범위 밖

## 4. 효과·모션·겹침

### 4.1 높이 표현

- 홈페이지는 그림자 대신 배경 명도 차이(#000000 → #1A1A1A)와 glass로 구분
- Figma에 의미 있는 그림자·blur 없음
- 홈 시안 루트에만 `0 4 4 rgba(0,0,0,0.25)` 존재

### 4.2 glass

| 구분 | 값 | 출처 |
| --- | --- | --- |
| Figma | 지원하기 버튼 배경 rgba(208,207,249,0.1)만 | 탭바 `1866:4188` |
| 코드 | radial·linear 그라데이션 + 1px 마스크 보더, 그림자 2겹, `inset 0 -0.8px` 의사 요소 | `frontend/src/shared/styles/glass.css.ts:1-52` |

- 코드 값이 Figma보다 복잡함

### 4.3 전환

| 대상 | 값 | 출처 |
| --- | --- | --- |
| button | 0.2s ease | `button.css.ts:18-19` |
| radio | transform 0.2s cubic-bezier(0.4,0,0.2,1) | `radio-button.css.ts:32,42` |
| pagination | 0.2s ease | `pagination.css.ts:67` |
| fixed-tab | 0.2s ease | `fixed-tab.css.ts:23` |
| login-overlay | opacity 0.2s | `login-overlay.css.ts:6,28` |
| blogcard | 0.3s | `blogcard.css.ts:17` |
| progress-bar | 0.1s | `progress-bar.css.ts:18` |
| accordion | 상수 `ACCORDION_DURATION_MS`(값 미확인) | 파일 미확인 |

- 경로 기준: `frontend/src/shared/components/` 하위 각 컴포넌트 폴더(button 외 폴더명은 파일명과 동일 추정)

### 4.4 배경 장식

- 출처: `gradient-background.css.ts:91-143`
- blur(180px) 레이어
- keyframes 3종(moveInCircle, moveVertical, moveHorizontal), 20~40s
- `prefers-reduced-motion` 대응 필요(PATTERN-03-04)

### 4.5 무드보드 방향 메모

- 출처: Page `283:6`, `283:18`, `500:217`

| 항목 | 내용 |
| --- | --- |
| 스크롤 효과·모션 | 랜딩 페이지만 허용 |
| 나머지 페이지 | 과한 효과 자제 |
| 탭바 | 항상 노출 |
| 커리큘럼 | 모바일 때문에 세로 타임라인 |
| 상단 메뉴바 | hover 시 배경 흰색 |

### 4.6 z-index (frontend)

| 대상 | 값 | 출처 |
| --- | --- | --- |
| icon | 1 | `zIndex.css.ts` |
| button | 2 | `zIndex.css.ts` |
| modal | 3 | `zIndex.css.ts` |
| dropdown | 100 | `dropdown.css.ts:35` |
| login-overlay | 1000 | `login-overlay.css.ts:6` |
| gradient | 0~12 | `gradient-background.css.ts` |

- 체계 없이 흩어져 있음

## 5. 컴포넌트 (홈페이지)

상태 규칙(brand·neutral 상태값, focus-visible)은 30-component.md 참조.

### 5.1 버튼

- 노드: `버튼` `2897:6164`, `최종_버튼UI` `2682:2297`, 인터렉션 `5875:9827`
- 코드: `frontend/src/shared/components/button/button.css.ts:114-152`

| 항목 | 값 | 출처 |
| --- | --- | --- |
| Figma 크기 | 800×68, 250×68, 200×68, 250×56, 180×56, 154×44, 130×44, mini(검색 Tag 97×43) | `2682:2297`, `2897:6164` |
| 180×56 | "사전 알림 신청" 버튼. Figma에 "예외…" 라벨 | `2897:6164` |
| FE 합의 이름 | large-round, large-white, medium-round, medium, medium-primary, medium-white, small-round, mini | FE 회의용 `2897:6164` 라벨 |

- 이름과 크기의 대응은 Figma 라벨만으로 확정할 수 없어 COMPONENT-01-05에서 정함

- 이전/다음 페이지 텍스트 버튼: 24 Bold 흰 글자 + 24 화살표, 간격 10
- 모바일 `Button_Components_Mobile`(`7064:14053`): 112×36, 342 폭. 나머지 값 미확인

### 5.2 탭바

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
- 코드: `active-card.css.ts:18,35-113`, `project-card.css.ts:17,126`, `blogcard.css.ts:17`(transition 0.2s/0.3s)

| 카드 | 크기 | 모양·색 |
| --- | --- | --- |
| 프로젝트 | 333×350 | radius 20, 썸네일 radius 20 |
| 블로그 | 929×278 | 보더 2px, 썸네일 16 |
| 활동사진 | 미확인 | hover 오버레이 rgba(255,255,255,0.6), 높이 250 |
| 대상 | 300×270 | #333333, radius 12 |
| 모집 | 310×404 | 흰색, radius 12, 캐릭터 이미지 불투명도 0.8 |
| FAQ | 840×100 | 하단 보더 0.5px #999999 |
| 후기 | 500×208 | #1A1A1A, radius 10, 이름 20 Bold, 기수 18 Bold 보라 |

### 5.5 텍스트 필드

- 명세: 30-component.md COMPONENT-02
- 노드: 인터렉션 `5152:8908`, 모바일 `7578:14642`
- 코드: `textfield.css.ts:20,31`, 글자 수 카운터 `text-counter.css.ts:11`

### 5.6 select / 드롭다운

| 항목 | 값 | 출처 |
| --- | --- | --- |
| 메뉴 그림자 | `1rem 1rem 2rem rgba(0,0,0,.25)` | `dropdown.css.ts:35,43,60` |
| 열림 | 0.2s | `dropdown.css.ts:35,43,60` |
| z-index | 100 | `dropdown.css.ts:35` |
| 필드 | 미확인 | `dropdownField.css.ts:16` |
| 모바일 칩 높이 | 28 | 노드 미확인 |

### 5.7 탭

- 명세: 30-component.md COMPONENT-06
- 노드: 인터렉션 `5915:7015`, 모바일 `7064:14044`
- 코드: `fixed-tab.css.ts:23-26`

### 5.8 모달

- 명세: 30-component.md COMPONENT-07
- 노드: `4412:7387`
- frontend에 모달 컴포넌트 코드 없음(z-index 3만 존재)

### 5.9 기타 컴포넌트

| 컴포넌트 | 코드 |
| --- | --- |
| 체크박스 | frontend에 컴포넌트 코드 없음 |
| 라디오 | `radio-button.css.ts` |
| pagination | `pagination.css.ts:15-68` |
| progress-bar | `progress-bar.css.ts:18` |

### 5.10 관리자 콘솔 컴포넌트

- Figma 디자인 없음
- shadcn 방식 CSS 변수와 Figma 색·hover·press 순서만 따름
- 크기는 관리자 기준
- 명세: 50-adopt.md ADOPT-05, ADOPT-07

## 6. 에셋

### 6.1 아이콘 (Figma)

- 노드: Components `아이콘` `2653:6680`, 정렬본 `아이콘_정렬` `8276:15881`
- 정렬본은 모든 아이콘을 24 프레임에 맞춘 것

| 구분 | 크기 |
| --- | --- |
| arrow, close, expand_more, check_box, add, error, Avatar | 24 |
| search | 28 |
| 카카오 | 30 |
| plus, minus | 16 |
| chevron | 48(정렬본에서 24로 맞춤) |
| 모바일 close | 16 |
| 모바일 remove, Plus | 24 |
| github | 24 |
| slideshare | 25 |

### 6.2 3D 보라 아이콘

- 노드: `2653:6680` 안 ig_ 1~6, 44×46
- 보라 유리 질감: 명함, 차트, 사람, 말풍선, 문서 돋보기, 막대 차트
- 용도는 부문 소개로 보이나 미확인

### 6.3 로고

- 노드: Page `370:110`, `370:115`, 무드보드 `370:146`, `370:147`
- 다크·라이트 시안 있음

| 항목 | 크기 |
| --- | --- |
| Blog_W | 339×339, 339×122 |
| NoBG | 196×148 |
| TEXT | 251×81 |
| 탭바용 | 63×20 |

### 6.4 캐릭터

- 무드보드 메모 `283:18`에 코끼리 캐릭터 제안
- 부문별 캐릭터 자리: 지름 132 원
- 완성 여부 미확인

### 6.5 코드 에셋

| 항목 | 위치·내용 |
| --- | --- |
| frontend 아이콘 | `frontend/src/shared/assets/icons/*.svg` 약 45개(`ic_*`, 부문 아이콘, 로고 3종) |
| `BOAZ_logo.svg` | `public/assets/images/`와 `src/shared/assets/icons/` 두 곳. 동일 여부 미확인 |
| 이미지 | `src/shared/assets/banner-img`, `conference-banner-img`, `pabicon.webp` |
| 공개 이미지 | `public/assets/images/{activity,characters,footer,icons}`, `og.png` |
| 형식 | webp 위주 |
| 외부 업체 로고 | `hspace_logo.svg`, `crycheesebuger-logo.svg`. 사용 허락 근거 미확인 |
| frontend_admin 아이콘 | lucide-react 0.487.0(`frontend_admin/package.json:17`) |

### 6.6 라이선스

- 글꼴·로고 라이선스 기록 파일이 어디에도 없음

## 7. 코드와 디자인 불일치

정리 작업은 50-adopt.md ADOPT-03 참조.

| 항목 | 코드 | 디자인 |
| --- | --- | --- |
| radius 24 | `radius.css.ts` md 24 | 토큰 없음 |
| 버튼 radius 10 | 토큰 없음 | Figma 흰 250 버튼 10 |
| 글꼴 | Paperlogy | Pretendard |
| glass | 그라데이션·마스크 보더·그림자 2겹 | 단색 rgba 하나 |
| frontend_admin `--primary` | #ef4444(빨강). ADOPT-05에서 보라로 변경 예정 | 보라 |

## 확인되지 않은 사항

- Paperlogy 글꼴의 공식 출처와 라이선스
- 로고·외부 업체 로고 2종의 사용 허락 근거
- 3D 보라 아이콘의 용도, 캐릭터 완성 여부
- 간격 메모(gap 20·22·25·34·36)가 가리키는 요소
- 모바일 컴포넌트 프레임의 크기 값
