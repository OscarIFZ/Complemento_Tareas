import * as React from "react";

import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import { login } from "../../../providers/authProvider";
import { UsuarioApi } from "../../../services";
import { displayDialogAsync } from "../../utils/displayDialogAsync";
import msLogo from "./icons/ms.png";
const Login: React.FunctionComponent<{}> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [usuario, setUsuario] = React.useState({
    Email: "",
    Password: "",
  });

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const showLoginDialog = React.useCallback(() => {
    const display = () =>
      new Promise<string>((resolve) => {
        displayDialogAsync(
          `${window.location.origin}/login/m-login.html`,
          {
            displayInIframe: false,
            height: 40,
            width: 30,
          },
          resolve
        );
      });
    const displayAsync = async () => {
      var dialogRes = await display();
      var tknData: { status: string; result: { accessToken: string; idToken: string } } = JSON.parse(dialogRes);
      console.log(tknData);
      if (tknData && tknData.status === "success") {
        const usuarioApi = new UsuarioApi();
        const [res, err] = await usuarioApi.loginUsuarioConMicrosoft(
          tknData.result.accessToken,
          tknData.result.idToken
        );
        if (!err) {
          login({
            accessToken: res.token,
            refreshToken: res.refreshToken,
          });
        } else {
          toast.error("Las credenciales del usuario son incorrectas");
        }
      } else {
        toast.error("Error al iniciar sesión con Microsoft");
      }
    };
    return displayAsync();
  }, []);

  const loginUsuarioBoton = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const usuarioApi = new UsuarioApi();
    usuarioApi.login(usuario.Email, usuario.Password).then(([response, error]) => {
      setIsLoading(false);
      if (!error) {
        login({
          accessToken: response.token,
          refreshToken: response.refreshToken,
        });
      } else {
        toast.error("Las credenciales del usuario son incorrectas.");
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Grid container style={{ marginTop: 20 }}>
          <Paper
            elevation={0}
            style={{ boxShadow: "rgb(209 209 209 / 25%) 0px 1px 4px, rgb(209 209 209 / 35%) 0px 3px 12px 2px" }}
          >
            <Grid container style={{ padding: 20 }}>
              <Grid item xs={12} md={12} container justifyContent="center">
                <Avatar style={{ margin: 5, backgroundColor: "#4fc2f7", width: 100, height: 100 }}>
                  <LockOutlined style={{ fontSize: 40 }} />
                </Avatar>
              </Grid>
              <Grid item xs={12} md={12} container justifyContent="center">
                <Typography component="h1" variant="h5">
                  Inicio de sesión
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <form style={{ width: "100%", marginTop: 10, marginBottom: 20 }}>
                  <TextField
                    name="Email"
                    value={usuario.Email}
                    onChange={ingresarValoresMemoria}
                    variant="outlined"
                    label="Ingrese email"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    name="Password"
                    value={usuario.Password}
                    onChange={ingresarValoresMemoria}
                    variant="outlined"
                    label="Ingrese password"
                    fullWidth
                    margin="normal"
                    type="password"
                    required
                  />
                  <Button
                    type="submit"
                    onClick={loginUsuarioBoton}
                    fullWidth
                    variant="contained"
                    disableElevation
                    color="primary"
                    style={{ marginTop: 15 }}
                    disabled={isLoading}
                  >
                    {isLoading && <CircularProgress size={20} style={{ marginRight: 5 }} />} Iniciar Sesión
                  </Button>

                  <Divider style={{ marginTop: 20, marginBottom: 10 }} />
                </form>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  onClick={showLoginDialog}
                  fullWidth
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<img src={msLogo} alt="Logo" />}
                  style={{ backgroundColor: "#201f1e", color: "white", marginTop: 15 }}
                >
                  Iniciar con microsoft
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
