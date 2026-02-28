# 튜터 지시서: Figma MCP

> 이 파일은 `/learn 12` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Figma MCP를 통해 디자인과 코드를 양방향으로 연결하는 원리를 이해한다.

## 핵심 비유

"건축에서 설계도(Figma 디자인)와 건물(코드)이 따로 놀면 문제가 생기잖아요? Figma MCP는 설계도와 건물을 실시간으로 연결하는 '스마트 도면'이에요! 설계도를 고치면 건물에 반영되고, 건물을 고치면 설계도가 업데이트돼요."

## 연습 파일

- Figma MCP란?: `projects/12-figma-mcp/concepts/what-is-figma-mcp.md`
- 리모트 vs 로컬: `projects/12-figma-mcp/concepts/remote-vs-local-mcp.md`
- 설정 방법: `projects/12-figma-mcp/tutorial/step-01-setup.md`
- 디자인 읽기: `projects/12-figma-mcp/tutorial/step-02-read-design.md`
- Code to Canvas: `projects/12-figma-mcp/tutorial/step-03-code-to-canvas.md`
- 라운드트립: `projects/12-figma-mcp/tutorial/step-04-round-trip.md`
- 예제 카드: `projects/12-figma-mcp/examples/studio-card-to-figma/studio-card.html`

## 교육 흐름

### Step 1: Figma MCP 이해하기

1. "지금까지 배운 MCP(07)와 커넥터(11)를 실전에 적용하는 프로젝트예요!"
2. concepts/what-is-figma-mcp.md를 Read로 읽어 참고
3. 핵심 기능 2가지:
   - **디자인 → 코드**: Figma 디자인을 읽어서 코드 생성
   - **코드 → 디자인 (Code to Canvas)**: HTML/CSS를 Figma 캔버스에 렌더링
4. "건축가(디자이너)가 설계도를 그리면, 시공사(개발자)가 건물을 짓고, 두 사람이 같은 도면을 보는 거예요!"

### Step 2: 리모트 vs 로컬 MCP

1. concepts/remote-vs-local-mcp.md를 Read로 읽어 비교
2. 두 가지 연결 방식:
   - **리모트 MCP (권장)**: Anthropic이 호스팅, claude.ai에서 활성화만 하면 끝
   - **로컬 MCP**: 직접 Figma Dev 서버 설치, API 키 필요
3. "리모트는 학교 Wi-Fi(자동 연결), 로컬은 집에서 직접 공유기 설치(수동)에요"

### Step 3: 디자인 읽기와 Code to Canvas

1. tutorial/step-02를 Read로 읽어 참고
2. 디자인 읽기 과정:
   - Figma 파일 URL을 클로드에게 전달
   - 클로드가 MCP를 통해 디자인 속성을 읽음 (색상, 크기, 폰트, 레이아웃)
   - 읽은 정보로 코드 생성
3. Code to Canvas 시연:
   - 예제 카드 HTML을 Read로 읽어 보여주기: `studio-card.html`
   - "이 HTML/CSS를 Figma 캔버스에 올리면 디자이너가 바로 확인할 수 있어요!"
4. tutorial/step-03을 Read로 읽어 추가 설명

### Step 4: 라운드트립 워크플로우 + 마무리 퀴즈

1. tutorial/step-04를 Read로 읽어 참고
2. 라운드트립 = 양방향 반복:
   - 디자이너가 Figma에서 수정 → 클로드가 변경 감지 → 코드 자동 업데이트
   - 개발자가 코드 수정 → Code to Canvas → Figma에 반영
3. "마치 구글 독스에서 동시 편집하는 것처럼, 디자인과 코드가 실시간으로 동기화돼요!"

퀴즈:
1. "Code to Canvas가 뭔가요?"
   → 정답: HTML/CSS 코드를 Figma 캔버스에 렌더링하는 기능
2. "리모트 MCP와 로컬 MCP 중 설정이 더 간단한 건?"
   → 정답: 리모트 MCP (claude.ai에서 활성화만 하면 됨)
3. "라운드트립 워크플로우의 핵심은?"
   → 정답: 디자인↔코드 양방향 동기화 (수정 → 감지 → 반영 반복)

### 마무리

"축하해요! 12개 프로젝트를 모두 완료했어요! 이제 클로드 코드의 거의 모든 기능을 이해하고 있어요.
배운 내용 정리:
- 기초: 메모리(01), 파일(02), 검색(03), CLI(10)
- 중급: 디버그(03d), 웹(04), 훅(06), 스킬(08), 워크트리(09), 커넥터(11)
- 상급: 팀(05), MCP(07), Figma(12)

다시 배우고 싶은 게 있으면 `/learn` 목록에서 골라주세요!"
