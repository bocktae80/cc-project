window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["27-prompt-caching"] = {
  overview: `## 프롬프트 캐싱 TTL 제어 — 세션 비용을 반으로 줄이는 법

**도서관 대출증 유효기간**을 생각해보세요. 5분짜리 대출증은 책을 빌리고 바로 반납해야 하지만, 1시간짜리는 점심 먹고 돌아와서도 같은 책을 계속 볼 수 있어요. 프롬프트 캐시 TTL도 똑같습니다.

v2.1.108부터 **캐시 TTL을 1시간까지 확장**할 수 있는 환경 변수가 추가됐어요. 장시간 작업에서 **캐시 미스 비용을 크게 줄일 수 있습니다**.

### 이런 상황에서 유용해요
- **30분 이상 연속 작업**: 5분 TTL은 계속 만료됨 → 매번 전체 프롬프트 재전송
- **점심·미팅으로 중단**: 재개 시 캐시가 살아있으면 비용 0
- **Bedrock/Vertex/Foundry**: API 기반 세션에서 가장 효과 큼
- **리뷰·리서치**: 같은 코드베이스를 반복 탐색하는 패턴

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | 프롬프트 캐싱의 원리와 TTL의 의미 | 💡 개념 |
| 2 | 환경 변수로 TTL 전환하기 | 🔧 실습 |
| 3 | 세션 패턴별 TTL 선택 시나리오 | 💻 예제 |

### 비용 절감 직관

\`\`\`
같은 50K 토큰 프롬프트를 1시간 동안 10번 재사용한다고 가정

5분 TTL:
  첫 1회       → 50K 입력 (전체 비용)
  2~10회 (55분) → 매번 캐시 미스 → 9 × 50K 입력
  총합: 500K 입력

1시간 TTL:
  첫 1회       → 50K 입력 (캐시 쓰기 + 25% 할증)
  2~10회 (55분) → 매번 캐시 히트 → 9 × 5K 캐시 읽기
  총합: 62.5K + 45K = 107.5K 입력

→ 약 4.6배 비용 절감!
\`\`\`

> **핵심**: 장기 세션에서는 1시간 TTL의 쓰기 할증(~25%)보다 캐시 히트로 절감되는 비용이 훨씬 큽니다.`,

  concepts: [
    {
      id: "what-is-prompt-caching",
      title: "프롬프트 캐싱이란?",
      content: `### 도서관 대출증 비유

프롬프트 캐싱을 **도서관 대출증**에 비유해봅시다.

\`\`\`
일반 요청 (캐시 없음)
  → 매번 도서관 입구에서 이름/주소/연락처 작성
  → 매번 도서관 규칙 읽음
  → 그 다음에야 책을 볼 수 있음

캐시 적용 요청
  → 첫 방문 때 대출증 발급 (캐시 쓰기)
  → 다음 방문부터 대출증만 제시 (캐시 읽기, 훨씬 저렴)
  → 바로 책 내용으로 들어감
\`\`\`

#### 캐시의 대상

Claude Code가 매 턴마다 보내는 건 대부분 **반복되는 내용**이에요:

| 영역 | 캐시 대상? | 비유 |
|------|----------|------|
| 시스템 프롬프트 | ✅ | 도서관 규칙 |
| CLAUDE.md 내용 | ✅ | 내 회원 정보 |
| 이전 대화 기록 | ✅ | 지난번 빌린 책 목록 |
| 도구 설명 (tool schema) | ✅ | 이용 가능한 서비스 안내 |
| 이번 턴의 새 질문 | ❌ | 오늘 빌리고 싶은 새 책 |

→ 대화가 길어질수록 **반복 비율**이 90% 이상이 되고, 캐시 히트율이 곧 비용을 결정합니다.

#### TTL (Time-To-Live)란?

대출증 **유효기간**이에요.

\`\`\`
5분 TTL  : 5분 안에 다시 쓰지 않으면 대출증 만료 → 재발급 필요
1시간 TTL: 1시간 안에 쓰면 계속 유효
\`\`\`

> **핵심 요약**: 프롬프트 캐싱은 반복되는 시스템 프롬프트·CLAUDE.md·대화 기록을 서버에 저장해두고 **일부 비용(~10%)만 받고 재사용**하는 기능입니다. TTL은 이 "대출증"이 얼마나 오래 유효한지를 정합니다.`
    },
    {
      id: "ttl-tradeoff",
      title: "5분 vs 1시간 — 언제 뭘 쓸까?",
      content: `### TTL 선택의 트레이드오프

1시간 TTL이 무조건 저렴하진 않아요. **캐시 쓰기에 할증(약 +25%)**이 붙고, 짧은 세션에선 이 할증이 회수되지 않습니다.

#### 세션 패턴별 추천

| 패턴 | 세션 길이 | 추천 TTL | 이유 |
|------|----------|---------|------|
| 짧은 질문 한두 개 | <10분 | 5분 | 1시간 쓰기 할증 회수 불가 |
| 연속 코딩 작업 | 30분~2시간 | **1시간** | 5분 TTL로는 계속 재쓰기 |
| 점심·미팅으로 중단 | 1~2시간 | **1시간** | 재개 시 캐시 살아있음 |
| 리뷰/리서치 (같은 파일 반복) | 30분+ | **1시간** | 동일 컨텍스트 재사용 |
| 병렬 세션 여러 개 | 각 <10분 | 5분 | 개별이 짧으면 할증 불리 |

#### 비용 손익분기점

\`\`\`
1시간 TTL 쓰기 비용: 5분 TTL의 약 1.25배
→ 캐시를 "3회 이상" 읽으면 1시간 TTL이 더 싸다

3회 = 약 15~20분 안에 같은 캐시를 재사용하는 경우
\`\`\`

#### 지원 백엔드

| 백엔드 | \`ENABLE_PROMPT_CACHING_1H\` 지원 |
|--------|--------------------------------|
| API key (Anthropic) | ✅ |
| AWS Bedrock | ✅ |
| Google Vertex | ✅ (v2.1.108 신규) |
| Azure Foundry | ✅ (v2.1.108 신규) |
| Pro/Max 구독 | 자동 적용 (환경변수 불필요) |

> **핵심 요약**: 30분 이상 연속 작업하는 API 세션이라면 \`ENABLE_PROMPT_CACHING_1H=1\`을 거의 항상 켜세요. 10분 이내 단발 세션이나 병렬 세션이 많다면 5분이 유리합니다.`
    },
    {
      id: "env-vars",
      title: "환경 변수 사용법",
      content: `### 3가지 환경 변수

v2.1.108에서 정리된 프롬프트 캐싱 관련 환경 변수입니다.

| 변수 | 효과 | 적용 범위 |
|------|------|----------|
| \`ENABLE_PROMPT_CACHING_1H\` | 캐시 TTL 1시간으로 확장 | API key, Bedrock, Vertex, Foundry |
| \`FORCE_PROMPT_CACHING_5M\` | 1시간 TTL 비활성화, 5분 강제 | 전체 |
| \`DISABLE_PROMPT_CACHING\` | 캐시 **완전 비활성화** (시작 시 경고 표시) | 전체 |

#### deprecated (하위 호환만 유지)

- \`ENABLE_PROMPT_CACHING_1H_BEDROCK\`: Bedrock 전용이던 구 변수 → \`ENABLE_PROMPT_CACHING_1H\`로 통합

#### 설정 방법

\`\`\`bash
# 셸 세션 단위 (가장 일반적)
export ENABLE_PROMPT_CACHING_1H=1
claude

# 프로젝트 단위 (.env 파일)
echo 'ENABLE_PROMPT_CACHING_1H=1' >> .env

# 영구 설정 (zshrc/bashrc)
echo 'export ENABLE_PROMPT_CACHING_1H=1' >> ~/.zshrc

# 되돌리기
unset ENABLE_PROMPT_CACHING_1H
# 또는 5분 강제
export FORCE_PROMPT_CACHING_5M=1
\`\`\`

#### v2.1.108 버그 수정

| 이슈 | 해결 |
|------|------|
| \`DISABLE_TELEMETRY\` 설정 시 유료 구독자도 **5분 TTL로 폴백** | 텔레메트리 설정과 캐시 TTL 분리 |
| 캐시 비활성화 상태에서 **조용히 시작** | 시작 시 경고 표시 |

> **핵심 요약**: 장시간 API 세션에선 \`ENABLE_PROMPT_CACHING_1H=1\`, 짧은 병렬 세션에선 \`FORCE_PROMPT_CACHING_5M=1\`. 환경 변수 하나로 캐시 전략을 세션 단위로 바꿀 수 있습니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "현재 캐시 설정 확인하기",
      content: `### 내 세션이 어떤 TTL을 쓰고 있지?

현재 환경 변수 상태를 확인해 TTL 전략을 점검합시다.

#### 목표
- 현재 프롬프트 캐싱 관련 환경 변수를 확인
- 설정되지 않은 기본값이 무엇인지 파악
- 세션 시작 시 경고 메시지가 뜨는지 확인`,
      terminals: [
        {
          command: "env | grep -E 'PROMPT_CACHING|DISABLE_TELEMETRY'",
          output: `# (출력 없음 — 아무것도 설정하지 않은 기본 상태)
# → API key 사용자는 기본 5분 TTL
# → Pro/Max 구독자는 자동으로 1시간 TTL 적용`
        },
        {
          command: "claude --version",
          output: `2.1.108 (Claude Code)`
        }
      ]
    },
    {
      id: "step-02",
      title: "1시간 TTL 활성화",
      content: `### 장시간 작업용 설정

2시간 넘게 같은 저장소를 탐색할 예정이라면 1시간 TTL을 켭니다.

#### 목표
- \`ENABLE_PROMPT_CACHING_1H\` 활성화
- claude 재시작 후 캐시 TTL 적용 확인
- 세션 중간에 캐시 히트율이 어떻게 변하는지 관찰`,
      terminals: [
        {
          command: "export ENABLE_PROMPT_CACHING_1H=1",
          output: `# (환경 변수 설정 완료)`
        },
        {
          command: "env | grep PROMPT_CACHING",
          output: `ENABLE_PROMPT_CACHING_1H=1`
        },
        {
          command: "claude",
          output: `Claude Code v2.1.108
Prompt cache TTL: 1 hour
Ready.`
        }
      ]
    },
    {
      id: "step-03",
      title: "5분으로 되돌리기 또는 강제하기",
      content: `### 병렬 세션으로 작업 방식이 바뀌었을 때

짧은 세션 여러 개를 열어 작업할 땐 5분이 유리해요.

#### 목표
- \`FORCE_PROMPT_CACHING_5M\`으로 5분 강제
- 또는 \`unset\`으로 기본값 복귀
- 정책 관리 환경(팀 공용 머신)에서 특정 TTL을 강제`,
      terminals: [
        {
          command: "unset ENABLE_PROMPT_CACHING_1H",
          output: `# 기본 (5분) 으로 복귀`
        },
        {
          command: "export FORCE_PROMPT_CACHING_5M=1",
          output: `# 명시적으로 5분 강제
# → 조직 정책으로 1시간 TTL을 막을 때 사용`
        },
        {
          command: "claude",
          output: `Claude Code v2.1.108
Prompt cache TTL: 5 minutes (forced)
Ready.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "example-01",
      title: "시나리오 A — 오전 리뷰 세션 (1시간 TTL 이득)",
      content: `### 코드 리뷰 2시간 연속 세션

#### 상황
- 큰 PR을 2시간에 걸쳐 리뷰
- 같은 저장소의 다양한 파일을 반복 탐색
- 중간에 커피 한 잔 마시러 다녀옴 (15분 중단)

#### 5분 TTL이면?
\`\`\`
10:00  세션 시작, 50K 토큰 프롬프트 캐시 저장
10:05  캐시 만료 → 다음 질문에서 재작성 (50K)
10:10  또 재작성 (50K)
...
10:15  커피 다녀옴 → 다시 50K
11:00  세션 종료
→ 약 12회 재작성, 600K 토큰 입력
\`\`\`

#### 1시간 TTL이면?
\`\`\`
10:00  세션 시작, 50K × 1.25 = 62.5K (쓰기 할증)
10:05~10:55  매번 캐시 읽기 (5K × 10회 = 50K)
11:00  세션 종료
→ 약 112.5K 토큰 입력
\`\`\`

**→ 약 5.3배 비용 절감**`
    },
    {
      id: "example-02",
      title: "시나리오 B — 짧은 Q&A (5분 TTL 유리)",
      content: `### 빠른 질문 → 답변 → 종료

#### 상황
- "이 함수 뭐 하는 거야?" 한 번 묻고 끝
- 3분 안에 세션 마무리

#### 1시간 TTL이면?
\`\`\`
쓰기 할증 +25% 지불했는데 캐시 재사용 0회
→ 할증분이 그대로 손실
\`\`\`

#### 5분 TTL이면?
\`\`\`
할증 없이 첫 읽기만 지불
→ 가장 저렴
\`\`\`

**→ 짧은 세션에선 기본 5분이 최선**`
    },
    {
      id: "example-03",
      title: "시나리오 C — 병렬 3개 세션",
      content: `### cmux로 3개 창을 띄워 동시 작업

#### 상황
- 창 A: 프론트엔드 버그 디버깅 (10분)
- 창 B: 백엔드 테스트 작성 (8분)
- 창 C: 문서 수정 (5분)
- 각 세션이 서로 다른 저장소

#### 판단
각 세션이 10분 이내 → **5분 TTL이 유리**

\`\`\`bash
# 팀 공용 머신이라면 .zshrc에 강제
export FORCE_PROMPT_CACHING_5M=1
\`\`\`

**→ 병렬 단발 작업은 5분 TTL로 할증 회피**`
    }
  ],

  quiz: [
    {
      id: "q1",
      question: "v2.1.108에서 캐시 TTL을 1시간으로 확장하는 환경 변수는?",
      options: [
        "CLAUDE_CODE_CACHE_1H",
        "ENABLE_PROMPT_CACHING_1H",
        "PROMPT_TTL=3600",
        "ANTHROPIC_LONG_CACHE"
      ],
      correct: 1,
      explanation: "v2.1.108부터 API key, Bedrock, Vertex, Foundry 모든 백엔드에서 `ENABLE_PROMPT_CACHING_1H`로 통합됐어요. 이전의 `ENABLE_PROMPT_CACHING_1H_BEDROCK`은 deprecated이지만 하위 호환으로 계속 동작합니다."
    },
    {
      id: "q2",
      question: "다음 중 1시간 TTL이 가장 **불리한** 세션은?",
      options: [
        "2시간 연속 코드 리뷰",
        "점심 먹고 돌아와 이어하는 작업",
        "각 10분 이내 병렬 세션 3개",
        "30분 리서치 세션"
      ],
      correct: 2,
      explanation: "1시간 TTL은 쓰기 할증(+25%)이 붙어서 캐시를 3회 미만 읽으면 5분보다 비싸집니다. 각 10분 이내 병렬 세션은 캐시를 충분히 재사용하지 못해 할증만 부담하게 됩니다."
    },
    {
      id: "q3",
      question: "`DISABLE_TELEMETRY`가 설정된 유료 구독자가 v2.1.107까지 겪었던 문제는?",
      options: [
        "캐시가 전혀 동작하지 않음",
        "1시간 TTL이 조용히 5분으로 폴백됨",
        "비용이 두 배 청구됨",
        "세션이 5분마다 끊김"
      ],
      correct: 1,
      explanation: "텔레메트리 비활성화 상태에서 캐시 TTL이 조용히 5분으로 떨어지던 버그가 v2.1.108에서 수정됐어요. 이제 두 설정이 독립적으로 동작합니다."
    }
  ]
};
