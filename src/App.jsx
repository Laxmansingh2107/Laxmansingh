import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Award, 
  Lock, 
  Unlock, 
  User, 
  Mail, 
  Phone,
  Linkedin, 
  MapPin, 
  FileText,
  Moon,
  Sun,
  X,
  Eye,
  EyeOff,
  Building,
  CheckCircle,
  TrendingUp,
  Shield,
  Target,
  Share2,
  QrCode
} from 'lucide-react';

// --- Data Derived from Resume ---

const EXPERIENCE_DATA = [
  {
    id: 1,
    role: "Plant Manager, HR & Admin",
    company: "Kasper Engineering Pvt Ltd",
    location: "Hapur",
    period: "Jul 2025 - Oct 2025",
    description: "Managed 60+ plant employees and streamlined gate operations. Strengthened statutory compliance (PF, ESIC, Factory Laws) by ensuring 100% documentation accuracy. Enhanced workplace hygiene and introduced structured communication policies.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070", // Industrial/Factory Image
    tags: ["Factory Laws", "Workforce Admin", "Compliance", "Safety"]
  },
  {
    id: 2,
    role: "HR Manager & Project Coordinator",
    company: "Kosher Infrastructure Pvt Ltd",
    location: "Noida",
    period: "Jul 2024 - Jul 2025",
    description: "Led HR operations for 600+ employees nationwide. Key player in the Mahakumbh 2025 Tent City Project. Improved compliance score from 30% to 93%. Managed payroll, recruitment, and tender documentation for NHAI & UPSTDC contracts.",
    image: "https://images.unsplash.com/photo-1565619624098-e64bd2229442?auto=format&fit=crop&q=80&w=2070", // Luxury Tent/Event Image
    tags: ["Project Mgmt", "Large Scale Ops", "Tendering", "HRMS"]
  },
  {
    id: 3,
    role: "HR Officer",
    company: "Tricornio Technologies Pvt Ltd",
    location: "Ghaziabad",
    period: "Jan 2018 - Jan 2024",
    description: "Maintained error-free employee records and 100% payroll accuracy for 120+ employees. Led structured onboarding for technical hires and delivered periodic HR analytics/MIS reports to leadership.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2032", // Corporate Office/Meeting Image
    tags: ["Payroll", "Recruitment", "HR Analytics", "Audit Readiness"]
  }
];

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: "Lean Six Sigma White Belt",
    issuer: "Council For Six Sigma Certification",
    date: "Certified",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", // Data/Process Improvement
    credentialId: "djQ3NzowMi0yOTg"
  },
  {
    id: 2,
    title: "AI in HR",
    issuer: "Keka Academy",
    date: "Certified",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", // AI/Tech
    credentialId: "12D1828E4-1276EE272"
  },
  {
    id: 3,
    title: "POSH Certification",
    issuer: "Keka Academy",
    date: "Certified",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800", // Professional Workplace
    credentialId: "12D187894-1276EE272"
  },
  {
    id: 4,
    title: "Master of Business Administration",
    issuer: "LPU (Pursuing)",
    date: "2026",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
    credentialId: "HR & Operations"
  }
];

const SECURE_DOCS_DATA = [
  {
    id: 1,
    title: "Aadhar / National ID",
    type: "Identity",
    previewIcon: User,
    secretImage: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=1000", // Placeholder
    description: "Govt issued ID."
  },
  {
    id: 2,
    title: "PAN Card",
    type: "Financial",
    previewIcon: FileText,
    secretImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000", // Placeholder
    description: "Tax ID Document."
  },
  {
    id: 3,
    title: "Driving License",
    type: "Personal",
    previewIcon: FileText,
    secretImage: "https://images.unsplash.com/photo-1544306316-c5675f91d035?auto=format&fit=crop&q=80&w=1000", // Placeholder
    description: "Valid until 2030."
  }
];

const SKILLS = [
  "Statutory Compliance (PF/ESIC)", "HR Operations", "Talent Acquisition", 
  "POSH Compliance", "Payroll Management", "Grievance Handling", 
  "Manpower Planning", "MIS Reporting", "Project Coordination", 
  "Tendering (GeM)", "HRMS (Keka, Qandle)", "Employee Engagement"
];

const AWARDS = [
  {
    title: "Best Employee of the Year",
    company: "Tricornio Technologies",
    desc: "Recognized for 100% statutory documentation accuracy and seamless payroll administration."
  },
  {
    title: "HR Excellence Recognition",
    company: "Kosher Infrastructure",
    desc: "Awarded for leading multi-state HR operations and executing the Mahakumbh 2025 Tent City Project."
  }
];

// --- Components ---

const Section = ({ title, children, id, className = "" }) => (
  <section id={id} className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {title && (
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
          {title}
        </h2>
        <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
      </div>
    )}
    {children}
  </section>
);

const ExperienceCard = ({ item }) => (
  <div className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl mb-24 last:mb-0">
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
      {/* Cinematic Image Side */}
      <div className="relative h-64 lg:h-auto overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={item.image} 
          alt={item.role} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20 lg:hidden">
             <h3 className="text-2xl font-bold text-white">{item.role}</h3>
             <p className="text-blue-200">{item.company}</p>
        </div>
      </div>
      
      {/* Content Side */}
      <div className="p-8 lg:p-12 flex flex-col justify-center">
        <div className="hidden lg:block mb-6">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{item.role}</h3>
          <div className="flex items-center gap-2 text-xl text-blue-600 dark:text-blue-400 font-medium">
            <Building className="w-5 h-5" />
            {item.company}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6 font-mono border-b border-slate-100 dark:border-slate-800 pb-6">
           <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {item.location}</span>
           <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4"/> {item.period}</span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold tracking-wide">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FeatureProject = () => (
    <div className="my-12 relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1533630654593-b26c7e0dd074?auto=format&fit=crop&q=80&w=2070" 
                alt="Mahakumbh Tent City" 
                className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 p-10 md:p-16 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-sm font-bold mb-6">
                <Target className="w-4 h-4" /> FEATURED PROJECT
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Mahakumbh 2025 Tent City</h3>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Led end-to-end planning and operations for <strong>200 Luxury Tents</strong>. 
                Managed stakeholder coordination, on-ground operations, and ensured compliance under challenging timelines 
                for one of the world's largest religious gatherings.
            </p>
            <div className="flex flex-wrap gap-8">
                <div>
                    <div className="text-3xl font-bold text-white mb-1">600+</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Workforce Managed</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-1">93%</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Compliance Score</div>
                </div>
                <div>
                    <div className="text-3xl font-bold text-white mb-1">200</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Luxury Units</div>
                </div>
            </div>
        </div>
    </div>
);

const ShareModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : 'https://laxman-singh-portfolio.com';

  useEffect(() => {
    if (isOpen) setCopied(false);
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
             <QrCode size={32} />
          </div>
          
          <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">Share Profile</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Scan this QR code to visit Laxman's profile instantly.
          </p>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner mb-6">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`}
              alt="Profile QR Code"
              className="w-48 h-48"
            />
          </div>

          <div className="w-full flex gap-2">
            <input 
              type="text" 
              readOnly 
              value={url}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-400 truncate"
            />
            <button 
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PasswordModal = ({ isOpen, onClose, onSuccess, docTitle }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1234') {
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2 text-slate-800 dark:text-white">
            <Lock className="w-5 h-5 text-amber-500" />
            Identity Verification
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        <div className="p-8">
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
            Access to <strong>"{docTitle}"</strong> is restricted. Please enter your secure PIN to view the original document.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input 
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 dark:border-slate-600 focus:ring-blue-200'} bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all`}
                placeholder="Enter PIN (Try: 1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-xs mb-4">Incorrect PIN. Please try again.</p>}
            
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Unlock Document
            </button>
          </form>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-center">
          <p className="text-xs text-slate-400 flex justify-center items-center gap-1">
            <Shield className="w-3 h-3" /> Secure Vault Environment
          </p>
        </div>
      </div>
    </div>
  );
};

const SecureDocViewer = ({ isOpen, onClose, doc }) => {
  if (!isOpen || !doc) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-5xl w-full h-[85vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col border border-slate-700">
         <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all">
                <X className="w-6 h-6" />
            </button>
         </div>
         <div className="flex-grow flex items-center justify-center p-4 bg-dots-pattern">
            <img src={doc.secretImage} alt="Confidential" className="max-w-full max-h-full object-contain rounded-md shadow-2xl" />
         </div>
         <div className="bg-slate-950 p-6 border-t border-slate-800 flex justify-between items-center text-white">
            <div>
                <h3 className="font-bold text-lg">{doc.title}</h3>
                <p className="text-sm text-slate-400">Restricted Access • Confidential</p>
            </div>
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                Authenticated
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [secureDocToUnlock, setSecureDocToUnlock] = useState(null);
  const [unlockedDoc, setUnlockedDoc] = useState(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    // Default to dark mode for a more professional feel? Or system pref.
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleDocClick = (doc) => {
    setSecureDocToUnlock(doc);
  };

  const handleUnlockSuccess = () => {
    setUnlockedDoc(secureDocToUnlock);
    setSecureDocToUnlock(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-200 selection:text-blue-900 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
               <Briefcase size={22} />
            </div>
            <div className="leading-tight">
              <span className="block">Laxman Singh</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">HR & Operations</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
              {['Experience', 'Skills', 'Certificates', 'Vault'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 pl-2 md:pl-6 md:border-l border-slate-200 dark:border-slate-800">
                <button 
                    onClick={() => setIsShareOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg shadow-blue-500/20"
                >
                <Share2 size={16} />
                <span className="hidden sm:inline">Share</span>
                </button>

                <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
                >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-4xl animate-in slide-in-from-bottom-10 fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold mb-8 border border-blue-100 dark:border-blue-900/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            HR Manager | Project Coordinator | Compliance Expert
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Bridging People, Process, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              & Operational Excellence.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-2xl">
            HR professional with a unique blend of strategic clarity and hands-on execution. 
            Leveraging a UPSC background to approach workplace complexities with a broader socio-administrative lens.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#experience" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 transform hover:-translate-y-1">
              <Briefcase size={20} />
              View Experience
            </a>
            <a href="#vault" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl font-bold transition-all flex items-center gap-2 transform hover:-translate-y-1">
              <Shield size={20} />
              Secure Docs
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {AWARDS.map((award, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
                   <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg h-fit text-amber-600 dark:text-amber-400">
                      <Award size={24} />
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{award.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{award.desc}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <Section id="experience" title="Professional Journey" className="bg-slate-50 dark:bg-slate-900/50">
        <FeatureProject />
        <div className="mt-20">
          {EXPERIENCE_DATA.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Core Competencies">
        <div className="flex flex-wrap gap-3 mb-12">
            {SKILLS.map(skill => (
                <div key={skill} className="px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm flex items-center gap-2 hover:border-blue-500 transition-colors">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{skill}</span>
                </div>
            ))}
        </div>
      </Section>

      {/* Certificates Section */}
      <Section id="certificates" title="Certifications & Education" className="bg-slate-50 dark:bg-slate-900/50">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATES_DATA.map((cert) => (
               <div key={cert.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-700 rounded-xl mb-4 overflow-hidden">
                     <img src={cert.image} alt="Certificate" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1 leading-snug">{cert.title}</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">{cert.issuer}</p>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500">
                    <span>{cert.date}</span>
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">{cert.credentialId.slice(0, 10)}...</span>
                  </div>
               </div>
            ))}
         </div>
      </Section>

      {/* Secure Vault Section */}
      <Section id="vault" title="Secure Document Vault" className="relative my-20">
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-blue-300 font-bold mb-3 bg-blue-900/50 px-3 py-1 rounded-full text-sm">
                  <Lock className="w-4 h-4" /> 
                  ENCRYPTED STORAGE
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Personal Identity Vault</h3>
                <p className="text-slate-400 max-w-xl text-lg">
                  A secured repository for sensitive documentation. Access is restricted to authorized personnel via PIN authentication.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {SECURE_DOCS_DATA.map((doc) => {
                const Icon = doc.previewIcon;
                return (
                  <button 
                    key={doc.id}
                    onClick={() => handleDocClick(doc)}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 transition-all text-left flex flex-col h-56 justify-between relative overflow-hidden backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:to-blue-600/20 transition-all duration-500" />
                    
                    <div className="flex justify-between items-start z-10">
                      <div className="p-4 bg-slate-800 rounded-xl group-hover:bg-blue-600 transition-colors shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="p-2 bg-black/20 rounded-lg">
                        <Lock className="w-4 h-4 text-slate-400 group-hover:text-blue-300" />
                      </div>
                    </div>

                    <div className="z-10">
                      <h4 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{doc.title}</h4>
                      <p className="text-sm text-slate-400">{doc.type} • Secured</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Laxman Singh Jadon</h2>
              <p className="text-slate-500 dark:text-slate-400">luckysingh0508.lsj@gmail.com • +91 8383842382</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Greater Noida, U.P.</p>
          </div>
          <div className="flex items-center gap-4">
             <a href="#" className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:shadow-lg transition-all"><Linkedin size={24} /></a>
             <a href="mailto:luckysingh0508.lsj@gmail.com" className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:shadow-lg transition-all"><Mail size={24} /></a>
             <a href="tel:+918383842382" className="p-3 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:shadow-lg transition-all"><Phone size={24} /></a>
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm mt-12 border-t border-slate-200 dark:border-slate-800 pt-8">
            © {new Date().getFullYear()} Laxman Singh Jadon. All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      <PasswordModal 
        isOpen={!!secureDocToUnlock} 
        onClose={() => setSecureDocToUnlock(null)}
        docTitle={secureDocToUnlock?.title}
        onSuccess={handleUnlockSuccess}
      />
      
      <SecureDocViewer 
        isOpen={!!unlockedDoc}
        onClose={() => setUnlockedDoc(null)}
        doc={unlockedDoc}
      />
      
      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

    </div>
  );
};

export default App;