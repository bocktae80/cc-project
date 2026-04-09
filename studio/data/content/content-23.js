window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["23-ralph-loop"] = {
  overview: `## Ralph Loop — 자율 개발 루프 (커뮤니티)

**자동 조립 로봇**을 상상해보세요! 설계도(PRD)를 주면 부품(기능)을 하나씩 만들어서 조립합니다.
Ralph Loop도 마찬가지! **기획서를 주면 클로드가 알아서 기능을 하나씩 구현**해나갑니다.

### 이런 상황에서 유용해요
- **소규모 프로젝트 빌드**: "투두 앱을 처음부터 자동으로 만들어줘" — PRD 하나로 전체 구축
- **반복 구현 자동화**: "기능 8개를 순서대로 구현해야 해" — 사람 개입 없이 순차 실행
- **세션 간 진행 추적**: "어제 어디까지 했는지 기억 못 해" — progress.txt로 컨텍스트 유지

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | Ralph Loop 개념, PRD→prd.json 변환, 메모리 전략 | 💡 개념 |
| 2 | PRD 작성, prd.json 이해, 실행 흐름 체험 | 🔧 실습 |
| 3 | 웹앱 자동 구축 실전, 실패 복구 패턴 | 💻 예제 |

### Ralph Loop이란?

\`\`\`
기존 방식 (수동)                   Ralph Loop (자동)
─────────────                     ──────────────
사람: "로그인 만들어"               사람: "PRD 여기 있어"
클로드: 완료!                      클로드: 1/8 로그인 구현 중...
사람: "회원가입도 만들어"           클로드: 2/8 회원가입 구현 중...
클로드: 완료!                      클로드: 3/8 프로필 구현 중...
사람: "프로필 페이지도..."          ...
클로드: 완료!                      클로드: 8/8 모두 완료!
사람: "다음은..."

비유: 블록 하나씩 시키기           비유: 설계도 주고 로봇이 조립
\`\`\`

### 핵심 구조

\`\`\`
PRD (기획서)
  ↓ 클로드가 변환
prd.json (구조화된 기능 목록)
  ↓ ralph.sh가 실행
[기능 1] → [기능 2] → [기능 3] → ... → 완성!
  ↑
progress.txt (진행 상황 기록)
  "세션이 바뀌어도 어디까지 했는지 기억!"
\`\`\`

### 주의사항

| 항목 | 설명 |
|------|------|
| 출처 | 커뮤니티 오픈소스 (공식 기능 아님) |
| 난이도 | 고급 (CLI + 스크립트 이해 필요) |
| 적합 대상 | 작은~중간 규모 프로젝트 자동 구축 |
| 제한 | 대규모 프로젝트에는 수동 검증 필요 |`,

  concepts: [
    {
      id: "what-is-ralph",
      title: "Ralph Loop이란?",
      content: `### 자동 조립 로봇 — 설계도만 주면 알아서 만듦

Ralph Loop은 **커뮤니티에서 만든 자율 개발 도구**예요. Claude Code의 배치 모드(\`-p\`)를 활용해서 기획서(PRD)의 기능을 하나씩 자동으로 구현합니다.

#### 왜 "Ralph"인가?

\`\`\`
Ralph는 "자동 조립 로봇"의 이름이에요.
공장의 조립 로봇처럼:

1. 설계도를 읽고          → PRD (기획서)
2. 부품 목록을 확인하고    → prd.json (기능 목록)
3. 순서대로 조립하고       → ralph.sh (자동 실행)
4. 진행 상황을 기록        → progress.txt (메모리)
\`\`\`

#### 동작 원리

\`\`\`
Ralph Loop의 한 사이클:

1. progress.txt 읽기
   "어디까지 했지? 3/8까지 완료했네."

2. prd.json에서 다음 기능 찾기
   "다음은 4번: 프로필 페이지구나."

3. Claude Code 실행 (배치 모드)
   $ echo "프로필 페이지를 구현해줘..." | claude -p

4. 결과 확인 & progress.txt 갱신
   "4/8 완료!"

5. 다시 1번으로 (모든 기능 완료될 때까지)
\`\`\`

#### 공식 기능과의 차이

\`\`\`
공식 기능:
  - Claude Code CLI에 내장
  - Anthropic이 관리
  - 버전 업데이트 시 자동 반영

Ralph Loop (커뮤니티):
  - 별도 스크립트로 실행
  - 커뮤니티가 관리
  - 직접 설치/설정 필요
  - 하지만 매우 유용해서 많이 사용됨!
\`\`\`

> **핵심**: Ralph Loop은 "사람이 하나씩 시키던 일"을 "설계도 한 장으로 자동화"하는 도구예요!

> **핵심 요약**: Ralph Loop은 커뮤니티에서 만든 자율 개발 도구로, PRD(기획서)를 prd.json으로 구조화한 뒤 ralph.sh가 배치 모드(-p)로 기능을 순차 구현합니다. progress.txt로 세션 간 진행 상황을 유지하며, 공식 기능은 아니지만 널리 사용됩니다.`
    },
    {
      id: "prd-to-loop",
      title: "PRD → prd.json → 루프",
      content: `### 설계도에서 조립까지

Ralph Loop의 3단계 과정을 자세히 살펴봐요.

#### Step 1: PRD 작성 (자연어 기획서)

\`\`\`markdown
# 할 일 관리 앱 (Todo App)

## 기능 목록
1. 할 일 추가 (제목, 설명, 마감일)
2. 할 일 목록 보기 (전체, 완료, 미완료 필터)
3. 할 일 완료 체크
4. 할 일 삭제
5. 할 일 수정
6. 마감일 알림

## 기술 스택
- TypeScript + React
- SQLite (로컬 DB)
- Tailwind CSS
\`\`\`

#### Step 2: prd.json 변환 (구조화)

\`\`\`json
{
  "project": "todo-app",
  "features": [
    {
      "id": 1,
      "title": "프로젝트 초기 설정",
      "description": "TypeScript + React + Tailwind 프로젝트 생성",
      "dependencies": [],
      "status": "pending"
    },
    {
      "id": 2,
      "title": "할 일 추가 기능",
      "description": "제목, 설명, 마감일을 입력해 할 일을 추가",
      "dependencies": [1],
      "status": "pending"
    },
    {
      "id": 3,
      "title": "할 일 목록 보기",
      "description": "전체/완료/미완료 필터 지원",
      "dependencies": [2],
      "status": "pending"
    }
  ]
}
\`\`\`

#### Step 3: ralph.sh가 순차 실행

\`\`\`bash
#!/bin/bash
# ralph.sh (간략 버전)

while true; do
  # 다음 할 기능 찾기
  NEXT=$(jq '.features[] | select(.status=="pending")
    | select(all(.dependencies[];
      . as $dep | $FEATURES[] | select(.id==$dep)
      | .status=="done"))' prd.json | head -1)

  if [ -z "$NEXT" ]; then
    echo "모든 기능 완료!"
    break
  fi

  TITLE=$(echo $NEXT | jq -r '.title')
  echo "구현 중: $TITLE"

  # Claude Code 배치 실행
  echo "다음 기능을 구현해줘: $TITLE
  상세: $(echo $NEXT | jq -r '.description')
  진행 상황: $(cat progress.txt)" | claude -p

  # 진행 상황 업데이트
  echo "$TITLE 완료" >> progress.txt
done
\`\`\`

> **핵심**: PRD(자연어) → prd.json(구조화) → ralph.sh(자동 실행) 3단계!

> **핵심 요약**: Ralph Loop은 PRD(자연어 기획서) → prd.json(구조화된 기능 목록) → ralph.sh(자동 실행) 3단계로 동작합니다. prd.json의 각 feature는 id, title, description, dependencies, status 필드를 가지며, 의존성 순서대로 실행됩니다.`
    },
    {
      id: "memory-strategy",
      title: "메모리 전략 (progress.txt)",
      content: `### 일기장처럼 기록하기

Claude Code는 세션마다 컨텍스트가 리셋됩니다. Ralph Loop은 **progress.txt**로 이 문제를 해결해요!

#### 문제: 컨텍스트 리셋

\`\`\`
세션 1: "프로젝트 설정 완료!"
  ↓ (세션 종료 → 컨텍스트 사라짐!)
세션 2: "...뭘 했었지?"

→ 매번 처음부터 설명해야 하는 문제!
\`\`\`

#### 해결: progress.txt

\`\`\`
progress.txt — "로봇의 작업 일지"

[2026-03-01 14:00] Feature 1: 프로젝트 초기 설정 ✅
  - TypeScript + React 프로젝트 생성
  - Tailwind CSS 설정
  - ESLint + Prettier 설정

[2026-03-01 14:15] Feature 2: 할 일 추가 기능 ✅
  - AddTodo 컴포넌트 구현
  - SQLite DB 스키마 생성
  - API 라우트 /api/todos POST 구현

[2026-03-01 14:30] Feature 3: 진행 중...
\`\`\`

#### 새 세션이 시작되면?

\`\`\`
ralph.sh:
  1. progress.txt 읽기
     "아, 2번까지 완료했고 3번 진행 중이구나"

  2. 프롬프트에 포함
     "지금까지 진행 상황:
      Feature 1 ✅ 프로젝트 설정 완료
      Feature 2 ✅ 할 일 추가 기능 완료
      Feature 3 ← 이걸 구현해줘"

  3. Claude가 맥락을 이해하고 이어서 구현!
\`\`\`

#### progress.txt vs MEMORY.md

| 비교 | progress.txt | MEMORY.md |
|------|-------------|-----------|
| 용도 | Ralph Loop 진행 추적 | 프로젝트 전반 메모리 |
| 관리 | ralph.sh가 자동 갱신 | 클로드가 자동 갱신 |
| 내용 | 기능별 완료/미완료 | 패턴, 아키텍처, 선호 |
| 형식 | 간단한 텍스트 로그 | 마크다운 |
| 범위 | 현재 PRD 한정 | 프로젝트 전체 |

> **핵심**: progress.txt = "자동 조립 로봇의 작업 일지". 어디까지 했는지 기록해서 세션이 바뀌어도 이어갈 수 있어요!

> **핵심 요약**: progress.txt는 Ralph Loop의 "작업 일지"로, 세션이 바뀌어도 어디까지 구현했는지 기록하여 컨텍스트를 유지합니다. ralph.sh가 자동 갱신하며, 에러 정보도 기록되어 재시도 시 Claude가 다른 접근법으로 시도할 수 있습니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "PRD 작성하기",
      content: `### 설계도 그리기

Ralph Loop의 첫 단계는 PRD(기획서)를 작성하는 것입니다.

#### 목표
- 간단한 앱의 PRD를 작성합니다
- 기능을 구체적으로 나열합니다
- 의존성(순서)을 생각합니다

#### 좋은 PRD의 조건

\`\`\`
좋은 PRD:
  [O] 기능이 구체적으로 나열됨
  [O] 각 기능의 입출력이 명확
  [O] 기술 스택이 지정됨
  [O] 기능 간 순서/의존성이 표시됨

나쁜 PRD:
  [X] "좋은 앱 만들어줘" (너무 모호)
  [X] 기능 목록 없이 추상적 설명만
  [X] 기술 스택 미지정
\`\`\``,
      terminals: [
        {
          command: "# PRD 예시 — 간단한 메모 앱",
          output: `$ cat prd.md
# 메모 앱 (Memo App)

## 개요
간단한 메모를 작성하고 관리하는 웹 앱

## 기술 스택
- TypeScript + React
- localStorage (DB 대신)
- CSS Modules

## 기능 목록
1. 프로젝트 초기 설정
   - React + TypeScript 프로젝트 생성
   - 기본 폴더 구조 설정

2. 메모 작성 (Create)
   - 제목과 내용 입력 폼
   - 저장 버튼 → localStorage에 저장

3. 메모 목록 (Read)
   - 저장된 메모 카드 형태로 표시
   - 최신순 정렬

4. 메모 삭제 (Delete)
   - 각 메모 카드에 삭제 버튼
   - 확인 대화상자 표시

5. 메모 검색
   - 제목/내용으로 필터링
   - 실시간 검색 (타이핑하면 바로 필터)

## 의존성
1 → 2 → 3 → 4 → 5 (순서대로)`
        },
        {
          command: '# 클로드에게 prd.json으로 변환 요청',
          output: `$ cat prd.md | claude -p "이 PRD를 Ralph Loop용 prd.json으로 변환해줘"

{
  "project": "memo-app",
  "techStack": ["TypeScript", "React", "localStorage", "CSS Modules"],
  "features": [
    {
      "id": 1,
      "title": "프로젝트 초기 설정",
      "description": "React + TypeScript 프로젝트 생성, 폴더 구조 설정",
      "dependencies": [],
      "status": "pending"
    },
    {
      "id": 2,
      "title": "메모 작성",
      "description": "제목/내용 입력 폼, localStorage에 저장",
      "dependencies": [1],
      "status": "pending"
    },
    ...
  ]
}`
        }
      ]
    },
    {
      id: "step-02",
      title: "prd.json 이해하기",
      content: `### 설계도를 로봇이 읽을 수 있는 형태로

prd.json은 PRD를 **구조화된 JSON**으로 변환한 것입니다. 로봇(ralph.sh)이 이걸 읽고 순서대로 실행해요.

#### 목표
- prd.json의 구조를 이해합니다
- 의존성(dependencies)의 의미를 이해합니다
- 상태(status) 관리 방식을 이해합니다

#### prd.json 핵심 필드

\`\`\`
feature 객체:
├── id          순서 번호
├── title       기능 이름 (간결)
├── description 상세 설명 (클로드가 읽음)
├── dependencies  선행 기능 ID 배열
└── status      pending / in_progress / done / failed
\`\`\``,
      terminals: [
        {
          command: "# prd.json 전체 구조",
          output: `$ cat prd.json
{
  "project": "memo-app",
  "techStack": ["TypeScript", "React", "localStorage"],
  "features": [
    {
      "id": 1,
      "title": "프로젝트 초기 설정",
      "description": "React + TypeScript 프로젝트 생성",
      "dependencies": [],        ← 선행 조건 없음 (첫 번째!)
      "status": "done"           ← 완료됨
    },
    {
      "id": 2,
      "title": "메모 작성",
      "description": "제목/내용 입력 폼, localStorage 저장",
      "dependencies": [1],       ← 1번이 완료되어야 시작
      "status": "in_progress"    ← 진행 중
    },
    {
      "id": 3,
      "title": "메모 목록",
      "description": "저장된 메모를 카드 형태로 표시",
      "dependencies": [2],       ← 2번이 완료되어야 시작
      "status": "pending"        ← 대기 중
    }
  ]
}`
        },
        {
          command: "# 의존성 그래프",
          output: `의존성 시각화:

[1. 초기 설정] ──→ [2. 메모 작성] ──→ [3. 메모 목록]
                                        ↓
                                   [4. 메모 삭제]
                                        ↓
                                   [5. 메모 검색]

1이 끝나야 2 시작, 2가 끝나야 3 시작...
→ ralph.sh가 이 순서를 자동으로 따릅니다!`
        }
      ]
    },
    {
      id: "step-03",
      title: "Ralph Loop 실행 흐름",
      content: `### 로봇 시작! 조립 시작!

ralph.sh의 실행 흐름을 단계별로 따라가봐요.

#### 목표
- ralph.sh의 실행 흐름을 이해합니다
- progress.txt가 어떻게 갱신되는지 확인합니다
- 실패 시 재시도 패턴을 이해합니다

#### 실행 흐름

\`\`\`
ralph.sh 시작!
  │
  ├─ Loop 1: Feature 1 (프로젝트 설정)
  │    ├─ progress.txt 읽기 → "아무것도 없네"
  │    ├─ prd.json에서 의존성 없는 첫 기능 선택
  │    ├─ claude -p로 구현 실행
  │    ├─ progress.txt에 "Feature 1 ✅" 기록
  │    └─ prd.json 상태 → "done"
  │
  ├─ Loop 2: Feature 2 (메모 작성)
  │    ├─ progress.txt 읽기 → "Feature 1 완료"
  │    ├─ 의존성 [1] 충족 → Feature 2 선택
  │    ├─ claude -p로 구현 실행
  │    ├─ progress.txt에 "Feature 2 ✅" 기록
  │    └─ prd.json 상태 → "done"
  │
  ├─ ... (반복)
  │
  └─ 모든 기능 done → "완료!" 출력 → 종료
\`\`\``,
      terminals: [
        {
          command: "# Ralph Loop 실행 예시",
          output: `$ bash ralph.sh

=== Ralph Loop 시작 ===
프로젝트: memo-app
총 기능: 5개

[1/5] 프로젝트 초기 설정...
  → claude -p 실행 중...
  → 완료! (45초)
  → progress.txt 갱신

[2/5] 메모 작성...
  → 의존성 확인: [1] ✅
  → claude -p 실행 중...
  → 완료! (120초)
  → progress.txt 갱신

[3/5] 메모 목록...
  → 의존성 확인: [2] ✅
  → claude -p 실행 중...
  → 완료! (90초)
  → progress.txt 갱신

[4/5] 메모 삭제...
  → 의존성 확인: [3] ✅
  → claude -p 실행 중...
  → 완료! (60초)

[5/5] 메모 검색...
  → 의존성 확인: [4] ✅
  → claude -p 실행 중...
  → 완료! (80초)

=== 모든 기능 완료! ===
총 소요 시간: 6분 35초`
        },
        {
          command: "# 실패 시 재시도",
          output: `[3/5] 메모 목록...
  → claude -p 실행 중...
  → 실패! (타입 에러 발생)
  → 재시도 1/3...
  → progress.txt에 에러 기록
  → claude -p 실행 중... (에러 정보 포함)
  → 완료! (재시도 성공)

→ progress.txt에 에러 내용이 기록되어 있어서
  재시도 시 클로드가 "이전에 이런 에러가 났었구나"
  하고 다른 방법으로 시도합니다!`
        }
      ]
    }
  ],

  examples: [
    {
      id: "auto-webapp",
      title: "간단한 웹앱 자동 구축",
      content: `### 실전: 투두 앱을 Ralph Loop으로 자동 구축

#### 시나리오

투두 앱의 PRD를 작성하고 Ralph Loop으로 자동 구축합니다.

#### 전체 과정

\`\`\`
1. PRD 작성 (5분)
   └── 기능 6개 나열

2. prd.json 변환 (1분)
   └── claude -p로 자동 변환

3. ralph.sh 실행 (약 10분)
   └── 6개 기능 자동 구현

4. 결과 확인
   └── npm start로 확인!
\`\`\`

#### 결과물 구조

\`\`\`
todo-app/
├── package.json
├── tsconfig.json
├── src/
│   ├── App.tsx           ← Feature 1: 기본 레이아웃
│   ├── components/
│   │   ├── AddTodo.tsx   ← Feature 2: 할 일 추가
│   │   ├── TodoList.tsx  ← Feature 3: 목록 표시
│   │   ├── TodoItem.tsx  ← Feature 4: 완료/삭제
│   │   └── SearchBar.tsx ← Feature 5: 검색
│   ├── hooks/
│   │   └── useTodos.ts   ← Feature 6: 상태 관리
│   └── types/
│       └── todo.ts
└── progress.txt          ← 진행 기록
\`\`\`

#### 핵심 포인트

\`\`\`
사람이 한 일:
  - PRD 작성 (5분)
  - 결과 확인 (5분)

Ralph가 한 일:
  - prd.json 변환
  - 6개 기능 순차 구현
  - 타입 정의, 컴포넌트 생성, 훅 작성
  - progress.txt로 진행 추적

총 소요: 약 20분 (사람 10분 + 로봇 10분)
수동 대비: 약 2시간 작업량!
\`\`\``,
      checklist: [
        "PRD를 구체적으로 작성할 수 있다 (기능 목록, 기술 스택, 의존성)",
        "prd.json의 구조(id, title, description, dependencies, status)를 이해한다",
        "ralph.sh가 prd.json과 progress.txt를 사용하는 흐름을 이해한다",
        "Ralph Loop이 커뮤니티 도구라는 것을 인지한다"
      ]
    },
    {
      id: "failure-recovery",
      title: "실패 복구 패턴",
      content: `### 실전: 로봇이 실수하면?

자동 조립 로봇도 실수할 수 있어요. 중요한 건 **실패해도 복구할 수 있는 것**!

#### 실패 시나리오

\`\`\`
시나리오: Feature 4에서 빌드 에러 발생

[1/6] 프로젝트 설정     ✅ 성공
[2/6] 메모 작성         ✅ 성공
[3/6] 메모 목록         ✅ 성공
[4/6] 메모 삭제         ❌ 실패! (타입 에러)
[5/6] 메모 수정         ⏸ 대기 (4에 의존)
[6/6] 검색              ⏸ 대기 (5에 의존)
\`\`\`

#### 복구 전략

\`\`\`
전략 1: 자동 재시도 (ralph.sh 내장)
──────────────────────────────────
ralph.sh는 실패 시 최대 3번 재시도합니다.
재시도 시 에러 메시지를 프롬프트에 포함:

"이전 시도에서 이런 에러가 발생했어:
 TypeError: 'deleteTodo' is not a function
 이 에러를 해결하면서 Feature 4를 다시 구현해줘."

→ 에러 정보가 있어서 두 번째 시도에서
  성공 확률이 높아짐!
\`\`\`

\`\`\`
전략 2: 수동 개입
────────────────
3번 재시도 후에도 실패하면:
1. progress.txt에 에러 내용이 기록됨
2. 사람이 직접 해당 부분만 수정
3. prd.json에서 해당 기능 status를 "done"으로 변경
4. ralph.sh 재실행 → 다음 기능부터 이어서 진행!
\`\`\`

\`\`\`
전략 3: 기능 스킵
────────────────
긴급하지 않은 기능이면:
1. prd.json에서 해당 기능 status를 "skipped"로 변경
2. 의존 기능의 dependencies에서 해당 ID 제거
3. ralph.sh 재실행 → 나머지 기능 계속 진행!
\`\`\`

#### progress.txt 에러 기록

\`\`\`
# progress.txt
[2026-03-01 14:00] Feature 1: 프로젝트 설정 ✅
[2026-03-01 14:15] Feature 2: 메모 작성 ✅
[2026-03-01 14:30] Feature 3: 메모 목록 ✅
[2026-03-01 14:45] Feature 4: 메모 삭제 ❌
  ERROR: TypeError: 'deleteTodo' is not a function
  RETRY 1: 타입 정의 수정 시도
  RETRY 2: useTodos 훅에서 deleteTodo 누락 → 추가
  결과: ✅ 성공 (재시도 2회)
[2026-03-01 15:00] Feature 5: 메모 수정 ✅
\`\`\`

> **핵심**: Ralph Loop의 강점은 "실패해도 progress.txt 덕분에 어디서 실패했는지 알고, 그 지점부터 다시 시작할 수 있다"는 것!`,
      checklist: [
        "Ralph Loop 실패 시 자동 재시도(최대 3번) 패턴을 이해한다",
        "progress.txt에 에러가 기록되어 재시도 시 활용되는 것을 안다",
        "수동 개입으로 특정 기능만 수정 후 이어서 실행할 수 있다",
        "기능 스킵으로 비핵심 기능을 건너뛸 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "Ralph Loop에서 사람이 하는 가장 중요한 일은?",
      options: [
        "코드를 직접 작성하는 것",
        "PRD(기획서)를 구체적으로 작성하는 것",
        "매 기능마다 코드를 리뷰하는 것"
      ],
      answer: 1,
      explanation: "Ralph Loop에서 사람의 핵심 역할은 좋은 PRD를 작성하는 것입니다. 설계도가 구체적일수록 로봇(Ralph)이 정확하게 구현할 수 있어요. '자동 조립 로봇에게 좋은 설계도를 주는 것'이 가장 중요합니다."
    },
    {
      question: "progress.txt의 역할은?",
      options: [
        "코드를 백업하는 파일",
        "세션이 바뀌어도 어디까지 구현했는지 기록하여 컨텍스트를 유지하는 것",
        "사용자에게 보고서를 보여주는 파일"
      ],
      answer: 1,
      explanation: "progress.txt는 '로봇의 작업 일지'입니다. Claude Code는 세션마다 컨텍스트가 리셋되지만, progress.txt에 진행 상황이 기록되어 있어서 새 세션에서도 이어서 작업할 수 있어요."
    },
    {
      question: "prd.json에서 dependencies 필드의 의미는?",
      options: [
        "npm 패키지 의존성 목록",
        "해당 기능을 시작하기 전에 완료되어야 하는 선행 기능의 ID 목록",
        "기능 구현에 필요한 파일 목록"
      ],
      answer: 1,
      explanation: "dependencies는 '이 기능을 시작하려면 먼저 완료되어야 하는 기능'의 ID 목록입니다. 예를 들어 dependencies: [1, 2]이면 1번과 2번 기능이 모두 완료된 후에야 이 기능을 시작합니다."
    },
    {
      question: "Ralph Loop 실행 중 기능 구현이 실패하면?",
      options: [
        "전체 프로젝트를 처음부터 다시 시작한다",
        "최대 3번 재시도하고, 이전 에러 정보를 포함해서 다시 시도한다",
        "실패한 기능을 건너뛰고 다음 기능으로 진행한다"
      ],
      answer: 1,
      explanation: "Ralph Loop은 실패 시 최대 3번 재시도합니다. 재시도 시 이전 에러 메시지를 프롬프트에 포함시켜서 Claude가 다른 방법으로 시도하게 합니다. 3번 다 실패하면 사람이 개입하거나 스킵할 수 있어요."
    },
    {
      question: "Ralph Loop에 대한 올바른 설명은?",
      options: [
        "Claude Code의 공식 내장 기능이다",
        "커뮤니티 오픈소스 프로젝트로, Claude Code의 배치 모드(-p)를 활용한 자동화 도구이다",
        "Anthropic이 유료로 판매하는 서비스이다"
      ],
      answer: 1,
      explanation: "Ralph Loop은 커뮤니티에서 만든 오픈소스 프로젝트입니다. Claude Code의 -p(파이프) 모드를 활용해서 PRD 기반 자동 구현을 실현합니다. 공식 기능은 아니지만 매우 유용해서 널리 사용되고 있어요."
    }
  ]
};
