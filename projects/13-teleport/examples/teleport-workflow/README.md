# 예제: 텔레포트 전체 워크플로우

> 웹에서 설계 → 텔레포트 → 터미널에서 구현 → 클라우드로 보내기, 전체 순환 체험

---

## 실습 목표

```
[1] 웹에서 설계 논의
        |
        | /teleport
        v
[2] 터미널에서 구현
        |
        | & prefix
        v
[3] 클라우드에서 테스트
        |
        | /teleport
        v
[4] 터미널에서 결과 확인 + 마무리
```

---

## 시나리오

할일(Todo) 앱에 **우선순위 기능**을 추가하려고 합니다.
웹에서 설계를 논의하고, 터미널에서 구현하는 전체 과정을 체험합니다.

---

## Phase 1: 웹에서 설계 논의 (5분)

### claude.ai에서 대화 시작

```
사용자: Todo 앱에 우선순위 기능을 추가하고 싶어.
       할일마다 높음/중간/낮음 우선순위를 설정하고,
       우선순위별로 정렬할 수 있으면 좋겠어.
       어떤 구조가 좋을까?

Claude: 좋은 기능이네요! 다음과 같은 설계를 제안합니다:

       1. 데이터 모델:
          - priority: "high" | "medium" | "low"
          - 기본값: "medium"

       2. UI 변경:
          - 각 할일 옆에 우선순위 배지 (색상으로 구분)
          - 정렬 버튼 추가

       3. 파일 변경 목록:
          - src/types.ts (타입 추가)
          - src/components/TodoItem.tsx (배지 추가)
          - src/utils/sort.ts (정렬 함수)

       이 설계로 진행할까요?

사용자: 좋아! 색상은 빨강/노랑/초록으로 하자.
       정렬은 기본으로 높음→낮음 순서로 해줘.
```

설계가 정리되었으니, 이제 실제 코드를 작성할 차례!

---

## Phase 2: 텔레포트 → 터미널에서 구현 (5분)

### 터미널에서 세션 가져오기

```bash
# Claude Code 터미널에서:
> /tp

Available sessions:
  1. [ses_todo_priority] "Todo 우선순위 설계" (방금 전)

Select a session: 1

Teleporting session ses_todo_priority...
Session transferred to local terminal.
```

### 이어서 구현 요청

```bash
# 방금 논의한 설계를 바로 코드로:
> 방금 논의한 설계대로 구현해줘.
  1. src/types.ts에 Priority 타입 추가
  2. src/components/TodoItem.tsx에 우선순위 배지 추가
  3. src/utils/sort.ts에 우선순위 정렬 함수 추가
```

### 예상 출력

```
Claude: 네, 앞서 논의한 설계를 구현하겠습니다.

[파일 수정: src/types.ts]
- Priority 타입 추가: "high" | "medium" | "low"
- Todo 인터페이스에 priority 필드 추가

[파일 생성: src/components/PriorityBadge.tsx]
- 빨강(high), 노랑(medium), 초록(low) 배지 컴포넌트

[파일 수정: src/components/TodoItem.tsx]
- PriorityBadge 추가

[파일 생성: src/utils/sort.ts]
- sortByPriority 함수 (high → medium → low)

4개 파일 변경/생성 완료!
```

### git으로 저장

```bash
> 변경 사항을 git에 커밋해줘. 메시지: "feat: 우선순위 기능 추가"
```

```
Claude: git add + commit 실행합니다.

git add src/types.ts src/components/PriorityBadge.tsx
        src/components/TodoItem.tsx src/utils/sort.ts
git commit -m "feat: 우선순위 기능 추가"

[main abc1234] feat: 우선순위 기능 추가
 4 files changed, 87 insertions(+)
```

---

## Phase 3: 테스트를 클라우드로 보내기 (1분)

테스트 작성과 실행은 시간이 걸리니, 클라우드에 맡깁시다!

```bash
> & 방금 추가한 우선순위 기능에 대해:
  1. 모든 함수/컴포넌트의 단위 테스트를 작성해줘
  2. 테스트를 실행하고 결과를 정리해줘
  3. 테스트 커버리지도 확인해줘
```

```
Sending task to cloud...
Task sent! Session ID: ses_todo_test

>
```

터미널이 자유로워졌어요. 다른 작업을 합시다:

```bash
> README.md에 우선순위 기능 설명을 추가해줘
```

---

## Phase 4: 결과 가져오기 + 마무리 (2분)

```bash
# 테스트가 완료된 후:
> /tp

Available sessions:
  1. [ses_todo_test] "우선순위 테스트" (completed)

Select a session: 1
```

### 예상 결과

```
Teleporting session...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

테스트 결과 요약:

작성된 테스트: 12개
  - sortByPriority: 5개 (정렬 순서, 빈 배열, 같은 우선순위 등)
  - PriorityBadge: 4개 (색상, 텍스트, 접근성)
  - TodoItem + Priority: 3개 (통합 테스트)

실행 결과: 12/12 통과 (100%)
커버리지: 94.2%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

>
```

### 마무리 커밋

```bash
> 테스트 파일도 git에 커밋해줘. 메시지: "test: 우선순위 기능 테스트 추가"
```

---

## 전체 워크플로우 요약

```
시간    장소          행동                   사용 기능
----    ----          ----                   ---------
09:00   claude.ai     설계 논의               웹 대화
09:10   터미널        설계→코드 구현           /teleport
09:20   터미널        코드 작성 + git 커밋      로컬 작업
09:25   터미널→웹     테스트 맡기기             & prefix
09:25   터미널        다른 작업 (README)        터미널 자유!
09:35   터미널        테스트 결과 가져오기       /teleport
09:40   터미널        마무리 커밋               로컬 작업
```

---

## 학습 포인트

이 예제를 통해 배운 것:

1. **웹→터미널 전환**: 설계 논의 후 `/teleport`로 구현 전환
2. **맥락 유지**: 웹에서 논의한 내용이 터미널에서 그대로 이어짐
3. **병렬 작업**: `& prefix`로 테스트 맡기고 다른 일 진행
4. **전체 순환**: 웹 → 터미널 → 클라우드 → 터미널의 자연스러운 흐름

> 핵심 교훈: 설계는 웹에서 편하게, 구현은 터미널에서 강력하게!
> 텔레포트로 두 세계를 자유롭게 오가세요.
