import { useEffect, useRef, useState } from 'react'
import { Sun, Pause, Play } from 'lucide-react'

const INFORMATION = [
  'RENEWABLE ENERGY',
  'CURTAILMENT',
  'DEMAND RESPONSE',
  'FLEXIBLE LOAD',
  'YU VASETU',
  'VERIFIED ENERGY',
]

export default function SolarEnergyAnimation() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let time = 0

    let particles = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()

      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height

      canvas.width = width * dpr
      canvas.height = height * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      createParticles()
    }

    const createParticles = () => {
      particles = []

      for (let i = 0; i < 55; i++) {
        particles.push({
          progress: Math.random(),
          lane: Math.floor(Math.random() * 5),
          speed: 0.0012 + Math.random() * 0.0018,
          size: 1.5 + Math.random() * 2,
          text:
            INFORMATION[
              Math.floor(Math.random() * INFORMATION.length)
            ],
        })
      }
    }

    const drawSun = (x, y) => {
      const radius = Math.min(width * 0.105, 72)

      /*
       * Large atmospheric glow
       */

      const outerGlow = ctx.createRadialGradient(
        x,
        y,
        radius * 0.4,
        x,
        y,
        radius * 3.4
      )

      outerGlow.addColorStop(
        0,
        'rgba(250, 204, 21, 0.24)'
      )

      outerGlow.addColorStop(
        0.35,
        'rgba(251, 191, 36, 0.10)'
      )

      outerGlow.addColorStop(
        1,
        'rgba(251, 191, 36, 0)'
      )

      ctx.fillStyle = outerGlow

      ctx.beginPath()
      ctx.arc(x, y, radius * 3.4, 0, Math.PI * 2)
      ctx.fill()


      /*
       * Rotating rays
       */

      ctx.save()

      ctx.translate(x, y)
      ctx.rotate(time * 0.00012)

      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20

        const inner = radius + 12
        const outer = radius + 30

        ctx.beginPath()

        ctx.moveTo(
          Math.cos(angle) * inner,
          Math.sin(angle) * inner
        )

        ctx.lineTo(
          Math.cos(angle) * outer,
          Math.sin(angle) * outer
        )

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.38)'
        ctx.lineWidth = 2.2
        ctx.lineCap = 'round'

        ctx.stroke()
      }

      ctx.restore()


      /*
       * Sun body
       */

      const sunGradient = ctx.createRadialGradient(
        x - radius * 0.3,
        y - radius * 0.3,
        radius * 0.1,
        x,
        y,
        radius
      )

      sunGradient.addColorStop(
        0,
        '#fff7b2'
      )

      sunGradient.addColorStop(
        0.35,
        '#fde047'
      )

      sunGradient.addColorStop(
        0.75,
        '#fbbf24'
      )

      sunGradient.addColorStop(
        1,
        '#f59e0b'
      )

      ctx.fillStyle = sunGradient

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()


      /*
       * Inner highlight
       */

      const highlight = ctx.createRadialGradient(
        x - radius * 0.35,
        y - radius * 0.35,
        0,
        x - radius * 0.35,
        y - radius * 0.35,
        radius * 0.65
      )

      highlight.addColorStop(
        0,
        'rgba(255,255,255,0.45)'
      )

      highlight.addColorStop(
        1,
        'rgba(255,255,255,0)'
      )

      ctx.fillStyle = highlight

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }


    const drawSolarPanels = (x, y) => {

      const panelWidth = Math.min(width * 0.20, 190)
      const panelHeight = panelWidth * 0.62

      /*
       * Panel support
       */

      ctx.strokeStyle = '#78716c'
      ctx.lineWidth = 3

      ctx.beginPath()

      ctx.moveTo(
        x - panelWidth * 0.28,
        y + panelHeight * 0.25
      )

      ctx.lineTo(
        x - panelWidth * 0.20,
        y + panelHeight * 0.75
      )

      ctx.moveTo(
        x + panelWidth * 0.28,
        y + panelHeight * 0.25
      )

      ctx.lineTo(
        x + panelWidth * 0.20,
        y + panelHeight * 0.75
      )

      ctx.stroke()


      /*
       * Draw 2 large solar panels
       */

      for (let row = 0; row < 2; row++) {

        const py =
          y -
          panelHeight * 0.42 +
          row * (panelHeight * 0.62)

        ctx.save()

        ctx.translate(x, py)

        ctx.rotate(-0.10)


        /*
         * Panel background
         */

        const panelGradient = ctx.createLinearGradient(
          0,
          0,
          0,
          panelHeight * 0.55
        )

        panelGradient.addColorStop(
          0,
          '#334155'
        )

        panelGradient.addColorStop(
          1,
          '#172033'
        )

        ctx.fillStyle = panelGradient

        ctx.beginPath()

        ctx.roundRect(
          -panelWidth / 2,
          -panelHeight * 0.25,
          panelWidth,
          panelHeight * 0.5,
          5
        )

        ctx.fill()


        /*
         * Panel border
         */

        ctx.strokeStyle =
          'rgba(71, 85, 105, 0.9)'

        ctx.lineWidth = 2

        ctx.stroke()


        /*
         * Solar cell grid
         */

        ctx.strokeStyle =
          'rgba(148, 163, 184, 0.30)'

        ctx.lineWidth = 0.7

        const columns = 6
        const rows = 3

        for (let c = 1; c < columns; c++) {

          const cellX =
            -panelWidth / 2 +
            (panelWidth / columns) * c

          ctx.beginPath()

          ctx.moveTo(
            cellX,
            -panelHeight * 0.25
          )

          ctx.lineTo(
            cellX,
            panelHeight * 0.25
          )

          ctx.stroke()
        }

        for (let r = 1; r < rows; r++) {

          const cellY =
            -panelHeight * 0.25 +
            (panelHeight * 0.5 / rows) * r

          ctx.beginPath()

          ctx.moveTo(
            -panelWidth / 2,
            cellY
          )

          ctx.lineTo(
            panelWidth / 2,
            cellY
          )

          ctx.stroke()
        }

        ctx.restore()
      }


      /*
       * Ground
       */

      ctx.fillStyle =
        'rgba(120, 90, 40, 0.10)'

      ctx.fillRect(
        x - panelWidth * 0.65,
        y + panelHeight * 0.68,
        panelWidth * 1.3,
        4
      )
    }


    const drawEnergyPath = (
      sunX,
      sunY,
      solarX,
      solarY
    ) => {

      /*
       * Main sunlight path
       */

      const gradient = ctx.createLinearGradient(
        sunX,
        sunY,
        solarX,
        solarY
      )

      gradient.addColorStop(
        0,
        'rgba(250, 204, 21, 0)'
      )

      gradient.addColorStop(
        0.25,
        'rgba(250, 204, 21, 0.25)'
      )

      gradient.addColorStop(
        0.7,
        'rgba(245, 158, 11, 0.28)'
      )

      gradient.addColorStop(
        1,
        'rgba(234, 88, 12, 0.12)'
      )

      ctx.strokeStyle = gradient

      ctx.lineWidth = 1.2

      ctx.setLineDash([6, 8])

      ctx.beginPath()

      ctx.moveTo(
        sunX + 60,
        sunY
      )

      ctx.lineTo(
        solarX - 100,
        solarY
      )

      ctx.stroke()

      ctx.setLineDash([])


      /*
       * Additional sunlight rays
       */

      for (let i = -2; i <= 2; i++) {

        const offset = i * 26

        ctx.beginPath()

        ctx.moveTo(
          sunX + 55,
          sunY + offset * 0.15
        )

        ctx.lineTo(
          solarX - 90,
          solarY + offset
        )

        ctx.strokeStyle =
          'rgba(245, 158, 11, 0.10)'

        ctx.lineWidth = 1

        ctx.stroke()
      }
    }


    const drawParticle = (
      particle,
      sunX,
      sunY,
      solarX,
      solarY
    ) => {

      const progress = particle.progress

      const startX = sunX + 55
      const startY = sunY

      const endX = solarX - 90
      const endY =
        solarY +
        particle.lane * 18 -
        36

      const x =
        startX +
        (endX - startX) * progress

      const wave =
        Math.sin(
          progress * Math.PI * 2 +
          particle.lane
        ) * 14

      const y =
        startY +
        (endY - startY) * progress +
        wave


      /*
       * Particle glow
       */

      const glow = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        particle.size * 7
      )

      glow.addColorStop(
        0,
        'rgba(250, 204, 21, 0.45)'
      )

      glow.addColorStop(
        1,
        'rgba(250, 204, 21, 0)'
      )

      ctx.fillStyle = glow

      ctx.beginPath()

      ctx.arc(
        x,
        y,
        particle.size * 7,
        0,
        Math.PI * 2
      )

      ctx.fill()


      /*
       * Particle
       */

      ctx.fillStyle =
        'rgba(245, 158, 11, 0.9)'

      ctx.beginPath()

      ctx.arc(
        x,
        y,
        particle.size,
        0,
        Math.PI * 2
      )

      ctx.fill()


      /*
       * Information text
       */

      if (
        particle.lane === 2 &&
        progress > 0.25 &&
        progress < 0.85
      ) {

        ctx.font =
          '600 9px Inter, Arial, sans-serif'

        ctx.fillStyle =
          'rgba(180, 120, 20, 0.55)'

        ctx.textAlign = 'center'

        ctx.fillText(
          particle.text,
          x,
          y - 10
        )
      }
    }


    const draw = () => {

      ctx.clearRect(
        0,
        0,
        width,
        height
      )


      /*
       * Main positions
       */

      const sunX =
        width * 0.14 +
        Math.sin(time * 0.00018) * 8

      const sunY =
        height * 0.48 +
        Math.sin(time * 0.00022) * 10


      const solarX =
        width * 0.84

      const solarY =
        height * 0.52


      /*
       * Background sunlight atmosphere
       */

      const atmosphere =
        ctx.createLinearGradient(
          sunX,
          sunY,
          solarX,
          solarY
        )

      atmosphere.addColorStop(
        0,
        'rgba(254, 240, 138, 0.05)'
      )

      atmosphere.addColorStop(
        0.5,
        'rgba(253, 186, 116, 0.04)'
      )

      atmosphere.addColorStop(
        1,
        'rgba(251, 146, 60, 0.02)'
      )

      ctx.strokeStyle = atmosphere

      ctx.lineWidth = 45

      ctx.beginPath()

      ctx.moveTo(
        sunX + 40,
        sunY
      )

      ctx.lineTo(
        solarX - 70,
        solarY
      )

      ctx.stroke()


      /*
       * Energy paths
       */

      drawEnergyPath(
        sunX,
        sunY,
        solarX,
        solarY
      )


      /*
       * Energy particles
       */

      particles.forEach((particle) => {

        drawParticle(
          particle,
          sunX,
          sunY,
          solarX,
          solarY
        )

        if (!paused) {

          particle.progress +=
            particle.speed

          if (particle.progress >= 1) {

            particle.progress = 0

            particle.text =
              INFORMATION[
                Math.floor(
                  Math.random() *
                    INFORMATION.length
                )
              ]
          }
        }
      })


      /*
       * Main objects
       */

      drawSun(
        sunX,
        sunY
      )

      drawSolarPanels(
        solarX,
        solarY
      )


      /*
       * Labels
       */

      ctx.textAlign = 'center'

      ctx.font =
        '700 12px Inter, Arial, sans-serif'

      ctx.fillStyle =
        '#b7791f'

      ctx.fillText(
        'SUN',
        sunX,
        sunY + 100
      )

      ctx.font =
        '500 9px Inter, Arial, sans-serif'

      ctx.fillStyle =
        '#a8a29e'

      ctx.fillText(
        'Solar radiation',
        sunX,
        sunY + 117
      )


      ctx.font =
        '700 12px Inter, Arial, sans-serif'

      ctx.fillStyle =
        '#374151'

      ctx.fillText(
        'SOLAR PLANT',
        solarX,
        solarY + 120
      )

      ctx.font =
        '500 9px Inter, Arial, sans-serif'

      ctx.fillStyle =
        '#a8a29e'

      ctx.fillText(
        'Renewable generation',
        solarX,
        solarY + 137
      )


      /*
       * Central information label
       */

      const centerX =
        (sunX + solarX) / 2

      ctx.font =
        '700 9px Inter, Arial, sans-serif'

      ctx.fillStyle =
        'rgba(180, 120, 20, 0.60)'

      ctx.fillText(
        'YU VASETU  •  RENEWABLE FLEXIBILITY',
        centerX,
        height * 0.18
      )


      time += paused ? 0 : 16

      animationRef.current =
        requestAnimationFrame(draw)
    }


    resize()
    draw()

    window.addEventListener(
      'resize',
      resize
    )

    return () => {

      window.removeEventListener(
        'resize',
        resize
      )

      if (animationRef.current) {

        cancelAnimationFrame(
          animationRef.current
        )
      }
    }

  }, [paused])


  return (
    <section className="relative mx-auto mt-14 w-full max-w-6xl overflow-hidden rounded-[28px] border border-amber-200 bg-white shadow-[0_20px_70px_rgba(120,80,20,0.10)]">

      {/* Warm background */}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-50/70 via-white to-orange-50/50" />

      {/* Header */}

      <div className="relative z-10 flex items-center justify-between border-b border-gray-100 px-6 py-4 sm:px-8">

        <div>

          <div className="flex items-center gap-2">

            <Sun className="h-4 w-4 text-yellow-500" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
              From sunlight to renewable generation
            </span>

          </div>

          <p className="mt-1 text-[11px] text-gray-400">
            Visualizing the renewable-energy ecosystem behind YuvaSetu
          </p>

        </div>


        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="flex min-h-[40px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[10px] font-semibold text-gray-500 shadow-sm transition hover:border-yellow-300 hover:text-yellow-600"
        >

          {paused ? (
            <>
              <Play className="h-3.5 w-3.5" />
              Resume
            </>
          ) : (
            <>
              <Pause className="h-3.5 w-3.5" />
              Pause
            </>
          )}

        </button>

      </div>


      {/* Main animation */}

      <div className="relative h-[390px] w-full sm:h-[450px]">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-label="Animated visualization showing sunlight travelling from the sun to a solar plant"
        />

      </div>


      {/* Explanation */}

      <div className="relative z-10 border-t border-gray-100 bg-white/80 px-6 py-5 sm:px-8">

        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">

          <div className="max-w-xl">

            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-yellow-600">
              The YuvaSetu concept
            </div>

            <p className="mt-1 text-xs leading-5 text-gray-500">

              Renewable generation begins with sunlight.
              YuvaSetu helps ensure that when renewable energy
              cannot be fully absorbed by the grid, flexible demand
              can be coordinated to put that energy to productive use.

            </p>

          </div>


          <div className="flex shrink-0 items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />

            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-yellow-700">
              Energy flow active
            </span>

          </div>

        </div>

      </div>

    </section>
  )
}