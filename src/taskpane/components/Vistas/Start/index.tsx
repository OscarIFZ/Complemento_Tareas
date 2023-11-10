import * as React from "react";

import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

export interface StartProps {
  onClickIniciar: () => void;
  onClickCrear: () => void;
}

const Start: React.FunctionComponent<StartProps> = (props: StartProps) => {
  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Grid container style={{ marginTop: 20 }}>
          <Paper
            elevation={0}
            style={{ boxShadow: "rgb(209 209 209 / 25%) 0px 1px 4px, rgb(209 209 209 / 35%) 0px 3px 12px 2px" }}
          >
            <Grid container style={{ padding: 20 }} spacing={2}>
              <Grid item xs={12} md={12} container justifyContent="center">
                <Typography component="h1" variant="h5">
                  Enviar como evidencia
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} container justifyContent="center">
                <Avatar style={{ margin: 5, backgroundColor: "#4fc2f7", width: 100, height: 100 }}>
                  <CloudUploadOutlined style={{ fontSize: 50 }} />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography component="p" variant="body2" textAlign="center">
                  Adjunta el e-mail actual como evidencia (PDF) para completar alguna actividad que tengas asociada a tu
                  cuenta en AustranetGRC.
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} container justifyContent="center">
                <Button variant="contained" disableElevation style={{ width: "200px" }} onClick={props.onClickIniciar}>
                  Iniciar sesión
                </Button>
              </Grid>
              <Grid item xs={12} md={12} container justifyContent="center">
                <Button
                  variant="contained"
                  color="inherit"
                  disableElevation
                  style={{ width: "200px" }}
                  onClick={props.onClickCrear}
                >
                  Crear una cuenta
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </Container>
  );
};

export default Start;
