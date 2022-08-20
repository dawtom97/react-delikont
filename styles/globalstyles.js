import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

button,input, input::placeholder, textarea, textarea::placeholder {
  font-family: 'Roboto', sans-serif;
  transition: 0.4s;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`;
