import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ theme: any }>`
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
    display: flex;
    flex-direction: column;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  :root {
    --bkg-color: ${(props) => props.theme.colorTheme.backgroundColor};
    --text-color: ${(props) => props.theme.colorTheme.textColor};
  }

  body {
    background-color: var(--bkg-color);
    color: var(--text-color);
  }
`;
