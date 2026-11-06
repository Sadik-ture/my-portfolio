import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, animate, useInView } from 'framer-motion';
import SectionStrip from './SectionStrip';

const jobs = [
  { version: 'RELEASE 03', year: '2024 — PRESENT', company: 'JU-ICT', role: 'Intern Lead — Software Engineering',
    desc: 'Lead the internship team — assigning tasks, coordinating teammates, and keeping delivery on schedule. Build and maintain full-stack web solutions with Laravel and AI services with Python.',
    tech: ['Laravel', 'Python', 'AI Integration', 'Project Management'] },
  { version: 'RELEASE 02', year: '2022 — PRESENT', company: 'Jimma University', role: 'Elite Software Engineering Intern',
    desc: 'Selected as one of the top 5 Software Engineering students for an industry-level, production-ready software training program. Delivered academic and practical projects.',
    tech: ['Full Stack', 'Software Architecture', 'Team Leadership'] },
];

const LOG = [
  '$ git log --graph --oneline',
  '* 7be31d0 JU-ICT (intern lead)',
  '|  role: Software Engineer',
  '|  stack: Laravel, Python',
  '|  shipped: AI chatbot system',
  '* 3c9a1f2 Elite Internship (Top 5)',
  '|  role: Full Stack Lead',
  '|  mission: production-ready training',
  '* HEAD -> main',
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));

function Count({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{String(n).padStart(2, '0')}{suffix}</span>;
}

function Terminal({ progress }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    const set = (v) => setN(Math.max(3, Math.min(LOG.length, 3 + Math.ceil(clamp01(v) * (LOG.length - 3) * 1.15))));
    set(progress.get());
    return progress.on('change', set);
  }, [progress]);

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] rounded-xl overflow-hidden font-mono text-[12.5px]">
      <div className="px-5 py-4 flex items-center gap-2 border-b border-[var(--border)]">
        <span className="w-3 h-3 rounded-full bg-red-500/85" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/85" />
        <span className="w-3 h-3 rounded-full bg-green-500/85" />
        <span className="ml-auto text-[var(--text-muted)] text-[11px]">sadik@prod — zsh</span>
      </div>
      <div className="p-5 min-h-[300px] leading-[1.95] text-[var(--cyan)]">
        {LOG.slice(0, n).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="whitespace-pre overflow-hidden"
          >
            {l}
          </motion.div>
        ))}
        <span className="inline-block w-2 h-4 bg-[var(--cyan)] animate-pulse align-middle" />
      </div>
    </div>
  );
}

export default function Experience() {
  const cardsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardsRef, offset: ['start 85%', 'end 55%'] });
  const height = useTransform(scrollYProgress, (v) => `${clamp01(v) * 100}%`);

  return (
    <section id="experience" className="border-t border-[var(--border)] py-20 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <SectionStrip index="03" label="Career Pipeline" />

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10 lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <Terminal progress={scrollYProgress} />
            </div>
          </div>

          <div className="min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="italic-serif text-6xl sm:text-7xl lg:text-[6rem] leading-[0.95] mb-8"
            >
              Where I've <span className="text-[var(--cyan)]">shipped</span> real work.
            </motion.h2>

            <p className="font-mono text-[15px] sm:text-base text-[var(--text-muted)] leading-[1.8] max-w-[600px] mb-10">
              JU-ICT, Jimma University, and direct client builds. Every stop below is a release that went to production.
            </p>

            <div className="grid grid-cols-3 border-y border-[var(--border)] mb-10">
              {[
                { big: <Count to={2} />, label: 'Roles' },
                { big: <Count to={3} suffix="+" />, label: 'Production projects shipped' },
                { big: <span className="italic-serif">Laravel</span>, label: 'Core stack' },
              ].map((s, i) => (
                <div key={i} className={`py-6 px-4 sm:px-8 ${i ? 'border-l border-[var(--border)]' : ''}`}>
                  <div className="display text-4xl sm:text-5xl mb-2">{s.big}</div>
                  <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{s.label}</div>
                </div>
              ))}
            </div>

            <div ref={cardsRef} className="relative flex flex-col gap-8">
              <div className="hidden lg:block absolute top-0 bottom-0 -left-8 w-px">
                <div className="absolute inset-0 bg-[var(--border)]" />
                <motion.div
                  className="absolute top-0 left-0 w-px bg-[var(--cyan)] shadow-[0_0_12px_var(--cyan)]"
                  style={{ height }}
                />
                <motion.div
                  className="absolute left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_var(--cyan)]"
                  style={{ top: height }}
                />
              </div>

              {jobs.map((job) => (
                <motion.article
                  key={job.version}
                  initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 sm:p-10 hover:border-[var(--border-hover)] transition-colors"
                >
                  <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-[var(--text-muted)] mb-8">
                    <span>{job.version}</span><span>{job.year}</span>
                  </div>
                  <h3 className="italic-serif text-5xl sm:text-6xl mb-3">{job.company}</h3>
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--cyan)] mb-6">{job.role}</h4>
                  <p className="font-mono text-[13px] text-[var(--text-muted)] leading-[1.9] max-w-[560px] mb-8">{job.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--surface-2)] border border-[var(--border)] px-4 py-1.5 font-mono text-[10px] hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}