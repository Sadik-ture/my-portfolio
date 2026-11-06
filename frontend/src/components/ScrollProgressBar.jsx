import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX, background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }}
    />
  );
}

export default ScrollProgressBar;