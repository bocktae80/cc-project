const { formatDate, generateId, validateEmail } = require("../src/utils");

describe("Utility Functions", () => {
  describe("formatDate", () => {
    it("should format date as YYYY-MM-DD HH:mm", () => {
      const date = new Date(2024, 0, 15, 9, 30);
      const result = formatDate(date);
      expect(result).toBe("2024-01-15 09:30");
    });

    it("should pad single digit months and days", () => {
      const date = new Date(2024, 2, 5, 8, 5);
      const result = formatDate(date);
      expect(result).toBe("2024-03-05 08:05");
    });
  });

  describe("generateId", () => {
    it("should return a string", () => {
      const id = generateId();
      expect(typeof id).toBe("string");
    });

    it("should generate unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("validateEmail", () => {
    it("should return true for valid emails", () => {
      expect(validateEmail("user@example.com")).toBe(true);
      expect(validateEmail("test.name@domain.co.kr")).toBe(true);
    });

    it("should return false for invalid emails", () => {
      expect(validateEmail("not-an-email")).toBe(false);
      expect(validateEmail("missing@domain")).toBe(false);
      expect(validateEmail("@no-user.com")).toBe(false);
    });
  });
});
