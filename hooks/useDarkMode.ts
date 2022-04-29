import { useState } from 'react';

type THEME = 'light' | 'dark';

const useDarkMode = (): [THEME, () => void] => {
  const [theme, setTheme] = useState<THEME>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
};

export { useDarkMode, THEME };
