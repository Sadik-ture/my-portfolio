export default function SectionStrip({ index, label, right = 'Sadik Ture // Full Stack' }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 mb-10 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
      <div className="flex items-center gap-3">
        <span className="glowing-dot" />
        <span>{index}. {label}</span>
      </div>
      <span className="text-[var(--text-muted)] hidden sm:block">{right}</span>
    </div>
  );
}