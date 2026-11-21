import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { damping: 25, stiffness: 200, mass: 0.5 };
const OUTER_SIZE = 40;
const DOT_SIZE = 8;

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot follows mouse directly (fast)
  const dotX = useSpring(rawX, { damping: 40, stiffness: 400, mass: 0.3 });
  const dotY = useSpring(rawY, { damping: 40, stiffness: 400, mass: 0.3 });

  // Outer ring follows with lag
  const outerX = useSpring(rawX, SPRING_CONFIG);
  const outerY = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    const touch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touch);
    if (touch) return;

    document.body.classList.add('has-custom-cursor');

    const onMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onHoverStart = (e) => {
      const target = e.target;
      if (
        target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]')
      ) {
        setIsHovering(true);
      }
    };

    const onHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouchDevice) return null;

  const outerCurrentSize = isHovering ? OUTER_SIZE * 1.75 : OUTER_SIZE;

  return (
    <>
      <style>{`
        body.has-custom-cursor * {
          cursor: none !important;
        }
        .cursor-outer {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          border-radius: 50%;
          border: 2px solid var(--accent-primary, #6c63ff);
          mix-blend-mode: difference;
          z-index: 99998;
          will-change: transform, width, height, opacity;
          transition: width 0.2s ease, height 0.2s ease, border-color 0.2s ease, opacity 0.3s ease;
        }
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          border-radius: 50%;
          background: var(--accent-primary, #6c63ff);
          z-index: 99999;
          will-change: transform, opacity;
          transition: opacity 0.3s ease;
        }
      `}</style>

      {/* Outer ring */}
      <motion.div
        className="cursor-outer"
        style={{
          x: outerX,
          y: outerY,
          width: outerCurrentSize,
          height: outerCurrentSize,
          translateX: `-${outerCurrentSize / 2}px`,
          translateY: `-${outerCurrentSize / 2}px`,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering
            ? 'var(--accent-secondary, #ff6584)'
            : 'var(--accent-primary, #6c63ff)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          translateX: `-${DOT_SIZE / 2}px`,
          translateY: `-${DOT_SIZE / 2}px`,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ scale: { duration: 0.15 } }}
      />
    </>
  );
};

export default CustomCursor;
