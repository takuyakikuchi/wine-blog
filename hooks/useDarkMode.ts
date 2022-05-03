import { useState, useEffect } from 'react';

export type THEME = 'light' | 'dark';

export const useDarkMode = (): [THEME, () => void] => {
  const [theme, setTheme] = useState<THEME>('light');

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme') as THEME | null;
    if (localStorageTheme && localStorageTheme !== theme) {
      setTheme(localStorageTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return [theme, toggleTheme];
};
