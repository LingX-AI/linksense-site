import { createSearch } from '@/lib/search-server'

export const dynamic = 'force-static'
export const GET = createSearch(['en', 'zh']).staticGET
