import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useActiveSection, { NAV, scrollToId } from '../hooks/useActiveSection';

export default function BottomDock() {
  const active = useActiveSection();
  const [open, setOpen] = useState(true);
  const listRef = useRef(null);
  const itemRefs = useRef({});

  const current = NAV.find((n) => n.id === active) || NAV[0];
  const index = NAV.findIndex((n) => n.id === current.id) + 1;

  useEffect(() => {
    const el = itemRefs.current[active];
    const list = listRef.current;
    if (!open || !el || !list) return;
    list.scrollTo({
      left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [active, open]);

  return (
    <>
      {/* Name label — bottom left */}
      <div className="fixed bottom-7 left-10 z-50 hidden min-[1500px]:flex items-center gap-2 font-mono text-[11px] text-[var(--text-muted)]">
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-60 animate-ping" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--green)]" />
        </span>
        <span className="text-[var(--text-main)] font-bold">Sadik Ture</span>
        <span>· Full Stack</span>
      </div>

      <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 flex justify-center px-3 pointer-events-none">
        <motion.nav
          aria-label="Section navigation"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center max-w-full backdrop-blur-xl border border-[var(--border-hover)] rounded-sm shadow-2xl overflow-hidden"
          style={{ background: 'var(--nav-bg)' }}
        >
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Collapse navigation' : 'Expand navigation'}
            aria-expanded={open}
            className="shrink-0 px-4 py-3.5 text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors"
          >
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          <AnimatePresence initial={false} mode="wait">
            {open ? (
              <motion.div
                key="list"
                ref={listRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1 px-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none' }}
              >
                {NAV.map((item) => {
                  const on = active === item.id;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => (itemRefs.current[item.id] = el)}
                      onClick={() => scrollToId(item.id)}
                      aria-current={on ? 'true' : undefined}
                      className={`relative shrink-0 whitespace-nowrap px-4 lg:px-5 py-2.5 font-mono text-[12px] tracking-[0.1em] transition-colors ${
                        on ? 'text-black font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="dock-pill"
                          className="absolute inset-0 bg-[var(--cyan)]"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative hidden lg:inline">{item.label}</span>
                      <span className="relative lg:hidden">{item.name}</span>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.button
                key="mini"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 px-4 py-2.5 font-mono text-[12px] tracking-wide whitespace-nowrap"
              >
                <span className="bg-[var(--cyan)] text-black font-bold px-2 py-1">
                  {String(index).padStart(2, '0')} / {String(NAV.length).padStart(2, '0')}
                </span>
                <span className="text-[var(--text-main)]">{current.name}</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
}