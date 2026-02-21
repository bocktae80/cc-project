# 자동 로그 — 모든 도구 사용 기록하기 ⭐⭐

> 클로드가 뭘 했는지 자동으로 기록되면 편하지 않을까? 📋

---

## 이번에 만들 것

클로드가 **어떤 도구든** 사용할 때마다 `tool-log.txt` 파일에 **자동으로 기록**되는 로그 훅을 만듭니다.

```
💡 비유: CCTV 녹화

   가게에 CCTV가 있으면?
   → 📹 누가, 언제, 뭘 했는지 자동으로 녹화!

   자동 로그 훅이 있으면?
   → 📋 클로드가 언제, 어떤 도구를, 어떻게 사용했는지 자동 기록!
```

---

## 파일 구성

```
auto-log/
├── README.md              ← 지금 읽고 있는 파일
├── log-tool-use.sh        ← 로그 스크립트
└── .claude/
    └── settings.json      ← 훅 설정
```

---

## log-tool-use.sh 살펴보기

```bash
#!/bin/bash
# 모든 도구 사용을 자동으로 기록하는 로그 훅

LOG_FILE="tool-log.txt"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$TIMESTAMP] Tool: $CLAUDE_TOOL_NAME" >> "$LOG_FILE"
echo "  Input: $CLAUDE_TOOL_INPUT" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
```

한 줄씩 살펴볼까요?

| 줄 | 코드 | 의미 |
|-----|------|------|
| 1 | `LOG_FILE="tool-log.txt"` | 로그를 저장할 파일 이름 |
| 2 | `TIMESTAMP=$(date ...)` | 현재 날짜와 시간 |
| 3 | `echo "[$TIMESTAMP]..."` | 시간 + 도구 이름 기록 |
| 4 | `echo "  Input:..."` | 도구 입력값 기록 |
| 5 | `echo "---"` | 구분선 추가 |

> 💡 `>>` 기호는 파일에 **추가(append)**합니다. `>`는 덮어쓰기, `>>`는 추가!

---

## settings.json 살펴보기

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hook": "bash ./log-tool-use.sh"
      }
    ]
  }
}
```

| 요소 | 값 | 의미 |
|------|-----|------|
| `matcher` | `""` (빈 문자열) | **모든 도구**에 반응 |
| `hook` | `"bash ./log-tool-use.sh"` | 로그 스크립트 실행 |

---

## 따라하기

### 1단계: 이 폴더로 이동

```bash
cd projects/06-hooks/examples/auto-log/
```

### 2단계: log-tool-use.sh에 실행 권한 주기

```bash
chmod +x log-tool-use.sh
```

### 3단계: 클로드 코드 실행

```bash
claude
```

### 4단계: 여러 가지 요청해보기

클로드에게 다양한 요청을 해보세요:

```
1. test.txt에 "안녕하세요!"라고 써줘
2. test.txt 내용 읽어줘
3. 현재 폴더의 파일 목록 보여줘
```

### 5단계: 로그 확인하기

클로드와의 대화를 끝내고, `tool-log.txt`를 열어보세요:

```bash
cat tool-log.txt
```

이런 내용이 기록되어 있을 거예요:

```
[2025-01-15 14:30:22] Tool: Write
  Input: {"file_path":"test.txt","content":"안녕하세요!"}
---
[2025-01-15 14:30:25] Tool: Read
  Input: {"file_path":"test.txt"}
---
[2025-01-15 14:30:28] Tool: Glob
  Input: {"pattern":"*"}
---
```

---

## 어떻게 동작하나요?

```
📋 자동 로그 흐름:

  1. 클로드: Write 도구 사용 결정
  2. 🪝 PreToolUse → log-tool-use.sh 실행
  3. log-tool-use.sh:
     - 현재 시간 확인 (date)
     - CLAUDE_TOOL_NAME 읽기 ("Write")
     - CLAUDE_TOOL_INPUT 읽기 (파일명, 내용 등)
     - tool-log.txt에 기록 추가
     - exit 0 (기본값) → 허용!
  4. Write 도구 정상 실행 ✅
  5. 클로드: "파일을 작성했습니다"

  → 이 과정이 매번 자동으로 반복!
```

---

## 응용: PostToolUse로 결과도 기록하기

도구 사용 결과까지 기록하고 싶다면 PostToolUse 훅도 추가하면 됩니다:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hook": "bash ./log-tool-use.sh"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "",
        "hook": "echo \"  Result: $CLAUDE_TOOL_RESULT\" >> tool-log.txt"
      }
    ]
  }
}
```

> 💡 PostToolUse에서는 `CLAUDE_TOOL_RESULT`도 사용할 수 있어요!

---

## 핵심 정리

```
📋 자동 로그 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ >> 로 파일에 추가 (덮어쓰기 X)
  ✅ date 명령어로 시간 기록
  ✅ 환경변수로 도구 정보 수집
  ✅ matcher를 비우면 모든 도구 기록
  ✅ PostToolUse 추가하면 결과까지 기록 가능
```
