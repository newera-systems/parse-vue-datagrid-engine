import { BuildOptions, defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue2';

// used to build the library
const libraryModeConfigBuild:BuildOptions = {
  outDir: 'dist',
  emptyOutDir: true,
  lib: {
    // Could also be a dictionary or array of multiple entry points
    entry: resolve(__dirname, 'src/index.ts'),
    name: 'DataGridBVue',
    formats: ['es', 'umd'],
    fileName: 'datagrid-bvue',
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: 'Vue',
      },
      exports: 'named',
    },
  },
}

// used to build the demo
const devModeConfigBuild:BuildOptions = {
  outDir: 'demo',
  emptyOutDir: true
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    plugins: [vue({})],
    build: mode === 'development' ? devModeConfigBuild : libraryModeConfigBuild,
    resolve: {
      alias: [
        {find: '@', replacement: resolve('./src')},
        {find: '@rule', replacement: resolve('./src/rule')},
        {find: '@components', replacement: resolve('./src/components')},
      ],
    },
    base: mode === 'development' ? '/parse-vue-datagrid-engine/' : './',
  }
});


