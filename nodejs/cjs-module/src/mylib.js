
function hello() {
  console.log('hello');
}

function add(a, b) {
  return a + b;
}

// 두 개의 함수를 익스포트할 때는 module.exports를 사용한다.
module.exports.hello = hello;
module.exports.add = add; 
