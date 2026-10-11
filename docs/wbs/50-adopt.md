# ADOPT 앱 적용 명세서

기준일 2026-10-11 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- 두 앱이 `v0.1.0` 토큰을 git 태그로 설치해 쓰게 함
- 관리자 콘솔의 화면별 값(색·모서리·그림자·글자 크기)과 공용 컴포넌트를 통일함(ADOPT-05~07). 관리자 콘솔은 디자인 시안이 없어 shadcn 기본 체계를 따르고, 강조색만 팔레트 보라(purple-200·300)를 씀. 토큰을 설치하지 않으므로 `v0.1.0`을 기다리지 않음
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

**목적:** 관리자 콘솔 화면을 통일할 기준값을 정하고 `theme.css`와 규칙 문서에 반영함. 2026-10-11 조사 기준 주 버튼 배경 5종(`bg-slate-900`·`bg-blue-600`·`bg-blue-500`·`bg-red-500`·`bg-purple-600`), `bg-primary` 사용 0건, `--primary`와 `--destructive`가 같은 값(`#ef4444`)

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 하루이틀 | 없음 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-05-01 | 배경 역할: 바탕 `--background` #f8fafc(`bg-background`), 면(카드·표·입력·팝업) `--card`·`--popover`·`--input` #FFFFFF(`bg-card`), 보조 영역(표 머리글·hover·비활성) `--muted`·`--secondary` #f1f5f9. 현재 `--muted`는 `--background`와 같은 #f8fafc라 #f1f5f9로 바꿈 | `--muted`와 `--background` 값이 다름 |
| ADOPT-05-02 | 강조색: `--primary`·`--ring`·`--sidebar-primary`·`--sidebar-ring`을 #6250c7(팔레트 purple-200), hover #493c95(purple-300), `--primary-foreground` #FFFFFF. purple-100(#7a64f9)은 흰 글자 대비 4.18:1로 일반 글자 AA(4.5:1) 미달이고, 관리자 버튼은 `text-xs`·`text-sm`이라 큰 글자 예외가 적용되지 않음. purple-200은 6.01:1, purple-300은 8.88:1 | `--primary`와 `--destructive` 값이 다름 |
| ADOPT-05-03 | 상태 색: 성공(emerald)·위험(rose 또는 red)·경고(amber) 계열에서 각 1단계를 정함. 흰 글자를 올리는 배경은 4.5:1 이상인 단계만 씀. 현재 `--destructive` #ef4444는 흰 글자 3.76:1로 미달 | 정한 단계와 대비값이 `frontend_admin` 문서에 있음 |
| ADOPT-05-04 | 모서리 기준: 입력·버튼 `rounded-sm`, 카드·표 `rounded-md`, 팝업 `rounded-lg`, `rounded-xl` 이상 쓰지 않음(출결 화면 기준). `--radius`에서 계산되는 값과 맞는지 확인 | 기준과 `--radius` 대응표 |
| ADOPT-05-05 | 쓰지 않는 `.dark` 블록과 `@custom-variant dark` 줄 삭제(관리자 콘솔은 다크 모드를 켜는 코드가 없음) | `theme.css`에 `.dark` 없음 |
| ADOPT-05-06 | 새 코드·수정 파일은 `slate-*`·`bg-white` 대신 shadcn 시맨틱 클래스(`bg-background`·`bg-card`·`text-muted-foreground` 등)를 쓴다는 규칙을 CLAUDE.md에 추가. `src/shared/ui` 사용 현황 설명을 실제 import 현황에 맞게 고침 | 규칙 문서 |

## ADOPT-06 frontend_admin 화면 값 통일

**목적:** ADOPT-05 기준값을 모든 화면에 적용함. 화면 단위로 이슈·PR을 나누고, 개발 중인 화면은 그 기능 PR이 머지된 뒤 진행함

| 규모 | 선행 | Phase | 대상 저장소 |
| --- | --- | --- | --- |
| 한 주 | ADOPT-05 | 4 | `BOAZ-website/frontend_admin` |

| 기능 ID | 기능 | 완료 확인 방법 |
| --- | --- | --- |
| ADOPT-06-01 | 모서리를 ADOPT-05-04 기준으로 바꿈 | `grep -rE 'rounded-[23]?xl' src` 0건 |
| ADOPT-06-02 | 성공·위험·경고 색을 ADOPT-05-03에서 정한 단계로 바꿈 | 정한 단계 외 `red-`·`rose-`·`emerald-`·`amber-`·`orange-` 0건 |
| ADOPT-06-03 | 주 버튼 배경 5종을 `bg-primary`로, 위험 버튼을 `bg-destructive`로 바꿈 | 주 버튼 용도의 `bg-slate-900`·`bg-blue-600`·`bg-blue-500`·`bg-purple-600` 0건 |
| ADOPT-06-04 | 입력 포커스 표시를 `--ring` 기준 한 가지로 통일 | `grep -rE -e 'focus:border-slate-400' -e 'focus:border-blue-500' src` 0건 |
| ADOPT-06-05 | 모달 오버레이 배경(현재 14종)과 폭을 `modalStyles` 정의값으로 통일 | 오버레이 배경 1종 |
| ADOPT-06-06 | 그림자: 팝업 `shadow-2xl`, 카드 `shadow-2xs` | 카드에 `shadow-xl`·`shadow-2xl` 0건 |
| ADOPT-06-07 | 임의 글자 크기(`text-[11px]` 등)를 `text-xs`·`text-sm` 등 기본 단계로 바꿈. 관리자 기본 글자 14px 기준이라 `text-base` 이상으로 키우지 않음 | `grep -rE 'text-\[[0-9]+px\]' src` 0건 |
| ADOPT-06-08 | 배경 직접 지정을 시맨틱 클래스로 바꿈: `bg-white` → `bg-card`, `bg-slate-50` → `bg-background` 또는 `bg-muted`, `bg-slate-100` → `bg-secondary` | `grep -rE -e 'bg-white' -e 'bg-slate-50[^0-9]' -e 'bg-slate-100' src` 0건 |
| ADOPT-06-09 | 하드코딩 hex를 시맨틱 클래스·CSS 변수로 바꿈(인라인 `style` 포함) | `grep -rE '#[0-9a-fA-F]{6}' src --include='*.tsx'` 0건 |

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
