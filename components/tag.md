---
id: tag
name_ko: 태그
ticket: COMPONENT-13
tier: P1
status: review
figma:
  - "3723:9271"
  - "3723:9272"
  - "5236:886"
  - "7095:10992"
  - "7098:8712"
  - "2682:2355"
  - "2897:6230"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 태그 (tag)

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: 카드의 부문·기수 같은 분류 값을 보여 주는 읽기 전용 라벨. 누르거나 선택하는 동작이 없음
- 구성: variant 1종(outline). 부문 태그("엔지니어링")와 기수 태그("24기")는 글자만 다른 같은 컴포넌트임
- 사용 화면: 아카이빙 프로젝트·블로그·활동사진 카드
- 관련 명세: `components/card.md`(카드 안 tags 슬롯, COMPONENT-08), `components/filter-chip.md`(필터 칩, COMPONENT-09), `components/tag-chip.md`(선택값을 지우는 칩, COMPONENT-10), `patterns/accessibility.md`(PATTERN-03)
- 경계
  - tag: 읽기 전용. 상호작용 없음
  - filter-chip: 필터 값을 고르는 트리거. 누르면 목록이 열림
  - tag-chip: 선택된 값을 ✕로 지우는 칩
  - 검색 Tag 버튼 mini: 옛 시안 요소라 명세에 두지 않음(3절 끝)

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | `<span>`. 바탕 없음, 1px 보더, 알약형 | 보더 `color.stroke.neutral` (#999999) 1px, `radius.md` (20px) |
| label | ○ | 한 줄 글자. 줄바꿈하지 않음 | `raw:14px/400`, 모바일 `raw:12px/400`, `color.palette.gray.100` (#E6E6E6) |

- 아이콘 슬롯 없음. Figma 태그 2종 모두 글자만 있음(Figma 3723:9271, Figma 3723:9272)

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |
| outline | 부문·기수 분류 표시. 투명 바탕 + 회색 보더 + 밝은 회색 글자 | Figma 3723:9271, Figma 3723:9272 |

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |
| default | 높이 25, 폭은 글자에 맞춤 | 높이 20, 폭은 글자에 맞춤 | `radius.md` (20px) | 데스크톱 `raw:4.5px` / `spacing.3` (12px)<br>모바일 `raw:3px` / `spacing.2` (8px) | `raw:14px/400` / 모바일 `raw:12px/400` | 코드 `src/shared/components/tag/tag.css.ts` |

- padding 값 순서: 세로 / 가로
- 값 기준(2026-10-22 라이브 기준으로 정정): 아카이빙 카드 태그는 라이브 사이트에 있어 라이브 값(= frontend 코드 값)을 씀
  - 데스크톱: 높이 25(패딩 4.5×2 + 글자 행간 14 + 보더 1×2), 14 Regular
  - 모바일: 높이 20(패딩 3×2 + 글자 행간 12 + 보더 1×2), 12 Regular
  - 이전 명세 값(Figma 데스크톱 4·12 패딩·높이 26·14 Light, 모바일 12 Light)은 기록용
- 글자: 14/400·12/400은 `typography.text-1` (14/300)·`typography.text-1-mobile` (12/300)과 굵기가 달라 `raw:`로 적음. 토큰 추가는 별도 이슈
- 태그 여러 개를 나란히 둘 때 간격은 카드 명세가 정함(`components/card.md` 2절)

### 검색 Tag 버튼 mini(명세에 두지 않음)

- 옛 시안 요소. 최신 화면(4817:*)·Mobile·최종 수정사항 페이지에 없고, 옛 아카이빙 화면(Figma 1161:3363)과 기술 블로그 화면(Figma 572:174, Figma 928:646)에만 있음. 현재는 필터 칩과 검색줄이 대신함
- tag variant로도, `components/button.md` size로도 두지 않음. 남은 노드: FE 회의용 Figma 2682:2355·2897:6230, Radius 시트 Figma 1728:3650

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰 순서임.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | — / `color.palette.gray.100` (#E6E6E6) / `color.stroke.neutral` (#999999) 1px | rest 유지 | rest 유지 | — | 코드 `src/shared/components/tag/tag.css.ts`, Figma 5236:886 |

- 읽기 전용이라 hover·press에 색 변화 없음. 카드 hover 때도 태그는 그대로임(Figma 5236:886, 블로그 카드 Hover 변형 안 태그)
- 포커스 트리거: 해당 없음. 포커스를 받지 않음
- 비동기 상태: 해당 없음. 값은 카드 데이터와 함께 그려짐
- disabled·selected·invalid·completed 행은 두지 않음. 상호작용이 없는 라벨이라 해당 상태가 없음

## 5. Behavior

- 클릭·탭: 동작 없음. `cursor: pointer`를 쓰지 않음. 카드 전체 링크 안에 있으면 카드 링크의 클릭 영역에 포함됨(`components/card.md` 5절)
- 키보드: Tab 순서에 들어가지 않음(`tabindex` 없음)
- 포커스 이동·복귀: 해당 없음
- 비동기 중 동작: 해당 없음
- 글자가 길 때: 줄바꿈하지 않고 한 줄로 늘어남. 부문 이름은 최대 "엔지니어링"(5자)이라 말줄임을 정의하지 않음

### 전환

해당 없음. 상태 변화가 없음

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 해당 없음

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성(2026-10-22 라이브 기준으로 정정)
  - 높이: 25 → 20
  - 글자: `raw:14px/400` → `raw:12px/400`
  - 패딩: 세로 `raw:4.5px` → `raw:3px`, 가로 `spacing.3` (12px) → `spacing.2` (8px)
  - radius: `radius.md` 유지
  - 보더: 데스크톱과 같음(`color.stroke.neutral` 1px, 불투명도 없음)
- Figma 모바일 노드(기록용)
  - 부문 태그(프로젝트 카드): Figma 7095:10992
  - 블로그 카드 태그: Figma 7098:8712

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | `<span>`(일반 글자). `<button>`·`<a>`로 만들지 않음. 별도 role 없음 | Figma 없음(추정) |
| 키보드 | 포커스 대상 아님 | Figma 없음(추정) |
| aria | 보이는 글자가 그대로 읽힘. 의미 보충이 필요하면 카드 쪽에서 목록(`<ul>`)으로 묶거나 시각적으로 숨긴 앞말("부문", "기수")을 붙임 | Figma 없음(추정) |
| 대비 | 기준: 글자 4.5:1<br>글자 `color.palette.gray.100` (#E6E6E6) / 검정 캔버스 #000000: 16.83<br>같은 글자 / 카드 바탕 `color.bg.layer` (#1A1A1A): 13.94, 카드 hover 효과 A 위 10.56 이상(`components/card.md` 7절, 2026-10-22 라이브 기준으로 정정)<br>보더 `color.stroke.neutral` (#999999) / #000000: 7.37(장식, 기준 대상 아님) | 계산값(WCAG 상대 휘도) |
| 터치 영역 | 해당 없음. 누르는 대상이 아님 | WCAG 2.2 2.5.8 |
| 포커스 링 | 해당 없음. 포커스를 받지 않음 | Figma 없음(추정) |
| 비활성 표시 | 해당 없음 | Figma 없음(추정) |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| 태그는 읽기 전용 `<span>` | 태그를 `<button>`으로 마크업하거나 `cursor: pointer` 적용 |
| 분류 값 표시는 tag(#999999 1px 보더, 14 Regular #E6E6E6, 높이 25) | 분류 값 표시에 옛 검색 Tag 버튼 mini(흰 1px 보더, 22 Medium, 97×43) 모양 사용 |
| 누르는 동작이 필요하면 `components/button.md`의 버튼 사용 | tag에 hover·press 색을 붙여 버튼처럼 보이게 함 |
| 필터 값을 고르는 칩은 `components/filter-chip.md`, 선택값 지우기는 `components/tag-chip.md` | tag에 ✕ 아이콘을 넣어 지우기 동작에 사용 |
| 데스크톱 패딩 4.5·12, 모바일 3·8(높이 20) | WBS 초안 값 3·12 사용 |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/components/tag/tag.tsx`, `src/shared/components/tag/tag.css.ts` | `<span>` 사용. `src/shared/components/archive/project-card.tsx`에서 부문·기수 태그로 사용 |
| frontend 차이 | 위와 같음 | 수정 예정. 명세와 다른 점(라이브 값을 명세로 채택한 글자·패딩·높이 항목은 2026-10-22 라이브 기준으로 정정하며 삭제)<br>- `cursor: pointer`(ADOPT-03-15)<br>- photo 카드 기수 태그가 `<button>`(`components/card.md` 9절, ADOPT-03-15) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-06(카드·태그·배지), 값은 ADOPT-05 기준 |
| FE 이름 ↔ 명세 이름 | `src/shared/components/button/button.tsx` | `mini_outlined` ↔ 명세에 없음(옛 검색 Tag 버튼 mini, 3절 끝) |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |
| 25px / 20px | 태그 높이(데스크톱 / 모바일) | 코드 `src/shared/components/tag/tag.css.ts` | 불필요 |
| `raw:4.5px`, `raw:3px` | 세로 패딩(데스크톱 / 모바일) | 코드 `src/shared/components/tag/tag.css.ts` | 불필요 |
| `raw:14px/400`, `raw:12px/400` | 글자(데스크톱 / 모바일). `typography.text-1`·`typography.text-1-mobile`은 굵기 300 | 코드 `src/shared/components/tag/tag.css.ts` | 필요 여부 별도 이슈 |

## 11. 미확인

- 해당 없음. Figma 미확인 항목(모바일 기수 태그 폭, 모바일 블로그 태그 글자색)은 라이브 값 채택으로 해소됨(2026-10-22 라이브 기준으로 정정)
