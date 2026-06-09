# CC Project 로드맵

> 최종 갱신: 2026-05-29

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

### M13: 유지보수 — v2.1.139 갱신 (완료 5/5)

- [x] M13-01 — ⭐⭐⭐ 콘텐츠 갱신 (06/09/17): Hooks `args: string[]` exec form + `continueOnBlock` + `$CLAUDE_EFFORT`/`effort.level` + `$CLAUDE_CODE_SESSION_ID` + 터미널 출력 격리 + `Skill(name *)` 와일드카드(v2.1.139), `worktree.baseRef: fresh|head` 분기 베이스 설정 + `EnterWorktree` 베이스 v2.1.128 후 v2.1.133에서 fresh 복원, `--plugin-url <url>` zip 원격 적용(v2.1.129) + `--plugin-dir` zip 지원(v2.1.128) + `claude plugin details` 토큰 비용(v2.1.139) + experimental 매니페스트 섹션(v2.1.129) + `plugin install` 자동 marketplace 갱신(v2.1.139)
- [x] M13-02 — ⭐⭐ 콘텐츠 갱신 (05/07/10/11/16/19): `claude agents` agent view Research Preview + `x-claude-code-agent-id`/`parent-agent-id` API 헤더 + OTEL agent_id 속성(v2.1.139), MCP stdio 서버 `CLAUDE_PROJECT_DIR` 환경변수(v2.1.139) + `workspace` 예약 서버명(v2.1.128) + 비프로토콜 메모리 누수 수정(v2.1.132) + SSE 16MB 캡(v2.1.139) + OAuth refresh 동시성 수정(v2.1.136), CLI `/goal`/`claude plugin details`/`/scroll-speed`/transcript nav/`/mcp` Reconnect 핫리로드(v2.1.139), 커넥터 API key 충돌 시 비활성 정책(v2.1.139), 백그라운드 에이전트 캐시 적중 + 유휴 요약 반복 방지(v2.1.128), 권한 `autoMode.hard_deny`(v2.1.136) + `parentSettingsBehavior`(v2.1.133) + `Skill(name *)` 와일드카드(v2.1.139) + `autoAllowBashIfSandboxed` shell expansion 수정(v2.1.139)
- [x] M13-03 — **29 — /goal 자율 목표** 신규 튜토리얼 추가 → [`29-goal-command`](../../projects/29-goal-command/): 완료 조건 기반 멀티턴 자율 실행(v2.1.139), `/loop`(주기 기반)과의 차이, 좋은 완료 조건 작성법, `--max-turns`/`--max-tokens` 안전 가드, 인터랙티브/`-p` 헤드리스/Remote Control 모드, 테스트 통과 자율 수정 + 보안 스캔 0건 시나리오 2종
- [x] M13-04 — ⭐ 콘텐츠 갱신 (24/25): 24-loop-cron에 `/goal` 차별점 + API key 시 `/schedule` 자동 비활성(v2.1.139) + CronList 출력 정정(v2.1.136), 25-skills-2.0에 `skillOverrides` 정상화(off/user-invocable-only/name-only, v2.1.129) + `Skill(name *)` 와일드카드(v2.1.139) + `/context all` 토크나이저 정확도(v2.1.139) + 서브에이전트 스킬 발견(v2.1.133)
- [x] M13-05 — version-track.json 2.1.126 → 2.1.139 bump + 29개 → 30개 추적 + 11개 영향 튜토리얼 trackedFeatures/notes 보강 + 전체 30개 콘텐츠 구문 검증 통과 + ROADMAP.md M13 기록

### M14: 유지보수 — v2.1.153 갱신 (완료 4/4)

- [x] M14-01 — ⭐⭐⭐ 콘텐츠 갱신 (21/8/6): `/simplify` → `/code-review` 이름 변경 + alias 유지(v2.1.147, 152), `--fix`/`--comment`/effort 레벨, `disallowed-tools` 프론트매터(v2.1.152), `/reload-skills` 신규 명령(v2.1.152), `MessageDisplay` 신규 훅 이벤트(v2.1.152), SessionStart 훅 `reloadSkills`/`sessionTitle` 반환(v2.1.152), Stop 훅 `background_tasks`/`session_crons` 입력(v2.1.145), `terminalSequence` 훅 출력(v2.1.141), `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`(v2.1.143)
- [x] M14-02 — ⭐⭐⭐ 콘텐츠 갱신 (5/16/17/10): `claude agents --json`/`--cwd`/dispatch 플래그(v2.1.141~145), 자동완성에 슬래시·번들 스킬(v2.1.153), `/resume` 백그라운드 세션 지원(v2.1.144), Pinned background sessions(Ctrl+T)(v2.1.147), `worktree.bgIsolation: "none"`(v2.1.143), Plugin dependency enforcement(v2.1.143), `skipLfs`(v2.1.153), `pluginSuggestionMarketplaces`(v2.1.152), `CLAUDE_CODE_PLUGIN_PREFER_HTTPS`(v2.1.141), projected context cost(v2.1.143), Fast mode Opus 4.7 기본(v2.1.142), `/model` 기본값 저장(v2.1.144, 153), `/usage` 카테고리 breakdown(v2.1.149), `/diff` 키보드 스크롤(v2.1.149), `/extra-usage` → `/usage-credits`(v2.1.144), GFM 체크박스(v2.1.149), `--fallback-model` 자동 전환(v2.1.152), Auto mode 동의 제거(v2.1.152), Vim NORMAL `/` 역검색(v2.1.152), Status line `COLUMNS`/`LINES`(v2.1.153), Status line JSON PR 정보(v2.1.145), `ANTHROPIC_WORKSPACE_ID`(v2.1.141)
- [x] M14-03 — ⭐⭐~⭐ 콘텐츠 갱신 (11/9/18/29): `MCP_TOOL_TIMEOUT` 원격 HTTP/SSE 적용(v2.1.142), `allowAllClaudeAiMcps` managed setting(v2.1.149), MCP "needs auth" 알림 통합(v2.1.153), `worktree.bgIsolation: "none"` 활용(v2.1.143), worktree 샌드박스 정책 정밀화(v2.1.149), Agent tool `subagent_type` 케이스/구분자 무관 매칭(v2.1.140), 서브에이전트 MCP `--strict-mcp-config` 정책 일관 적용(v2.1.153), `cache_creation_input_tokens` 보고 정확성(v2.1.153), `/goal` 평가자 백그라운드 작업 대기(v2.1.143), `/goal` 훅 차단 환경 명확한 메시지(v2.1.140)
- [x] M14-04 — version-track.json 2.1.139 → 2.1.153 bump + 11개 영향 튜토리얼 trackedFeatures/notes 보강 + 전체 30개 콘텐츠 구문 검증 통과(content-06/07 escape 버그 4개 동반 수정) + check-updates.js --bump 2.1.153 + ROADMAP.md M14 기록

### M15: 유지보수 — v2.1.154 갱신 (Opus 4.8 출시) (완료 5/5)

- [x] M15-01 — ⭐⭐⭐ 콘텐츠 갱신 (21/16/17/28): `/simplify` 동작 변경 — 이제 `/code-review --fix` 대신 cleanup-only 리뷰(reuse/simplification/efficiency/altitude)만 적용(v2.1.154), `claude agents`에서 `! <command>` 백그라운드 셸 세션 + `claude --bg --exec '<command>'`(v2.1.154), `/logout` 정상 사인아웃(v2.1.154), `←←` agents view Bedrock/Vertex/Foundry/no-telemetry 호환(v2.1.154), 플러그인 `defaultEnabled: false` (plugin.json/marketplace) + `/plugin`/`claude plugin enable`로 활성화(v2.1.154), `/plugin` Discover 탭 디렉토리 매칭 pinning + "suggested for this directory" 표시(v2.1.154), `/ultrareview`(=/code-review ultra)와 `/simplify`(=cleanup-only) 분리된 책임
- [x] M15-02 — ⭐⭐⭐ 신규 튜토리얼 **30 — Dynamic Workflows** (`/workflows`): Claude가 워크플로우를 만들면 백그라운드에서 수십~수백 에이전트를 오케스트레이션, `/workflows`로 실행 목록 조회, Opus 4.8 출시와 함께 도입된 백그라운드 오케스트레이션 패러다임, `/loop`(주기)·`/goal`(조건)·`/workflows`(오케스트레이션) 3축 비교
- [x] M15-03 — ⭐⭐ 콘텐츠 갱신 (15/11/10/18): `/chrome` → "Select browser…" 브라우저 선택 + 인-챗 브라우저 선택(v2.1.154), Stdio MCP `CLAUDE_CODE_SESSION_ID`/`CLAUDECODE=1` 환경변수(v2.1.154), `claude mcp list`/`get` 미승인 `.mcp.json` 서버 `⏸ Pending approval` 표시(v2.1.154), `claude agents` `!` 백그라운드 셸 통합 + `--bg --exec`, `/remote-control` autocomplete "Disconnect Remote Control" 표시(v2.1.154), Streaming tool execution 항상 활성화 + 텔레메트리/Bedrock/Vertex/Foundry 포함(v2.1.154), `/claude-api` 스킬에 **Opus 4.8 + 4.7→4.8 마이그레이션 가이드** 추가(v2.1.154), `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` 06/01 deprecated(v2.1.154)
- [x] M15-04 — ⭐ 콘텐츠 보강 (19): `rm -rf $HOME`이 `HOME`에 trailing slash 있을 때 차단되지 않던 버그 수정(v2.1.154), Auto mode 분류기의 데이터 유출 감지 개선(특히 리포지토리 대량 전송)(v2.1.154), `$TMPDIR` 샌드박스/논샌드박스 Bash 일관성 수정(v2.1.154), managed settings `allowedMcpServers`/`deniedMcpServers` 단일 무효 엔트리가 전체 정책을 무시하던 문제 → 해당 엔트리만 drop + `claude doctor` 경고(v2.1.154)
- [x] M15-05 — version-track.json 2.1.153 → 2.1.154 bump + 30개 → 31개 추적 + 영향 9개 튜토리얼 trackedFeatures/notes 보강 + 전체 31개 콘텐츠 구문 검증 통과 + check-updates.js --bump 2.1.154 + ROADMAP.md M15 기록

### M16: 유지보수 — v2.1.168 갱신 (완료 5/5)

> 분배형 유지보수(신규 튜토리얼 없음, M11/M12/M14 패턴). v2.1.156~166의 7개 기능 릴리스 반영. 미출시/버그픽스-only(155/159/164/165/167/168 등) 제외.

- [x] M16-01 — ⭐⭐⭐ 콘텐츠 갱신 (30/17/06): 동적 워크플로우 트리거 키워드 **`workflow` → `ultracode`** 변경(v2.1.160, 사용자 동작 변경) + `/effort ultracode` + `/config` "Workflow keyword trigger" 설정/alt+w·Backspace 취소(v2.1.157), **`.claude/skills` 플러그인 자동 로드**(마켓플레이스 불필요) + `claude plugin init` 스캐폴딩 + `/plugin` 자동완성 + `/plugin list`(v2.1.157, 163), **Stop/SubagentStop 훅 `hookSpecificOutput.additionalContext` 반환**(에러 아님, 턴 계속)(v2.1.163)
- [x] M16-02 — ⭐⭐⭐ 콘텐츠 갱신 (19/10/18): deny 룰 **tool-name glob 지원**(`*`=전체 차단)(v2.1.166), `acceptEdits` 빌드설정파일(`.npmrc` 등) 쓰기 전 프롬프트(v2.1.160), `requiredMinimum/MaximumVersion` managed 설정(v2.1.163), **`fallbackModel`** 최대 3개 대체 모델(인터랙티브 적용)(v2.1.166), `MAX_THINKING_TOKENS=0`/`--thinking disabled` thinking 비활성화(v2.1.166), Auto mode Bedrock/Vertex/Foundry 지원(v2.1.158), WebFetch 권한 룰 우선(v2.1.162)
- [x] M16-03 — ⭐⭐~⭐ 콘텐츠 갱신 (02/03/05/08/09/14/16/20): grep으로 본 단일 파일 read-before-edit 충족(v2.1.160), `--tools`에 Grep/Glob 명시(v2.1.162), `claude agents` `agent` 필드+`--agent`·`--json waitingFor`·`SendMessage` 중계 권한 분리·done/total·백그라운드 버전 자동 업데이트(v2.1.157~166), `\$` 이스케이프 문법(v2.1.163), `EnterWorktree` 세션 중 전환+unlock(v2.1.157), 셸 시작 파일(`.zshenv` 등) 쓰기 전 프롬프트(v2.1.160), Windsurf → **Devin Desktop** 리브랜드(v2.1.162)
- [x] M16-04 — 자동화 인프라: **launchd 데일리 업데이트 체크** 구축 — `scripts/daily-update-check.sh`(2단계: check-updates.js 갭 감지 → 갭 시 claude 헤드리스 분석 + macOS 알림, 읽기 전용) + `~/Library/LaunchAgents/com.kent.ccproject.update-check.plist`(매일 09:00 KST). cmux `claude`는 shim → 실 바이너리 `~/.local/bin/claude` 사용. 엔드투엔드 1회 실행 검증 통과
- [x] M16-05 — version-track.json 2.1.154 → 2.1.168 bump + 전체 31개 basedOn 동기화 + 영향 14개 튜토리얼 trackedFeatures/notes 보강 + 전체 31개 콘텐츠 구문 검증 통과(`\$` 메타-이스케이프 렌더 검증 포함) + check-updates.js 갭 0 확인 + ROADMAP.md M16 기록

### M17: 유지보수 — v2.1.169 갱신 (완료 4/4)

> 분배형 유지보수(신규 튜토리얼 없음, M11/M12/M14/M16 패턴). v2.1.169 단일 릴리스 반영(167/168은 버그픽스-only 제외). **데일리 자동화가 최초로 감지한 버전** — 09:03 데일리 체크가 갭(2.1.168→169)을 정상 탐지했으나 claude 분석 단계가 일시적 소켓 에러로 실패 → `/update-check` 수동 복구 분석으로 진행.

- [x] M17-01 — ⭐⭐⭐ 콘텐츠 갱신 (03d/10): **`--safe-mode` / `CLAUDE_CODE_SAFE_MODE`** — 모든 커스터마이즈(CLAUDE.md·플러그인·스킬·훅·MCP) 비활성화 트러블슈팅(03d=안전 모드 기준점, 10=플래그), **`/cd` 명령** — 세션 중 작업 디렉토리 변경 시 프롬프트 캐시 미파손(10)
- [x] M17-02 — ⭐⭐ 콘텐츠 갱신 (27/08/16/14): `/cd` 캐시 적중 보존 디렉토리 이동(27), **`disableBundledSkills`** 설정+`CLAUDE_CODE_DISABLE_BUNDLED_SKILLS`로 번들 스킬/워크플로우/내장 명령 숨김(08), **`claude agents --json`** blocked/dispatch 세션 포함+`id`·`state` 필드 / `--all` 완료 세션 포함(16), 신뢰 안 된 설정의 **OTEL 클라이언트 인증서 경로** 신뢰 확인 강제(14)
- [x] M17-03 — version-track.json 2.1.168 → 2.1.169 bump + 전체 31개 basedOn 동기화 + 영향 6개 튜토리얼 trackedFeatures/notes 보강 + 전체 31개 콘텐츠 구문 검증 통과 + check-updates.js 갭 0 확인
- [x] M17-04 — 데일리 자동화 점검: launchd 등록·스케줄(09:00)·스크립트·로그 정상 확인, 09:03 실패 분석 `/update-check`로 복구. **개선 후보 BL-03 등록**(분석 단계 retry 로직)

## 백로그

> 스코프아웃 항목 (재개 조건 명시 — zero-debt 정책).

- [ ] **BL-01 — 저영향 ⭐ 콘텐츠 보강 (07/11/13)**: stdio MCP `--resume` 시 `CLAUDE_CODE_SESSION_ID` 수신(v2.1.163), `/mcp` 미사용 커넥터 "Show unused connectors" 접기(v2.1.161), Remote Control 상시 푸터 pill(v2.1.162). **재개 조건:** 차기 유지보수(M17+)에서 해당 튜토리얼(07/11/13)에 ⭐⭐ 이상 변경이 추가로 누적되어 함께 반영할 가치가 생길 때. 단독으로는 표시 변화(cosmetic)라 분배 보류.
- [ ] **BL-02 — 저영향 ⭐ 콘텐츠 보강 (30/01/16/18)**: `/workflows` 턴 진행 중에도 즉시 열림(v2.1.169), CLAUDE.md "너무 김" 경고 임계값이 모델 컨텍스트 윈도우에 비례(v2.1.169), 백그라운드 세션 retire→wake 시 `--ide`/`--chrome`/`--bare`/`--remote-control` 플래그 보존(v2.1.169), Vertex/Foundry 5분 유휴 타임아웃 복원+`API_FORCE_IDLE_TIMEOUT=0` 옵트아웃(v2.1.169). **재개 조건:** 차기 유지보수(M18+)에서 해당 튜토리얼에 ⭐⭐ 이상 변경이 누적될 때. 단독으로는 미세 개선이라 분배 보류.
- [ ] **BL-03 — 데일리 체크 분석 단계 retry 로직**: `scripts/daily-update-check.sh`의 claude 헤드리스 분석(`claude -p`)이 일시적 소켓/네트워크 에러로 실패할 때 1~2회 재시도. M17 트리거가 된 2026-06-09 09:03 실패(소켓 끊김)에서 노출됨. 탐지 단계는 성공·다음날 재탐지되므로 치명적이지 않으나 자동 분석 완결성을 높임. **재개 조건:** 데일리 분석 실패가 2회 이상 재발하거나, 자동화 견고성 개선 작업을 별도로 착수할 때.

<!-- ID 마이그레이션 이력 (2026-03-19): P0~P6 → M0~M6 -->
