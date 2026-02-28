window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["06-hooks"] = {
  overview: `## Hooks -- 클로드에 자동 센서 달기

교실 문에 **센서**가 달려 있다고 상상해보세요.
문이 **열릴 때** 자동으로 불이 켜지고, 문이 **닫힐 때** 에어컨이 꺼집니다.

**Hooks**도 똑같습니다! 클로드가 도구를 사용할 때 **자동으로 실행되는 스크립트**를 달 수 있어요.

\`\`\`
교실 문 센서                     클로드 Hooks
-----------                     -----------
문 열릴 때 -> 불 켜짐             PreToolUse  -> 도구 실행 전 반응
문 닫힐 때 -> 에어컨 끔           PostToolUse -> 도구 실행 후 반응
알림 벨    -> 공지 전달           Notification -> 알림 발생 시
하교 벨    -> 정리 시작           Stop         -> 대화 종료 시
\`\`\`

### 핵심 포인트

- **PreToolUse**: 도구 실행 **전**에 동작 (차단 가능!)
- **PostToolUse**: 도구 실행 **후**에 동작 (기록용)
- 설정 위치: \`.claude/settings.json\`
- 활용: 파일 보호, 자동 로깅, 검증, 알림`,

  concepts: [
    {
      id: "hook-types",
      title: "4종 훅 이해하기",
      content: `### 4종 훅 비교

클로드 코드에는 4가지 종류의 훅이 있습니다.
각각 **다른 타이밍**에 실행되며, 용도도 다릅니다.

| 훅 종류 | 언제 실행? | 차단 가능? | 비유 |
|---------|-----------|-----------|------|
| **PreToolUse** | 도구 사용 **전** | O (exit 2) | 문 열기 전 센서 |
| **PostToolUse** | 도구 사용 **후** | X | 문 닫은 후 센서 |
| **Notification** | 알림 발생 시 | X | 알림 벨 |
| **Stop** | 대화 종료 시 | X | 하교 벨 |

#### 가장 중요한 차이: 차단 기능

**PreToolUse**만 도구 사용을 **차단**할 수 있습니다!

\`\`\`
exit 0  ->  "진행해도 돼!" (허용)
exit 2  ->  "이건 안 돼!" (차단)
\`\`\`

예를 들어, \`.env\` 파일을 수정하려 할 때 "이 파일은 수정 금지!"라고 차단할 수 있어요.

#### 동작 흐름

\`\`\`
사용자: "파일 수정해줘"
    |
    v
[PreToolUse 훅 실행]
    |
    +-- exit 0 (허용) --> [도구 실행] --> [PostToolUse 훅 실행] --> 결과 반환
    |
    +-- exit 2 (차단) --> "수정할 수 없습니다" (도구 실행 안 됨)
\`\`\``
    },
    {
      id: "settings-config",
      title: "settings.json 설정 방법",
      content: `### 훅 설정하기 (.claude/settings.json)

훅은 프로젝트의 \`.claude/settings.json\` 파일에서 설정합니다.

#### 설정 파일 구조

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '파일 쓰기 감지!'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '도구 사용 완료'"
          }
        ]
      }
    ]
  }
}
\`\`\`

#### 주요 설정 항목

| 항목 | 설명 | 예시 |
|------|------|------|
| **matcher** | 어떤 도구에 반응할지 (정규식) | \`"Write"\`, \`"Edit"\`, \`".*"\` (모두) |
| **type** | 훅 종류 | \`"command"\` (쉘 명령어) |
| **command** | 실행할 명령어 | \`"echo 'hello'"\`, \`"bash script.sh"\` |

#### matcher 패턴 예시

\`\`\`
"Write"     -> Write 도구만 감지
"Edit"      -> Edit 도구만 감지
"Write|Edit" -> Write 또는 Edit 감지
".*"        -> 모든 도구 감지
"Bash"      -> Bash(터미널) 도구만 감지
\`\`\``
    },
    {
      id: "env-variables",
      title: "환경변수 -- 훅이 받는 정보",
      content: `### 환경변수

훅 스크립트가 실행될 때, 클로드가 자동으로 **환경변수**를 넘겨줍니다.
택배 비유로 이해해볼까요?

\`\`\`
택배가 오면...                     훅이 실행되면...
-----------                       -----------
택배 회사 이름 (누가 왔는지)    ->  CLAUDE_TOOL_NAME (어떤 도구인지)
택배 상자 내용 (뭘 가져왔는지)  ->  CLAUDE_TOOL_INPUT (입력 데이터)
수령 확인서 (잘 받았는지)       ->  CLAUDE_TOOL_RESULT (실행 결과)
\`\`\`

| 환경변수 | 설명 | 사용 가능한 훅 |
|---------|------|--------------|
| \`CLAUDE_TOOL_NAME\` | 도구 이름 (예: Write, Edit) | 모든 훅 |
| \`CLAUDE_TOOL_INPUT\` | 도구 입력 (JSON) | 모든 훅 |
| \`CLAUDE_TOOL_RESULT\` | 도구 실행 결과 | PostToolUse만 |

#### 활용 예시

\`\`\`bash
#!/bin/bash
# 어떤 도구가 사용됐는지 로그에 기록
echo "[$(date)] $CLAUDE_TOOL_NAME 사용됨" >> tool-log.txt

# 입력 데이터에서 파일 경로 추출
echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path'
\`\`\``
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 번째 훅 만들기",
      content: `### 1단계: Write 도구에 메시지 표시하기

가장 간단한 훅을 만들어봅시다!
클로드가 **Write 도구**를 사용할 때마다 "파일 쓰기 감지!" 메시지를 표시하는 훅입니다.

#### 설정 파일 만들기

프로젝트 폴더에 \`.claude/settings.json\` 파일을 만들어야 합니다.

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo '>>> 파일 쓰기가 감지되었습니다! <<<'"
          }
        ]
      }
    ]
  }
}
\`\`\`

이제 클로드에게 "hello.txt 파일을 만들어줘"라고 말하면,
Write 도구가 실행되기 **전에** 메시지가 표시됩니다!`,
      terminals: [
        {
          command: "mkdir -p .claude",
          output: "# .claude 폴더 생성"
        },
        {
          command: "cat .claude/settings.json",
          output: "{\n  \"hooks\": {\n    \"PreToolUse\": [\n      {\n        \"matcher\": \"Write\",\n        \"hooks\": [\n          {\n            \"type\": \"command\",\n            \"command\": \"echo '>>> 파일 쓰기가 감지되었습니다! <<<'\"\n          }\n        ]\n      }\n    ]\n  }\n}"
        },
        {
          command: "# 클로드에게 \"hello.txt 만들어줘\" 요청 시",
          output: ">>> 파일 쓰기가 감지되었습니다! <<<\n[Write 도구 실행 -> hello.txt 생성됨]"
        }
      ]
    },
    {
      id: "step-02",
      title: "가드 훅 -- 파일 수정 차단하기",
      content: `### 2단계: 특정 파일 수정 차단하기

이번에는 **중요한 파일을 보호하는 훅**을 만들어봅시다.
\`.env\` 파일(비밀 설정)이나 \`package-lock.json\` 같은 파일을 실수로 수정하지 않도록 막아줍니다.

#### 가드 스크립트 만들기

\`\`\`bash
#!/bin/bash
# guard.sh -- 보호 파일 수정 차단 스크립트

# 도구 입력에서 파일 경로 추출
FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // .command' 2>/dev/null)

# 보호 대상 파일 목록
PROTECTED=".env package-lock.json"

for p in $PROTECTED; do
  if echo "$FILE_PATH" | grep -q "$p"; then
    echo "이 파일은 수정이 금지되어 있습니다: $p"
    exit 2  # exit 2 = 차단!
  fi
done

exit 0  # exit 0 = 허용
\`\`\`

#### settings.json에 가드 훅 등록

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/guard.sh"
          }
        ]
      }
    ]
  }
}
\`\`\`

> 핵심: **exit 2**를 반환하면 도구 사용이 차단됩니다!`,
      terminals: [
        {
          command: "# 클로드에게 \".env 파일 수정해줘\" 요청 시",
          output: "이 파일은 수정이 금지되어 있습니다: .env\n[도구 실행 차단됨]"
        },
        {
          command: "# 클로드에게 \"index.html 수정해줘\" 요청 시",
          output: "[정상 허용 -> Edit 도구 실행됨]"
        }
      ]
    },
    {
      id: "step-03",
      title: "자동 로그 훅 만들기",
      content: `### 3단계: 모든 도구 사용을 자동 기록하기

클로드가 어떤 도구를 사용했는지 **자동으로 로그 파일에 기록**하는 훅입니다.
PostToolUse를 사용해서 도구 실행이 끝난 **후에** 기록합니다.

#### 로그 스크립트

\`\`\`bash
#!/bin/bash
# auto-log.sh -- 도구 사용 자동 기록

LOG_FILE=".claude/tool-history.log"

# 현재 시간 + 도구 이름 기록
echo "[$(date '+%Y-%m-%d %H:%M:%S')] $CLAUDE_TOOL_NAME" >> "$LOG_FILE"
\`\`\`

#### settings.json 설정

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/auto-log.sh"
          }
        ]
      }
    ]
  }
}
\`\`\`

\`matcher: ".*"\`는 **모든 도구**에 반응한다는 뜻입니다.`,
      terminals: [
        {
          command: "# 클로드와 대화 후 로그 파일 확인",
          output: ""
        },
        {
          command: "cat .claude/tool-history.log",
          output: "[2026-02-22 14:30:01] Read\n[2026-02-22 14:30:05] Edit\n[2026-02-22 14:30:12] Write\n[2026-02-22 14:30:15] Bash"
        }
      ]
    }
  ],

  examples: [
    {
      id: "practical-hooks",
      title: "실전 훅 활용 모음",
      content: `### 실전에서 바로 쓸 수 있는 훅 패턴

#### 1. 파일 백업 훅

파일을 수정하기 전에 자동으로 백업 복사본을 만듭니다.

\`\`\`bash
#!/bin/bash
# backup.sh -- 수정 전 자동 백업
FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path')
if [ -f "$FILE_PATH" ]; then
  cp "$FILE_PATH" "$FILE_PATH.backup"
  echo "백업 생성: $FILE_PATH.backup"
fi
exit 0
\`\`\`

#### 2. 위험 명령어 차단 훅

\`rm -rf\`나 \`git push --force\` 같은 위험한 명령어를 차단합니다.

\`\`\`bash
#!/bin/bash
# danger-guard.sh
CMD=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.command')
DANGEROUS="rm -rf|git push --force|drop table"
if echo "$CMD" | grep -qiE "$DANGEROUS"; then
  echo "위험한 명령어가 감지되었습니다: $CMD"
  exit 2
fi
exit 0
\`\`\`

#### 3. 작업 알림 훅 (Stop)

대화가 끝나면 알림을 보냅니다.

\`\`\`json
{
  "hooks": {
    "Stop": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\\"클로드 작업 완료!\\\" with title \\\"Claude Code\\\"'"
          }
        ]
      }
    ]
  }
}
\`\`\``,
      checklist: [
        "PreToolUse와 PostToolUse의 차이를 이해했다",
        "exit 0(허용)과 exit 2(차단)의 역할을 알았다",
        "settings.json에서 matcher 패턴 설정 방법을 알았다",
        "환경변수(CLAUDE_TOOL_NAME, CLAUDE_TOOL_INPUT)를 활용할 수 있다",
        ".claude/settings.json 파일의 위치를 알았다"
      ]
    }
  ],

  quiz: [
    {
      question: "도구 사용을 차단(막기)할 수 있는 훅은?",
      options: [
        "PostToolUse",
        "PreToolUse",
        "Notification",
        "Stop"
      ],
      answer: 1,
      explanation: "PreToolUse만 도구 사용을 차단할 수 있습니다. exit 2를 반환하면 도구 실행이 막히고, exit 0을 반환하면 정상 진행됩니다."
    },
    {
      question: "훅 스크립트에서 exit 2를 반환하면 어떤 일이 일어나나요?",
      options: [
        "도구가 정상 실행된다",
        "도구 사용이 차단된다",
        "클로드가 종료된다"
      ],
      answer: 1,
      explanation: "exit 2는 '차단' 신호입니다. PreToolUse 훅에서 exit 2를 반환하면 해당 도구 사용이 차단되고, 클로드는 사용자에게 '실행할 수 없다'고 알려줍니다."
    },
    {
      question: "훅 설정 파일의 올바른 위치는?",
      options: [
        "프로젝트 루트의 settings.json",
        "홈 폴더의 hooks.json",
        "프로젝트의 .claude/settings.json"
      ],
      answer: 2,
      explanation: "훅은 프로젝트 폴더 안의 .claude/settings.json 파일에 설정합니다. 프로젝트 루트에 .claude 폴더를 만들고 그 안에 settings.json을 넣어야 합니다."
    },
    {
      question: "CLAUDE_TOOL_RESULT 환경변수를 사용할 수 있는 훅은?",
      options: [
        "PreToolUse",
        "PostToolUse",
        "모든 훅",
        "Notification"
      ],
      answer: 1,
      explanation: "CLAUDE_TOOL_RESULT(도구 실행 결과)는 PostToolUse에서만 사용할 수 있습니다. 도구가 실행되기 전인 PreToolUse에서는 아직 결과가 없기 때문입니다."
    },
    {
      question: "matcher에 \".*\"를 설정하면 어떤 의미인가요?",
      options: [
        "Write 도구만 감지한다",
        "아무 도구도 감지하지 않는다",
        "모든 도구에 반응한다"
      ],
      answer: 2,
      explanation: ".*는 정규표현식에서 '모든 문자열'을 의미합니다. 따라서 matcher에 .*를 쓰면 Write, Edit, Bash 등 모든 도구 사용에 반응하는 훅이 됩니다."
    }
  ]
};
