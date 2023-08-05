import { ThemeProvider } from "styled-components";
import { UserContextProvider } from "../src/context/UserContext";
import "../styles/globalstyles.js";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/globalstyles";
import { ModalContextProvider } from "../src/context/ModalContext";
import { OrderContextProvider } from "../src/context/OrderContext";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react';

const chakraTheme = extendTheme({
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
});

function MyApp({ Component, pageProps }) {

  return (
    // <ChakraProvider theme={chakraTheme}>
    <ThemeProvider theme={theme}>
      <OrderContextProvider>
        <ModalContextProvider>
          <UserContextProvider>
            
            <GlobalStyles />
         
            <Component {...pageProps} />
          
          </UserContextProvider>
        </ModalContextProvider>
      </OrderContextProvider>
    </ThemeProvider>
    // </ChakraProvider>
  );
}

export default MyApp;
