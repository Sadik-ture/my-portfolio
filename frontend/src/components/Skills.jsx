import { motion } from 'framer-motion';
import {
  SiLaravel,
  SiPython,
  SiFastapi,
  SiJavascript,
  SiPhp,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
} from 'react-icons/si';
import {
  FiCode,
  FiDatabase,
  FiCpu,
  FiUsers,
} from 'react-icons/fi';

function Skills() {
  const categories = [
    {
      title: 'Languages & Frameworks',
      icon: FiCode,
      accent: '#3b82f6',
      skills: [
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'PHP', icon: SiPhp, color: '#777BB4' },
        { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
        { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      ],
    },
    {
      title: 'Databases & Tools',
      icon: FiDatabase,
      accent: '#8b5cf6',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'GitHub', icon: SiGithub, color: 'var(--text-primary)' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      ],
    },
    {
      title: 'AI & Specialized',
      icon: FiCpu,
      accent: '#10b981',
      skills: [
        { name: 'AI Chatbot Integration', icon: FiCpu, color: '#10A37F' },
        { name: 'Full-Stack Development', icon: SiLaravel, color: '#FF2D20' },
        { name: 'REST APIs', icon: SiFastapi, color: '#009688' },
      ],
    },
    {
      title: 'Professional Skills',
      icon: FiUsers,
      accent: '#f59e0b',
      skills: [
        { name: 'Leadership', icon: FiUsers, color: '#8b5cf6' },
        { name: 'Communication', icon: FiUsers, color: '#ec4899' },
        { name: 'Project Management', icon: FiUsers, color: '#10b981' },
        { name: 'Critical Thinking', icon: FiUsers, color: '#3b82f6' },
      ],
    },
  ];

  return (
    <section id="skills" className="section bg-secondary">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category, catIdx) => {
            const CatIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className="card p-6 md:p-8"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.accent}20` }}
                  >
                    <CatIcon
                      size={20}
                      style={{ color: category.accent }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      {category.skills.length}{' '}
                      {category.skills.length === 1 ? 'skill' : 'skills'}
                    </p>
                  </div>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="group flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)]/40 hover:border-[var(--accent)] hover:bg-[var(--bg-primary)] transition-all duration-300 hover:-translate-y-1"
                      >
                        <Icon
                          size={28}
                          style={{ color: skill.color }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="text-xs font-medium text-center text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors leading-tight">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;