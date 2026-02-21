/**
 * TodoItem component - renders a single todo
 */

// TODO: add drag and drop support
function TodoItem({ id, title, description, completed, createdAt }) {
  const statusClass = completed ? "todo-item--done" : "todo-item--active";
  const checkbox = completed ? "☑" : "☐";

  return `
    <div class="todo-item ${statusClass}" data-id="${id}">
      <span class="todo-checkbox">${checkbox}</span>
      <div class="todo-content">
        <h3 class="todo-title">${title}</h3>
        <p class="todo-description">${description}</p>
        <time class="todo-date">${createdAt}</time>
      </div>
      <button class="todo-delete" onclick="deleteTodo('${id}')">Delete</button>
    </div>
  `;
}

function TodoList({ todos }) {
  if (todos.length === 0) {
    return '<p class="todo-empty">No todos yet. Add one!</p>';
  }

  return `
    <div class="todo-list">
      ${todos.map((todo) => TodoItem(todo)).join("")}
    </div>
  `;
}

module.exports = { TodoItem, TodoList };
