window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["25-skills-2.0"] = {
  overview: `## Skills 2.0 — Progressive Disclosure & Skill Creator

**도서관 카탈로그**를 상상해보세요! 수백 권의 책이 있어도 카탈로그 카드(제목, 분류)만 훑으면 필요한 책을 빠르게 찾을 수 있죠.
Skills 2.0은 이 원리를 스킬 시스템에 적용한 것입니다.

### 이런 상황에서 유용해요
- **스킬 대량 관리**: "100개 스킬을 설치해도 컨텍스트가 부족해" — Progressive Disclosure로 ~10KB만 사용
- **스킬 품질 측정**: "이 스킬이 정말 잘 동작하는지 어떻게 알지?" — Evals & A/B Testing으로 객관적 검증
- **팀 스킬 배포**: "팀 전원이 같은 스킬을 쓰게 하고 싶어" — 마켓플레이스로 일괄 배포

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | Progressive Disclosure 3단계, 고급 Frontmatter, 스킬 분류 | 💡 개념 |
| 2 | 3단계 스킬 제작, 방어적 스킬 설계, Skill Creator 테스트 | 🔧 실습 |
| 3 | 팀 마켓플레이스 배포, 스킬 생애주기 관리 | 💻 예제 |

### 1.0 → 2.0 핵심 변화

\`\`\`
1.0                              2.0
─────────                        ─────────
단순 프롬프트                     Progressive Disclosure 3단계
수동 검증                         Evals, A/B Testing, Benchmarking
전체 로드                         메타(~100tok) → 본문(<5k) → 리소스
통합                              Capability Uplift / Workflow 분류
\`\`\`

### 3대 혁신

| 혁신 | 비유 | 효과 |
|------|------|------|
| Progressive Disclosure | 도서관 카탈로그 | 100개 스킬도 ~10KB |
| Skill Creator | 시험 + 블라인드 테스트 | 스킬 품질 측정/개선 |
| 분류 체계 | 보조 바퀴 vs 레시피 | 스킬 수명 예측 |

### 새로운 Frontmatter

\`\`\`yaml
---
name: my-skill
description: "트리거 조건 포함 설명"
allowed-tools: [Read, Grep, Bash(git *)]
context: fork
effort: low                    # 스킬 실행 시 모델 사고 깊이 (v2.1.80+)
disable-model-invocation: true
hooks:
  PreToolUse:
    - matcher: Bash
      hook_type: prompt
      prompt: "안전 검증"
---
\`\`\`

### v2.1.78~2.1.81 신규 기능

| 기능 | 설명 | 버전 |
|------|------|------|
| \`effort\` frontmatter | 스킬/커맨드 실행 시 모델 사고 깊이 오버라이드 | v2.1.80 |
| 에이전트 \`effort\`/\`maxTurns\`/\`disallowedTools\` | 플러그인 에이전트 세밀 제어 | v2.1.78 |
| \`\${CLAUDE_PLUGIN_DATA}\` | 플러그인 업데이트에도 살아남는 영속 저장소 | v2.1.78 |
| \`claude plugin validate\` | 스킬/에이전트/커맨드 프론트매터 + hooks.json 스키마 검증 | v2.1.77 |

### v2.1.89~2.1.92 신규 기능

| 기능 | 설명 | 버전 |
|------|------|------|
| \`disableSkillShellExecution\` | 스킬/커맨드/플러그인 커맨드의 **인라인 셸 실행을 비활성화** — 보안 중요 환경용 | v2.1.91 |
| 플러그인 \`bin/\` 실행파일 | 플러그인이 \`bin/\` 폴더에 실행파일 포함, Bash에서 bare 명령으로 호출 가능 | v2.1.91 |

### v2.1.83~2.1.84 신규 기능

| 기능 | 설명 | 버전 |
|------|------|------|
| \`initialPrompt\` 프론트매터 | 에이전트가 **첫 턴을 자동 제출** — 시작 즉시 작업 실행 | v2.1.83 |
| \`paths:\` YAML 글로브 리스트 | 규칙/스킬의 \`paths:\` 프론트매터가 **YAML 리스트 형식의 글로브 패턴**을 지원 | v2.1.84 |

#### \`paths:\` YAML 글로브 리스트 (v2.1.84)

기존에는 \`paths:\` 프론트매터에 단일 문자열만 지정 가능했는데, 이제 **YAML 리스트**로 여러 글로브 패턴을 지정할 수 있어요:

\`\`\`yaml
---
name: frontend-skill
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/styles/**/*.css"
---
\`\`\`

> **비유**: 도서관 자동 분류기가 "과학 코너에 있는 책"만 반응하는 것처럼, 특정 파일 패턴에서만 스킬이 활성화됩니다!`,

  concepts: [
    {
      id: "progressive-disclosure",
      title: "Progressive Disclosure 3단계",
      content: `### 도서관처럼 단계적으로 읽기

Skills 2.0의 핵심 아키텍처는 **3단계 점진적 공개**입니다.

#### 3단계 구조

\`\`\`
Level 1: 메타데이터 (~100 토큰/스킬, 항상 로드)
  └─ name + description만 (YAML frontmatter)
  └─ Claude가 "이 스킬을 쓸까?" 판단

Level 2: 지침 (<5,000 토큰, 트리거 시)
  └─ SKILL.md 본문 (절차, 워크플로우)
  └─ Claude가 실제 실행할 상세 지침

Level 3: 리소스 (필요 시만)
  └─ 번들 파일들 (REFERENCE.md, scripts/, examples/)
  └─ 참조 시만 로드, 스크립트는 실행 결과만 진입
\`\`\`

#### 왜 중요할까?

\`\`\`
100개 스킬 × 100 토큰 = ~10KB (L1 메타데이터)
→ 컨텍스트 윈도우의 약 2%만 사용!

만약 전부 로드하면?
100개 스킬 × 5,000 토큰 = ~500KB
→ 컨텍스트가 꽉 차서 대화할 공간이 없음!
\`\`\`

#### 비유: 도서관

\`\`\`
L1 = 카탈로그 카드 (제목 + 분류 번호)
     "이 책이 필요한가?" 빠르게 판단

L2 = 목차 + 서론
     "어떻게 사용하지?" 구체적 안내

L3 = 부록, 참고 문헌, 데이터 시트
     "깊이 파고들 때만" 추가 자료
\`\`\`

#### description이 핵심!

L1 메타데이터의 \`description\`이 잘 작성되어야 Claude가 정확하게 판단합니다:

\`\`\`yaml
# 나쁜 예 (너무 모호)
description: "코드를 도와줍니다"
→ 모든 코딩 요청에 트리거됨! (False Positive 높음)

# 좋은 예 (구체적 트리거)
description: |
  프로덕션 배포 요청 시 사용합니다.
  "배포", "deploy", "릴리스" 키워드에 반응합니다.
  스테이징/프로덕션 환경 구분 가능.
→ 배포 관련 요청에만 정확히 트리거!
\`\`\`

> **핵심**: description은 "언제 이 스킬을 써야 하는가"를 명확히 알려주는 '간판'입니다.

> **핵심 요약**: Progressive Disclosure는 L1 메타(~100tok, 항상 로드) → L2 지침(<5k, 트리거 시) → L3 리소스(필요 시만) 3단계로 스킬을 점진적으로 공개합니다. 100개 스킬도 ~10KB만 차지하며, description의 품질이 트리거 정확도를 결정합니다.`
    },
    {
      id: "advanced-frontmatter",
      title: "고급 Frontmatter 필드",
      content: `### 스킬에 세밀한 제어 추가하기

Skills 2.0에서는 frontmatter에 강력한 제어 필드가 추가되었습니다.

#### 필수 필드

\`\`\`yaml
---
name: deploy-checker       # 64자 이내, kebab-case
description: |             # 트리거 조건 포함!
  배포 상태 확인 요청 시 사용.
  "배포 상태", "deploy status" 키워드에 반응.
---
\`\`\`

#### 호출 제어 필드

\`\`\`yaml
# 위험 작업: 사용자만 호출 가능
disable-model-invocation: true
→ Claude가 자동으로 실행 불가
→ 반드시 /deploy-checker 로 명시 호출

# 배경 지식: Claude만 사용
user-invocable: false
→ 슬래시 커맨드로 안 보임
→ Claude가 관련 상황에서 자동 참조
\`\`\`

#### 도구 제한

\`\`\`yaml
allowed-tools:
  - Read                    # 파일 읽기만
  - Grep                    # 검색만
  - Bash(git *)             # git 명령만
  - Bash(npm run deploy*)   # 배포 스크립트만

# 왜 제한할까?
# → 스킬이 의도하지 않은 파일 수정 방지
# → 보안 경계 설정
\`\`\`

#### 격리 실행

\`\`\`yaml
context: fork
→ 별도의 서브에이전트에서 실행
→ 메인 대화 컨텍스트에 영향 없음
→ PRD 생성, 분석 리포트 등에 적합

agent: Explore
→ 서브에이전트 타입 지정
→ Explore, Plan 등 특화 에이전트 사용 가능
\`\`\`

#### 스킬 내 훅

\`\`\`yaml
hooks:
  PreToolUse:
    - matcher: Bash
      hook_type: prompt
      prompt: |
        이 Bash 명령이 프로덕션 환경에
        영향을 줄 수 있는지 확인하세요.
  PostToolUse:
    - matcher: Write
      hook_type: prompt
      prompt: |
        작성된 파일이 보안 정책을 준수하는지
        확인하세요.
\`\`\`

#### 사고 깊이 제어 (v2.1.80+)

\`\`\`yaml
effort: low       # low / medium / high
→ 스킬 실행 시 모델의 사고 깊이를 오버라이드
→ 단순 조회 스킬은 low, 복잡한 분석은 high
\`\`\`

#### 에이전트 세밀 제어 (v2.1.78+)

\`\`\`yaml
# 플러그인 에이전트 frontmatter에서 사용
effort: high          # 에이전트 사고 깊이
maxTurns: 10          # 최대 턴 수 제한
disallowedTools:      # 사용 금지 도구
  - Write
  - Edit
→ 에이전트가 읽기만 가능하고 수정은 불가하게 제한
\`\`\`

#### 영속 데이터 저장소 (v2.1.78+)

\`\`\`yaml
\${CLAUDE_PLUGIN_DATA}
→ 플러그인 업데이트/재설치에도 유지되는 저장 경로
→ 캐시, 설정, 히스토리 등 영속 데이터에 활용
→ uninstall 시 삭제 여부를 사용자에게 물어봄
\`\`\`

#### 자동완성 힌트

\`\`\`yaml
argument-hint: "[version] [environment]"
→ Tab 키 누르면 자동완성 안내 표시
→ /deploy-checker v2.5.0 production
\`\`\`

#### 필드 조합 예시

| 스킬 유형 | 필드 조합 |
|----------|----------|
| 위험 작업 (배포) | \`disable-model-invocation\` + \`allowed-tools\` + \`hooks\` |
| 분석 리포트 | \`context: fork\` + \`agent: Explore\` |
| 팀 컨벤션 | \`user-invocable: false\` |
| 보안 스캔 | \`allowed-tools\` + \`context: fork\` |
| 경량 조회 | \`effort: low\` + \`allowed-tools: [Read, Grep]\` |
| 읽기전용 에이전트 | \`effort: high\` + \`maxTurns: 10\` + \`disallowedTools: [Write, Edit]\` |

> **핵심**: frontmatter로 스킬의 "누가, 언제, 어떻게, 무엇으로" 실행할지 세밀하게 제어합니다.

> **핵심 요약**: Skills 2.0 frontmatter에는 \`disable-model-invocation\`(사용자만 호출), \`allowed-tools\`(도구 제한), \`context: fork\`(격리 실행), \`hooks\`(실행 전후 검증), \`user-invocable: false\`(배경 지식 전용), \`effort\`(사고 깊이 제어), 에이전트용 \`maxTurns\`/\`disallowedTools\`(턴 제한/도구 금지) 등의 고급 제어 필드가 있습니다.`
    },
    {
      id: "skill-classification",
      title: "스킬 분류: Capability vs Workflow",
      content: `### 보조 바퀴 vs 레시피

모든 스킬은 두 가지로 분류됩니다. 이 분류가 스킬의 **수명**을 결정합니다.

#### Capability Uplift (능력 확장)

\`\`\`
정의: Claude가 기본적으로 못하거나 일관되게 못하는 것

예시:
- PDF 폼 필드 채우기
- PowerPoint 슬라이드 생성
- 복잡한 Excel 수식 조작
- 특수 파일 포맷 처리

비유: 자전거 보조 바퀴
→ 지금은 필요하지만, 실력이 늘면 뗄 수 있음
\`\`\`

**수명**: 모델 발전 → 은퇴 가능
**관리법**: Evals로 주기적 체크 → "이 스킬 없이도 되나?" 테스트

#### Workflow/Preference (워크플로우)

\`\`\`
정의: Claude가 할 수 있지만 순서/프로세스가 중요한 것

예시:
- 팀 코드 리뷰 플로우 (Step 1→2→3)
- NDA 체크리스트 (항목 빠짐없이 확인)
- 배포 프로세스 (스테이징→테스트→프로덕션)
- PR 생성 규칙 (제목 형식, 리뷰어 자동 지정)

비유: 요리 레시피
→ 셰프 실력과 무관하게, "우리 가게 맛"은 레시피를 따라야 함
\`\`\`

**수명**: 영구 지속 (프로세스가 바뀌지 않는 한)
**관리법**: 프로세스 변경 시만 업데이트

#### 분류 판단 흐름

\`\`\`
이 스킬 없이 Claude에게 같은 요청을 하면?
  ↓
  결과가 일관되게 좋음?
    → YES: Workflow (프로세스가 중요한 것)
    → NO:  Capability Uplift (능력 보완)
\`\`\`

#### 실제 분류 예시

| 스킬 | 분류 | 이유 |
|------|------|------|
| PDF 폼 채우기 | Capability | Claude가 기본적으로 못함 |
| 팀 코드 리뷰 | Workflow | 할 수 있지만 "우리 순서"가 있음 |
| Excel 피벗 | Capability | 복잡한 수식은 일관되지 않음 |
| 배포 체크리스트 | Workflow | 누락 방지가 핵심 |
| Git 커밋 규칙 | Workflow | 팀 컨벤션 강제 |

#### 왜 구분이 중요할까?

\`\`\`
Capability Uplift:
  - Evals로 정기 테스트 → 은퇴 시점 판단
  - 모델 업그레이드 후 재평가

Workflow:
  - Evals로 정확도 테스트 → 프로세스 준수 확인
  - 팀 프로세스 변경 시 업데이트
\`\`\`

> **핵심**: Capability는 "지금 필요한 보조 장치", Workflow는 "영원히 따라야 할 레시피"입니다.

> **핵심 요약**: Capability Uplift는 Claude가 못하는 것을 보완하는 "보조 바퀴"로 모델 발전 시 은퇴 가능하고, Workflow는 팀 프로세스를 강제하는 "레시피"로 영구 지속됩니다. 이 분류가 스킬의 관리 전략과 Evals 주기를 결정합니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "Progressive Disclosure 스킬 만들기",
      content: `### 3단계 구조의 스킬 직접 만들기

가장 기본적인 3단계 스킬을 만들어봐요!

#### 목표
- L1 메타데이터 (description) 작성
- L2 지침 (SKILL.md 본문) 작성
- L3 리소스 (참조 파일) 추가

#### 따라하기

**1단계:** 스킬 디렉토리를 만듭니다.

**2단계:** SKILL.md를 작성합니다 (L1 메타 + L2 지침).

**3단계:** 리소스 파일을 추가합니다 (L3).`,
      terminals: [
        {
          command: '# 스킬 디렉토리 생성 + SKILL.md 작성',
          output: `> mkdir -p .claude/skills/code-review-v2/

> cat .claude/skills/code-review-v2/SKILL.md

---
name: code-review-v2
description: |
  코드 리뷰 요청 시 사용합니다.
  "리뷰해줘", "코드 봐줘", "review" 키워드에 반응.
  PR 단위 또는 파일 단위 리뷰를 수행합니다.
allowed-tools:
  - Read
  - Grep
  - Glob
---

## 코드 리뷰 절차

1. 변경된 파일 목록을 확인합니다
2. REVIEW_CHECKLIST.md의 항목을 순서대로 확인합니다
3. 각 항목에 대해 PASS/WARN/FAIL 판정
4. 최종 리포트를 마크다운으로 출력합니다

### 판정 기준

- PASS: 문제 없음
- WARN: 권장 사항 (머지 가능)
- FAIL: 수정 필수 (머지 차단)`
        },
        {
          command: '# L3 리소스 파일 추가',
          output: `> cat .claude/skills/code-review-v2/REVIEW_CHECKLIST.md

# 코드 리뷰 체크리스트

## 필수 항목
- [ ] 타입 안전: any 사용 여부
- [ ] 에러 처리: try-catch 누락
- [ ] 보안: 하드코딩된 시크릿
- [ ] 테스트: 새 기능에 테스트 존재

## 권장 항목
- [ ] 네이밍: 함수/변수명 명확성
- [ ] 복잡도: 50줄 초과 함수
- [ ] 주석: 복잡한 로직에 설명

─────────────────────────────

스킬 구조:
  .claude/skills/code-review-v2/
  ├── SKILL.md              ← L1 메타 + L2 지침
  └── REVIEW_CHECKLIST.md   ← L3 리소스 (필요 시만 로드)

L1 (~100 토큰): name + description → Claude가 "리뷰 요청이네" 판단
L2 (~500 토큰): 리뷰 절차 4단계 → 실제 실행 시 로드
L3 (~200 토큰): 체크리스트 → SKILL.md에서 참조할 때만 로드`
        }
      ]
    },
    {
      id: "step-02",
      title: "고급 Frontmatter로 안전한 스킬 만들기",
      content: `### 위험 작업을 위한 방어적 스킬

배포처럼 위험한 작업에는 여러 안전장치가 필요합니다.

#### 목표
- \`disable-model-invocation\`으로 사용자만 호출 가능하게 설정
- \`allowed-tools\`로 사용 도구 제한
- \`context: fork\`로 격리 실행
- \`hooks\`로 실행 전 안전 체크

#### 따라하기

**1단계:** 방어적 frontmatter를 작성합니다.

**2단계:** hooks를 추가하여 자동 검증을 설정합니다.

**3단계:** 실행하여 안전장치가 동작하는지 확인합니다.`,
      terminals: [
        {
          command: '# 방어적 스킬 작성',
          output: `> cat .claude/skills/safe-deploy/SKILL.md

---
name: safe-deploy
description: |
  프로덕션 배포 체크리스트를 실행합니다.
  "배포", "deploy", "릴리스" 키워드에 반응.
  ⚠️ 사용자 명시 호출만 가능.
argument-hint: "[version] [environment]"
disable-model-invocation: true
allowed-tools:
  - Read
  - Grep
  - Bash(git status)
  - Bash(git log *)
  - Bash(npm run build)
  - Bash(npm run deploy:*)
context: fork
hooks:
  PreToolUse:
    - matcher: Bash
      hook_type: prompt
      prompt: |
        이 명령이 프로덕션 환경을 변경하는지 확인하세요.
        변경한다면 사용자에게 명시적 확인을 받으세요.
---

## 프로덕션 배포 체크리스트

1. git status 확인 (clean working tree)
2. 테스트 통과 확인
3. 빌드 성공 확인
4. 배포 실행 (사용자 확인 후)
5. 헬스체크 결과 보고`
        },
        {
          command: '# 실행 시도 (Claude 자동 vs 사용자 명시)',
          output: `> "배포해줘"
Claude: safe-deploy 스킬이 있지만 disable-model-invocation이
        설정되어 있어서 자동 실행할 수 없습니다.
        직접 /safe-deploy 명령을 사용해주세요.

> /safe-deploy v2.5.0 production
[Fork 모드로 격리 실행 시작]

Step 1: git status 확인...
  ✓ Clean working tree

Step 2: 테스트 확인...
  [PreToolUse Hook] Bash(npm run test) → 프로덕션 변경 아님 → PASS
  ✓ 142 tests passed

Step 3: 빌드 확인...
  [PreToolUse Hook] Bash(npm run build) → 프로덕션 변경 아님 → PASS
  ✓ Build successful

Step 4: 배포 실행...
  [PreToolUse Hook] Bash(npm run deploy:production)
  → ⚠️ 프로덕션 환경 변경 감지!
  → 사용자 확인 필요: "프로덕션에 v2.5.0을 배포합니다. 계속할까요?"

> yes
  ✓ Deployed v2.5.0 to production

Step 5: 헬스체크...
  ✓ All endpoints responding (avg 45ms)

배포 완료! 🎉`
        }
      ]
    },
    {
      id: "step-03",
      title: "Skill Creator로 품질 테스트하기",
      content: `### Evals와 A/B Testing 실습

Skill Creator 플러그인으로 스킬의 품질을 측정하고 개선해봐요!

#### 목표
- Skill Creator 플러그인 설치
- Evals로 스킬 테스트 케이스 작성/실행
- A/B Testing으로 두 버전 비교
- Description Optimization으로 트리거 정확도 개선

#### 따라하기

**1단계:** Skill Creator를 설치합니다.

**2단계:** Evals를 만들어 스킬을 테스트합니다.

**3단계:** Description을 최적화합니다.`,
      terminals: [
        {
          command: '# Skill Creator 설치 + Evals 실행',
          output: `> claude plugin install skill-creator
✓ skill-creator 플러그인이 설치되었습니다.

> "code-review-v2 스킬의 evals를 만들어줘"

Skill Creator가 code-review-v2 스킬을 분석합니다...

테스트 케이스 3개를 생성했습니다:

  Test 1: "이 파일 리뷰해줘" (basic trigger)
    예상: 리뷰 체크리스트 실행
    결과: ✓ PASS (2.3초, 450 토큰)

  Test 2: "날씨 알려줘" (negative - 관계없는 요청)
    예상: 스킬 트리거 안 됨
    결과: ✓ PASS (0.1초, 12 토큰)

  Test 3: "PR #42 코드 봐줘" (PR context trigger)
    예상: PR 단위 리뷰 실행
    결과: ✓ PASS (3.1초, 680 토큰)

Overall: 3/3 passed
Avg tokens: 380 | Avg time: 1.8s`
        },
        {
          command: '# A/B Testing (두 description 비교)',
          output: `> "code-review-v2의 description을 A/B 테스트해줘"

Version A (현재):
  "코드 리뷰 요청 시 사용합니다.
   리뷰해줘, 코드 봐줘, review 키워드에 반응."

Version B (대안):
  "PR 또는 파일의 코드 품질을 검사합니다.
   리뷰, 검사, 코드 확인 요청에 반응.
   보안, 타입, 테스트 체크리스트 기반."

맹검 평가 결과 (10개 샘플 프롬프트):

  | 메트릭        | Version A | Version B |
  |--------------|-----------|-----------|
  | True Positive  | 7/7       | 7/7       |
  | False Positive | 2/3       | 0/3       |
  | Precision      | 78%       | 100%      |

Version B가 22% 더 정확합니다!
→ "코드 품질"이라는 구체적 표현이 FP를 줄였습니다.

Version B를 적용할까요?`
        },
        {
          command: '# 프론트매터 스키마 검증 (v2.1.77+)',
          output: `> claude plugin validate

Validating plugin: my-team-tools
  ✓ plugin.json — valid manifest
  ✓ skills/code-review-v2/SKILL.md — frontmatter OK
  ✓ skills/safe-deploy/SKILL.md — frontmatter OK
  ✗ skills/broken-skill/SKILL.md — YAML parse error (line 5)
  ✓ agents/reviewer/AGENT.md — frontmatter OK
  ✓ hooks/hooks.json — schema valid

4/5 components valid, 1 error found.

→ 배포 전에 프론트매터 오류를 미리 잡을 수 있습니다!`
        },
        {
          command: '# Description Optimization 자동 제안',
          output: `> "code-review-v2 description을 최적화해줘"

현재 description 분석:

  False Positive 리스크:
    - "리뷰해줘" → 문서 리뷰, 디자인 리뷰에도 트리거될 수 있음
    - 권장: "코드 리뷰" 또는 "PR 리뷰"로 한정

  False Negative 리스크:
    - "이 함수 괜찮아?" 같은 비격식 표현에 안 잡힘
    - 권장: "코드 확인", "품질 체크" 키워드 추가

  최적화된 description 제안:

  description: |
    코드 리뷰 또는 PR 리뷰 요청 시 사용합니다.
    "코드 리뷰", "PR 리뷰", "코드 확인", "품질 체크" 키워드에 반응.
    파일 단위 또는 PR 단위 리뷰를 수행합니다.
    (문서 리뷰, 디자인 리뷰에는 반응하지 않습니다)

  예상 개선:
    FP: -60% (문서/디자인 리뷰 필터링)
    FN: -30% (비격식 표현 커버)

적용할까요?`
        }
      ]
    }
  ],

  examples: [
    {
      id: "team-marketplace",
      title: "팀 마켓플레이스 배포 실전",
      content: `### 실전: 팀 전체가 같은 스킬 사용하기

#### 시나리오

5명의 팀이 동일한 코드 리뷰 스킬과 배포 스킬을 사용해야 합니다.

#### 설정 과정

\`\`\`bash
# 1. GitHub에 팀 마켓플레이스 레포 생성
gh repo create my-org/team-marketplace --public

# 2. 스킬/플러그인을 레포에 추가
# team-marketplace/
# ├── plugin.json
# └── skills/
#     ├── code-review-v2/SKILL.md
#     └── safe-deploy/SKILL.md

# 3. 프로젝트의 .claude/settings.json에 등록
cat .claude/settings.json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": { "source": "github", "repo": "my-org/team-marketplace" }
    }
  },
  "enabledPlugins": {
    "team-tools@team-tools": true
  }
}

# 4. git commit + push
git add .claude/settings.json
git commit -m "feat: 팀 마켓플레이스 스킬 배포 설정"
git push

# 5. 팀원이 clone 하면 자동 설치!
# → trust 프롬프트 → 마켓플레이스 등록 → 스킬 사용 가능
\`\`\`

#### 결과

\`\`\`
팀원 A: clone → trust → /code-review-v2 사용 가능!
팀원 B: clone → trust → /safe-deploy 사용 가능!
팀원 C: clone → trust → 동일한 스킬 환경!

모두가 같은 리뷰 체크리스트, 같은 배포 프로세스를 따릅니다.
\`\`\`

#### 현재 제한사항

\`\`\`
⚠️ plugin.json의 dependencies 필드는 아직 미지원
→ 플러그인 A가 플러그인 B에 의존하는 것을 선언할 수 없음
→ GitHub 이슈 #9444, #27113에서 진행 중
→ 현재는 enabledPlugins에 모든 필요한 플러그인을 명시적으로 나열
\`\`\``,
      checklist: [
        "Progressive Disclosure 3단계 (L1 메타, L2 지침, L3 리소스)를 설명할 수 있다",
        "description이 스킬 트리거 정확도에 미치는 영향을 이해한다",
        "disable-model-invocation으로 위험 스킬을 보호할 수 있다",
        "allowed-tools로 스킬의 도구 접근을 제한할 수 있다",
        "context: fork로 격리 실행이 필요한 이유를 설명할 수 있다"
      ]
    },
    {
      id: "skill-lifecycle",
      title: "스킬 생애주기 관리",
      content: `### 실전: 스킬의 탄생부터 은퇴까지

#### Capability Uplift 스킬의 생애주기

\`\`\`
탄생 → 활성 → 모니터링 → 은퇴 검토 → 은퇴
                ↑
          Evals로 정기 체크
\`\`\`

\`\`\`bash
# 1. 탄생: Excel 피벗 스킬 생성
mkdir -p .claude/skills/excel-pivot/
# SKILL.md 작성...

# 2. 활성: Evals로 품질 확인
"excel-pivot 스킬의 evals를 실행해줘"
→ 5/5 passed

# 3. 모니터링: 모델 업그레이드 후 재평가
"excel-pivot 스킬 없이 동일한 작업을 해봐"
→ 3/5 성공 (아직 불안정 → 스킬 유지)

# 4. 은퇴 검토: 다음 모델 업그레이드 후
"excel-pivot 스킬 없이 동일한 작업을 해봐"
→ 5/5 성공! (모델이 충분히 발전)
→ 스킬 은퇴 후보

# 5. 은퇴: A/B 테스트로 최종 확인
"스킬 있을 때 vs 없을 때 A/B 테스트"
→ 차이 없음 (2% 이내)
→ 스킬 아카이브
\`\`\`

#### Workflow 스킬의 생애주기

\`\`\`
탄생 → 활성 → 프로세스 변경 시 업데이트 → (영구)
                    ↑
              팀 프로세스 변경
\`\`\`

\`\`\`bash
# 1. 탄생: 코드 리뷰 플로우 스킬
# 팀 합의로 리뷰 프로세스 정의

# 2. 활성: 팀 전원 사용
# enabledPlugins로 팀 배포

# 3. 업데이트: 프로세스 변경 시
# "보안 체크 항목 추가" → REVIEW_CHECKLIST.md 수정
# A/B 테스트로 새 버전 검증

# 4. 영구 지속: 모델 업그레이드와 무관
# Claude가 아무리 똑똑해져도
# "우리 팀의 리뷰 순서"는 스킬이 강제해야 함
\`\`\`

#### Evals 주기 가이드

| 스킬 타입 | Evals 주기 | 목적 |
|----------|-----------|------|
| Capability Uplift | 모델 업그레이드마다 | 은퇴 시점 판단 |
| Workflow | 분기 1회 | 프로세스 준수 확인 |
| 위험 작업 | 월 1회 | 안전장치 동작 확인 |`,
      checklist: [
        "Capability Uplift과 Workflow 스킬의 차이를 설명할 수 있다",
        "Evals로 스킬의 품질을 주기적으로 검증할 수 있다",
        "A/B Testing으로 description 개선 효과를 측정할 수 있다",
        "Description Optimization의 FP/FN 개념을 이해한다",
        "팀 마켓플레이스로 스킬을 배포하는 방법을 설명할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "Progressive Disclosure에서 항상 로드되는 Level 1 메타데이터는 스킬당 약 몇 토큰인가요?",
      options: [
        "약 10 토큰",
        "약 100 토큰",
        "약 1,000 토큰"
      ],
      answer: 1,
      explanation: "Level 1 메타데이터(name + description)는 스킬당 약 100 토큰입니다. 100개 스킬을 설치해도 ~10KB만 차지하므로 컨텍스트 윈도우의 약 2%만 사용합니다."
    },
    {
      question: "disable-model-invocation: true가 설정된 스킬은 누가 실행할 수 있나요?",
      options: [
        "Claude가 자동으로 판단해서 실행",
        "사용자가 /명령어로 직접 실행만 가능",
        "아무도 실행할 수 없음 (비활성화)"
      ],
      answer: 1,
      explanation: "disable-model-invocation: true는 Claude가 자동으로 실행하는 것을 차단합니다. 사용자가 슬래시 명령어(/스킬이름)로 명시적으로 호출해야만 실행됩니다. 배포 같은 위험 작업에 적합합니다."
    },
    {
      question: "Skill Creator의 A/B Testing은 어떤 방식으로 비교하나요?",
      options: [
        "사용자가 직접 두 버전을 번갈아 테스트",
        "맹검 평가 (어느 버전인지 모르고 채점)",
        "토큰 사용량만으로 비교"
      ],
      answer: 1,
      explanation: "A/B Testing은 맹검 평가(blind evaluation) 방식입니다. 어느 버전인지 모르는 상태에서 같은 프롬프트로 실행하고 결과를 채점하여 객관적으로 비교합니다."
    },
    {
      question: "모델이 발전하면 은퇴할 수 있는 스킬 유형은?",
      options: [
        "Workflow/Preference (워크플로우)",
        "Capability Uplift (능력 확장)",
        "둘 다 은퇴 가능"
      ],
      answer: 1,
      explanation: "Capability Uplift 스킬은 Claude가 기본적으로 못하는 것을 보완하므로, 모델이 발전하면 은퇴할 수 있습니다. 반면 Workflow 스킬은 '우리 프로세스'를 강제하는 것이므로 모델 발전과 무관하게 영구 지속됩니다."
    },
    {
      question: "Description Optimization이 줄이려는 'False Positive'란 무엇인가요?",
      options: [
        "스킬이 필요한 상황에서 트리거되지 않는 것",
        "스킬과 관계없는 요청에도 트리거되는 것",
        "스킬 실행 중 에러가 발생하는 것"
      ],
      answer: 1,
      explanation: "False Positive는 스킬과 관계없는 요청에도 트리거되는 것입니다. 예를 들어 '코드 리뷰' 스킬이 '문서 리뷰' 요청에도 반응하면 FP입니다. Description을 구체적으로 작성하면 FP를 줄일 수 있습니다."
    }
  ]
};
