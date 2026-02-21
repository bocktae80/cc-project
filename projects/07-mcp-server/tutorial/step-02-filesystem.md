# Step 2: 파일시스템 서버 연결하기 📂

> 클로드가 직접 파일을 읽고, 쓰고, 관리할 수 있게 해봅시다!

---

## 파일시스템 서버란? 📂

**@anthropic/mcp-server-filesystem**은 클로드가 특정 폴더의 파일을 읽고 쓸 수 있게 해주는 MCP 서버입니다.

```
📂 파일시스템 서버가 할 수 있는 것:
├── 📖 파일 읽기 (read_file)
├── ✏️ 파일 쓰기 (write_file)
├── 📋 폴더 목록 보기 (list_directory)
├── 📁 폴더 만들기 (create_directory)
├── 🚚 파일 이동 (move_file)
├── 🔍 파일 검색 (search_files)
└── ℹ️ 파일 정보 (get_file_info)
```

> ⚠️ **안전 장치**: 서버를 추가할 때 **지정한 폴더만** 접근할 수 있어요.
> 다른 폴더는 건드릴 수 없으니 안심하세요!

---

## 실습 준비 🛠️

### 1. sandbox 폴더 확인

이 프로젝트의 예제 폴더에 이미 실습용 파일이 있어요:

```
examples/filesystem-server/
├── sandbox/
│   ├── hello.txt      ← 환영 메시지
│   └── data.json      ← 학생 데이터
└── .claude/
    └── settings.json  ← MCP 서버 설정
```

### 2. 서버 추가하기

터미널에서 아래 명령어를 실행하세요:

```bash
# 파일시스템 서버 추가 (sandbox 폴더만 접근 가능)
claude mcp add filesystem -- npx -y @anthropic/mcp-server-filesystem $(pwd)/examples/filesystem-server/sandbox
```

> 💡 `$(pwd)`는 현재 폴더 경로를 자동으로 넣어줍니다.

### 3. 서버 확인

```bash
# 잘 추가되었는지 확인
claude mcp list
```

이렇게 나오면 성공! ✅

```
MCP Servers:
  filesystem: npx -y @anthropic/mcp-server-filesystem /path/to/sandbox
```

---

## 실습 해보기 🎯

### 실습 1: 파일 목록 보기

Claude Code에서:

```
sandbox 폴더에 어떤 파일이 있는지 보여줘
```

클로드가 `list_directory` 도구를 사용해서 파일 목록을 보여줄 거예요!

### 실습 2: 파일 읽기

```
hello.txt 파일의 내용을 읽어줘
```

클로드가 `read_file` 도구로 파일 내용을 읽어옵니다.

### 실습 3: 파일 쓰기

```
sandbox 폴더에 "my-note.txt"라는 파일을 만들어줘. 내용은 "오늘 MCP 서버를 배웠다!"
```

클로드가 `write_file` 도구로 새 파일을 만들어줍니다!

### 실습 4: 데이터 활용

```
data.json에 있는 학생 이름을 모두 알려줘
```

클로드가 JSON 파일을 읽고 내용을 분석해줍니다.

---

## 설정 파일 살펴보기 ⚙️

`examples/filesystem-server/.claude/settings.json`을 열어보면:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic/mcp-server-filesystem",
        "./sandbox"
      ]
    }
  }
}
```

| 필드 | 설명 |
|------|------|
| `"filesystem"` | 서버의 이름 (별명) |
| `"command"` | 실행할 프로그램 (`npx`) |
| `"args"` | 프로그램에 전달할 인자들 |
| `"-y"` | 묻지 않고 자동 설치 |
| `"@anthropic/mcp-server-filesystem"` | 서버 패키지 이름 |
| `"./sandbox"` | 접근 허용할 폴더 |

---

## 서버 제거하기 🗑️

실습이 끝나면 서버를 제거할 수 있어요:

```bash
claude mcp remove filesystem
```

---

## 핵심 정리 💡

```
✅ 파일시스템 서버 = 클로드가 파일을 읽고 쓸 수 있게 해줌
✅ 지정한 폴더만 접근 가능 (안전!)
✅ claude mcp add 로 추가, claude mcp remove 로 제거
✅ 설정은 .claude/settings.json에 저장됨
```

---

## 다음 단계 ➡️

파일을 다룰 수 있게 되었으니, 이번에는 GitHub을 연결해봅시다!

👉 [Step 3: GitHub 서버 연결하기](./step-03-github.md)
