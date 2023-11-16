export const msalConfig = {
  auth: {
    clientId: "d6a91baa-2f67-4a3d-91c9-0901ab45396e",
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: "https://localhost:3000/login/m-login.html",
  },
  cache: {
    cacheLocation: "localStorage", // needed to avoid "login required" error
    storeAuthStateInCookie: true, // recommended to avoid certain IE/Edge issues
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
