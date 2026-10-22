---
id: form
name_ko: 폼
ticket: PATTERN-02
status: review
figma:
  - "1981:4329"
  - "2007:3422"
  - "2007:3423"
  - "2007:3425"
  - "2007:3426"
  - "2009:4228"
  - "2009:3442"
  - "1981:4292"
  - "1981:4307"
  - "8801:6001"
  - "8103:16976"
  - "6439:12438"
figma_verified: true
tokens_version: v0.1.1
owner: 디자인 시스템 리드
last_updated: 2026-10-22
---

# 폼 (form)

> 표기 규칙은 `components/_template.md` 상단 "표기 규칙"과 같음. 패턴은 여러 컴포넌트에 걸친 사용 규칙이라 값보다 "언제·어떻게"를 적음

## 1. 개요

- 목적: 지원서·사전 알림 신청 폼에서 라벨 표시, 검증 시점, 오류 문구 위치, 필드 폭, 단계 이동을 한 가지 방식으로 맞춤
- 적용 범위
  - 지원서 작성 4단계(지원자 정보 입력 → 공통 질문 → 부문 질문 → 추가 정보). 동의 단계는 `components/checkbox.md` 범위
  - 사전 알림 신청(이메일 한 칸 + 버튼)
- 관련 명세
  - `components/text-field.md`(COMPONENT-02): 필드 모양·상태·라벨 축소·message 슬롯
  - `components/select.md`(COMPONENT-03): 목록 선택(field 트리거)
  - `components/radio.md`(COMPONENT-06), `components/checkbox.md`(COMPONENT-04): 묶음 선택·누락 메시지
  - `components/button.md`(COMPONENT-01): text-link(이전·다음 페이지), brand(제출하기)
  - `components/progress-bar.md`(COMPONENT-14): 단계 표시 모양
  - `components/form-add-button.md`(COMPONENT-16): 항목 추가(복수/부전공, 프로젝트)
  - `patterns/feedback.md`(PATTERN-01): 모달과 인라인 오류의 구분
  - `patterns/accessibility.md`(PATTERN-03), `patterns/voice-and-tone.md`(PATTERN-04): 포커스 표시, 오류 문구 문체
- 이 문서는 값을 새로 정하지 않음. 값은 위 컴포넌트 명세의 해당 절을 따르고, 여기서는 화면 단위 규칙만 정함

## 2. 규칙

### 2.1 PATTERN-02-01 라벨: 빈 상태는 입력 자리, focus·입력 후 위로 축소

1. 모든 한 줄 입력·목록 선택 필드는 보이는 `<label>`을 둠. placeholder 속성으로 이름을 대신하지 않음
2. 빈 값이고 포커스가 없으면 라벨은 입력 자리(필드 세로 가운데)에 `typography.body-4`로 보임
3. 포커스가 들어오거나 값이 있으면 라벨은 필드 위쪽 끝으로 올라가 `typography.text-1`(모바일 `typography.text-1-mobile`)로 줄어듦. 값을 지워도 포커스가 있으면 위에 머묾
4. 축소 전환은 0.15s ease-out. reduced-motion 설정 시 전환 없음
5. 입력 예시("01012345678")는 라벨이 올라간 뒤에만 입력 자리에 placeholder로 보임. 라벨 자리에 예시를 쓰지 않음
6. 문단형 답변(`<textarea>`)은 축소하지 않음. 질문 제목(필드 밖 `typography.headline-2`)이 `<label>`이고, 필드 안 글자는 placeholder로만 씀
7. 목록 선택 field 트리거도 같은 방식. 목록이 열려 있는 동안 라벨은 위에 머묾

| 상황 | 라벨 위치·글자 | 근거 |
| --- | --- | --- |
| 빈 값, 포커스 없음 | 입력 자리, `typography.body-4` / 모바일 `typography.body-4-mobile` | Figma 2007:3422, `components/text-field.md` 5절 |
| 포커스 있음(빈 값 포함) | 위쪽 끝, `typography.text-1` / 모바일 `typography.text-1-mobile`, `color.fg.brand` (#7A64F9) | Figma 5239:3993, `components/text-field.md` 4·5절 |
| 값 있음, 포커스 없음 | 위쪽 끝, `color.fg.default` (#FFFFFF) | Figma 2007:3423, `components/text-field.md` 4절 |
| 필수 항목 누락(빈 값 invalid) | 입력 자리 유지, `color.fg.critical` (#F96466). 포커스가 들어오면 위로 축소 | Figma 2007:3426, `components/text-field.md` 4절 |
| 입력 에러(값 있음 invalid) | 위쪽 끝, `color.fg.critical` (#F96466) | Figma 2007:3425 |
| 문단형 | 축소 없음. 질문 제목이 라벨 | Figma 2009:4228, Figma 2009:3439, `components/text-field.md` 4절 |
| 목록 선택 열림 | 위쪽 끝, focus 표시 유지 | `components/select.md` 4절 |

- 필수 표시 기호(`*`)를 두지 않음. Figma 질문 컴포넌트(2009:4228)·지원자 정보 화면(8801:6001)에 없고, 지원서 항목 대부분이 필수임
- 대신 선택 항목에만 제목 뒤에 "(선택)"을 붙임. 대상: 복수/부전공 추가 필드, 추가 정보 단계의 선택 질문(`is_required`가 false인 질문). Figma 없음(추정)
- 필수 항목은 코드에 `required`(네이티브 입력) 또는 `aria-required="true"`(combobox·radiogroup)로 표시함. `components/radio.md` 11절 "필수 표시 기호" 항목은 이 규칙으로 정리됨

### 2.2 PATTERN-02-02 검증 시점과 오류 문구 위치

#### 검증 시점

1. 필수 항목 누락은 다음 페이지(또는 제출하기)를 누를 때만 검사함. 빈 필드를 Tab으로 지나가거나 blur해도 누락 오류를 띄우지 않음
2. 형식 검사(이메일·전화번호)는 값이 있는 필드에서 blur할 때, 그리고 단계 이동 시 검사함. 입력 중(blur 전)에는 띄우지 않음
3. 글자 수 초과는 입력하는 즉시 표시함(counter + message). 입력은 막지 않고 단계 이동만 막음(`components/text-field.md` 5절)
4. 한 번 오류가 표시된 필드는 이후 값이 바뀔 때마다 다시 검사하고, 조건이 풀리면 즉시 오류를 지움
5. 단계 이동 시 현재 단계 필드만 검사함. 이전 페이지 이동은 검사하지 않고 입력값을 유지함
6. 다음 페이지·제출하기 버튼을 검증 결과로 비활성화하지 않음. 눌러야 어떤 항목이 빠졌는지 알 수 있기 때문임. 예외는 동의 단계 "지원서 작성" 버튼(동의 체크박스 하나만 조건, Figma 4266:7632)

| 오류 종류 | 검사 시점 | 지우는 시점 | 문구 | 근거 |
| --- | --- | --- | --- | --- |
| 필수 항목 누락 | 다음 페이지·제출하기 누를 때 | 값 입력·선택 즉시 | "필수 입력 항목입니다." | Figma 2007:3426, 코드 `src/widgets/apply/ui/personal-info-section.tsx` |
| 입력 에러(형식) | blur(값 있음), 단계 이동 시 | 형식이 맞는 즉시 | 원인을 적음. "이메일 형식이 올바르지 않습니다.", "전화번호 형식이 올바르지 않습니다. (예: 01012345678)" | Figma 2007:3425, 코드 `src/widgets/apply/ui/personal-info-section.tsx` |
| 글자 수 초과 | 입력 즉시 | 최대 이하가 되는 즉시 | "글자 수 제한을 초과했습니다" | Figma 2009:3441, `components/text-field.md` 4절 |
| 묶음 선택 누락(라디오·표형) | 다음 페이지·제출하기 누를 때 | 선택 즉시 | 라디오 "필수 입력 항목입니다.", 표형 "모든 항목을 선택해주세요.", 다중 "최소 하나의 시간을 선택해주세요."(코드는 띄어 씀. `patterns/voice-and-tone.md` 2.2 붙여쓰기로 고침) | `components/radio.md` 3절, 코드 `src/widgets/apply/ui/question-section/question-section.tsx` |
| 서버 거절(중복 이메일 등) | 응답을 받을 때 | 다시 제출할 때 | 지원서 제출 중 서버가 필드 하나를 거절하면 해당 단계로 돌아가 인라인 오류 + 그 필드로 포커스 이동(SC 3.3.1·3.3.3). 필드 원인이 아닌 거절과 사전 알림 신청은 모달(PATTERN-01, Figma 4243:4492) | `patterns/feedback.md` 2.1 판단 순서, design-reference 5.8 |

- 문구 문체(합쇼체, 2문장 구조 여부)는 PATTERN-04를 따름. 이 명세는 위치·시점만 정함

#### 오류 문구 위치

1. 오류 문구는 해당 필드 바로 아래에 둠. 필드와 문구 간격 한 줄 입력 `spacing.3` (12px)·문단형 `spacing.2` (8px), 문구 줄 높이 24px, 경고 아이콘 16px + 문구(`components/text-field.md` 2·3절, 2026-10-22 라이브 기준으로 정정)
2. 한 줄에 나란히 놓인 필드(출생 연·월·일, 학년·학기, 졸업 연·월)는 문구를 줄 아래에 하나만 둠. 빈 필드마다 invalid 모양을 적용하고, 문구는 줄 전체 폭에 맞춤. 문구 id를 줄 안 invalid 필드 모두의 `aria-describedby`로 연결함. 모바일 1/3 필드 폭 108px에는 문구 "필수 입력 항목입니다."(아이콘 포함 약 150px)가 필드별로 들어가지 않아 줄 아래 하나로 확정함
3. 라디오·체크박스 묶음은 마지막 보기 아래에 묶음 단위로 하나(`components/radio.md` 3절)
4. 문단형은 counter와 같은 줄 왼쪽(counter는 오른쪽 정렬)
5. 오류 문구가 나타나도 아래 요소가 밀려 내려가는 것을 허용함(자리를 미리 비워 두지 않음). Figma 오류 컴포넌트 높이 92 = 60 + 8 + 24(Figma 2007:3426)
6. 화면 위쪽에 오류 요약 상자를 두지 않음. `alert()`·모달로도 알리지 않음(아래 "제출 시 포커스")

| 상황 | 위치 | 근거 |
| --- | --- | --- |
| 한 줄 입력·목록 선택 1개 | 필드 바로 아래, 간격 `spacing.3` (12px) | 코드 `src/widgets/apply/ui/personal-info-section.css.ts` |
| 1/2·1/3 필드를 한 줄에 나란히 | 줄 아래 하나, 줄 전체 폭 | Figma 없음(추정), 코드 `src/widgets/apply/ui/personal-info-section.tsx` |
| 라디오·체크박스 묶음 | 마지막 보기 아래 하나 | `components/radio.md` 3절 |
| 문단형 | 필드 아래 message 줄 왼쪽, counter 오른쪽 | Figma 2009:3441 |
| 사전 알림 이메일 | 형식 오류·중복은 Figma 모달(4243:4492, 4243:4504). 인라인 문구 없음 | design-reference 5.8 |

#### 제출 시 포커스

1. 다음 페이지·제출하기를 눌러 오류가 하나라도 있으면 단계 이동을 멈추고, 화면 순서상 첫 번째 오류 필드로 포커스를 옮김
2. 포커스 대상
   - 한 줄 입력·문단형: 해당 `<input>`·`<textarea>`
   - 목록 선택: combobox 트리거(목록은 열지 않음)
   - 라디오 묶음: 선택된 보기, 없으면 첫 보기
   - 표형 질문: 답하지 않은 첫 행의 첫 보기
3. 포커스 이동 시 필드가 화면 가운데에 오도록 스크롤함(`scrollIntoView({ block: 'center' })`). 라벨과 오류 문구가 함께 보이게 하기 위함. reduced-motion 설정 시 즉시 이동
4. 화면 읽기 프로그램은 포커스된 필드의 이름 + `aria-invalid` + `aria-describedby` 문구를 읽으므로 별도 낭독 영역을 두지 않음
5. 오류 요약을 두지 않는 이유: 한 단계의 필드가 최대 15개 안팎이고 오류 문구가 모두 필드 바로 아래에 있음. 첫 오류로 포커스를 옮기면 위에서 아래로 고쳐 나갈 수 있음. Figma에도 요약 영역이 없음
6. 오류 표시 상태에서 사용자가 첫 필드를 고치고 다시 누르면 남은 오류 중 첫 번째로 이동함

| 상황 | 규칙 | 근거 |
| --- | --- | --- |
| 오류 있음 | 단계 이동 중단, 첫 오류 필드로 포커스 + 가운데 스크롤 | Figma 없음(추정), `components/text-field.md` 5절 |
| 오류 없음 | 다음 단계로 이동. 화면 맨 위로 스크롤하고 단계 제목 `<h1>`(`tabindex="-1"`)에 포커스 | Figma 없음(추정), 코드 `src/pages/apply-page.tsx` |
| 제출하기 오류 없음 | 확인 모달 → 로딩 모달 → 결과 모달(PATTERN-01) | `patterns/feedback.md` |

#### 네이티브 `<select>` 예외(`components/select.md` 11절 결정)

- 결정: 공개 웹사이트 폼에서 네이티브 `<select>`를 쓰지 않음. 데스크톱·모바일 모두 `components/select.md`의 커스텀 listbox(field 트리거 + field-list)를 씀
- 근거
  1. 지원서 목록 중 가장 긴 것이 31개(일), 다음이 18개(출생 연도)임. field-list는 5행 높이 + 세로 스크롤이고 타이핑 검색·PageUp/PageDown 10개 이동이 있어 31개까지 고르기에 충분함(`components/select.md` 3·5절)
  2. Figma에 모바일 field-list(164×50·108×50 항목, Figma 7885:15196, Figma 7885:15246)가 따로 있어 모바일도 커스텀 목록을 쓰는 것이 디자인 의도임
  3. 기기마다 다른 구현을 두면 상태(invalid·completed)·라벨 축소 모양을 두 벌 맞춰야 하고, 네이티브 `<select>`는 라벨 축소(2.1)를 같은 방식으로 그릴 수 없음
- 다시 판단할 조건: 한 목록이 50개를 넘거나, 연·월·일을 한 번에 고르는 날짜 입력이 필요해질 때. 이때는 `<select>`보다 `<input type="date">` 도입을 먼저 검토함

### 2.3 PATTERN-02-03 폭 규칙과 단계 진행

#### 폭 규칙

1. 지원서 폼 본문 폭은 800px(데스크톱)이고 필드는 1·1/2·1/3 세 가지 열 비율만 씀
2. 필드 폭은 열 안에서 `width: 100%`로 늘어남. 한 줄에 같은 비율 필드만 나란히 둠(1/2와 1/3 섞지 않음)
3. 한 줄 필드 간격은 1/2·1/3 줄 모두 `spacing.6` (24px), 모바일 `spacing.3` (12px)(코드 `src/widgets/apply/ui/personal-info-section.css.ts` `row`, 2026-10-22 라이브 기준으로 정정). 필드 폭은 간격을 뺀 나머지를 같은 비율로 나눔(`flex: 1`). Figma 간격(1/2 20px, 1/3 22px)은 기록용
4. 모바일(≤768px)은 본문 342px에 같은 비율을 유지함(1/2 약 165, 1/3 약 106)
5. 769~1365px은 본문 폭 800px 고정, 화면이 그보다 좁으면 좌우 여백을 줄임(design-reference 3.3)
6. 어떤 비율을 쓸지는 값의 길이로 정함

| 비율 | 데스크톱 폭(px) | 모바일 폭(px) | 한 줄 간격 | 쓰는 항목 | 근거 |
| --- | --- | --- | --- | --- | --- |
| 1(full) | 800 | 342 | — | 이름, 이메일, 전화번호, 학교명, 학과, 문단형 답변 | Figma 2007:3422, Figma 8801:6015, `components/text-field.md` 3절 |
| 1/2(half) | 388 | 약 165 | `spacing.6` (24px) / 모바일 `spacing.3` (12px) | 학년·학기, 졸업 연·월 | 코드 `src/widgets/apply/ui/personal-info-section.css.ts`, Figma 8801:6040 |
| 1/3(third) | 약 251 | 약 106 | `spacing.6` (24px) / 모바일 `spacing.3` (12px) | 출생 연·월·일 | 코드 `src/widgets/apply/ui/personal-info-section.css.ts`, Figma 8801:6016 |

#### 세로 간격

| 위치 | 값 | 근거 |
| --- | --- | --- |
| 진행 막대 → 단계 본문 | `raw:120px` | Figma 8801:6003 |
| 섹션(질문 묶음) 사이 | `raw:120px` | Figma 8801:6009 |
| 섹션 제목 → 첫 필드 | `spacing.12` (48px) | Figma 8801:6010, Figma 8801:6038 |
| 질문 제목 → 글자 수 안내 | `raw:10px` | Figma 2009:4228 |
| 같은 섹션 안 필드·줄 사이 | `spacing.8` (32px) | Figma 8801:6013, Figma 8801:6022 |
| 필드 → 오류 문구 | 한 줄 `spacing.3` (12px), 문단형 `spacing.2` (8px) | 코드 `src/widgets/apply/ui/personal-info-section.css.ts`, 코드 `src/shared/components/textfield-with-counter/textfield-with-counter.css.ts` |
| 마지막 섹션 → 이동 버튼 줄 | `raw:120px` | Figma 8801:6005 |

- 모바일 세로 간격: Figma 모바일 지원 폼 화면이 없음(Mobile 페이지의 지원 폼 프레임 6439:12300 등은 1440 폭). 7절 참조

#### 단계 진행

1. 진행 막대는 동의 단계를 뺀 작성 단계에서만 화면 맨 위(단계 제목 위)에 둠. 모양·현재 단계 표시는 `components/progress-bar.md`를 따름
2. 단계 이동은 페이지 하단 이동 줄에서만 함. 한 줄 입력의 Enter는 단계를 넘기지 않음(`components/text-field.md` 5절)
3. 이동 버튼은 `components/button.md`의 text-link variant(`typography.headline-3` 24 Bold + 24px 화살표). `<button type="button">`으로 만듦

| 단계 | 이동 줄 배치 | 근거 |
| --- | --- | --- |
| 첫 작성 단계(지원자 정보 입력) | "다음 페이지 →" 하나, 오른쪽 끝 | Figma 8801:6056, Figma 8801:6130 |
| 중간 단계(공통 질문, 부문 질문) | "← 이전 페이지" 왼쪽 끝, "다음 페이지 →" 오른쪽 끝(양끝 정렬) | Figma 8103:17006, Figma 1981:4292, Figma 1981:4307 |
| 마지막 단계(추가 정보) | "제출하기" brand 넓은 버튼(가운데) + 그 아래 "← 이전 페이지" 왼쪽 | Figma 6439:12438, 코드 `src/widgets/apply/ui/question-section/question-section.tsx` |

- 이전 페이지: 검사 없이 이동, 입력값 유지(2.2 검증 시점 5)
- 다음 페이지·제출하기: 현재 단계 검사 → 오류 있으면 2.2 "제출 시 포커스", 없으면 이동
- 단계가 바뀌면 화면 맨 위로 스크롤하고 단계 제목에 포커스(2.2 표)
- 제출 중(pending) 표시는 `components/button.md` 4절 pending + 로딩 모달(PATTERN-01)

## 3. 적용 컴포넌트

| 컴포넌트 | 이 패턴에서 쓰는 방식 | 명세 |
| --- | --- | --- |
| text-field | single-line(이름·이메일·전화번호·학교·학과), paragraph(질문 답변). 라벨 축소, invalid 두 종류, message 슬롯 | `components/text-field.md` |
| select | field 트리거(출생 연·월·일, 학년·학기, 졸업 연·월). 네이티브 `<select>` 쓰지 않음(2.2) | `components/select.md` |
| radio | 지원 부문·병역·대학원 진학, 표형 질문. 묶음 단위 누락 메시지 | `components/radio.md` |
| checkbox | 동의 단계 약관 동의, 표형 다중 선택 | `components/checkbox.md` |
| button | text-link(이전·다음 페이지), brand wide(제출하기), pending | `components/button.md` |
| progress-bar | 작성 단계 표시 | `components/progress-bar.md` |
| form-add-button | 복수/부전공·프로젝트 추가 | `components/form-add-button.md` |
| modal | 서버 거절·제출 확인·결과 | `components/modal.md`, `patterns/feedback.md` |

## 4. 예시

| 상황 | 예 | 근거 |
| --- | --- | --- |
| 이메일에 "abc" 입력 후 Tab | blur 시 입력 에러. 라벨·값·보더 빨강, 아래 "이메일 형식이 올바르지 않습니다." | Figma 2007:3425 |
| 이메일을 비워 둔 채 Tab | 오류 없음. 다음 페이지를 누를 때 "필수 입력 항목입니다." | Figma 2007:3426 |
| 출생 "월"만 비우고 다음 페이지 | "월" 필드만 invalid, 줄 아래 "필수 입력 항목입니다." 하나. 포커스는 "월" 트리거 | Figma 8801:6016, Figma 없음(추정) |
| 지원 부문 미선택 + 이름 누락 후 다음 페이지 | 둘 다 오류 표시. 포커스는 화면 위쪽인 지원 부문의 첫 보기 | 코드 `src/widgets/apply/ui/personal-info-section.tsx` |
| 문단형에 501자 입력 | 입력 즉시 counter "501/500" 빨강 + "글자 수 제한을 초과했습니다". 다음 페이지 누르면 그 필드로 포커스 | Figma 2009:3441 |
| 공통 질문에서 이전 페이지 | 검사 없이 지원자 정보로 이동, 입력값 그대로 | Figma 8103:17006 |
| 복수/부전공 추가 필드 | 제목 "복수/부전공 (선택)", 비워도 오류 없음 | Figma 없음(추정) |

## 5. Do / Don't

| Do | Don't |
| --- | --- |
| `<label>`을 입력 자리에 보이고 focus·입력 시 위로 축소 | placeholder 속성만으로 항목 이름 표시 |
| 누락은 다음 페이지를 누를 때, 형식은 blur 때 검사 | 빈 필드를 Tab으로 지나갈 때 누락 오류 표시 |
| 오류 문구를 필드 바로 아래(한 줄 12px, 문단형 8px)에 둠 | 오류를 `alert()`·화면 위 요약으로만 알림 |
| 단계 이동 실패 시 첫 오류 필드로 포커스 이동 | 오류만 표시하고 포커스·스크롤을 그대로 둠 |
| 다음 페이지·제출하기를 항상 누를 수 있게 둠 | 미완성이라고 제출하기를 비활성화해 이유를 알 수 없게 함 |
| 한 줄에 같은 비율 필드만 나란히(1/2끼리, 1/3끼리) | 1/2과 1/3을 한 줄에 섞음 |
| 선택 항목에만 "(선택)" 표시 | 필수 항목마다 `*`를 붙임 |
| 이전·다음 페이지를 `<button>`으로 | `<div onClick>`으로 만들어 키보드로 누를 수 없음 |
| 목록 선택은 커스텀 listbox 하나로 | 모바일만 네이티브 `<select>`로 바꿈 |

## 6. 코드 대응

| 대상 | 파일 | 비고 |
| --- | --- | --- |
| frontend | `src/widgets/apply/ui/personal-info-section.tsx` | 명세와 다른 점<br>- 다음 페이지 오류 시 `window.alert` 표시, 포커스 이동 없음 → 필드 아래 오류 문구 + 첫 오류 필드 포커스(2.2, ADOPT-03-22)<br>- 이메일·전화번호 blur 시 빈 값이면 누락 오류 표시 → 값 있을 때만 형식 검사(ADOPT-03-22)<br>- 입력 예시 "01012345678"·"컴퓨터공학과"를 라벨 대신 placeholder로 씀 → 라벨 + 축소 후 예시(ADOPT-03-10)<br>- 오류 문구 `FieldError`가 필드와 연결 안 됨(`aria-describedby` 없음, ADOPT-03-10)<br>- 다음페이지 `<div onClick>`, 문구 "다음페이지"(띄어쓰기 없음) → `<button>` "다음 페이지"(ADOPT-03-09)<br>- 복수/부전공에 "(선택)" 표시 없음(ADOPT-03-22) |
| frontend | `src/widgets/apply/ui/question-section/question-section.tsx` | 명세와 다른 점<br>- 제출하기 `disabled={!isComplete}` → 항상 누를 수 있게(ADOPT-03-22)<br>- 오류 시 포커스 이동 없음(ADOPT-03-22)<br>- 선택 질문에 "(선택)" 표시 없음(ADOPT-03-22)<br>- 이전·다음 `<div onClick>` → `<button>`(ADOPT-03-09)<br>- 표형 누락 문구 `<p>`가 묶음과 연결 안 됨(ADOPT-03-13) |
| frontend | `src/pages/apply-page.tsx`, `src/widgets/apply/ui/apply-title-section.tsx` | 단계 이동 시 맨 위 스크롤만 함 → 단계 제목 `<h1>` 포커스 추가(ADOPT-03-22). 진행 막대는 `components/progress-bar.md` 9절 |
| frontend | `src/features/notice/notice-form.tsx` | 이메일 누락·형식·서버 오류를 `alert()`로 알림 → Figma 입력 오류 모달(ADOPT-04, PATTERN-01-03 대응표). 입력칸에 라벨 없음(placeholder만) → 시각적으로 숨긴 `<label>` 또는 `aria-label`("이메일"). 흰 알약형 입력은 text-field 명세 밖 모양이라 라벨 축소를 적용하지 않음. 모달을 닫으면 포커스를 입력칸으로 돌려놓음 |
| frontend | `src/widgets/apply/apply-dropdown.ts` | 가장 긴 목록 31개(일)·18개(출생 연도). 네이티브 `<select>` 예외 결정(2.2)의 근거 |
| frontend_admin | 없음 | 관리자 콘솔은 이 명세를 따르지 않음. ADOPT-07-03(입력·셀렉트·날짜 입력), 값은 ADOPT-05 기준 |

## 7. 미확인

- 모바일 지원 폼: Figma에 390 폭 지원 폼 화면이 없음. 한 줄 간격은 코드 값(12px), 세로 간격(120·48·32)의 모바일 값 미정
  - Figma 추정(약): 세로 간격은 진행 막대→본문 `spacing.16` (64px), 섹션 사이 `spacing.16`, 섹션 제목→첫 필드 `spacing.8` (32px), 같은 섹션 필드 사이 `spacing.6` (24px) 제안. 모바일 시안이 생기면 덮어씀
- "(선택)" 표시: Figma 없음. 문구·위치 디자이너 확인 필요
  - Figma 추정(약): 제목 뒤 공백 + "(선택)", 제목과 같은 크기, `color.fg.muted` (#999999, 검정 위 7.37) 제안
- 진행 막대 단계 수: Figma 3단계(최종안 8801:6001 포함), frontend 4단계(추가 정보). 4번째 단계 유지 여부는 기획·FE 결정(`components/progress-bar.md` 11절)
