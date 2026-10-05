# ADOPT 앱 적용 명세서

기준일 2026-09-28 · → 전체 구성은 `docs/wbs/00-wbs.md` 참조

## 명세서 목적

- 두 앱이 `v0.1.0` 토큰을 git 태그로 설치해 쓰게 함
- 이 저장소에서는 앱 코드를 고치지 않음. 티켓마다 **해당 앱 저장소에 이슈·PR**을 만듦

**범위:** frontend, frontend_admin
**범위 밖:** 화면 재설계, 컴포넌트 전면 교체

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
| ADOPT-02-02 | `--primary`·`--ring`을 보라(`--boaz-color-palette-purple-100`)로 바꿈. `--destructive`는 빨강 유지 | primary와 destructive 값이 다름 |
| ADOPT-02-03 | 쓰지 않는 `.dark` 블록 삭제(관리자 콘솔은 다크 모드를 켜는 코드가 없음) | `theme.css`에 `.dark` 없음 |
| ADOPT-02-04 | 새 코드·수정 파일은 `slate-*` 대신 shadcn 시맨틱 클래스 사용 규칙을 CLAUDE.md에 추가. 기존 `slate-*` 전면 치환은 하지 않음 | 규칙 문서 |

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
