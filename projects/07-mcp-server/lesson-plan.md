# 튜터 지시서: MCP 서버

> 이 파일은 `/learn 07` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

MCP(Model Context Protocol)가 뭔지 이해하고, 클로드에게 새로운 능력을 추가하는 원리를 배운다.

## 핵심 비유

"스마트폰에 앱을 설치하면 새 기능이 생기잖아요? MCP 서버도 같아요! 클로드에게 '시간 알려주기', 'GitHub 연동하기' 같은 앱을 설치하는 거예요."

## 연습 파일

- MCP란?: `projects/07-mcp-server/concepts/what-is-mcp.md`
- 아키텍처: `projects/07-mcp-server/concepts/architecture.md`
- 튜토리얼: `projects/07-mcp-server/tutorial/step-01-understand.md`~`step-04-custom.md`
- 커스텀 서버 코드: `projects/07-mcp-server/examples/custom-server/my-time-server.js`
- 서버 설정 예시: `projects/07-mcp-server/exercise/.claude/settings.json`
- 서버 목록: `projects/07-mcp-server/reference/server-list.md`

## 교육 흐름

### Step 1: MCP가 뭔지 이해하기

1. "클로드가 기본으로 할 수 있는 건 파일 읽기, 검색 같은 거예요. 더 많은 걸 하려면?"
2. concepts/what-is-mcp.md를 Read로 읽어 참고
3. MCP의 핵심 구조:
   - **클라이언트** (Claude Code) ← 요청/응답 → **서버** (기능 제공)
   - 식당 비유: 손님(클로드) → 메뉴판(tools/list) → 주문(tools/call) → 요리(결과)
4. "USB 허브에 마우스, 키보드를 꽂듯이, MCP 서버를 연결하면 클로드의 능력이 늘어나요!"

### Step 2: MCP 서버 설정 방법

1. 설정 파일 위치와 구조 설명:
   - 프로젝트별: `.claude/settings.json`
   - 전역: `~/.claude/settings.json`
2. 설정 구조 보여주기:
   ```json
   {
     "mcpServers": {
       "서버이름": {
         "command": "실행 명령어",
         "args": ["인자들"]
       }
     }
   }
   ```
3. exercise의 settings.json을 Read로 읽어 실제 예시 확인
4. "이렇게 설정하면 클로드가 시작할 때 자동으로 서버를 연결해요"

### Step 3: 커스텀 서버 코드 살펴보기

1. "직접 MCP 서버를 만들 수도 있어요! 시간을 알려주는 간단한 서버를 볼게요"
2. `my-time-server.js`를 Read로 읽어 보여주기
3. 코드 구조 설명:
   - `tools/list` 핸들러: "이 서버는 이런 기능이 있어요"라고 알려주기
   - `tools/call` 핸들러: 실제로 기능을 실행하기
4. "메뉴판(list)에 '현재 시간'이라는 메뉴를 올리고, 주문(call)이 들어오면 시간을 알려주는 거예요"
5. 서버 목록(server-list.md)을 Read로 읽어 다양한 서버 소개

### Step 4: 마무리 퀴즈

1. "MCP에서 클라이언트는 누구, 서버는 누구?"
   → 정답: 클라이언트는 Claude Code (요청하는 쪽), 서버는 기능을 제공하는 프로그램
2. "MCP 서버 설정은 어떤 파일에 하나요?"
   → 정답: .claude/settings.json (프로젝트별 또는 전역)
3. "tools/list와 tools/call의 차이는?"
   → 정답: list는 메뉴판(어떤 기능이 있는지), call은 주문(실제 실행)

### 마무리

"MCP는 클로드의 '앱스토어'예요! 필요한 기능을 서버로 연결하면 무한히 확장할 수 있죠.
다음 추천: `/learn 11`로 더 쉬운 MCP 커넥터를 배우거나, `/learn 12`로 Figma MCP를 배워보세요!"
