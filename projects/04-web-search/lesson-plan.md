# 튜터 지시서: 웹 검색

> 이 파일은 `/learn 04` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

WebSearch와 WebFetch를 사용하여 인터넷에서 실시간 정보를 가져오는 방법을 배운다.

## 핵심 비유

"WebSearch는 비서에게 '이거 좀 찾아봐'라고 부탁하는 거예요. WebFetch는 '이 주소에 가서 내용 읽어와'라고 시키는 거예요. 비서(Search)는 여러 결과를 가져오고, 직접 방문(Fetch)은 특정 페이지를 자세히 봐요."

## 연습 파일

- 검색 기초: `projects/04-web-search/examples/search-basics/README.md`
- 페치 분석: `projects/04-web-search/examples/fetch-analyze/README.md`
- 리서치 프로젝트: `projects/04-web-search/examples/research-project/README.md`

## 교육 흐름

### Step 1: WebSearch — 인터넷 검색

1. "클로드의 지식에는 시간 제한이 있어요. 최신 정보가 필요하면 WebSearch를 써요!"
2. WebSearch 도구 설명:
   - `query`: 검색어 (구글에 입력하듯이)
   - `allowed_domains`: 특정 사이트에서만 검색 (선택)
   - `blocked_domains`: 특정 사이트 제외 (선택)
3. 실제 시연: 간단한 검색 실행
   - 예: "Claude Code 최신 버전" 검색
4. 도메인 필터 시연:
   - `allowed_domains: ["docs.anthropic.com"]` → 공식 문서에서만 검색
5. 사용자에게 제안: "궁금한 게 있으면 검색해볼까요? 어떤 걸 검색하고 싶어요?"

### Step 2: WebFetch — 페이지 방문

1. "특정 웹페이지의 내용을 자세히 보고 싶을 때 WebFetch를 써요"
2. WebFetch 도구 설명:
   - `url`: 방문할 주소 (https://...)
   - `prompt`: "이 페이지에서 뭘 찾아줘?"라는 지시
3. 실제 시연: Anthropic 문서 페이지 가져오기
   - 예: `WebFetch("https://docs.anthropic.com/en/docs/claude-code", prompt="주요 기능 목록을 알려줘")`
4. **제한사항 설명**:
   - 로그인이 필요한 사이트는 접근 불가 (Google Docs, Notion 등)
   - HTML을 마크다운으로 변환해서 보여줌
   - 15분 캐시 (같은 URL을 다시 가져오면 빠름)
5. 연습: 사용자가 원하는 웹페이지를 fetch 해보기

### Step 3: 검색 + 페치 콤보

1. "진짜 리서치는 두 도구를 함께 쓸 때 빛나요!"
2. 시나리오: "최신 Claude API 변경사항 조사하기"
   - Step A: WebSearch("Claude API 변경사항 2026") → 관련 페이지 URL 확인
   - Step B: 가장 관련 있는 URL을 WebFetch로 자세히 읽기
   - Step C: 핵심 내용 정리해서 알려주기
3. 프로젝트의 예제 README를 Read로 보여주며 추가 시나리오 소개

### Step 4: 마무리 퀴즈

1. "WebSearch와 WebFetch의 가장 큰 차이는?"
   → 정답: Search는 여러 결과를 찾아주고, Fetch는 특정 URL의 내용을 자세히 읽어옴
2. "로그인이 필요한 사이트(Google Docs 등)를 WebFetch할 수 있나요?"
   → 정답: 불가능! 로그인 없이 접근 가능한 공개 페이지만 가져올 수 있음
3. "WebFetch의 prompt 파라미터는 왜 필요해요?"
   → 정답: 페이지 내용이 많을 수 있어서, 원하는 정보를 지정해야 효율적으로 추출 가능

### 마무리

"이제 인터넷의 최신 정보도 활용할 수 있어요! 모르는 게 있으면 검색하고, 특정 페이지를 깊이 읽을 수 있죠.
다음 추천: `/learn 06`으로 Hooks를 배우거나, `/learn 08`로 나만의 커맨드를 만들어보세요!"
