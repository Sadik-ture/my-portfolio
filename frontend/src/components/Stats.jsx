import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.floor(v)) });
    return () => c.stop();
  }, [inView, value]);

  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

const stats = [
  { value: 3, suffix: '+', label: 'Projects Shipped' },
  { value: 2, suffix: '+', label: 'Years Coding' },
  { value: 5, prefix: 'Top ', label: 'Elite Intern Program' },
  { value: 1, suffix: '', label: 'Leadership Role' },
];

function Stats() {
  return (
    <section className="py-16 px-6 border-t border-[var(--border)]">
      <div className="max-w-[1300px] mx-auto border border-[var(--border)] bg-[var(--surface)]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-[var(--border)] divide-y md:divide-y-0 md:divide-x">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="py-10 px-6 text-center"
            >
              <div className="text-5xl md:text-6xl italic-serif bg-clip-text text-transparent bg-gradient-to-r from-[var(--cyan)] to-[var(--violet)] leading-none mb-3">
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;