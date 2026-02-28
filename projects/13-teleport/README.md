# 텔레포트 — 세션을 자유롭게 이동하기 ⭐⭐

> 터미널에서 작업하다가 웹으로, 웹에서 다시 터미널로… 순간이동이 되면 어떨까?

게임에서 **포탈**을 열면 다른 장소로 순간이동하잖아요?
클로드 코드에서도 똑같이 할 수 있어요! 터미널에서 작업하다가 포탈을 열면 웹브라우저에서 이어하고, 또 다른 포탈을 열면 친구가 내 세션을 조종할 수도 있어요.

**텔레포트**는 작업하던 세션을 **어디서든 이어갈 수 있게** 해주는 순간이동 기능입니다!

```
Before: 터미널에서만 작업                After: 어디서든 이동
--------------------------------       --------------------------------

  [터미널]                               [터미널] ---portal---> [웹]
     |                                      |                    |
     | 여기서만 가능                          | & prefix           | /teleport
     |                                      |                    |
     v                                      v                    v
  작업 완료                               [웹에서 이어서]    [터미널로 복귀]
                                               |
                                               | /rc
                                               v
                                          [모바일에서 조종]
```

---

## 이런 걸 배워요

- **`&` prefix가 뭔지** — 작업을 클라우드로 보내는 방법 (포탈로 보내기)
- **`/teleport` 사용법** — 웹 세션을 로컬 터미널로 가져오기 (포탈로 불러오기)
- **`/rc` (Remote Control)** — 같은 세션에 원격으로 접속하기 (원격 리모컨)
- **세션 공유** — 팀원에게 세션을 공유하는 방법

---

## 프로젝트 구조

```
13-teleport/
├── README.md                              <- 지금 읽고 있는 파일
├── concepts/
│   ├── what-is-teleport.md               <- 텔레포트란? (순간이동 포탈 비유)
│   └── teleport-vs-remote-control.md     <- 텔레포트 vs 리모트 컨트롤 비교
├── tutorial/
│   ├── step-01-send-to-web.md            <- & prefix로 클라우드에 보내기
│   ├── step-02-teleport-local.md         <- /teleport로 로컬에 가져오기
│   └── step-03-session-sharing.md        <- 세션 공유 + /rc 리모트 컨트롤
└── examples/
    ├── background-task/
    │   └── README.md                      <- & prefix 실전 실습
    ├── teleport-workflow/
    │   └── README.md                      <- 텔레포트 전체 워크플로우
    └── remote-control/
        └── README.md                      <- 리모트 컨트롤 실습
```

---

## 사전 준비

### 선수 과목

이 튜토리얼은 **중급** 난이도입니다. 아래 내용을 먼저 알고 있으면 좋아요:

| 선수 과목 | 왜 필요한지 |
|-----------|------------|
| [10-cli-master](../10-cli-master/) | CLI 기본 사용법, 서브커맨드 이해 |
| Git 기초 | 터미널에서 git 명령어 사용 |

> 선수 과목을 안 했더라도 **개념 문서는 100% 이해 가능**합니다.
> 실습만 Claude Code + claude.ai 계정이 필요해요.

### 필요한 것

| 항목 | 필수 여부 | 설명 |
|------|----------|------|
| Claude Code | 필수 | 최신 버전 (v2.1.46+) |
| claude.ai 계정 | 실습 시 필수 | 웹에서 세션 확인용 |
| 인터넷 연결 | 필수 | 클라우드 세션 동기화에 필요 |

---

## 학습 순서

| 단계 | 내용 | 파일 |
|------|------|------|
| 0 | 개념 이해 | [concepts/](./concepts/) |
| 1 | & prefix로 클라우드에 보내기 | [tutorial/step-01-send-to-web.md](./tutorial/step-01-send-to-web.md) |
| 2 | /teleport로 로컬에 가져오기 | [tutorial/step-02-teleport-local.md](./tutorial/step-02-teleport-local.md) |
| 3 | 세션 공유 + /rc 리모트 컨트롤 | [tutorial/step-03-session-sharing.md](./tutorial/step-03-session-sharing.md) |
| 실습 | 실전 시나리오 3종 | [examples/](./examples/) |

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| `&` prefix | 작업을 클라우드에서 실행 (백그라운드 전송) |
| `/teleport` (`/tp`) | 웹 세션을 로컬 터미널로 가져오기 |
| `/rc` (Remote Control) | 같은 로컬 세션에 원격으로 접속 |
| 세션 ID | 각 세션의 고유 식별자, 공유에 사용 |
| 클라우드 세션 | claude.ai 웹에서 실행되는 세션 |
| 로컬 세션 | 터미널(CLI)에서 실행되는 세션 |

> 10에서 "CLI로 클로드를 조종하는 법"을 배웠다면,
> 이번엔 "세션을 **장소에 구애받지 않고** 자유롭게 이동하는 법"을 배우는 거예요!
