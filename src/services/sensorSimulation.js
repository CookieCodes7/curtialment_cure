// Simulates the CT/voltage sensor readings a real FLC would report over
// GSM/4G once activated. Small random jitter around a plausible operating
// point so the UI never shows a perfectly flat number.

export function readSensor(allocatedKw) {
  const voltage = +(230 + (Math.random() * 4 - 2)).toFixed(1)
  const power = +(allocatedKw * (0.94 + Math.random() * 0.08)).toFixed(2)
  const current = +((power * 1000) / voltage).toFixed(1)
  return { voltage, current, powerKw: power }
}

export function accumulateEnergy(readings, minutes) {
  // readings: array of {powerKw} samples across the event
  const avgKw = readings.reduce((a, r) => a + r.powerKw, 0) / readings.length
  return +((avgKw * minutes) / 60).toFixed(2) // kWh
}
