// src/main/comm.ts
import moment from "moment";
function now() {
  return moment().format();
}
function hello() {
  console.log("Hello World");
}

// src/main/es6comm.js
import path from "path";
function getFileName() {
  return path.join("a", "b", "c ");
}
export {
  getFileName,
  hello,
  now
};
