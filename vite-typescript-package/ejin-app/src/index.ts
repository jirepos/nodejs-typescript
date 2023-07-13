// typescript 모듈 
// import 구문에서 .ts 확장자를 포함해야 함. 
// es 모듈 빌드 시, 확장자가 없으면 
// node.js나 브라우저에서 실행 시 module을 찾을 수 없어 오류발생함 
export { default as version } from './common/utils.ts'; 

// node.js path 모듈 사용하는 타입스크립트 모듈
export { default as pathinfo } from './common/node-path.ts';
