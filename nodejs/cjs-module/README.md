# CommonJS 모듈 사용하기 


file에 있는 함수, 변수 , 객체 등은 모듈 외부에서 사용할 수 없습니다. 모듈 외부에서 사용하려면 module.exports에 추가해야 합니다. CommonJS에서 모듈 생성하는 방법을 살펴보겠습니다.
* 여러 개의 객체를 내보낼 경우, module.exports 변수의 속성으로 할당한다.
* 딱 하나의 객체를 내보낼 경우, module.exports 변수 자체에 할당한다.


## 하나만 내보낼 때 
```jsx
const moment = require("moment");

// 하나만 익스포트할 때는 다음과 같이 exports 를 사용한다. 
exports.now = function () {
  return moment().format();
};
```

## 한 개 이상을 내보낼 때 
```jsx
function hello() {
  console.log('hello');
}
function add(a, b) {
  return a + b;
}

module.exports.hello = hello;
module.exports.add = add; 
```


## 불러올 때 

불러올 때는 require()로 불러오고 할당된 **상수명.내보낼때의 변수명**과 같이 사용합니다.

```jsx
// mylib 모듈은 hello와 add를 export하고 있다. 
// require()를 사용하여 임포트한다. 
let mylib = require('./mylib.js');

// mylib.hello()와 같이 사용 
mylib.hello();
console.log(mylib.add(1, 2));
```



다음과 같이 분해해서 불러 올 수 있습니다. 

```jsx
// time은 now를 익스포트한다. 
// { now } 형태로 임포트한다. 
const { now } = require("./time");
// now()와 같이 사용한다. 
console.log("Now:", now());
```




