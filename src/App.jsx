import React, { useEffect, useState } from 'react';
import { Award, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight, Download, GraduationCap, Mail, MapPin, Menu, Network, Phone, ShieldCheck, Sparkles, Target, Users, X, Zap } from 'lucide-react';

const CV = '/Laxmansingh/assets/Laxman_Singh_Jadon_CV.pdf';

const CAREER = [
  ['2014–2018','FOUNDATIONS','Learning How People & Systems Work','Education & UPSC foundation','BA in Economics, Sociology and English Literature, followed by MA in Rural Development and an UPSC-oriented foundation.'],
  ['Dec 2019–Jan 2024','FIRST STEPS','Building Discipline in HR','Tricornio Technologies · HR Officer','Built HR fundamentals through employee records, payroll and statutory documentation. Maintained zero compliance deviations and earned Best Employee of the Year recognition.'],
  ['Jul 2024–Jul 2025','SCALING UP','From HR to Multi-State Operations','Kasper Infrastructure · HR Manager & Project Coordinator','Led HR operations across 600+ employees and coordinated HR/operations for the Mahakumbh 2025 Tent City Project involving 200 luxury tents and multiple stakeholders.'],
  ['Jul 2025–Oct 2025','FULL OWNERSHIP','Running a Plant End to End','Kasper Engineering · Plant Manager, HR & Admin','Owned HR, administration, security, vendors, housekeeping and discipline at plant level.'],
  ['Jan 2026–Jun 2026','FAST RISE','Trust Earned in Months','IG Strategic Systems · IG Defence','Joined as HR Associate-II, promoted to HR Associate-III and then HR Lead — three role levels in six months.'],
  ['Aug 2026–Present','TODAY','Where HR Meets Project Delivery','HR Lead + Project Delivery HOD · IG Defence','Leading HR and organisational policy while coordinating demos, trials, on-site delivery, ATP and client training for defence products.']
];

const SKILLS = [
  ['HR Operations','End-to-end HR administration, workforce coordination and policy execution.'],
  ['Talent Acquisition','Hiring across technical, white-collar and blue-collar roles.'],
  ['Compliance & Governance','Statutory documentation, audit readiness, POSH and policy governance.'],
  ['Payroll & MIS','Payroll coordination, HR analytics, records and management reporting.'],
  ['Project Coordination','Demos, trials, product showcases, delivery, ATP and client training.'],
  ['Operations Management','Administration, facilities, security, vendors and movement control.'],
  ['Workforce Development','Training-led workforce models and repeatable operating systems.'],
  ['HR Technology & AI','HRMS implementation, automation and practical AI-in-HR exploration.']
];

const IMPACT = {
  People:['600+','employees managed',Users,'Experience scaling people operations across multi-state infrastructure projects.'],
  Compliance:['93%+','compliance before deadline',ShieldCheck,'Strengthened statutory compliance accuracy from 30% to 93% before deadline and reached 100% on-time compliance by project close.'],
  Delivery:['200','luxury tents coordinated',Target,'Mahakumbh 2025 connected HR operations with live project delivery and multi-stakeholder coordination.'],
  Operations:['11+','functional areas',Network,'Current responsibilities span HR, admin, talent acquisition, governance, payroll, facilities, security and project delivery.']
};

const EDU = [
  ['MBA, HR & Operations Management','LPU · 2026 · In progress'],
  ['MA, Rural Development','IGNOU · 2018'],
  ['BA, Economics, Sociology & English Literature','JU · 2016'],
  ['Diploma in Computer Application','MMYVV, M.P. · 2014']
];

const CERTS = ['Lean Six Sigma White Belt · CSSC','AI in HR · Keka Academy','POSH Certification · Keka Academy','Crafting Payroll in India · Keka Academy','Compensation & Benefits · Keka Academy','Employee Engagement Course · Keka Academy','People Analytics · Keka Academy','Emergency Preparedness · Knights of Safety Academy'];

function downloadCV(){ window.location.href = CV; }

function VisitorBook({open,onClose}){
  const [name,setName]=useState('');
  const [message,setMessage]=useState('');
  const [saved,setSaved]=useState(false);
  const submit=e=>{
    e.preventDefault();
    if(!name.trim()||!message.trim()) return;
    const entries=JSON.parse(localStorage.getItem('laxman-visitor-book')||'[]');
    entries.push({name:name.trim(),message:message.trim(),date:new Date().toLocaleDateString('en-IN')});
    localStorage.setItem('laxman-visitor-book',JSON.stringify(entries));
    setSaved(true); setName(''); setMessage('');
  };
  if(!open) return null;
  return <div className="visitor-overlay" onMouseDown={onClose}><div className="visitor-modal" onMouseDown={e=>e.stopPropagation()}>
    <button className="visitor-close" onClick={onClose}><X size={18}/></button>
    <BookOpen className="text-red-500" size={25}/><h3>Visitor Book</h3>
    <p>Leave a short note for Laxman. Entries are stored locally in this browser.</p>
    {saved ? <div className="visitor-success"><CheckCircle2 size={22}/><b>Entry saved.</b><button onClick={()=>setSaved(false)}>Write another</button></div> :
      <form onSubmit={submit}><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/><textarea required value={message} onChange={e=>setMessage(e.target.value)} placeholder="Your message" rows="4"/><button type="submit">SIGN THE BOOK</button></form>}
  </div></div>;
}

function HeroSignal(){
  return <div className="hero-signal" aria-hidden="true">
    <div className="signal-grid"/>
    <div className="signal-orbit orbit-a"/><div className="signal-orbit orbit-b"/>
    <div className="signal-core"><span>LSJ</span><small>PEOPLE · SYSTEMS · DELIVERY</small></div>
    <div className="signal-node node-a">HR</div><div className="signal-node node-b">OPS</div><div className="signal-node node-c">PROJECT</div>
  </div>;
}

export default function App(){
  const [ci,setCi]=useState(5), [tab,setTab]=useState('People'), [visitor,setVisitor]=useState(false), [menu,setMenu]=useState(false), [top,setTop]=useState(false);
  useEffect(()=>{const f=()=>setTop(window.scrollY>700);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[]);
  const active=CAREER[ci], impact=IMPACT[tab], ImpactIcon=impact[2], nav=['Journey','Impact','Expertise','Projects','Education','Contact'];
  return <main className="site-shell"><div className="ambient-red red-one"/><div className="ambient-red red-two"/>
    <header className="site-nav"><div className="nav-inner"><a href="#home" className="brand"><span className="brand-mark"><BriefcaseBusiness size={18}/></span><span><b>Laxman Singh Jadon</b><small>HR · OPERATIONS · DELIVERY</small></span></a><nav>{nav.map(n=><a key={n} href={'#'+n.toLowerCase()}>{n}</a>)}</nav><div className="nav-actions"><button className="nav-button" onClick={()=>setVisitor(true)}>Visitor Book</button><button className="cv-button" onClick={downloadCV}><Download size={15}/> CV</button><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X size={18}/>:<Menu size={18}/>}</button></div></div>{menu&&<div className="mobile-menu"><button onClick={downloadCV}><Download size={16}/> Download CV</button><button onClick={()=>setVisitor(true)}>Visitor Book</button>{nav.map(n=><a key={n} href={'#'+n.toLowerCase()} onClick={()=>setMenu(false)}>{n}</a>)}</div>}</header>

    <section id="home" className="hero"><div className="hero-grid"><div className="hero-copy"><div className="status-pill"><span/> HR LEAD + PROJECT DELIVERY HOD</div><h1>People. Systems.<br/><span>Purpose.</span></h1><p>A professional journey from HR fundamentals and multi-state operations to leading HR and project delivery for a defence technology organisation.</p><div className="hero-actions"><a className="primary-action" href="#journey">Explore the journey <ChevronRight size={18}/></a><button className="secondary-action" onClick={downloadCV}><Download size={17}/> Download CV</button></div><div className="hero-meta"><span><MapPin size={15}/> Greater Noida, India</span><span><Zap size={15}/> 6+ years since 2019</span></div></div><div className="hero-visual"><div className="hero-box"><div className="console-top"><span>CAREER.QUEST / CURRENT</span><b>● ONLINE</b></div><div className="position-card"><small>CURRENT POSITION</small><strong>HR Lead</strong><span>+ Project Delivery Department HOD</span></div><div className="console-stats"><div><strong>600+</strong><small>WORKFORCE</small></div><div><strong>93%+</strong><small>COMPLIANCE</small></div></div><HeroSignal/></div></div></div></section>

    <section id="impact" className="impact-strip"><div><strong>600+</strong><span>employees managed</span></div><div><strong>93%+</strong><span>compliance achieved</span></div><div><strong>200</strong><span>luxury tents coordinated</span></div><div><strong>3</strong><span>promotions in 6 months</span></div></section>
    <section id="journey" className="section"><p className="eyebrow">01 · THE JOURNEY</p><h2>Six chapters. One operating philosophy.</h2><p className="section-lead">Every move added another dimension: people, compliance, scale, ownership and delivery.</p><div className="journey-grid"><div className="career-list">{CAREER.map((x,i)=><button key={x[0]} className={ci===i?'active':''} onClick={()=>setCi(i)}><span className="timeline-dot"/><span><small>{x[0]}</small><b>{x[1]}</b><em>{x[2]}</em></span><ChevronRight size={17}/></button>)}</div><article className="career-detail"><small>{active[0]}</small><h3>{active[2]}</h3><b>{active[3]}</b><p>{active[4]}</p><div className="chapter-tag"><CheckCircle2 size={16}/> Chapter {ci+1} of {CAREER.length}</div></article></div></section>
    <section id="expertise" className="dark-section section"><p className="eyebrow">02 · EXPERTISE</p><h2>The toolkit behind the work.</h2><div className="skill-grid">{SKILLS.map(([t,c],i)=><article key={t}><small>0{i+1}</small><Sparkles size={16}/><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section id="projects" className="section"><p className="eyebrow">03 · INTERACTIVE IMPACT LAB</p><h2>Choose a lens. Explore the impact.</h2><p className="section-lead">Switch between people, compliance, delivery and operations.</p><div className="impact-lab"><div className="impact-tabs">{Object.keys(IMPACT).map(t=><button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>)}</div><div className="impact-content"><div><ImpactIcon size={27}/><strong>{impact[0]}</strong><small>{impact[1]}</small></div><article><span>OPERATING INSIGHT</span><p>{impact[3]}</p><div className="impact-line"><i/></div></article></div></div><div className="project-grid"><article className="featured-project"><span><Target size={15}/> TURNING POINT</span><h3>Building IG Defence's Production & Manufacturing function from scratch.</h3><p>A trained blue-collar production workforce handled assembly while engineers focused on testing and quality control, creating a repeatable and more cost-efficient operating model.</p></article><article className="principle"><ShieldCheck size={24}/><h3>Operating principle</h3><p>Train the workforce. Systemise the process. Keep specialists focused where precision matters. Scale what works.</p></article></div></section>
    <section id="education" className="section muted-section"><p className="eyebrow">04 · EDUCATION & CREDENTIALS</p><div className="two-col"><div><h2>Formal learning connected to practice.</h2><div className="education-list">{EDU.map(x=><div key={x[0]}><GraduationCap size={20}/><span><b>{x[0]}</b><small>{x[1]}</small></span></div>)}</div></div><div><h3 className="subhead">Certifications</h3><div className="cert-grid">{CERTS.map(c=><div key={c}><Award size={16}/>{c}</div>)}</div></div></div></section>
    <section id="contact" className="contact section"><p className="eyebrow">05 · CONNECT</p><h2>People. Process. Delivery.</h2><p>For professional conversations, opportunities or collaboration, reach out directly.</p><div className="contact-actions"><button onClick={downloadCV}><Download size={17}/> Download CV</button><button onClick={()=>setVisitor(true)}><BookOpen size={17}/> Visitor Book</button><a href="mailto:luckysingh0508.lsj@gmail.com"><Mail size={17}/> Email</a><a href="tel:+918383842382"><Phone size={17}/> Call</a></div><div className="contact-meta">Greater Noida, India · English · Hindi</div></section>
    <footer>© {new Date().getFullYear()} Laxman Singh Jadon <span>· Career Quest · People, Systems & Purpose.</span></footer>{top&&<button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>}<VisitorBook open={visitor} onClose={()=>setVisitor(false)}/>
  </main>;
}
