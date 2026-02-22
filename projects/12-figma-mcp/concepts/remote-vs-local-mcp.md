# 리모트 vs 로컬 MCP — 두 가지 연결 방식

> Figma MCP를 연결하는 두 가지 방법의 차이를 알아봅시다

---

## 비유: 학교 급식 vs 도시락

```
🏫 학교 급식 (리모트 MCP)              🍱 도시락 (로컬 MCP)
──────────────────────                ──────────────────────
- 학교에서 준비해줌                     - 집에서 직접 싸옴
- 메뉴가 정해져 있음                    - 내가 원하는 걸 넣음
- 영양사가 관리                        - 엄마/내가 관리
- 모든 학생이 같은 메뉴                 - 나만의 특별 메뉴
- 신청만 하면 끝                       - 매일 직접 준비
```

---

## 리모트 MCP (Anthropic 호스팅)

Anthropic이 운영하는 Figma MCP 서버에 연결하는 방식입니다.

### 설정 방법

```
Claude 설정 → Integrations → Figma 활성화 → OAuth 로그인 → 끝!
```

### 특징

| 항목 | 내용 |
|------|------|
| 설정 난이도 | 매우 쉬움 (클릭 3번) |
| 서버 관리 | Anthropic이 관리 |
| 업데이트 | 자동 |
| API 키 필요 | 아니요 (OAuth) |
| Code to Canvas | 지원 |
| 사용 환경 | claude.ai + Claude Code |

### 장점과 단점

```diff
+ 설정이 매우 간단
+ 서버 관리 불필요
+ 최신 기능 자동 업데이트
+ Code to Canvas 등 최신 기능 우선 지원
- 커스터마이징 제한
- Anthropic 서버에 의존
```

---

## 로컬 MCP (직접 설치)

Figma의 MCP 서버를 내 컴퓨터에 직접 설치하는 방식입니다.

### 설정 방법

```bash
# Figma에서 Personal Access Token 발급
# 그 후 Claude Code에서:
claude mcp add figma -- npx figma-developer-mcp --figma-api-key=YOUR_TOKEN
```

### 특징

| 항목 | 내용 |
|------|------|
| 설정 난이도 | 중간 (API 키 발급 + 명령어) |
| 서버 관리 | 내가 직접 |
| 업데이트 | 수동 (`npx` 최신 버전 사용 시 자동) |
| API 키 필요 | 예 (Personal Access Token) |
| Code to Canvas | 미지원 (읽기 전용) |
| 사용 환경 | Claude Code만 |

### 장점과 단점

```diff
+ API 키로 세밀한 권한 제어
+ 로컬에서 실행 (오프라인 가능)
+ 커스텀 설정 가능
- Code to Canvas 미지원
- API 키 발급/관리 필요
- 서버 업데이트 직접 해야 함
```

---

## 비교 요약

| 비교 항목 | 리모트 MCP | 로컬 MCP |
|-----------|-----------|----------|
| 설정 | OAuth 로그인만 | API 키 발급 + `mcp add` |
| Code to Canvas | 지원 | 미지원 |
| 관리 | Anthropic | 본인 |
| 비유 | 학교 급식 | 도시락 |
| 추천 대상 | 빠른 시작, 양방향 원할 때 | 세밀한 제어 원할 때 |

---

## 어떤 걸 선택해야 할까?

```
질문: Code to Canvas (코드→디자인) 기능이 필요한가?
│
├── 예 → 리모트 MCP (현재 유일한 방법)
│
└── 아니요 (디자인 읽기만)
    │
    ├── 간단하게 → 리모트 MCP
    └── API 키로 제어 → 로컬 MCP
```

> 이 튜토리얼에서는 **Code to Canvas**를 사용하므로 **리모트 MCP** 방식을 기준으로 설명합니다.
> 로컬 MCP 설정 방법도 Step 1에서 함께 안내합니다.

---

## 다음 단계

- [Step 1: 설정하기](../tutorial/step-01-setup.md) — 리모트 MCP 연결 실습
