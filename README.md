# CC Project

클로드 코드(Claude Code)의 기능을 배우고 활용하는 학습 프로젝트입니다.

## 누구를 위한 프로젝트인가요?

- 코딩을 처음 접하는 중학생
- 개발 경험이 없는 팀원
- 클로드 코드를 처음 사용하는 사람

## 학습 스튜디오

`studio/index.html`을 브라우저에서 열면 **인터랙티브 학습 대시보드**를 사용할 수 있습니다.

- 20개 프로젝트의 개요, 개념, 실습, 예제, 퀴즈를 브라우저에서 학습
- 상태 기반 샌드박스 — 가상 파일시스템, 분기 시나리오, 의사결정 시뮬레이션
- 3단계 학습자 레벨 (입문 / 탐구 / 실전)
- 챌린지 기반 진행률 추적

## 구조

| 폴더 | 설명 |
|------|------|
| `projects/` | 기능별 예제 프로젝트 (20개) |
| [`studio/`](studio/index.html) | 학습 대시보드 — 브라우저에서 열기 |
| `assets/` | 스크린샷, 다이어그램 |
| `workbook/` | 프로젝트 상태 관리 |

## 프로젝트 목록

### Phase 1: 기초 도구

| # | 프로젝트 | 난이도 | 설명 |
|---|----------|--------|------|
| 01 | [메모리 시스템](projects/01-memory-system/) | ⭐⭐⭐ | CLAUDE.md, 자동 메모리, 프로젝트 설정 |
| 02 | [파일 읽기/쓰기](projects/02-file-operations/) | ⭐ | Read, Write, Edit 도구로 파일 다루기 |
| 03 | [코드 검색](projects/03-code-search/) | ⭐ | Glob, Grep으로 코드 찾기 |
| 04 | [웹 검색/페치](projects/04-web-search/) | ⭐⭐ | WebSearch, WebFetch로 인터넷 정보 활용 |

### Phase 2: 고급 기능

| # | 프로젝트 | 난이도 | 설명 |
|---|----------|--------|------|
| 05 | [Agent Teams](projects/05-agent-teams/) | ⭐⭐⭐ | AI 에이전트 팀으로 협업하기 |
| 03d | [디버그 기능](projects/03-debug-features/) | ⭐⭐ | --debug, /debug로 내부 들여다보기 |
| 06 | [Hooks](projects/06-hooks/) | ⭐⭐ | 도구 실행에 자동 반응하는 훅 |
| 07 | [MCP 서버](projects/07-mcp-server/) | ⭐⭐⭐ | 외부 도구 연결 (파일시스템, GitHub, 커스텀) |
| 08 | [Skills & 커맨드](projects/08-skills-commands/) | ⭐⭐ | 나만의 명령어 만들기 |

### Phase 4: 최신 기능

| # | 프로젝트 | 난이도 | 설명 |
|---|----------|--------|------|
| 09 | [Worktree](projects/09-worktree/) | ⭐⭐ | 안전한 실험 공간 만들기 |
| 10 | [CLI 마스터](projects/10-cli-master/) | ⭐ | 터미널에서 클로드 관리하기 |
| 11 | [MCP 커넥터](projects/11-mcp-connectors/) | ⭐⭐ | claude.ai 도구를 코드에서 쓰기 |
| 12 | [Figma MCP](projects/12-figma-mcp/) | ⭐⭐⭐ | 디자인과 코드를 연결하기 |

### Phase 5: 확장 기능

| # | 프로젝트 | 난이도 | 설명 |
|---|----------|--------|------|
| 13 | [텔레포트](projects/13-teleport/) | ⭐⭐ | & prefix, /teleport, /rc로 세션 이동 |
| 14 | [코드 보안 스캔](projects/14-code-security/) | ⭐⭐⭐ | AI로 코드의 취약점 찾기 (OWASP Top 10) |

### Phase 6: 심화 활용

| # | 프로젝트 | 난이도 | 설명 |
|---|----------|--------|------|
| 15 | [브라우저 자동화](projects/15-browser-automation/) | ⭐⭐ | Chrome 확장으로 브라우저 제어 |
| 16 | [백그라운드 에이전트](projects/16-background-agents/) | ⭐⭐ | 여러 일을 동시에 시키기 |
| 17 | [플러그인 시스템](projects/17-plugin-system/) | ⭐⭐⭐ | 기능 꾸러미 설치하고 만들기 |
| 18 | [Agent SDK](projects/18-agent-sdk/) | ⭐⭐⭐ | 나만의 AI 에이전트 만들기 |
| 19 | [권한 심화](projects/19-permissions-deep/) | ⭐⭐ | 보안 울타리 세밀하게 설정하기 |
| 20 | [IDE 통합](projects/20-ide-integration/) | ⭐ | VS Code에서 클로드 쓰기 |

## 시작하기

1. 이 저장소를 클론하세요
   ```bash
   git clone https://github.com/bocktae80/cc-project.git
   ```
2. `studio/index.html`을 브라우저에서 열어 학습 대시보드를 확인하세요
3. `projects/02-file-operations/`부터 순서대로 따라하면 됩니다!

> 난이도가 ⭐인 프로젝트부터 시작하는 것을 추천합니다.

## 라이선스

MIT
