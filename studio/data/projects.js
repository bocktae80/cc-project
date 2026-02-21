// Studio 프로젝트 데이터
// 새 프로젝트 추가 시 이 파일의 projects 배열에 항목을 추가하세요.
window.STUDIO_DATA = {
  meta: {
    title: "Claude Code 학습 스튜디오",
    description: "클로드 코드의 기능을 배우고 활용하는 학습 대시보드",
    lastUpdated: "2026-02-21"
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
      description: "커스텀 스킬과 슬래시 커맨드를 만들어 반복 작업을 간편하게 실행합니다.",
      concepts: ["Skills", "슬래시 커맨드", "커스텀 도구", "자동화"],
      path: "../projects/08-skills-commands/",
      subExamples: [
        { title: "기본 커맨드 체험", difficulty: 1, status: "completed" },
        { title: "첫 번째 스킬 만들기 (greet)", difficulty: 1, status: "completed" },
        { title: "실용 스킬 4종 (review, explain, test-gen, summarize)", difficulty: 2, status: "completed" }
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
      subExamples: [
        { title: "커넥터 개념 (공유 프린터 비유)", difficulty: 1, status: "completed" },
        { title: "Slack/Notion 커넥터 실습", difficulty: 2, status: "completed" },
        { title: "ToolSearch로 도구 찾기", difficulty: 2, status: "completed" }
      ],
      prerequisites: ["07-mcp-server"]
    }
  ]
};
