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
for (const page of globSync('doc/**/index.html', {
  cwd: resolve(root, 'out'),
})) {
  assert(
    !/href="\.{1,2}\/[^"]*\.mdx?(?:[?#][^"]*)?"/.test(
      readFileSync(join(root, 'out', page), 'utf8'),
    ),
    `Unresolved Markdown link in ${page}`,
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
