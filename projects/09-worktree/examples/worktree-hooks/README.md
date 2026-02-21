# 워크트리 훅 예제 ⭐⭐

> 워크트리가 만들어지거나 삭제될 때 **자동으로 실행되는 스크립트**를 설정해봅시다.

---

## 워크트리 훅이란?

[Hooks(프로젝트 06)](../../../06-hooks/README.md)에서 도구 사용 전후에 훅을 다는 법을 배웠죠?

워크트리에도 비슷한 훅이 있습니다:

| 훅 이벤트 | 언제 실행? | 용도 |
|-----------|-----------|------|
| **WorktreeCreate** | 워크트리가 **생성**될 때 | 초기 설정, 의존성 설치, 로그 기록 |
| **WorktreeRemove** | 워크트리가 **삭제**될 때 | 정리 작업, 로그 기록, 백업 |

```
워크트리 생명주기와 훅
━━━━━━━━━━━━━━━━━━━━━

  [워크트리 생성] → WorktreeCreate 훅 실행!
         │
         v
  [작업 진행중...]
         │
         v
  [워크트리 삭제] → WorktreeRemove 훅 실행!
```

---

## 사용 사례

### 사례 1: 자동 로그 기록

워크트리가 만들어질 때마다 기록을 남기고 싶다면?

### 사례 2: 의존성 자동 설치

워크트리가 만들어지면 `npm install`을 자동 실행하고 싶다면?

### 사례 3: 정리 알림

워크트리가 삭제될 때 "워크트리 정리 완료!" 알림을 보내고 싶다면?

---

## 설정 방법

`.claude/settings.json` 파일에 훅을 등록합니다.

### 예제 1: 워크트리 생성 로그

```json
{
  "hooks": {
    "WorktreeCreate": [
      {
        "matcher": "",
        "command": "echo \"[$(date)] 워크트리 생성됨\" >> /tmp/worktree-log.txt"
      }
    ]
  }
}
```

**동작:**
- 워크트리가 생성될 때마다 `/tmp/worktree-log.txt`에 시간과 함께 기록
- `matcher`가 빈 문자열이면 **모든** 워크트리 생성에 반응

### 예제 2: 의존성 자동 설치

```json
{
  "hooks": {
    "WorktreeCreate": [
      {
        "matcher": "",
        "command": "cd $WORKTREE_PATH && npm install"
      }
    ]
  }
}
```

**동작:**
- 워크트리가 만들어지면 해당 폴더로 이동
- `npm install`을 자동 실행해서 패키지를 설치

### 예제 3: 생성 + 삭제 모두 로그

```json
{
  "hooks": {
    "WorktreeCreate": [
      {
        "matcher": "",
        "command": "echo \"[$(date)] 생성: 워크트리\" >> /tmp/worktree-log.txt"
      }
    ],
    "WorktreeRemove": [
      {
        "matcher": "",
        "command": "echo \"[$(date)] 삭제: 워크트리\" >> /tmp/worktree-log.txt"
      }
    ]
  }
}
```

---

## 직접 따라하기

### 1단계: settings.json 만들기

프로젝트 폴더에서:

```bash
mkdir -p .claude
```

`.claude/settings.json` 파일을 만듭니다:

```json
{
  "hooks": {
    "WorktreeCreate": [
      {
        "matcher": "",
        "command": "echo \"[$(date)] 워크트리가 생성되었습니다!\" >> /tmp/worktree-log.txt"
      }
    ],
    "WorktreeRemove": [
      {
        "matcher": "",
        "command": "echo \"[$(date)] 워크트리가 삭제되었습니다.\" >> /tmp/worktree-log.txt"
      }
    ]
  }
}
```

### 2단계: 워크트리 만들기

```bash
claude -w
```

### 3단계: 로그 확인

새 터미널에서:

```bash
cat /tmp/worktree-log.txt
```

**예상 출력:**

```
[Sun Feb 22 14:30:00 KST 2026] 워크트리가 생성되었습니다!
```

### 4단계: 워크트리 삭제 후 다시 확인

세션을 종료하고 "Remove"를 선택한 후:

```bash
cat /tmp/worktree-log.txt
```

**예상 출력:**

```
[Sun Feb 22 14:30:00 KST 2026] 워크트리가 생성되었습니다!
[Sun Feb 22 14:35:00 KST 2026] 워크트리가 삭제되었습니다.
```

---

## 활용 아이디어

| 활용 | WorktreeCreate 훅 | WorktreeRemove 훅 |
|------|-------------------|-------------------|
| 로그 기록 | 생성 시간 기록 | 삭제 시간 기록 |
| 의존성 설치 | `npm install` | - |
| 환경 설정 | `.env` 파일 복사 | - |
| 테스트 실행 | 초기 테스트 통과 확인 | - |
| 알림 | "새 워크트리 시작!" | "워크트리 정리 완료" |
| 백업 | - | 변경사항 백업 저장 |

---

## 주의사항

| 항목 | 설명 |
|------|------|
| 경로 주의 | 훅 스크립트에서 파일 경로를 사용할 때 절대 경로 권장 |
| 실행 시간 | 훅이 오래 걸리면 워크트리 생성/삭제가 느려짐 |
| 에러 처리 | 훅이 실패해도 워크트리 생성/삭제는 진행됨 |
| 버전 요구 | v2.1.50 이상에서 사용 가능 |

---

## 다음 예제

- [에이전트 격리 예제](../isolated-agents/) — 여러 에이전트가 각자의 워크트리에서 동시 작업
