// Node.js에서 
// package.json에서 type:module이면 .js는 ems loader사용함
// esm loader를 사용해도 확장자가 없으면 오류 
// import { getUrl } from './lib/common'
// 확장자를 포함해야 함 
// commonJS 파일은 .cjs를 붙여야 한다. 
import { getUrl } from './lib/common.js'

let url = getUrl(); 
console.log(url); 

import { getCommonPath } from './common.cjs'
let result = getCommonPath();
console.log(result);

