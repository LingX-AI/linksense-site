import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'linksense-site',
    compatibilityDate: '2026-10-20',
    assets: {
      htmlHandling: 'auto-trailing-slash',
      notFoundHandling: '404-page',
    },
    domains: ['linksense.guygubaby.top'],
    observability: {
      enabled: true,
      traces: { enabled: true },
      redactQueryString: true,
    },
  },
})
