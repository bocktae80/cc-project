// Attendance check program
// 출석 체크 프로그램

const classRoom = [
  { name: "김민수", status: "present" },
  { name: "이지영", status: "absent" },
  { name: "박하은", status: "present" },
  { name: "최준호", status: "present" },
  { name: "정수아", status: "absent" },
];

// 출석한 학생 목록을 반환하는 함수
// Bug 1: 함수명 오타 (Attendnace → Attendance)
function checkAttendnace(students) {
  // Bug 2: 변수명 오타 (presnet → present)
  const presnet = [];

  // Bug 3: lenght → length 오타
  for (let i = 0; i < students.lenght; i++) {
    if (students[i].status === "present") {
      presnet.push(students[i].name);
    }
  }

  return presnet;
}

// 출석 현황 출력
const attendees = checkAttendnace(classRoom);
console.log("출석한 학생:", attendees);
console.log(`총 ${attendees.length}명 출석`);
