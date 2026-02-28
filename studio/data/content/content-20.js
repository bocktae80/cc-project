window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["20-ide-integration"] = {
  overview: `## IDE 통합 — 익숙한 편집기에서 클로드 사용하기

**게임 컨트롤러**를 생각해보세요! 같은 게임이라도 키보드, 게임패드, 조이스틱 중 편한 걸로 플레이하잖아요?
클로드 코드도 마찬가지! 터미널, VS Code, Cursor, JetBrains 중 **내가 편한 환경**에서 그대로 사용할 수 있어요.

### CLI vs IDE 통합

\`\`\`
CLI (터미널)                        IDE 통합 (VS Code 등)
────────────                       ──────────────────────
텍스트만 보이는 검은 화면              코드 옆에 나란히 대화
명령어로 조작                        버튼 클릭으로 조작
스크립트 자동화에 강함                 시각적으로 편리
어디서든 사용 가능                    IDE 안에서만 사용

비유: 키보드 게이머                   비유: 게임패드 게이머
\`\`\`

### 지원하는 IDE

| IDE | 통합 방식 | 특징 |
|-----|----------|------|
| VS Code | 공식 확장 기능 | 네이티브 사이드바, @-mention, 멀티탭 |
| Cursor | 내장 Agent | AI 네이티브 IDE, Agent 모드 |
| JetBrains | 터미널 통합 | IntelliJ, WebStorm, PyCharm 등 |
| Vim/Neovim | 터미널 내장 | :terminal에서 실행 |`,

  concepts: [
    {
      id: "cli-vs-ide",
      title: "CLI vs IDE 통합 (각각의 장단점)",
      content: `### 키보드 vs 게임패드 — 뭐가 더 좋을까?

정답은 "둘 다 좋다!" 상황에 따라 다를 뿐이에요.

\`\`\`
CLI (터미널)
──────────
[검은 화면에 텍스트]

> 이 프로젝트를 분석해줘
Claude: 분석 결과...
> 파일을 수정해줘
Claude: 수정 완료!

장점:                              단점:
- 가볍고 빠름                       - 코드를 직접 보기 어려움
- 스크립트/자동화                    - diff를 텍스트로만 확인
- 서버에서도 사용 가능                - 여러 파일 비교 불편
- 파이프라인 연결 가능
\`\`\`

\`\`\`
IDE 통합 (VS Code)
──────────────────
[코드 편집기]  |  [Claude 패널]
  index.ts    |  > 이 파일 분석해줘
  Line 1      |  Claude: 분석 결과...
  Line 2      |
  Line 3      |  [diff 미리보기]
              |  - old code
              |  + new code

장점:                              단점:
- 코드와 나란히 대화                 - IDE 필요
- 인라인 diff 미리보기               - 약간 무거움
- @-mention으로 파일 참조            - 자동화가 CLI보다 어려움
- 클릭으로 수정 적용
\`\`\`

#### 상황별 추천

\`\`\`
어떤 환경을 쓸까?
├── 서버에서 작업 (SSH)?
│   └── CLI (터미널)
├── 코드를 보면서 대화하고 싶다?
│   └── VS Code / Cursor
├── 자동화 스크립트를 만들고 싶다?
│   └── CLI (파이프라인)
├── AI가 코드를 직접 짜주길 원한다?
│   └── Cursor (Agent 모드)
└── Java/Python 전문 IDE를 쓴다?
    └── JetBrains + 터미널
\`\`\`

> **결론**: 하나만 고를 필요 없어요! CLI로 자동화하고, VS Code로 코딩하고, 상황에 맞게 전환하세요.`
    },
    {
      id: "vscode-extension",
      title: "VS Code 확장 기능 (네이티브 UI, 멀티탭)",
      content: `### VS Code에서 클로드와 나란히 작업하기

VS Code 확장 기능을 설치하면, 코드 편집기 옆에서 바로 클로드와 대화할 수 있어요.

\`\`\`
VS Code 화면 구조
─────────────────────────────────────────
[파일 탐색기] | [코드 편집기]    | [Claude 패널]
              |                 |
  src/        |  function foo() | > @index.ts의
    index.ts  |    return 42;   |   foo 함수를
    utils.ts  |  }              |   개선해줘
  tests/      |                 |
    test.ts   |  function bar() | Claude:
              |    // TODO      | 다음과 같이
              |  }              | 개선하겠습니다...
              |                 |
              |  [인라인 diff]   | [적용] [취소]
─────────────────────────────────────────
\`\`\`

#### 핵심 기능

**1. 네이티브 사이드바**
\`\`\`
코드 편집기 오른쪽에 Claude 패널이 표시됨
-> 코드를 보면서 동시에 대화 가능
-> 드래그로 패널 크기 조절
\`\`\`

**2. 멀티탭 대화**
\`\`\`
[탭 1: 리팩토링]  [탭 2: 버그 수정]  [탭 3: 문서화]

여러 주제를 동시에 진행 가능!
탭 1에서 리팩토링 논의하다가
탭 2로 전환해서 버그 수정 요청
\`\`\`

**3. @-mention (파일/코드 참조)**
\`\`\`
@파일명              특정 파일을 참조
@파일명:라인번호     특정 라인을 참조
#심볼명             함수/클래스 참조

예시:
"@src/utils.ts의 formatDate 함수가 느려요"
"@package.json에 lodash가 필요할까요?"
"#UserService 클래스를 리팩토링해줘"
\`\`\`

**4. 인라인 diff (변경사항 미리보기)**
\`\`\`
Claude가 코드를 수정하면:

- const result = data.map(x => x.value)  (삭제될 줄: 빨간색)
+ const result = data                     (추가될 줄: 초록색)
+   .filter(x => x.isValid)
+   .map(x => x.value)

[적용 Accept]  [거부 Reject]  (버튼으로 선택)
\`\`\`

#### 키보드 단축키

| 단축키 | 기능 |
|--------|------|
| Cmd+Shift+P -> Claude | Claude 패널 열기 |
| Cmd+L | Claude에 선택 코드 보내기 |
| Cmd+Enter | 메시지 전송 |
| Escape | 인라인 diff 닫기 |`
    },
    {
      id: "cursor-jetbrains",
      title: "Cursor & JetBrains 통합",
      content: `### 다른 IDE에서도 클로드 사용하기

VS Code 외에도 Cursor와 JetBrains IDE에서 클로드를 활용할 수 있어요.

#### Cursor — AI 네이티브 IDE

\`\`\`
Cursor = VS Code 기반 + AI 기능 내장

[코드 편집기]          [Agent 패널]
                      Claude Code를
function hello() {    에이전트로 선택 가능!
  return "world";
}                     > "hello 함수에
                        에러 처리를 추가해줘"
[Cmd+I: 인라인 편집]
[Cmd+K: Agent 대화]
\`\`\`

**Cursor의 특별한 기능:**

| 기능 | 설명 |
|------|------|
| Agent 모드 | Claude Code를 에이전트로 선택 |
| Cmd+I | 코드 위에서 바로 인라인 편집 |
| Cmd+K | AI와 대화하며 코드 생성 |
| Tab 자동완성 | AI 기반 코드 추천 |

#### JetBrains — IntelliJ, WebStorm, PyCharm

\`\`\`
JetBrains IDE에서는 터미널 탭을 이용합니다.

[코드 편집기]
  UserService.java

[터미널 탭]
$ claude
> @UserService.java를 분석해줘
Claude: 분석 중...
\`\`\`

**JetBrains 연동 방법:**

\`\`\`
1. 내장 터미널에서 claude 실행
   -> IDE 하단 Terminal 탭 클릭
   -> claude 입력

2. 외부 도구로 등록
   -> Settings > Tools > External Tools
   -> Claude Code 등록

3. 키맵 설정
   -> 자주 쓰는 작업에 단축키 할당
\`\`\`

#### 비교표

| 비교 항목 | VS Code | Cursor | JetBrains |
|-----------|:-------:|:------:|:---------:|
| Claude 통합 | 공식 확장 | Agent 모드 | 터미널 |
| @-mention | O | O | 수동 |
| 인라인 diff | O | O | X |
| 멀티탭 대화 | O | O | X |
| 인라인 편집 | O | O (Cmd+I) | X |
| 가격 | 무료 | 구독제 | 유료/무료 |

> **추천**: AI 코딩에 집중하고 싶다면 Cursor, 범용성을 원하면 VS Code,
> Java/Python 전문 기능이 필요하면 JetBrains + 터미널 조합!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "VS Code에서 Claude Code 설치 & 시작",
      content: `### 게임패드 연결하기 (VS Code 확장 설치)

VS Code에 Claude Code 확장을 설치하고 첫 대화를 시작해봐요!

#### 1단계: 확장 설치

\`\`\`
VS Code 실행
-> 왼쪽 사이드바에서 확장(Extensions) 아이콘 클릭
-> 검색창에 "Claude Code" 입력
-> "Claude Code" 공식 확장 설치
-> Reload (재시작)
\`\`\`

#### 2단계: 로그인

\`\`\`
Cmd+Shift+P (명령 팔레트)
-> "Claude: Sign In" 선택
-> 브라우저에서 로그인
-> VS Code로 돌아오면 연결 완료!
\`\`\`

#### 3단계: 첫 대화

\`\`\`
사이드바에서 Claude 아이콘 클릭
-> 채팅 패널이 열림
-> 메시지 입력: "안녕! 이 프로젝트를 분석해줘"
-> Enter로 전송
\`\`\`

#### 화면 배치 팁

\`\`\`
추천 레이아웃:
──────────────────────────────────
[파일 탐색기] | [코드 편집기] | [Claude]
   좁게        |    넓게       |  중간
──────────────────────────────────

Cmd+B: 파일 탐색기 토글
Cmd+Shift+L: Claude 패널 토글
\`\`\`

> **팁**: CLI(터미널)와 VS Code 확장을 동시에 설치해두면,
> 상황에 따라 전환하며 사용할 수 있어요!`,
      terminals: [
        {
          command: "# VS Code 확장 설치 (CLI에서도 가능)",
          output: `$ code --install-extension anthropic.claude-code
Installing extension 'anthropic.claude-code'...
Extension 'anthropic.claude-code' v1.2.3 was successfully installed.

(VS Code 재시작 후 사용 가능)`
        },
        {
          command: "# VS Code에서 Claude 패널 첫 대화",
          output: `[Claude 패널]

> 안녕! 이 프로젝트를 분석해줘

Claude: 프로젝트를 분석하겠습니다.

이 프로젝트는 TypeScript 기반의 Express.js API 서버입니다.

구조:
  src/
    index.ts      - 진입점, 서버 설정
    routes/       - API 라우트 (3개 파일)
    services/     - 비즈니스 로직
    models/       - 데이터 모델

의존성:
  - express: 4.18.2
  - typescript: 5.3.0
  - prisma: 5.7.0

추천:
  - tests/ 폴더가 비어있어요. 테스트 추가를 추천합니다.
  - .env.example 파일이 없어요. 환경 변수 가이드를 만들면 좋겠어요.`
        }
      ]
    },
    {
      id: "step-02",
      title: "@-mention으로 파일/라인 참조",
      content: `### 손가락으로 가리키기 (@-mention)

@-mention은 "이 파일을 봐줘!"라고 클로드에게 직접 가리키는 기능이에요.

#### 기본 사용법

\`\`\`
@파일명 — 파일 전체를 참조
  "이 @src/utils.ts 파일을 리뷰해줘"

@파일명:라인번호 — 특정 라인 참조
  "@src/index.ts:45 이 줄에 버그가 있는 것 같아"

#심볼명 — 함수/클래스 이름으로 참조
  "#formatDate 함수를 개선해줘"
  "#UserService 클래스에 메서드를 추가해줘"
\`\`\`

#### 실전 활용 패턴

\`\`\`
패턴 1: 버그 신고
"@src/auth/login.ts:23 이 줄에서
 비밀번호 비교가 이상한 것 같아. 수정해줘."

패턴 2: 파일 비교
"@src/old-utils.ts와 @src/new-utils.ts를
 비교해서 달라진 점을 알려줘."

패턴 3: 테스트 요청
"@src/services/user.ts에 대한
 단위 테스트를 작성해줘."

패턴 4: 리팩토링
"#calculateTotal 함수가 너무 길어.
 더 작은 함수들로 분리해줘."
\`\`\`

#### @-mention 자동완성

\`\`\`
@ 입력 시 자동완성 메뉴가 나타남:

@src/         <- 폴더/파일 자동완성
  index.ts
  utils.ts
  routes/
    users.ts

# 입력 시 심볼 자동완성:
#User         <- 심볼 자동완성
  UserService
  UserModel
  UserController
\`\`\`

> **팁**: @-mention은 클로드에게 정확한 컨텍스트를 제공해서,
> 더 정확한 답변을 받을 수 있는 핵심 기능이에요!`,
      terminals: [
        {
          command: "# @-mention 사용 예시 (VS Code 패널)",
          output: `[Claude 패널]

> @src/utils.ts의 formatDate 함수가
  한국 시간대를 처리 못해. 수정해줘.

Claude: @src/utils.ts:15의 formatDate 함수를 확인했습니다.
현재 UTC만 사용하고 있네요. KST(한국 표준시)를 추가하겠습니다.

[인라인 diff]
  src/utils.ts:
- function formatDate(date: Date): string {
-   return date.toISOString();
- }
+ function formatDate(date: Date, timezone = "Asia/Seoul"): string {
+   return date.toLocaleString("ko-KR", { timeZone: timezone });
+ }

[적용 Accept]  [거부 Reject]`
        },
        {
          command: "# 여러 파일 참조 (@-mention 조합)",
          output: `[Claude 패널]

> @src/routes/users.ts와 @src/models/user.ts를
  보고, API 응답에 비밀번호가 포함되어 있는지 확인해줘.

Claude: 두 파일을 분석했습니다.

[경고] @src/routes/users.ts:32
  res.json(user) 에서 user 객체 전체를 반환하고 있습니다.
  -> 비밀번호 필드가 포함될 수 있습니다!

수정 제안:
  const { password, ...safeUser } = user;
  res.json(safeUser);

[적용 Accept]  [거부 Reject]`
        }
      ]
    },
    {
      id: "step-03",
      title: "플랜 리뷰 & 수락 워크플로우",
      content: `### 계획 먼저, 실행은 나중에

IDE에서 Claude가 제안하는 변경사항을 **하나씩 확인하고 적용**하는 워크플로우예요.

#### 워크플로우

\`\`\`
1. 요청     "이 파일을 리팩토링해줘"
     |
     v
2. 계획     Claude: "3단계로 리팩토링하겠습니다"
     |       - Step 1: 함수 분리
     |       - Step 2: 타입 추가
     |       - Step 3: 테스트 작성
     v
3. 리뷰     [각 변경사항 diff 확인]
     |       인라인 diff로 before/after 비교
     v
4. 수락     [Accept] 또는 [Reject] 클릭
     |       부분 수락도 가능!
     v
5. 완료     수정된 코드가 편집기에 반영
\`\`\`

#### 부분 수락

\`\`\`
Claude의 변경 제안 3개:

변경 1: 함수 분리           [Accept] [Reject]
  calculateTotal()을
  calculateSubtotal() +
  calculateTax()로 분리

변경 2: 타입 추가           [Accept] [Reject]
  any -> number | string

변경 3: 변수명 변경          [Accept] [Reject]
  d -> formattedDate

-> 변경 1, 2만 수락하고, 변경 3은 거부할 수 있어요!
\`\`\`

#### Plan mode + IDE

\`\`\`
Plan mode를 켜면 더 안전합니다:

1. Claude가 계획을 세움 (파일 수정 없음)
2. 계획을 리뷰
3. 승인하면 실행 시작
4. 각 변경사항마다 diff 확인
5. 하나씩 수락/거부

"설계도를 먼저 보고, 괜찮으면 시공 시작!"
\`\`\`

#### VS Code diff 활용

\`\`\`
변경사항을 더 자세히 보고 싶을 때:

1. diff 뷰에서 줄 단위로 확인
2. 변경된 부분만 하이라이트
3. 인라인 코멘트로 피드백 가능
4. Undo (Cmd+Z)로 되돌리기 가능
\`\`\`

> **핵심**: IDE의 diff 미리보기 덕분에, 코드가 어떻게 바뀌는지
> 정확히 확인한 후 적용할 수 있어요. CLI보다 시각적으로 편리합니다!`,
      terminals: [
        {
          command: "# Plan mode로 안전하게 작업 (VS Code)",
          output: `[Claude 패널]

> Plan mode로 src/services/ 폴더를 리팩토링해줘

Claude: 리팩토링 계획을 세우겠습니다. (실행하지 않음)

=== 리팩토링 계획 ===

Step 1: user-service.ts
  - calculateAge() 함수를 별도 유틸로 분리
  - any 타입 3곳을 구체적 타입으로 변경

Step 2: order-service.ts
  - 중복 코드 2곳을 공통 함수로 추출
  - 에러 처리 패턴 통일

Step 3: tests/
  - 변경된 함수에 대한 테스트 추가 (8개)

이 계획을 실행할까요?
[승인 Approve]  [수정 요청]  [취소 Cancel]`
        },
        {
          command: "# 부분 수락 예시",
          output: `[승인 후 실행 중...]

변경 1/5: user-service.ts - calculateAge 분리
  - function getUser(id: string) {
  -   const age = new Date().getFullYear() - user.birthYear;
  -   ...
  - }
  + import { calculateAge } from './utils/date';
  + function getUser(id: string) {
  +   const age = calculateAge(user.birthYear);
  +   ...
  + }
  [Accept]  [Reject]  <- Accept 클릭!

변경 2/5: user-service.ts - any 타입 수정
  - function processData(data: any): any {
  + function processData(data: UserData): ProcessedResult {
  [Accept]  [Reject]  <- Accept 클릭!

변경 3/5: user-service.ts - 변수명 변경
  - const r = await fetch(url);
  + const response = await fetch(url);
  [Accept]  [Reject]  <- Reject (이건 나중에)

적용 완료! 2/3 변경사항 적용됨.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "vscode-bugfix",
      title: "VS Code에서 버그 수정 워크플로우",
      content: `### 실전: 코드 보면서 버그 잡기

VS Code에서 Claude와 함께 버그를 찾고 수정하는 전체 과정이에요.

#### 시나리오: API 응답이 느린 버그

\`\`\`
상황:
  /api/users 엔드포인트가 3초나 걸림
  원인을 찾고 수정해야 함
\`\`\`

#### 워크플로우

\`\`\`
1. 증상 설명
   > "API /api/users 응답이 3초 넘게 걸려.
      @src/routes/users.ts를 분석해줘."

2. Claude 분석
   > "Line 15에서 N+1 쿼리 문제가 보입니다.
      각 유저마다 별도 DB 쿼리를 날리고 있어요."

3. 수정 제안 확인 (인라인 diff)
   - const users = await db.users.findMany();
   - for (const user of users) {
   -   user.posts = await db.posts.findMany({ userId: user.id });
   - }
   + const users = await db.users.findMany({
   +   include: { posts: true }
   + });

4. diff 확인 후 [Accept] 클릭

5. 결과 테스트
   > "@src/routes/users.ts 수정 후
      테스트를 실행해줘."
   > "응답 시간이 200ms로 개선됐어요!"
\`\`\`

#### 핵심 패턴

\`\`\`bash
# 버그 발견
> "@에러_파일:라인번호에서 문제가 있어"

# 원인 분석 요청
> "이 파일을 분석하고 느린 원인을 찾아줘"

# 수정 확인
> [인라인 diff로 변경사항 확인]
> [Accept/Reject 선택]

# 검증
> "수정 후 테스트 실행해줘"
\`\`\`

> **팁**: @-mention으로 정확한 위치를 알려주면 Claude가 더 빠르게 원인을 찾아요!`,
      checklist: [
        "VS Code에서 Claude 패널을 열고 대화할 수 있다",
        "@-mention으로 특정 파일과 라인을 참조할 수 있다",
        "인라인 diff로 변경사항을 확인하고 수락/거부할 수 있다",
        "버그 신고 -> 분석 -> 수정 -> 검증 워크플로우를 실행할 수 있다"
      ]
    },
    {
      id: "cursor-codegen",
      title: "Cursor에서 코드 생성 워크플로우",
      content: `### 실전: AI 네이티브 IDE로 코드 생성

Cursor의 Agent 모드를 활용해서 코드를 생성하는 전체 과정이에요.

#### 시나리오: REST API 엔드포인트 추가

\`\`\`
요청:
  /api/products CRUD 엔드포인트를 만들어줘
  - GET /api/products (목록)
  - POST /api/products (생성)
  - GET /api/products/:id (상세)
  - PUT /api/products/:id (수정)
  - DELETE /api/products/:id (삭제)
\`\`\`

#### Cursor Agent 모드 워크플로우

\`\`\`
1. Agent 탭 열기 (Cmd+K)
   > "products CRUD API를 만들어줘.
      기존 @src/routes/users.ts 패턴을 따라줘."

2. Claude가 파일 생성/수정 계획 제시
   - 새 파일: src/routes/products.ts
   - 새 파일: src/models/product.ts
   - 수정: src/index.ts (라우트 등록)
   - 새 파일: tests/products.test.ts

3. 각 파일 생성 과정을 실시간 확인
   [코드가 생성되는 것을 편집기에서 바로 확인]

4. 자동 생성된 코드 리뷰
   [인라인 diff로 변경사항 확인]

5. 테스트 실행
   > "생성된 코드의 테스트를 실행해줘"
\`\`\`

#### Cursor vs VS Code 비교

\`\`\`
같은 작업, 다른 경험:

VS Code:
  1. Claude 패널에서 요청
  2. 응답에서 코드 복사
  3. 파일에 붙여넣기
  4. diff 확인 후 적용

Cursor Agent:
  1. Agent에게 요청
  2. Agent가 직접 파일 생성/수정
  3. 변경사항 자동 적용
  4. 리뷰만 하면 됨

-> Cursor가 한 단계 더 자동화!
\`\`\`

#### 인라인 편집 (Cmd+I)

\`\`\`
코드의 특정 부분을 선택한 후:

1. 코드 블록 드래그로 선택
2. Cmd+I 누르기
3. "이 코드에 에러 처리를 추가해줘" 입력
4. 선택한 부분만 인라인으로 수정됨!

[선택 전]
const data = await fetch(url);
const json = await data.json();

[Cmd+I: "에러 처리 추가해줘"]

[선택 후]
try {
  const data = await fetch(url);
  if (!data.ok) throw new Error('API error');
  const json = await data.json();
} catch (error) {
  console.error('Fetch failed:', error);
  throw error;
}
\`\`\`

> **팁**: 기존 @src/routes/ 패턴을 참조하면, Claude가 일관된 스타일로 코드를 생성해요!`,
      checklist: [
        "Cursor의 Agent 모드에서 Claude Code를 사용할 수 있다",
        "Cmd+I로 인라인 편집을 할 수 있다",
        "기존 코드 패턴을 @-mention으로 참조하여 일관된 코드를 생성할 수 있다",
        "VS Code와 Cursor의 차이를 이해한다"
      ]
    }
  ],

  quiz: [
    {
      question: "CLI와 IDE 통합의 가장 큰 차이는?",
      options: [
        "CLI가 더 강력한 기능을 제공한다",
        "CLI는 터미널에서 텍스트로, IDE는 코드 편집기 옆에서 시각적으로 작업한다",
        "IDE 통합은 유료 기능이다"
      ],
      answer: 1,
      explanation: "CLI는 터미널에서 텍스트 기반으로 작업하고, IDE 통합은 코드 편집기 옆에서 시각적으로 대화하며 인라인 diff로 변경사항을 확인할 수 있어요. 기능적으로는 동일합니다."
    },
    {
      question: "VS Code에서 @-mention의 역할은?",
      options: [
        "다른 사용자를 태그하는 기능",
        "특정 파일이나 코드 라인을 Claude에게 직접 참조시키는 기능",
        "확장 기능을 검색하는 기능"
      ],
      answer: 1,
      explanation: "@-mention은 대화 중에 특정 파일(@파일명)이나 라인(@파일:번호)을 Claude에게 직접 가리켜서 정확한 컨텍스트를 제공하는 기능이에요. 손가락으로 가리키는 것과 같아요."
    },
    {
      question: "인라인 diff 미리보기의 장점은?",
      options: [
        "코드를 자동으로 수정해준다",
        "코드가 어떻게 바뀌는지 적용 전에 정확히 확인하고 선택적으로 수락할 수 있다",
        "코드의 실행 속도를 미리 측정해준다"
      ],
      answer: 1,
      explanation: "인라인 diff는 코드의 변경사항(삭제될 줄은 빨간색, 추가될 줄은 초록색)을 보여주고, Accept/Reject 버튼으로 선택적으로 적용할 수 있어요."
    },
    {
      question: "Cursor의 Agent 모드가 VS Code와 다른 점은?",
      options: [
        "Cursor에서만 Claude를 사용할 수 있다",
        "Agent가 직접 파일을 생성/수정하므로, 복사-붙여넣기 없이 코드가 자동 적용된다",
        "Cursor가 더 저렴하다"
      ],
      answer: 1,
      explanation: "Cursor의 Agent 모드에서는 Claude가 직접 파일을 생성하고 수정합니다. VS Code에서는 응답을 확인하고 적용하는 과정이 필요하지만, Cursor는 한 단계 더 자동화되어 있어요."
    },
    {
      question: "서버(SSH)에서 작업할 때 가장 적합한 환경은?",
      options: [
        "VS Code",
        "Cursor",
        "CLI (터미널)"
      ],
      answer: 2,
      explanation: "SSH로 원격 서버에 접속할 때는 GUI가 없으므로 CLI(터미널)이 가장 적합합니다. 터미널에서 claude 명령으로 바로 시작할 수 있어요."
    }
  ]
};
