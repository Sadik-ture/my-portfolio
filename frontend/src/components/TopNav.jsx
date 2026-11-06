import { FiArrowUpRight } from 'react-icons/fi';

function TopNav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
          <span className="font-bold tracking-tight text-lg">Sadik Ture</span>
          <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded-sm">
            ©2026
          </span>
        </div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          <button onClick={() => scrollTo('about')} className="hover:text-[var(--cyan)] transition-colors flex items-center gap-2">
            <span className="glowing-dot scale-75" /> About
          </button>
          <button onClick={() => scrollTo('experience')} className="hover:text-[var(--cyan)] transition-colors">Experience</button>
          <button onClick={() => scrollTo('skills')} className="hover:text-[var(--cyan)] transition-colors">3D Neural</button>
          <button onClick={() => scrollTo('projects')} className="hover:text-[var(--cyan)] transition-colors">Projects</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-[var(--cyan)] transition-colors">Contact</button>
        </nav>

        {/* Right Action */}
        <button 
          onClick={() => scrollTo('contact')}
          className="bg-white text-black font-mono text-xs font-bold px-5 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          Let's talk
        </button>
      </div>
    </header>
  );
}

export default TopNav;