import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useActiveSection, { NAV, scrollToId } from '../hooks/useActiveSection';

function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  const links = NAV.filter((n) => n.id !== 'home');

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled ? 'backdrop-blur-xl border-[var(--border)] py-4' : 'border-transparent py-6'
      }`}
      style={scrolled ? { background: 'var(--nav-bg)' } : undefined}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-baseline gap-2 group" aria-label="Go to top">
          <span className="font-bold tracking-[-0.04em] text-2xl group-hover:text-[var(--cyan)] transition-colors">
            Sadik Ture
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">©2026</span>
        </button>

        {/* Center links */}
        <nav className="hidden md:flex items-center justify-center gap-10 font-mono text-sm tracking-[0.12em]">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`relative flex items-center gap-2 transition-colors hover:text-[var(--cyan)] ${
                  isActive ? 'text-[var(--cyan)]' : 'text-[var(--text-main)]'
                }`}
              >
                {link.id === 'about' && <span className="glowing-dot scale-75" />}
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center justify-end gap-5">
          <button
            onClick={toggleTheme}
            className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <a
            href="/Sadik_Ture_CV.pdf"
            download
            className="hidden xl:inline font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors"
          >
            Resume ↓
          </a>
          <button
            onClick={() => go('contact')}
            className="hidden sm:inline-flex bg-[var(--text-main)] text-[var(--bg)] text-[15px] font-medium px-7 py-3 rounded-full hover:bg-[var(--cyan)] hover:text-black transition-colors"
          >
            Let's talk
          </button>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
            style={{ background: 'var(--nav-bg)' }}
          >
            <div className="px-6 py-4 flex flex-col">
              {NAV.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  className={`text-left py-3 font-mono text-xs uppercase tracking-widest border-b border-[var(--border)] ${
                    active === link.id ? 'text-[var(--cyan)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button onClick={() => go('contact')} className="mt-4 bg-[var(--text-main)] text-[var(--bg)] text-sm font-medium px-6 py-3 rounded-full">
                Let's talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;