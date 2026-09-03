import { LayoutDashboard, Zap, LineChart, Receipt, FileText, Settings } from 'lucide-react'
import EnterpriseLayout from './EnterpriseLayout.jsx'
import { useEventStore } from '../lib/useEventStore.js'

const ITEMS = [
  { to: '/plant/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/plant/events', label: 'Curtailment events', icon: Zap },
  { to: '/plant/energy', label: 'Energy recovery', icon: LineChart },
  { to: '/plant/settlements', label: 'Settlements', icon: Receipt },
  { to: '/plant/reports', label: 'Reports', icon: FileText },
  { to: '/plant/settings', label: 'Settings', icon: Settings },
]

export default function PlantLayout() {
  const { notifications } = useEventStore()
  return (
    <EnterpriseLayout
      items={ITEMS}
      title="Plant developer"
      subtitle="Pugal Solar Plant"
      statusLabel="Plant online"
      notifications={notifications.plant}
    />
  )
}
