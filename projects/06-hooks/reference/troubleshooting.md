# 문제 해결 가이드 🔧

> 훅이 안 되면? 여기서 답을 찾아보세요!

---

## 1. 훅이 실행되지 않아요 😢

### 증상

settings.json에 훅을 설정했는데, 클로드가 도구를 사용해도 아무 반응이 없어요.

### 원인과 해결

**✅ settings.json 위치 확인**

```
❌ 잘못된 위치:
project/
├── settings.json          ← 여기에 놓으면 안 됨!
└── ...

✅ 올바른 위치:
project/
├── .claude/
│   └── settings.json      ← .claude 폴더 안에!
└── ...
```

> 💡 `.claude/` 폴더 안에 `settings.json`이 있어야 합니다!

**✅ JSON 형식 확인**

```json
// ❌ 잘못된 JSON (마지막 쉼표)
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Write", "hook": "echo 'hi'" },  ← 여기 쉼표!
    ]
  }
}

// ✅ 올바른 JSON
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Write", "hook": "echo 'hi'" }   ← 쉼표 없음!
    ]
  }
}
```

**✅ 클로드 코드를 해당 폴더에서 실행했는지 확인**

```bash
# settings.json이 있는 프로젝트 폴더에서 실행해야 함!
cd my-project/
claude
```

---

## 2. exit code를 잘못 사용했어요 🔢

### 증상

차단하고 싶은데 차단이 안 되거나, 허용하고 싶은데 에러가 나요.

### 원인과 해결

| exit code | 의미 | 자주 하는 실수 |
|-----------|------|--------------|
| `exit 0` | ✅ 허용 | - |
| `exit 1` | ⚠️ 에러 (훅 자체 문제) | 차단하려고 `exit 1` 쓰면 안 됨! |
| `exit 2` | 🚫 차단 | 이것만 차단! |

```bash
# ❌ 잘못된 차단 (exit 1은 에러!)
if [ something_wrong ]; then
  exit 1    # 이건 차단이 아니라 에러!
fi

# ✅ 올바른 차단
if [ something_wrong ]; then
  exit 2    # 이것이 차단!
fi
```

> ⚠️ **기억하세요:** 차단은 오직 `exit 2`만! `exit 1`은 "훅에 문제가 생겼다"는 뜻이에요.

---

## 3. 환경변수가 비어있어요 📭

### 증상

`CLAUDE_TOOL_RESULT`를 사용하려는데 비어있어요.

### 원인과 해결

```
🕐 시간 순서:

  PreToolUse (도구 실행 전)
    → CLAUDE_TOOL_NAME   ✅ 있음
    → CLAUDE_TOOL_INPUT  ✅ 있음
    → CLAUDE_TOOL_RESULT ❌ 없음 (아직 실행 전!)

  PostToolUse (도구 실행 후)
    → CLAUDE_TOOL_NAME   ✅ 있음
    → CLAUDE_TOOL_INPUT  ✅ 있음
    → CLAUDE_TOOL_RESULT ✅ 있음 (실행 완료!)
```

**`CLAUDE_TOOL_RESULT`는 PostToolUse에서만 사용 가능합니다!**

```json
// ❌ PreToolUse에서 RESULT 사용 → 비어있음!
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "", "hook": "echo $CLAUDE_TOOL_RESULT" }
    ]
  }
}

// ✅ PostToolUse에서 RESULT 사용 → 정상!
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "", "hook": "echo $CLAUDE_TOOL_RESULT" }
    ]
  }
}
```

---

## 4. 훅이 너무 느려요 🐌

### 증상

훅을 설정했더니 클로드의 응답이 느려졌어요.

### 원인과 해결

훅은 도구 사용 **전/후**에 실행되므로, 훅이 오래 걸리면 전체가 느려집니다.

```
💡 비유: 놀이공원 입장 검사

   빠른 검사: 티켓 확인 → 1초 → 바로 입장!
   느린 검사: 짐 검사 + 신분증 + 사진촬영 → 5분 → 줄이 길어짐...
```

**✅ 빠르게 만드는 팁:**

```bash
# ❌ 느린 훅 (네트워크 요청)
curl https://api.example.com/log -d "$CLAUDE_TOOL_INPUT"

# ✅ 빠른 훅 (로컬 파일에 기록)
echo "$CLAUDE_TOOL_INPUT" >> log.txt

# ✅ 백그라운드로 실행 (느린 작업은 뒤에서)
curl https://api.example.com/log -d "$CLAUDE_TOOL_INPUT" &
```

**✅ 주의사항:**
- 훅은 가능한 **간단하고 빠르게** 작성
- 네트워크 요청은 피하거나 백그라운드(`&`)로 실행
- 타임아웃이 발생하면 훅이 무시될 수 있음

---

## 5. matcher가 작동 안 해요 🎯

### 증상

특정 도구에만 반응하도록 matcher를 설정했는데, 반응하지 않아요.

### 원인과 해결

**✅ 정확한 도구 이름 사용**

```json
// ❌ 잘못된 도구 이름
{ "matcher": "write", "hook": "..." }        // 소문자 ❌
{ "matcher": "file_write", "hook": "..." }   // 틀린 이름 ❌
{ "matcher": "WriteFile", "hook": "..." }    // 틀린 이름 ❌

// ✅ 올바른 도구 이름 (대소문자 정확히!)
{ "matcher": "Write", "hook": "..." }        // ✅
{ "matcher": "Edit", "hook": "..." }         // ✅
{ "matcher": "Bash", "hook": "..." }         // ✅
{ "matcher": "Read", "hook": "..." }         // ✅
```

**정확한 도구 이름 목록:**

| 도구 이름 | 기능 |
|----------|------|
| `Write` | 파일 작성 |
| `Edit` | 파일 수정 |
| `Read` | 파일 읽기 |
| `Bash` | 터미널 명령어 실행 |
| `Glob` | 파일 패턴 검색 |
| `Grep` | 파일 내용 검색 |
| `WebFetch` | 웹 페이지 가져오기 |
| `WebSearch` | 웹 검색 |

> ⚠️ **대소문자를 정확히** 맞춰야 합니다! `write`가 아니라 `Write`!

---

## 빠른 진단 체크리스트

문제가 생기면 이 순서로 확인하세요:

```
□ 1. .claude/settings.json 파일이 올바른 위치에 있는가?
□ 2. JSON 형식이 올바른가? (쉼표, 괄호 확인)
□ 3. 해당 폴더에서 claude를 실행했는가?
□ 4. exit code를 올바르게 사용했는가? (차단=2)
□ 5. 환경변수를 올바른 훅에서 사용했는가? (RESULT=Post만)
□ 6. matcher의 도구 이름이 정확한가? (대소문자)
□ 7. 스크립트에 실행 권한이 있는가? (chmod +x)
```
