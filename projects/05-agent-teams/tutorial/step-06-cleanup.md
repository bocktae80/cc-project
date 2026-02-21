# Step 6 — 종료와 정리 ⭐

> 작업이 끝나면 깔끔하게 정리하자!

---

## 왜 정리가 중요한가요?

Agent Teams를 사용한 후 정리하지 않으면:
- 에이전트가 계속 실행되어 **토큰이 소모**될 수 있습니다
- 설정 파일이 쌓여 **디스크 공간**을 차지합니다
- 다음에 사용할 때 **혼란**이 생길 수 있습니다

---

## 정리 순서

```
1. 에이전트 종료 (shutdown_request)
    ↓
2. 팀 삭제 (TeamDelete)
    ↓
3. 잔여 파일 확인
    ↓
4. 완료!
```

---

## Step 1: 에이전트 종료

각 에이전트에게 종료 요청을 보냅니다:

```
모든 에이전트를 종료해줘
```

Claude가 내부적으로 실행하는 것:

```
SendMessage (type: "shutdown_request", recipient: "architect")
SendMessage (type: "shutdown_request", recipient: "backend-dev")
SendMessage (type: "shutdown_request", recipient: "frontend-dev")
```

각 에이전트가 `shutdown_response`로 수락하면 종료됩니다.

> **Tip:** 한 번에 "모든 에이전트를 종료해줘"라고 말하면, Claude가 알아서 각각에게 요청을 보냅니다.

---

## Step 2: 팀 삭제

에이전트가 모두 종료된 후 팀을 삭제합니다:

```
todo-team을 삭제해줘
```

```
TeamDelete
└── name: "todo-team"
```

---

## Step 3: 잔여 파일 확인

정리가 제대로 됐는지 확인합니다:

```bash
# 팀 설정 파일 확인
ls ~/.claude/teams/

# 태스크 파일 확인
ls ~/.claude/tasks/
```

**깨끗하게 정리된 경우:**
```
ls: ~/.claude/teams/todo-team: No such file or directory
```

---

## 수동 삭제 (정리가 안 됐을 때)

자동 정리가 실패했다면 직접 삭제할 수 있습니다:

```bash
# 특정 팀 설정 삭제
rm -rf ~/.claude/teams/todo-team

# 모든 팀 설정 삭제 (주의!)
rm -rf ~/.claude/teams/*

# 태스크 데이터 삭제
rm -rf ~/.claude/tasks/*
```

> **주의:** `rm -rf`는 되돌릴 수 없습니다. 삭제 전에 경로를 꼭 확인하세요!

---

## 비용 관리 팁

| 팁 | 설명 |
|----|------|
| **작업 끝나면 바로 종료** | 에이전트를 켜둔 채로 방치하지 마세요 |
| **필요한 에이전트만 생성** | 2명으로 충분하면 4명 만들지 마세요 |
| **연습은 소규모로** | 복잡한 시나리오 전에 간단한 팀부터 연습 |
| **shutdown 확인** | 종료 요청 후 실제로 종료됐는지 확인 |
| **팀 삭제 습관화** | 작업 세션이 끝나면 항상 TeamDelete |

---

## 전체 튜토리얼 요약

| Step | 배운 것 | 핵심 도구 |
|------|---------|-----------|
| [Step 1](step-01-setup.md) | 환경 설정 | 환경변수 |
| [Step 2](step-02-first-team.md) | 팀 만들기 | TeamCreate, TeamDelete |
| [Step 3](step-03-tasks.md) | 태스크 관리 | TaskCreate, TaskList, TaskUpdate |
| [Step 4](step-04-messaging.md) | 메시지 시스템 | SendMessage |
| [Step 5](step-05-real-project.md) | 실전 프로젝트 | 모든 도구 활용 |
| [Step 6](step-06-cleanup.md) | 종료와 정리 | shutdown, TeamDelete |

---

## 다음은?

축하합니다! Agent Teams 튜토리얼을 모두 마쳤습니다.

더 알고 싶다면:
- [개념 문서](../concepts/) — Agent Teams의 내부 동작 원리
- [레퍼런스](../reference/) — 도구별 상세 API 문서
- [시나리오](../scenarios/) — 더 많은 실전 예제
