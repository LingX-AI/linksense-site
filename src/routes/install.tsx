import { createFileRoute } from '@tanstack/react-router'
import { InstallPage } from '@/components/install'
import { installSearchSchema } from '@/lib/product'
export const Route = createFileRoute('/install')({
  component: InstallPage,
  validateSearch: (search) => installSearchSchema.parse(search),
})
