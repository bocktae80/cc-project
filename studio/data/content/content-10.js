window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["10-cli-master"] = {
  overview: `## CLI 마스터 — 터미널에서 클로드 조종하기

TV 리모컨에는 전원, 채널, 볼륨, 입력 전환... 버튼이 여러 개 있죠? \`claude\` 명령어도 마찬가지예요. 하나의 명령어에 **여러 버튼(서브커맨드)**이 숨어 있습니다!

### 이런 상황에서 유용해요
- **처음 시작**: 설치 후 로그인하고 상태를 확인하고 싶을 때
- **에이전트 활용**: 어떤 AI 에이전트를 쓸 수 있는지 알고 싶을 때
- **문서 작업**: PDF, 이미지 같은 파일을 클로드에게 읽히고 싶을 때

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | auth, agents, PDF 읽기 등 핵심 서브커맨드 | 💡 개념 |
| 2 | 인증 관리, 에이전트 확인, PDF 페이지 읽기 실습 | 🔧 실습 |
| 3 | CLI 명령어 치트시트 총정리 | 💻 예제 |

### 핵심 비유: TV 리모컨

\`\`\`
TV 리모컨                          claude 명령어
━━━━━━━━━━━━━━━                    ━━━━━━━━━━━━━━━━━━━━━━━
┌─────────────┐                    ┌─────────────────────┐
│  전원       │  ← 켜고 끄기       │  claude              │  ← 대화 시작
│  채널       │  ← 채널 변경       │  claude auth login   │  ← 로그인
│  볼륨       │  ← 소리 조절       │  claude auth status  │  ← 상태 확인
│  입력       │  ← HDMI/USB       │  claude agents       │  ← 에이전트 목록
│  설정       │  ← 환경설정        │  claude config       │  ← 설정 변경
└─────────────┘                    └─────────────────────┘

리모컨 버튼 하나 = 서브커맨드 하나!
\`\`\`

리모컨의 전원 버튼만 누르면 TV가 켜지듯, \`claude\`만 치면 대화가 시작돼요.
채널 버튼을 누르면 다른 기능이 실행되듯, \`claude auth login\`을 치면 로그인이 됩니다!`,

  concepts: [
    {
      id: "auth-commands",
      title: "claude auth (계정 관리 버튼)",
      content: `### 계정 관리 — 로그인, 상태 확인, 로그아웃

TV를 처음 샀을 때 Wi-Fi 연결을 하듯, 클로드 코드를 처음 쓸 때도 **로그인**을 해야 합니다.

\`claude auth\`는 리모컨의 **계정/설정 버튼**과 같아요.

#### 세 가지 서브커맨드

| 서브커맨드 | 하는 일 | 비유 |
|-----------|--------|------|
| \`claude auth login\` | 로그인 | Wi-Fi 처음 연결하기 |
| \`claude auth status\` | 상태 확인 | Wi-Fi 연결 상태 보기 |
| \`claude auth logout\` | 로그아웃 | Wi-Fi 연결 끊기 |

#### 언제 쓰나요?

- **처음 설치했을 때**: \`claude auth login\`으로 계정 연결
- **잘 되는지 확인**: \`claude auth status\`로 토큰 상태 점검
- **다른 계정 쓸 때**: \`claude auth logout\` → \`claude auth login\`

> **팁**: 대부분 한 번 로그인하면 신경 쓸 필요 없어요! 문제가 생겼을 때만 \`auth status\`를 확인하면 됩니다.

> **핵심 요약**: \`claude auth\`는 로그인(login), 상태 확인(status), 로그아웃(logout) 3가지 서브커맨드로 계정을 관리합니다. 처음 한 번 로그인하면 이후엔 신경 쓸 필요 없어요.`
    },
    {
      id: "agents-command",
      title: "claude agents (에이전트 목록 버튼)",
      content: `### 사용 가능한 에이전트 한눈에 보기

리모컨의 "채널 목록" 버튼을 누르면 시청 가능한 채널이 보이듯,
\`claude agents\`를 실행하면 사용 가능한 에이전트 목록이 나옵니다.

#### 에이전트란?

에이전트는 **특정 역할에 맞게 설정된 클로드**입니다.

\`\`\`
기본 클로드 = 만능 리모컨 (뭐든 가능)
에이전트   = 전문 리모컨 (특정 역할에 특화)
\`\`\`

예를 들어:
- **코드 리뷰 에이전트**: 코드를 검토하고 피드백
- **테스트 에이전트**: 테스트 코드를 작성
- **문서 에이전트**: 문서를 정리하고 작성

#### /rename으로 대화 이름 짓기

대화가 쌓이면 어떤 대화가 뭔지 헷갈리죠? \`/rename\`을 사용하면 대화 내용을 분석해서 **자동으로 이름**을 지어줍니다.

\`\`\`
세션 안에서:
> /rename

결과: "프로젝트 구조 리팩토링 논의" 로 이름이 변경됨
\`\`\`

> 파일 이름을 정리하면 나중에 찾기 쉽듯, 대화 이름을 정리하면 나중에 참고하기 편해요!

#### v2.1.70에서 추가/개선된 커맨드

| 커맨드 | 설명 |
|--------|------|
| \`/copy\` | 코드 블록을 선택해서 클립보드 복사 (인터랙티브 피커) |
| \`/color\` | 테마 색상 변경 (\`/color default\`, \`/color gray\`, \`/color reset\`) |
| \`/reload-plugins\` | 플러그인 변경사항 재로드 (재시작 없이) |
| \`/context\` | 현재 컨텍스트 사용량 및 스킬 로드 상태 확인 |

#### Opus 4.6 기본 모델 변경 (v2.1.68)

v2.1.68부터 **Opus 4.6**이 기본 모델이 되었고, **medium effort**가 기본입니다.
"ultrathink"을 입력하면 다음 턴에서 **high effort**로 전환됩니다.

> 이전 모델(Opus 4, 4.1)은 제거되었습니다.

#### v2.1.72에서 추가/개선된 기능

| 기능 | 설명 |
|------|------|
| **effort 간소화** | low(○) / medium(◐) / high(●) 3단계로 단순화, \`/effort auto\`로 기본값 복원 |
| **\`/plan\` 인수** | \`/plan fix the auth bug\`처럼 설명을 바로 전달 가능 (즉시 플랜 모드 시작) |
| **\`/copy\`에서 \`w\` 키** | 선택한 코드를 클립보드 대신 **파일에 직접 쓰기** (SSH 환경에서 유용) |
| **\`ExitWorktree\`** | 워크트리에서 원래 위치로 돌아오는 도구 추가 |
| **Agent \`model\` 파라미터** | 에이전트별로 다른 모델 지정 가능 (복원됨) |

#### v2.1.73~2.1.74에서 추가/개선된 기능

| 기능 | 설명 |
|------|------|
| **\`/context\` 강화** | 컨텍스트 사용량 + **최적화 제안**까지 (과다 도구 사용, 메모리 비대화, 용량 경고) |
| **\`modelOverrides\`** | 모델 피커를 커스텀 프로바이더 모델 ID에 매핑 (Bedrock ARN, Vertex 리전 등) |
| **\`/output-style\` deprecated** | \`/config\`로 통합 — 세션 시작 시 고정으로 프롬프트 캐싱 효율 향상 |
| **\`/effort\` 응답 중 변경** | \`/model\`처럼 클로드 응답 중에도 effort 레벨 변경 가능 |
| **Agent 풀 모델 ID** | \`claude-opus-4-6\` 등 전체 모델 ID를 에이전트 \`model:\`에 사용 가능 (기존엔 무시됨) |

##### \`/context\` — 컨텍스트 건강 검진 (v2.1.74)

기존 \`/context\`는 "몇 토큰 사용 중"만 보여줬는데, 이제 **구체적인 최적화 제안**도 해줍니다!

\`\`\`
비유: 건강검진표

기존 /context:
  "체중: 89kg"               ← 숫자만 알려줌

v2.1.74 /context:
  "체중: 89kg"               ← 숫자 +
  "⚠️ 운동 부족: 주 3회 추천"  ← 구체적 개선 제안!
  "⚠️ 식단: 야식 줄이기"       ← 원인 분석!
\`\`\`

감지하는 항목:
| 항목 | 제안 | 효과 |
|------|------|------|
| 큰 파일 반복 읽기 | "offset/limit 파라미터를 사용하세요" | 토큰 절약 |
| 메모리 파일 과다 | "auto-memory 23개 파일 → 점검/정리" | 불필요한 메모리 삭제 |
| 미사용 MCP 서버 | "3개 서버에 사용 안 하는 도구 → /mcp 해제" | 도구 목록 정리 |
| 용량 80% 초과 | "곧 compaction 발생 → 사전 대비" | 중요 컨텍스트 보존 |

##### \`modelOverrides\` — 모델 리모컨 리매핑 (v2.1.73)

모델 피커에서 "opus"를 선택했을 때 **실제로 사용할 모델 ID**를 지정할 수 있어요.

\`\`\`
비유: TV 리모컨 버튼 리매핑

기존: 1번 버튼 → KBS          지금: 1번 버튼 → 내가 원하는 채널!
      2번 버튼 → MBC                2번 버튼 → 내가 원하는 채널!
\`\`\`

\`\`\`json
// ~/.claude/settings.json
{
  "modelOverrides": {
    "opus": "us.anthropic.claude-opus-4-6-v1:0",
    "sonnet": "claude-sonnet-4-6@us-east5",
    "haiku": "my-gateway/haiku-latest"
  }
}
\`\`\`

| 사용 환경 | 설정 이유 |
|----------|----------|
| AWS Bedrock | 모델 피커 → Bedrock 추론 프로필 ARN으로 라우팅 |
| Google Vertex AI | 모델 피커 → 리전 지정 모델 ID로 매핑 |
| 사내 AI 게이트웨이 | 모델 피커 → 사내 프록시의 커스텀 모델 ID |

##### \`/output-style\` deprecated (v2.1.73)

\`\`\`
이전: /output-style concise    ← 세션 중간에 변경 가능했음
이후: /config                  ← 여기서 모든 설정 통합 관리

이유: output style이 세션 시작 시 고정되어야 "프롬프트 캐싱"이 효율적!
     세션 중간에 바꾸면 캐시가 깨져서 비용이 증가했거든요.
\`\`\`

#### v2.1.76에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **\`-n\` / \`--name\` 플래그** | 세션 시작 시 표시 이름 지정 (\`claude -n "리팩토링"\`) |
| **\`/effort\` 슬래시 커맨드** | 세션 안에서 effort 레벨 변경 (low/medium/high) |
| **1M 컨텍스트** | Opus 4.6 기본 모델에 1M 토큰 컨텍스트 윈도우 |

#### v2.1.77에서 추가/변경된 기능

| 기능 | 설명 |
|------|------|
| **Opus 4.6 출력 토큰 확대** | 기본 출력 64k 토큰, 상한 128k 토큰으로 증가 |
| **\`/copy N\`** | N번째 최근 응답을 클립보드에 복사 (\`/copy 2\` = 두 번째 최근 응답) |
| **\`/fork\` → \`/branch\` 리네임** | \`/fork\`가 \`/branch\`로 이름 변경 (\`/fork\`는 별칭으로 계속 동작) |
| **플랜 기반 세션 자동 네이밍** | 플랜을 수락하면 플랜 제목으로 세션 이름이 자동 설정 |

##### \`/copy N\` — 원하는 응답 골라서 복사 (v2.1.77)

\`\`\`
기존 /copy: 마지막 응답만 복사 가능
신규 /copy N: N번째 최근 응답을 선택 복사!

/copy     → 가장 최근 응답 복사
/copy 1   → 가장 최근 응답 복사 (같은 동작)
/copy 2   → 두 번째 최근 응답 복사
/copy 3   → 세 번째 최근 응답 복사
\`\`\`

> 비유: 대화 기록을 스크롤해서 "이거!" 하고 복사하는 것과 같아요!

#### v2.1.79~2.1.81에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **\`--console\` 인증** | \`claude auth login --console\`로 Anthropic Console(API 결제) 인증 (\`--console\` 플래그) |
| **턴 소요시간 표시** | \`/config\`에서 "Show turn duration" 토글 — 각 턴이 몇 초 걸렸는지 표시 |
| **\`!\` bash 모드 안내** | 대화형 명령이 필요할 때 \`!\` 접두사로 직접 bash 실행하라고 안내 |
| **\`ANTHROPIC_CUSTOM_MODEL_OPTION\`** | \`/model\` 피커에 커스텀 모델 항목 추가 (환경변수, v2.1.78) |

#### v2.1.110~2.1.113에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **\`/tui fullscreen\`** | 한 대화 안에서도 \`/tui fullscreen\`/\`/tui normal\`로 **flicker-free 풀스크린 모드**로 전환 가능 — \`tui\` 설정으로 기본값 지정 (v2.1.110) |
| **\`/focus\` 분리** | 기존 \`Ctrl+O\`가 focus view 토글을 겸하던 방식에서, \`Ctrl+O\`는 **verbose 트랜스크립트 전용**, focus는 \`/focus\`로 독립 분리 (v2.1.110) |
| **\`autoScrollEnabled\`** | 풀스크린 모드에서 대화 자동 스크롤을 끌 수 있는 config — 긴 출력 중간을 읽다가 흐름에 끌려가지 않음 (v2.1.110) |
| **Push notification 도구** | Remote Control + "Push when Claude decides" 설정 시 Claude가 스스로 **모바일 푸시 알림**을 보낼 수 있음 (v2.1.110) |
| **\`Ctrl+G\` 컨텍스트** | 외부 에디터(\`Ctrl+G\`)에서 **Claude의 직전 응답을 주석으로 미리 넣어줌** — \`/config\`에서 활성화 (v2.1.110) |
| **\`xhigh\` effort** | Opus 4.7 전용 — \`high\`와 \`max\` 사이의 **새 effort 단계**. 다른 모델은 자동으로 \`high\`로 폴백 (v2.1.111) |
| **\`/effort\` 슬라이더** | 인자 없이 \`/effort\`를 호출하면 **인터랙티브 슬라이더**가 열려 화살표 키로 탐색, Enter로 확정 (v2.1.111) |
| **Auto mode 기본화** | Opus 4.7 사용 시 Max 구독자는 **자동으로 auto 모드 사용 가능** — \`--enable-auto-mode\` 플래그 불필요 (v2.1.111) |
| **"Auto (match terminal)" 테마** | 터미널의 다크/라이트 모드를 따라가는 테마 — \`/theme\`에서 선택 (v2.1.111) |
| **Plan 파일명 의미화** | 무작위 단어 대신 **프롬프트 기반 파일명** 생성 (예: \`fix-auth-race-snug-otter.md\`) (v2.1.111) |
| **\`/skills\` 토큰 정렬** | \`/skills\` 메뉴에서 \`t\` 키로 **추정 토큰 수 기준 정렬** 토글 (v2.1.111) |
| **\`Ctrl+U\` 전체 삭제** | 입력 버퍼 **전체를 비움**(기존 "줄 처음까지"와 다름). 실수로 지워도 \`Ctrl+Y\`로 복원 (v2.1.111) |
| **\`Ctrl+L\` 재렌더** | 프롬프트 입력 비우기 + **전체 화면 강제 재렌더** (v2.1.111) |
| **typo 제안** | \`claude udpate\`처럼 서브커맨드 오타 시 가장 가까운 명령 제안 ("Did you mean \`claude update\`?") (v2.1.111) |
| **네이티브 바이너리** | CLI가 번들된 JavaScript 대신 **플랫폼별 네이티브 바이너리**로 실행 (플랫폼 별 optional dependency) — 시작 속도 개선 (v2.1.113) |
| **\`Ctrl+A\`/\`Ctrl+E\`** | 멀티라인 입력에서 **현재 논리 줄의 처음/끝**으로 이동 (readline 동작 일치) (v2.1.113) |
| **Windows \`Ctrl+Backspace\`** | 이전 단어 삭제 (v2.1.113) |
| **URL 줄바꿈 유지** | 긴 URL이 터미널 폭으로 줄바꿈돼도 **OSC 8 하이퍼링크가 유지**되어 클릭 가능 (v2.1.113) |
| **Shift+↑/↓ 스크롤** | 풀스크린 모드에서 선택을 뷰포트 밖으로 확장 시 뷰포트도 함께 스크롤 (v2.1.113) |
| **\`/extra-usage\`** | Remote Control(모바일/웹) 클라이언트에서도 \`/extra-usage\` 실행 가능 (v2.1.113) |

#### v2.1.116~2.1.119에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **\`/cost\`+\`/stats\` → \`/usage\`** | 두 커맨드를 \`/usage\`로 **통합** (각각 해당 탭을 여는 단축어로 유지). 5시간/주간 사용량 즉시 표시, rate-limit 시에도 동작 (v2.1.116, 118) |
| **Vim visual mode** | \`v\`(visual) / \`V\`(visual-line) 모드 추가 — 선택, operator, 시각 피드백 지원 (v2.1.118) |
| **커스텀 테마 시스템** | \`/theme\`에서 명명 테마 생성/전환 또는 \`~/.claude/themes/\` JSON 직접 편집. 플러그인이 \`themes/\` 디렉터리로 테마 배포 가능 (v2.1.118) |
| **\`/config\` 영속화** | \`/config\` 설정(테마, 에디터 모드, verbose 등)이 \`~/.claude/settings.json\`에 **영속**되며 project/local/policy 우선순위 체계 참여 (v2.1.119) |
| **\`/config\` 값 검색** | \`/config\` 검색이 옵션 **값까지 매칭** — "vim" 검색이 Editor mode 항목을 찾아냄 (v2.1.116) |
| **\`/resume\` 67% 빠름** | 40MB 이상 큰 세션에서 최대 67% 빠르게 재개. dead-fork 엔트리 많은 세션도 효율적 처리 (v2.1.116) |
| **\`/resume\` 큰 세션 요약** | 오래되고 큰 세션을 다시 읽기 전 **요약** 옵션 제공 (\`--resume\` 동작과 통일) (v2.1.117) |
| **\`/add-dir\` 세션 복원** | \`--continue\`/\`--resume\`이 \`/add-dir\`로 현재 디렉터리를 추가했던 세션도 찾아냄 (v2.1.118) |
| **\`DISABLE_UPDATES\` 환경변수** | \`claude update\` 수동 실행까지 포함해 **모든 업데이트 경로 차단** — \`DISABLE_AUTOUPDATER\`보다 강함 (v2.1.118) |
| **\`prUrlTemplate\`** | 풋터 PR 배지가 github.com 대신 **커스텀 코드 리뷰 URL**을 가리키도록 설정 가능 (v2.1.119) |
| **\`CLAUDE_CODE_HIDE_CWD\`** | 시작 로고에서 작업 디렉터리를 **숨기는** 환경변수 — 시연/스크린샷에 유용 (v2.1.119) |
| **\`owner/repo#N\` git remote** | 출력의 \`owner/repo#N\` 단축링크가 항상 github.com이 아닌 **현재 git remote의 호스트**를 사용 (GHE/GitLab 등) (v2.1.119) |
| **\`/color\` Remote Control 동기화** | \`/color\`가 Remote Control 연결 시 claude.ai/code의 액센트 색상에 자동 동기화 (v2.1.118) |
| **\`/model\` 영속화** | 프로젝트가 다른 모델로 핀되어 있어도 \`/model\` 선택이 재시작 후 유지. 시작 헤더가 모델 출처(프로젝트 핀/managed) 표시 (v2.1.117) |
| **\`/model\` 게이트웨이 오버라이드** | 커스텀 \`ANTHROPIC_BASE_URL\` 게이트웨이 사용 시 \`/model\` 피커가 \`ANTHROPIC_DEFAULT_*_MODEL_NAME\`/\`_DESCRIPTION\` 오버라이드 존중 (v2.1.118) |
| **Pro/Max 기본 effort \`high\`** | Pro/Max 구독자의 Opus 4.6/4.7 기본 effort가 medium → \`high\` (v2.1.117) |
| **Thinking spinner inline** | "still thinking", "thinking more", "almost done thinking"처럼 **인라인 진행 표시**로 별도 힌트 줄 대체 (v2.1.116) |
| **\`/doctor\` 응답 중 호출** | Claude가 응답 중이어도 \`/doctor\`를 즉시 열 수 있음 — 현재 턴 종료 대기 불필요 (v2.1.116) |
| **slash command 하이라이트** | 슬래시 커맨드 추천이 검색어와 **매칭된 문자**를 강조 표시 (v2.1.119) |
| **slash command 줄바꿈** | 슬래시 커맨드 피커가 긴 설명을 자르지 않고 **두 번째 줄**로 감싸서 표시 (v2.1.119) |
| **status line 효과 정보** | status line stdin JSON에 \`effort.level\`과 \`thinking.enabled\` 포함 — 살아있는 상태 표시 가능 (v2.1.119) |
| **\`cleanupPeriodDays\` 확대** | 보존 정리 스윕이 \`~/.claude/tasks/\`, \`shell-snapshots/\`, \`backups/\`까지 커버 (v2.1.117) |

##### \`/usage\` — 비용 + 통계 한 화면에서 (v2.1.118)

\`\`\`
비유: 가계부 + 활동 기록을 합친 대시보드

기존: /cost (모델별 비용) + /stats (메시지 횟수/시간) → 두 커맨드를 따로 호출
이후: /usage 한 곳에서 비용 + 통계 + 5시간/주간 사용량 모두 확인
     /cost·/stats는 단축어로 살아있어 → 평소 습관대로 입력하면 자동으로 해당 탭으로
\`\`\`

##### Vim visual mode (v2.1.118)

\`\`\`
NORMAL 모드에서:
  v   →  visual 모드 진입 (글자 단위 선택)
  V   →  visual-line 모드 진입 (줄 단위 선택)
  d   →  선택 영역 삭제
  y   →  선택 영역 복사
  Esc →  NORMAL로 복귀
\`\`\`

> 그동안 vim 사용자에게 부족했던 마지막 핵심 모드가 채워졌습니다. 멀티라인 프롬프트 편집이 vim 사용자의 손에 익은 방식 그대로 동작합니다.

##### 커스텀 테마 (v2.1.118)

\`\`\`bash
# 1. 명명 테마 생성/편집/전환
claude → /theme → "Create new theme..."

# 2. 직접 JSON 편집
ls ~/.claude/themes/
# my-dark.json   pastel.json   ...

# 3. 플러그인이 themes/ 디렉터리로 배포 가능
my-plugin/
├── .claude-plugin/
│   └── plugin.json
└── themes/
    ├── ocean.json
    └── sunset.json
\`\`\`

\`\`\`
비유: 학생이 직접 디자인한 교실 색깔표

기존: 빌트인 라이트/다크 + Auto (match terminal) 만 선택 가능
이후: 색상 토큰을 JSON으로 자유롭게 정의 → 팀 브랜드 컬러나 개인 취향에 맞춤
     플러그인 설치만으로 새 테마가 /theme 메뉴에 자동 등록!
\`\`\`

#### v2.1.94~2.1.97에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **Focus view 토글** | \`NO_FLICKER\` 모드에서 \`Ctrl+O\`로 Focus 뷰 전환 — 프롬프트 + 한 줄 도구 요약(edit diffstat 포함) + 최종 응답만 집중해서 표시 (v2.1.97) |
| **\`refreshInterval\` 상태줄** | status line 커맨드를 **N초마다 자동 재실행**하는 설정 추가 — 시계/배터리/남은 토큰처럼 살아있는 지표 표시 가능 (v2.1.97) |
| **\`workspace.git_worktree\`** | 상태줄 JSON 입력에 현재 디렉토리가 링크된 git 워크트리 안에 있을 때 해당 필드가 주입됨 (v2.1.97) |
| **Cedar 문법 하이라이트** | \`.cedar\`, \`.cedarpolicy\` 정책 파일 문법 강조 추가 (v2.1.97) |
| **CJK 슬래시/@ 자동완성** | 일본어/중국어 문장 부호 뒤에 공백 없이 \`/\`, \`@\` 입력 시 자동완성이 동작 (v2.1.94) |
| **이미지 토큰 정규화** | 붙여넣기/첨부 이미지도 Read 도구와 동일한 토큰 예산으로 자동 압축 (v2.1.97) |
| **Accept Edits 환경변수 래퍼** | \`LANG=C rm foo\`, \`timeout 5 mkdir out\`처럼 안전한 env/프로세스 래퍼가 붙은 명령도 자동 승인 (v2.1.97) |
| **effort 기본값 상향** | API Key/Bedrock/Vertex/Foundry/Team/Enterprise 사용자의 기본 effort가 medium → **high** — \`/effort\`로 조절 (v2.1.94) |
| **Mantle Bedrock** | \`CLAUDE_CODE_USE_MANTLE=1\`로 Mantle 기반 Amazon Bedrock 사용 (v2.1.94) |

#### v2.1.89~2.1.92에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **\`/powerup\`** | 클로드 코드 기능을 **애니메이션 데모와 함께 배우는** 인터랙티브 레슨 (v2.1.90) |
| **\`/cost\` 모델별 분류** | 구독 사용자에게 모델별 + 캐시 히트 상세 비용 분류 표시 (v2.1.92) |
| **\`/release-notes\` 피커** | 버전을 선택해서 릴리스 노트를 볼 수 있는 인터랙티브 피커 (v2.1.92) |
| **thinking summaries 비활성** | 인터랙티브 세션에서 thinking 요약이 기본 꺼짐 — \`showThinkingSummaries: true\`로 복원 (v2.1.89) |
| **autocompact 쓰래시 감지** | 압축 후 컨텍스트가 바로 다시 차는 것을 3회 연속 감지하면 **자동 중단 + 안내** (v2.1.89) |
| **\`/tag\` 제거** | \`/tag\` 커맨드 삭제됨 (v2.1.92) |
| **\`/vim\` → \`/config\`** | \`/vim\` 커맨드 삭제 — vim 모드는 \`/config\` → Editor mode에서 전환 (v2.1.92) |
| **Bedrock 설정 마법사** | 로그인 화면에서 "3rd-party platform" 선택 시 AWS 인증/리전/모델 핀 설정을 안내하는 인터랙티브 위저드 (v2.1.92) |
| **Write 60% 빠름** | 탭/\`&\`/\`$\` 포함 파일에서 Write 도구 diff 연산 60% 속도 향상 (v2.1.92) |
| **Vertex AI 설정 마법사** | 로그인 화면 "3rd-party platform"에서 GCP 인증, 프로젝트/리전 설정, 모델 핀을 안내하는 인터랙티브 위저드 (v2.1.98) |
| **Vim j/k 히스토리** | Vim 모드 NORMAL에서 \`j\`/\`k\`로 히스토리 탐색 + 입력 경계에서 풋터 필 선택 (v2.1.98) |
| **\`/resume\` 개선** | 프로젝트/워크트리/브랜치명이 필터 표시에 포함, 힌트 라벨 개선 (v2.1.98) |
| **\`/team-onboarding\`** | 로컬 Claude Code 사용 패턴에서 **팀원 온보딩 가이드**를 자동 생성하는 새 명령 (v2.1.101) |
| **\`/ultraplan\` 자동 환경** | 원격 세션 기능이 웹 설정 없이 **기본 클라우드 환경을 자동 생성** (v2.1.101) |
| **\`--resume <name>\` 타이틀** | \`/rename\`이나 \`--name\`으로 설정한 세션 타이틀을 \`--resume <name>\`으로 지정 가능 (v2.1.101) |
| **rate-limit 메시지 개선** | 재시도 시 어떤 제한에 걸렸는지 + 리셋 시점을 표시 (불투명 초 카운트다운 대신) (v2.1.101) |

#### v2.1.83~2.1.84에서 추가된 기능

| 기능 | 설명 |
|------|------|
| **트랜스크립트 검색** | \`Ctrl+O\`(트랜스크립트 모드)에서 \`/\`로 검색, \`n\`/\`N\`으로 이동 (v2.1.83) |
| **\`Ctrl+X Ctrl+E\`** | 외부 에디터 열기 단축키 추가 (\`Ctrl+G\`와 동일 기능) (v2.1.83) |
| **이미지 \`[Image #N]\` 칩** | 붙여넣은 이미지가 커서 위치에 번호 칩으로 삽입되어 위치 참조 가능 (v2.1.83) |
| **토큰 표시 개선** | 1M+ 토큰을 "1.5m"으로 표시 (기존 "1512.6k" 대신) (v2.1.84) |
| **75분 복귀 프롬프트** | 75분 이상 자리 비운 후 돌아오면 \`/clear\` 안내 — 불필요한 토큰 재캐싱 방지 (v2.1.84) |
| **사용 불가 커맨드 숨김** | 현재 인증에서 쓸 수 없는 슬래시 커맨드(\`/voice\`, \`/mobile\` 등)가 숨겨짐 (v2.1.84) |
| **3P 모델 커스텀** | \`ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL_SUPPORTS\` 환경변수로 Bedrock/Vertex/Foundry 기능 오버라이드 (v2.1.84) |

##### \`-n\` / \`--name\` — 세션 이름표 붙이기 (v2.1.76)

\`\`\`
비유: 폴더에 라벨 스티커 붙이기

기존: claude 실행 → 이름 없는 세션 시작 → 나중에 /rename
신규: claude -n "버그수정" → 처음부터 이름이 붙은 세션!
\`\`\`

\`\`\`bash
claude -n "인증 리팩토링"     # 시작할 때부터 이름 지정
claude --name "PR #142 리뷰"  # 긴 형식도 가능
\`\`\`

> 여러 세션을 동시에 열 때 특히 유용해요!

> **핵심 요약**: \`claude agents\`로 사용 가능한 에이전트를 확인하고, \`/rename\`으로 대화 이름을 정리할 수 있습니다. v2.1.68부터 Opus 4.6이 기본 모델이며, \`/copy\`, \`/color\`, \`/context\` 등 편의 커맨드가 추가되었어요.`
    },
    {
      id: "pdf-reading",
      title: "PDF 읽기 (pages 파라미터)",
      content: `### 두꺼운 책에서 원하는 페이지만 펼치기

300페이지짜리 책을 처음부터 끝까지 읽을 필요 없잖아요?
"47페이지를 펼쳐봐"라고 하면 바로 그 페이지를 볼 수 있죠.

클로드 코드에서 PDF를 읽을 때도 마찬가지입니다.

#### 페이지 지정 방식

\`\`\`
pages: "1-5"      ← 1~5페이지 (처음 5장)
pages: "10"       ← 10페이지만
pages: "10-20"    ← 10~20페이지 (중간 부분)
\`\`\`

#### 10페이지 규칙

| PDF 크기 | 읽는 방법 |
|----------|----------|
| 10페이지 이하 | 그냥 읽기 (pages 없이) |
| 10페이지 초과 | \`pages\` 파라미터 필수! |

> **왜?** 큰 PDF를 한 번에 다 읽으면 클로드의 메모리(컨텍스트 윈도우)를 너무 많이 차지합니다.
> 원하는 부분만 읽는 게 효율적이에요!

#### 실전 팁

\`\`\`
"이 PDF의 3페이지를 읽어줘"
"이 논문의 1-5페이지 요약해줘"
"매뉴얼의 15-20페이지에서 설치 방법 찾아줘"
\`\`\`

원하는 페이지만 콕 집어서 읽을 수 있습니다!

> **핵심 요약**: 10페이지 초과 PDF는 반드시 \`pages\` 파라미터로 범위를 지정해야 합니다. 한 번에 최대 20페이지까지 읽을 수 있으며, 원하는 부분만 콕 집어 읽으면 컨텍스트를 절약할 수 있어요.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "인증 관리 (auth) 실습",
      content: `### 리모컨 첫 설정 — 로그인하기

클로드 코드를 처음 사용할 때, 또는 계정 상태를 확인할 때 사용하는 \`claude auth\` 명령어를 실습합니다.

#### 순서

1. \`claude auth status\`로 현재 상태 확인
2. 로그인이 안 되어 있으면 \`claude auth login\` 실행
3. 다시 \`claude auth status\`로 확인`,
      terminals: [
        {
          command: "claude auth status",
          output: `Authentication Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Provider:       Anthropic
Account:        user@example.com
Token Status:   Valid
Expires:        2026-03-22T10:00:00Z
Plan:           Pro

✓ 인증이 정상입니다.`
        },
        {
          command: "claude auth login",
          output: `Anthropic 인증을 시작합니다...
브라우저에서 인증 페이지가 열립니다.

브라우저에서 로그인을 완료하세요...
✓ 로그인 성공!

Provider:  Anthropic
Account:   user@example.com`
        },
        {
          command: "claude auth logout",
          output: `✓ 로그아웃되었습니다.
다시 로그인하려면 'claude auth login'을 실행하세요.`
        }
      ]
    },
    {
      id: "step-02",
      title: "에이전트 목록 & 대화 이름 변경",
      content: `### 에이전트 확인하고, 대화 이름 정리하기

\`claude agents\`로 사용 가능한 에이전트를 확인하고,
\`/rename\`으로 대화에 의미 있는 이름을 붙여봅시다.`,
      terminals: [
        {
          command: "claude agents",
          output: `Available Agents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Name                 Source          Description
  ────                 ──────          ───────────
  code-reviewer        .claude/agents  코드 리뷰 전문 에이전트
  test-writer          .claude/agents  테스트 코드 작성 에이전트
  doc-writer           .claude/agents  문서 작성 에이전트

총 3개 에이전트를 사용할 수 있습니다.`
        },
        {
          command: "# 세션 안에서 /rename 실행",
          output: `> /rename

대화 내용을 분석 중...
✓ 대화 이름이 "프로젝트 구조 리팩토링 논의"로 변경되었습니다.

(이전 이름: "Untitled conversation")`
        },
        {
          command: "# 대화 목록 확인",
          output: `최근 대화:
  1. 프로젝트 구조 리팩토링 논의    (2026-02-22)
  2. API 엔드포인트 설계            (2026-02-21)
  3. 버그 수정 #142                 (2026-02-20)

(이름을 정리하니 어떤 대화인지 바로 알 수 있죠!)`
        }
      ]
    },
    {
      id: "step-03",
      title: "PDF 페이지 읽기 실습",
      content: `### 두꺼운 PDF에서 원하는 페이지만 읽기

큰 PDF 파일을 읽을 때 pages 파라미터를 사용하는 방법을 실습합니다.

#### 시나리오: 50페이지짜리 매뉴얼에서 설치 부분만 읽기`,
      terminals: [
        {
          command: "# 클로드에게 PDF 읽기 요청",
          output: `> manual.pdf의 3-5페이지를 읽어줘

Claude: manual.pdf의 3~5페이지를 읽겠습니다.

📄 manual.pdf (3-5페이지)
━━━━━━━━━━━━━━━━━━━━━━━━━━

## 3. 설치 방법

### 3.1 시스템 요구사항
- OS: macOS 12+, Ubuntu 22.04+, Windows 11
- 메모리: 8GB 이상
- 디스크: 500MB 이상

### 3.2 설치 순서
1. 공식 사이트에서 다운로드
2. 설치 프로그램 실행
...`
        },
        {
          command: "# 10페이지 이하 PDF는 그냥 읽기",
          output: `> summary.pdf를 읽어줘

Claude: summary.pdf (8페이지)를 읽겠습니다.
(10페이지 이하이므로 pages 파라미터 없이 전체를 읽습니다)`
        },
        {
          command: "# 큰 PDF에서 범위를 나눠 읽기",
          output: `> thesis.pdf에서 결론 부분(45-50페이지)을 요약해줘

Claude: thesis.pdf의 45~50페이지를 읽고 요약하겠습니다.

📄 결론 요약:
본 연구에서는... (중략)
핵심 발견 3가지:
1. ...
2. ...
3. ...`
        }
      ]
    }
  ],

  examples: [
    {
      id: "cli-cheatsheet",
      title: "CLI 명령어 치트시트",
      content: `### 리모컨 버튼 총정리

자주 사용하는 서브커맨드를 한눈에 정리한 치트시트입니다.

#### 인증 관련 (계정 버튼)

\`\`\`bash
claude auth login          # 로그인
claude auth status         # 상태 확인
claude auth logout         # 로그아웃
\`\`\`

#### 에이전트 관련 (에이전트 버튼)

\`\`\`bash
claude agents              # 에이전트 목록 보기
\`\`\`

#### 세션 관련 (설정 버튼)

\`\`\`bash
/rename                    # 대화 이름 자동 생성
\`\`\`

#### PDF 읽기 (페이지 선택 버튼)

\`\`\`bash
# 세션 안에서 요청
"이 PDF의 1-5페이지를 읽어줘"
"10-15페이지만 요약해줘"
\`\`\`

#### 기타 유용한 옵션

\`\`\`bash
claude --version           # 버전 확인
claude --help              # 도움말 보기
claude --debug             # 디버그 모드
claude --worktree          # 워크트리 모드
\`\`\``,
      checklist: [
        "claude auth login/status/logout 사용법을 알고 있다",
        "claude agents로 에이전트 목록을 확인할 수 있다",
        "/rename으로 대화 이름을 자동 생성할 수 있다",
        "PDF 읽을 때 pages 파라미터로 범위를 지정할 수 있다",
        "10페이지 초과 PDF에는 pages가 필수라는 것을 이해한다"
      ]
    }
  ],

  quiz: [
    {
      question: "claude 명령어의 서브커맨드를 가장 잘 설명한 비유는?",
      options: [
        "TV 리모컨의 여러 버튼처럼 각각 다른 기능을 실행한다",
        "여러 개의 TV를 동시에 켜는 것과 같다",
        "TV 채널을 순서대로 돌리는 것과 같다"
      ],
      answer: 0,
      explanation: "claude 뒤에 서브커맨드를 붙이면 각각 다른 기능이 실행됩니다. 전원 버튼(claude)은 대화를 시작하고, 채널 버튼(claude auth)은 인증을 관리하는 것처럼요!"
    },
    {
      question: "현재 로그인 상태를 확인하려면 어떤 명령어를 사용하나요?",
      options: [
        "claude login",
        "claude auth status",
        "claude check"
      ],
      answer: 1,
      explanation: "claude auth status는 현재 인증 상태(로그인 여부, 토큰 유효기간 등)를 보여줍니다. auth는 인증(Authentication)의 줄임말입니다."
    },
    {
      question: "50페이지짜리 PDF를 읽을 때 올바른 방법은?",
      options: [
        "그냥 '이 PDF 읽어줘'라고 하면 된다",
        "pages 파라미터로 원하는 범위를 지정해야 한다",
        "PDF는 클로드 코드로 읽을 수 없다"
      ],
      answer: 1,
      explanation: "10페이지를 초과하는 PDF는 반드시 pages 파라미터로 범위를 지정해야 합니다. 예: '이 PDF의 1-5페이지를 읽어줘'. 한번에 최대 20페이지까지 읽을 수 있습니다."
    },
    {
      question: "/rename 커맨드의 역할은?",
      options: [
        "파일 이름을 변경한다",
        "대화 내용을 분석해서 대화 이름을 자동 생성한다",
        "클로드의 이름을 바꾼다"
      ],
      answer: 1,
      explanation: "/rename은 현재 대화의 내용을 분석해서 의미 있는 이름을 자동으로 지어줍니다. 'Untitled conversation' 대신 '프로젝트 구조 리팩토링 논의' 같은 이름이 생깁니다."
    },
    {
      question: "claude agents 명령어는 무엇을 보여주나요?",
      options: [
        "현재 실행 중인 에이전트의 작업 상태",
        "사용 가능한 에이전트의 목록과 설명",
        "에이전트를 새로 만드는 마법사"
      ],
      answer: 1,
      explanation: "claude agents는 .claude/agents/ 폴더에 설정된 에이전트들의 목록, 이름, 설명을 보여줍니다. 어떤 에이전트를 사용할 수 있는지 확인할 때 사용합니다."
    }
  ]
};
