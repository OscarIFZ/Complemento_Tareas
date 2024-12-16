import { URL_BASE } from "../../config/constants";
import { Usuario } from "../../models/Usuario";
import { ApiResponse } from "../../components/types/types";
import Base from "../base";

export class UsuarioApi {
  /**
   * Inicia sesión por medio de usuario y contraseña
   * @param email Email de usuario
   * @param password Password de usuario
   * @return {Promise<ApiResponse<Usuario>>}
   */
  async login(email: string, password: string): Promise<ApiResponse<Usuario>> {
    try {
      const url: string = `${URL_BASE}/login/login`;

      const [res, error] = await Base.post(url, {
        email: email,
        password: password,
      });
      if (res === null && error !== null) return [null, error];
      if (res !== null) {
        const p: Usuario = {
          id: res.id,
          nombreCompleto: res.nombreCompleto,
          token: res.token,
          refreshToken: res.refreshToken,
          email: res.email,
          username: res.userName,
          imagen: res.image,
        };
        return [p, null];
      }

      return [null, new Error("Error desconocido")];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Inicia sesión por medio del proveedor Microsoft
   * @param accessToken Access token entregado por Microsoft
   * @param idToken Id token entregado por microsoft
   * @return {Promise<ApiResponse<Usuario>>}
   */
  async loginUsuarioConMicrosoft(accessToken: string, idToken: string): Promise<ApiResponse<Usuario>> {
    try {
      const url: string = `${URL_BASE}/login/login/microsoft`;

      const [res, error] = await Base.post(url, {
        idToken: idToken,
        accessToken: accessToken,
      });
      if (res === null && error !== null) return [null, error];
      if (res !== null) {
        const p: Usuario = {
          id: res.id,
          nombreCompleto: res.nombreCompleto,
          token: res.token,
          refreshToken: res.refreshToken,
          email: res.email,
          username: res.userName,
          imagen: res.image,
        };
        return [p, null];
      }

      return [null, new Error("Error desconocido")];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Inicia sesión por medio del proveedor Microsoft
   * @param accessToken Access token entregado por Microsoft
   * @return {Promise<ApiResponse<Usuario>>}
   */
  async loginUsuarioConMicrosoftSimple(accessToken: string): Promise<ApiResponse<Usuario>> {
    try {
      const url: string = `${URL_BASE}/login/login/bot/azuread`;

      const [res, error] = await Base.post(url, {
        token: accessToken,
      });
      if (res === null && error !== null) return [null, error];
      if (res !== null) {
        const p: Usuario = {
          id: res.id,
          nombreCompleto: res.nombreCompleto,
          token: res.token,
          refreshToken: res.refreshToken,
          email: res.email,
          username: res.userName,
          imagen: res.image,
        };
        return [p, null];
      }

      return [null, new Error("Error desconocido")];
    } catch (e) {
      return [null, e];
    }
  }

  /**
   * Inicia sesión por medio del proveedor Google
   * @param idToken Id token entregado por Google
   * @return {Promise<ApiResponse<Usuario>>}
   */
  async loginUsuarioConGoogle(idToken: string): Promise<ApiResponse<Usuario>> {
    try {
      const url: string = `${URL_BASE}/login/login/google`;

      const [res, error] = await Base.post(url, {
        idToken: idToken,
      });
      if (res === null && error !== null) return [null, error];
      if (res !== null) {
        const p: Usuario = {
          id: res.id,
          nombreCompleto: res.nombreCompleto,
          token: res.token,
          refreshToken: res.refreshToken,
          email: res.email,
          username: res.userName,
          imagen: res.image,
        };
        return [p, null];
      }

      return [null, new Error("Error desconocido")];
    } catch (e) {
      return [null, e];
    }
  }
}
