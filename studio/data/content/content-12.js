window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["12-figma-mcp"] = {
  overview: `## Figma MCP — 디자인과 코드를 연결하기

집을 지을 때 **건축가(디자이너)**는 도면을 그리고, **시공사(개발자)**는 도면을 보고 짓습니다.
그런데 도면을 PDF로 주고받으면? "이거 몇 px이야?", "색상 코드가 뭐야?" 같은 질문이 끊이지 않죠.

**Figma MCP**는 건축가와 시공사가 **살아있는 공유 도면**을 보는 것과 같습니다!

### 기존 방식 vs Figma MCP

\`\`\`
PDF 도면 (기존 방식)                살아있는 공유 도면 (Figma MCP)
─────────────────────              ─────────────────────────────────
디자이너 → PDF 출력                 디자이너 → Figma에서 디자인
         → 이메일 전달                        ↕ (실시간 공유)
개발자   → PDF 보고 추측            개발자+Claude → 정확한 값 자동 읽기
         → "이거 맞아?" 반복                    → 코드를 Figma에 올려서 비교
                                              → 차이점 자동 감지
\`\`\`

### 핵심 기능 3가지

| 기능 | 설명 | 비유 |
|------|------|------|
| 디자인 읽기 | Figma의 색상, 크기, 간격을 코드로 가져오기 | 도면의 치수 자동 읽기 |
| Code to Canvas | HTML/CSS 코드를 Figma에 렌더링 | 시공 결과를 도면 위에 겹치기 |
| 라운드트립 | 수정 → 감지 → 반영의 순환 | 도면과 시공 결과 계속 비교 |`,

  concepts: [
    {
      id: "what-is-figma-mcp",
      title: "Figma MCP란? (건축가-시공사 비유)",
      content: `### 건축가와 시공사의 공유 도면

건축 현장을 상상해봅시다:

\`\`\`
건축가 (= 디자이너)           시공사 (= 개발자)
━━━━━━━━━━━━━━━━             ━━━━━━━━━━━━━━━━
도면을 그린다                 도면을 보고 짓는다
"창문은 120cm"                "120cm로 시공"
"벽 색상: #F5F5F5"            "이 색으로 칠함"
\`\`\`

#### 기존 방식의 문제 (PDF 도면)

\`\`\`
건축가 → PDF 출력 → 이메일 → 시공사
                                 ↓
                          "이 치수 맞아요?"
                          "색상 코드 뭐예요?"
                          "여백이 얼마예요?"
                                 ↓
                          소통 비용 폭발!
\`\`\`

#### Figma MCP 방식 (살아있는 공유 도면)

\`\`\`
건축가 ←──── 공유 도면 ────→ 시공사 + Claude
         (Figma MCP)
                             ↓
                      "자동으로 치수 읽기"
                      "색상 코드 자동 추출"
                      "시공 결과 자동 비교"
                             ↓
                      정확하고 빠르게!
\`\`\`

#### Figma MCP가 하는 일

1. **읽기**: Figma 디자인의 색상, 크기, 간격, 폰트를 코드로 가져옴
2. **쓰기**: HTML/CSS 코드를 Figma 캔버스에 렌더링 (Code to Canvas)
3. **비교**: 디자인과 구현의 차이를 감지

> 건축가가 도면을 수정하면 시공사가 바로 알 수 있고, 시공 결과를 도면 위에 겹쳐서 차이를 확인할 수 있는 것과 같습니다!`
    },
    {
      id: "remote-vs-local",
      title: "리모트 vs 로컬 MCP",
      content: `### 두 가지 연결 방식 이해하기

Figma MCP는 두 가지 방식으로 연결할 수 있습니다.

#### 리모트 MCP (추천) = 회사 건설 시스템

\`\`\`
Anthropic이 운영하는 서버를 통해 Figma에 연결
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Claude Code ←→ Anthropic 서버 ←→ Figma

장점:
  ✓ OAuth로 간편 인증
  ✓ Code to Canvas 지원 (코드를 Figma에 렌더링)
  ✓ 자동 업데이트
  ✓ 설치 불필요

단점:
  ✗ 인터넷 연결 필요
\`\`\`

#### 로컬 MCP = 현장 측량 도구

\`\`\`
내 컴퓨터에 직접 MCP 서버를 설치해서 Figma에 연결
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Claude Code ←→ 내 컴퓨터 MCP 서버 ←→ Figma

장점:
  ✓ 오프라인에서도 캐시 사용 가능
  ✓ 커스텀 설정 가능

단점:
  ✗ API 키 직접 발급 필요
  ✗ Code to Canvas 미지원 (읽기 전용)
  ✗ 직접 업데이트 필요
\`\`\`

#### 비교표

| 항목 | 리모트 MCP | 로컬 MCP |
|------|-----------|---------|
| 인증 | OAuth (간편) | API 키 (직접 발급) |
| Code to Canvas | 지원 | 미지원 |
| 설치 | 불필요 | npx 실행 필요 |
| 관리 | Anthropic | 내가 직접 |
| 추천 대상 | 대부분의 사용자 | 고급 사용자 |

> **추천**: 처음 시작할 때는 **리모트 MCP**를 사용하세요. 설정이 간편하고 Code to Canvas도 지원합니다!`
    },
    {
      id: "round-trip",
      title: "라운드트립 워크플로우",
      content: `### 수정 → 감지 → 반영의 순환

라운드트립은 디자인과 코드를 **계속 왔다갔다하며 맞추는 과정**입니다.

#### 자전거 바퀴처럼 돌아가는 워크플로우

\`\`\`
     ① 디자인 읽기
        (Figma → 코드)
           │
           ▼
  ④ 디자인         ② 코드 작성
  수정 감지            (구현)
     │                   │
     ▼                   ▼
     ③ Code to Canvas
        (코드 → Figma)
\`\`\`

#### 구체적인 흐름

1. **디자인 읽기**: Figma에서 버튼의 색상, 크기, 간격을 읽어옴
2. **코드 작성**: 읽어온 값으로 HTML/CSS 코드를 만듦
3. **Code to Canvas**: 만든 코드를 Figma 캔버스에 렌더링해서 비교
4. **차이 감지**: 디자인과 구현이 다른 부분을 찾음
5. **수정 반영**: 차이를 코드에 반영 → 다시 1번부터 반복

#### 왜 라운드트립이 중요한가?

\`\`\`
예전 방식:
  디자인 → 코드 → 완성?
  "어, 디자인이랑 좀 다른데..." → 수동으로 비교 → 수정 → 또 비교...

라운드트립:
  디자인 → 코드 → Figma에 겹치기 → 자동 비교 → 수정 → 다시 겹치기...
  → 정확하고 빠르게 디자인과 코드를 일치시킬 수 있음!
\`\`\`

> **핵심**: 디자인과 코드 사이를 자동으로 왔다갔다하며 정확하게 맞추는 것이 라운드트립입니다!`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "Figma MCP 연결 설정하기",
      content: `### 건설 현장에 공유 도면 시스템 설치하기

Figma MCP를 연결하는 두 가지 방법을 알아봅시다. 리모트 방식을 추천합니다!

#### 방법 1: 리모트 MCP (추천)

claude.ai에서 Figma 커넥터를 활성화하면 됩니다.

#### 방법 2: 로컬 MCP

직접 MCP 서버를 설정합니다.`,
      terminals: [
        {
          command: "# 리모트 MCP: claude.ai에서 활성화 후 바로 사용",
          output: `> Figma 파일을 읽어줘

Claude: Figma MCP 커넥터가 연결되어 있습니다.
Figma 파일 URL을 알려주시면 디자인을 읽겠습니다.

> https://figma.com/design/abc123/MyProject

Claude: Figma 파일을 읽고 있습니다...

📐 Figma 파일: MyProject
━━━━━━━━━━━━━━━━━━━━━
페이지: 3개
  - Home
  - Components
  - Icons`
        },
        {
          command: "# 로컬 MCP: 직접 설정하는 방법",
          output: `# Figma API 키 발급 후 설정

claude mcp add figma \\
  --transport stdio \\
  -- npx -y figma-developer-mcp \\
  --figma-api-key YOUR_API_KEY

✓ MCP 서버 'figma' 추가 완료

# 참고: 로컬 MCP는 Code to Canvas 미지원`
        }
      ]
    },
    {
      id: "step-02",
      title: "Figma 디자인 읽기",
      content: `### 도면의 치수를 자동으로 읽기

Figma 파일에서 컴포넌트의 색상, 크기, 간격 등을 코드로 가져오는 과정입니다.

#### 순서

1. Figma 파일 URL 전달
2. 원하는 컴포넌트/프레임 지정
3. 디자인 토큰(색상, 크기 등) 추출
4. CSS/코드로 변환`,
      terminals: [
        {
          command: "# Figma 파일에서 버튼 컴포넌트 읽기",
          output: `> Figma 파일에서 Primary Button 컴포넌트의 스타일을 읽어줘

Claude: Primary Button 컴포넌트를 분석합니다...

🎨 Primary Button 디자인 토큰:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

배경색:     #3B82F6
텍스트색:   #FFFFFF
폰트:       Inter, 16px, Bold
패딩:       12px 24px
모서리:     8px (border-radius)
그림자:     0 2px 4px rgba(0,0,0,0.1)`
        },
        {
          command: "# 추출한 토큰으로 CSS 코드 생성",
          output: `Claude: 디자인 토큰을 바탕으로 CSS를 생성합니다.

\`.btn-primary {
  background-color: #3B82F6;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
}\`

✓ Figma 디자인과 정확히 일치하는 CSS입니다.`
        }
      ]
    },
    {
      id: "step-03",
      title: "Code to Canvas (코드를 Figma에 렌더링)",
      content: `### 시공 결과를 도면 위에 겹치기

Code to Canvas는 HTML/CSS 코드를 **Figma 캔버스에 직접 렌더링**하는 기능입니다.
시공한 결과물을 도면 위에 겹쳐서 차이를 확인하는 것과 같아요!

#### 순서

1. HTML/CSS 코드 작성
2. Code to Canvas로 Figma에 렌더링
3. 원본 디자인과 나란히 비교
4. 차이 발견 → 코드 수정`,
      terminals: [
        {
          command: "# HTML 코드를 Figma에 렌더링",
          output: `> 이 버튼 코드를 Figma에 렌더링해줘

Claude: Code to Canvas를 실행합니다...

코드:
<button class="btn-primary">시작하기</button>

Figma에 렌더링 중...
✓ 렌더링 완료!

📊 비교 결과:
  원본 디자인  |  코드 렌더링
  ────────────────────────
  배경: #3B82F6  |  배경: #3B82F6  ✓ 일치
  패딩: 12 24    |  패딩: 12 24    ✓ 일치
  반지름: 8px    |  반지름: 8px    ✓ 일치
  그림자: 있음   |  그림자: 있음    ✓ 일치

✅ 모든 속성이 디자인과 일치합니다!`
        },
        {
          command: "# 차이가 발견된 경우",
          output: `> 카드 컴포넌트를 Figma에 렌더링해줘

Claude: Code to Canvas 실행 중...

📊 비교 결과:
  원본 디자인  |  코드 렌더링
  ────────────────────────
  패딩: 24px    |  패딩: 16px    ✗ 차이!
  모서리: 12px  |  모서리: 8px   ✗ 차이!
  그림자: soft  |  그림자: none  ✗ 차이!

⚠ 3개 속성에서 차이가 발견되었습니다.
코드를 수정하시겠습니까?

> 네, 디자인에 맞게 수정해줘

✓ 패딩 16px → 24px 수정
✓ 모서리 8px → 12px 수정
✓ 그림자 추가
✓ 수정 완료! 다시 렌더링해서 확인합니다...

📊 재비교 결과: ✅ 모든 속성 일치!`
        }
      ]
    }
  ],

  examples: [
    {
      id: "round-trip-workflow",
      title: "라운드트립 워크플로우 전체 실습",
      content: `### 디자인 → 코드 → Figma → 수정의 전체 순환

실제 프로젝트에서 라운드트립 워크플로우를 어떻게 사용하는지 전체 과정을 따라해봅시다.

#### 시나리오: 카드 컴포넌트 구현

\`\`\`
1단계: Figma에서 카드 디자인 읽기
   ↓
2단계: HTML/CSS 코드 작성
   ↓
3단계: Code to Canvas로 Figma에 렌더링
   ↓
4단계: 차이 발견 → 코드 수정
   ↓
5단계: 다시 렌더링 → 일치 확인
   ↓
완료!
\`\`\`

#### 핵심 명령어 흐름

\`\`\`bash
# 1. Figma 디자인 읽기
"Figma에서 카드 컴포넌트의 스타일을 읽어줘"

# 2. 코드 작성 (Claude가 자동으로)
# → HTML/CSS 파일 생성

# 3. Code to Canvas
"이 카드 코드를 Figma에 렌더링해서 원본과 비교해줘"

# 4. 차이 수정
"차이가 있는 부분을 디자인에 맞게 수정해줘"

# 5. 최종 확인
"다시 렌더링해서 일치하는지 확인해줘"
\`\`\`

> **팁**: 처음에는 전체 페이지가 아니라 **작은 컴포넌트 하나**부터 시작하세요. 버튼, 카드, 인풋 박스 등 작은 단위로 연습한 후 큰 레이아웃에 도전하는 것이 좋습니다!`,
      checklist: [
        "Figma MCP의 두 가지 연결 방식(리모트/로컬)을 이해한다",
        "Figma에서 디자인 토큰(색상, 크기, 간격)을 추출할 수 있다",
        "Code to Canvas의 개념과 사용 시나리오를 알고 있다",
        "라운드트립 워크플로우의 전체 순환 과정을 설명할 수 있다",
        "리모트 MCP가 Code to Canvas를 지원하고, 로컬은 미지원임을 안다"
      ]
    },
    {
      id: "design-tokens",
      title: "디자인 토큰 추출 실습",
      content: `### Figma에서 디자인 시스템 값 가져오기

디자인 토큰은 색상, 크기, 간격 등 **디자인 시스템의 반복되는 값**입니다.
건축에서 "표준 벽돌 크기", "표준 창문 크기"처럼, 일관성을 위해 정해놓은 값이에요.

#### 추출할 수 있는 토큰 종류

\`\`\`
디자인 토큰               예시
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
색상 (Colors)             #3B82F6, rgba(0,0,0,0.1)
타이포그래피 (Typography)  Inter 16px Bold
간격 (Spacing)            8px, 16px, 24px
모서리 (Border Radius)    4px, 8px, 12px
그림자 (Shadow)           0 2px 4px rgba(...)
\`\`\`

#### 토큰을 CSS 변수로 변환

\`\`\`css
:root {
  /* 색상 */
  --color-primary: #3B82F6;
  --color-secondary: #8B5CF6;
  --color-text: #1F2937;

  /* 간격 */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* 모서리 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
\`\`\`

> Figma MCP로 디자인 토큰을 추출하면, 디자이너와 개발자가 **같은 값**을 사용하게 되어 불일치가 사라집니다!`,
      checklist: [
        "디자인 토큰의 종류(색상, 간격, 타이포 등)를 알고 있다",
        "Figma에서 토큰을 CSS 변수로 변환하는 과정을 이해한다",
        "디자인 토큰이 일관성 유지에 중요한 이유를 설명할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "Figma MCP를 가장 잘 설명한 비유는?",
      options: [
        "건축가가 시공사에게 PDF 도면을 보내는 것",
        "건축가와 시공사가 살아있는 공유 도면을 보는 것",
        "시공사가 건축가 없이 혼자 짓는 것"
      ],
      answer: 1,
      explanation: "Figma MCP는 디자이너(건축가)와 개발자(시공사)가 살아있는 공유 도면을 통해 실시간으로 소통하는 것과 같습니다. PDF처럼 한쪽 방향이 아니라 양방향입니다."
    },
    {
      question: "Code to Canvas는 무엇을 하나요?",
      options: [
        "Figma 디자인을 코드로 변환한다",
        "HTML/CSS 코드를 Figma 캔버스에 렌더링한다",
        "코드의 버그를 찾아준다"
      ],
      answer: 1,
      explanation: "Code to Canvas는 작성한 HTML/CSS 코드를 Figma 캔버스에 직접 렌더링합니다. 시공 결과를 도면 위에 겹쳐서 차이를 확인하는 것과 같아요."
    },
    {
      question: "리모트 MCP와 로컬 MCP의 핵심 차이는?",
      options: [
        "리모트가 더 느리다",
        "리모트는 Code to Canvas를 지원하고 OAuth 인증을 사용한다",
        "로컬이 더 간편하다"
      ],
      answer: 1,
      explanation: "리모트 MCP는 Anthropic 서버를 통해 연결되며, OAuth 인증과 Code to Canvas를 지원합니다. 로컬 MCP는 API 키가 필요하고 읽기 전용(Code to Canvas 미지원)입니다."
    },
    {
      question: "라운드트립 워크플로우의 올바른 순서는?",
      options: [
        "코드 작성 → 디자인 읽기 → 비교",
        "디자인 읽기 → 코드 작성 → Code to Canvas → 차이 수정 → 재확인",
        "디자인 읽기 → 바로 완성"
      ],
      answer: 1,
      explanation: "라운드트립은 디자인을 읽고 → 코드를 만들고 → Figma에 렌더링해서 비교하고 → 차이를 수정하고 → 다시 확인하는 순환 과정입니다."
    },
    {
      question: "디자인 토큰이란?",
      options: [
        "Figma 파일의 비밀번호",
        "색상, 크기, 간격 등 디자인 시스템의 반복 값",
        "디자이너만 사용할 수 있는 특별한 도구"
      ],
      answer: 1,
      explanation: "디자인 토큰은 #3B82F6(색상), 16px(간격) 같은 디자인 시스템의 반복 값입니다. 표준 규격처럼 일관성을 위해 정해놓은 값이에요."
    }
  ]
};
