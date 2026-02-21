// ============================================
// Todo 앱 프론트엔드 로직
// ============================================
// 서버(localhost:3000)와 통신하여 할 일을 관리합니다.

const API_URL = "http://localhost:3000/todos";

// DOM 요소 가져오기
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const emptyMessage = document.getElementById("empty-message");

// --- 페이지 로드 시 할 일 목록 불러오기 ---
document.addEventListener("DOMContentLoaded", loadTodos);

// --- 이벤트 연결 ---
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  // Enter 키를 눌러도 추가되게
  if (e.key === "Enter") addTodo();
});

// --- 할 일 목록 불러오기 (GET) ---
async function loadTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error("목록 불러오기 실패:", err);
  }
}

// --- 할 일 추가 (POST) ---
async function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return; // 빈 입력은 무시

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();

    // 입력 필드 비우고 포커스
    todoInput.value = "";
    todoInput.focus();

    // 목록 다시 불러오기
    loadTodos();
  } catch (err) {
    console.error("추가 실패:", err);
  }
}

// --- 완료 상태 토글 (PUT) ---
async function toggleTodo(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    loadTodos();
  } catch (err) {
    console.error("수정 실패:", err);
  }
}

// --- 할 일 삭제 (DELETE) ---
async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    loadTodos();
  } catch (err) {
    console.error("삭제 실패:", err);
  }
}

// --- 화면에 할 일 목록 그리기 ---
function renderTodos(todos) {
  // 기존 목록 비우기
  todoList.innerHTML = "";

  // 빈 목록 메시지 표시/숨김
  if (todos.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
  }

  // 각 할 일을 <li>로 만들어서 추가
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;

    // 체크박스
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id, todo.completed));

    // 텍스트
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    // 삭제 버튼
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}
