import { motion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, CalendarDays, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    id: 1,
    organization: 'ITIDA Gigs',
    role: 'Freelancing Training Program',
    period: 'March 2026 – June 2026',
    description: 'Completed professional training focused on finding clients, writing proposals, communicating with clients, managing projects, and delivering freelance services professionally.',
    skills: ['Freelancing', 'Client Communication', 'Proposal Writing', 'Project Management'],
    icon: BriefcaseBusiness,
    type: 'Professional Training',
  },
  {
    id: 2,
    organization: 'NTI – National Telecommunication Institute',
    role: 'MEAN Stack Development Training',
    period: 'August 2026 – November 2026',
    description: 'Practical full-stack development training covering MongoDB, Express.js, Angular, and Node.js, including frontend development, backend APIs, and database management.',
    skills: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
    icon: GraduationCap,
    type: 'Technical Training',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Career journey</span>
          <h2 className="section-title">Experience &amp; Training</h2>
          <p className="section-subtitle">My professional development and technical learning journey.</p>
        </div>
        <div className="experience-timeline">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="experience-card"
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <div className="experience-icon"><Icon size={25} /></div>
                <div className="experience-content">
                  <div className="experience-meta">
                    <span className="experience-type">{item.type}</span>
                    <span className="experience-date"><CalendarDays size={15} />{item.period}</span>
                  </div>
                  <h3>{item.role}</h3>
                  <h4>{item.organization}</h4>
                  <p>{item.description}</p>
                  <div className="experience-tags">
                    {item.skills.map((skill) => <span key={skill}><CheckCircle2 size={13} />{skill}</span>)}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
