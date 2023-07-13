#!/usr/bin/env node
/*eslint no-console:0*/

//"esbuild":"esbuild ./src/index.ts --bundle 
// --platform=node --packages=external 
// --tsconfig=tsconfig.cjs.json --outdir=dist ",
// require('esbuild')
//   .build({
//     entryPoints: ['src/index.ts'],
//     outdir: 'build',
//     bundle: true,
//     platform: 'node',
//     packages: 'external'
//   })
//   .catch(() => process.exit(1))


// package.json에 "type":"module"로 설정되어야 함 
import esbuild from 'esbuild';

// 공통 옵션 
const commonOptions  = {
  // https://esbuild.github.io/api/
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  // minify: true,
  outdir: 'build'
}


// ESM 모듈로 빌드 
esbuild
  .build({
    ...commonOptions,
    format: 'esm',
    // js 파일로 생성 
    outExtension: { '.js': '.js' }
  })
  .catch(() => process.exit(1))


// CJS 모듈로 빌드 
esbuild
.build({
  ...commonOptions,
  format: 'cjs',
  // .cjs 파일로 생성 
  outExtension: { '.js': '.cjs' }
})
.catch(() => process.exit(1))
