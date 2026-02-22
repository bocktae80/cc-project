# Figma MCP — 디자인과 코드를 연결하기 ⭐⭐⭐

> 디자이너가 그린 Figma 디자인을 Claude가 읽고, 코드를 다시 Figma에 올린다면?

집을 지을 때 **건축가(디자이너)**는 도면을 그리고, **시공사(개발자)**는 도면을 보고 짓습니다.
그런데 도면을 PDF로 주고받으면? "이거 몇 px이야?", "색상 코드가 뭐야?" 같은 질문이 끊이지 않죠.

**Figma MCP**는 건축가와 시공사가 **살아있는 공유 도면**을 보는 것과 같습니다!

```
📄 PDF 도면 (기존 방식)                 🔄 살아있는 공유 도면 (Figma MCP)
─────────────────────                  ─────────────────────────────────
디자이너 → PDF 출력                     디자이너 → Figma에서 디자인
         → 이메일 전달                            ↕ (실시간 공유)
개발자   → PDF 보고 추측                개발자+Claude → 정확한 값 자동 읽기
         → "이거 맞아?" 반복                        → 코드를 Figma에 올려서 비교
                                                   → 차이점 자동 감지
                                                   → 코드에 자동 반영
```

---

## 이런 걸 배워요

- **Figma MCP가 뭔지** — 건축가-시공사의 공유 도면 비유로 이해
- **리모트 vs 로컬 MCP** — 두 가지 연결 방식의 차이
- **디자인 읽기** — Figma 파일의 구조, 색상, 크기를 코드로 가져오기
- **Code to Canvas** — HTML/CSS 코드를 Figma 캔버스에 렌더링하기
- **라운드트립 워크플로우** — 수정 → 감지 → 반영의 전체 순환

---

## 프로젝트 구조

```
12-figma-mcp/
├── README.md                              ← 지금 읽고 있는 파일
├── concepts/
│   ├── what-is-figma-mcp.md              ← Figma MCP란? (건축가-시공사 비유)
│   └── remote-vs-local-mcp.md            ← 리모트 vs 로컬 MCP 비교
├── tutorial/
│   ├── step-01-setup.md                  ← Figma MCP 연결 설정
│   ├── step-02-read-design.md            ← Figma 디자인 읽기
│   ├── step-03-code-to-canvas.md         ← 코드 → Figma 캔버스
│   └── step-04-round-trip.md             ← 수정 → 코드 반영 라운드트립
└── examples/
    └── studio-card-to-figma/
        ├── README.md                      ← 전체 실습 가이드
        └── studio-card.html               ← 독립 실행 카드 (3종 상태)
```

---

## 사전 준비

### 선수 과목

이 튜토리얼은 **상급** 난이도입니다. 아래 내용을 먼저 알고 있어야 해요:

| 선수 과목 | 왜 필요한지 |
|-----------|------------|
| [07-mcp-server](../07-mcp-server/) | MCP가 무엇인지, 어떻게 동작하는지 기본 이해 |
| [11-mcp-connectors](../11-mcp-connectors/) | MCP 커넥터 활성화, ToolSearch 사용법 |

> 선수 과목을 안 했더라도 **개념 문서는 100% 이해 가능**합니다.
> 실습만 Figma 계정 + MCP 연결이 필요해요.

### 필요한 것

| 항목 | 필수 여부 | 설명 |
|------|----------|------|
| Claude Code | 필수 | 최신 버전 |
| Figma 계정 | 실습 시 필수 | 무료 플랜 OK. 없어도 개념 학습 가능 |
| MCP 연결 | 실습 시 필수 | 리모트(추천) 또는 로컬 |

---

## 학습 순서

| 단계 | 내용 | 파일 |
|------|------|------|
| 0 | 개념 이해 | [concepts/](./concepts/) |
| 1 | Figma MCP 연결 설정 | [tutorial/step-01-setup.md](./tutorial/step-01-setup.md) |
| 2 | Figma 디자인 읽기 | [tutorial/step-02-read-design.md](./tutorial/step-02-read-design.md) |
| 3 | Code to Canvas | [tutorial/step-03-code-to-canvas.md](./tutorial/step-03-code-to-canvas.md) |
| 4 | 라운드트립 워크플로우 | [tutorial/step-04-round-trip.md](./tutorial/step-04-round-trip.md) |
| 실습 | Studio 카드 전체 실습 | [examples/studio-card-to-figma/](./examples/studio-card-to-figma/) |

---

## 핵심 정리

| 개념 | 설명 |
|------|------|
| Figma MCP | Figma 디자인을 읽고 쓸 수 있는 MCP 서버 |
| Code to Canvas | HTML/CSS 코드를 Figma 캔버스에 렌더링하는 기능 |
| 라운드트립 | 코드 → 디자인 → 수정 → 코드의 순환 워크플로우 |
| 리모트 MCP | Anthropic이 호스팅 (OAuth, Code to Canvas 지원) |
| 로컬 MCP | 직접 설치 (API 키, 읽기 전용) |
| 디자인 토큰 | 색상, 크기, 간격 등 디자인 시스템의 반복 값 |

> 07에서 "MCP로 외부 도구를 연결하는 법"을,
> 11에서 "커넥터로 간편하게 쓰는 법"을 배웠다면,
> 이번엔 "디자인과 코드를 **양방향으로** 연결하는 법"을 배우는 거예요!
