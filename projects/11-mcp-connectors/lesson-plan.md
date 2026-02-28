# 튜터 지시서: MCP 커넥터

> 이 파일은 `/learn 11` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

MCP 커넥터와 ToolSearch를 이해하고, Slack/Notion 같은 서비스를 간편하게 연결하는 방법을 배운다.

## 핵심 비유

"07에서 배운 MCP 서버가 집에 프린터를 직접 설치하는 거였다면, MCP 커넥터는 학교 공유 프린터예요! 설치할 필요 없이 연결만 하면 바로 사용할 수 있어요."

## 연습 파일

- 커넥터란?: `projects/11-mcp-connectors/concepts/what-are-connectors.md`
- 수동 vs 커넥터: `projects/11-mcp-connectors/concepts/manual-vs-connector.md`
- 설정 방법: `projects/11-mcp-connectors/tutorial/step-01-setup.md`
- 사용하기: `projects/11-mcp-connectors/tutorial/step-02-use-connectors.md`
- ToolSearch: `projects/11-mcp-connectors/tutorial/step-03-toolsearch.md`
- Slack 예제: `projects/11-mcp-connectors/examples/slack-connector/README.md`
- Notion 예제: `projects/11-mcp-connectors/examples/notion-connector/README.md`

## 교육 흐름

### Step 1: 커넥터 vs 수동 MCP

1. "07에서 MCP 서버를 직접 설정하는 걸 배웠죠? 커넥터는 그걸 훨씬 쉽게 해줘요!"
2. concepts/manual-vs-connector.md를 Read로 읽어 비교:
   - **수동 MCP (07)**: settings.json에 직접 설정, API 키 필요
   - **커넥터 (11)**: claude.ai에서 클릭 한 번, OAuth 자동 인증
3. 커넥터의 장점:
   - API 키 관리 불필요 (OAuth로 자동)
   - Anthropic이 서버를 관리/업데이트
   - 설정이 간단 (UI에서 클릭)
4. "앱스토어에서 앱 설치하는 것처럼 간단해요!"

### Step 2: 커넥터 활성화하기

1. tutorial/step-01을 Read로 읽어 참고
2. 활성화 방법 설명:
   - claude.ai → 설정 → 커넥터 탭
   - 원하는 서비스 활성화 (Slack, Notion, Linear 등)
   - OAuth 인증 진행
3. 사용 가능한 커넥터 소개:
   - **Slack**: 메시지 읽기/검색/보내기
   - **Notion**: 페이지 검색/읽기/만들기
   - **Linear**: 이슈 관리
   - **GitHub**: 리포지토리 관리
4. "한 번 연결하면 클로드가 직접 Slack 메시지를 읽거나 Notion 페이지를 만들 수 있어요!"

### Step 3: ToolSearch — 도구 찾기

1. tutorial/step-03을 Read로 읽어 참고
2. ToolSearch 도구 설명:
   - 커넥터로 추가된 도구는 처음에 숨겨져 있음 (성능을 위해)
   - `ToolSearch`로 필요한 도구를 찾아 활성화
   - 키워드 검색: `ToolSearch("slack message")`
   - 직접 선택: `ToolSearch("select:mcp__slack__read_channel")`
3. "게임에서 인벤토리를 열어 아이템을 찾는 것처럼, ToolSearch로 필요한 도구를 꺼내 쓰는 거예요!"
4. 실습 제안: "지금 이 세션에서 사용 가능한 커넥터 도구를 검색해볼까요?"

### Step 4: 마무리 퀴즈

1. "MCP 커넥터와 수동 MCP의 가장 큰 차이는?"
   → 정답: 커넥터는 API 키 없이 OAuth로 자동 인증되고, 설정이 훨씬 간단
2. "커넥터로 추가된 도구를 처음에 바로 쓸 수 없는 이유는?"
   → 정답: 성능을 위해 숨겨져 있어서, ToolSearch로 먼저 활성화해야 함
3. "ToolSearch에서 'select:도구이름' 형식은 언제 쓰나요?"
   → 정답: 정확한 도구 이름을 알 때 직접 선택할 때

### 마무리

"커넥터를 쓰면 Slack, Notion 같은 서비스를 클로드와 바로 연결할 수 있어요! 07에서 배운 MCP의 '쉬운 버전'이라고 생각하면 돼요.
다음 추천: `/learn 12`로 Figma MCP를 배워보세요! 디자인과 코드를 연결하는 최종 프로젝트예요!"
