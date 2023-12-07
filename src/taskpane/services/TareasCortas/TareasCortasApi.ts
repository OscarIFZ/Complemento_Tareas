import { URL_BASE } from "../../config/constants";
import Base from "../base";
import { ApiResponse } from "../../components/types/types";
import { Empresa } from "../../models/Empresa";
import { Gerencia } from "../../models/Gerencia";
import { AreaEmpresa } from "../../models/AreaEmpresa";
import { Usuario } from "../../models/Usuario";
import { PerfilEnvioCorreo } from "../../models/PerfilEnvioCorreo";
import { TcPrioridad } from "../../models/TcPrioridad";
export default function getResponseError(error: any): string {
  if (!error?.response?.data?.errors) return "Error desconocido";

  return "Error desconocido";
}
export const obtenerEmpresas = async (): Promise<ApiResponse<Empresa[]>> => {
  try {
    const url: string = `${URL_BASE}/Empresa`;
    const [res, error] = await Base.get(url, "true");
    if (res === null && error !== null) {
      return [null, error];
    }
    if (res !== null) {
      const p: Empresa[] = res.map((r: any) => ({
        id: r.id,
        nombre: r.nombre,
      }));
      return [p, null];
    }
    return [null, new Error("Error desconocido")];
  } catch (e) {
    return [null, e];
  }
};

export const obtenerGerenciasPorEmpresa = async (filtro = ""): Promise<ApiResponse<Gerencia[]>> => {
  try {
    const url: string = `${URL_BASE}/Gerencia?empresaID=${filtro}`;
    const [res, error] = await Base.get(url, "true");
    if (res === null && error !== null) {
      return [null, error];
    }
    if (res !== null) {
      const p: Gerencia[] = res.map((r: any) => ({
        id: r.id,
        nombre: r.nombre,
        empresaId: r.empresaId,
      }));
      return [p, null];
    }
    return [null, new Error("Error desconocido")];
  } catch (e) {
    return [null, e];
  }
};

export const obtenerAreaEmpresas = async (): Promise<ApiResponse<AreaEmpresa[]>> => {
  try {
    const url: string = `${URL_BASE}/AreaEmpresa`;
    const [res, error] = await Base.get(url, "true");
    if (res === null && error !== null) {
      return [null, error];
    }
    if (res !== null) {
      const p: AreaEmpresa[] = res.map((r: any) => ({
        id: r.id,
        nombre: r.nombre,
      }));
      return [p, null];
    }
    return [null, new Error("Error desconocido")];
  } catch (e) {
    return [null, e];
  }
};

export const obtenerUsuarios = async (filtro = ""): Promise<ApiResponse<Usuario[]>> => {
  try {
    const url: string = `${URL_BASE}/usuario/todos?Filtro=${filtro}`;
    const [res, error] = await Base.get(url, "true");
    if (res === null && error !== null) {
      return [null, error];
    }
    if (res !== null) {
      const p: Usuario[] = res.map((r: any) => ({
        id: r.id,
        nombreCompleto: r.nombreCompleto,
        token: r.token,
        refreshToken: r.refreshToken,
        email: r.email,
        username: r.username,
        imagen: r.imagen,
      }));
      return [p, null];
    }
    return [null, new Error("Error desconocido")];
  } catch (e) {
    return [null, e];
  }
};

export const obtenerPerfilesEnvioCorreos = async (): Promise<ApiResponse<PerfilEnvioCorreo[]>> => {
  try {
    const url: string = `${URL_BASE}/PerfilEnvioCorreo`;
    const [res, error] = await Base.get(url, "true");
    if (res === null && error !== null) {
      return [null, error];
    }
    if (res !== null) {
      const p: PerfilEnvioCorreo[] = res.map((r: any) => ({
        id: r.id,
        nombre: r.nombre,
      }));
      return [p, null];
    }
    return [null, new Error("Error desconocido")];
  } catch (e) {
    return [null, e];
  }
};

export const obtenerTcPrioridades = async (): Promise<ApiResponse<TcPrioridad[]>> => {
  try {
    const url: string = `${URL_BASE}/TcPrioridad`;
    const [res, error] = await Base.get(url, "true");
    if (res === null && error !== null) {
      return [null, error];
    }
    if (res !== null) {
      const p: TcPrioridad[] = res.map((r: any) => ({
        id: r.id,
        nombre: r.nombre,
        color: r.colorHex,
      }));
      return [p, null];
    }
    return [null, new Error("Error desconocido")];
  } catch (e) {
    return [null, e];
  }
};
/**
 * POST method - Crear una nueva tarea corta
 * @param {TcTareaCortaModel} tareaCorta tarea corta
 * @return {Promise} Promesa de creación
 */
export const crearTareaCorta = (tareaCorta, archivo) => {
  return new Promise((resolve) => {
    const url = `${URL_BASE}/TcTareaCorta`;
    const formData = new FormData();
    var jsonData = JSON.stringify(tareaCorta);
    formData.append("file", archivo);
    formData.append("jsonData", jsonData);
    const isMultipart = true;

    Base.post(url, formData, "true", isMultipart)
      .then((response) => {
        resolve([response, undefined, undefined]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};
