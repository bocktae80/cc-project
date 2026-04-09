# 튜터 지시서: 배치 모드 — 비대화형 자동 처리

> 이 파일은 `/learn 22` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

`claude` CLI의 비대화형(batch) 모드로 자동화 파이프라인을 구성하는 방법을 이해한다.

## 핵심 비유

"자판기처럼, 돈(입력) 넣고 버튼(명령) 누르면 음료(결과)가 나옴! 대화 없이 한 번에 처리되는 자동 모드예요."

## 연습 파일

- 대화형 vs 비대화형: `projects/22-batch-mode/concepts/interactive-vs-batch.md`
- 파이프라인 패턴: `projects/22-batch-mode/concepts/pipeline-patterns.md`
- 출력 포맷: `projects/22-batch-mode/concepts/output-formats.md`
- 첫 배치 실행: `projects/22-batch-mode/tutorial/step-01-first-batch.md`
- 파이프 체이닝: `projects/22-batch-mode/tutorial/step-02-pipe-chaining.md`
- CI/CD 연동: `projects/22-batch-mode/tutorial/step-03-cicd.md`
- 예제 - PR 자동 리뷰: `projects/22-batch-mode/examples/pr-auto-review/`
- 예제 - 코드 생성: `projects/22-batch-mode/examples/code-gen-pipeline/`

## 교육 흐름

### Step 1: 대화형 vs 비대화형

1. "지금까지는 클로드와 '대화'했죠? 이제 '자판기'처럼 넣고 바로 결과를 받는 방법을 배워요!"
2. 대화형: `claude` → 사람이 직접 입력 → 클로드가 답 → 또 입력...
3. 비대화형: `echo "질문" | claude -p` → 한 번에 결과 출력 → 끝!
4. 자판기처럼: 돈+버튼=음료. 점원과 대화할 필요 없음!

**확인 질문**: "대화형과 비대화형의 가장 큰 차이는?"
→ 기대 답변: 대화형은 사람이 계속 입력해야 하고, 비대화형은 한 번 실행하면 자동으로 끝남

### Step 2: 파이프라인 패턴

1. `-p` 플래그: 파이프 모드 (stdin으로 프롬프트 받기)
2. `--output-format`: json/text/stream-json 등 출력 형식
3. 파이프 체이닝: `cat file | claude -p "분석해줘" | grep "버그"`

### Step 3: 실습 — CI/CD 연동

1. GitHub Actions에서 PR 자동 리뷰
2. pre-commit 훅으로 코드 점검
3. 배치 스크립트로 여러 파일 처리

### 마무리

"축하해요! 이제 클로드를 자판기처럼 자동화할 수 있어요!
기억할 것:
- `-p` 플래그로 비대화형 모드 실행
- 파이프(`|`)로 다른 명령어와 연결
- CI/CD, 스크립트, 크론잡에서 활용 가능!"
