import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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
  media: {
    tablet: '600px',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />;
      </ThemeProvider>
    </>
  );
}

export default MyApp;
