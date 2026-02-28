window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["11-mcp-connectors"] = {
  overview: `## MCP 커넥터 — 이미 연결된 도구 사용하기

07-mcp-server에서 MCP 서버를 직접 설정해봤죠? 이번엔 **이미 누군가 설정해둔 도구를 바로 쓰는 법**을 배워요!

### 핵심 비유: 학교 공유 프린터

\`\`\`
집 프린터 (수동 MCP)                학교 공유 프린터 (MCP 커넥터)
─────────────────────             ─────────────────────────
1. 프린터 구매                     1. 학교에 이미 설치됨
2. 드라이버 설치                   2. 선생님이 이미 설정함
3. Wi-Fi 연결 설정                 3. 학생은 "인쇄"만 누르면 됨
4. 용지/잉크 관리                  4. 관리도 학교에서 해줌

→ 내가 다 해야 함                  → 그냥 쓰면 됨!
\`\`\`

| 비교 항목 | 수동 MCP (07에서 배운 것) | MCP 커넥터 (이번에 배울 것) |
|-----------|--------------------------|---------------------------|
| 설정 방법 | \`claude mcp add\` + 설정 파일 | claude.ai에서 활성화 |
| 인증 | API 키 직접 발급/관리 | OAuth로 자동 처리 |
| 서버 실행 | 내 컴퓨터에서 실행 | Anthropic이 관리 |
| 난이도 | 중~상 | 하 |
| 비유 | 집 프린터 | 학교 공유 프린터 |`,

  concepts: [
    {
      id: "connectors-vs-manual",
      title: "커넥터 vs 수동 MCP (공유 프린터 vs 내 프린터)",
      content: `### 학교 공유 프린터 vs 집에 사온 프린터

#### 수동 MCP (07에서 배운 것) = 집 프린터

집에 프린터를 사면 어떤 과정을 거치나요?

\`\`\`
1. 프린터 구매 (MCP 서버 소스 다운로드)
2. 드라이버 설치 (npm install, 의존성 설치)
3. Wi-Fi 연결 (API 키 발급, 환경변수 설정)
4. 용지/잉크 관리 (서버 업데이트, 오류 대응)
\`\`\`

장점: 마음대로 설정 가능, 커스텀 가능
단점: 설치/관리를 직접 해야 함

#### MCP 커넥터 (이번에 배울 것) = 학교 공유 프린터

학교 공유 프린터는 어떤가요?

\`\`\`
1. 학교에 이미 설치됨 (Anthropic이 서버 운영)
2. 선생님이 설정 완료 (OAuth로 자동 인증)
3. "인쇄" 버튼만 누르면 됨 (ToolSearch로 바로 사용)
4. 관리도 학교에서 (자동 업데이트)
\`\`\`

장점: 설치 없이 바로 사용, 관리 불필요
단점: 제공되는 것만 사용 가능 (커스텀 불가)

#### 언제 뭘 쓸까?

| 상황 | 추천 |
|------|------|
| Slack/Notion 같은 인기 서비스 연동 | 커넥터 (간편!) |
| 회사 내부 시스템 연동 | 수동 MCP (커스텀 필요) |
| 특별한 설정이 필요한 경우 | 수동 MCP |
| 빠르게 시작하고 싶을 때 | 커넥터 |`
    },
    {
      id: "oauth-auth",
      title: "OAuth 인증 (자동 출입증)",
      content: `### 비밀번호 대신 출입증으로

수동 MCP에서는 API 키를 직접 발급받아야 했죠? 마치 건물에 들어갈 때마다 **비밀번호를 입력**하는 것처럼요.

MCP 커넥터는 **OAuth**를 사용합니다. 한 번 "허용" 버튼을 클릭하면, 그 다음부터는 **출입증**처럼 자동으로 인증됩니다.

#### OAuth 인증 흐름

\`\`\`
1단계: claude.ai에서 커넥터 활성화 클릭
   ↓
2단계: 서비스(Slack/Notion) 로그인 팝업
   ↓
3단계: "Claude에 권한 허용" 클릭
   ↓
4단계: 끝! 이제 Claude Code에서 바로 사용 가능
\`\`\`

#### API 키 방식 vs OAuth 방식

| 구분 | API 키 (수동 MCP) | OAuth (커넥터) |
|------|-------------------|---------------|
| 비유 | 건물 비밀번호 | 자동 출입증 |
| 발급 | 직접 사이트에서 발급 | "허용" 클릭 한 번 |
| 관리 | 만료되면 재발급 | 자동 갱신 |
| 보안 | 키를 안전하게 저장해야 함 | 시스템이 관리 |

> **핵심**: API 키는 비밀번호처럼 내가 관리해야 하지만, OAuth는 출입증처럼 시스템이 알아서 처리합니다!`
    },
    {
      id: "toolsearch",
      title: "ToolSearch (도구 검색 돋보기)",
      content: `### 어떤 도구가 있는지 찾아보기

학교 공유 프린터가 있다는 걸 모르면 쓸 수 없겠죠?
**ToolSearch**는 사용 가능한 도구를 찾아주는 **돋보기** 역할을 합니다.

#### 왜 ToolSearch가 필요한가?

커넥터의 도구들은 **Deferred Tools(지연 도구)**입니다.
성능을 위해 처음부터 전부 로딩하지 않고, **필요할 때만** 불러옵니다.

\`\`\`
일반 도구 (Read, Write 등)     지연 도구 (커넥터 도구)
━━━━━━━━━━━━━━━━━━━━━━━━     ━━━━━━━━━━━━━━━━━━━━━━
항상 사용 가능                  ToolSearch로 먼저 로딩해야 사용 가능

마치...                         마치...
항상 켜져 있는 형광등            필요할 때 켜는 스탠드
\`\`\`

#### ToolSearch 사용 방식

1. **키워드 검색**: 어떤 도구가 있는지 찾기
   - \`"slack"\` → Slack 관련 도구들이 나옴
   - \`"notion"\` → Notion 관련 도구들이 나옴

2. **직접 선택**: 정확한 이름을 알 때
   - \`"select:mcp__slack__read_channel"\`

> **중요**: ToolSearch로 찾은 도구는 바로 사용할 수 있게 **로딩**됩니다. 찾기만 하는 게 아니라, 찾으면서 동시에 활성화합니다!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "커넥터 활성화하기",
      content: `### 학교 공유 프린터에 내 계정 등록하기

claude.ai에서 MCP 커넥터를 활성화하는 과정입니다. 한 번만 하면 됩니다!

#### 순서

1. claude.ai 접속 → 설정 페이지
2. "Connected Apps" 또는 "MCP Connectors" 메뉴
3. 원하는 서비스(Slack, Notion 등) 선택
4. "연결" 클릭 → OAuth 인증 팝업
5. "허용" 클릭 → 완료!`,
      terminals: [
        {
          command: "# claude.ai 설정에서 활성화한 후, Claude Code에서 확인",
          output: `> Slack 채널 목록을 보여줘

Claude: Slack 커넥터로 채널 목록을 확인합니다.

[ToolSearch] "slack" 검색 → mcp__slack__list_channels 로딩 완료

📋 Slack 채널 목록:
  #general          - 전체 공지
  #engineering      - 개발팀
  #design           - 디자인팀
  #random           - 자유 대화

4개 채널을 찾았습니다.`
        },
        {
          command: "# 커넥터 연결 상태 확인",
          output: `> 연결된 MCP 커넥터 상태를 알려줘

연결된 커넥터:
━━━━━━━━━━━━━━━━━━━━━━━━
  Slack       ✓ 연결됨 (OAuth)
  Notion      ✓ 연결됨 (OAuth)
  Linear      ✗ 미연결
  Vercel      ✗ 미연결`
        }
      ]
    },
    {
      id: "step-02",
      title: "Slack / Notion 커넥터 사용하기",
      content: `### 공유 프린터로 인쇄하기 — 실제 사용

커넥터가 활성화되었으면, 이제 자연어로 요청하기만 하면 됩니다!

#### Slack 커넥터로 할 수 있는 것
- 채널 메시지 읽기
- 메시지 검색하기
- 메시지 보내기

#### Notion 커넥터로 할 수 있는 것
- 페이지 검색하기
- 페이지 내용 읽기
- 댓글 작성하기`,
      terminals: [
        {
          command: "# Slack 채널 메시지 읽기",
          output: `> #engineering 채널의 최근 메시지 5개를 보여줘

Claude: Slack에서 #engineering 채널의 최근 메시지를 가져옵니다.

📨 #engineering 최근 메시지:

1. @김개발 (10:30)
   "배포 완료했습니다. 스테이징에서 확인해주세요."

2. @이디자인 (10:15)
   "새 디자인 시안 Figma에 올렸어요."

3. @박매니저 (09:50)
   "오늘 스프린트 회고 3시입니다."

4. @최테스트 (09:30)
   "QA 통과! 이슈 없습니다."

5. @정인턴 (09:00)
   "좋은 아침입니다! 오늘도 화이팅 💪"`
        },
        {
          command: "# Notion 페이지 검색",
          output: `> Notion에서 "프로젝트 일정" 관련 페이지를 찾아줘

Claude: Notion에서 "프로젝트 일정" 관련 페이지를 검색합니다.

📄 검색 결과:

1. "2026 Q1 프로젝트 일정표"
   마지막 수정: 2026-02-20
   위치: 팀 위키 > 프로젝트 관리

2. "스프린트 일정 관리 가이드"
   마지막 수정: 2026-02-15
   위치: 팀 위키 > 운영 가이드

어떤 페이지를 자세히 볼까요?`
        },
        {
          command: "# Notion 페이지 내용 읽기",
          output: `> 첫 번째 페이지의 내용을 보여줘

Claude: "2026 Q1 프로젝트 일정표" 페이지를 읽겠습니다.

📄 2026 Q1 프로젝트 일정표
━━━━━━━━━━━━━━━━━━━━━━━━━━

## 마일스톤

| 기간 | 목표 | 상태 |
|------|------|------|
| 1월 | MVP 개발 | 완료 |
| 2월 | 베타 테스트 | 진행 중 |
| 3월 | 정식 출시 | 예정 |

## 주요 일정
- 2/25: 베타 피드백 수집 마감
- 3/01: 최종 QA 시작
- 3/15: 정식 출시`
        }
      ]
    },
    {
      id: "step-03",
      title: "ToolSearch로 도구 찾기",
      content: `### 돋보기로 도구 찾기 — ToolSearch 활용

커넥터가 제공하는 도구를 찾아 사용하는 방법을 실습합니다.

#### ToolSearch의 두 가지 모드

1. **키워드 검색**: 어떤 도구가 있는지 탐색
2. **직접 선택**: 정확한 도구 이름으로 바로 로딩`,
      terminals: [
        {
          command: "# 키워드로 검색 (Slack 관련 도구 찾기)",
          output: `[ToolSearch] query: "slack"

검색 결과 (5개):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. mcp__slack__list_channels     채널 목록 조회
2. mcp__slack__read_channel      채널 메시지 읽기
3. mcp__slack__search_messages   메시지 검색
4. mcp__slack__send_message      메시지 보내기
5. mcp__slack__get_thread        스레드 조회

✓ 5개 도구가 로딩되었습니다. 바로 사용할 수 있습니다.`
        },
        {
          command: "# 직접 선택 (정확한 이름을 알 때)",
          output: `[ToolSearch] query: "select:mcp__notion__notion-search"

✓ mcp__notion__notion-search 로딩 완료
  설명: Notion 페이지 검색`
        },
        {
          command: "# 필수 키워드로 검색 (+로 필터링)",
          output: `[ToolSearch] query: "+notion create"

검색 결과 (3개):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. mcp__notion__notion-create-pages      페이지 생성
2. mcp__notion__notion-create-database   데이터베이스 생성
3. mcp__notion__notion-create-comment    댓글 작성

✓ 3개 도구가 로딩되었습니다.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "connector-workflow",
      title: "커넥터 활용 워크플로우",
      content: `### 실전: Slack 메시지 읽고 Notion에 정리하기

커넥터를 조합하면 여러 서비스를 오가는 작업을 한 번에 처리할 수 있습니다.

#### 시나리오

\`\`\`
1. Slack #engineering에서 이번 주 논의 내용 가져오기
2. 핵심 내용 요약하기
3. Notion "주간 회의록" 페이지에 정리하기
\`\`\`

#### 요청 예시

\`\`\`
"Slack #engineering 채널에서 이번 주 메시지를 읽고,
핵심 내용을 요약해서 Notion의 주간 회의록 페이지에 추가해줘."
\`\`\`

이렇게 한 문장으로 요청하면, Claude가 알아서:
1. ToolSearch로 Slack 도구 로딩
2. Slack 메시지 읽기
3. 내용 요약
4. ToolSearch로 Notion 도구 로딩
5. Notion에 기록

> 예전에는 Slack 열기 → 복사 → Notion 열기 → 붙여넣기 → 정리... 이 과정이 필요했지만, 커넥터로 한 번에 처리할 수 있습니다!`,
      checklist: [
        "MCP 커넥터와 수동 MCP의 차이를 설명할 수 있다",
        "OAuth 인증이 API 키보다 간편한 이유를 이해한다",
        "ToolSearch의 키워드 검색과 직접 선택 방식을 알고 있다",
        "Deferred Tools(지연 도구)의 개념을 이해한다",
        "커넥터를 조합하여 여러 서비스를 연동하는 시나리오를 구상할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "MCP 커넥터를 가장 잘 설명한 비유는?",
      options: [
        "직접 조립하는 PC",
        "학교 공유 프린터 (설치 없이 바로 사용)",
        "개인용 USB 드라이브"
      ],
      answer: 1,
      explanation: "MCP 커넥터는 학교 공유 프린터처럼 누군가(Anthropic)가 이미 설정해둔 도구를 바로 사용하는 것입니다. 수동 MCP(집 프린터)처럼 직접 설치할 필요가 없어요."
    },
    {
      question: "수동 MCP와 MCP 커넥터의 가장 큰 차이는?",
      options: [
        "커넥터가 더 빠르다",
        "커넥터는 설치/설정 없이 claude.ai에서 활성화만 하면 된다",
        "수동 MCP는 무료이고 커넥터는 유료이다"
      ],
      answer: 1,
      explanation: "MCP 커넥터의 핵심 장점은 설치/설정의 간편함입니다. API 키 발급, 서버 실행 같은 과정 없이 claude.ai에서 '연결' 버튼만 클릭하면 됩니다."
    },
    {
      question: "ToolSearch의 역할은?",
      options: [
        "새로운 도구를 만드는 것",
        "커넥터가 제공하는 도구를 찾아서 로딩하는 것",
        "도구의 버그를 찾는 것"
      ],
      answer: 1,
      explanation: "ToolSearch는 커넥터가 제공하는 Deferred Tools(지연 도구)를 찾아서 사용 가능하게 로딩합니다. 찾기와 활성화를 동시에 합니다!"
    },
    {
      question: "OAuth 인증의 장점은?",
      options: [
        "API 키보다 보안이 약하지만 빠르다",
        "한 번 '허용' 클릭으로 인증이 완료되고 자동 갱신된다",
        "인터넷 연결 없이 사용할 수 있다"
      ],
      answer: 1,
      explanation: "OAuth는 출입증처럼 한 번 발급받으면 자동으로 관리됩니다. API 키처럼 직접 발급/저장/갱신할 필요가 없어요."
    },
    {
      question: "Deferred Tools(지연 도구)란?",
      options: [
        "나중에 만들 예정인 도구",
        "성능을 위해 필요할 때만 로딩되는 도구",
        "느리게 동작하는 도구"
      ],
      answer: 1,
      explanation: "Deferred Tools는 처음부터 전부 로딩하면 느려지니까, 필요할 때만 로딩하는 도구입니다. ToolSearch로 찾으면 그때 로딩됩니다. 필요할 때 켜는 스탠드 같은 개념이에요."
    }
  ]
};
