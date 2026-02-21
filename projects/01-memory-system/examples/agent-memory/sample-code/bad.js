// 개선이 필요한 코드 예시
// 에이전트가 리뷰하면 "주의할 점"으로 기억합니다

// 문제 1: 함수명이 불명확 (doStuff가 뭘 하는 건지?)
function doStuff(x) {
  // 문제 2: 매직 넘버 사용 (3.14가 뭔지 설명 없음)
  var result = x * 3.14;
  // 문제 3: var 사용 (const/let 권장)
  var y = result + 10;
  // 문제 4: 에러 처리 없음 (x가 숫자가 아니면?)
  return y;
}

// 문제 5: 변수명이 불명확
var a = doStuff(5);
var b = doStuff(10);
var c = a + b;

// 문제 6: 중복 코드
console.log("결과1: " + a);
console.log("결과2: " + b);
console.log("결과3: " + c);

// 문제 7: 콜백 지옥 스타일
function getData(callback) {
  setTimeout(function() {
    callback(null, { name: "test" });
  }, 1000);
}

getData(function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
