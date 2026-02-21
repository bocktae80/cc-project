// Simple greeting program
// 간단한 인사 프로그램

function greet(name) {
  const hour = new Date().getHours();

  if (hour < 12) {
    return `Good morning, ${name}! 🌅`;
  } else if (hour < 18) {
    return `Good afternoon, ${name}! ☀️`;
  } else {
    return `Good evening, ${name}! 🌙`;
  }
}

// 여러 사람에게 인사하기
const friends = ["민수", "지영", "하은"];

for (const friend of friends) {
  console.log(greet(friend));
}
