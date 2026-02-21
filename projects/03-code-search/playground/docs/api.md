# API Documentation

Base URL: `http://localhost:3000`

## Endpoints

### GET /api/todos

Returns all todos.

**Response:**
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

### POST /api/todos

Creates a new todo.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Todo title |
| description | string | No | Todo description |

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "lxk3a-r7m2p",
    "title": "Buy groceries",
    "description": "Milk and eggs",
    "completed": false,
    "createdAt": "2024-01-15 09:30"
  }
}
```

### PUT /api/todos/:id

Updates an existing todo.

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | No | New title |
| description | string | No | New description |
| completed | boolean | No | Completion status |

### DELETE /api/todos/:id

Deletes a todo by ID.

**Error Responses:**
| Status | Message |
|--------|---------|
| 400 | Title is required |
| 404 | Todo not found |
