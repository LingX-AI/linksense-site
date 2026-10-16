import { createRootRoute } from '@tanstack/react-router'
import { SiteShell, RouteFallback } from '@/components/shell'
export const Route = createRootRoute({
  component: SiteShell,
  notFoundComponent: () => <RouteFallback />,
  errorComponent: () => <RouteFallback error />,
})
