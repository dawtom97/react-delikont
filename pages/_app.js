import {ApolloProvider} from '@apollo/client'
import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../src/context/UserContext";
import "../styles/globalstyles.js";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/globalstyles";
import { ModalContextProvider } from "../src/context/ModalContext";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
      <ModalContextProvider>
        <UserContextProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </UserContextProvider>
      </ModalContextProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
