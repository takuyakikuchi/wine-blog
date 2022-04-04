import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GoogleAnalytics, useGAPageview } from '../libs/gtag';
import { GlobalStyle } from '../styles/global';
import { colors, breakingPoints, darkTheme, lightTheme } from '../styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = 'dark'; // TODO: temporary
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  useGAPageview();

  return (
    <>
      <GoogleAnalytics />
      <ThemeProvider theme={{ colors, breakingPoints, currentTheme }}>
        <GlobalStyle />
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}

export default MyApp;
