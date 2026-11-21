import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, Award, BookOpen } from 'lucide-react';
import useInView from '../../hooks/useInView';

const edu = {
  institution: 'Misr Higher Institute for Commerce & Computers',
  degree: "Bachelor's Degree in Computer Science",
  period: '2021 – 2025',
  grade: 'Good',
  description:
    "Successfully completed my Bachelor's degree in Computer Science, building a strong foundation in programming, software development, algorithms, databases, and computer science fundamentals.",
};

export default function Education() {
  const [sectionRef, inView] = useInView({ threshold: 0.2 });

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 80px)',
        background: 'var(--bg-primary, #0a0e14)',
        overflow: 'hidden',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(96,193,229,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--accent-color, #60C1E5)',
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            Academic Background
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary, #fff)',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            My{' '}
            <span
              style={{
                background: 'var(--gradient-accent, linear-gradient(90deg,#5B91A3,#60C1E5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Education
            </span>
          </h2>
          <div
            style={{
              width: '60px',
              height: '4px',
              background: 'var(--gradient-accent, linear-gradient(90deg,#5B91A3,#60C1E5))',
              borderRadius: '2px',
              margin: '16px auto 0',
            }}
          />
        </motion.div>

        {/* ── Premium Education Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          whileHover={{
            y: -6,
            boxShadow: '0 24px 60px rgba(96,193,229,0.18)',
          }}
          style={{
            position: 'relative',
            background: 'var(--card-bg, rgba(255,255,255,0.04))',
            border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
            borderRadius: '24px',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Left accent bar */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              background: 'linear-gradient(180deg, #5B91A3 0%, #60C1E5 100%)',
            }}
          />

          {/* Top gradient bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, rgba(91,145,163,0.6), rgba(96,193,229,0.6), transparent)',
            }}
          />

          {/* Card content — two columns */}
          <div
            className="edu-card-inner"
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: '32px',
              padding: 'clamp(32px, 4vw, 48px) clamp(28px, 4vw, 48px) clamp(32px, 4vw, 48px) clamp(40px, 5vw, 60px)',
              alignItems: 'center',
            }}
          >
            {/* ── LEFT: Icon + Badge ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              {/* Cap icon circle */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(91,145,163,0.2), rgba(96,193,229,0.2))',
                  border: '2px solid rgba(96,193,229,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 0 40px rgba(96,193,229,0.12)',
                }}
              >
                <GraduationCap size={52} color="#60C1E5" strokeWidth={1.5} />

                {/* Pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    inset: '-8px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(96,193,229,0.35)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>

              {/* Graduation year badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  background: 'linear-gradient(135deg, #5B91A3, #60C1E5)',
                  borderRadius: '50px',
                  padding: '8px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(96,193,229,0.3)',
                }}
              >
                <Award size={16} color="#fff" />
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>
                  2025
                </span>
              </motion.div>
            </div>

            {/* ── RIGHT: Text details ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Institution */}
              <div>
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: '0.78rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--accent-color, #60C1E5)',
                    fontWeight: 600,
                  }}
                >
                  Institution
                </p>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                    fontWeight: 700,
                    color: 'var(--text-primary, #fff)',
                    lineHeight: 1.3,
                  }}
                >
                  {edu.institution}
                </h3>
              </div>

              {/* Degree */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <BookOpen size={18} color="#5B91A3" style={{ marginTop: '2px', flexShrink: 0 }} />
                <p
                  style={{
                    margin: 0,
                    fontSize: '1rem',
                    color: 'var(--text-secondary, #ccc)',
                    fontWeight: 500,
                  }}
                >
                  {edu.degree}
                </p>
              </div>

              {/* Period + Grade row */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(91,145,163,0.12)',
                    border: '1px solid rgba(91,145,163,0.25)',
                    borderRadius: '8px',
                    padding: '5px 14px',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary, #ccc)',
                    fontWeight: 500,
                  }}
                >
                  <CalendarDays size={14} color="#5B91A3" />
                  {edu.period}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(96,193,229,0.1)',
                    border: '1px solid rgba(96,193,229,0.25)',
                    borderRadius: '8px',
                    padding: '5px 14px',
                    fontSize: '0.85rem',
                    color: '#60C1E5',
                    fontWeight: 600,
                  }}
                >
                  <Award size={14} color="#60C1E5" />
                  Grade: {edu.grade}
                </span>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: 'var(--border-color, rgba(255,255,255,0.08))',
                }}
              />

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontSize: '0.93rem',
                  color: 'var(--text-secondary, #aaa)',
                  lineHeight: 1.75,
                }}
              >
                {edu.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .edu-card-inner {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
