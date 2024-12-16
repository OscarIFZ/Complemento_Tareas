import * as React from "react";

import { Grid } from "@mui/material";
import { ErrorTwoTone } from "@mui/icons-material";

import { IMsgErrorProps } from "./IMsgErrorProps";

export const MsgError: React.FunctionComponent<IMsgErrorProps> = (props: IMsgErrorProps) => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={12} md={12} container justifyContent="center">
        <Grid item xs={12} md={12} container justifyContent="center">
          <ErrorTwoTone style={{ color: "red", fontSize: 40 }} />
        </Grid>
        <Grid item xs={12} md={12} container justifyContent="center">
          {props.message}
        </Grid>
      </Grid>
    </Grid>
  );
};
