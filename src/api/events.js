import { HISTORICAL_EVENTS } from '../data/mockData.js'

export async function getEvents(plantId) {
  await new Promise((r) => setTimeout(r, 150))
  return plantId ? HISTORICAL_EVENTS.filter((e) => e.plantId === plantId) : HISTORICAL_EVENTS
}

export async function getEvent(id) {
  await new Promise((r) => setTimeout(r, 100))
  return HISTORICAL_EVENTS.find((e) => e.id === id)
}
