// 교육용 코드 - 보안 취약점을 이해하기 위한 예제입니다
// 절대 프로덕션(실제 서비스)에서 사용하지 마세요!

// ============================================================
// SQL 인젝션 (SQL Injection)
// 비유: 택배 주소란에 "문 열어"라고 적으면,
//       택배 기사가 진짜 문을 열어버리는 것
// ============================================================

const express = require('express');
const app = express();
app.use(express.json());

// 가상의 데이터베이스 연결
const db = require('./fake-db');

// ============================================================
// 취약한 코드 (위험!)
// 사용자 입력을 SQL 쿼리에 직접 넣어서 공격 가능
// ============================================================

// 취약한 사용자 검색 함수
function unsafeFindUser(username) {
  // 사용자 입력(username)을 문자열 연결로 SQL에 직접 삽입!
  const query = "SELECT * FROM users WHERE name = '" + username + "'";
  return db.execute(query);
}

// 취약한 로그인 함수
function unsafeLogin(email, password) {
  // email과 password를 직접 SQL에 넣음!
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  return db.execute(query);
}

// 취약한 상품 검색 API
app.get('/api/search', (req, res) => {
  const keyword = req.query.q;
  // 검색어를 SQL에 직접 넣음!
  const query = `SELECT * FROM products WHERE name LIKE '%${keyword}%'`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// --- 공격 시나리오 ---
//
// 1. 사용자 검색 공격:
//    입력: username = "'; DROP TABLE users; --"
//    생성되는 SQL: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
//    결과: users 테이블이 삭제됨!
//
// 2. 로그인 우회 공격:
//    입력: email = "admin@test.com' --", password = "아무거나"
//    생성되는 SQL: SELECT * FROM users WHERE email = 'admin@test.com' --' AND password = '아무거나'
//    결과: -- 뒤는 주석이 되어서 비밀번호 확인을 건너뜀!
//    즉, 비밀번호 없이 관리자로 로그인 성공!
//
// 3. 검색어 공격:
//    입력: q = "' UNION SELECT id,email,password,null FROM users --"
//    결과: 상품 대신 모든 사용자의 이메일과 비밀번호가 반환됨!


// ============================================================
// 안전한 코드 (수정됨)
// 파라미터화 쿼리를 사용해서 사용자 입력을 안전하게 처리
// ============================================================

// 안전한 사용자 검색 함수
function safeFindUser(username) {
  // ? 는 플레이스홀더: 두 번째 인자의 값이 안전하게 들어감
  // 사용자가 SQL 명령을 넣어도 그냥 문자열로 취급됨!
  const query = "SELECT * FROM users WHERE name = ?";
  return db.execute(query, [username]);
}

// 안전한 로그인 함수
async function safeLogin(email, password) {
  const bcrypt = require('bcrypt');

  // 1. 이메일로만 사용자를 찾음 (파라미터화 쿼리)
  const query = "SELECT * FROM users WHERE email = ?";
  const users = await db.execute(query, [email]);

  if (users.length === 0) {
    return null; // 사용자 없음
  }

  // 2. 비밀번호는 bcrypt로 비교 (SQL에 넣지 않음!)
  const user = users[0];
  const isValid = await bcrypt.compare(password, user.password_hash);

  return isValid ? user : null;
}

// 안전한 상품 검색 API
app.get('/api/safe-search', (req, res) => {
  const keyword = req.query.q;

  // 입력값 검증 추가
  if (!keyword || keyword.length > 100) {
    return res.status(400).json({ error: '올바른 검색어를 입력해주세요' });
  }

  // 파라미터화 쿼리: ? 에 값이 안전하게 들어감
  const query = "SELECT * FROM products WHERE name LIKE ?";
  db.query(query, [`%${keyword}%`], (err, results) => {
    if (err) {
      // 에러 메시지에 DB 정보를 노출하지 않음
      return res.status(500).json({ error: '검색 중 오류가 발생했습니다' });
    }
    res.json(results);
  });
});


// ============================================================
// 핵심 정리
// ============================================================
//
// 위험한 패턴 (절대 하지 말 것):
//   "SELECT ... WHERE name = '" + userInput + "'"
//   `SELECT ... WHERE name = '${userInput}'`
//
// 안전한 패턴 (항상 이렇게):
//   "SELECT ... WHERE name = ?"  +  [userInput]
//   "SELECT ... WHERE name = $1" +  [userInput]
//
// 기억하세요:
//   "사용자 입력을 절대 SQL 문자열에 직접 넣지 마세요!"
//   항상 파라미터화 쿼리(Parameterized Query)를 사용하세요.
