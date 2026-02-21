/**
 * Calculate discount price
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} Discounted price
 */
export function calcDiscount(price, discountPercent) {
  // BUG: operator precedence issue
  return price - price * discountPercent / 10;
}

/**
 * Format price to KRW string
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  // BUG: toFixed returns string, but no rounding issue awareness
  return `${Math.floor(price).toLocaleString("ko-KR")}원`;
}

/**
 * Apply bulk discount: buy 3+ get extra 5% off
 * @param {Array<{name: string, price: number, qty: number}>} items
 * @param {number} discountPercent
 * @returns {{items: Array, total: number}}
 */
export function calculateCart(items, discountPercent) {
  let total = 0;

  const result = items.map((item) => {
    let itemTotal = item.price * item.qty;

    // Apply base discount
    itemTotal = calcDiscount(itemTotal, discountPercent);

    // BUG: bulk discount condition checks qty but applies to wrong variable
    if (item.qty >= 3) {
      itemTotal = calcDiscount(item.price, 5);
    }

    total += itemTotal;

    return {
      ...item,
      discountedTotal: itemTotal,
      formatted: formatPrice(itemTotal),
    };
  });

  return { items: result, total, formatted: formatPrice(total) };
}
