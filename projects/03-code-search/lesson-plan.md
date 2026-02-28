# 튜터 지시서: 코드 검색

> 이 파일은 `/learn 03` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Glob(파일 찾기)과 Grep(내용 찾기)을 실제로 사용하며 "코드 탐정"이 되어본다.

## 핵심 비유

"Glob은 도서관 카탈로그에요 — 제목으로 책을 찾죠. Grep은 검색엔진이에요 — 내용으로 찾죠. 대형 프로젝트에서 원하는 코드를 찾을 때 이 두 도구를 함께 쓰면 아무것도 못 찾을 일이 없어요!"

## 연습 파일 (playground — 이미 존재)

이 프로젝트에는 연습용 가상 웹 프로젝트가 있습니다:

```
projects/03-code-search/playground/
├── package.json
├── src/
│   ├── app.js
│   ├── utils.js
│   ├── config.json
│   └── components/
│       ├── Header.js
│       ├── Footer.js
│       └── TodoItem.js
├── tests/
│   ├── app.test.js
│   └── utils.test.js
├── docs/
│   ├── api.md
│   └── guide.md
└── styles/
    ├── main.css
    └── components.css
```

## 교육 흐름

### Step 1: Glob — 파일 이름으로 찾기

1. "코드 탐정이 되어볼 거예요! 먼저 파일을 이름으로 찾아볼까요?"
2. playground 폴더에서 Glob 도구 실행 시연:
   - `Glob("*.js", path="projects/03-code-search/playground/src/")` → JS 파일만
   - `Glob("**/*.js", path="projects/03-code-search/playground/")` → 모든 하위 폴더 JS 파일
   - `Glob("**/*.{js,json}", path="projects/03-code-search/playground/")` → JS와 JSON 모두
3. 글롭 패턴 설명:
   - `*` = 아무 글자나 (한 폴더 안에서)
   - `**` = 모든 하위 폴더까지
   - `?` = 글자 하나만
   - `{a,b}` = a 또는 b
4. 연습: "tests 폴더의 테스트 파일만 찾아볼까요? 어떤 패턴을 쓸까요?"

### Step 2: Grep — 파일 내용으로 찾기

1. "이번엔 파일 안의 내용으로 검색해볼게요!"
2. playground에서 Grep 도구 실행 시연:
   - `Grep("function", path="projects/03-code-search/playground/src/")` → 함수 선언 찾기
   - `Grep("TODO", path="projects/03-code-search/playground/")` → TODO 코멘트 찾기
3. 출력 모드 설명:
   - `files_with_matches` (기본) — 어떤 파일에 있는지만
   - `content` — 실제 매칭 줄 보여주기
   - `count` — 몇 번 등장하는지
4. 컨텍스트 옵션 시연:
   - `Grep("function", output_mode="content", -C=2)` → 앞뒤 2줄씩 보기
5. 연습: "이 프로젝트에서 console.log를 쓰는 곳을 모두 찾아볼까요?"

### Step 3: 콤보 전략 — Glob + Grep 합체

1. "진짜 탐정은 두 도구를 같이 써요! 깔때기 전략이라고 해요."
2. 시나리오 제시: "Header 컴포넌트에서 사용하는 CSS 클래스를 찾아봅시다"
   - Step A: `Glob("**/Header*")` → Header 관련 파일 찾기
   - Step B: `Grep("className", path="...Header.js", output_mode="content")` → 클래스명 찾기
   - Step C: `Grep("header", path="...styles/", output_mode="content")` → CSS에서 스타일 찾기
3. "큰 범위 → 좁은 범위로 좁혀가는 거예요. 용의자 전체 → 용의자 심문 → 증거 확인!"

### Step 4: 탐정 미션 + 마무리 퀴즈

미션을 하나 내주세요:
- "playground에서 `export`가 들어있는 .js 파일을 모두 찾고, 각각 어떤 것을 export하는지 알아내세요!"
- 사용자가 시도하면 함께 해결

퀴즈:
1. "모든 하위 폴더의 .css 파일을 찾는 글롭 패턴은?"
   → 정답: `**/*.css`
2. "Grep의 output_mode 세 가지는?"
   → 정답: files_with_matches(파일명만), content(내용), count(횟수)
3. "Glob과 Grep 중 파일 '내용'을 검색하는 건?"
   → 정답: Grep (Glob은 파일 이름/경로만)

### 마무리

"축하해요! 이제 코드 탐정이 됐어요! Glob으로 파일을 찾고, Grep으로 내용을 검색하면 아무리 큰 프로젝트도 두렵지 않아요.
다음 추천: `/learn 03d`로 디버그 기능을 배우거나, `/learn 04`로 웹 검색을 배워보세요!"
