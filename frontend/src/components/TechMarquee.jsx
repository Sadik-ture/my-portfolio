import {
  SiLaravel, SiPython, SiFastapi, SiReact, SiNodedotjs,
  SiMongodb, SiMysql, SiTailwindcss, SiGit, SiFigma, SiJavascript, SiPhp,
} from 'react-icons/si';

const techs = [
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'PHP', Icon: SiPhp, color: '#777BB4' },
];

function TechMarquee() {
  const loop = [...techs, ...techs];
  return (
    <div className="marquee relative border-y border-[var(--border)] bg-[var(--surface)] py-6 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />
      <div className="marquee-track">
        {loop.map(({ name, Icon, color }, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
            <Icon size={22} style={{ color }} />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;