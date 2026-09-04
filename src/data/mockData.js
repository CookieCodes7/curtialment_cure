// Static seed data for the SolarRevive prototype.
// In production this is replaced by calls to the FastAPI backend.

export const PLANTS = [
  {
    id: 'PLANT-01',
    name: 'Pugal Solar Plant',
    location: 'Pugal, Bikaner',
    capacityMw: 300,
    coords: { x: 190, y: 90 },
  },
  {
    id: 'PLANT-02',
    name: 'Khuiyala Solar Plant',
    location: 'Khuiyala, Bikaner',
    capacityMw: 210,
    coords: { x: 110, y: 150 },
  },
  {
    id: 'PLANT-03',
    name: 'Karnisar-Bhatiyan Solar Plant',
    location: 'Karnisar, Bikaner',
    capacityMw: 180,
    coords: { x: 270, y: 150 },
  },
]

const FLC_OWNERS = [
  'Ramesh Choudhary', 'Suresh Godara', 'Kamla Devi', 'Bhanwar Lal',
  'Prakash Bishnoi', 'Sohan Singh', 'Geeta Rathore', 'Mahaveer Prasad',
  'Urmul Dairy Unit 3', 'Arihant Solvents Ltd', 'Tilam Sangh Processing',
  'Manoj Kumar', 'Rekha Devi', 'Girdhari Lal', 'Om Prakash Sharma',
  'Kishan Lal', 'Santosh Kanwar', 'Deep Chand', 'Hansa Ram',
  'Pooja Cattle Feed Unit', 'Vikram Singh', 'Nirmala Devi',
  'Radhe Shyam', 'Chhagan Lal', 'Savitri Devi', 'Jagdish Prasad',
  'Mohan Lal', 'Kailash Chand', 'Sunita Devi', 'Ganpat Ram',
]

const VILLAGES = [
  'Pugal', 'Khajuwala', 'Kolayat', 'Lunkaransar', 'Beechwal',
  'Lalgarh', 'Gajner', 'Napasar', 'Chhatargarh', 'Deshnok',
]

const LOAD_TYPES = ['Agricultural pump', 'Cold storage', 'Industrial load', 'Battery bank']

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}
const rand = seededRandom(42)

export const FLCS = Array.from({ length: 32 }).map((_, i) => {
  const capacity = [5, 7.5, 10, 12.5, 15, 20][Math.floor(rand() * 6)]
  const distance = +(3 + rand() * 22).toFixed(1)
  const reliability = +(88 + rand() * 11).toFixed(0)
  const statusRoll = rand()
  const status = statusRoll > 0.92 ? 'offline' : 'available'
  return {
    id: `FLC-${String(i + 1).padStart(3, '0')}`,
    owner: FLC_OWNERS[i % FLC_OWNERS.length],
    location: VILLAGES[i % VILLAGES.length],
    type: LOAD_TYPES[i % LOAD_TYPES.length],
    capacityKw: capacity,
    distanceKm: distance,
    reliability,
    status,
    currentPowerKw: 0,
    lastSeen: `${Math.floor(rand() * 5) + 1} min ago`,
    phone: `+91 9${Math.floor(10000000 + rand() * 89999999)}`,
  }
})

export const HISTORICAL_EVENTS = [
  { id: 'EVT-098', plantId: 'PLANT-01', plant: 'Pugal Solar Plant', time: '03 Sep, 11:40', requiredKw: 1200, matchedKw: 1200, recoveredMwh: 0.58, durationMin: 28, status: 'Completed', flcCount: 6 },
  { id: 'EVT-099', plantId: 'PLANT-02', plant: 'Khuiyala Solar Plant', time: '03 Sep, 12:05', requiredKw: 800, matchedKw: 720, recoveredMwh: 0.34, durationMin: 22, status: 'Completed', flcCount: 4 },
  { id: 'EVT-100', plantId: 'PLANT-01', plant: 'Pugal Solar Plant', time: '02 Sep, 13:10', requiredKw: 1500, matchedKw: 1500, recoveredMwh: 0.71, durationMin: 30, status: 'Completed', flcCount: 7 },
  { id: 'EVT-101', plantId: 'PLANT-03', plant: 'Karnisar-Bhatiyan Solar Plant', time: '02 Sep, 12:30', requiredKw: 950, matchedKw: 890, recoveredMwh: 0.42, durationMin: 25, status: 'Completed', flcCount: 5 },
  { id: 'EVT-102', plantId: 'PLANT-01', plant: 'Pugal Solar Plant', time: '01 Sep, 12:50', requiredKw: 1100, matchedKw: 1100, recoveredMwh: 0.53, durationMin: 27, status: 'Completed', flcCount: 6 },
  { id: 'EVT-103', plantId: 'PLANT-02', plant: 'Khuiyala Solar Plant', time: '01 Sep, 11:55', requiredKw: 700, matchedKw: 700, recoveredMwh: 0.33, durationMin: 20, status: 'Completed', flcCount: 4 },
  { id: 'EVT-104', plantId: 'PLANT-01', plant: 'Pugal Solar Plant', time: '31 Aug, 12:15', requiredKw: 1500, matchedKw: 1500, recoveredMwh: 1.43, durationMin: 30, status: 'Completed', flcCount: 4 },
  { id: 'EVT-105', plantId: 'PLANT-03', plant: 'Karnisar-Bhatiyan Solar Plant', time: '31 Aug, 12:40', requiredKw: 1000, matchedKw: 940, recoveredMwh: 0.45, durationMin: 24, status: 'Completed', flcCount: 5 },
  { id: 'EVT-106', plantId: 'PLANT-02', plant: 'Khuiyala Solar Plant', time: '30 Aug, 13:00', requiredKw: 650, matchedKw: 650, recoveredMwh: 0.31, durationMin: 19, status: 'Completed', flcCount: 3 },
  { id: 'EVT-107', plantId: 'PLANT-01', plant: 'Pugal Solar Plant', time: '30 Aug, 12:05', requiredKw: 1350, matchedKw: 1350, recoveredMwh: 0.64, durationMin: 26, status: 'Completed', flcCount: 6 },
]

export const RATE_PER_KWH = 8 // demo rate, configurable — not an official tariff

export const SETTLEMENTS = HISTORICAL_EVENTS.map((e, i) => ({
  id: `SET-${1020 + i}`,
  eventId: e.id,
  energyMwh: e.recoveredMwh,
  rate: RATE_PER_KWH,
  amount: Math.round(e.recoveredMwh * 1000 * RATE_PER_KWH),
  status: 'Processed',
}))

// Hourly generation profile for today — a simple solar bell curve with a
// midday curtailment dip and the portion recovered by the FLC network.
export const GENERATION_SERIES = [
  { hour: '06:00', generation: 8, curtailed: 0, recovered: 0 },
  { hour: '07:00', generation: 42, curtailed: 0, recovered: 0 },
  { hour: '08:00', generation: 96, curtailed: 0, recovered: 0 },
  { hour: '09:00', generation: 152, curtailed: 0, recovered: 0 },
  { hour: '10:00', generation: 198, curtailed: 4, recovered: 3 },
  { hour: '11:00', generation: 226, curtailed: 12, recovered: 9 },
  { hour: '12:00', generation: 241, curtailed: 22, recovered: 16 },
  { hour: '13:00', generation: 238, curtailed: 19, recovered: 14 },
  { hour: '14:00', generation: 214, curtailed: 10, recovered: 7 },
  { hour: '15:00', generation: 176, curtailed: 3, recovered: 2 },
  { hour: '16:00', generation: 121, curtailed: 0, recovered: 0 },
  { hour: '17:00', generation: 58, curtailed: 0, recovered: 0 },
  { hour: '18:00', generation: 12, curtailed: 0, recovered: 0 },
]

export const WEEKLY_RECOVERY = [
  { day: 'Mon', mwh: 3.8, revenue: 30400 },
  { day: 'Tue', mwh: 4.2, revenue: 33600 },
  { day: 'Wed', mwh: 3.1, revenue: 24800 },
  { day: 'Thu', mwh: 4.9, revenue: 39200 },
  { day: 'Fri', mwh: 5.4, revenue: 43200 },
  { day: 'Sat', mwh: 4.6, revenue: 36800 },
  { day: 'Sun', mwh: 3.9, revenue: 31200 },
]

export const CURTAILMENT_VS_RECOVERY = [
  { day: 'Mon', curtailed: 5.6, recovered: 3.8 },
  { day: 'Tue', curtailed: 6.1, recovered: 4.2 },
  { day: 'Wed', curtailed: 4.4, recovered: 3.1 },
  { day: 'Thu', curtailed: 6.9, recovered: 4.9 },
  { day: 'Fri', curtailed: 7.6, recovered: 5.4 },
  { day: 'Sat', curtailed: 6.5, recovered: 4.6 },
  { day: 'Sun', curtailed: 5.5, recovered: 3.9 },
]

export const FLC_PARTICIPATION = [
  { day: 'Mon', flcs: 22 },
  { day: 'Tue', flcs: 26 },
  { day: 'Wed', flcs: 19 },
  { day: 'Thu', flcs: 29 },
  { day: 'Fri', flcs: 31 },
  { day: 'Sat', flcs: 27 },
  { day: 'Sun', flcs: 23 },
]

export const FARMER_HISTORY = [
  { date: '03 Sep', durationMin: 30, energyKwh: 3.5, earned: 28.0 },
  { date: '02 Sep', durationMin: 22, energyKwh: 2.6, earned: 20.8 },
  { date: '31 Aug', durationMin: 28, energyKwh: 3.2, earned: 25.6 },
  { date: '29 Aug', durationMin: 25, energyKwh: 2.9, earned: 23.2 },
  { date: '27 Aug', durationMin: 30, energyKwh: 3.6, earned: 28.8 },
]

export const FARMER_MONTHLY_EARNINGS = [
  { month: 'Apr', amount: 312 },
  { month: 'May', amount: 348 },
  { month: 'Jun', amount: 401 },
  { month: 'Jul', amount: 376.2 },
  { month: 'Aug', amount: 428.5 },
]
