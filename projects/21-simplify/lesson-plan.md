# 튜터 지시서: /simplify — 코드 품질 자동 개선

> 이 파일은 `/learn 21` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

`/simplify` 스킬로 코드의 기능은 유지하면서 가독성과 품질을 자동으로 개선하는 방법을 이해한다.

## 핵심 비유

"교정 선생님처럼, 글 내용은 안 바꾸고 문법과 가독성만 개선! 작문 시험에서 맞춤법과 띄어쓰기를 고쳐주는 선생님처럼, /simplify는 코드의 동작은 그대로 두고 읽기 쉽게 다듬어줘요."

## 연습 파일

- /simplify 개념: `projects/21-simplify/concepts/what-is-simplify.md`
- 5대 원칙: `projects/21-simplify/concepts/five-principles.md`
- 전후 비교: `projects/21-simplify/concepts/before-after.md`
- 첫 심플리파이: `projects/21-simplify/tutorial/step-01-first-simplify.md`
- 설정 커스터마이즈: `projects/21-simplify/tutorial/step-02-customize.md`
- PR 전 루틴: `projects/21-simplify/tutorial/step-03-pr-routine.md`
- 예제 - 중첩 삼항: `projects/21-simplify/examples/nested-ternary/`
- 예제 - 팀 컨벤션: `projects/21-simplify/examples/team-convention/`

## 교육 흐름

### Step 1: /simplify란? (교정 선생님 비유)

1. "코드를 짜다 보면 '동작은 하는데 읽기 어려운' 코드가 생기죠? /simplify가 이걸 깔끔하게 다듬어줘요!"
2. 교정 선생님 비유:
   - 작문 내용(기능)은 안 바꿈
   - 맞춤법/띄어쓰기(가독성)만 개선
   - 문장 구조(코드 구조)를 더 명확하게
3. 기존 코드를 망가뜨릴 걱정 없이 안전하게 개선 가능

**확인 질문**: "/simplify가 코드를 개선할 때 절대 바꾸지 않는 것은?"
→ 기대 답변: 코드의 기능/동작 (입력 대비 출력이 같아야 함)

### Step 2: 5대 원칙

1. **재사용**: 중복 코드를 공통 함수로 추출
2. **품질**: 네이밍 개선, 복잡도 감소
3. **효율**: 불필요한 연산 제거
4. **일관성**: 프로젝트 컨벤션에 맞추기
5. **가독성**: 중첩 줄이기, 의미 명확하게

### Step 3: 실습 — 첫 /simplify 실행

1. 복잡한 코드를 준비
2. `/simplify` 실행
3. 변경사항 diff 확인
4. Accept/Reject 선택

### Step 4: PR 전 루틴

1. "코드 리뷰 전에 /simplify를 돌리면 리뷰어가 좋아해요!"
2. 워크플로우: 코드 작성 → /simplify → 확인 → 커밋 → PR

### 마무리

"축하해요! 이제 코드를 교정 선생님에게 맡길 수 있어요!
기억할 것:
- /simplify는 기능을 바꾸지 않고 품질만 개선
- 5대 원칙: 재사용, 품질, 효율, 일관성, 가독성
- PR 전에 한 번 돌려두면 코드 리뷰가 부드러워져요!"
