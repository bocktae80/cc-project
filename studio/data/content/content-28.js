window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["28-ultrareview"] = {
  overview: `## /ultrareview — 클라우드 멀티 에이전트 코드 리뷰

**공항 보안 검색대**를 떠올려보세요. 한 명의 보안 요원이 가방을 쭉 훑어보는 대신, **금속 탐지기, X-ray 스캐너, 폭발물 탐지견, 수화물 검사관**이 병렬로 각자 다른 각도에서 동시에 검사합니다. 여러 전문가의 검사 결과를 통합하면 혼자서는 놓칠 문제도 잡히죠.

v2.1.111에 추가된 \`/ultrareview\`는 이 원리를 코드 리뷰에 적용한 **클라우드 기반 멀티 에이전트 병렬 리뷰** 기능입니다. 여러 에이전트가 동시에 분석하고 서로의 결과를 크리틱(critique)하여 **한 명의 리뷰어가 놓치는 이슈까지 잡아냅니다**.

### 이런 상황에서 유용해요
- **대형 PR**: 500줄 넘는 변경을 놓친 것 없이 훑어보고 싶을 때
- **보안 민감 변경**: 권한/인증/SQL 변경처럼 **다각도 검토**가 필요할 때
- **배포 직전 최종 점검**: 리뷰어가 이미 LGTM 했지만 한 번 더 크로스체크
- **리뷰어 부재**: 팀원이 리뷰 대기 걸려있지 않을 때 AI로 1차 리뷰

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | /ultrareview의 동작 원리, /review와의 차이, 병렬 멀티 에이전트 구조 | 💡 개념 |
| 2 | 현재 브랜치 리뷰, PR 번호로 리뷰, diffstat/애니메이션 활용 | 🔧 실습 |
| 3 | 기능 PR 종합 리뷰, 보안 민감 PR 시나리오 | 💻 예제 |

### /review vs /ultrareview

\`\`\`
/review (로컬)                    /ultrareview (클라우드)
─────────────────                ─────────────────────────
1명의 에이전트                     여러 에이전트 병렬
                                  + 서로 크리틱
한 번에 쭉 훑어보기                여러 각도 동시 검사
                                  (보안/성능/스타일/로직)
로컬에서 실행                      클라우드에서 실행
                                  (내 세션 블록 안 함)
즉시 결과                          조금 더 오래 걸림
                                  (하지만 깊이 있음)

비유: 1인 보안요원             비유: 공항 보안검색대
     가방 한 번 훑어보기            병렬 다각도 스캔
\`\`\`

### 핵심 차별점

| 항목 | /review | /ultrareview |
|------|---------|--------------|
| 실행 위치 | 로컬 세션 | 클라우드 |
| 에이전트 수 | 1개 | 여러 개 병렬 |
| 크리틱 루프 | 없음 | 있음 (에이전트 간) |
| 세션 블로킹 | 결과 나올 때까지 | 백그라운드 |
| PR 입력 | 현재 diff | 현재 브랜치 OR \`<PR#>\` |
| 적합한 상황 | 빠른 자체 점검 | 배포 전/대형 PR |

> **핵심**: \`/ultrareview\`는 "혼자 리뷰하면 놓칠까 걱정되는 변경"을 **여러 에이전트가 다각도로** 검토해주는 클라우드 리뷰 서비스입니다. v2.1.113에서는 런치가 병렬화되고 diffstat이 런치 다이얼로그에 바로 표시됩니다.`,

  concepts: [
    {
      id: "what-is-ultrareview",
      title: "/ultrareview란 무엇인가 (vs /review)",
      content: `### 공항 보안검색대 비유

공항에서 수화물을 검사할 때를 떠올려 봅시다.

\`\`\`
1인 보안 요원 (=/review)
  → "가방 내용 한 번 훑어봤어요. 이상 없어 보여요."
  → 빠르지만 놓치는 게 있을 수 있음

병렬 검색대 (=/ultrareview)
  → 금속 탐지기: "금속성 물체 3개"
  → X-ray: "액체 용기 주의"
  → 탐지견: "화학 잔여물 음성"
  → 수화물 검사관: "서류 정상"
  → 종합 리포트 + 서로 이견 조율
\`\`\`

#### 언제 어느 것을 쓸까?

| 상황 | 추천 도구 | 이유 |
|------|----------|------|
| 3~4줄 오타 수정 | \`/review\` | 오버엔지니어링 |
| 기능 PR (100~300줄) | \`/review\` | 로컬에서 충분 |
| 큰 PR (500줄+) | **\`/ultrareview\`** | 병렬 검토 효과 큼 |
| 보안/인증 변경 | **\`/ultrareview\`** | 여러 각도 필요 |
| 배포 직전 최종 점검 | **\`/ultrareview\`** | 크로스체크 |
| 리뷰어 없이 혼자 머지 | **\`/ultrareview\`** | AI 팀 리뷰 대체 |

#### 사용 기본형

\`\`\`bash
# 1) 현재 브랜치 (인자 없이)
/ultrareview

# 2) 특정 PR
/ultrareview 142
/ultrareview https://github.com/org/repo/pull/142
\`\`\`

> **핵심 요약**: \`/ultrareview\`는 \`/review\`의 "대형·보안 버전". 로컬 1인 리뷰 대신 **클라우드에서 여러 에이전트가 병렬로** 검사합니다. v2.1.111에서 처음 추가되었고 v2.1.113에서 런치 속도가 개선되었습니다.`
    },
    {
      id: "parallel-multi-agent",
      title: "병렬 멀티 에이전트 + 크리틱",
      content: `### 왜 "멀티 에이전트"인가?

혼자 리뷰하면 세 가지 함정이 있어요:

\`\`\`
함정 1: 초점 편향
  → 성능에 집중하다 보안 놓침
  → 스타일만 보다 로직 오류 놓침

함정 2: 확증 편향
  → "이 사람 코드는 보통 괜찮으니..."

함정 3: 피로
  → 500줄 넘어가면 뒷부분 대충 보게 됨
\`\`\`

\`/ultrareview\`는 **여러 에이전트가 서로 다른 초점으로 동시에 검사** + **서로의 결과를 크리틱(critique)**해서 이 함정들을 줄입니다.

#### 동작 흐름

\`\`\`
[1단계] 런치 다이얼로그
  ┌──────────────────────────────────┐
  │ /ultrareview                      │
  │ Branch: feature/auth-refactor     │
  │ Diffstat: 12 files, +340 -120     │  ← v2.1.113 신규
  │ [Launching...] (애니메이션)        │  ← v2.1.113 신규
  └──────────────────────────────────┘

[2단계] 병렬 실행 (클라우드)
  ├─ Agent A: 로직/버그 집중 검사
  ├─ Agent B: 보안/권한 집중 검사
  ├─ Agent C: 성능/복잡도 집중 검사
  └─ Agent D: 스타일/컨벤션 집중 검사

[3단계] 크리틱 라운드
  → 각 에이전트 결과를 서로 검토
  → 중복/과잉 이슈 축약
  → 공통적으로 지적된 이슈 강조

[4단계] 통합 리포트
  ├─ 🔴 Critical: 보안 취약점 (A+B 공통)
  ├─ 🟡 Warning: 성능 이슈 (C 지적)
  └─ 🟢 Suggestion: 스타일 개선 (D 지적)
\`\`\`

#### "parallelized checks" (v2.1.113 개선)

\`\`\`
v2.1.111: 런치 = 순차적 (에이전트 준비 후 시작)
v2.1.113: 런치 = 병렬 → 시작 속도 개선
          런치 다이얼로그에 diffstat 즉시 표시
          "Launching..." 애니메이션 상태 표시
\`\`\`

> **비유**: 여러 명이 같은 문서를 동시에 읽고 메모한 뒤 모여서 "나는 이게 걱정돼", "나는 이게 걸렸어"를 교차검증하는 방식. 혼자 읽는 것보다 시간은 비슷한데 **놓치는 게 적어요**.

> **핵심 요약**: /ultrareview는 **여러 전문 에이전트가 병렬**로 다른 초점에서 리뷰하고, 결과를 **서로 크리틱**해서 통합 리포트를 만듭니다. v2.1.113에서는 런치가 병렬화되고 diffstat이 런치 다이얼로그에 표시됩니다.`
    },
    {
      id: "pr-review-mode",
      title: "/ultrareview <PR#> — GitHub PR 모드",
      content: `### PR 번호로 원격 PR 리뷰

v2.1.111에서 \`/ultrareview\`는 **현재 브랜치뿐 아니라 GitHub PR**도 리뷰할 수 있게 되었습니다.

#### 세 가지 입력 방식

\`\`\`bash
# 1) 인자 없음 → 현재 브랜치
/ultrareview

# 2) PR 번호 → 같은 레포의 PR 자동 조회
/ultrareview 142

# 3) PR URL → 다른 레포의 PR도 리뷰
/ultrareview https://github.com/org/repo/pull/142
\`\`\`

#### 동작 방식

\`\`\`
/ultrareview 142
  ↓
[1] \`gh\` CLI로 PR 메타데이터 조회
     → 제목, 설명, base/head 브랜치, diff
[2] diff를 클라우드에 전송
[3] 멀티 에이전트 병렬 리뷰
[4] 통합 리포트 + 각 코멘트 위치(라인 번호)
\`\`\`

#### 권한과 보안

| 입력 | 필요 권한 |
|------|----------|
| 현재 브랜치 | 없음 (로컬 git 사용) |
| PR 번호 | \`gh\` CLI 인증 |
| PR URL (다른 레포) | 해당 레포 읽기 권한 |

> **주의**: PR 리뷰 모드는 PR의 diff를 클라우드로 전송합니다. **민감한 private 저장소**는 조직 정책 확인이 필요해요.

#### /review와의 워크플로우 차이

\`\`\`
/review:
  "내가 방금 쓴 코드" 리뷰
  (working tree + unstaged)

/ultrareview:
  "이미 커밋되고 PR로 올라간 변경" 리뷰
  (feature branch vs base)

/ultrareview <PR#>:
  "다른 사람이 올린 PR" 리뷰
  (AI가 1차 리뷰어 역할)
\`\`\`

> **팁**: 팀 리뷰어가 바쁠 때 \`/ultrareview <PR#>\`로 1차 AI 리뷰를 먼저 받고, 거기서 나온 이슈를 해결한 뒤 사람 리뷰어에게 넘기면 **리뷰 라운드가 줄어듭니다**.

> **핵심 요약**: \`/ultrareview\`는 인자 없이(현재 브랜치), PR 번호(\`142\`), PR URL 3가지로 입력 가능합니다. 특히 \`<PR#>\` 형태는 "AI 1차 리뷰 → 사람 리뷰" 2단 리뷰 파이프라인을 구성할 때 유용합니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 /ultrareview — 현재 브랜치 리뷰",
      content: `### 기본 사용법 익히기

현재 작업 중인 feature 브랜치에 \`/ultrareview\`를 실행해봅시다.

#### 목표
- 현재 브랜치의 변경 내용을 /ultrareview로 제출
- 런치 다이얼로그에서 diffstat 확인 (v2.1.113)
- 통합 리포트 읽기

#### 사전 조건
- v2.1.111 이상의 Claude Code CLI
- git 워킹트리에서 feature 브랜치에 체크아웃되어 있을 것
- base 브랜치(main 등) 대비 변경이 있어야 함`,
      terminals: [
        {
          command: "git status",
          output: `On branch feature/auth-refactor
Your branch is ahead of 'origin/main' by 4 commits.

Changes to be committed:
  modified:   src/auth/middleware.ts
  modified:   src/auth/session.ts
  new file:   src/auth/token-validator.ts
  modified:   tests/auth/session.test.ts`
        },
        {
          command: "/ultrareview",
          output: `┌─────────────────────────────────────────┐
│ /ultrareview                              │
│ Branch: feature/auth-refactor             │
│ Base:   main                              │
│ Diffstat: 4 files, +220 -85               │  ← v2.1.113
│                                           │
│ [Launching parallel agents...]            │  ← v2.1.113 애니메이션
└─────────────────────────────────────────┘

Submitted to cloud. Running 4 agents in parallel.
Session unblocked — you can continue working.`
        },
        {
          command: "(잠시 후 결과 도착)",
          output: `━━━ /ultrareview Report ━━━

🔴 Critical (2)
  [src/auth/token-validator.ts:34]
    Agent A, B 공통: token 만료 체크 누락 가능성
    → 만료된 토큰이 통과될 수 있음
  [src/auth/session.ts:112]
    Agent B: 세션 ID가 평문 로그에 기록됨

🟡 Warning (3)
  [src/auth/middleware.ts:58]
    Agent C: 요청마다 JSON.parse — 캐시 가능
  [tests/auth/session.test.ts:22]
    Agent D: describe 블록 depth > 3, 가독성 저하
  ...

🟢 Suggestion (5)
  [src/auth/middleware.ts:12]
    Agent D: \`any\` 타입 사용 — \`unknown\` 권장
  ...

Summary: 2 critical, 3 warnings, 5 suggestions`
        }
      ]
    },
    {
      id: "step-02",
      title: "/ultrareview <PR#> — GitHub PR 리뷰",
      content: `### 팀원의 PR을 AI 1차 리뷰로 받기

동료가 올린 PR #142를 사람 리뷰 전에 AI로 1차 훑어봅시다.

#### 목표
- PR 번호로 /ultrareview 실행
- \`gh\` CLI 인증 확인
- 다른 레포 PR도 URL로 지정

#### 사전 조건
- \`gh auth status\` 인증 완료
- PR이 있는 레포에 대한 읽기 권한`,
      terminals: [
        {
          command: "gh auth status",
          output: `✓ Logged in to github.com as kent
✓ Token scopes: 'repo', 'read:org'`
        },
        {
          command: "/ultrareview 142",
          output: `Fetching PR #142 via gh CLI...
✓ PR: "Refactor auth middleware for session isolation"
  Author: @alice
  Base: main
  Head: feature/session-isolation
  Diffstat: 7 files, +180 -95

[Launching parallel agents...]

Submitted. You'll get a notification when review is ready.`
        },
        {
          command: "# 다른 레포의 PR도 URL로 지정 가능",
          output: `> /ultrareview https://github.com/anthropics/example-repo/pull/42

Fetching from anthropics/example-repo...
✓ Read access confirmed
✓ PR #42: "Add retry logic to webhook delivery"

[Launching...]`
        },
        {
          command: "# 결과를 PR 코멘트로 복사",
          output: `━━━ /ultrareview Report (PR #142) ━━━

🔴 Critical (1)
  [src/auth/isolation.ts:89]
    세션 분리 로직의 race condition 가능성
    에이전트 A+C 공통 지적

🟡 Warning (2)
  ...

/copy  → 리포트를 복사해서 PR 코멘트에 붙여넣을 수 있음`
        }
      ]
    },
    {
      id: "step-03",
      title: "런치 다이얼로그 활용 & 취소",
      content: `### diffstat 미리보기와 잘못 제출한 리뷰 취소

v2.1.113부터 런치 다이얼로그가 **diffstat을 즉시 표시**하고, 런치 도중 **취소**도 가능해졌습니다.

#### 목표
- 런치 다이얼로그에서 diffstat으로 **잘못 제출 방지**
- 의도와 다른 리뷰면 Esc로 취소
- 런치 애니메이션으로 상태 확인

#### 언제 취소해야 하나?
- diffstat이 예상보다 훨씬 큼 → 분리 PR로 나누고 재제출
- 잘못된 브랜치 → 체크아웃 후 재실행`,
      terminals: [
        {
          command: "/ultrareview",
          output: `┌─────────────────────────────────────────┐
│ /ultrareview                              │
│ Branch: feature/accidental-big-change     │
│ Base:   main                              │
│ Diffstat: 48 files, +3,800 -1,200   ← 너무 큼!│
│                                           │
│ [Press Enter to launch, Esc to cancel]    │
└─────────────────────────────────────────┘

> (Esc)

Cancelled. No cloud submission made.`
        },
        {
          command: "# PR을 분리해서 작은 단위로 재실행",
          output: `$ git checkout -b feature/part-1
$ git cherry-pick <commits>
$ /ultrareview

Diffstat: 8 files, +340 -120   ← 이제 적당한 크기
[Launching...]`
        },
        {
          command: "# 런치 진행 중 취소 (v2.1.113)",
          output: `[Launching parallel agents...]
▓▓▓▓░░░░░░ 40% (Agent A ready, B preparing...)

> (Esc)

Launch cancelled. No credits consumed for un-launched agents.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "feature-pr-review",
      title: "예제 1 — 기능 PR 종합 리뷰",
      content: `### 시나리오: 결제 모듈에 Stripe 연동 추가

**PR**: feature/stripe-integration
**변경**: 12 파일, +520 -80
**리뷰어**: 팀 리뷰어 1명 배정되어 있으나 미팅 중

#### 목표
- 사람 리뷰어 대기 시간 동안 AI 1차 리뷰
- 발견된 이슈 먼저 고친 뒤 사람 리뷰 넘기기
- 리뷰 라운드 1회 감소 → 머지 속도 향상

#### 실행

\`\`\`bash
$ /ultrareview
Diffstat: 12 files, +520 -80

[Launching...]
(3분 후 결과 도착)
\`\`\`

#### 결과 예시

\`\`\`
🔴 Critical (1)
  [src/payment/stripe.ts:78]
    A+B 공통: webhook 서명 검증이 try/catch로 감싸져 있으나
    catch에서 에러를 삼킴 → 위조 webhook 통과 가능

🟡 Warning (4)
  [src/payment/stripe.ts:145]
    C: axios.post가 timeout 설정 없음 — Stripe 장애 시 행 걸림
  [src/payment/webhook.ts:33]
    C: 동일 이벤트 중복 처리 방어 (idempotency key) 없음
  [tests/payment/stripe.test.ts:18]
    D: mock 응답이 실제 Stripe 스키마와 다름
  [src/payment/types.ts:5]
    D: \`any\` 타입 3곳 — \`Stripe.Event\` 사용 가능

🟢 Suggestion (6)
  ...
\`\`\`

#### 대응

1. **Critical 먼저 수정**: webhook 서명 검증 catch 블록 제거, 상위로 throw
2. **Warning 수정**: timeout 5000ms 추가, idempotency key 도입
3. **재제출**: \`/ultrareview\`로 재확인
4. **사람 리뷰 넘기기**: 남은 suggestion은 리뷰어 판단에 맡김

#### 효과

\`\`\`
전: 사람 리뷰 → critical 발견 → 수정 → 재리뷰 (2라운드)
후: AI 리뷰 → critical 선제 수정 → 사람 리뷰 LGTM (1라운드)
\`\`\``,
      checklist: [
        "/ultrareview로 PR 전체를 병렬 검사할 수 있다",
        "에이전트 간 공통 지적(A+B 공통)의 의미를 이해한다",
        "Critical → Warning → Suggestion 우선순위를 구분할 수 있다",
        "AI 1차 리뷰 → 사람 2차 리뷰 파이프라인을 설계할 수 있다"
      ]
    },
    {
      id: "security-sensitive-pr",
      title: "예제 2 — 보안 민감 PR (권한 + 의존성)",
      content: `### 시나리오: 권한 시스템 리팩토링

**PR**: refactor/rbac-permissions (#208)
**변경**: 23 파일, +890 -420
**특징**: 권한 체크 로직 변경 + 새 npm 패키지 2개 추가

이런 PR은 **여러 각도 검토**가 필수입니다. \`/ultrareview\`의 가치가 가장 큰 케이스예요.

#### 목표
- 권한 로직의 회귀(regression) 탐지
- 새 의존성의 취약점 확인
- 테스트 커버리지 검증

#### 실행

\`\`\`bash
$ /ultrareview 208

Fetching PR #208...
Diffstat: 23 files, +890 -420
  - src/rbac/*: 8 files changed
  - package.json: +2 deps
  - tests/rbac/*: 6 files changed

[Launching...]
\`\`\`

#### 결과 예시

\`\`\`
🔴 Critical (3)
  [src/rbac/check.ts:112]
    A+B 공통: 관리자 권한 체크에서 \`user.role === 'admin'\`만 확인
    → role이 배열로 변경되었는데 단일 값 비교 남아있음
    → 기존 관리자 전부 권한 상실 가능!

  [package.json]
    B (보안 초점): 추가된 \`some-rbac-lib@0.3.1\`은 CVE-2025-XXXX 영향
    → 0.4.2 이상으로 업그레이드 필요

  [src/rbac/middleware.ts:45]
    B: JWT 서명 검증 전에 payload를 신뢰하고 user.id 추출
    → 위조 토큰으로 우회 가능

🟡 Warning (5)
  [tests/rbac/check.test.ts]
    D: role 배열 케이스 테스트 없음 → 회귀 못 잡음
  [src/rbac/cache.ts:78]
    C: 권한 캐시 TTL 무한 — 권한 철회가 즉시 반영 안 됨
  ...

🟢 Suggestion (7)
  ...
\`\`\`

#### 대응 전략

| 이슈 | 액션 | 담당 |
|------|------|------|
| role 배열 회귀 | 즉시 수정 + 테스트 추가 | 본인 |
| CVE 의존성 | 0.4.2로 업그레이드 | 본인 |
| JWT 검증 순서 | 검증 먼저로 재배치 | 본인 |
| 캐시 TTL | 별도 PR로 분리 | 본인 |
| 스타일 개선 | 리뷰어에게 넘김 | 리뷰어 |

#### 왜 /review가 아니라 /ultrareview?

\`\`\`
/review (1인):
  "RBAC 변경 잘 된 것 같아요"
  ← 3개 중 1개만 잡을 가능성

/ultrareview (멀티 에이전트):
  Agent A: 로직 — role 배열 회귀 발견
  Agent B: 보안 — CVE + JWT 순서 발견
  Agent C: 성능 — 캐시 TTL 발견
  Agent D: 테스트 — 커버리지 부족 발견
  ← 모두 다른 초점 → 종합 탐지
\`\`\``,
      checklist: [
        "보안 민감 PR에 /ultrareview가 특히 유용한 이유를 설명할 수 있다",
        "에이전트별 초점(로직/보안/성능/테스트) 차이를 이해한다",
        "의존성 CVE 탐지를 리뷰 프로세스에 포함시킬 수 있다",
        "이슈별 우선순위로 대응 계획을 세울 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "/ultrareview가 /review와 가장 크게 다른 점은?",
      options: [
        "더 빠르다",
        "여러 에이전트가 병렬로 리뷰하고 서로 크리틱한다",
        "로컬에서만 동작한다"
      ],
      answer: 1,
      explanation: "/ultrareview는 클라우드에서 **여러 에이전트가 병렬로** 다른 초점(로직/보안/성능/스타일)에서 검사하고, 서로의 결과를 크리틱해서 통합 리포트를 만듭니다. /review는 로컬 1인 에이전트 리뷰예요."
    },
    {
      question: "다음 중 /ultrareview에 가장 적합한 상황은?",
      options: [
        "3줄 오타 수정 PR",
        "500줄 넘는 권한 시스템 리팩토링 PR",
        "README.md 문구 변경"
      ],
      answer: 1,
      explanation: "대형 PR + 보안 민감 변경이 /ultrareview의 가치가 가장 큰 케이스입니다. 짧은 오타 수정에는 오버엔지니어링이에요."
    },
    {
      question: "/ultrareview <PR#> (예: /ultrareview 142) 실행에 필요한 것은?",
      options: [
        "PR이 반드시 내 개인 저장소에 있어야 함",
        "gh CLI 인증 + 해당 레포 읽기 권한",
        "추가 API 키 발급"
      ],
      answer: 1,
      explanation: "PR 번호 모드는 gh CLI로 PR 메타데이터를 조회합니다. gh auth status가 인증된 상태이고 해당 레포에 읽기 권한이 있으면 동작해요."
    },
    {
      question: "v2.1.113에서 /ultrareview가 개선된 점은?",
      options: [
        "런치가 병렬화되어 빨라지고, 런치 다이얼로그에 diffstat이 바로 표시됨",
        "로컬 전용으로 변경됨",
        "결과가 이메일로만 발송됨"
      ],
      answer: 0,
      explanation: "v2.1.113에서 런치 자체가 병렬화되어 빨라졌고, 런치 다이얼로그에 diffstat이 미리 표시되어 **잘못된 브랜치/너무 큰 PR을 사전에 감지**할 수 있게 되었습니다. 런치 상태는 애니메이션으로 표시돼요."
    },
    {
      question: "실행 중 런치 다이얼로그에서 diffstat이 예상보다 훨씬 큰 걸 발견하면?",
      options: [
        "Enter로 그대로 제출한다",
        "Esc로 취소한 뒤 PR을 작은 단위로 분리한다",
        "CLI를 강제 종료한다"
      ],
      answer: 1,
      explanation: "대형 PR을 그대로 제출하면 리뷰 결과의 초점이 흐려집니다. Esc로 취소한 뒤 PR을 기능 단위로 분리하고 각각 /ultrareview하는 것이 더 좋은 리뷰 결과를 얻는 방법이에요."
    }
  ]
};
