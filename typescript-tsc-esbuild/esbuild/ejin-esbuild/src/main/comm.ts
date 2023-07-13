
// const moment = require("moment");
// exports.now = function () {
//   return moment().format();
// };


import moment from 'moment';
export function now() {
  return moment().format();
}

export function hello(){ 
  console.log('Hello World');
}

