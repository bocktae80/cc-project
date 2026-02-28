// 교육용 코드 - 보안 취약점을 이해하기 위한 예제입니다
// 절대 프로덕션(실제 서비스)에서 사용하지 마세요!

// ============================================================
// 인증 우회 (Broken Authentication)
// 비유: 학교에서 이름표를 확인 안 해서
//       이름표 없이도 교무실에 들어갈 수 있는 것
// ============================================================

const express = require('express');
const app = express();
app.use(express.json());


// ============================================================
// 취약한 코드 (위험!)
// 인증 확인이 없거나, 예측 가능한 방식으로 인증
// ============================================================

// --- 예제 1: 인증 없는 API ---

// 취약한 마이페이지 API
app.get('/api/user/profile', (req, res) => {
  // 로그인 여부를 확인하지 않음!
  // URL에 userId만 넣으면 아무나 볼 수 있음
  const userId = req.query.id;
  const user = db.getUser(userId);
  res.json(user);
});

// --- 공격 시나리오 ---
// /api/user/profile?id=1   → 1번 사용자 개인정보
// /api/user/profile?id=2   → 2번 사용자 개인정보
// /api/user/profile?id=3   → 3번 사용자 개인정보
// ... 아무 사용자의 정보를 볼 수 있음!


// --- 예제 2: 예측 가능한 토큰 ---

// 취약한 토큰 생성
function unsafeCreateToken(userId) {
  // 사용자 ID를 그대로 Base64로 인코딩!
  // Base64는 암호화가 아니라 인코딩 (누구나 디코딩 가능)
  const token = Buffer.from(`user:${userId}`).toString('base64');
  return token;
  // userId=1 → "dXNlcjox"
  // userId=2 → "dXNlcjoy"  (패턴이 눈에 보임!)
}

// 취약한 토큰 검증
function unsafeVerifyToken(token) {
  // Base64 디코딩만 하면 끝
  const decoded = Buffer.from(token, 'base64').toString();
  const userId = decoded.split(':')[1];
  return { userId };
  // 공격자가 "dXNlcjoxMDA=" (user:100)를 직접 만들면
  // 100번 사용자로 로그인한 것처럼 행동 가능!
}

// --- 공격 시나리오 ---
// 1. 자신의 토큰 "dXNlcjox"을 Base64 디코딩 → "user:1"
// 2. 패턴 파악: "user:{숫자}"
// 3. 관리자 토큰 생성: "user:0" → Base64 인코딩 → "dXNlcjow"
// 4. 이 토큰으로 요청 → 관리자 권한 획득!


// --- 예제 3: 약한 비밀번호 정책 ---

// 취약한 회원가입
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // 비밀번호 규칙 검사가 없음!
  // "1234", "password", "a" 같은 약한 비밀번호도 허용

  // 비밀번호를 그대로 저장 (해시 안 함)
  db.createUser({
    username,
    password: password  // 평문 그대로!
  });

  res.json({ message: '가입 완료' });
});

// --- 공격 시나리오 ---
// 1. 대부분의 사용자가 쉬운 비밀번호 사용 (1234, password 등)
// 2. 공격자가 흔한 비밀번호 목록으로 무차별 시도 (brute force)
// 3. DB 유출 시 비밀번호가 그대로 보임


// ============================================================
// 안전한 코드 (수정됨)
// 적절한 인증과 안전한 토큰 사용
// ============================================================

// --- 수정 1: 인증 미들웨어 ---

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // 환경변수에서 비밀키 가져옴

// 인증 미들웨어: 모든 보호된 라우트에 적용
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: '로그인이 필요합니다' });
  }

  try {
    // JWT 토큰 검증 (서명이 유효한지 확인)
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
}

// 안전한 마이페이지 API
app.get('/api/safe/user/profile', requireAuth, (req, res) => {
  // requireAuth를 통과해야만 여기에 도달
  // URL의 id가 아니라, 토큰에서 추출한 userId를 사용!
  const userId = req.user.userId;
  const user = db.getUser(userId);

  // 민감한 정보 제거 후 반환
  const { password_hash, ...safeUser } = user;
  res.json(safeUser);
});


// --- 수정 2: 안전한 토큰 생성 ---

// 안전한 토큰 생성 (JWT 사용)
function safeCreateToken(userId, role) {
  // JWT: 서명(signature)이 포함되어 위조 불가능!
  const token = jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '1h' }  // 1시간 후 만료 (영구 토큰 아님!)
  );
  return token;
  // 결과: "eyJhbGciOiJIUzI1NiIs..."
  // 서명이 있어서 내용을 수정하면 검증 실패!
}

// 안전한 토큰 검증
function safeVerifyToken(token) {
  try {
    // 서명을 검증하고, 만료 시간도 확인
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    // 위조된 토큰, 만료된 토큰 → null 반환
    return null;
  }
}


// --- 수정 3: 안전한 회원가입 ---

const bcrypt = require('bcrypt');

app.post('/api/safe/register', async (req, res) => {
  const { username, password } = req.body;

  // 1. 비밀번호 규칙 검사
  if (!password || password.length < 8) {
    return res.status(400).json({ error: '비밀번호는 8자 이상이어야 합니다' });
  }

  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).json({
      error: '비밀번호에 대문자와 숫자가 포함되어야 합니다'
    });
  }

  // 흔한 비밀번호 차단
  const commonPasswords = ['password', '12345678', 'qwerty123'];
  if (commonPasswords.includes(password.toLowerCase())) {
    return res.status(400).json({ error: '너무 흔한 비밀번호입니다' });
  }

  // 2. 비밀번호 해시 (bcrypt)
  const passwordHash = await bcrypt.hash(password, 12);

  // 3. 해시된 비밀번호만 저장
  db.createUser({
    username,
    password_hash: passwordHash  // 원본 비밀번호는 저장 안 함!
  });

  res.json({ message: '가입 완료' });
});


// ============================================================
// 핵심 정리
// ============================================================
//
// 인증의 3가지 핵심:
//
// 1. 인증 확인 (Authentication)
//    - 모든 보호된 API에 인증 미들웨어 적용
//    - URL 파라미터가 아닌 토큰에서 사용자 식별
//
// 2. 안전한 토큰 (Token Security)
//    - Base64 ← 암호화가 아님! 누구나 디코딩 가능
//    - JWT ← 서명 포함! 위조 불가능 + 만료 시간 설정
//    - 비밀키는 환경변수로 관리 (코드에 직접 X)
//
// 3. 비밀번호 정책 (Password Policy)
//    - 최소 길이 + 복잡성 규칙 필수
//    - bcrypt 해시로 저장 (평문 저장 절대 금지)
//    - 흔한 비밀번호 차단
//
// 기억하세요:
//   "문을 잠가도 열쇠가 화분 아래에 있으면 소용없어요!"
//   인증은 있는 것만으로 부족하고, 안전하게 구현해야 합니다.
