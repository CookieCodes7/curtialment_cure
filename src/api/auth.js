// Mock auth service. A future FastAPI backend replaces this with real
// token-based auth — components only ever call login()/logout(), so the
// swap touches nothing else.

const DEMO_USERS = {
  'plant@yuvasetu.demo': { password: 'password123', role: 'plant', name: 'Anjali Verma', org: 'Pugal Solar Plant · O&M' },
  'discom@yuvasetu.demo': { password: 'password123', role: 'discom', name: 'R. K. Meena', org: 'Bikaner Electricity Supply' },
  'farmer@yuvasetu.demo': { password: 'password123', role: 'farmer', name: 'Ramesh Choudhary', org: 'FLC-001 · Pugal', flcId: 'FLC-001' },
}

export async function login(email, password) {
  await new Promise((r) => setTimeout(r, 400))
  const user = DEMO_USERS[email.trim().toLowerCase()]
  if (!user || user.password !== password) {
    throw new Error('Incorrect email or password. Try the demo credentials shown below.')
  }
  const session = { email, role: user.role, name: user.name, org: user.org, flcId: user.flcId }
  localStorage.setItem('yuvasetu_session', JSON.stringify(session))
  return session
}

export function logout() {
  localStorage.removeItem('yuvasetu_session')
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem('yuvasetu_session'))
  } catch {
    return null
  }
}
