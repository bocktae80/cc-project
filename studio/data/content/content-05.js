window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["05-agent-teams"] = {
  overview: `## Agent Teams -- 팀으로 일하는 AI 에이전트

혼자 공부하면 자료 조사, 정리, 발표 준비를 **순서대로** 해야 합니다.
하지만 **모둠 활동**을 하면? 각자 역할을 나눠서 **동시에** 일할 수 있죠!

**Agent Teams**도 똑같습니다. 하나의 AI가 혼자 하는 대신, **여러 AI 에이전트가 팀을 이뤄서 동시에 작업**합니다.

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
3. 모든 팀원은 **이름(name)**으로 서로를 부릅니다 (UUID 아님!)`
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

이렇게 하면 **태스크 1이 완료되어야** 태스크 2를 시작할 수 있습니다.`
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
\`\`\``
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
