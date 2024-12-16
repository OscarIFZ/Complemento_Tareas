export interface TcTareaCortaModel {
  empresaId: string;
  gerenciaId: number;
  areaId: number;
  ejecutorId: string;
  visadorId: string;
  evidencia: boolean;
  tcPrioridadId: number;
  perfilEnvioCorreoId: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  expira: boolean;
  visacion: boolean;
}
