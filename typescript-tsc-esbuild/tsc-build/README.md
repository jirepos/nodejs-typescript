# tsc를 이용한 빌드 


## 프로젝트 구조 
```shell
📂root
├─📂build  # 빌드 디렉토리 
├─📂src   # 소스 
├─📄package.json
├─📄tsconfig.json  # 기본설정 파일 
├─📄tsconfig.cjs.json # CommonJS 설정 파일
├─📄tsconfig.esm.json # ESM 설정 파일 
└─📄tsconfig.types.json # Type declarations 설정 파일 
```

## 모듈용 빌드 설정 파일 

각 모듈용 빌드 설정파일을 작성합니다.

### 기본 설정 파일 
```json
{
  "compilerOptions": {
    "target": "es2016",     
    "module": "Node16",
    "moduleResolution": "Node",
    // CommonJS 모듈 시스템에서 ES 모듈을 사용할 수 있도록 설정합니다.
    "esModuleInterop": true,
    //  import 문에서 default를 사용할 수 있도록 설정합니다.
    "allowSyntheticDefaultImports": true,
    "outDir": "build",
    // "allowImportingTsExtensions": true,
    // "emitDeclarationOnly": true,
    // "declaration": true,
    "allowJs": true
  },
  "include": [
    "src/**/*"
  ],  
}
```


### CommonJS 모듈 빌드 
Node.js 환경에서만 실행되는 모듈을 빌드할 때는 "module" 속성에  Node16 모듈을 설정한다. 브라우저 환경이라면 COmmonJS로 설정한다. 

```json
// tsconfig.cjs.json 
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "module": "Node16",  // Node.js용이라면 CommonJS로 설정하지 않아야 함 
    "outDir": "build/cjs",
  }
}
```



### ESM 모듈 빌드 

```json
// tsconfig.esm.json 
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "module": "ESNext",                              
    "outDir": "build/esm",
  }
}
```

### Type declarations 빌드 설정 파일 
```json
// tsconfig.types.json
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "outDir": "build/types",
    "declaration": true,
    "emitDeclarationOnly": true
  }
}
```

## 빌드하기 
tsc 명령어를 대상 파일을 지정하지 않고 실행하면 현재 폴더에 있는 타입스크립트 설정 파일을 기준으로 변환 작업을 수행합니다. 만약 현재 폴더에 타입스크립트 설정 파일이 없다면 프로젝트 폴더 내에서 상위 폴더의 경로를 검색해 나갑니다.

```shell
tsc 
```

여러 개의 설정 파일을 지정하면 각 설정 파일에 맞게 빌드 작업을 수행합니다. 

```shell
tsc -b ./tsconfig.cjs.json ./tsconfig.esm.json ./tsconfig.types.json
```
tsc 명령을 실행할 때 -b 플래그를 사용하면 TypeScript 컴파일러는 프로젝트를 빌드하는 데 필요한 모든 설정과 종속성을 자동으로 해석합니다. 따라서, -b 플래그는 TypeScript 프로젝트의 전체 빌드 작업을 수행하기 위해 사용되는 유용한 옵션입니다.


### 여러 개의 npm 명령어 실행 
여러 개의 npm 명령어를 편리하게 실행하려면 npm-run-all 패키지를 설치합니다. 

```shell
npm i -D npm-run-all
```

package.json에 다음과 같이 "scripts"를 추가합니다. npm run build를 실행하면 build:version 을 먼저 실행하고 build:clean, compile을 실행합니다. 

npm-run-all의 -s 플래그는 순차적으로 스크립트 명령어를 실행하고, -p 플래그는 병렬로 실행합니다.

```json
// pckage.json
{
  "scripts": {
    "build:version": "npm --version", 
    "compile": "tsc -b ./tsconfig.cjs.json ./tsconfig.esm.json ./tsconfig.types.json",
    "build:clean": "rmdir /q /s build",
    "build": "npm-run-all -s build:version build:clean compile",
    "test":"node ./build/esm/index.js",
    "build:basic": "tsc" 
  },
}  
```
이제 빌드하려면 다음과 같이 실행합니다. 

```shell
npm run build
or
yarn build 
```


### 주의사항
TypeScript에서 .ts 파일을 import할 때 import * as a from 'aaa'와 같이 확장자가 없이 임포트를 합니다. JavaScript는  from 'comm.js'와 같이 임포트합니다. 문제는 ESM 모듈로 빌드할 때 JavaScript 파일은 확장자가 있기 때문에 생성된 js 파일의 import 문에 확장자가 포함되어 있습니다. 그러나 .ts 파일은 확장자가 없기 때문에 Node.js에서는 모듈을 찾을 수 없게 됩니다. Node.js에서는 import 시 확장자가 있어야 합니다. 

allowImportingTsExtensions": true로 설정하면 되지만 이 경우 --moduleResolution bundler와 --noEmit 또는 --emitDeclarationOnly를 설정해야 합니다. 

```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "noEmit": true
  }
}
```

Vite 같은 번들러 또는 esbuild를 사용해야 합니다. 그런데, 다음과 같은 실행을 하기 위한 스크립트는 Vite가 적합하지 않습니다. 
```javascript
// main.ts
import { server } from './add.ts'
server.start();   // 서버를 실행 
```

이런 경우 esbuild를 사용하는 것이 적합합니다. 즉, 라이브러리 빌드이면 Vite를 사용하고, 아니면 esbuild를 사용합니다. 또는 Node.js용 서버 실행용 라이브러이라면 esbuild를 사용합니다. 


















