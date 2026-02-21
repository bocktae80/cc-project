# 자주 겪는 문제 해결 🔧

> MCP 서버를 쓰다가 문제가 생겼나요? 여기서 해결법을 찾아보세요!

---

## 문제 1: "서버가 연결되지 않아요" ❌

### 증상

```
Error: MCP server "filesystem" failed to start
```

### 원인과 해결

| 원인 | 해결 |
|------|------|
| Node.js가 설치되지 않음 | `node --version`으로 확인, 없으면 설치 |
| npx를 찾을 수 없음 | Node.js를 다시 설치하거나 `npm install -g npx` |
| 패키지 이름이 틀림 | 패키지 이름을 정확히 확인 (`@anthropic/mcp-server-filesystem`) |

```bash
# Node.js 확인
node --version

# npx 확인
npx --version

# 서버를 수동으로 실행해서 에러 확인
npx -y @anthropic/mcp-server-filesystem /tmp
```

---

## 문제 2: "도구가 보이지 않아요" 🔍

### 증상

서버를 추가했는데 클로드가 도구를 사용하지 않음

### 원인과 해결

| 원인 | 해결 |
|------|------|
| 서버가 제대로 시작되지 않음 | `claude mcp list`로 확인 |
| Claude Code를 재시작하지 않음 | Claude Code를 종료하고 다시 시작 |
| 서버 이름이 다름 | `claude mcp list`에서 이름 확인 |

```bash
# 서버 목록 확인
claude mcp list

# 서버 제거 후 다시 추가
claude mcp remove 서버이름
claude mcp add 서버이름 -- 실행명령어
```

> 💡 **팁**: 서버를 추가/제거한 후에는 Claude Code를 **재시작**하는 것이 좋아요!

---

## 문제 3: "GitHub 토큰 에러" 🔑

### 증상

```
Error: Bad credentials
```

또는

```
Error: GITHUB_PERSONAL_ACCESS_TOKEN is not set
```

### 원인과 해결

| 원인 | 해결 |
|------|------|
| 토큰이 설정되지 않음 | `-e` 플래그로 토큰 전달 |
| 토큰이 만료됨 | GitHub에서 새 토큰 생성 |
| 토큰 권한이 부족함 | `repo`, `read:org` 권한 확인 |
| 토큰 앞뒤에 공백이 있음 | 공백 제거 |

```bash
# 토큰과 함께 서버 다시 추가
claude mcp remove github
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_새토큰 -- npx -y @anthropic/mcp-server-github
```

---

## 문제 4: "파일시스템 서버가 파일을 못 찾아요" 📂

### 증상

```
Error: Path /some/path is not allowed
```

### 원인과 해결

| 원인 | 해결 |
|------|------|
| 경로가 허용 범위 밖 | 서버 설정에서 허용 경로 확인 |
| 상대 경로 사용 | 절대 경로로 변경 |
| 폴더가 존재하지 않음 | 폴더가 있는지 확인 |

```bash
# 절대 경로로 서버 추가
claude mcp remove filesystem
claude mcp add filesystem -- npx -y @anthropic/mcp-server-filesystem /Users/me/정확한/경로

# 폴더 존재 확인
ls -la /Users/me/정확한/경로
```

> 💡 **팁**: `$(pwd)`를 사용하면 현재 폴더의 절대 경로를 자동으로 넣을 수 있어요!

---

## 문제 5: "커스텀 서버가 실행되지 않아요" 🛠️

### 증상

```
Error: Cannot find module '@modelcontextprotocol/sdk'
```

또는

```
SyntaxError: Cannot use import statement outside a module
```

### 원인과 해결

| 원인 | 해결 |
|------|------|
| 패키지 미설치 | `npm install` 실행 |
| ESM 모듈 설정 누락 | `package.json`에 `"type": "module"` 확인 |
| Node.js 버전이 낮음 | v18 이상으로 업데이트 |
| 경로가 잘못됨 | 절대 경로 사용 |

```bash
# 1. 패키지 설치
cd examples/custom-server
npm install

# 2. package.json 확인 — "type": "module" 있어야 함
cat package.json

# 3. 직접 실행 테스트
node my-time-server.js
# → 대기 상태(빈 화면)가 되면 정상! Ctrl+C로 종료

# 4. 절대 경로로 서버 추가
claude mcp add my-time-server -- node $(pwd)/my-time-server.js
```

---

## 일반적인 디버깅 팁 💡

### 1. 항상 수동 실행 먼저 테스트

```bash
# MCP 서버 프로그램을 직접 실행해서 에러 확인
npx -y @anthropic/mcp-server-filesystem /tmp
```

### 2. 설정 파일 직접 확인

```bash
# 프로젝트 설정
cat .claude/settings.json

# 사용자 설정
cat ~/.claude/settings.json
```

### 3. 서버 제거 후 다시 추가

```bash
claude mcp remove 서버이름
claude mcp add 서버이름 -- 명령어
```

### 4. Claude Code 재시작

서버 설정을 변경한 후에는 **Claude Code를 재시작**하세요.

---

## 도움이 더 필요하면? 🆘

- **Claude Code 공식 문서**: MCP 서버 관련 최신 정보 확인
- **GitHub Issues**: 버그 리포트 및 커뮤니티 도움
- **MCP 공식 사이트**: MCP 프로토콜 스펙 및 서버 목록
