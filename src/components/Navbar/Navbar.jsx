// ============================================================
// Navbar — src/components/Navbar/Navbar.jsx
// Premium sticky navbar with glassmorphism, mobile drawer,
// scroll-spy active links, animated hamburger, CV download
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import styles from './Navbar.module.css';

// ── Section definitions ──────────────────────────────────────
const NAV_SECTIONS = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'education',    label: 'Education' },
  { id: 'experience',   label: 'Experience' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'services',     label: 'Services' },
  { id: 'contact',      label: 'Contact' },
];

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

// ── Smooth scroll helper ─────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const navbarHeight = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ── AM Monogram ──────────────────────────────────────────────
function Monogram() {
  return (
    <div className={styles.monogram} aria-label="AM logo">
      <span className={styles.monogramA}>A</span>
      <span className={styles.monogramDivider} />
      <span className={styles.monogramM}>M</span>
    </div>
  );
}

// ── Animated Hamburger Icon ──────────────────────────────────
function HamburgerIcon({ isOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
      <motion.span
        className={styles.hamburgerLine}
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      <motion.span
        className={styles.hamburgerLine}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
      <motion.span
        className={styles.hamburgerLine}
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ── Mobile Drawer ────────────────────────────────────────────
const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 32 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const itemVariants = {
  hidden: { x: 24, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.045, duration: 0.25, ease: 'easeOut' },
  }),
};

// ── Main Component ───────────────────────────────────────────
export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const drawerRef                   = useRef(null);
  const activeSection               = useScrollSpy(SECTION_IDS, 80);

  // Scroll state → glassmorphism
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close drawer on outside click
  const handleOverlayClick = useCallback(() => setMenuOpen(false), []);

  // Nav link click (desktop + mobile)
  const handleNavClick = useCallback((id) => {
    scrollTo(id);
    setMenuOpen(false);
  }, []);

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">

        {/* Brand */}
        <button
          className={styles.brand}
          onClick={() => handleNavClick('home')}
          aria-label="Go to top"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: 0 }}
        >
          <Monogram />
          <div>
            <div className={styles.brandName}>Abdallh Moursi</div>
            <div className={styles.brandTagline}>Full‑Stack Developer</div>
          </div>
        </button>

        {/* Desktop nav links */}
        <ul className={styles.navLinks} role="list">
          {NAV_SECTIONS.map(({ id, label }) => (
            <li key={id} className={styles.navItem}>
              <button
                className={`${styles.navLink} ${activeSection === id ? styles.active : ''}`}
                onClick={() => handleNavClick(id)}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className={styles.actions}>
          <a
            href="/assets/Abdallh_Maged_CV_ 2.pdf"
            download="Abdallh_Maged_CV_ 2.pdf"
            className={styles.cvButton}
            aria-label="Download CV"
          >
            <Download size={13} strokeWidth={2.5} />
            Download CV
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          {/* Hamburger — only visible on mobile via CSS */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
          >
            <HamburgerIcon isOpen={menuOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className={styles.overlay}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleOverlayClick}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              className={styles.mobileDrawer}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className={styles.drawerHeader}>
                <Monogram />
                <button
                  className={styles.drawerClose}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  ✕
                </button>
              </div>

              {/* Mobile nav links */}
              <ul className={styles.mobileNavLinks} role="list">
                {NAV_SECTIONS.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      className={`${styles.mobileNavLink} ${activeSection === id ? styles.active : ''}`}
                      onClick={() => handleNavClick(id)}
                      aria-current={activeSection === id ? 'page' : undefined}
                    >
                      <span className={styles.mobileNavDot} aria-hidden="true" />
                      {label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Drawer footer */}
              <motion.div
                className={styles.drawerFooter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.35 } }}
              >
                <a
                  href="/assets/Abdallh-Moursi-CV.pdf"
                  download="Abdallh-Moursi-CV.pdf"
                  className={styles.cvButtonMobile}
                  onClick={() => setMenuOpen(false)}
                >
                  <Download size={15} strokeWidth={2.5} />
                  Download CV
                </a>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
