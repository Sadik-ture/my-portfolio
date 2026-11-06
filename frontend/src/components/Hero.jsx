import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Blob3D from './Blob3D';

const reveal = (delay = 0) => ({
  initial: { y: '115%' },
  animate: { y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  const ref = useRef(null);
  // drives the blob (0 → 1 across the whole hero)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // drives the text fade from real scroll pixels, so at the very top the text is always 100% bright
  const { scrollY } = useScroll();

  const fade = useTransform(scrollY, (v) => {
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    return Math.min(1, Math.max(0, (v - h * 0.08) / (h * 0.3)));
  });
  const opacity = useTransform(fade, (f) => 1 - f);
  const filter = useTransform(fade, (f) => (f > 0.002 ? `blur(${f * 20}px)` : 'none'));
  const y = useTransform(scrollYProgress, [0.05, 0.5], [0, -70]);
  const scale = useTransform(scrollYProgress, [0.05, 0.5], [1, 0.96]);

  return (
    <section id="home" ref={ref} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <Blob3D progress={scrollYProgress} />

        <motion.div
          style={{ opacity, filter, y, scale }}
          className="relative z-20 h-full max-w-[1248px] mx-auto px-6 pt-16 pb-8 flex flex-col"
        >
          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[var(--border)] pb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mt-12 sm:mt-0"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold">Sadik Ture</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-muted)]">Full Stack Architecture & AI</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_10px_var(--cyan)] animate-pulse" />
              <span className="text-[var(--text-muted)]">Jimma</span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="font-bold">Available Worldwide</span>
            </div>
          </motion.div>

          {/* Name + portrait */}
          <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
            <div className="lg:col-span-8">
              <h1 className="select-none leading-[0.8]" style={{ color: 'var(--hero-name)' }}>
                <span className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    {...reveal(0.15)}
                    className="block text-[26vw] sm:text-[22vw] lg:text-[11.6vw]"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, letterSpacing: '-0.065em' }}
                  >
                    Sadik
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.18em] -mt-[0.04em]">
                  <motion.span
                    {...reveal(0.3)}
                    className="block italic-serif text-[var(--cyan)] text-[30vw] sm:text-[25vw] lg:text-[13.4vw] ml-[0.05em] leading-[0.9]"
                    style={{ textShadow: '0 0 30px rgba(0,240,255,0.16)' }}
                  >
                    Ture
                  </motion.span>
                </span>
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[255px] aspect-[4/5] border border-[var(--border)] bg-[var(--surface)] overflow-hidden group">
                <img
                  src="/profile.jpg"
                  alt="Sadik Ture"
                  className="w-full h-full object-cover brightness-[0.92] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 bg-black/85 backdrop-blur-sm px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#00F0FF]">
                  Sadik Ture
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tagline row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="border-t border-[var(--border)] pt-6 flex flex-col lg:flex-row justify-between lg:items-end gap-6"
          >
            <p className="font-sans text-xl sm:text-3xl lg:text-[2.1rem] leading-[1.22] tracking-tight max-w-[900px]" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              I build scalable, high-performance web applications with{' '}
              <span className="italic-serif text-[var(--cyan)]">clean architecture</span> and{' '}
              <span className="italic-serif text-[var(--cyan)]">modern web technologies.</span>
            </p>
            <a
              href="#about"
              className="hidden lg:flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors shrink-0 mb-10"
            >
              Scroll to explore
              <span className="relative block w-px h-12 bg-[var(--border)] overflow-hidden">
                <motion.span
                  className="absolute top-0 left-0 w-full h-1/2 bg-[var(--cyan)]"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}