import { useEffect, useRef, useState } from 'react';
import {
  motion, animate, useMotionValue, useSpring, useTransform, useVelocity, useScroll,
} from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/* ---------- Card artwork ---------- */
const svgProps = { viewBox: '0 0 120 100', className: 'w-40 h-32', fill: 'none', stroke: 'currentColor', strokeWidth: 1 };

const NodesArt = ({ color }) => (
  <svg {...svgProps} style={{ color }}>
    <circle cx="60" cy="50" r="40" opacity=".25" />
    {[[30, 30], [78, 24], [92, 62], [52, 80], [28, 64]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="3" fill="currentColor" />
        <line x1="60" y1="50" x2={x} y2={y} opacity=".5" />
      </g>
    ))}
    <circle cx="60" cy="50" r="4" fill="currentColor" />
  </svg>
);

const CubeArt = ({ color }) => (
  <svg {...svgProps} style={{ color }}>
    <ellipse cx="60" cy="50" rx="52" ry="24" transform="rotate(-18 60 50)" opacity=".4" />
    <path d="M60 22 90 38 90 66 60 82 30 66 30 38Z" />
    <path d="M60 52 90 38M60 52 30 38M60 52V82" opacity=".6" />
    <circle cx="60" cy="52" r="3" fill="currentColor" />
  </svg>
);

const BarsArt = ({ color }) => (
  <svg {...svgProps} style={{ color }}>
    {[30, 48, 66].map((y) => (
      <g key={y}>
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={8 + i * 7.6} y={y} width="5" height="12" opacity={0.25 + ((i * 37) % 10) / 14} />
        ))}
      </g>
    ))}
    <line x1="62" y1="22" x2="62" y2="84" stroke="#fff" opacity=".7" />
  </svg>
);

const ApiArt = ({ color }) => (
  <svg {...svgProps} style={{ color }}>
    <path d="M42 24c-9 0-11 5-11 11v7c0 4-3 7-9 8 6 1 9 4 9 8v7c0 6 2 11 11 11" />
    <path d="M78 24c9 0 11 5 11 11v7c0 4 3 7 9 8-6 1-9 4-9 8v7c0 6-2 11-11 11" />
    <line x1="50" y1="40" x2="70" y2="40" opacity=".7" />
    <line x1="50" y1="50" x2="64" y2="50" opacity=".5" />
    <line x1="50" y1="60" x2="68" y2="60" opacity=".35" />
    <circle cx="72" cy="50" r="2.5" fill="currentColor" />
  </svg>
);

const DbArt = ({ color }) => (
  <svg {...svgProps} style={{ color }}>
    <ellipse cx="60" cy="26" rx="30" ry="10" />
    <path d="M30 26v16c0 5.5 13.5 10 30 10s30-4.5 30-10V26" />
    <path d="M30 42v16c0 5.5 13.5 10 30 10s30-4.5 30-10V42" opacity=".6" />
    <path d="M30 58v14c0 5.5 13.5 10 30 10s30-4.5 30-10V58" opacity=".35" />
    <circle cx="82" cy="30" r="2" fill="currentColor" />
  </svg>
);

/* ---------- Data ---------- */
const cards = [
  { id: '01', name: 'AI Chat', label: 'Conversational AI Suite', tag: 'AI CORE', pill: 'CONVERSATIONAL & AGENTIC AI',
    Art: NodesArt, color: '#00E5FF', codeTitle: 'AI AGENT RUNTIME', code: 'ai_agent.invoke("on_message")',
    desc: 'Intelligent conversational systems & workflow automation.', tech: 'Python · FastAPI · LLMs · Tool Calling' },
  { id: '02', name: 'Motion & UI', label: 'Interactive Motion Suite', tag: 'SPATIAL', pill: 'INTERACTIVE UI & MOTION',
    Art: CubeArt, color: '#FFD60A', codeTitle: 'ANIMATION ENGINE', code: 'animate(el, { y: 0, opacity: 1 })',
    desc: 'Fluid micro-interactions and polished, responsive interfaces.', tech: 'React · Framer Motion · Tailwind' },
  { id: '03', name: 'Full Stack', label: 'Full Stack Architecture', tag: 'FULL STACK', pill: 'END-TO-END ARCHITECTURE',
    Art: BarsArt, color: '#FF2D75', codeTitle: 'ROUTING LAYER', code: 'Route::apiResource("projects")',
    desc: 'End-to-end architecture and database design.', tech: 'Laravel · React · Node.js · SQL' },
  { id: '04', name: 'Backend APIs', label: 'Scalable Backend Suite', tag: 'BACKEND', pill: 'SCALABLE SERVICES & REST',
    Art: ApiArt, color: '#FFA62B', codeTitle: 'REST CONTRACT', code: 'GET /api/v1/events → 200 OK',
    desc: 'Clean, versioned APIs built for throughput and reliability.', tech: 'Laravel · FastAPI · Node.js · REST' },
  { id: '05', name: 'Databases', label: 'Data & Storage Suite', tag: 'DATA', pill: 'SCHEMA DESIGN & QUERYING',
    Art: DbArt, color: '#A06CFF', codeTitle: 'DATA LAYER', code: 'SELECT * FROM projects WHERE live',
    desc: 'Relational and document models designed to scale cleanly.', tech: 'MySQL · MongoDB · Eloquent · SQL' },
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = (v) => String(v).padStart(2, '0');

export default function Skills() {
  const n = cards.length;
  const secRef = useRef(null);
  const viewRef = useRef(null);
  const innerRefs = useRef([]);
  const wheelT = useRef(null);
  const ctrl = useRef(null);
  const hoveredRef = useRef(-1);
  const lastHover = useRef(-1);
  const dispRef = useRef(null);
  const rRef = useRef(null);
  const bRef = useRef(null);

  const [vw, setVw] = useState(1280);
  const [cw, setCw] = useState(1200);
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState(0);

  const mobile = vw < 640;
  const CARD_W = mobile ? Math.min(vw * 0.78, 310) : 360;
  const GAP = mobile ? 20 : 112;
  const CARD_H = mobile ? 460 : 480;
  const step = CARD_W + GAP;
  const visible = Math.max(1, Math.floor((cw + GAP) / step));
  const maxIdx = Math.max(0, n - Math.max(1, visible - 1));

  const x = useMotionValue(0);
  const vel = useVelocity(x);
  const smoothVel = useSpring(vel, { stiffness: 120, damping: 30 });
  const hover = useSpring(0, { stiffness: 100, damping: 18 });

  const rotateY = useTransform(smoothVel, [-3000, 0, 3000], [16, 0, -16]);
  const scale = useTransform(smoothVel, [-3000, 0, 3000], [0.95, 1, 0.95]);

  const { scrollYProgress } = useScroll({ target: secRef, offset: ['start end', 'end start'] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['4%', '-12%']);

  useEffect(() => {
    const measure = () => {
      setVw(window.innerWidth);
      if (viewRef.current) setCw(viewRef.current.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewRef.current) ro.observe(viewRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    x.set(clamp(x.get(), -maxIdx * step, 0));
  }, [maxIdx, step, x]);

  useEffect(() => {
    const update = (v) => {
      setIdx(clamp(Math.round(-v / step), 0, maxIdx));
      const center = cw / 2;
      let best = 0, bestD = Infinity;
      for (let i = 0; i < n; i++) {
        const d = Math.abs(i * step + CARD_W / 2 + v - center);
        if (d < bestD) { bestD = d; best = i; }
      }
      setActive(best);
    };
    update(x.get());
    return x.on('change', update);
  }, [x, step, maxIdx, cw, CARD_W, n]);

  useEffect(() => {
    let raf;
    const loop = () => {
      const v = Math.abs(smoothVel.get());
      const h = hover.get();
      const move = v * 0.014;
      const w = Math.min(34, move + h * 9);
      const s = Math.min(6, v * 0.0025 + h * 1.8);
      dispRef.current?.setAttribute('scale', w.toFixed(2));
      rRef.current?.setAttribute('dx', s.toFixed(2));
      bRef.current?.setAttribute('dx', (-s).toFixed(2));
      if (hoveredRef.current >= 0) lastHover.current = hoveredRef.current;
      innerRefs.current.forEach((el, i) => {
        if (!el) return;
        const on = move > 0.4 || (lastHover.current === i && h > 0.05);
        const next = on ? 'url(#skills-warp)' : 'none';
        if (el.style.filter !== next) el.style.filter = next;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [smoothVel, hover]);

  const snapTo = (i) => {
    const target = -clamp(i, 0, maxIdx) * step;
    ctrl.current?.stop();
    ctrl.current = animate(x, target, { type: 'spring', stiffness: 140, damping: 22 });
  };

  const onDragEnd = (_, info) => {
    const proj = x.get() + info.velocity.x * 0.2;
    snapTo(Math.round(-proj / step));
  };

  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    ctrl.current?.stop();
    x.set(clamp(x.get() - e.deltaX, -maxIdx * step, 0));
    clearTimeout(wheelT.current);
    wheelT.current = setTimeout(() => snapTo(Math.round(-x.get() / step)), 140);
  };

  const ripple = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const cur = cards[active];

  return (
    <section
      id="skills"
      ref={secRef}
      className="relative border-t border-[var(--border)] pb-20 lg:pb-24"
      style={{ overflowX: 'clip' }}
    >
      {/* SVG filter: wavy displacement + RGB split */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="skills-warp" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feOffset ref={rRef} in="r" dx="0" dy="0" result="r2" />
            <feOffset ref={bRef} in="b" dx="0" dy="0" result="b2" />
            <feBlend in="r2" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b2" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Faint grid + giant ghost word */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] grid-bg" />
      <motion.div
        style={{ x: ghostX }}
        className="absolute left-0 top-44 w-max display italic text-[30vw] leading-none opacity-[0.045] pointer-events-none select-none whitespace-nowrap"
      >
        Capabilities
      </motion.div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative">
        {/* Sticky sub-header */}
        <div
          className="sticky top-[66px] z-30 -mx-6 md:-mx-12 px-6 md:px-12 pt-6 backdrop-blur-xl"
          style={{ background: 'var(--nav-bg)' }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3 min-w-0">
              <span className="glowing-dot shrink-0" />
              <span className="whitespace-nowrap">04. Integrated Capabilities</span>
              <span className="text-[var(--text-muted)] hidden sm:inline">/</span>
              <span className="font-bold text-[var(--cyan)] truncate hidden sm:inline">{cur.label}</span>
            </div>
            <img
              src="/profile.jpg"
              alt=""
              className="hidden md:block w-9 h-9 rounded-full object-cover border border-[var(--border-hover)]"
            />
            <div className="flex items-center gap-4 text-[var(--text-muted)] shrink-0">
              <span className="hidden lg:inline">✧ Drag &amp; hover to distort cards</span>
              <span className="text-[var(--text-main)]"><b>{pad(active + 1)}</b> / {pad(n)}</span>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex flex-wrap gap-2 mt-6 mb-8 font-mono text-[11px] uppercase tracking-[0.15em] relative z-20">
          {cards.map((c, i) => {
            const on = active === i;
            return (
              <button
                key={c.id}
                onClick={() => snapTo(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-colors ${
                  on
                    ? 'border-[var(--text-main)]/60 bg-[var(--surface-2)] text-[var(--text-main)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-hover)]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                {c.id}. {c.name}
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <div className="relative" onWheel={onWheel}>
          <div ref={viewRef} className="overflow-hidden py-6 select-none" style={{ perspective: 1600 }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -maxIdx * step, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragStart={() => ctrl.current?.stop()}
              onDragEnd={onDragEnd}
              className="flex cursor-grab active:cursor-grabbing"
              style={{ x, gap: GAP }}
            >
              {cards.map((c, i) => {
                const Art = c.Art;
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0"
                    style={{ width: CARD_W }}
                  >
                    <motion.div
                      onMouseMove={ripple}
                      onMouseEnter={() => { hoveredRef.current = i; hover.set(1); }}
                      onMouseLeave={() => { hoveredRef.current = -1; hover.set(0); }}
                      style={{ rotateY, scale, height: CARD_H }}
                      className="group relative rounded-xl border border-[var(--border)] bg-[#070708] overflow-hidden hover:border-[var(--border-hover)] transition-colors"
                    >
                      <div ref={(el) => (innerRefs.current[i] = el)} className="absolute inset-0">
                        <div
                          className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-[80px] opacity-[0.14] pointer-events-none"
                          style={{ background: c.color }}
                        />
                        <div
                          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-[90px] opacity-[0.1] pointer-events-none"
                          style={{ background: c.color }}
                        />
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `radial-gradient(280px circle at var(--mx,50%) var(--my,50%), ${c.color}2b, transparent 70%)`,
                          }}
                        />

                        <div className="relative h-full flex flex-col p-5">
                          <div className="flex justify-between font-mono text-[9px] tracking-widest">
                            <span style={{ color: c.color }}>{c.id} / {c.tag}</span>
                            <span className="text-[var(--text-muted)]">2026 · ACTIVE INTEGRATION</span>
                          </div>

                          <div
                            className="mt-3 self-start rounded-md px-2.5 py-1 font-mono text-[8px] tracking-wider border bg-[var(--surface-2)]"
                            style={{ color: c.color, borderColor: `${c.color}55` }}
                          >
                            {c.pill}
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-center gap-5">
                            <Art color={c.color} />
                            <div className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-mono text-[8px] leading-relaxed text-center">
                              <div className="text-[var(--text-muted)] tracking-widest mb-0.5">{c.codeTitle}</div>
                              <div style={{ color: c.color }}>{c.code}</div>
                            </div>
                          </div>

                          <h3 className="italic-serif text-[4rem] leading-[0.95] mb-3 whitespace-nowrap">{c.name}</h3>
                          <p className="font-sans text-[13px] text-[var(--text-muted)] leading-relaxed mb-3">{c.desc}</p>
                          <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] opacity-70">
                            {c.tech}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {[
            { d: -1, I: FiChevronLeft, pos: 'left-4', off: idx <= 0 },
            { d: 1, I: FiChevronRight, pos: 'right-4', off: idx >= maxIdx },
          ].map(({ d, I, pos, off }) => (
            <button
              key={d}
              onClick={() => snapTo(idx + d)}
              disabled={off}
              aria-label={d < 0 ? 'Previous' : 'Next'}
              className={`absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[var(--border-hover)] bg-black flex items-center justify-center text-white transition-all ${pos} ${
                off ? 'opacity-30 cursor-not-allowed' : 'hover:border-[var(--cyan)] hover:text-[var(--cyan)]'
              }`}
            >
              <I size={22} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}