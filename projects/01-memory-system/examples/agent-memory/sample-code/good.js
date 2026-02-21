// 잘 작성된 코드 예시
// 에이전트가 리뷰하면 "좋은 패턴"으로 기억합니다

/**
 * 사용자 이름의 유효성을 검사합니다.
 * @param {string} name - 검사할 이름
 * @returns {boolean} 유효하면 true
 */
const isValidName = (name) => {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 50;
};

/**
 * 사용자에게 인사 메시지를 생성합니다.
 * @param {string} name - 사용자 이름
 * @returns {string} 인사 메시지
 */
const createGreeting = (name) => {
  if (!isValidName(name)) {
    return '올바른 이름을 입력해주세요.';
  }
  return `안녕하세요, ${name}님! 환영합니다.`;
};

// 사용 예시
console.log(createGreeting('김철수'));   // "안녕하세요, 김철수님! 환영합니다."
console.log(createGreeting(''));         // "올바른 이름을 입력해주세요."
console.log(createGreeting(123));        // "올바른 이름을 입력해주세요."
