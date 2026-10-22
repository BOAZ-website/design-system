---
id: accessibility
name_ko: 접근성
ticket: PATTERN-03
status: review
figma: []
figma_verified: false     # review 조건의 figma_verified는 해당 없음: Figma 값을 새로 정하지 않고 컴포넌트 명세·20-token 대비표 값을 모은 문서임
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 접근성 (accessibility)

> 표기 규칙은 `components/_template.md` 상단 "표기 규칙"과 같음. 패턴은 여러 컴포넌트에 걸친 사용 규칙이라 값보다 "언제·어떻게"를 적음

## 1. 개요

- 목적: 컴포넌트 명세 8개(Phase 2)의 4·5·7절에 흩어진 포커스 링·대비·비활성·모션·터치 영역 규칙을 한 곳에 모으고, 명세 사이의 차이를 규칙과 예외로 정리함
- 적용 범위: frontend 전 화면(다크 테마 홈페이지). 기준은 WCAG 2.2 AA
- 값의 출처: 각 값은 `components/*.md`가 정함. 이 문서는 값을 새로 정하지 않고 모으며, 충돌하면 컴포넌트 명세를 따름
- 관련 명세: `components/button.md`, `components/text-field.md`, `components/select.md`, `components/checkbox.md`, `components/radio.md`, `components/tab.md`, `components/modal.md`, `components/card.md`, `docs/wbs/20-token.md`(대비표 원본)

## 2. 규칙

### 2.1 PATTERN-03-01 포커스 표시

1. 키보드로 도달하는 모든 요소에 `:focus-visible` 표시를 둠(마우스 클릭에는 나타나지 않음)
2. 전역 `outline: none`을 쓰지 않음. 포커스 표시를 바꾸려면 대체 표시를 같은 규칙에 함께 정의함
3. 굵기 2px, offset 2px. 요소 밖에 그림

| 상황 | 규칙 | 근거 |
| --- | --- | --- |
| 검정 캔버스·`color.bg.layer` 위 | outline `color.stroke.focus` (#68CBEC). 대비 11.34(캔버스), 9.40(layer) | `components/button.md` 4·7절, `components/card.md` 7절 |
| 흰 표면(`color.bg.surface-inverse`, 모달) 위 | outline `color.stroke.focus-inverse` (#7A64F9). 대비 4.18. `color.stroke.focus`는 흰색 위 1.85라 쓰지 않음 | `components/modal.md` 7절, `components/button.md` 7절 |
| 보라 버튼(`color.bg.brand-solid`) | 링을 버튼 안쪽에 그리지 않음. offset 2px로 바깥 캔버스 위에 놓음(안쪽은 2.26로 미달) | `components/button.md` 4절 |
| 숨긴 input(radio) | input이 아니라 보이는 원에 `input:focus-visible + circle`로 그림. 전역 `outline: none`이 input에 걸려도 영향 없게 함 | `components/radio.md` 4·7절 |
| checkbox | input을 숨기지 않고 `appearance: none`으로 그린 input 자체에 outline을 그림. 전문 보기 토글도 각각 그림 | `components/checkbox.md` 2·4절 |
| 카드 | 카드 모서리를 따라 `::after`에 `border-radius: inherit`로 그림. 제목 `<a>` 자체 outline은 지움(링 이중 방지) | `components/card.md` 7절 |
| 텍스트 필드(예외) | outline 대신 아래쪽 보더 `color.stroke.brand` (#7A64F9) 1px + label 이동·축소·`color.fg.brand`. 드롭다운 결합형도 같음 | `components/text-field.md` 7절 |
| select option | 링 없음. 활성 바탕으로 표시(`aria-activedescendant`) | `components/select.md` 7절 |

- 텍스트 필드 예외의 한계: focus 보더와 빈 값 보더의 색 차이가 1.47로 작아 SC 2.4.11(포커스 표시) 단독 충족이 불확실함. 7절 참조

### 2.2 PATTERN-03-02 대비

기준(WCAG 2.2 AA): 본문 글자 4.5:1, 큰 글자(Bold 18.67px 이상 또는 Regular 24px 이상)·UI 요소(보더·아이콘·체크·포커스 링) 3:1. 비활성 요소는 적용 제외.

1. 글자 색 조합은 아래 표의 "사용 규칙"을 따름. "큰 글자 전용"인 조합을 작은 글자에 쓰지 않음
2. `color.fg.brand`는 `color.bg.layer` 위에서 4.16이라 큰 글자 전용, 검정 캔버스 위에서는 5.02로 제한 없음
3. `color.fg.on-brand`는 `color.bg.brand-solid` 위에서 4.18이라 큰 글자 전용. 데스크톱 보라 버튼 글자는 `typography.body-2`(20 Bold) 이상을 씀
4. 새 색 조합을 쓰는 명세는 대비를 계산해 `docs/wbs/20-token.md` 대비표에 추가하는 PR과 함께 올림(TOKEN-05-05)

#### 대비표(`docs/wbs/20-token.md` "대비표"를 옮김, 2026-10-05 계산)

| 전경 | 배경 | 대비 | 판정 | 사용 규칙 |
| --- | --- | --- | --- | --- |
| `color.fg.default` #FFFFFF | `color.bg.canvas` #000000 | 21.00 | 통과 | 제한 없음 |
| `color.fg.neutral` #CCCCCC | `color.bg.layer` #1A1A1A | 10.84 | 통과 | 제한 없음 |
| `color.fg.muted` #999999 | `color.bg.layer` #1A1A1A | 6.11 | 통과 | 제한 없음 |
| `color.fg.muted` #999999 | `color.bg.canvas` #000000 | 7.37 | 통과 | 제한 없음 |
| `color.fg.brand` #7A64F9 | `color.bg.layer` #1A1A1A | 4.16 | 큰 글자만 통과 | 큰 글자 전용 |
| `color.fg.brand` #7A64F9 | `color.bg.canvas` #000000 | 5.02 | 통과 | 제한 없음(text-field 라벨 14px 포함) |
| `color.fg.critical` #F96466 | `color.bg.layer` #1A1A1A | 5.84 | 통과 | 제한 없음 |
| `color.fg.critical` #F96466 | `color.bg.canvas` #000000 | 7.04 | 통과 | 제한 없음 |
| `color.fg.accent` #68CBEC | `color.bg.layer` #1A1A1A | 9.40 | 통과 | 제한 없음 |
| `color.fg.accent` #68CBEC | `color.bg.canvas` #000000 | 11.34 | 통과 | 제한 없음 |
| `color.fg.on-brand` #FFFFFF | `color.bg.brand-solid` #7A64F9 | 4.18 | 큰 글자만 통과 | 보라 버튼 글자는 Bold 18.67px 이상. 데스크톱은 `typography.body-2`(20 Bold). 모바일 `typography.body-2-mobile`(16/600)은 큰 글자가 아니라 미달이나 Figma 값이라 유지(2.2 아래 "명세에서 발견된 미달") |
| `color.fg.on-brand` #FFFFFF | `color.bg.brand-solid-hover` #493C95 | 8.88 | 통과 | 제한 없음 |
| `color.fg.muted` #999999 | `color.bg.brand-solid-press` #2C2459 | 4.90 | 통과 | 보라 버튼 press 글자 |
| `color.fg.on-inverse` #000000 | `color.bg.neutral-solid` #FFFFFF | 21.00 | 통과 | 제한 없음 |
| `color.fg.on-inverse` #000000 | `color.bg.neutral-solid-hover` #999999 | 7.37 | 통과 | 제한 없음 |
| `color.fg.on-inverse` #000000 | `color.bg.neutral-solid-press` #666666 | 3.66 | 큰 글자만 통과 | 일시 상태(누르는 동안). Figma 값 유지 |
| `color.fg.disabled` #999999 | `color.bg.disabled` #666666 | 2.02 | 적용 제외 | 비활성. 기록용 |
| `color.stroke.focus` #68CBEC | `color.bg.canvas` #000000 | 11.34 | 통과 | 포커스 링은 offset 2px로 캔버스 위에 놓임 |
| `color.stroke.focus` #68CBEC | `color.bg.layer` #1A1A1A | 9.40 | 통과 | 카드 포커스 링 |
| `color.stroke.focus` #68CBEC | `color.bg.brand-solid` #7A64F9 | 2.26 | 미달 | 보라 버튼 안쪽에 링을 그리지 않음(offset 2px 필수) |
| `color.stroke.focus` #68CBEC | `color.bg.surface-inverse` #FFFFFF | 1.85 | 미달 | 흰 표면 위에서는 `color.stroke.focus-inverse` 사용 |
| `color.stroke.focus-inverse` #7A64F9 | `color.bg.surface-inverse` #FFFFFF | 4.18 | 통과 | 모달 안 버튼 포커스 링 |
| 모달 설명 글자 `color.palette.gray.600` #666666 | `color.bg.surface-inverse` #FFFFFF | 5.74 | 통과 | COMPONENT-07-01 |
| `color.stroke.weak` #333333 | `color.bg.layer` #1A1A1A | 1.38 | 장식 | 카드 경계를 보더에만 의존하지 않음(배경색 차이로 구분) |

#### 명세에서 발견된 미달(디자이너 확인 목록)

Phase 2 명세가 새로 계산한 조합 중 기준에 못 미치는 항목. 조치는 디자이너 확인 뒤 정하며, 그 전까지 명세 값을 유지함.

| 조합 | 대비 | 기준 | 위치 | 현재 처리 | 근거 |
| --- | --- | --- | --- | --- | --- |
| `color.fg.on-brand` / `color.bg.brand-solid`, 모바일 16/600 글자 | 4.18 | 4.5 | 모바일 brand 버튼 | Figma 값 유지(큰 글자 아님) | `components/button.md` 7·11절 |
| #E6E6E6 / `color.bg.brand-solid`(Figma 모바일 342×52 글자색) | 3.35 | 4.5 | brand-wide 모바일 | 명세는 `color.fg.on-brand` 사용(대비 더 높음) | `components/button.md` 11절 |
| `color.fg.on-inverse` / `color.bg.neutral-solid-press`, 모바일 16 SemiBold | 3.66 | 4.5 | 모바일 neutral 160×44 press | 큰 글자 아니라 미달. Figma 값 유지 | `components/button.md` 7·11절 |
| `color.fg.brand` / `color.bg.layer`, option selected 18 Regular | 4.16 | 4.5 | select option | check 아이콘으로 선택은 전달됨. 글자색 유지 | `components/select.md` 7·11절 |
| `color.fg.brand` / hover 바탕 `color.palette.gray.800`, option selected 18 Regular | 3.02 | 4.5 | select option hover | 위와 같음 | `components/select.md` 7·11절 |
| `color.fg.brand` / `color.bg.layer`, review 카드 기수·부문 18 Bold | 4.16 | 큰 글자 3(18.67px 필요, 0.67px 부족) | card review | 큰 글자 기준 미달. 모바일 14 Bold도 미달 | `components/card.md` 7·11절 |
| 텍스트 필드 focus 보더 / 빈 값 보더 색 차이 | 1.47 | 3(SC 1.4.11·2.4.11 해석에 따름) | text-field focus | 라벨 이동·축소가 함께 일어나 구분됨. 보더 2px 확대 여부 확인 | `components/text-field.md` 7·11절 |
| `color.fg.default` / category 탭 default `color.fg.muted` 글자색 차이 | 2.85 | 3(색 이외 단서 필요, SC 1.4.1) | tab category | 글자색 외 단서 없음. 굵기·아래 선 추가 확인 | `components/tab.md` 7·11절 |
| Figma 탭 모바일 default #666666 / `color.bg.layer` | 3.03 | 4.5 | tab box 모바일 | 명세는 `color.fg.muted`(6.11)로 교체함 | `components/tab.md` 4·11절 |
| `color.fg.muted` / `color.bg.surface-inverse` 모달 설명 | 2.85 | 4.5 | modal | 명세는 `color.palette.gray.600`(5.74) 사용 | `components/modal.md` 2·7절 |
| Figma 모달 신청 hover #FFFFFF / #7A64F9 18 Regular | 4.18 | 4.5 | modal 신청 버튼 | 명세는 `color.bg.brand-solid-hover`로 교체함(8.88) | `components/modal.md` 7·11절 |
| `color.bg.brand-solid-hover` / `color.bg.canvas`(checkbox 보더 후보) | 2.36 | 3 | checkbox | 쓰지 않음 | `components/checkbox.md` 4절 |

### 2.3 PATTERN-03-03 색만으로 상태를 구분하지 않음(SC 1.4.1)

1. 선택·오류·완료 상태는 색 변화에 더해 모양·굵기·아이콘·문구 중 하나 이상을 함께 바꿈
2. 상태는 색뿐 아니라 속성으로도 노출함(`aria-selected`, `aria-current`, `aria-invalid`, `aria-expanded`, `checked`)

| 상황 | 색 외 단서 | 근거 |
| --- | --- | --- |
| select selected option | check 아이콘 + `aria-selected="true"` | `components/select.md` 7절 |
| 체크박스 checked | 상자 안 체크 표시 + `checked` | `components/checkbox.md` 7절 |
| 라디오 selected | 원 안 점 + `checked` | `components/radio.md` 7절 |
| 탭 text variant selected | 글자 굵기(Regular → Bold) + `aria-current="page"` | `components/tab.md` 5·7절 |
| 탭 underline selected | 아래 선 + `aria-selected` | `components/tab.md` 7절 |
| 탭 box selected | 흰 바탕 + 검정 글자 + `aria-selected` | `components/tab.md` 7절 |
| 텍스트 필드 invalid | 오류 문구 + `aria-invalid` + `aria-describedby`. 빨간 색만으로 표시하지 않음 | `components/text-field.md` 7·8절 |
| 비활성 | `disabled`·`aria-disabled` + 비활성 사유 문구(2.5) | `components/button.md` 7절 |
| 탭 category(예외, 미충족) | 글자색만 다름. 색 외 단서 없음. 2.2 미달 표 참조 | `components/tab.md` 11절 |

### 2.4 PATTERN-03-04 reduced-motion(SC 2.3.3, 2.2.2 참고)

사용자가 운영체제에서 동작 줄이기를 설정하면 `@media (prefers-reduced-motion: reduce)`에서 아래를 적용함. 현재 `frontend/src`에는 이 미디어 쿼리가 0건임(`docs/design-reference.md` 4.5).

1. 전환(`transition`)은 모두 제거함. 상태 변화는 즉시 일어남. 색 변화는 유지하고 시간만 없앰
2. 무한 반복 애니메이션은 `animation: none`으로 멈춤. 멈춘 모습은 각 요소의 첫 프레임(정지 상태)
3. 뷰포트 크기를 바꾸는 이동·회전·확대 효과(transform 기반)는 제거함
4. 정보 전달에 쓰이던 움직임(스피너)은 정지 이미지 + `aria-busy`·`role="status"` 문구로 대체함
5. 열림·닫힘 높이 전환(accordion `grid-template-rows 300ms`)은 즉시 전환함. 펼침 상태는 `aria-expanded`로 유지됨

| 대상 | 기본 동작 | reduced-motion | 근거 |
| --- | --- | --- | --- |
| 버튼 색 전환 | 0.2s ease-in-out | 전환 제거 | `components/button.md` 5절 |
| text-field·select·checkbox·radio·tab·card 전환 | 각 명세의 0.2s 계열 | 전환 제거 | 각 명세 5절 |
| radio 원 transform | 0.2s cubic-bezier | 제거(점이 즉시 나타남) | `components/radio.md` 5절, design-reference 4.3 |
| accordion 열림·닫힘 | 300ms ease | 즉시 전환 | design-reference 4.3 |
| 모달 열기·닫기 | 전환 없음 | 변화 없음 | `components/modal.md` 5절 |
| 모달 로딩 스피너 | `raw:1s` linear 무한 회전 | 회전 중지, 정지 이미지 표시. 제목 "지원서를 제출 중입니다."와 `aria-busy="true"`가 진행 중임을 전달 | `components/modal.md` 5절 |
| gradient-background 5개 레이어(g1 moveVertical 30s, g2 moveInCircle 20s reverse, g3 moveInCircle 40s linear, g4 moveHorizontal 40s, g5 moveInCircle 20s) | 모두 infinite | 5개 모두 `animation: none`. 레이어 위치는 keyframes 0% 상태 | design-reference 4.4·4.5 |
| progress-bar 폭 전환 | 0.1s | 제거 | design-reference 4.3 |
| 테마·login-overlay opacity 전환 | 0.2~0.3s | 제거 | design-reference 4.3 |

- 스피너 처리: 래스터 이미지라 회전을 CSS `animation`으로 줌. reduced-motion에서는 같은 이미지를 회전 없이 보임
- SC 2.2.2(5초 넘게 자동으로 움직이는 정보는 멈추는 수단 필요): 배경 장식 5개는 정보가 아니라 장식이라 적용 대상이 아닐 수 있으나 판단은 7절에 남김

### 2.5 PATTERN-03-05 비활성 표시

1. 네이티브 요소(`<button>`, `<input>`, `<select>`, `<fieldset>`)는 `disabled` 속성을 씀
2. 그 밖의 요소(커스텀 role: combobox, option, tab)는 `aria-disabled="true"`를 씀
3. 색만으로 비활성을 알리지 않음. `color.fg.disabled`와 `color.fg.muted`가 같은 색(#999999)이라 색으로는 구분되지 않음(TOKEN-05-02). 비활성 사유를 화면에 문구로 표시함
4. 비활성 요소의 대비는 WCAG 적용 제외(SC 1.4.3·1.4.11 비활성 예외)이나 바탕과 구분되는 값을 씀

| 컴포넌트 | 속성 | 색 | 근거 |
| --- | --- | --- | --- |
| button 전 variant | 네이티브 `disabled` | brand·neutral: `color.bg.disabled` (#666666) + `color.fg.disabled` (#999999). glass: rest 바탕 + `color.fg.disabled`. text-link: `color.fg.disabled` | `components/button.md` 4·7절 |
| checkbox | 네이티브 `disabled` | 보더 #333333, 글자 `color.fg.disabled` 등(명세 4절) | `components/checkbox.md` 4·7절 |
| radio | 네이티브 `disabled`(묶음 전체는 `<fieldset disabled>`) | `color.palette.gray.600` (#666666). 예외: default 라벨이 이미 `color.fg.muted`(#999999)라 `color.fg.disabled`로는 구분되지 않아 한 단계 어두운 gray.600을 씀 | `components/radio.md` 4·7절 |
| select trigger·option | `aria-disabled="true"`. 포커스 유지, 열지 않음(trigger). option은 이동 시 건너뛰지 않고 선택만 막음 | 명세 4절 | `components/select.md` 7절 |
| tab(예외) | 비활성 탭을 두지 않음. 필요하면 `aria-disabled="true"`로 포커스 유지 | — | `components/tab.md` 7절 |
| text-field·modal·card | 비활성 상태 없음 | — | 각 명세 7절 |

예외 정리

- tab: 네이티브 `<button>`이지만 `disabled`를 쓰지 않고 `aria-disabled`를 씀. WAI-ARIA 탭 패턴이 비활성 탭도 방향키 이동 대상으로 남겨 존재를 알리도록 권고하기 때문임
- select: 같은 이유로 포커스를 잃지 않게 `aria-disabled`를 씀
- radio: 색 토큰이 다름(위 표)
- button 비동기 중(pending): `disabled`로 바꾸지 않음. `aria-busy="true"` + 핸들러에서 중복 실행 차단 + 라벨 유지. 포커스 소실 방지(`components/button.md` 5절)

### 2.6 터치·포인터 영역(SC 2.5.8, 티켓 외 모음)

1. 최소 24×24 CSS px(SC 2.5.8). 요소가 작으면 `padding`으로 누르는 영역을 넓히고 음수 margin으로 겉 크기를 유지함
2. 24px 미만이어도 인접 24px 원이 겹치지 않는 간격이면 통과(SC 2.5.8 간격 예외)
3. 모바일 권장 44×44. 미달은 허용하되 아래 목록에 모아 디자이너 확인 대상으로 둠
4. 같은 동작을 여는 라벨(`<label>`)이 있으면 라벨 영역까지 누르는 영역으로 침

| 컴포넌트 | 대상 | 최소 24×24 | 모바일 44×44 | 처리 | 근거 |
| --- | --- | --- | --- | --- | --- |
| button | 전 size | 통과 | brand 112×36, glass 132×40 미달 | 크기 유지(Figma 값) | `components/button.md` 7절 |
| text-field | 필드 | 통과(높이 56~60) | 통과 | — | `components/text-field.md` 7절 |
| select | 모바일 chip(높이 28), chip-list 모바일 항목(28) | 통과 | 미달 | 유지 | `components/select.md` 7절 |
| select | 모바일 clear 아이콘 16×16 | 미달 | 미달 | 누르는 영역을 24×24 이상으로 넓힘 | `components/select.md` 7절 |
| checkbox | 모바일 상자 20×20 | 미달 | 미달 | label 또는 투명 영역으로 24×24 이상 확보 | `components/checkbox.md` 7절 |
| checkbox | 약관 동의 행 높이 24 | 통과 | 미달 | 라벨까지 클릭 영역, 가로 충분 | `components/checkbox.md` 7절 |
| radio | 행 높이 21(모바일 18) | 간격 예외로 통과 | 미달 | 위아래 `raw:10px` 패딩 + 음수 margin | `components/radio.md` 7절 |
| radio | label-hidden 16×16 | 미달 | 미달 | 셀 전체를 `<label>`로 감싸 24×24 이상 | `components/radio.md` 7절 |
| tab | box 모바일 100×40, text 63×21 | 통과(text는 위아래 `raw:2px` 이상 추가) | 미달 | 유지 | `components/tab.md` 7·11절 |
| card | project 아이콘 링크 24×24 | 통과(최소값과 같음, gap 12 줄이지 않음) | 미달 | `padding`으로 44까지 확장 | `components/card.md` 7절 |
| modal | 버튼 130×44 | 통과 | 통과 | — | `components/modal.md` 7절 |

## 3. 적용 컴포넌트

| 컴포넌트 | 이 패턴에서 쓰는 방식 | 명세 |
| --- | --- | --- |
| button | 포커스 링(캔버스·흰 표면 구분, 보라 버튼 offset), `disabled`, pending `aria-busy`, 큰 글자 전용 대비 | `components/button.md` |
| text-field | 아래 보더 포커스 표시(예외), `aria-invalid`, 색 외 오류 문구 | `components/text-field.md` |
| select | `aria-disabled`, check 아이콘 선택 표시, 모바일 clear 영역 확장 | `components/select.md` |
| checkbox | 네이티브 `disabled`, 체크 표시, 모바일 영역 확장 | `components/checkbox.md` |
| radio | circle 포커스 링, 비활성 gray.600 예외, 영역 확장 | `components/radio.md` |
| tab | `aria-disabled` 예외, 굵기·아래 선·바탕 선택 표시, category 미충족 | `components/tab.md` |
| modal | 흰 표면 포커스 링, 스피너 reduced-motion, 설명 글자 대비 교체 | `components/modal.md` |
| card | `::after` 포커스 링, 보더 비의존 경계, 아이콘 링크 영역 확장 | `components/card.md` |

## 4. 예시

| 상황 | 예 | 근거 |
| --- | --- | --- |
| 모달 안 닫기 버튼에 포커스 | 흰 표면 위이므로 outline `color.stroke.focus-inverse` 2px, offset 2px | `components/modal.md` 7절 |
| 보라 버튼에 포커스 | `color.stroke.focus` outline을 버튼 밖 offset 2px에 그림(검정 캔버스 위 11.34) | `components/button.md` 4절 |
| 탭이 선택됨 | text: 글자를 Bold로 + `aria-current="page"`. 색만 바꾸지 않음 | `components/tab.md` 5·7절 |
| 비활성 신청 버튼 | `<button disabled>` + 회색 바탕 + "신청 기간이 아닙니다." 같은 사유 문구 | `components/button.md` 7절 |
| reduced-motion 켠 사용자의 제출 중 모달 | 스피너 정지 이미지 + "지원서를 제출 중입니다." + `aria-busy="true"` | `components/modal.md` 5·7절 |

## 5. Do / Don't

| Do | Don't |
| --- | --- |
| 포커스 링은 2px, offset 2px, 흰 표면 위는 `color.stroke.focus-inverse` | 전역 `outline: none`, 흰 표면 위에 `color.stroke.focus` |
| `color.fg.brand`·`color.fg.on-brand`는 큰 글자에만 | `color.fg.brand`를 `color.bg.layer` 위 14~16px 글자에 사용 |
| 선택은 색 + 굵기·아이콘·모양 | 선택을 색 하나로만 구분 |
| 네이티브 요소는 `disabled`, 그 밖은 `aria-disabled="true"` + 사유 문구 | 색만 회색으로 바꿔 비활성 표시 |
| `prefers-reduced-motion`에서 전환 제거, 무한 애니메이션 정지 | 동작 줄이기 설정을 무시하고 배경 애니메이션 상시 실행 |
| 작은 요소는 `padding`으로 누르는 영역을 24×24 이상(모바일 44) 확보 | 16×16 아이콘만 누르게 둠 |

## 6. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/shared/styles/global.css.ts` | `button , input`에 전역 `outline: none`. `:focus-visible` 대체 없음 → ADOPT-01-03에서 제거하고 `:focus-visible` 적용 |
| frontend | `src/shared/components/textfield/textfield.css.ts` | `outline: 'none'` 별도 지정. 아래 보더 포커스 표시 없음 → ADOPT-03-10 |
| frontend | `src/shared/components/archive/active-card.css.ts`, `project-card.css.ts` | hover에 `outline: 1px solid #2C3F61`. 키보드 포커스 링 없음 → ADOPT-03-15(카드) |
| frontend | `src/shared/components/gradient-background/gradient-background.css.ts` | infinite 애니메이션 5개. `prefers-reduced-motion` 쿼리 0건(`frontend/src` 전체) → ADOPT-01-04에서 2.4 규칙 적용 |
| frontend | `src/shared/components/button/button.css.ts` | `:focus-visible`·`:active`·disabled 일부 없음 → ADOPT-03-01·03·09 |
| frontend | 라디오·체크박스·탭·select | 숨긴 input 포커스 미표시(ADOPT-03-13), 체크박스(ADOPT-03-12), 탭(ADOPT-03-14), select(ADOPT-03-11) 각 티켓의 명세 차이 항목에서 해소 |
| frontend | `alert()` 10곳 | 모달 `alertdialog`로 교체(ADOPT-04) |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. 포커스는 `--ring` 통일(ADOPT-06-04), 상태 색 외 단서(ADOPT-05-04, ADOPT-06-02), 대비는 ADOPT-05 기준 |

## 7. 미확인

- 2.2 "명세에서 발견된 미달" 12행 전체: 디자이너 확인 필요. 특히 tab category(색 외 단서 없음), card review 기수(4.16), 모바일 brand 버튼(4.18)
- 텍스트 필드 focus 표시 굵기: 1px 보더 + label 이동이 SC 2.4.11을 충족하는지, 2px로 키울지(`components/text-field.md` 11절)
- 배경 장식 애니메이션 5개에 일시정지 수단이 필요한지(SC 2.2.2 해석). reduced-motion 대응은 이 문서가 정하나 상시 정지 버튼 여부는 결정 필요
- checkbox disabled 색(보더 #333333 등)은 `components/checkbox.md` 4절 값을 그대로 따름. 이 문서는 값을 재검증하지 않음
- Figma 노드를 직접 읽어 확인하지 않음(`figma_verified: false`). 값은 Phase 2 명세와 `docs/wbs/20-token.md`에서 옮김
