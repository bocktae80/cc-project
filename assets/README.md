# Assets 폴더

> 스크린샷, 다이어그램, 영상 대본 등 시각 자료를 관리하는 폴더입니다.

## 구조

```
assets/
├── diagrams/              # 프로젝트별 다이어그램 (SVG)
│   ├── 01/                # 01-memory-system
│   ├── 02/                # 02-file-operations
│   ├── 03/                # 03-code-search
│   ├── 03d/               # 03-debug-features
│   ├── 04/                # 04-web-search
│   ├── 05/                # 05-agent-teams
│   ├── 06/                # 06-hooks
│   ├── 07/                # 07-mcp-server
│   └── 08/                # 08-skills-commands
├── scripts/               # 영상 대본 (8편)
├── screenshot-guide.md    # 프로젝트별 캡처 대상 목록
└── README.md              # 이 파일
```

## 다이어그램 가이드

- **형식**: Mermaid (README.md에 인라인) + SVG (별도 파일)
- **스타일**: studio CSS 변수 참조 (`--color-primary`, `--color-secondary`)
- 상세 가이드: [`diagrams/README.md`](diagrams/README.md)

## 영상 대본 가이드

- **형식**: 마크다운
- **구조**: Hook(30s) → Concept(1~2min) → Demo(2~3min) → Recap(30s)
- 상세 가이드: [`scripts/README.md`](scripts/README.md)

## 스크린샷

프로젝트별 캡처 대상은 [`screenshot-guide.md`](screenshot-guide.md) 참조.
