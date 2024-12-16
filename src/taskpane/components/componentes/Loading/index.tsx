import * as React from "react";

import { CircularProgress, Grid } from "@mui/material";

import { ILoadingProps } from "./ILoadingProps";

export const Loading: React.FunctionComponent<ILoadingProps> = (props: ILoadingProps) => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      <Grid item xs={12} md={12} container justifyContent="center">
        <Grid item xs={12} md={12} container justifyContent="center">
          <CircularProgress />
        </Grid>
        {props.message !== undefined && (
          <Grid item xs={12} md={12} container justifyContent="center">
            {props.message}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
