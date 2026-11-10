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
  for (const locale of docsI18n.languages) {
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
  for (const locale of docsI18n.languages) {
    const source = read(`content/docs/${locale}/index.mdx`)
    assert(source.split('\n').length < 100, `${locale}: docs home is too long`)
    assert.equal((source.match(/<Card\b/g) ?? []).length, 4)
    assert.doesNotMatch(source, /```|docker compose|install-core\.sh/)
  }
})

test('guide menus contain topic pages instead of nested article folders', () => {
  for (const locale of docsI18n.languages) {
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

test('every language preserves documentation pages, anchors, links, and code blocks', () => {
  const english = [...documents].filter(([path]) =>
    path.startsWith('content/docs/en/'),
  )
  const matches = (text: string, pattern: RegExp) =>
    [...text.matchAll(pattern)].map((match) => match[1]).sort()
  const codeBlocks = (text: string) =>
    [...text.matchAll(/(^```([^\n]*)\n[\s\S]*?^```)/gm)]
      .filter((match) => match[2].trim() !== 'text')
      .map((match) => match[1])
      .sort()
  for (const locale of docsI18n.languages.filter((lang) => lang !== 'en')) {
    const localized = [...documents.keys()].filter((path) =>
      path.startsWith(`content/docs/${locale}/`),
    )
    assert.equal(localized.length, english.length, `${locale}: page count`)
    for (const [path, source] of english) {
      const localizedPath = path.replace('/en/', `/${locale}/`)
      const translated = documents.get(localizedPath)
      assert(translated, `Missing translated page: ${localizedPath}`)
      const anchors = matches(translated, /\[#([^\]]+)]/g)
      assert.equal(new Set(anchors).size, anchors.length, localizedPath)
      if (locale === 'zh') {
        assert.deepEqual(
          matches(translated, /^## .+ \[#([^\]]+)]$/gm),
          matches(source, /^## .+ \[#([^\]]+)]$/gm),
          localizedPath,
        )
        continue
      }
      for (const anchor of matches(source, /\[#([^\]]+)]/g))
        assert(anchors.includes(anchor), `${localizedPath}: missing ${anchor}`)
      assert.deepEqual(
        matches(translated, /\b(v\d+(?:\.\d+)+\+?)/g),
        matches(source, /\b(v\d+(?:\.\d+)+\+?)/g),
        `${localizedPath}: version numbers changed`,
      )
      const headings =
        translated
          .replace(/^```[^\n]*\n[\s\S]*?^```/gm, '')
          .match(/^#{2,6} .+$/gm) ?? []
      assert(
        headings.every((heading) => /\s\[#[-\w.]+]$/.test(heading)),
        `${localizedPath}: a translated heading has no stable anchor`,
      )
      assert.deepEqual(
        matches(translated, /\]\(([^)\s]+)\)/g),
        matches(source, /\]\(([^)\s]+)\)/g),
        localizedPath,
      )
      assert.deepEqual(
        codeBlocks(translated),
        codeBlocks(source),
        localizedPath,
      )
      for (const token of [
        'linksense:ready',
        'postMessage',
        'external_subject',
        'external_tenant',
      ])
        if (source.includes(token))
          assert(
            translated.includes(token),
            `${localizedPath}: missing ${token}`,
          )
    }
  }
})

test('translated deployment requirements keep the release and memory together', () => {
  for (const locale of ['es', 'pt', 'fr', 'ja']) {
    const overview = read(`content/docs/${locale}/deploy/index.mdx`)
    const full = overview.match(/^\| Full .*$/m)?.[0] ?? ''
    assert.match(full, /v0\.3\.13/)
    assert.match(full, /10\s*(?:GiB|Gio)/)

    const operations = read(`content/docs/${locale}/deploy/operations.mdx`)
    const prerequisites =
      operations.split('\n').find((line) => line.includes('v1.45+')) ?? ''
    assert(prerequisites.includes('v2.24.4+'))
    assert(prerequisites.includes('`docker version`'))
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
    const target = new URL(to, 'https://linksense.org')
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
