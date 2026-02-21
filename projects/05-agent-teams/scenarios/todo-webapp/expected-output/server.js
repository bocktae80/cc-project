// ============================================
// Todo API 서버 (Express.js)
// ============================================
// AI 에이전트가 자동으로 생성한 코드 예시입니다.
// 실행 방법: node server.js
// 필요 패키지: npm install express@4 cors

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// --- 미들웨어 설정 ---
// CORS: 프론트엔드(HTML 파일)에서 API를 호출할 수 있게 허용
app.use(cors());
// JSON 파싱: POST/PUT 요청의 body를 읽을 수 있게 설정
app.use(express.json());

// --- 데이터 저장소 ---
// 데이터베이스 대신 배열을 사용 (서버 재시작하면 초기화됨)
let todos = [];
let nextId = 1;

// --- API 엔드포인트 ---

// 모든 할 일 목록 조회
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 새 할 일 추가
app.post("/todos", (req, res) => {
  const { text } = req.body;

  // 텍스트가 비어있으면 에러 반환
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "할 일 내용을 입력해주세요" });
  }

  const todo = {
    id: nextId++,
    text: text.trim(),
    completed: false,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// 할 일 수정 (완료 상태 토글 또는 텍스트 변경)
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  // 해당 id의 할 일을 찾지 못하면 에러
  if (!todo) {
    return res.status(404).json({ error: "할 일을 찾을 수 없습니다" });
  }

  // 요청에 포함된 필드만 업데이트
  if (req.body.text !== undefined) {
    todo.text = req.body.text;
  }
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  res.json(todo);
});

// 할 일 삭제
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "할 일을 찾을 수 없습니다" });
  }

  // 배열에서 해당 항목 제거
  const deleted = todos.splice(index, 1)[0];
  res.json(deleted);
});

// --- 서버 시작 ---
app.listen(PORT, () => {
  console.log(`Todo API 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
