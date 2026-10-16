import { FiGithub, FiMail, FiArrowDown } from 'react-icons/fi';

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 pt-20">
        <p className="text-[var(--accent)] text-lg mb-4 fade-in">
          Hi, my name is
        </p>

        <h1
          className="text-5xl md:text-7xl font-bold mb-6 fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          Sadik Ture
        </h1>

        <h2
          className="text-2xl md:text-4xl font-bold text-[var(--text-secondary)] mb-6 fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          I build <span className="gradient-text">intelligent systems</span> for the web.
        </h2>

        <p
          className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10 fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Software Engineering student at Jimma University, Intern Lead at JU-ICT,
          and full-stack developer specializing in Laravel, Python, and AI integration.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-12 fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </div>

        <div
          className="flex items-center justify-center gap-6 fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="https://github.com/Sadik-ture"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={22} />
          </a>
          <a
            href="mailto:sadiktre355@gmail.com"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            aria-label="Email"
          >
            <FiMail size={22} />
          </a>
        </div>

        <a
          href="#about"
          className="inline-block mt-16 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <FiArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}

export default Hero;