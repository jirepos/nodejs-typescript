// node.js 모듈 사용 
// .d.ts 파일이 없기 때문에 
// 별도로 .d.ts 파일을 생성하여 정의해야 한다. 
import hexToBinary from 'hex-to-binary';

export function hexToBin() {
  console.log(hexToBinary('0x1234'));
}

