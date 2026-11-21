import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FiCode, FiBriefcase, FiAward, FiLayers } from 'react-icons/fi';
import useInView from '../../hooks/useInView';

/* ─── Stat data ─── */
const stats = [
  { id: 1, value: 2, suffix: '+', label: 'Years of Experience', icon: <FiBriefcase size={22} /> },
  { id: 2, value: 4, suffix: '+', label: 'Completed Projects',  icon: <FiLayers     size={22} /> },
  { id: 3, value: 1, suffix: '+', label: 'Companies & Training', icon: <FiAward      size={22} /> },
  {
    id: 4,
    value: null,
    suffix: '',
    label: 'Core Expertise',
    text: 'React.js + Node.js',
    icon: <FiCode size={22} />,
  },
];

/* ─── Count-up hook ─── */
function useCountUp(target, duration = 1500, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active || target === null) return;
    let start = 0;
    const step = Math.ceil(duration / (target || 1));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

/* ─── Single stat card ─── */
function StatCard({ stat, active, index }) {
  const count = useCountUp(stat.value, 1200, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      style={{
        background: 'var(--card-bg, rgba(255,255,255,0.05))',
        border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
        borderRadius: '16px',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(96,193,229,0.18)' }}
    >
      {/* Top accent bar */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--gradient-accent, linear-gradient(90deg,#5B91A3,#60C1E5))',
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Icon */}
      <span style={{ color: 'var(--accent-color, #60C1E5)', marginTop: '8px' }}>
        {stat.icon}
      </span>

      {/* Value */}
      <span
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--text-primary, #fff)',
          lineHeight: 1,
          letterSpacing: '-0.5px',
        }}
      >
        {stat.value !== null ? `${count}${stat.suffix}` : stat.text}
      </span>

      {/* Label */}
      <span
        style={{
          fontSize: '0.78rem',
          color: 'var(--text-secondary, #aaa)',
          fontWeight: 500,
          letterSpacing: '0.3px',
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ─── Decorative floating orb ─── */
function FloatingOrb({ style }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(60px)',
        opacity: 0.18,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

const aboutSocialStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 16px',
  borderRadius: '999px',
  border: '1px solid rgba(96,193,229,0.35)',
  color: 'var(--text-primary, #fff)',
  background: 'rgba(96,193,229,0.08)',
  textDecoration: 'none',
  fontSize: '0.85rem',
  fontWeight: 650,
  transition: 'transform 0.2s ease, background 0.2s ease',
};

/* ─── Main component ─── */
export default function About() {
  const [sectionRef, inView] = useInView({ threshold: 0.15 });

  const bioLines = [
    'Full Stack Developer | React.js, Angular, Node.js, Express.js, Python | JavaScript, HTML, CSS',
    "I've always been the kind of person who needs to understand how things work. That curiosity led me into computer science, and later into building real web applications that solve real problems.",
    'I earned my B.Sc. in Computer Science from Misr Higher Institute for Commerce and Computers in Mansoura (2021–2025). Along the way I built Epiderma, an AI-powered skin disease detection platform that connects a Flask model to a React frontend and Node.js backend, and DAR, a competitive programming tournament platform with team registration and automated elimination brackets.',
    "To deepen my skills, I completed Meta's React Basics and Advanced React courses on Coursera, and graduated from the ITIDA Gigs 3-month freelance training program, where I learned how to find clients, write proposals, and deliver projects professionally. I'm currently finishing MEAN Stack training at NTI.",
    "I'm now looking for a junior full-stack role where I can keep building, keep learning, and contribute to products that matter.",
    'Email: abdalla.m.moursi@gmail.com',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 80px)',
        overflow: 'hidden',
        background: 'var(--bg-secondary, #0d1117)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background orbs */}
      <FloatingOrb style={{ width: 400, height: 400, top: -100, left: -100, background: '#5B91A3' }} />
      <FloatingOrb style={{ width: 300, height: 300, bottom: -80, right: -80, background: '#60C1E5' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
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
            Get to Know Me
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
            About{' '}
            <span
              style={{
                background: 'var(--gradient-accent, linear-gradient(90deg,#5B91A3,#60C1E5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Me
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

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(240px,35%,420px) 1fr',
            gap: 'clamp(32px, 5vw, 72px)',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* ── LEFT: Decorative avatar + mini-highlights ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'relative' }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                background: 'var(--card-bg, rgba(255,255,255,0.05))',
                border: '2px solid var(--border-color, rgba(255,255,255,0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                alt="Abdallh Moursi"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 24%',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(8,18,32,0.58) 100%)',
                }}
              />

              {/* Corner badge */}
              <span
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'var(--gradient-accent, linear-gradient(90deg,#5B91A3,#60C1E5))',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  borderRadius: '20px',
                  padding: '4px 12px',
                  letterSpacing: '1px',
                  zIndex: 2,
                }}
              >
                Full Stack Dev
              </span>
            </div>

            {/* Floating mini-badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                background: 'var(--card-bg, rgba(13,17,23,0.9))',
                border: '1px solid rgba(96,193,229,0.3)',
                borderRadius: '12px',
                padding: '10px 14px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>⚡</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-primary, #fff)', fontWeight: 600 }}>
                Open to Work
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '-16px',
                left: '-16px',
                background: 'var(--card-bg, rgba(13,17,23,0.9))',
                border: '1px solid rgba(91,145,163,0.3)',
                borderRadius: '12px',
                padding: '10px 14px',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🎓</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-primary, #fff)', fontWeight: 600 }}>
                CS Graduate 2025
              </span>
            </motion.div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '30px',
              }}
            >
              <a href="https://github.com/abdallh376" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub profile"
                style={aboutSocialStyle}>GitHub</a>
              <a href="https://www.linkedin.com/in/abdallh-moursi/" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                style={aboutSocialStyle}>LinkedIn</a>
              <a href="https://wa.me/201554458172" target="_blank" rel="noopener noreferrer"
                aria-label="Contact on WhatsApp"
                style={aboutSocialStyle}>WhatsApp</a>
              <a href="mailto:abdalla.m.moursi@gmail.com" aria-label="Send email"
                style={aboutSocialStyle}>Email Me</a>
            </div>
          </motion.div>

          {/* ── RIGHT: Biography + Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            {/* Biography */}
            <div
              style={{
                background: 'var(--card-bg, rgba(255,255,255,0.03))',
                border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                borderRadius: '20px',
                padding: 'clamp(24px, 3vw, 36px)',
                marginBottom: '32px',
                backdropFilter: 'blur(8px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Left accent bar */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: 'var(--gradient-accent, linear-gradient(180deg,#5B91A3,#60C1E5))',
                  borderRadius: '20px 0 0 20px',
                }}
              />

              {bioLines.map((line, i) => {
                const isFirst = i === 0;
                const isEmail = line.startsWith('Email:');
                return (
                  <p
                    key={i}
                    style={{
                      margin: i === 0 ? '0 0 16px' : '0 0 14px',
                      fontSize: isFirst ? '0.9rem' : '0.95rem',
                      lineHeight: 1.75,
                      color: isFirst
                        ? 'var(--accent-color, #60C1E5)'
                        : isEmail
                        ? 'var(--accent-color, #60C1E5)'
                        : 'var(--text-secondary, #bbb)',
                      fontWeight: isFirst ? 600 : isEmail ? 500 : 400,
                      letterSpacing: isFirst ? '0.3px' : 'normal',
                    }}
                  >
                    {isEmail ? (
                      <>
                        <strong style={{ color: 'var(--text-primary, #fff)' }}>Email: </strong>
                        <a
                          href="mailto:abdalla.m.moursi@gmail.com"
                          style={{
                            color: 'var(--accent-color, #60C1E5)',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(96,193,229,0.4)',
                            paddingBottom: '1px',
                          }}
                        >
                          abdalla.m.moursi@gmail.com
                        </a>
                      </>
                    ) : (
                      line
                    )}
                  </p>
                );
              })}
            </div>

            {/* Stats grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
              }}
            >
              {stats.map((stat, i) => (
                <StatCard key={stat.id} stat={stat} active={inView} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive override via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
