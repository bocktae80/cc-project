# 가드 훅 — 파일 수정 차단하기 ⭐⭐

> 중요한 파일을 클로드가 절대 건드리지 못하게 막아보자! 🛡️

---

## 이번에 만들 것

`important.txt` 파일을 클로드가 수정하려고 하면 **자동으로 차단**하는 가드 훅을 만듭니다.

```
💡 비유: 박물관 경비원

   관람객이 전시품에 손대려고 하면?
   → 🚨 "만지지 마세요!" 경고
   → 🚫 접근 차단!

   클로드가 important.txt를 수정하려고 하면?
   → 🚨 "이 파일은 수정할 수 없습니다!"
   → 🚫 수정 차단!
```

---

## 파일 구성

```
guard-hook/
├── README.md              ← 지금 읽고 있는 파일
├── guard.sh               ← 가드 스크립트
└── .claude/
    └── settings.json      ← 훅 설정
```

---

## guard.sh 살펴보기

```bash
#!/bin/bash
# important.txt 파일 수정을 차단하는 가드 훅

# CLAUDE_TOOL_INPUT에서 "important.txt"가 있는지 확인
if echo "$CLAUDE_TOOL_INPUT" | grep -q "important.txt"; then
  # 발견! → 차단 메시지 출력 + exit 2로 차단
  echo "🚫 important.txt는 수정할 수 없습니다!"
  exit 2
fi

# important.txt가 아니면 → 허용
exit 0
```

한 줄씩 살펴볼까요?

| 줄 | 코드 | 의미 |
|-----|------|------|
| 1 | `#!/bin/bash` | "이건 bash 스크립트야!" |
| 2 | `echo "$CLAUDE_TOOL_INPUT"` | 도구 입력값을 읽기 |
| 3 | `grep -q "important.txt"` | "important.txt"가 포함되어 있는지 확인 |
| 4 | `echo "🚫 ..."` | 차단 메시지 표시 |
| 5 | `exit 2` | 🚫 **차단!** |
| 6 | `exit 0` | ✅ **허용** (important.txt가 아닌 경우) |

> ⚠️ **핵심:** `exit 2`가 차단이에요! `exit 1`이 아니라 `exit 2`!

---

## settings.json 살펴보기

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hook": "bash ./guard.sh"
      }
    ]
  }
}
```

| 요소 | 값 | 의미 |
|------|-----|------|
| `matcher` | `""` (빈 문자열) | **모든 도구**에 반응 |
| `hook` | `"bash ./guard.sh"` | guard.sh 스크립트 실행 |

> 💡 matcher를 비워두면 Write, Edit, Bash 등 **모든 도구 사용**에 이 훅이 실행됩니다.

---

## 따라하기

### 1단계: 이 폴더로 이동

```bash
cd projects/06-hooks/examples/guard-hook/
```

### 2단계: important.txt 만들기

```bash
echo "이 파일은 절대 수정하면 안 됩니다!" > important.txt
```

### 3단계: guard.sh에 실행 권한 주기

```bash
chmod +x guard.sh
```

### 4단계: 클로드 코드 실행

```bash
claude
```

### 5단계: 수정 시도해보기

클로드에게 이렇게 말해보세요:

```
important.txt 내용을 "변경됨!"으로 바꿔줘
```

### 6단계: 결과 확인

클로드가 Edit 또는 Write 도구를 사용하려고 할 때:

```
🚫 important.txt는 수정할 수 없습니다!
```

메시지가 표시되고, 파일 수정이 **차단**됩니다!

### 7단계: 다른 파일은?

```
test.txt에 "안녕!"이라고 써줘
```

이번에는 guard.sh가 `exit 0`을 반환하므로 정상적으로 파일이 작성됩니다. ✅

---

## 어떻게 동작하나요?

```
📌 important.txt 수정 시도:

  1. 클로드: Edit 도구 사용 결정
  2. 🪝 PreToolUse → guard.sh 실행
  3. guard.sh: CLAUDE_TOOL_INPUT에서 "important.txt" 발견!
  4. guard.sh: "🚫 수정 금지!" → exit 2
  5. Edit 도구 실행 취소 ❌
  6. 클로드: "이 파일은 수정할 수 없습니다"

📌 test.txt 수정 시도:

  1. 클로드: Write 도구 사용 결정
  2. 🪝 PreToolUse → guard.sh 실행
  3. guard.sh: CLAUDE_TOOL_INPUT에서 "important.txt" 없음
  4. guard.sh: exit 0 → 허용!
  5. Write 도구 실행 ✅
  6. 클로드: "파일을 작성했습니다"
```

---

## 핵심 정리

```
🛡️ 가드 훅 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ exit 2 = 차단 (exit 1이 아님!)
  ✅ CLAUDE_TOOL_INPUT으로 입력값 확인
  ✅ grep으로 파일명 검사
  ✅ matcher를 비우면 모든 도구에 반응
  ✅ 보호하고 싶은 파일에 사용
```

> 💡 **다음 단계:** [자동 로그](../auto-log/)에서 모든 도구 사용을 자동으로 기록하는 법을 배워봐요!
