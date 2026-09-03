import { useState, useMemo } from 'react'

import { Search, Sun } from 'lucide-react'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

import { useEventStore } from '../../lib/useEventStore.js'

import { PLANTS } from '../../data/mockData.js'

import StatusBadge from '../../components/StatusBadge.jsx'

import EmptyState from '../../components/EmptyState.jsx'


const FILTERS = ['all', 'available', 'active', 'offline']


// ----------------------------------------------------
// DEMO MAP LOCATIONS
// These are simulated locations for the prototype.
// ----------------------------------------------------

const cduLocations = [
  {
    id: 'CDU-001',
    name: 'Pugal Solar Plant',
    position: [28.0229, 73.3119],
    capacity: '250 MW',
  },
  {
    id: 'CDU-002',
    name: 'Khuiyala Solar Plant',
    position: [27.9815, 73.3952],
    capacity: '300 MW',
  },
]

const demoFLCs = [
  {
    id: 'FLC-001',
    owner: 'Ramesh',
    location: 'Bikaner Rural',
    position: [28.0152, 73.3278],
    capacity: 7.5,
    status: 'active',
    cdu: 'CDU-001',
  },
  {
    id: 'FLC-002',
    owner: 'Suresh',
    location: 'Jamsar',
    position: [28.0418, 73.3395],
    capacity: 10,
    status: 'available',
    cdu: 'CDU-001',
  },
  {
    id: 'FLC-003',
    owner: 'Mohan',
    location: 'Kanasar',
    position: [28.0084, 73.2962],
    capacity: 5,
    status: 'available',
    cdu: 'CDU-001',
  },

  {
    id: 'FLC-004',
    owner: 'Rajesh',
    location: 'Khuiyala',
    position: [27.9951, 73.3781],
    capacity: 15,
    status: 'active',
    cdu: 'CDU-002',
  },
  {
    id: 'FLC-005',
    owner: 'Amit',
    location: 'Nal',
    position: [27.9948, 73.3224],
    capacity: 7.5,
    status: 'available',
    cdu: 'CDU-002',
  },
  {
    id: 'FLC-006',
    owner: 'Vijay',
    location: 'Rani Bazar',
    position: [28.0327, 73.3531],
    capacity: 12.5,
    status: 'active',
    cdu: 'CDU-002',
  },
]


// ----------------------------------------------------
// Custom map markers
// ----------------------------------------------------

function createMarker(type, status = '') {

  // CDU = orange square hardware unit
  if (type === 'CDU') {
    return L.divIcon({
      className: '',
      html: `
        <div
          style="
            width: 44px;
            height: 44px;
            border-radius: 11px;
            background: #ea580c;
            border: 3px solid white;
            box-shadow: 0 3px 12px rgba(0,0,0,0.30);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: Arial, sans-serif;
            font-weight: 900;
            line-height: 1;
          "
        >
          <div style="font-size: 17px; margin-bottom: 2px;">
            ☀
          </div>

          <div style="
            font-size: 9px;
            letter-spacing: 1px;
          ">
            CDU
          </div>
        </div>

        <div
          style="
            position: absolute;
            left: 50%;
            top: 43px;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 10px solid #ea580c;
          "
        ></div>
      `,
      iconSize: [44, 54],
      iconAnchor: [22, 27],
      popupAnchor: [0, -27],
    })
  }


  // FLC = circular controller
  let color = '#eab308'

  if (status === 'active') {
    color = '#16a34a'
  }

  if (status === 'offline') {
    color = '#dc2626'
  }


  return L.divIcon({
    className: '',
    html: `
      <div
        style="
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: white;
          border: 3px solid ${color};
          box-shadow: 0 3px 10px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: ${color};
          font-family: Arial, sans-serif;
          font-weight: 900;
          line-height: 1;
        "
      >
        <div style="font-size: 15px;">
          ⚡
        </div>

        <div style="
          font-size: 8px;
          letter-spacing: 0.5px;
          margin-top: 2px;
        ">
          FLC
        </div>
      </div>

      <div
        style="
          position: absolute;
          left: 50%;
          top: 37px;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 9px solid ${color};
        "
      ></div>
    `,
    iconSize: [38, 47],
    iconAnchor: [19, 23],
    popupAnchor: [0, -23],
  })
}


// ----------------------------------------------------
// Main component
// ----------------------------------------------------

export default function DiscomFlexibility() {

  const { flcs } = useEventStore()

  const [filter, setFilter] = useState('all')

  const [query, setQuery] = useState('')


  const filtered = useMemo(() => {

    return flcs.filter((f) => {

      const matchesFilter =
        filter === 'all' || f.status === filter

      const q = query.toLowerCase()

      const matchesQuery =
        !q ||
        f.id.toLowerCase().includes(q) ||
        f.owner.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q)

      return matchesFilter && matchesQuery
    })

  }, [flcs, filter, query])


  return (

    <div className="space-y-6">


      {/* =================================================
          FLEXIBILITY NETWORK MAP
          ================================================= */}

      <div className="rounded-xl border border-line bg-white p-5">

        <div className="mb-4 flex items-start justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">
              Flexibility Network
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-ink">
              Bikaner Flexibility Network
            </h2>

            <p className="mt-1 text-xs text-ink-soft">
              Solar plant CDU connected to distributed flexible loads
            </p>

          </div>


          <div className="rounded-full bg-yellow-50 px-3 py-1.5 text-[10px] font-bold text-yellow-700">
            DEMO DATA
          </div>

        </div>


        {/* MAP */}

        <div
          className="overflow-hidden rounded-xl border border-line"
          style={{ height: '480px' }}
        >

          <MapContainer
            center={[28.025, 73.325]}
            zoom={13}
            scrollWheelZoom={true}
            style={{
              height: '100%',
              width: '100%',
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* -----------------------------------------
                CDU / SOLAR PLANT
                ----------------------------------------- */}

            {cduLocations.map((cdu) => (
  <Marker
    key={cdu.id}
    position={cdu.position}
    icon={createMarker('CDU')}
  >
    <Popup>
      <div className="min-w-[180px]">

        <div className="text-xs font-bold tracking-wider text-orange-600">
          {cdu.id}
        </div>

        <div className="mt-1 text-sm font-bold">
          {cdu.name}
        </div>

        <div className="mt-2 text-xs text-gray-600">
          Curtailment Detection Unit
        </div>

        <div className="mt-2 text-xs">
          Plant capacity:
          <strong> {cdu.capacity}</strong>
        </div>

        <div className="mt-2 font-bold text-green-600">
          ● ONLINE
        </div>

      </div>
    </Popup>
  </Marker>
))}


            {/* -----------------------------------------
                NETWORK CONNECTIONS
                ----------------------------------------- */}

            {demoFLCs.map((flc) => {

  const connectedCDU = cduLocations.find(
    (cdu) => cdu.id === flc.cdu
  )

  if (!connectedCDU) return null

  return (
    <Polyline
      key={`network-${flc.id}`}
      positions={[
        connectedCDU.position,
        flc.position,
      ]}
      pathOptions={{
        color:
          flc.status === 'active'
            ? '#16a34a'
            : '#e7a900',

        weight:
          flc.status === 'active'
            ? 4
            : 2,

        opacity:
          flc.status === 'active'
            ? 0.75
            : 0.35,

        dashArray:
          flc.status === 'active'
            ? undefined
            : '6 8',
      }}
    />
  )
})}


            {/* -----------------------------------------
                FLC MARKERS
                ----------------------------------------- */}

            {demoFLCs.map((flc) => (

              <Marker
                key={flc.id}
                position={flc.position}
                icon={createMarker('FLC', flc.status)}
              >

                <Popup>

                  <div className="min-w-[180px]">

                    <div
                      className={`text-xs font-bold tracking-wider ${
                        flc.status === 'active'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {flc.id}
                    </div>

                    <div className="mt-1 text-sm font-bold">
                      {flc.owner}
                    </div>

                    <div className="mt-1 text-xs text-gray-600">
                      {flc.location}
                    </div>

                    <div className="mt-2 text-xs">
                      Flexible capacity:
                      <strong> {flc.capacity} kW</strong>
                    </div>

                    <div
                      className={`mt-2 text-xs font-bold ${
                        flc.status === 'active'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      ● {flc.status.toUpperCase()}
                    </div>

                  </div>

                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </div>


        {/* ---------------------------------------------
            MAP LEGEND
            --------------------------------------------- */}

        <div className="mt-4 flex flex-wrap items-center gap-5 text-[11px] text-ink-faint">

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-600" />
            CDU / Solar Plant
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-600" />
            Active FLC
          </span>

          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            Available FLC
          </span>

          <span className="ml-auto text-[10px] italic">
            Locations are simulated for demonstration
          </span>

        </div>

      </div>


      {/* =================================================
          FLC FILTERS
          ================================================= */}

      <div>

        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex gap-1.5">

            {FILTERS.map((f) => (

              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filter === f
                    ? 'bg-ink text-white'
                    : 'bg-paper-dim text-ink-soft hover:bg-line'
                }`}
              >
                {f}
              </button>

            ))}

          </div>


          <div className="relative">

            <Search
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
              strokeWidth={1.75}
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FLC, owner, or location"
              className="w-full rounded-lg border border-line bg-white py-2 pl-8 pr-3 text-sm outline-none focus:border-sun-500 sm:w-64"
            />

          </div>

        </div>


        {/* =================================================
            FLC TABLE
            ================================================= */}

        {filtered.length === 0 ? (

          <EmptyState
            title="No FLCs match this filter"
            hint="Try clearing the search or filter."
          />

        ) : (

          <div className="overflow-x-auto rounded-xl border border-line bg-white">

            <table className="w-full text-left text-sm">

              <thead>

                <tr className="border-b border-line text-xs text-ink-faint">

                  <th className="px-4 py-3 font-medium">FLC</th>

                  <th className="px-4 py-3 font-medium">Owner</th>

                  <th className="px-4 py-3 font-medium">Location</th>

                  <th className="px-4 py-3 font-medium">Type</th>

                  <th className="px-4 py-3 font-medium">Capacity</th>

                  <th className="px-4 py-3 font-medium">Distance</th>

                  <th className="px-4 py-3 font-medium">Status</th>

                  <th className="px-4 py-3 font-medium">Current power</th>

                  <th className="px-4 py-3 font-medium">Last seen</th>

                </tr>

              </thead>


              <tbody>

                {filtered.map((f) => (

                  <tr
                    key={f.id}
                    className="border-b border-line last:border-0"
                  >

                    <td className="px-4 py-3 font-mono text-xs">
                      {f.id}
                    </td>

                    <td className="px-4 py-3">
                      {f.owner}
                    </td>

                    <td className="px-4 py-3 text-ink-soft">
                      {f.location}
                    </td>

                    <td className="px-4 py-3 text-ink-soft">
                      {f.type}
                    </td>

                    <td className="px-4 py-3 font-mono">
                      {f.capacityKw} kW
                    </td>

                    <td className="px-4 py-3 font-mono text-ink-soft">
                      {f.distanceKm} km
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={f.status} />
                    </td>

                    <td className="px-4 py-3 font-mono">
                      {f.currentPowerKw > 0
                        ? `${f.currentPowerKw} kW`
                        : '—'}
                    </td>

                    <td className="px-4 py-3 text-ink-faint">
                      {f.lastSeen}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =================================================
          MATCHING CRITERIA
          ================================================= */}

      <details className="rounded-xl border border-line bg-white p-5">

        <summary className="cursor-pointer text-sm font-medium text-ink">
          Matching criteria — prototype matching policy
        </summary>

        <div className="mt-3 space-y-2 text-sm text-ink-soft">

          <div className="flex items-center justify-between">
            <span>Capacity contribution</span>
            <span className="font-mono">70%</span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">

            <div className="h-full w-[70%] rounded-full bg-teal-500" />

          </div>


          <div className="flex items-center justify-between pt-2">

            <span>Distance / proximity</span>

            <span className="font-mono">
              30%
            </span>

          </div>


          <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper-dim">

            <div className="h-full w-[30%] rounded-full bg-sun-500" />

          </div>


          <p className="pt-2 text-xs text-ink-faint">
            This is a prototype matching policy for demonstration,
            not an official regulatory requirement.
          </p>

        </div>

      </details>

    </div>
  )
}