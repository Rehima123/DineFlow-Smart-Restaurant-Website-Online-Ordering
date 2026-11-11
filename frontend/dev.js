// Dev server helper that works around paths with special characters
import { createServer } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const server = await createServer({
  root: __dirname,
  configFile: resolve(__dirname, 'vite.config.js'),
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})

await server.listen()
console.log(`\n  🚀 DineFlow dev server running at http://localhost:5173\n`)
