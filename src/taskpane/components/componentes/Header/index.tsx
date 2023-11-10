import * as React from "react";

import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { ArrowBack, ExitToApp } from "@mui/icons-material";

import { IHeaderProps } from "./IHeaderProps";

export const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <AppBar position="sticky" variant="outlined" style={{ background: "white", color: "black" }}>
      <Toolbar>
        <Tooltip title="Volver atrás">
          <span>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              disabled={props.onBack === undefined}
              onClick={props.onBack}
            >
              <ArrowBack />
            </IconButton>
          </span>
        </Tooltip>
        <Typography variant="subtitle1" style={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Tooltip title="Cerrar sesión">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.onLogout}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
