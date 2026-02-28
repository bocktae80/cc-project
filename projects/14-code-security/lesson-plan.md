# 튜터 지시서: 코드 보안 스캔

> 이 파일은 `/learn 14` 실행 시 튜터(클로드)가 읽는 지시서입니다. 사용자에게 직접 보여주지 마세요.

## 학습 목표

AI 기반 코드 보안 스캔의 원리를 이해하고, 주요 취약점 유형을 식별할 수 있다.

## 핵심 비유

"학교에 CCTV가 있잖아요? 정해진 곳만 비추죠. AI 경비원은 CCTV 없는 곳도 돌아다니면서 수상한 행동을 직접 발견해요. 코드 보안도 마찬가지! 기존 도구는 알려진 패턴만 찾지만, AI는 '이 코드 좀 이상한데?' 하고 추론해요."

## 연습 파일

- 코드 보안이란?: `projects/14-code-security/concepts/what-is-code-security.md`
- AI vs 기존 스캔: `projects/14-code-security/concepts/ai-vs-traditional-scan.md`
- 취약점 이해: `projects/14-code-security/tutorial/step-01-understand-vulns.md`
- 스캔 기초: `projects/14-code-security/tutorial/step-02-scan-basics.md`
- 수정 워크플로우: `projects/14-code-security/tutorial/step-03-fix-workflow.md`
- 취약 코드: `projects/14-code-security/examples/vulnerable-code/`
- 스캔+수정: `projects/14-code-security/examples/scan-and-fix/`
- 체크리스트: `projects/14-code-security/examples/security-checklist/`

## 교육 흐름

### Step 1: 취약점이 뭔지 이해하기

1. "코드에도 '약점'이 있어요. 문 잠그는 걸 깜빡하는 것처럼요!"
2. concepts/what-is-code-security.md를 Read로 읽어 참고
3. OWASP Top 10을 중학생 수준으로 설명:
   - SQL 인젝션 = "택배 주소에 '문 열어'라고 적기"
   - XSS = "게시판에 함정 링크 심기"
   - 인증 우회 = "이름표 없이 교무실 들어가기"
4. 취약 코드 예제를 Read로 읽어 보여주기: `sql-injection.js`
5. "이 코드에서 문제가 보이나요?" 질문으로 참여 유도

퀴즈 1:
"SQL 인젝션이 뭔가요? 일상 비유로 설명해보세요."
→ 정답: 택배 주소란에 "문 열어"처럼 명령어를 끼워넣는 것. 입력란에 예상 밖의 명령을 넣어서 시스템을 조종하는 공격.

### Step 2: 보안 스캔 실행하기

1. concepts/ai-vs-traditional-scan.md를 Read로 읽어 비교
2. AI 스캔과 기존 정적분석의 차이:
   - 기존 도구: "password" 변수명 → 경고 (규칙 기반)
   - AI: "이 함수는 사용자 입력을 검증 없이 DB에 넣네" → 위험 추론
3. tutorial/step-02-scan-basics.md를 Read로 읽어 시뮬레이션 진행
4. 스캔 결과의 심각도(심각/높음/보통/낮음) 설명
5. Enterprise/Team 전용임을 안내하되, 개인 플랜에서도 "이 코드를 보안 관점에서 검토해줘"로 비슷한 효과를 얻을 수 있음을 알려줌

퀴즈 2:
"기존 정적분석 도구와 AI 보안 스캔의 가장 큰 차이는?"
→ 정답: 기존 도구는 알려진 패턴(규칙)만 매칭하고, AI는 코드의 맥락과 의도를 이해해서 새로운 유형의 위험도 추론할 수 있음.

### Step 3: 취약점 발견 → 패치 워크플로우

1. tutorial/step-03-fix-workflow.md를 Read로 읽어 참고
2. 4단계 워크플로우:
   - 발견(Scan) → 검증(Verify) → 수정(Fix) → 재스캔(Re-scan)
3. examples/vulnerable-code/ 에서 sql-injection.js를 Read
   - 취약한 버전 vs 안전한 버전 비교
   - "어떤 점이 바뀌었나요?" 질문
4. examples/scan-and-fix/README.md를 Read로 실습 가이드 제공

퀴즈 3:
"취약점을 수정한 후에 꼭 해야 하는 일은?"
→ 정답: 재스캔(Re-scan). 수정이 제대로 됐는지, 새로운 문제가 생기지 않았는지 확인해야 함.

### Step 4: 보안 체크리스트 만들기 + 마무리 퀴즈

1. examples/security-checklist/README.md를 Read로 읽어 참고
2. 보안 체크리스트 카테고리:
   - 입력 검증: 사용자 입력을 믿지 않기
   - 인증/인가: 문 잠금 확인
   - 데이터 보호: 비밀번호 암호화
   - 에러 처리: 에러 메시지에 비밀 노출 금지
3. "여러분의 프로젝트에 맞는 체크리스트를 Claude에게 만들어달라고 해보세요!"

마무리 퀴즈:
1. "OWASP Top 10 중 가장 위험한 것 3가지를 비유로 설명해보세요."
   → SQL 인젝션(택배 주소에 명령 넣기), XSS(게시판에 함정 심기), 인증 우회(이름표 없이 들어가기)
2. "AI 보안 스캔이 기존 도구보다 나은 점 하나, 기존 도구가 나은 점 하나는?"
   → AI: 맥락 이해로 새로운 위험 발견 / 기존: 빠르고 일관성 있음
3. "보안 체크리스트를 만들 때 가장 중요한 카테고리는?"
   → 입력 검증 (대부분의 공격이 사용자 입력에서 시작)

### 마무리

"축하해요! 코드 보안의 핵심 개념을 모두 배웠어요!
기억할 것:
- 모든 사용자 입력은 의심하기 (Never trust user input)
- AI는 좋은 보안 파트너지만, 사람의 최종 확인이 필수
- 보안은 한 번이 아니라 계속 점검하는 것

더 배우고 싶은 기능이 있으면 `/learn` 목록에서 골라주세요!"
