import { createAuthProvider } from "react-token-auth";
import { URL_BASE } from "../config/constants";

type Session = { accessToken: string; refreshToken: string };

export const { useAuth, authFetch, login, logout } = createAuthProvider<Session>({
  getAccessToken: (session) => session.accessToken,
  storage: localStorage,
  storageKey: "grc_aus",
  onUpdateToken: (token) =>
    fetch(`${URL_BASE}/login/refreshToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grantType: token.refreshToken,
      }),
    })
      .then((r) => r.json())
      .then((r) => ({ accessToken: r.token, refreshToken: r.refreshToken })),
});
