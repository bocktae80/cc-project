window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["02-file-operations"] = {
  overview: `# 파일 읽기/쓰기

클로드 코드는 파일을 직접 읽고, 만들고, 고칠 수 있습니다. 이것은 프로그래밍에서 가장 기본적이면서도 중요한 작업이에요.

## 도서관 사서 비유

클로드 코드의 파일 도구를 **도서관 사서**에 비유하면 이해가 쉬워요:

| 도구 | 사서가 하는 일 | 한 줄 설명 |
|------|---------------|-----------|
| **Read** | 책을 꺼내서 읽어주기 | "이 파일 내용 보여줘" |
| **Write** | 새 책을 만들어서 꽂기 | "이 내용으로 파일 만들어" (주의: 같은 이름이면 통째로 교체!) |
| **Edit** | 책의 오탈자만 살짝 고치기 | "이 부분만 바꿔줘" |

## 가장 중요한 차이: Write vs Edit

\`\`\`
Write = 파일 통째로 교체!
  기존 파일이 있으면 내용이 전부 사라지고 새 내용으로 바뀜
  마치 노트 전체를 새 노트로 바꾸는 것

Edit = 부분만 수정!
  old_string을 찾아서 new_string으로 교체
  노트에서 한 줄만 지우개로 지우고 다시 쓰는 것
\`\`\`

> 기억할 것: **파일 전체를 새로 쓸 때는 Write, 일부만 고칠 때는 Edit!**`,

  concepts: [
    {
      id: "read-tool",
      title: "Read (파일 읽기)",
      content: `## Read 도구란?

**Read**는 파일의 내용을 읽어오는 도구입니다. 도서관에서 **책을 빌려서 읽는 것**과 같아요.

### 핵심 특징

- 파일을 **읽기만** 합니다 (수정하지 않음)
- 100% 안전! 아무리 많이 써도 파일이 바뀌지 않아요
- 줄 번호가 자동으로 표시됩니다

### 파라미터

| 파라미터 | 필수 | 설명 | 예시 |
|----------|------|------|------|
| \`file_path\` | 필수 | 읽을 파일의 절대 경로 | \`/Users/me/app.js\` |
| \`offset\` | 선택 | 시작할 줄 번호 | \`5\` (5번째 줄부터) |
| \`limit\` | 선택 | 읽을 줄 수 | \`10\` (10줄만) |

### 사용 팁

\`\`\`
전체 파일 읽기:
  Read(file_path="/Users/me/app.js")

일부만 읽기 (5번째 줄부터 10줄):
  Read(file_path="/Users/me/app.js", offset=5, limit=10)
\`\`\`

> 큰 파일은 \`offset\`과 \`limit\`으로 필요한 부분만 읽으면 효율적이에요!

### 읽을 수 있는 파일 종류

| 종류 | 예시 |
|------|------|
| 텍스트 파일 | \`.js\`, \`.py\`, \`.md\`, \`.txt\` |
| 이미지 | \`.png\`, \`.jpg\` (시각적으로 표시) |
| PDF | \`.pdf\` (pages 파라미터로 페이지 지정) |
| 노트북 | \`.ipynb\` (Jupyter 노트북) |`
    },
    {
      id: "write-tool",
      title: "Write (파일 생성/교체)",
      content: `## Write 도구란?

**Write**는 파일을 새로 만들거나, 기존 파일을 **통째로 교체**하는 도구입니다.

### 책 교체 비유

도서관에서 낡은 책을 새 책으로 **완전히 바꿔치기**하는 것과 같아요:
- 원래 책의 내용은 사라짐
- 새 책이 그 자리에 놓임

### 파라미터

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| \`file_path\` | 필수 | 만들/덮어쓸 파일 경로 |
| \`content\` | 필수 | 파일에 쓸 내용 |

### 주의사항 (매우 중요!)

\`\`\`
같은 이름의 파일이 이미 있으면:
  기존 내용이 전부 삭제되고 새 내용으로 교체!

예: memo.txt에 "안녕하세요"가 있었는데
    Write로 "반갑습니다"를 쓰면
    → "안녕하세요"는 사라지고 "반갑습니다"만 남음!
\`\`\`

### 언제 Write를 쓸까?

| 상황 | Write 사용 |
|------|-----------|
| 새 파일 만들기 | O (가장 적합!) |
| 파일 내용 전체를 새로 쓰기 | O |
| 파일 일부만 수정 | X (Edit를 쓰세요!) |

> 팁: Write는 **새 파일 만들 때** 주로 사용하세요. 기존 파일을 수정할 때는 Edit가 더 안전합니다!`
    },
    {
      id: "edit-tool",
      title: "Edit (부분 수정)",
      content: `## Edit 도구란?

**Edit**는 파일에서 특정 부분만 찾아서 바꾸는 도구입니다. 책에서 **오탈자만 살짝 고치는 것**과 같아요.

### 연필과 지우개 비유

\`\`\`
old_string: 찾아서 지울 문자열  (지우개로 지우기)
new_string: 대신 쓸 문자열      (연필로 새로 쓰기)
\`\`\`

### 파라미터

| 파라미터 | 필수 | 설명 |
|----------|------|------|
| \`file_path\` | 필수 | 수정할 파일 경로 |
| \`old_string\` | 필수 | 바꿀 원래 문자열 |
| \`new_string\` | 필수 | 바꿀 새 문자열 |
| \`replace_all\` | 선택 | 모든 일치 항목 교체 (기본: false) |

### 핵심 규칙: old_string은 유일해야!

\`\`\`
파일 내용:
  1: 사과가 맛있다
  2: 바나나가 맛있다
  3: 사과는 빨갛다

old_string="사과" → 에러! (1줄과 3줄 모두 매칭)

해결 방법:
  1) 주변 텍스트 포함: old_string="사과가 맛있다"
  2) 모두 바꾸기: replace_all=true
\`\`\`

### Edit vs Write 선택 가이드

| 상황 | 도구 |
|------|------|
| 변수 이름 하나 바꾸기 | Edit |
| 함수 하나 수정하기 | Edit |
| 파일 전체를 새로 작성 | Write |
| import 문 하나 추가 | Edit |

> 대부분의 코드 수정은 **Edit**로 충분합니다!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "파일 읽기 실습 (Read)",
      content: `## Read 도구로 파일 읽어보기

다양한 파일을 Read 도구로 읽어보는 실습입니다.

### 목표
- Read 도구의 기본 사용법을 익힙니다
- offset과 limit 파라미터를 사용해봅니다
- 줄 번호 출력 형식을 이해합니다

### 따라하기

클로드에게 자연어로 요청하면 내부적으로 Read 도구를 사용합니다.`,
      terminals: [
        {
          command: '사용자: "package.json 파일을 읽어줘"',
          output: `📖 Read: /Users/me/my-project/package.json

     1  {
     2    "name": "my-project",
     3    "version": "1.0.0",
     4    "description": "My awesome project",
     5    "main": "index.js",
     6    "scripts": {
     7      "start": "node index.js",
     8      "test": "jest"
     9    },
    10    "dependencies": {
    11      "express": "^4.18.0"
    12    }
    13  }

→ 줄 번호가 자동으로 표시됩니다!`
        },
        {
          command: '사용자: "app.js 파일의 10번째 줄부터 5줄만 보여줘"',
          output: `📖 Read: /Users/me/my-project/app.js (offset=10, limit=5)

    10  app.get('/', (req, res) => {
    11    res.send('Hello World!');
    12  });
    13
    14  app.listen(3000, () => {

→ offset=10, limit=5로 원하는 부분만 읽었습니다!`
        }
      ]
    },
    {
      id: "step-02",
      title: "파일 만들기 실습 (Write)",
      content: `## Write 도구로 새 파일 만들기

Write 도구를 사용해서 새 파일을 생성하는 실습입니다.

### 목표
- Write 도구로 새 파일을 만듭니다
- 덮어쓰기의 위험성을 이해합니다

### 따라하기

클로드에게 새 파일을 만들어달라고 요청합니다.`,
      terminals: [
        {
          command: '사용자: "hello.js라는 파일을 만들어줘. Hello World를 출력하는 코드"',
          output: `📝 Write: /Users/me/my-project/hello.js

// Hello World를 출력하는 프로그램
console.log("Hello, World!");

✅ 파일이 생성되었습니다!`
        },
        {
          command: '사용자: "hello.js를 수정해서 이름을 입력받게 해줘"',
          output: `📝 Write: /Users/me/my-project/hello.js

// 이름을 입력받아 인사하는 프로그램
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('이름을 입력하세요: ', (name) => {
  console.log(\`안녕하세요, \${name}님!\`);
  rl.close();
});

⚠️ 주의: 이전 내용(Hello World)은 사라졌습니다!
   Write는 파일 전체를 교체합니다.`
        }
      ]
    },
    {
      id: "step-03",
      title: "파일 수정하기 실습 (Edit)",
      content: `## Edit 도구로 코드 버그 고치기

Edit 도구를 사용해서 파일의 일부분만 수정하는 실습입니다.

### 목표
- Edit 도구의 old_string → new_string 패턴을 이해합니다
- 유일한 문자열 매칭의 중요성을 경험합니다
- replace_all 옵션을 사용해봅니다

### 시나리오
app.js 파일에 버그가 있습니다. 포트 번호가 잘못되어 있어요.`,
      terminals: [
        {
          command: '사용자: "app.js에서 포트 번호를 3000에서 8080으로 바꿔줘"',
          output: `✏️ Edit: /Users/me/my-project/app.js
  old_string: "app.listen(3000"
  new_string: "app.listen(8080"

✅ 수정 완료!
   다른 코드는 그대로, 포트 번호만 바뀌었습니다.`
        },
        {
          command: '사용자: "모든 console.log를 console.warn으로 바꿔줘"',
          output: `✏️ Edit: /Users/me/my-project/app.js
  old_string: "console.log"
  new_string: "console.warn"
  replace_all: true

✅ 3개 항목이 모두 변경되었습니다!
   replace_all=true로 파일 내 모든 console.log를 한번에 교체했습니다.`
        },
        {
          command: '(실패 예시) old_string이 유일하지 않은 경우',
          output: `✏️ Edit: /Users/me/my-project/app.js
  old_string: "return"
  new_string: "return null"

❌ 에러: old_string이 파일에서 유일하지 않습니다!
   "return"이 5군데에서 발견되었습니다.

해결법:
  1. 주변 텍스트를 포함: "return res.send('ok')"
  2. 또는 replace_all: true 사용`
        }
      ]
    }
  ],

  examples: [
    {
      id: "tool-selection",
      title: "상황별 도구 선택 가이드",
      content: `## 어떤 도구를 써야 할까?

실제 개발에서 자주 만나는 상황별로 올바른 도구를 고르는 연습입니다.

### 상황 1: 설정 파일 확인

\`\`\`
"package.json에 어떤 의존성이 있는지 확인해줘"
→ Read (읽기만 하면 됨, 안전!)
\`\`\`

### 상황 2: 새 컴포넌트 만들기

\`\`\`
"Button.tsx 컴포넌트를 새로 만들어줘"
→ Write (새 파일 생성)
\`\`\`

### 상황 3: 버그 수정

\`\`\`
"app.ts 파일에서 포트 번호를 3000에서 8080으로 바꿔줘"
→ Edit (일부만 수정)
\`\`\`

### 상황 4: 설정 파일 전체 재작성

\`\`\`
"tsconfig.json을 처음부터 다시 작성해줘"
→ Write (전체 교체)
\`\`\`

### 상황 5: 변수명 일괄 변경

\`\`\`
"파일에서 모든 'userName'을 'userId'로 바꿔줘"
→ Edit (replace_all: true)
\`\`\``,
      checklist: [
        "Read는 안전하므로 먼저 파일 내용을 확인하는 데 사용했는가?",
        "Write는 새 파일 생성 또는 전체 교체에만 사용했는가?",
        "Edit의 old_string이 파일에서 유일한지 확인했는가?",
        "기존 파일 수정 시 Write 대신 Edit를 우선 고려했는가?"
      ]
    }
  ],

  quiz: [
    {
      question: "파일을 읽기만 하고 수정하지 않으려면 어떤 도구를 사용해야 하나요?",
      options: [
        "Write",
        "Edit",
        "Read"
      ],
      answer: 2,
      explanation: "Read 도구는 파일을 읽기만 하고 절대 수정하지 않습니다. 가장 안전한 도구이므로 마음껏 사용할 수 있어요."
    },
    {
      question: "이미 존재하는 파일에 Write 도구를 사용하면 어떻게 되나요?",
      options: [
        "기존 내용 뒤에 새 내용이 추가된다",
        "기존 내용이 전부 사라지고 새 내용으로 교체된다",
        "에러가 발생해서 실행되지 않는다"
      ],
      answer: 1,
      explanation: "Write 도구는 파일을 통째로 교체합니다. 기존 내용은 모두 사라지고 새 내용만 남게 됩니다. 그래서 기존 파일을 수정할 때는 Edit를 사용하는 것이 안전합니다."
    },
    {
      question: "Edit 도구의 old_string이 파일에서 2군데 이상 발견되면?",
      options: [
        "첫 번째 것만 바꾼다",
        "모두 자동으로 바꾼다",
        "에러가 발생한다 (유일하지 않아서)"
      ],
      answer: 2,
      explanation: "Edit 도구는 old_string이 파일 안에서 유일해야 정상 동작합니다. 2군데 이상이면 에러가 발생하며, 이때는 주변 텍스트를 더 포함하거나 replace_all: true를 사용해야 합니다."
    },
    {
      question: "app.js 파일에서 함수 하나의 이름만 바꾸고 싶다면 어떤 도구가 적합한가요?",
      options: [
        "Write (파일 전체를 새로 작성)",
        "Edit (해당 부분만 교체)",
        "Read (읽어서 확인만)"
      ],
      answer: 1,
      explanation: "파일의 일부분만 수정할 때는 Edit 도구가 가장 적합합니다. Write는 파일 전체를 교체하므로 불필요하게 위험하고, Read는 읽기만 가능합니다."
    },
    {
      question: "Read 도구에서 큰 파일의 50번째 줄부터 20줄만 읽으려면 어떤 파라미터를 사용하나요?",
      options: [
        "start=50, count=20",
        "offset=50, limit=20",
        "from=50, to=70"
      ],
      answer: 1,
      explanation: "Read 도구는 offset 파라미터로 시작 줄을 지정하고, limit 파라미터로 읽을 줄 수를 제한합니다. offset=50, limit=20으로 50번째 줄부터 20줄을 읽을 수 있습니다."
    }
  ]
};
