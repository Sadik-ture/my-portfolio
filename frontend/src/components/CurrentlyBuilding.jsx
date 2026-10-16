import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

function CurrentlyBuilding() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 px-6"
    >
      <div className="max-w-4xl mx-auto card p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <FiCode className="text-[var(--accent)]" size={20} />
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="text-sm uppercase tracking-wider text-[var(--text-muted)] mb-1">
            Currently Building
          </p>
          <p className="text-[var(--text-primary)] font-medium">
            A full-stack MERN portfolio with real-time features and an admin dashboard.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default CurrentlyBuilding;