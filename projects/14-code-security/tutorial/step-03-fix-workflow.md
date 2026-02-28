# Step 3: 취약점 수정 워크플로우

> 발견 → 검증 → 수정 → 재스캔, 보안 수정의 전체 흐름

---

## 4단계 보안 수정 사이클

취약점을 발견한 후에는 **체계적인 과정**을 거쳐 수정합니다.

```
보안 수정 사이클:

  +-----------+     +-----------+     +-----------+     +-----------+
  |  1. 발견   | --> |  2. 검증   | --> |  3. 수정   | --> |  4. 재스캔  |
  |  (Scan)   |     | (Verify)  |     |   (Fix)   |     | (Re-scan) |
  +-----------+     +-----------+     +-----------+     +-----------+
       |                 |                 |                 |
  코드 스캔 실행     진짜 위험한지    안전한 코드로     수정이 제대로
  취약점 목록 확인   확인/분류       변경             됐는지 확인
                                                          |
                                         +------+         |
                                         | 새로운 |<--------+
                                         | 문제?  |  (문제 있으면 2단계로)
                                         +------+
                                              |
                                         아니오 → 완료!
```

---

## Step-by-Step 실습 (시뮬레이션)

### 대상 코드

```javascript
// login.js - 로그인 처리
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  db.query(query, (err, users) => {
    if (err) {
      return res.status(500).send(err.stack);
    }
    if (users.length > 0) {
      req.session.userId = users[0].id;
      req.session.role = users[0].role;
      res.json({ message: '로그인 성공', user: users[0] });
    } else {
      res.status(401).json({ error: `${email}로 등록된 계정을 찾을 수 없습니다` });
    }
  });
});

module.exports = router;
```

---

### 1단계: 발견 (Scan)

Claude에게 스캔을 요청합니다.

```
> login.js를 보안 관점에서 분석해줘
```

**스캔 결과 (시뮬레이션):**

```
=== 보안 스캔 결과: login.js ===
총 발견: 5건

[심각] SQL 인젝션 (Line 8)
  email과 password가 SQL에 직접 삽입됨

[높음] 비밀번호 평문 비교 (Line 8)
  DB에 비밀번호가 해시 없이 저장되어 있음을 시사

[높음] 에러 스택 노출 (Line 11)
  err.stack으로 서버 내부 경로 노출

[보통] 사용자 정보 전체 반환 (Line 15)
  users[0] 전체를 반환 → 비밀번호 등 민감 정보 포함 가능

[낮음] 이메일 반영 (Line 18)
  에러 메시지에 사용자 입력(email) 반영 → XSS 가능성
```

---

### 2단계: 검증 (Verify)

발견된 취약점이 **진짜 위험한지** 확인합니다.

```
> 발견된 5개 취약점 중 실제로 악용 가능한 것을 우선순위로 정리해줘.
> 오탐(false positive)이 있는지도 확인해줘.
```

**검증 결과 (시뮬레이션):**

```
=== 검증 결과 ===

확인된 취약점 (수정 필요):
  1. [심각] SQL 인젝션 → 확인. 즉시 수정 필요.
  2. [높음] 비밀번호 평문 → 확인. DB 스키마도 변경 필요.
  3. [높음] 에러 스택 노출 → 확인. 프로덕션에서 위험.
  4. [보통] 사용자 정보 전체 반환 → 확인. 비밀번호 해시도 포함됨.

재검토 필요:
  5. [낮음] 이메일 반영 → 위험도 낮음.
     JSON 응답이므로 브라우저 XSS 가능성은 매우 낮음.
     하지만 입력 검증을 추가하면 더 안전.

수정 우선순위: 1 → 2 → 3 → 4 → 5
```

---

### 3단계: 수정 (Fix)

우선순위대로 수정합니다.

```
> 확인된 취약점을 모두 수정한 안전한 버전의 login.js를 작성해줘
```

**수정된 코드:**

```javascript
// login.js - 로그인 처리 (보안 수정 완료)
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // [수정 1] 입력 검증
    if (!email || !password) {
      return res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요' });
    }

    // [수정 2] 파라미터화 쿼리 (SQL 인젝션 방지)
    const query = 'SELECT id, email, password_hash, role FROM users WHERE email = ?';
    const users = await db.query(query, [email]);

    if (users.length === 0) {
      // [수정 5] 사용자 입력을 에러 메시지에 반영하지 않음
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' });
    }

    // [수정 3] 비밀번호 해시 비교 (bcrypt)
    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다' });
    }

    // 세션 설정
    req.session.userId = user.id;
    req.session.role = user.role;

    // [수정 4] 필요한 정보만 반환 (비밀번호 제외)
    res.json({
      message: '로그인 성공',
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (err) {
    // [수정 5] 에러 상세 정보를 클라이언트에 노출하지 않음
    console.error('Login error:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다' });
  }
});

module.exports = router;
```

### Before vs After 비교

```
수정 전 (위험)                          수정 후 (안전)
─────────────                          ─────────────
SQL에 직접 삽입                         파라미터화 쿼리 (?)
  `WHERE email = '${email}'`             WHERE email = ?

비밀번호 평문 비교                       bcrypt 해시 비교
  password = '${password}'               bcrypt.compare()

에러 스택 노출                           일반 메시지만 반환
  res.send(err.stack)                    "서버 오류가 발생했습니다"

사용자 정보 전체 반환                     필요한 필드만 선택
  res.json(users[0])                     { id, email, role }

입력 그대로 에러에 포함                   고정 에러 메시지
  `${email}로 등록된...`                 "이메일 또는 비밀번호가..."
```

---

### 4단계: 재스캔 (Re-scan)

수정된 코드를 다시 스캔합니다.

```
> 수정된 login.js를 다시 보안 스캔해줘. 새로운 문제가 없는지 확인해줘.
```

**재스캔 결과 (시뮬레이션):**

```
=== 보안 재스캔 결과: login.js ===
총 발견: 0건

이전 취약점 수정 확인:
  [해결] SQL 인젝션 → 파라미터화 쿼리로 수정됨
  [해결] 비밀번호 평문 → bcrypt 해시 비교로 변경됨
  [해결] 에러 스택 노출 → 일반 에러 메시지로 변경됨
  [해결] 사용자 정보 전체 반환 → 필요 필드만 선택됨
  [해결] 이메일 반영 → 고정 에러 메시지로 변경됨

새로운 취약점: 없음

추가 권장사항:
  - 로그인 시도 횟수 제한 (brute force 방지) 권장
  - CSRF 토큰 검증 추가 권장
  - 세션 만료 시간 설정 확인 권장

상태: 통과 (PASS)
```

---

## 보안 리뷰 체크리스트

코드 수정 후 아래 항목을 점검합니다:

```
보안 리뷰 체크리스트
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

입력 검증
  [ ] 모든 사용자 입력에 검증이 있는가?
  [ ] SQL 쿼리에 파라미터화를 사용하는가?
  [ ] HTML 출력 시 이스케이프를 하는가?

인증/인가
  [ ] 보호된 라우트에 인증 미들웨어가 있는가?
  [ ] 다른 사용자의 리소스에 접근할 수 없는가?
  [ ] 세션/토큰이 안전하게 관리되는가?

데이터 보호
  [ ] 비밀번호가 해시되어 저장되는가?
  [ ] 민감 데이터가 응답에 포함되지 않는가?
  [ ] API 키나 시크릿이 코드에 없는가?

에러 처리
  [ ] 에러 메시지에 내부 정보가 노출되지 않는가?
  [ ] 에러 시 적절한 HTTP 상태 코드를 반환하는가?
  [ ] try-catch로 예외가 처리되는가?

기타
  [ ] CORS 설정이 적절한가?
  [ ] rate limiting이 적용되어 있는가?
  [ ] 로깅이 적절히 설정되어 있는가?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 확인 체크리스트

- [ ] 4단계 수정 사이클을 이해했나요? (발견→검증→수정→재스캔)
- [ ] Before/After 코드의 차이를 설명할 수 있나요?
- [ ] 보안 리뷰 체크리스트를 활용할 수 있나요?

---

## 다음 단계

- [취약 코드 샘플](../examples/vulnerable-code/) — 직접 분석해보기
- [스캔+수정 실습](../examples/scan-and-fix/) — 전체 워크플로우 체험
- [보안 체크리스트](../examples/security-checklist/) — 나만의 체크리스트 만들기
