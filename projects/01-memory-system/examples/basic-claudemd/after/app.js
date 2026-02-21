// 간단한 계산기 앱
// 이 폴더에는 CLAUDE.md가 있습니다!
// 클로드에게 함수 추가를 요청하면, CLAUDE.md 규칙을 따릅니다.

/**
 * 두 숫자를 더합니다.
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 합
 */
function add(a, b) {
  return a + b;
}

/**
 * 두 숫자를 뺍니다.
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 차
 */
function subtract(a, b) {
  return a - b;
}

console.log("1 + 2 =", add(1, 2));
console.log("5 - 3 =", subtract(5, 3));

// 여기서 클로드에게 "greet 함수를 추가해줘"라고 요청해보세요
// CLAUDE.md가 있으니, 한국어 주석 + camelCase + JSDoc으로 작성될 거예요!
