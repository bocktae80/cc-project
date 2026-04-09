window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["21-simplify"] = {
  overview: `## /simplify — 코드 품질 자동 개선

**교정 선생님**을 생각해보세요! 작문 시험에서 글 내용은 안 바꾸고, 맞춤법과 띄어쓰기만 고쳐주는 선생님이 있잖아요?
\`/simplify\`도 마찬가지! 코드의 **기능은 그대로** 두고, **가독성과 품질만 개선**해줍니다.

### 이런 상황에서 유용해요
- **코드 리뷰 전**: "PR 올리기 전에 스타일 지적 미리 잡아줘" — /simplify로 자동 교정
- **복잡한 코드 정리**: "동작은 하는데 읽기 어려운 코드야" — 중첩/중복을 깔끔하게 개선
- **팀 컨벤션 적용**: "새 팀원 코드를 팀 스타일에 맞추고 싶어" — CLAUDE.md 규칙 기반 자동 통일

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | /simplify의 동작 원리와 5대 원칙 | 💡 개념 |
| 2 | 첫 실행, 설정 커스터마이즈, PR 전 루틴 | 🔧 실습 |
| 3 | 중첩 삼항 개선, 팀 컨벤션 자동 적용 실전 | 💻 예제 |

### 왜 필요할까?

\`\`\`
코드를 작성하다 보면...
├── 동작은 하는데 읽기 어려운 코드
├── 비슷한 코드가 여기저기 반복
├── 변수명이 a, b, c인 코드
└── if문이 5단계 중첩된 코드

  ↓ /simplify 실행!

├── 깔끔하고 읽기 쉬운 코드
├── 중복이 공통 함수로 정리
├── 의미 있는 변수명
└── 중첩이 줄어든 코드
\`\`\`

### 사용 방법

\`\`\`bash
# 대화 중 슬래시 커맨드로 실행
> /simplify

# Claude가 최근 변경된 코드를 분석하고 개선 제안
\`\`\`

### 핵심 원칙

| 원칙 | 설명 | 비유 |
|------|------|------|
| 기능 보존 | 입출력이 같아야 함 | 글 내용은 안 바꿈 |
| 가독성 우선 | 읽기 쉽게 다듬기 | 문장 구조 개선 |
| 최소 변경 | 필요한 부분만 수정 | 빨간 펜으로 딱 필요한 곳만 |`,

  concepts: [
    {
      id: "what-is-simplify",
      title: "/simplify란?",
      content: `### 교정 선생님 — 코드의 맞춤법을 고쳐줘요

\`/simplify\`는 **코드 교정 선생님**입니다.

\`\`\`
작문 시험                           코드 작성
──────────                         ──────────
내용(주장, 근거)는 유지              기능(입력→출력)은 유지
맞춤법, 띄어쓰기 교정               네이밍, 구조 개선
문장을 더 명확하게                   로직을 더 읽기 쉽게
불필요한 반복 삭제                   중복 코드 제거
\`\`\`

#### 동작 방식

\`\`\`
1. /simplify 실행
2. Claude가 최근 변경 코드를 찾음
3. 코드를 분석:
   - 중복이 있나?
   - 더 간단하게 쓸 수 있나?
   - 네이밍이 명확한가?
   - 프로젝트 컨벤션에 맞나?
4. 개선안을 diff로 보여줌
5. 사용자가 Accept/Reject 선택
\`\`\`

#### 안전성

\`\`\`
/simplify는 "안전한 교정"입니다:

  기능 변경?     X (절대 안 함)
  새 기능 추가?   X (요청 범위만)
  테스트 깨뜨림?  X (동작 보존)

→ 기존 코드가 통과하던 테스트는
  simplify 후에도 100% 통과!
\`\`\`

> **핵심**: /simplify는 "어떻게" 쓰여있는지만 바꾸고, "무엇을" 하는지는 절대 바꾸지 않아요!

> **핵심 요약**: /simplify는 코드의 기능(입출력)은 그대로 유지하면서 가독성과 품질만 개선하는 "코드 교정 선생님"입니다. 최근 변경 코드를 자동 분석하고, diff로 개선안을 보여주며, 사용자가 선택적으로 수락/거부할 수 있습니다.`
    },
    {
      id: "five-principles",
      title: "5대 원칙",
      content: `### /simplify의 5가지 개선 원칙

교정 선생님이 글을 고칠 때 기준이 있듯이, /simplify도 5가지 원칙으로 코드를 개선합니다.

#### 1. 재사용 (Reuse)

\`\`\`javascript
// Before: 같은 패턴이 3번 반복
const nameA = user.firstName + " " + user.lastName;
const nameB = member.firstName + " " + member.lastName;
const nameC = admin.firstName + " " + admin.lastName;

// After: 공통 함수로 추출
function getFullName(person) {
  return person.firstName + " " + person.lastName;
}
const nameA = getFullName(user);
const nameB = getFullName(member);
const nameC = getFullName(admin);
\`\`\`

#### 2. 품질 (Quality)

\`\`\`javascript
// Before: 의미 없는 변수명
const d = new Date();
const t = d.getTime();
const r = t % 1000;

// After: 의미 있는 변수명
const now = new Date();
const timestamp = now.getTime();
const remainder = timestamp % 1000;
\`\`\`

#### 3. 효율 (Efficiency)

\`\`\`javascript
// Before: 불필요한 중간 변수
const arr = data.filter(x => x.active);
const mapped = arr.map(x => x.name);
const result = mapped.join(", ");

// After: 체이닝
const result = data
  .filter(x => x.active)
  .map(x => x.name)
  .join(", ");
\`\`\`

#### 4. 일관성 (Consistency)

\`\`\`javascript
// Before: 스타일이 섞여있음
const getUserName = (user) => user.name;
function getAge(user) { return user.age; }
var getEmail = function(user) { return user.email; }

// After: 프로젝트 컨벤션에 맞춤 (화살표 함수)
const getUserName = (user) => user.name;
const getAge = (user) => user.age;
const getEmail = (user) => user.email;
\`\`\`

#### 5. 가독성 (Readability)

\`\`\`javascript
// Before: 중첩 3단계
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      doSomething();
    }
  }
}

// After: 얼리 리턴 (early return)
if (!user) return;
if (!user.isActive) return;
if (!user.hasPermission) return;
doSomething();
\`\`\`

> **외우기 쉬운 순서**: **재품효일가** (재사용, 품질, 효율, 일관성, 가독성)

> **핵심 요약**: /simplify는 재사용(중복 → 공통 함수), 품질(의미 있는 네이밍), 효율(불필요한 중간 변수 제거), 일관성(프로젝트 컨벤션 통일), 가독성(중첩 줄이기) 5가지 원칙으로 코드를 개선합니다.`
    },
    {
      id: "before-after",
      title: "전후 비교 (실전 예시)",
      content: `### Before vs After — 실전 코드 비교

/simplify가 실제로 어떤 변화를 만드는지 전후를 비교해봐요.

#### 예시 1: 중첩 삼항 연산자

\`\`\`javascript
// Before (읽기 어려움)
const label = status === 'active' ? '활성'
  : status === 'pending' ? '대기'
  : status === 'disabled' ? '비활성'
  : '알 수 없음';

// After (명확한 매핑)
const statusLabels = {
  active: '활성',
  pending: '대기',
  disabled: '비활성'
};
const label = statusLabels[status] ?? '알 수 없음';
\`\`\`

#### 예시 2: 긴 조건문

\`\`\`javascript
// Before (한 줄이 너무 김)
if (user.age >= 18 && user.isVerified && user.country === 'KR' && !user.isBanned && user.subscriptionType !== 'free') {
  grantAccess();
}

// After (조건을 의미 있는 변수로)
const isAdult = user.age >= 18;
const isEligible = user.isVerified && !user.isBanned;
const isKoreanPaid = user.country === 'KR' && user.subscriptionType !== 'free';

if (isAdult && isEligible && isKoreanPaid) {
  grantAccess();
}
\`\`\`

#### 예시 3: 반복 API 호출 패턴

\`\`\`javascript
// Before (에러 처리 반복)
async function getUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) { console.error(e); return null; }
}
async function getPost(id) {
  try {
    const res = await fetch(\`/api/posts/\${id}\`);
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) { console.error(e); return null; }
}

// After (공통 함수 추출)
async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  } catch (e) { console.error(e); return null; }
}
const getUser = (id) => fetchJson(\`/api/users/\${id}\`);
const getPost = (id) => fetchJson(\`/api/posts/\${id}\`);
\`\`\`

#### 변경 확인 체크리스트

\`\`\`
/simplify 후 확인할 것:
[ ] 기능이 동일한가? (테스트 통과?)
[ ] 더 읽기 쉬워졌는가?
[ ] 불필요한 변경은 없는가?
[ ] 프로젝트 스타일에 맞는가?
\`\`\`

> **핵심 요약**: /simplify 전후를 비교하면 중첩 삼항 → 객체 매핑, 긴 조건문 → 의미 있는 변수, 반복 패턴 → 공통 함수 추출 등의 개선이 이루어집니다. 변경 후에는 반드시 기능 동일성, 가독성 향상, 불필요한 변경 여부를 확인하세요.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 /simplify 실행",
      content: `### 교정 선생님 불러보기

코드를 작성한 후 /simplify를 실행해서 개선 제안을 받아봐요!

#### 목표
- /simplify 커맨드를 실행합니다
- 변경사항 diff를 확인합니다
- Accept/Reject를 선택합니다

#### 따라하기

**1단계:** 코드를 작성합니다 (일부러 복잡하게).

**2단계:** 클로드에게 /simplify를 실행합니다.

**3단계:** diff를 확인하고, 마음에 드는 변경만 수락합니다.`,
      terminals: [
        {
          command: "# 복잡한 코드를 작성",
          output: `// utils.js (일부러 복잡하게 작성한 코드)
function processData(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].active === true) {
      if (data[i].age >= 18) {
        result.push({
          name: data[i].firstName + " " + data[i].lastName,
          type: data[i].age >= 65 ? "senior" : "adult"
        });
      }
    }
  }
  return result;
}`
        },
        {
          command: "/simplify",
          output: `코드를 분석하고 개선점을 찾겠습니다...

utils.js에서 3가지 개선을 발견했습니다:

1. for 루프 → filter + map 체이닝
2. === true 불필요한 비교 제거
3. 문자열 결합 → 템플릿 리터럴

[변경사항 diff]
- function processData(data) {
-   let result = [];
-   for (let i = 0; i < data.length; i++) {
-     if (data[i].active === true) {
-       if (data[i].age >= 18) {
-         result.push({
-           name: data[i].firstName + " " + data[i].lastName,
-           type: data[i].age >= 65 ? "senior" : "adult"
-         });
-       }
-     }
-   }
-   return result;
- }
+ function processData(data) {
+   return data
+     .filter(item => item.active && item.age >= 18)
+     .map(item => ({
+       name: \`\${item.firstName} \${item.lastName}\`,
+       type: item.age >= 65 ? "senior" : "adult"
+     }));
+ }

기능은 동일하게 유지됩니다. 적용할까요?`
        }
      ]
    },
    {
      id: "step-02",
      title: "설정 커스터마이즈",
      content: `### 교정 기준을 내가 정하기

/simplify의 개선 방향을 프로젝트에 맞게 설정할 수 있어요.

#### 목표
- CLAUDE.md에 simplify 관련 규칙을 추가합니다
- 프로젝트 컨벤션에 맞는 개선을 받습니다

#### CLAUDE.md로 규칙 설정

프로젝트의 CLAUDE.md에 코드 스타일을 명시하면, /simplify가 해당 스타일에 맞춰서 개선합니다.`,
      terminals: [
        {
          command: "cat CLAUDE.md",
          output: `# 프로젝트 규칙

## 코드 스타일
- 화살표 함수 선호
- const 우선 사용 (let 최소화)
- 중첩 3단계 이상 금지 (얼리 리턴 사용)
- 템플릿 리터럴 사용 (문자열 결합 금지)
- 변수명은 camelCase, 의미 있는 이름 필수`
        },
        {
          command: "/simplify",
          output: `CLAUDE.md의 코드 스타일 규칙을 확인했습니다.
프로젝트 컨벤션에 맞춰 개선하겠습니다:

[변경 1] function → 화살표 함수
- function getTotal(items) {
+ const getTotal = (items) => {

[변경 2] let → const
- let count = items.length;
+ const count = items.length;

[변경 3] 중첩 → 얼리 리턴
- if (user) {
-   if (user.active) {
-     return user.name;
-   }
- }
+ if (!user?.active) return null;
+ return user.name;

→ CLAUDE.md 규칙에 맞춰 개선했습니다!`
        }
      ]
    },
    {
      id: "step-03",
      title: "PR 전 /simplify 루틴",
      content: `### 코드 리뷰 전 교정받기

PR(Pull Request)을 올리기 전에 /simplify를 실행하면, 코드 리뷰에서 지적받을 사항을 미리 잡을 수 있어요!

#### 워크플로우

\`\`\`
코드 작성
  ↓
/simplify 실행     ← "교정 선생님한테 먼저 검사!"
  ↓
변경사항 확인 & 수락
  ↓
git commit & push
  ↓
PR 생성
  ↓
코드 리뷰 통과!    ← 리뷰어: "깔끔하네요!"
\`\`\`

#### 팁

- **커밋 전에 실행**: 코드를 작성하고 커밋하기 직전이 가장 좋은 타이밍
- **부분 수락 가능**: 모든 제안을 수락할 필요 없음 — 마음에 드는 것만!
- **반복 실행 OK**: 한 번으로 부족하면 다시 실행해도 됨`,
      terminals: [
        {
          command: "# PR 전 루틴 예시",
          output: `$ git diff --stat
 src/auth/login.ts   | 45 ++++++++++++++++++
 src/utils/format.ts | 12 +++++
 2 files changed, 57 insertions(+)

# /simplify 실행
> /simplify

최근 변경된 2개 파일을 분석합니다...

src/auth/login.ts:
  - 중복 에러 핸들링 → 공통 함수 추출 (3곳)
  - any 타입 → 구체적 타입 (2곳)

src/utils/format.ts:
  - 변경사항 없음 (이미 깔끔!)

2개 파일에서 5건의 개선을 제안합니다.`
        },
        {
          command: "# 개선 적용 후 커밋",
          output: `$ git add -A
$ git commit -m "refactor: 로그인 코드 품질 개선"

→ /simplify 덕분에 깔끔한 코드로 PR 생성 가능!
→ 코드 리뷰에서 "스타일 관련 코멘트"가 크게 줄어듭니다.`
        }
      ]
    }
  ],

  examples: [
    {
      id: "nested-ternary",
      title: "중첩 삼항 → 깔끔한 매핑",
      content: `### 실전: 읽기 어려운 삼항 연산자 개선

#### 시나리오

주문 상태를 표시하는 코드가 삼항 연산자로 중첩되어 읽기 어렵습니다.

\`\`\`javascript
// Before: 삼항 연산자 4단 중첩 (누가 읽을 수 있을까?)
const statusText = order.status === 'pending' ? '주문 접수'
  : order.status === 'confirmed' ? '주문 확인'
  : order.status === 'shipping' ? '배송 중'
  : order.status === 'delivered' ? '배송 완료'
  : '알 수 없음';

const statusColor = order.status === 'pending' ? 'gray'
  : order.status === 'confirmed' ? 'blue'
  : order.status === 'shipping' ? 'orange'
  : order.status === 'delivered' ? 'green'
  : 'red';
\`\`\`

\`\`\`javascript
// After: 객체 매핑으로 깔끔하게
const STATUS_MAP = {
  pending:   { text: '주문 접수', color: 'gray' },
  confirmed: { text: '주문 확인', color: 'blue' },
  shipping:  { text: '배송 중',   color: 'orange' },
  delivered: { text: '배송 완료', color: 'green' }
};

const DEFAULT_STATUS = { text: '알 수 없음', color: 'red' };
const { text: statusText, color: statusColor } =
  STATUS_MAP[order.status] ?? DEFAULT_STATUS;
\`\`\`

#### 왜 더 나은가?

\`\`\`
Before:
  - 새 상태 추가 시 삼항 2곳 수정 필요
  - 실수 가능성 높음
  - 길어질수록 가독성 급락

After:
  - 새 상태 추가 시 객체에 한 줄만 추가
  - 텍스트와 색상이 함께 관리됨
  - 상태가 100개여도 구조 동일
\`\`\``,
      checklist: [
        "/simplify를 실행하면 코드 기능이 바뀌지 않는다",
        "중첩 삼항 연산자를 객체 매핑으로 개선할 수 있다",
        "개선 후에도 테스트가 통과하는지 확인한다",
        "CLAUDE.md에 코드 스타일을 명시하면 맞춤 개선을 받는다"
      ]
    },
    {
      id: "team-convention",
      title: "팀 컨벤션 자동 적용",
      content: `### 실전: 팀 스타일 가이드에 맞추기

#### 시나리오

새 팀원이 합류해서 기존 코드 스타일과 다르게 코드를 작성했습니다. /simplify로 팀 컨벤션에 맞출 수 있어요.

\`\`\`javascript
// 새 팀원의 코드 (다른 스타일)
var UserService = function() {
  var self = this;

  self.getUser = function(user_id, callback) {
    fetch('/api/users/' + user_id)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        callback(null, data);
      })
      .catch(function(error) {
        callback(error, null);
      });
  }
}
\`\`\`

\`\`\`javascript
// /simplify 후 (팀 컨벤션에 맞춤)
const userService = {
  getUser: async (userId) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
};
\`\`\`

#### 적용된 팀 규칙

\`\`\`
CLAUDE.md에 명시된 규칙:
[적용] var → const           (const 우선)
[적용] function() → =>        (화살표 함수)
[적용] user_id → userId       (camelCase)
[적용] callback → async/await (현대적 비동기)
[적용] 문자열 결합 → 템플릿    (리터럴 사용)
\`\`\`

> **팁**: CLAUDE.md에 팀 스타일 가이드를 잘 적어두면, 새 팀원의 코드도 자동으로 팀 스타일에 맞출 수 있어요!`,
      checklist: [
        "팀 컨벤션을 CLAUDE.md에 명시할 수 있다",
        "/simplify가 CLAUDE.md 규칙을 참조하여 개선한다는 것을 이해한다",
        "새 팀원의 코드를 팀 스타일에 맞출 때 활용할 수 있다",
        "PR 전에 /simplify를 습관적으로 실행하는 루틴을 이해한다"
      ]
    }
  ],

  quiz: [
    {
      question: "/simplify가 코드를 개선할 때 절대 바꾸지 않는 것은?",
      options: [
        "변수 이름",
        "코드의 기능 (입력 대비 출력)",
        "코드의 들여쓰기"
      ],
      answer: 1,
      explanation: "/simplify는 코드의 '기능'은 절대 바꾸지 않습니다. 교정 선생님이 글의 '내용'은 안 바꾸고 맞춤법만 고치듯이, 코드의 동작은 그대로 유지하면서 가독성과 품질만 개선해요."
    },
    {
      question: "/simplify의 5대 원칙이 아닌 것은?",
      options: [
        "재사용 (중복 코드 공통 함수 추출)",
        "성능 최적화 (실행 속도 2배 향상)",
        "가독성 (중첩 줄이기, 의미 명확하게)"
      ],
      answer: 1,
      explanation: "/simplify의 5대 원칙은 재사용, 품질, 효율, 일관성, 가독성입니다. '성능 최적화'는 별도의 작업이에요. /simplify는 불필요한 연산을 줄이는 '효율'은 다루지만, 알고리즘 수준의 성능 최적화는 범위 밖입니다."
    },
    {
      question: "/simplify를 실행하기 가장 좋은 타이밍은?",
      options: [
        "프로젝트를 처음 시작할 때",
        "코드를 작성하고, PR을 올리기 직전",
        "배포 후 버그가 발견되었을 때"
      ],
      answer: 1,
      explanation: "코드를 작성하고 PR을 올리기 직전이 가장 좋은 타이밍이에요. 코드 리뷰에서 스타일 관련 지적을 미리 잡을 수 있거든요. 마치 작문 시험에서 제출 전에 한 번 더 검사하는 것과 같아요."
    },
    {
      question: "/simplify가 CLAUDE.md를 참조하는 이유는?",
      options: [
        "CLAUDE.md가 없으면 /simplify가 작동하지 않기 때문에",
        "프로젝트의 코드 스타일 규칙에 맞춰서 개선하기 위해",
        "CLAUDE.md에 /simplify 설정이 저장되기 때문에"
      ],
      answer: 1,
      explanation: "/simplify는 CLAUDE.md에 명시된 코드 스타일 규칙을 읽고, 해당 규칙에 맞춰서 코드를 개선합니다. CLAUDE.md가 없어도 동작하지만, 있으면 팀 컨벤션에 맞는 더 정확한 개선을 받을 수 있어요."
    },
    {
      question: "/simplify의 변경 제안에 대해 올바른 설명은?",
      options: [
        "모든 제안을 반드시 수락해야 한다",
        "마음에 드는 변경만 선택적으로 수락(Accept)하고, 나머지는 거부(Reject)할 수 있다",
        "한 번 수락하면 되돌릴 수 없다"
      ],
      answer: 1,
      explanation: "/simplify의 변경 제안은 선택적으로 수락/거부할 수 있어요. 교정 선생님의 빨간 펜 표시 중 마음에 드는 것만 반영하는 것과 같습니다. git으로 되돌리기도 가능해요."
    }
  ]
};
