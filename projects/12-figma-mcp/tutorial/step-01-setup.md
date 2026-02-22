# Step 1: Figma MCP 연결 설정

> Figma와 Claude Code를 연결하는 방법을 배워봅시다

---

## 방법 A: 리모트 MCP (추천)

Code to Canvas를 포함한 모든 기능을 사용할 수 있는 **리모트 MCP** 방식입니다.

### 1. claude.ai에서 Figma 커넥터 활성화

```
Claude 설정 페이지 접속
  → Integrations (통합)
  → Figma 찾기
  → "Connect" 클릭
  → Figma 계정으로 OAuth 로그인
  → 권한 허용
  → 연결 완료!
```

> 11-mcp-connectors에서 Slack/Notion 커넥터를 활성화한 것과 동일한 방식이에요.

### 2. Claude Code에서 확인

연결이 완료되면 Claude Code에서 Figma 관련 도구를 사용할 수 있습니다:

```
> Figma에서 내 프로젝트 파일 목록을 보여줘

Claude: ToolSearch를 사용해 Figma 도구를 찾겠습니다...
→ figma_read_file, figma_create_canvas_node 등 사용 가능!
```

### 3. 사용 가능한 주요 도구

| 도구 | 기능 | 설명 |
|------|------|------|
| `read_file` | 디자인 읽기 | Figma 파일의 구조와 스타일 정보 읽기 |
| `get_node` | 노드 상세 | 특정 프레임/컴포넌트의 상세 정보 |
| `create_canvas_node` | 캔버스 쓰기 | HTML/CSS를 Figma 캔버스에 렌더링 |
| `get_styles` | 스타일 추출 | 색상, 폰트, 효과 등 디자인 토큰 |

---

## 방법 B: 로컬 MCP (대안)

API 키를 사용해 직접 서버를 연결하는 방식입니다.

> Code to Canvas는 사용할 수 없지만, 디자인 읽기는 가능합니다.

### 1. Figma Personal Access Token 발급

```
Figma 앱 → 좌상단 프로필 아이콘
  → Settings
  → Personal Access Tokens 섹션
  → "Create a new personal access token"
  → 이름: "claude-code" (자유)
  → Expiration: 90 days (추천)
  → Scopes: File content (Read only)
  → "Generate token" 클릭
  → 토큰 복사 (이 화면을 벗어나면 다시 볼 수 없어요!)
```

### 2. Claude Code에 MCP 서버 추가

```bash
claude mcp add figma \
  -- npx figma-developer-mcp --figma-api-key=YOUR_TOKEN_HERE
```

### 3. 연결 확인

```bash
claude mcp list
# figma 서버가 목록에 보이면 성공!
```

---

## Figma 계정이 없다면?

걱정 마세요! 이 튜토리얼의 **개념 문서**와 **예상 결과**는 Figma 계정 없이도 100% 이해할 수 있습니다.

각 스텝에서 Claude가 어떤 응답을 하는지 **예시 출력**을 함께 보여드리니, 읽기만으로도 충분히 학습할 수 있어요.

```
실습 가능: Figma 계정 + (리모트 or 로컬) 설정 완료
읽기 학습: Figma 계정 없어도 예시 출력으로 이해 가능
```

---

## 확인 체크리스트

- [ ] Figma 계정이 있는가? (없어도 학습 가능)
- [ ] 리모트 또는 로컬 방식으로 MCP 연결을 완료했는가?
- [ ] Claude Code에서 Figma 도구가 보이는가?

---

## 다음 단계

- [Step 2: Figma 디자인 읽기](./step-02-read-design.md) — 연결된 Figma에서 디자인 정보 읽어오기
