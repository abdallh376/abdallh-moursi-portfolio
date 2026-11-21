import { motion } from 'framer-motion';
import {
  Monitor,
  Plug,
  Server,
  Database,
  FileCode,
  Layers,
  Code2,
  Palette,
} from 'lucide-react';
import services from '../../data/services.js';
import './Services.css';

const ICON_MAP = {
  monitor: Monitor,
  plug: Plug,
  server: Server,
  database: Database,
  'file-code': FileCode,
  layers: Layers,
  code: Code2,
  palette: Palette,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <h2 className="section-title">My Services</h2>
        <p className="section-subtitle">How I Can Help You</p>
      </div>

      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service, i) => {
          const IconComponent = ICON_MAP[service.icon] ?? Code2;
          return (
            <motion.div
              key={service.id ?? i}
              className="service-card"
              variants={cardVariants}
            >
              <div className="service-icon-wrap">
                <IconComponent size={24} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
