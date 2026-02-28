window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["19-permissions-deep"] = {
  overview: `## 권한 심화 — 세밀한 보안 설정 마스터

**놀이공원 팔찌**를 생각해보세요! 놀이공원에 입장할 때 팔찌 종류에 따라 탈 수 있는 놀이기구가 달라지죠.
금색 팔찌는 전부 탈 수 있고, 파란 팔찌는 일부만, 빨간 표시가 있으면 그 놀이기구는 절대 못 타요.

클로드 코드의 권한 시스템도 똑같아요!
"이 도구는 자유롭게 써도 돼", "이건 물어봐야 해", "이건 절대 안 돼" — 이렇게 세밀하게 조절할 수 있어요.

### 기본 허용 vs 세밀 제어

\`\`\`
기본 (매번 물어보기)                 세밀 제어 (규칙 설정)
─────────────────                  ─────────────────────
"파일 수정할까요?" -> 예/아니요        npm install? -> 자동 허용
"명령 실행할까요?" -> 예/아니요        rm -rf?      -> 자동 차단!
"파일 읽을까요?"   -> 예/아니요        git commit?  -> 자동 허용
매번 확인...귀찮다!                  규칙대로 자동 처리!
\`\`\`

### 핵심 학습 내용

| 개념 | 설명 | 비유 |
|------|------|------|
| 권한 모드 | 전체적인 보안 수준 설정 | 팔찌 종류 선택 |
| 와일드카드 | 패턴으로 세밀 제어 | 놀이기구별 표시 |
| 평가 순서 | deny -> allow -> ask | 입구 검표 순서 |
| 설정 파일 | .claude/settings.json | 팔찌 규칙표 |`,

  concepts: [
    {
      id: "permission-modes",
      title: "권한 모드 4가지 (Normal ~ Bypass)",
      content: `### 놀이공원 팔찌 4종류

클로드 코드를 시작할 때 4가지 권한 모드 중 하나를 선택할 수 있어요.
놀이공원 입장 시 팔찌를 고르는 것과 같아요!

\`\`\`
[Normal]     기본 팔찌 (추천)
──────────────────────────
매번 "이거 해도 돼?" 물어봄
-> 안전하지만 매번 확인 필요
-> 비유: 부모님과 함께 놀이공원

[Auto-accept]  골드 팔찌
──────────────────────────
모든 도구 자동 허용
-> 편하지만 위험할 수 있음
-> 비유: 혼자 자유 이용권

[Plan]       관람 팔찌
──────────────────────────
계획만 세우고 실행은 승인 후
-> 가장 안전, 설계 단계에 좋음
-> 비유: 구경만 하고, 타려면 물어보기

[Bypass]     VIP 무제한 (위험!)
──────────────────────────
모든 제한 무시
-> 매우 위험, 테스트 전용
-> 비유: 운영진이 직접 타는 것
\`\`\`

#### 실행 방법

\`\`\`bash
# Normal (기본)
claude

# Auto-accept (자동 허용)
claude --dangerously-skip-permissions

# Plan mode (계획만)
claude --plan

# 각 모드의 CLI 플래그
# --allowedTools 로 세부 설정 가능
\`\`\`

#### 비교표

| 모드 | 파일 읽기 | 파일 쓰기 | 명령 실행 | 안전도 |
|------|:---------:|:---------:|:---------:|:------:|
| Normal | 물어봄 | 물어봄 | 물어봄 | 높음 |
| Auto-accept | 자동 | 자동 | 자동 | 낮음 |
| Plan | 자동 | 차단 | 차단 | 매우 높음 |
| Bypass | 자동 | 자동 | 자동 | 매우 낮음 |

> **추천**: 처음에는 Normal 모드를 쓰면서, 자주 허용하는 도구만 allow 목록에 추가하세요!`
    },
    {
      id: "wildcard-patterns",
      title: "와일드카드 패턴 (*로 범위 지정)",
      content: `### 별표(*)로 "범위"를 정하기

와일드카드 \`*\`는 **"아무거나"**라는 뜻이에요.
놀이공원에서 "회전 놀이기구는 전부 OK"라고 하는 것처럼!

\`\`\`
Bash(npm *)     = npm 뒤에 뭐가 오든 OK
                  npm install -> OK
                  npm test    -> OK
                  npm run dev -> OK

Bash(git *)     = git 뒤에 뭐가 오든 OK
                  git status  -> OK
                  git commit  -> OK
                  git push    -> OK

Bash(*-h*)      = 도움말 플래그가 있으면 OK
                  node -h     -> OK
                  npm --help  -> OK
\`\`\`

#### 패턴 문법

\`\`\`
*           = 아무 문자열 (0개 이상)
Bash(npm *) = Bash 도구에서 "npm "으로 시작하는 모든 명령
Edit(src/*) = Edit 도구에서 "src/"로 시작하는 모든 파일 경로
\`\`\`

#### 자주 쓰는 패턴 예시

| 패턴 | 의미 | 허용 예시 |
|------|------|----------|
| \`Bash(npm *)\` | npm 명령 전체 | npm install, npm test |
| \`Bash(git *)\` | git 명령 전체 | git status, git push |
| \`Bash(node *)\` | node 명령 전체 | node app.js |
| \`Bash(python *)\` | python 명령 전체 | python script.py |
| \`Bash(cat *)\` | cat 명령 전체 | cat file.txt |
| \`Bash(ls *)\` | ls 명령 전체 | ls -la |
| \`Edit(src/*)\` | src 폴더 파일 편집 | src/index.ts 편집 |
| \`Edit(*.test.*)\` | 테스트 파일만 편집 | app.test.ts 편집 |
| \`Bash(*--help)\` | help 플래그 명령 | git --help |

#### 위험한 패턴 (사용 주의!)

\`\`\`
Bash(*)         = 모든 Bash 명령 허용 (위험!)
Edit(*)         = 모든 파일 편집 허용 (위험!)
Bash(rm *)      = 삭제 명령 허용 (매우 위험!)
Bash(sudo *)    = 관리자 명령 허용 (매우 위험!)
\`\`\`

> **팁**: 패턴은 좁게 시작해서 필요할 때 넓히세요!
> \`Bash(npm install)\`부터 시작해서, 필요하면 \`Bash(npm *)\`로 넓히는 식으로.`
    },
    {
      id: "evaluation-order",
      title: "deny -> allow -> ask 평가 순서",
      content: `### 놀이공원 입구 검표 3단계

클로드가 도구를 사용하려고 할 때, 시스템이 **3단계**로 검사해요.
놀이공원 입구에서 팔찌를 확인하는 것과 같아요!

\`\`\`
[1단계] deny (빨간 표시)           [2단계] allow (초록 표시)
──────────────────────            ─────────────────────
금지 목록에 있는가?                 허용 목록에 있는가?
├── 예 -> 즉시 차단!               ├── 예 -> 자동 허용!
│   (물어보지도 않음)               │   (물어보지 않음)
└── 아니요 -> 다음 단계             └── 아니요 -> 다음 단계
                                          |
                                          v
                                  [3단계] ask (노란 표시)
                                  ─────────────────────
                                  사용자에게 물어보기
                                  "이 작업을 허용할까요?"
                                  -> 예 / 아니요
\`\`\`

#### 핵심: deny가 항상 이긴다!

\`\`\`
만약 같은 명령이 deny와 allow 모두에 있다면?

설정:
  deny:  ["Bash(rm *)"]     <- rm 명령 차단
  allow: ["Bash(rm temp*)"] <- rm temp... 허용?

결과: rm temp.txt -> 차단!

이유: deny가 항상 먼저 확인되므로,
      allow에 있더라도 deny에 매칭되면 차단됩니다.
\`\`\`

#### settings.json 구조

\`\`\`json
{
  "permissions": {
    "deny": [
      "Bash(rm *)",
      "Bash(sudo *)",
      "Bash(chmod *)"
    ],
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(node *)",
      "Edit(src/*)"
    ]
  }
}
\`\`\`

#### 평가 흐름 예시

\`\`\`
예시 1: "npm install express"
  1단계 deny: ["rm *", "sudo *"] -> 매칭 없음 -> 통과
  2단계 allow: ["npm *"] -> 매칭! -> 자동 허용

예시 2: "rm -rf node_modules"
  1단계 deny: ["rm *"] -> 매칭! -> 즉시 차단!

예시 3: "python script.py"
  1단계 deny: 매칭 없음 -> 통과
  2단계 allow: 매칭 없음 -> 통과
  3단계 ask: "python script.py를 실행할까요?" -> 사용자 선택
\`\`\`

#### 전략 가이드

\`\`\`
안전한 설정 전략:

1. deny에 위험한 명령 먼저 넣기
   rm, sudo, chmod, chown, kill

2. allow에 자주 쓰는 안전한 명령 넣기
   npm, git, node, python, cat, ls

3. 나머지는 ask로 (기본값)
   처음 보는 명령 -> 물어보기 -> 판단 후 allow/deny에 추가
\`\`\``
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: ".claude/settings.json 권한 설정",
      content: `### 놀이공원 규칙표 만들기

권한 설정은 \`.claude/settings.json\` 파일에 작성해요.
놀이공원의 "팔찌별 이용 가능 놀이기구 안내판"을 만드는 거예요!

#### 설정 파일 위치

\`\`\`
프로젝트별 설정 (이 프로젝트에만 적용):
  .claude/settings.json

사용자 설정 (모든 프로젝트에 적용):
  ~/.claude/settings.json

우선순위: 프로젝트 설정 > 사용자 설정
\`\`\`

#### 기본 구조

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)"
    ],
    "deny": [
      "Bash(rm *)",
      "Bash(sudo *)"
    ]
  }
}
\`\`\`

#### 단계별 설정

\`\`\`bash
# 1. 프로젝트 루트에 .claude 폴더 만들기
mkdir -p .claude

# 2. settings.json 파일 만들기
# (Claude에게 요청해도 됩니다!)
\`\`\`

> **팁**: 설정 파일은 프로젝트에 커밋해서 팀원과 공유할 수 있어요!`,
      terminals: [
        {
          command: "# 프로젝트 권한 설정 만들기",
          output: `$ mkdir -p .claude

$ cat .claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(node *)",
      "Bash(npx *)",
      "Bash(cat *)",
      "Bash(ls *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(chmod 777 *)"
    ]
  }
}

$ claude
> npm install express

(자동 허용 - 물어보지 않음!)
Installing express...
+ express@4.18.2

> rm -rf node_modules

Permission denied: "Bash(rm -rf *)" is in the deny list.
이 명령은 차단된 패턴에 해당합니다.`
        },
        {
          command: "# 사용자 전역 설정 확인",
          output: `$ cat ~/.claude/settings.json
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git log *)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Bash(git push --force *)",
      "Bash(git reset --hard *)"
    ]
  }
}

(이 설정은 모든 프로젝트에 적용됩니다)`
        }
      ]
    },
    {
      id: "step-02",
      title: "와일드카드 패턴으로 세밀 제어",
      content: `### 놀이기구별 팔찌 표시 만들기

와일드카드 패턴으로 "어떤 명령을 허용하고, 어떤 건 차단할지" 세밀하게 제어해봐요.

#### 패턴 작성 연습

\`\`\`
문제 1: npm install은 허용, npm publish는 차단하고 싶다면?

답:
  allow: ["Bash(npm install *)"]
  deny:  ["Bash(npm publish *)"]

-> npm install express -> 허용
-> npm publish         -> 차단!
-> npm test            -> ask (물어봄)
\`\`\`

\`\`\`
문제 2: src/ 폴더만 편집 허용, config 파일은 차단하려면?

답:
  allow: ["Edit(src/*)"]
  deny:  ["Edit(*.config.*)", "Edit(.env*)"]

-> Edit src/index.ts   -> 허용
-> Edit .env           -> 차단!
-> Edit tsconfig.json  -> ask (물어봄)
\`\`\`

#### 패턴 조합 예시

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm install *)",
      "Bash(npm test *)",
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git diff *)",
      "Edit(src/*)",
      "Edit(tests/*)"
    ],
    "deny": [
      "Bash(npm publish *)",
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Edit(.env*)",
      "Edit(*.secret*)"
    ]
  }
}
\`\`\`

> **핵심**: 좁은 범위부터 시작해서, 필요할 때 넓히는 게 안전해요!`,
      terminals: [
        {
          command: "# 패턴 테스트 — 다양한 명령 시도",
          output: `> npm install lodash
(자동 허용 - allow: "Bash(npm install *)" 매칭)
+ lodash@4.17.21

> npm publish
Permission denied: "Bash(npm publish *)" is in the deny list.

> git status
(자동 허용 - allow: "Bash(git status)" 매칭)
On branch main
nothing to commit

> git push --force origin main
Permission denied: "Bash(git push --force *)" is in the deny list.

> python analyze.py
이 작업을 허용할까요? [y/n]
(ask - allow/deny 어디에도 없으므로 사용자에게 물어봄)`
        },
        {
          command: "# 파일 편집 패턴 테스트",
          output: `> src/index.ts를 수정해줘
(자동 허용 - allow: "Edit(src/*)" 매칭)
[파일 수정 완료]

> .env 파일에 API 키를 추가해줘
Permission denied: "Edit(.env*)" is in the deny list.
.env 파일은 보안상 직접 수정해주세요.

> README.md를 업데이트해줘
이 파일을 수정할까요? [y/n]
(ask - README.md는 allow/deny 어디에도 없음)`
        }
      ]
    },
    {
      id: "step-03",
      title: "deny + allow 조합 전략",
      content: `### 놀이공원 보안 전략 세우기

실전에서 권한을 설정하는 3가지 전략을 배워봐요.

#### 전략 1: "화이트리스트" (허용만 명시)

\`\`\`json
{
  "permissions": {
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(node *)"
    ]
  }
}
\`\`\`

\`\`\`
특징: 명시된 것만 자동 허용, 나머지는 물어봄
장점: 간단하고 명확
단점: 위험한 명령도 물어보고 실수로 허용할 수 있음
\`\`\`

#### 전략 2: "블랙리스트 + 화이트리스트" (차단 + 허용)

\`\`\`json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(git push --force *)"
    ],
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(node *)"
    ]
  }
}
\`\`\`

\`\`\`
특징: 위험한 건 확실히 차단, 안전한 건 자동 허용
장점: 가장 균형 잡힌 전략 (추천!)
단점: 설정이 조금 복잡
\`\`\`

#### 전략 3: "최소 권한" (엄격한 통제)

\`\`\`json
{
  "permissions": {
    "deny": [
      "Bash(*)",
      "Edit(*)"
    ],
    "allow": [
      "Bash(npm test)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Edit(src/*.test.*)"
    ]
  }
}
\`\`\`

\`\`\`
특징: 기본적으로 전부 차단, 꼭 필요한 것만 허용
장점: 가장 안전
단점: 불편할 수 있음 (새 명령마다 추가 필요)
주의: deny가 먼저이므로, Bash(*)가 모든 명령을 차단합니다.
      하지만 allow에 있는 구체적 패턴은 허용됩니다.
\`\`\`

#### 상황별 추천

\`\`\`
개인 프로젝트 (혼자 작업)
├── 전략 2 추천
└── deny: 위험 명령 차단
    allow: 자주 쓰는 명령 허용

팀 프로젝트 (여러 명 작업)
├── 전략 2 또는 3 추천
└── .claude/settings.json을 git에 커밋해서 공유

CI/CD (자동화)
├── 전략 3 추천 (최소 권한)
└── 필요한 명령만 정확히 명시
\`\`\``,
      terminals: [
        {
          command: "# 전략 2 적용 예시 (블랙리스트 + 화이트리스트)",
          output: `$ cat .claude/settings.json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Edit(.env*)",
      "Edit(*.key)"
    ],
    "allow": [
      "Bash(npm *)",
      "Bash(git *)",
      "Bash(node *)",
      "Bash(cat *)",
      "Bash(ls *)",
      "Edit(src/*)",
      "Edit(tests/*)",
      "Edit(docs/*)"
    ]
  }
}

테스트 결과:
  npm install    -> 자동 허용
  git commit     -> 자동 허용
  rm -rf /       -> 즉시 차단!
  sudo apt       -> 즉시 차단!
  python test.py -> 물어봄 (ask)
  Edit .env      -> 즉시 차단!`
        },
        {
          command: "# 설정을 팀과 공유하기",
          output: `$ git add .claude/settings.json
$ git commit -m "feat: 프로젝트 권한 설정 추가"

$ git log --oneline -1
a1b2c3d feat: 프로젝트 권한 설정 추가

(팀원이 git pull하면 같은 권한 규칙이 적용됩니다!)

팀원 메시지:
"권한 설정 파일 덕분에 rm -rf 사고를 예방했어요!"
"npm 명령은 자동 허용이라 편하네요."`
        }
      ]
    }
  ],

  examples: [
    {
      id: "safe-dev-env",
      title: "안전한 개발 환경 (npm 허용, rm 차단)",
      content: `### 실전: 웹 개발 프로젝트 권한 설정

Node.js 웹 프로젝트를 위한 안전한 권한 설정을 만들어봐요.

#### 요구사항

\`\`\`
허용할 것:
  - npm 명령 (install, test, run, build)
  - git 명령 (status, add, commit, push, diff, log)
  - node 실행
  - src/, tests/, docs/ 폴더 편집

차단할 것:
  - 파일 삭제 (rm -rf)
  - 관리자 명령 (sudo)
  - 강제 푸시 (git push --force)
  - 환경 변수 파일 편집 (.env)
  - 비밀키 파일 편집 (*.key, *.pem)
\`\`\`

#### 완성된 설정

\`\`\`json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(rm -r *)",
      "Bash(sudo *)",
      "Bash(git push --force *)",
      "Bash(git push -f *)",
      "Bash(git reset --hard *)",
      "Bash(chmod 777 *)",
      "Edit(.env*)",
      "Edit(*.key)",
      "Edit(*.pem)",
      "Edit(*.secret*)"
    ],
    "allow": [
      "Bash(npm *)",
      "Bash(npx *)",
      "Bash(git status)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git push origin *)",
      "Bash(git pull *)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git branch *)",
      "Bash(git checkout *)",
      "Bash(git merge *)",
      "Bash(node *)",
      "Bash(cat *)",
      "Bash(ls *)",
      "Bash(mkdir *)",
      "Edit(src/*)",
      "Edit(tests/*)",
      "Edit(docs/*)",
      "Edit(package.json)",
      "Edit(tsconfig.json)",
      "Edit(README.md)"
    ]
  }
}
\`\`\`

#### 테스트 시나리오

\`\`\`bash
# 허용 확인
> npm install express      # -> 자동 허용
> git commit -m "fix bug"  # -> 자동 허용
> Edit src/index.ts        # -> 자동 허용

# 차단 확인
> rm -rf node_modules      # -> 차단!
> sudo apt-get install     # -> 차단!
> Edit .env                # -> 차단!

# ask 확인
> python script.py         # -> 물어봄
> Edit webpack.config.js   # -> 물어봄
\`\`\`

> **팁**: \`node_modules\`를 삭제하고 싶을 때는 \`npm ci\`를 사용하면 안전하게 재설치할 수 있어요!`,
      checklist: [
        "프로젝트에 맞는 deny 목록을 작성할 수 있다",
        "자주 쓰는 명령을 allow 목록에 추가할 수 있다",
        ".env 같은 민감 파일을 보호하는 설정을 할 수 있다",
        "설정 파일을 git에 커밋해서 팀과 공유할 수 있다"
      ]
    },
    {
      id: "team-preset",
      title: "팀용 권한 프리셋 만들기",
      content: `### 역할별로 다른 팔찌 주기

팀 프로젝트에서 역할에 따라 다른 권한을 설정하는 방법이에요.

#### 역할별 권한 설계

\`\`\`
[프론트엔드 개발자]
  허용: npm, git, Edit(src/components/*), Edit(src/pages/*)
  차단: DB 관련 명령, 서버 설정 편집

[백엔드 개발자]
  허용: npm, git, Edit(src/api/*), Edit(src/models/*)
  차단: 프론트엔드 컴포넌트 편집 (의도치 않은 충돌 방지)

[QA 엔지니어]
  허용: npm test, git status, git log
  차단: 소스 코드 편집 (테스트 파일만 수정 가능)

[주니어 개발자]
  허용: git status, git diff, npm test
  차단: git push, 파일 삭제, 설정 파일 편집
\`\`\`

#### 프리셋 파일 예시

\`\`\`
project/
  .claude/
    settings.json          # 기본 설정 (공통 차단 규칙)
    presets/
      frontend.json        # 프론트엔드 프리셋
      backend.json         # 백엔드 프리셋
      qa.json              # QA 프리셋
\`\`\`

#### 공통 차단 규칙 (모든 역할)

\`\`\`json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Edit(.env*)",
      "Edit(*.key)",
      "Edit(*.pem)"
    ]
  }
}
\`\`\`

#### QA 전용 설정

\`\`\`json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)",
      "Edit(src/*)",
      "Bash(git push *)"
    ],
    "allow": [
      "Bash(npm test *)",
      "Bash(npm run test *)",
      "Bash(git status)",
      "Bash(git log *)",
      "Bash(git diff *)",
      "Edit(tests/*)",
      "Edit(*.test.*)",
      "Edit(*.spec.*)"
    ]
  }
}
\`\`\`

#### 적용 방법

\`\`\`bash
# 역할에 맞는 설정으로 Claude Code 시작
# (설정 파일을 .claude/settings.json에 복사)
cp .claude/presets/frontend.json .claude/settings.json
claude

# 또는 팀 리더가 기본 설정을 관리
# .claude/settings.json을 git에 커밋
\`\`\`

> **핵심**: 팀에서는 "공통 차단 규칙"을 먼저 정하고,
> 역할별로 "허용 목록"만 다르게 설정하는 게 효율적이에요!`,
      checklist: [
        "역할별로 다른 권한 설정을 설계할 수 있다",
        "공통 차단 규칙(deny)의 중요성을 이해한다",
        "프리셋 파일을 만들어 팀원에게 배포할 수 있다",
        "settings.json을 git으로 공유하는 방법을 안다"
      ]
    }
  ],

  quiz: [
    {
      question: "deny, allow, ask 중 가장 먼저 확인하는 것은?",
      options: [
        "allow (허용 목록)",
        "deny (차단 목록)",
        "ask (사용자에게 물어보기)"
      ],
      answer: 1,
      explanation: "deny가 항상 가장 먼저 확인됩니다. deny 목록에 매칭되면 allow에 있더라도 즉시 차단돼요. 놀이공원에서 '금지' 표시가 '이용 가능'보다 우선인 것과 같아요."
    },
    {
      question: "Bash(npm *) 패턴이 허용하는 명령은?",
      options: [
        "npm install만 허용",
        "npm으로 시작하는 모든 Bash 명령",
        "모든 Bash 명령"
      ],
      answer: 1,
      explanation: "Bash(npm *)에서 *는 '아무거나'를 의미합니다. npm install, npm test, npm run build 등 npm으로 시작하는 모든 명령이 허용돼요."
    },
    {
      question: "Plan mode에서 클로드가 할 수 있는 것은?",
      options: [
        "파일을 자유롭게 수정할 수 있다",
        "코드를 읽고 분석하여 계획을 세울 수 있지만, 실제 실행은 승인이 필요하다",
        "아무것도 할 수 없다"
      ],
      answer: 1,
      explanation: "Plan mode는 '관람 팔찌'와 같아요. 코드를 읽고 분석해서 계획을 세울 수 있지만, 실제로 파일을 수정하거나 명령을 실행하려면 사용자의 승인이 필요합니다."
    },
    {
      question: "프로젝트별 권한 설정 파일의 위치는?",
      options: [
        "package.json",
        ".claude/settings.json",
        "~/.claude/permissions.json"
      ],
      answer: 1,
      explanation: ".claude/settings.json에 프로젝트별 권한을 설정합니다. 이 파일은 해당 프로젝트에만 적용되며, git에 커밋해서 팀원과 공유할 수 있어요."
    },
    {
      question: "팀 프로젝트에서 권한 설정을 공유하는 가장 좋은 방법은?",
      options: [
        "각자 알아서 설정한다",
        ".claude/settings.json을 git에 커밋하여 모든 팀원이 같은 규칙을 사용한다",
        "Slack으로 설정 내용을 공유한다"
      ],
      answer: 1,
      explanation: ".claude/settings.json을 git에 커밋하면 모든 팀원이 git pull할 때 같은 권한 규칙을 자동으로 적용받습니다. 일관된 보안 정책을 유지하는 가장 효율적인 방법이에요."
    }
  ]
};
