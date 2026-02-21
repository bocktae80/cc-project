# 실용 스킬 모음 예제 🔧

> 실전에서 바로 쓸 수 있는 4가지 스킬이 준비되어 있어요!

---

## 📁 파일 구조

```
useful-skills/
├── README.md                        ← 지금 보고 있는 파일
└── .claude/
    └── commands/
        ├── review.md                ← /review (코드 리뷰)
        ├── explain.md               ← /explain (코드 설명)
        ├── test-gen.md              ← /test-gen (테스트 생성)
        └── summarize.md             ← /summarize (파일 요약)
```

---

## 🚀 사용법

### 1. 이 폴더에서 클로드 코드 실행

```bash
cd examples/useful-skills
claude
```

### 2. 스킬 실행

```
/review 아무파일.js
/explain 아무파일.js
/test-gen 아무파일.js
/summarize 아무파일.js
```

> 💡 테스트할 코드 파일이 없다면, 이 README.md 파일로도 해볼 수 있어요!

---

## 📋 스킬 소개

### 🔍 `/review` — 코드 리뷰

코드의 문제점을 **심각도별**로 분류해서 알려줘요.

- 🔴 심각 (Critical) — 버그, 보안 취약점
- 🟡 주의 (Warning) — 성능, 가독성 문제
- 🟢 제안 (Suggestion) — 개선 아이디어

### 📖 `/explain` — 코드 설명

코드를 **중학생 눈높이**로 설명해요.

- 전문 용어에 쉬운 설명 추가
- 실생활 비유 포함
- 한 줄씩 한국어 번역

### 🧪 `/test-gen` — 테스트 생성

코드의 **테스트를 자동으로** 만들어줘요.

- 함수마다 정상 + 에러 케이스
- 한국어 테스트 이름
- edge case 포함

### 📋 `/summarize` — 파일 요약

파일 내용을 **깔끔하게 요약**해요.

- 한줄 요약
- 주요 구성요소
- 의존성 목록
- 특이사항

---

## 🎯 추천 활용 순서

하나의 파일을 분석할 때 이 순서로 해보세요:

```
1️⃣ /summarize 파일명   → 전체 파악
2️⃣ /review 파일명      → 문제점 찾기
3️⃣ /explain 파일명     → 어려운 부분 이해
4️⃣ /test-gen 파일명    → 테스트 작성
```

---

## 🛠️ 커스터마이즈

각 스킬 파일을 열어서 **자기 스타일에 맞게** 수정해보세요!

예시:
- `review.md`에 "보안 취약점 특히 집중" 추가
- `explain.md`에 "초등학생 눈높이로" 변경
- `test-gen.md`에 "Jest 대신 Vitest 사용" 추가
- `summarize.md`에 "다이어그램도 그려줘" 추가
