# Step 3: GitHub 서버 연결하기 🐙

> 클로드가 GitHub의 이슈, PR, 코드를 직접 다룰 수 있게 해봅시다!

---

## GitHub MCP 서버란? 🐙

**@anthropic/mcp-server-github**은 클로드가 GitHub과 대화할 수 있게 해주는 MCP 서버입니다.

```
🐙 GitHub 서버가 할 수 있는 것:
├── 📋 이슈 조회/생성/수정
├── 🔀 PR(Pull Request) 관리
├── 🔍 리포지토리 검색
├── 📖 파일 내용 읽기
├── 🌿 브랜치 관리
└── 💬 댓글 작성
```

> 💡 GitHub = 코드를 저장하고 공유하는 서비스 (코드의 구글 드라이브!)

---

## 사전 준비: GitHub 토큰 🔑

GitHub 서버를 쓰려면 **Personal Access Token(개인 접근 토큰)**이 필요해요.

> 🔑 토큰 = 비밀번호 같은 것. "나는 이 계정의 주인이에요"를 증명하는 열쇠!

### 토큰 만드는 방법

1. GitHub 로그인 → Settings(설정)
2. Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token (classic)" 클릭
4. 이름: `claude-mcp` (아무거나 OK)
5. 권한(scopes) 선택:
   - ✅ `repo` (리포지토리 접근)
   - ✅ `read:org` (조직 읽기)
6. "Generate token" 클릭
7. **토큰을 복사해두세요!** (다시 볼 수 없어요)

> ⚠️ **주의**: 토큰은 비밀번호와 같습니다. 절대 다른 사람에게 공유하지 마세요!

---

## 서버 추가하기 🛠️

### 방법 1: 명령어로 추가

```bash
# GitHub 서버 추가 (토큰을 환경변수로 전달)
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_여러분의토큰 -- npx -y @anthropic/mcp-server-github
```

| 부분 | 의미 |
|------|------|
| `github` | 서버 이름 (별명) |
| `-e GITHUB_PERSONAL_ACCESS_TOKEN=...` | 환경변수로 토큰 전달 |
| `npx -y @anthropic/mcp-server-github` | 서버 프로그램 |

### 방법 2: 설정 파일 직접 수정

`.claude/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_여러분의토큰"
      }
    }
  }
}
```

### 확인

```bash
claude mcp list
```

```
MCP Servers:
  github: npx -y @anthropic/mcp-server-github
```

---

## 실습 해보기 🎯

### 실습 1: 리포지토리 검색

Claude Code에서:

```
GitHub에서 "awesome-python" 리포지토리를 검색해줘
```

### 실습 2: 이슈 보기

```
이 리포지토리의 최근 이슈 5개를 보여줘
```

### 실습 3: 코드 읽기

```
GitHub에서 이 리포지토리의 README.md를 읽어줘
```

> 💡 **팁**: 자기가 가진 리포지토리로 실습하면 더 재미있어요!

---

## 설정 파일 살펴보기 ⚙️

`examples/github-server/.claude/settings.json`을 열어보면:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "여기에_토큰_입력"
      }
    }
  }
}
```

> ⚠️ 예제 파일의 토큰은 **플레이스홀더**예요. 실제 토큰으로 바꿔야 작동합니다!

---

## 토큰 안전하게 관리하기 🔒

토큰을 설정 파일에 직접 넣으면 위험할 수 있어요.
Git에 올리면 다른 사람이 볼 수 있거든요!

### 안전한 방법: 환경변수 사용

```bash
# 1. 쉘 설정 파일에 토큰 저장
echo 'export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_여러분의토큰' >> ~/.zshrc

# 2. 설정 적용
source ~/.zshrc

# 3. MCP 서버 추가 (토큰을 직접 적지 않아도 됨!)
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN -- npx -y @anthropic/mcp-server-github
```

> 💡 `-e GITHUB_PERSONAL_ACCESS_TOKEN` 처럼 값 없이 키만 적으면,
> 쉘 환경변수에서 자동으로 가져옵니다!

---

## 핵심 정리 💡

```
✅ GitHub 서버 = 클로드가 GitHub을 직접 다룰 수 있게 해줌
✅ Personal Access Token 필요 (비밀번호 같은 열쇠)
✅ 토큰은 환경변수로 안전하게 관리
✅ 이슈, PR, 코드 등 다양한 GitHub 기능 사용 가능
```

---

## 다음 단계 ➡️

이제 기존 서버를 연결할 줄 아니까, 직접 나만의 서버를 만들어봅시다!

👉 [Step 4: 나만의 MCP 서버 만들기](./step-04-custom.md)
