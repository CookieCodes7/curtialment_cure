import { Activity, Zap, Share2, Wand2, Settings } from 'lucide-react'
import EnterpriseLayout from './EnterpriseLayout.jsx'
import { useEventStore } from '../lib/useEventStore.js'

const ITEMS = [
  { to: '/discom/dashboard', label: 'Operations', icon: Activity, end: true },
  { to: '/discom/events', label: 'Live events', icon: Zap },
  { to: '/discom/flexibility', label: 'Flexibility network', icon: Share2 },
  { to: '/discom/simulation', label: 'Simulation', icon: Wand2 },
  { to: '/discom/settings', label: 'Settings', icon: Settings },
]

export default function DiscomLayout() {
  const { notifications } = useEventStore()
  return (
    <EnterpriseLayout
      items={ITEMS}
      dark
      title="Grid operations center"
      subtitle="Bikaner renewable flexibility network"
      statusLabel="System healthy"
      notifications={notifications.discom}
    />
  )
}
