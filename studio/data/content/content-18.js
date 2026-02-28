window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["18-agent-sdk"] = {
  overview: `## Agent SDK — 코드로 나만의 AI 에이전트 만들기

**로봇 조립 키트**를 상상해보세요! 키트에는 팔, 다리, 센서, 모터 같은 부품이 들어있고,
설명서대로 조합하면 나만의 로봇이 완성돼요.

Agent SDK도 똑같아요! SDK가 제공하는 부품(대화, 도구, 설정)을 코드로 조합하면,
터미널에서 직접 대화하지 않아도 **프로그램이 알아서 클로드를 호출**하고 결과를 받아올 수 있어요.

### CLI (직접 대화) vs SDK (코드로 자동화)

\`\`\`
CLI (터미널에서 직접)                SDK (코드로 자동화)
─────────────────────              ─────────────────────
사람이 터미널 열기                   프로그램이 자동 실행
   -> 직접 질문 입력                   -> 코드가 질문 전송
   -> 답변 읽기                        -> 결과를 변수에 저장
   -> 다음 질문 입력                   -> 다음 단계 자동 진행
   -> 반복...                          -> 100개도 자동 처리!

비유: 사람이 리모컨 조작              비유: 로봇이 리모컨 조작
\`\`\`

### 핵심 구성 요소

| 구성 요소 | 설명 | 비유 |
|-----------|------|------|
| SDK 클라이언트 | 클로드와 연결하는 통로 | 로봇의 두뇌 |
| 메시지 | 클로드에게 보내는 요청 | 로봇에게 주는 명령 |
| 커스텀 도구 | 추가 기능 (함수) | 로봇에 붙이는 센서/팔 |
| MCP 서버 | 외부 서비스 연결 | 로봇의 Wi-Fi 연결 |`,

  concepts: [
    {
      id: "what-is-agent-sdk",
      title: "Agent SDK란? (로봇 조립 키트 비유)",
      content: `### 레고 조립처럼 AI 에이전트 만들기

지금까지 클로드는 터미널에서 직접 대화하는 방식으로 사용했어요.
Agent SDK는 **코드로 클로드를 조종**하는 방법이에요.

\`\`\`
레고 조립                            Agent SDK
─────────                           ──────────
[블록들]                              [SDK 부품들]
  머리 블록                             클라이언트 (연결)
  몸통 블록                             메시지 (대화)
  팔 블록                               도구 (기능)
  다리 블록                             설정 (옵션)
     |                                    |
     | 설명서대로 조합                       | 코드로 조합
     v                                    v
[완성된 로봇!]                         [완성된 AI 앱!]
\`\`\`

#### CLI vs SDK — 언제 뭘 쓸까?

| 비교 항목 | CLI (터미널) | SDK (코드) |
|-----------|:----------:|:---------:|
| 사용 방식 | 사람이 직접 입력 | 코드가 자동 실행 |
| 반복 작업 | 매번 직접 해야 함 | 자동으로 반복 |
| 다른 앱 연동 | 어려움 | 쉬움 (API 호출) |
| 대량 처리 | 하나씩 | 100개도 한 번에 |
| 학습 난이도 | 쉬움 | 프로그래밍 필요 |
| 적합한 상황 | 탐색, 1회성 작업 | 자동화, 앱 개발 |

#### SDK를 쓰면 뭘 할 수 있을까?

\`\`\`
1. 자동 코드 리뷰 봇
   PR이 올라오면 -> SDK가 클로드 호출 -> 리뷰 결과 댓글로 작성

2. 데이터 분석 파이프라인
   새 데이터 도착 -> SDK가 클로드 호출 -> 분석 보고서 자동 생성

3. 고객 지원 챗봇
   고객 질문 도착 -> SDK가 클로드 호출 -> 답변 자동 전송

4. 파일 정리 에이전트
   폴더 감시 -> 새 파일 감지 -> SDK가 분류 요청 -> 자동 이동
\`\`\``
    },
    {
      id: "python-vs-typescript",
      title: "Python SDK vs TypeScript SDK",
      content: `### 두 가지 프로그래밍 언어로 만들기

Agent SDK는 **Python**과 **TypeScript** 두 가지 버전이 있어요.
같은 레고 세트를 한국어 설명서와 영어 설명서로 조립하는 것처럼,
어떤 언어를 선택하든 결과물은 같아요!

\`\`\`
Python SDK                          TypeScript SDK
───────────                         ────────────────
pip install                         npm install
claude-code-sdk                     @anthropic-ai/claude-code

데이터 분석에 강함                    웹 앱 개발에 강함
Jupyter 노트북 호환                  Next.js/React 통합
ML 라이브러리 풍부                   프론트엔드 생태계
\`\`\`

#### 설치 및 기본 코드 비교

**Python:**

\`\`\`python
# 설치: pip install claude-code-sdk
from claude_code_sdk import query, ClaudeCodeOptions

# 기본 대화
result = await query(
    prompt="Hello! What can you do?",
    options=ClaudeCodeOptions(max_turns=3)
)

# 결과 처리
for message in result:
    if message.type == "text":
        print(message.content)
\`\`\`

**TypeScript:**

\`\`\`typescript
// 설치: npm install @anthropic-ai/claude-code
import { query, type ClaudeCodeOptions } from "@anthropic-ai/claude-code";

// 기본 대화
const result = await query({
  prompt: "Hello! What can you do?",
  options: { maxTurns: 3 }
});

// 결과 처리
for (const message of result) {
  if (message.type === "text") {
    console.log(message.content);
  }
}
\`\`\`

#### 선택 가이드

\`\`\`
어떤 SDK를 선택할까?
├── 데이터 분석 / ML 프로젝트?
│   └── Python SDK
├── 웹 앱 / API 서버?
│   └── TypeScript SDK
├── 스크립트 / 자동화?
│   └── 둘 다 OK (본인이 편한 언어)
└── 잘 모르겠다?
    └── Python SDK (시작하기 쉬움)
\`\`\``
    },
    {
      id: "custom-tools-mcp",
      title: "커스텀 도구와 MCP 서버 통합",
      content: `### 로봇에 새 팔과 센서 붙이기

기본 SDK로도 클로드와 대화할 수 있지만,
**커스텀 도구**를 추가하면 클로드가 외부 시스템과 상호작용할 수 있어요!

\`\`\`
기본 SDK (대화만)                    커스텀 도구 추가
──────────────                     ─────────────────
[클로드]                             [클로드]
  "안녕하세요!"                         "파일을 분석하겠습니다"
  "도와드릴까요?"                       -> read_file() 호출
  (대화만 가능)                         -> analyze_data() 호출
                                       -> save_report() 호출
                                       (실제 작업 수행!)
\`\`\`

#### 커스텀 도구 구조

\`\`\`python
# 도구 정의 = 이름 + 설명 + 입력 스키마
{
    "name": "get_weather",
    "description": "도시의 날씨 정보를 가져옵니다",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "도시 이름"
            }
        }
    }
}

# 도구 실행 함수
def get_weather(city):
    # API 호출로 날씨 정보 가져오기
    return {"temp": 22, "condition": "sunny"}
\`\`\`

#### MCP 서버 연동

07번에서 배운 MCP 서버를 SDK 앱에 연결할 수 있어요!

\`\`\`
SDK 앱 ──── MCP 서버 ──── 외부 서비스
                |
                |── 데이터베이스
                |── Slack
                |── GitHub
                |── 파일 시스템
\`\`\`

\`\`\`python
# MCP 서버를 SDK에 연결
result = await query(
    prompt="GitHub에서 오픈 이슈를 분석해줘",
    options=ClaudeCodeOptions(
        mcp_servers={
            "github": {
                "command": "npx",
                "args": ["-y", "@anthropic-ai/mcp-github"]
            }
        }
    )
)
\`\`\`

#### 도구 추가의 효과

| 도구 없음 | 도구 있음 |
|-----------|----------|
| 대화만 가능 | 파일 읽기/쓰기 |
| 추측으로 답변 | 실제 데이터 기반 답변 |
| 한정된 기능 | 무한 확장 가능 |

> **비유**: 기본 로봇은 말만 할 수 있지만, 팔(도구)을 붙이면 물건을 집을 수 있고,
> 센서(MCP)를 붙이면 주변을 감지할 수 있어요!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 Agent SDK 앱 (Python 기초)",
      content: `### 첫 번째 AI 로봇 조립하기

Python SDK를 설치하고 첫 번째 앱을 만들어봐요!

#### 1단계: 설치

\`\`\`bash
# Python SDK 설치
pip install claude-code-sdk

# 또는 TypeScript SDK
npm install @anthropic-ai/claude-code
\`\`\`

#### 2단계: 기본 앱 만들기

\`\`\`python
# my_first_agent.py
import asyncio
from claude_code_sdk import query, ClaudeCodeOptions

async def main():
    # 클로드에게 질문하기
    result = await query(
        prompt="이 폴더에 어떤 파일들이 있는지 알려줘",
        options=ClaudeCodeOptions(
            max_turns=3,          # 최대 3번 대화
            cwd="/path/to/project" # 작업 디렉토리
        )
    )

    # 결과 출력
    for message in result:
        if message.type == "text":
            print(message.content)

asyncio.run(main())
\`\`\`

#### 3단계: 실행

\`\`\`bash
python my_first_agent.py
\`\`\`

> **포인트**: \`query()\` 함수 하나로 클로드와 대화할 수 있어요!
> \`prompt\`에 질문을 넣고, \`options\`로 세부 설정을 조절하면 됩니다.`,
      terminals: [
        {
          command: "# Python SDK 설치 및 첫 실행",
          output: `$ pip install claude-code-sdk
Collecting claude-code-sdk
  Downloading claude_code_sdk-0.1.12-py3-none-any.whl (45 kB)
Installing collected packages: claude-code-sdk
Successfully installed claude-code-sdk-0.1.12

$ python my_first_agent.py

이 폴더에는 다음 파일들이 있습니다:

- README.md (프로젝트 설명)
- src/ (소스 코드 폴더)
  - index.ts
  - utils.ts
- package.json (의존성 관리)
- tsconfig.json (TypeScript 설정)

총 6개 파일/폴더가 있습니다.`
        },
        {
          command: "# 스트리밍 모드로 실시간 출력",
          output: `$ python streaming_agent.py

[스트리밍 시작]
이 프로젝트를 분석하겠습니다...

[도구 호출: Read - package.json]
[도구 호출: Read - src/index.ts]

분석 결과:
- TypeScript 프로젝트
- Express.js 기반 API 서버
- 의존성 5개 사용 중
[스트리밍 완료]`
        }
      ]
    },
    {
      id: "step-02",
      title: "커스텀 도구 추가하기",
      content: `### 로봇에 새로운 기능 붙이기

기본 SDK는 대화만 가능해요. 커스텀 도구를 추가하면
클로드가 **실제 작업**을 수행할 수 있어요!

#### 도구 정의 구조

\`\`\`python
# 1. 도구 스키마 정의 (설명서 만들기)
weather_tool = {
    "name": "get_weather",
    "description": "도시의 현재 날씨를 조회합니다",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "날씨를 조회할 도시 이름"
            }
        },
        "required": ["city"]
    }
}

# 2. 도구 실행 함수 (실제 동작)
def handle_weather(city: str) -> str:
    # 실제로는 API를 호출하지만, 예시로 간단하게
    weather_data = {
        "서울": "맑음, 22도",
        "부산": "흐림, 19도"
    }
    return weather_data.get(city, "정보 없음")
\`\`\`

#### 실전 예제: 파일 분석 도구

\`\`\`python
import asyncio
from claude_code_sdk import query, ClaudeCodeOptions

# 파일 크기를 확인하는 커스텀 도구
file_size_tool = {
    "name": "check_file_size",
    "description": "파일의 크기를 바이트 단위로 확인합니다",
    "input_schema": {
        "type": "object",
        "properties": {
            "path": {
                "type": "string",
                "description": "확인할 파일 경로"
            }
        },
        "required": ["path"]
    }
}

async def main():
    result = await query(
        prompt="src 폴더에서 가장 큰 파일을 찾아줘",
        options=ClaudeCodeOptions(
            max_turns=5,
            allowed_tools=["Read", "Bash", "check_file_size"]
        )
    )
    for msg in result:
        if msg.type == "text":
            print(msg.content)

asyncio.run(main())
\`\`\`

> **비유**: 도구 = 로봇의 팔. 팔이 없으면 말만 하지만, 팔을 붙이면 물건을 집을 수 있어요!`,
      terminals: [
        {
          command: "# 커스텀 도구가 있는 앱 실행",
          output: `$ python tool_agent.py

[도구 호출: check_file_size("src/index.ts")]
  -> 결과: 2,450 bytes

[도구 호출: check_file_size("src/utils.ts")]
  -> 결과: 8,120 bytes

[도구 호출: check_file_size("src/routes.ts")]
  -> 결과: 5,300 bytes

분석 결과:
src 폴더에서 가장 큰 파일은 utils.ts (8,120 bytes)입니다.

파일 크기 순위:
1. src/utils.ts     - 8,120 bytes
2. src/routes.ts    - 5,300 bytes
3. src/index.ts     - 2,450 bytes`
        }
      ]
    },
    {
      id: "step-03",
      title: "MCP 서버와 연동하기",
      content: `### 로봇에 Wi-Fi 연결하기 (외부 서비스 접근)

MCP 서버를 SDK 앱에 연결하면, 클로드가 외부 서비스
(GitHub, 데이터베이스, Slack 등)에 접근할 수 있어요.

#### MCP 서버 설정

\`\`\`python
import asyncio
from claude_code_sdk import query, ClaudeCodeOptions

async def main():
    result = await query(
        prompt="GitHub 저장소의 최근 이슈를 분석해줘",
        options=ClaudeCodeOptions(
            max_turns=10,
            # MCP 서버 연결 설정
            mcp_servers={
                "github": {
                    "command": "npx",
                    "args": [
                        "-y",
                        "@modelcontextprotocol/server-github"
                    ],
                    "env": {
                        "GITHUB_TOKEN": "ghp_xxxxx"
                    }
                }
            }
        )
    )

    for msg in result:
        if msg.type == "text":
            print(msg.content)

asyncio.run(main())
\`\`\`

#### 여러 MCP 서버 동시 연결

\`\`\`python
options = ClaudeCodeOptions(
    mcp_servers={
        "github": { ... },
        "slack": {
            "command": "npx",
            "args": ["-y", "@anthropic-ai/mcp-slack"]
        },
        "database": {
            "command": "npx",
            "args": ["-y", "@anthropic-ai/mcp-postgres"],
            "env": { "DATABASE_URL": "..." }
        }
    }
)
\`\`\`

#### 흐름도

\`\`\`
[SDK 앱]
   |
   |-- query("이슈를 분석하고 Slack에 보고해줘")
   |
   v
[클로드]
   |-- MCP: GitHub에서 이슈 목록 가져오기
   |-- 분석: 이슈 분류 및 우선순위 정리
   |-- MCP: Slack 채널에 보고서 전송
   |
   v
[결과 반환]
\`\`\`

> **비유**: MCP 서버 = 로봇의 Wi-Fi. 연결하면 인터넷에서 정보를 가져오고,
> 다른 서비스에 메시지를 보낼 수 있어요!`,
      terminals: [
        {
          command: "# MCP 서버 연동 앱 실행",
          output: `$ python mcp_agent.py

[MCP 연결: github 서버 시작]
[MCP 연결: slack 서버 시작]

[도구 호출: github.list_issues(state="open")]
  -> 12개 오픈 이슈 발견

[분석 중...]
  버그: 5건, 기능 요청: 4건, 개선: 3건

[도구 호출: slack.send_message(channel="#dev")]
  -> 보고서 전송 완료

완료! GitHub 이슈 분석 보고서를 Slack #dev 채널에 전송했습니다.

요약:
- 긴급 버그: 2건 (즉시 수정 필요)
- 일반 버그: 3건
- 기능 요청: 4건 (다음 스프린트 후보)
- 개선 사항: 3건`
        },
        {
          command: "# 여러 MCP 서버 동시 사용",
          output: `$ python multi_mcp_agent.py

[MCP 연결: github, slack, postgres 서버 시작]

> "DB에서 이번 달 주문 데이터를 분석하고,
   GitHub에 이슈로 등록하고, Slack에 알려줘"

[postgres] 이번 달 주문 데이터 조회: 1,234건
[분석] 전월 대비 15% 증가, 특이 패턴 3건 발견
[github] 이슈 #45 생성: "주문 패턴 이상 감지 보고"
[slack] #analytics 채널에 요약 전송

모든 작업이 완료되었습니다!`
        }
      ]
    }
  ],

  examples: [
    {
      id: "file-organizer",
      title: "파일 정리 에이전트 만들기",
      content: `### 폴더의 파일을 자동으로 분류하는 에이전트

다운로드 폴더에 파일이 쌓여있을 때, AI가 자동으로 분류해주는 에이전트예요.

#### 전체 구조

\`\`\`
[다운로드 폴더]              [정리된 폴더]
  report.pdf                  문서/
  photo.jpg                     report.pdf
  song.mp3          ->        이미지/
  code.py                       photo.jpg
  movie.mp4                   음악/
                                song.mp3
                              코드/
                                code.py
                              영상/
                                movie.mp4
\`\`\`

#### 코드

\`\`\`python
import asyncio
from claude_code_sdk import query, ClaudeCodeOptions

async def organize_files():
    result = await query(
        prompt="""
        ~/Downloads 폴더의 파일을 분석하고,
        확장자와 내용에 따라 다음 카테고리로 분류해줘:
        - 문서 (pdf, docx, txt)
        - 이미지 (jpg, png, gif)
        - 코드 (py, js, ts)
        - 음악 (mp3, wav)
        - 영상 (mp4, avi)

        각 파일을 해당 카테고리 폴더로 이동해줘.
        이동 전에 계획을 먼저 보여주고,
        확인 후 실행해줘.
        """,
        options=ClaudeCodeOptions(
            max_turns=10,
            cwd="/Users/me/Downloads",
            allowed_tools=["Read", "Bash", "Write"]
        )
    )

    for msg in result:
        if msg.type == "text":
            print(msg.content)

asyncio.run(organize_files())
\`\`\`

#### 실행 결과

\`\`\`
$ python file_organizer.py

파일 분석 중...
총 15개 파일 발견:

이동 계획:
  report.pdf     -> 문서/report.pdf
  photo.jpg      -> 이미지/photo.jpg
  code.py        -> 코드/code.py
  ...

[실행] 5개 폴더 생성, 15개 파일 이동 완료!
\`\`\`

> **활용**: 이 에이전트를 cron 작업에 등록하면 매일 자동으로 폴더를 정리해줘요!`,
      checklist: [
        "SDK로 파일 정리 에이전트의 구조를 이해한다",
        "query() 함수에 상세한 프롬프트를 전달하는 방법을 안다",
        "allowed_tools로 사용 가능한 도구를 제한할 수 있다",
        "cwd 옵션으로 작업 디렉토리를 지정할 수 있다"
      ]
    },
    {
      id: "code-reviewer",
      title: "코드 리뷰 에이전트 만들기",
      content: `### PR이 올라오면 자동으로 코드 리뷰하는 에이전트

GitHub에 PR(Pull Request)이 올라오면, AI가 자동으로 코드를 읽고
리뷰 코멘트를 작성하는 에이전트예요.

#### 전체 흐름

\`\`\`
[GitHub PR]
     |
     | 웹훅으로 알림
     v
[코드 리뷰 에이전트]
     |
     |-- 1. 변경된 파일 목록 가져오기
     |-- 2. 각 파일의 diff 분석
     |-- 3. 코드 품질 검토
     |-- 4. 리뷰 코멘트 작성
     |
     v
[GitHub에 리뷰 등록]
\`\`\`

#### 코드

\`\`\`python
import asyncio
from claude_code_sdk import query, ClaudeCodeOptions

async def review_pr(pr_number: int):
    result = await query(
        prompt=f"""
        GitHub PR #{pr_number}을 리뷰해줘.

        다음 관점으로 검토해줘:
        1. 코드 품질 (가독성, 네이밍)
        2. 버그 가능성 (엣지 케이스, null 체크)
        3. 보안 (입력 검증, 인젝션)
        4. 성능 (불필요한 루프, 메모리 누수)

        각 파일별로 구체적인 피드백을 줘.
        심각도: CRITICAL / WARNING / INFO로 분류해줘.
        """,
        options=ClaudeCodeOptions(
            max_turns=15,
            mcp_servers={{
                "github": {{
                    "command": "npx",
                    "args": ["-y", "@anthropic-ai/mcp-github"],
                    "env": {{"GITHUB_TOKEN": "ghp_xxxxx"}}
                }}
            }}
        )
    )

    review_text = ""
    for msg in result:
        if msg.type == "text":
            review_text += msg.content

    return review_text

# 실행
review = asyncio.run(review_pr(42))
print(review)
\`\`\`

#### 리뷰 결과 예시

\`\`\`
=== PR #42 코드 리뷰 ===

src/auth/login.ts:
  [CRITICAL] Line 23: 비밀번호를 평문으로 비교 중
    -> bcrypt.compare()를 사용하세요

  [WARNING] Line 45: try-catch에 에러 처리가 없음
    -> 에러를 로깅하거나 사용자에게 안내하세요

src/utils/format.ts:
  [INFO] Line 12: 변수명 'd'는 의미가 불분명
    -> 'formattedDate'처럼 명확한 이름을 추천

전체 요약:
  CRITICAL: 1건 (즉시 수정)
  WARNING: 3건 (수정 권장)
  INFO: 5건 (개선 제안)
\`\`\`

> **팁**: 이 에이전트를 GitHub Actions에 연결하면, PR마다 자동으로 리뷰가 달려요!`,
      checklist: [
        "코드 리뷰 에이전트의 전체 흐름을 이해한다",
        "MCP 서버(GitHub)를 SDK에 연결하는 방법을 안다",
        "프롬프트에 리뷰 관점을 구체적으로 지정하는 방법을 안다",
        "CI/CD에 에이전트를 연결하는 개념을 이해한다"
      ]
    }
  ],

  quiz: [
    {
      question: "Agent SDK와 CLI의 가장 큰 차이는?",
      options: [
        "SDK가 더 빠르다",
        "SDK는 코드로 프로그래밍하여 자동화할 수 있고, CLI는 사람이 직접 대화한다",
        "CLI가 더 많은 기능을 제공한다"
      ],
      answer: 1,
      explanation: "CLI는 사람이 터미널에서 직접 대화하는 방식이고, SDK는 코드로 클로드를 호출하여 자동화할 수 있습니다. 로봇이 리모컨을 조작하는 것과 같아요."
    },
    {
      question: "Python SDK와 TypeScript SDK 중 웹 앱 개발에 더 적합한 것은?",
      options: [
        "Python SDK",
        "TypeScript SDK",
        "둘 다 동일하다"
      ],
      answer: 1,
      explanation: "TypeScript SDK는 Next.js, React 등 웹 프레임워크와 자연스럽게 통합되므로 웹 앱 개발에 더 적합합니다. Python SDK는 데이터 분석이나 ML에 강합니다."
    },
    {
      question: "커스텀 도구를 추가하면 어떤 점이 달라지나요?",
      options: [
        "클로드의 대화 속도가 빨라진다",
        "클로드가 외부 시스템과 상호작용하며 실제 작업을 수행할 수 있다",
        "클로드의 답변 품질이 향상된다"
      ],
      answer: 1,
      explanation: "커스텀 도구는 로봇의 팔과 같아요. 도구 없이는 대화만 가능하지만, 도구를 추가하면 파일을 읽거나 API를 호출하는 등 실제 작업을 수행할 수 있습니다."
    },
    {
      question: "MCP 서버를 SDK에 연결하는 이유는?",
      options: [
        "SDK의 실행 속도를 높이기 위해",
        "클로드가 GitHub, Slack, DB 등 외부 서비스에 접근할 수 있게 하기 위해",
        "SDK의 보안을 강화하기 위해"
      ],
      answer: 1,
      explanation: "MCP 서버는 로봇의 Wi-Fi와 같아요. 연결하면 클로드가 GitHub에서 이슈를 가져오거나, Slack에 메시지를 보내거나, DB에서 데이터를 조회할 수 있게 됩니다."
    },
    {
      question: "코드 리뷰 에이전트를 CI/CD에 연결하면?",
      options: [
        "코드가 자동으로 수정된다",
        "PR이 올라올 때마다 자동으로 코드 리뷰가 실행된다",
        "테스트가 자동으로 작성된다"
      ],
      answer: 1,
      explanation: "코드 리뷰 에이전트를 GitHub Actions 등 CI/CD에 연결하면, 새 PR이 올라올 때마다 자동으로 코드를 분석하고 리뷰 코멘트를 작성합니다."
    }
  ]
};
