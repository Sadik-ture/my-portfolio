import { FiGithub, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('home')}
              className="text-2xl font-bold gradient-text mb-4 block"
            >
              Sadik Ture
            </button>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs leading-relaxed">
              Software Engineering student, full-stack developer, and AI
              enthusiast based in Jimma, Ethiopia.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/Sadik-ture"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="mailto:sadiktre355@gmail.com"
                className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                aria-label="Email"
              >
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resume + note */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Resume
            </h4>
            <a
              href="/Sadik_Ture_CV.pdf"
              download
              className="btn-primary text-sm !py-2 !px-4 mb-4 inline-block"
            >
              Download CV
            </a>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Updated for 2026. Includes all projects, experience, and
              achievements.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 flex-wrap justify-center">
            © {year} Sadik Ture. Built with
            <FiHeart size={14} className="text-red-400" />
            using React, Node.js & MongoDB.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-2"
          >
            Back to top
            <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;