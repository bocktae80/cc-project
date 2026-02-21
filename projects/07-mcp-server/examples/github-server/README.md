# GitHub 서버 예제 🐙

> 클로드가 GitHub의 이슈, PR, 코드를 다룰 수 있게 해주는 예제입니다.

## 파일 구조

```
github-server/
├── .claude/
│   └── settings.json     ← MCP 서버 설정 (토큰 필요!)
└── README.md             ← 이 파일
```

## 사전 준비

GitHub Personal Access Token이 필요합니다.

1. GitHub.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. 권한: `repo`, `read:org` 선택
5. 토큰 복사

## 사용법

### 1. 서버 추가

```bash
# 환경변수로 토큰 전달
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_여러분의토큰 -- npx -y @anthropic/mcp-server-github
```

### 2. Claude Code에서 테스트

```
"내 GitHub 리포지토리 목록 보여줘"
"이 리포의 최근 이슈 보여줘"
"새 이슈 만들어줘: 제목은 'MCP 테스트'"
```

### 3. 서버 제거

```bash
claude mcp remove github
```

> ⚠️ `.claude/settings.json`의 토큰은 플레이스홀더입니다. 실제 토큰으로 교체하세요!
