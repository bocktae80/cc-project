# 스크린샷 캡처 가이드

> 각 프로젝트별로 캡처해야 할 화면 목록입니다.

## 공통 규칙

- **해상도**: 1280×720 이상
- **테마**: 다크 모드 기준
- **표시**: 중요 부분에 빨간색 박스 또는 화살표
- **포맷**: PNG (스크린샷), SVG (다이어그램)
- **네이밍**: `{번호}-{설명}.png` (예: `01-claude-md-loading.png`)

---

## 01 — 메모리 시스템

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | CLAUDE.md 파일이 로드되는 모습 | `01-claudemd-loaded.png` |
| 2 | 메모리 계층 구조 (터미널 출력) | `02-memory-hierarchy.png` |
| 3 | /init 명령어 실행 결과 | `03-init-command.png` |

## 02 — 파일 읽기/쓰기

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | Read 도구로 파일 읽기 | `01-read-file.png` |
| 2 | Write 도구로 파일 생성 | `02-write-file.png` |
| 3 | Edit 도구로 부분 수정 | `03-edit-file.png` |

## 03 — 코드 검색

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | Glob으로 파일 찾기 결과 | `01-glob-result.png` |
| 2 | Grep으로 내용 검색 결과 | `02-grep-result.png` |
| 3 | 깔때기 검색 전략 실행 | `03-funnel-search.png` |

## 04 — 웹 검색/페치

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | WebSearch 검색 결과 | `01-websearch-result.png` |
| 2 | WebFetch 페이지 분석 | `02-webfetch-result.png` |

## 05 — Agent Teams

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | 팀 생성 과정 | `01-team-create.png` |
| 2 | 에이전트 간 메시지 | `02-agent-message.png` |
| 3 | 태스크 목록 | `03-task-list.png` |

## 06 — Hooks

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | 훅 설정 (settings.json) | `01-hook-settings.png` |
| 2 | PreToolUse 훅 실행 | `02-pre-hook-run.png` |
| 3 | 가드 훅으로 차단 | `03-guard-block.png` |

## 07 — MCP 서버

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | `claude mcp list` 결과 | `01-mcp-list.png` |
| 2 | 파일시스템 서버 사용 | `02-filesystem-server.png` |
| 3 | 커스텀 서버 실행 | `03-custom-server.png` |

## 08 — Skills & 커맨드

| # | 캡처 대상 | 파일명 |
|---|----------|--------|
| 1 | /help 실행 결과 | `01-help-command.png` |
| 2 | 커스텀 스킬 목록 | `02-custom-skills.png` |
| 3 | /review 스킬 실행 | `03-review-skill.png` |
