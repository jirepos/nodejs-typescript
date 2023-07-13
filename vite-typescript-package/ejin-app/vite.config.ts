// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  // resolve: {
  //   alias: [
  //     { find: "@", replacement: resolve(__dirname, 'src')},
  //   ]
  // }, 
  build: {
    outDir: './build',
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // output: {
      //   dir: 'dist2',
      // }
    },
    // 라이브러리 빌드 
    lib: {
      // 엔트리 파일 
      entry: resolve(__dirname, 'src/index.ts'),
      // name은 노출된 전역 변수이며 formats가 'umd' 또는 'iife' 일 때 필요합니다.
      name: 'ejinLib',
      // ejin-app.js, ejin-app.umd.cjs 와 같이 파일명이 생성 
      // 적절한 확장자가 추가됩니다.
      // package.json에 "type": "module"이 명시되어 있지 않으면 Vite는 Node.js 호환성을 위해 
      // 다른 파일 확장자를 생성합니다. 즉, .js는 .mjs가 되고, .cjs는 .js가 됩니다.
      // fileName은 패키지 파일 출력의 이름
      // 기본값은 package.json 파일의 name 옵션입니다
      fileName: 'ejin-app',
      formats: ['es', 'umd'],  // ('es' | 'cjs' | 'umd' | 'iife')
    },
  },
  plugins: [dts(), tsconfigPaths()],
})