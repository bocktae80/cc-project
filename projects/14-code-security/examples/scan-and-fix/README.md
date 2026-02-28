# 스캔 + 수정 실습

> 취약한 코드를 스캔하고, 수정하고, 재스캔하는 전체 워크플로우 체험

---

## 실습 목표

```
취약 코드 읽기 → Claude에게 스캔 요청 → 취약점 파악
→ 수정 방법 논의 → 코드 수정 → 재스캔 → 통과!

  [취약 코드]                              [안전한 코드]
  sql-injection.js    ──스캔+수정──>    sql-injection-fixed.js
  xss-example.js      ──스캔+수정──>    xss-example-fixed.js
  broken-auth.js      ──스캔+수정──>    broken-auth-fixed.js
```

---

## 사전 준비

| 항목 | 필수 여부 | 설명 |
|------|----------|------|
| Claude Code | 필수 | 최신 버전 |
| 취약 코드 파일 | 필수 | `examples/vulnerable-code/` 폴더 |
| Enterprise/Team | 선택 | 없어도 수동 스캔 요청 가능 |

---

## 실습 순서

### Phase 1: SQL 인젝션 스캔 + 수정 (10분)

#### 1단계: 취약 코드 읽기

```
Claude에게 요청:
> examples/vulnerable-code/sql-injection.js를 읽어줘.
> 취약한 코드 부분만 골라서 설명해줘.
```

예상 응답:
```
3개의 취약한 함수를 발견했습니다:
1. unsafeFindUser() - 사용자 입력을 SQL에 직접 연결
2. unsafeLogin() - 템플릿 리터럴로 SQL에 삽입
3. /api/search API - 검색어를 SQL에 직접 포함
```

#### 2단계: 보안 스캔 요청

```
Claude에게 요청:
> sql-injection.js의 취약한 코드 부분을 OWASP 기준으로 분석해줘.
> 각 취약점의 심각도와 공격 시나리오를 설명해줘.
```

예상 응답:
```
[심각] SQL 인젝션 - unsafeFindUser (Line 27)
  공격: username = "'; DROP TABLE users; --"
  영향: DB 테이블 삭제 가능

[심각] SQL 인젝션 + 인증 우회 - unsafeLogin (Line 33)
  공격: email = "admin@test.com' --"
  영향: 비밀번호 없이 관리자 로그인 가능

[심각] SQL 인젝션 + 데이터 유출 - /api/search (Line 40)
  공격: q = "' UNION SELECT id,email,password,null FROM users --"
  영향: 전체 사용자 비밀번호 유출 가능
```

#### 3단계: 수정 확인

```
Claude에게 요청:
> 같은 파일의 안전한 코드 부분을 읽고,
> 취약한 코드와 무엇이 달라졌는지 비교 표로 정리해줘.
```

예상 응답:
```
| 항목 | 취약한 코드 | 안전한 코드 |
|------|-----------|-----------|
| SQL 쿼리 | 문자열 연결 | 파라미터화 쿼리 (?) |
| 비밀번호 비교 | SQL에서 직접 | bcrypt.compare() |
| 입력 검증 | 없음 | 길이 제한 + 검증 |
| 에러 처리 | 없음 | 안전한 에러 메시지 |
```

---

### Phase 2: XSS 스캔 + 수정 (10분)

```
Claude에게 요청:
> examples/vulnerable-code/xss-example.js를 읽고
> 보안 관점에서 취약한 부분을 모두 찾아줘.
> 각 취약점에 대한 수정 방법도 함께 알려줘.
```

포인트:
- innerHTML vs textContent 차이 이해
- HTML 이스케이프 함수의 원리
- Content-Security-Policy 헤더의 역할

---

### Phase 3: 인증 우회 스캔 + 수정 (10분)

```
Claude에게 요청:
> examples/vulnerable-code/broken-auth.js를 읽고
> 인증 관련 취약점을 모두 찾아줘.
> Base64가 왜 암호화가 아닌지도 설명해줘.
```

포인트:
- Base64 인코딩 vs 진짜 암호화의 차이
- JWT 토큰의 작동 원리
- 비밀번호 해싱의 필요성

---

## 종합 실습: 전체 코드 한 번에 스캔

세 파일을 한꺼번에 분석할 수도 있어요:

```
Claude에게 요청:
> examples/vulnerable-code/ 폴더의 모든 .js 파일을 읽고
> 보안 취약점 종합 리포트를 만들어줘.
> 심각도별로 정리하고, 수정 우선순위를 추천해줘.
```

예상 종합 리포트:
```
=== 보안 취약점 종합 리포트 ===

총 발견: 9건
  심각: 3건 (SQL 인젝션 3개)
  높음: 3건 (XSS 2개, 인증 1개)
  보통: 2건 (비밀번호 정책, 정보 노출)
  낮음: 1건 (에러 처리)

수정 우선순위:
  1순위: SQL 인젝션 (sql-injection.js) - 즉시 수정
  2순위: 인증 미확인 (broken-auth.js) - 즉시 수정
  3순위: XSS (xss-example.js) - 이번 주 내 수정
  4순위: 기타 - 계획적 수정
```

---

## 시뮬레이션: Enterprise 보안 스캔 결과

Enterprise/Team 플랜에서는 더 체계적인 결과를 볼 수 있습니다:

```
=== Claude Code Security Scan Report ===
Project: cc-project/examples/vulnerable-code
Scan Date: 2024-01-15
Scan Duration: 12.3s

Summary:
  Files Scanned: 3
  Lines Analyzed: 289
  Vulnerabilities Found: 9
  Risk Score: 85/100 (Critical)

Top Recommendations:
  1. Implement parameterized queries in all DB operations
  2. Add authentication middleware to all protected routes
  3. Replace innerHTML with textContent or sanitized output
  4. Hash all passwords with bcrypt (cost factor >= 12)
  5. Use JWT with proper expiration for session management
```

---

## 학습 포인트

이 실습을 통해 배우는 것:

1. **스캔 요청 방법**: Claude에게 보안 검토를 요청하는 다양한 방법
2. **결과 해석**: 심각도, 공격 시나리오, 영향도 이해
3. **수정 검증**: Before/After 비교로 수정의 적절성 확인
4. **워크플로우**: 발견 → 검증 → 수정 → 재스캔의 전체 사이클

> 핵심 교훈: 보안은 "한 번 하고 끝"이 아니라,
> 코드가 변경될 때마다 반복하는 것입니다!

---

## 다음 단계

- [보안 체크리스트](../security-checklist/) — 나만의 보안 점검표 만들기
