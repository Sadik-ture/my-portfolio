import { motion } from 'framer-motion';
import SectionStrip from './SectionStrip';

const principles = [
  { num: '01', title: 'FULL STACK ARCHITECTURE', subtitle: 'Laravel · Python · FastAPI · React',
    desc: 'High-throughput APIs, clean database models, and scalable modern web architecture built for production reliability.' },
  { num: '02', title: 'REAL-WORLD PRODUCTS', subtitle: 'EdTech · Startups · Commercial Web',
    desc: 'Shipped live platforms solving real-world challenges in Ethiopia and worldwide, from complex management systems to client applications.' },
  { num: '03', title: 'CREATIVE AI & MOTION', subtitle: 'AI Chatbots · FastAPI · Micro-Interactions',
    desc: 'Custom AI integrations and fluid motion that make web experiences feel alive and intuitive for the end user.' },
];

export default function About() {
  return (
    <section id="about" className="border-t border-[var(--border)] py-20 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <SectionStrip index="02" label="Core Capabilities" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="relative aspect-[4/5] border border-[var(--border)] bg-[var(--surface)] overflow-hidden group lg:sticky lg:top-28">
              <img
                src="/profile.jpg"
                alt="Sadik Ture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute left-3 bottom-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 font-mono text-[9px] tracking-wide text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
                <span className="font-bold">Sadik Ture</span>
                <span className="text-[#aaa]">· Full Stack Developer</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-start-5 lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="display text-5xl sm:text-6xl lg:text-[5rem] mb-8"
            >
              Full stack systems.
              <br />
              <span className="italic-serif text-[var(--cyan)]">Built for real production.</span>
            </motion.h2>

            <p className="font-mono text-[15px] sm:text-base leading-[1.75] text-[var(--text-muted)] max-w-[560px] mb-14">
              I engineer end-to-end web applications with clean architecture — from high-concurrency Python backends
              to responsive React interfaces and interactive AI experiences.
            </p>

            <div className="border-t border-[var(--border)]">
              {principles.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 py-7 border-b border-[var(--border)] group"
                >
                  <div className="flex gap-4">
                    <span className="font-mono text-[var(--cyan)] text-xs pt-1">{p.num}</span>
                    <div>
                      <h3 className="font-mono font-bold text-[15px] tracking-wide group-hover:text-[var(--cyan)] transition-colors">{p.title}</h3>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">{p.subtitle}</span>
                    </div>
                  </div>
                  <p className="font-mono text-[11px] text-[var(--text-muted)] leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}