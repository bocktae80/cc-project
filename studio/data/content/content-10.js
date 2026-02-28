window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["10-cli-master"] = {
  overview: `## CLI 마스터 — 터미널에서 클로드 조종하기

TV 리모컨에는 전원, 채널, 볼륨, 입력 전환... 버튼이 여러 개 있죠?
\`claude\` 명령어도 마찬가지예요. 하나의 명령어에 **여러 버튼(서브커맨드)**이 숨어 있습니다!

### 핵심 비유: TV 리모컨

\`\`\`
TV 리모컨                          claude 명령어
━━━━━━━━━━━━━━━                    ━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐                    ┌─────────────────────┐
│  전원       │  ← 켜고 끄기       │  claude              │  ← 대화 시작
│  채널       │  ← 채널 변경       │  claude auth login   │  ← 로그인
│  볼륨       │  ← 소리 조절       │  claude auth status  │  ← 상태 확인
│  입력       │  ← HDMI/USB       │  claude agents       │  ← 에이전트 목록
│  설정       │  ← 환경설정        │  claude config       │  ← 설정 변경
└─────────────┘                    └─────────────────────┘

리모컨 버튼 하나 = 서브커맨드 하나!
\`\`\`

리모컨의 전원 버튼만 누르면 TV가 켜지듯, \`claude\`만 치면 대화가 시작돼요.
채널 버튼을 누르면 다른 기능이 실행되듯, \`claude auth login\`을 치면 로그인이 됩니다!`,

  concepts: [
    {
      id: "auth-commands",
      title: "claude auth (계정 관리 버튼)",
      content: `### 계정 관리 — 로그인, 상태 확인, 로그아웃

TV를 처음 샀을 때 Wi-Fi 연결을 하듯, 클로드 코드를 처음 쓸 때도 **로그인**을 해야 합니다.

\`claude auth\`는 리모컨의 **계정/설정 버튼**과 같아요.

#### 세 가지 서브커맨드

| 서브커맨드 | 하는 일 | 비유 |
|-----------|--------|------|
| \`claude auth login\` | 로그인 | Wi-Fi 처음 연결하기 |
| \`claude auth status\` | 상태 확인 | Wi-Fi 연결 상태 보기 |
| \`claude auth logout\` | 로그아웃 | Wi-Fi 연결 끊기 |

#### 언제 쓰나요?

- **처음 설치했을 때**: \`claude auth login\`으로 계정 연결
- **잘 되는지 확인**: \`claude auth status\`로 토큰 상태 점검
- **다른 계정 쓸 때**: \`claude auth logout\` → \`claude auth login\`

> **팁**: 대부분 한 번 로그인하면 신경 쓸 필요 없어요! 문제가 생겼을 때만 \`auth status\`를 확인하면 됩니다.`
    },
    {
      id: "agents-command",
      title: "claude agents (에이전트 목록 버튼)",
      content: `### 사용 가능한 에이전트 한눈에 보기

리모컨의 "채널 목록" 버튼을 누르면 시청 가능한 채널이 보이듯,
\`claude agents\`를 실행하면 사용 가능한 에이전트 목록이 나옵니다.

#### 에이전트란?

에이전트는 **특정 역할에 맞게 설정된 클로드**입니다.

\`\`\`
기본 클로드 = 만능 리모컨 (뭐든 가능)
에이전트   = 전문 리모컨 (특정 역할에 특화)
\`\`\`

예를 들어:
- **코드 리뷰 에이전트**: 코드를 검토하고 피드백
- **테스트 에이전트**: 테스트 코드를 작성
- **문서 에이전트**: 문서를 정리하고 작성

#### /rename으로 대화 이름 짓기

대화가 쌓이면 어떤 대화가 뭔지 헷갈리죠? \`/rename\`을 사용하면 대화 내용을 분석해서 **자동으로 이름**을 지어줍니다.

\`\`\`
세션 안에서:
> /rename

결과: "프로젝트 구조 리팩토링 논의" 로 이름이 변경됨
\`\`\`

> 파일 이름을 정리하면 나중에 찾기 쉽듯, 대화 이름을 정리하면 나중에 참고하기 편해요!`
    },
    {
      id: "pdf-reading",
      title: "PDF 읽기 (pages 파라미터)",
      content: `### 두꺼운 책에서 원하는 페이지만 펼치기

300페이지짜리 책을 처음부터 끝까지 읽을 필요 없잖아요?
"47페이지를 펼쳐봐"라고 하면 바로 그 페이지를 볼 수 있죠.

클로드 코드에서 PDF를 읽을 때도 마찬가지입니다.

#### 페이지 지정 방식

\`\`\`
pages: "1-5"      ← 1~5페이지 (처음 5장)
pages: "10"       ← 10페이지만
pages: "10-20"    ← 10~20페이지 (중간 부분)
\`\`\`

#### 10페이지 규칙

| PDF 크기 | 읽는 방법 |
|----------|----------|
| 10페이지 이하 | 그냥 읽기 (pages 없이) |
| 10페이지 초과 | \`pages\` 파라미터 필수! |

> **왜?** 큰 PDF를 한 번에 다 읽으면 클로드의 메모리(컨텍스트 윈도우)를 너무 많이 차지합니다.
> 원하는 부분만 읽는 게 효율적이에요!

#### 실전 팁

\`\`\`
"이 PDF의 3페이지를 읽어줘"
"이 논문의 1-5페이지 요약해줘"
"매뉴얼의 15-20페이지에서 설치 방법 찾아줘"
\`\`\`

원하는 페이지만 콕 집어서 읽을 수 있습니다!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "인증 관리 (auth) 실습",
      content: `### 리모컨 첫 설정 — 로그인하기

클로드 코드를 처음 사용할 때, 또는 계정 상태를 확인할 때 사용하는 \`claude auth\` 명령어를 실습합니다.

#### 순서

1. \`claude auth status\`로 현재 상태 확인
2. 로그인이 안 되어 있으면 \`claude auth login\` 실행
3. 다시 \`claude auth status\`로 확인`,
      terminals: [
        {
          command: "claude auth status",
          output: `Authentication Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Provider:       Anthropic
Account:        user@example.com
Token Status:   Valid
Expires:        2026-03-22T10:00:00Z
Plan:           Pro

✓ 인증이 정상입니다.`
        },
        {
          command: "claude auth login",
          output: `Anthropic 인증을 시작합니다...
브라우저에서 인증 페이지가 열립니다.

브라우저에서 로그인을 완료하세요...
✓ 로그인 성공!

Provider:  Anthropic
Account:   user@example.com`
        },
        {
          command: "claude auth logout",
          output: `✓ 로그아웃되었습니다.
다시 로그인하려면 'claude auth login'을 실행하세요.`
        }
      ]
    },
    {
      id: "step-02",
      title: "에이전트 목록 & 대화 이름 변경",
      content: `### 에이전트 확인하고, 대화 이름 정리하기

\`claude agents\`로 사용 가능한 에이전트를 확인하고,
\`/rename\`으로 대화에 의미 있는 이름을 붙여봅시다.`,
      terminals: [
        {
          command: "claude agents",
          output: `Available Agents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Name                 Source          Description
  ────                 ──────          ───────────
  code-reviewer        .claude/agents  코드 리뷰 전문 에이전트
  test-writer          .claude/agents  테스트 코드 작성 에이전트
  doc-writer           .claude/agents  문서 작성 에이전트

총 3개 에이전트를 사용할 수 있습니다.`
        },
        {
          command: "# 세션 안에서 /rename 실행",
          output: `> /rename

대화 내용을 분석 중...
✓ 대화 이름이 "프로젝트 구조 리팩토링 논의"로 변경되었습니다.

(이전 이름: "Untitled conversation")`
        },
        {
          command: "# 대화 목록 확인",
          output: `최근 대화:
  1. 프로젝트 구조 리팩토링 논의    (2026-02-22)
  2. API 엔드포인트 설계            (2026-02-21)
  3. 버그 수정 #142                 (2026-02-20)

(이름을 정리하니 어떤 대화인지 바로 알 수 있죠!)`
        }
      ]
    },
    {
      id: "step-03",
      title: "PDF 페이지 읽기 실습",
      content: `### 두꺼운 PDF에서 원하는 페이지만 읽기

큰 PDF 파일을 읽을 때 pages 파라미터를 사용하는 방법을 실습합니다.

#### 시나리오: 50페이지짜리 매뉴얼에서 설치 부분만 읽기`,
      terminals: [
        {
          command: "# 클로드에게 PDF 읽기 요청",
          output: `> manual.pdf의 3-5페이지를 읽어줘

Claude: manual.pdf의 3~5페이지를 읽겠습니다.

📄 manual.pdf (3-5페이지)
━━━━━━━━━━━━━━━━━━━━━━━━━━

## 3. 설치 방법

### 3.1 시스템 요구사항
- OS: macOS 12+, Ubuntu 22.04+, Windows 11
- 메모리: 8GB 이상
- 디스크: 500MB 이상

### 3.2 설치 순서
1. 공식 사이트에서 다운로드
2. 설치 프로그램 실행
...`
        },
        {
          command: "# 10페이지 이하 PDF는 그냥 읽기",
          output: `> summary.pdf를 읽어줘

Claude: summary.pdf (8페이지)를 읽겠습니다.
(10페이지 이하이므로 pages 파라미터 없이 전체를 읽습니다)`
        },
        {
          command: "# 큰 PDF에서 범위를 나눠 읽기",
          output: `> thesis.pdf에서 결론 부분(45-50페이지)을 요약해줘

Claude: thesis.pdf의 45~50페이지를 읽고 요약하겠습니다.

📄 결론 요약:
본 연구에서는... (중략)
핵심 발견 3가지:
1. ...
2. ...
3. ...`
        }
      ]
    }
  ],

  examples: [
    {
      id: "cli-cheatsheet",
      title: "CLI 명령어 치트시트",
      content: `### 리모컨 버튼 총정리

자주 사용하는 서브커맨드를 한눈에 정리한 치트시트입니다.

#### 인증 관련 (계정 버튼)

\`\`\`bash
claude auth login          # 로그인
claude auth status         # 상태 확인
claude auth logout         # 로그아웃
\`\`\`

#### 에이전트 관련 (에이전트 버튼)

\`\`\`bash
claude agents              # 에이전트 목록 보기
\`\`\`

#### 세션 관련 (설정 버튼)

\`\`\`bash
/rename                    # 대화 이름 자동 생성
\`\`\`

#### PDF 읽기 (페이지 선택 버튼)

\`\`\`bash
# 세션 안에서 요청
"이 PDF의 1-5페이지를 읽어줘"
"10-15페이지만 요약해줘"
\`\`\`

#### 기타 유용한 옵션

\`\`\`bash
claude --version           # 버전 확인
claude --help              # 도움말 보기
claude --debug             # 디버그 모드
claude --worktree          # 워크트리 모드
\`\`\``,
      checklist: [
        "claude auth login/status/logout 사용법을 알고 있다",
        "claude agents로 에이전트 목록을 확인할 수 있다",
        "/rename으로 대화 이름을 자동 생성할 수 있다",
        "PDF 읽을 때 pages 파라미터로 범위를 지정할 수 있다",
        "10페이지 초과 PDF에는 pages가 필수라는 것을 이해한다"
      ]
    }
  ],

  quiz: [
    {
      question: "claude 명령어의 서브커맨드를 가장 잘 설명한 비유는?",
      options: [
        "TV 리모컨의 여러 버튼처럼 각각 다른 기능을 실행한다",
        "여러 개의 TV를 동시에 켜는 것과 같다",
        "TV 채널을 순서대로 돌리는 것과 같다"
      ],
      answer: 0,
      explanation: "claude 뒤에 서브커맨드를 붙이면 각각 다른 기능이 실행됩니다. 전원 버튼(claude)은 대화를 시작하고, 채널 버튼(claude auth)은 인증을 관리하는 것처럼요!"
    },
    {
      question: "현재 로그인 상태를 확인하려면 어떤 명령어를 사용하나요?",
      options: [
        "claude login",
        "claude auth status",
        "claude check"
      ],
      answer: 1,
      explanation: "claude auth status는 현재 인증 상태(로그인 여부, 토큰 유효기간 등)를 보여줍니다. auth는 인증(Authentication)의 줄임말입니다."
    },
    {
      question: "50페이지짜리 PDF를 읽을 때 올바른 방법은?",
      options: [
        "그냥 '이 PDF 읽어줘'라고 하면 된다",
        "pages 파라미터로 원하는 범위를 지정해야 한다",
        "PDF는 클로드 코드로 읽을 수 없다"
      ],
      answer: 1,
      explanation: "10페이지를 초과하는 PDF는 반드시 pages 파라미터로 범위를 지정해야 합니다. 예: '이 PDF의 1-5페이지를 읽어줘'. 한번에 최대 20페이지까지 읽을 수 있습니다."
    },
    {
      question: "/rename 커맨드의 역할은?",
      options: [
        "파일 이름을 변경한다",
        "대화 내용을 분석해서 대화 이름을 자동 생성한다",
        "클로드의 이름을 바꾼다"
      ],
      answer: 1,
      explanation: "/rename은 현재 대화의 내용을 분석해서 의미 있는 이름을 자동으로 지어줍니다. 'Untitled conversation' 대신 '프로젝트 구조 리팩토링 논의' 같은 이름이 생깁니다."
    },
    {
      question: "claude agents 명령어는 무엇을 보여주나요?",
      options: [
        "현재 실행 중인 에이전트의 작업 상태",
        "사용 가능한 에이전트의 목록과 설명",
        "에이전트를 새로 만드는 마법사"
      ],
      answer: 1,
      explanation: "claude agents는 .claude/agents/ 폴더에 설정된 에이전트들의 목록, 이름, 설명을 보여줍니다. 어떤 에이전트를 사용할 수 있는지 확인할 때 사용합니다."
    }
  ]
};
