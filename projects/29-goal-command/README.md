# 29 — /goal 자율 목표 (v2.1.139)

> 난이도: ⭐⭐⭐
> 추적 기능: `/goal` 명령어, 완료 조건 기반 멀티턴 자율 실행, elapsed/turns/tokens 오버레이, 헤드리스(`-p --goal`), Remote Control 지원

## 무엇을 배우나요

`/goal`은 **완료 조건**을 정하면 Claude가 턴을 넘어가며 **자율적으로 진행**하고 조건이 충족되면 스스로 종료하는 명령어입니다. v2.1.139에 추가됐어요.

- `/loop`이 **주기 기반**이라면, `/goal`은 **조건 기반**입니다.
- 결과가 검증 가능한 작업(테스트 통과, 빌드 성공, 보안 스캔 0건)에 강합니다.
- 인터랙티브 / `-p` 헤드리스 / Remote Control 모두 동작합니다.

## 왜 만들었나요

테스트 빨강을 자동으로 고치고 싶을 때, 기존엔 다음과 같은 흐름이 필요했습니다:

```bash
while ! npm test; do
  claude -p "테스트 실패 원인을 분석하고 src/를 수정해줘"
done
```

이 방식의 문제:

1. **외부 스크립트가 필요** — `while` 루프, 종료 조건, 재시도 카운트를 셸에서 관리
2. **턴 간 컨텍스트 단절** — `claude -p`를 새로 호출할 때마다 이전 시도가 컨텍스트에 없음
3. **토큰 누수 가능성** — 무한 루프 가능

`/goal`은 이걸 한 줄로 표현하고, **모델이 자기 컨텍스트를 이어가며** 자율 수정합니다.

```bash
claude -p --goal "npm test 통과까지" --max-turns 20 \
  "현재 실패 중인 테스트의 원인을 분석하고 src/ 코드를 수정해줘"
```

## 따라하기

### 1단계: 인터랙티브 첫 /goal

테스트 1개가 실패하는 상황을 가정합니다.

```bash
npm test
# FAIL: tests/utils/format.test.ts

claude
> /goal "npm test가 0 실패로 통과할 때까지 src/utils/format.ts를 수정" --max-turns 10
```

화면 우상단에 진행 오버레이가 나타나고:

```
┌─ Goal active ─────────────────────┐
│ npm test가 0 실패로 통과할 때까지 │
│ Elapsed: 02:14  Turns: 7          │
│ Tokens:  142,300                  │
└───────────────────────────────────┘
```

조건이 충족되면 자동으로 다음 메시지와 함께 종료합니다:

```
✓ Goal achieved (5 turns, 1m 42s, 38,200 tokens)
```

### 2단계: 헤드리스 -p 모드 (CI 자동화)

비대화형 CI에서 자율 실행:

```bash
claude -p --goal "scripts/security-scan.sh의 high severity가 0건일 때까지" \
  --max-turns 15 \
  "scan.sh를 반복 실행하며 보고된 이슈를 수정해줘"

# 조건 충족: exit 0
# 한계 도달: exit 1
echo $?  # 0
```

GitHub Actions 워크플로우 활용:

```yaml
- name: Auto-fix security issues
  run: |
    claude -p --goal "high severity 0건까지" --max-turns 15 \
      "scripts/scan.sh의 이슈를 수정해줘"
  continue-on-error: true

- name: Open PR if fixed
  if: success()
  run: gh pr create --title "auto: security fixes"
```

### 3단계: 중도 종료와 조건 변경

`/goal`이 잘못된 방향으로 가고 있으면 중간에 멈추거나 조건을 바꿀 수 있습니다.

```bash
> /goal status
# 진행 상태 표시

> /goal cancel
# 현재 /goal 중단, 인터랙티브 모드로 복귀

> /goal "tsc --noEmit 통과까지" --max-turns 5
# 새 조건으로 재시작
```

## 좋은 완료 조건 작성법

| 좋은 조건 (자율 종료 가능) | 애매한 조건 (자율 종료 불가) |
|---------------------------|------------------------------|
| "npm test가 exit 0으로 통과할 때까지" | "코드가 깨끗해질 때까지" |
| "tsc --noEmit 에러 0건" | "버그가 다 없어질 때까지" |
| "coverage statements 80% 이상" | "성능이 좋아질 때까지" |
| "scripts/scan.sh 출력에 'high' 0건" | "사용자가 만족할 때까지" |

조건은 **종료 코드 / 숫자 임계값 / 파일 존재** 같은 객관적 신호여야 합니다.

## 안전 가드 (꼭 함께 쓰세요)

```bash
/goal "..." --max-turns 20 --max-tokens 500000 --timeout 10m
```

| 가드 | 이유 |
|------|------|
| `--max-turns N` | 영원히 통과 못 하는 조건일 때 무한 루프 방지 |
| `--max-tokens N` | 토큰 폭주 방지 |
| `--timeout 10m` | 절대 시간 한계 |

한계 없이 `/goal`을 띄우는 건 금지에 가깝습니다. **반드시** 안전망을 추가하세요.

## /loop vs /goal 선택 가이드

| 시나리오 | 권장 |
|---------|------|
| "10분마다 health.sh 결과 보고" | `/loop` (주기 기반) |
| "테스트 통과까지 실패 원인 수정" | `/goal` (조건 기반) |
| "오후 4시 마감 알림" | `CronCreate` (1회성) |
| "보안 스캔 0건까지" | `/goal` (조건 기반) |
| "PR 큐 1시간마다 폴링" | `/loop` (주기 기반) |

## 책임 분리

`/goal`은 **시간을 절약하는 자율 도구**입니다. **사람의 책임을 대신하지 않습니다**.

```
자율 수정 → 자동 검증 → 사람 머지

기존: 수동 수정 → 사람 리뷰 → 사람 머지
이후: /goal 자율 수정 → /ultrareview 자동 리뷰 → 사람 머지
       시간 단축은 첫 두 단계에서 발생, 최종 결정은 사람
```

자율 수정 결과가 그대로 main에 머지되면 위험합니다. 항상 **사람의 최종 승인**을 거치세요.

## 참고

- `/loop` 주기 기반 — `24-loop-cron`
- `Ralph Loop` PRD 기반 자율 개발 — `23-ralph-loop`
- 백그라운드 에이전트 — `16-background-agents`
- `claude agents` agent view — `10-cli-master`, `16-background-agents`
