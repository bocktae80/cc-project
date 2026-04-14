# CC Project 로드맵

> 최종 갱신: 2026-04-09

## 완료된 마일스톤

### M0: 인프라 (완료 7/7)

- [x] 학습 스튜디오 대시보드 → [`studio/`](../../studio/index.html)
- [x] 스튜디오 v2 리디자인 (사이드바+카드v2+히어로+학습경로)
- [x] 버전 추적 시스템 → [`studio/data/version-track.json`](../../studio/data/version-track.json)
- [x] 콘텐츠 업데이트 체커 → [`studio/data/check-updates.js`](../../studio/data/check-updates.js)
- [x] v2.1.70 전체 갱신 (24/24 튜토리얼 basedOn 2.1.70, 2026-03-07)
- [x] v2.1.72 부분 갱신 (6개 콘텐츠 업데이트, 2026-03-10)
- [x] `/update-check` 스킬 (changelog 분석 + 튜토리얼 매칭 자동화) → [`.claude/skills/update-check/`](../../.claude/skills/update-check/SKILL.md)

### M1: 기초 도구 (완료 4/4)

- [x] 01 — 메모리 시스템 (CLAUDE.md, auto-memory) → [`01-memory-system`](../../projects/01-memory-system/)
- [x] 02 — 파일 읽기/쓰기 (Read, Write, Edit) → [`02-file-operations`](../../projects/02-file-operations/)
- [x] 03 — 코드 검색 (Glob, Grep) → [`03-code-search`](../../projects/03-code-search/)
- [x] 04 — 웹 검색/페치 (WebSearch, WebFetch) → [`04-web-search`](../../projects/04-web-search/)

### M2: 고급 기능 (완료 6/6)

- [x] 05 — Agent Teams (Task, TeamCreate, SendMessage) → [`05-agent-teams`](../../projects/05-agent-teams/)
- [x] 03d — 디버그 기능 (`--debug`, `/debug`) → [`03-debug-features`](../../projects/03-debug-features/)
- [x] 06 — Hooks (16 이벤트, 4 타입) → [`06-hooks`](../../projects/06-hooks/)
- [x] 07 — MCP 서버 (MCP, 커스텀 서버) → [`07-mcp-server`](../../projects/07-mcp-server/)
- [x] 08 — Skills & 커맨드 (SKILL.md, 프론트매터, 번들 스킬) → [`08-skills-commands`](../../projects/08-skills-commands/)
- [x] 21 — /simplify 스킬 (코드 품질 자동 개선) → [`21-simplify`](../../projects/21-simplify/)

### M3: 튜토리얼 시각화 (완료 3/3)

- [x] 스크린샷 캡처 가이드 → [`assets/screenshot-guide.md`](../../assets/screenshot-guide.md)
- [x] 단계별 플로우 다이어그램 (Mermaid) → [`assets/diagrams/`](../../assets/diagrams/)
- [x] 영상 대본 작성 (8편, ~38분) → [`assets/scripts/`](../../assets/scripts/)

### M4: 최신 기능 (완료 7/7)

- [x] 09 — Worktree (안전한 실험 공간) → [`09-worktree`](../../projects/09-worktree/)
- [x] 10 — CLI 마스터 (터미널 관리) → [`10-cli-master`](../../projects/10-cli-master/)
- [x] 11 — MCP 커넥터 (claude.ai 도구) → [`11-mcp-connectors`](../../projects/11-mcp-connectors/)
- [x] 12 — Figma MCP (디자인-코드 연결) → [`12-figma-mcp`](../../projects/12-figma-mcp/)
- [x] 22 — 배치 모드 (-p 파이프, CI/CD 연동) → [`22-batch-mode`](../../projects/22-batch-mode/)
- [x] 24 — /loop & Cron (/loop 반복 감시, CronCreate/List/Delete) → [`24-loop-cron`](../../projects/24-loop-cron/)
- [x] 25 — Skills 2.0 (Progressive Disclosure, Skill Creator) → [`25-skills-2.0`](../../projects/25-skills-2.0/)

### M5: 확장 기능 (완료 2/2)

- [x] 13 — 텔레포트 (세션 이동: &, /teleport, /rc) → [`13-teleport`](../../projects/13-teleport/)
- [x] 14 — 코드 보안 스캔 (AI 보안 스캔, OWASP Top 10) → [`14-code-security`](../../projects/14-code-security/)

### M6: 심화 활용 (완료 7/7)

- [x] 15 — 브라우저 자동화 (Chrome 확장, 스크린샷, GIF) → [`15-browser-automation`](../../projects/15-browser-automation/)
- [x] 16 — 백그라운드 에이전트 (run_in_background, TaskOutput) → [`16-background-agents`](../../projects/16-background-agents/)
- [x] 17 — 플러그인 시스템 (plugin.json, LSP, output styles) → [`17-plugin-system`](../../projects/17-plugin-system/)
- [x] 18 — Agent SDK (Python/TypeScript SDK) → [`18-agent-sdk`](../../projects/18-agent-sdk/)
- [x] 19 — 권한 심화 (권한 모드, 와일드카드, deny/allow) → [`19-permissions-deep`](../../projects/19-permissions-deep/)
- [x] 20 — IDE 통합 (VS Code, Cursor, JetBrains) → [`20-ide-integration`](../../projects/20-ide-integration/)
- [x] 23 — Ralph Loop (자율 개발 루프, PRD 기반) → [`23-ralph-loop`](../../projects/23-ralph-loop/)

### M7: 유지보수 — v2.1.92 갱신 (완료 2/2)

- [x] M7-01 — v2.1.88~2.1.92 changelog 분석 + 12개 콘텐츠 갱신 + 도구 파이프라인/실행 모드 보충
- [x] M7-02 — version-track.json 전체 26개 basedOn 2.1.92 갱신 + 구문 검증

### M8: 유지보수 — v2.1.97 갱신 (완료 3/3)

- [x] M8-01 — v2.1.94~2.1.97 changelog 분석 + 8개 콘텐츠 갱신 (05/06/08/10/16/17/18/19): Managed Agents, Focus view, `refreshInterval`, `workspace.git_worktree`, `sessionTitle` 훅, 플러그인 스킬 name 안정화, `● N running` 인디케이터, `--dangerously-skip-permissions` 다운그레이드 수정
- [x] M8-02 — `/ultraplan` (원격 Plan 모드, Claude Code on the Web) 섹션을 16-background-agents에 추가
- [x] M8-03 — version-track.json 2.1.92 → 2.1.97 bump + 8개 파일 구문 검증 통과

### M9: 유지보수 — v2.1.108 갱신 (완료 3/3)

- [x] M9-01 — v2.1.104~2.1.108 changelog 분석 + 3개 ⭐⭐⭐ 콘텐츠 갱신 (06/08/17): PreCompact 블로킹, 플러그인 monitors 매니페스트, Skill 도구로 내장 /init·/review·/security-review 자동 호출, /recap, /undo alias
- [x] M9-02 — 27 — 프롬프트 캐싱 TTL 제어 신규 튜토리얼 추가 → [`27-prompt-caching`](../../projects/27-prompt-caching/): ENABLE_PROMPT_CACHING_1H / FORCE_PROMPT_CACHING_5M 환경 변수, TTL 선택 가이드, 비용 절감 시나리오 3종
- [x] M9-03 — version-track.json 2.1.104 → 2.1.108 bump + 27개 → 28개 추적 + 전체 콘텐츠 구문 검증 통과

<!-- ID 마이그레이션 이력 (2026-03-19): P0~P6 → M0~M6 -->
