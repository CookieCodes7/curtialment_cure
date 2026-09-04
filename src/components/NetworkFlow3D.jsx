import {
  Sun,
  Factory,
  Tractor,
  Zap,
  ArrowRight,
} from 'lucide-react'

function SolarPlant() {
  return (
    <div className="network-object solar-object">
      <div className="plant-label">
        <span className="status-dot" />
        SOLAR PLANT
      </div>

      <div className="solar-scene">
        <div className="sun-orb">
          <Sun size={34} strokeWidth={1.5} />
        </div>

        <div className="solar-ground">
          <div className="solar-panel panel-one" />
          <div className="solar-panel panel-two" />
          <div className="solar-panel panel-three" />
        </div>

        <div className="plant-building">
          <div className="building-top" />
          <div className="building-body">
            <div className="building-window" />
            <div className="building-window" />
            <div className="building-window" />
          </div>
        </div>
      </div>

      <p className="object-title">Renewable generation</p>
      <p className="object-subtitle">
        Solar energy enters the grid
      </p>
    </div>
  )
}

function GridTower() {
  return (
    <div className="network-object grid-object">
      <div className="plant-label">
        <span className="status-dot grid-dot" />
        ELECTRIC GRID
      </div>

      <div className="tower-scene">
        <div className="tower-glow">
          <Zap size={24} strokeWidth={1.5} />
        </div>

        <div className="tower">
          <div className="tower-top" />
          <div className="tower-arm arm-one" />
          <div className="tower-arm arm-two" />
          <div className="tower-body" />
          <div className="tower-base left-base" />
          <div className="tower-base right-base" />
        </div>

        <div className="wire wire-one" />
        <div className="wire wire-two" />
        <div className="wire wire-three" />

        <span className="electricity-pulse pulse-one" />
        <span className="electricity-pulse pulse-two" />
        <span className="electricity-pulse pulse-three" />
      </div>

      <p className="object-title">Grid network</p>
      <p className="object-subtitle">
        Power flows where demand is needed
      </p>
    </div>
  )
}

function Consumer() {
  return (
    <div className="network-object consumer-object">
      <div className="plant-label">
        <span className="status-dot consumer-dot" />
        FLEXIBLE LOAD
      </div>

      <div className="consumer-scene">
        <div className="consumer-glow">
          <Zap size={22} strokeWidth={1.5} />
        </div>

        <div className="consumer-building">
          <div className="roof" />

          <div className="factory-body">
            <div className="factory-window window-one" />
            <div className="factory-window window-two" />
            <div className="factory-window window-three" />

            <div className="factory-door" />
          </div>

          <div className="factory-stack">
            <div />
            <div />
          </div>
        </div>

        <div className="load-icon">
          <Tractor size={27} strokeWidth={1.5} />
        </div>
      </div>

      <p className="object-title">Consumer</p>
      <p className="object-subtitle">
        Flexible demand uses available energy
      </p>
    </div>
  )
}

function FlowArrow({ label }) {
  return (
    <div className="flow-arrow">
      <div className="arrow-line">
        <span className="flow-pulse" />
      </div>

      <ArrowRight
        className="arrow-head"
        size={24}
        strokeWidth={1.75}
      />

      <span>{label}</span>
    </div>
  )
}

export default function NetworkFlow3D() {
  return (
    <section className="network-flow-section">
      <div className="network-header">
        <div>
          <p className="network-eyebrow">
            SolarRevive NETWORK
          </p>

          <h2>
            Renewable energy meets
            <span> flexible demand.</span>
          </h2>

          <p className="network-description">
            SolarRevive connects renewable generation,
            the electrical grid, and flexible consumers
            to make better use of available power.
          </p>
        </div>

        <div className="network-live">
          <span />
          NETWORK ACTIVE
        </div>
      </div>

      <div className="network-flow">
        <SolarPlant />

        <FlowArrow label="GENERATES" />

        <GridTower />

        <FlowArrow label="DELIVERS" />

        <Consumer />
      </div>

      <div className="network-bottom">
        <div className="network-step">
          <strong>01</strong>
          <div>
            <p>Generate</p>
            <span>Renewable power is produced.</span>
          </div>
        </div>

        <div className="network-step">
          <strong>02</strong>
          <div>
            <p>Coordinate</p>
            <span>Grid demand is balanced.</span>
          </div>
        </div>

        <div className="network-step">
          <strong>03</strong>
          <div>
            <p>Consume</p>
            <span>Flexible loads respond.</span>
          </div>
        </div>
      </div>
    </section>
  )
}