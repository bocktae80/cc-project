window.STUDIO_CONTENT = window.STUDIO_CONTENT || {};
window.STUDIO_CONTENT["22-batch-mode"] = {
  overview: `## 배치 모드 — 비대화형 자동 처리

**자판기**를 생각해보세요! 돈을 넣고 버튼을 누르면 음료가 나오죠? 점원과 대화할 필요 없어요.
\`claude\` CLI의 배치 모드도 마찬가지! **입력을 주면 결과가 나오고 끝**. 대화 없이 자동으로 처리됩니다.

### 이런 상황에서 유용해요
- **CI/CD 자동화**: "PR이 올라오면 자동으로 코드 리뷰해줘" — 배치 모드로 파이프라인에 통합
- **파일 일괄 처리**: "100개 파일에서 TODO를 모두 찾아줘" — 스크립트로 반복 실행
- **결과 저장**: "git diff를 분석해서 changelog.md로 만들어줘" — 출력을 파일로 리디렉션

### 이 튜토리얼에서 배우는 것
| 순서 | 내용 | 탭 |
|------|------|-----|
| 1 | 대화형 vs 비대화형 차이, 파이프라인 패턴, 출력 포맷 | 💡 개념 |
| 2 | 첫 배치 실행, 파이프 체이닝, CI/CD 연동 | 🔧 실습 |
| 3 | PR 자동 리뷰 스크립트, 코드 생성 파이프라인 | 💻 예제 |

### 클로드 코드의 5가지 실행 모드

클로드 코드는 내부적으로 **5가지 모드**로 동작합니다. 배치 모드는 이 중 "헤드리스 모드"에 해당해요:

\`\`\`
실행 모드              비유                   사용 방법
──────────          ──────               ──────────
1. REPL (대화형)      카페 점원과 대화       $ claude
2. 헤드리스 (배치)    자판기                 $ echo "질문" | claude -p
3. 코디네이터         팀장 + 팀원들          에이전트 팀 (리더-워커)
4. 브리지             리모컨                 /rc, /teleport
5. 어시스턴트         개인 비서              IDE 확장 (VSCode)
\`\`\`

> 이 튜토리얼에서는 **2. 헤드리스(배치) 모드**를 집중적으로 배웁니다!

### 대화형 vs 비대화형

\`\`\`
대화형 (Interactive)              비대화형 (Batch/Pipe)
─────────────────                ──────────────────
$ claude                         $ echo "질문" | claude -p
> 안녕                            (바로 결과 출력)
Claude: 안녕하세요!               (끝! 자동 종료)
> 다음 질문...
Claude: ...
> /exit

비유: 카페 점원과 대화            비유: 자판기
  "이거 주세요"                    돈+버튼 = 음료
  "얼음 많이요"                    (대화 없음!)
  "감사합니다"
\`\`\`

### 핵심 플래그

| 플래그 | 설명 | 예시 |
|--------|------|------|
| \`-p\` | 파이프 모드 (비대화형) | \`echo "질문" \\| claude -p\` |
| \`--output-format\` | 출력 형식 지정 | \`--output-format json\` |
| \`--model\` | 모델 선택 | \`--model sonnet\` |
| \`--max-turns\` | 최대 턴 수 제한 | \`--max-turns 1\` |
| \`--resume\` | 이전 세션 이어서 실행 | \`claude -p --resume <id>\` |

### v2.1.89~2.1.92 개선사항

| 버전 | 개선 | 설명 |
|------|------|------|
| 2.1.89 | **\`MCP_CONNECTION_NONBLOCKING=true\`** | \`-p\` 모드에서 MCP 연결 대기를 **완전 생략**, \`--mcp-config\` 서버 연결도 5초 타임아웃 |
| 2.1.90 | **\`--resume\` 캐시 수정** | deferred tools/MCP/에이전트 설정 시 첫 요청 프롬프트 캐시 미스가 발생하던 문제 수정 (v2.1.69 이후 리그레션) |
| 2.1.90 | **\`--resume\` 피커 필터** | \`claude -p\`나 SDK로 생성된 세션이 \`--resume\` 피커에서 숨겨짐 |
| 2.1.98 | **\`--exclude-dynamic-system-prompt-sections\`** | print 모드에서 동적 시스템 프롬프트 섹션 제외 → **크로스유저 프롬프트 캐싱** 효율 향상 |

\`\`\`
비유: 자판기 최적화!

MCP_CONNECTION_NONBLOCKING = "결제 모듈 연결 안 기다리고 바로 음료 제조 시작"
--resume 피커 필터 = "자동 주문 기록은 수동 주문 목록에서 숨김"
\`\`\`

### v2.1.77~2.1.81 개선사항

| 버전 | 개선 | 설명 |
|------|------|------|
| 2.1.77 | **\`--resume\` 성능 향상** | 로딩 최대 45% 빨라지고, 피크 메모리 ~100-150MB 절감 |
| 2.1.77 | **세션 자동 네이밍** | 플랜 수락 시 플랜 제목으로 세션 이름 자동 설정 |
| 2.1.81 | **\`--bare\` 플래그** | 훅/LSP/플러그인/스킬 스캔 전부 스킵하는 경량 모드 |

#### \`--bare\` 플래그 — 초경량 배치 모드 (v2.1.81)

\`\`\`
비유: 자판기 터보 모드!

일반 -p:   자판기 켜기 → 메뉴판 로드 → 조명 켜기 → 음료 제조
--bare -p: 자판기 켜기 → 즉시 음료 제조! (나머지 생략)
\`\`\`

\`\`\`bash
# 훅, LSP, 플러그인 동기화, 스킬 스캔 전부 생략
echo "이 코드 요약해줘" | claude -p --bare

# CI/CD에서 최소 오버헤드로 실행
ANTHROPIC_API_KEY=sk-... claude -p --bare "PR 리뷰해줘"
\`\`\`

| 항목 | \`-p\` | \`-p --bare\` |
|------|-------|-------------|
| 훅 실행 | O | X |
| LSP | O | X |
| 플러그인 동기화 | O | X |
| 스킬 디렉토리 스캔 | O | X |
| OAuth/키체인 인증 | O | X (API 키 필수) |
| auto-memory | O | X |

> CI/CD 파이프라인에서 시작 시간을 최소화하고 싶을 때 유용해요!

### 왜 쓸까?

\`\`\`
배치 모드가 유용한 상황:
├── CI/CD 파이프라인 (자동 코드 리뷰)
├── 스크립트 자동화 (파일 일괄 처리)
├── 크론잡 (정기 리포트 생성)
└── 파이프 체이닝 (다른 CLI 도구와 결합)
\`\`\``,

  concepts: [
    {
      id: "interactive-vs-batch",
      title: "대화형 vs 비대화형",
      content: `### 카페 점원 vs 자판기

지금까지 \`claude\` 명령어를 실행하면 대화 모드로 들어갔죠? 이제 "자판기 모드"를 배워봐요!

#### 대화형 (Interactive)

\`\`\`
$ claude
╭──────────────────────╮
│ Claude Code v2.1.63  │
╰──────────────────────╯

> 이 파일을 분석해줘     ← 사용자가 입력
Claude: 분석 결과...     ← 클로드 응답
> 다음으로 이걸 수정해줘  ← 또 입력
Claude: 수정했습니다     ← 또 응답
> /exit                  ← 수동으로 종료

특징:
  - 사람이 계속 입력해야 함
  - 대화를 이어갈 수 있음 (맥락 유지)
  - 수동으로 종료해야 함
\`\`\`

#### 비대화형 (Batch / Pipe)

\`\`\`
$ echo "이 코드를 리뷰해줘" | claude -p
(바로 결과 출력)
(자동 종료!)

$ cat README.md | claude -p "한국어로 번역해줘"
(파일 내용을 읽어서 번역)
(자동 종료!)

특징:
  - 입력을 한 번에 줌 (stdin 또는 인자)
  - 결과만 출력하고 끝
  - 자동 종료 (스크립트에 적합!)
\`\`\`

#### 비교표

| 비교 | 대화형 | 비대화형 |
|------|--------|---------|
| 시작 방법 | \`claude\` | \`echo "..." \\| claude -p\` |
| 상호작용 | 여러 번 주고받음 | 한 번 입력 → 한 번 출력 |
| 종료 | 수동 (\`/exit\`) | 자동 종료 |
| 컨텍스트 | 대화 내 유지 | 단일 요청만 |
| 용도 | 탐색, 복잡한 작업 | 자동화, 스크립트 |
| 비유 | 카페 점원 | 자판기 |

> **핵심**: 한 번에 끝나는 작업 → 비대화형, 여러 번 주고받는 작업 → 대화형!

> **핵심 요약**: 대화형(Interactive)은 카페 점원처럼 여러 번 주고받으며 작업하고, 비대화형(Batch)은 자판기처럼 입력 한 번으로 결과가 나오고 자동 종료됩니다. \`-p\` 플래그로 전환하며, 스크립트 자동화에 적합합니다.`
    },
    {
      id: "pipeline-patterns",
      title: "파이프라인 패턴",
      content: `### 레고 블록처럼 연결하기

Linux/Mac의 파이프(\`|\`)를 사용하면 클로드를 다른 명령어와 **레고 블록처럼 연결**할 수 있어요!

#### 기본 파이프 패턴

\`\`\`bash
# 패턴 1: 텍스트 직접 전달
echo "Hello를 한국어로 번역해줘" | claude -p

# 패턴 2: 파일 내용 전달
cat src/utils.ts | claude -p "이 코드를 리뷰해줘"

# 패턴 3: 명령어 결과 전달
git diff | claude -p "이 변경사항을 요약해줘"

# 패턴 4: 여러 명령어 체이닝
git log --oneline -10 | claude -p "최근 커밋을 분석해줘"
\`\`\`

#### 파이프 체이닝 (고급)

\`\`\`bash
# 클로드 출력을 다른 명령어로 연결
cat data.json | claude -p "이 JSON에서 이메일만 추출해줘" | sort | uniq

# 스크립트로 여러 파일 처리
find src -name "*.ts" | while read file; do
  cat "$file" | claude -p "TODO 주석을 찾아줘" >> todos.txt
done

# git 변경사항 → 클로드 분석 → 파일 저장
git diff HEAD~1 | claude -p "변경사항을 한국어로 요약해줘" > changelog.md
\`\`\`

#### 자판기 조합 비유

\`\`\`
일반 자판기:
  돈 → [자판기] → 음료

파이프 체이닝:
  돈 → [자판기A] → 음료 → [믹서기B] → 스무디 → [포장기C] → 선물

코드:
  git diff → [claude -p "요약"] → 요약문 → [grep "버그"] → 버그만 추출
\`\`\`

> **핵심**: \`-p\` 플래그 하나면 클로드를 다른 CLI 도구와 자유롭게 조합할 수 있어요!

> **핵심 요약**: 파이프(\`|\`)를 사용하면 클로드를 다른 CLI 도구와 레고 블록처럼 연결할 수 있습니다. 텍스트 직접 전달, 파일 내용 전달, 명령어 결과 전달, 클로드 출력을 다시 다른 명령어로 체이닝하는 4가지 패턴이 핵심입니다.`
    },
    {
      id: "output-formats",
      title: "출력 포맷",
      content: `### 결과물을 원하는 형태로 받기

배치 모드의 출력 형식을 지정하면, 결과를 프로그래밍으로 처리하기 쉬워요.

#### --output-format 옵션

\`\`\`bash
# 텍스트 (기본값) — 사람이 읽기 좋음
echo "안녕" | claude -p --output-format text
→ 안녕하세요!

# JSON — 프로그래밍으로 파싱하기 좋음
echo "안녕" | claude -p --output-format json
→ {"type":"result","result":"안녕하세요!","cost":0.001,"duration_ms":850}

# stream-json — 실시간 스트리밍
echo "안녕" | claude -p --output-format stream-json
→ {"type":"content","content":"안녕"}
→ {"type":"content","content":"하세요!"}
→ {"type":"result","result":"안녕하세요!"}
\`\`\`

#### 언제 어떤 포맷을?

| 포맷 | 용도 | 비유 |
|------|------|------|
| \`text\` | 사람이 읽거나 간단한 파이프 | 종이 영수증 |
| \`json\` | 스크립트에서 결과 파싱 | 엑셀 데이터 |
| \`stream-json\` | 실시간 진행 상황 표시 | 실시간 자막 |

#### JSON 출력 활용 예시

\`\`\`bash
# JSON 출력에서 결과만 추출 (jq 사용)
echo "1+1은?" | claude -p --output-format json | jq -r '.result'
→ 1+1은 2입니다.

# 비용 추적
echo "코드 분석" | claude -p --output-format json | jq '.cost'
→ 0.003

# 스크립트에서 결과 변수에 저장
RESULT=$(echo "현재 날짜?" | claude -p --output-format json | jq -r '.result')
echo "Claude 답변: $RESULT"
\`\`\`

> **팁**: 스크립트 자동화에는 \`json\` 포맷이 가장 안정적이에요. 결과를 정확히 파싱할 수 있거든요!

> **핵심 요약**: \`--output-format\`으로 text(사람용), json(스크립트 파싱용), stream-json(실시간 스트리밍) 3가지 출력 형식을 선택할 수 있습니다. json 포맷은 결과뿐 아니라 비용, 소요 시간 등 메타데이터도 포함되어 자동화에 가장 적합합니다.`
    }
  ],

  tutorials: [
    {
      id: "step-01",
      title: "첫 배치 실행",
      content: `### 자판기 처음 써보기

가장 간단한 배치 모드 실행부터 시작해봐요!

#### 목표
- \`-p\` 플래그로 비대화형 모드를 실행합니다
- 파이프로 입력을 전달합니다
- 결과를 확인합니다

#### 따라하기

**1단계:** 간단한 질문을 배치로 실행합니다.

**2단계:** 파일 내용을 분석합니다.

**3단계:** 결과를 파일로 저장합니다.`,
      terminals: [
        {
          command: '# 방법 1: echo로 직접 질문',
          output: `$ echo "JavaScript에서 배열을 정렬하는 방법 3가지를 알려줘" | claude -p

1. sort() 메서드: arr.sort((a, b) => a - b)
2. toSorted() 메서드: const sorted = arr.toSorted() (원본 유지)
3. 전개 연산자 + sort: [...arr].sort()

(자동 종료 — 대화 모드로 들어가지 않음!)`
        },
        {
          command: '# 방법 2: 파일 내용을 분석',
          output: `$ cat package.json | claude -p "이 프로젝트의 의존성을 분석해줘"

이 프로젝트는 React 19 기반의 웹 앱입니다.

주요 의존성:
- react: 19.0.0 (최신)
- typescript: 5.5.0
- tailwindcss: 4.0.0

개발 의존성:
- vitest: 2.1.0 (테스트)
- eslint: 9.0.0 (린팅)

(자동 종료)`
        },
        {
          command: '# 방법 3: 결과를 파일로 저장',
          output: `$ git diff HEAD~1 | claude -p "이 커밋의 변경사항을 한국어로 요약해줘" > summary.md

$ cat summary.md
## 변경사항 요약

- 로그인 폼에 비밀번호 유효성 검사 추가
- 에러 메시지를 한국어로 번역
- 로그인 실패 시 재시도 제한 (5회) 구현`
        }
      ]
    },
    {
      id: "step-02",
      title: "파이프 체이닝",
      content: `### 자판기 여러 대 연결하기

클로드의 출력을 다른 명령어로 연결해서 더 복잡한 작업을 자동화해봐요!

#### 목표
- 클로드 출력을 다른 명령어로 파이프합니다
- 여러 파일을 일괄 처리합니다

#### 체이닝 패턴

\`\`\`
입력 → [클로드] → 중간 결과 → [다른 명령] → 최종 결과
\`\`\``,
      terminals: [
        {
          command: '# 패턴 1: 코드 리뷰 결과에서 "경고"만 필터링',
          output: `$ cat src/app.ts | claude -p "이 코드를 리뷰하고, 각 이슈를 [정보], [경고], [심각] 태그로 분류해줘" | grep "\\[경고\\]"

[경고] Line 15: 환경 변수를 하드코딩하고 있습니다
[경고] Line 32: any 타입 사용 — 구체적 타입 추천
[경고] Line 45: 에러 처리 없이 API 호출`
        },
        {
          command: '# 패턴 2: 여러 파일 일괄 처리',
          output: `$ for file in src/routes/*.ts; do
>   echo "=== $file ==="
>   cat "$file" | claude -p "TODO 주석을 찾아 목록으로 만들어줘"
> done

=== src/routes/users.ts ===
- Line 12: TODO: 페이지네이션 구현
- Line 45: TODO: 캐시 추가

=== src/routes/products.ts ===
- Line 8: TODO: 이미지 업로드 API 추가
- Line 67: TODO: 가격 유효성 검사`
        },
        {
          command: '# 패턴 3: JSON 출력 + jq 조합',
          output: `$ echo "TypeScript 장점 3가지" | claude -p --output-format json | jq -r '.result'

1. 타입 안전성: 컴파일 시점에 버그를 잡아줍니다
2. IDE 지원: 자동완성과 리팩토링이 강력합니다
3. 가독성: 타입 정보가 문서 역할을 합니다`
        }
      ]
    },
    {
      id: "step-03",
      title: "CI/CD 연동",
      content: `### 자판기를 공장 라인에 설치하기

CI/CD 파이프라인에 클로드 배치 모드를 넣으면, 코드 리뷰와 검사를 자동화할 수 있어요!

#### 목표
- GitHub Actions에서 클로드를 사용합니다
- PR 자동 리뷰를 설정합니다

#### GitHub Actions 예시

\`\`\`yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Claude PR 리뷰
        run: |
          git diff origin/main...HEAD | claude -p \\
            "이 PR의 변경사항을 리뷰해줘.
             버그, 보안 이슈, 개선점을 찾아줘." \\
            --output-format json > review.json
\`\`\`

#### pre-commit 훅 예시

\`\`\`bash
#!/bin/bash
# .git/hooks/pre-commit
git diff --cached | claude -p \\
  "커밋될 코드에 console.log나 TODO가 있으면 알려줘" \\
  --max-turns 1
\`\`\``,
      terminals: [
        {
          command: '# PR 자동 리뷰 스크립트',
          output: `$ cat scripts/pr-review.sh
#!/bin/bash
# PR 변경사항을 자동으로 리뷰하는 스크립트

DIFF=$(git diff origin/main...HEAD)

echo "$DIFF" | claude -p \\
  "이 코드 변경사항을 리뷰해줘.
   다음 형식으로 출력:
   ## 요약
   ## 버그 위험
   ## 개선 제안" \\
  > pr-review.md

echo "리뷰 완료! pr-review.md를 확인하세요."

$ bash scripts/pr-review.sh
리뷰 완료! pr-review.md를 확인하세요.`
        },
        {
          command: '# 리뷰 결과 확인',
          output: `$ cat pr-review.md
## 요약
로그인 기능에 비밀번호 재설정 플로우를 추가했습니다.
3개 파일 변경, 총 120줄 추가.

## 버그 위험
- auth/reset.ts:23 — 토큰 만료 시간이 24시간으로 너무 깁니다 (1시간 추천)
- auth/reset.ts:45 — rate limit이 없어 무차별 대입 공격 가능

## 개선 제안
- 이메일 전송 실패 시 재시도 로직 추가 필요
- 비밀번호 강도 검사 함수를 utils/로 분리하면 재사용 가능`
        }
      ]
    }
  ],

  examples: [
    {
      id: "pr-auto-review",
      title: "PR 자동 리뷰 스크립트",
      content: `### 실전: PR이 올라오면 자동으로 리뷰하기

#### 시나리오

팀에서 PR이 올라올 때마다 클로드가 먼저 리뷰하고, 기본적인 이슈를 잡아주는 스크립트를 만듭니다.

#### 스크립트

\`\`\`bash
#!/bin/bash
# scripts/auto-review.sh — PR 자동 리뷰

PR_NUMBER=$1
if [ -z "$PR_NUMBER" ]; then
  echo "사용법: ./auto-review.sh <PR번호>"
  exit 1
fi

echo "PR #$PR_NUMBER 리뷰 시작..."

# PR의 변경사항 가져오기
gh pr diff $PR_NUMBER | claude -p \\
  "이 PR을 리뷰해줘. 다음을 확인해:
   1. 보안 취약점 (SQL 인젝션, XSS 등)
   2. 타입 안전성 (any 사용, 타입 누락)
   3. 에러 처리 누락
   4. 성능 이슈 (N+1 쿼리 등)

   형식:
   [심각] / [경고] / [정보] 태그로 분류해줘" \\
  --output-format text > review-result.md

# 심각 이슈가 있으면 경고
if grep -q "\\[심각\\]" review-result.md; then
  echo "심각한 이슈가 발견되었습니다!"
  grep "\\[심각\\]" review-result.md
fi

echo "리뷰 완료: review-result.md"
\`\`\`

#### 실행 결과

\`\`\`
$ ./scripts/auto-review.sh 42
PR #42 리뷰 시작...
심각한 이슈가 발견되었습니다!
[심각] auth/login.ts:15 — 비밀번호를 평문으로 비교하고 있습니다
리뷰 완료: review-result.md
\`\`\``,
      checklist: [
        "echo ... | claude -p 패턴으로 배치 실행을 할 수 있다",
        "파이프 체이닝으로 결과를 다른 명령어와 조합할 수 있다",
        "--output-format으로 출력 형식을 제어할 수 있다",
        "CI/CD나 스크립트에서 클로드를 자동화 도구로 활용할 수 있다"
      ]
    },
    {
      id: "code-gen-pipeline",
      title: "코드 생성 파이프라인",
      content: `### 실전: 스키마에서 코드 자동 생성

#### 시나리오

데이터베이스 스키마(SQL)를 읽어서 TypeScript 타입과 API 라우트를 자동으로 생성하는 파이프라인입니다.

#### 파이프라인

\`\`\`bash
#!/bin/bash
# scripts/generate-from-schema.sh
# DB 스키마 → TypeScript 타입 + API 라우트 자동 생성

SCHEMA_FILE="db/schema.sql"

echo "Step 1: 스키마에서 TypeScript 타입 생성..."
cat $SCHEMA_FILE | claude -p \\
  "이 SQL 스키마에서 TypeScript 인터페이스를 생성해줘.
   각 테이블을 하나의 인터페이스로.
   export interface 형식으로." \\
  > src/types/generated.ts

echo "Step 2: CRUD API 라우트 생성..."
cat $SCHEMA_FILE | claude -p \\
  "이 SQL 스키마의 각 테이블에 대해
   Express.js CRUD API 라우트를 생성해줘.
   GET(목록), GET(상세), POST, PUT, DELETE.
   src/types/generated.ts의 타입을 import해서 사용." \\
  > src/routes/generated.ts

echo "완료! 생성된 파일:"
echo "  - src/types/generated.ts"
echo "  - src/routes/generated.ts"
\`\`\`

#### 실행 결과

\`\`\`bash
$ cat db/schema.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  content TEXT,
  author_id INTEGER REFERENCES users(id)
);

$ bash scripts/generate-from-schema.sh
Step 1: 스키마에서 TypeScript 타입 생성...
Step 2: CRUD API 라우트 생성...
완료! 생성된 파일:
  - src/types/generated.ts
  - src/routes/generated.ts
\`\`\`

> **팁**: 이런 파이프라인을 한 번 만들어두면, 스키마가 바뀔 때마다 다시 실행해서 코드를 자동으로 갱신할 수 있어요!`,
      checklist: [
        "배치 모드로 여러 단계의 코드 생성 파이프라인을 구성할 수 있다",
        "파일 내용을 파이프로 클로드에게 전달하고 결과를 파일로 저장할 수 있다",
        "스크립트로 반복 가능한 자동화 워크플로우를 만들 수 있다",
        "대화형과 배치 모드를 상황에 맞게 선택할 수 있다"
      ]
    }
  ],

  quiz: [
    {
      question: "클로드를 비대화형(배치) 모드로 실행하는 방법은?",
      options: [
        "claude --batch 명령어를 사용한다",
        "echo \"질문\" | claude -p 로 파이프 모드를 사용한다",
        "claude 실행 후 /batch 커맨드를 입력한다"
      ],
      answer: 1,
      explanation: "-p 플래그를 사용하면 파이프(비대화형) 모드로 실행됩니다. stdin으로 입력을 받고, 결과를 stdout으로 출력한 후 자동 종료됩니다. 자판기처럼 한 번에 처리!"
    },
    {
      question: "대화형 모드와 비대화형 모드의 가장 큰 차이는?",
      options: [
        "비대화형이 더 똑똑하다",
        "대화형은 여러 번 주고받고, 비대화형은 한 번 입력 → 한 번 출력으로 끝난다",
        "비대화형은 파일을 읽을 수 없다"
      ],
      answer: 1,
      explanation: "대화형은 카페 점원처럼 계속 주고받으며 작업하고, 비대화형은 자판기처럼 입력 한 번으로 결과가 나오고 자동 종료됩니다. 기능적으로는 동일해요."
    },
    {
      question: "--output-format json의 장점은?",
      options: [
        "응답이 더 길어진다",
        "결과를 프로그래밍으로 파싱하기 쉽고 비용/시간 등 메타데이터도 포함된다",
        "JSON 파일만 분석할 수 있게 된다"
      ],
      answer: 1,
      explanation: "JSON 포맷으로 출력하면 jq 같은 도구로 결과를 파싱하기 쉽고, 비용(cost)이나 소요 시간(duration_ms) 같은 메타데이터도 함께 받을 수 있어요."
    },
    {
      question: "배치 모드가 CI/CD에서 유용한 이유는?",
      options: [
        "CI/CD에서는 대화형 모드를 사용할 수 없기 때문에",
        "사람 개입 없이 자동으로 코드 리뷰, 분석, 생성 등을 실행할 수 있기 때문에",
        "CI/CD에서만 사용 가능한 특별한 기능이 있기 때문에"
      ],
      answer: 1,
      explanation: "CI/CD 파이프라인은 사람이 직접 입력할 수 없는 환경이에요. 배치 모드의 -p 플래그를 사용하면 스크립트에서 자동으로 클로드를 실행하고 결과를 받을 수 있습니다."
    },
    {
      question: "다음 중 올바른 파이프 체이닝은?",
      options: [
        "claude -p | echo \"질문\"",
        "cat file.ts | claude -p \"리뷰해줘\" | grep \"버그\"",
        "claude -p > echo \"질문\""
      ],
      answer: 1,
      explanation: "파이프 체이닝은 왼쪽에서 오른쪽으로 데이터가 흐릅니다. cat으로 파일을 읽고 → claude가 분석하고 → grep으로 특정 키워드만 필터링하는 패턴이에요."
    }
  ]
};
