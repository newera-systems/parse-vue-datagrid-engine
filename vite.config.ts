import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {find: '@', replacement: resolve('./src')},
      {find: '@rule', replacement: resolve('./src/rule')},
      {find: '@components', replacement: resolve('./src/components')},
    ],
  },
  plugins: [vue({})],
  build: {
    minify: true,
    outDir: 'dist',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: ['src'],
      name: 'DataGridBvue',
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
  },
})
