import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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

  #__next {
    height: 100%;
  }
`;
