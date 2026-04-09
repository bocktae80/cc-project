# CC Project 상태

## 현재 단계
- **Phase:** 전체 완료 (M0~M6 + 인프라 + M7/M8 유지보수)
- **진행률:** 26/26 튜토리얼 완료
- **CLI 기준 버전:** v2.1.97 (26개 전부 최신, 갱신 필요 0개)
- **최근 작업:** v2.1.97 튜토리얼 갱신 — 8개 콘텐츠 업데이트 (Managed Agents, Focus view, sessionTitle 훅, 플러그인 스킬 name, `● N running`, dangerously-skip-permissions 수정, `/ultraplan` 원격 Plan 모드) + 버전 범프 (2026-04-09)

## 튜토리얼 현황

| # | 프로젝트 | Phase | 난이도 | 상태 |
|---|----------|-------|--------|------|
| 01 | [메모리 시스템](../../projects/01-memory-system/) | M1 기초 | 3 | 완료 |
| 02 | [파일 읽기/쓰기](../../projects/02-file-operations/) | M1 기초 | 1 | 완료 |
| 03 | [코드 검색](../../projects/03-code-search/) | M1 기초 | 1 | 완료 |
| 04 | [웹 검색/페치](../../projects/04-web-search/) | M1 기초 | 2 | 완료 |
| 05 | [Agent Teams](../../projects/05-agent-teams/) | M2 고급 | 3 | 완료 |
| 03d | [디버그 기능](../../projects/03-debug-features/) | M2 고급 | 2 | 완료 |
| 06 | [Hooks](../../projects/06-hooks/) | M2 고급 | 2 | 완료 |
| 07 | [MCP 서버](../../projects/07-mcp-server/) | M2 고급 | 3 | 완료 |
| 08 | [Skills & 커맨드](../../projects/08-skills-commands/) | M2 고급 | 2 | 완료 |
| 21 | [/simplify 스킬](../../projects/21-simplify/) | M2 고급 | 2 | 완료 |
| 09 | [Worktree](../../projects/09-worktree/) | M4 최신 | 2 | 완료 |
| 10 | [CLI 마스터](../../projects/10-cli-master/) | M4 최신 | 1 | 완료 |
| 11 | [MCP 커넥터](../../projects/11-mcp-connectors/) | M4 최신 | 2 | 완료 |
| 12 | [Figma MCP](../../projects/12-figma-mcp/) | M4 최신 | 3 | 완료 |
| 22 | [배치 모드](../../projects/22-batch-mode/) | M4 최신 | 2 | 완료 |
| 13 | [텔레포트](../../projects/13-teleport/) | M5 확장 | 2 | 완료 |
| 14 | [코드 보안 스캔](../../projects/14-code-security/) | M5 확장 | 3 | 완료 |
| 15 | [브라우저 자동화](../../projects/15-browser-automation/) | M6 심화 | 2 | 완료 |
| 16 | [백그라운드 에이전트](../../projects/16-background-agents/) | M6 심화 | 2 | 완료 |
| 17 | [플러그인 시스템](../../projects/17-plugin-system/) | M6 심화 | 3 | 완료 |
| 18 | [Agent SDK](../../projects/18-agent-sdk/) | M6 심화 | 3 | 완료 |
| 19 | [권한 심화](../../projects/19-permissions-deep/) | M6 심화 | 2 | 완료 |
| 20 | [IDE 통합](../../projects/20-ide-integration/) | M6 심화 | 1 | 완료 |
| 23 | [Ralph Loop](../../projects/23-ralph-loop/) | M6 심화 | 3 | 완료 |

## Phase별 요약

| Phase | 튜토리얼 | 상태 |
|-------|----------|------|
| M1: 기초 도구 | 4/4 | 완료 |
| M2: 고급 기능 | 6/6 | 완료 |
| M3: 시각화 | 3/3 | 완료 |
| M4: 최신 기능 | 7/7 | 완료 |
| M5: 확장 기능 | 2/2 | 완료 |
| M6: 심화 활용 | 7/7 | 완료 |

## 인프라

| 항목 | 상태 | 비고 |
|------|------|------|
| [학습 스튜디오](../../studio/index.html) | 완료 | v2 리디자인 적용 (2026-03-05) |
| 버전 추적 시스템 | 완료 | version-track.json + check-updates.js |
| v2.1.72 갱신 | 완료 | 6개 basedOn 2.1.72 + 20개 2.1.70 유지 (2026-03-10) |
| `/update-check` 스킬 | 완료 | changelog 분석 + 튜토리얼 매칭 자동화 |
| 콘텐츠 파일 | 완료 | content-01~25 + content-03d (26개) |
| 학습 뷰 엔진 | 완료 | learn.js + quiz.js + challenges.js |
| 샌드박스 엔진 | 완료 | sandbox-engine.js + terminal.js |

## Studio v2 아키텍처 (2026-03-05)

```
studio/
├── index.html          # 메인 HTML (변경 없음)
├── css/
│   ├── style.css       # v1 (보존) + v2 카탈로그 CSS
│   ├── learn.css       # 학습 뷰 CSS (변경 없음)
│   └── sandbox.css     # 샌드박스 CSS (변경 없음)
├── js/
│   ├── app.js          # v2 리디자인: 사이드바+카드v2+히어로+학습경로
│   ├── learn.js        # 학습 뷰 (변경 없음)
│   ├── quiz.js         # 퀴즈 엔진 (변경 없음)
│   ├── challenges.js   # 챌린지 (변경 없음)
│   ├── level-system.js # 레벨 시스템 (변경 없음)
│   ├── sandbox-engine.js # 샌드박스 (변경 없음)
│   └── terminal.js     # 터미널 (변경 없음)
└── data/
    ├── projects.js     # 프로젝트 메타데이터 (24개)
    ├── content/        # 콘텐츠 파일 (24개)
    ├── version-track.json
    └── check-updates.js
```
