window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["03d-debug-features"] = {
  overview: `## 디버그 기능 — 클로드 코드 내부 들여다보기

클로드 코드는 겉으로 보면 대화창이지만, 안에서는 API 호출, 도구 실행, 파일 읽기, 권한 확인 등 엄청나게 많은 일이 벌어집니다.

**디버그 기능**은 이 내부 동작을 볼 수 있게 해주는 도구입니다.

### 두 가지 도구

| 구분 | \`--debug\` 플래그 | \`/debug\` 커맨드 |
|------|-----------------|----------------|
| **비유** | 자동차 블랙박스 | 자동차 계기판 |
| **실행 방법** | \`claude --debug\` (세션 시작 시) | 세션 안에서 \`/debug\` 입력 |
| **목적** | 내부 동작 **전체 기록** | 현재 세션 **요약 진단** |
| **출력 위치** | \`~/.claude/debug/\` 파일 | 화면에 바로 출력 |
| **사용 시점** | "왜 느리지?", "어디서 에러?" | "지금 세션 괜찮나?" |

쉽게 말하면:
- \`/debug\` = 문제가 있나 확인하는 **건강검진**
- \`--debug\` = 원인이 뭔지 추적하는 **정밀검사**`,

  concepts: [
    {
      id: "debug-flag",
      title: "--debug 플래그 (블랙박스)",
      content: `### 자동차 블랙박스처럼 모든 걸 기록하는 --debug

자동차를 탈 때 블랙박스는 항상 켜져 있죠? 사고가 나면 그때 블랙박스 영상을 되감아서 원인을 찾습니다.

\`--debug\` 플래그도 똑같습니다. 세션을 시작할 때 켜두면, 클로드 코드가 하는 **모든 일**을 파일에 기록합니다.

#### 사용법

\`\`\`bash
# 전체 로그 켜기
claude --debug

# 특정 카테고리만 보기 (API 관련만)
claude --debug "api"

# 여러 카테고리 동시에
claude --debug "api,hooks"

# 특정 카테고리 빼고 보기
claude --debug "!render,!file"

# 로그를 지정 파일에 저장
claude --debug-file ./my-debug.txt
\`\`\`

#### 로그 저장 위치

\`\`\`
~/.claude/debug/
├── latest              ← 최근 세션 바로가기 (symlink)
├── abc123-def456.txt   ← 세션별 로그 파일
└── ...                 ← 세션마다 하나씩 쌓임
\`\`\`

#### 로그 한 줄 읽는 법

\`\`\`
2026-02-06T17:00:26.999Z [DEBUG] [API:request] Creating client
│                        │       │              │
│                        │       │              └── 메시지 (뭘 했는지)
│                        │       └── 카테고리 (어느 부분인지)
│                        └── 로그 레벨 (DEBUG / WARN / ERROR)
└── 타임스탬프 (정확한 시각)
\`\`\`

블랙박스 영상에서 시간, 속도, 방향이 기록되듯, 디버그 로그에도 **언제, 어디서, 무엇을** 했는지가 기록됩니다.`
    },
    {
      id: "debug-command",
      title: "/debug 커맨드 (계기판)",
      content: `### 자동차 계기판처럼 지금 상태를 보여주는 /debug

운전 중에 연료가 부족하면 계기판의 경고등이 켜지죠? 블랙박스를 되감을 필요 없이, **지금 상태**를 바로 알 수 있습니다.

\`/debug\` 커맨드도 똑같습니다. 세션 중간에 입력하면 **현재 세션의 상태**를 요약해서 보여줍니다.

#### 사용법

세션 안에서 그냥 입력하면 됩니다:

\`\`\`
> /debug
\`\`\`

#### 보여주는 정보

- 디버그 로그 파일 경로
- 총 로그 줄 수
- 최근 로그 20줄
- 에러/경고 요약

#### 언제 쓰면 좋을까?

| 상황 | /debug로 확인할 것 |
|------|-------------------|
| 클로드가 갑자기 느려졌어 | 토큰 사용량, 캐시 상태 |
| 도구 실행이 안 돼 | 도구 거부/에러 기록 |
| 뭔가 이상한데 뭔지 모르겠어 | 최근 에러/경고 목록 |

> **팁**: /debug는 "빠른 건강검진", --debug는 "정밀검사"라고 기억하세요!`
    },
    {
      id: "log-analysis",
      title: "로그 분석하기",
      content: `### 블랙박스 영상 되감기 — 로그 분석

블랙박스 영상을 볼 때 전체를 다 볼 필요 없이, "사고 시점"만 빨리 감기하잖아요?
디버그 로그도 마찬가지입니다. \`grep\` 명령어로 원하는 부분만 쏙 뽑아볼 수 있어요.

#### 로그 레벨 이해하기

| 레벨 | 의미 | 비유 |
|------|------|------|
| \`[DEBUG]\` | 일반 동작 기록 | 정상 주행 기록 |
| \`[WARN]\` | 경고 (동작은 함) | 연료 부족 경고등 |
| \`[ERROR]\` | 에러 발생 | 엔진 고장 경고 |

#### 주요 카테고리

\`\`\`
카테고리               무슨 일을 하는 곳?
─────────────────────────────────────────
[init]                 시작 초기화
[STARTUP]              세션 전체 시작 흐름
[API:request]          Anthropic API 호출
[API:auth]             OAuth 인증 확인
[render]               터미널 UI 렌더링
[LSP MANAGER]          Language Server Protocol
\`\`\`

#### 분석용 명령어 모음

\`\`\`bash
# 에러만 보기 (사고 장면만 보기)
grep "[ERROR]" ~/.claude/debug/latest

# 경고만 보기 (주의 장면만 보기)
grep "[WARN]" ~/.claude/debug/latest

# API 호출만 보기 (통신 기록만 보기)
grep "[API:request]" ~/.claude/debug/latest

# 처음 30줄만 보기 (시작 과정 확인)
head -30 ~/.claude/debug/latest
\`\`\`

> **핵심**: 로그 전체를 읽을 필요 없습니다. grep으로 필요한 부분만 찾으면 됩니다!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "디버그 모드로 세션 시작하기",
      content: `### 블랙박스 켜고 운전 시작하기

자동차 블랙박스를 켜고 운전을 시작하듯, \`--debug\` 플래그를 켜고 클로드 세션을 시작해봅시다.

#### 순서

1. 터미널에서 \`claude --debug\` 실행
2. 세션 안에서 간단한 작업 수행 (파일 읽기 등)
3. 세션 종료 후 로그 파일 확인
4. grep으로 원하는 정보 필터링`,
      terminals: [
        {
          command: "claude --debug",
          output: `╭──────────────────────────────────────────────╮
│ Claude Code v2.1.50                          │
│ Debug logging enabled                        │
│ Log file: ~/.claude/debug/a1b2c3-d4e5f6.txt  │
╰──────────────────────────────────────────────╯

> 안녕! 이 프로젝트에서 README.md를 읽어줘`
        },
        {
          command: "cat ~/.claude/debug/latest | head -15",
          output: `2026-02-06T17:00:26.333Z [DEBUG] [init] configureGlobalMTLS starting
2026-02-06T17:00:26.337Z [DEBUG] [init] Permission rules loaded (allow: 9, deny: 11)
2026-02-06T17:00:26.342Z [DEBUG] [STARTUP] setup() starting
2026-02-06T17:00:26.346Z [DEBUG] [STARTUP] Loading commands/agents
2026-02-06T17:00:26.380Z [DEBUG] [STARTUP] Commands loaded (plugins: 5, skills: 4, commands: 30)
2026-02-06T17:00:26.999Z [DEBUG] [API:request] Creating client
2026-02-06T17:00:27.015Z [DEBUG] [API:auth] OAuth token verified
2026-02-06T17:00:27.025Z [DEBUG] [LSP MANAGER] Initialized with 0 servers
2026-02-06T17:00:27.100Z [DEBUG] [API:request] Sending message
2026-02-06T17:00:27.500Z [DEBUG] [render] Rendering assistant response
2026-02-06T17:00:28.200Z [DEBUG] [ToolSearch:optimistic] Searching for Read tool
2026-02-06T17:00:28.210Z [DEBUG] [API:request] Tool execution: Read
2026-02-06T17:00:28.220Z [DEBUG] [API:request] File read: README.md (45 lines)
2026-02-06T17:00:28.300Z [DEBUG] [render] Rendering tool result
2026-02-06T17:00:28.500Z [DEBUG] [API:request] Sending continuation`
        },
        {
          command: "grep \"\\[ERROR\\]\" ~/.claude/debug/latest",
          output: `(에러가 없으면 아무것도 출력되지 않습니다 — 좋은 신호!)`
        },
        {
          command: "grep \"\\[API:request\\]\" ~/.claude/debug/latest | wc -l",
          output: `12
(이 세션에서 API를 12번 호출했다는 뜻)`
        }
      ]
    },
    {
      id: "step-02",
      title: "/debug로 세션 상태 진단하기",
      content: `### 계기판 확인하기 — /debug 커맨드

운전 중에 계기판을 보듯, 세션 중간에 /debug를 입력하면 현재 상태를 바로 확인할 수 있습니다.

#### 순서

1. 클로드 세션 안에서 작업 수행
2. 문제가 생겼거나 상태가 궁금할 때 \`/debug\` 입력
3. 출력된 정보를 통해 문제 원인 파악`,
      terminals: [
        {
          command: "/debug",
          output: `# Debug Skill

## Session Debug Log
경로: ~/.claude/debug/a1b2c3-d4e5f6.txt
총 줄 수: 955

### Last 20 lines
2026-02-06T17:05:12.100Z [DEBUG] [API:request] Sending message
2026-02-06T17:05:12.500Z [DEBUG] [render] Rendering response
2026-02-06T17:05:13.200Z [WARN]  [API:request] Rate limit approaching
...

## Issue Description
- WARN: Rate limit에 가까워지고 있습니다
- 최근 5분간 API 호출 23회
- 추천: 복잡한 작업을 나눠서 진행하세요`
        },
        {
          command: "claude --debug \"api\"",
          output: `╭──────────────────────────────────────────────╮
│ Claude Code v2.1.50                          │
│ Debug logging enabled (filter: api)          │
│ Log file: ~/.claude/debug/f7g8h9-i0j1k2.txt  │
╰──────────────────────────────────────────────╯

(API 관련 로그만 기록됩니다)`
        }
      ]
    },
    {
      id: "step-03",
      title: "두 도구를 함께 사용하기",
      content: `### 계기판으로 발견하고, 블랙박스로 추적하기

실전에서는 두 도구를 **함께** 사용합니다:
1. \`/debug\`로 빠르게 문제가 있는지 확인 (건강검진)
2. 문제가 발견되면 \`--debug\` 로그에서 상세 원인 추적 (정밀검사)

#### 시나리오: "클로드가 갑자기 느려졌어!"`,
      terminals: [
        {
          command: "/debug",
          output: `## Issue Description
- WARN: 컨텍스트 윈도우 85% 사용 중
- WARN: 최근 응답 시간 평균 8.5초 (정상: 2-3초)
- 추천: 대화가 길어졌습니다. 새 세션을 시작해보세요.`
        },
        {
          command: "grep \"\\[WARN\\]\" ~/.claude/debug/latest | tail -5",
          output: `2026-02-06T17:10:01.200Z [WARN] [API:request] Context window 80% used
2026-02-06T17:10:15.300Z [WARN] [API:request] Context window 83% used
2026-02-06T17:10:30.100Z [WARN] [API:request] Response time: 7200ms
2026-02-06T17:10:45.500Z [WARN] [API:request] Context window 85% used
2026-02-06T17:11:00.800Z [WARN] [Speculation] Cache break detected`
        },
        {
          command: "grep \"Context window\" ~/.claude/debug/latest | wc -l",
          output: `8
(컨텍스트 윈도우 경고가 8번 — 대화가 너무 길어진 것이 원인!)`
        }
      ]
    }
  ],

  examples: [
    {
      id: "debug-workflow",
      title: "디버그 문제 해결 워크플로우",
      content: `### 실전 디버그 워크플로우

문제가 생겼을 때 따라하는 단계별 방법입니다:

\`\`\`
1단계: /debug로 빠른 진단 (계기판 확인)
   ↓
2단계: 문제 유형 파악 (에러? 느림? 도구 안됨?)
   ↓
3단계: --debug 로그에서 해당 카테고리 검색
   ↓
4단계: 원인 파악 → 해결
\`\`\`

#### grep 필터링 치트시트

\`\`\`bash
# 에러만 보기
grep "\\[ERROR\\]" ~/.claude/debug/latest

# 경고만 보기
grep "\\[WARN\\]" ~/.claude/debug/latest

# API 호출 추적
grep "\\[API:request\\]" ~/.claude/debug/latest

# 도구 실행 추적
grep "Tool" ~/.claude/debug/latest

# 특정 시간대 로그 (17시 10분대)
grep "T17:10:" ~/.claude/debug/latest
\`\`\``,
      checklist: [
        "--debug 플래그로 세션을 시작하는 방법을 알고 있다",
        "로그 파일 위치(~/.claude/debug/)를 알고 있다",
        "로그 레벨(DEBUG, WARN, ERROR)의 차이를 이해한다",
        "/debug 커맨드를 세션 안에서 실행할 수 있다",
        "grep으로 원하는 로그를 필터링할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "클로드 코드에서 --debug 플래그의 역할은?",
      options: [
        "세션의 모든 내부 동작을 로그 파일에 기록한다",
        "버그를 자동으로 수정한다",
        "디버그 모드에서만 사용할 수 있는 특별한 도구를 활성화한다"
      ],
      answer: 0,
      explanation: "--debug는 자동차 블랙박스처럼 클로드 코드의 모든 내부 동작(API 호출, 도구 실행 등)을 파일에 기록합니다. 버그를 수정하는 것이 아니라 원인을 찾는 데 사용합니다."
    },
    {
      question: "/debug 커맨드와 --debug 플래그의 차이는?",
      options: [
        "둘 다 같은 기능이다",
        "/debug는 세션 중 실시간 진단, --debug는 전체 로그 기록",
        "--debug는 세션 중 실시간 진단, /debug는 전체 로그 기록"
      ],
      answer: 1,
      explanation: "/debug는 계기판처럼 '지금 상태'를 빠르게 보여주고, --debug는 블랙박스처럼 '모든 동작'을 파일에 기록합니다. /debug는 건강검진, --debug는 정밀검사입니다."
    },
    {
      question: "--debug 로그 파일은 어디에 저장되나요?",
      options: [
        "프로젝트 루트의 debug/ 폴더",
        "~/.claude/debug/ 폴더",
        "터미널 화면에만 출력됨"
      ],
      answer: 1,
      explanation: "디버그 로그는 ~/.claude/debug/ 폴더에 세션별로 저장됩니다. latest라는 심볼릭 링크를 통해 가장 최근 세션의 로그에 빠르게 접근할 수 있습니다."
    },
    {
      question: "디버그 로그에서 에러만 보려면 어떤 명령어를 사용하나요?",
      options: [
        "cat ~/.claude/debug/latest",
        "grep \"[ERROR]\" ~/.claude/debug/latest",
        "claude --debug \"error\""
      ],
      answer: 1,
      explanation: "grep 명령어로 [ERROR] 문자열이 포함된 줄만 필터링할 수 있습니다. 전체 로그를 다 읽을 필요 없이, 원하는 정보만 빠르게 찾을 수 있어요."
    },
    {
      question: "클로드가 느려졌을 때 가장 먼저 해야 할 일은?",
      options: [
        "클로드를 재설치한다",
        "세션 안에서 /debug를 실행해 현재 상태를 확인한다",
        "새 프로젝트를 만든다"
      ],
      answer: 1,
      explanation: "/debug는 계기판처럼 현재 상태를 빠르게 보여줍니다. 컨텍스트 윈도우 사용률, API 응답 시간 등을 확인하면 느려진 원인을 바로 파악할 수 있습니다."
    }
  ]
};
