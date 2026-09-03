import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // main.tsx already resolved the theme and stored it before the app rendered
    return document.documentElement.classList.contains('dark-mode');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme };
};
