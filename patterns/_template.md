---
id: feedback                # 파일 이름과 같은 kebab-case
name_ko: 피드백
ticket: PATTERN-01          # WBS 티켓 키
status: draft               # draft | review | stable (전이 조건은 docs/wbs/30-component.md "status 전이"와 같음)
figma:                      # 근거로 쓴 Figma 노드 ID 목록. 링크·파일 키·캡처는 적지 않음
  - "4412:7387"
figma_verified: false       # Figma를 직접 열어 확인했으면 true
tokens_version: v0.1.1      # 이 명세가 기준으로 삼은 토큰 태그
owner: 명세 담당            # 역할명(CONTRIBUTING.md 역할 표). 실명 금지
last_updated: 2026-10-22    # YYYY-MM-DD. 명세를 고치는 PR이 갱신
---

# {name_ko} ({id})

> 표기 규칙은 `components/_template.md` 상단 "표기 규칙"과 같음. 패턴은 여러 컴포넌트에 걸친 사용 규칙이라 값보다 "언제·어떻게"를 적음

## 1. 개요

- 목적: {한 줄}
- 적용 범위: {화면·흐름}
- 관련 명세: {`components/*.md`, `patterns/*.md` 상대 경로}

## 2. 규칙

티켓의 기능 ID마다 소절 하나. 규칙은 번호 목록, 판단 기준은 표.

### 2.1 {기능 ID} {제목}

| 상황 | 규칙 | 근거 |
| --- | --- | --- |

## 3. 적용 컴포넌트

| 컴포넌트 | 이 패턴에서 쓰는 방식 | 명세 |
| --- | --- | --- |

## 4. 예시

| 상황 | 예 | 근거 |
| --- | --- | --- |

## 5. Do / Don't

| Do | Don't |
| --- | --- |
| | |

## 6. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/...`(저장소 `BOAZ-website/frontend` 기준. 줄 번호 금지) | 현재 코드와 다른 점, 고칠 ADOPT 티켓 |
| frontend_admin | | 관리자 콘솔 적용 여부와 ADOPT 티켓 |

## 7. 미확인

- {확인이 필요한 결정과 근거. 비어 있으면 "없음"}
