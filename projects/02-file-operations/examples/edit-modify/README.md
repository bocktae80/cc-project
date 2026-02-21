# 파일 수정하기 ⭐⭐

> 코드에 버그가 있다! 클로드에게 "이 부분만 고쳐줘"라고 할 수 있을까? 🐛

## Edit 도구란?

**Edit 도구**는 파일의 **일부분만** 찾아서 바꾸는 도구예요.
마치 책에서 **오탈자를 지우개로 지우고 다시 쓰는 것**과 같아요!

```
📚 도서관 비유:
  나: "52페이지에 '사과'라고 적힌 부분을 '바나나'로 고쳐주세요"
  사서: ✏️ (해당 부분만 찾아서 수정)
  결과: 나머지 내용은 전혀 안 바뀜!

💻 클로드 코드:
  Edit 도구: old_string="사과" → new_string="바나나"
  결과: "사과"만 "바나나"로 변경, 나머지는 그대로!
```

---

## 핵심 개념: old_string의 유일성 규칙 ⚠️

Edit 도구에서 **가장 중요한 규칙**이에요:

```
🔑 old_string은 파일 안에서 반드시 "유일"해야 합니다!

예시: 파일에 "hello"가 3군데 있다면?

  ❌ old_string: "hello"
     → 에러! 어떤 hello를 바꿔야 할지 모름

  ✅ old_string: "function hello() {"
     → 성공! 이 문장은 파일에서 딱 1곳!
```

### 해결 방법 3가지

| 상황 | 해결법 | 예시 |
|------|--------|------|
| 같은 문자열이 여러 개 | 주변 텍스트 더 포함 | `"hello"` → `"function hello() {"` |
| 전부 다 바꾸고 싶을 때 | `replace_all: true` 사용 | 모든 `"hello"`를 `"hi"`로 |
| 여전히 안 될 때 | 더 많은 줄을 포함 | 위아래 줄까지 포함해서 유일하게! |

---

## 파라미터 정리 📋

| 파라미터 | 필수? | 설명 | 예시 |
|----------|-------|------|------|
| `file_path` | ✅ 필수 | 수정할 파일 경로 | `/Users/me/app.js` |
| `old_string` | ✅ 필수 | 바꿀 원래 문자열 | `"claculate"` |
| `new_string` | ✅ 필수 | 바꿀 새 문자열 | `"calculate"` |
| `replace_all` | 선택 | 전체 교체 여부 | `true` (기본: `false`) |

---

## 따라하기: 버그 잡기 실습 🐛

### before.js — 버그가 3개 숨어있는 코드!

`before.js` 파일에는 **학생 성적 관리 프로그램**이 있어요.
하지만 버그가 3개 숨어있습니다!

```
"before.js 읽어줘"
```

### 버그 찾기 도전!

파일을 읽어보고, 버그를 찾아보세요:

<details>
<summary>💡 힌트 1: 함수 이름을 자세히 봐!</summary>

`claculateAverage` — 뭔가 이상하지 않나요? 🤔

정답: `calculate`인데 `claculate`로 잘못 적혀있어요!

</details>

<details>
<summary>💡 힌트 2: 반복문 조건을 봐!</summary>

`i <= scores.length` — 배열 인덱스는 0부터 시작하는데...

정답: `<=`가 아니라 `<`여야 해요! (배열 범위 초과)

</details>

<details>
<summary>💡 힌트 3: 마지막 줄에 오타가!</summary>

`scores.lenght` — 영어 철자가 맞나요?

정답: `lenght`가 아니라 `length`예요!

</details>

### 클로드로 버그 고치기

버그를 찾았다면, 클로드에게 고쳐달라고 해보세요:

```
"before.js에서 버그를 찾아서 고쳐줘"
```

클로드가 Edit 도구를 사용해서 각 버그를 하나씩 고칩니다:

```
Edit 1: "claculateAverage" → "calculateAverage"  (함수명 오타 수정)
Edit 2: "i <= scores.length" → "i < scores.length"  (범위 초과 수정)
Edit 3: "scores.lenght" → "scores.length"  (오타 수정)
```

📌 **관찰 포인트:** 클로드가 Edit를 3번 사용하는 걸 볼 수 있어요!
(Write를 쓰면 파일 전체를 다시 쓰지만, Edit는 해당 부분만 바꿔요)

---

## replace_all 옵션 🔄

같은 문자열을 **파일 전체에서 한 번에** 바꾸고 싶을 때 사용해요.

```
예시: 변수 이름 바꾸기

  파일에 "userName"이 10군데 있는데
  전부 "studentName"으로 바꾸고 싶다면?

  Edit 도구:
    old_string: "userName"
    new_string: "studentName"
    replace_all: true

  → 10군데 모두 한 번에 변경!
```

```
"before.js에서 변수 이름 total을 sum으로 전부 바꿔줘"
```

---

## 연습 문제: 출석 체크 프로그램 고치기 🔧

`exercise/buggy-code.js`에도 버그가 3개 숨어있어요!

```
"exercise/buggy-code.js 읽고 버그를 찾아서 고쳐줘"
```

직접 버그를 찾아보고, 클로드에게 고쳐달라고 해보세요!

<details>
<summary>✅ 정답 보기</summary>

1. `checkAttendnace` → `checkAttendance` (함수명 오타)
2. `presnet` → `present` (변수명 오타)
3. `students.lenght` → `students.length` (프로퍼티 오타)

</details>

---

## 핵심 정리 ✨

```
✏️ Edit 도구 = 정밀 수정 전문가

✅ 기억할 것:
  1. old_string은 파일에서 유일해야 함!
  2. 유일하지 않으면 → 주변 텍스트를 더 포함!
  3. 전부 바꾸려면 → replace_all: true
  4. 파일의 나머지 부분은 절대 안 바뀜 (안전!)
  5. 버그 수정, 변수 이름 변경에 딱!
```

---

## 전체 복습 🎓

3가지 도구를 모두 배웠어요!

| 상황 | 사용할 도구 |
|------|------------|
| "이 파일 뭐가 들어있지?" | 📖 **Read** |
| "새 파일 만들어줘" | 📝 **Write** |
| "이 부분만 고쳐줘" | ✏️ **Edit** |
| "전체 다시 써줘" | 📝 **Write** |
| "오타 고쳐줘" | ✏️ **Edit** |
| "변수명 전부 바꿔줘" | ✏️ **Edit** (`replace_all`) |

축하합니다! 파일 읽기/쓰기를 마스터했어요! 🎉
