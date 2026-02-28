# 튜터 지시서: 파일 읽기/쓰기

> 이 파일은 `/learn 02` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Read, Write, Edit 도구를 실제로 사용하며 차이를 체험한다.

## 핵심 비유

"Read는 책을 빌려 읽는 것, Write는 새 노트에 쓰는 것, Edit는 기존 노트에서 특정 문장만 고치는 것이에요."

## 연습 파일

- 읽기 연습: `projects/02-file-operations/examples/read-basics/sample.js`
- 읽기 연습 (JSON): `projects/02-file-operations/examples/read-basics/sample-data.json`
- 수정 연습: `projects/02-file-operations/examples/edit-modify/before.js`

## 교육 흐름

### Step 1: 파일 읽기 (Read)

1. "먼저 파일을 읽어볼게요. 도서관에서 책을 빌려 읽는 것처럼요!"
2. `sample.js`를 Read 도구로 읽어서 보여주기
3. Read의 핵심 파라미터 설명:
   - `file_path`: 읽을 파일 경로 (절대 경로 사용)
   - `offset`: 몇 번째 줄부터 읽을지 (기본: 처음부터)
   - `limit`: 몇 줄을 읽을지 (기본: 2000줄)
4. 실습: `sample-data.json`도 읽어보기
5. 연습 제안: "이번엔 offset과 limit을 써볼까요? sample.js의 3번째 줄부터 5줄만 읽어볼게요"
   - `Read sample.js (offset: 3, limit: 5)` 실행

### Step 2: 파일 만들기 (Write)

1. "이번엔 새 파일을 만들어볼게요. 빈 노트에 글을 쓰는 것처럼요!"
2. 사용자에게 물어보기: "어떤 파일을 만들어볼까요? 예를 들어 hello.js에 Hello World를 출력하는 코드는 어때요?"
3. 사용자의 선택(또는 기본값)으로 Write 도구로 파일 생성:
   - 경로: `projects/02-file-operations/examples/write-create/hello.js`
   - 내용: 사용자가 원하는 것 또는 `console.log("Hello World!");`
4. 생성된 파일을 Read로 확인
5. **주의사항 설명**: "Write는 같은 이름의 파일이 있으면 완전히 덮어써요! 그래서 기존 파일을 고칠 때는 Write 대신 Edit를 써야 해요."

### Step 3: 파일 수정 (Edit)

1. "마지막으로 기존 파일을 고쳐볼게요. 노트에서 특정 문장만 지우개로 지우고 다시 쓰는 것처럼요!"
2. `before.js`를 Read로 먼저 보여주기
3. "이 코드에서 뭔가 이상한 점이 보이나요?" (버그 찾기 유도)
4. Edit 도구로 버그 수정 시연:
   - `old_string`: 원래 코드 (정확히 일치해야 함!)
   - `new_string`: 수정된 코드
5. 수정 후 다시 Read로 결과 확인
6. **핵심 포인트**: "Edit의 old_string은 파일에서 유일해야 해요. 같은 텍스트가 여러 곳에 있으면 에러가 나요. 그럴 때는 주변 코드를 더 포함시켜 유일하게 만들면 돼요."

### Step 4: 비교 정리 + 마무리 퀴즈

먼저 비교표를 보여주세요:

| | Read | Write | Edit |
|---|------|-------|------|
| 하는 일 | 파일 읽기 | 파일 전체 쓰기 | 부분 수정 |
| 위험도 | 안전 | 주의 (덮어쓰기) | 보통 |
| 비유 | 책 읽기 | 새 노트 | 지우개 + 연필 |

그리고 퀴즈를 하나씩 내세요:

1. "기존 파일의 한 줄만 바꾸고 싶을 때 어떤 도구를 써야 할까요?"
   → 정답: Edit (Write를 쓰면 나머지 내용이 다 사라져요!)
2. "Edit의 old_string이 유일하지 않으면 어떻게 되나요?"
   → 정답: 에러가 발생해요. 주변 코드를 더 포함시켜 유일하게 만들어야 해요.
3. "Read 도구가 안전한 이유는?"
   → 정답: 파일을 읽기만 하고 절대 바꾸지 않으니까요!

### 마무리

"축하해요! Read, Write, Edit 세 가지 파일 도구를 마스터했어요!
다음 추천: `/learn 03`으로 코드 검색(Glob, Grep)을 배워보세요!"
