import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 添加msw配置
  // resolve: {
  //   alias: {
  //     'msw': 'node_modules/msw/lib/index.js'
  //   }
  // }
})
