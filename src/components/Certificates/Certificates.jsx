import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
import certificates from '../../data/certificates.js';
import './Certificates.css';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
};

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="certificates-section">
      <div className="section-header">
        <h2 className="section-title">Certificates &amp; Achievements</h2>
        <p className="section-subtitle">My Learning Journey</p>
      </div>

      <div className="certificates-grid">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id ?? i}
            className="cert-card"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            {/* Image / Placeholder */}
            <div className="cert-image-wrap">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="cert-image" />
              ) : (
                <div className="cert-placeholder">
                  <Award size={48} strokeWidth={1.5} />
                </div>
              )}
            </div>

            <div className="cert-body">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-org">{cert.organization}</p>
              <p className="cert-date">{cert.date}</p>
              <button
                className="cert-btn"
                onClick={() => setSelected(cert)}
              >
                View Certificate
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="cert-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={22} />
              </button>

              {selected.image ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="cert-modal-image"
                />
              ) : (
                <div className="cert-modal-placeholder">
                  <Award size={96} strokeWidth={1} />
                </div>
              )}

              <div className="cert-modal-info">
                <h3>{selected.title}</h3>
                <p>{selected.organization}</p>
                <span>{selected.date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
