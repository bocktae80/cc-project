# 튜터 지시서: Agent Teams

> 이 파일은 `/learn 05` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

여러 AI 에이전트가 팀으로 협력하는 구조를 이해하고, 핵심 개념을 체험한다.

## 핵심 비유

"학교에서 모둠 활동할 때처럼! 반장(팀 리더)이 할 일을 나누고, 각자 맡은 파트를 하고, 쪽지(메시지)로 소통하는 거예요. Agent Teams도 똑같아요!"

## 연습 파일

- 개념 설명: `projects/05-agent-teams/concepts/overview.md`
- 비교표: `projects/05-agent-teams/concepts/vs-subagent.md`
- 아키텍처: `projects/05-agent-teams/concepts/architecture.md`
- 튜토리얼 Step 1~6: `projects/05-agent-teams/tutorial/`
- 도구 레퍼런스: `projects/05-agent-teams/reference/tool-api.md`

## 교육 흐름

### Step 1: Agent Teams 이해하기

1. "클로드 한 명이 다 하면 오래 걸리는 큰 작업이 있어요. 그럴 때 팀을 만들면 어때요?"
2. 4가지 핵심 개념 설명 (overview.md를 Read로 읽어 참고):
   - **Team**: 팀 생성 (TeamCreate)
   - **Agent**: 팀원 (Task 도구로 생성)
   - **Task**: 할 일 관리 (TaskCreate/TaskUpdate)
   - **Message**: 소통 (SendMessage)
3. "모둠 활동이랑 같아요: 팀 만들기 → 역할 나누기 → 할 일 정하기 → 소통하기"

### Step 2: 서브에이전트 vs Agent Teams 비교

1. vs-subagent.md를 Read로 읽어 참고
2. 비교 설명:
   - **서브에이전트** (Task 도구): 일꾼에게 심부름 하나 시키고 결과 받기
   - **Agent Teams**: 팀을 만들어 여러 명이 동시에 일하고 소통
3. "심부름은 혼자 갔다 오는 거고, 팀은 같이 일하면서 대화하는 거예요"

### Step 3: 핵심 도구 이해 (개념 설명 — 실행은 데모만)

1. 이 기능은 실험적이라 토큰을 많이 사용한다고 안내
2. 핵심 도구 4개를 **개념적으로** 설명:
   - `TeamCreate` → 팀 만들기 (team_name, description)
   - `TaskCreate` → 할 일 만들기 (subject, description)
   - `SendMessage` → 메시지 보내기 (recipient, content, type)
   - `TaskUpdate` → 상태 변경 (taskId, status)
3. tutorial 폴더의 step-02~04를 Read로 읽어 핵심 내용 안내
4. **주의**: 실제 팀을 생성하지 않고 개념만 설명 (토큰 절약). "직접 해보고 싶으면 tutorial 폴더의 가이드를 따라가면 돼요!"

### Step 4: 실전 시나리오 살펴보기

1. Todo 웹앱 시나리오 소개 (scenarios/todo-webapp/README.md를 Read):
   - 디자이너, 프론트엔드, 백엔드 역할 분담
   - 태스크 의존성 (백엔드 완성 → 프론트엔드 연동)
   - 메시지로 상태 공유
2. "실제 프로젝트에서 이렇게 팀을 꾸리면 혼자 할 때보다 빠르게 끝낼 수 있어요"

### Step 5: 마무리 퀴즈

1. "Agent Teams의 4가지 핵심 개념은?"
   → 정답: Team(팀), Agent(팀원), Task(할 일), Message(메시지)
2. "서브에이전트와 Agent Teams의 차이는?"
   → 정답: 서브에이전트는 1:1 심부름, Agent Teams는 다대다 협업
3. "Agent Teams를 쓰려면 어떤 환경변수가 필요해요?"
   → 정답: CLAUDE_AGENT_TEAMS=1 (아직 실험 기능이라 활성화 필요)

### 마무리

"Agent Teams는 클로드 코드의 가장 강력한 기능 중 하나예요! 복잡한 프로젝트에서 진짜 힘을 발휘하죠.
다음 추천: `/learn 06`으로 Hooks를 배우거나, `/learn 07`로 MCP 서버를 배워보세요!"
