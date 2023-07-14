import { testPath } from './nodepath.ts';
import { hexToBin } from './hex-to-bin.ts';

testPath();
hexToBin();


// ejin-node-jslib 모듈 사용 
import { add } from 'ejin-node-jslib';
import { append  } from 'ejin-node-jslib';

console.log(add(1, 2));
console.log(append('This is ', 'an apple.'));

// .d.ts 파일 없는 모듈 사용 
// 이 프로젝트의 @types에 정의 
import { getUrl } from 'ejin-node-nodec';
console.log(getUrl());
