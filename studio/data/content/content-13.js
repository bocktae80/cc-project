window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["13-teleport"] = {
  overview: `## 텔레포트 — 세션을 자유롭게 이동하기

게임에서 **포탈**을 열면 다른 장소로 순간이동하잖아요?
클로드 코드에서도 똑같이 할 수 있어요! 터미널에서 작업하다가 포탈을 열면 웹브라우저에서 이어하고,
또 다른 포탈을 열면 다시 터미널로 돌아올 수 있어요.

### 기존 방식 vs 텔레포트

\`\`\`
터미널에서만 작업 (기존)              어디서든 이동 (텔레포트)
─────────────────────              ─────────────────────────
터미널에서 시작                      터미널에서 시작
   → 여기서만 가능                     → & prefix로 클라우드에 보내기
   → 터미널 닫으면 끝                  → /teleport로 웹에서 가져오기
                                      → /rc로 다른 기기에서 조종
                                      → 어디서든 이어서 작업!
\`\`\`

### 핵심 기능 3가지

| 기능 | 설명 | 비유 |
|------|------|------|
| \`&\` prefix | 작업을 클라우드에서 실행 | 포탈로 보내기 |
| \`/teleport\` | 웹 세션을 터미널로 가져오기 | 포탈로 불러오기 |
| \`/rc\` | 같은 세션에 원격으로 접속 | 원격 리모컨 |`,

  concepts: [
    {
      id: "what-is-teleport",
      title: "텔레포트란? (순간이동 포탈 비유)",
      content: `### 게임 포탈과 같은 세션 이동

게임에서 포탈을 열면 다른 장소로 순간이동하잖아요? 클로드 코드의 텔레포트도 마찬가지예요.

\`\`\`
게임 세계 (기존)                     포탈 세계 (텔레포트)
─────────────                       ─────────────
[성 안에서 작업]                      [성 안에서 작업]
     |                                    |
     | 처음부터 걸어가야 함                    | 포탈 열기!
     v                                    v
[길게 걸어가기...]                     [마을로 순간이동!]
     v                                    |
[마을 도착]                              | 또 다른 포탈!
                                         v
                                    [동굴로 순간이동!]
\`\`\`

#### 세 가지 이동 방법

\`\`\`
1. & prefix               2. /teleport              3. /rc
[보내기]                   [가져오기]                 [리모컨]

Terminal → Cloud           Cloud → Terminal          Terminal ← 원격
작업을 클라우드로           웹 세션을 터미널로          같은 세션에
보내고 터미널 자유          가져와서 로컬 작업          다른 기기로 접속
\`\`\`

#### 비교 표

| 기능 | 방향 | 비유 | 세션 위치 변경 |
|------|------|------|--------------|
| \`&\` prefix | 터미널 → 클라우드 | 포탈로 보내기 | 클라우드로 이동 |
| \`/teleport\` | 클라우드 → 터미널 | 포탈로 불러오기 | 로컬로 이동 |
| \`/rc\` | 원격 → 로컬 (접속) | 리모컨 | 이동 없음 (원격 접속) |`
    },
    {
      id: "teleport-vs-rc",
      title: "텔레포트 vs 리모트 컨트롤",
      content: `### 이사 vs TV 리모컨 — 핵심 차이

\`\`\`
Teleport = 이사                    Remote Control = TV 리모컨
─────────────                      ─────────────────────
[서울에서 살다가]                     [거실에 TV가 있고]
     |                                    |
     | 짐을 싸서 이동                        | 리모컨을 들고 안방으로
     v                                    v
[부산에서 생활]                       [안방에서 TV 조종]

→ 나(세션)가 이동                     → TV(세션)는 그대로
→ 서울에는 더 이상 없음                → 다른 곳에서 조종만
\`\`\`

#### 비교표

| 비교 항목 | \`/teleport\` | \`/rc\` |
|-----------|------------|-------|
| 비유 | 이사 (세션이 이동) | TV 리모컨 (원격 조종) |
| 세션 위치 | **변경됨** (웹 → 터미널) | **변경 없음** (원래 위치 유지) |
| 방향 | 웹 → 터미널 | 터미널 ← 원격 접속 |
| 동시 접속 | 불가 | 가능 (여러 기기) |
| 사용 상황 | 설계→구현 전환 | 이동 중 확인, 팀 공유 |

#### 선택 가이드

\`\`\`
세션을 다른 환경으로 완전히 옮기고 싶다?
├── 예 → /teleport
└── 아니요
    ├── 다른 기기에서 확인/조종 → /rc
    └── 작업을 클라우드에서 실행 → & prefix
\`\`\``
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "& prefix로 클라우드에 보내기",
      content: `### 포탈로 작업 보내기

프롬프트 앞에 \`&\`를 붙이면, 작업이 **클라우드에서 실행**됩니다.
마치 포탈에 아이템을 넣으면 다른 장소로 보내지는 것처럼!

#### 사용법

\`\`\`
& <프롬프트 내용>
\`\`\`

맨 앞에 \`&\`와 공백 하나를 붙이면 됩니다. 끝!

#### 활용 예시

| 작업 | 명령 예시 |
|------|----------|
| 코드 분석 | \`& 이 프로젝트의 아키텍처를 분석해줘\` |
| 리팩토링 | \`& src/ 폴더의 any 타입을 제거해줘\` |
| 문서 작성 | \`& API 문서를 작성해줘\` |
| 테스트 생성 | \`& 모든 유틸 함수 테스트를 작성해줘\` |`,
      terminals: [
        {
          command: "# & prefix로 작업을 클라우드에 보내기",
          output: `> & 이 프로젝트의 README.md 파일들을 모두 읽고 개선점을 정리해줘

Sending task to cloud...

Task sent successfully!
Session ID: ses_abc123def456

View progress at: https://claude.ai/chat/ses_abc123def456
Or run /teleport to bring it back when done.

>
(터미널 즉시 사용 가능! 다른 작업 진행 가능)`
        },
        {
          command: "# 완료 후 결과 가져오기",
          output: `> /tp

Fetching cloud sessions...

Available sessions:
  1. [ses_abc123] "README 개선점 분석" (완료)
  2. [ses_def456] "리팩토링 작업" (진행 중)

Select a session (1-2): 1

Teleporting session ses_abc123...
Session transferred to local terminal.

(분석 결과가 터미널에 표시됨)`
        }
      ]
    },
    {
      id: "step-02",
      title: "/teleport로 웹에서 터미널로 가져오기",
      content: `### 포탈로 세션 불러오기

claude.ai 웹에서 대화하던 세션을 **로컬 터미널로 가져오는** 명령어입니다.

#### 왜 필요한가?

| 기능 | 웹 (claude.ai) | 터미널 (Claude Code) |
|------|:--------------:|:-------------------:|
| 대화, 질문 | O | O |
| 코드 설계 논의 | O | O |
| 로컬 파일 읽기/쓰기 | X | **O** |
| git commit/push | X | **O** |
| 테스트 실행 | X | **O** |

웹은 **대화와 설계**에, 터미널은 **실행과 구현**에 좋아요.
\`/teleport\`는 이 두 세계를 **연결하는 다리**!`,
      terminals: [
        {
          command: "# 웹 세션을 터미널로 텔레포트",
          output: `> /teleport

Fetching cloud sessions...

Available sessions:
  1. [ses_abc123] "API 설계 논의" (3분 전)
  2. [ses_def456] "리팩토링 결과" (1시간 전, completed)

Select a session (1-2): 1

Teleporting session ses_abc123...
Session transferred to local terminal.

Session is now local. You have full access to:
- Local file system
- Git operations
- Terminal commands

>`
        },
        {
          command: "# 텔레포트 후 로컬 작업 시작",
          output: `> 방금 논의한 API 설계대로 src/routes/users.ts를 만들어줘

Claude: 네, 앞서 논의한 설계를 바탕으로 파일을 생성합니다.

[파일 생성: src/routes/users.ts]
[파일 생성: src/routes/users.test.ts]

생성 완료! 테스트도 함께 만들었습니다.`
        }
      ]
    },
    {
      id: "step-03",
      title: "세션 공유 + /rc 리모트 컨트롤",
      content: `### 원격 리모컨으로 세션 조종

\`/rc\`는 로컬 세션에 **다른 기기에서 원격 접속**하는 기능입니다.
TV 리모컨처럼 세션(TV)은 원래 자리에 있고, 리모컨(다른 기기)으로 조종!

#### 보안 주의사항

세션을 공유할 때 주의할 점:
- API 키, 토큰, 비밀번호가 세션에 노출되지 않았는지 확인
- .env 파일 내용을 읽지 않았는지 확인
- 신뢰할 수 있는 사람에게만 공유`,
      terminals: [
        {
          command: "# /rc로 리모트 컨트롤 활성화",
          output: `> /rc

Remote Control enabled!

Session ID: ses_abc123def456
Share URL:  https://claude.ai/rc/ses_abc123def456

Anyone with this URL can:
- View the session in real-time
- Send messages to the session

Share this URL with teammates to collaborate.`
        },
        {
          command: "# 다른 기기에서 원격 접속",
          output: `(태블릿 브라우저에서 URL 접속)

Remote Control: ses_abc123def456
Connected to: kent's terminal session
─────────────────────────────────────

사용자: src/utils.ts를 리팩토링해줘
Claude: 네, 리팩토링을 시작합니다...
        [파일 수정 중...]

[메시지 입력: "날짜 함수만 따로 date-utils.ts로 분리해줘"]  [Send]

(데스크탑 터미널에 반영됨)`
        }
      ]
    }
  ],

  examples: [
    {
      id: "background-task",
      title: "& prefix 실전 실습",
      content: `### 백그라운드 작업 관리

시간이 오래 걸리는 작업을 클라우드에 맡기고, 터미널에서는 다른 일을 하는 실전 시나리오입니다.

#### 시나리오: 대규모 리팩토링

\`\`\`bash
# 1. 리팩토링 작업을 클라우드에 전송
> & 이 프로젝트의 모든 TypeScript 파일에서
    any 타입을 unknown으로, 누락된 반환 타입을 추가해줘

Sending task to cloud...
Task sent! Session ID: ses_xyz789

# 2. 터미널에서 다른 작업 진행
> git log --oneline -5
> 오늘 할 일을 정리해줘

# 3. 30분 후 결과 가져오기
> /tp
# ses_xyz789 선택 → 결과 확인!
\`\`\`

#### 여러 작업 동시 전송

\`\`\`bash
> & API 문서를 생성해줘
> & 테스트 커버리지를 분석해줘
> & 사용하지 않는 의존성을 찾아줘

# 3개 작업이 동시에 클라우드에서 실행!
\`\`\`

> **팁**: 시간이 5분 이상 걸리는 작업은 \`&\` prefix가 효율적이에요.
> 터미널을 닫아도 작업이 계속 진행됩니다!`,
      checklist: [
        "& prefix로 작업을 클라우드에 보낼 수 있다",
        "클라우드 작업의 진행 상황을 웹에서 확인할 수 있다",
        "/teleport로 완료된 작업을 가져올 수 있다",
        "여러 작업을 동시에 클라우드에 보내는 법을 안다"
      ]
    },
    {
      id: "teleport-workflow",
      title: "텔레포트 전체 워크플로우",
      content: `### 웹 설계 → 텔레포트 → 구현의 전체 흐름

#### 전형적인 텔레포트 패턴

\`\`\`
[1단계: 웹에서 설계]
  claude.ai에서 자유롭게 논의
  → "이 기능 어떻게 구현할까?"
  → "아키텍처 장단점은?"

       | /teleport
       v

[2단계: 터미널에서 구현]
  → 파일 생성/수정
  → 테스트 작성 + 실행
  → git commit + push

       | & prefix
       v

[3단계: 웹에서 결과 확인]
  → 팀원과 공유
  → 추가 설계 논의
\`\`\`

#### 하루 워크플로우 예시

\`\`\`
09:00 [claude.ai] 새 기능 설계 논의
09:30 [/teleport] 터미널에서 구현 시작
10:30 [& prefix] 테스트 실행을 클라우드로
11:00 [claude.ai] 테스트 결과 확인
\`\`\`

> 웹의 자유로운 대화 + 터미널의 강력한 실행력을 조합하세요!`,
      checklist: [
        "웹에서 설계 → 터미널에서 구현 패턴을 이해한다",
        "/teleport로 웹↔터미널 전환을 할 수 있다",
        "& prefix와 /teleport를 조합해서 사용할 수 있다"
      ]
    },
    {
      id: "remote-control",
      title: "리모트 컨트롤 활용",
      content: `### /rc로 원격 접속 실습

\`/rc\`를 활용한 다양한 시나리오입니다.

#### 시나리오 1: 이동 중 모니터링

\`\`\`
12:00 [데스크탑] 장시간 작업 실행, /rc 활성화
12:10 [모바일] URL 접속 → 진행 상황 확인
12:30 [모바일] "결과를 REPORT.md로 저장해줘"
13:00 [데스크탑] 돌아와서 결과 확인
\`\`\`

#### 시나리오 2: 페어 프로그래밍

\`\`\`
[개발자 A: 데스크탑]          [개발자 B: 노트북]
 /rc로 세션 공유                URL로 접속
 "이 함수 구현해줘"             "테스트도 같이 작성해달라고 해봐"
   → 함께 Claude 지시 → 결과 함께 확인
\`\`\`

#### 텔레포트 vs /rc — 언제 뭘 쓸까?

| 상황 | 추천 |
|------|------|
| 웹에서 설계 → 터미널 코딩 | /teleport |
| 다른 기기에서 확인 | /rc |
| 팀원에게 세션 보여주기 | /rc |
| 클라우드 결과 가져오기 | /teleport |

> **보안 팁**: 세션에 API 키나 .env 내용이 노출되지 않았는지 확인 후 공유하세요!`,
      checklist: [
        "/rc로 리모트 컨트롤을 활성화할 수 있다",
        "공유 URL로 다른 기기에서 접속할 수 있다",
        "보안 주의사항을 이해했다",
        "/teleport와 /rc의 차이를 설명할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "& prefix의 역할은 무엇인가요?",
      options: [
        "작업을 취소한다",
        "작업을 클라우드에서 실행하고, 터미널을 자유롭게 한다",
        "작업을 더 빠르게 실행한다"
      ],
      answer: 1,
      explanation: "& prefix는 작업을 클라우드에서 실행합니다. 터미널은 즉시 사용 가능해지고, 진행 상황은 claude.ai에서 확인할 수 있어요."
    },
    {
      question: "/teleport와 /rc의 핵심 차이는?",
      options: [
        "/teleport가 더 빠르다",
        "/teleport는 세션을 이동시키고, /rc는 세션은 그대로 두고 원격 접속한다",
        "/rc가 더 안전하다"
      ],
      answer: 1,
      explanation: "/teleport는 세션 자체를 웹에서 터미널로 옮기는 '이사'이고, /rc는 세션은 그대로 두고 다른 기기에서 접속하는 'TV 리모컨'입니다."
    },
    {
      question: "다음 중 /teleport를 사용하기 좋은 상황은?",
      options: [
        "모바일에서 진행 상황을 확인할 때",
        "웹에서 설계를 논의하다가 터미널에서 코딩을 시작할 때",
        "팀원에게 세션을 보여줄 때"
      ],
      answer: 1,
      explanation: "웹에서 설계를 논의한 후 실제 코딩(파일 편집, git 사용)을 하려면 터미널이 필요합니다. /teleport로 세션을 터미널로 가져오면 됩니다."
    },
    {
      question: "& prefix로 보낸 작업의 결과를 터미널로 가져오려면?",
      options: [
        "& prefix를 다시 사용한다",
        "/teleport (또는 /tp)를 사용한다",
        "claude.ai에서만 확인 가능하다"
      ],
      answer: 1,
      explanation: "& prefix로 클라우드에 보낸 작업이 완료되면, /teleport (줄여서 /tp)로 해당 세션을 터미널로 가져올 수 있습니다."
    },
    {
      question: "/rc로 세션을 공유할 때 주의할 점은?",
      options: [
        "공유 URL은 24시간만 유효하다",
        "세션에 API 키나 비밀번호가 노출되지 않았는지 확인한다",
        "/rc는 한 명만 접속 가능하다"
      ],
      answer: 1,
      explanation: "세션을 공유하기 전에 API 키, 토큰, 비밀번호, .env 파일 내용 등 민감한 정보가 세션에 노출되지 않았는지 꼭 확인해야 합니다."
    }
  ]
};
