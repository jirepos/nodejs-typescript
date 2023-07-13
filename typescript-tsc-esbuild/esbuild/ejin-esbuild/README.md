# esbuild를 이용한 빌드 

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


다음을 실행하여 esbuild를 설치합니다.
```shell
npm run install -D esbuild 
```


esbuild로 빌드할 때는 cli를 사용하는 방법과 JavaScript를 이용하는 방법이 있습니다. cli를 사용할 때는 package.json의 scripts를 이용합니다. 

```json 
// package.json 
  "scripts": {
    "build":"esbuild ./src/index.ts --bundle --outdir=dist ",
  },
```
esbuild 다음에 엔트리 파일을 적어주고 다른 옵션을 적어줍니다.  npm을 사용하여 빌드합니다. 
```shell
npm run build
```

cli를 이용하는 방법보다는 build script를 이용하는 방법이 편리합니다. scripts 디렉토리 아래에 build.js 파일을 만듭니다. 다음과 같이 작성합니다. 

```jsx
// package.json에 "type":"module"로 설정되어야 함 
import * as esbuild from 'esbuild'

let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  bundle: true,
  outdir: 'dist',
})
console.log(result)
```
package.json에 다음과 같이 build script를 추가합니다. 
```json
  "scripts": {
    "build": "node ./scripts/build.js"
  },
```

다음을 실행하면 dist 디렉토리에 번들된 파일이 생성됩니다. 
```shell
yarn build
```




## 옵션들 

### Entry Points

이것은 각각 번들링 알고리즘에 대한 입력으로 사용되는 파일의 배열입니다. '진입점'이라고 하는 이유는 각 항목이 평가되는 초기 스크립트를 의미하며 이후 해당 항목이 나타내는 코드의 다른 모든 측면을 로드하기 때문입니다. 스크립트 태그가 있는 페이지의 많은 라이브러리를 로드하는 대신 import 문을 사용하여 진입점(또는 진입점으로 가져온 다른 파일)으로 가져옵니다.

간단한 앱은 하나의 진입점만 필요하지만 기본 스레드 및 작업자 스레드와 같이 논리적으로 독립적인 코드 그룹이 여러 개 있거나 상대적으로 관련이 없는 별도의 영역이 있는 앱(예: 랜딩 페이지, 편집기)이 있는 경우 추가 진입점이 유용할 수 있습니다. 페이지 및 설정 페이지. 별도의 진입점은 관심사를 분리하는 데 도움이 되며 브라우저에서 다운로드해야 하는 불필요한 코드의 양을 줄이는 데 도움이 됩니다. 해당하는 경우 코드 분할을 활성화하면 진입점이 이미 방문한 첫 번째 페이지와 이미 다운로드된 일부 코드를 공유하는 두 번째 페이지를 탐색할 때 다운로드 크기를 더욱 줄일 수 있습니다.

진입점을 지정하는 간단한 방법은 파일 경로 배열을 전달하는 것입니다.

```jsx
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/index.ts', './src/settings.ts'],
  bundle: true,
  outdir: 'build',
})

```
```shell
esbuild home.ts settings.ts --bundle --outdir=out
```

이렇게 하면 두 개의 진입점 index.ts 및 settings.ts에 해당하는 두 개의 출력 파일 build/home.js 및 build/settings.js가 생성됩니다.

또한 대체 진입점 구문을 사용하여 각 개별 진입점에 대한 완전한 사용자 지정 출력 경로를 지정할 수도 있습니다.
```jsx
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: [
    { out: 'out1', in: 'home.ts'},
    { out: 'out2', in: 'settings.ts'},
  ],
  bundle: true,
  write: true,
  outdir: 'out',
})
```
이렇게 하면 두 개의 진입점 home.ts 및 settings.ts에 해당하는 두 개의 출력 파일 out/out1.js 및 out/out2.js가 생성됩니다.





### Outdir 
이 옵션은 빌드 작업의 출력 디렉터리를 설정합니다. 예를 들어, 이 명령은 호출된 디렉토리를 생성합니다.

```shell
esbuild app.js --bundle --outdir=out
```
```jsx
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  outdir: 'build',
})
```
현재 실행 중인 esbuild의 파일만 출력 디렉토리에 포함하려면 esbuild를 실행하기 전에 직접 출력 디렉토리를 지워야 합니다.

빌드에 별도의 디렉터리에 여러 진입점이 포함된 경우 디렉터리 구조는 모든 입력 진입점 경로 중에서 가장 낮은 공통 조상 디렉터리에서 시작하여 출력 디렉터리로 복제됩니다. 예를 들어 두 개의 진입점 src/home/index.ts 및 src/about/index.ts가 있는 경우 출력 디렉터리에는 home/index.js 및 about/index.js가 포함됩니다. 이 동작을 사용자 정의하려면 outbase 디렉토리를 변경해야 합니다.


## Outbase 
여러 개의 엔트리 포인트가 있는 경우,  outbase 디렉토리에 상대적으로 output directory로 디렉토리 구조가 복제될 것입니다. outbase를 "./"으로 설정한 경우, output 디렉토리에 src/main/index.ts와 src/about/index.js를 포함할 것입니다. 

```jsx
let result = await esbuild.build({
  entryPoints: ['./src/main/index.ts', './src/about/index.ts'],
  platform: 'node',
  bundle: true,
  outdir: 'build',
  outbase: './',
})
console.log(result)
```


outbase를 src로 설정하는 경우 output 디렉토리에 main/index.js와 about/index.js가 포함됩니다. 

```jsx
let result = await esbuild.build({
  entryPoints: ['./src/main/index.ts', './src/about/index.ts'],
  platform: 'node',
  bundle: true,
  outdir: 'build',
  outbase: 'src',
})
console.log(result)
```


### Bundle

기본적으로 esbuild는 입력 파일을 묶지 않습니다. 다음과 같이 번들링을 명시적으로 활성화해야 합니다.

```jsx
let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,  // 활성화 
})
```
```shell
esbuild in.js --bundle
```

### Platform 
기본적으로 esbuild의 번들러는 브라우저용 코드를 생성하도록 구성되어 있습니다. 번들 코드를 대신 노드에서 실행하려는 경우 플랫폼을 노드로 설정해야 합니다.

```shell
esbuild app.js --bundle --platform=node
```
```jsx
let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node', // node로 설정 
  bundle: true,  
})
```
platform이 node로 설정되면
* bundling할 때 디폴트 format이 cjs로 설정됩니다. 
* fs와 같은 모든 내장 노드 모듈은 번들러가 번들을 시도할 때 오류가 발생하지 않도록 자동으로 외부로 표시됩니다.

** conditions 추가할 것 


### Format
생성된 JavaScript 파일의 출력 형식을 설정합니다. 현재 iife, cjs 및 esm의 세 가지 가능한 값을 구성할 수 있습니다. 출력 형식이 지정되지 않은 경우 esbuild는 번들링이 활성화된 경우(아래 설명 참조) 출력 형식을 선택하거나 번들링이 비활성화된 경우 형식 변환을 수행하지 않습니다.


```jsx
let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node', // node로 설정 
  bundle: true,  
  format: 'cjs', // cjs로 설정
})
```
### Package
번들에서 패키지의 모든 종속성을 제외하려면 이 설정을 사용하십시오. 이는 많은 npm 패키지가 번들링 중에 esbuild가 지원하지 않는 노드별 기능(예: __dirname, import.meta.url, fs.readFileSync 및 *.node 네이티브 바이너리 모듈)을 사용하기 때문에 노드에 대해 번들링할 때 유용합니다. 사용하면 다음과 같습니다.

```jsx
let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node', // node로 설정 
  bundle: true,  
  format: 'cjs', // cjs로 설정
  packages: 'external',
})
```

```shell
esbuild app.js --bundle --packages=external
```

### Out extension 
이 옵션을 사용하면 esbuild가 .js 또는 .css가 아닌 다른 파일로 생성하는 파일의 파일 확장자를 사용자 정의할 수 있습니다. 특히 .mjs 및 .cjs 파일 확장자는 노드에서 특별한 의미를 갖습니다(각각 ESM 및 CommonJS 형식의 파일을 나타냄). 이 옵션은 esbuild를 사용하여 여러 파일을 생성하고 outfile 옵션 대신 outdir 옵션을 사용해야 하는 경우에 유용합니다. 다음과 같이 사용할 수 있습니다.

```jsx
let result = await esbuild.build({
  entryPoints: ['./src/index.ts'],
  platform: 'node', // node로 설정 
  bundle: true,  
  format: 'cjs', // cjs로 설정
  packages: 'external',
  outExtension: { '.js': '.mjs' },
})
```
```shell
esbuild app.js --bundle --outdir=dist --out-extension:.js=.mjs
```

## CommonJS와 ESM 형식 같이 빌드하기 
CommonJS와 ESM 형식으로 빌드하려면 다음과 같이 설정합니다. 각각 format을 cjs와 esm으로 설정하고 outExtension을 설정합니다.

```jsx

// package.json에 "type":"module"로 설정되어야 함 
import * as esbuild from 'esbuild'

// 공통 옵션 
const commonOptions  = {
  // https://esbuild.github.io/api/
  entryPoints: ['./src/main/index.ts', './src/about/index.ts'],
  bundle: true,
  outdir: 'build',
  outbase: 'src',  
  // minify: true,
  packages: 'external',
}

// ESM 모듈로 빌드 
let result = await esbuild.build({
    ...commonOptions,
    format: 'esm',
    // js 파일로 생성 
    outExtension: { '.js': '.js' },
    // esbuild app.js --bundle --outfile=out.js
    // 출력파일 이름, entry point가 하나인 경우 사용
    // outfile : 'out.js'
})
console.log(result)

// CommonJS 모듈로 빌드 
let result2 = await esbuild.build({
  ...commonOptions,
  format: 'cjs',
  // js 파일로 생성 
  outExtension: { '.js': '.cjs' },
  // esbuild app.js --bundle --outfile=out.js
  // 출력파일 이름, entry point가 하나인 경우 사용
  // outfile : 'out.js'
})
console.log(result2)
```


## External 
나중에 정리할 것입니다. 


## Tsconfig 


일반적으로 빌드 API는 빌드 중에 tsconfig.json 파일을 자동으로 검색하고 해당 내용을 읽습니다. 그러나 대신 사용할 사용자 지정 tsconfig.json 파일을 구성할 수도 있습니다. 이는 서로 다른 설정으로 동일한 코드의 여러 빌드를 수행해야 하는 경우에 유용할 수 있습니다.

> esbuild의 tsconfig 옵션은 TypeScript 프로젝트의 설정 파일인 tsconfig.json을 지정하는 데 사용됩니다. 이 옵션을 사용하여 esbuild가 TypeScript 컴파일러와 유사한 방식으로 프로젝트를 빌드하고 설정을 적용할 수 있습니다.
일반적으로 tsconfig.json 파일은 TypeScript 컴파일러에 대한 설정을 포함하며, esbuild는 이 설정 파일을 읽어와서 동일한 방식으로 동작하도록 도와줍니다. tsconfig 옵션을 사용하여 tsconfig.json 파일을 지정하면, esbuild는 해당 파일에 정의된 설정을 사용하여 프로젝트를 빌드합니다.

```jsx
const commonOptions  = {
  // https://esbuild.github.io/api/
  entryPoints: ['./src/main/index.ts', './src/about/index.ts'],
  tsconfig: 'tsconfig.esm.json'
}
```
> 그러나 정확히 어떤 동작을 하는지, 어떤 영향을 받는지 파악하지 못했습니다. 

## .d.ts 파일 생성 
esbuild는 타입스크립트의 타입 체킹을 빌드할 때 해주지는 않습니다. 단순히 코드를 읽어서 바꿔주기만 합니다. 또 .d.ts 파일을 만들어주지도 않습니다. 공식 문서에선 esbuild가 번들링에만 치중하기 때문에, 앞으로도 지원할 가능성은 매우 낮다고 얘기합니다.

package.json의 build 스크립트를 다음과 같이 작성합니다. .d.ts 파일을 만들기 위해서 tsc를 사용합니다. 

```json
  "scripts": {
    "build": "tsc -b ./tsconfig.esm.esbuild.json &&  node ./scripts/build.js",
  },
```

tsconfig.json을 다음과 같이 작성합니다. 

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
    "allowJs": true,

    // override될 속성들 
    "outDir": "build2",
    "emitDeclarationOnly": true,
    "declaration": true,  
    // "allowImportingTsExtensions": true,

  },
  "include": [
    "src/**/*"
  ],  
}
```
tsconfig.esm.esbuild.json을 다음과 같이 작성합니다. 

```json
{
  "extends": "./tsconfig.json", 
  "compilerOptions": {
    "module": "ESNext",                              
    "outDir": "build/@types",
    "emitDeclarationOnly": true,
    "declaration": true,    
  }
},  
```
















