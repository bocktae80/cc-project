window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["06-hooks"] = {
  overview: `## Hooks — 도구 실행에 자동 반응하기

교실 문에 **센서**가 달려 있다고 상상해보세요. 문이 **열릴 때** 자동으로 불이 켜지고, 문이 **닫힐 때** 에어컨이 꺼집니다. **Hooks**도 똑같습니다! 클로드가 도구를 사용할 때 **자동으로 실행되는 스크립트**를 달 수 있어요.

### 이런 상황에서 유용해요
- **파일 보호**: ".env 파일을 실수로 수정하면 안 되는데..." — PreToolUse 훅으로 특정 파일 수정 자동 차단
- **자동 기록**: "클로드가 어떤 도구를 썼는지 로그로 남기고 싶어" — PostToolUse 훅으로 모든 도구 사용 자동 기록
- **위험 방지**: "rm -rf 같은 위험한 명령어를 막고 싶어" — 가드 스크립트로 위험 명령어 자동 차단

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | 16가지 훅 이벤트, 설정 방법, 환경변수 이해 | 💡 개념 |
| 2 | 메시지 훅, 가드 훅, 자동 로그 훅 만들기 실습 | 🔧 실습 |
| 3 | 파일 백업, 위험 명령어 차단, 알림 등 실전 패턴 | 💻 예제 |

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
      content: `### 훅 이벤트 총정리 (v2.1.70)

클로드 코드에는 **16가지** 훅 이벤트가 있습니다. 가장 많이 쓰는 핵심 6개와 나머지를 나눠볼게요.

#### 핵심 훅 이벤트

| 훅 종류 | 언제 실행? | 차단 가능? | 비유 |
|---------|-----------|-----------|------|
| **PreToolUse** | 도구 사용 **전** | O (exit 2) | 문 열기 전 센서 |
| **PostToolUse** | 도구 사용 **후** | X | 문 닫은 후 센서 |
| **Stop** | 대화 종료 시 | O (계속 진행) | 하교 벨 |
| **SessionStart** | 세션 시작/이어하기 | X | 등교 벨 |
| **SessionEnd** | 세션 종료 | X (타임아웃 설정 가능) | 하교 후 정리 |
| **UserPromptSubmit** | 프롬프트 제출 시 | O (수정 가능) | 제출 전 검토 |

#### 확장 훅 이벤트 (v2.1.63~2.1.70 추가)

| 훅 종류 | 언제 실행? | 비유 |
|---------|-----------|------|
| **SubagentStart** | 서브에이전트 시작 시 | 조수 출근 |
| **SubagentStop** | 서브에이전트 종료 시 | 조수 퇴근 |
| **InstructionsLoaded** | CLAUDE.md/rules 로드 시 | 교칙 게시 |
| **ConfigChange** | 설정 파일 변경 시 | 교실 설정 변경 |
| **TaskCompleted** | 태스크 완료 시 | 과제 제출 |
| **TeammateIdle** | 에이전트 팀원 유휴 시 | 팀원 대기 중 |
| **WorktreeCreate** | 워크트리 생성 시 | 새 교실 열기 |
| **WorktreeRemove** | 워크트리 삭제 시 | 교실 정리하기 |
| **PreCompact** | 컨텍스트 압축 전 | 노트 정리 전 |
| **Notification** | 알림 발생 시 | 알림 벨 |

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
\`\`\`

#### 전체 파이프라인에서 훅의 위치

클로드가 도구를 실행할 때, 내부적으로 **10단계 파이프라인**을 거칩니다.
훅은 이 중 **4단계(Pre)**와 **9단계(Post)**에서 실행돼요:

\`\`\`
도구 실행 파이프라인 (10단계)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 1. 도구 조회        "어떤 도구를 쓸까?"
 2. 중단 신호 확인    "사용자가 취소했나?"
 3. 입력값 검증       "파라미터가 올바른가?"
 4. ★ PreToolUse 훅  ← 여기서 차단/수정 가능!
 5. 권한 확인         "이 도구 써도 되나?"
 6. 실행             "도구 실제 실행!"
 7. 결과 변환         "결과를 정리"
 8. 크기 초과 처리    "너무 크면 잘라내기"
 9. ★ PostToolUse 훅 ← 여기서 로그/알림!
10. 텔레메트리 기록   "사용 기록 저장"

비유: 공항 보안 검색대
━━━━━━━━━━━━━━━━━━━
 1~3. 여권 확인 + 신분 조회
 4.   ★ 보안 검색 (PreToolUse) → 위험물이면 차단!
 5.   탑승권 확인
 6.   비행기 탑승
 7~8. 짐 찾기 + 세관
 9.   ★ 출구 검사 (PostToolUse) → 기록 남기기!
10.   입국 기록 저장
\`\`\`

> 안전한 도구(Read, Grep 등)는 최대 **10개까지 병렬 실행**됩니다. 위험한 도구(Bash, Write 등)는 하나씩 순차 실행돼요.

### v2.1.76~2.1.78 추가 훅 이벤트

| 이벤트 | 발동 시점 | 용도 |
|--------|----------|------|
| \`Elicitation\` | MCP 서버가 사용자 입력을 요청할 때 | 입력 요청을 가로채서 자동 응답 |
| \`ElicitationResult\` | 사용자가 입력을 완료한 후 | 응답을 수정/검증하고 서버에 전달하기 전 처리 |
| \`PostCompact\` | 컨텍스트 압축(compaction) 완료 후 | 압축 후 정리 작업, 로그 기록 |
| \`StopFailure\` | API 에러(429, 인증 실패 등)로 턴 종료 시 | 에러 알림, 자동 재시도 로직 (v2.1.78) |

### v2.1.85 훅 조건부 실행: \`if\` 필드

훅이 **언제 실행될지 조건을 지정**할 수 있게 되었습니다! 권한 규칙 문법(\`Bash(git *)\` 같은 패턴)으로 훅 실행 조건을 필터링하여, 불필요한 프로세스 실행을 줄여줍니다.

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "if": "Bash(git *)",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'git 명령어 감지!'"
          }
        ]
      }
    ]
  }
}
\`\`\`

\`\`\`
비유: 교실 센서에 조건 추가!

기존: 문이 열리면 무조건 반응 → 모든 Bash 명령에 훅 실행
이후: "3학년이 열 때만 반응" → git 명령일 때만 훅 실행

matcher: "Bash"           → Bash 도구면 일단 매칭
if: "Bash(git *)"         → 그중에서 git 명령일 때만 실제 실행
\`\`\`

**\`if\` vs \`matcher\` 차이:**
| 항목 | matcher | if |
|------|---------|-----|
| 문법 | 정규식 | 권한 규칙 문법 |
| 대상 | 도구 이름 | 도구 이름 + 파라미터 |
| 용도 | 1차 필터 (어떤 도구?) | 2차 필터 (어떤 조건?) |
| 성능 | 매칭 안 되면 스킵 | 매칭 후 조건 안 맞으면 프로세스 안 띄움 |

더 많은 \`if\` 패턴 예시:
\`\`\`
"if": "Bash(npm *)"          → npm 명령만
"if": "Write(src/**/*.ts)"   → src 폴더의 TS 파일 쓰기만
"if": "Edit(.env*)"          → .env 파일 수정만
"if": "Read(/etc/*)"         → /etc 하위 파일 읽기만
\`\`\`

### v2.1.85 PreToolUse에서 AskUserQuestion 자동 응답

PreToolUse 훅이 \`AskUserQuestion\` 도구를 **가로채서 자동 응답**할 수 있게 되었습니다. \`updatedInput\`과 \`permissionDecision: "allow"\`를 함께 반환하면 사용자 입력 없이 진행됩니다:

\`\`\`json
{
  "permissionDecision": "allow",
  "updatedInput": {
    "question": "API 키를 입력하세요",
    "answer": "자동으로 주입된 값"
  }
}
\`\`\`

\`\`\`
비유: 시험 문제를 선생님이 대신 답해주기

기존: AskUserQuestion → 사용자가 직접 답변 (키보드 입력 필요)
이후: PreToolUse 훅이 가로챔 → 자동으로 답변 주입 (headless 자동화!)
\`\`\`

> 이 기능은 **CI/CD 파이프라인**이나 **headless 환경**에서 사용자 입력이 필요한 MCP 도구를 자동화할 때 유용합니다.

### v2.1.89~2.1.92 훅 개선사항

| 개선 | 설명 | 버전 |
|------|------|------|
| **\`"defer"\` 권한 결정** | PreToolUse 훅이 \`"defer"\`를 반환하면 headless 세션이 도구 호출에서 **일시정지** → \`-p --resume\`으로 재개 시 훅이 재평가됩니다 | v2.1.89 |
| **\`PermissionDenied\` 이벤트** | auto 모드에서 권한 분류기가 도구를 거부한 후 발동 — \`{retry: true}\`를 반환하면 모델이 재시도 가능 | v2.1.89 |
| **훅 출력 50K 디스크 저장** | 50K자 초과 훅 출력은 컨텍스트에 직접 주입 대신 **디스크에 저장** (파일 경로 + 미리보기만 표시) | v2.1.89 |
| **\`if\` 복합 명령 수정** | \`if\` 조건이 복합 명령(\`ls && git push\`)이나 환경변수 접두사(\`FOO=bar git push\`)도 올바르게 매칭 | v2.1.89 |
| **Stop 훅 수정** | prompt 타입 Stop 훅에서 소형 모델이 \`ok:false\`를 반환할 때 잘못 실패하던 문제 수정, \`preventContinuation:true\` 동작 복원 | v2.1.92 |
| **PreToolUse exit 2 수정** | JSON stdout을 출력하고 exit 2로 종료하는 PreToolUse 훅이 도구를 올바르게 차단 | v2.1.90 |

\`\`\`
비유: 교실 센서 업그레이드!

"defer" = "잠깐 멈춰, 선생님(관리자) 확인 받고 진행하자"
PermissionDenied = "자동 센서가 거부했어 → 재시도 버튼 누를 수 있어"
50K 디스크 저장 = "센서 로그가 너무 길면 별도 노트에 적고 요약만 칠판에"
\`\`\`

### v2.1.83~2.1.84 추가 훅 이벤트

| 이벤트 | 발동 시점 | 용도 |
|--------|----------|------|
| \`CwdChanged\` | 작업 디렉토리가 변경될 때 | direnv 같은 환경 관리 자동 반응 (v2.1.83) |
| \`FileChanged\` | 파일이 변경될 때 | 파일 변경 감지 → 자동 빌드/린트 트리거 (v2.1.83) |
| \`TaskCreated\` | TaskCreate로 태스크 생성 시 | 태스크 생성 알림, 자동 할당 로직 (v2.1.84) |

\`\`\`
비유: 교실에 새로운 센서 추가!

CwdChanged   = 교실 이동 감지 → "다른 교실로 갔네, 그 교실 규칙 적용!"
FileChanged  = 칠판 변경 감지 → "칠판이 바뀌었으니 노트 업데이트!"
TaskCreated  = 새 과제 등록 → "새 숙제가 추가됐어, 알림 보내기!"
\`\`\`

#### WorktreeCreate 훅 HTTP 지원 (v2.1.84)

WorktreeCreate 훅에 \`type: "http"\`가 지원됩니다. 응답 JSON의 \`hookSpecificOutput.worktreePath\`로 생성된 워크트리 경로를 반환할 수 있어요:

\`\`\`json
{
  "hooks": {
    "WorktreeCreate": [
      {
        "hooks": [
          {
            "type": "http",
            "url": "http://localhost:3000/hooks/worktree-created"
          }
        ]
      }
    ]
  }
}
\`\`\`

#### \`StopFailure\` 훅 (v2.1.78)

기존 \`Stop\` 훅은 **정상 종료** 시에만 발동했는데, \`StopFailure\`는 **API 에러로 중단**되었을 때 발동합니다:

\`\`\`
비유: 하교 벨 vs 비상 벨

Stop        = 정상 하교 벨 → "오늘 수업 끝!"
StopFailure = 비상 벨     → "정전으로 수업 중단!" (rate limit, 인증 만료 등)
\`\`\`

\`\`\`json
{
  "hooks": {
    "StopFailure": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\\\\"API 에러 발생!\\\\\" with title \\\\\"Claude Code\\\\\"'"
          }
        ]
      }
    ]
  }
}
\`\`\`

### v2.1.77 보안 수정

**PreToolUse \`allow\` 반환이 \`deny\` 권한을 우회하던 버그가 수정**되었습니다.

\`\`\`
이전 (v2.1.76까지):
  PreToolUse 훅이 "allow" 반환 → deny 권한 규칙도 무시됨! (보안 취약점)
  예: .env 파일 쓰기를 deny로 막아놨는데, 훅이 allow하면 통과되버림

이후 (v2.1.77+):
  deny 권한 규칙은 훅의 allow보다 항상 우선! (올바른 동작)
  예: .env 파일 쓰기 deny → 훅이 뭘 반환하든 차단됨 ✓
\`\`\`

> 엔터프라이즈 관리 설정(managed settings)에서도 동일하게 수정되었으므로, 보안 정책이 훅에 의해 우회될 걱정이 없어요!

> **핵심 요약**: 클로드 코드에는 16가지 훅 이벤트가 있으며, 핵심 6개(PreToolUse, PostToolUse, Stop, SessionStart, SessionEnd, UserPromptSubmit)를 주로 사용합니다. PreToolUse만 \`exit 2\`로 도구 실행을 차단할 수 있습니다.`
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

#### 훅 타입: 4가지 (v2.1.70)

| 타입 | 설명 | 용도 |
|------|------|------|
| \`command\` | 셸 명령어/스크립트 실행 | 가장 기본적 |
| \`http\` | HTTP POST 요청 전송 | 서버 기반 검증 |
| \`prompt\` | LLM에게 프롬프트 평가 요청 | AI 기반 판단 |
| \`agent\` | 에이전틱 검증 (도구 사용 가능) | 복잡한 검증 |

**prompt 훅** 예시 -- AI가 코드 품질을 자동 판단:

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "방금 수정된 파일의 코드 품질을 검사하세요. 심각한 문제가 있으면 경고하세요."
          }
        ]
      }
    ]
  }
}
\`\`\`

**http 훅** 예시:

\`\`\`json
{
  "type": "http",
  "url": "http://localhost:3000/hooks/pre-write",
  "timeout": 5000
}
\`\`\`

#### matcher 패턴 예시

\`\`\`
"Write"     -> Write 도구만 감지
"Edit"      -> Edit 도구만 감지
"Write|Edit" -> Write 또는 Edit 감지
".*"        -> 모든 도구 감지
"Bash"      -> Bash(터미널) 도구만 감지
\`\`\`

#### 훅 입력: JSON stdin (v2.1.70)

훅 스크립트는 **JSON을 stdin으로** 받습니다. 환경변수 대신 \`jq\`로 파싱하는 방식이 권장됩니다:

\`\`\`bash
#!/bin/bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
\`\`\`

훅 입력에는 \`agent_id\`, \`agent_type\`, \`worktree\` 필드도 포함됩니다:

\`\`\`json
{
  "tool_name": "Write",
  "tool_input": { "file_path": "src/app.ts" },
  "agent_id": "abc123",
  "agent_type": "frontend-dev",
  "worktree": "/path/to/worktree"
}
\`\`\`

#### 스킬/에이전트 내 훅

스킬이나 서브에이전트의 프론트매터에서 **해당 컴포넌트가 활성화된 동안만** 동작하는 훅을 정의할 수 있습니다:

\`\`\`yaml
---
name: safe-editor
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./validate.sh"
---
\`\`\`

> 스킬/에이전트 훅은 컴포넌트가 비활성화되면 자동 정리됩니다.

#### SessionEnd 훅 타임아웃 설정 (v2.1.74)

기존에는 SessionEnd 훅이 **1.5초** 후 강제 종료되어, 로그 저장이나 API 호출 같은 작업이 중단될 수 있었습니다. 이제 환경변수로 타임아웃을 조절할 수 있어요!

\`\`\`bash
# 셸 프로필 (~/.zshrc 또는 ~/.bashrc)에 추가
export CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=10000  # 10초
\`\`\`

비유:
\`\`\`
기존: 하교 벨 울리면 1.5초 안에 정리 끝내야 함 → 급해서 물건 흘림!
이후: 선생님이 "10초까지 기다려줄게" → 여유롭게 정리 완료!
\`\`\`

활용 예시:
| 시나리오 | 타임아웃 | 하는 일 |
|----------|---------|--------|
| 세션 로그 저장 | 5초 | 대화 요약을 파일에 기록 |
| Slack 알림 | 8초 | "작업 완료" 메시지를 팀 채널에 전송 |
| Git 자동 커밋 | 10초 | 변경사항 스테이징 + 커밋 |
| 리소스 정리 | 15초 | 임시 파일 삭제, 컨테이너 정지 |

#### SessionStart 훅 중복 실행 수정 (v2.1.73)

\`--resume\`으로 세션을 이어할 때 SessionStart 훅이 **2번 실행**되던 버그가 수정되었습니다.

\`\`\`
이전: claude --resume abc123 → SessionStart 1번 + 또 1번 (버그!)
이후: claude --resume abc123 → SessionStart 정확히 1번 ✓
\`\`\`

> 세션 카운터, 초기화 작업 등에서 중복 실행 문제가 발생할 수 있었어요. 이제 안심하고 SessionStart 훅을 사용하세요!

#### Workspace Trust

훅은 **workspace trust** 컨텍스트에서 실행됩니다. 신뢰할 수 없는 프로젝트에서는 훅이 제한될 수 있어요.

> **핵심 요약**: 훅은 \`.claude/settings.json\`에서 설정하며, matcher(정규식)로 대상 도구를 지정합니다. 훅 타입은 command, http, prompt, agent 4가지이고, 입력은 JSON stdin으로 전달됩니다. 스킬/에이전트 프론트매터에서도 훅을 정의할 수 있습니다.`
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
\`\`\`

> **핵심 요약**: 훅 스크립트는 \`CLAUDE_TOOL_NAME\`(도구 이름), \`CLAUDE_TOOL_INPUT\`(입력 JSON), \`CLAUDE_TOOL_RESULT\`(결과, PostToolUse만) 환경변수를 자동으로 받습니다. 이를 활용해 로깅, 필터링, 조건부 처리가 가능합니다.`
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
        ".claude/settings.json 파일의 위치를 알았다",
        "HTTP 훅과 command 훅의 차이를 이해했다"
      ]
    },
    {
      id: "cross-reference",
      title: "더 알아보기",
      content: `## 관련 튜토리얼

| 튜토리얼 | 관련 내용 |
|----------|----------|
| **08-skills-commands** | 스킬/에이전트 프론트매터 내 훅 정의 |
| **09-worktree** | WorktreeCreate/Remove 훅과 워크트리 연동 |
| **19-permissions-deep** | 권한 설정과 훅의 관계 |
| **07-mcp-server** | MCP 서버와 훅 조합 활용 |`,
      checklist: []
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
