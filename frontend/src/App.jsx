import { useState, useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import BottomDock from './components/BottomDock';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
    } catch (e) {}
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const glowRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (e) => {
      glow.style.opacity = '1';
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };
    const onLeave = () => { glow.style.opacity = '0'; };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise min-h-screen relative bg-[var(--bg)] text-[var(--text-main)]">
        <div
          ref={glowRef}
          className="fixed w-[420px] h-[420px] rounded-full pointer-events-none z-0 opacity-0 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 60%)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        />

        <ScrollProgressBar />
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main id="main" className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <BottomDock />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default App;