
import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../src/context/UserContext";
import "../styles/globalstyles.js";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/globalstyles";
import { ModalContextProvider } from "../src/context/ModalContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
    
      <ModalContextProvider>
        <UserContextProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </UserContextProvider>
      </ModalContextProvider>
 
    </ThemeProvider>
  );
}

export default MyApp;
