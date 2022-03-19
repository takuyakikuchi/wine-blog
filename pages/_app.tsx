import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { GoogleAnalytics, useGAPageview } from '../libs/gtag';
import { GlobalStyle } from '../styles/global';

const theme = {
  colors: {
    primary: 'hsl(283deg 34% 28%)',
    lightGray: 'hsl(0deg 0% 92%)',
  },
  breakingPoints: {
    tabletAndUp: `(min-width: ${550 / 16}rem)`,
    laptopAndUp: `(min-width: ${1100 / 16}rem)`,
    desktopAndUp: `(min-width: ${1500 / 16}rem)`,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  useGAPageview();

  return (
    <>
      <GoogleAnalytics />

      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}

export default MyApp;
