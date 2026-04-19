window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["24-loop-cron"] = {
  overview: `## /loop & Cron 스케줄링 — 반복 자동 감시 설정하기

**알람 시계 + 비서**를 상상해보세요! 알람이 울릴 때마다 비서가 알아서 확인하고 보고해줍니다.
\`/loop\`은 프롬프트를 주기적으로 반복 실행하는 자동 감시 기능이에요.

### 이런 상황에서 유용해요
- **배포 감시**: "배포 끝나면 알려줘" — /loop 2m으로 2분마다 자동 체크
- **PR 상태 추적**: "CI 통과되면 바로 알고 싶어" — 반복 루프로 실시간 모니터링
- **일회성 리마인더**: "30분 뒤에 PR 리뷰 상기시켜줘" — 자연어로 알람 설정

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | /loop 문법, Cron 도구 3형제, 동작 규칙 & 제한 | 💡 개념 |
| 2 | 첫 /loop 설정, 리마인더 & 복합 루프, 릴리스 시나리오 | 🔧 실습 |
| 3 | 멀티 모니터 대시보드, PR 라이프사이클 감시, 진화 루프 | 💻 예제 |

### 수동 반복 vs /loop

\`\`\`
수동 (직접 반복)              /loop (자동 반복)
─────────────────            ──────────────────
> 배포 됐어?                  /loop 2m 배포 됐는지 확인해줘
Claude: 아직이요               → 2분마다 자동 확인!
(5분 후)                      → 완료되면 알려줌
> 지금은?                     → 나는 다른 일 가능!
Claude: 아직이요...
(5분 후)
> 또 확인해줘...

비유: 직접 시계 보기           비유: 알람 시계 맞춰두기
\`\`\`

### 핵심 도구

| 도구 | 역할 | 비유 |
|------|------|------|
| \`/loop\` | 반복 프롬프트 설정 | 알람 시계 맞추기 |
| \`CronCreate\` | 세밀한 스케줄 생성 | 복잡한 알람 설정 |
| \`CronList\` | 예약 작업 목록 | 알람 목록 보기 |
| \`CronDelete\` | 작업 취소 | 알람 끄기 |

### 세 가지 사용법

\`\`\`bash
# 1. /loop으로 반복 감시
/loop 5m check if the deployment finished

# 2. 자연어로 일회성 리마인더
in 45 minutes, remind me to push

# 3. 자연어로 작업 관리
what scheduled tasks do I have?
cancel the deploy check job
\`\`\``,

  concepts: [
    {
      id: "loop-syntax",
      title: "/loop 문법 마스터",
      content: `### 알람 시계 설정하기

\`/loop\`의 기본 문법은 아주 간단해요!

#### 기본 형태

\`\`\`
/loop [간격] <프롬프트>
\`\`\`

#### 간격 단위

| 단위 | 뜻 | 예시 | 실제 간격 |
|------|-----|------|----------|
| \`s\` | 초 | \`30s\` | 1분 (최소 단위로 올림) |
| \`m\` | 분 | \`5m\` | 5분 |
| \`h\` | 시간 | \`2h\` | 2시간 |
| \`d\` | 일 | \`1d\` | 24시간 |
| (생략) | 기본 | - | 10분 |

#### 간격 위치 — 앞에도 뒤에도 OK!

\`\`\`bash
# 방법 1: 간격을 앞에 (추천!)
/loop 5m check if the build finished

# 방법 2: every로 뒤에
/loop check if the build finished every 5m

# 방법 3: 간격 생략 → 10분 기본값
/loop check if the build finished
\`\`\`

#### 다른 명령어를 반복 실행

\`\`\`bash
# /review-pr 스킬을 20분마다 반복
/loop 20m /review-pr 1234

# /simplify를 1시간마다 반복
/loop 1h /simplify check for new code smells
\`\`\`

#### 비유: 알람 시계 종류

\`\`\`
/loop 2m ...    → 2분 알람 (급한 배포 감시)
/loop 30m ...   → 30분 알람 (PR 리뷰 체크)
/loop 1h ...    → 1시간 알람 (느긋한 모니터링)
/loop 1d ...    → 하루 알람 (일일 리포트)
\`\`\`

> **핵심**: 간격 + 프롬프트만 기억하면 됩니다! 클로드가 알아서 크론 표현식으로 변환해줘요.

> **핵심 요약**: \`/loop [간격] 프롬프트\` 형식으로 반복 감시를 설정합니다. 간격은 s/m/h/d 단위(생략 시 10분), 위치는 앞뒤 모두 가능하며, 다른 스킬(/review-pr 등)도 반복 실행할 수 있습니다.`
    },
    {
      id: "cron-tools",
      title: "Cron 도구 3형제",
      content: `### 알람 시계의 내부 구조

\`/loop\`은 사실 내부에서 **Cron 도구**를 사용합니다. 직접 쓸 일은 드물지만, 알아두면 더 세밀한 제어가 가능해요!

#### 3가지 도구

\`\`\`
CronCreate   → "새 알람 등록" (크론 표현식 + 프롬프트)
CronList     → "알람 목록 보기" (ID, 스케줄, 프롬프트)
CronDelete   → "알람 끄기" (8자 ID로 취소)
\`\`\`

#### CronCreate — 5필드 크론 표현식

\`\`\`
분  시  일  월  요일
*   *   *   *   *

예시:
*/5 * * * *    → 5분마다
0 * * * *      → 매시 정각
0 9 * * *      → 매일 오전 9시
0 9 * * 1-5    → 평일 오전 9시
30 14 * * *    → 매일 오후 2시 30분
\`\`\`

#### 자연어로 관리 (추천!)

직접 도구를 부르지 않아도 자연어로 충분해요:

\`\`\`
"예약된 작업이 뭐 있어?"   → CronList 호출
"배포 체크 취소해줘"       → CronDelete 호출
"매시간 정각에 확인해줘"    → CronCreate 호출
\`\`\`

#### 일회성 리마인더

반복이 아닌 **한 번만** 알려주는 것도 가능해요:

\`\`\`
remind me at 3pm to push the release branch
→ 오후 3시에 한 번 알려주고 자동 삭제!

in 45 minutes, check whether the tests passed
→ 45분 후에 한 번 확인하고 자동 삭제!
\`\`\`

#### 동시 작업 한도

\`\`\`
최대 50개의 예약 작업을 동시에 설정할 수 있어요.
보통은 2-3개면 충분합니다!
\`\`\`

> **핵심**: 대부분은 \`/loop\`과 자연어만으로 충분해요. 크론 표현식은 고급 사용자를 위한 옵션!

> **핵심 요약**: /loop은 내부적으로 CronCreate/CronList/CronDelete 3가지 도구를 사용합니다. 자연어("예약된 작업이 뭐 있어?")로 관리할 수 있고, 일회성 리마인더도 "in 45 minutes, remind me to..."로 간편하게 설정 가능합니다.`
    },
    {
      id: "rules-limits",
      title: "동작 규칙 & 제한",
      content: `### 알람 시계의 규칙

/loop은 강력하지만 몇 가지 규칙이 있어요. 미리 알아두면 "왜 안 되지?" 하는 순간을 피할 수 있습니다!

#### 핵심 규칙 5가지

\`\`\`
1. 세션 스코프     터미널 닫으면 모든 작업 사라짐
2. 유휴 시 실행    클로드 응답 중이면 끝날 때까지 대기
3. 3일 만료        반복 작업은 3일 후 자동 삭제
4. 누락 보정 없음   놓친 실행은 유휴 시 1회만 실행
5. 로컬 타임존     내 시간대 기준 (UTC 아님!)
\`\`\`

#### 지터(Jitter) — 왜 정확히 정시에 안 울릴까?

\`\`\`
여러 사람이 동시에 /loop을 쓰면?
→ 모두 같은 시각에 API를 호출!
→ 서버에 부하가 집중됨

해결: 지터(Jitter) = 약간의 랜덤 지연
→ 반복 작업: 주기의 10% (최대 15분) 오프셋
→ 1시간 루프 → 실제로 :00~:06 사이에 실행

비유: 학교 종이 울리면 모든 학생이 동시에 문으로!
     → 몇 초씩 시차를 두면 혼잡 방지
\`\`\`

#### 비활성화

\`\`\`bash
# 환경 변수로 크론 기능 완전 비활성화
CLAUDE_CODE_DISABLE_CRON=1
\`\`\`

> **v2.1.72 추가**: \`CLAUDE_CODE_DISABLE_CRON\` 환경변수를 세션 중간에 설정하면 **즉시** 예약 작업이 중단됩니다. 이전에는 세션 시작 시에만 적용되었어요.

#### Bedrock/Vertex/Foundry 지원 (v2.1.73)

\`/loop\`이 이제 **모든 프로바이더**에서 동작합니다! 이전에는 Anthropic 직접 API에서만 사용 가능했어요.

\`\`\`
이전: Bedrock/Vertex 환경에서
  /loop 5m check deploy → ❌ "/loop is not available"

이후: 모든 클라우드 프로바이더에서
  /loop 5m check deploy → ✓ 정상 동작!
\`\`\`

| 프로바이더 | 환경변수 | 활용 예시 |
|-----------|---------|----------|
| AWS Bedrock | \`CLAUDE_CODE_USE_BEDROCK=1\` | \`/loop 10m check CloudWatch alarms\` |
| Google Vertex | \`CLAUDE_CODE_USE_VERTEX=1\` | \`/loop 5m monitor Cloud Run deploy\` |
| MS Foundry | \`CLAUDE_CODE_USE_FOUNDRY=1\` | \`/loop 15m check Azure pipeline\` |

> 같은 릴리스에서 Bedrock/Vertex/Foundry의 기본 Opus 모델이 **Opus 4.1 → Opus 4.6**으로 업데이트되었습니다.

#### 지속적 스케줄링이 필요하면?

\`\`\`
/loop (세션 스코프)        → 개발 중 임시 감시
                            "배포 끝나면 알려줘"

GitHub Actions (지속적)    → CI/CD 자동화
                            "매일 밤 테스트 실행"

Desktop 예약 작업 (지속적) → GUI로 설정
                            "매주 월요일 리포트"
\`\`\`

#### 비교 표

| 항목 | /loop | GitHub Actions | Desktop 예약 |
|------|-------|---------------|-------------|
| 수명 | 세션 동안 | 영구 | 영구 |
| 설정 | 한 줄 | YAML 파일 | GUI |
| 터미널 필요 | 예 | 아니오 | 아니오 |
| 복잡한 스케줄 | 제한적 | 완전 지원 | 완전 지원 |
| 용도 | 임시 감시 | CI/CD 자동화 | 정기 작업 |

> **핵심**: /loop은 "지금 당장 감시가 필요할 때" 최고! 지속적 자동화는 다른 도구를 쓰세요.

#### v2.1.105~2.1.113 개선 모음

| 개선 | 설명 | 버전 |
|------|------|------|
| **\`/proactive\` alias** | \`/proactive\`가 \`/loop\`의 **공식 별칭**으로 추가됨 — 감시 맥락을 강조하고 싶을 때 사용 | v2.1.105 |
| **스케줄 작업 복원** | \`--resume\` / \`--continue\`가 **만료되지 않은 스케줄 작업**까지 함께 되살림 — 세션 재개 시 Cron 대기열도 복원 | v2.1.110 |
| **리모컨 슬래시 커맨드** | \`/autocompact\`, \`/context\`, \`/exit\`, \`/reload-plugins\`를 **Remote Control(모바일/웹)에서도** 실행 가능 | v2.1.110 |
| **Esc로 wakeup 취소** | \`/loop\` 대기 중 **Esc 키로 pending wakeup 즉시 취소** | v2.1.113 |
| **wakeup 표시 개선** | \`/loop\` 재개 시 "Claude resuming /loop wakeup"으로 **명확히 표시** | v2.1.113 |
| **1회성 작업 라벨** | 종료 확인 다이얼로그가 1회성 스케줄 작업을 "반복"으로 **잘못 표시하던 버그 수정** — 카운트다운 표시 | v2.1.113 |

\`\`\`
비유: 알람 시계 리모컨 확장

이전: "알람 시계를 맞춰뒀는데 중간에 끄려면 바로 옆에 있어야 했음"
  /loop 5m check → 취소하려면 Ctrl+C (세션 전체 종료 위험)

이후 (v2.1.113):
  /loop 5m check → Esc 한 번 → 대기 중인 wakeup만 깔끔히 취소!
  재개 시 "Claude resuming /loop wakeup" 메시지로 흐름 명확

+ Remote Control에서 /context, /exit 등을 **모바일로도 조작** (v2.1.110)
\`\`\`

> **\`/proactive\` vs \`/loop\`**: 동일한 기능의 별칭입니다. "감시"/"적극적 확인" 맥락을 문서/스킬에서 강조하고 싶을 때 \`/proactive\`를 쓰세요. 동작은 완전히 같습니다.

> **핵심 요약**: /loop은 세션 스코프(터미널 닫으면 사라짐), 3일 자동 만료, 유휴 시에만 실행, 로컬 타임존 기준 등의 규칙이 있습니다. v2.1.110부터 \`--resume\`으로 스케줄 작업이 복원되고, v2.1.113부터 Esc로 pending wakeup을 즉시 취소할 수 있습니다. 지속적 스케줄링이 필요하면 GitHub Actions나 Desktop 예약 작업을 사용하세요.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 번째 /loop 설정",
      content: `### 알람 시계 처음 맞춰보기

가장 간단한 /loop부터 시작해봐요!

#### 목표
- /loop으로 반복 프롬프트를 설정합니다
- 예약 작업 목록을 확인합니다
- 작업을 취소합니다

#### 따라하기

**1단계:** 간단한 /loop을 설정합니다.

**2단계:** 예약 작업 목록을 확인합니다.

**3단계:** 작업을 취소합니다.`,
      terminals: [
        {
          command: '# 배포 상태를 2분마다 확인하는 루프 설정',
          output: `> /loop 2m check if the Vercel deployment finished and tell me the status

I've set up a recurring task to check the deployment status every 2 minutes.

Scheduled task:
  ID:       a1b2c3d4
  Schedule: */2 * * * * (every 2 minutes)
  Prompt:   "check if the Vercel deployment finished and tell me the status"
  Next run: 14:32 (in ~2 minutes)

I'll check automatically and report back. You can keep working!`
        },
        {
          command: '# 예약 작업 목록 확인',
          output: `> what scheduled tasks do I have?

You have 1 scheduled task:

  ID        Schedule              Next Run    Prompt
  a1b2c3d4  */2 * * * * (2분)     14:32       check if the Vercel deployment...

Total: 1 task`
        },
        {
          command: '# 2분 후 자동 실행 결과',
          output: `[Scheduled: a1b2c3d4] Checking deployment status...

The Vercel deployment is still in progress.
  - Build: completed (2/2 steps)
  - Deploy: deploying... (78%)
  - Estimated: ~1 minute remaining

I'll check again in 2 minutes.

─── (2분 후) ───

[Scheduled: a1b2c3d4] Checking deployment status...

The Vercel deployment has completed successfully!
  - URL: https://my-app.vercel.app
  - Build time: 1m 23s
  - Status: Ready

You may want to cancel this task now that the deploy is done.`
        },
        {
          command: '# 작업 취소',
          output: `> cancel the deploy check

Cancelled task a1b2c3d4 (check if the Vercel deployment finished).
No remaining scheduled tasks.`
        }
      ]
    },
    {
      id: "step-02",
      title: "일회성 리마인더 & 복합 루프",
      content: `### 다양한 알람 패턴

반복 루프뿐만 아니라 일회성 리마인더와 여러 루프를 조합하는 방법을 배워요!

#### 목표
- 자연어로 일회성 리마인더를 설정합니다
- 여러 /loop을 동시에 운영합니다
- 다른 스킬을 반복 실행합니다

#### 따라하기

**1단계:** 일회성 리마인더를 설정합니다.

**2단계:** 여러 루프를 동시에 설정합니다.

**3단계:** 스킬을 반복 실행합니다.`,
      terminals: [
        {
          command: '# 일회성 리마인더 (자연어)',
          output: `> in 30 minutes, remind me to review the open PRs

I've set a one-time reminder for 15:05 (in 30 minutes).

Scheduled task:
  ID:       e5f6g7h8
  Schedule: 5 15 * * * (one-time)
  Fires at: 15:05
  Prompt:   "remind me to review the open PRs"

This will fire once and then auto-delete.

─── (30분 후) ───

[Reminder] Hey! Time to review the open PRs.

You have 3 open PRs waiting for review:
  - #42: feat: add user profile page (by @jane)
  - #45: fix: login timeout issue (by @bob)
  - #47: refactor: database queries (by @alice)

(Reminder auto-deleted)`
        },
        {
          command: '# 여러 루프 동시 운영',
          output: `> /loop 3m check CI status for PR #42
> /loop 10m check for new GitHub issues labeled "urgent"
> /loop 1h generate a summary of today's git commits

3 tasks scheduled:

  ID        Schedule     Prompt
  k1l2m3n4  */3 * * * *  check CI status for PR #42
  o5p6q7r8  */10 * * * * check for new GitHub issues labeled "urgent"
  s9t0u1v2  0 * * * *    generate a summary of today's git commits

All running. Use "cancel [task description]" to stop any.`
        },
        {
          command: '# 스킬을 반복 실행',
          output: `> /loop 20m /review-pr 42

I've set up a recurring task to run /review-pr 42 every 20 minutes.

Scheduled task:
  ID:       w3x4y5z6
  Schedule: */20 * * * * (every 20 minutes)
  Prompt:   "/review-pr 42"

Each time it fires, I'll run the full PR review skill on PR #42 and report any new findings.`
        }
      ]
    },
    {
      id: "step-03",
      title: "실전 시나리오: 배포 + 모니터링",
      content: `### 릴리스 데이 자동화

실제 릴리스 날에 /loop을 어떻게 활용하는지 풀 시나리오를 체험해봐요!

#### 시나리오

1. 스테이징 배포 완료 대기
2. 테스트 통과 확인
3. 프로덕션 배포 감시
4. 헬스체크 모니터링

#### 따라하기

릴리스 파이프라인의 각 단계를 /loop으로 감시합니다.`,
      terminals: [
        {
          command: '# 릴리스 데이: 4단계 자동 감시 설정',
          output: `> /loop 2m check if staging deployment finished. When done, run tests and report.

Scheduled task:
  ID:       rel1stg2
  Schedule: */2 * * * * (every 2 minutes)
  Prompt:   "check if staging deployment finished..."

─── (4분 후) ───

[Scheduled: rel1stg2] Staging deployment complete!
  - Environment: staging.myapp.com
  - Version: v2.5.0
  - Status: Ready

Running test suite...
  Unit tests:   142/142 passed
  Integration:  38/38 passed
  E2E:          12/12 passed

All tests passed! Ready for production deployment.
(Cancelling this task — staging is done.)

Shall I set up a production deployment monitor?`
        },
        {
          command: '# 프로덕션 배포 감시로 전환',
          output: `> yes, monitor production deploy every 1 minute

Scheduled task:
  ID:       rel3prd4
  Schedule: */1 * * * * (every minute)
  Prompt:   "check production deployment status"

─── (3분 후) ───

[Scheduled: rel3prd4] Production deployment update:
  - Rolling update: 3/5 pods updated
  - Old pods: 2 remaining
  - No errors detected

─── (2분 후) ───

[Scheduled: rel3prd4] Production deployment COMPLETE!
  - All 5/5 pods running v2.5.0
  - Zero downtime achieved
  - Response time: 45ms avg (normal)

Switching to health monitoring mode...
(Cancelled deploy monitor, setting up health check)`
        },
        {
          command: '# 배포 후 헬스체크 모니터링',
          output: `> /loop 5m monitor production health: response time, error rate, CPU usage

Scheduled task:
  ID:       rel5hlt6
  Schedule: */5 * * * * (every 5 minutes)
  Prompt:   "monitor production health..."

─── (5분 후) ───

[Scheduled: rel5hlt6] Health Report (15:30):
  Response time: 52ms avg (normal, baseline: 45ms)
  Error rate:    0.02% (normal)
  CPU usage:     34% (normal)
  Memory:        62% (normal)
  Status: ALL GREEN

─── (5분 후) ───

[Scheduled: rel5hlt6] Health Report (15:35):
  Response time: 48ms avg (improved!)
  Error rate:    0.01% (excellent)
  CPU usage:     31% (decreasing)
  Memory:        61% (stable)
  Status: ALL GREEN

Everything looks stable. You can safely cancel this monitor.

> cancel health monitor
Cancelled task rel5hlt6. No remaining scheduled tasks.
Release v2.5.0 deployed and verified successfully!`
        }
      ]
    }
  ],

  examples: [
    {
      id: "multi-monitor",
      title: "멀티 모니터 대시보드",
      content: `### 실전: 여러 시스템을 동시에 감시하기

#### 시나리오

마이크로서비스 환경에서 API 서버, DB, 큐 시스템을 동시에 모니터링합니다.

#### 설정

\`\`\`bash
# API 서버 헬스 (3분마다)
/loop 3m check API health endpoint, report status and response time

# 데이터베이스 연결 풀 (10분마다)
/loop 10m check database connection pool usage, warn if > 80%

# 메시지 큐 백로그 (5분마다)
/loop 5m check message queue depth, alert if > 1000 messages

# 에러 로그 요약 (15분마다)
/loop 15m summarize new ERROR entries in application logs
\`\`\`

#### 결과 예시

\`\`\`
[Scheduled: api-hlth] API Health (14:03):
  /api/users:    200 OK (32ms)
  /api/products: 200 OK (45ms)
  /api/orders:   200 OK (67ms)
  All endpoints healthy.

[Scheduled: db-pool] Database Pool (14:10):
  Active: 12/50 (24%)
  Idle: 38/50
  Wait queue: 0
  Status: Normal

[Scheduled: mq-dept] Message Queue (14:05):
  Depth: 47 messages
  Processing rate: 120/min
  Status: Normal (well below 1000 threshold)

[Scheduled: err-logs] Error Summary (14:15):
  New errors since last check: 2
  - 14:08 TimeoutError: Redis connection timeout (retry succeeded)
  - 14:12 ValidationError: Invalid email format in /api/users
  No critical errors. Both are expected/handled.
\`\`\``,
      checklist: [
        "/loop [간격] 프롬프트로 반복 감시를 설정할 수 있다",
        "자연어로 일회성 리마인더를 설정할 수 있다",
        "예약 작업을 목록으로 확인하고 취소할 수 있다",
        "여러 /loop을 동시에 운영할 수 있다",
        "/loop과 다른 스킬을 조합해서 반복 실행할 수 있다"
      ]
    },
    {
      id: "pr-lifecycle",
      title: "PR 라이프사이클 자동 감시",
      content: `### 실전: PR 상태를 자동으로 추적하기

#### 시나리오

PR을 열고 머지까지의 전 과정을 /loop으로 자동 추적합니다.

#### 워크플로우

\`\`\`bash
# 1. CI 체크 감시 (3분마다, CI가 끝나면 취소)
/loop 3m check CI checks on PR #42, cancel this loop when all pass

# 2. 리뷰 코멘트 감시 (15분마다)
/loop 15m check PR #42 for new review comments, summarize any new ones

# 3. 승인 대기 (30분마다)
/loop 30m check if PR #42 has required approvals for merge

# 4. 머지 후 배포 확인 (머지 시 수동 전환)
# PR이 머지되면 →
/loop 2m check if the deployment from merged PR #42 completed
\`\`\`

#### 결과 예시

\`\`\`
[Scheduled] CI Check (14:03):
  lint: passed
  unit-test: passed
  e2e-test: running... (3/5 suites done)
  Still waiting for E2E to complete.

[Scheduled] CI Check (14:06):
  lint: passed
  unit-test: passed
  e2e-test: passed
  build: passed
  All checks passed! (Cancelling CI monitor)

[Scheduled] Review Comments (14:15):
  New comment from @jane (14:12):
  "Nice approach! One suggestion: consider using useMemo
   for the filtered list on line 45."

  Action needed: address 1 review comment.

[Scheduled] Approval Status (14:30):
  Approvals: 1/2 required
  - @jane: approved
  - @bob: review requested (pending)
  Still waiting for @bob's review.

[Scheduled] Approval Status (15:00):
  Approvals: 2/2 required
  - @jane: approved
  - @bob: approved
  PR is ready to merge!
\`\`\``,
      checklist: [
        "PR 라이프사이클의 각 단계에 맞는 루프를 설정할 수 있다",
        "단계가 완료되면 루프를 취소하고 다음 단계로 전환할 수 있다",
        "실시간 코멘트 감시로 빠르게 대응할 수 있다",
        "세션 스코프의 한계를 이해하고 적절히 사용할 수 있다"
      ]
    },
    {
      id: "evolution-loop",
      title: "진화 루프: 점진적 코드 개선",
      content: `### 고급: /loop을 피드백 루프로 활용하기

/loop의 숨겨진 핵심 — **같은 세션 컨텍스트**에서 실행되므로 매 반복이 이전 결과를 기억합니다.
이걸 이용하면 단순 감시가 아니라 **점진적 진화 루프**를 만들 수 있어요!

#### /loop vs Ralph Loop — 근본적 차이

\`\`\`
Ralph Loop                       /loop 진화 루프
──────────                       ──────────────
"다음 할 일을 찾아서 해"           "현재 상태를 보고 하나 개선해"
작업 목록 기반 (prd.json)          시간 기반 (간격마다 평가)
목표: 기능 구현 완주               목표: 품질 수렴
실행 주기: 작업 완료 시             실행 주기: 고정 간격
세션 간 지속 (progress.txt)        세션 스코프 (파일로 보완)

Ralph = "what to do" 루프 (실행)
/loop = "how well" 루프 (검증)
\`\`\`

#### 진화의 4단계 — /loop으로 모두 가능

\`\`\`
관찰 (Observe)   → 파일 읽기, 테스트 실행, 로그 분석
평가 (Evaluate)  → 이전 결과와 비교, 기준 대비 점수화
변이 (Mutate)    → 코드 수정, 테스트 추가, 문서 갱신
선택 (Select)    → 테스트 통과하면 유지, 실패하면 롤백
\`\`\`

같은 세션이라 모든 도구(Read, Edit, Bash, Grep...)에 접근할 수 있어서,
\`/loop\` 하나로 관찰→평가→변이→선택의 전체 진화 사이클을 돌릴 수 있습니다!

#### 패턴 A: 수렴적 개선 (Convergent Refinement)

\`\`\`bash
/loop 15m review the current implementation against the spec.
  Find ONE thing to improve, implement it, then verify.
  Stop suggesting things you already fixed.
\`\`\`

\`\`\`
[15분] 함수명이 불명확 → 리네이밍 실행
[30분] (이전 수정 기억) 에러 처리 누락 → try-catch 추가
[45분] (이전 2개 기억) 테스트 커버리지 부족 → 테스트 3개 추가
[60분] 이전 개선사항 모두 확인, 새 이슈 없음 → "수렴 완료"
\`\`\`

매 반복마다 하나씩 개선하면서 품질이 수렴합니다.

#### 패턴 B: 적응형 레드팀 (Adaptive Red Team)

\`\`\`bash
/loop 20m try to break the API with a NEW attack vector each time.
  Don't repeat previous attempts.
  Document findings in security-audit.md.
\`\`\`

\`\`\`
[20분] SQL 인젝션 시도 → 차단됨, 기록
[40분] (SQL은 했으니) XSS 시도 → 취약점 발견! 기록
[60분] (SQL, XSS 했으니) CSRF 시도 → 부분적 취약, 기록
[80분] (이전 3개 기억) 인증 우회 시도 → 차단됨, 기록
\`\`\`

이전 시도를 기억하므로 매번 다른 각도로 공격 — 탐색 공간을 점진적으로 확장합니다.

#### 패턴 C: 테스트 진화 (Progressive Hardening)

\`\`\`bash
/loop 30m look at the codebase, find ONE edge case
  that isn't tested yet. Write a test for it.
  Don't duplicate existing tests. Check that all tests pass.
\`\`\`

\`\`\`
[30분] null 입력 테스트 없음 → 작성, 통과
[60분] (null은 했으니) 빈 배열 테스트 → 작성, 실패! → 프로덕션 코드 수정
[90분] (null, 빈 배열 했으니) 동시성 테스트 → 작성, 통과
[120분] 경계값 테스트 → 작성, 통과
\`\`\`

테스트 스위트가 유기적으로 성장합니다.

#### 컨텍스트 한계 극복: 파일을 외부 메모리로

오래 돌면 초기 실행의 세부사항이 컨텍스트 압축됩니다. 해결법:

\`\`\`bash
/loop 30m review code quality.
  Read EVOLUTION_LOG.md for previous findings.
  Add new findings to EVOLUTION_LOG.md.
  This file is your persistent memory across iterations.
\`\`\`

파일에 상태를 기록하면 컨텍스트 압축에도 이전 판단을 완벽히 유지합니다.`,
      checklist: [
        "/loop이 같은 세션 컨텍스트에서 실행됨을 이해한다",
        "관찰→평가→변이→선택의 4단계 진화 루프를 설계할 수 있다",
        "수렴적 개선 패턴으로 코드 품질을 점진적으로 높일 수 있다",
        "파일을 외부 메모리로 사용해 컨텍스트 한계를 극복할 수 있다",
        "/loop(품질 검증)과 Ralph Loop(기능 구현)의 역할 차이를 설명할 수 있다"
      ]
    },
    {
      id: "meta-loop",
      title: "메타 루프: /loop + Ralph Loop 조합",
      content: `### 고급: 실행자 + 감시자 이중 나선

가장 강력한 패턴 — Ralph Loop이 기능을 만들고, /loop이 품질을 검증하는 **이중 루프**입니다.

#### 구조

\`\`\`
Ralph Loop (실행자)              /loop (감시자)
─────────────────               ──────────────
prd.json에서 다음 기능 선택       주기적으로 구현 품질 검증
기능 구현 + 테스트                이슈 발견 시 issues.md에 기록
progress.txt 갱신                Ralph가 다음 루프에서 이슈 확인
다음 기능으로 이동                계속 감시...

     만든다 ←─── Ralph ───→ 완료 표시
       ↑                      ↓
     이슈 발견              다음 기능
       ↑                      ↓
     검증한다 ←── /loop ──→ 품질 OK?
\`\`\`

#### 실전 설정

\`\`\`bash
# Ralph Loop이 기능을 하나씩 구현하는 동안...
# 같은 세션에서 /loop으로 품질 감시 설정:

/loop 15m check the latest implemented feature.
  Run tests, review code quality, check against the PRD spec.
  If issues found, write them to issues.md with severity.
  If no issues, note "PASS" in issues.md.
\`\`\`

#### 실행 흐름

\`\`\`
[Ralph] Feature 1: 사용자 로그인 구현 완료
  ↓
[/loop 15분] Feature 1 검증:
  - 테스트: 5/5 통과
  - 코드 품질: any 타입 2곳 발견
  - PRD 대비: 비밀번호 재설정 누락
  → issues.md에 기록
  ↓
[Ralph] Feature 2 시작 전 issues.md 확인
  → Feature 1의 any 타입 수정
  → 비밀번호 재설정은 별도 Feature로 등록
  → Feature 2: 프로필 페이지 구현 시작
  ↓
[/loop 30분] Feature 1 재검증 + Feature 2 검증:
  - Feature 1: 이전 이슈 모두 해결됨 → PASS
  - Feature 2: 진행 중 (아직 검증 불가)
  ↓
[Ralph] Feature 2 구현 완료
  ↓
[/loop 45분] Feature 2 검증:
  - 테스트: 8/8 통과
  - 코드 품질: 양호
  - PRD 대비: 완전 일치
  → PASS!
\`\`\`

#### 관찰 → 패턴 인식 → 지식 축적

/loop을 더 오래 돌리면 **패턴을 인식**하기 시작합니다:

\`\`\`bash
/loop 30m analyze the last 100 log lines.
  Compare patterns with your previous observations.
  Update KNOWN_PATTERNS.md with any new insights.
  Track recurring vs one-off issues.
\`\`\`

\`\`\`
[30분] TimeoutError 3건 관찰 → 기록
[60분] TimeoutError 5건 추가 → 패턴 발견: 전부 Redis 연결
       → "Redis 불안정" 인사이트 추가
[90분] TimeoutError 감소 + 새 패턴: 메모리 사용량 증가
       → "메모리 누수 의심" 인사이트 추가
[120분] 이전 인사이트와 비교 → "Redis 안정화, 메모리 문제 지속"
       → 우선순위 조정: 메모리 이슈를 P0으로 승격
\`\`\`

시간에 따라 지식이 누적되고, 이전 관찰과 비교해서 추세를 판단합니다.

#### 포지셔닝 맵

\`\`\`
              한 번 실행          반복 실행
              ─────────          ─────────
  수동        일반 대화           직접 반복 입력
  자동        배치 모드 (-p)      /loop
  자율        -                  Ralph Loop

              감시/검증           구현/실행
              ────────           ────────
  /loop       ████████           ██░░░░░░
  Ralph       ██░░░░░░           ████████
  /loop+Ralph ████████           ████████  ← 풀스택 자동화!
\`\`\`

#### 한계와 대안

| 제한 | 영향 | 해결법 |
|------|------|--------|
| 3일 만료 | 장기 진화 불가 | 취소+재생성, 또는 GitHub Actions |
| 세션 스코프 | 재시작 시 상태 손실 | 파일(EVOLUTION_LOG.md)에 상태 기록 |
| 컨텍스트 압축 | 오래 돌면 초기 기억 희미 | 핵심 상태를 파일로 외부화 |
| 단일 스레드 | 긴 작업 중 건너뜀 | 짧은 검증 작업으로 분할 |

> **핵심**: /loop은 "만드는 것"이 아니라 "지켜보는 것"에 최적화된 루프.
> Ralph Loop과 결합하면 실행+검증의 완전한 피드백 사이클이 됩니다!`,
      checklist: [
        "/loop(감시자)과 Ralph Loop(실행자)의 이중 루프 구조를 이해한다",
        "issues.md를 통한 두 루프 간 소통 패턴을 설계할 수 있다",
        "패턴 인식 루프로 시간에 따른 지식 축적을 구현할 수 있다",
        "포지셔닝 맵에서 /loop, Ralph Loop, 배치 모드의 역할을 구분할 수 있다",
        "한계(3일 만료, 컨텍스트 압축)를 이해하고 파일 외부화로 극복할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "/loop의 기본 간격(interval)을 생략하면 몇 분마다 실행되나요?",
      options: [
        "1분마다",
        "5분마다",
        "10분마다"
      ],
      answer: 2,
      explanation: "간격을 생략하면 기본값인 10분마다 실행됩니다. 예: '/loop check the build'은 10분마다 빌드를 확인합니다."
    },
    {
      question: "/loop으로 설정한 작업은 언제 사라지나요?",
      options: [
        "영원히 유지된다",
        "터미널(세션)을 닫으면 사라진다",
        "1시간 후에 자동 삭제된다"
      ],
      answer: 1,
      explanation: "/loop은 세션 스코프입니다. 터미널을 닫거나 세션이 끝나면 모든 예약 작업이 사라집니다. 지속적 스케줄링이 필요하면 GitHub Actions를 사용하세요."
    },
    {
      question: "반복 작업의 최대 수명은?",
      options: [
        "1일 후 자동 만료",
        "3일 후 자동 만료",
        "7일 후 자동 만료"
      ],
      answer: 1,
      explanation: "반복 작업은 3일 후 자동 만료됩니다. 잊어버린 루프가 무한히 돌아가는 것을 방지하기 위한 안전장치입니다."
    },
    {
      question: "클로드가 다른 응답 중일 때 /loop 작업이 실행될 시간이 되면?",
      options: [
        "응답을 중단하고 /loop 작업을 우선 실행한다",
        "현재 응답이 끝난 후에 실행한다",
        "/loop 작업을 건너뛴다"
      ],
      answer: 1,
      explanation: "예약 작업은 유휴 시에만 실행됩니다. 클로드가 다른 응답 중이면 현재 턴이 끝날 때까지 대기한 후 실행합니다."
    },
    {
      question: "일회성 리마인더를 설정하는 가장 쉬운 방법은?",
      options: [
        "/loop 1 프롬프트 (1회 반복)",
        "CronCreate 도구를 직접 호출한다",
        "자연어로 'in 30 minutes, remind me to...'라고 말한다"
      ],
      answer: 2,
      explanation: "자연어로 'in 30 minutes, remind me to push'처럼 말하면 클로드가 자동으로 일회성 예약 작업을 생성하고, 실행 후 자동 삭제합니다."
    }
  ]
};
