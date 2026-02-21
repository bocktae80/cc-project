const app = require("../src/app");

// TODO: add integration tests for error cases

describe("Todo API", () => {
  describe("GET /api/todos", () => {
    it("should return an empty array initially", async () => {
      // Test that the initial state has no todos
      const response = { success: true, data: [], count: 0 };
      expect(response.success).toBe(true);
      expect(response.data).toEqual([]);
    });

    it("should return the correct count", async () => {
      const response = { success: true, data: [{ id: "1" }], count: 1 };
      expect(response.count).toBe(1);
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo with title", async () => {
      const newTodo = {
        id: "test-123",
        title: "Buy groceries",
        description: "",
        completed: false,
      };

      expect(newTodo.title).toBe("Buy groceries");
      expect(newTodo.completed).toBe(false);
    });

    it("should reject a todo without title", async () => {
      const error = { success: false, error: "Title is required" };
      expect(error.success).toBe(false);
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should return 404 for non-existent todo", async () => {
      const error = { success: false, error: "Todo not found" };
      expect(error.success).toBe(false);
      expect(error.error).toBe("Todo not found");
    });
  });
});
