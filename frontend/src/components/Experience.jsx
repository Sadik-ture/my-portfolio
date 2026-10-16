import { FiBriefcase, FiAward, FiUsers } from 'react-icons/fi';

function Experience() {
  const experience = [
    {
      role: 'Intern Lead — Software Engineering',
      company: 'JU-ICT, Jimma University',
      period: '2024/25 – Present',
      location: 'Jimma, Ethiopia',
      description:
        'Lead the internship team — assigning tasks, coordinating teammates, and keeping delivery on schedule. Build and maintain full-stack web solutions with Laravel and AI services with Python, working closely with ICT staff and peers.',
      type: 'work',
    },
    {
      role: 'Elite Software Engineering Internship (Top 5)',
      company: 'Jimma University',
      period: '2-Year Program',
      location: 'Ethiopia',
      description:
        'Selected as one of the top 5 Software Engineering students for an industry-level, production-ready software training program. Delivered academic and practical projects in collaboration with peers and faculty.',
      type: 'work',
    },
  ];

  const achievements = [
    {
      title: '3rd Place — JU AI Hackathon',
      description:
        'Placed 3rd in the Jimma University AI Hackathon, building an AI-powered solution under time constraints.',
    },
    {
      title: 'Top 5 Selection — Elite SE Internship',
      description:
        'Chosen among the top 5 Software Engineering students at Jimma University for the elite 2-year internship program.',
    },
  ];

  const volunteer = [
    {
      role: 'President — Oromo Students Union',
      company: 'Jimma University',
      period: '2024 – 2025',
      location: 'Jimma, Ethiopia',
      description:
        'Elected by peers to represent students, bridged communication between students and faculty, resolved issues, and organized student meetings, academic workshops, and cultural events.',
    },
  ];

  const typeIcon = {
    work: FiBriefcase,
    achievement: FiAward,
    volunteer: FiUsers,
  };

  const typeColor = {
    work: '#3b82f6',
    achievement: '#f59e0b',
    volunteer: '#8b5cf6',
  };

  const renderTimeline = (items, type) => {
    const Icon = typeIcon[type];
    const color = typeColor[type];

    return (
      <div className="relative border-l-2 border-[var(--border)] ml-3 pl-8 space-y-8">
        {items.map((item, idx) => (
          <div key={idx} className="relative">
            {/* Timeline dot */}
            <div
              className="absolute -left-[41px] w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <Icon size={12} className="text-white" />
            </div>

            <div className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {item.title || item.role}
                </h3>
                {item.period && (
                  <span className="text-sm text-[var(--accent)] font-medium">
                    {item.period}
                  </span>
                )}
              </div>

              {item.company && (
                <p className="text-[var(--text-secondary)] font-medium mb-1">
                  {item.company}
                  {item.location && ` · ${item.location}`}
                </p>
              )}

              <p className="text-[var(--text-secondary)] leading-relaxed text-sm mt-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="experience" className="section">
      <div className="container-custom">
        <h2 className="section-title">Experience & Achievements</h2>

        {/* Work Experience */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 text-[var(--text-secondary)] flex items-center gap-2">
            <FiBriefcase className="text-[var(--accent)]" size={20} />
            Work Experience
          </h3>
          {renderTimeline(experience, 'work')}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 text-[var(--text-secondary)] flex items-center gap-2">
            <FiAward className="text-[var(--accent)]" size={20} />
            Achievements
          </h3>
          {renderTimeline(achievements, 'achievement')}
        </div>

        {/* Volunteer */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-[var(--text-secondary)] flex items-center gap-2">
            <FiUsers className="text-[var(--accent)]" size={20} />
            Leadership & Volunteer
          </h3>
          {renderTimeline(volunteer, 'volunteer')}
        </div>
      </div>
    </section>
  );
}

export default Experience;