// All portfolio content lives here so it can be updated without touching layout code.

export const PROFILE = {
  name: 'Laxman Singh Jadon',
  short: 'LSJ',
  role: 'HR Lead + Project Delivery HOD',
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
    when: '2014–2018', tag: 'Foundations', title: 'Learning how people & systems work',
    where: 'BA · MA Rural Development · UPSC preparation', scope: 1, scopeLabel: 'Learning',
    body: 'The story begins with a broad academic foundation rather than a conventional HR path. A BA spanning Economics, Sociology and English Literature, followed by an MA in Rural Development and a UPSC-oriented preparation phase, built an interest in how people, institutions, policy and systems interact.',
    why: 'It established the lens that stayed: organisations are human systems shaped by incentives, institutions, policy and behaviour.',
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
    body: 'Joined as HR Associate-II in January 2026, promoted to HR Associate-III in April and to HR Lead by June — the fastest progression of the journey, built on the discipline of every earlier chapter.',
    why: 'It showed that earlier operating discipline translates into accelerated responsibility in a fast-moving technology environment.',
  },
  {
    when: 'Aug 2026–Present', tag: 'Convergence', title: 'Where HR meets project delivery',
    where: 'HR Lead + Project Delivery HOD · IG Defence', scope: 6, scopeLabel: 'HR + Delivery',
    body: 'Project Delivery Department HOD responsibility added alongside HR Lead. Hiring, HR policy and governance, payroll and compliance, facilities, security and vendors on one side — demos, TEC, trials, on-site delivery, ATP and client training on the other.',
    why: 'Every thread meets here: people systems and project execution, both required to deliver the outcome.',
  },
];

export const LADDER = [
  { month: 'Jan 2026', title: 'HR Associate-II', note: 'Joined IG Defence' },
  { month: 'Apr 2026', title: 'HR Associate-III', note: 'First promotion' },
  { month: 'Jun 2026', title: 'HR Lead', note: 'Leading the HR function' },
  { month: 'Aug 2026', title: '+ Project Delivery HOD', note: 'Second department added' },
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
  { year: '2026', title: 'MBA — HR & Operations Management', where: 'LPU · In progress' },
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
