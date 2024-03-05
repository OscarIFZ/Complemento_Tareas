import { PublicClientApplication } from "@azure/msal-browser";

(() => {
  // The initialize function must be run each time a new page is loaded
  Office.onReady(() => {
    const msalInstance = new PublicClientApplication({
      auth: {
        clientId: "03140028-3e83-4bbd-bd6d-7aab0ee2050f",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: `${window.location.origin}/login/m-login.html`, // Must be registered as "spa" type
      },
      cache: {
        cacheLocation: "localStorage", // needed to avoid "login required" error
        storeAuthStateInCookie: true, // recommended to avoid certain IE/Edge issues
      },
    });

    // handleRedirectPromise should be invoked on every page load
    msalInstance
      .handleRedirectPromise()
      .then((response) => {
        // If response is non-null, it means page is returning from AAD with a successful response
        if (response) {
          Office.context.ui.messageParent(
            JSON.stringify({
              status: "success",
              result: {
                accessToken: response.accessToken,
                idToken: response.idToken,
              },
            })
          );
        } else {
          // Otherwise, invoke login
          msalInstance.loginRedirect({
            scopes: ["user.read"],
          });
        }
      })
      .catch((error) => {
        const errorData: string = `errorMessage: ${error.errorCode}
                                   message: ${error.errorMessage}
                                   errorCode: ${error.stack}`;
        Office.context.ui.messageParent(JSON.stringify({ status: "failure", result: errorData }));
      });
  });
})();
