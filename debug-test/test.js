import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calcDiscount, formatPrice, calculateCart } from "./utils.js";

describe("calcDiscount", () => {
  it("should apply 10% discount correctly", () => {
    // 50000원에서 10% 할인 → 45000원이어야 함
    assert.equal(calcDiscount(50000, 10), 45000);
  });

  it("should apply 20% discount correctly", () => {
    // 100000원에서 20% 할인 → 80000원이어야 함
    assert.equal(calcDiscount(100000, 20), 80000);
  });

  it("should return same price with 0% discount", () => {
    assert.equal(calcDiscount(30000, 0), 30000);
  });
});

describe("formatPrice", () => {
  it("should format price in KRW", () => {
    assert.equal(formatPrice(45000), "45,000원");
  });
});

describe("calculateCart", () => {
  it("should calculate cart total with discount", () => {
    const items = [
      { name: "키보드", price: 50000, qty: 1 },
      { name: "마우스", price: 30000, qty: 3 },
    ];

    const result = calculateCart(items, 10);

    // 키보드: 50000 * 1 = 50000 → 10% off → 45000
    // 마우스: 30000 * 3 = 90000 → 10% off → 81000, then bulk 5% off on 81000 → 76950
    // 합계: 45000 + 76950 = 121950
    assert.equal(result.items[0].discountedTotal, 45000);
    assert.equal(result.total, 121950);
  });

  it("should apply bulk discount for qty >= 3", () => {
    const items = [{ name: "USB", price: 10000, qty: 5 }];
    const result = calculateCart(items, 10);

    // 10000 * 5 = 50000 → 10% off → 45000 → bulk 5% off → 42750
    assert.equal(result.items[0].discountedTotal, 42750);
  });
});
