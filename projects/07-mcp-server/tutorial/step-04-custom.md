# Step 4: 나만의 MCP 서버 만들기! 🛠️

> 시간을 알려주는 나만의 MCP 서버를 직접 만들어봅시다!

---

## 목표 🎯

지금까지는 다른 사람이 만든 MCP 서버를 **설치**했습니다.
이번에는 **직접** MCP 서버를 만들어볼 거예요!

```
📱 앱 스토어 비유:
지금까지: 앱 스토어에서 앱을 다운로드 (파일시스템, GitHub)
이번에는: 내가 직접 앱을 만든다! (시간 알려주기 서버)
```

완성하면 이렇게 동작해요:

```
사용자: "지금 몇 시야?"
클로드 → MCP 서버: tools/call: get_current_time
MCP 서버 → 클로드: "2026년 2월 10일 오후 2시 30분 00초"
클로드: "현재 시간은 오후 2시 30분이에요!"
```

---

## 준비물 🧰

- Node.js v18 이상
- npm (Node.js와 함께 설치됨)

```bash
# 버전 확인
node --version  # v18 이상이면 OK
npm --version
```

---

## 단계별 만들기 📝

### Step 4-1: 프로젝트 폴더 확인

예제 폴더에 이미 준비되어 있어요:

```
examples/custom-server/
├── my-time-server.js    ← 서버 코드
├── package.json         ← 패키지 설정
└── .claude/
    └── settings.json    ← MCP 서버 연결 설정
```

### Step 4-2: 코드 이해하기

`my-time-server.js`를 살펴봅시다:

```javascript
// 1. 필요한 도구 가져오기
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 2. 서버 만들기
const server = new McpServer({
  name: "my-time-server",     // 서버 이름
  version: "1.0.0",           // 버전
});

// 3. 도구(tool) 등록하기
server.tool(
  "get_current_time",              // 도구 이름
  "현재 시간을 알려줍니다",          // 도구 설명 (클로드가 읽어요!)
  {},                              // 입력 파라미터 (없음)
  async () => {                    // 실행할 함수
    const now = new Date();
    const timeString = now.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return {
      content: [{ type: "text", text: `현재 시간: ${timeString}` }],
    };
  }
);

// 4. 서버 시작하기
const transport = new StdioServerTransport();
await server.connect(transport);
```

#### 코드를 하나씩 뜯어보면:

| 부분 | 설명 | 식당 비유 |
|------|------|-----------|
| `McpServer` | 서버를 만드는 도구 | 식당 건물 짓기 🏗️ |
| `StdioServerTransport` | 통신 방법 (stdin/stdout) | 주문 전달 시스템 📞 |
| `server.tool(...)` | 도구 하나 등록 | 메뉴에 요리 추가 📋 |
| `"get_current_time"` | 도구 이름 | 요리 이름 🍔 |
| `"현재 시간을 알려줍니다"` | 도구 설명 | 메뉴 설명 📖 |
| `async () => { ... }` | 실행할 기능 | 요리 레시피 👨‍🍳 |
| `server.connect(transport)` | 서버 시작 | 식당 오픈! 🎉 |

### Step 4-3: 패키지 설치

```bash
cd examples/custom-server
npm install
```

이 명령어는 `@modelcontextprotocol/sdk` (MCP SDK)를 설치합니다.

### Step 4-4: 서버 테스트

```bash
# 서버가 잘 실행되는지 테스트
node my-time-server.js
```

> 아무 출력 없이 **대기 상태**가 되면 성공! ✅
> (Ctrl+C로 종료)

MCP 서버는 stdin으로 요청을 **기다리고** 있어요.
직접 입력하지 않아도, 클로드가 알아서 요청을 보내줍니다.

### Step 4-5: Claude Code에 연결

```bash
# custom-server 폴더에서
claude mcp add my-time-server -- node $(pwd)/my-time-server.js
```

### Step 4-6: 사용해보기!

Claude Code에서:

```
지금 몇 시야?
```

클로드가 `get_current_time` 도구를 호출해서 시간을 알려줄 거예요! 🎉

---

## 도구에 파라미터 추가하기 🔧

시간 서버를 업그레이드해볼까요? 타임존을 선택할 수 있게!

```javascript
import { z } from "zod";

// 타임존을 선택할 수 있는 도구
server.tool(
  "get_time_in_timezone",
  "특정 타임존의 현재 시간을 알려줍니다",
  {
    timezone: z.string().describe("타임존 (예: Asia/Seoul, America/New_York)"),
  },
  async ({ timezone }) => {
    const now = new Date();
    const timeString = now.toLocaleString("ko-KR", {
      timeZone: timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return {
      content: [{ type: "text", text: `${timezone} 시간: ${timeString}` }],
    };
  }
);
```

> 💡 `z.string()` 은 Zod 라이브러리를 사용합니다.
> MCP SDK에 포함되어 있어서 별도 설치 불필요!

---

## MCP 서버 만들기 패턴 정리 📋

모든 MCP 서버는 이 패턴을 따릅니다:

```javascript
// 1. 가져오기
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 2. 서버 만들기
const server = new McpServer({ name: "서버이름", version: "1.0.0" });

// 3. 도구 등록 (여러 개 가능!)
server.tool("도구이름", "설명", { /* 파라미터 */ }, async (args) => {
  // 기능 구현
  return { content: [{ type: "text", text: "결과" }] };
});

// 4. 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## 핵심 정리 💡

```
✅ MCP 서버는 누구나 만들 수 있다!
✅ @modelcontextprotocol/sdk 패키지 사용
✅ server.tool()로 도구를 등록
✅ 도구의 "설명"이 중요 — 클로드가 읽고 언제 쓸지 판단함
✅ StdioServerTransport로 stdin/stdout 통신
```

---

## 다음 단계 ➡️

MCP 서버를 직접 만들 수 있게 되었어요!
더 많은 MCP 서버들을 알아보고 싶다면:

👉 [주요 MCP 서버 카탈로그](../reference/server-list.md)

도전 과제를 풀어보고 싶다면:

👉 [도전 과제: 주사위 서버 만들기](../exercise/README.md)
