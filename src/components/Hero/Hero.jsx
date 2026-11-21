import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ChevronDown, Download, ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────
// TYPEWRITER SUB-COMPONENT
// ─────────────────────────────────────────────
const ROLES = [
  'Full Stack Developer',
  'React.js Developer',
  'Angular Developer',
  'Node.js Developer',
  'Backend Developer',
  'Creative Problem Solver',
];

const TYPING_SPEED   = 80;   // ms per char (typing)
const DELETING_SPEED = 40;   // ms per char (deleting)
const PAUSE_AFTER    = 1800; // ms hold when fully typed
const PAUSE_BEFORE   = 400;  // ms hold when fully deleted

function Typewriter() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex]     = useState(0);
  const [phase, setPhase]             = useState('typing'); // 'typing' | 'pausing' | 'deleting' | 'waiting'

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timer;

    if (phase === 'typing') {
      if (displayText.length < current.length) {
        timer = setTimeout(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          TYPING_SPEED
        );
      } else {
        timer = setTimeout(() => setPhase('pausing'), PAUSE_AFTER);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timer = setTimeout(
          () => setDisplayText(displayText.slice(0, -1)),
          DELETING_SPEED
        );
      } else {
        timer = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % ROLES.length);
          setPhase('typing');
        }, PAUSE_BEFORE);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, phase, roleIndex]);

  return (
    <span style={styles.typewriterWrapper}>
      <span style={styles.typewriterText}>{displayText}</span>
      <span style={styles.cursor} aria-hidden="true">|</span>
    </span>
  );
}

// ─────────────────────────────────────────────
// FLOATING BADGE
// ─────────────────────────────────────────────
const TECH_BADGES = [
  { label: 'React',    color: '#61DAFB', bg: 'rgba(97,218,251,0.15)', pos: { top: '8%',  left: '-14%' },  delay: 0 },
  { label: 'Node.js',  color: '#6CC24A', bg: 'rgba(108,194,74,0.15)', pos: { top: '8%',  right: '-14%' }, delay: 0.4 },
  { label: 'Angular',  color: '#DD0031', bg: 'rgba(221,0,49,0.15)',   pos: { bottom: '12%', left: '-14%' },  delay: 0.8 },
  { label: 'Python',   color: '#FFD43B', bg: 'rgba(255,212,59,0.15)', pos: { bottom: '12%', right: '-14%' }, delay: 1.2 },
];

function FloatingBadge({ label, color, bg, pos, delay }) {
  return (
    <motion.div
      style={{ ...styles.badge, ...pos, backgroundColor: bg, borderColor: color + '55' }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <span style={{ ...styles.badgeDot, background: color }} />
      <span style={{ ...styles.badgeLabel, color }}>{label}</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────
function Particles() {
  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left:  `${Math.random() * 100}%`,
      size:  `${3 + Math.random() * 2}px`,
      delay: `${Math.random() * 8}s`,
      dur:   `${6 + Math.random() * 6}s`,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  ).current;

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1);   opacity: var(--p-op); }
          50%  { transform: translateY(-40px) scale(1.2); opacity: calc(var(--p-op) * 1.5); }
          100% { transform: translateY(-80px) scale(0.8); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            bottom: `${10 + Math.random() * 60}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--color-brand-accent)',
            '--p-op': p.opacity,
            opacity: p.opacity,
            animation: `floatUp ${p.dur} ${p.delay} infinite ease-in-out`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

// ─────────────────────────────────────────────
// PROFILE IMAGE
// ─────────────────────────────────────────────
function ProfileImage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div style={styles.imageContainer}>
      {/* rotating gradient border */}
      <style>{`
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-20px, 30px) scale(1.08); }
        }
        @keyframes orbDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(15px, 25px) scale(1.05); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div style={styles.spinnerRing} aria-hidden="true" />

      <div style={styles.imageInner}>
        {imgError ? (
          <div style={styles.imagePlaceholder}>
            <span style={styles.initials}>AM</span>
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
            alt="Abdallh Moursi"
            style={styles.profileImg}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {TECH_BADGES.map((b) => (
        <FloatingBadge key={b.label} {...b} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SCROLL INDICATOR
// ─────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div style={styles.scrollIndicator}>
      <div style={styles.scrollLine} />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        style={styles.scrollChevron}
      >
        <ChevronDown size={18} color="var(--color-brand-accent)" />
      </motion.div>
      <span style={styles.scrollText}>Scroll Down</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// MOTION VARIANTS
// ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const imageVariants = {
  hidden:  { opacity: 0, x: 60, scale: 0.92 },
  visible: { opacity: 1, x: 0,  scale: 1,   transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } },
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
export default function Hero() {
  const handleViewProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" style={styles.section}>
      {/* Background gradient orbs */}
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />

      {/* Floating particles */}
      <Particles />

      <div style={styles.inner}>
        {/* ── LEFT — text ── */}
        <motion.div
          style={styles.textCol}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p variants={itemVariants} style={styles.eyebrow}>
            HELLO, WELCOME TO MY PORTFOLIO
          </motion.p>

          {/* Main heading */}
          <motion.h1 variants={itemVariants} style={styles.heading}>
            Hi, I'm{' '}
            <span style={styles.gradientName}>Abdallh Moursi</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={itemVariants} style={styles.typewriterRow}>
            <span style={styles.rolePrefix}>I am a&nbsp;</span>
            <Typewriter />
          </motion.div>

          {/* Bio */}
          <motion.p variants={itemVariants} style={styles.bio}>
            I'm a passionate Full Stack Developer who enjoys transforming ideas
            into powerful, scalable, and user-friendly web applications. I build
            modern frontend experiences and robust backend systems using React,
            Angular, Node.js, and Express.js.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} style={styles.ctaRow}>
            <a
              href={`${import.meta.env.BASE_URL}assets/Abdallh-Moursi-CV.pdf`}
              download="Abdallh-Moursi-CV.pdf"
              style={styles.btnPrimary}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.btnPrimaryHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.btnPrimary)}
            >
              <Download size={16} />
              Download CV
            </a>
            <a
              href="#projects"
              onClick={handleViewProjects}
              style={styles.btnOutline}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.btnOutlineHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.btnOutline)}
            >
              <ExternalLink size={16} />
              View My Projects
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} style={styles.socialRow}>
            <a
              href="https://github.com/abdallh376"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialBtn}
              aria-label="GitHub"
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.socialBtnHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.socialBtn)}
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/abdallh-moursi/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialBtn}
              aria-label="LinkedIn"
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.socialBtnHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.socialBtn)}
            >
              <FaLinkedin size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT — image ── */}
        <motion.div
          style={styles.imageCol}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <ProfileImage />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = {
  /* Section */
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    background: 'var(--gradient-hero)',
    padding: '100px 24px 80px',
  },

  /* Background orbs */
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  orb1: {
    width: '500px',
    height: '500px',
    top: '-120px',
    left: '-120px',
    background: 'var(--orb-1)',
    animation: 'orbDrift1 14s ease-in-out infinite',
  },
  orb2: {
    width: '400px',
    height: '400px',
    top: '30%',
    right: '-100px',
    background: 'var(--orb-2)',
    animation: 'orbDrift2 18s ease-in-out infinite',
  },
  orb3: {
    width: '350px',
    height: '350px',
    bottom: '-80px',
    left: '30%',
    background: 'var(--orb-3)',
    animation: 'orbDrift3 22s ease-in-out infinite',
  },

  /* Layout */
  inner: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '48px',
    flexWrap: 'wrap',
  },

  textCol: {
    flex: '1 1 480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: '280px',
  },

  imageCol: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Eyebrow */
  eyebrow: {
    margin: 0,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--color-brand-accent)',
    fontFamily: 'inherit',
  },

  /* Heading */
  heading: {
    margin: 0,
    fontSize: 'clamp(2rem, 5vw, 3.4rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    color: 'var(--text-primary)',
  },

  gradientName: {
    background: 'var(--gradient-accent)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
  },

  /* Typewriter row */
  typewriterRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    minHeight: '2.2rem',
  },

  rolePrefix: {
    color: 'var(--text-secondary)',
  },

  typewriterWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
  },

  typewriterText: {
    color: 'var(--color-brand-accent)',
  },

  cursor: {
    display: 'inline-block',
    color: 'var(--color-brand-accent)',
    fontWeight: 300,
    marginLeft: '1px',
    animation: 'cursorBlink 0.9s step-end infinite',
  },

  /* Bio */
  bio: {
    margin: 0,
    fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
    lineHeight: 1.75,
    color: 'var(--text-muted)',
    maxWidth: '540px',
  },

  /* CTA row */
  ctaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
  },

  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 28px',
    borderRadius: '50px',
    background: 'var(--gradient-accent)',
    color: 'var(--text-on-accent)',
    fontWeight: 700,
    fontSize: '0.95rem',
    textDecoration: 'none',
    boxShadow: 'var(--shadow-glow)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },

  btnPrimaryHover: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '13px 28px',
    borderRadius: '50px',
    background: 'var(--gradient-accent)',
    color: 'var(--text-on-accent)',
    fontWeight: 700,
    fontSize: '0.95rem',
    textDecoration: 'none',
    boxShadow: '0 0 32px rgba(91,145,163,0.5)',
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },

  btnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 26px',
    borderRadius: '50px',
    border: '2px solid var(--color-brand-accent)',
    color: 'var(--color-brand-accent)',
    fontWeight: 700,
    fontSize: '0.95rem',
    textDecoration: 'none',
    background: 'transparent',
    transition: 'background 0.2s, color 0.2s, transform 0.2s',
    cursor: 'pointer',
  },

  btnOutlineHover: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 26px',
    borderRadius: '50px',
    border: '2px solid var(--color-brand-accent)',
    color: 'var(--text-on-accent)',
    fontWeight: 700,
    fontSize: '0.95rem',
    textDecoration: 'none',
    background: 'var(--gradient-accent)',
    transform: 'translateY(-2px)',
    transition: 'background 0.2s, color 0.2s, transform 0.2s',
    cursor: 'pointer',
  },

  /* Social */
  socialRow: {
    display: 'flex',
    gap: '12px',
  },

  socialBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid var(--border-accent)',
    color: 'var(--color-brand-accent)',
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(10px)',
    textDecoration: 'none',
    transition: 'background 0.2s, transform 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },

  socialBtnHover: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '2px solid var(--color-brand-accent)',
    color: 'var(--text-on-accent)',
    background: 'var(--gradient-accent)',
    backdropFilter: 'blur(10px)',
    textDecoration: 'none',
    transform: 'translateY(-2px) scale(1.08)',
    transition: 'background 0.2s, transform 0.2s, border-color 0.2s',
    cursor: 'pointer',
  },

  /* Profile image container */
  imageContainer: {
    position: 'relative',
    width: '340px',
    height: '340px',
  },

  spinnerRing: {
    position: 'absolute',
    inset: '-6px',
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, var(--color-brand-accent) 0%, transparent 50%, var(--color-brand-accent-alt) 100%)',
    animation: 'rotateBorder 4s linear infinite',
    zIndex: 0,
  },

  imageInner: {
    position: 'absolute',
    inset: '6px',
    borderRadius: '50%',
    overflow: 'hidden',
    zIndex: 1,
    background: 'var(--bg-card)',
    boxShadow: 'var(--shadow-lg)',
  },

  profileImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--gradient-primary)',
  },

  initials: {
    fontSize: '72px',
    fontWeight: 900,
    background: 'var(--gradient-accent)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-2px',
    userSelect: 'none',
  },

  /* Floating badge */
  badge: {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid',
    backdropFilter: 'blur(8px)',
    zIndex: 2,
    whiteSpace: 'nowrap',
    boxShadow: 'var(--shadow-md)',
  },

  badgeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },

  badgeLabel: {
    fontSize: '12px',
    fontWeight: 700,
  },

  /* Scroll indicator */
  scrollIndicator: {
    position: 'absolute',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    zIndex: 2,
  },

  scrollLine: {
    width: '1px',
    height: '40px',
    background: 'linear-gradient(to bottom, transparent, var(--color-brand-accent))',
  },

  scrollChevron: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollText: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
};
