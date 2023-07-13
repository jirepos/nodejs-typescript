# 로컬 모듈 배포 테스트 

로컬 환경에서 NodeJS 모듈을 배포하고 인스톨하여 테스트할 수 있습니다.

```shell
📂root-dir 
├─📂ejin-hello
│ ├─📂src  
│ │ └─📄index.js
│ ├─📄package.json 
├─📂ejin-hello-test
│ ├─📂src  
│ │ └─📄index.js
├─📄package.json
```


## 로컬 배포용 모듈 작성 

ejin-hello/src 폴더를 생성하고 index.js를 다음과 같이 작성합니다.

```jsx
// src/index.js 
export function hello() {
  return 'Hello World!';
}
```

package.json을 다음과 같이 작성 합니다. 
```json
{
  "name": "ejin-hello",
  "version": "1.0.0",
  "description": "for testing",
  "main": "src/index.js",
  "author": "ejin@gmail.com",
  "license": "MIT",
  "type": "module"
}
```


## 로컬 배포 및 테스트 

ejin-hello-test 디렉토리에서 다음을 실행하여 로컬 환경에서 배포합니다. 

```bash
npm install ../ejin-hello
```

src/index.js를 다음과 같이 작성합니다. 
```jsx
// src/index.js 
import { hello } from 'ejin-hello';
console.log(hello()); // Hello World!
```

package.json의 scripts를 다음과 같이 작성합니다. 
```json
  "scripts": {
    "test": "node ./src/index.js"
  },
```  


