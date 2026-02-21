# 파일시스템 서버 예제 📂

> 클로드가 sandbox 폴더의 파일을 읽고 쓸 수 있게 해주는 예제입니다.

## 파일 구조

```
filesystem-server/
├── sandbox/              ← 클로드가 접근할 수 있는 폴더
│   ├── hello.txt         ← 환영 메시지
│   └── data.json         ← 학생 데이터
├── .claude/
│   └── settings.json     ← MCP 서버 설정
└── README.md             ← 이 파일
```

## 사용법

### 1. 서버 추가

```bash
claude mcp add filesystem -- npx -y @anthropic/mcp-server-filesystem $(pwd)/sandbox
```

### 2. Claude Code에서 테스트

```
"sandbox 폴더에 어떤 파일이 있어?"
"hello.txt 읽어줘"
"data.json에서 학생 이름 알려줘"
"sandbox에 새 파일 만들어줘"
```

### 3. 서버 제거

```bash
claude mcp remove filesystem
```

## 사용 가능한 도구들

| 도구 | 설명 |
|------|------|
| `read_file` | 파일 읽기 |
| `write_file` | 파일 쓰기 |
| `list_directory` | 폴더 목록 보기 |
| `create_directory` | 폴더 만들기 |
| `move_file` | 파일 이동 |
| `search_files` | 파일 검색 |
| `get_file_info` | 파일 정보 |
