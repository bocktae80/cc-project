# 기본 워크트리 체험 ⭐

> 워크트리를 직접 만들고, 수정하고, 원본이 안전한지 확인해봅시다.

---

## 이 예제에서 하는 일

1. 간단한 프로젝트를 만든다
2. `claude -w`로 워크트리를 생성한다
3. 워크트리에서 파일을 수정한다
4. 원본이 그대로인지 확인한다

---

## 준비: 연습용 프로젝트 만들기

터미널에서 아래 명령을 순서대로 실행하세요:

```bash
# 1. 연습용 폴더 만들기
mkdir worktree-practice
cd worktree-practice

# 2. Git 저장소 초기화
git init

# 3. 파일 3개 만들기
echo "# 나의 프로젝트" > README.md
echo "console.log('안녕하세요');" > app.js
echo '{ "name": "my-app", "version": "1.0.0" }' > package.json

# 4. 첫 커밋
git add .
git commit -m "init: 프로젝트 초기화"
```

**만들어진 파일 구조:**

```
worktree-practice/
├── README.md        ← "# 나의 프로젝트"
├── app.js           ← console.log('안녕하세요');
└── package.json     ← { "name": "my-app", "version": "1.0.0" }
```

---

## 실습 1: 워크트리 만들기

### 1단계: 클로드를 워크트리 모드로 실행

```bash
claude -w
```

**예상 출력:**

```
Creating worktree in .claude/worktrees/silver-fox...
New branch: worktree/silver-fox (based on HEAD)
Working directory: /worktree-practice/.claude/worktrees/silver-fox
```

### 2단계: 워크트리에서 파일 수정

클로드에게 이렇게 말해보세요:

```
> app.js를 수정해서 "안녕하세요" 대신 "반갑습니다! 워크트리에서 인사합니다!"로 바꿔줘
```

**클로드의 수정 결과 (워크트리 안):**

```javascript
// app.js (워크트리 버전)
console.log('반갑습니다! 워크트리에서 인사합니다!');
```

---

## 실습 2: 격리 확인하기

### 3단계: 새 터미널에서 원본 확인

**중요:** 클로드 세션은 그대로 두고, **새 터미널 창**을 여세요.

```bash
# 원본 프로젝트의 app.js 확인
cat worktree-practice/app.js
```

**예상 출력:**

```
console.log('안녕하세요');
```

원본은 그대로입니다!

### 4단계: 워크트리의 파일 확인

```bash
# 워크트리의 app.js 확인
cat worktree-practice/.claude/worktrees/silver-fox/app.js
```

**예상 출력:**

```
console.log('반갑습니다! 워크트리에서 인사합니다!');
```

워크트리에서만 변경되었습니다!

---

## 실습 3: 더 과감한 수정

클로드 세션으로 돌아가서:

```
> README.md에 프로젝트 설명을 길게 추가하고,
> package.json의 버전을 2.0.0으로 올리고,
> utils.js 파일을 새로 만들어줘
```

**워크트리의 변경 후 구조:**

```
.claude/worktrees/silver-fox/
├── README.md        ← 내용이 길어짐
├── app.js           ← 인사 메시지 변경됨
├── package.json     ← 버전 2.0.0
└── utils.js         ← 새 파일!
```

**원본 프로젝트:**

```
worktree-practice/
├── README.md        ← "# 나의 프로젝트" (원본 그대로)
├── app.js           ← console.log('안녕하세요'); (원본 그대로)
└── package.json     ← 버전 1.0.0 (원본 그대로)
                     ← utils.js 없음!
```

---

## 실습 4: 정리하기

### 방법 A: 세션 종료 시 선택

클로드 세션을 종료하면 (`/exit` 또는 Ctrl+C):

```
? What would you like to do with the worktree 'silver-fox'?
  > Keep it
    Remove it
```

### 방법 B: 수동으로 삭제

```bash
git worktree remove .claude/worktrees/silver-fox
```

### 방법 C: 성공한 실험 반영

```bash
# 원본 프로젝트 폴더에서
cd worktree-practice
git merge worktree/silver-fox
```

---

## 체크리스트

이 예제를 마쳤다면 아래를 확인해보세요:

| # | 확인 항목 | 완료 |
|---|----------|------|
| 1 | `claude -w`로 워크트리를 생성했다 | |
| 2 | 워크트리에서 파일을 수정했다 | |
| 3 | 원본 파일이 변경되지 않은 것을 확인했다 | |
| 4 | 워크트리의 파일이 변경된 것을 확인했다 | |
| 5 | 워크트리를 정리(유지 또는 삭제)했다 | |

---

## 다음 예제

- [워크트리 훅](../worktree-hooks/) — 워크트리 생성/삭제 시 자동으로 스크립트 실행하기
