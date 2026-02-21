# Todo 웹앱 — 프롬프트 가이드 ⭐⭐⭐

> Claude Code에 실제로 입력할 프롬프트를 단계별로 따라해보세요!

---

## 시작하기 전에

- [환경 설정](../../tutorial/step-01-setup.md)이 완료되어 있어야 합니다
- `echo $CLAUDE_AGENT_TEAMS`가 `true`인지 확인하세요
- Node.js가 설치되어 있어야 합니다 (`node -v`)

---

## Phase 1: 팀 생성 + 에이전트 스폰

### 이렇게 입력하세요:

```
Todo 웹앱을 만들 팀을 구성해줘.
팀 이름: todo-team
팀원:
- architect (general-purpose): 프로젝트 구조와 API 스펙 설계
- backend-dev (general-purpose): Express.js 백엔드 구현
- frontend-dev (general-purpose): HTML/CSS/JS 프론트엔드 구현
```

### 무슨 일이 일어나나요?

1. **TeamCreate**가 실행되어 `todo-team`이 생성됩니다
2. 3명의 에이전트가 각각 **독립적인 프로세스**로 스폰됩니다
3. 각 에이전트는 자신의 역할 설명을 받고 대기합니다

```
todo-team 생성됨!
├── architect     → 스폰 완료 (idle 상태)
├── backend-dev   → 스폰 완료 (idle 상태)
└── frontend-dev  → 스폰 완료 (idle 상태)
```

> 모든 에이전트가 idle 상태인 것은 정상입니다. 아직 태스크가 없으니까요!

---

## Phase 2: 태스크 생성 + 의존성

### 이렇게 입력하세요:

```
다음 태스크들을 만들어줘:
1. [architect] 프로젝트 구조 + API 스펙 설계
2. [backend-dev] Express.js Todo API 구현 (1번 완료 후)
3. [frontend-dev] HTML/CSS UI 구현 (1번 완료 후)
4. [frontend-dev] API 연동 (2, 3번 완료 후)
5. [backend-dev] CORS + 에러 처리 (2, 3번 완료 후)
6. [architect] 최종 리뷰 (4, 5번 완료 후)
```

### 무슨 일이 일어나나요?

1. **TaskCreate**가 6번 실행되어 태스크가 생성됩니다
2. **TaskUpdate**로 의존성(blockedBy)이 설정됩니다
3. 태스크 보드가 다음과 같이 구성됩니다:

| ID | 태스크 | 담당 | 상태 | 대기 |
|----|--------|------|------|------|
| #1 | API 스펙 설계 | architect | pending | - |
| #2 | Express.js API | backend-dev | pending | #1 |
| #3 | HTML/CSS UI | frontend-dev | pending | #1 |
| #4 | API 연동 | frontend-dev | pending | #2, #3 |
| #5 | CORS + 에러 처리 | backend-dev | pending | #2, #3 |
| #6 | 최종 리뷰 | architect | pending | #4, #5 |

> #1만 바로 시작할 수 있고, 나머지는 의존성에 의해 **blocked** 상태입니다.

---

## Phase 3: 작업 시작

### 이렇게 입력하세요:

```
태스크 1번을 architect에게 배정하고 시작해줘.
```

### 무슨 일이 일어나나요?

1. **TaskUpdate**로 T1의 owner가 `architect`로 설정됩니다
2. **SendMessage**로 architect에게 작업 지시가 전달됩니다
3. architect가 깨어나서 API 스펙 설계를 시작합니다

```
architect: idle → active
├── 프로젝트 구조 설계 중...
├── API 엔드포인트 정의 중...
└── 완료! → T1 status: completed
    ├── backend-dev에게 메시지: "API 스펙 완성"
    └── frontend-dev에게 메시지: "UI 구조 확인해"
```

**이후 자동 진행:**

T1이 완료되면 T2, T3의 blockedBy가 해제됩니다:

```
T1 완료!
  ├── T2 unblocked → backend-dev 작업 시작
  └── T3 unblocked → frontend-dev 작업 시작
```

의존성에 따라 **나머지 태스크들이 자동으로** 진행됩니다. 리더(사용자)가 매번 지시하지 않아도 됩니다!

---

## Phase 4: 중간 관찰

작업이 진행되는 동안 상태를 확인할 수 있습니다.

### 태스크 목록 확인:

```
현재 태스크 상태를 보여줘
```

**TaskList** 결과 예시 (T2, T3 진행 중일 때):

| ID | 태스크 | 상태 | 담당 |
|----|--------|------|------|
| #1 | API 스펙 설계 | completed | architect |
| #2 | Express.js API | in_progress | backend-dev |
| #3 | HTML/CSS UI | in_progress | frontend-dev |
| #4 | API 연동 | pending (blocked) | frontend-dev |
| #5 | CORS + 에러 처리 | pending (blocked) | backend-dev |
| #6 | 최종 리뷰 | pending (blocked) | architect |

### 관찰할 점:

- **에이전트 간 메시지 교환**: backend-dev와 frontend-dev가 서로 포트 번호, API 형식 등을 공유합니다
- **자동 unblock**: T2, T3이 완료되면 T4, T5가 자동으로 시작됩니다
- **idle → active 전환**: 대기 중이던 에이전트가 메시지를 받고 활성화됩니다

---

## Phase 5: 종료 + 정리

모든 태스크가 완료되면 정리합니다.

### 이렇게 입력하세요:

```
모든 에이전트를 종료하고 todo-team을 삭제해줘.
```

### 무슨 일이 일어나나요?

1. 각 에이전트에게 **shutdown_request**가 전송됩니다
2. 에이전트들이 **shutdown_response**로 수락합니다
3. **TeamDelete**로 todo-team이 삭제됩니다

```
shutdown_request → architect    ✓ 수락
shutdown_request → backend-dev  ✓ 수락
shutdown_request → frontend-dev ✓ 수락

TeamDelete: todo-team 삭제 완료!
```

### 정리 확인:

```bash
ls ~/.claude/teams/todo-team 2>/dev/null || echo "깨끗하게 정리됨!"
```

---

## 전체 흐름 요약

```
Phase 1: 팀 생성     → TeamCreate + 에이전트 3명 스폰
Phase 2: 태스크 생성  → TaskCreate x6 + 의존성 설정
Phase 3: 작업 시작    → T1 배정 → 자동 연쇄 실행
Phase 4: 관찰        → TaskList로 진행 상황 확인
Phase 5: 정리        → shutdown → TeamDelete
```

---

## 문제가 생겼을 때

| 상황 | 해결 방법 |
|------|-----------|
| 에이전트가 응답하지 않음 | 잠시 기다려보세요. idle 상태일 수 있습니다 |
| 태스크가 stuck됨 | TaskList로 blockedBy를 확인하고 선행 태스크 상태를 체크하세요 |
| 에이전트가 엉뚱한 파일 수정 | 태스크 description을 더 구체적으로 작성하세요 |
| CORS 에러 발생 | backend-dev에게 CORS 설정 메시지를 보내세요 |
| 전체 중단 필요 | "모든 에이전트를 종료해줘"로 즉시 정리 |
