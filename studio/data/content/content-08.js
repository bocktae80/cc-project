window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["08-skills-commands"] = {
  overview: `## Skills & 커맨드 — 나만의 명령어 만들기

게임에서 매크로를 설정하면 복잡한 연속 동작을 버튼 하나로 실행할 수 있듯, 클로드 코드의 **스킬 시스템**으로 반복 작업을 한 번의 명령어로 자동화할 수 있습니다!

### 이런 상황에서 유용해요
- **반복 작업 자동화**: "코드 리뷰를 매번 같은 기준으로 해줘" — 커스텀 스킬로 표준화
- **팀 워크플로우 공유**: "우리 팀만의 배포 스크립트를 모두가 쓰게 하고 싶어" — git으로 스킬 공유
- **위험한 작업 보호**: "이 명령은 내가 직접 실행할 때만 동작하게" — 프론트매터로 호출 제어

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | 기본 커맨드, 번들 스킬, 커스텀 스킬의 차이 | 💡 개념 |
| 2 | SKILL.md 작성과 프론트매터 설정 실습 | 🔧 실습 |
| 3 | 서브에이전트, 동적 주입 등 고급 패턴 | 💻 예제 |

\`\`\`
게임                             클로드 코드
----                             ----------
기본 단축키: F1(도움말), F5(저장)   기본 커맨드: /help, /cost, /compact
기본 매크로: 자동 물약 사용          번들 스킬: /simplify, /batch, /debug
내가 만든 매크로: Ctrl+Shift+A     커스텀 스킬: /review, /explain
\`\`\`

### 세 종류의 명령어

| 구분 | 기본 커맨드 | 번들 스킬 | 커스텀 스킬 |
|------|-----------|----------|------------|
| 비유 | 게임 기본 단축키 | 기본 제공 매크로 | 내가 만든 매크로 |
| 위치 | 클로드에 내장 | 클로드에 내장 | \`.claude/skills/\` 폴더 |
| 수정 | 불가 | 불가 | 자유롭게 가능 |
| 예시 | /help, /cost | /simplify, /batch | /review, /explain |

### 스킬 시스템의 진화

> v2.1.70 기준: \`.claude/commands/\`는 **레거시(은퇴)** 포맷입니다.
> 기존 파일은 계속 동작하지만, 새로 만들 때는 \`.claude/skills/\`를 사용하세요!

\`\`\`
이전 (레거시)                    현재 (권장)
-----------                    -----------
.claude/commands/review.md     .claude/skills/review/SKILL.md
단일 파일                       디렉토리 (보조 파일 포함 가능)
자체 포맷                       Agent Skills 오픈 표준
\`\`\`

### 핵심 포인트

- **기본 커맨드**: 클로드에 내장된 10+ 명령어 (\`/help\`, \`/cost\`, \`/compact\` 등)
- **번들 스킬**: 기본 제공 고급 매크로 (\`/simplify\`, \`/batch\`, \`/debug\`, \`/claude-api\`)
- **커스텀 스킬**: \`.claude/skills/이름/SKILL.md\`에 마크다운 파일로 생성
- **\$ARGUMENTS**: 실행할 때 값을 전달받는 변수
- **프론트매터**: 호출 제어, 도구 제한, 서브에이전트 실행 설정
- 한 번 만들면 **/이름**으로 언제든 재사용!`,

  concepts: [
    {
      id: "builtin-commands",
      title: "기본 커맨드 + 번들 스킬",
      content: `### 기본 커맨드와 번들 스킬

게임의 기본 단축키처럼, 클로드 코드에도 미리 정해진 명령어들이 있습니다.

#### 기본 커맨드 (내장 로직)

| 커맨드 | 기능 | 게임 비유 |
|--------|------|----------|
| \`/help\` | 도움말 보기 | F1 (도움말) |
| \`/cost\` | 사용량/비용 확인 | 인벤토리 (남은 자원 확인) |
| \`/compact\` | 대화 요약/압축 | 빈 칸 정리 (메모리 절약) |
| \`/clear\` | 대화 초기화 | 새 게임 시작 |
| \`/model\` | AI 모델 변경 | 난이도 변경 |
| \`/memory\` | CLAUDE.md 편집 | 세이브 파일 |
| \`/permissions\` | 권한 설정 | 게임 설정 |
| \`/agents\` | 서브에이전트 관리 | 파티 멤버 관리 |
| \`/copy\` | 인터랙티브 복사 | 아이템 복사 |
| \`/color\` | 테마 색상 변경 | 스킨 변경 |

> 기본 커맨드는 고정된 로직을 실행합니다. 수정할 수 없어요.

#### 번들 스킬 (프롬프트 기반, 기본 제공)

번들 스킬은 기본 제공되지만 "프롬프트 기반"이라 AI가 능동적으로 작업합니다:

| 스킬 | 기능 | 특징 |
|------|------|------|
| \`/simplify\` | 코드 리뷰 + 간소화 | 3개 병렬 에이전트 (재사용/품질/효율) |
| \`/batch\` | 대규모 코드베이스 일괄 변경 | 5~30개 병렬 작업, 각각 PR 생성 |
| \`/debug\` | 세션 디버그 로그 분석 | 현재 세션 문제 진단 |
| \`/claude-api\` | Claude API 레퍼런스 로드 | SDK 사용 시 자동 활성화 |

> **핵심 요약**: 기본 커맨드(/help, /cost 등)는 고정 로직을 실행하는 내장 명령어이고, 번들 스킬(/simplify, /batch 등)은 AI가 능동적으로 여러 도구를 조합해 실행하는 기본 제공 프롬프트입니다. 둘 다 수정할 수 없습니다.`
    },
    {
      id: "skill-structure",
      title: "SKILL.md 구조와 프론트매터",
      content: `### 스킬의 구조: SKILL.md

커스텀 스킬은 **디렉토리** 단위입니다. 각 디렉토리 안에 \`SKILL.md\`가 핵심 파일이에요.

#### 기본 구조

\`\`\`
.claude/skills/
  review/                    <- 디렉토리 이름 = 스킬 이름
    SKILL.md                 <- 핵심 파일 (필수)
    reference.md             <- 보조 파일 (선택)
    examples/                <- 예제 모음 (선택)
    scripts/
      validate.sh            <- 실행 스크립트 (선택)
\`\`\`

#### SKILL.md 파일 구조

\`\`\`markdown
---
name: review
description: 코드를 리뷰하고 개선점을 찾습니다
allowed-tools: Read, Grep, Glob
---

아래 파일을 코드 리뷰해주세요: $ARGUMENTS

리뷰 기준:
1. 버그 가능성
2. 가독성
3. 성능
\`\`\`

파일 구조는 두 부분:
- **프론트매터** (\`---\` 사이): 설정값 (YAML)
- **본문** (프론트매터 아래): 클로드에게 보내는 프롬프트

#### 주요 프론트매터 필드

| 필드 | 설명 | 예시 |
|------|------|------|
| \`name\` | 스킬 이름 (\`/이름\`으로 실행) | \`review\` |
| \`description\` | 언제 이 스킬을 쓸지 설명 | \`코드를 리뷰합니다\` |
| \`disable-model-invocation\` | AI가 자동으로 실행 못 하게 | \`true\` |
| \`user-invocable\` | 사용자 메뉴에서 숨기기 | \`false\` |
| \`allowed-tools\` | 사용 가능한 도구 제한 | \`Read, Grep, Glob\` |
| \`model\` | 사용할 모델 지정 | \`sonnet\` |
| \`context\` | 서브에이전트에서 실행 | \`fork\` |
| \`agent\` | 서브에이전트 타입 지정 | \`Explore\` |
| \`argument-hint\` | 자동완성 시 힌트 | \`[파일경로]\` |
| \`hooks\` | 스킬 라이프사이클 훅 | (아래 고급 참조) |

#### 레거시 호환

기존 \`.claude/commands/review.md\` 파일도 계속 동작합니다.
같은 이름이 있으면 skills/ 가 우선합니다.

> **핵심 요약**: 커스텀 스킬은 \`.claude/skills/이름/SKILL.md\` 디렉토리 구조로 만듭니다. 프론트매터(YAML)로 호출 제어·도구 제한을 설정하고, 본문에 프롬프트를 작성합니다. \$ARGUMENTS로 인자를 전달받을 수 있습니다.`
    },
    {
      id: "skill-lifecycle",
      title: "스킬 호출 제어와 생명주기",
      content: `### 스킬의 호출 제어

스킬은 "누가 실행하느냐"를 제어할 수 있습니다.

#### 호출 방식 3가지

| 프론트매터 설정 | 사용자 실행 | AI 자동 실행 | 용도 |
|----------------|-----------|------------|------|
| (기본값) | O | O | 일반 스킬 |
| \`disable-model-invocation: true\` | O | X | 배포, 커밋 등 부작용 있는 작업 |
| \`user-invocable: false\` | X | O | 배경 지식 (API 규칙 등) |

#### 비유로 이해하기

\`\`\`
disable-model-invocation: true
-> "이 버튼은 내가 직접 눌러야만 작동해!"
   (배포 같은 위험한 작업은 AI가 마음대로 하면 안 됨)

user-invocable: false
-> "이건 AI가 알아서 참고하는 백과사전이야"
   (사용자가 /명령어로 부를 필요 없음)
\`\`\`

#### 스킬이 저장되는 위치 (스코프)

| 위치 | 적용 범위 | git 공유 |
|------|----------|---------|
| \`~/.claude/skills/\` | 모든 프로젝트 (개인용) | X |
| \`.claude/skills/\` | 이 프로젝트만 (팀 공유) | O |
| 플러그인 \`skills/\` | 플러그인 활성화 시 | O (플러그인 배포) |
| 엔터프라이즈 관리 | 조직 전체 | 관리자 설정 |

> 같은 이름의 스킬이 여러 곳에 있으면: **엔터프라이즈 > 개인 > 프로젝트** 순으로 우선합니다.
> 플러그인 스킬은 \`플러그인이름:스킬이름\`으로 네임스페이스가 분리됩니다.

#### 스킬 은퇴: commands -> skills

\`\`\`
.claude/commands/review.md     <- 레거시 (계속 동작)
.claude/skills/review/SKILL.md <- 권장 (신규)
\`\`\`

기존 commands/ 파일은 자동으로 스킬로 인식됩니다.
하지만 skills/ 가 보조 파일, 프론트매터 등 더 많은 기능을 지원하므로 마이그레이션을 권장합니다.

#### 스킬 진화: 서브에이전트 + persistent memory

서브에이전트에 \`memory\` 필드를 설정하면, 세션을 넘어 학습이 축적됩니다:

\`\`\`yaml
---
name: code-reviewer
description: 코드 리뷰 전문가
memory: user     # 모든 프로젝트에서 학습 유지
---
코드를 리뷰하고 패턴을 메모리에 기록하세요.
\`\`\`

리뷰를 반복할수록 코드베이스 패턴을 학습하고, 점점 더 정확한 리뷰를 제공합니다!

> **핵심 요약**: 스킬의 호출 제어는 3가지입니다 — 기본(사용자+AI 모두), disable-model-invocation(사용자만), user-invocable:false(AI만). 스킬은 개인(\`~/.claude/\`), 프로젝트(\`.claude/\`), 플러그인, 엔터프라이즈 4개 위치에 저장할 수 있으며, 엔터프라이즈 > 개인 > 프로젝트 순으로 우선합니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "기본 커맨드 + 번들 스킬 체험",
      content: `### 1단계: 기본 커맨드와 번들 스킬 사용해보기

먼저 클로드에 내장된 명령어들을 체험해봅시다.

#### 기본 커맨드 체험

1. **/help** -- 사용 가능한 모든 커맨드/스킬 목록 보기
2. **/cost** -- 현재까지 사용한 토큰량 확인
3. **/compact** -- 긴 대화를 요약해서 메모리 절약
4. **/copy** -- 코드 블록을 선택해서 클립보드에 복사

> 팁: 슬래시(/)를 입력하면 자동 완성 목록이 나옵니다!

#### 번들 스킬 체험

번들 스킬은 AI가 능동적으로 여러 도구를 조합해 실행합니다:

\`\`\`
/simplify             <- 최근 변경 코드를 3개 관점에서 리뷰
/simplify 메모리 효율  <- 특정 관점에 집중
/debug                <- 현재 세션의 문제 진단
\`\`\``,
      terminals: [
        {
          command: "/help",
          output: "Claude Code v2.1.70\n\nAvailable commands:\n  /help         Show help and available commands\n  /cost         Show token usage for this session\n  /compact      Compact conversation history\n  /clear        Clear conversation history\n  /model        Change AI model\n  /memory       Manage memory files\n  /permissions  Manage permissions\n  /agents       Manage subagents\n  /copy         Interactive copy\n  /color        Change theme color\n\nBundled skills:\n  /simplify     Review and simplify recent changes\n  /batch        Orchestrate large-scale codebase changes\n  /debug        Troubleshoot current session\n  /claude-api   Load Claude API reference"
        },
        {
          command: "/simplify",
          output: "Spawning 3 review agents in parallel...\n\n[Agent 1: Code Reuse] Scanning for duplicate patterns...\n[Agent 2: Code Quality] Checking naming, structure...\n[Agent 3: Efficiency] Analyzing performance...\n\nFindings:\n  Reuse: 2 duplicate helper functions found\n  Quality: Variable naming consistent\n  Efficiency: 1 unnecessary loop detected\n\nApplying fixes..."
        }
      ]
    },
    {
      id: "step-02",
      title: "첫 번째 SKILL.md 만들기",
      content: `### 2단계: greet 스킬 만들기

이제 직접 커스텀 스킬을 만들어봅시다!
새로운 **SKILL.md 디렉토리 구조**로 만들어볼게요.

#### 폴더 구조 만들기

\`\`\`
프로젝트/
  .claude/
    skills/
      greet/             <- 디렉토리 이름 = 스킬 이름
        SKILL.md          <- 새로 만들 파일
\`\`\`

#### SKILL.md 작성

\`\`\`markdown
---
name: greet
description: 친근하게 인사하고 오늘의 개발 팁을 알려줍니다
---

사용자에게 친근하게 한국어로 인사해주세요.

인사 규칙:
1. 현재 시간대에 맞는 인사말 (아침/점심/저녁)
2. 오늘의 개발 팁 하나
3. 응원 한 마디
\`\`\`

#### 실행하기

클로드 코드에서 \`/greet\`을 입력하면 끝!

> 레거시 방식(\`.claude/commands/greet.md\`)도 동작하지만,
> 새로 만들 때는 \`skills/\` 디렉토리 구조를 사용하세요.`,
      terminals: [
        {
          command: "mkdir -p .claude/skills/greet",
          output: "# .claude/skills/greet 디렉토리 생성"
        },
        {
          command: "cat .claude/skills/greet/SKILL.md",
          output: "---\nname: greet\ndescription: 친근하게 인사하고 오늘의 개발 팁을 알려줍니다\n---\n\n사용자에게 친근하게 한국어로 인사해주세요.\n\n인사 규칙:\n1. 현재 시간대에 맞는 인사말 (아침/점심/저녁)\n2. 오늘의 개발 팁 하나\n3. 응원 한 마디"
        },
        {
          command: "/greet",
          output: "안녕하세요! 좋은 오후입니다 :)\n\n오늘의 개발 팁:\n  변수 이름을 지을 때 'data'나 'info' 같은\n  모호한 이름 대신, 'userProfile'이나\n  'orderItems'처럼 구체적인 이름을 쓰면\n  코드가 훨씬 읽기 쉬워져요!\n\n오늘도 화이팅!"
        }
      ]
    },
    {
      id: "step-03",
      title: "프론트매터 + 보조 파일 활용",
      content: `### 3단계: 고급 스킬 만들기

프론트매터와 보조 파일을 활용해서 **실전급 코드 리뷰 스킬**을 만들어봅시다.

#### 디렉토리 구조

\`\`\`
.claude/skills/review/
  SKILL.md              <- 메인 지시사항
  checklist.md          <- 리뷰 체크리스트 (보조 파일)
  examples/
    good-review.md      <- 좋은 리뷰 예시
\`\`\`

#### SKILL.md 작성

\`\`\`markdown
---
name: review
description: 코드를 리뷰하고 개선점을 찾습니다
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
argument-hint: [파일경로]
---

아래 대상을 코드 리뷰해주세요: $ARGUMENTS

## 리뷰 가이드
- 자세한 체크리스트는 [checklist.md](checklist.md) 참조
- 좋은 리뷰 예시는 [examples/good-review.md](examples/good-review.md) 참조

## 출력 형식
각 항목마다 심각도를 표시해주세요:
- 높음: 반드시 수정 필요
- 중간: 수정 권장
- 낮음: 참고 사항
\`\`\`

#### 프론트매터 설명

- \`disable-model-invocation: true\`: 사용자가 \`/review\`로만 실행 가능 (AI 자동 실행 방지)
- \`allowed-tools: Read, Grep, Glob\`: 이 스킬은 파일 읽기만 허용 (수정 불가)
- \`argument-hint\`: \`/\` 입력 시 \`/review [파일경로]\`로 힌트 표시

#### $ARGUMENTS 위치 지정

개별 인자를 위치로 접근할 수도 있습니다:

\`\`\`markdown
$ARGUMENTS[0] 파일을 리뷰하고 $ARGUMENTS[1] 관점에서 분석
\`\`\`

\`/review src/app.js 보안\` -> \`src/app.js\` 파일을 \`보안\` 관점에서 분석

단축 표기: \`$0\`, \`$1\`, \`$2\`도 가능!`,
      terminals: [
        {
          command: "cat .claude/skills/review/SKILL.md",
          output: "---\nname: review\ndescription: 코드를 리뷰하고 개선점을 찾습니다\ndisable-model-invocation: true\nallowed-tools: Read, Grep, Glob\nargument-hint: [파일경로]\n---\n\n아래 대상을 코드 리뷰해주세요: $ARGUMENTS\n\n## 리뷰 가이드\n- 자세한 체크리스트는 [checklist.md](checklist.md) 참조\n..."
        },
        {
          command: "/review src/app.js",
          output: "코드 리뷰: src/app.js\n========================\n\n[버그] 심각도: 중간\n  - 23행: null 체크 없이 객체 접근\n  - 45행: 비동기 에러 미처리\n\n[가독성] 심각도: 낮음\n  - 전반적으로 양호\n  - 12행: 변수명 'd' -> 'userData'로 변경 권장\n\n[보안] 심각도: 높음\n  - 38행: 사용자 입력 미검증 (XSS 위험)\n\n전체 평가: 보안 취약점 1건 수정 필요, 나머지는 양호"
        }
      ]
    }
  ],

  examples: [
    {
      id: "advanced-features",
      title: "고급 기능: 서브에이전트 + 동적 주입",
      content: `### 고급 스킬 패턴

#### 1. 서브에이전트에서 실행 (context: fork)

스킬을 격리된 서브에이전트에서 실행하면, 메인 대화에 영향 없이 작업합니다:

\`\`\`markdown
---
name: deep-research
description: 코드베이스를 깊이 분석합니다
context: fork
agent: Explore
---

$ARGUMENTS 관련 코드를 분석하세요:

1. Glob과 Grep으로 관련 파일 찾기
2. 코드를 읽고 분석
3. 파일 경로와 함께 요약 보고
\`\`\`

> \`context: fork\`는 새 서브에이전트를 만들어 작업합니다.
> 메인 대화에는 요약만 돌아와요!

#### 2. 동적 컨텍스트 주입 (\`!\`command\`\`)

셸 명령 결과를 스킬에 자동 삽입할 수 있습니다:

\`\`\`markdown
---
name: pr-summary
description: PR 변경사항을 요약합니다
context: fork
agent: Explore
---

## PR 컨텍스트
- PR diff: !\`gh pr diff\`
- 변경 파일: !\`gh pr diff --name-only\`

## 작업
이 PR을 요약하고 리뷰 포인트를 정리하세요.
\`\`\`

> \`!\`command\`\`는 스킬 실행 전에 셸에서 결과를 가져와 삽입합니다.
> 클로드는 이미 삽입된 결과만 봅니다.

#### 3. \${CLAUDE_SKILL_DIR} 변수

스킬이 자신의 디렉토리 경로를 참조할 수 있습니다:

\`\`\`markdown
---
name: visualize
description: 코드베이스 구조를 시각화합니다
allowed-tools: Bash(python *)
---

다음 스크립트를 실행하세요:

\\\`\\\`\\\`bash
python \${CLAUDE_SKILL_DIR}/scripts/visualize.py .
\\\`\\\`\\\`
\`\`\`

> 스킬 디렉토리에 스크립트를 번들하면, 어디서 실행해도 경로가 정확합니다.

#### 4. 스킬 내 hooks

스킬이 활성화된 동안만 동작하는 훅을 정의할 수 있습니다:

\`\`\`markdown
---
name: safe-edit
description: 안전한 파일 편집 모드
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-safe.sh"
---
\`\`\``,
      checklist: [
        "기본 커맨드와 번들 스킬의 차이를 안다",
        "SKILL.md 디렉토리 구조를 안다 (skills/ > commands/)",
        "프론트매터로 호출 제어, 도구 제한을 설정할 수 있다",
        "$ARGUMENTS와 $ARGUMENTS[N]으로 인자를 전달할 수 있다",
        "context: fork로 서브에이전트 실행을 이해했다",
        "!`command`로 동적 컨텍스트 주입을 이해했다",
        "${CLAUDE_SKILL_DIR}로 스킬 자체 경로를 참조할 수 있다"
      ]
    },
    {
      id: "team-sharing",
      title: "팀과 스킬 공유하기",
      content: `### 팀원과 스킬 공유하는 방법

#### 공유 방법 3가지

| 방법 | 적합한 경우 |
|------|-----------|
| **git 커밋** | 프로젝트 팀 내 공유 |
| **플러그인** | 여러 프로젝트에서 재사용 |
| **마켓플레이스** | 커뮤니티 배포 |

#### 1. git으로 프로젝트 스킬 공유

\`\`\`bash
# 스킬 파일을 git에 추가
git add .claude/skills/review/SKILL.md
git commit -m "feat: 코드 리뷰 스킬 추가"
git push

# 팀원이 pull 받으면 바로 /review 사용 가능!
\`\`\`

#### 2. 플러그인으로 배포

스킬을 플러그인으로 감싸면 여러 프로젝트에서 재사용할 수 있습니다:

\`\`\`
my-plugin/
  .claude-plugin/
    plugin.json          <- 플러그인 메타데이터
  skills/
    review/
      SKILL.md           <- /my-plugin:review 로 실행
\`\`\`

> 플러그인 스킬은 \`플러그인이름:스킬이름\`으로 네임스페이스가 분리됩니다.

#### 3. 스킬 위치와 우선순위

| 위치 | 적용 범위 | 우선순위 |
|------|----------|---------|
| 엔터프라이즈 관리 | 조직 전체 | 1 (최고) |
| \`~/.claude/skills/\` | 모든 프로젝트 (개인) | 2 |
| \`.claude/skills/\` | 이 프로젝트만 (팀) | 3 |
| 플러그인 \`skills/\` | 플러그인 활성화 시 | 4 (네임스페이스 분리) |

> 모노레포에서는 패키지별로 \`.claude/skills/\`를 둘 수 있습니다.
> 예: \`packages/frontend/.claude/skills/\`는 frontend 작업 시 자동 발견됩니다.`,
      checklist: [
        "프로젝트 스킬과 개인 스킬의 저장 위치 차이를 안다",
        "git을 통해 팀원과 스킬을 공유하는 방법을 안다",
        "플러그인으로 스킬을 배포하는 방법을 안다",
        "스킬의 우선순위 (엔터프라이즈 > 개인 > 프로젝트)를 안다"
      ]
    },
    {
      id: "cross-reference",
      title: "더 알아보기",
      content: `## 관련 튜토리얼

| 튜토리얼 | 관련 내용 |
|----------|----------|
| **01-memory-system** | \`/memory\` 커맨드와 메모리 관리 |
| **05-agent-teams** | 서브에이전트와 에이전트 팀 |
| **06-hooks** | PreToolUse, PostToolUse 등 훅 이벤트 |
| **17-plugin-system** | 플러그인으로 스킬 배포/설치하기 |
| **21-simplify** | /simplify 번들 스킬 심화 학습 |

## Agent Skills 오픈 표준

클로드 코드의 스킬 시스템은 [Agent Skills](https://agentskills.io) 오픈 표준을 따릅니다.
이 표준은 여러 AI 도구에서 호환되므로, 한 번 만든 스킬을 다른 도구에서도 사용할 수 있습니다.`,
      checklist: []
    }
  ],

  quiz: [
    {
      question: "새로운 커스텀 스킬을 만들 때 권장하는 위치는?",
      options: [
        ".claude/commands/ 폴더에 마크다운 파일",
        ".claude/skills/이름/SKILL.md 디렉토리 구조",
        "프로젝트 루트의 skills/ 폴더",
        "~/.claude/commands/ 폴더"
      ],
      answer: 1,
      explanation: "v2.1.70 기준으로 .claude/skills/이름/SKILL.md 디렉토리 구조가 권장됩니다. 기존 .claude/commands/ 방식은 레거시로, 계속 동작하지만 보조 파일이나 고급 프론트매터 등 새 기능을 활용할 수 없습니다."
    },
    {
      question: "AI가 자동으로 스킬을 실행하지 못하게 하려면 어떤 프론트매터를 사용하나요?",
      options: [
        "user-invocable: false",
        "allowed-tools: none",
        "disable-model-invocation: true",
        "context: fork"
      ],
      answer: 2,
      explanation: "disable-model-invocation: true를 설정하면 사용자가 /이름으로만 실행할 수 있고, AI가 자동으로 실행하지 못합니다. 배포, 커밋 등 부작용이 있는 스킬에 적합합니다."
    },
    {
      question: "번들 스킬 /simplify의 특징은?",
      options: [
        "파일을 삭제해서 코드를 단순하게 만든다",
        "3개 병렬 에이전트가 코드 재사용, 품질, 효율성을 리뷰한다",
        "코드를 자동으로 압축한다",
        "사용하지 않는 import를 제거한다"
      ],
      answer: 1,
      explanation: "/simplify는 3개의 리뷰 에이전트(코드 재사용, 코드 품질, 효율성)를 병렬로 실행하여 최근 변경된 코드를 분석하고 개선점을 찾아 수정합니다."
    },
    {
      question: "스킬에서 !`gh pr diff` 구문의 역할은?",
      options: [
        "클로드가 실행 중에 명령을 실행한다",
        "스킬 실행 전에 셸 결과를 미리 삽입한다",
        "에러가 발생하면 명령을 실행한다",
        "백그라운드에서 명령을 실행한다"
      ],
      answer: 1,
      explanation: "!`command` 구문은 스킬 실행 전에 셸에서 명령을 실행하고 그 결과를 스킬 내용에 삽입합니다. 클로드는 이미 삽입된 결과만 봅니다. 이를 '동적 컨텍스트 주입'이라고 합니다."
    },
    {
      question: ".claude/commands/와 .claude/skills/의 관계는?",
      options: [
        "완전히 다른 시스템으로 호환되지 않는다",
        "commands/는 레거시이며 skills/가 권장된다. 같은 이름이면 skills/가 우선한다",
        "commands/가 더 새로운 시스템이다",
        "둘 다 동일한 기능으로 차이가 없다"
      ],
      answer: 1,
      explanation: ".claude/commands/는 레거시 포맷으로 계속 동작하지만, .claude/skills/이 권장됩니다. skills/는 디렉토리 구조로 보조 파일을 포함할 수 있고, 더 많은 프론트매터 필드를 지원합니다. 같은 이름이면 skills/가 우선합니다."
    }
  ]
};
