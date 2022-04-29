import { Moon, Sun } from 'react-feather';
import { THEME } from '@/hooks/useDarkMode';

type Props = {
  theme: THEME;
  toggleTheme: () => void;
};

export function DarkModeToggle({ theme, toggleTheme }: Props) {
  const isDarkMode = theme === 'dark';
  return isDarkMode ? <Sun onClick={toggleTheme} /> : <Moon onClick={toggleTheme} />;
}
