# 연습 문제 — 직접 만들어보기! 🏋️

> 배운 걸 직접 써봐야 진짜 내 것이 됩니다!

---

## 준비

이 폴더의 `.claude/settings.json`에는 **빈 템플릿**이 준비되어 있어요.
여기에 훅을 직접 추가해보세요!

```json
{
  "hooks": {
    "PreToolUse": [],
    "PostToolUse": []
  }
}
```

---

## 미션 1: 터미널 경고 훅 ⭐

### 목표

클로드가 **Bash 도구**를 사용할 때 "⚠️ 터미널 명령어 실행!" 메시지가 표시되는 훅을 만드세요.

### 힌트

- 어떤 훅 종류를 써야 할까? → `PreToolUse`
- matcher에 뭘 넣어야 할까? → 도구 이름!
- hook에 뭘 넣어야 할까? → `echo` 명령어

### 정답 확인

<details>
<summary>💡 정답 보기 (먼저 직접 해보세요!)</summary>

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hook": "echo '⚠️ 터미널 명령어 실행!'"
      }
    ],
    "PostToolUse": []
  }
}
```

</details>

---

## 미션 2: .env 파일 보호 훅 ⭐⭐

### 목표

`.env` 파일을 클로드가 수정하지 못하도록 **차단하는 훅**을 만드세요.

### 힌트

- [가드 훅](../examples/guard-hook/) 예제를 참고하세요
- `CLAUDE_TOOL_INPUT`에서 `.env`를 검사
- 차단하려면 어떤 exit code? → `exit 2`
- 별도의 `.sh` 파일을 만들어도 되고, 한 줄 명령어로 해도 됩니다

### 정답 확인

<details>
<summary>💡 정답 보기 (먼저 직접 해보세요!)</summary>

**방법 1: 한 줄 명령어**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hook": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q '.env'; then echo '🔒 .env 파일은 수정할 수 없습니다!'; exit 2; fi"
      }
    ],
    "PostToolUse": []
  }
}
```

**방법 2: 스크립트 파일 (guard-env.sh)**

```bash
#!/bin/bash
if echo "$CLAUDE_TOOL_INPUT" | grep -q ".env"; then
  echo "🔒 .env 파일은 수정할 수 없습니다!"
  exit 2
fi
exit 0
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hook": "bash ./guard-env.sh"
      }
    ],
    "PostToolUse": []
  }
}
```

</details>

---

## 미션 3: 파일 생성 자동 백업 훅 ⭐⭐

### 목표

클로드가 **Write 도구**로 파일을 생성한 후, 자동으로 `.backup` 폴더에 복사하는 훅을 만드세요.

### 힌트

- 파일 생성 **후**에 백업해야 하니까 → `PostToolUse`
- `CLAUDE_TOOL_INPUT`에서 파일 경로를 추출
- `cp` 명령어로 복사
- `.backup` 폴더가 없으면 먼저 만들어야 함 (`mkdir -p`)

### 정답 확인

<details>
<summary>💡 정답 보기 (먼저 직접 해보세요!)</summary>

**backup.sh:**

```bash
#!/bin/bash
# Write 도구 사용 후 자동 백업

# .backup 폴더 생성 (없으면)
mkdir -p .backup

# CLAUDE_TOOL_INPUT에서 file_path 추출
FILE_PATH=$(echo "$CLAUDE_TOOL_INPUT" | grep -o '"file_path":"[^"]*"' | cut -d'"' -f4)

if [ -n "$FILE_PATH" ] && [ -f "$FILE_PATH" ]; then
  BACKUP_NAME=$(basename "$FILE_PATH").$(date '+%Y%m%d_%H%M%S').bak
  cp "$FILE_PATH" ".backup/$BACKUP_NAME"
  echo "💾 백업 완료: .backup/$BACKUP_NAME"
fi
```

**settings.json:**

```json
{
  "hooks": {
    "PreToolUse": [],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hook": "bash ./backup.sh"
      }
    ]
  }
}
```

</details>

---

## 보너스 미션: 조합하기! ⭐⭐⭐

미션 1, 2, 3을 **모두 합쳐서** 하나의 settings.json에 넣어보세요!

<details>
<summary>💡 정답 보기</summary>

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hook": "echo '⚠️ 터미널 명령어 실행!'"
      },
      {
        "matcher": "",
        "hook": "bash ./guard-env.sh"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hook": "bash ./backup.sh"
      }
    ]
  }
}
```

> 💡 PreToolUse에 여러 훅을 등록하면 **순서대로** 실행됩니다!

</details>

---

## 핵심 정리

```
🏋️ 연습 문제 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  미션 1: echo로 메시지 표시 (PreToolUse)
  미션 2: grep + exit 2로 파일 차단 (PreToolUse)
  미션 3: cp로 자동 백업 (PostToolUse)
  보너스: 여러 훅 조합하기

  🎯 모두 완료했다면 Hooks 마스터! 🎉
```
