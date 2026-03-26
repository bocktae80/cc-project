window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["05-agent-teams"] = {
  overview: `## Agent Teams — AI 에이전트 팀으로 협업하기

혼자 공부하면 자료 조사, 정리, 발표 준비를 **순서대로** 해야 합니다. 하지만 **모둠 활동**을 하면? 각자 역할을 나눠서 **동시에** 일할 수 있죠!

### 이런 상황에서 유용해요
- **대규모 프로젝트**: "프론트엔드, 백엔드, 테스트를 동시에 진행하고 싶어" — 각 역할별 에이전트가 병렬로 작업
- **역할 분담**: "코드 작성은 Sonnet, 아키텍처 검토는 Opus로 나누고 싶어" — 에이전트별 모델 지정
- **독립된 작업 환경**: "여러 에이전트가 같은 파일을 수정하면 충돌나지 않아?" — 워크트리 격리로 안전하게

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | 팀 구조, 태스크 관리, 메시지 시스템 이해 | 💡 개념 |
| 2 | 환경 설정, 팀 생성, 태스크 관리 실습 | 🔧 실습 |
| 3 | Todo 웹앱 팀 프로젝트 & 서브에이전트 비교 | 💻 예제 |

**Agent Teams**는 하나의 AI가 혼자 하는 대신, **여러 AI 에이전트가 팀을 이뤄서 동시에 작업**합니다.

\`\`\`
혼자 공부                       모둠 활동
-----------                    -----------
나 -> 자료조사                  팀장 -> 작업 분배
나 -> 정리                        +-- 조원A -> 자료조사
나 -> 발표준비                    +-- 조원B -> 정리
(하나씩 순서대로...)               +-- 조원C -> 발표준비
                                 (동시에 진행!)
\`\`\`

### 핵심 포인트

- **TeamCreate**: 팀을 만들고 에이전트를 모집합니다
- **TaskCreate/TaskUpdate**: 할 일을 만들고 진행 상태를 관리합니다
- **SendMessage**: 에이전트끼리 메시지를 주고받습니다

### v2.1.63 새 기능

| 기능 | 설명 |
|------|------|
| **워크트리 격리** | 에이전트가 독립된 git worktree에서 작업 (충돌 방지) |
| **백그라운드 실행** | 에이전트를 백그라운드에서 실행하고 나중에 결과 확인 |
| **\`claude agents\` CLI** | 터미널에서 활성 에이전트 목록을 확인하는 CLI 명령 |
| **Ctrl+F** | 에이전트를 빠르게 종료하는 키바인딩 |
| **Shift+Down** | 에이전트 사이를 탐색하는 네비게이션 |

### v2.1.77 변경사항

| 변경 | 설명 |
|------|------|
| **\`resume\` 파라미터 제거** | Agent 도구에서 \`resume\` 파라미터가 제거됨. 대신 \`SendMessage({to: agentId})\`를 사용 |
| **SendMessage 자동 재개** | 중지된 에이전트에 SendMessage를 보내면 **자동으로 백그라운드에서 재개** (에러 대신) |
| **배경 에이전트 킬 시 결과 보존** | 배경 에이전트를 킬해도 **부분 결과가 대화 컨텍스트에 보존** |

### v2.1.83 변경사항

| 변경 | 설명 |
|------|------|
| **\`initialPrompt\` 프론트매터** | 에이전트가 \`initialPrompt\`를 선언하면 **첫 턴을 자동 제출** — 사용자 입력 없이 바로 작업 시작! |
| **에이전트 중단 키 변경** | 모든 백그라운드 에이전트 중단: \`Ctrl+F\` → **\`Ctrl+X Ctrl+K\`**로 변경 (readline 충돌 방지) |

#### \`initialPrompt\` 예시

\`\`\`yaml
# .claude/agents/auto-reviewer.md
---
name: auto-reviewer
initialPrompt: "현재 브랜치의 변경사항을 리뷰하고 피드백을 작성해줘"
---
코드 리뷰 전문 에이전트입니다.
\`\`\`

> **비유**: 조원에게 "출근하면 바로 이거 해줘"라고 미리 메모를 붙여놓는 것과 같아요! 에이전트가 시작되자마자 자동으로 작업을 시작합니다.

> 주의: Agent Teams는 아직 실험 기능이며, 토큰 사용량이 많습니다. 작은 작업부터 시작하세요!`,

  concepts: [
    {
      id: "team-structure",
      title: "팀 구조와 역할",
      content: `### 팀 구조와 역할

모둠 활동을 할 때 **반장(팀 리더)**이 있고, **조원(팀원)**이 있듯이,
Agent Teams에도 비슷한 구조가 있습니다.

\`\`\`
모둠 활동                    Agent Teams
---------                   -----------
반장 (리더)           ->     팀 리더 에이전트
조원 A, B, C          ->     팀원 에이전트들
모둠 이름             ->     팀 이름 (team_name)
역할 분담표           ->     태스크 리스트
쪽지 전달             ->     SendMessage
\`\`\`

#### TeamCreate로 팀 만들기

\`\`\`json
{
  "team_name": "my-project",
  "description": "Todo 앱 만들기 프로젝트"
}
\`\`\`

팀을 만들면 자동으로 생성되는 것들:
- **팀 설정 파일**: \`~/.claude/teams/my-project/config.json\`
- **태스크 디렉토리**: \`~/.claude/tasks/my-project/\`

#### 핵심 규칙

1. **팀 리더**가 작업을 분배하고 전체를 조율합니다
2. **팀원**은 맡은 태스크를 수행하고 완료하면 보고합니다
3. 모든 팀원은 **이름(name)**으로 서로를 부릅니다 (UUID 아님!)

#### 에이전트별 모델 지정 (v2.1.72+)

에이전트마다 **다른 모델**을 사용할 수 있습니다. 빠른 작업은 Sonnet, 복잡한 작업은 Opus로!

\`\`\`json
Agent({
  "name": "quick-scanner",
  "model": "sonnet",
  "prompt": "파일 목록을 정리해줘"
})

Agent({
  "name": "deep-analyzer",
  "model": "opus",
  "prompt": "아키텍처를 분석하고 개선안을 제안해줘"
})
\`\`\`

> **비유**: 간단한 숙제는 동생한테 시키고, 어려운 문제는 형한테 부탁하는 것과 같아요!

#### 풀 모델 ID 지원 (v2.1.74)

v2.1.74부터 에이전트의 \`model:\` 필드에 **풀 모델 ID**를 사용할 수 있습니다! 이전에는 단축 이름(\`opus\`, \`sonnet\`, \`haiku\`)만 동작했고, \`claude-opus-4-5\` 같은 전체 ID는 무시됐어요.

\`\`\`
이전 (단축 이름만):
  model: "opus"              ← OK
  model: "claude-opus-4-5"   ← 무시됨! (버그)

이후 (둘 다 OK):
  model: "opus"              ← OK (기본 Opus 사용)
  model: "claude-opus-4-6"   ← OK! (특정 버전 고정)
  model: "claude-haiku-4-5-20251001"  ← OK! (날짜까지 고정)
\`\`\`

\`--agents\` JSON 설정에서도 동일하게 사용 가능합니다:

\`\`\`bash
claude --agents '[{"name": "lint", "model": "claude-haiku-4-5-20251001", "prompt": "린트 체크"}]'
\`\`\`

#### 활용: 비용 효율적 팀 구성

\`\`\`
팀 리더 (opus)       ── 전체 계획, 최종 검토   💰💰💰
  ├── 코드 작성 (sonnet)  ── 실제 구현          💰💰
  ├── 테스트 작성 (sonnet) ── 테스트 코드        💰💰
  └── 린트 체크 (haiku)   ── 스타일 검사        💰 ← 비용 1/10!
\`\`\`

> **비유**: 시험 채점은 선생님(Opus)이, 출석 체크는 반장(Haiku)이 하는 것처럼 — 작업 난이도에 맞게 모델을 골라 비용을 절약할 수 있어요!

#### 워크트리 격리 모드 (v2.1.63)

에이전트를 별도의 git worktree에서 실행하면, 각자 독립된 코드 복사본에서 작업합니다.
서로의 코드 변경이 충돌하지 않아요!

\`\`\`json
Agent({
  "name": "frontend-dev",
  "isolation": "worktree",
  "prompt": "Button 컴포넌트를 만들어줘"
})
\`\`\`

#### 백그라운드 에이전트 (v2.1.63)

에이전트를 백그라운드에서 실행하고, 다른 작업을 하면서 결과를 나중에 확인할 수 있습니다:

\`\`\`json
Agent({
  "name": "researcher",
  "run_in_background": true,
  "prompt": "프로젝트 구조를 분석해줘"
})
\`\`\`

#### 에이전트 재개 방식 변경 (v2.1.77)

이전에는 Agent 도구의 \`resume\` 파라미터로 에이전트를 재개했지만, 이제는 \`SendMessage\`를 사용합니다:

\`\`\`
이전 (v2.1.76까지):
  Agent({ resume: "agent-id-123", prompt: "계속해줘" })  ← 더 이상 안 됨!

이후 (v2.1.77+):
  SendMessage({ to: "agent-id-123", content: "계속해줘" })  ← 새 방식!
\`\`\`

> **중요**: 중지된 에이전트에 SendMessage를 보내면 자동으로 백그라운드에서 재개됩니다. 에러가 나지 않아요!
> 배경 에이전트를 킬해도 부분 결과가 대화 컨텍스트에 보존되므로, 작업 내용이 사라지지 않습니다.

#### \`claude agents\` CLI

터미널에서 현재 활성화된 에이전트 목록을 확인할 수 있습니다:

\`\`\`bash
claude agents
# 활성 에이전트 목록과 상태가 표시됩니다
\`\`\`

> **핵심 요약**: Agent Teams는 팀 리더와 팀원으로 구성되며, TeamCreate로 팀을 만들고 에이전트별로 다른 모델을 지정할 수 있습니다. 워크트리 격리로 충돌 없이 병렬 작업이 가능하고, \`claude agents\` CLI로 활성 에이전트를 관리합니다.`
    },
    {
      id: "task-management",
      title: "태스크 관리 (할 일 관리)",
      content: `### 태스크 관리

학교에서 **조별 과제 체크리스트**를 만들어본 적 있나요?

\`\`\`
[ ] 주제 정하기          -- 미정 (pending)
[>] 자료 조사하기        -- 진행중 (in_progress)
[v] 발표자료 만들기      -- 완료 (completed)
\`\`\`

Agent Teams의 태스크도 정확히 이런 방식입니다!

#### TaskCreate -- 할 일 만들기

\`\`\`json
{
  "subject": "메인 페이지 만들기",
  "description": "index.html 파일을 생성하고 기본 구조 작성",
  "activeForm": "메인 페이지 만드는 중"
}
\`\`\`

#### TaskUpdate -- 상태 바꾸기

\`\`\`json
{
  "taskId": "1",
  "status": "in_progress",
  "owner": "frontend-dev"
}
\`\`\`

#### 태스크 의존성 (순서 정하기)

"자료 조사"가 끝나야 "보고서 작성"을 시작할 수 있듯이, 태스크에도 순서를 정할 수 있습니다:

\`\`\`json
{
  "taskId": "2",
  "addBlockedBy": ["1"]
}
\`\`\`

이렇게 하면 **태스크 1이 완료되어야** 태스크 2를 시작할 수 있습니다.

> **핵심 요약**: 태스크는 pending → in_progress → completed 순서로 진행됩니다. TaskCreate로 할 일을 만들고, TaskUpdate로 상태와 담당자를 변경하며, addBlockedBy로 태스크 간 의존성(순서)을 설정할 수 있습니다.`
    },
    {
      id: "messaging",
      title: "메시지 주고받기",
      content: `### 메시지 주고받기 (SendMessage)

모둠 활동 중에 조원에게 **쪽지**를 보내야 할 때가 있죠?
"야, 나 자료 다 찾았어. 너 정리 시작해!" 같은 메시지요.

Agent Teams에서도 에이전트끼리 메시지를 주고받습니다.

#### 1:1 메시지 (DM)

\`\`\`json
{
  "type": "message",
  "recipient": "backend-dev",
  "content": "API 개발 완료했어요. 프론트엔드 연결 시작해주세요!",
  "summary": "API 개발 완료 알림"
}
\`\`\`

#### 전체 공지 (broadcast)

\`\`\`json
{
  "type": "broadcast",
  "content": "긴급! 데이터베이스 구조가 변경됐습니다. 모두 최신 스키마를 확인하세요.",
  "summary": "DB 스키마 변경 공지"
}
\`\`\`

> broadcast는 모든 팀원에게 동시에 보내는 거라 비용이 많이 듭니다.
> 꼭 필요할 때만 사용하세요!

#### 종료 요청 (shutdown_request)

작업이 끝나면 팀원에게 퇴근(종료)을 요청합니다:

\`\`\`json
{
  "type": "shutdown_request",
  "recipient": "backend-dev",
  "content": "모든 작업 완료! 수고했어요."
}
\`\`\`

> **핵심 요약**: SendMessage로 에이전트 간 소통합니다. 1:1 메시지(message), 전체 공지(broadcast), 종료 요청(shutdown_request) 3가지 타입이 있으며, broadcast는 비용이 많으므로 긴급할 때만 사용합니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "환경 설정하기",
      content: `### 1단계: Agent Teams 활성화하기

Agent Teams는 아직 **실험 기능**이기 때문에, 먼저 활성화해야 합니다.
쉘 설정 파일에 환경변수를 추가하는 간단한 작업이에요.

> 비유: 게임에서 "고급 모드"를 활성화하는 것과 같아요!`,
      terminals: [
        {
          command: "echo 'export CLAUDE_AGENT_TEAMS=1' >> ~/.zshrc",
          output: "# (아무 출력 없음 -- 정상입니다)"
        },
        {
          command: "source ~/.zshrc",
          output: "# 설정 파일 다시 로드"
        },
        {
          command: "echo $CLAUDE_AGENT_TEAMS",
          output: "1\n# 1이 나오면 성공!"
        }
      ]
    },
    {
      id: "step-02",
      title: "첫 번째 팀 만들기",
      content: `### 2단계: 팀 생성과 삭제

클로드에게 팀을 만들어달라고 요청하면, 내부적으로 **TeamCreate** 도구가 실행됩니다.

가장 간단한 팀을 만들어보겠습니다.

#### 팀 만들기

클로드에게 이렇게 말하면 됩니다:

\`\`\`
"study-group이라는 팀을 만들어줘. 설명은 '첫 번째 연습용 팀'으로."
\`\`\`

클로드가 내부적으로 실행하는 것:

\`\`\`json
TeamCreate({
  "team_name": "study-group",
  "description": "첫 번째 연습용 팀"
})
\`\`\`

#### 팀 정보 확인

팀이 만들어지면 아래 경로에 파일이 생깁니다:

\`\`\`
~/.claude/teams/study-group/config.json  -- 팀 설정
~/.claude/tasks/study-group/             -- 태스크 저장소
\`\`\`

#### 팀 삭제

연습이 끝나면 반드시 정리하세요!

\`\`\`
"study-group 팀을 삭제해줘"
\`\`\`

> 중요: 팀을 삭제하기 전에 모든 팀원을 먼저 종료(shutdown)해야 합니다!`,
      terminals: [
        {
          command: "ls ~/.claude/teams/study-group/",
          output: "config.json"
        },
        {
          command: "cat ~/.claude/teams/study-group/config.json",
          output: "{\n  \"name\": \"study-group\",\n  \"description\": \"첫 번째 연습용 팀\",\n  \"members\": []\n}"
        },
        {
          command: "ls ~/.claude/tasks/study-group/",
          output: "# (아직 태스크가 없으므로 비어있음)"
        }
      ]
    },
    {
      id: "step-03",
      title: "태스크 만들고 관리하기",
      content: `### 3단계: 태스크 관리 실습

팀을 만들었으니, 이제 **할 일(태스크)**을 만들어봅시다.
조별 과제의 체크리스트를 만드는 것과 같아요!

#### 태스크 만들기

\`\`\`
"할 일 추가해줘: 'HTML 기본 구조 만들기' -- index.html 생성하고 기본 태그 작성"
\`\`\`

내부적으로 실행되는 것:

\`\`\`json
TaskCreate({
  "subject": "HTML 기본 구조 만들기",
  "description": "index.html 생성하고 기본 태그 작성",
  "activeForm": "HTML 기본 구조 만드는 중"
})
\`\`\`

#### 태스크 상태 변경

\`\`\`json
TaskUpdate({ "taskId": "1", "status": "in_progress" })
// 작업 시작!

TaskUpdate({ "taskId": "1", "status": "completed" })
// 작업 완료!
\`\`\`

#### 태스크 목록 확인

\`\`\`
"현재 태스크 목록 보여줘"
\`\`\`

결과:
\`\`\`
id | subject              | status      | owner
---+----------------------+-------------+--------
1  | HTML 기본 구조 만들기  | completed   | frontend
2  | CSS 스타일 작성       | in_progress | designer
3  | JS 기능 구현          | pending     | -
\`\`\``,
      terminals: [
        {
          command: "# 클로드에게 태스크 생성 요청",
          output: "TaskCreate 실행 -> 태스크 #1 생성됨\nsubject: HTML 기본 구조 만들기\nstatus: pending"
        },
        {
          command: "# 클로드에게 태스크 상태 변경 요청",
          output: "TaskUpdate 실행 -> 태스크 #1\nstatus: pending -> in_progress\nowner: frontend-dev"
        },
        {
          command: "# 태스크 목록 확인",
          output: "TaskList 결과:\n  #1 [완료] HTML 기본 구조 만들기 (frontend-dev)\n  #2 [진행] CSS 스타일 작성 (designer)\n  #3 [대기] JS 기능 구현 (미배정)"
        }
      ]
    }
  ],

  examples: [
    {
      id: "todo-webapp",
      title: "실전: Todo 웹앱 팀 프로젝트",
      content: `### Todo 웹앱을 팀으로 만들기

4명의 에이전트가 협력해서 Todo 웹앱을 만드는 시나리오입니다.

#### 팀 구성

| 에이전트 | 역할 | 담당 |
|----------|------|------|
| team-lead | 팀장 | 전체 조율, 태스크 배분 |
| frontend-dev | 프론트엔드 | HTML/CSS/JS |
| backend-dev | 백엔드 | API, 데이터 처리 |
| tester | 테스터 | 기능 검증 |

#### 워크플로우

\`\`\`
1. team-lead가 팀 생성 (TeamCreate)
2. 태스크 4개 생성 (TaskCreate)
3. 각 에이전트에게 태스크 배정 (TaskUpdate)
4. 에이전트들이 동시에 작업 수행
5. 완료되면 메시지로 보고 (SendMessage)
6. team-lead가 확인 후 다음 태스크 배정
7. 모든 작업 완료 후 팀 종료 (shutdown_request + TeamDelete)
\`\`\`

#### 핵심 명령어 예시

\`\`\`json
// 1. 팀 만들기
TeamCreate({ "team_name": "todo-app" })

// 2. 태스크 만들기
TaskCreate({ "subject": "HTML 구조 만들기" })
TaskCreate({ "subject": "CSS 스타일링" })
TaskCreate({ "subject": "JS 로직 구현" })
TaskCreate({ "subject": "테스트 실행" })

// 3. 태스크 배정
TaskUpdate({ "taskId": "1", "owner": "frontend-dev" })

// 4. 작업 완료 보고
SendMessage({
  "type": "message",
  "recipient": "team-lead",
  "content": "HTML 구조 완성했습니다!",
  "summary": "HTML 작업 완료"
})
\`\`\``,
      checklist: [
        "팀 생성(TeamCreate) 방법을 이해했다",
        "태스크 생성(TaskCreate)과 배정(TaskUpdate) 흐름을 이해했다",
        "에이전트 간 메시지(SendMessage) 사용법을 알았다",
        "작업 완료 후 팀 정리(shutdown + TeamDelete) 순서를 알았다"
      ]
    },
    {
      id: "subagent-vs-team",
      title: "서브에이전트 vs Agent Teams 비교",
      content: `### 언제 뭘 써야 할까?

| 구분 | 서브에이전트 (Task 도구) | Agent Teams |
|------|------------------------|-------------|
| 비유 | 심부름 시키기 | 모둠 활동 |
| 구조 | 1:1 (나 -> 심부름꾼) | 1:N (팀장 -> 여러 팀원) |
| 동시성 | 순차 처리 | 병렬 처리 가능 |
| 적합한 작업 | 단순한 하위 작업 | 복잡한 멀티스텝 프로젝트 |
| 비용 | 적음 | 많음 (에이전트 수만큼) |

#### 선택 가이드

\`\`\`
작업이 간단한가?
  예 -> 서브에이전트 사용
  아니오 -> 계속

여러 작업을 동시에 해야 하는가?
  예 -> Agent Teams 사용
  아니오 -> 서브에이전트 사용

팀원 간 소통이 필요한가?
  예 -> Agent Teams 사용
  아니오 -> 서브에이전트 사용
\`\`\``,
      checklist: [
        "서브에이전트와 Agent Teams의 차이를 설명할 수 있다",
        "상황에 따라 어떤 방식을 선택할지 판단할 수 있다"
      ]
    },
    {
      id: "cross-reference",
      title: "더 알아보기",
      content: `## 관련 튜토리얼

| 튜토리얼 | 관련 내용 |
|----------|----------|
| **09-worktree** | 워크트리 격리 모드 심화 학습 |
| **16-background-agents** | 백그라운드 에이전트 활용법 |
| **18-agent-sdk** | Agent SDK로 커스텀 에이전트 빌드하기 |
| **10-cli-master** | \`claude agents\` CLI 명령 상세 |`,
      checklist: []
    }
  ],

  quiz: [
    {
      question: "Agent Teams의 핵심 비유로 가장 적절한 것은?",
      options: [
        "혼자 공부 vs 모둠 활동",
        "시험 vs 숙제",
        "교과서 vs 노트"
      ],
      answer: 0,
      explanation: "Agent Teams는 여러 AI 에이전트가 팀을 이뤄 동시에 작업하는 것입니다. 혼자 순서대로 하는 것(단일 에이전트)과 역할을 나눠 동시에 하는 것(모둠 활동)의 차이와 같습니다."
    },
    {
      question: "팀을 만드는 데 사용하는 도구는?",
      options: [
        "TaskCreate",
        "TeamCreate",
        "SendMessage",
        "TeamBuild"
      ],
      answer: 1,
      explanation: "TeamCreate는 새로운 팀을 생성하는 도구입니다. team_name과 description을 지정하면 팀 설정 파일과 태스크 디렉토리가 자동으로 만들어집니다."
    },
    {
      question: "태스크의 상태(status) 순서로 올바른 것은?",
      options: [
        "in_progress -> pending -> completed",
        "pending -> in_progress -> completed",
        "completed -> in_progress -> pending"
      ],
      answer: 1,
      explanation: "태스크는 pending(대기) -> in_progress(진행 중) -> completed(완료) 순서로 진행됩니다. 처음 만들면 pending 상태이고, 작업을 시작하면 in_progress, 끝나면 completed로 바꿉니다."
    },
    {
      question: "팀의 모든 멤버에게 동시에 메시지를 보내는 방법은?",
      options: [
        "type: \"message\"로 한 명씩 보내기",
        "type: \"broadcast\"로 전체 공지하기",
        "type: \"all\"로 전송하기"
      ],
      answer: 1,
      explanation: "broadcast는 모든 팀원에게 동시에 메시지를 보냅니다. 다만 비용이 많이 들기 때문에 긴급한 상황에서만 사용하는 것이 좋습니다."
    },
    {
      question: "Agent Teams 사용이 끝난 후 반드시 해야 하는 것은?",
      options: [
        "에이전트를 더 추가한다",
        "태스크를 더 만든다",
        "팀원 종료(shutdown) 후 팀 삭제(TeamDelete)를 한다"
      ],
      answer: 2,
      explanation: "사용이 끝나면 먼저 모든 팀원에게 shutdown_request를 보내고, 팀원이 모두 종료된 후 TeamDelete로 팀을 삭제해야 합니다. 안 그러면 다음 세션에서 이전 팀 데이터가 남아있을 수 있습니다."
    }
  ]
};
