import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiAward, FiLock } from 'react-icons/fi';
import { SiLaravel, SiPython, SiFastapi, SiMysql, SiTailwindcss } from 'react-icons/si';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'JU Event Management System with AI Chatbot',
      description:
        'An AI chatbot-integrated event platform built with Python and FastAPI, delivered to JU-ICT. Handles event creation, registration, and an intelligent assistant that answers attendee questions in real time.',
      tech: ['Python', 'FastAPI', 'AI Chatbot', 'REST API'],
      images: ['/projects/pms-director-dashboard.png'],
      github: null,
      live: null,
      badge: 'Delivered to JU-ICT',
      private: true,
    },
    {
      id: 2,
      title: 'Jimma University Student Marketplace',
      description:
        'A full-stack e-commerce marketplace exclusively for Jimma University students to buy, sell, and exchange goods — books, electronics, watches, and more. Includes user authentication, product listings, search, and secure transactions.',
      tech: ['Full-Stack', 'Authentication', 'E-commerce', 'REST API'],
      images: ['/projects/pms-users.png'],
      github: 'https://github.com/Sadik-ture/JU_Market-',
      live: null,
      badge: 'Students-Only Platform',
      private: false,
    },
    {
      id: 3,
      title: 'JU ICT Project Management System',
      description:
        'A Laravel 12 web application for the Jimma University ICT Directorate to plan, assign, and track ICT projects. Features role-based access control, a Project to Phases to Tasks hierarchy, per-role dashboards, PDF and Excel reporting, internal messaging, and workflow automation.',
      tech: ['Laravel 12', 'MySQL', 'Tailwind CSS', 'RBAC'],
      images: [
        '/projects/pms-director-dashboard.png',
        '/projects/pms-my-tasks.png',
        '/projects/pms-users.png',
        '/projects/pms-login.png',
      ],
      github: 'https://github.com/muhammed-hassen/JU_ICT_PMS',
      live: null,
      badge: 'Team Project - Production',
      private: false,
    },
  ];

  const getTechIcon = (tech) => {
    const map = {
      Laravel: { icon: SiLaravel, color: '#FF2D20' },
      'Laravel 12': { icon: SiLaravel, color: '#FF2D20' },
      Python: { icon: SiPython, color: '#3776AB' },
      FastAPI: { icon: SiFastapi, color: '#009688' },
      MySQL: { icon: SiMysql, color: '#4479A1' },
      'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
    };
    return map[tech] || null;
  };

  return (
    <section id="projects" className="section bg-secondary">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>

        <div className="space-y-20">
          {projects.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div className={isReversed ? 'lg:order-2' : ''}>
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative rounded-xl overflow-hidden border border-[var(--border)] shadow-2xl">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                <div className={isReversed ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded-full flex items-center gap-2">
                      {project.private ? <FiLock size={12} /> : <FiAward size={12} />}
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)]">
                    {project.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => {
                      const iconData = getTechIcon(t);
                      return (
                        <span
                          key={t}
                          className="flex items-center gap-2 text-xs bg-[var(--bg-card)] px-3 py-1.5 rounded-full border border-[var(--border)]"
                        >
                          {iconData && (
                            <iconData.icon size={12} style={{ color: iconData.color }} />
                          )}
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                      >
                        <FiGithub size={18} />
                        View Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                      >
                        <FiExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                    {project.private && (
                      <span className="text-sm text-[var(--text-muted)] italic flex items-center gap-2">
                        <FiLock size={14} />
                        Private / Delivered
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;