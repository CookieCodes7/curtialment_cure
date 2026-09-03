import { SETTLEMENTS } from '../data/mockData.js'

export async function getSettlements() {
  await new Promise((r) => setTimeout(r, 150))
  return SETTLEMENTS
}
