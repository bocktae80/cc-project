# 튜터 지시서: Ralph Loop — 자율 개발 루프

> 이 파일은 `/learn 23` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

PRD(기획서)를 기반으로 Claude Code가 자율적으로 기능을 하나씩 구현해나가는 Ralph Loop의 원리와 활용법을 이해한다.

## 핵심 비유

"자동 조립 로봇처럼, 설계도(PRD)를 주면 부품(기능)을 하나씩 만들어 조립! 사람은 설계도만 주고, 로봇이 알아서 순서대로 만듭니다."

## 연습 파일

- Ralph란?: `projects/23-ralph-loop/concepts/what-is-ralph.md`
- PRD→prd.json→루프: `projects/23-ralph-loop/concepts/prd-to-loop.md`
- 메모리 전략(progress.txt): `projects/23-ralph-loop/concepts/memory-strategy.md`
- PRD 작성: `projects/23-ralph-loop/tutorial/step-01-write-prd.md`
- prd.json 변환: `projects/23-ralph-loop/tutorial/step-02-prd-json.md`
- ralph.sh 실행: `projects/23-ralph-loop/tutorial/step-03-run-ralph.md`
- 예제 - 웹앱 자동 구축: `projects/23-ralph-loop/examples/auto-webapp/`
- 예제 - 실패 복구: `projects/23-ralph-loop/examples/failure-recovery/`

## 교육 흐름

### Step 1: Ralph Loop이란?

1. "지금까지는 클로드에게 하나씩 시켰죠? Ralph Loop은 설계도를 주면 알아서 전부 만들어주는 '자동 조립 로봇'이에요!"
2. 커뮤니티 오픈소스 프로젝트 — 클로드 코드 공식 기능은 아니지만 널리 사용됨
3. 핵심 아이디어: PRD(기획서) → 자동으로 기능 하나씩 구현 → 테스트 → 완성

**확인 질문**: "Ralph Loop에서 사람이 하는 일과 클로드가 하는 일은?"
→ 기대 답변: 사람은 PRD(설계도)를 작성하고, 클로드가 기능을 하나씩 구현

### Step 2: PRD → prd.json → 루프

1. PRD 작성 (자연어로 "이런 앱을 만들어줘")
2. prd.json으로 변환 (기능 목록, 순서, 의존성)
3. ralph.sh가 prd.json을 읽고 순차 실행
4. progress.txt로 진행 상황 추적 (컨텍스트 유지)

### Step 3: 메모리 전략 — progress.txt

1. Claude Code는 세션마다 컨텍스트가 리셋됨
2. progress.txt에 "지금까지 뭘 했는지" 기록
3. 새 세션이 시작될 때 progress.txt를 읽어서 이어서 작업
4. "일기장을 보고 어제 어디까지 했는지 확인하는 것"과 같음

### Step 4: 실습 & 마무리

1. 간단한 PRD 작성 실습
2. prd.json 구조 이해
3. ralph.sh 동작 흐름 이해
4. 실패 시 복구 패턴

### 마무리

"축하해요! 이제 설계도만 주면 클로드가 알아서 앱을 만들어주는 Ralph Loop을 이해했어요!
기억할 것:
- PRD(기획서) → prd.json(구조화) → ralph.sh(자동 실행)
- progress.txt로 컨텍스트 유지
- 실패해도 progress.txt 덕분에 이어서 재시도 가능
- 커뮤니티 도구이므로 공식 기능과는 다를 수 있음"
