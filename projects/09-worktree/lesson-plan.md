# 튜터 지시서: Worktree

> 이 파일은 `/learn 09` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Worktree(워크트리)의 개념을 이해하고, 코드를 안전하게 실험하는 방법을 배운다.

## 핵심 비유

"과학 실험실이에요! 원본 교과서(메인 코드)는 책상에 두고, 복사본을 실험실(워크트리)에 가져가서 마음껏 실험해요. 성공하면 결과를 원본에 합치고, 실패하면 실험실만 치우면 돼요!"

## 연습 파일

- 워크트리란?: `projects/09-worktree/concepts/what-is-worktree.md`
- 브랜치 비교: `projects/09-worktree/concepts/worktree-vs-branch.md`
- 첫 워크트리: `projects/09-worktree/tutorial/step-01-first-worktree.md`
- 안전한 실험: `projects/09-worktree/tutorial/step-02-experiment.md`
- 에이전트 격리: `projects/09-worktree/tutorial/step-03-agent-isolation.md`

## 교육 흐름

### Step 1: Worktree가 필요한 이유

1. "코드를 고치다가 망하면 어떡해요? 되돌리기 어렵죠?"
2. concepts/what-is-worktree.md를 Read로 읽어 참고
3. 워크트리의 핵심:
   - 원본 코드를 건드리지 않고 복사본에서 실험
   - 위치: `.claude/worktrees/`에 자동 생성
   - 실패해도 폴더만 삭제하면 끝!
4. "시험지에 먼저 연습장에 풀어보고, 맞으면 답안지에 옮겨 쓰는 것처럼요!"

### Step 2: Worktree 사용법

1. tutorial/step-01을 Read로 읽어 참고
2. 시작 방법 3가지:
   - `claude --worktree` (또는 `-w`) — 터미널에서 시작
   - 대화 중 "워크트리에서 작업해줘" 요청
   - `EnterWorktree` 도구 사용
3. 워크트리 안에서 일어나는 일:
   - 새 브랜치가 자동 생성
   - 모든 파일 변경은 워크트리 안에서만
   - 원본 코드는 그대로!
4. 끝내기:
   - 세션 종료 시 "유지/삭제" 선택
   - 유지하면 나중에 merge 가능

### Step 3: 워크트리 vs 일반 브랜치

1. concepts/worktree-vs-branch.md를 Read로 읽어 비교 설명
2. 핵심 차이:
   - 일반 브랜치: 같은 폴더에서 전환 → 작업 중인 파일이 섞일 수 있음
   - 워크트리: 아예 별도 폴더 → 완전 분리!
3. 에이전트 격리 (tutorial/step-03 참고):
   - Task 도구에서 `isolation: "worktree"` → 서브에이전트에게 별도 공간 제공
   - "각 팀원에게 별도 실험실을 주는 거예요!"

### Step 4: 마무리 퀴즈

1. "워크트리는 어디에 생성되나요?"
   → 정답: .claude/worktrees/ 폴더 안에
2. "워크트리에서 실험이 실패하면?"
   → 정답: 워크트리 폴더만 삭제하면 됨! 원본 코드는 안전
3. "일반 브랜치와 워크트리의 가장 큰 차이는?"
   → 정답: 워크트리는 아예 별도 폴더에서 작업하므로 완전히 분리됨

### 마무리

"이제 안전하게 실험할 수 있어요! 워크트리를 쓰면 '망해도 괜찮아'라는 마음으로 과감하게 시도할 수 있죠.
다음 추천: `/learn 10`으로 CLI 명령어를 마스터하거나, `/learn 05`로 Agent Teams를 배워보세요!"
