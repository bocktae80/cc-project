const express = require("express");
const cors = require("cors");
const { generateId, formatDate } = require("./utils");
const config = require("./config.json");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory todo storage
let todos = [];

// TODO: add authentication middleware

// GET /api/todos - Get all todos
app.get("/api/todos", (req, res) => {
  res.json({
    success: true,
    data: todos,
    count: todos.length,
  });
});

// POST /api/todos - Create a new todo
app.post("/api/todos", (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }

  const newTodo = {
    id: generateId(),
    title,
    description: description || "",
    completed: false,
    createdAt: formatDate(new Date()),
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    data: newTodo,
  });
});

// PUT /api/todos/:id - Update a todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  // TODO: add error handling for invalid data types
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  res.json({
    success: true,
    data: todo,
  });
});

// DELETE /api/todos/:id - Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: "Todo not found",
    });
  }

  const deleted = todos.splice(index, 1)[0];

  res.json({
    success: true,
    data: deleted,
  });
});

// Start server
const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${config.dbName}`);
});

module.exports = app;
