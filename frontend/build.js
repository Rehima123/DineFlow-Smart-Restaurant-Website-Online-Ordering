// Build helper that works around paths with special characters
import { build } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

await build({
  root: __dirname,
  configFile: resolve(__dirname, 'vite.config.js'),
})
