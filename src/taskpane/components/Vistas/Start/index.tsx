import * as React from "react";

import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

export interface StartProps {
  onClickIniciar: () => void;
  onClickCrear: () => void;
}

const Start: React.FunctionComponent<StartProps> = (props: StartProps) => {
  return (
    <div style={{ marginTop: "20px", height: "100vh", display: "flex", flexDirection: "column" }}>
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
                    Crear Seguimiento
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} container justifyContent="center">
                  <Avatar style={{ margin: 5, backgroundColor: "#4fc2f7", width: 100, height: 100 }}>
                    <AddTaskIcon style={{ fontSize: 50 }} />
                  </Avatar>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography component="p" variant="body2" textAlign="center">
                    Crea una nueva tarea corta para un proyecto que estes trabajando y asignale un responsable y su fecha de completado.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} container justifyContent="center">
                  <Button
                    variant="contained"
                    disableElevation
                    style={{ width: "200px" }}
                    onClick={props.onClickIniciar}
                  >
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
    </div>
  );
};

export default Start;
