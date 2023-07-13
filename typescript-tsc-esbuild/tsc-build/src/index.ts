
// Node.js에서 ESM을 사용하는 경우 확장자가 포함되어야 하는데 
// ESM 빌드 시 확장자가 없어서 실행 시 오류가 발생한다.
// import { hello } from './comm'; 
// hello();

// import { getFileName } from './es6comm.js';
// let filleName = getFileName();
// console.log(filleName);

export { default as hello } from './comm';
export { default as getFileName } from './es6comm.js';