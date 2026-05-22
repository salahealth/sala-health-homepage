import { CSSProperties, ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  calculateHospitalEstimator,
  DEFAULT_HOSPITAL_ESTIMATOR_INPUTS,
  formatPhpCurrency,
  HOSPITAL_ESTIMATOR_ASSUMPTIONS,
  HospitalEstimatorInputs,
} from '../lib/hospitalEstimator'

type NumberInputName = keyof HospitalEstimatorInputs

const AVERAGE_HOSPITAL_BREAKDOWN = [
  {
    label: 'Denied reimbursements',
    description: 'Claims that can be recovered when documentation gaps are fixed.',
    color: 'bg-[#0F4C4A]',
  },
  {
    label: 'Slow filing and working-capital drag',
    description: 'Cash collected weeks earlier when claims move closer to discharge.',
    color: 'bg-[#7FA6A2]',
  },
  {
    label: 'RTH collection delay cost',
    description: 'Avoidable cycles created when PhilHealth sends claims back.',
    color: 'bg-gray-300',
  },
] as const

const RETURNED_CLAIM_REASONS = [
  {
    code: 'ABS',
    label: 'Insufficient clinical abstract',
    description: 'Chief complaint, HPI, or PE details missing',
    percent: 27,
  },
  {
    code: 'RVS',
    label: 'RVS code not supported by abstract',
    description: 'Procedure billed but not justified by the clinical narrative',
    percent: 22,
  },
  {
    code: 'CIW',
    label: 'Course in the Ward incomplete',
    description: 'Missing daily progress notes or attending orders',
    percent: 18,
  },
  {
    code: 'LAB',
    label: 'Labs and diagnostics not attached',
    description: 'Required results missing from the claim packet',
    percent: 14,
  },
  {
    code: 'ICD',
    label: 'ICD-10 coding errors',
    description: 'Diagnosis mismatch or unsupported comorbidity',
    percent: 11,
  },
  {
    code: 'SIG',
    label: 'Signature and authentication issues',
    description: 'Physician sign-off missing, illegible, or mismatched',
    percent: 8,
  },
] as const

const REPORT_EMAIL = 'mika@salahealth.co'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meedopoe'

function clampInputValue(value: string) {
  const parsed = Number(value.replace(/,/g, ''))
  return Number.isFinite(parsed) ? Math.max(parsed, 0) : 0
}

function percentLabel(value: number) {
  return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}%`
}

function formatWholeNumber(value: number) {
  return Math.round(Math.max(value, 0)).toLocaleString('en-PH')
}

function rangeFillStyle(value: number, min: number, max: number): CSSProperties {
  const percent = Math.min(Math.max((value - min) / (max - min), 0), 1) * 100
  return { '--range-percent': `${percent}%` } as CSSProperties
}

export function LandingPage() {
  return (
    <PageShell ctaHref="/atomix/philhealth/report" ctaLabel="Estimate stuck PhilHealth cash">
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-5xl font-serif font-normal text-5xl leading-[1.05] tracking-tight text-[#0E1116] md:text-7xl">
            Kolekta <span className="text-[#0F4C4A]">agad</span> sa PhilHealth.
          </h1>

          <p className="mt-6 max-w-5xl font-serif text-4xl leading-[1.08] tracking-tight text-[#0F4C4A] md:text-6xl">
            Cleaner claims. Faster reimbursements. Less work.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#4A4D52] md:text-lg">
            Use Atomix to reduce returned claims, recover delayed reimbursements, and improve working capital tied up in
            PhilHealth collections.
          </p>

          <LandingCta />

          <ClaimsFlowAnimation />

          <ReturnedClaimsTeaser />

          <div className="mt-20">
            <h2 className="font-serif font-normal text-4xl leading-tight tracking-tight text-[#0E1116]">
              Three reasons revenue gets delayed or lost.
            </h2>

            <BreakdownCard rows={AVERAGE_HOSPITAL_BREAKDOWN} />
          </div>

          <LandingCta />
        </div>
      </section>
    </PageShell>
  )
}

function LandingCta() {
  return (
    <div className="mt-16 flex flex-col items-center text-center">
      <Link
        className="rounded-lg bg-[#0F4C4A] px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#166B68]"
        to="/atomix/philhealth/report"
      >
        Estimate the PhilHealth cash stuck in my pipeline →
      </Link>
      <div className="mt-3 text-sm text-[#878A8E]">Free · 30 seconds · No login required</div>
    </div>
  )
}

function ClaimsFlowAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const documents = [
    { name: 'Patient chart', meta: 'PDF' },
    { name: 'Physician note', meta: 'EMR' },
    { name: 'Lab results', meta: 'PDF' },
    { name: 'Hospital bill', meta: 'CSV' },
    { name: 'OR receipt', meta: 'Scan' },
    { name: 'Prescription', meta: 'Image' },
    { name: 'Discharge summary', meta: 'Doc' },
    { name: 'Nurse notes', meta: 'EMR' },
    { name: 'RVS worksheet', meta: 'Sheet' },
    { name: 'ICD-10 codes', meta: 'Table' },
    { name: 'HCI form', meta: 'PDF' },
    { name: 'EMR screenshot', meta: 'PNG' },
  ]
  const carouselDocuments = [...documents, ...documents]
  const issues = [
    {
      title: 'Supporting docs missing',
      description: 'Discharge summary not attached',
      tone: 'amber',
    },
    {
      title: 'ICD / procedure mismatch',
      description: 'Diagnosis code does not match billed procedure',
      tone: 'red',
    },
    {
      title: 'Circular rule issue',
      description: 'Coverage criteria needs review',
      tone: 'amber',
    },
    {
      title: 'Procedure not supported',
      description: 'Claim packet needs stronger documentation',
      tone: 'red',
    },
  ] as const
  const forms = [
    { code: 'CF1', label: 'Member and patient details' },
    { code: 'CF2', label: 'Provider and case details' },
    { code: 'CF4', label: 'Clinical summary' },
    { code: 'CSF', label: 'Claim signature form' },
    { code: 'EVID', label: 'Supporting evidence' },
  ]
  const showStepOne = scrollProgress > 0.03
  const showFirstConnector = scrollProgress > 0.2
  const showStepTwo = scrollProgress > 0.32
  const showSecondConnector = scrollProgress > 0.56
  const showStepThree = scrollProgress > 0.68
  const [resolvedIssues, setResolvedIssues] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let animationTimer: ReturnType<typeof setTimeout> | null = null
    const DURATION = 3000

    function startAnimation() {
      const start = performance.now()
      function tick(now: number) {
        const progress = Math.min((now - start) / DURATION, 1)
        setScrollProgress(progress)
        if (progress < 1) animationTimer = setTimeout(() => tick(performance.now()), 16)
      }
      tick(performance.now())
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      if (animationTimer !== null) clearTimeout(animationTimer)
    }
  }, [])

  useEffect(() => {
    if (!showStepTwo) {
      setResolvedIssues(0)
      return
    }

    const sequence = [0, 1, 2, 3, 4, 4]
    let sequenceIndex = 0
    setResolvedIssues(sequence[sequenceIndex])

    const interval = window.setInterval(() => {
      sequenceIndex = (sequenceIndex + 1) % sequence.length
      setResolvedIssues(sequence[sequenceIndex])
    }, 1200)

    return () => window.clearInterval(interval)
  }, [showStepTwo])

  return (
    <div className="relative left-1/2 mt-16 w-[100dvw] -translate-x-1/2 overflow-x-hidden bg-[#E6EFEE]/70 py-16" ref={sectionRef}>
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="mt-2 font-serif font-normal text-3xl leading-tight tracking-tight text-[#0E1116]">
              How Atomix Works With Your Hospital
            </h2>
          </div>
        </div>

        <div className="atomix-flow-grid">
          <FlowStage count="12+ document types" label="Step 1" title="Claim pack received" visible={showStepOne}>
            <div className="atomix-doc-carousel">
              <div className={`atomix-doc-track ${showStepOne ? 'is-visible' : ''}`}>
                {carouselDocuments.map((document, index) => (
                <div
                  className={`atomix-flow-card atomix-doc-card atomix-flow-reveal bg-[#FAFAF7] ${showStepOne ? 'is-visible' : ''}`}
                  key={`${document.name}-${index}`}
                  style={{ transitionDelay: `${Math.min(index, documents.length - 1) * 45}ms` }}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4E8E1] text-[#0F4C4A]">
                      <DocumentIcon />
                    </div>
                    <span className="rounded-full bg-[#E6EFEE] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0F4C4A]">
                      {document.meta}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#0E1116]">{document.name}</div>
                  <SkeletonLines />
                </div>
                ))}
              </div>
            </div>
          </FlowStage>

          <FlowConnector label="Atomix AI scans and reviews" visible={showFirstConnector} />

          <FlowStage count="Before submission" label="Step 2" title="Issues flagged" visible={showStepTwo}>
            <div className={`atomix-issue-grid ${showStepTwo ? 'is-active' : ''}`}>
              <span
                className={`atomix-issue-cursor atomix-issue-cursor-${Math.min(resolvedIssues, issues.length - 1)} ${
                  resolvedIssues >= issues.length ? 'is-hidden' : ''
                }`}
                aria-hidden="true"
              >
                <CursorIcon />
              </span>
              {issues.map((issue, index) => (
                <div
                  className={`atomix-flow-card atomix-issue-card atomix-flow-reveal flex gap-3 ${
                    showStepTwo ? 'is-visible' : ''
                  } ${
                    index < resolvedIssues ? 'is-resolved' : ''
                  } ${
                    issue.tone === 'amber'
                      ? 'border-[#E8A84A] bg-[#FDF0DC] text-[#8A4800]'
                      : 'border-[#D9627A] bg-[#FCEAED] text-[#7A2030]'
                  }`}
                  key={issue.title}
                  style={{ transitionDelay: `${index * 85}ms` }}
                >
                  <div className="atomix-issue-unresolved flex gap-3">
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                        issue.tone === 'amber' ? 'bg-[#B85C00]/10' : 'bg-[#9B2335]/10'
                      }`}
                    >
                      <AlertIcon />
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight">{issue.title}</div>
                      <div className="mt-1 text-xs leading-5 opacity-85">{issue.description}</div>
                    </div>
                  </div>
                  <div className="atomix-issue-resolved">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0F4C4A] text-white">
                      <CheckIcon />
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-tight text-[#0F4C4A]">Resolved</div>
                      <div className="mt-1 text-xs leading-5 text-[#4A4D52]">Issue cleared before submission</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FlowStage>

          <FlowConnector label="Issues resolved, forms generated" visible={showSecondConnector} />

          <FlowStage count="Full claim packet" label="Step 3" title="Completed PhilHealth forms" visible={showStepThree}>
            <div className="-mx-1 overflow-x-auto px-1 pb-2">
              <div className="flex min-w-max gap-3">
                {forms.map((form, index) => (
                  <div
                    className={`atomix-flow-card atomix-output-card atomix-flow-reveal w-40 shrink-0 bg-[#FAFAF7] sm:w-44 ${showStepThree ? 'is-visible' : ''}`}
                    key={form.code}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className="mb-3 inline-flex rounded-md bg-[#0F4C4A] px-3 py-1 text-xs font-bold tracking-[0.08em] text-white">
                      {form.code}
                    </div>
                    <div className="space-y-2 text-xs text-[#4A4D52]">
                      <div className="min-h-8 font-semibold leading-4 text-[#0E1116]">{form.label}</div>
                      <CompletedFormLines />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FlowStage>
        </div>
      </div>
    </div>
  )
}

function FlowStage({
  children,
  count,
  label,
  title,
  visible,
}: {
  children: ReactNode
  count: string
  label: string
  title: string
  visible: boolean
}) {
  return (
    <div className={`atomix-flow-stage ${visible ? 'is-visible' : ''}`}>
      <div className="mb-3 flex items-baseline gap-3">
        <span className="rounded-full bg-[#D4E8E1] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#0F4C4A]">
          {label}
        </span>
        <span className="font-serif text-xl text-[#0E1116]">{title}</span>
        <span className="ml-auto hidden text-xs text-[#878A8E] md:inline">{count}</span>
      </div>
      <div className={`atomix-stage-scan ${visible ? 'is-visible' : ''}`} />
      {children}
    </div>
  )
}

function FlowConnector({ label, visible }: { label: string; visible: boolean }) {
  return (
    <div className={`atomix-flow-connector ${visible ? 'is-visible' : ''}`}>
      <div className="atomix-connector-line">
        <span className="atomix-scan-beam" />
        <span className="atomix-particle atomix-particle-one" />
        <span className="atomix-particle atomix-particle-two" />
        <span className="atomix-particle atomix-particle-three" />
      </div>
      <div className="h-2 w-2 rounded-full bg-[#0F4C4A]" />
      <span className="absolute left-8 right-0 top-2 text-xs font-bold uppercase tracking-[0.08em] text-[#0F4C4A]">{label}</span>
    </div>
  )
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function CursorIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7 drop-shadow-md" fill="none" viewBox="0 0 28 28">
      <path d="M6 3.5 22.5 17 15.4 18.2 12.1 25 6 3.5Z" fill="#0F4C4A" stroke="white" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  )
}

function SkeletonLines() {
  return (
    <div className="mt-3 space-y-1.5">
      <div className="h-1 rounded-full bg-[#0E1116]/10" />
      <div className="h-1 w-3/4 rounded-full bg-[#0E1116]/10" />
      <div className="h-1 w-1/2 rounded-full bg-[#0E1116]/10" />
    </div>
  )
}

function CompletedFormLines() {
  return (
    <div className="space-y-2 border-t border-[#DED8CB] pt-3">
      <div className="grid grid-cols-[1fr_2fr] gap-2">
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/18" />
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/28" />
      </div>
      <div className="grid grid-cols-[1.5fr_1fr] gap-2">
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/20" />
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/30" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/18" />
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/24" />
        <div className="h-1.5 rounded-full bg-[#0F4C4A]/18" />
      </div>
      <div className="mt-3 h-1.5 w-4/5 rounded-full bg-[#0F4C4A]/24" />
    </div>
  )
}

export function ReportPage() {
  const [inputs, setInputs] = useState<HospitalEstimatorInputs>(DEFAULT_HOSPITAL_ESTIMATOR_INPUTS)
  const result = useMemo(() => calculateHospitalEstimator(inputs), [inputs])

  function updateInput(name: NumberInputName, value: string) {
    setInputs((current) => ({ ...current, [name]: clampInputValue(value) }))
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    updateInput(event.target.name as NumberInputName, event.target.value)
  }

  return (
    <PageShell ctaHref="/atomix/philhealth" ctaLabel="Back to home">
      <section className="px-6 pb-20 pt-8 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Link className="mb-6 inline-block text-sm font-medium text-[#4A4D52] transition hover:text-[#0F4C4A]" to="/atomix/philhealth">
            ← Back
          </Link>

          <div className="mb-8 max-w-4xl">
            <h1 className="font-serif font-normal text-4xl leading-tight tracking-tight text-[#0E1116] md:text-6xl">
              How much cash is stuck in your PhilHealth claims pipeline?
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-start">
            <InputsPanel
              inputs={inputs}
              onInputChange={handleInputChange}
            />

            <div className="space-y-8 lg:sticky lg:top-24">
              <EstimateSummary inputs={inputs} result={result} />
              <ConsultContactCard inputs={inputs} result={result} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function EstimateSummary({
  inputs,
  result,
}: {
  inputs: HospitalEstimatorInputs
  result: ReturnType<typeof calculateHospitalEstimator>
}) {
  const [activeExplanation, setActiveExplanation] = useState<string | null>(null)
  const costOfCapitalLabel = percentLabel(inputs.annualCostOfCapital)
  const daysAcceleratedLabel = `${formatWholeNumber(result.daysAccelerated)} days`
  const breakdownRows = [
    {
      label: 'Denied claims recovery',
      value: result.recoveredRevenue,
      explanation: (
        <>
          Annual PhilHealth claim value × denied claims rate × recovery rate.
          <br />
          {formatPhpCurrency(result.annualClaimValue)} × {percentLabel(inputs.deniedClaimsRate)} × 100%.
        </>
      ),
    },
    {
      label: 'RTH collection delay cost',
      value: result.returnToHospitalCost,
      explanation: (
        <>
          Annual PhilHealth claim value × RTH rate × annual cost of capital × days accelerated ÷ 365.
          <br />
          {formatPhpCurrency(result.annualClaimValue)} × {percentLabel(inputs.returnToHospitalRate)} ×{' '}
          {costOfCapitalLabel} × {daysAcceleratedLabel} ÷ 365.
        </>
      ),
    },
    {
      label: 'Reduced filing time',
      value: result.cashFlowValueFromFasterFiling,
      explanation: (
        <>
          Annual PhilHealth claim value × annual cost of capital × days accelerated ÷ 365.
          <br />
          {formatPhpCurrency(result.annualClaimValue)} × {costOfCapitalLabel} × {daysAcceleratedLabel} ÷ 365.
        </>
      ),
    },
  ]

  return (
    <div className="rounded-2xl border-2 border-[#0F4C4A] bg-white px-4 py-8 text-center shadow-[0_26px_70px_-32px_rgba(15,76,74,0.55)] ring-4 ring-[#0F4C4A]/10 sm:px-6 md:py-9">
      <h1 className="font-serif font-normal text-lg leading-tight tracking-tight text-[#0E1116] md:text-2xl">
        Atomix can recover
      </h1>
      <div className="mt-2 font-serif text-4xl leading-none tracking-tight text-[#0F4C4A] md:text-6xl">
        {formatPhpCurrency(result.totalAnnualValue)}
      </div>
      <div className="mt-2 text-base text-[#4A4D52]">per year, based on your inputs</div>
      <div className="mx-auto mt-4 max-w-2xl divide-y divide-[#DED8CB]/80 text-left">
        {breakdownRows.map((row) => (
          <div
            key={row.label}
            className="relative flex items-center justify-between gap-3 px-3 py-3"
            onMouseEnter={() => setActiveExplanation(row.label)}
            onMouseLeave={() => setActiveExplanation((current) => (current === row.label ? null : current))}
          >
            <button
              aria-expanded={activeExplanation === row.label}
              className="cursor-pointer appearance-none border-0 bg-transparent p-0 text-left text-xs font-bold uppercase tracking-[0.08em] text-[#878A8E] underline decoration-dotted underline-offset-4 transition hover:text-[#0F4C4A] focus:text-[#0F4C4A] focus:outline-none"
              onBlur={() => setActiveExplanation((current) => (current === row.label ? null : current))}
              onClick={() => setActiveExplanation((current) => (current === row.label ? null : row.label))}
              type="button"
            >
              {row.label}
            </button>
            <div className="shrink-0 text-base font-semibold text-[#0E1116] tabular-nums">{formatPhpCurrency(row.value)}</div>
            {activeExplanation === row.label ? (
              <div className="absolute left-3 right-3 top-[calc(100%+0.5rem)] z-30 rounded-lg border border-[#DED8CB] bg-[#0E1116] p-3 text-left text-xs font-medium normal-case leading-5 tracking-normal text-white shadow-xl">
                {row.explanation}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function PageShell({
  children,
  ctaHref,
  ctaLabel,
}: {
  children: ReactNode
  ctaHref: string
  ctaLabel: string
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#0E1116]">
      <header className="sticky top-0 z-10 border-b border-[#0E1116]/10 bg-[#FAF8F4]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
          <Link className="flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-[#0E1116]" to="/atomix/philhealth">
            <span className="h-2 w-2 rounded-full bg-[#0F4C4A]" />
            Atomix by Sala
          </Link>
          <Link className="text-sm font-semibold text-[#0E1116] transition hover:text-[#0F4C4A]" to={ctaHref}>
            {ctaLabel} →
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-[#0E1116]/10 px-6 py-8 text-center text-sm text-[#878A8E]">
        Atomix AI · PhilHealth revenue recovery estimator
      </footer>
    </div>
  )
}

function ReturnedClaimsTeaser() {
  return (
    <div className="mt-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="max-w-3xl font-serif font-normal text-4xl leading-tight tracking-tight text-[#0E1116]">
            Most PhilHealth collection delays start with the same few documentation gaps.
          </h2>
        </div>
        <div className="max-w-xs text-sm leading-6 text-[#4A4D52]">
          Atomix turns returned-claim patterns into a prioritized plan for cleaner claims and faster collection.
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#DED8CB] bg-white/80 p-7 shadow-[0_18px_45px_-30px_rgba(14,17,22,0.28)] md:p-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#0E1116]">Why claims get returned</h3>
            <p className="mt-1 text-sm text-[#6B7280]">Sample root causes from PhilHealth RTH notices</p>
          </div>
          <span className="rounded-full border border-[#DED8CB] bg-[#FAF8F4] px-4 py-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[#6B7280]">
            PH HCI sample · 2024
          </span>
        </div>

        <div className="space-y-5">
          {RETURNED_CLAIM_REASONS.slice(0, 3).map((reason) => (
            <div className="grid gap-3 md:grid-cols-[44px_minmax(0,1fr)_56px]" key={reason.code}>
              <span className="inline-flex h-6 w-11 items-center justify-center rounded-md bg-[#EAE6DC] text-xs font-bold tracking-[0.08em] text-[#6B7280]">
                {reason.code}
              </span>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-[#0E1116]">{reason.label}</div>
                    <div className="mt-0.5 text-sm leading-5 text-[#6B7280]">{reason.description}</div>
                  </div>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#EAE6DC]">
                  <div className="h-full rounded-full bg-[#C85F3F]" style={{ width: `${reason.percent}%` }} />
                </div>
              </div>
              <div className="text-right font-serif text-2xl leading-none text-[#0E1116]">{reason.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InputsPanel({
  inputs,
  onInputChange,
}: {
  inputs: HospitalEstimatorInputs
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_18px_45px_-28px_rgba(14,17,22,0.28)] md:p-10">
      <div>
        <h2 className="mt-3 font-serif font-normal text-2xl leading-tight tracking-tight text-[#0E1116] md:text-3xl">
          Enter your assumptions.
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#4A4D52]">
          The numbers below are illustrative defaults. Replace them with your hospital&apos;s own figures to estimate
          your potential collections upside.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        <div>
          <StepLabel number={1}>Revenue mix</StepLabel>
          <div className="mt-6 space-y-8 pl-0 md:pl-9">
            <CurrencyInput
              label={
                <>
                  Annual Gross Revenue <span className="font-normal text-[#878A8E]">(not net revenue)</span>
                </>
              }
              name="annualGrossRevenue"
              onChange={onInputChange}
              value={inputs.annualGrossRevenue}
            />
            <MetricSlider
              label="PhilHealth share of gross revenue"
              max={80}
              min={0}
              name="philHealthShareOfRevenue"
              onChange={onInputChange}
              step={1}
              value={inputs.philHealthShareOfRevenue}
              valueLabel={percentLabel(inputs.philHealthShareOfRevenue)}
            />
            <CurrencyInput
              label="Average PHIC total case rate"
              name="averageReimbursement"
              onChange={onInputChange}
              value={inputs.averageReimbursement}
            />
          </div>
        </div>

        <hr className="border-gray-200/70" />

        <div>
          <StepLabel number={2}>Leakage assumptions</StepLabel>
          <div className="mt-6 space-y-8 pl-0 md:pl-9">
            <MetricSlider
              label="Denied claims rate"
              max={25}
              min={0}
              name="deniedClaimsRate"
              onChange={onInputChange}
              value={inputs.deniedClaimsRate}
              valueLabel={percentLabel(inputs.deniedClaimsRate)}
            />
            <MetricSlider
              label="Returned-to-Hospital (RTH) rate"
              max={30}
              min={0}
              name="returnToHospitalRate"
              onChange={onInputChange}
              value={inputs.returnToHospitalRate}
              valueLabel={percentLabel(inputs.returnToHospitalRate)}
            />
            <MetricSlider
              label="Filing time — days from discharge to claim filed"
              max={90}
              min={0}
              name="filingTimeDays"
              onChange={onInputChange}
              step={1}
              value={inputs.filingTimeDays}
              valueLabel={`${inputs.filingTimeDays} days`}
            />
            <MetricSlider
              label="Annual cost of capital"
              max={30}
              min={0}
              name="annualCostOfCapital"
              onChange={onInputChange}
              value={inputs.annualCostOfCapital}
              valueLabel={percentLabel(inputs.annualCostOfCapital)}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200/70 pt-6 text-sm leading-5 text-[#878A8E]">
        Assumes a {HOSPITAL_ESTIMATOR_ASSUMPTIONS.targetFilingTimeDays}-day target filing time.
      </div>
    </div>
  )
}

function ConsultContactCard({
  inputs,
  result,
}: {
  inputs: HospitalEstimatorInputs
  result: ReturnType<typeof calculateHospitalEstimator>
}) {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    formData.set('_subject', 'Atomix PhilHealth collections consult request')
    formData.set('annualGrossRevenue', formatPhpCurrency(inputs.annualGrossRevenue))
    formData.set('philHealthShareOfGrossRevenue', percentLabel(inputs.philHealthShareOfRevenue))
    formData.set('averagePHICCaseRate', formatPhpCurrency(inputs.averageReimbursement))
    formData.set('deniedClaimsRate', percentLabel(inputs.deniedClaimsRate))
    formData.set('returnToHospitalRate', percentLabel(inputs.returnToHospitalRate))
    formData.set('filingTimeDays', `${inputs.filingTimeDays} days`)
    formData.set('annualCostOfCapital', percentLabel(inputs.annualCostOfCapital))
    formData.set('estimatedAnnualUpside', formatPhpCurrency(result.totalAnnualValue))

    setSubmissionState('submitting')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Formspree submission failed')
      }

      form.reset()
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
    }
  }

  return (
    <form
      className="rounded-2xl border border-[#0F4C4A]/20 bg-[#E6EFEE] p-7 shadow-[0_18px_45px_-30px_rgba(15,76,74,0.28)] md:p-8"
      onSubmit={handleSubmit}
    >
      <h2 className="font-serif font-normal text-2xl leading-tight tracking-tight text-[#0E1116] md:text-3xl">
        Why your claims get returned
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#4A4D52]">
        Atomix helps identify and fix the claim issues that delay and limit your collections, including:
      </p>
      <div className="mt-6">
        <ReportReturnedClaimsPreview />
      </div>
      <label className="mt-6 block">
        <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#878A8E]">Email address</span>
        <input
          className="mt-2 h-12 w-full rounded-lg border border-[#0F4C4A]/20 bg-white px-4 text-sm outline-none transition focus:border-[#0F4C4A] focus:ring-1 focus:ring-[#0F4C4A]"
          name="email"
          placeholder="finance@hospital.com"
          required
          type="email"
        />
      </label>
      <button
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#0F4C4A] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#166B68] disabled:cursor-not-allowed disabled:bg-[#7FA6A2]"
        disabled={submissionState === 'submitting'}
        type="submit"
      >
        {submissionState === 'submitting' ? 'Sending…' : 'Send consult request →'}
      </button>
      {submissionState === 'success' ? (
        <div className="mt-4 rounded-lg border border-[#0F4C4A]/20 bg-[#E6EFEE] px-4 py-3 text-sm font-medium text-[#0F4C4A]">
          Thanks. We&apos;ll reach out soon.
        </div>
      ) : null}
      {submissionState === 'error' ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Something went wrong. Please try again, or email {REPORT_EMAIL}.
        </div>
      ) : null}
    </form>
  )
}

function ReportReturnedClaimsPreview() {
  const visibleReasons = RETURNED_CLAIM_REASONS.slice(0, 3)

  return (
    <div className="overflow-hidden rounded-xl border border-[#DED8CB] bg-[#FAF8F4]/70">
      <div className="border-b border-[#DED8CB]/70 px-4 py-4">
        <div>
          <div className="text-sm font-semibold text-[#0E1116]">Your claims root-cause analysis</div>
        </div>
      </div>

      <div className="relative max-h-[230px] overflow-hidden px-4 py-4">
        <div className="space-y-4">
          {visibleReasons.map((reason) => (
            <div className="grid grid-cols-[38px_minmax(0,1fr)_72px] gap-3" key={reason.code}>
              <span className="inline-flex h-6 items-center justify-center rounded-md bg-[#EAE6DC] text-[11px] font-bold tracking-[0.08em] text-[#6B7280]">
                {reason.code}
              </span>
              <div>
                <div className="text-sm font-semibold leading-tight text-[#0E1116]">{reason.label}</div>
                <div className="mt-1 text-xs leading-5 text-[#6B7280]">{reason.description}</div>
              </div>
              <div className="text-right text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-[#878A8E]">
                In full report
              </div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF8F4] via-[#FAF8F4]/90 to-transparent" />
        <div className="absolute inset-x-4 bottom-4 rounded-lg border border-[#DED8CB] bg-white/95 px-4 py-3 text-center shadow-sm">
          <div className="text-sm font-semibold text-[#0E1116]">Contact us for your free report</div>
        </div>
      </div>
    </div>
  )
}

function BreakdownCard({
  rows,
}: {
  rows: readonly { label: string; description: string; color: string }[]
}) {
  return (
    <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_18px_45px_-28px_rgba(14,17,22,0.28)] md:p-10">
      <div className="space-y-6">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex items-start gap-4 ${index !== 0 ? 'border-t border-gray-100 pt-6' : ''}`}
          >
            <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${row.color}`} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[#0E1116]">{row.label}</div>
              <div className="mt-1 text-sm leading-5 text-[#878A8E]">{row.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StepLabel({ children, number }: { children: string; number: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6EFEE] text-sm font-bold text-[#0F4C4A]">
        {number}
      </div>
      <Eyebrow>{children}</Eyebrow>
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="text-sm font-bold uppercase tracking-[0.12em] text-[#878A8E]">{children}</div>
}

function CurrencyInput({
  helpText,
  label,
  name,
  onChange,
  value,
}: {
  helpText?: string
  label: ReactNode
  name: NumberInputName
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: number
}) {
  return (
    <label className="block">
      <span className="flex items-end justify-between gap-4">
        <span className="text-sm font-medium text-[#0E1116]">{label}</span>
        {helpText ? <span className="text-right text-xs italic text-[#878A8E]">{helpText}</span> : null}
      </span>
      <div className="mt-2 flex h-12 items-center rounded-lg border border-gray-200 bg-[#FAF8F4]/45 px-4 transition focus-within:border-[#0F4C4A] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#0F4C4A]">
        <span className="mr-2 text-sm font-semibold text-[#4A4D52]">₱</span>
        <input
          className="min-w-0 flex-1 border-0 bg-transparent text-sm font-medium tabular-nums outline-none"
          inputMode="numeric"
          min="0"
          name={name}
          onChange={onChange}
          type="text"
          value={formatWholeNumber(value)}
        />
      </div>
    </label>
  )
}

function MetricSlider({
  label,
  max,
  min,
  name,
  onChange,
  step = 0.1,
  value,
  valueLabel,
}: {
  label: string
  max: number
  min: number
  name: NumberInputName
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  step?: number
  value: number
  valueLabel: string
}) {
  return (
    <label className="block">
      <div className="mb-3 flex items-end justify-between gap-4">
        <span className="text-sm font-medium text-[#0E1116]">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-[#0F4C4A]">{valueLabel}</span>
      </div>
      <input
        className="estimator-range w-full"
        max={max}
        min={min}
        name={name}
        onChange={onChange}
        step={step}
        style={rangeFillStyle(value, min, max)}
        type="range"
        value={value}
      />
    </label>
  )
}
