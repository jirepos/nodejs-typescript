// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/guide/build.html#library-mode
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
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ejin-common',
      fileName: 'ejin-common',
    },
  },
  plugins: [dts(), tsconfigPaths()],
})