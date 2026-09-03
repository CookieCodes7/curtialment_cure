import { FLCS } from '../data/mockData.js'

export async function getFlcs() {
  await new Promise((r) => setTimeout(r, 150))
  return FLCS
}
