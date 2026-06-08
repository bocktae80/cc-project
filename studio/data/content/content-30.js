window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["30-dynamic-workflows"] = {
  overview: `## /workflows — 백그라운드 다중 에이전트 오케스트레이션

**오케스트라 지휘자**를 떠올려보세요. 지휘자 한 명이 바이올린 5명, 첼로 3명, 관악기 8명에게 "지금 들어와", "여기서 빠져"를 동시에 지시합니다. 모든 연주자가 병렬로 움직이지만 결과는 하나의 곡이 됩니다.

v2.1.154에 추가된 \`/workflows\`는 Opus 4.8 출시와 함께 도입된 **백그라운드 멀티 에이전트 오케스트레이션** 기능입니다. "이 워크플로우 만들어줘"라고 요청하면 Claude가 **수십~수백 개의 서브에이전트**를 백그라운드에서 동시에 돌려 큰 작업을 쪼개고 합칩니다.

### 이런 상황에서 빛납니다

- **모노레포 마이그레이션**: 100개 패키지를 동시에 검사·수정
- **대규모 리팩토링**: 50개 파일에서 deprecated API를 찾아 일괄 교체
- **벤치마크 그리드**: 서로 다른 입력 50개에 대해 모델 응답을 동시 비교
- **테스트 폭격**: 100개 시나리오를 동시 실행해 결과 집계
- **다중 리뷰**: PR을 보안/성능/스타일 관점에서 병렬 검토 후 단일 리포트로 머지

### 이 튜토리얼에서 배우는 것

| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | /workflows의 동작 원리, /loop·/goal과의 차이, Opus 4.8과의 시너지 | 💡 개념 |
| 2 | 첫 워크플로우 만들기, /workflows로 모니터링, 백그라운드 결과 회수 | 🔧 실습 |
| 3 | 모노레포 마이그레이션, 다중 리뷰 폭격 시나리오 | 💻 예제 |

### /loop vs /goal vs /workflows — 자율 실행 3축

\`\`\`
/loop                       /goal                       /workflows
─────────────────────       ──────────────────────       ─────────────────────────
"5분마다 X 해줘"             "조건 충족할 때까지 X"        "X 워크플로우 만들어 돌려"
주기 트리거                   조건 트리거                   다중 에이전트 오케스트레이션
시간/주기 기반                결과 검증 기반                작업 분해 + 병렬 실행
단일 컨텍스트                 단일 컨텍스트                 N개 컨텍스트 (동시)

비유: 알람 시계               비유: GPS 내비게이션          비유: 오케스트라 지휘자
\`\`\`

### 핵심 차별점

| 항목 | /loop | /goal | /workflows |
|------|-------|-------|------------|
| 트리거 | 주기 | 완료 조건 | 작업 분해 |
| 동시 실행 | 1 | 1 | 수십~수백 |
| 종료 | 사용자/만료 | 조건 충족 | 모든 서브태스크 완료 |
| 적합 작업 | 폴링 감시 | 자율 수정 루프 | 대규모 분산 작업 |
| Opus 4.8 시너지 | 일반 | 일반 | **\`/effort xhigh\`로 큰 워크플로우 설계** |

> **핵심**: \`/workflows\`는 "한 명이 못하는 양"을 분해해 동시에 처리합니다. Opus 4.8의 향상된 판단력과 \`xhigh\` effort가 큰 워크플로우를 설계할 때 시너지를 냅니다.`,

  concepts: [
    {
      id: "what-is-workflows",
      title: "/workflows란 무엇인가 (vs /loop, /goal)",
      content: `### 오케스트라 지휘자 비유

대규모 합주를 떠올려 봅시다.

\`\`\`
알람 시계 (=/loop)
  → "5분마다 한 번 연주" → 시간 기반
  → 같은 곡을 반복

GPS (=/goal)
  → "목적지 도착까지 운전" → 결과 검증 기반
  → 도착하면 자동 종료

오케스트라 지휘자 (=/workflows)
  → "곡을 100개 악기에 나눠 동시 연주"
  → 작업을 N개 에이전트에게 분배
  → 모두 끝나면 결과를 합쳐 단일 산출물로
\`\`\`

#### 핵심 차이: 병렬도

| 도구 | 동시 실행 에이전트 수 |
|------|---------------------|
| \`/loop 5m\` | 1 (시간 기반 반복) |
| \`/goal "테스트 통과까지"\` | 1 (단일 컨텍스트) |
| \`/workflows ...\` | **수십~수백** (백그라운드 병렬) |

\`\`\`bash
# /loop: 한 컨텍스트에서 주기 반복
/loop 10m "scripts/health.sh 결과 보고"

# /goal: 한 컨텍스트에서 조건 충족까지
/goal "npm test 통과까지 src/ 수정"

# /workflows: 작업을 쪼개 N개 에이전트가 동시에
claude "packages/ 아래 50개 패키지에서 deprecated lodash.merge를
       Object.assign으로 마이그레이션하는 워크플로우 만들어줘"
# → Claude가 워크플로우를 계획하고 백그라운드 실행
# → /workflows로 진행 상황 확인
\`\`\`

> 분해 가능한 큰 작업이면 \`/workflows\`, 결과 검증 가능한 자율 실행이면 \`/goal\`, 주기적 감시면 \`/loop\`.`
    },
    {
      id: "opus-48-synergy",
      title: "Opus 4.8과의 시너지 (effort xhigh)",
      content: `### Opus 4.8이 워크플로우를 잘 설계하는 이유

v2.1.154에서 Opus 4.8이 출시되면서 기본 effort가 **high**로 올라가고, 가장 어려운 작업용 \`/effort xhigh\`가 새로 생겼습니다. 워크플로우 **설계**는 "작업을 어떻게 N개로 쪼개고, 의존성을 어떻게 그리고, 결과를 어떻게 합칠지" 결정하는 일이라 effort가 클수록 좋아집니다.

\`\`\`bash
# 기본 effort (high) — 적당한 워크플로우 설계
claude "monorepo의 모든 패키지를 TypeScript 5.4로 마이그레이션하는 워크플로우 만들어줘"

# xhigh — 의존성 그래프가 복잡한 큰 작업에 권장
/effort xhigh
claude "이 RFC를 읽고 affected_areas를 분석해서 단계별 롤아웃 워크플로우 만들어줘"
\`\`\`

#### Opus 4.8 출시 변경점 (v2.1.154 발췌)

| 항목 | v2.1.153 (Opus 4.7) | v2.1.154 (Opus 4.8) |
|------|---------------------|---------------------|
| 기본 effort | 사용자 설정 의존 | **high (자동)** |
| 최상위 effort | high | **xhigh** |
| 자기 코드 결함 누락률 | 기준 | **1/4 수준** |
| Fast 모드 | 2x 비용으로 2x 속도 | **2x 비용으로 2.5x 속도** |
| 표시 라벨 | "Speed"/"Intelligence" | **"Faster"/"Smarter"** |

> Opus 4.7 fast 모드를 유지하려면 \`/model claude-opus-4-6[1m]\` 후 \`/fast on\` (\`CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE\`는 2026-06-01에 제거됨).`
    },
    {
      id: "lean-system-prompt",
      title: "Lean system prompt와 묻지 않기",
      content: `### v2.1.154에서 함께 도입된 동작 변경

\`/workflows\`만큼 눈에 띄진 않지만 워크플로우 설계 품질에 영향을 주는 변경이 함께 들어왔습니다.

#### 1) Lean system prompt 기본화

v2.1.154부터 **Haiku / Sonnet / Opus 4.7 이하를 제외한 모든 모델**에서 짧은 시스템 프롬프트가 기본입니다. 토큰을 아껴 워크플로우 단계별 컨텍스트를 더 확보할 수 있습니다.

\`\`\`
Opus 4.8 → lean 기본 (켜기/끄기 자동)
Opus 4.7 → 기존 프롬프트 유지
Sonnet/Haiku → 기존 프롬프트 유지
\`\`\`

#### 2) 자기 결정 가능한 건 묻지 않음

이전엔 Claude가 자주 multiple-choice 질문을 띄웠는데, v2.1.154부터는 **이미 충분한 컨텍스트가 있으면** 묻지 않고 진행합니다. 워크플로우가 중간에 멈춰서 사람을 기다리는 경우가 크게 줄었습니다.

#### 3) Streaming tool execution 항상 활성화

이전엔 피처 플래그 뒤에 숨어 있었지만 이제 텔레메트리 비활성, Bedrock/Vertex/Foundry 환경에서도 항상 켜집니다. 워크플로우의 서브에이전트가 도구를 호출할 때 응답이 스트리밍되어 전체 진행이 빨라집니다.

\`\`\`bash
# /workflows 실행 중 진행 보기
/workflows
# → 실행 중인 워크플로우 목록
# → 각 워크플로우의 활성 에이전트 수, elapsed, 완료/실패 카운트
\`\`\`

> 이 세 변경이 합쳐져서 \`/workflows\`가 "중간에 안 멈추고", "토큰을 덜 먹고", "실시간 스트리밍으로" 돌아갑니다.

#### ⚠️ v2.1.157~160 중요 변경 — 트리거 키워드 \`workflow\` → \`ultracode\`

가장 눈여겨볼 변경입니다. 동적 워크플로우를 부르는 **트리거 키워드가 \`workflow\`에서 \`ultracode\`로 바뀌었습니다.**

| 변경 | 이전 (~v2.1.156) | 이후 (v2.1.157~160) |
|------|------------------|---------------------|
| 트리거 키워드 | 프롬프트에 "workflow" 단어 | 프롬프트에 **"ultracode"** (입력창에서 보라색 하이라이트) |
| "workflow" 단어 | 자동으로 워크플로우 실행 | **더 이상 트리거 안 함** (평범한 단어로 취급) |
| effort 레벨 | — | **\`/effort ultracode\`**로 노출(xhigh 미지원 모델엔 안 보임) |
| 끄기 | — | \`/config\`의 **"Workflow keyword trigger"** 설정으로 비활성화 |
| 취소 | alt+w | 트리거 키워드 입력 **직후 Backspace**로도 요청 취소 |

> 💡 키워드를 외우지 않아도 됩니다 — **자기 말로 "큰 작업을 잘게 쪼개서 병렬로 처리해줘"**라고 요청하면 여전히 워크플로우가 작동합니다. \`ultracode\`는 명시적으로 부르고 싶을 때 쓰는 단축 키워드일 뿐입니다.`
    }
  ],

  exercises: [
    {
      id: "first-workflow",
      title: "첫 워크플로우 만들기",
      difficulty: 2,
      content: `### 목표

대상 디렉토리의 deprecated API를 찾아 일괄 교체하는 워크플로우를 만들어봅니다.

### 1단계: 워크플로우 요청

\`\`\`bash
claude
> packages/ 아래의 모든 TypeScript 파일에서
  deprecated인 \`lodash.merge\` import를 찾아
  \`Object.assign\`으로 교체하는 워크플로우를 만들어줘.
  변경된 파일은 패키지별로 리포트해줘.
\`\`\`

Claude가 계획을 보여줍니다:

\`\`\`
워크플로우 계획:
  Step 1 (병렬): 패키지 50개를 스캔해 lodash.merge 사용 위치 수집
    - 50개 서브에이전트 동시 실행
  Step 2 (병렬): 발견된 파일에서 import 교체 + 호출부 변환
    - 변경된 파일별로 1개씩 (~120개 예상)
  Step 3 (직렬): 각 패키지에서 lint + test
    - 의존성 그래프 따라 순차

총 ~170 에이전트, 예상 시간: 12~18분

이대로 진행할까요?
\`\`\`

### 2단계: /workflows로 진행 모니터링

새 터미널에서:

\`\`\`bash
claude
> /workflows
\`\`\`

화면 표시:

\`\`\`
┌─ Active workflows ────────────────────────────────────┐
│                                                       │
│ ▸ Migrate lodash.merge → Object.assign                │
│   Started: 14:22:01  Elapsed: 03:47                   │
│   Agents:  42 running · 28 done · 0 failed            │
│   Stage:   Step 2 of 3 (transforming files)           │
│                                                       │
└───────────────────────────────────────────────────────┘
\`\`\`

### 3단계: 결과 회수

워크플로우가 끝나면 메인 세션이 합쳐진 리포트를 보여줍니다:

\`\`\`
✓ Workflow complete (16m 24s)

수정된 패키지: 38 / 50
  - packages/api: 12 파일 (lint pass, test pass)
  - packages/web: 8 파일 (lint pass, test pass)
  - packages/cli: 3 파일 (lint pass, test FAIL — 1건)
  ...

실패: packages/cli의 test 1건
  → tests/merge.test.ts: 옵셔널 prop 처리 차이
  → 자동 수정 시도 → 실패 → 수동 검토 필요

전체 diff: workflows/2026-05-29-lodash-migration.patch
\`\`\`

> 워크플로우는 "결과를 합치는 책임"이 핵심입니다. 단일 에이전트와 달리 N개 결과를 회수해 머지하는 과정에서 충돌이 생기면 사용자에게 보고합니다.`
    },
    {
      id: "scenario-comparison",
      title: "/loop vs /goal vs /workflows 시나리오 비교",
      difficulty: 3,
      content: `### 같은 목표, 다른 도구

"50개 패키지가 모두 빌드 통과해야 한다"는 목표를 세 가지 방식으로 구현해봅니다.

#### 방식 1: /loop (주기 폴링)

\`\`\`bash
/loop 5m "scripts/build-all.sh 결과를 요약해줘"
# → 5분마다 build-all.sh 실행
# → 사용자가 결과 보고 수동 수정
# 적합: 외부 빌드 시스템 감시
# 한계: 자동 수정 안 함
\`\`\`

#### 방식 2: /goal (조건 충족까지)

\`\`\`bash
/goal "scripts/build-all.sh가 exit 0이 될 때까지 빌드 실패 패키지를 고쳐" \\
  --max-turns 30
# → 단일 컨텍스트에서 빌드 → 실패 분석 → 수정 → 재시도
# 적합: 결과가 결정적이고 순차 수정이 효과적인 경우
# 한계: 한 번에 한 패키지씩 → 50개면 너무 느림
\`\`\`

#### 방식 3: /workflows (병렬 분산)

\`\`\`bash
claude "scripts/build-all.sh가 실패하는 모든 패키지를
       동시에 분석하고 고치는 워크플로우 만들어줘.
       독립 패키지는 병렬, 의존 패키지는 직렬."
# → Claude가 의존성 그래프를 그리고
# → 독립 패키지 ~30개를 동시 수정
# → 의존 패키지는 부모 빌드 통과 후 시작
# 적합: 큰 작업 + 병렬화 가능
# 한계: 메인 세션 토큰 소비 큼 (모든 결과를 머지해야 함)
\`\`\`

### 선택 가이드

\`\`\`
              "외부 시스템 감시"           → /loop
              "한 작업 자율 완료"           → /goal
              "큰 작업 분해 + 병렬"         → /workflows
\`\`\`

| 신호 | 추천 도구 |
|------|----------|
| "매 N분/시간마다 ..." | /loop |
| "X 조건 충족할 때까지 ..." | /goal |
| "N개 항목을 동시에 ..." | /workflows |
| "단일 컨텍스트로 안 되는 큰 작업" | /workflows |
| "백그라운드에서 돌아도 됨" | /workflows |

> 셋은 배타적이지 않습니다. \`/workflows\`로 분산 작업을 띄우고 \`/loop\`으로 외부 상태를 보면서 \`/goal\`로 결과 검증을 수렴시키는 조합이 가능합니다.`
    },
    {
      id: "monitoring-workflows",
      title: "/workflows 명령어 사용법과 모니터링",
      difficulty: 2,
      content: `### /workflows 단독 사용

\`\`\`bash
claude
> /workflows
\`\`\`

실행 중인 워크플로우가 없으면:

\`\`\`
No active workflows. Start one with a natural-language request like:
  > Make a workflow to <task description>
\`\`\`

활성 워크플로우가 있으면 위 1단계처럼 카드 형태로 표시됩니다.

### 백그라운드 결과 회수

워크플로우는 일반 백그라운드 에이전트와 같은 인프라를 씁니다:

\`\`\`bash
# 다른 세션에서도 모니터링 가능
claude agents
# → 실행 중인 모든 백그라운드 작업 (워크플로우 포함)

# 특정 에이전트 attach
# → Step 2의 12번째 서브에이전트 화면 진입 가능
\`\`\`

### 중도 종료

\`\`\`bash
> /workflows
> [워크플로우 선택 → c (cancel)]
\`\`\`

또는 메인 세션에서:

\`\`\`bash
> Cancel the lodash migration workflow.
\`\`\`

### 워크플로우 출력 위치

완료된 워크플로우는 다음 위치에 산출물을 남깁니다:

\`\`\`
.claude/workflows/
├── 2026-05-29-lodash-migration/
│   ├── plan.md           # 초기 계획
│   ├── results.json      # 각 서브에이전트 결과
│   ├── merged.patch      # 최종 diff
│   └── failures.log      # 실패한 서브태스크
\`\`\`

> Research Preview이므로 인터페이스가 빠르게 바뀔 수 있습니다. \`/workflows\` 첫 사용 시 짧은 안내 다이얼로그가 뜹니다.`
    }
  ],

  examples: [
    {
      id: "monorepo-migration",
      title: "모노레포 TypeScript 마이그레이션",
      content: `### 시나리오

40개 패키지의 모노레포를 TypeScript 5.0 → 5.4로 마이그레이션하면서 새 컴파일러 옵션(\`verbatimModuleSyntax\`)을 켜야 합니다.

### 워크플로우 요청

\`\`\`bash
claude
/effort xhigh
> packages/ 아래 40개 워크스페이스를 TypeScript 5.4로 올리고
  verbatimModuleSyntax: true를 추가하는 워크플로우 만들어줘.
  type import 가 아니던 걸 type import로 바꾸는 것까지 포함.
  의존성 그래프를 따라 단계별로 진행하고 각 패키지에서
  tsc --noEmit가 통과해야 다음 단계로 넘어가.
\`\`\`

### Claude의 계획 (예시)

\`\`\`
워크플로우: "TypeScript 5.4 + verbatimModuleSyntax 마이그레이션"

Stage A — 독립 패키지 (depth 0):  12개 패키지 동시
  ├─ packages/types
  ├─ packages/utils
  ├─ packages/config
  └─ ... 9개 더

Stage B — Stage A 의존 (depth 1):  16개 패키지 동시
Stage C — Stage B 의존 (depth 2):  10개 패키지 동시
Stage D — 루트 패키지 (depth 3):   2개 패키지

각 패키지별 작업:
  1) package.json typescript 버전 ^5.4.0
  2) tsconfig.json verbatimModuleSyntax 추가
  3) tsc --noEmit 실행 → 에러 수집
  4) 'type import' 누락 자동 변환
  5) 재시도 → 통과까지 (max 3 turns)

병렬도: 동시 최대 16 에이전트
예상 시간: 22~35분
\`\`\`

### 실행 + 결과

\`\`\`bash
> 진행해줘.

[백그라운드 실행 중...]
\`\`\`

다른 터미널에서:

\`\`\`bash
> /workflows
┌─ Active ─────────────────────────────────────────────┐
│ TS 5.4 + verbatimModuleSyntax migration              │
│ Stage: B (depth 1) — 14 running · 2 done · 0 failed  │
│ Elapsed: 11:32                                       │
└──────────────────────────────────────────────────────┘
\`\`\`

완료:

\`\`\`
✓ Workflow complete (28m 14s)
  40 / 40 패키지 통과
  자동 변환된 import: 312건
  수동 검토 필요: 0건

전체 PR 초안: .claude/workflows/2026-05-29-ts54/pr-draft.md
\`\`\`

> 모노레포에서 \`/goal\`은 40번 직렬로 돌려야 했지만, \`/workflows\`는 의존성 그래프를 그려 가능한 만큼 병렬화합니다.`
    },
    {
      id: "multi-review",
      title: "다중 관점 PR 리뷰 폭격",
      content: `### 시나리오

큰 PR을 보안 / 성능 / 스타일 / 문서 / 접근성 5개 관점에서 동시에 리뷰하고 단일 리포트로 합치고 싶습니다.

### 워크플로우 요청

\`\`\`bash
claude
> 현재 브랜치(diff against main)를 5개 관점에서
  동시에 리뷰하는 워크플로우 만들어줘:
  1) 보안 (SQL injection, XSS, auth)
  2) 성능 (N+1 쿼리, 메모리 누수)
  3) 스타일 (CLAUDE.md 규칙 준수)
  4) 문서 (주석/README 갱신 필요성)
  5) 접근성 (WCAG 2.1 AA)
  각 관점은 독립 서브에이전트로 돌리고
  결과를 우선순위 매겨 단일 리포트로 합쳐줘.
\`\`\`

### 실행 흐름

\`\`\`
워크플로우: "PR 5-관점 병렬 리뷰"

Stage 1 (병렬, 5 에이전트):
  ├─ security-reviewer    → /security-review 호출
  ├─ perf-reviewer        → 정적 분석 + 패턴 매칭
  ├─ style-reviewer       → /code-review 호출
  ├─ docs-reviewer        → diff vs docs/ 비교
  └─ a11y-reviewer        → WCAG 체크리스트

Stage 2 (단일):
  └─ merge-reporter       → 5개 결과를 우선순위 매겨 머지

예상 시간: 4~7분
\`\`\`

### 결과 (예시)

\`\`\`markdown
# PR Review Report

## 🔴 High priority (3)
1. [Security] login.ts:42 — bcrypt 라운드 4 (권장 12+)
2. [Perf]     orders.ts:118 — N+1 쿼리 (loop 안의 findOne)
3. [A11y]     Button.tsx:8 — aria-label 누락 (icon-only button)

## 🟡 Medium (5)
4. [Style]    util.ts:14 — 함수 60줄 초과 (50줄 룰 위반)
5. [Docs]     API.md 누락 — 새 endpoint /users/me/settings
...

## 🟢 Low (8)
...
\`\`\`

### /ultrareview와의 차이

| 도구 | 병렬도 | 관점 정의 | 클라우드 |
|------|--------|----------|---------|
| \`/ultrareview\` | 클라우드 멀티 에이전트 | 자동 결정 | ✓ (Anthropic) |
| \`/workflows ...\` | 로컬 백그라운드 | **사용자 지정** | ✗ (로컬) |

\`/ultrareview\`는 "알아서 리뷰"가 강점, \`/workflows\`는 "내가 정의한 관점으로 리뷰"가 강점입니다.

> 5-관점 리뷰는 PR 페이지에 자동 코멘트하지 않으므로, 결과 리포트를 보고 직접 결정하세요.`
    }
  ]
};
