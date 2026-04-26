window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["07-mcp-server"] = {
  overview: `## MCP 서버 — 외부 도구와 연결하기

스마트폰에 앱을 설치하면 할 수 있는 일이 무한히 늘어나듯, 클로드에 **MCP 서버를 연결**하면 GitHub, Slack, 데이터베이스까지 자유자재로 다룰 수 있습니다!

### 이런 상황에서 유용해요
- **외부 서비스 연동**: "GitHub 이슈 목록 보여줘" — MCP 서버로 GitHub에 직접 접근
- **자동화 파이프라인**: "Slack에 배포 알림 보내줘" — 메시지 전송까지 자동 처리
- **나만의 도구 확장**: "우리 회사 API를 클로드에서 쓰고 싶어" — 커스텀 MCP 서버 제작

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | MCP 프로토콜의 개념과 서버 종류 이해 | 💡 개념 |
| 2 | 파일시스템·GitHub 서버 연결 실습 | 🔧 실습 |
| 3 | 여러 서버 동시 연결과 조합 활용 | 💻 예제 |

\`\`\`
스마트폰                          클로드
---------                        ------
기본 앱: 전화, 카메라              기본 도구: 코드 작성, 파일 편집
    +                                +
앱 스토어에서 설치:               MCP 서버 연결:
  +-- 카카오톡 (채팅)               +-- Slack 서버 (메시지)
  +-- 인스타그램 (사진)             +-- GitHub 서버 (코드 관리)
  +-- 배달의민족 (음식)             +-- 파일시스템 서버 (파일)
  +-- 게임 앱 (놀이)               +-- 커스텀 서버 (내가 만든 기능!)
\`\`\`

### 핵심 포인트

- **MCP** = Model Context Protocol (모델 컨텍스트 프로토콜)
- **MCP 서버** = 클로드에게 새 능력을 추가하는 프로그램
- 설정 위치: \`.claude/settings.json\`
- 누구나 MCP 서버를 만들 수 있다!`,

  concepts: [
    {
      id: "what-is-mcp",
      title: "MCP란 무엇인가?",
      content: `### MCP = 클로드의 앱 스토어

**MCP**는 **M**odel **C**ontext **P**rotocol의 약자입니다.
쉽게 말하면, 클로드와 외부 도구를 **연결하는 표준 방법**이에요.

#### USB 허브 비유

노트북에 USB 포트가 하나뿐이어도, **USB 허브**를 연결하면 마우스, 키보드, 외장하드를 동시에 쓸 수 있죠.

\`\`\`
USB 허브                          MCP
--------                         -----
노트북 --- USB 허브               클로드 --- MCP 프로토콜
              +-- 마우스                       +-- 파일시스템 서버
              +-- 키보드                       +-- GitHub 서버
              +-- 외장하드                     +-- Slack 서버
              +-- 프린터                       +-- 커스텀 서버
\`\`\`

#### 식당 비유로 동작 이해하기

| 식당 | MCP | 설명 |
|------|-----|------|
| 손님 | 사용자 | 요청하는 사람 |
| 웨이터 | 클로드 (클라이언트) | 요청을 전달하고 결과를 알려줌 |
| 메뉴판 | tools/list | 할 수 있는 것들 목록 |
| 주문서 | tools/call | 특정 기능 실행 요청 |
| 주방 | MCP 서버 | 실제로 기능을 실행하는 곳 |
| 음식 | 결과 (response) | 실행 결과 |

\`\`\`
손님: "스테이크 주세요" (사용자 요청)
  -> 웨이터가 주방에 전달 (클로드 -> MCP 서버)
  -> 주방에서 요리 (MCP 서버가 기능 실행)
  -> 웨이터가 음식 가져옴 (결과 반환)
  -> 손님에게 서빙 (사용자에게 표시)
\`\`\`

> **핵심 요약**: MCP(Model Context Protocol)는 클로드와 외부 도구를 연결하는 표준 방법입니다. USB 허브처럼 여러 서버를 동시에 연결할 수 있고, 식당 비유처럼 사용자(손님) → 클로드(웨이터) → MCP 서버(주방)로 요청이 전달됩니다.`
    },
    {
      id: "server-types",
      title: "주요 MCP 서버 종류",
      content: `### MCP 서버 카탈로그

이미 만들어진 유용한 MCP 서버들이 많이 있습니다.
앱 스토어에서 인기 앱을 설치하듯, 필요한 서버를 골라 연결하면 됩니다!

#### 공식/인기 MCP 서버

| 서버 이름 | 기능 | 비유 |
|-----------|------|------|
| **filesystem** | 파일/폴더 읽기, 쓰기, 검색 | 파일 관리자 앱 |
| **github** | PR, 이슈, 코드 관리 | GitHub 모바일 앱 |
| **slack** | 채널 메시지 읽기/보내기 | 카카오톡 |
| **notion** | 문서 읽기/편집 | 노트 앱 |
| **postgres** | 데이터베이스 조회/수정 | 엑셀 |

#### 서버 연결 방식

MCP 서버는 세 가지 방식으로 실행됩니다:

\`\`\`
1. stdio (표준 입출력) -- 가장 일반적
   클로드 <--stdin/stdout--> MCP 서버 프로세스

2. sse (Server-Sent Events) -- 원격 서버용
   클로드 <--HTTP--> 원격 MCP 서버

3. claude.ai MCP 커넥터 (v2.1.46+) -- 가장 간편!
   클로드 <--자동 연결--> claude.ai의 MCP 서버
   (설정 없이 바로 사용 가능!)
\`\`\`

#### claude.ai MCP 커넥터 (v2.1.46+)

v2.1.46부터 **claude.ai에서 제공하는 MCP 서버**가 자동으로 연결됩니다!
Slack, Notion, Linear 등을 settings.json 설정 없이 바로 사용할 수 있어요.

\`\`\`
지원되는 커넥터 예시:
  - Gmail, Google Calendar
  - Slack, Notion, Linear
  - Figma, Vercel
  - 그 외 계속 추가 중...
\`\`\`

**비활성화**: 원하지 않으면 환경변수로 끌 수 있습니다:
\`\`\`bash
export ENABLE_CLAUDEAI_MCP_SERVERS=false
\`\`\`

**OAuth 인증**: 커넥터가 처음 사용될 때 브라우저에서 OAuth 인증이 필요합니다.
localhost로 리다이렉트가 안 되면 **URL을 수동으로 복사해서 입력**하는 폴백도 지원됩니다.

> 자세한 내용은 **11-mcp-connectors** 튜토리얼을 참고하세요!

### MCP Elicitation (v2.1.76)

MCP 서버가 작업 도중에 **사용자에게 추가 정보를 요청**할 수 있게 되었습니다!

\`\`\`
기존: MCP 서버 → 결과 반환 (단방향)
신규: MCP 서버 → "이 정보가 필요해요" → 사용자 입력 → 계속 처리 (양방향)
\`\`\`

#### 비유: 택배 기사의 전화

\`\`\`
기존: 택배 기사가 문 앞에 놓고 감 (단방향)
Elicitation: "몇 층이세요?" → "3층이요" → 직접 전달! (양방향)
\`\`\`

입력 방식:
| 방식 | 설명 |
|------|------|
| 폼 필드 | 구조화된 입력 (텍스트, 선택 등) |
| 브라우저 URL | OAuth 인증 등 웹 기반 상호작용 |

### v2.1.116~2.1.119 MCP 개선사항

| 개선 | 설명 | 버전 |
|------|------|------|
| **MCP 시작 병렬화** | 다수의 stdio MCP 서버 설정 시 **동시 연결**이 기본값. \`resources/templates/list\`도 첫 \`@\` 멘션 시점까지 지연 → 시작 속도 개선 | v2.1.116 |
| **로컬/claude.ai 동시 시작 가속** | 로컬과 claude.ai 양쪽 MCP 서버를 모두 설정한 경우 **동시 connect**가 기본 | v2.1.117 |
| **Subagent/SDK MCP 재구성 병렬화** | 서브에이전트와 SDK MCP 서버 재구성이 직렬 → **병렬 연결** | v2.1.119 |
| **mcp_tool 훅 타입 (06-hooks 참고)** | 훅에서 \`type: "mcp_tool"\`로 MCP 서버 도구를 직접 호출 (Bash/curl 우회 없이 Slack/Notion 등 호출) | v2.1.118 |
| **OAuth \`expires_in\` 누락 수정** | OAuth 응답이 \`expires_in\`을 생략한 경우 매시간 재인증을 요구하던 문제 수정 | v2.1.118 |
| **OAuth step-up 재동의** | 서버의 \`insufficient_scope\` 403이 현재 토큰이 이미 가진 scope를 명시할 때 silently refresh가 아닌 **재동의 프롬프트** | v2.1.118 |
| **OAuth refresh cross-process lock** | 다중 프로세스 동시 OAuth refresh의 잠금 누락으로 발생하던 race condition 수정 | v2.1.118 |
| **macOS keychain race 수정** | 동시 MCP 토큰 refresh가 방금 갱신된 OAuth 토큰을 덮어써 \`/login\` 프롬프트가 뜨던 문제 수정 | v2.1.118 |
| **\`Authenticate\`/\`Re-authenticate\` 메뉴 복원** | \`/mcp\` 메뉴가 \`headersHelper\`로 설정된 서버의 OAuth 액션을 숨기던 문제 수정 | v2.1.119 |
| **\`Invalid OAuth error response\` 수정** | OAuth 디스커버리에서 서버가 비-JSON 응답을 반환할 때 발생하던 \`Invalid OAuth error response\` 에러 수정 | v2.1.119 |
| **\`${ENV_VAR}\` 헤더 치환** | HTTP/SSE/WebSocket MCP 서버의 \`headers\`에 있는 \`${ENV_VAR}\` 자리표시자가 요청 전에 치환되지 않던 문제 수정 | v2.1.119 |
| **\`--client-secret\` 토큰 교환** | \`client_secret_post\` 방식 서버용 \`--client-secret\` 클라이언트 시크릿이 토큰 교환 시 전송되지 않던 문제 수정 | v2.1.119 |

#### MCP 재구성 병렬화 효과 (v2.1.119)

\`\`\`
비유: 식당이 4개 공급사와 동시 통화 시작 → 한 곳씩 차례로 통화하던 시절보다 4배 빠름

기존: 서브에이전트 시작 → MCP 서버 #1 연결 대기 → #2 → #3 → #4 (직렬)
이후: 서브에이전트 시작 → #1, #2, #3, #4 동시 연결 (병렬)
\`\`\`

> 다수의 MCP 서버를 사용하는 워크플로우(예: \`reload_plugins\`, 서브에이전트 시작)에서 첫 응답까지의 시간이 눈에 띄게 단축됩니다.

### v2.1.89~2.1.92 MCP 개선사항

| 개선 | 설명 | 버전 |
|------|------|------|
| **도구 결과 500K 지속** | MCP 서버가 \`_meta["anthropic/maxResultSizeChars"]\` 어노테이션으로 **도구 결과 크기를 최대 500K까지 확장** 가능 — DB 스키마 같은 대형 결과가 잘리지 않음 | v2.1.91 |
| **\`MCP_CONNECTION_NONBLOCKING=true\`** | \`-p\` 모드에서 MCP 연결 대기를 **완전 생략**, \`--mcp-config\` 서버 연결도 5초 타임아웃 | v2.1.89 |
| **플러그인 MCP 연결 수정** | 인증 안 된 claude.ai 커넥터와 중복되는 플러그인 MCP 서버가 "connecting" 상태로 멈추던 문제 수정 | v2.1.92 |
| **MCP 에러 다중 블록** | MCP 도구 에러가 멀티 content 블록일 때 첫 번째만 표시되던 문제 수정 | v2.1.89 |

\`\`\`
비유: 앱스토어 업그레이드

500K 결과 = "앱이 보여줄 수 있는 데이터 한도가 10배 늘어남!"
NONBLOCKING = "앱 설치 안 끝나도 다른 앱 바로 쓸 수 있음 (백그라운드 설치)"
\`\`\`

### v2.1.83~2.1.86 MCP 개선사항

| 개선 | 설명 |
|------|------|
| **headersHelper 환경변수** | \`CLAUDE_CODE_MCP_SERVER_NAME\`과 \`CLAUDE_CODE_MCP_SERVER_URL\` 환경변수가 headersHelper 스크립트에 전달됩니다. **하나의 헬퍼 스크립트로 여러 MCP 서버를 구분**할 수 있어요 (v2.1.85) |
| **OAuth RFC 9728** | MCP OAuth가 RFC 9728 Protected Resource Metadata 디스커버리를 따라 인증 서버를 자동 탐색합니다 (v2.1.85) |
| **MCP 커넥터 시작 최적화** | claude.ai MCP 커넥터가 많을 때 시작 지연이 감소됩니다 (macOS 키체인 캐시 5초→30초) (v2.1.86) |
| **도구 설명 2KB 캡** | MCP 도구 설명과 서버 지침이 **2KB로 제한**됩니다. OpenAPI에서 자동 생성된 서버가 컨텍스트를 과도하게 차지하는 것을 방지 (v2.1.84) |
| **로컬/커넥터 중복 제거** | 같은 MCP 서버가 로컬 설정과 claude.ai 커넥터에 모두 있으면 **로컬 설정이 우선**, 중복 연결 방지 (v2.1.84) |
| **\`--mcp-config\` 정책 수정** | \`--mcp-config\` CLI 플래그가 \`allowedMcpServers\`/\`deniedMcpServers\` 관리 정책을 우회하던 버그 수정 (v2.1.83) |
| **커넥터 \`--print\` 모드** | claude.ai MCP 커넥터가 단일 턴 \`--print\` 모드에서도 사용 가능 (v2.1.83) |

\`\`\`
비유: 앱스토어 정리

도구 설명 2KB 캡 = 앱 설명이 너무 길면 잘라서 공간 절약
로컬/커넥터 중복 제거 = 같은 앱이 두 번 설치되면 하나만 남기기 (내 설정 우선)
\`\`\`

> **핵심 요약**: MCP 서버는 stdio(로컬), SSE(원격), claude.ai 커넥터(자동 연결) 3가지 방식으로 연결됩니다. filesystem, GitHub, Slack 등 공식 서버를 설치하거나, v2.1.46+의 claude.ai 커넥터로 설정 없이 바로 사용할 수도 있습니다.`
    },
    {
      id: "settings-config",
      title: "MCP 서버 설정 방법",
      content: `### settings.json으로 MCP 서버 연결하기

MCP 서버를 연결하려면 \`.claude/settings.json\` 파일에 설정을 추가합니다.

#### 기본 설정 구조

\`\`\`json
{
  "mcpServers": {
    "서버이름": {
      "command": "실행할 프로그램",
      "args": ["인자1", "인자2"],
      "env": {
        "환경변수": "값"
      }
    }
  }
}
\`\`\`

#### 파일시스템 서버 예시

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/me/documents"
      ]
    }
  }
}
\`\`\`

#### GitHub 서버 예시

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_여러분의토큰"
      }
    }
  }
}
\`\`\`

#### 설정 파일 위치

| 범위 | 위치 | 적용 대상 |
|------|------|----------|
| 프로젝트 | \`.claude/settings.json\` | 이 프로젝트만 |
| 전역 | \`~/.claude/settings.json\` | 모든 프로젝트 |

> **핵심 요약**: MCP 서버 설정은 \`.claude/settings.json\`의 mcpServers 항목에 추가합니다. command(실행 프로그램), args(인자), env(환경변수)를 지정하며, 프로젝트 단위 또는 전역(\`~/.claude/\`)으로 설정할 수 있습니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "파일시스템 MCP 서버 연결하기",
      content: `### 1단계: 파일시스템 서버 연결

가장 기본적인 MCP 서버인 **파일시스템 서버**를 연결해봅시다.
이 서버를 연결하면 클로드가 지정된 폴더의 파일을 읽고 쓸 수 있습니다.

#### 설정 순서

1. 프로젝트에 \`.claude\` 폴더 만들기
2. \`settings.json\`에 서버 설정 추가
3. 클로드 코드 재시작
4. 서버 연결 확인`,
      terminals: [
        {
          command: "mkdir -p .claude",
          output: "# .claude 폴더 생성"
        },
        {
          command: "cat .claude/settings.json",
          output: "{\n  \"mcpServers\": {\n    \"filesystem\": {\n      \"command\": \"npx\",\n      \"args\": [\n        \"-y\",\n        \"@modelcontextprotocol/server-filesystem\",\n        \"/Users/me/documents\"\n      ]\n    }\n  }\n}"
        },
        {
          command: "# 클로드에게 \"MCP 서버 목록 보여줘\" 요청",
          output: "연결된 MCP 서버:\n  - filesystem (연결됨)\n    도구: read_file, write_file, list_directory, search_files"
        }
      ]
    },
    {
      id: "step-02",
      title: "나만의 MCP 서버 만들기",
      content: `### 2단계: 커스텀 MCP 서버 만들기

이번에는 **현재 시간을 알려주는 MCP 서버**를 직접 만들어봅시다!
Node.js로 간단한 서버를 작성합니다.

#### 서버 코드 작성

\`\`\`javascript
// my-time-server.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "time-server",
  version: "1.0.0"
}, {
  capabilities: { tools: {} }
});

// 도구 목록 제공
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "get_current_time",
    description: "현재 시간을 알려줍니다",
    inputSchema: {
      type: "object",
      properties: {
        timezone: {
          type: "string",
          description: "시간대 (예: Asia/Seoul)"
        }
      }
    }
  }]
}));

// 도구 실행
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "get_current_time") {
    const tz = request.params.arguments?.timezone || "Asia/Seoul";
    const time = new Date().toLocaleString("ko-KR", { timeZone: tz });
    return {
      content: [{ type: "text", text: "현재 시간: " + time }]
    };
  }
});

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

#### settings.json에 등록

\`\`\`json
{
  "mcpServers": {
    "time-server": {
      "command": "node",
      "args": ["my-time-server.js"]
    }
  }
}
\`\`\`

이제 클로드에게 "지금 몇 시야?"라고 물으면 MCP 서버가 시간을 알려줍니다!`,
      terminals: [
        {
          command: "npm init -y && npm install @modelcontextprotocol/sdk",
          output: "added 15 packages in 3s"
        },
        {
          command: "node my-time-server.js",
          output: "# MCP 서버가 stdio 모드로 실행됨 (클로드가 자동 연결)"
        },
        {
          command: "# 클로드에게 \"지금 몇 시야?\" 요청",
          output: "[MCP 서버 호출: get_current_time]\n현재 시간: 2026. 2. 22. 오후 2:30:00"
        }
      ]
    },
    {
      id: "step-03",
      title: "GitHub MCP 서버 연결하기",
      content: `### 3단계: GitHub 서버 연결

GitHub MCP 서버를 연결하면 클로드가 직접 GitHub의 이슈, PR, 코드를 다룰 수 있습니다.

#### 사전 준비: Personal Access Token 발급

1. GitHub.com 로그인
2. Settings > Developer settings > Personal access tokens
3. "Generate new token (classic)" 클릭
4. 필요한 권한(scope) 선택: \`repo\`, \`read:org\`
5. 토큰 복사 (한 번만 보여주므로 꼭 저장!)

#### settings.json 설정

\`\`\`json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_여러분의토큰"
      }
    }
  }
}
\`\`\`

> 주의: 토큰은 비밀번호와 같습니다! 절대 다른 사람에게 보여주거나 git에 커밋하지 마세요.`,
      terminals: [
        {
          command: "# 클로드에게 \"내 GitHub 레포 목록 보여줘\" 요청",
          output: "[MCP 서버 호출: list_repositories]\n\n레포지토리 목록:\n  1. my-project (private)\n  2. hello-world (public)\n  3. todo-app (private)"
        },
        {
          command: "# 클로드에게 \"todo-app 레포에 이슈 만들어줘\" 요청",
          output: "[MCP 서버 호출: create_issue]\n\n이슈 생성 완료:\n  #42 '로그인 기능 버그 수정'\n  URL: https://github.com/me/todo-app/issues/42"
        }
      ]
    }
  ],

  examples: [
    {
      id: "multi-server",
      title: "여러 MCP 서버 동시 사용하기",
      content: `### 여러 서버를 연결한 실전 시나리오

여러 MCP 서버를 동시에 연결하면, 클로드가 다양한 외부 도구를 조합해서 사용할 수 있습니다.

#### 설정 예시: 3개 서버 동시 연결

\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_토큰"
      }
    },
    "time-server": {
      "command": "node",
      "args": ["my-time-server.js"]
    }
  }
}
\`\`\`

#### 조합 활용 시나리오

\`\`\`
사용자: "오늘 날짜로 개발 일지를 만들고 GitHub에 이슈로도 등록해줘"

클로드의 동작:
1. time-server -> get_current_time (오늘 날짜 확인)
2. filesystem  -> write_file (개발 일지 파일 생성)
3. github      -> create_issue (GitHub 이슈 등록)

결과:
- dev-log-2026-02-22.md 파일 생성됨
- GitHub 이슈 #15 등록됨
\`\`\`

하나의 요청으로 **3개 서버의 기능을 조합**해서 처리한 것입니다!`,
      checklist: [
        "MCP가 무엇인지(모델 컨텍스트 프로토콜) 설명할 수 있다",
        "settings.json에서 MCP 서버를 설정하는 방법을 안다",
        "파일시스템, GitHub 등 주요 MCP 서버의 용도를 안다",
        "커스텀 MCP 서버를 만드는 기본 구조를 이해했다",
        "여러 MCP 서버를 동시에 연결할 수 있다는 것을 안다",
        "토큰 같은 민감 정보의 보안 중요성을 이해했다",
        "claude.ai MCP 커넥터가 무엇인지 안다"
      ]
    },
    {
      id: "cross-reference",
      title: "더 알아보기",
      content: `## 관련 튜토리얼

| 튜토리얼 | 관련 내용 |
|----------|----------|
| **11-mcp-connectors** | claude.ai MCP 커넥터 심화 (OAuth, ToolSearch) |
| **12-figma-mcp** | Figma MCP 양방향 워크플로우 |
| **06-hooks** | MCP 서버와 훅을 조합한 자동화 |`,
      checklist: []
    }
  ],

  quiz: [
    {
      question: "MCP의 풀네임은?",
      options: [
        "Multi Command Protocol",
        "Model Context Protocol",
        "Machine Control Program",
        "Module Connection Platform"
      ],
      answer: 1,
      explanation: "MCP는 Model Context Protocol(모델 컨텍스트 프로토콜)의 약자입니다. 클로드(모델)와 외부 도구(컨텍스트)를 연결하는 표준 방법(프로토콜)이라는 뜻이에요."
    },
    {
      question: "MCP를 가장 잘 비유한 것은?",
      options: [
        "스마트폰의 앱 스토어",
        "컴퓨터의 배경화면",
        "게임의 난이도 설정"
      ],
      answer: 0,
      explanation: "스마트폰에 앱을 설치해서 새로운 기능을 추가하듯, MCP 서버를 연결해서 클로드에게 새로운 능력을 추가합니다. USB 허브 비유도 적절합니다."
    },
    {
      question: "MCP 서버 설정을 저장하는 파일은?",
      options: [
        ".claude/hooks.json",
        ".claude/settings.json",
        ".claude/mcp.json",
        "package.json"
      ],
      answer: 1,
      explanation: "MCP 서버 설정은 .claude/settings.json 파일의 mcpServers 항목에 추가합니다. Hooks 설정도 같은 파일에 넣습니다."
    },
    {
      question: "MCP 서버의 식당 비유에서, '주방'에 해당하는 것은?",
      options: [
        "사용자",
        "클로드",
        "MCP 서버",
        "settings.json"
      ],
      answer: 2,
      explanation: "식당 비유에서 주방은 실제로 요리를 만드는 곳입니다. MCP 서버도 마찬가지로 실제 기능을 실행하는 프로그램입니다. 클로드(웨이터)가 사용자(손님)의 요청을 MCP 서버(주방)에 전달합니다."
    },
    {
      question: "GitHub MCP 서버를 사용할 때 반드시 주의해야 할 점은?",
      options: [
        "서버를 매번 재시작해야 한다",
        "Personal Access Token을 git에 커밋하면 안 된다",
        "프로젝트마다 다른 서버를 설치해야 한다"
      ],
      answer: 1,
      explanation: "GitHub Personal Access Token은 비밀번호와 같습니다. git에 커밋하거나 다른 사람에게 공유하면 보안 사고가 발생할 수 있어요. 환경변수로 관리하고 .gitignore에 설정 파일을 추가하는 것이 안전합니다."
    }
  ]
};
