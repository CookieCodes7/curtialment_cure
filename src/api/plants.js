import { PLANTS } from '../data/mockData.js'

export async function getPlants() {
  await new Promise((r) => setTimeout(r, 150))
  return PLANTS
}

export async function getPlant(id) {
  await new Promise((r) => setTimeout(r, 100))
  return PLANTS.find((p) => p.id === id)
}
