import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiMail,
  FiGithub,
  FiDownload,
  FiBookOpen,
} from 'react-icons/fi';
import { SiLaravel, SiPython, SiFastapi } from 'react-icons/si';

function About() {
  const highlights = [
    { icon: FiMapPin, label: 'Jimma, Ethiopia' },
    { icon: FiBookOpen, label: 'BS Software Engineering' },
    { icon: FiMail, label: 'sadiktre355@gmail.com' },
  ];

  const stack = [
    { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  ];

  return (
    <section id="about" className="section">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Decorative dots grid */}
              <div
                className="absolute -top-4 -left-4 w-24 h-24 opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, var(--accent) 1.5px, transparent 1.5px)',
                  backgroundSize: '12px 12px',
                }}
              ></div>

              {/* Gradient glow behind photo */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-25"></div>

              {/* Photo frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--border)] shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Sadik Ture"
                  className="w-full aspect-square object-cover object-center"
                />
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-4 -right-2 md:right-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">
                  Available for work
                </span>
              </div>
            </div>

            {/* Primary stack */}
            <div className="mt-12 max-w-sm mx-auto lg:mx-0">
              <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wider text-center lg:text-left">
                Primary Stack
              </p>
              <div className="flex justify-center lg:justify-start gap-3 flex-wrap">
                {stack.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.name}
                      className="flex items-center gap-2 px-4 py-2 card"
                    >
                      <Icon size={18} style={{ color: s.color }} />
                      <span className="text-sm font-medium">{s.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Bio side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              I'm a{' '}
              <span className="text-[var(--text-primary)] font-semibold">
                results-oriented Software Engineering student
              </span>{' '}
              at Jimma University with hands-on experience in full-stack
              development and AI engineering. Currently, I lead the internship
              team at{' '}
              <span className="text-[var(--accent)] font-semibold">
                JU-ICT
              </span>
              , where I've delivered an AI chatbot-integrated event management
              system.
            </p>

            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              I ranked{' '}
              <span className="text-[var(--text-primary)] font-semibold">
                3rd at the JU AI Hackathon
              </span>{' '}
              and built a students-only e-commerce marketplace for Jimma
              University. As President of the Oromo Students Union, I combine
              technical skill with leadership, teamwork, and clear
              communication to build secure, reliable software.
            </p>

            {/* Highlight cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="card p-4 flex flex-col items-center text-center gap-2"
                  >
                    <Icon size={20} className="text-[var(--accent)]" />
                    <span className="text-xs text-[var(--text-secondary)] leading-tight">
                      {h.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="/Sadik_Ture_CV.pdf"
                download
                className="btn-primary flex items-center gap-2"
              >
                <FiDownload size={18} />
                Download CV
              </a>
              <a
                href="https://github.com/Sadik-ture"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <FiGithub size={18} />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;