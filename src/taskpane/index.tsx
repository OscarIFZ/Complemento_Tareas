import App from "./components/App";
import { createRoot } from "react-dom/client";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { ThemeProvider } from "@fluentui/react";
import * as React from "react";
import { Toaster } from "react-hot-toast";

/* global document, Office, module, require */

initializeIcons();

let isOfficeInitialized = true;

const title = "AustranetGRC Seguimiento";

const render = (Component) => {
  const root = createRoot(document.getElementById("container"));
  root.render(
    <ThemeProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          success: {
            style: {
              background: "#22bb33",
              color: "#ffffff",
            },
          },
          error: {
            style: {
              background: "#bb2124",
              color: "#ffffff",
            },
          },
        }}
      />
      <Component title={title} isOfficeInitialized={isOfficeInitialized} />
    </ThemeProvider>
  );
};

/* Render application after Office initializes */
Office.onReady(() => {
  isOfficeInitialized = true;
  if (navigator.userAgent.indexOf("Trident") !== -1 || navigator.userAgent.indexOf("Edge") !== -1) {
    document.getElementById("container").innerHTML =
      "<p>AustranetGRC Seguimiento no es compatible con la versión actual de Outlook.</p>";
  } else {
    render(App);
  }
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
