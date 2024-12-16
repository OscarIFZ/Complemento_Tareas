import * as React from "react";

import { Grid } from "@mui/material";
import { CheckCircleTwoTone } from "@mui/icons-material";

import { IMsgSuccessProps } from "./IMsgSuccessProps";

export const MsgSuccess: React.FunctionComponent<IMsgSuccessProps> = (props: IMsgSuccessProps) => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={12} md={12} container justifyContent="center">
        <Grid item xs={12} md={12} container justifyContent="center">
          <CheckCircleTwoTone style={{ color: "green", fontSize: 40 }} />
        </Grid>
        <Grid item xs={12} md={12} container justifyContent="center">
          {props.message}
        </Grid>
      </Grid>
    </Grid>
  );
};
