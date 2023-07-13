// src/comm.ts
function hello() {
  console.log("Hello World");
}

// src/es6comm.js
import path from "path";
function getFileName() {
  return path.join("a", "b", "c ");
}
export {
  getFileName,
  hello
};
