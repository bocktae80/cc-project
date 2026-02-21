# Step 1 — 환경 설정 ⭐

> Agent Teams 기능을 켜보자!

---

## 왜 환경 설정이 필요한가요?

Agent Teams는 아직 **실험적(experimental) 기능**입니다. 기본적으로 꺼져 있기 때문에, 환경변수를 설정해서 직접 켜줘야 합니다.

> **환경변수**란? 컴퓨터에게 "이 설정을 기억해줘"라고 말하는 것과 같습니다. 프로그램이 시작할 때 이 값을 읽어서 동작을 결정합니다.

---

## 설정 방법

### 1단계: 터미널 열기

Mac이라면 `터미널(Terminal)` 앱을 열어주세요.

### 2단계: .zshrc 파일에 환경변수 추가

터미널에 아래 명령어를 입력합니다:

```bash
echo 'export CLAUDE_AGENT_TEAMS=true' >> ~/.zshrc
```

**이게 뭐하는 건가요?**
- `echo '...'` — 따옴표 안의 텍스트를 출력
- `>> ~/.zshrc` — 출력을 `.zshrc` 파일 끝에 추가
- `.zshrc` — 터미널이 시작할 때마다 읽는 설정 파일

### 3단계: 설정 적용

변경한 설정을 바로 적용하려면:

```bash
source ~/.zshrc
```

또는 터미널을 **완전히 닫았다가 다시 열어도** 됩니다.

### 4단계: 확인

제대로 설정됐는지 확인해봅시다:

```bash
echo $CLAUDE_AGENT_TEAMS
```

**결과:**
```
true
```

`true`가 출력되면 성공입니다!

---

## 주의사항

| 항목 | 설명 |
|------|------|
| 실험적 기능 | 아직 개발 중이라 동작이 바뀔 수 있어요 |
| 비용 | 에이전트마다 토큰을 사용하므로 비용이 높을 수 있어요 |
| 되돌리기 | `CLAUDE_AGENT_TEAMS=false`로 다시 끌 수 있어요 |

---

## 설정 되돌리기 (나중에 끄고 싶을 때)

`.zshrc`에서 해당 줄을 삭제하거나 `false`로 변경하면 됩니다:

```bash
# 방법 1: false로 변경
export CLAUDE_AGENT_TEAMS=false

# 방법 2: .zshrc를 열어서 해당 줄 삭제
nano ~/.zshrc
# export CLAUDE_AGENT_TEAMS=true 줄을 찾아 삭제 → Ctrl+X → Y → Enter
```

---

## 다음 단계

환경 설정이 끝났으면, 첫 번째 팀을 만들어봅시다!

> [Step 2 — 첫 번째 팀 만들기](step-02-first-team.md)
