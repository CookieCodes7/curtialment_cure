import { useSyncExternalStore } from 'react'
import { subscribe, getSnapshot } from '../services/eventStore.js'

export function useEventStore() {
  return useSyncExternalStore(subscribe, getSnapshot)
}
