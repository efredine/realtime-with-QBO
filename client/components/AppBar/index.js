import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import AuthButton from "../AuthButton";

const StyledAppBar = styled(AppBar)`
  flex-grow: 1;
  .name {
    flex-grow: 1;
  }
  button {
    margin-left: 2rem;
  }
`;

export default function AppBarContainer() {
  return (
    <StyledAppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" color="inherit" className="name">
          Real Time with QuickBooksOnline
        </Typography>
        <AuthButton />
      </Toolbar>
    </StyledAppBar>
  );
}
