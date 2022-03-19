import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GoogleAnalytics, useGAPageview } from '../libs/gtag';
import { GlobalStyle } from '../styles/global';
import { colors, breakingPoints } from '../styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
  useGAPageview();

  return (
    <>
      <GoogleAnalytics />

      <GlobalStyle />
      <ThemeProvider theme={{ colors, breakingPoints }}>
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}

export default MyApp;
