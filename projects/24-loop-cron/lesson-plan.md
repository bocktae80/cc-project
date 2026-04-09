# 튜터 지시서: /loop & Cron 스케줄링 — 반복 자동 감시

> 이 파일은 `/learn 24` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

`/loop` 명령어와 Cron 도구로 프롬프트를 주기적으로 반복 실행하는 자동 감시 패턴을 이해한다.

## 핵심 비유

"알람 시계 + 비서! 알람이 울릴 때마다 비서가 알아서 확인하고 보고해줘요. 한 번 설정하면 계속 자동으로!"

## 연습 파일

- 개념: /loop vs 수동 반복: `projects/24-loop-cron/concepts/loop-vs-manual.md` (미생성, 콘텐츠 파일 내 포함)
- 개념: Cron 도구 3형제: `projects/24-loop-cron/concepts/cron-tools.md` (미생성, 콘텐츠 파일 내 포함)
- 개념: 동작 규칙 & 제한: `projects/24-loop-cron/concepts/rules-limits.md` (미생성, 콘텐츠 파일 내 포함)

## 교육 흐름

### Step 1: 수동 반복 vs /loop

1. "지금까지 '배포 됐어?' '아직?' '지금은?'처럼 계속 물어봐야 했죠? 이제 알람 시계를 맞춰두면 비서가 알아서 확인해줘요!"
2. 수동: 5분마다 직접 "배포 됐어?" 입력
3. /loop: `/loop 5m 배포 됐는지 확인해줘` → 자동 반복!
4. 비유: 알람 시계 = /loop, 비서 = 클로드

**확인 질문**: "/loop과 수동 반복의 가장 큰 차이는?"
-> 기대 답변: /loop은 한 번 설정하면 자동으로 반복되고, 수동은 매번 직접 입력해야 함

### Step 2: /loop 문법

1. 기본 형태: `/loop [간격] <프롬프트>`
2. 간격 생략 시 기본 10분
3. 간격 단위: s(초), m(분), h(시), d(일)
4. 앞/뒤 위치 모두 가능: `/loop 5m ...` 또는 `... every 5m`
5. 다른 스킬 반복: `/loop 20m /review-pr 1234`

### Step 3: Cron 도구 3형제

1. CronCreate: 새 예약 작업 생성 (5필드 크론 표현식)
2. CronList: 모든 예약 작업 목록 (8자 ID)
3. CronDelete: ID로 작업 취소
4. 자연어로도 관리: "작업 목록 보여줘", "배포 체크 취소해줘"

### Step 4: 실습 — 배포 모니터 + 리마인더

1. `/loop 2m check deployment status` 설정
2. `in 30 minutes, remind me to review PRs` 일회성 리마인더
3. 작업 목록 확인 & 취소

### Step 5: 고급 — 진화 루프 & 메타 루프

1. /loop의 숨겨진 특성: **같은 세션 컨텍스트**에서 실행 → 이전 결과를 기억
2. 진화 4단계: 관찰 → 평가 → 변이 → 선택을 /loop 하나로 구현 가능
3. 수렴적 개선: `/loop 15m find ONE thing to improve, fix it, verify`
4. 적응형 레드팀: `/loop 20m try NEW attack vector, don't repeat previous`
5. 테스트 진화: `/loop 30m find ONE untested edge case, write a test`
6. 파일을 외부 메모리로: EVOLUTION_LOG.md에 상태 기록 → 컨텍스트 압축 극복
7. 메타 루프: Ralph Loop(실행자) + /loop(감시자) 이중 나선

**확인 질문**: "/loop이 단순 감시가 아니라 진화 루프가 될 수 있는 이유는?"
→ 기대 답변: 같은 세션 컨텍스트에서 실행되어 이전 결과를 기억하고, 모든 도구에 접근 가능하므로 관찰→평가→변이→선택 전체 사이클을 돌릴 수 있음

### 마무리

"축하해요! 이제 클로드가 알아서 반복 확인해주는 자동 감시를 설정할 수 있어요!
기억할 것:
- `/loop 간격 프롬프트`로 반복 감시
- 자연어로 일회성 리마인더
- 세션이 끝나면 사라짐 (가벼운 모니터링용!)
- 지속적 자동화는 GitHub Actions 사용
- 고급: 파일 외부 메모리 + 진화 4단계로 점진적 코드 개선
- 최상급: Ralph Loop과 조합하면 실행+검증의 풀스택 자동화!"
