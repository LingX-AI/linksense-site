import { fileURLToPath, URL } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Connect } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

function docsPages(directory: string): Connect.NextHandleFunction {
  return (request, response, next) => {
    const url = new URL(request.url ?? '/', 'http://localhost')
    if (!/^\/help(?:\/|$)/.test(url.pathname)) return next()
    if (
      !url.pathname.endsWith('/') &&
      !url.pathname.split('/').pop()?.includes('.')
    ) {
      response.writeHead(308, { Location: `${url.pathname}/${url.search}` })
      return response.end()
    }
    if (!url.pathname.endsWith('/')) return next()
    const document = `${url.pathname}index.html`
    if (existsSync(join(directory, document))) {
      request.url = `${document}${url.search}`
      return next()
    }
    const notFound = join(directory, 'help/404.html')
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(
      existsSync(notFound)
        ? readFileSync(notFound)
        : 'Documentation is not built. Run pnpm docs:build.',
    )
  }
}

export default defineConfig({
  plugins: [
    {
      name: 'documentation-pages',
      configureServer(server) {
        server.middlewares.use(docsPages('public'))
      },
      configurePreviewServer(server) {
        server.middlewares.use(docsPages('dist'))
      },
    },
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
