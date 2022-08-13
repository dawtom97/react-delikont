import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../src/context/UserContext";
import "../styles/globals.css";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
