// Prototype matching policy (clearly labelled as such in the UI — see
// MatchingCriteria component). Capacity contribution is weighted higher than
// proximity because the immediate goal is absorbing the full curtailed
// amount; distance is a secondary tie-breaker favouring loads electrically
// closer to the constrained corridor. These weights are a design choice for
// this prototype, not an official regulatory requirement.

export const WEIGHTS = { capacity: 0.7, distance: 0.3 }

export function scoreFlc(flc, requiredKw, maxDistance) {
  const capacityScore = Math.min(flc.capacityKw / requiredKw, 1)
  const distanceScore = 1 - flc.distanceKm / maxDistance
  const final = WEIGHTS.capacity * capacityScore + WEIGHTS.distance * distanceScore
  return +final.toFixed(2)
}

// Given a required kW and a pool of available FLCs, rank them and greedily
// allocate capacity until the requirement is met (or the pool is exhausted).
export function runMatching(requiredKw, availableFlcs) {
  const maxDistance = Math.max(...availableFlcs.map((f) => f.distanceKm), 1)
  const ranked = availableFlcs
    .map((f) => ({ ...f, score: scoreFlc(f, requiredKw, maxDistance) }))
    .sort((a, b) => b.score - a.score)

  const selected = []
  let remaining = requiredKw
  for (const flc of ranked) {
    if (remaining <= 0) break
    selected.push({ ...flc, allocatedKw: Math.min(flc.capacityKw, remaining) })
    remaining -= flc.capacityKw
  }

  return {
    selected,
    matchedKw: Math.min(requiredKw, requiredKw - Math.max(remaining, 0)),
    remainingKw: Math.max(remaining, 0),
    ranked: ranked.slice(0, 8),
  }
}
