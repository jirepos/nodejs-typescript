#!/usr/bin/env node
/*eslint no-console:0*/


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
  external: ['moment'],
  // tsconfig: 'tsconfig.json'
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

