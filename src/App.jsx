import React, { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowUpRight, Award, BarChart3, BriefcaseBusiness, CheckCircle2,
  ChevronRight, Code2, GraduationCap, Mail, MapPin, Menu, Moon, Network,
  Phone, ShieldCheck, Sparkles, Sun, Target, Users, X, Zap
} from 'lucide-react';

const CAREER = [
  ['2014 – 2018', 'Foundations', 'Learning How People & Systems Work', 'Education & UPSC foundation', 'BA in Economics, Sociology and English Literature, followed by MA in Rural Development and a UPSC-oriented foundation. A systems-oriented lens for people, policy and institutions.'],
  ['Dec 2019 – Jan 2024', 'First Steps', 'Building Discipline in HR', 'Tricornio Technologies Pvt Ltd · HR Officer', 'Built HR fundamentals through employee records, payroll and statutory documentation. Maintained zero compliance deviations and earned Best Employee of the Year recognition.'],
  ['Jul 2024 – Jul 2025', 'Scaling Up', 'From HR to Multi-State Operations', 'Kasper Infrastructure Pvt Ltd · HR Manager & Project Coordinator', 'Led HR operations across 600+ employees on multi-state infrastructure projects and coordinated HR/operations for the Mahakumbh 2025 Tent City Project involving 200 luxury tents and multiple stakeholders.'],
  ['Jul 2025 – Oct 2025', 'Full Ownership', 'Running a Plant End to End', 'Kasper Engineering Pvt Ltd · Plant Manager, HR & Admin', 'Owned HR, administration, security, vendors, housekeeping and discipline at plant level — extending operational ownership beyond conventional HR responsibilities.'],
  ['Jan 2026 – Jun 2026', 'Fast Rise', 'Trust Earned in Months', 'IG Strategic Systems Pvt Ltd (IG Defence)', 'Joined as HR Associate-II in January 2026, promoted to HR Associate-III in April and HR Lead in June — three role levels in six months.'],
  ['Aug 2026 – Present', 'Today', 'Where HR Meets Project Delivery', 'HR Lead + Project Delivery Department HOD · IG Defence', 'Leading HR and organisational policy while coordinating with Business Development on demos, trials, on-site delivery, ATP and client training for defence products.']
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

const IMPACT = {
  People: ['600+', 'largest workforce managed', Users, 'Experience scaling people operations across multi-state infrastructure projects.'],
  Compliance: ['93%+', 'pre-deadline compliance level', ShieldCheck, 'Built audit-ready processes and pushed compliance from 30% to 93%+ at Kasper Infrastructure.'],
  Delivery: ['200', 'luxury tents coordinated', Target, 'Mahakumbh 2025 became an early bridge between HR operations and project delivery.'],
  Operations: ['11+', 'functional areas overseen', Network, 'Current HR leadership spans IT, Admin, Talent Acquisition, HR Operations, Governance, Payroll, Facilities, Security and more.']
};

function RelicHammer({ powered, onClick }) {
  return (
    <button onClick={onClick} aria-label="Activate career quest mode" className={`relic-wrap ${powered ? 'relic-powered' : ''}`}>
      <span className="relic-spark spark-a" /><span className="relic-spark spark-b" /><span className="relic-spark spark-c" />
      <span className="relic-hammer"><span className="hammer-head" /><span className="hammer-handle" /><span className="hammer-grip" /></span>
      <span className="relic-label">{powered ? 'POWER MODE' : 'CAREER QUEST'}</span>
    </button>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [careerIndex, setCareerIndex] = useState(5);
  const [impactTab, setImpactTab] = useState('People');
  const [powered, setPowered] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const impact = IMPACT[impactTab];
  const ImpactIcon = impact[2];
  const active = CAREER[careerIndex];
  const nav = ['Journey', 'Impact', 'Expertise', 'Projects', 'Education', 'Contact'];

  return (
    <div className={dark ? 'dark' : ''}>
      <main className="min-h-screen overflow-x-hidden bg-[#f7f8fb] text-slate-950 transition-colors duration-500 dark:bg-[#070b12] dark:text-white">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b12]/85">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
            <a href="#home" className="flex items-center gap-3" onClick={() => setMenu(false)}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><BriefcaseBusiness size={18} /></span>
              <span><b className="block text-sm">Laxman Singh Jadon</b><small className="block text-[9px] font-bold uppercase tracking-[.2em] text-blue-600 dark:text-blue-400">HR · Operations · Delivery</small></span>
            </a>
            <nav className="hidden gap-7 lg:flex">{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400">{item}</a>)}</nav>
            <div className="flex items-center gap-2">
              <a href="mailto:luckysingh0508.lsj@gmail.com" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-bold sm:block dark:border-white/10">Let's connect</a>
              <button aria-label="Toggle theme" onClick={() => setDark(!dark)} className="rounded-full border border-slate-200 p-2.5 dark:border-white/10">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
              <button aria-label="Toggle navigation" onClick={() => setMenu(!menu)} className="rounded-full border border-slate-200 p-2.5 lg:hidden dark:border-white/10">{menu ? <X size={18} /> : <Menu size={18} />}</button>
            </div>
          </div>
          {menu && <div className="border-t border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-[#070b12] lg:hidden">{nav.map(item => <a onClick={() => setMenu(false)} key={item} href={`#${item.toLowerCase()}`} className="block py-2 font-semibold">{item}</a>)}</div>}
        </header>

        <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28 md:px-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-70" />
          <div className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div className="hero-reveal">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[.18em] text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" /> HR Lead + Project Delivery HOD</div>
              <h1 className="max-w-5xl text-5xl font-black leading-[.96] tracking-[-.055em] sm:text-6xl md:text-7xl xl:text-[82px]">People. Systems. <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">Purpose.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 md:text-xl">A professional journey from HR fundamentals and multi-state operations to leading HR and project delivery for a defence technology organisation.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a href="#journey" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white shadow-xl hover:-translate-y-1 dark:bg-white dark:text-slate-950">Explore the journey <ArrowDown size={17} /></a><a href="mailto:luckysingh0508.lsj@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 font-bold hover:border-blue-400 dark:border-white/15">Contact <ArrowUpRight size={17} /></a></div>
              <div className="mt-9 flex flex-wrap gap-6 text-sm text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><MapPin size={15} /> Greater Noida, India</span><span className="flex items-center gap-2"><Zap size={15} /> 6+ years since 2019</span></div>
            </div>
            <div className="relative min-h-[380px]">
              <div className="hero-card absolute inset-x-4 top-8 rounded-[2rem] border border-slate-200 bg-white/80 p-7 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/[.045]">
                <div className="mb-6 flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.25em] text-slate-400">career.quest / current</span><span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500"><i className="h-2 w-2 rounded-full bg-emerald-400" /> ONLINE</span></div>
                <div className="rounded-2xl bg-slate-950 p-5 text-white dark:bg-black/50"><div className="text-xs uppercase tracking-wider text-blue-300">Current role</div><div className="mt-2 text-2xl font-black">HR Lead</div><div className="text-sm text-slate-400">+ Project Delivery Department HOD</div></div>
                <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-slate-200 p-5 dark:border-white/10"><b className="text-3xl">600+</b><small className="mt-1 block text-[10px] uppercase tracking-wider text-slate-400">workforce</small></div><div className="rounded-2xl border border-slate-200 p-5 dark:border-white/10"><b className="text-3xl">93%+</b><small className="mt-1 block text-[10px] uppercase tracking-wider text-slate-400">compliance</small></div></div>
              </div>
              <RelicHammer powered={powered} onClick={() => setPowered(!powered)} />
            </div>
          </div>
        </section>

        <section id="impact" className="border-y border-slate-200 bg-white px-5 py-8 dark:border-white/10 dark:bg-white/[.02] md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 md:grid-cols-4">{[['600+', 'employees managed'], ['93%+', 'compliance achieved'], ['200', 'luxury tents coordinated'], ['3', 'promotions in 6 months']].map(([n,l]) => <div key={l} className="border-l border-slate-200 pl-4 dark:border-white/10"><div className="text-2xl font-black md:text-3xl">{n}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">{l}</div></div>)}</div>
        </section>

        <section id="journey" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-600">01 · The Journey</p><h2 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Six chapters. One operating philosophy.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">Every move added another dimension: people, compliance, scale, ownership and delivery.</p>
          <div className="mt-12 grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
            <div className="space-y-2">{CAREER.map((item,i) => <button key={item[0]} onClick={() => setCareerIndex(i)} className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition ${careerIndex===i ? 'border-blue-400 bg-blue-50 shadow-lg shadow-blue-500/10 dark:border-blue-400/40 dark:bg-blue-400/10' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'}`}><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${careerIndex===i ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,.7)]' : 'bg-slate-300 dark:bg-slate-700'}`} /><span className="min-w-0"><span className="block text-[10px] font-black uppercase tracking-wider text-slate-400">{item[0]}</span><span className="mt-1 block font-black">{item[1]} <span className="font-medium text-slate-500">— {item[2]}</span></span></span><ChevronRight size={17} className={`ml-auto mt-1 shrink-0 ${careerIndex===i ? 'text-blue-500' : 'text-slate-300'}`} /></button>)}</div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl dark:border-white/10 dark:bg-white/[.035] md:p-10"><span className="text-xs font-black uppercase tracking-[.2em] text-blue-600">{active[0]}</span><h3 className="mt-3 text-3xl font-black md:text-5xl">{active[2]}</h3><p className="mt-3 font-semibold text-slate-500 dark:text-slate-400">{active[3]}</p><p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-300">{active[4]}</p><div className="mt-8 flex items-center gap-2 rounded-xl bg-slate-100 p-4 text-sm font-bold dark:bg-white/5"><CheckCircle2 size={17} className="text-blue-500" /> Chapter {careerIndex + 1} of {CAREER.length}</div></div>
          </div>
        </section>

        <section id="expertise" className="bg-slate-950 px-5 py-24 text-white dark:bg-black md:px-8"><div className="mx-auto max-w-7xl"><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-400">02 · Expertise</p><h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">The toolkit behind the work.</h2><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{SKILLS.map(([title,copy],i) => <div key={title} className="group rounded-2xl border border-white/10 bg-white/[.04] p-6 transition hover:-translate-y-1 hover:border-blue-400/40"><div className="mb-10 flex justify-between"><span className="font-mono text-xs text-white/30">0{i+1}</span><ArrowUpRight size={17} className="text-white/25 group-hover:text-blue-400" /></div><h3 className="font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p></div>)}</div></div></section>

        <section id="projects" className="mx-auto max-w-7xl px-5 py-24 md:px-8"><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-600">03 · Interactive Impact Lab</p><h2 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Choose a lens. Explore the impact.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">A compact interactive view of the scale and operating responsibilities documented in the CV.</p><div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-white/[.035]"><div className="grid grid-cols-2 md:grid-cols-4">{Object.keys(IMPACT).map(tab => <button key={tab} onClick={() => setImpactTab(tab)} className={`px-4 py-4 text-sm font-black ${impactTab===tab ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}>{tab}</button>)}</div><div className="grid gap-10 p-8 md:grid-cols-[.65fr_1.35fr] md:p-12"><div><div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"><ImpactIcon size={26} /></div><div className="text-6xl font-black">{impact[0]}</div><div className="mt-2 font-bold text-slate-500 dark:text-slate-400">{impact[1]}</div></div><div className="flex flex-col justify-center"><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.2em] text-slate-400"><BarChart3 size={14} /> operating insight</div><p className="text-xl leading-9 text-slate-700 dark:text-slate-200">{impact[3]}</p><div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className={`impact-bar ${powered ? 'impact-bar-power' : ''}`} /></div></div></div></div><div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><div className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl md:p-10"><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wider"><Target size={14} /> Turning point</div><h3 className="mt-5 text-3xl font-black">Building IG Defence's Production & Manufacturing function from scratch.</h3><p className="mt-5 leading-7 text-blue-100">The CV describes a model where a trained blue-collar workforce handled assembly while engineers focused on testing and quality control. The resulting system reduced production costs, became repeatable and enabled a workforce to produce highly technical drones without compromising quality.</p></div><div className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/[.035]"><Sparkles className="text-blue-500" /><h3 className="mt-5 text-xl font-black">The principle</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">Train the workforce. Systemise the process. Keep specialists focused where precision matters. Scale what works.</p></div></div></section>

        <section id="education" className="border-y border-slate-200 bg-slate-100 px-5 py-24 dark:border-white/10 dark:bg-white/[.025] md:px-8"><div className="mx-auto max-w-7xl"><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-blue-600">04 · Education & Credentials</p><div className="grid gap-14 lg:grid-cols-2"><div><h2 className="text-4xl font-black md:text-5xl">Formal learning connected to practice.</h2><div className="mt-9 space-y-3">{EDUCATION.map(([name,meta]) => <div key={name} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[.035]"><GraduationCap className="mt-1 shrink-0 text-blue-500" size={21} /><div><b>{name}</b><p className="mt-1 text-sm text-slate-500">{meta}</p></div></div>)}</div></div><div><h3 className="text-2xl font-black">Certifications</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{CERTS.map(cert => <div key={cert} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold dark:border-white/10 dark:bg-white/[.035]"><Award size={17} className="mt-0.5 shrink-0 text-amber-500" />{cert}</div>)}</div><div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-5 dark:border-white/15"><div className="flex gap-3"><Code2 className="mt-1 text-blue-500" size={19} /><div><b>Beyond work</b><p className="mt-1 text-sm text-slate-500">Chess & puzzles · cinema & documentaries · badminton & cricket · coding & AI exploration</p></div></div></div></div></div></div></section>

        <section id="contact" className="relative overflow-hidden px-5 py-28 md:px-8"><div className="absolute inset-0 bg-grid-pattern opacity-60" /><div className="relative mx-auto max-w-5xl text-center"><p className="mb-4 text-xs font-black uppercase tracking-[.22em] text-blue-600">05 · Connect</p><h2 className="text-5xl font-black tracking-[-.04em] md:text-7xl">People. Process. Delivery.</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">For professional conversations, opportunities or collaboration, reach out directly.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><a href="mailto:luckysingh0508.lsj@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white"><Mail size={18} /> Email</a><a href="tel:+918383842382" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 font-bold dark:border-white/15"><Phone size={18} /> +91 83838 42382</a></div><div className="mt-7 text-sm text-slate-500">Greater Noida, India · English · Hindi</div></div></section>

        <footer className="border-t border-slate-200 px-5 py-8 dark:border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} Laxman Singh Jadon</span><span>A journey through people, policy and purpose.</span></div></footer>
        {showTop && <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} aria-label="Back to top" className="fixed bottom-6 right-6 z-40 rounded-full bg-slate-950 p-3 text-white shadow-2xl dark:bg-white dark:text-slate-950"><ArrowDown className="rotate-180" size={18} /></button>}
      </main>
    </div>
  );
}

export default App;
