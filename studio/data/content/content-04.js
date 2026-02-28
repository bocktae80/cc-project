window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["04-web-search"] = {
  overview: `# 웹 검색/페치 (WebSearch & WebFetch)

클로드 코드는 똑똑하지만, 학습 데이터에는 마감일이 있습니다. 2025년 5월 이후의 정보는 모릅니다.
하지만 **WebSearch**와 **WebFetch**를 사용하면 최신 정보를 직접 인터넷에서 가져올 수 있어요!

## 비유로 이해하기

| 도구 | 비유 | 하는 일 |
|------|------|---------|
| **WebSearch** | 사서에게 "이 주제 관련 책 찾아주세요" | 검색 엔진에서 결과 목록을 가져옴 |
| **WebFetch** | 사서에게 "이 책 3장 요약해주세요" | 특정 URL의 내용을 가져와 분석 |

## 한눈에 비교

| 구분 | WebSearch | WebFetch |
|------|-----------|----------|
| 입력 | 검색어 (query) | URL + 질문 (url + prompt) |
| 결과 | 검색 결과 목록 (제목, 링크, 요약) | 페이지 내용 분석 결과 |
| 용도 | 최신 정보 탐색, 트렌드 파악 | 특정 페이지 상세 분석 |
| 속도 | 빠름 | 보통 (전체 페이지 읽기) |

## 조합 패턴

\`\`\`
WebSearch로 검색 → 검색 결과에서 URL 발견 → WebFetch로 상세 분석
\`\`\`

> 이 순서가 가장 효과적인 리서치 방법입니다!`,

  concepts: [
    {
      id: "web-search",
      title: "WebSearch (검색 엔진)",
      content: `## WebSearch란?

**WebSearch**는 클로드 코드가 인터넷을 검색할 수 있게 해주는 도구입니다.

### 도서관 사서 비유

도서관에 가서 사서에게 물어보는 것과 같아요:
- "인공지능 관련 **최신 책** 뭐가 있나요?"
- 사서가 관련 책 **목록**을 쭉 알려줍니다
- 제목, 저자, 간단한 요약이 적힌 목록표를 받는 것!

WebSearch도 마찬가지:
- 검색어를 주면 검색 결과 **목록**을 돌려줍니다
- 각 결과에는 제목, 링크, 간단한 요약이 포함돼요

### 파라미터

| 파라미터 | 필수 | 설명 | 예시 |
|----------|------|------|------|
| \`query\` | 필수 | 검색어 | "React 19 new features 2026" |
| \`allowed_domains\` | 선택 | 이 사이트**만** 검색 | ["developer.mozilla.org"] |
| \`blocked_domains\` | 선택 | 이 사이트 **제외** | ["reddit.com"] |

### 도메인 필터링

검색 범위를 조절하고 싶을 때 유용합니다:

\`\`\`
공식 문서에서만 검색:
  allowed_domains: ["docs.anthropic.com", "developer.mozilla.org"]

특정 사이트 제외:
  blocked_domains: ["reddit.com", "quora.com"]
\`\`\`

### 검색어 작성 팁

| 나쁜 검색어 | 좋은 검색어 | 이유 |
|------------|-----------|------|
| "react" | "React 19 new features 2026" | 구체적 + 연도 포함 |
| "에러 해결" | "Next.js hydration error solution" | 기술 이름 + 에러 메시지 |
| "좋은 라이브러리" | "TypeScript form validation library comparison" | 구체적 카테고리 |`
    },
    {
      id: "web-fetch",
      title: "WebFetch (URL 분석)",
      content: `## WebFetch란?

**WebFetch**는 특정 웹 페이지의 내용을 가져와서 분석하는 도구입니다.

### 특정 책 읽기 비유

도서관에서 원하는 책을 찾았다면, 이제 그 책을 **실제로 읽는** 단계입니다:
- "이 책의 3장을 요약해주세요"
- "설치 방법이 어디에 나와있는지 찾아주세요"

WebFetch도 마찬가지:
- URL(책)과 prompt(질문)를 주면
- 해당 페이지를 읽고, 질문에 맞는 정보를 정리해줍니다

### 파라미터

| 파라미터 | 필수 | 설명 | 예시 |
|----------|------|------|------|
| \`url\` | 필수 | 가져올 웹 주소 | "https://docs.anthropic.com/..." |
| \`prompt\` | 필수 | 어떤 정보를 원하는지 | "주요 기능 3가지를 요약해줘" |

### prompt 작성법 (매우 중요!)

prompt는 사서에게 내리는 지시입니다. **구체적일수록 좋은 결과**를 얻습니다.

\`\`\`
나쁜 예:
  prompt = "내용"
  → 뭘 정리할지 모호함

보통 예:
  prompt = "요약해줘"
  → 괜찮지만 초점이 없음

좋은 예:
  prompt = "이 페이지에서 설치 방법과 시스템 요구사항을 정리해줘"
  → 구체적이라 정확한 결과!
\`\`\`

### 접근 가능/불가능 사이트

| 접근 가능 | 접근 불가 |
|----------|----------|
| 공식 문서 | Google Docs |
| 공개 블로그 | Notion (비공개) |
| GitHub 공개 저장소 | Jira |
| 위키피디아 | 유료 구독 콘텐츠 |

> WebFetch는 **공개 페이지만** 접근할 수 있어요. 로그인이 필요한 사이트는 MCP 서버를 통해 연결해야 합니다.`
    },
    {
      id: "domain-filtering",
      title: "도메인 필터링",
      content: `## 도메인 필터링이란?

WebSearch의 검색 결과를 **특정 사이트로 제한하거나 제외**하는 기능입니다.

### 교실 비유

숙제를 할 때 선생님이 말합니다:
- "**교과서랑 공식 사이트**만 참고하세요" → allowed_domains
- "**나무위키는 사용하지 마세요**" → blocked_domains

### 두 가지 필터

#### allowed_domains (허용 목록)

이 사이트들**에서만** 검색합니다.

\`\`\`javascript
{
  query: "React hooks",
  allowed_domains: ["reactjs.org", "developer.mozilla.org"]
}
// → 공식 문서에서만 결과를 가져옴
\`\`\`

#### blocked_domains (차단 목록)

이 사이트들을 **제외하고** 검색합니다.

\`\`\`javascript
{
  query: "JavaScript tutorial",
  blocked_domains: ["w3schools.com", "reddit.com"]
}
// → 이 사이트들의 결과는 제외됨
\`\`\`

### 활용 시나리오

| 상황 | 필터 | 예시 |
|------|------|------|
| 공식 문서만 보고 싶을 때 | allowed_domains | ["docs.anthropic.com"] |
| 품질 낮은 결과 제외 | blocked_domains | ["w3schools.com"] |
| 특정 블로그에서 검색 | allowed_domains | ["blog.example.com"] |
| 오래된 정보 제외 | 검색어에 연도 추가 | query: "... 2026" |

> 팁: 두 필터를 **동시에** 사용할 수도 있지만, 보통 하나만 써도 충분합니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "WebSearch로 최신 정보 검색하기",
      content: `## 최신 정보를 검색하는 실습

WebSearch를 사용해서 클로드가 모를 수 있는 최신 정보를 검색해봅시다.

### 목표
- WebSearch의 기본 사용법을 익힙니다
- 도메인 필터링을 적용합니다
- 검색 결과를 읽고 해석합니다

### 따라하기

클로드에게 최신 정보를 물어보면 자동으로 WebSearch를 사용합니다.`,
      terminals: [
        {
          command: '사용자: "React 최신 버전의 새 기능을 검색해줘"',
          output: `WebSearch: query="React 19 new features 2026"

검색 결과:

1. React 19 Release Notes - reactjs.org
   React 19에서 추가된 Actions, use() hook, Server Components
   개선 사항을 소개합니다.

2. What's New in React 19 - blog.example.com
   React 19의 주요 변경사항과 마이그레이션 가이드...

3. React 19 vs 18 Comparison - dev.to
   React 18에서 19로 업그레이드할 때 알아야 할 것들...

→ 3개의 검색 결과가 제목, URL, 요약과 함께 표시됩니다.`
        },
        {
          command: '사용자: "공식 문서에서만 검색해줘"',
          output: `WebSearch: query="React 19 new features"
  allowed_domains: ["reactjs.org", "react.dev"]

검색 결과:

1. React 19 Release Notes - react.dev
   공식 릴리스 노트. Actions, use() hook 등 상세 설명...

2. React 19 Upgrade Guide - react.dev
   18에서 19로 업그레이드하는 공식 가이드...

→ allowed_domains로 공식 사이트 결과만 표시!
  신뢰할 수 있는 정보를 얻을 수 있습니다.`
        }
      ]
    },
    {
      id: "step-02",
      title: "WebFetch로 페이지 분석하기",
      content: `## 특정 웹 페이지 내용을 분석하는 실습

WebFetch를 사용해서 원하는 웹 페이지의 정보를 추출해봅시다.

### 목표
- WebFetch의 url + prompt 패턴을 익힙니다
- 좋은 prompt 작성법을 연습합니다
- 접근 불가 상황을 이해합니다

### 따라하기

특정 URL의 내용을 가져와서 분석해봅시다.`,
      terminals: [
        {
          command: '사용자: "이 페이지에서 설치 방법을 알려줘: https://docs.anthropic.com/en/docs/claude-code"',
          output: `WebFetch:
  url="https://docs.anthropic.com/en/docs/claude-code"
  prompt="설치 방법과 시스템 요구사항을 정리해줘"

분석 결과:

## 설치 방법

1. npm으로 설치:
   npm install -g @anthropic-ai/claude-code

2. 시스템 요구사항:
   - Node.js 18 이상
   - macOS, Linux, 또는 Windows (WSL)
   - Anthropic API 키 또는 Claude Pro/Team/Enterprise 구독

3. 첫 실행:
   cd my-project
   claude

→ prompt가 구체적이라 설치 관련 정보만 깔끔하게 추출!`
        },
        {
          command: '(실패 예시) 로그인 필요 사이트 접근 시도',
          output: `WebFetch:
  url="https://docs.google.com/document/d/abc123"
  prompt="내용을 요약해줘"

❌ WebFetch 실패!
  이 URL은 인증이 필요한 사이트입니다.
  WebFetch는 공개 페이지만 접근할 수 있습니다.

대안:
  - Google Docs는 MCP 서버를 통해 연결하세요
  - 내용을 복사해서 직접 클로드에게 붙여넣기

→ 로그인이 필요한 사이트는 접근할 수 없습니다!`
        }
      ]
    },
    {
      id: "step-03",
      title: "WebSearch + WebFetch 리서치 조합",
      content: `## 검색과 분석을 조합한 완전한 리서치

WebSearch로 찾고, WebFetch로 분석하는 풀 리서치 워크플로우를 실습합니다.

### 목표
- WebSearch → WebFetch 조합 패턴을 익힙니다
- 실전 리서치를 수행합니다
- 결과를 종합하여 결론을 도출합니다

### 미션: "Tailwind CSS v4의 변경사항 조사하기"`,
      terminals: [
        {
          command: '1단계: WebSearch로 관련 페이지 찾기',
          output: `WebSearch: query="Tailwind CSS v4 changes new features 2026"

검색 결과:

1. Tailwind CSS v4.0 - tailwindcss.com
   공식 릴리스 노트...

2. Migrating to Tailwind v4 - tailwindcss.com/docs
   마이그레이션 가이드...

3. Tailwind v4 Review - blog.example.com
   실사용 후기와 비교...

→ 공식 사이트 URL을 발견했습니다!`
        },
        {
          command: '2단계: WebFetch로 공식 문서 상세 분석',
          output: `WebFetch:
  url="https://tailwindcss.com/blog/tailwindcss-v4"
  prompt="v4에서 바뀐 주요 기능 5가지와 기존 버전과의 차이점을 정리해줘"

분석 결과:

## Tailwind CSS v4 주요 변경사항

1. **CSS-first 설정**: tailwind.config.js 대신 CSS 파일에서 직접 설정
2. **새 엔진**: Oxide 엔진으로 빌드 속도 10배 향상
3. **자동 콘텐츠 감지**: content 배열 설정 불필요
4. **CSS 네스팅**: 네이티브 CSS 중첩 지원
5. **3D 변환**: rotate-x, rotate-y 등 3D 유틸리티 추가

→ WebSearch로 URL을 찾고, WebFetch로 상세 내용을 분석!
  완벽한 리서치가 완성되었습니다.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "research-workflow",
      title: "리서치 워크플로우",
      content: `## 효과적인 리서치 패턴

WebSearch와 WebFetch를 조합해서 체계적으로 정보를 조사하는 방법입니다.

### 패턴 1: 기술 조사

\`\`\`
1. WebSearch: "TypeScript 5.4 new features"
2. 검색 결과에서 공식 블로그 URL 확인
3. WebFetch: URL + "주요 기능과 예제 코드를 정리해줘"
\`\`\`

### 패턴 2: 에러 해결

\`\`\`
1. WebSearch: "Next.js hydration error React 19"
2. 검색 결과에서 해결책이 있는 페이지 확인
3. WebFetch: URL + "에러 원인과 해결 방법을 단계별로 정리해줘"
\`\`\`

### 패턴 3: 라이브러리 비교

\`\`\`
1. WebSearch: "React form library comparison 2026"
   allowed_domains: ["npmjs.com", "github.com"]
2. 여러 결과 페이지를 WebFetch로 분석
3. 비교표로 정리
\`\`\`

### 주의사항 정리

| 항목 | 설명 |
|------|------|
| 캐시 | 같은 URL은 15분간 캐시됨 |
| 인증 | 로그인 사이트 접근 불가 |
| HTTPS | http:// 요청도 자동으로 https://로 변환 |
| 리다이렉트 | 다른 호스트로 이동 시 URL을 알려줌 |`,
      checklist: [
        "검색어에 연도와 구체적 키워드를 포함했는가?",
        "WebFetch의 prompt가 충분히 구체적인가?",
        "접근 불가 사이트(로그인 필요)를 미리 파악했는가?",
        "도메인 필터링으로 신뢰할 수 있는 소스를 선별했는가?"
      ]
    }
  ],

  quiz: [
    {
      question: "WebSearch와 WebFetch의 가장 큰 차이는 무엇인가요?",
      options: [
        "WebSearch는 빠르고 WebFetch는 느리다",
        "WebSearch는 검색어로 결과 목록을 찾고, WebFetch는 특정 URL의 내용을 분석한다",
        "WebSearch는 영어만, WebFetch는 한국어만 지원한다"
      ],
      answer: 1,
      explanation: "WebSearch는 검색 엔진처럼 검색어로 결과 목록을 가져오고, WebFetch는 특정 URL 페이지의 내용을 가져와 분석합니다. 사서에게 '책 찾아줘'(WebSearch) vs '이 책 읽어줘'(WebFetch)의 차이입니다."
    },
    {
      question: "WebFetch로 접근할 수 없는 사이트는?",
      options: [
        "위키피디아",
        "GitHub 공개 저장소",
        "Google Docs (비공개 문서)"
      ],
      answer: 2,
      explanation: "WebFetch는 공개 페이지만 접근할 수 있습니다. Google Docs처럼 로그인이 필요한 서비스는 접근할 수 없어요. 이런 서비스는 MCP 서버를 통해 연결해야 합니다."
    },
    {
      question: "WebSearch에서 특정 사이트의 결과만 보고 싶을 때 사용하는 파라미터는?",
      options: [
        "blocked_domains",
        "allowed_domains",
        "site_filter"
      ],
      answer: 1,
      explanation: "allowed_domains는 지정한 사이트에서만 검색 결과를 가져오는 파라미터입니다. 예: allowed_domains: [\"react.dev\"]로 설정하면 React 공식 사이트의 결과만 표시됩니다."
    },
    {
      question: "WebFetch에서 좋은 결과를 얻기 위한 prompt 작성법은?",
      options: [
        "\"내용\" 처럼 짧게 쓴다",
        "\"이 페이지에서 설치 방법과 시스템 요구사항을 정리해줘\" 처럼 구체적으로 쓴다",
        "prompt는 결과에 영향을 주지 않으므로 아무렇게나 써도 된다"
      ],
      answer: 1,
      explanation: "WebFetch의 prompt는 구체적일수록 좋은 결과를 얻습니다. '내용'처럼 모호하면 사서가 뭘 정리할지 모르지만, 구체적으로 요청하면 원하는 정보를 정확히 추출해줍니다."
    },
    {
      question: "가장 효과적인 리서치 순서는?",
      options: [
        "WebFetch로 여러 URL을 무작위로 분석",
        "WebSearch로 검색 → 결과에서 URL 확인 → WebFetch로 상세 분석",
        "WebSearch만 여러 번 반복"
      ],
      answer: 1,
      explanation: "WebSearch로 관련 페이지를 먼저 찾고, 그 중에서 가장 유용한 URL을 골라 WebFetch로 상세 분석하는 것이 가장 효과적인 리서치 패턴입니다. 검색으로 범위를 좁히고 → 분석으로 깊이를 더하는 순서입니다."
    }
  ]
};
