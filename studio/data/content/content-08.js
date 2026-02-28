window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["08-skills-commands"] = {
  overview: `## Skills & 커맨드 -- 나만의 명령어 만들기

게임을 할 때 **매크로**를 써본 적 있나요?
복잡한 연속 동작을 **버튼 하나**로 실행할 수 있는 기능이죠.

클로드 코드에도 이런 기능이 있습니다!

\`\`\`
게임                             클로드 코드
----                             ----------
기본 단축키: F1(도움말), F5(저장)   기본 커맨드: /help, /cost, /compact
내가 만든 매크로: Ctrl+Shift+A     커스텀 스킬: /review, /explain
\`\`\`

### 두 종류의 명령어

| 구분 | 기본 커맨드 | 커스텀 스킬 |
|------|-----------|------------|
| 비유 | 게임 기본 단축키 | 내가 만든 매크로 |
| 위치 | 클로드에 내장 | \`.claude/commands/\` 폴더 |
| 수정 | 불가 | 자유롭게 가능 |
| 예시 | /help, /cost | /review, /explain |
| 입력값 | 고정 | \$ARGUMENTS로 유연하게 |

### 핵심 포인트

- **기본 커맨드**: 클로드에 내장된 10개 명령어
- **커스텀 스킬**: \`.claude/commands/\`에 마크다운 파일로 생성
- **\$ARGUMENTS**: 실행할 때 값을 전달받는 변수
- 한 번 만들면 **/이름**으로 언제든 재사용!`,

  concepts: [
    {
      id: "builtin-commands",
      title: "기본 커맨드 10선",
      content: `### 클로드에 내장된 기본 커맨드

게임의 기본 단축키처럼, 클로드 코드에도 미리 정해진 명령어들이 있습니다.
설치하자마자 바로 쓸 수 있어요!

#### 주요 기본 커맨드

| 커맨드 | 기능 | 게임 비유 |
|--------|------|----------|
| \`/help\` | 도움말 보기 | F1 (도움말) |
| \`/cost\` | 사용량/비용 확인 | 인벤토리 (남은 자원 확인) |
| \`/compact\` | 대화 요약/압축 | 빈 칸 정리 (메모리 절약) |
| \`/clear\` | 대화 초기화 | 새 게임 시작 |
| \`/status\` | 현재 상태 확인 | 캐릭터 상태창 |
| \`/debug\` | 디버그 정보 | 개발자 콘솔 |
| \`/model\` | AI 모델 변경 | 난이도 변경 |
| \`/memory\` | 기억 관리 | 세이브 파일 |
| \`/permissions\` | 권한 설정 | 게임 설정 |
| \`/config\` | 설정 변경 | 옵션 메뉴 |

#### 사용법

터미널에서 클로드 코드 대화 중에 슬래시(\`/\`)를 입력하면 목록이 나옵니다:

\`\`\`
> /help
Claude Code v2.1.x

사용 가능한 커맨드:
  /help         도움말
  /cost         현재 세션의 토큰 사용량
  /compact      대화 내용 압축
  ...
\`\`\``
    },
    {
      id: "custom-skills",
      title: "커스텀 스킬 만들기",
      content: `### 나만의 스킬 만들기

기본 커맨드에 없는 기능이 필요하다면? **커스텀 스킬**을 만들면 됩니다!
게임 매크로를 만드는 것과 같은 원리예요.

#### 스킬 만드는 3단계

\`\`\`
1. .claude/commands/ 폴더 만들기
2. 이름.md 파일 만들기 (마크다운)
3. /이름 으로 실행!
\`\`\`

#### 첫 번째 스킬: 인사하기

\`\`\`
.claude/
  commands/
    greet.md    <-- 이 파일이 /greet 스킬이 됨!
\`\`\`

**greet.md** 내용:

\`\`\`markdown
사용자에게 친근하게 인사해주세요.
현재 시간대에 맞는 인사말을 사용하고,
오늘의 개발 팁 하나를 알려주세요.
\`\`\`

이제 클로드 코드에서 \`/greet\`를 입력하면 이 프롬프트가 자동으로 실행됩니다!

#### 파일 이름 = 커맨드 이름

| 파일 | 커맨드 |
|------|--------|
| \`greet.md\` | \`/greet\` |
| \`review.md\` | \`/review\` |
| \`explain.md\` | \`/explain\` |
| \`test-gen.md\` | \`/test-gen\` |`
    },
    {
      id: "arguments",
      title: "$ARGUMENTS로 유연한 스킬 만들기",
      content: `### $ARGUMENTS -- 스킬에 값 전달하기

게임 매크로에서 "대상 선택" 같은 입력을 받듯이,
스킬에서도 **실행할 때 값을 전달**받을 수 있습니다!

#### 비유: 자판기 버튼

\`\`\`
일반 버튼: "콜라" 누르면 -> 항상 콜라만 나옴  (고정)
특수 버튼: "음료 선택" -> 원하는 음료를 입력  ($ARGUMENTS)
\`\`\`

#### 예시: 코드 리뷰 스킬

**review.md**:

\`\`\`markdown
아래 파일을 코드 리뷰해주세요:

$ARGUMENTS

리뷰 기준:
1. 버그 가능성
2. 가독성
3. 성능
4. 개선 제안

각 항목에 심각도를 표시해주세요 (높음/중간/낮음).
\`\`\`

#### 사용법

\`\`\`
/review src/app.js
\`\`\`

이렇게 하면 \`$ARGUMENTS\` 자리에 \`src/app.js\`가 들어가서,
클로드가 해당 파일을 코드 리뷰해줍니다!

\`\`\`
/review src/utils/helper.ts
/review package.json
\`\`\`

**같은 스킬**로 **다른 파일**을 리뷰할 수 있어요!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "기본 커맨드 체험하기",
      content: `### 1단계: 기본 커맨드 사용해보기

먼저 클로드에 내장된 기본 커맨드들을 체험해봅시다.
클로드 코드를 실행한 상태에서 따라해보세요!

#### 체험할 커맨드

1. **/help** -- 사용 가능한 모든 커맨드 목록 보기
2. **/cost** -- 현재까지 사용한 토큰량 확인
3. **/compact** -- 긴 대화를 요약해서 메모리 절약

> 팁: 슬래시(/)를 입력하면 자동 완성 목록이 나옵니다!`,
      terminals: [
        {
          command: "/help",
          output: "Claude Code v2.1.x\n\nAvailable commands:\n  /help         Show help and available commands\n  /cost         Show token usage for this session\n  /compact      Compact conversation history\n  /clear        Clear conversation history\n  /status       Show current status\n  /model        Change AI model\n  /memory       Manage memory files\n  /permissions  Manage permissions\n  /config       Change settings\n  /debug        Show debug info"
        },
        {
          command: "/cost",
          output: "Session Cost Summary\n--------------------\nInput tokens:  12,450\nOutput tokens:  3,210\nTotal cost:    $0.28\nSession time:  15 minutes"
        },
        {
          command: "/compact",
          output: "Compacting conversation...\n\nBefore: 45 messages (32,000 tokens)\nAfter:  1 summary (2,100 tokens)\n\n93% 토큰 절약!"
        }
      ]
    },
    {
      id: "step-02",
      title: "첫 번째 커스텀 스킬 만들기",
      content: `### 2단계: greet 스킬 만들기

이제 직접 커스텀 스킬을 만들어봅시다!
가장 간단한 "인사하기" 스킬부터 시작해요.

#### 폴더 구조 만들기

\`\`\`
프로젝트/
  .claude/
    commands/
      greet.md    <-- 새로 만들 파일
\`\`\`

#### greet.md 작성

\`\`\`markdown
사용자에게 친근하게 한국어로 인사해주세요.

인사 규칙:
1. 현재 시간대에 맞는 인사말 (아침/점심/저녁)
2. 오늘의 개발 팁 하나
3. 응원 한 마디
\`\`\`

#### 실행하기

클로드 코드에서 \`/greet\`을 입력하면 끝!`,
      terminals: [
        {
          command: "mkdir -p .claude/commands",
          output: "# .claude/commands 폴더 생성"
        },
        {
          command: "cat .claude/commands/greet.md",
          output: "사용자에게 친근하게 한국어로 인사해주세요.\n\n인사 규칙:\n1. 현재 시간대에 맞는 인사말 (아침/점심/저녁)\n2. 오늘의 개발 팁 하나\n3. 응원 한 마디"
        },
        {
          command: "/greet",
          output: "안녕하세요! 좋은 오후입니다 :)\n\n오늘의 개발 팁:\n  변수 이름을 지을 때 'data'나 'info' 같은\n  모호한 이름 대신, 'userProfile'이나\n  'orderItems'처럼 구체적인 이름을 쓰면\n  코드가 훨씬 읽기 쉬워져요!\n\n오늘도 화이팅!"
        }
      ]
    },
    {
      id: "step-03",
      title: "$ARGUMENTS로 실용 스킬 만들기",
      content: `### 3단계: 코드 리뷰 스킬 만들기

\`$ARGUMENTS\`를 활용해서 **실전에서 쓸 수 있는 코드 리뷰 스킬**을 만들어봅시다.

#### review.md 작성

\`\`\`markdown
아래 대상을 코드 리뷰해주세요:

$ARGUMENTS

리뷰 항목:
1. [버그] 잠재적 버그나 에러 가능성
2. [가독성] 코드 읽기 쉬운 정도
3. [성능] 불필요한 연산이나 최적화 포인트
4. [보안] 보안 취약점

각 항목마다 심각도를 표시해주세요:
- 높음: 반드시 수정 필요
- 중간: 수정 권장
- 낮음: 참고 사항

마지막에 전체 평가를 한 줄로 요약해주세요.
\`\`\`

#### 다양한 사용법

\`\`\`
/review src/app.js              -- 특정 파일 리뷰
/review src/utils/               -- 폴더 전체 리뷰
/review 최근 커밋의 변경사항       -- 자연어로 대상 지정도 가능!
\`\`\``,
      terminals: [
        {
          command: "cat .claude/commands/review.md",
          output: "아래 대상을 코드 리뷰해주세요:\n\n$ARGUMENTS\n\n리뷰 항목:\n1. [버그] 잠재적 버그나 에러 가능성\n2. [가독성] 코드 읽기 쉬운 정도\n3. [성능] 불필요한 연산이나 최적화 포인트\n4. [보안] 보안 취약점\n..."
        },
        {
          command: "/review src/app.js",
          output: "코드 리뷰: src/app.js\n========================\n\n[버그] 심각도: 중간\n  - 23행: null 체크 없이 객체 접근\n  - 45행: 비동기 에러 미처리\n\n[가독성] 심각도: 낮음\n  - 전반적으로 양호\n  - 12행: 변수명 'd' -> 'userData'로 변경 권장\n\n[성능] 심각도: 낮음\n  - 특이사항 없음\n\n[보안] 심각도: 높음\n  - 38행: 사용자 입력 미검증 (XSS 위험)\n\n전체 평가: 보안 취약점 1건 수정 필요, 나머지는 양호"
        }
      ]
    }
  ],

  examples: [
    {
      id: "useful-skills",
      title: "실전 스킬 4종 모음",
      content: `### 바로 쓸 수 있는 실용 스킬 4개

#### 1. explain.md -- 코드 설명 스킬

\`\`\`markdown
다음 코드를 초보자가 이해할 수 있도록 설명해주세요:

$ARGUMENTS

설명 규칙:
- 한 줄씩 주석으로 설명
- 어려운 용어는 비유로 풀어서
- 전체 흐름을 3줄 요약
\`\`\`

사용: \`/explain src/auth.js\`

#### 2. test-gen.md -- 테스트 생성 스킬

\`\`\`markdown
다음 코드의 테스트를 작성해주세요:

$ARGUMENTS

테스트 규칙:
- 정상 케이스 2개 이상
- 에러 케이스 2개 이상
- 엣지 케이스 1개 이상
- 각 테스트에 한글 설명 주석
\`\`\`

사용: \`/test-gen src/calculator.js\`

#### 3. summarize.md -- 프로젝트 요약 스킬

\`\`\`markdown
현재 프로젝트를 분석하고 요약해주세요.

분석 대상: $ARGUMENTS

요약 형식:
1. 프로젝트 목적 (한 줄)
2. 사용 기술 스택
3. 폴더 구조 설명
4. 주요 기능 목록
5. 개선 제안 3가지
\`\`\`

사용: \`/summarize .\`

#### 4. commit-msg.md -- 커밋 메시지 생성 스킬

\`\`\`markdown
현재 git 변경사항을 분석하고 적절한 커밋 메시지를 제안해주세요.

대상: $ARGUMENTS

커밋 메시지 규칙:
- 형식: <타입>(<스코프>): <한글 설명>
- 타입: feat, fix, docs, refactor, test, chore
- 50자 이내
- 3개 후보를 제안하고 가장 적합한 것을 추천
\`\`\`

사용: \`/commit-msg staged\``,
      checklist: [
        "기본 커맨드(/help, /cost 등) 사용법을 알았다",
        ".claude/commands/ 폴더에 스킬을 만드는 방법을 알았다",
        "$ARGUMENTS로 실행 시 값을 전달하는 방법을 알았다",
        "실전에서 쓸 수 있는 스킬(review, explain 등)을 이해했다",
        "파일 이름이 커맨드 이름이 된다는 규칙을 알았다"
      ]
    },
    {
      id: "team-sharing",
      title: "팀과 스킬 공유하기",
      content: `### 팀원과 스킬 공유하는 방법

커스텀 스킬의 큰 장점 중 하나는 **팀원과 공유할 수 있다**는 것입니다!
\`.claude/commands/\` 폴더를 git에 커밋하면, 팀원도 같은 스킬을 쓸 수 있어요.

#### 공유 흐름

\`\`\`
1. 스킬 파일을 git에 추가
   git add .claude/commands/review.md

2. 커밋
   git commit -m "feat: 코드 리뷰 스킬 추가"

3. 푸시
   git push

4. 팀원이 pull 받으면 바로 /review 사용 가능!
\`\`\`

#### 프로젝트 전용 vs 개인 전용

| 위치 | 범위 | git 공유 |
|------|------|---------|
| \`프로젝트/.claude/commands/\` | 이 프로젝트만 | O (팀 공유 가능) |
| \`~/.claude/commands/\` | 모든 프로젝트 | X (나만 사용) |

> 팁: 팀 전체가 쓸 스킬은 프로젝트 폴더에, 나만 쓸 스킬은 홈 폴더에 만드세요!`,
      checklist: [
        "프로젝트 스킬과 개인 스킬의 저장 위치 차이를 안다",
        "git을 통해 팀원과 스킬을 공유하는 방법을 안다"
      ]
    }
  ],

  quiz: [
    {
      question: "커스텀 스킬 파일을 저장하는 올바른 위치는?",
      options: [
        "프로젝트 루트의 commands/ 폴더",
        ".claude/commands/ 폴더",
        ".claude/skills/ 폴더",
        "src/commands/ 폴더"
      ],
      answer: 1,
      explanation: "커스텀 스킬은 .claude/commands/ 폴더 안에 마크다운(.md) 파일로 만듭니다. 파일 이름이 곧 커맨드 이름이 됩니다. (예: review.md -> /review)"
    },
    {
      question: "$ARGUMENTS의 역할은?",
      options: [
        "스킬 파일의 이름을 지정한다",
        "스킬 실행 시 사용자가 입력한 값을 받는다",
        "기본 커맨드를 호출한다",
        "스킬의 권한을 설정한다"
      ],
      answer: 1,
      explanation: "$ARGUMENTS는 스킬 실행 시 슬래시 뒤에 입력한 값이 들어가는 자리입니다. 예: '/review src/app.js'에서 $ARGUMENTS에 'src/app.js'가 들어갑니다."
    },
    {
      question: "기본 커맨드와 커스텀 스킬의 가장 큰 차이점은?",
      options: [
        "기본 커맨드는 무료, 스킬은 유료",
        "기본 커맨드는 수정 불가, 스킬은 자유롭게 수정 가능",
        "기본 커맨드는 영어만, 스킬은 한국어만 가능"
      ],
      answer: 1,
      explanation: "기본 커맨드(/help, /cost 등)는 클로드에 내장되어 있어 수정할 수 없습니다. 반면 커스텀 스킬은 마크다운 파일이므로 원하는 대로 수정하고 새로 만들 수 있습니다."
    },
    {
      question: "게임 비유에서 커스텀 스킬에 해당하는 것은?",
      options: [
        "기본 단축키 (F1, F5)",
        "게임 매크로 (직접 만든 단축키)",
        "게임 설정 (해상도, 볼륨)"
      ],
      answer: 1,
      explanation: "커스텀 스킬은 게임의 매크로와 같습니다. 복잡한 반복 동작을 버튼 하나(슬래시 커맨드)로 실행할 수 있도록 직접 만드는 것이죠."
    },
    {
      question: "팀원과 스킬을 공유하려면 어떻게 해야 하나요?",
      options: [
        ".claude/commands/ 폴더를 메일로 보낸다",
        "스킬 파일을 git에 커밋하고 push한다",
        "클로드 코드 설정에서 '공유' 버튼을 누른다"
      ],
      answer: 1,
      explanation: ".claude/commands/ 폴더의 스킬 파일을 git에 커밋하면, 팀원이 pull 받았을 때 같은 스킬을 바로 사용할 수 있습니다. 가장 간단하고 확실한 공유 방법입니다."
    }
  ]
};
