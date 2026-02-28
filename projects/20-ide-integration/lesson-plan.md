# 튜터 지시서: IDE 통합

> 이 파일은 `/learn 20` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

CLI 이외에 VS Code, Cursor, JetBrains 등 다양한 IDE에서 Claude Code를 활용하는 방법을 이해한다.

## 핵심 비유

"게임 컨트롤러처럼, 익숙한 도구에서 바로 클로드 사용! 같은 게임이라도 키보드, 게임패드, 조이스틱 중 편한 걸로 플레이하듯이, 클로드도 터미널, VS Code, Cursor 중 편한 곳에서 쓸 수 있어요!"

## 연습 파일

- CLI vs IDE 통합: `projects/20-ide-integration/concepts/cli-vs-ide.md`
- VS Code 확장: `projects/20-ide-integration/concepts/vscode-extension.md`
- Cursor & JetBrains: `projects/20-ide-integration/concepts/cursor-jetbrains.md`
- VS Code 설치: `projects/20-ide-integration/tutorial/step-01-vscode-setup.md`
- @-mention 참조: `projects/20-ide-integration/tutorial/step-02-at-mention.md`
- 플랜 리뷰 워크플로우: `projects/20-ide-integration/tutorial/step-03-plan-review.md`
- 예제 - VS Code 버그 수정: `projects/20-ide-integration/examples/vscode-bugfix/`
- 예제 - Cursor 코드 생성: `projects/20-ide-integration/examples/cursor-codegen/`

## 교육 흐름

### Step 1: CLI vs IDE 통합 (각각의 장단점)

1. "지금까지 터미널에서 클로드를 사용했죠? 이제 코드 편집기(IDE) 안에서 바로 쓰는 방법을 배워요!"
2. concepts/cli-vs-ide.md를 Read로 읽어 참고
3. CLI vs IDE 비교:
   - **CLI (터미널)**: 가볍고 빠름, 자동화에 좋음, 스크립트 연동 가능
   - **IDE 통합**: 코드와 나란히 표시, 파일 참조 쉬움, GUI로 편리
4. "게임을 할 때 키보드가 좋은 사람도 있고, 게임패드가 좋은 사람도 있잖아요? 둘 다 같은 게임을 하지만 조작 방식이 다른 거예요!"
5. "하나만 써야 하는 게 아니라, 상황에 따라 바꿔가며 쓸 수 있어요!"

**확인 질문**: "CLI와 IDE 통합 각각의 장점을 하나씩 말해보세요."
→ 기대 답변: CLI는 자동화/스크립트에 좋고, IDE는 코드 보면서 대화할 수 있어 편리함

### Step 2: VS Code 확장 기능 (네이티브 UI, 멀티탭, @-mention)

1. "가장 인기 있는 IDE 통합인 VS Code부터 살펴볼게요!"
2. concepts/vscode-extension.md를 Read로 읽어 참고
3. VS Code 핵심 기능:
   - **네이티브 사이드바**: 코드 옆에서 클로드와 대화
   - **멀티탭**: 여러 대화를 동시에 진행 (탭으로 전환)
   - **@-mention**: `@파일명`으로 특정 파일/코드 참조
   - **인라인 diff**: 변경사항을 코드 편집기에서 바로 확인
4. tutorial/step-01-vscode-setup.md를 Read로 설치 안내
5. tutorial/step-02-at-mention.md를 Read로 실습 안내
6. "@-mention은 대화 중에 '이 파일 봐줘!'라고 손가락으로 가리키는 것과 같아요."

**확인 질문**: "@-mention은 어떤 상황에서 유용한가요?"
→ 기대 답변: 특정 파일이나 코드 라인을 클로드에게 직접 보여주고 싶을 때

### Step 3: Cursor & JetBrains 통합

1. "VS Code 외에도 다른 IDE에서도 클로드를 쓸 수 있어요!"
2. concepts/cursor-jetbrains.md를 Read로 읽어 참고
3. Cursor 통합:
   - Cursor는 AI 기능이 내장된 IDE
   - Claude Code를 에이전트 모드로 활용 가능
   - Cmd+I로 인라인 편집, Agent 탭으로 대화
4. JetBrains 통합:
   - IntelliJ, WebStorm, PyCharm 등에서 사용
   - 터미널 통합 방식으로 Claude Code 실행
5. tutorial/step-03-plan-review.md를 Read로 플랜 리뷰 워크플로우 안내
6. "어떤 IDE를 쓰든 클로드의 능력은 동일해요. 인터페이스가 다를 뿐!"

### Step 4: 마무리 퀴즈

1. 실전 워크플로우 정리:
   - VS Code: 코드 보면서 대화 → diff 확인 → 적용
   - Cursor: Agent 모드로 자동 코딩 → 리뷰
   - JetBrains: 터미널 탭에서 Claude Code 실행
2. 예제 소개:
   - VS Code에서 버그 수정 워크플로우
   - Cursor에서 코드 생성 워크플로우

퀴즈:
1. "VS Code에서 @-mention의 역할은?"
   → 정답: 특정 파일이나 코드 라인을 클로드에게 직접 참조시키는 기능
2. "CLI와 IDE 통합 중 자동화 스크립트에 더 좋은 건?"
   → 정답: CLI (파이프라인, 스크립트와 연동이 쉬움)
3. "Cursor에서 Claude Code를 사용하는 방법은?"
   → 정답: Agent 모드에서 Claude Code를 에이전트로 선택하거나, 내장 터미널에서 실행

### 마무리

"축하해요! 이제 터미널뿐만 아니라 다양한 IDE에서도 클로드를 활용할 수 있어요!
기억할 것:
- CLI = 자동화/스크립트에 강함
- VS Code = 코드와 나란히 대화, @-mention으로 참조
- Cursor = AI 네이티브 IDE, Agent 모드
- JetBrains = 터미널 통합으로 기존 워크플로우 유지

자신에게 가장 편한 환경을 골라 사용하세요. 여러 개를 섞어 써도 좋아요!"
