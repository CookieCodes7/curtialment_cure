import { useState } from 'react'
import {
  Sun,
  Zap,
  CheckCircle2,
  Plus,
  MapPin,
  Gauge,
  Radio,
} from 'lucide-react'

const INITIAL_CDU = {
  id: '',
  plantName: '',
  capacityMw: '',
  location: '',
  feeder: '',
  contact: '',
}

const INITIAL_FLC = {
  id: '',
  owner: '',
  type: 'Agricultural pump',
  capacityKw: '',
  location: '',
  feeder: '',
  meterId: '',
  phone: '',
}

export default function ProgramRegistration() {
  const [activeTab, setActiveTab] = useState('flc')

  const [cdu, setCdu] = useState(INITIAL_CDU)
  const [flc, setFlc] = useState(INITIAL_FLC)

  const [registered, setRegistered] = useState({
    cdus: [],
    flcs: [],
  })

  const [message, setMessage] = useState('')

  function updateCdu(field, value) {
    setCdu((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function updateFlc(field, value) {
    setFlc((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function registerCdu(event) {
    event.preventDefault()

    if (
      !cdu.id ||
      !cdu.plantName ||
      !cdu.capacityMw ||
      !cdu.location
    ) {
      setMessage(
        'Please complete the required CDU fields.'
      )
      return
    }

    setRegistered((current) => ({
      ...current,
      cdus: [
        ...current.cdus,
        {
          ...cdu,
          status: 'Online',
        },
      ],
    }))

    setCdu(INITIAL_CDU)

    setMessage(
      `${cdu.id} has been registered successfully.`
    )
  }

  function registerFlc(event) {
    event.preventDefault()

    if (
      !flc.id ||
      !flc.owner ||
      !flc.capacityKw ||
      !flc.location ||
      !flc.meterId
    ) {
      setMessage(
        'Please complete the required FLC fields.'
      )
      return
    }

    setRegistered((current) => ({
      ...current,
      flcs: [
        ...current.flcs,
        {
          ...flc,
          status: 'Available',
        },
      ],
    }))

    setFlc(INITIAL_FLC)

    setMessage(
      `${flc.id} has been registered successfully.`
    )
  }

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sun-50 text-sun-600">

              <Radio
                className="h-5 w-5"
                strokeWidth={1.8}
              />

            </div>

            <div>

              <h2 className="text-base font-semibold text-ink">
                YuvaSetu Program Network
              </h2>

              <p className="mt-0.5 text-xs text-ink-faint">
                Register renewable plants and flexible loads to join the program.
              </p>

            </div>

          </div>

        </div>


        <div className="flex items-center gap-2 rounded-full border border-moss-200 bg-moss-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-moss-700">

          <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />

          Program onboarding

        </div>

      </div>


      {/* NETWORK SUMMARY */}

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

        <div className="rounded-xl border border-line bg-paper p-3">

          <div className="flex items-center gap-2">

            <Sun className="h-4 w-4 text-sun-600" />

            <span className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
              CDUs
            </span>

          </div>

          <p className="mt-2 font-mono text-xl font-semibold text-ink">
            {registered.cdus.length}
          </p>

          <p className="text-[10px] text-ink-faint">
            Newly registered
          </p>

        </div>


        <div className="rounded-xl border border-line bg-paper p-3">

          <div className="flex items-center gap-2">

            <Zap className="h-4 w-4 text-teal-600" />

            <span className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
              FLCs
            </span>

          </div>

          <p className="mt-2 font-mono text-xl font-semibold text-ink">
            {registered.flcs.length}
          </p>

          <p className="text-[10px] text-ink-faint">
            Newly registered
          </p>

        </div>


        <div className="rounded-xl border border-line bg-paper p-3">

          <div className="flex items-center gap-2">

            <Gauge className="h-4 w-4 text-teal-600" />

            <span className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
              FLC capacity
            </span>

          </div>

          <p className="mt-2 font-mono text-xl font-semibold text-ink">

            {registered.flcs
              .reduce(
                (sum, item) =>
                  sum + Number(item.capacityKw || 0),
                0
              )
              .toFixed(1)}

            <span className="ml-1 text-xs font-normal text-ink-faint">
              kW
            </span>

          </p>

          <p className="text-[10px] text-ink-faint">
            Registered capacity
          </p>

        </div>


        <div className="rounded-xl border border-line bg-paper p-3">

          <div className="flex items-center gap-2">

            <CheckCircle2 className="h-4 w-4 text-moss-600" />

            <span className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
              Status
            </span>

          </div>

          <p className="mt-2 text-sm font-semibold text-moss-700">
            Ready
          </p>

          <p className="text-[10px] text-ink-faint">
            Devices can be onboarded
          </p>

        </div>

      </div>


      {/* TABS */}

      <div className="mt-6 flex rounded-xl bg-paper p-1">

        <button
          type="button"
          onClick={() => {
            setActiveTab('flc')
            setMessage('')
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
            activeTab === 'flc'
              ? 'bg-white text-teal-700 shadow-sm'
              : 'text-ink-faint hover:text-ink'
          }`}
        >
          <Zap className="h-4 w-4" />
          Register FLC
        </button>


        <button
          type="button"
          onClick={() => {
            setActiveTab('cdu')
            setMessage('')
          }}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
            activeTab === 'cdu'
              ? 'bg-white text-sun-700 shadow-sm'
              : 'text-ink-faint hover:text-ink'
          }`}
        >
          <Sun className="h-4 w-4" />
          Register CDU
        </button>

      </div>


      {/* SUCCESS / ERROR MESSAGE */}

      {message && (

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-moss-200 bg-moss-50 px-4 py-3 text-xs font-medium text-moss-700">

          <CheckCircle2
            className="h-4 w-4 shrink-0"
            strokeWidth={1.8}
          />

          {message}

        </div>

      )}


      {/* =====================================================
          FLC FORM
          ===================================================== */}

      {activeTab === 'flc' && (

        <form
          onSubmit={registerFlc}
          className="mt-5 rounded-2xl border border-teal-100 bg-teal-50/40 p-4 sm:p-5"
        >

          <div className="mb-4">

            <h3 className="text-sm font-semibold text-ink">
              Register Flexible Load
            </h3>

            <p className="mt-1 text-xs text-ink-faint">
              Add an agricultural, commercial or industrial load to the YuvaSetu flexibility network.
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-2">

            {/* FLC ID */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                FLC ID *
              </label>

              <input
                value={flc.id}
                onChange={(e) =>
                  updateFlc(
                    'id',
                    e.target.value
                  )
                }
                placeholder="FLC-033"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>


            {/* OWNER */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Owner / Organization *
              </label>

              <input
                value={flc.owner}
                onChange={(e) =>
                  updateFlc(
                    'owner',
                    e.target.value
                  )
                }
                placeholder="Ramesh Choudhary"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>


            {/* LOAD TYPE */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Load type
              </label>

              <select
                value={flc.type}
                onChange={(e) =>
                  updateFlc(
                    'type',
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >

                <option>
                  Agricultural pump
                </option>

                <option>
                  Cold storage
                </option>

                <option>
                  Industrial load
                </option>

                <option>
                  Battery bank
                </option>

              </select>

            </div>


            {/* CAPACITY */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Rated capacity (kW) *
              </label>

              <input
                type="number"
                min="0.1"
                step="0.1"
                value={flc.capacityKw}
                onChange={(e) =>
                  updateFlc(
                    'capacityKw',
                    e.target.value
                  )
                }
                placeholder="7.5"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>


            {/* LOCATION */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Location *
              </label>

              <div className="relative">

                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />

                <input
                  value={flc.location}
                  onChange={(e) =>
                    updateFlc(
                      'location',
                      e.target.value
                    )
                  }
                  placeholder="Pugal, Bikaner"
                  className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />

              </div>

            </div>


            {/* FEEDER */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Feeder / Network
              </label>

              <input
                value={flc.feeder}
                onChange={(e) =>
                  updateFlc(
                    'feeder',
                    e.target.value
                  )
                }
                placeholder="Pugal Feeder 04"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>


            {/* METER */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Smart meter / device ID *
              </label>

              <input
                value={flc.meterId}
                onChange={(e) =>
                  updateFlc(
                    'meterId',
                    e.target.value
                  )
                }
                placeholder="MTR-FLC-033"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>


            {/* PHONE */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Contact number
              </label>

              <input
                value={flc.phone}
                onChange={(e) =>
                  updateFlc(
                    'phone',
                    e.target.value
                  )
                }
                placeholder="+91 98XXXXXXXX"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>

          </div>


          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >

            <Plus className="h-4 w-4" />

            Register FLC

          </button>

        </form>

      )}


      {/* =====================================================
          CDU FORM
          ===================================================== */}

      {activeTab === 'cdu' && (

        <form
          onSubmit={registerCdu}
          className="mt-5 rounded-2xl border border-sun-100 bg-sun-50/50 p-4 sm:p-5"
        >

          <div className="mb-4">

            <h3 className="text-sm font-semibold text-ink">
              Register Curtailment Detection Unit
            </h3>

            <p className="mt-1 text-xs text-ink-faint">
              Add a renewable plant and its CDU to the YuvaSetu network.
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-2">

            {/* CDU ID */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                CDU ID *
              </label>

              <input
                value={cdu.id}
                onChange={(e) =>
                  updateCdu(
                    'id',
                    e.target.value
                  )
                }
                placeholder="CDU-003"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
              />

            </div>


            {/* PLANT */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Solar plant name *
              </label>

              <input
                value={cdu.plantName}
                onChange={(e) =>
                  updateCdu(
                    'plantName',
                    e.target.value
                  )
                }
                placeholder="New Solar Plant"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
              />

            </div>


            {/* CAPACITY */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Plant capacity (MW) *
              </label>

              <input
                type="number"
                min="0.1"
                step="0.1"
                value={cdu.capacityMw}
                onChange={(e) =>
                  updateCdu(
                    'capacityMw',
                    e.target.value
                  )
                }
                placeholder="250"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
              />

            </div>


            {/* LOCATION */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Location *
              </label>

              <div className="relative">

                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />

                <input
                  value={cdu.location}
                  onChange={(e) =>
                    updateCdu(
                      'location',
                      e.target.value
                    )
                  }
                  placeholder="Pugal, Bikaner"
                  className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
                />

              </div>

            </div>


            {/* FEEDER */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Grid / Feeder
              </label>

              <input
                value={cdu.feeder}
                onChange={(e) =>
                  updateCdu(
                    'feeder',
                    e.target.value
                  )
                }
                placeholder="Bikaner Solar Feeder"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
              />

            </div>


            {/* CONTACT */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-ink-soft">
                Plant contact
              </label>

              <input
                value={cdu.contact}
                onChange={(e) =>
                  updateCdu(
                    'contact',
                    e.target.value
                  )
                }
                placeholder="Plant control room"
                className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
              />

            </div>

          </div>


          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sun-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sun-700"
          >

            <Plus className="h-4 w-4" />

            Register CDU

          </button>

        </form>

      )}


      {/* =====================================================
          NEWLY REGISTERED DEVICES
          ===================================================== */}

      {(registered.cdus.length > 0 ||
        registered.flcs.length > 0) && (

        <div className="mt-6">

          <div className="mb-3">

            <p className="text-sm font-semibold text-ink">
              Recently registered
            </p>

            <p className="mt-0.5 text-xs text-ink-faint">
              Devices added during this session.
            </p>

          </div>


          <div className="space-y-2">

            {registered.cdus.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sun-50 text-sun-600">

                    <Sun
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />

                  </div>

                  <div>

                    <p className="text-sm font-medium text-ink">
                      {item.id} · {item.plantName}
                    </p>

                    <p className="text-[11px] text-ink-faint">
                      {item.capacityMw} MW · {item.location}
                    </p>

                  </div>

                </div>


                <span className="rounded-full bg-moss-50 px-2.5 py-1 text-[10px] font-semibold text-moss-700">
                  Online
                </span>

              </div>

            ))}


            {registered.flcs.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">

                    <Zap
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />

                  </div>

                  <div>

                    <p className="text-sm font-medium text-ink">
                      {item.id} · {item.owner}
                    </p>

                    <p className="text-[11px] text-ink-faint">
                      {item.capacityKw} kW · {item.type} · {item.location}
                    </p>

                  </div>

                </div>


                <span className="rounded-full bg-moss-50 px-2.5 py-1 text-[10px] font-semibold text-moss-700">
                  Available
                </span>

              </div>

            ))}

          </div>

        </div>

      )}

    </section>
  )
}