# 튜터 지시서: 스킬 & 커맨드

> 이 파일은 `/learn 08` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

기본 커맨드를 활용하고, 나만의 슬래시 커맨드(스킬)를 만들어 반복 작업을 자동화하는 방법을 배운다.

## 핵심 비유

"게임에서 자주 쓰는 기술을 단축키에 넣잖아요? /로 시작하는 커맨드가 바로 그 단축키예요! 기본 단축키도 있고, 내가 만든 매크로도 있어요."

## 연습 파일

- 기본 vs 커스텀: `projects/08-skills-commands/concepts/builtin-vs-custom.md`
- 스킬 작동 원리: `projects/08-skills-commands/concepts/how-skills-work.md`
- 기본 커맨드 투어: `projects/08-skills-commands/tutorial/step-01-builtin-tour.md`
- 첫 스킬 만들기: `projects/08-skills-commands/tutorial/step-02-first-skill.md`
- 고급 활용: `projects/08-skills-commands/tutorial/step-03-advanced.md`
- 연습 미션: `projects/08-skills-commands/exercise/README.md`
- 기본 커맨드 레퍼런스: `projects/08-skills-commands/reference/builtin-commands.md`

## 교육 흐름

### Step 1: 기본 커맨드 알아보기

1. "클로드에게 /로 시작하는 명령을 내릴 수 있어요. 먼저 기본 커맨드를 알아볼까요?"
2. 주요 기본 커맨드 설명:
   - `/help` — 도움말 보기
   - `/cost` — 토큰 사용량 확인
   - `/compact` — 대화 내용 압축 (토큰 절약)
   - `/clear` — 대화 초기화
   - `/debug` — 디버그 정보 (03d에서 배움)
3. "지금 바로 /cost를 입력해보면 이 세션에서 얼마나 토큰을 썼는지 볼 수 있어요!"
4. tutorial/step-01을 Read로 읽어 추가 정보 안내

### Step 2: 나만의 커맨드 만들기

1. "이제 진짜 재밌는 파트! 나만의 매크로를 만들어볼 거예요!"
2. 커스텀 커맨드 구조 설명:
   - 위치: `.claude/commands/이름.md`
   - 사용: `/이름`으로 실행
   - `$ARGUMENTS`: 실행 시 전달된 인자
3. tutorial/step-02를 Read로 읽어 참고
4. 간단한 예시 함께 만들기:
   - 사용자에게 물어보기: "어떤 커맨드를 만들고 싶어요? 예를 들어 '이 파일을 설명해줘' 커맨드는 어때요?"
   - 예시 마크다운:
     ```markdown
     # .claude/commands/explain.md
     $ARGUMENTS에 해당하는 파일을 읽고 중학생도 이해할 수 있게 설명해주세요.
     ```
5. "이 파일을 만들면 `/explain app.js`라고 입력할 수 있어요!"

### Step 3: $ARGUMENTS 활용

1. "커맨드에 인자를 받으면 훨씬 유연해져요!"
2. `$ARGUMENTS`의 동작 설명:
   - `/explain app.js` → `$ARGUMENTS`가 `app.js`로 치환됨
   - 인자가 없으면 빈 문자열
3. 실용 스킬 예시 소개 (tutorial/step-03를 Read로 참고):
   - 코드 리뷰 커맨드
   - 번역 커맨드
   - 최적화 커맨드
4. "이 `/learn` 커맨드도 사실 같은 방식으로 만든 거예요! `$ARGUMENTS`로 프로젝트 번호를 받아서 해당 레슨을 시작하는 거죠."

### Step 4: 마무리 퀴즈

1. "커스텀 커맨드 파일은 어디에 만드나요?"
   → 정답: .claude/commands/ 폴더 안에 마크다운(.md) 파일로
2. "$ARGUMENTS는 뭘 의미하나요?"
   → 정답: 사용자가 커맨드 뒤에 입력한 값 (예: /explain app.js에서 app.js)
3. "기본 커맨드와 커스텀 커맨드의 차이는?"
   → 정답: 기본은 클로드에 내장된 것, 커스텀은 내가 마크다운으로 만든 것

### 마무리

"이제 나만의 커맨드를 만들 수 있어요! 반복하는 지시는 커맨드로 만들어두면 편리해요.
사실 이 `/learn` 커맨드도 같은 원리로 만든 거예요! 직접 읽어보고 싶으면: `.claude/commands/learn.md`
다음 추천: `/learn 09`로 안전한 실험 공간(Worktree)을 배워보세요!"
