import { Moon, Sun } from 'react-feather';
import styled from 'styled-components';
import { THEME } from '@/hooks/useDarkMode';

type Props = {
  theme: THEME;
  toggleTheme: () => void;
};

export function DarkModeToggle({ theme, toggleTheme }: Props) {
  const isDarkMode = theme === 'dark';
  return isDarkMode ? (
    <StyledIcon>
      <Sun onClick={toggleTheme} />
    </StyledIcon>
  ) : (
    <StyledIcon>
      <Moon onClick={toggleTheme} />
    </StyledIcon>
  );
}

const StyledIcon = styled.div`
  svg {
    display: block;
  }

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colorTheme.primaryColor};
  }
`;
