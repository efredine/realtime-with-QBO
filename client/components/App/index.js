import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import styled from "styled-components";

import App from "./App";

const theme = {
  maxWidth: "1000px"
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    font-size: 1.5rem;
    font-family: 'Roboto';
  }
`;

const StyledPage = styled.div``;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export default function AppContainer() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <StyledPage>
            <Inner>
              <App />
            </Inner>
          </StyledPage>
        </>
      </ThemeProvider>
    </>
  );
}
