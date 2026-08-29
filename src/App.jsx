import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowUpRight, Award, BarChart3, BriefcaseBusiness, CheckCircle2,
  ChevronRight, Code2, GraduationCap, Mail, MapPin, Menu, Moon, Network,
  Phone, ShieldCheck, Sparkles, Sun, Target, Users, X, Zap
} from 'lucide-react';

const CAREER = [
  {
    date: '2014 – 2018',
    title: 'Foundations — Learning How People & Systems Work',
    org: 'Education & UPSC foundation',
    text: 'Bachelor’s studies in Economics, Sociology and English Literature, followed by an MA in Rural Development and a UPSC-oriented foundation. This built a systems-oriented lens for people, policy and institutions.',
    metric: 'Systems thinking'
  },
  {
    date: 'Dec 2019 – Jan 2024',
    title: 'First Steps — Building Discipline in HR',
    org: 'Tricornio Technologies Pvt Ltd · HR Officer',
    text: 'Built HR fundamentals through employee records, payroll and statutory documentation. Maintained zero compliance deviations and earned Best Employee of the Year recognition.',
    metric: '4+ years of HR fundamentals'
  },
  {
    date: 'Jul 2024 – Jul 2025',
    title: 'Scaling Up — Multi-State Operations',
    org: 'Kasper Infrastructure Pvt Ltd · HR Manager & Project Coordinator',
    text: 'Led HR operations across 600+ employees on multi-state infrastructure projects and coordinated HR/operations for the Mahakumbh 2025 Tent City Project involving 200 luxury tents and multiple stakeholders.',
    metric: '600+ workforce'
  },
  {
    date: 'Jul 2025 – Oct 2025',
    title: 'Full Ownership — Running a Plant End to End',
    org: 'Kasper Engineering Pvt Ltd · Plant Manager, HR & Admin',
    text: 'Owned HR, administration, security, vendors, housekeeping and discipline at plant level — extending operational ownership beyond conventional HR responsibilities.',
    metric: 'End-to-end plant operations'
  },
  {
    date: 'Jan 2026 – Jun 2026',
    title: 'A Fast Rise — Trust Earned in Months',
    org: 'IG Strategic Systems Pvt Ltd (IG Defence)',
    text: 'Joined as HR Associate-II in January 2026, promoted to HR Associate-III in April and HR Lead in June — a rapid progression reflecting expanding responsibility and organisational trust.',
    metric: '3 role levels in 6 months'
  },
  {
    date: 'Aug 2026 – Present',
    title: 'Today — Where HR Meets Project Delivery',
    org: 'HR Lead + Project Delivery Department HOD · IG Defence',
    text: 'Leading HR and organisational policy while coordinating with Business Development on demos, trials, on-site delivery, ATP and client training for defence products.',
    metric: 'People + Delivery'
  }
];

const SKILLS = [
  ['HR Operations', 'End-to-end HR administration, workforce coordination and policy execution.'],
  ['Talent Acquisition', 'Hiring across niche technical, white-collar and blue-collar roles.'],
  ['Compliance & Governance', 'Statutory documentation, audit readiness, POSH and policy governance.'],
  ['Payroll & MIS', 'Payroll coordination, HR analytics, records and management reporting.'],
  ['Project Coordination', 'Demos, trials, product showcases, delivery, ATP and client training.'],
  ['Operations Management', 'Administration, facilities, security, vendors and movement control.'],
  ['Workforce Development', 'Training-led workforce models and repeatable operating systems.'],
  ['HR Technology & AI', 'HRMS implementation, automation and practical AI-in-HR exploration.']
];

const CERTS = [
  'Lean Six Sigma White Belt · CSSC', 'AI in HR · Keka Academy', 'POSH Certification · Keka Academy',
  'Crafting Payroll in India · Keka Academy', 'Compensation & Benefits · Keka Academy',
  'Employee Engagement Course · Keka Academy', 'People Analytics · Keka Academy',
  'Emergency Preparedness · Knights of Safety Academy'
];

const EDUCATION = [
  ['MBA, HR & Operations Management', 'LPU · 2026 · In progress'],
  ['MA, Rural Development', 'IGNOU · 2018'],
  ['BA, Economics, Sociology & English Literature', 'JU · 2016'],
  ['Diploma in Computer Application', 'MMYVV, M.P. · 2014']
];

const DASHBOARD = {
  People: { value: '600+', label: 'largest workforce managed', icon: Users, copy: 'Experience scaling people operations across multi-state infrastructure projects.' },
  Compliance: { value: '93%+', label: 'pre-deadline compliance level', icon: ShieldCheck, copy: 'Built audit-ready processes and pushed compliance from 30% to 93%+ at Kasper Infrastructure.' },
  Delivery: { value: '200', label: 'luxury tents coordinated', icon: Target, copy: 'Mahakumbh 2025 became an early bridge between HR operations and project delivery.' },
  Operations: { value: '11+', label: 'functional areas overseen', icon: Network, copy: 'Current HR leadership spans IT, Admin, TA, HR Operations, Governance, Payroll, Facilities, Security and more.' }
};

function Reveal({ children, className = '' }) {
  return <div className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${className}`}>{children}</div>;
}

function MovingDrone() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -right-16 top-28 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl glow-pulse" />
      <div className="absolute left-[8%] top-[26%] h-px w-[84%] bg-gradient-to-r from-transparent via-blue-400/25 to-transparent" />
      <div className="drone-track absolute left-0 top-[25%] w-full">
        <div className="drone-unit float-slow ml-[6vw] flex items-center gap-2 text-blue-500">
          <div className="relative h-7 w-12 rounded-full border border-blue-400/70 bg-slate-950/80 shadow-[0_0_30px_rgba(59,130,246,.35)]">
            <span className="absolute -left-2 top-2 h-2 w-2 rounded-full bg-blue-400" />
            <span className="absolute -right-2 top-2 h-2 w-2 rounded-full bg-blue-400" />
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[.25em] text-blue-300/60">delivery.signal</span>
        </div>
      </div>
      <div className="absolute bottom-16 right-10 text-[9px] font-mono tracking-[.35em] text-slate-400/40">PEOPLE · PROCESS · DELIVERY</div>
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);
  const [menu, setMenu] = useState(false);
  const [careerIndex, setCareerIndex] = useState(CAREER.length - 1);
  const [dashboardTab, setDashboardTab] = useState('People');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeCareer = CAREER[careerIndex];
  const dashboard = DASHBOARD[dashboardTab];
  const DashboardIcon = dashboard.icon;
  const navItems = ['Journey', 'Impact', 'Expertise', 'Projects', 'Education', 'Contact'];

  const years = useMemo(() => new Date().getFullYear() - 2019, []);

  return (
    <div className={dark ? 'dark' : ''}>
      <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#070b14] dark:text-slate-100">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b14]/80">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
            <a href="#home" className="flex items-center gap-3" onClick={() => setMenu(false)}>
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"><BriefcaseBusiness size={19} /></div>
              <div><div className="font-bold tracking-tight">Laxman Singh Jadon</div><div className="text-[10px] font-semibold uppercase tracking-[.2em] text-blue-600 dark:text-blue-400">HR · Operations · Delivery</div></div>
            </a>
            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">{item}</a>)}
            </nav>
            <div className="flex items-center gap-2">
              <a href="mailto:luckysingh0508.lsj@gmail.com" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-blue-300 hover:text-blue-600 sm:block dark:border-white/10 dark:hover:border-blue-500/50">Let's connect</a>
              <button aria-label="Toggle theme" onClick={() => setDark(!dark)} className="rounded-full border border-slate-200 p-2.5 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/10">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
              <button aria-label="Open menu" onClick={() => setMenu(!menu)} className="rounded-full border border-slate-200 p-2.5 lg:hidden dark:border-white/10">{menu ? <X size={18} /> : <Menu size={18} />}</button>
            </div>
          </div>
          {menu && <div className="border-t border-slate-200 bg-white px-5 py-5 dark:border-white/10 dark:bg-[#070b14] lg:hidden">{navItems.map((item) => <a onClick={() => setMenu(false)} key={item} href={`#${item.toLowerCase()}`} className="block py-2 font-medium">{item}</a>)}</div>}
        </header>

        <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-grid-pattern px-5 pb-20 pt-32 md:px-8">
          <MovingDrone />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" /> Currently leading HR + Project Delivery</div>
              <h1 className="max-w-5xl text-5xl font-black leading-[.98] tracking-[-.05em] md:text-7xl xl:text-8xl">A career built around <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">people, systems & purpose.</span></h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">HR Lead and Project Delivery Department HOD at IG Strategic Systems Pvt Ltd (IG Defence), bringing together people strategy, compliance discipline and hands-on delivery.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#journey" className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white shadow-xl transition hover:-translate-y-1 dark:bg-white dark:text-slate-950">Explore the journey <ArrowDown size={17} className="transition group-hover:translate-y-1" /></a>
                <a href="mailto:luckysingh0508.lsj@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 font-bold transition hover:-translate-y-1 hover:border-blue-400 dark:border-white/15 dark:bg-white/5">Contact <ArrowUpRight size={17} /></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><MapPin size={15} /> Greater Noida, India</span><span className="flex items-center gap-2"><Zap size={15} /> {years}+ years of professional experience since 2019</span></div>
            </Reveal>

            <Reveal className="hidden lg:block">
              <div className="relative mx-auto max-w-sm rounded-[2rem] border border-slate-200 bg-white/75 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/[.04]">
                <div className="mb-7 flex items-center justify-between"><span className="font-mono text-xs uppercase tracking-[.2em] text-slate-400">professional.system</span><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /></div>
                <div className="space-y-3 font-mono text-sm"><div className="rounded-xl bg-slate-950 p-4 text-slate-300 dark:bg-black/40"><span className="text-blue-400">role</span>: HR Lead + Project Delivery HOD</div><div className="rounded-xl bg-slate-100 p-4 dark:bg-white/5"><span className="text-blue-500">focus</span>: People → Process → Delivery</div><div className="rounded-xl bg-slate-100 p-4 dark:bg-white/5"><span className="text-blue-500">approach</span>: Train → Systemise → Scale</div><div className="rounded-xl bg-slate-100 p-4 dark:bg-white/5"><span className="text-blue-500">mindset</span>: Curious + rigorous</div></div>
                <div className="mt-7 grid grid-cols-2 gap-3"><div className="rounded-xl border border-slate-200 p-4 dark:border-white/10"><div className="text-2xl font-black">600+</div><div className="text-[10px] uppercase tracking-wider text-slate-400">workforce</div></div><div className="rounded-xl border border-slate-200 p-4 dark:border-white/10"><div className="text-2xl font-black">93%+</div><div className="text-[10px] uppercase tracking-wider text-slate-400">compliance</div></div></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="impact" className="border-y border-slate-200 bg-white px-5 py-8 dark:border-white/10 dark:bg-white/[.02] md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-4">
            {[['600+', 'employees managed'], ['93%+', 'compliance achieved'], ['200', 'luxury tents coordinated'], ['3', 'promotions in 6 months']].map(([n, l]) => <div key={l} className="border-l border-slate-200 pl-4 dark:border-white/10"><div className="text-2xl font-black md:text-3xl">{n}</div><div className="mt-1 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500 dark:text-slate-400">{l}</div></div>)}
          </div>
        </section>

        <section id="journey" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <Reveal><div className="mb-12 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-blue-600">01 · The Journey</p><h2 className="text-4xl font-black tracking-tight md:text-6xl">Every chapter added a new layer of scale.</h2><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">From understanding people and systems to leading HR and project delivery together.</p></div></Reveal>
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div className="space-y-2">{CAREER.map((item, i) => <button key={item.date} onClick={() => setCareerIndex(i)} className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${careerIndex === i ? 'border-blue-400 bg-blue-50 shadow-lg shadow-blue-500/10 dark:border-blue-400/40 dark:bg-blue-400/10' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'}`}><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${careerIndex === i ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,.7)]' : 'bg-slate-300 dark:bg-slate-700'}`} /><span><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">{item.date}</span><span className="mt-1 block font-bold">{item.title}</span></span><ChevronRight className={`ml-auto mt-1 transition ${careerIndex === i ? 'translate-x-1 text-blue-500' : 'text-slate-300'}`} size={17} /></button>)}</div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-white/[.035] md:p-10"><div className="flex items-center justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">{activeCareer.date}</div><h3 className="mt-3 text-2xl font-black md:text-4xl">{activeCareer.title}</h3><p className="mt-2 font-medium text-slate-500 dark:text-slate-400">{activeCareer.org}</p></div><div className="hidden rounded-2xl bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950 sm:block"><BriefcaseBusiness size={22} /></div></div><p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-300">{activeCareer.text}</p><div className="mt-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300"><CheckCircle2 size={15} /> {activeCareer.metric}</div></div>
          </div>
        </section>

        <section id="expertise" className="bg-slate-950 px-5 py-24 text-white dark:bg-black md:px-8">
          <div className="mx-auto max-w-7xl"><Reveal><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-blue-400">02 · Expertise</p><h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">The operating toolkit behind the work.</h2></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{SKILLS.map(([title, copy], i) => <div key={title} className="group rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-400/[.06]"><div className="mb-10 flex items-center justify-between"><span className="font-mono text-xs text-white/35">0{i + 1}</span><ArrowUpRight size={17} className="text-white/30 transition group-hover:text-blue-400" /></div><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p></div>)}</div></div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <Reveal><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-blue-600">03 · Interactive Impact Lab</p><h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">See the role from four operating angles.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">An interactive snapshot of the scale, governance and delivery responsibilities described in the CV.</p></Reveal>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-white/[.035]"><div className="flex flex-wrap border-b border-slate-200 dark:border-white/10">{Object.keys(DASHBOARD).map(tab => <button key={tab} onClick={() => setDashboardTab(tab)} className={`flex-1 px-5 py-4 text-sm font-bold transition ${dashboardTab === tab ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>{tab}</button>)}</div><div className="grid gap-10 p-7 md:grid-cols-[.7fr_1.3fr] md:p-12"><div><div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"><DashboardIcon size={27} /></div><div className="text-6xl font-black tracking-tight">{dashboard.value}</div><div className="mt-2 font-bold text-slate-500 dark:text-slate-400">{dashboard.label}</div></div><div className="flex flex-col justify-center"><div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[.2em] text-slate-400"><BarChart3 size={15} /> operating insight</div><p className="max-w-2xl text-xl leading-9 text-slate-700 dark:text-slate-200">{dashboard.copy}</p><div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full w-[78%] animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" /></div></div></div></div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl md:p-10"><div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider"><Target size={14} className="mr-2" /> Turning point</div><h3 className="text-3xl font-black">Building IG Defence's Production & Manufacturing function from scratch.</h3><p className="mt-5 max-w-3xl text-base leading-7 text-blue-100">The model shifted routine assembly toward a trained blue-collar workforce while reserving engineers for testing and quality control. The CV describes the outcome as a repeatable training system, sharply lower production costs and a workforce producing highly technical drones without compromising quality.</p></div><div className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[.035]"><Sparkles className="text-blue-500" /><h3 className="mt-5 text-xl font-black">Working principle</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Train the workforce. Systemise the process. Keep specialists focused where precision matters. Scale what works.</p></div></div>
        </section>

        <section id="education" className="border-y border-slate-200 bg-slate-100 px-5 py-24 dark:border-white/10 dark:bg-white/[.025] md:px-8">
          <div className="mx-auto max-w-7xl"><div className="grid gap-16 lg:grid-cols-2"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-blue-600">04 · Education & Credentials</p><h2 className="text-4xl font-black tracking-tight md:text-5xl">Formal learning, continuously connected to practice.</h2><div className="mt-10 space-y-4">{EDUCATION.map(([name, meta]) => <div key={name} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[.035]"><div className="mt-1 text-blue-600"><GraduationCap size={21} /></div><div><h3 className="font-bold">{name}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{meta}</p></div></div>)}</div></div><div><p className="mb-3 text-xs font-bold uppercase tracking-[.22em] text-blue-600">Certifications</p><div className="grid gap-3 sm:grid-cols-2">{CERTS.map(cert => <div key={cert} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold dark:border-white/10 dark:bg-white/[.035]"><Award size={17} className="mt-0.5 shrink-0 text-amber-500" />{cert}</div>)}</div><div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-6 dark:border-white/15"><div className="flex items-center gap-3"><Code2 size={19} className="text-blue-500" /><div><div className="font-bold">Beyond work</div><div className="mt-1 text-sm text-slate-500 dark:text-slate-400">Chess & puzzles · cinema & documentaries · badminton & cricket · coding & AI exploration</div></div></div></div></div></div></div>
        </section>

        <section id="contact" className="relative overflow-hidden px-5 py-28 md:px-8"><div className="absolute inset-0 bg-grid-pattern opacity-60" /><div className="relative mx-auto max-w-5xl text-center"><Reveal><p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-blue-600">05 · Connect</p><h2 className="text-5xl font-black tracking-[-.04em] md:text-7xl">People. Process. Delivery.<br /><span className="text-slate-400">Let's build what comes next.</span></h2><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">For professional conversations, opportunities or collaboration, reach out directly.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="mailto:luckysingh0508.lsj@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700"><Mail size={18} /> Email</a><a href="tel:+918383842382" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 font-bold dark:border-white/15"><Phone size={18} /> +91 83838 42382</a></div><div className="mt-8 text-sm text-slate-500">Greater Noida, India · English · Hindi</div></Reveal></div></section>

        <footer className="border-t border-slate-200 px-5 py-8 dark:border-white/10 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Laxman Singh Jadon</span><span>A journey through people, policy and purpose.</span></div></footer>

        {showTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="fixed bottom-6 right-6 z-40 rounded-full bg-slate-950 p-3 text-white shadow-2xl dark:bg-white dark:text-slate-950"><ArrowUp size={18} /></button>}
      </main>
    </div>
  );
}

export default App;
