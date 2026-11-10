import assert from 'node:assert/strict'
import test from 'node:test'
import { create, insert, search } from '@orama/orama'
import { searchOptions } from './search-i18n'

test('documentation search finds text in each language', async () => {
  for (const [locale, text, term] of [
    ['en', 'Configure a model', 'model'],
    ['zh', '配置知识库', '知识库'],
    ['es', 'Configurar el modelo', 'modelo'],
    ['pt', 'Configurar o modelo', 'modelo'],
    ['fr', 'Configurer le modèle', 'modèle'],
    ['ja', 'モデルを設定する', 'モデル'],
  ]) {
    const database = await create({
      schema: { text: 'string' },
      ...searchOptions(locale),
    })
    await insert(database, { text })
    const result = await search(database, { term })
    assert.ok(result.count > 0, `${locale}: no result for ${term}`)
  }
})
