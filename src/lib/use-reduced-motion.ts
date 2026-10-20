import { useSyncExternalStore } from 'react'

const query = '(prefers-reduced-motion: reduce)'
const snapshot = () => window.matchMedia(query).matches
const serverSnapshot = () => false

function subscribe(update: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', update)
  return () => media.removeEventListener('change', update)
}

// The installed Motion hook reads the preference once; subscribe for live changes.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot)
}
