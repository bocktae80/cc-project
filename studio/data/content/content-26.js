window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["26-team-onboarding"] = {
  overview: `## /team-onboarding — 팀 온보딩 가이드 자동 생성

**신입 사원 환영 키트**를 자동으로 만드는 HR 담당자를 생각해보세요!
\`/team-onboarding\`은 지난 30일간 당신의 Claude Code 사용 패턴을 분석하고, 새 팀원이 따라할 수 있는 **맞춤 온보딩 가이드**를 자동 생성합니다.

### 이런 상황에서 유용해요
- **새 팀원 합류**: "클로드 코드 어떻게 써요?" → 가이드 한 장이면 끝
- **팀 표준화**: 모든 팀원이 같은 도구/MCP/스킬을 쓰도록 체크리스트 제공
- **온보딩 자동화**: 수동으로 문서 쓸 필요 없이, 사용 데이터에서 자동 추출

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | /team-onboarding의 동작 원리와 가이드 구조 | 💡 개념 |
| 2 | 가이드 생성, 커스터마이즈, 팀원 전달 | 🔧 실습 |
| 3 | 실전 온보딩 시나리오 체험 | 💻 예제 |

### 왜 필요할까?

\`\`\`
새 팀원이 들어오면...
├── "MCP 뭐 써요?" "스킬은요?" "레포 어디에요?"
├── 매번 같은 설명을 반복
├── 설정 빠뜨리고 삽질
└── 일주일이 지나도 제대로 셋업이 안 됨

  ↓ /team-onboarding 실행!

├── 업무 유형별 사용 비중을 한눈에
├── 필수 레포/MCP/스킬 체크리스트
├── 팀 팁과 첫 태스크까지
└── 가이드를 붙여넣으면 대화형 온보딩 시작
\`\`\`

### 사용 방법

\`\`\`bash
# Claude Code에서 슬래시 커맨드로 실행
> /team-onboarding

# 자동으로 30일 사용 데이터 분석 → ONBOARDING.md 생성
\`\`\`

### 가이드에 포함되는 것

| 섹션 | 설명 | 비유 |
|------|------|------|
| 업무 유형 비중 | Build, Debug, Plan 등 비율 | 시간표 |
| Top 커맨드 | 자주 쓰는 슬래시 커맨드 | 즐겨찾기 |
| MCP 서버 | 연결된 외부 도구 | 설치 앱 목록 |
| 셋업 체크리스트 | 레포, MCP, 스킬 목록 | 준비물 리스트 |
| 팀 팁 | CLAUDE.md에 없는 노하우 | 선배의 꿀팁 |
| 스타터 태스크 | 첫 번째 해볼 일 | 실습 과제 |`,

  concepts: [
    {
      id: "what-is-team-onboarding",
      title: "/team-onboarding이란?",
      content: `### 신입 환영 키트 자동 생성기

\`/team-onboarding\`은 **신입 사원 환영 키트를 자동으로 만들어주는 HR 담당자**입니다.

\`\`\`
신입 환영 키트               /team-onboarding
──────────                  ──────────────────
회사 소개 자료               업무 유형 비중 (Build 55%, Debug 20%...)
필수 설치 프로그램           MCP 서버 목록 + 셋업 방법
부서 업무 안내               자주 쓰는 커맨드/스킬
멘토 배정                   대화형 온보딩 버디 (Claude)
\`\`\`

#### 동작 방식

\`\`\`
1. /team-onboarding 실행
2. 지난 30일간 세션 데이터 수집
   - 세션 수, 첫 메시지, PR 번호
   - 슬래시 커맨드 사용 빈도
   - MCP 서버 호출 빈도
3. 세션을 업무 유형으로 분류
   - Build Feature, Debug & Fix, Plan & Design 등
4. ONBOARDING.md 파일 생성
   - 업무 비중 차트 (ASCII 바)
   - 셋업 체크리스트
   - 팀 팁 & 스타터 태스크 플레이스홀더
5. 리뷰 질문 → 커스터마이즈 반영
\`\`\`

#### 생성되는 파일

\`\`\`
ONBOARDING.md
├── How We Use Claude (사용 통계)
│   ├── Work Type Breakdown (업무 유형 비중)
│   ├── Top Skills & Commands (커맨드 순위)
│   └── Top MCP Servers (MCP 순위)
├── Your Setup Checklist (셋업 체크리스트)
│   ├── Codebases (레포 목록)
│   ├── MCP Servers to Activate (MCP 설정)
│   └── Skills to Know About (스킬 안내)
├── Team Tips (팀 팁)
└── Get Started (스타터 태스크)
\`\`\`

> **핵심**: /team-onboarding은 "나의 사용 데이터"를 기반으로 "새 팀원을 위한 가이드"를 자동 생성합니다. 수동 문서 작성 없이, 실제 사용 패턴에서 추출하는 것이 핵심이에요!

> **핵심 요약**: /team-onboarding은 지난 30일간의 Claude Code 사용 데이터를 분석하여 업무 유형 비중, 자주 쓰는 커맨드/MCP, 셋업 체크리스트를 포함한 ONBOARDING.md를 자동 생성합니다. 새 팀원이 이 파일을 Claude Code에 붙여넣으면 대화형 온보딩이 시작됩니다.`
    },
    {
      id: "guide-structure",
      title: "가이드 구조 상세",
      content: `### ONBOARDING.md의 각 섹션 해부

#### 1. How We Use Claude — 사용 통계

\`\`\`
Work Type Breakdown:
  Build Feature   ████████████░░░░░░░░  55%
  Plan & Design   ████░░░░░░░░░░░░░░░░  20%
  Debug & Fix     ███░░░░░░░░░░░░░░░░░  15%
  Prototype       ██░░░░░░░░░░░░░░░░░░  10%
\`\`\`

세션의 첫 메시지와 제목을 분석해서 7가지 업무 유형으로 분류합니다:

| 유형 | 예시 |
|------|------|
| Build Feature | 새 기능 구현, 설정, 스크립트 |
| Debug & Fix | 버그 조사, 수정 |
| Improve Quality | 리팩토링, 코드 리뷰, 테스트 |
| Analyze Data | 쿼리, 지표, 데이터 분석 |
| Plan & Design | 아키텍처, 전략, 설계 |
| Prototype | 실험, POC, 스파이크 |
| Write Docs | PRD, RFC, README |

#### 2. Top Skills & Commands — 커맨드 순위

\`\`\`
Top Skills & Commands:
  /commit      ████████████████████  23x/month
  /simplify    ████████░░░░░░░░░░░░   8x/month
  /mcp         ████░░░░░░░░░░░░░░░░   4x/month
\`\`\`

실제 사용 빈도 기반! 새 팀원이 "뭘 먼저 배워야 하지?"의 답이 됩니다.

#### 3. Setup Checklist — 셋업 체크리스트

\`\`\`
### Codebases
- [ ] my-app — Main application repo

### MCP Servers to Activate
- [ ] Slack — 팀 커뮤니케이션. #dev-team 채널 초대 필요

### Skills to Know About
- /commit — 커밋 생성. 팀 컨벤션에 맞는 메시지 자동 작성
\`\`\`

#### 4. Team Tips & Get Started — 사람이 채우는 섹션

이 두 섹션은 자동 생성 시 TODO로 남습니다. 가이드 생성자가 직접 채워야 하는 부분이에요.

\`\`\`
팀 팁 예시:
- "PR은 반드시 /simplify 후에 올려주세요"
- "긴급 버그는 #hotfix 채널에 먼저 공유"

스타터 태스크 예시:
- "README.md의 설치 가이드를 따라가며 로컬 환경 구성"
\`\`\`

> **핵심 요약**: 가이드는 자동 생성 섹션(사용 통계, 체크리스트)과 수동 작성 섹션(팀 팁, 스타터 태스크)으로 나뉩니다. 자동 부분은 데이터에서, 수동 부분은 팀의 경험에서 나옵니다.`
    },
    {
      id: "onboarding-buddy",
      title: "온보딩 버디 모드",
      content: `### ONBOARDING.md를 붙여넣으면 무슨 일이 생길까?

가이드 하단에는 Claude를 위한 숨겨진 지시문이 포함되어 있습니다:

\`\`\`html
<!-- INSTRUCTION FOR CLAUDE:
A new teammate just pasted this guide...
You're their onboarding buddy — warm, conversational...
-->
\`\`\`

#### 새 팀원의 사용 흐름

\`\`\`
1. 새 팀원이 Claude Code를 설치
2. 팀 채널/문서에서 ONBOARDING.md를 받음
3. Claude Code에 내용을 붙여넣기
4. Claude가 온보딩 버디로 변신!
   → "환영합니다! 팀에서는 Build, Debug, Plan에 Claude를 쓰고 있어요."
   → "셋업 체크리스트를 확인해볼까요?"
   → [x] 레포 클론 — 완료!
   → [ ] Slack MCP — 아직. 같이 설정해볼까요?
5. 하나씩 진행하며 완료
\`\`\`

#### 버디가 하는 일

| 단계 | 버디의 역할 |
|------|------------|
| 환영 | 팀 이름으로 인사, 업무 유형 소개 |
| 체크 | 이미 된 것/안 된 것 구분 |
| 셋업 | 안 된 항목 하나씩 같이 진행 |
| 팁 | 팀 팁 섹션의 노하우 전달 |
| 시작 | 스타터 태스크 안내 |

#### 왜 이 방식이 좋을까?

\`\`\`
기존 온보딩                    /team-onboarding
──────────                    ──────────────────
PDF 문서 읽기 (지루함)          대화형으로 하나씩 진행
"다 읽었어요" (실제론 안 읽음)    체크리스트로 실제 완료 확인
질문하기 어려움                 바로바로 물어볼 수 있음
한 번 만들면 업데이트 안 됨     /team-onboarding 재실행으로 갱신
\`\`\`

> **핵심 요약**: ONBOARDING.md를 Claude Code에 붙여넣으면 Claude가 온보딩 버디로 변신합니다. 셋업 체크리스트를 대화형으로 진행하고, 팀 팁과 스타터 태스크까지 안내합니다. 기존 문서 기반 온보딩보다 훨씬 인터랙티브하고 실질적이에요.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "가이드 생성하기",
      content: `### 첫 /team-onboarding 실행

팀의 온보딩 가이드를 자동으로 만들어봐요!

#### 목표
- /team-onboarding 커맨드를 실행합니다
- 자동 분석 결과를 확인합니다
- ONBOARDING.md 파일이 생성되는 것을 확인합니다

#### 따라하기

**1단계:** Claude Code에서 슬래시 커맨드를 실행합니다.

**2단계:** 자동으로 30일 사용 데이터가 분석됩니다.

**3단계:** 리뷰 질문에 답하며 가이드를 커스터마이즈합니다.`,
      terminals: [
        {
          command: "/team-onboarding",
          output: `Looking at how you've used Claude over the last 30 days
to put together an onboarding guide for teammates new
to Claude Code.

[30일간 세션 데이터 분석 중...]
- 세션 수: 24
- 슬래시 커맨드: /commit(23x), /simplify(8x), /mcp(4x)
- MCP 서버: Slack(45 calls), Notion(12 calls)

ONBOARDING.md 생성 완료!

---
**Review**

1. 팀 이름을 'My Team'으로 넣었는데, 맞나요?
2. 새 팀원이 처음 해볼 스타터 태스크가 있나요?
3. CLAUDE.md에 없는 팀 팁이 있나요?`
        }
      ]
    },
    {
      id: "step-02",
      title: "가이드 커스터마이즈",
      content: `### 팀에 맞게 다듬기

자동 생성된 가이드에 팀만의 노하우를 추가해봐요.

#### 목표
- 팀 이름을 올바르게 설정합니다
- 팀 팁을 추가합니다
- 스타터 태스크를 설정합니다

#### 리뷰 질문에 답하기

Claude가 3가지를 물어봅니다:`,
      terminals: [
        {
          command: "# 리뷰 질문에 답하기",
          output: `Q1: 팀 이름은 "프론트엔드 팀"으로 해주세요.

Q2: 스타터 태스크: "로컬 환경 구성 후 dev 서버 띄우기"

Q3: 팀 팁:
- PR 올리기 전에 반드시 /simplify 실행
- 긴급 이슈는 #hotfix 채널에 먼저 공유
- 코드 리뷰 요청 시 /commit으로 커밋 메시지 자동 생성`
        },
        {
          command: "# Claude가 가이드를 업데이트",
          output: `ONBOARDING.md를 업데이트했습니다:

✅ 팀 이름: "프론트엔드 팀"
✅ 팀 팁: 3개 항목 추가
✅ 스타터 태스크: "로컬 환경 구성 후 dev 서버 띄우기"

Saved to ONBOARDING.md. Drop it in your team docs
and channels — when a new teammate pastes it into
Claude Code, they get a guided onboarding tour
from there.`
        }
      ]
    },
    {
      id: "step-03",
      title: "새 팀원에게 전달하기",
      content: `### 가이드를 팀에 배포하기

완성된 ONBOARDING.md를 새 팀원이 사용하는 방법을 배워봐요.

#### 목표
- 가이드를 팀 문서/채널에 공유합니다
- 새 팀원이 붙여넣기로 온보딩을 시작합니다
- 대화형 셋업이 진행되는 흐름을 이해합니다

#### 배포 방법

\`\`\`
가이드 공유 방법:
├── 팀 Notion/Confluence에 저장
├── Slack 팀 채널에 공유
├── 레포 root에 커밋 (ONBOARDING.md)
└── 팀 Wiki에 등록
\`\`\``,
      terminals: [
        {
          command: "# 새 팀원이 Claude Code에 붙여넣기",
          output: `[새 팀원의 Claude Code 세션]

프론트엔드 팀에 오신 걸 환영합니다!

팀에서는 Claude Code를 Build Feature, Plan & Design,
Debug & Fix에 주로 사용하고 있어요. 같이 셋업을
시작해볼까요?

셋업 체크리스트를 확인합니다:
- [x] my-app — 이미 클론되어 있네요!
- [ ] Slack MCP — 아직 설정 안 됨
- [ ] /commit — 사용 가능

Slack MCP부터 설정할까요?`
        },
        {
          command: "# 네, 진행해주세요",
          output: `Slack MCP를 설정하겠습니다.

1. /mcp 메뉴를 열겠습니다
2. "Slack" 커넥터를 선택합니다
3. OAuth 인증을 진행합니다

... (대화형으로 하나씩 진행)

✅ Slack MCP 연결 완료!

다음은 팀 팁을 알려드릴게요:
- PR 올리기 전에 반드시 /simplify 실행
- 긴급 이슈는 #hotfix 채널에 먼저 공유

스타터 태스크를 시작해볼까요?
→ "로컬 환경 구성 후 dev 서버 띄우기"`
        }
      ]
    }
  ],

  examples: [
    {
      id: "small-team",
      title: "소규모 팀 온보딩",
      content: `### 실전: 3인 개발팀의 온보딩 가이드

#### 시나리오

프론트엔드 개발자 3명으로 구성된 팀에 새 팀원이 합류합니다.

\`\`\`
팀 구성:
├── 리드 개발자 (가이드 생성자)
├── 시니어 개발자
├── 주니어 개발자
└── 새 팀원 (오늘 합류!)
\`\`\`

#### 리드가 생성한 가이드

\`\`\`
Work Type Breakdown:
  Build Feature   ████████████████░░░░  75%
  Improve Quality ████░░░░░░░░░░░░░░░░  15%
  Debug & Fix     ██░░░░░░░░░░░░░░░░░░  10%

Top Skills & Commands:
  /commit      ████████████████████  30x/month
  /simplify    ████████░░░░░░░░░░░░  12x/month

Top MCP Servers:
  Slack        ████████████████████  50 calls
  Figma        ████████░░░░░░░░░░░░  15 calls
\`\`\`

#### 팀 팁 (리드가 추가)

\`\`\`
1. 컴포넌트 작성 시 CLAUDE.md의 디자인 시스템 규칙을 참고해줘
2. Figma MCP로 디자인 토큰을 항상 확인 후 코딩
3. /simplify는 커밋 전에 무조건 실행 (팀 규칙)
4. 코드 리뷰는 PR 생성 후 #code-review 채널에 공유
\`\`\`

#### 효과

\`\`\`
Before: 새 팀원 적응에 1~2주
After:  첫날에 셋업 완료, 이틀째부터 PR 가능
\`\`\``,
      checklist: [
        "/team-onboarding을 실행하면 30일 사용 데이터가 자동 분석된다",
        "가이드에는 업무 유형, 커맨드, MCP, 셋업 체크리스트가 포함된다",
        "팀 팁과 스타터 태스크는 가이드 생성자가 직접 추가한다",
        "새 팀원은 ONBOARDING.md를 Claude Code에 붙여넣어 대화형 온보딩을 시작한다"
      ]
    },
    {
      id: "enterprise-team",
      title: "엔터프라이즈 팀 활용",
      content: `### 실전: 대규모 팀의 온보딩 표준화

#### 시나리오

10명 이상의 팀에서 분기마다 새 팀원이 합류합니다. 온보딩을 표준화하고 싶습니다.

#### 전략

\`\`\`
1. 팀 리드가 /team-onboarding으로 베이스 가이드 생성
2. 레포 root에 ONBOARDING.md 커밋
3. 분기마다 /team-onboarding 재실행으로 갱신
   (새 MCP, 커맨드, 업무 비중 변화 반영)
4. 팀원별 추가 팁은 PR로 기여
\`\`\`

#### 레포에 커밋하는 이점

\`\`\`
ONBOARDING.md가 레포에 있으면:
├── git clone 하면 자동으로 가이드도 받음
├── 변경 이력 추적 가능
├── PR로 팀원이 팁 추가 가능
└── CI/CD에서 유효성 검사 가능
\`\`\`

#### CLAUDE.md와의 관계

\`\`\`
CLAUDE.md                    ONBOARDING.md
──────────                   ──────────────
Claude가 읽는 규칙            새 팀원이 읽는 가이드
항상 자동 로드                붙여넣기로 사용
코드 컨벤션, 금지 사항        사용 통계, 셋업 방법
지속적으로 적용               온보딩 시 1회 사용

→ 서로 보완적! CLAUDE.md는 "규칙", ONBOARDING.md는 "안내서"
\`\`\`

#### 갱신 루틴

\`\`\`bash
# 분기마다 실행
> /team-onboarding

# 사용 패턴이 바뀌었으면 자동 반영
# - 새로 도입한 MCP 서버
# - 새로 자주 쓰는 커맨드
# - 업무 유형 비중 변화
\`\`\``,
      checklist: [
        "ONBOARDING.md를 레포에 커밋하면 git clone 시 자동 포함된다",
        "CLAUDE.md(규칙)와 ONBOARDING.md(안내서)의 역할 차이를 이해한다",
        "/team-onboarding을 주기적으로 재실행하면 가이드가 자동 갱신된다",
        "팀원이 PR로 팁을 추가하면 협업적 온보딩 문서가 된다"
      ]
    }
  ],

  quiz: [
    {
      question: "/team-onboarding이 분석하는 데이터의 기간은?",
      options: [
        "최근 7일",
        "최근 30일",
        "전체 사용 기록"
      ],
      answer: 1,
      explanation: "/team-onboarding은 지난 30일간의 Claude Code 사용 데이터를 분석합니다. 최근 한 달의 패턴이 팀의 현재 워크플로우를 가장 잘 반영하기 때문이에요."
    },
    {
      question: "/team-onboarding 가이드에서 자동 생성되지 않는 섹션은?",
      options: [
        "업무 유형 비중 (Work Type Breakdown)",
        "팀 팁 (Team Tips)",
        "셋업 체크리스트 (Setup Checklist)"
      ],
      answer: 1,
      explanation: "팀 팁(Team Tips)과 스타터 태스크(Get Started)는 자동 생성 시 TODO로 남습니다. 이 섹션은 가이드 생성자가 팀의 경험과 노하우를 직접 채워야 해요. 데이터로 알 수 없는 '사람의 지혜'가 필요한 부분이죠!"
    },
    {
      question: "새 팀원이 ONBOARDING.md를 Claude Code에 붙여넣으면?",
      options: [
        "설정 파일로 자동 적용된다",
        "Claude가 온보딩 버디로 변신해 대화형 안내를 시작한다",
        "자동으로 MCP 서버가 모두 연결된다"
      ],
      answer: 1,
      explanation: "ONBOARDING.md 하단에는 Claude를 위한 숨겨진 지시문(HTML 주석)이 있어요. 이걸 읽은 Claude가 '온보딩 버디' 모드로 전환되어, 셋업 체크리스트를 대화형으로 하나씩 진행하고 팀 팁도 알려줍니다."
    },
    {
      question: "CLAUDE.md와 ONBOARDING.md의 관계로 올바른 것은?",
      options: [
        "ONBOARDING.md가 CLAUDE.md를 대체한다",
        "CLAUDE.md는 '규칙', ONBOARDING.md는 '안내서'로 서로 보완적이다",
        "CLAUDE.md는 자동 생성, ONBOARDING.md는 수동 작성이다"
      ],
      answer: 1,
      explanation: "CLAUDE.md는 Claude가 항상 읽는 '규칙'이고, ONBOARDING.md는 새 팀원이 읽는 '안내서'입니다. 서로 보완적이에요. CLAUDE.md는 '코드를 이렇게 작성해라', ONBOARDING.md는 '팀에서 Claude를 이렇게 써요'를 알려줍니다."
    },
    {
      question: "/team-onboarding 가이드를 최신 상태로 유지하려면?",
      options: [
        "한 번 생성하면 영원히 사용 가능",
        "주기적으로 /team-onboarding을 재실행하여 갱신",
        "새 팀원이 합류할 때만 재생성"
      ],
      answer: 1,
      explanation: "분기마다 등 주기적으로 /team-onboarding을 재실행하면 새로 도입한 MCP 서버, 자주 쓰게 된 커맨드, 업무 유형 비중 변화가 자동으로 반영됩니다. 팀의 워크플로우는 계속 변하니까요!"
    }
  ]
};
