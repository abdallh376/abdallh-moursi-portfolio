import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const iconVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.5 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit:    { opacity: 0, rotate: 90,  scale: 0.5 },
};

const transition = { duration: 0.3, ease: 'easeInOut' };

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: isDark
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(0, 0, 0, 0.06)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      : '0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    padding: 0,
    flexShrink: 0,
    transition: 'box-shadow 0.3s ease, background 0.3s ease',
  };

  return (
    <motion.button
      onClick={toggleTheme}
      style={buttonStyle}
      whileHover={{
        scale: 1.1,
        boxShadow: isDark
          ? '0 6px 28px rgba(108, 99, 255, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
          : '0 6px 28px rgba(255, 165, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}
          >
            <Sun size={20} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6c63ff' }}
          >
            <Moon size={20} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
