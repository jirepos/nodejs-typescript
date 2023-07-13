
const moment = require("moment");

// 하나만 익스포트할 때는 다음과 같이 exports 를 사용한다. 
exports.now = function () {
  return moment().format();
};