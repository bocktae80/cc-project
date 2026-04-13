// Studio 프로젝트 데이터
// 새 프로젝트 추가 시 이 파일의 projects 배열에 항목을 추가하세요.
window.STUDIO_DATA = {
  meta: {
    title: "Claude Code 학습 스튜디오",
    description: "클로드 코드의 기능을 배우고 활용하는 학습 대시보드",
    lastUpdated: "2026-03-02"
  },
  phases: [
    {
      id: "phase-1",
      name: "Phase 1: 기초 도구",
      description: "클로드 코드의 핵심 도구들을 익히는 단계",
      order: 1,
      color: "#3B82F6"
    },
    {
      id: "phase-2",
      name: "Phase 2: 고급 기능",
      description: "팀 협업, 자동화, 확장 기능을 배우는 단계",
      order: 2,
      color: "#8B5CF6"
    },
    {
      id: "phase-4",
      name: "Phase 4: 최신 기능",
      description: "2025 Q1 업데이트 (v2.1.46~2.1.50)의 새로운 기능들",
      order: 4,
      color: "#F59E0B"
    },
    {
      id: "phase-5",
      name: "Phase 5: 확장 기능",
      description: "2026 Q1 업데이트 (v2.1.51~2.1.59+)의 세션 이동과 보안 기능",
      order: 5,
      color: "#EF4444"
    },
    {
      id: "phase-6",
      name: "Phase 6: 심화 활용",
      description: "2025 하반기~2026 Q1 주요 신기능 — 브라우저 자동화, SDK, 플러그인, IDE 통합",
      order: 6,
      color: "#10B981"
    }
  ],
  projects: [
    {
      id: "01-memory-system",
      number: "01",
      title: "메모리 시스템",
      subtitle: "클로드 코드가 기억하는 방법",
      phase: "phase-1",
      difficulty: 3,
      status: "completed",
      description: "CLAUDE.md, 자동 메모리, 프로젝트별 설정 등 클로드 코드의 메모리 시스템을 분석하고 직접 설정해봅니다.",
      concepts: ["CLAUDE.md", "메모리 계층", "auto-memory", "프로젝트 설정"],
      path: "../projects/01-memory-system/",
      estimatedMinutes: 20,
      relatedProjects: ["08-skills-commands", "09-worktree", "10-cli-master"],
      subExamples: [
        { title: "CLAUDE.md 작성", difficulty: 1, status: "completed" },
        { title: "메모리 계층 분석", difficulty: 2, status: "completed" },
        { title: "프로젝트 설정 실습", difficulty: 3, status: "completed" }
      ],
      prerequisites: []
    },
    {
      id: "02-file-operations",
      number: "02",
      title: "파일 읽기/쓰기",
      subtitle: "파일을 자유자재로 다루기",
      phase: "phase-1",
      difficulty: 1,
      status: "completed",
      description: "Read, Write, Edit 도구를 사용해 파일을 읽고, 생성하고, 수정하는 기본 작업을 배웁니다.",
      concepts: ["Read", "Write", "Edit", "파일 조작"],
      path: "../projects/02-file-operations/",
      estimatedMinutes: 15,
      relatedProjects: ["03-code-search", "10-cli-master", "21-simplify"],
      subExamples: [
        { title: "파일 읽기 기초 (Read)", difficulty: 1, status: "completed" },
        { title: "파일 만들기 (Write)", difficulty: 1, status: "completed" },
        { title: "파일 수정하기 (Edit)", difficulty: 2, status: "completed" }
      ],
      prerequisites: []
    },
    {
      id: "03-code-search",
      number: "03",
      title: "코드 검색 (Glob/Grep)",
      subtitle: "코드베이스에서 원하는 것 찾기",
      phase: "phase-1",
      difficulty: 1,
      status: "completed",
      description: "Glob으로 파일을 찾고, Grep으로 코드 내용을 검색하는 방법을 익힙니다.",
      concepts: ["Glob", "Grep", "패턴 매칭", "정규표현식"],
      path: "../projects/03-code-search/",
      estimatedMinutes: 15,
      relatedProjects: ["02-file-operations", "04-web-search", "10-cli-master"],
      subExamples: [
        { title: "Glob 패턴 배우기", difficulty: 1, status: "completed" },
        { title: "Grep 검색 배우기", difficulty: 1, status: "completed" },
        { title: "콤보 전략 + 실전 미션", difficulty: 2, status: "completed" }
      ],
      prerequisites: []
    },
    {
      id: "04-web-search",
      number: "04",
      title: "웹 검색/페치",
      subtitle: "인터넷 정보 활용하기",
      phase: "phase-1",
      difficulty: 2,
      status: "completed",
      description: "WebSearch와 WebFetch를 사용해 최신 정보를 검색하고 웹 페이지 내용을 가져오는 방법을 배웁니다.",
      concepts: ["WebSearch", "WebFetch", "실시간 정보", "웹 크롤링"],
      path: "../projects/04-web-search/",
      estimatedMinutes: 15,
      relatedProjects: ["02-file-operations", "03-code-search", "11-mcp-connectors"],
      subExamples: [
        { title: "WebSearch 기초 (검색, 도메인 필터)", difficulty: 1, status: "completed" },
        { title: "WebFetch 분석 (URL 분석, prompt 작성)", difficulty: 2, status: "completed" },
        { title: "리서치 프로젝트 (검색+분석 조합)", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["02-file-operations"]
    },
    {
      id: "05-agent-teams",
      number: "05",
      title: "Agent Teams",
      subtitle: "AI 에이전트 팀으로 협업하기",
      phase: "phase-2",
      difficulty: 3,
      status: "completed",
      description: "여러 AI 에이전트를 팀으로 구성해 복잡한 작업을 병렬로 처리하는 고급 기능을 실습합니다.",
      concepts: ["TeamCreate", "Task", "SendMessage", "병렬 처리"],
      path: "../projects/05-agent-teams/",
      estimatedMinutes: 30,
      relatedProjects: ["16-background-agents", "18-agent-sdk", "23-ralph-loop"],
      subExamples: [
        { title: "개념 문서 (개요, 비교, 아키텍처)", difficulty: 2, status: "completed" },
        { title: "6단계 따라하기 튜토리얼", difficulty: 3, status: "completed" },
        { title: "실전 시나리오 (todo-webapp)", difficulty: 3, status: "completed" },
        { title: "API 레퍼런스 & 트러블슈팅", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["01-memory-system"]
    },
    {
      id: "03d-debug-features",
      number: "03d",
      title: "디버그 기능",
      subtitle: "클로드 코드 내부 들여다보기",
      phase: "phase-2",
      difficulty: 2,
      status: "completed",
      description: "--debug 플래그로 내부 로그를 확인하고, /debug 커맨드로 세션 상태를 진단하는 방법을 배웁니다.",
      concepts: ["--debug", "/debug", "로그 분석", "세션 진단"],
      path: "../projects/03-debug-features/",
      estimatedMinutes: 15,
      relatedProjects: ["10-cli-master", "03-code-search", "01-memory-system"],
      subExamples: [
        { title: "--debug 플래그 분석", difficulty: 2, status: "completed" },
        { title: "/debug 커맨드 체험", difficulty: 1, status: "completed" },
        { title: "체험용 테스트베드", difficulty: 2, status: "completed" }
      ],
      prerequisites: []
    },
    {
      id: "06-hooks",
      number: "06",
      title: "Hooks",
      subtitle: "도구 실행에 자동 반응하기",
      phase: "phase-2",
      difficulty: 2,
      status: "completed",
      description: "도구 호출 전후에 자동으로 실행되는 훅을 설정해 워크플로우를 자동화합니다.",
      concepts: ["PreToolUse", "PostToolUse", "자동화", "워크플로우"],
      path: "../projects/06-hooks/",
      estimatedMinutes: 20,
      relatedProjects: ["08-skills-commands", "07-mcp-server", "19-permissions-deep"],
      subExamples: [
        { title: "첫 번째 훅 (알림 메시지)", difficulty: 1, status: "completed" },
        { title: "가드 훅 (파일 수정 차단)", difficulty: 2, status: "completed" },
        { title: "자동 로그 훅", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["02-file-operations"]
    },
    {
      id: "07-mcp-server",
      number: "07",
      title: "MCP 서버",
      subtitle: "외부 도구와 연결하기",
      phase: "phase-2",
      difficulty: 3,
      status: "completed",
      description: "Model Context Protocol을 사용해 외부 서비스와 도구를 클로드 코드에 연결하는 방법을 배웁니다.",
      concepts: ["MCP", "프로토콜", "외부 도구", "서버 설정"],
      path: "../projects/07-mcp-server/",
      estimatedMinutes: 30,
      relatedProjects: ["11-mcp-connectors", "12-figma-mcp", "18-agent-sdk"],
      subExamples: [
        { title: "파일시스템 MCP 서버", difficulty: 2, status: "completed" },
        { title: "GitHub MCP 서버", difficulty: 2, status: "completed" },
        { title: "커스텀 MCP 서버 만들기", difficulty: 3, status: "completed" },
        { title: "4단계 튜토리얼", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["06-hooks"]
    },
    {
      id: "08-skills-commands",
      number: "08",
      title: "Skills & 커맨드",
      subtitle: "나만의 명령어 만들기",
      phase: "phase-2",
      difficulty: 2,
      status: "completed",
      description: "SKILL.md 디렉토리 구조로 커스텀 스킬을 만들고, 프론트매터/서브에이전트/동적 주입 등 고급 기능을 활용합니다.",
      concepts: ["SKILL.md", "프론트매터", "번들 스킬", "서브에이전트 실행", "동적 주입"],
      path: "../projects/08-skills-commands/",
      estimatedMinutes: 25,
      relatedProjects: ["25-skills-2.0", "17-plugin-system", "06-hooks"],
      subExamples: [
        { title: "기본 커맨드 + 번들 스킬 체험", difficulty: 1, status: "completed" },
        { title: "SKILL.md 디렉토리로 첫 스킬 만들기", difficulty: 1, status: "completed" },
        { title: "프론트매터 + 보조 파일 활용", difficulty: 2, status: "completed" },
        { title: "서브에이전트 실행 + 동적 주입", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["06-hooks"]
    },
    {
      id: "09-worktree",
      number: "09",
      title: "Worktree",
      subtitle: "안전한 실험 공간 만들기",
      phase: "phase-4",
      difficulty: 2,
      status: "completed",
      description: "워크트리로 메인 코드에 영향 없이 안전하게 실험하는 방법을 배웁니다. 과학 실험실처럼 격리된 공간에서 자유롭게 시도해보세요.",
      concepts: ["worktree", "격리", "브랜치", "에이전트 격리"],
      path: "../projects/09-worktree/",
      estimatedMinutes: 15,
      relatedProjects: ["01-memory-system", "05-agent-teams", "16-background-agents"],
      subExamples: [
        { title: "워크트리 개념 (실험실 비유)", difficulty: 1, status: "completed" },
        { title: "첫 번째 워크트리 만들기", difficulty: 2, status: "completed" },
        { title: "에이전트 격리 실행", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["02-file-operations", "06-hooks"]
    },
    {
      id: "10-cli-master",
      number: "10",
      title: "CLI 마스터",
      subtitle: "터미널에서 클로드 조종하기",
      phase: "phase-4",
      difficulty: 1,
      status: "completed",
      description: "claude 명령어의 다양한 서브커맨드를 배웁니다. TV 리모컨 버튼처럼 각 명령어가 무슨 역할을 하는지 알아보세요.",
      concepts: ["CLI", "auth", "agents", "PDF 읽기", "/rename"],
      path: "../projects/10-cli-master/",
      estimatedMinutes: 20,
      relatedProjects: ["22-batch-mode", "03d-debug-features", "13-teleport"],
      subExamples: [
        { title: "인증 관리 (auth)", difficulty: 1, status: "completed" },
        { title: "에이전트 & 이름 변경 (agents, /rename)", difficulty: 1, status: "completed" },
        { title: "PDF 페이지 읽기 실습", difficulty: 1, status: "completed" }
      ],
      prerequisites: []
    },
    {
      id: "11-mcp-connectors",
      number: "11",
      title: "MCP 커넥터",
      subtitle: "이미 연결된 도구 사용하기",
      phase: "phase-4",
      difficulty: 2,
      status: "completed",
      description: "claude.ai에서 제공하는 MCP 커넥터로 Slack, Notion 같은 외부 서비스를 손쉽게 연결합니다. 학교 공유 프린터처럼 한 번 설정하면 모두가 사용!",
      concepts: ["MCP 커넥터", "OAuth", "ToolSearch", "Slack", "Notion"],
      path: "../projects/11-mcp-connectors/",
      estimatedMinutes: 20,
      relatedProjects: ["07-mcp-server", "12-figma-mcp", "04-web-search"],
      subExamples: [
        { title: "커넥터 개념 (공유 프린터 비유)", difficulty: 1, status: "completed" },
        { title: "Slack/Notion 커넥터 실습", difficulty: 2, status: "completed" },
        { title: "ToolSearch로 도구 찾기", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["07-mcp-server"]
    },
    {
      id: "12-figma-mcp",
      number: "12",
      title: "Figma MCP",
      subtitle: "디자인과 코드를 연결하기",
      phase: "phase-4",
      difficulty: 3,
      status: "completed",
      description: "Figma MCP로 디자인을 읽고, Code to Canvas로 코드를 Figma에 렌더링하고, 라운드트립 워크플로우로 디자인-코드 동기화를 실습합니다.",
      concepts: ["Figma MCP", "Code to Canvas", "라운드트립", "디자인 토큰"],
      path: "../projects/12-figma-mcp/",
      estimatedMinutes: 30,
      relatedProjects: ["07-mcp-server", "11-mcp-connectors", "15-browser-automation"],
      subExamples: [
        { title: "개념 (건축가-시공사 비유, 리모트 vs 로컬)", difficulty: 1, status: "completed" },
        { title: "Figma MCP 설정 & 디자인 읽기", difficulty: 2, status: "completed" },
        { title: "Code to Canvas (카드 → Figma)", difficulty: 3, status: "completed" },
        { title: "라운드트립 워크플로우 실습", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["07-mcp-server", "11-mcp-connectors"]
    },
    {
      id: "13-teleport",
      number: "13",
      title: "텔레포트",
      subtitle: "세션을 자유롭게 이동하기",
      phase: "phase-5",
      difficulty: 2,
      status: "completed",
      description: "& prefix로 작업을 클라우드에 보내고, /teleport로 웹 세션을 터미널로 가져오고, /rc로 원격 조종하는 세션 이동 기능을 배웁니다.",
      concepts: ["& prefix", "/teleport", "/rc", "세션 공유"],
      path: "../projects/13-teleport/",
      estimatedMinutes: 15,
      relatedProjects: ["10-cli-master", "20-ide-integration", "16-background-agents"],
      subExamples: [
        { title: "& prefix 실습 (클라우드 전송)", difficulty: 1, status: "completed" },
        { title: "텔레포트 워크플로우 (웹→터미널)", difficulty: 2, status: "completed" },
        { title: "리모트 컨트롤 (원격 조종)", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["10-cli-master"]
    },
    {
      id: "14-code-security",
      number: "14",
      title: "코드 보안 스캔",
      subtitle: "AI로 코드의 약점 찾기",
      phase: "phase-5",
      difficulty: 3,
      status: "completed",
      description: "AI 보안 경비원처럼 코드의 취약점을 찾고, OWASP Top 10을 이해하고, 스캔→검증→수정→재스캔 워크플로우를 체험합니다. Enterprise/Team 전용이지만 개념 학습은 누구나 가능!",
      concepts: ["OWASP Top 10", "SQL 인젝션", "XSS", "AI 보안 스캔", "보안 체크리스트"],
      path: "../projects/14-code-security/",
      estimatedMinutes: 25,
      relatedProjects: ["19-permissions-deep", "06-hooks", "21-simplify"],
      subExamples: [
        { title: "취약 코드 샘플 (SQL인젝션, XSS, 인증우회)", difficulty: 2, status: "completed" },
        { title: "스캔 + 수정 워크플로우", difficulty: 3, status: "completed" },
        { title: "보안 체크리스트 만들기", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["02-file-operations"]
    },
    {
      id: "15-browser-automation",
      number: "15",
      title: "브라우저 자동화",
      subtitle: "AI가 브라우저를 조종하기",
      phase: "phase-6",
      difficulty: 2,
      status: "completed",
      description: "Chrome 확장을 통해 클로드가 브라우저를 제어하는 원리를 이해하고, 페이지 탐색·폼 입력·스크린샷·GIF 녹화 등 실전 자동화를 체험합니다.",
      concepts: ["Chrome 확장", "브라우저 제어", "스크린샷", "GIF 녹화"],
      path: "../projects/15-browser-automation/",
      estimatedMinutes: 20,
      relatedProjects: ["10-cli-master", "12-figma-mcp", "22-batch-mode"],
      subExamples: [
        { title: "Chrome 확장 연결 원리", difficulty: 1, status: "completed" },
        { title: "페이지 탐색 & 폼 자동 입력", difficulty: 2, status: "completed" },
        { title: "콘솔/네트워크 모니터링 & GIF 녹화", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["10-cli-master"]
    },
    {
      id: "16-background-agents",
      number: "16",
      title: "백그라운드 에이전트",
      subtitle: "여러 일을 동시에 시키기",
      phase: "phase-6",
      difficulty: 2,
      status: "completed",
      description: "run_in_background로 명령과 에이전트를 백그라운드에서 실행하고, TaskOutput·TaskStop으로 결과를 관리하는 병렬 작업 패턴을 배웁니다.",
      concepts: ["run_in_background", "TaskOutput", "TaskStop", "병렬 작업"],
      path: "../projects/16-background-agents/",
      estimatedMinutes: 20,
      relatedProjects: ["05-agent-teams", "09-worktree", "24-loop-cron"],
      subExamples: [
        { title: "포그라운드 vs 백그라운드 개념", difficulty: 1, status: "completed" },
        { title: "Bash & 에이전트 백그라운드 실행", difficulty: 2, status: "completed" },
        { title: "여러 백그라운드 작업 동시 관리", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["05-agent-teams"]
    },
    {
      id: "17-plugin-system",
      number: "17",
      title: "플러그인 시스템",
      subtitle: "기능 꾸러미 설치하고 만들기",
      phase: "phase-6",
      difficulty: 3,
      status: "completed",
      description: "Skills·Commands·Hooks·Agents를 하나로 묶는 플러그인 시스템의 구조를 이해하고, 직접 플러그인을 만들어 배포하는 과정을 체험합니다.",
      concepts: ["plugin.json", "Skills", "Commands", "Hooks 번들"],
      path: "../projects/17-plugin-system/",
      estimatedMinutes: 30,
      relatedProjects: ["08-skills-commands", "25-skills-2.0", "06-hooks"],
      subExamples: [
        { title: "플러그인 개념 & plugin.json 구조", difficulty: 1, status: "completed" },
        { title: "나만의 플러그인 만들기", difficulty: 3, status: "completed" },
        { title: "플러그인 배포 (npm/git)", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["08-skills-commands"]
    },
    {
      id: "18-agent-sdk",
      number: "18",
      title: "Agent SDK",
      subtitle: "나만의 AI 에이전트 만들기",
      phase: "phase-6",
      difficulty: 3,
      status: "completed",
      description: "Claude Agent SDK로 프로그래밍 방식의 에이전트를 만드는 방법을 배웁니다. Python/TypeScript SDK 기초부터 커스텀 도구, MCP 연동까지 체험합니다.",
      concepts: ["Agent SDK", "Python SDK", "TypeScript SDK", "커스텀 도구"],
      path: "../projects/18-agent-sdk/",
      estimatedMinutes: 30,
      relatedProjects: ["05-agent-teams", "07-mcp-server", "23-ralph-loop"],
      subExamples: [
        { title: "Agent SDK 개념 (CLI vs SDK)", difficulty: 1, status: "completed" },
        { title: "첫 SDK 앱 & 커스텀 도구", difficulty: 3, status: "completed" },
        { title: "MCP 서버 연동 에이전트", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["05-agent-teams", "07-mcp-server"]
    },
    {
      id: "19-permissions-deep",
      number: "19",
      title: "권한 심화",
      subtitle: "보안 울타리 세밀하게 설정하기",
      phase: "phase-6",
      difficulty: 2,
      status: "completed",
      description: "4가지 권한 모드, 와일드카드 패턴, deny→ask→allow 평가 순서를 이해하고, 안전한 개발 환경을 설계하는 방법을 배웁니다.",
      concepts: ["권한 모드", "와일드카드", "deny/allow", "settings.json"],
      path: "../projects/19-permissions-deep/",
      estimatedMinutes: 20,
      relatedProjects: ["06-hooks", "14-code-security", "01-memory-system"],
      subExamples: [
        { title: "권한 모드 4가지 이해", difficulty: 1, status: "completed" },
        { title: "와일드카드 패턴 실습", difficulty: 2, status: "completed" },
        { title: "deny + allow 조합 전략", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["06-hooks"]
    },
    {
      id: "20-ide-integration",
      number: "20",
      title: "IDE 통합",
      subtitle: "VS Code에서 클로드 쓰기",
      phase: "phase-6",
      difficulty: 1,
      status: "completed",
      description: "VS Code, Cursor, JetBrains에서 클로드 코드를 사용하는 방법을 배웁니다. @-mention, 플랜 리뷰, 멀티탭 등 IDE 네이티브 기능을 체험합니다.",
      concepts: ["VS Code 확장", "@-mention", "Cursor", "JetBrains"],
      path: "../projects/20-ide-integration/",
      estimatedMinutes: 15,
      relatedProjects: ["10-cli-master", "13-teleport", "01-memory-system"],
      subExamples: [
        { title: "CLI vs IDE 통합 비교", difficulty: 1, status: "completed" },
        { title: "VS Code 설치 & @-mention", difficulty: 1, status: "completed" },
        { title: "플랜 리뷰 & 수락 워크플로우", difficulty: 1, status: "completed" }
      ],
      prerequisites: []
    },
    {
      id: "21-simplify",
      number: "21",
      title: "/simplify 스킬",
      subtitle: "코드 품질 자동 개선",
      phase: "phase-2",
      difficulty: 2,
      status: "completed",
      description: "/simplify 스킬로 코드의 기능은 유지하면서 가독성과 품질을 자동으로 개선하는 방법을 배웁니다. 교정 선생님처럼 내용은 안 바꾸고 문법만 고쳐줘요!",
      concepts: ["/simplify", "5대 원칙", "전후 비교", "PR 루틴"],
      path: "../projects/21-simplify/",
      estimatedMinutes: 15,
      relatedProjects: ["02-file-operations", "08-skills-commands", "14-code-security"],
      subExamples: [
        { title: "/simplify 개념 & 5대 원칙", difficulty: 1, status: "completed" },
        { title: "첫 심플리파이 & 설정 커스터마이즈", difficulty: 2, status: "completed" },
        { title: "PR 전 루틴 & 팀 컨벤션 적용", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["02-file-operations"]
    },
    {
      id: "22-batch-mode",
      number: "22",
      title: "배치 모드",
      subtitle: "비대화형 자동 처리",
      phase: "phase-4",
      difficulty: 2,
      status: "completed",
      description: "claude CLI의 배치 모드(-p)로 자동화 파이프라인을 구성합니다. 자판기처럼 입력 넣고 버튼 누르면 결과가 나오는 비대화형 모드를 배워요!",
      concepts: ["-p 파이프 모드", "파이프 체이닝", "출력 포맷", "CI/CD 연동"],
      path: "../projects/22-batch-mode/",
      estimatedMinutes: 20,
      relatedProjects: ["10-cli-master", "24-loop-cron", "23-ralph-loop"],
      subExamples: [
        { title: "대화형 vs 비대화형 개념", difficulty: 1, status: "completed" },
        { title: "파이프 체이닝 & 출력 포맷", difficulty: 2, status: "completed" },
        { title: "CI/CD 연동 & PR 자동 리뷰", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["10-cli-master"]
    },
    {
      id: "23-ralph-loop",
      number: "23",
      title: "Ralph Loop",
      subtitle: "자율 개발 루프 (커뮤니티)",
      phase: "phase-6",
      difficulty: 3,
      status: "completed",
      description: "PRD(기획서)를 주면 Claude Code가 자율적으로 기능을 하나씩 구현해나가는 Ralph Loop을 배웁니다. 자동 조립 로봇처럼 설계도만 주면 알아서 만들어요!",
      concepts: ["PRD", "prd.json", "ralph.sh", "progress.txt"],
      path: "../projects/23-ralph-loop/",
      estimatedMinutes: 30,
      relatedProjects: ["05-agent-teams", "22-batch-mode", "18-agent-sdk"],
      subExamples: [
        { title: "Ralph Loop 개념 & PRD 작성", difficulty: 2, status: "completed" },
        { title: "prd.json 구조 & 실행 흐름", difficulty: 3, status: "completed" },
        { title: "실패 복구 & 메모리 전략", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["05-agent-teams", "08-skills-commands"]
    },
    {
      id: "24-loop-cron",
      number: "24",
      title: "/loop & Cron",
      subtitle: "반복 자동 감시 설정하기",
      phase: "phase-4",
      difficulty: 2,
      status: "completed",
      description: "/loop 명령어로 프롬프트를 주기적으로 반복 실행하고, Cron 도구로 세밀한 스케줄링을 설정합니다. 알람 시계처럼 한 번 맞추면 비서가 알아서 확인해줘요!",
      concepts: ["/loop", "CronCreate", "CronList", "CronDelete"],
      path: "../projects/24-loop-cron/",
      estimatedMinutes: 25,
      relatedProjects: ["22-batch-mode", "16-background-agents", "06-hooks"],
      subExamples: [
        { title: "/loop 문법 & 간격 설정", difficulty: 1, status: "completed" },
        { title: "일회성 리마인더 & 복합 루프", difficulty: 2, status: "completed" },
        { title: "릴리스 데이 풀 시나리오", difficulty: 2, status: "completed" },
        { title: "진화 루프 & 메타 루프 (고급)", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["10-cli-master", "22-batch-mode"]
    },
    {
      id: "25-skills-2.0",
      number: "25",
      title: "Skills 2.0",
      subtitle: "Progressive Disclosure & Skill Creator",
      phase: "phase-6",
      difficulty: 3,
      status: "completed",
      description: "Skills 2.0의 Progressive Disclosure 아키텍처, Skill Creator의 Evals/A/B Testing, 분류 체계(Capability Uplift vs Workflow)를 배운다",
      concepts: ["Progressive Disclosure", "Evals", "A/B Testing", "Capability Uplift", "Workflow Skills"],
      path: "../projects/25-skills-2.0/",
      estimatedMinutes: 30,
      relatedProjects: ["08-skills-commands", "17-plugin-system", "23-ralph-loop"],
      subExamples: [
        { title: "Progressive Disclosure 3단계 이해", difficulty: 1, status: "completed" },
        { title: "SKILL.md 고급 Frontmatter 작성", difficulty: 2, status: "completed" },
        { title: "Skill Creator로 Evals & A/B 테스트", difficulty: 3, status: "completed" },
        { title: "팀 마켓플레이스 배포 설정", difficulty: 3, status: "completed" }
      ],
      prerequisites: ["08-skills-commands", "17-plugin-system"]
    },
    {
      id: "26-team-onboarding",
      number: "26",
      title: "팀 온보딩",
      subtitle: "새 팀원을 위한 가이드 자동 생성",
      phase: "phase-2",
      difficulty: 2,
      status: "completed",
      description: "/team-onboarding 커맨드로 30일간 사용 데이터를 분석하여 새 팀원을 위한 맞춤 온보딩 가이드(ONBOARDING.md)를 자동 생성합니다.",
      concepts: ["/team-onboarding", "ONBOARDING.md", "온보딩 버디", "셋업 체크리스트"],
      path: "../projects/26-team-onboarding/",
      estimatedMinutes: 15,
      relatedProjects: ["01-memory-system", "08-skills-commands", "10-cli-master"],
      subExamples: [
        { title: "동작 원리 & 가이드 구조", difficulty: 1, status: "completed" },
        { title: "가이드 생성 & 커스터마이즈", difficulty: 2, status: "completed" },
        { title: "온보딩 버디 모드 & 팀 배포", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["01-memory-system"]
    }
  ]
};
