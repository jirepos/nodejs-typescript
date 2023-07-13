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



## esbuild

설치 
```shell
npm install --save-exact esbuild
```

**플래그** 
--oudir : 출력 디렉토리
--bundle : 번들링. import된 파일을 하나의 파일로 번들링 



이것은 esbuild의 기본 인터페이스입니다. 일반적으로 다양한 옵션과 함께 처리할 하나 이상의 진입점 파일을 전달하면 esbuild가 결과를 다시 파일 시스템에 기록합니다. 다음은 출력 디렉터리로 번들링을 활성화하는 간단한 예입니다.

```shell
esbuild app.ts --bundle --outdir=dist
```


node 용 빌드 

```shell
esbuild app.js --bundle --platform=node --target=node10.4
```

또한 종속성을 esbuild와 번들로 묶고 싶지 않을 수도 있습니다.
__dirname, import.meta.url, fs.readFileSync 및 *.node 네이티브 바이너리 모듈과 같이 번들링하는 동안 esbuild가 지원하지 않는 많은 노드 관련 기능이 있습니다. 패키지를 외부로 설정하여 번들에서 모든 종속성을 제외할 수 있습니다.

```shell
esbuild app.jsx --bundle --platform=node --packages=external
```


일반적으로 빌드 API는 빌드 중에 tsconfig.json 파일을 자동으로 검색하고 해당 내용을 읽습니다. 그러나 대신 사용할 사용자 지정 tsconfig.json 파일을 구성할 수도 있습니다. 이는 서로 다른 설정으로 동일한 코드의 여러 빌드를 수행해야 하는 경우에 유용할 수 있습니다.

```shell
esbuild app.ts --bundle --tsconfig=custom-tsconfig.json
```

















