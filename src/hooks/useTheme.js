// ============================================
// HOOK — useTheme
// Manages light/dark theme with localStorage
// and system preference detection
// ============================================

import { useState, useEffect } from 'react';

export function useTheme() {
  const getInitialTheme = () => {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(() => {
    // Safe SSR guard
    if (typeof window === 'undefined') return 'dark';
    return getInitialTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
