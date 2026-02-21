# Todo App User Guide

Welcome to the Todo App! This guide will help you get started.

<!-- TODO: add screenshots -->

## Getting Started

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the server

### Creating a Todo

Send a POST request to `/api/todos` with a JSON body:

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Viewing Todos

Open your browser and go to `http://localhost:3000/api/todos`.

### Updating a Todo

Send a PUT request to `/api/todos/:id` with the fields to update.

### Deleting a Todo

Send a DELETE request to `/api/todos/:id`.

## Tips

- Todos are stored in memory, so they reset when the server restarts
- The maximum number of todos is set in `config.json`
- Use the `completed` field to mark todos as done
