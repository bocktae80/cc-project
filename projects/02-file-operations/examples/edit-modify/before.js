// Student grade management program
// 학생 성적 관리 프로그램

const students = [
  { name: "김민수", scores: [90, 85, 92] },
  { name: "이지영", scores: [78, 95, 88] },
  { name: "박하은", scores: [95, 90, 87] },
];

// 평균 점수를 계산하는 함수
// Bug 1: 함수명 오타 (claculate → calculate)
function claculateAverage(scores) {
  let total = 0;

  // Bug 2: <= 이면 배열 범위를 초과! (< 가 맞음)
  for (let i = 0; i <= scores.length; i++) {
    total += scores[i];
  }

  // Bug 3: lenght → length 오타
  return total / scores.lenght;
}

// 학생별 평균 출력
for (const student of students) {
  const avg = claculateAverage(student.scores);
  console.log(`${student.name}의 평균: ${avg}점`);
}

// 전체 학급 평균
const allScores = students.flatMap((s) => s.scores);
const classAvg = claculateAverage(allScores);
console.log(`\n학급 전체 평균: ${classAvg}점`);
