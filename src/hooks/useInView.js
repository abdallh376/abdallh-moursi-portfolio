// ============================================
// HOOK — useInView
// Triggers when element enters viewport
// ============================================

import { useState, useEffect, useRef } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once !== false) observer.unobserve(el);
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [options.threshold]);

  return { ref, inView };
}

// Backwards-compatible tuple API used by About and Education.
export default function useInViewTuple(options = {}) {
  const result = useInView(options);
  return [result.ref, result.inView];
}
