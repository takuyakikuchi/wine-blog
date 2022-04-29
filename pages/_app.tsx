import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GoogleAnalytics, useGAPageview } from '../libs/gtag';
import { GlobalStyle } from '../styles/global';
import { breakingPoints, darkTheme, lightTheme } from '../styles/themes';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import TopeBar from '@/components/ui/TopBar';
import { useDarkMode } from '@/hooks/useDarkMode';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, toggleTheme] = useDarkMode();
  const colorTheme = theme === 'dark' ? darkTheme : lightTheme;

  useGAPageview();

  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider theme={{ breakingPoints, colorTheme }}>
        <GlobalStyle />
        <TopeBar>
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
        </TopeBar>
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}

export default MyApp;
