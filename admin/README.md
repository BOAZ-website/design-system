# 관리자 디자인 시스템

관리자 시스템(`frontend_admin`)의 토큰, 명세, 컴포넌트 코드를 두는 폴더입니다. 지금은 폴더만 있고 내용은 이슈 #97 순서에 따라 채웁니다.

| 폴더 | 둘 것 |
| --- | --- |
| `tokens/color/` | `palette.json`(허용 색 목록), `semantic.json`(shadcn 역할 이름의 용도별 색) |
| `tokens/` | `typography.json`(글자 크기), `radius.json`(모서리) |
| `components/` | 컴포넌트 명세. 파일 이름은 `src/components/`의 폴더 이름과 같게 둡니다(예: `table.md`) |
| `patterns/` | Tailwind 사용 규칙, 확인 및 안내 창, 접근성, 문구 |
| `src/components/` | 컴포넌트 코드. `frontend_admin/src/shared/ui/`에서 옮깁니다 |
| `src/lib/` | 컴포넌트가 쓰는 함수 |

- `core/`만 참조하고 `home/`은 참조하지 않습니다.
- 빈 폴더를 git에 남기려고 넣은 `.gitkeep`은 그 폴더에 첫 파일을 넣을 때 지웁니다.
