# Vite로 TypeScript Package 생성 

## 프로젝트 구조 
```shell
📂root
├─📂ejin-app
│ ├─📂bin  # Node.js의 bin 디렉토리 
│ ├─📂build # 빌드 디렉토리 
│ ├─📂src   # 소스 
│ ├─📄package.json
│ ├─📄tsconfig.json
│ └─📄vite.config.js
├─📂ejin-test
│ ├─📂src  
│ └─📄package.json
```

## 로컬 테스트 
ejin-directory로 들어가서 다음을 실행 
```shell
cd ./ejin-app
npm run test
or 
yarn test
```
## bin 파일 실행 
ejin-directory로 들어가서 다음을 실행 
```shell
cd ./ejin-app
./node_modules/.bin/ejin 
```






