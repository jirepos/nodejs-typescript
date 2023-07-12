# 배포용 타입스크립트 프로젝트 


**package.json** 
* Node.js 12부터 CommonJS와 ESM 둘 다 지원 
* CJS는 require/module.exports를 지원
* ESJ은 import/export를 지원
* ESM에서는 cjs를 import할 수 있지만 
* CJS는 ESM을 require할 수 없다.

```json
{
  // 
  "type": "commonjs",
  // .js는 cjs로 해석 

  "type": "module",
  // .js는 esm으로 해석
  // .cjs는 항상 cjs로 해석
  // .mjs는 항상 esm으로 해석
}

```


```json
{
  // name은 모듈 이름. 임포트할 때 import { util } from 'ejin-common'과 같이 사용.
  "name": "ejin-common",
  "private": true,
  "version": "1.0.0",
  // type:module 이면  .js 파일은 esm으로 해석. 즉,.js 파일에서 require()는 사용 불가
  "type": "module",
  // import하면 "main"의 파일을 로드한다. 
  "main": "./build/ejin-common.js"
}   
```


```json
{
  "main": "./build/ejin-common.umd.cjs",
  // es module import를 지원하는 환경에서 main 파일 대신 사용하게 될 module 경로
  "module": "./build/ejin-common.js",
  // typescript를 사용하는 환경에서 번들링 된 라이브러리의 타입을 지원하기 위한 .d.ts 경로
  "types": "./build/index.d.ts",
}
```


```json
{
  // 배포 시 포함할 항목 
  "files": [
    "build"
  ],
}
```

조건 exports 


```json
{
  "name": "ejin-common",
  "exports": {
    // .으로 시작하는 상대 경로 
    ".": {
      // import할 때 사용할 파일 경로
      "import": "./build/ejin-common.js",
      // require할 때 사용할 파일 경로
      "require": "./build/ejin-common.umd.cjs"
    }
  },  
}
```




```json
{
  "name": "ejin-common",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "main": "./build/ejin-common.umd.cjs",
  "module": "./build/ejin-common.js",
  "types": "./build/index.d.ts",
  "exports": {
    ".": {
      "import": "./build/ejin-common.js",
      "require": "./build/ejin-common.umd.cjs"
    }
  },  
  "files": [
    "build"
  ],
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/node": "^20.4.1",
    "typescript": "^5.0.2",
    "vite": "^4.4.0",
    "vite-plugin-dts": "^3.2.0",
    "vite-tsconfig-paths": "^4.2.0"
  }
}
```



**tsconfig.json**    


```json
{
  "compilerOptions": {
    "target": "es2016", 
    "module": "ES6",    
    // nodeext 또는 node16으로 설정된 경우
    // 설정된 규칙이 package.json과 동일
    // type 필드가 commonjs이면, .ts는 cjs로 해석
    // type 필드가 module인 경우, .ts는 esm으로 해석
    // .cts는 항상 cjs로 해석 
    // .mts는 항상 esm으로 해석
    "moduleResolution": "Node",                  
  }  
}
```



