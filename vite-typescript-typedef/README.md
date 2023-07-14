# TypeScript Module 

TypeScript는 JavaScript의 상위 집합 언어로서, 정적 타입 시스템과 ECMAScript 표준에 기반한 기능을 추가한 프로그래밍 언어입니다. 그렇다고 TypeScript에서 JavaScript를 사용하지 못하는 것은 아닙니다.  tsconfig.json에 allowJs 옵션을 true로 설정하면 JavaScript 파일을 TypeScript 파일처럼 사용할 수 있습니다.

```json
// tsconfig.json 
{
  "compilerOptions": {
    "allowJs": true,
    "strict": true,
  },
}
```

그런데 JavaScript는 Type이 정의되어 있지 않기 때문에 파라미터 또는 반환값을 모두 any로 처리합니다. 이렇게 되면 TypeScript의 장점을 활용할 수 없게 됩니다. 이를 해결하기 위해서는 JavaScript 파일에 대한 Type Definition 파일을 정의해야 합니다.

타입은 .d.ts 파일에 정의되어 있습니다. TypeScript는 이 파일을 참조하여 JavaScript 파일의 Type을 정의합니다.

간단한 프로젝트를 통해서 Declaration File을 작성하고 사용하는 방법을 알아보겠습니다.

**프로젝트 구조** 
```shell
📂root
├─📂ejin-node-jslib  # JavaScript로 작성된 패키지, .d.ts 파일 정의되어 있음 
├─📂ejin-node-nodec  # JavaScript로 작성된 패키지, .d.ts 파일 정의하지 않음 
├─📂ejin-package     # ejin-node-jslib, ejin-node-nodec 패키지를 사용하는 패키지
```




