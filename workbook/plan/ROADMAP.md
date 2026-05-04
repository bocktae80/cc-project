# CC Project 로드맵

> 최종 갱신: 2026-05-04

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

### M10: 유지보수 — v2.1.114 갱신 (완료 5/5)

- [x] M10-01 — 19-permissions-deep ⭐⭐⭐ 갱신: `sandbox.network.deniedDomains`(v2.1.113), 글롭 패턴 자동 승인(v2.1.111), Bash 래퍼(env/sudo/watch/ionice/setsid) deny 매칭, macOS `/private/*` 위험 경로, `Bash(find:*)` 자동 승인 제한, `/less-permission-prompts` 스킬, PermissionRequest 훅 재검증
- [x] M10-02 — 10-cli-master ⭐⭐⭐ 갱신: `/tui` 풀스크린(v2.1.110), `/focus` 분리, `autoScrollEnabled`, Push notification 도구, `xhigh` effort + 인터랙티브 슬라이더(v2.1.111), Auto mode 기본화, "Auto (match terminal)" 테마, typo 제안, Plan 파일명 의미화, 네이티브 바이너리(v2.1.113), `Ctrl+A/E` readline, `Shift+↑/↓` 스크롤
- [x] M10-03 — 24-loop-cron ⭐⭐ 갱신: `/proactive` alias(v2.1.105), `--resume` 스케줄 작업 복원(v2.1.110), Remote Control에서 `/autocompact`/`/context`/`/exit`/`/reload-plugins`, Esc로 wakeup 취소(v2.1.113), "Claude resuming /loop wakeup" 표시, 1회성 작업 라벨 수정
- [x] M10-04 — 28 — /ultrareview 신규 튜토리얼 추가 → [`28-ultrareview`](../../projects/28-ultrareview/): 클라우드 멀티 에이전트 병렬 리뷰(v2.1.111), `/ultrareview <PR#>` GitHub PR 모드, 병렬 런치 + diffstat 런치 다이얼로그(v2.1.113), 기능 PR + 보안 민감 PR 시나리오 2종
- [x] M10-05 — version-track.json 2.1.108 → 2.1.114 bump + 28개 → 29개 추적 + 전체 콘텐츠 구문 검증 통과

### M11: 유지보수 — v2.1.119 갱신 (완료 4/4)

- [x] M11-01 — ⭐⭐⭐ 콘텐츠 갱신 (06/10/03): Hooks `mcp_tool` 새 type(v2.1.118), `/cost`+`/stats` → `/usage` 통합(v2.1.118), Vim visual mode `v`/`V`(v2.1.118), 커스텀 테마 시스템(v2.1.118), Native macOS/Linux 빌드 Glob/Grep → bfs/ugrep via Bash(v2.1.117)
- [x] M11-02 — ⭐⭐ 콘텐츠 갱신 (05/07/17/19/22/28): Agent frontmatter `hooks:`/`mcpServers:` `--agent` 메인 스레드 동작, `--agent` `permissionMode` 존중, Forked subagents 외부 빌드, `claude plugin tag`, `plugin install` 의존성 자동, 플러그인 `themes/`, Auto mode `"$defaults"`, `--print` 모드 agent tools 존중, `--from-pr` GitLab/Bitbucket/GHE, MCP 재구성 병렬화
- [x] M11-03 — ⭐ 콘텐츠 갱신 (10/13/17/19): `PostToolUse` `duration_ms`, `/config` persist + 검색 값 매칭, `/resume` 67% 빠름 + 큰 세션 요약, `--continue`/`--resume` `/add-dir` 세션, `DISABLE_UPDATES`, `prUrlTemplate`, `CLAUDE_CODE_HIDE_CWD`, Pro/Max Opus 4.6/4.7 기본 effort high, `/color` Remote Control 동기화, `blockedMarketplaces` `hostPattern`/`pathPattern`, WSL Windows settings 상속, PowerShell auto-approve, slash command UI 개선
- [x] M11-04 — version-track.json 2.1.114 → 2.1.119 bump + 전체 29개 튜토리얼 basedOn 갱신 + 10개 콘텐츠 구문 검증 통과

### M12: 유지보수 — v2.1.126 갱신 (완료 4/4)

- [x] M12-01 — ⭐⭐⭐ 콘텐츠 갱신 (06/07/10/17): Hooks `PostToolUse` `hookSpecificOutput.updatedToolOutput` 일반화(v2.1.121, 이전엔 MCP-only), MCP `alwaysLoad` 옵션 + 시작 실패 3회 자동 재시도(v2.1.121), `claude project purge [path]` 신규(v2.1.126), `claude auth login` OAuth 코드 paste(v2.1.126, WSL2/SSH/container), `/resume` PR URL 검색(v2.1.122, GitHub/GitLab/Bitbucket), `claude plugin prune` + `plugin uninstall --prune` 캐스케이드(v2.1.121)
- [x] M12-02 — ⭐⭐ 콘텐츠 갱신 (08/11/16/18/19/25): `/skills` type-to-filter 검색 박스(v2.1.121), MCP `alwaysLoad` 커넥터 적용 + SDK `mcp_authenticate` `redirectUri` 지원(v2.1.121), `CLAUDE_CODE_FORK_SUBAGENT=1` SDK/`claude -p` 비대화형(v2.1.121), `ANTHROPIC_BEDROCK_SERVICE_TIER` 환경 변수(v2.1.122, default/flex/priority), `--dangerously-skip-permissions` 우회 경로 확장(v2.1.121/126: `.claude/skills/`, `.claude/agents/`, `.claude/commands/`, `.git/`, `.vscode/`, shell config), `claude_code.skill_activated` `invocation_trigger`(v2.1.126: user-slash/claude-proactive/nested-skill)
- [x] M12-03 — ⭐ 콘텐츠 보강 (10/22): `/model` picker가 gateway `/v1/models` 엔드포인트 모델 리스트(v2.1.126, `ANTHROPIC_BASE_URL` 사용 시), Auto mode 권한 체크 정체 시 스피너 빨간색(v2.1.126), `/mcp` 중복 커넥터 hint(v2.1.122), `claude_code.at_mention` OTEL 이벤트(v2.1.122)
- [x] M12-04 — version-track.json 2.1.119 → 2.1.126 bump + 영향 받은 10개 trackedFeatures/notes 보강 + 전체 29개 콘텐츠 구문 검증 통과

<!-- ID 마이그레이션 이력 (2026-03-19): P0~P6 → M0~M6 -->
