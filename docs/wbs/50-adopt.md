# ADOPT 앱 적용 명세서

기준일 2026-10-11 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- 두 앱이 `v0.1.0` 토큰을 git 태그로 설치해 쓰게 함
- 관리자 콘솔의 화면별 값(색·모서리·그림자·글자 크기)과 공용 컴포넌트를 통일함(ADOPT-05~07). 디자인팀 Figma는 공개 홈페이지(검정 바탕) 전용이라 관리자 콘솔 디자인이 없음. 색은 Figma 정식 색(팔레트 토큰과 같은 값)을 쓰고, Figma에 없는 값 7개만 관리자 `theme.css`에 임시로 정함(ADOPT-05-03). 크기(모서리·글자·간격)는 관리자 콘솔에서 정하고, 컴포넌트는 Figma의 색과 hover·press 순서만 따름. 토큰을 설치하지 않고 값을 복사해 쓰므로 `v0.1.0`을 기다리지 않음
- 이 저장소에서는 앱 코드를 고치지 않음. 티켓마다 **해당 앱 저장소에 이슈·PR**을 만듦. PR 1개로 닫히지 않는 티켓(ADOPT-06·07)은 앱 저장소에서 화면별·컴포넌트별 이슈로 나눔

**범위:** frontend, frontend_admin
**범위 밖:** 화면 배치·흐름 재설계, frontend 컴포넌트 전면 교체

---

## ADOPT-01 frontend 토큰 연결

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | REPO-06 | 4 | `BOAZ-website/frontend` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-01-01 | `pnpm add github:BOAZ-website/design-system#v0.1.0` | `package.json` 의존성 |
| ADOPT-01-02 | `theme.css.ts`의 값 출처만 `@boaz/design-system/tokens`로 바꿈. 기존 `themeVars.color.grayscale[800]` 등 호출부(약 210곳)는 그대로 둠 | 호출부 변경 0건, 화면 차이 없음 |
| ADOPT-01-03 | 전역 `outline: none`(`global.css.ts:49`) 제거, `:focus-visible` 적용 | 키보드 Tab 이동 시 버튼 포커스 표시 |

## ADOPT-02 frontend_admin 토큰 연결

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 몇 시간 | REPO-06 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-02-01 | `npm install github:BOAZ-website/design-system#v0.1.0`, `theme.css`에서 `tailwind-theme.css` import | 빌드 성공 |
| ADOPT-02-02 | ADOPT-05-02에서 정한 강조색 값을 팔레트 참조로 바꿈: `--primary`·`--ring`·`--sidebar-primary`·`--sidebar-ring`은 `--boaz-color-palette-purple-200`, hover는 `--boaz-color-palette-purple-300` | `theme.css`에 `#6250c7`·`#493c95` 직접 기재 없음, 화면 차이 없음 |

- `.dark` 블록 삭제와 시맨틱 클래스 사용 규칙은 ADOPT-05에서 처리함(토큰 설치와 관계없어 `v0.1.0` 전에 진행)
- TOKEN-01-04에서 팔레트 이름을 정리하므로, `v0.1.0`의 purple 변수 이름이 위와 같은지 설치 시점에 확인함

## ADOPT-03 frontend 값 불일치 정리

**목적:** 조사에서 찾은 Figma와 다른 값을 고침

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | ADOPT-01, COMPONENT-01 | 4 | `BOAZ-website/frontend` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-03-01 | 버튼 press(`:active`) 추가: brand #2C2459, neutral #666666 | 버튼 누를 때 색 변화 |
| ADOPT-03-02 | 흰 버튼 hover `grayscale[100]` → `grayscale[400]`(#999999) | `button.css.ts` |
| ADOPT-03-03 | disabled 배경 #999999 → #666666, 글자 #999999. `outlined`·`glass`에도 disabled 스타일 추가 | `button.css.ts` |
| ADOPT-03-04 | 박스 탭 hover를 흰 배경·검정 글자로(Figma 탭 인터렉션) | `fixed-tab.css.ts` |
| ADOPT-03-05 | 체크박스 색 오타 `#7964F9` → 토큰 | `agreement-step.css.ts` |
| ADOPT-03-06 | 쓰지 않는 스타일·컴포넌트 삭제: `display1_bd_80`, `h1_md_40`, `form-header` | 참조 0건 확인 후 삭제 |
| ADOPT-03-07 | Text 1 굵기 400 → 300(Figma Text 1은 14 Light). `fontWeight`에 300이 없어 `text_rg_14`가 400으로 쓰임(약 28곳) | `typography.text-1.weight` 참조, 화면에서 14px 글자가 Light |
| ADOPT-03-08 | Body 4 - Paragraph 행간 1.6 → 30px(Figma 값. `lineHeight.card` 1.6 = 28.8px) | `typography.body-4-paragraph.line-height` 참조 |

## ADOPT-04 frontend `alert()` → 모달 교체

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | COMPONENT-07, PATTERN-01 | 4 | `BOAZ-website/frontend` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-04-01 | 공용 Modal 컴포넌트(`shared/components/modal`) | 컴포넌트 존재 |
| ADOPT-04-02 | `alert()` 10곳을 PATTERN-01-03 대응표대로 교체 | `rg "alert\(" src` 0건 |

## ADOPT-05 frontend_admin 값 기준 확정

**목적:** 관리자 콘솔 화면을 통일할 기준값을 정하고 `theme.css`와 규칙 문서에 반영함. 디자인팀에 관리자용 디자인을 요청할 수 없어 Figma 정식 색을 우선 쓰고, 없는 값만 대비 계산으로 정함(2026-10-11 결정). 2026-10-11 조사 기준 주 버튼 배경 5종(`bg-slate-900`·`bg-blue-600`·`bg-blue-500`·`bg-red-500`·`bg-purple-600`), `bg-primary` 사용 0건, `--primary`와 `--destructive`가 같은 값(`#ef4444`)

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | 없음 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-05-01 | 바탕·회색 역할(Figma 정식 회색): 바탕·카드·팝업·입력 #FFFFFF(`--background`·`--card`·`--popover`·`--input`), 구분선·카드 테두리 #E6E6E6(Gray100, `--border`), 본문 글자 #1A1A1A(Gray900, `--foreground`, 흰 바탕 17.40:1), 보조 글자 #666666(Gray600, `--muted-foreground`, 5.74:1), 입력칸 테두리 #666666, 비활성 #B3B3B3(Gray300) 또는 투명도. #999999 이상 밝은 회색은 글자·입력 테두리에 쓰지 않음(흰 바탕 2.85:1). Tailwind slate는 쓰지 않음 | `theme.css` 회색 값이 모두 팔레트 값과 같음 |
| ADOPT-05-02 | 강조색(Figma 보라): `--primary`·`--ring`·`--sidebar-primary`·`--sidebar-ring` #6250C7(Primary-subtle-purple, 팔레트 purple-200), hover #493C95(purple-300), `--primary-foreground` #FFFFFF. #7A64F9(purple-100)는 흰 글자 4.18:1로 일반 글자 AA(4.5:1) 미달이고 관리자 버튼은 `text-xs`·`text-sm`이라 큰 글자 예외가 적용되지 않음. #6250C7은 6.01:1, #493C95는 8.88:1. 포커스 링은 #6250C7 2px에 흰 간격 2px(`ring-offset-2`)를 둠(간격이 없으면 주 버튼 위에서 1.00:1). 전역 `outline-ring/50`은 반투명이라 불투명으로 바꿈 | `--primary`와 `--destructive` 값이 다름. `theme.css`에 `/50` 포커스 없음 |
| ADOPT-05-03 | Figma에 없는 값 7개를 `theme.css`에 정함. 주석에 "Figma 밖 값, 2026-10-11 결정, 디자인팀 값이 생기면 교체"를 적음. 보조 면(표 머리글·hover·배지 바탕) #F5F5F5(`--muted`·`--secondary`, 흰색과 Gray100 사이 단계가 없어 추가), 위험 글자·버튼 #C92A2D(`--destructive`, Error-red #F96466을 어둡게 함. #F96466은 흰 바탕 2.98:1로 미달)와 위험 바탕 #FFF3F3, 성공 글자 #047857(`--success`, Tailwind emerald-700)과 바탕 #ECFDF5, 경고 글자 #B45309(`--warning`, Tailwind amber-700)와 바탕 #FFFBEB. 각 글자색은 흰색·#F5F5F5·자기 바탕 위에서 4.5:1 이상(위험 5.45·5.00·5.03, 성공 5.48·5.03·5.21, 경고 5.02·4.61·4.84) | `theme.css`에 6개 값과 출처 주석 |
| ADOPT-05-04 | 상태는 색만으로 구분하지 않음. 배지·알림에 아이콘이나 문구("성공", "실패")를 함께 둠. 색각 이상 시뮬레이션에서 성공·위험·경고가 거의 같은 색으로 보임 | `CLAUDE.md` 규칙 |
| ADOPT-05-05 | 모서리 기준: 입력·버튼 `rounded-sm`, 카드·표 `rounded-md`, 팝업 `rounded-lg`, `rounded-xl` 이상 쓰지 않음(출결 화면 기준). `--radius`에서 계산되는 값과 맞는지 확인 | 기준과 `--radius` 대응표 |
| ADOPT-05-06 | 쓰지 않는 `.dark` 블록과 `@custom-variant dark` 줄 삭제(관리자 콘솔은 다크 모드를 켜는 코드가 없음) | `theme.css`에 `.dark` 없음 |
| ADOPT-05-07 | 새 코드·수정 파일은 Tailwind 기본 팔레트(`slate-*`·`emerald-*` 등)와 `bg-white` 대신 시맨틱 클래스(`bg-background`·`bg-card`·`text-muted-foreground`·`text-destructive` 등)를 쓴다는 규칙을 CLAUDE.md에 추가. `src/shared/ui` 사용 현황 설명을 실제 import 현황에 맞게 고침 | 규칙 문서 |

## ADOPT-06 frontend_admin 화면 값 통일

**목적:** ADOPT-05 기준값을 모든 화면에 적용함. 화면 단위로 이슈·PR을 나누고, 개발 중인 화면은 그 기능 PR이 머지된 뒤 진행함

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 한 주 | ADOPT-05 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-06-01 | 모서리를 ADOPT-05-05 기준으로 바꿈 | `grep -rE 'rounded-[23]?xl' src` 0건 |
| ADOPT-06-02 | 성공·위험·경고 색을 ADOPT-05-03의 `--success`·`--destructive`·`--warning`으로 바꾸고, 상태 배지에 아이콘·문구를 붙임(ADOPT-05-04) | `grep -rE -e 'red-[0-9]' -e 'rose-[0-9]' -e 'emerald-[0-9]' -e 'amber-[0-9]' -e 'orange-[0-9]' src` 0건 |
| ADOPT-06-03 | 주 버튼 배경 5종을 `bg-primary`로, 위험 버튼을 `bg-destructive`로 바꿈 | 주 버튼 용도의 `bg-slate-900`·`bg-blue-600`·`bg-blue-500`·`bg-purple-600` 0건 |
| ADOPT-06-04 | 입력 포커스 표시를 `--ring`(ADOPT-05-02) 한 가지로 통일. `CreateButton`의 `ring-slate-300`(흰 바탕 약 1.5:1) 포함 | `grep -rE -e 'focus:border-slate-400' -e 'focus:border-blue-500' src` 0건 |
| ADOPT-06-05 | 모달 오버레이 배경(현재 14종)과 폭을 `modalStyles` 정의값으로 통일 | 오버레이 배경 1종 |
| ADOPT-06-06 | 그림자: 팝업 `shadow-2xl`, 카드 `shadow-2xs` | 카드에 `shadow-xl`·`shadow-2xl` 0건 |
| ADOPT-06-07 | 임의 글자 크기(`text-[11px]` 등)를 `text-xs`·`text-sm` 등 기본 단계로 바꿈. 관리자 기본 글자 14px 기준이라 `text-base` 이상으로 키우지 않음 | `grep -rE 'text-\[[0-9]+px\]' src` 0건 |
| ADOPT-06-08 | 회색 직접 지정을 시맨틱 클래스로 바꿈: `bg-white` → `bg-card`, `bg-slate-50`·`bg-slate-100` → `bg-background` 또는 `bg-muted`(쓰인 자리에 따라 판단, 일괄 치환 금지), `text-slate-400`(244곳, 흰 바탕 2.56:1 미달)·`text-slate-500` → `text-muted-foreground`, 나머지 `slate-*` 글자·테두리 → `text-foreground`·`border-border` | `grep -rE 'slate-[0-9]' src` 0건 |
| ADOPT-06-09 | 하드코딩 hex를 시맨틱 클래스·CSS 변수로 바꿈(인라인 `style` 포함) | `grep -rE '#[0-9a-fA-F]{6}' src --include='*.tsx'` 0건 |
| ADOPT-06-10 | 치환이 끝난 뒤 `theme.css`에 `@theme { --color-*: initial; }`를 넣어 Tailwind 기본 팔레트를 막고 시맨틱 색만 다시 선언함(관리자 저장소에 린트가 없어 재발을 막는 수단). 치환 전에 넣으면 클래스가 사라져 화면이 깨지므로 마지막에 넣음 | `bg-slate-100`을 새로 쓰면 스타일이 적용되지 않음, `npm run build` 성공 |

## ADOPT-07 frontend_admin 공용 컴포넌트

**목적:** 화면마다 직접 마크업한 버튼·입력·모달·표를 공용 컴포넌트로 바꿈. 컴포넌트 코드는 이 저장소 범위 밖이라 `frontend_admin`의 `src/shared/ui`에 만듦. 컴포넌트별로 이슈·PR을 나눔

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 한 주 | ADOPT-06 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-07-01 | 쓰지 않는 공용 컴포넌트 4개(`Btn`, `SectionCard`, `Tag`, `CardHeader`, import 0곳)를 다시 쓸지 지울지 결정 | 결정이 이슈에 기록됨 |
| ADOPT-07-02 | 버튼: 시맨틱 클래스 기반으로 다시 만들고 화면의 `<button>` 교체 | 화면 파일의 주 버튼 직접 마크업 0건 |
| ADOPT-07-03 | 입력·셀렉트·날짜 입력(현재 직접 `<input>` 약 90, `<select>` 약 32) | 화면 파일의 직접 `<input>`·`<select>` 0건 |
| ADOPT-07-04 | 모달: 오버레이, 닫기 버튼, Esc 닫기, 포커스 가두기 | 화면 파일의 모달 마크업이 공용 컴포넌트 호출로 바뀜 |
| ADOPT-07-05 | 표(현재 11개 화면이 직접 `<table>`) | 화면 파일의 직접 `<table>` 0건 |
| ADOPT-07-06 | 카드·태그·배지 | 화면 파일의 배지 직접 마크업 0건 |
| ADOPT-07-07 | 빈 상태·불러오기 실패 안내(현재 약 13개 파일이 각자 문구·모양을 씀) | 대상 파일이 공용 컴포넌트를 씀 |
| ADOPT-07-08 | 탭(현재 1개 화면) | 해당 화면이 공용 컴포넌트를 씀 |
