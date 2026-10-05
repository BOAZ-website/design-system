# PATTERN 패턴·가이드라인 명세서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- 컴포넌트를 어떤 흐름에서 어떻게 쓰는지 규칙을 `patterns/*.md`로 남김
- 기존 화면 문구와 Figma 모달에서 규칙을 뽑아냄

**범위:** 피드백, 폼, 접근성, 보이스 앤 톤
**범위 밖:** 빈 상태·온보딩 등 Figma에 없는 흐름(필요할 때 추가)

---

## PATTERN-01 feedback

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | COMPONENT-07 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| PATTERN-01-01 | 알림 수단 선택 기준: 모달(결정·결과), 인라인 에러(입력 검증) | `patterns/feedback.md` |
| PATTERN-01-02 | 모달 버튼 수 규칙: 안내형 2개(닫기·신청), 결과형 1개(닫기). 로딩 모달도 닫을 수 있음(Figma 모달 7종 기준) | 같은 파일 |
| PATTERN-01-03 | frontend `alert()` 10곳과 대체할 모달 종류 대응표 | 대응표(ADOPT-04 입력) |

## PATTERN-02 form

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-02 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| PATTERN-02-01 | 라벨: 빈 상태는 placeholder 위치, focus·입력 후 위로 축소(Figma 방식) | `patterns/form.md` |
| PATTERN-02-02 | 검증 시점(blur·제출), 필수 항목 누락·입력 에러 문구 위치 | 같은 파일 |
| PATTERN-02-03 | 폭 규칙(1, 1/2, 1/3 = 800·390·252), 단계 진행(progress-bar, 이전·다음 페이지) | 같은 파일 |

## PATTERN-03 accessibility

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 하루이틀 | TOKEN-05 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| PATTERN-03-01 | 모든 상호작용 요소에 `:focus-visible` 표시(검정 캔버스 위 `stroke.focus`, 흰 표면 위 `stroke.focus-inverse`, offset 2px). 전역 `outline: none` 금지 | `patterns/accessibility.md` |
| PATTERN-03-02 | 대비표: 본문 4.5:1, 큰 글자·UI 3:1. `fg.brand`와 `fg.on-brand`(보라 버튼 흰 글자 4.18:1)는 큰 글자 전용. 전체 조합은 `docs/wbs/20-token.md`의 "대비표"를 옮겨 적음 | 같은 파일 |
| PATTERN-03-03 | 색만으로 상태를 구분하지 않음(선택 = 색 + 굵기 또는 아이콘) | 같은 파일 |
| PATTERN-03-04 | `prefers-reduced-motion` 대응 | 같은 파일 |

## PATTERN-04 voice & tone

| 규모 | 선행 | Phase | GitHub 이슈 |
| --- | --- | --- | --- |
| 몇 시간 | 없음 | 3 | 없음 |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| PATTERN-04-01 | 문체 규칙: 안내·결과 문장은 합쇼체("~입니다", "~되었습니다"), 요청은 "~해주세요", FAQ 질문은 지원자 목소리 해요체("~나요?"). 근거: 웹사이트 5개 페이지·Figma 모달 문구. 예외 `alert("…알려드릴게요.")`는 합쇼체로 고침 | `patterns/voice-and-tone.md` |
| PATTERN-04-02 | 오류 문구 2문장 구조: 무엇이 잘못됐는지 + 다음 행동 | 같은 파일(Figma 모달 문구 예시) |
| PATTERN-04-03 | 버튼 문구: "동사 + 하기"(지원하기, 신청하기), 링크형은 "~ 보기" | 같은 파일 |
