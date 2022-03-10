import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { GoogleAnalytics, useGAPageview } from '../libs/gtag';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: 'M PLUS 1p', 'Noto Sans JP', sans-serif;
    line-height: 1.5;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1, h2,  h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  #__next {
    height: 100%;
  }
`;

const theme = {
  colors: {
    primary: 'hsl(283deg 34% 28%)',
    lightGray: 'hsl(0deg 0% 92%)',
  },
  breakingPoints: {
    tabletAndUp: `(min-width: ${550 / 16}rem)`,
    laptopAndUp: `(min-width: ${1100 / 16}rem)`,
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
