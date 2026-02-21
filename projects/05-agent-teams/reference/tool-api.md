# 도구 API 레퍼런스 ⭐⭐⭐

> Agent Teams에서 사용하는 모든 도구의 파라미터와 사용 예시를 정리했습니다.

---

## 목차

1. [TeamCreate](#teamcreate) — 팀 생성
2. [TaskCreate](#taskcreate) — 태스크 생성
3. [TaskUpdate](#taskupdate) — 태스크 수정
4. [TaskList](#tasklist) — 태스크 목록 조회
5. [TaskGet](#taskget) — 태스크 상세 조회
6. [SendMessage](#sendmessage) — 메시지 전송
7. [TeamDelete](#teamdelete) — 팀 삭제

---

## TeamCreate

팀을 생성합니다. 팀 설정 파일이 `~/.claude/teams/{name}/config.json`에 저장됩니다.

### 파라미터

| 파라미터 | 필수 | 타입 | 설명 |
|---------|------|------|------|
| `team_name` | O | string | 팀 이름 (고유값) |
| `description` | X | string | 팀 설명 |
| `agent_type` | X | string | 기본 에이전트 타입 |

### 사용 예시

```json
{
  "team_name": "todo-webapp-team",
  "description": "Todo 웹앱을 프론트/백엔드로 나눠서 개발하는 팀"
}
```

---

## TaskCreate

새로운 태스크(할 일)를 생성합니다. 생성된 태스크는 팀 전체의 태스크 보드에 추가됩니다.

### 파라미터

| 파라미터 | 필수 | 타입 | 설명 |
|---------|------|------|------|
| `subject` | O | string | 태스크 제목 (명령형으로 작성) |
| `description` | O | string | 상세 설명 (무엇을, 왜, 완료 조건) |
| `activeForm` | X | string | 진행 중일 때 표시할 텍스트 (현재진행형) |

### 사용 예시

```json
{
  "subject": "Write API endpoints for todo CRUD",
  "description": "Express.js로 GET/POST/PUT/DELETE 엔드포인트를 구현합니다. 포트 3000번에서 실행되어야 합니다.",
  "activeForm": "Writing API endpoints"
}
```

> **팁**: `subject`는 명령형("Write tests"), `activeForm`은 현재진행형("Writing tests")으로 작성하세요.

---

## TaskUpdate

기존 태스크를 수정합니다. 상태 변경, 담당자 지정, 의존성 설정 등을 할 수 있습니다.

### 파라미터

| 파라미터 | 필수 | 타입 | 설명 |
|---------|------|------|------|
| `taskId` | O | string | 수정할 태스크 ID |
| `status` | X | string | 상태: `pending`, `in_progress`, `completed`, `deleted` |
| `subject` | X | string | 태스크 제목 변경 |
| `description` | X | string | 설명 변경 |
| `activeForm` | X | string | 진행 중 표시 텍스트 변경 |
| `owner` | X | string | 담당자 이름 |
| `addBlocks` | X | string[] | 이 태스크가 끝나야 시작할 수 있는 태스크 ID들 |
| `addBlockedBy` | X | string[] | 이 태스크보다 먼저 끝나야 하는 태스크 ID들 |

### 사용 예시

**작업 시작하기:**
```json
{
  "taskId": "3",
  "status": "in_progress",
  "owner": "frontend"
}
```

**작업 완료하기:**
```json
{
  "taskId": "3",
  "status": "completed"
}
```

**의존성 설정하기:**
```json
{
  "taskId": "4",
  "addBlockedBy": ["2", "3"]
}
```
> 태스크 #4는 #2와 #3이 모두 완료되어야 시작할 수 있습니다.

**태스크 삭제하기:**
```json
{
  "taskId": "5",
  "status": "deleted"
}
```

---

## TaskList

팀의 모든 태스크 목록을 조회합니다.

### 파라미터

파라미터 없음.

### 사용 예시

```json
{}
```

### 반환 결과 예시

```
#1 [completed] API 설계          (owner: planner)
#2 [in_progress] 백엔드 구현     (owner: backend)
#3 [pending] 프론트엔드 구현      (blockedBy: #1)
#4 [pending] 통합 테스트          (blockedBy: #2, #3)
```

---

## TaskGet

특정 태스크의 상세 정보를 조회합니다.

### 파라미터

| 파라미터 | 필수 | 타입 | 설명 |
|---------|------|------|------|
| `taskId` | O | string | 조회할 태스크 ID |

### 사용 예시

```json
{
  "taskId": "2"
}
```

### 반환 결과 예시

```
Task #2: 백엔드 구현
Status: in_progress
Owner: backend
Description: Express.js로 GET/POST/PUT/DELETE 엔드포인트를 구현합니다.
Blocks: #4
BlockedBy: (없음)
```

---

## SendMessage

팀원에게 메시지를 보냅니다. `type`에 따라 동작이 달라집니다.

### 파라미터

| 파라미터 | 필수 | 타입 | 설명 |
|---------|------|------|------|
| `type` | O | string | 메시지 종류 (아래 참고) |
| `recipient` | 조건부 | string | 받는 사람 이름 |
| `content` | 조건부 | string | 메시지 내용 |
| `summary` | 조건부 | string | 5-10 단어 요약 (미리보기에 표시) |
| `approve` | 조건부 | boolean | 승인/거절 (`shutdown_response`에서 사용) |
| `request_id` | 조건부 | string | 요청 ID (`shutdown_response`에서 사용) |

### type별 사용법

#### `message` — 1:1 DM

특정 팀원에게 메시지를 보냅니다.

```json
{
  "type": "message",
  "recipient": "backend",
  "content": "API 엔드포인트 목록을 공유해주세요",
  "summary": "API 엔드포인트 요청"
}
```

> **필수**: `recipient`, `content`, `summary`

#### `broadcast` — 전체 공지

모든 팀원에게 동시에 메시지를 보냅니다.

```json
{
  "type": "broadcast",
  "content": "DB 스키마가 변경되었습니다. 각자 코드를 확인해주세요.",
  "summary": "DB 스키마 변경 공지"
}
```

> **필수**: `content`, `summary`
> **주의**: 비용이 높으므로 꼭 필요한 경우에만 사용하세요!

#### `shutdown_request` — 종료 요청

팀원에게 종료를 요청합니다.

```json
{
  "type": "shutdown_request",
  "recipient": "backend",
  "content": "모든 작업이 완료되었습니다. 종료해주세요."
}
```

> **필수**: `recipient`

#### `shutdown_response` — 종료 응답

종료 요청에 대한 응답입니다.

**승인 (종료):**
```json
{
  "type": "shutdown_response",
  "request_id": "abc-123",
  "approve": true
}
```

**거절 (계속 작업):**
```json
{
  "type": "shutdown_response",
  "request_id": "abc-123",
  "approve": false,
  "content": "아직 태스크 #3을 작업 중입니다"
}
```

> **필수**: `request_id`, `approve`

---

## TeamDelete

현재 팀을 삭제합니다.

### 파라미터

파라미터 없음.

### 사용 예시

```json
{}
```

> **주의**: 활성 상태의 멤버가 있으면 삭제할 수 없습니다. 먼저 모든 에이전트를 shutdown해야 합니다.

---

## 도구 사용 순서 요약

일반적인 Agent Teams 작업 흐름에서 도구를 사용하는 순서:

```
1. TeamCreate          팀 생성
       │
2. TaskCreate (x N)    할 일 등록
       │
3. TaskList            목록 확인
       │
4. TaskUpdate          작업 시작 (in_progress)
       │
5. SendMessage         팀원 간 소통
       │
6. TaskUpdate          작업 완료 (completed)
       │
7. SendMessage         shutdown_request
       │
8. TeamDelete          팀 정리
```

---

## 다음으로 읽기

- [자주 겪는 문제와 해결법](troubleshooting.md) — 에러가 나면 여기를 확인
- [Agent Teams 개념 이해](../concepts/overview.md) — 기본 개념 복습
