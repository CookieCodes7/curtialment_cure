// Shared, in-memory store so DISCOM, Plant, and Farmer dashboards all observe
// the SAME live event and FLC state (spec section 53 — cross-dashboard state).
// A real deployment replaces this with a WebSocket feed from FastAPI; the
// subscribe/getSnapshot shape is deliberately identical so swapping the
// transport later doesn't change any component code.

import { FLCS, PLANTS } from '../data/mockData.js'

const listeners = new Set()

let state = {
  flcs: structuredClone(FLCS),
  liveEvents: [], // events created by the simulator, newest first
  notifications: { plant: [], discom: [], farmer: {} }, // farmer: { [flcId]: [...] }
}

function emit() {
  for (const l of listeners) l()
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getSnapshot() {
  return state
}

export function setState(updater) {
  state = { ...state, ...updater(state) }
  emit()
}

export function pushNotification(role, note, flcId) {
  setState((s) => {
    if (role === 'farmer' && flcId) {
      const list = s.notifications.farmer[flcId] || []
      return {
        notifications: {
          ...s.notifications,
          farmer: { ...s.notifications.farmer, [flcId]: [note, ...list].slice(0, 20) },
        },
      }
    }
    return {
      notifications: { ...s.notifications, [role]: [note, ...s.notifications[role]].slice(0, 20) },
    }
  })
}

export function updateEvent(eventId, patch) {
  setState((s) => ({
    liveEvents: s.liveEvents.map((e) => (e.id === eventId ? { ...e, ...patch } : e)),
  }))
}

export function addEvent(event) {
  setState((s) => ({ liveEvents: [event, ...s.liveEvents] }))
}

export function updateFlcs(updater) {
  setState((s) => ({ flcs: updater(s.flcs) }))
}

export function resetLive() {
  setState(() => ({ liveEvents: [], flcs: structuredClone(FLCS), notifications: { plant: [], discom: [], farmer: {} } }))
}

export function getPlant(plantId) {
  return PLANTS.find((p) => p.id === plantId)
}
