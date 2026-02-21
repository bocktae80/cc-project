// 이 파일은 메모리 계층 테스트용 예제입니다.
// 클로드에게 이 파일을 수정해달라고 하면,
// CLAUDE.md + CLAUDE.local.md + .claude/rules/*.md 규칙이
// 모두 적용되는 것을 확인할 수 있습니다.

const greet = (name) => {
  return `안녕하세요, ${name}님!`;
};

const add = (a, b) => {
  return a + b;
};

console.log(greet('세계'));
console.log('1 + 2 =', add(1, 2));

// TODO: 클로드에게 요청해보세요!
// - "subtract 함수 추가해줘" → 스타일 규칙이 적용되는지 확인
// - "테스트 파일 만들어줘" → 테스트 규칙이 적용되는지 확인
