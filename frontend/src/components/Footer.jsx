export default function Footer() {
  return (
    <footer className="relative z-10 bg-[var(--bg)] pb-28">
      <div className="max-w-[1920px] mx-auto px-6 md:px-8">
        <div className="border-t border-[var(--border)] pt-16 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-[0.08em] text-center md:text-left">
          <div className="text-[var(--text-muted)]">
            © {new Date().getFullYear()} Sadik Ture. Full Stack Developer · Frontend · Backend · AI.
          </div>
          <div className="text-[var(--cyan)] font-medium">
            Built with React · Framer Motion · Tailwind · Three.js
          </div>
        </div>
      </div>
    </footer>
  );
}