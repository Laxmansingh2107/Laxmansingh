// All portfolio content lives here so it can be updated without touching layout code.

export const PROFILE = {
  name: 'Laxman Singh Jadon',
  short: 'LSJ',
  role: 'HR Lead · IG Defence',
  org: 'IG Strategic Systems Pvt Ltd (IG Defence)',
  location: 'Greater Noida, India',
  email: 'luckysingh0508.lsj@gmail.com',
  phone: '+918383842382',
  phoneDisplay: '+91 83838 42382',
  languages: 'English · Hindi',
};

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'impact', label: 'Impact' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'education', label: 'Education' },
  { id: 'beyond', label: 'Beyond Work' },
  { id: 'contact', label: 'Contact' },
];

// scope = relative size of responsibility (1–6), used only to draw the growth staircase.
export const CAREER = [
  {
    when: '2014–2018', tag: 'Foundations', title: 'The civil services years',
    where: 'Serious UPSC aspirant · BA · MA Rural Development', scope: 1, scopeLabel: 'Learning',
    body: 'The plan was never HR at first — it was the UPSC civil services, pursued as a serious aspirant. A BA in Economics, Sociology and English Literature and an MA in Rural Development were chosen with that goal in mind, and the preparation meant long hours with polity, governance, economics and public administration: how laws are written, how institutions run, and how policy lands on real people.',
    why: 'The exam path gave way to HR, but the preparation never went to waste: a discipline for long, structured effort, and a public-service instinct to see the person behind every process.',
  },
  {
    when: 'Dec 2019–Jan 2024', tag: 'First Steps', title: 'Building discipline in HR',
    where: 'Tricornio Technologies · HR Officer', scope: 2, scopeLabel: 'One company',
    body: 'Mastering the fundamentals that keep an organisation dependable: employee records, payroll coordination and statutory documentation. Four years of disciplined execution, zero compliance deviations, and recognition as Best Employee of the Year.',
    why: 'It created the reliability layer: accurate records, payroll and compliance are the infrastructure employee trust is built on.',
  },
  {
    when: 'Jul 2024–Jul 2025', tag: 'Scaling Up', title: 'From HR to multi-state operations',
    where: 'Kasper Infrastructure · HR Manager & Project Coordinator', scope: 4, scopeLabel: '600+ people',
    body: 'Workforce systems across 600+ employees and multiple project sites — recruitment, deployment, attendance, documentation and compliance working consistently across very different locations. The Mahakumbh 2025 Tent City Project put HR and live project delivery side by side for the first time.',
    why: 'It introduced scale and project reality: workforce decisions now had to keep a live delivery environment running.',
  },
  {
    when: 'Jul 2025–Oct 2025', tag: 'Full Ownership', title: 'Running a plant end to end',
    where: 'Kasper Engineering · Plant Manager, HR & Admin', scope: 4.5, scopeLabel: 'A whole plant',
    body: 'Responsibility extended beyond HR into administration, security, vendors, housekeeping and discipline at plant level — a compressed lesson in how the whole operating environment holds together.',
    why: 'It broadened the lens from one function to the whole system — people, security, vendors and facilities all shaping execution.',
  },
  {
    when: 'Jan 2026–Jun 2026', tag: 'Fast Rise', title: 'Trust earned in months',
    where: 'IG Strategic Systems · IG Defence', scope: 5, scopeLabel: 'HR Lead',
    body: 'Joined as HR Associate-II and took charge of compliance first, closing every outstanding PF, ESIC and NOC matter with the team, then moved into factory HR operations. Promoted to HR Associate-III in April: HR operations, recruitment, factory administration, security and movement protocols, facility management, cafeteria and pantry planning, and every visit from high-profile delegations to routine ones. HR Lead by June, with the corporate side added: end-to-end HR and operations, a 12-member team reporting directly, sole point of contact for service-provider vendors, and close support to audit and legal teams.',
    why: 'Each step came from taking on what the organisation needed — and never alone: always with support, and often supporting others.',
  },
  {
    when: 'Aug 2026–Present', tag: 'Convergence', title: 'Where HR meets project delivery',
    where: 'HR Lead · IG Defence (additional charge: Project Delivery)', scope: 6, scopeLabel: 'HR + Delivery + MRO',
    body: 'Stepping in on an important production task that was outside the role, and contributing to the Production & Manufacturing setup, led to the Project Delivery portfolio as an additional charge — demos, TEC, trials, on-site delivery, ATP and client training. It has since expanded to MRO (Maintenance, Repair & Operations), with a new MRO vertical now being set up within PD, planned to grow into a separate, recurring source of revenue.',
    why: 'Every thread meets here: people systems and project execution, both required to deliver the outcome.',
  },
];

export const LADDER = [
  { month: 'Jan 2026', title: 'HR Associate-II', note: 'Cleared the compliance backlog' },
  { month: 'Apr 2026', title: 'HR Associate-III', note: 'Factory HR, admin & security' },
  { month: 'Jun 2026', title: 'HR Lead', note: 'End-to-end HR · team of 12' },
  { month: 'Aug 2026', title: '+ Project Delivery & MRO', note: 'Building a new vertical' },
];

export const COMPLIANCE = [
  { label: 'Starting point', value: 30 },
  { label: 'Before deadline', value: 93 },
  { label: 'By project close', value: 100 },
];

export const FUNCTIONS = [
  'Talent Acquisition', 'HR Operations', 'Policy & Governance', 'Payroll & Compliance',
  'IT', 'Administration', 'Facility Management', 'Asset Management',
  'Security & Movement', 'Housekeeping', 'Kitchen & Cafeteria', 'Vendor Teams',
];

export const DELIVERY_FLOW = [
  { step: 'Hire', text: 'Technical, white-collar & blue-collar talent' },
  { step: 'Train', text: 'Repeatable, training-led workforce models' },
  { step: 'Govern', text: 'Policy, SOPs, payroll & statutory compliance' },
  { step: 'Demo & Trial', text: 'With Business Development: demos, TEC, trials' },
  { step: 'Deliver & ATP', text: 'On-site delivery, testing & acceptance' },
  { step: 'Enable Client', text: 'Post-delivery client training & support' },
];

export const SKILLS = [
  ['HR Operations', 'End-to-end HR administration, workforce coordination and policy execution.'],
  ['Talent Acquisition', 'Hiring across technical, white-collar and blue-collar roles.'],
  ['Compliance & Governance', 'Statutory documentation, audit readiness, POSH and policy governance.'],
  ['Payroll & MIS', 'Payroll coordination, HR analytics, records and management reporting.'],
  ['Project Coordination', 'Demos, trials, product showcases, delivery, ATP and client training.'],
  ['Operations Management', 'Administration, facilities, security, vendors and movement control.'],
  ['Workforce Development', 'Training-led workforce models and repeatable operating systems.'],
  ['HR Technology & AI', 'HRMS implementation, automation and practical AI-in-HR exploration.'],
];

export const EDU = [
  { year: '2014', title: 'Diploma in Computer Application', where: 'MMYVV, M.P.' },
  { year: '2016', title: 'BA — Economics, Sociology & English Literature', where: 'JU' },
  { year: '2018', title: 'MA — Rural Development', where: 'IGNOU' },
  { year: '2026', title: 'MBA — HR & Operations Management', where: 'LPU · Completed' },
];

export const CERTS = [
  ['Lean Six Sigma White Belt', 'CSSC'],
  ['AI in HR', 'Keka Academy'],
  ['POSH Certification', 'Keka Academy'],
  ['Crafting Payroll in India', 'Keka Academy'],
  ['Compensation & Benefits', 'Keka Academy'],
  ['Employee Engagement', 'Keka Academy'],
  ['People Analytics', 'Keka Academy'],
  ['Emergency Preparedness', 'Knights of Safety Academy'],
];

export const BEYOND = [
  ['Chess & Puzzles', 'Thinking several moves ahead — the same habit that plans a workforce.'],
  ['Cinema & Documentaries', 'Stories about people, systems and the choices that shape them.'],
  ['Badminton & Cricket', 'Team rhythm, quick decisions and playing the long game.'],
  ['Coding & AI', 'Curiosity about automation and making HR work smarter.'],
];

// Short classic quotes (public-domain sources / long-established attributions).
export const QUOTES = {
  journey: { text: 'No man ever steps in the same river twice, for it is not the same river and he is not the same man.', by: 'Heraclitus' },
  impact: { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', by: 'Will Durant, on Aristotle' },
  cases: { text: 'The impediment to action advances action. What stands in the way becomes the way.', by: 'Marcus Aurelius, Meditations' },
  expertise: { text: 'You have a right to your actions, but never to the fruits of your actions.', by: 'Bhagavad Gita 2.47' },
  education: { text: 'Arise, awake, and stop not till the goal is reached.', by: 'Swami Vivekananda' },
  beyond: { text: 'A journey of a thousand miles begins with a single step.', by: 'Lao Tzu' },
};
