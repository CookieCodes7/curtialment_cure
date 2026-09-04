import {
  Sun,
  Zap,
  Plus,
  CheckCircle2,
  MapPin,
  Gauge,
  Radio,
  Building2,
  UserRound,
} from 'lucide-react'

import ProgramRegistration from '../../components/ProgramRegistration.jsx'


const NETWORK_STATS = [
  {
    label: 'Registered CDUs',
    value: '2',
    icon: Sun,
    tone: 'sun',
  },
  {
    label: 'Registered FLCs',
    value: '32',
    icon: Zap,
    tone: 'teal',
  },
  {
    label: 'Available flexibility',
    value: '245 kW',
    icon: Gauge,
    tone: 'moss',
  },
  {
    label: 'Devices online',
    value: '31 / 34',
    icon: Radio,
    tone: 'clay',
  },
]


export default function DiscomRegistration() {

  return (

    <div className="space-y-6">


      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-100 to-orange-100 text-sun-700">

              <Building2
                className="h-6 w-6"
                strokeWidth={1.7}
              />

            </div>


            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sun-600">
                SolarRevive PROGRAM
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                Device Registration
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-soft">
                Register renewable plants and flexible loads to participate in the SolarRevive flexibility network.
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2 self-start rounded-full border border-moss-200 bg-moss-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-moss-700">

            <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />

            Program onboarding

          </div>

        </div>

      </section>


      {/* =====================================================
          NETWORK SUMMARY
          ===================================================== */}

      <section>

        <div className="mb-3">

          <h2 className="text-sm font-semibold text-ink">
            Program network
          </h2>

          <p className="mt-1 text-xs text-ink-faint">
            Current SolarRevive network registration overview.
          </p>

        </div>


        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

          {NETWORK_STATS.map(
            ({
              label,
              value,
              icon: Icon,
              tone,
            }) => {

              const styles = {

                sun: {
                  box:
                    'border-sun-100 bg-sun-50',
                  icon:
                    'bg-white text-sun-700',
                },

                teal: {
                  box:
                    'border-teal-100 bg-teal-50',
                  icon:
                    'bg-white text-teal-700',
                },

                moss: {
                  box:
                    'border-moss-100 bg-moss-50',
                  icon:
                    'bg-white text-moss-700',
                },

                clay: {
                  box:
                    'border-clay-100 bg-clay-50',
                  icon:
                    'bg-white text-clay-700',
                },

              }[tone]


              return (

                <div
                  key={label}
                  className={`rounded-2xl border p-4 ${styles.box}`}
                >

                  <div className="flex items-center justify-between">

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${styles.icon}`}
                    >

                      <Icon
                        className="h-4 w-4"
                        strokeWidth={1.8}
                      />

                    </div>

                  </div>


                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                    {label}
                  </p>

                  <p className="mt-1 font-mono text-xl font-semibold text-ink">
                    {value}
                  </p>

                </div>

              )

            }
          )}

        </div>

      </section>


      {/* =====================================================
          REGISTRATION AREA
          ===================================================== */}

      <section>

        <div className="mb-3">

          <h2 className="text-sm font-semibold text-ink">
            Add to SolarRevive
          </h2>

          <p className="mt-1 text-xs text-ink-faint">
            Register a CDU or FLC device to expand the flexibility network.
          </p>

        </div>


        <ProgramRegistration />

      </section>


      {/* =====================================================
          REGISTRATION PROCESS
          ===================================================== */}

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">

        <div className="mb-5">

          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-600">
            ONBOARDING FLOW
          </p>

          <h2 className="mt-1 text-lg font-semibold text-ink">
            How device registration works
          </h2>

        </div>


        <div className="grid gap-4 md:grid-cols-3">


          {/* STEP 1 */}

          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sun-100 text-sun-700">

                <Plus
                  className="h-4 w-4"
                  strokeWidth={2}
                />

              </div>

              <p className="text-sm font-semibold text-ink">
                01 · Register
              </p>

            </div>

            <p className="mt-3 text-xs leading-5 text-ink-soft">
              Enter the device, owner, capacity and network details.
            </p>

          </div>


          {/* STEP 2 */}

          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-700">

                <Radio
                  className="h-4 w-4"
                  strokeWidth={2}
                />

              </div>

              <p className="text-sm font-semibold text-ink">
                02 · Connect
              </p>

            </div>

            <p className="mt-3 text-xs leading-5 text-ink-soft">
              The registered device becomes part of the SolarRevive network.
            </p>

          </div>


          {/* STEP 3 */}

          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-moss-100 text-moss-700">

                <CheckCircle2
                  className="h-4 w-4"
                  strokeWidth={2}
                />

              </div>

              <p className="text-sm font-semibold text-ink">
                03 · Participate
              </p>

            </div>

            <p className="mt-3 text-xs leading-5 text-ink-soft">
              Eligible FLCs can be selected for future flexibility events.
            </p>

          </div>


        </div>

      </section>


      {/* =====================================================
          IMPORTANT DEMO NOTE
          ===================================================== */}

      <div className="rounded-xl border border-sun-100 bg-sun-50 px-4 py-3">

        <div className="flex items-start gap-3">

          <UserRound
            className="mt-0.5 h-4 w-4 shrink-0 text-sun-700"
            strokeWidth={1.8}
          />

          <p className="text-xs leading-5 text-sun-800">

            <span className="font-semibold">
              Prototype:
            </span>{' '}

            Registration is currently stored for the active demo session. Backend persistence and device verification can be connected when the production database and hardware APIs are integrated.

          </p>

        </div>

      </div>


    </div>

  )
}