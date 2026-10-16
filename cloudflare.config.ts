import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'linksense-site',
    compatibilityDate: '2026-10-16',
    assets: {
      notFoundHandling: 'single-page-application',
    },
    domains: ['linksense.guygubaby.top'],
    observability: {
      enabled: true,
      traces: { enabled: true },
      redactQueryString: true,
    },
  },
})
