# Step 1 — 첫 워크트리 만들기 ⭐

> `claude -w` 한 줄이면 안전한 실험실이 생깁니다!

---

## 시작하기 전에

### 필요한 것

| 항목 | 설명 |
|------|------|
| Claude Code | 최신 버전 설치 (v2.1.49 이상) |
| Git 저장소 | `git init`이 되어 있는 프로젝트 |
| 터미널 | Mac의 Terminal 또는 VS Code 터미널 |

### 확인하기

프로젝트가 Git 저장소인지 확인하세요:

```bash
git status
```

**정상 출력 예시:**
```
On branch main
nothing to commit, working tree clean
```

> 만약 `fatal: not a git repository`가 나오면 `git init`을 먼저 실행하세요.

---

## 실습: 워크트리 만들기

### 1단계: 프로젝트 폴더로 이동

```bash
cd my-project
```

### 2단계: 워크트리 모드로 클로드 실행

```bash
claude --worktree
```

또는 짧은 형태:

```bash
claude -w
```

### 3단계: 무슨 일이 일어나는지 관찰

클로드가 워크트리를 만들 때 이런 일이 벌어집니다:

```
$ claude -w

  Creating worktree in .claude/worktrees/gentle-river...
  New branch: worktree/gentle-river (based on HEAD)
  Working directory: /my-project/.claude/worktrees/gentle-river

  ╭──────────────────────────────────────╮
  │  Claude Code                         │
  │  Working in worktree: gentle-river   │
  ╰──────────────────────────────────────╯

>
```

**일어나는 일 정리:**

| 순서 | 무슨 일이? | 설명 |
|------|-----------|------|
| 1 | 폴더 생성 | `.claude/worktrees/gentle-river/` 생성 |
| 2 | 브랜치 생성 | `worktree/gentle-river` 브랜치 자동 생성 |
| 3 | 코드 복사 | 현재 코드(HEAD)를 워크트리로 복사 |
| 4 | 작업 시작 | 클로드가 워크트리 안에서 동작 |

> **이름:** `gentle-river`은 자동 생성된 랜덤 이름입니다. 매번 다른 이름이 생겨요.

---

## 워크트리 안에서 작업해보기

### 4단계: 클로드에게 파일 수정 요청

워크트리 안에서 클로드에게 작업을 시켜봅시다:

```
> README.md에 "실험 중입니다"라는 줄을 추가해줘
```

클로드가 파일을 수정합니다. 하지만 이 수정은 **워크트리 안에서만** 적용됩니다!

### 5단계: 원본 확인하기

새 터미널 창을 열고 원본 프로젝트에서 확인해보세요:

```bash
# 원본 프로젝트 폴더에서
cd /my-project
cat README.md
```

**결과:** 원본 README.md에는 "실험 중입니다"가 **없습니다**!

```bash
# 워크트리 폴더에서
cat /my-project/.claude/worktrees/gentle-river/README.md
```

**결과:** 워크트리의 README.md에는 "실험 중입니다"가 **있습니다**!

```
원본 (my-project/README.md)
┌────────────────────────────┐
│ # My Project               │
│ This is my project.        │  ← 변경 없음!
└────────────────────────────┘

워크트리 (.claude/worktrees/gentle-river/README.md)
┌────────────────────────────┐
│ # My Project               │
│ This is my project.        │
│ 실험 중입니다               │  ← 여기만 변경됨!
└────────────────────────────┘
```

---

## 세션 종료 시

클로드 코드 세션을 끝내면 (Ctrl+C 또는 `/exit`), 워크트리를 어떻게 할지 물어봅니다:

```
Session ended.

? What would you like to do with the worktree 'gentle-river'?
  > Keep it (I'll come back later)
    Remove it (discard changes)
```

| 선택 | 설명 |
|------|------|
| **Keep** | 워크트리를 남겨둠. 나중에 다시 사용 가능 |
| **Remove** | 워크트리를 삭제함. 실험한 내용이 사라짐 |

---

## 폴더 구조 확인

워크트리를 만든 후의 프로젝트 구조:

```
my-project/                          ← 원본 (안전)
├── .claude/
│   └── worktrees/
│       └── gentle-river/            ← 워크트리 (실험 공간)
│           ├── README.md            ← 수정된 파일
│           ├── src/
│           └── ...
├── README.md                        ← 원본 파일 (변경 없음!)
├── src/
└── ...
```

---

## 요약

```
첫 워크트리 만들기 요약
━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. claude -w 실행
  2. 자동으로 .claude/worktrees/ 에 실험 폴더 생성
  3. 워크트리 안에서 자유롭게 작업
  4. 원본은 안전하게 보존됨
  5. 종료 시 유지/삭제 선택
```

---

## 다음 단계

워크트리를 만들었으니, 이제 과감하게 실험해봅시다!

> [Step 2 — 안전한 실험하기](step-02-experiment.md)
