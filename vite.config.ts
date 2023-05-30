// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
    terserOptions: {
      // minify 为terser生效 若minify为esbuild 则需要走esbuild的配置
      compress: {
        // drop_console: mode === 'prod',
        drop_console: true,
        // drop_debugger: mode === 'prod'
        drop_debugger: true
      }
    },
    // esbuild: {
    //   pure: ['console.log']
    // },
    rollupOptions: {
      // rollup 打包配置
      output: {
        // 静态资源打包区分文件夹
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          // 静态资源分拆打包
          // 将src的文件打包成一个vendor。js
          // if (id.includes('src')) {
          //   return 'page'
          // }
          // return ''
          // node_modules的包逐个打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
