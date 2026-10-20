import { useEffect, useState } from 'react';
import {
  Award, BookOpen, Briefcase, BrainCircuit, Building2, ChevronRight, Clapperboard, Code2, Compass,
  Crown, Download, Factory, GraduationCap, Home, Layers, Mail, MapPin, Menu, Moon, Network,
  Phone, Quote, Send, ShieldCheck, Sparkles, Sun, Target, Tent, Trophy, Users, X, Linkedin } from 'lucide-react';
import {
  PROFILE, NAV, CAREER, LADDER, FUNCTIONS, DELIVERY_FLOW, SKILLS, EDU, CERTS, BEYOND, QUOTES,
} from './data';
import {
  HeroVenn, GrowthStairs, ComplianceBars, WorkforceGrid, FunctionWheel, ProductionModel, DroneArt, TentCity,
} from './Illustrations';

const CV = `${import.meta.env.BASE_URL}assets/Laxman_Singh_Jadon_CV.pdf`;
const NAV_ICONS = { home: Home, journey: Compass, impact: Target, 'case-studies': Factory, expertise: Layers, education: GraduationCap, beyond: Sparkles, contact: Mail };
const SKILL_ICONS = [Users, Briefcase, ShieldCheck, Network, Target, Building2, Factory, BrainCircuit];
const BEYOND_ICONS = [Crown, Clapperboard, Trophy, Code2];

/* ---------- hooks ---------- */

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    f();
    window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); };
  }, []);
  return p;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('lsj-theme') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('lsj-theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
}

/* ---------- navigation ---------- */

function NavList({ active, onGo }) {
  return (
    <ol className="nav-list">
      {NAV.map((n, i) => {
        const Icon = NAV_ICONS[n.id];
        return (
          <li key={n.id}>
            <a href={'#' + n.id} className={active === n.id ? 'active' : ''} onClick={onGo} aria-current={active === n.id ? 'true' : undefined}>
              <span className="nav-num">{String(i + 1).padStart(2, '0')}</span>
              <Icon size={16} />
              <span>{n.label}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

function Sidebar({ active, progress, theme, toggleTheme }) {
  return (
    <aside className="sidebar" aria-label="Section navigation">
      <a href="#home" className="brand">
        <span className="brand-mark">{PROFILE.short}</span>
        <span><b>{PROFILE.name}</b><small>HR · OPS · DELIVERY</small></span>
      </a>
      <nav className="side-nav">
        <div className="side-progress"><i style={{ height: `${progress * 100}%` }} /></div>
        <NavList active={active} />
      </nav>
      <div className="side-foot">
        <a className="btn btn-solid" href={CV} download><Download size={15} /> Download CV</a>
        <button className="btn btn-ghost icon-only" onClick={toggleTheme} aria-label="Toggle light / dark mode">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </aside>
  );
}

function MobileBar({ active, progress, theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const label = NAV.find((n) => n.id === active)?.label;
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  return (
    <>
      <header className="mobile-bar">
        <a href="#home" className="brand compact"><span className="brand-mark">{PROFILE.short}</span></a>
        <span className="mobile-where">{label}</span>
        <button className="btn btn-ghost icon-only" onClick={toggleTheme} aria-label="Toggle light / dark mode">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="btn btn-ghost icon-only" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={18} /></button>
        <i className="mobile-progress" style={{ width: `${progress * 100}%` }} />
      </header>
      {open && (
        <div className="drawer-backdrop" onClick={() => setOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <b>{PROFILE.name}</b>
              <button className="btn btn-ghost icon-only" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button>
            </div>
            <NavList active={active} onGo={() => setOpen(false)} />
            <a className="btn btn-solid wide" href={CV} download><Download size={15} /> Download CV</a>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- building blocks ---------- */

function QuoteBand({ q }) {
  return (
    <figure className="quote-band reveal">
      <Quote className="quote-mark" size={30} />
      <blockquote>{q.text}</blockquote>
      <figcaption>— {q.by}</figcaption>
    </figure>
  );
}

function SectionHead({ num, kicker, title, lead }) {
  return (
    <header className="section-head reveal">
      <p className="eyebrow"><span>{num}</span>{kicker}</p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy reveal">
        <div className="pill"><span className="dot" /> {PROFILE.role}</div>
        <h1>People. Policy.<br /><em>Purpose.</em></h1>
        <p className="lead">A journey from HR fundamentals and multi-state operations to leading both HR and project delivery for a defence technology organisation.</p>
        <div className="hero-actions">
          <a className="btn btn-solid big" href="#journey">Explore the journey <ChevronRight size={17} /></a>
          <a className="btn btn-ghost big" href={CV} download><Download size={16} /> Download CV</a>
        </div>
        <div className="hero-meta">
          <span><MapPin size={14} /> {PROFILE.location}</span>
          <span><Briefcase size={14} /> {PROFILE.org}</span>
        </div>
      </div>
      <div className="hero-art reveal"><HeroVenn /></div>
      <div className="stat-strip reveal">
        {[['600+', 'employees managed', Users], ['93%+', 'compliance before deadline', ShieldCheck], ['200', 'luxury tents coordinated', Tent], ['3', 'step-ups in 8 months', Trophy]].map(([v, l, Icon]) => (
          <div key={l}><Icon size={18} /><strong>{v}</strong><span>{l}</span></div>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const [active, setActive] = useState(CAREER.length - 1);
  const c = CAREER[active];
  return (
    <section id="journey" className="section">
      <SectionHead num="01" kicker="The Journey" title="Not a list of jobs. A progression of responsibility." lead="Each chapter grew the size of the problem being solved. Tap a step to read that chapter." />
      <div className="card stairs-card reveal">
        <div className="card-label">SCOPE OF RESPONSIBILITY, CHAPTER BY CHAPTER</div>
        <div className="scroll-x"><GrowthStairs active={active} onPick={setActive} /></div>
      </div>
      <div className="chapter reveal">
        <div className="chapter-tabs" role="tablist">
          {CAREER.map((x, i) => (
            <button key={x.tag} role="tab" aria-selected={i === active} className={i === active ? 'on' : ''} onClick={() => setActive(i)}>
              <span>{String(i + 1).padStart(2, '0')}</span>{x.tag}
            </button>
          ))}
        </div>
        <article className="card chapter-card" key={active}>
          <div className="chapter-top"><span>{c.when}</span><b>{c.tag}</b></div>
          <h3>{c.title}</h3>
          <p className="chapter-where">{c.where}</p>
          <p>{c.body}</p>
          <div className="why"><span>WHY IT MATTERS</span><p>{c.why}</p></div>
          <div className="chapter-nav">
            <span>Chapter {active + 1} / {CAREER.length}</span>
            <button className="btn btn-ghost" onClick={() => setActive((active + 1) % CAREER.length)}>Next chapter <ChevronRight size={15} /></button>
          </div>
        </article>
      </div>
      <div className="card ladder-card reveal">
        <div className="card-label">THE FAST RISE AT IG DEFENCE · 2026</div>
        <ol className="ladder">
          {LADDER.map((l, i) => (
            <li key={l.title} style={{ '--i': i }}>
              <span className="ladder-month">{l.month}</span>
              <b>{l.title}</b>
              <small>{l.note}</small>
            </li>
          ))}
        </ol>
      </div>
      <QuoteBand q={QUOTES.journey} />
    </section>
  );
}

function Impact() {
  return (
    <section id="impact" className="section">
      <SectionHead num="02" kicker="Impact in Numbers" title="What the work actually moved." lead="Compliance, scale and span of control — shown, not just stated." />
      <div className="impact-grid">
        <div className="card reveal">
          <div className="card-label"><ShieldCheck size={14} /> STATUTORY COMPLIANCE · KASPER INFRASTRUCTURE</div>
          <ComplianceBars />
          <p className="card-note">From 30% to 93%+ before the deadline, and 100% on time by project close.</p>
        </div>
        <div className="card reveal">
          <div className="card-label"><Users size={14} /> WORKFORCE MANAGED · MULTI-STATE SITES</div>
          <WorkforceGrid />
          <p className="card-note"><b className="big-num">600+</b> employees — each figure above represents ten people.</p>
        </div>
        <div className="card wheel-card reveal">
          <div className="card-label"><Network size={14} /> SPAN OF OWNERSHIP TODAY</div>
          <FunctionWheel />
          <ul className="fn-chips">{FUNCTIONS.map((f) => <li key={f}>{f}</li>)}</ul>
          <p className="card-note">Twelve functional areas and teams report into one combined HR and delivery role.</p>
        </div>
      </div>
      <QuoteBand q={QUOTES.impact} />
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="section">
      <SectionHead num="03" kicker="Case Studies" title="Two projects that changed the operating lens." />
      <article className="case card reveal">
        <div className="case-text">
          <span className="tag"><Factory size={14} /> TURNING POINT · IG DEFENCE</span>
          <h3>Building Production & Manufacturing from scratch.</h3>
          <p>The obvious path was hiring highly paid engineers for basic assembly. Instead, a blue-collar workforce — many without formal technical education — was trained for assembly, and engineers were kept where precision matters most: testing and quality control.</p>
          <p>The first weeks meant real adjustment. Within weeks the workforce had adapted, the training became a repeatable system, and production costs fell sharply without compromising quality.</p>
          <div className="formula"><b>Train</b><ChevronRight size={14} /><b>Systemise</b><ChevronRight size={14} /><b>Scale</b></div>
        </div>
        <div className="case-art"><DroneArt /></div>
        <div className="case-wide">
          <div className="card-label">OPERATING MODEL · BEFORE AND AFTER</div>
          <ProductionModel />
        </div>
      </article>
      <article className="case card reveal">
        <div className="case-art"><TentCity /></div>
        <div className="case-text">
          <span className="tag"><Tent size={14} /> MAHAKUMBH 2025 · KASPER INFRASTRUCTURE</span>
          <h3>Tent City: where HR first met live delivery.</h3>
          <p>Coordinating HR and operations for a 200-luxury-tent city with many stakeholders meant workforce decisions had immediate, visible consequences for a live project — the first time HR and project delivery sat side by side.</p>
          <div className="mini-stats">
            <div><strong>200</strong><span>luxury tents</span></div>
            <div><strong>2025</strong><span>Mahakumbh</span></div>
            <div><strong>HR + Ops</strong><span>side by side</span></div>
          </div>
        </div>
      </article>
      <QuoteBand q={QUOTES.cases} />
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="section">
      <SectionHead num="04" kicker="Expertise" title="The toolkit behind the work." lead="How HR and project delivery connect in one lifecycle — then the skills that power each step." />
      <div className="card reveal">
        <div className="card-label">THE PEOPLE-TO-DELIVERY LIFECYCLE</div>
        <ol className="flow">
          {DELIVERY_FLOW.map((f, i) => (
            <li key={f.step} style={{ '--i': i }}>
              <span className="flow-num">{i + 1}</span>
              <b>{f.step}</b>
              <small>{f.text}</small>
            </li>
          ))}
        </ol>
      </div>
      <div className="skill-grid">
        {SKILLS.map(([t, d], i) => {
          const Icon = SKILL_ICONS[i];
          return (
            <article className="card skill reveal" key={t}>
              <span className="skill-icon"><Icon size={18} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          );
        })}
      </div>
      <QuoteBand q={QUOTES.expertise} />
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <SectionHead num="05" kicker="Education & Credentials" title="Formal learning, connected to practice." />
      <div className="edu-grid">
        <div className="card reveal">
          <div className="card-label"><GraduationCap size={14} /> ACADEMIC PATH</div>
          <ol className="timeline">
            {EDU.map((e) => (
              <li key={e.title}>
                <span className="tl-year">{e.year}</span>
                <div><b>{e.title}</b><small>{e.where}</small></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="card reveal">
          <div className="card-label"><Award size={14} /> CERTIFICATIONS</div>
          <div className="cert-grid">
            {CERTS.map(([t, by]) => (
              <div className="cert" key={t}>
                <svg viewBox="0 0 40 40" className="badge" aria-hidden="true">
                  <path d="M20 2 L35 10 V24 Q35 34 20 38 Q5 34 5 24 V10 Z" />
                  <path d="M13 20 l5 5 l9 -10" className="tick" />
                </svg>
                <span><b>{t}</b><small>{by}</small></span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <QuoteBand q={QUOTES.education} />
    </section>
  );
}

function Beyond() {
  return (
    <section id="beyond" className="section">
      <SectionHead num="06" kicker="Beyond Work" title="The same instincts, off the clock." />
      <div className="beyond-grid">
        {BEYOND.map(([t, d], i) => {
          const Icon = BEYOND_ICONS[i];
          return (
            <article className="card beyond reveal" key={t}>
              <span className="beyond-art"><Icon size={34} strokeWidth={1.5} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          );
        })}
      </div>
      <QuoteBand q={QUOTES.beyond} />
    </section>
  );
}

function Contact() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio note from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="section contact">
      <SectionHead num="07" kicker="Connect" title="Let's talk people, process and delivery." lead="For opportunities, collaboration or a professional conversation." />
      <div className="contact-grid">
        <div className="card reveal contact-links">
          <a href={`mailto:${PROFILE.email}`}><Mail size={18} /><span><small>Email</small>{PROFILE.email}</span></a>
          <a href={`tel:${PROFILE.phone}`}><Phone size={18} /><span><small>Phone</small>{PROFILE.phoneDisplay}</span></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /><span><small>LinkedIn</small>linkedin.com/in/laxmansinghj</span></a>
          <div><MapPin size={18} /><span><small>Based in</small>{PROFILE.location}</span></div>
          <div><BookOpen size={18} /><span><small>Languages</small>{PROFILE.languages}</span></div>
          <a className="btn btn-solid wide" href={CV} download><Download size={15} /> Download CV</a>
        </div>
        <form className="card reveal note-form" onSubmit={send}>
          <div className="card-label">LEAVE A NOTE</div>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" />
          <textarea required rows="5" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Your message" aria-label="Your message" />
          <button className="btn btn-solid" type="submit"><Send size={15} /> Send via email</button>
          <small className="muted">Opens your email app with the note ready to send.</small>
        </form>
      </div>
    </section>
  );
}

/* ---------- app ---------- */

const IDS = NAV.map((n) => n.id);

export default function App() {
  const active = useActiveSection(IDS);
  const progress = useScrollProgress();
  const [theme, toggleTheme] = useTheme();
  useReveal();
  return (
    <div className="shell">
      <Sidebar active={active} progress={progress} theme={theme} toggleTheme={toggleTheme} />
      <MobileBar active={active} progress={progress} theme={theme} toggleTheme={toggleTheme} />
      <main className="content">
        <Hero />
        <Journey />
        <Impact />
        <CaseStudies />
        <Expertise />
        <Education />
        <Beyond />
        <Contact />
        <footer className="footer">© {new Date().getFullYear()} {PROFILE.name} · People. Policy. Purpose.</footer>
      </main>
    </div>
  );
}
