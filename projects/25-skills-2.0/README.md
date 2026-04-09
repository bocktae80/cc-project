# 25. Skills 2.0 — Progressive Disclosure & Skill Creator

> ⭐⭐⭐ 심화 · Phase 6 · 선행: [08-skills-commands](../08-skills-commands/), [17-plugin-system](../17-plugin-system/)

---

## 이 튜토리얼에서 배우는 것

Skills 1.0에서 2.0으로 진화한 핵심 변화를 이해하고, Skill Creator로 스킬을 테스트/최적화하는 방법을 배웁니다.

| 주제 | 설명 |
|------|------|
| Progressive Disclosure | 3단계 점진적 공개로 컨텍스트 예산 절약 |
| 고급 Frontmatter | `allowed-tools`, `context: fork`, `hooks` 등 |
| Skill Creator | Evals, A/B Testing, Description Optimization |
| 스킬 분류 | Capability Uplift vs Workflow |
| 팀 배포 | 마켓플레이스 + enabledPlugins |

---

## 1. Skills 1.0 → 2.0 핵심 변경

```
1.0                              2.0
─────────                        ─────────
단순 프롬프트                     Progressive Disclosure 3단계
수동 검증                         Evals, A/B Testing
전체 로드                         메타(~100tok) → 본문(<5k) → 리소스
통합                              Capability Uplift / Workflow 분류
없음                              Description Optimization
```

**비유**: 1.0은 책 전체를 한 번에 읽는 것. 2.0은 목차만 보고(L1), 필요한 챕터만 펴고(L2), 참고 자료는 필요할 때만(L3) 보는 것!

---

## 2. Progressive Disclosure 3단계

```
Level 1: 메타데이터 (~100 토큰/스킬, 항상 로드)
  └─ YAML frontmatter의 name + description만
  └─ Claude가 "이 스킬을 쓸까?" 판단

Level 2: 지침 (<5,000 토큰, 트리거 시)
  └─ SKILL.md 본문 (절차, 워크플로우)
  └─ Claude가 실제 실행할 상세 지침

Level 3: 리소스 (필요 시만)
  └─ 번들 파일들 (REFERENCE.md, scripts/, examples/)
  └─ 참조 시만 로드, 스크립트는 실행 결과만 컨텍스트 진입
```

**핵심**: 100개 스킬을 설치해도 메타데이터만 ~10KB. 컨텍스트 윈도우 예산은 전체의 2%.

### 비유: 도서관

```
L1 = 도서관 카탈로그 카드 (제목, 분류)
     → 어떤 책인지 빠르게 판단

L2 = 책의 목차 + 서론
     → 실제로 필요하면 펼쳐서 읽기

L3 = 부록, 참고 문헌, 데이터 시트
     → 깊이 파고들 때만 참조
```

---

## 3. 고급 Frontmatter 필드

### 필수 필드

```yaml
---
name: my-skill
description: |
  사용자가 "배포해줘"라고 말하면 이 스킬을 사용합니다.
  프로덕션 배포 체크리스트를 실행합니다.
---
```

### 신규 고급 필드

```yaml
---
name: deploy-production
description: |
  프로덕션 배포 요청 시 사용.
  "배포", "deploy", "릴리스" 키워드에 반응.
argument-hint: "[version] [environment]"
disable-model-invocation: true    # 사용자만 호출 (위험!)
allowed-tools:
  - Read
  - Bash(git *)
  - Bash(npm run deploy*)
context: fork                     # 격리 실행
hooks:
  PreToolUse:
    - matcher: Bash
      hook_type: prompt
      prompt: "이 명령이 프로덕션에 영향을 주는지 확인하세요"
---
```

| 필드 | 역할 | 비유 |
|------|------|------|
| `argument-hint` | Tab 자동완성 힌트 | 검색창 자동완성 |
| `disable-model-invocation` | Claude가 알아서 못 부름 | 열쇠가 필요한 금고 |
| `user-invocable: false` | 사용자가 못 부름 | 배경에서 돌아가는 시스템 |
| `allowed-tools` | 사용 가능 도구 제한 | 작업자에게 필요한 도구만 지급 |
| `context: fork` | 격리된 서브에이전트 실행 | 실험실 클린룸 |
| `hooks` | 스킬 내 자동 반응 | 작업 전후 체크리스트 |

---

## 4. Skill Creator — 3대 도구

Skill Creator는 스킬의 **품질을 측정하고 개선**하는 플러그인입니다.

### 4.1 Evals (평가)

```
테스트 프롬프트 + 예상 결과
       ↓
  독립 agent에서 자동 실행 (격리)
       ↓
  pass/fail + 토큰 사용량 + 실행 시간
```

**비유**: 시험지를 만들어서 스킬에게 풀게 하기. 각 문제를 별도 교실에서 풀어서 커닝 방지!

### 4.2 A/B Testing

```
스킬 버전 A    vs    스킬 버전 B
       ↓                  ↓
   같은 프롬프트로 실행
       ↓
  맹검 평가 (어느 버전인지 모르고 채점)
       ↓
  "Version A가 16% 더 정확함"
```

**비유**: 블라인드 테스트. 누가 만든 건지 모르고 맛만 보고 평가!

### 4.3 Description Optimization

```
현재 description 분석
       ↓
  False Positive 감소 (관계없는 요청에 로드되는 문제)
  False Negative 감소 (필요할 때 안 로드되는 문제)
       ↓
  개선된 description 자동 제안
```

**비유**: 간판 수정사. "이 가게가 무슨 가게인지" 더 잘 알 수 있게 간판 문구를 다듬어줌!

---

## 5. 스킬 분류 체계

### Capability Uplift (능력 확장)

```
Claude가 기본적으로 못하거나 일관되지 않은 것

예시:
- PDF 폼 채우기
- PowerPoint 생성
- 복잡한 Excel 조작

특징:
- 수명 제한! 모델이 발전하면 은퇴 가능
- Evals로 "아직 이 스킬이 필요한가?" 주기적 확인
```

**비유**: 자전거 보조 바퀴. 필요할 때 달지만, 실력이 늘면 떼는 것!

### Workflow/Preference (워크플로우)

```
Claude가 할 수 있지만 "우리 방식"이 중요한 것

예시:
- 팀 코드 리뷰 플로우
- NDA 체크리스트
- 배포 프로세스

특징:
- 장기 지속! 모델이 개선되어도 "우리 프로세스"는 변하지 않음
```

**비유**: 요리 레시피. 셰프 실력이 좋아져도 "우리 가게 맛"은 레시피를 따라야 함!

---

## 6. 팀 배포 — 마켓플레이스

팀원 모두가 같은 스킬을 쓰려면?

### settings.json (git tracked)

```json
{
  "extraKnownMarketplaces": {
    "team-tools": {
      "source": { "source": "github", "repo": "your-org/team-marketplace" }
    }
  },
  "enabledPlugins": {
    "skill-creator@claude-code-marketplace": true,
    "our-skills@team-tools": true
  }
}
```

### 배포 흐름

```
1. 팀 리더: GitHub에 마켓플레이스 레포 생성
2. 팀 리더: 스킬/플러그인을 레포에 추가
3. settings.json에 마켓플레이스 + 플러그인 등록
4. git push
5. 팀원: clone → trust 프롬프트 → 자동 설치!
```

**현재 제한**: plugin.json의 `dependencies` 필드는 미지원 (이슈 진행 중)

---

## 7. 설계 Best Practices

### 집중도 원칙

```
❌ 거대 스킬 하나 (1000줄)
  → 여러 상황에 트리거, FP 높음

✅ 작은 스킬 여러 개 + orchestrator
  → 각각 정확한 트리거, FP 낮음

SKILL.md 500줄 이내 권장
상세 내용은 REFERENCE.md, scripts/로 분리 (L3)
```

### 호출 제어 가이드

```
위험한 작업 (배포, 삭제)  → disable-model-invocation: true
배경 지식 (컨벤션, 원칙)  → user-invocable: false
격리 필요 (분석, 생성)    → context: fork
```

### 의존성 관리

```
스킬 A → output.json → 스킬 B   (파일 기반 계약)
orchestrator 스킬이 순서 제어     (명시적 오케스트레이션)
```

---

## 따라하기

### 실습 1: Progressive Disclosure 체험

```bash
# .claude/skills/ 폴더에 스킬 만들기
mkdir -p .claude/skills/hello-v2/

# SKILL.md 작성 (L1 메타 + L2 지침)
cat > .claude/skills/hello-v2/SKILL.md << 'EOF'
---
name: hello-v2
description: |
  사용자가 인사하면 이 스킬을 사용합니다.
  "안녕", "hello" 키워드에 반응.
allowed-tools:
  - Read
---

## 인사 스킬 v2

1. 사용자의 이름을 확인합니다
2. GREETING_TEMPLATE.md를 참조하여 인사합니다
3. 오늘의 날씨 정보를 추가합니다
EOF

# L3 리소스 파일 (필요 시만 로드)
cat > .claude/skills/hello-v2/GREETING_TEMPLATE.md << 'EOF'
# 인사 템플릿
- 아침: "좋은 아침이에요, {이름}님!"
- 오후: "안녕하세요, {이름}님!"
- 저녁: "좋은 저녁이에요, {이름}님!"
EOF
```

### 실습 2: 고급 Frontmatter 활용

```bash
# 위험 작업 스킬 (사용자만 호출 가능)
cat > .claude/skills/danger-zone/SKILL.md << 'EOF'
---
name: danger-zone
description: |
  프로덕션 데이터베이스 작업 시 사용.
  "DB 마이그레이션", "스키마 변경" 키워드에 반응.
disable-model-invocation: true
allowed-tools:
  - Read
  - Bash(psql *)
context: fork
---

## 프로덕션 DB 작업

⚠️ 이 스킬은 사용자가 직접 `/danger-zone`으로만 실행할 수 있습니다.
Claude가 자동으로 실행할 수 없습니다.

1. 현재 스키마 백업
2. 마이그레이션 스크립트 검증 (dry-run)
3. 사용자 확인 후 실행
4. 롤백 계획 안내
EOF
```

### 실습 3: Skill Creator로 테스트

```bash
# Skill Creator 플러그인 설치
claude plugin install skill-creator

# Evals 실행 (스킬 품질 테스트)
# Claude에게 다음과 같이 말합니다:
# "hello-v2 스킬의 evals를 만들어줘"
# → 테스트 프롬프트 정의 → 격리 실행 → 결과 보고

# Description Optimization
# "hello-v2 스킬의 description을 최적화해줘"
# → FP/FN 분석 → 개선안 제안
```

---

## 핵심 정리

| 개념 | 한 줄 요약 |
|------|-----------|
| Progressive Disclosure | 목차만 보고 → 필요한 장만 → 부록은 나중에 |
| Frontmatter | 스킬의 메타데이터 (이름, 설명, 도구 제한, 격리 여부) |
| Evals | 스킬에게 시험 보이기 (격리, 자동, 반복 가능) |
| A/B Testing | 두 버전 블라인드 비교 |
| Description Optimization | 간판 문구 다듬기 (FP/FN 감소) |
| Capability Uplift | 보조 바퀴 (모델 발전 시 은퇴) |
| Workflow | 레시피 (영구 지속) |
| 팀 배포 | 마켓플레이스 + settings.json |

---

## 참고 자료

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Skill Creator 플러그인](https://claude.com/plugins/skill-creator)
- [Skills 2.0 분석 (Geeky Gadgets)](https://www.geeky-gadgets.com/anthropic-skill-creator/)
- [anthropics/skills GitHub](https://github.com/anthropics/skills/)
