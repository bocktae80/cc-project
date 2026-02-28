window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["03-code-search"] = {
  overview: `# 코드 검색 (Glob/Grep)

10,000줄짜리 프로젝트에서 원하는 코드를 어떻게 찾을까요? 파일을 하나씩 열어보면 하루가 다 갑니다.
클로드 코드에는 **두 가지 강력한 검색 도구**가 있습니다!

## 도서관에서 책 찾기 비유

| 방법 | 도서관에서 | 클로드 코드에서 |
|------|-----------|---------------|
| 제목/위치로 찾기 | 카탈로그에서 "수학 코너 3번 선반" | **Glob** - 파일 이름으로 찾기 |
| 내용으로 찾기 | 검색 엔진에 "피타고라스" 입력 | **Grep** - 파일 내용으로 찾기 |

## 한 줄 요약

- **Glob** = "이런 **이름**의 파일 어디 있어?"
- **Grep** = "이 **단어**가 들어간 파일은?"
- **깔때기 전략** = Glob으로 범위를 좁히고 → Grep으로 정확히 찾기!

## 비교표

| 구분 | Glob | Grep |
|------|------|------|
| 검색 대상 | 파일 이름 / 경로 | 파일 내용 (텍스트) |
| 질문 예시 | "*.js 파일 찾아줘" | "TODO가 있는 줄 찾아줘" |
| 결과 | 파일 경로 목록 | 매칭된 줄 + 파일명 |
| 속도 | 매우 빠름 | 빠름 |`,

  concepts: [
    {
      id: "glob-patterns",
      title: "Glob (파일명 검색)",
      content: `## Glob이란?

**Glob**은 파일 이름이나 경로 패턴으로 파일을 찾는 도구입니다.

### 도서관 카탈로그 비유

도서관 카탈로그를 떠올려보세요:
- "수학 코너에 있는 책 **목록**을 보여주세요"
- "제목에 '미적분'이 들어간 책을 찾아주세요"

Glob도 비슷합니다:
- "src 폴더에 있는 \`.js\` 파일 **목록**을 보여줘"
- "이름에 'test'가 들어간 파일을 찾아줘"

### 핵심 파라미터

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| \`pattern\` | 필수 | 검색할 패턴 (와일드카드 사용) |
| \`path\` | 선택 | 검색할 디렉토리 |

### 와일드카드 문법

| 와일드카드 | 의미 | 예시 |
|-----------|------|------|
| \`*\` | 아무 글자나 (한 단계) | \`*.js\` → app.js, utils.js |
| \`**\` | 모든 하위 폴더 포함 | \`**/*.js\` → src/app.js, src/lib/utils.js |
| \`?\` | 글자 하나 | \`app.?s\` → app.js, app.ts |
| \`{a,b}\` | a 또는 b | \`*.{js,ts}\` → app.js, app.ts |

### 자주 쓰는 패턴

\`\`\`bash
# 모든 JavaScript 파일
**/*.js

# 테스트 파일만
**/*.test.{js,ts}

# 특정 폴더의 마크다운
docs/**/*.md

# 설정 파일들
*config*
\`\`\``
    },
    {
      id: "grep-search",
      title: "Grep (파일 내용 검색)",
      content: `## Grep이란?

**Grep**은 파일 안의 텍스트 내용을 검색하는 도구입니다.

### 검색 엔진 비유

인터넷 검색을 떠올려보세요:
- 검색창에 "피타고라스 정리"를 입력하면
- 그 단어가 들어간 **모든 웹페이지**를 찾아줍니다

Grep도 비슷합니다:
- "TODO"를 검색하면
- 그 단어가 들어간 **모든 파일의 해당 줄**을 찾아줍니다

### 핵심 파라미터

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| \`pattern\` | 필수 | 검색할 문자열 (정규식 가능) |
| \`path\` | 선택 | 검색할 디렉토리 |
| \`output_mode\` | 선택 | 출력 형식 |
| \`glob\` | 선택 | 파일 필터 (예: "*.js") |
| \`-C\` | 선택 | 매칭 줄 전후 몇 줄 표시 |

### 출력 모드 3가지

| 모드 | 설명 | 용도 |
|------|------|------|
| \`files_with_matches\` | 파일 경로만 | "어떤 파일에 있나?" |
| \`content\` | 매칭된 줄 표시 | "어떤 내용인지 보기" |
| \`count\` | 매칭 횟수 | "몇 개나 있나?" |

### 유용한 검색 예시

\`\`\`bash
# TODO 주석 찾기
pattern="TODO" output_mode="content"

# 함수 정의 찾기
pattern="function\\s+\\w+" type="js"

# 특정 import 찾기
pattern="from 'react'" glob="*.{ts,tsx}"

# console.log 찾기 (디버깅 코드 정리)
pattern="console\\.log" output_mode="count"
\`\`\``
    },
    {
      id: "funnel-strategy",
      title: "깔때기 전략 (Glob+Grep)",
      content: `## 깔때기 전략이란?

Glob과 Grep을 **순서대로 조합**해서 원하는 코드를 정확히 찾는 방법입니다.

### 깔때기 비유

모래사장에서 금을 찾는다고 생각해보세요:

\`\`\`
1단계: 큰 체로 돌을 거른다 (Glob = 파일 범위 좁히기)
   ↓
2단계: 작은 체로 모래를 거른다 (Grep = 내용 검색)
   ↓
3단계: 금만 남는다! (원하는 코드 발견)
\`\`\`

### 실전 예시

**미션:** "컴포넌트 파일에서 useState를 사용하는 곳을 찾아라"

\`\`\`
1단계 - Glob으로 범위 축소:
  pattern="**/components/*.{tsx,jsx}"
  → 컴포넌트 파일 10개 발견

2단계 - Grep으로 내용 검색:
  pattern="useState"
  glob="**/components/*.{tsx,jsx}"
  → 3개 파일에서 발견!
\`\`\`

### 왜 깔때기 전략이 좋을까?

| 방법 | 검색 범위 | 속도 | 정확도 |
|------|---------|------|--------|
| Grep만 사용 | 전체 프로젝트 | 느림 | 너무 많은 결과 |
| Glob만 사용 | 파일명만 | 빠름 | 내용 모름 |
| 깔때기 (Glob+Grep) | 좁혀진 범위 | 빠름 | 정확! |

> 핵심: **Glob으로 범위를 좁히고 → Grep으로 정확히 찾는다!**`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "Glob으로 파일 찾기",
      content: `## Glob 패턴으로 파일 검색하기

다양한 와일드카드 패턴으로 파일을 찾아보는 실습입니다.

### 목표
- Glob의 와일드카드 문법을 익힙니다
- 다양한 패턴으로 파일을 검색합니다
- 결과를 읽고 해석합니다

### 따라하기

가상의 웹 프로젝트에서 파일을 찾아봅시다.`,
      terminals: [
        {
          command: '사용자: "playground 폴더에서 모든 JavaScript 파일을 찾아줘"',
          output: `Glob: pattern="**/*.js" path="playground/"

결과 (7개 파일):
  playground/src/app.js
  playground/src/utils.js
  playground/src/components/Header.js
  playground/src/components/Footer.js
  playground/src/components/TodoItem.js
  playground/tests/app.test.js
  playground/tests/utils.test.js

→ ** 덕분에 하위 폴더까지 전부 검색했습니다!`
        },
        {
          command: '사용자: "테스트 파일만 찾아줘"',
          output: `Glob: pattern="**/*.test.js" path="playground/"

결과 (2개 파일):
  playground/tests/app.test.js
  playground/tests/utils.test.js

→ *.test.js 패턴으로 테스트 파일만 정확히 찾았습니다!`
        },
        {
          command: '사용자: "CSS와 마크다운 파일을 모두 찾아줘"',
          output: `Glob: pattern="**/*.{css,md}" path="playground/"

결과 (4개 파일):
  playground/docs/guide.md
  playground/docs/api.md
  playground/styles/main.css
  playground/styles/components.css

→ {css,md}로 여러 확장자를 한번에 검색!`
        }
      ]
    },
    {
      id: "step-02",
      title: "Grep으로 내용 검색하기",
      content: `## Grep으로 코드 안의 텍스트 검색하기

파일 안의 특정 텍스트를 찾아보는 실습입니다.

### 목표
- Grep의 기본 검색을 익힙니다
- 출력 모드(content, files_with_matches, count)를 사용합니다
- 컨텍스트(-C) 옵션을 활용합니다

### 따라하기

가상 프로젝트에서 다양한 내용을 검색해봅시다.`,
      terminals: [
        {
          command: '사용자: "TODO 주석을 모두 찾아줘"',
          output: `Grep: pattern="TODO" path="playground/" output_mode="content"

playground/src/app.js:15:    // TODO: add authentication
playground/src/app.js:28:    // TODO: add error handling
playground/src/utils.js:42:  // TODO: add timezone support
playground/src/components/TodoItem.js:8: // TODO: add drag and drop
playground/tests/app.test.js:3: // TODO: add integration tests
playground/docs/guide.md:22: <!-- TODO: add screenshots -->

→ 6개 파일에서 TODO를 발견! 줄 번호까지 표시됩니다.`
        },
        {
          command: '사용자: "TODO가 있는 파일 이름만 보여줘"',
          output: `Grep: pattern="TODO" path="playground/" output_mode="files_with_matches"

playground/src/app.js
playground/src/utils.js
playground/src/components/TodoItem.js
playground/tests/app.test.js
playground/docs/guide.md

→ files_with_matches 모드로 파일 경로만 깔끔하게!`
        },
        {
          command: '사용자: "export 키워드를 찾되, 전후 2줄도 보여줘"',
          output: `Grep: pattern="export" path="playground/src/" output_mode="content" -C=2

playground/src/utils.js:
  8:
  9:  // 날짜 포맷 유틸리티
  10: export function formatDate(date) {
  11:   return date.toLocaleDateString('ko-KR');
  12: }

→ -C=2 옵션으로 매칭 줄 전후 2줄까지 표시!
  코드의 맥락을 파악하기 좋습니다.`
        }
      ]
    },
    {
      id: "step-03",
      title: "깔때기 전략 실전",
      content: `## Glob + Grep 콤보로 정확히 찾기

깔때기 전략을 사용해서 복잡한 검색을 수행하는 실습입니다.

### 목표
- Glob으로 범위를 좁히고 Grep으로 정확히 찾는 패턴을 연습합니다
- 실전 검색 미션을 수행합니다

### 미션: "컴포넌트 파일에서 import 문을 찾아라"`,
      terminals: [
        {
          command: '1단계: Glob으로 컴포넌트 파일 찾기',
          output: `Glob: pattern="**/components/*.js" path="playground/"

결과 (3개 파일):
  playground/src/components/Header.js
  playground/src/components/Footer.js
  playground/src/components/TodoItem.js

→ 검색 범위를 3개 파일로 좁혔습니다!`
        },
        {
          command: '2단계: Grep으로 import 문 검색 (범위 제한)',
          output: `Grep: pattern="import" glob="**/components/*.js" output_mode="content"

playground/src/components/Header.js:1: import React from 'react';
playground/src/components/Header.js:2: import './header.css';
playground/src/components/Footer.js:1: import React from 'react';
playground/src/components/TodoItem.js:1: import React, { useState } from 'react';
playground/src/components/TodoItem.js:2: import './todo.css';

→ 컴포넌트 파일에서만 import를 검색!
  깔때기 전략으로 정확한 결과를 얻었습니다.`
        },
        {
          command: '보너스: JS 파일에서 console.log가 몇 개인지 세기',
          output: `Grep: pattern="console\\.log" path="playground/" type="js" output_mode="count"

playground/src/app.js: 3
playground/src/utils.js: 1
playground/tests/app.test.js: 2

→ 총 6개의 console.log 발견!
  배포 전에 정리해야 할 디버깅 코드입니다.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "search-missions",
      title: "실전 검색 미션",
      content: `## 실전에서 자주 하는 검색들

개발자가 실제로 많이 하는 검색 작업을 정리했습니다.

### 미션 1: 사용하지 않는 import 찾기

\`\`\`bash
# 1단계: 모든 import 문 찾기
Grep: pattern="^import" type="ts" output_mode="content"

# 2단계: 특정 모듈이 실제 사용되는지 확인
Grep: pattern="formatDate" type="ts" output_mode="files_with_matches"
\`\`\`

### 미션 2: 특정 API 엔드포인트를 사용하는 곳

\`\`\`bash
# /api/users를 호출하는 코드 찾기
Grep: pattern="/api/users" output_mode="content" -C=3
\`\`\`

### 미션 3: 설정 파일 모아보기

\`\`\`bash
# 모든 설정 파일 찾기
Glob: pattern="**/*config*"

# JSON 설정 파일만
Glob: pattern="**/*.config.{js,ts,json}"
\`\`\`

### 미션 4: 주석으로 남긴 할 일 정리

\`\`\`bash
# TODO, FIXME, HACK 모두 찾기
Grep: pattern="(TODO|FIXME|HACK)" output_mode="content"
\`\`\`

> 이런 검색들을 자유자재로 할 수 있으면, 어떤 프로젝트든 빠르게 파악할 수 있습니다!`,
      checklist: [
        "파일 이름으로 찾을 때 Glob을 사용했는가?",
        "파일 내용으로 찾을 때 Grep을 사용했는가?",
        "범위가 넓을 때 깔때기 전략(Glob+Grep)을 적용했는가?",
        "적절한 output_mode를 선택했는가? (content/files_with_matches/count)"
      ]
    },
    {
      id: "pattern-cheatsheet",
      title: "패턴 치트시트",
      content: `## Glob + Grep 패턴 모음

자주 쓰는 패턴을 모아놓은 치트시트입니다. 필요할 때 참고하세요!

### Glob 패턴

| 패턴 | 의미 | 예시 결과 |
|------|------|----------|
| \`*.js\` | 현재 폴더의 JS 파일 | app.js, utils.js |
| \`**/*.js\` | 모든 하위 폴더의 JS 파일 | src/app.js, lib/utils.js |
| \`**/*.test.*\` | 모든 테스트 파일 | app.test.js, utils.test.ts |
| \`src/**\` | src 폴더의 모든 파일 | src/app.js, src/lib/a.ts |
| \`*.{js,ts}\` | JS 또는 TS 파일 | app.js, app.ts |
| \`?pp.js\` | ?에 아무 글자 하나 | app.js |

### Grep 패턴

| 패턴 | 의미 | 매칭 예시 |
|------|------|----------|
| \`TODO\` | 정확한 문자열 | // TODO: fix this |
| \`console\\.log\` | .을 이스케이프 | console.log("hi") |
| \`function\\s+\\w+\` | 함수 선언 | function hello() |
| \`import.*from\` | import 문 | import React from 'react' |
| \`(TODO\|FIXME)\` | 둘 중 하나 | // TODO 또는 // FIXME |

> 팁: Grep은 정규표현식(regex)을 지원합니다. 특수문자(\`.{}\`)는 \`\\\`로 이스케이프하세요!`,
      checklist: [
        "Glob의 ** (모든 하위 폴더)와 * (현재 폴더만)의 차이를 이해했는가?",
        "Grep에서 특수문자를 이스케이프(\\) 처리했는가?",
        "{a,b} 패턴으로 여러 확장자를 한번에 검색할 수 있는가?"
      ]
    }
  ],

  quiz: [
    {
      question: "파일 이름으로 검색할 때 사용하는 도구는?",
      options: [
        "Grep",
        "Glob",
        "Read"
      ],
      answer: 1,
      explanation: "Glob은 파일 이름이나 경로 패턴으로 파일을 찾는 도구입니다. 도서관 카탈로그처럼 '이런 이름의 파일이 어디 있는지' 찾아줍니다."
    },
    {
      question: "Glob 패턴 **/*.js가 의미하는 것은?",
      options: [
        "현재 폴더의 JS 파일만",
        "현재 폴더와 모든 하위 폴더의 JS 파일",
        "JS 파일 2개를 찾기"
      ],
      answer: 1,
      explanation: "**는 '모든 하위 폴더를 포함'한다는 의미입니다. **/*.js는 현재 폴더뿐 아니라 모든 하위 폴더에서 .js 파일을 찾습니다."
    },
    {
      question: "프로젝트에서 TODO 주석이 몇 개인지 세려면 Grep의 어떤 옵션을 사용해야 하나요?",
      options: [
        "output_mode=\"content\"",
        "output_mode=\"files_with_matches\"",
        "output_mode=\"count\""
      ],
      answer: 2,
      explanation: "output_mode=\"count\"는 각 파일별 매칭 횟수를 보여줍니다. content는 매칭된 줄의 내용을, files_with_matches는 파일 경로만 보여줍니다."
    },
    {
      question: "깔때기 전략의 올바른 순서는?",
      options: [
        "Grep으로 내용 찾기 → Glob으로 파일 좁히기",
        "Glob으로 파일 범위 좁히기 → Grep으로 내용 찾기",
        "Read로 파일 읽기 → Glob으로 파일 찾기"
      ],
      answer: 1,
      explanation: "깔때기 전략은 Glob으로 먼저 검색 범위를 좁힌 다음, Grep으로 내용을 검색하는 순서입니다. 큰 체로 돌을 거르고 → 작은 체로 모래를 거르는 것과 같습니다."
    },
    {
      question: "Grep에서 'console.log'를 검색할 때 pattern을 어떻게 써야 하나요?",
      options: [
        "console.log (그냥 쓰면 됨)",
        "console\\.log (.을 이스케이프해야 함)",
        "\"console.log\" (따옴표로 감싸야 함)"
      ],
      answer: 1,
      explanation: "Grep은 정규표현식을 사용하는데, 정규식에서 .은 '아무 문자 하나'를 의미합니다. 실제 점(.)을 검색하려면 \\.으로 이스케이프해야 합니다. console\\.log로 써야 정확히 console.log만 찾습니다."
    }
  ]
};
