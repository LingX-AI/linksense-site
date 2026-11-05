import assert from 'node:assert/strict'
import { existsSync, globSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { InputSettingsSchema, resolveAndParseConfig } from '@cloudflare/config'
import {
  cleanBuildOutputDir,
  readBuildOutput,
  writeAssets,
  writeRootConfig,
  writeWorkerConfig,
} from '@cloudflare/build-output-utils'
import config from '../cloudflare.config'

const root = process.cwd()
const context = { isPreview: false, mode: 'production' }
const parsed = await resolveAndParseConfig(config, context)
if (!parsed.success) throw parsed.error
const { worker } = parsed.data
const settings = InputSettingsSchema.parse(parsed.data)
assert(worker, 'The existing Cloudflare Worker must be configured')
for (const page of [
  'index.html',
  'install/index.html',
  'doc/index.html',
  'doc/zh-CN/index.html',
  'doc/en-US/index.html',
  'api/search',
]) {
  assert(existsSync(join(root, 'out', page)), `Missing static export: ${page}`)
}
const documentation = new Map(
  [...globSync('doc/**/index.html', { cwd: resolve(root, 'out') })].map(
    (page) => [
      `/${page.replace(/index\.html$/, '')}`,
      readFileSync(join(root, 'out', page), 'utf8'),
    ],
  ),
)
for (const [page, html] of documentation) {
  assert(
    !/href="\.{1,2}\/[^"]*\.mdx?(?:[?#][^"]*)?"/.test(html),
    `Unresolved Markdown link in ${page}`,
  )
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(href, `https://linksense.guygubaby.top${page}`)
    if (
      url.origin !== 'https://linksense.guygubaby.top' ||
      !url.pathname.startsWith('/doc/')
    )
      continue
    const pathname = decodeURIComponent(url.pathname).replace(/\/?$/, '/')
    const target = documentation.get(pathname)
    assert(target, `Missing documentation destination in ${page}: ${href}`)
    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1))
      assert(
        target.includes(`id="${id}"`),
        `Missing documentation anchor in ${page}: ${href}`,
      )
    }
  }
}
for (const line of readFileSync(join(root, 'public/_redirects'), 'utf8').split(
  '\n',
)) {
  if (!line.startsWith('/doc/') || line.includes('*')) continue
  const [, destination] = line.split(/\s+/)
  const url = new URL(destination, 'https://linksense.guygubaby.top')
  const html = documentation.get(url.pathname)
  assert(html, `Missing legacy documentation destination: ${line}`)
  if (url.hash)
    assert(
      html.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
      `Missing legacy documentation anchor: ${line}`,
    )
}

await cleanBuildOutputDir(root)
await writeAssets({ root, sourceDirectory: resolve(root, 'out') })
await writeWorkerConfig({ root, config: worker })
await writeRootConfig(root, settings, context)

const output = (await readBuildOutput(root)).workers.default
assert(output.assetsDir, 'The deployable Worker must contain static assets')
assert.equal(output.config.assets?.notFoundHandling, '404-page')
assert.equal(
  readFileSync(join(output.assetsDir, 'index.html'), 'utf8'),
  readFileSync(join(root, 'out/index.html'), 'utf8'),
)
assert(
  !existsSync(join(output.assetsDir, 'help')),
  'Legacy documentation must not be deployed',
)
console.log('Prepared and verified the current Next.js export for Cloudflare.')
