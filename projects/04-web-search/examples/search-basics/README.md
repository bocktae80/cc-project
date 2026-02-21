# WebSearch 기초 ⭐

> 클로드에게 "이거 검색해봐"라고 시키는 방법!

## WebSearch란?

**WebSearch**는 클로드 코드가 **검색엔진을 사용하는 것**입니다.

비유하면:
- 여러분이 네이버/구글에서 검색하는 것 → 직접 검색
- 클로드 코드가 WebSearch를 쓰는 것 → **비서에게 검색을 시키는 것**

차이점은? 클로드가 검색 결과를 **자동으로 읽고 정리**해준다는 거예요!

---

## 기본 사용법

### 가장 간단한 검색

클로드 코드에게 이렇게 말하면 됩니다:

```
사용자: React 19 최신 기능을 검색해줘
```

클로드가 내부적으로 WebSearch를 호출합니다:

```
WebSearch 호출:
  query: "React 19 new features 2026"
```

> 💡 클로드는 자동으로 **현재 연도**(2026)를 포함해서 검색합니다.
> 이래야 오래된 정보가 아닌 최신 정보를 찾을 수 있거든요!

### 검색 결과는 이렇게 옵니다

```
검색 결과:
  1. "React 19 Release Notes" - react.dev
     React 19 introduces new hooks, server components...

  2. "What's New in React 19" - blog.example.com
     A comprehensive guide to React 19 features...

  3. "React 19 vs React 18" - dev.to
     Comparing the major changes between versions...
```

클로드가 이 결과를 읽고, 사용자에게 깔끔하게 정리해서 답변합니다.

---

## 파라미터 상세

### 1. `query` (필수) — 검색어

검색엔진에 넣을 검색어입니다.

```
✅ 좋은 검색어:
  "Claude Code WebSearch tutorial 2026"   ← 구체적 + 연도
  "TypeScript 5.8 release date"           ← 명확한 정보 요청
  "Next.js vs Remix comparison 2026"      ← 비교 요청

❌ 나쁜 검색어:
  "코딩"                                  ← 너무 광범위
  "에러"                                  ← 무슨 에러?
```

> 💡 검색어는 **영어**가 결과가 더 풍부합니다. 한국어도 가능하지만, 기술 문서는 영어가 많아요.

### 2. `allowed_domains` (선택) — 이 사이트만 검색

특정 사이트의 결과만 보고 싶을 때 사용합니다.

```
사용자: MDN에서만 JavaScript fetch API 검색해줘
```

```
WebSearch 호출:
  query: "JavaScript fetch API"
  allowed_domains: ["developer.mozilla.org"]
```

→ MDN 문서의 결과만 나옵니다!

### 3. `blocked_domains` (선택) — 이 사이트는 제외

신뢰하기 어려운 사이트를 빼고 싶을 때 사용합니다.

```
사용자: Python 튜토리얼 검색해줘, 근데 W3Schools는 빼줘
```

```
WebSearch 호출:
  query: "Python beginner tutorial 2026"
  blocked_domains: ["w3schools.com"]
```

→ W3Schools를 제외한 결과만 나옵니다!

---

## 따라하기: React 최신 버전 검색하기

### Step 1: 기본 검색

클로드 코드에게 이렇게 요청합니다:

```
사용자: React 최신 버전이 뭔지 검색해줘
```

클로드가 WebSearch를 사용해서 검색합니다.

### Step 2: 특정 사이트에서 검색

공식 사이트에서만 확인하고 싶다면:

```
사용자: React 공식 사이트에서만 최신 릴리즈 노트를 검색해줘
```

```
WebSearch 호출:
  query: "React latest release 2026"
  allowed_domains: ["react.dev", "github.com/facebook/react"]
```

### Step 3: 비교 검색

여러 프레임워크를 비교하고 싶다면:

```
사용자: 2026년 기준 React vs Vue vs Svelte 비교를 검색해줘
```

```
WebSearch 호출:
  query: "React vs Vue vs Svelte comparison 2026"
```

### Step 4: 결과 확인

클로드가 검색 결과를 정리해서 보여줍니다:

```
검색 결과를 정리하면:

React 최신 버전: 19.x
- Server Components 정식 지원
- 새로운 훅 추가
- 성능 개선
- 출처: react.dev, ...

Sources:
- [React 19 Release Notes](https://react.dev/blog/...)
- [React GitHub Releases](https://github.com/...)
```

> ⚠️ WebSearch 결과에는 반드시 **Sources(출처)**가 포함됩니다!

---

## 도메인 필터 활용 예시

| 목적 | allowed_domains | blocked_domains |
|------|----------------|-----------------|
| 공식 문서만 | `["react.dev", "nodejs.org"]` | - |
| 블로그 제외 | - | `["medium.com", "dev.to"]` |
| GitHub만 | `["github.com"]` | - |
| 한국어 사이트만 | `["tistory.com", "velog.io"]` | - |
| 광고성 사이트 제외 | - | `["w3schools.com"]` |

---

## 핵심 정리

```
┌─────────────────────────────────────────────┐
│  🔍 WebSearch 핵심                          │
│                                             │
│  1. query로 검색어를 넘긴다                  │
│  2. 최신 정보를 찾을 때는 연도를 포함!        │
│  3. allowed_domains로 특정 사이트만 검색      │
│  4. blocked_domains로 특정 사이트 제외        │
│  5. 결과에는 항상 출처(Sources)가 포함됨      │
└─────────────────────────────────────────────┘
```

---

## 더 연습해보기

다음 요청들을 클로드 코드에게 직접 시도해보세요:

1. "TypeScript 최신 버전 검색해줘"
2. "GitHub에서만 클로드 코드 관련 프로젝트 검색해줘"
3. "MDN에서 Array.map() 문서 검색해줘"
4. "2026년 프론트엔드 트렌드 검색해줘"
