import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Alert,
  AlertTitle,
  ListItemIcon,
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import { DatePicker } from "@fluentui/react";
import {
  obtenerEmpresas,
  obtenerAreaEmpresas,
  obtenerGerenciasPorEmpresa,
  obtenerPerfilesEnvioCorreos,
  obtenerTcPrioridades,
  obtenerUsuarios,
  crearTareaCorta,
} from "../../../services/TareasCortas/TareasCortasApi";
import { saveAs } from "file-saver";
import { ICreateTareaCortaProps } from "./ICreateTareaCortaProps";
const CreateTareaCorta: React.FunctionComponent<ICreateTareaCortaProps> = (props: ICreateTareaCortaProps) => {
  const [evidencia, setEvidencia] = React.useState<File>(props.evidencia);
  const [empresas, setEmpresas] = useState([]);
  const [gerencias, setGerencias] = useState([]);
  const [prioridades, setPrioridades] = useState([]);
  const [perfilesEnvioCorreo, setPerfilesEnvioCorreo] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tareaCorta, setTareaCorta] = useState({
    empresaId: "",
    gerenciaId: 1,
    areaId: undefined,
    ejecutorId: "",
    visadorId: undefined,
    tcPrioridadId: 1,
    perfilEnvioCorreoId: 1,
    titulo: "",
    descripcion: "",
    fechaVencimiento: new Date(),
    expira: false,
    visacion: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresasData = await obtenerEmpresas();
        setEmpresas(empresasData);
        const gerenciasData = await obtenerGerenciasPorEmpresa("");
        setGerencias(gerenciasData);
        setPrioridades(await obtenerTcPrioridades());
        setPerfilesEnvioCorreo(await obtenerPerfilesEnvioCorreos());
        await obtenerAreaEmpresas();
        setUsuarios(await obtenerUsuarios());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tareaCorta.empresaId]);
  const _ingresarValoresMemoria = (e: { target: { name?: string; value: unknown } }) => {
    const { name, value } = e.target;
    setTareaCorta((prevTarea) => ({
      ...prevTarea,
      [name as string]: value,
    }));
  };
  const _ingresarValoresGerencia = async (e: { target: { name?: string; value: unknown } }) => {
    const { name, value } = e.target;
    setTareaCorta((prevTarea) => ({
      ...prevTarea,
      [name as string]: value,
    }));
    setGerencias(await obtenerGerenciasPorEmpresa(tareaCorta.empresaId));
  };
  const correo = Office.context.mailbox.item;
  const [alertOpen, setAlertOpen] = useState(false); // Estado para controlar la visibilidad del Alert
  const handleDateChange = (date: Date | null): void => {
    setTareaCorta((prevTarea) => ({
      ...prevTarea,
      fechaVencimiento: date,
    }));
  };
  const [tituloUsuario, setTituloUsuario] = useState(""); // Nuevo estado para el título proporcionado por el usuario

  useEffect(() => {
    // Actualizar el título en el estado de la tarea corta cuando el título del correo cambia
    setTareaCorta((prevTarea) => ({
      ...prevTarea,
      titulo: tituloUsuario || correo.subject, // Usar el título proporcionado por el usuario o el título del correo
    }));
  }, [tituloUsuario, correo.subject]);
  const handleAlertClose = () => {
    // Manejar el cierre del Alert
    setAlertOpen(false);
  };

  const limpiarValores = () => {
    setTareaCorta({
      empresaId: "",
      gerenciaId: 0,
      areaId: "",
      ejecutorId: "",
      visadorId: "",
      tcPrioridadId: 0,
      perfilEnvioCorreoId: 0,
      titulo: "",
      descripcion: "",
      fechaVencimiento: null,
      expira: false,
      visacion: false,
    });
  };
  const _descargarEvidencia = () => {
    if (props.evidencia !== undefined) {
      saveAs(props.evidencia, props.evidencia.name);
    }
  };
  const postearTarea = async () => {
    try {
      console.log(evidencia);
      await crearTareaCorta(tareaCorta, evidencia);
      setAlertOpen(true);
      console.log("Tarea corta creada con éxito");
      limpiarValores();
    } catch (error) {
      setAlertOpen(false);
      console.error("Error al crear la tarea corta:", error);
    }
  };
  return (
    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Empresa</InputLabel>
              <Select
                label="Empresa"
                value={tareaCorta.empresaId}
                onChange={(e) => _ingresarValoresGerencia(e)}
                name="empresaId"
              >
                {empresas[0]?.map((empresa) => (
                  <MenuItem key={empresa?.id} value={empresa?.id}>
                    {empresa?.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Gerencia</InputLabel>
              <Select
                label="Gerencia"
                value={tareaCorta.gerenciaId}
                onChange={(e) => _ingresarValoresMemoria(e)}
                name="gerenciaId"
              >
                {gerencias[0]?.map((gerencia) => (
                  <MenuItem key={gerencia?.id} value={gerencia?.id}>
                    {gerencia?.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Prioridad</InputLabel>
              <Select
                label="Prioridad"
                value={tareaCorta.tcPrioridadId}
                onChange={(e) => _ingresarValoresMemoria(e)}
                name="tcPrioridadId"
              >
                {prioridades[0]?.map((prioridad) => (
                  <MenuItem key={prioridad?.id} value={prioridad?.id}>
                    {prioridad?.nombre}&nbsp;
                    <ListItemIcon>
                      <div
                        style={{
                          backgroundColor: prioridad?.color,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                    </ListItemIcon>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Perfil de Envío de Correo</InputLabel>
              <Select
                label="Perfil de Envío de Correo"
                value={tareaCorta.perfilEnvioCorreoId}
                onChange={(e) => _ingresarValoresMemoria(e)}
                name="perfilEnvioCorreoId"
              >
                {perfilesEnvioCorreo[0]?.map((perfil) => (
                  <MenuItem key={perfil?.id} value={perfil?.id}>
                    {perfil?.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* ingresar del ejecutor*/}
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Nombre Ejecutor</InputLabel>
              <Select
                label="Nombre del ejecutor"
                value={tareaCorta.ejecutorId}
                onChange={(e) => _ingresarValoresMemoria(e)}
                name="ejecutorId"
              >
                {usuarios[0]?.map((usuario) => (
                  <MenuItem key={usuario?.id} value={usuario?.id}>
                    {usuario?.nombreCompleto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* ingresar el título de la tarea corta */}
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <TextField
                label="Título de la Tarea Corta"
                variant="outlined"
                value={correo.subject}
                onChange={(e) => _ingresarValoresMemoria(e)}
                name="titulo"
              />
            </FormControl>
          </Grid>
          {/* ingresar la descripcion de la tarea corta */}
          <Grid item xs={12} md={8}>
            <FormControl fullWidth>
              <TextField
                label="Descripcion"
                variant="outlined"
                value={tareaCorta.descripcion}
                onChange={(e) => _ingresarValoresMemoria(e)}
                name="descripcion"
              />
            </FormControl>
          </Grid>
          {/* seleccionar la fecha de vencimiento */}
          <Grid item xs={12} md={4} sx={{ marginBottom: "20px" }}>
            <FormControl fullWidth>
              <DatePicker
                label="Fecha de Vencimiento"
                value={tareaCorta.fechaVencimiento}
                onSelectDate={(date) => handleDateChange(date)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} sx={{ marginBottom: "20px" }}>
          {evidencia && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={_descargarEvidencia}
              startIcon={<PictureAsPdf />}
              fullWidth
            >
              {props.evidencia.name}
            </Button>
          )}
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={12}>
            <Button variant="contained" color="primary" onClick={postearTarea} fullWidth>
              Subir Tarea Corta
            </Button>
          </Grid>
        </Grid>

        <Alert severity="success" onClose={handleAlertClose} sx={{ mt: 2, display: alertOpen ? "flex" : "none" }}>
          <AlertTitle>Éxito</AlertTitle>
          Tarea corta creada con éxito — <strong>verifíquelo</strong>!
        </Alert>
      </Container>
    </div>
  );
};

export default CreateTareaCorta;
