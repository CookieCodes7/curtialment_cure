import { RATE_PER_KWH } from '../data/mockData.js'

// Demo settlement rate — configurable, NOT an official finalised tariff.
// Kept isolated here so it is obvious where to plug in a real rate schedule.
export function calculateSettlement(energyKwh, rate = RATE_PER_KWH) {
  const amount = Math.round(energyKwh * rate)
  return { energyKwh, rate, amount }
}
