---
id: feedback
name_ko: 피드백
ticket: PATTERN-01
status: review
figma:
  - "4412:7387"
  - "4243:4452"
  - "4243:4480"
  - "4243:4492"
  - "4243:4504"
  - "5164:5542"
  - "5164:5587"
  - "5164:5621"
figma_verified: true
tokens_version: v0.1.0
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 피드백 (feedback)

> 표기 규칙은 `components/_template.md` 상단 "표기 규칙"과 같음. 패턴은 여러 컴포넌트에 걸친 사용 규칙이라 값보다 "언제·어떻게"를 적음

## 1. 개요

- 목적: 사용자 동작의 결과·오류·진행 상태를 알릴 때 어떤 수단(모달, 입력 필드 오류 문구, 상태 알림 영역)을 쓸지 정함
- 적용 범위: 웹사이트 전체. 주 사용처는 지원서 작성·제출, 지원 진입, 사전 알림 신청
- 관련 명세
  - `components/modal.md`(COMPONENT-07): 모달 7종·버튼·동작
  - `components/text-field.md`(COMPONENT-02): invalid 상태·오류 문구
  - `components/button.md`(COMPONENT-01): pending(요청 처리 중) 상태
  - `patterns/form.md`(PATTERN-02): 검증 시점·첫 오류로 포커스 이동
  - `patterns/voice-and-tone.md`(PATTERN-04): 알림 문구 말투. 이 문서는 문구를 새로 정하지 않고 참조만 함
  - `patterns/accessibility.md`(PATTERN-03)
- 범위 밖: 소셜 로그인 오버레이(`components/modal.md` 1절 범위 밖과 같음), 관리자 콘솔(6절)

## 2. 규칙

### 2.1 PATTERN-01-01 알림 수단 선택 기준

수단은 세 가지임. 브라우저 `alert()`·`confirm()`은 쓰지 않음.

| 수단 | 정의 | 접근성 처리 | 명세 |
| --- | --- | --- | --- |
| 모달 | 화면 흐름을 멈추고 확인(닫기)·다음 동작(신청)을 받는 대화 상자. Figma 7종만 씀 | `<dialog>` + `showModal()`, `role="alertdialog"`(로딩은 `dialog` + `aria-busy="true"`) | `components/modal.md` 3절·5절·7절 |
| 인라인 에러 | 입력 필드 아래 오류 문구(message 슬롯) + 필드 invalid 상태 | `aria-invalid="true"`, 문구 id를 `aria-describedby`로 연결, 문구 영역 `aria-live="polite"` | `components/text-field.md` 4절 invalid·7절 |
| 상태 알림 영역 | 화면 흐름을 멈추지 않는 짧은 문구. 요청 진행·완료는 `role="status"`, 실패는 `role="alert"` | 영역을 처음부터 DOM에 두고 문구만 바꿈(나중에 삽입하면 읽히지 않는 화면 읽기 프로그램이 있음) | `components/button.md` 5절 비동기 중 동작 |

| 상황 | 규칙 | 근거 |
| --- | --- | --- |
| 입력 검증: 필수 항목 누락, 형식 오류(이메일·전화번호), 글자 수 초과 | 인라인 에러. 해당 필드를 invalid로 바꾸고 원인 문구를 필드 아래에 둠. 검증 시점·포커스 이동은 PATTERN-02 | `components/text-field.md` 4절 invalid 진입 조건, `components/modal.md` 8절 |
| 입력 검증 중 예외: 사전 알림 신청 폼의 이메일 빈 값·형식 오류 | 모달 error-email-invalid. Figma가 이 폼에 모달을 정해 둠 | Figma 4243:4492 |
| 서버 결과: 지원서 제출 성공·실패, 사전 알림 이메일 중복 | 결과형 모달(success·failure·error-email-duplicate) | Figma 5164:5542, Figma 5164:5621, Figma 4243:4504 |
| 진입 차단: 지원 기간 아님, 모집 마감 | 안내형 모달(info-not-open·info-closed). 신청 버튼으로 사전 알림 신청으로 이어줌 | Figma 4243:4452, Figma 4243:4480 |
| 오래 걸리는 요청 진행: 지원서 제출 | 로딩 모달 + 제출 버튼 pending. 요청 완료 후 결과형 모달 | `components/modal.md` 5절 로딩 모달, `components/button.md` 5절 |
| 짧은 요청 진행·완료: 임시저장, 사전 알림 신청 처리 중 | 버튼 pending(`aria-busy="true"`, 라벨 유지) + 상태 알림 영역 `role="status"`. 모달을 띄우지 않음 | `components/button.md` 4절·5절 |
| 짧은 요청 실패: 임시저장 실패 등 Figma 모달이 없는 실패 | 버튼을 rest로 되돌리고 상태 알림 영역 `role="alert"`로 알림 | `components/button.md` 5절 |
| 되돌릴 수 없는 동작 확인(예·아니오): 지원서 제출 전 확인, 부문 변경 | Figma에 확인형 모달 없음. 디자이너가 종류를 추가하기 전까지 기존 `confirm()` 유지(7절) | `components/modal.md` 11절 |
| Figma에 해당 모달이 없는 결과 | 새 모달 문구를 지어 쓰지 않음. 3절 대응표의 임시 수단을 쓰고 7절에 올림 | `components/modal.md` 3절("제목·설명 문구는 Figma 원문 그대로") |

- 판단 순서
  1. 특정 입력 필드의 값이 원인인가 → 인라인 에러(사전 알림 이메일만 예외)
  2. 사용자가 다음으로 무엇을 할지 정해야 하거나 흐름이 끝났는가(진입 차단, 제출 결과) → 모달
  3. 그 밖의 진행·완료·실패 → 상태 알림 영역
- 한 번에 모달 하나만 엶. 모달과 인라인 에러를 같은 원인에 함께 쓰지 않음(`components/modal.md` 5절)

### 2.2 PATTERN-01-02 모달 버튼 수 규칙

`components/modal.md` 3절 "버튼 규칙"·5절과 같음. 값이 다르면 `components/modal.md`를 따름.

| 모달 종류 | variant | 버튼 수 | 버튼(왼쪽 → 오른쪽) | 초기 포커스 | 근거 |
| --- | --- | --- | --- | --- | --- |
| 안내형 | info-not-open, info-closed | 2 | 닫기 · 신청 | 닫기 | Figma 4243:4452, Figma 4243:4480 |
| 입력 오류형 | error-email-invalid, error-email-duplicate | 1 | 닫기 | 닫기 | Figma 4243:4492, Figma 4243:4504 |
| 결과형 | success, failure | 1 | 닫기 | 닫기 | Figma 5164:5542, Figma 5164:5621 |
| 로딩 | loading | 1 | 닫기 | 닫기 | Figma 5164:5587 |

1. 신청 버튼은 안내형에만 둠. 누르면 모달을 닫고 사전 알림 신청 영역으로 이동, 포커스는 이메일 입력으로 보냄
2. 로딩 모달도 닫기 버튼이 있음. 닫기·Esc는 모달만 닫고 요청은 취소하지 않음. 요청이 끝나면 결과형 모달을 엶
3. 모달 버튼은 비활성 상태가 없음(로딩 모달의 닫기 포함)
4. Esc는 닫기와 같음. backdrop 클릭으로는 닫지 않음
5. 모바일에서 두 버튼이 한 줄에 들어가지 않으면(화면 359px 미만) 세로로 쌓고 신청을 위에 둠
6. 버튼 3개 이상, 확인·취소 같은 다른 버튼 조합은 쓰지 않음(Figma 4243:4439 버튼 세트에 닫기·신청만 있음)

### 2.3 PATTERN-01-03 frontend `alert()` 대응표

- 기준: 저장소 `BOAZ-website/frontend`의 `src`에서 `alert(` 10곳, `confirm(` 2곳(2026-10-22 조사)
- ADOPT-04-02 입력. ADOPT-04-02 완료 확인(`rg "alert\(" src` 0건)은 아래 A1~A10을 모두 바꾸면 충족됨
- "대체 수단"이 `Figma에 없음`인 행은 임시 수단을 함께 적음. 임시 수단은 2.1 판단 순서를 적용한 추정이며 7절에서 디자이너 확인을 받음
- `components/modal.md` 9절의 5개 파일 대응을 한 곳씩으로 나눈 것이며 판정은 같음

#### alert 10곳

| # | 파일 | 위치(함수·조건) | 현재 문구 | 대체 수단 | 비고 |
| --- | --- | --- | --- | --- | --- |
| A1 | `src/features/notice/notice-form.tsx` | `doSubmit` 이메일 빈 값 | 이메일을 입력해주세요. | 모달 error-email-invalid | Figma 문구로 교체(Figma 4243:4492) |
| A2 | `src/features/notice/notice-form.tsx` | `doSubmit` 이메일 형식 오류 | 유효하지 않은 이메일 형식입니다. | 모달 error-email-invalid | A1과 같은 모달 |
| A3 | `src/features/notice/notice-form.tsx` | `mutate` `onSuccess` | 신청이 완료되었습니다! 모집 시작 시 이메일로 알려드릴게요. | Figma에 없음. 임시: 상태 알림 영역 `role="status"` | 모달 success 문구는 지원서 제출 전용이라 쓰지 않음(`components/modal.md` 11절). 문구 말투는 PATTERN-04-01에서 고침 |
| A4 | `src/features/notice/notice-form.tsx` | `mutate` `onError` 서버 오류 코드별(`SERVER_ERROR_MESSAGES`) | 코드에 따라 다름. 아래 소표 | 코드별로 나눔. 아래 소표 | 한 `alert` 호출이 4가지 경우를 처리함 |
| A5 | `src/features/notice/notice-form.tsx` | `mutate` `onError` 네트워크 오류 등 Axios 오류가 아닌 경우 | 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요. | Figma에 없음. 임시: 상태 알림 영역 `role="alert"` | 모달 failure 문구는 지원서 제출 전용 |
| A6 | `src/shared/router/protected-route.tsx` | 비로그인 상태로 지원서 경로 접근 | 로그인 후 지원이 가능합니다. | Figma에 없음. 임시: 홈 이동 후 로그인 오버레이(`src/features/auth/ui/login-overlay.tsx`)를 엶 | 로그인 오버레이는 `components/modal.md` 범위 밖. 열기 방식은 ADOPT-04에서 정함 |
| A7 | `src/widgets/apply/ui/personal-info-section.tsx` | `handleNext` 필수 항목 누락·형식 오류 | 입력하지 않은 항목이 있거나 형식이 올바르지 않습니다.\n항목을 다시 확인해 주세요. | 인라인 에러(모달 아님) | 필드별 invalid + 문구는 이미 이메일·전화번호에 있음. 부문·생년월일·병역·대학원·학년·학기·면접 가능 시간도 필드 오류 문구로 표시하고 첫 오류로 포커스 이동(PATTERN-02) |
| A8 | `src/widgets/apply/model/use-submit-application.ts` | `onSuccess` | 지원서 제출이 성공적으로 완료되었습니다. | 모달 success | 닫기 후 홈 이동. 설명 "BOAZ에 지원해주셔서 감사합니다." 추가(Figma 5164:5542) |
| A9 | `src/widgets/apply/model/use-submit-application.ts` | `onError` | 지원서 제출에 실패했습니다. | 모달 failure | Figma 문구 "제출에 실패하였습니다."로 교체(Figma 5164:5621) |
| A10 | `src/pages/apply-page.tsx` | 렌더링 중 `draftQueryState.state === 'submitted'`(이미 제출) | 이미 제출된 지원서가 있습니다. | Figma에 없음. 임시: 홈 이동 후 상태 알림 영역 `role="status"` | 현재 렌더링 중 `alert` 호출(부수 효과). 코드 주석에 "제출 완료 전용 컴포넌트로 교체" 계획 있음 |

A4 소표(`SERVER_ERROR_MESSAGES`의 서버 오류 코드별)

| 서버 오류 코드 | 현재 문구 | 대체 수단 | 비고 |
| --- | --- | --- | --- |
| `DUPLICATE_EMAIL` | 이미 구독 신청된 이메일입니다. | 모달 error-email-duplicate | Figma 문구 "이미 사전 알림이 신청된 이메일입니다."로 교체(Figma 4243:4504) |
| `INVALID_EMAIL_FORMAT` | 유효하지 않은 이메일 형식입니다. | 모달 error-email-invalid | 클라이언트 검사(A2)를 통과한 뒤 서버가 거부한 경우 |
| `INVALID_INPUT_VALUE` | 이메일을 입력해주세요. | 모달 error-email-invalid | 같음 |
| 그 밖의 코드 | 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요. | Figma에 없음. 임시: 상태 알림 영역 `role="alert"` | A5와 같음 |

#### confirm 2곳

ADOPT-04-02 완료 확인(`alert(` 0건) 대상이 아님. 확인형 모달이 Figma에 없어 유지함.

| # | 파일 | 위치 | 현재 문구 | 대체 수단 | 비고 |
| --- | --- | --- | --- | --- | --- |
| C1 | `src/pages/apply-page.tsx` | `handleSubmit` 제출 전 확인 | 제출하면 중복 제출이 불가합니다. 제출하시겠습니까? | Figma에 없음. 디자이너가 확인형을 추가할 때까지 `window.confirm` 유지 | 확인 후 로딩 모달 → 결과형 모달 순서(아래 "alert가 아닌 모달 사용처") |
| C2 | `src/widgets/apply/ui/personal-info-section.tsx` | `handleTrackChange` 부문 변경 | 부문을 변경할 경우 {현재 부문} 부문의 기존 임시저장 내역이 사라지게 됩니다. 계속 진행하시겠습니까? | Figma에 없음. C1과 같음 | 코드 주석에 "모달 컴포넌트로 교체" 계획 있음 |

#### alert가 아닌 모달 사용처

Figma 모달 중 현재 코드가 `alert()`로 처리하지 않는 곳. ADOPT-04-02의 alert 10곳에 들어 있지 않아 따로 적음. 적용은 ADOPT-04-03

| 모달 | 현재 코드 | 파일 | 바꿀 내용 | 근거 |
| --- | --- | --- | --- | --- |
| loading | 제출 중 표시 없음. 제출 버튼 상태 변화도 없음 | `src/pages/apply-page.tsx`(`handleSubmit`), `src/widgets/apply/model/use-submit-application.ts` | 제출 요청 시작 시 로딩 모달을 열고 제출 버튼 pending. 완료 시 로딩 모달을 닫고 A8·A9 모달을 엶 | Figma 5164:5587, `components/modal.md` 5절 |
| info-not-open | `status.is_active === false`이면 모달 없이 홈으로 이동(`Navigate`) | `src/pages/apply-page.tsx` | 지원 진입 시 안내형 모달. 신청 버튼은 사전 알림 신청 영역으로 이동 | Figma 4243:4452 |
| info-closed | info-not-open과 같은 분기(구분 없음) | `src/pages/apply-page.tsx` | 모집 마감이면 info-closed. 두 경우를 나눌 기준 데이터는 7절 | Figma 4243:4480 |

- 지원 진입 버튼("지원하기"): `src/widgets/recruiting/ui/recruiting-hero-section/recruiting-hero-section.tsx`, `src/entities/track/ui/track-card/track-card.tsx`. 안내형 모달을 지원서 화면 진입 후에 띄울지, 진입 버튼을 누를 때 띄울지는 7절

## 3. 적용 컴포넌트

| 컴포넌트 | 이 패턴에서 쓰는 방식 | 명세 |
| --- | --- | --- |
| 모달 | 진입 차단(안내형), 서버 결과(결과형·입력 오류형), 지원서 제출 진행(로딩) | `components/modal.md` 3절·5절 |
| 입력 필드 | 입력 검증 오류를 invalid 상태 + message로 표시 | `components/text-field.md` 4절·7절 |
| 셀렉트·라디오 | 필수 선택 누락을 셀렉트 field invalid, 라디오 묶음 아래 누락 메시지로 표시(A7). 표 문항 체크박스 누락 표시는 명세에 없음(7절) | `components/select.md` 7절, `components/radio.md` 3절·7절 |
| 버튼 | 요청 중 pending(`aria-busy="true"`, 라벨 유지), 진행·완료는 `role="status"`, 실패는 `role="alert"` | `components/button.md` 4절·5절 |

## 4. 예시

| 상황 | 예 | 근거 |
| --- | --- | --- |
| 사전 알림 이메일 형식 오류 | 모달 "이메일을 다시 입력해주시길 바랍니다. / 다시 한 번 확인해주세요." + 닫기 | Figma 4243:4492 |
| 사전 알림 이메일 중복 | 모달 "이미 사전 알림이 신청된 이메일입니다. / 다시 한 번 확인해주세요." + 닫기 | Figma 4243:4504 |
| 지원 기간이 아닐 때 지원 진입 | 모달 "지금은 지원 기간이 아닙니다. / 사전 알림을 신청해보세요." + 닫기·신청 | Figma 4243:4452 |
| 지원서 제출 | 로딩 모달 "지원서를 제출 중입니다. / 잠시만 기다려주세요." → 성공 모달 "지원서 제출이 성공적으로 완료되었습니다. / BOAZ에 지원해주셔서 감사합니다." | Figma 5164:5587, Figma 5164:5542 |
| 지원서 이메일 형식 오류 | 이메일 필드 invalid + 아래 문구 "이메일 형식이 올바르지 않습니다." | `components/text-field.md` 4절 |
| 임시저장 | 버튼 pending(라벨 유지) + `role="status"` 영역에 저장 중·저장 완료 알림 | `components/button.md` 5절 |

## 5. Do / Don't

| Do | Don't |
| --- | --- |
| 입력 필드 값이 원인이면 필드 아래 문구로 알림 | 필수 항목 누락을 모달이나 `alert()` 한 줄로 몰아 알림(A7 현재 방식) |
| 모달은 Figma 7종 상황에만, 문구는 `components/modal.md` 3절 원문 | 상황마다 새 모달 문구를 지음, 지원서용 success·failure를 사전 알림에 재사용 |
| 안내형만 버튼 2개(닫기·신청), 나머지는 닫기 1개 | 결과형에 확인·취소 2개, 로딩 모달에서 닫기를 없애거나 비활성화 |
| 짧은 요청은 버튼 pending + `role="status"` | 짧은 요청마다 로딩 모달을 띄움 |
| 상태 알림 영역을 미리 DOM에 두고 문구만 바꿈 | 알림 순간에 live region 요소를 새로 삽입 |
| 알림은 이벤트 처리 함수나 효과(effect)에서 엶 | 렌더링 중에 `alert()` 호출(A10 현재 방식) |
| 결과 모달을 닫은 뒤 화면 이동(A8) | `alert()`로 막은 뒤 바로 이동해 사용자가 이유를 놓침 |

## 6. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/features/notice/notice-form.tsx`, `src/shared/router/protected-route.tsx`, `src/widgets/apply/ui/personal-info-section.tsx`, `src/widgets/apply/model/use-submit-application.ts`, `src/pages/apply-page.tsx` | 공용 모달 없음, `alert()` 10곳·`confirm()` 2곳으로 처리. 대응은 2.3절. 모달 교체는 ADOPT-04(04-01 공용 Modal, 04-02 alert 교체, 04-03 alert가 아닌 모달 3건). A7 인라인 에러는 ADOPT-03-22(지원서 폼 검증, PATTERN-02) |
| frontend 상태 알림 | `src/widgets/apply/ui/apply-title-section.tsx`, `src/features/notice/notice-form.tsx` | `role="status"`·`aria-live` 사용 0곳. 임시저장 버튼이 라벨을 "저장 중..."·"저장 완료 ✓"로 바꾸고 disabled, 사전 알림 버튼이 "신청 중..."으로 바꾸고 disabled. 라벨 유지 + `role="status"`로 교체(ADOPT-03-09 pending 항목) |
| frontend_admin | — | 관리자 콘솔은 이 패턴을 따르지 않음. ADOPT-07-04(모달), 값은 ADOPT-05 기준. 상태를 색만으로 알리지 않는 규칙은 ADOPT-05-04 |

## 7. 미확인

- 확인형 모달(예·아니오): C1·C2가 `confirm()`을 씀. Figma에 없음(`components/modal.md` 11절). 종류 추가 여부 디자이너 확인 필요. 추가 전까지 `confirm()` 유지
- Figma에 해당 모달이 없는 알림 4가지: 사전 알림 신청 완료(A3), 서버 오류(A4 일부·A5), 로그인 필요(A6), 이미 제출된 지원서(A10). 2.3절 임시 수단은 추정. 모달 종류 추가 여부 디자이너 확인 필요
- A6 로그인 필요: 홈 이동 후 로그인 오버레이를 여는 방식은 추정. 로그인 후 지원서 화면으로 돌아오는 흐름 포함 여부 확인 필요
- info-not-open과 info-closed 구분 기준: 현재 코드는 `status.is_active`만 봄. 모집 시작 전과 마감 후를 나눌 데이터(모집 기간)를 응답에서 쓸지 백엔드 확인 필요
- 안내형 모달을 띄우는 시점: 지원 진입 버튼을 누를 때(리크루팅 화면) 또는 지원서 화면 진입 후. Figma에 모달이 놓인 화면 인스턴스가 없어 판단 근거 없음(`components/modal.md` 11절 backdrop 항목)
- 면접 가능 시간(표 문항 다중 선택) 누락 표시: `components/checkbox.md`에 invalid·누락 메시지 규칙 없음. 라디오 묶음 누락 메시지 방식을 따를지 확인 필요
