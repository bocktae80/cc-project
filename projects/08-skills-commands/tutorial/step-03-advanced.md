# Step 3: 실용 스킬 활용하기 🔧

> 인사 스킬은 연습이었고, 이제 진짜 쓸모 있는 스킬을 만들어봐요! 🚀

---

## 🎯 이번 스텝의 목표

실전에서 바로 쓸 수 있는 **4가지 실용 스킬** 만들고 활용하기

| 스킬 | 용도 | 비유 |
|------|------|------|
| `/review` | 코드 리뷰 | 👨‍🏫 선생님의 첨삭 |
| `/explain` | 코드 설명 | 📖 쉬운 번역 |
| `/test-gen` | 테스트 생성 | 🧪 실험 키트 |
| `/summarize` | 파일 요약 | 📋 한줄 요약 |

---

## 1️⃣ `/review` — 코드 리뷰 스킬

> 👨‍🏫 비유: 선생님이 작문을 첨삭해주는 것처럼, 코드를 꼼꼼히 검사!

### 스킬 파일 만들기

`.claude/commands/review.md`:

```markdown
다음 파일의 코드를 리뷰해주세요: $ARGUMENTS

리뷰 기준:
1. 🔴 심각 (Critical) — 버그, 보안 취약점
2. 🟡 주의 (Warning) — 성능, 가독성 문제
3. 🟢 제안 (Suggestion) — 개선 아이디어

출력 형식:
- 각 항목에 심각도 이모지 표시
- 해당 코드 줄 번호 표시
- 수정 제안 포함
```

### 사용 예시

```
/review src/login.js
```

**예상 결과**:

```
📝 코드 리뷰: src/login.js

🔴 심각 (Critical)
  - L15: 비밀번호를 평문으로 저장하고 있음
    → bcrypt 등 해시 함수 사용 권장

🟡 주의 (Warning)
  - L8: 변수명 `x`가 의미를 알 수 없음
    → `userInput` 등 의미 있는 이름으로 변경
  - L22: 에러 처리 없이 API 호출
    → try-catch로 감싸기

🟢 제안 (Suggestion)
  - L3: console.log 디버그 코드 남아있음
    → 배포 전 제거 권장
```

> 💡 **포인트**: 심각도별 이모지(🔴🟡🟢)로 한눈에 중요도를 파악할 수 있어요!

---

## 2️⃣ `/explain` — 코드 설명 스킬

> 📖 비유: 영어 책을 쉬운 한국어로 번역해주는 것처럼!

### 스킬 파일 만들기

`.claude/commands/explain.md`:

```markdown
다음 코드를 중학생이 이해할 수 있게 설명해주세요: $ARGUMENTS

설명 규칙:
- 전문 용어는 괄호 안에 쉬운 설명 추가
- 실생활 비유 포함
- 코드를 한 줄씩 한국어로 번역
- "핵심 정리" 섹션으로 마무리
```

### 사용 예시

```
/explain src/calculator.js
```

**예상 결과**:

```
📖 코드 설명: src/calculator.js

1줄: function add(a, b) {
  → "add"라는 이름의 함수(기능 상자)를 만들어요.
  → a와 b라는 두 개의 재료를 받아요.
  → 비유: 자판기에 동전 2개를 넣는 것!

2줄:   return a + b;
  → a와 b를 더한 결과를 돌려줘요.
  → 비유: 자판기에서 음료가 나오는 것!

3줄: }
  → 함수 끝! (기능 상자 닫기)

🎯 핵심 정리:
  - 이 함수는 두 숫자를 더하는 계산기예요
  - 입력: 숫자 2개 / 출력: 더한 결과
```

---

## 3️⃣ `/test-gen` — 테스트 생성 스킬

> 🧪 비유: 과학 실험 키트처럼, 코드가 제대로 동작하는지 검증!

### 스킬 파일 만들기

`.claude/commands/test-gen.md`:

```markdown
다음 파일의 테스트 코드를 자동 생성해주세요: $ARGUMENTS

규칙:
- 함수마다 최소 2개 테스트 (정상 + 에러)
- 테스트명은 한국어 설명
- describe/it 구조 사용
- edge case 포함
```

### 사용 예시

```
/test-gen src/calculator.js
```

**예상 결과**:

```javascript
describe('add 함수', () => {
  it('두 양수를 더할 수 있다', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('음수도 더할 수 있다', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  it('0을 더하면 원래 숫자가 나온다', () => {
    expect(add(5, 0)).toBe(5);
  });
});
```

> 💡 **포인트**: 테스트 이름이 한국어라서 뭘 확인하는지 바로 알 수 있어요!

---

## 4️⃣ `/summarize` — 파일 요약 스킬

> 📋 비유: 긴 책을 한 페이지로 요약해주는 것!

### 스킬 파일 만들기

`.claude/commands/summarize.md`:

```markdown
다음 파일의 내용을 요약해주세요: $ARGUMENTS

요약 형식:
- 📋 한줄 요약
- 📦 주요 구성요소 (함수/클래스 목록)
- 🔗 의존성 (import/require)
- 💡 특이사항
```

### 사용 예시

```
/summarize src/app.js
```

**예상 결과**:

```
📋 한줄 요약: Express 기반 REST API 서버의 메인 파일

📦 주요 구성요소:
  - setupMiddleware() — 미들웨어 설정
  - setupRoutes() — 라우트 등록
  - startServer() — 서버 시작

🔗 의존성:
  - express (웹 프레임워크)
  - cors (크로스 도메인 허용)
  - dotenv (환경 변수 로딩)

💡 특이사항:
  - 포트는 환경 변수에서 읽음 (기본값: 3000)
  - 에러 핸들러가 마지막에 등록됨
```

---

## 📁 전체 파일 구조

4개 스킬을 모두 만들면 이렇게 돼요:

```
내-프로젝트/
├── .claude/
│   └── commands/
│       ├── review.md       ← /review
│       ├── explain.md      ← /explain
│       ├── test-gen.md     ← /test-gen
│       └── summarize.md    ← /summarize
├── src/
│   ├── app.js
│   └── calculator.js
└── package.json
```

---

## 🎯 스킬 조합 활용법

스킬을 **순서대로** 사용하면 더 강력해요!

```
1. /summarize src/app.js     ← 먼저 파일 파악
2. /review src/app.js        ← 문제점 찾기
3. /explain src/app.js       ← 어려운 부분 이해
4. /test-gen src/app.js      ← 테스트 작성
```

> 💡 **비유**:
> 1. 📋 책 목차 보기 (summarize)
> 2. 👨‍🏫 선생님 첨삭 (review)
> 3. 📖 어려운 부분 해설 (explain)
> 4. 🧪 이해도 확인 시험 (test-gen)

---

## ✅ 체크리스트

- [ ] `review.md` 생성 및 `/review` 테스트
- [ ] `explain.md` 생성 및 `/explain` 테스트
- [ ] `test-gen.md` 생성 및 `/test-gen` 테스트
- [ ] `summarize.md` 생성 및 `/summarize` 테스트
- [ ] (보너스) 4개 스킬을 순서대로 조합 사용

---

## 💡 핵심 정리

| 스킬 | 용도 | 핵심 기능 |
|------|------|----------|
| `/review` | 코드 리뷰 | 🔴🟡🟢 심각도별 분류 |
| `/explain` | 코드 설명 | 중학생 눈높이, 비유 포함 |
| `/test-gen` | 테스트 생성 | 함수별 정상+에러 테스트 |
| `/summarize` | 파일 요약 | 한줄요약, 구성요소, 의존성 |

> 🔧 **기억하세요**: 좋은 스킬 = 구체적인 지시 + 명확한 출력 형식!
> 스킬 파일에 원하는 결과의 형식을 자세히 적을수록 결과가 좋아져요.
