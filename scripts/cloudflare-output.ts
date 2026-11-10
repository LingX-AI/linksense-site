import assert from 'node:assert/strict'
import { existsSync, globSync, readFileSync, statSync } from 'node:fs'
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
import { homeLocales } from '../src/lib/i18n'
import { languageNames } from '../src/content/messages'

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
  ...Object.values(homeLocales)
    .filter((locale) => locale !== 'en-US' && locale !== 'zh-CN')
    .map((locale) => `doc/${locale}/index.html`),
  'api/search',
  ...Object.keys(homeLocales).map((locale) => `api/search-index/${locale}`),
  'llms.txt',
]) {
  assert(existsSync(join(root, 'out', page)), `Missing static export: ${page}`)
}
for (const page of globSync('**/*', { cwd: join(root, 'out') })) {
  const size = statSync(join(root, 'out', page))
  if (size.isFile())
    assert(
      size.size <= 25 * 1024 * 1024,
      `Cloudflare static asset exceeds 25 MiB: ${page} (${size.size} bytes)`,
    )
}
for (const locale of Object.keys(homeLocales)) {
  const index = JSON.parse(
    readFileSync(join(root, 'out/api/search-index', locale), 'utf8'),
  )
  assert.equal(index.type, 'i18n')
  assert.deepEqual(Object.keys(index.data), [locale])
}
const legacySearch = JSON.parse(
  readFileSync(join(root, 'out/api/search'), 'utf8'),
)
assert.equal(legacySearch.type, 'i18n')
assert.deepEqual(Object.keys(legacySearch.data).sort(), ['en', 'zh'])
const llmsIndex = readFileSync(join(root, 'out/llms.txt'), 'utf8')
assert(
  llmsIndex.startsWith('# LinkSense\n'),
  'Missing llms.txt project heading',
)
for (const [locale, code] of Object.entries(homeLocales)) {
  assert(
    llmsIndex.includes(`## ${languageNames[code]}\n`),
    `Missing ${locale} llms.txt index`,
  )
  assert(
    llmsIndex.includes(`/markdown/${locale}/index.txt`),
    `Missing deployment entry in the ${locale} LLM index`,
  )
}
for (const [, href] of llmsIndex.matchAll(/^- \[[^\]]+]\(([^)]+)\)/gm)) {
  const url = new URL(href)
  assert(
    url.pathname.startsWith('/markdown/'),
    `The LLM index must link to plain Markdown: ${href}`,
  )
  assert(
    existsSync(join(root, 'out', url.pathname)),
    `Missing LLM-readable document: ${href}`,
  )
}
for (const page of ['index.html', 'doc/index.html', 'doc/zh-CN/index.html']) {
  const html = readFileSync(join(root, 'out', page), 'utf8')
  assert(
    /<link[^>]*rel="describedby"[^>]*href="\/llms\.txt"/.test(html),
    `Missing LLM index discovery link: ${page}`,
  )
  assert(
    /<a[^>]*href="\/llms\.txt"[^>]*>llms\.txt<\/a>/.test(html),
    `Missing visible llms.txt footer link: ${page}`,
  )
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
  const tocStart = html.indexOf('id="nd-toc"')
  if (tocStart !== -1) {
    const article = html.slice(html.indexOf('<article'), tocStart)
    const toc = html.slice(tocStart, html.indexOf('<footer', tocStart))
    const links = new Set(
      [...toc.matchAll(/href="#([^"]+)"/g)].map(([, id]) =>
        decodeURIComponent(id),
      ),
    )
    for (const [, , id] of article.matchAll(
      /<h([2-6])\b[^>]*\bid="([^"]+)"/g,
    )) {
      assert(
        links.has(id),
        `Heading missing from page contents in ${page}: ${id}`,
      )
    }
  }
  assert(
    !/href="\.{1,2}\/[^"]*\.mdx?(?:[?#][^"]*)?"/.test(html),
    `Unresolved Markdown link in ${page}`,
  )
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const url = new URL(href, `https://linksense.org${page}`)
    if (
      url.origin !== 'https://linksense.org' ||
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
  const url = new URL(destination, 'https://linksense.org')
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
