/* eslint-disable no-undef */
import * as React from "react";
import { logout, useAuth } from "../providers/authProvider";
import { Header } from "./componentes/Header";
import Progress from "./Progress";
import Login from "./Vistas/Login";
import Start from "./Vistas/Start";
import CreateSeguimiento from "..";
/* global require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const [logged] = useAuth();
  const [titulo, setTitulo] = React.useState<string>("Crear Seguimiento");
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [showCreateSeguimiento, setShowCreateSeguimiento] = React.useState<boolean>(true);
  const handleCloseCreateSeguimiento = () => {
    setTitulo("Crear Seguimiento");
    setShowCreateSeguimiento(false);
    // Cierra la vista CreateSeguimiento
  };

  if (!props.isOfficeInitialized) {
    return (
      <Progress
        title={props.title}
        logo={require("./../../../assets/logo-filled.png")}
        message="Please sideload your addin to see app body."
      />
    );
  }

  return (
    <>
      {!logged && !isLogin && (
        <>
          <Start
            onClickIniciar={() => setIsLogin(true)}
            onClickCrear={() => {
              Office.context.ui.openBrowserWindow("https://www.austranet.com/index.php/austranetgrc/");
            }}
          />
        </>
      )}
      {!logged && isLogin && (
        <>
          <Login />
        </>
      )}

      {logged && (
        <>
          <Header
            title={titulo}
            onBack={undefined}
            onLogout={() => {
              logout();
            }}
            /*onTask={() => {
              setShowCreateSeguimiento(true);
            }}*/
          />
          {showCreateSeguimiento === true && <CreateSeguimiento onClose={handleCloseCreateSeguimiento} />}
        </>
      )}
    </>
  );
};
export default App;
