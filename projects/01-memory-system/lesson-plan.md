# 튜터 지시서: 메모리 시스템

> 이 파일은 `/learn 01` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

CLAUDE.md 파일이 무엇이고, 어떻게 클로드의 행동을 바꾸는지 체험한다.

## 핵심 비유

"CLAUDE.md는 선생님에게 주는 쪽지야. '이 학생은 한국어로 대화해주세요'라고 쪽지를 넣어두면, 선생님이 그걸 보고 한국어로 말해주는 것처럼, 클로드도 CLAUDE.md를 보고 행동을 바꿔."

## 연습 파일

- 기본 예제: `projects/01-memory-system/examples/basic-claudemd/`
- 계층 구조 다이어그램: `projects/01-memory-system/examples/memory-hierarchy/diagram.md`

## 교육 흐름

### Step 1: CLAUDE.md가 뭔지 알아보기

1. "클로드에게 매번 같은 말을 반복해야 한다면 귀찮겠죠?"로 시작
2. CLAUDE.md의 역할을 쪽지 비유로 설명
3. 이 프로젝트의 CLAUDE.md를 Read로 실제로 읽어서 보여주기:
   - `Read projects/01-memory-system/README.md` — 메모리 시스템 전체 설명
4. "이렇게 파일에 적어두면 클로드가 매번 자동으로 읽어요"

### Step 2: 메모리 계층 구조 이해하기

1. 계층 구조 다이어그램을 Read로 읽어 보여주기:
   - `Read projects/01-memory-system/examples/memory-hierarchy/diagram.md`
2. 5가지 메모리 유형을 설명:
   - 프로젝트 메모리 (`CLAUDE.md`) — 팀 전체에 적용
   - 로컬 메모리 (`CLAUDE.local.md`) — 내 컴퓨터에만
   - 유저 메모리 (`~/.claude/CLAUDE.md`) — 모든 프로젝트에 적용
   - 자동 메모리 (`~/.claude/projects/.../MEMORY.md`) — 클로드가 자동 저장
   - 에이전트 메모리 (`.claude/agents/*.md`) — 특정 에이전트용
3. "학교에서 교칙(프로젝트) → 반 규칙(로컬) → 개인 습관(유저) 순서로 적용되는 것과 비슷해요"

### Step 3: 직접 CLAUDE.md 만들어보기

1. 사용자에게 물어보기: "간단한 CLAUDE.md를 만들어볼까요? 어떤 규칙을 넣고 싶어요?"
2. 예시 제안:
   - "항상 반말로 대화해줘"
   - "코드 설명할 때 비유를 꼭 써줘"
   - "파일 만들 때 주석을 한국어로 달아줘"
3. 사용자의 선택으로 임시 CLAUDE.md 내용을 Write로 보여주기 (실제 CLAUDE.md를 수정하지는 않음)
4. "이제 클로드가 이 프로젝트에서 작업할 때마다 이 규칙을 따르게 돼요"

### Step 4: 마무리 퀴즈

아래 퀴즈를 하나씩 내고, 사용자가 답하면 정답/오답 피드백을 주세요.

1. "CLAUDE.md와 CLAUDE.local.md의 차이는?"
   → 정답: CLAUDE.md는 git에 올라가서 팀이 공유하고, CLAUDE.local.md는 내 컴퓨터에만 있어서 개인 설정용
2. "자동 메모리(MEMORY.md)는 누가 관리해요?"
   → 정답: 클로드가 자동으로 중요한 것을 기억하고 업데이트함
3. "프로젝트 CLAUDE.md와 유저 CLAUDE.md가 충돌하면?"
   → 정답: 프로젝트(하위) 규칙이 우선 적용됨 (local-wins 원칙)

### 마무리

"축하해요! 이제 CLAUDE.md로 클로드에게 기억을 심어줄 수 있어요.
다음 추천: `/learn 02`로 파일 읽기/쓰기를 배워보세요!"
