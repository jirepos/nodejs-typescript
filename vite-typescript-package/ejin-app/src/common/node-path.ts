import path from 'path';

export default function pathinfo() {
  // Vite를 사용하여 번들링 시 Node.js의 빌트인 모듈은 번들된 파일에서 
  // 사용할 수 없음. 다른 번들링 도구 사용
  let result = path.join('a', 'b', 'c');
  console.log('pathinfo', result);
}