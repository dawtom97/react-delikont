import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../src/context/UserContext";
import "../styles/globalstyles.js";
import { theme } from "../styles/theme";
import {GlobalStyles} from '../styles/globalstyles'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <GlobalStyles/>
        <Component {...pageProps} />
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
