import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'

import PlantLayout from './components/PlantLayout.jsx'
import PlantDashboard from './pages/plant/PlantDashboard.jsx'
import PlantEvents from './pages/plant/PlantEvents.jsx'
import PlantEventDetail from './pages/plant/PlantEventDetail.jsx'
import PlantEnergy from './pages/plant/PlantEnergy.jsx'
import PlantSettlements from './pages/plant/PlantSettlements.jsx'
import PlantReports from './pages/plant/PlantReports.jsx'

import DiscomLayout from './components/DiscomLayout.jsx'
import DiscomDashboard from './pages/discom/DiscomDashboard.jsx'
import DiscomEvents from './pages/discom/DiscomEvents.jsx'
import DiscomFlexibility from './pages/discom/DiscomFlexibility.jsx'
import DiscomSimulation from './pages/discom/DiscomSimulation.jsx'
import DiscomRegistration from './pages/discom/DiscomRegistration.jsx'


import FarmerLayout from './components/FarmerLayout.jsx'
import FarmerDashboard from './pages/farmer/FarmerDashboard.jsx'
import FarmerActivity from './pages/farmer/FarmerActivity.jsx'
import FarmerEarnings from './pages/farmer/FarmerEarnings.jsx'
import FarmerNotifications from './pages/farmer/FarmerNotifications.jsx'
import FarmerProfile from './pages/farmer/FarmerProfile.jsx'

import SettingsPage from './components/SettingsPage.jsx'

const PLANT_SETTINGS = [
  { label: 'Organisation', value: 'Pugal Solar Plant · O&M' },
  { label: 'Contact', value: 'plant@SolarRevive.demo' },
  { label: 'Notification preference', value: 'Email + in-app' },
]
const DISCOM_SETTINGS = [
  { label: 'Organisation', value: 'Bikaner Electricity Supply' },
  { label: 'Contact', value: 'discom@SolarRevive.demo' },
  { label: 'Matching policy', value: 'Prototype default (70/30)' },
]

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login/:role" element={<Login />} />

          <Route
            path="/plant"
            element={
              <ProtectedRoute role="plant">
                <PlantLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<PlantDashboard />} />
            <Route path="events" element={<PlantEvents />} />
            <Route path="events/:id" element={<PlantEventDetail />} />
            <Route path="energy" element={<PlantEnergy />} />
            <Route path="settlements" element={<PlantSettlements />} />
            <Route path="reports" element={<PlantReports />} />
            <Route path="settings" element={<SettingsPage fields={PLANT_SETTINGS} />} />
          </Route>

          <Route
            path="/discom"
            element={
              <ProtectedRoute role="discom">
                <DiscomLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DiscomDashboard />} />
            <Route path="events" element={<DiscomEvents />} />
            <Route path="flexibility" element={<DiscomFlexibility />} />
            <Route path="simulation" element={<DiscomSimulation />} />
            <Route path="registration" element={<DiscomRegistration />} />
            <Route path="settings" element={<SettingsPage fields={DISCOM_SETTINGS} />} />
          </Route>

          <Route
            path="/farmer"
            element={
              <ProtectedRoute role="farmer">
                <FarmerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<FarmerDashboard />} />
            <Route path="activity" element={<FarmerActivity />} />
            <Route path="earnings" element={<FarmerEarnings />} />
            <Route path="notifications" element={<FarmerNotifications />} />
            <Route path="profile" element={<FarmerProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
