# 튜터 지시서: Hooks

> 이 파일은 `/learn 06` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Hooks의 개념을 이해하고, PreToolUse/PostToolUse 훅을 설정하는 방법을 체험한다.

## 핵심 비유

"교실 문에 달린 센서예요! 누군가 들어올 때(PreToolUse) 또는 나갈 때(PostToolUse) 자동으로 반응하죠. 예를 들어 '들어올 때 이름 체크하기', '나갈 때 불 끄기' 같은 규칙을 정해놓는 거예요."

## 연습 파일

- 훅이란?: `projects/06-hooks/concepts/what-are-hooks.md`
- 생명주기: `projects/06-hooks/concepts/lifecycle.md`
- 첫 훅 예제: `projects/06-hooks/examples/first-hook/README.md`
- 가드 훅 예제: `projects/06-hooks/examples/guard-hook/README.md`
- 자동 로그 예제: `projects/06-hooks/examples/auto-log/README.md`
- 연습 미션: `projects/06-hooks/exercise/README.md`
- 설정 템플릿: `projects/06-hooks/exercise/.claude/settings.json`

## 교육 흐름

### Step 1: Hooks란?

1. "클로드가 도구를 쓸 때마다 자동으로 뭔가를 실행하고 싶다면? 그게 Hooks예요!"
2. concepts/what-are-hooks.md를 Read로 읽어 참고하며 4종 훅 설명:
   - **PreToolUse**: 도구 쓰기 **전** (차단 가능!)
   - **PostToolUse**: 도구 쓴 **후** (기록용)
   - **Notification**: 알림 발생할 때
   - **Stop**: 대화 끝날 때
3. 생명주기를 Read로 읽어 흐름도 설명:
   - `Pre → 도구 실행 → Post`
4. "교실 센서처럼, 특정 상황에 자동으로 반응하는 거예요!"

### Step 2: 첫 번째 훅 만들기

1. first-hook 예제의 README.md를 Read로 읽어 참고
2. 훅 설정이 들어가는 곳 설명: `.claude/settings.json`
3. 설정 구조 보여주기:
   ```json
   {
     "hooks": {
       "PreToolUse": [
         {
           "matcher": "Write",
           "hooks": [
             {
               "type": "command",
               "command": "echo '파일을 쓰려고 해요!'"
             }
           ]
         }
       ]
     }
   }
   ```
4. 핵심 개념:
   - `matcher`: 어떤 도구에 반응할지 (Write, Edit, Bash 등)
   - `type: "command"`: 셸 명령어 실행
   - **exit 2**: PreToolUse에서 exit 2를 반환하면 도구 실행을 차단!
5. "Write를 쓸 때마다 '파일을 쓰려고 해요!'라고 알려주는 센서를 달았어요"

### Step 3: 가드 훅 — 파일 보호

1. guard-hook 예제를 Read로 읽어 참고
2. 시나리오: "중요한 파일을 실수로 수정하면 안 되잖아요?"
3. 가드 훅 개념:
   - PreToolUse에서 특정 파일 경로를 체크
   - 보호 대상이면 `exit 2`로 차단
   - 메시지를 stderr에 출력하면 클로드에게 피드백
4. 환경변수 설명:
   - `$CLAUDE_TOOL_NAME`: 사용하려는 도구 이름
   - `$CLAUDE_TOOL_INPUT`: 도구에 전달되는 입력 (JSON)
   - `$CLAUDE_TOOL_RESULT`: 도구 실행 결과 (PostToolUse에서)
5. "경비원이 출입증을 확인하는 것처럼, 특정 파일은 수정 못 하게 막을 수 있어요!"

### Step 4: 연습 파일 활용 + 마무리 퀴즈

1. exercise/README.md를 Read로 읽어 미션 소개
2. 사용자에게 간단한 미션 제안:
   - "Bash 도구가 실행될 때마다 알려주는 훅을 만들어볼까요?"
   - 개념적으로 설정 JSON을 함께 구성 (사용자 입력 유도)

퀴즈:
1. "PreToolUse에서 exit 2를 반환하면 어떻게 되나요?"
   → 정답: 도구 실행이 차단돼요! 파일 보호 같은 데 사용해요.
2. "훅 설정은 어떤 파일에 작성하나요?"
   → 정답: .claude/settings.json
3. "PostToolUse 훅으로 도구 실행을 막을 수 있나요?"
   → 정답: 불가능! Post는 이미 실행된 후라서 기록만 가능. 막으려면 Pre를 사용해야 해요.

### 마무리

"축하해요! 이제 클로드에게 자동 반응 규칙을 만들 수 있어요! 훅은 자동화의 시작이에요.
다음 추천: `/learn 08`로 나만의 슬래시 커맨드를 만들어보세요!"
