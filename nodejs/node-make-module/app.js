console.log("Hello World!")
const { now } = require("./time");

console.log("Now:", now());

let mylib = require('./mylib.js');

mylib.hello();
console.log(mylib.add(1, 2));