# 코드 보안 스캔 — AI로 코드의 약점 찾기 ⭐⭐⭐

> 코드에 숨어있는 보안 취약점을 AI가 찾아준다면?

학교에 **CCTV**가 있잖아요? 정해진 곳만 비추죠. 그런데 CCTV가 없는 복도나 뒷문으로 나쁜 일이 생기면?
**AI 보안 경비원**은 CCTV 없는 곳도 직접 돌아다니면서 "수상한 행동"을 찾아냅니다.

코드 보안도 마찬가지예요. 기존 도구는 **알려진 패턴**만 찾지만, AI는 코드를 읽고 **"이 부분이 위험할 수 있겠는데?"** 하고 추론합니다.

```
CCTV (기존 정적분석 도구)              AI 보안 경비원 (Claude 보안 스캔)
──────────────────────               ─────────────────────────────────
정해진 위치만 감시                     건물 전체를 돌아다니며 감시
알려진 얼굴(패턴)만 감지               수상한 행동 자체를 추론
규칙에 없으면 통과시킴                 "이상한데?" 하고 직접 판단
                                     맥락(context)을 이해함
빠르지만 놓치는 게 많음               느리지만 숨은 위험도 발견

예시:                                예시:
"password" 변수명 → 경고              "이 함수는 사용자 입력을
그 외 → 통과                          검증 없이 DB에 넣네? 위험!"
```

---

## 이런 걸 배워요

- **코드 보안이 뭔지** — 왜 코드에 "약점"이 생기는지 이해
- **OWASP Top 10** — 가장 흔한 보안 취약점 유형 (중학생 수준으로 설명)
- **AI 스캔 vs 규칙 기반 스캔** — 두 접근법의 차이
- **스캔 → 검증 → 수정 워크플로우** — 취약점 발견부터 고치기까지
- **보안 체크리스트 만들기** — 내 프로젝트에 맞는 보안 점검표

---

## 프로젝트 구조

```
14-code-security/
├── README.md                              ← 지금 읽고 있는 파일
├── lesson-plan.md                         ← 튜터 지시서 (교육 흐름)
├── concepts/
│   ├── what-is-code-security.md           ← 코드 보안이란? (AI 경비원 비유)
│   └── ai-vs-traditional-scan.md          ← AI 스캔 vs 기존 정적분석 비교
├── tutorial/
│   ├── step-01-understand-vulns.md        ← 취약점 이해하기
│   ├── step-02-scan-basics.md             ← 보안 스캔 기초 (시뮬레이션)
│   └── step-03-fix-workflow.md            ← 발견 → 검증 → 수정 워크플로우
└── examples/
    ├── vulnerable-code/                   ← 의도적 취약 코드 샘플
    │   ├── README.md
    │   ├── sql-injection.js               ← SQL 인젝션 예제
    │   ├── xss-example.js                 ← XSS 예제
    │   └── broken-auth.js                 ← 인증 우회 예제
    ├── scan-and-fix/                      ← 스캔 + 수정 실습
    │   └── README.md
    └── security-checklist/                ← 보안 체크리스트 만들기
        └── README.md
```

---

## 사전 준비

### 선수 과목

이 튜토리얼은 **상급** 난이도입니다. 아래 내용을 먼저 알고 있어야 해요:

| 선수 과목 | 왜 필요한지 |
|-----------|------------|
| [02-file-operations](../02-file-operations/) | 파일 읽기/쓰기 기본 이해 (취약 코드를 읽고 수정해야 함) |

> 선수 과목을 안 했더라도 **개념 문서는 100% 이해 가능**합니다.
> 코드 예제도 주석으로 자세히 설명되어 있어요.

### 필요한 것

| 항목 | 필수 여부 | 설명 |
|------|----------|------|
| Claude Code | 필수 | 최신 버전 |
| Enterprise/Team 플랜 | 실습 시 필수 | 보안 스캔 기능은 Enterprise/Team 전용 |
| 개인 플랜 | 개념 학습 가능 | 취약 코드 이해 + 수동 스캔 요청 가능 |

> **Enterprise/Team 전용 기능**이지만, 이 튜토리얼의 **개념 학습과 코드 예제는 누구나** 따라할 수 있습니다.
> 직접 실행할 수 없는 부분은 시뮬레이션 출력으로 대체했어요.

---

## 학습 순서

| 단계 | 내용 | 파일 |
|------|------|------|
| 0 | 개념 이해 | [concepts/](./concepts/) |
| 1 | 취약점 이해하기 | [tutorial/step-01-understand-vulns.md](./tutorial/step-01-understand-vulns.md) |
| 2 | 보안 스캔 기초 | [tutorial/step-02-scan-basics.md](./tutorial/step-02-scan-basics.md) |
| 3 | 수정 워크플로우 | [tutorial/step-03-fix-workflow.md](./tutorial/step-03-fix-workflow.md) |
| 실습A | 취약 코드 샘플 | [examples/vulnerable-code/](./examples/vulnerable-code/) |
| 실습B | 스캔 + 수정 | [examples/scan-and-fix/](./examples/scan-and-fix/) |
| 실습C | 보안 체크리스트 | [examples/security-checklist/](./examples/security-checklist/) |

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| 보안 취약점 | 코드에서 공격자가 악용할 수 있는 약점 |
| OWASP Top 10 | 가장 흔한 웹 보안 취약점 10가지 목록 |
| SQL 인젝션 | 사용자 입력이 DB 명령어에 끼어드는 공격 |
| XSS | 웹 페이지에 악성 스크립트를 심는 공격 |
| 정적분석 | 코드를 실행하지 않고 텍스트로 분석하는 방법 |
| AI 보안 스캔 | AI가 코드의 맥락을 이해하며 취약점을 추론하는 방법 |
| 보안 체크리스트 | 프로젝트의 보안 상태를 점검하는 항목 목록 |

> 02에서 "파일을 읽고 쓰는 법"을 배웠다면,
> 이번엔 "코드를 읽고 **안전하게** 쓰는 법"을 배우는 거예요!
