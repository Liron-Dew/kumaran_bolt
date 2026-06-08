import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ChevronDown, Menu, X, Brain, Cpu, Cloud, ShieldCheck, BarChart3,
  Landmark, Radio, Car, ShoppingBag, TrendingUp, Globe, Award,
  Users, CheckCircle, Quote, Mail, Phone, MapPin, ExternalLink, Layers,
  Zap, Lock, Database, Code2, FlaskConical, Star, ChevronRight, Play,
  Target, Microscope, GraduationCap, Heart,
} from 'lucide-react';

// ─── Brand tokens ──────────────────────────────────────────────────────────────
// Logo green  : #5BBF82   Logo gold : #F0C840
// Bg main     : #060d09   Bg alt    : #09130b
// Card        : #0d1a10   Nav solid : #081009
const K_GREEN  = '#5BBF82';
const K_GOLD   = '#F0C840';

// Real Kumaran CDN assets
const LOGO_WHITE = 'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkumaran-systems-logo-white.696b9781.png&w=384&q=100';
const LOGO_BLACK = 'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkumaran-systems-logo-black.4b4b588a.png&w=384&q=100';

const IMG = {
  banking:    'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanking-image.0a81fa17.jpg&w=1920&q=75',
  insurance:  'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finsurance-image.fa130dfc.jpg&w=1920&q=75',
  telecom:    'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftelecom-image.c7efcc80.jpg&w=1920&q=75',
  automotive: 'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fautomotive-image.ee3916ee.jpg&w=1920&q=75',
  retail:     'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?w=800&q=80',
  healthcare: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?w=800&q=80',
  cs1:        'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcase-study-1.9eaae473.jpg&w=1200&q=75',
  cs2:        'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcase-study-2.ff9a33dc.jpg&w=1200&q=75',
  cs3:        'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcase-study-3.449a84cb.jpg&w=1200&q=75',
  blog1:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMainframe-Modernization-Avoiding-Downtime-and-Disruption.a651eecf.jpg&w=640&q=75',
  blog2:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FCan-the-Cloud-Replace-Mainframes.3e7552fc.jpg&w=640&q=75',
  blog3:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FArtificial-Intelligence-Insurance.6fd40261.jpg&w=640&q=75',
  blog4:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMonolithic-to-Microservices-Implementation.f14e912d.jpg&w=640&q=75',
  wp1:        'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMainframe-Migration-Modernizing-from-Cobol.ee02db9f.jpg&w=640&q=75',
  prod1:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproduct2.8d667553.png&w=640&q=75',
  prod2:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproduct1.77466f0a.png&w=640&q=75',
  prod3:      'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproduct3.241930c8.png&w=640&q=75',
  services:   'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg.561d511c.jpg&w=1080&q=75',
  soc2:       'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsoc-2-type2-logo.a0e300e8.png&w=256&q=75',
  iso:        'https://kumaran.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbsi.65aec001.png&w=256&q=75',
};

// ─── Utility ────────────────────────────────────────────────────────────────────

function FadeIn({
  children, delay = 0, direction = 'up', className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (end / 2000) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Navigation ─────────────────────────────────────────────────────────────────

const navItems = [
  { label: 'Solutions', children: ['AI Solutions', 'Legacy Modernization', 'Test Automation', 'Cloud Services', 'Data & Analytics', 'Regulatory & Compliance'] },
  { label: 'Industries', children: ['Banking & Finance', 'Insurance', 'Telecom', 'Automotive', 'Retail', 'Healthcare'] },
  { label: 'Products',   children: ['KTAC – Test Automation', 'Data Quality Validator', 'Employee Productivity Tracker'] },
  { label: 'Resources',  children: ['Case Studies', 'Blogs', 'Whitepapers'] },
  { label: 'Company',    children: ['About Us', 'Leadership', 'Certifications', 'Culture', 'Careers'] },
];

const sectionMap: Record<string, string> = {
  'AI Solutions': '#solutions', 'Legacy Modernization': '#solutions', 'Test Automation': '#solutions',
  'Cloud Services': '#solutions', 'Data & Analytics': '#solutions', 'Regulatory & Compliance': '#solutions',
  'Banking & Finance': '#industries', 'Insurance': '#industries', 'Telecom': '#industries',
  'Automotive': '#industries', 'Retail': '#industries', 'Healthcare': '#industries',
  'KTAC – Test Automation': '#products', 'Data Quality Validator': '#products', 'Employee Productivity Tracker': '#products',
  'Case Studies': '#case-studies', 'Blogs': '#insights', 'Whitepapers': '#insights',
  'About Us': '#why-kumaran', 'Leadership': '#why-kumaran', 'Certifications': '#trusted',
  'Culture': '#why-kumaran', 'Careers': '#why-kumaran',
};

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#060d09]/96 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/40'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo — real asset */}
          <a href="/" className="flex-shrink-0">
            <img
              src={LOGO_WHITE}
              alt="Kumaran Systems"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                // Fallback wordmark if CDN fails
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Fallback wordmark */}
            <span className="hidden text-white font-bold text-xl">
              Kumaran <span style={{ color: K_GREEN }}>Systems</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </button>
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 mt-1.5 w-56 bg-[#0a1509]/97 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="p-1.5">
                        {item.children.map((child) => (
                          <a key={child} href={sectionMap[child] ?? '#'}
                            className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/6 rounded-xl transition-all duration-150 group"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                              style={{ background: K_GREEN }}
                            />
                            {child}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${K_GREEN}, #3da865)` }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Contact Us
            </a>
          </div>

          <button className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#060d09]/98 backdrop-blur-xl border-b border-white/8 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-bold uppercase tracking-widest px-3 pt-4 pb-1" style={{ color: K_GREEN }}>
                    {item.label}
                  </p>
                  {item.children.map((child) => (
                    <a key={child} href={sectionMap[child] ?? '#'}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child}
                    </a>
                  ))}
                </div>
              ))}
              <div className="pt-4">
                <a href="#contact"
                  className="block w-full text-center px-5 py-3 rounded-xl text-white text-sm font-semibold"
                  style={{ background: `linear-gradient(135deg, ${K_GREEN}, #3da865)` }}
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────────

const heroWords = ['Legacy Systems', 'Core Banking', 'Enterprise Apps', 'Mainframe Assets'];

function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % heroWords.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060d09]">
      {/* Subtle grid */}
      <div className="absolute inset-0"
        style={{ backgroundImage: `linear-gradient(rgba(91,191,130,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(91,191,130,0.03) 1px, transparent 1px)`, backgroundSize: '72px 72px' }}
      />
      {/* Glows */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(91,191,130,0.07) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(240,200,64,0.05) 0%, transparent 70%)' }}
      />
      {/* Rotating conic */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none"
        style={{ background: `conic-gradient(from 0deg, transparent, ${K_GREEN}55, transparent)`, borderRadius: '50%' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-sm font-medium"
              style={{ background: `${K_GREEN}18`, borderColor: `${K_GREEN}40`, color: K_GREEN }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: K_GREEN }} />
              Built on Legacy · Driven by AI · Engineered for What's Next
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.07] tracking-tight"
            >
              Transform Your{' '}
              <span className="block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.38 }}
                    className="inline-block"
                    style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {heroWords[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="block">into AI Platforms</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              30+ years of engineering excellence. Kumaran Systems modernizes mission-critical
              systems for global enterprises with AI-led transformation and cloud migration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#solutions"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 shadow-xl"
                style={{ background: `linear-gradient(135deg, ${K_GREEN}, #3da865)`, boxShadow: `0 8px 32px ${K_GREEN}30` }}
              >
                Explore Solutions
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#case-studies"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/12 text-white font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <Play className="w-4 h-4" style={{ color: K_GREEN }} />
                View Case Studies
              </a>
            </motion.div>

            {/* Trust micro-badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-5 pt-2"
            >
              {[
                { icon: ShieldCheck, label: 'SOC 2 Type II' },
                { icon: Award,        label: 'ISO 27001'    },
                { icon: Globe,        label: '40+ Countries' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon className="w-4 h-4" style={{ color: K_GREEN }} />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — animated stats cluster */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="relative w-full max-w-md mx-auto aspect-square"
            >
              {/* Rings */}
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: `${K_GREEN}25` }} />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-10 rounded-full border border-dashed" style={{ borderColor: `${K_GOLD}18` }} />

              {/* Centre card */}
              <div className="absolute inset-[18%] rounded-2xl border backdrop-blur-sm flex flex-col items-center justify-center gap-3 shadow-2xl"
                style={{ background: `${K_GREEN}12`, borderColor: `${K_GREEN}35` }}>
                {/* Real logo in center */}
                <img src={LOGO_WHITE} alt="Kumaran" className="w-28 object-contain" />
                <p className="text-white/60 text-xs tracking-wide">Since 1992</p>
              </div>

              {/* Floating stat pills */}
              {[
                { v: '1992',  l: 'Founded',    s: 'Legacy of excellence', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                { v: '2000+', l: 'Projects',   s: 'Delivered',            pos: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'  },
                { v: '40+',   l: 'Countries',  s: 'Global reach',         pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                { v: '20yr+', l: 'Avg. Client',s: 'Relationship span',    pos: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'  },
              ].map(({ v, l, s, pos }) => (
                <motion.div key={l} whileHover={{ scale: 1.1 }}
                  className={`absolute ${pos} bg-[#0d1a10]/95 border border-white/10 rounded-xl px-4 py-3 text-center shadow-xl backdrop-blur-sm`}
                >
                  <p className="font-bold text-xl" style={{ color: K_GREEN }}>{v}</p>
                  <p className="text-white text-xs font-semibold">{l}</p>
                  <p className="text-gray-500 text-xs">{s}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600">
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

// ─── Trusted By ──────────────────────────────────────────────────────────────────

const clientNames = [
  'Royal Bank of Canada', 'TD Bank', 'Scotiabank', 'BMO Financial',
  'CIBC', 'Allstate Insurance', 'Intact Financial', 'Sun Life',
  'Manulife', 'Great-West Life', 'Desjardins',
];

function TrustedBy() {
  return (
    <section id="trusted" className="py-20 bg-[#09130b] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-12">
            Trusted by Global Enterprises for 30+ Years
          </p>
        </FadeIn>

        {/* Cert badges with real logo images */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-5 mb-14">
            {/* SOC 2 */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-all">
              <img src={IMG.soc2} alt="SOC 2 Type II" className="h-8 w-auto object-contain opacity-80" />
              <div>
                <p className="text-white text-sm font-semibold">SOC 2 Type II</p>
                <p className="text-gray-500 text-xs">Certified</p>
              </div>
            </div>
            {/* ISO */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-all">
              <img src={IMG.iso} alt="ISO 27001" className="h-8 w-auto object-contain opacity-80" />
              <div>
                <p className="text-white text-sm font-semibold">ISO/IEC 27001</p>
                <p className="text-gray-500 text-xs">ISMS Certified</p>
              </div>
            </div>
            {[
              { icon: Globe, label: '40+ Countries', sub: 'Global Delivery' },
              { icon: Users, label: '1,000–5,000', sub: 'Professionals' },
              { icon: CheckCircle, label: '2000+ Projects', sub: 'Delivered' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-all">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${K_GREEN}18` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: K_GREEN }} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Marquee */}
        <div className="overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...clientNames, ...clientNames].map((n, i) => (
              <span key={i} className="text-gray-600 font-semibold text-sm uppercase tracking-[0.15em] hover:text-gray-400 transition-colors cursor-default">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Impact Metrics ──────────────────────────────────────────────────────────────

const metrics = [
  { value: 2000,  suffix: '+',  label: 'Projects Delivered',   sub: 'Since 1992'           },
  { value: 40,    suffix: '+',  label: 'Countries Served',      sub: 'Global footprint'     },
  { value: 1200,  suffix: '+',  label: 'Person-Years',          sub: 'Banking IT expertise' },
  { value: 20,    suffix: '%',  label: 'Dev Time Reduction',    sub: 'Via reusable code'    },
  { value: 18,    suffix: '+',  label: 'Years Avg. Engagement', sub: 'Client retention'     },
  { value: 99,    suffix: '%',  label: 'Batch SLA Achieved',    sub: 'Up from 32%'          },
];

function ImpactMetrics() {
  return (
    <section className="py-28 bg-[#060d09] relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at center, ${K_GREEN}07 0%, transparent 65%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>
            The Kumaran Impact
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Numbers That Define{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Our Excellence
            </span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {metrics.map(({ value, suffix, label, sub }, i) => (
            <FadeIn key={label} delay={i * 0.07}>
              <motion.div whileHover={{ y: -5 }}
                className="text-center p-6 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 transition-all duration-300"
                style={{ '--tw-shadow': `0 0 0 1px ${K_GREEN}00` } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${K_GREEN}35`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <p className="text-3xl lg:text-4xl font-bold mb-2"
                  style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <CountUp end={value} suffix={suffix} />
                </p>
                <p className="text-white text-sm font-semibold mb-1">{label}</p>
                <p className="text-gray-600 text-xs">{sub}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions ───────────────────────────────────────────────────────────────────

const solutions = [
  { icon: Brain,      title: 'AI Solutions',             tag: 'kumaran.ai',        desc: 'AI solutions engineered to give your business a competitive edge — GenAI, intelligent automation, and LLM-powered workflows.',   features: ['Generative AI', 'Intelligent Automation', 'AI Consulting', 'LLM Integration'],  accent: K_GREEN },
  { icon: Layers,     title: 'Legacy Modernization',     tag: 'Core Capability',   desc: 'AI-driven transformation from mainframe, COBOL, Oracle Forms, and PowerBuilder to cloud-native modern architectures.',          features: ['Mainframe Migration', 'COBOL to Java', 'Oracle Forms', 'PowerBuilder'],         accent: '#4AB87A' },
  { icon: Cloud,      title: 'Cloud Engineering',        tag: 'Infrastructure',    desc: 'Accelerated cloud transformation with deep expertise in re-platforming and re-architecting for cloud-native performance.',        features: ['Cloud Migration', 'Cloud-Native Dev', 'DevSecOps', 'Multi-Cloud'],              accent: '#3DA865' },
  { icon: FlaskConical, title: 'Quality Engineering',   tag: 'Assurance',         desc: 'End-to-end test automation and QA services with codeless KTAC — zero-defect UAT cycles, every time.',                           features: ['Test Automation', 'KTAC Platform', 'UAT Lifecycle', 'Performance Testing'],    accent: K_GOLD   },
  { icon: BarChart3,  title: 'Data & Analytics',         tag: 'Insights',          desc: 'Data warehousing, BI, and analytics services powered by our DQV — the Data Quality Validator platform.',                          features: ['Data Warehousing', 'BI & Reporting', 'Data Migration', 'DQV Platform'],        accent: '#E8BF35' },
  { icon: ShieldCheck, title: 'Regulatory & Compliance', tag: 'Risk',              desc: 'Basel II/III compliant credit, market, and operational risk systems — purpose-built for regulated financial institutions.',       features: ['Basel II/III', 'Credit Risk', 'Market Risk', 'Operational Risk'],              accent: '#D4A82A' },
];

function Solutions() {
  return (
    <section id="solutions" className="py-28 bg-[#09130b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Solutions</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Scalable Solutions That Drive{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Meaningful Results
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI-first engineering capabilities spanning the full transformation lifecycle —
            from legacy modernization to cloud-native deployment.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map(({ icon: Icon, title, tag, desc, features, accent }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <motion.div whileHover={{ y: -6 }}
                className="group relative p-7 rounded-2xl bg-white/3 border border-white/8 hover:border-white/14 transition-all duration-400 shadow-lg hover:shadow-2xl overflow-hidden h-full cursor-pointer"
                onMouseEnter={e => { (e.currentTarget.style.borderColor = `${accent}35`); (e.currentTarget.style.boxShadow = `0 20px 60px ${accent}12`); }}
                onMouseLeave={e => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'); (e.currentTarget.style.boxShadow = ''); }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 inset-x-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg"
                  style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}>
                  <Icon className="w-5.5 h-5.5" style={{ color: accent }} />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-xs border border-white/8">{tag}</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>

                <ul className="space-y-1.5 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-500 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all duration-200"
                  style={{ color: accent }}>
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Industries ──────────────────────────────────────────────────────────────────

const industries = [
  { icon: Landmark,   title: 'Banking & Finance', desc: 'Strategic technology partner to global banks. Basel II/III compliant systems, credit risk management, and 18+ years of BFS expertise with 200+ active resources.',   metric: '1200+',      metricSub: 'Person-years BFS',        image: IMG.banking   },
  { icon: ShieldCheck, title: 'Insurance',        desc: 'Scalable digital transformation solutions generating customer value and accelerating the insurance digital journey. AI-powered cognitive document processing.',        metric: 'AI-Powered', metricSub: 'P&C document processing', image: IMG.insurance  },
  { icon: Radio,      title: 'Telecom',           desc: 'Solutions that drive growth and enable businesses to thrive in the rapidly evolving digital landscape of telecommunications and next-gen network infrastructure.',     metric: 'Next-Gen',   metricSub: 'Digital network platforms', image: IMG.telecom   },
  { icon: Car,        title: 'Automotive',        desc: 'AI-driven automotive solutions tailored to ensure enhanced security, state-of-the-art automation, and connectivity for modern connected vehicle ecosystems.',           metric: 'AI-Driven',  metricSub: 'Security & automation',   image: IMG.automotive },
  { icon: ShoppingBag, title: 'Retail',           desc: 'Modernizing retailer performance with best-of-breed solutions for inventory management, omnichannel experiences, and real-time analytics.',                            metric: 'Omnichannel',metricSub: 'Retail modernization',    image: IMG.retail    },
  { icon: Heart,      title: 'Healthcare',        desc: 'Compliant and secure software for healthcare providers and payers — enabling digital transformation at scale with HIPAA-ready, interoperable platforms.',              metric: 'HIPAA',      metricSub: 'Compliant & secure',      image: IMG.healthcare },
];

function Industries() {
  const [active, setActive] = useState(0);
  return (
    <section id="industries" className="py-28 bg-[#060d09]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Industries</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Expertise That Empowers{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Industries Worldwide
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Deep vertical expertise across regulated industries — delivering solutions grounded in
            decades of domain knowledge and compliance experience.
          </p>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {industries.map(({ icon: Icon, title }, i) => (
              <button key={title} onClick={() => setActive(i)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={active === i
                  ? { background: `linear-gradient(135deg, ${K_GREEN}, #3da865)`, color: '#fff', boxShadow: `0 4px 20px ${K_GREEN}35` }
                  : { background: 'rgba(255,255,255,0.04)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.08)' }
                }
                onMouseEnter={e => { if (active !== i) (e.currentTarget.style.color = '#fff'); }}
                onMouseLeave={e => { if (active !== i) (e.currentTarget.style.color = '#9ca3af'); }}
              >
                <Icon className="w-4 h-4" />
                {title}
              </button>
            ))}
          </div>
        </FadeIn>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {(() => {
                  const { icon: Icon } = industries[active];
                  return (
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                      style={{ background: `linear-gradient(135deg, ${K_GREEN}, #3da865)` }}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  );
                })()}
                <h3 className="text-3xl font-bold text-white">{industries[active].title}</h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">{industries[active].desc}</p>
              <div className="inline-flex items-center gap-4 px-5 py-4 rounded-xl border"
                style={{ background: `${K_GREEN}10`, borderColor: `${K_GREEN}25` }}>
                <p className="font-bold text-2xl" style={{ color: K_GREEN }}>{industries[active].metric}</p>
                <p className="text-gray-400 text-sm">{industries[active].metricSub}</p>
              </div>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                Explore {industries[active].title} Solutions <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                style={{ background: `radial-gradient(circle, ${K_GREEN}40, transparent)` }}
              />
              <img src={industries[active].image} alt={industries[active].title}
                className="relative w-full aspect-video object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Products ────────────────────────────────────────────────────────────────────

const products = [
  {
    name: 'KTAC',
    full: 'Kumaran Test Automation Center',
    desc: 'Codeless test automation platform designed to encourage reusability and dramatically reduce time to create new test cases. Zero-defect UAT cycles.',
    badge: 'Proprietary Platform',
    features: ['Codeless Automation', 'Reusable Test Assets', 'CI/CD Integration', 'Reporting Dashboard'],
    icon: Zap,
    accent: K_GREEN,
    stat: '20%',
    statLabel: 'Dev time reduction',
    image: IMG.prod1,
  },
  {
    name: 'DQV',
    full: 'Data Quality Validator',
    desc: 'Smart platform to compare, migrate, mask, validate, or generate synthetic data. Accelerates data transfer with ease across diverse data sources.',
    badge: 'Data Intelligence',
    features: ['Data Comparison', 'Migration Validation', 'Data Masking', 'Synthetic Data Gen'],
    icon: Database,
    accent: K_GOLD,
    stat: '100%',
    statLabel: 'Data integrity assured',
    image: IMG.prod2,
  },
  {
    name: 'eTRK',
    full: 'Employee Productivity Tracker',
    desc: 'Enhances employee performance and ensures transparency with colleagues and reporting managers. Data-driven metrics with continuous improvement.',
    badge: 'Workforce Intelligence',
    features: ['Real-time Tracking', 'Performance Analytics', 'Manager Dashboards', 'Transparency Tools'],
    icon: TrendingUp,
    accent: '#4AB87A',
    stat: '30%',
    statLabel: 'Productivity uplift',
    image: IMG.prod3,
  },
];

function Products() {
  return (
    <section id="products" className="py-28 bg-[#09130b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Products</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            Innovations That{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Reimagine the Future of IT
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Proprietary platforms built from 30 years of delivery experience —
            engineered to accelerate transformation and reduce friction.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-7">
          {products.map(({ name, full, desc, badge, features, icon: Icon, accent, stat, statLabel, image }, i) => (
            <FadeIn key={name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -8 }}
                className="group relative rounded-2xl bg-white/3 border border-white/8 transition-all duration-400 hover:shadow-2xl overflow-hidden h-full flex flex-col"
                onMouseEnter={e => { (e.currentTarget.style.borderColor = `${accent}35`); (e.currentTarget.style.boxShadow = `0 24px 64px ${accent}12`); }}
                onMouseLeave={e => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'); (e.currentTarget.style.boxShadow = ''); }}
              >
                {/* Product screenshot strip */}
                <div className="relative overflow-hidden h-40 bg-[#0d1a10]">
                  <img src={image} alt={name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 0%, #09130b 100%)` }} />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/10"
                    style={{ background: `${accent}25`, color: accent }}>
                    {badge}
                  </span>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}>
                      <Icon className="w-5.5 h-5.5" style={{ color: accent }} />
                    </div>
                    <div>
                      <p className="font-black text-3xl leading-none" style={{ color: accent }}>{name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{full}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{desc}</p>

                  <ul className="space-y-2 mb-6">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-gray-400 text-sm">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-5 border-t border-white/8">
                    <div>
                      <p className="text-2xl font-bold" style={{ color: accent }}>{stat}</p>
                      <p className="text-gray-600 text-xs">{statLabel}</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Showcase ─────────────────────────────────────────────────────────────────

function AIShowcase() {
  const features = [
    { icon: Brain,     title: 'GenAI-Enabled Workflows',    desc: 'LLM-powered automation for document processing, code generation, and intelligent decision support.' },
    { icon: Code2,     title: 'AI-Led Code Modernization',  desc: 'Automated COBOL-to-Java transpilation, dead code elimination, and dependency mapping at scale.'     },
    { icon: Microscope, title: 'Intelligent Testing',       desc: 'AI-driven test case generation, self-healing automation, and predictive defect analysis.'            },
    { icon: Lock,      title: 'AI Risk & Compliance',       desc: 'Real-time anomaly detection, Basel-aligned risk scoring, and automated regulatory reporting.'        },
  ];

  return (
    <section className="py-28 bg-[#060d09] relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 60% 50%, ${K_GREEN}06 0%, transparent 60%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <FadeIn direction="right">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>AI Transformation</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                  Engineering the Future with{' '}
                  <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AI-First Thinking
                  </span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  At kumaran.ai we don't bolt on AI — we engineer it into the fabric of transformation.
                  From intelligent legacy analysis to GenAI-powered application re-architecture,
                  our capabilities redefine what's possible.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {features.map(({ icon: Icon, title, desc }, i) => (
                  <FadeIn key={title} delay={i * 0.07}>
                    <motion.div
                      className="p-5 rounded-xl bg-white/3 border border-white/8 transition-all duration-300"
                      onMouseEnter={e => (e.currentTarget.style.borderColor = `${K_GREEN}30`)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: `${K_GREEN}18` }}>
                        <Icon className="w-4.5 h-4.5" style={{ color: K_GREEN }} />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-2">{title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>

              <a href="https://kumaran.ai" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 shadow-xl"
                style={{ background: `linear-gradient(135deg, ${K_GREEN}, #3da865)`, boxShadow: `0 8px 32px ${K_GREEN}30` }}>
                Explore kumaran.ai <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-20"
                style={{ background: K_GREEN }}
              />
              <div className="relative rounded-2xl border backdrop-blur-sm p-8"
                style={{ background: '#0d1a10cc', borderColor: `${K_GREEN}25` }}>
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full" style={{ background: K_GREEN, opacity: 0.7 }} />
                  <span className="ml-2 text-gray-600 text-xs font-mono">kumaran-ai / transform</span>
                </div>

                <div className="space-y-3 font-mono text-sm">
                  {[
                    { label: '> Analyzing legacy codebase',           done: true  },
                    { label: '  — 2.4M lines COBOL scanned',          done: true  },
                    { label: '  — 847 business rules extracted',       done: true  },
                    { label: '> Generating modernization roadmap',     done: true  },
                    { label: '> Deploying AI transformation agents',   done: false },
                    { label: '  — Target: cloud-native microservices', done: false },
                    { label: '  — Projected 5-yr savings: $13.13M',   done: false },
                  ].map(({ label, done }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.14 + 0.5 }}
                      className="flex items-center gap-2"
                      style={{ color: done ? '#9ca3af' : K_GREEN }}
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${!done ? 'animate-pulse' : ''}`}
                        style={{ background: done ? '#4b5563' : K_GREEN }}
                      />
                      <span>{label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/8">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-500">Transformation confidence</span>
                    <span className="font-semibold" style={{ color: K_GREEN }}>98.4%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: '98%' }}
                      transition={{ duration: 2.2, delay: 1.8 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${K_GREEN}, ${K_GOLD})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Case Studies ────────────────────────────────────────────────────────────────

const caseStudies = [
  {
    client: 'US Automobile Giant',
    industry: 'Automotive',
    title: 'Mainframe Modernization for Manufacturing Scale',
    desc: 'Delivered scalability, reliability, and security of manufacturing systems with industry-leading techniques, enhancing performance and user experience across the enterprise.',
    metrics: [{ value: '$13.13M', label: 'Estimated 5-year savings' }, { value: '99%', label: 'Batch SLA (was 32%)' }],
    tags: ['Mainframe', 'Manufacturing', 'Performance'],
    image: IMG.cs1,
  },
  {
    client: 'Leading US Retail Bank',
    industry: 'Banking',
    title: 'Monolithic to Microservices Migration',
    desc: 'Migrated a Loan Origination and Processing System from monolithic JEE architecture to cloud-native microservices, enabling independent scaling and rapid release cycles.',
    metrics: [{ value: '60%', label: 'Release cycle reduction' }, { value: '3x', label: 'Deployment frequency' }],
    tags: ['Microservices', 'Banking', 'Cloud-Native'],
    image: IMG.cs2,
  },
  {
    client: 'Major US Commercial Bank',
    industry: 'Banking',
    title: 'Informix to Oracle Migration',
    desc: "Improved performance of legacy banking applications through migration to Oracle, leveraging Kumaran's deep database expertise and proven zero-downtime migration methodology.",
    metrics: [{ value: '40%', label: 'Query performance gain' }, { value: '0', label: 'Data loss incidents' }],
    tags: ['Database Migration', 'Oracle', 'Legacy'],
    image: IMG.cs3,
  },
];

function CaseStudies() {
  return (
    <section id="case-studies" className="py-28 bg-[#09130b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Case Studies</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Success Stories That{' '}
              <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Speak for Themselves
              </span>
            </h2>
          </div>
          <a href="https://kumaran.com/casestudy/" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity"
            style={{ color: K_GREEN }}>
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-7">
          {caseStudies.map(({ client, industry, title, desc, metrics, tags, image }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }}
                className="group rounded-2xl bg-white/3 border border-white/8 hover:border-white/14 overflow-hidden transition-all duration-400 hover:shadow-2xl h-full flex flex-col"
                style={{ '--hover-shadow': `0 24px 64px ${K_GREEN}10` } as React.CSSProperties}
                onMouseEnter={e => { (e.currentTarget.style.borderColor = `${K_GREEN}30`); (e.currentTarget.style.boxShadow = `0 24px 64px ${K_GREEN}10`); }}
                onMouseLeave={e => { (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'); (e.currentTarget.style.boxShadow = ''); }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={image} alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #09130b 0%, transparent 60%)' }} />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm"
                    style={{ background: `${K_GREEN}cc` }}>
                    {industry}
                  </span>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: K_GREEN }}>{client}</p>
                  <h3 className="text-white font-bold text-lg leading-snug mb-3">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">{desc}</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {metrics.map(({ value, label }) => (
                      <div key={label} className="p-3 rounded-xl border"
                        style={{ background: `${K_GREEN}0d`, borderColor: `${K_GREEN}25` }}>
                        <p className="font-bold text-xl" style={{ color: K_GREEN }}>{value}</p>
                        <p className="text-gray-500 text-xs leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-500 text-xs border border-white/6">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Insights ────────────────────────────────────────────────────────────────────

const insights = [
  { type: 'Blog',       date: 'April 2025',    readTime: '6 min',  title: 'Mainframe Modernization: Avoiding Downtime and Disruption',                      excerpt: 'Strategic approaches to zero-disruption migration — how to sequence the transformation without impacting operations.',               image: IMG.blog1, href: 'https://kumaran.com/mainframe-modernization-avoiding-downtime-and-disruption/' },
  { type: 'Blog',       date: 'February 2025', readTime: '6 min',  title: 'Can the Cloud Replace Mainframes?',                                               excerpt: 'An honest analysis of when cloud migration makes sense, and when mainframe modernization is the wiser choice.',                       image: IMG.blog2, href: 'https://kumaran.com/can-the-cloud-replace-mainframes'                    },
  { type: 'Blog',       date: 'March 2025',    readTime: '6 min',  title: 'Artificial Intelligence (AI) In Insurance',                                       excerpt: 'How AI and cognitive document processing are reshaping the P&C insurance industry with intelligent extraction.',                      image: IMG.blog3, href: 'https://kumaran.com/artificial-intelligence-ai-in-insurance'              },
  { type: 'Whitepaper', date: 'March 2025',    readTime: '12 min', title: 'Mainframe Migration: Modernizing from COBOL/CICS to J2EE',                        excerpt: 'Deep-dive technical guidance on migrating COBOL/CICS to J2EE and converting VSAM to DB2 with zero data loss.',                      image: IMG.wp1,   href: 'https://kumaran.com/whitepapers/mainframe-migration-modernizing-from-cobol-cics-to-j2ee-and-from-vsam-to-db2-data-conversion/' },
];

function Insights() {
  return (
    <section id="insights" className="py-28 bg-[#060d09]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Thought Leadership</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Insights &{' '}
              <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Thought Leadership
              </span>
            </h2>
          </div>
          <a href="https://kumaran.com/blogs/" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 font-medium hover:opacity-80 transition-opacity"
            style={{ color: K_GREEN }}>
            View All Insights <ArrowRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map(({ type, date, readTime, title, excerpt, image, href }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}
                className="group block rounded-2xl bg-white/3 border border-white/8 overflow-hidden transition-all duration-300 hover:shadow-xl h-full"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${K_GREEN}30`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img src={image} alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060d09 0%, transparent 55%)' }} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                    style={type === 'Whitepaper'
                      ? { background: `${K_GOLD}cc`, color: '#1a1200' }
                      : { background: `${K_GREEN}cc`, color: '#fff' }
                    }>
                    {type}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-gray-600 text-xs mb-3">
                    <span>{date}</span><span>·</span><span>{readTime} read</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:transition-colors"
                    style={{ '--hover-color': K_GREEN } as React.CSSProperties}
                    onMouseEnter={e => (e.currentTarget.style.color = K_GREEN)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{excerpt}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-medium" style={{ color: K_GREEN }}>
                    Read More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Kumaran ─────────────────────────────────────────────────────────────────

const differentiators = [
  { icon: Target,       title: 'Client-First, Long-Term Focus',  desc: 'Many client relationships span 20+ years — built on trust, transparency, and shared outcomes. Not transactions.' },
  { icon: Brain,        title: 'AI-Led Automation',               desc: 'Intelligent, low-touch workflows that enhance productivity, accuracy, and digital self-reliance across your enterprise.' },
  { icon: Layers,       title: 'Legacy Modernization at Scale',   desc: 'Thousands of successful migrations executed with speed, precision, and minimal disruption to live business operations.' },
  { icon: Cloud,        title: 'Cloud-Ready Transformation',      desc: 'Deep expertise in re-platforming and re-architecting for scalable, cloud-native performance on any major provider.' },
  { icon: Zap,          title: 'Proprietary Accelerators',        desc: 'KTAC (Codeless Test Automation) and DQV (Data Quality Validation) cut testing cycles and reduce production defects.' },
  { icon: GraduationCap, title: 'Vertical Domain Depth',         desc: 'Solutions grounded in decades tackling complex, industry-specific challenges and stringent regulatory compliance.' },
];

function WhyKumaran() {
  return (
    <section id="why-kumaran" className="py-28 bg-[#09130b]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Why Kumaran</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
            What Sets Us{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Apart
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We blend engineering discipline with AI innovation — helping clients modernize with
            confidence, automate with clarity, and scale with purpose.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -4 }}
                className="p-7 rounded-2xl bg-white/3 border border-white/8 transition-all duration-300"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${K_GREEN}30`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center mb-5"
                  style={{ background: `${K_GREEN}15`, borderColor: `${K_GREEN}25` }}>
                  <Icon className="w-5.5 h-5.5" style={{ color: K_GREEN }} />
                </div>
                <h3 className="text-white font-bold text-base mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Global presence banner */}
        <FadeIn delay={0.2} className="mt-14">
          <div className="rounded-2xl border p-8"
            style={{ background: `linear-gradient(135deg, ${K_GREEN}0d, ${K_GOLD}06)`, borderColor: `${K_GREEN}20` }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">Trusted to Deliver Excellence Across Geographies</h3>
                <p className="text-gray-400 text-sm">Global delivery model ensuring agility, responsiveness, and seamless collaboration.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { flag: '🇺🇸', city: 'California', country: 'USA'    },
                  { flag: '🇨🇦', city: 'Toronto',    country: 'Canada' },
                  { flag: '🇦🇪', city: 'Dubai',      country: 'UAE'    },
                  { flag: '🇮🇳', city: 'Chennai',    country: 'India'  },
                  { flag: '🇮🇳', city: 'Bengaluru',  country: 'India'  },
                ].map(({ flag, city, country }) => (
                  <div key={`${city}-${country}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8">
                    <span className="text-base">{flag}</span>
                    <div>
                      <p className="text-white text-xs font-semibold">{city}</p>
                      <p className="text-gray-600 text-xs">{country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────────

const testimonials = [
  { quote: "Kumaran's deep banking domain knowledge and commitment to on-time delivery made them our go-to partner for critical system transformations. Their Basel III implementation was flawless.", author: 'Chief Technology Officer', company: 'Global Commercial Bank, Canada', rating: 5 },
  { quote: "The team modernized our 20-year-old mainframe application with zero business disruption. The estimated five-year savings validate every decision we made together.", author: 'VP of Engineering', company: 'Fortune 500 Automotive Manufacturer', rating: 5 },
  { quote: "KTAC transformed our QA process. Codeless automation reduced testing time by 40%, and the zero-defect UAT cycles speak for themselves.", author: 'Director of Quality Engineering', company: 'Leading North American Insurance Company', rating: 5 },
];

function Testimonials() {
  return (
    <section className="py-28 bg-[#060d09] relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at top, ${K_GREEN}05 0%, transparent 55%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: K_GREEN }}>Testimonials</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Voices of{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Our Partners
            </span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map(({ quote, author, company, rating }, i) => (
            <FadeIn key={author} delay={i * 0.1}>
              <motion.div whileHover={{ y: -5 }}
                className="relative p-8 rounded-2xl bg-white/3 border border-white/8 transition-all duration-300 h-full flex flex-col"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${K_GREEN}30`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <Quote className="w-8 h-8 mb-5 opacity-40" style={{ color: K_GREEN }} />
                <div className="flex mb-4">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6 italic">"{quote}"</p>
                <div className="pt-5 border-t border-white/8">
                  <p className="text-white font-semibold text-sm">{author}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{company}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ──────────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section id="contact" className="py-28 bg-[#09130b] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${K_GREEN}12 0%, transparent 50%, ${K_GOLD}08 100%)` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[100px]"
          style={{ background: `${K_GREEN}0d` }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: K_GREEN }}>Start Your Transformation</p>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Engineer{' '}
            <span style={{ background: `linear-gradient(135deg, ${K_GREEN}, ${K_GOLD})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              What's Next?
            </span>
          </h2>
          <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
            Let's discuss how Kumaran Systems can modernize your core systems, accelerate your
            cloud journey, and unlock AI-driven value for your enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <motion.a href="mailto:info@kumaran.com"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-2xl transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${K_GREEN}, #3da865)`, boxShadow: `0 12px 40px ${K_GREEN}35` }}>
              <Mail className="w-5 h-5" />
              Request a Consultation
            </motion.a>
            <motion.a href="https://kumaran.com/locate-us/" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/5 border border-white/12 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              <Phone className="w-5 h-5" style={{ color: K_GREEN }} />
              Talk to an Expert
            </motion.a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: K_GREEN }} />
            <span>California, USA · Toronto, Canada · Dubai, UAE · Chennai & Bengaluru, India</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────────

const footerLinks = {
  Solutions:  ['AI Solutions', 'Legacy Modernization', 'Cloud Engineering', 'Quality Engineering', 'Data & Analytics', 'Regulatory & Compliance'],
  Industries: ['Banking & Finance', 'Insurance', 'Telecom', 'Automotive', 'Retail', 'Healthcare'],
  Products:   ['KTAC', 'Data Quality Validator', 'Employee Tracker'],
  Company:    ['About Us', 'Leadership', 'Certifications', 'Culture', 'Careers', 'Privacy Policy'],
};

const footerHrefs: Record<string, string> = {
  'AI Solutions': 'https://www.kumaran.ai',
  'Legacy Modernization': 'https://kumaran.com/legacy-application-migration-services',
  'Cloud Engineering': 'https://kumaran.com/cloud-services/',
  'Quality Engineering': 'https://kumaran.com/quality-assurance-services/',
  'Data & Analytics': 'https://kumaran.com/data-analytics-services/',
  'About Us': 'https://kumaran.com/about-us/',
  'Leadership': 'https://kumaran.com/leadership/',
  'Certifications': 'https://kumaran.com/awards-certifications/',
  'Culture': 'https://kumaran.com/culture/',
  'Careers': 'https://careers.kumaran.com/',
  'Privacy Policy': 'https://kumaran.com/privacy-policy/',
  'KTAC': 'https://kumaran.com/banking/test-automation-center/',
  'Data Quality Validator': 'https://kumaran.com/dqv',
  'Employee Tracker': 'https://etrk.kumaran.com/',
};

function Footer() {
  return (
    <footer className="bg-[#030806] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand col */}
          <div className="lg:col-span-1">
            <img src={LOGO_WHITE} alt="Kumaran Systems" className="h-9 w-auto object-contain mb-5 opacity-90" />
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              Engineering Future-Ready Transformations since 1992. Built on Legacy. Driven by AI.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: K_GREEN, opacity: 0.7 }} />
                SOC 2 Type II Certified
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-xs">
                <Award className="w-3.5 h-3.5" style={{ color: K_GREEN, opacity: 0.7 }} />
                ISO/IEC 27001 ISMS Certified
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-white font-semibold text-sm mb-4">{group}</p>
              <ul className="space-y-2.5">
                {links.map((label) => (
                  <li key={label}>
                    <a href={footerHrefs[label] ?? '#'} target="_blank" rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-gray-300 transition-colors duration-200">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-sm">© 2026 Kumaran Systems. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-700 text-sm">
            <a href="https://kumaran.com/privacy-policy/" target="_blank" rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="https://kumaran.com/environmental-policy/" target="_blank" rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors">Environmental Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────────

export default function Homepage() {
  return (
    <div className="bg-[#060d09] text-white antialiased">
      <Navigation />
      <Hero />
      <TrustedBy />
      <ImpactMetrics />
      <Solutions />
      <Industries />
      <Products />
      <AIShowcase />
      <CaseStudies />
      <Insights />
      <WhyKumaran />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
