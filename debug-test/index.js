import { calculateCart, formatPrice } from "./utils.js";

const cart = [
  { name: "키보드", price: 50000, qty: 1 },
  { name: "마우스", price: 30000, qty: 3 },
  { name: "모니터", price: 500000, qty: 1 },
];

const discountPercent = 10;

console.log(`=== 장바구니 (${discountPercent}% 할인) ===\n`);

const result = calculateCart(cart, discountPercent);

result.items.forEach((item) => {
  console.log(`${item.name} x${item.qty}: ${item.formatted}`);
});

console.log(`\n합계: ${result.formatted}`);
