// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from "vite-tsconfig-paths";
// Vite는 기본적으로 클라이언트 측 개발을 위한 빠른 빌드 도구이며, Node.js의 내장 모듈을 포함하는 것은 지원하지 않습니다. 
// Vite는 ES 모듈을 사용하는 클라이언트 측 코드를 처리하는 데 특화되어 있으며, Node.js의 내장 모듈은 클라이언트 측 코드에서 
// 사용할 수 없기 때문에 Vite에서 직접 지원되지 않습니다.

// 그러나 Vite는 클라이언트 측 코드와 분리된 서버 측 코드를 실행하는 데 사용할 수 있습니다. 
// 서버 측 코드에서는 Node.js의 내장 모듈을 사용할 수 있습니다. Vite는 서버 모드에서 사용되는 경우 
// Node.js를 백엔드로 사용할 수 있으며, 해당 코드에서 Node.js의 내장 모듈을 자유롭게 활용할 수 있습니다.
// 따라서 Vite를 사용할 때 Node.js의 내장 모듈을 사용하려면 클라이언트 측 코드와 서버 측 코드를 분리하여 처리해야 합니다. 
// 클라이언트 측 코드는 Vite를 사용하여 빌드하고 실행하고, 서버 측 코드는 Node.js로 실행하며 Node.js의 내장 모듈을 사용할 수 있습니다.
// https://vitejs.dev/guide/build.html#library-mode


// 아래는 사용하기 애매함 
// https://stackoverflow.com/questions/69523560/using-vite-for-backend
// vite-plugin-node를 사용해 볼 수 있습니다. 이 vite 플러그인은 koa를 포함하여 기본적으로 여러 nodejs 프레임워크를 지원합니다. 
// 나는 나를 위해 잘 작동하는 TypeScript로 간단한 익스프레스 앱을 만들었습니다. 한 가지 단점은 플러그인이 상당히 새롭고 
// 아직 초기 단계에 있으므로 심각한 프로덕션 앱에서 사용하고 싶지 않을 수 있다는 것입니다.
// https://www.npmjs.com/package/vite-plugin-node


// vite v4.3.9 building for production...
// transforming (1) src\index.ts[plugin:vite:resolve] Module "path" has been externalized for browser compatibility, imported by "G:/dev/github/jirepos/nodejs-typescript/vite-ts-basic/ejin-app/src/common/node-path.ts". See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.
// ✓ 4 modules transformed.
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