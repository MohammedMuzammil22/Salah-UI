import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/Salah-UI',
    server: {
      proxy: {
        '/api-hijri': {
          target: 'https://ummahapi.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-hijri/, ''),
        },
      },
    },
  }
})
