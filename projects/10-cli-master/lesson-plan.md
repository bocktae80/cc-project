# 튜터 지시서: CLI 마스터

> 이 파일은 `/learn 10` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

터미널에서 Claude의 서브커맨드를 활용하는 방법을 배운다.

## 핵심 비유

"TV 리모컨에 전원 버튼만 있는 건 아니잖아요? 볼륨, 채널, 메뉴 버튼도 있죠. `claude`가 전원 버튼이라면, `claude auth`, `claude agents` 같은 서브커맨드가 다른 버튼들이에요!"

## 연습 파일

- 인증 관리: `projects/10-cli-master/examples/auth-flow/README.md`
- 에이전트 목록: `projects/10-cli-master/examples/agent-list/README.md`
- PDF 읽기: `projects/10-cli-master/examples/pdf-reader/README.md`

## 교육 흐름

### Step 1: 서브커맨드 전체 맵

1. "터미널에서 claude만 치면 대화가 시작되지만, 다른 기능도 많아요!"
2. 핵심 서브커맨드 소개:
   - `claude` — 대화 시작 (전원 버튼)
   - `claude auth login` — 로그인
   - `claude auth status` — 로그인 상태 확인
   - `claude auth logout` — 로그아웃
   - `claude agents` — 사용 가능한 에이전트 목록
   - `claude --version` — 버전 확인
   - `claude --help` — 전체 도움말
3. "리모컨 설명서처럼, 어떤 버튼이 있는지 한번 쭉 살펴볼게요!"

### Step 2: 인증 관리 (claude auth)

1. examples/auth-flow/README.md를 Read로 읽어 참고
2. 인증 흐름 설명:
   - `claude auth status` → 현재 로그인 상태 확인
   - `claude auth login` → 브라우저에서 로그인
   - `claude auth logout` → 로그아웃
3. "Wi-Fi에 비밀번호 넣고 연결하는 것처럼, 한 번 로그인하면 계속 연결돼 있어요"
4. 사용자에게 제안: "지금 인증 상태를 확인해볼까요?"

### Step 3: 에이전트와 대화 이름

1. examples/agent-list/README.md를 Read로 읽어 참고
2. `claude agents` 설명:
   - 현재 사용 가능한 에이전트(서브에이전트) 목록 확인
   - `.claude/agents/` 폴더에 정의된 에이전트 표시
3. `/rename` 커맨드 설명:
   - 대화에 이름이 자동으로 붙음
   - `/rename`으로 직접 변경 가능
   - 나중에 대화 기록을 찾을 때 유용

### Step 4: PDF 읽기 + 마무리 퀴즈

1. examples/pdf-reader/README.md를 Read로 읽어 참고
2. Read 도구의 PDF 기능:
   - `.pdf` 파일도 Read 도구로 읽을 수 있음
   - `pages` 파라미터로 특정 페이지만 읽기 (예: `pages: "1-5"`)
   - 큰 PDF는 반드시 pages를 지정해야 함 (10페이지 이상)
3. "교과서에서 특정 장만 펼쳐 읽는 것처럼, PDF에서도 원하는 페이지만 골라 읽을 수 있어요!"

퀴즈:
1. "로그인 상태를 확인하는 명령어는?"
   → 정답: claude auth status
2. "사용 가능한 에이전트 목록을 보는 명령어는?"
   → 정답: claude agents
3. "큰 PDF(10페이지 이상)를 읽을 때 꼭 써야 하는 파라미터는?"
   → 정답: pages (예: pages: "1-5")

### 마무리

"이제 터미널에서 클로드를 자유자재로 다룰 수 있어요! 리모컨의 모든 버튼을 마스터한 거예요.
다음 추천: `/learn 06`으로 Hooks를 배우거나, `/learn 08`로 나만의 커맨드를 만들어보세요!"
