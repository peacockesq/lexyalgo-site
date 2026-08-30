export type ServiceCard = {
  title: string
  constraint: string
  output: string
  tags: string[]
  href: string
}

export type ProcessStep = {
  step: string
  title: string
  copy: string
}

export type TemplateCard = {
  title: string
  href: string
  eyebrow: string
  promise: string
  modules: string[]
  primaryCta: string
}

export const agencyTokens = {
  color: {
    primary: '#4F46E5',
    canvas: '#F7F9FC',
    surface: '#FFFFFF',
    surfaceMuted: '#EEF3F8',
    ink: '#0B1020',
    text: '#182033',
    textMuted: '#596579',
    border: '#D8E1EC',
    borderStrong: '#B8C7D9',
    accentHover: '#3730A3',
    accentSoft: '#E9E7FF',
    cyan: '#0EA5E9',
    cyanSoft: '#E6F6FE',
    proofPanel: '#0A0F1F',
    proofPanelRaised: '#111B33',
    proofBorder: '#253250',
    proofText: '#F8FAFC',
    proofTextMuted: '#AEBBD0',
    warning: '#A15C07',
    warningSoft: '#FFF4DA',
    danger: '#B42318',
  },
  radius: {
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1.125rem',
    panel: '1.5rem',
  },
  shadow: {
    card: '0 16px 40px rgba(25,42,70,.10)',
    panel: '0 24px 80px rgba(79,70,229,.22)',
  },
} as const

export const proofStrip = [
  { label: 'CPA', detail: 'Judged against qualified demand, not raw form volume.' },
  { label: 'CRM', detail: 'Lead-quality feedback belongs in the operating loop.' },
  { label: 'AI', detail: 'Visibility is measured by documented method.' },
  { label: 'Tests', detail: 'Offers, pages, queries, and budget decisions move together.' },
]

export const services: ServiceCard[] = [
  {
    title: 'Paid Media / SEM',
    constraint: 'Spend is moving but qualified demand is not clear.',
    output: 'Campaign, query, page, and CRM feedback loops managed against economics.',
    tags: ['Search terms', 'Intent tiers', 'Qualified leads'],
    href: '/internal/legal-growth-os/templates#paid-media',
  },
  {
    title: 'AI Search / SEO',
    constraint: 'Buyers and answer engines do not find the right proof.',
    output: 'Commercial query maps, entity cleanup, citation gaps, and visibility scans.',
    tags: ['AI answers', 'Entity signals', 'Commercial pages'],
    href: '/internal/legal-growth-os/templates#ai-search',
  },
  {
    title: 'Creative + Landing Pages',
    constraint: 'Ad intent and page promise are not aligned tightly enough.',
    output: 'Offer clarity, proof-safe page modules, and measurable landing-page tests.',
    tags: ['CRO', 'Offer tests', 'Message fit'],
    href: '/internal/legal-growth-os/templates#landing-pages',
  },
  {
    title: 'Analytics / Attribution',
    constraint: 'Dashboards show activity but not operating decisions.',
    output: 'UTMs, events, CRM lifecycle states, and decision-grade reporting hygiene.',
    tags: ['UTM governance', 'Events', 'Dashboards'],
    href: '/internal/legal-growth-os/templates#analytics',
  },
  {
    title: 'Agency OS / Automation',
    constraint: 'Manual handoffs slow follow-up and hide signal.',
    output: 'Automation, routing, alerts, and feedback capture across the acquisition system.',
    tags: ['Workflows', 'Routing', 'Feedback'],
    href: '/internal/legal-growth-os/templates#automation',
  },
  {
    title: 'Growth Diagnostic',
    constraint: 'The next move is unclear and the budget risk is real.',
    output: 'A constraint map, evidence summary, next action, and claim-risk notes.',
    tags: ['Constraint map', 'Evidence', 'Next decision'],
    href: '#diagnostic',
  },
]

export const processSteps: ProcessStep[] = [
  { step: '01', title: 'Diagnose', copy: 'Name the acquisition constraint before prescribing channels.' },
  { step: '02', title: 'Instrument', copy: 'Make tracking, source data, and lead-quality feedback trustworthy enough to use.' },
  { step: '03', title: 'Build', copy: 'Create the pages, campaigns, automations, and scorecards the loop requires.' },
  { step: '04', title: 'Launch', copy: 'Ship controlled tests with clean UTMs, events, and decision rules.' },
  { step: '05', title: 'Measure', copy: 'Read qualified demand, caveats, and spend signals together.' },
  { step: '06', title: 'Iterate', copy: 'Move budget and effort toward the constraint that evidence supports.' },
]

export const templateCards: TemplateCard[] = [
  {
    title: 'Core services overview',
    href: '/internal/legal-growth-os/templates#services-overview',
    eyebrow: 'Acquisition system services',
    promise: 'Services built around the acquisition constraint.',
    modules: ['Constraint selector', 'Service grid', 'Comparison table', 'Operating loop', 'Diagnostic CTA'],
    primaryCta: 'Find the Constraint',
  },
  {
    title: 'AI Search / GEO / SEO',
    href: '/internal/legal-growth-os/templates#ai-search',
    eyebrow: 'AI search + commercial SEO',
    promise: 'Be visible where buyers and AI systems build the shortlist.',
    modules: ['Pain cards', 'Visibility scan', 'Commercial query map', 'Proof-safe case card'],
    primaryCta: 'Run an AI Visibility Scan',
  },
  {
    title: 'SEM / paid media management',
    href: '/internal/legal-growth-os/templates#paid-media',
    eyebrow: 'Paid media + lead-quality measurement',
    promise: 'Paid media managed against qualified demand, not dashboard comfort.',
    modules: ['Intent stack', 'Search-term leak table', 'Measurement panel', 'Service scope'],
    primaryCta: 'Request a Paid Media Review',
  },
  {
    title: 'Landing pages + CRO',
    href: '/internal/legal-growth-os/templates#landing-pages',
    eyebrow: 'Landing-page conversion systems',
    promise: 'Turn ad intent into a page experience that can be measured.',
    modules: ['Offer clarity', 'Proof fit', 'Friction reduction', 'Experiment plan'],
    primaryCta: 'Get a Landing Page Teardown',
  },
  {
    title: 'Analytics / attribution / tracking',
    href: '/internal/legal-growth-os/templates#analytics',
    eyebrow: 'Decision-grade measurement',
    promise: 'Make source, event, and lead-quality data usable for budget decisions.',
    modules: ['Tracking map', 'Event taxonomy', 'CRM feedback', 'Dashboard hygiene'],
    primaryCta: 'Audit Tracking Confidence',
  },
  {
    title: 'Automation / Agency OS',
    href: '/internal/legal-growth-os/templates#automation',
    eyebrow: 'Marketing automation + Agency OS',
    promise: 'Keep follow-up, routing, and feedback loops from depending on memory.',
    modules: ['Routing rules', 'Nurture paths', 'Alerts', 'Ops scorecard'],
    primaryCta: 'Map the Automation Loop',
  },
]

export const faqs = [
  {
    question: 'What if spend is too small for signal?',
    answer: 'The diagnostic still maps the likely constraint, but decisions are framed as instrumentation and test-readiness before any aggressive budget move.',
  },
  {
    question: 'How fast can a diagnostic move?',
    answer: 'The shell presents a focused intake path: current acquisition problem, systems involved, tracking confidence, and page/offer clarity.',
  },
  {
    question: 'What access is usually needed?',
    answer: 'Ad accounts, analytics, landing-page/CMS access, CRM lifecycle fields, and any existing call or consult-quality feedback.',
  },
  {
    question: 'How is confidentiality handled?',
    answer: 'The template avoids client-identifying proof and numeric outcomes until evidence source, redaction, claim risk, and approval are complete.',
  },
]
