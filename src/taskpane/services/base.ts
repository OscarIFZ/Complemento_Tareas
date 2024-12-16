import { authFetch } from "../providers/authProvider";

export default class Base {
  private static async getError(res: any): Promise<[boolean, Error] | [boolean, null]> {
    try {
      if (res.ok) return [false, null];

      if (res.status === 401) return [true, new Error("Autenticación faltante")];

      const jsonData = await res.json();
      if (jsonData.status !== undefined) {
        return [true, new Error(jsonData.message)];
      } else {
        return [true, new Error("Error desconocido")];
      }
    } catch (e) {
      console.log(e);
      return [true, new Error("Error desconocido")];
    }
  }

  static async get(url: string, token?: string): Promise<[any, null] | [null, Error]> {
    try {
      const res =
        token === undefined
          ? await fetch(url, {
              method: "GET",
            })
          : await authFetch(url, {
              method: "GET",
            });

      const [hasError, error] = await this.getError(res);
      if (hasError && error !== null) {
        return [null, error];
      }

      const jsonData = await res.json();

      return [jsonData, null];
    } catch (e) {
      console.log(e);
      return [null, new Error("Error al procesar elementos")];
    }
  }

  static async getBlob(url: string, token?: string): Promise<[any, null] | [null, Error]> {
    try {
      const res =
        token === undefined
          ? await fetch(url, {
              method: "GET",
            })
          : await authFetch(url, {
              method: "GET",
            });

      /*const [hasError, error] = await this.getError(res);
            if (hasError && error !== null) {
                return [null, error];
            }*/
      const blobData = await res.blob();

      return [blobData, null];
    } catch (e) {
      console.log(e);
      return [null, new Error("Error al procesar elementos")];
    }
  }

  static async post(
    url: string,
    body: any,
    token?: string,
    isMultipart: boolean = false
  ): Promise<[any, null] | [null, Error]> {
    try {
      const res =
        token === undefined
          ? isMultipart
            ? await fetch(url, {
                method: "POST",
                body: body,
              })
            : await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              })
          : isMultipart
          ? await authFetch(url, {
              method: "POST",
              body: body,
            })
          : await authFetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
      const [hasError, error] = await this.getError(res);
      if (hasError && error !== null) {
        return [null, error];
      }

      const jsonData = await res.json();

      return [jsonData, null];
    } catch (e) {
      console.log(e);
      return [null, new Error("Error en petición")];
    }
  }

  static async put(url: string, body: any, token?: string): Promise<[any, null] | [null, Error]> {
    try {
      const res =
        token === undefined
          ? await fetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            })
          : await authFetch(url, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });
      const [hasError, error] = await this.getError(res);
      if (hasError && error !== null) {
        return [null, error];
      }

      const jsonData = await res.json();

      return [jsonData, null];
    } catch (e) {
      console.log(e);
      return [null, new Error("Error en petición")];
    }
  }

  static async delete(url: string, token?: string): Promise<[any, null] | [null, Error]> {
    try {
      const res =
        token === undefined
          ? await fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
          : await authFetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

      const [hasError, error] = await this.getError(res);
      if (hasError && error !== null) {
        return [null, error];
      }

      const jsonData = await res.json();

      return [jsonData, null];
    } catch (e) {
      console.log(e);
      return [null, new Error("Error en petición")];
    }
  }

  public static async getConfig(): Promise<any> {
    try {
      const res = await fetch("/apiConfig.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return res.json();
    } catch (e) {
      return null;
    }
  }
}
