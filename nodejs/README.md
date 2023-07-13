# Scoped Package

Node.js에서 @으로 시작하는 모듈은 주로 스코프(scope)를 가진 패키지를 나타냅니다. 이러한 패키지는 일반적으로 프라이빗(private) 패키지로 간주되며, 특정한 그룹이나 조직 내에서 사용되는 내부적인 모듈을 의미합니다. 

일반적인 npm 패키지는 패키지 이름이 패키지의 고유 식별자로 사용되지만, 스코프를 가진 패키지는 그룹 또는 조직의 이름을 패키지 이름 앞에 붙여 구별합니다. 스코프는 @ 기호 다음에 오는 이름으로 표시되며, 패키지 이름과 스코프는 /로 구분됩니다. 예를 들어, @organization/package-name와 같은 패키지 이름은 package-name이라는 이름을 가진 organization 스코프의 패키지를 나타냅니다. 

이러한 패키지는 일반적으로 해당 조직 내에서만 사용되거나 공유되며, 고유한 네임스페이스를 제공하여 패키지 이름 충돌을 방지합니다. 스코프를 가진 패키지를 설치하거나 사용할 때에는 일반적인 패키지와 동일한 방식으로 진행하되, 패키지 이름 앞에 스코프를 포함하여 지정해야 합니다. 예를 들어, 다음과 같이 설치할 수 있습니다:

```shell
npm install @organization/package-name
```

Node.js에서 스코프를 가진 패키지는 일반적으로 프라이빗하게 사용되는 패키지를 의미하지만, 모든 스코프 패키지가 프라이빗인 것은 아닙니다. 몇몇 공개적으로 사용 가능한 패키지도 스코프를 가질 수 있습니다. node module을 설치하고 node_modules 폴더를 보게 되면 @가 붙은 패키지를 볼 수 있을 것이다. 이러한 패키지가 모두 범위가 있는 패키지이며, 아래와 같이 @로 표현된다.

범위가 있는 패키지는 @가 붙고 범위 명칭이 붙기 때문에 패키지 이름에 있어서 주의만 하면 되고 일반 패키지는 node_modules/packageName 설치가 된다면 범위가 있는 패키지는 node_modules/@scopeName/packageName에 설치가 된다.

NPM Scope의 사용하는 방법까지는 일반 패키지와 비슷하지만, 배포부터는 조금 까다롭고 다르다. NPM Scope 패키지는 일반 패키지와 동일하게 배포할 수는 없다. 배포를 위해서는 두 가지의 NPM Registry 형태로만 가능하다.

다음 package.json은 scoped package를 정의합니다. 

```json
// package.json 
{
  "name": "@ejin/hello",
  "version": "1.0.0",
  "description": "for testing",
  "main": "src/index.js",
  "author": "ejin@gmail.com",
  "license": "MIT",
  "type": "module"
}
```

설치하면 node_moduels 다음과 같이 설치됩니다. 

```shell
📁prject
  📁node_modules
    📁@ejin 
       📁dist
         📄index.js
       📄package.json 
```

