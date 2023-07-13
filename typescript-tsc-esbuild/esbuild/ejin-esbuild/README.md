# tsc를 이용한 빌드 


## 프로젝트 구조 
```shell
📂root
├─📂build    # 빌드 디렉토리 
├─📂scripts  # esbuild script
├─📂src   # 소스 
├─📄package.json
├─📄tsconfig.json  # 기본설정 파일 
└─📄tsconfig.esm.json # ESM 설정 파일 
```

## 모듈용 빌드 설정 파일 

각 모듈용 빌드 설정파일을 작성합니다.

### 기본 설정 파일 
```json
{
  "compilerOptions": {
    "target": "es2016",     
    "module": "ESNext",
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



### ESM 모듈 빌드 

```json
// tsconfig.esm.esbuild.json 
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "module": "ESNext",                              
    "outDir": "build",
    "emitDeclarationOnly": true,
    "declaration": true,    
  }
}
```




## 빌드하기 
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

















