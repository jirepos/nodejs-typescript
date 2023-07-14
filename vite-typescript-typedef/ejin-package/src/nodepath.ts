// node.js built-in 모듈 사용 
import * as  path from 'path'; 

// npm install @types/node
// tsconfig.json
// {
//   "compilerOptions": {
//     "typeRoots": ["./node_modules/@types"],
//   },
// }
export function testPath() {
  console.log(path.join('a', 'b', 'c'));
}