# 커스텀 시간 서버 예제 ⏰

> 현재 시간을 알려주는 나만의 MCP 서버입니다!

## 파일 구조

```
custom-server/
├── my-time-server.js     ← 서버 코드
├── package.json          ← 패키지 설정
├── .claude/
│   └── settings.json     ← MCP 서버 설정
└── README.md             ← 이 파일
```

## 설치 및 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 서버 테스트

```bash
node my-time-server.js
# 대기 상태가 되면 성공! (Ctrl+C로 종료)
```

### 3. Claude Code에 연결

```bash
claude mcp add my-time-server -- node $(pwd)/my-time-server.js
```

### 4. 사용

Claude Code에서:

```
"지금 몇 시야?"
"현재 시간 알려줘"
```

## 코드 설명

| 부분 | 역할 |
|------|------|
| `McpServer` | MCP 서버 객체 생성 |
| `server.tool()` | 도구 등록 (이름, 설명, 파라미터, 함수) |
| `StdioServerTransport` | stdin/stdout 통신 설정 |
| `server.connect()` | 서버 시작 |

## 확장 아이디어

- 타임존 선택 기능 추가
- D-day 계산 기능
- 세계 시계 기능
