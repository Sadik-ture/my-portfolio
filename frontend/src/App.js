import BottomDock from './components/BottomDock';
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

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const glowRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen relative bg-[var(--bg)] text-[var(--text-main)]">
        {/* Cursor Glow */}
        <div 
          ref={glowRef} 
          className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0 opacity-0 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 60%)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease'
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
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default App;