import { createContext } from 'react'

export const HeroCtaContext = createContext<{
  visible: boolean
  setVisible: (visible: boolean) => void
}>({
  visible: false,
  setVisible: () => {},
})
