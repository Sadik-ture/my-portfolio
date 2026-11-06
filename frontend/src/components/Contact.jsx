import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiPhone, FiCopy, FiCheck, FiSend, FiMessageSquare } from 'react-icons/fi';

const EMAIL = 'sadikure355@gmail.com';
const ALT_EMAIL = ''; // optional: put a second email here and the "Alt:" row appears
const PHONE = '+251 921 934 032';

const links = [
  { icon: FiGithub, label: 'GITHUB', value: 'github.com/Sadik-ture', href: 'https://github.com/Sadik-ture', nowrap: true },
  { icon: FiSend, label: 'TELEGRAM', value: '@Sadik_Ture', href: 'https://t.me/Sadik_Ture', nowrap: true },
  { icon: FiMessageSquare, label: 'WHATSAPP', value: PHONE, href: 'https://wa.me/251921934032', nowrap: true },
  { icon: FiPhone, label: 'DIRECT PHONE', value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}`, copy: true, accent: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(null);
  const copy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch (e) {}
  };

  return (
    <section id="contact" className="relative border-t border-[var(--border)] pt-20 lg:pt-24 pb-16 overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[var(--cyan)] opacity-[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-8 relative">
        {/* Status strip */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <span className="glowing-dot" /><span>06. Contact</span>
            <span className="text-[var(--text-muted)] hidden sm:inline">Status: <span className="text-[var(--green)]">Live in production</span></span>
          </div>
          <span className="text-[var(--cyan)] hidden sm:block">↗ Open to work &amp; collaboration</span>
        </div>

        {/* Heading + profile card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
          <h2 className="display text-5xl sm:text-6xl lg:text-[5.4rem] lg:col-span-8">
            Have a system to build, <span className="italic-serif text-[var(--cyan)]">scale, or deploy?</span>
          </h2>
          <div className="lg:col-span-4 flex items-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="relative shrink-0">
              <img src="/profile.jpg" alt="Sadik" className="w-24 h-24 object-cover rounded-md" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[var(--green)] border-2 border-[var(--surface)]" />
            </div>
            <div className="font-mono">
              <div className="text-sm font-bold">Sadik</div>
              <div className="text-[10px] text-[var(--cyan)] mt-0.5">Full Stack Developer</div>
              <div className="text-[9px] text-[var(--text-muted)] mt-1">Frontend · Backend · AI</div>
            </div>
          </div>
        </div>

        {/* Primary email */}
        <div className="mb-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">Primary Email</div>
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-5 display text-[9.5vw] sm:text-6xl lg:text-[5.2rem] border-b border-[var(--border)] pb-2 hover:text-[var(--cyan)] transition-colors break-all"
          >
            {EMAIL}
            <svg
              className="hidden md:block shrink-0 text-[var(--cyan)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          <div className="flex flex-wrap items-center gap-4 mt-6 font-mono text-[12px]">
            <button
              onClick={() => copy('email', EMAIL)}
              className="flex items-center gap-2 border border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors"
            >
              {copied === 'email' ? <FiCheck size={13} className="text-[var(--green)]" /> : <FiCopy size={13} />}
              {copied === 'email' ? 'Copied!' : 'Copy Primary Email'}
            </button>
            {ALT_EMAIL && (
              <span className="flex items-center gap-2 text-[var(--text-muted)]">
                · Alt:
                <a href={`mailto:${ALT_EMAIL}`} className="text-[var(--text-main)] underline underline-offset-2 hover:text-[var(--cyan)] transition-colors">
                  {ALT_EMAIL}
                </a>
                <button onClick={() => copy('alt', ALT_EMAIL)} aria-label="Copy alt email" className="hover:text-[var(--cyan)] transition-colors">
                  {copied === 'alt' ? <FiCheck size={12} className="text-[var(--green)]" /> : <FiCopy size={12} />}
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Direct communication */}
        <div className="border-t border-[var(--border)] pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
            Direct Communication &amp; Code
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {links.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative group"
                >
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-sm border border-[var(--border)] bg-[var(--bg)] px-7 py-8 min-h-[97px] h-full group-hover:border-[var(--cyan)] transition-colors"
                  >
                    <Icon
                      size={18}
                      strokeWidth={1.7}
                      className={`shrink-0 ${l.accent ? 'text-[var(--cyan)]' : 'text-[var(--text-main)]'}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[9px] tracking-[0.12em] text-[var(--text-muted)] mb-1.5">{l.label}</div>
                      <div className={`font-mono text-[12px] font-medium leading-[1.7] ${l.nowrap ? 'whitespace-nowrap' : ''}`}>
                        {l.value}
                      </div>
                    </div>
                    {!l.copy && (
                      <span className="text-[var(--text-muted)] text-[11px] group-hover:text-[var(--cyan)] transition-colors">↗</span>
                    )}
                    {l.copy && <span className="w-4" />}
                  </a>
                  {l.copy && (
                    <button
                      onClick={() => copy('phone', PHONE)}
                      aria-label="Copy phone"
                      className="absolute top-1/2 -translate-y-1/2 right-7 text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors"
                    >
                      {copied === 'phone' ? <FiCheck size={13} className="text-[var(--green)]" /> : <FiCopy size={13} />}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}