# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2026-04-09] v2.1.97 갱신

### Changed
- version-track.json: 2.1.92 → 2.1.97 bump (26개 튜토리얼 전체 최신)
- ROADMAP.md: M8 유지보수 마일스톤 추가 (완료 3/3)

### Added — 콘텐츠 갱신 (8개 파일)
- **content-05.js** (Agent Teams): `● N running` 인디케이터, 서브에이전트 cwd 누수 수정, 429 정지 수정 (v2.1.94~2.1.97)
- **content-06.js** (Hooks): `sessionTitle` 훅 + 예제 코드, Stop/SubagentStop 장기세션 수정, plugin 스킬 훅 인식 (v2.1.94~2.1.97)
- **content-08.js** (Skills): 플러그인 스킬 name 안정화, `keep-coding-instructions` output style 프론트매터 (v2.1.94)
- **content-10.js** (CLI Master): Focus view `Ctrl+O`, `refreshInterval` 상태줄, `workspace.git_worktree`, Cedar 하이라이트, CJK 자동완성, effort 기본 high, Mantle Bedrock (v2.1.94~2.1.97)
- **content-16.js** (Background Agents): **`/ultraplan` 원격 Plan 모드 신규 섹션** — Claude Code on the Web 위임, 로컬 Plan Mode와 비교표, ultrathink 혼동 주의
- **content-17.js** (Plugin System): 플러그인 스킬 name/bin/output style/CLAUDE_PLUGIN_ROOT 수정, `claude plugin update` git 버그 수정 (v2.1.94~2.1.97)
- **content-18.js** (Agent SDK): **Managed Agents API 신규 섹션** (`/v1/agents`, `/v1/sessions`, `/claude-api` 스킬 확장), 기본 effort 상향
- **content-19.js** (Permissions): `--dangerously-skip-permissions` 다운그레이드 수정(중대), Bash 권한 강화, prototype 이름 버그, managed settings 잔존 수정, `additionalDirectories` 핫리로드, Accept Edits 래퍼 자동 승인 등 8건 (v2.1.97)

### Verified
- 8개 콘텐츠 파일 JS 구문 검증 통과
- `node studio/data/check-updates.js` — 모든 튜토리얼 최신 버전 범위 내

## [2026-03-07] v2.1.70 전체 갱신

### Changed
- 24/24 튜토리얼 basedOn을 2.1.70으로 갱신
- 08-skills-commands: 전면 재작성 (SKILL.md 디렉토리 구조, 프론트매터 10개 필드, 번들 스킬, 서브에이전트 실행, 동적 주입, Agent Skills 표준)
- 01-memory-system: 능동적 자동 저장, 서브에이전트 영속 메모리 추가
- 06-hooks: 16개 이벤트, 4개 훅 타입(prompt/agent), JSON stdin, 스킬 내 훅 추가
- 09-worktree: 워크트리 간 설정/메모리 공유 추가
- 10-cli-master: /copy, /color, /reload-plugins, /context, Opus 4.6 기본모델 추가
- 17-plugin-system: 매니페스트 갱신, LSP 서버, output styles, git-subdir 추가
- 20-ide-integration: VS Code 스파크 아이콘, 마크다운 플랜 뷰, MCP 관리 다이얼로그 추가
- 11-mcp-connectors: 커넥터 목록 확장 (Slack/Notion → 8종+)
- 12-figma-mcp: Code Connect, FigJam 다이어그램 생성 추가
- 나머지 15개: 버전 범프 (기능 변경 없음)

### Updated
- version-track.json: lastChecked 2026-03-07, 전체 basedOn 2.1.70
- projects.js: 08-skills-commands 메타데이터 갱신

## [2026-03-05] Studio v2 리디자인

### Changed
- 카탈로그 UI 전면 리디자인: 플랫 리스트 → 사이드바+메인 2단 레이아웃
- 카드 v2: 8개 요소 → 5개 요소 간소화 (큰 번호, 상태 도트, 제목, 부제, 난이도 바)
- 타임라인: 수평 스크롤 → 세로형 학습 경로로 교체
- 필터: 버튼 → 콤팩트 원형 필 (filter-pill)
- 진행률: 가로 바 → SVG 원형 링 (사이드바 64px, 카드 28px)

### Added
- Phase 네비게이션 사이드바 (sticky, 260px)
- Phase 히어로 배너 (선택된 phase 색상 배경 + 진행률)
- 다음 추천 카드 (미완료 튜토리얼 자동 추천)
- 태블릿/모바일 탭 (1023px 이하에서 사이드바 대체)
- 모바일 필터 영역 (검색+필터 필, 1023px 이하)
- CSS 변수: --phase-4, --phase-5, --phase-6, --sidebar-width

### Removed
- 웰컴 박스 (온보딩 섹션)
- 가로 진행률 바
- 수평 타임라인
- 개념 태그 (concept-tag), 설명 텍스트, CTA 링크 (카드에서 제거)
- 상태별 텍스트 뱃지 → 상태 도트로 대체

## [2026-03-02] Phase 6 심화 활용 튜토리얼

### Added
- 21-simplify: /simplify 스킬 (코드 품질 자동 개선)
- 22-batch-mode: 배치 모드 (-p 파이프, CI/CD 연동)
- 23-ralph-loop: Ralph Loop (자율 개발 루프, PRD 기반)
- content-21.js, content-22.js, content-23.js 콘텐츠 파일

## [2026-02-28] Phase 5-6 콘텐츠 추가

### Added
- 15-browser-automation: 브라우저 자동화 (Chrome 확장, GIF 녹화)
- 16-background-agents: 백그라운드 에이전트 (run_in_background)
- 17-plugin-system: 플러그인 시스템 (plugin.json)
- 18-agent-sdk: Agent SDK (Python/TypeScript)
- 19-permissions-deep: 권한 심화 (deny/allow)
- 20-ide-integration: IDE 통합 (VS Code, Cursor, JetBrains)
- content-15.js ~ content-20.js 콘텐츠 파일

## [2026-02-25] Phase 5 확장 기능

### Added
- 13-teleport: 텔레포트 (세션 이동: &, /teleport, /rc)
- 14-code-security: 코드 보안 스캔 (OWASP Top 10)
- content-13.js, content-14.js 콘텐츠 파일

## [2026-02-20] Phase 4 최신 기능

### Added
- 09-worktree: 워크트리 (안전한 실험 공간)
- 10-cli-master: CLI 마스터 (터미널 관리)
- 11-mcp-connectors: MCP 커넥터 (claude.ai 도구)
- 12-figma-mcp: Figma MCP (디자인-코드 연결)
- content-09.js ~ content-12.js 콘텐츠 파일
- 버전 추적 시스템 (version-track.json, check-updates.js)

## [2026-02-15] Phase 1-2 튜토리얼 + 학습 스튜디오

### Added
- 학습 스튜디오 대시보드 (studio/)
- Phase 1: 01-memory-system, 02-file-operations, 03-code-search, 04-web-search
- Phase 2: 05-agent-teams, 03d-debug-features, 06-hooks, 07-mcp-server, 08-skills-commands
- Phase 3: 스크린샷 가이드, 다이어그램, 영상 대본 8편
- content-01.js ~ content-08.js, content-03d.js 콘텐츠 파일
- 학습 뷰 (learn.js), 퀴즈 (quiz.js), 챌린지 (challenges.js), 레벨 시스템 (level-system.js)
- 샌드박스 엔진 (sandbox-engine.js), 터미널 (terminal.js)
