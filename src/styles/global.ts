import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Gotham' !important;
    font-weight: 300;
  }

  body {
    background: #f7f7f7;
    max-width: 600px;
    max-height: 100vh;
  }

  .MuiInputBase-root {
    font-weight: 300 !important;
  }

  .MuiFormLabel-root {
    font-weight: 300 !important;
  }
`;

export default GlobalStyle;
