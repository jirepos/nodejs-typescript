

// time은 now를 익스포트한다. 
// { now } 형태로 임포트한다. 
const { now } = require("./time");
// now()와 같이 사용한다. 
console.log("Now:", now());

// mylib 모듈은 hello와 add를 export하고 있다. 
// require()를 사용하여 임포트한다. 
let mylib = require('./mylib.js');

// mylib.hello()와 같이 사용 
mylib.hello();
console.log(mylib.add(1, 2));