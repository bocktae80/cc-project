# Grep 검색 마스터하기 🔍

> 🔍 전문 검색 엔진처럼 — 파일 안의 내용으로 찾기!

Grep은 **파일 내용 검색** 도구입니다. 특정 단어, 패턴, 코드가 들어있는 파일과 줄을 찾아줘요.

마치 구글에서 키워드를 검색하는 것과 같습니다! 다만 검색 범위가 인터넷이 아니라 **내 프로젝트 파일**이에요.

---

## 🎛️ Grep의 핵심 옵션 3가지

Grep에는 결과를 보여주는 **3가지 모드**가 있습니다:

| output_mode | 비유 | 보여주는 것 | 언제 쓸까 |
|-------------|------|------------|-----------|
| `files_with_matches` | 📁 "어느 파일?" | 파일 이름만 | 일단 어디에 있는지만 알고 싶을 때 |
| `content` | 📄 "정확히 뭐라고?" | 매칭된 줄 + 파일명 | 구체적인 내용을 보고 싶을 때 |
| `count` | 🔢 "몇 개?" | 파일별 매칭 횟수 | 얼마나 많은지 파악할 때 |

---

## 📁 모드 1: files_with_matches — "어느 파일에 있어?"

가장 기본적인 모드! **파일 이름만** 알려줍니다. (기본값)

```
Grep: pattern="TODO" path="playground/" output_mode="files_with_matches"
```

**결과:**
```
playground/src/app.js
playground/src/utils.js
playground/src/components/Footer.js
playground/src/components/TodoItem.js
playground/tests/app.test.js
playground/docs/guide.md
```

> 💡 "TODO가 어느 파일에 있지?" → 파일 목록만 빠르게 확인!

---

## 📄 모드 2: content — "정확히 뭐라고 써있어?"

매칭된 **줄의 내용**까지 보여줍니다. 가장 자세한 모드!

```
Grep: pattern="TODO" path="playground/" output_mode="content"
```

**결과:**
```
playground/src/app.js:14:// TODO: add authentication middleware
playground/src/app.js:65:  // TODO: add error handling for invalid data types
playground/src/utils.js:14:  // TODO: add timezone support
playground/src/components/Footer.js:6:// TODO: add social media links
playground/src/components/TodoItem.js:5:// TODO: add drag and drop support
playground/tests/app.test.js:3:// TODO: add integration tests for error cases
playground/docs/guide.md:5:<!-- TODO: add screenshots -->
```

파일명 + 줄 번호 + 내용이 한 번에! 📋

---

## 🔢 모드 3: count — "몇 개나 있어?"

파일별로 **매칭 횟수**를 알려줍니다.

```
Grep: pattern="TODO" path="playground/" output_mode="count"
```

**결과:**
```
playground/src/app.js: 2
playground/src/utils.js: 1
playground/src/components/Footer.js: 1
playground/src/components/TodoItem.js: 1
playground/tests/app.test.js: 1
playground/docs/guide.md: 1
```

> 💡 app.js에 TODO가 2개로 가장 많네요!

---

## 🔭 컨텍스트 옵션 — 주변 코드도 같이 보기

매칭된 줄만 보면 맥락을 모를 때가 있죠. 주변 코드도 같이 볼 수 있습니다!

| 옵션 | 이름 | 의미 | 비유 |
|------|------|------|------|
| `-B` | Before | 매칭 줄 **위** N줄 | "그 전에 뭐가 있지?" |
| `-A` | After | 매칭 줄 **아래** N줄 | "그 다음에 뭐가 있지?" |
| `-C` | Context | 매칭 줄 **위아래** N줄 | "앞뒤로 보여줘" |

### 예시: TODO 앞뒤 2줄씩 보기

```
Grep: pattern="TODO" path="playground/src/app.js" output_mode="content" -C=2
```

**결과:**
```
12:app.use(express.json());
13:
14:// TODO: add authentication middleware
15:
16:// GET /api/todos - Get all todos
--
63:
64:  // TODO: add error handling for invalid data types
65:  if (title !== undefined) todo.title = title;
66:  if (description !== undefined) todo.description = description;
```

> 💡 `-C=2`로 앞뒤 2줄을 보니 TODO가 어떤 맥락인지 바로 알 수 있어요!

---

## 🎯 검색 패턴 예시

Grep은 **정규표현식(regex)**을 지원합니다. 어렵게 생각하지 마세요, 자주 쓰는 것만 알면 돼요!

### 기본 텍스트 검색

```
Grep: pattern="express" path="playground/"
```
→ "express"라는 단어가 있는 모든 곳

### 대소문자 무시하기

```
Grep: pattern="todo" path="playground/" -i=true
```
→ "todo", "TODO", "Todo" 모두 찾음

### 함수 정의 찾기

```
Grep: pattern="function " path="playground/src/" output_mode="content"
```

**결과:**
```
playground/src/utils.js:function formatDate(date) {
playground/src/utils.js:function generateId() {
playground/src/utils.js:function validateEmail(email) {
playground/src/components/Header.js:function Header({ title, todoCount }) {
playground/src/components/Footer.js:function Footer({ year }) {
playground/src/components/TodoItem.js:function TodoItem({ id, title, ... }) {
playground/src/components/TodoItem.js:function TodoList({ todos }) {
```

### export 찾기

```
Grep: pattern="module.exports" path="playground/src/" output_mode="content"
```

**결과:**
```
playground/src/app.js:module.exports = app;
playground/src/utils.js:module.exports = {
playground/src/components/Header.js:module.exports = { Header };
playground/src/components/Footer.js:module.exports = { Footer };
playground/src/components/TodoItem.js:module.exports = { TodoItem, TodoList };
```

### 파일 타입 필터

```
Grep: pattern="TODO" path="playground/" glob="*.js"
```
→ `.js` 파일에서만 TODO 검색 (`.md` 파일 제외)

---

## 🧪 연습 문제

### Q1. playground에서 "require"가 있는 파일을 찾아보세요
<details>
<summary>💡 정답 보기</summary>

```
Grep: pattern="require" path="playground/" output_mode="files_with_matches"
```
결과: `app.js`, `app.test.js`, `utils.test.js` (3개)
</details>

### Q2. app.js에서 "res.json"이 있는 줄과 줄 번호를 보세요
<details>
<summary>💡 정답 보기</summary>

```
Grep: pattern="res.json" path="playground/src/app.js" output_mode="content"
```
결과: 응답을 보내는 줄들이 나옵니다
</details>

### Q3. 모든 파일에서 "error"(대소문자 무시)를 찾아보세요
<details>
<summary>💡 정답 보기</summary>

```
Grep: pattern="error" path="playground/" output_mode="content" -i=true
```
결과: "error", "Error", "ERROR" 모두 매칭
</details>

### Q4. 파일별로 "const"가 몇 번 쓰였는지 세어보세요
<details>
<summary>💡 정답 보기</summary>

```
Grep: pattern="const" path="playground/" output_mode="count"
```
결과: 파일별 const 사용 횟수
</details>

---

## 💡 핵심 정리

```
┌───────────────────────────────────────────────┐
│ Grep 핵심 3가지                               │
│                                               │
│ 📁 files_with_matches = 어느 파일?            │
│ 📄 content            = 정확히 뭐라고?        │
│ 🔢 count              = 몇 개?                │
│                                               │
│ 🔭 컨텍스트 옵션                              │
│ -B = 위 N줄  |  -A = 아래 N줄  |  -C = 양쪽  │
│                                               │
│ 🎯 유용한 팁                                  │
│ -i = 대소문자 무시                             │
│ glob = 특정 파일만 검색                        │
└───────────────────────────────────────────────┘
```

> ✅ 다음: [콤보 전략 + 실전 미션](../combined/README.md)
