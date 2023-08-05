import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  /* background: #fafafa; */
}

button,input, input::placeholder, textarea, textarea::placeholder, select, option {
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


.alternative-loader {
 display:flex;
 justify-content:center;
 align-items:center;
 z-index:1000;
  width:100%;
  height:100%;
  position: fixed;
   top: 0%; 
   left: 0%;
   background-color:rgba(255,255,255,0.8);
   transition: 0.4s;
}

`;
