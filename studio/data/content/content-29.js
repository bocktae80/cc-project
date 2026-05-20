window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["29-goal-command"] = {
  overview: `## /goal — 완료 조건 기반 자율 실행

**GPS 내비게이션**을 떠올려보세요. "5분마다 위치 알려줘"가 아니라 **"목적지 도착할 때까지 가"**라고 지시합니다. 길이 막히면 우회, 신호 걸리면 대기, 도착하면 자동 종료. 시간이 아니라 **조건**으로 정의되는 자율 주행입니다.

v2.1.139에 추가된 \`/goal\`은 이 원리를 Claude Code에 적용한 **조건 기반 멀티턴 실행** 기능입니다. 완료 조건을 설정하면 Claude가 **턴을 넘어가며 자율적으로 진행**하고, 조건이 충족되면 스스로 종료합니다. interactive / \`-p\` / Remote Control 모두 동작하며, 실행 중에는 elapsed / turns / tokens 오버레이로 진행을 실시간 추적할 수 있습니다.

### 이런 상황에서 유용해요

- **테스트 통과까지 자동 수정**: \`/goal "전체 테스트 통과까지 실패 케이스 고쳐"\`
- **빌드 성공까지 의존성 정리**: \`/goal "tsc --noEmit 통과까지 타입 에러 해결"\`
- **보안 스캔 0건까지**: \`/goal "scripts/scan.sh의 high 이슈 0건까지 수정"\`
- **목표 커버리지 달성**: \`/goal "테스트 커버리지 80% 도달까지 누락 케이스 추가"\`

### 이 튜토리얼에서 배우는 것

| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | /goal의 동작 원리, /loop과의 차이, 완료 조건 작성법 | 💡 개념 |
| 2 | 인터랙티브 첫 실행, 헤드리스 -p 모드, 중도 종료/조건 변경 | 🔧 실습 |
| 3 | 테스트 통과 자율 수정, 보안 스캔 0건 달성 시나리오 | 💻 예제 |

### /loop vs /goal — 핵심 차이

\`\`\`
/loop (주기 기반)                /goal (조건 기반)
─────────────────                ────────────────────────────
"5분마다 X 해줘"                  "조건 충족할 때까지 X 해줘"
시간/주기 트리거                   완료 조건 트리거
끝이 명확하지 않음                 모델이 "끝났음" 자가 판단
적합: 외부 시스템 감시              적합: 결과 검증 가능한 자율 실행

비유: 알람 시계                   비유: GPS 내비게이션
\`\`\`

### 핵심 차별점

| 항목 | /loop | /goal |
|------|-------|-------|
| 트리거 | 주기 (5m, 10m, dynamic) | 완료 조건 |
| 종료 | 사용자 Esc / 만료 | 조건 충족 시 자동 |
| 진행 표시 | wakeup 카운트다운 | elapsed / turns / tokens 오버레이 |
| 헤드리스 모드 | \`-p\` 미지원 | \`-p\` 지원 |
| Remote Control | ✓ | ✓ |
| 적합한 상황 | 폴링 감시 | 자율 수정/검증 루프 |

> **핵심**: \`/goal\`은 "결과가 검증 가능한 작업"에 강합니다. 테스트 통과, 빌드 성공, 스캔 결과 0건처럼 모델이 객관적으로 "끝났는지" 판단할 수 있는 목표를 잡으세요.`,

  concepts: [
    {
      id: "what-is-goal",
      title: "/goal이란 무엇인가 (vs /loop)",
      content: `### GPS 내비게이션 비유

차를 운전할 때를 떠올려 봅시다.

\`\`\`
알람 시계 (=/loop)
  → "5분 후 알람" → 위치와 무관하게 울림
  → 도착했는지 안 했는지 모름
  → 사용자가 끄지 않으면 계속 울림

GPS 내비게이션 (=/goal)
  → "이마트 양재점 도착할 때까지"
  → 길 막히면 우회, 신호 걸리면 대기
  → 도착 즉시 "도착했습니다" 종료
  → 끝을 모델이 안다
\`\`\`

#### 핵심 차이: 종료 조건

| 도구 | 끝나는 시점 |
|------|----------|
| \`/loop 5m\` | 사용자가 Esc 누르거나 3일 만료 |
| \`/goal "테스트 통과까지"\` | 테스트 통과 시 모델이 자동 종료 |

\`\`\`bash
# /loop: 주기적 폴링 (시간 기반)
/loop 10m "scripts/health.sh 결과 보고"
# → 10분마다 health.sh를 실행해 결과를 보고
# → 끝없이 반복 (사용자가 멈춰야 함)

# /goal: 조건 기반 자율 실행
/goal "package.json의 test 스크립트가 통과할 때까지 실패 원인을 고치며 반복"
# → 모델이 test 실행 → 실패 → 분석 → 수정 → 재실행 자율 루프
# → 통과 즉시 "목표 달성" 메시지와 함께 종료
\`\`\`

> 결과가 검증 가능한 작업이면 \`/goal\`, 외부 상태 감시면 \`/loop\`을 쓰세요.`
    },
    {
      id: "goal-overlay",
      title: "진행 오버레이와 모드별 동작",
      content: `### 실행 중 오버레이

\`/goal\`이 활성화되면 화면 우상단에 진행 패널이 표시됩니다.

\`\`\`
┌─ Goal active ────────────────────────┐
│ test 통과까지 실패 원인을 고치며 반복 │
│                                      │
│ Elapsed: 02:14   Turns: 7            │
│ Tokens:  142,300 ($0.42 estimated)   │
└──────────────────────────────────────┘
\`\`\`

| 필드 | 의미 |
|------|------|
| **Goal** | 설정한 완료 조건 (truncate 가능) |
| **Elapsed** | 시작 후 경과 시간 |
| **Turns** | 모델이 응답을 만든 횟수 |
| **Tokens** | 누적 토큰 + 비용 추정 |

### 모드별 동작

\`\`\`bash
# 1) 인터랙티브 세션
claude
> /goal "전체 테스트 통과까지 실패 원인 수정"
# → 오버레이 표시, 사용자는 다른 질문을 끼워넣을 수 있음
# → /goal cancel 또는 Esc로 중도 종료

# 2) 헤드리스 (-p)
claude -p --goal "보안 스캔 high 0건까지" "scripts/scan.sh를 반복 실행하며 이슈 수정"
# → 비대화형 CI에서 자율 실행
# → 조건 충족 시 exit 0, 토큰/예산 한계 도달 시 exit 1

# 3) Remote Control (모바일/웹)
# → /goal로 시작한 작업이 백그라운드에서 계속
# → claude agents view에서 진행 추적
\`\`\`

> **헤드리스에서의 가치**: GitHub Actions나 야간 배치에서 "테스트 통과까지 시도"처럼 자가 수정 루프를 1줄로 표현할 수 있습니다. 기존엔 별도 스크립트 + 재시도 로직이 필요했습니다.`
    },
    {
      id: "goal-conditions",
      title: "좋은 완료 조건 작성법",
      content: `### 조건의 두 가지 결정 요소

\`/goal\`이 자율 종료하려면 **모델이 "끝났는지" 객관적으로 판단**할 수 있어야 합니다.

\`\`\`
좋은 조건 (모델이 판단 가능)
  ✓ "npm test가 exit 0으로 종료할 때까지"
  ✓ "tsc --noEmit이 에러 없이 통과할 때까지"
  ✓ "scripts/scan.sh의 high severity가 0건이 될 때까지"
  ✓ "coverage 리포트의 statements가 80% 이상일 때까지"

애매한 조건 (자가 종료 어려움)
  ✗ "코드가 깨끗해질 때까지"          ← 주관적
  ✗ "버그가 다 없어질 때까지"          ← 검증 불가
  ✗ "성능이 좋아질 때까지"            ← 기준 없음
  ✗ "사용자가 만족할 때까지"          ← 외부 입력 필요
\`\`\`

#### 검증 가능 vs 검증 불가

| 좋은 패턴 | 이유 |
|---------|------|
| 종료 코드 / 종료 메시지 | \`exit 0\`, "no errors" 같은 명시 신호 |
| 숫자 임계값 | "80% 이상", "0건", "10MB 이하" |
| 파일/경로 존재 | "dist/index.html이 생성될 때까지" |
| 외부 명령 결과 | 정해진 명령의 출력으로 판단 |

#### 토큰/시간 한계 명시

조건이 영원히 만족되지 않을 위험을 대비해 한계를 함께 정합니다.

\`\`\`bash
/goal --max-turns 20 --max-tokens 500000 "전체 테스트 통과까지 실패 원인 수정"
# 20턴 또는 500k 토큰 도달 시 조건 미충족이라도 종료
\`\`\`

| 한계 옵션 | 설명 |
|---------|------|
| \`--max-turns N\` | 최대 N턴 후 종료 |
| \`--max-tokens N\` | 누적 토큰 N 초과 시 종료 |
| \`--timeout 10m\` | 절대 시간 한계 |

> 한계 없이 \`/goal\`을 띄우면 "끝없이 시도"가 가능합니다. 자율 루프엔 반드시 안전망을 추가하세요.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 /goal — 인터랙티브 자율 수정",
      content: `### 기본 사용법 익히기

테스트 케이스 1개가 실패하는 상황에서 \`/goal\`로 자율 수정을 시켜봅시다.

#### 목표
- 실패하는 테스트를 \`/goal\`로 자동 수정
- 진행 오버레이 관찰
- 완료 후 결과 검증

#### 사전 조건
- v2.1.139 이상의 Claude Code CLI
- 테스트 러너가 설정된 프로젝트 (예: \`npm test\` 동작)`,
      terminals: [
        {
          command: "npm test",
          output: `FAIL  tests/utils/format.test.ts
  ● formatCurrency › handles negative numbers
    Expected: "-$1,234.56"
    Received: "$-1,234.56"

  ● formatCurrency › handles zero
    Expected: "$0.00"
    Received: "$0"

Tests: 2 failed, 18 passed`
        },
        {
          command: "/goal \"npm test가 0 실패로 통과할 때까지 src/utils/format.ts를 수정\" --max-turns 10",
          output: `┌─ Goal active ────────────────────────┐
│ npm test가 0 실패로 통과할 때까지... │
│ Elapsed: 00:00   Turns: 0            │
│ Tokens:  0       Max turns: 10       │
└──────────────────────────────────────┘

[Turn 1] format.ts 분석 중...
[Turn 1] 음수 처리 로직 발견: 부호 위치 잘못됨
[Turn 2] src/utils/format.ts 수정
[Turn 2] npm test 재실행
[Turn 3] handles negative numbers ✓
[Turn 3] handles zero 여전히 실패
[Turn 4] zero 케이스 분기 추가
[Turn 4] npm test 재실행
[Turn 5] Tests: 20 passed ✓

✓ Goal achieved (5 turns, 1m 42s, 38,200 tokens)`
        }
      ]
    },
    {
      id: "step-02",
      title: "헤드리스 -p 모드에서 자율 검증",
      content: `### CI/배치에서 활용

\`-p --goal\`로 비대화형 자율 실행을 합니다. 조건 충족 시 exit 0, 한계 도달 시 exit 1로 반환되므로 CI에서 후속 단계 분기에 활용할 수 있어요.

#### 목표
- GitHub Actions 또는 로컬 스크립트에서 \`-p --goal\` 호출
- 종료 코드로 성공/실패 판단`,
      terminals: [
        {
          command: "claude -p --goal \"scripts/scan.sh의 high severity가 0건일 때까지\" --max-turns 15 \"scan.sh를 반복 실행하며 보고된 이슈를 수정해줘\"",
          output: `[turn 1] scan.sh 실행 → high: 3건
[turn 1] auth/middleware.ts:42 — 입력 검증 누락 수정
[turn 2] scan.sh 재실행 → high: 2건
[turn 2] api/upload.ts:18 — 파일 타입 검증 추가
[turn 3] scan.sh 재실행 → high: 1건
[turn 3] db/query.ts:55 — 파라미터화 쿼리로 변환
[turn 4] scan.sh 재실행 → high: 0건 ✓

Goal achieved. Exit 0.`
        },
        {
          command: "echo $?",
          output: `0`
        }
      ]
    },
    {
      id: "step-03",
      title: "중도 종료와 조건 변경",
      content: `### 자율 루프를 멈추거나 방향 전환

\`/goal\`이 잘못된 방향으로 가고 있거나, 더 빠른 우회로가 보일 때 중도 개입할 수 있습니다.`,
      terminals: [
        {
          command: "/goal status",
          output: `Goal: tsc --noEmit이 에러 없이 통과할 때까지
Started: 5m 12s ago
Turns: 8 / 20 (max)
Tokens: 95,400 ($0.28)
Current: src/types/api.ts 수정 중`
        },
        {
          command: "/goal cancel",
          output: `Goal cancelled. Returning to interactive mode.
Summary:
- 8 turns, 5m 12s, 95,400 tokens
- 6 type errors fixed, 3 remaining
- Files modified: src/types/api.ts, src/types/user.ts`
        },
        {
          command: "/goal \"tsc --noEmit 통과까지\" --max-turns 5",
          output: `┌─ Goal active ────────────────────────┐
│ tsc --noEmit 통과까지                │
│ Elapsed: 00:00  Turns: 0  Max: 5     │
└──────────────────────────────────────┘

[남은 3개 에러부터 이어서 진행]`
        }
      ]
    }
  ],

  examples: [
    {
      id: "example-1",
      title: "테스트 통과까지 자율 수정 (자가 치유 루프)",
      content: `### 시나리오

CI가 빨간 상태로 PR을 받았다. 실패하는 5개 테스트를 자동 수정시키면서 다른 일을 한다.

\`\`\`bash
claude -p --goal "npm test가 0 실패로 통과할 때까지" --max-turns 25 \\
  "현재 실패 중인 테스트 5개의 원인을 분석하고 src/ 코드를 수정해 통과시켜줘. 테스트 코드 자체는 가급적 건드리지 마."
\`\`\`

#### 안전 가드

| 가드 | 이유 |
|------|------|
| \`--max-turns 25\` | 무한 루프 방지 |
| "테스트 코드 자체는 가급적 건드리지 마" | 테스트를 망가뜨려 통과시키는 회피 차단 |
| 사전 commit | 자동 수정 결과를 별도 commit으로 묶기 위한 베이스 |

#### 예상 결과 패턴

- **베스트**: 4~10턴 안에 모든 테스트 통과
- **부분 성공**: 일부 통과, 일부는 명확한 결함으로 보고 종료
- **에스컬레이션**: 25턴 도달 → 비정상 종료, 사람이 검토

> CI 워크플로우에 \`/goal\`을 끼우면 "테스트 빨강 → AI 1차 시도 → 결과 PR"이 자동화됩니다. 단, **실패 케이스를 항상 사람이 검토**해서 잘못된 수정이 PR로 직행하지 않도록 가드합니다.`
    },
    {
      id: "example-2",
      title: "보안 스캔 0건까지 자율 수정",
      content: `### 시나리오

리팩토링 PR에 새 보안 이슈가 7건 추가됐다. 배포 전까지 high severity만이라도 0건으로 만들고 싶다.

\`\`\`bash
/goal "scripts/security-scan.sh의 high severity가 0건이 될 때까지" --max-turns 15 --max-tokens 400000
\`\`\`

#### 단계별 자율 동작

\`\`\`
[Turn 1] scan.sh 실행 → high: 7, medium: 12
[Turn 1] high 7건 중 인증/권한 관련 3건 우선 식별

[Turn 2-3] auth 모듈 3건 수정 (입력 검증, 세션 토큰 마스킹, CSRF)
[Turn 4] scan.sh 재실행 → high: 4

[Turn 5-7] DB 쿼리 인젝션 4건을 파라미터화 쿼리로 변환
[Turn 8] scan.sh 재실행 → high: 0 ✓

✓ Goal achieved (8 turns, 6m 30s, 215,000 tokens)
\`\`\`

#### 보완 패턴

| 패턴 | 효과 |
|------|------|
| 사전 git checkout -b | 변경을 별도 브랜치에 격리 |
| \`--max-tokens 400000\` | 예산 한계 명시 |
| 사후 \`/ultrareview\` 실행 | 자율 수정 결과를 멀티 에이전트로 재검증 |
| **사람의 최종 PR 머지** | 자율 수정도 사람 승인 필수 |

\`\`\`
자율 수정 → 사후 검증 → 사람 머지

기존: 수동 수정 → 사람 리뷰 → 사람 머지
이후: /goal 자율 수정 → /ultrareview 자동 리뷰 → 사람 머지
       시간 단축은 첫 두 단계에서 발생, 최종 책임은 사람
\`\`\`

> \`/goal\`은 **사람의 책임을 대신하지 않습니다**. 자율 수정 → 자동 검증 → 사람 머지 흐름을 만들어 시간을 줄이고, 최종 결정은 사람이 합니다.`
    }
  ],

  quiz: [
    {
      question: "/goal과 /loop의 가장 큰 차이는 무엇인가요?",
      options: [
        "/goal은 더 빠르다",
        "/goal은 완료 조건 충족 시 자동 종료, /loop은 주기 기반으로 사용자가 멈춰야 함",
        "/loop은 헤드리스 모드 전용이다"
      ],
      answer: 1,
      explanation: "/goal은 **조건 기반**, /loop은 **주기 기반**입니다. /goal은 모델이 '끝났는지' 객관적으로 판단할 수 있으면 스스로 종료하지만, /loop은 사용자가 Esc로 중지하거나 3일 만료까지 계속 반복됩니다."
    },
    {
      question: "다음 중 /goal에 가장 적합한 완료 조건은?",
      options: [
        "코드가 깨끗해질 때까지",
        "npm test가 exit 0으로 통과할 때까지",
        "사용자가 만족할 때까지"
      ],
      answer: 1,
      explanation: "/goal은 모델이 객관적으로 검증할 수 있는 조건이 필요합니다. **종료 코드/숫자 임계값/파일 존재** 같은 명시적 신호가 좋아요. '깨끗해질 때까지', '만족할 때까지'는 주관적이라 자가 종료가 불가능합니다."
    },
    {
      question: "/goal에 --max-turns를 지정하지 않으면 어떤 위험이 있나요?",
      options: [
        "토큰을 적게 쓴다",
        "조건이 영원히 충족되지 않을 경우 무한 루프 가능",
        "Remote Control에서 보이지 않는다"
      ],
      answer: 1,
      explanation: "조건이 충족되지 않으면 /goal은 계속 시도합니다. 영원히 통과할 수 없는 테스트나 도달 불가능한 임계값을 지정하면 토큰을 무한 소비할 수 있어요. **--max-turns 또는 --max-tokens 한계를 반드시 명시**하세요."
    },
    {
      question: "헤드리스 모드(-p)에서 /goal이 조건을 충족하면 종료 코드는?",
      options: [
        "1 (실패)",
        "0 (성공)",
        "종료 코드 없음"
      ],
      answer: 1,
      explanation: "/goal이 조건 충족으로 자율 종료하면 **exit 0**, --max-turns/--max-tokens 한계 도달로 중단되면 **exit 1**입니다. CI 파이프라인에서 후속 단계 분기에 활용할 수 있어요."
    },
    {
      question: "/goal로 자율 수정한 결과를 그대로 main에 머지해도 되나요?",
      options: [
        "네, AI가 검증했으니 안전합니다",
        "아니요, /ultrareview 같은 자동 검증을 거친 뒤에도 **사람이 최종 머지** 결정",
        "아니요, /goal은 머지를 자동으로 시도합니다"
      ],
      answer: 1,
      explanation: "/goal은 시간을 절약하는 자율 도구지만 **사람의 책임을 대신하지 않습니다**. 자율 수정 → 자동 검증(/ultrareview 등) → 사람의 최종 머지가 안전한 패턴이에요. 잘못된 수정이 그대로 배포되지 않도록 가드합니다."
    }
  ]
};
