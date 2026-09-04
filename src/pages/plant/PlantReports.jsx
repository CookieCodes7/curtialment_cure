import { useState } from 'react'

import {
  FileDown,
  CheckCircle2,
  TrendingUp,
  Zap,
  Users,
  IndianRupee,
} from 'lucide-react'

import jsPDF from 'jspdf'


const REPORTS = {
  '01–03 Sep 2026': {
    totalCurtailment: 58.2,
    recovered: 42.6,
    participatingFlcs: 28,
    estimatedRevenue: 341000,
  },

  '01–31 Aug 2026': {
    totalCurtailment: 412.8,
    recovered: 318.4,
    participatingFlcs: 31,
    estimatedRevenue: 2547000,
  },

  '01–31 Jul 2026': {
    totalCurtailment: 367.5,
    recovered: 281.7,
    participatingFlcs: 29,
    estimatedRevenue: 2254000,
  },

  '01–30 Jun 2026': {
    totalCurtailment: 295.3,
    recovered: 224.9,
    participatingFlcs: 26,
    estimatedRevenue: 1799000,
  },
}


const REPORT_PERIODS = Object.keys(REPORTS)


export default function PlantReports() {

  const [range, setRange] =
    useState(REPORT_PERIODS[0])

  const [downloaded, setDownloaded] =
    useState(false)


  const report = REPORTS[range]


  const recoveryPercentage =
    report.totalCurtailment > 0
      ? (
          (report.recovered /
            report.totalCurtailment) *
          100
        ).toFixed(1)
      : '0.0'


  const formatRevenue = (value) => {
    return `Rs. ${value.toLocaleString('en-IN')}`
  }


  const handleDownload = () => {

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })


    const pageWidth =
      doc.internal.pageSize.getWidth()


    /*
     * HEADER
     */

    doc.setFillColor(255, 247, 214)

    doc.rect(
      0,
      0,
      pageWidth,
      38,
      'F'
    )


    doc.setTextColor(74, 40, 4)

    doc.setFont(
      'helvetica',
      'bold'
    )

    doc.setFontSize(22)

    doc.text(
      'YuvaSetu',
      20,
      18
    )


    doc.setFontSize(9)

    doc.setFont(
      'helvetica',
      'normal'
    )

    doc.text(
      'Renewable Flexibility Network',
      20,
      25
    )


    doc.setTextColor(55, 66, 58)

    doc.setFont(
      'helvetica',
      'bold'
    )

    doc.setFontSize(9)

    doc.text(
      'CURTAILMENT RECOVERY REPORT',
      pageWidth - 20,
      18,
      { align: 'right' }
    )


    doc.setFont(
      'helvetica',
      'normal'
    )

    doc.setFontSize(8)

    doc.text(
      range,
      pageWidth - 20,
      25,
      { align: 'right' }
    )


    /*
     * PLANT INFORMATION
     */

    let y = 52


    doc.setTextColor(24, 32, 27)

    doc.setFont(
      'helvetica',
      'bold'
    )

    doc.setFontSize(15)

    doc.text(
      'Pugal Solar Plant',
      20,
      y
    )


    y += 7


    doc.setFont(
      'helvetica',
      'normal'
    )

    doc.setFontSize(9)

    doc.setTextColor(
      94,
      104,
      95
    )

    doc.text(
      'Bikaner, Rajasthan',
      20,
      y
    )


    /*
     * SUMMARY BOX
     */

    y += 15


    doc.setFillColor(
      248,
      246,
      239
    )

    doc.roundedRect(
      20,
      y,
      pageWidth - 40,
      38,
      4,
      4,
      'F'
    )


    doc.setFont(
      'helvetica',
      'bold'
    )

    doc.setFontSize(9)

    doc.setTextColor(
      55,
      66,
      58
    )

    doc.text(
      'REPORT SUMMARY',
      27,
      y + 9
    )


    doc.setFont(
      'helvetica',
      'normal'
    )

    doc.setFontSize(9)

    doc.text(
      `Reporting period: ${range}`,
      27,
      y + 17
    )

    doc.text(
      `Recovery rate: ${recoveryPercentage}%`,
      27,
      y + 25
    )

    doc.text(
      `Participating FLCs: ${report.participatingFlcs}`,
      27,
      y + 33
    )


    /*
     * PERFORMANCE SECTION
     */

    y += 53


    doc.setFont(
      'helvetica',
      'bold'
    )

    doc.setFontSize(12)

    doc.setTextColor(
      24,
      32,
      27
    )

    doc.text(
      'Performance',
      20,
      y
    )


    y += 10


    const rows = [
      [
        'Total curtailment',
        `${report.totalCurtailment.toFixed(1)} MWh`,
      ],

      [
        'Curtailment recovered',
        `${report.recovered.toFixed(1)} MWh`,
      ],

      [
        'Recovery rate',
        `${recoveryPercentage}%`,
      ],

      [
        'Participating FLCs',
        `${report.participatingFlcs}`,
      ],

      [
        'Estimated revenue',
        formatRevenue(
          report.estimatedRevenue
        ),
      ],
    ]


    rows.forEach(
      ([label, value], index) => {

        const rowY =
          y + index * 13


        if (index % 2 === 0) {

          doc.setFillColor(
            248,
            246,
            239
          )

          doc.rect(
            20,
            rowY - 6,
            pageWidth - 40,
            11,
            'F'
          )
        }


        doc.setFont(
          'helvetica',
          'normal'
        )

        doc.setFontSize(9)

        doc.setTextColor(
          75,
          85,
          79
        )

        doc.text(
          label,
          25,
          rowY
        )


        doc.setFont(
          'helvetica',
          'bold'
        )

        doc.setTextColor(
          24,
          32,
          27
        )

        doc.text(
          value,
          pageWidth - 25,
          rowY,
          {
            align: 'right',
          }
        )
      }
    )


    /*
     * RECOVERY VISUAL
     */

    y += 78


    doc.setFont(
      'helvetica',
      'bold'
    )

    doc.setFontSize(11)

    doc.setTextColor(
      24,
      32,
      27
    )

    doc.text(
      'Curtailment recovery',
      20,
      y
    )


    y += 9


    const barWidth =
      pageWidth - 40


    const recoveryWidth =
      barWidth *
      (Number(recoveryPercentage) / 100)


    doc.setFillColor(
      224,
      229,
      221
    )

    doc.roundedRect(
      20,
      y,
      barWidth,
      7,
      3.5,
      3.5,
      'F'
    )


    doc.setFillColor(
      13,
      148,
      136
    )

    doc.roundedRect(
      20,
      y,
      recoveryWidth,
      7,
      3.5,
      3.5,
      'F'
    )


    y += 14


    doc.setFont(
      'helvetica',
      'normal'
    )

    doc.setFontSize(8)

    doc.setTextColor(
      94,
      104,
      95
    )

    doc.text(
      `${report.recovered.toFixed(1)} MWh recovered`,
      20,
      y
    )

    doc.text(
      `${report.totalCurtailment.toFixed(1)} MWh total curtailment`,
      pageWidth - 20,
      y,
      { align: 'right' }
    )


    /*
     * FOOTER
     */

    const footerY =
      doc.internal.pageSize.getHeight() - 25


    doc.setDrawColor(
      216,
      213,
      203
    )

    doc.line(
      20,
      footerY - 7,
      pageWidth - 20,
      footerY - 7
    )


    doc.setFont(
      'helvetica',
      'normal'
    )

    doc.setFontSize(7)

    doc.setTextColor(
      110,
      115,
      110
    )

    doc.text(
      'Generated by YuvaSetu',
      20,
      footerY
    )

    doc.text(
      'Prototype report · Simulated demo data',
      pageWidth - 20,
      footerY,
      { align: 'right' }
    )


    /*
     * DOWNLOAD
     */

    const safePeriod =
      range
        .replaceAll('–', '-')
        .replaceAll(' ', '_')


    doc.save(
      `YuvaSetu_Curtailment_Report_${safePeriod}.pdf`
    )


    setDownloaded(true)


    setTimeout(() => {
      setDownloaded(false)
    }, 2500)
  }


  return (

    <div className="max-w-3xl space-y-5">


      {/* HEADER */}

      <div>

        <p className="text-xs font-medium uppercase tracking-[0.14em] text-sun-600">
          YuvaSetu
        </p>

        <h2 className="mt-1 text-lg font-semibold text-ink">
          Curtailment recovery reports
        </h2>

        <p className="mt-1 max-w-xl text-xs leading-5 text-ink-faint">
          Review how much curtailed renewable energy
          was recovered through participating flexible
          loads.
        </p>

      </div>


      {/* PERIOD */}

      <div className="rounded-xl border border-line bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div className="flex-1">

            <label
              htmlFor="report-period"
              className="mb-1.5 block text-xs font-medium text-ink-soft"
            >
              Report period
            </label>

            <select
              id="report-period"
              value={range}
              onChange={(e) => {
                setRange(e.target.value)
                setDownloaded(false)
              }}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-sun-500 focus:ring-2 focus:ring-sun-100"
            >

              {REPORT_PERIODS.map(
                (period) => (
                  <option
                    key={period}
                    value={period}
                  >
                    {period}
                  </option>
                )
              )}

            </select>

          </div>


          <div className="rounded-lg bg-paper px-4 py-2.5">

            <p className="text-[10px] uppercase tracking-wide text-ink-faint">
              Plant
            </p>

            <p className="mt-0.5 text-sm font-medium text-ink">
              Pugal Solar Plant
            </p>

          </div>

        </div>

      </div>


      {/* REPORT OVERVIEW */}

      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
              Recovery performance
            </p>

            <h3 className="mt-1 text-base font-semibold text-ink">
              {range}
            </h3>

          </div>


          <div className="flex items-center gap-2 text-teal-700">

            <TrendingUp
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            <span className="text-sm font-semibold">
              {recoveryPercentage}% recovered
            </span>

          </div>

        </div>


        {/* KPI CARDS */}

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">


          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">

                <Zap
                  className="h-4 w-4 text-red-600"
                  strokeWidth={1.8}
                />

              </div>

              <span className="text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Curtailment
              </span>

            </div>

            <p className="mt-3 font-mono text-xl font-medium text-ink">
              {report.totalCurtailment.toFixed(1)}
              <span className="ml-1 text-xs text-ink-faint">
                MWh
              </span>
            </p>

          </div>


          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50">

                <TrendingUp
                  className="h-4 w-4 text-teal-600"
                  strokeWidth={1.8}
                />

              </div>

              <span className="text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Recovered
              </span>

            </div>

            <p className="mt-3 font-mono text-xl font-medium text-teal-700">
              {report.recovered.toFixed(1)}
              <span className="ml-1 text-xs text-ink-faint">
                MWh
              </span>
            </p>

          </div>


          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50">

                <Users
                  className="h-4 w-4 text-sun-600"
                  strokeWidth={1.8}
                />

              </div>

              <span className="text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                FLCs
              </span>

            </div>

            <p className="mt-3 font-mono text-xl font-medium text-ink">
              {report.participatingFlcs}
            </p>

          </div>


          <div className="rounded-xl border border-line bg-paper p-4">

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">

                <IndianRupee
                  className="h-4 w-4 text-orange-600"
                  strokeWidth={1.8}
                />

              </div>

              <span className="text-[10px] font-medium uppercase tracking-wide text-ink-faint">
                Revenue
              </span>

            </div>

            <p className="mt-3 font-mono text-xl font-medium text-ink">
              {formatRevenue(
                report.estimatedRevenue
              )}
            </p>

          </div>

        </div>


        {/* RECOVERY BAR */}

        <div className="mt-6">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs font-medium text-ink-soft">
              Curtailment recovery
            </span>

            <span className="font-mono text-xs font-semibold text-teal-700">
              {recoveryPercentage}%
            </span>

          </div>


          <div className="h-3 overflow-hidden rounded-full bg-paper-dim">

            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-500"
              style={{
                width: `${recoveryPercentage}%`,
              }}
            />

          </div>


          <div className="mt-2 flex justify-between text-[10px] text-ink-faint">

            <span>
              {report.recovered.toFixed(1)}
              {' MWh recovered'}
            </span>

            <span>
              {report.totalCurtailment.toFixed(1)}
              {' MWh total'}
            </span>

          </div>

        </div>

      </div>


      {/* DOWNLOAD */}

      <div className="rounded-xl border border-line bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-medium text-ink">
              Curtailment recovery report
            </p>

            <p className="mt-1 text-xs text-ink-faint">
              Generate a PDF report for {range}.
            </p>

          </div>


          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 active:scale-[0.99]"
          >

            {downloaded ? (
              <>
                <CheckCircle2
                  className="h-4 w-4"
                  strokeWidth={1.75}
                />

                PDF downloaded
              </>
            ) : (
              <>
                <FileDown
                  className="h-4 w-4"
                  strokeWidth={1.75}
                />

                Download PDF
              </>
            )}

          </button>

        </div>

      </div>


      {/* DEMO NOTE */}

      <p className="text-center text-[10px] leading-4 text-ink-faint">
        Prototype report · Values shown are simulated demo data.
      </p>

    </div>
  )
}