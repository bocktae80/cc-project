window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["07-mcp-server"] = {
  overview: `## MCP 서버 -- 클로드에게 새로운 능력을!

스마트폰에는 기본 앱(전화, 카메라)이 있지만, **앱 스토어**에서 새 앱을 설치하면 훨씬 많은 걸 할 수 있죠.
카카오톡으로 채팅하고, 배달앱으로 음식을 시키고, 게임도 할 수 있어요.

**MCP 서버**도 똑같습니다. 클로드(스마트폰)에 **새로운 앱(MCP 서버)을 설치**하면,
파일 시스템을 관리하고, GitHub에서 코드를 다루고, Slack으로 메시지를 보낼 수 있어요!

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
\`\`\``
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

MCP 서버는 두 가지 방식으로 실행됩니다:

\`\`\`
1. stdio (표준 입출력) -- 가장 일반적
   클로드 <--stdin/stdout--> MCP 서버 프로세스

2. sse (Server-Sent Events) -- 원격 서버용
   클로드 <--HTTP--> 원격 MCP 서버
\`\`\`

대부분의 MCP 서버는 **stdio** 방식을 사용합니다.
여러분의 컴퓨터에서 프로그램이 실행되고, 클로드가 그 프로그램과 대화하는 구조예요.`
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
| 전역 | \`~/.claude/settings.json\` | 모든 프로젝트 |`
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
        "토큰 같은 민감 정보의 보안 중요성을 이해했다"
      ]
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
