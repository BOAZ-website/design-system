---
id: button                  # 파일 이름과 같은 kebab-case
name_ko: 버튼
ticket: COMPONENT-01        # WBS 티켓 키
tier: P0                    # P0 | P1
status: draft               # draft | review | stable (전이 조건은 docs/wbs/30-component.md)
figma:                      # Figma 노드 ID 목록. 링크·파일 키·캡처는 적지 않음
  - "5875:9827"
figma_verified: false       # Figma를 직접 열어 확인했으면 true
tokens_version: v0.1.1      # 이 명세가 기준으로 삼은 토큰 태그
owner: 명세 담당            # 역할명(CONTRIBUTING.md 역할 표). 실명 금지
last_updated: 2026-10-22    # YYYY-MM-DD. 명세를 고치는 PR이 갱신
---

# {name_ko} ({id})

> 표기 규칙
> - 토큰은 전체 경로를 백틱으로 감싸고 hex를 괄호로 병기함: `color.bg.brand-solid` (#7A64F9)
> - 글자는 `typography.body-2`처럼 토큰 이름으로 씀. Figma 스타일 이름(`Body 2`)은 쓰지 않음
> - 시맨틱이 없는 색은 팔레트 경로로 씀: `color.palette.gray.100`
> - 토큰에 없는 값은 `raw:12px`처럼 쓰고 "비토큰 값" 절에 근거를 적음
> - "근거" 열은 `Figma <노드ID>` · `Figma 없음(추정)` · `코드 <경로>` · `design-reference <절>` 네 가지만 씀. 예외: 7절 "대비" 행은 `docs/wbs/20-token.md` 대비표 행 또는 직접 계산한 대비값을 적음
> - 해당 없는 칸은 `—`, 해당 없는 절은 "해당 없음"과 이유 한 줄
> - 문체는 개조식 명사형 종결(`~함`, `~됨`)

## 1. 개요

- 용도: {한 줄}
- 사용 화면: {공개 홈페이지 페이지 이름. 3곳을 넘으면 "전 화면"}
- 관련 명세: {`components/*.md`, `patterns/*.md` 상대 경로}

## 2. Anatomy

| 슬롯 | 필수 | 설명 | 적용 토큰 |
| --- | --- | --- | --- |
| root | ○ | | |
| label | ○ | | |
| icon-start | × | | |

## 3. Variants·Sizes

### Variants

| variant | 용도 | 근거 |
| --- | --- | --- |

### Sizes

| size | 데스크톱(px) | 모바일(px) | radius | padding | 글자 | 근거 |
| --- | --- | --- | --- | --- | --- | --- |

## 4. States

행은 기본 상태, 열은 상호작용. 셀은 `bg / fg / stroke` 토큰. `hover-selected`처럼 두 상태를 합친 이름을 만들지 않고 selected 행의 hover 칸에 적음.

| 기본 상태 | rest | hover | press | focus-visible | 근거 |
| --- | --- | --- | --- | --- | --- |
| default | | | | | |
| disabled | | — | — | — | |
| selected | | | | | |
| invalid | | | | | |
| completed | | | | | |

- 포커스 트리거: {`:focus-visible` | `:focus-within` | 해당 없음}
- 비동기 상태(pending·loading): {해당 없음 | 상태를 정의하고 `Figma 없음(추정)`을 표시함. `aria-busy`·중복 제출 방지는 5절에 적음}
- 해당 없는 기본 상태 행은 지우고 아래에 이유를 한 줄로 적음

## 5. Behavior

- 클릭·탭:
- 키보드:
- 포커스 이동·복귀:
- 비동기 중 동작(중복 제출 방지, `aria-busy`):

### 전환

| 대상 속성 | 시간 | easing | 근거 |
| --- | --- | --- | --- |
| background-color, border-color, color | 0.2s | ease-in-out | design-reference 4.3 |

- reduced-motion(사용자가 동작 줄이기를 설정한 경우): 전환을 제거함(`patterns/accessibility.md` PATTERN-03-04)

## 6. 반응형

- 기준: 모바일 ≤768px, 데스크톱 ≥1366px, 769~1365px는 기본 스타일(design-reference 3.3)
- 모바일에서 바뀌는 속성(크기·`typography.*-mobile`·간격·줄바꿈):
- Figma 모바일 노드:

## 7. Accessibility

| 항목 | 요구 | 근거 |
| --- | --- | --- |
| role | | |
| 키보드 | | |
| aria | | |
| 대비 | 글자 4.5:1, 큰 글자·UI 요소 3:1. 조합과 값: | `docs/wbs/20-token.md` 대비표 행 또는 계산값 |
| 터치 영역 | 최소 24×24(WCAG 2.2 2.5.8). 모바일 권장 44×44 | |
| 포커스 링 | `color.stroke.focus`(검정 캔버스 위) / `color.stroke.focus-inverse`(흰 표면 위), 2px, offset 2px | |
| 비활성 표시 | 네이티브 요소는 `disabled`, 그 밖은 `aria-disabled="true"`(색만으로 구분되지 않음) | |

## 8. Do / Don't

| Do | Don't |
| --- | --- |
| | |

## 9. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/...`(저장소 `BOAZ-website/frontend` 기준. 줄 번호 금지) | 없으면 `없음` |
| frontend_admin | | 관리자 콘솔은 이 명세를 따르지 않음. 대응하는 ADOPT-07 티켓 번호와 "값은 ADOPT-05 기준"만 적음 |
| FE 이름 ↔ 명세 이름 | | variant·size가 FE 합의 이름과 다를 때만 |

## 10. 비토큰 값

`raw:`로 쓴 값과 모션·z-index·아이콘 크기 등 토큰 범위 밖 값을 모음.

| 값 | 위치 | 근거 | 토큰 추가 필요 여부 |
| --- | --- | --- | --- |

## 11. 미확인

- {Figma 확인이 필요해 비워 둔 칸과 노드 ID. 비어 있으면 "없음"}
