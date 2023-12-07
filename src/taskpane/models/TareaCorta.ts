export interface TcTareaCortaModel {
  empresaId: string;
  gerenciaId: number;
  areaId: number;
  ejecutorId: string;
  visadorId: string;
  tcPrioridadId: number;
  perfilEnvioCorreoId: number;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  expira: boolean;
  visacion: boolean;
}
