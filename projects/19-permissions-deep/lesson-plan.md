# 튜터 지시서: 권한 심화

> 이 파일은 `/learn 19` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

Claude Code의 권한 시스템을 세밀하게 설정하고 조합하는 방법을 이해한다.

## 핵심 비유

"놀이공원 팔찌처럼, 어떤 놀이기구를 탈 수 있는지 세밀하게 설정! 금색 팔찌는 전부 탈 수 있고, 파란 팔찌는 일부만. 빨간 표시가 있으면 그 놀이기구는 절대 못 타요. 클로드 코드의 권한도 똑같이, 어떤 도구를 쓸 수 있고 어떤 건 금지인지 정할 수 있어요!"

## 연습 파일

- 권한 모드 4가지: `projects/19-permissions-deep/concepts/permission-modes.md`
- 와일드카드 패턴: `projects/19-permissions-deep/concepts/wildcard-patterns.md`
- 평가 순서: `projects/19-permissions-deep/concepts/evaluation-order.md`
- 설정 파일 실습: `projects/19-permissions-deep/tutorial/step-01-settings-json.md`
- 와일드카드 실습: `projects/19-permissions-deep/tutorial/step-02-wildcard-control.md`
- deny+allow 조합: `projects/19-permissions-deep/tutorial/step-03-deny-allow-combo.md`
- 예제 - 안전한 개발 환경: `projects/19-permissions-deep/examples/safe-dev-env/`
- 예제 - 팀 프리셋: `projects/19-permissions-deep/examples/team-preset/`

## 교육 흐름

### Step 1: 권한 모드 4가지 (Normal, Auto-accept, Plan, Bypass)

1. "지금까지 클로드가 뭔가 하려고 할 때 '허용할까요?' 물어본 적 있죠? 그게 바로 권한 시스템이에요!"
2. concepts/permission-modes.md를 Read로 읽어 참고
3. 4가지 모드 비유:
   - **Normal**: 매번 물어보기 (기본, 안전)
   - **Auto-accept**: 전부 허용 (편하지만 위험할 수 있음)
   - **Plan mode**: 계획만 세우고 실행은 승인 후 (설계 단계에 좋음)
   - **Bypass**: 모든 제한 무시 (매우 위험, 테스트용)
4. "놀이공원에서 입장할 때 팔찌를 선택하는 것처럼, 작업 시작 전에 모드를 정하는 거예요!"

**확인 질문**: "가장 안전한 모드와 가장 위험한 모드는?"
→ 기대 답변: Plan mode가 가장 안전, Bypass가 가장 위험

### Step 2: 와일드카드 패턴 (`Bash(npm *)`, `Bash(*-h*)`)

1. "이제 세밀하게 조절하는 법을 배워요. '놀이기구 전부 허용'이 아니라 '회전목마만 허용'처럼!"
2. concepts/wildcard-patterns.md를 Read로 읽어 참고
3. 와일드카드 패턴 설명:
   - `Bash(npm *)` = npm으로 시작하는 명령만 허용
   - `Bash(git *)` = git 명령만 허용
   - `Bash(*-h*)` = 도움말(-h, --help) 플래그가 있는 명령만 허용
   - `Edit(src/*)` = src 폴더 안의 파일만 편집 허용
4. tutorial/step-02-wildcard-control.md를 Read로 실습 안내
5. "별표(*)는 '아무거나'라는 뜻이에요. `npm *`은 'npm 뒤에 뭐가 오든 OK'라는 거죠!"

**확인 질문**: "`Bash(npm *)` 패턴이 허용하는 명령 예시를 말해보세요."
→ 기대 답변: npm install, npm run build, npm test 등 npm으로 시작하는 모든 명령

### Step 3: deny → ask → allow 평가 순서와 조합 전략

1. "팔찌에 '금지(빨간)', '물어보기(노란)', '허용(초록)' 표시가 있다면, 어떤 순서로 확인할까요?"
2. concepts/evaluation-order.md를 Read로 읽어 참고
3. 평가 순서:
   - **1단계 deny**: 금지 목록에 있으면 → 즉시 차단 (물어보지도 않음)
   - **2단계 allow**: 허용 목록에 있으면 → 자동 허용
   - **3단계 ask**: 둘 다 아니면 → 사용자에게 물어보기
4. 조합 전략 예시:
   - `deny: ["Bash(rm *)"]` + `allow: ["Bash(npm *)"]` = rm 차단, npm 자동 허용, 나머지 물어보기
5. tutorial/step-03-deny-allow-combo.md를 Read로 실습 안내
6. "놀이공원에서 '위험한 놀이기구는 절대 금지, 안전한 건 자유, 나머지는 보호자 동의' 같은 거예요!"

### Step 4: 마무리 퀴즈

1. 설정 파일 위치와 적용 범위:
   - `.claude/settings.json` (프로젝트) — 이 프로젝트에만 적용
   - `~/.claude/settings.json` (사용자) — 모든 프로젝트에 적용
   - 기업 관리 정책 — 관리자가 전체 팀에 적용
2. 예제 소개:
   - 안전한 개발 환경: npm만 허용, rm 차단
   - 팀용 권한 프리셋: 역할별 권한 세트

퀴즈:
1. "deny, allow, ask 중 가장 먼저 확인하는 것은?"
   → 정답: deny (금지 목록이 최우선)
2. "`Bash(npm *)` 패턴은 어떤 명령을 허용하나요?"
   → 정답: npm으로 시작하는 모든 Bash 명령 (npm install, npm test 등)
3. "Plan mode에서 클로드는 무엇을 할 수 있고 무엇을 못하나요?"
   → 정답: 계획(코드 읽기, 분석)은 가능하지만, 실제 실행(파일 수정, 명령 실행)은 승인 후에만 가능
4. "프로젝트별로 다른 권한을 적용하려면 어떤 파일을 수정하나요?"
   → 정답: `.claude/settings.json` (프로젝트 폴더 내)

### 마무리

"축하해요! 클로드 코드의 권한 시스템을 완벽히 이해했어요!
기억할 것:
- 4가지 모드: Normal(기본), Auto-accept(전부 허용), Plan(계획만), Bypass(제한 해제)
- 와일드카드 `*`로 세밀하게 제어
- deny → allow → ask 순서로 평가
- 프로젝트별, 사용자별 설정 가능

다음 추천: `/learn 20`으로 IDE 통합을 배워보세요!"
