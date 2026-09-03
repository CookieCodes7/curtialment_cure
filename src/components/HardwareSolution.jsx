import { useEffect, useState } from "react";

function HardwareUnit({
  type,
  title,
  subtitle,
  active,
}) {
  const isCDU = type === "CDU";

  return (
    <div
      className={`hardware-unit ${
        isCDU ? "hardware-cdu" : "hardware-flc"
      } ${active ? "hardware-active" : ""}`}
    >
      {/* Top surface */}
      <div className="hardware-top">
        <div className="hardware-brand">YUVASETU</div>

        <div className="hardware-leds">
          <span className={`led ${active ? "led-active" : ""}`} />
          <span className="led led-yellow" />
          <span className="led led-red" />
        </div>
      </div>

      {/* Front body */}
      <div className="hardware-front">

        {/* Display */}
        <div className="hardware-screen">
          <div className="screen-header">
            <span>{title}</span>
            <span className="screen-dot">●</span>
          </div>

          <div className="screen-main">
            {isCDU ? (
              <>
                <span className="screen-label">
                  CURTAILMENT
                </span>

                <strong>
                  {active ? "50" : "0"}
                </strong>

                <span className="screen-unit">
                  kW
                </span>
              </>
            ) : (
              <>
                <span className="screen-label">
                  LOAD RESPONSE
                </span>

                <strong>
                  {active ? "50" : "0"}
                </strong>

                <span className="screen-unit">
                  kW
                </span>
              </>
            )}
          </div>

          <div className="screen-status">
            {active
              ? isCDU
                ? "● EVENT DETECTED"
                : "● LOAD REDUCED"
              : isCDU
              ? "● MONITORING"
              : "● STANDBY"}
          </div>
        </div>

        {/* Controls */}
        <div className="hardware-controls">
          <div className="control-knob" />

          <div className="control-lines">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Ventilation */}
        <div className="hardware-vents">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="hardware-label">
          {subtitle}
        </div>
      </div>

      {/* Bottom depth */}
      <div className="hardware-bottom" />

      {/* Side panel */}
      <div className="hardware-side" />
    </div>
  );
}

export default function HardwareSolution() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      setActive(true);

      setTimeout(() => {
        setActive(false);
      }, 3500);
    };

    startAnimation();

    const interval = setInterval(startAnimation, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hardware-section">

      {/* Heading */}
      <div className="hardware-heading">
        <div className="hardware-eyebrow">
          HARDWARE SOLUTION
        </div>

        <h2>
          Two units. One simple solution.
        </h2>

        <p>
          Detect curtailment. Respond with flexible load.
        </p>
      </div>

      {/* Main visual */}
      <div className="hardware-stage">

        {/* CDU */}
        <div className="hardware-item">
          <div className="unit-tag">
            UNIT 01
          </div>

          <HardwareUnit
            type="CDU"
            title="CDU"
            subtitle="CURTAILMENT DETECTION UNIT"
            active={active}
          />

          <div
            className={`unit-status ${
              active ? "status-orange" : ""
            }`}
          >
            <span className="status-light" />
            {active
              ? "CURTAILMENT DETECTED"
              : "MONITORING GRID"}
          </div>
        </div>

        {/* Connection */}
        <div className="hardware-connection">

          <div className="connection-label">
            {active
              ? "CURTAILMENT SIGNAL"
              : "WAITING"}
          </div>

          <div className="connection-line">
            <div className="connection-dot" />

            {active && (
              <>
                <div className="signal-particle particle-one" />
                <div className="signal-particle particle-two" />
                <div className="signal-particle particle-three" />
              </>
            )}
          </div>

          <div className="connection-value">
            {active ? "50 kW" : "—"}
          </div>
        </div>

        {/* FLC */}
        <div className="hardware-item">
          <div className="unit-tag">
            UNIT 02
          </div>

          <HardwareUnit
            type="FLC"
            title="FLC"
            subtitle="FLEXIBLE LOAD CONTROLLER"
            active={active}
          />

          <div
            className={`unit-status ${
              active ? "status-yellow" : ""
            }`}
          >
            <span className="status-light" />
            {active
              ? "LOAD RESPONSE ACTIVE"
              : "STANDBY"}
          </div>
        </div>
      </div>

      {/* Result */}
      <div
        className={`hardware-result ${
          active ? "result-visible" : ""
        }`}
      >
        <span>✓</span>

        <div>
          <strong>
            CURTAILMENT SOLVED
          </strong>

          <small>
            Flexible load activated
          </small>
        </div>
      </div>
    </section>
  );
}