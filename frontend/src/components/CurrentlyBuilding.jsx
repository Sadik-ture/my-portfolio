import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

function CurrentlyBuilding() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="card p-5 flex items-center gap-4 relative overflow-hidden">
          <div className="glow-halo glow-cyan w-48 h-48 -top-20 -left-20" style={{ background: 'rgba(66, 230, 255, 0.15)' }} />
          <div className="relative flex items-center gap-3 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-green)]" />
            </span>
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center">
              <FiCode size={18} className="text-[var(--accent-green)]" />
            </div>
          </div>
          <div className="relative flex-1">
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-medium mb-1">
              Currently Building
            </p>
            <p className="text-sm md:text-base text-[var(--text-primary)] font-medium">
              A full-stack MERN portfolio with real-time features and an admin dashboard.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default CurrentlyBuilding;