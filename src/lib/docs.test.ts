import assert from 'node:assert/strict'
import { globSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import test from 'node:test'
import { loader, type VirtualFile } from 'fumadocs-core/source'
import { docsI18n, docsPath } from './i18n'

const root = resolve(import.meta.dirname, '../..')
const read = (path: string) => readFileSync(join(root, path), 'utf8')
const documents = new Map(
  [...globSync('content/docs/**/*.mdx', { cwd: root })].map((path) => [
    path,
    read(path),
  ]),
)

test('the sidebar keeps four primary menus with at most two levels', () => {
  const files: VirtualFile[] = [
    ...[...documents].map(([path, source]) => ({
      type: 'page' as const,
      path: path.replace('content/docs/', ''),
      data: {
        title: /^title: (.+)$/m.exec(source)?.[1] ?? path,
        icon: /^icon: (.+)$/m.exec(source)?.[1],
      },
    })),
    ...[...globSync('content/docs/**/meta.json', { cwd: root })].map(
      (path) => ({
        type: 'meta' as const,
        path: path.replace('content/docs/', ''),
        data: JSON.parse(read(path)),
      }),
    ),
  ]
  const source = loader({
    baseUrl: '/doc',
    i18n: docsI18n,
    url: (slugs, lang) => docsPath(lang ?? 'en', `${slugs.join('/')}/`),
    source: { files },
  })
  for (const locale of ['zh', 'en']) {
    const tree = source.getPageTree(locale)
    assert.equal(tree.children.length, 4)
    assert.deepEqual(
      tree.children.map((item) => item.name),
      ['deploy', 'user-guide', 'admin-guide', 'developer-guide'].map(
        (directory) =>
          JSON.parse(read(`content/docs/${locale}/${directory}/meta.json`))
            .title,
      ),
    )
    for (const item of tree.children) {
      assert.equal(item.type, 'folder')
      if (item.type !== 'folder') continue
      assert(!item.root, 'Nested roots must not replace the shared menu')
      assert(
        item.children.every((child) => child.type === 'page'),
        'The sidebar must not nest more than two levels',
      )
    }
    assert.equal(tree.children[0]?.type, 'folder')
    if (tree.children[0]?.type === 'folder')
      assert(
        tree.children[0].children.some(
          (item) =>
            item.type === 'page' && item.url === docsPath(locale, 'deploy'),
        ),
        'Deployment overview must remain reachable from the first menu',
      )
  }
})

test('the documentation home routes by task without duplicating the runbook', () => {
  for (const locale of ['zh', 'en']) {
    const source = read(`content/docs/${locale}/index.mdx`)
    assert(source.split('\n').length < 100, `${locale}: docs home is too long`)
    assert.equal((source.match(/<Card\b/g) ?? []).length, 4)
    assert.doesNotMatch(source, /```|docker compose|install-core\.sh/)
  }
})

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
    if (!path.startsWith('content/docs/zh/') || !source.includes('[#')) continue
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
      if (hash && target.includes('[#'))
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
