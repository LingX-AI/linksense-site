import assert from 'node:assert/strict'
import { globSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '../..')
const read = (path: string) => readFileSync(join(root, path), 'utf8')
const documents = new Map(
  [...globSync('content/docs/**/*.mdx', { cwd: root })].map((path) => [
    path,
    read(path),
  ]),
)

test('guide menus contain topic pages instead of nested article folders', () => {
  for (const locale of ['zh', 'en']) {
    for (const guide of ['user-guide', 'admin-guide']) {
      const directory = `content/docs/${locale}/${guide}`
      const { pages } = JSON.parse(read(`${directory}/meta.json`)) as {
        pages: string[]
      }
      for (const page of pages) {
        assert(
          documents.has(`${directory}/${page}.mdx`),
          `Menu must link directly to a topic page: ${directory}/${page}`,
        )
      }
    }
  }
})

test('both languages retain the same sections in every consolidated guide', () => {
  const sectionIds = (source: string) =>
    [...source.matchAll(/^## .+ \[#([^\]]+)]$/gm)].map(([, id]) => id)

  for (const [path, source] of documents) {
    if (!path.startsWith('content/docs/zh/') || !source.includes('tocDepth: 2'))
      continue
    const englishPath = path.replace('/zh/', '/en/')
    const english = documents.get(englishPath)
    assert(english, `Missing English guide: ${englishPath}`)
    assert.deepEqual(sectionIds(source), sectionIds(english), path)
    const anchors = [...source.matchAll(/\[#([^\]]+)]/g)].map(([, id]) => id)
    assert.equal(
      new Set(anchors).size,
      anchors.length,
      `Duplicate anchor: ${path}`,
    )
  }
})

test('cross-references resolve to existing pages and consolidated sections', () => {
  for (const [path, source] of documents) {
    for (const [, href] of source.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (!href.startsWith('.') && !href.startsWith('#')) continue
      const [pathname, hash] = href.split('#')
      const targetPath = pathname ? join(dirname(path), pathname) : path
      const target = documents.get(targetPath)
      assert(target, `Broken document link in ${path}: ${href}`)
      if (hash && target.includes('tocDepth: 2'))
        assert(
          target.includes(`[#${decodeURIComponent(hash)}]`),
          `Missing consolidated section in ${path}: ${href}`,
        )
    }
  }
})

test('retired article URLs redirect directly to preserved sections', () => {
  const redirects = read('public/_redirects')
    .split('\n')
    .filter((line) => line.startsWith('/doc/') && !line.includes('*'))
  const sources = new Set<string>()

  for (const line of redirects) {
    const [from, to, status] = line.split(/\s+/)
    assert(!sources.has(from), `Duplicate redirect: ${from}`)
    sources.add(from)
    assert.equal(status, '301')
    const target = new URL(to, 'https://linksense.guygubaby.top')
    const locale = target.pathname.startsWith('/doc/zh-CN/') ? 'zh' : 'en'
    const path = target.pathname.replace(/^\/doc\/(?:zh-CN\/)?/, '')
    const file = join('content/docs', locale, path.replace(/\/$/, ''))
    const source =
      documents.get(`${file}.mdx`) ?? documents.get(`${file}/index.mdx`)
    assert(source, `Missing redirect target: ${line}`)
    if (target.hash)
      assert(
        source.includes(`[#${decodeURIComponent(target.hash.slice(1))}]`),
        `Redirect must land on a preserved section: ${line}`,
      )
  }
})
