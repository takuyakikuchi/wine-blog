import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import TopBar from '@/components/TopBar';
import Footer from '@/components/home/Footer';
import { useDarkMode } from '@/hooks/useDarkMode';
import { GoogleAnalytics, useGAPageview } from '@/libs/gtag';
import { GlobalStyle } from '@/styles/global';
import { breakingPoints, darkTheme, lightTheme } from '@/styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, toggleTheme] = useDarkMode();
  const colorTheme = theme === 'dark' ? darkTheme : lightTheme;

  useGAPageview();

  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider theme={{ breakingPoints, colorTheme }}>
        <GlobalStyle />
        <TopBar>
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
        </TopBar>
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
