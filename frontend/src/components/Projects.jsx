import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink, FiGithub, FiChevronRight, FiLayers, FiX, FiArrowRight,
} from 'react-icons/fi';
import SectionStrip from './SectionStrip';

// Works with Create React App (no import.meta)
const BASE = `${process.env.PUBLIC_URL || ''}/`;
const EXTS = ['png', 'jpg', 'jpeg', 'webp', 'PNG', 'JPG', 'JPEG'];

// image = file name inside /public/projects WITHOUT the extension
// demo: set a real URL to enable "Launch Site". status: 'live' | 'dev'
const projects = [
  { id: '01', title: 'JU Event Management System', category: 'EDTECH · AI', status: 'live',
    tags: 'EDTECH · AI CHATBOT · EVENTS', image: 'pms-director-dashboard',
    desc: 'AI chatbot-integrated event platform built with Python and FastAPI, handling event planning, registration and automated student support.',
    stack: ['React UI', 'FastAPI', 'AI Chatbot', 'MySQL'], github: 'https://github.com/Sadik-ture', demo: null },
  { id: '02', title: 'JU Student Marketplace', category: 'E-COMMERCE', status: 'live',
    tags: 'E-COMMERCE · STUDENTS · FULL STACK', image: 'pms-users',
    desc: 'Full-stack marketplace exclusively for Jimma University students to buy, sell and discover items on campus.',
    stack: ['React UI', 'REST API', 'MySQL', 'Tailwind CSS'], github: 'https://github.com/Sadik-ture', demo: null },
  { id: '03', title: 'JU ICT Project Management', category: 'COMMERCIAL', status: 'live',
    tags: 'COMMERCIAL · PLANNING · TRACKING', image: 'pms-my-tasks',
    desc: 'Laravel 12 app for planning, assigning, and tracking ICT projects across teams with role-based dashboards.',
    stack: ['Blade / UI', 'Laravel 12', 'PHP', 'MySQL'], github: 'https://github.com/Sadik-ture', demo: null },
];

function Shot({ p, dim }) {
  const [extIndex, setExtIndex] = useState(0);
  useEffect(() => { setExtIndex(0); }, [p.id]);

  const failed = extIndex >= EXTS.length;
  const src = `${BASE}projects/${p.image}.${EXTS[extIndex]}`;

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--surface-2)] to-[var(--bg)] px-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{p.title}</span>
        <span className="font-mono text-[9px] text-[var(--text-muted)] opacity-60">
          image not found: public/projects/{p.image}.(png|jpg|webp)
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full transition-all duration-500 ${dim ? 'blur-[6px] scale-[1.02] opacity-50' : ''}`}>
      <img src={src} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40" />
      <img
        key={src}
        src={src}
        alt={p.title}
        onError={() => setExtIndex((i) => i + 1)}
        className="relative w-full h-full object-contain"
      />
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [hov, setHov] = useState(false);
  const [inspect, setInspect] = useState(false);
  const p = projects[active];

  useEffect(() => { setInspect(false); setHov(false); }, [active]);

  const LaunchBtn = ({ className = '' }) =>
    p.demo ? (
      <a href={p.demo} target="_blank" rel="noreferrer" className={`btn-outline bg-black/60 ${className}`}>
        <FiExternalLink size={13} /> Launch Site
      </a>
    ) : (
      <span className={`btn-outline bg-black/60 btn-disabled ${className}`} title="Internal system">
        <FiExternalLink size={13} /> Internal
      </span>
    );

  return (
    <section id="projects" className="border-t border-[var(--border)] py-20 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <SectionStrip index="05" label="Production Pipeline" />

        <div className="flex justify-between items-end mb-10">
          <h2 className="display text-5xl sm:text-6xl lg:text-[5rem]">
            Featured systems.
            <br />
            <span className="italic-serif text-[var(--cyan)]">Shipped to production.</span>
          </h2>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">0{active + 1} / 0{projects.length}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Selector */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Select Active System</span>
            {projects.map((proj, i) => {
              const on = active === i;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActive(i)}
                  className={`text-left rounded-md border px-5 py-5 flex items-center justify-between transition-all ${
                    on
                      ? 'border-[var(--cyan)] bg-[var(--surface)] shadow-[0_0_28px_rgba(0,240,255,0.08)]'
                      : 'border-[var(--border)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className={`font-mono text-[11px] w-9 h-9 flex items-center justify-center rounded border ${
                      on ? 'border-[var(--cyan)] text-[var(--cyan)]' : 'border-[var(--border)] text-[var(--text-muted)]'
                    }`}>{proj.id}</span>
                    <div>
                      <div className="font-bold text-[15px]">{proj.title}</div>
                      <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest mt-0.5">{proj.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-widest text-[var(--green)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />{proj.status === 'live' ? 'LIVE' : 'DEV'}
                    </span>
                    {on && <FiChevronRight size={15} className="text-[var(--cyan)]" />}
                  </div>
                </button>
              );
            })}

            <div className="mt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Active architecture pipeline:</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {p.stack.map((s) => (
                  <span key={s} className="border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px]">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="rounded border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 font-mono text-[9px] tracking-widest text-[var(--cyan)]">{p.tags}</span>
                  <span className="rounded border border-[var(--green)]/40 bg-[var(--green)]/10 px-3 py-1 font-mono text-[9px] tracking-widest text-[var(--green)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />LIVE IN PROD
                  </span>
                </div>

                {/* Hover area */}
                <div
                  className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[var(--bg)] border border-[var(--border)]"
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                >
                  <Shot p={p} dim={hov && !inspect} />

                  {/* Hover buttons */}
                  <AnimatePresence>
                    {hov && !inspect && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-20 hidden lg:flex items-center justify-center gap-4"
                      >
                        <button onClick={() => setInspect(true)} className="btn-solid !bg-[var(--cyan)] !border-[var(--cyan)] !text-black !py-3 !px-6">
                          <FiLayers size={14} /> Inspect Architecture
                        </button>
                        <LaunchBtn className="!py-3 !px-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Architecture overlay */}
                  <AnimatePresence>
                    {inspect && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-[var(--bg)]/95 backdrop-blur-md p-6 sm:p-8 flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                          <span className="text-[var(--cyan)]">Active architecture pipeline</span>
                          <button onClick={() => setInspect(false)} aria-label="Close" className="hover:text-[var(--cyan)]">
                            <FiX size={18} />
                          </button>
                        </div>
                        <div className="flex-1 flex flex-wrap items-center content-center gap-3">
                          {p.stack.map((s, i) => (
                            <div key={s} className="flex items-center gap-3">
                              <span className="rounded-md border border-[var(--cyan)]/40 bg-[var(--surface-2)] px-4 py-3 font-mono text-xs">{s}</span>
                              {i < p.stack.length - 1 && <FiArrowRight className="text-[var(--cyan)]" />}
                            </div>
                          ))}
                        </div>
                        <p className="font-mono text-[11px] text-[var(--text-muted)] leading-[1.9] max-w-[560px]">{p.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Touch / small screens: buttons below */}
                <div className="flex gap-3 mt-4 lg:hidden">
                  <button onClick={() => setInspect(true)} className="btn-solid !bg-[var(--cyan)] !border-[var(--cyan)] !text-black">
                    <FiLayers size={13} /> Inspect
                  </button>
                  <LaunchBtn />
                </div>

                {/* Info row */}
                <div className="mt-6 flex flex-col md:flex-row justify-between gap-5">
                  <div className="max-w-[640px]">
                    <h3 className="display text-4xl mb-2">{p.title}</h3>
                    <p className="font-mono text-[11px] text-[var(--text-muted)] leading-[1.9]">{p.desc}</p>
                  </div>
                  <div className="flex items-start gap-4 shrink-0 font-mono text-[11px]">
                    <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors">
                      <FiGithub size={13} /> Code ↗
                    </a>
                    {p.demo ? (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[var(--cyan)] hover:underline">
                        <FiExternalLink size={13} /> Live ↗
                      </a>
                    ) : (
                      <span className="text-[var(--text-muted)] opacity-60">Internal system</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}