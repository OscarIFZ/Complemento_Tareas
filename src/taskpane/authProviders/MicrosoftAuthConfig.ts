export const msalConfig = {
  auth: {
    clientId: "03140028-3e83-4bbd-bd6d-7aab0ee2050f",
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
