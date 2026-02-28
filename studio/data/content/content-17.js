window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["17-plugin-system"] = {
  overview: `## 플러그인 시스템 — 앱스토어처럼 기능 설치하기

스마트폰에 **앱스토어**가 있잖아요? 게임, 카메라, 계산기 앱을 따로 설치해서 쓰듯,
클로드 코드에도 **필요한 기능을 설치해서 쓸 수 있는 시스템**이 있어요!

지금까지 배운 Skills(08), Hooks(06), Agents(05)를 각각 설치했다면,
플러그인은 이것들을 **한 번에 묶어서 설치**할 수 있는 번들이에요.

### 개별 설치 vs 플러그인 (앱 번들)

\`\`\`
개별 설치 (하나씩)                 플러그인 (한 번에)
──────────────────               ──────────────────
[Skills 설치]                     [deploy-plugin 설치]
[Hooks 설치]                        ├── Skills 포함
[Agents 설치]                       ├── Hooks 포함
[설정 파일 작성]                     ├── Agents 포함
3번 설치 + 설정                     └── 설정 자동!
                                  1번 설치로 끝!
\`\`\`

### 핵심 학습 내용

| 개념 | 설명 | 비유 |
|------|------|------|
| 플러그인 | Skills+Hooks+Agents 번들 | 앱 패키지 |
| plugin.json | 플러그인 설명서 | 앱 정보 페이지 |
| \`claude plugin add\` | 플러그인 설치 | 앱 다운로드 |
| \`claude plugin remove\` | 플러그인 제거 | 앱 삭제 |
| npm/git 배포 | 플러그인 공유 | 앱스토어 등록 |`,

  concepts: [
    {
      id: "what-is-plugin",
      title: "플러그인이란? (앱 번들 비유)",
      content: `### 개별 앱 vs 앱 번들

스마트폰에서 "여행 앱 번들"을 설치하면 지도, 번역기, 환율 계산기가 한 번에 깔리잖아요?
플러그인도 마찬가지예요.

\`\`\`
스마트폰 앱                        Claude Code
─────────────                     ─────────────
개별 앱                            개별 기능
  게임 앱                            Skill (/deploy)
  카메라 앱                          Hook (pre-commit)
  계산기 앱                          Agent (reviewer)

앱 번들                            플러그인
  "사진 편집 번들"                    "deploy-plugin"
    ├── 카메라 앱                      ├── Skill: /deploy
    ├── 필터 앱                        ├── Hook: pre-deploy 검사
    └── 갤러리 앱                      └── Agent: deploy-checker
\`\`\`

#### 플러그인이 포함할 수 있는 것

\`\`\`
plugin.json (설명서)
├── skills/           슬래시 커맨드 (/deploy, /test 등)
├── hooks/            이벤트 반응 (저장 시 실행 등)
├── agents/           특수 에이전트 (리뷰어, 테스터 등)
├── commands/         자동 실행 명령
└── settings/         기본 설정값
\`\`\`

#### 왜 플러그인을 쓸까?

| 비교 | 개별 설치 | 플러그인 |
|------|----------|---------|
| 설치 | 파일마다 따로 | 한 번에 |
| 업데이트 | 각각 수동 | 한 번에 |
| 공유 | 파일 복사 | npm/git으로 |
| 의존성 | 직접 관리 | 자동 해결 |
| 제거 | 파일마다 삭제 | 한 번에 |

> **정리**: 플러그인 = 관련 기능을 하나로 묶어서 설치/관리/공유를 쉽게!`
    },
    {
      id: "plugin-manifest",
      title: "plugin.json 매니페스트 구조",
      content: `### 앱 정보 페이지 = plugin.json

앱스토어에서 앱을 다운로드하기 전에 정보 페이지를 보잖아요?
이름, 설명, 스크린샷, 버전, 권한 등이 나오죠. plugin.json이 그 역할이에요.

#### 기본 구조

\`\`\`json
{
  "name": "my-deploy-plugin",
  "version": "1.0.0",
  "description": "배포 자동화 플러그인",
  "author": "홍길동",

  "skills": [
    {
      "name": "deploy",
      "description": "프로젝트를 배포합니다",
      "path": "./skills/deploy.md"
    }
  ],

  "hooks": [
    {
      "event": "pre-commit",
      "command": "npm run lint",
      "description": "커밋 전 린트 검사"
    }
  ],

  "agents": [
    {
      "name": "deploy-checker",
      "description": "배포 전 체크리스트 검증",
      "path": "./agents/deploy-checker.md"
    }
  ]
}
\`\`\`

#### 필드별 설명

\`\`\`
plugin.json 필드 맵
═══════════════════════════

[기본 정보]
  name ─────── 플러그인 이름 (영문, kebab-case)
  version ──── 버전 번호 (1.0.0 형식)
  description  한글 설명
  author ───── 만든 사람

[기능 목록]
  skills ───── 슬래시 커맨드 목록
  hooks ────── 이벤트 반응 목록
  agents ───── 에이전트 목록
  commands ─── 자동 실행 명령 목록

[메타 정보]
  dependencies  의존하는 다른 플러그인
  repository ── GitHub 저장소 URL
  license ───── 라이선스 (MIT 등)
\`\`\`

#### 앱 정보 페이지와 비교

| 앱스토어 | plugin.json | 역할 |
|----------|------------|------|
| 앱 이름 | name | 식별자 |
| 앱 설명 | description | 뭘 하는 플러그인인지 |
| 버전 | version | 업데이트 관리 |
| 개발자 | author | 누가 만들었는지 |
| 권한 | hooks (이벤트) | 어떤 이벤트에 반응하는지 |
| 스크린샷 | (README.md) | 사용 예시 |`
    },
    {
      id: "install-update-remove",
      title: "설치, 업데이트, 제거 방법",
      content: `### 앱 다운로드/업데이트/삭제 = 플러그인 관리

스마트폰에서 앱을 설치/업데이트/삭제하듯, 플러그인도 간단하게 관리할 수 있어요.

#### 설치 (앱 다운로드)

\`\`\`bash
# npm 패키지에서 설치
claude plugin add @team/deploy-plugin

# GitHub 저장소에서 설치
claude plugin add github:username/my-plugin

# 로컬 폴더에서 설치
claude plugin add ./my-local-plugin
\`\`\`

#### 목록 확인 (설치된 앱 보기)

\`\`\`bash
claude plugin list

# 결과:
# Installed plugins:
#   1. @team/deploy-plugin (v1.2.0)
#   2. @team/test-plugin (v2.0.1)
#   3. my-local-plugin (v0.1.0, local)
\`\`\`

#### 업데이트 (앱 업데이트)

\`\`\`bash
# 특정 플러그인 업데이트
claude plugin update @team/deploy-plugin

# 모든 플러그인 업데이트
claude plugin update --all
\`\`\`

#### 제거 (앱 삭제)

\`\`\`bash
claude plugin remove @team/deploy-plugin
\`\`\`

#### 관리 명령어 정리

\`\`\`
플러그인 라이프사이클
═══════════════════

[검색]  어떤 플러그인이 있나?
  └── claude plugin search "키워드"

[설치]  다운로드!
  └── claude plugin add <이름>

[사용]  /명령어로 실행
  └── /deploy, /test 등

[업데이트]  새 버전 나왔다!
  └── claude plugin update <이름>

[제거]  더 이상 필요 없다
  └── claude plugin remove <이름>
\`\`\`

#### 설치 소스별 비교

| 소스 | 명령 | 장점 | 단점 |
|------|------|------|------|
| npm | \`plugin add @scope/name\` | 버전 관리, 자동 업데이트 | npm 계정 필요 |
| GitHub | \`plugin add github:user/repo\` | 코드 공개, 무료 | 버전 관리 수동 |
| 로컬 | \`plugin add ./path\` | 빠른 테스트, 비공개 | 공유 어려움 |`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "플러그인 검색 & 설치",
      content: `### 앱스토어에서 앱 찾기 = 플러그인 검색

원하는 기능의 플러그인을 찾아서 설치해 봅시다.
앱스토어에서 "카메라"를 검색하듯, 키워드로 플러그인을 검색할 수 있어요.

#### 검색하기

\`\`\`bash
# 키워드로 검색
claude plugin search "deploy"
claude plugin search "test"
claude plugin search "lint"
\`\`\`

#### 설치하기

\`\`\`bash
# 검색 결과에서 마음에 드는 플러그인 설치
claude plugin add @community/auto-deploy

# 설치 확인
claude plugin list
\`\`\`

#### 설치 후 확인사항

\`\`\`
플러그인 설치 후:
┌──────────────────────────────────┐
│ 1. 새 슬래시 커맨드가 추가됐나?    │
│    → /deploy 등 확인               │
│                                    │
│ 2. 새 훅이 등록됐나?              │
│    → pre-commit 등 확인            │
│                                    │
│ 3. 새 에이전트가 추가됐나?         │
│    → claude agents로 확인          │
└──────────────────────────────────┘
\`\`\``,
      terminals: [
        {
          command: "# 플러그인 검색",
          output: `> claude plugin search "deploy"

Searching plugins...

Results for "deploy":
  1. @community/auto-deploy (v2.1.0)
     "원클릭 배포 자동화 (Vercel, Netlify, AWS)"
     Downloads: 1,234 | Rating: 4.8

  2. @team/deploy-checker (v1.5.0)
     "배포 전 체크리스트 자동 검증"
     Downloads: 856 | Rating: 4.6

  3. @community/deploy-notify (v1.0.2)
     "배포 완료 시 Slack 알림"
     Downloads: 432 | Rating: 4.3

Install with: claude plugin add <package-name>`
        },
        {
          command: "# 플러그인 설치 & 확인",
          output: `> claude plugin add @community/auto-deploy

Installing @community/auto-deploy@2.1.0...

Package contents:
  Skills:  /deploy, /deploy-preview
  Hooks:   pre-deploy (lint + test)
  Agents:  deploy-reviewer

Installing dependencies... done
Registering skills... done
Registering hooks... done
Registering agents... done

Successfully installed @community/auto-deploy!

New commands available:
  /deploy          - 프로덕션 배포
  /deploy-preview  - 프리뷰 배포

> claude plugin list

Installed plugins:
  1. @community/auto-deploy (v2.1.0)
     Skills: /deploy, /deploy-preview
     Hooks: pre-deploy
     Agents: deploy-reviewer`
        }
      ]
    },
    {
      id: "step-02",
      title: "나만의 플러그인 만들기",
      content: `### 나만의 앱 만들기 = 플러그인 개발

앱스토어에 앱을 올리듯, 나만의 플러그인을 만들 수 있어요!
이미 배운 Skills(08)과 Hooks(06)를 하나로 묶는 거예요.

#### 1단계: 폴더 구조 만들기

\`\`\`
my-plugin/
├── plugin.json          # 설명서 (필수!)
├── README.md            # 사용법 설명
├── skills/
│   └── my-command.md    # 슬래시 커맨드
├── hooks/
│   └── pre-commit.sh    # 훅 스크립트
└── agents/
    └── reviewer.md      # 에이전트 정의
\`\`\`

#### 2단계: plugin.json 작성

\`\`\`json
{
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "나의 첫 번째 플러그인",
  "author": "나",

  "skills": [
    {
      "name": "hello",
      "description": "인사말을 출력합니다",
      "path": "./skills/hello.md"
    }
  ],

  "hooks": [
    {
      "event": "pre-commit",
      "command": "echo 'commit check!'",
      "description": "커밋 전 확인"
    }
  ]
}
\`\`\`

#### 3단계: 스킬 파일 작성

\`\`\`markdown
# /hello 스킬

사용자에게 친근한 인사를 합니다.

## 동작
1. 현재 시간을 확인합니다
2. 시간대에 맞는 인사를 합니다
   - 오전: "좋은 아침이에요!"
   - 오후: "좋은 오후예요!"
   - 저녁: "좋은 저녁이에요!"
\`\`\`

#### 4단계: 로컬 테스트

\`\`\`bash
# 로컬 폴더에서 설치해서 테스트
claude plugin add ./my-plugin

# 스킬 실행 테스트
/hello

# 문제 있으면 수정 후 재설치
claude plugin remove my-first-plugin
claude plugin add ./my-plugin
\`\`\``,
      terminals: [
        {
          command: "# 플러그인 폴더 생성",
          output: `> my-first-plugin이라는 폴더를 만들고
  plugin.json과 skills/hello.md를 만들어줘

Claude: 플러그인 구조를 생성합니다.

[폴더 생성] my-first-plugin/
[폴더 생성] my-first-plugin/skills/
[파일 생성] my-first-plugin/plugin.json
[파일 생성] my-first-plugin/skills/hello.md
[파일 생성] my-first-plugin/README.md

my-first-plugin/
├── plugin.json     (설명서)
├── README.md       (사용법)
└── skills/
    └── hello.md    (인사 스킬)

플러그인 구조가 준비되었습니다!
테스트하려면: claude plugin add ./my-first-plugin`
        },
        {
          command: "# 로컬 플러그인 설치 & 테스트",
          output: `> claude plugin add ./my-first-plugin

Installing my-first-plugin@1.0.0 (local)...

Package contents:
  Skills: /hello
  Hooks:  pre-commit

Registering skills... done
Registering hooks... done

Successfully installed my-first-plugin!

> /hello

좋은 오후예요! 현재 시간: 14:30
오늘도 즐거운 코딩하세요!`
        }
      ]
    },
    {
      id: "step-03",
      title: "플러그인 배포 (npm/git)",
      content: `### 앱스토어에 앱 올리기 = 플러그인 배포

만든 플러그인을 다른 사람도 쓸 수 있게 공유해 봅시다!
npm이나 GitHub를 통해 배포할 수 있어요.

#### npm으로 배포

\`\`\`bash
# 1. npm 계정 로그인
npm login

# 2. package.json 확인 (plugin.json과 별도)
# name, version, description 확인

# 3. 배포!
npm publish

# 4. 다른 사람이 설치
claude plugin add @your-scope/my-plugin
\`\`\`

#### GitHub으로 배포

\`\`\`bash
# 1. GitHub 저장소 생성
git init
git add .
git commit -m "feat: 첫 번째 플러그인 배포"
git remote add origin https://github.com/user/my-plugin
git push -u origin main

# 2. 다른 사람이 설치
claude plugin add github:user/my-plugin
\`\`\`

#### 배포 전 체크리스트

\`\`\`
배포 준비 체크리스트
═══════════════════
[ ] plugin.json에 name, version, description 있음
[ ] README.md에 사용법이 잘 설명됨
[ ] 로컬 테스트 통과 (설치 → 사용 → 제거)
[ ] 민감한 정보 (API 키 등) 없음
[ ] 라이선스 명시됨
\`\`\`

#### npm vs GitHub 배포 비교

| 비교 | npm | GitHub |
|------|-----|--------|
| 설치 명령 | \`plugin add @scope/name\` | \`plugin add github:user/repo\` |
| 버전 관리 | 자동 (semver) | 수동 (태그) |
| 검색 | npm search | GitHub search |
| 비공개 | npm 유료 플랜 | GitHub 프라이빗 |
| 사용자 편의 | 높음 | 보통 |`,
      terminals: [
        {
          command: "# GitHub으로 플러그인 배포",
          output: `> 이 플러그인을 GitHub에 배포해줘

Claude: GitHub 배포를 준비합니다.

1. Git 초기화...
   git init [완료]

2. 파일 추가...
   git add plugin.json README.md skills/ hooks/ [완료]

3. 커밋...
   git commit -m "feat: my-first-plugin v1.0.0" [완료]

4. 원격 저장소 연결...
   git remote add origin https://github.com/user/my-first-plugin
   [완료]

5. 푸시...
   git push -u origin main [완료]

배포 완료!
다른 사람이 설치하려면:
  claude plugin add github:user/my-first-plugin`
        },
        {
          command: "# 다른 사람이 내 플러그인 설치",
          output: `> claude plugin add github:user/my-first-plugin

Fetching from github:user/my-first-plugin...
Found: my-first-plugin@1.0.0

Package contents:
  Skills: /hello
  Hooks:  pre-commit

Installing... done
Registering skills... done
Registering hooks... done

Successfully installed my-first-plugin!

New commands available:
  /hello - 인사말을 출력합니다

Author: user (github.com/user)
Repository: https://github.com/user/my-first-plugin`
        }
      ]
    }
  ],

  examples: [
    {
      id: "bundle-existing",
      title: "기존 Skills + Hooks를 플러그인으로 패키징",
      content: `### 이미 만든 것들을 하나로 묶기

08번(Skills)에서 만든 커맨드와 06번(Hooks)에서 만든 훅을
하나의 플러그인으로 묶어봅시다.

#### Before: 개별 파일들

\`\`\`
.claude/
├── commands/
│   ├── deploy.md          (08번에서 만든 것)
│   └── test-report.md     (08번에서 만든 것)
└── settings.json          (06번에서 설정한 훅)
    hooks: [
      { event: "pre-commit", command: "npm run lint" }
    ]
\`\`\`

#### After: 플러그인으로 통합

\`\`\`
my-dev-toolkit/
├── plugin.json
├── skills/
│   ├── deploy.md
│   └── test-report.md
└── hooks/
    └── pre-commit.sh
\`\`\`

#### plugin.json 예시

\`\`\`json
{
  "name": "my-dev-toolkit",
  "version": "1.0.0",
  "description": "나의 개발 도구 모음",

  "skills": [
    {
      "name": "deploy",
      "description": "프로젝트 배포",
      "path": "./skills/deploy.md"
    },
    {
      "name": "test-report",
      "description": "테스트 결과 보고서",
      "path": "./skills/test-report.md"
    }
  ],

  "hooks": [
    {
      "event": "pre-commit",
      "command": "npm run lint",
      "description": "커밋 전 린트 검사"
    }
  ]
}
\`\`\`

#### 장점

\`\`\`
개별 관리                    플러그인으로 통합
───────────                 ────────────────
새 프로젝트마다               새 프로젝트에서
  Skills 복사                   claude plugin add ./my-dev-toolkit
  Hooks 설정                    → 끝!
  3개 파일 관리                  1개 플러그인 관리
\`\`\`

> 한 번 만들어두면 새 프로젝트에서 바로 설치해서 쓸 수 있어요!`,
      checklist: [
        "기존 Skills과 Hooks를 식별할 수 있다",
        "plugin.json으로 통합 매니페스트를 작성할 수 있다",
        "플러그인 폴더 구조를 만들 수 있다",
        "로컬 플러그인으로 설치해서 테스트할 수 있다"
      ]
    },
    {
      id: "community-plugins",
      title: "커뮤니티 인기 플러그인 소개",
      content: `### 다른 사람이 만든 유용한 플러그인들

앱스토어에서 인기 앱을 둘러보듯, 커뮤니티에서 인기 있는 플러그인들을 살펴봅시다.

#### 인기 플러그인 카테고리

\`\`\`
[개발 도구]
  auto-deploy ──── 원클릭 배포
  test-runner ──── 스마트 테스트 실행
  code-review ──── AI 코드 리뷰

[생산성]
  git-workflow ─── Git 워크플로우 자동화
  doc-generator ── 문서 자동 생성
  changelog ────── 변경 로그 관리

[품질]
  lint-fix ──────── 린트 자동 수정
  security-scan ── 보안 스캔 (14번)
  perf-check ───── 성능 체크
\`\`\`

#### 플러그인 선택 기준

| 기준 | 확인 사항 |
|------|----------|
| 다운로드 수 | 많을수록 검증됨 |
| 최근 업데이트 | 6개월 이내가 좋음 |
| 문서화 | README가 잘 작성됐는지 |
| 의존성 | 추가 설치가 필요한지 |
| 라이선스 | 상업적 사용 가능한지 |

#### 플러그인 생태계

\`\`\`
나의 플러그인 세트 구성 예시
══════════════════════════

프로젝트 시작 시:
  1. claude plugin add @community/git-workflow
  2. claude plugin add @community/test-runner
  3. claude plugin add ./my-team-rules

결과:
  /gw-init   → Git 워크플로우 초기화
  /test      → 스마트 테스트 실행
  /team-rule → 팀 규칙 검사
  + 커밋 훅, 리뷰 에이전트 자동 등록!
\`\`\`

#### 좋은 플러그인의 특징

\`\`\`
좋은 플러그인                     나쁜 플러그인
────────────                    ────────────
명확한 README                    설명 없음
버전 관리 (semver)                버전 미관리
테스트 포함                       테스트 없음
작은 범위 (한 가지 잘하기)           너무 많은 기능
의존성 최소화                      무거운 의존성
\`\`\`

> **팁**: 처음에는 인기 있는 플러그인을 설치해 쓰다가, 익숙해지면 나만의 플러그인을 만들어보세요!`,
      checklist: [
        "플러그인 검색 방법을 알고 있다",
        "플러그인 선택 기준을 이해한다",
        "인기 플러그인 카테고리를 파악했다",
        "나만의 플러그인 세트를 구성할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "플러그인이 포함할 수 있는 것은?",
      options: [
        "Skills만 포함 가능하다",
        "Skills, Hooks, Agents, Commands를 모두 포함할 수 있다",
        "Hooks만 포함 가능하다"
      ],
      answer: 1,
      explanation: "플러그인은 앱 번들처럼 Skills(슬래시 커맨드), Hooks(이벤트 반응), Agents(특수 에이전트), Commands(자동 실행 명령)를 모두 포함할 수 있어요."
    },
    {
      question: "plugin.json의 역할은?",
      options: [
        "플러그인의 코드를 실행하는 파일",
        "플러그인의 이름, 버전, 포함된 기능을 정의하는 설명서(매니페스트)",
        "플러그인을 다운로드하는 파일"
      ],
      answer: 1,
      explanation: "plugin.json은 앱스토어의 '앱 정보 페이지'와 같아요. 플러그인의 이름, 버전, 설명, 포함된 Skills/Hooks/Agents 목록 등을 정의합니다."
    },
    {
      question: "플러그인을 설치하는 올바른 명령어는?",
      options: [
        "npm install plugin-name",
        "claude plugin add @scope/plugin-name",
        "claude install plugin-name"
      ],
      answer: 1,
      explanation: "Claude Code 플러그인은 claude plugin add 명령어로 설치합니다. npm 패키지(@scope/name), GitHub(github:user/repo), 로컬 폴더(./path) 모두 지원해요."
    },
    {
      question: "개별 Skills/Hooks 대신 플러그인을 사용하는 가장 큰 장점은?",
      options: [
        "실행 속도가 더 빠르다",
        "관련 기능을 한 번에 설치/관리/공유할 수 있다",
        "플러그인만 사용 가능하고 개별 설치는 불가능하다"
      ],
      answer: 1,
      explanation: "플러그인의 핵심 장점은 관련된 기능들을 하나로 묶어서 한 번에 설치하고, 한 번에 업데이트하고, 쉽게 공유할 수 있다는 거예요. 앱 번들과 같은 개념이에요."
    },
    {
      question: "플러그인을 배포할 수 있는 방법은?",
      options: [
        "npm 패키지로만 배포 가능하다",
        "npm 패키지 또는 GitHub 저장소로 배포할 수 있다",
        "이메일로 파일을 보내야 한다"
      ],
      answer: 1,
      explanation: "플러그인은 npm 패키지(버전 관리 자동)로 배포하거나, GitHub 저장소(코드 공개)로 배포할 수 있어요. 로컬 폴더에서 직접 설치하는 것도 가능합니다."
    }
  ]
};
