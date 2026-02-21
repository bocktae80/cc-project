# Step 1: MCP 기본 이해하기 📱

> 먼저 내 클로드에 어떤 MCP 서버가 연결되어 있는지 확인해봅시다!

---

## 현재 연결된 MCP 서버 확인 🔍

터미널에서 Claude Code를 실행하고, 아래 명령어를 입력하세요:

```bash
# 현재 연결된 MCP 서버 목록 보기
claude mcp list
```

### 결과 예시

```
MCP Servers:
  No MCP servers configured.
```

아직 아무 서버도 없다면 이렇게 나와요. **정상입니다!**
이제부터 하나씩 추가해볼 거예요.

만약 이미 서버가 있다면 이렇게 나올 수 있어요:

```
MCP Servers:
  filesystem: npx -y @anthropic/mcp-server-filesystem /Users/me/projects
  github: npx -y @anthropic/mcp-server-github
```

---

## MCP 서버 관리 명령어 📋

Claude Code에서 MCP 서버를 관리하는 명령어들이에요:

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `claude mcp list` | 연결된 서버 목록 보기 | `claude mcp list` |
| `claude mcp add` | 새 서버 추가 | `claude mcp add 이름 -- 명령어` |
| `claude mcp remove` | 서버 제거 | `claude mcp remove 이름` |

### 서버 추가 기본 형식

```bash
claude mcp add <서버이름> -- <실행명령어> <인자들>
```

예를 들어:
```bash
# 파일시스템 서버 추가
claude mcp add filesystem -- npx -y @anthropic/mcp-server-filesystem /Users/me/sandbox
```

이 명령어를 분해하면:

| 부분 | 의미 |
|------|------|
| `claude mcp add` | MCP 서버를 추가하겠다 |
| `filesystem` | 이 서버의 이름 (내가 정하는 별명) |
| `--` | 여기서부터 실행 명령어 |
| `npx -y @anthropic/mcp-server-filesystem` | 서버 프로그램 실행 |
| `/Users/me/sandbox` | 서버에 전달할 인자 (접근할 폴더) |

---

## MCP 서버가 제공하는 것들 🎁

MCP 서버는 크게 3가지를 제공할 수 있어요:

### 1. Tools (도구) 🔧 — 가장 중요!

실행할 수 있는 **기능**이에요. 버튼을 누르면 무언가가 실행되는 것처럼!

```
📦 파일시스템 서버의 Tools:
├── 📖 read_file      — "이 파일 읽어줘"
├── ✏️ write_file     — "이 내용으로 파일 만들어줘"
├── 📂 list_directory — "이 폴더에 뭐가 있어?"
└── 🔍 search_files   — "이 이름의 파일 찾아줘"
```

### 2. Resources (리소스) 📚

읽을 수 있는 **데이터**예요. 도서관의 책처럼 열람만 가능!

### 3. Prompts (프롬프트) 💬

미리 만들어둔 **대화 템플릿**이에요. "코드 리뷰" 같은 자주 쓰는 요청을 템플릿으로!

> 💡 **대부분의 MCP 서버는 Tools를 제공합니다.** Resources와 Prompts는 보너스!

---

## 서버가 추가되면 무슨 일이? 🤔

MCP 서버를 추가하면:

1. **`.claude/settings.json`** 파일에 서버 정보가 저장됩니다
2. Claude Code를 시작할 때 **서버 프로그램이 자동으로 실행**됩니다
3. 클로드가 **서버의 도구 목록을 확인**합니다 (`tools/list`)
4. 사용자가 요청하면 클로드가 **적절한 도구를 호출**합니다 (`tools/call`)

```
설정 추가 → 서버 자동 실행 → 도구 목록 확인 → 사용 준비 완료! ✅
```

---

## 다음 단계 ➡️

이제 MCP가 뭔지 이해했으니, 실제로 서버를 연결해봅시다!

👉 [Step 2: 파일시스템 서버 연결하기](./step-02-filesystem.md)
