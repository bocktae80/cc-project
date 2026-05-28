# 30 — Dynamic Workflows (v2.1.154)

> 난이도: ⭐⭐⭐
> 추적 기능: `/workflows` 명령어, 백그라운드 멀티 에이전트 오케스트레이션, Opus 4.8 + `/effort xhigh`, Research Preview

## 무엇을 배우나요

`/workflows`는 Claude에게 **워크플로우를 만들어달라고 요청**하면, 백그라운드에서 **수십~수백 개의 서브에이전트**를 동시에 돌려 큰 작업을 분해·병렬 처리하는 기능입니다. v2.1.154에 Opus 4.8 출시와 함께 도입됐어요.

- `/loop`이 **주기 기반**, `/goal`이 **조건 기반**이라면, `/workflows`는 **분해·병렬 기반**입니다.
- 모노레포 마이그레이션, 대규모 리팩토링, 벤치마크 그리드처럼 한 컨텍스트로는 못 하는 큰 작업에 강합니다.
- 실행 중에는 `/workflows`로 진행 상황을 모니터링하고, 끝나면 결과가 머지된 리포트로 회수됩니다.

## 왜 만들었나요

50개 패키지를 모두 마이그레이션해야 하는 상황에서 기존 도구의 한계:

```bash
# /goal 방식 — 직렬
/goal "모든 패키지 빌드 통과까지 수정" --max-turns 100
# → 50개를 한 번에 한 컨텍스트로 처리 → 토큰 폭발, 느림

# 셸 루프 방식 — 외부 스크립트 필요
for pkg in packages/*; do
  claude -p "이 패키지($pkg)의 TS 5.4 마이그레이션" &
done
# → 진행 상황 모니터링 어려움, 결과 합치기 수동
```

`/workflows`는 한 줄 요청으로:

1. **계획 수립** — 의존성 그래프, 병렬 단위, 직렬 단위 자동 결정
2. **백그라운드 병렬 실행** — N개 서브에이전트 동시 운영
3. **결과 머지** — 모든 결과를 우선순위 매겨 단일 리포트로

## 따라하기

### 1단계: 첫 워크플로우 만들기

```bash
claude
> packages/ 아래의 모든 TypeScript 파일에서
  deprecated인 lodash.merge import를 찾아
  Object.assign으로 교체하는 워크플로우를 만들어줘.
  변경된 파일은 패키지별로 리포트해줘.
```

Claude가 계획을 보여줍니다 (스캔/변환/검증 3단계, 약 170 에이전트, 12~18분 예상).

### 2단계: /workflows로 모니터링

새 터미널:

```bash
claude
> /workflows
```

```
┌─ Active workflows ────────────────────────────────────┐
│ ▸ Migrate lodash.merge → Object.assign                │
│   Started: 14:22:01  Elapsed: 03:47                   │
│   Agents:  42 running · 28 done · 0 failed            │
│   Stage:   Step 2 of 3 (transforming files)           │
└───────────────────────────────────────────────────────┘
```

### 3단계: Opus 4.8 + `/effort xhigh` 시너지

큰 워크플로우는 설계가 핵심입니다. Opus 4.8 + xhigh를 켜면 의존성 그래프가 복잡해도 더 잘 쪼갭니다.

```bash
claude
/effort xhigh
> 이 RFC를 읽고 affected_areas를 분석해서
  단계별 롤아웃 워크플로우 만들어줘.
```

### 4단계: 다중 관점 PR 리뷰 (예제)

```bash
> 현재 브랜치를 보안/성능/스타일/문서/접근성 5개 관점에서
  병렬 리뷰하는 워크플로우를 만들고
  결과를 우선순위로 머지해줘.
```

5개 서브에이전트가 병렬로 돌고, merge-reporter가 결과를 우선순위 매겨 단일 리포트를 만듭니다.

## /loop vs /goal vs /workflows 선택 가이드

| 신호 | 추천 도구 |
|------|----------|
| "매 N분마다 ..." | `/loop` |
| "X 조건 충족할 때까지 ..." | `/goal` |
| "N개 항목을 동시에 ..." | `/workflows` |
| "한 컨텍스트로 안 되는 큰 작업" | `/workflows` |
| "백그라운드에서 돌아도 됨" | `/workflows` |

## 참고

- 출시: v2.1.154 (2026-05-28, Opus 4.8 출시 동반)
- 상태: Research Preview (인터페이스 빠르게 진화 중)
- 산출물 위치: `.claude/workflows/<timestamp>-<slug>/`
- 모니터링: `/workflows`, `claude agents`
- 시너지: Opus 4.8 + `/effort xhigh` (큰 워크플로우 설계 시 권장)
