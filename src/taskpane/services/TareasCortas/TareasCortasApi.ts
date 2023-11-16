import { URL_BASE } from "../../config/constants";
import { TcTareaCortaModel } from "../../models/TareaCorta";
import { ApiResponse } from "../../components/types/types";
import Base from "../base";

/**
 * GET method - Obtiene una lista con todas las empresa
 * @return {Promise} Promesa de obtención
 */
export const obtenerEmpresas = () => {
  return new Promise((resolve, eject) => {
    Base.get("/Empresa")
      .then((response) => {
        resolve([response, undefined, response.status]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};

/**
 * GET method - Obtiene una lista con todas las gerencias por id de empresa
 * @param {string} empresaId ID de la empresa
 * @return {Promise} Promesa de obtención
 */
export const obtenerGerenciasPorEmpresa = (empresaId) => {
  return new Promise((resolve, eject) => {
    Base.get("/Gerencia/Empresa/" + empresaId)
      .then((response) => {
        resolve([response, undefined, response.status]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};

/**
 * GET method - Obtiene una lista con todas las áreas de empresas
 * @return {Promise} Promesa de obtención
 */
export const obtenerAreaEmpresas = () => {
  return new Promise((resolve, eject) => {
    Base.get("/AreaEmpresa")
      .then((response) => {
        resolve([response, undefined, response.status]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};

/**
 * GET method - Obtiene una lista con todos usuarios
 * @param {string} filtro Filtro que permite obtener usuarios activos, inactivos o ambos
 * @return {Promise} Promesa de obtención
 */
export const obtenerUsuarios = (Filtro = "") => {
  return new Promise((resolve, eject) => {
    Base.get(`/usuario/todos?Filtro=${Filtro}`)
      .then((response) => {
        resolve([response, undefined, response.status]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};

/**
 * GET method - Obtiene una lista con todos los perfiles de envío de correos
 * @return {Promise} Promesa de obtención
 */
export const obtenerPerfilesEnvioCorreos = () => {
  return new Promise((resolve, eject) => {
    Base.get("/PerfilEnvioCorreo")
      .then((response) => {
        resolve([response, undefined, response.status]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};

/**
 * GET method - Obtiene una lista con todas las prioridades
 * @return {Promise} Promesa de obtención
 */
export const obtenerTcPrioridades = () => {
  return new Promise((resolve, eject) => {
    Base.get("/TcPrioridad")
      .then((response) => {
        resolve([response, undefined, response.status]);
      })
      .catch((error) => {
        const err = getResponseError(error);
        resolve([undefined, err, error.response?.status]);
      });
  });
};
