/* eslint-disable no-undef */
import * as React from "react";
import { logout, useAuth } from "../providers/authProvider";
import { Header } from "./componentes/Header";
import Progress from "./Progress";
import Login from "./Vistas/Login";
import Start from "./Vistas/Start";
import CreateTareaCorta from "./Vistas/CreateTareaCorta";
import GenerarPdf from "./Vistas/GenerarPdf";
/* global require */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {}

const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const [logged] = useAuth();
  const [titulo, setTitulo] = React.useState<string>("Crear Tarea Corta");
  const [isLogin, setIsLogin] = React.useState<boolean>(false);
  const [evidencia, setEvidencia] = React.useState<File>(undefined);
  const [visualizar, setVisualizar] = React.useState<boolean>(true);
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
          {!evidencia && visualizar && (
            <GenerarPdf
              onPdfGenerado={(f) => {
                setEvidencia(f), setVisualizar(false);
              }}
            />
          )}

          {evidencia && !visualizar && (
            <>
              <Header
                title={titulo}
                onBack={undefined}
                onLogout={() => {
                  logout();
                }}
              />
              <CreateTareaCorta evidencia={evidencia} />
            </>
          )}
        </>
      )}
    </>
  );
};
export default App;
