# 튜터 지시서: Agent SDK

> 이 파일은 `/learn 18` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Agent SDK를 활용해 프로그래밍 방식으로 AI 에이전트를 만드는 원리를 이해한다.

## 핵심 비유

"로봇 조립 키트처럼, 부품(도구)을 조합해서 나만의 AI 로봇 만들기! 레고 블록을 끼워 맞추듯이, SDK가 제공하는 부품(대화, 도구, 설정)을 조합하면 내가 원하는 AI 앱을 만들 수 있어요!"

## 연습 파일

- Agent SDK란?: `projects/18-agent-sdk/concepts/what-is-agent-sdk.md`
- Python vs TypeScript SDK: `projects/18-agent-sdk/concepts/python-vs-typescript.md`
- 커스텀 도구와 MCP: `projects/18-agent-sdk/concepts/custom-tools-mcp.md`
- 첫 앱 만들기: `projects/18-agent-sdk/tutorial/step-01-first-app.md`
- 커스텀 도구 추가: `projects/18-agent-sdk/tutorial/step-02-custom-tools.md`
- MCP 서버 연동: `projects/18-agent-sdk/tutorial/step-03-mcp-integration.md`
- 예제 - 파일 정리 에이전트: `projects/18-agent-sdk/examples/file-organizer/`
- 예제 - 코드 리뷰 에이전트: `projects/18-agent-sdk/examples/code-reviewer/`

## 교육 흐름

### Step 1: Agent SDK란? (CLI 확장 vs 프로그래밍 방식)

1. "지금까지는 터미널에서 직접 클로드와 대화했죠? 이번에는 코드로 클로드를 조종하는 방법을 배워요!"
2. concepts/what-is-agent-sdk.md를 Read로 읽어 참고
3. CLI vs SDK 차이:
   - **CLI**: 터미널에서 직접 대화 (사람이 직접 리모컨 조작)
   - **SDK**: 코드로 프로그래밍 (로봇이 리모컨 조작)
4. SDK를 쓰는 이유:
   - 반복 작업 자동화 (매번 직접 할 필요 없음)
   - 다른 앱에 AI 기능 내장 (웹사이트, 앱에서 클로드 사용)
   - 대량 처리 (파일 100개를 한 번에 분석)
5. "레고 블록처럼, SDK는 여러 부품을 제공하고 우리가 원하는 대로 조합하는 거예요!"

**확인 질문**: "CLI와 SDK의 가장 큰 차이는 뭘까요?"
→ 기대 답변: CLI는 사람이 직접 대화하는 것, SDK는 코드로 자동화하는 것

### Step 2: Python SDK vs TypeScript SDK 비교 & 첫 앱

1. concepts/python-vs-typescript.md를 Read로 읽어 비교
2. 두 SDK 비교:
   - **Python SDK** (`claude-code-sdk`): 설치 간편, 데이터 분석에 강점
   - **TypeScript SDK** (`@anthropic-ai/claude-code`): 웹 앱 통합에 강점
3. tutorial/step-01-first-app.md를 Read로 읽어 실습 안내
4. 첫 앱 구조:
   - SDK 설치 → 클라이언트 생성 → 메시지 보내기 → 응답 받기
5. "처음 레고 세트를 열었을 때 설명서부터 보는 것처럼, SDK도 기본 구조부터 이해하면 돼요!"

**확인 질문**: "Python과 TypeScript SDK 중 데이터 분석에 더 좋은 건?"
→ 기대 답변: Python SDK (데이터 분석 라이브러리가 풍부하니까)

### Step 3: 커스텀 도구와 MCP 서버 통합

1. concepts/custom-tools-mcp.md를 Read로 읽어 참고
2. 커스텀 도구란?:
   - SDK에서 직접 도구(함수)를 정의해서 클로드에게 제공
   - 클로드가 필요할 때 자동으로 호출
3. MCP 서버 연동:
   - 이미 만든 MCP 서버를 SDK 앱에 연결
   - 외부 서비스(DB, API 등)와 통합
4. tutorial/step-02-custom-tools.md를 Read로 실습
5. tutorial/step-03-mcp-integration.md를 Read로 실습
6. "레고에 모터나 센서를 추가하면 로봇이 더 똑똑해지는 것처럼, 커스텀 도구를 추가하면 에이전트가 더 많은 일을 할 수 있어요!"

### Step 4: 마무리 퀴즈

1. 예제 소개:
   - 파일 정리 에이전트: 폴더 안의 파일을 자동으로 분류
   - 코드 리뷰 에이전트: 코드를 읽고 피드백 제공
2. 실전 활용 시나리오:
   - CI/CD에서 자동 코드 리뷰
   - Slack 봇으로 팀 질문 답변
   - 데이터 파이프라인에서 AI 분석

퀴즈:
1. "Agent SDK와 CLI의 가장 큰 차이는?"
   → 정답: SDK는 코드로 프로그래밍하여 자동화할 수 있고, CLI는 사람이 직접 터미널에서 대화
2. "커스텀 도구를 추가하면 뭐가 좋아지나요?"
   → 정답: 클로드가 외부 시스템(DB, API 등)과 상호작용하며 더 많은 작업을 수행할 수 있음
3. "SDK로 만든 에이전트의 실전 활용 예시를 하나 말해보세요."
   → 정답: CI/CD 코드 리뷰, Slack 봇, 데이터 분석 파이프라인 등

### 마무리

"축하해요! Agent SDK로 나만의 AI 에이전트를 만드는 방법을 배웠어요!
기억할 것:
- SDK = 코드로 클로드를 조종하는 리모컨
- Python SDK와 TypeScript SDK 중 프로젝트에 맞는 걸 선택
- 커스텀 도구와 MCP 서버를 추가하면 에이전트의 능력이 무한 확장

다음 추천: `/learn 19`로 권한 심화를 배우거나, `/learn 20`으로 IDE 통합을 배워보세요!"
