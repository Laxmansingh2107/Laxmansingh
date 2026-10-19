import { CAREER, COMPLIANCE, FUNCTIONS } from './data';

/* All visuals are hand-built SVG so they stay sharp, theme-aware and load instantly.
   Colours come from CSS variables defined in index.css. */

export function HeroVenn() {
  return (
    <svg viewBox="0 0 420 400" className="illus hero-venn" role="img" aria-label="People, Systems and Delivery overlapping, with Laxman at the centre">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity=".35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="205" r="190" fill="url(#glow)" />
      <g className="venn-spin">
        <circle cx="210" cy="205" r="178" fill="none" stroke="var(--line)" strokeDasharray="2 9" />
      </g>
      <circle className="venn c1" cx="160" cy="160" r="100" />
      <circle className="venn c2" cx="260" cy="160" r="100" />
      <circle className="venn c3" cx="210" cy="245" r="100" />
      <text x="120" y="130" className="venn-label">PEOPLE</text>
      <text x="300" y="130" className="venn-label" textAnchor="end">SYSTEMS</text>
      <text x="210" y="320" className="venn-label" textAnchor="middle">DELIVERY</text>
      <circle cx="210" cy="190" r="34" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
      <text x="210" y="197" textAnchor="middle" className="venn-core">LSJ</text>
      {/* small orbiting nodes */}
      {[['HR', 58, 236], ['OPS', 362, 236], ['QA', 210, 30]].map(([t, x, y]) => (
        <g key={t}>
          <circle cx={x} cy={y} r="20" fill="var(--surface)" stroke="var(--line-strong)" />
          <text x={x} y={y + 4} textAnchor="middle" className="node-text">{t}</text>
        </g>
      ))}
    </svg>
  );
}

export function GrowthStairs({ active, onPick }) {
  const w = 640, h = 260, pad = 30, bw = (w - pad * 2) / CAREER.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="illus stairs" role="img" aria-label="Scope of responsibility growing with each career chapter">
      <line x1={pad} y1={h - 40} x2={w - pad} y2={h - 40} stroke="var(--line-strong)" />
      {CAREER.map((c, i) => {
        const bh = (c.scope / 6) * (h - 80);
        const x = pad + i * bw + 8, y = h - 40 - bh;
        const on = i === active;
        return (
          <g key={c.tag} className={'stair' + (on ? ' on' : '')} onClick={() => onPick(i)} style={{ cursor: 'pointer', animationDelay: `${i * 90}ms` }}>
            <rect x={x} y={y} width={bw - 16} height={bh} rx="8" />
            <text x={x + (bw - 16) / 2} y={y - 8} textAnchor="middle" className="stair-val">{c.scopeLabel}</text>
            <text x={x + (bw - 16) / 2} y={h - 20} textAnchor="middle" className="stair-tag">{c.tag}</text>
            <text x={x + (bw - 16) / 2} y={h - 6} textAnchor="middle" className="stair-year">{c.when.split('–')[0]}</text>
          </g>
        );
      })}
      <path d={`M${pad + 20} ${h - 70} Q ${w / 2} ${h - 120} ${w - pad - 150} 96`} fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 6" opacity=".7" />
    </svg>
  );
}

export function ComplianceBars() {
  return (
    <div className="bars" role="img" aria-label="Compliance rose from 30% to 93% before deadline and 100% by project close">
      {COMPLIANCE.map((c, i) => (
        <div className="bar-row" key={c.label}>
          <span className="bar-label">{c.label}</span>
          <div className="bar-track"><div className={'bar-fill b' + i} style={{ '--w': c.value + '%' }} /></div>
          <b className="bar-val">{c.value}%</b>
        </div>
      ))}
    </div>
  );
}

function Person({ x, y, hot }) {
  return (
    <g transform={`translate(${x} ${y})`} className={hot ? 'person hot' : 'person'}>
      <circle cx="7" cy="4" r="4" />
      <path d="M0 18 Q0 9 7 9 Q14 9 14 18 Z" />
    </g>
  );
}

export function WorkforceGrid() {
  const cols = 15, rows = 4;
  return (
    <svg viewBox={`0 0 ${cols * 22} ${rows * 26}`} className="illus workforce" role="img" aria-label="60 figures, each representing 10 employees: 600+ workforce">
      {Array.from({ length: cols * rows }).map((_, i) => (
        <Person key={i} x={(i % cols) * 22 + 4} y={Math.floor(i / cols) * 26 + 3} hot={i % 7 === 0} />
      ))}
    </svg>
  );
}

export function FunctionWheel() {
  const cx = 200, cy = 200, r = 150, n = FUNCTIONS.length;
  return (
    <svg viewBox="-80 -10 560 420" className="illus wheel" role="img" aria-label={`Functional areas overseen: ${FUNCTIONS.join(', ')}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--line)" />
      <circle cx={cx} cy={cy} r={r - 52} fill="none" stroke="var(--line)" strokeDasharray="3 6" />
      {FUNCTIONS.map((f, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
        const words = f.split(' ');
        const mid = Math.ceil(words.length / 2);
        const lines = words.length > 2 ? [words.slice(0, mid).join(' '), words.slice(mid).join(' ')] : [f];
        return (
          <g key={f} className="spoke" style={{ animationDelay: `${i * 60}ms` }}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" />
            <circle cx={x} cy={y} r="7" fill="var(--accent)" />
            {lines.map((l, j) => (
              <text key={j} x={x} y={y + (y > cy ? 22 : -14) + j * 12 - (y > cy ? 0 : (lines.length - 1) * 12)} textAnchor={Math.abs(x - cx) < 20 ? 'middle' : x > cx ? 'start' : 'end'} dx={Math.abs(x - cx) < 20 ? 0 : x > cx ? 6 : -6} className="wheel-text">{l}</text>
            ))}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="54" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
      <text x={cx} y={cy - 2} textAnchor="middle" className="wheel-core">HR Lead</text>
      <text x={cx} y={cy + 16} textAnchor="middle" className="wheel-sub">+ Delivery HOD</text>
    </svg>
  );
}

export function ProductionModel() {
  const box = (x, y, w, t, s, cls = '') => (
    <g className={'pm-box ' + cls}>
      <rect x={x} y={y} width={w} height="58" rx="10" />
      <text x={x + w / 2} y={y + 25} textAnchor="middle" className="pm-title">{t}</text>
      <text x={x + w / 2} y={y + 43} textAnchor="middle" className="pm-sub">{s}</text>
    </g>
  );
  const arrow = (x1, y, x2) => (
    <g className="pm-arrow"><line x1={x1} y1={y} x2={x2 - 6} y2={y} /><polygon points={`${x2},${y} ${x2 - 8},${y - 5} ${x2 - 8},${y + 5}`} /></g>
  );
  return (
    <svg viewBox="0 0 620 250" className="illus pm" role="img" aria-label="Conventional model: engineers do assembly and testing at high cost. Redesigned model: trained workforce assembles, engineers focus on testing and QC, cost lower and quality retained.">
      <text x="0" y="16" className="pm-head muted">CONVENTIONAL</text>
      {box(0, 28, 180, 'Engineers', 'assembly + testing', 'dim')}
      {arrow(186, 57, 236)}
      {box(240, 28, 170, 'Specialists on', 'routine work', 'dim')}
      {arrow(416, 57, 466)}
      {box(470, 28, 150, 'High cost', 'slow to scale', 'dim warn')}
      <text x="0" y="146" className="pm-head">REDESIGNED</text>
      {box(0, 158, 180, 'Trained workforce', 'assembly', 'on')}
      {arrow(186, 187, 236)}
      {box(240, 158, 170, 'Engineers', 'testing + QC', 'on')}
      {arrow(416, 187, 466)}
      {box(470, 158, 150, 'Lower cost', 'quality retained', 'good')}
    </svg>
  );
}

export function DroneArt() {
  return (
    <svg viewBox="0 0 320 200" className="illus drone" role="img" aria-label="Illustration of a drone being assembled">
      <rect x="20" y="168" width="280" height="10" rx="5" fill="var(--line)" />
      <g className="drone-body">
        <line x1="90" y1="92" x2="230" y2="92" stroke="var(--ink-soft)" strokeWidth="6" strokeLinecap="round" />
        <line x1="120" y1="70" x2="200" y2="114" stroke="var(--ink-soft)" strokeWidth="6" strokeLinecap="round" />
        <line x1="200" y1="70" x2="120" y2="114" stroke="var(--ink-soft)" strokeWidth="6" strokeLinecap="round" />
        <rect x="138" y="78" width="44" height="28" rx="8" fill="var(--accent)" />
        <circle cx="160" cy="92" r="5" fill="var(--bg)" />
        {[[90, 92], [230, 92], [120, 70], [200, 70]].map(([x, y], i) => (
          <g key={i}>
            <ellipse className="rotor" cx={x} cy={y - 10} rx="28" ry="5" fill="var(--accent-2)" opacity=".55" />
            <line x1={x} y1={y} x2={x} y2={y - 10} stroke="var(--ink-soft)" strokeWidth="3" />
          </g>
        ))}
        <line x1="150" y1="106" x2="146" y2="122" stroke="var(--ink-soft)" strokeWidth="3" />
        <line x1="170" y1="106" x2="174" y2="122" stroke="var(--ink-soft)" strokeWidth="3" />
      </g>
      {/* checklist tag */}
      <g transform="translate(236 128)">
        <rect width="64" height="34" rx="6" fill="var(--surface)" stroke="var(--line-strong)" />
        <path d="M10 17 l6 6 l12 -12" stroke="var(--good)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="34" y="21" className="node-text" textAnchor="start">QC</text>
      </g>
    </svg>
  );
}

export function TentCity() {
  const tents = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) {
    const x = 26 + c * 42 + (r % 2) * 20, y = 70 + r * 34, s = 1 - r * 0.08;
    tents.push(
      <g key={`${r}-${c}`} transform={`translate(${x} ${y}) scale(${s})`}>
        <g className="tent" style={{ animationDelay: `${(r * 7 + c) * 40}ms` }}>
          <path d="M0 26 L16 0 L32 26 Z" className="tent-body" />
          <path d="M13 26 L16 14 L19 26 Z" className="tent-door" />
          <line x1="16" y1="0" x2="16" y2="-8" stroke="var(--ink-soft)" />
          <path d="M16 -8 l7 2.5 l-7 2.5 Z" className="flag" />
        </g>
      </g>
    );
  }
  return (
    <svg viewBox="0 0 340 200" className="illus tents" role="img" aria-label="Illustration of a riverside tent city">
      <circle cx="290" cy="40" r="18" fill="var(--accent)" opacity=".85" />
      {tents}
      <path d="M0 176 Q 85 164 170 176 T 340 176 V200 H0Z" fill="var(--accent-2)" opacity=".35" />
      <path d="M0 186 Q 85 176 170 186 T 340 186" stroke="var(--accent-2)" fill="none" opacity=".6" />
    </svg>
  );
}
